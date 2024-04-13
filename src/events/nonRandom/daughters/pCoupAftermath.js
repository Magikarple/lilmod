App.Events.PCoupAftermath = class PCoupAftermath extends App.Events.BaseEvent {
	execute(node) {
		let r = [];

		V.nextButton = " "; // hide button until user makes a selection
		V.rival.gender = random(0, 99) <= V.seeDicks ? 2 : 1;
		const {
			HeR,
			heR, himR,
		} = getPronouns({pronoun: (V.rival.gender === 2) ? App.Data.Pronouns.Kind.male : App.Data.Pronouns.Kind.female}).appendSuffix("R");
		const {heA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		const rivalArc = V.rival.state === 2 ? V.arcologies.find(arc => arc.rival === 1) : null;
		V.fcnn.push("...evidence also suggests that the Daughters of Liberty had also planned a terrorist attack on...");

		if (V.mercenaries > 3) {
			r.push(`Your ${V.mercenariesTitle}`);
		} else if (V.mercenaries > 0) {
			r.push(`Your mercenaries`);
		} else if (V.arcologyUpgrade.drones > 0) {
			r.push(`Your security drones`);
		} else {
			r.push(`Private security teams`);
		}
		r.push(`perform the grisly task of disposing of the bodies of the Daughters killed in the assault. They strip them of anything that might be of use in cleaning up after the attempted coup — communication devices, PDAs, computers, even handwritten notes. The raw intel is scanned and passed to ${V.assistant.name}. Most of it is rubbish.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Some of it is not. There is evidence of payments from a ${V.rival.state < 2 ? "nearby Free City" : "neighboring arcology"} to the leadership of the Daughters. ${capFirstChar(V.assistant.name)} is silent for a long time, crosschecking records to assemble a complete picture despite your enemies' attempts to disguise the transactions. Finally, ${V.assistant.name} finishes and displays a picture, using nearly the entire surface of your desk for effect.`);
		if (V.assistant.personality > 0) {
			r.push(`"This," ${heA} says in a tone of satisfaction, "is the`);
			if (V.rival.gender === 2) {
				r.push(`bastard`);
			} else if (V.rival.gender === 1) {
				r.push(`bitch`);
			} else {
				r.push(`cunt`);
			}
			r.push(`you want, ${properTitle()}."`);
		} else {
			r.push(`"This," ${heA} says neutrally, "is the culprit, ${properTitle()}."`);
		}

		r.push(`The face is vigorous, determined, and`);
		if (V.rival.gender === 2) {
			r.push(`masculine. The very stereotype of the male arcology owner.`);
		} else if (V.rival.gender === 1) {
			r.push(`feminine. The very stereotype of the female arcology owner.`);
		} else {
			r.push(`androgynous. The very stereotype of the dissolute arcology owner.`);
		}
		if (rivalArc) {
			r.push(
				`And, as you suspected, it's one of your neighbors. It's the individual who owns`,
				App.UI.DOM.makeElement("span", `${rivalArc.name}.`, ["bold"])
			);
			App.Events.addParagraph(node, r);
			r = [];
		}

		r.push(`Your assistant continues, "${HeR} came into an arcology about when you did, ${properTitle()}. It seems the Daughters originally planned to attack ${himR}, but ${heR} bought them off and sent them after you, instead."`);
		if (V.assistant.personality > 0) {
			r.push(`"I wonder," ${heA} teases, "if ${heR} thinks you're cute, or what?"`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`You inquire as to whether there's any identifiable cause for the evident dislike.`);
		if (V.rival.FS.name !== "") {
			r.push(`"Definitely," says your assistant. "The most cursory review of the recent history of this Free City shows that divergence began with your selection of ${V.rival.FS.name} as a society model for the future. They immediately went the opposite direction."`);
		} else {
			r.push(`"No," says your assistant. "It may be that giving the Daughters an alternative target was necessary and you were simply unlucky. Alternatively, this may be envy of your success; of rising arcology owners, you have come farthest, fastest."`);
		}

		App.Events.addParagraph(node, r);

		const cashTrace = 20000;
		App.Events.addResponses(node, [
			new App.Events.Result(`Contact the culprit privately and discuss the matter`, privately),
			new App.Events.Result(`Reveal the evidence publicly`, publicly),
			new App.Events.Result(`Devote funds to tracing the evidence`, trace, `This will cost ${cashFormat(cashTrace)}`)
		]);

		function privately() {
			const frag = new DocumentFragment();
			let r = [];
			unlock();
			r.push(`Your fellow arcology owner proves very receptive to your missive, as well they might. Your defeat of the Daughters has made a major impact on the willingness of slaveowners to discuss slave revolts in public, and any arcology owner who was proved to be funding anti-slaver violence, even under duress, would be shunned. With very little prompting, ${heR} forwards a <span class="cash inc">huge indemnity payment.</span> It's nowhere near enough to cause bankruptcy, but it's enough to give you a massive advantage should you find yourselves at odds again.`);
			cashX(100000, "war");
			V.maximumRep += 7500;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function publicly() {
			const frag = new DocumentFragment();
			let r = [];
			unlock();
			r.push(`Free Cities society is understandably reluctant to condemn, never mind depose, arcology owners. The precedent of removing one would be bad, even if the public brought enough strength together to accomplish it. Your evidence looks quite bad, but isn't so incontrovertible as to cause your fellow aristocrats to take such a drastic measure. Nonetheless, the public is aghast at the spectacle of an arcology owner funding an attack on another. Opinion <span class="reputation inc">rallies</span> around you, and you even receive some discreet <span class="cash inc">donations,</span> delivered with the intimation that they are to be used against your enemy. There is stony silence from the Daughters' backer; today, you began a real inter-arcology war.`);
			repX(1000, "war");
			cashX(10000, "war");
			V.maximumRep += 7500;
			V.rival.power = 1;
			if (rivalArc) {
				rivalArc.embargo = 2;
				rivalArc.embargoTarget = 0;
				rivalArc.influenceTarget = 0;
				V.rival.prosperity = rivalArc.prosperity;
			} else {
				V.rival.prosperity = V.arcologies[0].prosperity;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function trace() {
			const frag = new DocumentFragment();
			let r = [];
			unlock();
			r.push(`The money flows out, and the information flows in. You are rewarded with a reasonably complete picture of your rival's operations. The intelligence will be extremely useful going forward, since by gathering it, you sent an unmistakable signal that you do not consider the matter closed. There is stony silence from the Daughters' backer; today, you began a real inter-arcology war. But, with this information, you can maintain it from a position of advantage.`);
			cashX(-cashTrace, "war");
			V.maximumRep += 7500;
			V.rival.power = 5;
			if (rivalArc) {
				rivalArc.embargo = 3;
				rivalArc.embargoTarget = 0;
				rivalArc.influenceTarget = 0;
				V.rival.prosperity = rivalArc.prosperity;
			} else {
				V.rival.prosperity = V.arcologies[0].prosperity;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		/** unlock Continue button */
		function unlock() {
			V.nextButton = "Continue";
			App.Utils.updateUserButton();
		}
	}
};
