<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start Recoding</title>
    <link rel="stylesheet" href="assets/style.css">
</head>

<body>

    <p>
        <button id="start">Start Screen Capture</button>&nbsp;<button id="stop">
            Stop Screen Capture
        </button>
    </p>
    <p>
        <button id="videoCapture">
            Enable Video Capture
        </button>
    </p>

    <div class="max-view">

        <div id="mydiv">
            <video class="videoscreen" style="width:inherit;height:inherit" autoplay>
            </video>
        </div>
        
        <video id="video" autoplay style="width:inherit;height:inherit">
        </video>

    </div>
    <hr>
    <br />

    <video id="playback" autoplay=""></video>

    <!-- <strong>Log:</strong>
    <br />
    <pre id="log"></pre> -->


    <script src="https://kit.fontawesome.com/dd021511bc.js" crossorigin="anonymous"></script>
    <script src="assets/app.js"></script>
</body>

</html>