// Import necessary functions from Firebase SDK
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

// Function to fetch and display user data
async function fetchUserData(userId, db) {
    const userRef = doc(db, "users", userId);
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            // Display user's personal information
            document.getElementById("first-name-label").textContent = userData.firstName || 'N/A';
            document.getElementById("last-name-label").textContent = userData.lastName || 'N/A';
            document.getElementById("country-label").textContent = userData.country || 'N/A';
            document.getElementById("DOB-label").textContent = userData.dob || 'N/A';
            document.getElementById("biography-label").textContent = userData.biography || 'N/A';
            document.getElementById("user-role").textContent = userData.role.toUpperCase() || 'N/A';
            document.getElementById("user-city").textContent = userData.country.toUpperCase() || 'N/A';
            document.getElementById("website-link").textContent = userData.websiteLink || 'N/A';
            document.getElementById("twitter-link").textContent = userData.twitterLink || 'N/A';
            document.getElementById("instagram-link").textContent = userData.instagramLink || 'N/A';
            document.getElementById("facebook-link").textContent = userData.facebookLink || 'N/A';
            const profileImage = document.getElementById('user-profile');
            profileImage .src = userData.photoURL || "../../../assets/images/defualt-avatar.png";
        } else {
            console.log("No such document exists!");
        }
    } catch (error) {}
}

// Main block to handle auth state changes and fetch user data
// it will execute once page loaded. retirevingfrom database.
document.addEventListener("DOMContentLoaded", function () {
    const auth = getAuth(app);
    const db = getFirestore(app);

    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in, now fetch user data
            fetchUserData(user.uid, db);
        } else {
            // No user is signed in. Handle accordingly
            console.log("No user is signed in.");
            window.location.href = "/signin.html"
        }
    });
});
