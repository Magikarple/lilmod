App.Events.secExpSmilingMan3 = class secExpSmilingMan3 extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.secExpEnabled > 0,
		];
	}

	execute(node) {
		V.fcnn.push("...sometimes high-tech problems have low-tech solutions. Back to you in the...");
		V.nextButton = " ";
		let r = [];
		const smileSlave = GenerateNewSlave(V.seeDicks !== 100 ? "XX" : "XY", {
			minAge: 16, maxAge: 18, ageOverridesPedoMode: 1, disableDisability: 1, race: "asian", nationality: "Japanese"
		});

		smileSlave.faceShape = V.seeDicks !== 100 ? "cute" : "androgynous";
		smileSlave.boobs = V.seeDicks !== 100 ? 450 : 250;
		smileSlave.natural.boobs = 450;
		if (V.seeDicks !== 100) {
			smileSlave.vagina = 0;
			smileSlave.ovaries = 1;
		}
		smileSlave.boobShape = "perky";
		smileSlave.nipples = "cute";
		smileSlave.origin = "$He was a criminal mastermind, captured shortly after completing $his master plan.";
		smileSlave.career = "a student from a private school";
		smileSlave.intelligence = 100;
		smileSlave.intelligenceImplant = 30;
		smileSlave.slaveSurname = "Yamadera";
		smileSlave.birthSurname = "Yamadera";
		smileSlave.origSkin = "pale";
		applyGeneticColor(smileSlave);
		smileSlave.devotion = 5 * V.SecExp.smilingMan.relationship;
		smileSlave.trust = 5 * V.SecExp.smilingMan.relationship;
		smileSlave.face = random(10, 60);
		setHealth(smileSlave, 70, 0, 0, 0, 0);
		smileSlave.teeth = "normal";
		smileSlave.areolae = 0;
		smileSlave.anus = 0;
		smileSlave.butt = 3;
		smileSlave.lips = 15;
		smileSlave.behavioralFlaw = "odd";
		smileSlave.skill.vaginal = 0;
		smileSlave.skill.penetrative = 0;
		smileSlave.skill.oral = 0;
		smileSlave.skill.anal = 0;
		smileSlave.skill.whoring = 0;
		smileSlave.skill.entertainment = 0;
		smileSlave.birthWeek = random(0, 50);
		smileSlave.voice = 2;
		smileSlave.weight = -20;
		smileSlave.muscles = 0;
		smileSlave.shoulders = -1;
		smileSlave.hips = 0;
		smileSlave.clit = 0;
		smileSlave.labia = 0;
		smileSlave.waist = 10;
		smileSlave.preg = 0;
		smileSlave.prestige = 3;
		smileSlave.prestigeDesc = "$He was the famous Smiling Man.";
		smileSlave.clothes = "a military uniform"; // closest thing to commie/punk we have at the moment

		const {
			His, He,
			his, he, him, girl
		} = getPronouns(smileSlave);

		r.push(`The day has come to finally put an end to this story. Your men are ready to go, waiting only on your signal. You quickly don your protective gear and proceed down the busy streets of your arcology.`);
		r.push(`You carefully planned the day so that nothing could exit the arcology without being scanned at least three times and poked twice. The Smiling Man has no escape.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`After a short walk you are in front of the criminal's lair, a rundown old apartment in a scarcely populated part of the arcology. You give the order to breach and your men rush inside without problems.`);
		r.push(`After a couple of seconds pass without a single noise coming from the apartment, you begin to worry. Then you hear the captain calling you inside.`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Enter`, inside),
		]);

		function inside() {
			const frag = new DocumentFragment();
			let r = [];
			App.Events.drawEventArt(frag, smileSlave);

			r.push(`"So it was you to find me first.`);
			if (V.SecExp.smilingMan.relationship > 2) {
				r.push(`I was hoping you would be the one!`);
			} else {
				r.push(`I expected you would be the one.`);
			}
			r.push(`Well, I hope I'm everything you expected," you hear a voice say. Despite recognizing it, you struggle to convince yourself that the little ${girl} in front of you is indeed the famous criminal mastermind.`);
			App.Events.addParagraph(frag, r);
			App.Events.addParagraph(frag, [`"As you can see, I have no intention of escaping. I knew my life was over the second my plan went into effect. I accepted my end a long time ago, so feel free to do your worst; my life has already ended in triumph."`]);
			App.Events.addParagraph(frag, [`You evaluate the situation: the burning desire of vengeance for all the damage that little twerp caused is hard to ignore, but equally so is the admiration for ${his} skill and determination. Indeed, ${he} would be a great addition to your court, as a free individual or not.`]);

			App.Events.addResponses(frag, [
				new App.Events.Result(`Offer ${him} a new life`, offer),
				new App.Events.Result(`Make ${him} pay`, punish),
				new App.Events.Result(`Enslave ${him}`, enslave),
			]);

			return frag;

			function offer() {
				const frag = new DocumentFragment();
				let r = [];
				V.SecExp.smilingMan.progress = 10;
				r.push(`You decide it would be criminally wasteful to throw away such talent. You offer ${him} a new life at your side. ${His} expertise will surely guarantee safety, if not supremacy, to your arcology in cyberspace, while ${he} will have safety and luxury in the physical world.`);
				r.push(App.UI.DOM.link(
					"Continue",
					() => { $(node).empty().append(result()); }
				));
				App.Events.addParagraph(frag, r);
				return frag;
			}
			function punish() {
				const frag = new DocumentFragment();
				let r = [];
				V.SecExp.smilingMan.progress = 20;
				r.push(`You decide to end ${his} pitiful life. ${He} has crossed the wrong master of the new world ${he} worked so hard to create. No mercy was asked for and no mercy will be given.`);
				r.push(App.UI.DOM.link(
					"Continue",
					() => { $(node).empty().append(result()); }
				));
				App.Events.addParagraph(frag, r);
				return frag;
			}
			function enslave() {
				const frag = new DocumentFragment();
				let r = [];
				V.SecExp.smilingMan.progress = 30;
				r.push(`You decide to enslave the ${girl}. ${His} skill may be great, but ${his} crimes are equally so, which will make it all the sweeter to turn ${him} into an obedient little toy to play with.`);
				r.push(App.UI.DOM.link(
					"Continue",
					() => { $(node).empty().append(result()); }
				));
				App.Events.addParagraph(frag, r);
				return frag;
			}
			function result() {
				const frag = new DocumentFragment();
				let r = [];
				V.nextButton = "Continue";
				App.Utils.scheduleSidebarRefresh();
				window.scrollTo(0, window.pageYOffset);
				if (V.SecExp.smilingMan.progress < 30) {
					App.Events.drawEventArt(frag, smileSlave);

					if (V.SecExp.smilingMan.progress === 10) {
						r.push(`The ${girl} asks for a few minutes to think about your offer,`);
						if (V.SecExp.smilingMan.relationship >= 4) {
							r.push(`but ${he} quickly comes to terms with the situation and accepts.`);
						} else {
							r.push(`and after some time ${he} reluctantly accepts.`);
						}
						r.push(`In the following weeks ${he} will get acquainted with the security network of the arcology and work to protect ${his} new home in the new world ${he} has created.`);
						r.push(`The world will never find out the truth of the Smiling Man and his legend will only grow with time, outliving his creator and maybe even ${his} new employer.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`The collaboration of the ex-Smiling Man permanently increases <span class="green">security and the rate of prosperity growth.</span> <span class="cash inc">Cash will be also provided,</span> but you're better off not knowing the sources.`);
						App.Events.addParagraph(node, r);
						r = [];
					} else if (V.SecExp.smilingMan.progress === 20) {
						smileSlave.clothes = "no clothing";
						r.push(`For such a criminal a simple execution is not enough. You order the ${girl} captured and crucified outside the city, with a mask resembling ${his} famous symbol. Your men quickly obey. ${He} never once shows sign of pain or fear, remaining stoic and proud to the end.`);
						r.push(`Once ${his} life ends, you order a statue erected in commemoration of the death of the Smiling Man. From this day forward the statue of the crucified criminal will adorn your arcology and his legend will be forever entangled with yours.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`Having dealt with the Smiling Man will provide <span class="reputation inc">a large boost to your reputation, as well as a moderate amount of reputation each week.</span>`);
						App.Events.addParagraph(node, r);
						r = [];
						repX(10000, "architecture");
					}
				} else if (V.SecExp.smilingMan.progress === 30) {
					smileSlave.clothes = "no clothing";
					r.push(`Your men move to immobilize ${him}. Terror flashes through ${his} eyes for`);
					if (V.SecExp.smilingMan.relationship >= 4) {
						r.push(`a second, but ${he} quickly recovers ${his} usual demeanor.`);
					} else {
						r.push(`a second — ${he} barely manages to recover ${his} usual demeanor.`);
					}
					App.Events.addParagraph(node, r);
					r = [];
					r.push(App.Desc.longSlave(smileSlave));
					r.push(App.UI.newSlaveIntro(smileSlave));
					App.Events.addParagraph(node, r);
				}
				delete V.SecExp.smilingMan.relationship;

				App.Events.addParagraph(frag, r);
				return frag;
			}
		}
	}
};
