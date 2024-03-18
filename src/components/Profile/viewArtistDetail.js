// Import Firebase SDK functions needed for authentication and database operations.
import {
    app
} from "../firebase-setup.js";
import {
    getAuth,
    
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc
} from 'firebase/firestore/lite';

// Initialize Firebase Authentication and Firestore services.
const auth = getAuth(app);
const db = getFirestore(app);

// This function retrieves user data and updates the DOM with the information.
async function fetchUserData(userId) {
    const userRef = doc(db, "users", userId); // Reference to the user document in Firestore.
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const userData = docSnap.data(); // Extract user data if document exists.
            console.log(userData)
            // Update the HTML elements with user data or display 'N/A' if data is missing.
            document.getElementById("user-fullname").textContent = `${userData.firstName || 'N/A'} ${userData.lastName || 'N/A'}`;
            document.getElementById("last-name-label").innerHTML = userData.lastName  || "N/A";
            document.getElementById("first-name-label").innerHTML = userData.firstName  || "N/A";

            document.getElementById("user-role").textContent = userData.role || 'N/A';
            document.getElementById("user-city").textContent = userData.country || 'N/A';
            document.getElementById("website-link").textContent = userData.websiteLink || 'N/A';
            document.getElementById("twitter-link").textContent = userData.twitterLink || 'N/A';
            document.getElementById("instagram-link").textContent = userData.instagramLink || 'N/A';
            document.getElementById("facebook-link").textContent = userData.facebookLink || 'N/A';
            document.getElementById("DOB-label").textContent = userData.dob || 'N/A';
            document.getElementById("biography-label").textContent = userData.biography || 'N/A';

            // Set profile image source, defaulting to a placeholder image if not provided.
            const profileImage = document.getElementById('user-profile');
            profileImage.src = userData.photoURL || "../../../assets/images/default-avatar.png";
        } else {
            console.log("No such document exists!"); // Log if the user document doesn't exist.
        }
    } catch (error) {
        // Catch and log any errors during fetch operation.
        console.log("Error code: "+error.errorcode+", message: "+error.message); 
    }
}

// Attempt to retrieve the user ID from local storage and fetch user data
const userId = localStorage.getItem('artistUID');
if (userId && userId !== 'N/A') {
    fetchUserData(userId);
} else {
    console.log("User ID not found or invalid in local storage.");
}