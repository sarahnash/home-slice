const apiKey = 'X1-ZWz1gr0cjpiscr_aau4b'

;
(function () {

    function forZillowAPI() {
        $.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url
            }
        })
    }

    document.addEventListener('DOMContentLoaded', init)

    function init() {
        $container = $('#zillow-houses')
        $container.html(renderHouses())
    }


    function searchItem (){
        //Add event lister to get Info
    }


    function renderHouses() {
        forZillowAPI()
        $.ajax(`http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=${apiKey}&zpid=48749425`)
            .then(xmlToJson)
            .then(function (res) {
                console.info(res['UpdatedPropertyDetails:updatedPropertyDetails'].response)
                let theHouse = res['UpdatedPropertyDetails:updatedPropertyDetails'].response.images.image.url['#text']
                $container.html(renderCard(theHouse, 'Seattle'))
            })
            .catch(function (error) {
                alert(error)
            })
    }

    function renderCard(houseImg, city) {
        return `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${houseImg}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`
    }



    function xmlToJson(xml) {
        // Create the return object
        let obj = {}

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj['@attributes'] = {}
                for (let j = 0; j < xml.attributes.length; j++) {
                    let attribute = xml.attributes.item(j)
                    obj['@attributes'][attribute.nodeName] = attribute.nodeValue
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue
        }

        // do children
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                let item = xml.childNodes.item(i)
                let nodeName = item.nodeName
                if (typeof (obj[nodeName]) === 'undefined') {
                    obj[nodeName] = xmlToJson(item)
                } else {
                    if (typeof (obj[nodeName].push) === 'undefined') {
                        let old = obj[nodeName]
                        obj[nodeName] = []
                        obj[nodeName].push(old)
                    }
                    obj[nodeName].push(xmlToJson(item))
                }
            }
        }
        return obj
    }













})()