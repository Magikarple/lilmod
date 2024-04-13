// cSpell:ignore RESSAGift, RESSSurprisingWakeup, RESSPLimbHelp, REHGReplacement, REAWOL, RESSMilkgasm, RNIE

/* Note that we use a much more strict delineation between individual and nonindividual events here than in the old event system.
 * Individual events always trigger for the chosen event slave, and the first actor is always the event slave.
 * Nonindividual events are not provided any event slave and should cast one themselves.
 */

/** get a list of possible individual events
 * @returns {Array<App.Events.BaseEvent>}
 */
App.Events.getIndividualEvents = function() {
	return [
		// instantiate all possible random individual events here
		// example: new App.Events.TestEvent(),
		new App.Events.RESSAgeDifferenceOldPC(),
		new App.Events.RESSAgeDifferenceYoungPC(),
		new App.Events.RESSAgeImplant(),
		new App.Events.RESSAGift(),
		new App.Events.RESSAmpDevoted(),
		new App.Events.RESSAmpResting(),
		new App.Events.RESSAraAra(),
		new App.Events.RESSArcadeSadist(),
		new App.Events.RESSAssFitting(),
		new App.Events.RESSBackStretch(),
		new App.Events.RESSBadDream(),
		new App.Events.RESSBedSnuggle(),
		new App.Events.RESSBirthday(),
		new App.Events.RESSBirthdaySex(),
		new App.Events.RESSBondageGear(),
		new App.Events.RESSBondedLove(),
		new App.Events.RESSBreastExpansionBlues(),
		new App.Events.RESSBreedingBull(),
		new App.Events.RESSCageRelief(),
		new App.Events.RESSCockFeederResistance(),
		new App.Events.RESSComfortableSeat(),
		new App.Events.RESSConfidentTanning(),
		new App.Events.RESSCoolerLockin(),
		new App.Events.RESSCowMilking(),
		new App.Events.RESSCumslutWhore(),
		new App.Events.RESSDesperateBreeder(),
		new App.Events.RESSDesperatelyHorny(),
		new App.Events.RESSDesperateNull(),
		new App.Events.RESSDevotedAnalVirgin(),
		new App.Events.RESSDevotedEducated(),
		new App.Events.RESSDevotedExhibition(),
		new App.Events.RESSDevotedFearfulSlave(),
		new App.Events.RESSDevotedLotion(),
		new App.Events.RESSDevotedNympho(),
		new App.Events.RESSDevotedOld(),
		new App.Events.RESSDevotedShortstack(),
		new App.Events.RESSDevotedVirgin(),
		new App.Events.RESSDevotedWaist(),
		new App.Events.RESSDickgirlPC(),
		new App.Events.RESSDickWringing(),
		new App.Events.RESSDiet(),
		new App.Events.RESSEliteBreederPlease(),
		new App.Events.RESSEscapee(),
		new App.Events.RESSExtremeAphrodisiacs(),
		new App.Events.RESSFearfulBalls(),
		new App.Events.RESSFearfulHumiliation(),
		new App.Events.RESSFirstPeriod(),
		new App.Events.RESSForbiddenMasturbation(),
		new App.Events.RESSFrighteningDick(),
		new App.Events.RESSFucktoyTribbing(),
		new App.Events.RESSGaggedSlave(),
		new App.Events.RESSGapedAsshole(),
		new App.Events.RESSGorging(),
		new App.Events.RESSHappyDance(),
		new App.Events.RESSHatesOral(),
		new App.Events.RESSHeavyPiercing(),
		new App.Events.RESSHeels(),
		new App.Events.RESSHormoneDysfunction(),
		new App.Events.RESSHotPC(),
		new App.Events.RESSHugelyPregnant(),
		new App.Events.RESSHugeNaturals(),
		new App.Events.RESSHugeTits(),
		new App.Events.RESSHyperpregStuck(),
		new App.Events.RESSIgnorantHorny(),
		new App.Events.RESSImplantInspection(),
		new App.Events.RESSImpregnationPlease(),
		new App.Events.RESSImScared(),
		new App.Events.RESSInconvenientLabia(),
		new App.Events.RESSInjectionsPlease(),
		new App.Events.RESSKitchenMolestation(),
		new App.Events.RESSLanguageLesson(),
		new App.Events.RESSLazyEvening(),
		new App.Events.RESSLikeMe(),
		new App.Events.RESSLooseButtslut(),
		new App.Events.RESSMasterfulEntertainer(),
		new App.Events.RESSMasterfulWhore(),
		new App.Events.RESSMeanGirls(),
		new App.Events.RESSMilkgasm(),
		new App.Events.RESSMillenary(),
		new App.Events.RESSMindbrokenMorning(),
		new App.Events.RESSModestClothes(),
		new App.Events.RESSModsPlease(),
		new App.Events.RESSMoistPussy(),
		new App.Events.RESSMuscles(),
		new App.Events.RESSMutinyAttempt(),
		new App.Events.RESSNewlyDevotedSunrise(),
		new App.Events.RESSNiceGuys(),
		new App.Events.RESSNightVisit(),
		new App.Events.RESSNotMyName(),
		new App.Events.RESSNymphoWithAssistant(),
		new App.Events.RESSObedientAddict(),
		new App.Events.RESSObedientBitchy(),
		new App.Events.RESSObedientGirlish(),
		new App.Events.RESSObedientIdiot(),
		new App.Events.RESSObedientShemale(),
		new App.Events.RESSObjectifyingVisit(),
		new App.Events.RESSOrchiectomyPlease(),
		new App.Events.RESSPAFlirting(),
		new App.Events.RESSPAServant(),
		new App.Events.RESSPassingDeclaration(),
		new App.Events.RESSPenitent(),
		new App.Events.RESSPermittedMasturbation(),
		new App.Events.RESSPLimbHelp(),
		new App.Events.RESSPlugDisobedience(),
		new App.Events.RESSProstheticsPlease(),
		new App.Events.RESSRebelliousArrogant(),
		new App.Events.RESSRefreshmentDelivery(),
		new App.Events.RESSResistantAnalVirgin(),
		new App.Events.RESSResistantGelding(),
		new App.Events.RESSResistantShower(),
		new App.Events.RESSRestrictedProfession(),
		new App.Events.RESSRestrictedSmart(),
		new App.Events.RESSRetchingCum(),
		new App.Events.RESSScrubbing(),
		new App.Events.RESSServantMaid(),
		new App.Events.RESSServeThePublicDevoted(),
		new App.Events.RESSSexySuccubus(),
		new App.Events.RESSShapedAreolae(),
		new App.Events.RESSShiftDoorframe(),
		new App.Events.RESSShiftMasturbation(),
		new App.Events.RESSShiftSleep(),
		new App.Events.RESSShowerSlip(),
		new App.Events.RESSSlaveDickHuge(),
		new App.Events.RESSSleepingAmbivalent(),
		new App.Events.RESSSolitaryDesperation(),
		new App.Events.RESSSoreAss(),
		new App.Events.RESSSoreShoulders(),
		new App.Events.RESSSpaBoobs(),
		new App.Events.RESSSubjugationBlues(),
		new App.Events.RESSSuppositoryResistance(),
		new App.Events.RESSSurgeryAddict(),
		new App.Events.RESSSurprisingWakeup(),
		new App.Events.RESSTendonFall(),
		new App.Events.RESSTerrifiedInspection(),
		new App.Events.RESSTittymonsterInspection(),
		new App.Events.RESSTooThinForCumDiet(),
		new App.Events.RESSTorpedoSqueeze(),
		new App.Events.RESSTransitionAnxiety(),
		new App.Events.RESSTrustingHG(),
		new App.Events.RESSUnhappyVirgin(),
		new App.Events.RESSUsedWhore(),
		new App.Events.RESSVocalDisobedience(),
		new App.Events.RESSWaistlineWoes(),
		new App.Events.RESSWetDreams(),
		new App.Events.RESSWhoreRebellious(),

		new App.Events.RECIAdoptFollowUp(),
		new App.Events.RECIButthole(),
		new App.Events.RECIFeminization(),
		new App.Events.RECIFuta(),
		new App.Events.RECIMilf(),
		new App.Events.RECIOrientation(),
		new App.Events.RECIUgly(),

		new App.Events.RETSAnalCowgirl(),
		new App.Events.RETSBoobCollision(),
		new App.Events.RETSCockmilkInterception(),
		new App.Events.RETSDatePlease(),
		new App.Events.RETSFucktoyPrefersRelative(),
		new App.Events.RETSIfYouEnjoyIt(),
		new App.Events.RETSIncestuousNursing(),
		new App.Events.RETSInterslaveBegging(),
		new App.Events.RETSAnalRepressedVirgin(),
		new App.Events.RETSSadisticDescription(),
		new App.Events.RETSShowerForce(),
		new App.Events.RETSSiblingTussle(),
		new App.Events.RETSSimpleAssault(),
		new App.Events.RETSSlaveOnSlaveClit(),
		new App.Events.RETSSlaveOnSlaveDick(),
		new App.Events.RETSTasteTest(),
		new App.Events.RETSTopExhaustion(),

		new App.Events.RENickname().setType("RIE"),

		new App.Events.CMRESSAnnoyingCat(),
		new App.Events.CMRESSLazyCat(),
		new App.Events.CMRESSSpoiledCat(),
		new App.Events.CMRESSCatWorship(),
		new App.Events.CMRESSCatLove(),
		new App.Events.CMRESSCatPresent(),

		new App.Events.rePregInventorInvite(),
		new App.Events.rePregInventorShowOff(),
		new App.Events.rePregInventorFCTV(),

		new App.Events.REStandardPunishment(),
		new App.Events.REAnalPunishment(),
		new App.Events.REShowerPunishment(),
		new App.Events.REHGReplacement(),
		new App.Events.RESnatchAndGrabFollowup(),

		// Relationship Events
		new App.Events.REDevotedMotherDaughter(),
		new App.Events.REResistantMotherDaughter(),
		new App.Events.RESiblingRevenge(),
		new App.Events.RERelationshipAdvice(),
		new App.Events.RESlaveMarriage(),
		new App.Events.RESiblingPlease(),
	].concat(App.Mods.events.random.individual);
};

