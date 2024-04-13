App.Events.RELegendaryFormerAbolitionist = class RELegendaryFormerAbolitionist extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [[
			(s) => s.fetish !== Fetish.MINDBROKEN,
			hasAnyArms,
			canWalk,
			canTalk,
			(s) => s.devotion > 95,
			(s) => s.trust > 50,
			(s) => s.prestige === 0,
			(s) =>
				[
					"You sentenced $him to enslavement as a punishment for attempted theft of a slave.",
					"$He is an enslaved Daughter of Liberty.",
					"You got $him at the Slave Shelter. $He is an enslaved Daughter of Liberty, caught some weeks after the failed coup. $His previous owner used $him as a punching bag and dart board, then when he was bored of $him tattooed obscenities all over $his body and threw $him away.",
					"$He is an enslaved member of an anti-slavery extremist group.",
				].includes(s.origin) ||
				s.career === "an antislavery activist",
			(s) => s.newGamePlus === 0,
			(s) => [Job.MASTERSUITE, Job.CONCUBINE, Job.FUCKTOY].includes(s.assignment)
		]];
	}

	execute(node) {
		const slave = getSlave(this.actors[0]);

		const {
			He, His,
			he, his, him
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [
			`Crime is extremely rare in ${V.arcologies[0].name}, and some would say justice rarer still, but if there's one thing that unites the citizens of ${V.arcologies[0].name}, it's a mutual outrage towards attempted abolitionists. Slaveownership is the cornerstone of the society that protects and enriches them, and they see those who would attempt to unlawfully free slaves not just as thieves of property but as anarchists trying to bring down everything they have worked to build. While a brutal flogging or surgical mutilation soothes their outrage, nothing warms the collective heart of ${V.arcologies[0].name}'s mob like the sight of a former abolitionist well and truly broken.`,
			App.UI.DOM.slaveDescriptionDialog(slave),
			`is one such shining example, and ${his} borderline worship of you is doing wonders for your reputation lately as ${he} becomes a local celebrity and a popular topic of discussion. This is a rare opportunity. While the mob is quick to pat itself on the back for withstanding attacks from abolitionists, before long they will tire of remembering those dangers and turn their attention elsewhere. It might be possible, with a serious investment of funds in publicity, to really fix ${him} in the public mind as a shining example of your slave-breaking prowess.`
		]);

		const smallCash = 5000;
		const mediumCash = 10000;
		const largeCash = 25000;
		const choices = [];
		choices.push(new App.Events.Result(`Just capitalize on ${his} popularity to increase your reputation`, yourRep));
		choices.push(new App.Events.Result(`Just capitalize on ${his} popularity by renting out ${his} mouth`, rentMouth));
		if (V.cash >= smallCash) {
			choices.push(new App.Events.Result(`Invest ${cashFormat(smallCash)} in making ${him} locally famous`, locallyFamous));
		} else {
			choices.push(new App.Events.Result(null, null, `You do not have enough cash to make ${him} locally famous`));
		}

		if (V.cash >= mediumCash) {
			choices.push(new App.Events.Result(`Lavish ${cashFormat(mediumCash)} on making ${him} locally famous`, locallyFamousLavish));
		} else {
			choices.push(new App.Events.Result(null, null, `You do not have enough cash to lavish on making ${him} locally famous`));
		}

		if (V.cash >= largeCash) {
			choices.push(new App.Events.Result(`Spend ${cashFormat(largeCash)} on an attempt to make ${him} world famous`, worldFamous));
		} else {
			choices.push(new App.Events.Result(null, null, `You do not have enough cash to make ${him} world famous`));
		}

		App.Events.addResponses(node, choices);

		function yourRep() {
			repX(1000, "event", slave);
			return `You spend the week parading ${slave.slaveName} around in public, letting everyone get a good look at ${his} fawning adoration of you. A variety of public sex acts really nails the point home in the psyche of your citizens and <span class="cash inc">increases your reputation,</span> and after a few days you start to receive a sincere golf clap from onlookers every time you cum in or on ${slave.slaveName}.`;
		}

		function rentMouth() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You fasten ${slave.slaveName} in a kneeling position in the center of your club, secured by shackles around ${his}`);
			if (hasAnyArms(slave)) {
				r.push(hasBothArms(slave) ? "wrists" : "wrist");
				if (hasAnyLegs(slave)) {
					r.push(`and`);
				}
			}
			if (hasAnyLegs(slave)) {
				r.push(hasBothLegs(slave) ? "ankles" : "ankle");
			}
			r.push(`— purely decorative, since ${he}'s so devoted ${he}'d perform ${his} role in this if you just hinted it would please you if ${he} did. In front of ${him}, you place a sign: "Fuck the mouth that preached abolitionism, ${cashFormat(5)}." In a few moments, the morning crowd will begin to arrive, and you have no doubt that ${slave.slaveName} will be very, very popular. And ${he} is. Even with an extra dose of curatives and a check-up every night, the strain of a week of dicks and a diet of cum <span class="health dec">has taken a toll on ${his} health.</span> But even after you pay to have the area that ${slave.slaveName} worked thoroughly cleaned, you have made <span class="cash inc">a tidy profit.</span>`);
			healthDamage(slave, 10);
			seX(slave, "oral", "public", "penetrative", random(410, 440));
			cashX(2000, "event", slave);

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function locallyFamous() {
			const frag = new DocumentFragment();
			let r = [];
			if (random(1, 100) > 50) {
				r.push(`You buy media coverage of ${him}, invest in an ad campaign, and even arrange for ${him} to give a speech denouncing the abolitionist movement and praising your efforts in fighting against them. Your efforts are a success. ${His} current extreme popularity will fade in time, but you have managed to arrange for ${him} a permanent place as an <span class="reputation inc">example of your slave-breaking skills.</span>`);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is notorious as a former abolitionist turned devoted slave.";
			} else {
				r.push(`You buy media coverage of ${him}, invest in an ad campaign, and even arrange for ${him} to give a speech denouncing the abolitionist movement and praising your efforts in fighting against them. Unfortunately, popularity remains an art, not a science; though you do your best, the public mind's fancy eludes your grasp. As ${his} owner, your reputation has <span class="reputation inc">increased,</span> but in a week ${he}'ll be forgotten.`);
			}
			cashX(-smallCash, "event", slave);
			repX(1000, "event", slave);

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function locallyFamousLavish() {
			const frag = new DocumentFragment();
			let r = [];
			if (random(1, 100) > 10) {
				r.push(`You buy prime media coverage of ${him}, invest in a lavish ad campaign, and even arrange for ${him} to give a speech denouncing the abolitionist movement and praising your efforts in fighting against them that is broadcast around the world. Your efforts are a success. ${His} current extreme popularity will fade in time, but you have managed to arrange for ${him} a permanent place as an <span class="reputation inc">example of your slave-breaking skills.</span>`);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is notorious as a former abolitionist turned devoted slave.";
			} else {
				r.push(`You buy prime media coverage of ${him}, invest in a lavish ad campaign, and even arrange for ${him} to give a speech denouncing the abolitionist movement and praising your efforts in fighting against them that is broadcast around the world. Unfortunately, popularity remains an art, not a science; though you do your best, the public mind's fancy eludes your grasp. As ${his} owner, your reputation has <span class="reputation inc">increased,</span> but in a week ${he}'ll be forgotten.`);
			}
			cashX(-mediumCash, "event", slave);
			repX(2000, "event", slave);

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function worldFamous() {
			const frag = new DocumentFragment();
			let r = [];
			if (random(1, 100) > 50) {
				r.push(`The world is in love with ${slave.slaveName}. ${His} face graces magazine covers the world over and ${his} passionate arguments (ghostwritten by the best spin doctors money can buy) spark debate everywhere they're heard. ${He} is mentioned by name in strident denunciations about the immorality of the present day from religious leaders. ${He} appears on the internet with all sorts of attempts at humor superimposed on ${his} image. ${His} loving and overblown descriptions of you spark a new trend in protagonists of badly-written romance novels. When a very popular talk show host attempts to call ${his} bluff and receives oral sex in front of a live studio audience, <span class="reputation inc">you know for sure that ${his} fame has stuck.</span>`);
				repX(3000, "event", slave);
				slave.prestige = 2;
				slave.prestigeDesc = "$He is world famous as an anti-abolitionist, and has told the world at length of the joys of slavery in general and slavery to you in particular.";
			} else {
				r.push(`The world seems temporarily enamored with ${slave.slaveName} as ${he} appears on talk shows and in political debates with millions of watchers, but before long ${his} fifteen minutes of fame peter out and the only offers coming in are from pornography magnates and local talk radio shows. Though ${he} achieved <span class="reputation inc">local fame</span> for appearing on the world stage, the rest of the world seems to have gotten bored with ${slave.slaveName}.`);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is notorious as a former abolitionist turned devoted slave.";
				repX(2000, "event", slave);
			}
			cashX(-largeCash, "event", slave);

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};

