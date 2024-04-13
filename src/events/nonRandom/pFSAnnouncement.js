App.Events.PFSAnnouncement = class PFSAnnouncement extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() > 5,
			() => V.rep > 3000,
			() => V.FSAnnounced === 0
		];
	}

	execute(node) {
		V.nextButton = "Continue";

		V.FSAnnounced = 1;
		V.FSGotRepCredits = 1;

		App.Events.drawEventArt(node, "assistant");

		const {heA} = getPronouns(assistant.pronouns().main).appendSuffix("A"); // Assistant Awakens doesn't have a rep requirement, but this event does. It's possible for them to trigger in either order.
		App.Events.addParagraph(node, [`The simple pleasure of power has to be experienced to be understood. You often take a moment to stand on a balcony overlooking an interior atrium, watching the living, breathing, flowing current of your demesne. ${capFirstChar(V.assistant.name)} knows to allow you these moments of peace.`]);

		App.Events.addParagraph(node, [`You immediately pay attention, therefore, when ${heA} interrupts. "${properTitle()}," ${heA} says, "this is an appropriate moment to bring a serious matter to your attention. I monitor conversations, social media, and general opinion within the arcology where I can. You are respected, and the inhabitants of this arcology are starting to look to you to give direction to society."`]);

		App.Events.addParagraph(node, [`"This is not a situation that requires your attention," ${heA} continues. "You can continue to lead them by simple example. Or, you can take a more active role in defining the future. The rewards could be considerable. I will make the necessary additions to the arcology management interface to support societal modification."`]);
	}
};
