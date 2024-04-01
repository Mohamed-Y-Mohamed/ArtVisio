import { app } from '../firebase-setup'; // Adjust the import path as needed
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite'; // Import required Firestore functions

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.custom-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        // Ensure both email and password fields are not empty
        if (email.trim() && password.trim()) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Get the user's document from Firestore
                    const docRef = doc(db, "users", userCredential.user.uid);
                    return getDoc(docRef);
                })
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        const Currentcount = userData.signInCount ; // Increment signInCount
                        const newSignInCount = userData.signInCount + 1; // Increment signInCount
                        // Update signInCount in Firestore
                        updateDoc(docSnap.ref, {
                            signInCount: newSignInCount
                        });

                        // Check new signInCount and redirect accordingly
                        if (Currentcount > 1) {
                            window.location.href = '/gallery.html';
                        } else {
                            window.location.href = '/editProfileuser.html';
                        }
                    } else {
                        throw new Error("No such user!");
                    }
                })
                .catch((error) => {
                    // Log and alert on any error during the sign-in process or fetching/updating user document
                    console.error("Error during sign-in or updating sign-in count: ", error);
                    alert("Failed to sign in or update sign-in count. Please try again.");
                });
        } else {
            alert("Please enter both email and password.");
        }
    });
});
