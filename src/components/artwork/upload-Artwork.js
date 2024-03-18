// Importing necessary Firebase functionalities
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { app } from '../firebase-setup';





// When the 'Upload Artwork' button is clicked, let's get to work.
document.getElementById("Upload-Artwork").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the page from refreshing.
    const auth = getAuth(app);
    const user = auth.currentUser; // At this point, we know we have a user.
const db = getFirestore(app);
    // Collect all the information about the artwork from the form.
    const artworkName = document.getElementById("Artwork-Name").value;
    const description = document.getElementById("Artwork-Description").value;
    let artworkType = document.getElementById("Artwork-Type").value;
    const fileInput = document.getElementById('user-Artwork');
    const file = fileInput.files[0];
const date= document.getElementById('creation-date').value;
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
                imageUrl,
                creationDate:date,
                displayed:0
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
