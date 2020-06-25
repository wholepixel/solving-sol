function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  strokeWeight(1.5);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(155, 90, 50);
  noFill();
  var h = map(mouseX, 0, width, 0, 360);
  stroke(35, 100, 100);
  for (var x=0; x<width; x+=8) {
    bezier(x, 0, 
           x+random(10)-5, height/2, 
           x+random(10)-5, height/2, 
           x, height);
  }
}