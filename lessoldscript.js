// With help from Chat GPT <3
// https://chat.openai.com/chat/033bbf51-5764-4846-b9d3-ca1255671d7c

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);


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

    // two different colour transitions for each half of the screen
    // if (x <= canvas.width / 2) {
    //     // Red to yellow transition on the left side
    //     red = 255;
    //     green = Math.round(x / (canvas.width / 2) * 255);
    //     blue = 0;
    // } else {
    //     // Blue to cyan transition on the right side
    //     red = 0;
    //     green = Math.round((canvas.width - x) / (canvas.width / 2) * 255);
    //     blue = 255;
    // }

    //const position = x / (canvas.width / 2);
    const position = x / canvas.width;
    const color = interpolateColors(leftColor, rightColor, position);
    red = color.red;
    green = color.green;
    blue = color.blue;

    // const brightness = 100 - y / canvas.height * 100;

    // Calculate alpha value for current position
    alpha = 1 - (y / canvas.height);

    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    // ctx.globalAlpha = brightness / 100;
    ctx.globalAlpha = alpha;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});