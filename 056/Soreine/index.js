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
  fillSquareWithLines(topLeft + new Point(0, 0), height, new Point(-1, -1));

  // North east
  fillSquareWithLines(topLeft + new Point(height, 0), height, new Point(-1, -2));

  // South west
  fillSquareWithLines(topLeft + new Point(0, height), height, new Point(-2, -1));

  // South east
  fillSquareWithLines(topLeft + new Point(height, height), height, new Point(1, -1));
}

function band(start, end, width) {
  var direction = end - start;
  var orthogonal = new Point(direction.y, - direction.x).normalize();
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

  var diagonalSize = Math.sqrt(2) * height;
  var orthogonal = new Point(direction.y, - direction.x).normalize();
  var center = corner + height / 2;
  var start = center - orthogonal.normalize(diagonalSize / 2);

  var squarePath = new Path.Rectangle(square);

  var spacing = 6; //px
  var i = 0;

  while (i * spacing <= diagonalSize) {
    var lineCenter = start + orthogonal * i * spacing;
    var lineStart = lineCenter - direction.normalize(diagonalSize / 2);
    var lineEnd = lineCenter + direction.normalize(diagonalSize / 2);

    var bandPath = band(lineStart, lineEnd, 2);
    var segmentPath = bandPath.intersect(squarePath);
    segmentPath.fillColor = "blue";
    i++;
  }
}
