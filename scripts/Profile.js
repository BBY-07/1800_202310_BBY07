var currentUser;

function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userCountry = userDoc.data().country;
        var userProvince = userDoc.data().province;
        var userCity = userDoc.data().city;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userCountry != null) {
          document.getElementById("countryInput").value = userCountry;
        }
        if (userProvince != null) {
          document.getElementById("provinceInput").value = userProvince;
        }
        if (userCity != null) {
          document.getElementById("cityInput").value = userCity;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}
populateUserInfo();

function editUserInfo() {
    document.getElementById("nameInput").disabled = false;
    document.getElementById("countryInput").disabled = false;
    document.getElementById("provinceInput").disabled = false;
    document.getElementById("cityInput").disabled = false;
  }
  

function saveUserInfo() {
    userName = document.getElementById("nameInput").value;
    userCountry = document.getElementById("countryInput").value;
    userProvince = document.getElementById("provinceInput").value;
    userCity = document.getElementById("cityInput").value;
  
    currentUser
      .update({
        name: userName,
        country: userCountry,
        province: userProvince,
        city: userCity,
      })
      .then(() => {
        console.log("Document successfully updated!");
      });
  
    document.getElementById("nameInput").disabled = true;
    document.getElementById("countryInput").disabled = true;
    document.getElementById("provinceInput").disabled = true;
    document.getElementById("cityInput").disabled = true;
  }
  
