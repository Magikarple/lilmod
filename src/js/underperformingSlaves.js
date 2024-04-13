App.Underperformers = {};

/** Select only slaves which are not reasonably expected to produce any income (brand new slaves, servants, fucktoys, etc)
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Underperformers.expectIncome = function(slave) {
	const productionJobs = [Job.ARCADE, Job.MILKED, Job.WHORE, Job.GLORYHOLE, Job.BROTHEL, Job.DAIRY, Job.CHOICE];
	return productionJobs.includes(slave.assignment) && ((slave.weekAcquired + 1) < V.week) && _.isFinite(slave.lastWeeksCashIncome);
};

App.Underperformers.highSale = function() {
	const description = App.UI.DOM.makeElement("div", "Take the rough value of a slave and divide it by how much they made overall last week. This will tell you how many weeks it might take them to earn the same amount you'd get for selling them right now.", "note");

	const frag = App.UI.SlaveList.render(
		getBestSlavesIDs(
			{
				part: (slave) => {
					const ratio = slaveCost(slave) / (slave.lastWeeksCashIncome - getSlaveCost(slave));
					return ratio > 0 ? ratio : 100000000 + ratio;
				},
				count: V.underperformersCount,
				filter: App.Underperformers.expectIncome
			}
		),
		[],
		App.UI.SlaveList.SlaveInteract.stdInteract,
		(slave) => $(document.createDocumentFragment()).append(
			`Worth ${cashFormatColor(slaveCost(slave))} / Nets ${cashFormatColor(slave.lastWeeksCashIncome - getSlaveCost(slave))} a week = ${(Math.trunc(slaveCost(slave) / (slave.lastWeeksCashIncome - getSlaveCost(slave)))) > 0 ? (Math.trunc(slaveCost(slave) / (slave.lastWeeksCashIncome - getSlaveCost(slave)))) : "infinite"} weeks`
		).get(0)
	);

	frag.prepend(description);
	return frag;
};

App.Underperformers.expensive = function() {
	const description = App.UI.DOM.makeElement("div", "This list looks for moochers by weighing their weekly income against the weekly cost of providing for them.", "note");

	const frag = App.UI.SlaveList.render(
		getBestSlavesIDs(
			{
				part: (slave) => (slave.lastWeeksCashIncome - getSlaveCost(slave)),
				largest: false,
				count: V.underperformersCount,
				filter: App.Underperformers.expectIncome
			}
		),
		[],
		App.UI.SlaveList.SlaveInteract.stdInteract,
		(slave) => $(document.createDocumentFragment()).append(
			`${cashFormatColor(Math.trunc(slave.lastWeeksCashIncome - getSlaveCost(slave)))} net last week`
		).get(0)
	);

	frag.prepend(description);
	return frag;
};

App.Underperformers.passage = function() {
	const node = new DocumentFragment();
	// App.UI.DOM.appendNewElement("h1", node, `Underperforming Slaves`);
	const r = [];
	r.push(App.UI.DOM.makeElement("div", `${properMaster()}, while many of your slaves work hard to earn ¤ each week, some succeed more than others. As a trader in slaves, you may appreciate the opportunity that comes when a particularly valuable slave didn't earn very much last week. Or perhaps you just want the chance to tweak these problem slaves and train them to be better? The choice is yours.`));
	if (V.slaveCostFactor > 1.1) {
		r.push(`Since there is a bull market for slaves, <span class="green">this is a great time to sell.</span>`);
	} else if (V.slaveCostFactor > 1) {
		r.push(`Since the slave market is bullish; <span class="green">this is a pretty good time to sell.</span>`);
	} else if (V.slaveCostFactor < 0.9) {
		r.push(`Since there is a bear market for slaves, <span class="red">this is a poor time to sell.</span>`);
	} else if (V.slaveCostFactor < 1) {
		r.push(`Since the slave market is bearish; <span class="red">this is a terrible time to sell.</span>`);
	} else {
		r.push(`Since the slave market is stable; <span class="yellow">prices are average.</span>`);
	}
	App.Events.addParagraph(node, r);

	const tabBar = new App.UI.Tabs.TabBar("underperformingSlaves");
	tabBar.addTab("Worth much but earning little", "little", App.Underperformers.highSale());
	tabBar.addTab("Costing vs earning", "earning", App.Underperformers.expensive());
	node.append(tabBar.render());

	const g = new App.UI.OptionsGroup();
	g.addOption("Maximum number of slaves", "underperformersCount")
		.addValue("Default", 7).showTextBox();
	node.append(g.render());

	return node;
};
