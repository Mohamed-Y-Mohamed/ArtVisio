// Import the necessary function from the Firebase package to initialize the application.
import {
    initializeApp
} from "firebase/app";

// Define the configuration for the Firebase application.
// This configuration includes the API key, Auth domain, Project ID, Storage Bucket, Messaging Sender ID, and App ID.
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  

// Initialize the Firebase application with the specified configuration.
// This is a crucial step to enable the use of Firebase services throughout the application.
const app = initializeApp(firebaseConfig);

// Export the initialized app for use in other parts of the application where Firebase services are required.
export { app };
