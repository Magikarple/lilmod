App.EndWeek.economics = function() {
	const node = new DocumentFragment();
	App.UI.DOM.appendNewElement("h1", node, `${V.arcologies[0].name} Weekly Financial Report — Week ${V.week}`);

	if (V.cash > -10000) {
		V.debtWarned = 0;
	}
	if (V.mods.food.enabled && V.mods.food.market &&
		(V.mods.food.amount > App.Facilities.Farmyard.foodConsumption() ||
		V.cash > App.Facilities.Farmyard.foodConsumption() * V.mods.food.cost)) {
		V.mods.food.warned = false;
	}

	const oldACitizens = V.ACitizens;
	SectorCounts();
	App.Arcology.updateOwnership();

	node.append(App.EndWeek.marketsReport());

	/**
	 * @typedef {object} economicsReport
	 * @property {string} name
	 * @property {boolean} requirements
	 * @property {DocumentFragment|HTMLElement} report
	 */

	/** @type {Map<string, economicsReport>} */
	const reportsMap = new Map([
		["arcologies", {
			name: "Arcologies",
			requirements: true,
			get report() { return App.EndWeek.neighborsDevelopment(); }
		}],
		["management", {
			name: "Arcology Management",
			requirements: true,
			get report() { return App.EndWeek.arcManagement(); }
		}],
		["societies", {
			name: "Society Development",
			get requirements() { return V.FSAnnounced > 0; },
			get report() { return App.EndWeek.FSDevelopments(); }
		}],
		["corporation", {
			name: "Corporation Developments",
			get requirements() { return V.corp.Incorporated === 1; },
			get report() { return App.EndWeek.corporationDevelopments(); }
		}],
		["authority", {
			name: "Authority",
			get requirements() { return V.secExpEnabled > 0; },
			get report() { return App.Mods.SecExp.authorityReport(); }
		}],
		["securityReport", {
			name: "Security",
			get requirements() { return V.secExpEnabled > 0; },
			get report() { return App.Mods.SecExp.securityReport(oldACitizens); }
		}],
		["reputation", {
			name: "Reputation",
			requirements: true,
			get report() { return App.EndWeek.reputation(); }
		}],
		["business", {
			name: "Personal Business",
			requirements: true,
			get report() { return App.EndWeek.personalBusiness(); }
		}],
		["personal", {
			name: "Personal Notes",
			requirements: true,
			get report() { return App.EndWeek.personalNotes(); }
		}],

	]);

	if (V.useTabs === 0) {
		for (const report of reportsMap.values()) {
			if (report.requirements) {
				node.append(report.report);
			}
		}
	} else {
		const tabBar = new App.UI.Tabs.TabBar("Economics");
		for (const [title, report] of reportsMap) {
			if (report.requirements) {
				tabBar.addTab(report.name, title, report.report);
			}
		}
		node.append(tabBar.render());
	}

	return node;
};
