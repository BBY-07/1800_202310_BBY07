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

        // Get the Checkboxes collection for the current user
        const checkboxesRef = currentUser.collection("Checkboxes");

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

                // Check the checkbox if the value is in the Checkboxes collection
                checkboxesRef.doc(key).get().then((doc) => {
                  if (doc.exists) {
                    checkbox.checked = doc.data()[key];
                  }
                });

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
            div.appendChild(document.createTextNode(checkbox.label));

            // Add the div element to the checkboxes container
            checkboxesContainer.appendChild(div);
          });
        });
      });
    }
  });
}

generateCheckboxes();



function saveChecklist() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const preferences = {};

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      preferences[checkbox.name] = true;
    } else {
      preferences[checkbox.name] = false;
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      // Get a reference to the "Checkboxes" collection for the current user:
      const checkboxesRef = db.collection("users").doc(user.uid).collection("Checkboxes");

      // Write the checkbox values to Firestore:
      const promises = Object.keys(preferences).map((fieldName) => {
        return checkboxesRef.doc(fieldName).set({ [fieldName]: preferences[fieldName] })
          .then(() => {
            console.log(`Checkbox ${fieldName} saved successfully!`);
          })
          .catch((error) => {
            console.error(`Error saving checkbox ${fieldName}: `, error);
          });
      });

      // Check if there are any items in the "Checkboxes" collection that aren't in the current preferences:
      checkboxesRef.get().then((snapshot) => {
        const docsToDelete = [];
        snapshot.forEach((doc) => {
          const fieldName = doc.id;
          if (!preferences.hasOwnProperty(fieldName)) {
            docsToDelete.push(doc.ref);
          }
        });

        // Delete any items in the "Checkboxes" collection that aren't in the current preferences:
        const deletePromises = docsToDelete.map((ref) => {
          return ref.delete()
            .then(() => {
              console.log(`Checkbox ${ref.id} deleted successfully!`);
            })
            .catch((error) => {
              console.error(`Error deleting checkbox ${ref.id}: `, error);
            });
        });

        // Wait for all writes and deletes to complete before logging success message:
        Promise.all([...promises, ...deletePromises])
          .then(() => {
            console.log("Checkbox preferences saved successfully!");
          })
          .catch((error) => {
            console.error("Error saving checkbox preferences: ", error);
          });
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

function addChecklistItem() {
  // Get the input field and value
  var checkboxesDiv = document.getElementById("Checkboxes");
  let childCount = checkboxesDiv.childElementCount;
  var newItemInput = document.getElementById("newChecklistItem");
  var newItemValue = childCount + 1 + ": " + newItemInput.value;

  // Create a new checkbox element
  var newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.name = "checklistItem";
  newCheckbox.value = newItemValue;

  // Create a new label element for the checkbox
  var newLabel = document.createElement("label");
  newLabel.htmlFor = newItemValue;
  newLabel.appendChild(document.createTextNode(newItemValue));

  // Create a new div to contain the checkbox and label
  var newDiv = document.createElement("div");
  newDiv.appendChild(newCheckbox);
  newDiv.appendChild(newLabel);

  // Add the new div to the "Checkboxes" div
  
  checkboxesDiv.appendChild(newDiv);

  // Reset the input field
  newItemInput.value = "";
}


