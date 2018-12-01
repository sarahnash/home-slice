


var config = {
    apiKey: "AIzaSyCOoHqoX14FEgEm8g7Xc1hbX4uSJfjJSkQ",
    authDomain: "homeslice-5fb59.firebaseapp.com",
    databaseURL: "https://homeslice-5fb59.firebaseio.com",
    projectId: "homeslice-5fb59",
    storageBucket: "homeslice-5fb59.appspot.com",
    messagingSenderId: "720353057393"
  }
  firebase.initializeApp(config)

   // FirebaseUI config.
   var uiConfig = {
    signInSuccessUrl: '#',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    //   firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
  