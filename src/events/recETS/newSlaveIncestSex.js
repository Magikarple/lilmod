/**
 *
 * @param {App.Entity.SlaveState} relative
 * @param {App.Entity.SlaveState} relative2
 * @returns {HTMLElement}
 */
globalThis.newSlaveIncestSex = function(relative, relative2) {
	function incestAction() {
		if (V.event) {
			switch (V.event.eventName) {
				case "Identical Hermaphrodite Pair":
					return "identical hermaphrodite twincest";
				case "Identical Pair":
					return "identical sister twincest";
				case "Twin Brother Incest":
					return "brother-brother twincest";
				case "Twin Sister Incest":
					return "sister-sister twincest";
				case "Twins Mixed Incest":
					return "brother-sister twincest";
				case "Matched Pair":
					return "'sister'-sister twincest";
				default:
					return V.event.eventName.toLowerCase().replace(" ", "-").replace("-incest", " incest");
			}
		} else {
			return "";
		}
	}
	const eventName = incestAction();
	const div = document.createElement("div");
	App.Events.drawEventArt(div, [relative, relative2], "no clothing");
	const {
		he, his, sister
	} = getPronouns(relative);
	const {
		he2, his2,
	} = getPronouns(relative2).appendSuffix("2");

	/* setup identifiers */
	const one = relativeTerm(relative2, relative); // relative is relative2's blank
	const other = relativeTerm(relative, relative2); // relative2 is relative's blank

	let oneLong;
	let otherLong;
	if (one === other) {
		/* two sisters / brothers: identify by age, in the case of same age twins check their birthWeek */
		if (relative.actualAge === relative2.actualAge) {
			if (relative.birthWeek >= relative2.birthWeek) {
				oneLong = `older ${one}`;
				otherLong = `younger ${other}`;
			} else if (relative.birthWeek < relative2.birthWeek) {
				oneLong = `younger ${one}`;
				otherLong = `older ${other}`;
			}
		} else if (relative.actualAge > relative2.actualAge) {
			oneLong = `older ${one}`;
			otherLong = `younger ${other}`;
		} else if (relative.actualAge < relative2.actualAge) {
			oneLong = `younger ${one}`;
			otherLong = `older ${other}`;
		}
	} else {
		oneLong = one;
		otherLong = other;
	}

	// prepare some text passages based on options
	const actions = [];
	const secretions = [];
	const genitalsArray = [];
	if (relative.skill.oral >= 11 || relative2.skill.oral >= 11) {
		if (relative.dick === 0 || relative2.dick === 0) { // at least one vagina is present
			actions.push("clit-flinging tongue-action");
			secretions.push("femcum");
			genitalsArray.push("licked wet cunt");
		}
		if (relative.dick !== 0 || relative2.dick !== 0) { // at least one penis is present
			actions.push("nose-pressed-against-balls deep-throats");
			secretions.push("semen");
			genitalsArray.push("limp dangling cock");
		}
	} else {
		actions.push("intense french tongue-action");
		secretions.push("saliva");
		genitalsArray.push("wet mouth");
	}
	const genitals = (genitalsArray.length === 1) ? genitalsArray[0] + "s" : genitalsArray.join(" and ");

	if (V.debugMode) {
		App.Events.addResponses(div, [
			new App.Events.Result(`Debug info`, debug)
		]);
	}

	const choices = [];
	choices.push(new App.Events.Result(`Order them to demonstrate their love for each other`, demonstrate));
	// choices.push(new App.Events.Result(`Show them how cruel life in your arcology can be`, cruel));
	App.Events.addResponses(div, choices);

	return div;

	function demonstrate() {
		const frag = new DocumentFragment();
		let r = [];
		r.push(`Now that you own them, you want to see proof of their love for each other. You order the`);
		if (one === "twin") {
			r.push(`twins`);
		} else if (one === other) {
			r.push(`${sister}s`);
		} else {
			r.push(`${one} and ${other}`);
		}
		r.push(`to perform mutual oral sex in front of you. Hesitantly, they assume the 69 position on your couch. They have either never done this in front of a stranger or have never had sex this way before. You remind them that they are sex slaves now. They need to follow all orders, including sexual ones, so this is a relatively gentle start.`);

		App.Events.addParagraph(frag, r);
		r = [];
		if (one === "twin") {
			r.push(`One ${one}`);
		} else {
			r.push(`The ${oneLong}`);
		}
		r.push(`shows more boldness as ${he} lowers ${his} head towards ${his} ${otherLong}'s privates.`);
		if (relative2.dick === 0) {
			r.push(`Carefully, ${he} spreads ${his} ${other}'s labia. Then ${he} continues to give ${his} ${other}'s exposed pussy a few experimental licks. At first, ${his} efforts seem to be futile, but after a while the ${otherLong}'s clit becomes engorged and ${his2} juices start flowing.`);
		} else {
			r.push(`Uncertain, ${he} grabs ${his}`);
			if (other === "twin") {
				r.push(`${other}'s`);
			} else {
				r.push(`${otherLong}'s`);
			}
			r.push(`penis. Then ${he} puts ${his} ${other}'s flaccid member into ${his} mouth and gives it an experimental suck. At first, ${his} efforts seem to be futile, but after a while the ${otherLong} sports a nice, hard erection.`);
		}
		r.push(`As the ${other}'s arousal grows, ${he2} becomes more eager to please ${his2} ${oneLong}, too. Going down on ${his2} lover's genitals, ${he2} starts to mimic ${his} ministrations.`);
		if ((relative.dick === 0) !== (relative2.dick === 0)) {
			r.push(`Of course, ${he2} has to adapt ${his2} actions`);
			if (relative.dick === 0) {
				r.push(`from the feelings on ${his2} dick to the pussy pressed against ${his2} lips.`);
			} else {
				r.push(`from the feelings at ${his2} pussy to the dick in ${his2} mouth.`);
			}
		}
		App.Events.addParagraph(frag, r);

		App.Events.addParagraph(frag, [`You can tell how uncomfortable they are with you watching them, but as they become increasingly worked up, they lose their inhibitions. Soon, you are watching some fairly enthralling ${eventName} action in your office${(actions.length) ? `, including some enthusiastic ${actions.join(" and ")}`: ``}. Eventually, they bring each other to impressive mutual orgasms. Their lusty moans are muffled only by each other's crotches. Spent, exhausted, and with their faces covered in each other's ${secretions.join(" and ")}, they untangle to rest comfortably on your couch.`]);

		App.Events.addParagraph(frag, [`You indicate them to present themselves to you. Still shaking from the aftershocks of their orgasms, they stand side by side in front of you, panting, naked and with their ${genitals} dripping mixed juices. You simply nod, showing your approval. They are visibly relieved, and not only sexually. They are more confident of having made the right choice in enslaving themselves to you, since you seem <span class="mediumaquamarine">trustworthy</span> and <span class="hotpink">sympathetic.</span> They hug again, kissing and licking the sexual fluids off each other's stained faces.`]);

		for (const rel of [relative, relative2]) {
			rel.devotion += 4;
			rel.trust += 4;
		}
		seX(relative, "oral", relative2, "oral");

		return frag;
	}

	function cruel() {
		const frag = new DocumentFragment();
		let r = [];
		// TODO: this needs to be written
		App.Events.addParagraph(frag, r);
		relative.devotion -= 4;
		relative.trust -= 4;
		relative2.devotion -= 4;
		relative2.trust -= 4;
		seX(relative, "oral", relative2, "oral");
		return frag;
	}

	function debug() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", frag, `1st relative slave`);
		const rel1 = [
			`${one} (relationship: ${relative.relationship}, ID: ${relative.ID}, relationshipTarget: ${relative.relationshipTarget})`,
			`Age: ${relative.physicalAge}`,
			`Pronouns: ${he} / ${his}`,
		];
		for (const string of rel1) {
			App.UI.DOM.appendNewElement("div", frag, string);
		}
		App.UI.DOM.appendNewElement("h3", frag, `2nd relative slave`);
		const rel2 = [
			`${other} (relationship: ${relative2.relationship}, ID: ${relative2.ID}, relationshipTarget: ${relative2.relationshipTarget})`,
			`Age: ${relative2.physicalAge}`,
			`Pronouns: ${he2} / ${his2}`,
		];
		for (const string of rel2) {
			App.UI.DOM.appendNewElement("div", frag, string);
		}

		return frag;
	}
};
