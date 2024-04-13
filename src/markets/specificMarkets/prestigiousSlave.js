App.Markets["Prestigious Slave"] = function() {
	let slave;
	let seed;
	const el = document.createElement("span");
	const options = [
		"porn star",
		"trophy wife",
		"sports star",
		"young model",
		"albino",
		"old-timer",
		"b-list actress",
		"politician",
		"princess",
		"arcology",
		"streamer",
	];
	const dickOptions = [
		"d herm",
		"d young herm",
		"d pornstar",
		"d trophy husband",
		"d sports star",
		"d young model",
		"d albino",
		"d old-timer",
		"d b-list actress",
		"d politician",
		"d princess",
		"d arcology",
		"d streamer",
	];
	App.UI.DOM.appendNewElement("p", el, `You check to see if any especially prestigious slaves are on auction.`);
	const content = App.UI.DOM.appendNewElement("span", el);
	if (V.prestigeAuctioned === 1) {
		App.UI.DOM.appendNewElement("span", el, ` There are none available right now, but there probably will be next week.`);
	} else {
		V.prestigeAuctioned = 1;
		seed = jsEither(Math.random() * 100 < V.seeDicks ? dickOptions : options);
		content.append(passage());
	}
	return el;

	function passage() {
		const frag = new DocumentFragment();
		if (V.cheatMode || V.debugMode) {
			const reload = () => {
				$(content).empty();
				content.append(passage());
			};
			const cheatOptions = (V.seeDicks > 0) ? options.concat(...dickOptions) : Array.from(options);
			frag.append(App.UI.DOM.makeSelect(cheatOptions.map(v => {
				return {key: v, name: capFirstChar(v)};
			}), seed, v => {
				seed = v;
				reload();
			}));
			App.UI.DOM.appendNewElement("span", frag, App.UI.DOM.link(" Refresh slave", reload));
		}
		slave = makeSlave(seed);
		const cost = slaveCost(slave);
		App.UI.DOM.appendNewElement("p", frag, `It will take ${cashFormat(cost)} to win the auction.`);

		if (V.cash >= cost) {
			App.UI.DOM.appendNewElement(
				"p",
				frag,
				App.UI.DOM.link(
					`Place that bid`,
					() => {
						cashX(forceNeg(cost), "slaveTransfer", slave);
						jQuery("#slave-markets").empty().append(App.UI.newSlaveIntro(slave));
					}
				)
			);
		} else {
			App.UI.DOM.appendNewElement("p", frag, `You lack the necessary funds to place a winning bid.`, "note");
		}

		frag.append(App.Desc.longSlave(slave, {market: "generic"}));
		return frag;
	}


	function makeSlave(choice) {
		let slave;
		switch (choice) {
			case "porn star":
				slave = GenerateNewSlave("XX", {minAge: Math.min(24, V.minimumSlaveAge + 6), maxAge: 40, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once a noted adult film star, and was sold into slavery by $his unscrupulous managers.";
				slave.career = "a porn star";
				slave.boobsImplant += random(4, 6) * 200;
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "string";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				} else {
					slave.nipples = either("cute", "huge", "puffy");
				}
				slave.areolae = 1;
				slave.butt += 1;
				slave.buttImplant += 1;
				slave.buttImplantType = "normal";
				slave.lips += 10;
				slave.lipsImplant += 10;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.faceImplant += 20;
				slave.faceShape = "sensual";
				slave.teeth = "normal";
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				slave.anus = 2;
				slave.vagina = 2;
				slave.weight = 0;
				slave.piercing.genitals.weight = 1;
				slave.piercing.tongue.weight = 1;
				slave.piercing.nipple.weight = 1;
				slave.piercing.nose.weight = 1;
				slave.piercing.ear.weight = 1;
				slave.skill.vaginal = 100;
				slave.skill.penetrative = 65;
				slave.skill.oral = 100;
				slave.skill.anal = 100;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 100;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy");
				slave.fetish = "none";
				slave.fetishKnown = 1;
				slave.custom.desc = "$He has seen and done almost everything sexually possible, on camera.";
				break;
			case "trophy wife":
				slave = GenerateNewSlave("XX", {minAge: Math.min(19, Math.max(V.fertilityAge, V.minimumSlaveAge) + 1), maxAge: 22, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once the young trophy $wife of a powerful man in the old world, but he sold $him into slavery in revenge for $his infidelity.";
				slave.career = "a trophy wife";
				slave.boobsImplant += random(1, 3) * 200;
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				slave.butt += 1;
				slave.buttImplant += 1;
				slave.buttImplantType = "normal";
				slave.lips += 10;
				slave.lipsImplant += 10;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.faceImplant += 20;
				slave.faceShape = "sensual";
				slave.teeth = "normal";
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(60, 80), 0, 0, 0);
				slave.anus = 1;
				slave.vagina = 1;
				slave.weight = 0;
				slave.piercing.genitals.weight = 1;
				slave.piercing.nipple.weight = 1;
				slave.piercing.ear.weight = 1;
				slave.skill.vaginal = 35;
				slave.skill.penetrative = 0;
				slave.skill.oral = 35;
				slave.skill.anal = 15;
				slave.skill.whoring = 35;
				slave.skill.entertainment = 15;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy");
				slave.fetish = "none";
				slave.fetishKnown = 1;
				slave.custom.tattoo = "$His ex-husband's name is prettily tattooed on $his left arm, but a black line has been subsequently tattooed across it.";
				break;
			case "sports star":
				slave = GenerateNewSlave("XX", {minAge: 21, maxAge: 25, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once expected to become a major sports star, but flamed out due to injury and was recently enslaved due to debt.";
				slave.career = "an athlete";
				slave.intelligence = random(-90, -20);
				slave.intelligenceImplant = 0;
				slave.muscles = 50;
				slave.heels = 1;
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(80, 90), 0, jsRandom(5, 10), 0, jsRandom(10, 30));
				slave.anus = 1;
				slave.vagina = 1;
				slave.weight = 0;
				slave.piercing.ear.weight = 1;
				slave.piercing.eyebrow.weight = random(0, 1);
				slave.piercing.nose.weight = random(0, 1);
				slave.piercing.navel.weight = random(0, 1);
				slave.skill.vaginal = 15;
				slave.skill.oral = 15;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.skill.combat = 40;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.sexualFlaw = either("hates anal", "hates oral", "hates penetration");
				slave.behavioralFlaw = "arrogant";
				slave.custom.desc = "$He's not particularly bright, and enjoys solving problems with physical force.";
				break;
			case "young model":
				slave = GenerateNewSlave("XX", {maxAge: 21, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once a rising young model, but apparently someone decided to take a shortcut in cashing in on $his great beauty.";
				slave.career = "a model";
				slave.boobs = random(2, 4) * 100;
				slave.butt = random(1, 3);
				slave.lips = random(15, 25);
				slave.face = 55;
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-20, 20), 0, 0, 0, jsRandom(10, 30));
				slave.anus = 1;
				slave.vagina = 1;
				slave.weight = 0;
				slave.piercing.ear.weight = 1;
				slave.skill.vaginal = 15;
				slave.skill.oral = 15;
				slave.skill.penetrative = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 35;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.behavioralFlaw = either("anorexic", "arrogant");
				slave.custom.desc = "$He moves with the practiced grace of someone who unconsciously still pictures $himself on the runway.";
				break;
			case "albino":
				slave = GenerateNewSlave("XX", {maxAge: 18, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He is a natural albino, and was quickly enslaved due to the great demand for physically unusual specimens.";
				slave.geneticQuirks.albinism = 2;
				// slave.albinismOverride = {skin: "pure white", eyeColor: "pale grey", hColor: "white"};
				slave.albinismOverride = makeAlbinismOverride(slave.race); // use standard override instead of custom; preserved original method for recordkeeping
				applyGeneticColor(slave);
				slave.career = "a slave";
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				eyeSurgery(slave, "both", "blur");
				setHealth(slave, jsRandom(40, 60), 0, 0, 0, jsRandom(10, 30));
				slave.custom.desc = "$His eyes are unsettling; though $his irises are a pale grey color, in some lights the whole eye takes on a red cast.";
				break;
			case "old-timer":
				slave = GenerateNewSlave("XX", {
					minAge: (V.minimumSlaveAge + 15), maxAge: 35, disableDisability: 1, ageOverridesPedoMode: 1
				});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 2;
				slave.prestigeDesc = "$He is one of the longest legally-enslaved persons in the world, having been a slave for 15 years. $He has spent almost all that time working as a slave prostitute, and has been heavily modified to keep $him productive.";
				slave.career = "a slave";
				slave.boobsImplant += random(10, 15) * 200;
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "fillable";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				} else {
					slave.nipples = either("cute", "huge", "puffy");
				}
				slave.areolae = 2;
				slave.butt += 4;
				slave.buttImplant += 4;
				slave.buttImplantType = "fillable";
				slave.lips = random(75, 85);
				slave.lipsImplant = 50;
				slave.face = 55;
				slave.faceImplant = 40;
				slave.faceShape = "exotic";
				slave.devotion = random(25, 45);
				slave.trust = random(0, 15);
				setHealth(slave, jsRandom(20, 40), 0, jsRandom(0, 5), 0, jsRandom(10, 30));
				slave.anus = 3;
				slave.vagina = 3;
				slave.weight = 0;
				slave.piercing.genitals.weight = 2;
				slave.piercing.tongue.weight = 2;
				slave.piercing.nipple.weight = 2;
				slave.piercing.nose.weight = 2;
				slave.piercing.lips.weight = 2;
				slave.piercing.vagina.weight = 2;
				slave.piercing.anus.weight = 2;
				slave.piercing.navel.weight = 2;
				slave.piercing.eyebrow.weight = 2;
				slave.piercing.ear.weight = 2;
				slave.skill.vaginal = 100;
				slave.skill.penetrative = 100;
				slave.skill.oral = 100;
				slave.skill.anal = 100;
				slave.skill.whoring = 100;
				slave.skill.entertainment = 0;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.sexualFlaw = "none";
				slave.behavioralFlaw = "none";
				slave.energy = 100;
				slave.fetish = "none";
				slave.fetishKnown = 1;
				slave.custom.desc = "$He has almost no inhibitions left at all.";
				slave.custom.tattoo = "'50,000 Served!' is tattooed across $his back.";
				slave.counter.publicUse += 1000;
				break;
			case "b-list actress":
				slave = GenerateNewSlave("XX", {minAge: 24, maxAge: 28, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 2;
				slave.prestigeDesc = "$He was once a B-list actress, but fell on hard times and drug addiction and was recently enslaved due to debt.";
				slave.career = "an actress";
				slave.boobs += 200;
				slave.boobsImplant += 200;
				slave.boobsImplantType = "normal";
				slave.butt += 1;
				slave.buttImplant += 1;
				slave.buttImplantType = "normal";
				slave.lips += 10;
				slave.lipsImplant += 10;
				slave.face = 55;
				slave.faceImplant += 20;
				slave.faceShape = "cute";
				if (slave.teeth !== "gapped") {
					slave.teeth = "normal";
				}
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-70, -40), undefined, undefined, 0, jsRandom(30, 80));
				slave.anus = 1;
				slave.vagina = 1;
				slave.weight = 0;
				slave.piercing.ear.weight = 1;
				slave.skill.vaginal = 15;
				slave.skill.penetrative = 0;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 100;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.addict = 20;
				slave.sexualFlaw = either("hates anal", "hates oral", "hates penetration");
				slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy", "odd");
				slave.custom.desc = "$He sometimes forgets $himself and acts as though $he were still a coming celebrity.";
				break;
			case "politician":
				slave = GenerateNewSlave("XX", {minAge: 38, maxAge: 42, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 2;
				slave.prestigeDesc = "$He was once a rising old world politician, but was forced to flee from the increasingly dangerous politics common in a stressed world, and was subsequently enslaved.";
				slave.career = "a politician";
				slave.boobs += 100;
				slave.butt += 1;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.faceImplant += 20;
				slave.faceShape = "normal";
				slave.teeth = "normal";
				slave.height += 10;
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-45, -25), 0, 0, 0, jsRandom(30, 70));
				slave.anus = 0;
				slave.vagina = 1;
				slave.weight = 0;
				slave.skill.vaginal = 15;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 35;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.behavioralFlaw = either("arrogant", "bitchy");
				slave.custom.tattoo = "A small tattoo of the crest of an old world sorority is visible on $his left shoulder blade.";
				slave.custom.desc = "$His face is still recognizable as that which once graced a million campaign posters.";
				break;
			case "princess":
				slave = GenerateNewSlave("XX", {maxAge: 18, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 3;
				slave.prestigeDesc = "$He was born a $daughter of royalty, but $his family was overthrown when $he was still young. $He is a graduate cum laude of the world's most renowned slave school.";
				slave.career = "a slave";
				slave.boobs += 100;
				slave.butt += 1;
				slave.lips += 10;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.height += 10;
				slave.devotion = random(75, 90);
				slave.trust = random(-45, -25);
				setHealth(slave, 100, 0, 0, 0, jsRandom(0, 20));
				slave.anus = 0;
				slave.vagina = 0;
				slave.weight = 0;
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 100;
				slave.skill.anal = 0;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 35;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.sexualFlaw = "none";
				slave.behavioralFlaw = "none";
				slave.custom.tattoo = "$His family crest is tattooed on $his cheek.";
				slave.custom.desc = "$His recognizable face marks $him as a descendant of an overthrown royal family.";
				break;
			case "arcology":
				slave = GenerateNewSlave("XX", {minAge: 28, maxAge: 42, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 3;
				slave.prestigeDesc = "$He was once an arcology owner like you, but lost a Free Cities power struggle and was enslaved. An object lesson in the need to stay vigilant.";
				slave.career = "an arcology owner";
				slave.boobsImplant += random(20, 40) * 200;
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "advanced fillable";
				slave.boobs += 1000;
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				} else {
					slave.nipples = either("cute", "huge", "puffy");
				}
				slave.areolae = 2;
				slave.buttImplant += random(6, 8);
				slave.butt += slave.buttImplant;
				slave.buttImplantType = "advanced fillable";
				slave.heels = 1;
				slave.voice = 0;
				slave.lips = random(75, 85);
				slave.lipsImplant = 50;
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-70, -60), undefined, undefined, undefined, jsRandom(40, 90));
				slave.anus = 3;
				slave.vagina = 3;
				slave.weight = -20;
				slave.piercing.nipple.weight = 2;
				slave.piercing.genitals.weight = 2;
				slave.piercing.vagina.weight = 2;
				slave.piercing.anus.weight = 2;
				slave.piercing.lips.weight = 2;
				slave.piercing.tongue.weight = 2;
				slave.piercing.ear.weight = 2;
				slave.piercing.nose.weight = 2;
				slave.piercing.eyebrow.weight = 2;
				slave.piercing.navel.weight = 2;
				slave.boobsTat = "rude words";
				slave.buttTat = "rude words";
				slave.vaginaTat = "rude words";
				slave.dickTat = "rude words";
				slave.lipsTat = "rude words";
				slave.anusTat = "rude words";
				slave.shouldersTat = "rude words";
				slave.armsTat = "rude words";
				slave.legsTat = "rude words";
				slave.stampTat = "rude words";
				slave.skill.vaginal = 15;
				slave.skill.penetrative = 100;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.hStyle = "shaved";
				slave.hLength = 0;
				slave.behavioralFlaw = either("odd");
				slave.custom.desc = "$His back is covered in a fine network of hairline scars, as though $he's been repeatedly flogged bloody, healed with curatives, and then flogged again.";
				slave.custom.tattoo = "'ARCOLOGY OWNER' is tattooed across $his forehead.";
				break;
			case "streamer":
				slave = GenerateNewSlave("XX", {maxAge: 28, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once a popular creator on a live streaming service, but donations dropped off after getting caught up in some controversy.";
				slave.career = "a camgirl";
				slave.boobs = random(1, 4) * 100;
				slave.natural.boobs = slave.boobs; // Oddly low here. Hard to not be intentional.
				slave.butt = random(1, 3);
				slave.lips = random(15, 25);
				slave.face = 55;
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-45, -25), 0, 0, 0, jsRandom(30, 70));
				slave.anus = 1;
				slave.vagina = 1;
				slave.weight = 20;
				slave.piercing.ear.weight = 1;
				slave.skill.vaginal = 15;
				slave.skill.penetrative = 0;
				slave.skill.oral = 15;
				slave.skill.anal = 1;
				slave.skill.whoring = 5;
				slave.skill.entertainment = 70;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.behavioralFlaw = either("arrogant", "bitchy", "odd");
				slave.custom.desc = "$He is very comfortable in front of a camera and in public performances, having spent a long time entertaining $his viewers.";
				break;
			case "d herm":
				slave = GenerateNewSlave("XY", {
					minAge: 24, maxAge: 40, disableDisability: 1, ageOverridesPedoMode: 1
				});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He is a natural-born hermaphrodite. $He was enslaved as an adult and subjected to treatment to upgrade both $his halves to full functionality.";
				slave.devotion = random(-45, -25);
				slave.trust = random(-90, -75);
				setHealth(slave, jsRandom(-40, -30), undefined, undefined, 0, jsRandom(30, 70));
				slave.chem = 100;
				slave.anus = random(1, 2);
				slave.dick = random(1, 2);
				if (slave.dick > 0) {
					slave.foreskin = slave.dick;
				}
				slave.prostate = 1;
				slave.vagina = 1;
				slave.ovaries = 1;
				slave.preg = 0;
				slave.balls = random(1, 2);
				if (slave.balls > 0) {
					slave.scrotum = slave.balls;
				}
				slave.weight = random(-80, -20);
				slave.attrXX = random(30, 50);
				slave.attrXY = random(30, 50);
				slave.energy = random(5, 20);
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.custom.desc = "$He has had a very difficult time adjusting to $his unusual biology.";
				break;
			case "d young herm":
				slave = GenerateNewSlave("XX", {maxAge: 19, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He is a natural-born hermaphrodite. $He received treatment to ensure both $his halves would be fully functional from an early age.";
				slave.career = "a slave";
				slave.devotion = random(25, 45);
				slave.trust = random(25, 45);
				setHealth(slave, jsRandom(0, 20), 0, 0, 0, jsRandom(20, 60));
				slave.chem = 200;
				slave.boobs += 100 * random(2, 4);
				slave.butt += random(1, 2);
				slave.anus = 1;
				slave.dick = random(4, 6);
				slave.prostate = 1;
				if (slave.dick > 0) {
					slave.foreskin = slave.dick;
				}
				slave.balls = random(4, 6);
				if (slave.balls > 0) {
					slave.scrotum = slave.balls;
				}
				slave.weight = random(20, 80);
				slave.attrXX = random(80, 100);
				slave.attrXY = random(80, 100);
				slave.energy = random(60, 90);
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 15;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.sexualFlaw = "none";
				slave.behavioralFlaw = "none";
				slave.sexualQuirk = either("caring", "perverted", "romantic", "tease");
				slave.behavioralQuirk = either("adores men", "adores women", "advocate", "confident", "cutting", "funny");
				slave.custom.desc = "$He is very comfortable with $his unusual biology.";
				break;
			case "d pornstar":
				slave = GenerateNewSlave("XY", {minAge: 24, maxAge: 40, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once a noted adult film star, and was sold into slavery by $his unscrupulous managers.";
				slave.career = "a porn star";
				slave.boobsImplant += random(4, 6) * 200;
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "fillable";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				} else {
					slave.nipples = either("cute", "huge", "puffy");
				}
				slave.areolae = 1;
				slave.butt += 1;
				slave.buttImplant += 1;
				slave.buttImplantType = "normal";
				slave.lips += 10;
				slave.lipsImplant += 10;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.faceImplant += 20;
				slave.faceShape = "androgynous";
				slave.teeth = "normal";
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, undefined, undefined, undefined, undefined, jsRandom(30, 70));
				slave.anus = 3;
				slave.dick = 5;
				if (slave.foreskin > 0) {
					slave.foreskin = slave.dick;
				}
				slave.balls = 5;
				if (slave.balls > 0) {
					slave.scrotum = slave.balls;
				}
				slave.weight = 0;
				slave.piercing.genitals.weight = 1;
				slave.piercing.tongue.weight = 1;
				slave.piercing.nipple.weight = 1;
				slave.piercing.nose.weight = 1;
				slave.piercing.ear.weight = 1;
				slave.skill.penetrative = 100;
				slave.skill.oral = 100;
				slave.skill.anal = 100;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 100;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy");
				slave.fetish = "none";
				slave.fetishKnown = 1;
				slave.custom.desc = "$He has seen and done almost everything sexually possible, on camera.";
				break;
			case "d trophy husband":
				slave = GenerateNewSlave("XY", {minAge: 19, maxAge: 22, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once the young trophy husband of a powerful woman in the old world, but she sold $him into slavery in revenge for $his infidelities.";
				slave.career = "a trophy spouse";
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.faceImplant += 20;
				slave.faceShape = "cute";
				slave.muscles = random(20, 100);
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(60, 80), 0, 0, 0, jsRandom(10, 30));
				slave.weight = 0;
				slave.piercing.genitals.weight = 1;
				slave.skill.penetrative = 65;
				slave.skill.oral = 15;
				slave.skill.anal = 0;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 15;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.behavioralFlaw = either("arrogant", "bitchy");
				slave.fetish = "none";
				slave.fetishKnown = 1;
				slave.custom.tattoo = "$His ex-wife's name is prettily tattooed on $his left arm, but a black line has been subsequently tattooed across it.";
				break;
			case "d sports star":
				slave = GenerateNewSlave("XY", {minAge: 21, maxAge: 25, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once expected to become a major sports star, but flamed out due to injury and was recently enslaved due to debt.";
				slave.career = "an athlete";
				slave.intelligence = random(-90, -20);
				slave.intelligenceImplant = 0;
				slave.muscles = 50;
				slave.heels = 1;
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(80, 90), 0, jsRandom(5, 10), 0, jsRandom(20, 50));
				slave.anus = 1;
				slave.dick = random(3, 5);
				if (slave.dick > 0) {
					slave.foreskin = slave.dick;
				}
				slave.balls = random(3, 5);
				if (slave.balls > 0) {
					slave.scrotum = slave.balls;
				}
				slave.weight = 0;
				slave.skill.penetrative = 35;
				slave.skill.oral = 15;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.skill.combat = 40;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.sexualFlaw = either("hates anal", "hates oral", "hates penetration");
				slave.behavioralFlaw = "arrogant";
				slave.custom.desc = "$He's not particularly bright, and enjoys solving problems with physical force.";
				break;
			case "d young model":
				slave = GenerateNewSlave("XY", {maxAge: 21, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once a rising young model, but apparently someone decided to take a shortcut in cashing in on $his great beauty.";
				slave.career = "a model";
				slave.boobs = random(1, 3) * 100;
				slave.butt = random(1, 2);
				slave.muscles = 20;
				slave.lips = random(15, 25);
				slave.face = 55;
				slave.faceImplant = 20 * random(1, 2);
				slave.faceShape = "androgynous";
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-20, 20), 0, 0, 0, jsRandom(10, 30));
				slave.anus = 2;
				slave.weight = 0;
				slave.piercing.ear.weight = 1;
				slave.skill.penetrative = 35;
				slave.skill.oral = 100;
				slave.skill.anal = 0;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 35;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.sexualFlaw = either("judgemental");
				slave.behavioralFlaw = either("anorexic", "arrogant", "hates women");
				slave.custom.desc = "$He moves with the practiced grace of someone who unconsciously still pictures $himself on the runway.";
				break;
			case "d albino":
				slave = GenerateNewSlave("XY", {maxAge: 18, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He is a natural albino, and was quickly enslaved due to the great demand for physically unusual specimens.";
				slave.geneticQuirks.albinism = 2;
				// slave.albinismOverride = {skin: "pure white", eyeColor: "pale grey", hColor: "white"};
				slave.albinismOverride = makeAlbinismOverride(slave.race); // use standard override instead of custom; preserved original method for recordkeeping
				applyGeneticColor(slave);
				slave.career = "a slave";
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				eyeSurgery(slave, "both", "blur");
				setHealth(slave, jsRandom(40, 60), 0, 0, 0, jsRandom(10, 30));
				slave.custom.desc = "$His eyes are unsettling; though $his irises are a pale grey color, in some lights the whole eye takes on a red cast.";
				break;
			case "d old-timer":
				slave = GenerateNewSlave("XY", {
					minAge: (V.minimumSlaveAge + 15), maxAge: 35, disableDisability: 1, ageOverridesPedoMode: 1
				});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 2;
				slave.prestigeDesc = "$He is one of the longest legally-enslaved persons in the world, having been a slave for 15 years. $He has spent almost all that time working as a slave prostitute, and has been heavily modified to keep $him productive.";
				slave.career = "a prostitute";
				slave.boobsImplant += random(10, 15) * 200;
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "advanced fillable";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				} else {
					slave.nipples = either("cute", "huge", "puffy");
				}
				slave.areolae = 2;
				slave.butt += 4;
				slave.buttImplant += 4;
				slave.buttImplantType = "fillable";
				slave.lips = random(25, 55);
				slave.lipsImplant = 25;
				slave.face = 55;
				slave.faceImplant = 40;
				slave.faceShape = "exotic";
				slave.devotion = random(25, 45);
				slave.trust = random(0, 15);
				setHealth(slave, jsRandom(20, 40), undefined, jsRandom(5, 10), undefined, jsRandom(30, 70));
				slave.anus = 3;
				slave.dick = 1;
				if (slave.foreskin > 0) {
					slave.foreskin = slave.dick;
				}
				if (slave.balls > 0) {
					slave.scrotum = slave.balls;
				}
				slave.balls = 0;
				slave.weight = 0;
				slave.piercing.genitals.weight = 2;
				slave.piercing.tongue.weight = 2;
				slave.piercing.nipple.weight = 2;
				slave.piercing.nose.weight = 2;
				slave.piercing.lips.weight = 2;
				slave.piercing.vagina.weight = 2;
				slave.piercing.anus.weight = 2;
				slave.piercing.navel.weight = 2;
				slave.piercing.eyebrow.weight = 2;
				slave.piercing.ear.weight = 2;
				slave.skill.penetrative = 100;
				slave.skill.oral = 100;
				slave.skill.anal = 100;
				slave.skill.whoring = 100;
				slave.skill.entertainment = 0;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.sexualFlaw = "none";
				slave.behavioralFlaw = "none";
				slave.energy = 100;
				slave.fetish = "none";
				slave.fetishKnown = 1;
				slave.custom.desc = "$He has almost no inhibitions left at all.";
				slave.custom.tattoo = "'50,000 Served!' is tattooed across $his back.";
				slave.counter.publicUse += 1000;
				break;
			case "d b-list actress":
				slave = GenerateNewSlave("XY", {minAge: 24, maxAge: 28, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 2;
				slave.prestigeDesc = "$He was once a B-list actress, but fell on hard times and drug addiction and was recently enslaved due to debt.";
				slave.career = "an actress";
				slave.boobs += 200;
				slave.boobsImplant += 200;
				slave.boobsImplantType = "normal";
				slave.butt += 1;
				slave.buttImplant += 1;
				slave.buttImplantType = "normal";
				slave.lips += 10;
				slave.lipsImplant += 10;
				slave.face = 55;
				slave.faceImplant += 20;
				slave.faceShape = "cute";
				if (slave.teeth !== "gapped") {
					slave.teeth = "normal";
				}
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-80, -40), 0, 0, 0, jsRandom(30, 70));
				slave.anus = 1;
				slave.weight = 0;
				slave.piercing.ear.weight = 1;
				slave.skill.penetrative = 15;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 100;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.addict = 20;
				slave.sexualFlaw = either("hates anal", "hates oral", "hates penetration");
				slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy", "odd");
				slave.custom.desc = "$He sometimes forgets $himself and acts as though $he were still a coming celebrity.";
				break;
			case "d politician":
				slave = GenerateNewSlave("XY", {minAge: 38, maxAge: 42, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 2;
				slave.prestigeDesc = "$He was once a rising old world politician, but was forced to flee from the increasingly dangerous politics common in a stressed world, and was subsequently enslaved.";
				slave.career = "a politician";
				slave.muscles = random(10, 50);
				slave.natural.height = random(160, 200);
				slave.height = slave.natural.height;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.faceImplant += 20;
				slave.faceShape = "masculine";
				slave.teeth = "normal";
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(60, 80), 0, 0, 0, jsRandom(30, 70));
				slave.anus = 0;
				slave.weight = 0;
				slave.skill.penetrative = 35;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 35;
				slave.behavioralFlaw = either("arrogant", "bitchy");
				slave.custom.tattoo = "A small tattoo of the crest of an old world fraternity is visible on $his left shoulder blade.";
				slave.custom.desc = "$His face is still recognizable as that which once graced a million campaign posters.";
				break;
			case "d princess":
				slave = GenerateNewSlave("XY", {maxAge: 18, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 3;
				slave.prestigeDesc = "$He was born a child of royalty, but $his family was overthrown when $he was still young. $He is a graduate cum laude of the world's most renowned slave school.";
				slave.career = "a slave";
				slave.boobs += 100;
				slave.butt += 1;
				slave.lips += 10;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.height += 10;
				slave.devotion = random(75, 85);
				slave.trust = random(-45, -25);
				setHealth(slave, 100, 0, 0, 0, jsRandom(0, 20));
				slave.anus = 0;
				slave.dick = 2;
				if (slave.foreskin > 0) {
					slave.foreskin = slave.dick;
				}
				slave.balls = 1;
				if (slave.balls > 0) {
					slave.scrotum = slave.balls;
				}
				slave.weight = 0;
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 100;
				slave.skill.anal = 0;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 35;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.sexualFlaw = "none";
				slave.behavioralFlaw = "none";
				slave.custom.tattoo = "$His family crest is tattooed on $his cheek.";
				slave.custom.desc = "$His recognizable face marks $him as a descendant of an overthrown royal family.";
				break;
			case "d arcology":
				slave = GenerateNewSlave("XY", {minAge: 28, maxAge: 42, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 3;
				slave.prestigeDesc = "$He was once an arcology owner like you, but lost a Free Cities power struggle and was enslaved. An object lesson in the need to stay vigilant.";
				slave.career = "an arcology owner";
				slave.muscles = random(10, 50);
				slave.heels = 1;
				slave.voice = 0;
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-80, -60), undefined, undefined, undefined, jsRandom(40, 90));
				slave.anus = 3;
				slave.weight = -20;
				slave.piercing.nipple.weight = 2;
				slave.piercing.genitals.weight = 2;
				slave.piercing.dick.weight = 2;
				slave.piercing.anus.weight = 2;
				slave.piercing.lips.weight = 2;
				slave.piercing.tongue.weight = 2;
				slave.piercing.ear.weight = 2;
				slave.piercing.nose.weight = 2;
				slave.piercing.eyebrow.weight = 2;
				slave.piercing.navel.weight = 2;
				slave.boobsTat = "rude words";
				slave.buttTat = "rude words";
				slave.vaginaTat = "rude words";
				slave.dickTat = "rude words";
				slave.lipsTat = "rude words";
				slave.anusTat = "rude words";
				slave.shouldersTat = "rude words";
				slave.armsTat = "rude words";
				slave.legsTat = "rude words";
				slave.stampTat = "rude words";
				slave.skill.penetrative = 100;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.hStyle = "shaved";
				slave.hLength = 0;
				slave.behavioralFlaw = either("odd");
				slave.custom.desc = "$His back is covered in a fine network of hairline scars, as though $he's been repeatedly flogged bloody, healed with curatives, and then flogged again.";
				slave.custom.tattoo = "'ARCOLOGY OWNER' is tattooed across $his forehead.";
				break;
			case "d streamer":
				slave = GenerateNewSlave("XY", {maxAge: 28, disableDisability: 1});
				slave.origin = "You bought $him at auction.";
				slave.prestige = 1;
				slave.prestigeDesc = "$He was once a popular creator on a live streaming service, but donations dropped off after getting caught up in some controversy.";
				slave.career = "a camgirl";
				slave.boobs = random(1, 3) * 100;
				slave.butt = random(1, 2);
				slave.muscles = random(0, 20);
				slave.lips = random(15, 25);
				slave.face = random(20, 55);
				slave.faceShape = either("androgynous", "masculine");
				slave.devotion = random(-90, -80);
				slave.trust = random(-45, -25);
				setHealth(slave, jsRandom(-45, -25), 0, 0, 0, jsRandom(20, 60));
				slave.anus = 2;
				slave.weight = 20;
				slave.piercing.ear.weight = 1;
				slave.skill.penetrative = 10;
				slave.skill.oral = 30;
				slave.skill.anal = 1;
				slave.skill.whoring = 5;
				slave.skill.entertainment = 70;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.behavioralFlaw = either("arrogant", "bitchy", "odd");
				slave.custom.desc = "$He is very comfortable in front of a camera and in public performances, having spent a long time entertaining $his viewers.";
		}
		return slave;
	}
};
