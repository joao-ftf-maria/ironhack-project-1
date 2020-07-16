  let sads = [];
  let ballArr = [];
  let enemies = [];
  let speedyEnemy = [];
  let bossHand = [];
  let boss = [];
  let snacksArr = [];
  let getIt = false;
  let enterStart = true;

  const audio = {
    ball: new Audio ('/sfx/Cartoon Boing Sound Effect.mp3'),
    eating: new Audio('/sfx/nom-nom-nom.mp3'),
    oof: new Audio ('/sfx/oof.mp3'),
    menuMusic: new Audio ('/music/Gitaroo Man OST - 08 The Legendary Theme (Acoustic).mp3'),
    gameMusic: new Audio ('/music/Aquatic Ambience.mp3'),
  }
  
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
      audio.menuMusic.pause();
      audio.gameMusic.load();
      audio.gameMusic.volume = 0.1;
      audio.gameMusic.play();
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
    const ichi = document.getElementById('ichi');

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
    this.context.fillText('Park Crash',150, 200);

    gameArea.context.drawImage(ichi, 340, 700, 100, 100);

    this.context.font = ' 22px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('HOW TO PLAY:', 315, 540);

    this.context.font = ' 17px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('Use SPACE to shoot', 300, 590);

    this.context.font = ' 17px AstroSpace';
    this.context.fillStyle = '#f5eedc';
    this.context.fillText('Arrow keys to move', 300, 630);

    audio.menuMusic.autoplay = true;
    audio.menuMusic.volume = 0.1;
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
      this.context.fillText('Lives: ' + player.lives, 700,  50 );
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
      if (gameArea.totalPoints > 500) {
        this.speed = -5;
      }
      if (gameArea.totalPoints > 1000) {
        this.speed = -6;
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


  class Ichi {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
      this.ichi = document.getElementById('ichi');
      this.explosion = document.getElementById('explosion');
      this.exploding = false;
      this.collision = false;
      this.lives = 3;
    }
  
    
    drawIchi() {
      if (this.exploding === false) {
        gameArea.context.drawImage(
          this.ichi,
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
    
     
      crashWith(sad) {
        const crash = this.bottom() < sad.y
          || this.top() > sad.y - 10 + sad.height
          || this.right() < sad.x
          || this.left() > sad.x - 10 + sad.width;
        if (!crash) {
          return !crash;
        }
      }
    }
    const player = new Ichi(70, 80);
  

  class Sads {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }
  
    drawSad() {
      const sad = document.getElementById('sad');
  
      gameArea.context.drawImage(
        sad,
        this.x,
        this.y,
        this.width = 45,
        this.height = 45,
      );
    }
  }
  

  function createSads() {
    let speed = 1.5;
  
    if (gameArea.totalPoints > 50) {
      speed = 2;
    }
  
    if (gameArea.totalPoints > 100) {
      speed = 2.5;
    }
  
    if (gameArea.totalPoints > 300) {
      speed = 3;
    }
  
    for (let i = 0; i < sads.length; i += 1) {
      sads[i].y += speed   ;
      sads[i].drawSad();
    }
  
    if (gameArea.frames % 130 === 0) {
      const y = 0;
      const x = Math.floor(Math.random() * (770 - 20) + 20);
      sads.push(new Sads(40, 40, x, y));
    }
  
    if (gameArea.totalPoints > 100) {
      if (gameArea.frames % 120 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (770 - 20) + 20);
        sads.push(new Sads(40, 40, x, y));
      }
    }
  
    if (gameArea.totalPoints > 300) {
      if (gameArea.frames % 110 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (770 - 20) + 20);
        sads.push(new Sads(40, 40, x, y));
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
      this.enemyLife = 3;
      
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
    if (gameArea.totalPoints > 150) {
      if (gameArea.frames % 900 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (740 - 60) + 60);
        enemies.push(new Enemies(70, 80, x, y, 2));
      }
    }
    if (gameArea.totalPoints > 300) {
      if (gameArea.frames % 600 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (740 - 60) + 60);
        enemies.push(new Enemies(70, 80, x, y, 2));
      }
    }
    if (gameArea.totalPoints > 1000) {
      if (gameArea.frames % 400 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (740 - 60) + 60);
        enemies.push(new Enemies(90, 90, x, y, 2));
      }
    }
  }
  
  const enemiesNew = new Enemies();

  class SpeedyEnemies {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.enemy = document.getElementById('enemy2');
      this.enemyLife = 2;
      
    }
  
    drawSpeedy() {
      gameArea.context.drawImage(
        this.enemy,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }
  
  function createSpeedy() {
    let speed = 4;
  
    if (gameArea.totalPoints > 100) {
      speed = 6;
    }
    if (gameArea.totalPoints > 200) {
      speed = 8;
    }
    if (gameArea.totalPoints > 500) {
      speed = 10;
    }
    if (gameArea.totalPoints > 1000) {
      speed = 12;
    }
    for (let i = 0; i < speedyEnemy.length; i += 1) {
      speedyEnemy[i].y += speed;
      speedyEnemy[i].drawSpeedy();
    }
  
    if (gameArea.frames % 2000 === 0) {
      const y = 0;
      const x = Math.floor(Math.random() * (740 - 60) + 60);
      speedyEnemy.push(new SpeedyEnemies(70, 80, x, y, 2));
    }
    if (gameArea.totalPoints > 150) {
      if (gameArea.frames % 900 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (700 - 60) + 60);
        speedyEnemy.push(new SpeedyEnemies(70, 80, x, y, 2));
      }
    }
    if (gameArea.totalPoints > 500) {
      if (gameArea.frames % 600 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (650 - 60) + 60);
        speedyEnemy.push(new SpeedyEnemies(70, 80, x, y, 2));
      }
    }
    if (gameArea.totalPoints > 400) {
      if (gameArea.frames % 600 === 0) {
        const y = 0;
        const x = Math.floor(Math.random() * (590 - 60) + 60);
        speedyEnemy.push(new SpeedyEnemies(70, 80, x, y, 2));
      }
    }
  }
  
  const speedyNew = new SpeedyEnemies();

