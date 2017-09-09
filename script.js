  window.getTimeFramesFromWindow = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  window.addEventListener("keydown", keyPressHandler, false);
  var left = false;
  var right = false;
  function keyPressHandler(e) {
      switch(e.keyCode) {
        case 37:
          left = true;
          right = false;
          break;
        case 39:
          right = true;
          left = false;
          break;

        case 83:
          infiniteLoop = false;
          context.clearRect(0, 0, canvas.width, canvas.height);
          paintCanvas();
          startGame();
          break;

        case 73:
          infiniteLoop = true;
          context.clearRect(0, 0, canvas.width, canvas.height);
          paintCanvas();
          startGame();
          break;

        case 32:
          context.clearRect(0, 0, canvas.width, canvas.height);
          paintCanvas();
          setTimeout(function() {
            title(context);
          }, 500);
          break;


        default:
          console.log('invalid entry');

      }   
      e.preventDefault();
      drawcharacter(character, context);
  } 

  function drawGhost(ghost, context) {
    var img = new Image();
    img.src = 'ghost.png';
    context.drawImage(img, ghost.x, ghost.y);
  }
  function drawcharacter(character, context) {
    var img = new Image();
    if (left)
      img.src = 'flipped_samurai.png';
    else
      img.src = 'samurai.png';
    context.drawImage(img, character.x, character.y);
  }

  function drawline(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.lineTo(1300, 600);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke()
  }

  var max = 1;
  var min = 0.5;
  function animate(ghost, canvas, context, startTime) {
    ghost.y = ghost.y + Math.random() * (max - min) + min;;
    ghost.x = ghost.x +Math.random() * (0.25 - 0) + 0;;
    if (ghost.y >= 650) {
      ghost.y = 0;
      ghost.x = Math.random() * (canvas.width - 60 - 0) + 0;
      ghostsInVillage++;
    }
    ghost1.y = ghost1.y + Math.random() * (max - min) + min;;
    ghost1.x = ghost1.x -Math.random() * (0.25 - 0) + 0;;
    if (ghost1.y >= 650) {
      ghost1.y = 0;
      ghost1.x = Math.random() * (canvas.width - 60 - 0) + 0;
      ghostsInVillage++;
    }
    ghost2.y = ghost2.y + Math.random() * (max - min) + min;;
    ghost2.x = ghost2.x +Math.random() * (0.25 - 0) + 0;;
    if (ghost2.y >= 650) {
      ghost2.y = 0;
      ghost2.x = Math.random() * (canvas.width - 60 - 0) + 0;
      ghostsInVillage++;
    }
    ghost3.y = ghost3.y + Math.random() * (max - min) + min;;
    ghost3.x = ghost3.x -Math.random() * (0.25 - 0) + 0;;
    if (ghost3.y >= 650) {
      ghost3.y = 0;
      ghost3.x = Math.random() * (canvas.width - 60 - 0) + 0;
      ghostsInVillage++;
    }
    ghost4.y = ghost4.y + Math.random() * (max - min) + min;;
    ghost4.x = ghost4.x -Math.random() * (0.25 - 0) + 0;;
    if (ghost4.y >= 650) {
      ghost4.y = 0;
      ghost4.x = Math.random() * (canvas.width - 60 - 0) + 0;
      ghostsInVillage++;
    }
    ghost5.y = ghost5.y + Math.random() * (max - min) + min;;
    ghost5.x = ghost5.x -Math.random() * (0.25 - 0) + 0;;
    if (ghost5.y >= 650) {
      ghost5.y = 0;
      ghost5.x = Math.random() * (canvas.width - 60 - 0) + 0;
      ghostsInVillage++;
    }


    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (left) {
      down = false;
      up = false;
      right = false;
      if (character.x >0)
        character.x = character.x-6;
    }
    else if (right) {
      down = false;
      left = false;
      up = false;
      if (character.x < canvas.width-65)
        character.x = character.x+6;
    }

    paintCanvas();
    drawline(context);
    drawcharacter(character, context);
    drawGhost(ghost, context);
    drawGhost(ghost1, context);
    drawGhost(ghost2, context);
    drawGhost(ghost3, context);
    drawGhost(ghost4, context);
    drawGhost(ghost5, context);
    printScore(context);

    // request new frame
    getTimeFramesFromWindow(function() {    
      var collision = check_collision(character, ghost5) || check_collision(character, ghost4) ||
        check_collision(character, ghost3) || check_collision(character, ghost2) || check_collision(character, ghost1) ||
        check_collision(character, ghost);
      if (ghostsInVillage >= 5 && !gameOverDone && !infiniteLoop) {
        gameOverDone = true;
        reset();
        context.clearRect(0, 0, canvas.width, canvas.height);
        paintCanvas();
        gameOver(context);
      }
      else if(!gameOverDone)
        animate(ghost, canvas, context, startTime);
    });
  }

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var gameOverDone = false;

  function paintCanvas() {
    context.fillStyle = "Black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    printScore(context);
  }
  paintCanvas();


  var ghost = {
    x: Math.random() * (canvas.width - 60 - 0) + 0,
    y: 0,
    width: 100,
    height: 50,
    borderWidth: 5
  };

  var ghost1 = {
    x: Math.random() * (canvas.width - 60 - 0) + 0,
    y: 0,
    width: 100,
    height: 50,
    borderWidth: 5
  };

  var ghost2 = {
    x: Math.random() * (canvas.width - 60 - 0) + 0,
    y: 0,
    width: 100,
    height: 50,
    borderWidth: 5
  };

  var ghost3 = {
    x: Math.random() * (canvas.width - 60 - 0) + 0,
    y: 0,
    width: 100,
    height: 50,
    borderWidth: 5
  };

  var ghost4 = {
    x: Math.random() * (canvas.width - 60 - 0) + 0,
    y: 0,
    width: 100,
    height: 50,
    borderWidth: 5
  };

  var ghost5 = {
    x: Math.random() * (canvas.width - 60 - 0) + 0,
    y: 0,
    width: 100,
    height: 50,
    borderWidth: 5
  };

  var character = {
    x: 150,
    y: 490,
    width: 50,
    height: 50,
    borderWidth: 5
  };

  drawcharacter(character, context);
  drawline(context);
  var scores = 0;
  var ghostsInVillage = 0;
  var infiniteLoop = false;

  function check_collision(samurai, ghost) {
    var col = !(ghost.x > (samurai.x + samurai.width) || 
    (ghost.x + ghost.width) < samurai.x || 
    ghost.y > (samurai.y + samurai.height) ||
    (ghost.y + ghost.height) < samurai.y);
    if (col) {
      ghost.y = -60;
      ghost.x = Math.random() * (canvas.width - 60 - 0) + 0;
      scores++;
    }
  return col;
  }

  setTimeout(function() {
    title(context);
  }, 700);
  function title(ctx) {
    var img = new Image();
    img.src = 'samurai.png';
    context.drawImage(img, canvas.width/2 - 50, canvas.height/2 - 150 -50);
    ctx.font="30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("The Lost Samurai", canvas.width/2, canvas.height/2 - 50);
    ctx.font="15px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Long long ago, there was a samurai who used to kill ghosts.", canvas.width/2, canvas.height/2 + 30 -50);
    ctx.fillText("Once while chasing a band of ghosts he got Lost in an infinite land.", canvas.width/2, canvas.height/2 + 60-50);
    ctx.fillText("Since then he is continuously killing never ending band of ghosts there.", canvas.width/2, canvas.height/2 + 90-50);
    ctx.font="15px sans-serif";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Controls: use left and right arrows to move The Samurai", canvas.width/2, canvas.height/2 + 120-50);
    ctx.fillText("Ghosts will get killed when touched with Samurai's spear.", canvas.width/2, canvas.height/2 + 150-50);
    ctx.fillText("Press S to start the game in normal mode.", canvas.width/2, canvas.height/2 + 180-50);
    ctx.fillText("Press I to start the game in infinite mode.", canvas.width/2, canvas.height/2 + 210-50);
    ctx.fillText("In normal mode you will lose if you let 5 Ghosts skip.", canvas.width/2, canvas.height/2 + 240-50);
    ctx.fillText("In infinite mode you can kill infinite number of Ghosts.", canvas.width/2, canvas.height/2 + 270-50);
  }

  function gameOver(ctx) {
    ctx.font="30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
    ctx.font="15px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("You killed The Samurai!", canvas.width/2, canvas.height/2 + 30);
    ctx.fillStyle = "blue";
    ctx.fillText("Press S to restart the game.", canvas.width/2, canvas.height/2 + 60);
  
  }

  function reset() {
    ghost.x = Math.random() * (canvas.width - 60 - 0) + 0;
    ghost1.x = Math.random() * (canvas.width - 60 - 0) + 0;
    ghost2.x = Math.random() * (canvas.width - 60 - 0) + 0;
    ghost3.x = Math.random() * (canvas.width - 60 - 0) + 0;
    ghost4.x = Math.random() * (canvas.width - 60 - 0) + 0;
    ghost5.x = Math.random() * (canvas.width - 60 - 0) + 0;
    ghost.y = ghost1.y = ghost2.y = ghost3.y = ghost4.y = ghost5.y = 0;
    left = false;
    right = false;
  }

  function startGame() {
    scores = 0;
    ghostsInVillage = 0;
    gameOverDone = false;
    var startTime = (new Date()).getTime();
    animate(ghost, canvas, context, startTime);
  }

  function printScore(ctx) {
    if (!scores && !ghostsInVillage) {
      scores=0; ghostsInVillage=0;
    }
    ctx.font="20px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("The Lost Samurai", canvas.width/2, 40);
    ctx.font="15px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Ghosts killed: " + scores, 100, 60);
    ctx.fillText("Ghosts escaped: " + ghostsInVillage, 1000, 60);
  }
