App.Intro.PCBodyIntro = function() {
	V.PC.actualAge = Math.clamp(V.PC.actualAge, 10, 80);

	const el = new DocumentFragment();
	let r = [];

	r.push(`Most slaveowners in the Free Cities are male. The preexisting power structures of the old world have mostly migrated to the new, and it can often be very hard to be a free woman in the Free Cities. Some manage to make their way, but in many arcologies, men are the owners, and women are the owned. You'll cut a striking figure as the owner and leader of your arcology, but`);
	r.push(App.UI.DOM.makeElement("span", `what's under your business attire?`, ["intro", "question"]));
	App.Events.addNode(el, r, "p");

	el.append(body());
	el.append(age());
	el.append(nameIndulgence());
	el.append(endScene());

	return el;

	function body() {
		const el = document.createElement("p");
		const options = new App.UI.OptionsGroup();
		let r = [];

		// Gender
		r.push(`You are a`);
		if (V.PC.genes === "XX") {
			r.push(`woman`);
		} else {
			r.push(`man`);
		}
		r.push(`with a`);
		if (V.PC.title > 0) {
			r.push(`masculine figure and will be referred to as <strong>Master.</strong>`);
		} else {
			r.push(`feminine figure and will be referred to as <strong>Mistress.</strong>`);
		}
		options.addOption(r.join(" "), "title", V.PC)
			.addValue("Masculine appearance", 1)
			.addValue("Feminine appearance", 0)
			.addComment("This option will affect scenes. Femininity may increase difficulty in the future, but for now only your chest and junk matter.");

		// Chest
		options.addOption("Under my suit jacket", "boobs", V.PC)
			.addValue((V.PC.title > 0) ? `Masculine muscles` : `A flat chest`, 200)
			.addValue("Feminine breasts", 900)
			.addComment("These options will affect scenes. Sporting breasts will increase difficulty");

		// Lower deck
		r = [];
		let option;
		r.push(`Behind the front of my tailored`);
		if (V.PC.dick !== 0) {
			if (V.PC.vagina !== -1) {
				r.push(`slacks, <strong>both a penis and a vagina.</strong>`);
				option = options.addCustomOption(r.join(" "))
					.addButton("Remove the penis", penisRemove)
					.addButton("Remove the vagina", vaginaRemove);
			} else {
				r.push(`slacks, a <strong>penis.</strong>`);
				option = options.addCustomOption(r.join(" "))
					.addButton(
						"Switch to vagina",
						() => {
							penisRemove();
							V.PC.genes = "XX";
							vaginaAdd();
						},
						"PC Body Intro"
					)
					.addButton("Add a vagina", vaginaAdd);
			}
		} else {
			r.push(`skirt, a <strong>vagina.</strong>`);
			option = options.addCustomOption(r.join(" "))
				.addButton(
					"Switch to penis",
					() => {
						penisAdd();
						V.PC.genes = "XY";
						vaginaRemove();
					},
					"PC Body Intro"
				)
				.addButton("Add a penis", penisAdd);
		}
		option.addComment(`These options will affect sex scenes. Feminine options will increase difficulty.`);

		el.append(options.render());

		return el;

		function penisAdd() {
			V.PC.dick = 4;
			V.PC.balls = 3;
			V.PC.scrotum = 3;
			V.PC.prostate = 1;
		}

		function penisRemove() {
			V.PC.dick = 0;
			V.PC.balls = 0;
			V.PC.scrotum = 0;
			V.PC.prostate = 0;
		}

		function vaginaAdd() {
			V.PC.vagina = 1;
			V.PC.ovaries = 1;
		}

		function vaginaRemove() {
			V.PC.vagina = -1;
			V.PC.ovaries = 0;
		}
	}

	function age() {
		const el = document.createElement("p");
		const options = new App.UI.OptionsGroup();

		App.UI.DOM.appendNewElement("div", el, `How old are you?`, ["intro", "question"]);
		const r = [];
		r.push(`You're`);
		if (V.PC.actualAge >= 65) {
			r.push(`getting up in years. You've made a legacy for myself, and not done with life just yet.`);
		} else if (V.PC.actualAge >= 50) {
			r.push(`well into middle age. You've made a name for myself, and still got your groove.`);
		} else if (V.PC.actualAge >= 35) {
			r.push(`entering middle age. You're accomplished, and retain some youthful vigor.`);
		} else if (V.PC.actualAge >= 22) {
			r.push(`surprisingly young. You'll need to prove yourself, but you've got energy to burn.`);
		} else if (V.PC.actualAge >= 14) {
			r.push(`exceedingly young. You're nobody, but you're full of youthful vigor and ready to make the world yours.`);
		} else {
			r.push(`just a child. You may be emancipated, but society won't accept you as a leader.`);
		}
		r.push(`Your age:`);
		options.addOption(r.join(" "), "actualAge", V.PC).showTextBox()
			.addComment(`Older player characters start with more reputation and maintain reputation somewhat more easily, but have slightly less sexual energy. Exceedingly young characters will not be accepted by society, even more so if underage, and will face additional hurdles and complications.`);

		el.append(options.render());

		return el;
	}

	function nameIndulgence() {
		const el = document.createElement("p");
		const options = new App.UI.OptionsGroup();

		App.UI.DOM.appendNewElement("div", el, `What is your name and alternate indulgence?`, ["intro", "question"]);

		App.UI.Player.names(options);
		App.UI.Player.refreshmentChoice(options);

		el.append(options.render());

		return el;
	}

	function endScene() {
		const el = document.createElement("p");
		el.append(
			App.UI.DOM.link(
				"Confirm player character overview",
				() => {
					App.UI.Player.syncAgeBasedParameters();
				},
				[],
				"PC Appearance Intro"
			)
		);

		return el;
	}
};
