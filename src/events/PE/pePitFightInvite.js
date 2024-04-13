App.Events.PEPitFightInvite = class PEPitFightInvite extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.BodyguardID !== 0,
		];
	}

	execute(node) {
		let r = [];
		const slave = S.Bodyguard;
		const {he} = getPronouns(slave);

		r.push(`Gladiatorial combat between slaves has not yet reached the level of social acceptability it once enjoyed in Rome, but it's growing in popularity. For now, most fights are discreet affairs limited to select guests. Displaying a slave bodyguard is an excellent way to get yourself invited to participate, and ${V.assistant.name} has just passed on an invitation to a private fight next week, should you be willing to hazard a bodyguard.`);
		App.Events.addParagraph(node, r);
		r = [];
		if (V.pit) {
			r.push(`Of course, ${capFirstChar(V.pit.name)} in ${V.arcologies[0].name} sees regular fights${(V.pit.lethal > 0) ? " to the death" : ""}, but there's something extra special about attending these outside fights${(V.pit.lethal > 0) ? ", especially with the very real risk of violent death" : ""}.`);
		}
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Enter your bodyguard as a gladiatrix`, enterBG),
			new App.Events.Result(`Politely decline`, decline),
		]);

		function enterBG() {
			App.Events.drawEventArt(node, S.Bodyguard);
			App.Events.queueEvent(1, new App.Events.PEPitFight());
			return `You receive a brief confirmation. It looks like ${he}'s got a fight.`;
		}

		function decline() {
			return `You decline the invitation.`;
		}
	}
};

