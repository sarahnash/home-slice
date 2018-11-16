document.addEventListener('DOMContentLoaded', init)
const container = document.getElementById('container')

function init() {}


function results(res) {
    console.info('--------')
    console.info('res', res)
    console.info('--------')
}

function fail(fail) {
    console.info('--------')
    console.info('Fail', fail)
    console.info('--------')
}


function forZillowAPI (){
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    })
}




function getZillow() {
    forZillowAPI()
    jQuery.ajax('http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1gr0cjpiscr_aau4b&state=wa&city=seattle&childtype=neighborhood')
        .then(function (res) {
            console.info('res', res)
        })
    $.ajax('http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz1gr0cjpiscr_aau4b&zpid=48749425')
        .then(function (res) {
            console.info('This is the results from GetUpdatedPropertyDetails', res)
        })
}