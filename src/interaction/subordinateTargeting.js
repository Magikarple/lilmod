App.UI.subordinateTargeting = function() {
	const node = new DocumentFragment();
	const slave = getSlave(V.AS);
	let r = [];
	const {
		he, him, himself
	} = getPronouns(slave);

	if (slave.subTarget === slave.ID) {
		slave.subTarget = 0;
	} else if (slave.subTarget === -1) {
		if (V.universalRulesImpregnation !== "Stud" || slave.ID !== V.StudID) {
			slave.subTarget = 0;
		}
	}
	if (slave.assignment !== Job.SUBORDINATE) {
		assignJob(slave, Job.SUBORDINATE);
	}
	const st = getSlave(slave.subTarget);
	r.push(slave.slaveName);
	if (st) {
		r.push(`will submit to <span class='slave-name'>${st.slaveName}</span> this week.`);
	} else if (slave.subTarget === -1) {
		r.push(`is acting as your Stud and is tasked with keeping your chattel pregnant.`);
	} else {
		r.push(`has not been given to any particular slave, so ${he} will have to offer ${himself} to everyone this week.`);
		slave.subTarget = 0;
	}
	App.Events.addParagraph(node, r);

	if (slave.subTarget === -1) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			`Rein ${him} in`,
			() => {
				slave.subTarget = 0;
				V.StudID = 0;
				App.UI.reload();
			}
		));
	} else {
		if (V.universalRulesImpregnation === "Stud" && V.StudID === 0) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				"Stud",
				() => {
					slave.subTarget = -1;
					V.StudID = slave.ID;
					App.UI.reload();
				}
			));
		}
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"None",
			() => {
				slave.subTarget = 0;
				App.UI.reload();
			}
		));
		App.UI.DOM.appendNewElement("h2", node, `Select a slave for ${him} to submit to, sexually:`);
		node.append(App.UI.SlaveList.slaveSelectionList(
			s => s.devotion >= -20 && s.fuckdoll === 0 && s.ID !== slave.ID &&
			(!isAmputee(slave) || !isAmputee(s)),
			(s) => App.UI.DOM.passageLink(SlaveFullName(s), 'Subordinate Targeting', () => { slave.subTarget = s.ID; }),
		));
	}
	return node;
};
