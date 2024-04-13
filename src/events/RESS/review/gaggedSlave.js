App.Events.RESSGaggedSlave = class RESSGaggedSlave extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.devotion > 20,
				s => s.mouthAccessory !== "none"
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, he, his, him
		} = getPronouns(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`You cross paths with`,
			contextualIntro(V.PC, eventSlave, true),
			`as ${he} returns from ${eventSlave.assignment} after a long day. One of the things most readily apparent about ${eventSlave.slaveName} is the`
		);
		if (eventSlave.mouthAccessory === "ball gag") {
			r.push(`ball gag keeping ${his} mouth filled,`);
		} else if (eventSlave.mouthAccessory === "bit gag") {
			r.push(`cruel bit gag keeping ${his} jaw locked,`);
		} else if (eventSlave.mouthAccessory === "ring gag") {
			r.push(`cruel ring gag keeping ${his} mouth stretched open,`);
		} else if (eventSlave.mouthAccessory === "dildo gag") {
			r.push(`dildo gag filling ${his} mouth and throat,`);
		} else if (eventSlave.mouthAccessory === "massive dildo gag") {
			r.push(`dildo gag hugely distending ${his} throat,`);
		}
		r.push(`the existence of which is a constant reminder to ${him} of ${his} submission to you and your immense power over ${him}.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`Since ${he} cannot speak through ${his} gag, ${he} merely gestures ${his} recognition of your presence and lingers in case you wish to use ${him}. Though ${he} does ${his} best to avoid showing ${his} discomfort, it is clear from the expression on ${his}`);
		if (eventSlave.face > 95) {
			r.push(`gorgeous`);
		} else if (eventSlave.face > 50) {
			r.push(`beautiful`);
		} else if (eventSlave.face >= 10) {
			r.push(`pretty`);
		} else if (eventSlave.face >= 0) {
			r.push(`nice`);
		} else {
			r.push(`homely`);
		}
		r.push(`face that the gag is a distressing addition to ${his} life. When you don't immediately give your assent one way or another, ${he} kneels before you out of`);
		if (eventSlave.devotion > 50) {
			r.push(`submission.`);
		} else {
			r.push(`fatigue after ${his} long day.`);
		}
		r.push(`From ${his} new position beneath you, ${he} must crane ${his} neck so ${his}`);
		if (canSee(eventSlave)) {
			r.push(App.Desc.eyesColor(eventSlave));
		} else {
			r.push(`sightless eyes`);
		}
		r.push(`may meet yours. With ${his} mouth gagged, ${he} is almost the perfect image of a submissive slave.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} something else to gag on`, give),
			new App.Events.Result(`Remove the gag for a few minutes`, remove),
			new App.Events.Result(`Torment ${him} with the gag`, torment),
		]);

		function give() {
			r = [];
			r.push(`As pleasant an image as ${eventSlave.slaveName}'s mouth filled by a ${eventSlave.mouthAccessory} is, one of ${his} mouth's primary purposes is still to provide you with ample`);
			if (V.PC.dick !== 0) {
				r.push(`blowjobs`);
				if (V.PC.vagina !== -1) {
					r.push(`and`);
				}
			}
			if (V.PC.vagina !== -1) {
				r.push(`cunnilingus`);
			}
			r.push(r.pop() + ".");
			r.push(`With ${eventSlave.slaveName} already kneeling, it is merely a matter of undoing ${his} gag before you can put ${his} mouth to work.`);
			if (eventSlave.skill.oral >= 100) {
				r.push(`Though ${he} has spent much time gagged, ${his} mastery at giving oral is unaffected.`);
			} else if (eventSlave.skill.oral > 60) {
				r.push(`Though ${he} has spent much time gagged, ${his} oral skills still provide ample pleasure.`);
			} else {
				r.push(`${His} time spent gagged has limited the growth of ${his} mediocre oral skills, though ${he} is still able to provide some relief.`);
			}
			if (eventSlave.teeth === "pointy") {
				r.push(`Though your attention is largely sapped by ${his} tender oral ministrations, you note that ${he} takes care not to rake you with ${his} shark-like teeth.`);
			} else if (eventSlave.lips > 40) {
				r.push(`Though your attention is largely sapped by ${his} tender oral ministrations, you note that ${his} huge lips are soft and pillowy against you.`);
			} else if (eventSlave.teeth === "fangs" || eventSlave.teeth === "fang") {
				r.push(`Though your attention is largely sapped by ${his} tender oral ministrations, you note that ${he} takes care to not poke you with ${his}`);
				if (eventSlave.teeth !== "fang") {
					r.push(`fangs.`);
				} else {
					r.push(`fang.`);
				}
			} else if (eventSlave.teeth === "gapped") {
				r.push(`Though your attention is largely sapped by ${his} tender oral ministrations, you note that ${he} takes care to let you get snagged between ${his} front teeth.`);
			} else if ((eventSlave.teeth === "straightening braces") || (eventSlave.teeth === "cosmetic braces")) {
				r.push(`Though your attention is largely sapped by ${his} tender oral ministrations, you note that ${he} takes care to keep ${his} braces off you.`);
			}
			r.push(`When you eventually move on, it is with`);
			if (eventSlave.hLength > 1) {
				r.push(`a ruffle of ${eventSlave.slaveName}'s ${eventSlave.hColor} hair`);
			} else {
				r.push(`a rub to ${eventSlave.slaveName}'s scalp`);
			}
			r.push(`and the return of the gag to ${his} mouth. Though ${his} continued gagging is an uncomfortable experience, ${eventSlave.slaveName} enjoyed <span class="devotion inc">being free of it for a moment, even if just to pleasure you.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			return r;
		}

		function remove() {
			eventSlave.trust += 4;
			return `You wordlessly remove the ${eventSlave.mouthAccessory} and watch as ${eventSlave.slaveName} opens and closes ${his} mouth testingly, as if ${he} has forgotten what it feels like to do so without obstruction. Though you eventually return to the gag to its rightful place in ${his} mouth, ${he} <span class="trust inc">trusts you more</span> for granting ${him} a few moments respite from the gag.`;
		}

		function torment() {
			r = [];
			r.push(`Though having a ${eventSlave.mouthAccessory} constrict ${his} mouth is torment enough, you take the time to linger and add to ${his} torturous existence. ${eventSlave.slaveName} soon discovers that the straps of a gag can always be made tighter, the`);
			if (eventSlave.mouthAccessory === "ball gag") {
				r.push(`ball can always be made larger,`);
			} else if (eventSlave.mouthAccessory === "bit gag") {
				r.push(`bit can always be made thicker,`);
			} else if (eventSlave.mouthAccessory === "ring gag") {
				r.push(`ring can always be made wider,`);
			} else if (eventSlave.mouthAccessory === "dildo gag") {
				r.push(`dildo can always be made larger,`);
			} else if (eventSlave.mouthAccessory === "massive dildo gag") {
				r.push(`dildo can always be made wider and longer,`);
			}
			r.push(`and the punishments rendered for daring to show any discomfort can always be harsher and stricter. Come the end of your session with ${him}, ${eventSlave.slaveName}`);
			if (eventSlave.fetish === "masochist") {
				r.push(`is mortified by the intensity of ${his} orgasms, <span class="devotion inc">and more convinced than ever that ${he}'s a pain slut,</span> and yet`);
			}
			r.push(`<span class="trust dec">scuttles away quickly, having learnt a harsh lesson about your power over ${his} body.</span>`);
			eventSlave.trust -= 5;
			if (eventSlave.fetish === "masochist") {
				eventSlave.devotion += 4;
			}
			return r;
		}
	}
};
