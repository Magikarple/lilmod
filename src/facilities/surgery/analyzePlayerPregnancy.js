App.UI.analyzePCPregnancy = function() {
	const node = new DocumentFragment();

	if (lastVisited("Incubator") === 1) {
		V.storedLink = "Incubator";
	} else if (lastVisited("Manage Personal Affairs") === 1) {
		V.storedLink = "Manage Personal Affairs";
	}
	V.nextButton = "Continue";
	V.nextLink = V.storedLink;

	const WL = V.PC.womb.length;
	const incubatorReservations = WombReserveCount(V.PC, "incubator");
	const nurseryReservations = WombReserveCount(V.PC, "nursery");
	const freeTanks = V.incubator.capacity - V.incubator.tanks.length;
	const freeCribs = V.nurseryCribs - V.cribs.length;
	const reservedChildren = FetusGlobalReserveCount("incubator");
	const reservedChildrenNursery = FetusGlobalReserveCount("nursery");
	let linkArray = [];

	if (WL === 0) {
		setTimeout(() => Engine.play("Manage Personal Affairs"), Engine.minDomActionDelay);
	} else {
		App.UI.DOM.appendNewElement("p", node, `You make yourself comfortable and prep your stomach for examination.`, "scene-intro");

		App.Events.addParagraph(node, [App.Desc.Player.analyzePreg()]);

		App.UI.DOM.appendNewElement("h2", node, "Furthest developed pregnancy");
		App.UI.DOM.appendNewElement("p", node, `Fetal development week: ${V.PC.preg}`);

		let p = App.UI.DOM.appendNewElement("p", node);
		if (V.incubator.capacity > 0 || V.nurseryCribs > 0) {
			let div = App.UI.DOM.appendNewElement("div", p);
			if (V.incubator.capacity > 0) {
				if (incubatorReservations > 0) {
					linkArray.push(App.UI.DOM.link(
						`Remove all of your children from ${V.incubator.name}`,
						() => {
							WombChangeReserveType(V.PC, "incubator", "");
						},
						[],
						"Analyze PC Pregnancy"
					));
				}
				if (incubatorReservations < WL && (reservedChildren + WL - incubatorReservations <= freeTanks)) {
					linkArray.push(App.UI.DOM.link(
						`Keep all of your children in ${V.incubator.name}`,
						() => {
							WombChangeReserveType(V.PC, "nursery", "incubator");
							WombChangeReserveType(V.PC, "", "incubator");
						},
						[],
						"Analyze PC Pregnancy"
					));
				} else if (incubatorReservations < WL) {
					App.UI.DOM.appendNewElement("span", div, `There is not enough free space in ${V.incubator.name} for the rest of your children.`);
				}
				div.append(App.UI.DOM.generateLinksStrip(linkArray));
			}

			linkArray = [];
			div = App.UI.DOM.appendNewElement("div", p);
			if (V.nursery > 0) {
				if (nurseryReservations > 0) {
					linkArray.push(App.UI.DOM.link(
						`Remove all of your children from ${V.nurseryName}`,
						() => {
							WombChangeReserveType(V.PC, "nursery", "");
						},
						[],
						"Analyze Pregnancy"
					));
				}
				if (nurseryReservations < WL && (reservedChildrenNursery + WL - nurseryReservations <= freeCribs)) {
					linkArray.push(App.UI.DOM.link(
						`Keep all of your children in ${V.nurseryName}`,
						() => {
							WombChangeReserveType(V.PC, "incubator", "nursery");
							WombChangeReserveType(V.PC, "", "nursery");
						},
						[],
						"Analyze Pregnancy"
					));
				} else if (nurseryReservations < WL) {
					App.UI.DOM.appendNewElement("span", div, `There is not enough free space in ${V.nurseryName} for the rest of your children.`);
				}
				div.append(App.UI.DOM.generateLinksStrip(linkArray));
			}
		}
		App.UI.DOM.appendNewElement("h2", node, "Deep scan");
		App.UI.DOM.appendNewElement("p", node, analyzePregnancies(V.PC, false));
		transplantAndTerminateButtons(V.PC, node, {
			terminateAllText: "Terminate all your fetuses",
			terminateText: "Terminate #terminatable of your fetuses",
			transplantAllText: "Transplant all your fetuses",
			transplantText: "Transplant #transplantable of your fetuses",
		});
	}
	return node;
};
