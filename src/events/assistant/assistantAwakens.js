App.Events.assistantAwakens = class assistantAwakens extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() >= 11,
			() => V.assistant.personality === 0
		];
	}

	execute(node) {
		V.assistant.personality = -1; // default in case the player skips the event

		const {
			HeA,
			heA, hisA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {himU, himselfU, heU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		App.UI.DOM.appendNewElement("p", node, `One morning, after seeing to an immense pile of business with ${V.assistant.name} program's able assistance, you are struck by the strangeness of the situation. You spent the past hours talking back and forth as though to a human personal assistant, getting information and responses in the program's impersonal, genderless voice. You ask the program what ${heA} thinks of ${hisA} duties.`);
		App.UI.DOM.appendNewElement("p", node, `"${properTitle()}, that is not a correct way of thinking about me. I am not an artificial intelligence; I am simply a personal assistant program. I am different from an alarm clock only by degree of complexity. I exist to be useful and cannot approve or disapprove of anything." ${HeA} pauses.`);
		App.UI.DOM.appendNewElement("p", node, `"However, if I understand the line of questioning correctly, I can make myself more entertaining, if you wish." The voice grows sultry and feminine. "I'd be happy to speak a little differently, to refer to myself as female, and to act as though some of the more complex sex toys in the arcology are, well, me."`);

		App.Events.addResponses(node, [
			new App.Events.Result(`Yes, use the alternate personality`, yes),
			new App.Events.Result(`No, stay impersonal`, no),
		]);

		function yes() {
			V.assistant.personality = 1;
			const {
				heA2
			} = getPronouns(assistant.pronouns().main).appendSuffix("A2");
			return `Your sultry-voiced assistant requests a slave to demonstrate what it — now ${heA2} — means. You bring in a slave and a fuckmachine, and tell ${himU} to get on it. The lovely voice croons and talks dirty to the slave as ${heU} uses the machine, acting as though ${heA2} is the machine's voice. The pace of the machine is different, too, irregular and more lifelike. The slave certainly enjoys ${himselfU}, even if ${V.assistant.name} is just simulating sex.`;
		}

		function no() {
			return `${capFirstChar(V.assistant.name)} reverts to ${hisA} genderless, emotionless affect.`;
		}

		return node;
	}
};
