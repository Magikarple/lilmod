App.Events.MurderAttempt = class MurderAttempt extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.plot === 1,
			() => App.Events.effectiveWeek() >= V.murderAttemptWeek
		];
	}

	execute(node) {
		// setup next time, 2-4 months
		V.murderAttemptWeek = V.week + 26 + Math.floor(Math.random() * 26);
		// disable Continue
		V.nextButton = " ";
		const perceptiveCareers = ["escort", "gang", "hoodlum", "mercenary", "prostitute", "street urchin"];
		// event unique
		const variation = jsEither(["trade", "slave", "drug", "military"]);
		let isSincere = Math.random() > 0.6;
		// actual deals can only trigger once
		if (isSincere) {
			switch (variation) {
				case "trade":
					isSincere = V.illegalDeals.trade === 0;
					break;
				case "slave":
					isSincere = V.illegalDeals.slave === 0;
					break;
				case "drug":
					isSincere = V.illegalDeals.menialDrug === 0;
					break;
				case "military":
					isSincere = V.illegalDeals.military === 0;
					break;
			}
		}
		const companyName = ["RealTec", "Horizons Unlimited", "Dix Trade", "TA Technology"].random() + ["", " Inc."].random();
		const {he, He, his, him, woman, himself} = getPronouns((FutureSocieties.isActive('FSGenderFundamentalist') || V.seeDicks > random(0, 99))
			? {pronoun: App.Data.Pronouns.Kind.male} : {pronoun: App.Data.Pronouns.Kind.female});
		const {womanPC} = getPronouns(V.PC).appendSuffix("PC");

		intro(node);

		function perceptionChance() {
			return (perceptiveCareers.includes(V.PC.career) || V.PC.skill.warfare >= 60 || V.PC.skill.slaving >= 60 || V.PC.skill.medicine >= 60);
		}

		function intro(fragment) {
			const r = [];
			r.push(`As per routine, you are sifting through the messages ${V.assistant.name} has flagged as relevant from the mass that fills your inbox each day.`);
			r.push(`One is a request from a company called ${companyName} for a personal meeting to propose some kind of`);
			switch (variation) {
				case "trade":
					r.push("business venture.");
					break;
				case "slave":
					r.push("unique slave trade.");
					break;
				case "drug":
					r.push("deal for a new drug.");
					break;
				case "military":
					r.push("military endeavor.");
					break;
			}
			r.push("Despite being incredibly vague about the details of said business opportunity, they have references from multiple reputable businesses in the");
			switch (variation) {
				case "trade":
					r.push("trading");
					break;
				case "slave":
					r.push("arcology");
					break;
				case "drug":
					r.push("medical");
					break;
				case "military":
					r.push("military");
					break;
			}
			r.push("and slavery sectors. Some of them are known for dealing in less than legal business regularly, so the lack of information may just be either an attempt to distance themselves from seedy dealings or something truly lucrative, if slightly dirty.");
			App.Events.addParagraph(fragment, r);

			let yesText;
			let noText;
			switch (variation) {
				case "trade":
					yesText = "New business is always good";
					noText = "profitable business venture";
					break;
				case "slave":
					yesText = "Unique slaves are always interesting";
					noText = "special slave";
					break;
				case "drug":
					yesText = "Special drugs unavailable to the public are always interesting";
					noText = "new drug";
					break;
				case "military":
					yesText = "A profitable use for your mercenary troops is always good";
					noText = "profitable military venture";
					break;
			}
			App.Events.addResponses(fragment, [
				new App.Events.Result(`${yesText}; invite them to a private meeting`, invite),
				new App.Events.Result(`You are not going to waste your time on something as vague as a "${noText}"`, endEvent)
			]);
		}

		function invite() {
			const fragment = document.createDocumentFragment();

			let r = [];
			r.push(`${capFirstChar(V.assistant.name)} schedules a meeting a few days later to take place in your personal office, an oddity given these meetings are usually conducted in a more neutral, albeit less secure location, but ${companyName} insisted on it.`);
			if (["capitalist", "engineer", "escort", "mercenary", "recruit", "slave overseer", "slaver"].includes(V.PC.career)) {
				r.push("You should prepare for anything; it's better to be prepared in case something goes awry.");
			} else {
				r.push("You can't really complain; it's easier for you and cheaper should nothing come of it.");
			}
			App.Events.addParagraph(fragment, r);

			r = [];
			r.push(`When it comes time for the meeting, a ${woman} arrives at the entryway of the penthouse and is escorted to your office by one of your slaves as you watch ${him} on your monitor. The ${woman} is distinctively average looking, as if you took all business men that did their job well, but did not overachieve, and created the perfect average of it. Someone trying this hard to appear average is certainly anything but average.`);
			App.Events.addParagraph(fragment, r);

			// determines type of deal
			r = [];
			r.push(`Once ${he} reaches your office, you settle down after a short greeting for ${him} to begin`);
			switch (variation) {
				case "trade":
				case "military":
					r.push("showing you the plans they have.");
					break;
				case "slave":
					r.push("explaining the uniqueness of their slaves.");
					break;
				case "drug":
					r.push("showing you the effects of their new drug.");
					break;
			}

			// Determines if the guard will stay in room
			if (S.Bodyguard) {
				const {HeBG} = getPronouns(S.Bodyguard).appendSuffix("BG");
				r.push(`Before getting anywhere though, ${he} interrupts ${himself}, gesturing at your bodyguard.`);
				r.push(`"I'm sorry, this is meant only for your ears, can you please send your bodyguard outside?"`);
				App.Events.addParagraph(fragment, r);

				App.Events.addResponses(fragment, [
					new App.Events.Result(`Order ${him} to leave for making such a request`, sentOutRoute),
					new App.Events.Result(`${S.Bodyguard.slaveName} goes everywhere and does everything with you. ${HeBG} stays`, bgStaysRoute),
					new App.Events.Result(`This better be worth it. Order ${S.Bodyguard.slaveName} to leave`, bgLeavesRoute)
				]);
			} else {
				noSlaveRoute(fragment, r, false);
			}

			return fragment;
		}

		function LocalGameOverCall(fragment, paragraphStart) {
			App.Events.addParagraph(fragment, paragraphStart);
			App.Events.LocalGameOver(fragment);
		}

		/**
		 * @param {DocumentFragment} fragment
		 * @param {Array<string>} paragraphStart
		 * @param {boolean} slaveLeft only relevant for murder attempt
		 */
		function noSlaveRoute(fragment, paragraphStart, slaveLeft) {
			if (isSincere) {
				sincereProposal(fragment, paragraphStart);
			} else {
				notSincere(fragment, paragraphStart, slaveLeft);
			}
		}

		//  They were not sincere and try to kill the player
		function notSincere(fragment, paragraphStart, slaveLeft){
			paragraphStart.push(`For the next few hours ${he} talks in circles, making grand gestures here and there but not really saying anything of substance to the point it starts to bore you.`);
			if (perceptionChance()) {
				paragraphStart.push(`That is, up until one of ${his} wide motions drops something in your drink. When you confront ${him} about it, ${he} draws a weapon and shoots you before you have a chance to react.`);
				if (V.PC.physicalImpairment > 1) { // If you're this fucked, you're already dead.
					paragraphStart.push(`Your death was instant; your body eager to finally give in.`);
				} else if (V.PC.career === "gang") {
					paragraphStart.push(`You have the last laugh, though, as you draw your own weapon and gun ${him} down.`);
				} else if (slaveLeft) { // BG must be able to walk, so we should assume that if this is true, she is actually lurking
					paragraphStart.push(`While ${S.Bodyguard.slaveName} may storm in and cut ${him} down, it will not bring you back to life.`);
				} else {
					paragraphStart.push(`Before ${he} can leave the building, your security detains ${him}, but this won't help a dead ${womanPC}.`);
				}
				desperateLastSurvivalAttempt(fragment, paragraphStart);
			} else {
				poisoned(fragment, paragraphStart);
			}
		}

		/**
		 * This is the PC's last attempt at surviving the violent non posioning assassination attempt.
		 * @param {DocumentFragment} fragment
		 * @param {Array<string>} paragraphStart
		 */
		function desperateLastSurvivalAttempt(fragment, paragraphStart){
			// Determines if assassin kills PC or not. Added it as value because its used in the check and if the pc survives, is deducted from health.
			const assassindamage = random(40, 50);

			if (V.PC.physicalImpairment > 1) {
				LocalGameOverCall(fragment, paragraphStart);
			} else if (random(-20, 0) + V.PC.skill.medicine >= 80) { // Medical skill will allow you to stabilize yourself.
				App.Events.addParagraph(fragment, paragraphStart);
				paragraphStart = [];
				if (healthCheck(V.PC) > -(assassindamage / 2)) {
					paragraphStart.push(`No! You're not going out like this! You summon the last of your strength to put your medical knowledge to the test and manage to stop the bleeding before you black out.`);
					App.Events.addParagraph(fragment, paragraphStart);
					pcSurvivesAssassinationAttempt(fragment, assassindamage);
				} else {
					paragraphStart.push(`No! You're not going out like this! You summon the last of your strength and put your medical knowledge to the test, but the bleeding just won't stop. If you were in better health, maybe it would have made a difference, but that doesn't matter any more. All you can do is let death take you into its cold embrace.`);
					LocalGameOverCall(fragment, paragraphStart);
				}
			} else if (S.Bodyguard) { // A BG with medical knowledge or smart enough to comprehend yours can also save you.
				const {HeBG, heBG, hisBG, himBG} = getPronouns(S.Bodyguard).appendSuffix("BG");
				const {title: Master} = getEnunciation(S.Bodyguard);
				if (S.Bodyguard.skill.nurse >= 150 || App.Data.Careers.Leader.nurse.includes(S.Bodyguard.career) || S.Bodyguard.intelligence + S.Bodyguard.intelligenceImplant >= 95) {
					App.Events.addParagraph(fragment, paragraphStart);
					paragraphStart = [];
					if (canTalk(S.Bodyguard)) {
						paragraphStart.push(`${Spoken(S.Bodyguard, `"No! ${Master}! Hold on! I know how to fix this!"`)} ${S.Bodyguard.slaveName}`);
					} else {
						paragraphStart.push(`${S.Bodyguard.slaveName} is quick to act; ${heBG}`);
					}
					if (App.Data.Careers.Leader.nurse.includes(S.Bodyguard.career)) {
						paragraphStart.push(`is a trained medical professional and manages`);
					} else if (S.Bodyguard.skill.nurse >= 150) {
						paragraphStart.push(`uses the skills ${heBG} picked up as a Nurse`);
					} else {
						paragraphStart.push(`puts ${hisBG} brilliant mind to work and manages`);
					}
					if (healthCheck(V.PC) > -(assassindamage / 2)) {
						paragraphStart.push(`to stop the bleeding before it's too late. The last thing you see before you black out is ${hisBG} smiling face.`);
						App.Events.addParagraph(fragment, paragraphStart);
						pcSurvivesAssassinationAttempt(fragment, assassindamage);
					} else {
						paragraphStart.push(`to stop the bleeding, but it's too late for you. You were just too worn down to put up the fight needed to survive and you pass on as ${heBG} desperately tries to resuscitate you.`);
						LocalGameOverCall(fragment, paragraphStart);
					}
				} else if (V.PC.skill.medicine >= 60 && (S.Bodyguard.skill.nurse >= 50 || S.Bodyguard.intelligence + S.Bodyguard.intelligenceImplant >= 15)) {
					App.Events.addParagraph(fragment, paragraphStart);
					paragraphStart = [];
					paragraphStart.push(`No! You're not going out like this! You summon the last of your strength to instruct ${S.Bodyguard.slaveName} how to stop the bleeding.`);
					if (healthCheck(V.PC) > -(assassindamage / 2)) {
						paragraphStart.push(`${HeBG} understands the procedure and manages to stabilize you before you black out.`);
						App.Events.addParagraph(fragment, paragraphStart);
						pcSurvivesAssassinationAttempt(fragment, assassindamage);
					} else {
						paragraphStart.push(`${HeBG} understands the procedure, but your poor health and fading consciousness lead to complications that ${heBG} just can't handle. You pass on as ${heBG} begins to panic and breakdown over ${hisBG} failure.`);
						LocalGameOverCall(fragment, paragraphStart);
					}
				} else if (V.PC.skill.medicine >= 60 && canTalk(V.PC)) {
					paragraphStart.push(`You use the last of your strength to call out to ${S.Bodyguard.slaveName}, telling ${himBG} how to stabilize you.`);
					if (canHear(S.Bodyguard)) {
						paragraphStart.push(`You have no way of knowing what ${heBG} ended up doing, but it certainly didn't help you.`);
					} else {
						paragraphStart.push(`It did little good, seeing as it fell on deaf ears.`);
					}
					LocalGameOverCall(fragment, paragraphStart);
				} else {
					paragraphStart.push(`${S.Bodyguard.slaveName} is forced to watch you bleed out, incapable of doing anything to save you. The last sound you hear is the discharge of ${hisBG} weapon.`);
					LocalGameOverCall(fragment, paragraphStart);
				}
			} else {
				paragraphStart.push(`You weakly try to stop the bleeding, but as your strength fades, you realize there's no hope. All you can do is let death take you into its cold embrace.`);
				LocalGameOverCall(fragment, paragraphStart);
			}
		}

		/**
		 * If the PC had high enough health to survive assassindamage and didn't bleed out.
		 * @param {DocumentFragment} fragment
		 * @param {number} assassindamage
		 */
		function pcSurvivesAssassinationAttempt(fragment, assassindamage){
			App.Events.addParagraph(fragment, [`Your efforts bought you enough time to make it to the hospital. You survived with your life, but still suffered <span class="health dec">grave wounds.</span> You will need to <span class="health dec">recover for a while</span> before you can return to your normal duties. Word is that your attempted assassin took ${his} life after being apprehended. Seems like whomever sent ${him} cares a lot about not being tracked down. And indeed, all the already sparse information about ${companyName} is gone and any leads you may have had are useless. You task ${V.assistant.name} to continue searching for the one behind this, but you don't expect anything to come out of it. Someone wanting you dead isn't all that surprising, and without any idea as to why, there are thousands of small groups and individuals who want arcology owners, owners like you, or maybe just you personally, dead.`]);
			healthDamage(V.PC, assassindamage);
			V.PC.majorInjury += random(3, 6);
			V.PC.physicalImpairment++;
			V.PC.health.longTermDamage += 100;
			continueButton(fragment);
		}

		function sentOutRoute() {
			const fragment = document.createDocumentFragment();
			const r = [`Grumbling under ${his} breath ${he} quickly leaves.`];
			App.Events.addParagraph(fragment, r);
			continueButton(fragment);
			return fragment;
		}

		function bgStaysRoute() {
			const fragment = document.createDocumentFragment();

			if (isSincere) {
				let r = [];
				r.push(`"Very good," ${he} smiles, seeing your confused look, "We are not interested in dealing with someone who isn't in control of their own affairs." Seems like you just passed some sort of test.`);
				App.Events.addParagraph(fragment, r);
				r = [];
				r.push(`Satisfied, ${he} begins explaining:`);
				sincereProposal(fragment, r);
			} else {
				let r = [];
				r.push(`"If you say so..." ${He} continues and starts ${his} explanation anew, sometimes with great gestures, but never actually getting to the point. You start to grow bored of ${his} drivel`);
				if (S.Bodyguard.intelligence + S.Bodyguard.intelligenceImplant + (S.Bodyguard.skill.combat/2) > 60) {
					r.push(`until ${he} does one of ${his} grand motions again and ${S.Bodyguard.slaveName} jumps forward,`);
					if (perceptionChance()) {
						r.push("just a moment faster than you,");
					}
					if (canTalk(S.Bodyguard)) {
						r.push(`demanding to know what ${he} just put in your drink.`);
					} else {
						r.push(`snatching the glass and taking an aggressive stance.`);
					}
					bgDefense(fragment, r);
				} else if (perceptionChance()) {
					r.push(`until, on of ${his} grand motions, you notice ${he} slips something in your drink and you confront ${him} about what ${he} just did.`);
					bgDefense(fragment, r);
				} else {
					r.push(r.pop() + ".");
					poisoned(fragment, r);
				}
			}
			return fragment;
		}

		function bgDefense(fragment, paragraphStart) {
			paragraphStart.push(`Before you can react, the ${woman} draws a weapon and`);
			const {HeBG, heBG, hisBG, himBG} = getPronouns(S.Bodyguard).appendSuffix("BG");
			if ((S.Bodyguard.muscles > 95 && S.Bodyguard.height < 185) || S.Bodyguard.muscles < -30 || S.Bodyguard.boobs > 4000 || S.Bodyguard.weight > 130 || S.Bodyguard.health.tired > 30 || S.Bodyguard.belly >= 100000) { // BG is too big or weak to draw fast enough to matter
				paragraphStart.push("shoots you through the heart; having a bodyguard who cannot actually defend you might have been a poor choice in retrospect.");
				paragraphStart.push(`With you dead, ${S.Bodyguard.slaveName} knows ${heBG} has to put this to rest.`);
				if (deadliness(S.Bodyguard).value > 1) {
					paragraphStart.push(`Out of ammo, your murderer moves to grab ${himBG} by the head and introduce ${hisBG} skull to the corner of your table. ${S.Bodyguard.slaveName} may have been slow on the draw, but is not incompetent. ${HeBG} subdues ${him}, pinning ${him} down until security may collect ${him}, but it's all in vain when ${he} starts convulsing and quickly perishes to the contents of a false tooth. With nothing left, ${S.Bodyguard.slaveName} readies ${hisBG} weapon, puts it under ${hisBG} chin, and pulls the trigger.`);
				} else {
					paragraphStart.push(`Alas, ${heBG} is too incompetent to even do that. By the time ${heBG} manages to get a steady grip on ${hisBG} weapon, your murderer is already introducing ${hisBG} skull to the corner of your table. Sure ${he} is detained before ${he} makes it out of the building, but does that really matter when you're dead?`);
				}
				LocalGameOverCall(fragment, paragraphStart);
			} else {
				paragraphStart.push(paragraphStart.pop() + ",");
				if (deadliness(S.Bodyguard).value > 1 || (S.Bodyguard.muscles > 95 && S.Bodyguard.height >= 185)) {
					if (deadliness(S.Bodyguard).value > 1) {
						paragraphStart.push(`just a little quicker, ${S.Bodyguard.slaveName} draws ${hisBG} own, shooting ${him} in the shoulder. Screaming in pain, ${he} drops ${his} weapon and ${S.Bodyguard.slaveName} swiftly moves to secure ${him}.`);
					} else {
						paragraphStart.push(`to your surprise and later annoyance, find ${S.Bodyguard.slaveName} has used ${hisBG} impressive strength to flip your desk at ${him}. Crushed beneath the heavy piece of furniture and writhing in pain, ${he} is in no position to take any further actions against you.`);
					}
					App.Events.addParagraph(fragment, paragraphStart);
					let r = [];
					r.push(`After the initial shock has waned and you ready to begin interrogating ${him}, ${he} clamps ${his} jaw down hard, foams for several seconds and dies. Seems like whomever sent ${him} cares a lot about not being tracked down. And indeed, all the already sparse information about ${companyName} is gone and any leads you may have had are useless. You task ${V.assistant.name} to continue searching for the one behind this, but you don't expect anything to come out of it. Someone wanting you dead isn't all that surprising, and without any idea as to why, there are thousands of small groups and individuals who want arcology owners, owners like you, or maybe just you personally, dead.`);
					App.Events.addParagraph(fragment, r);
					continueButton(fragment);
				} else {
					paragraphStart.push(`just a moment too slow, ${S.Bodyguard.slaveName} draws ${hisBG} own, shooting ${him} in the chest, but not before you already have a bullet through your heart. Seeing you fall down, ${heBG} sets ${hisBG} weapon to automatic, puts it under ${hisBG} chin, and pulls the trigger.`);
					LocalGameOverCall(fragment, paragraphStart);
				}
			}
		}

		function bgLeavesRoute() {
			const fragment = document.createDocumentFragment();
			if (isSincere) {
				let r = [];
				r.push(`After your bodyguard leaves, ${he} stares at you for a while, before stating, "I don't believe you are ready to do business with us." When questioned why, ${he} answers, "If you can't trust your bodyguard with sensitive information, you clearly have bigger problems to worry about than our small proposal." ${He} leaves your office without waiting for anyone to see ${him} off.`);
				App.Events.addParagraph(fragment, r);
				continueButton(fragment);
			} else {
				let r = [];
				r.push(`"Thank you," ${he} states, before continuing.`);
				noSlaveRoute(fragment, r, true);
			}
			return fragment;
		}

		function poisoned(fragment, paragraphStart) {
			let r = paragraphStart;
			r.push(`After a while, ${he} finishes ${his} seemingly unending pitch, begins packing up and tells you to call ${him} if you are interested. You certainly will not be; if you wanted to hear someone talk for hours without saying anything, you would tune into a political debate out of one of the nearby old world counties.`);
			App.Events.addParagraph(fragment, r);
			r = [];
			r.push("Several hours later you start to feel strange. A few minutes after that, you collapse. You are dead long before help can arrive. Later autopsy reveals your cause of death to be poisoning.");
			LocalGameOverCall(fragment, r);
		}

		function sincereProposal(fragment, paragraphStart) {
			const options = [];
			switch (variation) {
				case "trade":
					paragraphStart.push(`${companyName} is planning a trade deal with an old world corporation that wants to expand into the Free Cities, but with the added twist of effectively robbing them during this. Their problem is they need something to show them and your arcology would be ideal for this. Your role would be simple, just follow a short script before leaving both sides to negotiate. If everything goes well, your share could be in the six digit realm, but if something goes wrong, your reputation would be severely damaged.`);
					options.push(
						new App.Events.Result("A windfall like this doesn't come by every day. Of course you'll take this opportunity.", accept()),
						new App.Events.Result("The potential winnings are not worth the risk. You will not be a part of their plans.", refused)
					);
					break;
				case "slave":
					paragraphStart.push(`${companyName} is dealing in a special kind of enslavement. Rather than searching for buyers for the slaves they already have, they instead find potential buyers and acquire those they want to buy. And while there are means to order slaves with certain traits, ${companyName} enslaves the exact individuals you want through fabricated debt, kidnapping or any means necessary.`);
					if (V.cash >= 50000 && V.PC.actualAge >= 12) {
						options.push(new App.Events.Result(
							`Enslaving that annoying thorn in your side from ${V.PC.actualAge >= 18 ? "high" : "elementary"} school might be petty, but it will be worth it nonetheless.`,
							accept("school"), `Costs ${cashFormat(50000)}`));
					}
					if (V.cash >= 250000) {
						options.push(new App.Events.Result(
							"There is a rising star in the music industry that would fit perfectly in your stable.",
							accept("star"), `Costs ${cashFormat(250000)}`));
					}
					if (V.cash < 50000) {
						options.push(new App.Events.Result("You couldn't afford to enslave someone even if you wanted to.", refused));
					} else {
						options.push(new App.Events.Result(`You'll pass on the offer.`, refused));
					}
					break;
				case "drug":
					paragraphStart.push(`${companyName} has developed a new performance enhancing drug that can greatly improve one's productivity. It does however come with serious drawbacks, making it unsuitable for sex slaves, but it could immensely boost the efficiency of your menial slaves.`);
					if (V.cash >= 100000) {
						options.push(new App.Events.Result("Making more money from your menials is always good. Buy the drug.", accept(), `Costs ${cashFormat(100000)}`));
					} else {
						options.push(new App.Events.Result(null, null, "You don't have the cash required to buy the drug."));
					}
					options.push(
						new App.Events.Result("The downsides are not worth it.", refused)
					);
					break;
				case "military":
					paragraphStart.push(`${companyName} is part of an endeavor to carve out a new Free City in the old world. While being too far away to influence your local political climate, it is certainly a new milestone in their growing dominance over the old world. Your mercenaries are known to be veterans in fighting in such territory and that you supply them with state-of-the-art equipment, so it is only natural for the company to ask you to join in this operation. Shipping your mercenaries around the globe would be a big expense, but all participants who don't get a share of the colony itself will receive hefty compensation.`);
					options.push(
						new App.Events.Result("This is a worthy endeavor. Of course you will help out.", accept()),
						new App.Events.Result("Military operations tend to be a net loss most of the time. You will watch with interest, but not a vested one.", refused)
					);
					break;
			}
			App.Events.addParagraph(fragment, paragraphStart);
			App.Events.addResponses(fragment, options);
		}

		/**
		 * @param {string} [argument]
		 * @returns {function(): DocumentFragment}
		 */
		function accept(argument) {
			return function() {
				const r = [];
				switch (variation) {
					case "trade":
						r.push(`You discuss the details of the operation before ${he} leaves. You will have a guest soon.`);
						V.illegalDeals.trade = {week: V.week + 2, company: companyName};
						break;
					case "slave":
						r.push(`You tell ${him} your target and he nods. "A great idea. It should take no longer than a few weeks."`);
						V.illegalDeals.slave = {week: V.week + 1, type: argument, company: companyName};
						break;
					case "drug":
						r.push("The drug will be delivered within the week.");
						cashX(-100000, "event");
						V.illegalDeals.menialDrug = 1;
						break;
					case "military":
						r.push("You order your mercenaries to prepare and a few days later they depart, leaving enough men behind to keep your arcology secure. You'll keep in contact with the mercenary captain, but you don't expect to hear any real results in the next few months; military operations of this size simply take time.");
						V.illegalDeals.military = {week: V.week + 16, company: companyName};
						break;
				}
				const fragment = document.createDocumentFragment();
				App.Events.addParagraph(fragment, r);
				continueButton(fragment);
				return fragment;
			};
		}

		function refused() {
			// TODO: flavor text
			return endEvent();
		}

		/* End event functions */

		function endEvent() {
			Engine.play(V.nextLink);
			return [];
		}

		function continueButton(fragment) {
			fragment.append(App.UI.DOM.passageLink("Continue", V.nextLink));
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();
		}
	}
};

