/** <<SlaveArt>> SugarCube macro. For parameter details, @see App.Art.SlaveArtElement */
Macro.add("SlaveArt", {
	handler() {
		if (typeof (this.args[0]) === "string") {
			// reparse first argument if it still contains Sugarcube code
			this.args[0] = Scripting.evalTwineScript(this.args[0]);
		}
		// @ts-ignore - macro argument forwarding breaks typechecking
		this.output.append(App.Art.SlaveArtElement(...this.args));
	}
});

/**
 * @enum {number}
 */
App.Art.ArtSizes = {
	/** Tiny, left. Example: facilities */
	TINY: 0,
	/** Small, left. Example: lists. */
	SMALL: 1,
	/** Medium, right. Example: random events. */
	MEDIUM: 2,
	/** Large, right. Example: long slave description. */
	LARGE: 3,
	/** Jank stuff, todo replace with proper enum system */
	0: 0,
	1: 1,
	2: 2,
	3: 3
};

App.Art.SlaveArtBatch = class {
	/** Prepare to render art in the same format for multiple slaves within a single passage context.
	 * Do not persist this object across passage contexts.
	 * @param {Iterable<number>} artSlaveIDs
	 * @param {number} artSize Image size/center:
	 * * 3: Large, right. Example: long slave description.
	 * * 2: Medium, right. Example: random events.
	 * * 1: Small, left. Example: lists.
	 * * 0: Tiny, left. Example: facilities
	 * @param {number} [UIDisplay] (optional, only used by legacy art): icon UI Display for vector art, 1 for on
	 */
	constructor(artSlaveIDs, artSize, UIDisplay) {
		// store parameters we'll potentially need for every slave
		this._artSize = artSize;
		this._UIDisplay = UIDisplay;
		// initialize the batch map for use by the renderers
		this._slaveArtBatch = new Map();
		for (const id of artSlaveIDs) {
			this._slaveArtBatch.set(id, {});
		}
	}

	/** Write preamble for batch render (must be done before rendering any slave).
	 * This should include at minimum a single large <style> block containing the styles for all the slaves, since spreading those out stalls the styler multiple times.
	 * It might also include a set of reusable image components shared between multiple slaves, to reference later via href.
	 * @returns {DocumentFragment|HTMLElement}
	 */
	writePreamble() {
		let frag = document.createDocumentFragment();

		let preambleFunc = null;
		if (V.imageChoice === 1) {
			preambleFunc = (slave) => App.Art.makeVectorArtStyle(slave, this._artSize);
		} else if (V.imageChoice === 3) {
			preambleFunc = (slave) => App.Art.revampedVectorArtStyles(slave);
		}

		if (preambleFunc && this._slaveArtBatch.size > 0) {
			let styles = [];
			// collect style information for all slaves
			for (const [slaveID, params] of this._slaveArtBatch) {
				const slave = getSlave(slaveID);
				if (slave) {
					const {styleClass, styleCSS} = preambleFunc(slave);
					params.displayClass = styleClass;
					styles.push(styleCSS);
				}
			}
			// output one bloody giant style tag with all the style information
			let st = document.createElement("style");
			st.innerHTML = styles.join('\n');
			frag.appendChild(st);
		}

		// otherwise write nothing, an empty fragment is fine
		return frag;
	}

	/** Render art for a single slave after having called prepareBatchRender.
	 * For built-in vector art, this can offer very large performance benefits over calling SlaveArtElement for every slave.
	 * @param {App.Entity.SlaveState} artSlave
	 * @returns {DocumentFragment|HTMLElement}
	 */
	render(artSlave) {
		// always render custom art as-is
		if (artSlave.custom.image !== null && artSlave.custom.image.filename !== "") {
			return App.Art.customArtElement(artSlave.custom.image, this._artSize);
		}

		if (!V.seeCustomImagesOnly) {
			const slaveData = this._slaveArtBatch.get(artSlave.ID);

			if (slaveData) {
				// perform "one of batch" rendering for supported formats
				if (V.imageChoice === 1) { /* VECTOR ART BY NOX/DEEPMURK */
					if (slaveData.displayClass) {
						return App.Art.vectorArtElement(artSlave, this._artSize, slaveData.displayClass);
					} else {
						console.error(`Batch data unavailable for slave ID ${artSlave.ID}; ensure the slave ID is valid and preamble was written. Falling back to single-slave renderer.`);
					}
				} else if (V.imageChoice === 3) { /* VECTOR ART REVAMP*/
					if (slaveData.displayClass) {
						return App.Art.revampedVectorArtElement(artSlave, slaveData.displayClass);
					} else {
						console.error(`Batch data unavailable for slave ID ${artSlave.ID}; ensure the slave ID is valid and preamble was written. Falling back to single-slave renderer.`);
					}
				}

				// or render directly for unsupported formats
				return App.Art.SlaveArtElement(artSlave, this._artSize, this._UIDisplay);
			}
			// definitely an error, but we can handle this...just redirect to the standard single-slave renderer
			console.error(`Requested batch render of slave ID ${artSlave.ID} which was not present in the initialization vector. Falling back to single-slave renderer.`);
			return App.Art.SlaveArtElement(artSlave, this._artSize, this._UIDisplay);
		}

		return new DocumentFragment();
	}
};

/**
 * @param {App.Entity.SlaveState} artSlave Slave
 * @param {number} artSize Image size/center:
 * * 3: Large, right. Example: long slave description.
 * * 2: Medium, right. Example: random events.
 * * 1: Small, left. Example: lists.
 * * 0: Tiny, left. Example: facilities
 * @param {number} [UIDisplay] (optional, only used by legacy art): icon UI Display for vector art, 1 for on
 * @param {boolean | null} isEventImage Whether the image will be used again in the future (only used for V.imageChoice 6)
 * @returns {DocumentFragment|HTMLElement}
 */
App.Art.SlaveArtElement = function(artSlave, artSize, UIDisplay, isEventImage = null) {
	const imageChoice = V.imageChoice;
	if (artSlave.custom.image !== null && artSlave.custom.image.filename !== "") {
		return App.Art.customArtElement(artSlave.custom.image, artSize);
	} else if (imageChoice === 1) { /* VECTOR ART BY NOX/DEEPMURK */
		return App.Art.vectorArtElement(artSlave, artSize);
	} else if (imageChoice === 2) { /* VECTOR ART BY NOX - Pregmod Legacy Version */
		return App.Art.legacyVectorArtElement(artSlave, UIDisplay);
	} else if (imageChoice === 3) { /* VECTOR ART REVAMP*/
		return App.Art.revampedVectorArtElement(artSlave);
	} else if (imageChoice === 4) { /* Elohiem's Webgl */
		return App.Art.webglArtElement(artSlave, artSize);
	} else if (imageChoice === 5) { /* RENDERED IMAGES BY SHOKUSHU */
		return App.Art.renderedArtElement(artSlave, artSize);
	} else if (imageChoice === 6) { /* AI GENERATED IMAGES */
		return App.Art.aiArtElement(artSlave, artSize, isEventImage);
	}
	throw new Error(`imageChoice ${imageChoice} is out of range`);
};

/**
 * Add art-pack specific css, needs to be updated when options change
 */
App.Art.setDynamicCSS = function(newState) {
	if (newState.imageChoice === 4) { /* Elohiem's Webgl */
		const width = 300 * newState.setImageSize;
		const height = 530 * newState.setImageSize;

		App.Art.dynamicCSS.innerHTML = '.tinyImg { height: 120px; width: 120px }\n';
		App.Art.dynamicCSS.innerHTML += '.smlImg { height: 150px; width: 150px }\n';
		App.Art.dynamicCSS.innerHTML += '.medImg { height: 300px; width: 300px }\n';

		App.Art.dynamicCSS.innerHTML += '.lrgRender:not(.custom) { height: ' + height + 'px; width: ' + width + 'px;}\n';
		App.Art.dynamicCSS.innerHTML += '.lrgRender > img { margin-left: auto; height: 530px; width: auto }\n';
	} else {
		App.Art.dynamicCSS.innerHTML = '';
	}
};

