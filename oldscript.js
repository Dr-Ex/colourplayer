const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight

canvas.addEventListener('mousemove', function(event) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    const hue = x / canvas.width * 360;
    const saturation = 100;
    const lightness = (ctx.canvas.height - y) / canvas.height * 50;

    ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});