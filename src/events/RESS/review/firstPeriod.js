App.Events.RESSFirstPeriod = class RESSFirstPeriod extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeAge === 1,
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				(s) => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				(s) => s.actualAge < 18,
				(s) => s.devotion > 20,
				(s) => s.ovaries === 1,
				(s) => s.pubertyXX === 0,
				(s) => s.preg === 0,
				(s) => s.physicalAge + s.birthWeek / 52 >= s.pubertyAgeXX - 0.5,
			]
		];
	}

	get weight() {
		return 10;
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him, himself, girl} = getPronouns(slave);
		let r = [];
		const {title: Master, say} = getEnunciation(slave);

		App.Events.drawEventArt(node, slave);

		r.push(
			App.UI.DOM.slaveDescriptionDialog(slave),
			`appears in the door of your office, uncertain if ${he} should disturb you. ${He} stumbles through the doorway, hands on ${his}`
		);
		if (slave.weight >= 95) {
			r.push(`fat belly,`);
		} else if (slave.belly >= 2000) {
			r.push(`bloated belly,`);
		} else if (slave.weight >= 30) {
			r.push(`chubby belly,`);
		} else {
			r.push(`flat belly,`);
		}
		r.push(`before stepping forward to stand in front of your desk. ${His} chest is rising and falling with panicked hyperventilation. The poor ${girl} is terrified for some reason.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`You press ${him} on why ${he} is acting this way.`);
		if (canTalk(slave)) {
			r.push(
				Spoken(slave, `"My belly, ${Master},"`),
				`${he} ${say}s apologetically.`,
				Spoken(slave, `"It hurts and I don't know why. It just started recently."`)
			);
		} else {
			r.push(`${He} uses gestures to point to ${his} stomach, and explains that ${he} is feeling an unusual pain.`);
		}
		r.push(`You check ${his} records and discover ${he} has very likely just become a woman.`);
		slave.pubertyXX = 1;
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Explain ${he}'s just becoming a woman`, justWoman));
		if (V.PC.dick !== 0 && slave.eggType === "human") {
			choices.push(new App.Events.Result(`Demonstrate what this means`, demonstrate, (slave.vagina === 0) ? `This option will take ${his} virginity` : null));
		}
		choices.push(new App.Events.Result(`Tell ${him} ${he}'ll just be taking it up the ass more`, ass, (slave.anus === 0) ? `This option will take ${his} anal virginity` : null));

		App.Events.addResponses(node, choices);


		function justWoman() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You tell ${him} that ${he} is just undergoing ${his} first period, and that the pain ${he} is feeling is perfectly natural.`);
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"I-I'm a woman now? ${capFirstChar(Master)}, that m-means, I can get pregnant now."`),
					`${He} trails off.`
				);
			} else {
				r.push(`${He} brings ${his} hands back to ${his} stomach, an elated look on ${his} face. ${He} makes a gesture resembling a rounded belly.`);
			}
			r.push(`Whether or not ${he} gets pregnant is for you to decide, but for now you tell ${him} what ${he} should expect to change, both in and to ${his} body. ${slave.slaveName} <span class="trust inc">appreciates</span> you taking the time to explain ${his} developing body.`);
			slave.trust += 5;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function demonstrate() {
			const frag = new DocumentFragment();
			let r = [];
			let restoreChastity = false;
			if (slave.chastityVagina === 1) {
				r.push(`You unlock ${his} chastity belt and set it aside, ${his} ${canSee(slave) ? `eyes widening as ${he} watches` : `body stiffening as ${he} feels`} your movements.`);
				slave.chastityVagina = 0;
				restoreChastity = true;
			}
			r.push(`You tell ${him} that ${he} is just becoming a woman, and to celebrate, you are going to put a child in ${him}.`);
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"But I'm still a child myself, ${Master}, I can't get pregnant yet!"`));
				r.push(`You tell ${him} that prior to this week, that would have been true. However, now that ${he} has become fertile, it's time that ${he} learned what ${his} body was made for.`);
			} else {
				r.push(`${He} gasps and rubs a hand across ${his} stomach.`);
				r.push(`You tell ${him} that ${he} has become fertile, and it's now time that ${he} learned what ${his} body was made for.`);
			}
			r.push(`You guide ${him} to the couch and tell ${him} to lie on ${his} back so that you may take ${him}. ${He} breaks down when ${he} feels your cock enter ${his}`);
			if (slave.vagina === 0) {
				r.push(`delightfully tight, virgin`);
			} else if (slave.vagina === 1) {
				r.push(`deliciously tight`);
			} else if (slave.vagina === 2) {
				r.push(`well experienced`);
			} else {
				r.push(`fucked-out`);
			}
			r.push(`cunt. ${His} new urges cause ${him} to reach up to hug ${himself} close to you,`);
			if (slave.boobs < 600) {
				r.push(`${his} modest breasts let ${him} snuggle close to you, face-to-face, as you take ${him}.`);
			} else if (slave.boobs < 10000) {
				r.push(`${his} big tits form a soft cushion between you as you take ${him}.`);
			} else {
				r.push(`${his} massive tits stop ${him} from bringing ${himself} too close to you as you take ${him}.`);
			}
			r.push(`${He} enjoys ${himself} immensely, but ${he} loses it again when ${he} feels your seed in ${him}, realizing that ${he} will find ${himself} swelling with your child over the coming months. ${He} has become <span class="devotion inc">more submissive</span> to your will now that ${his} very first egg has been <span class="pregnant">fertilized by ${his} ${getWrittenTitle(slave)}.</span>`);
			slave.devotion += 5;
			slave.preg = 1;
			slave.pregWeek = 1;
			slave.pregKnown = 1;
			slave.pregSource = -1;
			slave.pregType = setPregType(slave);
			WombImpregnate(slave, slave.pregType, -1, 1);
			r.push(VCheck.Vaginal(slave, 1));

			if (restoreChastity) {
				r.push(`The deed done, you return ${his} chastity belt to its accustomed place before allowing ${him} to leave your office.`);
				slave.chastityVagina = 1;
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function ass() {
			const frag = new DocumentFragment();
			let r = [];
			if (slave.chastityAnus === 1 && slave.chastityVagina === 1) { // double chastity, remove anal
				r.push(`In one swift motion, you unlock and detach ${his} anal chastity belt. ${He} gasps at the sudden feeling of freedom at ${his} back door.`);
			} else if (slave.chastityAnus === 1) { // anal chastity, swap for vaginal
				r.push(`In a few swift motions, you remove ${his} anal chastity belt and replace it with one encasing ${his} vagina. ${He} gasps as ${he} feels it hug close to ${his} pussy.`);
			} else if (slave.chastityVagina === 1) { // vaginal chastity, don't remove
				r.push(`You bring your hand to ${his} chastity belt, feigning dramatically that you might remove it, before 'reconsidering' and pulling your hand away.`);
			} else { // no chastity, give vaginal
				r.push(`In one swift motion, you pull out a chastity belt and lock it onto ${him}. ${He} gasps as ${he} feels it hug close to ${his} pussy.`);
			}
			r.push(`You explain that ${he} has just become a woman, and thus, will be taking it up the ass until you decide it's time for ${him} to become pregnant.`);
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"You don't want me to get pregnant, ${Master}?"`));
			} else {
				r.push(`${He} rubs a hand across ${his} stomach.`);
			}
			r.push(`You bring ${him} over to the couch, set ${him} on your lap, and teasingly call ${him} a buttslut. Every so often you graze a finger around ${his} chastity belt, noting how much ${his} body wants you in ${him}, but you only make it the center of attention once the poor over-aroused slave`);
			if (canTalk(slave)) {
				r.push(
					`${say}s,`,
					Spoken(slave, `"I can't take it any more, ${Master}! Please fuck me pregnant!"`)
				);
			} else {
				r.push(`begins to use piteous gestures to beg you abjectly to penetrate ${him}.`);
			}
			r.push(`You snicker, but remind ${him} that no matter how much ${he} wants to be knocked up, ${his} belt will direct all the dicks ${he} takes into ${his} rear. You line up and insert your`);
			if (V.PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`cock`);
			}
			r.push(`with ${his} ass and begin fucking ${him}, all the while reminding ${him} that ${he} will not be getting pregnant. When ${he} finally orgasms,`);
			if (V.PC.dick === 0) {
				r.push(`${his} unabashed enjoyment`);
			} else {
				r.push(`the strength of ${his} spasming sphincter`);
			}
			r.push(`sends you over as well. ${He}'s left in a confused haze; ${his} body tells ${him} to get pregnant, but you tell ${him} to take it anally. ${He} <span class="devotion inc">sides with your decision</span> and vows to be an anal whore for you.`);
			if (slave.fetish === Fetish.NONE) { // TODO: text and the original "coral" color suggests fetish loss here, perhaps pregnancy.
				r.push(`<span class="fetish loss">Overcoming ${his} urges to become a mother via anal causes ${him} to become a buttslut.</span>`);
				slave.fetish = "buttslut";
				slave.fetishStrength = 10;
			}
			slave.devotion += 5;
			slave.chastityVagina = 1;
			slave.chastityAnus = 0;
			r.push(VCheck.Anal(slave, 1));

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
