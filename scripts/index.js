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
        console.info('The DOM has loaded')
        document.getElementById('search-form').addEventListener('submit', getInfo)
        getData('NYC')
        // getOtherData()
    }




    //Obtain the information for search
    function getInfo(evt) {
        evt.preventDefault()
        console.info('Typing')
        let info = takeInput(document.getElementById('search-bar').value.toLowerCase())
        console.info('This is the info ' + info)
        getData(info)
    }




    function getData(location) {
        corseAPI()
        $.ajax({
                url: `https://api.yelp.com/v3/businesses/search?location=${location}`,
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            })
            .then(function (res) {
                console.info('This is the results', res)
                console.info('This is the buisness id', res.businesses.length)
            })
            .catch(function (error) {
                console.alert(error)
            })

    }

    function getOtherData(id) {
        corseAPI()
        $.ajax({
                url: `https://api.yelp.com/v3/businesses/${id}`,
                headers: {
                    'Authorization': `Bearer  ${apiKey}`
                }
            })
            .then(function (res) {
                console.info('This is the reseult of other things', res)
            })
    }

    function takeInput(search) {
        let urlEncodedSearchString = encodeURIComponent(search)
        return urlEncodedSearchString
    }


})()