App.Events.refsRomanStoicism = class refsRomanStoicism extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSPaternalist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
			() => V.arcologies[0].FSRomanRevivalist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 3000;

		App.Events.addParagraph(node, [`Reviving the ancient Roman civilization in ${V.arcologies[0].name} was a turning point for many of your citizens. At first they only wore togas and stolas to cosplay in their kinky games with their spouse and slaves. But with patience and money, you managed to show them the true meaning of pursuing the vision of a new Rome. You transformed a group of slavers and opportunists into a city of patriotic citizens ready to defend their home and their newfound culture. For your wealthiest peers, choosing the Roman way of life included philosophizing like one. As such they studied stoicism and created a new version fitting of this renewed Roman era. Those dedicated stoics even bought slaves to teach them, then philosophize with them.`]);

		App.Events.addParagraph(node, [`While strolling on a market plaza, you stumble upon a group of citizens listening to one of those stoicism philosophers. But unlike your well-known wealthy thinkers, this stoic and his audience all appear to be poor citizens. Some of his listeners looked even poorer and more desperate. They're terrified of their ineluctable enslavement caused by debts and in need of advice. Or at least in need of hope.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Keep walking`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Offer financial support to the poorest`, pay, `Will cost ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to pay their debts`));
		}
		choices.push(new App.Events.Result(`Philosophize with the stoic`, talk));
		App.Events.addResponses(node, choices);

		function ignore() {
			let r = [];
			r.push (`You don't feel the need to intervene. This kind philosopher seems to know exactly what to answer to your citizens on the verge of enslavement. First they can choose the protective nature of indentured servitude. The paternalist nature of your slaveowning citizens is another reason why they shouldn't fear enslavement.`);
			return r;
		}

		function pay() {
			let r = [];
			repX(1500, "event");
			cashX(-cost, "event");
			r.push (`Your presence is rapidly noted as you move through the audience to join the philosopher and the poor citizens. You tell them their worries have been heard and they shouldn't be fearful of the future. They may one day be subjected to enslavement and you reassure them that, in your paternalistic society, they'll be well cared for, but today they'll remain free as you'll pay their current debts. The thankful citizens have no words strong enough to repay your generosity and will spend the rest of the week <span class="reputation inc">blessing your name</span> to everyone they cross paths with.`);
			return r;
		}

		function talk() {
			let r = [];
			r.push (`You express your wish to discuss with the stoic. The audience grows silent as the philosopher and you debate of paternalist ideals and post-apocalyptic stoicism. Your interlocutor and the audience`);
			if (V.PC.rumor === "care") {
				repX(300, "event");
				r.push (`feels genuinely convinced by your words and your desire to make your ${V.arcologies[0].name} a haven where every citizen and slave is well cared for. You managed to dissipate their fear of enslavement and <span class="reputation inc">earned their respect.</span>`);
			} else if (V.PC.rumor === "force") {
				repX(-200, "event");
				r.push (`are doubtful of your words. Hearing the ideals of paternalism come from the mouth of someone known to use force to get what they want is not at all convincing. The thought of being enslaved by someone like you is even <span class="reputation dec">more terrifying</span> than they feared.`);
			} else {
				repX(100, "event");
				r.push (`listen carefully, but can only trust your words based on your achievements. The simple fact you managed to convince slaveowners to share your paternalist views is enough for the audience to have <span class="reputation inc">a little faith in you.</span>`);
			}
			return r;
		}
	}
};
