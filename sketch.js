var gameState = "fight";

var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var bullet, bulletImg;
var rand,zimg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var bulletGroup;
var bullets = 100;
var gameOver, gameOverImg;
var life = 3;
var score = 0;

var lose, winning, explosionSound;

function preload(){

    shooterImg = loadImage("Assets/shooter_2.png");
    shooter_shooting = loadImage("Assets/shooter_3.png");

    heart1Img = loadImage("Assets/heart_1.png");
    heart2Img = loadImage("Assets/heart_2.png");
    heart3Img = loadImage("Assets/heart_3.png");

    zombieImg1 = loadImage("Assets/zombie_1.jpg");
    zombieImg2 = loadImage("Assets/zombie_2.jpg");
    zombieImg3 = loadImage("Assets/zombie_3.jpg");
    zombieImg4 = loadImage("Assets/zombie_4.jpg");
    zombieImg5 = loadImage("Assets/zombie_5.jpg");
    zombieImg6 = loadImage("Assets/zombie_6.jpg");
    zombieImg7 = loadImage("Assets/zombie_7.jpg");
    zombieImg8 = loadImage("Assets/zombie_8.jpg");
    zombieImg9 = loadImage("Assets/zombie_9.jpg");
    zombieImg10 = loadImage("Assets/zombie_10.jpg");
    zombieImg11 = loadImage("Assets/zombie_11.jpg");
    zombieImg12 = loadImage("Assets/zombie_12.jpg");
    zombieImg13 = loadImage("Assets/zombie_13.jpg");
    zombieImg14 = loadImage("Assets/zombie_14.jpg");
    zombieImg15 = loadImage("Assets/zombie_15.jpg");
    zombieImg16 = loadImage("Assets/zombie_16.jpg");
    zombieImg17 = loadImage("Assets/zombie_17.jpg");
    zombieImg18 = loadImage("Assets/zombie_18.jpg");
    zombieImg19 = loadImage("Assets/zombie_19.jpg");
    zombieImg20 = loadImage("Assets/zombie_20.jpg");

    bulletImg = loadImage("Assets/bullet.png");

    gameOverImg = loadImage("Assets/gameover.jpg");

    bgImg = loadImage("Assets/bg.jpeg");

    lose = loadSound("Assets/lose.mp3");
    win = loadSound("Assets/win.mp3");
    explosionSound = loadSound("Assets/explosion.mp3");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    //add the background sprites of the image
    bg = createSprite(displayWidth/2-20, displayHeight/2-40, 20, 20);
    bg.addImage(bgImg);
    bg.scale = 1.1;

    heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false;
    heart1.addImage("heart1", heart1Img)
    heart1.scale = 0.4;

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false;
    heart2.addImage("heart2", heart2Img)
    heart2.scale = 0.4;

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.visible = false;
    heart3.addImage("heart3", heart3Img)
    heart3.scale = 0.4;




    //creating player sprite
    player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
    player.addImage(shooterImg);
    player.scale = 0.4;
    player.debug = true;
    player.setCollider("rectangle",0,0,300,300);

    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw() {

    background(0);
    if(gameState == "fight")
    {
        
        if(life===3){
            heart3.visible = true
            heart1.visible = false
            heart2.visible = false
          }
          if(life===2){
            heart2.visible = true
            heart1.visible = false
            heart3.visible = false
          }
          if(life===1){
            heart1.visible = true
            heart3.visible = false
            heart2.visible = false
          }
        
          //go to gameState "lost" when 0 lives are remaining
          if(life===0){
            gameState = "lost"
            
          }
        
        if(score == 6){
            gameState = "win"
            win.play();
        }

    //for moving the player up or down when we press the spacebar key
    if(keyDown("UP_ARROW")){
    player.y = player.y - 30
    }

    if(keyDown("DOWN_ARROW")){
    player.y = player.y + 30    
    }

    if(keyDown("LEFT_ARROW")){
    player.x = player.x - 30
    }

    if(keyDown("RIGHT_ARROW")){
    player.x = player.x + 30;
    }

    //when space bar key is pressed the shooter image should change and shoot the bullet
    if(keyWentDown("space")){
    player.addImage(shooter_shooting)

    bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.addImage(bulletImg);
    bullet.scale=0.04;
    bullet.velocityX = 10;
    bulletGroup.add(bullet);
    bullets = bullets - 1;
    console.log(bullets);
    explosionSound.play();
    }

    //player should go back into the positon again after space bar is pressed again
    else if(keyWentUp("space")){
    player.addImage(shooterImg)
    }

    if(bullets == 0){
        gameState = "bullet";
    }
    
    zombieSpawn();
    //destroy the zombie when the bullet touches it
    if(zombieGroup.isTouching(bulletGroup)){
        for(var i=0;i<zombieGroup.length;i++)
        {
            if(zombieGroup[i].isTouching(bulletGroup))
            {
                zombieGroup[i].destroy()
                bulletGroup.destroyEach()
                score = score + 2;
                explosionSound.play();
            }
        }
    }

    //destroy the zombie when player touches it
    if(zombieGroup.isTouching(player)){
        for(var i=0; i < zombieGroup.length;i++)
        {
            if(zombieGroup[i].isTouching(player))
            {
                zombieGroup[i].destroy()
                life = life -1;
        }
    }
}

    }
drawSprites();

    textSize(20);
    fill("white");
    text("SCORE = " + score, displayWidth - 200, displayHeight / 2 - 220);
    text("BULLETS = " + bullets, displayWidth - 210, displayHeight / 2 - 250);
    text("LIVES = " + life, displayWidth - 200, displayHeight / 2 -280);

   if(gameState == "bullet"){
       textSize(50);
       fill("yellow");
       text("YOU RAN OUT OF BULLETS", 350, 305);
       zombieGroup.destroyEach();
       player.destroyEach();
       bulletGroup.destroyEach();
   }

   if(gameState == "lost"){
       fill("red");
       textSize(50);
       text("YOU LOST", 400, 400);
       zombieGroup.destroyEach();
       player.destroy();
   }

   if(gameState == "win"){
    fill("blue");
    textSize(50);
    text("YOU WON", 400, 400);
    zombieGroup.destroyEach();
    player.destroy();
}

}

function zombieSpawn(){
if(frameCount % 60 ==0)
{
     zombie = createSprite(random(500,1100),random(100,500),40,4)
     zombie.velocityX = -3;
     zombie.scale=0.5
     rand = Math.round(random(1,20));
switch(rand)
{
    case 1: 
    zombie.addImage( zombieImg1);
    break;

    case 2: 
    zombie.addImage( zombieImg2);
    break;

    case 3: 
    zombie.addImage( zombieImg3);
    break;

    case 4: 
    zombie.addImage( zombieImg4);
    break;

    case 5: 
    zombie.addImage( zombieImg5);
    break;
    
    case 6: 
    zombie.addImage( zombieImg6);
    break;

    case 7: 
    zombie.addImage( zombieImg7);
    break;
    
    case 8: 
    zombie.addImage( zombieImg8);
    break;
    
    case 9: 
    zombie.addImage( zombieImg9);
    break;
    
    case 10: 
    zombie.addImage( zombieImg10);
    break;

    case 11: 
    zombie.addImage( zombieImg11);
    break;
    
    case 12: 
    zombie.addImage( zombieImg12);
    break;
    
    case 13: 
    zombie.addImage( zombieImg13);
    break;

    case 14: 
    zombie.addImage( zombieImg14);
    break;

    case 15: 
    zombie.addImage( zombieImg15);
    break;

    case 16: 
    zombie.addImage( zombieImg16);
    break;
    
    case 17: 
    zombie.addImage( zombieImg17);
    break;

    case 18: 
    zombie.addImage( zombieImg18);
    break;

    case 19: 
    zombie.addImage( zombieImg19);
    break;

    case 20: 
    zombie.addImage( zombieImg20);
    break;
    

    default: break;

      
}// end of switch case
 
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
}


    
}