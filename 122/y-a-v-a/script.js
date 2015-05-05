/**
 * Assumptions:
 * Blocks have a size of 100px x 100px. Modify radius to your liking.
 * Certain lines can cross each other, others cannot.
 * The not straight lines have some manipulations that make
 * it look nice to my humble opinion.
 *
 * yet another visual artist • y-a-v-a.org
 * Vincent Bruijn <vebruijn@gmail.com> - http://www.y-a-v-a.org
 * 2015 • CC BY SA 3.0
 */
(function() {
  var c = document.getElementsByTagName('canvas')[0];
  var ctx = c.getContext('2d');
  var dashes = [12, 6];
  var radius = 100;
  var lineOne;
  var lineTwo;

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
      drawVert(c, x, y, radius, false, false);
    },
    function(c, x, y, radius) {
      drawHoriz(c, x, y, radius, false, false);
    },
    function(c, x, y, radius) {
      drawDiagonalRight(c, x, y, radius, false, false);
    },
    function(c, x, y, radius) {
      drawDiagonalLeft(c, x, y, radius, false, false);
    },

    // not straight
    function(c, x, y, radius) {
      drawVert(c, x, y, radius, false, true);
    },
    function(c, x, y, radius) {
      drawHoriz(c, x, y, radius, false, true);
    },
    function(c, x, y, radius) {
      drawDiagonalRight(c, x, y, radius, false, true);
    },
    function(c, x, y, radius) {
      drawDiagonalLeft(c, x, y, radius, false, true);
    },

    // broken
    function(c, x, y, radius) {
      drawVert(c, x, y, radius, true, false);
    },
    function(c, x, y, radius) {
      drawHoriz(c, x, y, radius, true, false);
    },
    function(c, x, y, radius) {
      drawDiagonalRight(c, x, y, radius, true, false);
    },
    function(c, x, y, radius) {
      drawDiagonalLeft(c, x, y, radius, true, false);
    }
  ];

  // arcs from corners
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

  // arcs from sides
  function drawArc(c, x, y, radius, start) {
    var startAngle = (- (1/6) + (1/2 * start)) * Math.PI;
    var endAngle = (- (1/6) + (1/2 * start) + (1/3)) * Math.PI;
    var clockWise = false;
    var refx;
    var refy;

    var halfRadius = radius * 0.5;
    var offset = radius * 0.36863;

    switch (start) {
      case 0:
      refx = x - offset;
      refy = y + halfRadius;
      break;
      case 1:
      refx = x + halfRadius;
      refy = y - offset;
      break;
      case 2:
      refx = x + radius + offset;
      refy = y + halfRadius;
      break;
      case 3:
      refx = x + halfRadius;
      refy = y + radius + offset;
      break;
    }

    c.beginPath();
    c.arc(refx, refy, radius, startAngle, endAngle, clockWise);
    c.stroke();
  }


  // narrow limit from 0.2 to 0.8 or from -0.3 to 0.3
  function narrowLimit(signed) {
    var limit = Math.random() * 0.6;
    return !!signed ? limit - 0.3 : limit + 0.2;
  }

  function randomDiagonal(radius) {
    return narrowLimit() * (radius * Math.sqrt(2) * 0.09);
  }

  // straight, not straight and broken
  function drawVert(c, x, y, radius, dashed, random) {
    var offset = 0.5 * radius;
    var threshold = 0.1 * radius;
    if (dashed) {
      c.setLineDash(dashes);
    }
    c.beginPath();
    c.moveTo(x + offset, y);

    if (random) {
      var randx;
      var randy;
      var dx = x + offset;
      var dy = y;
      while (dy < (y + radius - threshold)) {
        randx = narrowLimit(true) * (radius * .09);
        randy = narrowLimit() * radius * .18;
        c.lineTo(dx + randx, dy += randy);
      }
    }

    c.lineTo(x + offset, y + radius);
    c.stroke();
    if (dashed) {
      c.setLineDash([0,0]);
    }
  }

  function drawHoriz(c, x, y, radius, dashed, random) {
    var offset = 0.5 * radius;
    var threshold = 0.1 * radius;
    if (dashed) {
      c.setLineDash(dashes);
    }
    c.beginPath();
    c.moveTo(x, y + offset);

    if (random) {
      var randx;
      var randy;
      var dx = x;
      var dy = y + offset;
      while (dx < (x + radius - threshold)) {
        randx = narrowLimit() * radius * .18;
        randy = narrowLimit(true) * (radius * .09);

        c.lineTo(dx += randx, dy + randy);
      }
    }

    c.lineTo(x + radius, y + offset);
    c.stroke();
    if (dashed) {
      c.setLineDash([0,0]);
    }
  }

  function drawDiagonalRight(c, x, y, radius, dashed, random) {
    var threshold = 0.1 * radius;
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
      while (dx > (x + threshold) && dy < (y + radius - threshold)) {
        randx = randomDiagonal(radius);
        randy = randomDiagonal(radius);
        c.lineTo(dx -= randx, dy += randy);
      }
    }

    c.lineTo(x, y + radius);
    c.stroke();
    if (dashed) {
      c.setLineDash([0,0]);
    }
  }

  function drawDiagonalLeft(c, x, y, radius, dashed, random) {
    var threshold = 0.1 * radius;
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
      while (dx < (x + radius - threshold) && dy < (y + radius - threshold)) {
        randx = randomDiagonal(radius);
        randy = randomDiagonal(radius);
        c.lineTo(dx += randx, dy += randy);
      }
    }

    c.lineTo(x + radius, y + radius);
    c.stroke();
    if (dashed) {
      c.setLineDash([0,0]);
    }
  }

  // which lines do cross, which do not
  var crossMatrix = [
  // ◝ ◞ ◟ ◜  ) ⌣ ( ⌢  | - / \  | - / \  ⋮ ⋯ ⋰ ⋱
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

  function getUnique(oldVal, total) {
    var newVal;
    do {
      do {
        newVal = Math.floor(Math.random() * total);
      } while (newVal === oldVal);
    } while (crossMatrix[oldVal][newVal] === 0);

    return newVal;
  }

  function draw() {
    var width = ctx.canvas.width = ctx.canvas.clientWidth;
    var height = ctx.canvas.height = ctx.canvas.clientHeight;

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.strokeStyle = '#A5A2B9'; // blue

    var blocksx = Math.floor(width / radius);
    var blocksy = Math.floor(height / radius);

    var marginLeft = (width - (blocksx * radius)) * 0.5; // margin left
    var marginTop = (height - (blocksy * radius)) * 0.5; // margin top

    var x;
    var y;
    var row;
    var col;

    for (row = 0; row < blocksx; row++) {
      for (col = 0; col < blocksy; col++) {
        lineOne = Math.floor(Math.random() * lineTypes.length);
        lineTwo = getUnique(lineOne, lineTypes.length);

        x = row * radius + marginLeft;
        y = col * radius + marginTop;

        lineTypes[lineOne].call(null, ctx, x, y, radius);
        lineTypes[lineTwo].call(null, ctx, x, y, radius);
      }
    }
  }

  window.onresize = draw;
  draw();

}());
