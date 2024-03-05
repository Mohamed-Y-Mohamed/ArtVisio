import {
    app
} from "../firebase-setup";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    collection,
    doc,
    setDoc
} from 'firebase/firestore/lite';

const auth = getAuth();
const db = getFirestore(app);

// Event listener for sign-up form submission
const submit = document.getElementById("signup-submit");

submit.addEventListener('click', function (event) {
    event.preventDefault();

    // Get user input values
    const email = document.getElementById("Signup-Email").value;
    const password = document.getElementById("Signup-Pass").value;
    const firstname = document.getElementById("Signup-FN").value;
    const lastname = document.getElementById("Signup-LN").value;

    // Determine user role based on checkbox
    let userRole = document.getElementById('signup-role').checked ? 'artist' : 'art enthusiast';

    // Create user account and add user data to Firestore
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Creating account. User ID: " + user.uid);

            // Format the current date as dd/mm/yyyy
            const currentDate = new Date();
            const signupDate = currentDate.getDate().toString().padStart(2, '0') + '/' +
                (currentDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
                currentDate.getFullYear();

            // Add user data to Firestore, including formatted signupDate and initializing signInCount
            return setDoc(doc(db, "users", user.uid), {
                firstName: firstname,
                lastName: lastname,
                email: email,
                role: userRole,
                signupDate: signupDate, // Storing the formatted signup date
                signInCount: 0 // Initializing the sign-in count
            });
        })
        .then(() => {
            alert("User data added successfully!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Unable to create account.\n" + errorCode + "\n" + errorMessage);
        });
});
