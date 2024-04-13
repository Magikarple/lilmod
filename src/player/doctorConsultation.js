App.UI.doctorConsultation = function() {
	const frag = document.createElement("div");

	const drugsDiv = document.createElement("div");
	const examDiv = document.createElement("div");
	const treatDiv = document.createElement("div");
	const illnessDiv = document.createElement("div");
	const {
		HeU,
		heU, hisU,
		womanU
	} = getNonlocalPronouns(V.seeDicks === 0 ? 0 : 100).appendSuffix("U");
	const {girlP} = getPronouns(V.PC).appendSuffix('P');

	const arcology = V.arcologies[0];
	const hedonisticDecadenceActive = FutureSocieties.isActive('FSHedonisticDecadence', arcology);
	const price = Math.max(Math.min((Math.pow(5, V.baseDifficulty) * 10), 10000), 500);

	if (V.doctor.state > 0) { // Don't charge on the first visit.
		cashX(forceNeg(price), "PCmedical");
	}

	if (V.doctor.state > 1) {
		App.Events.addParagraph(frag, [
			`You head to the private clinic to meet with your doctor for another medical examination. After a short wait, and a payment of <span class="cash">${cashFormat(price)},</span> you're directed to your doctor's exam room for your appointment. "Back again so soon? We're happy to keep giving you drugs and advice if you keep giving us money; the owner wants to buy a new organ farm, after all. Have to say I am a bit jealous of our neighbor's expensive new toy — I mean, can you blame me? The only toys we find here are usually lodged someplace${V.PC.actualAge < V.minimumSlaveAge ? "— Ah! Never mind! Someone your age shouldn't be hearing things like that, and no, I don't want to know what you get up to up there in the penthouse" : " they shouldn't be, if you catch my drift. You can only take so much of that before you start to question your career decisions. Oh, and good luck ever looking at them the same way again"}."`
		]);
	} else if (V.doctor.state > 0) {
		App.Events.addParagraph(frag, [
			`You head to the private clinic to meet with your doctor for a medical examination. After a short wait, and a payment of <span class="cash">${cashFormat(price)},</span> you're directed to your doctor's exam room for your appointment. "${V.PC.health.condition < 20 || V.PC.health.illness > 1 || V.PC.addict > 10 ? "Well, you've seen better days, haven't you? Came to the right place to be put back in order, though" : "You seem to be doing well, but let's see what the tests have to say about that"}. Hop up on the scale and we'll get this over with."`
		]);
		V.doctor.state = 2;
	} else {
		App.Events.addParagraph(frag, [
			`You make your way to ${arcology.name}'s main medical pavilion, which houses the largest private clinic in the arcology, intent on finding a primary physician to keep an eye on your health. ${hedonisticDecadenceActive ? "There is a substantial wait before you're seen, owing to the increasingly eccentric people that make up your citizenry, so you have plenty of time to deal with registering and enjoy a little people-watching" : "The clinic operates like a well-oiled machine, and you barely get through registering yourself"} before your name is called. As you enter the exam room, you're greeted by an imposing, rather harried-looking ${womanU}, "Welcome, ${PlayerName()}.${V.PC.actualAge < V.minimumSlaveAge ? `" ${HeU} gives you a momentary dirty look before realizing what ${heU} did. "Apologies, I just thought you'd be a little older... never mind.` : ""} I will be serving as your doctor from here on, and while the first visit is free, future ones will run you <span class="noteworthy">${cashFormat(price)},</span> so do try to remember that. To start, would you please step onto this scale so we may begin this examination?"`
		]);
		V.doctor.state = 1;
	}
	frag.append(medicalExam());

	if (V.PC.health.condition <= 20) {
		frag.append(healthBoost());
	}
	if (V.PC.health.illness > 1) {
		frag.append(treatIllness());
	}

	frag.append(drugs());

	return frag;

	/**
	 * @returns {HTMLDivElement} a div that shows the players current health status
	 */
	function medicalExam() {
		const r = [];
		const PCH = V.PC.health;

		r.push(`"With all the tests completed, let's see how you did.`);
		if (PCH.condition < -90) {
			r.push(`<span class="red">Good lord, you are very unwell.</span> We can stabilize you, but after that, go home and rest. Eat well, keep your spirits up, and maybe pray a little. If you feel you are dying, call us at once.`);
		} else if (PCH.condition < -50) {
			r.push(`<span class="red">You're very unhealthy.</span> After I treat you, go home and rest. Eat well, keep your spirits up, and get some rest. If it persists, come back at once.`);
		} else if (PCH.condition < -20) {
			r.push(`<span class="red">You're rather unhealthy.</span> Get lots of rest and whatever light exercise you can manage. If it gets worse, come back at once, don't wait.`);
		} else if (PCH.condition <= 20) {
			r.push(`<span class="yellow">You are in fair health.</span> A little worrying, but nothing bad yet.`);
		} else if (PCH.condition <= 50) {
			r.push(`<span class="green">Your health is good,</span> but not great. Nothing to worry about, as long as it doesn't start dipping.`);
		} else if (PCH.condition <= 90) {
			r.push(`<span class="green">Your health is great;</span> keep doing whatever it is you're doing.`);
		} else {
			r.push(`<span class="green">Your health is pretty much the ideal;</span> it can't possibly get any better.`);
		}

		if (PCH.illness > 1) {
			if (PCH.condition <= 20) {
				r.push(`And <span class="red">you're sick</span> to top it off, but we've got something for that too. If you get any worse, you know where we are.`);
			} else {
				r.push(`You've got <span class="red">some sort of illness</span> going on, but that's pretty easily dealt with via medication, and in your health, you should bounce back nicely.`);
			}
		}

		r.push(`On the physical side,`);
		if (V.PC.weight > 190) {
			r.push(`you are <span class="red">much too fat.</span>`);
			if (hedonisticDecadenceActive) {
				r.push(`But who isn't these days?" ${HeU} sighs, patting ${hisU} own growing gut. "Anyway, a little less weight would do you some good.`);
			} else if (PCH.condition < -20) {
				r.push(`All that weight is quite literally crushing you. This is why your health is in decline.`);
			} else {
				r.push(`You may be managing your health well enough to fool yourself into thinking you'll be fine, but it will catch up to you one day, and when it does, it's all downhill from there.`);
			}
		} else if (V.PC.weight > 160) {
			r.push(`you are <span class="red">too fat.</span>`);
			if (hedonisticDecadenceActive) {
				r.push(`But who isn't these days?" ${HeU} sighs, patting ${hisU} own growing gut. "Anyway, a little exercise and watching what you eat will keep your health up despite the weight.`);
			} else if (PCH.condition < -20) {
				r.push(`Poor health coupled with obesity puts you at serious risk of heart failure. Think about that before each meal.`);
			} else {
				r.push(`You may be managing your health well enough, but there is always the looming chance of complications arising from your weight, and when it happens, you may find it hard to get back on your feet, leading to further issues down the road.`);
			}
		} else if (V.PC.weight > 130) {
			r.push(`you are <span class="red">too fat.</span>`);
			if (hedonisticDecadenceActive) {
				r.push(`But who isn't these days?" ${HeU} sighs, patting ${hisU} own growing gut. "Anyway, a little exercise and watching what you eat will keep any complications at bay.`);
			} else if (PCH.condition < -20) {
				r.push(`Your weight is not a good mix with your overall health. You'll find yourself plagued with complications that will steadily drag you further and further down.`);
			} else {
				r.push(`With your overall health, I think you should manage fine despite the weight. You may hit a snag here and there, but you're fit enough to bounce back. If you don't, however, we'll be here to patch you up.`);
			}
		} else if (V.PC.weight > 95) {
			r.push(`you are getting rather fat.`);
			if (hedonisticDecadenceActive) {
				r.push(`But who isn't these days?" ${HeU} sighs, patting ${hisU} own growing gut. "Anyway, just consider your future wellbeing, is all.`);
			} else if (PCH.condition < -20) {
				r.push(`While any complications will still be minor, your poor health will make them far more frequent then you'd like.`);
			} else {
				r.push(`You're healthy enough that it isn't a concern though. And even if anything happens due to your weight, you're fit enough to shrug it off.`);
			}
		} else if (V.PC.weight < -95) {
			r.push(`you are <span class="red">very malnourished.</span>`);
			if (PCH.condition > 20) {
				r.push(`You need to eat more or your health will start to falter.`);
			} else {
				r.push(`This is no doubt a major factor in your recent health issues.`);
			}
		} else if (V.PC.weight < -30) {
			r.push(`you are a bit thin.`);
			if (PCH.condition < -20) {
				r.push(`I recommend putting on a little weight until your health improves. Having to work it off afterwards will help solidify your wellbeing as well.`);
			}
		} else {
			r.push(`your weight is fine.`);
		}

		if (V.PC.preg > 0) {
			if (V.PC.actualAge <= 12 && V.PC.actualAge < V.minimumSlaveAge) {
				if (V.PC.pregKnown) {
					if (isInduced(V.PC)) {
						r.push(r.pop() + `" ${HeU} seems to be trying ${hisU} hardest to avoid looking at you, "You're fully dilated, but at your age, odds aren't in your favor for a successful natural birth. If you'd consent, I'll have you prepped for a cesarean at once.`);
					} else if (V.dangerousPregnancy === 1) {
						if ((V.PC.belly > (V.PC.pregAdaptation * 3200)) || V.PC.bellyPreg >= 500000) {
							r.push(r.pop() + `" ${HeU} looks ready to vomit after having inspected your body-turned-womb, "This is going to haunt my dreams. How, why? I can't understand what would propel a child to do this to themselves. I have no advice for you other than taking residency here until whatever happens, happens. I just hope there's something left to salvage...`);
						} else if ((V.PC.bellyPreg >= V.PC.pregAdaptation * 2200) || (V.PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2 && ft.age >= 20))) {
							r.push(r.pop() + `" ${HeU} grimaces at the bulge hanging heavily from your underage body, "Your body is about at the limit of what it can handle. The best I can tell you is to try to not move around if you can help it. When further complications arise, please seek us out fast.`);
						} else if (V.PC.bellyPreg > V.PC.pregAdaptation * 1000) {
							r.push(r.pop() + `" ${HeU} grimaces at the bulge extending from your underage body, "This was truly inevitable. Kids shouldn't be having kids. Their bodies just can't handle it. The best I can tell you is to avoid strenuous activities, get lots of rest, and keep to a healthy diet. It's only going to become more complicated from here.`);
						} else {
							r.push(r.pop() + `" ${HeU} glances uncomfortably at your stomach, "Your pregnancy is progressing smoothly, for now. But children aren't ready to make babies, so please take it easy.`);
						}
					} else {
						r.push(r.pop() + `" ${HeU} glances uncomfortably at your stomach, "Your pregnancy is progressing smoothly, for now. But children aren't ready to make babies, so please take it easy.`);
					}
				} else {
					r.push(`Your urine sample says you are... <span class="pregnancy">pregnant.</span> If someone took advantage of you, you can tell us, you know. This is a safe place. Or, um, have you been 'experimenting'? No, no, I don't want to know if you have been.`);
					V.PC.pregKnown = 1;
				}
			} else if (V.PC.actualAge < V.minimumSlaveAge) {
				if (V.PC.pregKnown) {
					if (isInduced(V.PC)) {
						r.push(`I didn't want to say anything at the moment, but you're fully dilated, and since you're a bit young still, should I take you to maternity or...?`);
					} else if (V.dangerousPregnancy === 1) {
						if ((V.PC.belly > (V.PC.pregAdaptation * 3200)) || V.PC.bellyPreg >= 500000) {
							r.push(`Dear god, how did you manage to get yourself into this state? At your age, to be swollen like that; it's just disturbing to see. Anyway, assuming your womb just doesn't burst on its own, try to stay as still as much as possible and, um, avoid pointy objects?`);
						} else if ((V.PC.bellyPreg >= V.PC.pregAdaptation * 2200) || (V.PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2 && ft.age >= 20))) {
							r.push(`Hmm, your body is struggling to bear the weight in your womb. Try to stay put as much as you can and don't move around too much. No strenuous activities, either! Especially 'fooling around' after it got you into this state!`);
						} else if (V.PC.bellyPreg > V.PC.pregAdaptation * 1000) {
							r.push(`Hmm, your body is starting to have a bit of trouble, it seems. Just take it easy and you shouldn't run into any complications.`);
						} else {
							r.push(`Your pregnancy is progressing smoothly.`);
						}
					} else {
						r.push(`Your pregnancy is progressing smoothly.`);
					}
				} else {
					r.push(`Your urine sample... You do know about protection, right? 'Cause, <span class="pregnancy">you're pregnant.</span>`);
					V.PC.pregKnown = 1;
				}
			} else {
				if (V.PC.pregKnown) {
					if (isInduced(V.PC)) {
						r.push(`I didn't want to say anything at the moment, but you're fully dilated, and I'm pretty sure the baby is coming out even as we speak. Should we, take care of that for you, or...?`);
					} else if (V.dangerousPregnancy === 1) {
						if ((V.PC.belly > (V.PC.pregAdaptation * 3200)) || V.PC.bellyPreg >= 500000) {
							r.push(`I'll never not be disturbed by this. Assuming your womb just doesn't burst on its own, try to stay as still as you can and, um, avoid pointy objects?`);
						} else if ((V.PC.bellyPreg >= V.PC.pregAdaptation * 2200) || (V.PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2 && ft.age >= 20))) {
							r.push(`Hmm, your belly is pretty tight. Try to stay put as much as you can and don't move around too much. No strenuous activities, either! If you really need to do 'that', just take it slow.`);
						} else if (V.PC.bellyPreg > V.PC.pregAdaptation * 1000) {
							r.push(`Hmm, your belly is a little tight. Just take it easy and your pregnancy will progress without trouble.`);
						} else {
							r.push(`Your pregnancy is progressing smoothly.`);
						}
					} else {
						r.push(`Your pregnancy is progressing smoothly.`);
					}
				} else {
					r.push(`That urine sample you gave up has a surprise for you. <span class="pregnancy">Congratulations, you're pregnant!</span>`);
					V.PC.pregKnown = 1;
				}
			}
		}
		if ((V.PC.bellyPreg >= V.PC.pregAdaptation * 2200) || (V.PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2 && ft.age >= 20))) {
			r.push(`We have drugs that can delay birth to an extent, helping to avoid miscarriage and premature birth in at-risk mothers. With what I've seen, you're eligible for them. They aren't the healthiest things to take, however, and there are serious issues if you accidentally forget to stop taking them to allow for birth when you're due.`);
		}
		if (V.PC.preg > V.PC.pregData.normalBirth / 1.42 && V.PC.hips === -2 && V.PC.hipsImplant === 0) {
			r.push(`Your hips are a bit too narrow for birth and, assuming you manage, you will end up splitting your pelvis. You could take these tablets to boost the amount of relaxin in your system in an effort to widen your hips, but long term use will cause more problems than it's worth. It's up to you if you want to take them or just opt for a cesarean section.`);
		}

		// injuries
		if (V.PC.physicalImpairment > 0) {
			r.push(r.pop() + `" ${HeU} sighs, "No improvements to the physical damage...`);
		}

		if (V.PC.hears === -1) {
			r.push(`Hearing could be better...`);
		} else {
			r.push(`Hearing is fine...`);
		}
		if (anyVisionEquals(V.PC, 1)) {
			r.push(`Eyesight is poor...`);
			// Do something with laser eye surgery here?
		} else {
			r.push(`Eyesight, fine...`);
		}

		if (V.PC.energy > 95) {
			if (V.PC.actualAge <= 12) {
				r.push(`Anaphrodisiacs. I'm prescribing them to you. You are way too young to be doing things like that. Now I feel dirty thanks to you.`);
			} else {
				r.push(`I noticed your orgasm during the cancer screening. You've lost control of your sex drive, haven't you? I can prescribe anaphrodisiacs to you if you want to regain your composure.`);
			}
		}

		if (V.PC.addict > 3 || V.PC.aphrodisiacs > 0 || V.PC.inflationType === "aphrodisiac") {
			r.push(`The urinalysis tells me you've been hitting the aphrodisiacs. I hope you know the risks involved with that. I'm sure you do, but if you ever need any assistance with it, we do have detox pills available.`);
		}

		if (V.PC.chem > 5) {
			if (canEatFood(V.PC)) {
				r.push(`You've got some <span class="red">carcinogen buildup</span> according to your blood test. Whatever it is that you are doing to cause this, you should know that it is taking years off your life. It's hard to get rid of too, which is the real problem, but I think there is a diet that can help deal with it. Or at least there was, I don't know how easy it is to obtain the ingredients anymore.`);
			} else {
				r.push(`You've got some <span class="red">carcinogen buildup</span> according to your blood test. Your diet will neutralize most of it, given time. Still, you should probably cut back on whatever it is you're doing.`);
			}
		}

		if (V.week > 45 && V.PC.digestiveSystem === "atrophied") {
			r.push(`<span class="noteworthy">Some progress has been made when it comes to reversing the effects of long-term consumption of slave food.</span> It's best described as an intermediary diet to get your body used to real food again. From what I've heard, the process is horrible, and you can't stop once you start or you'll undo all your effort. Hmm, it also says not to give it to pregnant and nursing women, the infirm, and those with compromised immune systems. Oh, and that one should put on some body fat before starting, to help offset the whole starvation thing. The more I read, the worse it gets, but it may be worth considering, given your, you know, past.`);
		}
		r.push(`And that's all that's worth really noting."`);

		r.join(" ");
		App.Events.addNode(examDiv, r);

		return examDiv;
	}

	/**
	 * @returns {HTMLDivElement} a div that lets the player choose what drugs to take/stop taking
	 */
	function drugs() {
		const hormonesDiv = document.createElement("div");
		const playerDrugsDiv = document.createElement("div");
		const pregDrugsDiv = document.createElement("div");
		const anaphrodisiacDiv = document.createElement("div");
		const weaningDiv = document.createElement("div");

		App.Events.addParagraph(frag, [
			`"With that out of the way, ${V.PC.actualAge < V.minimumSlaveAge ? "I guess I should ask if there is anything our pharmacy could do for you, though I'm not entirely comfortable offering someone your age drugs like these. I guess you are legally an adult, for all intents and purposes, so my opinion doesn't really matter, does it" : "is there anything our pharmacy can help you with"}? A prescription will last as long as you keep refilling it, and overall it's a much safer choice than going under the knife at any of our neighbors or resorting to using drugs designed for slaves."`
		]);

		if (V.week > 45 && V.PC.digestiveSystem === "atrophied") {
			drugsDiv.append(slaveFoodCure());
		}

		if (V.consumerDrugs === 0) {
			drugsDiv.append(playerDrugs());
			drugsDiv.append(hormones());
		}
		if (V.PC.pregControl !== "none" || V.PC.bellyPreg >= V.PC.pregAdaptation * 2200 || (V.PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2 && ft.age >= 20))) {
			drugsDiv.append(pregDrugs());
		}
		if (V.PC.energy > 95 || V.PC.aphrodisiacs < 0) {
			drugsDiv.append(anaphrodisiacs());
		}

		return drugsDiv;

		/**
		 * @returns {HTMLDivElement} a div that lets the player choose what player grade drugs to take/stop taking
		 */
		function playerDrugs() {
			App.UI.DOM.appendNewElement("h3", playerDrugsDiv, `Drugs`);
			const text = [];
			const links = [];

			if (V.PC.drugs === "no drugs") {
				playerDrugsDiv.append(`You are not using any pharmaceutical drugs. Start taking: `);
			} else {
				playerDrugsDiv.append(`You are planning on taking ${V.PC.drugs}. Instead take: `);
			}

			if (V.PC.drugs !== "breast enhancers") {
				if (V.PC.boobs < 10000) {
					links.push(App.UI.DOM.link(`Breast enhancers`, () => {
						V.PC.drugs = "breast enhancers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				} else {
					links.push(App.UI.DOM.disabledLink(`Breast enhancers`, [
						`"Surely your back is already hurting? I can't advise going any larger, not that the patches would be effective anyway."`,
					]));
				}
			}
			if (V.PC.drugs !== "breast reducers") {
				if (App.Medicine.fleshSize(V.PC, 'boobs') >= 800) {
					links.push(App.UI.DOM.link(`Breast reducers`, () => {
						V.PC.drugs = "breast reducers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
			}
			if (V.PC.drugs !== "butt enhancers") {
				if (V.PC.butt < 8) {
					links.push(App.UI.DOM.link(`Butt enhancers`, () => {
						V.PC.drugs = "butt enhancers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				} else {
					links.push(App.UI.DOM.disabledLink(`Butt enhancers`, [
						`"Isn't it getting a bit hard for you to move? I can't advise going any larger, not that the patches would be effective anyway."`,
					]));
				}
			}
			if (V.PC.drugs !== "butt reducers") {
				if (V.PC.butt - V.PC.buttImplant >= 8) {
					links.push(App.UI.DOM.link(`Butt reducers`, () => {
						V.PC.drugs = "butt reducers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
			}
			if (V.PC.drugs !== "lip enhancers") {
				if (V.PC.lips <= 85) {
					links.push(App.UI.DOM.link(`Lip enhancers`, () => {
						V.PC.drugs = "lip enhancers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				} else {
					links.push(App.UI.DOM.disabledLink(`Lip enhancers`, [
						`"I can hear how difficult it is for you to form words with those lips. I'm not going to be the one that costs you the ability to talk."`,
					]));
				}
			}
			if (V.PC.drugs !== "lip reducers") {
				if (V.PC.lips - V.PC.lipsImplant > 85) {
					links.push(App.UI.DOM.link(`Lip reducers`, () => {
						V.PC.drugs = "lip reducers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
			}
			if (V.PC.drugs !== "penis enlargers") {
				if (V.PC.dick > 0) {
					if (V.PC.dick < 6) {
						links.push(App.UI.DOM.link(`Penis enlargers`, () => {
							V.PC.drugs = "penis enlargers";
							App.UI.DOM.replace(drugsDiv, drugs);
						}));
					} else {
						links.push(App.UI.DOM.disabledLink(`Penis enlargers`, [
							`"The lightheadedness you feel when you get aroused is mostly due to your current size, so getting larger will only make things worse."`,
						]));
					}
				}
			}
			if (V.PC.drugs !== "penis reducers") {
				if (V.PC.dick >= 6) {
					links.push(App.UI.DOM.link(`Penis reducers`, () => {
						V.PC.drugs = "penis reducers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
			}
			if (V.PC.drugs !== "testicle enlargers") {
				if (V.PC.balls > 0 && V.PC.scrotum > 0) {
					if (V.PC.balls < 30) {
						links.push(App.UI.DOM.link(`Testicle enlargers`, () => {
							V.PC.drugs = "testicle enlargers";
							App.UI.DOM.replace(drugsDiv, drugs);
						}));
					} else {
						links.push(App.UI.DOM.disabledLink(`Testicle enlargers`, [
							`I could diagnose you with elephantiasis and nobody would bat an eye over it. Really though, nothing I can say would help the patches actually work on you at that size.`,
						]));
					}
				}
			}
			if (V.PC.drugs !== "testicle reducers") {
				if (V.PC.balls >= 6) {
					links.push(App.UI.DOM.link(`Testicle reducers`, () => {
						V.PC.drugs = "testicle reducers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
			}
			if (V.PC.drugs !== "fertility supplements") {
				if (V.PC.ovaries === 1 || V.PC.mpreg === 1) {
					links.push(App.UI.DOM.link(`Fertility supplements`, () => {
						V.PC.drugs = "fertility supplements";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				} else {
					links.push(App.UI.DOM.disabledLink(`Fertility supplements`, [
						`It would be a waste of drugs to give these to someone that doesn't even have the organs needed to produce eggs.`,
					]));
				}
			}
			if (V.PC.drugs !== "hip wideners") {
				if (V.PC.preg > V.PC.pregData.normalBirth / 1.42 && V.PC.hips === -2 && V.PC.hipsImplant === 0) {
					links.push(App.UI.DOM.link(`Hip wideners`, () => {
						V.PC.drugs = "hip wideners";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
			}
			if (V.PC.drugs !== "detox pills") {
				if (V.PC.addict > 3) {
					links.push(App.UI.DOM.link(`Detox pills`, () => {
						V.PC.drugs = "detox pills";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
			}

			text.push(App.UI.DOM.generateLinksStrip(links));

			App.Events.addNode(playerDrugsDiv, text);

			return playerDrugsDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div that lets the player take/stop taking hormonal drugs
		 */
		function hormones() {
			App.UI.DOM.appendNewElement("h3", hormonesDiv, `Hormones`);
			const text = [];
			const links = [];

			if (V.PC.hormones !== 0) {
				hormonesDiv.append(`You are planning to use ${V.PC.hormones === 1 ? "female" : "male"} hormones this week. `);
				links.push(App.UI.DOM.link(`Decide against it`, () => {
					V.PC.hormones = 0;
					App.UI.DOM.replace(drugsDiv, drugs);
				}));
			} else {
				hormonesDiv.append(`You do not intend to take artificial hormones. `);
			}
			if (V.PC.hormones > -1) {
				links.push(App.UI.DOM.link(`Start male hormones`, () => {
					V.PC.hormones = -1;
					App.UI.DOM.replace(drugsDiv, drugs);
				}));
			}
			if (V.PC.hormones < 1) {
				links.push(App.UI.DOM.link(`Start female hormones`, () => {
					V.PC.hormones = 1;
					App.UI.DOM.replace(drugsDiv, drugs);
				}));
			}

			text.push(App.UI.DOM.generateLinksStrip(links));
			App.Events.addNode(hormonesDiv, text);

			return hormonesDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div that lets the player toggle the use of labor suppressors
		 */
		function pregDrugs() {
			App.UI.DOM.appendNewElement("h3", pregDrugsDiv, `Pregnancy Drugs`);
			const text = [];

			if (V.PC.pregControl === "none") {
				pregDrugsDiv.append(`You've been advised to start taking labor suppressors. `);
				text.push(
					App.UI.DOM.link(`Follow ${hisU} advice`, () => {
						V.PC.pregControl = "labor suppressors";
						App.UI.DOM.replace(drugsDiv, drugs);
					})
				);
			} else {
				pregDrugsDiv.append(`You're taking labor suppressors to ${V.PC.preg >= V.PC.pregData.normalBirth ? "delay giving birth" : "prevent giving birth prematurely"}. `);
				text.push(
					App.UI.DOM.link(`Decide against it`, () => {
						V.PC.pregControl = "none";
						App.UI.DOM.replace(drugsDiv, drugs);
					})
				);
			}


			App.Events.addNode(pregDrugsDiv, text);

			return pregDrugsDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div that lets the player toggle the use of anaphrodisiacs
		 */
		function anaphrodisiacs() {
			const text = [];

			App.UI.DOM.appendNewElement("h3", anaphrodisiacDiv, `Anaphrodisiacs`);

			if (V.PC.aphrodisiacs < 0) {
				anaphrodisiacDiv.append(`You plan on taking anaphrodisiacs to rein in your sex drive. `);
				text.push(
					App.UI.DOM.link(`Decide against it`, () => {
						V.PC.aphrodisiacs = 0;
						App.UI.DOM.replace(drugsDiv, drugs);
					})
				);
			} else {
				anaphrodisiacDiv.append(`You've been offered an anaphrodisiac prescription to combat your nymphomania. `);
				text.push(
					App.UI.DOM.link(`Take ${hisU} offer`, () => {
						V.PC.aphrodisiacs = -1;
						App.UI.DOM.replace(drugsDiv, drugs);
					})
				);
			}

			App.Events.addNode(anaphrodisiacDiv, text);

			return anaphrodisiacDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div that lets the player go on a diet that weans them off slave food
		 */
		function slaveFoodCure() {
			const text = [];

			App.UI.DOM.appendNewElement("h3", weaningDiv, `Diet`);
			weaningDiv.append(`You have been given the opportunity to eat real food again. `);
			if (V.PC.preg > 0) {
				text.push(App.UI.DOM.disabledLink(`Start the process`, [
					`It would be unethical to allow you to start this diet while pregnant.`,
				]));
			} else if (V.PC.health.condition <= 20) {
				text.push(App.UI.DOM.disabledLink(`Start the process`, [
					`In your condition, this diet will have a deleterious effect on your health.`,
				]));
			} else if (V.PC.health.illness > 1) {
				text.push(App.UI.DOM.disabledLink(`Start the process`, [
					`This diet will decimate your health, and with you ill, well... It won't end well.`,
				]));
			} else if (V.PC.weight < -10) {
				text.push(App.UI.DOM.disabledLink(`Start the process`, [
					`Put on a little weight first. I'd hate to see you starve to death or be forced to give up halfway.`,
				]));
			} else {
				text.push(
					App.UI.DOM.link(`Start the process`, () => {
						V.PC.diet = "weaning";
						App.UI.DOM.replace(drugsDiv, drugs);
					})
				);
			}

			App.Events.addNode(weaningDiv, text);

			return weaningDiv;
		}
	}

	/**
	 * increases the players health by 5
	 * @returns {HTMLDivElement} a div that shows the flavor text of a small boost to the players health
	 */
	function healthBoost() {
		const text = [];

		text.push(`${HeU} gives you a quick prick with a syringe. "${V.PC.actualAge > 12 ? `Here's a little something to <span class="health inc">help your health.</span> It's just a quick pick-me-up, but perhaps it will get you back on track` : `That's a good ${girlP}, that wasn't so bad, was it? Here, have a lollipop to feel better. As for the shot, it should <span class="health inc">improve your health a little,</span> and hopefully set you on the road to recovery`}."`);
		improveCondition(V.PC, 5);

		App.Events.addNode(treatDiv, text);

		return treatDiv;
	}

	/**
	 * reduces the players illness by 2 (with a floor of 0)
	 * @returns {HTMLDivElement} a div that shows the flavor text for a reduction in the players illness
	 */
	function treatIllness() {
		const text = [];

		text.push(`${HeU} hands you a pill bottle. "${V.PC.actualAge > 12 ? `These should <span class="health inc">get that illness under control.</span> Take them with food, three times a day, and you should be feeling a lot better by the time they run out` : `Take one of these with your breakfast, lunch and dinner, alright? Keep doing that until they're all gone and that <span class="health inc">illness should stop making you feel so bad.</span> Make sure you take all of them, too! Just because you start to feel fine doesn't mean you're cured yet`}."`);
		V.PC.health.illness = Math.max(0, V.PC.health.illness-2);

		App.Events.addNode(illnessDiv, text);

		return illnessDiv;
	}
};
