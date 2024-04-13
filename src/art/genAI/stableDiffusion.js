/* eslint-disable camelcase */
// cSpell:ignore swinir, sdapi, yolov, VBOR

App.Art.GenAI.StableDiffusionSettings = class {
	/**
	 * @typedef {object} ConstructorOptions
	 * @param {boolean} [enable_hr=true]
	 * @param {number} [denoising_strength=0.3]
	 * @param {number} [hr_scale=1.7]
	 * @param {string} [hr_upscaler="SwinIR_4x"]
	 * @param {number} [hr_second_pass_steps=10]
	 * @param {string} [prompt=""]
	 * @param {number} [seed=1337]
	 * @param {string} [sampler_name="DPM++ 2M SDE Karras"]
	 * @param {number} [steps=20]
	 * @param {number} [cfg_scale=5.5]
	 * @param {number} [width=512]
	 * @param {number} [height=768]
	 * @param {boolean} [restore_faces=true] Whether to use a model to restore faces or not
	 * @param {string} [negative_prompt=""]
	 * @param {string[]} [override_settings=["Discard penultimate sigma: True"]]
	 * @param {object} [alwayson_scripts={}] Always on Scripts (e.g. ADetailer)
	 */

	/**
	 * @param {ConstructorOptions} options The options for the constructor.
	 */
	constructor({
		enable_hr = true,
		denoising_strength = 0.3,
		hr_scale = 1.7,
		hr_upscaler = "SwinIR_4x",
		hr_second_pass_steps = 10,
		prompt = "",
		seed = 1337,
		sampler_name = "DPM++ 2M SDE Karras",
		steps = 20,
		cfg_scale = 5.5,
		width = 512,
		height = 768,
		negative_prompt = "",
		restore_faces = true,
		override_settings = {
			"always_discard_next_to_last_sigma": true,
		},
		alwayson_scripts = {}
	} = {}) {
		this.enable_hr = enable_hr;
		this.denoising_strength = denoising_strength;
		this.firstphase_width = width;
		this.firstphase_height = height;
		this.hr_scale = hr_scale;
		this.hr_upscaler = hr_upscaler;
		this.hr_second_pass_steps = hr_second_pass_steps;
		this.hr_sampler_name = sampler_name;
		this.hr_prompt = prompt;
		this.hr_negative_prompt = negative_prompt;
		this.prompt = prompt;
		this.seed = seed;
		this.sampler_name = sampler_name;
		this.batch_size = 1;
		this.n_iter = 1;
		this.steps = steps;
		this.cfg_scale = cfg_scale;
		this.width = width;
		this.height = height;
		this.negative_prompt = negative_prompt;
		this.restore_faces = restore_faces;
		this.override_strings = override_settings;
		this.override_settings_restore_afterwards = true;
		this.alwayson_scripts = alwayson_scripts;
	}
};


/**
 * @param {string} url
 * @param {number} timeout
 * @param {object} [options]
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, timeout, options) {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	const response = await fetch(url, {signal: controller.signal, ...options});
	clearTimeout(id);
	return response;
}


/**
 * @typedef App.Art.GenAI.SdQueueItem
 * @property {number} slaveID
 * @property {string} body
 * @property {boolean} isEventImage
 * @property {[function(object): void]} resolves
 * @property {[function(string): void]} rejects
 */

