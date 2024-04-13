App.Facilities.MasterSuite.masterSuite = class MasterSuite extends App.Facilities.Facility {
	constructor() {
		const masterSuite = App.Entity.facilities.masterSuite;
		const decommissionHandler = () => {
			V.masterSuite = 0;
			V.masterSuiteUpgradeLuxury = 0;
			V.masterSuitePregnancySlaveLuxuries = 0;
			V.masterSuiteDecoration = "standard";
			V.masterSuitePregnancyFertilityDrugs = 0;
			V.masterSuitePregnancyFertilitySupplements = 0;
			V.masterSuiteUpgradePregnancy = 0;
			V.masterSuiteHyperPregnancy = 0;
		};

		super(
			masterSuite,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Master Suite";

		this.pregnantSlaves = 0;
		this.pregnantWithMultiples = 0;
		this.hyperPregnantSlaves = 0;
		this.currentSlaves = App.Utils.sortedEmployees(App.Entity.facilities.masterSuite);

		if (S.Concubine && S.Concubine.pregKnown) {
			this.pregnantSlaves++;

			if (S.Concubine.pregType > 1) {
				this.pregnantWithMultiples++;
			}

			if (S.Concubine.pregType > 1 && S.Concubine.bellyPreg >= 300000) {
				this.hyperPregnantSlaves++;
			}
		}

		for (const slave of this.currentSlaves) {
			if (slave.pregKnown) {
				this.pregnantSlaves++;

				if (slave.pregType > 1) {
					this.pregnantWithMultiples++;
				}

				if (slave.pregType > 1 && slave.bellyPreg >= 300000) {
					this.hyperPregnantSlaves++;
				}
			}
		}
	}

	/** @returns {HTMLDivElement} */
	get slaves() {
		const div = document.createElement("div");
		if (this.facility.manager) {
			div.append(App.UI.SlaveList.displayManager(this.facility));
		}
		div.append(App.UI.SlaveList.listSJFacilitySlaves(this.facility, passage(), true, undefined, App.UI.SlaveList.Decoration.personalAttention));
		return div;
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		const avg = App.Utils.masterSuiteAverages();

		text.push(`${this.facility.nameCaps} is furnished`, this.decorations);

		if (V.masterSuiteUpgradeLuxury === 1) {
			text.push(`It is full of luxuries of all kinds. The slaves here live free of want or worry, and have everything except their freedom. Their only duties are to please you and look after the suite and one another.`);

			if (this.currentSlaves.length > 2) {
				text.push(`It's busy with slaves, so many that they are able to rotate through keeping themselves perfect and ready for your pleasure. The slaves not on call at the moment are beautifying themselves, cleaning, or serving others.`);

				if (this.pregnantSlaves > 2 && this.pregnantWithMultiples < 2) {
					text.push(`Many of the slaves are pregnant, and they walk around proudly displaying their bellies and the new slaves growing inside them.`);
				} else if (this.hyperPregnantSlaves > 2) {
					text.push(`Many of the slaves are heavily pregnant with multiple children, and they waddle around, if capable, proudly displaying their distended bulging bellies and the next generation of slaves growing within them.`);
				} else if (this.pregnantWithMultiples > 2) {
					text.push(`Many of the slaves are pregnant with multiple children, and they walk around proudly displaying their distended bellies and the next generation of slaves growing within them.`);
				}
			} else if (this.currentSlaves.length > 0) {
				text.push(`It's sparsely populated, so that the few slaves here have to work hard and quickly to ensure that an assortment of sex slaves is perfect and ready for your pleasure at any given moment.`);
			} else {
				text.push(`None of your slaves are serving here.`);
			}
		} else if (V.masterSuiteUpgradeLuxury === 2) {
			text.push(`The true focus of the suite is, however, the fuckpit. This stepped depression in the middle of the floor`);

			if (this.currentSlaves.length > 3) {
				text.push(`is filled by cushions and every slave in the suite who isn't sleeping, eating, or bathing.`);

				if (avg.energy > 90) {
					text.push(`They're having energetic group sex; most of them are fucking and being fucked at the same time.`);
				} else if (avg.energy > 60) {
					text.push(`They're having group sex; most of them are in active sexual contact with more than one partner.`);
				} else {
					text.push(`They're having languid group sex; more than one slave is dozing while another plays with their body.`);
				}
				if (avg.energy > 90) {
					text.push(`The pit features automated cleaning systems, which are quite necessary.`);

					if (avg.dick > 4) {
						text.push(`With so many huge cocks in the fuckpit, every hole available is frequently fucked vigorously.`);
					}

					if (avg.cum > 4) {
						text.push(`The slaves' bodies grow more coated with cum, and more of the white stuff drips from their holes, until they take a break for a shower.`);
					}

					if (avg.milk > 4000) {
						text.push(`Most of them cannot tear themselves away (or cannot escape) for a normal machine milking, so their tender, overfull breasts squirt milk whenever anyone touches them. The lowest level of the fuckpit is a pool of milk.`);
					}
				}

				if (this.pregnantSlaves > 2 && this.pregnantWithMultiples < 2) {
					text.push(`Many of the slaves are pregnant, and more than one has her face buried in the cunt directly below a gravid belly while she lovingly massages her own.`);
				} else if (this.hyperPregnantSlaves > 2) {
					text.push(`Many of the slaves are heavily pregnant with multiple children, and more than one has her face buried in the cunt directly below a massively overburdened belly while she lovingly massages her own distended squirming stomach.`);
				} else if (this.pregnantWithMultiples > 2) {
					text.push(`Many of the slaves are pregnant with multiple children, and more than one has her face buried in the cunt directly below a grossly swollen belly while she lovingly massages her own distended stomach.`);
				}
			} else if (this.currentSlaves.length > 0) {
				text.push(`has a few lonely-looking fucktoys in it, badly outnumbered by the cushions.`);
			} else {
				text.push(`is desolate and unpopulated.`);
			}
		} else {
			if (this.currentSlaves.length > 2) {
				text.push(`It's busy with slaves, so many that they are able to rotate through keeping themselves perfect and ready for your pleasure. The slaves not on call at the moment are beautifying themselves, cleaning, or serving others.`);

				if (this.pregnantSlaves > 2 && this.pregnantWithMultiples < 2) {
					text.push(`Many of the slaves are pregnant, and they walk around proudly displaying their bellies and the new slaves growing inside them.`);
				} else if (this.hyperPregnantSlaves > 2) {
					text.push(`Many of the slaves are heavily pregnant with multiple children, and they waddle around, if capable, proudly displaying their distended bulging bellies and the next generation of slaves growing within them.`);
				} else if (this.pregnantWithMultiples > 2) {
					text.push(`Many of the slaves are pregnant with multiple children, and they walk around proudly displaying their distended bellies and the next generation of slaves growing within them.`);
				}
			} else if (this.currentSlaves.length > 0) {
				text.push(`It's sparsely populated, so that the few slaves here have to work hard and quickly to ensure that an assortment of sex slaves is perfect and ready for your pleasure at any given moment.`);
			} else {
				text.push(`None of your slaves are serving here.`);
			}
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		let FS = null;

		if (V.masterSuiteUpgradeLuxury === 1) {
			FS = {
				"Roman Revivalist": `as a Roman emperor's apartment. There is a small shrine to the old gods the ${properMaster()} favors in a side room, and the flooring is erotic mosaic. Pride of place is given to a set of low couches placed together, capable of accommodating many nude bodies.`,
				"Neo-Imperialist": `as an apartment worthy of a modern-day Emperor. The highest of technology decorates every space, allowing you to remain in constant communication with the rest of the arcology - your fledgling empire - even when in your room. The ${properMaster()}'s suite is an elaborate shrine to your many victories, fitted with many low couches to fit a whole harem inside, and the banners of your house hang around you on every side. The centerpiece of your personal apartment is a massive tapestry, designed in ancient style and depicting the creation of your Arcology from the collapsing Old World, all the way up to the modern day, with you standing over a great cheering crowd in your golden crown. You wonder for a moment if you'll have to commission more tapestries as the Arcology advances further.`,
				"Aztec Revivalist": `as an Aztec cultural, spiritual and military leader of the city you're allowed great leniency. The ${properMaster()}'s room is created to gratify you as a true god of the people.`,
				"Egyptian Revivalist": `after the royal room of an ancient Egyptian palace. There is a small shrine to the old gods the ${properMaster()} favors in a side room, and linen hangings decorate the walls and ceiling. An imposing bed of sandalwood occupies the center of the room.`,
				"Edo Revivalist": `in the spartan style of an Edo period castle's innermost rooms. Rice paper screens partition off many small cubicles around its large central space. There, around a low bed, there are many mats for servants to kneel around their ${properMaster()}.`,
				"Arabian Revivalist": `as a beguiling haze of Arabian decadence. There is a great gilded bed in the center of the space, piled with silk pillows for naked bodies to recline on. Gauzy curtains flutter in the warm, heady breeze.`,
				"Chinese Revivalist": `as though it were the innermost sanctum of the Forbidden City. A massive bed fills the central space. The walls are gorgeous gilded hand-carved screens, and heavy jade statues of favored gods crouch in the corners.`,
				"Antebellum Revivalist": `is furnished with heavy, black oaken furniture intricately carved and inlaid with mother of pearl. A massive canopied bed draped in sheer chiffon curtains is the centerpiece. A cozy sitting area, prominently featuring a royal divan upholstered in a deep purple fabric, lies about a grand fireplace with marble façade. Large windows framed in exotic hardwood imported from North America give a wonderful, top-down view of the arcology below.`,
				"Chattel Religionist": `as a severe place of cold stone and hard wood. A single shaft of sunlight illuminates an enormous stone platform that serves as a bed where penitents give their bodies to their ${properMaster()}.`,
				"Degradationist": `with a gothic grandeur. Blood-red upholstery and hardwood menace crouch in the center of the space in the form of a massive poster bed with curtains of chain mail.`,
				"Repopulationist": `comfortably, with lots of cushions and seats for pregnant slaves to lounge on. Various specialized toys, as well as, lotions and creams are readily available. There's a huge, reinforced, low to the ground bed in the middle of the suite.`,
				"Eugenics": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make fucking slave girls lots of fun. There's a huge bed in the middle of the suite, with hidden compartments containing condoms and spermicides.`,
				"Asset Expansionist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with stacked slaves as fun as possible. There's a huge bed in the middle of the suite, heavily reinforced.`,
				"Transformation Fetishist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with bimbo slaves as fun as possible. There's a huge bed in the middle of the suite, heavily reinforced.`,
				"Gender Radicalist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make fucking slave girls in the butt lots of fun. There's a huge bed in the middle of the suite, with straps to restrain slave girls who don't want to be fucked in the butt, but they're concealed for now.`,
				"Gender Fundamentalist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make fucking slave girls nice and enjoyable. There's a huge bed in the middle of the suite, with straps to restrain slave girls who don't want to be fucked, but they're concealed for now.`,
				"Physical Idealist": `as a shrine to the owner's body. Athletic trophies and photographs of past victories line the walls. There's a huge bed in the middle of the space, and there are mirrors almost everywhere, including on the ceiling over the bed.`,
				"Supremacist": `like the royal bedroom in a palace in the old countries of ${V.arcologies[0].FSSupremacistRace} people. A massive four-poster bed dominates the space.`,
				"Subjugationist": `like the royal bedroom in a palace in the old countries which favored ${V.arcologies[0].FSSubjugationistRace} slaves. A massive four-poster bed dominates the space.`,
				"Paternalist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable.`,
				"Pastoralist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants. The space is dominated by a massive, reinforced bed, built in sections so that part of it can be cleaned while cream-squirting cows cavort on the rest.`,
				"Maturity Preferentialist": `comfortably, with elegant sex toys and perfumed lubricants designed to appeal to mature sex slaves. The space is dominated by a broad, soft bed, well supplied with pillows. It's the perfect place to relax with a harem of MILFs.`,
				"Youth Preferentialist": `comfortably, with pastel-colored sex toys and flavored lubricants designed to appeal to eager young sex slaves. The space is dominated by a broad, reinforced bed, without cushions or sheets, which would just get in the way of energetic sex.`,
				"Body Purist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable. The space is dominated by a huge bed with soft sheets.`,
				"Slimness Enthusiast": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable. The space is dominated by a huge bed with soft sheets.`,
				"Hedonistic": `comfortably, with lots of lounges for a hefty slaves to relax on. ${V.arcologies[0].FSHedonisticDecadenceResearch === 1 ? `Platters of food and treats are readily available throughout the room and are` : `Slave food is readily available for your harem and platters of food for yourself are`} never out of arm's reach. There's a huge, reinforced, low to the ground bed in the middle of the suite.`,
				"Intellectual Dependency": `comfortably, with lots of easy-to-clean leather and plentiful easy-to-use tools, toys, and lubricants to make sex with bimbo slaves as fun and simple as possible. There's a huge bed in the middle of the suite, heavily reinforced.`,
				"Slave Professionalism": `comfortably, with complex sex toys and tools designed to maximize pleasure when used by skilled hands. The space is dominated by a broad, soft bed, well supplied with pillows. The rest is dedicated to perfecting oneself and boosting ${properMaster()}'s status ever higher.`,
				"Petite Admiration": `comfortably, with plentiful tools, toys, lubricants and a bevy of stepping stools to accommodate even the shortest slave. There's a huge, reinforced, low to the ground bed in the middle of the suite.`,
				"Statuesque Glorification": `comfortably, though designed for slaves of the taller variety. Short slaves will find the furniture, and the room's centerpiece, a massive four-poster bed, woefully out of their reach.`,
				"standard": `in a refined, yet practical style. It's dominated by a huge bed in which many slaves could serve their ${properTitle()} and then cuddle afterward.`,
			};
		} else if (V.masterSuiteUpgradeLuxury === 2) {
			FS = {
				"Roman Revivalist": `as a Roman emperor's apartment. There is a small shrine to the old gods the ${properTitle()} favors in a side room, and the flooring is erotic mosaic.`,
				"Neo-Imperialist": `as an apartment worthy of a modern-day Emperor. The highest of technology decorates every space, allowing you to remain in constant communication with the rest of the arcology - your fledgling empire - even when in your room. The ${properMaster()}'s suite is an elaborate shrine to your many victories, fitted with a large bed with hanging golden bedposts, and the banners of your house hang around you on every side. The centerpiece of your personal apartment is a massive tapestry, designed in ancient style and depicting the creation of your Arcology from the collapsing Old World, all the way up to the modern day, with you standing over a great cheering crowd in your golden crown. You wonder for a moment if you'll have to commission more tapestries as the Arcology advances further.`,
				"Aztec Revivalist": `as an Aztec cultural, spiritual and military leader of the city you're allowed great leniency. The ${properTitle()}'s room is created to gratify you as a true god of the people.`,
				"Egyptian Revivalist": `after the royal room of an ancient Egyptian palace. There is a small shrine to the old gods the ${properTitle()} favors in a side room, and linen hangings decorate the walls and ceiling.`,
				"Edo Revivalist": `in the spartan style of an Edo period castle's innermost rooms. Rice paper screens partition off many small cubicles around its large central space.`,
				"Arabian Revivalist": `as a beguiling haze of Arabian decadence. Gauzy curtains flutter in the warm, heady breeze.`,
				"Chinese Revivalist": `as though it were the innermost sanctum of the Forbidden City. The walls are gorgeous gilded hand-carved screens, and heavy jade statues of favored gods crouch in the corners.`,
				"Antebellum Revivalist": `is furnished with heavy, black oaken furniture intricately carved and inlaid with mother of pearl. A cozy sitting area, prominently featuring a royal divan upholstered in a deep purple fabric, lies about a grand fireplace with marble façade. Large windows framed in exotic hardwood imported from North America give a wonderful, top-down view of the arcology below.`,
				"Chattel Religionist": `as a severe place of cold stone and hard wood. A single shaft of sunlight illuminates the central space.`,
				"Degradationist": `with a gothic grandeur. Blood-red upholstery and hardwood menace decorate the walls.`,
				"Repopulationist": `comfortably, with lots of cushions and seats for a pregnant slaves to lounge on. There are various specialized toys, as well as, lotions and creams readily available.`,
				"Eugenics": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make fucking slave girls lots of fun. Condoms and spermicides are readily available throughout the suite.`,
				"Asset Expansionist": `comfortably, with the convenience of massive-breasted slaves in mind. There are lots of handrails, cushions, and low tables, covered with creams, lubricants, and sex toys.`,
				"Transformation Fetishist": `comfortably, with the convenience of bimbos in mind. There are lots of makeup dressers with mirrors, stripper poles, and low tables, covered with creams, lubricants, and sex toys.`,
				"Gender Radicalist": `comfortably, with the convenience of dickgirls in mind. There are lots of makeup dressers with mirrors, stripper poles, and low tables, covered with creams, lubricants, and vibrating butt plugs.`,
				"Gender Fundamentalist": `comfortably, with the convenience and pleasure of slavegirls in mind. There are lots of makeup dressers with mirrors, soft divans, and low tables, covered with creams, lubricants, and vibrators.`,
				"Physical Idealist": `as a shrine to the owner's body. Athletic trophies and photographs of past victories line the walls. The entire area is filled with the heady odors of sweat, metabolites, and sex.`,
				"Supremacist": `like the royal bedroom in a palace in the old countries of ${V.arcologies[0].FSSupremacistRace} people.`,
				"Subjugationist": `like the royal bedroom in a palace in the old countries which favored ${V.arcologies[0].FSSubjugationistRace} slaves.`,
				"Paternalist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable.`,
				"Pastoralist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants, with a distinct focus on mammary intercourse.`,
				"Maturity Preferentialist": `comfortably, with elegant sex toys and perfumed lubricants designed to appeal to mature sex slaves.`,
				"Youth Preferentialist": `comfortably, with pastel-colored sex toys and flavored lubricants designed to appeal to eager young sex slaves.`,
				"Body Purist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable.`,
				"Slimness Enthusiast": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable.`,
				"Hedonistic": `comfortably, with lots of lounges for a hefty slaves to relax on. ${V.arcologies[0].FSHedonisticDecadenceResearch === 1 ? `Platters of food and treats are readily available throughout the room and are` : `Slave food is readily available for your harem and platters of food for yourself are`} never out of arm's reach.`,
				"Intellectual Dependency": `comfortably, with lots of easy-to-clean leather and plentiful easy-to-use tools, toys, and lubricants to make sex with bimbo slaves as fun and simple as possible.`,
				"Slave Professionalism": `comfortably, with complex sex toys and tools designed to maximize pleasure when used by skilled hands. The space is largely dedicated to perfecting oneself and boosting ${properMaster()}'s status ever higher.`,
				"Petite Admiration": `comfortably, with plentiful tools, toys, lubricants and a bevy of stepping stools to accommodate even the shortest slave.`,
				"Statuesque Glorification": `comfortably, though designed for slaves of the taller variety. Short slaves will find the furniture woefully out of their reach.`,
				"standard": `in a refined, yet practical style.`,
			};
		} else {
			FS = {
				"Roman Revivalist": `as a Roman patrician's apartment. There is a small shrine to the old gods the ${properTitle()} favors in a side room, and the flooring is erotic mosaic.`,
				"Neo-Imperialist": `as an apartment worthy of a modern-day King. The highest of technology decorates every space, allowing you to remain in constant communication with the rest of the arcology - your fledgling empire - even when in your room. The ${properMaster()}'s suite is an elaborate shrine to your many victories, fitted with a king-sized pod-bed, and the banners of your house hang around you on every side. The centerpiece of your personal apartment is a massive tapestry, designed in ancient style and depicting the creation of your Arcology from the collapsing Old World, all the way up to the modern day, with you standing over a great cheering crowd in your golden crown. You wonder for a moment if you'll have to commission more tapestries as the Arcology advances further.`,
				"Aztec Revivalist": `as an Aztec cultural, spiritual and military leader of the city you're allowed great leniency. The ${properTitle()}'s room is created to gratify you as a true god of the people.`,
				"Egyptian Revivalist": `after the best room of an ancient Egyptian mansion. There is a small shrine to the old gods the ${properTitle()} favors in a side room, and linen hangings decorate the walls and ceiling.`,
				"Edo Revivalist": `in the spartan style of an Edo period mansion's innermost rooms. Rice paper screens divide it into subsections, each of which contains little more than a low bed.`,
				"Arabian Revivalist": `as a beguiling haze of Arabian decadence. Soft cushions are scattered across the floor and piled against the walls to provide something for dusky, naked bodies to recline on. Gauzy curtains partition the room into a number of cozy dens.`,
				"Chinese Revivalist": `like the mansion of a senior mandarin of ancient China. The walls are gorgeous hand-carved wooden screens, and heavy jade statues of favored gods crouch in the corners.`,
				"Antebellum Revivalist": `after the master bedroom of a palatial plantation house. A cozy sitting area, prominently featuring a royal divan upholstered in a deep purple fabric, lies about a grand fireplace with marble façade. Large windows framed in exotic hardwood imported from North America give a wonderful, top-down view of the arcology below.`,
				"Chattel Religionist": `as a severe place of cold stone and hard wood. A single shaft of sunlight illuminates the bed where penitents give their bodies to their ${properTitle()}.`,
				"Repopulationist": `comfortably, with lots of cushions and seats for a pregnant slaves to lounge on. Various specialized toys, as well as, lotions and creams are readily available.`,
				"Eugenics": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make fucking slave girls lots of fun. Condoms and spermicides are readily available throughout the suite.`,
				"Degradationist": `with a gothic grandeur. Blood-red upholstery and hardwood menace. There are numerous places where resistant slaves can be restrained.`,
				"Asset Expansionist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with stacked slaves as fun as possible.`,
				"Transformation Fetishist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with bimbo slaves as fun as possible.`,
				"Gender Radicalist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make fucking slave girls in the butt lots of fun. The straps to restrain slave girls who don't want to be fucked in the butt are concealed for now.`,
				"Gender Fundamentalist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make fucking slave girls nice and enjoyable. The straps to restrain slave girls who don't want to be fucked are concealed for now.`,
				"Physical Idealist": `as a shrine to the owner's body. Athletic trophies and photographs of past victories line the walls. There are mirrors almost everywhere, including on the ceiling over the bed.`,
				"Supremacist": `like the master bedroom in a mansion in the old countries of ${V.arcologies[0].FSSupremacistRace} people.`,
				"Subjugationist": `like the master bedroom in a mansion in the old countries which favored ${V.arcologies[0].FSSubjugationistRace} slaves.`,
				"Paternalist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable.`,
				"Pastoralist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants. Everything that isn't waterproof is covered in plastic, to catch errant milk.`,
				"Maturity Preferentialist": `comfortably, with elegant sex toys and perfumed lubricants designed to appeal to mature sex slaves.`,
				"Youth Preferentialist": `comfortably, with pastel-colored sex toys and flavored lubricants designed to appeal to eager young sex slaves.`,
				"Body Purist": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable.`,
				"Slimness Enthusiast": `comfortably, with lots of easy-to-clean leather and plentiful tools, toys, and lubricants to make sex with slaves mutually enjoyable.`,
				"Hedonistic": `comfortably, with lots of lounges for a hefty slaves to relax on. ${V.arcologies[0].FSHedonisticDecadenceResearch === 1 ? `Platters of food and treats are readily available throughout the room and are` : `Slave food is readily available for your harem and platters of food for yourself are`} never out of arm's reach.`,
				"Intellectual Dependency": `comfortably, with lots of easy-to-clean leather and plentiful easy-to-use tools, toys, and lubricants to make sex with bimbo slaves as fun and simple as possible.`,
				"Slave Professionalism": `comfortably, with complex sex toys and tools designed to maximize pleasure when used by skilled hands. The space is largely dedicated to perfecting oneself and boosting ${properMaster()}'s status ever higher.`,
				"Petite Admiration": `comfortably, with plentiful tools, toys, lubricants and a bevy of stepping stools to accommodate even the shortest slave.`,
				"Statuesque Glorification": `comfortably, though designed for slaves of the taller variety. Short slaves will find the furniture woefully out of their reach.`,
				"standard": `comfortably, as a fairly normal luxury suite. It is unusually large, to accommodate as large a stable of sex slaves as strikes your fancy.`,
			};
		}

		const res = FS[V.masterSuiteDecoration];

		if (!res) {
			throw new Error(`Unknown V.masterSuiteDecoration value of '${V.masterSuiteDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			amount: 2,
			desc: `${capFirstChar(V.masterSuiteName)} has room for ${numberWithPluralOne(V.masterSuite, "slave")} to live comfortably${V.masterSuiteUpgradeLuxury === 2
				? ` in the moments when they're not in the fuckpit`
				: V.masterSuiteUpgradeLuxury === 1 ? ` on its huge bed` : ``}. There ${this.facility.hostedSlaves() === 1 ? `is ${num(this.facility.hostedSlaves())} slave` : `are ${num(this.facility.hostedSlaves())} slaves`} in ${V.masterSuiteName}.`,
			removeSlave: "please you",
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "masterSuiteUpgradeLuxury",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `The master suite is a fairly standard room, albeit a much larger and more luxurious one.`,
						link: `Refit the suite to the height of traditional opulence`,
						cost: 25000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += .1,
						notes: [`will focus the suite on you`],
					},
					{
						value: 0,
						upgraded: 2,
						text: ``,
						link: `Remodel the suite around a luxurious pit for group sex`,
						cost: 25000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += .1,
						notes: [`will encourage fucktoys to fuck each other`],
					},
					{
						value: 1,
						text: `The large bed in the center of the room has been replaced with one that is nothing short of massive.`,
						upgraded: 2,
						link: `Remodel the suite around a luxurious pit for group sex`,
						cost: 10000 * V.upgradeMultiplierArcology,
						notes: [`will encourage fucktoys to fuck each other`],
					},
					{
						value: 2,
						text: `A large, recessed space has been built in the center of the room where slaves can spend their days fucking each other.`,
						upgraded: 1,
						link: `Refit the suite to the height of traditional opulence`,
						cost: 10000 * V.upgradeMultiplierArcology,
						notes: [`will focus the suite on you`],
					},
				],
			},
			{
				property: "masterSuiteUpgradePregnancy",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `The master suite does not currently have special customizations to support slave pregnancy.`,
						link: `Refit the suite to support and encourage slave pregnancy`,
						cost: 15000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += .1;

							App.UI.reload();
						},
						prereqs: [
							!!V.seePreg,
						],
					},
					{
						value: 1,
						text: `The master suite has been further upgraded to support fertile slaves and encourage slave pregnancy, providing additional rest areas, better access to amenities, and a dedicated birthing chamber.`,
					},
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "masterSuitePregnancySlaveLuxuries",
				prereqs: [
					V.masterSuiteUpgradePregnancy > 0,
				],
				options: [
					{
						get text() {
							return `Pregnant slaves have no extra luxuries to reduce stress.`;
						},
						link: `Normal duties`,
						value: 0,
					},
					{
						get text() {
							return `Pregnant slaves are being given some luxuries to reduce stress.`;
						},
						link: `Lighter duties`,
						value: 1,
					},
				],
			},
			{
				property: "masterSuitePregnancyFertilityDrugs",
				prereqs: [],
				options: [
					{
						get text() {
							return `Fertile slaves are not being given fertility drugs.`;
						},
						link: `No fertility drugs`,
						value: 0,
					},
					{
						get text() {
							return `Fertile slaves are being given fertility drugs, encouraging impregnation and multiple pregnancy.`;
						},
						link: `Standard fertility drugs`,
						value: 1,
					},
				],
			},
			{
				property: "masterSuiteHyperPregnancy",
				prereqs: [
					V.masterSuitePregnancyFertilityDrugs > 0 || V.masterSuiteHyperPregnancy > 0,
				],
				options: [
					{
						get text() {
							return `Fertile slaves are not being given super fertility drugs.`;
						},
						link: `No super fertility drugs`,
						value: 0,
					},
					{
						get text() {
							return `Fertile slaves are being given super fertility drugs, encouraging impregnation and multiple pregnancy.`;
						},
						link: `Super fertility drugs`,
						value: 1,
					},
				],
			},
			{
				property: "masterSuitePregnancyFertilitySupplements",
				prereqs: [
					V.masterSuitePregnancyFertilityDrugs === 1 || V.masterSuiteHyperPregnancy === 1 || V.masterSuitePregnancyFertilitySupplements > 0,
				],
				options: [
					{
						get text() {
							return `Fertile slaves are not being given fertility drug supplements.`;
						},
						link: `No supplements`,
						value: 0,
					},
					{
						get text() {
							return `Fertile slaves are being given supplements to their fertility drugs, further enhancing the chances of multiple pregnancy.`;
						},
						link: `Fertility supplements`,
						value: 1,
					},
				],
			},
		];
	}
};
