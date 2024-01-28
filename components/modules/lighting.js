import * as THREE from "three";
import { GUI } from "lil-gui";

export const setupLighting = (scene, paintings) => {

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);


  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = 1.231;
    spotlight.penumbra = 0.2;
    spotlight.decay = 0;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;

    // Add spotlight and its target to the scene
    scene.add(spotlight);
    scene.add(spotlight.target);


    return spotlight;
  }

  const frontWallSpotlight = createSpotlight(
    0,
    8.7,
    -13,
    1.15,
    new THREE.Vector3(0, 0, -20)
  );

  const backWallSpotlight = createSpotlight(
    0,
    6.7,
    13,
    1.15,
    new THREE.Vector3(0, 0, 20)
  );

  const leftWallSpotlight = createSpotlight(
    -13,
    6.7,
    0,
    1.15,
    new THREE.Vector3(-20, 0, 0)
  );

  const rightWallSpotlight = createSpotlight(
    13,
    6.7,
    0,
    1.15,
    new THREE.Vector3(20, 0, 0)
  );

  const statueSpotlight = createSpotlight(
    0,
    10,
    0,
    1,
    new THREE.Vector3(0, -4.2, 0)
  ); // Spotlight for the statue
  statueSpotlight.angle = 0.457;
  statueSpotlight.decay = 1;
  statueSpotlight.penumbra = 0.2;
  statueSpotlight.distance = 0;
};
