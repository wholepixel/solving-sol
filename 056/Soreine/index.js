/*
  Solving Sol #56 (1970)

  A square is divided horizontally and vertically into four equal parts, each with lines in four directions superimposed progressively.
 */

function onResize(event) {
  draw();
}

var canvasBg = "#F0F3BD";
var squareBg = canvasBg;
var lineColor = "#05668D";

var color1 = "#02C39A";
var color2 = "#00A896";
var color3 = "#028090";
var color4 = "#05668D";

function direction(angle) {
  return new Point(Math.cos(angle), Math.sin(angle));
}

function draw() {
  project.clear();

  // background
  new Path.Rectangle(view.bounds).fillColor = canvasBg;

  var phi = (1 + Math.sqrt(5)) / 2;
  var height = Math.min(view.size.width, view.size.height) / phi / 2;

  var directionSW = direction(Math.PI / 12);
  var directionNW = direction((2 * Math.PI) / 12);
  var directionNE = direction((3 * Math.PI) / 12);
  var directionSE = direction((4 * Math.PI) / 12);

  var topLeft = view.center - height;
  var pointSW = topLeft + new Point(0, height);
  var pointNW = topLeft + new Point(0, 0);
  var pointNE = topLeft + new Point(height, 0);
  var pointSE = topLeft + new Point(height, height);

  // Entire square
  var wholeSquare = new Path.Rectangle(new Rectangle(topLeft, height * 2));
  wholeSquare.fillColor = squareBg;

  // South west
  fillSquareWithLines(pointSW, height, directionSW, color1);

  // North west
  fillSquareWithLines(pointNW, height, directionSW, color2);
  fillSquareWithLines(pointNW, height, directionNW, color2);

  // North east
  fillSquareWithLines(pointNE, height, directionSW, color3);
  fillSquareWithLines(pointNE, height, directionNW, color3);
  fillSquareWithLines(pointNE, height, directionNE, color3);

  // South east
  fillSquareWithLines(pointSE, height, directionSW, color4);
  fillSquareWithLines(pointSE, height, directionNW, color4);
  fillSquareWithLines(pointSE, height, directionNE, color4);
  fillSquareWithLines(pointSE, height, directionSE, color4);
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
  direction, // Vector (Point),
  color
) {
  // The ratio between line width and line spacing
  var ratio = 1 / 5;
  var lineCount = 10;
  var strokeWidth = (ratio * height) / lineCount;
  var spacing = ((1 - ratio) * height) / lineCount; //px

  var size = new Size(height, height);
  var square = new Rectangle(corner, size);

  var diagonalSize = Math.sqrt(2) * height * 2;
  var orthogonal = new Point(direction.y, -direction.x).normalize();
  var center = corner + height / 2;

  var squarePath = new Path.Rectangle(square);
  squarePath.strokeWidth = strokeWidth;
  squarePath.strokeColor = color;

  var i = 0;

  function drawBand(offset) {
    var lineCenter = center + orthogonal * offset;
    var lineStart = lineCenter - direction.normalize(diagonalSize / 2);
    var lineEnd = lineCenter + direction.normalize(diagonalSize / 2);

    var bandPath = band(lineStart, lineEnd, strokeWidth);
    var segmentPath = bandPath.intersect(squarePath);
    segmentPath.fillColor = color;
  }

  do {
    var offset = i * (spacing + strokeWidth);
    drawBand(offset);
    drawBand(-offset);
    i++;
  } while (offset <= diagonalSize / 2);
}
