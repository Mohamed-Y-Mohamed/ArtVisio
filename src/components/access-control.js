// Listen for the DOMContentLoaded event to ensure the HTML is fully loaded before executing the script.
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Firebase Authentication service.
    const auth = getAuth(app);
    // Initialize the Firebase Firestore service.
    const db = getFirestore(app);

    // Listen for changes in the authentication state (e.g., user signs in or out).
    onAuthStateChanged(auth, user => {
        if (user) {
            // A user is currently signed in. Proceed to fetch the user's data using their UID.
            fetchUserData(user.uid, db);
        } else {
            // No user is signed in. Redirect the user to the sign-in page.
            console.log("No user is signed in.");
            window.location.href = "/signin.html"
        }
    });
});
