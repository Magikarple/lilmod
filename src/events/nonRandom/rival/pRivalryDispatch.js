App.Events.PRivalryDispatch = class PRivalryDispatch extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.plot > 0,
			() => V.rival.prosperity > 0,
			() => (V.eventResults.rivalActionWeek || 0) < V.week
		];
	}

	execute(node) {
		if (V.rival.hostageState === 0 && V.rival.state === 2) {
			V.eventResults.rivalActionWeek = V.week; // that's all for this week
			node.append(App.Events.pRivalryHostage());
		} else if ((V.rival.prosperity - V.rival.power + 10) / V.arcologies[0].prosperity < 0.5) {
			V.eventResults.rivalActionWeek = V.week; // that's all for this week
			node.append(App.Events.pRivalryVictory());
		} else if (V.peacekeepers.state === 2 && V.peacekeepers.attitude > 5 && V.rival.duration > 1 && !V.eventResults.peacekeeperHelp) {
			// can fire this event again to trigger victory or rival actions in the same week
			node.append(App.Events.PRivalryPeacekeepers());
		} else {
			V.eventResults.rivalActionWeek = V.week; // that's all for this week
			node.append(App.Events.pRivalryActions());
		}
	}
};
