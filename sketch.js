var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var invisiable,ground;
var survivalTime=0;
var gameState;
var PLAY,END;
var end;
var survialTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(500,500);
   
  PLAY=1;
  gameState=PLAY;
  END=0;
  
  foodGroup=new Group();
  obstclesGroup=new Group();
  
  monkey=createSprite(70,370,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(250,405,1000,10);
  ground.x=ground.width/2;
  
  invisible=createSprite(250,407,1000,10);
  invisible.x=ground.width/2;
}


function draw() {
   background("white");
    
  if (gameState===PLAY){
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(invisible.x<0){
      invisible.x=invisible.width/2;
    }
    invisible.velocityX=-5;
   if(keyDown("space") && monkey.isTouching(ground)){
     monkey.velocityY=-20;
   }
  
  score=Math.round(frameCount/3);
    survivalTime=Math.ceil(frameCount/frameRate());
    ground.velocityX=-(5+2*score/100);
    
    if (monkey.isTouching(foodGroup));
    foodGroup.destroyEach();
  
  
  Food();
  Obstacle();
     
  if (monkey.isTouching(obstclesGroup)){
    gameState=END;
  }
  
  }
  else if(gameState===END){
          ground.velocityX=0;
    invisible.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
          }
  
  monkey.velocityY=monkey.velocityY+0.9;
  
  monkey.collide(invisible);
  
  stroke("black");
  textSize(20);
  fill("rad");
  text("score"+score,400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("survialTime:"+survialTime,100,50);

  drawSprites();
}

function Food(){
  if(frameCount%80===0){
    var banana=createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX=-(5+2*score/100);
    banana.y=Math.round(random(120,200));
    banana.scale=0.1;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400);
  }
}

function Obstacle(){
  if(frameCount%300===0){
   var obstacle=createSprite(500,365,23,32);
   obstacle.velocityX=-(5+2*score/100);
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.scale=0.2;
   obstacleGroup.add(obstacle);
   obstacleGroup.setLifetimeEach(100);
  
  obstacle.setCollider("circle",0,0,200);
  }
  
  }



