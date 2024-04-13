App.Intro.PCPregIntro = function() {
	const node = new DocumentFragment();

	App.Events.addParagraph(node, [
		`You have a working female reproductive system, and thus, a menstrual cycle. Women already face hardships as slaveowners and arcology owners, and being with child, coupled with a strong societal aversion to the dominant being penetrated, leads most pregnant owners to find themselves in dire situations. As an added precaution, since nothing stops an owner from hooking up with another owner, contraceptives are common amongst free women.`,
		App.UI.DOM.makeElement("span", `What's your stance on taking contraceptives?`, ["intro", "question"])
	]);

	// <p>
	let r = [];
	let linkArray = [];
	r.push(`You're`);
	if (V.PC.preg === -1) {
		r.push(`not interested in being a mother.`);
		linkArray.push(App.UI.DOM.passageLink(
			"Risky",
			"PC Preg Intro",
			() => V.PC.preg = 0
		));
	} else if (V.PC.preg === 0) {
		r.push(`fertile and you know the risks.`);
		linkArray.push(App.UI.DOM.passageLink(
			"Safe",
			"PC Preg Intro",
			() => V.PC.preg = -1
		));
		linkArray.push(App.UI.DOM.passageLink(
			"About that...",
			"PC Preg Intro",
			() => V.PC.preg = 10
		));
	} else if (V.PC.preg > 42) {
		r.push(`proudly pregnant with octuplets and they are coming right now.`);
		linkArray.push(App.UI.DOM.passageLink(
			"Not pregnant",
			"PC Preg Intro",
			() => {
				V.PC.preg = 0;
				V.PC.pregType = 0;
				V.PC.labor = 0;
			}
		));
	} else if (V.PC.preg > 37) {
		r.push(`${V.PC.preg} weeks pregnant and very close to being due.`);
		linkArray.push(App.UI.DOM.passageLink(
			"Not pregnant",
			"PC Preg Intro",
			() => {
				V.PC.preg = 0;
				V.PC.pregType = 0;
			}
		));
		linkArray.push(App.UI.DOM.passageLink(
			"Overdid the fertility agents",
			"PC Preg Intro",
			() => {
				V.PC.preg = 43;
				V.PC.pregType = 8;
				V.PC.labor = 1;
			}
		));
	} else {
		r.push(`already pregnant.`);
		linkArray.push(App.UI.DOM.passageLink(
			"Fertile",
			"PC Preg Intro",
			() => V.PC.preg = 0
		));
		linkArray.push(App.UI.DOM.passageLink(
			"Make that very pregnant",
			"PC Preg Intro",
			() => V.PC.preg = 40
		));
	}
	App.Events.addParagraph(node, [
		r.join(" "),
		App.UI.DOM.generateLinksStrip(linkArray),
		App.UI.DOM.makeElement("span", `Being or becoming pregnant will raise difficulty.`, "note")
	]);

	App.UI.DOM.appendNewElement("p", node, `Hormones can be an interesting thing, but how do they affect you?`, ["intro", "question"]);

	r = [];
	r.push(`You're`);
	if (V.PC.pregMood === 1) {
		r.push(`gentle and motherly when you're hormonal.`);
	} else if (V.PC.pregMood === 0) {
		r.push(`in complete control of yourself.`);
	} else {
		r.push(`aggressive and domineering when you're hormonal.`);
	}
	const options = new App.UI.OptionsGroup();
	options.addOption(r.join(" "), "pregMood", V.PC)
		.addValueMap(new Map([
			["Normal", 0],
			["Motherly", 1],
			["Aggressive", 2]
		]))
		.addComment(`Hormone induced moods may alter some sex scenes, as well as change slaves' reactions to you.`);
	node.append(options.render());

	App.UI.DOM.appendNewElement("p", node, App.UI.DOM.passageLink(
		"Confirm player character customization",
		"PC Experience Intro"
	));
	return node;
};

