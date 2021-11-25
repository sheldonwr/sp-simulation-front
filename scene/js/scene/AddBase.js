import * as THREE from '../../libs/threejs/three.module.js';
import { RoundedBoxGeometry } from '../../libs/threejs/geometries/RoundedBoxGeometry.js';

export default function (scene) {
  const loader = new THREE.TextureLoader();
  loader.load('textures/cube.jpg', function (texture) {
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(3, 1);

    const cube = new THREE.Mesh(new RoundedBoxGeometry(6, 1, 2, 7, 0.2), new THREE.MeshPhongMaterial({ side: THREE.FrontSide, metal: true, map: texture }));
    cube.translateX(1);
    cube.translateY(-.5);
    cube.translateZ(0.5);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
    scene.needRender = true;
  });
}