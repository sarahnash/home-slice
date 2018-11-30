// This is the test scipt for read write and update data to Firebase

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

// These vars are just used for testing purposes only
var fbUserID = 'Test008'
var favList = null
var userNameVal = 'Frank'
var emailVal = 'chris@gmail.com'

document.addEventListener('DOMContentLoaded', init)

// This function is just being used to test the firebase database functions below
function readUserName (e) {
// needs to read the input from the Register modal
  e.preventDefault()
  var userName = document.getElementById('textarea').value
  console.log(userName)
  // instantiateUser(fbUserID, userNameVal, emailVal, favList)
  // updateFavorites(fbUserID, favList)
  readUserData(fbUserID)
}

// This version of the funciton writes over any existing data for the given userID, favList may be null
function instantiateUser (userID, userNameVal, emailVal, favList) {
  // needs to write the comment to the fire database
  console.log('User ID and Name are set to ' + userID + userNameVal)
  firebase.database().ref('object/' + userID).set({
    userName: userNameVal,
    email: emailVal,
    favorites: favList
  })  
}

// This function is used to update the value for the favorites of the given userID
function updateFavorites (userID, favorites) {
  console.log('udate favs to ' + favList)
firebase.database().ref('object/' + userID).update({ favorites: favorites })
}

// This function is used to read the user data once they have logged in
function readUserData (userID) {
 firebase.database().ref('object/' + userID).on('value', function (snapshot) {
    console.log(snapshot.val())
  }, function (error) {
    console.log('Error: ' + error.code)
  })
}
