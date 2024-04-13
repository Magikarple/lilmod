/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fondleDick = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him
	} = getPronouns(slave);


	r.push(`You call ${him} over so you can fondle ${his}`);
	if (slave.dick === 1) {
		r.push(`tiny dick`);
	} else if (slave.dick === 2) {
		r.push(`cute dick`);
	} else if (slave.dick === 3) {
		r.push(`dick`);
	} else if (slave.dick === 4) {
		r.push(`big dick`);
	} else if (slave.dick === 5) {
		r.push(`impressive dick`);
	} else if (slave.dick === 6) {
		r.push(`huge dick`);
	} else if (slave.dick === 7) {
		r.push(`gigantic dick`);
	} else if (slave.dick === 8) {
		r.push(`titanic dick`);
	} else if (slave.dick === 9) {
		r.push(`absurd dick`);
	} else if (slave.dick === 10) {
		r.push(`inhuman dick`);
	} else {
		r.push(`hypertrophied dick`);
	}
	r.push(`and`);
	if (slave.scrotum > 0) {
		if (slave.balls === 0) {
			r.push(`soft scrotum.`);
		} else if (slave.balls === 1) {
			r.push(`tiny balls.`);
		} else if (slave.balls === 2) {
			r.push(`cute balls.`);
		} else if (slave.balls === 3) {
			r.push(`balls.`);
		} else if (slave.balls === 4) {
			r.push(`large balls.`);
		} else if (slave.balls === 5) {
			r.push(`huge balls.`);
		} else {
			r.push(`monstrous balls.`);
		}
	} else {
		r.push(`soft perineum.`);
	}

	if (slave.vaginaTat === "tribal patterns") {
		r.push(`The tattoos on ${his} abdomen certainly draw attention there.`);
	} else if (slave.vaginaTat === "lewd crest") {
		r.push(`The crest on ${his} abdomen invokes lewd thoughts, after all.`);
	}

	if (slave.dick !== 0) {
		if (slave.piercing.vagina.weight > 1) {
			r.push(`Metal glints all up and down ${his} cock.`);
		} else if (slave.piercing.vagina.weight === 1) {
			r.push(`Metal glints at the head of ${his} cock.`);
		}
	}

	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`Like a doll, ${he} dumbly remains still, watching your hands move towards ${him} without any real interest. You gently trace your fingers along ${his} ${dickDesc(slave)} before taking it gently in one hand and tenderly stroking your hand along its`);
		strokeAndSqueeze();
		if (!canAchieveErection(slave)) {
			r.push(`${His} dick remains flaccid as it cannot get stiff and you continue tenderly stroking ${his} soft dick but, ${he} does not respond.`);
		} else {
			r.push(`${His} prick stiffens like a rod in your hands and you continue your expert strokes along the erect shaft but, except for the cockmilk leaking out of ${his} dick, ${he} does not respond.`);
		}
		r.push(`Since ${he} is mindbroken, ${his} responses to you are purely physiological and your actions have no affect on ${him} mentally. You leave your toy for one of your other slaves to clean and maintain.`);
	} else if (isAmputee(slave)) {
		r.push(`Since ${he}'s a quadruple amputee, ${he}'s yours to use as a human finger toy. While ${he}'s lying there helpless, you move your hands towards ${him}. You gently trace your fingers along ${his} ${dickDesc(slave)} before taking it gently in one hand and tenderly stroking your hand along its`);
		strokeAndSqueeze();
		if (!canAchieveErection(slave)) {
			r.push(`${His} dick remains flaccid as it cannot get stiff and you continue tenderly stroking ${his} soft dick but, except for the cockmilk leaking out of ${his} dick, ${he} does not respond.`);
		} else {
			r.push(`${His} prick stiffens like a rod in your hands and you continue your expert strokes along the erect shaft but, except for the cockmilk leaking out of ${his} dick, ${he} does not respond.`);
		}
		r.push(`Soon, ${his} movements indicate that ${he} is orgasming. ${He} shudders and leaks ${his} cockmilk as ${he} orgasms in your hand,`);
		if (canSee(slave)) {
			r.push(`looking at`);
		} else {
			r.push(`facing`);
		}
		r.push(`you as you stop moving your hands. You leave your toy for one of your other slaves to clean and maintain.`);
	} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} comes submissively over, smiling a little submissive smile, and points ${his} dick towards you. You gently trace your fingers along ${his} ${dickDesc(slave)} before taking it gently in one hand and tenderly stroking your hand along its`);
		strokeAndSqueeze();
		standardStiffy();
		r.push(`Soon, ${his} movements indicate that ${he} is orgasming. ${He} shudders and leaks ${his} cockmilk as ${he} orgasms in your hands before submissively avoiding your gaze as you get cleaned up.`);
	} else if (slave.devotion < -20) {
		r.push(`${He} clearly dislikes the thought of getting ${his} dick fondled by you. ${His} lower lip quivers with trepidation as ${he} watches your hands move towards ${him}. ${He} has no choice but to obey if ${he} wants to avoid punishment. ${He} gasps and shakes as you gently trace along ${his} ${dickDesc(slave)} before taking it gently in one hand and tenderly stroking your hand along its`);
		strokeAndSqueeze();
		standardStiffy();
		r.push(`${He}`);
		if (hasAnyArms(slave)) {
			r.push(`grabs your wrist with ${his} ${hasBothArms(slave) ? `hands` : `hand`}`);
		} else {
			r.push(`jostles against your arm`);
		}
		r.push(`and tries to stop it from moving but is unable to and despite ${his} resistant pulling against you. ${He} bites ${his} lip but ${he} cannot help but moan. Soon ${he} shudders and leaks ${his} cockmilk as ${he} orgasms in your hands. ${He} looks at you shamefully as you stop moving your hands and get cleaned up.`);
	} else if (slave.fetish === "masochist" && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} hurriedly comes over to you, to stand between you and your desk. You lean over while ${he} lies down upon it, face-up, with ${his} dick pointed towards you. ${He} gasps when you slap ${his} ${dickDesc(slave)} with your hand. You firmly grab it and tightly squeeze it with your fingers, stroking your hand along its shaft.`);
		if (slave.balls > 0) {
			r.push(`Simultaneously, you slap ${his} ${ballDesc()} with your other hand.`);
		}
		r.push(`You firmly wrap your fingers, thumb and palm around ${his} dick, rhythmically stroking along with both hands, starting slow but gradually increasing the speed of your movements. You occasionally squeeze and pinch the tip and head of ${his} dick between your fingers and thumb.`);
		standardStiffy();
		r.push(`Your rough play leaves red marks on ${his} breasts and nipples and ${he} becomes even more aroused. Soon, ${his} movements indicate that ${he} is orgasming. ${He} shudders and leaks ${his} cockmilk as ${he} orgasms in your hands. ${He} rubs the marks on ${his} dick and balls with ${his} hands, an ecstatic look on ${his} ${slave.skin} face. ${He} looks at you longingly as you get cleaned up, hungry for more.`);
	} else if (slave.devotion <= 20) {
		r.push(`${He} obeys silently, standing in front of you as you move your hands towards ${him}. You gently trace your fingers along ${his} ${dickDesc(slave)} before taking it gently in one hand and tenderly stroking your hand along its`);
		strokeAndSqueeze();
		standardStiffy();
		r.push(`${He}`);
		if (canSee(slave)) {
			r.push(`looks into your eyes`);
		} else {
			r.push(`faces you`);
		}
		r.push(`furtively while ${he}`);
		if (hasAnyArms(slave)) {
			r.push(`grabs your ${hasBothArms(slave) ? `wrists` : `wrist`} with ${his} ${hasBothArms(slave) ? `hands` : `hand`},`);
		} else {
			r.push(`moves ${his} hips ever so slightly,`);
		}
		r.push(`moving to match your hand movements. ${He} moans and shudders, leaking ${his} cockmilk as ${he} orgasms in your hands. ${He} dutifully looks at you as you stop moving your hands and get cleaned up.`);
	} else {
		r.push(`${He} devotedly comes over and gives you an impassioned kiss. ${He} smiles and points ${his} dick towards you. You gently trace your fingers along ${his} ${dickDesc(slave)} before taking it gently in one hand and tenderly stroking your hand along its`);
		strokeAndSqueeze();
		standardStiffy();
		r.push(`${He} begs you not to stop. Soon, ${he} moans and ${his} movements indicate that ${he} is about to orgasm. ${He} shudders and leaks ${his} cockmilk as ${he} orgasms in your hands. ${He} looks at you passionately as you stop moving your hands and get cleaned up.`);
	}
	App.Events.addParagraph(node, r);
	return node;

	function ballDesc() {
		if (slave.scrotum === 0) {
			return `soft skin beneath ${his} base and ${his} butthole`;
		} else if (slave.balls === 1) {
			return `tiny balls`;
		} else if (slave.balls === 2) {
			return `small balls`;
		} else if (slave.balls === 3) {
			return `balls`;
		} else if (slave.balls === 4) {
			return `big balls`;
		} else if (slave.balls === 5) {
			return `lemon-sized balls`;
		} else if (slave.balls < 10) {
			return `fist-sized balls`;
		} else {
			return `hypertrophied balls`;
		}
	}

	function strokeAndSqueeze() {
		if (slave.balls > 0) {
			r.push(`shaft, while simultaneously cupping ${his} ${ballDesc()} with your other hand.`);
		} else {
			r.push(`shaft.`);
		}
		r.push(`You firmly wrap your fingers, thumb and palm around ${his} dick, rhythmically stroking along with both hands, starting slow but gradually increasing the speed of your movements. You occasionally squeeze the tip and head of ${his} dick between your fingers and thumb.`);
	}

	function standardStiffy() {
		if (canAchieveErection(slave)) {
			r.push(`${His} prick stiffens like a rod in your hands and you continue your expert strokes along the erect shaft.`);
		} else {
			r.push(`${His} dick remains flaccid as it cannot get stiff and you continue tenderly stroking ${his} soft dick.`);
		}
	}
};
