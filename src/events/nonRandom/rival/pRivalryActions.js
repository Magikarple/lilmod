// cSpell:ignore Macrophile, Epheb, exfiltrating, EKIA

App.Events.pRivalryActions = function() {
	return execute();

	function execute() {
		const node = new DocumentFragment();
		let r = [];
		V.rival.duration++;

		const {
			HisR, HeR,
			hisR, himR
		} = getPronouns({pronoun: (V.rival.gender === 2) ? 1 : 0}).appendSuffix("R");
		const {girlU, hisU, himU, heU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		const {heA, hisA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {woman2, he2, his2, him2, mother2, wife2} = getPronouns(V.hostageWife || {pronoun: 0}).appendSuffix("2");

		r.push(`Your inter-arcology war with the arcology owner behind the Daughters of Liberty has dragged on for ${num(V.rival.duration)} ${(V.rival.duration > 1) ? `weeks` : `week`}. The tone of your arcology is a bit more somber than usual. You have enhanced security in place, and the populace has caught the mood.`);

		if (V.rival.hostageState === 1 && V.hostage) {
			App.Events.drawEventArt(node, V.hostage);
			const {
				He, His,
				he, him, himself, his, girl, woman
			} = getPronouns(V.hostage);
			const seed = random(1, 100);

			if (V.rival.duration >= 30) {
				r.push(`The latest message from your rival is a live communication.`);
			} else {
				r.push(`The latest message from your rival recently arrived, showing ${SlaveFullName(V.hostage)}`);
			}
			if (V.rival.duration === 1) {
				switch (V.rival.FS.name) {
					case "Racial Subjugationism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.behavioralFlaw = "arrogant";
						V.hostage.sexualFlaw = "shamefast";
						r.push(`bound and offered to a pair of ${V.arcologies[0].FSSubjugationistRace} girls.`);
						break;
					case "Racial Supremacism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.behavioralFlaw = "odd";
						V.hostage.sexualFlaw = "repressed";
						r.push(`being registered as a piece of ${V.arcologies[0].FSSupremacistRace} meat, fit only to be abused.`);
						break;
					case "Repopulation Focus":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 5;
						V.hostage.counter.vaginal += 5;
						V.hostage.counter.anal += 5;
						V.hostage.counter.mammary += 5;
						V.hostage.behavioralQuirk = "adores men";
						V.hostage.sexualQuirk = "caring";
						r.push(`being operated on to remove ${his} fertility.`);
						break;
					case "Eugenics":
						if (V.seeHyperPreg !== 1) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.preg = 4;
							V.hostage.pregType = 8;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.rival.duration;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.vagina = 2;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							V.hostage.behavioralFlaw = "odd";
							V.hostage.sexualFlaw = "hates penetration";
							r.push(`undergoing a fertility screening; the video ends with the positive results.`);
						} else {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.preg = 4;
							V.hostage.pregType = 40;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.rival.duration;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.vagina = 2;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							V.hostage.behavioralFlaw = "odd";
							V.hostage.sexualFlaw = "hates penetration";
							r.push(`undergoing a fertility screening; the video ends with the positive results.`);
						}
						break;
					case "Gender Radicalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.behavioralFlaw = "arrogant";
						V.hostage.sexualFlaw = "idealistic";
						V.hostage.fetish = "none";
						r.push(`having measurements taken for ${his} new station in life.`);
						break;
					case "Gender Fundamentalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.anal += 10;
						V.hostage.behavioralFlaw = "hates men";
						V.hostage.sexualFlaw = "hates anal";
						r.push(`begging for ${his} anal virginity to not be taken.`);
						break;
					case "Paternalism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.piercing.ear.weight = 1;
						V.hostage.piercing.nose.weight = 1;
						V.hostage.piercing.nipple.weight = 0;
						V.hostage.piercing.lips.weight = 0;
						V.hostage.piercing.vagina.weight = 0;
						V.hostage.piercing.anus.weight = 0;
						V.hostage.piercing.genitals.weight = 0;
						V.hostage.piercing.genitals.smart = false;
						V.hostage.piercing.eyebrow.weight = 0;
						V.hostage.piercing.navel.weight = 0;
						V.hostage.piercing.corset.weight = 0;
						V.hostage.piercing.areola.weight = 0;
						V.hostage.piercing.tongue.weight = 0;
						V.hostage.boobsTat = 0;
						V.hostage.buttTat = 0;
						V.hostage.vaginaTat = 0;
						V.hostage.lipsTat = 0;
						V.hostage.anusTat = 0;
						V.hostage.shouldersTat = 0;
						V.hostage.backTat = 0;
						V.hostage.armsTat = 0;
						V.hostage.legsTat = 0;
						V.hostage.stampTat = "degradation";
						V.hostage.behavioralFlaw = "odd";
						V.hostage.sexualFlaw = "apathetic";
						r.push(`crying as ${his} nose and ears are pierced and the first of many tattoos inked into ${his} flesh.`);
						break;
					case "Degradationism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.behavioralFlaw = "liberated";
						V.hostage.sexualFlaw = "idealistic";
						r.push(`being shown to ${his} luxurious new room, complete with heart-shaped love bed.`);
						break;
					case "Body Purism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.boobs += 2000;
						V.hostage.boobsImplant += 2000;
						V.hostage.boobsImplantType = "advanced fillable";
						V.hostage.behavioralFlaw = "anorexic";
						V.hostage.sexualFlaw = "shamefast";
						r.push(`struggling against ${his} restraints on the operating table as a pair of 2000cc implants are forced into ${his} chest.`);
						break;
					case "Transformation Fetishism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.behavioralFlaw = "anorexic";
						V.hostage.sexualFlaw = "shamefast";
						r.push(`being carefully checked for any implants.`);
						break;
					case "Youth Preferentialism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 1;
						V.hostage.counter.vaginal += 1;
						V.hostage.counter.anal += 1;
						V.hostage.behavioralFlaw = "bitchy";
						V.hostage.sexualFlaw = "idealistic";
						r.push(`bound and offered to an older ${woman2}.`);
						break;
					case "Maturity Preferentialism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 1;
						V.hostage.counter.vaginal += 1;
						V.hostage.counter.anal += 1;
						V.hostage.behavioralFlaw = "bitchy";
						V.hostage.sexualFlaw = "idealistic";
						r.push(`bound and offered to a young ${woman2}.`);
						break;
					case "Slimness Enthusiasm":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.boobs += 1500;
						V.hostage.butt = 4;
						V.hostage.behavioralFlaw = "anorexic";
						V.hostage.sexualFlaw = "crude";
						r.push(`screaming as ${he} watches ${his} breasts swell from the intense amount of A-HGH being pumped into them.`);
						break;
					case "Asset Expansionism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.behavioralFlaw = "bitchy";
						V.hostage.sexualFlaw = "shamefast";
						r.push(`being weighed and measured to document ${his} trim body.`);
						break;
					// case "Physical IdealismOLD": // FIXME: Remove duplicate case?
					// 	V.hostage.lactation = 2;
					// 	V.hostage.lactationDuration = 2;
					// 	V.hostage.trust -= 5;
					// 	V.hostage.devotion -= 5;
					// 	V.hostage.boobs += 1000;
					// 	V.hostage.weight = 0;
					// 	V.hostage.butt = 4;
					// 	V.hostage.behavioralFlaw = "anorexic";
					// 	V.hostage.sexualFlaw = "shamefast";
					// 	r.push(`standing in front of a mirror sobbing as droplets of milk form on ${his} ${V.hostage.nipples} nipples, courtesy of ${his} newly implanted lactation drugs.`);
					// 	break;
					case "Pastoralism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.muscles = 0;
						V.hostage.behavioralFlaw = "gluttonous";
						V.hostage.sexualFlaw = "shamefast";
						r.push(`being weighed and measured to determine the best way to replace ${his} fat with muscle.`);
						break;
					case "Physical Idealism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.boobs = 400;
						V.hostage.weight = 10;
						V.hostage.counter.vaginal += 28;
						V.hostage.vagina = 2;
						V.hostage.butt = 2;
						V.hostage.behavioralFlaw = "anorexic";
						V.hostage.sexualFlaw = "hates penetration";
						r.push(`struggling with a feeding tube down ${his} throat, ${his} belly heavily bloated with fattening slave food, ${his} body already looking a little soft. ${He} is being forcibly fucked, ${his} taut middle jiggling slightly with each thrust; 28 tallies are already drawn over ${his} pussy.`);
						break;
					case "Hedonistic Decadence":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.muscles = 0;
						V.hostage.behavioralFlaw = "gluttonous";
						V.hostage.sexualFlaw = "shamefast";
						r.push(`being weighed and measured to determine the best way to replace ${his} fat with muscle.`);
						break;
					case "Chattel Religionism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.behavioralFlaw = "arrogant";
						V.hostage.sexualFlaw = "repressed";
						r.push(`bound and being introduced to ${his} new lifestyle.`);
						break;
					case "Multiculturalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.counter.mammary += 10;
						V.hostage.behavioralFlaw = "liberated";
						V.hostage.sexualFlaw = "repressed";
						r.push(`being inducted into ${his} new religion.`);
						break;
					case "Intellectual Dependency":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.behavioralFlaw = "bitchy";
						V.hostage.sexualFlaw = "apathetic";
						r.push(`bound and being introduced to ${his} new curriculum.`);
						break;
					case "Slave Professionalism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.counter.vaginal += 10;
						V.hostage.energy += 5;
						V.hostage.addict += 2;
						V.hostage.hLength += 7;
						V.hostage.behavioralFlaw = "arrogant";
						V.hostage.sexualFlaw = "repressed";
						r.push(`bound and being read the details of the drugs that will be correcting ${his} body and mind.`);
						break;
					case "Petite Admiration":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 1;
						V.hostage.counter.vaginal += 1;
						V.hostage.counter.anal += 1;
						V.hostage.behavioralFlaw = "liberated";
						V.hostage.sexualFlaw = "idealistic";
						r.push(`bound and offered to a towering ${woman2}.`);
						break;
					case "Statuesque Glorification":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 1;
						V.hostage.counter.vaginal += 1;
						V.hostage.counter.anal += 1;
						V.hostage.behavioralFlaw = "liberated";
						V.hostage.sexualFlaw = "judgemental";
						r.push(`tied down and offered to a tiny ${woman2}.`);
						break;
					default:
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.behavioralFlaw = "arrogant";
						V.hostage.sexualFlaw = "repressed";
						r.push(`bound and being introduced to ${his} new lifestyle.`);
				}
			} else if (V.rival.duration === 6) {
				switch (V.rival.FS.name) {
					case "Racial Subjugationism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`no longer trying to escape from the ${V.arcologies[0].FSSubjugationistRace} girls.`);
						break;
					case "Racial Supremacism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						if (V.hostage.vagina < 2) {
							V.hostage.vagina = 2;
						}
						if (V.hostage.anus < 2) {
							V.hostage.anus = 2;
						}
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.fetish = "masochist";
						V.hostage.fetishStrength = 10;
						r.push(`beginning to lose hope in ever being something more than just a piece of ${V.arcologies[0].FSSupremacistRace} meat.`);
						break;
					case "Repopulation Focus":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 5;
						V.hostage.counter.vaginal += 5;
						V.hostage.counter.anal += 5;
						V.hostage.counter.mammary += 5;
						r.push(`beginning to come to terms with ${his} lack of fertility.`);
						break;
					case "Eugenics":
						if (V.seeHyperPreg !== 1) {
							r.push(`groping ${his} rounded tummy, blushing thoroughly as ${he} explores ${his} new curve.`);
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.preg = 11;
							V.hostage.pregType = 8;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.rival.duration;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							V.hostage.fetish = "pregnancy";
							V.hostage.fetishStrength = 10;
						} else {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.preg = 11;
							V.hostage.pregType = 40;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.rival.duration;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.boobs += 100;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							V.hostage.fetish = "pregnancy";
							V.hostage.fetishStrength = 10;
							r.push(`groping ${his} massively distended belly, blushing thoroughly as ${he} explores ${his} new curve.`);
						}
						break;
					case "Gender Radicalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`trying on new clothes while ${he} thinks no-one is watching.`);
						break;
					case "Gender Fundamentalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.anus = 2;
						V.hostage.counter.anal += 10;
						V.hostage.fetish = "buttslut";
						V.hostage.fetishStrength = 10;
						r.push(`questioning why getting buttfucked is starting to feel so good.`);
						break;
					case "Paternalism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.heels = 1;
						V.hostage.piercing.ear.weight = 1;
						V.hostage.piercing.nose.weight = 1;
						V.hostage.piercing.nipple.weight = 1;
						V.hostage.piercing.lips.weight = 1;
						V.hostage.piercing.vagina.weight = 0;
						V.hostage.piercing.anus.weight = 0;
						V.hostage.piercing.genitals.weight = 1;
						V.hostage.piercing.eyebrow.weight = 0;
						V.hostage.piercing.navel.weight = 1;
						V.hostage.piercing.corset.weight = 0;
						V.hostage.piercing.areola.weight = 0;
						V.hostage.piercing.tongue.weight = 1;
						V.hostage.boobsTat = "degradation";
						V.hostage.backTat = "degradation";
						V.hostage.stampTat = "degradation";
						V.hostage.fetish = "masochist";
						V.hostage.fetishStrength = 10;
						App.Medicine.Modification.addScar(V.hostage, "left ankle", "surgical", 2);
						App.Medicine.Modification.addScar(V.hostage, "right ankle", "surgical", 2);
						App.Medicine.Modification.addScar(V.hostage, "left calf", "surgical", 2);
						App.Medicine.Modification.addScar(V.hostage, "right calf", "surgical", 2);
						r.push(`undergoing surgery to sever the tendons in ${his} heels.`);
						break;
					case "Degradationism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`questioning if being ${his} owner's plaything is what ${he} really wants.`);
						break;
					case "Body Purism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.boobs += 2000;
						V.hostage.boobsImplant += 2000;
						if (V.hostage.boobsImplant > 10000) {
							V.hostage.boobsImplantType = "hyper fillable";
						}
						V.hostage.boobShape = "spherical";
						V.hostage.nipples = "flat";
						V.hostage.fetish = "boobs";
						V.hostage.fetishStrength = 10;
						r.push(`blushing as ${he} attempts to get dressed with ${his} massive ${V.hostage.boobs}cc fake tits getting in the way.`);
						break;
					case "Transformation Fetishism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`blushing as ${he} recollects all the compliments ${his} pure body has received so far.`);
						break;
					case "Youth Preferentialism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 5;
						V.hostage.counter.vaginal += 5;
						V.hostage.counter.anal += 5;
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`blushing as ${he} thinks about being dominated by that MILF.`);
						break;
					case "Maturity Preferentialism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 5;
						V.hostage.counter.vaginal += 5;
						V.hostage.counter.anal += 5;
						V.hostage.fetish = "dom";
						V.hostage.fetishStrength = 10;
						r.push(`blushing as ${he} thinks about possibly dominating ${his} energetic harasser.`);
						break;
					case "Slimness Enthusiasm":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 0;
						V.hostage.boobs += 1500;
						V.hostage.butt = 5;
						V.hostage.fetish = "boobs";
						V.hostage.fetishStrength = 10;
						r.push(`blushing as ${he} attempts to get dressed with ${his} massive ${V.hostage.boobs}cc tits getting in the way.`);
						break;
					case "Asset Expansionism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						r.push(`blushing as ${he} recollects all the compliments ${his} slim body has received so far.`);
						break;
					case "Pastoralism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 50;
						V.hostage.muscles = 25;
						V.hostage.boobs = 1000;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetish = "dom";
						V.hostage.fetishStrength = 10;
						r.push(`crashing into ${his} bed, exhausted from all ${his} exercise. As ${he} massages ${his} sore body, ${he} can't help gasp at the weight ${he} has lost.`);
						break;
					case "Cummunism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 20;
						V.hostage.boobs += 1000;
						V.hostage.fetish = "boobs";
						V.hostage.fetishStrength = 10;
						r.push(`groaning as ${he} lowers ${his} growing body onto ${his} cot. ${He} shoves a massive ${V.hostage.boobs}cc milky breast aside so ${he} can massage ${his} hugely distended belly. ${He} moans in pain under the massive amount of high-caloric fluid within ${his} gut.`);
						break;
					case "Physical Idealism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 50;
						V.hostage.boobs = 800;
						V.hostage.butt = 4;
						V.hostage.counter.vaginal += 28;
						V.hostage.vagina = 3;
						V.hostage.behavioralFlaw = "anorexic";
						V.hostage.sexualFlaw = "hates penetration";
						r.push(`groaning as ${his} taut belly is measured and ${his} weight is taken; 140 tallies adorn ${his} lower belly. "15 kilos since last weigh in, a good start, but nowhere near the end. Now about that fetish of yours..." ${He} responds with a meek`);
						if (V.seePreg !== 0) {
							V.hostage.fetish = either("boobs", "buttslut", "cumslut", "dom", "humiliation", "masochist", "pregnancy", "sadist", "submissive");
						} else {
							V.hostage.fetish = either("boobs", "buttslut", "cumslut", "dom", "humiliation", "masochist", "sadist", "submissive");
						}
						V.hostage.fetishStrength = 10;
						switch (V.hostage.fetish) {
							case "submissive":
								r.push(Spoken(V.hostage, `"I like getting dominated..."`));
								break;
							case "cumslut":
								r.push(Spoken(V.hostage, `"I like getting cummed on..."`));
								break;
							case "humiliation":
								r.push(Spoken(V.hostage, `"I like being humiliated..."`));
								break;
							case "buttslut":
								r.push(Spoken(V.hostage, `"I like getting assfucked..."`));
								break;
							case "boobs":
								r.push(Spoken(V.hostage, `"I like big breasts..."`));
								break;
							case "sadist":
								r.push(Spoken(V.hostage, `"I like hurting people..."`));
								break;
							case "masochist":
								r.push(Spoken(V.hostage, `"I like getting beaten..."`));
								break;
							case "dom":
								r.push(Spoken(V.hostage, `"I like getting my way..."`));
								break;
							case "pregnancy":
								r.push(Spoken(V.hostage, `"I want to get pregnant..."`));
								break;
						}
						r.push(`"No need to be shy about it! We'll make sure to`);
						switch (V.hostage.fetish) {
							case "submissive":
								r.push(`get a big strong man to teach you your place right away."`);
								break;
							case "cumslut":
								r.push(`have plenty of cum ready for you."`);
								break;
							case "humiliation":
								r.push(`broadcast your life to the world."`);
								break;
							case "buttslut":
								r.push(`give your ass plenty of attention."`);
								break;
							case "boobs":
								r.push(`get a big pair of fillable implants in you right away."`);
								V.hostage.boobs += 1000;
								V.hostage.boobsImplant += 1000;
								V.hostage.boobsImplantType = "fillable";
								break;
							case "sadist":
								r.push(`have a sissy little bitch in reach for you to torment as you please."`);
								break;
							case "masochist":
								r.push(`get a big strong man to teach you your place right away."`);
								break;
							case "dom":
								r.push(`have a sissy little bitch to do whatever you please."`);
								break;
							case "pregnancy":
								r.push(`take you off your birth control, won't be long after that."`);
								V.hostage.preg = 1;
								V.hostage.pregType = setPregType(V.hostage);
								WombImpregnate(V.hostage, V.hostage.pregType, 0, 1);
								V.hostage.pregKnown = 1;
								V.hostage.pregWeek = 1;
								SetBellySize(V.hostage);
								break;
						}
						break;
					case "Hedonistic Decadence":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 50;
						V.hostage.muscles = 25;
						V.hostage.boobs = 1000;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetish = "dom";
						V.hostage.fetishStrength = 10;
						r.push(`crashing into ${his} bed, exhausted from all ${his} exercise. As ${he} massages ${his} sore body, ${he} can't help gasp at the weight ${he} has lost.`);
						break;
					case "Chattel Religionism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`questioning why ${he} is yearning to be a part of this society.`);
						break;
					case "Multiculturalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.counter.mammary += 10;
						V.hostage.fetish = "dom";
						V.hostage.fetishStrength = 10;
						r.push(`studying ${his} scriptures with the hope that ${he} can do something to help you.`);
						break;
					case "Intellectual Dependency":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant + 1, 0, 30);
						V.hostage.skill.oral = Math.clamp(V.hostage.skill.oral + 5, 0, 100);
						V.hostage.skill.entertainment = Math.clamp(V.hostage.skill.entertainment + 5, 0, 100);
						V.hostage.skill.anal = Math.clamp(V.hostage.skill.anal + 5, 0, 100);
						V.hostage.skill.vaginal = Math.clamp(V.hostage.skill.vaginal + 5, 0, 100);
						V.hostage.skill.whoring = Math.clamp(V.hostage.skill.whoring + 5, 0, 100);
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`reading a book on styling oneself.`);
						break;
					case "Slave Professionalism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant - 5, 0, 30);
						V.hostage.counter.oral += 30;
						V.hostage.counter.vaginal += 30;
						V.hostage.counter.anal += 30;
						V.hostage.vagina = 3;
						V.hostage.anus = 3;
						V.hostage.energy += 5;
						V.hostage.addict += 2;
						V.hostage.hLength += 7;
						V.hostage.fetish = "humiliation";
						V.hostage.fetishStrength = 10;
						r.push(`uncontrollably masturbating as ${he} struggles to stay coherent.`);
						r.push(Spoken(V.hostage, `"I need it... I can't stop... Need more..."`));
						r.push(`${He} orgasms in full view of the camera and passes out.`);
						break;
					case "Petite Admiration":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 5;
						V.hostage.counter.anal += 5;
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`blushing as ${he} thinks about being picked up, pinned against a wall and dominated by that giant.`);
						break;
					case "Statuesque Glorification":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 3;
						V.hostage.counter.vaginal += 7;
						V.hostage.counter.anal += 7;
						V.hostage.fetish = "dom";
						V.hostage.fetishStrength = 10;
						r.push(`blushing as ${he} thinks about possibly dominating ${his} minuscule harasser.`);
						break;
					default:
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetish = "submissive";
						V.hostage.fetishStrength = 10;
						r.push(`questioning why ${he} is yearning to be a part of this society.`);
				}
			} else if (V.rival.duration === 11) {
				switch (V.rival.FS.name) {
					case "Racial Subjugationism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 20;
						V.hostage.counter.vaginal += 20;
						V.hostage.counter.anal += 20;
						V.hostage.fetishStrength = 65;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "confident";
						V.hostage.sexualQuirk = "perverted";
						r.push(`calling ${his} ${V.arcologies[0].FSSubjugationistRace} girls for some release.`);
						break;
					case "Racial Supremacism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						if (V.hostage.preg < 1 && V.seePreg !== 0) {
							V.hostage.preg = 12;
							V.hostage.pregType = 1;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = 12;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
						}
						if (V.hostage.vagina < 3) {
							V.hostage.vagina = 3;
						}
						if (V.hostage.anus < 3) {
							V.hostage.anus = 3;
						}
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.fetishStrength = 65;
						V.hostage.behavioralQuirk = "none";
						V.hostage.behavioralFlaw = "odd";
						V.hostage.sexualFlaw = "apathetic";
						App.Medicine.Modification.addScourged(V.hostage);
						App.Medicine.Modification.addScar(V.hostage, "anus", "generic");
						App.Medicine.Modification.addScar(V.hostage, "vagina", "generic");
						r.push(`collapsing into ${his} rancid cot, hands on ${his}`);
						if (V.seePreg !== 0) {
							r.push(`rounded middle,`);
						} else {
							r.push(`empty belly,`);
						}
						r.push(`sobbing in terror.`);
						break;
					case "Repopulation Focus":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 5;
						V.hostage.counter.vaginal += 5;
						V.hostage.counter.anal += 5;
						V.hostage.counter.mammary += 5;
						V.hostage.behavioralFlaw = "hates men";
						V.hostage.sexualFlaw = "hates penetration";
						r.push(`realizing that ${he} doesn't need to bear children to be happy in life.`);
						break;
					case "Eugenics":
						if (V.seeHyperPreg !== 1) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.preg = 21;
							V.hostage.pregType = 8;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.rival.duration;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.vagina = 3;
							V.hostage.boobs += 100;
							V.hostage.lactation = 1;
							V.hostage.lactationDuration = 2;
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							V.hostage.vaginaTat = "lewd crest";
							V.hostage.behavioralFlaw = "none";
							V.hostage.sexualFlaw = "none";
							V.hostage.behavioralQuirk = "adores men";
							V.hostage.sexualQuirk = "caring";
							V.hostage.fetishStrength = 65;
							r.push(`realizing that being pregnant is possibly the best thing in life, as ${he} cradles ${his} growing belly.`);
						} else {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.preg = 21;
							V.hostage.pregType = 40;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.rival.duration;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.vagina = 3;
							V.hostage.boobs += 300;
							V.hostage.lactation = 1;
							V.hostage.lactationDuration = 2;
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							V.hostage.vaginaTat = "lewd crest";
							V.hostage.behavioralFlaw = "none";
							V.hostage.sexualFlaw = "none";
							V.hostage.behavioralQuirk = "adores men";
							V.hostage.sexualQuirk = "caring";
							V.hostage.fetishStrength = 65;
							r.push(`realizing that being pregnant is possibly the best thing in life, as ${he} attempts to cradle ${his} enormous belly.`);
						}
						break;
					case "Gender Radicalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 65;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "insecure";
						V.hostage.sexualQuirk = "romantic";
						r.push(`realizing that a ${V.hostage.actualAge < 16 ? `${girl}` : `${woman}`}'s place is next to the powerful, not being powerful.`);
						break;
					case "Gender Fundamentalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.anus = 3;
						V.hostage.counter.anal += 10;
						if (V.seeDicks !== 0) {
							V.hostage.dick = 1;
							V.hostage.skill.penetrative = Math.clamp(V.hostage.skill.penetrative + 5, 0, 100);
							V.hostage.counter.penetrative += 10;
						}
						V.hostage.vaginaTat = "lewd crest";
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "adores men";
						V.hostage.sexualQuirk = "size queen";
						V.hostage.fetishStrength = 65;
						r.push(`realizing that nothing feels better than a huge dick up ${his} ass.`);
						if (V.seeDicks !== 0) {
							r.push(`Well, except maybe touching ${his} new penis while taking it in the ass.`);
						}
						break;
					case "Paternalism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.voice = 0;
						V.hostage.piercing.ear.weight = 2;
						V.hostage.piercing.nose.weight = 2;
						V.hostage.piercing.nipple.weight = 1;
						V.hostage.piercing.lips.weight = 1;
						V.hostage.piercing.vagina.weight = 1;
						V.hostage.piercing.anus.weight = 0;
						V.hostage.piercing.genitals.weight = 1;
						V.hostage.piercing.eyebrow.weight = 1;
						V.hostage.piercing.navel.weight = 2;
						V.hostage.piercing.corset.weight = 0;
						V.hostage.piercing.areola.weight = 1;
						V.hostage.piercing.tongue.weight = 1;
						V.hostage.buttTat = "degradation";
						V.hostage.vaginaTat = "degradation";
						V.hostage.shouldersTat = "degradation";
						V.hostage.armsTat = "degradation";
						V.hostage.legsTat = "degradation";
						App.Medicine.Modification.addScar(V.hostage, "anus", "generic");
						App.Medicine.Modification.addScar(V.hostage, "vagina", "generic");
						V.hostage.fetishStrength = 65;
						App.Medicine.Modification.addScar(V.hostage, "neck", "surgical", 2);
						r.push(`screaming as ${his} throat is prepared for surgery, knowing this will be the last sound ${he} ever vocalizes.`);
						break;
					case "Degradationism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "advocate";
						V.hostage.sexualQuirk = "romantic";
						V.hostage.fetishStrength = 65;
						r.push(`waiting on ${his} love-bed for ${his} owner to come and take ${him} to heaven.`);
						break;
					case "Body Purism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.boobs += 2000;
						V.hostage.boobsImplant += 2000;
						if (V.hostage.boobsImplant > 10000) {
							V.hostage.boobsImplantType = "hyper fillable";
						}
						V.hostage.butt = 7;
						V.hostage.buttImplant = 4;
						V.hostage.buttImplantType = "fillable";
						V.hostage.behavioralFlaw = "none";
						V.hostage.behavioralQuirk = "insecure";
						V.hostage.sexualFlaw = "crude";
						V.hostage.fetishStrength = 65;
						r.push(`getting off the surgical table and immediately falling to the floor under the weight of ${his} immense ${V.hostage.boobs}cc implants. ${He} quickly calls out, not for help, but for a dick in ${him} to celebrate this occasion.`);
						break;
					case "Transformation Fetishism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "fitness";
						V.hostage.sexualQuirk = "romantic";
						V.hostage.fetishStrength = 65;
						r.push(`realizing that ${his} pure body really is gorgeous.`);
						break;
					case "Youth Preferentialism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "adores women";
						V.hostage.sexualQuirk = "romantic";
						V.hostage.fetishStrength = 65;
						r.push(`beginning to fall in love with ${his} loving ${mother2} figure.`);
						break;
					case "Maturity Preferentialism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "adores women";
						V.hostage.sexualQuirk = "romantic";
						V.hostage.fetishStrength = 65;
						r.push(`beginning to fall in love with ${his} energetic friend.`);
						break;
					case "Slimness Enthusiasm":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 20;
						V.hostage.boobs += 1500;
						V.hostage.butt = 6;
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralFlaw = "gluttonous";
						V.hostage.sexualQuirk = "size queen";
						r.push(`getting out of bed and immediately falling to the floor under the weight of ${his} immense ${V.hostage.boobs}cc breasts. ${He} quickly calls out, not for help, but for a dick in ${him} to celebrate this occasion.`);
						break;
					case "Asset Expansionism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "fitness";
						V.hostage.sexualQuirk = "tease";
						r.push(`realizing that a thin female figure is gorgeous.`);
						break;
					case "Pastoralism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 20;
						V.hostage.muscles = 50;
						V.hostage.boobs = 700;
						V.hostage.counter.vaginal += 1;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "fitness";
						V.hostage.sexualQuirk = "romantic";
						V.hostage.fetishStrength = 65;
						r.push(`stepping onto a scale and gawking out how much weight ${he} has lost. ${He} flexes, giggling to ${himself}, before picking up a weight.`);
						break;
					case "Cummunism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 50;
						V.hostage.boobs += 1000;
						V.hostage.butt = 5;
						V.hostage.fetishStrength = 65;
						V.hostage.behavioralFlaw = "gluttonous";
						V.hostage.sexualFlaw = "crude";
						r.push(`getting out of bed and immediately falling to the floor under the weight of ${his} immense ${V.hostage.boobs}cc breasts. As ${his} meaty body jiggles and a veritable flood of milk escapes ${his} breasts; ${he} calls out, not for help, but for a dick in ${him} to celebrate this occasion.`);
						break;
					case "Physical Idealism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 75;
						V.hostage.boobs += 100;
						V.hostage.butt = 5;
						V.hostage.fetishStrength = 65;
						V.hostage.behavioralFlaw = "gluttonous";
						V.hostage.sexualFlaw = "crude";
						V.hostage.counter.vaginal += 35;
						V.hostage.vagina = 3;
						V.hostage.vaginaTat = "lewd crest";
						r.push(`giggling and flirting while ${his} body is measured and ${his} weight is taken; 280 tallies adorn ${his} soft belly. "Another 20 kilos, getting there. Oh don't make that face, there's plenty of food left."`);
						switch (V.hostage.fetish) {
							case "cumslut":
								V.hostage.counter.oral += 70;
								break;
							case "buttslut":
								V.hostage.counter.anal += 21;
								V.hostage.anus = 3;
								break;
							case "boobs":
								V.hostage.boobs += 100;
								V.hostage.boobsImplant += 100;
								if (V.hostage.boobsImplant > 2000) {
									V.hostage.boobsImplantType = "advanced fillable";
								}
								break;
							case "pregnancy":
								V.hostage.preg++;
								V.hostage.pregKnown = 1;
								V.hostage.pregWeek = V.hostage.preg;
								SetBellySize(V.hostage);
								break;
						}
						break;
					case "Hedonistic Decadence":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 20;
						V.hostage.muscles = 50;
						V.hostage.boobs = 700;
						V.hostage.counter.vaginal += 1;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "fitness";
						V.hostage.sexualQuirk = "romantic";
						V.hostage.fetishStrength = 65;
						r.push(`stepping onto a scale and gawking out how much weight ${he} has lost. ${He} flexes, giggling to ${himself}, before picking up a weight.`);
						break;
					case "Chattel Religionism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 65;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "cutting";
						V.hostage.sexualQuirk = "unflinching";
						r.push(`eagerly getting ready to spend some time in the city.`);
						break;
					case "Multiculturalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 25;
						V.hostage.counter.vaginal += 25;
						V.hostage.counter.anal += 25;
						V.hostage.counter.mammary += 25;
						V.hostage.fetishStrength = 65;
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralFlaw = "devout";
						V.hostage.sexualQuirk = "caring";
						r.push(`practicing reciting ${his} prayers from memory, the notion that ${he} can save your arcology still strong.`);
						break;
					case "Intellectual Dependency":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant + 2, 0, 30);
						V.hostage.skill.oral = Math.clamp(V.hostage.skill.oral + 5, 0, 100);
						V.hostage.skill.entertainment = Math.clamp(V.hostage.skill.entertainment + 5, 0, 100);
						V.hostage.skill.anal = Math.clamp(V.hostage.skill.anal + 5, 0, 100);
						V.hostage.skill.vaginal = Math.clamp(V.hostage.skill.vaginal + 5, 0, 100);
						V.hostage.skill.whoring = Math.clamp(V.hostage.skill.whoring + 5, 0, 100);
						V.hostage.fetishStrength = 65;
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralFlaw = "none";
						V.hostage.behavioralQuirk = "cutting";
						V.hostage.sexualQuirk = "caring";
						r.push(`diligently reading the Kama Sutra and taking notes.`);
						break;
					case "Slave Professionalism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant - 5, 0, 30);
						V.hostage.intelligence = Math.clamp(V.hostage.intelligence - 10, -100, 100);
						V.hostage.skill.oral = 0;
						V.hostage.skill.entertainment = 0;
						V.hostage.skill.anal = 0;
						V.hostage.skill.vaginal = 0;
						V.hostage.skill.penetrative = 0;
						V.hostage.skill.whoring = 0;
						V.hostage.skill.combat = 0;
						V.hostage.makeup = 4;
						V.hostage.nails = 5;
						V.hostage.shoes = "heels";
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.vagina = 3;
						V.hostage.anus = 3;
						V.hostage.energy += 5;
						V.hostage.addict += 2;
						V.hostage.hLength += 7;
						V.hostage.fetishStrength = 65;
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralFlaw = "none";
						V.hostage.behavioralQuirk = "confident";
						V.hostage.sexualQuirk = "perverted";
						V.hostage.vaginaTat = "lewd crest";
						r.push(`struggling to solve a puzzle to gain access to the extra large dildo cupboard.`);
						break;
					case "Petite Admiration":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 15;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "advocate";
						V.hostage.sexualQuirk = "romantic";
						V.hostage.fetishStrength = 65;
						r.push(`beginning to fall in love with ${his} big friend.`);
						break;
					case "Statuesque Glorification":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 5;
						V.hostage.counter.vaginal += 15;
						V.hostage.counter.anal += 15;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "advocate";
						V.hostage.sexualQuirk = "caring";
						V.hostage.fetishStrength = 65;
						r.push(`beginning to fall in love with ${his} little friend.`);
						break;
					default:
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 65;
						V.hostage.behavioralFlaw = "none";
						V.hostage.sexualFlaw = "none";
						V.hostage.behavioralQuirk = "confident";
						V.hostage.sexualQuirk = "caring";
						r.push(`eagerly getting ready to spend some time in the city.`);
				}
			} else if (V.rival.duration === 16) {
				switch (V.rival.FS.name) {
					case "Racial Subjugationism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 40;
						V.hostage.counter.vaginal += 40;
						V.hostage.counter.anal += 20;
						V.hostage.fetishStrength = 100;
						r.push(`approaching and pulling ${his} ${V.arcologies[0].FSSubjugationistRace} girlfriends into a pre-sex embrace, a look of wild joy on ${his} face.`);
						break;
					case "Racial Supremacism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						if (V.hostage.preg < 20 && V.seePreg !== 0) {
							V.hostage.preg = 25;
							V.hostage.pregType = 1;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.hostage.preg;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
						}
						if (V.hostage.vagina < 4) {
							V.hostage.vagina = 4;
						}
						if (V.hostage.anus < 4) {
							V.hostage.anus = 4;
						}
						V.hostage.sexualFlaw = "self hating";
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.fetishStrength = 100;
						/* Make scars worse: */
						App.Medicine.Modification.addScourged(V.hostage);
						r.push(`collapsing into ${his} rancid cot and curling into the fetal position${(V.seePreg !== 0) ? ` around ${his} pregnant belly` : ``}. ${He}'s audibly begging for someone, anyone, to save ${him}.`);
						break;
					case "Repopulation Focus":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 5;
						V.hostage.counter.vaginal += 5;
						V.hostage.counter.anal += 5;
						V.hostage.counter.mammary += 5;
						r.push(`convincing a fellow slave to give up ${hisU} fertility.`);
						break;
					case "Eugenics":
						if (V.seeHyperPreg !== 1) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.preg = 31;
							V.hostage.pregType = 8;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.rival.duration;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.vagina = 4;
							V.hostage.boobs += 100;
							V.hostage.lactation = 1;
							V.hostage.lactationDuration = 2;
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							V.hostage.fetishStrength = 100;
							V.hostage.sexualFlaw = "breeder";
							r.push(`resting in ${his} bed with ${his} master's head against ${his} full-term belly. ${He} appears to be genuinely happy.`);
						} else {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.preg = 31;
							V.hostage.pregType = 40;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.rival.duration;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.vagina = 4;
							V.hostage.boobs += 400;
							V.hostage.lactation = 1;
							V.hostage.lactationDuration = 2;
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							V.hostage.fetishStrength = 100;
							V.hostage.sexualFlaw = "breeder";
							V.hostage.bellySag = 2;
							V.hostage.bellySagPreg = 2;
							r.push(`orgasming lewdly from the obscene movements happening within ${his} straining womb. ${He} looks like ${he} wants this to never end.`);
						}
						break;
					case "Gender Radicalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 100;
						r.push(`embracing ${his} owner with quite the look of devotion on ${his} face.`);
						break;
					case "Gender Fundamentalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.anus = 4;
						V.hostage.counter.anal += 10;
						if (V.seeDicks !== 0) {
							V.hostage.dick = 3;
							V.hostage.balls = 2;
							V.hostage.scrotum = 1;
							V.hostage.skill.penetrative = Math.clamp(V.hostage.skill.penetrative + 5, 0, 100);
							V.hostage.counter.penetrative += 10;
						}
						V.hostage.fetishStrength = 100;
						V.hostage.sexualFlaw = "anal addict";
						r.push(`convincing a fellow slave that butt sex is best sex. ${He} turns around and shows off the enormous dildo shoved up ${his} ass.`);
						break;
					case "Paternalism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						eyeSurgery(V.hostage, "both", "blind");
						V.hostage.piercing.ear.weight = 2;
						V.hostage.piercing.nose.weight = 2;
						V.hostage.piercing.nipple.weight = 2;
						V.hostage.piercing.lips.weight = 1;
						V.hostage.piercing.vagina.weight = 1;
						V.hostage.piercing.anus.weight = 1;
						V.hostage.piercing.genitals.weight = 1;
						V.hostage.piercing.eyebrow.weight = 2;
						V.hostage.piercing.navel.weight = 2;
						V.hostage.piercing.corset.weight = 1;
						V.hostage.piercing.areola.weight = 1;
						V.hostage.piercing.tongue.weight = 2;
						V.hostage.lipsTat = "degradation";
						V.hostage.anusTat = "degradation";
						if (seed < 40) {
							App.Medicine.Modification.addScar(V.hostage, "left breast", "burn", 2);
						} else if (seed < 80) {
							App.Medicine.Modification.addScar(V.hostage, "right breast", "burn", 2);
						} else {
							App.Medicine.Modification.addScar(V.hostage, "left breast", "burn", 2);
							App.Medicine.Modification.addScar(V.hostage, "right breast", "burn", 2);
							App.Medicine.Modification.addScar(V.hostage, "belly", "burn", 2);
						}
						/* Next scene will mention nasty surgical arm scars, but immediately amputate, so adding them here. */
						App.Medicine.Modification.addScar(V.hostage, "left upper arm", "surgical", 2);
						App.Medicine.Modification.addScar(V.hostage, "right upper arm", "surgical", 2);
						App.Medicine.Modification.addScar(V.hostage, "left thigh", "surgical", 2);
						App.Medicine.Modification.addScar(V.hostage, "right thigh", "surgical", 2);
						V.hostage.fetishStrength = 100;
						r.push(`strapped to an operating table, eyes wide with terror, as a pair of syringes approach them.`);
						break;
					case "Degradationism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 100;
						r.push(`cheerfully talking about the future with ${his} owner. The video ends on ${him} asking for an`);
						if (V.seePreg !== 0) {
							r.push(`impregnation`);
						} else {
							r.push(`elaborate`);
						}
						r.push(`ceremony when they get married.`);
						break;
					case "Body Purism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.boobs += 2000;
						V.hostage.boobsImplant += 2000;
						if (V.hostage.boobsImplant > 10000) {
							V.hostage.boobsImplantType = "hyper fillable";
						}
						V.hostage.fetishStrength = 100;
						V.hostage.sexualFlaw = "breast growth";
						r.push(`getting ${his} taut ${V.hostage.boobs}cc tits massaged by a pair of flat slaves. ${He} is rambling on about how much happier ${he} is with ${his} massive implants than when ${he} was flat like them.`);
						break;
					case "Transformation Fetishism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 100;
						r.push(`publicly showing off ${his} pure and flawless body, a look of complete joy on ${his} face.`);
						break;
					case "Youth Preferentialism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.fetishStrength = 100;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						r.push(`blushing happily as ${his} MILF lover discusses their future marriage.`);
						break;
					case "Maturity Preferentialism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.fetishStrength = 100;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						r.push(`blushing happily as ${he} discusses ${his} future marriage to ${his} young lover.`);
						break;
					case "Slimness Enthusiasm":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 50;
						V.hostage.boobs += 1500;
						V.hostage.butt = 7;
						V.hostage.fetishStrength = 100;
						V.hostage.sexualFlaw = "breast growth";
						r.push(`getting ${his} immobilizing ${V.hostage.boobs}cc breasts massaged by a pair of flat slaves. ${He} is rambling on about how much happier ${he} is with ${his} massive tits and ass than when ${he} was flat like them.`);
						break;
					case "Asset Expansionism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						r.push(`publicly showing off ${his} thin, sleek body, a look of complete joy on ${his} face.`);
						break;
					case "Pastoralism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 0;
						V.hostage.muscles = 75;
						V.hostage.boobs = 400;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 100;
						r.push(`bench pressing a rather large dumbbell in a strong${woman} contest. ${He} is overjoyed when ${he} places first.`);
						break;
					case "Cummunism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 100;
						V.hostage.boobs += 100;
						V.hostage.butt = 6;
						V.hostage.fetishStrength = 100;
						V.hostage.sexualFlaw = "breast growth";
						r.push(`getting ${his} immobilizing ${V.hostage.boobs}cc breasts, massive ass, and cow-like body massaged by a trio of slim slaves. ${He} is rambling on about how much happier ${he} is with ${his} massive assets than when ${he} was thin like them.`);
						break;
					case "Physical Idealism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 100;
						V.hostage.boobs += 100;
						V.hostage.butt = 6;
						V.hostage.fetishStrength = 100;
						V.hostage.counter.vaginal += 40;
						V.hostage.vagina = 4;
						r.push(`giggling and flirting as ${his} flabby body is groped and fondled while ${his} weight is taken; ${his} stomach is so large you can't make out how many tallies adorn it any longer. "55 kilos gained since you got here; pretty big now, aren't we?"`);
						switch (V.hostage.fetish) {
							case "cumslut":
								V.hostage.counter.oral += 70;
								break;
							case "buttslut":
								V.hostage.counter.anal += 35;
								V.hostage.anus = 3;
								break;
							case "boobs":
								V.hostage.boobs += 100;
								V.hostage.boobsImplant += 100;
								if (V.hostage.boobsImplant > 2000) {
									V.hostage.boobsImplantType = "advanced fillable";
								}
								break;
							case "pregnancy":
								V.hostage.preg++;
								V.hostage.pregKnown = 1;
								V.hostage.pregWeek++;
								SetBellySize(V.hostage);
								break;
						}
						break;
					case "Hedonistic Decadence":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.weight = 0;
						V.hostage.muscles = 75;
						V.hostage.boobs = 400;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 100;
						r.push(`bench pressing a rather large dumbbell in a strong${woman} contest. ${He} is overjoyed when ${he} places first.`);
						break;
					case "Chattel Religionism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 100;
						r.push(`chatting with a group of fresh slaves, explaining how nice it is to live in this arcology.`);
						break;
					case "Multiculturalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.fetishStrength = 100;
						V.hostage.sexualFlaw = "neglectful";
						r.push(`finishing a sermon how to achieve happiness. ${He} smiles at the camera and says it's not too late to convert.`);
						break;
					case "Intellectual Dependency":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant + 2, 0, 30);
						V.hostage.skill.oral = Math.clamp(V.hostage.skill.oral + 5, 0, 100);
						V.hostage.skill.entertainment = Math.clamp(V.hostage.skill.entertainment + 5, 0, 100);
						V.hostage.skill.anal = Math.clamp(V.hostage.skill.anal + 5, 0, 100);
						V.hostage.skill.vaginal = Math.clamp(V.hostage.skill.vaginal + 5, 0, 100);
						V.hostage.skill.whoring = Math.clamp(V.hostage.skill.whoring + 5, 0, 100);
						V.hostage.fetishStrength = 100;
						r.push(`giving a lesson to a group of fresh slaves on what is expected of them in this arcology.`);
						break;
					case "Slave Professionalism":
						V.hostage.trust += 5;
						V.hostage.devotion += 5;
						V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant - 5, 0, 30);
						V.hostage.intelligence = Math.clamp(V.hostage.intelligence - 10, -100, 100);
						V.hostage.counter.oral += 70;
						V.hostage.counter.vaginal += 40;
						V.hostage.counter.anal += 30;
						V.hostage.energy += 5;
						V.hostage.addict += 2;
						V.hostage.fetishStrength = 100;
						V.hostage.piercing.tongue.weight = 1;
						V.hostage.stampTat = "'Princess' is tattooed over $his rear.";
						V.hostage.hLength += 7;
						V.hostage.lips = Math.clamp(V.hostage.lips + 5, 0, 100);
						r.push(`giggling and chatting with a group of fellow bimbos as they try to entice a quick fuck from passersby.`);
						if (V.seePreg !== 0) {
							V.hostage.preg = 8;
							V.hostage.pregType = 1;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = 8;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							r.push(`A very pregnant slut pokes at the curve of ${his} belly and declares ${him} preggo, to which ${he} waves it off as`);
							r.push(Spoken(V.hostage, `"obviously having sucked too much dick."`));
						}
						break;
					case "Petite Admiration":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.fetishStrength = 100;
						V.hostage.counter.oral += 15;
						V.hostage.counter.vaginal += 7;
						V.hostage.counter.anal += 7;
						r.push(`blushing happily as ${his} giant lover discusses their future marriage.`);
						break;
					case "Statuesque Glorification":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.fetishStrength = 100;
						V.hostage.counter.oral += 7;
						V.hostage.counter.vaginal += 15;
						V.hostage.counter.anal += 15;
						r.push(`blushing happily as ${he} discusses ${his} future marriage to ${his} little lover.`);
						break;
					default:
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.vaginal += 1;
						V.hostage.fetishStrength = 100;
						r.push(`chatting with a group of fresh slaves, explaining how nice it is to live in this arcology.`);
				}
			} else if (V.rival.duration === 21) {
				switch (V.rival.FS.name) {
					case "Racial Subjugationism":
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						r.push(`giving an interview. ${He} gushes over how great ${V.arcologies[0].FSSubjugationistRace} people are and how terrible it is that some people believe them barely human.`);
						break;
					case "Racial Supremacism":
						if (V.hostage.preg < 35 && V.seePreg !== 0) {
							V.hostage.preg = 32;
							V.hostage.pregType = 1;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = V.hostage.preg;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
						}
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						V.hostage.lactation = 1;
						V.hostage.lactationDuration = 2;
						/* Make scars worse: */
						App.Medicine.Modification.addScourged(V.hostage);
						App.Medicine.Modification.addScar(V.hostage, "left cheek", "generic", 3);
						App.Medicine.Modification.addScar(V.hostage, "right cheek", "generic", 3);
						App.Medicine.Modification.addScar(V.hostage, "left lower arm", "generic", 2);
						App.Medicine.Modification.addScar(V.hostage, "right lower arm", "generic", 3);
						r.push(`with a pair of slavers threatening`);
						if (V.seePreg !== 0) {
							r.push(`${his} pregnancy.`);
						} else {
							r.push(`${him}.`);
						}
						r.push(`${He} keeps blocking the blows, again and again, until ${he} can barely stay upright. With a final, brutal kick to the head, ${he} falls to the floor, unmoving. Several seconds later, ${he} struggles upright, a blank expression across ${his} bloodied face.`);
						break;
					case "Repopulation Focus":
						V.hostage.counter.oral += 5;
						V.hostage.counter.vaginal += 5;
						V.hostage.counter.anal += 5;
						V.hostage.counter.mammary += 5;
						r.push(`giving an interview. ${He} gushes over how important it is for only the best of society to reproduce, and how it is an atrocity that some people bring so many wasted lives into being.`);
						break;
					case "Eugenics":
						if (V.seeHyperPreg !== 1) {
							V.hostage.preg = 1;
							V.hostage.pregType = 8;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = 1;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.vagina = 5;
							if (V.hostage.counter.births < 1) {
								V.hostage.counter.births = 1;
								V.hostage.counter.birthsTotal += 1;
							}
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							V.hostage.bellySag = 2;
							V.hostage.bellySagPreg = 2;
						} else {
							V.hostage.preg = 1;
							V.hostage.pregType = 40;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = 1;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
							V.hostage.vagina = 5;
							if (V.hostage.counter.births < 50) {
								V.hostage.counter.births = 20;
								V.hostage.counter.birthsTotal += 20;
							}
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							V.hostage.bellySag = 5;
							V.hostage.bellySagPreg = 5;
						}
						r.push(`giving an interview. ${He} gushes over how important it is for women to conceive and carry as many children as they can, as well as how terrible it is that some people strip away a woman's most important purpose. Before ${he} can continue, ${his} water breaks and ${he} drops to the floor. You close the video in disgust of what's coming.`);
						break;
					case "Gender Radicalism":
						V.hostage.counter.vaginal += 1;
						if (V.seePreg !== 0) {
							V.hostage.preg = 8;
							V.hostage.pregType = 1;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = 8;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
						}
						r.push(`giving an interview. ${He} gushes over how great it feels knowing that someone is always watching out for ${his} safety and health as a traditional ${V.hostage.actualAge < 16 ? `${girl}` : `${woman}`}, as well as how terrible it is that some people want to blur the lines between the genders.`);
						break;
					case "Gender Fundamentalism":
						V.hostage.counter.anal += 10;
						if (V.seeDicks !== 0) {
							V.hostage.dick = 4;
							V.hostage.balls = 4;
							V.hostage.scrotum = 2;
							V.hostage.skill.penetrative = Math.clamp(V.hostage.skill.penetrative + 5, 0, 100);
							V.hostage.counter.penetrative += 10;
						}
						r.push(`giving an interview. ${He} gushes over how great it feels being fucked in the rear and how ${he} never has to worry about pregnancy that way. ${He} carries on about how terrible it is that some people want to deny people this great sensation.`);
						break;
					case "Paternalism":
						V.hostage.trust -= 5;
						V.hostage.devotion -= 5;
						V.hostage.counter.oral += 50;
						V.hostage.counter.vaginal += 50;
						V.hostage.counter.anal += 50;
						V.hostage.counter.mammary += 50;
						removeLimbs(V.hostage, "all");
						V.hostage.piercing.ear.weight = 2;
						V.hostage.piercing.nose.weight = 2;
						V.hostage.piercing.nipple.weight = 2;
						V.hostage.piercing.lips.weight = 2;
						V.hostage.piercing.vagina.weight = 2;
						V.hostage.piercing.anus.weight = 2;
						V.hostage.piercing.genitals.weight = 2;
						V.hostage.piercing.eyebrow.weight = 2;
						V.hostage.piercing.navel.weight = 2;
						V.hostage.piercing.corset.weight = 1;
						V.hostage.piercing.areola.weight = 1;
						V.hostage.piercing.tongue.weight = 2;
						if (seed < 40) {
							App.Medicine.Modification.addScar(V.hostage, "anus", "burn", 2);
						} else if (seed < 80) {
							App.Medicine.Modification.addScar(V.hostage, "vagina", "burn", 2);
						} else {
							App.Medicine.Modification.addScar(V.hostage, "anus", "burn", 2);
							App.Medicine.Modification.addScar(V.hostage, "vagina", "burn", 2);
							App.Medicine.Modification.addScar(V.hostage, "left cheek", "burn", 2);
						}
						r.push(`strapped to an operating table, with surgical marks on ${his} bare arms and legs. ${His} face contorts into absolute horror as ${he} hears the running saw lowering towards ${his} right arm. As it makes contact, ${his} mouth opens wide in a silent scream, ceasing only once ${his} arm is severed completely. As it comes into contact with ${his} other arm, ${his} silent screams stop completely, ${his} mind having completely shattered. You end the video early, disgusted by what you just saw.`);
						break;
					case "Degradationism":
						V.hostage.counter.vaginal += 1;
						if (V.seePreg !== 0) {
							V.hostage.preg = 14;
							V.hostage.pregType = 1;
							V.hostage.pregKnown = 1;
							V.hostage.pregWeek = 14;
							WombImpregnate(V.hostage, V.hostage.pregType, 0, V.hostage.preg);
							SetBellySize(V.hostage);
						}
						r.push(`and ${his} owner at the altar during their wedding.`);
						if (V.seePreg !== 0) {
							r.push(`It seems ${he} couldn't wait, since ${his} belly already shows signs of an early pregnancy.`);
						}
						break;
					case "Body Purism":
						V.hostage.boobs = 50000;
						V.hostage.boobsImplant = 45000;
						V.hostage.boobsImplantType = "hyper fillable";
						r.push(`giving an interview. ${He} gushes over how great it feels being more silicone than ${girl} and how terrible it is that some people want to deny ${girl}s this pleasure.`);
						break;
					case "Transformation Fetishism":
						V.hostage.counter.vaginal += 1;
						r.push(`giving an interview. ${He} gushes over how great it feels being implant free and how terrible some people are to force inhumane implants into their slaves.`);
						break;
					case "Youth Preferentialism":
						V.hostage.counter.oral += 20;
						V.hostage.counter.vaginal += 20;
						V.hostage.counter.anal += 20;
						r.push(`giving an interview alongside ${his} older ${wife2}. ${He} gushes over how great it feels being in love and how, if some people had their way, ${he}'d have never gotten to experience this bliss.`);
						break;
					case "Maturity Preferentialism":
						V.hostage.counter.oral += 20;
						V.hostage.counter.vaginal += 20;
						V.hostage.counter.anal += 20;
						r.push(`giving an interview alongside ${his} young ${wife2}. ${He} gushes over how great it feels being in love and how, if some people had their way, ${he}'d have never gotten to experience this bliss.`);
						break;
					case "Slimness Enthusiasm":
						V.hostage.boobs = 50000;
						V.hostage.weight = 100;
						V.hostage.butt = 9;
						r.push(`giving an interview. ${He} gushes over how great it feels being more breast than ${girl} and how terrible it is that some people want to keep ${girl}s anorexic toothpicks.`);
						break;
					case "Asset Expansionism":
						V.hostage.counter.vaginal += 1;
						r.push(`giving an interview. ${He} gushes over how great it feels being more thin and fit and how terrible it is that some people want to keep ${girl}s nothing more than bloated cows.`);
						break;
					case "Pastoralism":
						V.hostage.muscles = 100;
						V.hostage.counter.vaginal += 1;
						r.push(`giving an interview. ${He} gushes over how great it feels being a chiseled goddess and how terrible it is that some people want to keep ${girl}s as obese${(V.seePreg !== 0) ? `, pregnant,` : ``} milky cows.`);
						break;
					case "Cummunism":
						V.hostage.boobs = 24300;
						V.hostage.weight = 100;
						r.push(`giving an interview. ${He} gushes over how great it feels being so soft and how happy ${he} is to be feeding ${his} people. ${He} continues with how terrible it is that some people want slaves to be hard and sinewy instead of being motherly providers.`);
						break;
					case "Physical Idealism":
						V.hostage.weight = 150;
						V.hostage.boobs += 100;
						V.hostage.butt = 6;
						V.hostage.fetishStrength = 100;
						V.hostage.counter.vaginal += 60;
						V.hostage.vagina = 5;
						r.push(`moaning as ${he} shoves food into ${his} mouth with one hand and fondles ${his} lover's body with the other. "My apologies. I don't have ${his} weight for you this week. You see, ${he} broke the scale when ${he} stepped on it. Well, I suppose that tells you plenty. Though I have another surprise for you! ${SlaveFullName(V.hostage)}, would you like to tell 'em yourself?" ${He} shouts, spewing crumbs everywhere,`);
						switch (V.hostage.fetish) {
							case "submissive":
								r.push(Spoken(V.hostage, `"I haven't orgasmed all week, but I've made sure to bring every one of my lovers to climax! That's what I love most, seeing the look of satisfaction on their faces as they blow their loads deep into me!"`));
								V.hostage.sexualFlaw = "neglectful";
								break;
							case "cumslut":
								r.push(Spoken(V.hostage, `"I suck dicks all day and have cum mixed in with my many meals but it still isn't enough! If I could, I'd drink cum till I burst!"`));
								V.hostage.counter.oral += 70;
								V.hostage.sexualFlaw = "cum addict";
								break;
							case "humiliation":
								r.push(Spoken(V.hostage, `"I love taking part in orgies and being the center of attention! You can't possible know what it feels like to pleasure fifteen guys at once!"`));
								V.hostage.sexualFlaw = "attention whore";
								break;
							case "buttslut":
								r.push(Spoken(V.hostage, `"I love it up the butt! I get assfucked all day long and when I don't have a dick in my rear, I have the biggest dildo we've got rammed up it!"`));
								V.hostage.counter.anal += 45;
								V.hostage.anus = 4;
								V.hostage.sexualFlaw = "anal addict";
								break;
							case "boobs":
								r.push(Spoken(V.hostage, `"I love my big boobs and get off watching them get bigger!"`));
								V.hostage.boobs += 100;
								V.hostage.boobsImplant += 100;
								if (V.hostage.boobsImplant > 2000) {
									V.hostage.boobsImplantType = "advanced fillable";
								}
								V.hostage.sexualFlaw = "breast growth";
								break;
							case "sadist":
								r.push(Spoken(V.hostage, `"Nothing turns me on more than crushing my lovers' nuts! That or maybe whipping or cutting them... Or anything that makes them bleed..."`));
								V.hostage.sexualFlaw = "malicious";
								break;
							case "masochist":
								r.push(Spoken(V.hostage, `"I love just stuffing my face with the fattiest foods around! I'm going to have a heart attack and I can't wait since I am such a disgusting slut and I deserve this!"`));
								V.hostage.sexualFlaw = "self hating";
								break;
							case "dom":
								r.push(Spoken(V.hostage, `"Nothing turns me on more than forcing new slaves to service me! I love their reactions as they struggle against me!"`));
								V.hostage.sexualFlaw = "abusive";
								break;
							case "pregnancy":
								r.push(Spoken(V.hostage, `"I'm preggers you know! ${V.hostage.preg} weeks along now and you know what? I always want to be pregnant! Always!"`));
								V.hostage.preg++;
								V.hostage.pregKnown = 1;
								V.hostage.pregWeek++;
								SetBellySize(V.hostage);
								V.hostage.sexualFlaw = "breeder";
								break;
						}
						break;
					case "Hedonistic Decadence":
						V.hostage.muscles = 100;
						V.hostage.counter.vaginal += 1;
						r.push(`giving an interview. ${He} gushes over how great it feels being a chiseled goddess and how terrible it is that some people want to keep ${girl}s obese, slovenly wastes of flesh.`);
						break;
					case "Chattel Religionism":
						V.hostage.counter.vaginal += 1;
						r.push(`giving an interview. ${He} gushes over how great it is to experience all manners of class and culture, both physically and spiritually.`);
						break;
					case "Multiculturalism":
						V.hostage.counter.oral += 100;
						V.hostage.counter.vaginal += 100;
						V.hostage.counter.anal += 100;
						V.hostage.counter.mammary += 100;
						r.push(`giving a public sermon. ${He} declares that if it would save the nonbelievers, ${he} would gladly take every one of their dicks into ${his} body; at once, if ${he} were able to.`);
						break;
					case "Intellectual Dependency":
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 10;
						V.hostage.counter.anal += 10;
						V.hostage.intelligenceImplant = 30;
						V.hostage.skill.oral = 100;
						V.hostage.skill.entertainment = 100;
						V.hostage.skill.anal = 100;
						V.hostage.skill.vaginal = 100;
						V.hostage.skill.whoring = 100;
						r.push(`sealing a business deal for ${his} owner. Buy the end of the meeting, the client is thoroughly exhausted from ${his} skilled 'negotiations' and eager to listen to the terms entrusted to ${him}.`);
						break;
					case "Slave Professionalism":
						V.hostage.intelligenceImplant = 0;
						V.hostage.intelligence = -100;
						V.hostage.counter.oral += 100;
						V.hostage.counter.vaginal += 100;
						V.hostage.counter.anal += 100;
						V.hostage.energy = 100;
						V.hostage.lips = Math.clamp(V.hostage.lips + 5, 0, 100);
						if (V.hostage.preg > 0) {
							V.hostage.preg++;
							V.hostage.pregWeek++;
							SetBellySize(V.hostage);
						}
						V.hostage.sexualFlaw = "attention whore";
						V.hostage.hLength += 7;
						V.hostage.career = "a bimbo";
						r.push(`taking part in a giant orgy. Several attempts are made to get ${his} attention, but ${his} body is ruled by ${his} libido and ${he} is deaf to the world. The video is several hours long.`);
						break;
					case "Petite Admiration":
						V.hostage.counter.oral += 40;
						V.hostage.counter.vaginal += 20;
						V.hostage.counter.anal += 20;
						r.push(`giving an interview alongside ${his} twice ${his} size ${wife2}. ${He} gushes over how great it feels being in love and how, if some people had their way, ${he}'d have never gotten to experience this bliss.`);
						break;
					case "Statuesque Glorification":
						V.hostage.counter.oral += 10;
						V.hostage.counter.vaginal += 30;
						V.hostage.counter.anal += 30;
						r.push(`giving an interview alongside ${his} half ${his} size ${wife2}. ${He} gushes over how great it feels being in love and how, if some people had their way, ${he}'d have never gotten to experience this bliss.`);
						break;
					default:
						V.hostage.counter.vaginal += 1;
						r.push(`giving an interview. ${He} gushes over how great it is to experience all manners of class and culture, both physically and spiritually.`);
				}
			} else if (V.rival.duration >= 30) {
				V.rival.hostageState = 0;
				switch (V.rival.FS.name) {
					case "Racial Subjugationism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} and ${his} lovers someplace far away. Someplace you'll never find them. Bet tha"`);
						break;
					case "Racial Supremacism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, the poor bitch died`);
						if (V.seePreg !== 0) {
							r.push(`trying to give birth to ${his} baby.`);
						} else {
							r.push(`from having too much 'fun' with ${his} clients.`);
						}
						r.push(`We had lots of room in the clinic too, but slaves like ${him} aren't worth the expenses, you know? I should find some more people you knew, keep our little game goi"`);
						break;
					case "Repopulation Focus":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. Someplace you'll never find ${him}. Bet tha"`);
						break;
					case "Eugenics":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. Someplace you'll never find ${him}. Bet tha"`);
						break;
					case "Gender Radicalism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. I'll miss ${him}, of course, but there is no way I'd let you have ${him}. Bet that piss"`);
						break;
					case "Gender Fundamentalism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, ${he} took a dick a little too big for ${his} ass and ruined ${his} sphincter. ${He}'s off, someplace far away, recovering. But I'll never tell you where, bet that piss"`);
						break;
					case "Paternalism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, ${he} got kicked around just a little too much. We had lots of fun with ${him}, before ${he} broke of course... Say, do you have anyone else you love, or even were familiar with? I should acquire them, keep our little game goi"`);
						break;
					case "Degradationism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. I'll miss ${him}, of course, but there is no way I'd let you have ${him}. I'll keep ${him} saf"`);
						break;
					case "Body Purism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, apparently implants can be too big. ${His} breasts literally popped, couldn't save ${him} though. Definitely going to miss playing with those balloons. I should hunt down more people you knew, keep our little game goi"`);
						break;
					case "Transformation Fetishism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. Someplace you'll never find ${him}. Bet tha"`);
						break;
					case "Youth Preferentialism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} and ${his} lover someplace far away. Someplace you'll never find them. Bet tha"`);
						break;
					case "Maturity Preferentialism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} and ${his} lover someplace far away. Someplace you'll never find them. Bet tha"`);
						break;
					case "Slimness Enthusiasm":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, apparently those growth drugs have quite the side effects. Pretty much had cancer everywhere. Definitely going to miss playing with those milkbags, though. I should hunt down more people you knew, keep our little game goi"`);
						break;
					case "Asset Expansionism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. Someplace you'll never find ${him}. Bet tha"`);
						break;
					case "Pastoralism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. I'll miss ${him}, of course, but there is no way I'd let you have ${him}. Bet that piss"`);
						break;
					case "Physical Idealism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, apparently being that fat isn't good for your heart, who knew? Definitely going to miss playing with those folds; ${he} jiggled so much when I fucked ${him}. I should hunt down more people you knew, fatten them up, keep our little game goi"`);
						break;
					case "Hedonistic Decadence":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. I'll miss ${him}, of course, but there is no way I'd let you have ${him}. Bet that piss"`);
						break;
					case "Chattel Religionism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. Someplace you'll never find ${him}. Bet tha"`);
						break;
					case "Multiculturalism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, ${he} decided to martyr ${himself} for your arcology's salvation. Got fucked till ${his} body gave out. Of course I enjoyed ${him} in ${his} final moments, and don't worry, ${he} died smiling. I should hunt down more people you knew, keep our little game goi"`);
						break;
					case "Intellectual Dependency":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, ${he} ran the math and determined that the odds of me keeping ${him} through this were too low and that ${he} should go into hiding until it's safe to come back. ${He}'s a well trained ${girl} now, so I trust ${him}, and even if I did lose this war, it'd still be worth taking ${his} advice just to deny you your prize. Bet tha"`);
						break;
					case "Slave Professionalism":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, bitch was so dumb ${he} couldn't understand the warning signs, rushed down some slick stairs for a fuck and broke ${his} neck. ${He} was fun, no denying that. Died the way ${he} lived, thinking of sucking cock. Not unlike you, act"`);
						break;
					case "Petite Admiration":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} and ${his} lover someplace far away. Someplace you'll never find them. Bet tha"`);
						break;
					case "Statuesque Glorification":
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} and ${his} lover someplace far away. Someplace you'll never find them. Bet tha"`);
						break;
					default:
						r.push(`"Looking for ${SlaveFullName(V.hostage)}? Too bad, I couldn't bear to think of you ever getting your rotten little hands on ${him}, so I sent ${him} far away. Someplace you'll never find ${him}. Bet tha"`);
				}
				r.push(`- You end the call.`);
			} else {
				const hostageAction = [];
				switch (V.rival.FS.name) {
					case "Racial Subjugationism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							hostageAction.push(`struggling to escape the grasp of a pair of ${V.arcologies[0].FSSubjugationistRace} ${girlU}s.`);
							hostageAction.push(`struggling to avoid giving ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU} oral.`);
							hostageAction.push(`screaming as ${he} gets fucked by ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU}.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							hostageAction.push(`crying gently while a pair of ${V.arcologies[0].FSSubjugationistRace} ${girlU}s fondle ${him}.`);
							hostageAction.push(`reluctantly giving ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU} oral.`);
							hostageAction.push(`crying as ${he} gets fucked by ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU}.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 20;
							V.hostage.counter.vaginal += 20;
							V.hostage.counter.anal += 20;
							hostageAction.push(`fooling around with a pair of ${V.arcologies[0].FSSubjugationistRace} ${girlU}s.`);
							hostageAction.push(`giving ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU} oral.`);
							hostageAction.push(`panting as ${he} gets fucked by ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU}.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 40;
							V.hostage.counter.vaginal += 40;
							V.hostage.counter.anal += 20;
							hostageAction.push(`having a threesome with a pair of ${V.arcologies[0].FSSubjugationistRace} ${girlU}s.`);
							hostageAction.push(`eagerly giving ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU} oral.`);
							hostageAction.push(`moaning as ${he} gets fucked by ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU}.`);
						} else {
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							hostageAction.push(`making love to ${his} favorite two ${V.arcologies[0].FSSubjugationistRace} ${girlU}s.`);
							hostageAction.push(`enthusiastically giving ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU} oral.`);
							hostageAction.push(`enthusiastically wiggling ${his} rear as ${he} gets fucked by ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU}.`);
						}
						break;
					case "Racial Supremacism":
						if (V.rival.duration <= 5) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.weight -= 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							hostageAction.push(`desperately struggling in a stockade, alongside several other ${V.arcologies[0].FSSupremacistRace} slaves, while a man tries to get it in ${him}.`);
							hostageAction.push(`struggling against ${his} bindings in a line of ${V.arcologies[0].FSSupremacistRace} slaves, having ${his} bruised holes checked.`);
							hostageAction.push(`weeping as a dispassionate slave assayer goes down a line of ${V.arcologies[0].FSSupremacistRace} slaves, reciting prices.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.weight -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							hostageAction.push(`meekly taking it in the cunt by a man while bound in a stockade alongside several other ${V.arcologies[0].FSSupremacistRace} girls.`);
							hostageAction.push(`tied up with a defeated look in a line of ${V.arcologies[0].FSSupremacistRace} slaves, having ${his} stretched holes checked.`);
							hostageAction.push(`crying as a dispassionate slave assayer goes down a line of ${V.arcologies[0].FSSupremacistRace} slaves, reciting prices.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.weight -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seePreg !== 0) {
								hostageAction.push(`moaning slightly as a man pounds ${his} pussy. ${His} belly has a notable roundness to it, most likely the spawn of a non-${V.arcologies[0].FSSupremacistRace} man.`);
								hostageAction.push(`tied up with a downtrodden look in a line of ${V.arcologies[0].FSSupremacistRace} slaves, having ${his} new pregnancy examined.`);
							} else {
								hostageAction.push(`moaning slightly as a man pounds ${his} pussy.`);
								hostageAction.push(`tied up with a downtrodden look in a line of ${V.arcologies[0].FSSupremacistRace} slaves, having ${his} overworked holes examined.`);
							}
							hostageAction.push(`silently staring at ${his} feet as a dispassionate slave assayer goes down a line of ${V.arcologies[0].FSSupremacistRace} slaves, reciting prices.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.weight -= 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seePreg !== 0) {
								hostageAction.push(`barely caring as a non-${V.arcologies[0].FSSupremacistRace} man pounds ${his} pregnant pussy. ${His} belly is noticeably distended by a non-${V.arcologies[0].FSSupremacistRace} baby.`);
								hostageAction.push(`nearly comatose in a line of ${V.arcologies[0].FSSupremacistRace} slaves, having ${his} pregnancy and destroyed holes examined`);
							} else {
								hostageAction.push(`barely caring as a non-${V.arcologies[0].FSSupremacistRace} man pounds ${his} overused holes.`);
								hostageAction.push(`nearly comatose in a line of ${V.arcologies[0].FSSupremacistRace} slaves, having ${his} destroyed holes examined`);
							}
							hostageAction.push(`standing silently as a dispassionate slave assayer goes down a line of ${V.arcologies[0].FSSupremacistRace} slaves, reciting prices.`);
						} else {
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seePreg !== 0) {
								hostageAction.push(`blankly getting pounded by several non-${V.arcologies[0].FSSupremacistRace} men as they fondle ${his} breasts, butt, and full-term pregnancy.`);
								hostageAction.push(`blankly standing in a line of ${V.arcologies[0].FSSupremacistRace} slaves, having ${his} advanced pregnancy and broken holes examined.`);
							} else {
								hostageAction.push(`blankly getting pounded by several non-${V.arcologies[0].FSSupremacistRace} men as they fondle ${his} breasts and butt.`);
								hostageAction.push(`blankly standing in a line of ${V.arcologies[0].FSSupremacistRace} slaves, having ${his} broken holes examined.`);
							}
							hostageAction.push(`blankly standing in place as a dispassionate slave assayer goes down a line of ${V.arcologies[0].FSSupremacistRace} slaves, reciting prices.`);
						}
						break;
					case "Repopulation Focus":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 5;
							V.hostage.counter.vaginal += 5;
							V.hostage.counter.anal += 5;
							V.hostage.counter.mammary += 5;
							hostageAction.push(`desperately trying to avoid reading the reports on pregnancy in your arcology.`);
							hostageAction.push(`crying while gently rubbing ${his} infertile stomach.`);
							hostageAction.push(`sobbing as an autosurgery reads out the details of ${his} infertility.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 5;
							V.hostage.counter.vaginal += 5;
							V.hostage.counter.anal += 5;
							V.hostage.counter.mammary += 5;
							hostageAction.push(`carefully reading the reports on pregnancy in your arcology.`);
							hostageAction.push(`staring at ${his} midriff, contemplating why someone would take ${his} fertility away.`);
							hostageAction.push(`pondering the health benefits being given to ${him}.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 5;
							V.hostage.counter.vaginal += 5;
							V.hostage.counter.anal += 5;
							V.hostage.counter.mammary += 5;
							hostageAction.push(`gently crying while reading the reports on pregnancy in your arcology.`);
							hostageAction.push(`relaxing, knowing ${he} will never deal with menstruation again.`);
							hostageAction.push(`accepting that ${his} body will never be ruined by pregnancy.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 5;
							V.hostage.counter.vaginal += 5;
							V.hostage.counter.anal += 5;
							V.hostage.counter.mammary += 5;
							hostageAction.push(`praying for the well-being of the pregnant women in your arcology.`);
							hostageAction.push(`playing with ${his} owner without worry, seeing as ${he} can't get pregnant.`);
							hostageAction.push(`happy that ${his} body will never be ruined by pregnancy.`);
						} else {
							V.hostage.counter.oral += 5;
							V.hostage.counter.vaginal += 5;
							V.hostage.counter.anal += 5;
							V.hostage.counter.mammary += 5;
							hostageAction.push(`actively reading a report to crowd about the dangers of pregnancy, using your arcology as an example.`);
							hostageAction.push(`running ${his} fingers across ${his} tight belly with a smile, knowing it will never be ruined.`);
							hostageAction.push(`celebrating that ${his} body will never be ruined by a child.`);
						}
						break;
					case "Eugenics":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seeHyperPreg !== 1) {
								hostageAction.push(`weeping in ${his} restraints as a crowd of a dozen criminals line up to fuck ${his} fertile womb pregnant.`);
								hostageAction.push(`crying at the results of a pregnancy test.`);
								hostageAction.push(`sobbing as ${he} tries to coax the cum out of ${his} womb.`);
							} else {
								hostageAction.push(`weeping in ${his} restraints as a crowd of a dozen criminals line up to fuck ${his} fertile womb pregnant.`);
								hostageAction.push(`weeping at the results of a pregnancy test.`);
								hostageAction.push(`sobbing as ${he} tries to coax the cum out of ${his} womb.`);
							}
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seeHyperPreg !== 1) {
								hostageAction.push(`reluctantly fucking a man while he rubs ${his} swollen belly.`);
								hostageAction.push(`cringing at a report of the number of babies ${he} is carrying.`);
								hostageAction.push(`crying as ${he} cradles ${his} unwelcome pregnancy.`);
							} else {
								hostageAction.push(`reluctantly orgasming as ${he} is taken doggystyle, ${his} full pregnancy brushing the floor under ${him}.`);
								hostageAction.push(`cringing at a report of the obscene number of babies stretching ${his} womb.`);
								hostageAction.push(`crying as ${he} cradles ${his} full-sized pregnancy.`);
							}
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.boobs += 50;
							V.hostage.lactation = 1;
							V.hostage.lactationDuration = 2;
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							if (V.seeHyperPreg !== 1) {
								hostageAction.push(`moaning gently as ${he} rides a man, cowgirl style, as he rubs ${his} pregnant belly.`);
								hostageAction.push(`smilingly slightly at an ultrasound of ${his} womb.`);
								hostageAction.push(`doing yoga to prepare ${his} body for childbirth.`);
							} else {
								hostageAction.push(`moaning gently as ${he} rides a man completely obscured by ${his} enormous pregnancy.`);
								hostageAction.push(`smilingly slightly seeing ${his} many babies via ultrasound.`);
								hostageAction.push(`doing yoga with helpers to prepare ${his} bloated body for mass childbirth.`);
							}
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.boobs += 50;
							V.hostage.lactation = 1;
							V.hostage.lactationDuration = 2;
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							if (V.seeHyperPreg !== 1) {
								hostageAction.push(`enthusiastically taking part in an orgy centered around ${his} huge pregnant belly.`);
								hostageAction.push(`happily letting ${his} owner fawn over ${his} big belly.`);
								hostageAction.push(`gleefully rubbing ${his} big pregnant belly with oils to prevent stretch marks.`);
							} else {
								hostageAction.push(`getting brutally fucked over ${his} own gigantic pregnant belly and loving every moment of it.`);
								hostageAction.push(`happily letting ${his} owner fawn over ${his} immense belly and giggling with every kick ${his} many children make in response.`);
								hostageAction.push(`giggling as several slaves slather ${his} belly with creams to prevent stretch marks.`);
							}
						} else {
							V.hostage.boobs += 50;
							V.hostage.lactation = 1;
							V.hostage.lactationDuration = 2;
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							if (V.seeHyperPreg !== 1) {
								hostageAction.push(`happily rubbing ${his} cum-filled belly, eager for ${his} next pregnancy to take.`);
								hostageAction.push(`eagerly checking a pregnancy test before dropping it sadly.`);
								hostageAction.push(`injecting cum into ${his} vagina, hoping to get pregnant again sooner.`);
							} else {
								hostageAction.push(`happily rubbing ${his} bloated belly, eager for ${his} new pregnancy to get bigger.`);
								hostageAction.push(`eagerly researching ways ${he} can always be pregnant.`);
								hostageAction.push(`begging ${his} master to get ${him} even more pregnant this time.`);
							}
						}
						break;
					case "Gender Radicalism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							hostageAction.push(`being dragged along by ${his} owner on their rounds around their arcology.`);
							hostageAction.push(`being forced into a pretty dress as to not embarrass ${his} owner, though ${his} tantrum will do just that.`);
							hostageAction.push(`viciously slapping ${his} owner's hand away.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`reluctantly following ${his} owner along on their rounds around their arcology.`);
							hostageAction.push(`reluctantly allowing ${himself} to be dressed to present a good appearance alongside ${his} owner.`);
							hostageAction.push(`reluctantly holding ${his} owner's hand.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							V.hostage.fetishStrength = 65;
							hostageAction.push(`politely accompanying ${his} owner on their rounds around their arcology.`);
							hostageAction.push(`allowing ${himself} to be dressed to present a good appearance alongside ${his} owner.`);
							hostageAction.push(`holding ${his} owner's hand.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`happily accompanying ${his} owner on their rounds around their arcology.`);
							hostageAction.push(`happily allowing ${himself} to be dressed to present a good appearance alongside ${his} owner.`);
							hostageAction.push(`happily holding ${his} owner's hand.`);
						} else {
							V.hostage.counter.vaginal += 1;
							if (V.seePreg !== 0) {
								hostageAction.push(`happily accompanying ${his} owner on their rounds around their arcology, ${his} hand resting on ${his} gently rounded stomach.`);
								hostageAction.push(`carefully getting ${himself} dressed to present a good appearance alongside ${his} owner, paying special attention to ${his} swollen midriff.`);
								hostageAction.push(`happy with ${his} owner's arm around ${his} waist.`);
							} else {
								hostageAction.push(`happily accompanying ${his} owner on their rounds around their arcology, his arm around ${his} waist.`);
								hostageAction.push(`carefully getting ${himself} dressed to present a good appearance alongside ${his} owner.`);
								hostageAction.push(`happy with ${his} owner's arm around ${him}.`);
							}
						}
						break;
					case "Gender Fundamentalism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.anal += 10;
							hostageAction.push(`struggling not to orgasm to the dick up ${his} ass.`);
							hostageAction.push(`screaming in terror as a hot shaft slips into ${his} rectum.`);
							hostageAction.push(`crying in the shower as ${he} attempts to soothe ${his} throbbing rectum.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.anal += 10;
							hostageAction.push(`reluctantly pleasuring a man with ${his} ass.`);
							hostageAction.push(`groaning in discomfort as yet another dick slides into ${his} ass.`);
							hostageAction.push(`groaning in the shower as ${he} soothes ${his} sore ass.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.anal += 10;
							if (V.seeDicks !== 0) {
								hostageAction.push(`enjoying a hard anal pounding, ${his} tiny new penis swinging from the thrusts.`);
								hostageAction.push(`letting off a moan as a penis slides into ${his} asspussy, ${his} tiny new penis trying to get hard.`);
								hostageAction.push(`cleaning ${his} rear while fondling ${his} asspussy, ${his} other hand teasing ${his} new tiny penis.`);
								V.hostage.skill.penetrative = Math.clamp(V.hostage.skill.penetrative + 5, 0, 100);
								V.hostage.counter.penetrative += 10;
							} else {
								hostageAction.push(`enjoying a hard anal pounding.`);
								hostageAction.push(`letting off a moan as a penis slides into ${his} asspussy.`);
								hostageAction.push(`cleaning ${his} rear while fondling ${his} asspussy.`);
							}
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.anal += 10;
							if (V.seeDicks !== 0) {
								hostageAction.push(`orgasming immodestly to a hard anal pounding, ${his} erect penis cumming across ${his} belly.`);
								hostageAction.push(`moaning lewdly as a huge dick slides up ${his} asspussy, ${his} erect penis bumping into ${his} belly.`);
								hostageAction.push(`seeing how many fingers ${he} can fit into ${his} ass as ${he} showers, while teasing ${his} erect dick with the other hand.`);
								V.hostage.skill.penetrative = Math.clamp(V.hostage.skill.penetrative + 5, 0, 100);
								V.hostage.counter.penetrative += 10;
							} else {
								hostageAction.push(`orgasming immodestly to a hard anal pounding.`);
								hostageAction.push(`moaning lewdly as a huge dick slides up ${his} asspussy.`);
								hostageAction.push(`seeing how many fingers ${he} can fit into ${his} ass as ${he} showers.`);
							}
						} else {
							V.hostage.counter.anal += 10;
							if (V.seeDicks !== 0) {
								hostageAction.push(`happily taking two dicks at once in ${his} blown out anus, while stroking ${his} rock hard cock.`);
								hostageAction.push(`getting assfucked, ${his} rock-hard cock dribbling precum everywhere. ${He} gasps with delight as ${he} feels a second hot shaft slide inside ${his} asspussy next to the first.`);
								hostageAction.push(`fisting ${his} own ass in the shower, and jacking off to the prostrate stimulation. ${He} gasps with delight as an orgasm wracks ${his} body.`);
								V.hostage.skill.penetrative = Math.clamp(V.hostage.skill.penetrative + 5, 0, 100);
								V.hostage.counter.penetrative += 10;
							} else {
								hostageAction.push(`happily taking two dicks at once in ${his} blown out anus.`);
								hostageAction.push(`getting assfucked. ${He} gasps with delight as ${he} feels a second hot shaft slide inside ${his} asspussy next to the first.`);
								hostageAction.push(`fisting ${his} own ass in the shower. ${He} gasps with delight as an orgasm wracks ${his} body.`);
							}
						}
						break;
					case "Paternalism":
						if (V.rival.duration <= 5) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seePee === 1) {
								hostageAction.push(`weeping on the floor as a crowd of citizens urinate on ${him}.`);
							} else {
								hostageAction.push(`weeping on the floor as a crowd of citizens masturbate onto ${him}.`);
							}
							hostageAction.push(`screaming as ${he} has the soles of ${his} feet whipped.`);
							hostageAction.push(`tearfully begging someone not to cut ${him}.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seePee === 1) {
								hostageAction.push(`trying ${his} best not to break down as a crowd of citizens urinate on ${him}.`);
							} else {
								hostageAction.push(`trying ${his} best not to break down as a crowd of citizens jack off onto ${him}.`);
							}
							hostageAction.push(`crying out as ${his} back is lashed.`);
							hostageAction.push(`tearfully crying on the ground after someone tripped ${him} and stole ${his} heels for the sole purpose of denying ${him} the ability to walk.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seePee === 1) {
								hostageAction.push(`meekly accepting ${his} golden shower.`);
							} else {
								hostageAction.push(`meekly accepting ${his} bukkake.`);
							}
							hostageAction.push(`sobbing as ${he} is mercilessly beaten.`);
							hostageAction.push(`panicking as ${he} attempts to mime a plea to not get cut by ${his} aggressor.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							if (V.seePee === 1) {
								hostageAction.push(`laying there, indifferent to the citizens urinating on ${him}.`);
							} else {
								hostageAction.push(`laying there, indifferent to the citizens ejaculating on ${him}.`);
							}
							hostageAction.push(`softly crying as ${he} is kicked around.`);
							hostageAction.push(`crying muffled sobs as someone snatches ${his} earnings from under ${his} blinded eyes.`);
						} else {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							hostageAction.push(`completely broken, indifferent to the citizens abusing ${his} body.`);
							hostageAction.push(`barely showing signs of life as ${his} ruined body is kicked around the floor.`);
							hostageAction.push(`getting shoved onto a shelf with dozens of other limbless, broken slaves.`);
						}
						break;
					case "Degradationism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							hostageAction.push(`refusing to be touched by ${his} owner.`);
							hostageAction.push(`refusing to even look at ${his} owner.`);
							hostageAction.push(`getting mad when asked about ${his} sexual exploits.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`reluctantly allowing ${his} owner to play with ${his} body.`);
							hostageAction.push(`gingerly looking at ${his} owner as they approach.`);
							hostageAction.push(`blushing and avoiding the question when asked about ${his} sexual exploits.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`making love with ${his} owner.`);
							hostageAction.push(`curiously watching ${his} owner as they approach.`);
							hostageAction.push(`blurting it out and burying ${his} face in ${his} hands when asked about ${his} sexual exploits with ${his} owner.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`happily making love to ${his} owner.`);
							hostageAction.push(`eagerly watching ${his} owner as they approach.`);
							hostageAction.push(`giggling with another slave over their sexual exploits with their owners.`);
						} else {
							V.hostage.counter.vaginal += 1;
							if (V.seePreg === 1) {
								hostageAction.push(`happily making love to ${his} owner. ${His} belly has a noticeable roundness to it.`);
								hostageAction.push(`biting ${his} lip with nervous anticipation as ${his} owner approaches where ${he}'s standing, ${his} hands cupping ${his} rounded middle.`);
								hostageAction.push(`gossiping with another slave over their sexual exploits with their owners, all the while cradling ${his} growing pregnancy with pride.`);
							} else {
								hostageAction.push(`trying ${his} hardest to conceive a child with ${his} owner.`);
								hostageAction.push(`biting ${his} lip with nervous anticipation as ${his} owner approaches where ${he}'s standing.`);
								hostageAction.push(`gossiping with another slave over how they conceived their child with their owner.`);
							}
						}
						break;
					case "Body Purism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.boobs += 2000;
							V.hostage.boobsImplant += 2000;
							if (V.hostage.boobsImplant > 10000) {
								V.hostage.boobsImplantType = "hyper fillable";
							}
							hostageAction.push(`trying desperately to stand despite ${his} massive ${V.hostage.boobs}cc fake tits.`);
							hostageAction.push(`crying while trying to get comfortable with ${his} ${V.hostage.boobs}cc fake tits.`);
							hostageAction.push(`sobbing as an autosurgery reads out how much ${his} ${V.hostage.boobs}cc implants can be expanded this week.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.boobs += 1000;
							V.hostage.boobsImplant += 1000;
							if (V.hostage.boobsImplant > 10000) {
								V.hostage.boobsImplantType = "hyper fillable";
							}
							hostageAction.push(`reluctantly exploring ${his} new massive ${V.hostage.boobs}cc implants.`);
							hostageAction.push(`reluctantly exploring new resting positions due to ${his} ${V.hostage.boobs}cc implants.`);
							hostageAction.push(`crying as an autosurgery reads out how much ${his} ${V.hostage.boobs}cc implants can be expanded this week.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.boobs += 1000;
							V.hostage.boobsImplant += 1000;
							if (V.hostage.boobsImplant > 10000) {
								V.hostage.boobsImplantType = "hyper fillable";
							}
							hostageAction.push(`happily playing with ${his} truly immense ${V.hostage.boobs}cc breast implants and huge butt implants.`);
							hostageAction.push(`happily resting ${his} head on ${his} ${V.hostage.boobs}cc breast implants.`);
							hostageAction.push(`blushing as an autosurgery reads out how much ${his} ${V.hostage.boobs}cc implants can be expanded this week.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.boobs += 1000;
							V.hostage.boobsImplant += 1000;
							if (V.hostage.boobsImplant > 10000) {
								V.hostage.boobsImplantType = "hyper fillable";
							}
							hostageAction.push(`happily getting titfucked against ${his} anchoring ${V.hostage.boobs}cc fake tits.`);
							hostageAction.push(`contently resting against ${his} ${V.hostage.boobs}cc fake tits.`);
							hostageAction.push(`getting excited as an autosurgery reads out how much ${his} ${V.hostage.boobs}cc implants can be expanded this week.`);
						} else {
							hostageAction.push(`resting on ${his} monstrous ${V.hostage.boobs}cc fake tits, whining about not being allowed larger implants.`);
							hostageAction.push(`resting atop ${his} monstrous ${V.hostage.boobs}cc fake tits, daydreaming about being even bigger.`);
							hostageAction.push(`throwing a fit that ${his} ${V.hostage.boobs}cc fake tits are too big to expand further.`);
							hostageAction.push(`throwing a fit that ${his} ${V.hostage.boobs}cc fake tits stick out too far to allow ${him} to squeeze into the surgery suite.`);
						}
						break;
					case "Transformation Fetishism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							hostageAction.push(`attempting to refute a report on surgical side effects in your arcology.`);
							hostageAction.push(`refusing to believe pictures of surgeries performed in your arcology are real.`);
							hostageAction.push(`wondering why these maniacs care if ${his} body is unaltered or not.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`refusing to believe a report on surgical side effects in your arcology.`);
							hostageAction.push(`gaping in surprise at pictures of surgeries performed in your arcology.`);
							hostageAction.push(`admiring how natural ${his} body truly is.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`gasping at a report on surgical side effects in your arcology.`);
							hostageAction.push(`gasping in horror at pictures of surgeries performed in your arcology.`);
							hostageAction.push(`beginning to understand how beautiful ${his} pure body is.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`crying over a report on surgical side effects in your arcology.`);
							hostageAction.push(`crying in terror at pictures of surgeries performed in your arcology.`);
							hostageAction.push(`admiring how pure ${his} body is in the mirror.`);
						} else {
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`making a public speech over surgical side effects in your arcology.`);
							hostageAction.push(`genuinely thanking ${his} owner for keeping ${his} body pure and beautiful.`);
							hostageAction.push(`admiring ${his} pure body from every angle ${he} can.`);
						}
						break;
					case "Youth Preferentialism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 1;
							V.hostage.counter.vaginal += 1;
							V.hostage.counter.anal += 1;
							hostageAction.push(`struggling to escape the grasp of a motherly ${woman2}.`);
							hostageAction.push(`hiding from ${his} MILF partner, sobbing quietly.`);
							hostageAction.push(`struggling to escape being mothered by ${his} older partner.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 5;
							V.hostage.counter.vaginal += 5;
							V.hostage.counter.anal += 5;
							hostageAction.push(`crying gently while a ${mother2}ly ${woman2} fondles ${him}.`);
							hostageAction.push(`cringing as ${he} massages ${his} MILF partner's back.`);
							hostageAction.push(`cautiously tasting ${his} MILF partner's milk.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							hostageAction.push(`resting in the arms of ${his} MILF friend.`);
							hostageAction.push(`carefully giving ${his} MILF lover a back massage.`);
							hostageAction.push(`carefully suckling ${his} MILF friend's nipple.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							hostageAction.push(`happily being cradled by ${his} MILF lover.`);
							hostageAction.push(`happily giving ${his} MILF lover a foot massage before bed.`);
							hostageAction.push(`happily suckling ${his} MILF lover's motherly tits.`);
						} else {
							V.hostage.counter.oral += 20;
							V.hostage.counter.vaginal += 20;
							V.hostage.counter.anal += 20;
							hostageAction.push(`resting intertwined with ${his} favorite MILF in the world.`);
							hostageAction.push(`energetically giving ${his} MILF lover a full body massage before bed.`);
							hostageAction.push(`happily suckling ${his} MILF lover's motherly tits while fondling ${his} lover's crotch.`);
						}
						break;
					case "Maturity Preferentialism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 1;
							V.hostage.counter.vaginal += 1;
							V.hostage.counter.anal += 1;
							hostageAction.push(`struggling to escape the grasp of an energetic young ${woman2}.`);
							hostageAction.push(`shouting profanity at ${his} young partner.`);
							hostageAction.push(`rebuking ${his} young partner's advances.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 5;
							V.hostage.counter.vaginal += 5;
							V.hostage.counter.anal += 5;
							hostageAction.push(`crying gently while a young ${woman2} eagerly fondles ${him}.`);
							hostageAction.push(`shying away from ${his} young partner.`);
							hostageAction.push(`curiously fondling ${his} young partner's dick.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							hostageAction.push(`trying to catch a break as ${his} young friend begs to have some more fun.`);
							hostageAction.push(`resting alongside ${his} young friend.`);
							hostageAction.push(`cautiously rubbing ${his} energetic young friend's cock.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							hostageAction.push(`kissing ${his} young lover.`);
							hostageAction.push(`talking about things with ${his} young lover.`);
							hostageAction.push(`giving ${his} energetic young lover a handjob.`);
						} else {
							V.hostage.counter.oral += 20;
							V.hostage.counter.vaginal += 20;
							V.hostage.counter.anal += 20;
							hostageAction.push(`basking in the afterglow, intertwined with ${his} favorite youth.`);
							hostageAction.push(`whispering something sexy into ${his} young lover's ear.`);
							hostageAction.push(`giving ${his} energetic young lover a handjob while deeply kissing ${him2}.`);
						}
						break;
					case "Slimness Enthusiasm":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.boobs += 1500;
							hostageAction.push(`trying desperately to stand despite ${his} massive ${V.hostage.boobs}cc tits.`);
							hostageAction.push(`crying over ${his} swollen breasts and butt.`);
							hostageAction.push(`weeping as the breast injections swell ${his} breasts to ${V.hostage.boobs}ccs.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.weight += 5;
							V.hostage.boobs += 1000;
							hostageAction.push(`reluctantly exploring ${his} new massive ${V.hostage.boobs}cc tits, bigger bottom, and softer body.`);
							hostageAction.push(`cringing as ${he} feels ${his} huge soft tits and ass.`);
							hostageAction.push(`cringing as the breast injections swell ${his} breasts to ${V.hostage.boobs}ccs along with ${his} butt.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.weight += 5;
							V.hostage.boobs += 1000;
							hostageAction.push(`happily playing with ${his} truly immense ${V.hostage.boobs}cc breasts and huge butt.`);
							hostageAction.push(`giggling as ${he} gropes ${his} soft body.`);
							hostageAction.push(`smiling as the breast injections swell ${his} breasts to ${V.hostage.boobs}ccs. ${He} runs ${his} hand across ${his} huge butt and softening body.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.boobs += 1000;
							hostageAction.push(`happily getting titfucked in ${his} immobilizing ${V.hostage.boobs}cc tits.`);
							hostageAction.push(`happily massaging ${his} super soft body and huge assets.`);
							hostageAction.push(`practically orgasming as the breast injections swell ${his} breasts to ${V.hostage.boobs}ccs. ${He} sinks ${his} hands into ${his} enormous butt and soft belly.`);
						} else {
							hostageAction.push(`resting atop ${his} monstrous ${V.hostage.boobs}cc tits, whining about not being allowed to have ${his} assets swollen more.`);
							hostageAction.push(`resting in ${his} own mountainous softness.`);
							hostageAction.push(`shouting at a plastic surgeon to make ${his} ${V.hostage.boobs}cc tits even larger.`);
							hostageAction.push(`attempting to maneuver around ${his} ${V.hostage.boobs}cc tits to reach a drug cabinet for more injections.`);
						}
						break;
					case "Asset Expansionism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							hostageAction.push(`attempting to refute a report on drug side effects in your arcology.`);
							hostageAction.push(`refusing to believe pictures of excessively expanded slaves in your arcology are real.`);
							hostageAction.push(`refusing to show off ${his} natural body.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`refusing to believe a report on drug side effects in your arcology.`);
							hostageAction.push(`gasping in surprise at pictures of excessively expanded slaves in your arcology.`);
							hostageAction.push(`reluctantly doing a series of stretching exercises to show off ${his} natural body.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`gasping at a report on drug side effects in your arcology.`);
							hostageAction.push(`gasping in horror at pictures of excessively expanded slaves in your arcology.`);
							hostageAction.push(`doing a series of stretching exercises to show off ${his} natural body.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`crying over a report on drug side effects in your arcology.`);
							hostageAction.push(`crying in terror at pictures of excessively expanded slaves in your arcology.`);
							hostageAction.push(`happily doing a series of stretching exercises to show off ${his} natural body.`);
						} else {
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`making a public speech over drug side effects in your arcology.`);
							hostageAction.push(`genuinely thanking ${his} owner for keeping ${him} healthy and from becoming nothing more than a bloated pair of tits and ass.`);
							hostageAction.push(`showing off ${his} completely natural body with pride before an audience of civilians.`);
						}
						break;
					case "Pastoralism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight -= 5;
							V.hostage.muscles += 5;
							hostageAction.push(`angrily jogging on a treadmill, ${his} fat body and big tits jiggling constantly.`);
							hostageAction.push(`trying to catch ${his} breath and stop ${his} fat body from sweating.`);
							hostageAction.push(`struggling to run ${his} overweight body around a track.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight -= 5;
							V.hostage.muscles += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`reluctantly doing sit-ups, ${his} plush body struggling to manage.`);
							hostageAction.push(`checking ${himself} out in the mirror, gawking at how much weight ${he}'s lost.`);
							hostageAction.push(`attempting to run a lap around the track despite ${his} overweight body.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight -= 5;
							V.hostage.muscles += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`lifting weights, ${his} soft body barely hiding ${his} bulging muscles.`);
							hostageAction.push(`pinching ${his} remaining flab and making a disgusted face.`);
							hostageAction.push(`running laps around the track to burn off ${his} excess body fat.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight -= 5;
							V.hostage.muscles += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`eagerly pumping iron using ${his} lean and powerful body.`);
							hostageAction.push(`massaging body oil into ${his} abs and checking ${himself} out in a mirror.`);
							hostageAction.push(`eagerly running laps around a track, showing off ${his} thin and fit body.`);
						} else {
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`performing an impressive clean and jerk, and then giving ${his} owner a high five.`);
							hostageAction.push(`massaging body oil into ${his} abs and posing in front of the mirror. ${He} is proud to have gone from a fat cow to a ripped goddess.`);
							hostageAction.push(`running laps around a track, competing with other eagerly competitive slaves to be the best.`);
						}
						break;
					case "Cummunism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.boobs += 1000;
							V.hostage.lactation = 2;
							V.hostage.lactationDuration = 2;
							hostageAction.push(`trying desperately to extract the milk from ${his} massive ${V.hostage.boobs}cc tits. ${He} appears to have gained some weight.`);
							hostageAction.push(`sobbing as ${he} massages ${his} sore ${V.hostage.boobs}cc udders.`);
							hostageAction.push(`sobbing as the milkers drain ${his} ${V.hostage.boobs}cc udders.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.boobs += 1000;
							V.hostage.lactation = 2;
							V.hostage.lactationDuration = 2;
							hostageAction.push(`reluctantly asking for ${his} massive ${V.hostage.boobs}cc tits to be milked. ${He}'s certainly getting soft.`);
							hostageAction.push(`crying as rubs ${his} uncomfortably massive ${V.hostage.boobs}cc udders and softening belly.`);
							hostageAction.push(`sighing as the milkers drain ${his} big ${V.hostage.boobs}cc udders while ${he} massages ${his} softening belly.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.boobs += 1000;
							V.hostage.lactation = 2;
							V.hostage.lactationDuration = 2;
							hostageAction.push(`happily asking for ${his} truly immense ${V.hostage.boobs}cc breasts to be milked. ${His} body has become notably plush.`);
							hostageAction.push(`humming as ${he} soothes ${his} truly immense sore ${V.hostage.boobs}cc udders. ${He} lets off a content sigh as ${he} jiggles ${his} soft belly.`);
							hostageAction.push(`sighing with relief as the milkers drain ${his} huge ${V.hostage.boobs}cc udders while ${he} massages ${his} jiggly belly.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.boobs += 1000;
							V.hostage.lactation = 2;
							V.hostage.lactationDuration = 2;
							hostageAction.push(`begging for ${his} immobilizing ${V.hostage.boobs}cc tits to be drained. ${He} has become quite fat.`);
							hostageAction.push(`happily playing with ${his} ${V.hostage.boobs}cc udders. ${He} squirms and giggles as ${his} entire body jiggles in response.`);
							hostageAction.push(`happily humming as the milkers drain ${his} giant ${V.hostage.boobs}cc udders while ${he} plays with ${his} fat belly and breasts.`);
						} else {
							V.hostage.lactation = 2;
							V.hostage.lactationDuration = 2;
							hostageAction.push(`resting atop ${his} monstrous ${V.hostage.boobs}cc tits, whining about not being allowed to have ${his} assets swollen more and that ${he} has to squeeze ${his} milk out ${himself}.`);
							hostageAction.push(`moans lewdly as a pair of slaves massage ${his} ${V.hostage.boobs}cc udders, and as a third appears from under ${his} heavy body.`);
							hostageAction.push(`moaning loudly as the milkers drain ${his} massive ${V.hostage.boobs}cc udders.`);
						}
						break;
					case "Physical Idealism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.boobs += 50;
							V.hostage.counter.vaginal += 28;
							hostageAction.push(`trying desperately to vomit up all the food forced into ${his} bloated stomach while being thwarted by a specialized gag. ${He} appears to have gained some weight.`);
							hostageAction.push(`sobbing as ${he} is forcibly raped and broken in.`);
							hostageAction.push(`sobbing as ${he} is forced is experience all manner of perversion in an effort to reveal ${his} fetishes.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.boobs += 100;
							V.hostage.counter.vaginal += 28;
							switch (V.hostage.fetish) {
								case "cumslut":
									V.hostage.counter.oral += 70;
									break;
								case "buttslut":
									V.hostage.counter.anal += 21;
									V.hostage.anus = 3;
									break;
								case "boobs":
									V.hostage.boobs += 100;
									V.hostage.boobsImplant += 100;
									if (V.hostage.boobsImplant > 2000) {
										V.hostage.boobsImplantType = "advanced fillable";
									}
									break;
								case "pregnancy":
									V.hostage.preg++;
									V.hostage.pregKnown = 1;
									V.hostage.pregWeek++;
									SetBellySize(V.hostage);
									break;
							}
							hostageAction.push(`relaxing in ${his} comfy bed carefully exploring ${his} food-stuffed belly and its unique curvature. ${He}'s certainly getting soft.`);
							hostageAction.push(`crying as ${he} rubs the uncomfortable bulge of ${his} overfilled stomach and soft belly as yet another guy fucks ${his} loosening cunt.`);
							switch (V.hostage.fetish) {
								case "submissive":
									hostageAction.push(`struggling to hold back ${his} joy as ${he} is forced to eat out another slave.`);
									break;
								case "cumslut":
									hostageAction.push(`struggling to hold back ${his} joy as a hot load spurts across ${his} face.`);
									break;
								case "humiliation":
									hostageAction.push(`struggling to hold back ${his} joy as ${he} is paraded, naked, through the arcology.`);
									break;
								case "buttslut":
									hostageAction.push(`struggling to hold back ${his} joy as ${his} ass is roughly fucked.`);
									break;
								case "boobs":
									hostageAction.push(`struggling to hold back ${his} joy as ${he} checks out ${his} new ${V.hostage.boobsImplant}cc implants.`);
									break;
								case "sadist":
									hostageAction.push(`struggling to hold back ${his} joy as ${he} is encouraged to beat a slave that spilled a cup of food on the clean floor.`);
									break;
								case "masochist":
									hostageAction.push(`struggling to hold back ${his} joy as ${his} nipples are cruelly pinched and twisted.`);
									break;
								case "dom":
									hostageAction.push(`struggling to hold back ${his} joy as ${he} is told to order a waiting slave to do whatever ${he} wants.`);
									break;
								case "pregnancy":
									hostageAction.push(`struggling to hold back ${his} joy as another huge load shoots into ${his} fertile womb.`);
									break;
							}
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.boobs += 100;
							V.hostage.counter.vaginal += 35;
							switch (V.hostage.fetish) {
								case "cumslut":
									V.hostage.counter.oral += 70;
									break;
								case "buttslut":
									V.hostage.counter.anal += 35;
									V.hostage.anus = 3;
									break;
								case "boobs":
									V.hostage.boobs += 100;
									V.hostage.boobsImplant += 100;
									if (V.hostage.boobsImplant > 2000) {
										V.hostage.boobsImplantType = "advanced fillable";
									}
									break;
								case "pregnancy":
									V.hostage.preg++;
									V.hostage.pregKnown = 1;
									V.hostage.pregWeek++;
									SetBellySize(V.hostage);
									break;
							}
							hostageAction.push(`relaxing in ${his} comfy bed sucking on ${his} feeding tube. One hand is fondling ${his} thick body while the other is teasing ${his} clit. ${His} body has become notably plush, made even more obvious when an orgasm sends ripples through ${his} soft flesh.`);
							hostageAction.push(`humming as ${he} soothes ${his} full belly as ${he} enjoys a good fucking.`);
							switch (V.hostage.fetish) {
								case "submissive":
									hostageAction.push(`begging ${his} master-slave to permit ${him} to service ${hisU} dick.`);
									break;
								case "cumslut":
									hostageAction.push(`happily sucking a dick and swallowing every last drop of cum.`);
									break;
								case "humiliation":
									hostageAction.push(`walking alongside ${his} master in a figure-revealing pair of tight pants and a tube top. The pair of vibrators on ${his} nipples and the huge dildo in ${his} cunt are obvious through the taut material.`);
									break;
								case "buttslut":
									hostageAction.push(`happily taking a huge dick in ${his} ass while wishing it was even bigger.`);
									break;
								case "boobs":
									hostageAction.push(`happily teasing a dick between ${his} new ${V.hostage.boobsImplant}cc implants.`);
									break;
								case "sadist":
									hostageAction.push(`happily tormenting a sissy slave's limp dick as ${he} rails ${himU} with a strap-on.`);
									break;
								case "masochist":
									hostageAction.push(`struggling to smile while being strangled during sex.`);
									break;
								case "dom":
									hostageAction.push(`forcing ${his} sissy slave to feed ${him} ${his} favorite foods while hoping ${heU} makes a mistake so ${heU} may be punished.`);
									break;
								case "pregnancy":
									hostageAction.push(`humming softly as ${he} caresses ${his} early pregnancy.`);
									break;
							}
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight += 5;
							V.hostage.boobs += 100;
							V.hostage.counter.vaginal += 40;
							switch (V.hostage.fetish) {
								case "cumslut":
									V.hostage.counter.oral += 70;
									break;
								case "buttslut":
									V.hostage.counter.anal += 35;
									V.hostage.anus = 4;
									break;
								case "boobs":
									V.hostage.boobs += 100;
									V.hostage.boobsImplant += 100;
									if (V.hostage.boobsImplant > 2000) {
										V.hostage.boobsImplantType = "advanced fillable";
									}
									break;
								case "pregnancy":
									V.hostage.preg++;
									V.hostage.pregKnown = 1;
									V.hostage.pregWeek++;
									SetBellySize(V.hostage);
									break;
							}
							hostageAction.push(`relaxing in ${his} comfy bed surrounded by mountains of molded slave food. ${He} is eagerly shoving handfuls of the fattening treats into ${his} mouth while simultaneously begging for someone to fill ${his} neglected pussy. ${He} has become quite fat; ${his} body jiggles with every motion.`);
							hostageAction.push(`happily stuffing ${his} face as another guy fucks ${his} fat body.`);
							switch (V.hostage.fetish) {
								case "submissive":
									hostageAction.push(`desperately begging for ${his} master-slave to tear ${him} out of ${his} clothes and rape ${him} on the spot.`);
									break;
								case "cumslut":
									hostageAction.push(`desperately begging for the owner of the dick being waved in ${his} face to shower ${him} with cum.`);
									break;
								case "humiliation":
									hostageAction.push(`standing on a balcony fully nude shouting at passersby to ogle ${him}, desperate for stronger forms of humiliation.`);
									break;
								case "buttslut":
									hostageAction.push(`begging for more cocks in ${his} ass as the two men already penetrating it struggle to not get too intimate with each other.`);
									break;
								case "boobs":
									hostageAction.push(`groping ${his} already huge ${V.hostage.boobsImplant}cc breasts and begging for them to be even bigger.`);
									break;
								case "sadist":
									hostageAction.push(`cumming hard as the slave mounting ${him} writhes in pain at ${hisU} torment.`);
									break;
								case "masochist":
									hostageAction.push(`cumming hard as ${he} is beaten during sex.`);
									break;
								case "dom":
									hostageAction.push(`sitting on a slave that displeased ${him} and forcing the struggling ${girlU} to eat ${him} out.`);
									break;
								case "pregnancy":
									hostageAction.push(`puffing out ${his} already large belly pretending to be even more pregnant than ${he} already is.`);
									break;
							}
						} else {
							V.hostage.weight += 5;
							V.hostage.boobs += 100;
							V.hostage.counter.vaginal += 60;
							switch (V.hostage.fetish) {
								case "cumslut":
									V.hostage.counter.oral += 70;
									break;
								case "buttslut":
									V.hostage.counter.anal += 45;
									break;
								case "boobs":
									V.hostage.boobs += 100;
									V.hostage.boobsImplant += 100;
									if (V.hostage.boobsImplant > 2000) {
										V.hostage.boobsImplantType = "advanced fillable";
									}
									break;
								case "pregnancy":
									V.hostage.preg++;
									V.hostage.pregKnown = 1;
									V.hostage.pregWeek++;
									SetBellySize(V.hostage);
									break;
							}
							hostageAction.push(`relaxing in ${his} comfy bed surrounded by mountains of molded slave food. ${He} is greedily shoving handfuls of the fattening treats into ${his} mouth as fast as ${he} can. ${He} has grown enormously fat and ${his} belly is jiggling oddly. When ${he} repositions ${himself}, you catch sight of a quartet of large vibrating dildos crammed into ${his} stretched cunt.`);
							switch (V.hostage.fetish) {
								case "submissive":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy.`);
									hostageAction.push(`going out of ${his} way to bring ${his} partner to orgasm with no interest in ${his} own.`);
									break;
								case "cumslut":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy. Several more encircle ${him}, ready to shower ${him} with cum the moment ${he} climaxes.`);
									hostageAction.push(`greedily sucking cocks, desperate to fill ${himself} with cum.`);
									break;
								case "humiliation":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy.`);
									hostageAction.push(`in the center of a gangbang ${he} started in the middle of one of the arcology's shopping malls.`);
									break;
								case "buttslut":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy. Another struggles to support ${his} weight as he plows ${his} gaping anus.`);
									hostageAction.push(`desperately trying to shove a fifth dildo into ${his} asshole and becoming distraught when it doesn't fit.`);
									break;
								case "boobs":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy. ${He} takes time between bites to hungrily fondle ${his} ${V.hostage.boobs}cc tits.`);
									hostageAction.push(`crying with joy after ${his} breasts ruined a shirt ${he} was just able to fit into that morning.`);
									break;
								case "sadist":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy.`);
									hostageAction.push(`laughing maniacally as ${he} beats a slave viciously as ${he} rides ${himU}. ${He} keeps going even after the poor ${girlU}'s dick breaks from penetrating ${him} at a bad angle.`);
									break;
								case "masochist":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy.`);
									hostageAction.push(`going out of ${his} way to find the most undesirable men in the arcology to offer ${himself} to.`);
									break;
								case "dom":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy.`);
									hostageAction.push(`mercilessly beating the unfortunate slave servicing ${him} as punishment for knocking over ${his} tray of snacks.`);
									break;
								case "pregnancy":
									hostageAction.push(`greedily stuffing ${his} face with slave food as a pair of guys double team ${his} ruined pussy. ${He} takes time between bites to hungrily fondle ${his} pregnancy.`);
									hostageAction.push(`deliriously crying for ${his} current lover to pump more children into ${his} pregnant womb.`);
									break;
							}
						}
						break;
					case "Hedonistic Decadence":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight -= 5;
							V.hostage.muscles += 5;
							hostageAction.push(`angrily jogging on a treadmill, ${his} fat body and big tits jiggling constantly.`);
							hostageAction.push(`trying to catch ${his} breath and stop ${his} fat body from sweating.`);
							hostageAction.push(`struggling to run ${his} overweight body around a track.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight -= 5;
							V.hostage.muscles += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`reluctantly doing sit-ups, ${his} plush body struggling to manage.`);
							hostageAction.push(`checking ${himself} out in the mirror, gawking at how much weight ${he}'s lost.`);
							hostageAction.push(`attempting to run a lap around the track despite ${his} overweight body.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight -= 5;
							V.hostage.muscles += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`lifting weights, ${his} soft body barely hiding ${his} bulging muscles.`);
							hostageAction.push(`pinching ${his} remaining flab and making a disgusted face.`);
							hostageAction.push(`running laps around the track to burn off ${his} excess body fat.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.weight -= 5;
							V.hostage.muscles += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`eagerly pumping iron using ${his} lean and powerful body.`);
							hostageAction.push(`massaging body oil into ${his} abs and checking ${himself} out in a mirror.`);
							hostageAction.push(`eagerly running laps around a track, showing off ${his} thin and fit body.`);
						} else {
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`performing an impressive clean and jerk, and then giving ${his} owner a high five.`);
							hostageAction.push(`massaging body oil into ${his} abs and posing in front of the mirror. ${He} is proud to have gone from a fat cow to a ripped goddess.`);
							hostageAction.push(`running laps around a track, competing with other eagerly competitive slaves to be the best.`);
						}
						break;
					case "Chattel Religionism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							hostageAction.push(`attempting to refute a report on what's expected of slaves as part of your new religion.`);
							hostageAction.push(`refusing to believe a video of a religious service in your arcology is real.`);
							hostageAction.push(`refusing to socialize with other slaves.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`refusing to believe a report on what's expected of slaves as part of your new religion.`);
							hostageAction.push(`questioning the validity of a video of a religious service in your arcology.`);
							hostageAction.push(`reluctantly spending time in ${his} arcology's cosmopolitan public spaces.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`gasping at a report on what's expected of slaves as part of your new religion.`);
							hostageAction.push(`gasping at the absurdity of a video of a religious service in your arcology.`);
							hostageAction.push(`cautiously chatting with a group of slaves in ${his} arcology's cosmopolitan public spaces.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`crying over a report on what's expected of slaves as part of your new religion.`);
							hostageAction.push(`shaking ${his} head in incomprehension at video of a religious service in your arcology.`);
							hostageAction.push(`happily chatting with a group of slaves in ${his} arcology's cosmopolitan public spaces.`);
						} else {
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`making a public speech on the horrors of your new religion.`);
							hostageAction.push(`laughing at the ridiculousness of a video of a religious service in your arcology.`);
							hostageAction.push(`chatting with a group of slaves and feeling right at home in ${his} arcology's cosmopolitan public spaces.`);
						}
						break;
					case "Multiculturalism":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							hostageAction.push(`refusing the tenets of ${his} new religion.`);
							hostageAction.push(`refusing to pray for your arcology's salvation.`);
							hostageAction.push(`freaking out as several men approach ${him} for sex.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							V.hostage.counter.mammary += 10;
							hostageAction.push(`reluctantly following the tenets of ${his} new religion.`);
							hostageAction.push(`questioning why ${he} is made to pray for your arcology's salvation.`);
							hostageAction.push(`crying as ${he} is forced to service three dicks at once.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 25;
							V.hostage.counter.vaginal += 25;
							V.hostage.counter.anal += 25;
							V.hostage.counter.mammary += 25;
							hostageAction.push(`praying for the souls of the citizens and slaves of your arcology.`);
							hostageAction.push(`trying to pray for your arcology's salvation.`);
							hostageAction.push(`attempting to please the three dicks in ${him} as quickly as possible.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.counter.mammary += 50;
							hostageAction.push(`crying over the souls of the citizens and slaves of your arcology.`);
							hostageAction.push(`steadily praying for your arcology's salvation.`);
							hostageAction.push(`enjoying belonging to a religion so intent to fill ${him} with dicks.`);
						} else {
							V.hostage.counter.oral += 100;
							V.hostage.counter.vaginal += 100;
							V.hostage.counter.anal += 100;
							V.hostage.counter.mammary += 100;
							hostageAction.push(`imploring the public to pray for the salvation of the citizens and slaves of your arcology.`);
							hostageAction.push(`desperately praying for the salvation of your arcology.`);
							hostageAction.push(`having a religious experience with as many dicks ${his} body can fit inside itself.`);
						}
						break;
					case "Intellectual Dependency":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							hostageAction.push(`refusing to pay attention to ${his} lessons.`);
							hostageAction.push(`refusing to act like a proper ${girl}.`);
							hostageAction.push(`forced into remedial training after threatening ${his} owner's reputation.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant + 1, 0, 30);
							V.hostage.skill.oral = Math.clamp(V.hostage.skill.oral + 5, 0, 100);
							V.hostage.skill.entertainment = Math.clamp(V.hostage.skill.entertainment + 5, 0, 100);
							V.hostage.skill.anal = Math.clamp(V.hostage.skill.anal + 5, 0, 100);
							V.hostage.skill.vaginal = Math.clamp(V.hostage.skill.vaginal + 5, 0, 100);
							V.hostage.skill.whoring = Math.clamp(V.hostage.skill.whoring + 5, 0, 100);
							hostageAction.push(`crying silently while being positioned to properly please ${his} partner.`);
							hostageAction.push(`reluctantly balancing a book on ${his} head to perfect ${his} posture.`);
							hostageAction.push(`reluctantly practicing enunciation to not risk angering ${his} owner.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant + 2, 0, 30);
							V.hostage.skill.oral = Math.clamp(V.hostage.skill.oral + 5, 0, 100);
							V.hostage.skill.entertainment = Math.clamp(V.hostage.skill.entertainment + 5, 0, 100);
							V.hostage.skill.anal = Math.clamp(V.hostage.skill.anal + 5, 0, 100);
							V.hostage.skill.vaginal = Math.clamp(V.hostage.skill.vaginal + 5, 0, 100);
							V.hostage.skill.whoring = Math.clamp(V.hostage.skill.whoring + 5, 0, 100);
							hostageAction.push(`attempting to pass an exam on sexual satisfaction.`);
							hostageAction.push(`trying to show no reaction as ${he} is felt up by ${his} owner's client.`);
							hostageAction.push(`attempting to please ${his} owner's friends and not be a failure.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant + 2, 0, 30);
							V.hostage.skill.oral = Math.clamp(V.hostage.skill.oral + 5, 0, 100);
							V.hostage.skill.entertainment = Math.clamp(V.hostage.skill.entertainment + 5, 0, 100);
							V.hostage.skill.anal = Math.clamp(V.hostage.skill.anal + 5, 0, 100);
							V.hostage.skill.vaginal = Math.clamp(V.hostage.skill.vaginal + 5, 0, 100);
							V.hostage.skill.whoring = Math.clamp(V.hostage.skill.whoring + 5, 0, 100);
							hostageAction.push(`demonstrating proper technique in drawing out a powerful ejaculation.`);
							hostageAction.push(`elegantly luring in a client for ${his} owner.`);
							hostageAction.push(`giving a blowjob to ${his} owner's client during business negotiations.`);
						} else {
							V.hostage.counter.oral += 10;
							V.hostage.counter.vaginal += 10;
							V.hostage.counter.anal += 10;
							hostageAction.push(`diligently showcasing a series of advanced sexual positions to a group of fresh ${girlU}s.`);
							hostageAction.push(`acting with refined grace even as a strand of cum splashes across ${his} face.`);
							hostageAction.push(`holding perfectly still as ${his} owner and a client eat sushi off ${his} nude body. Even as they amuse themselves with ${his} vulnerable clit and nipples, ${he} shows no reaction.`);
						}
						break;
					case "Slave Professionalism":
						if (V.rival.duration <= 5) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.counter.vaginal += 10;
							V.hostage.energy += 5;
							V.hostage.addict += 2;
							V.hostage.hLength += 7;
							V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant - 5, 0, 30);
							V.hostage.intelligence = Math.clamp(V.hostage.intelligence - 5, -100, 100);
							hostageAction.push(`sobbing as ${he} struggles to not masturbate after a large hit of aphrodisiacs.`);
							hostageAction.push(`holding ${his} head and struggling to recite ${his} favorite poem.`);
							hostageAction.push(`refusing to put on the makeup presented to ${him}.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant - 5, 0, 30);
							V.hostage.intelligence = Math.clamp(V.hostage.intelligence - 5, -100, 100);
							V.hostage.counter.oral += 30;
							V.hostage.counter.vaginal += 30;
							V.hostage.counter.anal += 30;
							V.hostage.energy += 5;
							V.hostage.addict += 2;
							V.hostage.hLength += 7;
							hostageAction.push(`crying as ${he} rides a dick to orgasm.`);
							hostageAction.push(`trying not to lose the memories of ${his} life before being captured.`);
							hostageAction.push(`hesitantly trying on clothes and admiring ${his} figure in the mirror.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.fetishStrength += 5;
							V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant - 5, 0, 30);
							V.hostage.intelligence = Math.clamp(V.hostage.intelligence - 10, -100, 100);
							V.hostage.counter.oral += 50;
							V.hostage.counter.vaginal += 50;
							V.hostage.counter.anal += 50;
							V.hostage.energy += 5;
							V.hostage.addict += 2;
							V.hostage.hLength += 7;
							hostageAction.push(`being presented with a selection of amusements and instead opting for the one between ${hisU} legs.`);
							hostageAction.push(`walking around with ${his} breasts bouncing out of ${his} top and ${his} short skirt revealing ${his} lack of panties.`);
							hostageAction.push(`admiring ${himself} in the mirror.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust += 5;
							V.hostage.devotion += 5;
							V.hostage.intelligenceImplant = Math.clamp(V.hostage.intelligenceImplant - 5, 0, 30);
							V.hostage.intelligence = Math.clamp(V.hostage.intelligence - 10, -100, 100);
							V.hostage.counter.oral += 70;
							V.hostage.counter.vaginal += 40;
							V.hostage.counter.anal += 30;
							V.hostage.energy += 5;
							V.hostage.addict += 2;
							V.hostage.hLength += 7;
							V.hostage.lips = Math.clamp(V.hostage.lips + 5, 0, 100);
							if (V.seePreg !== 0) {
								V.hostage.preg++;
								V.hostage.pregWeek++;
								SetBellySize(V.hostage);
							}
							hostageAction.push(`sloppily sucking a dick while taking it in both ${his} ass and pussy.`);
							hostageAction.push(`struggling to fasten ${his} top before giving up and going without it.`);
							if (V.seePreg !== 0) {
								hostageAction.push(`attempting to suck in ${his} ever-growing pregnancy.`);
							}
							hostageAction.push(`pursing ${his} swollen lips at ${his} own reflection.`);
						} else {
							V.hostage.counter.oral += 70;
							V.hostage.counter.vaginal += 40;
							V.hostage.counter.anal += 30;
							V.hostage.hLength += 7;
							V.hostage.lips = Math.clamp(V.hostage.lips + 5, 0, 100);
							if (V.seePreg !== 0) {
								V.hostage.preg++;
								V.hostage.pregWeek++;
								SetBellySize(V.hostage);
							}
							hostageAction.push(`taking as many dicks as ${he} can think of: one in the mouth, two in`);
							if (V.hostage.vagina > -1) {
								r.push(`each`);
							} else {
								r.push(his);
							}
							r.push(`hole, and another in each hand.`);
							hostageAction.push(`pushing on a sliding door, begging to be let out.`);
							hostageAction.push(`checking out ${his} reflection in a window, blissfully unaware of the show ${he} is giving to street below.`);
						}
						break;
					case "Petite Admiration":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 1;
							V.hostage.counter.vaginal += 1;
							V.hostage.counter.anal += 1;
							hostageAction.push(`struggling in vain as ${he} is carried around by ${his} towering partner.`);
							hostageAction.push(`crammed under a bed to escape ${his} much larger partner.`);
							hostageAction.push(`struggling to pull ${his} head away from ${his} much larger partner's crotch.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 7;
							V.hostage.counter.vaginal += 3;
							V.hostage.counter.anal += 3;
							hostageAction.push(`crying to ${himself} in the arms of ${his} towering partner as ${he} is carried around one of the arcology's public spaces.`);
							hostageAction.push(`cringing as ${his} much larger partner sits ${him} in ${his2} lap and paws at ${him}.`);
							hostageAction.push(`crying gently as ${his} much larger partner forces ${his} face to ${his2} crotch.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 15;
							V.hostage.counter.vaginal += 7;
							V.hostage.counter.anal += 7;
							hostageAction.push(`calmly letting ${his} towering partner carry ${him} around one of the arcology's public spaces.`);
							hostageAction.push(`carefully sitting in ${his} much larger partner's lap and letting ${him2} fondle ${his} body.`);
							hostageAction.push(`carefully putting ${his} mouth to use on ${his} much larger partner's crotch.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 15;
							V.hostage.counter.vaginal += 7;
							V.hostage.counter.anal += 7;
							hostageAction.push(`happily letting ${his} towering partner carry ${him} around one of the arcology's public spaces as ${he} fondles ${his2} genitals.`);
							hostageAction.push(`happily resting in ${his} much larger partner's lap as ${he2} pets ${his} head.`);
							hostageAction.push(`happily putting ${his} mouth to work on ${his} much larger partner's genitals.`);
						} else {
							V.hostage.counter.oral += 30;
							V.hostage.counter.vaginal += 15;
							V.hostage.counter.anal += 15;
							hostageAction.push(`begging for ${his} towering partner to pick ${him} up and take ${him} for a walk'n'fuck.`);
							hostageAction.push(`enjoying the feeling of ${his} much larger partner inside of ${him} as ${he} rests on ${his2} lap.`);
							hostageAction.push(`happily putting ${his} mouth to work on ${his} much larger partner's genitals as ${he2} returns the favor.`);
						}
						break;
					case "Statuesque Glorification":
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 1;
							V.hostage.counter.vaginal += 1;
							V.hostage.counter.anal += 1;
							hostageAction.push(`sitting on a table, out of reach of a shorter ${woman2} and swearing at ${him2}.`);
							hostageAction.push(`keeping ${his} smaller partner from reaching ${him}.`);
							hostageAction.push(`rebuking ${his} smaller partner's advances.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 3;
							V.hostage.counter.vaginal += 7;
							V.hostage.counter.anal += 7;
							hostageAction.push(`crying gently as a shorter ${woman2} eagerly fondles ${him}.`);
							hostageAction.push(`shying away from ${his} shorter partner.`);
							hostageAction.push(`curiously exploring ${his} shorter partner's body.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.oral += 7;
							V.hostage.counter.vaginal += 13;
							V.hostage.counter.anal += 13;
							hostageAction.push(`trying to catch a break from ${his} shorter partner's tongue in ${his} pussy.`);
							hostageAction.push(`spooning ${his} shorter partner.`);
							hostageAction.push(`cautiously giving ${his} shorter partner a full body massage.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.oral += 7;
							V.hostage.counter.vaginal += 13;
							V.hostage.counter.anal += 13;
							hostageAction.push(`patting ${his} tiny lover's head.`);
							hostageAction.push(`resting ${his} head on ${his} tiny love's lap.`);
							hostageAction.push(`helping support ${his} tiny lover so ${he2} can fuck ${him} properly.`);
						} else {
							V.hostage.counter.oral += 15;
							V.hostage.counter.vaginal += 25;
							V.hostage.counter.anal += 25;
							hostageAction.push(`basking in the afterglow with ${his} tiny love seated in ${his} lap.`);
							hostageAction.push(`whispering something sexy into ${his} tiny lover's ear.`);
							hostageAction.push(`hugging ${his} tiny lover tight as ${he2} fucks ${him} as deep as ${he2} can.`);
						}
						break;
					default:
						if (V.rival.duration <= 5) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							hostageAction.push(`refusing to believe what happens to slaves who don't fit into your arcology's revivalist culture.`);
							hostageAction.push(`refusing to believe a video of your arcology's revivalist public events is real.`);
							hostageAction.push(`refusing to socialize with other slaves.`);
						} else if (V.rival.duration <= 10) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`reluctantly reading a report on what happens to slaves who don't fit into your arcology's revivalist culture.`);
							hostageAction.push(`questioning the validity of a video of your arcology's revivalist public events.`);
							hostageAction.push(`reluctantly spending time in ${his} arcology's modern public spaces.`);
						} else if (V.rival.duration <= 15) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.fetishStrength += 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`gasping at a report on what happens to slaves who don't fit into your arcology's revivalist culture.`);
							hostageAction.push(`gasping at the absurdity of a video of your arcology's revivalist public events.`);
							hostageAction.push(`cautiously chatting with a group of slaves in ${his} arcology's modern public spaces.`);
						} else if (V.rival.duration <= 20) {
							V.hostage.trust -= 5;
							V.hostage.devotion -= 5;
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`crying over a report on what happens to slaves who don't fit into your arcology's revivalist culture.`);
							hostageAction.push(`shaking ${his} head in incomprehension at video of your arcology's revivalist public events.`);
							hostageAction.push(`happily chatting with a group of slaves in ${his} arcology's modern public spaces.`);
						} else {
							V.hostage.counter.vaginal += 1;
							hostageAction.push(`educating the public on what happens to slaves who don't fit into your arcology's revivalist culture.`);
							hostageAction.push(`laughing at the ridiculousness of a video of your arcology's revivalist public events.`);
							hostageAction.push(`chatting with a group of slaves and feeling right at home in ${his} arcology's modern public spaces.`);
						}
				}
				r.push(hostageAction.random());
			}
		}

		App.Events.addParagraph(node, r);

		App.UI.DOM.appendNewElement("p", node, `You remind yourself that success in this conflict will not be defined by the traditional measures of impending victory and defeat. The primary concern here is the weight of your holdings against those of your opponent. Improving your arcology's prosperity will move you closer to victory${V.rival.state === 2 ? `, and so will attacking the prosperity of your rival's neighboring arcology through economic means` : ``}. Of course, you can also take more direct action.`);

		r = [];

		r.push(`${capFirstChar(V.assistant.name)} collates several options for directly attacking your rival. This is a corporate war, not a military one; your peers would not tolerate a direct attack on ${himR}. You must bankrupt your opponent so they are no longer able to hide within the physical and intangible fortress that is their arcology. Your rival`);
		if ((V.rival.prosperity - V.rival.power) / V.arcologies[0].prosperity < 0.6) {
			r.push(`is on their economic knees, putting them on the verge of defeat.`);
		} else if ((V.rival.prosperity - V.rival.power) / V.arcologies[0].prosperity < 0.7) {
			r.push(`is in a bad financial state, well on the way to final dissolution and defeat.`);
		} else if ((V.rival.prosperity - V.rival.power) / V.arcologies[0].prosperity < 0.8) {
			r.push(`has taken some hard corporate blows but is still standing.`);
		} else if ((V.rival.prosperity - V.rival.power) / V.arcologies[0].prosperity < 0.9) {
			r.push(`is starting to feel the pressure.`);
		} else {
			r.push(`is essentially undamaged; you have hard work ahead of you.`);
		}
		App.Events.addParagraph(node, r);

		const result = App.UI.DOM.appendNewElement("div", node);

		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Apply ${cashFormat(10000)} in standard corporate warfare`,
			() => {
				cashX(-10000, "war");
				if (random(1, 100) > 50) {
					V.rival.power += 2;
					jQuery(result).empty().append(`Money is your infantry, your weapon, your ammunition in one. Last century, your soldiers would have died taking the enemy's positions. Today, your ¤ die <span class="positive">taking</span> ${hisR} holdings. Once more unto the breach.`);
				} else {
					V.rival.power++;
					jQuery(result).empty().append(`Money is your infantry, your weapon, your ammunition in one. Last century, your soldiers would have died before the enemy's machine guns. Today, your ¤ die <span class="red">failing to take</span> ${hisR} holdings. Once more unto the breach.`);
				}
			}
		));

		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Spend ${cashFormat(10000)} funding sabotage`,
			() => {
				cashX(-10000, "war");
				if (random(1, 100) > 70) {
					repX(-100, "war");
					V.rival.power += 5;
					jQuery(result).empty().append(`Since you are not so uncouth as to, for example, help fund a coup attempt, you fund traditional acts of corporate sabotage, including hacking, slander, and actual, physical thievery. There are some <span class="reputation dec">minor rumors</span> that you are to blame, but they're outweighed by the <span class="positive">great pressure</span> these incidents put on your enemy.`);
				} else {
					repX(-500, "war");
					V.rival.power += 2;
					jQuery(result).empty().append(`Since you are not so uncouth as to, for example, help fund a coup attempt, you fund traditional acts of corporate sabotage, including hacking, slander, and actual, physical thievery. Unfortunately, you seem to be a step behind this week. Your enemy <span class="red">prevents</span> many of your attacks, and even manages to turn a few minor players into public confessions that <span class="reputation dec">damage</span> your reputation.`);
				}
			}
		));
		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Use ${cashFormat(25000)} creating local shortages`,
			() => {
				cashX(-25000, "war");
				V.rival.power += 3;
				jQuery(result).empty().append(`With enough money, it's entirely possible to temporarily overwhelm even the advanced free market of the Free Cities. You choose a few critical items — pharmaceutical materials, electronic components, and other physical items — and purchase shipments intended for your rival's arcology. ${HisR} tenants are <span class="positive">seriously inconvenienced</span> and blame their difficulties on their hapless landlord.`);
			}
		));

		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Devote ${cashFormat(50000)} to purchasing the support of your peers`,
			() => {
				cashX(-50000, "war");
				V.rival.power += 5;
				jQuery(result).empty().append(`Your fellow arcology owners have an interest in seeing the funder of the Daughters' attempt on you destroyed, but few of them are willing to spend any money or real effort on the matter. You do a few of them the favor of making the money and effort spent yours. Your rival finds ${hisR} dealings with your mutual peers becoming <span class="positive">strangely difficult.</span> Market opinion is swinging your way.`);
			}
		));
		if (V.arcologies[0].FSRestartDecoration === 100) {
			if (V.rep >= 15000) {
				const link = App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
					`Use your connections to throttle your rival's arcology`,
					() => {
						V.rival.power += 10;
						jQuery(result).empty().append(`With every external, and several internal, supply lines severed, ${hisR} tenants are faced with imminent destruction and <span class="positive">rise up</span> against their hapless landlord. ${HeR} will not be able to weather such a siege for long.`);
					}
				));
				App.Events.addNode(link, [` This option is available due to your <span class="skill player">societal connections,</span> and will economically devastate your rival`], "span", "note");
			}
		}
		if (V.PC.career === "mercenary" || V.PC.career === "arcology owner") {
			if (V.mercenaries >= 3) {
				const link = App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
					`Your peers will tolerate an attack if it's covert`,
					() => {
						const el = new DocumentFragment();
						const r = [];
						r.push(`One night, you're working late in your office, ${V.assistant.name}'s avatar glowing companionably beside you. Without preamble, ${heA} reports to you in ${hisA} normal tones, "Team One reports ${nickname()} EKIA. Confirm, E. K. I. A. No other casualties, team exfiltrating."`);
						V.rival.prosperity = 0;
						V.rival.power = 0;
						if (V.rival.state === 2) {
							for (const arc of V.arcologies) {
								if (arc.rival === 1) {
									arc.embargo = 0;
									arc.embargoTarget = -1;
									arc.influenceTarget = -1;
									arc.rival = 0;
									arc.government = "direct democracy";
									break;
								}
							}
						}
						V.rival.state = 4;
						if (V.rival.hostageState === 1) {
							r.push(`${V.assistant.name} pauses. "Also confirm package is secure."`);
							V.rival.hostageState = 2;
						}
						r.push(`You go back to your work.`);
						App.Events.addNode(el, r, "div");
						jQuery(result).empty().append(el);
					}
				));
				App.Events.addNode(link, [` This option is available due to your <span class="skill player">military background,</span> and will immediately end the conflict without enslaving your rival`], "span", "note");
			}
		}

		if (V.PC.skill.hacking >= 100) {
			if (V.mercenaries >= 3) {
				const link = App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
					`Lock your rival down and let your mercs walk right in`,
					() => {
						const el = new DocumentFragment();
						const r = [];
						r.push(`While you hold your rival's arcology's system under your complete control, ${V.assistant.name} finally reports to you in ${hisA} normal tones, "Team One reports ${nickname()}`);
						const rivalCaptured = (random(0, 100) > 50);
						if (rivalCaptured) {
							r.push(`bagged and tagged. Confirm, bagged and tagged. No`);
						} else {
							r.push(`EKIA. Confirm, E. K. I. A. No other`);
						}
						r.push(`casualties, team exfiltrating."`);
						V.rival.prosperity = 0;
						V.rival.power = 0;
						if (V.rival.state === 2) {
							for (const arc of V.arcologies) {
								if (arc.rival === 1) {
									arc.embargo = 0;
									arc.embargoTarget = -1;
									arc.influenceTarget = -1;
									arc.rival = 0;
									arc.government = "direct democracy";
									if (rivalCaptured) {
										if (arc.FSSupremacist > 20) {
											// @ts-ignore
											V.rival.race = arc.FSSupremacistRace;
										} else if (arc.FSSubjugationist > 20) {
											V.rival.race = Array.from(App.Data.misc.filterRacesPublic.keys()).filter(race => race !== arc.FSSubjugationistRace).random();
										}
									}
									break;
								}
							}
						}
						if (rivalCaptured) {
							V.rival.state = 3;
						} else {
							V.rival.state = 4;
						}

						if (V.rival.hostageState === 1) {
							r.push(`${V.assistant.name} pauses. "Also confirm package is secure."`);
							V.rival.hostageState = 2;
						}
						r.push(`Smirking to yourself at a job well done, you`);
						if (rivalCaptured) {
							r.push(`await the bastard's arrival.`);
							App.Events.addParagraph(el, r);
							App.UI.DOM.appendNewElement("div", el, pRivalryCapture("mercs"));
						} else {
							r.push(`return to your usual work.`);
							App.Events.addParagraph(el, r);
						}

						jQuery(result).empty().append(el);
					}
				));
				App.Events.addNode(link, [` This option is available due to your <span class="skill player">your hacking mastery,</span> and will immediately end the conflict with a chance of enslaving your rival`], "span", "note");
			}
		}
		return node;
		function nickname() {
			switch (V.rival.FS.name) {
				case "Racial Subjugationism":
					return `Racemixer`;
				case "Racial Supremacism":
					return `Miscegenator`;
				case "Repopulation Focus":
					return `Sterilizer`;
				case "Eugenics":
					return `Breeder`;
				case "Gender Radicalism":
					return `Handholder`;
				case "Gender Fundamentalism":
					return `Sodomite`;
				case "Paternalism":
					return `Lucifer`;
				case "Degradationism":
					return `Archangel Prime`;
				case "Body Purism":
					return `Plastic Surgeon`;
				case "Transformation Fetishism":
					return `Purist One`;
				case "Youth Preferentialism":
					return `Cake Eater`;
				case "Maturity Preferentialism":
					return `Epheb`;
				case "Slimness Enthusiasm":
					return `Grower`;
				case "Asset Expansionism":
					return `Flat Lover`;
				case "Pastoralism":
					return `Gym Rat`;
				case "Physical Idealism":
					return `Feeder`;
				case "Hedonistic Decadence":
					return `Gym Rat`;
				case "Chattel Religionism":
					return `Cultural Marxist`;
				case "Multiculturalism":
					return `Prophet`;
				case "Intellectual Dependency":
					return `Teacher`;
				case "Slave Professionalism":
					return `Brain Drainer`;
				case "Petite Admiration":
					return `Macrophile`;
				case "Statuesque Glorification":
					return `Midget Muncher`;
				default:
					return `Target One`;
			}
		}
	}
};
