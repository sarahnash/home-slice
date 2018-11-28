const $ = window.jQuery
 const apiKey = `2tFurqRYbB_R4WkxVxs_74cZPMtIPu_9c62p69PmjCW6JEtH6_pm0XrSEqQqjYsP7aMQRE8RG9sYlcjbjcLjpUmea4hqSXaItF08axHXVF358SAxKUXTkDFLhm3wW3Yx`
 const clientID = `6PaudvUaHDgnvmwq8HFv5w`;
 (function () {
 
     const userSearchData = {
         long: '',
         lat: '',
         searchData: []
     }
     document.addEventListener('DOMContentLoaded', init)
 
     
 
    function init() {
        window.location.hash = "#HomeSlice";
        // Needed for the API to work
        // corseAPI()
        //The location in the DOM where the places will be rendered
        const places = document.getElementById('places')
        // The modal for more information
        const modal = document.getElementById('my-modal')
        console.info('The DOM has loaded')
        // Requesting to find the users location
        geoFindMe()
        // if true in local storage, just run success, otherwise run goFindMe

        document.getElementById('search-form').addEventListener('submit', getUserInfo)
        places.addEventListener('click', placeClicked)

        //--------------------
        // Functions to get information from API and render the results from it
        //Obtain the information for search

        function getUserInfo(evt) {
            evt.preventDefault()
            //Puts the window to the places section of the page
            window.location.hash = "places";
            // Loading screen while waiting for the API
            places.innerHTML = `
            <div id='waiting-for-food'>
                <div class="loader"></div>
                <p id='loading-text'>Loading your yummy results</p>
            </div>
            `
            let term = encodeURI(document.getElementById('search-bar').value.toLowerCase())
            getDetailedBuis(term)
        }
        //Request from the YELP API 
        function getDetailedBuis(term) {
            axios({
                url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${userSearchData.lat}&longitude=${userSearchData.long}&term=${term}&limit=50`,
                headers:{
                    'Authorization': `Bearer ${apiKey}`
                }
            })
            .then(displayData)
        

        }
        // Renders the results from YELP API
        function displayData(res) {
            console.info(res)
            let array = res.data.businesses
            console.info(array)
            let newArray = array.map(createHTML)
            let displayArrray = newArray.join(' ')
            places.innerHTML = displayArrray
        }
        //Create the HTML card with the DATA for each
        function createHTML(res) {
            if (res) {
                return `
                        <div class="card bg-dark text-white">
                            <img class="card-img" src="${res.image_url}" alt="Card image">
                            <div class="card-img-overlay">
                                <h5 class="card-title">${res.name}</h5>
                                <p class="card-text">${res.price}</p>
                                <button type="button" id='modal-button' value='${res.id}'class="btn btn-primary" data-toggle="modal" data-target="#my-modal">
                                    For more information
                                </button>
                            </div>
                        </div>
            `
            }
        }


        //Function when the players click for more information 
        function placeClicked(evt) {
            modal.innerHTML = waiting()
            let value = evt.target.value
            if (evt.target.id === 'modal-button') {
                axios({
                        url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${value}`,
                        headers: {
                            'Authorization': `Bearer ${apiKey}`
                        }
                    })
                    .then(createModal)
            }
        }
        
        //TODO
        //Need to add more images
        //TODO LIST
        function createModal(buis) {
            console.info(buis.data)
            let modalText = `    
                <h3>${buis.data.location.address1} ${buis.data.location.address2} ${buis.data.location.ddress3}</h3>
                <h3>${buis.data.location.city} ${buis.data.location.country}</h3>
                <h4>${buis.data.phone}</h4>
                <img class='img_modal' src='${buis.data.image_url}'>
                 `
            document.getElementById('the-modal-body').innerHTML = modalText
            document.getElementById('the-modal-title')
            return buis
        }

        //Encodes users imput to put in for the API call
        function encodeURI(search) {
            let urlEncodedSearchString = encodeURIComponent(search)
            return urlEncodedSearchString
        }
      
        function success(position) {
            console.info('Succes working')
            document.getElementById('search-form').style.display = 'block'
            document.getElementById('waiting-for-location').style.display = 'none'
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            userSearchData.lat = latitude
            userSearchData.long = longitude
            console.info(userSearchData)
            // save to loal storage true
        }

        //Function to find users location if given permision
        function geoFindMe() {
            let output = document.getElementById("places");
            console.info('GeoFindMe function has init')

            function error() {
                alert('Unable to locate position please reload the page')
            }
            document.getElementById('search-form').style.display = 'none'
            navigator.geolocation.getCurrentPosition(success, error)
        }
        // function corseAPI() {
        //     $.ajaxPrefilter(function (options) {
        //         if (options.crossDomain && jQuery.support.cors) {
        //             options.url = 'https://cors-anywhere.herokuapp.com/' + options.url
        //         }
    
        //     })
        // }
        //Function for a waiting symbol
        function waiting(){
            return `<div id='waiting-for-food-modal'>
            <div class="loader"></div>'
            <p id='loading-text-modal'>Loading your yummy results</p>
          </div>`
        }


    }
})()
