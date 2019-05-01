firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
    //  document.getElementById("user_div").style.display = "block";
      document.getElementById("reg_div").style.display = "none";
  
      window.location = "RegistrationS.html";
      firebase.auth().signOut();
  
      var user = firebase.auth().currentUser;
  
    //  window.alert("login");
  
      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("reg_div").style.display = "block";
  
    }
  });

  var userEmail;
  var userPass;


var travelRef = firebase.database().ref('TravelCustomers');

travelRef.on('value', gotData, errData);

var usernameC = [];
function gotData(data) {
var travel = data.val();
var keys = Object.keys(travel);
for(var i=0; i < keys.length; i++) {
	var k = keys[i]; 
	usernameC[i]= travel[k].username;
}
}

function errData(err) {
console.log('Error');
console.log(err);
} 

document.getElementById('registerForm').addEventListener('submit', submitForm);

function submitForm(e) {
e.preventDefault();

var username = getInput('email');
var password = getInput('password');
var pass2 = getInput('pass2');
var firstName = getInput('firstName');
var lastName = getInput('lastName');
var email = getInput('username');
var phone = getInput('phone');
var street = getInput('street');
var city = getInput('city');
var state = getInput('state');
var zip = getInput('zip');

if(password == pass2 && doesExist() ) {

	userEmail = document.getElementById("username").value;
  userPass = document.getElementById("password").value;
	openN();

	saveTravel(username, password, firstName, lastName, email, phone, street, city, state, zip);
	document.getElementById('registerForm').reset();
}


}

function getInput(id) {
return document.getElementById(id).value;
}

function saveTravel(username, password, firstName, lastName, email, phone, street, city, state, zip) {
var newTravelRef = travelRef.push();
newTravelRef.set({
	username:username,
	password:password,
	firstName:firstName,
	lastName:lastName,
	email:email,
	phone:phone,
	street:street,
	city:city,
	state:state,
	zip:zip
});
}

function match() {
if (getInput('password') == getInput('pass2')) {
	document.getElementById('matching').style.color = 'green';
	document.getElementById('matching').innerHTML = 'Passwords Match';
} else {
	document.getElementById('matching').style.color = 'red';
	document.getElementById('matching').innerHTML = 'Passwords do not match';
}
}

function pass_len() {
	if (getInput('password').length < 6) {
		document.getElementById('pass_length').style.color = 'red';
		document.getElementById('pass_length').innerHTML = 'minimum 6 character';
	} else {
		document.getElementById('pass_length').style.color = 'green';
		document.getElementById('pass_length').innerHTML = '';
	}
	}
function getUsername(){
	return usernameC;
}
function doesExist() {
var isExist = true;
for (i = 0; i < usernameC.length; i ++) {
	if(usernameC[i] == getInput('email')) {
		isExist = false;
	}
}
return isExist;
}

function exists() {
	if (doesExist()) {
		document.getElementById('user').style.color = 'green';
		document.getElementById('user').innerHTML = 'Email available';
	} else {
		document.getElementById('user').style.color = 'red';
		document.getElementById('user').innerHTML = 'Email Unavailable';
	}

	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(getInput('username')))
  {
		document.getElementById('checkemail').style.color = 'green';
		document.getElementById('checkemail').innerHTML = 'Valid Email';
	} else {
		document.getElementById('checkemail').style.color = 'red';
		document.getElementById('checkemail').innerHTML = 'Not a valid Email';
	}
}

function openN() {
// window.open("RegistrationS.html","_self")

firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;

	window.alert("Error : " + errorMessage);

	// ...
  });
	
}

// signup.addEventListener('click', e => {
// 	const auth = firebase.auth();
// 	const promise = auth.createUserWithEmailAndPassword(email.value, password.value);

// 	promise.catch(e => console.log(e.message)); 
// });