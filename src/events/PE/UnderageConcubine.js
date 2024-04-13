App.Events.PEUnderageConcubine = class PEUnderageConcubine extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !V.eventResults.youngConcubine, // only once
			() => V.minimumSlaveAge < 18, // underage content visible
			() => V.PC.visualAge > 18, // underage PC is a totally different controversy
			() => !!S.Concubine, // must have concubine
			() => !FutureSocieties.isActive('FSMaturityPreferentialist') // failure should not benefit the player
		];
	}

	actorPrerequisites() {
		return [ [ // one actor, must be able-bodied, devoted, hearing/speaking, underaged concubine; eyes not necessary
			(s) => s.ID === V.ConcubineID,
			(s) => s.fetish !== Fetish.MINDBROKEN,
			(s) => s.actualAge < 18, // it's in the name of the event
			(s) => s.visualAge < 18, // so they must also look it
			(s) => s.actualAge > 6, // event text assumes fluent speech, inductive reasoning, etc
			(s) => s.devotion > 50, // you took her to an external event with you, so you must be able to count on her obedience
			canTalk,
			(s) => hasAnyArms(s),
			canMove,
			canHear
		] ];
	}

	execute(node) {
		const [concubine] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(concubine);

		App.Events.drawEventArt(node, concubine);

		const {say, title: Master} = getEnunciation(concubine);

		let t = [];
		t.push(`You've found a bit of time in your hectic schedule, as you always try to do, to relax and enjoy letting`);
		t.push(contextualIntro(V.PC, concubine, true));
		t.push(`do what ${he} does best.`);
		const receptacle = concubine.toyHole === "all her holes" || concubine.toyHole === "dick" ? "mouth" : concubine.toyHole;
		t.push(`Just after you come ${concubine.toyHole === "boobs" ? `on ${his} chest` : `in ${his} ${receptacle}`}, ${V.assistant.name} lets you know that you and ${V.arcologies[0].name} have been trending in old-world social media.`);
		const rel = relativeTerm(V.PC, concubine);
		t.push(`Last week a video was captured of you sharing a kiss with ${concubine.slaveName} at a major event you attended, and now many citizens of nearby old-world countries are up in arms over your young, beautiful concubine, especially once they found out that ${he} is a ${girl} of just ${num(concubine.actualAge, true)}${rel ? `, and your ${rel} to boot.` : `.`}`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Given the amount and variety of degeneracy found throughout the Free Cities, you find it odd that this has generated so much controversy, but maybe the average old world citizen just doesn't know as much about Free Cities culture as you thought. Scrolling through the commentary, you find a mix of reactions, ranging from outrage and revulsion to sheer envy.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`While ${V.assistant.name} expresses some concerns about attracting too much attention, ${concubine.slaveName} has a different opinion.`);
		t.push(Spoken(concubine, `"Why not take this as an opportunity, ${Master}? Maybe if more people saw things the way we do, they wouldn't hate us for it!"`));
		App.Events.addParagraph(node, t);

		V.eventResults.youngConcubine = 1; // don't repeat this event

		const haveSmilingMan = V.secExpEnabled && V.SecExp && V.SecExp.smilingMan.progress === 10;
		App.Events.addResponses(node, [
			new App.Events.Result("Ignore the controversy... What can they do about it anyway?", ignore),
			new App.Events.Result("Contact an old-world talk show and schedule an interview", interview),
			V.PC.skill.hacking >= 40 || haveSmilingMan ? new App.Events.Result("Hack the social media conversation to favor your point of view", hack) : new App.Events.Result(),
			V.PC.skill.hacking >= 60 || haveSmilingMan ? new App.Events.Result("Take down the videos and silence the conversation", silence) : new App.Events.Result()
		]);

		function ignore() {
			let frag = document.createDocumentFragment();
			t = [];
			t.push(`Your days of caring what the Old World has to say are long over. You tell both ${V.assistant.name} and ${concubine.slaveName} to ignore the fuss and go back to what they were doing as you reach over to play with ${concubine.slaveName}'s pretty ${num(concubine.actualAge)}-year-old ${concubine.toyHole === "all her holes" ? "body" : concubine.toyHole}.`);
			App.Events.addParagraph(frag, t);

			// doesn't matter, huh? let's see about that...
			const matureArc = arcologyGoesMature();
			if (matureArc) {
				t = [];
				t.push(`Over the remainder of the week, the storm of outside controversy eventually causes ${matureArc.name}, your neighbor to the ${matureArc.direction}, to release an interview in which they carefully clarify that they, at least, prefer older slaves. They have <span class="yellow">adopted Maturity Preferentialism.</span>`);
				App.Events.addParagraph(frag, t);
			}
			return frag;
		}

		function arcologyGoesMature() {
			const vulnerableArcologies = V.arcologies.filter((arc) => arc.direction !== 0 && arc.government !== "your agent" && arc.government !== "your trustees" && arc.rival !== 1);
			let arcology = vulnerableArcologies.find((arc) => FutureSocieties.isActive('FSYouthPreferentialist', arc)); // if there's a YP arcology, we'll replace it with MP for maximum effect
			if (!arcology) {
				arcology = vulnerableArcologies.find((arc) => FutureSocieties.activeCount(arc) < V.FSCreditCount); // adopt another FS prematurely...hopefully doesn't cause problems
			}
			if (arcology) {
				arcology.FSYouthPreferentialist = null;
				if (arcology.FSMaturityPreferentialist < 60) {
					arcology.FSMaturityPreferentialist = 60; // entrench somewhat
				}
			}
			return arcology;
		}

		function interview() {
			let frag = document.createDocumentFragment();
			let interviewPoints = 0;

			t = [];
			t.push(`${capFirstChar(V.assistant.name)} sets up an interview with a morning talk show based out of a nearby old world country. It's a show that's been friendly towards the Free Cities in the past, so you hope it will be a good platform.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`The interview is conducted remotely, and broadcast live; you and ${concubine.slaveName} sit comfortably on the couch in your office, with your arm around ${his} shoulders. The host, a petite blonde woman in a professional feminine-cut suit, begins by introducing you both and playing the video clip that's received so much attention.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`The interviewer clears her throat.`);
			if (concubine.porn.feed) {
				t.push(`"And that's just the beginning. I'm told that our producers have seen some substantially more explicit content featuring the two of you available on the dark web."`);
				if (concubine.porn.fameType === "underage") {
					t.push(`You begin to wonder whether ${concubine.slaveName}'s fame in explicitly underaged pornography in the Free Cities is going to end up making this interview more difficult.`);
				}
			} else {
				t.push(`"Now, I can see why some people might be concerned about that. That kiss looks anything but chaste!"`);
			}
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`${capFirstChar(concubine.slaveName)} smiles prettily,`);
			if (concubine.face > 40) {
				t.push(`captivating the audience with ${his}`);
				switch (concubine.faceShape) {
					case "cute":
						t.push("extraordinarily cute");
						break;
					case "normal":
						t.push("cute, young");
						break;
					case "masculine":
						t.push("young, handsome");
						break;
					default:
						t.push(`young, ${concubine.faceShape}`);
				}
				t.push(`face,`);
				interviewPoints++;
			}
			t.push(`giggles briefly, and then pulls ${himself} onto your lap to kiss you passionately before returning to ${his} place next to you on the couch.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`The interviewer blushes but maintains a straight face. "I see... And would you say that this kind of relationship is common in ${V.arcologies[0].name}?"`);
			App.Events.addParagraph(frag, t);

			const puberty = concubine.genes === "XX" ? !!concubine.pubertyXX : !!concubine.pubertyXY;
			App.Events.addResponses(frag, [
				new App.Events.Result(`We have a special relationship`, specialRelationship),
				new App.Events.Result(`Slaves should always see to their ${getWrittenTitle(concubine)}'s happiness, regardless of age`, slavesDuty),
				puberty ? new App.Events.Result(`Sex with teens is common, as it has been historically`, ephebephile) : new App.Events.Result(),
				new App.Events.Result(`We encourage everyone to explore their sexuality, even children`, pedophile)
			]);

			return frag;

			function specialRelationship() {
				let frag2 = document.createDocumentFragment();

				t = [];
				t.push(`"We have a special relationship," you reply.`);
				App.Events.addParagraph(frag2, t);

				// let's see if she backs you up on that...
				t = [];
				switch (concubine.relationship) {
					case -3: { // married
						t.push(`${concubine.slaveName} shows the camera ${his} wedding ring.`);
						t.push(Spoken(concubine, `"We're married! And quite happily, too, thank you!"`));
						t.push(`${He} gives you a quick kiss on the cheek, and you (and the camera) can see the <span class="trust inc">trust</span> and <span class="devotion inc">devotion</span>`);
						if (canSee(concubine)) {
							t.push(`in ${his} eyes.`);
						} else {
							t.push(`on ${his} face.`);
						}
						interviewPoints++;
						concubine.trust += 2;
						concubine.devotion += 2;
						break;
					}
					case -2: { // bonded
						t.push(`${concubine.slaveName} rests ${his} head on your shoulder gently.`);
						t.push(Spoken(concubine, `"I love my ${Master} so much!"`));
						t.push(`${he} ${say}s <span class="trust inc">proudly.</span>`);
						interviewPoints++;
						concubine.trust += 2;
						break;
					}
					default: {
						t.push(`${concubine.slaveName} looks momentarily confused.`);
						if (concubine.intelligence + concubine.intelligenceImplant > 50) {
							t.push(`${He} recovers quickly, smiling at the camera and hugging you, but you and the interviewer both know that <span class="devotion dec">wasn't what ${he} expected,</span> and that ${he}'ll expect <span class="trust dec">repercussions</span> from you later.`);
							concubine.devotion--;
							concubine.trust--;
						} else {
							t.push(`"We do?", ${he} asks cautiously. You give a noncommittal reply for the camera, but you know it <span class="devotion dec">didn't go over well,</span> either with the audience or with ${concubine.slaveName}.`);
							interviewPoints--;
							concubine.devotion -= 5;
						}
					}
				}
				App.Events.addParagraph(frag2, t);

				conclusion(frag2);

				return frag2;
			}

			function slavesDuty() {
				let frag2 = document.createDocumentFragment();

				t = [];
				t.push(`"Slaves should always see to their ${properMaster()}'s happiness, regardless of age," you reply.`);
				App.Events.addParagraph(frag2, t);

				// remember your audience...this is NOT the answer the old world wants to hear!
				interviewPoints--;

				t = [];
				t.push(`The interviewer looks taken aback momentarily; she didn't expect such a direct answer to that question. It's not going to endear you to the Old World's moralizers.`);
				App.Events.addParagraph(frag2, t);

				// let's see if your concubine is fast enough and motivated enough to make up the difference (or make it worse)
				if (concubine.intelligence + concubine.intelligenceImplant > 15) {
					if (concubine.behavioralQuirk === "advocate") {
						t = [];
						t.push(`${capFirstChar(concubine.slaveName)} knows why you agreed to this interview, and wants to make sure the Old World ends up with a positive impression of the Free Cities.`);
						t.push(Spoken(concubine, `"So many people have no sense of purpose in this world, but we're lucky. As slaves, we know exactly what we're here to do, and we love the assurance and security that brings. I love to serve ${Master}."`));
						App.Events.addParagraph(frag2, t);
						interviewPoints++;
					} else if (concubine.behavioralFlaw === "liberated") {
						t = [];
						t.push(`${capFirstChar(concubine.slaveName)} <span class="devotion dec">bristles visibly</span> at your mention of slaves' duty; you've had many conversations with ${him} about the institution of slavery, and you know ${he}'s an idealistic ${girl} who strongly opposes it.`);
						if (concubine.trust > 50) { // doesn't expect to be punished
							t.push(`But the audience doesn't, until ${he} speaks up:`);
							t.push(Spoken(concubine, `"I serve ${Master} because I love him, but not everyone is so lucky. It's just the reality of slavery in the Free Cities."`));
							concubine.devotion--; // even subtle venting helps
						} else {
							t.push(`${He}'s well-broken and keeps ${his} mouth shut, but the audience can sense ${he}'s <span class="devotion dec">disturbed and angry.</span>`);
							concubine.devotion -= 5;
						}
						App.Events.addParagraph(frag2, t);
						interviewPoints--;
					}
				}

				conclusion(frag2);

				return frag2;
			}

			function ephebephile() {
				let frag2 = document.createDocumentFragment();

				t = [];
				t.push(`"Sex with teens is common, as it has been historically," you reply, proceeding to explain in detail that the modern aversion to sex with adolescents is a historical aberration, and that even in modern times sexual attraction to teens has not been considered abnormal by trained psychologists.`);
				// don't try this line of reasoning with NCS youthening, obviously...
				if (concubine.visualAge >= 13) {
					t.push(`You also point out that physical characteristics of teens like ${concubine.slaveName} are really very similar to those of adults, and cast "age of consent" as an arbitrary social construct that the Free Cities' very different society has not chosen to retain.`);
					interviewPoints++;
				} else {
					t.push(`Your efforts to illustrate that teens and adults are physically similar, though, fall flat because of ${concubine.slaveName}'s extremely youthful appearance; there's no way ${he} could even remotely pass as a young adult.`);
					interviewPoints--;
				}
				App.Events.addParagraph(frag2, t);

				conclusion(frag2);

				return frag2;
			}

			function pedophile() {
				let frag2 = document.createDocumentFragment();

				t = [];
				t.push(`"We encourage everyone to explore their sexuality, even children," you reply, proceeding to explain that, far from being asexual, kids like ${concubine.slaveName} are naturally curious about their bodies and sex. Although you do your best to explain having sex with the underaged in your arcology as an educational exercise, you can tell that the interviewer remains skeptical. It seems the old world just isn't ready for interactive sex ed.`);
				App.Events.addParagraph(frag2, t);

				// remember your audience...this is NOT the answer the old world wants to hear!
				interviewPoints--;

				conclusion(frag2);

				return frag2;
			}

			/** @param {DocumentFragment} frag2 */
			function conclusion(frag2) {
				// shared conclusion for interview segment
				t = [];
				t.push(`The remainder of the interview passes similarly. ${concubine.slaveName}'s attention wanders from time to time, but you can tell ${he}'s <span class="trust inc">happy</span> that you decided to address the controversy directly.`);
				concubine.trust += 2;
				App.Events.addParagraph(frag2, t);

				t = [];
				if (interviewPoints > 0) {
					const womanP = getPronouns(V.PC).woman;
					t.push(`Furthermore, by the end of the interview you can tell you've made some significant progress getting the interviewer, and hopefully the audience, more receptive towards your point of view. Recordings find their way back into the Free Cities and you're <span class="reputation inc">hailed as a spokes${womanP}.</span>`);
					App.Events.addParagraph(frag2, t);
					V.eventResults.youngConcubine = 2; // record persuasive success in case we want to use it in the future
					repX(1000, "event");
				} else if (interviewPoints === 0) {
					t.push(`Although your performance on the old-world talk show wasn't exactly hailed as persuasive, your openness at least helped tamp down the outrage, and you've earned a bit of <span class="reputation inc">respect</span> from your Free Cities peers.`);
					App.Events.addParagraph(frag2, t);
					repX(100, "event");
				} else { // interviewPoints < 0
					t.push(`Unfortunately, your performance on the old-world talk show has just riled up the moralizers even more, and has put other Free Cities on their back foot as they struggle to explain away your controversy. You find yourself getting fewer invitations to attend events as you <span class="reputation dec">lose the respect</span> of your peers.`);
					App.Events.addParagraph(frag2, t);
					repX(forceNeg(500), "event");

					const matureArc = arcologyGoesMature();
					if (matureArc) {
						t = [];
						t.push(`Furthermore, the storm of outside controversy causes ${matureArc.name}, your neighbor to the ${matureArc.direction}, to release an interview in which they carefully clarify that they, at least, prefer older slaves. They have <span class="yellow">adopted Maturity Preferentialism.</span>`);
						App.Events.addParagraph(frag2, t);
					}
				}
			}
		}

		function hack() {
			t = [];
			if (V.PC.skill.hacking >= 80) {
				t.push(`You know the old adage about nothing ever really being gone from the internet, so you decide to take the smarter approach and, through a series of sock puppets and social engineering, push the conversation away from outrage and toward envy. The resulting influx of trade and migration to the Free Cities <span class="green">increases your prosperity.</span>`);
				V.eventResults.youngConcubine = 2; // record persuasive success in case we want to use it in the future
				V.arcologies[0].prosperity += 2;
			} else if (haveSmilingMan) {
				t.push(`Although you know your hacking expertise isn't up to the job, you know someone who can accomplish the impossible. The Smiling Man, through a series of sock puppets, selective moderation, and social engineering, guides the conversation towards more envy and less outrage. The resulting influx of trade and migration to the Free Cities <span class="green">increases your prosperity.</span>`);
				V.eventResults.youngConcubine = 2; // record persuasive success in case we want to use it in the future
				V.arcologies[0].prosperity += 2;
			} else {
				t.push(`You know the old adage about nothing ever really being gone from the internet, so you decide to take the smarter and more subtle approach. Alas, your hamfisted attempts to shape the conversation through hacking and sockpuppets result in <span class="reputation dec">significant backlash</span> from within the Free Cities, and death threats from the old world.`);
				repX(forceNeg(1000), "event");
			}
			return t;
		}

		function silence() {
			t = [];
			if (V.PC.skill.hacking >= 100) {
				t.push(`Although it's commonly considered impossible to take anything off the internet, you have just about enough skill and experience to make it happen. Through a relentless series of AI-assisted attacks and breaches, you ensure that the conversation, and the videos, fade from public consciousness in the old world. You leave some search-and-destroy programs running just in case you want to appear in public with ${concubine.slaveName} again.`);
			} else if (haveSmilingMan) {
				t.push(`Although you know your hacking expertise isn't up to the job, you know someone who can accomplish the impossible and make things disappear from the internet. The Smiling Man strikes again, and within hours, the video is gone and the conversations are quiet. And with the Smiling Man watching your back, you can continue taking ${concubine.slaveName} anywhere you want.`);
			} else {
				t.push(`You know the old adage about nothing ever really being gone from the internet, and despite your best attempts, it seems to be true. The video and associated conversations keep resurfacing, and your hamfisted attempts to shut it down <span class="reputation dec">cause backlash</span> from within the Free Cities, and death threats from the old world.`);
				repX(forceNeg(1000), "event");
			}
			return t;
		}
	}
};
