App.Events.REBusyMasterSuite = class REBusyMasterSuite extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.ConcubineID !== 0
		];
	}

	actorPrerequisites() {
		const req = [
			s => s.fuckdoll === 0,
			s => s.assignment === Job.MASTERSUITE,
			s => (
				(canDoAnal(s) && s.anus > 0) ||
				(canDoVaginal(s) && s.vagina > 0)
			),
		];

		return [ // Need at least three actors. Grab more later.
			req,
			req,
			req,
		];
	}

	execute(node) {
		const msSlaves = V.slaves.filter((s) => s.fuckdoll === 0 && s.assignment === Job.MASTERSUITE)
			.map((s) => {
				/** @type {Array<FC.SlaveActs|"none">} */
				let options = [];
				if (canDoAnal(s) && s.anus > 0) {
					options.push("anal");
				}
				if (canDoVaginal(s) && s.vagina > 0) {
					options.push("vaginal");
				}
				if (options.length === 0) {
					options.push("none");
				}
				return {slave: s, mode: options.pluck()};
			});
		const [participants, nonparticipants] = _.partition(msSlaves, s => s.mode !== "none");
		const bottomSlave = participants.first().slave;
		let r = [];

		App.Events.drawEventArt(node, [S.Concubine, ...msSlaves.map(s => s.slave)], "no clothing");

		const {
			He,
			he, his, him, himself
		} = getPronouns(S.Concubine);

		const {
			his2, him2, he2
		} = getPronouns(bottomSlave).appendSuffix("2");

		r.push(`You have an extended meeting with a prominent citizen planned, from the start of business in the morning until you're done. That's likely to be in the late evening, since he's probably going to get into technical business proposals, and`);
		r.push(contextualIntro(V.PC, S.Concubine, true));
		r.push(`knows it. ${He} is surprised, therefore, when a minor business emergency calls your would-be interlocutor away, canceling the meeting and sending you home hours earlier than you'd planned. ${He}`);
		if (canTalk(S.Concubine)) {
			r.push(`giggles helplessly`);
		} else {
			r.push(`signs humorously`);
		}
		r.push(`at the surprise when you walk into your suite. Apparently, ${he} decided to while away the hours until you got back by having some truly grandiose group sex with all the slaves you have in the suite.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`${He} had to turn to greet you as you entered, since ${he} was facing away from the entry, and the reason why is rather obvious. Up near the opposite wall, ${contextualIntro(S.Concubine, bottomSlave)} is on the floor with ${his2} face down and ${his2} ass up.`);

		App.Events.addParagraph(node, r);

		/** helper function for train...identify the hole being penetrated by the next slave
		 * @param {App.Entity.SlaveState} slave
		 * @param {FC.SlaveActs} mode
		 */
		function hole(slave, mode) {
			if (mode === "vaginal") {
				if (slave.vagina > 2) {
					return "loose pussy";
				} else if (slave.vagina > 1) {
					return "pussy";
				} else {
					return "tight pussy";
				}
			} else if (mode === "anal") {
				if (slave.anus > 2) {
					return "asspussy";
				} else if (slave.anus > 1) {
					return "asshole";
				} else {
					return "tight butt";
				}
			}
		}

		/** helper function for train...identify the tool being used by the next slave to penetrate this slave
		 * @param {App.Entity.SlaveState} slave
		 * @param {FC.SlaveActs} mode
		 * @param {App.Entity.SlaveState} nextSlave
		 */
		function penetrator(slave, mode, nextSlave) {
			let t = ``;
			if (canPenetrate(nextSlave)) {
				t += contextualIntro(slave, nextSlave) + "'s ";
				if (nextSlave.dick > 3) {
					t += "painfully big";
				} else {
					t += "hard";
				}
				t += " dick";
			} else {
				t += "a ";
				const size = (mode === "vaginal" ? slave.vagina : slave.anus);
				if (size > 2) {
					t += "huge";
				} else if (size > 1) {
					t += "big";
				} else {
					t += "moderate";
				}
				t += " strap-on worn by " + contextualIntro(slave, nextSlave);
			}
			return t;
		}

		App.Events.addParagraph(node, [
			/* build the train from all participating slaves */
			participants.reduce((acc, cur, i, arr) => {
				let r = ``;
				const {mode, slave} = cur;
				if (mode === "none") {
					throw new Error("Non-participating slave is participating"); // impossible, but needed for typechecking
				}
				const nextSlave = (i + 1 >= arr.length) ? S.Concubine : arr[i + 1].slave;

				if (i !== arr.length - 1) {
					r += `${slave.slaveName}'s ${hole(slave, mode)} is filled by ${penetrator(slave, mode, nextSlave)}, `;
					if (nextSlave.belly >= 150000) {
						r += `whose middle is so obscenely distended that ${slave.slaveName} is struggling to support it.`;
					} else if (nextSlave.belly >= 10000 || nextSlave.weight >= 160) {
						r += `whose middle is resting on ${slave.slaveName}'s ${slave.skin} back.`;
					} else if (nextSlave.boobs > 10000) {
						r += `whose tits are so unreasonably large they're resting on ${slave.slaveName}'s ${slave.skin} back.`;
					} else if (slave.butt > 4) {
						r += `well cushioned by ${slave.slaveName}'s huge ass.`;
					} else if (nextSlave.nipples === "huge") {
						r += `who is bending to rub ${getPronouns(nextSlave).his} enormous hard nipples across ${slave.slaveName}'s ${slave.skin} back.`;
					} else if (nextSlave.lips > 40) {
						r += `who is bending forward to nibble along ${slave.slaveName}'s ${slave.skin} neck.`;
					} else if (hasAnyArms(nextSlave)) {
						r += `who is reaching around to grope ${slave.slaveName}'s ${slave.skin} chest.`;
					} else {
						r += `who is propped up against ${slave.slaveName}'s ${slave.skin} butt.`;
					}
				} else {
					/* top slave */
					r += `Finally, ${slave.slaveName}'s ${hole(slave, mode)} is filled by ${penetrator(slave, mode, nextSlave)}, who has paused ${his} thrusting to issue a preemptory order to the slaves to stay where they are, before turning to greet you cheerfully.`;
				}
				seX(nextSlave, "penetrative", slave, mode, 1);
				return acc + ` ` + r;
			}, ``)
		]);
		/* and now describe what the non-participating slaves are doing */
		if (nonparticipants.length > 0) {
			App.Events.addParagraph(node, [
				`${toSentence(nonparticipants.map((s) => s.slave.slaveName))} can't participate in the train, so ${S.Concubine.slaveName} has them busy lying under the slaves who are, offering what oral stimulation they can manage.`
			]);
			for (const s of nonparticipants) {
				actX(s.slave, "oral");
			}
		}

		const top = participants.last();

		/** @type {FC.SlaveActs|"none"} */
		let concubineMode = "none";
		let concubineHole;
		if (canDoAnal(S.Concubine) && S.Concubine.anus > 0) {
			concubineMode = "anal";
			if (S.Concubine.anus > 2) {
				concubineHole = "loose anus";
			} else if (S.Concubine.anus > 1) {
				concubineHole = "asshole";
			} else {
				concubineHole = "tight little asshole";
			}
		} else if (canDoVaginal(S.Concubine) && S.Concubine.vagina > 0) {
			concubineMode = "vaginal";
			if (S.Concubine.vagina > 2) {
				concubineHole = "loose pussy";
			} else if (S.Concubine.vagina > 1) {
				concubineHole = "pussy";
			} else {
				concubineHole = "tight little pussy";
			}
		}

		const responses = [];
		if (concubineMode !== "none") {
			responses.push(new App.Events.Result("Slide in behind the concubine for some action", behindConcubine));
		}
		responses.push(new App.Events.Result("Slide in up at the head of the bed for some oral", bedHead));
		App.Events.addResponses(node, responses);

		function behindConcubine() {
			const frag = document.createDocumentFragment();
			const r = [];
			r.push(`${S.Concubine.slaveName} anticipates you, and is already sliding ${himself} partway out of ${top.slave.slaveName} and cocking ${his} hips to spread ${his}`);
			if (S.Concubine.butt > 15) {
				r.push(`immeasurable`);
			} else if (S.Concubine.butt > 10) {
				r.push(`expansive`);
			} else if (S.Concubine.butt > 7) {
				r.push(`enormous`);
			} else if (S.Concubine.butt > 5) {
				r.push(`huge`);
			} else if (S.Concubine.butt > 2) {
				r.push(`healthy`);
			} else {
				r.push(`trim`);
			}
			r.push(`buttocks as wide as ${he} can without disentangling ${himself} from the sex train. Up on the bed ${he}'s at just the right height, and ${he} winks ${his} ${concubineHole}`);
			if (canTalk(S.Concubine)) {
				r.push(`invitingly, laughing at the sheer decadence of it.`);
			} else {
				r.push(`invitingly.`);
			}

			if (V.PC.dick === 0) {
				r.push(`You pull on a strap-on and push it`);
			} else {
				r.push(`You push yourself`);
			}
			r.push(`home with some force, your concubine's extreme state of arousal leaving ${his} ass very relaxed and welcoming; the thrust shoves ${him} forward to hilt ${himself} in ${top.slave.slaveName}, and so on down the line, producing more giggling, some squealing, and much scrabbling for balance. It takes a while to find the rhythm, and while you wait for the inevitable tangles to be fixed you decide to challenge yourself. You reach around and`);
			if (S.Concubine.boobs > 10000) {
				r.push(`sink your hands into ${S.Concubine.slaveName}'s massive boobs,`);
			} else if (S.Concubine.boobs > 1000) {
				r.push(`heft ${S.Concubine.slaveName}'s heavy boobs,`);
			} else if (S.Concubine.boobs > 300) {
				r.push(`tease ${S.Concubine.slaveName}'s healthy breasts,`);
			} else {
				r.push(`massage ${S.Concubine.slaveName}'s flat chest,`);
			}
			r.push(`nibbling ${his} ${S.Concubine.skin} neck, and generally torturing ${him} with stimulation until ${he} climaxes to ${his} beloved ${getWrittenTitle(S.Concubine)}. When ${he} does, you extract yourself and pull ${him} unceremoniously off ${top.slave.slaveName}, replacing ${him} in ${top.slave.slaveName}'s`);

			if (top.mode === "anal") {
				r.push(`butt.`);
			} else {
				r.push(`pussy.`);
			}
			r.push(`You work your way down the line, orgasm by orgasm, delaying your own climax until the exhausted ${bottomSlave.slaveName} manages yet another orgasm by heroic efforts, and you're done. As you roll off ${him2}, panting, there is scattered applause and much congratulation from your harem of <span class="trust inc">trusting slaves.</span>`);
			S.Concubine.trust += 5;
			if (concubineMode !== "none") {
				seX(V.PC, "penetrative", S.Concubine, concubineMode);
			}
			for (const s of msSlaves) {
				s.slave.trust += 1;
				if (s.mode !== "none") {
					seX(V.PC, "penetrative", s.slave, s.mode);
				}
			}
			if (canImpreg(bottomSlave, V.PC)) {
				knockMeUp(bottomSlave, 10, 1, V.PC.ID);
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function bedHead() {
			const frag = document.createDocumentFragment();
			const r = [];
			r.push(`${bottomSlave.slaveName}'s ${App.Desc.eyesColor(bottomSlave)} widen when you push ${him2} upright for a moment and slide in under ${him2}, but ${he2} wraps ${his2}`);
			if (bottomSlave.lips > 95) {
				r.push(`facepussy`);
			} else if (bottomSlave.lips > 70) {
				r.push(`dick-sucking lips`);
			} else if (bottomSlave.lips > 20) {
				r.push(`pretty lips`);
			} else {
				r.push(`lips`);
			}
			r.push(`around your`);
			if (V.PC.dick === 0) {
				r.push(`clit`);
			} else {
				r.push(`cock`);
				if (V.PC.vagina !== -1) {
					r.push(`and starts stroking your pussy`);
				}
			}
			r.push(`eagerly enough, even as ${msSlaves[1].slave.slaveName} goes back to fucking ${him2}. The sex train is fairly gentle, since anything too fast would disintegrate the gymnastic arrangement, but ${bottomSlave.slaveName} is still getting enough stimulation that ${he2} whimpers quietly into your`);
			if (V.PC.vagina !== -1) {
				r.push(`pussy,`);
			} else {
				r.push(`dick,`);
			}
			r.push(`a nice feeling. The blowjob is`);
			if (bottomSlave.skill.oral >= 100) {
				r.push(`masterful, despite the distraction,`);
			} else if (bottomSlave.skill.oral > 10) {
				r.push(`serviceable, despite the distraction,`);
			} else {
				r.push(`only mediocre, but serviceable enough,`);
			}
			r.push(`so you let ${him2} work for a while before gently shoving ${him2} off the side of the bed and telling ${him2} to get to the back of the line. The slaves all shuffle forward awkwardly, and inadvertently block your view so that you hear rather than see ${bottomSlave.slaveName} start groping your concubine ${S.Concubine.slaveName}'s`);
			if (S.Concubine.butt > 15) {
				r.push(`immeasurable`);
			} else if (S.Concubine.butt > 10) {
				r.push(`expansive`);
			} else if (S.Concubine.butt > 7) {
				r.push(`enormous`);
			} else if (S.Concubine.butt > 5) {
				r.push(`huge`);
			} else if (S.Concubine.butt > 2) {
				r.push(`healthy`);
			} else {
				r.push(`trim`);
			}
			r.push(`ass down near the foot of the bed. You climax, on occasion, but are enjoying yourself so immensely that you let the slaves continue the rotation until you're entirely spent, and they're entirely exhausted. You reach for a tablet to get some work done, in the center of a pile of sweaty, tired slaves, all of whom are resting with at least one body part in contact with their <span class="devotion inc">beloved</span> ${properMaster()}.`);
			S.Concubine.devotion += 5;
			seX(V.PC, "penetrative", S.Concubine, "oral");
			for (const s of msSlaves) {
				s.slave.devotion += 1;
				seX(V.PC, "penetrative", s.slave, "oral", 2);
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
