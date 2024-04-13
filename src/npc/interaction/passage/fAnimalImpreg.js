/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLElement}
 */
App.Interact.fAnimalImpreg = function(slave) {
	const node = document.createElement("div");
	let r = [];
	let eligibility;
	const {him} = getPronouns(slave);

	App.UI.DOM.appendNewElement("h2", node, `Select an eligible animal to knock ${him} up`);

	/* FIXME: this might not work */
	for (const canine of V.animals.canine) {
		if (canBreed(slave, getAnimal(canine))) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				`Have a ${getAnimal(canine).species !== "dog" ? getAnimal(canine).species : getAnimal(canine).name} knock ${him} up`,
				() => jQuery(node).empty().append(content(canine))
			));
			eligibility = true;
		}
	}
	for (const hooved of V.animals.hooved) {
		if (canBreed(slave, getAnimal(hooved))) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				`Have a ${getAnimal(hooved).species} knock ${him} up`,
				() => jQuery(node).empty().append(content(hooved))
			));
			eligibility = true;
		}
	}
	for (const feline of V.animals.feline) {
		if (canBreed(slave, getAnimal(feline))) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				`Have a ${getAnimal(feline).species !== "cat" ? getAnimal(feline).species : getAnimal(feline).name} knock ${him} up`,
				() => jQuery(node).empty().append(content(feline))
			));
			eligibility = true;
		}
	}
	if (!eligibility) {
		App.UI.DOM.appendNewElement("div", node, `You have no animals capable of inseminating ${him}`, ['note']);
	}
	App.Events.addParagraph(node, r);
	return node;

	function content(animal) {
		const el = new DocumentFragment();
		r.push(`You have a servant lead the`);
		if (animal.species !== "dog" && animal.species !== "cat") {
			r.push(animal.species);
		} else {
			r.push(animal.name);
		}
		r.push(`in on a leash and feed him a special treat, one laced with high amounts of aphrodisiacs and vasodilators. They have an effect very rapidly, and the`);
		if (animal.species !== "dog" && animal.species !== "cat") {
			r.push(`${animal.species}'s`);
		} else {
			r.push(`${animal.name}'s`);
		}
		r.push(`${animal.dickSize} cock quickly stands at attention.`);

		return el;
	}
};
