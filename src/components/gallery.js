// Import the entire Three.js core library to enable 3D graphics rendering.
import * as THREE from "three";

// Import various setup functions and components from modularized scripts.
// These imports include scene setup, paintings, walls, lighting, floor, ceiling, bounding boxes, rendering, event listeners, and scene helpers.
import {
    scene,
    setupScene
} from "./modules/scene.js";
import {
    createPaintings
} from "./modules/paintings.js";
import {
    createWalls
} from "./modules/walls.js";
import {
    setupLighting
} from "./modules/lighting.js";
import {
    setupFloor
} from "./modules/floor.js";
import {
    createCeiling
} from "./modules/ceiling.js";
import {
    createBoundingBoxes
} from "./modules/boundingBox.js";
import {
    setupRendering
} from "./modules/rendering.js";
import {
    setupEventListeners
} from "./modules/eventListeners.js";
import {
    addObjectsToScene
} from "./modules/sceneHelpers.js";
import {
    clickHandling
} from "./modules/clickHandling.js";

// Define the asynchronous function to setup the gallery environment.
async function setupGallery() {
    // Initialize scene components (camera, controls, renderer).
    let {
        camera,
        controls,
        renderer
    } = setupScene();

    // Create a texture loader instance for loading textures.
    const textureLoader = new THREE.TextureLoader();
    // Construct the gallery walls.
    const walls = createWalls(scene, textureLoader);
    // Setup the gallery floor.
    const floor = setupFloor(scene);
    // Construct the gallery ceiling.
    const ceiling = createCeiling(scene, textureLoader);
    
    // Create paintings asynchronously to ensure all images are loaded before displaying.
    const paintings = await createPaintings(scene, textureLoader);
    // Setup lighting in the scene, especially focusing on paintings.
    const lighting = setupLighting(scene, paintings);

    // Create bounding boxes for walls and paintings for collision detection and interaction.
    createBoundingBoxes(walls);
    createBoundingBoxes(paintings);
    // Add the paintings to the scene.
    addObjectsToScene(scene, paintings);

    // Initialize event listeners for user interaction (e.g., camera controls).
    setupEventListeners(controls);
    // Setup handling of click events within the scene.
    clickHandling(renderer, camera, paintings);
    // Start the rendering process and continuously update the scene.
    setupRendering(scene, camera, renderer, paintings, controls, walls);
}

// Execute the setup function to initialize and render the gallery. Catch and log any errors that occur.
setupGallery().catch(console.error);
