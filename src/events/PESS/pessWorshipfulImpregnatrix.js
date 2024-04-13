App.Events.pessWorshipfulImpregnatrix = class pessWorshipfulImpregnatrix extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.week > 20,
			() => !!S.HeadGirl,
			() => canPenetrate(S.HeadGirl),
			() => S.HeadGirl.balls > 0,
			() => S.HeadGirl.devotion > 95,
			() => V.universalRulesImpregnation === "HG"
		];
	}

	execute(node) {
		const {
			He, His,
			he, his, him, himself,
		} = getPronouns(S.HeadGirl);
		const {title: Master} = getEnunciation(S.HeadGirl);
		const desc = SlaveTitle(S.HeadGirl);
		App.Events.drawEventArt(node, S.HeadGirl);

		let r = [];
		r.push(contextualIntro(V.PC, S.HeadGirl, true, false, true));
		r.push(`comes wearily into your office at the end of ${his} day to check in with you, like a good Head Girl should. You're busy at the moment, so ${he} waits quietly, not wanting to interrupt you. ${He} seems tired, and leans`);
		if (S.HeadGirl.physicalAge > 35) {
			r.push(`heavily`);
		} else {
			r.push(`lightly`);
		}
		r.push(`against the back of the office couch${hasAnyProstheticArms(S.HeadGirl) ? `, ${his} mechanical hand hard against the leather` : ``}. Your Head Girl is a`);
		if (S.HeadGirl.fetish === "dom") {
			r.push(`very dominant ${desc},`);
		} else if (S.HeadGirl.fetish === "sadist") {
			r.push(`sadistic and dominant ${desc},`);
		} else {
			r.push(`dutiful ${desc} and takes ${his} leadership position seriously,`);
		}
		r.push(`but ${he} knows ${he} doesn't have to pretend to be invincible around you.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`When you've finished your task, you raise your eyes to examine ${him}. ${He}'s standing with ${his}`);
		if (S.HeadGirl.hips > 1) {
			r.push(`broad`);
		} else if (S.HeadGirl.hips < -1) {
			r.push(`narrow`);
		} else {
			r.push(`womanly`);
		}
		r.push(`hips slightly cocked and ${his}`);
		if (S.HeadGirl.muscles > 95) {
			r.push(`incredibly muscular`);
		} else if (S.HeadGirl.weight > 10) {
			r.push(`soft`);
		} else if (S.HeadGirl.muscles > 10) {
			r.push(`hard`);
		} else {
			r.push(`trim`);
		}
		r.push(`thighs bowed a bit wide. You immediately understand why: it's ${his} job to impregnate fertile slaves, a duty ${he} takes very seriously, and ${his} dick must be very sore.`);
		const exposure = App.Data.clothes.get(S.HeadGirl.clothes).exposure;
		if (exposure >= 4) {
			r.push(`${He}'s nude, making it obvious that ${his} poor soft member has done its duty today. It even looks a little moist, as though it bred a fertile slave's pussy only a few minutes ago.`);
		} else if (exposure === 3) {
			r.push(`${His} clothes don't cover ${his} dick, making it obvious that ${his} poor soft member has done its duty today. It even looks a little moist, as though it bred a fertile slave's pussy only a few minutes ago.`);
		} else if (exposure === 2) {
			r.push(`${His} clothes cover ${his} groin, but they're pretty tight, making it clear that ${his} poor soft member has done its duty today.`);
		} else {
			r.push(`${His} clothes are relatively modest, so you can't see it, but it's clear that ${his} poor soft member has done its duty today.`);
		}
		r.push(`${He} sees you examining at ${him}, and looks back at you submissively, too tired to do much else.`);
		App.Events.addParagraph(node, r);


		App.Events.addResponses(node, [
			new App.Events.Result(`Fuck ${him}`, fuck),
			new App.Events.Result(`Give ${him} some loving praise`, praise)
		]);

		function fuck() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You stand up, and from the look on your face, ${he} knows it's ${his} turn to get fucked. ${He}`);
			if (S.HeadGirl.fetish === "dom") {
				r.push(`visibly shelves ${his} dominance,`);
			} else if (S.HeadGirl.fetish === "sadist") {
				r.push(`visibly lets ${his} sadism go,`);
			} else {
				r.push(`softens visibly,`);
			}
			r.push(`looking relieved to be able to let someone else lead. You give ${him} a lustful kiss on the lips and then reach down, taking hold of ${his} thigh and spinning ${him} around, raising ${his} leg so ${his} foot's on the arm of the couch.`);
			if (V.PC.dick !== 0) {
				r.push(`You slide your dick`);
			} else {
				r.push(`${He} reaches under ${himself} and back to stroke your pussy as you press your hips against ${him}, and you slide your fingers`);
			}
			r.push(`inside ${his}`);
			if (canDoVaginal(S.HeadGirl)) {
				r.push(`pussy.`);
			} else {
				r.push(`ass.`);
			}
			r.push(`${He} groans with discomfort as ${his} overtaxed dick tries and fails to become hard again, but relaxes as`);
			if (V.PC.dick !== 0) {
				r.push(`cockhead`);
			} else {
				r.push(`fingertips`);
			}
			r.push(`stimulate the most sensitive place inside ${him}, producing arousal that obscures the soreness. You hold ${him} close,`);
			if (V.PC.dick !== 0) {
				r.push(`one`);
			} else {
				r.push(`your free`);
			}
			r.push(`arm`);
			if (S.HeadGirl.boobs > 4000) {
				r.push(`cradling one of ${his} udders`);
			} else if (S.HeadGirl.boobs > 1000) {
				r.push(`hefting one of ${his} heavy breasts`);
			} else if (S.HeadGirl.boobs > 400) {
				r.push(`holding one of ${his} boobs`);
			} else {
				r.push(`cupped over one of ${his} ${S.HeadGirl.nipples} nipples`);
			}
			r.push(`and hugging ${him} against your`);
			if (V.PC.boobs >= 300) {
				r.push(`bosom.`);
			} else {
				r.push(`hard chest.`);
			}
			r.push(
				`${He} pants exhaustedly in your arms as you take ${him}, and when ${he} climaxes, ${he} manages only a weak ejaculation onto the couch. You have mercy and fuck ${him} harder, bringing yourself to a quicker orgasm and letting ${him} fall into ${his} own mess.`,
				Spoken(S.HeadGirl, `"I`),
				App.UI.DOM.makeElement("span", Spoken(S.HeadGirl, "love you,"), ["devotion", "inc"]),
				Spoken(S.HeadGirl, `${Master},"`),
				`${he} mumbles into the cushions.`
			);
			if (V.PC.dick !== 0) {
				r.push(`Your cum glistens as it begins to drip out of ${his}`);
				if (canDoVaginal(S.HeadGirl)) {
					r.push(`well-fucked pussy.`);
				} else {
					r.push(`loosened asshole, which tightens and relaxes a little with ${his} breathing.`);
				}
			} else {
				if (canDoVaginal(S.HeadGirl)) {
					r.push(`${His} pussy glistens with ${his} pussyjuice and a little of your own, transferred between your hands as you fucked.`);
				} else {
					r.push(`${His} loosened asshole tightens and relaxes a little with ${his} breathing.`);
				}
			}
			r.push(`${He} seems to have absorbed a bit of your approach, and over the next couple of days ${he} drives ${himself} past all ${his} limitations of sexual stamina when fucking slaves in your penthouse, <span class="devotion inc">Every single one of your slaves has become better broken to your will.</span>`);
			if (canDoVaginal(S.HeadGirl)) {
				seX(S.HeadGirl, "vaginal", V.PC, "penetrative");
			} else {
				seX(S.HeadGirl, "anal", V.PC, "penetrative");
			}
			S.HeadGirl.devotion += 5;
			for (const slave of V.slaves) {
				if (assignmentVisible(slave)) {
					slave.devotion += 2;
				}
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function praise() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You stand up, give ${him} a kiss, and sit down on the couch, pulling ${him} into your lap. ${His}`);
			if (S.HeadGirl.butt > 8) {
				r.push(`monstrous ass rests heavily on`);
			} else if (S.HeadGirl.muscles > 30) {
				r.push(`heavily muscled ass is hard against`);
			} else if (S.HeadGirl.weight > 10) {
				r.push(`plush bottom is soft against`);
			} else if (S.HeadGirl.muscles > 10) {
				r.push(`toned butt is firm against`);
			} else if (S.HeadGirl.butt > 3) {
				r.push(`healthy butt is soft against`);
			} else {
				r.push(`cute bottom is firm against`);
			}
			r.push(`your toned thighs. ${He} wiggles ${himself} against you briefly, as though to gently remind you ${he}'s available without demanding anything, and then snuggles ${his} ${S.HeadGirl.skin} face into your neck. You run a hand`);
			if (S.HeadGirl.hLength === 0) {
				r.push(`across ${his} bald head,`);
			} else if (S.HeadGirl.hLength < 10) {
				r.push(`through ${his} short hair,`);
			} else {
				r.push(`through ${his} ${S.HeadGirl.hColor} hair,`);
			}
			r.push(`producing a shiver of pleasure as your fingers massage ${his} scalp. As you cuddle with your Head Girl, you praise ${his} hard work, and tell ${him} that the next generation of sex slaves in the Free Cities will owe a lot to ${him}. They'll learn from ${his} leadership, of course, but they'll also have ${his} genes. ${He} stiffens a little, and there's a slight moisture against your skin as tears begin to run down ${his} cheeks. ${He} cranes ${his} neck up and <span class="devotion inc">kisses you rapturously.</span> ${He} seems to have absorbed a bit of your vision for the future, and over the next couple of days ${he} takes special care to make sure the slaves in your penthouse <span class="trust inc">know their place in the new world you're building.</span>`);
			S.HeadGirl.devotion += 5;
			for (const slave of V.slaves) {
				if (assignmentVisible(slave)) {
					slave.trust += 2;
				}
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
