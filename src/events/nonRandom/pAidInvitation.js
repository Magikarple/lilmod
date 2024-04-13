App.Events.pAidInvitation = class pAidInvitation extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	actorPrerequisites() {
		return [];
	}

	eventPrerequisites() {
		return [
			() => V.plot === 1,
			() => V.week >= 29,
			() => !V.eventResults.aid
		];
	}

	execute(node) {
		const trapped = [];
		let r = [];
		V.eventResults.aid = -2; // Mark event as seen.
		if (V.seeDicks <= 75) {
			trapped.push("convent");
			trapped.push("school");
			trapped.push("housewives");
			trapped.push("volleyballTeam");
			if (V.seePreg !== 0) {
				trapped.push("maternity");
				if (V.continent === "Africa") {
					trapped.push("seizedMission");
				}
			}
		}
		if (V.seeDicks >= 25) {
			trapped.push("conversion");
		}
		trapped.push("gradeSchool");
		V.eventResults.aidTarget = trapped.random();

		r.push(`A small old world country near the arcology is experiencing serious unrest. Its corrupt government is doing an even poorer job than most of addressing chronic joblessness and general malaise. Thus far, it's been a fertile source of people in poverty for slavers to target, and little else. Lately, though, it's been showing signs worse may be to come. You've instructed ${V.assistant.name} to flag communications from the area; there's always a possibility that business opportunities may arise from the benighted country, and the situation is becoming so unstable it's prudent to keep a personal eye on it anyway. You receive just such a call from`);
		if (V.eventResults.aidTarget === "convent") {
			r.push(`the leader of a female-oriented religious retreat`);
		} else if (V.eventResults.aidTarget === "school") {
			r.push(`the principal of a preparatory school for girls`);
		} else if (V.eventResults.aidTarget === "housewives") {
			r.push(`the queen bee of a small group of suburban housewives`);
		} else if (V.eventResults.aidTarget === "maternity") {
			r.push(`the maternity ward of a hospital`);
		} else if (V.eventResults.aidTarget === "conversion") {
			r.push(`the owner of a religious sexual orientation therapy camp`);
		} else if (V.eventResults.aidTarget === "gradeSchool") {
			r.push(`a student stranded`);
		} else if (V.eventResults.aidTarget === "volleyballTeam") {
			r.push(`a student athlete`);
		} else if (V.eventResults.aidTarget === "seizedMission") {
			r.push(`the leader of a group of missionaries`);
		}
		r.push(`in the capital city.`);
		App.Events.addParagraph(node, r);
		r = [];
		if (V.eventResults.aidTarget !== "seizedMission") {
			r.push(`They are deeply worried by the situation. There have been large riots over the past week, and yesterday they became seriously violent. The unrest is targeting`);
			if (V.eventResults.aidTarget === "convent") {
				r.push(`better-off citizens, including the caller. Though most of the nuns have already left, the leader and a few of her women are now stuck in the area and are running out of options as the riots lock down transportation.`);
			} else if (V.eventResults.aidTarget === "school") {
				r.push(`better-off citizens, including the caller. Though most of the students and faculty have already made it out, the principal and a few students are now stuck in the area and are running out of options as the riots lock down transportation.`);
			} else if (V.eventResults.aidTarget === "housewives") {
				r.push(`better-off citizens, including the caller. Though most of them have taken flights out, the leader and a few of them are now stuck in the area and are running out of options as the riots lock down transportation.`);
			} else if (V.eventResults.aidTarget === "maternity") {
				r.push(`better-off citizens, including the caller. Though most of the patients have already left, several of the most pregnant are now stuck in the area and are running out of options as the riots lock down transportation.`);
			} else if (V.eventResults.aidTarget === "conversion") {
				r.push(`better-off citizens, including the caller. Though most of the camp's inmates have already left, a few of them and the owner are now stuck in the area and are running out of options as the riots lock down transportation.`);
			} else if (V.eventResults.aidTarget === "gradeSchool") {
				r.push(`better-off citizens, including the caller. Though most of the other students and faculty escaped, a few of the students are now stuck in the school and are running out of options as the riots steadily creep closer to the grounds.`);
			} else if (V.eventResults.aidTarget === "volleyballTeam") {
				r.push(`vulnerable citizens, including the caller. Their bus broke down on the way to the championship game and all those that have left to get help have not returned. She and her several remaining teammates are running out of options as those looking for easy targets creep ever closer.`);
			}
		} else {
			r.push(`After years of constant rape and abuse, an opening finally arrived for escape when a rival faction raided the decaying church they were stored in, however the situation outside isn't much better. Violent riots are taking place and the mobs are eagerly snatching up what ever loot and women they can get their hands on. She and the remaining women are trapped and in no condition to run; most particularly the youngest of the group who is ripe with child, though she herself and one of the others are also carrying their rapists' babies. They are completely out of options as the looters work their way down the city streets.`);
		}
		r.push(`They beg you to help evacuate them, and promise to pay you once they're out.`);
		App.Events.addParagraph(node, r);
		const price = 10000;

		App.Events.addResponses(node, [
			new App.Events.Result(`Agree`, agree),
			new App.Events.Result(`Do it for free`, free),
			new App.Events.Result(`Airlift them into slavery`, enslave, `This will cost ${cashFormat(price)}`),
		]);

		function agree() {
			const r = [];
			const el = new DocumentFragment();
			cashX(2000, "event");
			repX(1000, "event");
			r.push(`You dispatch your personal VTOL bird immediately. It lands`);
			if (V.eventResults.aidTarget === "volleyballTeam") {
				r.push(`beside the bus`);
			} else {
				r.push(`on the roof of the building`);
			}
			r.push(`they're sheltering in, and brings them across the closest border and into a more functional country. You receive a call expressing their heartfelt thanks and promising to <span class="reputation inc">spread the word</span> about how you helped them escape, and a wire transfer of their <span class="cash inc">payment</span> for the airlift.`);
			V.eventResults.aid = -1;
			App.Events.addParagraph(el, r);
			return el;
		}

		function free() {
			const r = [];
			const el = new DocumentFragment();
			repX(2500, "event");
			r.push(`You dispatch your personal VTOL bird immediately. It lands`);
			if (V.eventResults.aidTarget === "volleyballTeam") {
				r.push(`beside the bus`);
			} else {
				r.push(`on the roof of the building`);
			}
			r.push(`they're sheltering in, and brings them across the closest border and into a more functional country. You receive a call expressing their heartfelt thanks, and when you refuse their payment for the airlift, they tearfully promise to tell the story of how you <span class="reputation inc">extended charity</span> to those in need, belying the rumors about slaveowners.`);
			V.eventResults.aid = -1;
			App.Events.addParagraph(el, r);
			return el;
		}

		function enslave() {
			const r = [];
			const el = new DocumentFragment();
			r.push(`You send your personal VTOL bird to the shop for some immediate and very expensive modifications to its cargo and passenger area. Since this will take several days, you stall the supplicants.`);
			if (V.eventResults.aidTarget === "volleyballTeam") {
				r.push(`A few of the girls decide to leave, but the sight of them pushed against the wall of a nearby building, toned bodies glistening with sweat and seed as their captors rape them into submission, keep the rest happy to stay on the bus. Those that remained`);
			} else {
				r.push(`Their situation isn't truly dire yet, and they can wait. They`);
			}
			r.push(`are extremely grateful, though they would be less hopeful if they knew the true nature of the aircraft coming to retrieve them.`);
			V.eventResults.aid = 1;
			App.Events.queueEvent(1, new App.Events.pAidResult());
			cashX(forceNeg(price), "event");
			App.Events.addParagraph(el, r);
			return el;
		}
		return node;
	}
};
