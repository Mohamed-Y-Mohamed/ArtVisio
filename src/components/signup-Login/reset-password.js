import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../firebase-setup'; // Adjust the import path as needed

// Initialize Firebase Authentication
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function () {
    // Get the button by its ID
    const resetPasswordButton = document.getElementById('reset-password');

    // Make sure the button is found
    if (resetPasswordButton) {
        // Attach the event listener to the form submission event to prevent default behavior
        resetPasswordButton.form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting in the traditional way

            const email = document.getElementById("signin-email").value; // Get the email from the form


            sendPasswordResetEmail(auth, email).then(() => {
                alert("Password reset email sent! Check your inbox.");
                window.location.href="/signin.html"
                // Optional: Clear the form or redirect the user
            }).catch((error) => {
                // Handle errors here
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Error: ${errorMessage}`);
            });
        });
    }
});