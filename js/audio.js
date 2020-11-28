const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
canvas.width = winWidth;
canvas.height = winHeight;



const $audio = document.getElementById("audio");
let audioCtx = new AudioContext();
let source = audioCtx.createMediaElementSource($audio);
let analyer = audioCtx.createAnalyser();
let dataArray = new Uint8Array(analyer.frequencyBinCount)
let panner = audioCtx.createStereoPanner();
analyer.getByteTimeDomainData(dataArray);

let pan_value = 0;
let pan_status = true;

source.connect(analyer).connect(panner).connect(audioCtx.destination)

document.querySelector('#start').addEventListener('click', function (e) {
    document.body.append(canvas);
    document.querySelector('#start').remove();
    audioCtx.resume().then(() => {
        $audio.play();
        requestAnimationFrame(loop);
    })
});

setInterval(function () {
    if (pan_value === 0) {
        pan_value = pan_status ? 1 : -1;
        pan_status = !pan_status;
    } else {
        pan_value = 0;
    }
    panner.pan.value = pan_value;
}, 2000)
function loop() {
    analyer.getByteTimeDomainData(dataArray)
    drawLoop();
    requestAnimationFrame(loop);
}

function drawLoop() {
    const width = winWidth / dataArray.length;
    const height = winHeight / 255;
    ctx.clearRect(0, 0, winWidth, winHeight)
    ctx.fillStyle = "rgba(200,200,200,1)";
    ctx.fillRect(0, 0, winWidth, winHeight);


    dataArray.reduce((x, value) => {
        const v = value * height;
        ctx.beginPath();
        ctx.fillStyle = `rgba(51,51,99,1)`;
        ctx.rect(x, winHeight - v, 2, v);
        ctx.fill();
        return x + width;
    }, 0);
}