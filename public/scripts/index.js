const $ = window.jQuery

const apiKey = `2tFurqRYbB_R4WkxVxs_74cZPMtIPu_9c62p69PmjCW6JEtH6_pm0XrSEqQqjYsP7aMQRE8RG9sYlcjbjcLjpUmea4hqSXaItF08axHXVF358SAxKUXTkDFLhm3wW3Yx`
const clientID = `6PaudvUaHDgnvmwq8HFv5w`
(function () {

    document.addEventListener('DOMContentLoaded', init)

    function corseAPI() {
        $.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url
            }

        })
    }

    function init() {
        corseAPI()
        if ("geolocation" in navigator) {
            console.info('TRUE')
          } else {
            /* geolocation IS NOT available */
          }
        console.info('The DOM has loaded')
        document.getElementById('search-form').addEventListener('submit', getInfo)
        document.getElementById('cardListContainer').addEventListener('click', displayModal)
    }
    //--------------------
    // Functions to get information from API and render the results from it
    //Obtain the information for search
    function getInfo(evt) {
        evt.preventDefault()
        console.info('Typing')
        let location = encodeURI(document.getElementById('search-bar').value.toLowerCase())
        getData(location)
    }

    function getData(location) {
        $.ajax({
                url: `https://api.yelp.com/v3/businesses/search?location=${location}&limit=25`,
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            })
            .then(function (res) {
                return res.businesses
            })
            .then(giveBuisInfo)
            .then(displayData)
            .catch(function (error) {

            })

    }

    function renderCards(res) {
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

    function giveBuisInfo(array) {
        let newArray = array.map(getBuisData)
        return Promise.all(newArray)
    }

    function displayData(array) {
        console.info('this is the displayData', array)
        let newArray = array.map(renderCards)
        let displayArrray = newArray.join(' ')
        document.getElementById('cardListContainer').innerHTML = displayArrray
    }

    function getBuisData(array) {
        id = array.id
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
    //-----------------------

    function displayModal(evt) {
        console.info(evt.target)
    }

    function encodeURI(search) {
        let urlEncodedSearchString = encodeURIComponent(search)
        return urlEncodedSearchString
    }



})()