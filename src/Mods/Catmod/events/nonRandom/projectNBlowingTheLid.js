App.Events.SEProjectNBlowingTheLid = class SEProjectNBlowingTheLid extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.status === 4,
			() => V.projectN.public === 0,
			() => V.projectN.poorlyFunded === 1,
			() => App.Events.effectiveWeek() >= V.projectN.phase3 + 6,
		];
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "The Sons of Sekhmet";
		V.projectN.status = 9;
		V.projectN.public = 1;
		V.puristsFurious = 1;
		V.projectN.phase4 = App.Events.effectiveWeek();
		repX(-4000, "event");

		const slave = GenerateNewSlave(null, {minAge: 16, maxAge: 32, disableDisability: 1});
		generateSalonModifications(slave);
		slave.origin = "$He is an enslaved Son of Sekhmet, one of many idealistic rebel groups violently opposed to you.";
		slave.devotion = random(-90, -70);
		slave.trust = random(-20, 30);
		slave.weight = random(-20, 30);
		slave.muscles = random(20, 80);
		slave.waist = random(10, 80);

		App.Events.addParagraph(node, [`It's a fine, sunny afternoon in your plaza, surrounded by the noise of bustling merchants harking their wares and slavegirls glibly advertising their bodies, for money, pleasure, or just simple decorative value. As you're inspecting a particularly beautiful raven-haired slave, the plaza's many vidscreens, usually buzzing with the noise of arcology media, suddenly all go black with a crackle of electricity. As the marketplace, yourself included, turn their heads to the unusual display, the screens come back on again, this time universally displaying a man in a dark balaclava, seated at a nondescript desk with a series of papers held in his gloved hands.`]);
		App.Events.addParagraph(node, [`"Attention, citizens of ${V.arcologies[0].name}. It has come to our attention, the Sons of Sekhmet, that the tyrant of your "free" city, ${PlayerName()}, has constructed an underground laboratory from which they have been methodically conducting deeply unethical genetic experiments for the last three months, underneath all of your noses, and involving the inhumane splicing of human and animal DNA into a twisted abomination of a creature." The balaclava-clad man shuffles his papers as slaves and merchants alike glance towards you in stricken shock.`]);
		App.Events.addParagraph(node, [`"... These experiments represent the worst depths of depravity within the Free Cities, and we will not allow them to continue unabated. Do you know how many failed 'subjects' of yours were created in mutated, unbearable agony, and summarily executed as failures, ${PlayerName()}? Do you even care? Hundreds of thousands of credits spent in causing more suffering while you enslave the weak and let the sick shrivel and die in your streets, all to fulfill a narcissistic personal fantasy. Against the stratification and decadent, obscene cruelties of ${V.arcologies[0].name}, we alone stand against the tide. Project "N", the title of this sickening delusion, is to be destroyed, and all who worked on it will die." The balaclava-clad man sets down his papers and points directly towards the screen.`]);
		App.Events.addParagraph(node, [`"The Sons of Sekhmet have your blood, ${PlayerName()}. Sleep tight." The man draws his finger across his neck in a slitting motion, and then the screen goes black. Before you can even consider how to respond, judging by the looks of shock on everyone around you, you can tell <span class="red">there will be consequences.</span>`]);

		const choices = [];
		if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
			choices.push(new App.Events.Result(`Send an emergency message to your Imperial Knights`, impKnights));
		}
		if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
			choices.push(new App.Events.Result(`Send an emergency message out to your armed citizens to intervene`, roman));
		}
		if (V.arcologies[0].FSAntebellumRevivalistLaw2 === 1) {
			choices.push(new App.Events.Result(`Send an emergency message out to your citizens' militias to intervene`, militia));
		}
		if (V.mercenaries === 5) {
			choices.push(new App.Events.Result(`Send an emergency message out to your ${V.mercenariesTitle}`, mercenaries));
		}
		choices.push(new App.Events.Result(`Watch in stunned silence`, stunned));

		App.Events.addResponses(node, choices);

		function impKnights() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You immediately call out for your AI to send an emergency bulletin to every Knight in the city ordering them to get to your lab, and fast. As you yourself sprint towards the laboratory, the crack of loud gunshots ring through the air, back-and-forth fire that keeps going for nearly a full minute. By the time you finally arrive, you find the entrance to the lab absolutely covered in blood and bodies. All of the corpses on the ground are dressed in black and orange and clutching old-fashioned assault rifles, surrounded by guardsmen dressed in hot pink liveries. Their Knight, a goliath of a man wearing equally hot pink Imperial Plate bearing his crest that makes him look even bigger, is busy wrestling one struggling figure in black and orange to the ground, apparently the sole survivor on the Sons' side. As much as the Sons of Sekhmet's announcement has <span class="reputation dec">shocked</span> the arcology, the timely and heroic response of your Knights is just the PR event you needed to <span class="reputation inc">reverse the damage,</span> especially when the rattled Dr. Nieskowitz comes out from the assaulted lab to thank you for saving his life.`);
			repX(4000, "event");
			V.projectN.status = 5;
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function roman() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You immediately send for your AI to send an emergency bulletin to your armed citizen - soldiers, calling for the sons and daughters of New Rome to defend the Republic once more. As you yourself sprint towards the laboratory, the crack of loud gunshots ring through the air, back-and-forth fire that keeps going for nearly a full minute. By the time you finally arrive, you find the entrance to the lab absolutely covered in blood and bodies. All of the corpses on the ground are dressed in black and orange and clutching old-fashioned assault rifles, surrounded by a large cluster of armed citizens, a few of which nurse wounds from their brief but intense fighting with the Sons. Two Hastati hold down a struggling survivor dressed in orange and black, seemingly the only still-breathing fighter on the Sons' side. As much as the Sons of Sekhmet's announcement has <span class="reputation dec">shocked</span> the arcology, the timely and heroic response of your Principes, honest citizens defending the arcology against violent foreign insurgents, is just the PR event you needed to <span class="reputation inc">reverse the damage,</span> especially when the rattled Dr. Nieskowitz comes out from the assaulted lab to thank you for saving his life.`);
			repX(4000, "event");
			V.projectN.status = 5;
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function militia() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You immediately send for your AI to send an emergency bulletin to your citizens' militias, calling for the sons and daughters of the South to defend the Republic once more. As you yourself sprint towards the laboratory, the crack of loud gunshots ring through the air, back-and-forth fire that keeps going for nearly a full minute. By the time you finally arrive, you find the entrance to the lab absolutely covered in blood and bodies. All of the corpses on the ground are dressed in black and orange and clutching old-fashioned assault rifles, surrounded by a large cluster of armed citizens, a few of which nurse wounds from their brief but intense fighting with the Sons. Two militiamen hold down a struggling survivor dressed in orange and black, seemingly the only still-breathing fighter on the Sons' side. As much as the Sons of Sekhmet's announcement has <span class="reputation dec">shocked</span> the arcology, the timely and heroic response of your chivalrous citizen-soldiers defending the arcology against violent foreign insurgents, is just the PR event you needed to <span class="reputation inc">reverse the damage,</span> especially when the rattled Dr. Nieskowitz comes out from the assaulted lab to thank you for saving his life.`);
			repX(4000, "event");
			V.projectN.status = 5;
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function mercenaries() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You immediately send for your AI to send an emergency bulletin to your ${V.mercenariesTitle}, calling them for rapid-deployment to the genetics lab ASAP. As you yourself sprint towards the laboratory, the crack of loud gunshots ring through the air, back-and-forth fire that keeps going for nearly a full minute. By the time you finally arrive, you find the entrance to the lab absolutely covered in blood and bodies. All of the corpses on the ground are dressed in black and orange and clutching old-fashioned assault rifles, surrounded by a small QRF force of lightly-armed mercenaries, most of whom hang off the sides of an armored APC set readied for just such an occasion. An especially large mercenary pins down a struggling survivor dressed in orange and black, seemingly the only still-breathing fighter on the Sons' side. As much as the Sons of Sekhmet's announcement has <span class="red">shocked</span> the arcology, the timely response of your well-trained mercenaries stopping a terrorist attack in under three minutes is just the PR event you needed to <span class="reputation inc">reverse the damage,</span> especially when the rattled Dr. Nieskowitz comes out from the assaulted lab to thank you for saving his life.`);
			repX(4000, "event");
			V.projectN.status = 5;
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function stunned() {
			return `About two minutes later, there's a violent explosion from the top of the free city, near your genetics laboratory. You hear a brief exchange of gunshots that ring out above the city's tense silence, then once more a deafening quiet. You don't even need to read the AI briefing that pops up to know that Nieskowitz and the rest of the scientists are dead, and that the laboratory's been destroyed. All that you can really focus on in the moment is the <span class="red">shock and horror</span> on the faces of everyone you see on the long walk back to your penthouse.`;
		}
	}
};
