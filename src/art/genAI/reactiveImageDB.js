/**
 * @typedef {object} App.Art.GenAI.AIImageResponse
 * @property {string} image Base64 image in the form of `data:${mimeType};base64,${base64Image}`
 * @property {string} eventId Event ID
 */

/**
 * @typedef {'headshot' | 'overview'} App.Art.GenAI.Action
 */

/**
 * @typedef App.Art.GenAI.EventStore.OverviewData
 * @property {object} images
 * @property {string} [images.lowRes] Base64 encoded image, generated quickly
 * @property {string} [images.highRes] Base64 encoded image, with upscaling/fancy stuff
 */

/**
 * @typedef {object} App.Art.GenAI.EventStore.HeadshotData
 * @property {object} images
 * @property {string} [images.image]  Base64 encoded image, with fancy stuff
 */


/**
 * @typedef {XOR<App.Art.GenAI.EventStore.OverviewData, App.Art.GenAI.EventStore.HeadshotData>} App.Art.GenAI.EventStore.DataType
 */



/**
 * @typedef App.Art.GenAI.EventStore.Entry
 * @property {number[]} slaveIds Sorted (ascending) list of slaves involved in event. Indexed for fast retrieval.
 * @property {App.Entity.SlaveState[]} slaveStates State of the slaves at the time of generation
 * @property {App.Art.GenAI.EventStore.OverviewData} data
 * @property {App.Art.GenAI.Action} action String describing what this contains. e.g. headshot, status, fucked vaginal, standing, etc.  Move to enum/complex types later.
 * @property {number} seed Seed used to send to SD. Likely the seed of slaveStates[0]
 * @property {number} [id] IndexedDB id
 *
 */

/**
 * @typedef {object} App.Art.GenAI.GetImageOptions
 * @property {App.Art.GenAI.Action} action
 * @property {App.Art.ArtSizes} size
 * @property {boolean} forceRegenerate
 * @property {boolean} isEventImage
 */



const SIGNIFICANTLY_DIFFERENT_THRESHOLD = 50;


