const apiKey = `2tFurqRYbB_R4WkxVxs_74cZPMtIPu_9c62p69PmjCW6JEtH6_pm0XrSEqQqjYsP7aMQRE8RG9sYlcjbjcLjpUmea4hqSXaItF08axHXVF358SAxKUXTkDFLhm3wW3Yx`
const clientID = `6PaudvUaHDgnvmwq8HFv5w`;
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
        console.info('The DOM has loaded')
        document.getElementById('search-form').addEventListener('submit', getInfo)
        getData('NYC')
        $container = $('#render-places')
    }




    //Obtain the information for search
    function getInfo(evt) {
        evt.preventDefault()
        console.info('Typing')
        let info = takeInput(document.getElementById('search-bar').value.toLowerCase())
        console.info('This is the info ' + info)
        getData(info)
    }

getData('nyc').then


    function getData(location) {
        // corseAPI()
        $.ajax({
                url: `https://api.yelp.com/v3/businesses/search?location=${location}&limit=10`,
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            })
            .then(function (res) {
                return res.businesses
            })
            .then(giveBuisInfo)
            .then(function (res){
                console.info(res)
            })
            .catch(function (error) {
                console.alert(error)
            })

    }
    function displayData (array){
        // To do something
    }
    function giveBuisInfo(array){
       let newArray =  array.map(getBuisData)
        return Promise.all(newArray)
    }
    function getBuisData(array) {
        id = array.id
       return $.ajax({
                url: `https://api.yelp.com/v3/businesses/${id}`,
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            })
            .then(function (res){
                return res
            })
            .catch(function (error){
                console.error(error)
            })
    }
    function displayData (obj){
        console.info('This is the display Data', obj)
    }

    function takeInput(search) {
        let urlEncodedSearchString = encodeURIComponent(search)
        return urlEncodedSearchString
    }


})()


// // TO ADD
// <!-- Button trigger modal -->
// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
//   Launch demo modal
// </button>

// <!-- Modal -->
// <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>