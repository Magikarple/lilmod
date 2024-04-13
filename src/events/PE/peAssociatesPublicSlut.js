App.Events.PEAssociatesPublicSlut = class PEAssociatesPublicSlut extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.week >= 10
		];
	}

	execute(node) {
		let r = [];

		const num = random(1, 99);

		App.Events.addParagraph(node, [
			`The Promenade is especially vibrant today, humming with activity as the wealthier of`,
			App.UI.DOM.combineNodes(
				App.UI.DOM.makeElement("span", V.arcologies[0].name, "bold"), "'s"
			),
			`citizens go about their business and pleasure. You are a regular sight here, leisurely strolling amidst the bustle of the many shops, boutiques and eateries that line the wide thoroughfare. These regular strolls are, of course, timed in order to allow the citizenry, particularly high society, to feel your presence. It's not all about optics though, as there are frequent opportunities for pleasure during these outings, be it shopping, dining or more unique kinds of distraction. One such opportunity presents itself today.`
		]);

		App.Events.addParagraph(node, [`You take a detour down one of the minor byways that feed into the Promenade proper. The center of the street is divided by a row of public benches and carefully manicured trees, interspersed by simple metal railings that are set into the ground, coming up to about waist height. They look like bicycle stands, and are indeed occasionally used as such, but their primary function is for restraining slaves for public use, as punishment for some and reward for others. The scene playing out before you is most assuredly the former. A petite slave is being restrained.`]);



		if (num < V.seeDicks) {
			App.Events.addParagraph(node, [`His pink minidress is scrunched up around his waist, having been peeled back from his flat chest and hiked up to reveal his rather small genitals and his butt. He is bent over the railing at the waist, his hands and legs both shackled at either end of the rail, and a ring gag keeps him relatively quiet, while simultaneously keeping his mouth available for use.`]);
		} else {
			App.Events.addParagraph(node, [`Her pink minidress is scrunched up around her waist, having been peeled back from her buxom chest and hiked up to reveal her lewd pussy and ass. She is bent over the railing at the waist, her hands and legs both shackled at either end of the rail, while a ring gag keeps her relatively quiet, while simultaneously keeping her mouth available for use.`]);
		}

		if (num < V.seeDicks) {
			r.push(`The one restraining him is a business associate of yours. She's a beautiful woman who cuts a gorgeous figure in her expensive, tasteful business attire. You have some rapport with one another and she greets you cheerily and you make small talk as she finishes up shackling her newly minted slave. He was, she explains, her boyfriend, who had accrued significant debt due to his severe lack of business sense and tact. She had bought out his debt in order to save him from enslavement, only to find out not long after that he had been cheating on her with another free woman. Since she owned his debt, it took only a few formalities to turn him into her property as revenge. "Since he likes sluts so much, I'm going to turn him into one!" She giggles, while stroking the struggling traps luxurious bleach blonde hair. Her eyes light up as her gaze returns to you. You know what's coming, and are surprised it took this long for it to occur to her. She reaches around her slave and spreads his ass cheeks.`);
			if (V.PC.title === 1) {
				r.push(`"Sir,`);
			} else {
				r.push(`"Ma'am,`);
			}
			r.push(`it would honor me if you fucked him!"`);

			r.push(`You consider the slave's anus. Your associate has clearly spent all day customizing her new toy, it looks freshly bleached and is smooth and inviting. It effectively has been transformed into a sex organ.`);
		} else {
			r.push(`The one restraining her is a business associate of yours. He's a well built man who cuts a handsome figure in his expensive, tasteful business attire. You have some rapport with one another and he greets you cheerily and you make small talk as he finishes up shackling his newly minted slave. She was, he explains, his girlfriend, who had accrued significant debt due to her severe lack of business sense and tact. He had bought out her debt in order to save her from enslavement, only to find out not long after that she had been cheating on him with another free man. Since he owned her debt, it took only a few formalities to turn her into his property as revenge. "She was already a slut, I've simply made her look the part, and play it more honestly!" he chuckles, while fondling the struggling bimbo's ample ass. He favors you with a rueful smile as his gaze returns to you. You know what's coming, and are surprised it took this long for it to occur to him. He reaches around his slave and spreads her ass cheeks.`);
			if (V.PC.title === 1) {
				r.push(`"Sir,`);
			} else {
				r.push(`"Ma'am,`);
			}
			r.push(`it would honor me if you fucked her! I've had her hymen restored just a few hours ago, first time is all yours if you want it."`);

			r.push(`You consider the slave's pussy. Your associate has clearly spent all day customizing his new toy, it looks tight and inviting. Surprisingly, she's quite moist, indicating that in spite of her struggling, she's actually rather aroused, seems she has a bit of a fetish for humiliation. She'll assuredly make an excellent slave if that's the case.`);
		}

		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${(num < V.seeDicks) ? "him his" : "her the"} first taste of slave life`, taste),
			new App.Events.Result(`Decline, but suggest coffee in the café across the street`, decline),
		]);

		function taste() {
			const frag = new DocumentFragment();
			let r = [];
			if (num < V.seeDicks) {
				r.push(`Taking a slave's anal virginity is hardly novel for you, yet somehow it never stops being fun. You grab the bottle of lubricant your associate has left out for use and begin to generously lubricate his asshole.`);
				if (V.PC.dick === 0) {
					r.push(`You also reach for one of the brand new strap-ons she has left out for ladies who wish to avail of her slut, tearing it eagerly from its box.`);
				}
				r.push(`He begins to moan as you gently probe his anus with the tip of`);
				if (V.PC.dick === 0) {
					r.push(`the strap-on.`);
				} else {
					r.push(`your cock.`);
				}
				r.push(`Slowly, you get a little deeper with every third or fourth thrust of your hips. You grab on to his petite, feminine waist as you work, occasionally using one hand to hold him roughly by the hair, neck or shoulder, or to smack his butt. Your business associate makes no attempt to hide her obvious arousal at the sight of`);
				if (V.PC.dick === 0) {
					r.push(`the formidable dildo`);
				} else {
					r.push(`your formidable cock`);
				}
				r.push(`pounding some obedience into her slave, and flirts shamelessly with you as you work.`);
				if (V.PC.dick === 0) {
					r.push(`The slave climaxes, and while you don't quite join him, watching him squirm helplessly underneath you as you used his ass has left you intensely aroused.`);
				} else {
					r.push(`The slaves tight anal muscles massage your cock as he orgasms, bringing you to climax as well.`);
				}
				r.push(`Your associate's face is flushed after the spectacle, though considering the disappointing size of her new slave's penis, it's hardly surprising that she's so thirsty for male attention. She offers to "serve you some refreshments" back at her apartment, an offer you happily take her up on. As you depart with her, a mass of curious socialites converge on the helpless sissy, eager to try his asshole out, since being fucked by the owner of the arcology has instantly, albeit temporarily, made him very fashionable.`);
			} else {
				r.push(`Taking a slave's virginity is hardly novel for you, yet somehow it never stops being fun. You consider the bottle of lubricant your associate has left out for use and then decide it's unnecessary, since the slutty bitch is already quite wet.`);
				if (V.PC.dick === 0) {
					r.push(`You do however reach for one of the brand new strap-ons he has left out for ladies who wish to avail of his slut, tearing it eagerly from its box.`);
				}
				r.push(`She begins to moan as you gently probe her pussy with the tip of`);
				if (V.PC.dick === 0) {
					r.push(`the strap-on.`);
				} else {
					r.push(`your cock.`);
				}
				r.push(`Slowly, you get a little deeper with every third or fourth thrust of your hips. You grab on to her petite, feminine waist as you work, occasionally using one hand to hold her roughly by the hair, neck or shoulder, or to smack her butt. Your business associate can't keep the smug smile off his face as he watches you pound some obedience into his slave. You know nothing puts a bitch in her place harder than discovering the secret rapture of being fucked just the way she didn't even know she likes it, and focus on exploiting her apparent humiliation fetish.`);
				if (V.PC.dick === 0) {
					r.push(`She climaxes indecently hard from your expert, hard, but just tender enough loving.`);
				} else {
					r.push(`Her tight pussy brings you to climax after a hard fucking and the sensation of being filled with your semen is enough to bring about her orgasm as well.`);
				}
				r.push(`Your associate is extremely impressed with your performance and eager to ask for some slave-breaking tips. You're more than happy to offer a little advice, considering he's new to the game, and the two of you walk off together to find somewhere where you can get refreshments as you discuss. As you depart, a mass of curious socialites converge on the helpless slut, eager to try her holes out, since being fucked by the owner of the arcology has instantly, albeit temporarily, made her very fashionable.`);
			}
			r.push(`Your citizens <span class="green">appreciated</span> the vigorous show you put on, and the fact that you are <span class="green">not too snobby</span> to enjoy the simple pleasure of availing of a public whore once in a while.`);
			repX(500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function decline() {
			let r = [];
			if (num < V.seeDicks) {
				r.push(`You decline her offer, but instead offer to buy her coffee at the nearby café. You enjoy some especially delicious coffee together while admiring the view of her slave's ass being broken in by a trickle of curious parties, who also occasionally walk around to the other side of the helpless sissy to use his mouth.`);
			} else {
				r.push(`You decline his offer, but instead offer to buy him coffee at the nearby café. You enjoy some especially delicious coffee together while admiring the view of his slave's pussy being broken in by a trickle of curious parties, who also occasionally avail of her ass or walk around to the other side of the helpless slut to use her mouth.`);
			}
			r.push(`You trade friendly chit-chat and end up discussing business after a while, eventually striking a minor bargain over some outstanding orders that were causing some grief to your holdings, earning you some <span class="cash inc">extra cash.</span>`);
			cashX(random(250, 1000), "event");
			return r;
		}
	}
};
