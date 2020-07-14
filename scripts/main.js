
  let asteroids = [];
  let laserArr = [];
  let enemies = [];
  let getIt = false;
  let enterStart = true;

  
  const gameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    y: 0,
    speed: -2,
    totalPoints: 0,
    bonusPoints: 0,

    menu() {
      this.canvas.width = 800;
      this.canvas.height = 900;
      this.context = this.canvas.getContext('2d');
      document
        .getElementById('game-board')
        .insertBefore(
          this.canvas,
          document.getElementById('game-board').childNodes[0],
        );
  
      this.intervalMenu = setInterval(updateMenu, 1000 / 60);
      resetGame();
    },
  
    
    start() {
      this.interval = setInterval(updateGame, 1000 / 60);
    },
    
    drawBoard() {
      const starBackground = document.getElementById('background');
      gameArea.context.drawImage(starBackground, 0, this.y, 800, 900);
  
      if (this.speed < 0) {
        gameArea.context.drawImage(
          starBackground,
          0,
          this.y - this.canvas.height,
          800,
          900,
        );
    }
  },

  drawMenu() {
    const starBackground = document.getElementById('background');
    const ship = document.getElementById('spaceship');

    gameArea.context.drawImage(starBackground, 0, this.y, 800, 900);

    if (this.speed < 0) {
      gameArea.context.drawImage(
        starBackground,
        0,
        this.y - this.canvas.height,
        800,
        900,
      );
    }

    this.context.font = ' 27px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('Press enter to start', 230, 420);

    this.context.font = ' 73px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('Iron Space', 180, 200);

    gameArea.context.drawImage(ship, 340, 700, 100, 100);

    this.context.font = ' 22px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('HOW TO PLAY:', 315, 540);

    this.context.font = ' 17px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('Use SPACE to shoot', 300, 590);

    this.context.font = ' 17px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('Arrow keys to move', 300, 630);
  },


  drawGameOver() {
    const starBackground = document.getElementById('background');
    gameArea.context.drawImage(starBackground, 0, this.y, 800, 900);

    if (this.speed < 0) {
      gameArea.context.drawImage(
        starBackground,
        0,
        this.y - this.canvas.height,
        800,
        900,
      );
    }

    this.context.font = ' 60px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('GAME OVER!', 200, 350);

    this.context.font = ' 20px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText(`Your score was: ${this.totalPoints}`, 290, 530);
  },


    drawScore() {
      this.totalPoints = this.bonusPoints;
      this.context.font = ' 20px AstroSpace';
      this.context.fillStyle = 'white';
      this.context.fillText(`Score: ${this.totalPoints}`, 40, 50);
      this.context.fillText('Lives: ' + player.lives, 700,  50);
    },

    moveBackground() {
      if (gameArea.totalPoints < 49) {
        this.speed = -2;
      }
      if (gameArea.totalPoints > 50) {
        this.speed = -3;
      }
      if (gameArea.totalPoints > 150) {
        this.speed = -4;
      }
      this.y -= this.speed;
      this.y %= gameArea.canvas.height;
    },
    
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop() {
      clearInterval(this.interval);
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
      this.exploding = false;

      this.collision = false;
      this.lives = 3;
    }
  
    
    drawSpaceship() {
      if (this.exploding === false) {
        gameArea.context.drawImage(
          this.ship,
          this.x,
          this.y,
          this.width,
          this.height,
        );
      } else if (this.exploding === true) {
        gameArea.context.drawImage(
          this.explosion,
          this.x,
          this.y,
          this.width,
          this.height,
        );
      }
    }
   
 
    
      newPos() {
        if (this.exploding === false) {
          this.x += this.speedX;
          this.y += this.speedY;
        } else {
          this.x += 0;
          this.y += 0;
        }
      }
    
      
      left() {
        return this.x;
      }
    
      right() {
        return this.x - 10 + this.width;
      }
    
      top() {
        return this.y;
      }
    
      bottom() {
        return this.y - 10 + this.height;
      }
    
     
      crashWith(asteroid) {
        const crash = this.bottom() < asteroid.y
          || this.top() > asteroid.y - 10 + asteroid.height
          || this.right() < asteroid.x
          || this.left() > asteroid.x - 10 + asteroid.width;
        if (!crash) {
          return !crash;
        }
      }
    }
    const player = new SpaceShip(70, 80);
  

  class Asteroids {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }
  
    drawAsteroid() {
      const asteroid = document.getElementById('asteroid');
  
      gameArea.context.drawImage(
        asteroid,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }
  

  function createAsteroids() {
    let speed = 1.5;
  
    if (gameArea.totalPoints > 50) {
      speed = 2;
    }
  
    if (gameArea.totalPoints > 100) {
      speed = 2.5;
    }
  
    if (gameArea.totalPoints > 200) {
      speed = 3;
    }
  
    for (let i = 0; i < asteroids.length; i += 1) {
      asteroids[i].y += speed   ;
      asteroids[i].drawAsteroid();
    }
  
    if (gameArea.frames % 130 === 0) {
      const y = 0;
      const x = Math.floor(Math.random() * (790 - 20) + 20);
      asteroids.push(new Asteroids(40, 40, x, y));
    }
  
    if (gameArea.totalPoints > 50) {
      if (gameArea.frames % 120 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (790 - 20) + 20);
        asteroids.push(new Asteroids(40, 40, x, y));
      }
    }
  
    if (gameArea.totalPoints > 150) {
      if (gameArea.frames % 110 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (790 - 20) + 20);
        asteroids.push(new Asteroids(40, 40, x, y));
      }
    }
  }
  
  class Enemies {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.enemy = document.getElementById('enemy1');
      this.enemyLife = Math.floor(Math.random() * 4) + 1 
    }
  
    drawEnemy() {
      gameArea.context.drawImage(
        this.enemy,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }
  
  function createEnemy() {
    let speed = 1;
  
    if (gameArea.totalPoints > 50) {
      speed = 2;
    }
    if (gameArea.totalPoints > 100) {
      speed = 3;
    }
    if (gameArea.totalPoints > 300) {
      speed = 4;
    }
    for (let i = 0; i < enemies.length; i += 1) {
      enemies[i].y += speed;
      enemies[i].drawEnemy();
    }
  
    if (gameArea.frames % 2000 === 0) {
      const y = 0;
      const x = Math.floor(Math.random() * (740 - 60) + 60);
      enemies.push(new Enemies(70, 80, x, y, 2));
    }
    if (gameArea.totalPoints > 50) {
      if (gameArea.frames % 900 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (740 - 60) + 60);
        enemies.push(new Enemies(70, 80, x, y, 2));
      }
    }
    if (gameArea.totalPoints > 150) {
      if (gameArea.frames % 600 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (740 - 60) + 60);
        enemies.push(new Enemies(70, 80, x, y, 2));
      }
    }
  }
  
  const enemiesNew = new Enemies();

  
  
  class Laser {
    constructor(x, y, getIt) {
      this.x = x + 26;
      this.y = y - 40;
      this.shoot = true;
      this.laser = document.getElementById('laser');
    }
  
  
    drawLaser() {
      if (getIt === false) {
        gameArea.context.drawImage(this.laser, this.x, this.y, 15, 25);
      } else {
        gameArea.context.drawImage(this.laserLarge, this.x, this.y, 25, 40);
      }
    }
  
  
    newPosLaser() {
      for (let i = 0; i < laserArr.length; i += 1) {
        laserArr[i].y -= 4;
      }
    }
  
    left() {
      return this.x;
    }
  
    right() {
      return this.x - 20 + this.width;
    }
  
    top() {
      return this.y;
    }
  
    bottom() {
      return this.y - 20 + this.height;
    }
  
  
    crashWith(asteroid) {
      return !(
        this.bottom() < asteroid.y
        || this.top() > asteroid.y - 10 + asteroid.height
        || this.right() < asteroid.x
        || this.left() > asteroid.x - 10 + asteroid.width
      );
    }
  }
  
  const lasers = new Laser();
  function shootLaser() {
    if (
      player.exploding === false
      && player.collision === false
    ) {
      laserArr.push(new Laser (player.x, player.y, getIt));
      if (getIt === false) {

      }
      if (getIt === true) {
       
      }
    }
  
    lasers.shoot = false;
  };


  function checkCollision() {
    let crashed = false;
    asteroids.forEach((asteroid, index) => {
      if (player.crashWith(asteroid) && player.exploding === false) {
        crashed = true;
        asteroids.splice(index, 1);
      }
    });
  
    if (crashed && player.exploding === false) {
      player.exploding = true;
      player.lives -= 1;

      if (gameArea.totalPoints >= 50) {
         gameArea.bonusPoints -= 50;
      } else { gameArea.bonusPoints = 0; }
      setTimeout(() => {
        player.exploding = false;
        player.collision = true;
      }, 0);
    }
  
    enemies.forEach((enemy, index) => {
      if (player.crashWith(enemy) && player.exploding === false) {
        crashed = true;
        enemies.splice(index, 1);
      }
    });
  
    if (crashed && player.exploding === false) {
      player.exploding = true;
      player.lives -= 1;
  
      if (gameArea.totalPoints >= 50) {
        gameArea.bonusPoints -= 50;
      } else { gameArea.bonusPoints = 0; }
  
      setTimeout(() => {
        player.exploding = false;
        player.collision = true;
      }, 0);
    }
  
    for (let i = 0; i < asteroids.length; i += 1) {
      for (let j = 0; j < laserArr.length; j += 1) {
        if (
          laserArr[j].x >= asteroids[i].x
          && laserArr[j].x <= asteroids[i].x + asteroids[i].width
          && (laserArr[j].y <= asteroids[i].y + asteroids[i].height
            && laserArr[j].y >= asteroids[i].y)
        ) {
          asteroids.splice(i, 1);
          laserArr.splice(j, 1);
          gameArea.bonusPoints += 5;
        }
      }
    }
  
    
    for (let i = 0; i < enemies.length; i += 1) {
      for (let j = 0; j < laserArr.length; j += 1) {
        if (
          laserArr[j].x >= enemies[i].x
          && laserArr[j].x <= enemies[i].x + enemies[i].width
          && (laserArr[j].y <= enemies[i].y + enemies[i].height
            && laserArr[j].y >= enemies[i].y)
        ) {
          enemies[i].enemyLife -= 1;
          laserArr.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < enemies.length; i += 1) {
      if (enemies[i].enemyLife === 0) {
        gameArea.bonusPoints += 30;
        enemies.splice(i, 1);
      }
    }
  }
  function resetGame() {
    asteroids = [];
    laserArr = [];
    enemies = [];
    gameArea.bonusPoints = 0;
    gameArea.totalPoints = 0;
    player.lives = 3;
    player.collision = false;
    player.x = 460;
    player.y = 600;
  }


  
  function checkGame() {
  
    if (player.lives === 0) {
      gameArea.stop();
      gameArea.drawGameOver();
      setTimeout(() => {
        gameArea.menu();
        enterStart = true;
      }, 3000);
    }
  } 

  function collisionTest() {
    if (player.collision === true) {
      player.ship = document.getElementById('spaceship');
      player.collision = true;
      setTimeout(() => {
        player.collision = false;
        player.ship = document.getElementById('spaceship');
      }, 0);
    } else {
      checkCollision();
    }
  }
  
  function boundaries() {
    if (player.y >= 820) {
      player.y -= 5;
    } else if (player.x >= 740) {
      player.x -= 5;
    } else if (player.y <= 0) {
      player.y += 5;
    } else if (player.x <= 0) {
      player.x += 5;
    }
  }
  
  function removeLaser() {
    for (let i = 0; i < laserArr.length; i += 1) {
      if (laserArr[i].y < 0) {
        laserArr.splice(i, 1);
      }
    }
  }

  function removeAsteroid() {
    for (let i = 0; i < asteroids.length; i += 1) {
      if (asteroids[i].y > 900) {
        asteroids.splice(i, 1);
      }
    }
  }
  function removeEnemy() {
    for (let i = 0; i < enemies.length; i += 1) {
      if (enemies[i].y > 900) {
        enemies.splice(i, 1);
      }
    }
  }

  function updateMenu() {
    lasers.shoot = false;
    gameArea.drawMenu();
    gameArea.moveBackground();
  }

  function updateGame() {
    gameArea.clear();
    player.newPos();
    gameArea.drawBoard();
    gameArea.moveBackground(); 
    player.drawSpaceship();
    createAsteroids();
    createEnemy();
  for (let i = 0; i < laserArr.length; i += 1) {
    laserArr[i].drawLaser();
  }
    gameArea.frames += 4;
    lasers.newPosLaser();
    //player.drawFire();
    gameArea.drawScore();  
    boundaries();
    collisionTest();
    checkGame();
    removeLaser();
    removeAsteroid();
  }
  
  gameArea.menu();
  
  
  document.onkeydown = function (e) {
    event.preventDefault();
        switch (e.keyCode) {
          case 38: 
            player.speedY = -4;
            player.thrust = true;
            break;
          case 40: 
            player.speedY = 4;
            break;
          case 37: 
            player.speedX = -4;
            break;
          case 39: 
            player.speedX = 5;
            break;
          case 32: 
            if (lasers.shoot === true) {
              shootLaser();
            }
            break;
            case 13:
            if (enterStart === true) {
            gameArea.start();
            clearInterval(gameArea.intervalMenu);
            }
             enterStart = false;
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
            player.ship = document.getElementById('spaceship');
            break;
          case 32:
            lasers.shoot = true;
            break;
        }
      };