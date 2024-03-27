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
        spotlight.angle = Math.PI / 6; // Wider angle for more coverage
        spotlight.penumbra = 0.1; // Soften the edges a bit
        spotlight.decay = 2; // Adjusted decay for more realistic falloff
        spotlight.distance = distance; // Increased distance for wider coverage
        spotlight.shadow.mapSize.width = 2048; // Higher resolution for shadows
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
        0, 15, 0, 2, new THREE.Vector3(0, 0, 0), 150 // A higher intensity and wider coverage for the center of the room
    );
};
