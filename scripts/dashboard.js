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
          document.getElementById("name").innerHTML = userName;
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

function toggleMenu() {
  const mainNav = document.getElementById("main-nav");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  // Toggle display of the nav menu
  mainNav.style.display = mainNav.style.display === "block" ? "none" : "block";

  // Toggle "x" class on the hamburger menu
  hamburgerMenu.classList.toggle("x");
}

let firesmart = document.getElementById("firesmart");
firesmart.addEventListener("click", function () {
  window.location.href = "firesmart.html";
});
