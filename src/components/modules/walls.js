import * as THREE from "three";

export function createWalls(scene, textureLoader) {
    let wallGroup = new THREE.Group();
    scene.add(wallGroup);

    const normalTexture = textureLoader.load(
        "../../assets/wall_images/ceiling.jpg"
    );
    const roughnessTexture = textureLoader.load(
        "../../assets/wall_images/ceiling.jpg"
    );

    normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
    roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xF9F6EE,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        side: THREE.DoubleSide,
    });

    // Scale factor for tripling the floor area
    const scaleFactor = Math.sqrt(3);

    // Adjusted dimensions for the walls
    const wallLength = 80 * scaleFactor;
    const wallHeight = 20; // Keeping the height the same
    const wallDepth = 0.001; // Negligible depth unchanged

    // Front Wall
    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallLength, wallHeight, wallDepth),
        wallMaterial
    );
    frontWall.position.z = -20 * scaleFactor; // Adjusted position

    // Left Wall
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallLength, wallHeight, wallDepth),
        wallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -20 * scaleFactor; // Adjusted position

    // Right Wall
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallLength, wallHeight, wallDepth),
        wallMaterial
    );
    rightWall.position.x = 20 * scaleFactor; // Adjusted position
    rightWall.rotation.y = Math.PI / 2;

    // Back Wall
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallLength, wallHeight, wallDepth),
        wallMaterial
    );
    backWall.position.z = 20 * scaleFactor; // Adjusted position

    wallGroup.add(frontWall, backWall, leftWall, rightWall);

    return wallGroup;
}
