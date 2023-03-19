const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let leftColor = "rgb(255, 0, 0)";
let rightColor = "rgb(0, 255, 255)";

const hexToRGB = hex => {
    let alpha = false,
      h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) h = [...h].map(x => x + x).join('');
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return (
      'rgb' +
      (alpha ? 'a' : '') +
      '(' +
      (h >>> (alpha ? 24 : 16)) +
      ', ' +
      ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
      ', ' +
      ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
      (alpha ? `, ${h & 0x000000ff}` : '') +
      ')'
    );
  };

let params = new URLSearchParams(location.search);
leftColor = hexToRGB(params.get('left-color'));
rightColor = hexToRGB(params.get('right-color'));

function getColor(event) {
    const x = event.pageX || event.touches[0].pageX;
    const y = event.pageY || event.touches[0].pageY;
    const alpha = y / canvas.height;
    const r = Math.round((1 - alpha) * parseInt(leftColor.substring(1, 3), 16) + alpha * parseInt(rightColor.substring(1, 3), 16));
    const g = Math.round((1 - alpha) * parseInt(leftColor.substring(3, 5), 16) + alpha * parseInt(rightColor.substring(3, 5), 16));
    const b = Math.round((1 - alpha) * parseInt(leftColor.substring(5, 7), 16) + alpha * parseInt(rightColor.substring(5, 7), 16));
    return `rgba(${r}, ${g}, ${b}, ${1 - alpha})`;
}

canvas.addEventListener('mousedown', function(event) {
    canvas.addEventListener('mousemove', draw);
    draw(event);
});

canvas.addEventListener('mouseup', function(event) {
    canvas.removeEventListener('mousemove', draw);
});

canvas.addEventListener('touchstart', function(event) {
    canvas.addEventListener('touchmove', draw);
    draw(event);
});

canvas.addEventListener('touchend', function(event) {
    canvas.removeEventListener('touchmove', draw);
});

function draw(event) {
    const color = getColor(event);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
