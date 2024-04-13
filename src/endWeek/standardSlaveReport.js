/**
 * Generates (and returns if not silent) a standard slave report.
 * This is the part after the slave's job in most facilities.
 * @param {FC.ReportSlave} slave
 * @param {boolean} silent
 * @returns {DocumentFragment|null}
 */
App.SlaveAssignment.standardSlaveReport = function(slave, silent = false) {
	const clothes = App.SlaveAssignment.choosesOwnClothes(slave);
	const individualReport = App.SlaveAssignment.individualSlaveReport(slave);
	const devotion = App.SlaveAssignment.devotion(slave);
	const partTime = App.SlaveAssignment.PartTime.saPartTime(slave);

	if (!silent) {
		const container = document.createDocumentFragment();
		if (partTime.length > 0) {
			App.Events.addNode(container, partTime, "div", "indent");
		}
		App.Events.addNode(container, [clothes, ...individualReport], "div", "indent");
		App.Events.addNode(container, [devotion], "div", "indent");
		return container;
	}
};

/**
 * Generates the main part of the standard slave report for an individual slave.
 * This is the section that's identical for all slaves regardless of facility.
 * @param {FC.ReportSlave} slave
 * @returns {Array<DocumentFragment|string>}
 */
App.SlaveAssignment.individualSlaveReport = function(slave) {
	App.EndWeek.saVars.slaveCheckedIn.push(slave.ID);
	return [
		App.SlaveAssignment.rules(slave),
		App.SlaveAssignment.diet(slave),
		App.SlaveAssignment.longTermEffects(slave),
		App.SlaveAssignment.drugs(slave),
		App.SlaveAssignment.relationships(slave),
		App.SlaveAssignment.rivalries(slave),
	];
};

/**
 * Render slave assignment report art
 * @param {ParentNode} node
 * @param {App.Entity.SlaveState} slave
 */
App.SlaveAssignment.appendSlaveArt = function(node, slave) {
	if (V.seeImages && V.seeReportImages && (!V.seeCustomImagesOnly || (V.seeCustomImagesOnly && slave.custom.image))) {
		App.UI.DOM.appendNewElement("div", node, App.EndWeek.saVars.slaveArt.render(slave), ["imageRef", "tinyImg", "margin-right"]);
	}
};

/**
 * Render slave name (with popup link) and favorite and reminder links
 * @param {App.Entity.SlaveState} slave
 */
App.SlaveAssignment.saSlaveName = function(slave) {
	const frag = new DocumentFragment();
	const popup = App.UI.DOM.slaveDescriptionDialog(
		slave, SlaveFullName(slave), undefined,
		{
			noButtons: true,
			linkClasses: ["slave-name", "bold"],
		}
	);
	frag.append(
		App.UI.favoriteToggle(slave), " ",
		App.Reminders.slaveLink(slave.ID), " ",
		popup, " "
	);
	return frag;
};

/**
 * Render linkified slave name with job assignment statement.
 * @param {App.Entity.SlaveState} slave
 * @param {string} def - this statement will be used if the slave ISN'T choosing her own job. Generally, something like "is <verb>ing in <facility>."  Note that penthouse jobs do not have a default job statement, instead leading directly into the job text if the slave is not choosing her own job.
 */
App.SlaveAssignment.saSlaveIntro = function(slave, def) {
	const frag = this.saSlaveName(slave);
	const choice = App.EndWeek.saVars.choosesOwnAssignmentText[slave.ID];
	if (slave.choosesOwnAssignment && choice) {
		$(frag).append(choice);
	} else {
		$(frag).append(def);
	}
	return frag;
};
