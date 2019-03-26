// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
  
//     //  document.getElementById("user_div").style.display = "block";
//       document.getElementById("reg_div").style.display = "none";
  
//       window.location = "RegistrationS.html";
//       firebase.auth().signOut();
  
//       var user = firebase.auth().currentUser;
  
//     //  window.alert("login");
  
//       if(user != null){
  
//         var email_id = user.email;
//         document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
//       }
  
//     } else {
//       // No user is signed in.
  
//       document.getElementById("user_div").style.display = "none";
//       document.getElementById("reg_div").style.display = "block";
  
//     }
//   });


// function reguser(){

//     var userEmail = document.getElementById("email").value;
//     var userPass = document.getElementById("password").value;
  
//     firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
  
//       window.alert("Error : " + errorMessage);
  
//       // ...
//     });
  
//   }