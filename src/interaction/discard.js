/** @param {App.Entity.SlaveState} slave */
App.Interact.discard = function(slave) {
	const frag = document.createDocumentFragment();

	const {him} = getPronouns(slave);

	let cost = 0;
	try {
		cost = 50 * Math.trunc(slaveCost(slave) / 100); // slightly less than you'd get from Sell Slave
	} catch {
		// just use the minimum price
	}
	cost = Math.max(cost, minimumSlaveCost(false));

	const result = document.createElement("span");

	App.UI.DOM.appendNewElement("p", frag, `This will permanently remove ${SlaveFullName(slave)} from the game, and you will receive a minimal reimbursement of ${cashFormat(cost)} for ${him}. This is primarily intended as a way to rid yourself of bugged slaves. Are you certain?`);

	App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(`Discard ${him}`, () => {
		$(result).empty();
		try {
			result.append(App.Interact.Sale.separationReactions(slave));
		} catch {
			// oh well
		}

		App.UI.DOM.appendNewElement("div", result, `${slave.slaveName} has been removed from the game.`);

		cashX(cost, "slaveTransfer");
		removeSlave(slave);
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.Utils.scheduleSidebarRefresh();
	}));

	App.UI.DOM.appendNewElement("div", result, App.UI.DOM.passageLink(`Put ${him} up for sale instead`, "Sell Slave"));
	App.UI.DOM.appendNewElement("div", result, App.UI.DOM.passageLink("Cancel", V.nextLink));

	frag.append(result);

	return frag;
};
