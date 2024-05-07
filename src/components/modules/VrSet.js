// import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

// export const setupVR = (renderer) => {
//   renderer.xr.enabled = true;

//   renderer.xr.addEventListener("sessionstart", () => {
//     console.log("WebXR session started");
//   });

//   renderer.xr.addEventListener("sessionend", () => {
//     console.log("WebXR session ended");
//   });

//   document.body.appendChild(VRButton.createButton(renderer));
// };
// // Import necessary parts for VR controls
// import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

// export const setupVRMovement = (renderer, camera, controls) => {
//     let controller1 = renderer.xr.getController(0);
//     let controller2 = renderer.xr.getController(1);
//     scene.add(controller1);
//     scene.add(controller2);

//     // Example controller input handling
//     controller1.addEventListener('selectstart', onSelectStart);
//     controller1.addEventListener('selectend', onSelectEnd);
//     controller2.addEventListener('selectstart', onSelectStart);
//     controller2.addEventListener('selectend', onSelectEnd);

//     function onSelectStart() {
//         this.userData.isSelecting = true;
//     }

//     function onSelectEnd() {
//         this.userData.isSelecting = false;
//     }
//     const moveSpeed= 5
//     // Movement based on controller input
//     function handleControllerInput() {
//         if (controller1.userData.isSelecting) {
//             // Example: Move forward if button is pressed
//             let direction = new THREE.Vector3();
//             // Get the direction in which the controller is pointing
//             controller1.getWorldDirection(direction);
//             camera.position.addScaledVector(direction, moveSpeed);
//         }
//     }

//     renderer.setAnimationLoop(() => {
//         handleControllerInput();
//         renderer.render(scene, camera);
//     });
// };
