var cnv;
var gui;
let img;  //Declare variable 'img'.

//GUI slider setup
var speed = 5;
var seed1 = 10;
var seed2 = 10;

var bgColorR = 0;
var bgColorG = 0;
var bgColorB = 0;

var ob1ColorR = 204;
var ob1ColorG = 118;
var ob1ColorB = 71;

var ob2ColorR = 115;
var ob2ColorG = 56;
var ob2ColorB = 20;



// this variable will hold our shader object
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('assets/basic.vert', 'assets/basic.frag');
  // Load the image
  img = loadImage('assets/anjiao.png');
}

function centerCanvas() {
  var x = (windowWidth - width) / 2 ;
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
  // create the GUI
  gui = createGui('slider-range-2');

  // set slider range for seeds
  sliderRange(1, 50, 1);
  gui.addGlobals('speed');

  sliderRange(1, 180, 1);
  gui.addGlobals('seed1');

  sliderRange(1, 180, 1);
  gui.addGlobals('seed2');

  sliderRange(0, 255, 0.0001);
  gui.addGlobals('bgColorR','bgColorG','bgColorB');

  sliderRange(0, 255, 0.0001);
  gui.addGlobals('ob1ColorR','ob1ColorG','ob1ColorB');

  sliderRange(0, 255, 0.0001);
  gui.addGlobals('ob2ColorR','ob2ColorG','ob2ColorB');
}

function draw(){

  // shader() sets the active shader with our shader
  shader(theShader);
  theShader.setUniform("iResolution", [width, height]);
  theShader.setUniform('noise1', seed1);
  theShader.setUniform('noise2', seed2);
  theShader.setUniform('bgColor',[bgColorR/255,bgColorG/255,bgColorB/255]);
  theShader.setUniform('ob1Color',[ob1ColorR/255,ob1ColorG/255,ob1ColorB/255]);
  theShader.setUniform('ob2Color',[ob2ColorR/255,ob2ColorG/255,ob2ColorB/255]);

  theShader.setUniform('iTime', frameCount * speed * 0.002);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  // rect gives us some geometry on the screen
  rectMode(CENTER);
  rect(width/2,height/2,100, 100);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
