import * as THREE from 'three';

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function clickHandling(renderer, camera, paintings) {
    renderer.domElement.addEventListener(
        'click',
        (event) => {
            // Convert the mouse position to normalized device coordinates (NDC)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            onClick(camera, paintings); // Handle the click event
        },
        false
    );
}

function onClick(camera, paintings) {
    raycaster.setFromCamera(mouse, camera); // Set the raycaster based on the mouse position
    const intersects = raycaster.intersectObjects(paintings); // Find intersections

    if (intersects.length > 0) {
        const painting = intersects[0].object; // Get the first intersected object

        // Check if there's an artist UID and store it in local storage
        if (painting.userData.info && painting.userData.info.uid) {
            localStorage.setItem('artistUID', painting.userData.info.uid);
            console.log(`Artist UID ${painting.userData.info.uid} stored in local storage.`);
        }

        // Redirect to /uploadArtwork.html or open a link based on the painting's info
        if (painting.userData.info && painting.userData.info.link) {
            // Open the artwork's link in a new tab
            window.open(painting.userData.info.link, '_blank');
        } else {
            // If no link provided, redirect to /uploadArtwork.html
            window.location.href = '/viewArtist.html';
        }
    }
}

export {
    clickHandling
};
