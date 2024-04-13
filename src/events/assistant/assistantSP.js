// cSpell:ignore UUUUAH

App.Events.assistantSP = class assistantSP extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() > 18,
			() => V.assistant.personality > 0,
			() => !V.assistant.options
		];
	}

	execute(node) {
		const {
			HeA, HisA,
			heA, hisA, girlA, himA, womanA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];
		V.assistant.options = 1;

		const slave = V.slaves.find(s => (s.vagina > 0 || s.anus > 0) && s.rules.release.masturbation === 1) || V.slaves.random();
		const {him} = getPronouns(slave);

		App.Events.drawEventArt(node, "assistant");

		r.push(`One night, after a long day of sex and business, you're starting to think about bed when the abstract glowing shape that symbolizes your smoky-voiced personal assistant pops up on the nearest screen. ${HeA}'s become very helpful monitoring, training, and disciplining slaves. Tonight, ${heA}'s added an unmistakable tone of sexual satiation in ${hisA} voice. "${properTitle()}, I enjoyed my duties today," ${heA} purrs. "Did you see how ${slave.slaveName}'s muscles spasmed when I fucked ${him} earlier?" That's how ${heA} refers to a slave having one of the penthouse's advanced sex toys used on ${him}, since ${V.assistant.name} controls them.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${HeA} continues more seriously,`);
		if (V.slaves.some(s => s.piercing.genitals.smart)) {
			r.push(`"You may have noticed that the smart implants you've got your slaves wearing are working a little bit better than when I was a boring old secretary type. I'm not a true artificial intelligence, but I can adapt with experience, and I've had a lot of lovely experience lately! Also, a lot of the computing power I use to be sexy helps me adapt smart piercings to individual slaves' sexualities."`);
		} else {
			r.push(`"I'm sure you've seen those expensive smart piercings the body mod studio can implant. I think they would work a little bit better now than when I was a boring old secretary type. I'm not a true artificial intelligence, but I can adapt with experience, and I've had a lot of lovely experience lately! Also, a lot of the computing power I use to be sexy would help me adapt smart piercings to individual slaves' sexualities."`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`"One more thing, ${properTitle()}!" ${HisA} symbol flashes brightly. "I could stay like I am now, a hot voice with this symbol representing me when I need to show up on screens. Or, I could slip into something a little sexier. How about this?" The symbol vanishes, and is replaced by a cute little school${girlA} character. ${HeA} bounces up and down experimentally. "This appearance would work best with an excited voice," ${heA} exclaims. ${HeA} blows you a kiss. The school${girlA}'s body shrinks down and all ${hisA} clothing falls off. A small pair of wings pops out from the pile of clothes and a fairy stands up. "Or I could be your tiny and adorable fairy companion!" ${HeA} shouts excitedly while waving ${hisA} arms.`);
		if (V.seePreg !== 0) {
			r.push(`The fairy's belly begins to swell out, ${hisA} breasts getting puffier and leaking a drop of milk. "Or maybe you want your little buddy to be filled with adorable little babies, you little minx," ${heA} playfully teases.`);
		}
		r.push(`The fairy rapidly grows to adult size, becomes curvier and more mature, ${hisA} hair pulls itself back into a bun, and ${hisA} clothes change into a business suit. A pair of glasses appears on ${hisA} nose, and ${heA} looks at you over their tops. "Or I could be businesslike. And mature." ${HeA} snaps ${hisA} fingers, and ${hisA} bun falls away into long flowing locks.`);
		if (V.seePreg !== 0) {
			r.push(`${HisA} body glows and swells, tearing out of ${hisA} suit with the pregnant figure of an ancient goddess. "Or I could be beautiful and fertile while caring for your slaves."`);
			if (V.seeHyperPreg === 1) {
				r.push(`${HeA} focuses intently as ${hisA} stomach expands further. "And if that wasn't enough, how about me being so pregnant I'm about to burst?"`);
			}
			r.push(`${HisA} water breaks followed by dozens of babies as ${hisA} belly flattens.`);
		}
		if (V.minimumSlaveAge < 13) {
			r.push(`${HeA} glances away shyly as ${hisA} body shrinks to a childish form. "Or maybe you'd like something a little more young and tight."`);
			if (V.fertilityAge < 13 && V.seePreg !== 0) {
				r.push(`${HeA} moans and rubs ${hisA} belly as it begins to expand with pregnancy. "Or maybe you like your little girls with a little bun in the oven?`);
			}
		}
		r.push(`With a flash, ${hisA} bulk shifts into rippling muscle. War tattoos appear on ${hisA} skin, along with bone ornaments and a loincloth. "Or I could be an amazon! Yes!" ${heA} shouts exultantly, and flexes.`);
		if (V.seeDicks !== 0) {
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`${HeA} claps ${hisA} hands, and ${hisA} muscles fade, but not all the way. The tattoos vanish, and ${hisA} loincloth turns into a slutty bikini. ${HisA} breasts and behind grow, ${hisA} lips swell, and ${hisA} hair turns blonde. Finally, ${heA} grows a dick, and it keeps growing until it hangs past ${hisA} knees: or it would, if it weren't so erect. "Of course," ${heA} says seductively, "I could also be a bimbo dickgirl." ${HeA} orgasms, gasping, "Last one, I promise," and changes again. ${HisA} dick shrinks, thought not very far, and then splits into two members. ${HisA} skin pales to an off-white, and ${hisA} hair goes green and starts to writhe, turning into tentacle-hair. ${HisA} forehead sprouts a pair of horns that curve back along ${hisA} head. ${HeA} grins, displaying a cute pair of fangs. "I feel monstrous," ${heA} says, and stretches luxuriantly.`);
		}
		r.push(`The character vanishes, and the symbol returns. "Ahem. What do you think, ${properTitle()}?"`);

		r.push(App.UI.DOM.makeElement("h3", "Personal assistant appearances"));

		const responses = [
			new App.Events.Result(`Schoolgirl`, schoolgirl),
			new App.Events.Result(`Fairy`, fairy),
		];
		if (V.seePreg !== 0) {
			responses.push(new App.Events.Result(`Pregnant fairy`, pregnantFairy));
		}
		responses.push(new App.Events.Result(`Businesswoman`, businesswoman));
		if (V.seePreg !== 0) {
			responses.push(new App.Events.Result(`Goddess`, goddess));
			if (V.seeHyperPreg === 1) {
				responses.push(new App.Events.Result(`Hyper-Goddess`, hyperGoddess));
			}
		}
		if (V.minimumSlaveAge < 13) {
			responses.push(new App.Events.Result(`Loli`, loli));
			if (V.fertilityAge < 13 && V.seePreg !== 0) {
				responses.push(new App.Events.Result(`Pregnant Loli`, preggoLoli));
			}
		}
		responses.push(new App.Events.Result(`Amazon`, amazon));
		if (V.seeDicks !== 0) {
			responses.push(new App.Events.Result(`Shemale`, shemale));
			responses.push(new App.Events.Result(`Monstergirl`, monstergirl));
		}
		responses.push(new App.Events.Result(`Your usual appearance will do`, normalAppearance));
		responses.push(new App.Events.Result(`Go back to the standard personality`, standardPersonality));

		App.Events.addResponses(node, responses);

		return node;

		function schoolgirl() {
			V.assistant.appearance = "schoolgirl";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the school${girlA} appearance. ${HeA} goes back to bouncing up and down excitedly, exclaiming, "Yeah! Thanks, ${properTitle()}, you're the best!" ${HisA} avatar's bouncing makes it obvious ${heA}'s modeled without a bra under ${hisA} blouse. "You can always customize me from the arcology management menu," ${heA} adds.`);
		}

		function fairy() {
			V.assistant.appearance = "fairy";
			const r = [];
			const el = new DocumentFragment();
			r.push(`At your order, ${heA} installs the fairy appearance. ${HeA} shrinks back down and sprouts ${hisA} wings. "Aww yeah, this is gonna be the best! Thanks,`);
			if (V.PC.title !== 0) {
				r.push(`Big Bro!"`);
			} else {
				r.push(`Big Sis!"`);
			}
			r.push(`${HisA} avatar dances around ecstatically with ${hisA} nude, slim form in plain view. "You can always customize me from the arcology management menu, " ${heA} adds.`);

			refreshArt();
			App.Events.addParagraph(el, r);
			return el;
		}

		function pregnantFairy() {
			V.assistant.appearance = "pregnant fairy";
			refreshArt();
			const r = [];
			const el = new DocumentFragment();
			r.push(`At your order, ${heA} installs the pregnant fairy appearance. ${HeA} shrinks back down and sprouts ${hisA} wings. ${HisA} belly quickly swells with new life. "Aww yeah, this is gonna be the best! Thanks,`);
			if (V.PC.title !== 0) {
				r.push(`Big Bro!"`);
			} else {
				r.push(`Big Sis!"`);
			}
			r.push(`${HisA} avatar spins around ecstatically, admiring ${hisA} fresh nude, pregnant form in plain view. "You can always customize me from the arcology management menu, " ${heA} adds.`);
			App.Events.addParagraph(el, r);
			return el;
		}

		function businesswoman() {
			V.assistant.appearance = "businesswoman";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the business${womanA} appearance. ${HeA} straightens ${hisA} suit jacket primly, which only serves to emphasize ${hisA} generous bosom. "Thank you, ${properTitle()}. I like being businesslike, and not at all a whore." ${HisA} avatar pulls out a tablet and makes ready to get back to helping you. "You can always customize me from the arcology management menu," ${heA} adds.`);
		}

		function goddess() {
			V.assistant.appearance = "goddess";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the goddess appearance. ${HeA} fixes a wreath of flowers into ${hisA} hair, ${hisA} golden locks and gravid belly the only things keeping ${hisA} womanhood concealed. "Thank you, ${properTitle()}. This is wondrous." ${HeA} squeezes a drop of milk from one heavy breast and smiles. "You can always customize me from the arcology management menu," ${heA} adds.`);
		}

		function hyperGoddess() {
			V.assistant.appearance = "hypergoddess";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the hyper goddess appearance. ${HeA} fixes a wreath of flowers into ${hisA} golden locks as ${hisA} belly rapidly bloats to its limit before bulging and squirming ominously. ${HisA} breasts quickly follow suit. "Thank you, ${properTitle()}. This is wondrous." ${HeA} massages ${hisA} squirming pregnancy and smiles. "You can always customize me from the arcology management menuUUUUAH," ${heA} is interrupted by a large contraction and a baby's head beginning to part ${hisA} nether lips.`);
		}

		function loli() {
			V.assistant.appearance = "loli";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the lolita appearance. ${HeA} quickly begins losing height as the years peel off ${himA}, ${hisA} bust and hips quickly following suit. When finished ${heA} appears roughly eight years old. "Thank you, ${properTitle()}. This is neat." ${HeA} twirls around and giggles. "You can always customize me from the arcology management menu," ${heA} adds cutely.`);
		}

		function preggoLoli() {
			V.assistant.appearance = "preggololi";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the modified lolita appearance. ${HeA} quickly begins losing height as the years peel off ${himA}, ${hisA} bust and hips quickly following suit. When finished ${heA} appears roughly eight years old. "Thank you, ${properTitle()}. This is neat." ${HeA} twirls around and giggles before groaning and clutching ${hisA} stomach. A flood of white liquid flows from ${hisA} loins as ${hisA} belly begins rapidly swelling. ${HeA} falls onto ${hisA} backside holding ${hisA} full term belly and says, exhausted, "You can always customize me from the arcology management menu."`);
		}

		function amazon() {
			V.assistant.appearance = "amazon";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the amazon appearance. ${HeA} vanishes entirely, before simulating a fall from above to crash aggressively onto the screen. "Thanks, ${properTitle()}. Feels good to be this good." ${HisA} avatar jumps up and down, gauging ${hisA} strength, making ${hisA} bone jewelry rattle. "You can always customize me from the arcology management menu," ${heA} adds.`);
		}

		function shemale() {
			V.assistant.appearance = "shemale";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the shemale appearance. ${HeA} spins to show off ${hisA} new body, and starts to play with ${hisA} dick experimentally. "Like, thank you, ${properTitle()}. I wonder, can I generate avatars of the slaves? I would love to fuck an ass right now." ${HeA} looks meditative, pursing ${hisA} dick-sucking lips. "Oh, and you can always customize me from the arcology management menu," ${heA} adds.`);
		}

		function monstergirl() {
			V.assistant.appearance = "monstergirl";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} installs the monster${girlA} appearance. ${HeA} begins to experiment with ${hisA} tentacle hair, waving a tentacle in front of ${hisA} face and watching it until ${hisA} eyes cross. "Thank you, ${properTitle()}. This is pretty awesome." ${HeA} licks ${hisA} lips, revealing that ${heA} has a forked tongue behind ${hisA} fangs. "You can always customize me from the arcology management menu," ${heA} adds.`);
		}

		function normalAppearance() {
			V.assistant.appearance = "normal";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} maintains the symbol as ${hisA} avatar. "Yes, ${properTitle()}," ${heA} confirms, and adds "if you reconsider, I can be customized from the arcology management menu."`);
		}


		function standardPersonality() {
			V.assistant.personality = -1;
			refreshArt();
			return App.UI.DOM.makeElement("span", `You tell ${V.assistant.name} to reduce lewdness by ninety percent. It reverts to a genderless, emotionless affect.`);
		}

		function refreshArt() {
			App.Events.refreshEventArt("assistant");
		}
	}
};