App.Art.GenAI.StableDiffusionClientQueue = class {
	constructor() {
		// Images for this current screen
		/**  @type {Array<App.Art.GenAI.SdQueueItem>} */
		this.queue = [];
		// Images for permanent slaves (i.e. not event) that were requested to be generated in previous screens
		/**  @type {Array<App.Art.GenAI.SdQueueItem>} */
		this.backlogQueue = [];
		this.interrupted = false;
		/** @type {number|null} */
		this.workingOnID = null;
	}

	/**
	 * Updates the queue counts if on the ai image settings page
	 */
	updateQueueCounts() {
		// update queue counts if on the page
		["#mainQueueCount", "#backlogQueueCount"].forEach(queueElement => {
			const queue = $(queueElement);
			let count = 0;
			if (queueElement === "#mainQueueCount") {
				count = this.queue.length;
			} else {
				count = this.backlogQueue.length;
			}
			if (queue !== undefined && queue.length) {
				queue.empty().append(count.toString());
			}
		});
	}

	/**
	 * Process the top item in the queue, and continue processing the queue one at a time afterwards
	 * @private
	 */
	process() {
		if (this.workingOnID !== null) {
			return false;
		}
		if (this.interrupted) {
			return false;
		}

		let top;
		if (this.queue.length > 0) {
			top = this.queue.shift();
		} else if (this.backlogQueue.length > 0) {
			top = this.backlogQueue.shift();
		} else {
			return false;
		}

		try {
			this.workingOnID = top.slaveID;
			console.log(`Fetching image for slave ${top.slaveID}, ${this.queue.length} requests remaining in the queue; ${this.backlogQueue.length} in backlog.`);
			// console.log("Generation Settings: ", JSON.parse(top.body));
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: top.body,
			};
			fetchWithTimeout(`${V.aiApiUrl}/sdapi/v1/txt2img`, (V.aiTimeoutPerStep * 1000 + 200) * V.aiSamplingSteps, options)
				.then((value) => {
					return value.json();
				}).then(obj => {
					top.resolves.forEach(resolve => resolve(obj));
					this.workingOnID = null;
					this.updateQueueCounts();
					this.process();
				})
				.catch(err => {
					this.workingOnID = null;
					top.rejects.forEach(reject => reject(`${top.slaveID}: Error fetching Stable Diffusion image - status: ${err}`));
					this.updateQueueCounts();
					this.process();
				});
		} catch (err) {
			this.workingOnID = null;
			top.rejects.forEach(reject => reject(err));
			this.updateQueueCounts();
			this.process();
		}
		this.updateQueueCounts();
		return true;
	}

	/**
	 * await this in order to block until the queue exits the interrupted state
	 */
	async resumeAfterInterrupt() {
		const sleep = () => new Promise(r => setTimeout(r, 100));
		while (this.interrupted) {
			await sleep();
		}
	}

	/**
	 * await this in order to block until the queue stops processing
	 */
	async resumeAfterProcessing() {
		const sleep = () => new Promise(r => setTimeout(r, 100));
		while (this.workingOnID !== null) {
			await sleep();
		}
	}

	/**
	 * Queue image generation for an entity
	 * @param {number} slaveID or a unique negative value for non-slave entities
	 * @param {string} body of the post request to be sent to txt2img
	 * @param {boolean | false} isEventImage Whether to add the request to the beginning of the queue for a faster response
	 * @returns {Promise<object>}
	 */
	async add(slaveID, body, isEventImage = false) {
		if (this.interrupted) {
			await this.resumeAfterInterrupt();
		}

		// if an image request already exists for this ID (and ID is not zero), and it's not an event image
		if (slaveID !== null && slaveID > 0) {
			const comparisonFn = V.aiCachingStrategy === 'static'
				? ((/** @type {App.Art.GenAI.SdQueueItem} */ x) => x.slaveID === slaveID)
				: ((/** @type {App.Art.GenAI.SdQueueItem} */ x) => x.body === body); // reactive needs exact match

			// if it's in the backlog queue, and the new request is also for a permanent image, pull it into the foreground queue first
			if (!isEventImage) {
				let blItem = this.backlogQueue.find(comparisonFn);
				if (blItem) {
					this.queue.push(blItem);
					this.backlogQueue.delete(blItem);
				}
			}
			let item = this.queue.find(comparisonFn);
			if (item) {
				// if id is already queued, add a handle to receive the previously queued Promise's response and update `body` with the new query
				return new Promise((resolve, reject) => {
					item.body = body;
					item.resolves.push(resolve);
					item.rejects.push(reject);
				});
			}
		}
		return new Promise((resolve, reject) => {
			if (isEventImage) {
				// inject event images to the beginning of the queue
				this.queue.unshift({
					slaveID: slaveID,
					body: body,
					isEventImage: isEventImage,
					resolves: [resolve],
					rejects: [reject]
				});
			} else {
				this.queue.push({
					slaveID: slaveID,
					body: body,
					isEventImage: isEventImage,
					resolves: [resolve],
					rejects: [reject]
				});
			}

			this.updateQueueCounts();

			this.process(); // do not await
		});
	}

	onPassageSwitch() {
		this.backlogQueue = [...this.queue.filter((job) => !job.isEventImage), ...this.backlogQueue];
		this.queue = [];
	}

	/**
	 * Stop processing the queue and reject everything in it.
	 */
	async interrupt() {
		if (this.interrupted) { // permit nesting and consecutive calls
			return false;
		}

		this.interrupted = true; // pause processing of the queue and don't accept further interrupts

		// reject everything in the backlog queue
		while (this.backlogQueue.length > 0) {
			let item = this.backlogQueue.pop();
			if (item) {
				item.rejects.forEach(r => r(`${item.slaveID}: Stable Diffusion fetch interrupted`));
			}
		}
		this.backlogQueue = [];

		// and also everything in the main queue
		while (this.queue.length > 0) {
			let item = this.queue.pop();
			if (item) {
				item.rejects.forEach(r => r(`${item.slaveID}: Stable Diffusion fetch interrupted`));
			}
		}
		this.queue = [];

		this.sendInterrupt();

		this.interrupted = false; // resume with next add
		return true;
	}

	sendInterrupt() {
		// tell SD to stop generating the current image
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetchWithTimeout(`${V.aiApiUrl}/sdapi/v1/interrupt`, 1000, options)
			.then(() => {
				console.log("Stable Diffusion: Interrupt Sent.");
			}).catch(() => {
				// ignore errors
			});
	}
};