/**
 * Add empty style sheet for art-pack specific css
 */
(function() {
	App.Art.dynamicCSS = document.createElement('style');
	App.Art.dynamicCSS.type = 'text/css';
	document.head.appendChild(App.Art.dynamicCSS);
})();

/**
 * @param {string} event
 * @param {number} message
 * @returns {void}
 */
App.Art.errorHandler = function(event, message) {
	switch (message) {
		case 0:
			App.Art.webglErrorMessage = "Success";
			break;
		case 1:
			App.Art.webglErrorMessage = "Failed to start WebGL engine.";
			break;
		case 2:
			App.Art.webglErrorMessage = "Could not find art assets.";
			break;
		case 3:
			App.Art.webglErrorMessage = "Version mismatch.\nUpdate the assets using the link in Game Options.";
			break;
	}

	// fire event to art elements
	let containers = document.getElementsByClassName("artContainer");
	for (let i = 0; i < containers.length; i++) {
		containers[i].dispatchEvent(new Event(event));
	}
};

App.Art.webglInitialize = function() {
	let loadLockID = LoadScreen.lock();

	let script = document.createElement("script");
	script.onload = function() {
		try {
			// load model/morphs/textures assets
			let sceneData = App.Art.sceneGetData();
			App.Art.sceneGetData = function() { };
			// load default dictionary containing camera/light/morph/material values
			let scene = App.Art.sceneGetParams();
			scene.lockView = false;
			scene.resetView = false;
			scene.faceView = false;
			scene.inspectView = false;

			App.Art.defaultScene = JSON.parse(JSON.stringify(scene));

			// start Webgl engine, textures are streamed asynchronously
			App.Art.engine = new App.Art.Engine();
			App.Art.engine.bind(sceneData, scene, "resources/webgl/");
			App.Art.engineReady = true;

			// when ready, fire event to art elements to start rendering
			App.Art.errorHandler("engineLoaded", 0);
			LoadScreen.unlock(loadLockID);
		} catch (e) {
			App.Art.errorHandler("engineFailed", 1);
			LoadScreen.unlock(loadLockID);
		}
	};
	script.onerror = function() {
		App.Art.errorHandler("engineFailed", 2);
		LoadScreen.unlock(loadLockID);
	};
	script.src = "resources/webgl/scene1/scene1.js";

	let settings = document.createElement("script");
	settings.onload = function() {
		try {
			document.head.appendChild(script);
		} catch (e) {
			App.Art.errorHandler("engineFailed", 1);
			LoadScreen.unlock(loadLockID);
		}
	};
	settings.onerror = function() {
		App.Art.errorHandler("engineFailed", 2);
		LoadScreen.unlock(loadLockID);
	};
	settings.src = "resources/webgl/scene1/settings.json";

	// asynchronously load webgl assets if present
	let load = document.createElement("script");
	load.onload = function() {
		// but only if version is correct
		if (App.Art.version === "1.13") {
			document.head.appendChild(settings);
		} else {
			App.Art.errorHandler("engineFailed", 3);
			LoadScreen.unlock(loadLockID);
		}
	};
	load.onerror = function() {
		App.Art.errorHandler("engineFailed", 2);
		LoadScreen.unlock(loadLockID);
	};
	load.src = "resources/webgl/load.js";
	document.head.appendChild(load);
}();

/**
 * @param {App.Entity.SlaveState} inSlave
 * @param {number} artSize
 * @returns {HTMLElement}
 */
App.Art.webglArtElement = function(inSlave, artSize) {
	let container = document.createElement("div");
	container.setAttribute("class", "artContainer");
	container.style.fontSize = "large";
	container.style.position = "relative";
	let sz = App.Art.GetCanvasResolution(artSize);
	container.style.setProperty("--progress", sz[0] + "px");
	container.style.height = sz[1] + "px";
	// container.innerText = "Loading...";

	// we're being asked to render this slave at this snapshot in time, but we're doing so asynchronously, so clone her first
	// it's common for e.g. events to make alterations to a slave just before rendering and revert them afterwards
	const slave = clone(inSlave);
	container.addEventListener("engineLoaded", function() {
		new IntersectionObserver(function(entries) { // when visible in viewport
			if (entries.some(e => e.isIntersecting)) {
				this.unobserve(container); // render only once

				// when engine is ready, attach default scene
				let scene = JSON.parse(JSON.stringify(App.Art.defaultScene));

				// apply the model transforms
				let p = App.Art.getArtParams(slave);
				App.Art.applyFigures(slave, scene, p);
				App.Art.applySurfaces(slave, scene, p);
				App.Art.applyMaterials(slave, scene, p);
				App.Art.applyMorphs(slave, scene, p, false);

				// console.log(scene);

				// create UI and render based on active view
				container.innerText = "";
				App.Art.createWebglUI(container, slave, artSize, scene, p);
			}
		}, {threshold: [0, 1], rootMargin: '25% 0px 25% 0px'}).observe(container);
	});

	container.addEventListener("engineFailed", function() {
		container.style.fontSize = "small";
		container.style.color = "#BB2027";
		container.innerText = App.Art.webglErrorMessage;
	});

	// incase engine is loaded, trigger listeners manually
	if (App.Art.engineReady === true) {
		container.dispatchEvent(new Event("engineLoaded"));
	} else {
		container.dispatchEvent(new Event("engineFailed"));
	}

	return container;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} artSize
 * @returns {HTMLElement}
 */
App.Art.renderedArtElement = function(slave, artSize) {
	let fileName = "resources/renders/";

	if (slave.belly > 1500) {
		fileName += "preg ";
	}
	if (slave.vagina > -1) {
		if (slave.dick > 0) {
			if (slave.balls > 0) {
				fileName += "futanari";
			} else {
				fileName += "herm";
			}
		} else {
			fileName += "female";
		}
	} else {
		if (slave.balls > 0) {
			fileName += "shemale";
		} else {
			fileName += "gelding";
		}
	}
	if (slave.boobs < 400) {
		fileName = `${fileName} small`;
	} else if (slave.boobs < 800) {
		fileName = `${fileName} big`;
	} else if (slave.boobs < 6000) {
		fileName = `${fileName} huge`;
	} else {
		fileName = `${fileName} hyper`;
	}
	if (slave.muscles > 30) {
		fileName = `${fileName} muscle`;
	} else {
		fileName = `${fileName} soft`;
	}
	if (slave.fuckdoll > 0) {
		fileName = `${fileName} rebellious`;
	} else if (slave.devotion <= 20) {
		if (slave.trust < -20) {
			fileName = `${fileName} reluctant`;
		} else {
			fileName = `${fileName} rebellious`;
		}
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		fileName = `${fileName} reluctant`;
	} else if (slave.devotion <= 50 || slave.fetishKnown !== 1 || (V.seeMainFetishes === 0 && artSize < 2)) {
		fileName = `${fileName} obedient`;
	} else {
		if (slave.fetish === Fetish.NONE) {
			fileName = `${fileName} obedient`;
		} else {
			fileName = `${fileName} ${slave.fetish}`;
		}
	}
	fileName += ".png";

	const res = document.createElement("img");
	res.setAttribute("src", fileName);
	const sz = this.artSizeToPx(artSize);
	if (sz) {
		res.setAttribute("width", sz);
		res.setAttribute("height", sz);
	}
	return res;
};

/** Render a custom image block into an image or video container as appropriate for the requested size
 * @param {FC.CustomImage} imageInfo
 * @param {number} imageSize
 * @returns {HTMLElement}
 */
