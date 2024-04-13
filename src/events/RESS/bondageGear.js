App.Events.RESSBondageGear = class RESSBondageGear extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion < -20,
				s => s.trust >= -20,
				s => s.clothes === "uncomfortable straps",
				canMove,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {He, he, His, his, him, himself} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const hands = hasBothArms(eventSlave) ? "hands" : "hand";
		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];
		t.push(`One day, you catch sight of`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		if (!canWalk(eventSlave)) {
			t.push(`crawling`);
		} else if (shoeHeelCategory(eventSlave) > 1) {
			t.push(`tottering`);
		} else if (eventSlave.belly >= 10000) {
			t.push(`waddling`);
		} else {
			t.push(`walking`);
		}
		t.push(`around stark naked. This is unacceptable, as ${he} has been ordered to wear humiliating and uncomfortable bondage gear. When confronted,`);
		if (!canTalk(eventSlave)) {
			if (!hasAnyArms(eventSlave)) {
				t.push(`${he} tries to communicate ${his} reluctance to wear the clothing as best as ${he} can with various head movements and facial`);
				if (eventSlave.bellyPreg >= 5000) {
					t.push(`expressions, including several nods towards ${his} rounded middle.`);
				} else {
					t.push("expressions.");
				}
			} else {
				t.push(`${he} uses gestures to communicate ${his} embarrassment with ${his} clothing, covering ${his} nipples, crotch, and anus with ${his} ${hands} one after the other, and begging for clothes that do the same.`);
				if (eventSlave.bellyPreg >= 5000) {
					t.push(`${He} also gestures to ${his} rounded belly with a look of concern.`);
				}
			}
		} else {
			t.push(`${he} ${say}s fearfully,`);
			if (eventSlave.bellyPreg >= 5000) {
				t.push(Spoken(eventSlave, `"I'm sorry, ${Master}, but those things are just so embarrassing! I'm also worried for my ${eventSlave.pregType > 1 ? "babies'" : "baby's"} safety."`));
			} else {
				t.push(Spoken(eventSlave, `"I'm sorry, ${Master}, but those things are just so embarrassing!"`));
			}
		}

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} go naked`, naked),
			new App.Events.Result(`Force ${him} to choose between ${his} straps and public nudity`, publicNude),
			(eventSlave.buttplug === "none" && (eventSlave.vagina < 0 || (eventSlave.vaginalAccessory === "none" && eventSlave.vaginalAttachment === "none")))
				? new App.Events.Result(`Add dildos to ${his} gear`, dildos, (eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
			(V.arcade > 0)
				? new App.Events.Result(`Sentence ${him} to a month in the arcade`, arcade)
				: new App.Events.Result(),

		]);

		function naked() {
			t = [];
			if (!canWalk(eventSlave)) {
				t.push(`${He} cheerfully leaves your office,`);
			} else {
				t.push(`${He} skips away happily,`);
			}
			t.push(`overjoyed to be free of the clothing you ordered ${him} to wear. ${His} obedience to you <span class="devotion dec">has decreased,</span> as has <span class="trust inc">${his} fear</span> of you.`);
			eventSlave.devotion -= 5;
			eventSlave.trust += 4;
			return t;
		}

		function publicNude() {
			t = [];
			t.push(`You tell ${him} that you understand, and that ${he} can go naked; ${he} looks thrilled until you ${canHear(eventSlave) ? "tell" : "inform"} ${him} ${he}'ll be ${canWalk(eventSlave) ? "walking" : `dragging ${himself} down`} every hallway in ${V.arcologies[0].name} today, nude. Before ${he} can protest, you add that ${his} only other option is to put ${his} proper clothes back on and be a good little bitch.`);
			if (eventSlave.fetish === "humiliation") {
				t.push(`${He} <span class="devotion inc">happily accepts the alternative,</span>`);
				if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					t.push(`${his} dick hardening`);
				} else if (eventSlave.dick > 0) {
					t.push(`${his} dick leaking precum`);
				} else if (eventSlave.vagina > 0) {
					t.push(`${his} pussy moistening`);
				} else {
					t.push(`${his} nipples`);
					if (eventSlave.nipples !== "fuckable") {
						t.push(`hardening`);
					} else {
						t.push(`swelling`);
					}
				}
				t.push(`with anticipation.`);
				eventSlave.devotion += 4;
				eventSlave.clothes = "no clothing";
				if (eventSlave.fetishKnown === 0) {
					t.push(`That was not the response you expected; turns out ${he} has a <span class="fetish gain">humiliation fetish.</span>`);
					eventSlave.fetishKnown = 1;
				}
			} else {
				t.push(`${He} shudders and <span class="trust dec">hurries to get ${his} straps back on.</span>`);
				eventSlave.trust -= 5;
			}
			return t;
		}

		function dildos() {
			t = [];
			t.push(`You tell ${him} that you understand, and that you will get ${him} some new clothing. ${He} is thrilled, but ${his} pleasure turns to horror when ${he} ${canSee(eventSlave) ? "sees" : "finds"} that the new clothes are a version of the same slave bondage gear, just with inward-facing dildos for ${his}`);
			if (eventSlave.vagina > -1) {
				t.push(`pussy and`);
			}
			t.push(`asshole.`);
			if (eventSlave.anus === 0 && eventSlave.vagina === 0 && canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				t.push(`You pause before getting ${him} dressed; there's little reason to waste virginities on plugs. You`);
				if (V.PC.dick !== 0) {
					t.push(`stroke yourself to erection`);
				} else {
					t.push(`don a strap-on`);
				}
				t.push(`and bend ${him} over, opting to start with ${his} tight pussy.`);
				t.push(VCheck.Both(eventSlave, 1));
			} else if (eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				t.push(`You pause before getting ${him} dressed; there's little reason to waste ${his} anal virginity on a plug. You `);
				if (V.PC.dick !== 0) {
					t.push(`stroke yourself to erection`);
				} else {
					t.push(`don a strap-on`);
				}
				t.push(`and bend ${him} over before working your way into ${his} tight anus.`);
				t.push(VCheck.Anal(eventSlave, 1));
			} else if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				t.push(`You pause before getting ${him} dressed; there's little reason to waste ${his} virginity on a plug. You`);
				if (V.PC.dick !== 0) {
					t.push(`stroke yourself to erection`);
				} else {
					t.push(`don a strap-on`);
				}
				t.push(` and bend ${him} over before working your way into ${his} tight pussy.`);
				t.push(VCheck.Vaginal(eventSlave, 1));
			}
			t.push(`For the rest of the week, ${he} ${canWalk(eventSlave) ? "walks" : "crawls"} around awkwardly, unable to find a comfortable position`);
			if (eventSlave.belly >= 1500) {
				t.push(`between`);
			} else {
				t.push(`since`);
			}
			t.push(`${his}`);
			if (V.seeRace === 1) {
				t.push(`${eventSlave.race}`);
			}
			t.push(`body`);
			if (eventSlave.belly < 1500) {
				t.push(`is`);
			}
			if (eventSlave.belly >= 1500) {
				t.push(`being penetrated by ${his} own clothing and the straps digging into ${his} ${belly} rounded belly`);
			} else {
				t.push(`being penetrated by ${his} own clothing.`);
			}
			t.push(`<span class="devotion inc">${He} has become more submissive.</span>`);
			eventSlave.devotion += 4;
			return t;
		}

		function arcade() {
			t = [];
			t.push(`${eventSlave.slaveName} ${canTalk(eventSlave) ? "screams and " : ""}begs when ${he} realizes what ${his} punishment is, but you are obdurate.`);
			if (eventSlave.muscles > 30) {
				t.push(`${His} powerful form has to be sedated for immurement in the arcade.`);
			} else if (eventSlave.weight >= 190) {
				t.push(`${He} is so massively fat that immuring ${him} in the arcade is a struggle, even when ${he} isn't trying to.`);
			} else if (eventSlave.belly >= 120000) {
				t.push(`${He} is so enormously gravid that immuring ${him} in the arcade is a hassle, even though ${his} ${belly} middle limits ${his} ability to struggle.`);
			} else if (eventSlave.weight >= -10) {
				t.push(`${His} desperate struggles make immuring ${him} in the arcade difficult.`);
			} else if (eventSlave.belly >= 1500) {
				t.push(`${His}`);
				if (eventSlave.bellyPreg >= 3000) {
					t.push(`pregnant`);
				} else {
					t.push(belly);
				}
				t.push(`body makes it slightly difficult to fit ${him} properly into the restraints for immurement in the arcade.`);
			} else if (eventSlave.muscles < -15) {
				t.push(`${His} weak body makes immuring ${him} in the arcade pathetically easy.`);
			} else {
				t.push(`${His} thin form makes immuring ${him} in the arcade pathetically easy.`);
			}
			t.push(`After ${he}'s properly confined, the only sign of ${his} discomfiture is a slight movement of ${his} ${eventSlave.skin} butt as ${he} wriggles desperately against ${his} restraints.`);
			assignJob(eventSlave, "be confined in the arcade");
			eventSlave.sentence = 4;
			return t;
		}
	}
};
