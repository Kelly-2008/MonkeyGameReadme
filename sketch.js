var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkeysitting;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime, highScore;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  //Creating monkey
  monkey = createSprite(80,315,15,15);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  //Creating ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.shapeColor = ("Brown");

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score=0
  survivalTime=0
  highScore=0
}


function draw() {
  background("Green")
  
  stroke("black");
  textSize(15);
  fill("white");
  text("Score:" + score,15,35);
  
  
  stroke("black")
  textSize(15);
  fill("white");
  text("Survival Time:" + survivalTime,250,50);
  survivalTime = Math.ceil(frameCount/frameRate());
  
  stroke("black");
  textSize(15);
  fill("white");
  text("High Score:" + highScore,15,50);
  
  
  if(gameState == PLAY){
      ground.x=ground.width/2;
    
    

    if(keyDown("space")&&monkey.y >= 235) {
    monkey.velocityY = -12; 
    }
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END
  }
  
  monkey.velocityY = monkey.velocityY + 0.8; 
  
  monkey.collide(ground);  
  }
  

  if(gameState == END){
     monkey.destroy();
     FoodGroup.destroyEach(food);
     obstacleGroup.destroyEach();
     survivalTime = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);  
    
        if(score > highScore){
        highScore = score;
      }
    stroke("black");
    textSize(25);
    fill("red");
    text("Game Over", 150, 200);
    
    stroke("black");
    textSize(25);
    fill("beige");
    text("Press 'r' to restart", 125,230);
    
     if (keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey = createSprite(80,315,15,15);
      monkey.addAnimation("moving",monkey_running);
      monkey.scale = 0.1;
      score = 0;
      survivalTime  = 0;
      survivalTime = Math.ceil(frameCount/frameRate());
      gameState = PLAY; 
    }
    
     }
  
 
  
  food();
  stone();
  
  drawSprites();
}

function food() {
  
  if (frameCount %100 === 0) {
    banana = createSprite(450,350,30,15);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    
    banana.y = Math.round(random(130,230));
    
    banana.velocityX = -3;
    banana.lifetime = 250;
    
    FoodGroup.add(banana);
  }
}

function stone() {
  
 if (frameCount % 250 === 0){
    obstacle = createSprite(450,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
   
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
   
  }
}


