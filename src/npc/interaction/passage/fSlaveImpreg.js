App.Interact.fSlaveImpregChoosePartner = class extends App.Interact.BaseChoosePartnerRenderer {
	constructor(slave) {
		super(slave);
		this.intro = `${slave.slaveName} is fertile; now you must select a slave with both a penis and potent testicles.`;
		this.noneEligible = `You have no slaves capable of inseminating others.`;
		this.execute = App.Interact.fSlaveImpreg;
	}

	eligible(candidate) {
		return canImpreg(this.slave, candidate) && canPenetrate(candidate);
	}

	renderDetail(candidate, container) {
		const kinship = ibc.kinship(candidate, this.slave);
		if (V.inbreeding && kinship > 0) {
			let adj = "";
			if (kinship >= 0.5) {
				adj = `Extreme`;
			} else if (kinship >= 0.25) {
				adj = `Major`;
			} else if (kinship >= 0.125) {
				adj = `Some`;
			} else if (kinship >= 0.0625) {
				adj = `Minor`;
			} else {
				adj = `Slight`;
			}
			App.UI.DOM.appendNewElement("span", container, ` (${adj} inbreeding, CoI of ${kinship})`);
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.Entity.SlaveState} impregnatrix
 * @returns {DocumentFragment}
 */
App.Interact.fSlaveImpreg = function(slave, impregnatrix) {
	const r = new SpacedTextAccumulator();
	V.nextLink = "Slave Interact";
	V.nextButton = "Back";

	const {
		He,
		he, his, him, himself, girl
	} = getPronouns(slave);

	const {
		He2, His2,
		he2, his2, him2, himself2, hers2
	} = getPronouns(impregnatrix).appendSuffix("2");

	const {
		himP
	} = getPronouns(V.PC).appendSuffix("P");

	const donatrix = (impregnatrix.pronoun === App.Data.Pronouns.Kind.female || V.diversePronouns === 0) ? `donatrix` : `donor`;

	r.push(`The first necessary step is to prepare the ${donatrix}.`);
	const belly = bellyAdjective(slave);
	const superfetation = (slave.geneticQuirks.superfetation === 2 && slave.pregKnown === 1) ? 1 : 0;
	const penCountBonus = random(6, 20);
	seX(slave, slave.mpreg ? "anal" : "vaginal", impregnatrix, "penetrative", penCountBonus + 1);

	const assPussy = (slave.mpreg === 1) ? `ass` : `pussy`;
	const assCunt = (slave.mpreg === 1) ? `ass` : `cunt`;
	const prostate = (impregnatrix.prostate !== 0) ? `prostate` : `internals`;

	if (impregnatrix.fetish === "pregnancy" && impregnatrix.fetishKnown === 1 && impregnatrix.fetishStrength > 60 && impregnatrix.devotion >= -20) {
		r.push(`This is very easy, since ${impregnatrix.slaveName} has an impregnation fetish.`);
		if (impregnatrix.pregKnown === 1) {
			r.push(`${He2}'s pregnant, and as far as ${he2}'s concerned, everyone should be pregnant. ${He}'s <span class="hotpink">happy to spread the love.</span>`);
		} else if (isFertile(impregnatrix)) {
			r.push(`${He2}'d love to get pregnant ${himself2}, but as far as ${he2}'s concerned, putting a baby in someone else is the <span class="hotpink">next best thing.</span>`);
		} else {
			r.push(`${He2}'s been deeply unhappy that there's no prospect of ${him2} ever being able to carry a child, and this is the <span class="hotpink">next best thing</span> for ${him2}.`);
		}
		impregnatrix.devotion += 4;
		if (impregnatrix.preg === -3) {
			r.push(`${His2} member remains limp despite the prospect of getting another slave pregnant, but a direct injection of vasodilators quickly fixes that for this special occasion.`);
		} else {
			r.push(`${His2} member springs instantly to attention at the prospect of getting another slave pregnant.`);
		}
	} else if (impregnatrix.attrXX > 65 && impregnatrix.attrKnown === 1 && impregnatrix.devotion >= -20) {
		r.push(`Since ${impregnatrix.slaveName} likes sticking ${his2} cock in girls, ${he2} doesn't take much convincing.`);
		if (impregnatrix.preg === -3) {
			r.push(`${His2} member remains limp despite the prospect of ${assPussy}, but a direct injection of vasodilators quickly fixes that for this special occasion.`);
		} else {
			r.push(`${His2} member springs instantly to attention at the prospect of pussy.`);
		}
	} else if (impregnatrix.devotion > 50) {
		r.push(`Since ${impregnatrix.slaveName} is devoted to you, ${he2}'ll eagerly fuck anything you tell ${him2} to fuck.`);
		if (impregnatrix.preg === -3) {
			r.push(`${He2} accepts a direct injection of vasodilators to counteract the hormones keeping ${him2} soft,`);
		} else {
			r.push(`${He2} quickly gets ${himself2} hard,`);
		}
		r.push(`only a certain confusion in ${his2} look betraying that ${he2} realizes how special an occasion this is.`);
	} else if (impregnatrix.devotion > 20) {
		r.push(`Since ${impregnatrix.slaveName} is obedient, ${he2}'ll fuck anything you tell ${him2} to fuck.`);
		if (impregnatrix.preg === -3) {
			r.push(`${He2} accepts a direct injection of vasodilators to counteract the hormones keeping ${him2} soft,`);
		} else {
			r.push(`${He2} hurriedly gets ${himself2} hard,`);
		}
		r.push(`only a slight hesitation betraying ${his2} realization that this is a special occasion.`);
	} else if (impregnatrix.devotion >= -20) {
		r.push(`Since ${impregnatrix.slaveName} does not resist your will, ${he2} should comply reasonably well.`);
		if (impregnatrix.preg === -3) {
			r.push(`${He2} accepts a direct injection of vasodilators to counteract the hormones keeping ${him2} soft,`);
		} else {
			r.push(`${He2} has to work to get ${himself2} hard despite ${his2} doubts,`);
		}
		r.push(`fear and disgust showing on ${his2} face as ${he2} absorbs the perversion of the natural order of things ${he2}'s about to experience.`);
	} else {
		r.push(`Since ${impregnatrix.slaveName} is unlikely to comply willingly, you simply restrain ${him2} and administer a massive dose of vasodilators, directly where they will do the most good. ${impregnatrix.slaveName} writhes with the pain of the injection, which is compounded as ${he2} springs agonizingly erect.`);
	}

	r.toParagraph();

	r.push(`Next, you see to ${slave.slaveName}.`);

	seX(slave, slave.mpreg ? "anal" : "vaginal", V.PC, "penetrative", penCountBonus);

	if ((slave.fetish === "pregnancy" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && slave.vagina === 0) || (slave.anus === 0 && slave.mpreg === 1)) {
		r.push(`${He} cries with joy and presents ${his} virgin ${assPussy} to ${impregnatrix.slaveName} for`);
		if (superfetation === 1) {
			r.push(`repeat`);
		}
		r.push(`fertilization. <span class="hotpink">${He} is grateful</span> for this fulfillment of ${his} fondest wish and naturally <span class="lime">will break in ${his} ${assPussy}.</span>`);
		if (slave.mpreg === 1) {
			slave.anus = 1;
		} else {
			slave.vagina = 1;
		}
		slave.devotion += 10;
	} else if (slave.fetish === "pregnancy" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		r.push(`${He} cries with joy and presents ${his} fertile ${assPussy} to ${impregnatrix.slaveName} for`);
		if (superfetation === 1) {
			r.push(`further`);
		}
		r.push(`breeding. <span class="hotpink">${He} is grateful</span> for this fulfillment of ${his} fondest wish.`);
		slave.devotion += 4;
	} else if (slave.devotion > 20 && (slave.vagina === 0 || (slave.anus === 0 && slave.mpreg === 1))) {
		r.push(`${He} accepts your orders without comment and presents ${his} virgin ${assPussy} to ${impregnatrix.slaveName} for fertilization. ${He} gasps in shock when ${he} feels ${his2} hot seed. <span class="hotpink">${He} is broken to slavery</span> by this application of ${his} body, which naturally <span class="lime">will break in ${his} ${assPussy}.</span>`);
		if (slave.mpreg === 1) {
			slave.anus = 1;
		} else {
			slave.vagina = 1;
		}
		slave.devotion += 10;
	} else if (slave.devotion >= -20 && (slave.vagina === 0 || (slave.anus === 0 && slave.mpreg === 1))) {
		r.push(`${He} is clearly unhappy at the idea of losing ${his} pearl of great price to ${impregnatrix.slaveName}; this probably isn't what ${he} imagined ${his} first real sex would be like. Worse, ${he} knows ${he}'s fertile and realizes`);
		if (superfetation === 1) {
			r.push(`${his} existing pregnancy is of little concern to the new life likely to take root in ${him}.`);
		} else {
			r.push(`${he}'ll likely get pregnant.`);
		}
		r.push(`Nevertheless, <span class="hotpink">${he} is broken to slavery</span> by this application of ${his} body, which naturally <span class="lime">will break in ${his} ${assPussy}.</span>`);
		if (slave.mpreg === 1) {
			slave.anus = 1;
		} else {
			slave.vagina = 1;
		}
		slave.devotion += 4;
	} else if (slave.vagina === 0 || (slave.anus === 0 && slave.mpreg === 1)) {
		r.push(`As you anticipated, ${he} refuses to give ${impregnatrix.slaveName} ${his} virginity. You restrain ${him} despite ${his} <span class="mediumorchid">horrified tears</span> and <span class="gold">frightened begging.</span> Naturally, this cruel tableau <span class="lime">will break in ${his} ${assPussy}.</span>`);
		slave.devotion -= 5;
		slave.trust -= 5;
		if (slave.mpreg === 1) {
			slave.anus = 1;
		} else {
			slave.vagina = 1;
		}
	} else if (isAmputee(slave)) {
		r.push(`You set ${his} limbless torso up for ${impregnatrix.slaveName}.`);
	} else if (tooBigBelly(slave)) {
		r.push(`You set ${him} up for ${impregnatrix.slaveName}, face-down so ${he} may rest helplessly against ${his} ${belly} belly.`);
	} else if (tooBigBreasts(slave)) {
		r.push(`You set ${him} up for ${impregnatrix.slaveName}, face-${(slave.belly >= 60000) ? `up` : `down`} so the weight of ${his} tits pins ${him} helplessly in place.`);
	} else if (tooBigButt(slave)) {
		r.push(`You set ${him} up for ${impregnatrix.slaveName}, face-down so the weight of ${his} giant ass pins ${him} helplessly in place and gives ${impregnatrix.slaveName} a lovely cushion to thrust against.`);
	} else if (tooBigDick(slave)) {
		r.push(`You set ${him} up for ${impregnatrix.slaveName}, face-up so ${he} is pinned under the weight of ${his} giant cock.`);
	} else if (tooBigBalls(slave)) {
		r.push(`You set ${him} up for ${impregnatrix.slaveName}, face-${(slave.belly >= 60000) ? `up` : `down`} so the weight of ${his} giant balls anchor ${him} helplessly in place.`);
	} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60 && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} is accustomed to submit to you, but as a natural submissive ${he} doesn't have much trouble submitting to ${impregnatrix.slaveName}'s seed instead.`);
	} else if (slave.devotion < -20) {
		r.push(`${He} tries to refuse, so you restrain ${him} despite ${his} resistance to the idea of being made a breeder.`);
	} else if (slave.devotion <= 20) {
		r.push(`${He} obeys your orders reluctantly, arranging ${himself} for ${(slave.mpreg === 1) ? `anal` : `vaginal`} sex despite ${his} obvious hesitation to be made a breeder.`);
	} else if (slave.devotion < 10) {
		r.push(`${He} obeys your orders, arranging ${himself} for ${(slave.mpreg === 1) ? `anal` : `vaginal`} sex despite ${his} slight hesitation at the idea of being made a breeder.`);
	} else {
		r.push(`${He} happily obeys your orders, getting ready to serve ${his} ${getWrittenTitle(slave)} by making ${himP} another slave.`);
	}

	knockMeUp(slave, 100, 2, impregnatrix.ID);

	r.toParagraph();

	if (slave.devotion < -20 && impregnatrix.devotion < -20) {
		r.push(`Since you have two restrained slaves, it's up to you to do all the work. You put ${slave.slaveName} on the couch with ${his} ${assPussy} available, and then maneuver ${impregnatrix.slaveName}'s dick into place. The two slaves make no further moves until you deal ${impregnatrix.slaveName} a terrific swat across the ass and promise to give ${him2} more of the same until ${he2} gets going. After watching them mechanically go at it for a while, you stop ${impregnatrix.slaveName}, insert an electrostimulator up ${his2} rectum, and administer a shock to ${his2} ${prostate} that forces ${him2} to empty ${his2} nuts into ${slave.slaveName}. Both slaves <span class="mediumorchid">resent</span> what you made them do and <span class="gold">fear you</span> as a result.`);
		slave.devotion -= 5;
		slave.trust -= 5;
		impregnatrix.devotion -= 5;
		impregnatrix.trust -= 5;
		seX(impregnatrix, "anal", V.PC);
		V.analTotal += 1;
		if (impregnatrix.anus === 0) {
			r.push(`${impregnatrix.slaveName} would have been reluctant to <span class="lime">lose ${his2} anal virginity</span> in any case, but being assraped by a metal probe that shocked ${him2} into orgasm so that ${he2} would impregnate another slave is <span class="mediumorchid">a special level</span> of violation for ${him2}.`);
			impregnatrix.devotion -= 5;
			impregnatrix.anus = 1;
		}
	} else if (impregnatrix.devotion < -20) {
		r.push(`Since your semen ${donatrix} is restrained, you order ${slave.slaveName} to present ${himself} on the couch, and then maneuver ${impregnatrix.slaveName}'s dick into place. ${slave.slaveName} does ${his} best to hump ${himself} against the unwilling cock until you deal ${impregnatrix.slaveName} a terrific swat across the ass and promise to give ${him2} more of the same until ${he2} gets going. After watching ${him2} mechanically fuck for a while, you stop ${him2}, push an electrostimulator up ${his2} butt, and administer a shock to ${his2} ${prostate} that forces ${him2} to empty ${his2} nuts into ${slave.slaveName}. ${He} <span class="mediumorchid">resents</span> what you made ${him2} do and <span class="gold">fears you</span> as a result. Though ${slave.slaveName} accepts the situation, ${he} looks into ${impregnatrix.slaveName}'s eyes with obvious apology.`);
		impregnatrix.devotion -= 5;
		impregnatrix.trust -= 5;
		seX(impregnatrix, "anal", V.PC);
		V.analTotal += 1;
		if (impregnatrix.anus === 0) {
			r.push(`${impregnatrix.slaveName} would have been reluctant to <span class="lime">lose ${his2} anal virginity</span> in any case, but being assraped by a metal probe that shocked ${him2} into orgasm so that ${he2} would impregnate another slave is <span class="mediumorchid">a special level</span> of violation for ${him2}.`);
			impregnatrix.devotion -= 5;
			impregnatrix.anus = 1;
		}
	} else if (impregnatrix.fetish === "pregnancy" && impregnatrix.fetishStrength > 60 && impregnatrix.devotion > 20 && slave.devotion < -20) {
		r.push(`You arrange ${slave.slaveName} on the couch with ${his} fertile pussy defenseless and available, and then tell the randy ${impregnatrix.slaveName} that it's all ${hers2}. The slave life has so affected ${impregnatrix.slaveName} that ${he2} is quite eager to rape another slave pregnant${(superfetation === 1) ? `, even more so since ${he} is already with child` : ``} to fulfill ${his2} desire to reproduce. ${He2} finishes with indecent speed and looks almost disappointed until you tell ${him2} to take ${his2} time and be thorough. By the end of the day ${slave.slaveName}'s ${assCunt} is dripping cum, to ${his} <span class="gold">horror</span> and <span class="mediumorchid">resentment,</span> while ${impregnatrix.slaveName} is lying next to ${him} on the couch in a state of obvious <span class="hotpink">satiation and bliss.</span> ${impregnatrix.slaveName} kisses ${slave.slaveName}'s ${belly} stomach and expresses the hope that ${he}'ll produce a good new slave.`);

		slave.devotion -= 5;
		slave.trust -= 5;
		impregnatrix.devotion += 4;
	} else if (impregnatrix.energy > 95 && impregnatrix.devotion > 20 && slave.devotion < -20) {
		r.push(`You arrange ${slave.slaveName} on the couch with ${his} fertile ${assPussy} defenseless and available, and then tell the randy ${impregnatrix.slaveName} that it's all ${hers2}. The slave life has so affected ${impregnatrix.slaveName} that ${he2} is quite eager to rape another slave pregnant${(superfetation === 1) ? `, especially since ${he} is already with child` : ``}, just for the perverted novelty of the act. ${He2} blows ${his2} load with indecent speed and looks crushed until you tell ${him2} to take ${his2} time and be thorough. By the end of the day ${slave.slaveName}'s ${(slave.mpreg === 1) ? `anus` : `cunt`} is dripping cum, to ${his} <span class="gold">horror</span> and <span class="mediumorchid">resentment,</span> while ${impregnatrix.slaveName} is lying next to ${him} on the couch in a state of obvious <span class="hotpink">satiation and bliss.</span> ${impregnatrix.slaveName} kisses ${slave.slaveName}'s ${belly} stomach and expresses the hope that you'll let ${him2} do this again ${(superfetation === 1) ? `soon` : `sometime`}.`);
		slave.devotion -= 5;
		slave.trust -= 5;
		impregnatrix.devotion += 4;
	} else if (slave.devotion <= 20 || impregnatrix.devotion <= 20) {
		r.push(`You order ${slave.slaveName} onto the couch and tell ${impregnatrix.slaveName} to get on with it. They fuck mechanically, gazing with roiling emotions into each other's eyes. They do seem to come to some sort of a nonverbal understanding on the necessity of getting it done, and there is no real unhappiness in either of them when they finish and disentangle themselves, with ${impregnatrix.slaveName}'s rapidly softening dick slipping easily out of ${slave.slaveName}'s cum-filled ${assPussy}.`);
	} else if (slave.devotion <= 50 || impregnatrix.devotion <= 50) {
		r.push(`You order ${slave.slaveName} and ${impregnatrix.slaveName} to get on with it. They fuck mechanically at first, gazing with roiling emotions into each other's eyes. Eventually, they begin to enjoy the extreme intimacy of the act, finding between themselves a hint of a life before slavery, when men and women had sex within the bonds of marriage for the purpose of procreation${(superfetation === 1) ? `, even though one of them is already heavy with child` : ``}. They finish and resume life as slaves, the light of this intimacy diminishing, softening with ${impregnatrix.slaveName}'s dick and dripping away with the contents of ${slave.slaveName}'s cum-filled ${assPussy}.`);
	} else if (slave.mpreg === 1) {
		r.push(`The parents-to-be need little encouragement. They embrace happily and turn eagerly to the business of anal sex in`);
		if (slave.belly + impregnatrix.belly >= 5000) {
			r.push(`an awkward`);
		} else {
			r.push(`the`);
		}
		r.push(`cowgirl position. They take their time, humping slowly and gazing into each other's eyes. After a little while, though, ${slave.slaveName} looks over to where you're sitting, the invitation clear in ${his} eyes. As soon as you stand to come over, ${slave.slaveName} turns around on ${impregnatrix.slaveName}'s cock and opens wide for you. You and ${impregnatrix.slaveName} enjoy the`);
		if (superfetation === 1) {
			r.push(`gravid ${girl}`);
		} else {
			r.push(`mother-to-be`);
		}
		r.push(`gently until ${he} climaxes, ${his} eager oral reaching a fever pitch, bringing you to your own climax.`);
		if (V.PC.dick !== 0) {
			if (canDoVaginal(impregnatrix)) {
				r.push(`Pulling out, you flip them again so that ${impregnatrix.slaveName} is on top and switch to ${his2} pussy instead, stimulating ${his2} ${prostate} with a good fucking until ${he2} blows ${his2} load into ${slave.slaveName}'s fertile ${assCunt}. The two of them collapse into an exhausted, <span class="hotpink">happy</span> pile of slave flesh with three loads inside them.`);
				if (impregnatrix.vagina === 0) {
					r.push(`${impregnatrix.slaveName} will certainly remember this <span class="hotpink">very special</span> day for many reasons, including it being ${his2} <span class="lime">first time</span> as ${he2} inseminated ${slave.slaveName}.`);
					impregnatrix.devotion += 4;
					impregnatrix.vagina = 1;
				}
				if (canImpreg(impregnatrix, V.PC)) {
					knockMeUp(impregnatrix, 10, 0, -1);
				}
				seX(impregnatrix, "vaginal", V.PC, "penetrative", penCountBonus);
			} else if (canDoAnal(impregnatrix)) {
				r.push(`Pulling out, you flip them again so that ${impregnatrix.slaveName} is on top and switch to ${his2} ass instead, stimulating ${his2} ${prostate} with a good assfuck until ${he2} blows ${his2} load into ${slave.slaveName}'s fertile ${assCunt}. The two of them collapse into an exhausted, <span class="hotpink">happy</span> pile of slave flesh with three loads inside them.`);
				if (impregnatrix.anus === 0) {
					r.push(`${impregnatrix.slaveName} will certainly remember this <span class="hotpink">very special</span> day for many reasons, including taking ${his2} <span class="lime">first buttfuck</span> as ${he2} inseminated ${slave.slaveName}.`);
					impregnatrix.devotion += 4;
					impregnatrix.anus = 1;
				}
				if (canImpreg(impregnatrix, V.PC)) {
					knockMeUp(impregnatrix, 10, 1, -1);
				}
				seX(impregnatrix, "anal", V.PC, "penetrative", penCountBonus);
			} else {
				r.push(`The two of them collapse into an exhausted, <span class="hotpink">happy</span> pile of slave flesh.`);
			}
		} else {
			if (canDoVaginal(impregnatrix)) {
				r.push(`Pulling back, you flip them again so that ${impregnatrix.slaveName} is on top and don a strap-on. You begin stimulating ${his2} ${prostate} with a good fucking until ${he2} blows ${his2} load into ${slave.slaveName}'s fertile ${assCunt}. The two of them collapse into an exhausted, <span class="hotpink">happy</span> pile of slave flesh.`);
				if (impregnatrix.vagina === 0) {
					r.push(`${impregnatrix.slaveName} will certainly remember this <span class="hotpink">very special</span> day for many reasons, including it being ${his2} <span class="lime">first time</span> as ${he2} inseminated ${slave.slaveName}.`);
					impregnatrix.devotion += 4;
					impregnatrix.vagina = 1;
				}
				seX(impregnatrix, "vaginal", V.PC, "penetrative", penCountBonus);
			} else if (canDoAnal(impregnatrix)) {
				r.push(`Pulling back, you flip them again so that ${impregnatrix.slaveName} is on top and don a strap-on. You begin stimulating ${his2} ${prostate} with a good assfuck until ${he2} blows ${his2} load into ${slave.slaveName}'s fertile ${assCunt}. The two of them collapse into an exhausted, <span class="hotpink">happy</span> pile of slave flesh.`);
				seX(impregnatrix, "anal", V.PC, "penetrative", penCountBonus);
				if (impregnatrix.anus === 0) {
					r.push(`${impregnatrix.slaveName} will certainly remember this <span class="hotpink">very special</span> day for many reasons, including taking ${his2} <span class="lime">first buttfuck</span> as ${he2} inseminated ${slave.slaveName}.`);
					impregnatrix.devotion += 4;
					impregnatrix.anus = 1;
				}
			} else {
				r.push(`The two of them collapse into an exhausted, <span class="hotpink">happy</span> pile of slave flesh.`);
			}
		}
		seX(impregnatrix, "oral", V.PC, "penetrative", penCountBonus);
		slave.devotion += 4;
		impregnatrix.devotion += 4;
	} else {
		let didImpregnatrix = 0;
		r.push(`The parents-to-be need little encouragement. They embrace happily and turn eagerly to the business of vanilla sex in`);
		if (slave.belly + impregnatrix.belly >= 5000) {
			r.push(`an awkward`);
		} else {
			r.push(`the`);
		}
		r.push(`missionary position. They take their time, humping slowly and gazing into each other's eyes. After a little while, though, ${slave.slaveName} looks over ${impregnatrix.slaveName}'s shoulder to where you're sitting, the invitation clear in ${his} eyes. As soon as you stand to come over, they roll over without being ordered to`);
		if (canDoAnal(slave)) {
			r.push(`present ${slave.slaveName}'s butthole.`);

			seX(slave, "anal", V.PC, "penetrative", penCountBonus);
		} else {
			r.push(`invite you into ${slave.slaveName}'s crowded pussy.`);

			seX(slave, "vaginal", V.PC, "penetrative", penCountBonus);
		}
		r.push(`You and ${impregnatrix.slaveName} double penetrate the`);
		if (superfetation === 1) {
			r.push(`gravid ${girl}`);
		} else {
			r.push(`mother-to-be`);
		}
		r.push(`gently until ${he} climaxes, clenching you to orgasm in turn with ${his} spasms. Pulling out, you offer`);
		if (V.PC.dick !== 0) {
			r.push(`yourself`);
		} else {
			r.push(`your strap-on`);
		}
		r.push(`to ${slave.slaveName}'s gasping mouth so ${he} can`);

		if (V.PC.dick !== 0) {
			r.push(`suck you hard again`);
		} else {
			r.push(`lube the phallus with some saliva`);
		}
		r.push(`as ${he} continues riding cock. Once`);
		if (V.PC.dick !== 0) {
			r.push(`stiff,`);
		} else {
			r.push(`the strap-on is nice and wet,`);
		}
		r.push(`you flip them again so that ${impregnatrix.slaveName} is back on top and switch to ${his2}`);
		if (canDoVaginal(impregnatrix)) {
			r.push(`feminine slit instead, stimulating ${his2} ${prostate} with a hard fucking`);
			didImpregnatrix = 1;
		} else if (canDoAnal(impregnatrix)) {
			r.push(`ass instead, stimulating ${his2} ${prostate} with a good assfuck`);
			didImpregnatrix = 2;
		} else {
			r.push(`mouth instead, giving ${him2} a good facefuck`);
			seX(impregnatrix, "oral", V.PC, "penetrative", penCountBonus);
		}
		r.push(`until ${he2} blows ${his2} load into ${slave.slaveName}'s fertile cunt. The two of them collapse into an exhausted, <span class="hotpink">happy</span> pile of slave flesh with three loads inside them.`);
		slave.devotion += 4;
		impregnatrix.devotion += 4;
		if (didImpregnatrix === 1) {
			if (impregnatrix.vagina === 0) {
				r.push(`${impregnatrix.slaveName} will certainly remember this <span class="hotpink">very special</span> day for many reasons, including losing ${his2} <span class="lime">virginity</span> as ${he2} inseminated ${slave.slaveName}.`);
				impregnatrix.devotion += 4;
				impregnatrix.vagina = 1;
			}
			seX(impregnatrix, "vaginal", V.PC, "penetrative", penCountBonus);
			if (canImpreg(impregnatrix, V.PC)) {
				knockMeUp(impregnatrix, 10, 0, -1);
			}
		} else if (didImpregnatrix === 2) {
			if (impregnatrix.anus === 0) {
				r.push(`${impregnatrix.slaveName} will certainly remember this <span class="hotpink">very special</span> day for many reasons, including taking ${his2} <span class="lime">first buttfuck</span> as ${he2} inseminated ${slave.slaveName}.`);
				impregnatrix.devotion += 4;
				impregnatrix.anus = 1;
			}
			seX(impregnatrix, "anal", V.PC, "penetrative", penCountBonus);
			if (canImpreg(impregnatrix, V.PC)) {
				knockMeUp(impregnatrix, 10, 1, -1);
			}
		}
		if (slave.anus === 0 && canDoAnal(slave)) {
			r.push(`${slave.slaveName}`);
			r.push(`has been used as a slave in a truly thorough way today: ${he} has <span class="hotpink">accepted</span> both ${his} <span class="lime">first anal</span> and insemination by ${impregnatrix.slaveName}.`);
			slave.devotion += 4;
			slave.anus = 1;
		}
	}

	r.push(`Throughout the week, you keep ${slave.slaveName}'s ${assPussy} intimate with ${impregnatrix.slaveName}'s cock. In the end, you are certain ${slave.slaveName}`);
	if (superfetation === 1) {
		r.push(`has <span class="lime">added ${impregnatrix.slaveName}'s child</span> to ${his} pregnancy.`);
	} else {
		r.push(`is <span class="lime">carrying ${impregnatrix.slaveName}'s child.</span>`);
	}

	if (FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1) {
		r.push(`Rumors spread about you breeding your slaves; the Societal Elite are <span class="red">displeased</span> by these rumors.`);
		V.failedElite += 1;
	}

	if (FutureSocieties.isActive('FSGenderRadicalist') && slave.mpreg) {
		r.push(`Society <span class="reputation inc">approves</span> of your breeding your slave's ass; this advances the ideal all a slave needs is ${his} rear.`);
		FutureSocieties.Change("FSGenderRadicalist", 1);
	} else if (FutureSocieties.isActive('FSGenderFundamentalist')) {
		if (slave.mpreg) {
			r.push(`Society <span class="reputation dec">is disgusted</span> by this degenerate form of reproduction.`);
			FutureSocieties.Change("FSGenderFundamentalist", -1);
		} else {
			r.push(`Society <span class="reputation inc">approves</span> of your breeding your slaves; this advances the ideal of a durable, self propagating race of slaves`);
			FutureSocieties.Change("FSGenderFundamentalist", 1);
		}
	}

	r.toParagraph();

	r.push(`You prepare the necessary file on their possible offspring. Upon birth, it will be remanded to a slave orphanage to be raised to the age of ${V.minimumSlaveAge} and then sold, but its likely appearance and traits are already worth noting. ${slave.slaveName} and ${impregnatrix.slaveName}'s offspring will be genetically inclined toward`);

	if (V.seeRace === 1) {
		if (slave.race === "white" && impregnatrix.race === "white") {
			r.push(`pure white racial`);
		} else if (slave.race === "asian" && impregnatrix.race === "asian") {
			r.push(`pure Asian racial`);
		} else if (slave.race === "latina" && impregnatrix.race === "latina") {
			r.push(`pure Latina racial`);
		} else if (slave.race === "black" && impregnatrix.race === "black") {
			r.push(`pure black racial`);
		} else if (slave.race === "middle eastern" && impregnatrix.race === "middle eastern") {
			r.push(`pure Middle Eastern racial`);
		} else if (slave.race === "malay" && impregnatrix.race === "malay") {
			r.push(`pure Malay racial`);
		} else if (slave.race === "white" && impregnatrix.race === "black") {
			r.push(`mulatto racial`);
		} else if (slave.race === "black" && impregnatrix.race === "white") {
			r.push(`mulatto racial`);
		} else if (slave.race === "white" && impregnatrix.race === "latina") {
			r.push(`mestizo racial`);
		} else if (slave.race === "latina" && impregnatrix.race === "white") {
			r.push(`mestizo racial`);
		} else if (slave.race === "asian" && impregnatrix.race === "black") {
			r.push(`Afro-Asian racial`);
		} else if (slave.race === "black" && impregnatrix.race === "asian") {
			r.push(`Afro-Asian racial`);
		} else if (slave.race === "middle eastern" && impregnatrix.race === "black") {
			r.push(`Afro-Arab racial`);
		} else if (slave.race === "black" && impregnatrix.race === "middle eastern") {
			r.push(`Afro-Arab racial`);
		} else if (slave.race === "indo-aryan" && impregnatrix.race === "black") {
			r.push(`Afro-Indian racial`);
		} else if (slave.race === "black" && impregnatrix.race === "indo-aryan") {
			r.push(`Afro-Indian racial`);
		} else if (slave.race === "amerindian" && impregnatrix.race === "white") {
			r.push(`mestizo racial`);
		} else if (slave.race === "white" && impregnatrix.race === "amerindian") {
			r.push(`mestizo racial`);
		} else if (slave.race === "catgirl" || impregnatrix.race === "catgirl") {
			r.push(`catgirl racial`);
		} else if (slave.race === impregnatrix.race && slave.race !== "mixed race" && impregnatrix.race !== "mixed race") {
			r.push(`ethnically pure`);
		} else if (slave.race !== impregnatrix.race && slave.race !== "mixed race" && impregnatrix.race !== "mixed race") {
			r.push(`biracial`);
		} else {
			r.push(`mixed ethnic`);
		}
		r.push(`traits,`);
	}

	// reusable variable to hold the means of the parents' stats
	let childStats = 0;

	// face
	childStats = (V.genePool.find(function(s) { return s.ID === slave.ID; }).face + V.genePool.find(function(s) { return s.ID === impregnatrix.ID; }).face) / 2;
	if (childStats > 95) {
		r.push(`astonishingly beautiful`);
	} else if (childStats > 50) {
		r.push(`beautiful`);
	} else if (childStats > 10) {
		r.push(`attractive`);
	} else if (childStats < -95) {
		r.push(`terribly ugly`);
	} else if (childStats < -50) {
		r.push(`ugly`);
	} else if (childStats < -15) {
		r.push(`unattractive`);
	} else {
		r.push(`ordinary`);
	}
	r.push(`facial features,`);

	// intelligence
	childStats = (V.genePool.find(function(s) { return s.ID === slave.ID; }).intelligence + V.genePool.find(function(s) { return s.ID === impregnatrix.ID; }).intelligence) / 2;
	if (childStats > 95) {
		r.push(`genius-level`);
	} else if (childStats > 50) {
		r.push(`great`);
	} else if (childStats > 15) {
		r.push(`above average`);
	} else if (childStats < -95) {
		r.push(`severely impaired`);
	} else if (childStats < -50) {
		r.push(`quite low`);
	} else if (childStats < -15) {
		r.push(`below average`);
	} else {
		r.push(`average`);
	}
	r.push(`intelligence,`);

	// height
	childStats = (slave.natural.height + impregnatrix.natural.height) / 2;
	if (childStats > 185) {
		r.push(`towering`);
	} else if (childStats > 170) {
		r.push(`tall`);
	} else if (childStats > 155) {
		r.push(`average`);
	} else if (childStats > 140) {
		r.push(`short`);
	} else {
		r.push(`diminutive`);
	}
	r.push(`stature,`);

	// boobs
	childStats = (slave.natural.boobs + impregnatrix.natural.boobs) / 2;
	if (childStats > 6400) {
		r.push(`inhumanly large`);
	} else if (childStats > 3200) {
		r.push(`enormous`);
	} else if (childStats > 1600) {
		r.push(`huge`);
	} else if (childStats > 800) {
		r.push(`large`);
	} else if (childStats > 400) {
		r.push(`moderate`);
	} else {
		r.push(`tiny`);
	}
	r.push(`breasts, and`);

	// butt - not currently a heritable genetic trait
	childStats = (slave.butt + impregnatrix.butt - slave.buttImplant - impregnatrix.buttImplant) / 2;
	if (childStats > 7) {
		r.push(`gargantuan`);
	} else if (childStats > 5) {
		r.push(`massive`);
	} else if (childStats > 3) {
		r.push(`large`);
	} else if (childStats > 2) {
		r.push(`healthy`);
	} else if (childStats > 1) {
		r.push(`small`);
	} else {
		r.push(`flat`);
	}
	r.push(`buttocks.`);

	r.toParagraph();
	return r.container();
};
