let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTest = 5;
let testCompleted = 0;

// Get random image from unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=nature";

// When image loads
image.onload = async function () {
    endTime = new Date().getTime();

    // Get image size
    await fetch(imageApi).then((Response) => {
        imageSize = Response.headers.get("content-length");
        calculateSpeed();
    });
};

// Function to calculate speed
function calculateSpeed() {
    // Time taken in seconds
    let timeDuration = (endTime - startTime) / 1000;
    // Total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // If all tests completed (we get 5 images then calculate average)
    if (testCompleted == numTest) {
        let averageSpeedInBps = (totalBitSpeed / numTest).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTest).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTest).toFixed(2);

        // Display average speeds
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Test Completed!";
    } else {
        // Run the next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// Run function to start tests
const init = async () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// Run tests when window loads 
window.onload = () => {
    for (let i = 0; i < numTest; i++) {
        init();
    }
};