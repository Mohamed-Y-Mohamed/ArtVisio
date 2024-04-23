import * as THREE from "three";

export const setupLighting = (scene, paintings) => {
    // Increased ambient light intensity for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Helper function to create and configure spotlights
    function createSpotlight(x, y, z, intensity, targetPosition, distance = 60) {
        const spotlight = new THREE.SpotLight(0xffffff, intensity);
        spotlight.position.set(x, y, z);
        spotlight.target.position.copy(targetPosition);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.1; 
        spotlight.decay = 2; 
        spotlight.distance = distance; 
        spotlight.shadow.mapSize.width = 2048; 
        spotlight.shadow.mapSize.height = 2048;

        scene.add(spotlight);
        scene.add(spotlight.target);

        return spotlight;
    }

    // Calculate scale factor based on wall expansion (assuming similar logic as walls)
    const scaleFactor = Math.sqrt(3);

    // Adjusted positions and intensities for spotlights based on new scene dimensions
    const frontWallSpotlight = createSpotlight(
        0, 10, -30 * scaleFactor, 1.5, new THREE.Vector3(0, 0, -40 * scaleFactor), 120 * scaleFactor
    );

    const backWallSpotlight = createSpotlight(
        0, 10, 30 * scaleFactor, 1.5, new THREE.Vector3(0, 0, 40 * scaleFactor), 120 * scaleFactor
    );

    const leftWallSpotlight = createSpotlight(
        -30 * scaleFactor, 10, 0, 1.5, new THREE.Vector3(-40 * scaleFactor, 0, 0), 120 * scaleFactor
    );

    const rightWallSpotlight = createSpotlight(
        30 * scaleFactor, 10, 0, 1.5, new THREE.Vector3(40 * scaleFactor, 0, 0), 120 * scaleFactor
    );

    // Additional spotlights or adjustments may be needed depending on the layout of the scene
    // For example, a center spotlight for general illumination
    const centerSpotlight = createSpotlight(
        /// A higher intensity and wider coverage for the center of the room
        0, 15, 0, 2, new THREE.Vector3(0, 0, 0), 150 
    );
};
