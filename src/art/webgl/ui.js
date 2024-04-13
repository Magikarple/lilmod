// cSpell:ignore rwidth, rheight

App.Art.views = {};

App.Art.isDraggingCanvas = false;

App.Art.runningAnim = [];

App.Art.createWebglUI = function(container, slave, artSize, scene, p) {
	// persistent view
	if (!(slave.ID in App.Art.views)) {
		let persist = {};
		persist.lockView = false;
		persist.resetView = true;
		persist.faceView = false;
		persist.inspectView = false;
		persist.inspect = false;
		persist.yr = scene.models[0].transform.yr;
		persist.camera = JSON.parse(JSON.stringify(scene.camera));

		App.Art.views[slave.ID] = persist;
	}

	function applyView(scene, view) {
		scene.inspect = view.inspect;
		scene.models[0].transform.yr = view.yr;
		scene.camera = view.camera;
	}

	function render() {
		applyView(scene, view); // copy persistent view to scene before render
		App.Art.applyMorphs(slave, scene, p, false); // used for posing
		App.Art.engine.render(scene, cvs);
	}

	let view = App.Art.views[slave.ID];

	let lockViewDisabled = "resources/webgl/ui/lockViewDisabled.png";
	let lockViewEnabled = "resources/webgl/ui/lockViewEnabled.png";
	let faceViewDisabled = "resources/webgl/ui/faceViewDisabled.png";
	let faceViewEnabled = "resources/webgl/ui/faceViewEnabled.png";
	let resetViewDisabled = "resources/webgl/ui/resetViewDisabled.png";
	let resetViewEnabled = "resources/webgl/ui/resetViewEnabled.png";
	let inspectViewDisabled = "resources/webgl/ui/inspectViewDisabled.png";
	let inspectViewEnabled = "resources/webgl/ui/inspectViewEnabled.png";

	let uiContainer = document.createElement("div");
	uiContainer.setAttribute("style", "left: 82.5%; top: 5%; position: absolute; width: 15%; border: 0px; padding: 0px;");

	// canvas
	let cvs = document.createElement("canvas");
	cvs.setAttribute("oncontextmenu", "return false;");

	// btnLockView
	let btnLockView = document.createElement("input");
	btnLockView.setAttribute("style", "display: flex; width: 100%; position: relative; border: 0px; padding: 0px; background-color: transparent;");
	btnLockView.setAttribute("type", "image");

	// btnFaceView
	let btnFaceView = document.createElement("input");
	btnFaceView.setAttribute("style", "display: flex; width: 100%; position: relative; border: 0px; padding: 0px; background-color: transparent;");
	btnFaceView.setAttribute("type", "image");

	// btnResetView
	let btnResetView = document.createElement("input");
	btnResetView.setAttribute("style", "display: flex; width: 100%; position: relative; border: 0px; padding: 0px; background-color: transparent;");
	btnResetView.setAttribute("type", "image");

	// btnInspectView
	let btnInspectView = document.createElement("input");
	btnInspectView.setAttribute("style", "display: flex; width: 100%; position: relative; border: 0px; padding: 0px; background-color: transparent;");
	btnInspectView.setAttribute("type", "image");

	function updateLinkedButtons(button) {
		switch (button) {
			case "lock": view.lockView = !view.lockView; break;
			case "reset": view.resetView = true; view.faceView = false; view.inspectView = false; break;
			case "face": view.faceView = true; view.inspectView = false; view.resetView = false; break;
			case "inspect": view.inspectView = true; view.faceView = false; view.resetView = false; break;
			case "move": view.resetView = false; view.faceView = false; view.inspectView = false; break;
		}

		btnInspectView.setAttribute("src", view.inspectView ? inspectViewDisabled : inspectViewEnabled);
		btnResetView.setAttribute("src", view.resetView ? resetViewDisabled : resetViewEnabled);
		btnFaceView.setAttribute("src", view.faceView ? faceViewDisabled : faceViewEnabled);
		btnLockView.setAttribute("src", view.lockView ? lockViewDisabled : lockViewEnabled);
	}

	let panY;
	let zoomZ;
	let zoomY;
	let oz;
	let oy;
	let oxr;

	// events
	function inspectView(e) {
		updateLinkedButtons("inspect");

		if (!V.seeAnimation) {
			if (V.set3QView) {
				view.yr = 30;
			} else {
				view.yr = 0;
			}
			view.inspect = true;
			App.Art.Frame(slave, scene, view, p);
			render();
		}
	}

	function lockView(e) {
		updateLinkedButtons("lock");
		render();
	}

	function faceView(e) {
		updateLinkedButtons("face");

		view.camera.x = 0;
		view.camera.y = p.height-5;
		view.yr = 0;
		view.camera.xr = -6;
		view.camera.z = -p.height/3.85;
		view.inspect = false;
		render();
	}

	function resetView(e) {
		updateLinkedButtons("reset");

		if (V.set3QView) {
			view.yr = 30;
		} else {
			view.yr = App.Art.defaultScene.models[0].transform.yr;
		}
		view.inspect = false;
		App.Art.Frame(slave, scene, view, p);
		render();
	}

	btnInspectView.onclick = inspectView;
	btnLockView.onclick = lockView;
	btnFaceView.onclick = faceView;
	btnResetView.onclick = resetView;

	cvs.onmousemove = function(e){
		if (view.lockView || !App.Art.isDraggingCanvas){ return; }
		e.preventDefault();
		e.stopPropagation();

		updateLinkedButtons("move");

		if (e.buttons === 1) { // left click
			panY = panY + e.movementY/7*V.setPanSpeed;
			view.camera.y = view.camera.y + e.movementY/7*V.setPanSpeed;
			view.yr = view.yr + e.movementX*5*V.setRotationSpeed;
		}
		if (e.buttons === 2) { // right click
			view.yr = view.yr + e.movementX*5*V.setRotationSpeed;
			view.camera.xr = view.camera.xr - e.movementY*1*V.setRotationSpeed;
			view.camera.xr = Math.clamp(view.camera.xr, -89, 89);

			let r = (-oz-zoomZ)/Math.cos(oxr*Math.PI/180);
			view.camera.y = oy + panY + zoomY - Math.sin((view.camera.xr)*Math.PI/180) * r + Math.sin(oxr*Math.PI/180)*r;
			view.camera.z = Math.cos((view.camera.xr)*Math.PI/180) * -r;
		}
		if (e.buttons === 4) { // wheel click
			panY = panY + e.movementY/7*V.setPanSpeed;
			view.camera.y = view.camera.y + e.movementY/7*V.setPanSpeed;
			view.camera.x = view.camera.x - e.movementX/7*V.setPanSpeed;
		}
		render();
	};

	cvs.onmousedown = function(e){
		if (view.lockView){
			// update if shared view
			updateLinkedButtons();
			if (artSize < 3) {
				render();
			}
			return;
		}
		oz = view.camera.z;
		oy = view.camera.y;
		oxr = view.camera.xr;
		panY = 0;
		zoomZ = 0;
		zoomY = 0;
		e.preventDefault();
		e.stopPropagation();
		App.Art.isDraggingCanvas=true;
	};

	cvs.onmouseup = function(e){
		if (view.lockView || !App.Art.isDraggingCanvas){ return; }
		e.preventDefault();
		e.stopPropagation();
		App.Art.isDraggingCanvas=false;
	};

	cvs.onmouseout = function(e){
		if (view.lockView || !App.Art.isDraggingCanvas){ return; }
		e.preventDefault();
		e.stopPropagation();
		App.Art.isDraggingCanvas=false;
	};

	cvs.onwheel = function(e){
		if (view.lockView){ return; }

		updateLinkedButtons("move");

		// zoom speed based on distance from origin, and along direction of camera
		let zOld = view.camera.z;
		let magnitude = e.deltaY/(10/V.setZoomSpeed) * (-view.camera.z/50 + 0.2);

		let zDistance = Math.cos(-view.camera.xr * (Math.PI/180)) * magnitude;
		view.camera.z -= zDistance;
		view.camera.z = Math.clamp(view.camera.z, -900, -10);
		zoomZ -= zDistance;

		let yDistance = Math.sin(-view.camera.xr * (Math.PI/180)) * magnitude * -(view.camera.z - zOld)/zDistance;
		view.camera.y += yDistance;
		zoomY += yDistance;

		render();
		return false;
	};

	// animation call
	if (artSize !== App.Art.artSize && App.Art.runningAnim.length > 0) {
		for (let i = 0; i < App.Art.runningAnim.length; i++) {
			clearInterval(App.Art.runningAnim[i]); // always clear, prevent animation running in background
		}
		App.Art.runningAnim.length = 0;
	}

	if (V.seeAnimation) {
		App.Art.startAnim(slave, scene, view, p, cvs);
		App.Art.artSize = artSize;
	}

	container.appendChild(cvs);
	uiContainer.appendChild(btnLockView);
	uiContainer.appendChild(btnFaceView);
	uiContainer.appendChild(btnInspectView);
	uiContainer.appendChild(btnResetView);
	container.appendChild(uiContainer);

	let sz = App.Art.GetCanvasResolution(artSize);
	let zoom = Math.max(1, window.devicePixelRatio);
	cvs.width = sz[0] * zoom;
	cvs.height = sz[1] * zoom;

	if (sz[0] > 300 && artSize === 3) {
		uiContainer.setAttribute("style", "right: 20px; top: 5%; position: absolute; width: 40px; border: 0px; padding: 0px;");
	}

	if (typeof V.setSuperSampling === "undefined") {
		V.setSuperSampling = 2;
	}

	scene.settings.rwidth = cvs.width * V.setSuperSampling;
	scene.settings.rheight = cvs.height * V.setSuperSampling;

	if (slave.height > 450) {
		scene.shadows.fov = 60;
	} else {
		scene.shadows.fov = 25;
	}

	// render state
	if (view.faceView) {
		faceView();
	} else if (view.inspectView) {
		inspectView();
	} else if (view.resetView) {
		resetView();
	} else {
		// default
		updateLinkedButtons();
		if (!V.seeAnimation || artSize < 3) {
			render();
		}
	}
};

