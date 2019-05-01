function logout(){
    firebase.auth().signOut();
    window.location = "../../../Front\ End\ New/public/index.html";
}
