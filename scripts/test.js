function generateCheckboxes() {
  const collectionRef = db.collection("Checklist");
  const checkboxesContainer = document.getElementById("Checkboxes");

  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in
    if (user) {
      // Go to the correct user document by referencing to the user uid
      const currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then((doc) => {
        // Get the preferences array from the user document
        const preferences = doc.data().preferences || [];

        collectionRef.get().then((querySnapshot) => {
          const checkboxes = [];

          querySnapshot.forEach((doc) => {
            const docData = doc.data();

            // Loop through the fields of the document
            Object.keys(docData).forEach((key) => {
              // Check if the field is a string
              if (typeof docData[key] === "string") {
                // Create a checkbox element
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = key;
                checkbox.value = docData[key];

                // Check the checkbox if the value is in the preferences array
                if (preferences.includes(docData[key])) {
                  checkbox.checked = true;
                }

                // Create a label element
                const label = document.createElement("label");
                label.textContent = key + ": " + docData[key];

                // Add the checkbox and label as an object to the checkboxes array
                checkboxes.push({
                  label: key + ": " + docData[key],
                  checkbox: checkbox,
                });
              }
            });
          });

          // Sort the checkboxes array alphabetically by the label key
          checkboxes.sort((a, b) => {
            return a.label.localeCompare(b.label);
          });

          // Append each checkbox element in order to the checkboxes container
          checkboxes.forEach((checkbox) => {
            // Create a div element to wrap the checkbox and label
            const div = document.createElement("div");
            div.style.display = "block";
            div.appendChild(checkbox.checkbox);
            div.appendChild(label);
            checkboxesContainer.appendChild(div);
          });
        });
      });
    }
  });
}

generateCheckboxes();

async function createChecklist(user, checkboxes) {
  const checklistRef = db
    .collection("users")
    .doc(user.uid)
    .collection("checklist");

  // Check if checklist collection already exists
  const snapshot = await checklistRef.get();
  if (snapshot.empty) {
    // Create checklist collection
    await checklistRef.add({});
  }

  // Create boolean field for each checkbox
  checkboxes.forEach(async (checkbox) => {
    const checkboxName = checkbox.getAttribute("name");
    await checklistRef.doc(checkboxName).set({ checked: false });
  });
}

// Move this block of code inside a function that will be called after the user logs in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    createChecklist(user, checkboxes);
  } else {
    console.log("User not authenticated.");
  }
});

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const preferences = [];

checkboxes.forEach((checkbox) => {
  if (checkbox.checked) {
    preferences.push(checkbox.value);
  }
});
firebase.auth().onAuthStateChanged((user) => {
  // Check if user is signed in:
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .collection("checklist")
      .get()
      .then((querySnapshot) => {
        // Get the first (and only) document in the collection
        const doc = querySnapshot.docs[0];
        // Update the boolean fields for each checkbox
        checkboxes.forEach((checkbox) => {
          const checkboxName = checkbox.getAttribute("name");
          const isChecked = checkbox.checked;
          doc.ref.update({
            [checkboxName]: isChecked,
          });
        });
      })
      .catch((error) => {
        console.log("Error getting checklist collection: ", error);
      });

    // Go to the correct user document by referencing the user uid
    const currentUser = db.collection("users").doc(user.uid);
    return currentUser
      .update({
        preferences: preferences,
      })
      .then(() => {
        console.log("Preferences saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving preferences: ", error);
      });
  } else {
    // No user is signed in.
    console.log("No user is signed in");
  }
});
