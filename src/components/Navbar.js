import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { app } from "./firebase-setup";
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
  const navContainer = document.getElementById("navbar");
  if (user) {
    const userRole = await getUserRole(user.uid);
    let navContent = `<nav class="navbar navbar-expand-lg" style="background: linear-gradient(to bottom right,  #EE5007,#010f29 );">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <svg xmlns="http://www.w3.org/2000/svg" style="padding-right: 1%;height:1em" viewBox="0 0 512 512">
                <path fill="#EE5007" d="M2 377.4l43 74.3A51.4 51.4 0 0 0 90.9 480h285.4l-59.2-102.6zM501.8 350L335.6 59.3A51.4 51.4 0 0 0 290.2 32h-88.4l257.3 447.6 40.7-70.5c1.9-3.2 21-29.7 2-59.1zM275 304.5l-115.5-200L44 304.5z" />
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
                <a class="dropdown-item" href="/viewProfileUser.html">view and edit profile</a>
                <a class="dropdown-item" href="/gallery.html">visualise gallery</a>
                <div class="replacement"></div>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" id="user-signout" href="#">signout</a>
            </div>
        </div>
    </div>
</nav>`;
    if (userRole === 'artist') {
      navContent = navContent.replace('<div class="replacement"></div>', `<a class="dropdown-item" href="/uploadArtwork.html">upload artwork</a>
      <a class="dropdown-item" href="/viewArtwork.html">view upload artwork</a>
`
      );
    }
    navContainer.innerHTML = navContent;
  } else {
    navContainer.innerHTML = `<nav class="navbar navbar-expand-lg" style="background: linear-gradient(to bottom right,  #EE5007,#010f29 );">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <svg xmlns="http://www.w3.org/2000/svg" style="padding-right: 1%;height:1em" viewBox="0 0 512 512">
                <path fill="#EE5007" d="M2 377.4l43 74.3A51.4 51.4 0 0 0 90.9 480h285.4l-59.2-102.6zM501.8 350L335.6 59.3A51.4 51.4 0 0 0 290.2 32h-88.4l257.3 447.6 40.7-70.5c1.9-3.2 21-29.7 2-59.1zM275 304.5l-115.5-200L44 304.5z" />
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
</nav>`;
  }

  // Get all the dropdown buttons
  var dropdownBtns = document.getElementsByClassName("dropdown-toggle");

  // Loop through the buttons and add an event listener to each
  for (var i = 0; i < dropdownBtns.length; i++) {
    dropdownBtns[i].addEventListener("click", function () {
      // Get the next element sibling (the dropdown content)
      var panel = this.nextElementSibling;
      // Toggle the 'active-dropdown' class to show or hide the dropdown content
      panel.classList.toggle("active-dropdown");
    });
  }

  // Add event listener for clicks outside the dropdown menu
  document.addEventListener("click", function (event) {
    let target = event.target;
    // Check if the click occurred outside the dropdown menu
    if (!target.closest(".dropdown") && !target.closest(".active-dropdown")) {
      // Hide all active dropdown menus
      const activeDropdowns = document.querySelectorAll(".active-dropdown");
      activeDropdowns.forEach(function (menu) {
        menu.classList.remove("active-dropdown");
      });
    }
  });
};

onAuthStateChanged(auth, (user) => {
  updateNavbar(user);
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle dropdown
  function toggleDropdown(dropdownMenu) {
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    } else {
      // First close any already open dropdown menus
      const openMenus = document.querySelectorAll(".dropdown-menu.show");
      openMenus.forEach(function (menu) {
        menu.classList.remove("show");
      });
      // Then open the current menu
      dropdownMenu.classList.add("show");
    }
  }

  // Event listener for navbar clicks
  document.getElementById("navbar").addEventListener("click", function (event) {
    let target = event.target;

    // Handling dropdown toggle
    let dropdownToggle = target.closest(".dropdown-toggle");
    if (dropdownToggle) {
      event.preventDefault(); // Prevent default if it's a link or button
      let dropdownMenu = dropdownToggle.nextElementSibling;
      if (dropdownMenu) {
        toggleDropdown(dropdownMenu);
      }else{
        dropdownMenu.remove(dropdownToggle)
      }
      return; // Stop further processing to avoid unintended sign out
        }

        // Handling sign-out action specifically
        if (target.textContent.toLowerCase().includes('signout')) {
            event.preventDefault(); // Prevent default action
            signOut(auth).then(() => {
                console.log('Sign-out successful.');
                window.location.reload();
            }).catch((error) => {
                console.error('Sign-out failed:', error);
            });
        }
    });
});
