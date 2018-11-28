// This is the test scipt for saving User profile data to Firebase

// Reference to the database service
var database = firebase.database()

function writeUserProfileData (userID, amenities, favorites) {
  var profileDateTimeStamp = Date.now
  firebase.database().ref('users/' + userID).set({
    lastUpdated: profileDateTimeStamp,
    amenitySettings: amenities,
    favoriteSettings: favorites
  })
}
