// Import necessary Firebase functions
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { app } from "../firebase-setup"; // Import your Firebase configuration

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
            // Set user profile image or default image
            const profileImage = document.getElementById('user-profile');
            profileImage.src = userData.photoURL || "../../../assets/images/defualt-avatar.png";
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log("Error fetching user data:", error.message);
    }
};

// Listen for click event on the "Save Changes" button
document.getElementById("userProfile-saveChange").addEventListener("click", async function () {
    // Get file from the file input
    const fileInput = document.getElementById('formFileLg');
    const file = fileInput.files[0];
    // Reinitialize Firebase services
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const user = auth.currentUser;
    // Use your default image URL use defualt image as backup if no image selected. 
    let profileImage = document.getElementById('user-profile').src || "../../../assets/images/defualt-avatar.png"; 


    if (file) {
        // If file is selected, upload it to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        try {
            await uploadBytes(storageRef, file);
            profileImage = await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading image: " + error.message);
            return;
        }
    }

    // Prepare user data for update
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
        photoURL: profileImage
    };

    // Update Firestore document with new user data
    const userRef = doc(db, "users", user.uid);
    try {
        await updateDoc(userRef, userDataToUpdate);
        alert("Profile updated successfully!");
         // Reload the page to reflect changes
        window.location.href = "/viewProfileUser.html";
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile: " + error.message);
    }
});
