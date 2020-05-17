var Mountains = function(
	mountain1,
	mountain2,
	mountain3,
	mountain4,
	gong,
	gongPosition
) {
	this.models = [];
	this.models.push(mountain1, mountain2, mountain3, mountain4);
	this.models[0].scale.set(0.0125, 0.0125, 0.0125);
	this.models[1].scale.set(0.0125, 0.0125, 0.0125);
	this.models[2].scale.set(0.0125, 0.0125, 0.0125);
	this.models[3].scale.set(0.0125, 0.0125, 0.0125);

	this.gong = gong;
	this.numRows = 4;
	this.xGap = 3;
	this.zGap = 70;
	this.exitGap = -5;
	this.xSidePositions = [-9.5, -7.5, 7.5, 9.5];
	this.xMiddlePositions = [-5, -2.5, 0, 2.5, 5];
	this.middleLaneGaps = [-12, -9, -6, -3, 0, 3, 6, 9, 12];
	this.flyGaps = [];
	this.sizeH = 3 / 2;
	this.mountainList = [];
	this.offsets = [-2, 0, 2];
	this.easeUp = false;
	this.gonStart = -180;
	this.gonPos = -gongPosition;
	this.startGap = -120;
	this.instructionGap = -150;

	THREE.Object3D.apply(this, arguments);

	this.geometryCollider = new THREE.PlaneBufferGeometry(2, 3, 12);

	this.materialCollider = new THREE.MeshBasicMaterial({
		color: 0xffff00,
		side: THREE.DoubleSide,
		opacity: 0
	});

	this.initMountains2();
	this.addGong();
	this.addInstructions();
};

Mountains.prototype = Object.create(THREE.Object3D.prototype);

Mountains.prototype.constructor = Mountains;

Mountains.prototype.initMountains2 = function() {
	for (var i = 0; i < this.numRows; i++) {
		var list = [];

		this.middleLaneGaps = this.shuffle(this.middleLaneGaps);

		list.push(
			this.addMountain(
				this.middleLaneGaps[0],
				-Math.random() * 0.2,
				this.instructionGap - this.zGap * i
			)
		);
		list.push(
			this.addMountain(
				this.middleLaneGaps[1] - 100,
				-Math.random() * 0.2,
				this.instructionGap - this.zGap * i
			)
		);
		list.push(
			this.addMountain(
				this.middleLaneGaps[2] - 100,
				-Math.random() * 0.2,
				this.instructionGap - this.zGap * i
			)
		);
		list.push(
			this.addCollider(
				this.middleLaneGaps[0],
				-Math.random() * 0.2,
				this.instructionGap - this.zGap * i
			)
		);
		list.push(
			this.addCollider(
				this.middleLaneGaps[1] - 100,
				-Math.random() * 0.2,
				this.instructionGap - this.zGap * i
			)
		);
		list.push(
			this.addCollider(
				this.middleLaneGaps[2] - 100,
				-Math.random() * 0.2,
				this.instructionGap - this.zGap * i
			)
		);
		this.mountainList.push(list);
	}
};

Mountains.prototype.addInstructions = function() {
	this.tutorialOne = this.addMountain(0, -1, -50);
	this.tutorialTwo = this.addMountain(-2, -1, -70);
};

Mountains.prototype.removeInstructions = function() {
	this.remove(this.tutorialOne);
	this.remove(this.tutorialTwo);
};

Mountains.prototype.addMountain = function(x, y, z) {
	var mountain = this.models[
		Math.floor(Math.random() * this.models.length)
	].clone();
	mountain.position.set(x, y, z);
	mountain.rotation.y = 360 * Math.random() * (Math.PI / 180);
	this.add(mountain);

	return mountain;
};

Mountains.prototype.addCollider = function(x, y, z) {
	var plane = new THREE.Mesh(this.geometryCollider, this.materialCollider);
	plane.isCollider = true;
	plane.position.set(x, 0, z + this.sizeH);
	plane.visible = false;
	this.add(plane);

	return plane;
};

Mountains.prototype.addGong = function() {
	this.gong.children[0].material.fog = true;
	this.gong.scale.set(0.1, 0.1, 0.1);
	this.gong.position.y = 0.5;
	this.gong.position.z = this.gonPos;
	this.add(this.gong);
};

Mountains.prototype.update = function(pos) {
	if (pos > -5500) {
		var percent = Math.abs((pos + 5500) / 5500);
		var sc = 0.02 + 0.5 * percent;
		this.gong.scale.set(sc, sc, sc);
	}
	if (this.mountainList[0][0].position.z > pos + this.exitGap) {
		var zPos =
			this.mountainList[this.mountainList.length - 1][0].position.z -
			this.zGap;
		if (zPos < this.gonPos + 150) return;

		this.mountainList[0][0].position.z = zPos;
		this.mountainList[0][1].position.z = zPos;
		this.mountainList[0][2].position.z = zPos;
		this.mountainList[0][3].position.z = zPos + this.sizeH;
		this.mountainList[0][4].position.z = zPos + this.sizeH;
		this.mountainList[0][5].position.z = zPos + this.sizeH;

		this.middleLaneGaps = this.shuffle(this.middleLaneGaps);
		this.mountainList[0][0].position.x = this.middleLaneGaps[0];
		this.mountainList[0][1].position.x = this.middleLaneGaps[1];
		this.mountainList[0][2].position.x = this.middleLaneGaps[2];
		this.mountainList[0][3].position.x = this.middleLaneGaps[0];
		this.mountainList[0][4].position.x = this.middleLaneGaps[1];
		this.mountainList[0][5].position.x = this.middleLaneGaps[2];
		if (pos > -1000) {
			this.mountainList[0][1].position.x = this.middleLaneGaps[1] - 100;
			this.mountainList[0][2].position.x = this.middleLaneGaps[2] - 100;
			this.mountainList[0][4].position.x = this.middleLaneGaps[1] - 100;
			this.mountainList[0][5].position.x = this.middleLaneGaps[2] - 100;
		} else if (pos > -3000) {
			this.mountainList[0][2].position.x = this.middleLaneGaps[2] - 100;
			this.mountainList[0][5].position.x = this.middleLaneGaps[2] - 100;
		}
		this.mountainList.push(this.mountainList.shift());
	}
};

Mountains.prototype.reset = function() {
	for (var i = 0; i < this.numRows; i++) {
		for (var x = 0; x < this.mountainList[0].length; x++) {
			this.mountainList[i][x].position.z = -120 - this.zGap * i;
			this.mountainList[i][x].collided = false;

			if (x < 3)
				this.mountainList[i][x].position.y = -Math.random() * 0.8;
			else this.mountainList[i][x].collided = false;
		}

		this.mountainList[i][1].position.x = -100;
		this.mountainList[i][2].position.x = -100;
		this.mountainList[i][4].position.x = -100;
		this.mountainList[i][5].position.x = -100;
	}
};

Mountains.prototype.shuffle = function(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};
