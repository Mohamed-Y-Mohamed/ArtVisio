import * as THREE from "three";
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

async function setupGallery() {
    let {
        camera,
        controls,
        renderer
    } = setupScene();

    const textureLoader = new THREE.TextureLoader();
    const walls = createWalls(scene, textureLoader);
    const floor = setupFloor(scene);
    const ceiling = createCeiling(scene, textureLoader);
    
    // Asynchronously create paintings
    const paintings = await createPaintings(scene, textureLoader);
    const lighting = setupLighting(scene, paintings);

    // Now that paintings are loaded, proceed with operations that depend on them
    createBoundingBoxes(walls);
    createBoundingBoxes(paintings);
    addObjectsToScene(scene, paintings);

    setupEventListeners(controls);
    clickHandling(renderer, camera, paintings);
    setupRendering(scene, camera, renderer, paintings, controls, walls);
}

// Run the setup function to initialize the gallery
setupGallery().catch(console.error);
