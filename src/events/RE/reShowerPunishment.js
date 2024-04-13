App.Events.REShowerPunishment = class REShowerPunishment extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.HeadGirlID !== 0,
		];
	}

	actorPrerequisites() {
		return [[
			(s) => s.devotion <= 50,
			(s) => s.anus !== 0,
			(s) => s.fetish !== Fetish.MINDBROKEN,
			canDoAnal,
			hasAnyLegs,
			hasAnyArms,
			canTalk,
		]];
	}

	execute(node) {
		const r = new SpacedTextAccumulator(node);
		const slave = getSlave(this.actors[0]);

		const {
			He,
			he, his, him, himself, girl, women
		} = getPronouns(slave);

		const {title: Master} = getEnunciation(slave);

		const {
			He2, His2,
			he2, his2, him2, woman2, girl2
		} = getPronouns(S.HeadGirl).appendSuffix("2");

		App.Events.drawEventArt(node, [slave, S.HeadGirl], "no clothing");


		if (V.HGSuite === 1) {
			r.push(`Looking in on your Head Girl in ${his2} suite, you hear ${his2} private shower running and head that way. Through the thick steam the shower makes on its hottest setting, you see`);
		} else {
			r.push(`Passing by the showers, you see, through the steam of a very hot shower,`);
		}
		r.push(`a`);
		if (slave.height > 180) {
			r.push(`tall,`);
		} else if (slave.height < 150) {
			r.push(`tiny,`);
		}
		r.push(
			`${slave.skin} form moving busily around a ${S.HeadGirl.skin} figure, which is standing confidently in the middle of the warm, moist space. As you draw nearer, you identify the stationary slave as your Head Girl,`,
			App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(S.HeadGirl), "."),
			`${His2} attendant is`,
			App.UI.DOM.combineNodes(contextualIntro(S.HeadGirl, slave, true), `,`),
			`and ${he}'s washing ${his} superior with a big sponge.`,
		);

		if (V.HGSeverity > 0) {
			r.push(`By virtue of not being rape, this is an unusually mild punishment by your Head Girl, if indeed that's what it is. But perhaps ${he2}'s saving that for later. And to go by the cringing, frightened mien of the busy little bath bitch, that's probably it.`);
		} else if (V.HGSeverity === 0) {
			r.push(`Your Head Girl does ${his2} best to fit the punishment to the crime, so ${slave.slaveName}'s failure was likely minor. With ${S.HeadGirl.slaveName}'s penchant for poetic justice, probably some little deficiency of personal cleanliness.`);
		} else {
			r.push(`This is the sort of mild punishment that your regime of respect and dignity requires ${him2} to use for all but the most egregious fault. Thus restricted, ${he2} does ${his2} best to come up with novel little degradations to keep ${his2} charges on their toes.`);
		}
		r.toParagraph();
		r.push(`${slave.slaveName} is being very thorough. When you first appeared, ${he} was working ${his} way up ${S.HeadGirl.slaveName}'s `);
		if (S.HeadGirl.muscles > 30) {
			r.push(`muscle-corded`);
		} else if (S.HeadGirl.weight > 10) {
			r.push(`soft`);
		} else if (S.HeadGirl.vagina > -1) {
			r.push(`feminine`);
		} else {
			r.push(`pretty`);
		}
		r.push(`thighs, having obviously started at the bottom. ${He} skips over ${S.HeadGirl.slaveName}'s crotch, probably under instructions to leave it for last. It's late in your Head Girl's busy day, and you hear ${his2} groan of relaxation over the running water when the stiff sponge begins to scrub back and forth across ${his2}`);
		if (S.HeadGirl.belly >= 60000) {
			r.push(`enormously`);
			if (S.HeadGirl.preg > 0) {
				r.push(`pregnant`);
			} else {
				r.push(`rounded`);
			}
			r.push(`belly.`);
		} else if (S.HeadGirl.weight > 190) {
			r.push(`massively fat gut.`);
		} else if (S.HeadGirl.belly >= 10000) {
			r.push(`hugely`);
			if (S.HeadGirl.preg > 0) {
				r.push(`pregnant`);
			} else {
				r.push(`rounded`);
			}
			r.push(`belly.`);
		} else if (S.HeadGirl.weight > 95) {
			r.push(`big soft belly.`);
		} else if (S.HeadGirl.belly >= 5000) {
			if (S.HeadGirl.preg > 0) {
				r.push(`pregnant`);
			} else {
				r.push(`round`);
			}
			r.push(`belly.`);
		} else if (S.HeadGirl.weight > 30) {
			r.push(`soft belly.`);
		} else if (S.HeadGirl.belly >= 1500) {
			r.push(`bloated belly.`);
		} else if (S.HeadGirl.muscles > 30) {
			r.push(`shredded abs.`);
		} else if (S.HeadGirl.weight > 10) {
			r.push(`plush belly.`);
		} else if (S.HeadGirl.piercing.navel.weight > 0) {
			r.push(`pierced belly button.`);
		} else if (S.HeadGirl.waist < -10) {
			if (S.HeadGirl.waist < -95) {
				r.push(`absurdly`);
			}
			r.push(`narrow waist.`);
		} else {
			r.push(`belly.`);
		}
		r.toParagraph();

		const choices = [];
		choices.push(new App.Events.Result(`Just spectate`, spectate));
		choices.push(new App.Events.Result(`Get a scrub down too`, scrub));
		choices.push(new App.Events.Result(`Focus on your Head Girl`, HG));
		App.Events.addResponses(node, choices);

		function spectate() {
			const r = new SpacedTextAccumulator();
			r.push(`You could strip off your suit, walk into the steam, and enjoy your slaves' ministrations, but sometimes the artistry of tastefully nude bodies is a welcome change of pace. You lean against the wall, far enough away that they remain unaware of your presence, and take in the sight. ${S.HeadGirl.slaveName} makes the penitent ${girl} do the job with Brahmanical thoroughness, cleaning ${his} superior's ${S.HeadGirl.race} body down to its very last pore. As ${slave.slaveName} circles the Head Girl laboriously, doing ${his} best to ingratiate ${himself} by diligence, the pair of naked`);
			if (girl === girl2) {
				r.push(`${women}`);
			} else {
				r.push(`slaves`);
			}
			r.push(`present a fascinating contrast. They are unclothed alike, the water streaming off their bodies without any distinction, but even an old world fool could not mistake the immense gulf between them.`);
			r.toParagraph();
			r.push(`When ${slave.slaveName} is finally done, ${S.HeadGirl.slaveName}'s`);
			if (V.HGSeverity > 0) {
				r.push(`hands seize ${him} by the ears and pull ${his} head in for a kiss that is dominance distilled into the form of a loving gesture. Then ${he2} pokes ${his2} bitch in the side, forcing the slave to collapse in just the right way.`);
			} else if (V.HGSeverity === 0) {
				r.push(`arms encircle ${him} in an embrace that is simultaneously controlling, comforting, and sexually insistent. The slave does not resist, allowing the Head Girl to run ${his2} hands over the warm, wet sex slave.`);
			} else {
				r.push(`arousal is obvious. Though the respectful regime you require secures ${him} from the fear of being used, ${slave.slaveName} nonverbally offers ${his} superior oral, out of obvious gratitude that whatever ${he} did is being treated so leniently, and perhaps out of a desire to be in ${S.HeadGirl.slaveName}'s good graces.`);
			}
			r.push(`In no time at all, ${slave.slaveName}'s ${slave.hColor} head descends to obscure ${S.HeadGirl.slaveName}'s groin. The`);
			if (S.HeadGirl.face > 95) {
				r.push(`heartrendingly gorgeous`);
			} else if (S.HeadGirl.face <= 95) {
				r.push(`wonderfully pretty`);
			} else if (S.HeadGirl.face <= 40) {
				r.push(`approachably lovely`);
			} else if (S.HeadGirl.face <= 10) {
				r.push(`not unattractive`);
			} else {
				r.push(`homely`);
			}
			if (S.HeadGirl.physicalAge > 25) {
				r.push(`${woman2}'s`);
			} else {
				r.push(`${girl2}'s`);
			}
			r.push(`head cranes back with orgasm before long; that diligent scrub must have been quite stimulating.`);
			r.toParagraph();
			r.push(`${slave.slaveName} stays in the shower to clean ${himself}, so ${S.HeadGirl.slaveName} exits to see you watching the denouement. ${He2} <span class="devotion inc">smiles,</span> murmuring a greeting, and hurries over to give you a peck on the cheek, leaning in as best ${he2} can to keep ${his2} moist body away from your suit. "This is the life, ${Master}," ${he2} whispers.`);
			seX(slave, "oral", S.HeadGirl, "penetrative");
			S.HeadGirl.devotion += 4;
			r.toParagraph();

			return r.container();
		}

		function scrub() {
			const r = new SpacedTextAccumulator();
			r.push(`You strip off your suit and enter the shower. By the time you get in, ${S.HeadGirl.slaveName}'s sponge scrub is almost done. ${He2} turns to greet you with half-lidded eyes, well pleased with ${his2} thorough scrubbing. ${His2} ${S.HeadGirl.skin} skin shines with wet cleanliness, and ${his2} ${S.HeadGirl.nipples} nipples begin to`);
			if (S.HeadGirl.nipples === "fuckable") {
				r.push(`swell with arousal`);
			} else {
				r.push(`stiffen`);
			}
			r.push(`as ${he2} sees your gaze take in ${his2} nude body. ${He2} brusquely orders ${slave.slaveName} to scrub you, too, anticipating your intention. The rough, exfoliating sensation of the sponge is indeed delightful, and you close your eyes to savor the feeling as the slave rubs it up and down your calves and then the backs of your knees.`);
			r.toParagraph();
			if (V.HGSeverity > 0) {
				r.push(`You detect tremors of fear in the`);
				if (hasAnyArms(slave)) {
					r.push(`slave's ${hasBothArms(slave) ? "hands" : "hand"};`);
				} else {
					r.push(`slave;`);
				}
				r.push(`${he} knows that ${he} hasn't extirpated ${his} misbehavior, whatever it was, just yet. You let your Head Girl manage that, however, and ${he2} does. When ${slave.slaveName} is stuck in one position for a short time by the need to wash your thighs, you hear a gasp and open your eyes to the sight of your Head Girl crouched behind ${him}, giving ${him} an anal fingerfuck. When ${slave.slaveName} is done washing you, your Head Girl holds the slave's head to your`);
			} else {
				r.push(`When the washing reaches your shoulders, it becomes clumsier, and ${slave.slaveName}'s wet body begins to bump gently against your torso. Opening your eyes, you see that your Head Girl is taking ${him} as ${he} finishes your bath. ${slave.slaveName} is doing ${his} best to do a good job as ${he}'s fucked, and ${he} manages it reasonably well. When ${he}'s done, ${S.HeadGirl.slaveName} pushes ${his} head down towards your`);
			}
			if (V.PC.dick !== 0) {
				r.push(`groin so ${he} can suck you off${(V.PC.vagina !== -1) ? "and stroke your cunt" : ""}.`);
			} else {
				r.push(`cunt so ${he} can eat you out.`);
			}
			r.push(`${slave.slaveName} complies, and afterward, ${he} seems to feel that <span class="trust inc">${he} came off reasonably well;</span> it could have been worse.`);
			seX(slave, "anal", S.HeadGirl, "penetrative");
			seX(slave, "oral", V.PC, "penetrative");
			r.push(knockMeUp(slave, 10, 1, V.HeadGirlID));
			slave.trust += 4;
			r.toParagraph();
			return r.container();
		}

		function HG() {
			const r = new SpacedTextAccumulator();
			const {hersP} = getPronouns(V.PC).appendSuffix("P");
			r.push(`You strip off your suit and walk into the steam, producing a surprised but welcoming greeting from your Head Girl and a muffled, submissive noise from ${slave.slaveName}. ${S.HeadGirl.slaveName} is held more or less stationary by the slave ${he2}'s straddling, so you step in, hook a dominant arm around ${his2} waist, and kiss ${him2}. There's precisely one person in this arcology who's allowed to treat ${him2} as ${hersP}, and it's you. ${He2} relaxes into you with gratitude as you shoulder the burden of being the leader in this little area of your empire, lifting it from ${his2} shoulders for now.`);
			r.toParagraph();
			r.push(`You run a hand up the side of ${his2} neck, bringing it to rest with your fingers cupping ${him2} under the ear and your thumb running up along ${his2} temple. ${He2} shivers, unable to concentrate despite all ${his2} poise, the ongoing oral service blending into your intense closeness. Right now, ${he2}'s the`);
			if (S.HeadGirl.physicalAge > 25) {
				r.push(`${woman2}`);
			} else {
				r.push(`${girl2}`);
			}
			r.push(`for you, so you snap your fingers next to the ear of the slave`);
			if (S.HeadGirl.vagina > -1) {
				r.push(`eating ${him2} out,`);
			} else {
				r.push(`blowing ${him2},`);
			}
			r.push(`point at the dropped sponge, and then point at yourself. The oral stops as ${slave.slaveName} hurries to scrub you, starting at your feet, but your Head Girl doesn't care. You're kissing ${him2}.`);
			r.toParagraph();
			r.push(`${He2} gently strokes your `);
			if (V.PC.dick !== 0) {
				r.push(`rapidly hardening member, smiling into your mouth at the speed with which it stiffens${(V.PC.vagina !== -1) ? ", and teases your pussylips with mischievous fingers" : ""}.`);
			} else {
				r.push(`flushed cunt, smiling into your mouth at the moisture that instantly coats ${his2} fingertips.`);
			}
			r.push(`You reach out in turn,`);
			if (S.HeadGirl.vagina > -1) {
				r.push(`caressing ${his2} pussylips before slowly inserting a digit inside ${his2} warmth while nuzzling ${his2} clit with the knuckle of your thumb. At the first real brush against ${his2} clitoris, the overstimulated ${S.HeadGirl.slaveName} climaxes, pulling ${his2} mouth away from you to shout your name and then sobbing thanks into your ear.`);
			} else {
				r.push(`hooking your fingers up underneath ${his2} taint to grope ${his2} anus. After teasing ${his2} asspussy for a moment you bring your hand slowly across ${his2} perineum${(S.HeadGirl.scrotum > 0) ? `until ${his2} ballsack rests against your wrist` : ""}. The overstimulated ${S.HeadGirl.slaveName} cums the instant the butt of your hand touches the base of ${his2} cock. ${He2} screams your name.`);
			}
			r.toParagraph();
			r.push(`${He2} isn't terribly affected by loving shower sex with you; after all, it isn't exactly novel for ${him2}. ${slave.slaveName} was there to bear witness, though, scrubbing your back as ${S.HeadGirl.slaveName} clung to it with orgasm. ${He} can't help but be <span class="devotion inc">impressed.</span> Maybe, just maybe, that could be ${him} someday. ${He} seems distinctly uncomfortable.`);

			seX(slave, "oral", S.HeadGirl, "oral");

			slave.devotion += 4;

			r.toParagraph();
			return r.container();
		}
	}
};
