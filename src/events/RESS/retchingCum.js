App.Events.RESSRetchingCum = class RESSRetchingCum extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment !== "work as a servant",
				canStand,
				hasAnyArms,
				s => s.dietCum > 0,
				s => s.devotion <= 20,
				s => (s.fetish !== "cumslut" && s.fetish !== "masochist" && s.fetishStrength < 60) || s.fetishKnown === 0,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, girl
		} = getPronouns(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];
		t.push(`You are inspecting the slave feeding area early in the week, watching your slaves as they come and go to get their required nourishment for the morning, and`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`catches your attention.`);
		if (V.cockFeeder === 1) {
			t.push(`You see as ${he} kneels in front of the feeder`);
			t.push(canSee(eventSlave) ? `phallus, staring at it with disgust plainly written on ${his} face.` : `phallus with a look of disgust on ${his} face.`);
		} else if (canSee(eventSlave)) {
			t.push(`You see ${him} staring into ${his} cup of nutritional fluid with a look of disgust on ${his} face.`);
		} else {
			t.push(`You see ${him} grimacing at ${his} cup of nutritional fluid.`);
		}
		t.push(`You quickly check your records and ${V.assistant.name} confirms that ${eventSlave.slaveName} is required to ingest`);
		t.push(eventSlave.dietCum === 2 ? `an extreme diet based almost entirely on human ejaculate.` : `a large amount of human ejaculate as part of ${his} diet.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`You watch ${eventSlave.slaveName} as ${he} retches unpleasantly,`);
		t.push(V.cockFeeder === 1 ? `stimulating the feeder phallus with ${his} mouth` : `tentatively drinking from ${his} cup`);
		t.push(`and choking ${his} food down. ${He} knows that if ${he} doesn't eat it willingly, ${he}'ll will be forced to, and you can almost see ${his}`);
		t.push(eventSlave.intelligence + eventSlave.intelligenceImplant > 15 ? `intelligent mind` : `stupid mind`);
		t.push(`working through the reality of what ${his} life has become. ${He} is now a receptacle for`);
		if (eventSlave.dietCum === 2) {
			t.push(`concentrated`);
		}
		t.push(`human ejaculate, and for no other reason than the perverse amusement of ${his} owner. Almost as soon as ${he} swallows ${his} food, ${he} whimpers, burps, and then`);
		t.push(eventSlave.belly >= 10000 ? `hastily waddles` : `quickly runs`);
		t.push(`to a nearby bathroom to vomit it back up. This is a common reaction for unbroken slaves on cum diets,`);
		t.push(eventSlave.weight > 0 ? `and can also be an effective, if unhealthy, way of forcing them to lose weight.` : `but it can also prevent slaves that are already too thin from gaining weight.`);

		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Have mercy on the poor ${girl} and take ${him} off ${his} cum diet for now`, mercy),
			(eventSlave.dietCum === 1)
				? new App.Events.Result(`Force ${him} onto a heavy cum diet, and double up on ${his} ejaculate intake`, heavy)
				: new App.Events.Result(),
			(eventSlave.dietCum === 2)
				? new App.Events.Result(`Give the poor ${girl} a break and reduce ${his} cum intake to a more modest level`, reduce)
				: new App.Events.Result(),
			new App.Events.Result(`Suppress ${his} gag reflex and double ${his} cum intake for a week`, double),
			(V.arcade > 0)
				? new App.Events.Result(`Sentence ${him} to a day in ${V.arcadeName} for cum injection therapy`, arcade)
				: new App.Events.Result(),
		]);

		function mercy() {
			eventSlave.devotion -= 5;
			eventSlave.trust += 5;
			eventSlave.dietCum = 0;
			return `You see how ${eventSlave.slaveName} is suffering and you decide to reconsider ${his} dietary prescription. You instruct ${V.assistant.name} to change ${eventSlave.slaveName}'s diet to exclude cum for now. Slaves who can't eat are unhealthy, and unhealthy slaves are unprofitable slaves. ${He} is now <span class="mediumorchid">more confident that ${he} can resist you and get ${his} way,</span> ${he} also <span class="mediumaquamarine">trusts you a little more</span> to look after ${his} well-being.`;
		}
		function heavy() {
			eventSlave.devotion -= 3;
			eventSlave.trust -= 3;
			eventSlave.dietCum = 2;
			return `You instruct ${V.assistant.name} to double down on ${eventSlave.slaveName}'s cum diet. Ungrateful little sluts who retch up their expensive food sometimes need tough love. Making ${his} cum-food thicker and more concentrated might help ${him} to learn that no matter how bad things seem, you can always make them worse. Initially ${his} new heavy cum diet makes no difference in ${his} ability to keep it down, but you tell ${him} to give it some time. Eventually ${he} will learn to appreciate cum as the primary ingredient in everything ${he} ingests. All of your future cumsluts do, sooner or later. ${His} pathetic tears reveal how <span class="gold">helpless ${he} feels,</span> but they don't hide the <span class="mediumorchid">streak of rebelliousness</span> that remains burning inside ${him}.`;
		}

		function reduce() {
			eventSlave.devotion += 2;
			eventSlave.trust += 2;
			eventSlave.dietCum = 1;
			return `${eventSlave.slaveName} is on a very heavy cum diet, and it's possible you're forcing ${him} to take too much, too soon. You decide to give ${him} a break and instruct ${V.assistant.name} to reduce, but not eliminate the amount of cum in ${his} diet. Although it doesn't immediately make ${him} hate cum any less, <span class="hotpink">${he} appreciates your willingness</span> to make things a little less unpleasant for ${him}. <span class="mediumaquamarine">${He} is a little less afraid of you too,</span> although not as much as if you'd taken ${him} off ${his} cum diet altogether.`;
		}

		function double() {
			t = [];
			t.push(`${He} is already on a very heavy cum-based diet, and there's only so much ejaculate you can force a slut to ingest before it negatively affects ${his} health. However, as a temporary measure, you still have options. You instruct ${V.assistant.name} to re-double the amount of ejaculate in ${eventSlave.slaveName}'s diet for the week. You also have ${him} closely monitored and injected with anti-nausea drugs to help ${his} hold down ${his} food. Although the idea of being forced to eat large amounts of human reproductive fluid still disgusts ${him}, the week of having a super-concentrated cum-diet, along with the suppressed reflex to purge it has its effect. Knowing that you monitor and control every aspect of ${his} life <span class="hotpink">breaks down ${his} resistance to your will,</span> and by the end of the week, ${he} is grateful that you return ${him} to a more nutritionally viable regimen — even if its cum content is still overwhelmingly high.`);
			if (eventSlave.fetishKnown === 1) {
				t.push(`<span class="lightcoral">${His} brain has now begun to accept the sexual perversity of ${his} food as a turn on.</span>`);
			} else {
				t.push(`${He} is now able to eat and digest ${his} prescribed diet without pharmacological assistance.`);
			}
			eventSlave.devotion += 5;
			eventSlave.fetish = "cumslut";
			if (eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength = 10;
			}
			return t;
		}
		function arcade() {
			t = [];
			t.push(`You have ${V.assistant.name} inform ${eventSlave.slaveName} of ${his} unacceptable behavior and sentence ${him} to a day in ${V.arcadeName}. ${He} cries and pleads for mercy, and even begs to be allowed to suck a cock, any cock, so ${he} can prove ${his} newfound enthusiasm for cum, but you are unmerciful as two other slaves drag ${him} off to serve ${his} sentence. ${He} is forced to wear`);
			t.push(eventSlave.vagina !== -1 ? `a combined vaginal and` : `an`);
			t.push(`anal chastity belt so that the only hole available is ${his} mouth, and is then confined in ${V.arcadeName} with ${his} mouth spread open by a ring gag and ${his} head sticking through the hole in the wall. A sign below ${his} mouth proclaims ${him} to be a "cum extraction tube" and ${he} is used that way for the duration of ${his} stay — a grueling, 18-hour marathon of relentless throat fucking.`);
			if (eventSlave.sexualFlaw !== "hates oral") {
				t.push(`${His} ordeal is so extreme that ${he} now <span class="red">hates oral sex,</span>`);
			} else {
				t.push(`${His} hatred of oral sex makes ${his} ordeal that much more horrific,`);
			}
			t.push(`but it <span class="hotpink">breaks down ${his} resistance.</span> ${He} now <span class="gold">better understands the terrifying power you have over ${him},</span> and the sheer amount of cum ${he} is forced to ingest <span class="health dec">negatively effects ${his} health.</span> Your other cum-fed slaves take note of what you do to those who can't hold down their assigned diet.`);
			eventSlave.devotion += 5;
			eventSlave.trust -= 5;
			eventSlave.sexualFlaw = "hates oral";
			eventSlave.fetish = "masochist";
			seX(eventSlave, "oral", "public", "penetrative", 55);
			healthDamage(eventSlave, 5);
			return t;
		}
	}
};
