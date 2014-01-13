var wall = document.getElementById('wall');
var ctx = wall.getContext('2d');

wall.width = 1200;
wall.height = 500;

// global values
ctx.lineWidth = 1;

var blue = 'rgba(0, 0, 255, 0.4)';
var red = 'rgba(255, 0, 0, 0.4)';
var yellow = 'rgba(255, 230, 78, 0.4)';
var grey = 'rgba(0, 0, 0, 0.05)';

var midpoints = [
    // top
    {
        x : wall.width/2,
        y : 0
    },
    // right
    {
        x : wall.width,
        y : wall.height/2
    },
    // bottom
    {
        x : wall.width/2,
        y : wall.height
    },
    // left
    {
        x : 0,
        y : wall.height/2
    }
];

var corners = [
    // NW
    {
        x : 0,
        y : 0
    },
    // NE
    {
        x : wall.width,
        y : 0
    },
    // SE
    {
        x : wall.width,
        y : wall.height
    },
    // NW
    {
        x : 0,
        y : wall.height
    }
];

var center = {
    x : wall.width/2,
    y : wall.height/2
};

// random range
function randomRange(low, high) {
    return Math.floor( Math.random() * (1 + high - low) ) + low;
}


var gridSpacing = 50;
var gridCols = wall.width / gridSpacing;
var gridRows = wall.height / gridSpacing;

function createGrid() {

    ctx.save();
    ctx.strokeStyle = grey;

    for (var x = 0; x < gridCols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * gridSpacing, 0);
        ctx.lineTo(x * gridSpacing, wall.height);
        ctx.closePath();
        ctx.stroke();
    }
    for (var y = 0; y < gridRows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * gridSpacing);
        ctx.lineTo(wall.width, y * gridSpacing);
        ctx.closePath();
        ctx.stroke();
    }

    ctx.restore();

}


// point object
var Point = function(x, y) {
    this.x = x;
    this.y = y;
};

var points = [];

var pointsCount = 20;

function createPoints() {
    var x;
    var y;
    for (var i = pointsCount - 1; i >= 0; i--) {
        x = randomRange(0, gridCols) * gridSpacing;
        y = randomRange(0, gridRows) * gridSpacing;
        points.push( new Point(x, y) );
    }
}


function cornerLines() {
    ctx.save();
    ctx.strokeStyle = blue;
    corners.forEach(function(corner) {

        points.forEach(function(point) {
            ctx.beginPath();
            ctx.moveTo(corner.x, corner.y);
            ctx.lineTo(point.x, point.y);
            ctx.closePath();
            ctx.stroke();
        });

    });
    ctx.restore();
}
function midpointLines() {
    ctx.save();
    ctx.strokeStyle = red;
    midpoints.forEach(function(midpoint) {

        points.forEach(function(point) {
            ctx.beginPath();
            ctx.moveTo(midpoint.x, midpoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.closePath();
            ctx.stroke();
        });

    });
    ctx.restore();
}
function centerLines() {
    ctx.save();
    ctx.strokeStyle = yellow;
    points.forEach(function(point) {
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(point.x, point.y);
        ctx.closePath();
        ctx.stroke();
    });
    ctx.restore();
}


// ------------------------------------------------------------------------- //
// Init
// ------------------------------------------------------------------------- //

function init() {
    createPoints();
    createGrid();
    cornerLines();
    midpointLines();
    centerLines();
}

init();