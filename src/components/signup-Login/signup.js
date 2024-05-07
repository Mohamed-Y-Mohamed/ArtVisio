import { app } from "../firebase-setup";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signOut 
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    setDoc 
} from 'firebase/firestore/lite';

const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.needs-validation');
    const radioError = document.getElementById('radio-error'); 

    // Event listener for the form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (form.checkValidity() && isAnyRadioButtonSelected()) {
            // If valid, hide the radio button error message
            radioError.style.display = 'none';
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
                
                // Send email verification
                return sendEmailVerification(user).then(() => {
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
                        signupDate: signupDate, 
                        signInCount: 0 
                    });
                });
            })
            .then(() => {
                alert("Signup successful! Please check your email to verify your account.");
                signOut(auth).then(() => {
                    window.location.href="/signin.html"
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Unable to create account.\n" + errorCode + "\n" + errorMessage);
            });
        } else {
            // If not valid, show the radio button error message
            radioError.style.display = 'block';
            form.classList.add('was-validated'); 
        }
    });

    function isAnyRadioButtonSelected() {
        const radioButtons = document.querySelectorAll('input[name="radio-stacked"]');
        return Array.from(radioButtons).some(radio => radio.checked);
    }
});
