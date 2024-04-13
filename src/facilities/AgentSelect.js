App.Facilities.AgentSelect = function() {
	const f = document.createDocumentFragment();

	App.UI.DOM.appendNewElement("h2", f, "Appoint an Agent from your devoted slaves");
	f.append(App.UI.SlaveList.slaveSelectionList(
		s => App.Entity.facilities.arcologyAgent.manager.checkRequirements(s),
		(slave) => App.UI.DOM.passageLink(SlaveFullName(slave), "Agent Assignment Scene",
			() => V.AS = slave.ID),
		s => App.Entity.facilities.arcologyAgent.manager.slaveHasExperience(s)
	));
	return f;
};
