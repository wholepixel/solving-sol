// Double Drawing. Right: Isometric Figure (Cube) with progressively darker graduations of gray on each of three planes; Left: Isometric figure with red, yellow, and blue superimposed progressively on each of the three planes. The background is gray.

function setup() {
  createCanvas(750,500);
  noStroke ();
  angleMode (DEGREES);
}

function draw() {
  background(240);
  //plane A1
  fill (250);
  quad (450,185,550,240,550,360,450,300);
  //plane A2
  fill (220);
  quad (550,240,650,185,650,300,550,360);
  //plane A3
  fill (200);
  quad (450,185,550,240,650,185,550,125);
  //plane B1
  fill (255,0,0,170);
  quad (100,185,200,240,200,360,100,300);
  //plane B2
  fill (0,255,0,170);
  quad (200,240,300,185,300,300,200,360);
  //plane B3
  fill (255,255,0,170);
  quad (100,185,200,240,300,185,200,125);
}
