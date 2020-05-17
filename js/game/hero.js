var HeroSprite = function(heroMap) {
	this.limit = 12;
	this.maxSpeed = 20;
	this.glideSpeedX = 0;
	this.glideAccel = 2;

	this.tileDisplayDuration = 10;
	this.mapColumns = 6;
	this.mapRows = 11;
	this.state = "iddle";

	this.right = [
		[2, 6],
		[1, 6],
		[0, 6],
		[5, 7],
		[4, 7],
		[3, 7],
		[2, 7],
		[1, 7],
		[0, 7],
		[5, 8],
		[4, 8],
		[3, 8],
		[2, 8],
		[1, 8],
		[0, 8],
		[5, 9]
	];
	this.rightFrame = 0;
	this.rightIddle = [
		[4, 9],
		[3, 9],
		[2, 9],
		[1, 9],
		[0, 9],
		[5, 10],
		[4, 10],
		[3, 10],
		[2, 10],
		[1, 10],
		[0, 10]
	];

	this.iddle = [
		[3, 6],
		[4, 6],
		[5, 6],
		[0, 5],
		[1, 5],
		[2, 5],
		[3, 5],
		[4, 5],
		[5, 5],
		[0, 4],
		[1, 4]
	];

	this.left = [
		[2, 4],
		[3, 4],
		[4, 4],
		[5, 4],
		[0, 3],
		[1, 3],
		[2, 3],
		[3, 3],
		[4, 3],
		[5, 3],
		[0, 2],
		[1, 2],
		[2, 2],
		[3, 2],
		[4, 2],
		[5, 2]
	];
	this.leftFrame = 0;
	this.leftIddle = [
		[0, 1],
		[1, 1],
		[2, 1],
		[3, 1],
		[4, 1],
		[5, 1],
		[0, 0],
		[1, 0],
		[2, 0],
		[3, 0],
		[4, 0]
	];

	this.currentDisplayTime = 0;

	var map = heroMap;

	var spriteMaterial = new THREE.SpriteMaterial({
		map: map,
		color: 0xffffff,
		opacity: 1,
		transparent: true
	});
	spriteMaterial.map.wrapS = spriteMaterial.map.wrapT = THREE.RepeatWrapping;

	spriteMaterial.map.repeat.set(1 / this.mapColumns, 1 / this.mapRows);
	spriteMaterial.map.offset.x = 0 / this.mapColumns;
	spriteMaterial.map.offset.y = 4 / this.mapRows;

	THREE.Sprite.apply(this, arguments);
	this.material = spriteMaterial;
};

HeroSprite.prototype = Object.create(THREE.Sprite.prototype);

HeroSprite.prototype.constructor = HeroSprite;

HeroSprite.prototype.update = function(delta) {
	switch (this.state) {
		case "iddle":
			this.iddleAnim(delta);
			break;
		case "right":
			this.dirAnim(delta, "rightFrame", this.right, this.rightIddle);
			break;
		case "left":
			this.dirAnim(delta, "leftFrame", this.left, this.leftIddle);
			break;
	}
};

HeroSprite.prototype.iddleAnim = function(delta) {
	if (this.rightFrame > 0) {
		this.anim(delta, "rightFrame", this.right, -1);
	} else {
		if (this.leftFrame > 0) this.anim(delta, "leftFrame", this.left, -1);
		else this.animLoop(delta, this.iddle);
	}
};

HeroSprite.prototype.dirAnim = function(delta, frame, anim, iddleAnim) {
	if (frame == "rightFrame" && this.leftFrame > 1) {
		this.anim(delta, "leftFrame", this.left, -1);
		return;
	}
	if (frame == "leftFrame" && this.rightFrame > 1) {
		this.anim(delta, "rightFrame", this.right, -1);
		return;
	}

	if (this[frame] < anim.length - 1) this.anim(delta, frame, anim, 1);
	else this.animLoop(delta, iddleAnim);
};

HeroSprite.prototype.anim = function(delta, frame, anim, dir) {
	this.currentDisplayTime += delta;

	while (this.currentDisplayTime > this.tileDisplayDuration) {
		this.currentDisplayTime -= this.tileDisplayDuration;
		this.material.map.offset.x = anim[this[frame]][0] / this.mapColumns;
		this.material.map.offset.y = anim[this[frame]][1] / this.mapRows;

		this[frame] += dir;

		if (this[frame] < 0) this[frame] = 0;

		if (this[frame] > anim.length - 1) this[frame] = anim.length - 1;
	}
};

HeroSprite.prototype.animLoop = function(delta, anim) {
	this.currentDisplayTime += delta;

	while (this.currentDisplayTime > this.tileDisplayDuration) {
		this.currentDisplayTime -= this.tileDisplayDuration;
		this.material.map.offset.x = anim[0][0] / this.mapColumns;
		this.material.map.offset.y = anim[0][1] / this.mapRows;
		anim.push(anim.shift());
	}
};

HeroSprite.prototype.moveRight = function() {
	this.state = "right";
	if (this.position.x < this.limit) {
		this.glideSpeedX += this.glideAccel;
		this.glideSpeedX = Math.min(this.glideSpeedX, this.maxSpeed);
	} else {
		this.glideSpeedX = -this.glideSpeedX;
	}
};

HeroSprite.prototype.reset = function() {
	this.leftFrame = 0;
	this.rightFrame = 0;
	this.state = "iddle";
	this.glideSpeedX = 0;
};

HeroSprite.prototype.moveLeft = function() {
	this.state = "left";
	if (this.position.x > -this.limit) {
		this.glideSpeedX -= this.glideAccel;
		this.glideSpeedX = Math.max(this.glideSpeedX, -this.maxSpeed);
	} else {
		this.glideSpeedX = -this.glideSpeedX;
	}
};

HeroSprite.prototype.slowDown = function() {
	this.state = "iddle";
	this.glideSpeedX *= 0.8;
};
