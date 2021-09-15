var bottle1,bottlerun,background1,background2,invisible,bin1,bin2,bin3,bin4,bottledie;
 var blueGroup,binGroup,gameState="play"
 var bird,birdImg,kush,kush1,kush1Group,score,cloud,cloud1
function preload() {
bottlerun=loadAnimation("bottle1.png","bottle2.png")
bottledie=loadAnimation("bottle3.png")
background1=loadImage("background3.png") 
birdImg=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png")
cloud1=loadImage("cloud1.png")
bin1=loadImage("bin 1.png")
bin2=loadImage("bin2.png")
bin3=loadImage("bin3.png")
bin4=loadImage("bin4.png")

}
function setup() {
  createCanvas(1200,800);
background2=createSprite(600,325,20,20)
background2.addImage(background1)
background2.scale=3.2
bottle1=createSprite(75,675,20,20)
bottle1.addAnimation("running",bottlerun)
bottle1.addAnimation("die",bottledie)
cloud=createSprite(1100,150,20,20)
cloud.addImage(cloud1)
bird=createSprite(1100,150,20,20)
bird.addAnimation("running",birdImg)

bird.scale=0.6
cloud.scale=0.4
bottle1.debug=true
kush=createSprite(-400,150,20,20)

 bottle1.scale=0.050

 invisible=createSprite(400,750,1000,20)
 invisible.visible=false
 blueGroup=new Group()
 binGroup=new Group()
kush1Group=new Group()
 score=0
}

function draw() {
  background("lightblue");
  console.log(gameState)
  if(gameState==="play"){
    background2.velocityX=-6
    if(background2.x<0){
      background2.x=600
  
    }
     
  bird.velocityX=-8
  cloud.velocityX=-6
  if(keyDown("space")&& bottle1.y >= 450) {
    bottle1.velocityY = -20;
    
    }
    
    background2.velocityX = -(5 + 2* score/50)

    bottle1.velocityY = bottle1.velocityY + 0.8
    textSize(25)
    text("Score: "+ score, 500,50);
    var rand = Math.round(random(1,2));
    if(rand===1){
  
    
    spawnbluebins()
    }
    else if(rand===2){
      spawnbins()
    }
   if(bottle1.isTouching(binGroup)){
gameState="end"
   }
  if(bottle1.isTouching(blueGroup)){
    bottle1.velocityY=0
  }
  if(bird.isTouching(kush)){
  bird.x=1400
  bird.y=150
  }
  if(cloud.isTouching(kush)){
    cloud.x=1400
    cloud.y=150
    }
  score = score + Math.round(getFrameRate()/60);
  if (bottle1.isTouching(kush1Group)) {
    gameState="end"
  }

  }
  if(gameState==="end"){
    background2.velocityX=0
    kush1Group.setVelocityXEach(0)
bottle1.changeAnimation("die",bottledie)
fill("red")
textSize(100)
text("game over",600,400)
binGroup.destroyEach()
blueGroup.destroyEach()

  }

  bottle1.collide(invisible)
 
  drawSprites();
}
function spawnbins(){
  if (frameCount % 100 === 0){
    var bin = createSprite(1200,650,10,40);
    bin.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: bin.addImage(bin1);
               break;
       case 2: bin.addImage(bin4);
               break;
       case 3: bin.addImage(bin3);
               break;
    
       default: break;
     }
     bottle1.depth=bin.depth+1
     //assign scale and lifetime to the obstacle           
     bin.scale = 0.8;
     bin.lifetime = 200;
    binGroup.add(bin)
    //add each obstacle to the group
     //obstaclesGroup.add(obstacle);
  }
 
}
function spawnbluebins(){
  if (frameCount % 100 === 0){
    var binb = createSprite(1200,650,10,40);
    var kush1 =createSprite(1150,650,10,40)
    binb.addImage(bin2)
    binb.velocityX = -(6 + score/100);
    kush1.velocityX= -6
     //generate random obstacles
   kush1.shapeColor="red"
     binb.debug=true
    binb.setCollider("rectangle",0,0,binb.width,50)
    bottle1.depth=binb.depth+1
    kush1.visible=false
     //assign scale and lifetime to the obstacle           
   binb.scale = 0.8;
     binb.lifetime = 200;
     blueGroup.add(binb)
     kush1Group.add(kush1)
    }
   
    //add each obstacle to the group
     //obstaclesGroup.add(obstacle);
  }
 


