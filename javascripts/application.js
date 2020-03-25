jQuery(function($) {
  var background = $('#background');
  var player = $('#player');
  var tubes = $('#tubes');
  var game_over = $('#game_over');
  var score_label = $('#score');

  var STATE_FALLING = 0;
  var STATE_JUMPING = 1;
  var GAME_PLAYING = 0;
  var GAME_OVER = 1;

  var backgroundX = 0;
  var playerX = 50;
  var playerY = 100;
  var tubesX = 320;
  var tubesY = -Math.random()*250;
  var gravity = 1;
  var jumping = 5;
  var score = 0;
  var status = STATE_FALLING;
  var game_status = GAME_PLAYING;

  $(window).on('keydown', function(event) {

    if(event.keyCode == 32) {
      event.preventDefault();

      if(game_status == GAME_PLAYING) {
        status = STATE_JUMPING;
        jumping = 5;
      }

      if(game_status == GAME_OVER) {
        game_status = GAME_PLAYING;

        playerX = 50;
        playerY = 100;
        tubesX = 320;
        tubesY = -Math.random()*250;
        gravity = 1;
        status = STATE_FALLING;
      }


      return(false);
    }

  });

  setInterval(function() {
    background.css('left', -backgroundX + "px");
    backgroundX = backgroundX + 1;

    if(game_status == GAME_PLAYING) {
      game_over.css('display', 'none');
      player.css('display', 'block');
      tubes.css('display', 'block');

      player.css('left', playerX + "px");
      player.css('top',  playerY + "px");

      if(status == STATE_FALLING) {
        playerY = playerY + gravity;
        gravity = gravity + 1;
      }

      if(status == STATE_JUMPING) {
        playerY = playerY - jumping;
        jumping = jumping - 0.25;
        if(jumping < 0) {
          status == STATE_FALLING;
        }
      }

      if(playerY < -50) {
        game_status = GAME_OVER;
      }

      if(playerY > 480) {
        game_status = GAME_OVER;
      }

      if(backgroundX > 300) {
        backgroundX = 0;
      }

      tubes.css('left', tubesX + "px");
      tubes.css('top', tubesY + "px");

      tubesX = tubesX - 2;

      if(tubesX < -52) {
        tubesX = 320;
        tubesY = -Math.random()*250;
        score = score + 1;
        score_label.text(score);
      }

      // check collision

      if(playerX >= tubesX && playerX <= tubesX+52) {
        if(playerY < 300+tubesY || playerY > 420+tubesY) {
          game_status = GAME_OVER;
        }
      }
    }

    if(game_status == GAME_OVER) {
      game_over.css('display', 'block');
      player.css('display', 'none');
      tubes.css('display', 'none');
      score = 0;
      score_label.text(score);
    }


  }, 1000/50);
});
