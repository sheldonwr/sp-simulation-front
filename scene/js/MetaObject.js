import * as THREE from '../libs/threejs/three.module.js';
import { createMultiMaterialObject } from '../libs/threejs/utils/SceneUtils.js';

export default class MetaObject {
  constructor({ scene, controls, lut }) {
    this.scene = scene;
    this.lut = lut;
    this.controls = controls;
    this.S = 0;

    const { ls, W, ws } = controls;

    this.segment_width = W / ws;

    this.ls = ls;
    this.ws = ws;
    this.lss = ls + 1;
    this.wss = ws + 1;

    this.faceCount = ls * ws * 2;
    this.vertexCount = this.lss * this.wss;

    this.colorMap = [];
    this.color = new THREE.Color();

    const g = this.g = new THREE.BufferGeometry();

    g.faceIndices = new Uint32Array(this.faceCount * 3);
    g.vertices = new Float32Array(this.vertexCount * 3);
    const colors = new Float32Array(this.vertexCount * 3);

    g.setIndex(new THREE.BufferAttribute(g.faceIndices, 1));
    g.setAttribute('position', new THREE.BufferAttribute(g.vertices, 3).setDynamic(true));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3).setDynamic(true));

    this.makeFlex();

    var vertexColorMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, vertexColors: THREE.VertexColors });
    var metalMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0xffffff,
      emissive: 0xffffff,
      specular: 0xffffff,
      flatShading: true, // 必须设置，否则无法上色
      blending: THREE.MultiplyBlending
    });
    var mesh = new createMultiMaterialObject(g, [metalMaterial, vertexColorMaterial]);

    mesh.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.scene.add(mesh);
  }

  compute() {
    const Bend = this.forceVoltage(this.S);
    this.setPoints(Bend);
    this.setColor();
  }

  makeFlex() {
    var idxCount = 0;
    var a, b1, c1, b2, c2;
    const { ls, ws, g, wss } = this;

    for (var j = 0; j < ls; j++) {
      for (var i = 0; i < ws; i++) {
        // 2 faces / segment,  3 vertex indices
        a = wss * j + i;
        b1 = wss * (j + 1) + i;	// right-bottom
        c1 = wss * (j + 1) + 1 + i;
        b2 = wss * (j + 1) + 1 + i;	// left-top
        c2 = wss * j + 1 + i;

        g.faceIndices[idxCount] = a; // right-bottom
        g.faceIndices[idxCount + 1] = b1;
        g.faceIndices[idxCount + 2] = c1;

        g.faceIndices[idxCount + 3] = a; // left-top
        g.faceIndices[idxCount + 4] = b2;
        g.faceIndices[idxCount + 5] = c2;

        idxCount += 6;
      }
    }

  }

  setPoints(Bend) {
    var x, y, z;
    var vIdx = 0; 	// vertex index
    const { L, ls } = this.controls;
    const l1 = L * Math.sqrt(1 - Bend ** 2);
    const K = Bend * L / (2 * l1 ** 3);

    var segment_length = l1 / ls;
    for (var j = 0; j < this.lss; j++) {  // length

      for (var i = 0; i < this.wss; i++) { // width

        // calculate the coordinates according physics
        x = j * segment_length;
        y = K * (3 * l1 * x ** 2 - x ** 3);

        z = this.segment_width * i;

        this.xyzSetPoint(x, y, z, vIdx);

        this.colorMap[vIdx] = y;

        vIdx++;

      }

    }
  }

  setColor() {
    const colors = this.g.attributes.color;
    this.colorMap.reverse().forEach((y, index) => {
      const color = this.lut.getColor(Math.abs(y));
      colors.setXYZ(index, color.r, color.g, color.b);
    })
    colors.needsUpdate = true;
  }

  // set vertex position
  xyzSetPoint(x, y, z, vIdx) {

    const posIdx = vIdx * 3;

    this.g.vertices[posIdx] = y;
    this.g.vertices[posIdx + 1] = x;
    this.g.vertices[posIdx + 2] = z;

    this.g.attributes.position.needsUpdate = true;
  }

  forceVoltage(value) {
    const a = 1.127783 * 10 ** (-7) / 300
    const b = 0.03787 / 300
    const y = a * value ** 3 + b * value
    return y
  }
}