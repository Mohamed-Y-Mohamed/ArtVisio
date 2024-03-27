import * as THREE from "three";

export function createWalls(scene, textureLoader) {
    // Create a group for all the walls to keep them organized.
    let wallGroup = new THREE.Group();
    scene.add(wallGroup);

    // edge walls design


    const textures = {
        colorTexture: textureLoader.load("../../assets/walls_images/Wall.jpg"),
        displacementTexture: textureLoader.load("../../assets/walls_images/Wall.jpg"),
        normalTexture: textureLoader.load("../../assets/walls_images/Wall.jpg"),
        roughnessTexture: textureLoader.load("../../assets/walls_images/Wall.jpg"),
        aoTexture: textureLoader.load("../../assets/walls_images/Wall.jpg"),
    };
    
    // Set up each texture to repeat nicely on the walls.
    Object.values(textures).forEach(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(35, 5); // Adjust this to fit the texture nicely on your walls.
    });

    // Create a material using the textures, ready to apply to the walls.
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: textures.colorTexture,
        displacementMap: textures.displacementTexture,
        normalMap: textures.normalTexture,
        roughnessMap: textures.roughnessTexture,
        aoMap: textures.aoTexture,
        displacementScale: 0.1, // This can be tweaked for a more 3D look.
        side: THREE.DoubleSide,
    });

    // Determine the size of the walls based on the desired scale.
    const scaleFactor = Math.sqrt(3);
    const wallLength = 160 * scaleFactor;
    const wallHeight = 20;
    const wallDepth = 0.01;

    // Create each wall, apply the material, and position them around the room.
  // Front Wall
  const frontWall = new THREE.Mesh(
        //set width, height and z thickness of hte walls

    new THREE.BoxGeometry(wallLength, wallHeight, wallDepth),
    wallMaterial
);
frontWall.position.z = -80 * scaleFactor; // Adjusted position

// Left Wall
const leftWall = new THREE.Mesh(
        //set width, height and z thickness of hte walls

    new THREE.BoxGeometry(wallLength, wallHeight, wallDepth),
    wallMaterial
);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -80 * scaleFactor; // Adjusted position

// Right Wall
const rightWall = new THREE.Mesh(
        //set width, height and z thickness of hte walls

    new THREE.BoxGeometry(wallLength, wallHeight, wallDepth),
    wallMaterial
);
rightWall.position.x = 80 * scaleFactor; // Adjusted position
rightWall.rotation.y = Math.PI / 2;




// Back Wall
const backWall = new THREE.Mesh(
        //set width, height and z thickness of hte walls

    new THREE.BoxGeometry(wallLength, wallHeight, wallDepth),
    wallMaterial
);
backWall.position.z = 80 * scaleFactor; // Adjusted position

    // Add all the walls to the group.





    //center wall design 

    // Load textures for the walls and prepare them for use.
const colorTexture = textureLoader.load("../../assets/walls_images/wall.jpg");
const displacementTexture = textureLoader.load("../../assets/walls_images/wall.jpg");
const normalTexture = textureLoader.load("../../assets/walls_images/wall.jpg");
const roughnessTexture = textureLoader.load("../../assets/walls_images/wall.jpg");
const aoTexture = textureLoader.load("../../assets/walls_images/wall.jpg");

// Set texture parameters and separate repeat values for width and height
[colorTexture, displacementTexture, normalTexture, roughnessTexture, aoTexture].forEach(texture => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15, 5); // Set separate repeat values here
});

const centerWallMaterial = new THREE.MeshStandardMaterial({
  map: colorTexture,
  displacementMap: displacementTexture,
  normalMap: normalTexture,
  roughnessMap: roughnessTexture,
  aoMap: aoTexture,
  displacementScale: 0.1,
  side: THREE.DoubleSide,
});

    const sscaleFactor = Math.sqrt(3);

    // Adjusted dimensions for the walls
    const centerWallLength = 89;
    const centerWallHeight = 20;
    const centerWallDepth = 0.5;


//center wall 1 location
    const center1 = new THREE.Mesh(
            //set width, height and z thickness of hte walls

        new THREE.BoxGeometry(centerWallLength, centerWallHeight, centerWallDepth),
        centerWallMaterial
    );
    center1.position.x = 55 * sscaleFactor; // Adjusted position
    center1.rotation.y = Math.PI  ;
    center1.position.z = 57;
    
//center wall 2 location
const center2 = new THREE.Mesh(
        //set width, height and z thickness of hte walls

    new THREE.BoxGeometry(centerWallLength, centerWallHeight, centerWallDepth),
    centerWallMaterial
);
center2.position.x = -55 * sscaleFactor; // Adjusted position
center2.rotation.y = Math.PI  ;
center2.position.z = 57;

//center wall 3 location
const center3 = new THREE.Mesh(
        //set width, height and z thickness of hte walls
    new THREE.BoxGeometry(centerWallLength, centerWallHeight, centerWallDepth),
    centerWallMaterial
);
center3.position.x = 55 * sscaleFactor; // Adjusted position
center3.rotation.y = Math.PI  ;
center3.position.z = -57;

//center wall 4 location
const center4 = new THREE.Mesh(
new THREE.BoxGeometry(centerWallLength, centerWallHeight, centerWallDepth),
centerWallMaterial
);
center4.position.x = -55 * sscaleFactor; // Adjusted position
center4.rotation.y = Math.PI  ;
center4.position.z = -57;







//center wall 5 location
 //center wall design 

    // Load textures for the walls and prepare them for use.
    const color5Texture = textureLoader.load("../../assets/walls_images/wall 2.jpg");
    const displacement5Texture = textureLoader.load("../../assets/walls_images/wall 2.jpg");
    const normal5Texture = textureLoader.load("../../assets/walls_images/wall 2.jpg");
    const roughness5Texture = textureLoader.load("../../assets/walls_images/wall 2.jpg");
    const aoTexture5 = textureLoader.load("../../assets/walls_images/wall 2.jpg");
    
    // Set texture parameters and separate repeat values for width and height
    [color5Texture, displacement5Texture, normal5Texture, roughness5Texture, aoTexture5].forEach(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(7, 4); // Set separate repeat values here
    });
    
    const center5WallMaterial = new THREE.MeshStandardMaterial({
      map: color5Texture,
      displacementMap: displacement5Texture,
      normalMap: normal5Texture,
      roughnessMap: roughness5Texture,
      aoMap: aoTexture5,
      displacementScale: 0.1,
      side: THREE.DoubleSide,
    });
const center5 = new THREE.Mesh(
    //set width, height and z thickness of hte walls
    new THREE.BoxGeometry(40, centerWallHeight, centerWallDepth),
    center5WallMaterial
    );
    center5.position.x = 0 * sscaleFactor; // Adjusted position
    center5.rotation.y = Math.PI  ;
    center5.position.z = 0;
    
    wallGroup.add(frontWall, backWall, leftWall, rightWall,center1,center2,center3,center4,center5);

    return wallGroup;
}

