App.Intro.PCExperienceIntro = function() {
	const node = new DocumentFragment();

	V.showSecExp = V.showSecExp || 0;

	if (V.PC.career === "arcology owner") {
		setTimeout(() => Engine.play("PC Rumor Intro"), Engine.minDomActionDelay);
	}
	if (!V.disableForcedCareers) {
		V.disableForcedCareers = V.PC.actualAge >= 22 ? 1 : 0;
	}
	App.Events.addParagraph(node, [
		`You're a relative unknown in the Free Cities, but it's clear you're already accomplished. The meek and average cannot aspire to acquire arcologies. You've got all the necessary skills to take over an arcology and succeed as its owner, but you should be able to leverage the skills and experience you retain from your past, too.`,
		App.UI.DOM.makeElement("span", `What career brought you to the Free Cities?`, ["intro", "question"])
	]);

	makeOption(
		"Idle wealth", "wealth",
		App.Events.makeNode([`Start with <span class="cash inc">extra money.</span>${(V.showSecExp === 1) ? ` However, you will find it <span class="red">harder to maintain authority,</span> but <span class="cash inc">propaganda hub upgrades will be cheaper.</span>` : ``} Your starting slaves will have two free levels of <span class="cyan">sex skills</span> available.`])
	);

	makeOption(
		"Venture capitalism", "capitalist",
		App.Events.makeNode([`You will be more <span class="positive">effective at business pursuits.</span>${(V.showSecExp === 1) ? ` In addition, <span class="cash inc">propaganda hub upgrades will be cheaper.</span>` : ``} Your starting slaves will have a free level of <span class="cyan">prostitution skill</span> available.`])
	);

	makeOption(
		"Private military work", "mercenary",
		App.Events.makeNode([
			`You retain mercenary contacts ${(V.showSecExp === 1) ? `and your security skills will make it <span class="positive">easier to keep the arcology safe.</span> Also, <span class="cash inc">security HQ upgrades will be cheaper.</span>` : `and security skills.`}`,
			`Your starting slaves will have <span class="positive">free trust available.</span>`
		])
	);

	makeOption(
		"Slaving", "slaver",
		App.Events.makeNode([
			`Your slave breaking experience will be useful. ${(V.showSecExp === 1) ? `You will find that authority will be <span class="positive">easier to maintain</span> and <span class="cash inc">security HQ upgrades will be cheaper.</span>` : ""}`, `Your starting slaves will have free <span class="hotpink">devotion</span> available.`
		])
	);

	makeOption(
		"Engineering", "engineer",
		App.Events.makeNode([`<span class="cash inc">Upgrading the arcology will be cheaper.</span> Also, the arcology will start with <span class="cash inc">basic economic upgrades</span> already installed.`])
	);

	makeOption(
		"Surgery", "medicine",
		App.Events.makeNode([`Surgery will be <span class="cash inc">cheaper</span> and <span class="positive">healthier</span> and <span class="cash inc">drug upgrades will be cheaper.</span> Your starting slaves will have free implants available.`])
	);

	makeOption(
		"Minor celebrity", "celebrity",
		App.Events.makeNode([
			`Start with <span class="positive">extra reputation.</span>${(V.showSecExp === 1) ? ` In addition, <span class="cash inc">propaganda hub upgrades will be cheaper.</span>` : ``}`,
			`Your starting slaves will have a free level of <span class="cyan">entertainment skill</span> available.`
		])
	);

	makeOption(
		"Sex industry", "escort",
		App.Events.makeNode([
			`As an ex-whore, you will find it <span class="red">hard to maintain reputation${(V.showSecExp === 1) ? `, in addition to authority` : ``}.</span>`,
			`Your starting slaves will have a free level of <span class="cyan">sex skills</span> available, along with a free level of <span class="cyan">entertainment and prostitution.</span>`])
	);

	makeOption(
		"Servant", "servant",
		App.Events.makeNode([
			`As an ex-servant, you will find it <span class="red">hard to maintain reputation${(V.showSecExp === 1) ? `, in addition to authority` : ``}.</span>`, `You know how to <span class="cash inc">lower your upkeep,</span> but <span class="red">not much else.</span> Your starting slaves will have free <span class="mediumaquamarine">trust</span> and <span class="hotpink">devotion.</span>`
		])
	);

	makeOption(
		"Gang affiliation", "gang",
		App.Events.makeNode([
			`As an ex-gang member, you know how to haggle slaves.${(V.showSecExp === 1) ? `In addition, asserting your authority <span class="positive">will be easier</span> and <span class="cash inc">security HQ upgrades will be cheaper.</span>` : ``}`, `However, you will <span class="red">find reputation quite hard</span> to maintain. Your starting slaves will be <span class="positive">fitter</span> and possess a free level of <span class="cyan">combat skill.</span>`
		])
	);

	makeOption(
		"Incursion Specialist", "BlackHat",
		App.Events.makeNode([
			`As an ex-hacker, you know how to gain access computer systems and other devices. <span class="positive">Certain upgrades will be cheaper</span> and you may find alternative approaches to problems.${(V.showSecExp === 1) ? `However, you will <span class="red">find authority quite hard</span> to maintain.` : ""}`,
			`Your starting slaves will have a free level of <span class="cyan">intelligence.</span>`
		])
	);

	function makeOption(linkTitle, career, desc) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.passageLink(
			linkTitle,
			"PC Rumor Intro",
			() => V.PC.career = App.UI.Player.assignCareerByAge(career)
		));

		App.UI.DOM.appendNewElement("div", node, desc, ["indent", "note"]);
	}

	const options = new App.UI.OptionsGroup();

	options.addOption(`Security Expansion Mod effects`, "showSecExp")
		.addValueList([
			["Hide", 0],
			["Show", 1],
		]);

	const option = options.addOption(`Forced career choices`, "disableForcedCareers")
		.addValue("Disable", 0);
	let r = [];
	if (V.PC.actualAge < 14) {
		r.push(`Due to your young age, you will be given the child variant of your chosen career line.`);
	} else if (V.PC.actualAge < 22) {
		r.push(`Due to your age, you will be given the inexperienced variant of your chosen career line.`);
	}
	r.push(`Over time and with effort, you will be capable of achieving everything of importance in the adult careers.`);
	option.addComment(r.join(" "));
	if (V.PC.actualAge < 22) {
		option.addValue("Enable", 1)
			.addComment("Use age based careers.");
	}
	node.append(options.render());

	return node;
};
