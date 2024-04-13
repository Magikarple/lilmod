App.Events.RESSNotMyName = class RESSNotMyName extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => canDoAnal(s),
				s => s.anus > 0,
				s => s.slaveName !== s.birthName,
				s => s.birthName !== "",
				s => s.devotion <= 20,
				s => s.trust >= -20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const arms = hasBothArms(eventSlave) ? "arms" : "arm";

		App.Events.drawEventArt(node, eventSlave);

		const birthName = Spoken(eventSlave, eventSlave.birthName);
		const slaveName = Spoken(eventSlave, eventSlave.slaveName);

		let r = [];
		r.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		r.push(`is not yet broken to your will. With your experience with slaves, you've been expecting ${him} to take some opportunity of exercising ${his} remaining independence. You don't have long to wait. One day, you give ${him} inconsequential orders, naturally addressing ${him} by ${his} slave name, ${eventSlave.slaveName}. ${He} replies`);
		if (eventSlave.lips > 70) {
			r.push(`waspishly through ${his} dick-sucking lips,`);
		} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
			r.push(`waspishly through ${his} heavily-pierced lips,`);
		} else {
			r.push(`waspishly,`);
		}
		r.push(
			Spoken(eventSlave, `"${Master}, my name is ${birthName}."`),
			`${He} sets ${his} jaw and`
		);
		if (canSee(eventSlave)) {
			r.push(`manages to meet your eyes without flinching.`);
		} else {
			r.push(`meets your glare with a look of defiance.`);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Extirpate this foolishness with pain`, extirpate),
			new App.Events.Result(`Allow ${him} to resume ${his} birth name`, allow),
			new App.Events.Result(`Allow ${him} to resume ${his} birth name, but make it publicly humiliating`, humiliate, `This may impact ${his} sexuality.`),
			V.arcade > 0
				? 	new App.Events.Result(`Sentence ${him} to a month in the arcade`, arcade)
				: 	new App.Events.Result(),
		]);

		function extirpate() {
			r = [];
			r.push(`You seize ${him} and begin to bind ${him} for appropriate punishment. ${eventSlave.slaveName} does not resist you physically at first. ${He} finds ${himself} tied bent over your desk, face-down, with ${his} ${arms} locked behind ${him}`);
			if (eventSlave.belly >= 1500) {
				r.push(`and ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
				r.push(`belly hanging off the edge`);
			}
			r.push(r.pop() + ".");
			r.push(`${He} struggles a little when you insert your`);
			if (V.PC.dick > 0) {
				r.push(`cock`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`into ${his}`);
			if (eventSlave.anus === 1) {
				r.push(`poor little anus,`);
			} else if (eventSlave.anus === 2) {
				r.push(`whore's butt,`);
			} else {
				r.push(`gaping rear end,`);
			}
			r.push(`but ${his} real agony begins when you place ${his} ${arms} in an inescapable joint lock and apply a little pressure. It doesn't damage ${him}, but it easily causes more pain than ${he} is capable of resisting. ${He} does a little dance within ${his} bindings, squealing and involuntarily clenching you nicely with ${his} anal ring. You require ${him} to recite the litany`,
				Spoken(eventSlave, `"My name is ${slaveName}!",`),
				`coaching ${him} with alternate orders and agonizing correction until ${he}'s screaming every word at the top of ${his} lungs in an endless wail. ${His} screeching rises and falls as ${he} feels the burning sensation of your merciless use of ${his} ass, but ${he} works ${his} lungs hard to avoid as much pain as ${he} can. When you've climaxed and cast off ${his} bindings, you make ${him} repeat ${his} name one last time as ${he} stiffly rubs ${his} abused ${arms} and anus. ${He} does, <span class="trust dec">without hesitation.</span>`);
			eventSlave.trust -= 5;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function allow() {
			r = [];
			r.push(`You calmly and charitably tell ${him} that that's acceptable; ${he} can be ${eventSlave.birthName} again. ${He} has the wit to be worried, but ${he} soon finds that ${his} fears are unjustified. You offer no condition or "catch" with this bit of generosity; it seems all ${he} really had to do was ask. You usher the stunned ${SlaveTitle(eventSlave)} out of your office and on to ${his} duties before ${he} can even offer a perfunctory "thanks". Over the next week, it's clear that while ${eventSlave.slaveName} — no, ${eventSlave.birthName} — is <span class="devotion dec">not sure what to think of you now,</span> it's clear that ${he} is at least <span class="trust inc">less afraid of you.</span>`);

			eventSlave.trust += 15;
			eventSlave.devotion -= 5;
			eventSlave.slaveName = eventSlave.birthName;
			return r;
		}


		function humiliate() {
			r = [];
			r.push(`You calmly and charitably tell ${him} that that's acceptable; ${he} can be ${eventSlave.birthName} again. ${He} has the wit to be worried, and ${he} soon finds that ${his} fears are not unjustified. You bring ${him} out to`);
			if (V.club) {
				r.push(V.clubName);
			} else {
				r.push(`a public club,`);
			}
			r.push(
				`and explain with equanimity that ${he} has two choices: ${he} can either introduce ${himself} to strangers by name and offer them free oral sex, or ${he} can be whipped until ${he} introduces ${himself} to strangers by name and offers them free oral sex. ${His} lip quivers a little, but ${he} stumbles over to a nearby group of local worthies and whimpers hesitantly,`,
				Spoken(eventSlave, `"H-hi, my name is ${slaveName}... can I suck you off, please?"`),
				`They laugh, and understanding the situation perfectly, give you a <span class="reputation inc">grateful wave</span> even as their leader pushes ${him} to ${his} knees. For the rest of the week, ${he}'s seeing to ${his} duties, sleeping, or blowing strangers after telling them ${his} name. Though ${he} has reassumed ${his} birth name, it is <span class="trust dec">no longer any source of independence to ${him}.</span>`
			);
			repX(500, "event", eventSlave);
			eventSlave.trust -= 5;
			eventSlave.slaveName = eventSlave.birthName;
			seX(eventSlave, "oral", "public", "penetrative", 50);
			V.oralTotal += 50;
			if (random(1, 100) > 50) {
				r.push(`The experience has given ${him} an <span class="fetish gain">interest in humiliation.</span>`);
				eventSlave.fetishStrength = 10;
				eventSlave.fetish = "humiliation";
				eventSlave.fetishKnown = 1;
			}
			return r;
		}

		function arcade(){
			r = [];
			r.push(`${eventSlave.slaveName} screams and begs when ${he} realizes what ${his} punishment is, but you are obdurate.`);
			if (eventSlave.muscles > 30) {
				r.push(`${His} powerful form has to be sedated for immurement in the arcade.`);
			} else if (eventSlave.weight >= 190) {
				r.push(`${He} is so massively fat that immuring ${him} in the arcade is a struggle, even when ${he} isn't trying to.`);
			} else if (eventSlave.belly >= 120000) {
				r.push(`${He} is so enormously gravid that immuring ${him} in the arcade is a hassle, even though ${his} ${belly} middle limits ${his} ability to struggle.`);
			} else if (eventSlave.weight >= -10) {
				r.push(`${His} desperate struggles make immuring ${him} in the arcade difficult.`);
			} else if (eventSlave.belly >= 1500) {
				r.push(`${His}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(belly);
				}
				r.push(`body makes it slightly difficult to fit ${him} properly into the restraints for immurement in the arcade.`);
			} else if (eventSlave.muscles < -15) {
				r.push(`${His} weak body makes immuring ${him} in the arcade pathetically easy.`);
			} else {
				r.push(`${His} thin form makes immuring ${him} in the arcade pathetically easy.`);
			}
			r.push(`After ${he}'s properly confined, the only sign of ${his} discomfiture is a slight movement of ${his} ${eventSlave.skin} butt as ${he} wriggles desperately against ${his} restraints.`);
			assignJob(eventSlave, "be confined in the arcade");
			eventSlave.sentence = 4;
			return r;
		}
	}
};
