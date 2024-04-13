App.Art.GenAI.getOpenPoseData = (function() {
	/**
	 * @param {FC.SlaveState} slave
	 * @returns {Promise<string>} or null if posing should be prompt-only
	 */
	async function getData(slave) {
		if (V.aiOpenPose) {
			if (isAmputee(slave)) {
				return null; // TODO: openpose really thinks you should have limbs...might be able to do something with special poses, though? worth experimenting with probably
			}
			if (slave.custom.aiPose) {
				switch (slave.custom.aiPose.type) {
					case "Library":
						return poseFromLibrary(slave.custom.aiPose.name);
					case "JSON":
						return fetch(`resources/poses/${slave.custom.aiPose.filename}.json`)
							.then(value => {
								return value.text();
							}).then(obj => {
								return App.Art.GenAI.sdClient.renderOpenPoseJSON(obj);
							});
					case "PNG":
						return fetch(`resources/poses/${slave.custom.aiPose.filename}.png`)
							.then(value => {
								return value.blob();
							}).then(blob => {
								return blobToBase64(blob);
							});
					default:
						throw new Error("Unexpected custom pose type");
				}
			} else {
				// TODO: pick a pose programmatically. should align with the prompts in PosturePromptPart, otherwise weirdness will ensue.
				return null; // for now, bail out here - lines below dummied out to prevent "unreachable code after return" debugger complaints
				// let pose = "Standing, Neutral";
				// return poseFromLibrary(pose);
			}
		}
		return null;
	}

	/**
	 * @param {string} name
	 * @returns {Promise<string>}
	 */
	async function poseFromLibrary(name) {
		const entry = App.Data.Art.Poses[name];
		if (!entry) {
			throw new Error(`Could not find pose in library: ${name}`);
		}
		if (!entry.cache) {
			entry.cache = await App.Art.GenAI.sdClient.renderOpenPoseJSON(entry.poseData);
		}
		return entry.cache;
	}

	return getData;
})();
