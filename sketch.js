var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;
var survivalTime = 0;

function preload(){
  backImage=loadImage("images/bg.jpg");
  player_running = loadAnimation(
  "images/M01.png",
  "images/M02.png",
  "images/M03.png",
  "images/M04.png",
  "images/M05.png",
  "images/M06.png",
  "images/M07.png",
  "images/M08.png",
  "images/M09.png",
  "images/M10.png");

  bananaimg = loadImage("images/bn.png")
  stoneimg = loadImage("images/s.png")
  gmi = loadImage("images/go.png")


}

function setup() {
  createCanvas(800,400);

  textSize()
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FruitGroup = new Group();
  StoneGroup = new Group();
  

  gameover = createSprite(400,200,50,50);
  gameover.addImage(gmi)



  
}

function draw() { 
  background("images/bg.png");


  survivalTime = survivalTime + Math.round(getFrameRate() / 60);
  if(gameState===PLAY){
     
    gameover.visible = false


    
   
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  backgr.velocityX = -(4+survivalTime*2/100)
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);


    spawnFoods();
    spawnStones();

    if(FruitGroup.isTouching(player)){
      score+=2
      FruitGroup.destroyEach();
      player.scale+=0.1;

    }
    if(StoneGroup.isTouching(player)){
      gameState = END;

    }
  }

  




  
drawSprites();
  
 if(gameState === END){

  backgr.velocityX = 0;
  
  
  FruitGroup.destroyEach();
  StoneGroup.destroyEach();
      
  
     textSize(30);
     fill(255);
     text("GameOver!! and press r to restart the game",150,300);

     player.visible = false

     survivalTime = 0;

     if(keyDown("r")){
       reset();
     }
      
  
  }
  


  
  textSize(20);
  fill("red");
  stroke("yellow");
  strokeWeight("5");
  text("survival Time :  " + survivalTime, 550, 50);
  text("Score  :  " + score, 25, 50);

  
}

function spawnFoods(){
  if(frameCount %80 === 0){
    var banana = createSprite(650,250,40,10);
    banana.y = random(120,200);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.addImage(bananaimg)

    banana.lifetime = 300;
    player.depth = banana.depth+1;
    FruitGroup.add(banana)

  }

}

function spawnStones(){
  if(frameCount %99 === 0){
    var stone = createSprite(800,340,40,10);

    stone.scale = 0.2;
    stone.velocityX = -6;
    stone.addImage(stoneimg)
    stone.setCollider("circle", 0, 0, 180);
    stone.lifetime = 125;
    player.depth = stone.depth+1;
    StoneGroup.add(stone)
  }
}



function reset() {
  FruitGroup.destroyEach();
  StoneGroup.destroyEach();
  player.visible = true
  backgr.velocityX = -4
  score = 0;
  survivalTime = 0;
  gameState = PLAY;
}


