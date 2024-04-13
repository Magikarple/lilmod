// Scheduled/nonrandom events are run sequentially, in order.
// They should always return to Nonrandom Event to ensure that none are skipped.

/** get a list of possible scheduled events
 * @returns {Array<App.Events.BaseEvent>}
 */
App.Events.getNonrandomEvents = function() {
	return [
		// instantiate all possible scheduled/nonrandom events here
		// ORDER MATTERS - if multiple events from this list trigger in a single week, they are executed in this order

		new App.Events.pLoanshark(),
		new App.Events.conflictOptions(),
		new App.Events.SEPlayerBirth(),
		new App.Events.SEpcBirthday(),
		new App.Events.SEIndependenceDay(),
		new App.Events.SEWedding(),
		new App.Events.PInsemination(),
		new App.Events.SERetire(),
		new App.Events.SEExpiration(),
		new App.Events.SEBurst(),
		new App.Events.SEDeath(),
		new App.Events.SEBirth(),
		new App.Events.SEfctvWatch(),
		new App.Events.SEfctvRemote(),
		new App.Events.TimeGatedPlotEvent(),
		new App.Events.assistantAwakens(),
		new App.Events.assistantSP(),
		new App.Events.assistantFS(),
		new App.Events.assistantName(),
		new App.Events.assistantMarket(),
		new App.Events.assistantBody(),
		new App.Events.pBadCuratives(),
		new App.Events.pBadBreasts(),
		new App.Events.pAidInvitation(),
		new App.Events.SERecruiterSuccess(),
		new App.Events.SEcustomSlaveDelivery(),
		new App.Events.JobFulfillmentCenterDelivery(),
		new App.Events.SEHuskSlaveDelivery(),
		new App.Events.SECoursing(),
		new App.Events.SERaiding(),
		new App.Events.SEPitFight(),
		new App.Events.PBioreactorPerfected(),
		new App.Events.RESFailure(),
		new App.Events.TFSFarmUpgrade(),
		new App.Events.SENicaeaAnnouncement(),
		new App.Events.SENicaeaPreparation(),
		new App.Events.SENicaeaCouncil(),
		new App.Events.MurderAttempt(),
		new App.Events.MurderAttemptFollowup(),
		new App.Events.pRaped(),
		new App.Events.pAbducted(),
		new App.Events.pFoodCrisisLowerClass(),
		new App.Events.PSchoolSuggestion(),

		// secExp
		new App.Events.secExpSmilingMan0(),

		new App.Events.PMercsHelpCorp(),
		new App.Events.PMercenaryRomeo(),

		new App.Events.SecurityForceProposal(),

		// Peacekeepers
		new App.Events.PPeacekeepersIndependence(),
		new App.Events.PPeacekeepersInfluence(),
		new App.Events.PPeacekeepersIntro(),

		// Cats
		new App.Events.SEVatCatGirl(),
		new App.Events.SEVatCatBoy(),
		new App.Events.SEBodyPuristProtest(),
		new App.Events.SEBodyPuristRiot(),
		new App.Events.SEProjectNBlowingTheLid(),
		new App.Events.SEProjectNBubbles(),
		new App.Events.SEProjectNComplete(),
		new App.Events.SEProjectNInitialized(),
		new App.Events.SEProjectNMoMoney(),
		new App.Events.SEProjectNSaboteur(),
		new App.Events.SEProjectNTechRelease(),

		// Elite
		new App.Events.eliteTakeOver(),

		new App.Events.SEAssholeKnight(),
		new App.Events.SENewBaron(),
		new App.Events.SEPoorKnight(),
		new App.Events.SEFcnnStation(),
		new App.Events.SEFctvInstall(),
		new App.Events.PFSAnnouncement(),
		new App.Events.PBodyswapReveal(),
		new App.Events.PCorpAnnouncement(),

		// rivalry events
		new App.Events.PRivalInitiation(),
		new App.Events.PRivalryDispatch(),
		new App.Events.pHostageAcquisition(),

		new App.Events.PregnancyNotice.PlayerPregnant(),
		new App.Events.PregnancyNotice.SlavePregnant(),
	].concat(App.Mods.events.nonRandom);
};

/** get the next nonrandom event which should fire
 * @returns {App.Events.BaseEvent}
 */
App.Events.getNextNonrandomEvent = function() {
	return App.Events.getNonrandomEvents()
		.find(e => App.Events.canExecute(e));
};

