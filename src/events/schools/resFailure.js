App.Events.RESFailure = class RESFailure extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!Array.from(App.Data.misc.schools.keys()).some(s => V[s].schoolPresent && V[s].schoolProsperity <= -10)
		];
	}

	actorPrerequisites() {
		return [];
	}

	execute(node) {
		let r = [];

		const failedSchool = Array.from(App.Data.misc.schools.keys()).find(s => V[s].schoolPresent && V[s].schoolProsperity <= -10);
		const SCH = App.Data.misc.schools.get(failedSchool);

		repX(-200, "event");
		V.arcologies[0].prosperity -= 2;
		const slavesToAdd = 5;
		V[failedSchool].schoolPresent = 0;
		V[failedSchool].subsidize = 0;
		V[failedSchool].schoolProsperity = 0;
		V[failedSchool].schoolAnnexed = 1;
		/** @type {App.Entity.SlaveState[]} */
		const slaveArray = [];
		if (failedSchool === "TSS") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("TSS");
				if (V.TSS.schoolUpgrade === 1) {
					slave.origin = "$He was given to you by a failed branch campus of the Slavegirl School after $he was retrained as a slave $girl.";
				} else {
					slave.origin = "$He was given to you by a failed branch campus of the Slavegirl School right after $his majority.";
				}
				slaveArray.push(slave);
			}
		} else if (failedSchool === "TUO") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("TUO");
				slave.origin = "$He was given to you by a failed branch of The Utopian Orphanage right after $his graduation.";
				slaveArray.push(slave);
			}
		} else if (failedSchool === "TCR") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("TCR");
				if (slave.career === "a breeding bull") {
					slave.geneticQuirks.wellHung = 2;
					slave.origin = "$He is a prized breeding bull given to you by a failed local pasture of The Cattle Ranch.";
				} else {
					slave.geneticQuirks.hyperFertility = 2;
					slave.counter.birthsTotal *= 2;
					slave.hips += 1;
					slave.butt += 1;
					slave.boobs += 200;
					slave.vaginaLube = 2;
					slave.origin = "$He is a prized dairy cow given to you by a failed local pasture of The Cattle Ranch.";
				}
				slave.boobsTat = "bovine patterns";
				slave.buttTat = "bovine patterns";
				slave.vaginaTat = "bovine patterns";
				slave.lipsTat = "bovine patterns";
				slave.anusTat = "bovine patterns";
				slave.shouldersTat = "bovine patterns";
				slave.backTat = "bovine patterns";
				slave.armsTat = "bovine patterns";
				slave.legsTat = "bovine patterns";
				slave.stampTat = "bovine patterns";
				slaveArray.push(slave);
			}
		} else if (failedSchool === "GRI") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("GRI");
				slave.origin = "$He was given to you by a failed subsidiary lab of the Growth Research Institute right after $his use as a test subject ended.";
				slaveArray.push(slave);
			}
		} else if (failedSchool === "SCP") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("SCP");
				slave.origin = "$He was given to you by a failed branch campus of St. Claver Preparatory after $he served as a plastic surgeon's passing final exam.";
				slaveArray.push(slave);
			}
		} else if (failedSchool === "LDE") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("LDE");
				slave.origin = "$He was given to you by a failed branch campus of the innovative École des Enculées right after $his graduation.";
				if (random(1, 100) > 75) {
					slave.geneticQuirks.rearLipedema = 2;
					slave.butt = random(6, 16);
				}
				slaveArray.push(slave);
			}
		} else if (failedSchool === "NUL") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("NUL");
				slave.origin = "$He was given to you by a failed branch campus of Nueva Universidad de Libertad right after $his graduation.";
				slaveArray.push(slave);
			}
		} else if (failedSchool === "TGA") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("TGA");
				slave.origin = "$He was given to you by a failed branch campus of the intense Gymnasium-Academy right after $his majority.";
				slaveArray.push(slave);
			}
		} else if (failedSchool === "HA") {
			for (let i = 0; i < slavesToAdd; i++) {
				const {slave} = generateMarketSlave("HA");
				slave.origin = "$He was given to you by a failed branch campus of the Hippolyta Academy.";
				slaveArray.push(slave);
			}
		} else if (failedSchool === "TFS") {
			// normal slaves
			for (let i = 0; i < slavesToAdd-1; i++) {
				const {slave} = generateMarketSlave("TFS");
				slave.origin = "$He was a Futanari Sister until you engineered $his early enslavement.";
				slaveArray.push(slave);
			}
			// Matron
			const SGProp = new GenerateNewSlavePram();
			SGProp.disableDisability = 1;
			SGProp.minAge = 40;
			SGProp.maxAge = 42;
			const slave = GenerateNewSlave("XY", SGProp);
			slave.origin = "$He was the leader of your arcology's Futanari Sisters until you engineered $his community's failure and enslavement.";
			slave.career = "a Futanari Sister";
			slave.intelligence = random(51, 95);
			slave.chem = 300;
			slave.butt = either(8, 9);
			slave.hips = 2;
			slave.face = 100;
			slave.boobs = 100 * random(44, 60);
			slave.dick = random(5, 6);
			if (slave.foreskin > 0) {
				slave.foreskin = slave.dick;
			}
			if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek+15 <= V.week) {
				slave.balls = slave.scrotum = 10;
			} else {
				slave.balls = slave.scrotum = (V.TFS.schoolUpgrade === 1 ? 0 : random(5, 6));
			}
			slave.skill.penetrative = 100;
			slave.lips = random(25, 55);
			slave.weight = 50;
			slave.vagina = 3;
			slave.anus = 3;
			slave.fetish = "dom";
			slave.preg = -3;
			if (V.TFS.farmUpgrade > 0) {
				slave.ovaries = 1;
				slave.preg = -1;
				if (V.TFS.farmUpgrade >= 2) {
					slave.preg = random(1, 41);
					if (V.TFS.farmUpgrade === 3) {
						slave.pregType = random(20, 40);
						slave.pregAdaptation = 500;
					} else {
						slave.pregType = 1;
					}
					slave.pregKnown = 1;
					slave.pregWeek = slave.preg;
					SetBellySize(slave);
				}
			}
			slave.intelligenceImplant = 30;
			slave.teeth = "normal";
			slave.energy = (V.TFS.schoolUpgrade === 2 ? 100 : slave.physicalAge + random(20, 30));
			slave.devotion = random(25, 30);
			slave.trust = random(10, 15);
			setHealth(slave, jsRandom(60, 80), 0, 0, 0);
			slave.muscles = 20;
			slave.waist = -15;
			slave.shoulders = 1;
			slave.skill.vaginal = 100;
			slave.skill.oral = 100;
			slave.skill.anal = 100;
			slave.skill.whoring = 15;
			slave.skill.entertainment = 100;
			slave.skill.combat = 0;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			if (V.TFS.schoolUpgrade === 1) {
				slave.sexualQuirk = "caring";
			}
			slave.sexualFlaw = either("judgemental", "none");
			slave.behavioralFlaw = either("arrogant", "none");
			slave.fetishStrength = 100;
			slave.fetishKnown = 0;
			slave.attrKnown = 0;
			slave.hStyle = "neat";
			slave.hLength = 150;
			slave.custom.tattoo = "$He has a simple pink heart tattooed on $his right temple.";
			slaveArray.push(slave);
		} else {
			r.push(`Error: school "${failedSchool}" not found.`);
		}

		const {
			He, His,
			he, his, him, himself, girl
		} = getPronouns(slaveArray[0]);
		const he2 = (failedSchool !== "NUL" ? "he" : "they");
		const He2 = capFirstChar(he2);
		const {title: Master} = getEnunciation(slaveArray[0]);

		if (failedSchool === "TFS") {
			r.push(`The senior Sister of the community of Futanari Sisters in your arcology appears at your penthouse, as you've been expecting since their second missed rent payment. This is quite the occasion, since they never leave their little nest. ${He}'s delightfully nude, and it occurs to you that the Sisters probably do not own clothing at all. ${He} has obviously been crying; puffy eyes and a sniffling nose mar ${his} gorgeous face. ${He} must have caused quite the sensation as ${he} made ${his} way here, in tears, gigantic tits and huge cock bouncing around. To your surprise, ${he} flings ${himself} at your feet, ${his} dick making a painful-sounding slap against the floor and ${his} breasts squashing out to either side of ${him}.`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`"Please," ${he} cries to your feet. "Please take us as slaves. We're indebted, and we'll all be enslaved. You're our friend, you'll treat us better than anyone." Then ${he} whispers, "Please,`);
			if (V.PC.slaveSurname) {
				if (V.PC.title) {
					r.push(`Mr.`);
				} else {
					r.push(`Ms.`);
				}
				r.push(`${V.PC.slaveSurname},`);
			} else {
				r.push(`${V.PC.slaveName},`);
			}
			r.push(`don't make me beg." You tell the prostrate futa you accept. ${His} mood does not improve: ${he} scrabbles around to face away from you, plush body jiggling submissively, and raises ${his} buttocks to spread ${his} pussy and anus for you. "Thank you," ${he} weeps. "Now please rape me, ${Master}. I deserve it. My mismanagement stole my Sisters' years of idyll from them. Please, rape me."`);
			App.Events.addParagraph(node, r);
			r = [];
			App.Events.addResponses(node, [
				new App.Events.Result(`Rape ${him}`, TFSRape)
			]);
		} else {
			r.push(`You receive a personal call from a senior representative of ${SCH.title} as you've been expecting since their second missed rent payment. "I apologize," ${he2} says with some embarrassment, "but it seems our expansion into your arcology was a mistake. It's strange — the business climate seemed excellent, and other corporations are doing well."`);
			r.push(`${He2} sighs "Nevertheless, nothing ever seemed to go as planned. We'll be shutting our ${SCH.branchName} down immediately. In fact, it should be shut down within the hour.`);
			if (failedSchool === "TCR") {
				r.push(`However, we lack the funds to remove some of our finest ${SCH.slaveNoun} and since we still owe you a little... We'd like to you to have them; we'll even have them delivered to your penthouse with the last of our credits."`);
			} else {
				r.push(`I regret to add," ${he2} says nervously, "that we're experiencing continued difficulty finding the liquidity to pay what we owe you.`);
				if (failedSchool === "GRI") {
					r.push(`The lab we're closing has five solid ${SCH.slaveNoun}.`);
				} else {
					r.push(`The branch campus we're closing has five recent ${SCH.slaveNoun}.`);
				}
				r.push(`We'd like to transfer them to you in lieu of payment."`);
				r.push(`${He2} hurriedly ends the call.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
		}

		r.push(`The failure of a prominent organization within your arcology has <span class="red">affected your reputation</span> and <span class="red">your arcology's prosperity</span> slightly, but you've come out a long way ahead. You can acquire these excellent ${SCH.slaveNoun} for a pitiful fraction of their fair price.`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Enslave the ${SCH.slaveNoun} for no cost`, enslave),
			new App.Events.Result(`Sell your prizes immediately`, sell)
		]);

		function enslave() {
			for (const slave of slaveArray) {
				newSlave(slave);
				if (failedSchool === "TFS") {
					V.RECheckInIDs.push({ID: slave.ID, type: "futa"});
				}
			}
			return `${capFirstChar(SCH.slaveNoun)} acquired.`;
		}

		function sell() {
			slaveArray.forEach(s => cashX(slaveCost(s), "slaveTransfer"));
			return `Prizes sold.`;
		}

		function TFSRape() {
			const frag = new DocumentFragment();
			let r = [];
			const isMatron = (s) => (s.origin === "$He was the leader of your arcology's Futanari Sisters until you engineered $his community's failure and enslavement.") && (s.newGamePlus !== 1);
			// player can choose "Rape her" before or after the other choices...if she's not been enslaved yet, alter her template instead
			const matron = V.slaves.find(isMatron) || slaveArray.find(isMatron);
			matron.devotion += 10;
			seX(matron, "anal", V.PC, "penetrative");
			seX(matron, "vaginal", V.PC, "penetrative");
			r.push(`You`);
			if (V.PC.dick !== 0) {
				r.push(`whip out your dick`);
			} else {
				r.push(`pull on a strap-on, the one you use for disobedient slaves,`);
			}
			r.push(`and kneel down behind the sobbing futa matron. When ${he} feels it touching ${his} pussylips, ${he} whispers "Thank you, ${Master}," through ${his} tears. ${He}'s very, very sexually experienced, so it's harder to make ${him} feel it than it would be for a ${girl} with tighter holes. But you're an expert. You calibrate your pounding to pull just barely too far out, so that ${he} feels you ramming mercilessly into ${him} with each stroke, and so that the slightest mistake from ${him} sends`);
			if (V.PC.dick !== 0) {
				r.push(`your cock`);
			} else {
				r.push(`the phallus`);
			}
			r.push(`right up the other hole. Despite ${his} anguish and the brutal fuck, or perhaps because of them, ${he} slowly manages to get hard, and orgasms painfully when you do. ${He} <span class="hotpink">can't seem to stop thanking you,</span> but is quiet when you tell ${him} to be.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
