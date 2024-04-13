App.Events.RESSHotPC = class RESSHotPC extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.energy > 40,
				s => s.devotion > 0 && s.devotion <= 50,
				s => s.trust >= -50,
				canMove,
				canSee,
				hasAnyArms,
				s =>
					(s.attrXX >= 50 && V.PC.belly < 5000 && (V.PC.boobs >= 300 || V.PC.title === 0)) ||
					(s.attrXY >= 50 && V.PC.dick > 0 && V.PC.boobs < 300 && V.PC.belly < 1500) ||
					(s.fetish === "pregnancy" && V.PC.belly >= 5000) ||
					(s.fetish === "boobs" && V.PC.belly < 5000 && V.PC.boobs >= 1000),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		if (FutureSocieties.isActive('FSPhysicalIdealist')) {
			t.push(`You maintain a tremendous workout routine: the leader of a society that worships physical perfection can afford nothing less. Working out maintains your appearance, keeps you sharp, and makes you the exemplar of the physical ideal that you have to be for your vision for the future to be realized. So, you pay the iron price for your ${PC.title === 1 ? "muscles" : "toned body"}. Like most of the arcology's prominent citizens, you often lift publicly and take part in other amateur sports, but you also have your own private weight room in your penthouse, and you spend a lot of time there.`);
		} else if (PC.physicalAge >= 50) {
			t.push(`You take care of yourself. You're no longer as young as you once were, making it almost a requirement that you work out, hard and regularly. The fact is, the overwhelming majority of arcology owners who maintain their positions for more than a short time are physically fit. The Free Cities have a reputation for destroying old world wastrels who inherit wealth and think that makes them able to survive in an anarcho-capitalist world. Sloth and an inability to self-govern are not qualities common among your successful peers. Not to mention, it's useful to look good, and it may well prove essential to be physically capable in the near future.`);
		} else {
			t.push(`You take care of yourself. It would be absurd to think that there's any explicit requirement that you work out, hard and regularly, but the fact remains that the overwhelming majority of arcology owners who maintain their positions for more than a short time are physically fit. The Free Cities have a reputation for destroying old world wastrels who inherit wealth and think that makes them able to survive in an anarcho-capitalist world. Sloth and an inability to self-govern are not qualities common among your successful peers. Not to mention, it's useful to look good, and it may well prove essential to be physically capable in the near future.`);
		}

		App.Events.addParagraph(node, t);
		t = [];

		t.push(`You complete the final rep of your first workout of the day, rack the bar, and jump to your feet to shower, change, and see to your empire. The motion brings your field of view up, and you notice for the first time that`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`is frozen in the open doorway, having seen something in the workout room that caught ${his} attention as ${he} passed by. ${His} eyes are fixed on your`);
		if (PC.belly >= 120000) {
			t.push(`massive pregnancy with almost painful intensity. You can't really blame ${him}; you're the perfect image of a fertile goddess and your overfilled belly is coated in sweat. Even though you can't work your core any longer, you still take your workouts seriously, something most pregnant women would shy away from. You flush a little at what must ${he} must have thought; with all the grunting and effort, ${he} likely thought you were giving birth.`);
		} else if (PC.belly >= 100000) {
			t.push(`massive pregnancy with almost painful intensity. You can't really blame ${him}; you're eye-catchingly gravid and your full belly is coated in a thin sheen of sweat. Even though you can't work your core any longer, you still take your workouts seriously, something most pregnant women would shy away from.`);
		} else if (PC.belly >= 60000) {
			t.push(`giant pregnancy with almost painful intensity. You can't really blame ${him}; you're eye-catchingly massive and your heavy belly is coated in a thin sheen of sweat.`);
		} else if (PC.belly >= 15000) {
			t.push(`advanced pregnancy with almost painful intensity. You can't really blame ${him}; you're the perfect image of a mother-to-be and your heavy belly is coated in a thin sheen of sweat.`);
		} else if (PC.belly >= 10000) {
			t.push(`heavily pregnant middle and the last remnants of your abs with almost painful intensity. You can't really blame ${him}; you're the perfect image of a mother-to-be and your heavy belly is coated in a thin sheen of sweat.`);
		} else if (PC.belly >= 5000) {
			t.push(`greatly swollen middle and its stretched abdominal muscles with almost painful intensity. You can't really blame ${him}; despite how big you've gotten, you still have some abs left.`);
		} else if (PC.boobs >= 1400) {
			t.push(`sports bra clad boobs with almost painful intensity. You can't really blame ${him}; the bra is three sizes too small, forcing your enormous ${PC.boobsImplant > 0 ? "fake breasts to balloon around the strained material" : "breasts to lewdly bulge around the strained material"}, soaked in your sweat${PC.lactation > 0 ? " and breast milk" : ""}, and your nipples are clearly defined through the stretched thin fabric.`);
		} else if (PC.boobs >= 1200) {
			t.push(`sports bra clad boobs with almost painful intensity. You can't really blame ${him}; the bra is two sizes too small, allowing your huge ${PC.boobsImplant > 0 ? "fake" : ""} breasts to lewdly bulge out of them, soaked in your sweat${PC.lactation > 0 ? " and breast milk" : ""}, and your nipples are clearly visible as bumps in the strained material.`);
		} else if (PC.boobs >= 1000) {
			t.push(`sports bra clad boobs with almost painful intensity. You can't really blame ${him}; the bra is one size too small, allowing your big ${PC.boobsImplant > 0 ? "fake" : ""} breasts to bulge out of them, soaked in your sweat${PC.lactation > 0 ? " and breast milk" : ""}, and your nipples are clearly visible as bumps in the taut material.`);
		} else if (PC.boobs >= 300) {
			t.push(`sports bra clad boobs with almost painful intensity. You can't really blame ${him}; the bra is soaked in your sweat ${PC.lactation > 0 ? "and breast milk" : ""} and your nipples are clearly visible as bumps in the tight material.`);
		} else if (PC.belly >= 1500) {
			t.push(`swollen middle and its abdominal muscles with almost painful intensity. You can't really blame ${him}; despite your growing child${PC.pregType > 1 ? "ren" : ""}, they're still pretty cut.`);
		} else if (PC.belly >= 100) {
			if (PC.title === 0) {
				t.push(`slightly distended abdominal muscles and flat chest with almost painful intensity. You can't really blame ${him}; they're pretty cut, and your sports bra's soaked in your sweat ${PC.lactation > 0 ? "and breast milk" : ""} and your nipples are clearly visible as bumps in the tight material.`);
			} else {
				t.push(`slightly distended abdominal muscles with almost painful intensity. You can't really blame ${him}; they're pretty cut, and your bare chest is coated in a light sheen of glistening sweat.`);
			}
			if (PC.pregKnown === 1) {
				t.push(`You doubt ${he} realizes that the slight swell to your middle is a child.`);
			}
		} else {
			if (PC.title === 0) {
				t.push(`abdominal muscles and flat chest with almost painful intensity. You can't really blame ${him}; they're pretty cut, and your sports bra's soaked in your sweat${PC.lactation > 0 ? " and breast milk" : ""} and your nipples are clearly visible as bumps in the tight material.`);
			} else {
				t.push(`abdominal muscles with almost painful intensity. You can't really blame ${him}; they're pretty cut, and your bare chest is coated in a light sheen of glistening sweat.`);
			}
		}

		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${His} ${App.Desc.eyesColor(eventSlave)} track up your torso comically until ${he}'s looking into your eyes. ${He} stares dumbly at you for a moment before realizing what ${he}'s doing and blushes with embarrassment. ${He}'s reasonably well broken, but is still coming to terms with ${his} sexual place as a ${SlaveTitle(eventSlave)}.`);
		t.push(`In particular, ${he} hasn't gotten used to the effects of ${his} training, the slave food, and the atmosphere in the penthouse, all of which are serving to fuel an acceleration of ${his} sex drive.`);
		if (!canTalk(eventSlave)) {
			t.push(`${He} uses shaky ${hasBothArms(eventSlave) ? "hands" : "gestures"} to ask you to fuck ${him},`);
		} else {
			t.push(Spoken(eventSlave, `"Sorry, ${Master}, I was just, um, passing by and I thought, um, I saw, um, sorry ${Master}, I'm going now,"`));
			t.push(`${he} babbles,`);
		}
		t.push("and turns to flee.");

		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result("Not so fast", caught),
			new App.Events.Result(`Let ${him} go`, released),
		]);

		function caught() {
			const frag = document.createDocumentFragment();
			const belly = bellyAdjective(eventSlave);
			t = [];
			t.push(`As ${he} goes, ${he} follows the natural human impulse when embarrassed, and turns ${his} head resolutely away from you, trying very hard to forget making such a fool of ${himself}. This means that ${he} does not see your rapid, predatory pursuit of ${him}, nor does ${he} ${canHear(eventSlave) ? "hear" : "notice"} your careful stride across the flooring. ${His} first indication that ${he}'s prey is when your hands grab ${him} around ${his}`);
			if (eventSlave.bellyPreg >= 5000) {
				t.push(`pregnant belly`);
			} else if (eventSlave.belly >= 5000) {
				t.push(`${belly} belly`);
			} else if (eventSlave.weight > 130) {
				t.push("gut");
			} else if (eventSlave.weight > 95) {
				t.push("fat belly");
			} else if (eventSlave.muscles > 30) {
				t.push("own well-muscled middle");
			} else if (eventSlave.weight > 10) {
				t.push("plush belly");
			} else {
				t.push("middle");
			}
			t.push(`and hug ${him} hard against your`);
			if (PC.belly >= 100000) {
				t.push("massive sweaty pregnancy.");
			} else if (PC.belly >= 60000) {
				t.push("giant sweaty pregnancy.");
			} else if (PC.belly >= 15000) {
				t.push("huge sweaty pregnancy.");
			} else if (PC.belly >= 5000) {
				t.push("sweaty pregnancy.");
			} else if (PC.boobs >= 1400) {
				t.push("enormous sweaty boobs.");
			} else if (PC.boobs >= 1200) {
				t.push("huge sweaty boobs.");
			} else if (PC.boobs >= 1000) {
				t.push("big sweaty boobs.");
			} else if (PC.boobs >= 300) {
				t.push("sweaty boobs.");
			} else {
				t.push(PC.title === 0 ? "sweaty, flat chest." : "sweaty, bare chest.");
			}
			t.push(`${He} stiffens ${eventSlave.voice !== 0 ? "and shrieks" : ""} with surprise, but relaxes obediently within your embrace. Your warm, animal presence has an immediate effect. You hear ${him} suck in ${his} breath and then feel ${him} begin to breathe increasingly hard as your ${canSmell(eventSlave) ? "scent" : "body heat"} sinks into ${him} and ${his} embarrassment fades.`);

			App.Events.addParagraph(frag, t);
			t = [];

			App.Events.addResponses(frag, [
				(canDoVaginal(eventSlave) || canDoAnal(eventSlave))
					? new App.Events.Result(`Fuck ${him} right here`, fuck, virginityWarning())
					: new App.Events.Result(virginityWarning()),
				new App.Events.Result(`Have ${him} lick you clean`, lick),
			]);

			function fuck() {
				t = [];

				if (PC.title === 0 || PC.boobs >= 300 || PC.belly >= 1500) {
					t.push("Despite your feminine appearance, you have capable hands.");
				} else {
					t.push("You have strong hands to go with your masculine appeal.");
				}
				t.push(`They rove across ${his} front, hugging ${him} hard against you as you massage and grope.`);
				if (eventSlave.boobs > 4000) {
					t.push(`${His} tits are so big that hefting them creates a bit of a burn in your biceps, in addition to making ${him} writhe against you.`);
				} else if (eventSlave.belly >= 10000) {
					t.push(`The skin that covers ${his} swollen belly is erotically taught, and you run your fingers across it possessively.`);
				} else if (eventSlave.nipples === "inverted") {
					t.push(`You wrap your hands around the bases of ${his} inverted nipples, and use your strong grip to stimulate and squeeze them until they protrude, much to the writhing slave's anguish.`);
				} else if (eventSlave.nipples === "fuckable") {
					t.push(`You slip your fingers into ${his} nipples and spread them wide, making the slave writhe and buck against you.`);
				} else {
					t.push(`You pinch ${his} nipples and tug them hard, making the slave writhe and buck against you.`);
				}
				if (PC.dick === 0) {
					if (hasBothArms(eventSlave)) {
						t.push(`You grab one of ${his} hands and guide it down to ${his}`);
					} else if (hasAnyArms(eventSlave)) {
						t.push(`You grab ${his} hand and guide it down to ${his}`);
					} else {
						t.push(`You `);
					}
					if (eventSlave.dick > 0 && !(eventSlave.chastityPenis)) {
						t.push("cock,");
					} else if (canDoVaginal(eventSlave)) {
						t.push("pussy,");
					} else if (eventSlave.scrotum > 0 && eventSlave.balls > 1) {
						t.push("testicles,");
					} else if (eventSlave.chastityPenis === 1) {
						t.push("caged dick,");
					} else if (eventSlave.chastityVagina) {
						t.push("chastity belt,");
					} else if (eventSlave.vagina === -1) {
						t.push("perineum,");
					}
					t.push(`making ${him} play with ${himself}. Meanwhile, you look after your womanhood with your other hand, schlicking expertly while holding ${him} close, ensuring that ${he} feels every motion of what you're doing. When your fingers are thoroughly coated with pussyjuice, you drop ${his} hand, letting ${him} continue masturbating on ${his} own, and then use the freed hand to replace the one you're using to touch yourself. Then, you take the wet fingers and push them into ${his} mouth; ${he} willingly sucks them clean, using ${his} tongue to gather every trace of your secretions. You gather sweat from between your breasts, and make ${him} suck that off ${his} fingers too. When ${he} orgasms, you shove ${him} against the wall and hump against ${him} and your hand both, climaxing yourself.`);
				} else {
					t.push(`You pull ${him} up ${hasAnyLegs(eventSlave) ? `onto ${his} toes` : "to face you"} and slide yourself inside ${him}, the slave gasping when ${he} feels your hot dick enter ${his}`);
					t.push(canDoVaginal(eventSlave) ? "cunt." : "anus.");
					if (PC.belly >= 5000 && eventSlave.belly >= 10000) {
						t.push(`You'd like to lift ${him} up into a standing fuck, but there is so much distended stomach between the both of you that it's impossible so you opt for a position where you can both penetrate ${him} and continue your work out.`);
						if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
							t.push(`After a while, you shift positions, freeing your member, and force yourself up ${his} butt despite the slave's anxious begging.`);
							t.push(VCheck.Both(eventSlave, 1, 1));
							t.push(`It doesn't take long before you fill ${his} ass with cum.`);
						} else {
							t.push((canDoVaginal(eventSlave)) ? fuckVagina() : fuckAss());
						}
					} else if (PC.belly >= 5000) {
						t.push(`You'd like to lift ${him} up into a standing fuck, but you are far too pregnant to manage. Instead, you lie on your back and have ${him} work your legs as you fuck ${him}.`);
						if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
							t.push(`After a while, you lift ${him} up as high as you can, freeing your member, and then lower ${him} back down again, forcing yourself up ${his} butt instead despite the slave's anxious begging.`);
							t.push(VCheck.Both(eventSlave, 1, 1));
							t.push(`It doesn't take long before you fill ${his} ass with cum.`);
						} else {
							t.push((canDoVaginal(eventSlave)) ? fuckVagina() : fuckAss());
						}
					} else if (eventSlave.belly >= 300000) {
						t.push(`You'd like to lift ${him} up into a standing fuck, but even you aren't strong enough to lift ${his} extreme weight. Instead, you choose to have ${him} ride you; supporting ${his} ${belly} middle is a workout in its own right.`);
						if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
							t.push(`After a while, you push ${him} up as high as you can, freeing your member, and then lower ${him} back down again, forcing yourself up ${his} butt instead despite the slave's anxious begging.`);
							t.push(VCheck.Both(eventSlave, 1, 1));
							t.push(`It doesn't take long before you fill ${his} ass with cum.`);
						} else {
							t.push((canDoVaginal(eventSlave)) ? fuckVagina() : fuckAss());
						}
					} else if (eventSlave.belly >= 100000) {
						t.push(`Once you're hilted, you hoist ${him} up by the underarms, shifting your stance to handle ${his} ${belly} stomach's weight, and hold ${him} in midair, impaled on your dick. You can't pound ${him} all that hard in this challenging position, but the effort of holding ${him} this way forces you to work out hard, producing an excellent sensation. ${PC.vagina !== -1 ? `The position angles your dick upward, producing a lovely massaging sensation in your pussy as you slide in and out of ${him}.` : ""}`);
						if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
							t.push(`After a while, you lift ${him} up as high as you can, freeing your member, and then lower ${him} back down again, forcing yourself up ${his} butt instead despite the slave's anxious begging.`);
							t.push(VCheck.Both(eventSlave, 1, 1));
							t.push(`It doesn't take long before you fill ${his} ass with cum.`);
						} else {
							t.push((canDoVaginal(eventSlave)) ? fuckVagina() : fuckAss());
						}
						t.push("You're going to be feeling this tomorrow.");
					} else {
						t.push(`Once you're hilted, you bring ${his} hands up on either side of ${his} head to grasp your shoulders behind ${him}, and then scoop ${his} legs up and hoist ${him} to rest against your chest, held in midair and impaled on your dick. You can't pound ${him} all that hard in this challenging position, but the effort of holding ${himself} this way forces ${him} to tighten ${his} muscles down hard, producing an excellent sensation. ${PC.vagina !== -1 ? `The position angles your dick upward, producing a lovely massaging sensation in your pussy as you slide in and out of ${him}.` : ""}`);
						if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
							t.push(`After a while, you lift ${him} up as high as you can, freeing your member, and then lower ${him} back down again, forcing yourself up ${his} butt instead despite the slave's anxious begging.`);
							t.push(VCheck.Both(eventSlave, 1, 1));
							t.push(`It doesn't take long before you fill ${his} ass with cum.`);
						} else {
							t.push((canDoVaginal(eventSlave)) ? fuckVagina() : fuckAss());
						}
					}
				}

				function fuckVagina() {
					return `${VCheck.Vaginal(eventSlave, 1)} It doesn't take long before you fill ${his} pussy with cum.`;
				}

				function fuckAss() {
					return `${VCheck.Anal(eventSlave, 1)} It doesn't take long before you fill ${his} ass with cum.`;
				}

				t.push(`You tell your quivering sex toy that ${he} doesn't have to be embarrassed about ${his} needs. <span class="mediumaquamarine">${He} seems relieved</span> that the sexual being ${he}'s becoming is acceptable, at least to you.`);
				eventSlave.trust += 4;
				return t;
			}

			function lick() {
				t = [];

				t.push(`You take ${him} by the hand and ${PC.belly >= 10000 ? "waddle" : "walk"} towards the shower. The sudden loss of your closeness jerks ${him} rudely out of ${his} sexual reverie, but ${he} follows willingly, perhaps distracted by the view as you shed your workout clothes on the way. When you get there, you pull ${him} in with you, but you do not turn on the water. Instead, you tell ${him} to wash you. Not understanding, ${he} turns to switch on the shower, but you catch ${him}, and insert two sweaty fingers into the slave's compliant mouth. ${He} sucks on them, taking refuge in the simple task, and then understands what you mean. ${He} runs ${his} tongue up your arm, sucking the salty sweat off you as best ${he} can. Soon, ${he} bends down and heads for your`);
				if (PC.dick !== 0 && PC.vagina !== -1) {
					t.push("cock and cunt");
				} else if (PC.dick !== 0) {
					t.push("cock");
				} else if (PC.vagina !== -1) {
					t.push("cunt");
				}
				t.push(`but you pull ${him} up again and tell ${him} to do that last.`);
				if (PC.belly >= 60000) {
					t.push(`${He} quickly finds something almost as good by licking and sucking ${his} way up your linea nigra. When ${he} reaches your ${PC.preg >= 22 ? "popped" : "flattened"} navel, you hold ${his} head there for a while, savoring the erotic sensation before pushing ${him} along to the rest of your expansive midriff.`);
				} else if (PC.belly >= 5000) {
					t.push(`${He} quickly finds something almost as good by licking and sucking ${his} way up your linea nigra. When ${he} reaches your ${PC.preg >= 22 ? "popped" : "flattened"} navel, you hold ${his} head there for a while, savoring the erotic sensation.`);
				} else if (PC.boobs >= 1400) {
					t.push(`${He} quickly finds something almost as good by licking and sucking ${his} way up the sweaty crevice between your enormous breasts. When ${he} reaches your nipples, you hold ${his} head there for a while, enjoying ${his} tongue.`);
				} else if (PC.boobs >= 1200) {
					t.push(`${He} quickly finds something almost as good by licking and sucking ${his} way up the sweaty crevice between your huge breasts. When ${he} reaches your nipples, you hold ${his} head there for a while, enjoying ${his} tongue.`);
				} else if (PC.boobs >= 1000) {
					t.push(`${He} quickly finds something almost as good by licking and sucking ${his} way up the sweaty crevice between your big breasts. When ${he} reaches your nipples, you hold ${his} head there for a while, enjoying ${his} tongue.`);
				} else if (PC.boobs >= 300) {
					t.push(`${He} quickly finds something almost as good by licking and sucking ${his} way up the sweaty crevice between your breasts. When ${he} reaches your nipples, you hold ${his} head there for a while, enjoying ${his} tongue.`);
				} else {
					t.push(`${He} settles for kissing and licking ${his} way up your abs, pecs, and`);
					if (PC.title === 0) {
						t.push(`non-existent tits. When ${he} reaches your nipples, you hold ${his} head there for a while, enjoying ${his} tongue.`);
					} else {
						t.push(`collarbone, before shyly sucking the line of sweat that runs down each of your temples when you perspire heavily off of you.`);
					}
				}
				t.push(`When you've enjoyed the tongue bath enough, you reach over and activate the shower, the warm water producing a hum from the slave. You coach ${him} towards your`);
				if (PC.dick === 0) {
					t.push(`cunt, and ${he} eats you out with enthusiasm`);
				} else {
					t.push(`stiff prick, and ${he} gives you an enthusiastic blowjob ${PC.vagina !== -1 ? `before turning ${his} oral attentions to your pussy` : ""}`);
				}
				t.push(`as the water plays over you both. After looking up and letting the water cascade down your face for a long moment, you quietly tell ${him} to masturbate before opening your mouth to drink from the downpour. With your eyes closed against the stream, your only indications that ${he}'s obeying the command is a slight increase in the force with which ${he} sucks, and a faint`);
				if (canDoVaginal(eventSlave)) {
					t.push("schlicking");
				} else if (eventSlave.dick > 0 && canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					t.push("wanking");
				} else {
					t.push("rubbing");
				}
				t.push(`noise as ${he} jerks off. ${He} must <span class="devotion inc">find you quite attractive,</span> since giving you oral in the shower while playing with ${himself} brings ${him} to orgasm with almost indecent speed.`);
				eventSlave.devotion += 4;
				seX(eventSlave, "oral", PC, "penetrative");
				return t;
			}
			return frag;
		}

		function released() {
			t = [];
			t.push(`You let ${him} go, and ${he} hurries off to go on with ${his} day. But ${his} attraction to you does not go away, and neither does the embarrassment of having made a fool of ${himself} in front of you. The experience leaves ${him} <span class="trust dec">a bit worried</span> about how life as your slave is affecting ${him}, but <span class="devotion inc">increasingly infatuated</span> with you. Before long, love will conquer doubt.`);
			eventSlave.devotion += 4;
			eventSlave.trust -= 2;
			return t;
		}

		function virginityWarning() {
			if (V.PC.dick > 0) {
				if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
					return `This option will take ${his} virginity`;
				} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
					return `This option will take ${his} anal virginity`;
				}
			}
			return null;
		}
	}
};
