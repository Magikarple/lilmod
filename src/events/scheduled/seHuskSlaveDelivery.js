App.Events.SEHuskSlaveDelivery = class SEHuskSlaveDelivery extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.huskSlaveOrdered === 1
		];
	}

	execute(node) {
		V.huskSlaveOrdered = 0;
		App.UI.StoryCaption.encyclopedia = "Enslaving People";

		const pram = {
			mature: 0, nationality: V.huskSlave.nationality, minAge: V.huskSlave.age, maxAge: V.huskSlave.age, ageOverridesPedoMode: 1
		};
		if (V.huskSlave.race !== "not important") {
			pram.race = V.huskSlave.race;
		}
		let husk;
		if (V.huskSlave.sex === 2) {
			husk = GenerateNewSlave("XY", pram);
			husk.boobs = 50;
			husk.boobsImplant = 0;
			husk.boobsImplantType = "none";
		} else {
			husk = GenerateNewSlave("XX", pram);
		}

		husk.slaveName = "Doll";
		husk.birthName = "";
		husk.slaveSurname = "";
		husk.birthSurname = "";
		husk.origin = "You reserved a mindless slave like $him from the Flesh Heap.";
		applyMindbroken(husk, -100);
		husk.career = "a Fuckdoll";

		if (V.huskSlave.sex === 3) {
			husk.dick = 1;
			husk.foreskin = 2;
			husk.prostate = 1;
			husk.balls = 1;
			if (husk.physicalAge >= V.potencyAge) {
				husk.pubertyXY = 1;
			}
		}
		if (husk.balls > 0) {
			husk.scrotum = husk.balls;
		}
		if (husk.vagina === -1) {
			husk.clit = 0;
		}
		if (V.huskSlave.virgin === 0) {
			husk.anus = 0;
			if (husk.vagina > -1) {
				husk.vagina = 0;
			}
		}

		const {
			he, him
		} = getPronouns(husk);

		App.UI.DOM.appendNewElement("p", node, `A slave came in fitting the description you provided.`);
		App.UI.DOM.appendNewElement("p", node, `As expected, ${he} is a complete vegetable, but that is what you ordered after all. You lack the facilities to care for ${him} in this state, so you should do what you are planning quickly. Or you could return ${him} to the Flesh Heap, though you won't get your credits back.`, "note");

		node.append(App.Desc.longSlave(husk, {market: "generic"}));

		const choices = [];
		if (V.cash >= V.surgeryCost) {
			choices.push(new App.Events.Result(`Accept the offered slave and contact the bodyswap surgeon.`, accept));
		} else {
			choices.push(new App.Events.Result(null, null, `You can't sustain ${him} and thus must return ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function accept() {
			V.activeSlave = husk;
			V.returnTo = V.nextLink;
			Engine.play("Husk Slave Swap Workaround");
			return ``;
		}
	}
};
