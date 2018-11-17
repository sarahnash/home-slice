const apiKey = 'X1-ZWz1gr0cjpiscr_aau4b'

;
(function () {


    
    document.addEventListener('DOMContentLoaded', init)

    function init() {
        // $container = $('#zillow-houses')
        // // helloWorld()
        // getData(takeInput('16160 kieth harrow blvd'))
    }


    function getData (location){
        corseAPI()
        $.ajax(
        {
            url: `https://api.yelp.com/v3/businesses/search?location=${location}`,
            headers: {
                'Authorization' : 'Bearer 2tFurqRYbB_R4WkxVxs_74cZPMtIPu_9c62p69PmjCW6JEtH6_pm0XrSEqQqjYsP7aMQRE8RG9sYlcjbjcLjpUmea4hqSXaItF08axHXVF358SAxKUXTkDFLhm3wW3Yx'
            }
            })
            .then(function (Res){
                console.info('This is the results', Res)
            })

    }

function takeInput (search){
    let urlEncodedSearchString = encodeURIComponent(search)
    return takeInput
}





function corseAPI () {
    $.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url
      }
    })
  }



})()