App.Events.MurderAttemptFollowup = class MurderAttemptFollowup extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.plot === 1,
			() => this.trySetup()
		];
	}

	trySetup() {
		const effectiveWeek = App.Events.effectiveWeek();
		if (V.illegalDeals.slave !== 0 && V.illegalDeals.slave !== -1 && effectiveWeek >= V.illegalDeals.slave.week) {
			this.params.variation = "slave";
			this.params.company = V.illegalDeals.slave.company;
			this.params.slaveType = V.illegalDeals.slave.type;
			return true;
		} else if (V.illegalDeals.trade !== 0 && V.illegalDeals.trade !== -1 && effectiveWeek >= V.illegalDeals.trade.week) {
			this.params.variation = "trade";
			this.params.company = V.illegalDeals.trade.company;
			return true;
		} else if (V.illegalDeals.military !== 0 && V.illegalDeals.military !== -1 && effectiveWeek >= V.illegalDeals.military.week) {
			this.params.variation = "military";
			this.params.company = V.illegalDeals.military.company;
			return true;
		}
		return false;
	}

	execute(node) {
		const that = this;
		switch (this.params.variation) {
			case "trade":
				App.Events.addParagraph(node, tradeDeal());
				break;
			case "slave":
				App.Events.addParagraph(node, slaveDeal(this.params.slaveType));
				break;
			case "military":
				App.Events.addParagraph(node, militaryDeal());
				break;
		}

		function tradeDeal() {
			V.illegalDeals.trade = -1;
			let r = [];
			r.push(`Today you are receiving the delegation from the old world company wanting to buy into the lucrative Free Cities market. After showing them around your logistic centers and the cleaner industry areas, you leave them alone with the representatives from ${that.params.company}.`);
			const failChance = 20 - (V.PC.skill.trading / 10);
			if (random(1, 100) > failChance) {
				r.push(`The next day you receive a transaction of ${cashFormatColor(270000)}.`);
				cashX(270000, "event");
			} else {
				r.push("A few hours later you receive a message that tricking the old world company into giving them money for nothing didn't quite work out as hoped. And truly, the next day your uncompetitive behavior is all over the media. This inflicts <span class='reputation dec'>lasting harm on your reputation</span> and <span class='red'>severely damages your economy</span> as your arcology is now seen as a place to go to be cheated.");
				repX(-20000, "event");
				V.enduringRep *= 0.5;
				V.arcologies[0].prosperity *= 0.7;
			}
			return r;
		}

		function slaveDeal(type) {
			V.illegalDeals.slave = -1;
			let slave;
			let relation;
			let contractCost;
			if (type === "school") {
				/** @type {FC.Zeroable<string>} */
				let race = 0;
				// Normally schoolmate race would be based on the shared nationality, if that is not possible because PC
				// is "Stateless" let them share race as well. But not if player chose "catgirl" as race since that
				// shouldn't be available outside the mod.
				if (V.PC.nationality === "Stateless" &&
					V.PC.race !== "catgirl") {
					race = V.PC.race;
				}
				slave = GenerateNewSlave(null, {
					minAge: V.PC.actualAge - 1,
					maxAge: V.PC.actualAge + 1,
					mature: 0,
					ageOverridesPedoMode: 1,
					nationality: V.PC.nationality,
					race: race
				});
				slave.origin = "You were in the same class and seeing $him as your slave fills you with endless satisfaction.";
				slave.behavioralFlaw = "arrogant";
				relation = "your former schoolmate";
				contractCost = 50000;
			} else if (type === "star") {
				slave = GenerateNewSlave('XX');
				slave.origin = "You bought $his enslavement in an illegal deal.";
				slave.voice = 3;
				slave.skill.entertainment = 60;
				slave.face = 96 + Math.floor(Math.random() * 5); // Math.random() is always < 1, so range is 0<=x<=4
				slave.intelligence = Math.abs(slave.intelligence); // never dumb, but no guarantee on smart
				slave.weight = Math.clamp(slave.weight, -30, 30);
				slave.waist = Math.clamp(slave.waist, -50, 10);
				slave.career = "an actress";
				slave.prestige = 2;
				slave.prestigeDesc = "$He was once a rising star in the music business, but was illegally enslaved on your command.";
				relation = "the former rising star";
				contractCost = 250000;
			}
			let r = [];
			r.push(`Today ${relation}, whose enslavement you purchased, arrives at your penthouse complete with forged documents and no connections to their past life. You promptly send the agreed-upon ${cashFormat(contractCost)} to the specialist slave company.`);
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(App.UI.newSlaveIntro(slave));
			return r;
		}

		function militaryDeal() {
			V.illegalDeals.military = -1;
			let r = [];
			const failChance = 10 - (V.PC.skill.warfare / 20);
			if (random(1, 100) > failChance) {
				r.push(`After several months of fighting, the new Free City in the old world is finally established. While small scale conflicts will likely continue for years to come, local forces can easily manage them, leaving external forces, like your own mercenaries, to withdraw with their spoils. For your participation you get ${cashFormatColor(1000000)} and several hundred new bodies to add to your menial stock.`);
				cashX(1000000, "event");
				V.menials += 500;
			} else {
				r.push(`The coalition of forces you'd joined to establish a new Free City in the old world admitted defeat this week. The target nation-state's military proved to be less decrepit than your allies assumed, and they've fended off the Free Cities' mercenary forces for now. Of course your allies all blame each other for mismanaging the coalition's resources, a debate you have no interest and no stakes in. In the end, this war proved to be a waste of your time. Luckily you didn't invest too much in the war effort, so it only cost you ${cashFormatColor(40000, true)} and some <span class='reputation dec'>reputation.</span>`);
				cashX(-40000, "event");
				repX(forceNeg(V.rep / 8), "event");
			}
			return r;
		}
	}
};
