import {
    app
} from "../firebase-setup";
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore/lite';

const auth = getAuth();
const db = getFirestore(app);

function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Fetch and update sign-in count
            const userRef = doc(db, "users", user.uid);
            return getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const signInCount = docSnap.data().signInCount || 0;
                    const newSignInCount = signInCount + 1;
                    alert("you are signed in.")

                    // Update signInCount in Firestore
                    updateDoc(userRef, {
                        signInCount: newSignInCount
                    }).then(() => {
                        // Redirect based on signInCount
                        if (newSignInCount <= 1) {
                            window.location.href = '/editProfileuser.html';
                        } else {
                            window.location.href = '/gallery.html';
                        }
                    });
                } else {
                    // Handle case where user document does not exist
                    console.error("No such document!");
                }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Unable to log in.\n" + errorCode + "\n" + errorMessage);
        });
}

// Event listener for the login button
document.getElementById("signin-button").addEventListener("click", function (event) {
    event.preventDefault()
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    if (email.trim() === '' || password.trim() === '') {
        alert("Please enter both email and password.");

    } else {
        loginUser(email, password);
    }
});
