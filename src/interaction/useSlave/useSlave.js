/**
 * Creates a new sex scene.
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLDivElement}
 */
App.UI.SlaveInteract.useSlave = function(slave) {
	// Declarations
	const playerState = new App.UI.SlaveInteract.CharacterState();
	const slaveState = new App.UI.SlaveInteract.CharacterState();
	setUpClothing(playerState, slaveState);

	const PC = V.PC;
	const tempSlave = new App.UI.SlaveInteract.Clone(slave)
		.assign(slaveState)
		.getSlave();

	const {he, him, his} = getPronouns(slave);

	/** @type {FC.UseSlave.Option[]} */
	const log = [];
	/** @enum {string} */
	const none = "none";

	let introShown = false;

	const div = document.createElement("div");

	div.id = 'use-slave-container';
	div.append(main());

	return div;

	// Main Loop
	function main() {
		const div = document.createElement("div");

		if (playerState.lust < 25 * V.PC.sexualEnergy) {
			if (introShown) {
				div.append(options());
			} else {
				div.append(intro());
			}
		} else {
			if (introShown) {
				div.append(`You are out of stamina.`);
			} else {
				App.UI.DOM.appendNewElement("span", div, `You have recently had sex with ${him}`, ["note"]);
			}
		}

		return div;
	}

	// Text Functions
	function intro() {
		introShown = true;

		const mainSpan = App.UI.DOM.makeElement("span", `Use ${him} and take control: `);

		if (tempSlave.devotion > 50) {
			const intro = App.UI.DOM.makeElement("div", `You pull ${tempSlave.slaveName} in close and tell ${him} that you want to make love. With ${tempSlave.mouthAccessory === none
				? `a ${Beauty(tempSlave) > 150 && tempSlave.face > 10 ? `pretty` : `quick`} smile`
				: `as much of a smile as ${his} ${tempSlave.mouthAccessory} will allow`
			}, ${he} makes it clear that your advances are not unwanted.`);

			intro.append(options());
			mainSpan.append(App.UI.DOM.linkReplace(
				`Have sex with ${him}`,
				intro
			));

			return mainSpan;
		} else if (tempSlave.devotion > 20) {
			const intro = App.UI.DOM.makeElement("div", `You tell ${tempSlave.slaveName} that you want to fuck ${him}. Though ${he} seems hesitant, your tone and the stern look in your eye make it clear that ${he} has no choice, and ${he} reluctantly agrees.`);

			intro.append(options());
			mainSpan.append(App.UI.DOM.linkReplace(
				`Fuck ${him}`,
				intro
			));

			return mainSpan;
		} else {
			const intro = App.UI.DOM.makeElement("div", `You tell ${tempSlave.slaveName} that you're going to fuck ${him}, whether ${he} likes it or not. The daggers ${he} glares at you feel almost physically tangible, but ${he} knows that ${he} ultimately has no choice.`);

			intro.append(options());
			mainSpan.append(App.UI.DOM.linkReplace(
				`Rape ${him}`,
				intro
			));

			return mainSpan;
		}
	}

	// Generator Functions
	function options() {
		const optionsDiv = document.createElement("div");
		const options = App.UI.SlaveInteract.useSlave.options(PC, tempSlave, slave, playerState, slaveState);

		const contextual = generateOptions(options.contextual, optionsDiv);
		const face = generateOptions(options.face, optionsDiv);
		const chest = generateOptions(options.chest, optionsDiv);
		const crotch = generateOptions(options.crotch, optionsDiv);
		const general = generateOptions(options.general, optionsDiv);
		const clothing = generateOptions(options.clothing, optionsDiv);

		optionsDiv.append(contextual, face, chest, crotch, general, clothing);

		return optionsDiv;
	}

	/**
	 * @param {Array<FC.UseSlave.Option>} arr
	 * @param {HTMLDivElement} div
	 * @returns {HTMLDivElement}
	 */
	function generateOptions(arr, div) {
		const mainDiv = document.createElement("div");

		const availableOptions = arr.filter(option => option.prereq());

		mainDiv.append(generateLinks(availableOptions, div));

		return mainDiv;
	}

	/**
	 * @param {Array<FC.UseSlave.Option>} available
	 * @param {HTMLDivElement} div
	 */
	function generateLinks(available, div) {
		const links = [];

		available.forEach((e) => links.push(App.UI.DOM.link(e.link, () => {
			div.innerHTML = e.desc;
			div.append(App.UI.DOM.makeElement("div", e.reaction, ['indent', 'italics']));

			log.push(new App.UI.SlaveInteract.Option(e.link, e.desc, e.tooltip, e.prereq, e.effect, e.reaction));

			e.effect();

			if (V.debugMode) {
				console.log(
					playerState,
					slaveState,
					log,
				);
			}

			div.append(main());

			div.scrollTop = div.scrollHeight - div.clientHeight;
		}, null, '', e.tooltip)));

		return App.UI.DOM.generateLinksStrip(links);
	}

	// Helper functions

	// Adjust characters' clothing state before scene is shown
	function setUpClothing(playerState, slaveState) {
		// Assume the PC is fully clothed. Remove the bra if boobs are small/nonexistent.
		if (V.PC.boobs < 300) {
			playerState.clothing.bra = false;
		}
		// If slave boobs are small/nonexistent, default to no bra.
		if (slave.boobs < 300) {
			slaveState.clothing.bra = false;
		}
		// Adjust slave clothing state based on their outfit.
		const nakedOutfits = ["no clothing", "body oil"];
		const pantyOutfits = ["a skimpy loincloth", "a thong", "panties", "striped panties"];
		const braOutfits = ["a bra", "a sports bra", "a striped bra"];
		const pantyBraOutfits = ["a slutty outfit", "attractive lingerie", "attractive lingerie for a pregnant woman", "kitty lingerie", "panties and pasties", "striped underwear"];
		const noUnderwearOutfits = ["a burkini", "a comfortable bodysuit", "a tight Imperial bodysuit", "a cybersuit", "a fallen nuns habit", "a leotard", "a latex catsuit", "a monokini", "a one-piece swimsuit", "a scalemail bikini", "a slutty klan robe", "a slutty maid outfit", "a slutty nurse outfit", "a slutty pony outfit", "a slutty qipao", "a slutty schutzstaffel uniform", "a string bikini", "a succubus outfit", "a toga", "an apron", "chains", "clubslut netting", "harem gauze", "overalls", "restrictive latex", "shibari ropes", "slutty business attire", "slutty jewelry", "uncomfortable straps"]; // ex. swimsuits, slutty jewelry, bodysuits
		const noBottomOutfits = ["a button-up shirt", "a sweater", "a t-shirt", "a tank-top", "a tube top", "an oversized t-shirt"];
		const noTopOutfits = ["boyshorts", "cutoffs", "jeans", "leather pants", "sport shorts"];

		if (nakedOutfits.includes(slave.clothes)) {
			slaveState.clothing.top.isOff = true;
			slaveState.clothing.bottom.isOff = true;
			slaveState.clothing.bra = false;
			slaveState.clothing.underwear = false;
		} else if (pantyOutfits.includes(slave.clothes)) {
			slaveState.clothing.top.isOff = true;
			slaveState.clothing.bottom.isOff = true;
			slaveState.clothing.bra = false;
		} else if (braOutfits.includes(slave.clothes)) {
			slaveState.clothing.top.isOff = true;
			slaveState.clothing.bottom.isOff = true;
			slaveState.clothing.underwear = false;
		} else if (pantyBraOutfits.includes(slave.clothes)) {
			slaveState.clothing.top.isOff = true;
			slaveState.clothing.bottom.isOff = true;
		} else if (noUnderwearOutfits.includes(slave.clothes)) {
			slaveState.clothing.bra = false;
			slaveState.clothing.underwear = false;
		} else if (noBottomOutfits.includes(slave.clothes)) {
			slaveState.clothing.bottom.isOff = true;
			slaveState.clothing.underwear = false;
		} else if (noTopOutfits.includes(slave.clothes)) {
			slaveState.clothing.top.isOff = true;
			slaveState.clothing.bra = false;
		}
	}
};