// instantiate global queue
App.Art.GenAI.sdQueue = new App.Art.GenAI.StableDiffusionClientQueue();

App.Art.GenAI.StableDiffusionClient = class {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {number} steps to use when generating the image
	 * @returns {Promise<InstanceType<App.Art.GenAI.StableDiffusionSettings>>}
	 */
	async buildStableDiffusionSettings(slave, steps) {
		const prompt = buildPrompt(slave);

		// TODO: Add more config options to ADetailer, and add ReActor
		const alwaysOnScripts = {};
		if (V.aiAdetailerFace) {
			// API Docs: https://github.com/Bing-su/adetailer/wiki/API
			alwaysOnScripts.ADetailer = {
				"args": [
					true, // ad_enable
					true, // skip_img2img
					{
						"ad_model": "face_yolov8s.pt"
					}
				]
			};
		}
		const poseFile = await App.Art.GenAI.getOpenPoseData(slave);
		if (poseFile) {
			// API Docs: https://github.com/Mikubill/sd-webui-controlnet/wiki/API#web-api
			alwaysOnScripts.controlnet = {
				"args": [
					{
						"input_image": poseFile,
						"module": "none",
						"model": V.aiOpenPoseModel
					}
				]
			};
		}

		if (V.aiDynamicCfgEnabled) {
			alwaysOnScripts['Dynamic Thresholding (CFG Scale Fix)'] = {
				"args": [
					true, // Enabled
					V.aiDynamicCfgMimic, // mimic scale (5-12 ish)
					100, // threshold percentile
					"Half Cosine Up", // mimic mode
					V.aiDynamicCfgMinimum, // mimic scale
					"Half Cosine Up", // cfg mode
					V.aiDynamicCfgMinimum // cfg scale
				]
			};
		}

		const settings = new App.Art.GenAI.StableDiffusionSettings({
			cfg_scale: V.aiCfgScale,
			enable_hr: V.aiUpscale,
			height: V.aiHeight,
			hr_upscaler: V.aiUpscaler,
			hr_scale: V.aiUpscaleScale,
			negative_prompt: prompt.negative(),
			prompt: prompt.positive(),
			sampler_name: V.aiSamplingMethod,
			seed: slave.natural.artSeed,
			steps: steps,
			width: V.aiWidth,
			restore_faces: V.aiRestoreFaces,
			alwayson_scripts: alwaysOnScripts
		});
		return settings;
	}

	/** Note the long timeout; if SD is actively rendering it'll sometimes stop responding to API queries.
	 * Do not block on API calls.
	 * @param {string} relativeUrl
	 * @returns {Promise<Response>}
	 */
	async fetchAPIQuery(relativeUrl) {
		return fetchWithTimeout(`${V.aiApiUrl}${relativeUrl}`, 30000, {method: "GET"});
	}

	/**
	 * @returns {Promise<string[]>}
	 */
	async getUpscalerList() {
		return this.fetchAPIQuery(`/sdapi/v1/upscalers`)
			.then((value) => {
				return value.json();
			})
			.then((list) => {
				return list.map(o => o.name);
			})
			.catch(err => {
				console.log(`Failed to get upscaler list from Stable Diffusion.`);
				return [];
			});
	}

	/**
	 * @returns {Promise<string[]>}
	 */
	async getSamplerList() {
		return this.fetchAPIQuery(`/sdapi/v1/samplers`)
			.then((value) => {
				return value.json();
			})
			.then((list) => {
				return list.map(o => o.name);
			})
			.catch(err => {
				console.log(`Failed to get sampler list from Stable Diffusion.`);
				return [];
			});
	}

	/** Check to see whether a face restore model is configured.
	 * @returns {Promise<boolean>}
	 */
	async canRestoreFaces() {
		return this.fetchAPIQuery(`/sdapi/v1/face-restorers`)
			.then((value) => {
				return value.json();
			})
			.then((list) => {
				return list.some(o => !!o.cmd_dir);
			})
			.catch(err => {
				console.log(`Failed to get face restorers from Stable Diffusion.`);
				return false;
			});
	}

	/** Check to see if the ADetailer script is installed. Probably should check more than that, but this'll catch the dumb cases.
	 * @returns {Promise<boolean>}
	 */
	async hasAdetailer() {
		return this.fetchAPIQuery(`/sdapi/v1/script-info`)
			.then((value) => {
				return value.json();
			})
			.then((list) => {
				return list.some(o => o.name === "adetailer");
			})
			.catch(err => {
				console.log(`Failed to get script information from Stable Diffusion.`);
				return false;
			});
	}

	/** Check to see if the ControlNet script is installed.
	 * @returns {Promise<boolean>}
	 */
	async hasControlNet() {
		return this.fetchAPIQuery(`/sdapi/v1/script-info`)
			.then((value) => {
				return value.json();
			})
			.then((list) => {
				return list.some(o => o.name === "controlnet");
			})
			.catch(err => {
				console.log(`Failed to get script information from Stable Diffusion.`);
				return false;
			});
	}

	/** Check to see if the OpenPose module for ControlNet is set up.
	 * @returns {Promise<boolean>}
	 */
	async _hasOpenPoseControlNetModule() {
		return this.fetchAPIQuery(`/controlnet/module_list`)
			.then((value) => {
				return value.json();
			})
			.then((obj) => {
				return obj.module_list.some(o => o === "openpose");
			})
			.catch(err => {
				console.log(`Failed to get ControlNet Module information from Stable Diffusion.`);
				return false;
			});
	}

	/** Check to see if OpenPose is fully set up.
	 * @returns {Promise<boolean>}
	 */
	async hasOpenPose() {
		const hasCN = await this.hasControlNet();
		if (hasCN) {
			return this._hasOpenPoseControlNetModule();
		} else {
			return false;
		}
	}

	/**
	 * @returns {Promise<string[]>}
	 */
	async getOpenPoseModelList() {
		return this.fetchAPIQuery(`/controlnet/control_types`)
			.then((value) => {
				return value.json();
			})
			.then((list) => {
				return list.control_types.OpenPose.model_list;
			})
			.catch(err => {
				console.log(`Failed to get OpenPose model list from Stable Diffusion.`);
				return [];
			});
	}

	/**
	 * @param {string} json
	 * @returns {Promise<string>}
	 */
	async renderOpenPoseJSON(json) {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: `[${json}]`
		};
		return fetchWithTimeout(`${V.aiApiUrl}/controlnet/render_openpose_json`, 30000, options)
			.then(value => {
				return value.json();
			})
			.then(obj => {
				if (obj.info !== "Success") {
					throw new Error(obj.info);
				}
				return obj.images[0];
			});
	}
};