/** get a list of possible nonindividual events
 * Note: recruitment events should NOT be added to this list; they go in getNonindividualRecruitmentEvents instead.
 * @returns {Array<App.Events.BaseEvent>}
 */
App.Events.getNonindividualEvents = function() {
	return [
		// instantiate all possible random nonindividual events here
		// example: new App.Events.TestEvent(),
		new App.Events.PEConcubineInterview(),
		new App.Events.PEUnderageConcubine(),
		new App.Events.PEHeadgirlConcubine(),
		new App.Events.PEPitFightInvite(),
		new App.Events.PECombatTraining(),
		new App.Events.PELonelyBodyguard(),
		new App.Events.PEAssociatesPublicSlut(),
		new App.Events.PEFoodplay(),

		new App.Events.REDevotees(),
		new App.Events.RERelativeRecruiter(),
		new App.Events.REStaffedMorning(),
		new App.Events.REFullBed(),
		new App.Events.REDevotedTwins(),
		new App.Events.RERoyalBlood(),
		new App.Events.REArcologyInspection(),
		new App.Events.REShelterInspection(),

		new App.Events.REFIBoobslut(),
		new App.Events.REFIButtslut(),
		new App.Events.REFICumslut(),
		new App.Events.REFIDominant(),
		new App.Events.REFIHumiliation(),
		new App.Events.REFIMasochist(),
		new App.Events.REFIPregnancy(),
		new App.Events.REFISadist(),
		new App.Events.REFISubmissive(),

		new App.Events.RENickname().setType("RNIE"),

		new App.Events.RECitizenHookup(),
		new App.Events.REMaleCitizenHookup(),
		new App.Events.REFemaleArcologyOwner(),
		new App.Events.REMaleArcologyOwner(),
		new App.Events.REBoomerang(),
		new App.Events.REMilfTourist(),
		new App.Events.REDrunkenTourist(),
		new App.Events.REAWOL(),
		new App.Events.REPokerNight(),
		new App.Events.TrickShotNight(),
		new App.Events.REShippingContainer(),
		new App.Events.REBrothelFunction(),
		new App.Events.RERebels(),

		// schools
		new App.Events.RESEndowment(),
		new App.Events.RESMove(),
		new App.Events.RESSale(),

		// legendary
		new App.Events.RELegendaryFormerAbolitionist(),
		new App.Events.RELegendaryCow(),
		new App.Events.RELegendaryBalls(),
		new App.Events.RELegendaryWhore(),
		new App.Events.RELegendaryEntertainer(),
		new App.Events.RELegendaryWomb(),

		new App.Events.REBusyClub(),
		new App.Events.REBusyArcade(),
		new App.Events.REBusyDairy(),
		new App.Events.REBusyBrothel(),
		new App.Events.REBusyServantsQuarters(),
		new App.Events.REBusyMasterSuite(),

		// FS events
		// revivalist artifacts
		new App.Events.refsAntebellumArtifact(),
		new App.Events.refsArabianArtifact(),
		new App.Events.refsAztecArtifact(),
		new App.Events.refsChineseArtifact(),
		new App.Events.refsEdoArtifact(),
		new App.Events.refsEgyptianArtifact(),
		new App.Events.refsRomanArtifact(),
		// encounters
		new App.Events.refsBodyPurismEncounter(),
		new App.Events.refsDegradationistEncounter(),
		new App.Events.refsMaturityPreferentialistEncounter(),
		new App.Events.refsPastoralistEncounter(),
		new App.Events.refsPaternalistEncounter(),
		new App.Events.refsPhysicalIdealistEncounter(),
		new App.Events.refsTransformationFetishismEncounter(),
		new App.Events.refsYouthPreferentialistEncounter(),
		// neo-imperialism
		new App.Events.refsBaronDemand(),
		new App.Events.refsDeadBaron(),
		new App.Events.refsKnightlyDuel(),
		new App.Events.refsNeoImperialistFeast(),
		new App.Events.refsWarhound(),
		// others
		new App.Events.refsRomanStoicism(),
		new App.Events.refsTotallyLegitCatgirls(), // FIXME: not actually an FS event...
		new App.Events.REFSNonconformist(),

		// Justice Event
		new App.Events.JESlaveDisputeBreedingDeal(),
		new App.Events.JESlaveDisputeIndentureDeal(),
		new App.Events.JESlaveDisputeMajorityDeal(),
		new App.Events.JESlaveDisputeSlaveDeal(),
		new App.Events.JESlaveDisputeSlaveTraining(),
		new App.Events.JESlaveVirginityDeal(),

		// Random Market Events
		new App.Events.REMFluctuations(),
		new App.Events.REMMerger(),

		// SoS
		new App.Events.RESosSniper(),
		new App.Events.RESosAssassin(),
		new App.Events.RESosBombing(),

		// PETS
		new App.Events.petsAggressiveSchoolteacher(),
		new App.Events.petsAggressiveWardeness(),
		new App.Events.petsComfortingAttendant(),
		new App.Events.petsNurseMolestation(),
		new App.Events.petsStewardessBeating(),

		// PESS
		new App.Events.pessBodyguardBeatdown(),
		new App.Events.pessBodyguardBedtime(),
		new App.Events.pessDjPublicity(),
		new App.Events.pessHeadgirlDickgirl(),
		new App.Events.pessLovingConcubine(),
		new App.Events.pessLovingHeadgirl(),
		new App.Events.pessMadamStrategy(),
		new App.Events.pessTiredCollectrix(),
		new App.Events.pessTiredMilkmaid(),
		new App.Events.pessWorriedHeadgirl(),
		new App.Events.pessWorshipfulImpregnatrix(),
	].concat(App.Mods.events.random.nonIndividual);
};

