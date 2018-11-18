const apiKey = `2tFurqRYbB_R4WkxVxs_74cZPMtIPu_9c62p69PmjCW6JEtH6_pm0XrSEqQqjYsP7aMQRE8RG9sYlcjbjcLjpUmea4hqSXaItF08axHXVF358SAxKUXTkDFLhm3wW3Yx`

;(function () {

    function corseAPI () {
        $.ajaxPrefilter(function (options) {
          if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url
          }
        })
      }

    document.addEventListener('DOMContentLoaded', init)

    function init() {
        console.info('The DOM has loaded')
        document.getElementById('search-form').addEventListener('input', getInfo)
        getData('NYC')
    }

    
    //Obtain the information for search
    function getInfo(evt) {
        evt.preventDefault()
        let info = evt.target.value.toLowerCase();
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
            .then(function (Res) {
                console.info('This is the results', Res)
            })
            .catch(function (error) {
                console.error(error)
            })

    }

    function takeInput(search) {
        let urlEncodedSearchString = encodeURIComponent(search)
        return takeInput
    }





    



})()