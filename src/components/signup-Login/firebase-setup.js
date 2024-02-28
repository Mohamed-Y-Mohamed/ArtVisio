import { initializeApp } from "firebase/app";

 //firebase link
 // https://firebase.google.com/docs/web/setup#available-libraries

 //  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8CnGwlFSZ1q-BTj9SaeHaY3K41f8n1dM",
  authDomain: "artvisio-fae52.firebaseapp.com",
  projectId: "artvisio-fae52",
  storageBucket: "artvisio-fae52.appspot.com",
  messagingSenderId: "96525313731",
  appId: "1:96525313731:web:c28400467e581836646476"
};
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export { app };
