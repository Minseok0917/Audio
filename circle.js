
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 1200;



const degres = Math.PI * 0.25;



const x = 600 + Math.cos(degres) * 100;
const y = 600 + Math.sin(degres) * 100;


ctx.beginPath();
ctx.moveTo(600, 600);
ctx.arc(600, 600, 30, 0, Math.PI * 0.5);

ctx.fill();

ctx.beginPath();
ctx.moveTo(600, 600);
ctx.lineTo(x, y);

ctx.strokeStyle = "#f00";
ctx.lineWidth = 1;
ctx.stroke();








document.body.append(canvas);