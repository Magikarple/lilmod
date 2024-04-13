App.Events.SEProjectNMoMoney = class SEProjectNMoMoney extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.status === 2,
			() => (V.projectN.public === 0 && App.Events.effectiveWeek() >= V.projectN.phase1 + 3) ||
				(V.projectN.public === 1 && App.Events.effectiveWeek() >= V.projectN.phase1 + 5)
		];
	}

	execute(node) {
		V.projectN.status = 0;
		V.projectN.phase2 = App.Events.effectiveWeek();

		App.Events.addParagraph(node, [`After a few weeks of theoretical designs and planning, the project N bioengineers finally have a set of results ready to present to you. Doctor Nieskowitz, heading up the team, presents you with a neat clipboard full of technical information as you enter the lab, telling you that he's got both good news and bad news.`]);
		App.Events.addParagraph(node, [`The balding man launches into the good news first. "We've got our first sample prepared, and we've begun physical work manipulating the growing genetic structure of the subject." Nieskowitz gestures behind him to one of the genetic tubes, a vat filled with thick green liquid, where a fist-sized cluster of pink flesh-like material floats in the center. "We call her subject Delta."`]);
		App.Events.addParagraph(node, [`"Unfortunately, it's not all rainbows and sunshine." Nieskowitz continues. "As it turns out, this work isn't going to be cheap. The initial cash injection let us get set up with our materials and provides the team a nice little paycheck, but we're going to need a lot more equipment to make this dream of yours a reality. We'll need top-line genetic sequencers, automated manipulation tools for precision physical work, a lot of new sterilization staff, complete AI integration with the equipment for constant monitoring..."`]);

		const askPrice = 220000;
		const adequatePrice = 125000;
		const barePrice = 50000;
		const choices = [];
		if (V.cash >= askPrice) {
			choices.push(new App.Events.Result(`Give Nieskowitz however much he wants`, unlimited, `equivalent to ${cashFormat(askPrice)}.`));
		}
		if (V.cash >= adequatePrice) {
			choices.push(new App.Events.Result(`Provide Project N with adequate funding`, adequate, `equivalent to ${cashFormat(adequatePrice)}.`));
		}
		if (V.cash >= barePrice) {
			choices.push(new App.Events.Result(`Give Project N the bare minimum to limp on`, bare, `equivalent to ${cashFormat(barePrice)}.`));
		}
		choices.push(new App.Events.Result(`Discontinue Project N`, cancel));
		App.Events.addResponses(node, choices);

		function unlimited() {
			cashX(-askPrice, "personalBusiness");
			V.projectN.status = 3;
			V.projectN.wellFunded = 1;
			return `You inform Nieskowitz that project N will have as much money as it needs. As the doctor starts rattling off necessities and upgrades to the genelab, the eventual list proves <span class="red">hugely expensive,</span> but the good doctor assures you that the money spent - over double your initial investment - will make sure project N runs <span class="green">smoothly and rapidly.</span>`;
		}

		function adequate() {
			cashX(-adequatePrice, "personalBusiness");
			V.projectN.status = 3;
			return `You agree to spend, the amount of money Nieskowitz requests, but set a strict budgetary limit for them to follow. The doctor seems pleased, and doesn't contest this ruling as he starts to prepare the <span class="red">expensive</span> upgrades and redesigns that'll be needed to keep the project going at a steady rate.`;
		}

		function bare() {
			cashX(-barePrice, "personalBusiness");
			V.projectN.status = 3;
			V.projectN.poorlyFunded = 1;
			return `You give Nieskowitz the bare minimum budget needed to keep project N operational. The doctor seems obviously displeased and makes no effort to hide his frustration with your limited budget, noting that your stinginess will <span class="red">almost inevitably have consequences</span > to the sensitive nature of their work. Time will tell if he's correct.`;
		}

		function cancel() {
			V.projectN.status = 0;
			return `You casually hand back the clipboard to Nieskowitz and tell him that you didn't plan on spending a cent more on project N - and still don't. As the frustrated biologists start to pack up their things, Nieskowitz tells you that if you "get your head out of your ass" they'll be available to resume work on the project, provided you have the money to fund it this time.`;
		}
	}
};
