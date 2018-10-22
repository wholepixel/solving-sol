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
  var directionNW = new Point(-1, -1);
  var directionNE = new Point(-1, -2);
  var directionSW = new Point(-2, -1);
  var directionSE = new Point(1, -1);

  // North west
  fillSquareWithLines(topLeft + new Point(0, 0), height, directionNW);

  // North east
  fillSquareWithLines(topLeft + new Point(height, 0), height, directionNW);
  fillSquareWithLines(topLeft + new Point(height, 0), height, directionNE);

  // South west
  fillSquareWithLines(topLeft + new Point(0, height), height, directionNW);
  // fillSquareWithLines(topLeft + new Point(0, height), height, directionNE);
  fillSquareWithLines(topLeft + new Point(0, height), height, directionSW);

  // South east
  fillSquareWithLines(topLeft + new Point(height, height), height, directionNW);
  fillSquareWithLines(topLeft + new Point(height, height), height, directionNE);
  fillSquareWithLines(topLeft + new Point(height, height), height, directionSW);
  // fillSquareWithLines(topLeft + new Point(height, height), height, directionSE);
}

function band(start, end, width) {
  var direction = end - start;
  var orthogonal = new Point(direction.y, -direction.x).normalize();
  var bandPath = new Path();
  bandPath.add(start + (orthogonal * width) / 2);
  bandPath.add(end + (orthogonal * width) / 2);
  bandPath.add(end - (orthogonal * width) / 2);
  bandPath.add(start - (orthogonal * width) / 2);
  bandPath.closed = true;

  return bandPath;
}

function fillSquareWithLines(
  corner, // Point
  height, // Number
  direction // Vector (Point)
) {
  var size = new Size(height, height);
  var square = new Rectangle(corner, size);

  var diagonalSize = Math.sqrt(2) * height * 2;
  var orthogonal = new Point(direction.y, -direction.x).normalize();
  var center = corner + height / 2;

  var squarePath = new Path.Rectangle(square);

  var spacing = 20; //px
  var i = 0;

  function drawBand(offset) {
    var lineCenter = center + orthogonal * offset;
    var lineStart = lineCenter - direction.normalize(diagonalSize / 2);
    var lineEnd = lineCenter + direction.normalize(diagonalSize / 2);

    var bandPath = band(lineStart, lineEnd, 10);
    var segmentPath = bandPath.intersect(squarePath);
    segmentPath.fillColor = "blue";
  }

  do {
    var offset = i * Math.sqrt(i) * spacing;
    drawBand(offset);
    drawBand(-offset);
    i++;
  } while (offset <= diagonalSize / 2);
}
