App.Events.SEProjectNBubbles = class SEProjectNBubbles extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.status === 3,
			() =>	(V.projectN.wellFunded === 1 && App.Events.effectiveWeek() >= V.projectN.phase2 + 4) ||
					(V.projectN.wellFunded !== 1 && App.Events.effectiveWeek() >= V.projectN.phase2 + 6)
		];
	}

	execute(node) {
		V.projectN.status = 4;
		V.projectN.phase3 = App.Events.effectiveWeek();

		App.Events.addParagraph(node, [`You check in on the genelab, and are pleased to see that project N is making a great deal of progress. What was once an indistinguishable fleshy mass in a tube of mysterious green liquid looks now more like a small, unconscious humanoid body, pink-fleshed and nude, with a set of pointy triangular ears atop its bald head that vaguely resemble a cat. Doctor Nieskowitz steps up to you as you examine the growing body, actually smiling for once.`]);
		App.Events.addParagraph(node, [`"Ah, I see you've seen our latest progress. I'm quite proud of the team's work so far, you know – five months ago I would have said this kind of genetic splicing was simply impossible. But there's no better scientific feeling than proving yourself wrong, eh? Anyway, we've started to refer to the subject as 'Bubbles', on account of the–" The doctor is interrupted by a slight thrashing movement from the unconscious body, which produces a short span of bubbling within the tube's liquid. "...well, that. But anyway, since you're funding the project and she'll be your property once we finish, I thought it best to ask you your opinion on the matter of a real name before we proceed any further."`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Bubbles is a good name`, bubbles),
			new App.Events.Result(`I had something else in mind`, rename)
		]);

		function bubbles() {
			return `You tell Nieskowitz that you like the name the scientists have chosen. He nods a couple times, jots something down in a notepad, and then returns to his work on subject delta - or, rather, on Bubbles.`;
		}

		function rename() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [
				`You tell the waiting bioengineers that you'll be formally naming the growing catgirl `,
				App.UI.DOM.makeTextBox(V.subjectDeltaName, (v) => V.subjectDeltaName = v),
				`Nieskowitz nods, jots something down in a notepad, and then lets you know that he'll update you on the situation as it develops.`
			]);
			return frag;
		}
	}
};