/** get all the nonrandom events which should fire this week
 * @returns {Array<App.Events.BaseEvent>}
 */
App.Events.getWeekNonrandomEvents = function() {
	return App.Events.getNonrandomEvents()
		.filter(e => App.Events.canExecute(e));
};

/** get the next queued event which should fire, and remove it from the queue
 * @returns {App.Events.BaseEvent}
 */
App.Events.dequeueNextQueuedEvent = function() {
	const event = (V.eventQueue[0] || [])
		.find(e => App.Events.canExecute(e));
	if (event) {
		V.eventQueue[0].delete(event);
	}
	return event;
};

/** get all the queued events which should fire this week
 * @returns {Array<App.Events.BaseEvent>}
 */
App.Events.getWeekQueuedEvents = function() {
	return (V.eventQueue[0] || [])
		.filter(e => App.Events.canExecute(e));
};

App.Events.playNonrandomEvent = function() {
	const d = document.createElement("div");
	V.nextLink = passage();
	V.nextButton = "Continue";

	if (V.event instanceof App.Events.BaseEvent) {
		// we've deserialized a saved game with an event active, or a player has picked one, so just play it immediately
		App.Events.runPassageEvent(V.event, d);
	} else {
		if (V.debugMode > 0 && V.debugModeEventSelection > 0) {
			V.nextButton = "Refresh";
			// show all the scheduled, nonrandom, and queued events, and allow the player to play them in any order and skip the remainder
			App.UI.DOM.appendNewElement("h2", d, "Scheduled and Nonrandom Events");
			App.UI.DOM.appendNewElement("div", d, "These scheduled and nonrandom events still need to play this week, in this order.");
			App.UI.DOM.appendNewElement("div", d, "WARNING: playing certain scheduled events out of order, or skipping them, can break your game! Be careful!", ["note", "warning"]);
			const events = App.Events.getWeekNonrandomEvents();
			const linkList = App.UI.DOM.appendNewElement("div", d, '', ["event-section"]);
			for (const event of events) {
				App.UI.DOM.appendNewElement("div", linkList, App.UI.DOM.passageLink(event.eventName, passage(), () => { V.event = event; }));
			}
			const queuedEvents = App.Events.getWeekQueuedEvents();
			for (const event of queuedEvents) {
				App.UI.DOM.appendNewElement("div", linkList, App.UI.DOM.passageLink(event.eventName, passage(), () => { V.event = event; V.eventQueue[0].delete(event); }));
			}
			if (events.length + queuedEvents.length > 0) {
				App.UI.DOM.appendNewElement("div", d, App.UI.DOM.passageLink("SKIP remaining events and proceed", "Random Nonindividual Event"));
			} else {
				App.UI.DOM.appendNewElement("div", d, App.UI.DOM.passageLink("No more events. Proceed.", "Random Nonindividual Event"));
			}
			d.append(App.Events.renderEventDebugger("Scheduled Event"));
		} else {
			// pick the next scheduled or nonrandom event, if there is one
			const event = App.Events.getNextNonrandomEvent();
			if (event) {
				// record the chosen event in 'current' (pre-play!) history as well as current state so that it will serialize out correctly if saved from this passage
				// WARNING: THIS IS ***NOT*** THE ACTIVE STATE PAGE!
				// @ts-ignore - under-defined object
				State.current.variables.event = V.event = event;
				App.Events.runPassageEvent(event, d);
			} else {
				// play the next queued event, if there is one
				const qEvent = App.Events.dequeueNextQueuedEvent();
				if (qEvent) {
					// we don't need to alter history when playing queued events, because the event instance is deterministically at the head of the queue already
					App.Events.runPassageEvent(qEvent, d);
				} else {
					// no more events for this week, move on to random events
					const plotDiscount = V.plot ? 0 : 25; // if plot is enabled, somewhat fewer nonindividual events appear in the first 75 weeks
					if (random(1, 200) > V.week + 125 + plotDiscount) {
						// skip nonindividual event, go straight to individual event
						// week 0: 50% chance to skip with plot disabled, 62.5% with plot enabled.
						// reaches 0% chance at week 50 with plot disabled, or week 75 with plot enabled.
						setTimeout(() => Engine.play("Random Individual Event"), Engine.minDomActionDelay);
					} else {
						setTimeout(() => Engine.play("Random Nonindividual Event"), Engine.minDomActionDelay);
					}
				}
			}
		}
	}
	return d;
};
