const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const leftColor = "rgb(255, 0, 0)";
const rightColor = "rgb(0, 0, 255)";


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

    // if (x <= canvas.width / 2) {
    //     // Left side color transition
    //     const position = x / (canvas.width / 2);
    //     const color = interpolateColors(leftColor, rightColor, position);
    //     red = color.red;
    //     green = color.green;
    //     blue = color.blue;
    // } else {
    //     // Right side color transition
    //     const position = (x - canvas.width / 2) / (canvas.width / 2);
    //     const color = interpolateColors(rightColor, leftColor, position);
    //     red = color.red;
    //     green = color.green;
    //     blue = color.blue;
    // }

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
