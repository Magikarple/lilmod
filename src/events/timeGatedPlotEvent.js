// cSpell:ignore TGPE

/** This event serves as a controller for the "main" plot event chain, which is designed to advance the plot based ONLY on the current (effective) week.
 * These events don't have to keep their own gating code or results variables, because this chain controller tracks when they should be executed. */
App.Events.TimeGatedPlotEvent = class TimeGatedPlotEvent extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);

		// sparse array, indexed by effective week
		// maybe mercs should be a separate chain? Oh well, they're here for now.
		this.events = [];
		this.events[4] = new App.Events.PArcologyNaming();
		this.events[6] = new App.Events.PStripClubClosing();
		this.events[8] = new App.Events.PStripClubAftermath();
		this.events[17] = new App.Events.PShootInvitation();
		this.events[20] = new App.Events.PSlaveFood();
		this.events[24] = new App.Events.PMilitia();
		this.events[31] = new App.Events.PMercenaries();
		this.events[35] = new App.Events.PSnatchAndGrab();
		this.events[43] = new App.Events.PInvasion();
		this.events[46] = new App.Events.PRaidInvitation();
		this.events[54] = new App.Events.PPeacekeepersDeficit();
		this.events[56] = new App.Events.PUndergroundRailroad();
		this.events[58] = new App.Events.PBombing();
		this.events[61] = new App.Events.PTraitorMessage();
		this.events[62] = new App.Events.PDefenseFears();
		this.events[65] = new App.Events.PCitizensAndCivilians();
		this.events[67] = new App.Events.PCoupCollaborationChoice();
		this.events[69] = new App.Events.PHackerSupport();
		this.events[70] = new App.Events.PCoupCollaboration();
		// week 71 plot event is one of three possibilities, depending on game state
		const doubleAgent = (V.traitorType !== "agent" && V.traitorType !== "trapper") ? 0 : 1;
		if (V.traitorType === "trapper") {
			this.events[71] = new App.Events.PCoupBetrayal();
		} else if (V.mercenaries + V.personalArms + V.hackerSupport + doubleAgent < 5) {
			this.events[71] = new App.Events.PCoupLoss();
		} else {
			this.events[71] = new App.Events.PCoupAttempt();
		}
		this.events[72] = new App.Events.PCoupAftermath();

		// events with complex prerequisites don't belong here...they're just normal scheduled events and need their own chain controller or result flags
		for (let week = 0; week < this.events.length; ++week) {
			const event = this.events[week];
			if (event) {
				if (event.actorPrerequisites().length > 0) {
					throw new Error(`Time-gated plot events are not permitted to cast actors. Check event: ${event.eventName}`);
				}
				if (V.debugMode !== 0 && event.eventPrerequisites().length > 0) {
					// unlike ordinary nonrandom events, events in the plot chain only get ONE chance to execute, so you have to be very careful with prereqs
					console.log(`Time-gated plot event ${event.eventName} imposes prerequisites and WILL BE SKIPPED ENTIRELY if the prerequisites are not met on week ${week}!`);
				}
			}
		}
	}

	eventPrerequisites() {
		if (V.plot === 1) {
			const effectiveWeek = App.Events.effectiveWeek();
			// choose the earliest event that we need to run, within the window between the last event we ran and the current week, and run it
			// this means that effectiveWeek can jump ahead and we still won't skip any events...we'll just run whatever was missed until we catch up
			// but we also won't ever repeat any events, or play any new ones that should have occurred before the last event we played
			for (let week = V.plotEventWeek + 1; week <= effectiveWeek; ++week) {
				const event = this.events[week];
				if (event && event.eventPrerequisites().every(p => p())) {
					this.params.event = event;
					this.params.week = week;
					break;
				}
			}
		}
		return [() => !!this.params.event];
	}

	get eventName() {
		return "TGPE " + (this.params.event ? this.params.event.eventName : "");
	}

	execute(node) {
		V.plotEventWeek = this.params.week;
		this.params.event.execute(node);
	}
};
