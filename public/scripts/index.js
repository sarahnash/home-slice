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

    function corseAPI() {
        $.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url
            }

        })
    }

    function init() {
        corseAPI()
        const places = document.getElementById('places')
        const modal = document.getElementById('my-modal')
        console.info('The DOM has loaded')
        geoFindMe()
        document.getElementById('search-form').addEventListener('submit', getUserInfo)
        places.addEventListener('click', placeClicked)

        //--------------------
        // Functions to get information from API and render the results from it
        //Obtain the information for search

        function getUserInfo(evt) {
            evt.preventDefault()
            window.location.hash = "places";
            places.innerHTML = `<div id='waiting-for-food'>
            <div class="loader"></div>
            <p id='loading-text'>Loading your yummy results</p>
          </div>
      `
            let term = encodeURI(document.getElementById('search-bar').value.toLowerCase())
            console.info(term)
            console.info('This is userSearchData', userSearchData)
            getDetailedBuis(term)
        }

        function getDetailedBuis(term) {
            $.ajax({
                    url: `https://api.yelp.com/v3/businesses/search?latitude=${userSearchData.lat}&longitude=${userSearchData.long}&term=${term}&limit=50`,
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                })
                .then(function (res) {
                    userSearchData.searchData = res.businesses
                    return res.businesses
                })
                .then(displayData)
                .catch(function (error) {

                })

            // axios({
            //     url: `https://api.yelp.com/v3/businesses/search?latitude=${userSearchData.lat}&longitude=${userSearchData.long}&term=${term}&limit=50`,
            //     headers:{
            //         'Authorization': `${apiKey}`
            //     }
            // })
            // .then(function (res) {
            //     return res.businesses
            // })
            // .then(displayData)
            // .catch(function (error){
            //     console.error(error)
            // })
        }

        function createHTML(res) {
            if (res) {
                return `
            <div class="card bg-dark text-white">
                    <img class="card-img" src="${res.image_url}" alt="Card image">
                        <div class="card-img-overlay">
                            <h5 class="card-title">${res.name}</h5>
                            <p class="card-text">${res.price}</p>
                            <button type="button" id='modal-button' value='${res.id}'class="btn btn-primary" data-toggle="modal" data-target="#my-modal">
                                For more info
                            </button>
                         </div>
                    </div>
            </div>
            `

            }

        }


        function displayData(array) {
            console.info('this is the displayData', array)
            let newArray = array.map(createHTML)
            let displayArrray = newArray.join(' ')
            console.info('This will display the object userSearchData', userSearchData)
            places.innerHTML = displayArrray
        }

        function placeClicked(evt) {
            modal.innerHTML =  `<div id='waiting-for-food-modal'>
            <div class="loader"></div>'
            <p id='loading-text-modal'>Loading your yummy results</p>
          </div>`
            console.info(evt.target.value)
            let id = evt.target.value
            if(evt.target.id === 'modal-button'){
            $.ajax({
                    url: `https://api.yelp.com/v3/businesses/${id}`,
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                })
                .then(createModal)
            }
            
                
        }

        function createModal(buis){
            console.info('CreateModal is running')
            let modalText =  `    
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${buis.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>${buis.location.address1} ${buis.location.address2} ${buis.location.ddress3}</h3>
                        <h3>${buis.location.city} ${buis.location.country}</h3>
                        <h4>${buis.phone}</h4>
                        <img class='img_modal' src='${buis.image_url}'>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        `
        modal.innerHTML = modalText
        
            return buis
        }


        function encodeURI(search) {
            let urlEncodedSearchString = encodeURIComponent(search)
            return urlEncodedSearchString
        }

        function geoFindMe() {
            let output = document.getElementById("places");
            console.info('GeoFindMe function has init')

            if (!navigator.geolocation) {
                ALERT('Geolocation is not supported by your browser')
                return;
            }

            function success(position) {
                document.getElementById('search-form').style.display = 'block'
                document.getElementById('waiting-for-location').style.display = 'none'
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                userSearchData.lat = latitude
                userSearchData.long = longitude
                console.info(userSearchData)


            }

            function error() {
                alert('Unable to locate position please reload the page')
            }
            document.getElementById('search-form').style.display = 'none'
            navigator.geolocation.getCurrentPosition(success, error)
        }






















    }
})()