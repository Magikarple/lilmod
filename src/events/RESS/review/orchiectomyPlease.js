App.Events.RESSOrchiectomyPlease = class RESSOrchiectomyPlease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.hormoneUpgradeMood === 0,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.assignment !== Job.QUARTER,
				s => s.balls > 0,
				s => s.hormoneBalance >= 100,
				s => s.trust >= -50,
				s => s.devotion >= -20,
				s => s.devotion <= 50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`Near the end of`,
			contextualIntro(PC, eventSlave, true)
		);
		r.addToLast(`'s weekly inspection, it's obvious the ${SlaveTitle(eventSlave)} is nerving ${himself} to ask you something.`);
		if (eventSlave.devotion > 20) {
			r.push(`${He}'s been good recently,`);
		} else {
			r.push(`${He} went through the nude inspection obediently,`);
		}
		r.push(`so you save ${him} further torment and order ${him} to ask ${his} question. It's a command, but you issue it in a tone meant to assuage ${his} nervousness. It works, and after two false starts, ${he} gathers ${his} courage and politely asks you to cut ${his} balls off.`);
		r.toParagraph();
		r.push(`${He} doesn't phrase it quite like that, of course.`);
		if (!canTalk(eventSlave)) {
			r.push(`${He} uses careful gestures to explain ${himself} in detail. ${He} expresses acceptance of ${his} status as a sex slave, and states that ${he}'s become used to impotence. ${He}'s suffering from moodiness, however, and has`);
			if (canHear(eventSlave)) {
				r.push(`heard rumors`);
			} else {
				r.push(`learned`);
			}
			r.push(`from other slaves that this might be because of the hormonal suppression necessary to allow ${his} hormone treatments to work despite ${his} natural hormones. ${He} asks for an orchiectomy, if it will help stabilize ${his} emotional state.`);
		} else {
			r.push(
				Spoken(eventSlave, `"${Master}, may I please have an orchiectomy?"`),
				`${he} ${say}s, and then gestures at ${his} limp dick.`,
				Spoken(eventSlave, `"I'm, um, impotent, and since I'm on hormones, I've, um, kind of gotten used to being that way. I get really sad randomly, though. And some of the other girls say that it's the hormones and, um, my hormones clashing."`),
				`${He} squares ${his} shoulders.`,
				Spoken(eventSlave, `"I understand that I'm a sex slave. I accept it. May I please have that surgery, ${Master}, if it'll make me less moody?"`)
			);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Order ${him} to behave ${himself}`, order),
			new App.Events.Result(`Reassure ${him} about ${his} body`, reassure),
			(canDoAnal(eventSlave))
				?	new App.Events.Result(`Agree and make sure ${he} doesn't regret it`, agree, eventSlave.anus === 0 ? `This option will take ${his} virginity` : null)
				:	new App.Events.Result()
		]);

		function order() {
			eventSlave.trust -= 2;
			return `You give ${him} stern orders to be a good ${girl} and behave ${himself}, regardless of ${his} silly moods. You don't deign to directly deny ${his} request for a genital reconfiguration, and ${he} has the presence of mind not to ask for an explicit denial. ${He} offers you profoundly submissive promises to control ${his} emotions and be a good slave, though ${he} can't hide a glimmer of <span class="trust dec">fear</span> that ${he}'ll fail and suffer punishment.`;
		}

		function reassure() {
			const r = new SpacedTextAccumulator();
			r.push(`You tell ${him} you aren't planning to do that to ${him}. You explain that ${he} might be feeling like ${he}'s fully integrated into a life of sexual slavery now, but ${he}'s not even close; ${he}'s got a long way to go before ${he}'s perfectly devoted and trusting. The words might sound harsh, but you deliver them kindly, making the statement one of hope. ${He} listens without disappointment, and brightens further when you predict that in a few weeks, ${he}'ll get used to ${his} body's chemistry and accept it. Finally, you add, ${his} current configuration is the best for ${his} sex drive. ${He} bites ${his} lip and gives you a daring little look when ${he}`);
			if (canHear(eventSlave)) {
				r.push(`hears`);
			} else {
				r.push(`understands`);
			}
			r.push(`that, but you decide to keep ${him} waiting and send ${him} on ${his} way. ${He} <span class="devotion inc">thanks you</span> without dissembling, not realizing how profoundly ${his} life has changed, for ${him} to be reassured by that.`);
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}

		function agree() {
			const r = new SpacedTextAccumulator();
			r.push(`You agree and send ${him} straight to the surgery. ${He} looks a little hesitant, as though the prospect is intimidating now that it's actually about to happen, but ${he} complies obediently. You direct ${V.assistant.name} to bring ${him} back to your office as soon as ${he}'s fully recovered. The curatives applied right after surgery hasten ${his} recovery, and ${he}'s back the next day, standing a little gingerly, ${his} limp dick looking a bit sore. ${He} greets you properly, and comes over willingly when you recline in your chair and`);
			if (canSee(eventSlave)) {
				r.push(`crook a finger at`);
			} else {
				r.push(`beckon`);
			}
			r.push(`${him}.`);
			if (canSee(eventSlave)) {
				r.push(`As ${he} approaches, ${he} notices that`);
				if (PC.dick !== 0) {
					r.push(`you've got your`);
					if (PC.vagina !== -1) {
						r.push(`futa`);
					}
					r.push(`dick out,`);
				} else {
					r.push(`you're wearing a strap-on,`);
				}
				r.push(`and looks a little apprehensive,`);
			} else {
				r.push(`${He} approaches gingerly, still slightly sore,`);
			}
			r.push(`but ${he} sits down obediently,`);
			if (PC.dick !== 0) {
				r.push(`your erection`);
			} else {
				r.push(`the phallus`);
			}
			r.push(`coming to rest between ${his} legs and lower buttocks, resting against ${his} perineum and the smooth, recently healed patch of skin at the base of ${his} dick where ${his} ballsack used to be. ${He} gasps at the sensation of`);
			if (PC.dick !== 0) {
				r.push(`your hot cock`);
				if (PC.vagina !== -1) {
					r.push(`and the wet pussy beneath it`);
				}
			} else {
				r.push(`the hard thing`);
			}
			r.push(`pressed against ${his} most intimate area, but ${he} doesn't flinch away.`);
			r.toParagraph();
			r.push(`You take your time with ${him}, leaning back in your chair so that ${he}'s lying`);
			if (PC.boobs >= 1400) {
				r.push(`against your enormous`);
				if (PC.boobsImplant !== 0) {
					r.push(`fake breasts.`);
				} else {
					r.push(`cow tits.`);
				}
			} else if (PC.boobs >= 1200) {
				r.push(`against your huge`);
				if (PC.boobsImplant !== 0) {
					r.push(`firm`);
				} else {
					r.push(`soft`);
				}
				r.push(`breasts.`);
			} else if (PC.boobs >= 1000) {
				r.push(`against your big`);
				if (PC.boobsImplant !== 0) {
					r.push(`firm`);
				}
				r.push(`breasts.`);
			} else if (PC.boobs >= 300) {
				r.push(`against your tits`);
			} else if (PC.title === 0) {
				r.push(`against your flat chest`);
			} else {
				r.push(`on your chest`);
			}
			r.push(`and bringing ${his} head around so you can make out. You play with ${his}`);
			if (eventSlave.boobs > 1000) {
				r.push(`udders`);
			} else if (eventSlave.boobs > 300) {
				r.push(`boobs`);
			} else {
				r.push(`nipples`);
			}
			r.push(`for a while, slowly starting to grind`);
			if (PC.dick !== 0) {
				r.push(`your dick`);
				if (PC.vagina !== -1) {
					r.push(`and the pussy attached to it`);
				}
			} else {
				r.push(`the strap-on`);
			}
			r.push(`back and forth between ${his} legs. ${He} starts to ride you, and starts to beg you to fuck ${him}. You take ${him} under the arms and pull ${him} up, letting`);
			if (PC.dick !== 0) {
				r.push(`your erection`);
			} else {
				r.push(`the dildo`);
			}
			r.push(`spring free; ${he} takes the cue and lines its head up with ${his}`);
			if (eventSlave.anus > 2) {
				r.push(`asspussy.`);
			} else if (eventSlave.anus > 1) {
				r.push(`asshole.`);
			} else {
				r.push(`tight pucker.`);
			}
			r.push(VCheck.Anal(eventSlave, 1));
			r.push(`${He} shivers with pleasure as you lower ${him} onto it and ${he} feels the pressure`);
			if (eventSlave.prostate > 0) {
				r.push(`against ${his} prostate.`);
			} else {
				r.push(`in ${his} rectum.`);
			}
			r.push(`${He}'s so aroused that ${he} climaxes immediately, shuddering as ${his}`);
			if (eventSlave.dick > 6) {
				r.push(`monstrous floppy dick twitches, dripping`);
			} else if (eventSlave.dick > 3) {
				r.push(`big but now permanently soft dick drips`);
			} else if (eventSlave.dick > 1) {
				r.push(`little bouncing bitch dick dribbles`);
			} else {
				r.push(`shockingly tiny penis dribbles`);
			}
			if (eventSlave.prostate > 2) {
				r.push(`an obscene`);
			} else if (eventSlave.prostate > 1) {
				r.push(`a large`);
			} else if (eventSlave.prostate === 0) {
				r.push(`a negligible`);
			} else {
				r.push(`a small`);
			}
			r.push(`amount of clear fluid. By the time you carry ${his} <span class="devotion inc">limply submissive</span> body to the shower, ${he}'s orgasmed twice more to your artful anal lovemaking.`);
			eventSlave.devotion += 4;
			eventSlave.balls = 0;
			eventSlave.scrotum = 0;
			healthDamage(eventSlave, 1);
			r.toParagraph();
			return r.container();
		}
	}
};
