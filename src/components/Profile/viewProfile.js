// Import Firebase SDK functions needed for authentication and database operations.
import {
    app
} from "../firebase-setup.js";
import {
    getAuth,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc
} from 'firebase/firestore/lite';

// Fetch and display user data from Firestore using their userId.
// This async function retrieves user data and updates the DOM with the information.
async function fetchUserData(userId, db) {
    const userRef = doc(db, "users", userId); // Reference to the user document in Firestore.
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const userData = docSnap.data(); // Extract user data if document exists.
            
            // Update the HTML elements with user data or display 'N/A' if data is missing.
            document.getElementById("first-name-label").textContent = userData.firstName || 'N/A';
            document.getElementById("last-name-label").textContent = userData.lastName || 'N/A';
            // Continues for other user attributes...

            // Set profile image source, defaulting to a placeholder image if not provided.
            const profileImage = document.getElementById('user-profile');
            profileImage.src = userData.photoURL || "../../../assets/images/defualt-avatar.png";
        } else {
            console.log("No such document exists!"); // Log if the user document doesn't exist.
        }
    } catch (error) {
        // Catch and log any errors during fetch operation.
        console.log("error code: "+error.errorcode+", message: "+error.message); 
    }
}
