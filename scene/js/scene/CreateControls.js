import { GUI } from '../../libs/threejs/dat.gui.module.js';

export default function () {
  const controls = new function () {
    this.ls = 25; // 长度上分段，length segments
    this.ws = 1; // 宽度上分段，width segments
    this.W = 1; // 宽度, width
    this.L = 6; // 长度, length
    this.Bend = 0.5;
    this.dataMax = 2;
    this.dataMin = 0;
    this.S = 1000;
  }

  const gui = new GUI();
  gui.add(controls, 'ws');
  gui.add(controls, 'ls');
  gui.add(controls, 'W');
  gui.add(controls, 'L');
  gui.add(controls, 'dataMax').name('Maximum Value');
  gui.add(controls, 'dataMin').name('Minimum Value');
  gui.add(controls, 'S').step(10);

  return controls;
}