/** get a list of possible nonindividual recruitment events
 * The probability of selecting recruitment events is capped, to allow the above events to trigger more frequently
 * @returns {Array<App.Events.BaseEvent>}
 */
App.Events.getNonindividualRecruitmentEvents = function() {
	return [
		new App.Events.RERecruit(),
		new App.Events.REMalefactor(),
		new App.Events.RECelebrityAddictionDebt(),

		// recFS
		new App.Events.recFSAntebellumRevivalist(),
		new App.Events.recFSArabianRevivalist(),
		new App.Events.recFSAssetExpansionist(),
		new App.Events.recFSAssetExpansionistTwo(),
		new App.Events.recFSAztecRevivalist(),
		new App.Events.recFSBodyPurist(),
		new App.Events.recFSBodyPuristTwo(),
		new App.Events.recFSChattelReligionist(),
		new App.Events.recFSChattelReligionistTwo(),
		new App.Events.recFSChineseRevivalist(),
		new App.Events.recFSDegradationist(),
		new App.Events.recFSDegradationistTwo(),
		new App.Events.recFSEdoRevivalist(),
		new App.Events.recFSEgyptianRevivalist(),
		new App.Events.recFSGenderFundamentalist(),
		new App.Events.recFSGenderFundamentalistTwo(),
		new App.Events.recFSGenderRadicalist(),
		new App.Events.recFSGenderRadicalistTwo(),
		new App.Events.recFSHedonisticDecadence(),
		new App.Events.recFSHedonisticDecadenceTwo(),
		new App.Events.recFSIntellectualDependency(),
		new App.Events.recFSIntellectualDependencyTwo(),
		new App.Events.recFSMaturityPreferentialist(),
		new App.Events.recFSMaturityPreferentialistTwo(),
		new App.Events.recFSNeoImperialist(),
		new App.Events.recFSPastoralist(),
		new App.Events.recFSPastoralistTwo(),
		new App.Events.recFSPaternalist(),
		new App.Events.recFSPaternalistTwo(),
		new App.Events.recFSPetiteAdmiration(),
		new App.Events.recFSPetiteAdmirationTwo(),
		new App.Events.recFSPhysicalIdealist(),
		new App.Events.recFSPhysicalIdealistTwo(),
		new App.Events.recFSRepopulationEfforts(),
		new App.Events.recFSRepopulationEffortsTwo(),
		new App.Events.recFSRestart(),
		new App.Events.recFSRestartTwo(),
		new App.Events.recFSRomanRevivalist(),
		new App.Events.recFSSlaveProfessionalism(),
		new App.Events.recFSSlaveProfessionalismTwo(),
		new App.Events.recFSSlimnessEnthusiast(),
		new App.Events.recFSSlimnessEnthusiastTwo(),
		new App.Events.recFSStatuesqueGlorification(),
		new App.Events.recFSStatuesqueGlorificationTwo(),
		new App.Events.recFSSubjugationist(),
		new App.Events.recFSSubjugationistTwo(),
		new App.Events.recFSSupremacist(),
		new App.Events.recFSSupremacistTwo(),
		new App.Events.recFSTransformationFetishist(),
		new App.Events.recFSTransformationFetishistTwo(),
		new App.Events.recFSYouthPreferentialist(),
		new App.Events.recFSYouthPreferentialistTwo(),

		// recets
		new App.Events.recetsAddictMotherDaughter(),
		new App.Events.recetsDesperateBroodmother(),
		new App.Events.recetsIdenticalHermPair(),
		new App.Events.recetsIdenticalPair(),
		new App.Events.recetsIncestBrotherBrother(),
		new App.Events.recetsIncestBrotherSister(),
		new App.Events.recetsIncestFatherDaughter(),
		new App.Events.recetsIncestFatherSon(),
		new App.Events.recetsIncestMotherDaughter(),
		new App.Events.recetsIncestMotherSon(),
		new App.Events.recetsIncestSisterSister(),
		new App.Events.recetsIncestTwinBrother(),
		new App.Events.recetsIncestTwinSister(),
		new App.Events.recetsIncestTwinsMixed(),
		new App.Events.recetsMatchedPair(),
		new App.Events.recetsMismatchedPair(),
		new App.Events.recetsPoshMotherDaughter(),
	].concat(App.Mods.events.random.recruitment);
};

