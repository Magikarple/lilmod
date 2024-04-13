/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fRival = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He,
		he, his, him, himself
	} = getPronouns(slave);

	const rival = getSlave(slave.rivalryTarget);
	const {
		He2,
		he2, his2, him2
	} = getPronouns(rival).appendSuffix("2");

	r.push(`You call ${slave.slaveName} to your office and let ${him} know you'll be abusing ${rival.slaveName} together.`);
	if (slave.fetish === "sadist" && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} looks overjoyed at the prospect of getting to hurt someone.`);
	}

	r.push(rival.slaveName);
	if (canSee(rival)) {
		r.push(`sees`);
	} else {
		r.push(`senses`);
	}

	r.push(`${slave.slaveName} as ${he2} enters and looks worried.`);

	if (rival.anus === 0 && rival.vagina < 0) {
		r.push(`Since ${he2}'s a sissy bitch and an anal virgin, you tell ${him2} to bend over and`);
		if (V.PC.dick === 0) {
			r.push(`give you head.`);
		} else {
			r.push(`suck your dick.`);
		}
		r.push(`${He2} does, and once ${he2}'s working away, you tell ${slave.slaveName} to come over and start spanking. ${rival.slaveName} begins to lift ${his2} head as though to protest, so you shove ${him2} back down onto your`);
		if (V.PC.dick === 0) {
			r.push(`pussy,`);
		} else {
			r.push(`cock,`);
		}
		r.push(`gagging and struggling. ${slave.slaveName} administers a series of cruel slaps to the quivering`);
		if (V.seeRace === 1) {
			r.push(`${rival.race}`);
		}
		r.push(`buttocks in front of ${him}, making your victim yell delightfully into your`);
		if (V.PC.dick === 0) {
			r.push(`womanhood.`);
		} else {
			r.push(`member.`);
		}
		r.push(`After a short time ${slave.slaveName} decides to be even crueler, and begins to 'miss' frequently, hitting ${rival.slaveName}'s limp dick instead of ${his2} ass.`);

		seX(slave, "oral", rival, "oral");
	} else if (rival.anus === 0 && rival.vagina === 0 && hasAnyArms(slave)) {
		r.push(`Since ${he2}'s a virgin, you tell ${him2} to bend over and`);
		if (V.PC.dick === 0) {
			r.push(`give you head.`);
		} else {
			r.push(`suck your dick.`);
		}
		r.push(`${He2} does, and once ${he2}'s working away, you tell ${slave.slaveName} to come over and start spanking. ${rival.slaveName} begins to lift ${his2} head as though to protest, so you shove ${him2} back down onto your`);
		if (V.PC.dick === 0) {
			r.push(`pussy,`);
		} else {
			r.push(`cock,`);
		}
		r.push(`gagging and struggling. ${slave.slaveName} administers a series of cruel slaps to the quivering`);
		if (V.seeRace === 1) {
			r.push(`${rival.race}`);
		}
		r.push(`buttocks in front of ${him}, making your victim yell delightfully into your`);
		if (V.PC.dick === 0) {
			r.push(`womanhood.`);
		} else {
			r.push(`member.`);
		}
		r.push(`After a short time ${slave.slaveName} decides to be even crueler, and begins to 'miss' frequently, hitting ${rival.slaveName}'s poor pussy instead of ${his2} ass.`);

		seX(slave, "oral", rival, "oral");
	} else if (rival.anus === 0 && rival.vagina > 0 && canPenetrate(slave) && hasAnyArms(slave)) {
		r.push(`You tell ${him2} to bend over and`);
		if (V.PC.dick === 0) {
			r.push(`give you head.`);
		} else {
			r.push(`suck your dick.`);
		}

		r.push(`${He2} does, and once ${he2}'s working away, you tell ${slave.slaveName} to use the bitch. ${rival.slaveName} begins to lift ${his2} head as though to protest, so you shove ${him2} back down onto your`);
		if (V.PC.dick === 0) {
			r.push(`pussy,`);
		} else {
			r.push(`cock,`);
		}
		r.push(`gagging and struggling. ${slave.slaveName} lands a slap on the`);
		if (V.seeRace === 1) {
			r.push(`rival.race`);
		}
		r.push(`butt in front of ${him} as ${he} lines ${his} turgid dick up with ${rival.slaveName}'s pussy. ${He} sinks in with a sigh and begins to enjoy ${himself}, using slaps and pinches to ensure that of the two slaves, the fun is entirely on ${his} side.`);
		seX(V.PC, "penetrative", rival, "vaginal");
		seX(slave, "penetrative", rival, "oral");
	} else if (rival.anus === 0 && rival.vagina > 0 && slave.dick > 0) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it,`);
		} else {
			r.push(`tell ${him2} to ride your dick,`);
		}
		r.push(`facing away from you. ${He2} does, not without trepidation, which increases when you hold ${him2} securely in place. Once ${he2}'s humping away, you tell ${slave.slaveName} to use ${his2} face. ${slave.slaveName} comes over slowly, unsure what to do with the offer since ${his} dick is so useless. ${He} forces ${rival.slaveName}'s face against ${his} useless member anyway. After a bit of this, ${slave.slaveName}, clearly unsatisfied, turns around and rides ${rival.slaveName} with ${his} ass instead. ${rival.slaveName} tries to avoid orally servicing ${his2} rival's asshole, but you hold ${him2} in place and ${slave.slaveName} sighs in contentment.`);
		seX(slave, "anal", rival, "oral");
		seX(V.PC, "penetrative", rival, "vaginal");
	} else if (rival.anus === 0 && rival.vagina > 0) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it,`);
		} else {
			r.push(`tell ${him2} to ride your dick,`);
		}
		r.push(`facing away from you. ${He} does, not without trepidation, which increases when you hold ${him} securely in place. Once ${he2}'s humping away, you tell ${slave.slaveName} to ride ${his2} face. ${slave.slaveName} comes over, gently rubbing ${his} pussy. ${He} forces ${rival.slaveName}'s face against ${his} slick cunt, ignoring ${his2} reluctance. ${rival.slaveName} eventually realizes that ${he2}'s better off getting it over with, and applies ${his2} tongue as best ${he2} can.`);
		seX(V.PC, "penetrative", rival, "vaginal");
		seX(slave, "penetrative", rival, "oral");
	} else if (rival.anus > 0 && rival.vagina < 0 && canPenetrate(slave)) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it,`);
		} else {
			r.push(`tell ${him2} to ride your dick,`);
		}
		r.push(`facing you. ${He2} lowers ${his2} butthole down onto your cock, not without trepidation, which increases when you reach behind ${him2} and spread ${his2} buttocks as wide as they'll go. With ${him2} pinned, you tell ${slave.slaveName} to come over and join you. ${slave.slaveName} comes over, stroking ${himself} hard, not certain what you mean. To make it clear, you hook a single finger up into poor ${rival.slaveName}'s rectum alongside`);

		if (V.PC.dick === 0) {
			r.push(`the fake phallus.`);
		} else {
			r.push(`your dick.`);
		}
		r.push(`It takes ${slave.slaveName} a while to jam ${his} cock up the struggling and sobbing ${rival.slaveName}'s anus. Of the three phalli present, ${rival.slaveName}'s is the only one that's soft as ${he2} cries ${his2} way through a brutal double anal rape.`);
		seX(V.PC, "penetrative", rival, "anal");
		seX(slave, "penetrative", rival, "anal");
	} else if (rival.anus > 0 && rival.vagina === 0 && canPenetrate(slave)) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it`);
		} else {
			r.push(`tell ${him2} to ride your dick`);
		}
		r.push(`anally, facing you. ${He2} lowers ${his2} butthole down onto your cock, not without trepidation, which increases when you reach behind ${him2} and spread ${his2} buttocks as wide as they'll go. With ${him2} pinned, you tell ${slave.slaveName} to come over and join you. ${slave.slaveName} comes over, stroking ${himself} hard, not certain what you mean. To make it clear, you hook a single finger up into poor ${rival.slaveName}'s rectum alongside`);

		if (V.PC.dick === 0) {
			r.push(`the fake phallus.`);
		} else {
			r.push(`your dick.`);
		}
		r.push(`It takes ${slave.slaveName} a while to jam ${his} cock up the struggling and sobbing ${rival.slaveName}'s anus. ${rival.slaveName} buys continued vaginal virginity by taking a brutal double anal rape.`);
		seX(V.PC, "penetrative", rival, "anal");
		seX(slave, "penetrative", rival, "anal");
	} else if (rival.anus > 0 && rival.vagina < 1 && slave.dick > 0) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it`);
		} else {
			r.push(`tell ${him2} to ride your dick`);
		}
		r.push(`anally, facing away from you. ${He2} does, not without trepidation, which increases when you hold ${him2} securely in place as you pump yourself in and out of ${his2} asshole. You tell ${slave.slaveName} to ride ${his2} face. ${slave.slaveName} comes over slowly, unsure what to do with the offer since ${his} dick is so useless. ${He} forces ${rival.slaveName}'s face against ${his} useless member anyway. After a bit of this, ${slave.slaveName}, clearly unsatisfied, turns around and rides ${rival.slaveName} with ${his} ass instead. ${rival.slaveName} tries to avoid orally servicing ${his2} rival's asshole, but you hold ${him2} in place and ${slave.slaveName} sighs in contentment.`);
		seX(V.PC, "penetrative", rival, "anal");
		seX(slave, "penetrative", rival, "oral");
	} else if (rival.anus > 0 && rival.vagina < 1) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it`);
		} else {
			r.push(`tell ${him2} to ride your dick`);
		}
		r.push(`anally, facing away from you. ${He2} does, not without trepidation, which increases when you hold ${him2} securely in place as you pump yourself in and out of ${his2} asshole. You tell ${slave.slaveName} to ride ${his2} face. ${slave.slaveName} comes over, gently rubbing ${his} pussy. ${He} forces ${rival.slaveName}'s face against ${his} slick cunt, ignoring ${his2} reluctance. ${rival.slaveName} eventually realizes that ${he2}'s better off getting it over with, and applies ${his2} tongue as best ${he2} can.`);
		seX(V.PC, "penetrative", rival, "anal");
		seX(slave, "penetrative", rival, "oral");
	} else if (rival.anus > 0 && rival.vagina > 0 && canPenetrate(slave)) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it,`);
		} else {
			r.push(`tell ${him2} to ride your dick,`);
		}
		r.push(`facing you. ${He2} does, with some trepidation, which increases when you reach behind ${him2} and spread ${his2} buttocks as wide as they'll go. With ${him2} pinned, you tell ${slave.slaveName} to come over and join you. ${slave.slaveName} comes over, stroking ${himself} hard. You squeeze ${rival.slaveName}'s buttocks together and then spread them again, forcing ${his2} anus to wink invitingly. You stop ${rival.slaveName}'s abortive humping and hold ${his2} hips in place while ${slave.slaveName} gets ${his} cock up ${his2} ass. Once ${he}'s set, off the two of you go, with poor ${rival.slaveName} gasping and grimacing as ${he2} gets it rough in both holes.`);
		seX(V.PC, "penetrative", rival, "anal");
		seX(slave, "penetrative", rival, "anal");
	} else if (rival.anus > 0 && rival.vagina > 0 && slave.dick > 0 && hasAnyArms(slave)) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it,`);
		} else {
			r.push(`tell ${him2} to ride your dick,`);
		}
		r.push(`facing you. ${He2} does, with some trepidation, which increases when you reach behind ${him2} and spread ${his2} buttocks as wide as they'll go. With ${him2} pinned, you tell ${slave.slaveName} to come over and join you. ${slave.slaveName} comes over, stroking ${himself} hard, not certain what you mean, since ${his} cock is useless. To make it clear, you push two fingers into ${rival.slaveName}'s butt, finger fucking ${his2} asshole until ${slave.slaveName} takes over. Once ${he}'s set, off the two of you go, with poor ${rival.slaveName} gasping and grimacing as ${he2} gets it rough in both holes. ${slave.slaveName} uses as many fingers as ${he} can, always at least one more than ${rival.slaveName} would like.`);
		seX(V.PC, "penetrative", rival, "vaginal");
		seX(slave, "penetrative", rival, "anal");
	} else if (rival.anus > 0 && rival.vagina > 0) {
		r.push(`You`);
		if (V.PC.dick === 0) {
			r.push(`step into a strap-on and tell ${him2} to ride it,`);
		} else {
			r.push(`tell ${him2} to ride your dick,`);
		}
		r.push(`facing you. ${He2} does, with some trepidation, which increases when you reach behind ${him2} and spread ${his2} buttocks as wide as they'll go. With ${him2} pinned, you tell ${slave.slaveName} to come over and join you, indicating a strap-on for slave use, on a side shelf. ${slave.slaveName} hurries into it and comes over. You stop ${rival.slaveName}'s abortive humping and hold ${his2} hips in place while ${slave.slaveName} gets ${his} fake cock up ${his2} ass. Once ${he}'s set, off the two of you go, with poor ${rival.slaveName} gasping and grimacing as ${he2} gets it rough in both holes. ${slave.slaveName} murmurs calumnies in ${rival.slaveName}'s ear, pinches ${his2} nipples, and generally adds humiliation above and beyond being double penetrated by ${his2} owner and ${his2} rival.`);
		seX(V.PC, "penetrative", rival, "vaginal");
		seX(slave, "penetrative", rival, "anal");
	} else {
		r.push(`Unforeseen combination of rival stats; yell at FC Dev to write a scene for these slaves.`);
	}
	App.Events.addParagraph(node, r);
	return node;
};
