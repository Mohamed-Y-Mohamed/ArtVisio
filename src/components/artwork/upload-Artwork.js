// Assuming 'app' is already imported and initialized from "../firebase-setup"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import {app} from '../firebase-setup';
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("Upload-Artwork").addEventListener("click", async function () {
    const user = auth.currentUser;
    
    if (!user) {
        alert("No user is signed in.");
        return;
    }

    const artworkName = document.getElementById("Artwork-Name").value;
    const description = document.getElementById("Artwork-Description").value;
    let artworkType = document.getElementById("Artwork-Type").value;
    const fileInput = document.getElementById('user-Artwork');
    const file = fileInput.files[0];
if(artworkType =="Select Artwork Type"){
    artworkType="Artist has not provided a type for the artwork."
}
    if (file) {
        const storage = getStorage(app);
        const artworkStorageRef = storageRef(storage, `userArtworks/${file.name}`);
        
        try {
            const snapshot = await uploadBytes(artworkStorageRef, file);
            const imageUrl = await getDownloadURL(snapshot.ref);
            
            // Note: The path is 'users/{userId}/artworks', similar to 'rooms/roomA/messages'
            const artworksRef = collection(db, `users/${user.uid}/artworks`);
            const newArtworkRef = doc(artworksRef);

            await setDoc(newArtworkRef, {
                name: artworkName,
                description: description,
                type: artworkType,
                imageUrl: imageUrl
            });
            
            alert("Artwork uploaded and information stored successfully!");
        } catch (error) {
            alert("Error storing artwork information: "+ error.code+ "    " + error.message);
        }
    } else {
        alert("Please select an artwork image to upload.");
    }
});
