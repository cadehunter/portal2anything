/*var uiManager = {
    create: {
        loader: function (taskName, startingStatus) {
            
            uiManager.base.create.box("Status", "statusBox", {1: "Hello"});
            
        }
    },
    base: {
        create: {
            box: function (title, elementId, components) {
                
                var box = document.createElement("div");
                box.classList.add("UIbox");
                box.classList.id = elementId;
                box.innerHTML = "<h2>" + title + "</h2>";
                for (var i = 0; i < Object.keys(components); i++) {
                    var currentKey = Object.keys(components)[i];
                    box.innerHTML += components[currentKey];
                }
                document.getElementById("HUDRight").appendChild(box);
                
            },
        }
    }
}*/

var videoElement = document.getElementById('cameraPreviewElement');
var videoElementContainer = document.getElementById('cameraPreviewElement');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function (stream) {
        //show camera preview
        videoElementContainer.style.display = "";
        videoElement.srcObject = stream;
        videoElement.play();
    }).catch();

}

function updateNetworkInformation() {
    var connectionString = "Connnection type: <span class='arame'>" + navigator.connection.type + "</span><br>Connection Speed: <span class='arame'>" + navigator.connection.effectiveType + "</span>";
    document.querySelector(".paneNetworkInformation").lastElementChild.innerHTML = connectionString;
}

function completeBoot() {

    document.getElementById("bootScreen").classList.add("hidden");
    document.getElementById("mainHUDContainer").classList.remove("hidden");

}

updateNetworkInformation();

completeBoot();
