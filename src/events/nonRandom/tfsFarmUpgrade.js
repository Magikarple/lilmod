App.Events.TFSFarmUpgrade = class TFSFarmUpgrade extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.TFS.schoolPresent === 1,
			() => V.organFarmUpgrade !== 0,
			() => V.TFS.farmUpgrade === 0
		];
	}

	execute(node) {
		let r = [];
		V.TFS.farmUpgradeAsked = V.week;

		r.push(`You receive yet another personal call from an older Futanari Sister, one of the Sisters who lives in your arcology; you've given up trying to tell them apart. Unusually, this one has taken a break from the Sisters' constant sexual communion to concentrate on speaking with you, and she looks serious, though she's still a gorgeous naked futa whose boobs fill half the screen, and whose perpetually erect dick pokes insistently into frame.`);
		if (V.PC.slaveSurname) {
			if (V.PC.title) {
				r.push(`"Mr.`);
			} else {
				r.push(`"Ms.`);
			}
			r.push(`${V.PC.slaveSurname},"`);
		} else {
			r.push(`"${V.PC.slaveName},"`);
		}
		r.push(`she says`);
		if (V.PC.dick !== 0 && V.PC.vagina !== -1 && V.PC.boobs >= 300) {
			r.push(`submissively, "I would like to beg a favor of you." She looks uncharacteristically uncomfortable, but steels herself and asks. "Please, may we use your organ farm? We're not... complete. Like you." She hugs herself unconsciously, her arms pressing her enormous breasts against her chest. "We... I... would like to be like you, and we`);
		} else {
			r.push(`politely, "I would like to ask a favor of you on behalf of myself and my Sisters." She looks less confident than the older Sisters usually do, but steels herself and asks. "May we use your organ farm? We would like to really complete our transformations. We`);
		}
		if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
			r.push(`have a rather cheap one to grow dicks for the girls and we`);
		}
		r.push(`can pay for the costs of using it, but we have no other way of accessing such advanced technology."`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`"I know that you could demand thousands of credits," she continues, "but the discount we already give you is all we can afford without selling Sisters early.`);
		if (V.PC.dick !== 0 && V.PC.vagina !== -1 && V.PC.boobs >= 300) {
			r.push(`I would pretend to be independent and offer you the choice of how we approach this, but you've already given us so much, and you're... so perfect. We'll do whatever you say. If you do give us this priceless gift, it's your decision`);
		} else {
			r.push(`All we have to offer for this priceless gift is your decision on an important question:`);
		}
		r.push(`whether we will use contraception after we are transformed." She shudders suddenly, gripped by obscure emotion. "Not using contraception would be a hard change in some ways. But years later, there would be... more of us."`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`"Please forgive me for calling you, instead of asking you in person," she says penitently. "And please come down to see us, whatever you decide."`);

		const choices = [];
		choices.push(new App.Events.Result(`Permit them access, but tell them to use contraception`, contraception));
		if (V.seePreg !== 0) {
			choices.push(new App.Events.Result(`Permit them access, and encourage them to get pregnant`, preg));
			if (V.seeHyperPreg === 1) {
				choices.push(new App.Events.Result(`Permit them access, and encourage them to embrace hyperpregnancy`, hyperPreg));
			}
			// choices.push(new App.Events.Result(`Decline, but grant them something more fitting`, fitting));
		}
		choices.push(new App.Events.Result(`Decline`, decline));
		App.Events.addResponses(node, choices);

		function contraception() {
			V.TFS.farmUpgrade = 1;
			return `You signify your assent, telling the Sister that the organ farm will accept seed tissue from any of them for the purpose of fabricating ovaries. To your mild surprise, she responds by breaking down into cutely inelegant crying. You add that you think the Sisters are beautiful as they are, and recruits will continue to approach them; it's not necessary for them to go through the rigors of pregnancy. It takes her a long time to manage to thank you properly, and she hurries to end the call before she can embarrass herself further.`;
		}

		function preg() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You signify your assent, telling the Sister that the organ farm will accept seed tissue from any of them for the purpose of fabricating ovaries. To your mild surprise, she responds with cutely inelegant crying. You add that you think the world needs more Futanari Sisters, especially ones as cute and sexy as you're confident her many daughters will be. At that, she breaks down completely, one of her hands going to rub her belly gently. It takes her a long time to manage to thank you properly, and she hurries to end the call before she can embarrass herself further.`);
			if (V.arcologies[0].FSRestartDecoration === 100 && V.eugenicsFullControl !== 1) {
				r.push(`The Societal Elite are <span class="red">outraged</span> that you would not only allow such a breach of eugenics to occur, but encourage it.`);
			}
			V.TFS.farmUpgrade = 2;
			if (FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1) {
				V.failedElite += 275;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function hyperPreg() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You signify your assent, telling the Sister that the organ farm will accept seed tissue from any of them for the purpose of fabricating ovaries, so long as they are willing to bear as many children as they can handle. To your mild surprise, she responds with cutely inelegant crying. You add that you think the world needs many more Futanari Sisters, especially ones as cute and sexy as you're confident her countless daughters will be. At that, she breaks down completely, one of her hands going to rub her belly gently. It takes her a long time to manage to thank you properly, and she hurries to end the call before she can embarrass herself further.`);
			if (V.arcologies[0].FSRestartDecoration === 100 && V.eugenicsFullControl !== 1) {
				r.push(`The Societal Elite are <span class="red">outraged</span> that you would not only allow such a breach of eugenics to occur, but encourage it to such an obscene degree.`);
			}
			V.TFS.farmUpgrade = 3;
			if (FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1) {
				V.failedElite += 1000;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function fitting() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You decline her offer and propose a new one, letting the Sister know that the organ farm will accept seed tissue from any of them for the purpose of fabricating testicular ovaries, which should satisfy their desires, if in an unorthodox way. To your mild surprise, she responds with cutely inelegant crying. You add that you think the world needs more Futanari Sisters, especially ones as cute and sexy as you're confident her many daughters will be. At that, she breaks down completely, one of her hands going to rub her balls gently. It takes her a long time to manage to thank you properly, and she hurries to end the call before she can embarrass herself further.`);
			if (V.arcologies[0].FSRestartDecoration === 100 && V.eugenicsFullControl !== 1) {
				r.push(`The Societal Elite are <span class="red">outraged</span> that you would not only allow such a breach of eugenics to occur, but encourage it.`);
			}
			V.TFS.farmUpgrade = 4;
			if (FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1) {
				V.failedElite += 100;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function decline() {
			V.TFS.farmUpgrade = -1;
			return `You decline. The Sister accepts your decision politely, but cannot hide her deep disappointment.`;
		}
	}
};
