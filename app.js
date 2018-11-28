(function () {
// Initialize Firebase
  const config = {
    apiKey: 'AIzaSyCOoHqoX14FEgEm8g7Xc1hbX4uSJfjJSkQ',
    authDomain: 'homeslice-5fb59.firebaseapp.com',
    databaseURL: 'https://homeslice-5fb59.firebaseio.com',
    projectId: 'homeslice-5fb59',
    storageBucket: 'homeslice-5fb59.appspot.com',
    messagingSenderId: '720353057393'
  }

  var database = firebase.initializeApp(config)

  console.log(database.apiKey)
  // Get elements
  const preObject = document.getElementById('object')
 
  // Create references
  const dbRefObject = firebase.database().ref().child('object')
  
  // const dbRefObject = firebase.database().ref().child('object')
  // const dbRefObject = firebase.database().ref('objects')

  // const postId = 'zFMZFn3lhpUfOz6o5bQs'

  // Retrieve posts ex
  // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
  // starCountRef.on('value', function(snapshot) {
  // updateStarCount(postElement, snapshot.val());
  console.log('Check point')
  // synch object changes
  dbRefObject.on('value', snap => console.log(snap.val()))
  
}())
