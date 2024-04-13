App.Intro.slaveAgeIntro = function() {
	const node = new DocumentFragment();

	App.UI.DOM.appendNewElement("p", node, `Do you want to see content involving girls younger than 18 in this game?`, ["intro", "question"]);

	makeOption([
		App.UI.DOM.passageLink("No.", "PC Body Intro", () => {
			V.minimumSlaveAge = 18;
			V.pedo_mode = 0;
		}),
		App.UI.DOM.makeElement("span", `All slaves will be at least 18 years old, and slavery of children will be illegal in the Free Cities.`, "note")
	]);

	makeOption([
		`Yes, I wish to see girls as young as`,
		App.UI.DOM.makeTextBox(V.minimumSlaveAge, (v) => V.minimumSlaveAge = v, true),
		App.UI.DOM.passageLink("Continue.", "PC Body Intro", () => {
			V.pedo_mode = 0;
		}),
	]);

	makeOption([
		`Yes, and`,
		App.UI.DOM.passageLink("I just want lots of lolis.", "PC Body Intro", () => {
			V.minimumSlaveAge = 3;
			V.pedo_mode = 1;
		}),
		App.UI.DOM.makeElement("span", `Nearly all randomly generated slaves will be under the age of 18, although custom slaves and slaves related to specific events may be older.`, "note")
	]);

	makeOption([
		`Yes,`,
		App.UI.DOM.passageLink("I wish to see them grow up and become fertile.", "PC Body Intro", () => {
			V.minimumSlaveAge = 3;
			V.pedo_mode = 0;
			V.precociousPuberty = 1;
			V.loliGrow = 1;
			V.fertilityAge = 10;
			V.potencyAge = 12;
			V.seeAge = 1;
		}),
		App.UI.DOM.makeElement("span", `Preset. Slaves' age will be random from minimal possible age. They can be made fertile younger than normal puberty age (10) in some cases, and grow up naturally.`, "note")
	]);

	return node;

	function makeOption(array) {
		App.UI.DOM.appendNewElement("div", node, App.Events.makeNode(array));
	}
};
