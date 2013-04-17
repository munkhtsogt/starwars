/* 
	Title: Canvas game tutorial
	Developer: Munkhtsogt Tsogbadrakh
	Date: 2013-04-16
	Email: munkhuu48@gmail.com
*/

(function($){

  $.fn.starwars = function( options )
  {
    var settings = $.extend(
    {
      width: '',
      height: ''
    }, options);
    
    return this.each(function()
    {
        var $this = $(this);
        var canvas = document.createElement('canvas');
      
        canvas.setAttribute('width', settings.width);
        canvas.setAttribute('height', settings.height);
      
        var ctx = canvas.getContext('2d');
        canvas.width=canvas.width;

		$this.empty();
        $this.append(canvas);
		
		// Prepare background
		var bgReady = false;
		var bgImage = new Image();
		bgImage.onload = function () {
	        bgReady = true;
        };
		bgImage.src = "src/img/background.png";
		
		var XWingReady = false;
		var XWingImage = new Image();
		XWingImage.onload = function(){
			XWingReady = true;	
		};
		XWingImage.src = "src/img/XWing.png";
		
		var XWLaserReady = false;
		var XWLaserImage = new Image();
		XWLaserImage.onload = function(){
			XWLaserReady = true;
		}
		XWLaserImage.src = "src/img/rebel_laser.png";
		
		var TIEFighterReady = false;
		var TIEFighterImage = new Image();
		TIEFighterImage.onload = function(){
			TIEFighterReady = true;
		}
		TIEFighterImage.src = "src/img/tie_fighter.png";
		
		var TIELaserReady = false;
		var TIELaserImage = new Image();
		TIELaserImage.onload = function(){
			TIELaserReady = true;
		}
		TIELaserImage.src = "src/img/empire_laser.png";
		
		var score = 0;
		
		var XWing = {
			speed: 256,
		};
		  
		var XWLaser = {};
		
		var TIEFighter = {
			dx: 5,
			dy: 10
		};
		
		var TIELaser = {};
		
		var keysDown = {};
		
		addEventListener("keydown", function (e) {
			keysDown[e.keyCode] = true;
		}, false);

		addEventListener("keyup", function (e) {
			delete keysDown[e.keyCode];
		}, false);	
		
		var main = function () {
			var now = Date.now();
			var delta = now - then;

			update(delta / 1000);
			render();

			XWing_shoot();
			TIE_shoot();
			
			// check collisions
			collision();
			
			then = now;
		};
		
		var render = function() {

			if(bgReady) {
				ctx.drawImage(bgImage, 0, 0);
			}
			if(XWingReady){
				ctx.drawImage(XWingImage, XWing.x, XWing.y);
			}	
			
			if(XWLaserReady){
				ctx.drawImage(XWLaserImage, XWLaser.x, XWLaser.y);
			}
			
			if(TIEFighterReady){
				ctx.drawImage(TIEFighterImage, TIEFighter.x, TIEFighter.y);
			}
			
			if(TIELaserReady){
				ctx.drawImage(TIELaserImage, TIELaser.x, TIELaser.y);
			}
			
			// Score
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "24px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("Score: " + score, 32, 32);
		};
		var flag = true;
		var update = function (modifier) {
		
			if (38 in keysDown) { // Player holding up
				XWing.y -= XWing.speed * modifier;
			}
			if (40 in keysDown) { // Player holding down
				XWing.y += XWing.speed * modifier;
			}
			if (37 in keysDown) { // Player holding left
				XWing.x -= XWing.speed * modifier;
			}
			if (39 in keysDown) { // Player holding right
				XWing.x += XWing.speed * modifier;
			}
			if (32 in keysDown) { // Player shooting
				// XWing laser initialized
				XWLaser.x = XWing.x + 30;
				XWLaser.y = XWing.y - 55;
			}
			
			// TIE fighter auto movement
			if (TIEFighter.x + TIEFighter.dx > canvas.width || TIEFighter.x + TIEFighter.dx < 0) {
				TIEFighter.dx = - TIEFighter.dx;
			}
				
			if (TIEFighter.y + TIEFighter.dy > canvas.height || TIEFighter.y + TIEFighter.dy < 0){
				TIEFighter.dy = - TIEFighter.dy;
			}
			TIEFighter.x += TIEFighter.dx;
			TIEFighter.y += TIEFighter.dy;
			
			if(flag){
				// TIE laser initialized
				TIELaser.x = TIEFighter.x + 30;
				TIELaser.y = TIEFighter.y + 55;
				flag = false;
			}
			
		}
		
		var XWing_shoot = function(){
			XWLaser.y -= 50;	
		}
		
		var TIE_shoot = function(){
			TIELaser.y += 50;
			if(TIELaser.y >= canvas.height) flag = true;
		}
		
		var collision = function(){
			if (
				XWing.x <= (TIELaser.x + 32) && TIELaser.x <= (XWing.x + 32)
				&& XWing.y <= (TIELaser.y + 32) && TIELaser.y <= (XWing.y + 32)
			){
				score--;
				initialize();
			}
			else if(
				TIEFighter.x <= (XWLaser.x + 32) && XWLaser.x <= (TIEFighter.x + 32)
				&& TIEFighter.y <= (XWLaser.y + 32) && XWLaser.y <= (TIEFighter.y + 32)
			){
				score++;
				initialize();
			}
		}
		
		var initialize = function(){
			XWing.x = canvas.width/2 - 65/2;
			XWing.y = canvas.height - 80;
			
			TIEFighter.x = 0;
			TIEFighter.y = 0;
		}
		
		// Start game
		initialize();
		var then = Date.now();
		setInterval(main, 33);
    });  
  };
  
}) (jQuery);    
