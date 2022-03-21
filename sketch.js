//Coloquei um bot pra jogar, mas só alterar alguns comandos que você com o mouse pode jogar também :
var END = 0;
var PLAY = 1;
var gamestate = PLAY;

var path,boy, leftBoundary,rightBoundary;
var pathImg,menino, paraImage;
var i;
var coin, coinImage;
var garoto;
var fundo;
var parede1, parede2;
var parede;
var power;
var poder;
var bomb;
var bomba;

var energetico, coinPremio;

function preload(){
    pathImg = loadImage("path.png");
    coinImage = loadImage("coin.png");
    menino = loadAnimation("Runner-1.png","Runner-2.png");
    paraImage = loadImage("Runner-1.png");
    power = loadImage("energyDrink.png");
    bomb = loadImage("bomb.png")
}

function setup(){
    energetico = 0;
    coinPremio = 0;
    createCanvas(400,420)
    edges = createEdgeSprites();

    fundo = createSprite(200,200, 10, 10);
    fundo.addImage(pathImg);
    fundo.scale = "1.33";
    fundo.velocityY = -4;


    garoto = createSprite(200,344);
    garoto.addAnimation("running",menino);
    garoto.scale = 0.09;



    parede1 = createSprite(59, 200, 22, 450);
    parede2 = createSprite(340, 200, 22, 450);
    parede1.visible = false;
    parede2.visible = false;

    poder = createSprite(random(40, 300), 59);
    poder.addImage(power);
    poder.scale = 0.13;

    bomba = createSprite(random(200, 350), 59);
    bomba.addImage(bomb);
    bomba.scale = 0.13;

    coin = createSprite(random(220, 350), 59);
    coin.addImage(coinImage);
    coin.scale = 0.47;

    bomba.setCollider("circle", 0, 0, 20);
    poder.setCollider("circle", 0, 0, 20);
    coin.setCollider("circle", 0, 0, 20);

}

function draw(){
    background(0);
    drawSprites();

    textStyle(BOLD);
    textSize(30);
    text("Coin: " + coinPremio, 250,50);
    text("Energetic: " + energetico, 50, 50);

    if (gamestate === PLAY){

        poder.velocityY = random(2, 5);
        bomba.velocityY = random(2, 4);
        coin.velocityY = random(2, 5);

        if(fundo.y < 0 ){
            fundo.y = fundo.height/2;
        }

        if(garoto.isTouching(poder)){
            poder.x = 800;
            poder.visible = false;
            energetico = energetico + 1;
        }
        if(garoto.isTouching(bomba)){
            bomba.x = 800;
            bomba.visible = false;
            gamestate = END;
    
        }
        if(garoto.isTouching(coin)) {
            coin.x = 800;
            coin.visible = false;
            coinPremio = coinPremio + 1;
            
        }


        if(poder.y > 700){
            poder.x = random(20,350);
            poder.y = 59;
            poder.visible = true;
            poder.velocityY = random(2, 5);
        }

        if(coin.y > 590){
            coin.x = random(20,350);
            coin.y = 59;
            coin.visible = true;
            coin.velocityY = random(2, 5);
        
        }

        if(bomba.y > 750){
            bomba.x = random(200,350);
            bomba.y = 59;
            bomba.visible = true;
            bomba.velocityY = random(2,4);
        }
}

    if (gamestate === END) {
        bomba.destroy();
        poder.destroy();
        fundo.velocityY = 0;
    
        textSize(49);
        text("GAME OVER", 55, 150)
        text("Energetics: " + energetico, 45, 230)
        text("Coins: " + coinPremio, 110,285);
        

    }


    garoto.x = World.mouseX;

    garoto.collide(edges[3]);
    console.log(fundo.y);
}