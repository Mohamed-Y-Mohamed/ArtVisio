import { keysPressed } from "./movement.js"; // import the keysPressed object

let lockPointer = true;
let showMenuOnUnlock = false;

// add the controls parameter which is the pointer lock controls and is passed from main.js where setupEventListeners is called
export const setupEventListeners = (controls, camera, scene) => {
  // add the event listeners to the document which is the whole page
  document.addEventListener(
    "keydown",
    (event) => onKeyDown(event, controls),
    false
  );
  document.addEventListener(
    "keyup",
    (event) => onKeyUp(event, controls),
    false
  );



  // Add event listeners for the audio guide buttons
};

// toggle the pointer lock
function togglePointerLock(controls) {
  if (lockPointer) {
    controls.lock();
  } else {
    showMenuOnUnlock = false;
    controls.unlock();
  }
  lockPointer = !lockPointer; 
}

function onKeyDown(event, controls) {
  // event is the event object that has the key property
  if (event.key in keysPressed) {
    // check if the key pressed by the user is in the keysPressed object
    keysPressed[event.key] = true; 
  }


  if (event.key === "p") {
    // if the "SPACE" key is pressed
    controls.unlock(); 
    lockPointer = false;
  }



  if (event.key === " ") {
    // if the "p" key is pressed
    togglePointerLock(controls); 

  }



  if (event.key === "r") {
    // if the "r" key is pressed
    location.reload(); 
  }
}

function onKeyUp(event, controls) {
  // same but for keyup
  if (event.key in keysPressed) {
    keysPressed[event.key] = false; 
  }
}


