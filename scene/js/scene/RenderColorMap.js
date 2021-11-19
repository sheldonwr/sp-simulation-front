
export default function ({ lut, controls }) {
  document.getElementById('visual-map').innerHTML = '';
  document.getElementById('color-text').innerHTML = '';
  const colorHeight = document.getElementById('visual-map').clientHeight * 0.5;
  const colorWidth = document.getElementById('visual-map').clientWidth * 0.5;
  const colorTextHeight = document.getElementById('color-text').clientHeight * 0.5;
  const colorTextWidth = document.getElementById('color-text').clientWidth * 0.5;
  var visualMap = d3.select("#visual-map").append("svg").attr('height', colorHeight).attr('width', colorWidth);
  var colorText = d3.select("#color-text").append("svg").attr('height', colorTextHeight).attr('width', colorTextWidth);
  var step = 0.05;
  var count = controls.BendMax / step;
  const textCountBreak = Math.floor(count * 3);
  const barWidth = Math.floor(colorWidth / count);
  const fontSize = 16;

  for (let index = 0, colorTextCounter = 0; index < count; index += step, colorTextCounter++) {
    const colorValue = (index * controls.BendMax / count).toFixed(4);
    const color = lut.getColor(colorValue).getStyle();
    visualMap.append('rect').attr('x', index * barWidth).attr('y', '0').attr('width', barWidth).attr('height', colorHeight).style('fill', color);

    if (colorTextCounter === textCountBreak || colorTextCounter === 0) {
      colorTextCounter = 0;
      colorText.append('text').attr('x', index * barWidth).attr('y', fontSize).text(colorValue).style('font-size', fontSize).style('fill', color);
    }
  }
}