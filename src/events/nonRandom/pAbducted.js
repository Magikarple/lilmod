App.Events.pAbducted = class pAbducted extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() === 12,
			() => V.raped === -1,
			() => V.arcologyUpgrade.drones !== 1,
			() => V.BodyguardID === 0,
			() => V.PC.career !== "arcology owner",
			() => V.PC.visualAge < 14
		];
	}

	execute(node) {
		V.nextButton = " "; // disable Continue
		let r = [];
		const {
			girlP
		} = getPronouns(V.PC).appendSuffix("P");
		V.raped = 1;

		const contractCost = 1000;
		const genParam = {minAge: 22, race: "nonslave", disableDisability: 1};
		const abductor = GenerateNewSlave("XY", genParam);
		abductor.boobs = 100;
		abductor.skill.oral = 0;
		abductor.skill.anal = 0;
		abductor.muscles = Math.max(abductor.muscles, 40);
		abductor.origin = `You sentenced $him to enslavement for the attempted abduction of a child – you, to be exact.`;
		abductor.devotion = -100;
		abductor.trust = -100;
		setHealth(abductor, jsRandom(-40, -20), normalRandInt(15, 3), undefined, 1, random(30, 80));
		abductor.anus = 0;
		abductor.behavioralFlaw = "arrogant";
		abductor.sexualFlaw = "judgemental";

		const {
			He,
			his, he, him,
		} = getPronouns(abductor);

		r.push(`While returning from a meeting with a prospective investor, an unfortunate wrong turn has led you into a rather seedy area of your arcology. You feel distinctly uncomfortable for some reason. Your suspicions are quickly confirmed as a bag is swung over your head. Your grab your assailant's wrists and struggle to keep them from completely engulfing you,`);

		if (overpowerCheck(abductor, V.PC) >= random(1, 100)) {
			r.push(`only to find that you're quite capable of keeping them at bay.`);
			V.raped = 0;
		} else {
			r.push(`only to find that you're far too outmatched to be able to hold them back.`);
		}
		if (V.raped === 0) { // fought back and got stabbed
			App.Events.addParagraph(node, r);
			r = [];
			V.fcnn.push("...is stable after altercation and plans for increased security measures following...");

			r.push(`You quickly manage to gain the upper hand, pulling yourself out of the bag and getting a good look at the would-be kidnapper. Being bested by a child was not in his plans and, short of options, draws a knife and <span class="red">drives it into your stomach.</span> Realizing what he just did, he panics and flees, leaving you bleeding, his blade still stuck in you.`);
			if (V.PC.skill.medicine < 0) {
				r.push(`You cry out as you yank the weapon from your body, and clutching the gushing wound, hobble back the way you came — the way back to safety. The world spins as you lose consciousnesses.`);
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`You awaken on a hard cot, staring face to face with a rather haggard looking man. You leap in shock, sending the man swearing and tearing your stitches open. As you regain your composure, and get restitched, you realize that you are in a particularly shitty clinic known for their outrageous treatment fees. The wound was minor and should heal readily, but it will keep you out of commission for a little. `);
				if (V.PC.preg > 2 && V.PC.pregKnown) {
					r.push(`You're just glad it didn't harm your womb. This could have been a lot worse.`);
				}
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`It would be prudent to up security in your arcology. That or take a guard along when you leave the penthouse. Your wallet might actually hurt more than your injury does, ${cashFormatColor(5000, true)} for crappy stitches, but at least you'll be on your feet again in a week.`);
				App.Events.addParagraph(node, r);
				cashX(-5000, "event");
			} else {
				r.push(`As much as it hurts, you steel yourself and apply pressure to the wound around the weapon before slowly hobbling back the way you came. It doesn't take long before someone comes rushing to your aid, and you've managed to keep your composure long enough to convey where you should be taken for medical treatment.`);
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`You awaken in a nice, warm bed and are immediately greeted by a lovely buxom nurse; both familiar aspects of the clinic you've chosen for any serious medical emergencies. The wound was minor, only requiring some stitches, and should heal readily, but it will keep you out of commission for a little. At least the bill of ${cashFormatColor(1000, true)} isn't that bad.`);
				if (V.PC.preg > 2 && V.PC.pregKnown) {
					r.push(`You're just glad it didn't harm your womb. This could have been a lot worse.`);
				}
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`It would be prudent to up security in your arcology. That or take a guard along when you leave the penthouse. You are undeniably a high-value target for wealthy collectors and would rather avoid any future attempts and or stabbings. Even with a full description of him, your assailant got away; there was just nobody interested in tracking him down.`);
				App.Events.addParagraph(node, r);
				cashX(-1000, "event");
			}
			node.append(App.UI.DOM.passageLink("Continue", V.nextLink));
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();
			V.PC.health.shortDamage = 2;
			V.PC.health.longDamage = 1;
		} else {
			r.push(`Once your vision is obscured, your attacker sweeps your legs and tosses you into a waiting crate.`);
			r.push(Spoken(abductor, `"Be a good little ${girlP} and keep quiet. Wouldn't want anything bad to happen to ya, eh? I'd really hate to damage the merchandise."`));
			r.push(`With nothing holding you, you slip the bag off yourself and assess the situation. Peeking from an airhole, you can see that you're being loaded on a dolly destined for the loading docks.`);
			App.Events.addParagraph(node, r);

			App.Events.addResponses(node, [
				new App.Events.Result("Scream for help", badEnd),
				new App.Events.Result("Remain calm", scream),
			]);
		}

		function badEnd() {
			const node = new DocumentFragment();
			let r = [];
			r.push(`You let loose a deafening shriek, desperate for someone to hear you.`);
			r.push(Spoken(abductor, `"I said SHUT IT you little bitch!"`));
			r.push(`Your head is bashed into the side of the box as your kidnapper kicks it, sending it and you tumbling to the floor.`);
			r.push(Spoken(abductor, `"Shit!"`));
			r.push(`Your abductor cursing and spitting is the last thing you hear before you lose consciousness.`);
			App.Events.addParagraph(node, r);

			r = [];
			r.push(`Once the realization strikes that you've gone missing, your arcology descends into lawlessness as the less than reputable clash to see who can seize control of building, at least until a new owner arrives to clean them out. An indeterminate amount of time later, a slave that looks a lot like the lost owner of ${V.arcologies[0].name} is seen; who's to say if it is you, or somebody else though? The story of your new life may be worth telling, but it must be told elsewhere.`);
			App.Events.addParagraph(node, r);

			App.Events.addParagraph(node, ["<span class='bold'>GAME OVER</span>"]);
			V.ui = "start";
			App.Utils.scheduleSidebarRefresh();
			return node;
		}

		function scream() {
			const node = new DocumentFragment();
			const bounty = 500 * random(3, 6);
			let r = [];
			r.push(`Calling for help when it's just you and your abductor is nothing short of an invitation for trouble, so you keep your mouth shut and wait for an opportunity. There's only so many ways in and out of the arcology, and there's bound to be people going about their business through them at this hour. After an uncomfortably cramped ride and having to put up with your captive merrily humming to himself and arriving at a suitably populated loading dock, the thought occurs to you: what if they don't believe you are anything more than an unbroken slave?`);
			if (V.PC.actualAge < V.minimumSlaveAge) {
				r.push(`Fortunately, you are actually underage, so your screams for help quickly attract concerned workers. They corner the man and pry the lid off your box, allowing you to clamber back onto solid ground. Your would-be captor makes a short lived escape attempt straight into a fist once he realizes his plans are ruined. He's quickly tied up and presented to you for revenge.`);
				abductor.minorInjury = "black eye";
			} else {
				r.push(`Sometimes simple is better, so you scream out that you're being kidnapped and will give ${cashFormat(bounty)} to anyone that assures your return to safety. The prospect of easy money quickly has your captor tackled, you freed and helped to your feet. It may have costed you ${cashFormatColor(bounty, true)}, but the sight of the man groveling at your feet for mercy is worth it.`);
				cashX(-bounty, "event");
			}
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`It would be prudent to up security in your arcology. That or take a guard along when you leave the penthouse. You are undeniably a high-value target for wealthy collectors and would rather avoid the indignity of being crammed in a box again.`);
			App.Events.addParagraph(node, r);
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();
			V.fcnn.push("...plans for increased security measures following the unsuccessful abduction of...");

			App.UI.DOM.appendNewElement("div", node, `Now the only remaining question is what to do with the would-be kidnapper. You could toss ${him} out of the arcology, but it might be more fun to turn the tables on ${him}.`);
			App.UI.DOM.appendNewElement("div", node, `Applying enslavement as punishment will cost ${cashFormat(contractCost)}. Doing so and then selling ${him} immediately will bring in approximately ${cashFormat(slaveCost(abductor) - contractCost)}.`, ["note"]);

			node.append(App.Desc.longSlave(abductor, {market: "generic"}));
			const choices = [];
			if (V.cash >= contractCost) {
				choices.push(new App.Events.Result(`Enslave ${him}`, enslave));
				choices.push(new App.Events.Result(`Sentence ${him} to a day in the stocks, then enslave ${him}`, stocks));
				if (V.arcade > 0) {
					choices.push(new App.Events.Result(`Enslave ${him} and sentence ${him} to a month in the arcade`, arcade));
				}
				if (V.dairy > 0 && V.dairyRestraintsSetting > 1) {
					choices.push(new App.Events.Result(`Enslave ${him} and send ${him} straight to the industrial dairy`, dairy));
				}
				if (V.farmyard > 0) {
					choices.push(new App.Events.Result(`Enslave ${him} and send ${him} straight to the farmyard`, farmyard));
				}
				if (V.seeExtreme > 0) {
					choices.push(new App.Events.Result(`Punitively amputate ${his} limbs, and then enslave ${him}`, amputate));
				}
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
			}
			choices.push(new App.Events.Result(`Publicly flog the criminal`, flog));
			App.Events.addResponses(node, choices);
			return node;

			function enslave() {
				const el = new DocumentFragment();
				cashX(forceNeg(contractCost), "slaveTransfer", abductor);
				el.append(`You complete the legalities and biometric scanning quickly and without fuss. The idiot will regret crossing you when ${he} wakes in the penthouse for basic slave induction.`);
				el.append(App.UI.newSlaveIntro(abductor));
				return el;
			}

			function stocks() {
				const el = new DocumentFragment();
				const r = [];
				healthDamage(abductor, 10);
				abductor.behavioralFlaw = "odd";
				abductor.sexualFlaw = "hates penetration";
				abductor.anus = 2;
				seX(abductor, "oral", "public", "penetrative", 23);
				seX(abductor, "anal", "public", "penetrative", 12);
				if (abductor.vagina > -1) {
					abductor.vagina = 2;
					seX(abductor, "vaginal", "public", "penetrative", 12);
					if (random(1, 100) > 60 && isFertile(abductor)) {
						knockMeUp(abductor, 100, 0, -2);
					}
				} else {
					seX(abductor, "anal", "public", "penetrative", 12);/* even more anal */
				}
				cashX(forceNeg(contractCost), "slaveTransfer", abductor);

				r.push(`You declare ${his} holes fair game for the entire arcology. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(abductor.vagina > -1) ? ` and <span class="lime">fucked-out</span> pussy` : ``}. The public <span class="green">enjoys the fun.</span>`);
				repX(500, "event");
				V.arcologies[0].prosperity += 2;
				r.push(App.UI.newSlaveIntro(abductor));
				App.Events.addParagraph(el, r);
				return el;
			}

			function arcade() {
				assignJob(abductor, "be confined in the arcade");
				abductor.sentence = 4;
				cashX(forceNeg(contractCost), "slaveTransfer", abductor);
				newSlave(abductor);/* skip New Slave Intro */
				return `You complete the legalities and biometric scanning quickly and cautiously. The idiot will be in for a surprise when ${he} awakes to find ${he} can't move and a dick is in ${his} ass.`;
			}

			function dairy() {
				const el = new DocumentFragment();
				const r = [];
				assignJob(abductor, "work in the dairy");
				cashX(forceNeg(contractCost), "slaveTransfer", abductor);
				r.push(`You complete the legalities and biometric scanning quickly and cautiously. The idiot will wake up`);
				if (V.dairyStimulatorsSetting > 1) {
					r.push(`in agony as ${his} anus takes the rectal hydration dildo.`);
				} else {
					r.push(`to find ${his} chest has begun swelling with milk.`);
				}
				abductor.boobs += 300;
				newSlave(abductor); /* skip New Slave Intro */
				App.Events.addNode(el, r);
				return el;
			}

			function farmyard() {
				const el = new DocumentFragment();
				const actions = [`${V.seeBestiality ? 'getting fucked by' : 'putting on shows with'} animals`];
				if (V.farmyardShows < 2) {
					actions.push(`working the fields`);
				}
				const r = [];
				assignJob(abductor, "work as a farmhand");
				cashX(forceNeg(contractCost), "slaveTransfer", abductor);
				r.push(`You complete the legalities and biometric scanning quickly and cautiously. The idiot will wake up in ${V.farmyardName}, where ${he} will spend the rest of ${his} days ${toSentence(actions)}.`);
				newSlave(abductor);/* skip New Slave Intro */
				App.Events.addNode(el, r);
				return el;
			}

			function amputate() {
				const el = new DocumentFragment();
				const r = [];
				healthDamage(abductor, 20);
				removeLimbs(abductor, "all");
				abductor.behavioralFlaw = "odd";
				cashX(forceNeg(contractCost), "slaveTransfer", abductor);
				r.push(`You want ${him} to suffer for what ${he} tried to pull on you. You make sure ${he} is fully awake as ${he} is strapped into the autosurgery. You take great pleasure in watching ${him} struggle as ${his} limbs are taken, one by one. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> After ${he} has stabilized, it's off to the penthouse for basic slave induction. You'd like to see ${him} try and carry you off again without arms and legs.`);
				if (abductor.balls > 0) {
					const geld = function() {
						const el = new DocumentFragment();
						const r = [];
						healthDamage(abductor, 20);
						abductor.balls = 0;
						abductor.devotion -= 25;
						abductor.trust -= 25;
						cashX(forceNeg(contractCost), "slaveTransfer", abductor);
						r.push(`You want ${him} to suffer for what ${he} tried to pull on you. You make sure ${he} is fully awake as ${he} is strapped into the autosurgery, taking the time to roughly fondle ${his} balls. You take great pleasure in watching ${him} struggle as ${his} testicles are removed. Once ${he} can stand again, it's off to the penthouse for basic slave induction.`);
						r.push(App.UI.newSlaveIntro(abductor));
						App.Events.addNode(el, r);
						return el;
					};
					App.Events.addResponses(el, [new App.Events.Result(`Enslave the criminal and geld ${him}`, geld)]);
				}
				App.Events.addNode(el, r);
				return el;
			}

			function flog() {
				const el = new DocumentFragment();
				const r = [];
				r.push(`Naturally, the wretch will be thrown out of the arcology, but an example must first be made. Free people must understand that criminals who commit outrages against them will be severely punished. The protesting malefactor is stripped and flogged on the promenade before being escorted bleeding from the arcology. The public <span class="green">approves of this harshness.</span>`);
				repX(500, "event");
				App.Events.addNode(el, r);
				return el;
			}
		}
	}
};
