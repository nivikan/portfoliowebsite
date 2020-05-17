var collectable = function(map, scale, x, y, z, special) {
	////////////////////////////////////////////////////////////////////
	///Animation
	////////////////////////////////////////////////////////////////////
	this.special = special;

	if (this.special) {
		this.frames = [
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
			[4, 0],
			[5, 0],
			[6, 0],
			[7, 0],
			[8, 0],
			[9, 0],
			[10, 0],
			[11, 0],
			[12, 0],
			[13, 0]
		];

		this.currentDisplayTime = 0;
		this.mapRows = 1;
		this.mapColumns = 14;
	} else {
		this.frames = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]];
		this.currentDisplayTime = 0;
		this.mapRows = 1;
		this.mapColumns = 7;
	}

	this.frame = Math.floor(Math.random() * (this.frames.length - 1));
	this.currentDisplayTime = 0;
	this.tileDisplayDuration = 35;

	////////////////////////////////////////////////////////////////////

	THREE.Sprite.apply(this, arguments);
	this.initialScale = scale;

	this.scale.set(this.initialScale, this.initialScale);

	this.position.set(x, y, z);

	////////////////////////////////////////////////////////////////////
	///Material
	////////////////////////////////////////////////////////////////////

	this.material = new THREE.SpriteMaterial({
		map: map,
		color: 0xffffff,
		opacity: 1,
		transparent: true,
		fog: true
	});
	this.material.map.wrapS = this.material.map.wrapT = THREE.RepeatWrapping;

	this.material.map.repeat.set(1 / this.mapColumns, 1 / this.mapRows);
	this.material.map.offset.x = 0 / this.mapColumns;
	this.material.map.offset.y = 0 / this.mapRows;

	////////////////////////////////////////////////////////////////////
};

collectable.prototype = Object.create(THREE.Sprite.prototype);

collectable.prototype.constructor = collectable;

collectable.prototype.update = function(delta) {
	//this.position.set(pos.x,1.9,pos.z-1);

	this.animate(delta);
};

collectable.prototype.animate = function(delta) {
	if (!this.visible) return;

	this.currentDisplayTime += delta;

	while (this.currentDisplayTime > this.tileDisplayDuration) {
		this.checkAnimationLimits();

		this.currentDisplayTime -= this.tileDisplayDuration;
		this.material.map.offset.x =
			this.frames[this.frame][0] / this.mapColumns;
		this.material.map.offset.y = this.frames[this.frame][1] / this.mapRows;

		this.frame += 1;
	}
};

collectable.prototype.checkAnimationLimits = function() {
	if (this.frame > this.frames.length - 1) {
		this.frame = 0;
	}
};
