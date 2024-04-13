/** @param {boolean} inIntro */
App.Intro.descriptionDivForArcology = function(arcology, acceptArcology = () => {}, inIntro = false) {
	const div = document.createElement("div");
	div.classList.add("card");
	div.append(
		App.UI.DOM.makeElement("span", inIntro ? App.UI.DOM.passageLink(arcology.name, "Intro Summary", () => acceptArcology()) : arcology.name, ['bold']),
		` is an established arcology located in a Free City `,
	);
	if (arcology.terrain === "urban") {
		div.append(`carved out of an urban area of ${arcology.continent}.`);
	} else if (arcology.terrain === "rural") {
		div.append(`built in a rural area of ${arcology.continent}.`);
	} else if (arcology.terrain === "marine") {
		div.append(`constructed just offshore of ${arcology.continent}.`);
	} else if (arcology.terrain === "ravine") {
		div.append(`constructed in a large canyon of ${arcology.continent}.`);
	} else {
		div.append(`in the middle of the ocean.`);
	}

	function newLine(...content) {
		const line = document.createElement("div");
		line.classList.add("indent");
		line.append(...content);
		div.append(line);
	}

	if (arcology.prosperity >= 60) {
		newLine("It is unusually prosperous for a vulnerable arcology.");
	} else if (arcology.prosperity <= 40) {
		newLine("It has little economic prosperity and is vulnerable.");
	}

	if (arcology.citizens > 0) {
		newLine("It has an unusually high ratio of citizens to sex slaves, increasing demand for sexual services.");
	} else if (arcology.citizens < 0) {
		newLine("It has an unusually low ratio of citizens to sex slaves, reducing demand for sexual services.");
	}

	let innerDiv = document.createElement("div");
	innerDiv.classList.add("indent");
	div.append(innerDiv);

	innerDiv.append("Its society ");
	if (arcology.FSProgress >= 50) {
		innerDiv.append("has advanced towards");
	} else if (arcology.FSProgress >= 30) {
		innerDiv.append("has devoted resources to");
	} else {
		innerDiv.append("has just begun to adopt");
	}
	innerDiv.append(" ");
	switch (arcology.fs) {
		case "FSSupremacist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Supremacy of the ${arcology.race} ${arcology.race !== "mixed race" ? "race" : ""}.`, ["intro", "question"]));
			break;
		case "FSSubjugationist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Subjugation of the ${arcology.race} ${arcology.race !== "mixed race" ? "race" : ""}.`, ["intro", "question"]));
			break;
		case "FSGenderRadicalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Gender Radicalism,`, ["intro", "question"]), " a movement that supports feminization of slavegirls with dicks.");
			break;
		case "FSGenderFundamentalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Gender Fundamentalism,`, ["intro", "question"]), " a reaction to modern libertinism that seeks to reinforce gender roles.");
			break;
		case "FSPaternalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Paternalism,`, ["intro", "question"]), " an optimistic strain of slavery that protects and improves slaves.");
			break;
		case "FSDegradationist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Degradationism,`, ["intro", "question"]), " an extreme branch of modern slavery that treats slaves as subhuman.");
			break;
		case "FSAssetExpansionist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Asset Expansionism,`, ["intro", "question"]), " a societal preoccupation with expansion of body parts, especially breasts.");
			break;
		case "FSSlimnessEnthusiast":
			innerDiv.append(App.UI.DOM.makeElement("span", `Slimness Enthusiasm,`, ["intro", "question"]), " an aesthetic movement that fetishizes the lithe female form.");
			break;
		case "FSTransformationFetishist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Transformation Fetishism,`, ["intro", "question"]), " a focus on implants and other kinds of surgical alteration.");
			break;
		case "FSBodyPurist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Body Purism,`, ["intro", "question"]), " a reaction to extreme surgical fetishism that prefers bodies grown biologically.");
			break;
		case "FSMaturityPreferentialist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Maturity Preferentialism,`, ["intro", "question"]), " an appetite for mature slaves based on MILF fetishism.");
			break;
		case "FSYouthPreferentialist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Youth Preferentialism,`, ["intro", "question"]), " which focuses on youth and virginity in slaves.");
			break;
		case "FSPastoralist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Pastoralism,`, ["intro", "question"]), " an appetite for products of the human body, especially milk.");
			break;
		case "FSPhysicalIdealist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Physical Idealism,`, ["intro", "question"]), " an aspirational movement which fetishizes muscle and physical fitness.");
			break;
		case "FSChattelReligionist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Chattel Religionism,`, ["intro", "question"]), " a religious revival in the context of modern slavery.");
			break;
		case "FSRomanRevivalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Roman Revivalism,`, ["intro", "question"]), " which seeks to recreate the glory that was ancient Rome.");
			innerDiv.append(App.UI.DOM.makeElement("div", "It has an established lingua franca: Latin."));
			break;
		case "FSNeoImperialist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Neo-Imperialism,`, ["intro", "question"]), " adopting old world customs and remodeling them under an absolutist Imperial fist.");
			break;
		case "FSAztecRevivalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Aztec Revivalism,`, ["intro", "question"]), " which aspires to reach the heights of the Aztec Empire at its peak.");
			innerDiv.append(App.UI.DOM.makeElement("div", "It has an established lingua franca: Nahuatl."));
			break;
		case "FSEgyptianRevivalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Egyptian Revivalism,`, ["intro", "question"]), " a movement to rebuild the monuments and greatness of ancient Egypt.");
			innerDiv.append(App.UI.DOM.makeElement("div", "It has an established lingua franca: Ancient Egyptian."));
			break;
		case "FSEdoRevivalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Edo Revivalism,`, ["intro", "question"]), " an insular movement with a focus on the cultural superiority of old Japan.");
			innerDiv.append(App.UI.DOM.makeElement("div", "It has an established lingua franca: Japanese."));
			break;
		case "FSArabianRevivalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Arabian Revivalism,`, ["intro", "question"]), " a melding of Arabian history and recent mythology of the Near East.");
			innerDiv.append(App.UI.DOM.makeElement("div", "It has an established lingua franca: Arabic."));
			break;
		case "FSChineseRevivalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Chinese Revivalism,`, ["intro", "question"]), " which modernizes the assumed superiority of the Middle Kingdom.");
			innerDiv.append(App.UI.DOM.makeElement("div", "It has an established lingua franca: Chinese."));
			break;
		case "FSAntebellumRevivalist":
			innerDiv.append(App.UI.DOM.makeElement("span", `Antebellum Revivalism,`, ["intro", "question"]), " which attempts to revive the romance and chivalry of the Antebellum South.");
			innerDiv.append(App.UI.DOM.makeElement("div", "It has an established lingua franca: English."));
			break;
		case "FSRepopulationFocus":
			innerDiv.append(App.UI.DOM.makeElement("span", `Repopulationism,`, ["intro", "question"]), " the belief that the key to humanity's survival is a child in every fertile womb.");
			break;
		case "FSRestart":
			innerDiv.append(App.UI.DOM.makeElement("span", `Eugenics,`, ["intro", "question"]), " the belief that the world's failings were caused by rampant breeding of the inferior, and as such, only society's best should reproduce.");
			break;
		case "FSHedonisticDecadence":
			innerDiv.append(App.UI.DOM.makeElement("span", `Decadent Hedonism,`, ["intro", "question"]), " a movement to embody life's pleasures, particularly eating and sex.");
			break;
		case "FSIntellectualDependency":
			innerDiv.append(App.UI.DOM.makeElement("span", `Intellectual Dependency,`, ["intro", "question"]), " an appetite for horny, stupid slaves based on bimbo fetishism.");
			break;
		case "FSSlaveProfessionalism":
			innerDiv.append(App.UI.DOM.makeElement("span", `Slave Professionalism,`, ["intro", "question"]), " a strain of slavery that seeks smart, skilled, elegant slaves to hone to perfection.");
			break;
		case "FSPetiteAdmiration":
			innerDiv.append(App.UI.DOM.makeElement("span", `Petite Admiration,`, ["intro", "question"]), " which prefers its slaves to stand heads and shoulders shorter than their masters.");
			break;
		case "FSStatuesqueGlorification":
			innerDiv.append(App.UI.DOM.makeElement("span", `Statuesque Glorification,`, ["intro", "question"]), " an obsession, both sexual and otherwise, over height.");
			break;
		default:
			innerDiv.append(App.UI.DOM.makeElement("span", `Multiculturalism,`, ["intro", "question"]), " a celebration of the total liberty that was the original purpose of the Free Cities.");
	}

	div.append(
		innerDiv,
		App.UI.DOM.makeElement("div", arcology.building.render(), ["intro"]),
	);

	return div;
};

