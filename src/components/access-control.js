import { app } from "./firebase-setup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";

// Define the fetchUserData function
async function fetchUserData(userId, db) {
    const userRef = doc(db, "users", userId);
    try {
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
        } else {
            console.log("No such user!");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
    
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
            window.location.href = "/signin.html";
        }
    });
});
