/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.modify = function(slave) {
	const {he, his} = getPronouns(slave);
	let el = new DocumentFragment();

	const isAgent = [Job.AGENT, Job.AGENTPARTNER].includes(slave.assignment);

	App.UI.DOM.appendNewElement('p', el, isAgent ? "Recall your agent to modify them." : "Take slave to another room.", ["scene-intro"]);

	if (isAgent) {
		return el;
	}

	el.append(rooms());

	return el;

	/**
	 * Makes a paragraph of link to send slaves to specific rooms
	 * @returns {HTMLParagraphElement}
	 */
	function rooms() {
		const p = document.createElement("p");

		makeRoomLink(p, "Auto salon", "Salon", ' Modify hair (color, length, style), nails, and even skin color.');

		makeRoomLink(p, "Body mod studio", "Body Modification", ' Mark your slave with piercings, tattoos, brands or even scars.');

		makeRoomLink(p, "Remote surgery", "Remote Surgery", ` Surgically modify your slave with state of the art plastic surgery and more. Alter ${his} senses, skeletal structure, organs, and even more.`);

		// Prosthetics
		if (V.prostheticsUpgrade > 0) {
			makeRoomLink(p, "Configure cybernetics", "Prosthetics Configuration", ` Configure prosthetics, if ${he} has been surgically implanted with interfaces that support it.`,
				() => {
					V.prostheticsConfig = "main";
				}
			);
		}

		// Analyze Pregnancy
		if (V.pregnancyMonitoringUpgrade > 0) {
			makeRoomLink(p, "Internal scan", "Analyze Pregnancy", ` Full scan of abdomen and reproductive organs.`);
		}

		return p;
	}

	/**
	 * Create a link with a note to send a slave to a specific room
	 * @param {Node} c
	 * @param {string} caption
	 * @param {string} passage
	 * @param {string} note
	 * @param {function ():void} [handler]
	 */
	function makeRoomLink(c, caption, passage, note, handler = () => {}) {
		const res = document.createElement('div');
		c.appendChild(res);
		res.appendChild(App.UI.DOM.link(caption, handler, [], passage));
		App.UI.DOM.appendNewElement('span', res, note, "note");
		return res;
	}
};
