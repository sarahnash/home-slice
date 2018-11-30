const $ = window.jQuery;
const apiKey = `2tFurqRYbB_R4WkxVxs_74cZPMtIPu_9c62p69PmjCW6JEtH6_pm0XrSEqQqjYsP7aMQRE8RG9sYlcjbjcLjpUmea4hqSXaItF08axHXVF358SAxKUXTkDFLhm3wW3Yx`;
const clientID = `6PaudvUaHDgnvmwq8HFv5w`;
const userSearchData = {
  long: "",
  lat: "",
  searchData: [],
  locationData: {
    long: "",
    lat: "",
    location: ''
  },
  term: ""
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  // Needed for the API to work
  // corseAPI()
  //The location in the DOM where the places will be rendered
  const places = document.getElementById("places");
  window.location.hash = "#";
  console.info("The DOM has loaded");
  // Requesting to find the users location
  // if true in local storage, just run success, otherwise run goFindMe

  document
    .getElementById("search-form")
    .addEventListener("submit", getUserInfo);
  places.addEventListener("click", placeClicked);

  //--------------------
  // Functions to get information from API and render the results from itgit
  //Obtain the information for search

  function getUserInfo(evt) {
    console.info("The getUserInfo function has started");
    evt.preventDefault();
    userSearchData.term = encodeURI(document.getElementById("search-bar").value.toLowerCase())
    if (!document.getElementById("location-bar").value) {
        alert("Location has not been inputed. Please enter a location");
        return
      }
    //Puts the window to the places section of the page
    window.location.hash = "places";
    // Loading screen while waiting for the API
    places.innerHTML = `
            <div id='waiting-for-food'>
                <div class="loader"></div>
                <p id='loading-text'>Loading your yummy results</p>
            </div>
            `;

    if (document.getElementById("location-bar").value === "Location") {
      geoFindMe()
      console.log("Location has been chosen")
    }
    if(document.getElementById("location-bar").value !== 'Location'){
        console.info('User put in a location', document.getElementById('location-bar').value)
        userSearchData.locationData.location = encodeURI(document.getElementById("location-bar").value.toLowerCase())
        getBuisDataLocation()

    }
    
  }
  //Request from the YELP API
  function getBuisDataCoordinates () {
    axios({
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${
        userSearchData.lat
      }&longitude=${userSearchData.long}&term=${userSearchData.term}&limit=50`,
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then(displayData)
    .catch(function (error){
        console.info(error)
    })
  }
  function getBuisDataLocation () {
    axios({
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${userSearchData.locationData.location}&term=${userSearchData.term}&limit=50`,
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then(displayData)
    .catch(function (error){
        console.info(error)
    })
  }
  
  // Renders the results from YELP API
  function displayData(res) {
    console.info(userSearchData);
    console.info(res);
    let array = res.data.businesses;
    console.info(array);
    let newArray = array.map(createHTML);
    let displayArrray = newArray.join(" ");
    places.innerHTML = displayArrray;
  }
  //Create the HTML card with the DATA for each
  function createHTML(res) {
    if (res) {
      return `
                <div class="card">
                <img src="${res.image_url}"/>
                  <div class="info">
                    <h1>${res.name}</h1>
                    <p>${res.price}</p>
                                <button type="button" id='modal-button' value='${
                                  res.id
                                }'class="btn btn-primary" data-toggle="modal" data-target="#my-modal">
                                    For more information
                                </button>
                            </div>
                        </div>
            `;
    }
  }

  //Function when the players click for more information
  function placeClicked(evt) {
    document.getElementById("the-modal-body").innerHTML = waiting();
    let value = evt.target.value;
    console.log(value);
    if (evt.target.id === "modal-button") {
      axios({
        url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${value}`,
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }).then(createModal);
    }
  }

  //TODO
  //Need to add more images
  //TODO LIST
  function createModal(buis) {
    console.info(buis.data);
    let modalText = `    
                <h3>${buis.data.location.address1} ${
      buis.data.location.address2
    } ${buis.data.location.ddress3}</h3>
                <h3>${buis.data.location.city} ${
      buis.data.location.country
    }</h3>
                <h4>${buis.data.phone}</h4>
                <img class='img_modal' src='${buis.data.image_url}'>
                 `;
    userSearchData.locationData.lat;

    document.getElementById("the-modal-body").innerHTML = modalText;
    document.getElementById("the-modal-title");
    console.info(userSearchData);
    return buis;
  }

  //Encodes users imput to put in for the API call
  function encodeURI(search) {
    let urlEncodedSearchString = encodeURIComponent(search);
    return urlEncodedSearchString;
  }

  function success(position) {
    document.getElementById("search-form").style.display = "block"
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    userSearchData.lat = latitude
    userSearchData.long = longitude
    getBuisDataCoordinates()
    console.info(userSearchData)
    // save to loal storage true
  }

  //Function to find users location if given permision
  function geoFindMe() {
    console.info("GeoFindMe function has init");

    function error() {
      alert("Unable to locate position please reload the page");
    }
    document.getElementById("search-form").style.display = "none";
    navigator.geolocation.getCurrentPosition(success, error);
  }
  //Function for a waiting symbol
  function waiting() {
    return `<div id='waiting-for-food-modal'>
            <div class="loader"></div>'
            <p id='loading-text-modal'>Loading your yummy results</p>
          </div>`;
  }
}
