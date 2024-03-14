import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";


// Import necessary functions from Firebase SDK


import {app} from "./firebase-setup";
const auth = getAuth(app);
const db = getFirestore(app);

const getUserRole = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().role; // Assuming there is a role field
  } else {
    return null;
  }
};

const updateNavbar = async (user) => {
  const navContainer = document.getElementById('navbar');
  if (user) {
    const userRole = await getUserRole(user.uid);
    let navContent = `
    <nav class="navbar navbar-expand-lg" style="background: linear-gradient(to bottom right,  #EE5007,#010f29 );">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <svg xmlns="http://www.w3.org/2000/svg" style="padding-right: 1%;height:1em" viewBox="0 0 512 512">
                <path fill="#EE5007" d="M2 377.4l43 74.3A51.4 51.4 0 0 0 90.9 480h285.4l-59.2-102.6zM501.8 350L335.6 
                59.3A51.4 51.4 0 0 0 290.2 32h-88.4l257.3
                 447.6 40.7-70.5c1.9-3.2 21-29.7 2-59.1zM275 304.5l-115.5-200L44 304.5z" />
            </svg>
            ARTVISIO
        </a>
        <div class="dropdown">
            <button class="btn  custom-btn btn d-lg-none ms-auto me-4 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                More Options
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">edit profile</a>
                <a class="dropdown-item" href="#">reload scene</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">signout</a>
            </div>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style="padding-right: 1rem;">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                <li class="nav-item">
                    <a class="nav-link click-scroll" href="/" style="color: rgb(201, 247, 247);">Home</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link click-scroll" href="/instruction.html" style="color: rgb(201, 247, 247);">Instruction</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link click-scroll" href="/aboutus.html" style="color: rgb(201, 247, 247);">About us</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link click-scroll" href="/contactus.html" style="color: rgb(201, 247, 247);">contact us</a>
                </li>
            </ul>

            <div class="dropdown">
            <button class="btn  custom-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                More Options
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="/editProfileuser.html">edit profile</a>
                <a class="dropdown-item" href="/gallery.html">reload scene</a>
                <div class="replacement"></div>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">signout</a>
            </div>
        </div>
    </div>
</nav>
`;
    if (userRole === 'artist') {
      navContent = navContent.replace('<div class="replacement"></div>', `<a class="dropdown-item" href="/uploadArtwork.html">upload artwork</a>
`);
    }
    navContainer.innerHTML = navContent;
  } else {
    navContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg" style="background: linear-gradient(to bottom right,  #EE5007,#010f29 );">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <svg xmlns="http://www.w3.org/2000/svg" style="padding-right: 1%;height:1em" viewBox="0 0 512 512">
                <path fill="#EE5007" d="M2 377.4l43 74.3A51.4 51.4 0 0 0 90.9 480h285.4l-59.2-102.6zM501.8 350L335.6 
          59.3A51.4 51.4 0 0 0 290.2 32h-88.4l257.3
           447.6 40.7-70.5c1.9-3.2 21-29.7 2-59.1zM275 304.5l-115.5-200L44 304.5z" />
            </svg>
            ARTVISIO
        </a>
        <a href="/signup.html" class="btn custom-btn d-lg-none ms-auto me-4">Login / Singup</a>


        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style="padding-right: 1rem;">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                <li class="nav-item">
                    <a class="nav-link click-scroll" href="/" style="color: rgb(201, 247, 247);">Home</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link click-scroll" href="/instruction.html" style="color: rgb(201, 247, 247);">Instruction</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link click-scroll" href="/aboutus.html" style="color: rgb(201, 247, 247);">About us</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link click-scroll" href="/contactus.html" style="color: rgb(201, 247, 247);">contact us</a>
                </li>
            </ul>

            <a href="/signup.html" class="btn custom-btn d-lg-block d-none">Login / Singup</a>
        </div>
    </div>
</nav>
`;
// Get all the dropdown buttons
var dropdownBtns = document.getElementsByClassName("dropdown-btn");

// Loop through the buttons and add an event listener to each
for (var i = 0; i < dropdownBtns.length; i++) {
    dropdownBtns[i].addEventListener('click', function() {
        // Get the next element sibling (the dropdown content)
        var panel = this.nextElementSibling;
        // Toggle the 'active-dropdown' class to show or hide the dropdown content
        panel.classList.toggle('active-dropdown');
    });
}

  }
  
};

onAuthStateChanged(auth, (user) => {
  updateNavbar(user);
});


document.addEventListener('DOMContentLoaded', function() {
    // Listen for click events on the navbar
    document.getElementById('navbar').addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown toggle or within one
        let dropdownToggle = event.target.closest('.dropdown-toggle');
        
        if (dropdownToggle) {
            let dropdownMenu = dropdownToggle.nextElementSibling;
            
            // Check if the clicked dropdown is already open
            if (dropdownMenu.classList.contains('show')) {
                // Hide the dropdown
                dropdownMenu.classList.remove('show');
                dropdownToggle.setAttribute('aria-expanded', "false");
            } else {
                // Show the dropdown
                dropdownMenu.classList.add('show');
                dropdownToggle.setAttribute('aria-expanded', "true");
            }
            
            // Prevent default link behavior
            event.preventDefault();
        }
    });
});
