img = "";
status = "";
objects = [];
objectDetector = "";
song = "";

function preload() {

song = loadSound("alarm_beep_3.mp3");
}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350,350);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video,0,0,350,350);

    if(status != ""){
    
    }
    r = random(255);
    g = random(255);
    b = random(255);
    
    objectDetector.detect(video, gotResult);
    for(i = 0; i < objects.length; i++) {
    
        document.getElementById("status").innerHTMl = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 2, objects[i].y + 13);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width + 20, objects[i].height);
        
        if (objects[i].label == 'person') {
            document.getElementById("alarm").innerHTML = "Baby Detected";
            song.stop();
            
        }
        else {
            document.getElementById("alarm").innerHTML = "BABY NOT DETECTED";
            song.play();
        }
        
        if(objects[i].label < 0)
        {
            document.getElementById("alarm").innerHTML = "BABY NOT DETECTED";
            song.play()
        }
    }
    




}


function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);

    }
    console.log(results);
    objects = results;
}
