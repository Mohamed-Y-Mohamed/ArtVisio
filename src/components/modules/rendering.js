import * as THREE from "three";
import {
    displayPaintingInfo,
    hidePaintingInfo
} from "./paintingInfo.js";
import {
    updateMovement
} from "./movement.js";

export const setupRendering = (
    scene,
    camera,
    renderer,
    paintings,
    controls,
    walls
) => {
    const clock = new THREE.Clock();

    let render = function () {
        const delta = clock.getDelta();


        updateMovement(delta, controls, camera, walls);

        const distanceThreshold = 24;

        let paintingToShow;
        paintings.forEach((painting) => {

            const distanceToPainting = camera.position.distanceTo(painting.position);
            if (distanceToPainting < distanceThreshold) {

                paintingToShow = painting;
            }
        });

        if (paintingToShow) {
            // if there is a painting to show
            displayPaintingInfo(paintingToShow.userData.info);
        } else {
            hidePaintingInfo();
        }

        renderer.gammaOutput = true;
        renderer.gammaFactor = 2.2;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    render();
};



// vr adjustment attempt 
// import * as THREE from "three";
// import {
//         displayPaintingInfo,
//         hidePaintingInfo
//     } from "./paintingInfo.js";
//     import {
//         updateMovement
//     } from "./movement.js";
// export const setupRendering = (scene, camera, renderer, paintings, controls, walls) => {
//     const clock = new THREE.Clock();
//     let vrMode = renderer.xr.enabled; // Check if VR mode is enabled

//     let render = function () {
//         const delta = clock.getDelta();

//         updateMovement(delta, controls, camera, walls);

//         const distanceThreshold = 20;
//         let paintingToShow;
//         paintings.forEach((painting) => {
//             const distanceToPainting = camera.position.distanceTo(painting.position);
//             if (distanceToPainting < distanceThreshold) {
//                 paintingToShow = painting;
//             }
//         });

//         if (paintingToShow) {
//             displayPaintingInfo(paintingToShow.userData.info);
//         } else {
//             hidePaintingInfo();
//         }

//         renderer.gammaOutput = true;
//         renderer.gammaFactor = 2.2;

//         // Render the scene
//         renderer.render(scene, camera);
//     };

//     if (vrMode) {
//         // Use WebXR's requestAnimationFrame if in VR mode
//         renderer.setAnimationLoop(render);
//     } else {
//         // Use standard window.requestAnimationFrame if not in VR mode
//         function animate() {
//             requestAnimationFrame(animate);
//             render();
//         }
//         animate();
//     }
// };