App.Art.GenAI.sdClient = new App.Art.GenAI.StableDiffusionClient();


/**
 * Determines whether the current passage has the "temporary-images" tag
 * @returns {boolean}
 */
function isTemporaryImage() {
	return $(`[data-tags*=temporary-images]`).length > 0;
}


App.Art.GenAI.StaticCaching = class {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {boolean | null} isEventImage - Whether request is canceled on passage change and which step setting to use. true => V.aiSamplingStepsEvent, false => V.aiSamplingSteps, null => chosen based on passage tags
	 * @returns {Promise<string>} - Base 64 encoded image (could be a jpeg, png, or webp)
	 */
	async fetchImageForSlave(slave, isEventImage = null) {
		let steps = V.aiSamplingSteps;
		// always render owned slaves at full steps and without the passageSwitchHandler.  This allows the player to queue updates for slave images during events.
		if (globalThis.getSlave(slave.ID)) {
			isEventImage = false;
		}
		if (isEventImage === null) {
			isEventImage = isTemporaryImage();
		}
		if (isEventImage === true) {
			steps = V.aiSamplingStepsEvent;
		}

		let settingsSlave = slave;
		if (V.aiUseRAForEvents && isEventImage) {
			settingsSlave = structuredClone(slave);
			DefaultRules(settingsSlave, {aiPromptOnly: true});
		}
		const settings = await App.Art.GenAI.sdClient.buildStableDiffusionSettings(settingsSlave, steps);
		const body = JSON.stringify(settings);
		// set up a passage switch handler to clear queued generation of event and temporary images upon passage change
		const oldHandler = App.Utils.PassageSwitchHandler.get();
		if (isEventImage || isTemporaryImage()) {
			App.Utils.PassageSwitchHandler.set(() => {
				// find where this request is in the queue
				let rIndex = App.Art.GenAI.sdQueue.queue.findIndex(r => r.slaveID === slave.ID && r.body === body);
				if (rIndex > -1) {
					const rejects = App.Art.GenAI.sdQueue.queue[rIndex].rejects;
					// remove request from the queue as soon as possible
					App.Art.GenAI.sdQueue.queue.splice(rIndex, 1);
					// reject the associated promises
					rejects.forEach(r => r(`${slave.ID} (Event): Stable Diffusion fetch interrupted`));
				} else if (App.Art.GenAI.sdQueue.workingOnID === slave.ID) {
					// if this request is already in progress, send interrupt request
					App.Art.GenAI.sdQueue.sendInterrupt();
				}
				App.Art.GenAI.sdQueue.onPassageSwitch();
				if (oldHandler) {
					oldHandler();
				}
			});
		} else {
			const oldHandler = App.Utils.PassageSwitchHandler.get();
			App.Utils.PassageSwitchHandler.set(() => {
				App.Art.GenAI.sdQueue.onPassageSwitch();
				if (oldHandler) {
					oldHandler();
				}
			});
		}

		const response = await App.Art.GenAI.sdQueue.add(slave.ID, body, isEventImage);
		return response.images[0];
	}

	/**
	 * Update a slave object with a new image
	 * @param {FC.SlaveState} slave - The slave to update
	 * @param {number | null} replacementImageIndex - If provided, replace the image at this index
	 * @param {boolean | null} isEventImage - Whether request is canceled on passage change and which step setting to use. true => V.aiSamplingStepsEvent, false => V.aiSamplingSteps, null => chosen based on passage tags
	 * @returns {FC.PromiseWithProgress<void>}
	 */
	updateSlave(slave, replacementImageIndex = null, isEventImage = null) {
		const progressFns = [];
		const result = Object.assign(
			new Promise((resolve, reject) => {
				(async () => {
					const base64Image = await this.fetchImageForSlave(slave, isEventImage);
					const imageData = getImageData(base64Image);
					const imagePreexisting = await compareExistingImages(slave, imageData);
					if (!isEventImage) {
						let vSlave = globalThis.getSlave(slave.ID);
						// if `slave` is owned but the variable has become detached from V.slaves, save the image changes to V.slaves instead
						// but don't do it for temporary images because they might be intentionally using a copy of a slave for temporary changes
						if (vSlave && slave !== vSlave) {
							slave = vSlave;
						}
					}
					// If new image, add or replace it in
					if (imagePreexisting === -1) {
						const imageId = await App.Art.GenAI.staticImageDB.putImage({data: imageData});
						if (replacementImageIndex !== null) {
							await App.Art.GenAI.staticImageDB.removeImage(slave.custom.aiImageIds[replacementImageIndex]);
							slave.custom.aiImageIds[replacementImageIndex] = imageId;
						} else {
							slave.custom.aiImageIds.push(imageId);
							slave.custom.aiDisplayImageIdx = slave.custom.aiImageIds.indexOf(imageId);
						}
						// If image already exists, just update the display idx to it
					} else {
						console.log('Generated redundant image, no image stored');
						slave.custom.aiDisplayImageIdx = imagePreexisting;
					}
				})().then(resolve).catch(reject);
			}), {
				/**
				 * Do something when there's progress on generating an image
				 * @param {(progress: number) => void} fn A function to call when there's progress
				 * @returns {FC.PromiseWithProgress<void>}
				 */
				onProgress(fn) {
					progressFns.push(fn);
					return result;
				}
			}
		);

		const interval = setInterval(async () => {
			if (App.Art.GenAI.sdQueue.workingOnID === slave.ID) {
				const response = await fetch('https://home.local:9728/sdapi/v1/progress?skip_current_image=true', {
					method: 'GET',
					headers: [
						['accept', 'application/json'],
					],
				});
				const progress = (await response.json()).progress;
				progressFns.forEach((fn) => fn(progress));
			}
		}, 1000);
		result.finally(() => {
			clearInterval(interval);
			progressFns.forEach((fn) => fn(1));
		});

		return result;
	}
};

