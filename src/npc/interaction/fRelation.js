App.Interact.fRelationChoosePartner = class extends App.Interact.BaseChoosePartnerRenderer {
	constructor(slave) {
		super(slave);
		this.intro = `${this.slave.slaveName} has several relatives available; pick one to start a threesome.`;
		this.execute = App.Interact.fRelation;
	}

	eligible(candidate) {
		return isSlaveAvailable(candidate) && areRelated(this.slave, candidate);
	}

	renderDetail(candidate, container) {
		if (canImpreg(this.slave, candidate) || canImpreg(candidate, this.slave)) {
			App.UI.DOM.appendNewElement("span", container, ` Pregnancy risk`, ["green"]);
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave - slave to fuck with partner.
 * @param {App.Entity.SlaveState} partner - partner to fuck slave with. Must be a close relative or relationship target of slave.
 * @returns {DocumentFragment}
 */
App.Interact.fRelation = function(slave, partner) {
	const r = new SpacedTextAccumulator();

	const {
		He, His,
		he, his, him, girl, daughter
	} = getPronouns(slave);
	const {title: Master} = getEnunciation(slave);

	let activeSlaveRel;
	let partnerRel;
	if (areRelated(slave, partner)) {
		activeSlaveRel = relativeTerm(partner, slave);
		partnerRel = relativeTerm(slave, partner);
	} else if (partner.ID === slave.relationshipTarget) {
		switch (slave.relationship) {
			case 1:
				activeSlaveRel = "friend";
				partnerRel = "friend";
				break;
			case 2:
				activeSlaveRel = "best friend";
				partnerRel = "best friend";
				break;
			case 3:
				activeSlaveRel = "friend with benefits";
				partnerRel = "friend with benefits";
				break;
			case 4:
				activeSlaveRel = "lover";
				partnerRel = "lover";
				break;
			case 5:
				activeSlaveRel = "slave wife";
				partnerRel = "slave wife";
				break;
		}
	} else {
		throw new Error(`Invalid partner for fRelation: main ${slave ? slave.ID : "undefined"}, partner ${partner ? partner.ID : "undefined"}.`);
	}
	const {
		He: He2,
		he: he2, his: his2, him: him2, himself: himself2, daughter: daughter2
	} = getPronouns(partner);

	r.push(
		`You call both`,
		App.UI.DOM.slaveDescriptionDialog(slave, slave.slaveName),
		`and`,
		App.UI.DOM.slaveDescriptionDialog(partner, partner.slaveName),
		`to your office.`
	);
	if (canMove(slave) && canMove(partner) && (slave.devotion > 50 && partner.devotion > 50) && canPenetrate(slave) && canPenetrate(partner) && (partner.anus > 0 && slave.anus > 0 && V.PC.dick !== 0)) {
		r.push(`There are three stiff pricks available. Since ${slave.slaveName} was already in your office, ${he} goes on the bottom. ${He} lies on the floor, spreads ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`buttocks, relaxes ${his} anus, and then begs ${his} ${partnerRel} to buttfuck ${him}. ${partner.slaveName} does, slipping ${his2} cock into ${his2} ${activeSlaveRel}'s ass. ${He2} then stops and waits for you to buttfuck ${him2} in turn. It isn't a particularly convenient way to fuck, but it's got the virtue of being uncommon. ${partner.slaveName}, both fucking and getting fucked, comes in ${his2} ${activeSlaveRel}'s rectum first. They switch places so ${slave.slaveName} can have a turn in the middle, leaving you to finish into ${slave.slaveName}'s already cum-soaked hole.`);

		seX(slave, "anal", partner, "penetrative", 2);
		seX(slave, "penetrative", partner, "anal", 2);
	} else if (partner.devotion - slave.devotion > 20 && partner.devotion <= 50) {
		r.push(`${partner.slaveName} is a lot more ready and willing for this than ${slave.slaveName}, so`);
		if (V.PC.dick === 0) {
			r.push(`while getting into a strap-on,`);
		}
		r.push(`you sit ${him2} on the couch and make ${slave.slaveName} sit on ${his2} lap, facing ${him2}. In this position, ${partner.slaveName} can reach around and spread ${his2} ${activeSlaveRel}'s`);
		if (V.seeRace === 1) {
			r.push(`${partner.race}`);
		}
		r.push(`buttocks for ${him}, controlling ${him} all the while in case ${he} has hesitations about this. ${slave.slaveName} knows that ${he}'s trapped, and lets ${his} ${partnerRel} hold ${his} ass wide so you can use ${him}. They're face to face, and it's not hard to tell that ${slave.slaveName} is glaring daggers at ${partner.slaveName}. You reward ${partner.slaveName} for ${his2} obedience and punish ${slave.slaveName} for ${his} resistance by forcing ${him} to orally service ${partner.slaveName} while you finish using ${slave.slaveName}.`);
		seX(slave, "oral", partner, "oral");
		r.push(VCheck.Both(slave, 1));
	} else if (slave.devotion - partner.devotion > 20 && partner.devotion <= 50) {
		r.push(`${slave.slaveName} is a lot more ready and willing for this than ${partner.slaveName}, so`);
		if (V.PC.dick === 0) {
			r.push(`while getting into a strap-on,`);
		}
		r.push(`you sit ${him} on the couch and make ${partner.slaveName} sit on ${his} lap, facing ${him}. In this position, ${slave.slaveName} can reach around and spread ${his} ${partnerRel}'s`);
		if (V.seeRace === 1) {
			r.push(`${partner.race}`);
		}
		r.push(`buttocks for ${him2}, controlling ${him2} all the while in case ${he2} has hesitations about this. ${partner.slaveName} knows that ${he2}'s trapped, and lets ${his2} ${activeSlaveRel} hold ${his2} ass wide so you can use ${him2}. They're face to face, and it's not hard to tell that ${partner.slaveName} is glaring daggers at ${slave.slaveName}. You reward ${slave.slaveName} for ${his} obedience and punish ${partner.slaveName} for ${his2} resistance by forcing ${him2} to suck ${slave.slaveName} off while you finish using ${partner.slaveName}.`);
		seX(slave, "oral", partner, "oral");
		r.push(VCheck.Partner(partner, 1));
	} else if (canMove(slave) && canMove(partner) && (slave.devotion > 50 && partner.devotion > 20 && hasAnyArms(slave) && ["mother", "father", "sole parent"].includes(activeSlaveRel))) {
		r.push(`${slave.slaveName} gives you a little smile when ${he}`);
		if (canHear(slave)) {
			r.push(`hears`);
		} else {
			r.push(`learns`);
		}
		r.push(`you wish to fuck ${him} and ${his} ${daughter2} ${partner.slaveName}`);
		if (V.PC.dick === 0) {
			r.push(`and`);
			if (canSee(slave)) {
				r.push(`sees`);
			} else {
				r.push(`acknowledges`);
			}
			r.push(`your strap-on`);
		}
		r.addToLast(`.`);
		r.push(`On your direction, ${slave.slaveName} sits on the couch. When ${partner.slaveName} enters, ${his2} ${activeSlaveRel} spreads ${his} arms and tells ${him2} to sit on ${his} lap. ${partner.slaveName} gets the idea and straddles ${him} so they're face to face. You take ${partner.slaveName} from behind; ${he2} gasps as ${he2} feels ${his2} ${activeSlaveRel}'s ${hasBothArms(partner) ? `hands` : `hand`} stimulate ${him2} from the front. They make out shamelessly while you take your pleasure. When you finish, ${slave.slaveName} lies down on the couch so ${partner.slaveName} can ride ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`face. As ${he} sucks the cum out of ${his} ${daughter2}'s sopping fuckhole, ${partner.slaveName} sucks you hard again. In the mood for something harder this time, you jam yourself into the older ${slave.slaveName}. ${partner.slaveName} gets off ${slave.slaveName}'s face so ${he2} can offer ${himself2} for fondling and groping while you pound ${slave.slaveName}. After you're done, ${partner.slaveName} returns ${his2} ${activeSlaveRel}'s affection and gives ${him} some gentle oral as the older slave lies there exhausted.`);
		seX(slave, "oral", partner, "oral", 2);
		r.push(VCheck.Both(slave, 1));
		r.push(VCheck.Partner(partner, 1));
	} else if (canMove(slave) && canMove(partner) && (slave.devotion > 50 && partner.devotion > 20 && ["daughter", "son"].includes(activeSlaveRel))) {
		r.push(`${slave.slaveName} is enthusiastic when ${he}`);
		if (canHear(slave)) {
			r.push(`hears`);
		} else {
			r.push(`notices`);
		}
		r.push(`you order ${partner.slaveName} to come over. ${His} total immersion in sexual slavery has clearly uncovered a willingness to get very close to ${his} ${partnerRel}. You`);
		if (V.PC.dick === 0) {
			r.push(`don a strap-on,`);
		}
		r.push(`lie on the floor and instruct ${partner.slaveName} to ride you. ${He2} complies, and finds ${his2} ${daughter} ${slave.slaveName}`);
		if (partner.dick > 0) {
			r.push(`stroking ${his2} cock while ${he2} humps ${his2}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`butt up and down on your cock.`);
		} else {
			r.push(`licking ${his2} anus while ${he2} humps ${himself2} up and down on your cock.`);
		}
		r.push(`Your use of ${partner.slaveName}'s`);
		if (partner.physicalAge >= 24) {
			r.push(`mature`);
		} else {
			r.push(`surprisingly young`);
		}
		r.push(`body is the focus. ${He2} finds ${himself2} caught up in a miasma of sexual pleasure and perversion, moaning and blushing as your`);
		if (V.PC.dick === 0) {
			r.push(`strap-on and fingers`);
		} else {
			r.push(`cock`);
		}
		r.push(`and ${slave.slaveName}'s mouth tour ${his2} body. When you finish in ${his2}`);
		if (partner.dick > 0) {
			r.push(`asshole, ${his2} ${daughter} hastens to lavish attention on ${his} ${partnerRel}'s well fucked, cum-filled butt.`);
		} else {
			r.push(`pussy, ${his2} ${daughter} hastens to lavish attention on ${his} ${partnerRel}'s well fucked, cum-filled cunt.`);
		}
		seX(slave, "oral", partner, "oral", 2);
		r.push(VCheck.Partner(partner, 1));
	} else if (canDoVaginal(slave) && canDoVaginal(partner) && canMove(slave) && canMove(partner) && (slave.devotion > 50 && partner.devotion > 50 && ["twin brother", "twin sister"].includes(activeSlaveRel))) {
		r.push(`${slave.slaveName}`);
		r.push(`and ${partner.slaveName} are such devoted sex slaves that they've long since lost any hesitations about their partnership, and generally approach sex as though their bodies were interchangeable. (This means that they almost never masturbate, for one thing, preferring to have sex with each other, instead.) Giggling and kissing each other, they eagerly kneel before your chair and give you simultaneous oral sex, making an effort to play with their symmetry. They kiss around your`);
		if (V.PC.dick === 0) {
			r.push(`pussy,`);
		} else {
			r.push(`cock, making a complete seal around you with their lips`);
		}
		r.push(`one on each side. Then they jump up on your desk and press their,`);
		if (slave.dick > 0 && partner.dick > 0) {
			r.push(`cocks`);
		} else if (slave.dick > 0 || partner.dick > 0) {
			r.push(`cock and pussy`);
		} else {
			r.push(`pussies`);
		}
		r.push(`against one another${(V.PC.dick === 0) ? ` while you don a strap-on` : ``}, spreading their legs to offer you everything. You switch back and forth, with the twin you're not in rubbing and grinding against the one you are, until both of ${partner.slaveName} and ${slave.slaveName} are lying on the desk${(V.PC.dick !== 0) ? ` with cum dripping out of them` : ``}, making out tiredly.`);
		seX(slave, "oral", partner, "oral");
		r.push(VCheck.Both(slave, 1));
		r.push(VCheck.Partner(partner, 1));
	} else if (canMove(slave) && canMove(partner) && (slave.devotion > 50 && partner.devotion > 20 && ["sister", "brother", "half-sister", "half-brother", "twin sister", "twin brother"].includes(activeSlaveRel))) {
		r.push(`You call ${slave.slaveName}'s ${partnerRel} ${partner.slaveName} in for some incestuous fun, but see no reason to wait for ${him2}. When ${he2} arrives, it's to the`);

		if (canSee(partner)) {
			r.push(`sight`);
		} else {
			r.push(`scene`);
		}
		r.push(`of ${slave.slaveName} sitting on the`);
		if (canDoVaginal(slave) || canDoAnal(slave)) {
			r.push(`couch with ${his} ${hasBothLegs(slave) ? `legs` : `leg`} spread with you`);
			if (canDoVaginal(slave)) {
				r.push(`gently fucking ${his} pussy`);
			} else {
				r.push(`using ${his} asshole`);
			}
			if (V.PC.dick === 0) {
				r.push(`with a strap-on`);
			}
			r.addToLast(`. You pull out`);
		} else {
			r.push(`floor with`);
			if (V.PC.dick === 0) {
				r.push(`${his} face buried in your pussy. You pull away`);
			} else {
				r.push(`your dick down ${his} throat. You pull out`);
			}
		}
		r.push(`and order ${partner.slaveName} to orally service ${his2} ${activeSlaveRel}. ${He2} gets down before the spread-eagled slave ${girl} to get to work. After watching ${slave.slaveName} enjoy the attention for a while, you move behind the busy ${partner.slaveName} and pull ${him2} into a good position so you can fuck ${him2} while ${he2} sucks. After a few thrusts, ${slave.slaveName}'s eyes roll back.`);

		if (slave.voice === 0 || slave.accent >= 3) {
			r.push(`${He} gestures that it feels really good when you make ${his} ${partnerRel} moan into ${him}.`);
		} else {
			r.push(
				Spoken(slave, `"Oh ${Master},"`),
				`${he} squeals,`,
				Spoken(slave, `"it feels so good when you make ${him2} moan into me!"`)
			);
			seX(slave, "oral", partner, "oral");
			r.push(VCheck.Both(slave, 1));
			r.push(VCheck.Partner(partner, 1));
		}
	} else if (["daughter", "son", "father", "mother", "sole parent", "half-sister", "half-brother", "sister", "brother", "twin brother", "twin sister"].includes(activeSlaveRel)) {
		r.push(`Since between them they aren't able to enthusiastically perform an incestuous threesome, you simply line ${slave.slaveName} and ${partner.slaveName} up next to one another on the couch next to your desk,`);
		if (V.PC.dick === 0) {
			r.push(`don a strap-on,`);
		}
		r.push(`and fuck`);
		if (V.seeRace === 1) {
			r.push(`${slave.race} holes`);
		}
		r.push(`at will. Whenever a hole begins to pall you just switch to another. ${slave.slaveName} tries hard to ignore the fact that ${he}'s getting fucked next to ${his} ${partnerRel}, and ${partner.slaveName} pretends the cock getting shoved into ${him2} isn't slick from ${his2} ${activeSlaveRel}'s fuckhole.`);
		r.push(VCheck.Both(slave, 1));
		r.push(VCheck.Partner(partner, 1));
	} else if (
		(activeSlaveRel === "friend" || activeSlaveRel === "best friend") &&
		slave.devotion > 20 &&
		partner.devotion > 20
	) {
		r.push(`${slave.slaveName} and ${partner.slaveName} line up next to one another on the couch next to your desk`);
		if (V.PC.dick === 0) {
			r.push(`while you don a strap-on,`);
		}
		r.push(`and offer you their holes. They're just friends, but they're sex slaves and they see nothing wrong with enjoying sex with you, together. They keep up a constant stream of giggling, gasping, and smiling as each of them in turn feels a cock, warm and wet from their friend's body, transferred into them. Each of them does their best to help the other do well, even manually stimulating their friend when necessary${(V.PC.boobs >= 300 || V.PC.title === 0) ? ` and spinning around to lavish attention on your nipples` : ``}.`);
		r.push(VCheck.Both(slave, 1));
		r.push(VCheck.Partner(partner, 1));
	} else if (["friend with benefits", "lover", "slave wife"].includes(activeSlaveRel) && slave.devotion > 20 && partner.devotion > 20) {
		r.push(`${slave.slaveName} and ${partner.slaveName} eagerly retire to the couch and arrange themselves face to face so they can make out and enjoy each other's bodies as you enjoy theirs. You decide not to set up an elaborate threesome, and just`);
		if (V.PC.dick === 0) {
			r.push(`engage in a little tribadism with`);
		} else {
			r.push(`fuck`);
		}
		r.push(`whatever hole catches your eye next. They rarely break their intimate kissing, forming between the two of them a loving entity on the couch with all sorts of interesting parts to experience. They're sex slaves, and you're fucking them, but they're also lovers who are very comfortable in each other's`);
		if (hasBothArms(slave) && hasBothArms(partner)) {
			r.push(`arms,`);
		} else if ((hasAnyArms(slave) && hasAnyArms(partner))) {
			r.push(`embrace,`);
		} else {
			r.push(`presence,`);
		}
		r.push(`kissing, fondling each other, and`);
		if (V.PC.dick === 0) {
			r.push(`enjoying your pussy loving.`);
		} else {
			r.push(`taking your dick.`);
		}
		r.push(VCheck.Both(slave, 1));
		r.push(VCheck.Partner(partner, 1));
	} else {
		r.push(`Since between them they aren't able to enthusiastically perform a threesome, you simply line ${slave.slaveName} and ${partner.slaveName} up next to one another on the couch next to your desk, and fuck`);
		if (V.seeRace === 1) {
			r.push(`${slave.race} holes`);
		}
		r.push(`at will. Whenever a hole begins to pall you just switch to another. ${slave.slaveName} tries hard to ignore the fact that ${he}'s getting fucked next to ${his} ${partnerRel}, and ${partner.slaveName} pretends the`);
		if (V.PC.dick === 0) {
			r.push(`strap-on`);
		} else {
			r.push(`cock`);
		}
		r.push(`getting shoved into ${him2} isn't slick from ${his2} ${activeSlaveRel}'s fuckhole.`);
		r.push(VCheck.Both(slave, 1));
		r.push(VCheck.Partner(partner, 1));
	}

	r.toParagraph();
	return r.container();
};
