 //imports section
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
 //firebase link
 // https://firebase.google.com/docs/web/setup#available-libraries

 //  web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyD_3bhaBq78XxKkLU4fZkZMt04DVYR--vg",
   authDomain: "artvisio-b3b76.firebaseapp.com",
   projectId: "artvisio-b3b76",
   storageBucket: "artvisio-b3b76.appspot.com",
   messagingSenderId: "705790621970",
   appId: "1:705790621970:web:11c06cfa679c1e251e1bcb"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 
 const auth = getAuth();


 const submit = document.getElementById("signup-submit");

//sign up with submit button click
 submit.addEventListener('click',function(event) {
//remove defualt reload
 event.preventDefault();

 // store signup data
 const email = document.getElementById("Signup-Email").value;

 const password = document.getElementById("Signup-Pass").value;

 const firstname = document.getElementById("Signup-FN").value;

 const lastname = document.getElementById("Signup-LN").value;

//role check for switcher
let role = "";
if (document.getElementById('signup-role').checked) {
    role = 'artist';
} else {
    role = 'art enthusiast';
}


 //firebase signup
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert(" creatinh account." + " User ID:"+ user.uid);

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("unable to create account.\n"+errorCode+"\n"+errorMessage )
  });
} )

