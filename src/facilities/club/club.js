App.Facilities.Club.club = class Club extends App.Facilities.Facility {
	constructor() {
		const club = App.Entity.facilities.club;
		const decommissionHandler = () => {
			V.club = 0;
			V.clubDecoration = "standard";
			V.clubUpgradePDAs = 0;
			V.clubAdsSpending = 0;

			App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Shop, "Club", "Shops");
		};

		super(
			club,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Club";
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		text.push(this.facility.nameCaps, this.decorations);

		if (this.facility.hostedSlaves() > 2) {
			text.push(`${this.facility.nameCaps} is dotted with pretty, flirtatious slaves, stripping on stages, serving drinks, and dancing. They're very willing to suck patrons off in the open or give a public handjob, and there are little private rooms for them to use when engaging in heavier intercourse.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`There are a few pretty, flirtatious slaves, stripping on stages, serving drinks, and dancing. They're very willing to suck patrons off in the open or give a public handjob, and there are little private rooms for them to use when engaging in heavier intercourse.`);
		} else if (S.DJ) {
			text.push(`${this.facility.nameCaps} is doing business normally, without a complement of sex slaves to spice things up. ${S.DJ.slaveName} is alone in ${V.clubName}, and can accomplish little by ${getPronouns(S.DJ).himself}.`);
		} else {
			text.push(`${this.facility.nameCaps} is doing business normally, without a complement of sex slaves to spice things up.`);
		}

		if (V.clubAdsSpending > 0) {
			text.push(`Screens outside the entrance are showing softcore music videos to advertise ${V.clubName}.`);

			if (V.clubAdsOld === 1) {
				text.push(`The featured strippers are all MILFs.`);
			} else if (V.clubAdsOld === -1) {
				text.push(`The featured strippers are all nice and young.`);
			} else if (V.clubAdsOld === -2) {
				text.push(`The featured strippers are all teenagers.`);
			} else if (V.clubAdsOld === -3) {
				text.push(`The featured strippers are all lolis.`);
			} else {
				text.push(`The featured strippers vary in age.`);
			}

			if (V.clubAdsStacked === 1) {
				text.push(`Lots of bouncing breasts and butts`);
			} else if (V.clubAdsStacked === -1) {
				text.push(`Lots of trim breasts and shapely butts`);
			} else {
				text.push(`A variety of breast and butt sizes and shapes`);
			}

			text.push(`are on display, and`);

			if (V.clubAdsImplanted === 1) {
				text.push(`most of these are augmented by implants.`);
			} else if (V.clubAdsImplanted === -1) {
				text.push(`they're all natural.`);
			} else {
				text.push(`some are augmented by implants.`);
			}

			if (V.seePreg) {
				if (V.clubAdsPreg === 1) {
					text.push(`Most of the strippers have firm, rounded bellies.`);
				} else if (V.clubAdsPreg === -1) {
					text.push(`Most of the strippers have firm, flat bellies.`);
				} else {
					text.push(`Some of the strippers are pregnant.`);
				}
			}

			if (V.clubAdsModded === 1) {
				text.push(`Everything is heavily pierced and tattooed.`);
			} else if (V.clubAdsModded === -1) {
				text.push(`Everything is free of tattoos and piercings.`);
			} else {
				text.push(`Some of these assets are tattooed and pierced, and some aren't.`);
			}

			text.push(`The strippers get naked quickly, and show off`);

			if (V.clubAdsXX === 1) {
				text.push(`their pussies and assholes.`);
			} else if (V.clubAdsXX === -1) {
				text.push(`their assholes.`);
			} else {
				text.push(`their holes.`);
			}

			text.push(`The ads are shown across the arcology.`);

			if (V.clubAdsXX === 1 && V.clubAdsImplanted === 1 && V.clubAdsStacked === 1) {
				text.push(`As a result, ${V.clubName} is known as the place to spend a night partying with ${V.clubAdsPreg === 1 ? `pregnant ` : ``}bimbos.`);
			} else if (V.clubAdsXX === 1 && V.clubAdsOld === 1) {
				text.push(`As a result, ${V.clubName} is known as the place to spend a night partying with ${V.clubAdsPreg === 1 ? `pregnant ` : ``}MILFs.`);
			} else if (V.clubAdsXX === 1 && V.clubAdsOld === -3) {
				text.push(`As a result, ${V.clubName} is known as the place to spend a night partying with ${V.clubAdsPreg === 1 ? `pregnant ` : ``}${V.clubAdsStacked === 1 ? `oppai ` : ``}lolis.`);
			} else if (V.clubAdsXX === 1 && V.clubAdsPreg === 1) {
				text.push(`As a result, ${V.clubName} is known as the place to spend a night partying with pregnant sluts.`);
			} else if (V.clubAdsXX === -1 && V.clubAdsStacked === 1) {
				text.push(`As a result, ${V.clubName} is known as the place to spend a night partying with shemales.`);
			} else if (V.clubAdsXX === -1 && V.clubAdsStacked === -1) {
				text.push(`As a result, ${V.clubName} is known as the place to spend a night partying with traps.`);
			}
		}

		if (this.facility.hostedSlaves() > 2) {
			switch (V.clubDecoration) {
				case "Chattel Religionist":
					text.push(`From one of the private rooms, praying interspersed with the slap of leather on flesh can be heard.`);
					break;
				case "Degradationist":
					text.push(`Agonized screaming can be heard from one of the private rooms.`);
					break;
				case "Repopulationist":
					text.push(`A wet slapping sound is coming from one of the private rooms, the kind of sound made by mammary intercourse with very milky breasts. Occasionally crying can be heard from one of the rooms specially designed for patrons wishing to assfuck a slave as she gives birth.`);
					break;
				case "Eugenics":
					text.push(`The slight sounds of whispering can be heard emanating from one of the restricted rooms.`);
					break;
				case "Asset Expansionist":
					text.push(`A wet slapping sound is coming from one of the private rooms, the kind of sound made by mammary intercourse with very large breasts.`);
					break;
				case "Transformation Fetishist":
					text.push(`A wet slapping sound is coming from one of the private rooms, the kind of sound made by mammary intercourse with very large fake breasts.`);
					break;
				case "Gender Radicalist":
					text.push(`Uncomfortable moaning from one of the private rooms suggests that a slave inside is taking a painfully large cock up their tight butt.`);
					break;
				case "Gender Fundamentalist":
					text.push(`The unmistakable sound of vigorous vaginal intercourse can be heard from one of the private rooms.`);
					break;
				case "Physical Idealist":
					text.push(`Bestial grunting can be heard from one of the private rooms.`);
					break;
				case "Supremacist":
				case "Subjugationist":
					text.push(`The sound of a beating, interspersed with desperate begging, can be heard from one of the private rooms.`);
					break;
				case "Paternalist":
					text.push(`The unmistakable sound of a slave experiencing an authentic orgasm can be heard from one of the private rooms.`);
					break;
				case "Body Purist":
					text.push(`The faint but unmistakable sound of a slave trying to keep quiet while orgasming can be heard from one of the private rooms.`);
					break;
				case "Slimness Enthusiast":
					text.push(`The faint but unmistakable sound of a shrill climax can be heard from one of the private rooms.`);
					break;
				case "Pastoralist":
					text.push(`A faint gushing sound is audible from one of the private rooms.`);
					break;
				case "Roman Revivalist":
					text.push(`A business meeting is just audible from one of the private rooms; only an occasional moan indicates that the businessmen are enjoying a couple of serving girls at the same time.`);
					break;
				case "Aztec Revivalist":
					text.push(`A muffled ${FutureSocieties.isActive('FSPaternalist') ? `moan` : `scream`}, followed by the sounds of liquid gently dripping on the stone floors denote the goings-on in the building.`);
					break;
				case "Egyptian Revivalist":
					text.push(`The smell of incense and the sounds of sex are drifting out of the private rooms.`);
					break;
				case "Arabian Revivalist":
					text.push(`The faint sound of multiple slaves pleasuring a single patron can be heard from one of the private rooms.`);
					break;
				case "Edo Revivalist":
				case "Antebellum Revivalist":
				case "Chinese Revivalist":
					text.push(`The faint but unmistakable sound of a slave trying to keep quiet while orgasming can be heard from one of the private rooms.`);
					break;
				case "Maturity Preferentialist":
					text.push(`The faint sound of a well traveled slave showing off their experience can be heard from one of the private rooms.`);
					break;
				case "Youth Preferentialist":
					text.push(`The faint but unmistakable sound of a shrill climax can be heard from one of the private rooms.`);
					break;
				case "Hedonistic":
					text.push(`The sound of fat bodies fucking while feeding each other can be heard from one of the private rooms.`);
					break;
				case "Intellectual Dependency":
					text.push(`The sounds of an overstimulated bimbo can be heard from one of the private rooms.`);
					break;
				case "Slave Professionalism":
					text.push(`The sounds of an overstimulated patron can be heard from one of the private rooms.`);
					break;
				case "Petite Admiration":
					text.push(`The faint sound of a slave giving head can be heard from one of the private rooms.`);
					break;
				case "Statuesque Glorification":
					text.push(`The faint thumping of a patron banging a slave against the wall can be heard echoing from one of the private rooms.`);
					break;
				default:
					text.push(`The faint but unmistakable sound of a shrill climax can be heard from one of the private rooms.`);
					break;
			}
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `is decorated like a Roman villa's entertainment rooms. There is a lot of white stone, plaster, and terracotta.`,
			"Neo-Imperialist": `is a genuine temple of Imperial decadence. The blaze of bright neon lights flash and strobe on a mass of sweaty bodies, sleek speakers blaring synthetic music as banners with your family's crest flutter above the serenity of mindless dance. The stoic stone figures of Imperial Knights watching the entrance provide a stark contrast to the Bacchian passion of the dancers.`,
			"Aztec Revivalist": `is decorated with obsidian figures inserted in the lime walls and giant oak pillars that give a homey feeling to the otherwise cold building.`,
			"Egyptian Revivalist": `is decorated like a room in an ancient Egyptian palace. There are columns of warm stone and pools of clear water full of aquatic plants.`,
			"Edo Revivalist": `is furnished as an Edo period theater. Performances of the traditional Japanese arts can be seen here, though more modern dancing happens in the evenings. In either case, geisha girls are present and willing.`,
			"Arabian Revivalist": `is designed like an open plaza in an Arabian palace, with a raised stage in the center for erotic dancing. Diaphanous, flowing curtains billow across the space, dispersing the narcotic smoke billowing from a score of hookahs.`,
			"Chinese Revivalist": `is furnished as an old Chinese disorderly house. It's intentionally packed in so that closeness and good cheer is obligatory here; prominent citizens share tables while their hangers-on jostle for room.`,
			"Antebellum Revivalist": `is designed like a distinguished Old World theater with a large stage for cabaret. The air is filled with cigar smoke and raucous cries from the audience.`,
			"Chattel Religionist": `isn't a religious establishment, but it almost looks like one. It's clean and proper, with beams of natural light that come down to highlight holy sex slaves' bodies.`,
			"Degradationist": `has a perverted, debauched appearance. The décor is utilitarian so it can be cleaned easily, and the reason is obvious. Many patrons have brought their own slaves to publicly rape here.`,
			"Repopulationist": `has a gaudy appearance. There are lots of deep soft chairs for pregnant patrons and slaves to rest in and screens showing girls with large bellies lining the walls.`,
			"Eugenics": `has a gaudy appearance. There are screens lining the walls discouraging unprotected slave sex. The real action happens in the several exclusive rooms reserved for society's best.`,
			"Asset Expansionist": `has a gaudy appearance. There are a lot of neon lights and there are screens everywhere, showing off big tits and plush asses.`,
			"Transformation Fetishist": `has a gaudy appearance. There are a lot of neon lights and there are screens everywhere, showing off huge fake tits and plastic dick-sucking lips.`,
			"Gender Radicalist": `has a gaudy appearance. There are a lot of neon lights and there are screens everywhere, showing closeups of cocks fucking every imaginable orifice.`,
			"Gender Fundamentalist": `has an old world appearance, a decidedly throwback atmosphere harking back to the glory days of cultures past.`,
			"Physical Idealist": `isn't a gym, but it smells like one. The dancing is rough and competitive, and the drinks are rich with protein.`,
			"Supremacist": `is decorated like an upper-class gentleman's club in the old countries of ${V.arcologies[0].FSSupremacistRace} people.`,
			"Subjugationist": `is decorated like an upper-class gentleman's club in the old countries which favored ${V.arcologies[0].FSSubjugationistRace} slaves.`,
			"Paternalist": `is handsome and well-kept, even romantic. Though the slaves here are sex slaves, every provision is made to encourage them to enjoy themselves.`,
			"Pastoralist": `is decorated to resemble a frontier disorderly house. The drinks are pounded straight, and there's a set of swinging doors for bad men to part dramatically as they enter.`,
			"Maturity Preferentialist": `is surprisingly elegant. The music consists of refined remixes of traditional dance music, offering slaves and citizens the chance to dance beautifully together.`,
			"Youth Preferentialist": `is deafeningly loud. There's a bright light show running, offering staccato glimpses of the scene out on the dance floor.`,
			"Body Purist": `is gorgeous, decorated and kept in the height of fashionable night establishment style. The music is cutting edge and everything and everyone is elegant.`,
			"Slimness Enthusiast": `is distinctly gaudy, with lots of sugary drinks on offer. The music and décor are of a decidedly bubblegum quality.`,
			"Hedonistic": `has a gaudy appearance. The dance floor is extra large to accommodate its extra wide dancers, though bodies grinding against each other is an inevitability. Plenty of roomy, comfortable booths encircle the room for an exhausted citizen to relax with his plush dance partner, and a wide selection of greasy food accompanies the drinks. ${V.arcologies[0].FSHedonisticDecadenceResearch === 1 ? `Platters of food are complementary for feeding slaves` : `Feeders are available in the booths to feed tired slaves`} while they get fondled.`,
			"Intellectual Dependency": `is distinctly gaudy and easy for slaves to move around in. The dancing is as energetic and sexual, and the drinks sugary and sweet.`,
			"Slave Professionalism": `is decorated like an upper-class gentleman's club. It is where a true courtesan works their craft.`,
			"Petite Admiration": `has a gaudy appearance. The dance floor is surrounded by raised platforms so even the shortest slave can be seen by the crowd.`,
			"Statuesque Glorification": `has a tiered appearance. The booths and bar are positioned overlooking the dance floor so patrons may loom over the dancing slaves even when seated.`,
			"standard": `is set up in an uncomplicated way. There's a bar for drinks, a dance floor for slave girls, and private rooms for slave sex.`,
		};

		const res = FS[V.clubDecoration];

		if (!res) {
			throw new Error(`Unknown V.clubDecoration value of '${V.clubDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			desc: `There are rooms off ${V.clubName} to support slaves as they work as club sluts. They can support ${num(V.club)} slaves. There ${this.facility.hostedSlaves() === 1 ? `is currently ${num(this.facility.hostedSlaves())} slave` : `are currently ${num(this.facility.hostedSlaves())} slaves`} serving in ${V.clubName
			}.`,
			removeSlave: "serve the public",
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "clubUpgradePDAs",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `The rooms are standard.`,
						link: `Upgrade them with PDAs to help your recruiter`,
						cost: 10000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						handler: () => V.PC.skill.engineering += 0.1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} has been wired for unobtrusive personal data assistants to let your sluts pass tips about enslavable people to your recruiter.`,
					},
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "DJignoresFlaws",
				prereqs: [
					!!S.DJ,
				],
				options: [
					{
						get text() {
							return `${S.DJ.slaveName} will attempt to fix flaws in ${V.clubName}'s sluts.`;
						},
						link: `Fix flaws`,
						value: 0,
					},
					{
						get text() {
							return `${S.DJ.slaveName} has been instructed to ignore flaws in ${V.clubName}'s sluts.`;
						},
						link: `Ignore flaws`,
						value: 1,
					},
				],
			},
			{
				property: "DJnoSex",
				prereqs: [
					!!S.DJ,
				],
				options: [
					{
						get text() {
							const {he, him} = getPronouns(S.DJ);
							return `${S.DJ.slaveName} will slut it up when ${he} doesn't have enough sluts serving under ${him}.`;
						},
						link: `Serve clients`,
						value: 0,
					},
					{
						get text() {
							const {he, himself} = getPronouns(S.DJ);
							return `${S.DJ.slaveName} will not be slutting it up ${himself} even if ${he} has time.`;
						},
						link: `Don't serve clients`,
						value: 1,
					},
				],
			},
		];
	}

	/** @returns {HTMLDivElement} */
	get stats() {
		return App.UI.DOM.makeElement("div", App.Facilities.Club.Stats(true));
	}

	get ads() {
		const div = document.createElement("div");

		if (V.clubAdsSpending > 0) {
			div.append(`${this.facility.nameCaps} is the subject of an active ad campaign.`);
		} else {
			div.append(`${this.facility.nameCaps} is not being advertised.`);
		}

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.passageLink(`Manage club advertisements`, "Club Advertisement", () => {
			V.nextLink = passage();
			V.nextButton = "Back";
		}), ["indent"]);

		return div;
	}
};
