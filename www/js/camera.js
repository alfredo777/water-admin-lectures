var pictureSource; // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    var url = "data:image/jpeg;base64," + imageData;
    var rand = Math.floor((Math.random() * 10100) + 1);
    var data = {
        "url": String(url),
        "rand": rand
    }
    var idpath = window.localStorage.getItem("lecturex");
    console.log(idpath);
    putsformDBTPL(data, "image_context", "images-adding"+idpath);
    $('#submitimages').show();
}

function onPhotoDataSuccessNoRoute(imageData) {
    var url = "data:image/jpeg;base64," + imageData;
    var rand = Math.floor((Math.random() * 10100) + 1);
    var data = {
        "url": String(url),
        "rand": rand
    }
    putsformDBTPL(data, "image_context", "images-adding");
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    var url = imageURI;
    var rand = Math.floor((Math.random() * 10100) + 1);
    var data = {
        "url": String(url),
        "rand": rand
    }

    var idpath = window.localStorage.getItem("lecturex");
    console.log(idpath);
    putsformDBTPL(data, "image_context", "images-adding"+idpath);
    $('#submitimages').show();
}

// A button will call this function
//
function capturePhoto(callback) {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}

function capturePhotoNoRoute(callback) {
    navigator.camera.getPicture(onPhotoDataSuccessNoRoute, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}

// A button will call this function
//
function capturePhotoEdit() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 20,
        allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
}

// A button will call this function
//
function getPhoto(source) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}

function iteractIMAGEFORM() {
    $('#submitimages').hide();
    var id = $("#images-adding #id").val();
    var type = $("#images-adding #type").val();
    $('#images-adding input[type=text]').each(function(i) {
        var input = $(this);
        var value = input.val();
        if (i > 1) {
            compose_data = [value, id, type];
            insertData(compose_data, "images", myDataBase, Schema, false);
        }
    });
}