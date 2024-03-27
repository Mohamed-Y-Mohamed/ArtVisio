import * as THREE from "three";

// Function to create and add a textured ceiling to the scene
export const createCeiling = (scene, textureLoader) => {
    // Load the textures
    const textures = {
        color: textureLoader.load("../../../assets/walls_images/ceiling.jpg"),
        displacement: textureLoader.load("../../../assets/walls_images/ceiling.jpg"),
        ao: textureLoader.load("../../../assets/walls_images/ceiling.jpg"),
        emission: textureLoader.load("../../../assets/walls_images/ceiling.jpg"),
        metalness: textureLoader.load("../../../assets/walls_images/ceiling.jpg"),
        normalGL: textureLoader.load("../../../assets/walls_images/ceiling.jpg"),
        roughness: textureLoader.load("../../../assets/walls_images/ceiling.jpg"),
    };

    // Configure the textures to repeat
    Object.values(textures).forEach(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10,10); // Adjust this value to fit the size of the room
    });

    // Create the ceiling material using the loaded and configured textures
    const ceilingMaterial = new THREE.MeshLambertMaterial({
        map: textures.color,
        displacementMap: textures.displacement,
        aoMap: textures.ao,
        emissiveMap: textures.emission,
        metalnessMap: textures.metalness,
        normalMap: textures.normalGL,
        roughnessMap: textures.roughness,
        displacementScale: 0.1,
        side: THREE.DoubleSide,
    });

    // Define the geometry of the ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(280, 280);
    const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

    // Set the position and orientation of the ceiling
    ceilingPlane.rotation.x = Math.PI / 2; // Rotate to face downwards
    ceilingPlane.position.y = 10; // Adjust the height as needed

    // Add the ceiling to the scene
    scene.add(ceilingPlane);
};
