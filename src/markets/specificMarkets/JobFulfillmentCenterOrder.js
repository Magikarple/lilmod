App.Markets.JobFulfillmentCenterOrder = function() {
	const el = document.createElement("p");
	el.id = "job-fulfillment-center-order";
	el.append(JobFulfillmentCenterOrder());
	return el;

	function JobFulfillmentCenterOrder() {
		const el = new DocumentFragment();
		const r = [];
		const linkArray = [];
		let span = document.createElement("span");
		const {heA} = getPronouns(assistant.pronouns().main).appendSuffix('A');

		if (V.JFC.order === 0) {
			r.push(`You work up a new slave order for posting where slave merchants can work to fulfill it.`);
		} else {
			r.push(`You review your posted slave order for a <span class="bold">${V.JFC.role}.</span>`);
		}
		if (V.assistant.personality === 1) {
			r.push(`As you work, ${V.assistant.name} makes lewd comments about what ${heA} looks forward to doing to this new slave.`);
		}
		$(el).append(r.join(" "));

		if (V.JFC.order === 0) {
			const security = [
				{title: "Bodyguard"},
				{title: "Wardeness"},
			];
			const management = [
				{title: "Headgirl"},
				{title: "Teacher"},
				{title: "Nurse"},
				{title: "Attendant (normal)", value: "Attendant"},
				{title: "Attendant (motherly)", value: "Motherly Attendant"},
				{title: "Matron"},
				{title: "Stewardess"},
				{title: "Milkmaid"},
				{title: "Farmer"},
			];
			const entertainment = [
				{title: "DJ"},
				{title: "Madam"},
				{title: "Concubine"},

			];
			linkArray.push(
				App.UI.DOM.link(
					"Security",
					() => {
						jobSelection(security);
					}
				)
			);
			linkArray.push(
				App.UI.DOM.link(
					"Management",
					() => {
						jobSelection(management);
					}
				)
			);
			linkArray.push(
				App.UI.DOM.link(
					"Entertainment",
					() => {
						jobSelection(entertainment);
					}
				)
			);
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray));
			span.id = "job-type";
			el.append(span);
		} else {
			App.UI.DOM.appendNewElement("div", el,
				App.UI.DOM.link(
					"Withdraw slave order",
					() => {
						V.JFC = {order: 0, reorder: 0};
						refresh();
					}
				)
			);
		}
		return el;

		function jobSelection(choices) {
			const el = new DocumentFragment();
			for (const choice of choices) {
				App.UI.DOM.appendNewElement("div", el,
					App.UI.DOM.link(
						choice.title,
						() => {
							V.JFC.order = 1;
							V.JFC.role = choice.value || choice.title;
							refresh();
						}
					)
				);
			}
			return jQuery("#job-type").empty().append(el);
		}
	}
	function refresh() {
		jQuery("#job-fulfillment-center-order").empty().append(JobFulfillmentCenterOrder());
	}
};
