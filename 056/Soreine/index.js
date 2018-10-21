/*
  Solving Sol #56 (1970)

  A square is divided horizontally and vertically into four equal parts, each with lines in four directions superimposed progressively.
 */

function draw() {
  project.clear();

  var phi = (1 + Math.sqrt(5)) / 2;
  var height = Math.min(view.size.width, view.size.height) / phi;

  fillSquareWithLines(view.center, height);
  fillSquareWithLines(view.center + 20, height);
  fillSquareWithLines(view.center + 40, height);
}

function fillSquareWithLines(
  center, // Point
  height, // Number
  angle // Number
) {
  var size = new Size(height, height);
  var square = new Rectangle(center - size.width / 2, size);

  var path = new Path.Rectangle(square);
  path.strokeColor = "black";

  
}

function onResize(event) {
  draw();
}
