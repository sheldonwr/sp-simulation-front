import * as THREE from '../../libs/threejs/three.module.js';

export default function (scene) {
  scene.add(new THREE.AmbientLight('#ffffff', 0.5));

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(-20, 30, -20);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 2;
  directionalLight.shadow.camera.far = 80;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 50;
  directionalLight.shadow.camera.bottom = -50;

  directionalLight.intensity = 1;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;

  scene.add(directionalLight);
}