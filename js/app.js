var isDead=0;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    this.x = 0;
    // specifiy the range of enemies in y-axis
    this.y =Math.random() * (245-50) + 50;
    //ref :https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    
    // we've provided one for you to get started
   this.movement = Math.random() * 300; 
    
    // increse the speed of enemy when the player reach level 10+ 
      if (level >= 10 ){
        this.movement = Math.random() * 500; }
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
   
    this.sprite = 'images/enemy-bug.png';
     
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * this.movement);
    
    // to let enemies start form left-side if they grater than canvas.width
     if (this.x >= 505) {this.x=0;} 
    
 // Check for collision
    
       if (player.y + 130 >= enemy.y + 90
        && player.y + 75 <= enemy.y + 130
        && player.x + 25 <= enemy.x + 85
        && player.x + 75 >= enemy.x + 10) {
        player.x = 200;
        player.y = 400;
      
            isDead++;
       }
    
    // check if player win or not 
       if (player.y +65 <= 0) {        
        player.x = 200;
        player.y = 400;
    score++;
    level++;
       enemyRefresh(level);
  }
    
};

 
// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.x=200 ;
    this.y=400;
    this.movement=100;
    
    this.sprite = 'images/char-princess-girl.png';
};
Player.prototype.update= function(){
   
 // to ensure Player can not move off screen.
      if (player.y > 400) {
        player.y = 400;
    }
    if (player.x > 400) {
        player.x = 400;
    }
    if (player.x < 1) {
        player.x = 1;
    }
    if (player.y < 1) {
        player.y = 1;
    }
    

    
    

};

Player.prototype.render= function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   
    ScoreANDLevel(score,level);                       
    
};

Player.prototype.handleInput = function(key) {
    if (key == 'up')
        player.y -= player.movement - 10;
    if (key == 'down') 
        player.y += player.movement - 10;
    
    if (key == 'left') 
        player.x -= player.movement;
    
    if (key == 'right') 
        player.x += player.movement;
    
  
};
//--------------------------- Functions --------------------------

var  ScoreANDLevel = function(S,L){
    
    
    // display score, level and dead times  
       ctx.font="30px serif";
       ctx.strokeText('Score: ' + S
        + '  - ' + ' Level: ' + L + ' -  Dead:'+ isDead, 70,30);
    
 
};

/*var winner = function (){
       if (player.y +65 <= 0) {        
        player.x = 200;
        player.y = 400;
    score++;
    level++;
       enemyRefresh(level);
  }
    
};*/

/*
   var isCollision = function(E) {
        // check for collision between enemy and player
      if (
        
         player.y + 75 <= E.y + 150
        && player.x + 75 >= E.x + 10
        && player.x + 20 <= E.x + 90) {
        player.x = 200;
        player.y = 400;
          return true; 
    }
    
 return false;
    
    
};*/

var enemyRefresh = function (level){
     allEnemies.length=0; // to clean the array
    if (level > 6)
        {   
        level= 6; }// the number of enemy will not increase if player reach lv69
  
      for (var i = 0; i <= level ; i++) {
        var enemy = new Enemy();
        
        allEnemies.push(enemy);
}};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies= [];
// Place the player object in a variable called player

var player= new Player();
var enemy = new Enemy(); 

var score = 0;
var level = 1; 
allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
2