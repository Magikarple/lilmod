globalThis.FutureSocieties = (function() {
	/** @type {Map<FC.FutureSocietyDeco, FC.FutureSociety>} */
	const DecoToFSMap = new Map();
	for (const [fsName, details] of Object.entries(App.Data.FutureSociety.records)) {
		if (details.deco) {
			// @ts-ignore - Object.entries loses type information, apparently intentionally
			DecoToFSMap.set(details.deco, fsName);
		}
	}

	return {
		activeFSes: activeFSes,
		activeCount: activeCount,
		applyBroadProgress: applyBroadProgress,
		availCredits: calcFSCredits,
		influenceSources: influenceSources,
		decorationName: decorationName,
		diplomaticFSes: diplomaticFSes,
		displayName: displayName,
		displayAdj: displayAdj,
		decay: decayFSes,
		overflowToInfluence: overflowToInfluence,
		remove: removeFS,
		validAdoptions: validAdoptions,
		DecorationCleanup: DecorationCleanup,
		DecorationBonus: FSDecorationBonus,
		Change: FSChange,
		HighestDecoration: FSHighestDecoration,
		arcSupport: arcSupport,
		researchAvailable,
		isActive,
		policyActive,
		advance,
		humanVector,
	};

	/** get the list of FSes active for a particular arcology
	 * @param {FC.ArcologyState} arcology
	 * @returns {FC.FutureSociety[]}
	 */
	function activeFSes(arcology) {
		return App.Data.FutureSociety.fsNames.filter((fs) => arcology[fs] !== null);
	}

	/** call as FutureSocieties.activeCount(arcology)
	 * @param {FC.ArcologyState} arcology
	 * @returns {number}
	 */
	function activeCount(arcology) {
		return activeFSes(arcology).length;
	}

	/** call as FutureSocieties.applyBroadProgress(arcologyID, progress)
	 * @param {number} arcologyID
	 * @param {number} progress
	 */
	function applyBroadProgress(arcologyID, progress) {
		const arcology = V.arcologies[arcologyID];
		for (const fs of activeFSes(arcology)) {
			if (fs !== "FSNull") { // does not progress this way
				arcology[fs] += progress;
			}
		}
	}

	/** converts excess progress into influence bonus
	 * call as FutureSocieties.overflowToInfluence(arcologyID)
	 * @param {number} arcologyID
	 */
	function overflowToInfluence(arcologyID) {
		const arcology = V.arcologies[arcologyID];
		for (const fs of activeFSes(arcology)) {
			if (fs !== "FSNull") { // no conventional progress
				if (arcology[fs] > V.FSLockinLevel) {
					arcology.influenceBonus += arcology[fs] - V.FSLockinLevel;
					arcology[fs] = V.FSLockinLevel;
				}
			}
		}
	}

	/** returns an array of FSes which the arcology has developed enough to influence others
	 * call as FutureSocieties.influenceSources(arcologyID)
	 * @param {number} arcologyID
	 * @returns {FC.FutureSociety[]}
	 */
	function influenceSources(arcologyID) {
		const arcology = V.arcologies[arcologyID];
		return activeFSes(arcology).reduce((acc, fs) => {
			if (fs !== 'FSNull' && arcology[fs] > 60) { acc.push(fs); }
			return acc;
		}, []);
	}

	/** determines whether two named FSes are naturally conflicting or not
	 * @param {FC.FutureSociety} left FS
	 * @param {FC.FutureSociety} right FS
	 * @returns {boolean}
	 */
	function conflictingFSes(left, right) {
		if (left !== right) { // identical FSes are not opposed
			for (const group of App.Data.FutureSociety.mutexGroups) {
				if (group.includesAll(left, right)) {
					return true; // but any other FS in the mutex group is
				}
			}
		}
		return false;
	}

	/** returns an array of all of the FSes that would be valid for this arcology to adopt right now
	 * @param {number} arcID
	 * @returns {FC.FutureSociety[]}
	 */
	function validAdoptions(arcID) {
		const arcology = V.arcologies[arcID];
		const societies = Array.from(arcID !== 0 ? App.Data.FutureSociety.fsNames : App.Data.FutureSociety.playerFSNames);
		const arcFSes = activeFSes(arcology);

		// apply game rules
		if (!V.seeIncest) {
			societies.delete("FSIncestFetishist");
		}
		if (!V.seePreg) {
			societies.delete("FSRepopulationFocus");
		}

		// FSes already adopted by the arcology are invalid
		societies.deleteWith(fs => arcFSes.includes(fs));

		// FSes that conflict with FSes adopted by the arcology are invalid
		societies.deleteWith(fs1 => arcFSes.some(fs2 => conflictingFSes(fs1, fs2)));

		// if the government is loyal to you, FSes that conflict with FSes adopted by the player are invalid
		if (arcology.government === "your agent" || arcology.government === "your trustees") {
			const playerFSes = activeFSes(V.arcologies[0]);
			societies.deleteWith(fs1 => playerFSes.some(fs2 => conflictingFSes(fs1, fs2)));
		}

		return societies;
	}

	/**
	 * Returns the set of shared FSes between two arcologies, and the set of conflicts between pairs of FSes between the arcologies.
	 * Relatively expensive, try not to call frequently.
	 * Call as FutureSocieties.diplomaticFSes(arc1, arc2)
	 * @param {FC.ArcologyState} arc1
	 * @param {FC.ArcologyState} arc2
	 * @returns {{shared: FC.FutureSociety[], conflicting: FC.FutureSociety[][]}}
	 */
	function diplomaticFSes(arc1, arc2) {
		/** @type {FC.FutureSociety[]} */
		const shared = [];
		/** @type {FC.FutureSociety[][]} */
		const conflicting = [];
		const arc1FSes = activeFSes(arc1);
		const arc2FSes = activeFSes(arc2);
		// find ordinary shared and conflicting FSes
		for (const fs1 of arc1FSes) {
			for (const fs2 of arc2FSes) {
				if (fs1 === fs2) {
					shared.push(fs1);
				} else if (conflictingFSes(fs1, fs2)) {
					conflicting.push([fs1, fs2]);
				}
			}
		}
		// special cases: racial FSes might be conflicting even when shared
		if (shared.includes("FSSupremacist")) {
			// a different race is supreme
			if (arc1.FSSupremacistRace !== arc2.FSSupremacistRace) {
				shared.delete("FSSupremacist");
				conflicting.push(["FSSupremacist", "FSSupremacist"]);
			}
			// subjugating the supreme race
			if (arc2FSes.includes("FSSubjugationist") && arc2.FSSubjugationistRace === arc1.FSSupremacistRace) {
				shared.delete("FSSupremacist");
				conflicting.push(["FSSupremacist", "FSSubjugationist"]);
			}
		}
		if (shared.includes("FSSubjugationist")) {
			// subjugating a different race
			if (arc1.FSSubjugationistRace !== arc2.FSSubjugationistRace) {
				shared.delete("FSSubjugationist");
				conflicting.push(["FSSubjugationist", "FSSubjugationist"]);
			}
			// believe the subjugated race is supreme
			if (arc2FSes.includes("FSSupremacist") && arc2.FSSupremacistRace === arc1.FSSubjugationistRace) {
				shared.delete("FSSubjugationist");
				conflicting.push(["FSSubjugationist", "FSSupremacist"]);
			}
		}
		return {shared, conflicting};
	}

	/** returns the future society display name (typically an "ism") for the given property
	 * @param {FC.FutureSociety} FSProp
	 * @returns {FC.FutureSocietyNoun}
	 */
	function displayName(FSProp) {
		return App.Data.FutureSociety.records[FSProp].noun;
	}

	/** returns the future society adjective (typically an "ist") for the given property
	 * @param {FC.FutureSociety} FSProp
	 * @returns {FC.FutureSocietyAdj}
	 */
	function displayAdj(FSProp) {
		return App.Data.FutureSociety.records[FSProp].adj;
	}

	/** returns the future society decoration name (for use in decoration properties) for the given FS property
	 * @param {FC.FutureSociety} FSProp
	 * @returns {FC.FutureSocietyDeco}
	 */
	function decorationName(FSProp) {
		return App.Data.FutureSociety.records[FSProp].deco;
	}

	/** decays all the FSes adopted by a particular arcology (for example, because of government instability)
	 * call as FutureSocieties.decay(arcologyID)
	 * @param {number} arcologyID
	 * @returns {FC.FutureSociety[]} FSes which purged completely
	 */
	function decayFSes(arcologyID) {
		const arc = V.arcologies[arcologyID];
		const FSes = activeFSes(arc);
		/** @type {FC.FutureSociety[]} */
		let purged = [];
		for (const fs of FSes) {
			if (fs !== "FSNull") { // exempt for some reason?
				if (arc[fs] < jsRandom(10, 150)) {
					purged.push(fs);
					arc[fs] = null;
				} else {
					arc[fs] -= 10;
				}
			}
		}
		return purged;
	}

	/** Remove an FS and all associated attributes from an arcology
	 * call as FutureSocieties.remove(FS)
	 * @param {FC.FutureSociety} FS (e.g. "FSPaternalist" or "FSDegradationist")
	 */
	function removeFS(FS) {
		const arcology = V.arcologies[0];
		const FSDecoration = `${FS}Decoration`;
		const FSSMR = `${FS}SMR`;
		let FSLaw = `${FS}Law`;
		if (arcology[FS] === undefined) {
			// eslint-disable-next-line no-console
			console.log(`ERROR: bad FS reference, $arcologies[0].${FS} not defined`);
			return;
		}

		if (FS === "FSSupremacist" || FS === "FSSubjugationist") { FSLaw += "ME"; }
		if (FS !== "FSNull") { arcology[FSDecoration] = 20; }
		arcology[FS] = null;
		switch (FS) {
			case "FSPaternalist":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				if (V?.SecExp?.edicts) {
					V.SecExp.edicts.slaveWatch = 0;
				}
				break;
			case "FSDegradationist":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				if (V?.SecExp?.edicts) {
					V.SecExp.edicts.defense.liveTargets = 0;
				}
				break;
			case "FSGenderRadicalist":
				arcology.FSGenderRadicalistLawBeauty = 0;
				arcology.FSGenderRadicalistLawFuta = 0;
				break;
			case "FSGenderFundamentalist":
				arcology.FSGenderFundamentalistLawBeauty = 0;
				arcology.FSGenderFundamentalistLawBimbo = 0;
				arcology.FSGenderFundamentalistSMR = 0;
				break;
			case "FSSupremacist":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				if (V?.SecExp?.edicts) {
					V.SecExp.edicts.defense.noSubhumansInArmy = 0;
				}
				break;
			case "FSTransformationFetishist":
			case "FSAssetExpansionist":
				arcology[FSSMR] = 0;
				break;
			case "FSSlimnessEnthusiast":
				arcology.FSSlimnessEnthusiastLaw = 0;
				arcology.FSSlimnessEnthusiastFoodLaw = 0;
				arcology.FSSlimnessEnthusiastSMR = 0;
				break;
			case "FSPhysicalIdealist":
				arcology.FSPhysicalIdealistLaw = 0;
				arcology.FSPhysicalIdealistSMR = 0;
				arcology.FSPhysicalIdealistStrongFat = 0;
				if (V?.SecExp?.edicts) {
					V.SecExp.edicts.defense.martialSchool = 0;
				}
				break;
			case "FSHedonisticDecadence":
				arcology.FSHedonisticDecadenceLaw = 0;
				arcology.FSHedonisticDecadenceLaw2 = 0;
				arcology.FSHedonisticDecadenceSMR = 0;
				arcology.FSHedonisticDecadenceStrongFat = 0;
				break;
			case "FSChattelReligionist":
				arcology.FSChattelReligionistLaw = 0;
				arcology.FSChattelReligionistLaw2 = 0;
				arcology.FSChattelReligionistSMR = 0;
				arcology.FSChattelReligionistCreed = 0;
				if (V?.SecExp?.edicts) {
					V.SecExp.edicts.subsidyChurch = 0;
				}
				break;
			case "FSRepopulationFocus":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				V.universalRulesChildrenBecomeBreeders = 0;
				if (V?.SecExp?.edicts) {
					V.SecExp.edicts.defense.pregExemption = 0;
				}
				break;
			case "FSRestart":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				arcology.FSRestartResearch = 0; // not really research at all; reset breeding program
				if (V?.SecExp?.edicts) {
					V.SecExp.edicts.defense.eliteOfficers = 0;
				}
				V.propOutcome = 0;
				V.failedElite = 0;
				V.playerBred = 0;
				break;
			case "FSIntellectualDependency":
				arcology.FSIntellectualDependencyLaw = 0;
				arcology.FSIntellectualDependencyLawBeauty = 0;
				arcology.FSIntellectualDependencySMR = 0;
				break;
			case "FSPetiteAdmiration":
				arcology.FSPetiteAdmirationLaw = 0;
				arcology.FSPetiteAdmirationLaw2 = 0;
				arcology.FSPetiteAdmirationSMR = 0;
				break;
			case "FSStatuesqueGlorification":
				arcology.FSStatuesqueGlorificationLaw = 0;
				arcology.FSStatuesqueGlorificationLaw2 = 0;
				arcology.FSStatuesqueGlorificationSMR = 0;
				break;
			case "FSBodyPurist":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				arcology.FSBodyPuristCatLaw = 0;
				break;
			case "FSNeoImperialist":
				arcology.FSNeoImperialistLaw1 = 0;
				arcology.FSNeoImperialistLaw2 = 0;
				arcology.FSNeoImperialistSMR = 0;
				break;
			case "FSAntebellumRevivalist":
				arcology.FSAntebellumRevivalistLaw1 = 0;
				arcology.FSAntebellumRevivalistLaw2 = 0;
				arcology.FSAntebellumRevivalistSMR = 0;
				break;
			case "FSNull":
				break;
			default: // all others have one law and one SMR
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				break;
		}

		DecorationCleanup();

		// Clean up assistant
		if (
			(V.assistant.fsAppearance === App.Data.FutureSociety.records[FS].adj.toLowerCase()) ||
			(V.assistant.fsAppearance === App.Data.FutureSociety.records[FS].noun.toLowerCase()) ||
			(FS === "FSHedonisticDecadence" && V.assistant.fsAppearance === "hedonistic decadence") ||
			(FS === "FSNeoImperialist" && V.assistant.fsAppearance === "neoimperialist")
		) {
			V.assistant.fsAppearance = "default";
		}
	}

	/** Calculate the number of FS credits that the player still has available (unspent)
	 * Call as FutureSocieties.availCredits()
	 * @returns {number}
	 */
	function calcFSCredits() {
		const arcology = V.arcologies[0];
		let activeFS = activeCount(arcology);
		if (arcology.FSNull > 0) { // multiculturalism is accounted for separately
			activeFS -= 1; // already counted once, remove that one and count investments instead
			if (V.FSCreditCount === 4) {
				activeFS += arcology.FSNull / 25;
			} else if (V.FSCreditCount === 6) {
				activeFS += arcology.FSNull / 17;
			} else if (V.FSCreditCount === 7) {
				activeFS += arcology.FSNull / 15;
			} else {
				activeFS += arcology.FSNull / 20;
			}
		}
		return Math.max(Math.trunc(V.FSGotRepCredits - activeFS), 0);
	}

	/* call as FutureSocieties.DecorationCleanup() */
	function DecorationCleanup() {
		for (const facility of Object.values(App.Entity.facilities).filter(f => f.established && f.isDecorated)) {
			ValidateFacilityDecoration(facility);
		}
	}

	/** helper function, not callable externally
	 * @param {App.Entity.Facilities.Facility} facility
	 */
	function ValidateFacilityDecoration(facility) {
		// Backwards compatibility, do not remove
		// @ts-ignore BC
		if (facility.decoration === "Hedonism" || facility.decoration === "Hedonistic Decadence") {
			facility.decoration = "Hedonistic";
		// @ts-ignore BC
		} else if (facility.decoration === "Repopulation Focus") {
			facility.decoration = "Repopulationist";
		// @ts-ignore BC
		} else if (facility.decoration === "Neo Imperialist") {
			facility.decoration = "Neo-Imperialist";
		}

		const activeFS = DecoToFSMap.get(facility.decoration); // gets the property name

		if (facility.decoration === "standard") {
			// nothing to do
		} else if (activeFS === undefined) {
			// eslint-disable-next-line no-console
			console.error(`Error: ${facility.nameCaps} decoration is ${facility.decoration}`);
			facility.decoration = "standard";
		} else if (!Number.isFinite(V.arcologies[0][activeFS])) {
			if (FutureSocieties.isActive(activeFS)) {
				// eslint-disable-next-line no-console
				console.error(`Error: $arcologies[0].${activeFS} is ${V.arcologies[0][activeFS]}`);
			}
			facility.decoration = "standard";
		}
	}

	/** Apply the decoration bonus for a slave working in a facility to the FS
	 * call as FutureSocieties.DecorationBonus()
	 * @param {FC.FutureSocietyDeco} decoration - not quoted, just pass it straight in
	 * @param {number} magnitude - will be multiplied by V.FSSingleSlaveRep
	 */
	function FSDecorationBonus(decoration, magnitude) {
		if (decoration === "standard") {
			return; // no bonus
		}

		const FSProp = DecoToFSMap.get(decoration); // gets the property name
		const arc = V.arcologies[0];

		if (FSProp && Number.isFinite(arc[FSProp])) {
			const n = arc[FSProp];
			arc[FSProp] = Math.clamp(n + magnitude * V.FSSingleSlaveRep, 0, 100);
		}
	}

	/** call as FutureSocieties.Change()
	 * @param {FC.FutureSociety|FC.FutureSocietyDeco} FSString either decoration or FS property
	 * @param {number} magnitude size of change
	 * @param {number} [bonusMultiplier=1] multiplier to be applied to FS change (but NOT to rep change)
	 * @returns {number} reputation change value (for recordkeeping)
	 */
	function FSChange(FSString, magnitude, bonusMultiplier = 1) {
		const arcology = V.arcologies[0];
		// @ts-ignore - could be a decoration string; just try to convert it to a property name, and if we can't then assume it's a property name and use it as-is
		const activeFS = DecoToFSMap.get(FSString) || FSString;

		if (Number.isFinite(arcology[activeFS])) {
			let repChange = magnitude * V.FSSingleSlaveRep * (Math.clamp(arcology[activeFS], 0, 100) / V.FSLockinLevel);
			if (magnitude < 0) {
				repChange /= 3; // Reducing the reputation impact of slaves that are not adhering to societal ideals properly
			}
			repX(repChange, 'futureSocieties');
			arcology[activeFS] += 0.05 * magnitude * V.FSSingleSlaveRep * bonusMultiplier;
			return repChange;
		} else {
			console.log(`Attempted to change unset FS ${activeFS}`);
			return 0;
		}
	}

	/**
	 * Returns the highest decoration level of active future societies, call as FutureSocieties.HighestDecoration()
	 * @returns {number}
	 */
	function FSHighestDecoration() {
		const arcology = V.arcologies[0];
		const decorationList = App.Data.FutureSociety.playerFSNames.map(FS => `${FS}Decoration`);
		let level = 20; // All decorations start at 20

		for (const deco of decorationList) {
			if (arcology[deco] > level) {
				level = arcology[deco];
			}
		}
		return level;
	}

	/**
	 *
	 * @param {FC.FutureSociety} FS
	 * @param {FC.ArcologyState} [arc]
	 */
	function arcSupport(FS, arc = V.arcologies[0]) {
		/**
		 * @param {FC.FutureSociety} fs
		 * @param {FC.ArcologyState} arc
		 * @returns {string[]}
		 */
		const arcSupportTexts = (fs, arc) => {
			switch (fs) {
				case "FSSupremacist": return [
					`${arc.name} believes implicitly in ${arc.FSSupremacistRace} superiority.`,
					`${arc.name} agrees strongly with ${arc.FSSupremacistRace} superiority.`,
					`${arc.name} is sympathetic to ${arc.FSSupremacistRace} superiority.`,
					`${arc.name} is unconvinced of ${arc.FSSupremacistRace} superiority.`
				];
				case "FSSubjugationist": return [
					`${arc.name} believes implicitly in the inferiority of ${arc.FSSubjugationistRace} people.`,
					`${arc.name} agrees strongly with the inferiority of ${arc.FSSubjugationistRace} people.`,
					`${arc.name} is sympathetic to the inferiority of ${arc.FSSubjugationistRace} people.`,
					`${arc.name} is unconvinced of the inferiority of ${arc.FSSubjugationistRace} people.`
				];
				case "FSRepopulationFocus": return [
					`${arc.name} believes implicitly that all women should be pregnant.`,
					`${arc.name} agrees strongly that all women should be pregnant.`,
					`${arc.name} is sympathetic to the idea that all women should be pregnant.`,
					`${arc.name} is unconvinced that all women should be pregnant.`,

				];
				case "FSRestart": return [
					`${arc.name} believes implicitly that only the elite should reproduce.`,
					`${arc.name} agrees strongly that only the elite should reproduce.`,
					`${arc.name} is sympathetic to the idea only the elite should reproduce.`,
					`${arc.name} is unconvinced that only the elite should reproduce.`
				];
				case "FSIntellectualDependency": return [
					`${arc.name} believes implicitly that all slaves should be mentally dependant on their owner.`,
					`${arc.name} agrees strongly that all slaves should be bimbos.`,
					`${arc.name} is sympathetic to the idea that slaves should be dumb and horny.`,
					`${arc.name} is unconvinced that all slaves should be morons.`
				];
				case "FSSlaveProfessionalism": return [
					`${arc.name} believes implicitly that slaves should be masters of the sexual arts.`,
					`${arc.name} agrees strongly with slavery as a profession.`,
					`${arc.name} is sympathetic to the notion of slavery as a profession.`,
					`${arc.name} is unconvinced that slaves should be highly intelligent.`
				];
				case "FSGenderRadicalist": return [
					`${arc.name} believes implicitly in the need to redefine gender around power.`,
					`${arc.name} agrees strongly with the need to redefine gender around power.`,
					`${arc.name} is sympathetic to the need to redefine gender around power.`,
					`${arc.name} is unconvinced of the need to redefine gender around power.`
				];
				case "FSGenderFundamentalist": return [
					`${arc.name} believes implicitly in the need to preserve traditional gender roles.`,
					`${arc.name} agrees strongly with the need to preserve traditional gender roles.`,
					`${arc.name} is sympathetic to the need to preserve traditional gender roles.`,
					`${arc.name} is unconvinced of the need to preserve traditional gender roles.`
				];
				case "FSPaternalist": return [
					`${arc.name} believes implicitly in the vision of a well-bred race of slaves.`,
					`${arc.name} agrees strongly with the vision of a well-bred race of slaves.`,
					`${arc.name} is sympathetic to the vision of a well-bred race of slaves.`,
					`${arc.name} is unconvinced of the vision of a well-bred race of slaves.`
				];
				case "FSDegradationist": return [
					`${arc.name} believes implicitly that slaves are not human and should be thoroughly degraded.`,
					`${arc.name} agrees strongly with the idea that slaves are not human and should be thoroughly degraded.`,
					`${arc.name} is sympathetic to the proposition that slaves are not human and should be thoroughly degraded.`,
					`${arc.name} is unconvinced that slaves are not human and should be thoroughly degraded.`
				];
				case "FSBodyPurist": return [
					`${arc.name} believes implicitly in the unattractive nature of implants.`,
					`${arc.name} agrees strongly with the unattractive nature of implants.`,
					`${arc.name} is sympathetic to the unattractive nature of implants.`,
					`${arc.name} is unconvinced of the unattractive nature of implants.`
				];
				case "FSTransformationFetishist": return [
					`${arc.name} passionately fetishizes implants.`,
					`${arc.name} strongly fetishizes implants.`,
					`${arc.name} fetishizes implants.`,
					`${arc.name} is beginning to fetishize implants.`
				];
				case "FSMaturityPreferentialist": return [
					`${arc.name} is passionately enthusiastic for older ladies.`,
					`${arc.name} is very enthusiastic for older ladies.`,
					`${arc.name} is enthusiastic for older ladies.`,
					`${arc.name} is beginning to be enthusiastic for older ladies.`
				];
				case "FSYouthPreferentialist": return [
					`${arc.name} is passionately enthusiastic for young women.`,
					`${arc.name} is very enthusiastic for young women.`,
					`${arc.name} is enthusiastic for young women.`,
					`${arc.name} is beginning to be enthusiastic for young women.`
				];
				case "FSPetiteAdmiration": return [
					`${arc.name} is passionately enthusiastic for short slaves.`,
					`${arc.name} is very enthusiastic for short slaves.`,
					`${arc.name} is enthusiastic for short slaves.`,
					`${arc.name} is beginning to be enthusiastic for short slaves.`
				];
				case "FSStatuesqueGlorification": return [
					`${arc.name} believes implicitly that the tall are superior.`,
					`${arc.name} agrees strongly with the idea that the tall are superior.`,
					`${arc.name} is sympathetic to the idea that the tall are superior.`,
					`${arc.name} is unconvinced that the tall are superior.`
				];
				case "FSSlimnessEnthusiast": return [
					`${arc.name} is passionately enthusiastic about slim slaves with girlish figures.`,
					`${arc.name} is very enthusiastic about slim slaves with girlish figures.`,
					`${arc.name} is enthusiastic about slim slaves with girlish figures.`,
					`${arc.name} is beginning to be enthusiastic about slim slaves with girlish figures.`
				];
				case "FSAssetExpansionist": return [
					`${arc.name} believes implicitly that all tits and asses should be bigger.`,
					`${arc.name} agrees strongly with the idea that all tits and asses should be bigger.`,
					`${arc.name} is sympathetic to the idea that all tits and asses should be bigger.`,
					`${arc.name} is unconvinced that all tits and asses should be bigger.`
				];
				case "FSPastoralist": return [
					`${arc.name} believes implicitly that slaves should be milked.`,
					`${arc.name} agrees strongly with the idea that slaves should be milked.`,
					`${arc.name} is sympathetic to the idea that slaves should be milked.`,
					`${arc.name} is unconvinced that slaves should be milked.`
				];
				case "FSPhysicalIdealist": return [
					`${arc.name} believes implicitly that all slaves should be tall and strong.`,
					`${arc.name} agrees strongly with the idea that all slaves should be tall and strong.`,
					`${arc.name} is sympathetic to the idea that all slaves should be tall and strong.`,
					`${arc.name} is unconvinced that all slaves should be tall and strong.`
				];
				case "FSHedonisticDecadence": return [
					`${arc.name} believes implicitly that all slaves should be soft and laid-back.`,
					`${arc.name} agrees strongly with the idea that all slaves should be soft and laid-back.`,
					`${arc.name} is sympathetic to the idea that all slaves should be soft and laid-back.`,
					`${arc.name} is unconvinced that all slaves should be soft and laid-back.`
				];
				case "FSChattelReligionist": return [
					`${arc.name} believes implicitly in a version of religion that emphasizes slaveholding traditions.`,
					`${arc.name} agrees strongly with a version of religion that emphasizes slaveholding traditions.`,
					`${arc.name} is sympathetic to a version of religion that emphasizes slaveholding traditions.`,
					`${arc.name} is unconvinced of a version of religion that emphasizes slaveholding traditions.`
				];
				case "FSNull": return [
					`${arc.name} is committed to affording its citizens absolute cultural freedom.`,
					`${arc.name} is committed to affording its citizens great cultural freedom.`,
					`${arc.name} is committed to affording its citizens considerable cultural freedom.`,
					`${arc.name} is committed to affording its citizens basic cultural freedom.`
				];
				case "FSRomanRevivalist": return [
					`${arc.name} believes implicitly that it is the new Rome.`,
					`${arc.name} agrees strongly with your project to build the new Rome.`,
					`${arc.name} is sympathetic to your project to build the new Rome.`,
					`${arc.name} is unconvinced of the wisdom of your project to build the new Rome.`
				];
				case "FSNeoImperialist": return [
					`${arc.name} believes implicitly that your arcology is truly a new Imperial Society.`,
					`${arc.name} agrees strongly with your project to build a new Imperial Society.`,
					`${arc.name} is sympathetic to your project to build a new Imperial Society.`,
					`${arc.name} is unconvinced of the wisdom of your project to build a new Imperial Society.`
				];
				case "FSAntebellumRevivalist": return [
					`${arc.name} believes implicitly that your arcology is truly a new Antebellum South.`,
					`${arc.name} agrees strongly with your project to build a new Antebellum South.`,
					`${arc.name} is sympathetic to your project to build a new Antebellum South.`,
					`${arc.name} is unconvinced of the wisdom of your project to build a new Antebellum South.`
				];
				case "FSAztecRevivalist": return [
					`${arc.name} believes implicitly that it is the new Aztec Empire.`,
					`${arc.name} agrees strongly with your project to build the new Aztec Empire.`,
					`${arc.name} is sympathetic to your project to build the new Aztec Empire.`,
					`${arc.name} is unconvinced of the wisdom of your project to build the new Aztec Empire.`
				];
				case "FSEgyptianRevivalist": return [
					`${arc.name} believes implicitly that it is the land of the Pharaohs, reborn.`,
					`${arc.name} agrees strongly with your project to build a new land of the Pharaohs.`,
					`${arc.name} is sympathetic to your project to build a new land of the Pharaohs.`,
					`${arc.name} is unconvinced of the wisdom of your project to build a new land of the Pharaohs.`
				];
				case "FSEdoRevivalist": return [
					`${arc.name} believes implicitly that it is the land of the Shogun, reborn.`,
					`${arc.name} agrees strongly with your project to build a new Edo Japan.`,
					`${arc.name} is sympathetic to your project to build a new Edo Japan.`,
					`${arc.name} is unconvinced of the wisdom of your project to build a new Edo Japan.`
				];
				case "FSArabianRevivalist": return [
					`${arc.name} believes implicitly that it is ancient Baghdad reborn.`,
					`${arc.name} agrees strongly with your project to build a new Sultanate.`,
					`${arc.name} is sympathetic to your project to build a new Sultanate.`,
					`${arc.name} is unconvinced of the wisdom of your project to build a new Sultanate.`
				];
				case "FSChineseRevivalist": return [
					`${arc.name} believes implicitly that possesses the Mandate of Heaven.`,
					`${arc.name} agrees strongly with your pursuit of the Mandate of Heaven.`,
					`${arc.name} is sympathetic to your pursuit of the Mandate of Heaven.`,
					`${arc.name} is unconvinced of the wisdom of your pursuit of the Mandate of Heaven.`
				];
			}
		};

		if (isActive(FS, arc)) {
			if (arc[FS] >= V.FSLockinLevel) {
				return arcSupportTexts(FS, arc)[0];
			} else if (arc[FS] >= V.FSLockinLevel * 0.6) {
				return arcSupportTexts(FS, arc)[1];
			} else if (arc[FS] >= V.FSLockinLevel * 0.3) {
				return arcSupportTexts(FS, arc)[2];
			} else {
				return arcSupportTexts(FS, arc)[3];
			}
		}
	}

	/**
	 *
	 * @param {FC.FSName<keyof FC.FutureSocietyWithResearchMap>} fs
	 * @param {FC.ArcologyState}[arcology] Arcology to test, defaults to the PC's arcology
	 * @returns {boolean}
	 */
	function researchAvailable(fs, arcology) {
		return (arcology ?? V.arcologies[0])[`FS${fs}Research`] === 1;
	}

	/**
	 * Checks if the given FS active (i.e. not null)
	 * @param {FC.FutureSociety} fs
	 * @param {FC.ArcologyState} [arcology] Arcology to test, defaults to the PC's arcology
	 * @returns {boolean}
	 */
	function isActive(fs, arcology) {
		return (arcology ?? V.arcologies[0])[fs] !== null;
	}

	/**
	 * Tests if the given FS law is active (> 0) and optionally equals to the given value.
	 * For the law to be active, the respective fs policy needs to be active as well.
	 * @template {FC.FutureSociety} FS
	 * @param {FS} fs
	 * @param {FC.FutureSocietyIdMap[FS]['policy']} law
	 * @param {number} [value]
	 * @param {FC.ArcologyState} [arcology] Arcology to test, defaults to the PC's arcology
	 * @returns {boolean}
	 */
	function policyActive(fs, law, value, arcology){
		const arc = arcology ?? V.arcologies[0];
		return arc[fs] !== null && (value ? arc[`${fs}${law}`] === value : arc[`${fs}${law}`] > 0);
	}

	/**
	 * Change future society value bt the given amount, if the society is active
	 * @param {FC.FutureSociety} fs
	 * @param {number} amount
	 * @param {FC.ArcologyState} [arcology] Arcology to test, defaults to the PC's arcology
	 * @returns {number|null} modified society value
	 */
	function advance(fs, amount, arcology) {
		const arc = arcology ?? V.arcologies[0];
		if (!FutureSocieties.isActive(fs, arc)) { return null; }
		return arc[fs] += amount;
	}

	/**
	 * Returns numeric value for one of the active FS policies pair, or null when both are inactive
	 * @param {FC.FSHumanDevelopmentVector} vector the vector to test
	 * @param {FC.ArcologyState} [arcology] Arcology to test, defaults to the PC's arcology
	 * @returns {number|null} The number is positive or negative according to comments for FSHumanDevelopmentVector
	 */
	function humanVector(vector, arcology) {
		const arc = arcology ?? V.arcologies[0];
		/**
		 * @param {FC.FSPolicyValue} positiveFS
		 * @param {FC.FSPolicyValue} negativeFS
		 * @returns {FC.FSPolicyValue}
		 */
		const select = (positiveFS, negativeFS) => positiveFS !== null ? positiveFS : (negativeFS !== null ? -negativeFS : null);

		switch (vector) {
			case FSHumanVector.AGE: return select(arc.FSMaturityPreferentialist, arc.FSYouthPreferentialist);
			case FSHumanVector.HEIGHT: return select(arc.FSStatuesqueGlorification, arc.FSPetiteAdmiration);
			case FSHumanVector.WEIGHT: return select(arc.FSHedonisticDecadence, arc.FSPhysicalIdealist);
			case FSHumanVector.MODIFICATIONS: return select(arc.FSTransformationFetishist, arc.FSBodyPurist);
			case FSHumanVector.ASSETS: return select(arc.FSAssetExpansionist, arc.FSSlimnessEnthusiast);
			case FSHumanVector.INTELLIGENCE: return select(arc.FSSlaveProfessionalism, arc.FSIntellectualDependency);
			case FSHumanVector.GENDER: return select(arc.FSGenderRadicalist, arc.FSGenderFundamentalist);
			case FSHumanVector.BREEDING: return select(arc.FSRepopulationFocus, arc.FSRestart);
			case FSHumanVector.LIFE_QUALITY: return select(arc.FSPaternalist, arc.FSDegradationist);
		}
	}
})();