App.Art.startAnim = function(slave, scene, view, p, cvs) {
	function updateFrame() {
		scene.inspect = view.inspect;
		scene.models[0].transform.yr = view.yr;
		scene.camera = view.camera;
		App.Art.applyMorphs(slave, scene, p, true);
		App.Art.engine.render(scene, cvs);
	}
	App.Art.runningAnim.push(setInterval(updateFrame, 1000 / V.animFPS));
};

App.Art.GetCanvasResolution = function(artSize) {
	switch (artSize) {
		case 3:
			return [300 * V.setImageSize, 530 * V.setImageSize];
		case 2:
			return [300, 300];
		case 1:
			return [150, 150];
		default:
			return [120, 120];
	}
};

App.Art.Frame = function(slave, scene, view, p) {
	let offset = scene.models[0].transform.y;

	let window = Math.clamp(V.setDefaultView, 0.01, 1); // fraction of full view

	if (V.setAutoFrame === 1) {
		let cameraHeight = p.height * 0.7 + (1 - window) * (p.height * (1-0.7));
		App.Art.AutoFrame(view, p.height, cameraHeight, window, offset);
	} else if ((p.height + offset) > 185) {
		App.Art.AutoFrame(view, p.height, 123, 1, offset);
	} else {
		App.Art.FixedFrame(view);
	}
};

