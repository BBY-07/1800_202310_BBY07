let zoom = false;
var playerId;

document.getElementById("lawnmower").addEventListener("click", function () {
  zoom = true;
  backButton();
  document.getElementById("background").style.transform = "scale(3)";
  document.getElementById("lawnmower").style.opacity = 1;
  document.getElementById("background-container").scrollTo({
    top: 700,
    left: 500,
    behavior: "smooth",
  });
  document.getElementById("bottom").style.display = "block";
});

const backButton = () => {
  document.getElementById("back-button").style.display = "block";
  document.getElementById("back-button").addEventListener("click", function () {
    zoom = false;
    document.getElementById("background").style.transform = "scale(1)";
    document.getElementById("lawnmower").style.opacity = 0;
    document.getElementById("back-button").style.display = "none";
    document.getElementById("bottom").style.display = "none";

  });
};

const config = {

}

// Initialize the Firebase SDK
firebase.initializeApp(config);

// Get a reference to the database
var database = firebase.database();

// Update the player's level progress in the database
function updateLevelProgress(playerId, level) {
  database.ref('players/' + playerId + '/level').set(level);
}

// Get a reference to the database
var database = firebase.database();

// Initialize SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send an email congratulating the player
function sendCongratsEmail() {
exports.sendCongratsEmail = functions.database.ref('/players/' + playerId + '/level')
  .onWrite((change, context) => {
    //const playerId = context.params.playerId;
    const newLevel = change.after.val();
    if (newLevel >= 10) {
      // Get the player's email address from the database
      return database.ref('players/' + playerId + '/email').once('value').then(snapshot => {
        const email = snapshot.val();
        // Send the congratulatory email
        const msg = {
          to: email,
          from: 'youremail@example.com',
          subject: 'Congratulations on reaching level ' + newLevel + '!',
          text: 'Congratulations on reaching level ' + newLevel + ' in our game!'
        };
        return sgMail.send(msg);
      });
    }
    return null;
  });
}