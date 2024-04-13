App.Events.REMMerger = class REMMerger extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.corp.Cash > 50000
		];
	}

	execute(node) {
		const slaveCompany = App.Corporate.divisionList
			.filter	(div => div.founded && div.hasMergers)
			.map	(div => div.mergerChoices.map((merger, index) => ({merger, index, division:div})))
			.flat	();
		const maxCompanies = Math.trunc(Math.log2(App.Corporate.divisionList.filter(div => div.founded).length)) + 1;
		const numCompanies = random(1, maxCompanies);

		const companies = [];
		for (let index = 0; index < numCompanies; ++index) {
			companies.push(slaveCompany.pluck());
		}
		const assistant = V.assistant.market ? "your market assistant" : V.assistant.name;

		App.UI.DOM.appendNewElement("p", node, `${capFirstChar(assistant)} constantly combs business records, tax receipts and the media for leads on opportunities for your corporation to take advantage of. Small businesses go under all the time, and with a large amount of cash on hand, your corporation can afford to step in and acquire them. This week, ${assistant} has found ${numberWithPlural(numCompanies, "troubled organization")} you could easily fold into your corporation.`);

		if (companies.length === 1) {
			const company = companies[0];
			App.UI.DOM.appendNewElement("div", node, `This week you come across ${company.merger.text.trouble}`, "majorText");
		} else {
			for (const [index, company] of companies.entries()) {
				App.UI.DOM.appendNewElement("div", node, `The ${ordinalSuffixWords(index + 1)} is ${company.merger.text.trouble}`, "majorText");
			}
		}

		const choices = [];

		for (const company of companies) {
			choices.push(new App.Events.Result(`Absorb the ${company.merger.name}`, () => absorb(company)));
		}
		App.Events.addResponses(node, choices);

		function absorb(company) {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You quickly acquire the ${company.merger.name} ${company.merger.text.acquire}`);

			const devCount = company.merger.result.development;
			const slaveCount = company.merger.result.slaves;
			if (devCount) {
				company.division.developmentCount += devCount;
			}
			if (slaveCount) {
				company.division.activeSlaves += slaveCount;
			}
			const cost = (company.merger.cost || 50) * 1000;
			if (devCount && slaveCount) {
				App.Corporate.chargeAsset(cost / 2, "development");
				App.Corporate.chargeAsset(cost / 2, "slaves");
			} else if (devCount) {
				App.Corporate.chargeAsset(cost, "development");
			} else if (slaveCount) {
				App.Corporate.chargeAsset(cost, "slaves");
			} else {
				r.push(`<span class="red">ERROR! No changes to the corporation are made!</span>`);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
