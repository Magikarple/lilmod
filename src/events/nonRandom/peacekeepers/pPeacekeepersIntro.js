App.Events.PPeacekeepersIntro = class PPeacekeepersIntro extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => peacekeepersCanBeEstablished(),
			() => V.peacekeepers.state === 1,
		];
	}

	execute(node) {
		let r = [];

		V.nextButton = "Continue";

		Object.assign(V.peacekeepers, {
			generalName: generateSurname("American", "white", true) || "Lemons", strength: 20, attitude: 0, undermining: 0, influenceAnnounced: 0, tastes: "", state : 2
		});
		if (V.continent === "Africa" || V.continent === "Western Europe") {
			V.peacekeepers.generalName = generateSurname("French", "white", true) || "Lemons";
		} else if (V.continent === "Asia" || V.continent === "Australia") {
			V.peacekeepers.generalName = generateSurname("Chinese", "asian", true) || "Lemons";
		} else if (V.continent === "Central Europe" || V.continent === "Scandinavia") {
			V.peacekeepers.generalName = generateSurname("German", "white", true) || "Lemons";
		} else if (V.continent === "Eastern Europe") {
			V.peacekeepers.generalName = generateSurname("Russian", "white", true) || "Lemons";
		} else if (V.continent === "Southern Europe") {
			V.peacekeepers.generalName = generateSurname("Italian", "southern european", true) || "Lemons";
		} else if (V.continent === "Brazil") {
			V.peacekeepers.generalName = generateSurname("Brazilian", "white", true) || "Lemons";
		} else if (V.continent === "Japan") {
			V.peacekeepers.generalName = generateSurname("Japanese", "asian", true) || "Lemons";
		}

		r.push(`The aftermath of the attack on the Free City by forces from the neighboring failed state grows grimmer by the day. Not that the situation isn't without its good points, from your perspective. For one thing, the supply of helpless refugees has never been better. The Free City's victory over the invaders was`);
		if (V.invasionVictory > 2) {
			r.push(`almost completely one-sided. The fighting bore some resemblance to Victorian soldiers of empire machine-gunning native warriors armed with spears. Everyone with any appetite for an attack on the Free City in that area is already quite dead.`);
			V.peacekeepers.attitude += 5;
		} else {
			r.push(`hard-fought, but the attackers did most of the dying. Modern weapons are powerful, especially on the defensive, and there's no appetite in that area to repeat the experiment.`);
		}
		r.push(`There are still enough weapons and desperate people there to keep banditry and warlordism going more or less indefinitely, though.`);

		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`Having the area revert to a Hobbesian wilderness might not be too annoying for you and your peers in the Free City, but to an old world country, it's not a good thing to have next door. And there are still old world countries with the ability and the will to project power. After a spate of bad incidents, rumors have started that the strongest remaining old world nation in this part of the world will be sending a peacekeeping force to stabilize the area. This is a cynical time and the rumors stay just that, rumors, until one day ${V.assistant.name} announces that you're receiving an unscheduled call from a general officer. General ${V.peacekeepers.generalName}, in point of fact. One of the most dynamic military leaders the old world has.`]);
		r = [];

		r.push(`"In a few hours," says the general, "my country is going to announce the deployment of a peacekeeping force to the lawless area next to your Free City." It should sound like a threat, but it doesn't. The general's body language is erect and military, but not intimidating. He continues, "I want to be clear. We intend to stabilize the region. We have no ill intentions toward your Free City, and I see no reason why our interests should ever come into conflict." Despite the direct delivery, he isn't reading from a script that you can see.`);
		if (V.PC.skill.warfare >= 100 && V.invasionVictory > 2) {
			r.push(`"As one warrior to another, that was damn fine work you did defending your city. It's good to see tough people doing well in the Free Cities."`);
			V.peacekeepers.attitude += 5;
		} else {
			r.push(`"I congratulate you on your part in the recent victory. I'm contacting you because you get results. You seem like someone I might be able to work with."`);
		}
		r.push(`He spreads his hands. "I don't have anything to suggest, not yet. But if I see an opportunity for a mutually beneficial arrangement, I wouldn't want to be approaching you for the first time to discuss it."`);

		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`As he spoke, you and ${V.assistant.name} surreptitiously checked out what he said. He seems to be telling the truth, and he's correct that your interests won't be immediately affected. Nevertheless, this is a concerning development. General ${V.peacekeepers.generalName} will have thousands of troops and a lot of military hardware under his able command, more or less right next door to the Free City. He might not intend to overstep the bounds of his peacekeeping mandate, but that's no guarantee that his civilian superiors back home won't decide to order him to. Worse, the politics of the Free Cities are almost unanimously hostile to old world power; there will be public resentment about this. On the other hand, General ${V.peacekeepers.generalName} has been successful in these difficult times in no small part due to his willingness to bend the rules. If he sees an opportunity to work with an ambitious arcology owner in furtherance of his goals, he'll probably take it.`]);
		App.Events.addResponses(node, [
			new App.Events.Result(`Tell him you disapprove of old world meddling in the Free City's sphere of influence`, disapprove),
			new App.Events.Result(`Respond politely, but avoid committing yourself`, noncommittal),
			new App.Events.Result(`Share intelligence on that area as a basis for further cooperation`, agree)
		]);

		function disapprove() {
			V.peacekeepers.attitude -= 10;
			repX(5000, "event");
			return `You tell him that you consider that area within the Free City's area of influence now, and that you disapprove of old world meddling. "Interesting," he says, noncommittal. "It takes real power projection to maintain a real sphere of influence. It remains to be seen whether your Free City has it. In the meantime, we'll pursue our mission." He inclines his head respectfully, and ends the call. Word of your brusque defense of the Free City's growing influence gets around, <span class="reputation inc">greatly improving your reputation.</span>`;
		}

		function noncommittal() {
			return `You respond politely, stating that you're always willing to listen to business proposals, and that you approach each situation without preconceptions. General ${V.peacekeepers.generalName} understands the unspoken subtext, and that you're not willing to commit yourself to anything definite as yet. He understands, and matches your show of respect before ending the call.`;
		}

		function agree() {
			V.peacekeepers.attitude += 5;
			return `You immediately forward him your intelligence dossier on that area, all but the most sensitive items. His eyes widen fractionally as he sees the data coming over the link. Before he can thank you, you offer him good wishes for the success of his mission, and communicate a willingness to work together in the future to advance the stability and prosperity of the whole region. He recovers his equipoise and expresses gratitude, though without committing himself too thoroughly.`;
		}
	}
};
