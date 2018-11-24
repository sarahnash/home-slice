const $ = window.jQuery
const apiKey = `2tFurqRYbB_R4WkxVxs_74cZPMtIPu_9c62p69PmjCW6JEtH6_pm0XrSEqQqjYsP7aMQRE8RG9sYlcjbjcLjpUmea4hqSXaItF08axHXVF358SAxKUXTkDFLhm3wW3Yx`
const clientID = `6PaudvUaHDgnvmwq8HFv5w`;

(function () {
  const userSearchData = {
    long: '',
    lat: ''
  }
  document.addEventListener('DOMContentLoaded', init)

  function corseAPI () {
    $.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url
      }
    })
  }

  function init () {
    corseAPI()
    const placesToEat = document.getElementById('places-to-eat')
    console.info('The DOM has loaded')
    geoFindMe()
    document.getElementById('search-form').addEventListener('submit', getUserInfo)
    placesToEat.addEventListener('click', displayModal)

    // --------------------
    // Functions to get information from API and render the results from it
    // Obtain the information for search
    function getUserInfo (evt) {
      evt.preventDefault()
      window.location.hash = 'places-to-eat'
      placesToEat.innerHTML = `<h1 class='loading'>Loading your yummy results<h1>`
      let term = encodeURI(document.getElementById('search-bar').value.toLowerCase())
      console.info('This is userSearchData', userSearchData)
      getDetailedBuis(term)
    }

    function getDetailedBuis (term) {
      $.ajax({
        url: `https://api.yelp.com/v3/businesses/search?latitude=${userSearchData.lat}&longitude=${userSearchData.long}&term=${term}&limit=25`,
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
        .then(function (res) {
          return res.businesses
        })
        .then(makesArrayOfBuisData)
        .then(displayData)
        .catch(function (error) {
        })
    }

    function renderCards (res) {
      if (res) {
        return `
            <div class="card bg-dark text-white" id='${res.id}'>
                    <img class="card-img" src="${res.image_url}" alt="Card image ">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${res.name}</h5>
                        <p class="card-text">${res.price}</p>
                        <p class="card-text">Hi</p>
                </div>
            </div>
            `
      }
    }

    function makesArrayOfBuisData (array) {
      let newArray = array.map(getBuisData)
      return Promise.all(newArray)
    }

    function displayData (array) {
      console.info('this is the displayData', array)
      let newArray = array.map(renderCards)
      let displayArrray = newArray.join(' ')
      placesToEat.innerHTML = displayArrray
    }

    function getBuisData (array) {
      let id = array.id
      return $.ajax({
        url: `https://api.yelp.com/v3/businesses/${id}`,
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
        .then(function (res) {
          return res
        })
        .catch(function (error) {

        })
    }
    // -----------------------

    function displayModal (evt) {
      console.info(evt.target)
      geoFindMe()
    }

    function encodeURI (search) {
      let urlEncodedSearchString = encodeURIComponent(search)
      return urlEncodedSearchString
    }

    function geoFindMe () {
      let output = document.getElementById('places-to-eat')
      console.info('GeoFindMe function has init')

      if (!navigator.geolocation) {
        ALERT('Geolocation is not supported by your browser')
        return
      }

      function success (position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        userSearchData.lat = latitude
        userSearchData.long = longitude
      }

      function error () {
        alert ('Unable to locate position')
      }

      navigator.geolocation.getCurrentPosition(success, error)
    }
  }
})()
