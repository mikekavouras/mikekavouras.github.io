// video source: https://vimeo.com/90312869
var img;
var vid;
var theta = 0;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);

  vid = createVideo(["assets/paul.mp4"]);
  vid.loop();
  vid.hide();
}

function draw(){
  var size = 400;
  background(0);
  texture(vid);
  push();
    rotateZ(theta * 0.1);
    rotateX(theta * 0.1);
    rotateY(theta * 0.1);
    box(size, size, size);
  pop();
  theta += 0.05;
}

