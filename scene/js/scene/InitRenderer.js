import * as THREE from '../../libs/threejs/three.module.js';

export default function(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(container.clientWidth, container.clientHeight);

  return renderer;
}