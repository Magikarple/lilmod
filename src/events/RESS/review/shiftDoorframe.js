App.Events.RESSShiftDoorframe = class RESSShiftDoorframe extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(s.assignment)),
				canTalk,
				s => s.devotion > 20,
				s => s.trust >= -20,
				s => (canDoAnal(s) || canDoVaginal(s)),
				s => s.chastityPenis !== 1 || s.dick === 0,
				s => s.skill.entertainment >= 60,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(`Your fucktoys have to eat, sleep, and look after themselves, just like anyone, so they can't spend every moment offering themselves to you.`);
		if (S.Concubine) {
			r.push(`Your concubine, ${S.Concubine.slaveName}`);
		} else if (V.HeadGirlID !== 0) {
			r.push(`Your Head Girl, ${S.HeadGirl.slaveName}`);
		} else if (V.assistant.name === "your personal assistant") {
			r.push(`Your personal assistant`);
		} else {
			r.push(`Your personal assistant, ${capFirstChar(V.assistant.name)}`);
		}
		r.push(`manages a schedule for them, constantly changing it up to keep the sluts from getting predictable. Just coming to ${his} shift is`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."));
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`You're at your desk as ${he} arrives; ${his} predecessor passes ${him} on the way out. ${eventSlave.slaveName} pauses for a moment in the doorway, and then decides to give you a show. ${He} spreads ${his} legs until ${his}`);
		if (eventSlave.shoes === "heels") {
			r.push(`heels click against`);
		} else if (eventSlave.shoes === "extreme heels") {
			r.push(`ridiculous heels click against`);
		} else if (eventSlave.shoes === "none") {
			r.push(`bare feet come up against`);
		} else {
			r.push(`${eventSlave.shoes} come up against`);
		}
		r.push(`the door frame to either side of ${him}. ${He} reaches out to press ${his} palms against the door frame to either side of ${his} body, and runs them slowly up the frame, gradually stretching out ${his}`);
		const averageHeight = Height.mean(eventSlave);
		if (eventSlave.height > (averageHeight + 15)) {
			r.push(`tall`);
		} else if (eventSlave.height < (averageHeight - 15)) {
			r.push(`short`);
		}
		if (eventSlave.weight > 130) {
			r.push(`fat`);
		} else if (eventSlave.weight > 95) {
			r.push(`plump`);
		} else if (eventSlave.weight > 10) {
			r.push(`plush`);
		} else if (eventSlave.weight < -10) {
			r.push(`thin`);
		} else {
			r.push(`trim`);
		}
		if (eventSlave.belly >= 750000) {
			if (eventSlave.bellyPreg > 0) {
				r.push(`grotesquely pregnant`);
			} else {
				r.push(`grotesquely inflated`);
			}
		} else if (eventSlave.belly >= 600000) {
			if (eventSlave.bellyPreg > 0) {
				r.push(`dangerously pregnant`);
			} else {
				r.push(`dangerously distended`);
			}
		} else if (eventSlave.belly >= 450000) {
			if (eventSlave.bellyPreg > 0) {
				r.push(`immensely pregnant`);
			} else {
				r.push(`immensely distended`);
			}
		} else if (eventSlave.belly >= 150000) {
			if (eventSlave.bellyPreg > 0) {
				r.push(`massively pregnant`);
			} else {
				r.push(`massively distended`);
			}
		} else if (eventSlave.belly >= 120000) {
			if (eventSlave.bellyPreg > 0) {
				r.push(`enormously pregnant`);
			} else {
				r.push(`greatly gravid`);
			}
		} else if (eventSlave.belly >= 10000) {
			if (eventSlave.bellyPreg > 3000) {
				r.push(`heavily pregnant`);
			} else if (eventSlave.bellyImplant > 3000) {
				r.push(`very gravid`);
			} else {
				r.push(`taut`);
			}
		} else if (eventSlave.belly >= 5000) {
			if (eventSlave.bellyPreg > 3000) {
				r.push(`very pregnant`);
			} else if (eventSlave.bellyImplant > 3000) {
				r.push(`gravid`);
			} else {
				r.push(`distended`);
			}
		} else if (eventSlave.belly >= 1500) {
			if (eventSlave.bellyPreg > 0) {
				r.push(`slightly pregnant`);
			} else if (eventSlave.bellyImplant > 0) {
				r.push(`slightly distended`);
			} else {
				r.push(`bloated`);
			}
		}
		r.push(`form. ${He}'s good at this, so you let ${him} continue;`);
		if (eventSlave.clothes !== "no clothing") {
			r.push(`${his} clothes rapidly form a pile at ${his} feet.`);
		} else {
			r.push(`${he}'s already naked.`);
		}
		r.push(`${He} begins to buck and bend, making sure to show you that ${he}'s`);
		if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			r.push(`limp and submissive for ${his} ${getWrittenTitle(eventSlave)}.`);
		} else if (eventSlave.dick > 0) {
			r.push(`rock hard at the prospect of getting`);
			if ((eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave)) {
				r.push(`to fuck`);
			} else {
				r.push(`fucked by`);
			}
			r.push(`${his} ${getWrittenTitle(eventSlave)}.`);
		} else if (eventSlave.clit > 0) {
			r.push(`so horny for ${his} ${getWrittenTitle(eventSlave)} ${he}'s got a stiffly prominent clit.`);
		} else if (eventSlave.labia > 1) {
			r.push(`so horny for ${his} ${getWrittenTitle(eventSlave)} ${his} dangling petals are swollen and moist.`);
		} else if (eventSlave.vagina === -1) {
			r.push(`ready for ${his} ${getWrittenTitle(eventSlave)}.`);
		} else {
			r.push(`wet for ${his} ${getWrittenTitle(eventSlave)}.`);
		}
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`Finally, ${he} pulls ${himself} over to one side of the door frame,`);
		if (eventSlave.belly >= 5000) {
			r.push(`leaning far forward to accommodate ${his} gravid body and`);
		}
		r.push(`clasping it like a lover.`);
		if (eventSlave.boobs > 2000) {
			r.push(`${He} nestles it between ${his} enormous tits, forcing them apart,`);
		} else if (eventSlave.boobs > 800) {
			r.push(`${He} presses ${his} big breasts against it lasciviously, letting them pop around it one by one,`);
		} else {
			r.push(`${He} rubs ${his} chest against it, up and down,`);
		}
		r.push(`and licks ${his}`);
		if (eventSlave.lips > 70) {
			r.push(`ridiculous lips`);
		} else if (eventSlave.lips > 40) {
			r.push(`lewd lips`);
		} else {
			r.push(`lips`);
		}
		r.push(`until they're so wet they leave a strand of saliva between ${his} mouth and the frame. ${He} then gives up all pretense,`);
		if (eventSlave.belly >= 5000) {
			r.push(`shifts ${his} bulk back,`);
		}
		r.push(`and begins to openly grind ${himself} against the door frame, ${his}`);
		if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			r.push(`limp dick dribbling precum down it.`);
		} else if (eventSlave.dick > 0) {
			r.push(`erection leaving precum all along it.`);
		} else if (eventSlave.vagina === -1) {
			r.push(`buttocks parting against it as ${he} rubs ${his} asspussy against the hard door frame.`);
		} else {
			r.push(`pussy leaving moisture as ${he} humps it.`);
		}
		r.push(`${He}'s certainly taking the colloquial term <i>fucked by the arcology</i> literally.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`As if the invitation wasn't already blindingly clear, ${he} reaches a hand down without pausing ${his} door frame rape to`);
		if (eventSlave.butt > 10) {
			r.push(`slap an immense buttock and let it jiggle.`);
		} else if (eventSlave.butt > 5) {
			r.push(`heft and massage a massive buttock.`);
		} else if (eventSlave.butt > 2) {
			r.push(`massage ${his} plush butt.`);
		} else {
			r.push(`massage ${his} trim butt.`);
		}
		r.push(`${He} pulls the buttock closest to you aside, giving you a clear view of ${his}`);
		if (canDoVaginal(eventSlave)) {
			if (eventSlave.vagina >= 10) {
				r.push(`gaping birth hole`);
				if (eventSlave.belly >= 100000) {
					r.push(`and nearly prolapsing cervix`);
				}
				r.push(r.pop() + `. ${He} runs ${his} fingers around its edge before sinking ${his} fist into it and preparing ${himself} like a good slave${girl} for ${his} ${getWrittenTitle(eventSlave)}.`);
			} else if (eventSlave.vagina > 2) {
				r.push(`lewd, well traveled pussy. ${He} traces a finger around it before sinking ${his} hand into it and spreading ${himself} wide like a good slave${girl} for ${his} ${getWrittenTitle(eventSlave)}.`);
			} else if (eventSlave.vagina > 1) {
				r.push(`loose pussy. ${He} traces a finger around it before spreading ${himself} wide like a good slave${girl} for ${his} ${getWrittenTitle(eventSlave)}.`);
			} else if (eventSlave.vagina > 0) {
				r.push(`tight pussy. ${He} traces a finger around it before spreading ${himself} like a good slave${girl} for ${his} ${getWrittenTitle(eventSlave)}.`);
			} else {
				r.push(`virgin pussy. ${He} traces a finger around it before spreading ${himself} like a good slave${girl} for ${his} ${getWrittenTitle(eventSlave)}.`);
			}
		} else {
			if (eventSlave.anus > 2) {
				r.push(`lewd anal slit.`);
			} else if (eventSlave.anus > 1) {
				r.push(`loose asshole.`);
			} else {
				r.push(`tight anus.`);
			}
			r.push(`${He} clenches it and relaxes it, clenches it and relaxes it, winking ${his} butthole at ${his} ${getWrittenTitle(eventSlave)} like a good anal slave.`);
		}
		App.Events.addParagraph(node, r);

		let choices = [];
		if (canDoVaginal(eventSlave)) {
			choices.push(new App.Events.Result(`Make love`, loveVagina, (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) ? `This option will take ${his} virginity` : null));
			choices.push(new App.Events.Result(`Pound that pussy`, poundVagina, (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) ? `This option will take ${his} virginity` : null));
		}
		if (canDoAnal(eventSlave)) {
			choices.push(new App.Events.Result(`Make butt love`, loveButt, (eventSlave.anus === 0 && canDoAnal(eventSlave)) ? `This option will take ${his} anal virginity` : null));
			choices.push(new App.Events.Result(`Pound that ass`, poundButt, (eventSlave.anus === 0 && canDoAnal(eventSlave)) ? `This option will take ${his} anal virginity` : null));
		}
		if (isPlayerReceptive(eventSlave) && canPenetrate(eventSlave)) {
			choices.push(new App.Events.Result(`Invite ${him} 'in'`, invitation, PCPenetrationWarning())); // TODO: This response needs to be reviewed (or gated) after PC body is implemented
		}
		App.Events.addResponses(node, choices);

		function loveResponse(genitalText, genitalCondition) {
			r = [];
			r.push(`There's a glint`);
			if (canSee(eventSlave)) {
				r.push(`in ${his} eyes as ${he} sees`);
			} else if (canHear(eventSlave)) {
				r.push(`on ${his} face as ${he} hears`);
			} else {
				r.push(`on ${his} face as ${he} senses`);
			}
			r.push(`you stand up from your desk;`);
			if (eventSlave.height > V.PC.height + 5) {
				r.push(`${he}'s tall enough for standing ${genitalText}, so as you approach ${he} just turns ${his} head back to face the door frame and cocks ${his} hips.`);
			} else if (eventSlave.height > V.PC.height - 25) {
				r.push(`${he}'s so short standing ${genitalText} is a stretch, so as you approach ${he} goes up on tiptoe with one leg and runs the other up the wall, using it as support to hike ${his} ass as high as ${he} can manage.`);
			} else {
				r.push(`${he}'s shorter than you, so as you approach ${he} goes up on tiptoe to bring ${his} ass to just the right height for standing ${genitalText}.`);
			}
			r.push(`You don't penetrate ${him} right away, though; you`);
			if (eventSlave.butt > 5) {
				r.push(`knead ${his} mass of assflesh,`);
			} else if (eventSlave.butt > 2) {
				r.push(`heft a big buttock in each hand,`);
			} else {
				r.push(`cup ${his} nice little buttocks,`);
			}
			r.push(`briefly tease ${his}`);
			if (genitalCondition > 2) {
				if (genitalText === "sex") {
					r.push(`loose pussy`);
				} else {
					r.push(`gaping asshole`);
				}
			} else if (genitalCondition > 1) {
				if (genitalText === "sex") {
					r.push(`ready pussy`);
				} else {
					r.push(`ready asshole`);
				}
			} else {
				if (genitalText === "sex") {
					r.push(`fresh pussy`);
				} else {
					r.push(`inexperienced asshole`);
				}
			}
			r.push(`with one finger, and then run your hands around ${his}`);
			if (eventSlave.waist < -95) {
				r.push(`cartoonishly narrow`);
			} else if (eventSlave.waist < -10) {
				r.push(`wasp`);
			} else if (eventSlave.waist < 10) {
				r.push(`pretty`);
			} else {
				r.push(`thick`);
			}
			r.push(`waist and up ${his}`);
			if (eventSlave.belly >= 100000 || (eventSlave.weight <= 130 && eventSlave.belly >= 1500)) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
				r.push(`belly`);
			} else if (eventSlave.weight > 130) {
				r.push(`fat gut`);
			} else if (eventSlave.muscles > 30) {
				r.push(`ripped abs`);
			} else if (eventSlave.weight > 30) {
				r.push(`fat belly`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush stomach`);
			} else if (eventSlave.weight >= -10) {
				r.push(`taut stomach`);
			} else {
				r.push(`skinny body`);
			}
			r.push(`to rest`);
			if (eventSlave.boobs > 2000) {
				r.push(`buried under ${his} enormous breasts.`);
			} else if (eventSlave.boobs > 800) {
				r.push(`under ${his} heavy breasts.`);
			} else if (eventSlave.boobs > 200) {
				r.push(`under the curve of ${his} breasts.`);
			} else {
				r.push(`against ${his} trim chest.`);
			}
			r.push(`Despite ${his} poise ${he} sighs at your impromptu massage, gasps at your`);
			if (V.PC.belly >= 5000) {
				r.push(`pregnancy pushing`);
			} else if (V.PC.boobs >= 300) {
				r.push(`erect nipples brushing`);
			} else if (V.PC.title === 0) {
				r.push(`flat chest pressing`);
			} else {
				r.push(`muscular chest pressing`);
			}
			r.push(`against ${his} back, and shudders when your`);
			if (V.PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`stiff prick`);
			}
			r.push(`comes to rest between ${his} legs`);
			if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
				r.push(r.pop() + `, the moist heat of your pussy very obvious at the base of your cock`);
			}
			r.push(r.pop() + `. You bring ${him} to a fine point of arousal, enjoying ${his} body, pulling ${his} ${eventSlave.skin} chin around to kiss ${his}`);
			if (eventSlave.lips > 60) {
				r.push(`bimbo`);
			} else if (eventSlave.lips > 40) {
				r.push(`big`);
			} else if (eventSlave.lips > 20) {
				r.push(`soft`);
			}
			r.push(`lips. ${He}'s so ready that when you finally penetrate ${him}, ${he} orgasms slightly after one thrust,`);
			return r;
		}

		function loveVagina() {
			r = [...loveResponse("sex", eventSlave.vagina)];
			if (eventSlave.dick > 6 && !canAchieveErection(eventSlave)) {
				r.push(`releasing a spurt of cum onto the floor`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`releasing a spurt of cum against the door frame.`);
			} else if (eventSlave.dick > 0) {
				r.push(`spurting cum against the door frame.`);
			} else {
				r.push(`grinding ${himself} between you and the door frame.`);
			}
			r.push(His);
			if (eventSlave.vagina > 2) {
				r.push(`well-traveled vagina clenches down to almost virgin tightness`);
			} else if (eventSlave.vagina > 1) {
				r.push(`veteran vagina tightens powerfully`);
			} else {
				r.push(`tight vagina tightens mercilessly`);
			}
			r.push(`with the orgasm, eliciting a sob of overstimulation, which you draw into a series of sobs by slowly fucking ${him} despite ${his} climax. You are gentle with ${him}, and continue teasing ${his} body, so that ${his} arousal builds again and ${he} manages to climax a second time when you do. You let ${him} out from between you and the door frame to wash, and return to work, but when ${he} emerges from a quick trip to the bathroom ${he}`);
			if (eventSlave.belly >= 300000) {
				r.push(`leans against ${his} ${belly} stomach,`);
			} else {
				r.push(`kneels on the couch,`);
			}
			r.push(`spreads ${his} lips with one hand,`);
			if (!canTalk(eventSlave)) {
				r.push(`and <span class="trust inc">earnestly asks</span> for more.`);
			} else {
				r.push(`and <span class="trust inc">asks earnestly,</span>`);
				r.push(Spoken(eventSlave, `"More please, ${Master}."`));
			}
			eventSlave.trust += 4;
			r.push(VCheck.Vaginal(eventSlave, 1));
			return r;
		}

		function loveButt() {
			r = [...loveResponse("anal", eventSlave.anus)];
			if (eventSlave.dick > 6 && !canAchieveErection(eventSlave)) {
				r.push(`releasing a spurt of cum onto the floor`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`releasing a spurt of cum against the door frame.`);
			} else if (eventSlave.dick > 0) {
				r.push(`spurting cum against the door frame.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`grinding ${his} featureless crotch against the door frame.`);
			} else {
				r.push(`leaving a little girlcum on the door frame.`);
			}
			r.push(`${His}`);
			if (eventSlave.anus > 2) {
				r.push(`tired sphincter clenches down to almost virgin tightness`);
			} else if (eventSlave.anus > 1) {
				r.push(`veteran sphincter tightens powerfully`);
			} else {
				r.push(`tight sphincter tightens mercilessly`);
			}
			r.push(`with the orgasm, eliciting a sob of overstimulation, which you draw into a series of sobs by slowly assfucking ${him} despite ${his} climax. You are gentle with ${his} butt, and continue teasing ${his} body, so that ${his} arousal builds again and ${he} manages to climax a second time when you do. You let ${him} out from between you and the door frame to wash, and return to work, but when ${he} emerges from a quick trip to the bathroom ${he}`);
			if (eventSlave.belly >= 300000) {
				r.push(`leans against ${his} ${belly} stomach,`);
			} else {
				r.push(`kneels on the couch,`);
			}
			r.push(`spreads ${his} buttocks with one hand,`);
			if (!canTalk(eventSlave)) {
				r.push(`and <span class="trust inc">earnestly asks</span> for more.`);
			} else {
				r.push(`and <span class="trust inc">asks earnestly,</span>`);
				r.push(Spoken(eventSlave, `"More please, ${Master}."`));
			}
			eventSlave.trust += 4;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function poundResponse() {
			r = [];
			r.push(`You choose your moment carefully, waiting until`);
			if (canSee(eventSlave)) {
				r.push(`${he} turns ${his} gaze away from you for an instant. When ${he} looks back, your desk chair is empty;`);
			} else if (canHear(eventSlave)) {
				r.push(`the ambient sound is loud enough for you to sneak up on ${him};`);
			} else {
				r.push(`you're certain ${he} won't notice you;`);
			}
			r.push(`for all ${his} sexual poise ${he}'s surprised by the force of your`);
			if (V.PC.belly >= 5000) {
				r.push(`pregnancy`);
			} else if (V.PC.boobs >= 300) {
				r.push(`tits`);
			} else {
				r.push(`chest`);
			}
			r.push(`crashing into ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				r.push(`soft`);
			} else if (eventSlave.muscles > 95) {
				r.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				r.push(`muscular`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`soft`);
			}
			r.push(`back, forcing ${his}`);
			if (eventSlave.belly >= 1500) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
				r.push(`belly`);
			}
			r.push(`against the door frame.`);
			return r;
		}

		function poundVagina() {
			r = [...poundResponse()];
			if (eventSlave.height > V.PC.height + 5) {
				r.push(`${He}'s so tall ${his} butt is at the perfect height right where it is, so ${he} relaxes as much as possible, trapped against the door frame.`);
			} else if (eventSlave.height > V.PC.height - 25) {
				r.push(`${He}'s short enough that even tiptoes aren't enough, and you force ${him} up between you and the door frame, pinning ${his} little body helplessly in place.`);
			} else {
				r.push(`${He} squirms up on tiptoes to get ${his} hips to the right height, trapped between you and the door frame.`);
			}
			r.push(`None too soon, for the next thing ${he} feels is the pleasure of standing vaginal penetration,`);
			if (eventSlave.vagina > 2) {
				r.push(`though it's nothing new to ${him}.`);
			} else if (eventSlave.vagina > 1) {
				r.push(`veteran pussy notwithstanding.`);
			} else if (eventSlave.vagina === 0) {
				r.push(`even <span class="virginity loss>lossing ${his} maidenhead.</span>`);
			} else {
				r.push(`inserting slowly into ${his} still-tight pussy.`);
			}
			r.push(`You pump ${him} hard from the first stroke, making it clear you're taking your pleasure, leaving ${him} nothing to do but cling to the door frame and try to ride it out. At first ${he} was squashed painfully against it, but ${he} manages to`);
			if (eventSlave.belly >= 5000) {
				r.push(`shift ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`belly`);
				}
				r.push(`beside the frame and`);
			}
			r.push(`cock ${his} hips out at enough of an angle that ${he} can get back to`);
			if (eventSlave.dick > 6 && !canAchieveErection(eventSlave)) {
				r.push(`rubbing ${his} oversized cock between it and ${his} leg.`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`humping ${his} pathetic limp dick against it.`);
			} else if (eventSlave.dick > 0) {
				r.push(`rubbing ${his} cock against it.`);
			} else {
				r.push(`humping ${his} abdomen against it.`);
			}
			r.push(`${He} eventually shudders and spasms in orgasm,`);
			if (eventSlave.dick > 0) {
				r.push(`the ejaculate running down ${his} leg`);
			} else {
				r.push(`${his} legs almost give out`);
			}
			r.push(`making obvious ${his} pleasure in getting ${his} pussy fucked by you. You climax in triumph yourself before pulling the bitch off the door frame and flinging ${him} towards the bathroom to clean ${himself} up. When ${he} emerges, ${he} comes over to sit quietly next to your desk, looking up at you <span class="devotion inc">obediently.</span>`);
			eventSlave.devotion += 4;
			r.push(VCheck.Vaginal(eventSlave, 1));
			return r;
		}

		function poundButt() {
			r = [...poundResponse()];
			if (eventSlave.height > V.PC.height + 5) {
				r.push(`${He}'s so tall ${his} butt is at the perfect height right where it is, so ${he} relaxes as much as possible, trapped against the door frame.`);
			} else if (eventSlave.height < V.PC.height - 25) {
				r.push(`${He}'s short enough that even tiptoes aren't enough, and you force ${him} up between you and the door frame, pinning ${his} little body helplessly in place.`);
			} else {
				r.push(`${He} squirms up on tiptoes to get ${his} butt to the right height, trapped between you and the door frame.`);
			}
			r.push(`None too soon, for the next thing ${he} feels is the discomfort of standing anal penetration,`);
			if (eventSlave.anus > 2) {
				r.push(`though it's nothing new to ${him}.`);
			} else if (eventSlave.anus > 1) {
				r.push(`veteran asshole notwithstanding.`);
			} else if (eventSlave.anus === 0) {
				r.push(`worsened by <span class="virginity loss"> the loss of ${his} anal virginity.</span>`);
			} else {
				r.push(`worsened by ${his} tight little sphincter.`);
			}
			r.push(`You ravage ${his} ass hard from the first stroke, making it clear you're taking your pleasure, leaving ${him} nothing to do but cling to the door frame and try to ride it out. At first ${he} was squashed painfully against it, but ${he} manages to`);
			if (eventSlave.belly >= 5000) {
				r.push(`shift ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`belly`);
				}
				r.push(`beside the frame and`);
			}
			r.push(`cock ${his} hips out at enough of an angle that ${he} can get back to`);
			if (eventSlave.dick > 6 && !canAchieveErection(eventSlave)) {
				r.push(`rubbing ${his} oversized cock between it and ${his} leg`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`humping ${his} pathetic limp dick against it`);
			} else if (eventSlave.dick > 0) {
				r.push(`rubbing ${his} cock against it`);
			} else if (eventSlave.vagina === -1) {
				r.push(`grind ${his} smooth groin against it instinctively, even though that's not very useful`);
			} else {
				r.push(`humping ${his} pussy against it`);
			}
			r.push(`for stimulation. ${His} asshole eventually spasms in orgasm, but it's spasmed so frequently during the rough sodomy that you don't realize the slut came to having ${his} asshole savaged until`);
			if (eventSlave.dick > 0) {
				r.push(`you notice the ejaculate running down ${his} leg.`);
			} else {
				r.push(`an aftershock almost makes ${his} legs give out.`);
			}
			r.push(`You climax in triumph yourself before pulling the bitch off the door frame and flinging ${him} towards the bathroom to clean ${himself} up. When ${he} emerges, ${he} comes over to sit quietly next to your desk, looking up at you <span class="devotion inc">obediently,</span> though you do notice ${he} sits to one side to take a bit of weight off ${his} poor rear.`);
			eventSlave.devotion += 4;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function invitation() {
			r = [];
			r.push(`There's a glint`);
			if (canSee(eventSlave)) {
				r.push(`in ${his} eyes as ${he} sees`);
			} else if (canHear(eventSlave)) {
				r.push(`on ${his} face as ${he} hears`);
			} else {
				r.push(`on ${his} face as ${he} senses`);
			}
			r.push(`you stand up from your desk and saunter over;`);
			if (eventSlave.height > V.PC.height + 5) {
				r.push(`${he}'s tall enough for standing`);
				if (V.PC.vagina !== -1) {
					r.push(`sex,`);
				} else {
					r.push(`anal,`);
				}
				r.push(`so as you approach ${he} just readies ${himself} to fuck ${his} lover.`);
			} else if (eventSlave.height < V.PC.height - 25) {
				r.push(`${he}'s so short standing ${V.PC.vagina < 0 ? "anal" : "sex"} is a stretch, so once you approach you get down on your knees and greet the dick that will soon be in your`);
				if (V.PC.vagina !== -1) {
					r.push(`${V.PC.vagina === 0 ? "virgin " : ""}pussy.`);
				} else {
					r.push(`${V.PC.anus === 0 ? "virgin " : ""}asshole.`);
				}
			} else {
				r.push(`${he}'s shorter than you, so as you approach ${he} goes up on tiptoe to bring ${his} dick to just the right height for standing ${V.PC.vagina < 0 ? "anal" : "sex"}.`);
			}
			r.push(`${He} doesn't penetrate you right away, though; ${he}`);
			if (V.PC.butt >= 5) {
				r.push(`kneads your mass of assflesh`);
			} else if (V.PC.butt >= 4) {
				r.push(`hefts a huge buttock in each hand`);
			} else if (V.PC.butt >= 3) {
				r.push(`gives your big butt a slap`);
			} else {
				r.push(`cups your nice little buttocks`);
			}
			r.push(`before bending you over, bringing ${his} ${hasBothArms(eventSlave) ? `hands` : `hand`} to your`);
			if (V.PC.title === 0) {
				r.push(`wide hips`);
			} else {
				r.push(`masculine hips`);
			}
			r.push(`and mounting you.`);
			if (eventSlave.belly >= 100000) {
				r.push(`You grunt as the weight of ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
				r.push(`belly comes to rest on your back`);
				if (eventSlave.belly >= 300000) {
					r.push(r.pop() + `, the sheer gravity of it threatening to force you to the floor`);
				}
				r.push(r.pop() + `.`);
			} else if (eventSlave.boobs >= 15000) {
				r.push(`You grunt as you feel the weight of ${his} massive breasts slam into your back`);
				if (eventSlave.boobs >= 30000) {
					r.push(`before falling to your sides`);
				}
				r.push(r.pop() + `.`);
			} else if (eventSlave.weight > 160) {
				r.push(`You grunt as you feel the weight of ${his} fat gut settle on your back.`);
			}
			/* .vagina trainwreck ahead */
			if (eventSlave.dick === 1) {
				if (V.PC.vagina !== -1) {
					if (V.PC.newVag === 1) {
						r.push(`${He} slips ${his} tiny dick into your`);
						if (V.PC.vagina === 0) {
							r.push(`vagina, <span class="virginity loss">puncturing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("vagina.");
						}
						r.push(`Fortunately your custom cunt is capable of making even the most embarrassing of dicks pleasurable; though you wish ${he} could fill you a little better.`);
					} else if (V.PC.career === "escort") {
						r.push(`You sigh as ${his} tiny dick enters your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">puncturing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`You're far too traveled to enjoy such a meager offering.`);
					} else if (V.PC.counter.birthsTotal >= 10) {
						r.push(`You sigh as ${his} tiny dick enters your used`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">puncturing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`You've been stretched out so much from childbirth that ${he} just can't satisfy you anymore.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile. Suddenly, the size of ${his} cock doesn't seem to matter as much anymore.`);
						}
					} else if (V.PC.career === "servant") {
						r.push(`You sigh as ${his} tiny dick enters your used`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">puncturing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He} stands no chance of competing with your old Master.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile. Suddenly, the size of ${his} cock doesn't seem to matter as much anymore.`);
						}
					} else if (V.PC.counter.birthsTotal > 2) {
						r.push(`You can barely feel ${him} slip into your loose`);
						if (V.PC.vagina === 0) {
							r.push(`cunt, <span class="virginity loss">puncturing your hymen,</span>`);
							V.PC.vagina++;
						} else {
							r.push("cunt.");
						}
						r.push(`but ${he} is so small it's not like you're missing much.`);
					} else if (V.PC.career === "gang" || V.PC.career === "celebrity" || V.PC.career === "wealth") {
						r.push(`You feel ${him} slip into your`);
						if (V.PC.vagina === 0) {
							r.push(`vagina, <span class="virginity loss">puncturing your hymen</span>`);
							V.PC.vagina++;
						} else {
							r.push("vagina");
						}
						r.push(`and abruptly stop; you sigh over how unsatisfyingly small ${he} is.`);
					} else {
						r.push(`You squirm as ${he} slips into your tight`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">taking your virginity.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`While ${his} length may be disappointing, ${he} stands no chance of stretching you out.`);
					}
				} else {
					r.push(`You have to check to see if ${he}'s even in your tight rear, only to find ${he} is already fully hilted.`);
					if (V.PC.anus === 0) {
						r.push(`You haven't even noticed that <span class="virginity loss">your ass has been deflowered.</span>`);
						V.PC.anus++;
					}
					r.push(`You sigh as ${he} thrusts into you: no prostate stimulation today.`);
					if (canImpreg(V.PC, eventSlave) && V.PC.mpreg) {
						r.push(`A small tickling in your belly reminds you you're fertile. Suddenly, the size of ${his} cock doesn't seem to matter as much anymore.`);
					}
				}
			} else if (eventSlave.dick === 2) {
				if (V.PC.vagina !== -1) {
					if (V.PC.newVag === 1) {
						r.push(`${He} slips ${his} cute dick into your`);
						if (V.PC.vagina === 0) {
							r.push(`vagina, <span class="virginity loss">taking your virginity.</span>`);
							V.PC.vagina++;
						} else {
							r.push("vagina.");
						}
						r.push(`Fortunately your custom cunt is capable of making ${his} embarrassing offering pleasurable; though you wish ${he} could fill you a little better.`);
					} else if (V.PC.career === "escort") {
						r.push(`You sigh as ${his} cute dick enters your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">taking your virginity.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`You're far too traveled to enjoy such a meager offering, no matter how pathetically adorable it is.`);
					} else if (V.PC.counter.birthsTotal >= 10) {
						r.push(`You sigh as ${his} cute dick enters your abused`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">taking your virginity.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`You've been stretched out so much from childbirth that ${he} just can't satisfy you anymore.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile. Hopefully such a cute penis puts a cute baby in you.`);
						}
					} else if (V.PC.career === "servant") {
						r.push(`You sigh as ${his} cute dick enters your used`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">taking your virginity.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He} stands no chance of competing with your old Master.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile. You doubt ${his} children will stand up to his either.`);
						}
					} else if (V.PC.counter.birthsTotal > 2) {
						r.push(`You can barely feel ${him} slip into your loose`);
						if (V.PC.vagina === 0) {
							r.push(`cunt, <span class="virginity loss">taking your virginity</span>`);
							V.PC.vagina++;
						} else {
							r.push("cunt,");
						}
						r.push(`but ${he} is so small it's not like you're missing much.`);
					} else if (V.PC.career === "gang" || V.PC.career === "celebrity" || V.PC.career === "wealth") {
						r.push(`You feel ${him} slip into your`);
						if (V.PC.vagina === 0) {
							r.push(`vagina, <span class="virginity loss">taking your virginity</span>`);
							V.PC.vagina++;
						} else {
							r.push("vagina");
						}
						r.push(`and sigh over how unsatisfyingly small ${he} is.`);
					} else {
						r.push(`You squirm as ${he} slips into your tight`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">taking your virginity.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He} should be thankful you're so tight.`);
					}
				} else {
					r.push(`You sigh as you feel ${him} slip ${his} cute dick into your tight`);
					if (V.PC.anus === 0) {
						r.push(`rear, <span class="virginity loss">taking your anal virginity;</span>`);
						V.PC.anus++;
					} else {
						r.push("rear;");
					}
					r.push(`no prostate stimulation today.`);
					if (canImpreg(V.PC, eventSlave) && V.PC.mpreg) {
						r.push(`A small tickling in your belly reminds you you're fertile. Hopefully such a cute penis puts a cute baby in you.`);
					}
				}
			} else if (eventSlave.dick === 3) {
				if (V.PC.vagina !== -1) {
					if (V.PC.newVag === 1) {
						r.push(`You shudder as ${he} slips ${his} dick into your`);
						if (V.PC.vagina === 0) {
							r.push(`vagina, <span class="virginity loss">deflowering you.</span>`);
							V.PC.vagina++;
						} else {
							r.push("vagina.");
						}
					} else if (V.PC.career === "escort") {
						r.push(`You sigh as ${his} dick slips into your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">deflowering you.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`You're far too traveled for even average cocks these days.`);
					} else if (V.PC.counter.birthsTotal >= 10) {
						r.push(`You sigh as ${his} dick enters your abused`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">deflowering you.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`You've been stretched out so much from childbirth that ${he} just can't satisfy you anymore.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile.`);
						}
					} else if (V.PC.career === "servant") {
						r.push(`You sigh as ${his} dick enters your used`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">deflowering you.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He} stands no chance of competing with your old Master.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile.`);
						}
					} else if (V.PC.counter.birthsTotal > 2) {
						r.push(`You've gotten rather loose after your multiple children, so`);
						if (V.PC.vagina === 0) {
							r.push(`even <span class="virginity loss">deflowering you,</span>`);
							V.PC.vagina++;
						}
						r.push(`${his} average cock is somewhat underwhelming.`);
					} else if (V.PC.career === "gang" || V.PC.career === "celebrity" || V.PC.career === "wealth") {
						r.push(`You shiver with pleasure as ${he} slips ${his} dick into your`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">deflowering you.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
					} else {
						r.push(`You squirm as ${he} slips ${his} dick into your tight`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">deflowering you,</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`the sensation making you quiver with pleasure.`);
					}
				} else {
					r.push(`You squirm as you feel ${him} slip ${his} dick into your tight`);
					if (V.PC.anus === 0) {
						r.push(`rear, <span class="virginity loss">taking your anal virginity,</span>`);
						V.PC.anus++;
					} else {
						r.push("rear,");
					}
					r.push(`the sensation making you quiver with pleasure.`);
					if (V.PC.dick !== 0) {
						r.push(`Your erection firmly`);
						if (V.PC.belly >= 10000) {
							r.push(`pushes into the underside of your belly,`);
						} else {
							r.push(`sticks out from under you,`);
						}
						r.push(`overstimulated from ${his} cock teasing your prostate.`);
					}
					if (canImpreg(V.PC, eventSlave) && V.PC.mpreg) {
						r.push(`A small tickling in your belly reminds you you're fertile.`);
					}
				}
			} else if (eventSlave.dick === 4) {
				if (V.PC.vagina !== -1) {
					if (V.PC.newVag === 1) {
						r.push(`You shudder as ${he} slips ${his} big dick into your`);
						if (V.PC.vagina === 0) {
							r.push(`vagina, <span class="virginity loss">ripping your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("vagina.");
						}
					} else if (V.PC.career === "escort") {
						r.push(`You shudder as ${his} big dick slips into your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">ripping your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He} could use to be a little wider, but at least you can feel ${him}.`);
					} else if (V.PC.counter.birthsTotal >= 10) {
						r.push(`You shudder as ${his} big dick slips into your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">ripping your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He} could use to be a little wider, but at least you can feel ${him} after the havoc wreaked by your children.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile.`);
						}
					} else if (V.PC.career === "servant") {
						r.push(`You shudder as ${his} big dick slips into your used`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">ripping your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He}'s just the right size for you to remember your Master.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile.`);
						}
					} else if (V.PC.counter.birthsTotal > 2) {
						r.push(`You've gotten rather loose after your multiple children, so ${his} big cock is a welcome`);
						if (V.PC.vagina === 0) {
							r.push(`feeling, even after <span class="virginity loss">ripping your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("feeling.");
						}
					} else if (V.PC.career === "gang" || V.PC.career === "celebrity" || V.PC.career === "wealth") {
						r.push(`You moan with pleasure as ${he} slips ${his} big dick into your`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">ripping your hymen</span> and`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`stretching you to your limit.`);
					} else {
						r.push(`You squirm as ${he} slips ${his} big dick into your tight`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">ripping your hymen,</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`the sensation making you quiver with pleasure and a little pain. ${He} gives you a chance to get used to ${his} size before continuing.`);
					}
				} else {
					r.push(`You squirm as you feel ${him}`);
					if (V.PC.anus === 0) {
						r.push(`<span class="virginity loss">take your anal virginity</span> and`);
						V.PC.anus++;
					}
					r.push(`slip ${his} big dick into your tight rear, the sensation making you quiver with pleasure and a little pain. ${He} gives you a chance to get used to ${his} size before continuing.`);
					if (V.PC.dick !== 0) {
						r.push(`Your erection firmly`);
						if (V.PC.belly >= 10000) {
							r.push(`pushes into the underside of your belly,`);
						} else {
							r.push(`sticks out from under you,`);
						}
						r.push(`overstimulated from ${his} cock teasing your prostate.`);
					}
					if (canImpreg(V.PC, eventSlave) && V.PC.mpreg) {
						r.push(`A small tickling in your belly reminds you you're fertile.`);
					}
				}
			} else if (eventSlave.dick === 5) {
				if (V.PC.vagina !== -1) {
					if (V.PC.newVag === 1) {
						r.push(`You shudder with`);
						if (V.PC.vagina === 0) {
							r.push(`painful delight as ${his} impressive dick <span class="virginity loss">tears your hymen</span> and`);
							V.PC.vagina++;
						} else {
							r.push(`delight as ${his} impressive dick `);
						}
						r.push(`stretches you perfectly.`);
					} else if (V.PC.career === "escort") {
						r.push(`You quiver with pleasure as ${his} impressive dick slips into your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">tearing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`It takes a lot to satisfy you and ${he} is not disappointing.`);
					} else if (V.PC.counter.birthsTotal >= 10) {
						r.push(`You quiver with pleasure as ${his} impressive dick slips into your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">tearing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`Even given the state of your pussy, ${he} fills you completely and perfectly.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile.`);
						}
					} else if (V.PC.career === "servant") {
						r.push(`You quiver with pleasure as ${his} impressive dick slips into your used`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">tearing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He}'s bigger than your Master was and is hitting all the right places.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile.`);
						}
					} else if (V.PC.counter.birthsTotal > 2) {
						if (V.PC.vagina === 0) {
							r.push(`${He} <span class="virginity loss">tears your hymen.</span>`);
							V.PC.vagina++;
						}
						r.push(`You've gotten rather loose after your multiple children, but you still find ${his} impressive dick almost uncomfortably large.`);
					} else if (V.PC.career === "gang" || V.PC.career === "celebrity" || V.PC.career === "wealth") {
						r.push(`You squeal with mixed pleasure and pain as ${he} pushes ${his} impressive dick into your`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">tearing your hymen,</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`stretching you past your limit. ${He} gives you a chance to get used to ${his} size before continuing.`);
					} else {
						r.push(`You grit your teeth as ${he} slips ${his} impressive dick into your tight`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">tearing your hymen,</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`stretching you considerably. ${He} gives you a chance to get used to ${his} size before continuing.`);
					}
				} else {
					r.push(`You grit your teeth as you feel ${him}`);
					if (V.PC.anus === 0) {
						r.push(`<span class="virginity loss">break your virgin sphincter</span> and`);
						V.PC.anus++;
					}
					r.push(`slip ${his} impressive dick into your tight rear, stretching you considerably. You bring a hand to your lower belly, feeling the bulge of ${his} cock deep within you. ${He} gives you a chance to get used to ${his} size before continuing, not that it will help much.`);
					if (V.PC.dick !== 0) {
						r.push(`Your erection firmly`);
						if (V.PC.belly >= 10000) {
							r.push(`pushes into the underside of your belly,`);
						} else {
							r.push(`sticks out from under you,`);
						}
						r.push(`overstimulated from ${his} cock teasing your prostate.`);
					}
					if (canImpreg(V.PC, eventSlave) && V.PC.mpreg) {
						r.push(`A small tickling in your belly reminds you you're fertile.`);
					}
				}
			} else if (eventSlave.dick === 6) {
				if (V.PC.vagina !== -1) {
					if (V.PC.newVag === 1) {
						r.push(`You shudder with`);
						if (V.PC.vagina === 0) {
							r.push(`painful pleasure as ${his} huge dick <span class="virginity loss">obliterates your hymen</span> and`);
							V.PC.vagina++;
						} else {
							r.push(`overwhelming pleasure as ${his} huge dick `);
						}
						r.push(`fills you completely.`);
					} else if (V.PC.career === "escort") {
						r.push(`You moan with pleasure as ${his} huge dick completely fills your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">obliterating your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`You gently caress ${his} dick through the bulge in your middle.`);
					} else if (V.PC.counter.birthsTotal >= 10) {
						r.push(`You moan with pleasure as ${his} huge dick completely fills your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">obliterating your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`You gently caress ${his} dick through the bulge in your middle.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile.`);
						}
					} else if (V.PC.career === "servant") {
						r.push(`You moan with pleasure as ${his} huge dick stretches your used`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">obliterating your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`${He}'s far bigger than your Master ever was.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A small tickling in your belly reminds you you're fertile.`);
						}
					} else if (V.PC.counter.birthsTotal > 2) {
						if (V.PC.vagina === 0) {
							r.push(`${He} <span class="virginity loss">painfully obliterates your hymen.</span>`);
							V.PC.vagina++;
						}
						r.push(`You may be rather loose after your multiple children, but ${his} huge dick is uncomfortably large.`);
					} else if (V.PC.career === "gang" || V.PC.career === "celebrity" || V.PC.career === "wealth") {
						r.push(`You grit your teeth as ${he} pushes ${his} huge dick into your`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">obliterating your hymen,</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`trying to bear being so painfully overstretched. ${He} gives you a chance to get used to ${his} size before continuing, not that it will help much.`);
					} else {
						r.push(`You cry out as ${he} forces ${his} huge dick into your too-tight`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">obliterating your hymen</span> and`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`nearly breaking you. ${He} considers pulling back out, but you pat the bulge in your lower belly and urge ${him} to continue. ${He} tries ${his} best to allow you to get comfortable, not that it will help much.`);
					}
				} else {
					r.push(`You cry out as ${he} forces ${his} huge dick into your too-tight`);
					if (V.PC.anus === 0) {
						r.push(`rear <span class="virginity loss">busting your virgin sphincter</span> and`);
						V.PC.anus++;
					} else {
						r.push(`rear,`);
					}
					r.push(`nearly breaking you. ${He} considers pulling back out, but you pat the bulge in your lower belly and urge ${him} to continue. ${He} tries ${his} best to allow you to get comfortable, not that it will help much.`);
					if (V.PC.dick !== 0) {
						r.push(`Your erection firmly`);
						if (V.PC.belly >= 10000) {
							r.push(`pushes into the underside of your belly,`);
						} else {
							r.push(`sticks out from under you,`);
						}
						r.push(`overstimulated from ${his} cock teasing your prostate.`);
					}
					if (canImpreg(V.PC, eventSlave) && V.PC.mpreg) {
						r.push(`A small tickling in your belly reminds you you're fertile.`);
					}
				}
			} else if (eventSlave.dick === 7) {
				let bigDick ="";
				if (eventSlave.dick === 7) {
					bigDick = "gigantic dick";
				} else if (eventSlave.dick === 8) {
					bigDick = "titanic dick";
				} else if (eventSlave.dick === 9) {
					bigDick = "absurd dick";
				} else if (eventSlave.dick === 10) {
					bigDick = "inhuman dick";
				} else {
					bigDick = "hypertrophied dick";
				}
				if (V.PC.vagina !== -1) {
					if (V.PC.newVag === 1) {
						r.push(`You nearly blank out with`);
						if (V.PC.vagina === 0) {
							r.push(`pain and pleasure as ${his} ${bigDick} <span class="virginity loss">razes your hymen</span> and`);
							V.PC.vagina++;
						} else {
							r.push(`pleasure as ${his} ${bigDick}`);
						}
						r.push(`puts your new pussy to the test.`);
					} else if (V.PC.career === "escort") {
						r.push(`You drool with pleasure as ${his} ${bigDick} completely fills your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`depths <span class="virginity loss">razing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("depths.");
						}
						r.push(`You gently caress ${his} dick through the bulge in your middle.`);
					} else if (V.PC.counter.birthsTotal >= 10) {
						r.push(`You drool with pleasure as ${his} ${bigDick} completely fills your stretched`);
						if (V.PC.vagina === 0) {
							r.push(`pussy <span class="virginity loss">razing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy.");
						}
						r.push(`Your cervix happily kisses the tip of ${his} dick, eager to get better acquainted.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`You can't help but wiggle against the monster in you like a bitch in heat.`);
						}
					} else if (V.PC.career === "servant") {
						r.push(`You moan with pleasure as ${his} ${bigDick} stretches your used pussy to its`);
						if (V.PC.vagina === 0) {
							r.push(`limit, <span class="virginity loss">razing your hymen.</span>`);
							V.PC.vagina++;
						} else {
							r.push("limit.");
						}
						r.push(`${He}'s far bigger than your Master ever was, but it would be hard to even find a rival for this dick to begin with.`);
						if (canImpreg(V.PC, eventSlave)) {
							r.push(`A distinct hunger in your belly reminds you you're fertile and you wriggle your hips like a bitch in heat.`);
						}
					} else if (V.PC.counter.birthsTotal > 2) {
						if (V.PC.vagina === 0) {
							r.push(`${He} <span class="virginity loss">painfully razes your hymen.</span>`);
							V.PC.vagina++;
						}
						r.push(`You've had multiple children and ${his} ${bigDick} feels like giving birth in reverse.`);
					} else if (V.PC.career === "gang" || V.PC.career === "celebrity" || V.PC.career === "wealth") {
						r.push(`You nearly break your teeth as ${he} pushes ${his} ${bigDick} into your`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">razing your hymen,</span>`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`trying to bear nearly tearing. ${He} gives you a chance to get used to ${his} size before continuing, not that it will help much.`);
					} else {
						r.push(`You cry out as ${he} forces ${his} ${bigDick} into your too-tight`);
						if (V.PC.vagina === 0) {
							r.push(`pussy, <span class="virginity loss">razing your hymen,</span> and`);
							V.PC.vagina++;
						} else {
							r.push("pussy,");
						}
						r.push(`threatening to ruin you before reaching your cervix. ${He} considers pulling back out, but ${he} fills you so completely your vagina won't let go of what its got. Finally adjusting to the mass wedged inside you, you give the bulge in your lower belly an appreciative pat and urge ${him} to continue. It takes some time to get warmed up enough to handle ${him}, but the feeling is unimaginable.`);
					}
				} else {
					r.push(`You cry out as ${he} forces ${his} ${bigDick} into your too-tight`);
					if (V.PC.anus === 0) {
						r.push(`rear, <span class="virginity loss">painfully busting your virgin sphincter</span> and`);
						V.PC.anus++;
					} else {
						r.push(`rear,`);
					}
					r.push(`threatening to ruin you. ${He} considers pulling back out, but ${he} fills you so completely your anus won't let ${him} go. Finally adjusting to the mass wedged inside you, you give the bulge in your lower belly an appreciative pat and urge ${him} to continue. It takes some time to get warmed up enough to handle ${him}, but the feeling is unimaginable.`);
					if (V.PC.dick !== 0) {
						r.push(`Your erection firmly`);
						if (V.PC.belly >= 10000) {
							r.push(`pushes into the underside of your belly,`);
						} else {
							r.push(`sticks out from under you,`);
						}
						r.push(`overstimulated from ${his} cock crushing your prostate.`);
					}
					if (canImpreg(V.PC, eventSlave) && V.PC.mpreg) {
						r.push(`A distinct hunger in your belly reminds you you're fertile and you wriggle your hips like a bitch in heat.`);
					}
				}
			}
			r.push(`${He} gently fucks you,`);
			if (eventSlave.balls > 8) {
				r.push(`${his} oversized balls slapping your thighs with every thrust,`);
			}
			r.push(`making sure you're enjoying ${his} penis as much as physically possible. You climax`);
			if (V.PC.dick !== 0) {
				r.push(r.pop() + `, spurting your own line across the floor`);
			}
			r.push(`as ${he} cums inside, eliciting a gasp from the horny ${girl}. ${He} apologizes profusely for cumming in you, but after ${he} helps clean you up and back to your desk, all is forgiven. As you work, you can't help but steal glances at ${his} renewed erection. ${He} winks`);
			if (!canTalk(eventSlave)) {
				r.push(`and <span class="trust inc">earnestly asks</span> for more when you get the chance.`);
			} else {
				r.push(`and <span class="trust inc">asks earnestly,</span>`);
				r.push(Spoken(eventSlave, `"Want some more, ${Master}?"`));
			}
			eventSlave.trust += 4;
			if (V.PC.vagina !== -1) {
				seX(eventSlave, "penetrative", V.PC, "vaginal");
			} else {
				seX(eventSlave, "penetrative", V.PC, "anal");
			}
			if (canImpreg(V.PC, eventSlave)) {
				r.push(knockMeUp(V.PC, 20, 2, eventSlave.ID));
			}
			return r;
		}
	}
};
