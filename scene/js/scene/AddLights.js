import * as THREE from '../../libs/threejs/three.module.js';

export default function (scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(-10, 10, -10);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 2;
  directionalLight.shadow.camera.far = 80;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 50;
  directionalLight.shadow.camera.bottom = -50;

  directionalLight.intensity = 1;
  directionalLight.shadow.mapSize.width = 512;
  directionalLight.shadow.mapSize.height = 512;

  scene.add(directionalLight);
}