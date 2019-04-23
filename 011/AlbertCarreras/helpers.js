//basic line draw function
function line(ctx, x1, y1, x2, y2, color="black") {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  
  function perspective(ctx, height, width, margin) {
    let color = "#EAECEE"
    //draw corners
    line(ctx, 0, 0, margin, margin, color)
    line(ctx, width, 0, width-margin, margin, color)
    line(ctx, 0, height, margin, height-margin, color)
    line(ctx, width, height, width-margin, height-margin, color);
  
    //draw floor poligon
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(margin,height-margin);
    ctx.lineTo(width-margin, height-margin);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
  }
  
  function grid(ctx, height, width, gridw, margin) {
  
    var midx = (width/2);
    var midy = (height/2);
    var netHeight = height-margin;
    var netWidth = width-margin;
  
    //draw vertical lines to the right and left
    for (var i=0; midx + gridw * i < netWidth; i++) {
      var rightMid = midx + gridw*i;
      var leftMid = midx - gridw*i;
      line(ctx, rightMid, margin, rightMid, netHeight);
      line(ctx, leftMid, margin, leftMid, netHeight);
    }
  
    //draw horizontal lines above and below
    for (var i=0; midy + gridw * i < netHeight; i++) {
      var aboveMid = midy + gridw*i;
      var belowMid = midy - gridw*i;
      line(ctx, margin, aboveMid, netWidth, aboveMid);
      line(ctx, margin, belowMid, netWidth, belowMid);
    }
  }
  
  function diag(ctx, linew, w, h, quadrant, margin) {
    
    let midH = h/2
    let midW = w/2
    let netH = midH - margin
    let netW = midW - margin
    let len = (h+w)/2 - (2 * margin)
  
    if (quadrant%2 !== 0) {
      for (var i=0; i * linew <= len; i++) {
        let accLength = i * linew
        let startX = 0
        let startY = accLength
        let endX = accLength
        let endY = 0
  
        if(startY > netH) {
          startY = netH
          startX =  accLength - midH + margin
        }
  
        if(endX > netW) {
            endX = netW
            endY = accLength - midW + margin
        }
  
        line(ctx, startX,startY, endX, endY);
      }
      
    } else {
      for (var i=0; i * linew <= len; i++) {
        let accLength = i * linew
        let startY = 0
        let startX = accLength
        let endY = accLength
        let endX = 0
  
        if(startX > netH) {
          startX = netH
          startY = accLength - (h/2) + margin
        }
  
        if(endY > netW) {
            endY = netW
            endX = accLength - (w/2) + margin
        }
  
        line(ctx, startX,startY, endX, endY);
      }
    }
  }
  
  function draw(canvas, linew, gridw, margin) {
  
    var ctx = canvas.getContext("2d"),
        h = canvas.height,
        w = canvas.width;
  
    //clears canvas
    ctx.clearRect(0,0,w,h);
  
    // Sol LeWitt's drawing of #11 shows that he means a grid throughout the whole piece
    grid(ctx, h, w, gridw, margin);
    perspective(ctx, h, w, margin);
    ctx.save();
  
    // Move to the center
    ctx.translate(w/2, h/2);
    diag(ctx, linew, w, h, 1, margin);
  
    for(var i=2; i <= 4; i++){
      ctx.rotate(Math.PI/2);
      diag(ctx, linew, w, h, i, margin);
    }
  }