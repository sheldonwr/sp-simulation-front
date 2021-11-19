import * as THREE from '../../libs/threejs/three.module.js';
import { RoundedBoxGeometry } from '../../libs/threejs/geometries/RoundedBoxGeometry.js';

export default function (scene) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load('../../textures/cube.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const cube = new THREE.Mesh(new RoundedBoxGeometry(4, 4, 4, 7, 0.2), new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, metal: true, shininess: 100, map: texture }));
  cube.translateY(-2);
  cube.translateZ(0.5);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);
}