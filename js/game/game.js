var game = {
	soundPlaying: false,
	MaxSpeed: 2,

	startSpeed: 1.2,
	startTime: Date.now(),
	alive: true,
	timeDifficulty: 30,
	cameraInitY: 2,
	touchList: [],
	totalMeters: 6000,
	tutorial: true,
	leftTutorial: true,
	rightTtutorial: false,
	played: false,

	init: function() {
		game.setProgressBar();
		if (game.played) {
			game.reset();
			return;
		}
		game.played = true;
		//game.startSpeed;
		game.speed = 1.2;
		//game.initStats();
		game.initScene();
		game.initLights();
		game.initWorld();
		game.initComboPoint();
		game.initControls();
		game.update();
		game.setTutorialAnims();

		game.onWindowResize();
		//game.speedIncreaseAnim = TweenMax.to( game, game.timeDifficulty, { speed : game.MaxSpeed } )
	},

	playGame: function() {
		game.onWindowResize();
		TweenMax.to(game, 0.4, {
			delay: 0.2,
			speed: game.startSpeed,
			onComplete: function() {
				game.mountains.removeInstructions();
				game.tutorial = false;
				game.snow.fadeIn();
				game.speedIncreaseAnim = TweenMax.to(
					game,
					game.timeDifficulty,
					{ speed: game.MaxSpeed }
				);
			}
		});
	},

	initStats: function() {
		game.stats = new Stats();
		document.body.appendChild(game.stats.dom);
	},

	initScene: function() {
		game.sceneHeight = window.innerHeight;
		if (Detectizr.device.type == "desktop") {
			game.sceneWidth = $("#js-game-screen").width();
		} else {
			game.sceneWidth = window.innerWidth;
			if (game.sceneWidth > 600) game.sceneWidth = 600;
		}
		game.clock = new THREE.Clock();

		game.scene = new THREE.Scene();
		//color or using texture;
		// game.scene.background = new THREE.Color(0x152885);
		game.scene.background = game.skybackdrop;

		game.scene.fog = new THREE.Fog(0x152885, 5, 250);

		game.camera = new THREE.PerspectiveCamera(
			26,
			game.sceneWidth / game.sceneHeight,
			0.01,
			6000
		);
		game.camera.position.set(0, game.cameraInitY, -10);
		game.camera.rotation.set(-0.13975553616942016, 0, 0);
		game.renderer = new THREE.WebGLRenderer({
			alpha: false,
			antialias: false
		});

		game.renderer.setSize(game.sceneWidth, game.sceneHeight);
		game.renderer.setPixelRatio(window.devicePixelRatio ? 1.5 : 1);

		game.renderer.gammaInput = true;
		game.renderer.gammaOutput = true;

		document
			.getElementById("js-game-screen")
			.appendChild(game.renderer.domElement);

		window.addEventListener("resize", game.onWindowResize, false);
		game.scene.add(game.camera);
	},

	initLights: function() {
		/////////////////////////////////////////
		//AMBIENT
		/////////////////////////////////////////

		game.ambientLight = new THREE.AmbientLight(0xcccccff, 1);
		game.scene.add(game.ambientLight);

		/////////////////////////////////////////
		//DIRECTIONAL
		/////////////////////////////////////////

		game.spotLight = new THREE.SpotLight(0xa5bedc, 0.1);
		game.spotLight.position.set(-165, 188, 12);
		game.spotLight.rotation.set(0, 1, 0);
		game.spotLight.angle = 0.8;
		game.spotLight.penumbra = 0.05;
		game.spotLight.decay = 2;
		game.spotLight.distance = 0;
		game.spotLight.castShadow = true;
		game.spotLight.shadow.mapSize.width = 1024;
		game.spotLight.shadow.mapSize.height = 1024;
		game.spotLight.shadow.camera.near = 10;
		game.spotLight.shadow.camera.far = 300;
		game.scene.add(game.spotLight);
		//	game.lightHelper = new THREE.SpotLightHelper( game.spotLight );
		//	game.scene.add( game.lightHelper );
		game.lightZ = game.spotLight.position.z;
	},

	initWorld: function() {
		game.gameGroup = new THREE.Object3D();
		game.scene.add(game.gameGroup);

		game.initClouds();
		game.initHero();
		game.initMountain();
		game.initCollectables();

		////////////////
		//SNOW
		game.snow = new snowStorm(game.snowMap, 0.5, 0, 0, 0);
		game.gameGroup.add(game.snow);
		game.resizeSnow();
	},

	initClouds: function() {
		game.cloud = new Clouds(game.cloudMap);
		game.cloud.position.z = -12;
		game.cloud.position.y = -8;
		game.gameGroup.add(game.cloud);
	},

	initHero: function() {
		game.hero = new HeroSprite(game.heroMap);
		game.hero.frame = 5;

		game.hero.scale.set(1.5, 1.5 * 0.6);
		game.gameGroup.add(game.hero);
		game.hero.position.z = game.camera.position.z - 10;
		game.hero.position.y = 0;
	},

	initComboPoint: function() {
		game.combo = new collectable(game.collectableMap3, 1, 0, 0, 0, true);
		game.combo.tileDisplayDuration = 55;
		game.scene.add(game.combo);
		game.combo.visible = false;
	},

	showPoints: function() {
		game.combo.visible = true;
		TweenMax.fromTo(
			game.combo.material,
			0.4,
			{ opacity: 0 },
			{ opacity: 1 }
		);
		TweenMax.fromTo(game.combo.position, 0.4, { y: -3 }, { y: 0 });
		TweenMax.delayedCall(1, function() {
			TweenMax.fromTo(
				game.combo.material,
				0.4,
				{ opacity: 1 },
				{ opacity: 0 }
			);
			TweenMax.fromTo(
				game.combo.position,
				0.4,
				{ y: 0 },
				{
					y: 3,
					onComplete: function() {
						game.combo.visible = false;
					}
				}
			);
		});
	},

	initCollectables: function() {
		game.collectables = new Collectables(
			game.collectableMap,
			game.collectableMap2
		);
		game.gameGroup.add(game.collectables);
	},

	initMountain: function() {
		var geometry = new THREE.PlaneGeometry(2000, 2000, 32);
		var material = new THREE.MeshBasicMaterial({
			color: 0xa5bedc,
			side: THREE.DoubleSide
		});
		game.floor = new THREE.Mesh(geometry, material);
		//game.floor.positon
		game.gameGroup.add(game.floor);
		game.floor.position.z = -10;

		game.floor.rotation.x = 90 * (Math.PI / 180);
		game.floor.position.y = -7;

		game.mountains = new Mountains(
			game.masterMountain1,
			game.masterMountain2,
			game.masterMountain3,
			game.masterMountain4,
			game.masterGong,
			game.totalMeters
		);
		game.gameGroup.add(game.mountains);
	},

	initSounds: function() {
		game.soundPlaying = true;
		//	game.skydiveSound = new Audio("assets/sounds/skydive.mp3")
		//	game.skydiveSound.loop = true;
	},

	initControls: function() {
		if (Detectizr.device.type != "desktop") {
			document.addEventListener("touchstart", game.onFingerDown);
			document.addEventListener("touchend", game.onFingerUp);
		} else {
			document.addEventListener("keyup", game.onKeyUp);
			document.addEventListener("keydown", game.onKeyDown);
		}
	},

	setTutorialAnims: function() {
		if (Detectizr.device.type == "desktop") {
			game.leftAnim = TweenMax.to(
				"#js-instruction-desktop-left img",
				0.3,
				{ scale: 1.2, force3D: false, yoyo: true, repeat: -1 }
			);
			game.rightAnim = TweenMax.to(
				"#js-instruction-desktop-right img",
				0.3,
				{ scale: 1.2, force3D: false, yoyo: true, repeat: -1 }
			);
		} else {
			game.leftAnim = TweenMax.to(
				"#js-instruction-mobile-left img",
				0.3,
				{ scale: 1.2, force3D: false, yoyo: true, repeat: -1 }
			);
			game.rightAnim = TweenMax.to(
				"#js-instruction-mobile-right img",
				0.3,
				{ scale: 1.2, force3D: false, yoyo: true, repeat: -1 }
			);
		}
	},

	onFingerMove: function(event) {
		var touchX = event.touches[event.touches.length - 1].clientX;

		var direction = "";

		if (touchX < window.innerWidth && touchX > window.innerWidth / 2)
			direction = "right";
		else direction = "left";

		if (direction != game.touchList[0]) {
			game.touchList[0] = direction;
		}
	},

	resizeSnow: function() {
		var vFOV = game.camera.fov * Math.PI / 180;
		var GLheight = 2 * Math.tan(vFOV / 2) * 1;

		var hFOV = 2 * Math.atan(Math.tan(vFOV / 2) * game.camera.aspect);
		var GLwidth = 2 * Math.tan(hFOV / 2) * 1;

		game.snow.scale.y = GLheight * game.camera.aspect * 2;
		game.snow.scale.x = GLheight * game.camera.aspect * 2;
	},

	setProgressBar: function() {
		//$(".game-ui-progress").css("margin-right", ($("#js-TTAndSoundToggle").width()/2 + parseInt($("#js-TTAndSoundToggle").css("margin-right"), 10))-($(".game-ui-progress").width()/1.4)+"px");
	},

	onWindowResize: function() {
		game.setProgressBar();
		game.camera.aspect = $(".game").width() / window.innerHeight;
		game.camera.updateProjectionMatrix();

		game.renderer.setSize($(".game").width(), window.innerHeight);
		game.resizeSnow();
	},

	onFingerDown: function(event) {
		if (!game.alive) return;
		// event.touches[ event.touches.length-1 ].clientX;
		var touchX = event.changedTouches[0].clientX;

		if (game.tutorial) {
			if (touchX < window.innerWidth && touchX > window.innerWidth / 2) {
				if (!game.leftTutorial && game.rightTutorial) {
					game.right = true;
					game.speed = 0.3;
					game.playGame();
					game.rightTutorial = false;
				}
			}
			if (touchX > 0 && touchX < window.innerWidth / 2) {
				if (game.leftTutorial && game.hero.position.z < -30) {
					game.left = true;
					game.speed = 0.3;
					game.leftTutorial = false;
					game.rightTutorial = true;
				}
			}
			return;
		}

		if (touchX < window.innerWidth && touchX > window.innerWidth / 2) {
			game.touchList.push(["right", event.changedTouches[0].identifier]);
		} else if (touchX > 0 && touchX < window.innerWidth / 2) {
			game.touchList.push(["left", event.changedTouches[0].identifier]);
		}
	},

	onFingerUp: function(event) {
		if (game.tutorial) return;
		for (var j = 0; j < event.changedTouches.length; j++) {
			for (var i = 0; i < game.touchList.length; i++) {
				if (
					game.touchList[i][1] == event.changedTouches[j].identifier
				) {
					game.touchList.splice(i, 1);
					i = game.touchList.length;
				}
			}
		}

		//}
	},

	onKeyDown: function(event) {
		if (!game.alive) return;

		if (!game.soundPlaying) game.initSounds();

		if (game.tutorial) {
			switch (event.keyCode) {
				case 39:
					if (!game.leftTutorial && game.rightTutorial) {
						game.right = true;
						game.speed = 0.3;
						game.playGame();
						game.rightTutorial = false;
					}
					break;

				case 37:
					if (game.leftTutorial) {
						game.left = true;
						game.speed = 0.3;
						game.leftTutorial = false;
						game.rightTutorial = true;
					}
					break;
			}

			return;
		}

		switch (event.keyCode) {
			case 39:
				game.right = true;
				break;
			case 37:
				game.left = true;
				break;
		}
	},

	onKeyUp: function(event) {
		switch (event.keyCode) {
			case 39:
				game.right = false;
				break;
			case 37:
				game.left = false;
				break;
		}
	},

	counter: 0,

	reset: function() {
		game.clock = new THREE.Clock();
		game.right = false;
		game.left = false;
		game.speed = game.startSpeed;
		game.alive = true;
		game.completed = false;
		game.camera.position.z = 0;
		game.hero.position.z = game.camera.position.z - 7;
		game.camera.position.x = game.hero.position.x = 0;
		game.touchList = [];
		game.hero.reset();
		game.mountains.reset();
		game.cloud.reset();
		game.collectables.reset();
		game.speedIncreaseAnim.kill();
		game.speed = 1;
		game.speedIncreaseAnim = TweenMax.to(game, game.timeDifficulty, {
			speed: game.MaxSpeed
		});
		//game.gong = false;
		game.update();
		app.collectedCoins = 0;
	},

	pauseGame: function() {
		game.isPaused = true;
		game.speedIncreaseAnim.pause();
		window.cancelAnimationFrame(game.req);
	},

	unPauseGame: function() {
		game.isPaused = false;
		game.speedIncreaseAnim.play();
		game.pause = true;
		game.clock = new THREE.Clock();
		game.update();
	},

	update: function() {
		//if(game.pause) return;
		if (!game.alive) {
			game.onGameOver();
			//game.reset();
			return;
		}
		if (game.completed) {
			game.alive = false;
			game.onGameComplete();

			return;
		}

		if (Detectizr.device.type != "desktop") game.checkHeroDirection();
		//game.mountains.gong.rotation.y+=0.1
		//game.mountains.gong.rotation.y+=0.1

		var delta = game.clock.getDelta();

		game.moveHero(delta);
		game.mountains.update(game.camera.position.z);

		if (!game.tutorial) game.cloud.update(game.camera.position.z, delta);

		game.moveCamera();
		if (!game.tutorial) game.checkHeroColission2();
		if (!game.tutorial)
			game.snow.update(game.camera.position, delta * 1000);
		//Snow.animateParticleSystem(game.camera.position.z);
		/////////
		//COLLECTABLE
		game.combo.position.z = game.hero.position.z - 10;
		game.combo.position.x = game.hero.position.x;
		game.combo.update(delta * 1000);
		/////////////////////////////////////////////////
		game.updateScore();

		game.checkGameComplete();

		if (game.tutorial) game.checkTutorial();

		game.render();

		//game.stats.update();

		game.floor.position.z = game.hero.position.z - 10;
		// game.lightZ;
		game.spotLight.position.z = 220;

		//game.lightHelper.update();

		game.collectables.update(
			delta * 1000,
			game.camera.position.z,
			game.hero.position
		);

		game.updateMigoPosition();

		game.req = requestAnimationFrame(game.update);
	},

	checkTutorial: function() {
		if (
			game.hero.position.z < -40 &&
			game.hero.position.z > -41 &&
			game.leftTutorial
		) {
			game.leftTutorial = true;
			if (Detectizr.device.type == "desktop")
				$("#js-instruction-desktop").removeClass("hidden");
			else $("#js-instruction-mobile").removeClass("hidden");
			game.speed = 0;
		}
		if (game.hero.position.z < -43 && game.hero.position.z > -44) {
			game.left = false;
			if (Detectizr.device.type == "desktop")
				$("#js-instruction-desktop-left").addClass("hidden");
			else $("#js-instruction-mobile-left").addClass("hidden");
		}
		if (
			game.hero.position.z < -60 &&
			game.hero.position.z > -61 &&
			game.rightTutorial
		) {
			if (Detectizr.device.type == "desktop")
				$("#js-instruction-desktop-right").removeClass("hidden");
			else $("#js-instruction-mobile-right").removeClass("hidden");
			game.speed = 0;
		}
		if (game.hero.position.z < -63 && game.hero.position.z > -64.5) {
			game.right = false;
			$("#js-instruction-desktop").addClass("hidden");
			$("#js-instruction-mobile").addClass("hidden");
		}
	},

	updateMigoPosition: function() {
		var percent = (1 + game.hero.position.z / game.totalMeters) * 95;
		$("#js-migoProgress").css("top", percent + "%");
	},

	checkHeroDirection: function() {
		if (game.tutorial) return;
		if (game.touchList.length < 1) {
			game.right = false;
			game.left = false;
			return;
		}
		game.right = false;
		game.left = false;
		var dir = game.touchList[game.touchList.length - 1][0];
		//	console.log(game.touchList )
		if (dir == "right") game.right = true;
		else game.left = true;
	},

	checkGameComplete: function() {
		if (game.hero.position.z < game.mountains.gong.position.z + 5)
			game.completed = true;
	},

	moveClouds: function() {
		var elapsedMilliseconds = Date.now() - game.startTime;
		var elapsedSeconds = elapsedMilliseconds / 1000.0;
		game.materialCloud.uniforms.time.value = 60.0 * elapsedSeconds;
		game.clouds.position.z = game.camera.position.z - 10;
	},

	moveHero: function(delta) {
		if (game.right) {
			game.hero.moveRight();
		} else if (game.left) {
			game.hero.moveLeft();
		} else {
			game.hero.slowDown();
		}

		game.hero.position.x += delta * game.hero.glideSpeedX;
		game.camera.position.x += delta * game.hero.glideSpeedX * 0.98;
		//game.camera.rotation.z = (delta * game.hero.glideSpeedX)*0.1;
		game.hero.position.z -= game.speed;

		game.hero.update(delta * 1000);
	},

	checkHeroColission2: function() {
		var distH = 2;
		if (game.speed > 1.9) distH = 2.4;

		for (i = 0; i < game.mountains.mountainList[0].length; i++) {
			if (game.mountains.mountainList[0][i].isCollider) {
				p = game.mountains.mountainList[0][i].position.clone();
				p.y = 0; //ignore tree height
				//p.add(app.gameGroup.position);

				//can only hit trees if they are in front of you
				if (
					p.z < game.hero.position.z &&
					p.z > game.hero.position.z - 200
				) {
					dist = p.distanceTo(game.hero.position);
					if (
						dist < distH &&
						!game.mountains.mountainList[0][i].collided
					) {
						//GAME OVER
						game.alive = false;
						return;
					}
				}
			}
		}
	},

	moveCamera: function() {
		game.counter++;
		// game.camera.position.y = game.cameraInitY + ( 0.1 * Math.sin(game.counter/80)) ;
		//remove floatying camera
		game.camera.position.y = game.cameraInitY;
		game.camera.position.z = game.hero.position.z + 7;
	},

	updateScore: function() {
		if (game.distance === -Math.floor(game.camera.position.z)) return;
		game.distance = -Math.floor(game.camera.position.z);
		//document.getElementById("distance").innerHTML =  - Math.floor( game.camera.position.z) +" Meters";
	},

	render: function() {
		game.renderer.render(game.scene, game.camera);
	}
};