App.Art.customArtElement = function(imageInfo, imageSize) {
	const fileType = imageInfo.format || "png";
	const fileName = `resources/${imageInfo.filename}.${fileType}`;
	let elementType = "img";
	let attributes = [];
	if (fileType === "webm" || fileType === "mp4") {
		elementType = "video";
		attributes = ["loop", "autoplay"];
	}

	const res = document.createElement(elementType);
	attributes.forEach((an) => {
		res.setAttribute(an, "");
	});

	res.setAttribute("src", fileName);
	res.setAttribute("style", "float:right; border:3px hidden; object-fit:contain; height:100%; width:100%;");
	const sz = this.artSizeToPx(imageSize);
	if (sz) {
		res.setAttribute("width", sz);
		res.setAttribute("height", sz);
	}
	return res;
};

/**
 * Render an AI generated image
 * @param {App.Entity.SlaveState} slave - The slave whose image to render
 * @param {number} imageSize - The size of the image to render
 * @param {number} [imageNum] - The index of the image to display
 * @returns {Promise<HTMLImageElement>} Promise object that resolves with the created img element
 */
async function renderAIArt(slave, imageSize, imageNum = null) {
	let imgElement = document.createElement("img");

	imgElement.classList.add("ai-art-image");
	imgElement.setAttribute("style", "float:right; border:3px hidden; object-fit:contain; height:100%; width:100%;");

	const sz = App.Art.artSizeToPx(imageSize);
	if (sz) {
		imgElement.setAttribute("width", sz);
		imgElement.setAttribute("height", sz);
	}

	try {
		// Initial slave state
		if (imageNum === -1) {
			return imgElement;
		}
		const imageIdx = imageNum || 0;
		const imageDbId = slave.custom.aiImageIds[imageIdx];
		const imageData = await App.Art.GenAI.staticImageDB.getImage(imageDbId);
		imgElement.setAttribute("src", imageData.data);
		imgElement.setAttribute("title", `${slave.custom.aiDisplayImageIdx + 1}/${slave.custom.aiImageIds.length}`);
	} catch (e) {
		return Promise.reject(e);
	}

	return imgElement;
}

/** AI generated image that refreshes on click
 * @param {App.Entity.SlaveState} slave
 * @param {App.Art.ArtSizes} imageSize
 * @param {boolean | null} isEventImage Which step setting to use. true => V.aiSamplingStepsEvent, false => V.aiSamplingSteps, null => chosen based on passage tags
 * @returns {HTMLElement}
 */
App.Art.aiArtElement = function(slave, imageSize, isEventImage = null) {
	const container = App.UI.DOM.makeElement('div', null, ['ai-art-container']);
	App.UI.DOM.appendNewElement('img', container, null, ['ai-art-image']);
	const progress = App.UI.DOM.appendNewElement('progress', container, null, ['ai-art-progress']);
	progress.value = 0;
	progress.style.setProperty("--progress", "0%");
	progress.max = 1;
	const toolbar = App.UI.DOM.appendNewElement('div', container, null, ['ai-toolbar']);

	/** @type {HTMLButtonElement} */
	let replaceButton;
	/** @type {HTMLButtonElement} */
	let generationButton;
	/** @type {HTMLButtonElement} */
	let deletionButton;
	/** @type {HTMLDivElement} */
	let spinner;
	/** @type {HTMLButtonElement} */
	let zoomIn;

	/**
	 * @param {HTMLDivElement} toolbar
	 * @param {HTMLDivElement} container
	 */
	const makeZoomIn = (toolbar, container) => {
		zoomIn = App.UI.DOM.appendNewElement('button', toolbar, null, ['zoom-in']);
		zoomIn.title = 'Zoom In';
		const onZoomInClick = () => {
			const imageElement = container.querySelector('.ai-art-image');
			if (imageElement && imageElement.getAttribute('src')) {
				const lightbox = App.UI.DOM.appendNewElement('div', document.body, null, ['lightbox', 'ui-front']);
				// make a seperate background element so that the user can click on the image without lightbox closing
				const lightboxBackground = App.UI.DOM.appendNewElement('div', lightbox, null, ['lightbox-background']);
				lightboxBackground.addEventListener('click', (ev) => {
					if (ev.target === lightboxBackground) {
						console.log('background clicked');
						lightbox.remove();
						document.removeEventListener('keydown', keys);
					}
				});
				const keys = (ev) => {
					if (ev.key === 'Escape') {
						lightbox.remove();
						document.removeEventListener('keydown', keys);
					}
				};
				document.addEventListener('keydown', keys);
				// Visible button for exiting, but clicking outside of image should automatically close it anyways
				App.UI.DOM.appendNewElement('button', lightboxBackground, '✕', ['close']);
				const lightboxImg = App.UI.DOM.appendNewElement('img', lightboxBackground);
				lightboxImg.src = imageElement.getAttribute('src');

				if (V.aiCachingStrategy === 'static') {
					const list = App.UI.DOM.appendNewElement('ul', lightboxBackground);
					Object.assign(list.style, {
						display: 'flex',
						position: 'absolute',
						height: '9%',
						bottom: '0',
						margin: '0'
					});
					const images = Promise.allSettled(slave.custom.aiImageIds.map((aiImageId, idx) => renderAIArt(slave, 1, idx)));
					images.then(images => images.map(image => {
						if (image.status === "fulfilled") {
							list.append(image.value);
							image.value.onclick = () => lightboxImg.src = image.value.src;
						}
					}));
				}
			} else {
				console.error('No image element found to lightbox');
			}
		};
		zoomIn.addEventListener("click", onZoomInClick);

		const onContainerClick = (ev) => {
			const imageElement = container.querySelector('.ai-art-image');
			if (ev.target === imageElement) {
				onZoomInClick();
			}
		};
		container.addEventListener("click", onContainerClick);
	};



	// Loading spinner
	// eslint-disable-next-line no-unused-vars
	spinner = App.UI.DOM.appendNewElement('div', container, '⟳', ['spinner']);


	const reactiveSpecific = {
		/**
		 * @param {string} imageSrc
		 * @param {string} eventId
		 */
		setImage: (imageSrc, eventId) => {
			let newImg = document.createElement("img");

			const sz = App.Art.artSizeToPx(imageSize);
			if (sz) {
				newImg.setAttribute("width", sz);
				newImg.setAttribute("height", sz);
			}
			newImg.classList.add("ai-art-image");
			newImg.setAttribute("src", imageSrc);
			newImg.setAttribute('data--eventId', eventId);
			container.querySelector('.ai-art-image')?.remove();
			container.prepend(newImg);
		},
		/**
		 *
		 * @param {Partial<App.Art.GenAI.GetImageOptions>} [options] Options
		 */
		refresh: (options) => {
			/** @type {App.Art.GenAI.GetImageOptions} */
			const effectiveOptions = {
				action: 'overview',
				size: imageSize,
				forceRegenerate: false,
				isEventImage: isEventImage,
				...options
			};
			container.classList.add("refreshing");
			progress.value = 0;
			progress.style.setProperty("--progress", "0%");
			App.Art.GenAI.reactiveImageDB.getImage([slave], effectiveOptions)
				.onProgress((progressNum) => {
					if (slave.ID === App.Art.GenAI.sdQueue.workingOnID || progressNum === 1) {
						progress.value = progressNum;
						progress.style.setProperty("--progress", progressNum * 100 + "%");
					}
				})
				.then((imageData) => {
					reactiveSpecific.setImage(imageData?.data?.images?.lowRes, imageData?.id?.toString() || `unknownId-${Math.random()}`);
				})
				.catch(e => console.error("Unexpected refresh error", e))
				.finally(() => container.classList.remove("refreshing"));
		}
	};

	const staticSpecific = {
		updateAndRefresh: (index = null) => {
			container.classList.add("refreshing");
			progress.value = 0;
			progress.style.setProperty("--progress", "0%");

			App.Art.GenAI.staticCache.updateSlave(slave, index, isEventImage)
				.onProgress((progressNum) => {
					progress.value = progressNum;
					progress.style.setProperty("--progress", progressNum * 100 + "%");
				})
				.then(() => {
					staticSpecific.refresh();
				}).catch(error => {
					console.log(error.message || error);
				}).finally(() => {
					container.classList.remove("refreshing");
				});
		},
		refresh: () => {
			renderAIArt(slave, imageSize, slave.custom.aiDisplayImageIdx)
				.then((imgElement) => {
					container.querySelector('.ai-art-image')?.remove();
					container.prepend(imgElement); // prepend it before the toolbar and spinner, otherwise you can't see them
				}).catch((e) => {
					// couldn't render this image (perhaps it's been purged, or browser data cleared, or whatever)
					// TODO: we might want to consider automatically removing the image if we can't render it, but for now the user can click Delete
					console.log('Error in refresh:', e);
				});
		},
		deleteSlaveAiImage: async (slave, idx) => {
			const deletionId = slave.custom.aiImageIds[idx];
			try {
				await App.Art.GenAI.staticImageDB.removeImage(deletionId);
			} catch (e) {
				// it's valid to delete an image that can't be fetched (maybe the browser data is cleared or whatever)
			}
			slave.custom.aiImageIds = [...slave.custom.aiImageIds.slice(0, idx), ...slave.custom.aiImageIds.slice(idx + 1)];
			if (slave.custom.aiImageIds.length === 0) {
				slave.custom.aiDisplayImageIdx = -1;
			} else if (slave.custom.aiDisplayImageIdx !== 0) {
				slave.custom.aiDisplayImageIdx--;
			}
		}
	};



	/**
	 * @param {HTMLDivElement} toolbar
	 * @param {HTMLDivElement} container
	 */
	const makeReplaceButton = (toolbar, container) => {
		replaceButton = App.UI.DOM.appendNewElement('button', toolbar, '⟳');
		replaceButton.title = 'Replace';
		replaceButton.addEventListener("click", () => {
			if (!container.classList.contains("refreshing")) {
				if (V.aiCachingStrategy === 'reactive') {
					reactiveSpecific.refresh({forceRegenerate: true});
				} else { // static
					if (slave.custom.aiImageIds.length === 0) {
						// if there is no current image, go ahead and add a new one
						staticSpecific.updateAndRefresh();
					} else {
						staticSpecific.updateAndRefresh(slave.custom.aiDisplayImageIdx);
					}
				}
			}
		});
	};

	const makeImageNavigationArrows = (container) => {
		const leftArrow = document.createElement('button');
		leftArrow.classList.add("leftArrow", "arrow");
		leftArrow.name = 'leftButton';
		leftArrow.title = 'Previous image';
		leftArrow.innerText = '←';
		leftArrow.onclick = (e) => {
			// Stop update onclick
			e.stopPropagation();

			if (slave.custom.aiImageIds.length === 0) {
				staticSpecific.updateAndRefresh();
			} else {
				if (slave.custom.aiDisplayImageIdx > 0) {
					slave.custom.aiDisplayImageIdx--;
				} else {
					slave.custom.aiDisplayImageIdx = slave.custom.aiImageIds.length - 1;
				}
				staticSpecific.refresh();
			}
		};
		container.appendChild(leftArrow);

		const rightArrow = document.createElement('button');
		rightArrow.classList.add("rightArrow", "arrow");
		rightArrow.name = 'rightButton';
		rightArrow.title = 'Next image';
		rightArrow.innerText = '→';
		rightArrow.onclick = (e) => {
			e.stopPropagation();

			if (slave.custom.aiImageIds.length === 0) {
				staticSpecific.updateAndRefresh();
			} else {
				if (slave.custom.aiDisplayImageIdx < slave.custom.aiImageIds.length - 1) {
					slave.custom.aiDisplayImageIdx++;
				} else {
					slave.custom.aiDisplayImageIdx = 0;
				}
				staticSpecific.refresh();
			}
		};
		container.appendChild(rightArrow);
	};

	/**
	 * @param {HTMLDivElement} toolbar
	 * @param {HTMLDivElement} container
	 */
	const makeGenerationButton = (toolbar, container) => {
		generationButton = document.createElement("button");
		generationButton.innerText = '+';
		generationButton.title = 'Add image';
		generationButton.addEventListener("click", function() {
			if (!container.classList.contains("refreshing")) {
				staticSpecific.updateAndRefresh();
			}
		});
		toolbar.appendChild(generationButton);
	};


	/**
	 * @param {HTMLDivElement} toolbar
	 * @param {HTMLDivElement} container
	 */
	const makeDeleteButton = (toolbar, container) => {
		deletionButton = document.createElement("button");
		deletionButton.innerText = 'Ⓧ';
		deletionButton.title = 'Delete image';
		deletionButton.addEventListener("click", async function() {
			if (!container.classList.contains("refreshing")) {
				if (slave.custom.aiDisplayImageIdx === -1) { return; }
				await staticSpecific.deleteSlaveAiImage(slave, slave.custom.aiDisplayImageIdx);
				staticSpecific.refresh();
			}
		});
		toolbar.appendChild(deletionButton);
	};

	if (V.aiCachingStrategy === 'reactive') {
		makeZoomIn(toolbar, container);
		makeReplaceButton(toolbar, container);

		reactiveSpecific.refresh();

		return container;
	} else { // static
		makeZoomIn(toolbar, container);
		makeGenerationButton(toolbar, container);
		makeReplaceButton(toolbar, container);
		makeDeleteButton(toolbar, container);
		makeImageNavigationArrows(container);




		if (V.aiAutoGen && slave.custom.aiImageIds.length === 0) {
			staticSpecific.updateAndRefresh();
		} else {
			staticSpecific.refresh();
		}
		return container;
	}
};



