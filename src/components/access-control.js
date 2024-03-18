
import {app} from "./firebase-setup";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// Listen for the DOMContentLoaded event to ensure the HTML is fully loaded before executing the script.
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Firebase Authentication service.
    const auth = getAuth(app);
    // Initialize the Firebase Firestore service.
    const db = getFirestore(app);

    // Listen for changes in the authentication state (e.g., user signs in or out).
    onAuthStateChanged(auth, user => {
        if (user) {
            fetchUserData(user.uid, db);
        } else {
            // No user is signed in. Redirect the user to the sign-in page.
            console.log("No user is signed in.");
            window.location.href = "/signin.html"
        }
    });
});
