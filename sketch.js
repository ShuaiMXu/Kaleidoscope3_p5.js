var cnv;
let img;  //Declare variable 'img'.
//slider setup
let speedSlider, noise1, noise2, rColor, gColor, bColor,light,num;

// this variable will hold our shader object
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('assets/basic.vert', 'assets/basic.frag');
  // Load the image
  img = loadImage('assets/anjiao.png');
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(500, 50);
  cnv.style('z-index','-2');
}

function setup() {
  //建立Canvas
  cnv = createCanvas(800, 800,WEBGL);
  noStroke();
  centerCanvas();
  background(255);
  textSize(32);
  fill(0, 102, 153);

  // 创建 slider
  speedSlider = createSlider(1, 20, 5,1);
  speedSlider.position(130, 45);
  button = createButton("速率/形态");
  button.position(30, 45);

  noise1Slider = createSlider(1, 180, 10,1);
  noise1Slider.position(130, 85);
  button = createButton("形态1");
  button.position(30, 85);

  noise2Slider = createSlider(1, 100, 10,1 );
  noise2Slider.position(130, 125);
  button = createButton("形态2");
  button.position(30, 125);



}

function draw(){
  //slider
  const speed = speedSlider.value();

  const noise1 = noise1Slider.value();

  const noise2 = noise2Slider.value();



  // shader() sets the active shader with our shader
  shader(theShader);
  theShader.setUniform("iResolution", [width, height]);
  theShader.setUniform('noise1', noise1);
  theShader.setUniform('noise2', noise2);

  theShader.setUniform('iTime', frameCount * speed * 0.002);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  // rect gives us some geometry on the screen
  rectMode(CENTER);
  rect(width/2,height/2,100, 100);

}

function windowResized() {
  centerCanvas();
}
