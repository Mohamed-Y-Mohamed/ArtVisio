import * as THREE from 'three';

// object to hold the keys pressed
export const keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
};

// parameters we get from setupRendering where updateMovement is called. setupRendering gets the parameters from main.jsss
export const updateMovement = (delta, controls, camera, walls) => {
    const moveSpeed = 35 * delta;

    const previousPosition = camera.position.clone();

    // cose self-explanatory
    if (keysPressed.ArrowRight || keysPressed.d) {
        controls.moveRight(moveSpeed);
    }
    if (keysPressed.ArrowLeft || keysPressed.a) {
        controls.moveRight(-moveSpeed);
    }
    if (keysPressed.ArrowUp || keysPressed.w) {
        controls.moveForward(moveSpeed);
    }
    if (keysPressed.ArrowDown || keysPressed.s) {
        controls.moveForward(-moveSpeed);
    }

    // After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through walls.
    if (checkCollision(camera, walls)) {
        camera.position.copy(previousPosition);
    }
};

// checkCollision takes the camera and the walls as parameters and returns true if there is a collision and false if there isn't. the camera parameter is the camera object and the walls parameter is the walls group. The paramaters are passed from updateMovement function where checkCollision is called. updateMovement gets the parameters from setupRendering where it is called. setupRendering gets the parameters from main.js where setupRendering is called.
export const checkCollision = (camera, walls) => {
    const playerBoundingBox = new THREE.Box3();
    const cameraWorldPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraWorldPosition);
    playerBoundingBox.setFromCenterAndSize(
        cameraWorldPosition,
        new THREE.Vector3(1, 1, 1)
    );

    for (let i = 0; i < walls.children.length; i++) {
        // loop through each wall
        const wall = walls.children[i]; // get the wall
        if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
            return true;
        }
    }

    return false;
};