/**
 * @param {number} artSize
 * @returns {string}
 */
App.Art.artSizeToPx = function(artSize) {
	switch (artSize) {
		case 3:
			return null;
		case 2:
			return "300";
		case 1:
			return "150";
		default:
			return "120";
	}
};

globalThis.extractColor = (function() {
	/*
	these are color names known and used in FreeCities
	attributed color names are at the front of the array
	*/
	const FCnames = new Map([
		["amber", "#ffbf00"],
		["auburn", "#a53f2a"],
		["black", "#171717"],
		["blazing red", "#E00E2B"],
		["blonde", "#F4F1A3"],
		["blue", "#4685C5"],
		["blue-violet", "#8790B7"],
		["brown", "#7e543e"],
		["burgundy", "#34000d"],
		["chestnut", "#663622"],
		["chocolate", "#402215"],
		["copper", "#e29c58"],
		["dark blue", "#000034"],
		["dark brown", "#4b3225"],
		["dark orchid", "#9932CC"],
		["deep red", "#6D1318"],
		["ginger", "#da822d"],
		["golden", "#ffd700"],
		["green", "#5FBA46"],
		["green-yellow", "#ADFF2F"],
		["grey", "#8d8d8d"],
		["hazel", "#8d6f1f"],
		["jet black", "#060606"],
		["light olive", "#806b00"],
		["neon blue", "#0e85fd"],
		["neon green", "#25d12b"],
		["neon pink", "#fc61cd"],
		["pale-grey", "#b3b3b3"],
		["pink", "#D18CBC"],
		["platinum blonde", "#fcf3c1"],
		["purple", "#800080"],
		["red", "#BB2027"],
		["sea green", "#2E8B57"],
		["silver", "#d9d9d9"],
		["strawberry-blonde", "#e5a88c"],
		["amaranth", "#E52B50"],
		["amethyst", "#9966CC"],
		["citrine", "#e4d00a"],
		["emerald", "#50C878"],
		["jade", "#00a86b"],
		["platinum", "#e5e4e2"],
		["onyx", "#0f0f0f"],
		["ruby", "#cc1057"],
		["sapphire", "#0f52ba"],
		/* these are not actually FreeCities canon, but like to appear in custom descriptions */
		["brunette", "#6d4936"],
		["dark", "#463325"],

		/* these are HTML color names supported by most browsers */
		["aliceblue", "#f0f8ff"],
		["antiquewhite", "#faebd7"],
		["aqua", "#00ffff"],
		["aquamarine", "#7fffd4"],
		["azure", "#f0ffff"],
		["beige", "#f5f5dc"],
		["bisque", "#ffe4c4"],
		["blanchedalmond", "#ffebcd"],
		["blueviolet", "#8a2be2"],
		["burlywood", "#deb887"],
		["cadetblue", "#5f9ea0"],
		["chartreuse", "#7fff00"],
		["coral", "#ff7f50"],
		["cornflowerblue", "#6495ed"],
		["cornsilk", "#fff8dc"],
		["crimson", "#dc143c"],
		["cyan", "#00ffff"],
		["darkblue", "#00008b"],
		["darkcyan", "#008b8b"],
		["darkgoldenrod", "#b8860b"],
		["darkgray", "#a9a9a9"],
		["darkgreen", "#006400"],
		["darkkhaki", "#bdb76b"],
		["darkmagenta", "#8b008b"],
		["darkolivegreen", "#556b2f"],
		["darkorange", "#ff8c00"],
		["darkorchid", "#9932cc"],
		["darkred", "#8b0000"],
		["darksalmon", "#e9967a"],
		["darkseagreen", "#8fbc8f"],
		["darkslateblue", "#483d8b"],
		["darkslategray", "#2f4f4f"],
		["darkturquoise", "#00ced1"],
		["darkviolet", "#9400d3"],
		["deeppink", "#ff1493"],
		["deepskyblue", "#00bfff"],
		["dimgray", "#696969"],
		["dodgerblue", "#1e90ff"],
		["firebrick", "#b22222"],
		["floralwhite", "#fffaf0"],
		["forestgreen", "#228b22"],
		["fuchsia", "#ff00ff"],
		["gainsboro", "#dcdcdc"],
		["ghostwhite", "#f8f8ff"],
		["gold", "#ffd700"],
		["goldenrod", "#daa520"],
		["gray", "#808080"],
		["greenyellow", "#adff2f"],
		["honeydew", "#f0fff0"],
		["hotpink", "#ff69b4"],
		["indianred ", "#cd5c5c"],
		["indigo", "#4b0082"],
		["ivory", "#fffff0"],
		["khaki", "#f0e68c"],
		["lavender", "#e6e6fa"],
		["lavenderblush", "#fff0f5"],
		["lawngreen", "#7cfc00"],
		["lemonchiffon", "#fffacd"],
		["lightblue", "#add8e6"],
		["lightcoral", "#f08080"],
		["lightcyan", "#e0ffff"],
		["lightgoldenrodyellow", "#fafad2"],
		["lightgrey", "#d3d3d3"],
		["lightgreen", "#90ee90"],
		["lightpink", "#ffb6c1"],
		["lightsalmon", "#ffa07a"],
		["lightseagreen", "#20b2aa"],
		["lightskyblue", "#87cefa"],
		["lightslategray", "#778899"],
		["lightsteelblue", "#b0c4de"],
		["lightyellow", "#ffffe0"],
		["lime", "#00ff00"],
		["limegreen", "#32cd32"],
		["linen", "#faf0e6"],
		["magenta", "#ff00ff"],
		["maroon", "#800000"],
		["mediumaquamarine", "#66cdaa"],
		["mediumblue", "#0000cd"],
		["mediumorchid", "#ba55d3"],
		["mediumpurple", "#9370d8"],
		["mediumseagreen", "#3cb371"],
		["mediumslateblue", "#7b68ee"],
		["mediumspringgreen", "#00fa9a"],
		["mediumturquoise", "#48d1cc"],
		["mediumvioletred", "#c71585"],
		["midnightblue", "#191970"],
		["mintcream", "#f5fffa"],
		["mistyrose", "#ffe4e1"],
		["moccasin", "#ffe4b5"],
		["navajowhite", "#ffdead"],
		["navy", "#000080"],
		["oldlace", "#fdf5e6"],
		["olive", "#808000"],
		["olivedrab", "#6b8e23"],
		["orange", "#ffa500"],
		["orangered", "#ff4500"],
		["orchid", "#da70d6"],
		["palegoldenrod", "#eee8aa"],
		["palegreen", "#98fb98"],
		["paleturquoise", "#afeeee"],
		["palevioletred", "#d87093"],
		["papayawhip", "#ffefd5"],
		["peachpuff", "#ffdab9"],
		["peru", "#cd853f"],
		["plum", "#dda0dd"],
		["powderblue", "#b0e0e6"],
		["rebeccapurple", "#663399"],
		["rosybrown", "#bc8f8f"],
		["royalblue", "#4169e1"],
		["saddlebrown", "#8b4513"],
		["salmon", "#fa8072"],
		["sandybrown", "#f4a460"],
		["seagreen", "#2e8b57"],
		["seashell", "#fff5ee"],
		["sienna", "#a0522d"],
		["sky-blue", "#87ceeb"],
		["slateblue", "#6a5acd"],
		["slategray", "#708090"],
		["snow", "#fffafa"],
		["springgreen", "#00ff7f"],
		["steelblue", "#4682b4"],
		["tan", "#d2b48c"],
		["teal", "#008080"],
		["thistle", "#d8bfd8"],
		["tomato", "#ff6347"],
		["turquoise", "#40e0d0"],
		["violet", "#ee82ee"],
		["wheat", "#f5deb3"],
		["white", "#ffffff"],
		["whitesmoke", "#f5f5f5"],
		["yellow", "#ffff00"],
		["yellowgreen", "#9acd32"]
	]);

	/* these are HTML color names supported by most browsers */
	const HTMLstandardColors = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
	const hexColor = /^#([0-9a-f]{3}){1,2}$/;

	/** This takes a textual hair color description and tries to guess the appropriate HTML compliant color code.
	 * This code's working is described to the user in the Encyclopedia, chapter "Lore", section "Dyes".
	 * @param {string} color should be a color name, but can also be a string describing hair color.
	 * @param {any} [eyes] can be nearly anything, it only indicates that the function is being used for eye color instead of hair color.
	 * @returns {string} color code - hex or html standard string suitable for use in styles
	 */
	function mapColor(color, eyes) {
		color = color.toLowerCase(); /* normalization: lowercase color name */
		let colorCode = FCnames.get(color); /* look up in FreeCities color names */
		if (!colorCode) { /* not a FreeCities color name*/
			if (HTMLstandardColors.includes(color) || color.match(hexColor) !== null) {
				colorCode = color; /* is a HTML color name or value, use it directly */
			} else {
				/*
				is not even a HTML color name. color probably is a description.
				look for anything resembling a valid color name within the description.
				*/
				let colorNoSpaces = color.replace(/\s+/g, ''); /* remove all spaces from description */
				let FCkeys = Array.from(FCnames.keys());
				let colorCodes = [
					FCnames.get(FCkeys.find(function(e) {
						return color.startsWith(e);
					})),
					HTMLstandardColors.find(function(e) {
						return colorNoSpaces.startsWith(e);
					}),
					FCnames.get(FCkeys.find(function(e) {
						return color.includes(e);
					})),
					HTMLstandardColors.find(function(e) {
						return colorNoSpaces.includes(e);
					})
				];
				colorCode = colorCodes.find(function(e) {
					return e;
				}); /* picks the first successful guess */
			}
		}
		if (!colorCode) {
			console.log("Art Color Tools JS: Unable to determine HTML compliant color code for color string '" + color + "'.");
			if (eyes) {
				colorCode = "#89b7ff";
			} else {
				colorCode = "fuchsia"; /* use fuchsia as error marker */
			}
		}
		return colorCode;
	}

	return mapColor;
})();

