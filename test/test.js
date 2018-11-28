//Create the HTML card with the DATA for each
function createHTML(res) {
  if (res) {
      return `
        <div class="card bg-dark text-white">
            <img class="card-img" src="${res.image_url}" alt="Card image">
            <div class="card-img-overlay">
                <h5 class="card-title">${res.name}</h5>
                <p class="card-text">${res.price}</p>
            </div>
        </div>
  `
  }
}

var assert = require('assert')
describe('Rendering', function() {
  it('should dynamically generate HTML', function () {
    var dataObject = {image_url: 'www.testurl.com', name: 'KimJM', price: 100}
    assert.equal( createHTML(dataObject),`
    <div class="card bg-dark text-white">
        <img class="card-img" src="www.testurl.com" alt="Card image">
        <div class="card-img-overlay">
            <h5 class="card-title">KimJM</h5>
            <p class="card-text">100</p>
        </div>
    </div>
`)
  })
})
