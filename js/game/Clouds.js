var Clouds = function(texture) {
	this.texture = texture;
	this.exitGap = 20;
	this.counter = 0;
	THREE.Object3D.apply(this, arguments);
	this.easeUp = false;
	this.addClouds();
};

Clouds.prototype = Object.create(THREE.Object3D.prototype);

Clouds.prototype.constructor = Mountains;

Clouds.prototype.addClouds = function() {
	var instances = 55;

	var bufferGeometry = new THREE.PlaneBufferGeometry(5, 5, 1);

	// material
	this.materialCloud = new THREE.RawShaderMaterial({
		uniforms: {
			map: {
				value: new THREE.TextureLoader().load(
					"assets/textures/cloud256.png"
				)
			},
			fogColor: { type: "c", value: game.scene.fog.color },
			fogNear: { type: "f", value: game.scene.fog.near },
			fogFar: { type: "f", value: game.scene.fog.far }
		},

		vertexShader: document.getElementById("vertexShader").textContent,
		fragmentShader: document.getElementById("fragmentShader").textContent,
		transparent: true,
		depthTest: true,
		depthWrite: false
	});

	this.list = [];
	var geoms = [];
	for (var j = 0; j < 4; j++) {
		var geometry = new THREE.InstancedBufferGeometry();
		geometry.index = bufferGeometry.index;
		geometry.attributes.position = bufferGeometry.attributes.position;
		geometry.attributes.uv = bufferGeometry.attributes.uv;

		var offsets = [];

		var x, y, z;
		for (var i = 0; i < instances; i++) {
			// offsets
			x = THREE.Math.randFloatSpread(45);
			y = 4 + Math.random() * 2;
			z = -Math.random() * 8;

			offsets.push(x, y, z);
		}
		offsetAttribute = new THREE.InstancedBufferAttribute(
			new Float32Array(offsets),
			3
		);

		geometry.addAttribute("offset", offsetAttribute);
		geoms.push(geometry);
	}

	for (var f = 0; f < 12; f++) {
		var rand = Math.floor(Math.random() * 3);

		clouds = new THREE.Mesh(geoms[rand], this.materialCloud);
		clouds.offset = THREE.Math.randFloatSpread(3);
		clouds.position.x = clouds.offset;
		clouds.position.z = -15 * f;
		clouds.frustumCulled = false;
		this.list.push(clouds);
		this.add(clouds);
	}
};

Clouds.prototype.reset = function(pos) {
	for (var j = 0; j < 12; j++) {
		this.list[j].position.z = -15 * j;
	}
};

Clouds.prototype.update = function(pos, delta) {
	if (this.list[0].position.z > pos + this.exitGap) {
		this.list[0].position.z =
			this.list[this.list.length - 1].position.z - 15;
		var y = this.list[0].position.y;
		if (this.easeUp)
			TweenMax.fromTo(this.list[0].position, 1, { y: -20 }, { y: y });
		this.list.push(this.list.shift());
	}
	this.animate(delta);
};

Clouds.prototype.animate = function(delta) {
	this.counter++;
	for (var j = 0; j < 12; j++) {
		this.list[j].position.x =
			this.list[j].offset + 5 * Math.sin(this.counter / 300);
	}
};
