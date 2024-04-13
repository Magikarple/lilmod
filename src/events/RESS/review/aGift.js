// cSpell:ignore RESSAGift

App.Events.RESSAGift = class RESSAGift extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion > 50,
				s => s.trust > 50,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => V.HeadGirlID !== s.ID // eventSlave.ID cannot be 0(?), therefore redundant to also allow V.headGirlID === 0
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him, himself, girl} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const hands = hasBothArms(eventSlave) ? "hands" : "hand";

		App.Events.drawEventArt(node, eventSlave);

		const FSArray = FutureSocieties.activeFSes(V.arcologies[0]);
		const napkin = getNapkin();
		function getNapkin() {
			switch (FSArray.random()) {
				case "FSGenderRadicalist":
					return "a lily with a prominent stamen";
				case "FSGenderFundamentalist":
					return "a beautiful, feminine lily";
				case "FSSupremacist":
					return "a proud rose";
				case "FSSubjugationist":
					return "a makeshift whip";
				case "FSYouthPreferentialist":
					return "a cute little flowerbud";
				case "FSMaturityPreferentialist":
					return "a gorgeous mature orchid";
				case "FSPaternalist":
					return "a smooth, calming design";
				case "FSDegradationist":
					return "a spiky abstract design";
				case "FSTransformationFetishist":
					return "a big pair of fake lips";
				case "FSBodyPurist":
					return "a simple, unaltered flower";
				case "FSPastoralist":
					return "a sheaf of corn";
				case "FSPhysicalIdealist":
					return "a dumbbell";
				case "FSHedonisticDecadence":
					return "a hamburger";
				case "FSSlimnessEnthusiast":
					return "a lithe figure";
				case "FSAssetExpansionist":
					return "a figure with exaggerated breasts and buttocks";
				case "FSRepopulationFocus":
					return "a lotus flower";
				case "FSRestart":
					return "a makeshift chastity belt";
				case "FSIntellectualDependency":
					if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -50) {
						return "a jasmine flower";
					} else {
						return "a dick";
					}
				case "FSSlaveProfessionalism":
					return "an iris";
				case "FSPetiteAdmiration":
					return "a cute little buttercup";
				case "FSStatuesqueGlorification":
					return "a large sunflower";
				case "FSChattelReligionist":
					return "a piece of religious iconography";
				case "FSNull":
					return "a daffodil";
				case "FSRomanRevivalist":
					return "a laurel wreath";
				case "FSNeoImperialist":
					return "an elegant coat of arms from another noble family";
				case "FSAztecRevivalist":
					return "a small statuette";
				case "FSEgyptianRevivalist":
					return "a perfect pyramid";
				case "FSEdoRevivalist":
					return "a Shinto arch";
				case "FSArabianRevivalist":
					return "a complex minaret";
				case "FSChineseRevivalist":
					return "an imperial pagoda";
				case "FSAntebellumRevivalist":
					return "a fleur-de-lis";
				default:
					return "a beautiful flower";
			}
		}

		let r = [];
		r.push(`You're working at your desk when`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`walks by your office. ${He} checks to see whether you're in while trying very hard to look like ${he}'s minding ${his} own business, and turns to go once ${he}`);
		if (canSee(eventSlave)) {
			r.push(`sees`);
		} else if (canHear(eventSlave)) {
			r.push(`hears`);
		} else {
			r.push(`assumes`);
		}
		r.push(`that you're present. You`);
		if (canSee(eventSlave)) {
			r.push(`crook a finger at ${him}.`);
		} else if (canHear(eventSlave)) {
			r.push(`clear your throat at ${him}, signaling you want ${him} before you.`);
		} else {
			r.push(`remotely and quickly close the door behind ${him}.`);
		}
		r.push(`${He}'s a good ${girl} and not likely to be plotting anything nefarious, but letting nonsense like that slide would be stupid. ${He} hurries in, blushing furiously, with ${his} ${hands} behind ${his} back. Deciding to deal with the obvious thing first, you ask ${him} what ${he}'s got. ${He} blushes even harder, and brings ${his} ${hands} around to reveal one of the large cloth napkins used for entertaining, carefully folded into the shape of ${napkin}. It's very well done.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(Spoken(eventSlave, `"I'm sorry, ${Master},"`), `${he} mumbles,`);
		if (canSee(eventSlave)) {
			r.push(`glancing down at ${his} feet.`);
		} else {
			r.push(`${his} head facing down at ${his} feet.`);
		}
		r.push(Spoken(eventSlave, `"One of the other girls ${canSee(eventSlave) ? "showed" : "taught"} us how to fold stuff when we were resting together. I wanted to make something for you, and this was the first thing that was good enough. I was just going to slip it onto your desk. I — I feel kind of stupid, now."`));

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`That's nice`, nice),
			new App.Events.Result(`These slaves clearly have too much time on their hands`, time),
			(eventSlave.fetishKnown === 1 && eventSlave.fetish !== Fetish.NONE)
				? new App.Events.Result(`Give ${him} something in return`, give, ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) ? `This option may take ${his} virginity` : null))
				: new App.Events.Result(),
			new App.Events.Result(`${He}'s already gift enough`, enough),
			// @ts-ignore
			(typeof eventSlave.napkin === "undefined")
				? new App.Events.Result(`Place it in your display case`, addTrinketLocal)
				: new App.Events.Result()
		]);

		function nice(){
			return `It's not just a feeling. However, slapping slaves for idiotic devotion isn't wise, since the idiotic part of idiotic devotion is less important than the devotion part. You thank ${him} kindly, tell ${him} to put ${his} offering on your desk, and go back to your work. ${He} flees, feeling relieved but foolish. When ${he}'s gone, you direct another slave to return the napkin to its proper place.`;
		}

		function time(){
			r = [];
			r.push(`You thank ${him} kindly, tell ${him} to put ${his} offering on your desk, and go back to your work. ${He} flees, and once ${he}'s gone, you`);
			if (S.HeadGirl) {
				r.push(`have ${V.assistant.name} pass a note to your Head Girl instructing ${getPronouns(S.HeadGirl).him}`);
			} else {
				r.push(`instruct ${V.assistant.name}`);
			}
			r.push(`to tighten up your slaves' schedules, since you feel that they have too much time on their hands. Then you direct another slave to return the napkin to its proper place. Your slaves find their spare moments occupied by household minutiae during the coming week, <span class="cash inc">saving you some money</span> on penthouse and slave upkeep.`);
			cashX(2000, "event", eventSlave);
			return r;
		}

		function give(){
			const {girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');

			r = [];
			r.push(`You thank ${him}, and tell ${him} you're considering what to give ${him} in return. ${He} looks flirty, and says,`);
			switch (eventSlave.fetish) {
				case "submissive":
					if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
						r.push(Spoken(eventSlave, `"Please, would you hold me down and fuck me, ${Master}?"`));
						r.push(`${He} drapes ${himself} submissively`);
						if (eventSlave.belly >= 300000) {
							r.push(`over ${his} ${belly} middle,`);
						} else {
							r.push(`over the couch,`);
						}
						r.push(`lest you misunderstand. You could hold ${him} down and fuck ${him}, and you do.`);
						if (canDoAnal(eventSlave)) {
							r.push(VCheck.Anal(eventSlave, 1));
						} else {
							r.push(VCheck.Vaginal(eventSlave, 1));
						}
					} else {
						r.push(Spoken(eventSlave, `"Please, would you hold me down and ${V.PC.dick !== 0 ? "fuck my throat" : "grind against my face"}, ${Master}?"`));
						r.push(`${He} drapes ${himself} submissively`);
						if (eventSlave.belly >= 300000) {
							r.push(`over ${his} ${belly} middle,`);
						} else {
							r.push(`over the couch,`);
						}
						r.push(`lest you misunderstand. You could hold ${him} down and`);
						if (V.PC.dick !== 0) {
							r.push(`facefuck ${him},`);
						} else {
							r.push(`make ${him} eat you out,`);
						}
						r.push(`and you do.`);
						seX(eventSlave, "oral", V.PC, "penetrative");
					}
					break;
				case "cumslut":
					r.push(Spoken(eventSlave, `"Please, may I`));
					if (V.PC.dick !== 0) {
						r.push(`give you a blowjob`);
						if (V.PC.vagina !== -1) {
							r.push(`and`);
						}
					}
					if (V.PC.vagina !== -1) {
						r.push(`eat you out`);
					}
					r.push(r.pop() + `, ${Master}?" ${He}`);
					if (eventSlave.belly >= 300000) {
						r.push(`leans onto ${his} ${belly} middle`);
					} else if (eventSlave.belly >= 10000) {
						r.push(`gently lowers ${his}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`pregnant`);
						} else {
							r.push(`heavy`);
						}
						r.push(`body to its knees`);
					} else {
						r.push(`gets down on ${his} knees`);
					}
					r.push(`and licks ${his} lips, lest you misunderstand. You could let ${him}`);
					if (V.PC.dick !== 0) {
						r.push(`give you a blowjob`);
						if (V.PC.vagina !== -1) {
							r.push(`and`);
						}
					}
					if (V.PC.vagina !== -1) {
						r.push(`eat you out`);
					}
					r.push(r.pop() + ",");
					r.push(`and you do.`);
					seX(eventSlave, "oral", V.PC, "penetrative");
					break;
				case "humiliation":
					if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
						r.push(Spoken(eventSlave, `"Please, would you fuck me in public, ${Master}?"`));
						r.push(`${He} edges towards the door, lest you misunderstand. You could fuck ${him} in public, and you do.`);
						if (canDoAnal(eventSlave)) {
							r.push(VCheck.Anal(eventSlave, 1));
						} else {
							r.push(VCheck.Vaginal(eventSlave, 1));
						}
					} else {
						r.push(Spoken(eventSlave, `"Please, may I`));
						if (V.PC.dick !== 0) {
							r.push(`give you a blowjob`);
							if (V.PC.vagina !== -1) {
								r.push(`and`);
							}
						}
						if (V.PC.vagina !== -1) {
							r.push(`eat you out`);
						}
						r.push(Spoken(eventSlave, `in public, ${Master}?"`));
						r.push(`${He} edges towards the door, lest you misunderstand. You could`);
						if (V.PC.dick !== 0) {
							r.push(`give you a blowjob`);
							if (V.PC.vagina !== -1) {
								r.push(`and`);
							}
						}
						if (V.PC.vagina !== -1) {
							r.push(`eat you out`);
						}
						r.push(`in public, and you do.`);
						seX(eventSlave, "oral", V.PC, "penetrative");
					}
					break;
				case "buttslut":
					if (canDoAnal(eventSlave)) {
						r.push(Spoken(eventSlave, `"Please, would you fuck my butt, ${Master}?"`));
						r.push(`${He} turns halfway and shakes ${his} rear enticingly, lest you misunderstand. You could fuck ${his} butt, and you do.`);
						r.push(VCheck.Anal(eventSlave, 1));
					} else {
						r.push(Spoken(eventSlave, `"Please, would you play with my butt, ${Master}?"`));
						r.push(`${He} turns halfway and shakes ${his} rear enticingly, lest you misunderstand. You could play with ${his} butt, and you do, managing intercourse several ways without penetrating ${him}.`);
					}
					break;
				case "boobs":
					r.push(Spoken(eventSlave, `"Please, would you play with my boobs, ${Master}?"`));
					r.push(`${He} sticks out ${his} chest and bounces ${his} breasts for you, lest you misunderstand. You could play with ${his} boobs, and you do, managing mammary intercourse several ways.`);
					seX(eventSlave, "mammary", V.PC, "penetrative", 3);
					break;
				case "pregnancy":
					if ((eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave) && V.PC.vagina !== -1) {
						if (canGetPregnant(V.PC)) {
							r.push(Spoken(eventSlave, `"Please, can I try to get you pregnant, ${Master}?"`));
							r.push(`${His} eyes are glued to your middle. You could let ${him}`);
							if (V.PC.vagina === 0) {
								r.push(`<span class="virginity loss">pierce your maidenhead</span> and`);
								V.PC.vagina++;
							}
							r.push(`seed you, and you do, enjoying the feeling of ${his} hot cum jetting into your fertile pussy.`);
							if (canImpreg(V.PC, eventSlave)) {
								r.push(knockMeUp(V.PC, 20, 0, eventSlave.ID));
							}
						} else if (V.PC.belly >= 1500) {
							r.push(Spoken(eventSlave, `"Please, could I play with your pregnancy while I fuck you, ${Master}?"`));
							r.push(`{His} eyes are glued to your gravid middle. You could let ${him}`);
							if (V.PC.vagina === 0) {
								r.push(`<span class="virginity loss">pierce your maidenhead</span> and`);
								V.PC.vagina++;
							}
							r.push(`play with your pregnancy, and you do, enjoying ${his} fondling as ${he} fucks your pussy.`);
						} else {
							r.push(Spoken(eventSlave, `"Please, would you pretend to be pregnant with my baby, ${Master}?"`));
							r.push(`${His} eyes are glued to your middle. You could play pretend with ${him}, and you do,`);
							if (isItemAccessible.entry("a small empathy belly", "bellyAccessory")) {
								r.push(`strapping an empathy belly on yourself before bending over`);
							} else {
								r.push(`tossing on a camisole and sticking a pillow under it before bending over`);
							}
							if (V.PC.vagina === 0) {
								r.push(`and <span class="virginity loss">gifting ${him} your maidenhead.</span>`);
								V.PC.vagina++;
							} else {
								r.push(`for ${him}.`);
							}
						}
						seX(eventSlave, "penetrative", V.PC, "vaginal");
					} else {
						if (canDoVaginal(eventSlave) || canDoAnal(eventSlave)) {
							r.push(Spoken(eventSlave, `"Please, would you ${V.PC.dick !== 0? `fill me with your seed` : `fuck me`}, ${Master}?"`));
							r.push(`${He} reclines on the couch and offers ${himself} to you, lest you misunderstand. You could`);
							if (V.PC.dick !== 0) {
								r.push(`fill ${him} with your seed,`);
							} else {
								r.push(`fuck ${him},`);
							}
							r.push(`and you do.`);
							if (canDoVaginal(eventSlave)) {
								r.push(VCheck.Vaginal(eventSlave, 1));
							} else {
								r.push(VCheck.Anal(eventSlave, 1));
							}
						} else if (eventSlave.pregKnown === 1) {
							r.push(Spoken(eventSlave, `"Please, would you play with my pregnancy, ${Master}?"`));
							r.push(`${He} pokes out ${his} belly and sways it enticingly, lest you misunderstand. You could play with ${his} pregnancy, and you do, managing to get off several ways.`);
						} else {
							r.push(Spoken(eventSlave, `"Please, would you pretend that I'm pregnant with your baby, ${Master}?"`));
							r.push(`${He} pokes out ${his} belly and sways it enticingly, lest you misunderstand. You could play pretend with ${him}, and you do,`);
							if (isItemAccessible.entry("a small empathy belly", "bellyAccessory")) {
								r.push(`strapping an empathy belly on ${him} before feeling ${him} up.`);
							} else {
								r.push(`tossing ${him} a camisole and a pillow before feeling ${him} up.`);
							}
						}
					}
					break;
				case "dom":
					if ((eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave)) {
						r.push(Spoken(eventSlave, `"Please, could I bang you, ${Master}?"`));
						r.push(`${He} bounces on ${his} heels, rock-hard and biting ${his} lip with anticipation. You could let ${him}`);
						if (V.PC.vagina === 0) {
							r.push(`<span class="virginity loss">pop your cherry</span> and`);
							V.PC.vagina++;
						} else if (V.PC.vagina < 0 && V.PC.anus === 0) {
							r.push(`<span class="virginity loss">break into your virgin rear</span> and`);
							V.PC.anus++;
						}
						r.push(`fuck your brains out, and you do, enjoying playing the sub for once.`);
						seX(eventSlave, "penetrative", V.PC, V.PC.vagina === -1 ? "anal" : "vaginal");
						if (V.PC.vagina !== -1) {
							if (canImpreg(V.PC, eventSlave)) {
								r.push(knockMeUp(V.PC, 20, 0, eventSlave.ID));
							}
							seX(eventSlave, "penetrative", V.PC, "vaginal");
						} else {
							if (canImpreg(V.PC, eventSlave)) {
								r.push(knockMeUp(V.PC, 20, 1, eventSlave.ID));
							}
							seX(eventSlave, "penetrative", V.PC, "anal");
						}
					} else {
						r.push(Spoken(eventSlave, `"Please, would you fuck my brains out, ${Master}?"`));
						r.push(`${He} bounces on ${his} heels, biting ${his} lip with anticipation. You could fuck ${his} brains out, and you do, enjoying the dominant slave's constant sexual one-upmanship.`);
						if (canDoVaginal(eventSlave)) {
							r.push(VCheck.Vaginal(eventSlave, 1));
						} else if (canDoAnal(eventSlave)) {
							r.push(VCheck.Anal(eventSlave, 1));
						} else {
							seX(eventSlave, "oral", V.PC, "penetrative");
						}
					}
					break;
				case "sadist":
					if ((eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave)) {
						r.push(Spoken(eventSlave, `"Please, can I pretend to rape you, ${Master}?"`));
						r.push(`${His} eyes are wild. You could let ${him}`);
						if (V.PC.vagina === 0) {
							r.push(`<span class="virginity loss">tear your hymen</span> and`);
							V.PC.vagina++;
						} else if (V.PC.vagina < 0 && V.PC.anus === 0) {
							r.push(`<span class="virginity loss">burst your virgin sphincter</span> and`);
							V.PC.anus++;
						}
						r.push(`rape you, and you do, pretending to go about your day until ${he} shoves you onto the couch and roughly fucks your`);
						if (V.PC.vagina !== -1) {
							r.push(`pussy.`);
							if (canImpreg(V.PC, eventSlave)) {
								r.push(knockMeUp(V.PC, 20, 0, eventSlave.ID));
							}
							seX(eventSlave, "penetrative", V.PC, "vaginal");
						} else {
							r.push(`ass.`);
							if (canImpreg(V.PC, eventSlave)) {
								r.push(knockMeUp(V.PC, 20, 1, eventSlave.ID));
							}
							seX(eventSlave, "penetrative", V.PC, "anal");
						}
					} else {
						r.push(Spoken(eventSlave, `"Please, would you let me rape someone, ${Master}?"`));
						r.push(`${His} eyes are wild. You could let ${him} rape someone, and you do, bringing in an appropriate slave and letting ${him} have ${his} way with the poor ${girlU}.`);
					}
					break;
				case "masochist":
					if ((eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave)) {
						r.push(Spoken(eventSlave, `"Please, would you rape me, ${Master}?"`));
						r.push(`${His} eyes are hungry. You could rape ${him}, and you do, throwing ${him} across the`);
						if (V.PC.vagina === 0) {
							r.push(`couch, <span class="virginity loss">piercing your maidenhead</span> with ${his} stiff dick`);
							V.PC.vagina++;
						} else if (V.PC.vagina < 0 && V.PC.anus === 0) {
							r.push(`couch, taking ${his} dick inside <span class="virginity loss">your virgin rear</span>`);
							V.PC.anus++;
						} else {
							r.push(`couch`);
						}
						r.push(`and riding ${him} through so many orgasms that ${he} begs for mercy.`);
						seX(eventSlave, "penetrative", V.PC, V.PC.vagina === -1 ? "anal" : "vaginal");
						if (canImpreg(V.PC, eventSlave)) {
							r.push(knockMeUp(V.PC, 20, 2, eventSlave.ID));
						}
					} else {
						r.push(Spoken(eventSlave, `"Please, would you rape me, ${Master}?"`));
						r.push(`${His} eyes are hungry. You could rape ${him}, and you do, throwing ${him} across the couch and fucking ${him} so hard ${he} begs for mercy as ${he} orgasms.`);
						if (canDoVaginal(eventSlave)) {
							r.push(VCheck.Vaginal(eventSlave, 1));
						} else if (canDoAnal(eventSlave)) {
							r.push(VCheck.Anal(eventSlave, 1));
						} else {
							seX(eventSlave, "oral", V.PC, "penetrative");
						}
					}
					break;
				default:
					r.push(Spoken(eventSlave, `"I forgot what my fetish is, but I think it is ${eventSlave.fetish}."`));
					throw Error (`<span class="red">Error: rents is outside accepted range, please report this issue.</span>`);
			}
			if (eventSlave.fetishStrength > 95) {
				r.push(`This is very close to ${his} dream of the ideal sexual encounter, and getting rewarded for such devoted behavior with pleasure on such a level encourages ${him} to <span class="trust inc">trust you.</span>`);
				eventSlave.trust += 5;
			} else {
				r.push(`It isn't exactly an old world romance, but sharing this with you <span class="fetish inc">advances ${his} fetish.</span> In the Free Cities, it will do for romance.`);
				eventSlave.fetishStrength += 4;
			}
			r.push(`When ${he}'s gone, you direct another slave to return the napkin to its proper place.`);
			return r;
		}

		function enough(){
			r = [];
			r.push(`You smile gently at ${him} and tell ${him} to put ${his} gift down on your desk. ${He} does, looking doubtful, but then you thank ${him}, going on to say that it was very nice of ${him} to have the thought, but ${he}'s already gift enough. ${He} looks momentarily confused, but you continue, describing ${his} body in rhapsodic terms, lingering on ${his}`);
			if (eventSlave.boobs > 5000) {
				r.push(`gargantuan tits`);
			} else if (eventSlave.butt > 5) {
				r.push(`massive ass`);
			} else if (eventSlave.face > 40) {
				r.push(`model's face`);
			} else if (eventSlave.bellyPreg > 1500) {
				r.push(`rounded pregnancy`);
			} else if (eventSlave.belly > 1500) {
				r.push(`${belly} belly`);
			} else if (eventSlave.muscles > 30) {
				r.push(`ripped abs`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush belly`);
			} else {
				r.push(`nice butt`);
			}
			r.push(`and`);
			if (eventSlave.boobs < 500) {
				r.push(`cute chest.`);
			} else if (eventSlave.butt < 3) {
				r.push(`cute rear.`);
			} else if (eventSlave.anus > 1) {
				r.push(`wonderful butthole.`);
			} else if (eventSlave.clit > 1) {
				r.push(`cute clit.`);
			} else if (eventSlave.waist < -10) {
				r.push(`wasp waist.`);
			} else if (eventSlave.nipples === "fuckable") {
				r.push(`fuckable chest.`);
			} else {
				r.push(`nice nipples.`);
			}
			r.push(`${He} blushes more and more furiously as you continue, alternately`);
			if (canSee(eventSlave)) {
				r.push(`glancing back down at ${his} feet and stealing looks at you, <span class="devotion inc">adoration</span> in ${his} eyes.`);
			} else {
				r.push(`facing ${his} feet and facing you, <span class="devotion inc">adoration</span> on ${his} face.`);
			}
			r.push(`When ${he}'s gone, you direct another slave to return the napkin to its proper place.`);
			eventSlave.devotion += 4;
			return r;
		}

		function addTrinketLocal(){
			eventSlave.devotion += 4;
			// @ts-ignore
			eventSlave.napkin = 1;
			addTrinket(`a cloth napkin`, {name: eventSlave.slaveName, id: eventSlave.ID, napkinShape: napkin});
			return `You thank ${him} kindly, and hold out your hand. ${He} places ${his} creation in your hands with something like reverence. You enter a secure command on your desk, and the display case behind you slides open. You place the folded napkin in its own little place within. ${eventSlave.slaveName} watches incredulously, unable to believe what you're doing. When ${he} finally processes it, ${he} bursts into inelegant tears. Cuffing them away from ${his} eyes and sniffling, ${he} tells you <span class="devotion inc">${he} loves you.</span>`;
		}
	}
};
