function readTip() {
  const collectionRef = db.collection("SafetyTips");
  //console.log(collectionRef);
  collectionRef.get().then((querySnapshot) => {
    const numDocs = querySnapshot.size;
    const randomIndex = Math.floor(Math.random() * numDocs);
    console.log(querySnapshot.docs[randomIndex].data().Tip);
    if (querySnapshot.docs.length >= 1) {
        const tip = querySnapshot.docs[randomIndex].data().Tip;
        document.querySelector(".tip").innerHTML = tip;
      } else {
        console.log("Nothing found.");
      }
  });
}
