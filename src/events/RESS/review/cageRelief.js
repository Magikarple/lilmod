App.Events.RESSCageRelief = class RESSCageRelief extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.balls > 0,
				s => s.scrotum > 0,
				s => s.chastityPenis === 1,
				s => s.energy > 50,
				s => s.energy < 95,
				s => s.devotion <= 95,
				s => s.devotion >= -20 || s.trust < -20
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, hers
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`You come face to face with`,
			contextualIntro(PC, eventSlave, true),
			`in a hallway of your penthouse, entirely by happenstance.`
		);
		if (canSee(eventSlave)) {
			r.push(`${His} ${App.Desc.eyesColor(eventSlave)} lock with yours, and ${he} stares at you dumbly for a long moment.`);
		} else {
			r.push(`Once ${he} regains ${his} footing after bumping into you, ${he} gazes towards you dumbly for a long moment.`);
		}
		r.push(`Then ${he} squares ${his}`);
		if (eventSlave.shoulders > 0) {
			r.push(`broad`);
		} else if (eventSlave.shoulders < 0) {
			r.push(`pretty`);
		} else {
			r.push(`feminine`);
		}
		r.push(`shoulders and bites ${his} lower lip, obviously doing ${his} best to think quickly. Right when you're about to reprimand ${him} for not greeting you properly, ${he} surprises you by throwing ${himself} abjectly on the ground in front of you`);
		if (eventSlave.belly >= 10000) {
			r.push(r.pop() + `, ${his} rear forced into the air by ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			} else {
				r.push(`distended`);
			}
			r.push(`belly`);
		}
		r.push(r.pop() + `.`);
		App.Events.addParagraph(node, r);

		r = [];
		if (!canTalk(eventSlave)) {
			r.push(`${He} uses gestures to apologize for ${his} rudeness, and then gets to ${his}`);
			if (hasBothLegs(eventSlave)) {
				r.push(`knees`);
			} else {
				r.push(`knee`);
			}
			r.push(`so ${he} can use ${his} hand`);
			if (hasBothArms(eventSlave)) {
				r.push(`hands`);
			} else {
				r.push(`hand`);
			}
			r.push(`to gesture more clearly. ${His}`);
			if (hasBothArms(eventSlave)) {
				r.push(`hands are`);
			} else {
				r.push(`hand is`);
			}
			r.push(`shaky as ${he} begs, making two false starts before unmistakably gesturing to ask you to cut ${his} balls off. Once ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else {
				r.push(`figures`);
			}
			r.push(`that you understand, ${he} begins to cry openly. ${He} gestures that ${he} can barely get off wearing ${his} chastity cage, that it hurts when ${he} does, and that ${he}'s constantly oppressed by the need for release. ${He} thinks that it would be easier to be soft all the time, so ${he} could climax without discomfort. ${He} begs hard, and promises to be a good little bitch.`);
		} else {
			r.push(
				Spoken(eventSlave, `"Please, ${Master},"`),
				`the prostrate slave ${say}s shakily, sounding like ${he}'s on the verge of tears.`,
				Spoken(eventSlave, `"P-please cut my balls off."`)
			);
			if (canHear(eventSlave)) {
				r.push(`Hearing ${himself} ${say} it, ${he}`);
			} else {
				r.push(`${He}`);
			}
			r.push(
				`begins to cry openly.`,
				Spoken(eventSlave, `"I c-can't t-take it anymore. I can b-barely get off wearing this cage on my dick, and when I d-do, it h-hurts,"`),
				`${he} sobs.`,
				Spoken(eventSlave, `"I need to g-g-get off s-so bad. Please, please, if I were soft all the time, I wouldn't get hard, so I could come wh-whenever."`),
				He
			);
			if (canSee(eventSlave)) {
				r.push(`looks up at`);
			} else {
				r.push(`angles ${his} head towards you`);
			}
			r.push(
				`you in supplication, tears streaking ${his} face.`,
				Spoken(eventSlave, `"Please, ${Master}! I'll be s-such a good little bitch, I promise!"`)
			);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Help ${him} get off`, help),
			new App.Events.Result(`Cut ${his} balls off`, cut, eventSlave.anus === 0 && canDoAnal(eventSlave) ? `This option will take ${his} anal virginity` : null),
			canDoAnal(eventSlave)
				? new App.Events.Result(`Use ${his} cage to torture ${him}`, torture, (eventSlave.anus === 0) ? `This option will take ${his} anal virginity` : null)
				: new App.Events.Result(),
			((((eventSlave.fetish === "pregnancy" && PC.belly >= 5000) ||
					(eventSlave.fetish === "cumslut" && PC.balls >= 14) ||
					(eventSlave.fetish === "boobs" && PC.boobs >= 1400)) &&
				eventSlave.fetishKnown === 1) ||
			(((eventSlave.attrXX > 70 && eventSlave.attrXY < 50 && PC.title === 0 && PC.vagina !== -1 && PC.dick === 0) ||
					(eventSlave.attrXY > 70 && eventSlave.attrXX < 50 && PC.title === 1 && PC.vagina === 0 && PC.dick !== 0)) &&
				eventSlave.attrKnown === 1)
			)
				? new App.Events.Result(`Use your body to make ${his} cage feel even tighter`, tighter, (eventSlave.anus === 0) ? `This option will take ${his} anal virginity` : null)
				: new App.Events.Result()
		]);

		function help() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You take ${him} by the hand and pull ${him} to ${his} feet, and then kiss ${him}. ${He} knows that this means no, but melts into you anyway, accepting the comforting gesture for what it is. ${He}'s surprised when you do not break the kiss, but continues to make out with you compliantly. You take ${him} by the hands, intertwining your fingers with ${hers} and holding them down at your sides for a while before wrapping ${his} arms around you at your`);
			if (PC.belly >= 10000) {
				r.push(`heavily pregnant`);
			} else if (PC.belly >= 5000) {
				r.push(`gravid`);
			} else if (PC.belly >= 1500) {
				r.push(`swollen`);
			} else if (FutureSocieties.isActive('FSPhysicalIdealist')) {
				r.push(`muscular`);
			} else if (PC.title === 0) {
				r.push(`feminine`);
			} else {
				r.push(`masculine`);
			}
			r.push(`waist. Your hands, thus freed to grope ${him}, tenderly hold ${his} head and neck instead, cupping ${his}`);
			if (eventSlave.face > 95) {
				r.push(`gorgeous`);
			} else if (eventSlave.face >= -10) {
				r.push(`pretty`);
			} else {
				r.push(`homely`);
			}
			r.push(`jawline and making ${him} moan at the intimacy.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`${He}'s completely forgotten ${his} troubles, and you see that it stays that way. You consider yourself something of an expert on human stimulation at this point, and you manage ${hers} expertly. (Admittedly, you're also cheating, using discreet scanning of ${his} vital signs to check on ${his} state of arousal.) Whenever ${he}'s in danger of achieving an erection, which would remind ${him} of ${his} chastity cage with a twinge of discomfort, you cool your makeout session off slightly, massaging ${him} capably instead of kissing ${him} deeply. After some time, ${he} shudders, to ${his} own complete surprise and to your unsurprised satisfaction. ${He}'s just done what in a normal sexual encounter would be considered premature ejaculation, since you wrought ${him} to such a subtle state of arousal that ${he} got off without really getting hard. ${He} can muster no coherent response, but <span class="trust inc">hugs you convulsively,</span> sobbing into your`);
			if (PC.boobs >= 1400) {
				r.push(`enormous`);
				if (PC.boobsImplant !== 0) {
					r.push(`fake`);
				}
				r.push(`breasts`);
			} else if (PC.boobs >= 1200) {
				r.push(`huge`);
				if (PC.boobsImplant !== 0) {
					r.push(`fake`);
				}
				r.push(`breasts`);
			} else if (PC.boobs >= 1000) {
				r.push(`big`);
				if (PC.boobsImplant !== 0) {
					r.push(`firm`);
				}
				r.push(`breasts`);
			} else if (PC.boobs >= 300) {
				r.push(`boobs`);
			} else if (FutureSocieties.isActive('FSPhysicalIdealist')) {
				r.push(`strong shoulder`);
			} else if (PC.title === 0) {
				r.push(`feminine shoulder`);
			} else {
				r.push(`masculine shoulder`);
			}
			r.push(`with gratitude and release.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`The scans suggest ${his} discomfort will return in less than half an hour.`);
			eventSlave.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function cut() {
			r = [];
			r.push(`You agree, on the condition that ${he} be a good little bitch like ${he} promised. ${He} thanks you frantically, following you with mixed relief, gratitude, and deep terror as you lead ${him} to the surgery. It's a medically simple procedure, but ${he}'s <span class="health dec">retained for recovery</span> for some time, a common precaution in your penthouse where the surgery affects an area that might be reinjured by sexual use without a short break for the curatives to take effect. When the medical equipment verifies that ${he} can be fucked without pain or danger to ${his} health, you order ${him} to come back up to your office. ${He} is a <span class="devotion inc">very good little bitch,</span>`);
			if (canDoAnal(eventSlave)) {
				r.push(`taking`);
				if (PC.dick !== 0) {
					r.push(`a hard buttfuck`);
				} else {
					r.push(`a hard anal fingerfuck`);
				}
				r.push(`with apparent enthusiasm and a strong orgasm, though of course ${his} continued use of a chastity cage conceals almost all the effects.`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`enduring all of your teasing without the slightest hint of an erection. Even though ${his} chastity blocks the use of ${his} ass, you still focus most of your attention on ${his} rear for the day the belt comes off.`);
			}
			r.push(`When ${he} goes to the bathroom afterward, however, you see ${him}`);
			if (canSee(eventSlave)) {
				r.push(`glance at ${himself} in the mirror, just once, and then <span class="trust dec">glance away again,</span>`);
			} else {
				r.push(`run ${his} hand under ${his} cock, just once, and then <span class="trust dec">quickly removing ${his} hand,</span>`);
			}
			r.push(`a tear leaking down ${his} cheek.`);
			eventSlave.balls = 0;
			eventSlave.scrotum = 0;
			eventSlave.trust -= 4;
			eventSlave.devotion += 4;
			surgeryDamage(eventSlave, 5);
			App.Events.refreshEventArt(eventSlave);
			return r;
		}

		function torture() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You make no reply at all, but walk around to stand behind the slave. ${He} knows ${he}'s fucked, and starts to shake with fear. You put a foot on ${his} ass and shove ${him} down`);
			if (eventSlave.belly >= 5000) {
				r.push(`so ${his} rear is pointed into the air again,`);
			} else {
				r.push(`to lie flat on the floor,`);
			}
			r.push(`and then straddle ${him}, shoving`);
			if (PC.dick !== 0) {
				r.push(`your`);
				if (PC.vagina !== -1) {
					r.push(`futa`);
				}
				r.push(`cock up ${his} butt.`);
			} else {
				r.push(`one more finger than ${he} can comfortably take up ${his} butt.`);
			}
			r.push(`${He} tries to beg some more, but you give ${him} a warning slap, and ${he} shuts up. Despite your roughness, ${he}'s so horny that ${he} starts to get hard. You can't see or feel this directly, of course, but it's easy to tell from ${his} desperate sobbing and involuntary writhing, and the lovely spasming of ${his} anal sphincter. ${His} tears dry up as ${he} builds towards a climax; orgasm might be an uncomfortable experience for ${him}, but it will buy ${him} a few minutes free of discomfort.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`But ${he}'s to be disappointed. You`);
			if (PC.dick !== 0) {
				r.push(`worm a hand down between ${his} ass and your stomach, and shove a finger up inside ${him}, alongside your dick`);
				if (PC.vagina !== -1) {
					r.push(r.pop() + `, dexterously using the thumb of that hand to stroke your own pussy`);
				}
			} else {
				r.push(`use the hand that isn't fucking ${him} to pull one of ${his} arms around behind ${him} into a painful joint lock`);
			}
			r.push(r.pop() + `. The pain ruins ${his} building orgasm, and ${he} cries with frustration and <span class="trust dec">despair</span> as ${he} realizes that ${he} won't be getting off today. You force ${him} to experience this horrible near-release twice more, bringing ${him} to a terribly uncomfortable state of arousal and then using sudden pain to destroy any chance ${he} has of getting relief. All the wriggling and jerking around is good for you, though.`);
			eventSlave.trust -= 4;
			r.push(VCheck.Anal(eventSlave, 1));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function tighter() {
			const hands = hasBothArms(eventSlave) ? "hands" : "hand";
			r = [];
			r.push(`You order ${him} to pay close attention`);
			if (canSee(eventSlave)) {
				r.push(`and not look away`);
			}
			r.push(r.pop() + `.`);
			if (eventSlave.fetish === "pregnancy" && PC.belly >= 5000) {
				if (canSee(eventSlave)) {
					r.push(`${He} questions what you mean until you begin sensually swaying your`);
					if (PC.belly >= 100000) {
						r.push(`massive pregnancy`);
					} else if (PC.belly >= 60000) {
						r.push(`giant pregnancy`);
					} else if (PC.belly >= 15000) {
						r.push(`advanced pregnancy`);
					} else if (PC.belly >= 10000) {
						r.push(`big, pregnant belly`);
					} else {
						r.push(`pregnant belly`);
					}
					r.push(`and slowly stripping down. ${He} groans at the sight, ${his} dick rapidly hardening at the view of your motherly body. You make sure to play off ${his} pregnancy fetish in every way possible until the aroused slave is in tears from the pressure on ${his} cock.`);
				} else {
					r.push(`${He} questions what you mean until you grab ${his} head and push ${his} face against your`);
					if (PC.belly >= 100000) {
						r.push(`massive pregnancy.`);
					} else if (PC.belly >= 60000) {
						r.push(`giant pregnancy.`);
					} else if (PC.belly >= 15000) {
						r.push(`advanced pregnancy.`);
					} else if (PC.belly >= 10000) {
						r.push(`big, pregnant belly.`);
					} else {
						r.push(`pregnant belly.`);
					}
					r.push(`${He} tries to recoil, bringing a hand to your middle. You catch it and run it along your motherly curve to your popped navel. You trace ${his} hand around it as ${he} groans at the sensation, ${his} dick rapidly hardening at the feel of your motherly body. You make sure to play off ${his} pregnancy fetish in every way possible until the aroused slave is in tears from the pressure on ${his} cock.`);
				}
			} else if (eventSlave.fetish === "cumslut" && PC.balls >= 14) {
				if (canSee(eventSlave)) {
					r.push(`${He} questions what you mean until you begin sensually caressing your massive balls and slowly stripping down. You quickly bring yourself erect and start to jack off. ${He} groans at the sight, licking ${his} lips a the thought of your coming load as ${his} dick rapidly hardens. You tease yourself and hype up just how big and messy your orgasm will be, making ${him} quiver with painful arousal. You moan as you feel the distinct sensation of your coming ejaculation, the sheer amount of sperm moving through you takes some time to release. You hug your nuts, thrusting repeatedly until the wave of cum forces its way out of your throbbing dick. You sigh with relief, just to rub it in ${his} face.`);
				} else {
					r.push(`${He} questions what you mean until you strip down and pull ${his} face directly into your massive balls. ${He} tries to recoil, bringing ${his} ${hands} to the immense spheres. You catch them and use one to massage your nuts and encourage a nice big load for ${him} and the other the help jack you off. You can feel ${him} shaking from the pressure on ${his} dick. Not only do you paint ${him} with seed, but you sigh loudly with relief, just to rub it in.`);
				}
			} else if (eventSlave.fetish === "boobs" && PC.boobs >= 1400) {
				if (canSee(eventSlave)) {
					r.push(`${He} questions what you mean until you pull your arms back, forcing your enormous`);
					if (PC.boobsImplant !== 0) {
						r.push(`fake`);
					}
					r.push(`breasts to pop free of your top. ${He} groans at the sight, ${his} dick rapidly hardening at the view of your impressive rack. You make sure to play off ${his} tit fetish in every way possible until the aroused slave is in tears from the pressure on ${his} cock.`);
				} else {
					r.push(`${He} questions what you mean until you grab ${his} head and push ${his} face against your enormous`);
					if (PC.boobsImplant !== 0) {
						r.push(`fake`);
					}
					r.push(`breasts. ${He} tries to recoil, bringing ${his} ${hands} to your breasts. You continue burying ${his} face in your rack as ${he} begins to grope you. ${He} groans at the sensation, ${his} dick rapidly hardening at the feel of your lovely tits. You make sure to play off ${his} boob fetish in every way possible until the aroused slave is in tears from the pressure on ${his} cock.`);
				}
			} else if (eventSlave.attrXX > 70 && eventSlave.attrXY < 50 && PC.title === 0 && PC.vagina !== -1 && PC.dick === 0) {
				if (canSee(eventSlave)) {
					r.push(`${He} questions what you mean until you begin your strip tease. ${He} groans at the sight, ${his} dick rapidly hardening at the view of your tits and pussy. You know just how arousing ${he} finds the female form, and you play off that until the aroused slave is in tears from the pressure on ${his} cock.`);
				} else {
					r.push(`${He} questions what you mean until you grab ${his} head and push ${his} face into your pussy. ${He} tries to recoil, bringing ${his} ${hands} to your rear. You continue rubbing yourself against ${his} face as begins to grope you, enjoying your feminine features. ${He} groans as ${his} dick rapidly hardens at the feel of your curves and the`);
					if (canSmell(eventSlave)) {
						r.push(`scent of`);
					} else {
						r.push(`warmth from`);
					}
					r.push(`your arousal. You know just how arousing ${he} finds the female form, and you play off that until the aroused slave is in tears from the pressure on ${his} cock.`);
				}
			} else {
				if (canSee(eventSlave)) {
					r.push(`${He} questions what you mean until you begin your strip tease. ${He} groans at the sight, ${his} dick rapidly hardening at the view of your erection. You know just how arousing ${he} finds the male form, and you play off that until the aroused slave is in tears from the pressure on ${his} cock.`);
				} else {
					r.push(`${He} questions what you mean until you grab ${his} head and push ${his} face against your dick. ${He} tries to recoil, bringing ${his} ${hands} to your balls. You continue rubbing yourself against ${his} face as begins to fondle you, enjoying your masculine features. ${He} groans as ${his} dick rapidly hardens at the feel of your penis against your face and the`);
					if (canSmell(eventSlave)) {
						r.push(`scent of`);
					} else {
						r.push(`warmth from`);
					}
					r.push(`your arousal and precum. You know just how arousing ${he} finds the male form, and you play off that until the aroused slave is in tears from the pressure on ${his} cock.`);
				}
			}
			r.push(`You leave ${him} in a <span class="trust dec">worse state than ${he} started in,</span> as ${he}'s hornier than ever and still lacks any satisfying release. But that's ${his} problem, not yours.`);
			if (PC.belly >= 10000) {
				r.push(`Even when so heavily pregnant, it feels good to know you can still bring a dick to full attention.`);
			}
			eventSlave.trust -= 4;
			return r;
		}
	}
};
