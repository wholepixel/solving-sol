/*
  Solving Sol #56 (1970)

  A square is divided horizontally and vertically into four equal parts, each with lines in four directions superimposed progressively.
 */

function onResize(event) {
  draw();
}

// https://coolors.co/fffbe4-264653-2a9d8f-f4a261-ff5e5b
var COLORS = "fffbe4-264653-2a9d8f-f4a261-ff5e5b".split("-").map(function(c) {
  return "#" + c;
});

var canvasBg = COLORS[0];
var squareBg = canvasBg;

function direction(angle) {
  return new Point(Math.cos(angle), Math.sin(angle));
}

function draw() {
  project.clear();

  // background
  new Path.Rectangle(view.bounds).fillColor = canvasBg;

  // Use golden ratio because art.
  var phi = (1 + Math.sqrt(5)) / 2;
  // Size of a small square
  var height = Math.min(view.size.width, view.size.height) / phi / 2;

  // Direction of lines for each square
  var directionSW = direction(Math.PI / 12);
  var directionNW = direction((2 * Math.PI) / 12);
  var directionNE = direction((3 * Math.PI) / 12);
  var directionSE = direction((4 * Math.PI) / 12);

  // Anchor of each square
  var topLeft = view.center - height;
  var pointSW = topLeft + new Point(0, height);
  var pointNW = topLeft + new Point(0, 0);
  var pointNE = topLeft + new Point(height, 0);
  var pointSE = topLeft + new Point(height, height);

  // Entire square
  var wholeSquare = new Path.Rectangle(new Rectangle(topLeft, height * 2));
  wholeSquare.fillColor = squareBg;

  // South West square
  fillSquareWithLines(pointSW, height, directionSW, COLORS[1]);

  // North West square
  fillSquareWithLines(pointNW, height, directionSW, COLORS[1]);
  fillSquareWithLines(pointNW, height, directionNW, COLORS[2]);

  // North East square
  fillSquareWithLines(pointNE, height, directionSW, COLORS[1]);
  fillSquareWithLines(pointNE, height, directionNW, COLORS[2]);
  fillSquareWithLines(pointNE, height, directionNE, COLORS[3]);

  // South East square
  fillSquareWithLines(pointSE, height, directionSW, COLORS[1]);
  fillSquareWithLines(pointSE, height, directionNW, COLORS[2]);
  fillSquareWithLines(pointSE, height, directionNE, COLORS[3]);
  fillSquareWithLines(pointSE, height, directionSE, COLORS[4]);
}

/**
 * Draw a line of given width (a strip) so that it can be used
 * in boolean operations with to other shapes.
 */
function strip(start, end, width) {
  var direction = end - start;
  var orthogonal = new Point(direction.y, -direction.x).normalize();
  var stripPath = new Path();
  stripPath.add(start + (orthogonal * width) / 2);
  stripPath.add(end + (orthogonal * width) / 2);
  stripPath.add(end - (orthogonal * width) / 2);
  stripPath.add(start - (orthogonal * width) / 2);
  stripPath.closed = true;

  return stripPath;
}

/**
 * Draw a square and fill it with lines in given direction and given color.
 */
function fillSquareWithLines(
  corner, // Point
  height, // Number
  direction, // Vector (Point),
  color
) {
  // The ratio between line width and line spacing
  var RATIO = 1 / 3;
  var LINE_COUNT = 12;
  // Width of lines
  var strokeWidth = (RATIO * height) / LINE_COUNT;
  // Spacing between lines
  var spacing = ((1 - RATIO) * height) / LINE_COUNT;

  var square = new Rectangle(corner, new Size(height, height));

  // Use length of diagonal as upper bound when filling the square with lines.
  var diagonalLength = Math.sqrt(2) * height * 2;
  // Orthogonal to the line direction
  var orthogonal = new Point(direction.y, -direction.x).normalize();
  // Center of the square
  var center = corner + height / 2;

  var squarePath = new Path.Rectangle(square);

  // Draw one strip at given offset orthogonally to the direction of lines
  function drawStrip(offset) {
    var lineCenter = center + orthogonal * offset;
    var lineStart = lineCenter - direction.normalize(diagonalLength / 2);
    var lineEnd = lineCenter + direction.normalize(diagonalLength / 2);

    var stripPath = strip(lineStart, lineEnd, strokeWidth);
    var segmentPath = stripPath.intersect(squarePath);
    segmentPath.fillColor = color;
  }

  var i = 0;
  do {
    var offset = i * (spacing + strokeWidth);
    drawStrip(offset);
    drawStrip(-offset);
    i++;
  } while (offset <= diagonalLength / 2);

  // Draw the square contour
  var contour = new Path.Rectangle(square);
  contour.strokeWidth = strokeWidth;
  contour.strokeColor = COLORS[1];
}
