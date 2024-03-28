// signin.js
import { app } from '../firebase-setup'; // Adjust the import path as needed
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Initialize Firebase Authentication
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.custom-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        // Ensure both email and password fields are not empty
        if (email.trim() && password.trim()) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    window.location.href = '/gallery.html';
                })
                .catch((error) => {
                    // Log and alert on any error during the sign-in process
                    console.error("Error signing in: ", error);
                    alert("Failed to sign in. Please check your credentials and try again.");
                });
        } else {
            alert("Please enter both email and password.");
        }
    });
});
