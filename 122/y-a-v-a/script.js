var c = document.getElementsByTagName('canvas')[0];
var ctx = c.getContext('2d');
var test;
function draw() {
  var width = ctx.canvas.width = ctx.canvas.clientWidth;
  var height = ctx.canvas.height = ctx.canvas.clientHeight;

  var blocksx = Math.floor(width / 100);
  var blocksy = Math.floor(height / 100);

  var dx = (width - (blocksx * 100)) * .5;
  var dy = (height - (blocksy * 100)) * .5;

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.strokeStyle = '#A5A2B9';

  var dashes = [12, 6];

  var lineTypes = [
    // arcs from corners
    function(c, x, y, radius) {
      drawQuarter(c, x, y, radius, 3, 0);
    },
    function(c, x, y, radius) {
      drawQuarter(c, x, y, radius, 0, 1);
    },
    function(c, x, y, radius) {
      drawQuarter(c, x, y, radius, 1, 2);
    },
    function(c, x, y, radius) {
      drawQuarter(c, x, y, radius, 2, 3);
    },

    // arcs from sides
    function(c, x, y, radius) {
      drawArc(c, x, y, radius, 0);
    },
    function(c, x, y, radius) {
      drawArc(c, x, y, radius, 1);
    },
    function(c, x, y, radius) {
      drawArc(c, x, y, radius, 2);
    },
    function(c, x, y, radius) {
      drawArc(c, x, y, radius, 3);
    },

    // straight
    function(c, x, y, radius) {
      draw09(c, x, y, radius, false, false);
    },
    function(c, x, y, radius) {
      draw10(c, x, y, radius, false, false);
    },
    function(c, x, y, radius) {
      draw11(c, x, y, radius, false, false);
    },
    function(c, x, y, radius) {
      draw12(c, x, y, radius, false, false);
    },

    // not straight
    function(c, x, y, radius) {
      draw09(c, x, y, radius, false, true);
    },
    function(c, x, y, radius) {
      draw10(c, x, y, radius, false, true);
    },
    function(c, x, y, radius) {
      draw11(c, x, y, radius, false, true);
    },
    function(c, x, y, radius) {
      draw12(c, x, y, radius, false, true);
    },

    // broken
    function(c, x, y, radius) {
      draw09(c, x, y, radius, true, false);
    },
    function(c, x, y, radius) {
      draw10(c, x, y, radius, true, false);
    },
    function(c, x, y, radius) {
      draw11(c, x, y, radius, true, false);
    },
    function(c, x, y, radius) {
      draw12(c, x, y, radius, true, false);
    }
  ];

  function drawQuarter(c, x, y, radius, start, end) {
    var clockWise = false;

    var startAngle = 0.5 * Math.PI * start;
    var endAngle = 0.5 * Math.PI * end;
    var newx = start === 0 || start === 3 ? x : x + radius;
    var newy = end === 0 || end === 3 ? y + radius : y;

    c.beginPath();
    c.arc(newx, newy, radius, startAngle, endAngle, clockWise);
    c.stroke();
  }

  function drawArc(c, x, y, radius, start) {
    var startAngle = (- (1/6) + (1/2 * start)) * Math.PI;
    var endAngle = (- (1/6) + (1/2 * start) + (1/3)) * Math.PI;
    var clockWise = false;
    var refx;
    var refy;

    var halfRadius = radius * 0.5;
    var offSet = radius * 0.36863;

    switch (start) {
      case 0:
      refx = x - offSet;
      refy = y + halfRadius;
      break;
      case 1:
      refx = x + halfRadius;
      refy = y - offSet;
      break;
      case 2:
      refx = x + radius + offSet;
      refy = y + halfRadius;
      break;
      case 3:
      refx = x + halfRadius;
      refy = y + radius + offSet;
      break;
    }

    c.beginPath();
    c.arc(refx, refy, radius, startAngle, endAngle, clockWise);
    c.stroke();
  }

  function draw09(c, x, y, radius, dashed, random) {
    if (dashed) {
      c.setLineDash(dashes);
    }
    c.beginPath();
    c.moveTo(x + .5 * radius, y);

    if (random) {
      var randx;
      var randy;
      var dx = x + .5 * radius;
      var dy = y;
      while (dy < (y + radius - (radius * .1))) {
        randx = (Math.random() * .6 - .3) * (radius * .09);
        randy = (Math.random() * .6 + .2) * radius * .18;
        c.lineTo(dx + randx, dy += randy);
      }
    }

    c.lineTo(x + .5 * radius, y + radius);
    c.stroke();
    if (dashed) {
      c.setLineDash([0,0]);
    }
  }

  function draw10(c, x, y, radius, dashed, random) {
    if (dashed) {
      c.setLineDash(dashes);
    }
    c.beginPath();
    c.moveTo(x, y + .5 * radius);

    if (random) {
      var randx;
      var randy;
      var dx = x;
      var dy = y + .5 * radius;
      while (dx < (x + radius - (radius * .1))) {
        randx = (Math.random() * .6 + .2) * radius * .18;
        randy = (Math.random() * .6 - .3) * (radius * .09);
        c.lineTo(dx += randx, dy + randy);
      }
    }

    c.lineTo(x + radius, y + .5 * radius);
    c.stroke();
    if (dashed) {
      c.setLineDash([0,0]);
    }
  }

  function draw11(c, x, y, radius, dashed, random) {
    if (dashed) {
      c.setLineDash(dashes);
    }
    c.beginPath();
    c.moveTo(x + radius, y);

    if (random) {
      var randx;
      var randy;
      var dx = x + radius;
      var dy = y;
      while (dx > (x + (radius * .1)) && dy < (y + radius - (radius * .1))) {
        randx = (Math.random() * .6 + .2) * (radius * Math.sqrt(2) * .09);
        randy = (Math.random() * .6 + .2) * (radius * Math.sqrt(2) * .09);
        c.lineTo(dx -= randx, dy += randy);
      }
    }

    c.lineTo(x, y + radius);
    c.stroke();
    if (dashed) {
      c.setLineDash([0,0]);
    }
  }

  function draw12(c, x, y, radius, dashed, random) {
    if (dashed) {
      c.setLineDash(dashes);
    }
    c.beginPath();
    c.moveTo(x, y);

    if (random) {
      var randx;
      var randy;
      var dx = x;
      var dy = y;
      while (dx < (x + radius - (radius * .1)) && dy < (y + radius - (radius * .1))) {
        randx = (Math.random() * .6 + .2) * (radius * Math.sqrt(2) * .09);
        randy = (Math.random() * .6 + .2) * (radius * Math.sqrt(2) * .09);
        c.lineTo(dx += randx, dy += randy);
      }
    }

    c.lineTo(x + radius, y + radius);
    c.stroke();
    if (dashed) {
      c.setLineDash([0,0]);
    }
  }

  var crossMatrix = [
    [0,1,0,1, 1,1,1,1, 1,1,1,0, 1,1,1,0, 1,1,1,0],
    [1,0,1,0, 1,1,1,1, 1,1,0,1, 1,1,0,1, 1,1,0,1],
    [0,1,0,1, 1,1,1,1, 1,1,1,0, 1,1,1,0, 1,1,1,0],
    [1,0,1,0, 1,1,1,1, 1,1,0,1, 1,1,0,1, 1,1,0,1],

    [1,1,1,1, 0,1,0,1, 0,1,1,1, 0,1,1,1, 0,1,1,1],
    [1,1,1,1, 1,0,1,0, 1,0,1,1, 1,0,1,1, 1,0,1,1],
    [1,1,1,1, 0,1,0,1, 0,1,1,1, 0,1,1,1, 0,1,1,1],
    [1,1,1,1, 1,0,1,0, 1,0,1,1, 1,0,1,1, 1,0,1,1],

    [1,1,1,1, 0,1,0,1, 0,1,1,1, 0,1,1,1, 0,1,1,1],
    [1,1,1,1, 1,0,1,0, 1,0,1,1, 1,0,1,1, 1,0,1,1],
    [1,0,1,0, 1,1,1,1, 1,1,0,1, 1,1,0,1, 1,1,0,1],
    [0,1,0,1, 1,1,1,1, 1,1,1,0, 1,1,1,0, 1,1,1,0],

    [1,1,1,1, 0,1,0,1, 0,1,1,1, 0,1,1,1, 0,1,1,1],
    [1,1,1,1, 1,0,1,0, 1,0,1,1, 1,0,1,1, 1,0,1,1],
    [1,0,1,0, 1,1,1,1, 1,1,0,1, 1,1,0,1, 1,1,0,1],
    [0,1,0,1, 1,1,1,1, 1,1,1,0, 1,1,1,0, 1,1,1,0],

    [1,1,1,1, 0,1,0,1, 0,1,1,1, 0,1,1,1, 0,1,1,1],
    [1,1,1,1, 1,0,1,0, 1,0,1,1, 1,0,1,1, 1,0,1,1],
    [1,0,1,0, 1,1,1,1, 1,1,0,1, 1,1,0,1, 1,1,0,1],
    [0,1,0,1, 1,1,1,1, 1,1,1,0, 1,1,1,0, 1,1,1,0]
  ];

  var radius = 100;
  var lineOne;
  var lineTwo;

  for (var x = 0; x < blocksx; x++) {
    for (var y = 0; y < blocksy; y++) {
      lineOne = Math.floor(Math.random() * lineTypes.length);
      lineTwo = getUnique(lineOne, lineTypes.length);

      lineTypes[lineOne].call(null, ctx, x * radius + dx, y * radius + dy, radius);
      lineTypes[lineTwo].call(null, ctx, x * radius + dx, y * radius + dy, radius);
    }
  }

  function getUnique(oldVal, total) {
    var newVal;
    do {
      do {
        newVal = Math.floor(Math.random() * total);
      } while (newVal === oldVal);
    } while (crossMatrix[oldVal][newVal] === 0);

    return newVal;
  }


    // debug
    // for (var p = 0; p < lineTypes.length; p++) {
    //   lineTypes[p].call(null, ctx, p * 100, p, 100);
    // }
}


window.onresize = draw;
draw();
