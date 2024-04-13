App.Events.PShootInvitation = class PShootInvitation extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	get eventName() {
		return "Shoot Invitation";
	}

	execute(node) {
		let r = [];
		r.push(`${capFirstChar(V.assistant.name)} usually delays message delivery when you're relieving your sexual needs with your property, but messages from other arcology owners have a special priority. This one is a brief but rather well-spoken audio invitation from one of your more notoriously wealthy peers.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`"A week from today, I will be hosting a novel sporting event for the well-to-do. A new tradition, if it's as diverting as I hope. If you wish to take part in a very exclusive contest of marksmanship, exhibitionism, and grace under pressure, buy in. Five thousand. And, believe me, you have a fine chance to come out ahead."`);
		App.Events.addParagraph(node, r);

		const responses = [];
		responses.push(new App.Events.Result(`Buy in`, buy));
		responses.push(new App.Events.Result(`Politely decline`, decline));

		App.Events.addResponses(node, responses);

		function buy() {
			cashX(-5000, "event");
			App.Events.queueEvent(1, new App.Events.PShootResult());
			return `You receive a brief but elegant confirmation. It looks like you've RSVP'd.`;
		}
		function decline() {
			return `You decline the invitation.`;
		}
	}
};
