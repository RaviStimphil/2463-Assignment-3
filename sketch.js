let spriteSheet;
let WalkingAnimation;
function preload(){
  spriteSheet = loadImage("assets/SpelunkyGuy-SpriteSheet.png");
  spriteSheet2 = loadImage("assets/SpelunkyGreen-SpriteSheet.png");
}
function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);
  WalkingAnimation = new WalkingDirection(spriteSheet,80,80,200,200,9);
  WalkingAnimation2 = new WalkingDirection(spriteSheet2,80,80,300,200,9);
  GhostAnimation = new SpookFace(spriteSheet,80,80,100,300,10);
}

function draw() {
  
  background(220);
  textSize(30);
  text("Press Space",80,80);
  GhostAnimation.draw();
  WalkingAnimation.draw();
  WalkingAnimation2.draw();
  
}

function keyPressed(){
  WalkingAnimation.keyPressed();
  WalkingAnimation2.keyPressed();
  GhostAnimation.keyPressed();
}

function keyTyped(){
  GhostAnimation.keyTyped();
}

function keyReleased(){
  WalkingAnimation.keyReleased();
  WalkingAnimation2.keyReleased();
  
}

class WalkingDirection{
  constructor(spriteSheet,sw,sh,sx,sy,animationLength){
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.sx = sx;
    this.sy = sy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.face = 1;
  }
  draw(){
    if(this.moving === 0){
      this.currentFrame = 0;
      this.u = 0;
    } else if(frameCount % 6 === 0){
      this.currentFrame += 1;
    }
    
    push();
    scale(this.face,1);
    translate(this.sx * this.face,this.sy);
    image(this.spriteSheet,0,0,80,80,this.u * this.sw,this.v * this.sh,this.sw,this.sh);
    pop();
    this.u = this.currentFrame % this.animationLength;
    this.sx += this.moving;
  }

  keyPressed(){
    if(keyCode === RIGHT_ARROW){
      this.face = 1;
      this.moving = 1;
      this.currentFrame=1;
    }
    else if(keyCode === LEFT_ARROW){
      this.face = -1;
      this.moving = -1;
      this.currentFrame = 1;
    }
  }
  keyReleased(){
    if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
      this.moving = 0;
    }
  }
}

class SpookFace{
  constructor(spriteSheet,sw,sh,sx,sy,animationLength){
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.sx = sx;
    this.sy = sy;
    this.u = 0;
    this.v = 10;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = false;
    this.face = 1;
  }
  draw(){
    if(this.moving === false){
      this.currentFrame = 0;
      this.u = 0;
    } else if(frameCount % 6 === 0){
      this.currentFrame += 1;
    } else if(this.currentFrame > this.animationLength){
      this.moving = false;
    }
    
    push();
    scale(this.face,1);
    translate(this.sx * this.face,this.sy);
    image(this.spriteSheet,0,0,80,80,this.u * this.sw,this.v * this.sh,this.sw,this.sh);
    pop();
    this.u = this.currentFrame % this.animationLength;
    
  }

  keyTyped(){
    if(key === ' '){
      this.moving = true;
      this.currentFrame=1;
    }
    
  }
  keyPressed(){
    if(keyCode === RIGHT_ARROW){
      this.face = 1;
    }
    else if(keyCode === LEFT_ARROW){
      this.face = -1;
    }
  }
  
}