import { OBJLoader } from '../../libs/threejs/loaders/OBJLoader.js';
import { MTLLoader } from '../../libs/threejs/loaders/MTLLoader.js';

export const LoadTable = function (scene) {
  const onProgress = function (xhr) {

    if (xhr.lengthComputable) {

      const percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');

    }

  };

  const onError = function () { };

  const manager = new THREE.LoadingManager();

  new MTLLoader(manager)
    .load('../models/StylishDesk.mtl', function (materials) {

      materials.preload();

      new OBJLoader(manager)
        .setMaterials(materials)
        .load('../models/StylishDesk.obj', function (object) {

          object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          })
          object.scale.x = 8;
          object.scale.y = 8;
          object.scale.z = 8;
          object.position.y = -16;
          object.receiveShadow = true;
          object.caseShadow = true;
          scene.add(object);

        }, onProgress, onError);

    });
}