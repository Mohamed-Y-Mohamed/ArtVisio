// Import the necessary function from the Firebase package to initialize the application.
import {
    initializeApp
} from "firebase/app";

// Define the configuration for the Firebase application.
// This configuration includes the API key, Auth domain, Project ID, Storage Bucket, Messaging Sender ID, and App ID.
const firebaseConfig = {
    apiKey: "AIzaSyC8CnGwlFSZ1q-BTj9SaeHaY3K41f8n1dM",
    authDomain: "artvisio-fae52.firebaseapp.com",
    projectId: "artvisio-fae52",
    storageBucket: "artvisio-fae52.appspot.com",
    messagingSenderId: "96525313731",
    appId: "1:96525313731:web:c28400467e581836646476"
};

// Initialize the Firebase application with the specified configuration.
// This is a crucial step to enable the use of Firebase services throughout the application.
const app = initializeApp(firebaseConfig);

// Export the initialized app for use in other parts of the application where Firebase services are required.
export { app };
