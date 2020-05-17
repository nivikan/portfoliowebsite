var Collectables = function(texture, texture2) {
	this.texture = texture;
	this.texture2 = texture2;

	this.list = [];
	this.startGap = -150;
	this.exitGap = 12;
	this.numRows = 4;
	this.zGap = 70;
	this.startGap = -120;
	this.instructionGap = -150;
	this.collected = 0;
	THREE.Object3D.apply(this, arguments);

	this.addCollectables();
};

Collectables.prototype = Object.create(THREE.Object3D.prototype);

Collectables.prototype.constructor = Collectables;

Collectables.prototype.addCollectables = function() {
	var special = false;
	var texture = this.texture;
	for (var i = 0; i < this.numRows; i++) {
		var zGap = this.instructionGap - (this.zGap * i - this.zGap / 2);
		this.list.push([]);

		for (var j = 0; j < 2; j++) {
			if (i > this.numRows - 2 && j == 1) {
				special = true;
				texture = this.texture2;
			}
			var zPos = zGap + THREE.Math.randFloatSpread(3);
			var coin = new collectable(
				texture,
				1,
				THREE.Math.randFloatSpread(20),
				0,
				zPos,
				special
			);
			if (special) this.specialCoin = coin;
			this.add(coin);

			this.list[i].push(coin);
		}
	}
};

Collectables.prototype.update = function(delta, pos, heroPos) {
	this.list[0][0].update(delta);
	this.specialCoin.update(delta);
	this.checkHits(heroPos);
	if (this.list[0][0].position.z > pos + this.exitGap) this.shuffle();
};

Collectables.prototype.checkHits = function(heroPos) {
	for (var j = 0; j < 2; j++) {
		p = this.list[0][j].position.clone();
		p.y = 0;
		if (p.z < heroPos.z && p.z > heroPos.z - 200) {
			dist = p.distanceTo(heroPos);
			if (dist < 2 && !this.list[0][j].collided) {
				this.collect(this.list[0][j]);
			}
		}
	}
};

Collectables.prototype.collect = function(item) {
	this.collected++;
	if (item.special) this.collected += 9;
	app.collectedCoins = this.collected;

	document.getElementById("js-coins").innerHTML = this.collected;

	if (app.isMute == false) {
		if (!item.special) {
			app.coinSounds[0].play();
			app.coinSounds.push(app.coinSounds.shift());
		} else {
			game.showPoints();
			app.coinSoundSpecial.play();
		}
	}
	item.collided = true;

	TweenMax.to(item.position, 0.3, {
		y: 5,
		onComplete: function() {
			item.position.y = 0;
		}
	});
};

Collectables.prototype.reset = function() {
	this.collected = 0;
	document.getElementById("js-coins").innerHTML = this.collected;

	for (var i = 0; i < this.numRows; i++) {
		var zGap = this.startGap - (this.zGap * i - this.zGap / 2);

		for (var j = 0; j < 2; j++) {
			var zPos = zGap - Math.random() * 3;
			this.list[i][j].collided = false;
			this.list[i][j].position.set(
				this.texture,
				THREE.Math.randFloatSpread(10),
				0,
				zPos
			);
		}
	}
};

Collectables.prototype.shuffle = function() {
	for (var i = 0; i < 2; i++) {
		var zPos =
			this.list[this.list.length - 1][0].position.z -
			this.zGap -
			+THREE.Math.randFloatSpread(3);

		this.list[0][i].position.set(THREE.Math.randFloatSpread(10), 0, zPos);

		this.list[0][i].collided = false;
	}

	this.list.push(this.list.shift());
};