App.Art.GenAI.reactiveImageDB = (function() {
	const sleep = (/** @type {number} */ n = 100) => new Promise(r => setTimeout(r, n));

	/** @type {import("../../../devTools/types/idb/entry").IDBPDatabase} */
	let db;

	/** Metadata about generated images */
	const EVENT_STORE = {
		path: 'eventStore',
		indicies: {
			bySlaveIdsActions: 'bySlaveIdsActions',
			bySlaveId: 'bySlaveId',
			byImageId: 'byImageId'
		}
	};

	const ALL_STORES = [EVENT_STORE];



	let initialized = false;
	async function waitForInit() {
		while (!initialized) {
			await sleep();
		}
		initialized = true;
	}

	/**
	 * Create an IndexedDB and initialize objectStore if it doesn't already exist.
	 * @returns {Promise<import("../../../devTools/types/idb/entry").IDBPDatabase>} Promise object that resolves with the opened database
	 */
	async function createDB() {
		return idb.openDB('AIImages-Reactive', 1, {
			blocked: () => {
				throw new Error("You have an older version of the AI Image DB open in another tab. Please close it and refresh this page.");
			},
			upgrade: (database, oldVersion, newVersion, tx, ev) => {
				// v1 DB spec
				if (oldVersion < 1) {
					const eventStore = database.createObjectStore(EVENT_STORE.path, {autoIncrement: true, keyPath: 'id'});
					eventStore.createIndex('id', 'id', {unique: true});
					eventStore.createIndex("bySlaveIdsActions", ['slaveIds', 'action'], {multiEntry: false}); // to check if a given actor is in _any_ scene. Does not matter who the other is.
					eventStore.createIndex('bySlaveId', 'slaveIds', {multiEntry: true});
					eventStore.createIndex('byImageId', 'imageId'); // for easy deletion
				}
			},
			blocking: (currentVersion, blockedVersion, ev) => {
				db.close();
			},
			terminated: () => {
				console.error("Connection to xmAIImages IndexedDB unexpectedly closed.");
			}
		});
	}


	/**
	 * Generates and saves a new image and returns it.
	 *
	 * @private
	 *
	 * @param {App.Entity.SlaveState[]} slaves The ID of the image to retrieve
	 * @param {App.Art.GenAI.GetImageOptions} options Fully populated misc options.
	 *
	 * @returns {Promise<string>} Promise object that resolves with the retrieved image data
	 */
	async function generateNewImage(slaves, options) {
		// {isEventImage: options.isEventImage, action: options.action}
		const slave = {
			// This can un-proxy a slave so it can be stored in IndexedDB
			...slaves[0],
			// This gets turned into a function sometimes and that breaks storing in IndexedDB
			clone: typeof slaves[0].clone === "function" ? 0 : slaves[0].clone
		};
		/** @type {string} */
		const base64Image = await App.Art.GenAI.reactiveCache.fetchImageForSlave(slave, options.isEventImage);
		return getImageData(base64Image);
	}

	/**
	 * Compares to see whether an image may be resused for a given slave.
	 *
	 * @param {App.Entity.SlaveState} s1 The first state of the slave. You are checking to see if this one may be used.
	 * @param {App.Entity.SlaveState} s2 The second state of the same slave
	 *
	 * @returns {{
	 * 	canReuse: boolean,
	 * 	difference?: number
	 * }} Difference score from 0 to infinity. 0 is identical, and 30 is "significantly different"
	 */
	function fuzzyCompareSlaves(s1, s2) {
		// Potential performance setting: have different sets of dealbreakers, potentialImpact etc. for different powered machines

		// TODO: migrate to what @Engineerix is building

		// Immediate disqualification from usage
		// Either they have large changes to appearance no matter how small (e.g. Style),
		// or the prompts are already fuzzy enough to ignore minor differences (e.g. height)
		const dealBreakers = [
			App.Art.GenAI.StylePromptPart,
			App.Art.GenAI.SkinPromptPart,
			App.Art.GenAI.RacePromptPart,
			App.Art.GenAI.GenderPromptPart,
			App.Art.GenAI.AgePromptPart,
			App.Art.GenAI.PregPromptPart,
			App.Art.GenAI.ClothesPromptPart,
			App.Art.GenAI.BreastsPromptPart,
			App.Art.GenAI.HairPromptPart,
			App.Art.GenAI.NationalityPromptPart,
			App.Art.GenAI.EyePromptPart,
			App.Art.GenAI.HealthPromptPart,
			App.Art.GenAI.PubicHairPromptPart,
			App.Art.GenAI.AmputationPromptPart,
			App.Art.GenAI.AndroidPromptPart,
			App.Art.GenAI.TattoosPromptPart,
			App.Art.GenAI.WeightPromptPart,
			App.Art.GenAI.HeightPromptPart,
			App.Art.GenAI.CollarPromptPart,
			App.Art.GenAI.WaistPromptPart,
			App.Art.GenAI.HipsPromptPart,
			App.Art.GenAI.CustomPromptPart // player probably cares
		];

		for (const DealBreaker of dealBreakers) {
			const p1 = new DealBreaker(s1);
			const p2 = new DealBreaker(s2);

			// immediate disqualification
			if (p1.positive() !== p2.positive()) {
				return {
					canReuse: false
				};
			}
		}

		let differenceScore = 0;

		// // Calculate and sum the "difference score" for each of these
		// // TODO: calibrate scores properly
		// const potentialImpact = [
		// 	App.Art.GenAI.BeautyPromptPart,
		// 	App.Art.GenAI.PosturePromptPart,
		// 	App.Art.GenAI.ArousalPromptPart,
		// 	App.Art.GenAI.MusclesPromptPart,
		// 	App.Art.GenAI.ExpressionPromptPart,
		// ];

		/**
			*
			* @param {number} num1
			* @param {number} num2
			* @param {number} threshold Minimum difference before counting it as different
			* @returns {number} difference score, above 0.
			*/
		const differenceThreshold = (num1, num2, threshold) => Math.max(Math.abs(num1 - num2) - threshold, 0);

		// beauty
		differenceScore += Math.abs(s1.face - s2.face);
		// posture (bad trust or bad devotion)
		if (s1.devotion < -20) {
			differenceScore += differenceThreshold(s1.devotion, s2.devotion, 0);
		}
		// arousal
		if (App.Data.clothes.get(s1.clothes).exposure < 3 !== App.Data.clothes.get(s2.clothes).exposure < 3) {
			differenceScore += differenceThreshold(s1.energy, s2.energy, 0);
		}
		// muscles
		differenceScore += 0.5 * differenceThreshold(s1.muscles, s2.muscles, 0);
		// expression (trust, devotion)
		differenceScore += 0.5 * differenceThreshold(s1.trust, s2.trust, 0);
		differenceScore += 0.5 * differenceThreshold(s1.devotion, s2.devotion, 0);


		// // // Will get regenerated only when schedule says to
		// const probablyDoesntMatter = [
		// 	App.Art.GenAI.EyebrowPromptPart,
		// 	App.Art.GenAI.PiercingsPromptPart
		// ]


		// random small amount to show that it wasn't an exact match.
		if (s1.eyebrowHStyle !== s2.eyebrowHStyle) {
			differenceScore += 0.1;
		}
		if ((new App.Art.GenAI.PiercingsPromptPart(s1)).positive() !== (new App.Art.GenAI.PiercingsPromptPart(s2)).positive()) {
			differenceScore += 0.1;
		}

		return {
			canReuse: differenceScore < SIGNIFICANTLY_DIFFERENT_THRESHOLD,
			difference: differenceScore
		};
	}


	/**
	 * Fuzzily compares to see if all the slaves in an array are close enough to be used again
	 *
	 * @param {App.Entity.SlaveState[]} slaveArr1
	 * @param {App.Entity.SlaveState[]} slaveArr2
	 *
	 * @returns {{canReuse: boolean, averageDifference: number}} Comparison results
	 */
	function fuzzyCompareSlavesArr(slaveArr1, slaveArr2) {
		let totalDifference = 0;
		let canReuse = true;

		if (slaveArr1.length !== slaveArr2.length) {
			throw new Error(`Trying to compare slave arrays of different sizes: ${JSON.stringify(slaveArr1)}, ${JSON.stringify(slaveArr2)}`);
		}

		for (let i = 0; i < slaveArr1.length; i++) {
			const diff = fuzzyCompareSlaves(slaveArr1[i], slaveArr2[i]);

			if (!diff.canReuse) {
				canReuse = false;
			}

			totalDifference += diff.difference;
		}

		return {
			canReuse,
			averageDifference: totalDifference / slaveArr1.length
		};
	}

	/**
	 * Finds the closest events from an array of events
	 *
	 * @private
	 *
	 * @param {App.Entity.SlaveState[]} slaveStates The state of the slaves you want an image for
	 * @param {App.Art.GenAI.EventStore.Entry[]} entries Previous event entries
	 * @param {{forceRegenerate: boolean}} options Fully populated misc options.
	 *
	 * @returns {{averageDifference: number, matches: App.Art.GenAI.EventStore.Entry[]}} Matches, and the lowest difference it could find. If totalDifference is 0, then it means it was an exact match.
	 */
	function findClosestEvents(slaveStates, entries, options) {
		/**
		 * @private
		 * @typedef ClosestEventRecord
		 * @property {App.Art.GenAI.EventStore.Entry[]} matches
		 * @property {number} averageDifference
		 */
		const fuzzyResults = entries.map((entry) => {
			return {
				entry,
				...fuzzyCompareSlavesArr(slaveStates, entry.slaveStates)
			};
		}).filter((record) => record.canReuse)
			.reduce(( /** @type {ClosestEventRecord} */prevRecord, currentRecord) => {
				if (currentRecord.averageDifference < prevRecord.averageDifference) {
					return {
						matches: [currentRecord.entry],
						averageDifference: currentRecord.averageDifference
					};
				} else if (currentRecord.averageDifference === prevRecord.averageDifference) {
					prevRecord.matches.push(currentRecord.entry);
				}
				return prevRecord;
			}, {matches: [], averageDifference: Number.MAX_SAFE_INTEGER});
		// to regenerate, we need an exact match.
		if (options.forceRegenerate && fuzzyResults.averageDifference > 0) {
			return {
				matches: [],
				averageDifference: Number.MAX_SAFE_INTEGER
			};
		}

		return fuzzyResults;
	}

	/**
	 * Get an image from the IndexedDB
	 * @param {App.Entity.SlaveState[]} slaves The ID of the image to retrieve
	 * @param {Partial<App.Art.GenAI.GetImageOptions>} [options] Misc options.
	 * Defaults: action='overview', size=App.Art.ArtSizes.SMALL, forceRegenerate: false, isEventImage: false
	 *
	 * @returns {FC.PromiseWithProgress<App.Art.GenAI.EventStore.Entry>} Promise object that resolves with the retrieved image data
	 */
	function getImage(slaves, options = {}) {
		const progressFns = [];
		const result = Object.assign(
			new Promise((resolve, reject) => {
				(async () => {
					await waitForInit();

					/** @type {App.Art.GenAI.GetImageOptions} */
					const effectiveOptions = {
						/** @type {App.Art.GenAI.Action} */
						action: 'overview',
						size: App.Art.ArtSizes.SMALL,
						forceRegenerate: false,
						isEventImage: false,
						...options
					};

					// Data is optional
					/** @type {Omit<App.Art.GenAI.EventStore.Entry, "data"> & { data?: App.Art.GenAI.EventStore.DataType}} */
					let event = {
						slaveIds: slaves.map(s => s.ID).sort(),
						seed: slaves[0].natural.artSeed,
						slaveStates: slaves.map(slave => ({
							// This can un-proxy a slave so it can be stored in IndexedDB
							...slave,
							// This gets turned into a function sometimes and that breaks storing in IndexedDB
							clone: typeof slave.clone === "function" ? 0 : slave.clone,
						})),
						action: effectiveOptions.action,
					};

					// look for identical event
					/** @type {App.Art.GenAI.EventStore.Entry[]} */
					const eventEntries = await db.getAllFromIndex(EVENT_STORE.path, EVENT_STORE.indicies.bySlaveIdsActions, IDBKeyRange.only([event.slaveIds, event.action]));

					const {matches, averageDifference} = findClosestEvents(slaves, eventEntries, effectiveOptions);
					const shouldUseCache = (averageDifference <= SIGNIFICANTLY_DIFFERENT_THRESHOLD) && !effectiveOptions.forceRegenerate;
					const isExactMatch = averageDifference === 0;
					const chosenEvent = matches[Math.floor(Math.random() * matches.length)];

					// Use the cached value
					if (matches?.length > 0 && shouldUseCache) {
						// Any of the allowed entries will work. Return a random one.
						return matches[Math.floor(Math.random() * matches.length)];
					}

					const base64Image = await generateNewImage(slaves, effectiveOptions);

					/** @type {App.Art.GenAI.EventStore.Entry} */
					// @ts-expect-error
					let fullEvent = event;
					if (isExactMatch) {
						// fill in with previous data
						fullEvent = {
							...event,
							...chosenEvent
						};
					}

					if (event.action === 'overview') {
						fullEvent.data = {
							images: {
								lowRes: base64Image
							}
						};
					}

					// save it to the DB, unless it's temporary
					if (!fullEvent.slaveIds.includes(0)) {
						await db.put(EVENT_STORE.path, fullEvent);
					}

					return fullEvent;
				})().then(resolve).catch(reject);
			}),
			{
				/**
				 * Do something when there's progress on generating an image
				 * @param {(progress: number) => void} fn A function to call when there's progress
				 * @returns {FC.PromiseWithProgress<App.Art.GenAI.EventStore.Entry>}
				 */
				onProgress(fn) {
					progressFns.push(fn);
					return result;
				}
			}
		);

		const interval = setInterval(async () => {
			// Sometimes the same slave has multiple images being generated, like in the dressing room
			if (slaves.map((slave) => slave.ID).includes(App.Art.GenAI.sdQueue.workingOnID)) {
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

	/**
	 * Count the images currently in the DB
	 * @returns {Promise<number>}
	 */
	async function count() {
		await waitForInit();
		return db.count(EVENT_STORE.path);
	}

	async function init() {
		db = await createDB();
		initialized = true;
	}

	function isInit() {
		return initialized;
	}

	/**
	 * Purge all the images from DB
	 */
	async function clear() {
		await waitForInit();
		return Promise.all(ALL_STORES.map(store => db.clear(store.path)));
	}



	// /**
	//  * Gets all images where actor(s) have participated in.
	//  *
	//  * @param {number | number[]} slaveIds Id of actor(s) in the image.
	//  * @param {{soloOnly: boolean}} options
	//  */
	// async function getAllSlaveEvents(slaveIds, options) {
	// 	// TODO for gallery view
	// }

	// /**
	//  * Gets all images where actor(s) have participated in.
	//  *
	//  * @param {number | number[]} slaveIds Id of actor(s) in the image.
	//  * @param {{soloOnly: boolean}} options
	//  */
	// async function getAllSlaveImages(slaveIds, options) {
	// 	/** @type {number[]} */
	// 	let searchForIds;
	// 	if (typeof slaveIds === 'number') {
	// 		searchForIds = [slaveIds];
	// 	} else {
	// 		searchForIds = slaveIds;
	// 	}

	// 	const actorQuery = IDBKeyRange.only(slaveIds);

	// 	const tx = db.transaction([EVENT_STORE.path]);
	// 	const cursor = await tx.objectStore(EVENT_STORE.path)
	// 		.index(EVENT_STORE.indicies.bySlaveId)
	// 		.openCursor(actorQuery);

	// 	const eventEntries = [];
	// 	let eventEntry;
	// 	while (eventEntry = await cursor?.continue()) {
	// 		eventEntries.push(eventEntry);
	// 	}
	// }

	/**
	 * Regenerates images for all slaves
	 */
	async function regenAllImages() {
		V.slaves.forEach((s) => getImage([s], {forceRegenerate: true}));
	}



	/**
	 * Count the images currently in the DB
	 * @returns {Promise<string>}
	 */
	async function sizeInfo() {
		await waitForInit();
		const numImages = await count();

		let sizeEstimate;
		// Navigator.storage not supported in all browsers
		try {
			// Total memory usage of this origin
			const estimate = await navigator.storage.estimate();
			sizeEstimate = (estimate.usage / 1024 / 1024).toFixed(2) + "MB";
		} catch (e) {
			console.error(e);
		}

		return `${numImages} images ${sizeEstimate ? ` (${sizeEstimate})` : ''}`;
	}

	return {
		/**
		 * Flow control
		 */
		/** Initalizes database */
		init,
		/** Resolves promise when DB has been initalized */
		waitForInit,
		/** Checks to see if DB is initalized */
		isInit,
		/** Close the DB */
		close,
		/** Number of images in the DB */
		count,
		sizeInfo,

		/**
		 * Intelligently (create/update/reads image) then returns it. You should use this most of the time.
		 * Ideally, the DB will deal with caching/sending requests to SD.
		 */
		getImage,
		/** Gets all images of a given slave */
		// getAllSlaveImages,
		/** Clear DB to start from scratch */
		clear,
		/** Regenerate images for _all slaves_ */
		regenAllImages,
	};
})();

App.Art.GenAI.reactiveImageDB.init();
