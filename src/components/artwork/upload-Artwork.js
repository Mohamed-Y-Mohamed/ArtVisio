// Assuming firebase-setup.js correctly initializes Firebase and exports 'app'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc,getDoc } from 'firebase/firestore';
import { app } from '../firebase-setup';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.needs-validation');
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation(); // Stop form from submitting
            form.classList.add('was-validated'); // Trigger Bootstrap's validation styles
        } else {
            // Proceed with the Firebase upload and Firestore document creation
            const storage = getStorage(app);
            const db = getFirestore(app);
            const auth = getAuth(app);
            const user = auth.currentUser; // Make sure user is signed in
    
            if (!user) {
                alert("Please sign in to upload artwork.");
                return; // Stop execution if the user is not signed in
            }
    
            const artworkName = document.getElementById("Artwork-Name").value;
            const description = document.getElementById("Artwork-Description").value;
            const artworkType = document.getElementById("Artwork-Type").value;
            const creationDate = document.getElementById('creation-date').value;
            const fileInput = document.getElementById('user-Artwork');
            const file = fileInput.files[0];
    
            if (file) {
                const artworkUID = `${user.uid}-${artworkName}-${artworkType}`.replace(/\s+/g, '-').toLowerCase();
                const artworkDocRef = doc(db, `users/${user.uid}/artworks`, artworkUID);
    
                const docSnap = await getDoc(artworkDocRef);
    
                if (docSnap.exists()) {
                    alert("This artwork already exists in your gallery.");
                    return; // Stop the execution if the artwork already exists
                }
    
                const artworkRef = storageRef(storage, `userArtworks/${artworkUID}/${file.name}`);
                try {
                    const snapshot = await uploadBytes(artworkRef, file);
                    const imageUrl = await getDownloadURL(snapshot.ref);
                    await setDoc(artworkDocRef, {
                        name: artworkName,
                        description: description,
                        type: artworkType,
                        imageUrl: imageUrl,
                        creationDate: creationDate,
                        displayed: 0
                    });
                    alert("Your artwork is now part of your virtual gallery!");
                    form.reset(); // Optional: reset form fields after successful upload
                    form.classList.remove('was-validated'); // Optional: reset form validation state
                } catch (error) {
                    alert("Error uploading artwork: " + error.message);
                }
            } else {
                alert("Please select an artwork image to upload.");
            }
        }
    });
    
});
