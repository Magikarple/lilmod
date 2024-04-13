// cSpell:ignore Aaru's, Maat, Ammit, Jigoku, Jahannam, ifrit, Diyu, Tonatiuhtlán's, Tōnatiuh's, Mictlān, riad

App.Facilities.Pit.pit = function() {
	V.nextButton = "Back to Main";
	V.nextLink = "Main";
	App.UI.StoryCaption.encyclopedia = "Pit";

	const pit = App.Entity.facilities.pit;

	const container = document.createElement("div");
	container.append(assemble());
	return container;

	/**
	 * @returns {DocumentFragment}
	 */
	function assemble() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", frag, intro(), ['margin-bottom']);

		const tabs = new App.UI.Tabs.TabBar("arena_main");

		const trainingFrag = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", trainingFrag, arenaDescription(), ['margin-bottom']);
		App.UI.DOM.appendNewElement("div", trainingFrag, arenaSlaves(), ['margin-bottom']);
		tabs.addTab("Training", "training", trainingFrag);

		const fightsFrag = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", fightsFrag, pitDescription(), ['margin-bottom']);
		App.UI.DOM.appendNewElement("div", fightsFrag, pitSlaves(), ['margin-bottom']);
		tabs.addTab("Fighters", "fights", fightsFrag);

		const endWeekFrag = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", endWeekFrag, arenaUpgrades(), ['margin-bottom']);
		App.UI.DOM.appendNewElement("div", endWeekFrag, arenaRules(), ['margin-bottom']);
		App.UI.DOM.appendNewElement("div", endWeekFrag, arenaScheduledBG(), ['margin-bottom']);
		App.UI.DOM.appendNewElement("div", endWeekFrag, arenaScheduledFight(), ['margin-bottom']);
		tabs.addTab("Fights", "ew_fights", endWeekFrag);

		frag.append(tabs.render());

		App.UI.DOM.appendNewElement("div", frag, rename(), ['margin-bottom']);
		return frag;
	}

	function refresh() {
		App.UI.DOM.replace(container, assemble());
	}


	function arenaScheduledBG() {
		const el = document.createDocumentFragment();

		if (V.pit.slaveFightingBodyguard !== null) {
			const bodyguard = V.pit.slaveFightingBodyguard;

			el.append(`You have scheduled ${getSlave(bodyguard).slaveName} to fight your bodyguard to the death this week.`);

			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(`Cancel it`, () => {
				V.pit.slaveFightingBodyguard = null;

				App.UI.reload();
			}), ['indent']);
		}
		return el;
	}

	function arenaScheduledFight() {
		const el = document.createDocumentFragment();

		if (V.pit.slavesFighting !== null) {
			const [slave1, slave2] = V.pit.slavesFighting;

			el.append(`You have scheduled `, App.UI.DOM.referenceSlaveWithPreview(getSlave(slave1), SlaveFullName(getSlave(slave1))), ` and `,
				App.UI.DOM.referenceSlaveWithPreview(getSlave(slave2), SlaveFullName(getSlave(slave2))), " to fight this week.");

			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(`Cancel it`, () => {
				V.pit.slavesFighting = null;

				App.UI.reload();
			}), ['indent']);
		} else {
			el.append(App.UI.DOM.passageLink("Schedule two slaves to fight each other", "Pit Workaround"));
		}

		return el;
	}


	function intro() {
		const el = document.createDocumentFragment();

		App.UI.DOM.appendNewElement("h1", el, pit.nameCaps);

		const text = [];

		text.push(`${pit.nameCaps} ${decorations()}`);
		text.push("In the available space surrounding it are various combat training facilities.");

		if (pit.hostedSlaves("trainee") > 5) {
			text.push(`${pit.nameCaps} is bustling with slaves honing their skills in sparring matches.`);
		} else if (pit.hostedSlaves("trainee") > 1) {
			text.push(`Some slaves are honing their skills in sparring matches.`);
		} else if (pit.hostedSlaves("trainee") > 0) {
			text.push(`One slave is training in the otherwise empty halls.`);
		}
		if (pit.hostedSlaves("fighter") > 2) {
			text.push(`It has a pool of slaves assigned to fight in the next week's bout.`);
		} else if (pit.hostedSlaves("fighter") > 1) {
			text.push(`It has two slaves assigned to the week's bout.`);
		} else if (pit.hostedSlaves("fighter") > 0) {
			text.push(`It has only one slave assigned to the week's bout.`);
		}
		if (pit.hostedSlaves() === 0) {
			text.push(`${pit.nameCaps} lays empty and silent.`);
		}

		App.UI.DOM.appendNewElement("div", el, text.join(' '), ['scene-intro']);

		if (pit.totalEmployeesCount === 0) {
			el.append(App.UI.DOM.makeElement("div", App.UI.DOM.passageLink(`Decommission ${pit.name}`, "Main", () => {
				V.pit = null;
				App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Market, "Pit", "Markets");
			}), ['indent']));
		}

		return el;
	}

	function decorations() {
		const chattelReligionist = () => {
			const text = [`is a large, modern arena decorated with frescoes of two fictional slaves reaching the afterlife. On the upper walls near the seatings, the obedient slave blissfully follow ${V.seeDicks < 100 ? `her` : `his`} master through`];
			if (FutureSocieties.isActive('FSRomanRevivalist')) {
				text.push(`Elysian Fields' gates, Pluto's chthonic arcology, while on the walls of the fighting area, the disobedient one is sentenced to suffer in a hellish-looking old world city named Tartarus.`);
			} else if (FutureSocieties.isActive('FSNeoImperialist')) {
				text.push(`Heaven's gates, God's celestial arcology, while on the wall of the fighting area, the disobedient one is dragged by demonlike raiders down to Hell.`);
			} else if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
				text.push(`Aaru's gates, Osiris' celestial arcology, while on the wall of the fighting area, the disobedient one, whose heart is heavier than the feather of Maat, is eaten by Ammit, the devourer of souls.`);
			} else if (FutureSocieties.isActive('FSEdoRevivalist')) {
				text.push(`Takamagahara's gates, Amaterasu's celestial arcology, while on the wall of the fighting area, the disobedient one is tortured in Jigoku by oni-like raiders.`);
			} else if (FutureSocieties.isActive('FSArabianRevivalist')) {
				text.push(`Jannah's gates, Allah's celestial arcology, while on the wall of the fighting area, the disobedient one is thrown by two angels into Jahannam for the awaiting ifrit-like raiders.`);
			} else if (FutureSocieties.isActive('FSChineseRevivalist')) {
				text.push(`Tian's gates, Jade Emperor's arcology, while on the wall of the fighting area, the disobedient one is tortured in Diyu by yaoguai-like raiders.`);
			} else if (FutureSocieties.isActive('FSAztecRevivalist')) {
				text.push(`Tonatiuhtlán's gates, Tōnatiuh's celestial arcology, to accompany the sun during the morning, while on the wall of the fighting area, the disobedient one is sent to Mictlān to suffer through many challenges.`);
			} else if (FutureSocieties.isActive('FSAntebellumRevivalist')) {
				text.push(`Heaven's gates, God's celestial arcology, while on the wall of the fighting area, the disobedient one falls to Hell, where lakes of fire burn for eternity.`);
			} else {
				text.push(`Paradise's gates, Allslaver's celestial arcology, while on the wall of the fighting area, the disobedient one is sentenced to survive in the Wasteland of the Freedom Trickster.`);
			}
			return text.join(" ");
		};

		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `is a circular Roman amphitheater-like structure with a coffered dome built of limestone. Walls are covered with mosaics depicting various idealized gladiatorial fights. At the bottom, the pit is covered with a fine layered of sand.`,
			"Neo-Imperialist": `is a futurist, gothic-styled indoor list field with a retractable ceiling and a modular arena where tournaments are held. While most of them are used for slaves fighting, ${V.arcologies[0].name}'s citizens may enjoy and participate in neo-jousting with highly-powered motorcycles and modern mock battles with heavily-armored knights.`,
			"Aztec Revivalist": `is a large rectangular masonry structure used for both Mesoamerican ballgames and slave fights decorated in the traditional Aztec way, with stacked stone walls painted with bright murals.`,
			"Egyptian Revivalist": `is a simple sunken pit with a sand floor and sandstone walls. In the seating area, there are papyriform columns supporting the ceiling while the walls are decorated with hieroglyphic and pictorial frescoes.`,
			"Edo Revivalist": `is a lush Japanese garden surrounding a pond filled with large, colorful koi. A red wooden footbridge links the garden with the small island that lies in the middle of the pond, which is where the slaves fight.`,
			"Arabian Revivalist": `is a riad, a symmetrical indoor garden centered around the fighting area. Seating for guests are available under the shade of the flora and the surrounding balconies decorated with complex arabesque.`,
			"Chinese Revivalist": `is decorated like a traditional Chinese courtyard, with a large open area in the center surrounded by low buildings with brick walls and clay tile roofs. A couple of bronze-cast Chinese guardian lions protect the entrance of the structure.`,
			"Antebellum Revivalist": `is a richly decorated theater. It is a large, cavernous space with a sandy pit in the center surrounded with tiered seating. An orchestra plays for particularly dramatic fights. The poorest sit near "the gods", the highest area of the theater, while wealthier citizens may have their own reserved boxes with private seating.`,
			"Chattel Religionist": chattelReligionist(),
			"Degradationist": `is a large, modern arena with huge screens mounted strategically to allow its guests the best possible view of the combatants' rape or dismemberment.`,
			"Repopulationist": `is a large, modern stadium with a large open area in the center for the fighters. The bleachers are connected with adjacent birthing areas furnished with wall screens allowing the mothers to enjoy the fight while increasing ${V.arcologies[0].name}'s population.`,
			"Eugenics": `is a large, modern arena with a large open area in the center for the fighters. The seating area is divided in two to separate the Elite, who own the most comfortable seats with the best views, from the unwashed masses.`,
			"Asset Expansionist": `is a large, modern arena that has been designed to welcome all of your well-stacked citizens and slaves. The front row is designed to accommodate and reward the most hypertrophied ones.`,
			"Transformation Fetishist": `is both a architectural and engineering marvel made with some of the most recently crafted composite materials and filled with cutting-edge technologies designed to record the fighters from every angle.`,
			"Gender Radicalist": `is a large, modern arena that offers the best seats to slave owners, with a designated spot at their feet for their slaves with dicks.`,
			"Gender Fundamentalist": `is a large, modern arena with a clear separation between gender. Front seats are reserved for male citizens while the back seats are left for women and slaves.`,
			"Physical Idealist": `is a large, modern arena made nearly entirely of marble decorated with imposing statues of muscular athletes that seem to support the structure with ease.`,
			"Supremacist": `is a massive arena decorated to glorified ${V.arcologies[0].FSSupremacistRace} architecture, martial arts and military superiority throughout history.`,
			"Subjugationist": `is a large, modern arena that looks like a zoo enclosure, where ${V.arcologies[0].name}'s citizens can comfortably watch ${V.arcologies[0].FSSubjugationistRace} subhuman rape${V.seeBestiality ? ` and bestiality` : ``}.`,
			"Paternalist": `is a large, modern arena with seating that allows not only your citizens, but also menial and sexual slaves to come and watch the combatants fighting.`,
			"Pastoralist": `is a large, modern arena${V.dairy > 0 ? ` connected with ${V.dairyName} pipelines` : ``}. The fighting area can receive low quality body fluids of various quantities that makes each fight more unique.`,
			"Maturity Preferentialist": `is a large arena with the same architectural style as the arenas built in the first arcologies ever made.`,
			"Youth Preferentialist": `is a large, modern arena that is regularly decorated by the most trending arcologies' fashion designers.`,
			"Body Purist": `is a large arena made entirely out of local wood and stone and constructed with little to no fasteners, bindings or adhesives.`,
			"Slimness Enthusiast": `is a large, modern arena made of graphene and other lightweight materials, allowing natural light to illuminate every corner of the structure.`,
			"Hedonistic": `is both a large, modern arena and a congregation of restaurants. Its many chefs compete as fiercely as the fighters to offer vast quantities of caloric nourishment for the audience.`,
			"Intellectual Dependency": `is a large, modern arena decorated with simple and cartoonish representation of gladiatorial fights. Phallus-shaped foam bats are given to the easily-bored bimbo slaves while their masters watch the fights in peace.`,
			"Slave Professionalism": `is a large, modern arena decorated with displays of armed and unarmed fighting stances to incite slave owners to train their favorite slaves with combat skills.`,
			"Petite Admiration": `is a small, modern arena that is surprisingly roomy on the inside and decorated with artwork of small, cunning heroes defeating dumb giants.`,
			"Statuesque Glorification": `is a colossal arena that can be seen from any sector of the arcology and looks like a shepherd casting its protective shadow on the herd of smaller buildings.`,
			"standard": `is fairly unremarkable – little more than a fairly large, circular amphitheater set into one corner of ${V.arcologies[0].name}.`,
		};

		const res = FS[V.pit.decoration];

		if (!res) {
			throw new Error(`Unknown V.pit.decoration value of '${V.pit.decoration}' found in decorations().`);
		}

		return res;
	}

	function arenaDescription() {
		const el = document.createDocumentFragment();

		el.append("Slaves assigned here will continue with their usual duties but train for some time every day. ");
		el.append(`There ${pit.hostedSlaves("trainee") === 1 ? `is` : `are`} currently ${numberWithPluralOne(pit.hostedSlaves("trainee"), "slave")} assigned to train in ${pit.name}.`);

		if (pit.hostedSlaves("trainee") > 0) {
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(`Remove all slaves`, () => {
				App.Entity.facilities.pit.employees().forEach(slave => removeJob(slave, Job.ARENA));

				App.UI.reload();
			}), ['indent']);
		}

		return el;
	}

	function pitDescription() {
		const el = document.createDocumentFragment();

		el.append("Slaves assigned here will continue with their usual duties and fight during the weekend. ");
		el.append(`There ${pit.hostedSlaves("fighter") === 1 ? `is` : `are`} currently ${numberWithPluralOne(pit.hostedSlaves("fighter"), "slave")} assigned to fight in ${pit.name}.`);

		if (pit.hostedSlaves("fighter") > 0) {
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(`Cancel all fights`, () => {
				App.Entity.facilities.pit.employees().forEach(slave => removeJob(slave, Job.PIT));

				App.UI.reload();
			}), ['indent']);
		}

		return el;
	}

	function arenaRules() {
		const el = document.createDocumentFragment();

		const options = new App.UI.OptionsGroup();

		options.addOption("Host fights once a week", "active", V.pit)
			.addValue("Yes", true).on()
			.addValue("No", false).off();

		let option = options.addOption("Audience", "audience", V.pit)
			.addValue("Closed", "none")
			.addValue("Free", "free")
			.addValue("Paid", "paid");
		if (V.pit.audience === "none") {
			option.addComment(`Fights here are strictly private.`);
		} else if (V.pit.audience === "free") {
			option.addComment(`Fights here are free and open to the public.`);
		} else if (V.pit.audience === "paid") {
			option.addComment(`Admission is charged to the fights here.`);
		}

		options.addOption("Lethal fights", "lethal", V.pit)
			.addValue("Forbidden", 0).addValue("Allowed", 1).addValue("Always", 2);

		options.addOption("Respect virginities", "virginities", V.pit)
			.addValue("All", "all").addValue("Vaginal", "vaginal")
			.addValue("Anal", "anal").addValue("None", "none");

		App.UI.DOM.appendNewElement("div", el, options.render(), ['margin-bottom']);

		return el;
	}

	function arenaUpgrades() {
		const f = new DocumentFragment();
		f.append((new App.Upgrade("seats", [
			{
				value: 0,
				upgraded: 1,
				text: "Around the pit is an small space to watch the fights from.",
				link: "Add some proper stands",
				cost: 5000 * V.upgradeMultiplierArcology
			},
			{
				value: 1,
				upgraded: 2,
				text: "Surrounding the pit are small stands to watch the fights from.",
				link: "Replace the stands with big, permanent ones",
				cost: 20000 * V.upgradeMultiplierArcology
			},
			{
				value: 2,
				text: "The pit is encased by large stands offering a large space to watch the fights from.",
			}
		], V.pit)).render());
		f.append((new App.Upgrade("fightsBase", [
			{
				value: 0,
				upgraded: 1,
				text: "Next to the pit is a small room for your slaves to store their equipment in.",
				link: "Add a room for the slaves to wait in between fights",
				cost: 5000 * V.upgradeMultiplierArcology
			},
			{
				value: 1,
				upgraded: 2,
				text: "Around the arena are some rooms for your slaves to wait and store their equipment in between fights",
				link: "Improve the equipment and add spaces for the slaves to prepare for their fights",
				cost: 20000 * V.upgradeMultiplierArcology
			},
			{
				value: 2,
				text: "Around the pit are various facilities for your slaves to rest and prepare in between fights. High quality equipment is available in multiple store rooms.",
			}
		], V.pit)).render());
		return f;
	}

	function arenaSlaves() {
		const el = document.createDocumentFragment();

		App.UI.DOM.appendNewElement("h2", el, `Slaves`);
		const div = document.createElement("div");

		div.append(App.UI.SlaveList.listJFacilitySlaves("trainee", App.Entity.facilities.pit, undefined, false, {
			assign: "Assign a slave", remove: "Cancel a slave's training", transfer: null
		}, undefined, deadlinessNote));

		App.UI.DOM.appendNewElement("div", el, div, ['margin-bottom']);

		App.UI.SlaveList.ScrollPosition.restore();
		return el;
	}

	function pitSlaves() {
		const el = document.createDocumentFragment();

		App.UI.DOM.appendNewElement("h2", el, `Slaves`);
		const div = document.createElement("div");

		div.append(App.UI.SlaveList.listJFacilitySlaves("fighter", App.Entity.facilities.pit, passage(), false, {
			assign: "Schedule a slave to fight", remove: "Cancel a slave's fight", transfer: null
		}, undefined, deadlinessNote));

		App.UI.DOM.appendNewElement("div", el, div, ['margin-bottom']);

		App.UI.SlaveList.ScrollPosition.restore();
		return el;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {HTMLDivElement}
	 */
	function deadlinessNote(slave) {
		const div = document.createElement("div");
		div.append("Deadliness: ", DeadlinessTooltip(slave));
		return div;
	}

	function rename() {
		const el = document.createDocumentFragment();

		App.UI.DOM.appendNewElement("h2", el, `Rename`);
		App.UI.DOM.appendNewElement("div", el, App.Facilities.rename(pit, () => refresh()));

		return el;
	}
};
