
const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
const playback = document.getElementById("playback");

// Options for getDisplayMedia()

const displayMediaOptions = {
    video: {
        displaySurface: "window",
    },
    audio: false,
};

async function startCapture() {
    try {
        videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
            displayMediaOptions
        );

    } catch (err) {
        console.error(err);
    }
}

function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();

    tracks.forEach((track) => track.stop());
    videoElem.srcObject = null;
}

// Set event listeners for the start and stop buttons
startElem.addEventListener(
    "click",
    (evt) => {
        startCapture();
    },
    false
);

stopElem.addEventListener(
    "click",
    (evt) => {
        stopCapture();
    },
    false
);

//--------------------------------------------------------------
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.getElementById('mydiv').style.display = "none";
document.getElementById('videoCapture').onclick = () => {
    document.getElementById('mydiv').style.display = "block";
    document.querySelector('.videoscreen').style.resize = "both";
}


var canvas = document.querySelector("canvas");


var video = document.querySelector("#video");
var videoStream = canvas.captureStream(30);
var mediaRecorder = new MediaRecorder(videoStream);

var chunks = [];
mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
};


// mediaRecorder.onstop = function (e) {
//     var blob = new Blob(chunks, { 'type': 'video/mp4' });
//     chunks = [];
//     var videoURL = URL.createObjectURL(blob);
//     video.src = videoURL;
// };




document.querySelector('.stopRecord').style.display = "none";
document.querySelector('.startRecord').onclick = () => {
    canvas.style.display = 'block';
    const stream =  canvas.captureStream(); 
    // context.fillRect(video, 0, 0, canvas.width, canvas.height);
    document.querySelector('.startRecord').style.display = "none";
    document.querySelector('.stopRecord').style.display = "block";
}
document.querySelector('.stopRecord').onclick = () => {
    var blob = new Blob(chunks, { 'type': 'video/webm' });
    chunks = [];
    var videoURL = URL.createObjectURL(blob);
    // video.src = videoURL;
    console.log(videoURL)
    playback.style.display="block"
    document.querySelector('source').src = videoURL


    // const box = document.getElementById('newvideo');
    // const videox = document.createElement('video');
    // videox.src = videoURL;
    // videox.height = 240; // 👈️ in px
    // videox.width = 320;
    // box.appendChild(videox);

    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    };

    document.querySelector('.startRecord').style.display = "block";
    document.querySelector('.stopRecord').style.display = "none";
}


