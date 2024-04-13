/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fLickPussy = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He,
		he, his, him
	} = getPronouns(slave);

	const {womanP} = getPronouns(V.PC).appendSuffix("P");

	if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
		r.push(`You summon ${slave.slaveName} to your office and order ${him} to lie down on the couch. ${He} does so`);
		if (slave.devotion > 95) {
			r.push(`with a smile, skipping over to give you a quick kiss before ${he} complies with your request.`);
		} else if (slave.devotion > 50) {
			r.push(`without hesitation, ready to serve and obey.`);
		} else if (slave.devotion > -50) {
			r.push(`with a look of trepidation, as though afraid you're going to hurt ${him}.`);
		} else if (slave.devotion <= -50) {
			r.push(`with a look of hatred, though only after you threaten to punish ${him}.`);
		}
	} else {
		r.push(`You have ${slave.slaveName} brought into your office and placed on your couch.`);
	}

	r.push(`After ${he} is situated, you go over to`);
	if (slave.clothes !== "no clothing") {
		r.push(`${him} and begin to peel off ${his} clothing, to which ${he}`);
		if (slave.devotion > 50) {
			r.push(`gives you a soft smile.`);
		} else {
			r.push(`gives you an angry glare.`);
		}
	} else {
		r.push(`${him}.`);
	}
	r.push(`You suddenly grab ${his} hips and pull ${his} crotch to your face, causing ${him} to`);
	if (canTalk(slave)) {
		r.push(`give a shriek of surprise`);
	} else {
		r.push(`shudder in surprise`);
	}

	if (slave.belly >= 30000) {
		if (slave.bellyPreg > 1000) {
			r.push(`as you get familiar under ${his} huge life-swollen baby bump.`);
		} else {
			r.push(`as you get familiar under ${his} hugely swollen belly.`);
		}
	} else if (slave.belly >= 10000) {
		if (slave.bellyPreg >= 8000) {
			r.push(`as you get under ${his} baby bump.`);
		} else if (slave.bellyImplant >= 8000) {
			r.push(`as you get under the swollen orb that is ${his} stomach.`);
		} else {
			r.push(`as you get under the bloated container of ${slave.inflationType} that is ${his} middle.`);
		}
	} else if (slave.belly >= 1000) {
		if (slave.bellyPreg >= 1000) {
			r.push(`as you get not far below the life growing within ${him}.`);
		} else if (slave.bellyImplant >= 1000) {
			r.push(`as you get not far below the curve of ${his} stomach.`);
		} else {
			r.push(`as you get not far below the groaning container of ${slave.inflationType} within ${him}.`);
		}
	} else if (slave.weight > 95) {
		r.push(`as you get familiar with ${his} fat belly.`);
	} else if (slave.muscles > 30) {
		r.push(`as you get familiar with ${his} prominent abs.`);
	} else if (slave.weight > 30) {
		r.push(`as you get familiar with ${his} soft belly.`);
	} else if (slave.muscles > 10) {
		r.push(`as you get familiar with ${his} toned, smooth belly.`);
	} else {
		r.push(`as you get familiar with ${his} smooth belly.`);
	}

	r.push(`Looking ${him} directly in the eyes, you begin to run your tongue along ${his} labia, drawing a`);
	if (canTalk(slave)) {
		r.push(`soft`);
	} else {
		r.push(`silent`);
	}
	r.push(`moan from ${him}. The combination of the pleasure and the intense look from`);
	if (areRelated(slave, V.PC)) {
		r.push(`${his} ${relativeTerm(slave, V.PC)}`);
	} else {
		r.push(`the ${womanP}`);
		if (slave.devotion > 95) {
			r.push(`${he} loves`);
		} else if (slave.devotion > 50) {
			r.push(`${he}'s accepted as ${his} ${getWrittenTitle(slave)}`);
		} else if (slave.devotion < -50) {
			r.push(`${he} hates`);
		} else if (slave.trust < -50) {
			r.push(`${he} fears`);
		} else {
			r.push(`${he} is enslaved to`);
		}
	}
	r.push(`makes ${him} blush, but you don't let up.`);
	if (slave.dick === 0) {
		r.push(`You give ${his} clit a few experimental tweaks, causing ${his}`);
		if (canTalk(slave)) {
			r.push(`moans`);
		} else {
			r.push(`squirming`);
		}
		r.push(`to intensify${(hasBothLegs(slave)) ? ` and ${his} legs to tighten around your head` : ``}.`);
	}
	r.push(`Before ${he} cums, though, you pull back, causing ${him} to whine in frustration. You begin again, then pull back again just before ${he} orgasms. You repeat this several more times, each time causing ${him} to become more and more frustrated. Finally, one last stroke of your tongue causes ${him} to go over the edge, making ${him}`);
	if (canTalk(slave)) {
		r.push(`scream out`);
		if (slave.devotion > 50) {
			r.push(`your name`);
		}
	} else {
		r.push(`spasm`);
	}
	if (slave.dick > 0) {
		if (canAchieveErection(slave)) {
			r.push(`in ecstasy and spray cum across ${his} chest.`);
		} else {
			r.push(`in ecstasy and dribble cum from ${his} limp dick.`);
		}
	} else {
		r.push(`in ecstasy.`);
	}
	r.push(`You send ${him} back to ${his} assignment before calling in another slave to clean up the mess.`);

	seX(slave, "vaginal", V.PC, "oral");

	App.Events.addParagraph(node, r);
	return node;
};
