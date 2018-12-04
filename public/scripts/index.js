const $ = window.jQuery
const apiKey = `2tFurqRYbB_R4WkxVxs_74cZPMtIPu_9c62p69PmjCW6JEtH6_pm0XrSEqQqjYsP7aMQRE8RG9sYlcjbjcLjpUmea4hqSXaItF08axHXVF358SAxKUXTkDFLhm3wW3Yx`
const clientID = `6PaudvUaHDgnvmwq8HFv5w`
const userSearchData = {
  long: '',
  lat: '',
  searchData: [],
  locationData: {
    long: '',
    lat: '',
    location: ''
  },
  term: '',
  modalId: ''
}
const userID = ''
document.addEventListener('DOMContentLoaded', init)

function init () {
    window.location.hash = '#'
  document.getElementById('search-form').addEventListener('submit', getUserInfo)
  // Places where results will render
  const places = document.getElementById('places')

  // Checks the user search information
  document.getElementById('search-form').addEventListener('submit', getUserInfo)
  // Checks if a result is clicked
  places.addEventListener('click', placeClicked)
  // Listens if user will save searches to favorites
  document.getElementById('my-modal').addEventListener('clicked', saveToFavorites)

  // getUserInfo wil take user search and location
  function getUserInfo (evt) {
    evt.preventDefault()
    userSearchData.term = encodeURI(document.getElementById('search-bar').value.toLowerCase())
    if (!document.getElementById('location-bar').value) {
      // Checks if the user has a valid location
      alert('Location has not been inputed. Please enter a location')
      return
    }

    // Puts the window to the places section of the page
    window.location.hash = 'places'
    // Loading screen while waiting for the API
    places.innerHTML = `
            <div id='waiting-for-food'>
                <div class='loader'><div class='lds-pacman'><div><div></div><div></div><div></div></div><div><div></div><div></div></div></div></div>
                <p id='loading-text'class='text-light'>Loading your yummy results</p>
            </div>
            `

    if (document.getElementById('location-bar').value === 'Location') {
      // User chose to use geoLocator
      geoFindMe()
    }

    if (document.getElementById('location-bar').value !== 'Location') {
      userSearchData.locationData.location = encodeURI(document.getElementById('location-bar').value.toLowerCase())
      // Function to call API
      getBuisDataLocation()
    }
  }
  // Request from the YELP API using users Term and geolocation
  function getBuisDataCoordinates () {
    axios({
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${userSearchData.lat}&longitude=${userSearchData.long}&term=${userSearchData.term}&limit=50`,
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(displayData)
      .catch(displayFail)
  }
  // Request from the YELP API using user's Terms and input locaiton
  function getBuisDataLocation () {
    axios({
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${userSearchData.locationData.location}&term=${userSearchData.term}&limit=50`,
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(displayData)
      .catch(displayFail)
  }

  // Renders the results from YELP API
  function displayData (res) {
    let array = res.data.businesses
    let newArray = array.map(createHTML)
    let displayArrray = newArray.join(' ')
    places.innerHTML = displayArrray
  }
  // Create the HTML card with the DATA for each
  function createHTML (res) {
    if (res) {
      return `
                <div class="card">
                <img src="${res.image_url}"/>
                  <div class="info">
                    <h1>${res.name}</h1>
                    <p>${res.price}</p>
                                <button type="button" id='modal-button' value='${res.id}'class="btn btn-primary" data-toggle="modal" data-target="#my-modal">
                                    For more information
                                </button>
                            </div>
                        </div>
            `
    }
  }

  // Function when the players click for more information
  function placeClicked (evt) {
    document.getElementById('the-modal-body').innerHTML = waiting()
    let value = evt.target.value
    userSearchData.modalId = value
    if (evt.target.id === 'modal-button') {
      axios({
        url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${value}`,
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }).then(createModal)
    }
  }

  // Creates the modal for the user
  function createModal (buis) {
    let modalTitle = `
                  <h1><b>${buis.data.name}</b></h1>
    `
    let modalText = `
                <img class='img_modal' src=${buis.data.image_url}>
                <div class='data_modal'></div>    
                <h3 class='data_modal_address'>${buis.data.location.address1} ${buis.data.location.address2}</h3>
                <h3 class='data_modal_city'>${buis.data.location.city} ${buis.data.location.country}</h3>
                <h4 class='data_modal_ph'>${buis.data.phone}</h4>`

    createMarkers([{
      lat: buis.data.coordinates.latitude,
      lng: buis.data.coordinates.longitude
    }])
    document.getElementById('favorites-modal-button').value = buis.data.id
    document.getElementById('the-modal-body').innerHTML = modalText
    document.getElementById('the-modal-title').innerHTML = modalTitle
    return buis
  }

  // Encodes users imput to put in for the API call
  function encodeURI (search) {
    let urlEncodedSearchString = encodeURIComponent(search)
    return urlEncodedSearchString
  }
  // Success for geolocator
  function success (position) {
    document.getElementById('search-form').style.display = 'block'
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    userSearchData.lat = latitude
    userSearchData.long = longitude
    map.setCenter({
      lat: userSearchData.lat,
      lng: userSearchData.long
    })
    getBuisDataCoordinates()
  }

  // Function to find users location if given permision
  function geoFindMe () {
    function error () {
      alert('Unable to locate position please reload the page')
    }
    document.getElementById('search-form').style.display = 'none'
    navigator.geolocation.getCurrentPosition(success, error)
  }
  // Function for a waiting symbol
  function waiting () {
    return `<div id='waiting-for-food-modal'>
            <div class='loader'><div class='lds-pacman'><div><div></div><div></div><div></div></div><div><div></div><div></div></div></div></div>
            <p id='loading-text-modal'>Loading your yummy results</p>
          </div>`
  }
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      document.getElementById('logout-div').style.display = 'initial'
      document.getElementById('login-div').style.display = 'none'
      displayFavorites(user.displayName)
    } else {
      // No user is signed in.
      document.getElementById('logout-div').style.display = 'none'
      document.getElementById('login-div').style.display = 'initial'
    }
  })

  // Firebase
  const config = {
    apiKey: 'AIzaSyCOoHqoX14FEgEm8g7Xc1hbX4uSJfjJSkQ',
    authDomain: 'homeslice-5fb59.firebaseapp.com',
    databaseURL: 'https://homeslice-5fb59.firebaseio.com',
    projectId: 'homeslice-5fb59',
    storageBucket: 'homeslice-5fb59.appspot.com',
    messagingSenderId: '720353057393'
  }

  let database = firebase.database()

  // SIGN IN
}

function displayFail (error) {
  alert(error)
}

function displayFavorites (userID) {
  firebase.database().ref(`users/${userID}/favorites`).once('value', function (snapshot) {
    let favDisplay = []
    if (!snapshot.val()) return
    for (let i = 0; i < snapshot.val().length; i++) {
      axios({
        url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${snapshot.val()[i]}`,
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
        .then(function (res) {
          return `<div class="card">
                        <img src="${res.data.image_url}"/>
                          <div class="info">
                            <h1>${res.data.name}</h1>
                            <p>${res.data.price}</p>
                                        <button type="button" id='modal-button' value='${res.data.id}'class="btn btn-primary" data-toggle="modal" data-target="#my-modal">
                                            For more information
                                        </button>
                                    </div>
                                </div>
                    `
        })
        .then(function (res) {
          favDisplay.push(res)
          let displayHTML = favDisplay.join(' ')
          places.innerHTML = displayHTML
        })
        .catch(displayFail)
    }

    let displayHTML = favDisplay.join(' ')
    places.innerHTML = displayHTML
  }, function (error) {})
}

function saveToFavorites () {
  readUserData(firebase.auth().currentUser.displayName)
}

function updateFavorites(userID, favorites) {

    firebase.database().ref(`users/${userID}/`).update({
        'favorites': favorites
    })
    
}

function readUserData (userID) {
  firebase.database().ref(`users/${userID}/favorites`).once('value', function (snapshot) {
    let favList = snapshot.val()
    JSON.stringify(favList)
    if (!favList) favList = []
    favList.push(userSearchData.modalId)
    updateFavorites(userID, favList)
  }, function (error) {})
}

function login () {
  var userEmail = document.getElementById('inputEmail').value
  var userPass = document.getElementById('inputPassword').value
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    window.alert('Error: ' + errorMessage)
    // ...
  })
}

function logout() {
    firebase.auth().signOut();
    location.reload();
}