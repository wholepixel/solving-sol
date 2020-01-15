const GRID_SIZE = 0.05;

const randOnGrid = (cnv, extent) => {;
  choices = []
  for (let i = 0; i < 1; i+= GRID_SIZE) {
    choices.push(i)
  }
  return extent * cnv.random(choices)
};

const midpoint = cnv => {
  const { width, height } = cnv;
  const origin = {
    x: width / 2,
    y: height / 2
  };
  for (let i = 0; i < 24; i++) {
    cnv.line(
      origin.x,
      origin.y,
      randOnGrid(cnv, width),
      randOnGrid(cnv, height)
    );
  }
};

const corners = cnv => {
  const { width, height } = cnv;
  for (let i = 0; i < 12; i++) {
    cnv.line(0, 0, randOnGrid(cnv, width), randOnGrid(cnv, height));
    cnv.line(width, 0, randOnGrid(cnv, width), randOnGrid(cnv, height));
    cnv.line(width, height, randOnGrid(cnv, width), randOnGrid(cnv, height));
    cnv.line(0, height, randOnGrid(cnv, width), randOnGrid(cnv, height));
  }
};

const sides = cnv => {
  const { width, height } = cnv;
  const origin = {
    x: width / 2,
    y: height / 2
  };
  for (let i = 0; i < 12; i++) {
    cnv.line(origin.x, 0, randOnGrid(cnv, width), randOnGrid(cnv, height));
    cnv.line(width, origin.y, randOnGrid(cnv, width), randOnGrid(cnv, height));
    cnv.line(origin.x, height, randOnGrid(cnv, width), randOnGrid(cnv, height));
    cnv.line(0, origin.y, randOnGrid(cnv, width), randOnGrid(cnv, height));
  }
};

const createWall = (wall, drawFuncs) => canvas => {
  const getWallDimensions = (canvas, wall) => {
    let { width, height } = canvas.select(`#${wall}`);
    return { width, height };
  };

  canvas.setup = () => {
    let { width, height } = getWallDimensions(canvas, wall);
    canvas.createCanvas(width, height);
    canvas.noLoop();
  };

  canvas.draw = () => {
    canvas.randomSeed(123);
    canvas.stroke(255);
    drawFuncs.forEach(func => {
      func(canvas);
    });
  };

  canvas.windowResized = () => {
    let { width, height } = getWallDimensions(canvas, wall);
    canvas.resizeCanvas(width, height);
  };
};

const wall1 = new p5(createWall("wall1", [midpoint]), "wall1");
const wall2 = new p5(createWall("wall2", [sides]), "wall2");
const wall3 = new p5(createWall("wall3", [corners]), "wall3");
const wall4 = new p5(
  createWall("wall4", [midpoint, corners, sides]),
  "wall4"
);
