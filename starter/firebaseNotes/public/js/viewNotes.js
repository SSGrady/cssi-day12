let googleUser;
window.onload = (event) => {
firebase.auth().onAuthStateChanged((user)=>{
    if (user){
        googleUser = user;
        getNotes(googleUser.uid);
    }   else {
    window.location = 'index.html';
    }
})
};

const getNotes = (userId) => {
    console.log('logged in as user' + userId);
    // 1 Get access to all the current user's notes
   const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
    // console.log(snapshot.val());
    const data = snapshot.val()
    // document.querySelector('#app').innerHTML = "";
    renderData(data);
   });
}


const renderData = (data) => {
    // console.log(data);
    const destination = document.querySelector('#app');
    destination.innerHTML = ""
    for(let key in data){
        const note = data[key];
        destination.innerHTML += createCard(note);
    }
};

const createCard = (note) => {
    return `<div class="column is-one-quarter"> 
                <div class="card">
                <header class="card-header">
                <p class="card-header-title">
                ${note.title}
                </p>
                </header>
                <div class="card-content"> 
                <div class="content">
                ${note.text}
                </div>
             </div>
        </div>
    </div>`;

};