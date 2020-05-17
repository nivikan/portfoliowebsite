var snowStorm = function(map, scale, x, y, z) {
	////////////////////////////////////////////////////////////////////
	///Animation
	////////////////////////////////////////////////////////////////////

	this.frames = [
		[0, 3],
		[1, 3],
		[2, 3],
		[3, 3],
		[0, 2],
		[1, 2],
		[2, 2],
		[3, 2],
		[0, 1],
		[1, 1],
		[2, 1],
		[3, 1],
		[0, 0],
		[1, 0],
		[2, 0],
		[3, 0]
	];
	this.currentDisplayTime = 0;
	this.mapRows = 4;
	this.mapColumns = 4;
	this.frame = Math.floor(Math.random() * (this.frames.length - 1));
	this.currentDisplayTime = 0;
	this.tileDisplayDuration = 25;

	////////////////////////////////////////////////////////////////////

	THREE.Sprite.apply(this, arguments);
	this.initialScale = scale;

	this.scale.set(this.initialScale, this.initialScale);

	////////////////////////////////////////////////////////////////////
	///Material
	////////////////////////////////////////////////////////////////////

	this.material = new THREE.SpriteMaterial({
		map: map,
		color: 0xffffff,
		opacity: 0,
		blending: THREE.AdditiveBlending,
		transparent: true,
		fog: false
	});
	this.material.map.wrapS = this.material.map.wrapT = THREE.RepeatWrapping;

	this.material.map.repeat.set(1 / this.mapColumns, 1 / this.mapRows);
	this.material.map.offset.x = 0 / this.mapColumns;
	this.material.map.offset.y = 0 / this.mapRows;

	////////////////////////////////////////////////////////////////////
	this.renderDepth = -1;
};

snowStorm.prototype = Object.create(THREE.Sprite.prototype);

snowStorm.prototype.constructor = snowStorm;

snowStorm.prototype.update = function(pos, delta) {
	this.position.set(pos.x, 1.9, pos.z - 1);

	this.animate(delta);
};

snowStorm.prototype.animate = function(delta) {
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

snowStorm.prototype.fadeIn = function() {
	TweenMax.fromTo(this.material, 5, { opacity: 0 }, { opacity: 1 });
};

snowStorm.prototype.checkAnimationLimits = function() {
	if (this.frame > this.frames.length - 1) {
		this.frame = 0;
	}
};
