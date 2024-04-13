App.Events.RESSEliteBreederPlease = class RESSEliteBreederPlease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => FutureSocieties.isActive('FSRestart'),
			() => !!V.propOutcome,
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.breedingMark === 0,
				s => s.devotion > 50,
				s => s.trust > 20,
				s => isFertile(s),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, he, his, him
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		const r = new SpacedTextAccumulator(node);

		r.push(
			`You're startled out of a reverie one day by a sudden, timid knock on the frame of your office door. You look up to see`,
			contextualIntro(V.PC, eventSlave, true),
			`standing there, shyly waiting for your permission to enter. You give it silently with a beckoning motion of the hand. After a couple false starts, ${he} finally ${say}s, "${Spoken(eventSlave, `${Master}, can you make me one of your breeders? I would love to use my body to carry your babies.`)}"`);

		r.toParagraph();

		App.Events.addResponses(node, [
			new App.Events.Result(`Agree`, agree, `This option costs ${cashFormat(5000)} and will sterilize ${him} if ${he} is not deemed worthy of breeding`),
			new App.Events.Result(`Refuse`, refuse),
		]);

		return r.container();

		function agree() {
			const div = document.createElement("div");
			const r = new SpacedTextAccumulator(div);

			r.push(`Having a slave so eager to become a breeder always makes you smile inwardly, but you don't allow your expression to change. Instead, you silently stand up from your chair and make a show of contemplating ${his} request. ${eventSlave.slaveName} waits with bated breath, letting out an audible sigh of relief and gratitude when you accept ${his} offer. Without any further ado, you make a quick phone call, and a few short minutes later a small group of Elites enters, ready to grade your slave.`);

			r.toParagraph();

			div.append(App.Interact.eliteBreedingExam(eventSlave));

			return r.container();
		}

		function refuse() {
			const r = [];

			r.push(`You admire ${his} enthusiasm, and you tell ${him} as much, at which ${he} beams. ${His} face falls when you go on to tell ${him} that, at least for now, ${he} isn't going to be one of your breeders. Though ${he} tries (and fails) to hide the disappointment on ${his} face, ${he} nods and gives a little bow before turning and going back to what ${he} was doing earlier.`);

			return r;
		}
	}
};
