/*
  Solving Sol #56 (1970)

  A square is divided horizontally and vertically into four equal parts, each with lines in four directions superimposed progressively.
 */

function onResize(event) {
  draw();
}

function draw() {
  project.clear();

  var phi = (1 + Math.sqrt(5)) / 2;
  var height = Math.min(view.size.width, view.size.height) / phi / 2;

  var topLeft = view.center - height;
   
  // North west
  fillSquareWithLines(topLeft  + new Point(0, 0), height);

  // North east
  fillSquareWithLines(topLeft + new Point(height, 0), height);

  // South west
  fillSquareWithLines(topLeft + new Point(0, height), height);

  // South east
  fillSquareWithLines(topLeft + new Point(height, height), height);
}

function fillSquareWithLines(
  corner, // Point
  height, // Number
  angle // Number
) {
  var size = new Size(height, height);
  var square = new Rectangle(corner, size);

  var path = new Path.Rectangle(square);
  path.strokeColor = "black";

  for(var i in [0, 1, 2]) {
    var from = new Point()
    var linePath = new Path.Rectangle(square);
    path.strokeColor = "red";
  }
}
