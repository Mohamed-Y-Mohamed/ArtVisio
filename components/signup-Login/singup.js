import { app } from "../firebase-setup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore/lite';

const auth = getAuth();
const db = getFirestore(app);

const submit = document.getElementById("signup-submit");

submit.addEventListener('click', function(event) {
    event.preventDefault();

    const email = document.getElementById("Signup-Email").value;
    const password = document.getElementById("Signup-Pass").value;
    const firstname = document.getElementById("Signup-FN").value;
    const lastname = document.getElementById("Signup-LN").value;

    let userRole = document.getElementById('signup-role').checked ? 'artist' : 'art enthusiast';

    createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Creating account. User ID: " + user.uid);

            return setDoc(doc(db, "users", user.uid), {
                firstName: firstname,
                lastName: lastname,
                email: email,
                role: userRole
            });
        })
        .then(() => {
            alert("User data added successfully!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Unable to create account.\n" + errorCode + "\n" + errorMessage);
        });
});