App.UI.SlaveInteract.agentAssignmentScene = function() {
	const node = new DocumentFragment();
	const slave = getSlave(V.AS);
	let r = [];
	assignJob(slave, "be your agent");

	if (slave.rivalry > 0) {
		const rival = getSlave(slave.rivalryTarget);
		if (rival) {
			rival.rivalry = 0;
			rival.rivalryTarget = 0;
		} else {
			r.push(`<span class="red">Error, rival not found.</span>`);
		}
		slave.rivalry = 0;
		slave.rivalryTarget = 0;
	}

	if (slave.relationship.isBetween(0, 4)) {
		const relation = getSlave(slave.relationshipTarget);
		if (relation) {
			relation.relationship = 0;
			relation.relationshipTarget = 0;
		} else {
			r.push(`<span class="red">Error, relationshipTarget not found.</span>`);
		}
		slave.relationship = 0;
		slave.relationshipTarget = 0;
	}

	const {
		He,
		he, his, him, woman
	} = getPronouns(slave);
	const {title: Master} = getEnunciation(slave);

	App.Events.drawEventArt(node, slave);

	r.push(`You order ${slave.slaveName} to come into your office for orders. The devoted ${SlaveTitle(slave)} has no prior warning that this is anything unusual, and from the`);
	if (slave.energy > 95) {
		r.push(`horny glint`);
	} else {
		r.push(`glow of sexual availability`);
	}
	r.push(`in ${his} ${App.Desc.eyesColor(slave)} as ${he}`);
	if (canWalk(slave)) {
		r.push(`enters,`);
	} else {
		r.push(`is helped in,`);
	}
	r.push(he);
	if (slave.energy > 95) {
		r.push(`seems to be hoping`);
	} else {
		r.push(`wouldn't mind hearing`);
	}
	r.push(`that you've called ${him} in for a quick fuck. In fact, the matter at hand is about as far as it could possibly be from that, on the spectrum of interactions between ${properMaster()} and slave.`);

	App.Events.addParagraph(node, r);
	r = [];

	App.Events.addParagraph(node, [`You offer ${him}, without preamble, agency on your behalf in ${App.activeArcology().name}. As a ${woman} of intelligence, ${he} knows the basics of such an arrangement, but ${he}'s stunned into silence by the offer, so you outline it briefly. Having a slave lead an arcology would be too much, even for the most open minded of Free Cities societies. So, ${he} would be freed, albeit subject to a set of private, restrictive contracts that would allow you to recall ${him} if you wish, and require ${him} to follow your directions, if you give ${him} any. But other than that, ${he} would be the effective leader of an entire arcology. It's an unusual arrangement, but one that's becoming more common as multiple arcologies come under united control.`]);

	r.push(`${He}'s intelligent and confident of ${his} place within society as a valued slave, and knows that with your resources behind ${him}, this is likely something ${he}'s capable of succeeding at. Nevertheless, ${his} feelings are obviously mixed. It will be a challenge,`);
	switch (slave.fetish) {
		case "submissive":
			r.push(`especially for a sexual submissive like ${him}.`);
			break;
		case "cumslut":
			r.push(`and ${he}'ll have to find dominant ways to sate ${his} oral appetites.`);
			break;
		case "humiliation":
			r.push(`especially for a humiliation addict like ${him}.`);
			break;
		case "buttslut":
			r.push(`though ${he}'ll probably be able to live ${his} anal life vicariously by buttfucking others.`);
			break;
		case "boobs":
			r.push(`but ${he}'ll have a practically infinite procession of breasts to judge and fondle.`);
			break;
		case "pregnancy":
			r.push(`but the potential for impregnation of hundreds of slaves excites ${him}.`);
			break;
		case "dom":
			r.push(`but the prospect of having more slaves at ${his} whim than even ${he} could possibly use is incredibly exciting to ${him}.`);
			break;
		case "sadist":
			r.push(`but the prospect of having more slaves at ${his} whim than even ${he} could possibly break is incredibly exciting to ${him}.`);
			break;
		case "masochist":
			r.push(`especially for a masochist like ${him}.`);
			break;
		default:
			r.push(`though one ${he}'s willing to take on.`);
	}
	r.push(`It will mean that ${he}'ll see much less of you, something such a devoted slave may struggle with. Oppressed by the confusion and strength of ${his} feelings, ${he} begins to cry.`);
	App.Events.addParagraph(node, r);

	App.Events.addParagraph(node, [
		Spoken(slave, `"Thank you, ${Master},"`),
		`${he} gasps out. "I'll do my best."`
	]);

	return node;
};
