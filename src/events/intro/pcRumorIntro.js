App.Intro.PCRumorIntro = function() {
	const node = new DocumentFragment();

	delete V.showSecExp;

	App.Events.addParagraph(node, [
		`Who you are is something that you will have to define for yourself through your actions. Once you own an arcology, no one will be in a position to apply moral scorekeeping to you. In the brave new world of the Free Cities, you will be free to define yourself as the sum of your actions, rather than as the product of your past. The first decision that will define who you are as an arcology owner is your choice of method in acquiring one.`,
		App.UI.DOM.makeElement("span", `What approach will you take?`, ["intro", "question"])
	]);

	makeOption(
		"A judicious application of funds", "wealth",
		App.Events.makeNode([`Start with <span class="cash inc">extra money,</span> since you were wealthy enough to buy an arcology.`])
	);

	makeOption(
		"Hard work and diligence", "diligence",
		App.Events.makeNode([`New slaves will <span class="hotpink">hate you less,</span> since it will be known that you worked hard to earn your position.`])
	);

	makeOption(
		"The remorseless use of force", "force",
		App.Events.makeNode([`New slaves <span class="gold">will fear you more,</span> since rumors about your violent takeover will inevitably circulate.`])
	);

	makeOption(
		"Clever social engineering", "social engineering",
		App.Events.makeNode([`Start with the <span class="positive">first societal option unlocked,</span> since you manipulated the arcology's citizens.`])
	);

	makeOption(
		"Blind luck", "luck",
		App.Events.makeNode([`Start with a <span class="positive">good reputation,</span> since the story of your unlikely accession will be famous.`])
	);

	return node;

	function makeOption(linkTitle, rumor, desc) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.passageLink(
			linkTitle,
			"Takeover Target",
			() => V.PC.rumor = rumor
		));

		App.UI.DOM.appendNewElement("div", node, desc, ["indent", "note"]);
	}
};
