import {
    app
} from "../firebase-setup";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,setDoc
} from 'firebase/firestore/lite';
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.needs-validation');

    // Event listener for the form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (form.checkValidity() && isAnyRadioButtonSelected()) {
            // Extract user input values
            const email = document.getElementById("Signup-Email").value;
            const password = document.getElementById("Signup-Pass").value;
            const firstname = document.getElementById("Signup-FN").value;
            const lastname = document.getElementById("Signup-LN").value;
            const userType = document.querySelector('input[name="radio-stacked"]:checked').value;

            // Firebase signup function
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
                    role: userType,
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
        } else {
            form.classList.add('was-validated'); // Trigger bootstrap validation feedback
        }
    });

    function isAnyRadioButtonSelected() {
        const radioButtons = document.querySelectorAll('input[name="radio-stacked"]');
        return Array.from(radioButtons).some(radio => radio.checked);
    }
});

// Make sure you have your Firebase app and auth modules initialized here
// Example:
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
