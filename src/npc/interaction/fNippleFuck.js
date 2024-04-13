/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fNippleFuck = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	seX(slave, "mammary", V.PC, "penetrative", 2);
	V.mammaryTotal += 2;

	r.push(`You call ${him} over to make use of ${his} lewd nipple cunts.`);
	if (slave.fetish === "boobs" && slave.fetishKnown === 1) {
		r.push(`${He} practically vibrates with excitement at the prospect of getting ${his} tits fucked.`);
	} else if (slave.boobs >= 40000) {
		r.push(`You set out a few cushions on the floor for ${him} and let ${his} breasts spill across them.`);
	} else if (slave.boobs >= 20000) {
		r.push(`It takes a moment to find a table that can support ${his} breasts and withstand your lovemaking.`);
	} else {
		r.push(`You settle ${him} on a couch and have ${him} present ${his} chest to you.`);
	}

	r.push(`Once ${he} seems comfortable, you turn your attention to ${his} chest. You start by groping and nuzzling ${his} breasts, teasing ${his} nipples with your tongue.`);

	if (slave.lactation > 0) {
		r.push(`It doesn't take much stimulation before milk starts dribbling onto your tongue.`);
	}

	if (slave.devotion > 20 || slave.trust > 20) {
		r.push(`${He} starts making soft noises of pleasure and luxuriates in your attentions.`);
	} else {
		r.push(`${He} fidgets at your ministrations, but doesn't say anything.`);
	}
	r.push(`Once you're satisfied, you line up your dick with ${his} right nipple and slowly ease yourself into ${him}.`);

	if (slave.lactation > 0) {
		r.push(`Milk gushes around your length and soaks your crotch, the feeling almost like a waterjet, as ${his}`);
	} else {
		r.push(`${His}`);
	}
	r.push(`breast flesh grips you tightly. A few experimental pumps draws gasps from ${him} before you start to thrust in earnest. Soon, the room is filled with ${his} moaning and the sound of flesh on flesh.`);


	if (slave.fetish === "boobs" && slave.fetishKnown === 1) {
		r.push(`${He} has a glassy-eyed expression as ${he}`);
		if (hasAnyArms(slave)) {
			r.push(`gropes ${his} breasts with`);
			if (hasBothArms(slave)) {
				r.push(`both hands,`);
			} else {
				r.push(`${his} hand,`);
			}
			r.push(`fingering ${his} unoccupied nipple in time with your thrusts.`);
		} else {
			r.push(`savors the sensations running through ${his} breast.`);
		}
	} else if (slave.devotion > 20 || slave.trust > 20) {
		r.push(`${He} has a glassy-eyed expression as ${he}`);
		if (hasBothArms(slave)) {
			r.push(`gropes ${his} breasts with`);
			if (slave.dick > 0 && slave.chastityPenis === 0) {
				r.push(`one hand and furiously beats ${himself} off with the other.`);
			} else if (canDoVaginal(slave)) {
				r.push(`one hand and furiously abuses ${his} clit with the other.`);
			} else {
				r.push(`both hands.`);
			}
		} else if (hasAnyArms(slave)) {
			if (slave.dick > 0 && slave.chastityPenis === 0) {
				r.push(`jacks off while rubbing ${his} arm alongside ${his} breasts.`);
			} else if (canDoVaginal(slave)) {
				r.push(`fingers ${his} pussy while rubbing ${his} arm alongside ${his} breasts.`);
			} else {
				r.push(`while ${he} gropes ${his} neglected breast.`);
			}
		} else {
			r.push(`tries ${his} hardest to pleasure ${himself} with no hands.`);
		}
	} else {
		r.push(`${He} turns ${his} gaze away from you as a blush suffuses ${his} cheeks and does ${his} best to suppress ${his} moans.`);
	}

	r.push(`As your orgasm begins to build, you roughly grasp ${his} shoulders and begin to pick up the pace.`);

	if (slave.fetish === "boobs" && slave.fetishKnown === 1) {
		r.push(`As ${he} reaches ${his} climax, ${his} eyes roll back into ${his} head and ${he} quivers in delight at the intense breastgasm ${he} just sustained.`);
	} else if (slave.devotion > 20 || slave.trust > 20) {
		r.push(`Eager for release, ${his} moaning grows louder and higher in pitch${(hasAnyArms(slave)) ? `, and ${his} self-molesting becomes furious and desperate` : ""}.`);
	} else {
		r.push(`As ${he} reaches ${his} climax, ${his} body seems to tense and ${he} bites ${his} lip.`);
	}

	r.push(`It only takes few more thrusts before you bottom out inside ${his} breast and release your load deep inside ${him}. You pull yourself free with a lewd sound and proudly survey what you've wrought. Cum`);
	if (slave.lactation > 0) {
		r.push(`and milk dribble`);
	} else {
		r.push(`dribbles`);
	}
	r.push(`from ${his} gaping nipple. Enjoying the sight, you begin to feel yourself hardening and line up your dick at ${his} left nipple for a repeat performance.`);

	if (slave.lactation > 0) {
		slave.lactationDuration = 2;
		slave.boobs -= slave.boobsMilk;
		slave.boobsMilk = 0;
	} else {
		r.push(induceLactation(slave));
	}

	r.push(`Once both ${his} breasts have been thoroughly fucked, you send ${him} away to clean ${himself} up.`);
	App.Events.addParagraph(node, r);
	return node;
};
