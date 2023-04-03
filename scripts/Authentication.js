// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI( firebase.auth() );

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function ( authResult, redirectUrl ) {
      var user = authResult.user;                            // get the user object from the Firebase authentication database
         if (authResult.additionalUserInfo.isNewUser) {         //if new user
             db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
                    name: user.displayName,                    //"users" collection
                    email: user.email,                         //with authenticated user's ID (user.uid)
                    country: "Unset",                      //optional default profile info      
										province: "Unset"                          //optional default profile info
             }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("profile.html");       //re-direct to profile.html after signup
             }).catch(function (error) {
                    console.log("Error adding new user: " + error);
             });
         } else {
             return true;
         }
             return false;
         },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById( 'loader' ).style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start( '#firebaseui-auth-container', uiConfig );

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}