App.Events.SENicaeaCouncil = class SENicaeaCouncil extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.nicaea.held !== 1,
			() => FutureSocieties.isActive('FSChattelReligionist'),
			() => V.nicaea.involvement >= 0,
			() => V.nicaea.eventWeek !== V.week
		];
	}

	execute(node) {
		let r = [];
		let nicaeaRolls = {
			focus: random(-1, 0),
			assignment: random(-1, 0),
			achievement: random(-1, 0)
		};

		if (V.nicaea.held !== 1) { // initialize on first render only
			V.nicaea.focus = either("owners", "slaves");
			V.nicaea.assignment = either("please you", "serve the public", "whore");
			V.nicaea.achievement = either("devotion", "slaves", "trust");
			V.nicaea.held = 1;
			V.arcologies[0].FSChattelReligionistCreed = 1;
			V.nicaea.eventWeek = V.week;
		}

		if (V.nicaea.involvement === 0) {
			V.arcologies[0].FSChattelReligionistCreed = 1;
			App.Events.addParagraph(node, [`The ${V.nicaea.name} is held in another arcology, without your involvement. Your abstention has weakened it. It authored a creed which the Council claims all good Chattel Religionists should subscribe. Most of it is uncontroversial, giving beliefs about slavery and faith that virtually all Chattel Religionists agree on. However, the new creed does purport to settle three major points of contention.`]);

			r.push(`First, it emphasizes`);
			if (V.nicaea.focus === "slaves") {
				r.push(`slaves throughout. The creed goes so far as to imply that slaveowners have a duty to slaves, which they fulfill by providing them the opportunity to enjoy the holy and pure state of being a sex slave.`);
			} else {
				r.push(`reverence for and obedience to slaveowners. This is not likely to have a great impact on slaves, but it affirms the total superiority of slaveowners and is likely to attract wealthy religious people from the old world.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`Second, one of the ways it states that free people can make their devotions is to`);
			if (V.nicaea.assignment === Job.WHORE) {
				r.push(`fuck a slave whore. Not surprisingly, this will increase demand for prostitutes.`);
			} else if (V.nicaea.assignment === Job.PUBLIC) {
				r.push(`fuck a public slut. Not surprisingly, this will increase demand for public servants.`);
			} else {
				r.push(`have sex with one's slaves. This will likely increase respect for those that keep their own fucktoys.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`Third, the aspirational part of the creed for slaveowners focuses on`);
			if (V.nicaea.achievement === "slaves") {
				r.push(`owning many slaves to spread the gift of sexual slavery as widely as possible. This will increase respect for people who own many sex slaves, regardless of how they're used.`);
			} else if (V.nicaea.achievement === "devotion") {
				r.push(`making slaves worshipful. Naturally, this will increase respect for people with many devoted slaves.`);
			} else {
				r.push(`building slaves' trust. Naturally, this will increase respect for people with many trusting slaves.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
			App.UI.DOM.appendNewElement("p", node, `Since you did not participate in the Council, ${V.arcologies[0].name} does not subscribe to the creed. It is effectively a policy. Its impacts can be reviewed from the policy menu, and conformity to the creed can be decided from the policy menu if you decided to change it.`, "note");
		} else {
			r.push(`The ${V.nicaea.name} is held in your arcology. Everyone in attendance is agreed that a Chattel Religionist creed should be created to give the faith a set of shared beliefs to unify and drive it. Many parts of the creed are uncontroversial, but there are three great controversies to be decided: whose role in slavery is most important in Chattel Religionism, which assignment best exemplifies a Chattel Religionist slave's sacred sexual servitude, and what a Chattel Religionist slaveowner should most aspire to achieve. All the slaveowners who are participating have committed to support whatever the Council decides collectively,`);
			if (V.nicaea.power > 1) {
				r.push(`and the strong Council should be able to promulgate a strong creed.`);
			} else {
				r.push(`but the weak Council may lead to a weak creed.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
		}

		const container	= App.UI.DOM.appendNewElement("div", node);
		if (V.nicaea.involvement !== 0) {
			container.append(councilInfluence());
		}

		function spendInfluence() {
			V.nicaea.influence -= 1;
			$(container).empty().append(councilInfluence());
		}

		/**
		 * @typedef {object} NicaeaChoice
		 * @property {string} text
		 * @property {string} value
		 */
		/**
		 * @param {"focus"|"assignment"|"achievement"} group
		 * @param {NicaeaChoice[]} choices
		 */
		function makeInfluenceGroup(group, choices) {
			return choices.map(c =>
				App.UI.DOM.makeElement("div", App.UI.DOM.link(c.text, () => {
					nicaeaRolls[group]++;
					if (nicaeaRolls[group] > 0) {
						V.nicaea[group] = c.value;
					}
					spendInfluence();
				}))
			);
		}

		function councilInfluence() {
			const frag = new DocumentFragment();
			if (V.nicaea.influence > 0) {
				r.push(`The Council is ongoing, and you have`);
				if (V.nicaea.influence > 2) {
					r.push(`an immense`);
				} else if (V.nicaea.influence > 1) {
					r.push(`a large`);
				} else {
					r.push(`some`);
				}
				r.push(`leverage with the rest of the Council to influence the Council's decisions.`);

				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`On the first question, the great debate is between those Chattel Religionists who focus on their slaves and those who think that the focus should be on the slaveowner. The former vaunt the pure, holy state of grace to which a well trained slave can attain, and describe slaveowning as a positive duty, arguing that slaveowners must work to help their slaves attain purity, not exploit or torment them. The latter consider this belief inverted and dangerous, and think that slaves' primary role is to serve and revere their owners, making the whim and caprice of the owner sacred. The group whose role is placed centrally in the creed will likely get more enjoyment from its role in Chattel Religionism.`);
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`A majority of the Council currently supports deciding this question in favor of`);
				if (V.nicaea.focus === "slaves") {
					r.push(App.UI.DOM.makeElement("span", `the slave centrality.`, "bold"));
				} else {
					r.push(App.UI.DOM.makeElement("span", `the slaveowner centrality.`, "bold"));
				}
				App.Events.addParagraph(frag, r);
				r = [];

				App.Events.addParagraph(frag, makeInfluenceGroup("focus", [
					{text: `Support the slave centrality`, value: "slaves"},
					{text: `Support the slaveowner centrality`, value: "owners"}
				]));

				App.Events.addParagraph(frag, [`On the second question, there are advocates for holy prostitution, sacred public sluts, and pure private harems. Whatever is decided, Chattel Religionism will continue to support and advocate for slaves performing all these roles. This decision will be most important in how it affects Chattel Religionist citizens. The question is whether the creed should encourage free people to patronize slave whores, have sex with public sluts, or purchase and keep their own sex slaves and respect those who have large harems of them? The effectiveness of slaves on the emphasized assignment will be improved.`]);

				r.push(`A majority of the Council currently supports deciding this question in favor of`);
				if (V.nicaea.assignment === Job.WHORE) {
					r.push(App.UI.DOM.makeElement("span", `prostitution.`, "bold"));
				} else if (V.nicaea.assignment === Job.PUBLIC) {
					r.push(App.UI.DOM.makeElement("span", `public service.`, "bold"));
				} else {
					r.push(App.UI.DOM.makeElement("span", `fucktoy duty.`, "bold"));
				}
				App.Events.addParagraph(frag, r);
				r = [];

				App.Events.addParagraph(frag, makeInfluenceGroup("assignment", [
					{text: `Support prostitution`, value: "whore"},
					{text: `Support public service`, value: "serve the public"},
					{text: `Support fucktoy duty`, value: "please you"}
				]));

				App.Events.addParagraph(frag, [`On the third question, some with seats on the Council think owning sex slaves is the crux of being a good Chattel Religionist, because it gives the slaves the proper and pure experience of sexual slavery. Owning many sex slaves would therefore confer respect. Others believe in good works, and think that trust in slaves is the surest indication of a good slaveowner, and the only proper mark worth looking up to. Finally, and inevitably, some think worshipful slaves are a more appropriate measure of how righteous a slaveowner is.`]);

				r.push(`A majority of the Council currently supports deciding this question in favor of`);
				if (V.nicaea.achievement === "slaves") {
					r.push(App.UI.DOM.makeElement("span", `owning slaves.`, "bold"));
				} else {
					r.push(App.UI.DOM.makeElement("span", `${V.nicaea.achievement}.`, "bold"));
				}
				App.Events.addParagraph(frag, r);
				r = [];

				App.Events.addParagraph(frag, makeInfluenceGroup("achievement", [
					{text: `Support owning many slaves`, value: "slaves"},
					{text: `Support trust`, value: "trust"},
					{text: `Support devotion`, value: "devotion"}
				]));

				App.Events.addParagraph(frag, [
					App.UI.DOM.link("Conclude the Council",	() => {
						repX(V.nicaea.influence * 10000, "event");
						V.nicaea.influence = 0;
						$(container).empty().append(councilInfluence());
					}),
					App.UI.DOM.makeElement("span", "This will let the currently prevailing views stand, and convert your remaining influence with the Council into general reputation", "note")
				]);
			} else {
				r.push(`The Council has concluded.`);
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`The first question was decided in favor of`);
				if (V.nicaea.focus === "slaves") {
					r.push(App.UI.DOM.makeElement("span", `the slave centrality.`, "bold"));
				} else {
					r.push(App.UI.DOM.makeElement("span", `the slaveowner centrality.`, "bold"));
				}
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`The second question was decided in favor of`);
				if (V.nicaea.assignment === Job.WHORE) {
					r.push(App.UI.DOM.makeElement("span", `prostitution.`, "bold"));
				} else if (V.nicaea.assignment === Job.PUBLIC) {
					r.push(App.UI.DOM.makeElement("span", `public service.`, "bold"));
				} else {
					r.push(App.UI.DOM.makeElement("span", `fucktoy duty.`, "bold"));
				}
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(
					`The third question was decided in favor of`,
					App.UI.DOM.makeElement("span", `${(V.nicaea.achievement === "slaves") ? "owning slaves" : V.nicaea.achievement}.`, "bold")
				);
				App.Events.addParagraph(frag, r);
				r = [];

				App.UI.DOM.appendNewElement("p", frag, `The creed has now taken effect in ${V.arcologies[0].name}. It is effectively a policy. Its impacts can be reviewed from the policy menu, and conformity to the creed can be decided from the policy menu if you decided to change it.`, "note");
			}
			return frag;
		}
	}
};
