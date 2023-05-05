
const videoElem = document.getElementById("video");
// const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

var playbackVideoElement = document.querySelector('#playback');
var localStream;
var mediaRecorder;
var chunks = [];
var containerType = "video/webm";

startElem.addEventListener(
    "click",
    (evt) => {
        startElem.style.display = "none";
        stopElem.style.display = "block";
        startCapture();
    },
    false
);

stopElem.addEventListener(
    "click",
    (evt) => {
        startElem.style.display = "block";
        stopElem.style.display = "none";
        stopCapture();
    },
    false
);
// Options for getDisplayMedia()

const displayMediaOptions = {
    video: {
        displaySurface: "window",
    },
    audio: false,
};

// async function startCapture() {
//     // logElem.innerHTML = "";

//     try {
//         videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
//             displayMediaOptions
//         );
//         dumpOptionsInfo();
//     } catch (err) {
//         console.error(err);
//     }
// }
// var localStream = null;


function startCapture(displayMediaOptions) {
    return navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
        .then((stream) => {
            localStream = stream;
            var options = { mimeType: 'video/webm' };
            mediaRecorder = new MediaRecorder(localStream, options);
            //   mediaRecorder = new MediaRecorder(localStream,displayMediaOptions);
            mediaRecorder.ondataavailable = function (e) {
                console.log('mediaRecorder.ondataavailable, e.data.size='+e.data.size);
                if (e.data && e.data.size > 0) {
                    chunks.push(e.data);
                }
            };
        })
        .catch((err) => {
            console.error(err);
        });  

}


function stopCapture(evt) {
    let tracks = videoElem.srcObject;

    var recording = new Blob(chunks, {type : mediaRecorder.mimeType });
    playbackVideoElement.src = URL.createObjectURL(recording);

    videoElem.srcObject = null;
}

function dumpOptionsInfo() {
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];

    console.log("Track settings:");
    console.log(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.log("Track constraints:");
    console.log(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

// console.log = (msg) => (logElem.textContent = `${logElem.textContent}\n${msg}`);
// console.error = (msg) =>
//   (logElem.textContent = `${logElem.textContent}\nError: ${msg}`);




document.getElementById("mydiv").style.resize = "both";
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
