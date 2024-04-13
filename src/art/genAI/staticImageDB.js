App.Art.GenAI.staticImageDB = (function() {
	/** @type {IDBDatabase} */
	let db;

	let initialized = false;
	async function waitForInit() {
		const sleep = () => new Promise(r => setTimeout(r, 10));
		while (!initialized) {
			await sleep();
		}
	}

	/**
	 * Create an IndexedDB and initialize objectStore if it doesn't already exist.
	 * @returns {Promise<IDBDatabase>} Promise object that resolves with the opened database
	 */
	async function createDB() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open('AIImages', 1);

			request.onerror = function() {
				console.log('Database failed to open');
				reject('Database failed to open');
				initialized = true; // stop waiting and just fail any pending operations
			};

			request.onsuccess = function() {
				console.log('Database opened successfully');
				db = request.result;
				initialized = true; // stop waiting and process pending operations
				resolve(db);
			};

			request.onupgradeneeded = function(e) {
				// @ts-ignore
				let db = e.target.result;
				db.createObjectStore('images', {keyPath: 'id', autoIncrement: true});
			};
		});
	}

	/**
	 * Add an image to the IndexedDB
	 * @param {object} imageData - The image data to store
	 * @returns {Promise<number>} Promise object that resolves with the ID of the stored image
	 */
	async function putImage(imageData) {
		await waitForInit();
		return new Promise((resolve, reject) => {
			let transaction = db.transaction(['images'], 'readwrite');
			let objectStore = transaction.objectStore('images');

			let request = objectStore.put(imageData);

			request.onsuccess = function() {
				resolve(Number(request.result));
			};

			transaction.oncomplete = function() {
				console.log('Transaction completed: database modification finished.');
			};

			transaction.onerror = function() {
				console.log('Transaction not opened due to error');
				reject('Transaction not opened due to error');
			};
		});
	}

	/**
	 * Get an image from the IndexedDB
	 * @param {number} id - The ID of the image to retrieve
	 * @returns {Promise<object>} Promise object that resolves with the retrieved image data
	 */
	async function getImage(id) {
		await waitForInit();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(['images'], 'readonly');
			const objectStore = transaction.objectStore('images');
			const request = objectStore.get(id);

			request.onsuccess = function() {
				if (request.result === undefined) {
					reject(new Error(`Image with ID ${id} not found in the database.`));
				} else {
					resolve(request.result);
				}
			};

			request.onerror = function() {
				reject(new Error(`Error fetching image with ID ${id}`));
			};
		});
	}

	/**
	 * Remove an image from the IndexedDB
	 * @param {number} id - The ID of the image to remove
	 */
	async function removeImage(id) {
		await waitForInit();
		return new Promise((resolve, reject) => {
			let transaction = db.transaction(['images'], 'readwrite');
			let objectStore = transaction.objectStore('images');

			let request = objectStore.delete(id);
			request.onsuccess = function() {
				resolve();
			};
		});
	}

	/**
	 * Purge all the images from DB
	 */
	async function clear() {
		await waitForInit();
		return new Promise((resolve, reject) => {
			let transaction = db.transaction(['images'], 'readwrite');
			let objectStore = transaction.objectStore('images');

			let request = objectStore.clear();
			request.onsuccess = function() {
				resolve();
			};
		});
	}

	/**
	 * Count the images currently in the DB
	 * @returns {Promise<string>}
	 */
	async function sizeInfo() {
		await waitForInit();
		const count = await new Promise((resolve) => {
			let transaction = db.transaction(['images'], 'readonly');
			let objectStore = transaction.objectStore('images');

			let request = objectStore.count();
			request.onsuccess = function() {
				resolve(request.result);
			};
		});

		let sizeEstimate;
		// Navigator.storage not supported in all browsers
		try {
			// Total memory usage of this origin
			const estimate = await navigator.storage.estimate();
			sizeEstimate = (estimate.usage / 1024 / 1024).toFixed(2) + "MB";
		} catch (e) {
			console.error(e);
		}

		return `${count} images ${sizeEstimate ? ` (${sizeEstimate})` : ''}`;
	}

	return {
		createDB,
		putImage,
		getImage,
		removeImage,
		clear,
		sizeInfo
	};
})();

App.Art.GenAI.staticImageDB.createDB();
