import * as THREE from "three";

export const setupFloor = (scene) => {
    const textureLoader = new THREE.TextureLoader();

    // Load the textures
    const colorTexture = textureLoader.load("../../assets/walls_images/floor.jpg");
    const displacementTexture = textureLoader.load("../../assets/walls_images/floor.jpg");
    const normalTexture = textureLoader.load("../../assets/walls_images/floor.jpg");
    const roughnessTexture = textureLoader.load("../../assets/walls_images/floor.jpg");
    const aoTexture = textureLoader.load("../../assets/walls_images/floor.jpg");

    // Set texture parameters and repeat values
    const repeatValue = 8; // Adjust this value as needed
    [colorTexture, displacementTexture, normalTexture, roughnessTexture, aoTexture].forEach(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(repeatValue, repeatValue);
    });

    const planeGeometry = new THREE.PlaneGeometry(70, 70);
    const planeMaterial = new THREE.MeshStandardMaterial({
        map: colorTexture,
        displacementMap: displacementTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        aoMap: aoTexture,
        displacementScale: 0.1,
        side: THREE.DoubleSide,
    });

    const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

    floorPlane.rotation.x = Math.PI / 2;
    floorPlane.position.y = -Math.PI * 2;

    scene.add(floorPlane);
};