/** choose a valid, castable event from the given event list
 * @param {Array<App.Events.BaseEvent>} eventList - list of events to filter
 * @param {App.Entity.SlaveState} [slave] - event slave (mandatory to cast in first actor slot). omit for nonindividual events.
 * @returns {Array<App.Events.BaseEvent>}
 */
App.Events.getValidEvents = function(eventList, slave) {
	return eventList
		.filter(e => App.Events.canExecute(e, slave))
		.reduce((res, cur) => res.concat(Array(cur.weight).fill(cur)), []);
};

App.Events.playRandomIndividualEvent = function() {
	const d = document.createElement("div");

	const makeNoEvent = (/** @type {number} */ id) => {
		const noEvent = new App.Events.RENoEvent();
		noEvent.actors = [id];
		return noEvent;
	};

	if (V.event instanceof App.Events.BaseEvent) {
		// we've deserialized a saved game with an event active, or a player has picked one, so just play it immediately
		App.Events.runPassageEvent(V.event, d);
		V.RIESkip.push(V.event.actors[0]);
	} else {
		const eligibleSlaves = getRieEligibleSlaves();
		if (eligibleSlaves.length === 0) {
			// no eligible slaves, move on to next week
			setTimeout(() => Engine.play("Next Week"), Engine.minDomActionDelay);
		} else if (V.debugMode > 0 && V.debugModeEventSelection > 0) {
			V.nextButton = "Refresh";
			V.nextLink = passage();
			V.RIERemaining++; // we've consumed one of our event possibilities already, but we haven't played the event yet, so put it back

			// show all the possible random individual events
			App.UI.DOM.appendNewElement("h2", d, "Random Individual Events");
			const countPara = App.UI.DOM.appendNewElement("p", d, `At most ${numberWithPluralOne(V.RIEPerWeek, "slave")} will get Random Individual Events per week, and you have ${num(V.RIERemaining)} left.`);
			if (V.RIESkip.length > 0) {
				countPara.append(` An event has already played for ${toSentence(V.RIESkip.map(s => SlaveFullName(getSlave(s))))}, so they are not eligible to play another.`);
			}

			const slaveDiv = App.UI.DOM.appendNewElement("div", d, "Show events for this slave: ");
			const options = [];
			const startingSlave = eligibleSlaves.random();
			for (const s of eligibleSlaves) {
				options.push({key: s.ID.toString(), name: SlaveFullName(s)});
			}
			slaveDiv.append(App.UI.DOM.makeSelect(options, startingSlave.ID.toString(), slaveID => {
				writeEventList(getSlave(parseInt(slaveID)));
			}));

			App.UI.DOM.appendNewElement("p", d, "One of the following individual events would have been chosen for this slave.");

			const linkList = App.UI.DOM.appendNewElement("div", d, '', ["event-section"]);
			const writeEventList = (/** @type {App.Entity.SlaveState} */eventSlave) => {
				$(linkList).empty();
				const events = App.Events.getValidEvents(App.Events.getIndividualEvents(), eventSlave);
				if (events.length === 0) {
					events.push(makeNoEvent(eventSlave.ID));
				}
				for (const event of events) {
					App.UI.DOM.appendNewElement("div", linkList, App.UI.DOM.passageLink(event.eventName, passage(), () => { V.event = event; }));
				}
			};
			writeEventList(startingSlave);

			App.UI.DOM.appendNewElement("div", d, App.UI.DOM.passageLink("Back to Random Nonindividual Event", "Random Nonindividual Event"));
			App.UI.DOM.appendNewElement("div", d, App.UI.DOM.passageLink("Skip week-end events", "Next Week"));
			d.append(App.Events.renderEventDebugger("Random Individual Event"));
		} else {
			// pick a slave for a random individual event
			const eventSlave = eligibleSlaves.random();

			// pick a random individual event for that slave. Use RE No Event if there are none she's eligible for.
			const events = App.Events.getValidEvents(App.Events.getIndividualEvents(), eventSlave);
			const event = events.random() || makeNoEvent(eventSlave.ID);

			// record the chosen event in 'current' (pre-play!) history as well as current state so that it will serialize out correctly if saved from this passage
			// WARNING: THIS IS ***NOT*** THE ACTIVE STATE PAGE!
			// @ts-ignore - under-defined object
			State.current.variables.event = V.event = event;
			App.Events.runPassageEvent(event, d);
			V.RIESkip.push(event.actors[0]);
		}
	}
	return d;
};

