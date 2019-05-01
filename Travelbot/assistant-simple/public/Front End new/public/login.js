firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

  //  document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    location.reload();
    window.location = "http://localhost:3000";

    var user = firebase.auth().currentUser;

  //  window.alert("login");

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

  // const q = firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;

  //   //  window.alert("You are welcome as a guest");

  // });

}

function g_login(){

  window.alert("You are Logged in as a guest")
  location.reload();

  window.location = "http://localhost:3000";
}
