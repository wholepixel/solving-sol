
      /*

        PASTE SOL INSTRUCTIONS HERE i.e...

        Solving Sol #50A

        A wall divided into four parts by lines drawn corner to corner. 
        Each section with three different colors made of parallel lines superimposed. 
        Color pencil.

        Reference: https://www.themodern.org/sites/default/files/being_there_art_assignment_4_final.pdf

      */

        function onResize() {
          // Handle resizes
          // Paper.js will call this handler automatically on resize.
  
          //this plus the removeChildren() at the start of init is very hacky but works
          init()
        }
  
  
        function init() {
          //this is a very
          project.activeLayer.removeChildren()
          console.log(view)
         
  
          
  
  
  
          // Wall Drawing #146
          // All two-part combinations of blue arcs from corners and sides, 
          // and blue straight, not straight, and broken lines.
          
          //first I am going to randomly make + position all of the squares
          //then I am going to find out what has the longest continuous line
          //then I am going to find out what has the longest continuous line that does not use any of those squares
          //then once more
          //then I am going to draw the third longest
          //then random ones
          //then the second longest
          //then the first one
          
          //8 possible arcs
          //12 possible lines
          //96 total squares
          
          //1 frame is 1/100s
          
          let inchInPx = 96
          let dimensions = {x : 3, y : 3}
          let time = 0
          // function onFrame(event) {
          //     if (event.time > 5) console.log(time)
          //     else {
          //         time++
          //     // console.log(event.time)
          //     }
          // }
          function setIntervalX(callback, delay, repetitions) {
              var x = 0;
              var intervalID = window.setInterval(function () {
          
                 callback();
          
                 if (++x === repetitions) {
                     window.clearInterval(intervalID);
                 }
              }, delay);
          }
          
          // let square = {
          //     line : {
          //         direction : "", //vertical, horizontal, upDiag, downDiag
          //         type : "" // 
          //     },
          //     arc : {
          //         center: "", //UL, RR, BR, BL, etc. tells us the center, which is all we need for an arc
          //     },
          //     id : 0, //gets assigned after shuffle
          //     upperRightCorner: //also assigned after shuffle, lets us know where to make the square
          //     arcConnectionPoints : []
          //      allConnectionPoints : [[]] // arr of coords where lines end, also assigned after shuffle
          // }
          
          
          
          let arcs = ["UL", "UU", "UR", "RR", "BR", "BB", "BL", "LL"]
          let lines = ["vertical", "horizontal", "upDiag", "downDiag"]
          let lineTypes = ["straight", "wavy", "broken"]
          
          let initialArray = []
          
          //make the initial array
          for (let i = 0; i < arcs.length; i++) {
              for (let j = 0; j < lines.length; j++) {
                  for (let k = 0; k < lineTypes.length; k++) {
                      let square = {
                          line : {
                              direction : lines[j], //vertical, horizontal, upDiag, downDiag
                              type : lineTypes[k] // 
                          },
                          arc : {
                              center: arcs[i], //UL, RR, BR, BL, etc. tells us the center, which is all we need for an arc
                          },
                          id : 0, //gets assigned after shuffle
                          upperLeftCorner: [],//also assigned after shuffle, lets us know where to make the square
                          arcConnectionPoints : [],
                          lineConnectionPoints : [],
                          allConnectionPoints : [], // arr of coords where lines end, also assigned after shuffle
                          order : 0
                      }
                      initialArray.push(square)
                  }
              }
          }
          
          // console.log(initialArray)
          
          //shuffle the initial array
          //stole this function
          const shuffle = (array) => { 
            for (let i = array.length - 1; i > 0; i--) { 
              const j = Math.floor(Math.random() * (i + 1)); 
              [array[i], array[j]] = [array[j], array[i]]; 
            } 
            return array; 
          }; 
          
          const newArr = shuffle(initialArray)
          // newArr.forEach(function(el) {console.log(el.arc.center)})
          
          function findArcConnectionPoints (upperLeftCorner, arcCenter) {
              if (arcCenter == "UL" || arcCenter == "BR") return [[upperLeftCorner[0] + inchInPx, upperLeftCorner[1]], [upperLeftCorner[0], upperLeftCorner[1]+inchInPx]]
              // else if (arcCenter == "BR") return [[upperLeftCorner[0] + inchInPx, upperLeftCorner[1]], [upperLeftCorner[0], upperLeftCorner[1]+inchInPx]
              else if (arcCenter ==  "UR" || arcCenter == "BL") return [[upperLeftCorner[0], upperLeftCorner[1]], [upperLeftCorner[0] + inchInPx, upperLeftCorner[1] + inchInPx]]
              // else if (arcCenter ==  "BL") return [[upperLeftCorner[0], upperLeftCorner[1]], [upperLeftCorner[0] + inchInPx, upperLeftCorner[1] + inchInPx]]
              else if (arcCenter == "UU" || arcCenter == "BB") return [[upperLeftCorner[0], upperLeftCorner[1] + (inchInPx/2)], [upperLeftCorner[0] + inchInPx, upperLeftCorner[1] + (inchInPx/2)]]
              // else if (arcCenter == "BB") return [[upperLeftCorner[0], upperLeftCorner[1] + (inchInPx/2)], [upperLeftCorner[0] + inchInPx, upperLeftCorner[1] + (inchInPx/2)]
              else if (arcCenter == "LL" || arcCenter == "RR") return [[upperLeftCorner[0] + (inchInPx/2), upperLeftCorner[1]], [upperLeftCorner[0] + (inchInPx/2), upperLeftCorner[1] + inchInPx]]
          }
          
          function findLineConnectionPoints (upperLeftCorner, direction) {
              if (direction == "vertical") return [[upperLeftCorner[0] + (inchInPx/2), upperLeftCorner[1]], [[upperLeftCorner[0] + (inchInPx/2), upperLeftCorner[1] + inchInPx]]]
              else if (direction == "horizontal") return [[upperLeftCorner[0], upperLeftCorner[1] + (inchInPx/2)], [upperLeftCorner[0] + inchInPx, upperLeftCorner[1] + (inchInPx/2)]]
              else if (direction == "upDiag") return [[upperLeftCorner[0] + inchInPx, upperLeftCorner[1]], [upperLeftCorner[0], upperLeftCorner[1]+inchInPx]]
              else if (direction == "downDiag") return [[upperLeftCorner[0], upperLeftCorner[1]], [upperLeftCorner[0] + inchInPx, upperLeftCorner[1] + inchInPx]]
          }
          
          let arrIndex = 0
          for (let i = 0; i < dimensions.y; i++) {
              for (let j = 0; j < dimensions.x; j++) {
                  let upperLeftCorner = [j * inchInPx, i * inchInPx]
                  let arcConnectionPoints = findArcConnectionPoints(upperLeftCorner, newArr[arrIndex].arc.center)
                  let lineConnectionPoints = findLineConnectionPoints(upperLeftCorner, newArr[arrIndex].line.direction)
                  newArr[arrIndex].id = arrIndex;
                  newArr[arrIndex].upperLeftCorner = upperLeftCorner
                  newArr[arrIndex].arcConnectionPoints = arcConnectionPoints
                  newArr[arrIndex].lineConnectionPoints = lineConnectionPoints
                  newArr[arrIndex].allConnectionPoints = [...arcConnectionPoints, ...lineConnectionPoints]
                  // console.log(newArr[arrIndex])
                  arrIndex++
              }
          }
          
          
          // for (let i = 0; i < newArr.length; i++) {
          //     drawSquare()
          // }
          
          
          // newArr.forEach(function (el) {console.log("allConnectionPoints", el.allConnectionPoints)})
          // // function makeAnyFunctionOverSpecificTime([])
          
          function makeSineWave () {
              var path = new Path()
              path.strokeColor = "green"
              // path.rotation = 45
              let done = false
              let newPath
              let direction = "downDiag"
              view.onFrame = function (event) {
                  if (event.time > 1 && !done) {
                      done = true
                  } else if (!done) {
                      if (newPath) newPath.remove()
                      time++
                      let zeroZero = new Point(0,0)
                      let point = new Point((Math.sin(time/4)*3+(inchInPx)), inchInPx * (time) )
                      // console.log("point before rotate", point)
                      point.rotate(45, zeroZero)
                      // console.log("point after rotate ", point)
                      // path.add(new Point(time, (Math.sin(time/10)*5+40)));
                      // console.log("this is path rotation:", path.rotation)
                      path.add(point)
                      newPath = path.clone()
                      newPath.strokeWidth = 4
                      newPath.strokeColor = "red"
                      newPath.rotate(45, new Point(inchInPx,0))
                      // if (path.rotation !== 45) path.rotation = 45
                      // path.rotate(45, zeroZero)
                      // if ((time) === 150) console.log(path.rotation)
                      
                  }
              }
          }
          
          function makeSineWaveNew (startCoords, endCoords, type, order = 0) {
              //make initial path
              var path = new Path()
              path.strokeWidth = 4
              path.strokeColor = "green"
              let done 
              let diagPath
              view.onFrame = function (event) {
                  //horizontal case
                  
                  if (type === "horizontal" && event.time * 100 < inchInPx) {
                      path.add(new Point(event.time*100, (Math.sin(event.time*100/4)*4+startCoords[1])));
                  } else if (type === "vertical" && event.time * 100 < inchInPx) {
                      path.add(new Point((Math.sin(event.time*100/4)*4+startCoords[0]), event.time*100));
                  } else if (type === "upDiag" && event.time * 100 < inchInPx) {
                      //we're gonna achieve this by rotating a wave that sits on the bottom
                      if (diagPath) diagPath.remove()
                      path.visible = false
                      path.add(new Point((event.time*100)*Math.sqrt(2), (Math.sin(event.time*100/4)*4+startCoords[1])));
                      diagPath = path.clone()
                      diagPath.visible = true
                      diagPath.strokeWidth = 4
                      diagPath.strokeColor = "blue"
                      diagPath.rotate(-45, new Point(...startCoords))
                  } else if (type === "downDiag" && event.time * 100 < inchInPx) {
                      if (diagPath) diagPath.remove()
                      path.visible = false
                      path.add(new Point(event.time*100*Math.sqrt(2), (Math.sin(event.time*100/4)*4+startCoords[1])));
                      diagPath = path.clone()
                      diagPath.visible = true
                      diagPath.strokeWidth = 4
                      diagPath.strokeColor = "blue"
                      diagPath.rotate(45, new Point(...startCoords))
                  }
                  
                  //vertical case
                  
                  
                  //diag case
                  let done = false
              }
          }
          // makeSineWave()
          // makeSineWaveNew([0, 48], [96, 48], "horizontal")
          // makeSineWaveNew([48, 0], [48, 96], "vertical")
          makeSineWaveNew([0, 96], [96, 0], "upDiag")
          // makeSineWaveNew([0,0], [96, 96], "downDiag")
          
          var aFrom = new Point( 0, 0 );
          var center = new Point( 0, 300 );
          var arc;
          function makeArc() {
              let done = false
              view.onFrame = function (event) {
                  console.log("in on frame", (event.time % 1))
                  if ( arc && !done ) {
                      arc.remove();
                  }
                  
                  var through = aFrom.clone().rotate( ( 180 * (event.time % 1) / 4 ), center);
                  var to = aFrom.clone().rotate( ( 180 * (event.time % 1 / 2) ), center);
                  arc = new Path.Arc( aFrom, through, to );
                  arc.strokeColor = 'black';
                  if (event.time % 1 > 0.98) done = true
                  }
              }
              
          
          
          // makeArc()
          
          
          function makeCoordSineWave (square) {
              console.log("in make sine", square.lineConnectionPoints, square.line.direction)
              let direction = square.line.direction 
              let startingCoords = square.lineConnectionPoints[0]
              let endingCoords = square.lineConnectionPoints[1]
          
              var path = new Path()
              path.strokeColor = "black"
              path.strokeWidth = 10
              console.log("start, end", startingCoords, endingCoords)
              let setInterval 
          }
          
          function getRandomInt(max) {
            return Math.floor(Math.random() * max) + 1;
          }
          
          
          // makeRightAngle([100,100], [300, 300], "left")
          
          function drawMovingLine(startingXY, endingXY, color, time, broken = false) {
              // console.log("in moving line", startingXY, endingXY)
              var path = new Path.Line({
                  from: [startingXY[0], startingXY[1]],
                  to: [startingXY[0], startingXY[1]],
                  strokeColor: color,
                  strokeWidth : 2
              });
              if (broken) path.dashArray = [10, 4]
              
              // console.log(path.segments[1])
              // path.dashArray = [10, 4];
              path.tween({
                  'segments[1].point': {x: endingXY[0], y: endingXY[1] },
              }, time);
          }
          
          
          
          
          function newDrawSquare (square) {
              var rectangle = new Rectangle(new Point(square.upperLeftCorner), new Point(square.upperLeftCorner[0] + inchInPx, square.upperLeftCorner[1] + inchInPx));
              var path = new Path.Rectangle(rectangle);
              path.strokeColor = "red";
              path.strokeWidth = 2
              // console.log("squareID:", square.id)
              // makeCoordSineWave(square)
              //Make Lines
              if (square.line.type == "wavy") {
                  
              } else {
                  drawMovingLine(square.lineConnectionPoints[0], square.lineConnectionPoints[1], "blue", 1000, square.line.type === "broken")
                  // var line = new Path.Line(new Point(...square.lineConnectionPoints[0]), new Point(square.lineConnectionPoints[1]))
                  // line.strokeColor = "green"
                  // line.strokeWidth = 3
                  // if (square.line.type == "broken") line.dashArray = [10, 4];
                  //if (square.line.type == "wavy") line
              }
          }
          
          
          for (let i = 0; i < newArr.length; i++) {
              // console.log("in for loop", newArr[i].upperLeftCorner)
              // console.log(newArr[i].lineConnectionPoints)
              newDrawSquare(newArr[i])
          }
          
        }
  
        // This will fire when Paper.js is ready
        init();