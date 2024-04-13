App.Events.RENoEvent = class RENoEvent extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [[]];
	}

	execute(node) {
		const slave = getSlave(this.actors[0]);
		const {he} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`This is a placeholder event.`]);
		App.Events.addParagraph(node, [App.UI.DOM.slaveDescriptionDialog(slave), `does not currently qualify for any events, so ${he} has been given a generic <span class="devotion inc">devotion</span> and <span class="trust inc">trust</span> boost.`]);

		slave.trust += 2;
		slave.devotion += 2;
	}
};
