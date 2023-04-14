const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);



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


const params = new URLSearchParams(location.search);
const colours = new Array();
for (const [key, value] of params) {
  colours.push(hexToRGB(value))
}


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

function getColorAtPosition(colors, position) {
  const numColors = colors.length;
  const totalWeight = numColors - 1;
  const segmentSize = 1 / totalWeight;
  
  // Calculate segment index and position within segment
  const segmentIndex = Math.min(Math.floor(position / segmentSize), numColors - 2);
  const segmentPosition = (position - segmentIndex * segmentSize) / segmentSize;
  
  // Calculate color at position within segment
  const leftColor = colors[segmentIndex];
  const rightColor = colors[segmentIndex + 1];
  const color = interpolateColors(leftColor, rightColor, segmentPosition);
  
  return color;
}

function fillColour(x, y) {
  let red, green, blue;

  const positionX = x / canvas.width;
  const positionY = y / canvas.height;

  const color = getColorAtPosition(colours, positionX);

  red = Math.round((1 - positionY) * color.red);
  green = Math.round((1 - positionY) * color.green);
  blue = Math.round((1 - positionY) * color.blue);

  // Set fill style and global alpha
  ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

  // Draw rectangle to fill canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}



canvas.addEventListener('mousemove', function(event) {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  fillColour(x, y);
});


canvas.addEventListener('touchmove', function(event) {
  const movedTouch = event.touches[0];
  const x = movedTouch.pageX - canvas.offsetLeft;
  const y = movedTouch.pageY - canvas.offsetTop;

  fillColour(x, y);
});
