// Firebase setup and user registration
import { app } from "./firebase-setup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Logging in. User ID: " + user.uid);
      // Redirect or perform actions after successful login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Unable to log in.\n" + errorCode + "\n" + errorMessage);
      // Handle login errors here
    });
}

// Event listener for the login button
document.getElementById("signin-button").addEventListener("click", function(event){
  event.preventDefault()
const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  if (email.trim() === '' || password.trim() === '') {
    alert("Please enter both email and password.");
  
  } else {
      alert(email+", "+ password)
    loginUser(email, password);
  }
});