App.Art.AutoFrame = function(view, slaveHeight, cameraHeight, window, offset) {
	// auto-frame based on camera height and FoV
	let n = Math.max((slaveHeight + offset) * 1.06 - cameraHeight, 1);
	let m = cameraHeight * 1.12 * window;
	let fov = view.camera.fov;

	let a = fov * (Math.PI/180);
	let r = m/n;
	let h = 0;

	// solve for distance
	if (a !== Math.PI/2) {
		if (a > Math.PI/2) {
			h = n/((-(r + 1) - ((r+1)**2 + 4*r*Math.tan(a)**2)**(1/2))/(2*Math.tan(a)*r)); // take negative discriminant
		} else {
			h = n/((-(r + 1) + ((r+1)**2 + 4*r*Math.tan(a)**2)**(1/2))/(2*Math.tan(a)*r)); // take positive discriminant
		}
	} else {
		h = (m+n)/2 * Math.sin(Math.acos(((m+n)/2-n)/((m+n)/2))); // edge case
	}

	// solve for rotation
	let rot = fov/2 - Math.atan(n/h) * (180/Math.PI);

	view.camera.z = -h;
	view.camera.y = cameraHeight;
	view.camera.x = 0;
	view.camera.xr = -rot;
};

App.Art.FixedFrame = function(view) {
	view.camera.z = -282;
	view.camera.y = 123;
	view.camera.x = 0;
	view.camera.xr = -6;
};
