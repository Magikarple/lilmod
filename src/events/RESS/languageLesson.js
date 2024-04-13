// cSpell:ignore Fingerfuuuck, Cliiiiiit, augh

App.Events.RESSLanguageLesson = class RESSLanguageLesson extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canStand,
				canHear,
				s => s.assignment !== Job.QUARTER,
				s => s.voice > 0,
				s => s.lips <= 95,
				s => s.mouthAccessory === "none",
				s => s.accent === 3,
				s => s.devotion <= 50,
				s => s.trust >= -20,
				s => (s.devotion >= -20 || s.trust <= 20),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him, himself} = getPronouns(eventSlave);
		const {himselfP} = getPronouns(V.PC).appendSuffix("P");
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(`Standing before you for an inspection is`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."));
		r.push(`The obedient ${SlaveTitle(eventSlave)} has run through the prescribed motions of a normal inspection, and you've reached the part of the routine where you usually ask the slave a few questions, give ${him} a few orders, or fuck ${him}. ${His}`);
		if (canSee(eventSlave)) {
			r.push(`${App.Desc.eyesColor(eventSlave)} are watching you closely,`);
		} else {
			r.push(`face is centered on you,`);
		}
		r.push(`and ${he}'s listening carefully for direction. This is probably due to linguistic anxiety: ${he} can understand the most straightforward commands, but giving ${him} orders is often an exercise in`);
		if (canSee(eventSlave)) {
			r.push(`pointing and gesturing, or when that fails, simply`);
		} else {
			r.push(`frustration, ending with you simply`);
		}
		r.push(`pushing and pulling ${his} usually-compliant body into the proper place.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} personal language lessons`, language),
			new App.Events.Result(`Teach ${him} the words for body parts`, bodyParts),
		]);

		function language(){
			const frag = document.createDocumentFragment();
			r = [];

			r.push(`You order ${him} to sit next to you. Sure enough, ${he} hesitates, but ${he} seems to have gotten the 'next to you' part, and comes carefully over,`);
			if (canSee(eventSlave)) {
				r.push(`watching you`);
			} else {
				r.push(`listening`);
			}
			r.push(`intently for any indication that ${he}'s misunderstood you. Once there, ${he} stops, knees bent partway as ${he} second-guesses ${himself} about whether ${he}'s supposed to sit. Sighing internally, you grab`);
			if (eventSlave.belly >= 5000) {
				if (eventSlave.piercing.navel.weight > 0) {
					r.push(`the piercing dangling from ${his} ${belly} belly`);
				} else {
					r.push(`${his} ${belly} belly`);
				}
			} else if (eventSlave.piercing.nipple.weight > 0) {
				r.push(`a nipple piercing`);
			} else if (eventSlave.nipples === "fuckable") {
				r.push(`a nipplecunt`);
			} else if (eventSlave.lactation > 0) {
				r.push(`a milky nipple`);
			} else {
				r.push(`a nipple`);
			}
			r.push(`and pull downward gently.`, Spoken(eventSlave, `"Sorry ${Master},"`), `${he} mutters in ${his} barbarous ${eventSlave.nationality !== "Stateless" ? `${aNational(eventSlave.nationality)}` : ""} accent, and sits`);
			if (eventSlave.belly >= 5000) {
				r.push(`carefully down.`);
			} else {
				r.push(`hurriedly down.`);
			}
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`You review 'next,' praising ${him} for getting that, and then move on to 'sit,' 'stand,' and other such useful terms, teaching the ${V.language} language to the nude slave sitting`);
			if (eventSlave.belly >= 10000 || eventSlave.weight >= 130) {
				r.push(`heavily`);
			} else if (hasBothLegs(eventSlave)) {
				r.push(`cross-legged`);
			}
			r.push(`next to you. ${He} listens raptly, parroting obediently and clearly doing ${his} best to please, but you notice a certain incredulity that slowly fades as the lesson goes on. ${He}'s obviously having trouble believing that ${his} owner would trouble ${himselfP} with ${his} vocabulary lessons. You work with ${him} several times a day, and ${he}'s so diligent that by the end of the week ${he}'s <span class="improvement">beginning to make ${himself} understood,</span> though ${his} accent is still pretty atrocious.`);
			eventSlave.accent--;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function bodyParts(){
			const frag = document.createDocumentFragment();

			r = [];
			r.push(`You order ${him} to stand next to you. ${He} hesitates, but eventually processes the instruction and`);
			if (canWalk(eventSlave)) {
				r.push(`hurries`);
			} else {
				r.push(`shuffles`);
			}
			r.push(`over. When ${he} comes to a stop, ${he} gasps to find you taking ${him} by the`);
			if (hasBothArms(eventSlave)) { // really going all in here
				r.push(`hands. You raise them slightly, bringing them`);
				if (canSee(eventSlave)) {
					r.push(`up into ${his} field of view,`);
				} else {
					r.push(`to ${his} attention,`);
				}
				r.push(`and tell ${him} that these are ${his} hands. "${Spoken(eventSlave, "Hands")}," ${he} parrots in ${V.language} understanding that this is a language lesson. Your own hands slide over ${his} wrists to grasp ${his}`);
				if (eventSlave.weight > 160) {
					r.push(`fat`);
				} else if (eventSlave.weight > 95) {
					r.push(`chubby`);
				} else if (eventSlave.muscles > 5) {
					r.push(`toned`);
				} else {
					r.push(`soft`);
				}
				r.push(`forearms, producing a little shiver; you name them, and ${he} repeats after you, "${Spoken(eventSlave, "Arms")}." You reach`);
			} else {
				r.push(`hand. You raise it slightly, bringing it`);
				if (canSee(eventSlave)) {
					r.push(`up into ${his} field of view,`);
				} else {
					r.push(`to ${his} attention,`);
				}
				r.push(`and tell ${him} that these are ${his} hand. "Hand," ${he} parrots in ${V.language} understanding that this is a language lesson. Your own hands slide over ${his} wrist to grasp ${his}`);
				if (eventSlave.weight > 160) {
					r.push(`fat`);
				} else if (eventSlave.weight > 95) {
					r.push(`chubby`);
				} else if (eventSlave.muscles > 5) {
					r.push(`toned`);
				} else {
					r.push(`soft`);
				}
				r.push(`forearm, producing a little shiver; you name it, and ${he} repeats after you, "Arm." You reach`);
			}
			if (eventSlave.height >= 185) {
				r.push(`a long way up to reach the tall`);
			} else if (eventSlave.height >= 160) {
				r.push(`up to caress the`);
			} else {
				r.push(`out to touch the diminutive`);
			}
			r.push(`slave's shoulders possessively, and name them.`, Spoken(eventSlave, `"Shoulder."`));
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`You continue from there.`, Spoken(eventSlave, `"Neck. Chin. Lips. Chest. Boobs. ${eventSlave.nipples === "fuckable" ? "N-nipplecunts" : "N-nipples"}. Belly. Hips,`));
			if (eventSlave.dick > 0) {
				if (eventSlave.balls > 0) {
					r.push(Spoken(eventSlave, `c-cock, oh ${Master}, p-please, augh, balls,`));
				} else {
					r.push(Spoken(eventSlave, `b-bitchclit, oh ${Master}, p-please,`));
				}
			}
			if (eventSlave.vagina > -1) {
				r.push(Spoken(eventSlave, `pussy. Cliiiiiit, oh ${Master} n-nuh,`));
			}
			r.push(Spoken(eventSlave, `Butt," and finally, "B-butt, um, butthole."`));
			App.Events.addParagraph(frag, r);
			App.Events.addResponses(frag, [
				new App.Events.Result(`Now let ${him} review`, review),
				canDoVaginal(eventSlave)
					? new App.Events.Result(`Cover some sexual vocabulary, and make sure ${he} doesn't forget it`, sexual, eventSlave.vagina === 0 ? `This option will take ${his} virginity` : null)
					: new App.Events.Result(),
				canDoAnal(eventSlave)
					? new App.Events.Result(`Cover some anal vocabulary, and make sure ${he} doesn't forget it`, anal, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null)
					: new App.Events.Result(),
				canPenetrate(eventSlave) && isPlayerReceptive(eventSlave)
					? new App.Events.Result(`Cover some extra curricular vocabulary, and see if ${he} retains it`, fuckMe, PCPenetrationWarning())
					: new App.Events.Result(),
			]);

			function review() {
				r = [];
				r.push(`You tell ${him} to do the inspection routine again, narrating it ${himself}. ${He} understands immediately, and hustles back to stand in front of your desk, brow furrowed in concentration as ${he} struggles to keep the vocabulary in ${his} head. ${He} shows each part of ${his} body to you in turn, and gets every single one of the terms to describe ${his} body — which in the legal sense, is actually <i>your</i> body, one of many you own — perfectly right, though of course ${he} repeats them in ${his} atrocious ${eventSlave.nationality !== "Stateless" ? `${aNational(eventSlave.nationality)}` : ""} accent. ${He} even <span class="trust inc">has the confidence</span> to throw in a little flourish: ${he} says`);
				if (eventSlave.belly >= 10000) {
					r.push(`"Belly!" with flirty emphasis, stroking it sensually.`);
				} else if (eventSlave.boobs > 3000) {
					r.push(Spoken(eventSlave, `"Boobs!"`), `with flirty emphasis, bouncing them for you.`);
				} else if (eventSlave.dick > 0 && eventSlave.balls > 0) {
					r.push(Spoken(eventSlave, `"Cock!"`), `with flirty emphasis, making it bounce for you.`);
				} else if (eventSlave.dick > 0) {
					r.push(Spoken(eventSlave, `"Bitchclit!"`), `with flirty emphasis, making it wave for you.`);
				} else if (eventSlave.lips > 40) {
					r.push(Spoken(eventSlave, `"Lips!"`), `with flirty emphasis, and blows you a kiss.`);
				} else if (eventSlave.butt > 4) {
					r.push(`"Butt!" with flirty emphasis, jiggling it for you.`);
				} else {
					r.push(`"Butthole!" with flirty emphasis, bending over and`);
					if (!canDoAnal(eventSlave)) {
						r.push(`shaking ${his} anal chastity at you.`);
					} else {
						r.push(`winking it for you.`);
					}
				}
				eventSlave.trust += 4;
				return r;
			}

			function sexual() {
				const {girlU, himU, hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

				r = [];
				r.push(`A glance at one of your desk monitors reveals that another slave whose business brought ${himU} past this area of the penthouse has paused and is listening quizzically, trying to figure out what this odd, heavily accented chant coming out of your office means. It soon becomes obvious.`);
				r.push(Spoken(eventSlave, `"Fingerfuuuck!"`));
				r.push(`comes ${eventSlave.slaveName}'s voice, loud and clear, and <span class="devotion inc">desperately eager to please.</span> ${He} continues, moving from "Pussy" to`);
				if (V.PC.dick !== 0) {
					r.push(Spoken(eventSlave, `"${Master}'s ${V.PC.vagina !== -1 ? "futacock" : "cock"}, oh no,"`));
				} else {
					r.push(Spoken(eventSlave, `"Strap-on, oh no,"`));
				}
				r.push(`to repetition of`);
				r.push(Spoken(eventSlave, `"Intercourse, sex, unh, fucking, screwing, um, pounding,"`));
				r.push(`and so on. Just when the eavesdropping ${girlU} decides that this has become monotonous and turns to go about ${hisU} business, ${eventSlave.slaveName}'s voice rises sharply in pitch. "Aaah! <span class="trust dec">rape!</span>`);
				r.push(Spoken(eventSlave, `Oh please, ${Master}, ohh, rape, rape,"`));
				r.push(`followed by much tearful repetition of what's happening to ${him}, and a final, sad`);
				if (V.PC.dick !== 0) {
					r.push(Spoken(eventSlave, `"C-creampie,"`));
				} else {
					r.push(`"Loosened,"`);
				}
				r.push(`in a defeated little voice.`);
				eventSlave.trust -= 2;
				eventSlave.devotion += 4;
				r.push(VCheck.Vaginal(eventSlave, 1));
				return r;
			}

			function anal() {
				const {girlU, himU, hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

				r = [];
				r.push(`A glance at one of your desk monitors reveals that another slave whose business brought ${himU} past this area of the penthouse has paused and is listening quizzically, trying to figure out what this odd, heavily accented chant coming out of your office means. It soon becomes obvious.`);
				r.push(Spoken(eventSlave, `"Fingerfuuuck!"`));
				r.push(`comes ${eventSlave.slaveName}'s voice, loud and clear, and <span class="devotion inc">desperately eager to please.</span> ${He} continues, moving from "Sphincter" to`);
				if (V.PC.dick !== 0) {
					r.push(Spoken(eventSlave, `"${Master}'s ${V.PC.vagina !== -1 ? "futacock" : "cock"}, oh no,"`));
				} else {
					r.push(Spoken(eventSlave, `"Strap-on, oh no,"`));
				}
				r.push(`to repetition of`);
				r.push(Spoken(eventSlave, `"Anal, buttsex, unh, assfucking, sodomy, um, buttfucking,"`));
				const Assrape = Spoken(eventSlave, "Assrape");
				r.push(`and so on. Just when the eavesdropping ${girlU} decides that this has become monotonous and turns to go about ${hisU} business, ${eventSlave.slaveName}'s voice rises sharply in pitch. "Aaah! <span class="trust dec">${Assrape}!</span>`);
				r.push(Spoken(eventSlave, `Oh please, ${Master}, ohh, assrape, assrape,"`));
				r.push(`followed by much tearful repetition of what's happening to ${him}, and a final, sad`);
				if (V.PC.dick !== 0) {
					r.push(Spoken(eventSlave, `"C-creampie,"`));
				} else {
					r.push(`"Gape,"`);
				}
				r.push(`in a defeated little voice.`);
				eventSlave.trust -= 2;
				eventSlave.devotion += 4;
				r.push(VCheck.Anal(eventSlave, 1));
				return r;
			}

			function fuckMe() {
				const {girlU, himU, hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

				r = [];
				r.push(`A glance at one of your desk monitors reveals that another slave whose business brought ${himU} past this area of the penthouse has paused and is listening quizzically, trying to figure out what this odd, heavily accented chant coming out of your office means. It soon becomes obvious.`);
				r.push(Spoken(eventSlave, `"Erection!"`));
				r.push(`comes ${eventSlave.slaveName}'s voice, loud and clear, and <span class="devotion inc">desperately eager to please.</span> ${He} continues, moving from "Glans" to`);
				if (V.PC.vagina === 0) {
					r.push(`a surprised`);
					r.push(App.UI.DOM.makeElement('span', Spoken(eventSlave, `"Hymen!?"`), ["virginity", "loss"]));
					r.push(`to a sigh and more pleasured`);
					V.PC.vagina = 1;
				} else if (V.PC.vagina < 0 && V.PC.anus === 0) {
					r.push(`a surprised`);
					r.push(App.UI.DOM.makeElement('span', Spoken(eventSlave, `"Anus... virgin!?"`), ["virginity", "loss"]));
					r.push(`to a sigh and more pleasured`);
					V.PC.anus = 1;
				}
				r.push(Spoken(eventSlave, `"${Master}'s ${V.PC.vagina !== -1 ? "pussy" : "butthole"}, ah warm,"`));
				r.push(`to repetition of`);
				r.push(Spoken(eventSlave, `"Intercourse, sex, unh, fucking, breeding, um, mounting,"`));
				const Orgasm = Spoken(eventSlave, "Orgasm");
				r.push(`and so on. Just when the eavesdropping ${girlU} decides that this might be too salacious for ${hisU} well-being and turns to go about ${hisU} business, ${eventSlave.slaveName}'s voice rises sharply in pitch. "Aaah! <span class="trust inc">${Orgasm}!</span>`);
				r.push(Spoken(eventSlave, `Oh ${Master}, ohh, orgasm, orgasm,"`));
				r.push(`followed by much breathless repetition of what's about to come, and a final, ecstatic`);
				r.push(Spoken(eventSlave, `"C-creampie!"`));
				r.push(`in a completely out of breath voice.`);
				eventSlave.trust += 4;
				eventSlave.devotion += 4;
				if (V.PC.vagina !== -1) {
					seX(eventSlave, "penetrative", V.PC, "vaginal");
					if (canImpreg(V.PC, eventSlave)) {
						knockMeUp(V.PC, 20, 0, eventSlave.ID);
					}
				} else {
					seX(eventSlave, "penetrative", V.PC, "anal");
					if (canImpreg(V.PC, eventSlave)) {
						knockMeUp(V.PC, 20, 1, eventSlave.ID);
					}
				}
				return r;
			}
			return frag;
		}
	}
};