let bossApear = true;
  
  class Boss {
    constructor(width, height, x, y, speedX, speedY) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY;
      this.enemy = document.getElementById('evil');
       
}
runLogic () {

  if (this.x >= 690 || this.x <= 0) {
    this.speedX *= -1;
  }
  this.x += this.speedX / 2;
} 

    drawBoss() {
      gameArea.context.drawImage(
        this.enemy,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }


function createBoss() {
        if (gameArea.totalPoints >= 1000 && gameArea.totalPoints <= 1800)  {
          bossApear = false;
          for (let i = 0; i <boss.length; i++) {
            boss[0].drawBoss()
            boss[0].runLogic()
          }
        
        

}
    if (gameArea.frames % 2000 === 0) {
      boss.push(new Boss(250, 250, 50, 25,1,0));
    }
  }

  const newBoss = new Boss();
  
  class Hands {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.enemy = document.getElementById('evilHand');
    }
  
    drawHand() {
      gameArea.context.drawImage(
        this.enemy,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }
  
  function createHand() {
    let speed = 4;
    if (gameArea.totalPoints >= 1000  && gameArea.totalPoints <= 1800) {  
      for (let i = 0; i < bossHand.length; i += 1) {
        bossHand[i].x += speed;
        bossHand[i].drawHand();
    }
  
    if (gameArea.frames % 400 === 0) {
      const y  = Math.floor(Math.random() * (800 - 60) + 60);
      const x  = 0;
      bossHand.push(new Hands(80, 80, x, y));
    }
}
  }

const newHand= new Hands();

  
  
  class Ball {
    constructor(x, y, getIt) {
      this.x = x + 26;
      this.y = y - 40;
      this.shoot = true;
      this.ball = document.getElementById('projectile');
    

    }
  
  
    drawBall() {
      if (getIt === false) {
        gameArea.context.drawImage(this.ball, this.x, this.y, 25, 25);
      }
    }
  
  
    newPosBall() {
      for (let i = 0; i < ballArr.length; i += 1) {
        ballArr[i].y -= 4;
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
  
  
    crashWith(sad) {
      return !(
        this.bottom() < sad.y
        || this.top() > sad.y - 10 + sad.height
        || this.right() < sad.x
        || this.left() > sad.x - 10 + sad.width
      );
    }
  }
  
  const balls= new Ball();
  function shootBall() {
    if (
      player.exploding === false
      && player.collision === false
    ) {
      ballArr.push(new Ball (player.x, player.y, getIt));
      if (getIt === false) {

        audio.ball.load();
        audio.ball.volume = 0.2;
        audio.ball.play();
      }
      if (getIt === true) {
       
      }
    }
  
    balls.shoot = false;
 
  };

  class Snacks {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.height = 50;
      this.width = 50;
      this.snack = document.getElementById('cookie');
    }
    drawSnack() {
      gameArea.context.drawImage(
        this.snack,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }

  function createSnacks() {
    let speed = 2;
  
    if (gameArea.totalPoints > 50) {
      speed = 3;
    }
    if (gameArea.totalPoints > 150) {
      speed = 4;
    }
    if (gameArea.totalPoints > 200) {
      speed = 5;
    }
    for (let i = 0; i < snacksArr.length; i += 1) {
      snacksArr[i].y += speed;
      snacksArr[i].drawSnack();
    }
    if (gameArea.frames % 2000 === 0) {
      const y = 0;
      const x = Math.floor(Math.random() * (740 - 60) + 60);
      snacksArr.push(new Snacks(x, y, 50, 50));
    }
  }
  function getSnack() {
    for (let i = 0; i < snacksArr.length; i += 1) {
      if (
        snacksArr[i].x > player.x
        && player.x + player.width > snacksArr[i].x + snacksArr[i].width
        && snacksArr[i].y + snacksArr[i].height >= player.y
        && snacksArr[i].y <= player.y + player.height
      ) {
        snacksArr.splice(i, 1)

        audio.eating.load();
        audio.eating.volume= 0.2;
        audio.eating.play();

        getIt = true;

        setTimeout(() => {
          getIt = false;
        },0);
      }
    }
    if (getIt === true) {
      player.lives += 1;
    }
  }


  function checkCollision() {
    let crashed = false;
    sads.forEach((sad, index) => {
      if (player.crashWith(sad) && player.exploding === false) {
        crashed = true;
        sads.splice(index, 1);
      }
    });
  
    if (crashed && player.exploding === false) {
      player.exploding = true;
      player.lives -= 1;
      audio.oof.load();
     audio.oof.volume = 0.4;
     audio.oof.play();

      if (gameArea.totalPoints >= 50) {
         gameArea.bonusPoints -= 50;
      } else { gameArea.bonusPoints = 0; }
      setTimeout(() => {
        player.exploding = false;
        player.collision = true;
      }, 500);
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
      audio.oof.load();
      audio.oof.volume = 0.4;
      audio.oof.play();
  
      if (gameArea.totalPoints >= 50) {
        gameArea.bonusPoints -= 50;
      } else { gameArea.bonusPoints = 0; }
  
      setTimeout(() => {
        player.exploding = false;
        player.collision = true;
      }, 500);
    }

       bossHand.forEach((enemy, index) => {
      if (player.crashWith(enemy) && player.exploding === false) {
        crashed = true;
        bossHand.splice(index, 1);
      }
    });
  
    if (crashed && player.exploding === false) {
      player.exploding = true;
      player.lives -= 1;
      audio.oof.load();
      audio.oof.volume = 0.4;
      audio.oof.play()
      setTimeout(() => {
        player.exploding = false;
        player.collision = true;
      }, 500);
    }

    
    speedyEnemy.forEach((enemy, index) => {
      if (player.crashWith(enemy) && player.exploding === false) {
        crashed = true;
        speedyEnemy.splice(index, 1);
      }
    });
  
    if (crashed && player.exploding === false) {
      player.exploding = true;
      player.lives -= 1;
      audio.oof.load();
      audio.oof.volume = 0.4;
      audio.oof.play();
  
      if (gameArea.totalPoints >= 50) {
        gameArea.bonusPoints -= 50;
      } else { gameArea.bonusPoints = 0; }
  
      setTimeout(() => {
        player.exploding = false;
        player.collision = true;
      }, 500);
    }

    boss.forEach(() => {
    if (crashed && player.exploding === false) {
      player.exploding = true;
      player.lives -= 1;
      audio.oof.load();
      audio.oof.volume = 0.4;
      audio.oof.play();
  
      if (gameArea.totalPoints >= 50) {
        gameArea.bonusPoints -= 50;
      } else { gameArea.bonusPoints = 0; }
  
      setTimeout(() => {
        player.exploding = false;
        player.collision = true;
      }, 500);
    }
  });

  
    for (let i = 0; i < sads.length; i += 1) {
      for (let j = 0; j < ballArr.length; j += 1) {
        if (
          ballArr[j].x >= sads[i].x
          && ballArr[j].x <= sads[i].x + sads[i].width
          && (ballArr[j].y <= sads[i].y + sads[i].height
            && ballArr[j].y >= sads[i].y)
        ) {
          sads.splice(i, 1);
          ballArr.splice(j, 1);
          gameArea.bonusPoints += 5;
        }
      }
    }
  
    
    for (let i = 0; i < enemies.length; i += 1) {
      for (let j = 0; j < ballArr.length; j += 1) {
        if (
          ballArr[j].x >= enemies[i].x
          && ballArr[j].x <= enemies[i].x + enemies[i].width
          && (ballArr[j].y <= enemies[i].y + enemies[i].height
            && ballArr[j].y >= enemies[i].y)
        ) {
          enemies[i].enemyLife -= 1;
          ballArr.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < enemies.length; i += 1) {
      if (enemies[i].enemyLife === 0) {
        gameArea.bonusPoints += 30;
        enemies.splice(i, 1);
      }
    }

    for (let i = 0; i < speedyEnemy.length; i += 1) {
      for (let j = 0; j < ballArr.length; j += 1) {
        if (
          ballArr[j].x >= speedyEnemy[i].x
          && ballArr[j].x <= speedyEnemy[i].x + speedyEnemy[i].width
          && (ballArr[j].y <= speedyEnemy[i].y + speedyEnemy[i].height
            && ballArr[j].y >= speedyEnemy[i].y)
        ) {
          speedyEnemy[i].enemyLife -= 1;
          ballArr.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < speedyEnemy.length; i += 1) {
      if (speedyEnemy[i].enemyLife === 0) {
        gameArea.bonusPoints += 45;
        speedyEnemy.splice(i, 1);
      }
    }
    for (let i = 0; i < boss.length; i += 1) {
      for (let j = 0; j < ballArr.length; j += 1) {
        if (
          ballArr[j].x >= boss[i].x
          && ballArr[j].x <= boss[i].x + boss[i].width
          && (ballArr[j].y <= boss[i].y + boss[i].height
            && ballArr[j].y >= boss[i].y)
        ) {
          boss[i].enemyLife -= 0;
        }
      }
    }
    for (let i = 0; i < boss.length; i += 1) {
      if (boss[i].enemyLife === 0) {
        gameArea.bonusPoints += 0;
        boss.splice(i, 1);
      };
    }
  }

  function resetGame() {
    sads = [];
    ballArr = [];
    enemies = [];
    speedyEnemy = [];
    snacksArr = [];
    bossHand = [];
    boss = [];
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
        audio.gameMusic.pause();
        audio.menuMusic.load();
        audio.menuMusic.volume = 0.1;
        enterStart = true;
      }, 3000);
    }
  } 

  function collisionTest() {
    if (player.collision === true) {
      player.ichi = document.getElementById('ichi');
      player.collision = true;
      setTimeout(() => {
        player.collision = false;
        player.ichi = document.getElementById('ichi');
      },500);
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
   
  



  
  function removeBall() {
    for (let i = 0; i < ballArr.length; i += 1) {
      if (ballArr[i].y < 0) {
        ballArr.splice(i, 1);
      }
    }
  }

  function removeSad() {
    for (let i = 0; i < sads.length; i += 1) {
      if (sads[i].y > 900) {
        sads.splice(i, 1);
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
  function removeSpeedy() {
    for (let i = 0; i < speedyEnemy.length; i += 1) {
      if (speedyEnemy[i].y > 900) {
        speedyEnemy.splice(i, 1);
      }
    }
  }
  function removeHand() {
    for (let i = 0; i < bossHand.length; i += 1) {
      if (bossHand[i].x > 800) {
        bossHand.splice(i, 1);
      }
    }
  }


  function updateMenu() {
    balls.shoot = false;
    gameArea.drawMenu();
    gameArea.moveBackground();
  }


  
  function updateGame() {
    gameArea.clear();
    player.newPos();
    gameArea.drawBoard();
    gameArea.moveBackground(); 
    player.drawIchi();
    
    createSnacks();
    createSads();
    createEnemy();
    createSpeedy();
    createHand();
    createBoss();
    
    
  for (let i = 0; i < ballArr.length; i += 1) {
    ballArr[i].drawBall();
  }
    gameArea.frames += 4;
    balls.newPosBall();
    gameArea.drawScore();  
    boundaries();
    collisionTest();
    checkGame();
    removeBall();
    removeSad();
    removeSpeedy();
    removeHand();
    getSnack();

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
            if (balls.shoot === true) {
              shootBall();
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
            player.ichi = document.getElementById('ichi');
            break;
          case 39: 
            player.speedX = 0;
            player.ichi = document.getElementById('ichi');
            break;
          case 32:
            balls.shoot = true;
            break;
        }
      };