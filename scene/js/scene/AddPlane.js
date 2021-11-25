import * as THREE from '../../libs/threejs/three.module.js';

export default function (scene) {
  const geometry = new THREE.PlaneGeometry(30, 30);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.BackSide });
  const plane = new THREE.Mesh(geometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotateX(Math.PI * 0.5);
  plane.translateZ(1);
  scene.add(plane);
  scene.needRender = true;
}