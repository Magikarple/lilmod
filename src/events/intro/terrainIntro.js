/**
 * @typedef FC.ArcologyLocation
 *
 * @property {string} name
 * @property {string} value
 * @property {string} [market]
 * @property {string} [commerce]
 * @property {string} [refugees]
 * @property {string} [culture]
 * @property {string[]} [notes]
 */

App.Intro.terrainIntro = function() {
	const node = new DocumentFragment();

	App.Events.addParagraph(node, [`The Free Cities are located wherever the rule of law is weak enough or permissive enough to allow a small area to secede, and where founders can afford to buy an area on which to build.`]);

	App.Events.addParagraph(node, [`Many Free Cities are therefore located in marginal, rural terrain. Founding a Free City in such an area is easy, and can usually be accomplished with the indifference or even connivance of the old country from which it secedes. After all, the potential commercial benefits are great, and the loss of underused land is only significant in the moral sense.`]);

	App.Events.addParagraph(node, [`Some Free Cities are located on water. Though some areas of shallow sea over the continental shelves hide valuable resources, others are neglected. Arcologies are such massive structures that it is very possible to design them to float anchored to the seabed.`]);

	App.Events.addParagraph(node, [`Finally, a few Free Cities have been carved out from old world cities. Urban decay has left the hearts of many cities ripe for this. Many old world countries resist this kind of secession, but this rarest, smallest, and densest kind of Free City can offer its surrounding nation a great deal of economic advantage.`]);

	App.UI.DOM.appendNewElement("p", node, `Which kind of Free City hosts your arcology?`, ["intro", "question"]);

	/** @type {FC.ArcologyLocation[]} */
	const locations = [
		{
			name: `Urban`,
			value: "urban",
			market: `<span class="noteworthy">Low</span> minimum slave value and initial <span class="noteworthy">bear market</span> for slaves.`,
			commerce: `<span class="positive">High</span> ease of commerce with the old world.`,
			refugees: `<span class="positive">High</span> access to refugees and other desperate people.`,
			culture: `<span class="warning">Low</span> cultural independence.`,
			notes: [
				`Unusually compact arcology with few manufacturing sectors.`,
			],
		},
		{
			name: `Rural`,
			value: "rural",
			market: `<span class="noteworthy">High</span> minimum slave value and initial <span class="noteworthy">bull market</span> for slaves.`,
			commerce: `Moderate ease of commerce with the old world.`,
			refugees: `Moderate access to refugees and other desperate people.`,
			culture: `Moderate cultural independence.`,
			notes: [
				`Widespread arcology with many manufacturing sectors.`,
			],
		},
		{
			name: `Ravine`,
			value: "ravine",
			market: `<span class="noteworthy">High</span> minimum slave value and initial <span class="noteworthy">bull market</span> for slaves.`,
			commerce: `<span class="warning">Low</span> ease of commerce with the old world.`,
			refugees: `<span class="warning">Very low</span> access to refugees and other desperate people.`,
			culture: `<span class="positive">High</span> cultural independence.`,
			notes: [
				`The arcology mostly being hidden inside the ravine leads to an unusual layout.`,
			],
		},
		{
			name: `Marine`,
			value: "marine",
			market: `Moderate minimum slave value and initially balanced market for slaves.`,
			commerce: `Moderate ease of commerce with the old world.`,
			refugees: `<span class="warning">Low</span> access to refugees and other desperate people.`,
			culture: `<span class="positive">High</span> cultural independence.`,
			notes: [
				`Large amount of markets and an extra shop sector.`,
			],
		},
		{
			name: `Oceanic`,
			value: "oceanic",
			market: `<span class="noteworthy">High</span> minimum slave value and initial <span class="noteworthy">bull market</span> for slaves.`,
			commerce: `Moderate ease of commerce with the old world.`,
			refugees: `<span class="warning">Very low</span> access to refugees and other desperate people.`,
			culture: `<span class="positive">Very high</span> cultural independence.`,
			notes: [
				`This unique location attracts the wealthy leading to initial luxury apartments.`,
				`Ensures access to slaves from all over the world and will not associate the arcology with a continent.`,
				V.showSecExp ? `Oceanic arcologies will not be subjects of attacks.` : ``
			],
		},
	];

	const div = document.createElement("div");

	for (const location of locations) {
		div.append(locationCard(location));
	}

	node.append(div);

	/** @param {FC.ArcologyLocation} location */
	function locationCard(location) {
		const div = App.UI.DOM.makeElement("div", null, ['card']);
		const keys = ["market", "commerce", "refugees", "culture", "notes"];

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.passageLink(
			location.name,
			"Location Intro",
			() => V.terrain = location.value,
		));

		keys
			.filter(key => location.hasOwnProperty(key))
			.forEach(key => {
				const innerDiv = App.UI.DOM.makeElement("div", null, ['indent']);
				const item = location[key];

				if (Array.isArray(item)) {
					item.forEach(n => {
						innerDiv.append(App.UI.DOM.makeElement("div", n, ['note']));
					});
				} else {
					innerDiv.innerHTML = item;
				}

				div.append(innerDiv);
			});

		return div;
	}

	if (V.showSecExp === 1) {
		App.UI.DOM.link(
			"Hide Security Expansion Mod effects",
			() => {
				V.showSecExp = 0;
				App.UI.reload();
			}
		);
	} else {
		App.UI.DOM.link(
			"Show Security Expansion Mod effects",
			() => {
				V.showSecExp = 1;
				App.UI.reload();
			}
		);
	}

	return node;
};
