document.addEventListener("DOMContentLoaded", function() {

    var canvas = document.getElementById("wall"),
        linew = 15,
        gridw = 15,
        margin = 100
  
    function resizeCanvas() {
      let h = window.innerHeight;
      let w = window.innerWidth;
  
      canvas.width = w;
      canvas.height = h;
      if ((margin*2) < w && (margin*2) < h) draw(canvas, linew, gridw, margin);
    }
  
    window.onresize = resizeCanvas;
    
    resizeCanvas(canvas);
  
    window.addEventListener("mousedown", function(evt) {
      mousemove = false;
      mousedown = evt;
    }, false);
  
    //Info toggle display
    var A = document.getElementById("A");
    var Q = document.getElementById("Q");
  
    A.style["visibility"] = "hidden";
  
    document.getElementById("Q").addEventListener("mouseover", function() {
      A.style["visibility"] = "";
      Q.style["visibility"] = "hidden";
    });
  
    document.getElementById("A").addEventListener("mouseout", function() {
      A.style["visibility"] = "hidden";
      Q.style["visibility"] = "";
    });
  
  });
  