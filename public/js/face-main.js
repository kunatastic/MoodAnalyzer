const video = document.getElementById("video");
const isScreenSmall = window.matchMedia("(max-width: 700px)");
let predictedAges = [];

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/js/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/js/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/js/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/js/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/js/models"),
]);

function startVideo() {
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => err
  );
}

var data = {
  expression: {
    angry: 0,
    disgusted: 0,
    fearful: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    surprised: 0,
  },
  count: 0,
  emotion: "",
};

const stop = async () => {
  console.log("stop");
  // alert("Count: " + data.count);
  const video = document.querySelector("video");
  const mediaStream = video.srcObject;
  const tracks = mediaStream.getTracks();
  tracks[0].stop();

  const maxValue = Math.max(...Object.values(data.expression));
  const emotion = Object.keys(data.expression).filter(
    (item) => data.expression[item] === maxValue
  );
  data.emotion = emotion[0];

  alert("Emotion: " + emotion[0]);
  try {
    const response = await fetch("/face", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
  // // sessionStorage.setItem("Face-data", JSON.stringify(data));
  window.location.replace("/");
};

function screenResize(isScreenSmall) {
  if (isScreenSmall.matches) {
    // If media query matches
    video.style.width = "500px";
  } else {
    video.style.width = window.width;
    video.style.height = window.height;
  }
}

startVideo();
screenResize(isScreenSmall); // Call listener function at run time
// isScreenSmall.addListener(screenResize);

video.addEventListener("playing", () => {
  console.log("playing called");
  const canvas = faceapi.createCanvasFromMedia(video);
  let container = document.querySelector(".container");
  container.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    console.log(resizedDetections);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    if (resizedDetections && Object.keys(resizedDetections).length > 0) {
      const expressions = resizedDetections.expressions;
      const maxValue = Math.max(...Object.values(expressions));
      const emotion = Object.keys(expressions).filter(
        (item) => expressions[item] === maxValue
      );
      data.count += 1;
      data.expression.angry += expressions.angry;
      data.expression.disgusted += expressions.disgusted;
      data.expression.fearful += expressions.fearful;
      data.expression.happy += expressions.happy;
      data.expression.neutral += expressions.neutral;
      data.expression.sad += expressions.sad;
      data.expression.surprised += expressions.surprised;

      document.getElementById("emotion").innerText = `Emotion - ${emotion[0]}`;
    }
  }, 1000);
});

function interpolateAgePredictions(age) {
  predictedAges = [age].concat(predictedAges).slice(0, 10);
  const avgPredictedAge =
    predictedAges.reduce((total, a) => total + a) / predictedAges.length;
  return avgPredictedAge;
}
