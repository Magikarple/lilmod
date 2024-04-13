App.Events.RESSInjectionsPlease = class RESSInjectionsPlease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.expansionRequestsAllowed > 0,
			() => !FutureSocieties.isActive('FSSlimnessEnthusiast'),
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				s => s.drugs === "no drugs",
				s => s.rules.speech === "permissive",
				s => s.health.condition > 20,
				s => s.devotion >= -20,
				s => s.trust > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const drug = getDrug();

		App.Events.drawEventArt(node, eventSlave);

		App.Events.addParagraph(node, [
			`Coming to see you in a clearly good mood is`,
			App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."),
			`Since ${he}'s allowed to ask questions, ${he} comes right out with it.`,
			Spoken(eventSlave, `"${Master}, I'm feeling healthy, and I've been a good ${girl} this week. With everyone getting so many powerful drugs —"`),
			`${he} takes a breath before asking in a rush`,
			Spoken(eventSlave, `"– may I have a dose of ${drug.text}"`)
		]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} the necessary injections`, necessary),
			eventSlave.pregKnown === 1
				? new App.Events.Result(`Not when you're pregnant`, pregnant)
				: new App.Events.Result(),
			new App.Events.Result("Decline", decline),
			new App.Events.Result("No, and slaves should not make requests of this kind", stop),
		]);

		function necessary() {
			eventSlave.devotion += 2;
			let r = [];
			r.push(`You load the injection gun you keep in your desk, and tap it repeatedly against the cooperative slave's`);
			const thankfulSentence = `${He} leaves <span class="devotion inc">thanking</span> you profusely, ${hasAnyArms(eventSlave) ? `massaging ${himself} in` : "quivering with"} anticipation`;
			switch (drug.type) {
				case "boobs":
					r.push(`tits, producing a hiss each time as pressurized gas painlessly drives the drugs deep into ${his} tissues. ${thankfulSentence}. Before the end of the week, ${his} <span class="change positive">boobs have grown,</span> delighting ${him}.`);
					if (eventSlave.markings === "freckles" || eventSlave.markings === "heavily freckled") {
						r.push(`${He} proudly shows your other slaves ${his} breast growth by keeping track of the increasing distance between a couple of chosen freckles on the front of ${his} boobs.`);
					}
					r.push(`The dose of growth hormones necessary to cause such rapid tissue changes left ${him} feeling <span class="health dec">rather ill,</span> but ${he} is recovering normally.`);
					if (eventSlave.geneMods.NCS === 0) {
						eventSlave.boobs += 200;
					} else {
						eventSlave.boobs += 100;
					}
					break;
				case "butt":
					r.push(`rear end, producing a hiss each time as pressurized gas painlessly drives the drugs deep into ${his} tissues. ${thankfulSentence}. Before the end of the week, ${his} <span class="change positive">buttocks have grown,</span> delighting ${him}.`);
					eventSlave.butt++;
					r.push(`The dose of growth hormones necessary to cause such rapid tissue changes left ${him} feeling <span class="health dec">rather ill,</span> but ${he} is recovering normally.`);
					break;
				case "lips":
					r.push(`lips, producing a hiss each time as pressurized gas painlessly drives the drugs deep into ${his} tissues. ${thankfulSentence}. Before the end of the week, ${his} <span class="change positive">lips have swelled,</span> delighting ${him}.`);
					r.push(`The dose of growth hormones necessary to cause such rapid tissue changes left ${him} feeling <span class="health dec">rather ill,</span> but ${he} is recovering normally.`);
					eventSlave.lips += 10;
					break;
				case "dick":
					r.push(`cock, producing a hiss each time as pressurized gas painlessly drives the drugs deep into ${his} tissues. ${thankfulSentence}. Before the end of the week, ${his} <span class="change positive">cock has grown,</span> delighting ${him}.`);
					eventSlave.dick++;
					if (eventSlave.balls.isBetween(1, 4, true) && random(1, 100) > 70) {
						r.push(`As a side effect, ${his} <span class="change positive">balls have also swelled,</span> which ${he} sees as an added benefit.`);
						eventSlave.balls++;
					}
					r.push(`The dose of growth hormones and male hormone treatment necessary to cause such rapid change left ${him} feeling <span class="health dec">rather ill,</span> but ${he} is recovering normally.`);
					break;
				case "dickMinus":
					r.push(`girly dick, producing a hiss each time as pressurized gas painlessly drives the drugs deep into ${his} tissues. ${thankfulSentence}. Before the end of the week, ${his} <span class="orange">dick has shrunk,</span> delighting ${him}.`);
					eventSlave.dick--;
					if ((eventSlave.geneMods.NCS === 1) && (eventSlave.dick > 1) && (random(1, 100) > 50)) {
						eventSlave.dick--;
					}
					if (eventSlave.balls > 1 && random(1, 100) > 70) {
						r.push(`As a side effect, ${his} <span class="orange">balls have also atrophied,</span> which ${he} sees as an added benefit.`);
						eventSlave.balls--;
						if ((eventSlave.geneMods.NCS === 1) && (eventSlave.balls > 1) && (random(1, 100) > 50)) {
							eventSlave.balls--;
						}
					}
					r.push(`The dose of growth hormones and hormone treatment necessary to cause such rapid tissue reduction left ${him} feeling <span class="health dec">rather ill,</span> but ${he} is recovering normally.`);
					break;
				case "balls":
					r.push(`sack, producing a hiss each time as pressurized gas painlessly drives the drugs deep into ${his} tissues. ${thankfulSentence}. Before the end of the week, ${his} <span class="change positive">testicles have grown,</span> delighting ${him}. The dose of growth hormones and male hormone treatment necessary to cause such rapid change left ${him} feeling <span class="health dec">rather ill,</span> but ${he} is recovering normally.`);
					eventSlave.balls++;
					break;
				case "ballsMinus":
					r.push(`useless sack, producing a hiss each time as pressurized gas painlessly drives the drugs deep into ${his} tissues. ${thankfulSentence}. Before the end of the week, ${his} <span class="orange">testicles have shrunk,</span> delighting ${him}. The dose of growth hormones and hormone treatment necessary to cause such rapid tissue reduction left ${him} feeling <span class="health dec">rather ill,</span> but ${he} is recovering normally.`);
					eventSlave.balls--;
					if ((eventSlave.geneMods.NCS === 1) && (eventSlave.balls > 1) && (random(1, 100) > 50)) {
						eventSlave.balls--;
					}
					break;
				case "clit":
					r.push(`clit, producing a hiss each time as pressurized gas painlessly drives the drugs deep into ${his} tissues. ${thankfulSentence}. Before the end of the week, ${his} <span class="change positive">clit has grown,</span> delighting ${him}. The dose of growth hormones necessary to cause such rapid tissue changes left ${him} feeling <span class="health dec">rather ill,</span> but ${he} is recovering normally.`);
					eventSlave.clit++;
					break;
			}
			if (V.arcologies[0].FSBodyPuristLaw === 0 && V.healthyDrugsUpgrade === 0) {
				surgeryDamage(eventSlave, 10);
			} else {
				surgeryDamage(eventSlave, 5);
			}
			App.Events.refreshEventArt(eventSlave);
			return r;
		}

		function pregnant() {
			const child = eventSlave.pregType > 1 ? "children" : "child";
			eventSlave.trust++;
			return `You tell ${him} that you would prefer not to inject your pregnant slaves with large doses of growth hormones, and ${he} must respect your judgment in this regard. ${He} leaves looking disappointed, but vows to return once ${he} has given birth. ${He} isn't satisfied with ${his} body, but <span class="trust inc">trusts</span> that ${his} ${getWrittenTitle(eventSlave)} cares for ${him} and ${his} unborn ${child}'s health.`;
		}

		function decline() {
			eventSlave.devotion++;
			eventSlave.trust++;
			return `You tell ${him} that ${he}'s better as ${he} is, and ${he} must respect your judgment in this regard. ${He} leaves looking more <span class="devotion inc">flattered</span> than disappointed. ${He}'s less insecure in ${his} own body, and <span class="trust inc">trusts</span> that ${his} ${getWrittenTitle(eventSlave)} has a plan for ${him}.`;
		}

		function stop() {
			V.expansionRequestsAllowed = 0;
			return `You tell ${him} firmly that you don't intend to apply growth hormones to ${him} at the moment, your tone communicating that further requests on this subject are not permitted. ${He} understands clearly and looks a little crushed, but trusts that ${he} won't be punished for violating a rule you hadn't promulgated. You repair the oversight immediately, directing your personal assistant to spread notice that decisions about asset size are yours alone.`;
		}

		/** @returns {{type:"boobs" | "butt" | "lips" | "dick" | "dick" | "dickMinus" | "balls" | "ballsMinus" | "clit", text: string}} */
		function getDrug() {
			let possibleDrugs = [];
			if (eventSlave.fetishKnown === 1 && eventSlave.fetishStrength > 60) {
				if (eventSlave.fetish === "dom") {
					if (eventSlave.dick.isBetween(0, 5) && canPenetrate(eventSlave)) {
						if (canSee(eventSlave)) { /* not taking chances on the condition in there */
							possibleDrugs.push({type: "dick", text: `penis enhancement? I know I'm a sex slave and it's my place to get fucked, but when I do get to do a girl, ${Master}, I want to see a little fear in her eyes.`});
						} else {
							possibleDrugs.push({type: "dick", text: `penis enhancement? I know I'm a sex slave and it's my place to get fucked, but when I do get to do a girl, ${Master}, I want to feel her ass clench in fear.`});
						}
					}
					if (canPenetrate(eventSlave) && eventSlave.scrotum > 0 && eventSlave.balls.isBetween(1, 9, true)) {
						possibleDrugs.push({type: "balls", text: `testicle enhancement? I know I'm a sex slave and it's my place to get fucked, but when I do get to do a girl, ${Master}, I want to ${canHear(eventSlave) ? `hear her grunt` : `feel her shake`} every single time the weight of my balls slaps against her body.`});
					}
					if (eventSlave.dick === 0 && eventSlave.clit < 5 && eventSlave.vagina >= 0) {
						possibleDrugs.push({type: "clit", text: `clit enhancement? I know I'm a sex slave and it's my place to get fucked, but I want to teach those cocky sluts a lesson they'll never forget.`});
					}
				} else if (eventSlave.fetish === "sadist") {
					if (eventSlave.dick.isBetween(0, 5) && canPenetrate(eventSlave)) {
						possibleDrugs.push({type: "dick", text: `penis enhancement? I know I'm a sex slave and it's my place to get fucked, but when I do get to do a girl, ${Master}, I want her to hurt.`});
					}
				} else if (eventSlave.fetish === "masochist") {
					if (eventSlave.dick > 1 && V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
						possibleDrugs.push({type: "dickMinus", text: `hormones to shrink my dick? I'm a sex slave and it's my place to get fucked, and when I get used like a little slut it hurts so good, ${Master}.`});
					}
					if (eventSlave.balls.isBetween(0, 10) && eventSlave.scrotum > 0) {
						possibleDrugs.push({type: "balls", text: `hormones to swell up my balls? I know I won't be using them, but to have such a tempting target for abuse, ${Master}...`});
					}
					if (eventSlave.butt < 9) {
						possibleDrugs.push({type: "butt", text: `ass growth drugs? It would just beg for a good spanking!`});
					}
				} else if (eventSlave.fetish === Fetish.SUBMISSIVE) {
					if (eventSlave.dick > 1 && V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
						possibleDrugs.push({type: "dickMinus", text: `hormones to shrink my dick? I don't need a big dick to get fucked, ${Master}. I don't want to intimidate anyone who might use me.`});
					}
					if (eventSlave.balls > 1 && V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
						possibleDrugs.push({type: "ballsMinus", text: `hormones to shrink my balls? I don't need to cum buckets while getting fucked, ${Master}. I don't want to outdo anyone who might use me.`});
					}
					if (eventSlave.butt < 9) {
						possibleDrugs.push({type: "butt", text: `ass growth drugs? I want whoever's fucking me to have plenty of cushion to push into.`});
					}
					if (eventSlave.lips <= 70) {
						possibleDrugs.push({type: "lips", text: `lip enhancement? I want lips so big everyone will think of just shoving a dick in them.`});
					}
					if (eventSlave.boobs < 3000) {
						possibleDrugs.push({type: "boobs", text: `boob growth drugs? I want to be nothing more than a young man's wet dream. Just a pair of tits, a big ass and some holes to fuck.`});
					}
				} else if (eventSlave.fetish === "cumslut") {
					if (eventSlave.lips <= 70) {
						possibleDrugs.push({type: "lips", text: `lip enhancement? I want everyone to imagine my lips around their cock, ${Master}.`});
					}
					if (eventSlave.balls.isBetween(0, 10) && eventSlave.scrotum > 0) {
						possibleDrugs.push({type: "balls", text: `hormones to add some weight to my balls? I just need to make more cum, ${Master}. I promise I'll clean up after myself too!`});
					}
				} else if (eventSlave.fetish === "buttslut") {
					if (eventSlave.butt < 9) {
						const entry = {type: "butt", text: `ass growth drugs? I would love it if everyone thought of fucking my big butt the moment they saw me!`};
						possibleDrugs.push(...[entry, entry, entry]);
					}
				} else if (eventSlave.fetish === "boobs") {
					if (eventSlave.boobs < 15000) {
						const entry = {type: "boobs", text: `boob growth drugs? I would love it if everyone thought of touching and sucking and fucking my big bimbo boobies the moment they saw me!`};
						possibleDrugs.push(...[entry, entry, entry]);
					}
				} else if (eventSlave.fetish === "pregnancy") {
					if (canPenetrate(eventSlave) && eventSlave.scrotum > 0 && eventSlave.balls.isBetween(1, 9, true)) {
						possibleDrugs.push({type: "balls", text: `hormones to add some heft to my balls? When I get the chance to cum in a girl, I want to get her pregnant, really pregnant!`});
					}
					if (eventSlave.boobs < 3000) {
						const entry = {type: "boobs", text: `boob growth drugs? I want to look, you know, fertile, ${Master}.`};
						possibleDrugs.push(...[entry, entry]);
					}
					if (eventSlave.butt < 6) {
						const entry = {type: "butt", text: `ass growth drugs? I want to look, you know, fertile, ${Master}, even if it's not in my hips.`};
						possibleDrugs.push(...[entry, entry, entry]);
					}
				} else if (eventSlave.fetish === "humiliation") {
					if (eventSlave.dick > 1 && V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
						possibleDrugs.push({type: "dickMinus", text: `hormones to shrink my dick? It would be so humiliating to have a little bitch dick, ${Master}, everyone would know I'm a worthless little slut.`});
					}
					if (eventSlave.lips <= 70) {
						possibleDrugs.push({type: "lips", text: `lip enhancement? I want lips so big everyone knows I'm a slut the moment they see me. They'll all stare at me.`});
					}
					if (eventSlave.boobs < 10000) {
						possibleDrugs.push({type: "boobs", text: `boob growth drugs? I want big bimbo breasts so big I just spill out of my top.`});
					}
					if (eventSlave.butt < 9) {
						possibleDrugs.push({type: "butt", text: `ass growth drugs? I want to risk ripping my clothes any time I bend over.`});
					}
				}
			}

			if (eventSlave.energy > 95 && eventSlave.dick.isBetween(1, 4, true) && eventSlave.balls > 0 && !["humiliation", "masochist", "submissive"].includes(eventSlave.fetish)) {
				possibleDrugs.push({type: "dick", text: `penis enhancement? I just want to fuck all the time, ${Master}. ${capFirstChar(girl)}s with big cocks have more fun, even getting fucked. Especially getting fucked.`});
			}

			if (eventSlave.attrKnown === 1) {
				if (eventSlave.attrXY > 65 && eventSlave.boobs < 3000) {
					const entry = {type: "boobs", text: `boob growth drugs? Nothing gets a cute boy hard like a big pair of boobies.`};
					possibleDrugs.push(...[entry, entry]);
				}
				if (eventSlave.attrXX > 65 && canPenetrate(eventSlave) && eventSlave.dick.isBetween(1, 4, true)) {
					const entry = {type: "dick", text: `penis enhancement? Nothing gets a cute girl wet better than a big hard shaft.`};
					possibleDrugs.push(...[entry, entry]);
				}
			}

			if (FutureSocieties.isActive('FSGenderRadicalist')) {
				if (V.arcologies[0].FSGenderRadicalistLawFuta === 2) {
					if (canPenetrate(eventSlave) && eventSlave.dick.isBetween(1, 4, true)) {
						const entry = {type: "dick", text: `penis enhancement? I want to be the best hung slave I can be, ${Master}. I want them to see my erection and stare.`};
						possibleDrugs.push(...[entry, entry, entry]);
					}
					if (eventSlave.scrotum > 0 && eventSlave.balls.isBetween(1, 9, true)) {
						const entry = {type: "balls", text: `hormones to add some size to my balls? My package is falling behind all the other slaves out there...`};
						possibleDrugs.push(...[entry, entry, entry]);
					}
				} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 3) {
					if (eventSlave.butt < 9) {
						const entry = {type: "butt", text: `ass growth drugs? I feel like I'm starting to fall behind the other slaves...`};
						possibleDrugs.push(...[entry, entry, entry]);
					}
				} else {
					if (eventSlave.dick > 1 && V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
						possibleDrugs.push({type: "dickMinus", text: `of hormones to shrink my dick? A big one too. I just want to become the best little girl I can be, ${Master}, I don't want anything distracting anyone from my rear pussy.`});
					}
				}
			}

			if (eventSlave.toyHole === "dick") {
				if (eventSlave.dick.isBetween(1, 4, true)) {
					possibleDrugs.push({type: "dick", text: `penis enhancement? I know how much you like using it, ${Master}, and I want to make sure it is good for you too.`});
				}
			} else if (eventSlave.toyHole === "mouth") {
				if (eventSlave.lips <= 90) {
					possibleDrugs.push({type: "lips", text: `lip enhancement? I know how much you like using them, ${Master}.`});
				}
			} else if (eventSlave.toyHole === "ass") {
				if (eventSlave.butt < 9) {
					possibleDrugs.push({type: "butt", text: `ass growth drugs? I know how much you like using it, ${Master}.`});
				}
			} else if (eventSlave.toyHole === "boobs") {
				if (eventSlave.boobs < 25000) {
					possibleDrugs.push({type: "boobs", text: `boob growth drugs? I know how much you like using them, ${Master}.`});
				}
			}

			if (eventSlave.boobs < eventSlave.butt * 750) {
				possibleDrugs.push({type: "boobs", text: `boob growth drugs? I want to be as fuckable as I can for you, ${Master}, and I think my boobs need it more than my butt.`});
			} else if (eventSlave.butt < eventSlave.boobs/500 && eventSlave.butt < 9) {
				possibleDrugs.push({type: "butt", text: `ass growth drugs? I want to be as fuckable as I can for you, ${Master}, and I think my butt needs it more than my boobs.`});
			} else {
				possibleDrugs.push({type: "boobs", text: `boob growth drugs? The way they bounce when I get fucked is kind of addicting...`});
			}
			// @ts-ignore
			return possibleDrugs.random();
		}
	}
};
