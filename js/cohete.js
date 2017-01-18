var width=$(document).width();
var height=$(document).height();

var heightScreen=$(window).height();

console.log(width); console.log(height);console.log(heightScreen);

var game = new Phaser.Game(width, height, Phaser.AUTO, 'canvasNave', { preload: preload, create: create }, true);

function preload() {

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.load.image('nave', 'img/cohete.svg', 300, 300);
		game.load.image('logo', 'img/cohete_blanco.svg', 300, 300);

}


function create() {

	posY=height-200;
	posX=this.game.width-200;

	i=0;

	animations=[{angle:-50}, {y:posY, x:100},{angle:50}, {y:posY, x:this.game.width-200},{angle:0}];

	nave=game.add.sprite(this.game.width-200, this.game.height-200, 'nave');
	nave.pivot.x=nave.width/2;
	nave.pivot.y=nave.height/2;

	logo=game.add.sprite(width/2-45, 50, 'logo');
	logo.alpha=0;

	self=this;




	nave.angle=0;

	game.input.mouse.mouseWheelCallback = mouseWheel;



}

	function mouseWheel(event) {

 		randomX=game.rnd.between(0, 1);


		if(game.input.mouse.wheelDelta < 0){

			if(posY<height-200){
				posY=posY+100;

				tweenNave =game.add.tween(nave).to( {angle:-180},500, "Linear");
				tweenNave.start();

			}

		}else{

			if(posY>300){

					posY=posY-100;
					tweenNave =game.add.tween(nave).to( {angle:0},500, "Linear");
					tweenNave.start();
			}

		}





		console.log(posY);

		if(i>= animations.length){
			i=0;
		}

		if(posY<1000){

			if(posX!=100){
				tweenNaveToTop =game.add.tween(nave).to( {angle:45},500, "Linear");
			}else{
				tweenNaveToTop =game.add.tween(nave).to( {angle:45},500, "Linear");
				console.log("entra");
			}


			tweenNaveToTop.start();

			tweenNave =  game.add.tween(nave).to( {x:width/2, y:100},500, "Linear");
			tweenNaveAlpha=game.add.tween(nave).to( {alpha:0},500, "Linear");
			tweenNave.start();
			tweenNaveAlpha.start();

			tweenNave.onComplete.addOnce(function(){
						tweenLogo =  game.add.tween(logo).to( {alpha:1},500, "Linear");
						tweenLogo.start();
			});


		}else{

			tweenLogo =  game.add.tween(logo).to( {alpha:0},500, "Linear");
			tweenLogo.start();

			tweenNave =  game.add.tween(nave).to(  {y:posY, x:posX},500, "Linear");
			tweenNaveAlpha=game.add.tween(nave).to( {alpha:1},500, "Linear");


			console.log(game.input.mouse.wheelDelta);

			tweenNave.start();
			tweenNaveAlpha.start();


		}


		if(randomX==1){

			posX=100;

		}else{

			posX=width-200;
		}



	}
