function startGame() {
    gameArea.start();
  }

  const asteroids = [];
  const laserArr = [];

  const gameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    y: 0,
    speed: -2,
  
    start() {
      this.canvas.width = 1000;
      this.canvas.height = 1000;
      this.context = this.canvas.getContext('2d');
      document
        .getElementById('game-board')
        .insertBefore(
          this.canvas,
          document.getElementById('game-board').childNodes[0],
        );
      
      this.interval = setInterval(updateGame, 15);
    },
  
    
    drawBoard() {
      const starBackground = document.getElementById('background');
      gameArea.context.drawImage(starBackground, 0, this.y, 1000, 1000);
  
      if (this.speed < 0) {
        gameArea.context.drawImage(
          starBackground,
          0,
          this.y - this.canvas.height,
          1000,
          1000,
        );
      }
    },
    
    drawScore() {
     
      this.context.font = ' 20px spaceFont';
      this.context.fillStyle = 'white';
      this.context.fillText('Score: ', 40, 50);
    },
  
  
    moveBackground() {
      this.y -= this.speed;
      this.y %= gameArea.canvas.height;
    },
  
    
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  };
  

  class SpaceShip {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
 
      this.speedX = 0;
      this.speedY = 0;
      this.ship = document.getElementById('spaceship');
      this.fire = document.getElementById('fire');
      this.thrust = false;
    }
  
    
    drawSpaceship() {
      gameArea.context.drawImage(
        this.ship,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  
   
    drawFire() {
      if (this.thrust === true) {
        gameArea.context.drawImage(this.fire, this.x + 23, this.y + 65, 35, 40);
        gameArea.context.drawImage(this.fire, this.x + 13, this.y + 65, 35, 40);
      }
    }
  
    
    newPos() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }
  
  
  const player = new SpaceShip(70, 80, 460, 700);
  

  class Asteroids {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }
  
    drawAsteroid() {
      const asteroid1 = document.getElementById('asteroid1');
  
      gameArea.context.drawImage(
        asteroid1,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }
  
  // cria os asteroid em posições aleatórias no eixo x
  function createAsteroids() {
    for (let i = 0; i < asteroids.length; i += 1) {
      asteroids[i].y += 0.5;
      asteroids[i].drawAsteroid();
    }
    gameArea.frames += 0.5;
    if (gameArea.frames % 160 === 0) {
      const y = 0;
      const x = Math.floor(Math.random() * gameArea.canvas.width);
      asteroids.push(new Asteroids(40, 40, x, y));
    }
  }
  

  
  class Laser {
    constructor(x, y) {
      this.x = x + 26;
      this.y = y - 40;
      this.shoot = true;
      this.laser = document.getElementById('laser');
    }
  
    drawLaser() {
      gameArea.context.drawImage(this.laser, this.x, this.y, 15, 25);
    }
  
   
    newPosLaser() {
      for (let i = 0; i < laserArr.length; i += 1) {
        laserArr[i].y -= 3;
      }
    }
  }
  
  const lasers = new Laser();
  
  function shootLaser() {
    if (lasers.shoot === true) {
      laserArr.push(new Laser (player.x, player.y));
    }
  
    lasers.shoot = false;
  }

  
  function updateGame() {
    gameArea.clear();
    player.newPos();
    gameArea.drawBoard();
    gameArea.moveBackground();
    player.drawSpaceship();
    createAsteroids();
    for (let i = 0; i < laserArr.length; i += 1) {
      laserArr[i].drawLaser();
    }
    lasers.newPosLaser();
    player.drawFire();
    gameArea.drawScore();
  }
  

  gameArea.start();
  
  
  document.onkeydown = function (e) {
        event.preventDefault();
    switch (e.keyCode) {
      case 38: 
        player.speedY = -3;
        player.thrust = true;
        break;
      case 40:
        player.speedY = 3;
        break;
      case 37: 
        player.speedX = -3;
       
  
        break;
      case 39: 
        player.speedX = 3;
        break;
      case 32: 
        shootLaser();
        lasers.shoot = false;
        break;
    }
  };

  document.onkeyup = function (e) {
    switch (e.keyCode) {
      case 38: 
        player.speedY = 0;
        player.thrust = false;
        break;
      case 40: 
        player.speedY = 0;
        break;
      case 37: 
        player.speedX = 0;
        player.ship = document.getElementById('spaceship');
        break;
      case 39: 
        player.speedX = 0;
        break;
      case 32:
        lasers.shoot = true;
        break;
    }
  };