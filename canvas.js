var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var pos = {x: 0, y: 0}
var size = 8

function drawShape() {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var x = Math.floor(Math.random() * (window.innerWidth - size));
  var y = Math.floor(Math.random() * (window.innerHeight - size));
  ctx.fillRect(x, y, 8, 8);

  pos = {x: x, y: y}
}

drawShape();

canvas.addEventListener("mousemove", function(e) {
  var x = e.pageX || e.clientX
  var y = e.pageY || e.clientY
  var distX = Math.abs(x - pos.x) - 4
  var distY = Math.abs(y - pos.y) - 4

  if (distX < 10 && distY < 10) {
    drawShape();
  }
});

