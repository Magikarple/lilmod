// cSpell:ignore recDGSE, recMTFSE

App.Events.RERecruit = class RERecruit extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
		// we build all the delegate events here
		this.eventList = [
			new App.Events.recBlessedVessel,
			new App.Events.recBlessedVirgin,
			new App.Events.recBlindHomeless,
			new App.Events.recCapturedTeen,
			new App.Events.recCcsAngel,
			new App.Events.recCcsDA,
			new App.Events.recCleaningHouse,
			new App.Events.recDesperateBirth,
			new App.Events.recDesperateMILF,
			new App.Events.recDesperatePreg,
			new App.Events.recDesperateUniversityMILF,
			new App.Events.recDgRunaway,
			new App.Events.recDGSE,
			new App.Events.recEmbryoAppropriation,
			new App.Events.recFarmBull,
			new App.Events.recFarmCow,
			new App.Events.recFarmVirginCow,
			new App.Events.recFemaleDebtor,
			new App.Events.recFemaleRecruit,
			new App.Events.recFemaleRunaway,
			new App.Events.recFemaleSD,
			new App.Events.recFemaleSD2,
			new App.Events.recFemaleSE,
			new App.Events.recForbiddenLove,
			new App.Events.recGangLeader,
			new App.Events.recHandsomePC,
			new App.Events.recHeldPOW,
			new App.Events.recHermRunaway,
			new App.Events.recHomelessBreakIn,
			new App.Events.recImmigrant,
			new App.Events.recMaleDebtor,
			new App.Events.recMaleRecruit,
			new App.Events.recMaleSD,
			new App.Events.recMTFSE,
			new App.Events.recOrphanFemboy,
			new App.Events.recOrphanRebelliousFemale,
			new App.Events.recOverwhelmedFarmgirl,
			new App.Events.recPaternalistSwanSong,
			new App.Events.recPrincelyBetrayal,
			new App.Events.recPunkFemcat,
			new App.Events.recPunkSissycat,
			new App.Events.recRacerDgChaser,
			new App.Events.recRacerLoser,
			new App.Events.recRacerWinner,
			new App.Events.recRepoHousekeeper,
			new App.Events.recRepoMilfHousekeeper,
			new App.Events.recRepoNanny,
			new App.Events.recRogueCyborg,
			new App.Events.recRunawayCat,
			new App.Events.recSchoolSale,
			new App.Events.recSchoolTrap,
			new App.Events.recShemalePC,
			new App.Events.recSpoiledDaughter,
			new App.Events.recStarvingArtist,
			new App.Events.recStarvingMigrant,
			new App.Events.recTgAddict,
			new App.Events.recWanderingHomeless,
			new App.Events.recWhoreRecruit,
			new App.Events.recWomanlyPC,
		].concat(App.Mods.events.recruit);
	}

	eventPrerequisites() {
		// filter and weight the delegate events based on their prerequisites, casting requirements, and weight
		/** @type {App.Events.BaseEvent[]} */
		const validEvents = this.eventList
			.filter(e => App.Events.canExecute(e))
			.reduce((res, cur) => res.concat(Array(cur.weight).fill(cur)), []);

		// we randomly select a qualifying event and immediately write it onto this.params so that
		// a saved game will resume with the same event, rather than choosing a new one at random
		this.params.event = validEvents.random();

		// if a qualifying delegate event was selected, RE Recruit can run; otherwise it can't
		return [() => !!this.params.event];
	}

	get weight() {
		let weight = 1; // one generic recruit event guaranteed to always be possible
		if ((random(1, 100) < V.rep/200) || (V.debugMode && V.debugModeEventSelection)) {
			weight++;
		}
		if (V.policies.proRecruitment === 1) {
			if ((random(1, 100) < V.rep/200) || (V.debugMode && V.debugModeEventSelection)) {
				weight++;
			}
		}
		if (V.policies.enslavementRep !== -1) {
			if ((random(1, 100) < V.rep/300) || (V.debugMode && V.debugModeEventSelection)) {
				weight++;
			}
		}
		if (V.policies.enslavementCash !== -1) {
			if ((random(1, 100) < V.rep/300) || (V.debugMode && V.debugModeEventSelection)) {
				weight++;
			}
		}
		return weight;
	}

	get eventName() {
		return "Recruit " + (this.params.event ? this.params.event.eventName : "");
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		if (V.debugMode && V.debugModeEventSelection) {
			const el = App.UI.DOM.appendNewElement("span", node);
			App.UI.DOM.appendNewElement("span", el, `One of the following recruitment events would have appeared: `);
			const evList = this.eventList.filter(e => App.Events.canExecute(e));
			el.append(App.UI.DOM.makeSelect(evList.map(e => {
				return {key: e.eventName, name: e.eventName};
			}), null, e => {
				el.remove();
				evList.find(ev => ev.eventName === e).execute(node);
			}));
		} else {
			// forward execution to the delegate event
			this.params.event.execute(node);
		}
	}
};