App.Art.GenAI.staticCache = new App.Art.GenAI.StaticCaching();



App.Art.GenAI.ReactiveCaching = class {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {boolean | null} isEventImage - Whether request is canceled on passage change and which step setting to use. true => V.aiSamplingStepsEvent, false => V.aiSamplingSteps, null => chosen based on passage tags
	 * @returns {Promise<string>} - Base 64 encoded image (could be a jpeg, png, or webp)
	 */
	async fetchImageForSlave(slave, isEventImage = null) {
		let steps = V.aiSamplingSteps;
		// always render owned slaves at full steps and without the passageSwitchHandler.  This allows the player to queue updates for slave images during events.
		if (globalThis.getSlave(slave.ID)) {
			isEventImage = false;
		}
		if (isEventImage === null) {
			isEventImage = isTemporaryImage();
		}
		if (isEventImage === true) {
			steps = V.aiSamplingStepsEvent;
		}

		let settingsSlave = slave;
		if (V.aiUseRAForEvents && isEventImage) {
			settingsSlave = structuredClone(slave);
			DefaultRules(settingsSlave, {aiPromptOnly: true});
		}
		const settings = await App.Art.GenAI.sdClient.buildStableDiffusionSettings(settingsSlave, steps);
		const body = JSON.stringify(settings);
		// set up a passage switch handler to clear queued generation of event and temporary images upon passage change
		const oldHandler = App.Utils.PassageSwitchHandler.get();
		if (isEventImage || isTemporaryImage()) {
			App.Utils.PassageSwitchHandler.set(() => {
				// find where this request is in the queue
				let rIndex = App.Art.GenAI.sdQueue.queue.findIndex(r => r.slaveID === slave.ID && r.body === body);
				if (rIndex > -1) {
					const rejects = App.Art.GenAI.sdQueue.queue[rIndex].rejects;
					// remove request from the queue as soon as possible
					App.Art.GenAI.sdQueue.queue.splice(rIndex, 1);
					// reject the associated promises
					rejects.forEach(r => r(`${slave.ID} (Event): Stable Diffusion fetch interrupted`));
				} else if (App.Art.GenAI.sdQueue.workingOnID === slave.ID) {
					// if this request is already in progress, send interrupt request
					App.Art.GenAI.sdQueue.sendInterrupt();
				}
				App.Art.GenAI.sdQueue.onPassageSwitch();
				if (oldHandler) {
					oldHandler();
				}
			});
		} else {
			const oldHandler = App.Utils.PassageSwitchHandler.get();
			App.Utils.PassageSwitchHandler.set(() => {
				App.Art.GenAI.sdQueue.onPassageSwitch();
				if (oldHandler) {
					oldHandler();
				}
			});
		}

		const response = await App.Art.GenAI.sdQueue.add(slave.ID, body, isEventImage);
		return response.images[0];
	}

	/**
	 * Update a slave object with a new image
	 * @param {FC.SlaveState} slave - The slave to update
	 * @param {number | null} replacementImageIndex - If provided, replace the image at this index
	 * @param {boolean | null} isEventImage - Whether request is canceled on passage change and which step setting to use. true => V.aiSamplingStepsEvent, false => V.aiSamplingSteps, null => chosen based on passage tags
	 */
	async updateSlave(slave, replacementImageIndex = null, isEventImage = null) {
		const base64Image = await this.fetchImageForSlave(slave, isEventImage);
		const imageData = getImageData(base64Image);
		console.log("Image data", imageData);
		const imagePreexisting = await compareExistingImages(slave, imageData);
		let vSlave = globalThis.getSlave(slave.ID);
		// if `slave` is owned but the variable has become detached from V.slaves, save the image changes to V.slaves instead
		if (vSlave && slave !== vSlave) {
			slave = vSlave;
		}
		// If new image, add or replace it in
		if (imagePreexisting === -1) {
			const imageId = await App.Art.GenAI.reactiveImageDB.putImage({data: imageData});
			if (replacementImageIndex !== null) {
				await App.Art.GenAI.reactiveImageDB.removeImage(slave.custom.aiImageIds[replacementImageIndex]);
				slave.custom.aiImageIds[replacementImageIndex] = imageId;
			} else {
				slave.custom.aiImageIds.push(imageId);
				slave.custom.aiDisplayImageIdx = slave.custom.aiImageIds.indexOf(imageId);
			}
			// If image already exists, just update the display idx to it
		} else {
			console.log('Generated redundant image, no image stored');
			slave.custom.aiDisplayImageIdx = imagePreexisting;
		}
	}
};

