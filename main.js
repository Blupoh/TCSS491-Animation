var AM = new AssetManager();
var gameEngine = new GameEngine();
var ctx;
//var shots = [];

function Animation(spriteSheet, framePos, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    
	this.framePos = framePos;
	
	this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameDuration = frameDuration;
	this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = this.framePos[0];
    var yindex = this.framePos[1];
	// xindex += frame % this.sheetWidth;
    // yindex += Math.floor(frame / this.sheetWidth);

    // ctx.drawImage(this.spriteSheet,
                 // xindex * this.frameWidth, yindex ,  // source from sheet
                 // this.frameWidth, this.frameHeight,
                 // x, y,
                 // this.frameWidth * this.scale,
                 // this.frameHeight * this.scale);
    xindex += frame * this.frameWidth;
    yindex += Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex, yindex,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.drawFrame2 = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 (this.frameWidth * (this.framePos[0] % this.sheetWidth)) + xindex * this.frameWidth
				 ,(this.frameHeight * (this.framePos[1] / this.sheetWidth)) + yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
	//this.animation = new Animation(spritesheet, [0,0] , 640, 467, 1, 1, 1, true, 2);
    this.x = 0;
    this.y = 0;
	//this.speed = 10;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y, 800, 667 );
};

Background.prototype.update = function () {
};

function shoot() {
    //gameEngine.addEntity(new Shot(gameEngine, AM.getAsset("./img/raid.png")));
	var shot = new Shot(gameEngine, AM.getAsset("./img/raid.png"));
	//shot.x = 300;
	//shot.y = 300;
	shot.speed = 100;
	gameEngine.addEntity(shot);
	//shots.push(shot);
	console.log('shot');
}
	
function Shot(game, spritesheet) {
this.animation = new Animation(spritesheet, [440,125] , 25, 25, 1, .01, 1, false, 1);
	this.ctx = game.ctx;
	//this.speed = 100;
	this.x = 400;
	this.y = 400;
	this.game = game;
	this.ctx = game.ctx;
	//Entity.call(this,game,0,250);
}


Shot.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);//this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y
}

Shot.prototype.update = function () {
    
	if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.y -= this.game.clockTick * this.speed;
    if (this.y < 0) this.removeFromeWorld = true;
	Entity.prototype.update.call(this);
}



// function MushroomDude(game, spritesheet) {
    // this.animation = new Animation(spritesheet, [0,0] ,189, 230, 5, 0.10, 14, true, 1);
    // this.x = 0;
    // this.y = 0;
    // this.speed = 100;
    // this.game = game;
    // this.ctx = game.ctx;
// }

// MushroomDude.prototype.draw = function () {
    // this.animation.drawFrame2(this.game.clockTick, this.ctx, this.x, this.y);
// }

// MushroomDude.prototype.update = function () {
    // if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        // this.x += this.game.clockTick * this.speed;
    // if (this.x > 800) this.x = -230;
// }

function Fighter(game, spritesheet) {
	this.animation = new Animation(spritesheet, [-1,30] ,34, 45, 11, 0.50, 11, true, 1);
	this.x = 400;
    this.y = 400;
    this.speed = 50;
    this.game = game;
    this.ctx = game.ctx;
}

////state 0 - l0, 5 is netrual 
////5 x 34

Fighter.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);//this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y
}

Fighter.prototype.update = function () {
    

}

function Thruster(game, spritesheet) {
	this.animation = new Animation(spritesheet, [19,100] , 22, 10, 4, .10, 4, true, 1);
	this.x = 405;
    this.y = 440;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Thruster.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);//this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y
}

Thruster.prototype.update = function () {
	
	

}

function Thruster2(game, spritesheet) {
	this.animation = new Animation(spritesheet, [19,100] , 22, 10, 4, .10, 4, true, 1);
	this.x = 416;
    this.y = 440;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Thruster2.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);//this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y
}

Thruster2.prototype.update = function () {


}

function Shock(game, spritesheet) {
	this.animation = new Animation(spritesheet, [0,0] , 256, 256, 4, .10, 9, true, 1);
	this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Shock.prototype.draw = function () {
    this.animation.drawFrame2(this.game.clockTick, this.ctx, this.x, this.y);//this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y
}

Shock.prototype.update = function () {


}



//AM.queueDownload("./img/mushroomdude.png");

AM.queueDownload("./img/coast.png");
AM.queueDownload("./img/raid.png");
AM.queueDownload("./img/bomb1.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/coast.png")));
    //gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/mushroomdude.png")));
	gameEngine.addEntity(new Shock(gameEngine, AM.getAsset("./img/bomb1.png")));
    gameEngine.addEntity(new Shot(gameEngine, AM.getAsset("./img/raid.png")));
	
	gameEngine.addEntity(new Thruster(gameEngine, AM.getAsset("./img/raid.png")));
	gameEngine.addEntity(new Thruster2(gameEngine, AM.getAsset("./img/raid.png")));
	gameEngine.addEntity(new Fighter(gameEngine, AM.getAsset("./img/raid.png")));
	
	//shoot();
	//Shot = gameEngine.entities;
    console.log("All Done!");
});