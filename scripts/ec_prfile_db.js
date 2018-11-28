// This is the test scipt for saving User profile data to Firebase

// function writeUserProfileData(userUID, amenities, favorites) {
//     var profileDateTimeStamp = Date.now
//     firebase.database().ref('users/' + userID).set({
//         lastUpdated: profileDateTimeStamp,
//         amenitySettings: amenities,
//         favoriteSettings: favorites
//     })
// }

// test using user test@test.com
//  writeUserProfileData(IQntcIvENYNEE57XVllztUW19uy1, {“coffeeshop”: true, “parks”: false, “pubTransport”: false, “schools”: false}, null)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function writeUserData(commentId, name, comment) {
//   firebase.database().ref('comments/' + commentId).set({
//     commentId: firebase.commentId,
//     name: name,
//     comment: document.getElementsByClassName('comment-form').text()
//   })
// }
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCOoHqoX14FEgEm8g7Xc1hbX4uSJfjJSkQ',
  authDomain: 'homeslice-5fb59.firebaseapp.com',
  databaseURL: 'https://homeslice-5fb59.firebaseio.com',
  projectId: 'homeslice-5fb59',
  storageBucket: 'homeslice-5fb59.appspot.com',
  messagingSenderId: '720353057393'
}
const firebase = ''

var database = firebase.initializeApp(config)

// Create references
// const dbRefObject = firebase.database().ref().child('object')

function init () {
  document.getElementById('submitBtn').addEventListener('click', readComment)
  console.log('Init ran')
}

document.addEventListener('DOMContentLoaded', init)

function readComment (e) {
// needs to read the input from the textarea tag
  console.info('i clicked it')
  e.preventDefault()
  var userComment = document.getElementById('textarea').value
  console.log(userComment)
  writeComment(userComment)
}

// function writeComment (userComment) {
//   // needs to write the comment to the fire database
//   console.log('write me')
//   var myData = {
//     username: 'sarah',
//     comment: userComment
//   }
// }

// This version of the funciton writes over any existing data
function writeComment (userComment) {
  // needs to write the comment to the fire database
  console.log('what is database set to ' + database)
  firebase.database().ref('object').set({
    userid: 'userID56',
    ammenProfile: {
      coffeeShops: 'yes',
      parks: 'no',
      pubTrans: 'yes',
      schools: userComment
    }
  })
}

  // var myData = {
  //   userid: 'userID56',
  //   ammenProfile: { coffeShops: 'no',
  //                   parks: 'yes' }
  // }
  // var newPostKey = database.ref().child('object').push().key
  // // Write the new post's data simultaneously in the posts list and the user's post list.
  // var updates = {}
  // updates['/object/' + newPostKey] = myData
  // database.ref().child('object')

