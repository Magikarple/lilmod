// cSpell:ignore Ahhh, Ahhhmmm, Aiii, Aiiii, gooood, grffh, Haah, Hehe, Hmmmm, Hmph, kffph, mmmh, Mmmmwah, MMPHH, Mnhh
// cSpell:ignore Ohhh, Ohhhh, Oohhh, Oohhhh, Oooh, Tmph

App.UI.SlaveInteract.useSlave.contextualText = {
	/** @param {FC.SlaveState} slave */
	keepKissing(slave) {
		const {he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You keep your lips pressed to ${his}, catching a bit of tongue and eliciting a slight moan while ${he} reciprocates with affection.`;
		} else if (slave.devotion > 20) {
			return `Continue kissing test 2`;
		} else if (slave.devotion > -20) {
			return `Continue kissing test 3`;
		} else {
			return `Continue kissing test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	stopKissing(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You pull your lips away. A quiet moan of longing escapes ${his} slightly agape mouth.`;
		} else if (slave.devotion > 20) {
			return `Stop kissing test 2`;
		} else if (slave.devotion > -20) {
			return `Stop kissing test 3`;
		} else {
			return `Stop kissing test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	keepFucking(slave) {
		const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You continue sliding in and out of ${him}, thoroughly enjoying yourself while ${his} needy moans encourage you.`;
		} else if (slave.devotion > 20) {
			return `Continue fucking test 2`;
		} else if (slave.devotion > -20) {
			return `Continue fucking test 3`;
		} else {
			return `Continue fucking test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	holdDown(slave) {
		const {he, him} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `Your domineering instincts take over as you pin ${him} down and fuck ${him} harder - not that ${he} needed a reminder that you're in charge.`;
		} else if (slave.devotion > 20) {
			return `Hold down test 2`;
		} else if (slave.devotion > -20) {
			return `Hold down test 3`;
		} else {
			return `Hold down test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	stopFucking(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You pull out of ${slave.slaveName} so you can use your ${V.PC.dick !== 0 ? `dick` : `strapon`} somewhere else.`;
		} else if (slave.devotion > 20) {
			return `Stop fucking test 2`;
		} else if (slave.devotion > -20) {
			return `Stop fucking test 3`;
		} else {
			return `Stop fucking test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	continueOral(slave) {
		const {He, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.slaveName} continues serving you with ${his} mouth, licking ${his} tongue ${V.PC.dick !== 0 ? `up and down your hard shaft` : `over your aroused petals`}. ${He} occasionally looks up at you with love in ${his} eyes.`;
		} else if (slave.devotion > 20) {
			return `continueOral test 2`;
		} else if (slave.devotion > -20) {
			return `continueOral test 3`;
		} else {
			return `continueOral test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	holdHeadDown(slave) {
		const {He, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You grab ${slave.slaveName}'s head and force it down on your ${V.PC.dick !== 0 ? `cock` : `pussy`}. ${He} is surprised, but quickly accepts ${his} rightful place.`;
		} else if (slave.devotion > 20) {
			return `Hold head down test 2`;
		} else if (slave.devotion > -20) {
			return `Hold head down test 3`;
		} else {
			return `Hold head down test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	stopOral(slave) {
		const {he, him} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You've had enough of ${slave.slaveName}'s mouth. You tell ${him} to stop and ${he} complies obediently, awaiting your pleasure.`;
		} else if (slave.devotion > 20) {
			return `continueOral test 2`;
		} else if (slave.devotion > -20) {
			return `continueOral test 3`;
		} else {
			return `continueOral test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	cumOnFace(slave) {
		const {He, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${V.PC.dick !== 0 ? `You put your cock in front of ${slave.slaveName}'s face and stroke vigorously. ${He} opens ${his} mouth and sticks out ${his} tongue, ready to receive your load. Feeling yourself pass the point of no return, you groan as you shoot jets of cum all over ${him}, coating ${his} face pearly white. ${He} licks a bit of it up with a smile.` : `You move your pussy above ${his} face and rub vigorously. ${He} opens ${his} mouth and sticks out ${his} tongue, occasionally lapping up at your pussy to help you along. Feeling yourself pass the point of no return, you gasp as you orgasm and squirt all over ${him}. ${He} is delighted.`} `;
		} else if (slave.devotion > 20) {
			return `Player cum on face 2`;
		} else if (slave.devotion > -20) {
			return `Player cum on face 3`;
		} else {
			return `Player cum on face 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	cumInMouth(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${V.PC.dick !== 0 ? `You tell ${slave.slaveName} that you're going to finish in ${his} mouth as you feel yourself getting close. ${He} responds by speeding up, pushing you past the edge. You keep a hand on the back of ${his} head as you orgasm; ${he} doesn't protest, taking all your cum in ${his} mouth with ease. You pull out when you're finished, and ${he} looks up at you and swallows, showing off ${his} empty mouth with a smile.` : `${slave.slaveName}'s mouth and tongue on your pussy feels too good to stop now. You tell ${him} to keep going and that you're close; ${he} responds with a newfound vigor that pushes you past the edge. ${He} keeps licking like a good slave as you scream and ride out your orgasm, and ${he} looks happy when ${he} sees your contented face afterward.`}`;
		} else if (slave.devotion > 20) {
			return `Player cum in mouth 2`;
		} else if (slave.devotion > -20) {
			return `Player cum in mouth 3`;
		} else {
			return `Player cum in mouth 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	cumInPussy(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.slaveName}'s ${slave.preg === 0 ? `fertile ` : ``}pussy feels too good for you to cum anywhere else, so you hold ${him} close and fuck ${him} faster; ${he} knows exactly what's coming. ${He} encourages you with sweet kisses and adoring looks, but when ${he} gets even tighter by contracting ${his} slit around your cock, you can't hold out any longer. With a roar, you blow your load deep inside ${his} pussy, filling ${him} up to the brim. ${He} gasps with delight, never breaking ${his} adoring eye contact with you as you ride out your wonderful orgasm. ${He} kisses you with love when you're finally finished, and you pull out to reveal pearly white cum leaking out from ${his} pussy. ${slave.preg === 0 ? `You smile at the thought that <span class="lime">${he} may already be pregnant.</span>` : ``}`;
		} else if (slave.devotion > 20) {
			return `Player cum in pussy 2`;
		} else if (slave.devotion > -20) {
			return `Player cum in pussy 3`;
		} else {
			return `Player cum in pussy 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	cumInAnus(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You decide to finish inside ${slave.slaveName}'s ${slave.mpreg && slave.preg === 0 ? `fertile ` : ``}asshole as you thrust in and out of ${him}. ${He} gasps as you spank ${his} ass and you speed up, indicating you're getting close. ${He} shakes ${his} ass on your dick and looks back to smile at you, hopeful ${he}'s able to satisfy your desires. It doesn't take long before you careen over the edge, cumming deep inside ${him}. You pull out and observe your handiwork: a small dribble of cum escapes ${his} well-fucked butt. ${He} giggles and gives it a playful wiggle. ${slave.mpreg && slave.preg === 0 ? `You smile at the thought that <span class="lime">${he} may already be pregnant.</span>` : ``}`;
		} else if (slave.devotion > 20) {
			return `Player cum in ass 2`;
		} else if (slave.devotion > -20) {
			return `Player cum in ass 3`;
		} else {
			return `Player cum in ass 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	makeSlaveCum(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You decide to reward ${slave.slaveName} with an orgasm. ${slave.dick > 0 ? `You stroke ${his} cock with your hand, feeling ${him} get ever harder. ${He} is very aroused, so it doesn't take long before ${he} goes over the edge, shooting cum all over the floor and getting a bit on your hand. Satisfied, ${he}'s ready and eager to please you.` : `You rub ${his} pussy, flicking your fingers over ${his} soft petals${slave.clit >= 0 ? ` and ${his} clit,` : `,`} rapidly bringing ${him} to orgasm. ${He} gasps as ${his} body convulses with pleasure and ${his} pussy lets out a small bit of ejaculate. ${He}'s satisfied and eager to please you.`}`;
		} else if (slave.devotion > 20) {
			return `Make slave cum 2`;
		} else if (slave.devotion > -20) {
			return `Make slave cum 3`;
		} else {
			return `Make slave cum 4`;
		}
	},
};

App.UI.SlaveInteract.useSlave.faceText = {
	/** @param {FC.SlaveState} slave */
	regularKiss(slave) {
		const {him} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.slaveName} gives you a quick smile as you pull ${him} in and kiss ${him} on the lips.`;
		} else if (slave.devotion > 20) {
			return `Face test regular 2`;
		} else if (slave.devotion > -20) {
			return `Face test regular 3`;
		} else {
			return `Face test regular 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	passionateKiss(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You pull ${slave.slaveName} close and make out with vigor as your tongues intertwine.`;
		} else if (slave.devotion > 20) {
			return `Face test passionate 2`;
		} else if (slave.devotion > -20) {
			return `Face test passionate 3`;
		} else {
			return `Face test passionate 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	intimateKiss(slave) {
		const {He, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You gently embrace, showering ${slave.slaveName} with tender kisses as you look deeply into ${his} eyes. ${He} happily returns the favor.`;
		} else if (slave.devotion > 20) {
			return `Face test intimate 2`;
		} else if (slave.devotion > -20) {
			return `Face test intimate 3`;
		} else {
			return `Face test intimate 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	slaveGivesOral(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.slaveName} eagerly ${V.PC.dick !== 0 ? `takes your cock in ${his} mouth, occasionally swirling ${his} tongue around your tip and looking up into your eyes, selflessly giving pleasure.` : `goes down on you, licking your pussy and occasionally looking up into your eyes, selflessly making you feel really good.`} You let out a moan as you enjoy ${his} ministrations.`;
		} else if (slave.devotion > 20) {
			return `Face test slave oral 2`;
		} else if (slave.devotion > -20) {
			return `Face test slave oral 3`;
		} else {
			return `Face test slave oral 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	playerGivesOral(slave) {
		const {he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.dick ? `You wrap your mouth around ${slave.slaveName}'s dick, ` : `You bury your face in ${slave.slaveName}'s crotch, `} eliciting grateful moans as ${he} enjoys ${his} treat.`;
		} else if (slave.devotion > 20) {
			return `Face test player oral 2`;
		} else if (slave.devotion > -20) {
			return `Face test player oral 3`;
		} else {
			return `Face test player oral 4`;
		}
	},
};

App.UI.SlaveInteract.useSlave.chestText = {
	/** @param {FC.SlaveState} slave */
	grope(slave) {
		const {he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.boobs >= 300 ? `You wrap your hands around ${slave.slaveName}'s soft breasts, kneading and fondling them, ` : `You run your hands over ${his} chest `} and ${he} gasps slightly.`;
		} else if (slave.devotion > 20) {
			return `Chest test grope 2`;
		} else if (slave.devotion > -20) {
			return `Chest test grope 3`;
		} else {
			return `Chest test grope 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	lick(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You put your mouth around ${slave.slaveName}'s nipple, using your tongue to flick and circle around it, switching off between them. You feel them hardening in your mouth.`;
		} else if (slave.devotion > 20) {
			return `Chest test lick 2`;
		} else if (slave.devotion > -20) {
			return `Chest test lick 3`;
		} else {
			return `Chest test lick 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	suck(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You wrap your lips around ${slave.slaveName}'s nipples, suckling on them and feeling them harden. ${slave.lactation >= 1 ? `Soon enough, you manage to draw sweet milk from ${his} lactating ${slave.boobs >= 300 ? `boobs` : `chest`}.` : ``}`;
		} else if (slave.devotion > 20) {
			return `Chest test suck 2`;
		} else if (slave.devotion > -20) {
			return `Chest test suck 3`;
		} else {
			return `Chest test suck 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	bite(slave) {
		// const {He, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `Feeling adventurous, you take a nipple between your teeth and bite down hard. ${slave.slaveName} squeals with delight.`;
		} else if (slave.devotion > 20) {
			return `Chest test bite 2`;
		} else if (slave.devotion > -20) {
			return `Chest test bite 3`;
		} else {
			return `Chest test bite 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	slaveSucksTits(slave) {
		const {he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You order ${slave.slaveName} to suck on your breasts and ${he} starts doing so with gusto, wrapping ${his} lips around one of your nipples at the time. You relax and enjoy ${his} ministrations.`;
		} else if (slave.devotion > 20) {
			return `Chest test bite 2`;
		} else if (slave.devotion > -20) {
			return `Chest test bite 3`;
		} else {
			return `Chest test bite 4`;
		}
	},

};

App.UI.SlaveInteract.useSlave.crotchText = {
	/** @param {FC.SlaveState} slave */
	gropePussy(slave) {
		const {He, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You move your hand down to ${slave.slaveName}'s crotch to find it already moist. ${He} gasps as you move your fingers over ${his} soft petals.`;
		} else if (slave.devotion > 20) {
			return `Groping pussy test 2`;
		} else if (slave.devotion > -20) {
			return `Groping pussy test 3`;
		} else {
			return `Groping pussy test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	gropeDick(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You wrap your hand around ${slave.slaveName}'s dick, feeling it get ever harder under your touch.`;
		} else if (slave.devotion > 20) {
			return `Groping dick test 2`;
		} else if (slave.devotion > -20) {
			return `Groping dick test 3`;
		} else {
			return `Groping dick test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	gropeAss(slave) {
		const {He, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You reach your hands around back and grab ${slave.slaveName}'s ass. ${He} shivers as your hands come tantalizingly close to ${his} asshole. You move your hands over ${his} soft buttocks, occasionally giving them a light slap.`;
		} else if (slave.devotion > 20) {
			return `Groping ass test 2`;
		} else if (slave.devotion > -20) {
			return `Groping ass test 3`;
		} else {
			return `Groping ass test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	fingerPussy(slave) {
		const {he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `As you move your hand further down ${slave.slaveName}'s crotch, ${he} parts ${his} legs for you, allowing your fingers access to ${his} pussy. You gently push a finger inside ${his} very moist tunnel, and ${he} makes a very cute noise as you caress ${his} inner walls.`;
		} else if (slave.devotion > 20) {
			return `Fingering pussy test 2`;
		} else if (slave.devotion > -20) {
			return `Fingering pussy test 3`;
		} else {
			return `Fingering pussy test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	fingerAnus(slave) {
		const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `Your hands move towards ${slave.slaveName}'s anus, and you can feel ${him} holding ${his} breath in anticipation. You run a finger around ${his} puckered asshole before pushing it inside; you can feel ${him} contracting tightly around you, getting used to the intrusion.`;
		} else if (slave.devotion > 20) {
			return `Fingering anus test 2`;
		} else if (slave.devotion > -20) {
			return `Fingering anus test 3`;
		} else {
			return `Fingering anus test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	takeVirginity(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `It's time for ${slave.slaveName} to become a ${slave.genes === "XX" ? `woman` : `proper femboy`}. ${He} is anxious yet excited as you describe what you intend to do to ${him}, and ${he} nods with obedience like a good sex slave. You position yourselves so that your ${V.PC.dick !== 0 ? `rock hard cock` : `large strapon`} is lined up with ${his} pussy and gently tease ${his} soft, wet folds. Before long, you begin to gently push your length inside ${him}. ${He} gasps as ${he} feels you inside ${his} extremely tight opening for the very first time. You gradually apply more force, and ${he} screams in pain as you push past ${his} hymen and <span class="virginity loss">deflower ${him}.</span> You slowly start thrusting, and ${he} begins to enjoy ${his} very first time getting fucked. It doesn't take long before <span class="devotion inc">${he}'s begging you for more.</span>`;
		} else if (slave.devotion > 20) {
			return `Fuck pussy test 2`;
		} else if (slave.devotion > -20) {
			return `Fuck pussy test 3`;
		} else {
			return `Fuck pussy test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	fuckPussy(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You line up your ${V.PC.dick !== 0 ? `rock hard cock` : `large strapon`} with ${slave.slaveName}'s pussy. ${He}'s dripping wet as you tease ${his} petals with the tip, but you can hardly wait before you push your length deep inside ${him}. ${He} gasps and moans as ${his} ${slave.vagina < 3 ? `tight` : `loose`} pussy stretches out to accommodate you. After ${he} smiles and nods that ${he}'s ready, you start thrusting. ${V.PC.dick !== 0 ? `${He} feels really good, and you let out a groan or two as you progress through your lovemaking.` : ``}`;
		} else if (slave.devotion > 20) {
			return `Fuck pussy test 2`;
		} else if (slave.devotion > -20) {
			return `Fuck pussy test 3`;
		} else {
			return `Fuck pussy test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	takeAnalVirginity(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `It's high time ${slave.slaveName} pleases ${his} ${getWrittenTitle(slave)} with ${his} ass. You position your ${V.PC.dick !== 0 ? `dick` : `strapon`} behind ${his} virgin asshole. ${He} knows there's no escape from your desires, so ${he} nods with nervous acceptance. You slowly but surely push yourself into ${his} very tight backdoor; ${he} groans and gasps at the novel sensations coursing through ${his} body as you stretch ${him} out. Soon enough, you've pushed yourself up to the hilt, and you can feel ${his} anal sphincter <span class="virginity loss">adjusting to being invaded for the first time.</span> You slowly start fucking ${his} ass, and you catch ${him} looking back at you, <span class="devotion inc">hopeful you're satisfied using ${him}.</span>`;
		} else if (slave.devotion > 20) {
			return `Fuck asshole test 2`;
		} else if (slave.devotion > -20) {
			return `Fuck asshole test 3`;
		} else {
			return `Fuck asshole test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	fuckAnus(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You adjust yourself to line your ${V.PC.dick !== 0 ? `dick` : `strapon`} up with ${slave.slaveName}'s ${slave.anus < 2 ? `tight` : `loose`} asshole. ${He} nods, a bit anxious, inviting you to start. ${slave.anus < 2 ? `It takes some time, since ${he}'s so tight, but you work your way inside, ${his} anal sphincter hugging you tightly.` : `Your ${V.PC.dick !== 0 ? `dick` : `strapon`} goes in with ease, since ${his} anus is so loose, but it's still quite enjoyable.`} You start thrusting in and out of ${him}, taking your pleasure while ${he} gasps in occasional discomfort - but not enough to prevent ${him} from smiling at you, glad you're enjoying yourself.`;
		} else if (slave.devotion > 20) {
			return `Fuck asshole test 2`;
		} else if (slave.devotion > -20) {
			return `Fuck asshole test 3`;
		} else {
			return `Fuck asshole test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	sixtyNine(slave) {
		const {He, he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You lay down and position ${slave.slaveName} over your face while ${he} moves her head to your crotch. ${He} is eager to please, and immediately gets to work, ${V.PC.dick !== 0 ? `taking your cock in ${his} mouth` : `pleasing your pussy with ${his} mouth`}. Once you return the favor, ${he} moans into you, further increasing your pleasure.`;
		} else if (slave.devotion > 20) {
			return `69 test 2`;
		} else if (slave.devotion > -20) {
			return `69 test 3`;
		} else {
			return `69 test 4`;
		}
	}
};

App.UI.SlaveInteract.useSlave.generalText = {
	/** @param {FC.SlaveState} slave */
	dance(slave) {
		const {He, he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You put on some erotic music and order ${slave.slaveName} to dance for you. ${He} happily complies, eager to please you with the sight of ${his} body. ${He} gyrates ${his} hips and ass masterfully, ${slave.boobs >= 300 ? ` ${his} boobs jiggle with every move, ` : ``}and ${he} hardly ever breaks eye contact with you. ${He} finishes things off with a lap dance, sliding ${his} ass all over your crotch and looking back at you seductively. ${V.PC.dick !== 0 ? `You're sure ${he} can feel your erection on ${his} butt. ` : ``}${He} ends kneeling on the floor, looking up into your eyes with love.`;
		} else if (slave.devotion > 20) {
			return `Dance test 2`;
		} else if (slave.devotion > -20) {
			return `Dance test 3`;
		} else {
			return `Dance test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	striptease(slave) {
		const {He, he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You order ${slave.slaveName} to perform a striptease. ${He} complies with a smile, running ${his} hands all over ${his} body, slowly and sensually removing ${his} clothing piece by piece. You're treated to every angle of ${his} body, and by the end ${he} is naked and you are very aroused.`;
		} else if (slave.devotion > 20) {
			return `Striptease test 2`;
		} else if (slave.devotion > -20) {
			return `Striptease test 3`;
		} else {
			return `Striptease test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	pushDown(slave) {
		const {He, he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You put a hand on ${slave.slaveName}'s shoulder; as if ${he} can sense your thoughts, ${he} kneels down before you can even push. ${He} looks up at you on ${his} knees, eyes full of adoration.`;
		} else if (slave.devotion > 20) {
			return `Push down test 2`;
		} else if (slave.devotion > -20) {
			return `Push down test 3`;
		} else {
			return `Push down test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	pullUp(slave) {
		const {He, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You tell ${him} to get up. ${He} complies without delay and stands with ${his} hands held in front of ${him}, awaiting your desire.`;
		} else if (slave.devotion > 20) {
			return `Pull up test 2`;
		} else if (slave.devotion > -20) {
			return `Pull up test 3`;
		} else {
			return `Pull up test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	standUp(slave) {
		if (slave.devotion > 50) {
			return `You stand back up.`;
		} else if (slave.devotion > 20) {
			return `You stand back up.`;
		} else if (slave.devotion > -20) {
			return `You stand back up.`;
		} else {
			return `You stand back up.`;
		}
	},

	/** @param {FC.SlaveState} slave */
	pushAway(slave) {
		const {He, him} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You let go of ${him}. ${He} is visibly disappointed to leave your embrace.`;
		} else if (slave.devotion > 20) {
			return `Push away test 2`;
		} else if (slave.devotion > -20) {
			return `Push away test 3`;
		} else {
			return `Push away test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	pullClose(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You wrap your arms around ${slave.slaveName} and pull ${him} in close. ${He} leans into the embrace, pushing ${his} body as close to you as ${he} can manage.`;
		} else if (slave.devotion > 20) {
			return `Pull in test 2`;
		} else if (slave.devotion > -20) {
			return `Pull in test 3`;
		} else {
			return `Pull in test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	putOnLap(slave) {
		const {He, he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You grab ${slave.slaveName} by the waist and guide ${him} onto your lap. ${He} giggles with delight${V.PC.dick !== 0 ? ` and wiggles ${his} butt on your crotch once ${he}'s situated, encouraging your erection even more.` : `.`}`;
		} else if (slave.devotion > 20) {
			return `Put on lap test 2`;
		} else if (slave.devotion > -20) {
			return `Put on lap test 3`;
		} else {
			return `Put on lap test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	getOffLap(slave) {
		const {he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You pat ${his} back and ${he} stands up, obediently awaiting further instructions.`;
		} else if (slave.devotion > 20) {
			return `Get off lap test 2`;
		} else if (slave.devotion > -20) {
			return `Get off lap test 3`;
		} else {
			return `Get off lap test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	goToBed(slave) {
		const {He, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You take ${slave.slaveName}'s hand and lead ${him} to your oversized bed. ${He} smiles, leaning on the sheets and crawling on slowly, accentuating all of ${his} best features. You join ${him} in short order, wrapping your hands around ${him} and cuddling. ${He} coos with happiness.`;
		} else if (slave.devotion > 20) {
			return `Go to bed test 2`;
		} else if (slave.devotion > -20) {
			return `Go to bed test 3`;
		} else {
			return `Go to bed test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	getOutOfBed(slave) {
		const {He} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You get up out of bed, beckoning ${slave.slaveName} to follow. ${He} stands at attention, waiting for your orders.`;
		} else if (slave.devotion > 20) {
			return `Get out of bed test 2`;
		} else if (slave.devotion > -20) {
			return `Get out of bed test 3`;
		} else {
			return `Get out of bed test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	bringInSlave(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `Second slave test 1`;
		} else if (slave.devotion > 20) {
			return `Second slave test 2`;
		} else if (slave.devotion > -20) {
			return `Second slave test 3`;
		} else {
			return `Second slave test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	bringInCanine(slave) {
	// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `Canine test 1`;
		} else if (slave.devotion > 20) {
			return `Canine test 2`;
		} else if (slave.devotion > -20) {
			return `Canine test 3`;
		} else {
			return `Canine test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	bringInHooved(slave) {
	// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `Hooved test 1`;
		} else if (slave.devotion > 20) {
			return `Hooved test 2`;
		} else if (slave.devotion > -20) {
			return `Hooved test 3`;
		} else {
			return `Hooved test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	bringInFeline(slave) {
	// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `Feline test 1`;
		} else if (slave.devotion > 20) {
			return `Feline test 2`;
		} else if (slave.devotion > -20) {
			return `Feline test 3`;
		} else {
			return `Feline test 4`;
		}
	},
};

App.UI.SlaveInteract.useSlave.clothingText = {
	/** @param {FC.SlaveState} slave */
	pullUpDress(slave) {
		const {He, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `As cute as ${slave.slaveName}'s dress is, it's getting in the way of your fun. With little warning, you grab the hem and pull it up. ${He} squeals and giggles with ${his} naughty bits all the more exposed.`;
		} else if (slave.devotion > 20) {
			return `Pull up dress test 2`;
		} else if (slave.devotion > -20) {
			return `Pull up dress test 3`;
		} else {
			return `Pull up dress test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeClothing(slave) {
		const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You help ${slave.slaveName} undo ${his} clothing. It drops to the floor, about to be forgotten for the rest of your time with ${him}.`;
		} else if (slave.devotion > 20) {
			return `Remove clothing test 2`;
		} else if (slave.devotion > -20) {
			return `Remove clothing test 3`;
		} else {
			return `Remove clothing test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeTop(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You pull ${slave.slaveName}'s top off, baring ${his} chest and stomach.`;
		} else if (slave.devotion > 20) {
			return `Remove top test 2`;
		} else if (slave.devotion > -20) {
			return `Remove top test 3`;
		} else {
			return `Remove top test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeBottom(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You pull ${slave.slaveName}'s bottoms down, showing off ${his} legs.`;
		} else if (slave.devotion > 20) {
			return `Remove bottom test 2`;
		} else if (slave.devotion > -20) {
			return `Remove bottom test 3`;
		} else {
			return `Remove bottom test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeBra(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You wrap your arms behind ${slave.slaveName} and undo ${his} bra, revealing ${his} ${slave.boobs >= 300 ? `boobs` : `chest`} to the world.`;
		} else if (slave.devotion > 20) {
			return `Remove bra test 2`;
		} else if (slave.devotion > -20) {
			return `Remove bra test 3`;
		} else {
			return `Remove bra test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeUnderwear(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You kneel and pull down ${slave.slaveName}'s underwear, fully exposing ${his} naughty bits for you to enjoy.`;
		} else if (slave.devotion > 20) {
			return `Remove underwear test 2`;
		} else if (slave.devotion > -20) {
			return `Remove underwear test 3`;
		} else {
			return `Remove underwear test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	pullAsideUnderwear(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You're impatient, so you pull aside ${slave.slaveName}'s underwear to get a peek at ${his} naughty bits.`;
		} else if (slave.devotion > 20) {
			return `Pull aside underwear test 2`;
		} else if (slave.devotion > -20) {
			return `Pull aside underwear test 3`;
		} else {
			return `Pull aside underwear test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	addMouthAccessory(slave) {
		const {he, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `Though ${slave.slaveName} won't protest anything you do to them, it'll be fun to gag ${him} anyway. You procure your gag of choice, insert it in ${his} mouth, and clasp it around ${his} head. All ${he} can do is give you a submissive look of acceptance.`;
		} else if (slave.devotion > 20) {
			return `Add mouth accessory test 2`;
		} else if (slave.devotion > -20) {
			return `Add mouth accessory test 3`;
		} else {
			return `Add mouth accessory test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeMouthAccessory(slave) {
		const {he, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.slaveName} has had enough. You unclasp the gag and remove it from ${his} mouth, and ${he} moves ${his} jaw a bit with ${his} newfound freedom.`;
		} else if (slave.devotion > 20) {
			return `Remove mouth accessory test 2`;
		} else if (slave.devotion > -20) {
			return `Remove mouth accessory test 3`;
		} else {
			return `Remove mouth accessory test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeChastityVaginal(slave) {
		const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You unlock ${slave.slaveName}'s chastity belt. Unlike everyone else who might want to use ${his} pussy, you actually own ${him}. The thought of fucking a pussy that's reserved exclusively for you gets both of you very excited.`;
		} else if (slave.devotion > 20) {
			return `Remove chastity vaginal test 2`;
		} else if (slave.devotion > -20) {
			return `Remove chastity vaginal test 3`;
		} else {
			return `Remove chastity vaginal test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeChastityAnal(slave) {
		const {his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You smile as you unlock ${slave.slaveName}'s anal chastity belt. You're the only person allowed to use ${his} asshole, and removing ${his} anal chastity belt is the most direct exercise of that privilege. You relish it.`;
		} else if (slave.devotion > 20) {
			return `Remove chastity anal test 2`;
		} else if (slave.devotion > -20) {
			return `Remove chastity anal test 3`;
		} else {
			return `Remove chastity anal test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removeChastityPenis(slave) {
		const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.slaveName} is not allowed to fuck anyone else, and the chastity cage around ${his} cock makes absolutely sure of that. Right now, though, you want to have some fun with ${him}, so it goes.`;
		} else if (slave.devotion > 20) {
			return `Remove chastity penis test 2`;
		} else if (slave.devotion > -20) {
			return `Remove chastity penis test 3`;
		} else {
			return `Remove chastity penis test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removePlayerTop(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.slaveName} looks at you hungrily as you undo and pull off your top.`;
		} else if (slave.devotion > 20) {
			return `Remove player top test 2`;
		} else if (slave.devotion > -20) {
			return `Remove player top test 3`;
		} else {
			return `Remove player top test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removePlayerBottom(slave) {
		const {He, he} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You ask ${slave.slaveName} to help you take off your pants. ${He} eagerly complies, unzipping your fly and pulling down your bottoms to reveal your underwear${V.PC.dick !== 0 ? ` - and a very obvious bulge` : ``}. ${He} bites her lip as ${he} eyes your crotch with lust.`;
		} else if (slave.devotion > 20) {
			return `Remove player bottom test 2`;
		} else if (slave.devotion > -20) {
			return `Remove player bottom test 3`;
		} else {
			return `Remove player bottom test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removePlayerBra(slave) {
		const {He, him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You unhook your bra, revealing your boobs. ${slave.slaveName}'s eyes widen at the sight.`;
		} else if (slave.devotion > 20) {
			return `Remove player underwear test 2`;
		} else if (slave.devotion > -20) {
			return `Remove player underwear test 3`;
		} else {
			return `Remove player underwear test 4`;
		}
	},

	/** @param {FC.SlaveState} slave */
	removePlayerUnderwear(slave) {
		const {He, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `You pull off your underwear, fully exposing yourself to ${slave.slaveName}. ${He} gasps and bites ${his} lip at the sight of your ${V.PC.dick !== 0 ? `erect penis` : `wet pussy`}.`;
		} else if (slave.devotion > 20) {
			return `Remove player underwear test 2`;
		} else if (slave.devotion > -20) {
			return `Remove player underwear test 3`;
		} else {
			return `Remove player underwear test 4`;
		}
	},
};

App.UI.SlaveInteract.useSlave.reactionText = {
	/** @param {FC.SlaveState} slave */
	keepKissing(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Mmmmwah... Oh, ${getEnunciation(slave).title}..."`);
		} else if (slave.devotion > 20) {
			return `keepKissing reaction test 2`;
		} else if (slave.devotion > -20) {
			return `keepKissing reaction test 3`;
		} else {
			return `keepKissing reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	stopKissing(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"I love your lips, ${getEnunciation(slave).title}..."`);
		} else if (slave.devotion > 20) {
			return `stopKissing reaction test 2`;
		} else if (slave.devotion > -20) {
			return `stopKissing reaction test 3`;
		} else {
			return `stopKissing reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	keepFucking(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh! Oh! Ohhh! Please keep going, ${getEnunciation(slave).title}, please don't stop! Ahhh!"`);
		} else if (slave.devotion > 20) {
			return `keepFucking reaction test 2`;
		} else if (slave.devotion > -20) {
			return `keepFucking reaction test 3`;
		} else {
			return `keepFucking reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	holdDown(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"AHH! Oh my god! ${getEnunciation(slave).title}, you're being so rough! I-I don't know if I can take it! I - n--no, I'm not complaining. Y-yes, ${getEnunciation(slave).title}, I-I'll take it like-AH!... like the good little slave slut that I am. OHHH..."`);
		} else if (slave.devotion > 20) {
			return `holdDown reaction test 2`;
		} else if (slave.devotion > -20) {
			return `holdDown reaction test 3`;
		} else {
			return `holdDown reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	stopFucking(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"${getEnunciation(slave).title}, I feel so empty without you inside me..."`);
		} else if (slave.devotion > 20) {
			return `keepFucking reaction test 2`;
		} else if (slave.devotion > -20) {
			return `keepFucking reaction test 3`;
		} else {
			return `keepFucking reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	continueOral(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `*slurping and sucking sounds*`;
		} else if (slave.devotion > 20) {
			return `continueOral reaction test 2`;
		} else if (slave.devotion > -20) {
			return `continueOral reaction test 3`;
		} else {
			return `continueOral reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	holdHeadDown(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"MMPHH! Mmmm..."`);
		} else if (slave.devotion > 20) {
			return `holdHeadDown reaction test 2`;
		} else if (slave.devotion > -20) {
			return `holdHeadDown reaction test 3`;
		} else {
			return `holdHeadDown reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	stopOral(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"As you wish, ${getEnunciation(slave).title}. How may I please you now?"`);
		} else if (slave.devotion > 20) {
			return `continueOral reaction test 2`;
		} else if (slave.devotion > -20) {
			return `continueOral reaction test 3`;
		} else {
			return `continueOral reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	cumOnFace(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh, ${getEnunciation(slave).title}... that was so good. *giggles* My face is such a mess now!"`);
		} else if (slave.devotion > 20) {
			return `cumOnFace reaction test 2`;
		} else if (slave.devotion > -20) {
			return `cumOnFace reaction test 3`;
		} else {
			return `cumOnFace reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	cumInMouth(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `${V.PC.dick !== 0 ? `"Mmm... Ah! I swallowed it all like a good slave should, ${getEnunciation(slave).title}! *giggles*... You taste really good!"` : `"Ahh... your juices taste really good, ${getEnunciation(slave).title}! I hope you are pleased with my service..."`}`);
		} else if (slave.devotion > 20) {
			return `cumInMouth reaction test 2`;
		} else if (slave.devotion > -20) {
			return `cumInMouth reaction test 3`;
		} else {
			return `cumInMouth reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	cumInPussy(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohhh, ${getEnunciation(slave).title}... That felt wonderful. And you filled me up... ${slave.preg === 0 ? `You bred me... ` : ``}I can feel your warm seed inside me! Mmm... I love you so much."`);
		} else if (slave.devotion > 20) {
			return `cumInPussy reaction test 2`;
		} else if (slave.devotion > -20) {
			return `cumInPussy reaction test 3`;
		} else {
			return `cumInPussy reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	cumInAnus(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `*giggles* "${getEnunciation(slave).title}, you fucked my butt so good! So good that I'm not going to be able to walk right for a while..."`);
		} else if (slave.devotion > 20) {
			return `cumInAss reaction test 2`;
		} else if (slave.devotion > -20) {
			return `cumInAss reaction test 3`;
		} else {
			return `cumInAss reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	makeSlaveCum(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohh... thank you so much, ${getEnunciation(slave).title}. You're so kind to allow me to cum. Would you like to use your sex slave now? It's not right if I cum but ${getEnunciation(slave).title} doesn't..."`);
		} else if (slave.devotion > 20) {
			return `makeSlaveCum reaction test 2`;
		} else if (slave.devotion > -20) {
			return `makeSlaveCum reaction test 3`;
		} else {
			return `makeSlaveCum reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	regularKiss(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"That was nice, ${getEnunciation(slave).title}... May I kiss you again?"`);
		} else if (slave.devotion > 20) {
			return `regularKiss reaction test 2`;
		} else if (slave.devotion > -20) {
			return `regularKiss reaction test 3`;
		} else {
			return `regularKiss reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	passionateKiss(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh, ${getEnunciation(slave).title}! I can't get enough of you... I want to feel your tongue on mine again!"`);
		} else if (slave.devotion > 20) {
			return `passionateKiss reaction test 2`;
		} else if (slave.devotion > -20) {
			return `passionateKiss reaction test 3`;
		} else {
			return `passionateKiss reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	intimateKiss(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Hmmmm... I love you, ${getEnunciation(slave).title}... I love you so much."`);
		} else if (slave.devotion > 20) {
			return `intimateKiss reaction test 2`;
		} else if (slave.devotion > -20) {
			return `intimateKiss reaction test 3`;
		} else {
			return `intimateKiss reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	slaveGivesOral(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `*mouthy sounds* "Ahh... Does my mouth on your ${V.PC.dick !== 0 ? `cock` : `pussy`} please you, ${getEnunciation(slave).title}? I exist to serve you and make you happy... Ahhhmmm..."`);
		} else if (slave.devotion > 20) {
			return `slaveGivesOral reaction test 2`;
		} else if (slave.devotion > -20) {
			return `slaveGivesOral reaction test 3`;
		} else {
			return `slaveGivesOral reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	playerGivesOral(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohh!! Thank you so much, ${getEnunciation(slave).title}. You are so kind to me-Ah!"`);
		} else if (slave.devotion > 20) {
			return `playerGivesOral reaction test 2`;
		} else if (slave.devotion > -20) {
			return `playerGivesOral reaction test 3`;
		} else {
			return `playerGivesOral reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	grope(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `${slave.boobs >= 300 ? `*giggles* "You like them, ${getEnunciation(slave).title}? They're all yours! Mmmh..."` : `*giggles* "You like doing that, ${getEnunciation(slave).title}? My body is yours! Mmmh..."`}`);
		} else if (slave.devotion > 20) {
			return `grope reaction test 2`;
		} else if (slave.devotion > -20) {
			return `grope reaction test 3`;
		} else {
			return `grope reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	lick(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohh... ${getEnunciation(slave).title}, I really like it when you do that!"`);
		} else if (slave.devotion > 20) {
			return `lick reaction test 2`;
		} else if (slave.devotion > -20) {
			return `lick reaction test 3`;
		} else {
			return `lick reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	suck(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oooh, that feels good, ${getEnunciation(slave).title}! Please don't stop!"`);
		} else if (slave.devotion > 20) {
			return `suck reaction test 2`;
		} else if (slave.devotion > -20) {
			return `suck reaction test 3`;
		} else {
			return `suck reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	bite(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Aiiii!! That hurt, ${getEnunciation(slave).title}! You're mean!" *giggles*`);
		} else if (slave.devotion > 20) {
			return `bite reaction test 2`;
		} else if (slave.devotion > -20) {
			return `bite reaction test 3`;
		} else {
			return `bite reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	slaveSucksTits(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `${slave.slaveName} hums and moans in audible enjoyment.`;
		} else if (slave.devotion > 20) {
			return `bite reaction test 2`;
		} else if (slave.devotion > -20) {
			return `bite reaction test 3`;
		} else {
			return `bite reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	gropePussy(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ha-oohhh! That feels amazing, ${getEnunciation(slave).title}... Please, can you touch me there some more?"`);
		} else if (slave.devotion > 20) {
			return `gropePussy reaction test 2`;
		} else if (slave.devotion > -20) {
			return `gropePussy reaction test 3`;
		} else {
			return `gropePussy reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	gropeDick(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh yeah... it feels really good when you grab it like that, ${getEnunciation(slave).title}!"`);
		} else if (slave.devotion > 20) {
			return `gropeDick reaction test 2`;
		} else if (slave.devotion > -20) {
			return `gropeDick reaction test 3`;
		} else {
			return `gropeDick reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	gropeAss(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Hmm... ${getEnunciation(slave).title}, I think you like my ass! I can't wait for what you'll do to it later-AAH! Hey! You spanked me! Hmph... *giggles* Well, I guess if you say so, I deserve it!"`);
		} else if (slave.devotion > 20) {
			return `gropeAss reaction test 2`;
		} else if (slave.devotion > -20) {
			return `gropeAss reaction test 3`;
		} else {
			return `gropeAss reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	fingerPussy(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oohhhh, ${getEnunciation(slave).title}... your finger feels so gooood... please, ${getEnunciation(slave).title}, please don't stop, I'm getting close!"`);
		} else if (slave.devotion > 20) {
			return `fingerPussy reaction test 2`;
		} else if (slave.devotion > -20) {
			return `fingerPussy reaction test 3`;
		} else {
			return `fingerPussy reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	fingerAnus(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Haah! That feels strange, ${getEnunciation(slave).title}... your finger is up my butt!"`);
		} else if (slave.devotion > 20) {
			return `fingerAnus reaction test 2`;
		} else if (slave.devotion > -20) {
			return `fingerAnus reaction test 3`;
		} else {
			return `fingerAnus reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	takeVirginity(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohhhh, ${getEnunciation(slave).title}, you're inside me... I can feel you deep inside my pussy! Mmmh... you've claimed me, ${getEnunciation(slave).title}! You've claimed my pussy as yours! Ahhh! I belong to you! Please enjoy me!"`);
		} else if (slave.devotion > 20) {
			return `fuckPussy reaction test 2`;
		} else if (slave.devotion > -20) {
			return `fuckPussy reaction test 3`;
		} else {
			return `fuckPussy reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	fuckPussy(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohhh!! Oh, ${getEnunciation(slave).title}! Ahh! You're inside me! Ohh!!! Oh god, you're so good to me... I love you, ${getEnunciation(slave).title}, I love you so much! Please keep going... your ${V.PC.dick !== 0 ? `cock` : `strapon`} feels so good inside of me!! Ahhhh!!"`);
		} else if (slave.devotion > 20) {
			return `fuckPussy reaction test 2`;
		} else if (slave.devotion > -20) {
			return `fuckPussy reaction test 3`;
		} else {
			return `fuckPussy reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	takeAnalVirginity(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh my god! Aiii! ${getEnunciation(slave).title}, you're stretching out my tight little asshole! Mnhh... You feel so big! It belongs to you... Take my ass and use me, ${getEnunciation(slave).title}!"`);
		} else if (slave.devotion > 20) {
			return `fuckAnus reaction test 2`;
		} else if (slave.devotion > -20) {
			return `fuckAnus reaction test 3`;
		} else {
			return `fuckAnus reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	fuckAnus(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oohhh... Oh, fuck... your ${V.PC.dick !== 0 ? `dick` : `strapon`} is so big in my ass, ${getEnunciation(slave).title}... Ohh... Does my ass please you? It belongs to you. Ah! It exists to serve you, ${getEnunciation(slave).title}! Please use my ass to make you happy!"`);
		} else if (slave.devotion > 20) {
			return `fuckAnus reaction test 2`;
		} else if (slave.devotion > -20) {
			return `fuckAnus reaction test 3`;
		} else {
			return `fuckAnus reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	sixtyNine(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Mmmmmm... Does that feel good, ${getEnunciation(slave).title}? Do you like my mouth on your ${V.PC.dick !== 0 ? `cock` : `pussy`}? Ahh!! Oh!! *giggles* I'll take that as a yes-Aii! I'm sorry, ${getEnunciation(slave).title}, I'll continue..."`);
		} else if (slave.devotion > 20) {
			return `sixtyNine reaction test 2`;
		} else if (slave.devotion > -20) {
			return `sixtyNine reaction test 3`;
		} else {
			return `sixtyNine reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	dance(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Do you like the way I move, ${getEnunciation(slave).title}? Hmm... You know I'll do this for you whenever you want. I love showing my body off for you. Mmm... And I love the way you look at me..."`);
		} else if (slave.devotion > 20) {
			return `dance reaction test 2`;
		} else if (slave.devotion > -20) {
			return `dance reaction test 3`;
		} else {
			return `dance reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	striptease(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Do you enjoy watching me strip, ${getEnunciation(slave).title}? Hmm... I think this has to go too. Oh, you want me to take off even more? *giggles* I have a feeling ${getEnunciation(slave).title} won't be satisfied until I'm completely naked!"`);
		} else if (slave.devotion > 20) {
			return `striptease reaction test 2`;
		} else if (slave.devotion > -20) {
			return `striptease reaction test 3`;
		} else {
			return `striptease reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	pushDown(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Yes, ${getEnunciation(slave).title}... I belong on my knees. I belong beneath you because I am beneath you. I'm ${getEnunciation(slave).title}'s sex slave, and this is my place. How may I serve you?"`);
		} else if (slave.devotion > 20) {
			return `pushDown reaction test 2`;
		} else if (slave.devotion > -20) {
			return `pushDown reaction test 3`;
		} else {
			return `pushDown reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	pullUp(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Of course, ${getEnunciation(slave).title}. How may your slave please you now?"`);
		} else if (slave.devotion > 20) {
			return `pullUp reaction test 2`;
		} else if (slave.devotion > -20) {
			return `pullUp reaction test 3`;
		} else {
			return `pullUp reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	standUp(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh, what would you like to do now, ${getEnunciation(slave).title}?"`);
		} else if (slave.devotion > 20) {
			return `standUp reaction test 2`;
		} else if (slave.devotion > -20) {
			return `standUp reaction test 3`;
		} else {
			return `standUp reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	pullClose(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh yes... hold me close, ${getEnunciation(slave).title}. I love feeling this close to you."`);
		} else if (slave.devotion > 20) {
			return `pullClose reaction test 2`;
		} else if (slave.devotion > -20) {
			return `pullClose reaction test 3`;
		} else {
			return `pullClose reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	pushAway(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"No... I miss you, ${getEnunciation(slave).title}. I want to feel you close to me."`);
		} else if (slave.devotion > 20) {
			return `pushAway reaction test 2`;
		} else if (slave.devotion > -20) {
			return `pushAway reaction test 3`;
		} else {
			return `pushAway reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	putOnLap(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `*giggles* "Hi there, ${getEnunciation(slave).title}! ${V.PC.dick !== 0 ? `Mmm... I can feel your erection on my butt...` : `Mmm... I bet you're really wet under my butt...`} Do you like it when I grind my ass against you, ${getEnunciation(slave).title}?"`);
		} else if (slave.devotion > 20) {
			return `putOnLap reaction test 2`;
		} else if (slave.devotion > -20) {
			return `putOnLap reaction test 3`;
		} else {
			return `putOnLap reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	getOffLap(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Of course, ${getEnunciation(slave).title}! What do you want to do with me next?"`);
		} else if (slave.devotion > 20) {
			return `getOffLap reaction test 2`;
		} else if (slave.devotion > -20) {
			return `getOffLap reaction test 3`;
		} else {
			return `getOffLap reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	goToBed(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Yes, ${getEnunciation(slave).title}... this is exactly where I belong. In your bed, ready and eager... How may I pleasure you tonight, ${getEnunciation(slave).title}?"`);
		} else if (slave.devotion > 20) {
			return `goToBed reaction test 2`;
		} else if (slave.devotion > -20) {
			return `goToBed reaction test 3`;
		} else {
			return `goToBed reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	getOutOfBed(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Aww, but I was so comfy! Ahh! ${getEnunciation(slave).title}! I wasn't being bratty! Okay... maybe a little..."`);
		} else if (slave.devotion > 20) {
			return `getOutOfBed reaction test 2`;
		} else if (slave.devotion > -20) {
			return `getOutOfBed reaction test 3`;
		} else {
			return `getOutOfBed reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	bringInSlave(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `bringInSlave reaction test 1`;
		} else if (slave.devotion > 20) {
			return `bringInSlave reaction test 2`;
		} else if (slave.devotion > -20) {
			return `bringInSlave reaction test 3`;
		} else {
			return `bringInSlave reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	bringInCanine(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `bringInCanine reaction test 1`;
		} else if (slave.devotion > 20) {
			return `bringInCanine reaction test 2`;
		} else if (slave.devotion > -20) {
			return `bringInCanine reaction test 3`;
		} else {
			return `bringInCanine reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	bringInHooved(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `bringInHooved reaction test 1`;
		} else if (slave.devotion > 20) {
			return `bringInHooved reaction test 2`;
		} else if (slave.devotion > -20) {
			return `bringInHooved reaction test 3`;
		} else {
			return `bringInHooved reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	bringInFeline(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return `bringInFeline reaction test 1`;
		} else if (slave.devotion > 20) {
			return `bringInFeline reaction test 2`;
		} else if (slave.devotion > -20) {
			return `bringInFeline reaction test 3`;
		} else {
			return `bringInFeline reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	pullUpDress(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Aii! Hey! ${getEnunciation(slave).title}! You surprised me! *giggles* ... Do you like what you see?"`);
		} else if (slave.devotion > 20) {
			return `pullUpDress reaction test 2`;
		} else if (slave.devotion > -20) {
			return `pullUpDress reaction test 3`;
		} else {
			return `pullUpDress reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeClothing(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ooh, yes, ${getEnunciation(slave).title}! I love it when you undress me... I love being naked for you..."`);
		} else if (slave.devotion > 20) {
			return `removeClothing reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeClothing reaction test 3`;
		} else {
			return `removeClothing reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeTop(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `*giggles* "Do you like what you see?"`);
		} else if (slave.devotion > 20) {
			return `removeTop reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeTop reaction test 3`;
		} else {
			return `removeTop reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeBottom(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Hehe..."`);
		} else if (slave.devotion > 20) {
			return `removeBottom reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeBottom reaction test 3`;
		} else {
			return `removeBottom reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeBra(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Tadaaa! *giggles* Do you like them, ${getEnunciation(slave).title}?"`);
		} else if (slave.devotion > 20) {
			return `removeBra reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeBra reaction test 3`;
		} else {
			return `removeBra reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeUnderwear(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ooh... I can feel the cool air down there, ${getEnunciation(slave).title}. But... I'd rather feel something else..."`);
		} else if (slave.devotion > 20) {
			return `removeUnderwear reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeUnderwear reaction test 3`;
		} else {
			return `removeUnderwear reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	pullAsideUnderwear(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh, ${getEnunciation(slave).title}! You just couldn't wait one bit, could you? Mmh... I'll take that as a compliment..."`);
		} else if (slave.devotion > 20) {
			return `pullAsideUnderwear reaction test 2`;
		} else if (slave.devotion > -20) {
			return `pullAsideUnderwear reaction test 3`;
		} else {
			return `pullAsideUnderwear reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	addMouthAccessory(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Tmph mfh grffh, kffph?"`);
		} else if (slave.devotion > 20) {
			return `addMouthAccessory reaction test 2`;
		} else if (slave.devotion > -20) {
			return `addMouthAccessory reaction test 3`;
		} else {
			return `addMouthAccessory reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeMouthAccessory(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ahh... Yah... Oh. Thank you, ${getEnunciation(slave).title}"! Now you can put something else in my mouth... *giggles*"`);
		} else if (slave.devotion > 20) {
			return `removeMouthAccessory reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeMouthAccessory reaction test 3`;
		} else {
			return `removeMouthAccessory reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeChastityVaginal(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohh! Oh, thank you, thank you, ${getEnunciation(slave).title}! This pussy belongs to you, and only you... Are you going to use me now? I promise I'll be a good girl... I want to please you..."`);
		} else if (slave.devotion > 20) {
			return `removeChastityVaginal reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeChastityVaginal reaction test 3`;
		} else {
			return `removeChastityVaginal reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeChastityAnal(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohh my goodness, ${getEnunciation(slave).title}... Yes! My ass is ready for you. It belongs to you, and you can do whatever you want to it... spank it... mmh... fuck it..."`);
		} else if (slave.devotion > 20) {
			return `removeChastityAnal reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeChastityAnal reaction test 3`;
		} else {
			return `removeChastityAnal reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removeChastityPenis(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Oh, thank you, ${getEnunciation(slave).title}! Would you like to use my cock tonight? It belongs to you, and only you..."`);
		} else if (slave.devotion > 20) {
			return `removeChastityPenis reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removeChastityPenis reaction test 3`;
		} else {
			return `removeChastityPenis reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removePlayerTop(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"Ohh, ${getEnunciation(slave).title}... you look so good..."`);
		} else if (slave.devotion > 20) {
			return `removePlayerTop reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removePlayerTop reaction test 3`;
		} else {
			return `removePlayerTop reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removePlayerBottom(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"${getEnunciation(slave).title}... ${V.PC.dick !== 0 ? `I can... see your erection... mmmh... through your underwear...` : ``}"`);
		} else if (slave.devotion > 20) {
			return `removePlayerBottom reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removePlayerBottom reaction test 3`;
		} else {
			return `removePlayerBottom reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removePlayerBra(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `"${getEnunciation(slave).title}... Your breasts look... so supple..."`);
		} else if (slave.devotion > 20) {
			return `removePlayerUnderwear reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removePlayerUnderwear reaction test 3`;
		} else {
			return `removePlayerUnderwear reaction test 4`;
		}
	},
	/** @param {FC.SlaveState} slave */
	removePlayerUnderwear(slave) {
		// const {him, his} = getPronouns(slave);

		if (slave.devotion > 50) {
			return Spoken(slave, `*gasps* "Ohh... ${getEnunciation(slave).title}, your ${V.PC.dick !== 0 ? `dick` : `pussy`} looks so... nice..."`);
		} else if (slave.devotion > 20) {
			return `removePlayerUnderwear reaction test 2`;
		} else if (slave.devotion > -20) {
			return `removePlayerUnderwear reaction test 3`;
		} else {
			return `removePlayerUnderwear reaction test 4`;
		}
	},
};