App.Events.playRandomNonindividualEvent = function() {
	const d = document.createElement("div");

	if (V.event instanceof App.Events.BaseEvent) {
		// we've deserialized a saved game with an event active, or a player has picked one, so just play it immediately
		App.Events.runPassageEvent(V.event, d);
	} else {
		let nonRecEvents = App.Events.getValidEvents(App.Events.getNonindividualEvents());
		let recEvents = App.Events.getValidEvents(App.Events.getNonindividualRecruitmentEvents());
		if (V.debugMode > 0 && V.debugModeEventSelection > 0) {
			V.nextButton = "Refresh";
			V.nextLink = passage();

			// show all the possible nonindividual random events
			App.UI.DOM.appendNewElement("h2", d, "Random Nonindividual Events");
			App.UI.DOM.appendNewElement("p", d, "One of the following nonindividual events would have been chosen.");
			const linkList = App.UI.DOM.appendNewElement("div", d, '', ["event-section"]);
			for (const event of nonRecEvents.concat(recEvents)) {
				App.UI.DOM.appendNewElement("div", linkList, App.UI.DOM.passageLink(event.eventName, passage(), () => { V.event = event; }));
			}

			App.UI.DOM.appendNewElement("div", d, App.UI.DOM.passageLink("Skip to Random Individual Event", "Random Individual Event"));
			App.UI.DOM.appendNewElement("div", d, App.UI.DOM.passageLink("Skip week-end events", "Next Week"));
			d.append(App.Events.renderEventDebugger("Random Nonindividual Event"));
		} else {
			// pick a random nonindividual event. there should always be at least one.
			const maxRecruitNumber = Math.min(10, Math.floor(nonRecEvents.length / 4) + 1);
			if (recEvents.length > maxRecruitNumber) {
				recEvents = recEvents.pluckMany(maxRecruitNumber);
			}
			const event = nonRecEvents.concat(recEvents).random();
			if (event) {
				// record the chosen event in 'current' (pre-play!) history as well as current state so that it will serialize out correctly if saved from this passage
				// WARNING: THIS IS ***NOT*** THE ACTIVE STATE PAGE!
				// @ts-ignore - under-defined object
				State.current.variables.event = V.event = event;
				App.Events.runPassageEvent(event, d);
			} else {
				throw new Error("There should always be at least one eligible nonindividual event.");
			}
		}
	}
	return d;
};
