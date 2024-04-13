App.Events.refsPhysicalIdealistEncounter = class refsPhysicalIdealistEncounter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSPhysicalIdealist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 1000;
		const slave = GenerateNewSlave("XX", {maxAge: 22, disableDisability: 1, race: "nonslave"});
		slave.devotion = 100;
		slave.trust = 100;
		setHealth(slave, 100, 0, undefined, 0);
		slave.muscles = 99;
		slave.clothes = (slave.dick > 0 && slave.vagina === -1) ? "sport shorts" : "sport shorts and a sports bra";

		const {
			his, him, himself,
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`The notion of the physical ideal has taken ${V.arcologies[0].name} by storm and a number of enterprising citizens have been quick to respond by providing new services and businesses in response. One such innovation is the open air gym, a now common sight along ${V.arcologies[0].name}'s many streets. Many citizens utilize such facilities to squeeze in an extra work-out on their daily commute, or in lieu of personal fitness facilities in their own homes.`]);

		App.Events.addParagraph(node, [`While navigating your arcology on an outing, you find yourself coming across one of the arcology's finest open-air gyms, clearly marketed towards the wealthy citizen on the move. As impressive as the gold plated fitness equipment is, in amongst the power racks, dip bars and bench press stations is perhaps one of the most spectacular athletic specimens in the entire arcology. This female citizen has clearly embraced everything that ${V.arcologies[0].name}'s physical idealism represents, molding ${himself} into a rippling blend of broad shoulders, powerful muscles, and a ripped stomach that would shame even the most well-built old world athlete.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Keep walking`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Offer to sponsor ${him} for a promotional video`, sponsor, `This will cost ${cashFormat(cost)}.`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to promote ${him}.`));
		}
		choices.push(new App.Events.Result(`Spend some time working out with ${him}`, workout));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `The citizen is undoubtedly a uniquely athletic specimen, so you linger for a moment to appreciate the strength and vigor of ${his} punishing physical routine. When you've had your fill, you move on towards your next appointment.`;
		}

		function sponsor() {
			repX(5000, "event");
			cashX(-cost, "event");
			return `Despite ${his} hulking, muscular exterior, the citizen proves to be a shrewd and capable advertisement executive as well. The two of you sit beside a hefty dumbbell rack for some time and together craft a simple promotional ad campaign featuring the herculean physical form of the citizen. Shooting the video is simple, footage of the citizen going about ${his} various fitness routines is inspiring enough, and soon ${his} every muscle and sinew is being broadcast across the world to laud the physical achievements of ${V.arcologies[0].name}. Your citizens are <span class="reputation inc">filled with pride,</span> knowing the rest of the world was just awed by their pursuit of bodily perfection.`;
		}

		function workout() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`The attendant of the gym is almost too stunned to charge you for entry, and indeed many citizens inside and outside the gym stop to watch you begin a work-out routine. The muscular citizen does not halt ${his} own regime, of course, so you soon find yourself pumping iron and straining your muscles to the limit beside ${him}.`]);

			App.Events.addParagraph(frag, [`Your eyes lock somewhere in the midst of a particularly strenuous exercise, and what follows may be remembered in the annals of ${V.arcologies[0].name} history as the most erotic display of physical might ever recorded. Matching each other rep for rep, the gym is soon echoing with the grunts of both your exertions while your bodies grow slick with glistening sweat. When the last dumbbell is racked, the citizen merely nods ${his} respect at you for matching ${his} pursuit of the physical ideal, to the <span class="reputation inc">delight of the watching citizenry.</span>`]);
			repX(1500, "event");
			return frag;
		}
	}
};
