let poseNet;
let pose;

let p;

let on = true;

let VariableWidth=18;
let VariableSlant = 0;
let VariableWeight = 85;

let easing = 0.08;

let widthImg, weightImg, slantImg, introImg;

let IMG0 = true;
let IMG1 = false;
let IMG2 = false;
let IMG3 = false;

let posX = 0;
let posY = -5000;

let scale = 0.95;

function preload(){
  introImg = loadImage('assets/intro.png');
  widthImg = loadImage('assets/width.png');
  weightImg = loadImage('assets/weight.png');
  slantImg = loadImage('assets/slant.png');
}

function setup() {
  createCanvas (windowWidth,windowHeight);

  let continuous = false;
  let interim = true;

  // let lang = 'en-US';
  // let speechRec = new p5.SpeechRec(lang,gotSpeech);

  // speechRec.onError = restart;
  // speechRec.onEnd = restart;
  // speechRec.start(continuous, interim);

  p = createP('embrace the<br> machine');  
  imageMode(CENTER);

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose',gotPoses);

  // function gotSpeech(){
  //   if (speechRec.resultValue){
  //     p.remove();
  //     p = createP(speechRec.resultString);
  //     p.position(posX,posY);
  //   } 
  // }

  function restart(){
    speechRec.start(continuous, interim);
  }
}

function modelLoaded(){
  console.log('poseNet Ready');
}

function gotPoses(poses){
  if (poses.length > 0){
    pose = poses[0].pose ;  
  }
}

function mousePressed(){
  if (IMG3){
    IMG3 = false;
    posY = -windowHeight/12;
  }
  if (IMG2){
    IMG2 = false;
    IMG3 = true;
  }
  if (IMG1){
  IMG1 = false;
  IMG2 = true;
  }
  if (IMG0){
    IMG0 = false;
    IMG1 = true;
  }
}

function keyPressed(){
  if (keyCode === 32){
  if (IMG3){
    IMG3 = false;
    posY = -windowHeight/12;
  }
  if (IMG2){
    IMG2 = false;
    IMG3 = true;
  }
  if (IMG1){
  IMG1 = false;
  IMG2 = true;
  }
  if (IMG0){
    IMG0 = false;
    IMG1 = true;
  }
}
}

function draw() {

  let splitString = split(p.elt.innerText,'');
  let dynamicSize = constrain(map(splitString.length,1,11,width*0.277778,width*0.083333),width*0.083333,width*0.277778);

  background(0);

  print(p);

  if (IMG0){image(introImg,0.5*width, 0.5*height, scale*width, scale*introImg.height*width/introImg.width);} 
  if (IMG1){image(widthImg,0.5*width, 0.5*height, scale*width, scale*widthImg.height*width/widthImg.width);} 
  if (IMG2){image(weightImg,0.5*width, 0.5*height, scale*width, scale*weightImg.height*width/weightImg.width);}
  if (IMG3){image(slantImg,0.5*width, 0.5*height, scale*width, scale*slantImg.height*width/slantImg.width);}

  if (pose){

    let handWidth = (pose.leftWrist.x-pose.rightWrist.x);
    let mapWidth = map(handWidth,30,600,1,58);

    let handWeight = ((pose.leftWrist.y+pose.rightWrist.y)/2-(pose.leftShoulder.y+pose.rightShoulder.y)/2);
    let mapWeight = map(handWeight,-120,175,69,125);

    let handSlant = pose.rightWrist.y-pose.leftWrist.y;
    let mapSlant = map(handSlant,-350,350,-25,25);
   
    if (mapWidth>1){
      let maxTarget=mapWidth
      let dx = maxTarget - VariableWidth
      VariableWidth += dx * easing
    } else {
      let maxTarget=mapWidth
      let dx = maxTarget - VariableWidth
      VariableWidth += dx * easing
    }

    if (mapWeight>69){
      let maxTarget=mapWeight
      let dx = maxTarget - VariableWeight
      VariableWeight += dx * easing
    } else {
      let maxTarget=mapWeight
      let dx = maxTarget - VariableWeight
      VariableWeight += dx * easing
    }

    if (mapSlant>-25){
      let maxTarget=mapSlant
      let dx = maxTarget - VariableSlant
      VariableSlant += dx * easing
    } else {
      let maxTarget=mapSlant
      let dx = maxTarget - VariableSlant
      VariableSlant += dx * easing
    }

    p.elt.style['font-variation-settings'] = `"wdth" ${VariableWidth},"slnt" ${VariableSlant},"wght" ${VariableWeight}`;  
  }

  p.style('align', 'center');
  p.style('font-size' ,'150px');
  p.addClass('noselect');
  p.position(posX,posY);

}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
