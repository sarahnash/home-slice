document.addEventListener('DOMContentLoaded', init)
const container = document.getElementById('container')
const apiKey = 'X1-ZWz1gr0cjpiscr_aau4b'
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


function getRegion (){
    console.info('You pressed for the get')
    forZillowAPI()
    $.ajax(`http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=${apiKey}&state=wa&city=seattle&childtype=neighborhood`)
    .then(results)
    .catch(function (error){
        console.info('This is the error', error)
    })
}

function getUpdatedProp (){
    console.info('You pressed for the Get updatedProperty Details')
    forZillowAPI()
    $.ajax(`http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=${apiKey}&zpid=48749425`)
    .then(results)
    .catch(fail)
}

function getChart (){
    console.info('You pressed for the Get Chart API')
    forZillowAPI()
    $.ajax(`http://www.zillow.com/webservice/GetChart.htm?zws-id=${apiKey}&unit-type=percent&zpid=48749425&width=300&height=150`)
    .then(results)
    .catch(fail)
}
function getComps (){
    console.info('You pressed for the Get Comps API')
    forZillowAPI()
    $.ajax(`http://www.zillow.com/webservice/GetComps.htm?zws-id=${apiKey}&zpid=48749425&count=5`)
    .then(results)
    .catch(fail)
}

function getDeepSearch (){
    console.info('You pressed for the getDeep Search API')
    forZillowAPI()
    $.ajax(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${apiKey}&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA`)
    .then(results)
    .catch(fail)
}
function getSearchResult (){
    console.info('You pressed for the get Search Results API')
    forZillowAPI()
    $.ajax(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${apiKey}&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA`)
    .then(results)
    .catch(fail)
}
function getZestinate (){
    console.info('You pressed for the get Zestiate API')
    forZillowAPI()
    $.ajax(`http://www.zillow.com/webservice/GetZestimate.htm?zws-id=${apiKey}&zpid=48749425`)
    .then(results)
    .catch(fail)
}