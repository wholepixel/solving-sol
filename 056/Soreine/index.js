/*
  Solving Sol #56 (1970)

  A square is divided horizontally and vertically into four equal parts, each with lines in four directions superimposed progressively.
 */

function onResize(event) {
  draw();
}

function draw() {
  project.clear();

  // background
  new Path.Rectangle(view.bounds).fillColor = "#FAFCEF";

  var phi = (1 + Math.sqrt(5)) / 2;
  var height = Math.min(view.size.width, view.size.height) / phi / 2;

  var directionSW = new Point(-1, 0);
  var directionNW = new Point(-1, -1);
  var directionNE = new Point(-1, -3);
  var directionSE = new Point(0, -1);

  var topLeft = view.center - height;
  var pointSW = topLeft + new Point(0, height);
  var pointNW = topLeft + new Point(0, 0);
  var pointNE = topLeft + new Point(height, 0);
  var pointSE = topLeft + new Point(height, height);

  // South west
  fillSquareWithLines(pointSW, height, directionSW);

  // North west
  fillSquareWithLines(pointNW, height, directionSW);
  fillSquareWithLines(pointNW, height, directionNW);

  // North east
  fillSquareWithLines(pointNE, height, directionSW);
  fillSquareWithLines(pointNE, height, directionNW);
  fillSquareWithLines(pointNE, height, directionNE);

  // South east
  fillSquareWithLines(pointSE, height, directionNW);
  fillSquareWithLines(pointSE, height, directionNE);
  fillSquareWithLines(pointSE, height, directionSW);
  fillSquareWithLines(pointSE, height, directionSE);
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

  var spacing = 35; //px
  var i = 0;

  function drawBand(offset) {
    var lineCenter = center + orthogonal * offset;
    var lineStart = lineCenter - direction.normalize(diagonalSize / 2);
    var lineEnd = lineCenter + direction.normalize(diagonalSize / 2);

    var bandPath = band(lineStart, lineEnd, 10);
    var segmentPath = bandPath.intersect(squarePath);
    segmentPath.fillColor = "#4297C9";
  }

  do {
    var offset = i * spacing;
    drawBand(offset);
    drawBand(-offset);
    i++;
  } while (offset <= diagonalSize / 2);
}
