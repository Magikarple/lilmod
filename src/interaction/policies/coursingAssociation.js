App.UI.coursingAssociation = function() {
	const node = new DocumentFragment();

	App.Events.addParagraph(node, [`You are a member of ${V.arcologies[0].name}'s Coursing Association. Coursing is a Free Cities revival of the old sport of hunting rabbits and hares with sighthounds, with the typically Free Cities amendments that the hares are replaced by newly enslaved people, the sighthounds are replaced by trained slaves, and the killing of the hare is replaced by rape. Truly, a sport of gentlemen.`]);

	const r = [];
	r.push(`The chasing slaves are known as lurchers, the term once used for the sighthounds. They require speed most of all, but must also be able to tackle their quarry; lurchers with the ability and willingness to make a spectacle of molesting the hares can improve their owners' reputations.`);

	if (V.LurcherID !== 0) {
		r.push(`${SlaveFullName(slaveStateById(V.LurcherID))} is assigned to compete as your lurcher.`);
	} else {
		r.push(`You have not selected a lurcher, meaning that you will not participate in coursing events.`);
	}

	r.push(App.UI.DOM.makeElement("div", `${properTitle()}, slaves assigned here can continue their usual duties.`, "note"));
	App.Events.addParagraph(node, r);

	if (V.LurcherID !== 0) {
		App.Events.addParagraph(node, [
			App.UI.DOM.makeElement("div", "Fire your Lurcher:", "bold"),
			App.UI.SlaveList.render([V.LurcherID], new Array(),
				(slave) => App.UI.DOM.passageLink(SlaveFullName(slave), 'Coursing Association', () => removeJob(slave, Job.LURCHER)))
		]);
	}

	App.Events.addParagraph(node, [
		App.UI.DOM.makeElement("div", "Select a slave to course as a Lurcher:", "bold"),
		App.UI.SlaveList.slaveSelectionList(
			s => V.LurcherID !== s.ID && canWalk(s) && canHold(s) && (canSee(s) || canHear(s)) && s.fuckdoll === 0 && isSlaveAvailable(s),
			(slave) => App.UI.DOM.link(SlaveFullName(slave), () => assignmentTransition(slave, Job.LURCHER, "Coursing Association"))
		)
	]);

	return node;
};