globalThis.clothing2artSuffix = function(v) {
	if (v === "restrictive latex") {
		v = "latex";
	} /* universal "special case": latex art is actually "restrictive latex" TODO: align name in vector source */
	return v.replace(/^a[n]? /, "") /* remove "a" and "an" from the beginning*/
		.replace(/ ?(outfit|clothing) ?/, "") /* remove "outfit" and "clothing" (redundant) */
		.replace("-", "") /* remove minus character */
		.replace(/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() +
					txt.substr(1).toLowerCase();
			}
		) /* CamelCase by whitespace */
		.replace(/\W/g, ""); /* remove remaining whitespace */
};

/**
 * @param {App.Entity.SlaveState} artSlave
 * @returns { {skinColor: string, areolaColor: string, labiaColor: string, lipsColor: string} } HTML color codes for slave bits
 */
globalThis.skinColorCatcher = function(artSlave) {
	let colorSlave = {
		skinColor: "#e8b693",
		areolaColor: "#d76b93",
		labiaColor: "#d76b93",
		lipsColor: ""
	};
	switch (artSlave.skin) {
		case "camouflage patterned":
			colorSlave.skinColor = "#78875a";
			colorSlave.areolaColor = "#939F7A";
			colorSlave.labiaColor = "#F977A3";
			colorSlave.lipsColor = "#708050";
			break;
		case "dyed red":
			colorSlave.skinColor = "#bc4949";
			colorSlave.areolaColor = "#C96D6D";
			colorSlave.labiaColor = "#F977A3";
			colorSlave.lipsColor = "#b04040";
			break;
		case "dyed purple":
			colorSlave.skinColor = "#7a2391";
			colorSlave.areolaColor = "#C96D6D";
			colorSlave.labiaColor = "#F977A3";
			colorSlave.lipsColor = "#b04040";
			break;
		case "dyed green":
			colorSlave.skinColor = "#A6C373";
			colorSlave.areolaColor = "#B7CF8F";
			colorSlave.labiaColor = "#F977A3";
			colorSlave.lipsColor = "#A0C070";
			break;
		case "dyed blue":
			colorSlave.skinColor = "#5b8eb7";
			colorSlave.areolaColor = "#7BA4C5";
			colorSlave.labiaColor = "#F977A3";
			colorSlave.lipsColor = "#5080b0";
			break;
		case "dyed pink":
			colorSlave.skinColor = "#fe62b0";
			colorSlave.areolaColor = "#fc45a1";
			colorSlave.labiaColor = "#fba2c0";
			colorSlave.lipsColor = "#ff0000";
			break;
		case "dyed gray":
			colorSlave.skinColor = "#bdbdbd";
			colorSlave.areolaColor = "#666666";
			colorSlave.labiaColor = "#8C8C8C";
			colorSlave.lipsColor = "#171717";
			break;
		case "dyed white":
			colorSlave.skinColor = "#FFFFFF";
			colorSlave.areolaColor = "#CCCCCC";
			colorSlave.labiaColor = "#CCCCCC";
			break;
		case "clown":
			colorSlave.skinColor = "#FFFFFF";
			colorSlave.areolaColor = "#CCCCCC";
			colorSlave.labiaColor = "#CCCCCC";
			colorSlave.lipsColor = "#ff0000";
			break;
		case "dyed black":
			colorSlave.skinColor = "#1c1c1c";
			colorSlave.areolaColor = "#161415";
			colorSlave.labiaColor = "#161415";
			break;
		case "tiger striped":
			colorSlave.skinColor = "#e2d75d";
			colorSlave.areolaColor = "#E7DF7D";
			colorSlave.labiaColor = "#F977A3";
			colorSlave.lipsColor = "#e0d050";
			break;
		default: /* natural colors */
			switch (artSlave.race) {
				case "white":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#F4EAF0";
							colorSlave.areolaColor = "#FCCCDC";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#F4EAF0";
							colorSlave.areolaColor = "#FCCCDC";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#F5E1DF";
							colorSlave.areolaColor = "#EFBFCA";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#F5E1DF";
							colorSlave.areolaColor = "#EFBFCA";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#F5D5C9";
							colorSlave.areolaColor = "#E2B4B9";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#F5D5C9";
							colorSlave.areolaColor = "#E2B4B9";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#F4C9AA";
							colorSlave.areolaColor = "#F19795";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#E1B585";
							colorSlave.areolaColor = "#C39696";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#E1B585";
							colorSlave.areolaColor = "#C39696";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#D58E5F";
							colorSlave.areolaColor = "#B17777";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#D58E5F";
							colorSlave.areolaColor = "#B17777";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#A2805C";
							colorSlave.areolaColor = "#8E6454";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#825633";
							colorSlave.areolaColor = "#734B2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#784F2F";
							colorSlave.areolaColor = "#583E2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#784F2F";
							colorSlave.areolaColor = "#583E2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
							colorSlave.skinColor = "#65422C";
							colorSlave.areolaColor = "#4A3A33";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "black":
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#D58E5F";
							colorSlave.areolaColor = "#B17777";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "catgirl":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#F4EAF0";
							colorSlave.areolaColor = "#FCCCDC";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#F4EAF0";
							colorSlave.areolaColor = "#FCCCDC";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#F5E1DF";
							colorSlave.areolaColor = "#EFBFCA";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#F5E1DF";
							colorSlave.areolaColor = "#EFBFCA";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#F5D5C9";
							colorSlave.areolaColor = "#E2B4B9";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#F5D5C9";
							colorSlave.areolaColor = "#E2B4B9";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#F4C9AA";
							colorSlave.areolaColor = "#F19795";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#E1B585";
							colorSlave.areolaColor = "#C39696";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "tan":
							colorSlave.skinColor = "#E1B585";
							colorSlave.areolaColor = "#C39696";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#D58E5F";
							colorSlave.areolaColor = "#B17777";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#D58E5F";
							colorSlave.areolaColor = "#B17777";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#A2805C";
							colorSlave.areolaColor = "#8E6454";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#825633";
							colorSlave.areolaColor = "#734B2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#784F2F";
							colorSlave.areolaColor = "#583E2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#784F2F";
							colorSlave.areolaColor = "#583E2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
							colorSlave.skinColor = "#65422C";
							colorSlave.areolaColor = "#4A3A33";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "black":
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "red":
							colorSlave.skinColor = "#bc4949";
							colorSlave.areolaColor = "#C96D6D";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#b04040";
							break;
						case "yellow":
							colorSlave.skinColor = "#e6e673";
							colorSlave.areolaColor = "#E7DF7D";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#e0d050";
							break;
						case "black and white striped":
							colorSlave.skinColor = "#1c1309";
							colorSlave.areolaColor = "#FCCCDC";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#D58E5F";
							colorSlave.areolaColor = "#B17777";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "black":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#FEE4CA";
							colorSlave.areolaColor = "#E0B3A2";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#FEE4CA";
							colorSlave.areolaColor = "#E0B3A2";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#E3C5A7";
							colorSlave.areolaColor = "#EFBDC9";
							colorSlave.labiaColor = "#CC9B88";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#E3C5A7";
							colorSlave.areolaColor = "#CC9B88";
							colorSlave.labiaColor = "#CC9B88";
							break;
						case "very fair":
							colorSlave.skinColor = "#DEB892";
							colorSlave.areolaColor = "#AB806F";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#DEB892";
							colorSlave.areolaColor = "#AB806F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#D59D73";
							colorSlave.areolaColor = "#8D6859";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#AC7C4A";
							colorSlave.areolaColor = "#7C594B";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#AC7C4A";
							colorSlave.areolaColor = "#7C594B";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#985C34";
							colorSlave.areolaColor = "#764B3A";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#985C34";
							colorSlave.areolaColor = "#764B3A";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#745C42";
							colorSlave.areolaColor = "#63463B";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#65422C";
							colorSlave.areolaColor = "#4B3121";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#5A3C24";
							colorSlave.areolaColor = "#493326";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#5A3C24";
							colorSlave.areolaColor = "#493326";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#46362C";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "black":
							colorSlave.skinColor = "#583D3D";
							colorSlave.areolaColor = "#3B3028";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#4A3A33";
							colorSlave.areolaColor = "#332B27";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#312926";
							colorSlave.areolaColor = "#181616";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#985C34";
							colorSlave.areolaColor = "#764B3A";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "latina":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#FEDECE";
							colorSlave.areolaColor = "#E3BBAB";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#FEDECE";
							colorSlave.areolaColor = "#E3BBAB";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#E6C2B0";
							colorSlave.areolaColor = "#D1A695";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#E6C2B0";
							colorSlave.areolaColor = "#D1A695";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#E1B59F";
							colorSlave.areolaColor = "#B48D7E";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#E1B59F";
							colorSlave.areolaColor = "#B48D7E";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#DAA782";
							colorSlave.areolaColor = "#9E7666";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#B27554";
							colorSlave.areolaColor = "#92684C";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#B27554";
							colorSlave.areolaColor = "#92684C";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#8B644F";
							colorSlave.areolaColor = "#7B5749";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#775031";
							colorSlave.areolaColor = "#69452F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#774A31";
							colorSlave.areolaColor = "#614330";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#774A31";
							colorSlave.areolaColor = "#614330";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
							colorSlave.skinColor = "#74523E";
							colorSlave.areolaColor = "#573F30";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "black":
							colorSlave.skinColor = "#6B4B4B";
							colorSlave.areolaColor = "#473426";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#634F45";
							colorSlave.areolaColor = "#4D3A2E";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#634F45";
							colorSlave.areolaColor = "#4D3A2E";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "asian":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#FFF8EE";
							colorSlave.areolaColor = "#F7DBD0";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#FFF8EE";
							colorSlave.areolaColor = "#F7DBD0";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#F5E7DC";
							colorSlave.areolaColor = "#EABFB3";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#F5E7DC";
							colorSlave.areolaColor = "#EABFB3";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#F5D4B5";
							colorSlave.areolaColor = "#CB988B";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#F5D4B5";
							colorSlave.areolaColor = "#CB988B";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#F4D1A3";
							colorSlave.areolaColor = "#BA8E83";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#CFB48D";
							colorSlave.areolaColor = "#AC8074";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#CFB48D";
							colorSlave.areolaColor = "#AC8074";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#C38C4D";
							colorSlave.areolaColor = "#A67A6F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#C38C4D";
							colorSlave.areolaColor = "#A67A6F";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#9A774A";
							colorSlave.areolaColor = "#855E4E";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#855834";
							colorSlave.areolaColor = "#734B2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#83522B";
							colorSlave.areolaColor = "#68442A";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#83522B";
							colorSlave.areolaColor = "#68442A";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
						case "black":
							colorSlave.skinColor = "#724826";
							colorSlave.areolaColor = "#5C3D26";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#C38C4D";
							colorSlave.areolaColor = "#A67A6F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "middle eastern":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#E8CFCF";
							colorSlave.areolaColor = "#DCADBC";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#E8CFCF";
							colorSlave.areolaColor = "#DCADBC";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#FBCCC6";
							colorSlave.areolaColor = "#E79E8B";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#FBCCC6";
							colorSlave.areolaColor = "#E79E8B";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#EAAB92";
							colorSlave.areolaColor = "#D27B64";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#EAAB92";
							colorSlave.areolaColor = "#D27B64";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#EDA571";
							colorSlave.areolaColor = "#B16854";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#CC8D53";
							colorSlave.areolaColor = "#A7624F";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#CC8D53";
							colorSlave.areolaColor = "#A7624F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#CA7136";
							colorSlave.areolaColor = "#9B5959";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#CA7136";
							colorSlave.areolaColor = "#9B5959";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#84684A";
							colorSlave.areolaColor = "#735143";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#684528";
							colorSlave.areolaColor = "#563826";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#6E4730";
							colorSlave.areolaColor = "#604534";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#6E4730";
							colorSlave.areolaColor = "#604534";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
						case "black":
							colorSlave.skinColor = "#604534 ";
							colorSlave.areolaColor = "#514039";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#CA7136";
							colorSlave.areolaColor = "#9B5959";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "amerindian":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#FDE4BF";
							colorSlave.areolaColor = "#F0BEAA";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#FDE4BF";
							colorSlave.areolaColor = "#F0BEAA";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#F5E7DC";
							colorSlave.areolaColor = "#CDA499";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#F5E7DC";
							colorSlave.areolaColor = "#CDA499";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#F5D4B5";
							colorSlave.areolaColor = "#CB988B";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#F5D4B5";
							colorSlave.areolaColor = "#CB988B";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#F4D1A3";
							colorSlave.areolaColor = "#BA8E83";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#CFB48D";
							colorSlave.areolaColor = "#AC8074";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#CFB48D";
							colorSlave.areolaColor = "#AC8074";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#C38C4D";
							colorSlave.areolaColor = "#A67A6F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#C38C4D";
							colorSlave.areolaColor = "#A67A6F";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#9A774A";
							colorSlave.areolaColor = "#855E4E";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#855834";
							colorSlave.areolaColor = "#734B2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#83522B";
							colorSlave.areolaColor = "#68442A";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#83522B";
							colorSlave.areolaColor = "#68442A";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
						case "black":
							colorSlave.skinColor = "#724826";
							colorSlave.areolaColor = "#5C3D26";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#C38C4D";
							colorSlave.areolaColor = "#A67A6F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "southern european":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#EBDBE4";
							colorSlave.areolaColor = "#FFE4E0";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#EBDBE4";
							colorSlave.areolaColor = "#FFE4E0";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#F0D0CC";
							colorSlave.areolaColor = "#EAACBA";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#F0D0CC";
							colorSlave.areolaColor = "#EAACBA";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#F1C6B5";
							colorSlave.areolaColor = "#DCA2A9";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#F1C6B5";
							colorSlave.areolaColor = "#DCA2A9";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#F2BC94";
							colorSlave.areolaColor = "#EE8280";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#DCA972";
							colorSlave.areolaColor = "#BF7577";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#DCA972";
							colorSlave.areolaColor = "#BF7577";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#D0814C";
							colorSlave.areolaColor = "#A96767";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#D0814C";
							colorSlave.areolaColor = "#A96767";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#937453";
							colorSlave.areolaColor = "#7F5A4B";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#7F5431";
							colorSlave.areolaColor = "#734B2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#784F2F";
							colorSlave.areolaColor = "#583E2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#784F2F";
							colorSlave.areolaColor = "#583E2F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
						case "black":
							colorSlave.skinColor = "#65422C";
							colorSlave.areolaColor = "#4A3A33";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#D0814C";
							colorSlave.areolaColor = "#A96767";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "semitic":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#E8CFCF";
							colorSlave.areolaColor = "#DCADBC";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#E8CFCF";
							colorSlave.areolaColor = "#DCADBC";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#FBCCC6";
							colorSlave.areolaColor = "#E79E8B";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#FBCCC6";
							colorSlave.areolaColor = "#E79E8B";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#EAAB92";
							colorSlave.areolaColor = "#D27B64";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#EAAB92";
							colorSlave.areolaColor = "#D27B64";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#EDA571";
							colorSlave.areolaColor = "#B16854";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#CC8D53";
							colorSlave.areolaColor = "#A7624F";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#CC8D53";
							colorSlave.areolaColor = "#A7624F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#CA7136";
							colorSlave.areolaColor = "#9B5959";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#CA7136";
							colorSlave.areolaColor = "#9B5959";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#84684A";
							colorSlave.areolaColor = "#735143";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#684528";
							colorSlave.areolaColor = "#563826";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#6E4730";
							colorSlave.areolaColor = "#604534";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#6E4730";
							colorSlave.areolaColor = "#604534";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
						case "black":
							colorSlave.skinColor = "#604534 ";
							colorSlave.areolaColor = "#514039";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#CA7136";
							colorSlave.areolaColor = "#9B5959";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "malay":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#FBD1B2";
							colorSlave.areolaColor = "#F39E7D";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#FBD1B2";
							colorSlave.areolaColor = "#F39E7D";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#E8B892";
							colorSlave.areolaColor = "#E2856C";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#E8B892";
							colorSlave.areolaColor = "#E2856C";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#EA9870";
							colorSlave.areolaColor = "#BE6C56";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#EA9870";
							colorSlave.areolaColor = "#BE6C56";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#EA9760";
							colorSlave.areolaColor = "#AB6755";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#BA855E";
							colorSlave.areolaColor = "#976051";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#BA855E";
							colorSlave.areolaColor = "#976051";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#A46138";
							colorSlave.areolaColor = "#8F5E51";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#A46138";
							colorSlave.areolaColor = "#8F5E51";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#7C563C";
							colorSlave.areolaColor = "#70493A";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#804A28";
							colorSlave.areolaColor = "#5F3F27";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#6F4523";
							colorSlave.areolaColor = "#623C20";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#6F4523";
							colorSlave.areolaColor = "#623C20";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
						case "black":
							colorSlave.skinColor = "#6F3E27";
							colorSlave.areolaColor = "#553823";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#A46138";
							colorSlave.areolaColor = "#8F5E51";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "indo-aryan":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#F8D4BE";
							colorSlave.areolaColor = "#F8B6A4";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#F8D4BE";
							colorSlave.areolaColor = "#F8B6A4";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#EFCCAF";
							colorSlave.areolaColor = "#EA9B86";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#EFCCAF";
							colorSlave.areolaColor = "#EA9B86";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#FCC49A";
							colorSlave.areolaColor = "#D29577";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#FCC49A";
							colorSlave.areolaColor = "#D29577";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#E8B68E";
							colorSlave.areolaColor = "#D08661";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#C17848";
							colorSlave.areolaColor = "#C36E45";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#C17848";
							colorSlave.areolaColor = "#C36E45";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#C17848";
							colorSlave.areolaColor = "#A75A34";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#C17848";
							colorSlave.areolaColor = "#A75A34";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#83684B";
							colorSlave.areolaColor = "#715043";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#8A593C";
							colorSlave.areolaColor = "#714931";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#845834";
							colorSlave.areolaColor = "#614635";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#845834";
							colorSlave.areolaColor = "#614635";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
						case "black":
							colorSlave.skinColor = "#7C5842";
							colorSlave.areolaColor = "#5F4538";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#6B5449";
							colorSlave.areolaColor = "#473C37";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#6B5449";
							colorSlave.areolaColor = "#473C37";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#C17848";
							colorSlave.areolaColor = "#A75A34";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "pacific islander":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#FBD1B2";
							colorSlave.areolaColor = "#F39E7D";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#FBD1B2";
							colorSlave.areolaColor = "#F39E7D";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#E8B892";
							colorSlave.areolaColor = "#E2856C";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#E8B892";
							colorSlave.areolaColor = "#E2856C";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#EA9870";
							colorSlave.areolaColor = "#BE6C56";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#EA9870";
							colorSlave.areolaColor = "#BE6C56";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#EA9760";
							colorSlave.areolaColor = "#AB6755";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#BA855E";
							colorSlave.areolaColor = "#976051";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#BA855E";
							colorSlave.areolaColor = "#976051";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#A46138";
							colorSlave.areolaColor = "#8F5E51";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#A46138";
							colorSlave.areolaColor = "#8F5E51";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#7C563C";
							colorSlave.areolaColor = "#70493A";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#804A28";
							colorSlave.areolaColor = "#5F3F27";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#6F4523";
							colorSlave.areolaColor = "#623C20";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#6F4523";
							colorSlave.areolaColor = "#623C20";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
						case "black":
							colorSlave.skinColor = "#6F3E27";
							colorSlave.areolaColor = "#553823";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#583E2F";
							colorSlave.areolaColor = "#3F3A38";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#A46138";
							colorSlave.areolaColor = "#8F5E51";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				case "mixed race":
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#FEE5CC";
							colorSlave.areolaColor = "#E3BBAB";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#FEE5CC";
							colorSlave.areolaColor = "#E3BBAB";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#E6C2B0";
							colorSlave.areolaColor = "#D1A695";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#E6C2B0";
							colorSlave.areolaColor = "#D1A695";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#E1B59F";
							colorSlave.areolaColor = "#B48D7E";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#E1B59F";
							colorSlave.areolaColor = "#B48D7E";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#DAA782";
							colorSlave.areolaColor = "#9E7666";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#B27554";
							colorSlave.areolaColor = "#92684C";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#B27554";
							colorSlave.areolaColor = "#92684C";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#8B644F";
							colorSlave.areolaColor = "#7B5749";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#775031";
							colorSlave.areolaColor = "#69452F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#774A31";
							colorSlave.areolaColor = "#5E4434";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#774A31";
							colorSlave.areolaColor = "#5E4434";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
							colorSlave.skinColor = "#74523E";
							colorSlave.areolaColor = "#574135";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "black":
							colorSlave.skinColor = "#6B4B4B";
							colorSlave.areolaColor = "#413228";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#634F45";
							colorSlave.areolaColor = "#4E3C32";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#634F45";
							colorSlave.areolaColor = "#4E3C32";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
					break;

				default:
					switch (artSlave.skin) {
						case "pure white":
						case "ivory":
						case "white":
							colorSlave.skinColor = "#FEE5CC";
							colorSlave.areolaColor = "#E3BBAB";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "extremely pale":
						case "very pale":
							colorSlave.skinColor = "#FEE5CC";
							colorSlave.areolaColor = "#E3BBAB";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "pale":
							colorSlave.skinColor = "#E6C2B0";
							colorSlave.areolaColor = "#D1A695";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ffb9ca";
							break;
						case "extremely fair":
							colorSlave.skinColor = "#E6C2B0";
							colorSlave.areolaColor = "#D1A695";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "very fair":
							colorSlave.skinColor = "#E1B59F";
							colorSlave.areolaColor = "#B48D7E";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "fair":
							colorSlave.skinColor = "#E1B59F";
							colorSlave.areolaColor = "#B48D7E";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light":
							colorSlave.skinColor = "#DAA782";
							colorSlave.areolaColor = "#9E7666";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#ce6876";
							break;
						case "light olive":
							colorSlave.skinColor = "#B27554";
							colorSlave.areolaColor = "#92684C";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "sun tanned":
						case "spray tanned":
						case "tan":
							colorSlave.skinColor = "#B27554";
							colorSlave.areolaColor = "#92684C";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#c1a785";
							break;
						case "olive":
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
							break;
						case "bronze":
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark olive":
							colorSlave.skinColor = "#8B644F";
							colorSlave.areolaColor = "#7B5749";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "dark":
						case "light beige":
							colorSlave.skinColor = "#775031";
							colorSlave.areolaColor = "#69452F";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "beige":
						case "dark beige":
						case "light brown":
							colorSlave.skinColor = "#774A31";
							colorSlave.areolaColor = "#5E4434";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#5d2f1b";
							break;
						case "brown":
							colorSlave.skinColor = "#774A31";
							colorSlave.areolaColor = "#5E4434";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#714536";
							break;
						case "dark brown":
							colorSlave.skinColor = "#74523E";
							colorSlave.areolaColor = "#574135";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "black":
							colorSlave.skinColor = "#6B4B4B";
							colorSlave.areolaColor = "#413228";
							colorSlave.labiaColor = "#F977A3";
							break;
						case "ebony":
							colorSlave.skinColor = "#634F45";
							colorSlave.areolaColor = "#4E3C32";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#403030";
							break;
						case "pure black":
							colorSlave.skinColor = "#634F45";
							colorSlave.areolaColor = "#4E3C32";
							colorSlave.labiaColor = "#F977A3";
							break;
						default:
							colorSlave.skinColor = "#B6784E";
							colorSlave.areolaColor = "#8F5A45";
							colorSlave.labiaColor = "#F977A3";
							colorSlave.lipsColor = "#9e4c44";
					}
			}
	}
	colorSlave.lipsColor = (colorSlave.lipsColor === "") ? colorSlave.areolaColor : colorSlave.lipsColor;
	return colorSlave;
};

/**
 * Generate a new unique CSS display class name for slave art.
 * Guarantees uniqueness using a passage temporary.
 * @returns {string}
 */
App.Art.generateDisplayClass = function() {
	const T = State.temporary;
	if (T.artDisplayID > 0) {
		T.artDisplayID++;
	} else {
		T.artDisplayID = 1;
	}
	return `art${T.artDisplayID}`;
};
