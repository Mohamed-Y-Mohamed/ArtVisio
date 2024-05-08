
// Import necessary Firebase functions
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { app } from "../firebase-setup"; 

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Firebase Authentication and Firestore
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Check for user's authentication status
    onAuthStateChanged(auth, user => {
        if (user) {
            // Fetch user data if a user is signed in
            fetchUserData(user.uid, db);
        } else {
            console.log("No user is signed in.");
        }
    });
});

// Function to fetch user data from Firestore
async function fetchUserData(userId, db) {
    const userRef = doc(db, "users", userId);
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            // Populate form fields with fetched user data
            document.getElementById("user-firstname").value = userData.firstName || '';
            document.getElementById("user-lastname").value = userData.lastName || '';
            document.getElementById("user-country").value = userData.country || '';
            document.getElementById("user-DOB").value = userData.dob || '';
            document.getElementById("user-Biography").value = userData.biography || '';
            document.getElementById("user-website-Link").value = userData.websiteLink || '';
            document.getElementById("user-twitter-link").value = userData.twitterLink || '';
            document.getElementById("user-instagram-link").value = userData.instagramLink || '';
            document.getElementById("user-facebook-link").value = userData.facebookLink || '';
            document.getElementById('user-profile').src = userData.photoURL || "../../../assets/images/defualt-avatar.png";
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

document.getElementById("userProfile-saveChange").addEventListener("click", async function () {
    const fileInput = document.getElementById('formFileLg');
    const file = fileInput.files[0];

    // Validate image type if a file is selected
    if (file && !['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
        alert("Invalid image format. Please select a PNG, JPG, JPEG, or GIF file.");
        return;
    }

    // Validate URL formats using regular expressions
    const urlRegex = /^https?:\/\/.+/;
    const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/;
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}$/;
    const facebookRegex = /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.]{1,50}$/;

    // Collect input values
    const userDataToUpdate = {
        firstName: document.getElementById("user-firstname").value.trim(),
        lastName: document.getElementById("user-lastname").value.trim(),
        country: document.getElementById("user-country").value.trim(),
        dob: document.getElementById("user-DOB").value.trim(),
        biography: document.getElementById("user-Biography").value.trim(),
        websiteLink: document.getElementById("user-website-Link").value.trim(),
        twitterLink: document.getElementById("user-twitter-link").value.trim(),
        instagramLink: document.getElementById("user-instagram-link").value.trim(),
        facebookLink: document.getElementById("user-facebook-link").value.trim(),
        photoURL: document.getElementById('user-profile').src || "../../../assets/images/defualt-avatar.png"
    };

    // Check URL validations
    if (userDataToUpdate.websiteLink && !urlRegex.test(userDataToUpdate.websiteLink) ||
        userDataToUpdate.twitterLink && !twitterRegex.test(userDataToUpdate.twitterLink) ||
        userDataToUpdate.instagramLink && !instagramRegex.test(userDataToUpdate.instagramLink) ||
        userDataToUpdate.facebookLink && !facebookRegex.test(userDataToUpdate.facebookLink)) {
        alert("One or more URLs are invalid. Please check and correct them.");
        return;
    }

    // Initialize Firebase services
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const user = auth.currentUser;

    // Proceed with file upload if a file is selected
    if (file && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        try {
            await uploadBytes(storageRef, file);
            userDataToUpdate.photoURL = await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading image: " + error.message);
            return;
        }
    }

    // Update Firestore document with new user data
    const userRef = doc(db, "users", user.uid);
    try {
        await updateDoc(userRef, userDataToUpdate);
        alert("Profile updated successfully!");
window.location.href="/viewProfileUser.html"  
  } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile: " + error.message);
    }
});
