let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
    // 1. Capture the form data
    const title = document.querySelector("#noteTitle");
    const text = document.querySelector("#noteText");
    // 2. Format the data 
    const note = {
        "title": title.value, 
        "text": text.value,
    };
    // 3. Clear the form so that we can write a new note
        // title.value = "";
        // text.value = "";

    // 4. Write it to our database
    console.log(googleUser);
    console.log(note);
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`);
    dbRef.push(note).then(()=> {
        title.value = "";
        text.value = "";
    });
    // we want a variable with the form: 
    // note = {
        // title: ------
        // text: ------ 
    // }
}
