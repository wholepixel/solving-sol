/*
  Solving Sol #56 (1970)

  A square is divided horizontally and vertically into four equal parts, each with lines in four directions superimposed progressively.
 */

function onResize(event) {
  draw();
}

// https://coolors.co/f0f3bd-02c39a-00a896-028090-05668d
var PALETTE1 = [
  "#F0F3BD",
  "#02C39A",
  "#00A896",
  "#028090",
  "#05668D"
].reverse();
var PALETTE2 = ["#9c89b8", "#f0a6ca", "#efc3e6", "#f0e6ef", "#b8bedd"];
// https://coolors.co/b80c09-0b4f6c-01baef-fbfbff-040f16
var PALETTE3 = "ffffea-d8d8d8-ffed66-ff5e5b-00cecb".split("-").map(function(c) {
  return "#" + c;
});
var COLORS = PALETTE3;

var canvasBg = COLORS[0];
var squareBg = canvasBg;
var lineColor = "#05668D";

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
  fillSquareWithLines(pointSW, height, directionSW, COLORS[1]);

  // North west
  fillSquareWithLines(pointNW, height, directionSW, COLORS[1]);
  fillSquareWithLines(pointNW, height, directionNW, COLORS[2]);

  // North east
  fillSquareWithLines(pointNE, height, directionSW, COLORS[1]);
  fillSquareWithLines(pointNE, height, directionNW, COLORS[2]);
  fillSquareWithLines(pointNE, height, directionNE, COLORS[3]);

  // South east
  fillSquareWithLines(pointSE, height, directionSW, COLORS[1]);
  fillSquareWithLines(pointSE, height, directionNW, COLORS[2]);
  fillSquareWithLines(pointSE, height, directionNE, COLORS[3]);
  fillSquareWithLines(pointSE, height, directionSE, COLORS[4]);
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
  var ratio = 1 / 3;
  var lineCount = 12;
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