App.Intro.getLanguageForArcology = function(arcology) {
	const language = App.Data.FutureSociety.records[arcology.fs].language;
	if (language) {
		return language;
	} else {
		switch (arcology.terrain) {
			case "South America":
				return "Spanish";
			case "Brazil":
				return "Portuguese";
			case "the Middle East":
			case "Africa": /* shouldn't that be portuguese, spanish or something? */
				return "Arabic";
			case "Asia":
				return "Chinese";
			case "Central Europe":
				return "German";
			case "Eastern Europe":
				return "Russian";
			case "Western Europe":
				return "English";
			case "Southern Europe":
				return "Italian";
			case "Scandinavia":
				return "Norwegian";
			case "Japan":
				return "Japanese";
			case "oceanic":
			case "North America":
			case "Australia":
			default:
				return "English";
		}
	}
};

App.Intro.getNameForArcology = function(arcology) {
	switch (arcology.fs) {
		case "FSSupremacist":
			switch (arcology.race) {
				case "white":
					return App.Data.ArcologyNames.SupremacistWhite.random();
				case "asian":
					return App.Data.ArcologyNames.SupremacistAsian.random();
				case "latina":
					return App.Data.ArcologyNames.SupremacistLatina.random();
				case "middle eastern":
					return App.Data.ArcologyNames.SupremacistMiddleEastern.random();
				case "black":
					return App.Data.ArcologyNames.SupremacistBlack.random();
				case "indo-aryan":
					return App.Data.ArcologyNames.SupremacistIndoAryan.random();
				case "pacific islander":
					return App.Data.ArcologyNames.SupremacistPacificIslander.random();
				case "malay":
					return App.Data.ArcologyNames.SupremacistMalay.random();
				case "amerindian":
					return App.Data.ArcologyNames.SupremacistAmerindian.random();
				case "southern european":
					return App.Data.ArcologyNames.SupremacistSouthernEuropean.random();
				case "semitic":
					return App.Data.ArcologyNames.SupremacistSemitic.random();
				default:
					return App.Data.ArcologyNames.SupremacistMixedRace.random();
			}
		case "FSSubjugationist":
			switch (arcology.race) {
				case "white":
					return App.Data.ArcologyNames.SubjugationistWhite.random();
				case "asian":
					return App.Data.ArcologyNames.SubjugationistAsian.random();
				case "latina":
					return App.Data.ArcologyNames.SubjugationistLatina.random();
				case "middle eastern":
					return App.Data.ArcologyNames.SubjugationistMiddleEastern.random();
				case "black":
					return App.Data.ArcologyNames.SubjugationistBlack.random();
				case "indo-aryan":
					return App.Data.ArcologyNames.SubjugationistIndoAryan.random();
				case "pacific islander":
					return App.Data.ArcologyNames.SubjugationistPacificIslander.random();
				case "malay":
					return App.Data.ArcologyNames.SubjugationistMalay.random();
				case "amerindian":
					return App.Data.ArcologyNames.SubjugationistAmerindian.random();
				case "southern european":
					return App.Data.ArcologyNames.SubjugationistSouthernEuropean.random();
				case "semitic":
					return App.Data.ArcologyNames.SubjugationistSemitic.random();
				default:
					return App.Data.ArcologyNames.SubjugationistMixedRace.random();
			}
		case "FSGenderRadicalist":
			return App.Data.ArcologyNames.GenderRadicalist.random();
		case "FSGenderFundamentalist":
			return App.Data.ArcologyNames.GenderFundamentalist.random();
		case "FSPaternalist":
			return App.Data.ArcologyNames.Paternalist.random();
		case "FSDegradationist":
			return App.Data.ArcologyNames.Degradationist.random();
		case "FSAssetExpansionist":
			return App.Data.ArcologyNames.AssetExpansionist.random();
		case "FSSlimnessEnthusiast":
			return App.Data.ArcologyNames.SlimnessEnthusiast.random();
		case "FSTransformationFetishist":
			return App.Data.ArcologyNames.TransformationFetishist.random();
		case "FSBodyPurist":
			return App.Data.ArcologyNames.BodyPurist.random();
		case "FSMaturityPreferentialist":
			return App.Data.ArcologyNames.MaturityPreferentialist.random();
		case "FSYouthPreferentialist":
			if (V.pedo_mode === 1 || V.minimumSlaveAge < 6) {
				return App.Data.ArcologyNames.YouthPreferentialistLow.random();
			} else if (V.minimumSlaveAge < 14) {
				return App.Data.ArcologyNames.YouthPreferentialist.concat(App.Data.ArcologyNames.YouthPreferentialistLow).random();
			} else {
				return App.Data.ArcologyNames.YouthPreferentialist.random();
			}
		case "FSPastoralist":
			return App.Data.ArcologyNames.Pastoralist.random();
		case "FSPhysicalIdealist":
			return App.Data.ArcologyNames.PhysicalIdealist.random();
		case "FSChattelReligionist":
			return App.Data.ArcologyNames.ChattelReligionist.random();
		case "FSRomanRevivalist":
			return App.Data.ArcologyNames.RomanRevivalist.random();
		case "FSNeoImperialist":
			return App.Data.ArcologyNames.NeoImperialist.random();
		case "FSAztecRevivalist":
			return App.Data.ArcologyNames.AztecRevivalist.random();
		case "FSEgyptianRevivalist":
			return App.Data.ArcologyNames.EgyptianRevivalist.random();
		case "FSEdoRevivalist":
			return App.Data.ArcologyNames.EdoRevivalist.random();
		case "FSArabianRevivalist":
			return App.Data.ArcologyNames.ArabianRevivalist.random();
		case "FSChineseRevivalist":
			return App.Data.ArcologyNames.ChineseRevivalist.random();
		case "FSAntebellumRevivalist":
			return App.Data.ArcologyNames.AntebellumRevivalist.random();
		case "FSRepopulationFocus":
			return App.Data.ArcologyNames.Repopulationist.random();
		case "FSRestart":
			return App.Data.ArcologyNames.Eugenics.random();
		case "FSHedonisticDecadence":
			return App.Data.ArcologyNames.HedonisticDecadence.random();
		case "FSIntellectualDependency":
			return App.Data.ArcologyNames.IntellectualDependency.random();
		case "FSSlaveProfessionalism":
			return App.Data.ArcologyNames.SlaveProfessionalism.random();
		case "FSPetiteAdmiration":
			return App.Data.ArcologyNames.PetiteAdmiration.random();
		case "FSStatuesqueGlorification":
			return App.Data.ArcologyNames.StatuesqueGlorification.random();
		default:
			return "Arcology X-4";
	}
};

