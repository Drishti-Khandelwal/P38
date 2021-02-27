//declaring variable names 
var trex, trexImage, edges;
var ground,groundImage;
var invisibleground;
var cloudImage;
var ob1Image;
var ob2Image;
var ob3Image;
var ob4Image;
var ob5Image;
var ob6Image;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacleGroup;
var cloudsGroup;
var scoreBoard= 0;
var trexcollid;
var restart,restartImage;
var gameover,gameoverImage;
var dieSound;
var jumpSound;
var cheackpointSound;
//uploading all animations and images
function preload(){
  trexImage =     loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png") ;
  ob1Image = loadImage("obstacle1.png");
  ob2Image = loadImage("obstacle2.png");
  ob3Image = loadImage("obstacle3.png");
  ob4Image = loadImage("obstacle4.png");
  ob5Image = loadImage("obstacle5.png");
  ob6Image = loadImage("obstacle6.png");
  trexcollid = loadAnimation("trex_collided.png");
  restartImage = loadImage("restart.png");
  gameoverImage = loadImage("go.png");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkpointSound = loadSound("checkPoint.mp3");
}


function setup(){
  createCanvas(600,200);
  obstacleGroup = new Group()
  cloudGroup = new Group()
  // creating trexSprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trexImage);
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider("Circle",10,0,50);
  
  //edges = createEdgeSprites();
  //creating ground Sprite 
  ground = createSprite(300,180,1200,20);
  ground.addImage("groundImage",groundImage);
  //creating invisible ground
  invisibleground = createSprite(300,190,1200,10) ;
  invisibleground.visible = false;
  //creating trexcollid aniamtion
    trex.addAnimation("trexcollid", trexcollid);
  //creating restart
  restart = createSprite(camera.position.x,100,20,20);
  restart.addImage("restartImage",restartImage);
  restart.scale = 0.5;
  //creating gameover
  gameover = createSprite(camera.position.x,40,20,20);
  gameover.addImage("gameoverImage",gameoverImage);
  gameover.scale = 0.5;

}


function draw(){
  //set background color 
  background("white");
  trex.collide(invisibleground);
 
  if(gameState===PLAY){
    // calling the functions
   obstacles(); 
     spawnclouds();
      //moving the ground 
   // ground.velocityX = -(2+scoreBoard/500);
   trex.velocityX= 5;
   camera.position.x= trex.x; 
 //reseting the ground 
  if( camera.position.x>ground.x+300){
    ground.x = camera.position.x;
  }
    //making the trex jump
  if(keyDown("space")&& trex.y>110){
  trex.velocityY = -11;
  jumpSound.play();
  }
     //adding gravity to trex 
  trex.velocityY = trex.velocityY+0.5;
    //displaying the score
    scoreBoard = scoreBoard+Math.round(getFrameRate()/60);
    text('score:'+scoreBoard,camera.position.x+100,40);
    
   
  if(trex.isTouching(obstacleGroup)){
    gameState = END;
    dieSound.play();
  } 
   if(scoreBoard%100===0 && scoreBoard>0) {
   checkpointSound.play();   
      }
    gameover.visible = false;
    restart.visible = false;
  }
  
  else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.velocityX=0;
    trex.y = 160;
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("trexcollid",trexcollid);
    gameover.visible = true;
    restart.visible = true;
    gameover.x =camera.position.x
    restart.x =camera.position.x
    //restarting the game 
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  console.log(getFrameRate());
  drawSprites();
}
 function spawnclouds(){
   if(frameCount%100===0) {
     
   var cloud = createSprite(camera.position.x+300,20,30,10);
   cloud.velocityX = -4;
   cloud.addImage("cloud.png",cloudImage);
   cloud.y = Math.round(random(10,150));
   cloud.depth = trex.depth
   trex.depth = trex.depth+1;
    cloud.lifetime = 150; 
     cloudGroup.add(cloud);
   }
   
 }
 function obstacles(){ 
   if(frameCount%100===0){
  var cactus = createSprite(camera.position.x+350,170,30,10);
   cactus.velocityX = -(4+scoreBoard/2000);
    var ran = Math.round(random(1,6));
     switch(ran){
       case 1: cactus.addImage("ostacle1.png",ob1Image);break;
       case 2: cactus.addImage("obstacle2.ong",ob2Image);break;
       case 3: cactus.addImage("obstacle3.png",ob3Image);break;
       case 4: cactus.addImage("obstacle4.png",ob4Image);break;
       case 5: cactus.addImage("obstacle5.png",ob5Image);break;
       case 6: cactus.addImage("obstacle6.png",ob6Image);break; 
       default : break;
     }
     cactus.scale = 0.6;
    // cactus.lifetime = 200;
     obstacleGroup.add(cactus);
   }
   
   
 }
function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running",trexImage);
  scoreBoard = 0;
}