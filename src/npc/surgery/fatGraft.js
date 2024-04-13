/**
 * @param {App.Entity.SlaveState} slave
 * @param {()=>void} refreshPage
 */
App.UI.SlaveInteract.fatGraft = function(slave, refreshPage) {
	let availableFat = Math.round(slave.weight / 10);
	let boobFat = 0;
	let buttFat = 0;

	const container = document.createElement("div");
	container.append(content());

	if (Dialog.isOpen()) {
		Dialog.close();
	}
	Dialog.setup("Fat Grafting");
	Dialog.append(container);
	Dialog.open();


	function content() {
		const el = new DocumentFragment();
		let r = [];
		const {his} = getPronouns(slave);
		let p;
		let linkArray = [];
		const buttCost = (slave.butt > 10) ? 5 : 2; // Buttsizes are apparently not linear, so it takes a lot more fat to increase the largest booties.
		r.push(`All surplus body fat was harvested, and enough is graftable for an additional ${availableFat * 100}ccs per breast or an additional ${num(Math.trunc(availableFat / buttCost))} sizes to ${his} rear.`);
		if (availableFat === 0) {
			r.push(`All fat marked for use.`);
		} else {
			r.push(`A total of ${availableFat} ${(availableFat === 1) ? `unit remains` : `units remain`}.`);
		}
		App.Events.addNode(el, r, "p", "scene-intro");

		// Boobs
		p = App.UI.DOM.appendNewElement("p", el);
		App.UI.DOM.appendNewElement("div", p, `${capFirstChar(String(num(boobFat)))} units of fat will be added to ${his} breasts for a size gain of ${boobFat * 100}ccs.`);
		if (availableFat > 0) {
			linkArray.push(
				App.UI.DOM.link(
					"Increase",
					() => {
						boobFat++;
						availableFat--;
						refresh();
					}
				)
			);
		} else {
			linkArray.push(App.UI.DOM.disabledLink(`No more fat available.`, []));
		}
		if (boobFat > 0) {
			linkArray.push(
				App.UI.DOM.link(
					"Decrease",
					() => {
						boobFat--;
						availableFat++;
						refresh();
					}
				)
			);
		} else {
			linkArray.push(App.UI.DOM.disabledLink(`No fat marked for breast use.`, []));
		}
		App.UI.DOM.appendNewElement("div", p, App.UI.DOM.generateLinksStrip(linkArray));

		// Ass
		p = App.UI.DOM.appendNewElement("p", el);
		linkArray = [];
		App.UI.DOM.appendNewElement("div", p, `${capFirstChar(String(num(buttFat * buttCost)))} units of fat will be added to ${his} ass for a size gain of ${buttFat}.`);
		if (availableFat / buttCost > 1) {
			linkArray.push(
				App.UI.DOM.link(
					"Increase",
					() => {
						buttFat++;
						availableFat -= buttCost;
						refresh();
					}
				)
			);
		} else if (availableFat) {
			linkArray.push(App.UI.DOM.disabledLink(`Not enough fat remains to increase ${his} butt an entire size.`, []));
		} else {
			linkArray.push(App.UI.DOM.disabledLink(`No more fat available.`, []));
		}
		if (buttFat > 0) {
			linkArray.push(
				App.UI.DOM.link(
					"Decrease",
					() => {
						buttFat--;
						availableFat += buttCost;
						refresh();
					}
				)
			);
		} else {
			linkArray.push(App.UI.DOM.disabledLink(`No fat marked for ass use.`, []));
		}
		App.UI.DOM.appendNewElement("div", p, App.UI.DOM.generateLinksStrip(linkArray));
		App.UI.DOM.appendNewElement("p", el, App.Medicine.Surgery.makeLink(
			new App.Medicine.Surgery.Procedures.FatGraft(slave, boobFat, buttFat),
			refreshPage, false));
		return el;
	}

	function refresh() {
		App.UI.DOM.replace(container, content());
	}
};