/** @param {boolean} inIntro */
App.Intro.generateEstablishedArcologies = function(inIntro = false) {
	/* setup */
	const fsAllowed = {
		FSGenderRadicalist: () => V.seeDicks !== 0,
		FSGenderFundamentalist: () => V.seeDicks !== 100,
		FSDegradationist: () => V.seeExtreme !== 0
	};
	const allowedFS = App.Data.FutureSociety.playerFSNames.filter(fs => !(fs in fsAllowed) || fsAllowed[fs]());

	let targets = 4;
	if (V.PC.career === "arcology owner") {
		targets += 2;
	}

	/* generation */
	const div = document.createElement("div");
	for (let i = 0; i < targets; i++) {
		div.append(arcologyCard());
	}
	return div;

	function arcologyCard() {
		const arcology = generateArcology();
		const div = App.Intro.descriptionDivForArcology(arcology, acceptArcology, inIntro);

		if (!inIntro) {
			// for some reason we put the acquisition link at the bottom instead of the top when moving arcologies
			const sectionPrice = {
				"spire": 2_500_000,
				"penthouse": 10_000_000,
				"shops": 1_000_000,
				"fountain": 5_000_000,
				"apartments": 500_000,
				"markets": 250_000,
				"ravine-markets": 250_000,
				"manufacturing": 100_000,
			};
			const rows = (/** @type {App.Arcology.Section} */ section) => section.rows
				.reduce((acc, cur) => acc + cur.length * sectionPrice[section.id], 0);
			const price = arcology.building.sections.reduce((acc, cur) => acc + rows(cur), 10_000_000) || 25_000_000; // base price of ¤10,000,000

			div.append(App.UI.DOM.makeElement("div", makePurchase(`Purchase ${arcology.name}`, price, "capEx", {
				handler: () => {
					acceptArcology();
					updatePlayerArcology();
					Engine.play("Main");
				},
				prereqs: [
					[
						V.rival.state < 2 || V.rival.state > 3 || App.Events.effectiveWeek() <= 72,
						`Your inter-arcology war is preventing you from leaving ${V.arcologies[0].name}.`
					],
					[
						App.Events.effectiveWeek() < 58 || V.daughtersVictory !== 1,
						`You cannot leave ${V.arcologies[0].name} behind while the Daughters of Liberty are still a threat.`
					],
				],
			}), ['center']));
		}

		return div;

		function acceptArcology() {
			V.targetArcology = arcology;
			V.terrain = arcology.terrain;
			V.continent = arcology.continent;
			V.language = arcology.language;
			V.building = arcology.building;

			arcology.apply();
		}

		function updatePlayerArcology() {
			V.arcologies[0].name = arcology.name;
			V.arcologies[0].weeks = 1;

			V.weatherCladding = 0;
			V.rep = 0;
			if (V.secExpEnabled && V.SecExp.core) {
				V.SecExp.core.authority = 0;
			}

			updateFS();
		}

		function updateFS() {
			const {fs} = arcology;

			App.Data.FutureSociety.fsNames.forEach(f => {
				FutureSocieties.remove(f);
			});

			if (fs) {
				V.arcologies[0][fs] = arcology.FSProgress;
			}
		}
	}

	function generateArcology() {
		const arcology = {};
		arcology.fs = getFS();
		arcology.name = App.Intro.getNameForArcology(arcology);
		arcology.FSProgress = either(10, 30, 50);
		arcology.prosperity = either(40, 50, 60);
		arcology.citizens = random(-1, 1);
		arcology.terrain = App.Data.Arcology.Terrain.random();
		arcology.continent = App.Data.Arcology.Continents.random();
		arcology.language = App.Intro.getLanguageForArcology(arcology);

		const env = {terrain: arcology.terrain, established: true, fs: arcology.fs};
		const preset = App.Arcology.randomPreset(env).construct(env);
		arcology.building = preset.building;
		arcology.apply = preset.apply;

		return arcology;

		function getFS() {
			const type = allowedFS.pluck();
			if (type === "FSSupremacist" || type === "FSSubjugationist") {
				arcology.race = App.Data.Slave.Races.random();
			}
			return type;
		}
	}
};
