App.Events.CMRESSSpoiledCat = class CMRESSSpoiledCat extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => FutureSocieties.isActive('FSEgyptianRevivalist')
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.assignment === Job.PUBLIC || s.assignment === Job.WHORE,
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				canMove,
				s => s.race === "catgirl",
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, girl
		} = getPronouns(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push(`Catgirl slaves have brought with them the kind of religious revivalism only possible when you can literally kiss your goddess' ass to your Egyptian revivalist society. The Arcology has responded to the public appearance of catgirls with all manner of fascinating cultural and religious ceremonies. The exceptional rarity of catgirls means that those few who regularly appear in public are lavished with attention and affection, purely on the virtue of their feline features' resemblance to the ancient Egyptian Goddesses.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Although the new religious and cultural festivals and performances featuring your new catgirls - and, more typically, cat tits and ass - are both creative and entertaining, the public's worshipful love of catgirls does have the unfortunate effect of absolutely spoiling the narcissistic kittens. ${eventSlave.slaveName} in particular has been in the public eye a lot recently, both to do ${his} job and to appease the public eye for cats in theatre.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Being regularly referred to as a goddess and offered gifts and praise by the adoring public has clearly started to go to ${his} head. ${He} walks around the penthouse with a smug swagger, lounges around with ${his} little 'offerings', and even asks the other girls to do small tasks for ${him} regularly as though ${he}'s a step above in the hierarchy. It might be time to knock ${eventSlave.slaveName}'s furry ass down a peg or two. On the other hand, encouraging preferential treatment of cat slaves would undoubtedly help advance Egyptian cultural values to the public...`);
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} a hard public spanking`, spanking),
			new App.Events.Result(`Encourage ${his} special treatment`, goddess),
			new App.Events.Result(`Let ${him} keep playing "Goddess" in public, but make sure ${he} knows where ${he} belongs - under your ${PC.dick !== 0 ? "dick" : "cunt"}`, godMe),
		]);

		function spanking() {
			t = [];

			t.push(`You decide to fix ${eventSlave.slaveName}'s little arrogance problem with the tried-and-true method of beating ${his} ass red. You tell the smug-looking cat${girl} that you'll be taking a walk with ${him} to the plaza today, which immediately excites ${him} due to the prospect of showing up in another small festival or performance. Once you're there, however, in the midst of the day-to-day crowd, you order the pleased-looking cat to drop ${his} pants and get over your knee. The smile very quickly fades from ${his} face. After a moment of hesitation, realizing what's about to come, the cat${girl}'s pointy ears droop to either side and ${he} very slowly removes ${his} lowers, taking a position over your knee with ${his} bare ass out to the public. ${He} mumbles out some whine to 'not ruin my reputation too badly', which you respond to via a hard slap to ${his} bare asscheeks. As the crowd watches, you absolutely blister ${eventSlave.slaveName}'s furry ass as the public's "goddess" of a kitten mrowls and squirms, beating ${his} butt so red you can all but see the cheeks glowing through ${his} fur. At the end of it, once you've spanked the sniffling cat nearly purple, you have ${him} stand up, cup ${his} beaten asscheeks while facing away from the crowd, and apologize for ${his} "smug behavior". `);
			App.Events.addParagraph(node, t);
			t = [];
			if (eventSlave.fetish === "masochist") {
				t.push(`The pathetic maso-kitty is practically <span class="devotion inc">drooling with arousal</span> as you order ${him} to get ${his} fuzzy butt back over to you, even through the tears.`);
				eventSlave.devotion += 5;
			}
			if (eventSlave.fetish === "humiliation") {
				t.push(`The total humiliation addict <span class="devotion inc">quivers</span> as the crowd watches a Goddess get ${his} fuzzy ass mercilessly beaten.`);
				eventSlave.devotion += 5;
			}
			t.push(`After you're satisfied with ${his} public apology, the <span class="trust dec">sniffling</span> cat${girl} scampers back to you, pulling ${his} bottoms back up over ${his} unexpectedly beaten cheeks. The public <span class="red">disapproves</span> of such cruel treatment of holy icons, even if they might have enjoyed watching ${his} ass get smacked raw.`);
			App.Events.addParagraph(node, t);
			t = [];
			repX(-500, "event", eventSlave);
			eventSlave.trust -= 10;
			return t;
		}

		function goddess() {
			let t = [];
			t.push(`You decide that it probably can't hurt to just let people continue treating ${eventSlave.slaveName} like a little Goddess. After all, ${he}'s not challenging your authority with all this roleplay, and it's kind of cute. For ${his} half,${eventSlave.slaveName} is more than <span class="devotion inc">happy</span> to keep playing at being an ancient Egyptian deity, and the worshipful treatment has clearly made ${him} more <span class="trust inc">confident</span> too. A few days later, you see ${eventSlave.slaveName} at work, dressed up in full Egyptian regalia, two citizens kneeling behind ${him} and lavishing praise on the "goddess" as they kiss ${his} furry asscheeks through the silk. ${eventSlave.slaveName} waves to you, apparently <span class="lightcoral">loving the dominance.</span> The more submissive - and religious - citizens of your arcology seem to be <span class="green">enjoying it too.</span>`);
			eventSlave.trust += 10;
			eventSlave.devotion += 10;
			eventSlave.fetishStrength = 10;
			eventSlave.fetish = "dom";
			eventSlave.fetishKnown = 1;
			repX(750, "event", eventSlave);
			return t;
		}

		function godMe() {
			t = [];
			t.push(`You call ${eventSlave.slaveName} into your office, and, without explanation, tell ${him} to get to work servicing your ${PC.dick !== 0 ? "cock" : "cunt"}. The catslave seems somewhat surprised, but doesn't protest, kneeling down and getting to work pulling your pants out of the way. When ${he}'s ${PC.dick !== 0 ? `managed to get your dick down ${his} throat,` : `gotten to work eating you out with ${his} rough cat tongue up your cunt,`} you inform ${him} that ${he}'s been acting more than a little smug recently, and that ${he} needed a little reminder of ${his} place. With one hand, you grab the cat${girl}'s soft hair and pull ${him} tightly forward,${PC.dick !== 0 ? `burying ${him} so deep onto your dick ${he} has to stretch ${his} jaw to avoid pricking you with ${his} fangs` : `flattening ${his} nose against your crotch with ${his} tongue buried deep into your pussy`}, forcing ${him} to look up at you with big, wide, stilted cat eyes, ${his} mouth dedicated to your genitals. You tell ${him} that no matter how much the public kisses ${his} ass, ${he}'ll always be a mewling little slave groveling under your ${PC.dick !== 0 ? "dick" : "pussy"}. The slave${girl} nods enthusiastically and you let go of ${his} head, letting ${him} finish you off with some <span class="devotion inc">intense oral.</span> For the rest of the week, the public continues to lavish attention and <span class ="green">love</span> onto the public-facing cat${girl}, but at the slightest gesture from you ${he} wiggles ${his} furry ass back in groveling, slavish devotion.`);
			eventSlave.devotion += 15;
			repX(400, "event", eventSlave);
			return t;
		}
	}
};
