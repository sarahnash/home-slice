// This is the test scipt for saving User profile data to Firebase

  // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyCOoHqoX14FEgEm8g7Xc1hbX4uSJfjJSkQ',
      authDomain: 'homeslice-5fb59.firebaseapp.com',
      databaseURL: 'https://homeslice-5fb59.firebaseio.com',
      projectId: 'homeslice-5fb59',
      storageBucket: 'homeslice-5fb59.appspot.com',
      messagingSenderId: '720353057393'
    }
  
    const database = firebase.initializeApp(config)
  
    console.log(database.apiKey)
    // Get elements
    const preObject = document.getElementById('object')
   
    // Create references
    const dbRefObject = firebase.database().ref().child('object')

function init () {
  document.getElementById('submitBtn').addEventListener('click', readUserName)
  console.log('Init ran')
}

// Temp userID for testing code - this value would normally be obtained with the firebase api to the user authentication

var fbUserID = 'Test123'

document.addEventListener('DOMContentLoaded', init)

function readUserName (e) {
// needs to read the input from the Register modal
  e.preventDefault()
  var userName = document.getElementById('textarea').value
  console.log(userName)
  instantiateUser(fbUserID, userName)
}

// This version of the funciton writes over any existing data for the given userID
function instantiateUser (userID, userName) {
  // needs to write the comment to the fire database
  console.log('User ID and Name are set to ' + userID + userName)
  firebase.database().ref('object/' + userID).set({
    userName: userName,
    email: 'chris@gmail.com',
    favorites: [01: '987654xyz']
  })  
}

// This function is used to update the value for the favorites of the given userID
function UpdateFavorites (userID, favList) {
  firebase.database().ref('object/'userID).update({ favorites :'my list'})
}



// This function is used to read the user data once they login and get to their username
// function readUserData (userID) {
//   return firebase.database().ref('object/' + userID).once('value').then(function(snapshot) {
//     var readusername = (snapshot.val() && snapshot.val().userName) || 'Anonymous'
//   })
//   console.log(readusername)
// }

function readFBUserData (userID) {
  return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  })
}


readFBUserData(fbUserID)

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

