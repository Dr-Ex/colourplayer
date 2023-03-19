const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let leftColor = "rgb(255, 0, 0)";
let rightColor = "rgb(0, 0, 255)";

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


function interpolateColors(leftColor, rightColor, x) {
    // Convert left and right colors to RGB arrays
    const leftRGB = leftColor.match(/\d+/g).map(Number);
    const rightRGB = rightColor.match(/\d+/g).map(Number);

    // Calculate RGB values for current position
    const red = Math.round((1 - x) * leftRGB[0] + x * rightRGB[0]);
    const green = Math.round((1 - x) * leftRGB[1] + x * rightRGB[1]);
    const blue = Math.round((1 - x) * leftRGB[2] + x * rightRGB[2]);

    // Return RGB values as an object
    return {
        red: red,
        green: green,
        blue: blue
    };
}

canvas.addEventListener('mousemove', function(event) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    let red, green, blue;

    const position = x / canvas.width;
    const color = interpolateColors(leftColor, rightColor, position);
    red = color.red;
    green = color.green;
    blue = color.blue;

    // Calculate color for current position
    const positionY = y / canvas.height;
    red = Math.round((1 - positionY) * red);
    green = Math.round((1 - positionY) * green);
    blue = Math.round((1 - positionY) * blue);

    // Set fill style and global alpha
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

    // Draw rectangle to fill canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});


canvas.addEventListener('touchmove', function(event) {
  const x = event.raduisX - canvas.offsetLeft;
  const y = event.radiusY - canvas.offsetTop;

  let red, green, blue;

  const position = x / canvas.width;
  const color = interpolateColors(leftColor, rightColor, position);
  red = color.red;
  green = color.green;
  blue = color.blue;

  // Calculate color for current position
  const positionY = y / canvas.height;
  red = Math.round((1 - positionY) * red);
  green = Math.round((1 - positionY) * green);
  blue = Math.round((1 - positionY) * blue);

  // Set fill style and global alpha
  ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

  // Draw rectangle to fill canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
