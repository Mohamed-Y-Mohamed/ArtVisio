// Importing necessary Firebase functionalities
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '../firebase-setup';

// Initializing Firebase authentication and database references
const auth = getAuth(app);
const db = getFirestore(app);

// Checks a user's role in the system by fetching their profile info from Firestore.
const getUserRole = async (userId) => {
    const userProfileRef = doc(db, "users", userId);
    const userProfileSnap = await getDoc(userProfileRef);
    if (userProfileSnap.exists()) {
        // Found the user profile, let's return their role.
        return userProfileSnap.data().role;
    } else {
        // User profile wasn't found, that's odd!
        console.error("No profile found for user: " + userId);
        return null;
    }
};

// Let's ensure that as soon as our page loads, we know who's visiting.
onAuthStateChanged(auth, user => {
    if (!user) {
        // No one's signed in. Let's kindly ask them to sign in.
        alert("Oops! Looks like you're not signed in.");
        window.location.href = "/signup.html";
    } else {
        // A user is signed in! Now, let's check if they're an artist.
        getUserRole(user.uid).then(role => {
            if (role !== "artist") {
                // Not an artist? Then, this place isn't for you, I'm afraid.
                alert("Sorry, but you need to be an artist to upload artwork here.");
                window.location.href = "/gallery.html";
            }
            // If they're an artist, they're exactly where they should be!
        });
    }
});

// When the 'Upload Artwork' button is clicked, let's get to work.
document.getElementById("Upload-Artwork").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the page from refreshing.

    const user = auth.currentUser; // At this point, we know we have a user.

    // Collect all the information about the artwork from the form.
    const artworkName = document.getElementById("Artwork-Name").value;
    const description = document.getElementById("Artwork-Description").value;
    let artworkType = document.getElementById("Artwork-Type").value;
    const fileInput = document.getElementById('user-Artwork');
    const file = fileInput.files[0];

    // If no type is selected, let's be clear about it.
    if (artworkType === "Select Artwork Type") {
        artworkType = "No type provided by the artist.";
    }

    if (file) {
        // Time to store the artwork in Firebase Storage.
        const storage = getStorage(app);
        const artworkRef = storageRef(storage, `userArtworks/${file.name}`);
        try {
            // Upload the file and get the URL to show it off later.
            const snapshot = await uploadBytes(artworkRef, file);
            const imageUrl = await getDownloadURL(snapshot.ref);

            // Now, let's save the artwork details in Firestore.
            const artworksRef = collection(db, `users/${user.uid}/artworks`);
            await setDoc(doc(artworksRef), {
                name: artworkName,
                description,
                type: artworkType,
                imageUrl
            });

            // Everything went smoothly!
            alert("Your artwork is now part of your virtual gallery!");
        } catch (error) {
            // Uh-oh, something went wrong. Better let the user know.
            alert("Hmm, we hit a snag: " + error.message);
        }
    } else {
        // No file was selected, can't really proceed without one.
        alert("Please select an artwork image to upload.");
    }
});