App.Art.GenAI.reactiveCache = new App.Art.GenAI.ReactiveCaching();




/**
 * Search slave's existing images for a match with the new image.
 * @param {FC.SlaveState} slave - The slave we're updating
 * @param {string} newImageData - new image
 * @returns {Promise<number>} index of the image in aiImageIds or -1
 */
async function compareExistingImages(slave, newImageData) {
	const aiImages = await Promise.all(
		slave.custom.aiImageIds.map(id =>
			App.Art.GenAI.staticImageDB.getImage(id)
				.catch(() => null)  // Return null if the image is not found or there's an error
		)
	);

	return aiImages.findIndex(img => img && img.data === newImageData);
}

/**
 * Add mime type to a base64 encoded image
 * @param {string} base64Image
 * @returns {string} data string
 */
function getImageData(base64Image) {
	const mimeType = getMimeType(base64Image);
	return `data:${mimeType};base64,${base64Image}`;
}

/**
 * @param {string} base64Image
 * @returns {string}
 */
function getMimeType(base64Image) {
	const jpegCheck = "/9j/";
	const pngCheck = "iVBOR";
	const webpCheck = "UklGR";

	if (base64Image.startsWith(jpegCheck)) {
		return "image/jpeg";
	} else if (base64Image.startsWith(pngCheck)) {
		return "image/png";
	} else if (base64Image.startsWith(webpCheck)) {
		return "image/webp";
	} else {
		return "unknown";
	}
}
