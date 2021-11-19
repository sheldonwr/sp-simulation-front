import * as THREE from '../../libs/threejs/three.module.js';

export default function (scene) {
  const planeTexture = new THREE.TextureLoader().load("textures/desktop.jpg");
  planeTexture.wrapS = THREE.RepeatWrapping;
  planeTexture.wrapT = THREE.RepeatWrapping;
  const geometry = new THREE.PlaneGeometry(30, 30);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(geometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotateX(Math.PI * 0.5);
  plane.translateZ(4);
  scene.add(plane);
}