App.UI.policies = function() {
	const node = new DocumentFragment();

	App.UI.DOM.appendNewElement("h1", node, `Policies`);

	const r = [];
	r.push(`Passing any law will cost ${cashFormat(5000)} and`);
	if (V.rep >= 1000) {
		r.push(App.UI.DOM.makeElement("span", `a small amount of reputation.`, `green`));
	} else {
		r.push(App.UI.DOM.makeElement("span", `a better reputation.`, `red`));
	}
	r.push(`More policies will become available as the arcology develops.`);
	App.Events.addNode(node, r, "p", "scene-intro");


	const tabBar = new App.UI.Tabs.TabBar("Policies");

	tabBar.addTab("Slave Market Regulations", "smr", smr());
	tabBar.addTab("Sexual Trendsetting", "st", st());
	tabBar.addTab("Population & Domestic", "population", population());
	tabBar.addTab("Education", "education", education());
	tabBar.addTab("Future Societies", "fs", fs());
	tabBar.addTab("Slave Retirement Planning", "srp", srp());

	node.append(tabBar.render());
	return node;

	function smr() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", frag, `Slave Market Regulations (SMRs) will affect slaves that come through the official slave markets in your arcology. The markets themselves will bear the cost of these regulations, but the minimum practicable slave prices may rise as a result.`, "scene-intro");
		policy("SMR").forEach(p => frag.append(p));
		return frag;
	}

	function st() {
		const frag = new DocumentFragment();
		policy("SexualTrendsetting").forEach(p => frag.append(p));
		return frag;
	}

	function population() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("h1", frag, `Population`);
		policy("PopulationPolicies").forEach(p => frag.append(p));
		App.UI.DOM.appendNewElement("h1", frag, `Domestic`);
		policy("DomesticPolicies").forEach(p => frag.append(p));
		return frag;
	}

	function education() {
		const frag = new DocumentFragment();
		if (V.schoolSuggestion === 0) {
			App.UI.DOM.appendNewElement("p", frag, `You have yet to contact a school about adding a local branch.`);
		}
		policy("EducationPolicies").forEach(p => frag.append(p));
		return frag;
	}

	function srp() {
		const frag = new DocumentFragment();
		if (V.policies.retirement.customAgePolicy === 0 && V.policies.retirement.physicalAgePolicy === 0) {
			const div = App.UI.DOM.appendNewElement("div", frag, `Default Retirement Age:`, "bold");
			div.append(` in the absence of a defined slave retirement age, slaves will not remain sex slaves after reaching age ${V.retirementAge}`);
			App.UI.DOM.appendNewElement("div", frag, `This is a current content and mechanical limitation in FC ${V.ver}, not a universal Free Cities rule.`, ["indent", "note"]);
		}
		policy("RetirementPolicies").forEach(p => frag.append(p));
		App.UI.DOM.appendNewElement("h1", frag, `Menials`);
		policy("MenialRetirementPolicies").forEach(p => frag.append(p));
		return frag;
	}
	function fs() {
		const frag = new DocumentFragment();
		policy("FutureSocietiesTab").forEach(p => frag.append(p));
		for (const FS in App.Data.FutureSociety.records) {
			const policies = policy(FS);
			if (policies.length > 0) {
				App.UI.DOM.appendNewElement("h2", frag, App.Data.FutureSociety.records[FS].adj);
				policies.forEach(p => frag.append(p));
			}
		}
		return frag;
	}
};
