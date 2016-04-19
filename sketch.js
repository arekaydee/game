// Your game will go here

// For performance reasons, use a small canvas size for your project (< 500 px)
var player;
var playerColor = 0;
var trashSprites;
var score = 0;
var lives = 3;
var styroSprites;
var timerTrash;
var timerStyro;
var trash;



function setup(){
  createCanvas(400,400);

  timerTrash = setInterval(createTrash,2000);
  timerStyro = setInterval(createStyro,2000);

  player = createSprite(width/2, height - 50, 40,40);
  player.shapeColor = color(0,playerColor,0);

  trashSprites = new Group();
  styroSprites = new Group();

  player.draw = function(){
    fill(100);
    quad(-10,-40,0,0,20,0,30,-40);
    strokeWeight(2);
    stroke(75);
    line(-7,-36,2,-2);//I swear I tried to make these with a forLoop,
    line(-3,-36,4,-2);//but it made the program crash!
    line(1,-36,6,-2);
    line(5,-36,8,-2);
    line(9,-36,10,-2);
    line(13,-36,12,-2);
    line(17,-36,14,-2);
    line(21,-36,16,-2);
    line(25,-36,18,-2);
  }

  // trash.draw = function(){
  //   fill(0);
  //   ellipse(0,0,50,50);
  // }


}

function draw(){
  background(200);
  fill("white");
  textAlign(RIGHT);
  text("Score: "+score,375,50);
  text("Lives: "+lives,375,72);
  drawSprites();


  if(keyIsPressed){
    if(keyCode == LEFT_ARROW){
      player.setVelocity(-3,0);
    }
    if(keyCode == RIGHT_ARROW){
      player.setVelocity(3,0);
    }
  } else{
    player.setVelocity(0,0);
  }

  if(lives < 0){
    window.clearInterval(timerTrash);
    window.clearInterval(timerStyro);
    // background("black");
    textSize(48);
    textAlign(CENTER);
    fill("white");
    text("Death \n by \n Consumption!", width/2,150);
  }


  player.overlap(trashSprites, eat);
  player.overlap(styroSprites, die);



}



function createTrash(){
  for(var i = 0; i < 10; i++){
    var trash = createSprite(random(0,width),random(-height,0),5,20);
    trash.shapeColor = color(100);
    trash.setVelocity(0,4);
    trash.life = 300;
    trashSprites.add(trash);
  }
}

function createStyro(){
  for(var i = 0; i < 3; i++){
    var styro = createSprite(random(0,width),random(-height,0),5,20);
    styro.shapeColor = color(0,255,0);
    styro.setVelocity(0,3);
    styro.life = 300;
    styroSprites.add(styro);
  }
}


function eat(spriteA, spriteB){
  spriteB.remove();
  score = score + 1;
}

function die(spriteA, spriteB){
  spriteB.remove();
  playerColor = playerColor + 10;
  lives--;
}
