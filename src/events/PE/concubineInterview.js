App.Events.PEConcubineInterview = class PEConcubineInterview extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Concubine
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.ID === S.Concubine.ID,
				canTalk,
				canHear
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const PC = V.PC;
		const {he, his, him, girl, He, His} = getPronouns(eventSlave);
		const {he: heP, his: hisP, him: himP, woman: womanP, He: HeP} = getPronouns(PC);
		const {say, title: Master} = getEnunciation(eventSlave);
		const lisps = SlaveStatsChecker.checkForLisp(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const fluid = eventSlave.inflationType;
		const arcology = V.arcologies[0];

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push(`You receive an official communication from a popular talk show e-hosted in one of the old world's still-thriving first world countries. Your fame has become known even in the old world, and they'd like to interview `, App.UI.DOM.slaveDescriptionDialog(eventSlave), ` about you. They frankly warn you that you'll have no right to review the interview and no ability to control what ${he} says, and that they'll be asking about anything the interviewer thinks is juicy. This could be great for your reputation, but it could be hazardous, too.`);

		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result("Accept", accept),
			new App.Events.Result("Decline", decline)
		]);

		function accept() {
			const frag = document.createDocumentFragment();
			let repSum = 0; // just tally here...we'll run the whole sum through repX in one go to avoid rep-scaling problems
			const rep = val => repSum += val;
			const speak = string => Spoken(eventSlave, string);

			t = [];

			t.push(`The show is broadcast live; you head out onto a balcony to watch it on a big screen. It's been impossible to hide, and many of your citizens have taken a proprietary attitude towards your fame: they see your success as their success, too, and want to see ${eventSlave.slaveName} do well. The show introduction plays, introducing the host, a swishy, rail-thin gentleman with impeccable sartorial style and a close-cropped salt-and-pepper beard. He reviews who you are, giving equal time to your accomplishments and the inevitable criticisms from old world antislavery activists, and then calls ${eventSlave.slaveName} out.`);

			App.Events.addParagraph(frag, t);

			t = [];

			t.push(`${He} `);
			if (eventSlave.bellyPreg > 1000000) {
				t.push(`barely waddles out,${hasAnyArms(eventSlave) ? ` arm${hasBothArms(eventSlave) ? `s` : ``} resting atop ${his} ${belly} belly,` : ``}`);
			} else if (eventSlave.bellyPreg > 750000) {
				t.push(`barely waddles out,${hasAnyArms(eventSlave) ? ` arm${hasBothArms(eventSlave) ? `s` : ``} struggling to lift ${his} ${belly}, absolutely child-stuffed belly as ${he} lewdly caresses it,` : ``}`);
			} else if (eventSlave.bellyPreg > 600000) {
				t.push(`waddles out,${hasAnyArms(eventSlave) ? ` arm${hasBothArms(eventSlave) ? `s` : ``} cradling ${his} ${belly}, absolutely child-stuffed belly as best ${he} can as ${he} lewdly caresses its sides,` : ``}`);
			} else if (eventSlave.bellyPreg > 450000) {
				t.push(`waddles out,${hasAnyArms(eventSlave)
					? ` arm${hasBothArms(eventSlave) ? `s` : ``} cradling ${his} ${belly}, absolutely child-stuffed belly as ${he} lewdly sways it side to side,`
					: `lewdly swaying ${his} absolutely child-stuffed belly from side to side,`}`);
			} else if (eventSlave.bellyPreg > 300000) {
				t.push(`strides out,${hasAnyArms(eventSlave)
					? ` arm${hasBothArms(eventSlave) ? `s` : ``} cradling ${his} ${belly}, absolutely child-stuffed belly as ${he} lewdly sways it side to side,`
					: `lewdly swaying ${his} absolutely child-stuffed belly from side to side,`}`);
			} else if (eventSlave.bellyPreg > 150000) {
				t.push(`strides out with an exaggerated gait, purposefully swaying ${his} ${belly}, child-stuffed belly from side to side,`);
			} else if (eventSlave.belly > 150000) {
				t.push(`strides out, ${his} ${belly} belly swaying side to side lewdly,`);
			} else if (eventSlave.belly > 5000) {
				t.push(`strides out, sensually swaying ${his} round belly side to side,`);
			} else {
				t.push(`strides out`);
			}
			if (App.Data.clothes.get(eventSlave.clothes).exposure >= 4) {
				t.push(`in magnificent nudity. It's a shock to old world values, no doubt, but the titillation should counterbalance that.`);
			} else {
				t.push(`resplendent in ${eventSlave.clothes}.`);
			}
			if (eventSlave.skill.entertainment > 60) {
				t.push(`${He}'s <span class="green">graceful and sensual,</span> and entirely at home.`);

				rep(500);
			} else if (eventSlave.skill.entertainment < 30) {
				t.push(`${He}'s <span class="red">clumsy and nervous,</span> but does ${his} best to rally.`);

				rep(-100);
			} else {
				t.push(`${He} manages ${his} entrance reasonably well, and conceals any nervousness.`);
			}
			if (eventSlave.geneticQuirks.neoteny === 2 && eventSlave.visualAge < V.minimumSlaveAge) {
				t.push(`"My honey, aren't you a bit young for this sort of thing?${V.minimumSlaveAge < 16 ? ` I know things are a little different where you're from, but still, you're just a child!` : ``}"`);
				if (eventSlave.intelligence + eventSlave.intelligenceImplant > 50) {
					t.push(`${He} <span class="green">effortlessly diffuses the question.</span> ${speak(`"I'm really ${eventSlave.actualAge}. Most people would never consider a ${girl} with a genetic condition like mine, but my dear Master was able to see past it."`)}`);

					rep(500);
				} else if (eventSlave.intelligence + eventSlave.intelligenceImplant > 15) {
					t.push(`${He} manages to sway the topic away from ${his} apparent underageness. ${speak(`"I'm really ${eventSlave.actualAge}, believe it or not. Wouldn't you like to know my secret?"`)}`);
				} else {
					t.push(`${He} manages to completely miss the insinuation and <span class="red">make things worse than they really are.</span> ${speak(`"Master loves the way I look, that's why I'm ${hisP} favorite after all, but I'm still ${eventSlave.actualAge}-years old."`)}`);

					rep(-100);
				}
			} else if (eventSlave.face > 95) {
				t.push(`"Oh my God," exclaims the host reverently. "Honey, <span class="green">you are gorgeous.</span>" He turns to the camera. "Isn't ${he} just gorgeous?"`);

				rep(500);
			} else if (eventSlave.face < 10) {
				t.push(`There is a distinct lack of response from the host; perhaps he was <span class="red">expecting ${him} to be prettier.</span>`);

				rep(-100);
			} else {
				t.push(`The host gives ${him} a perfunctory compliment on ${his} beauty.`);
			}
			t.push(`They seat themselves in comfortable leather chairs and the interview begins in earnest.`);

			App.Events.addParagraph(frag, t);

			t = [];

			t.push(`The host asks ${him} some soft, nonjudgmental questions about ${his} life and how ${he} became your slave. Then he hits ${him}: "So, ${eventSlave.slaveName}. Tell us about ${PlayerName()}."`);
			if (eventSlave.devotion > 95) {
				t.push(`<span class="green">Without a moment's hesitation,</span> ${he} ${lisps ? `lisps` : `proclaims`}, "I love ${himP}. ${HeP}'s so ${PC.title !== 0 ? `handsome` : `pretty`}, and," ${he} manages to blush prettily, "${heP}'s so good to me."`);

				rep(500);
			} else if (eventSlave.devotion < 60) {
				t.push(`${He} struggles for an instant and then says <span class="red">unconvincingly</span> that ${he} loves you.`);

				rep(-100);
			} else {
				t.push(`${He} recovers quickly and responds that ${he} loves you.`);
			}

			App.Events.addParagraph(frag, t);

			t = [];

			t.push(`The host glances at the camera. "Wow." He presses on. "But you're ${hisP} slave, ${eventSlave.slaveName}. ${HeP} owns you. Isn't that hard for you?"`);

			App.Events.addParagraph(frag, t);

			t = [];

			t.push(`${He} shakes ${his} head.`);
			if (eventSlave.trust > 95) {
				t.push(`<span class="green">${He} responds confidently,</span> "My life with ${himP} is very different from anything you might find here in the old world. But I'm happy with ${himP}, and there's no one I'd rather be with, as a slave or not."`);

				rep(500);
			} else if (eventSlave.trust < 60) {
				t.push(`${He} explains that it isn't hard to trust someone like you, but this <span class="red">falls a little flat.</span>`);

				rep(-100);
			} else {
				t.push(`${He} explains earnestly that it isn't hard to trust someone like you, and explains some of the blander details about life as your slave.`);
			}
			if (eventSlave.belly > 1500) {
				t.push(`The host places a hand on ${his} belly,`);
				if (eventSlave.bellyPreg > 450000) {
					t.push(`gasping at the tautness and the feeling of the ${eventSlave.pregType > 1 ? `children` : `child`} distending the skin beneath his hand.`);
				} else if (eventSlave.bellyPreg > 100000) {
					t.push(`gasping at the flurry of kicks in response.`);
				} else if (eventSlave.belly > 15000) {
					t.push(`giving it a good groping.`);
				} else if (eventSlave.belly > 5000) {
					t.push(`giving it a good pat.`);
				} else {
					t.push(`giving it a good feel.`);
				}
				t.push(`"Now I'm sure our viewers are wondering," he says, patting the firm dome. "Is it ${PlayerName()}'s?"`);
				if (eventSlave.pregSource === -1) {
					if (eventSlave.bellyPreg > 450000) {
						t.push(`${speak(`"Of course they are!"`)} ${he} proclaims proudly as ${he} ${hasAnyArms(eventSlave) ? `runs ${his} hand${hasBothArms(eventSlave) ? `s` : ``} across` : `stretches out to show off`} ${his} quivering mass. "All ${eventSlave.pregType} of them!"`);
					} else if (eventSlave.bellyPreg > 100000) {
						t.push(`${speak(`"Of course they are!"`)} ${he} proclaims proudly as ${he} ${hasAnyArms(eventSlave) ? `runs ${his} hand${hasBothArms(eventSlave) ? `s` : ``} across` : `stretches out to show off`} ${his} belly. "All ${eventSlave.pregType} of them!"`);
					} else if (eventSlave.bellyImplant > 1500) {
						t.push(speak(`"It's fake. Pretty hard to tell though, isn't it?"`));
					} else if (eventSlave.bellyPreg > 1500) {
						t.push(speak(`"Of course ${eventSlave.pregType > 1 ? `they are` : `it is`}!"`));
					} else if (eventSlave.bellyFluid > 100) {
						t.push(speak(`"Nah. It's all ${fluid} inside me."`));
					} else if (eventSlave.bellyImplant > -1) {
						t.push(speak(`"It's fake. Pretty hard to tell though, isn't it?"`));
					} else {
						t.push(speak(`"Of course ${eventSlave.pregType > 1 ? `they are` : `it is`}!"`));
					}
				} else {
					t.push(speak(`"That's for me and my ${Master} only," ${he} teases, sticking out ${his} tongue.`));
				}
			}
			if (eventSlave.broodmother === 2 && eventSlave.preg >= 36) {
				t.push(`${He} grunts and struggles to ${hasBothLegs(eventSlave) ? `spread ${his} legs` : `get into position`}. ${speak(`"I'm sorry, another one is coming out right now..."`)} ${he} ${say}s, turning red. The host, at a loss for words, can only watch as`);
				if (App.Data.clothes.get(eventSlave.clothes).exposure >= 4) {
					t.push(`a child is born into the world, live on screen.`);
				} else {
					t.push(`a child is born into ${his}`);

					switch (eventSlave.clothes) {
						case "a toga":
							t.push(`toga.`);
							break;
						case "a huipil":
							t.push(`huipil.`);
							break;
						case "a slutty qipao":
							t.push(`slutty qipao.`);
							break;
						case "a penitent nuns habit":
							t.push(`habit.`);
							break;
						case "a slave gown":
						case "a ball gown":
							t.push(`gown.`);
							break;
						case "a comfortable bodysuit":
							t.push(`bodysuit.`);
							break;
						case "a leotard":
							t.push(`leotard.`);
							break;
						case "a bunny outfit":
							t.push(`bunny outfit.`);
							break;
						case "a nice nurse outfit":
							t.push(`nurse outfit.`);
							break;
						case "a slutty nurse outfit":
							t.push(`slutty nurse outfit.`);
							break;
						case "a schoolgirl outfit":
							t.push(`school clothes.`);
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t.push(`abaya.`);
							break;
						case "a klan robe":
							t.push(`robe.`);
							break;
						case "a hijab and blouse":
							t.push(`skirt.`);
							break;
						case "a burqa":
							t.push(`burqa.`);
							break;
						case "a burkini":
							t.push(`burkini.`);
							break;
						case "a kimono":
							t.push(`kimono.`);
							break;
						case "a hanbok":
							t.push(`hanbok.`);
							break;
						case "a nice maid outfit":
							t.push(`maid outfit.`);
							break;
						case "a slutty maid outfit":
							t.push(`skimpy maid outfit.`);
							break;
						case "a gothic lolita dress":
						case "a halter top dress":
						case "a long qipao":
						case "a maternity dress":
						case "a mini dress":
						case "a Santa dress":
						case "a biyelgee costume":
						case "an evening dress":
							t.push(`dress.`);
							break;
						case "a latex catsuit":
							t.push(`latex catsuit.`);
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a red army uniform":
						case "a mounty outfit":
						case "a police uniform":
						case "a confederate army uniform":
							t.push(`uniform.`);
							break;
						case "a slutty schutzstaffel uniform":
							t.push(`slutty uniform.`);
							break;
						case "spats and a tank top":
							t.push(`spats.`);
							break;
						case "a monokini":
							t.push(`monokini.`);
							break;
						case "a cybersuit":
							t.push(`cybersuit.`);
							break;
						case "a tight Imperial bodysuit":
							t.push(`bodysuit.`);
							break;
						case "battlearmor":
							t.push(`armor.`);
							break;
						case "Imperial Plate":
							t.push(`ultra-heavy armor.`);
							break;
						// case "skirt" //FIXME: skirts are not a thing apparently
						// 	t.push(`dress.`);
						// 	break;
						case "lederhosen":
							t.push(`shorts.`);
							break;
						case "a courtesan dress":
							t.push(`layered skirt.`);
							break;
						case "a bimbo outfit":
							t.push(`thong.`);
							break;
						default:
							t.push(`${eventSlave.clothes}.`);
							break;
					}
				}
			}

			App.Events.addParagraph(frag, t);

			t = [];

			t.push(`The interview winds on, gradually descending into prurient territory. ${eventSlave.slaveName} answers readily, giving everyone watching quite a window into an oversexed slave society.`);
			if (eventSlave.intelligence + eventSlave.intelligenceImplant > 15) {
				t.push(`${He}'s clever enough to <span class="green">shock and titillate</span> at the same time; in response to a probing question about whether ${he} has any plans for the rest of the night, ${he} ${say}s, ${speak(`"Of course my ${Master} makes the plans. But I hope I can get back to the arcology early."`)} ${He} shifts suggestively in ${his} chair. "I'm looking forward to getting fucked tonight."`);

				rep(500);
			} else {
				t.push(`${He}'s rather blunt in ${his} responses, answering with a little too much detail; not that the audience minds.`);
			}
			t.push(`The host, taken off guard, laughs in surprise and says he envies you that. He asks a follow up question that hints at ${his} sexual preferences without coming straight out and asking how ${he} likes it.`);
			if (eventSlave.intelligence + eventSlave.intelligenceImplant + eventSlave.skill.entertainment > 130 && !eventSlave.tankBaby) {
				t.push(`${He} has enough knowledge of the old world to be able to answer without going too far, and <span class="green">subtly alludes</span> to how much ${he} enjoys`);
				if (eventSlave.fetish === Fetish.SUBMISSIVE) {
					t.push(`submitting to you in bed.`);
				} else if (eventSlave.fetish === "cumslut") {
					if (!PC.dick) {
						t.push(`eating you out.`);
					} else {
						t.push(`sucking you off.`);
					}
				} else if (eventSlave.fetish === "humiliation") {
					t.push(`it when you show ${him} off in public.`);
				} else if (eventSlave.fetish === "buttslut") {
					t.push(`anal sex.`);
				} else if (eventSlave.fetish === "boobs") {
					t.push(`anything that involves ${his} breasts.`);
				} else if (eventSlave.fetish === "sadist") {
					t.push(`it whenever you share a reluctant slave with ${him}.`);
				} else if (eventSlave.fetish === "masochist") {
					t.push(`a good spanking.`);
				} else if (eventSlave.fetish === "dom") {
					t.push(`sharing a submissive slave with you.`);
				} else if (eventSlave.fetish === "pregnancy") {
					if (eventSlave.pregKnown) {
						t.push(`sex while pregnant.`);
					} else if (eventSlave.vagina > 0) {
						t.push(`bareback.`);
					} else {
						t.push(`sharing a pregnant slave with you.`);
					}
				} else if (eventSlave.energy > 95) {
					t.push(`sex, regardless of what kind it is.`);
				} else {
					t.push(`sex in the missionary position.`);
				}

				rep(500);
			} else {
				t.push(`${His} answer betrays how ${eventSlave.tankBaby ? `little ${he} knows` : `much ${he}'s forgotten`} about the old world: ${he} mildly shocks the studio audience by describing`);
				if (eventSlave.fetish === Fetish.SUBMISSIVE) {
					t.push(`how good it feels when you hold ${him} down and fuck ${him}`);
				} else if (eventSlave.fetish === "cumslut") {
					if (!PC.dick) {
						t.push(`how much fun sucking your cock is`);
					} else {
						t.push(`how much fun polishing your pearl is`);
					}
				} else if (eventSlave.fetish === "humiliation") {
					t.push(`how hot it is to get fucked in public`);
				} else if (eventSlave.fetish === "buttslut") {
					t.push(`how much ${he} loves the feeling of you stretching ${his} anal ring`);
				} else if (eventSlave.fetish === "boobs") {
					t.push(`how much ${he} loves having ${his} nipples tugged`);
				} else if (eventSlave.fetish === "sadist") {
					t.push(`how much ${he} loves molesting other slaves with you`);
				} else if (eventSlave.fetish === "masochist") {
					t.push(`how good it feels to be forced`);
				} else if (eventSlave.fetish === "dom") {
					t.push(`how much ${he} loves holding other slaves down for you`);
				} else if (eventSlave.fetish === "pregnancy") {
					if (eventSlave.pregKnown || eventSlave.counter.births > 0) {
						t.push(`how good sex feels while pregnant`);
					} else if (eventSlave.vagina > 0) {
						t.push(`how good cum feels inside ${him}`);
					} else {
						t.push(`how much fun it is to fuck pregnant slaves`);
					}
				} else if (eventSlave.energy > 95) {
					t.push(`the average number of sexual encounters ${he} has in a week`);
				} else {
					t.push(`${his} sex life with you`);
				}
				t.push(`in a matter-of-fact tone of voice.`);
			}

			App.Events.addParagraph(frag, t);

			if (eventSlave.intelligence + eventSlave.intelligenceImplant > 50) {
				t = [];

				t.push(`Only because you know ${him} so well are you able to perceive the instant of cold calculation before ${he} makes a <span class="green">perfect tactical decision</span> and turns directly to the camera. "Whatever you want," ${he} ${say}s confidently, ${speak(`"You can find it in a Free Cities arcology like my ${Master}'s. Where I live, there's`)}`);
				if (arcology.FSRestart > 0) {
					t.push(speak(`the most interesting people,`));
				}

				if (arcology.FSPaternalist > 0) {
					t.push(speak(`wonderful opportunities for everyone,`));
				}

				if (arcology.FSAssetExpansionist > 0) {
					t.push(speak(`boobs the size of beach balls,`));
				}

				if (arcology.FSRepopulationFocus > 0) {
					t.push(speak(`lots of bellies of all sizes,`));
				}

				if (!FutureSocieties.isActive('FSBodyPurist', arcology)) {
					t.push(speak(`gorgeous tattoos and piercings,`));
				} else if (arcology.FSTransformationFetishist > 0) {
					t.push(speak(`new assets every day,`));
				}

				if (arcology.FSPastoralist > 0) {
					t.push(speak(`milk straight from the nipple,`));
				}

				if (arcology.FSPhysicalIdealist > 0) {
					t.push(speak(`the most incredible oiled-up muscles,`));
				} else if (arcology.FSHedonisticDecadence > 0) {
					t.push(speak(`the softest, most laid-back girls,`));
				}

				if (arcology.FSRomanRevivalist > 0) {
					t.push(speak(`Rome come again,`));
				} else if (arcology.FSNeoImperialist > 0) {
					t.push(speak(`a New Imperium worthy of the ages,`));
				} else if (arcology.FSAztecRevivalist > 0) {
					t.push(speak(`Blood empire reborn,`));
				} else if (arcology.FSEgyptianRevivalist > 0) {
					t.push(speak(`the land of the Pharaohs reborn,`));
				} else if (arcology.FSAntebellumRevivalist > 0) {
					t.push(speak(`a new Dixie reborn,`));
				}

				if (arcology.FSGenderRadicalist > 0) {
					t.push(speak(`more ass than you can possibly fuck,`));
				} else if (arcology.FSGenderFundamentalist > 0) {
					t.push(speak(`so much pussy it's unbelievable,`));
				}

				if (arcology.FSIntellectualDependency > 0) {
					t.push(speak(`slaves eager to get in your pants,`));
				}

				if (arcology.FSSlaveProfessionalism > 0) {
					t.push(speak(`slaves you can have a conversation with,`));
				}

				if (arcology.FSPetiteAdmiration > 0) {
					t.push(speak(`where even the shortest can stand tall,`));
				} else if (arcology.FSStatuesqueGlorification > 0) {
					t.push(speak(`plenty of mouths at crotch height,`));
				}

				if (arcology.FSChattelReligionist > 0) {
					t.push(speak(`a fulfilling sexual and spiritual life,`));
				}

				if (arcology.FSDegradationist > 0) {
					t.push(speak(`bitches you can just hold down and use,`));
				}

				if (arcology.FSSupremacist > 0) {
					t.push(speak(`${arcology.FSSupremacistRace} power,`));
				}

				if (arcology.FSSubjugationist > 0) {
					t.push(speak(`${arcology.FSSubjugationistRace} girls to cater to your every whim,`));
				}

				t.push(speak(`girls in pretty dresses and girls in string bikinis and girls who haven't worn clothes in years,`));
				if (V.seeDicks !== 0) {
					t.push(speak(`girls with huge dicks you can assfuck until they cum buckets, girls with soft dicks and no balls,`));
				}

				if (V.seeDicks !== 0 && V.seeDicks !== 100) {
					t.push(speak(`girls with dicks the size of clits and girls with clits the size of dicks,`));
				}

				if (V.seeDicks !== 100) {
					t.push(speak(`young girls on their first pregnancy, MILFs on their tenth,`));
				}

				t.push(speak(`lips, tongues,`));

				if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
					t.push(speak(`incest,`));
				}

				if (!FutureSocieties.isActive('FSSlimnessEnthusiast', arcology)) {
					t.push(speak(`huge breasts and plush asses,`));
				} else if (!FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
					t.push(speak(`pert tits and cute butts,`));
				}

				t.push(speak(`and more. I wouldn't trade it for anything."`), ` The host politely regains control of his show, but there's a cautious respect in the rest of his questions.`);

				rep(1500);

				App.Events.addParagraph(frag, t);

				if (PC.title === 0) {
					t = [];

					t.push(`${eventSlave.slaveName} even manages to <span class="green">respond well</span> to a probing question about your gender. ${He} ${lisps ? `lisps` : `explains`}, ${speak(`"You have to understand that all that nonsense about men and women means less to us in the Free Cities. My ${Master} is a successful and powerful ${womanP}.`)}`);
					if (!PC.dick) {
						t.push(`${speak(`We just pay the right amount of attention to the success and the power.`)} ${He} quirks a corner of ${his} mouth. "I know <em>I</em> do."`);
					} else {
						t.push(`${He} quirks a corner of ${his} mouth. ${speak(`"And ${heP} has a <em>wonderful</em> cock."`)}`);
					}

					rep(500);

					App.Events.addParagraph(frag, t);
				}
			}

			t = [];

			t.push(`At the conclusion, the host`);
			if (repSum > 200) {
				t.push(`seems <span class="green">impressed</span> and says sincerely,`);
			} else if (repSum < 0) {
				t.push(`seems <span class="red">unimpressed</span> and says mockingly,`);
			} else {
				t.push(`says jokingly,`);
			}
			t.push(`"My dear it's been a pleasure. If all Free Cities ${girl}s are like you I might have to look into immigrating. Ladies and gentlemen, good night!"`);
			repX(repSum, "concubine", eventSlave);

			App.Events.addParagraph(frag, t);

			return frag;
		}

		function decline() {
			t = [];

			t.push(`You decline. The media representative of the show is understanding. "I'll be sure to contact you if we ever have another opening," she says. "You're pretty interesting, you know."`);

			return t;
		}
	}
};
