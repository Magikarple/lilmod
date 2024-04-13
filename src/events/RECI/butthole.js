// cSpell:ignore nooo

App.Events.RECIButthole = class RECIButthole extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => this.validSlave(s),
				s => s.assignment !== Job.QUARTER,
				s => s.devotion > 50,
				s => s.trust > 50,
				canTalk,
				canWalk,
				canSee,
				canHear,
				s => s.anus.isBetween(1, 4),
				s => s.analArea > 1,
			]
		];
	}

	validSlave(slave) {
		return V.RECheckInIDs.some((a) => (a.ID === slave.ID && a.type === "butthole"));
	}

	execute(node) {
		let [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, girl, woman, loli
		} = getPronouns(eventSlave);
		const {title: Master, say: say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const hands = hasBothArms(eventSlave) ? "hands" : "hand";
		const skinDesc = (skinToneLevel(eventSlave.skin) < 10)
			? "pink"
			: (skinToneLevel(eventSlave.skin) < 10)
				? "dark brown"
				: "brown";

		V.RECheckInIDs.deleteWith((s) => s.ID === eventSlave.ID && s.type === "butthole");

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave, "no clothing");
		node.appendChild(artDiv);

		let t = [];
		t.push(`The slave bathrooms are designed to completely eliminate privacy. There are few partitions, and those are glass. Your better-behaved slaves have all long since lost any hesitation about performing their ablutions nude. As you pass through the area, you notice`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`checking out ${his} own anus in the bathroom mirror.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`There's no other way to describe what ${he}'s doing: the ${SlaveTitle(eventSlave)}`);
		if (eventSlave.belly >= 300000) {
			t.push(`is leaning over ${his} ${belly} belly with ${his} feet planted on the counter,`);
		} else if (eventSlave.height < 140) {
			t.push(`is on a step stool with ${his} back to the mirror,`);
		} else if (eventSlave.height < 160) {
			t.push(`has ${his} back to the mirror and is up on tiptoe to bring ${his} butthole into view,`);
		} else {
			t.push(`has ${his} back to the mirror,`);
		}
		t.push(`and ${he}'s`);
		if (eventSlave.butt > 6) {
			if (hasBothArms(eventSlave)) {
				t.push(`using both hands to`);
			} else if (hasAnyArms(eventSlave)) {
				t.push(`using ${his} hand to`);
			} else if (eventSlave.belly >= 300000) {
				t.push(`letting gravity`);
			} else {
				t.push(`using the edge of the sink to`);
			}
			t.push(`pull ${his} massive buttcheeks apart to`);
		} else if (eventSlave.butt > 3) {
			if (hasAnyArms(eventSlave)) {
				t.push(`using ${his} ${hands} to`);
			} else if (eventSlave.belly >= 300000) {
				t.push(`letting gravity`);
			} else {
				t.push(`using the edge of the sink to`);
			}
			t.push(`spread ${his} healthy buttcheeks to`);
		} else {
			t.push(`got ${his} hips cocked to spread ${his} sleek butt and`);
		}
		t.push(`reveal ${his} backdoor. Your slaves are trained to check themselves daily,`);
		if (eventSlave.chastityAnus) {
			t.push(`including those assigned to wear anal chastity,`);
		}
		t.push(`but ${he} seems fascinated. As you pause to watch, ${he} begins to clench and relax ${his}`);
		if (eventSlave.anus > 2) {
			t.push(`loose`);
		} else {
			t.push(`cute`);
		}
		t.push(`hole,`);
		if ((eventSlave.analArea - eventSlave.anus) > 1) {
			t.push(`lewdly flexing`);
		} else {
			t.push(`alternately puckering and relaxing`);
		}
		t.push(`the ${skinDesc} skin around it. ${He} giggles self-consciously at the sight, and then relaxes all the way, causing ${his} asspussy to open into a`);
		if (eventSlave.anus > 2) {
			if (V.PC.dick !== 0) {
				t.push(`cock-hungry`);
			} else {
				t.push(`dildo-hungry`);
			}
		} else {
			t.push(`slight`);
		}
		t.push(`gape. ${He} notices you out of the corner of ${his} eye and`);
		if (eventSlave.butt > 6) {
			if (eventSlave.belly >= 300000) {
				t.push(`slides back onto ${his} feet`);
			} else if (hasAnyArms(eventSlave)) {
				t.push(`releases ${his} grip on ${his} heavy buttocks`);
			} else {
				t.push(`slides ${his} heavy buttocks off the counter`);
			}
			t.push(`to turn and greet you, letting`);
			if (eventSlave.belly >= 300000) {
				t.push(`${his} heavy buttocks`);
			} else {
				t.push(`them`);
			}
			t.push(`clap gently together and conceal ${his} asshole again.`);
		} else if (eventSlave.butt > 3) {
			if (eventSlave.belly >= 300000) {
				t.push(`slides back onto ${his} feet`);
			} else if (hasAnyArms(eventSlave)) {
				t.push(`lets ${his} butt go`);
			} else {
				t.push(`slides ${his} butt off the counter`);
			}
			t.push(`to turn and greet you, mostly hiding ${his} asshole from the mirror.`);
		} else {
			if (eventSlave.belly >= 300000) {
				t.push(`slides back onto ${his} feet and`);
			}
			t.push(`turns to greet you, ${his} pretty rear only partially concealing ${his} asshole in the mirror.`);
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(Spoken(eventSlave, `"Hi ${Master},"`));
		t.push(`${he} ${say}s cheerfully.`);
		t.push(Spoken(eventSlave, `"I was just noticing how much my butt has changed. I check it every day, but I hadn't really looked at it in a while, you know? It used to be so tight, and now`));
		if (eventSlave.anus > 2) {
			t.push(Spoken(eventSlave, `I've got a rear pussy."`));
		} else {
			t.push(Spoken(eventSlave, `it's obviously a fuckhole."`));
		}
		if (eventSlave.belly >= 300000) {
			t.push(`${He} struggles to hike ${his} knee over ${his} extreme gravidity without losing balance.`);
		} else {
			t.push(`${He} turns to face the mirror,`);
			if (eventSlave.belly >= 10000) {
				t.push(`slowly hiking one knee up onto the bathroom counter in front of it while giving ${his}`);
				if (eventSlave.belly >= 10000) {
					if (eventSlave.bellyPreg >= 3000) {
						t.push(`pregnancy`);
					} else {
						t.push(`greatly bloated middle`);
					}
					t.push(`room to hang.`);
				}
			} else {
				t.push(`hiking one knee up onto the bathroom counter in front of it.`);
			}
		}
		t.push(`${He}`);
		if (eventSlave.butt > 6) {
			t.push(`reaches around to pull a buttock aside and starts blatantly winking ${his} anus for`);
			if (hasAnyArms(eventSlave)) {
				t.push(`you, using ${his}`);
				if (hasBothArms(eventSlave)) {
					t.push(`other`);
				}
				t.push(`hand to`);
				if (eventSlave.nipples !== "fuckable") {
					t.push(`tweak`);
				} else {
					t.push(`finger`);
				}
				t.push(`a nipple.`);
			} else {
				t.push(`you.`);
			}
		} else if (eventSlave.butt > 3) {
			t.push(`spreads ${himself} and starts blatantly winking ${his} anus for`);
			if (hasAnyArms(eventSlave)) {
				t.push(`you, using ${his} ${hands} to`);
				if (eventSlave.nipples !== "fuckable") {
					t.push(`tweak`);
				} else {
					t.push(`finger`);
				}
				t.push(`${his} nipples.`);
			} else {
				t.push(`you.`);
			}
		} else {
			t.push(`cocks ${his} hips again and starts blatantly winking ${his} anus for you`);
			if (hasAnyArms(eventSlave)) {
				t.push(`you, using ${his} ${hands} to`);
				if (eventSlave.nipples !== "fuckable") {
					t.push(`tweak`);
				} else {
					t.push(`finger`);
				}
				t.push(`${his} nipples.`);
			} else {
				t.push(`you.`);
			}
		}
		if (eventSlave.analArea > 3) {
			t.push(`The huge area of ${skinDesc} anus around ${his} actual hole certainly draws the eye towards its center, though the way ${he}'s using ${his} sphincter as a come-on does enhance the effect.`);
		}
		t.push(Spoken(eventSlave, `"Please, ${Master},"`));
		if (eventSlave.fetish === "buttslut") {
			t.push(`${he} begins to beg.`);
			t.push(Spoken(eventSlave, `"I can't wait to feel ${V.PC.dick !== 0 ? 'your cock' : 'you'} inside me."`));
		} else {
			t.push(`${he} ${say}s.`);
			t.push(Spoken(eventSlave, `"Use me."`));
		}
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			(eventSlave.chastityAnus)
				? new App.Events.Result(`Remind ${him} of ${his} chastity`, chaste)
				: new App.Events.Result(),
			(S.HeadGirl && eventSlave.ID !== V.HeadGirlID)
				? new App.Events.Result(`Double anal with the Head Girl`, () => DoubleTeam(S.HeadGirl))
				: new App.Events.Result(),
			(S.Concubine && eventSlave.ID !== V.ConcubineID && hasAnyLegs(S.Concubine) && hasAnyArms(S.Concubine) && S.Concubine.fetish !== Fetish.MINDBROKEN)
				? new App.Events.Result(`Double anal with your Concubine`, () => DoubleTeam(S.Concubine))
				: new App.Events.Result(),
			(S.Bodyguard && eventSlave.ID !== V.BodyguardID)
				? new App.Events.Result(`Double anal with your Body Guard`, () => DoubleTeam(S.Bodyguard))
				: new App.Events.Result(),
			new App.Events.Result(`Chat about ${his} ass`, talk),
			(eventSlave.anus < 3)
				? new App.Events.Result(`Change it some more`, assFuck)
				: new App.Events.Result(),
			new App.Events.Result(`Don't like anal`, wrongHole),
		]);

		function chaste() {
			const totalIntel = eventSlave.intelligence + eventSlave.intelligenceImplant;

			t = [];
			t.push(`You ask if ${he} is forgetting anything.`);
			if (totalIntel > 95) {
				t.push(Spoken(eventSlave, `"Ah! Forgive me ${Master}! I'll put it on right away!"`));
				t.push(`${he} ${say}s, hurrying to fasten ${his} anal chastity, a hint of fear on ${his} face. You tell ${him} it is fine, ${he} was only performing ${his} daily ablutions after all.`);
			} else if (totalIntel > 15) {
				t.push(Spoken(eventSlave, `"Um? No...? I don't think I'm forgetting anything?"`));
				t.push(`${he} states with a look of confusion. You press ${him}, asking if ${he} forgot the rules.`);
				t.push(Spoken(eventSlave, `"Ah! I'm not supposed to be offering my asshole so freely! ${Master}, please forgive me! I'll put it on right away!"`));
				t.push(`${he} shouts, hurrying to fasten ${his} anal chastity, <span class="trust dec">a hint of fear on ${his} face.</span> You tell ${him} it is fine, if you want ${his} ass, you will have it, chastity be damned. ${He} lets out a sigh of relief.`);
				eventSlave.trust -= 2;
			} else if (totalIntel >= -15) {
				t.push(Spoken(eventSlave, `"Um? No...? I don't think I'm forgetting anything?"`));
				t.push(`${he} states with a look of confusion. You press ${him}, asking if ${he} forgot the rules.`);
				t.push(Spoken(eventSlave, `"I need to inspect my anus for damage, elasticity and cleanliness each and every morning."`));
				t.push(`You stare ${him} down, making it clear that was not the right answer.`);
				t.push(Spoken(eventSlave, `"Um, ${Master}, I shouldn't be offering my ass to you, I'm sorry..."`));
				t.push(`${he} limply ${say}s, <span class="trust dec">fear spreading across ${his} face.</span> You tell ${him} it is fine, ${he} did not violate the rules, after all. Though ${he}'d best pay more attention in the future.`);
				eventSlave.trust -= 2;
			} else if (totalIntel >= -95) {
				t.push(Spoken(eventSlave, `"Um? No...? I pretty sure I'm not forgetting anything..."`));
				t.push(`${he} states with a look of confusion. You press ${him}, asking if ${he} forgot the rules.`);
				t.push(Spoken(eventSlave, `"Make sure your asspussy is nice and pretty each and every day!"`));
				t.push(`You stare ${him} down, making it clear that was not the right answer. ${He} wracks ${his} brain, desperately trying to figure out what ${he} could be missing.`);
				t.push(Spoken(eventSlave, `"I offered my ass to you, so that couldn't be it..."`));
				t.push(`${His} cluelessness is starting to get on your nerves. You clear your throat and gesture at the anal chastity left forgotten in the sink.`);
				t.push(Spoken(eventSlave, `"Huh? Is that mine? Wait... Oh, no... I'm sorry ${Master}... Please forgive me..."`));
				t.push(`${he} ${say}s, <span class="trust dec">tears beginning to well up in ${his} eyes.</span> You tell ${him} it is fine, ${he} did not violate the rules, after all. Though ${he}'d best pay more attention in the future. Also not to leave ${his} chastity in the sink, you don't need to be replacing them all the time.`);
				eventSlave.trust -= 2;
			} else {
				t.push(Spoken(eventSlave, `"Um? No?"`));
				t.push(`${he} states with a look of confusion. You press ${him}, asking if ${he} forgot the rules.`);
				t.push(Spoken(eventSlave, `"Look at your butt!"`));
				t.push(`You stare ${him} down, making it clear that was not the right answer. ${He} wracks ${his} brain, desperately trying to figure out what ${he} could be missing.`);
				t.push(Spoken(eventSlave, `"You don't like this position...?"`));
				t.push(`${His} cluelessness is starting to get on your nerves. You clear your throat and gesture at the anal chastity left forgotten on the counter.`);
				t.push(Spoken(eventSlave, `"Huh? You want me to put that away?"`));
				t.push(`You struggle to calmly explain that ${he} is supposed to be wearing anal chastity, not begging for a dick up ${his} ass.`);
				t.push(Spoken(eventSlave, `"So a toy is better?"`));
				t.push(`You fasten the belt around ${his} rear and silently leave the room before you lose it.`);
				t.push(Spoken(eventSlave, `"So you'll fuck my butt later?"`));
				t.push(`${he} shouts after you, still completely oblivious.`);
			}

			return t;
		}

		function DoubleTeam(partner) {
			let container = document.createDocumentFragment();
			const partnerSlave = partner;
			const {He2, he2, his2, him2, himself2} = getPronouns(partnerSlave).appendSuffix('2');
			const {title: Master2} = getEnunciation(partnerSlave);

			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, [eventSlave, partnerSlave], "no clothing");

			t = [];
			t.push(`You tell ${him} ${he}'s got a nice asspussy, and grope ${him} thoroughly, cupping ${his} buttocks with one hand and squeezing a breast with the other. ${eventSlave.slaveName} looks`);
			if (eventSlave.fetish === "buttslut") {
				t.push(`desperately eager,`);
			} else {
				t.push(`ready and willing,`);
			}
			t.push(`and angles ${himself} just right, but you administer a light slap to ${his} ${eventSlave.skin} ass and continue, telling ${him} that it's so nice you feel like sharing it. ${He}'s`);
			if (eventSlave.fetish === "buttslut" || eventSlave.energy > 95) {
				t.push(`so ready to fuck ${he} can't quite think of what to say,`);
			} else {
				t.push(`not quite sure how to respond,`);
			}
			t.push(`and before ${he} can figure it out, ${partnerSlave.slaveName} hurries in, responding to your summons. Of course, ${eventSlave.slaveName} is no stranger to ${partnerSlave.slaveName}, who takes in the situation at a glance and`);
			if (canAchieveErection(partnerSlave)) {
				t.push(`instantly achieves a painfully hard erection.`);
			} else {
				t.push(`immediately flushes with arousal.`);
			}
			if (partnerSlave.weight > 160 || partnerSlave.belly >= 10000 || partnerSlave.boobs >= 50000 || partnerSlave.balls >= 50) {
				if (!canPenetrate(partnerSlave)) {
					t.push(`${partnerSlave.slaveName} dons a strap-on before you help ${him2}`);
				} else {
					t.push(`You help support ${partnerSlave.slaveName} as ${he2} struggles`);
				}
			} else {
				t.push(`${partnerSlave.slaveName}`);
				if (!canPenetrate(partnerSlave)) {
					t.push(`dons a strap-on and`);
				}
				t.push(`clambers`);
			}
			t.push(`up onto the (strongly built) bathroom counter. Since saliva is plenty of lube for ${eventSlave.slaveName}'s experienced ass, ${he2} points a meaningful finger at`);
			if (!canPenetrate(partnerSlave)) {
				t.push(`the phallus,`);
			} else {
				t.push(`${his2} cock,`);
			}
			t.push(`and ${eventSlave.slaveName} begins to suck it enthusiastically, trying to get it as wet as possible for the sake of ${his} butt.`);
			seX(eventSlave, "oral", partnerSlave, "penetrative");
			App.Events.addParagraph(container, t);

			t = [];
			t.push(`Since ${eventSlave.slaveName} is being so good, you decide to help get ${him} ready, and push`);
			if (eventSlave.belly < 100000) {
				t.push(`${him} sideways so`);
				if (eventSlave.belly >= 3000) {
					t.push(`${he}'s forced to heft ${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						t.push(`pregnancy`);
					} else {
						t.push(`greatly bloated middle`);
					}
					t.push(`onto the counter.`);
				} else {
					t.push(`${he} straddles the counter's edge.`);
				}
				t.push(`${He} whimpers into the`);
				if (!canPenetrate(partnerSlave)) {
					t.push(`dildo`);
				} else {
					t.push(`dick`);
				}
				t.push(`in ${his} mouth as ${he} feels ${his}`);
				if (eventSlave.dick > 0) {
					if (eventSlave.chastityPenis === 1) {
						t.push(`chastity cage`);
					} else if (eventSlave.hormoneBalance >= 100 || eventSlave.balls === 0 || eventSlave.ballType === "sterile") {
						t.push(`soft dickclit`);
					} else if (!canAchieveErection(eventSlave)) {
						t.push(`oversized cock`);
					} else {
						t.push(`hard cock`);
					}
				} else {
					t.push(`mons`);
				}
				t.push(`graze the hard counter, and then stiffens as you penetrate ${his} bottom.`);
			} else {
				if (eventSlave.bellyPreg >= 3000) {
					t.push(`the obscenely pregnant`);
				} else {
					t.push(`the obscenely swollen`);
				}
				t.push(`${girl} to properly spitroast ${him}. ${He} whimpers into the`);
				if (!canPenetrate(partnerSlave)) {
					t.push(`dildo`);
				} else {
					t.push(`dick`);
				}
				t.push(`in ${his} mouth as ${his} body stiffens from your invading`);
				if (V.PC.dick !== 0) {
					t.push(`cock`);
				} else {
					t.push(`strap-on`);
				}
				t.push(`stretching ${his} anus.`);
			}
			seX(eventSlave, "anal", V.PC, "penetrative");
			t.push(`When you judge that ${partner.slaveName} is wet enough, you nod to ${him2}, and ${he2} takes ${eventSlave.slaveName} by the hand, pulling ${him} up onto ${his2} lap.`);
			if (partnerSlave.belly + eventSlave.belly > 5000 || partnerSlave.weight > 95 || eventSlave.weight > 95) {
				t.push(`There is no chance that the pair of them will manage to stay on that counter without hurting themselves or breaking something, so you quickly help them down onto a bathroom bench before the moment is ruined.`);
			} else if (partnerSlave.boobs > 4000 && eventSlave.boobs > 4000) {
				t.push(`Their tits are so huge that they can't reach each other to kiss, chest-to-chest like that. ${partnerSlave.slaveName} settles for blowing the other slave an exaggerated kiss, which makes ${him} laugh.`);
			} else {
				t.push(`The slaves start making out, showing no signs of breaking their lip lock as they arrange themselves for penetration.`);
			}
			t.push(`${partnerSlave.slaveName} guides ${his2}`);
			if (!canPenetrate(partnerSlave)) {
				t.push(`strap-on`);
			} else {
				t.push(`cock`);
			}
			t.push(`inside the`);
			if (eventSlave.fetish === "buttslut") {
				t.push(`enthusiastic`);
			} else {
				t.push(`compliant`);
			}
			t.push(`${eventSlave.slaveName}, who begins to ride it, enjoying both the`);
			if (eventSlave.prostate > 0) {
				t.push(`prostate`);
			} else {
				t.push(`anal`);
			}
			t.push(`stimulation and the feeling of ${his}`);
			if (eventSlave.dick > 0) {
				if (eventSlave.chastityPenis === 1) {
					t.push(`midsection`);
				} else if (eventSlave.hormoneBalance >= 100 || eventSlave.balls === 0 || eventSlave.ballType === "sterile") {
					t.push(`soft dick`);
				} else if (!canAchieveErection(eventSlave)) {
					t.push(`oversized cock`);
				} else {
					t.push(`erection`);
				}
				t.push(`trapped between ${him} and`);
			} else {
				t.push(`pussy pressed against`);
			}
			t.push(`${partnerSlave.slaveName}.`);
			seX(eventSlave, "anal", partnerSlave, "penetrative");
			t.push(`${partnerSlave.slaveName} smacks the humping`);
			if (eventSlave.physicalAge > 30) {
				t.push(`${woman}'s`);
			} else if (eventSlave.physicalAge > 17) {
				t.push(`${girl}'s`);
			} else if (eventSlave.physicalAge > 12) {
				t.push(`teen's`);
			} else {
				t.push(`${loli}'s`);
			}
			t.push(`butt to get ${him} to stop, and slides an index finger up ${his} ass alongside the`);
			if (!canPenetrate(partnerSlave)) {
				t.push(`phallus.`);
			} else {
				t.push(`cock.`);
			}
			t.push(`${eventSlave.slaveName} shudders, and then begins to whine as ${partnerSlave.slaveName} pulls ${his} sphincter wider.`);
			App.Events.addParagraph(container, t);

			t = [];
			t.push(Spoken(eventSlave, `"Please,"`));
			t.push(`the slave begs incoherently as you press your`);
			if (V.PC.dick !== 0) {
				t.push(`dick`);
			} else {
				t.push(`strap-on`);
			}
			t.push(`against ${partnerSlave.slaveName}'s finger. It's not clear whether ${he}'s begging you to DP ${his} anus, or begging you not to, but whichever it is, ${partnerSlave.slaveName} withdraws ${his2} finger and you shove yourself inside. ${eventSlave.slaveName} jerks with discomfort and gives a gasping "Oh f-fuck-k" that`);
			if (eventSlave.anus > 2) {
				t.push(`${he} repeats over and over`);
			} else {
				t.push(`is followed by some minor struggling`);
			}
			t.push(`as you begin to fuck ${him}.`);
			seX(eventSlave, "anal", V.PC, "penetrative");
			seX(eventSlave, "anal", partnerSlave, "penetrative");
			if (V.PC.belly + eventSlave.belly + partnerSlave.belly >= 7500) {
				t.push(`The only position you can all manage to squeeze in together doesn't quite allow either of you to pound ${eventSlave.slaveName} as hard as you'd like, but you and ${partnerSlave.slaveName} do your best.`);
			} else {
				t.push(`From ${his2} angle, ${partnerSlave.slaveName} can't pound ${eventSlave.slaveName} quite as hard as you can, but ${he2} does ${his2} best.`);
			}
			t.push(`When you've both had your fun, extracted yourselves, and let the exhausted, gaped bitch collapse onto the floor, ${partnerSlave.slaveName} gives you a naughty wink.`);
			t.push(`<span class="devotion inc">`);
			if (canTalk(partnerSlave)) {
				t.push(Spoken(partnerSlave, `"That was fun, ${Master2}!"`));
			} else {
				t.push(`${He2} quite enjoyed ${himself2}`);
			}
			t.push(`</span>`);
			if (canTalk(partnerSlave)) {
				t.push(`${he2} ${say}s.`);
				t.push(Spoken(partnerSlave, `"Shall we flip ${him} over and go again?"`));
			} else {
				t.push(`and would be happy to go for round two.`);
			}
			t.push(`<span class="devotion inc">`);
			t.push(Spoken(eventSlave, `"Please nooo,"`));
			t.push(`</span>`);
			t.push(`comes a quiet wail from the floor.`);
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 10, 1, -1);
			}
			if (canImpreg(eventSlave, partnerSlave)) {
				knockMeUp(eventSlave, 10, 1, partnerSlave.ID);
			}
			App.Events.addParagraph(container, t);

			eventSlave.devotion += 2;
			partnerSlave.devotion += 2;

			return container;
		}

		function talk() {
			let container = document.createDocumentFragment();
			const {heP} = getSpokenPronouns(V.PC, eventSlave).appendSuffix('P');
			t = [];

			t.push(`You head into the bathroom, shedding clothing as you go. ${He} stares at you as you advance, ${his} eyes fixing on your`);
			if (V.PC.boobs >= 1400) {
				t.push(`enormous tits as you reveal them,`);
			} else if (V.PC.boobs >= 1200) {
				t.push(`huge tits as you reveal them,`);
			} else if (V.PC.boobs >= 1000) {
				t.push(`big tits as you reveal them,`);
			} else if (V.PC.boobs >= 300) {
				t.push(`tits as you reveal them,`);
			} else if (V.PC.belly >= 100000) {
				t.push(`massive pregnancy as it becomes visible,`);
			} else if (V.PC.belly >= 60000) {
				t.push(`giant pregnancy as it becomes visible,`);
			} else if (V.PC.belly >= 15000) {
				t.push(`advanced pregnancy as it becomes visible,`);
			} else if (V.PC.belly >= 10000) {
				t.push(`big baby bump as it becomes visible,`);
			} else if (V.PC.belly >= 5000) {
				t.push(`baby bump as it becomes visible,`);
			} else if (V.PC.belly >= 1500) {
				t.push(`rounded middle as it becomes visible,`);
			} else {
				if (V.PC.title === 0) {
					t.push(`flat chest as you reveal it,`);
				} else {
					t.push(`ripped abs as they become visible,`);
				}
			}
			t.push(`and ${his} lips part slightly. ${His} gaze only shifts when you disrobe completely, revealing your`);
			if (V.PC.dick !== 0) {
				t.push(`hardening`);
				if (V.PC.vagina !== -1) {
					t.push(`dick and`);
				} else {
					t.push(`dick;`);
				}
			} else if (V.PC.vagina !== -1) {
				t.push(`flushed womanhood;`);
			}
			t.push(`${he} licks ${his} lips unconsciously. You grab a towel off the counter, spread it on a bathroom bench, and recline on`);
			if (V.PC.belly < 5000) {
				t.push(`it with your back against the wall.`);
			} else {
				t.push(`it.`);
			}
			t.push(`You pat your`);
			// consider muscles and weight here
			if (V.PC.title === 1) {
				t.push(`hard`);
			} else {
				t.push(`pretty`);
			}
			t.push(`thighs, and ${he} hurries over,`);
			if (eventSlave.fetish === "buttslut" || (eventSlave.fetish === "pregnancy" && V.PC.belly >= 5000)) {
				t.push(`eagerly`);
			} else {
				t.push(`carefully`);
			}
			t.push(`swinging ${his} leg over the bench and seating ${himself} in your`);
			if (V.PC.belly >= 60000) {
				t.push(`lap, getting comfortable against your underbelly.`);
			} else {
				t.push(`lap.`);
			}
			if (V.PC.dick !== 0) {
				t.push(`Your cock slides easily up ${his} whorish butt. One of your arms`);
			} else {
				t.push(`You decided not to bother with a strap-on, so you slide a couple of fingers inside ${him}, and ${he} reciprocates by working a hand under ${himself} to attend to your pussy. Your free arm`);
			}
			if (V.PC.belly < 5000) {
				t.push(`wraps around`);
				if (eventSlave.boobs > 4000) {
					t.push(`${him} and under ${his} heavy tits, resting in a cocoon of soft breastflesh.`);
				} else if (eventSlave.boobs > 800) {
					t.push(`${his} heavy breasts, hefting their weight and eliciting a sigh from the slave.`);
				} else if (eventSlave.belly >= 5000) {
					if (eventSlave.bellyPreg > 3000) {
						t.push(`${his} waist to support ${his} pregnancy.`);
					} else if (eventSlave.bellyImplant > 3000) {
						t.push(`${his} waist to support the weight of ${his} belly.`);
					} else {
						t.push(`${his} waist to stabilize ${his} bloated middle.`);
					}
				} else if (eventSlave.weight > 95) {
					t.push(`${his} stomach to better support ${his} weight.`);
				} else if (eventSlave.boobs > 400) {
					t.push(`${him} to support ${his} chest.`);
				} else {
					t.push(`${him} to support ${his} weight.`);
				}
			} else {
				t.push(`grabs as good a hold as you can get in your state on`);
				if (eventSlave.weight > 95) {
					t.push(`${his} love handle.`);
				} else if (eventSlave.hips > 2) {
					t.push(`${his} massive hip.`);
				} else if (eventSlave.hips >= 2) {
					t.push(`${his} wide hip.`);
				} else if (eventSlave.hips >= 1) {
					t.push(`${his} womanly hip.`);
				} else if (eventSlave.hips >= 0) {
					t.push(`${his} hip.`);
				} else if (eventSlave.hips >= -1) {
					t.push(`${his} narrow hip.`);
				} else {
					t.push(`what should be a hip.`);
				}
			}
			t.push(`Being held this way, ${he} can't really`);
			if (V.PC.dick !== 0) {
				t.push(`bounce on your dick, so ${he} just wiggles ${his} butt into you to seat it a bit deeper`);
			} else {
				t.push(`grind against your fingers`);
			}
			t.push(`and sighs contentedly. You instruct ${him} to elaborate on what ${he} said earlier.`);
			App.Events.addParagraph(container, t);

			t = [];
			t.push(Spoken(eventSlave, `"Yes ${Master},"`));
			t.push(`${he} ${say}s automatically, and then pauses.`);
			t.push(Spoken(eventSlave, `"Hmm. I try not to think about back, you know, before."`));
			t.push(`${He} squeezes ${his} buttocks against your`);
			if (V.PC.dick !== 0) {
				t.push(`crotch.`);
			} else {
				t.push(`hand.`);
			}
			t.push(Spoken(eventSlave, `"But I guess back then I didn't really think about my butthole, much? Like, I went to the bathroom, and washed it in the shower, and that was it. But with the liquid slave food, I don't — sorry, ${Master}, I'm being silly. You know all about that."`));
			t.push(`You tell ${him} to explain it anyway. ${He} looks puzzled for a moment, but <span class="trust inc">remembers ${he} can trust you,</span> and twists around to plant an awkward kiss on your`);
			if (V.PC.belly >= 5000) {
				t.push(`navel`);
			} else {
				t.push(`chin`);
			}
			t.push(`before continuing.`);
			t.push(Spoken(eventSlave, `"Well,"`));
			t.push(`${he} ${say}s, with mock seriousness.`);
			t.push(Spoken(eventSlave, `"Here in the arcology, we slaves eat a very special liquid diet that keeps us healthy and fit and ready to fuck. And, it's absorbed completely, so our butts are always nice and clean. That way, ${Master} can –"`));
			t.push(`${he} clenches ${his} sphincter`);
			if (V.PC.dick !== 0) {
				t.push(`around the base of your cock "– fuck`);
			} else {
				t.push(`against your invading fingers "– play with`);
			}
			t.push(
				Spoken(eventSlave, `our asses –"`),
				`<i>clench</i>`,
				Spoken(eventSlave, `"– whenever –"`),
				`<i>clench</i>`,
				Spoken(eventSlave, `"– ${heP} –"`),
				`<i>clench</i>`,
				Spoken(eventSlave, `"– wants!"`),
				`${He} squeals as you use your encircling arm to hoist ${his} torso up a bit higher, and mercilessly`
			);
			if (V.PC.dick !== 0) {
				t.push(`fuck`);
			} else {
				t.push(`fingerfuck`);
			}
			t.push(`${his} ass. Many of your other slaves came and went during this, and none of them saw anything unusual about you molesting ${eventSlave.slaveName}'s bottom in a corner of the restroom.`);
			t.push(VCheck.Anal(eventSlave, 1));
			eventSlave.trust += 4;
			App.Events.addParagraph(container, t);

			return container;
		}

		function assFuck() {
			let container = document.createDocumentFragment();

			t = [];
			t.push(`You tell ${him} that since ${he} appreciates how ${his} ass has changed, ${he} won't be surprised if you treat it like the fuckhole it is. Something in your tone makes ${him} cautious, but ${he}'s a good ${girl} and ${say}s`);
			t.push(Spoken(eventSlave, `"Yes, ${Master},"`));
			t.push(`automatically. You pass ${V.assistant.name} wardrobe orders for the poor`);
			if (eventSlave.physicalAge > 30) {
				t.push(`${woman},`);
			} else if (eventSlave.physicalAge > 17) {
				t.push(`${girl},`);
			} else if (eventSlave.physicalAge > 12) {
				t.push(`teen,`);
			} else {
				t.push(`${loli},`);
			}
			t.push(`and instructions to have ${him} report to your office once ${he}'s dressed. A few minutes later, ${eventSlave.slaveName} walks up to your desk, stark naked except for a buttplug that comfortably fills ${his} rectum and a sturdy leather collar attached to a leash. You snap your fingers, pointing at the ground, and ${he}`);
			if (eventSlave.belly >= 30000) {
				t.push(`struggles`);
			} else {
				t.push(`scrambles`);
			}
			if (hasAllLimbs(eventSlave)) {
				t.push(`to ${his} hands and knees`);
			} else {
				t.push(`downwards`);
			}
			t.push(`and`);
			if (hasAnyArms(eventSlave)) {
				t.push(`removes ${his} plug.`);
			} else {
				t.push(`presents ${his} plug for removal.`);
			}
			t.push(`After ${he}'s taken a harsh buttfuck, you`);
			if (V.PC.dick !== 0) {
				t.push(`push the plug back in without letting any of your cum escape`);
			} else {
				t.push(`plug ${him} up again`);
			}
			t.push(`and attach the leash to your belt. You ignore your anal toy completely, letting ${him} kneel next to you as you work — ${he} doesn't seem to want to sit, for some reason. For the rest of the day, ${his} anus takes the full force of your libido. You fuck nothing else, confining your efforts to ${his} backdoor, keeping ${him} plugged when you aren't penetrating ${him}. When you're bored, you hand ${him} a dildo and tell ${him} to take care of it ${himself}.`);
			App.Events.addParagraph(container, t);

			t = [];
			t.push(`${He}'s quite exhausted by the end of the day,`);
			if (eventSlave.belly >= 10000) {
				t.push(`waddling`);
			} else {
				t.push(`walking`);
			}
			t.push(`dumbly along behind you, leashed to your belt and wondering tiredly when ${his} next reaming is coming. ${He} doesn't notice that you're bringing ${him} back to stand in front of the mirror until ${he}'s there. You push ${his} compliant body into an approximation of ${his} position from the`);
			if (hasAnyArms(eventSlave)) {
				t.push(`morning and tell ${him} to remove ${his} plug and`);
			} else {
				t.push(`morning, pull out ${his} plug, and tell ${him} to`);
			}
			t.push(`look at ${his} asshole.`);
			t.push(Spoken(eventSlave, `"Yes, ${Master},"`));
			t.push(`${he} ${say}s, and obeys.`);
			if (V.PC.dick !== 0 && V.PC.balls > 0) {
				t.push(`This releases`);
				if (V.PC.balls >= 30) {
					t.push(`an obscene amount of ejaculate as ${his} stomach deflates slowly.`);
				} else if (V.PC.balls >= 14) {
					t.push(`a flood of ejaculate.`);
				} else if (V.PC.balls >= 9) {
					t.push(`a torrent of ejaculate.`);
				} else {
					t.push(`quite a rush of ejaculate.`);
				}
			}
			t.push(`${His} anus is <span class="change positive">very loose,</span> a lewd, gaping fuckhole hungry for toys, fingers, and dick. You tell ${him} that, and ask whether ${he} agrees. <span class="devotion inc">`);
			t.push(Spoken(eventSlave, `"Yes, ${Master},"`));
			t.push(`${he} ${say}s.</span>`);
			eventSlave.devotion += 4;
			eventSlave.anus = 3;
			t.push(VCheck.Anal(eventSlave, 2));
			App.Events.addParagraph(container, t);

			return [container];
		}

		function wrongHole() {
			t = [];
			t.push(`You make it abundantly clear that you and you alone choose what hole you fuck and when, and it will not be ${his} loose asshole.`);
			t.push(Spoken(eventSlave, `"Ah! I-I'm sorry ${Master}, I went too far."`));
			t.push(`<span class="devotion dec">${He} looks crestfallen</span> as you take your leave.`);
			eventSlave.devotion -= 2;
			return t;
		}
	}
};
