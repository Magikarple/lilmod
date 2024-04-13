// cSpell:ignore orphanloli

App.Events.REMalefactor = class REMalefactor extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologyUpgrade.drones === 1
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return (V.rep / 150) > (random(1, 100)) ? 2 : 1; // Chance to have doubled odds.
	}

	execute(node) {
		let r = [];
		/** @type {FC.Race} */
		let fakeRace;
		/** @type {FC.Race} */
		let realRace;
		App.UI.StoryCaption.encyclopedia = "Free Cities Justice";

		/** @type {Array<"addict"|"whore"|"businesswoman"|"liberator"|"anchorBaby"|"mule"|"rapist"|"orphanloli"|"escapee"|"passfail">} */
		const malefactorArray = ["addict", "whore"];
		if (V.seeDicks !== 100) {
			malefactorArray.push("businesswoman");
			malefactorArray.push("liberator");
			if (V.seePreg !== 0) {
				malefactorArray.push("anchorBaby");
				if (V.arcologies[0].FSRepopulationFocus < 50) {
					malefactorArray.push("mule");// blends right in
				}
			}
		}
		if (V.seeDicks !== 0) {
			malefactorArray.push("rapist");
		}
		if (V.minimumSlaveAge <= 12) {
			malefactorArray.push("orphanloli");
		}
		if (V.arcologies[0].FSPaternalist < 50) {
			malefactorArray.push("escapee");
		}
		if (V.arcologies[0].FSSupremacistLawME + V.arcologies[0].FSSubjugationistLawME > 0) {
			malefactorArray.push("passfail");
		}
		const malefactor = malefactorArray.random();

		/** @type {App.Entity.SlaveState} */
		const slave = makeMalefactor();

		const {
			He, His,
			he, his, him, himself, girl, woman
		} = getPronouns(slave);

		const {hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		r.push(`${capFirstChar(V.assistant.name)} alerts you that a`);
		if (malefactor === "mule") {
			r.push(`potential`);
		}
		r.push(`criminal has been detected by your security systems and detained by the drones. Crime is extremely uncommon in your arcology,`);
		if (malefactor !== "liberator") {
			r.push(`since nothing can escape the notice of the omnipresent monitoring systems.`);
		}

		switch (malefactor) {
			case "addict":
				r.push(`Criminals are usually either too angry, too ignorant, or too stupid to understand the impossibility of successful petty crime. This is the latter situation; a ${girl} suffering severe aphrodisiac withdrawal has attempted to break into a store that sells the stuff. ${He}'s now lying`);
				if (V.seePee === 1) {
					r.push(`in a pool of ${his} own urine`);
				} else {
					r.push(`face-down on the pavement`);
				}
				r.push(`with a taser round stuck in ${his} ass; the drone responsible is hovering helpfully nearby, hitting ${him} with another shock whenever ${he} does more than twitch.`);
				break;
			case "escapee":
				r.push(`This is a simple case of vagrancy; sleeping on the streets (due to penury rather than inebriation) breaks an implicit contract all visitors to the arcology sign by coming here. The criminal is anything but usual, however. ${He} bears signs of extreme hormone manipulation over a long period, and has had ${his} Achilles tendons clipped. Camera records show ${him} crawling in with a cargo shipment. ${He}'s clad in rags, and you cannot find any record of ${him} anywhere. The growing crowd is convinced ${he}'s an escaped slave, and is growing ugly.`);
				break;
			case "anchorBaby":
				r.push(`This is likely another case of attempted escape by a slave or potentially a smuggling operation. The cause of detection is a steady stream of moaning emanating from a cargo container recently deposited into the arcology's cargo depot and has attracted a crowd of curious onlookers. Video feeds show the container being open and a heavily pregnant`);
				if (slave.physicalAge > 30) {
					r.push(`${woman}`);
				} else if (slave.physicalAge > 19) {
					r.push(`young ${woman}`);
				} else if (slave.physicalAge > 12) {
					r.push(`teenager`);
				} else {
					r.push(`little ${girl}`);
				}
				r.push(`staggering out while clutching a newborn to ${his} breast and struggling to hold back ${his} second child from being born. From what little language ${he} knows, ${he} seems to think that just giving birth in your arcology is enough to become a proper citizen; as expected, ${he} squats and pushes out the other brat as you arrive. The growing crowd is becoming unruly, and ${his} inability to speak the language isn't helping; things could get ugly at any moment and hinge entirely on your next move.`);
				break;
			case "orphanloli":
				r.push(`This is a simple case of vagrancy; sleeping on the streets (due to penury rather than inebriation) breaks an implicit contract all visitors to the arcology sign by coming here. Several reports of petty theft were made in the area recently as well. The criminal is anything but usual, however. ${He} is very young, emaciated, and desperate. Camera records show ${him} crawling in through an air vent. ${He}'s clad in rags, clutching a presumably stolen apple, and you cannot find any record of ${him} anywhere. The growing crowd is convinced ${he}'s an escaped slave, and ${his} inability to speak the language isn't helping; things could get ugly at any moment and hinge entirely on your next move.`);
				break;
			case "businesswoman":
				r.push(`Nevertheless, it seems one of your tenants, a hitherto well-respected business${woman}, has left the straight and narrow. It seems ${his} business affairs took a decisive turn for the worse, so ${he} attempted to drain ${his} clients' funds and leave your arcology before anyone was the wiser. Unfortunately for ${him}, your security drones, controlled by ${V.assistant.name}, were very much the wiser. ${capFirstChar(V.assistant.name)} has with machine efficiency compiled the completest proofs of corporate malfeasance you have ever seen. Your wretched tenant signed a contract with you that included provisions forbidding theft. ${He} is entirely at your mercy.`);
				break;
			case "whore":
				r.push(`Nevertheless, it seems one of your tenants, a free whore, has been systematically stealing from clients. ${He} was furtive enough to get away with it for a time, but has now been caught red-handed. The john who caught ${him} attempted to stop ${him}, and ${he} fought him. Like many prostitutes ${he} carried a weapon in ${his} handbag, and the man is severely wounded. ${capFirstChar(V.assistant.name)} has with machine efficiency compiled a staggering dossier of video logs and personal testimony from previous customers who now understand where their personal belongings went, as well as appalling footage of today's victim's injuries. Your wretched tenant signed a contract with you that included provisions forbidding this kind of thing. ${He} is entirely at your mercy.`);
				break;
			case "rapist":
				r.push(`Nevertheless, it seems one of your tenants saw fit to rape a free woman. Within ten minutes, the inhuman efficiency of ${V.assistant.name} has compiled video recordings, physical evidence, and even the victim's testimony, which is quite consistent with the first two. Your wretched tenant signed a contract with you that included provisions forbidding this kind of thing. ${He} is entirely at your mercy.`);
				break;
			case "mule":
				r.push(`However some individuals still make attempts to fool them. In this case, the cameras are fixed on a clearly pregnant, and hugely at that, ${woman} as ${he} works ${his} way through the crowded market sectors. You watch as ${he} repeatedly bumps into other patrons and stalls, pausing to apologize before proceeding on ${his} way, as if ${he} wasn't familiar with ${his} gravid swell. ${His} body is also clearly underdeveloped for someone ready to drop quadruplets at any moment; thin, with barely any hips to speak of and a pert bust clearly not swollen with milk. ${He} even walks like a ${woman} not burdened with nine months of gestating multiples, let alone a single. As ${he} stumbles under ${his} own weight, ${his} shirt rides up, giving you a clear view of the deep red stretch marks of a belly that grew far faster than it could handle. You've seen enough and order the drones to corral ${him} until security arrives. ${His} expression shifts from fear as they encircle ${him} to panic as a groan escapes ${his} lips. ${He} grabs ${his} stomach as a capsule falls to the floor. As another contraction hits ${him}, ${he} drops to the ground and begins to "give birth" to ${his} illegal cargo.`);
				if (V.bellyImplants === 1) {
					r.push(`${He} likely has a belly implant designed to carry foreign objects inside ${his} womb and, having lost ${his} composure, is now vacating its contents.`);
				} else {
					r.push(`You have no idea what you are witnessing until`);
					if (V.assistant.name === "your personal assistant") {
						r.push(`your personal assistant pulls up an advertisement for a fillable womb located implant`);
					} else {
						r.push(`${V.assistant.name} introduces you to a fillable womb located implant`);
					}
					r.push(`that ${he} likely has installed.`);
				}
				r.push(`${He} is easily taken into custody and ${his} contraband confiscated once the jeering crowd is dispersed enough to reach ${him}.`);
				break;
			case "liberator":
				r.push(`but this is a special case. A well-muscled, well-armed ${woman} was caught attempting to smuggle a slave owned by one of your tenants out of the arcology. Though the slave surrendered immediately (and will be dealt with by ${hisU} owner), the would-be liberatrix was caught by your security drones. ${He} destroyed two of them and caused <span class="red">other minor damage</span> that will require a small sum to repair, but was eventually subdued. The drones had to expend a great deal of nonlethal ordnance to bring ${him} down and keep ${him} down, but ${he} is now entirely at your mercy.`);
				cashX(forceNeg(1000), "event", slave);
				break;
			case "passfail":
				r.push(`Nevertheless, it seems one of your tenants, a rather ordinary white collar worker, has been severely wounded in a freak industrial accident, to the point that a blood transfusion was needed. In the course of doing so, an arcology hospital's autosurgery noted several genetic discrepancies and alerted a few nearby drones. Simply put, while the ${woman} appears to be a normal ${fakeRace} ${woman}, this is the result of numerous cosmetic surgeries; ${he} is actually ${realRace}. The laws of your arcology hold that members of the ${realRace} race are fit only for slavery, quite unlike the superior ${fakeRace} people. That a ${addA(realRace)} ${girl} would gain a position of relatively high class and power through such deception and fraud is considered an outrage by many of your citizens, and so ${he} was placed under arrest before ${he} even awoke from surgery. ${He} is now entirely at your mercy.`);
		}

		const contractCost = 1000;
		const cost = slaveCost(slave) - 1000;
		App.Events.addParagraph(node, r);

		App.UI.DOM.appendNewElement("p", node, `Applying enslavement as punishment will cost ${cashFormat(contractCost)}. Doing so and then selling ${him} immediately will bring in approximately ${cashFormat(cost)}.`, ["note"]);
		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];
		if (V.cash >= contractCost) {
			choices.push(
				new App.Events.Result(`Enslave ${him}`, enslave),
				new App.Events.Result(`Sentence ${him} to a day in the stocks, then enslave ${him}`, stocks),
			);
			if (V.arcade > 0) {
				choices.push(new App.Events.Result(`Enslave ${him} and sentence ${him} to a month in the arcade`, arcade));
			}
			if (malefactor !== "mule") {
				if (V.dairy > 0) {
					if (V.dairyRestraintsSetting > 1) {
						choices.push(new App.Events.Result(`Enslave ${him} and send ${him} straight to the industrial dairy`, dairy));
					}
				}
			}
			if (V.seeExtreme > 0) {
				choices.push(new App.Events.Result(`Punitively amputate ${his} limbs, and then enslave ${him}`, amp));
				if (malefactor === "rapist" && slave.balls > 0) {
					choices.push(new App.Events.Result(`Enslave the criminal and geld ${him}`, geld));
				}
			}
			if (malefactor === "orphanloli") {
				choices.push(new App.Events.Result(`Adopt ${him}`, adopt));
			}
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		if (malefactor === "anchorBaby") {
			choices.push(new App.Events.Result(`Grant ${him} citizenship`, citizenship));
		}
		choices.push(new App.Events.Result(`Publicly flog the criminal`, flog));
		if (malefactor === "liberator") {
			choices.push(new App.Events.Result(`Permit the slaveowner ${he} tried to steal from to flog ${him}`, ownerFlog));
		}

		choices.push(new App.Events.Result(`Sell ${him} immediately`, sell));

		App.Events.addResponses(node, choices);

		function enslave() {
			const frag = document.createDocumentFragment();
			r = [];

			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			switch (malefactor) {
				case "addict":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. The condemned recovers enough by the end of the process to start masturbating weakly, even as ${he} begins begging for a fix. Then it's off to the penthouse for basic slave induction.`);
					break;
				case "escapee":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. ${He} remains limp throughout the process, only recovering enough to barely grasp the situation as ${he} is enslaved.`);
					break;
				case "orphanloli":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. ${He} sobs throughout the process, though stops once ${he} realizes being a slave means free food.`);
					break;
				case "anchorBaby":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. ${He} doesn't stop screaming "citizenship" until ${his} children are taken from ${him} and ${he} is shoved off to the penthouse for basic slave induction.`);
					break;
				case "businesswoman":
				case "mule":
				case "passfail":
				case "rapist":
				case "whore":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. The condemned sobs and begs throughout the process until you grow tired of the whining and apply punishment. Then it's off to the penthouse for basic slave induction.`);
					break;
				case "liberator":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. Though the would-be liberator is of course restrained, disarmed, and still sedated, ${he} could awake at any time. Based on the drone logs, ${he} is likely to be violent when ${he} does.`);
			}
			r.push(App.UI.newSlaveIntro(slave));

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function stocks() {
			const frag = document.createDocumentFragment();
			r = [];

			healthDamage(slave, 10);
			slave.behavioralFlaw = "odd";
			slave.sexualFlaw = "hates penetration";
			slave.anus = 2;
			const fuckCount = random(20, 35);
			seX(slave, "anal", "public", "penetrative", fuckCount);
			if (slave.vagina > -1) {
				if (slave.vagina < 2) {
					slave.vagina = 2;
				}
				if (isFertile(slave) && slave.eggType === "human") {
					r.push(knockMeUp(slave, 40, 2, -2));
				}
				seX(slave, "vaginal", "public", "penetrative", fuckCount * 2);
			}
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			switch (malefactor) {
				case "addict":
					r.push(`You declare ${his} holes fair game for the entire arcology, since ${he} must somehow repay ${his} debt to society. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
					break;
				case "escapee":
					r.push(`You declare ${his} holes fair game for the entire arcology, so that all free citizens can own ${him} for a moment, if they wish. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
					break;
				case "orphanloli":
					r.push(`You declare ${his} holes fair game for the entire arcology, so that all free citizens can own ${him} for a moment, if they wish. ${He} spends a torturous day in the stocks before being hauled in for enslavement, <span class="health dec">completely broken</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
					applyMindbroken(slave, slave.intelligence);
					break;
				case "anchorBaby":
					r.push(`You declare ${his} holes fair game for the entire arcology; since ${he} wants to produce future slaves, your arcology might as well have the privilege of fathering them. ${He} spends a torturous day in the stocks after ${his} children are taken to a slave orphanage before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
					break;
				case "businesswoman":
					r.push(`You declare ${his} holes fair game for the entire arcology, in payment for ${his} crimes. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
					break;
				case "whore":
					r.push(`You declare ${his} holes fair game for the entire arcology, to repay ${his} thefts. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
					break;
				case "rapist":
					r.push(`You declare ${his} holes fair game for the entire arcology. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
					break;
				case "mule":
					r.push(`You declare ${his} holes fair game for the entire arcology as punishment for trying to smuggle in a load instead of taking one. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
					break;
				case "liberator":
					r.push(`Slaveownership is the cornerstone of the society you're building in your arcology, and this ${woman} attempted to undermine it. ${His} holes are thus fair game for the entire arcology. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun,</span> and small slaveholders are <span class="green">encouraged to do business with your arcology</span> after word of the incident gets around.`);
					break;
				case "passfail":
					r.push(`You declare ${his} holes fair game for the entire arcology; after all, ${he} did want to be around lots of ${fakeRace} people, didn't ${he}? ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(slave.vagina > -1) ? ' and <span class="lime">fucked-out</span> pussy' : ""}. The public <span class="reputation inc">enjoys the fun.</span>`);
			}
			repX(500, "event", slave);
			V.arcologies[0].prosperity += 2;
			r.push(App.UI.newSlaveIntro(slave));

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function arcade() {
			const frag = document.createDocumentFragment();
			r = [];

			r.push(assignJob(slave, "be confined in the arcade"));
			slave.choosesOwnAssignment = 0;
			slave.sentence = 4;
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			switch (malefactor) {
				case "addict":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. The condemned recovers enough by the end of the process to start masturbating weakly, even as ${he} begins begging for a fix. When ${he} learns ${he}'s headed to the arcade, ${he} actually relaxes a little, having heard the whores there get drugs. The public <span class="reputation inc">looks forward</span> to seeing ${him} there, especially the owner of the shop ${he} attempted to burglarize.`);
					break;
				case "escapee":
				case "orphanloli":
					r.push(`You complete the legalities and biometric scanning quickly, and tell the crowd that ${his} holes will be available at the arcade within the hour. The public <span class="reputation inc">looks forward</span> to seeing ${him} there, angrily suspecting ${him} of being an escapee and glad that they'll be able to take part in ${his} punishment.`);
					break;
				case "anchorBaby":
					r.push(`You complete the legalities and biometric scanning quickly and have ${his} children taken away. The condemned screeches ${his} displeasure throughout the process until you grow tired of the whining and sedate ${him} for immurement in the arcade. The public <span class="reputation inc">looks forward</span> to seeing ${him} there and vying to see who gets to fill ${his} womb with another child.`);
					break;
				case "businesswoman":
				case "mule":
				case "passfail":
				case "rapist":
				case "whore":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. The condemned sobs and begs throughout the process until you grow tired of the whining and sedate ${him} for immurement in the arcade. The public <span class="reputation inc">looks forward</span> to seeing ${him} there and getting some of their own back.`);
					break;
				case "liberator":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. Though the would-be liberator is of course restrained, disarmed, and still sedated, ${he} could awake at any time. It would be best to have ${him} restrained for public use in the arcade first. The public <span class="reputation inc">looks forward</span> to seeing ${him} there.`);
			}
			repX(250, "event", slave);
			newSlave(slave); /* skip New Slave Intro */

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function dairy() {
			const frag = document.createDocumentFragment();
			r = [];

			r.push(assignJob(slave, "work in the dairy"));
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			switch (malefactor) {
				case "addict":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. The condemned accepts a sedative, thinking it's aphrodisiacs, and ${his} unconscious body is installed in ${V.dairyName}. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the addict's`);
					if (V.dairyStimulatorsSetting > 1) {
						r.push(`agony as ${his} anus adapts to accommodate rectal dildo hydration,`);
					} else if ((V.dairyPregSetting > 1) && (slave.vagina > 0)) {
						r.push(`discomfort as ${his} pussy adapts to industrial reproduction,`);
					} else {
						r.push(`breasts as they are roughly milked,`);
					}
					r.push(`together with a lengthy report on the experimental detox process used to ensure that the milk ${he} produces will be untainted.`);
					break;
				case "escapee":
					r.push(`You complete the legalities and biometric scanning quickly. The condemned is too far gone to resist as ${he} is installed in ${V.dairyName}. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the escapee's`);
					if (V.dairyStimulatorsSetting > 1) {
						r.push(`agony as ${his} anus adapts to accommodate rectal dildo hydration.`);
					} else if ((V.dairyPregSetting > 1) && (slave.vagina > 0)) {
						r.push(`discomfort as ${his} pussy adapts to industrial reproduction.`);
					} else {
						r.push(`breasts as they are roughly milked.`);
					}
					break;
				case "orphanloli":
					r.push(`You complete the legalities and biometric scanning quickly. The condemned is too weak to resist as ${he} is installed in ${V.dairyName} but ${he} weeps the entire time. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the escapee's`);
					if (V.dairyStimulatorsSetting > 1) {
						r.push(`agony as ${his} anus adapts to accommodate rectal dildo hydration.`);
					} else if ((V.dairyPregSetting > 1) && (slave.vagina > 0)) {
						r.push(`agony as ${his} once tight pussy adapts to industrial reproduction.`);
					} else {
						r.push(`budding breasts as they are roughly milked.`);
					}
					break;
				case "anchorBaby":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously before having ${his} children taken away. The condemned resists installation in ${V.dairyName} with energy born of desperation. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the criminal's`);
					if (V.dairyPregSetting > 1 && slave.vagina > 0) {
						r.push(`discomfort as ${his} pussy adapts to industrial reproduction, along with a prospectus detailing the scheduled sale of ${his} next batch of slave product in eighteen years and nine months.`);
					} else if (V.dairyStimulatorsSetting > 1) {
						r.push(`agony as ${his} anus adapts to accommodate rectal dildo hydration.`);
					} else {
						r.push(`breasts as they are roughly milked.`);
					}
					break;
				case "businesswoman":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. The condemned resists installation in ${V.dairyName} with energy born of desperation. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the criminal's`);
					if (V.dairyPregSetting > 1 && slave.vagina > 0) {
						r.push(`discomfort as ${his} pussy adapts to industrial reproduction, along with a prospectus detailing the scheduled sale of ${his} first slave product in eighteen years and nine months.`);
					} else if (V.dairyStimulatorsSetting > 1) {
						r.push(`agony as ${his} anus adapts to accommodate rectal dildo hydration.`);
					} else {
						r.push(`breasts as they are roughly milked.`);
					}
					break;
				case "whore":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. The condemned resists installation in ${V.dairyName} with energy born of desperation. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the criminal's`);
					if (V.dairyPregSetting > 1 && slave.vagina > 0) {
						r.push(`discomfort as ${his} well-traveled pussy adapts to industrial reproduction.`);
					} else if (V.dairyStimulatorsSetting > 1) {
						r.push(`discomfort as ${his} well-traveled anus adapts to accommodate rectal dildo hydration.`);
					} else {
						r.push(`breasts as they are roughly milked.`);
					}
					break;
				case "rapist":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. The condemned resists installation in ${V.dairyName} with energy born of desperation. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the rapist's`);
					if (V.dairyStimulatorsSetting > 1) {
						r.push(`agony as ${his} anus adapts to accommodate rectal dildo hydration.`);
					} else {
						r.push(`newly growing breasts as they are roughly milked.`);
					}
					break;
				case "liberator":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. The condemned resists installation in ${V.dairyName} with energy born of desperation. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the criminal's`);
					if (V.dairyPregSetting > 1 && slave.vagina > 0) {
						r.push(`discomfort as ${his} pussy adapts to industrial reproduction,`);
					} else if (V.dairyStimulatorsSetting > 1) {
						r.push(`discomfort as ${his} anus adapts to accommodate rectal dildo hydration,`);
					} else {
						r.push(`breasts as they are roughly milked,`);
					}
					r.push(`together with a report on the likely productivity of such a fit body capable of withstanding the stress of high throughput.`);
					break;
				case "passfail":
					r.push(`You complete the legalities and biometric scanning quickly. The condemned is too weak to resist as ${he} is installed in ${V.dairyName} but ${he} weeps the entire time. The public <span class="reputation inc">accepts</span> this as an appropriate punishment, especially when you release footage of the criminal's`);
					if (V.dairyPregSetting > 1 && slave.vagina > 0) {
						r.push(`discomfort as ${his} pussy adapts to industrial reproduction.`);
					} else if (V.dairyStimulatorsSetting > 1) {
						r.push(`discomfort as ${his} anus adapts to accommodate rectal dildo hydration.`);
					} else {
						r.push(`breasts as they are roughly milked.`);
					}
			}
			repX(250, "event", slave);
			newSlave(slave);/* skip New Slave Intro */

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function amp() {
			const frag = document.createDocumentFragment();
			r = [];

			healthDamage(slave, 20);
			removeLimbs(slave, "all");
			slave.behavioralFlaw = "odd";
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			switch (malefactor) {
				case "addict":
					r.push(`An example must be made. Free people must understand that criminals who commit outrages against them will be severely punished. The protesting malefactor is stripped and stuffed into your remote surgery on public video feed. ${He} begs for a fix until ${he} realizes what's coming, at which point ${he} switches to fighting vainly to escape. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "escapee":
					r.push(`An example must be made. If ${he} escaped once with ${his} tendons clipped, ${he} must be rather talented at it. It remains to be seen if ${he} can manage to escape with neither arms nor legs, so you announce ${his} sentence to the crowd and send ${his} unconscious form for reduction. Of course, <span class="health dec">${his} health is affected.</span> The public <span class="reputation inc">approves of this harshness,</span> believing that you have taken strong measures against escapees.`);
					break;
				case "orphanloli":
					r.push(`An example must be made. If ${he} thinks ${he} can escape captivity and steal to survive, let's see ${him} try without arms and legs, so you announce ${his} sentence to the crowd and send ${his} unconscious form for reduction. Of course, <span class="health dec">${his} health is affected.</span> The public <span class="reputation inc">approves of this harshness,</span> believing that you have taken strong measures against escapees.`);
					break;
				case "anchorBaby":
					r.push(`An example must be made. Potential immigrants must understand that attempting to circumvent the process will result in severe fines and proportional punishment when they are incapable of paying them. The protesting mother is stripped, both of clothing and children, and stuffed into your remote surgery on public video feed. ${He} begs and pleads until ${he} sees ${his} doom in the form of the surgical machinery, at which point ${he} switches to fighting vainly to escape. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness,</span> since ${he} can hardly attempt to smuggle things into your arcology without the ability to move.`);
					break;
				case "businesswoman":
					r.push(`An example must be made. Free people must understand that criminals who commit outrages against them will be severely punished. The protesting malefactor is stripped and stuffed into your remote surgery on public video feed. ${He} begs and pleads until ${he} sees ${his} doom in the form of the surgical machinery, at which point ${he} switches to fighting vainly to escape. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "whore":
					r.push(`An example must be made. Free people must understand that criminals who commit outrages against them will be severely punished. The protesting malefactor is stripped and stuffed into your remote surgery on public video feed. ${He} begs and pleads until ${he} sees ${his} doom in the form of the surgical machinery, at which point ${he} switches to fighting vainly to escape. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness,</span> since ${he} can hardly attempt to steal anything without hands.`);
					break;
				case "rapist":
					r.push(`An example must be made. Rape is rare in your arcology, since citizens are so generously provided with means of sexual outlet. When the price of renting a slave that's impossible to rape is as low as it is, sexual assault of a free woman is doubly unforgivable. The protesting malefactor is stripped and stuffed into your remote surgery on public video feed. ${He} begs and pleads until ${he} sees ${his} doom in the form of the surgical machinery, at which point ${he} switches to fighting vainly to escape. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness,</span> since even if ${he} cheers up and ever manages an erection again, ${he}'s not likely to rape anyone without arms or legs.`);
					break;
				case "mule":
					r.push(`An example must be made. With the quantity of drugs consumed in the arcology, quality is everything and attempting to undermine that is unforgivable. The protesting malefactor is stripped and stuffed into your remote surgery on public video feed. ${He} begs and pleads until ${he} sees ${his} doom in the form of the surgical machinery, at which point ${he} switches to fighting vainly to escape. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness,</span> since ${he} can hardly haul contraband into your arcology without the ability to move ${himself}.`);
					break;
				case "liberator":
					r.push(`An example must be made. Slaveownership is the cornerstone of the society you're building in your arcology, and this ${woman} attempted to undermine it. The protesting malefactor is stripped and stuffed into your remote surgery on public video feed. ${He} begs and pleads until ${he} sees ${his} doom in the form of the surgical machinery, at which point ${he} switches to fighting vainly to escape. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness,</span> since ${he} will scarcely be able to liberate anyone without arms or legs.`);
					break;
				case "passfail":
					r.push(`An example must be made. The citizens of your arcology must be assured that the racially inferior will not try to rise above their station, no matter their deceptions. The protesting malefactor is stripped and stuffed into your remote surgery on public video feed. ${He} begs and pleads until ${he} sees ${his} doom in the form of the surgical machinery, at which point ${he} switches to fighting vainly to escape. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness.</span>`);
			}
			repX(500, "event", slave);
			r.push(App.UI.newSlaveIntro(slave));

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function geld() {
			const frag = document.createDocumentFragment();
			r = [];

			healthDamage(slave, 20);
			slave.balls = 0;
			slave.devotion -= 25;
			slave.trust -= 25;
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`Video feeds from your remote surgery are made public as the protesting criminal is strapped down and gelded. ${He} is so utterly broken by this turn of events that you complete the legalities and biometric scanning without fuss. The condemned sobs weakly throughout the process until you grow tired of the whining and apply punishment. Then it's off to the penthouse for basic slave induction. The public <span class="reputation inc">approves of this harshness,</span> which increases your arcology's prosperity by <span class="green">giving it a reputation for swift and terrible justice.</span>`);
			repX(500, "event", slave);
			V.arcologies[0].prosperity += 10;
			r.push(App.UI.newSlaveIntro(slave));

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function adopt() {
			const frag = document.createDocumentFragment();
			r = [];

			slave.devotion = 25;
			slave.trust = 25;
			V.RECheckInIDs.push({ID: slave.ID, type: "adoptFollowUp"});
			slave.origin = "$He was an orphan forced to live and steal on the streets until you adopted $him.";

			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You sit down and talk to the exhausted ${girl}, handing ${him} a contract cleverly altered to resemble adoption papers. Once ${he} comprehends what ${he} is looking at, ${he} eagerly signs it. Only once ${he} has reached the penthouse and been introduced to the slave life does ${he} realize ${he} willingly signed away ${his} freedom. Though ${he} can't complain. A warm cot and plenty of food await, which to ${him} is a huge improvement over a slow death on the streets. The public`);
			if (FutureSocieties.isActive('FSPaternalist')) {
				r.push(`<span class="reputation inc">is impressed by your act,</span> even if it is a trick.`);
				repX(500, "event", slave);
			} else {
				r.push(`<span class="red">feels you let this criminal off too easy.</span>`);
				repX(forceNeg(100), "event", slave);
			}
			r.push(App.UI.newSlaveIntro(slave));

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function citizenship() {
			const frag = document.createDocumentFragment();
			r = [];

			r.push(`You help the exhausted mother to ${his} feet and hand ${him} ${his} second newborn. ${He} watches you, uncertain of your motives, until you have ${him} escorted to the proper welcoming facility and put in a good word for having ${him} added to your arcology's free population. You announce to the public that such a fertile`);
			if (slave.physicalAge > 30) {
				r.push(`MILF`);
			} else if (slave.physicalAge > 19) {
				r.push(`${woman}`);
			} else if (slave.physicalAge > 12) {
				r.push(`teen`);
			} else {
				r.push(`youth`);
			}
			r.push(`will be a boon to`);
			if (FutureSocieties.isActive('FSRepopulationFocus')) {
				r.push(`Repopulationism,`);
			} else {
				r.push(`society,`);
			}
			r.push(`and that the contract ${he} is signing mandates ${he} be on powerful fertility agents whenever ${he} isn't pregnant. During ${his} residency, free or not, ${he} will provide society with dozens of future children. The public`);
			if (FutureSocieties.isActive('FSRepopulationFocus')) {
				r.push(`<span class="reputation inc">approves of breeders, free or not,</span> and word spreads that any and all mothers are welcome into your arcology <span class="green">adding to its prosperity.</span>`);
				repX(500, "event", slave);
				V.arcologies[0].prosperity += 5;
			} else if (FutureSocieties.isActive('FSPaternalist')) {
				r.push(`<span class="reputation inc">sympathizes with your charity.</span>`);
				repX(100, "event", slave);
			} else {
				r.push(`<span class="red">feels you let this criminal off too easy.</span>`);
				repX(forceNeg(100), "event", slave);
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function flog() {
			const frag = document.createDocumentFragment();
			r = [];

			switch (malefactor) {
				case "addict":
					r.push(`Naturally, the wretch will be thrown out of the arcology: but an example must first be made. Free people must understand that criminals who commit outrages against them will be severely punished. The twitching, begging malefactor is stripped and flogged on the promenade before being escorted bleeding, and still twitching from withdrawal, out of the arcology. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "escapee":
					r.push(`Naturally, the wretch will be thrown out of the arcology: but an example must first be made. Free people must understand that criminals who commit outrages against them will be severely punished. The begging malefactor is flogged on the promenade before being escorted bleeding and half-dead out of the arcology. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "orphanloli":
					r.push(`Naturally, the wretch will be thrown out of the arcology: but an example must first be made. Free people must understand that criminals who commit outrages against them will be severely punished. The crying ${girl} is flogged on the promenade before being dragged bleeding and broken out of the arcology. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "anchorBaby":
					r.push(`Naturally, the wretch will be thrown out of the arcology: but an example must first be made. Free people must understand that criminals who commit outrages against them will be severely punished. The screaming breeder is flogged on the promenade before being dragged bleeding and broken out of the arcology sans ${his} children; they are destined for the slave orphanage. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "businesswoman":
					r.push(`Naturally, the wretch will be thrown out of the arcology: but an example must first be made. Free people must understand that criminals who commit outrages against them will be severely punished. The protesting bitch is stripped and flogged on the promenade before being escorted bleeding from the arcology. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "mule":
				case "rapist":
				case "whore":
					r.push(`Naturally, the wretch will be thrown out of the arcology: but an example must first be made. Free people must understand that criminals who commit outrages against them will be severely punished. The protesting malefactor is stripped and flogged on the promenade before being escorted bleeding from the arcology. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "passfail":
					r.push(`Naturally, the wretch will be thrown out of the arcology: but an example must first be made. Free people must understand that ${realRace} scum won't steal their livelihoods. The protesting malefactor is stripped and flogged on the promenade before being escorted bleeding from the arcology. The public <span class="reputation inc">approves of this harshness.</span>`);
					break;
				case "liberator":
					r.push(`An example must be made. Slaveownership is the cornerstone of the society you're building in your arcology, and this ${woman} attempted to undermine it. The protesting bitch is stripped and flogged on the promenade before being escorted bleeding from the arcology. The public <span class="reputation inc">approves of this harshness.</span>`);
			}
			repX(500, "event", slave);

			App.Events.addParagraph(frag, r);
			return frag;
		}
		function ownerFlog() {
			const frag = document.createDocumentFragment();
			r = [];

			r.push(`An example must be made. Slaveownership is the cornerstone of the society you're building in your arcology, and this ${woman} attempted to undermine it. ${He} is stripped and the slaveowner whose property ${he} tried to free is handed the leathern instrument. It seems the escapee was a favorite he does not wish to mangle, so he flogs the criminal mercilessly instead. ${He} is flung out of the arcology, nearly dead. The public <span class="reputation inc">approves of this harshness,</span> and small slaveholders are <span class="green">encouraged to do business with your arcology</span> after word of the incident gets around.`);
			repX(500, "event", slave);
			V.arcologies[0].prosperity += 10;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = document.createDocumentFragment();
			r = [];

			cashX(cost, "slaveTransfer");
			if (V.policies.cash4Babies === 1 && malefactor === "anchorBaby") {
				cashX(random(20, 30), "slaveTransfer");
			}
			switch (malefactor) {
				case "addict":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. The condemned recovers enough by the end of the process to start masturbating weakly, even as ${he} begins begging for a fix. Then it's off to slave markets for sale.`);
					break;
				case "escapee":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. ${He} remains limp throughout the process, only recovering enough to barely grasp the situation as ${he} is enslaved and heading to the slave markets.`);
					break;
				case "orphanloli":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. ${He} sobs throughout the process, though stops once ${he} realizes being a slave means free food. ${He} starts crying again once ${he} realizes ${he} is heading for the slave markets.`);
					break;
				case "anchorBaby":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. The condemned sobs and begs throughout the process until you grow tired of the whining and apply punishment. Then it's off to slave markets for sale. ${His} children`);
					if (V.policies.cash4Babies === 1) {
						r.push(`head off to be sold as well.`);
					} else {
						r.push(`will be sent to a slave orphanage for future sale.`);
					}
					break;
				case "businesswoman":
				case "mule":
				case "passfail":
				case "rapist":
				case "whore":
					r.push(`You complete the legalities and biometric scanning quickly and without fuss. The condemned sobs and begs throughout the process until you grow tired of the whining and apply punishment. Then it's off to slave markets for sale.`);
					break;
				case "liberator":
					r.push(`You complete the legalities and biometric scanning quickly and cautiously. Though the would-be liberator is of course restrained, disarmed, and still sedated, ${he} could awake at any time. Based on the drone logs, ${he} is likely to be violent when ${he} does. You make sure that ${he} isn't going to get loose as ${he} is sent off to the slave market; the public would not be pleased if ${he} went on another rampage.`);
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function makeMalefactor() {
			let slave;
			let pram;
			switch (malefactor) {
				case "addict":
					slave = GenerateNewSlave(null);
					slave.origin = "You sentenced $him to enslavement as a punishment for attempted burglary.";
					slave.career = "a criminal";
					slave.devotion = random(-75, -60);
					slave.trust = random(-15, 0);
					slave.oldDevotion = slave.devotion;
					setHealth(slave, jsRandom(-40, -20));
					slave.addict = 30;
					slave.anus = 3;
					if (slave.dick === 0) {
						slave.balls = 0;
						slave.vagina = 2;
						slave.skill.vaginal = 15;
						slave.skill.penetrative = 0;
					} else {
						slave.ovaries = 0;
						slave.clit = 0;
						slave.skill.vaginal = 0;
						slave.skill.penetrative = 15;
					}
					slave.skill.oral = 15;
					slave.skill.anal = 35;
					slave.skill.whoring = 15;
					slave.piercing.ear.weight = 1;
					slave.piercing.nose.weight = 1;
					slave.piercing.nipple.weight = 1;
					slave.piercing.genitals.weight = 1;
					slave.behavioralFlaw = "odd";
					break;
				case "escapee":
					slave = GenerateNewSlave(null, {disableDisability: 1});
					slave.origin = "You sentenced $him to enslavement as a punishment for suspected escapism.";
					slave.devotion = random(-75, -60);
					slave.trust = random(-15, 0);
					slave.oldDevotion = slave.devotion;
					setHealth(slave, jsRandom(-80, -70), undefined, undefined, undefined, 70);
					slave.heels = 1;
					slave.boobs += 100 * random(12, 32);
					slave.butt += random(2, 4);
					slave.anus = 1;
					if (slave.dick === 0) {
						slave.balls = 0;
						slave.vagina = 2;
						slave.skill.vaginal = 15;
						slave.skill.penetrative = 0;
					} else {
						slave.dick = random(4, 5);
						slave.balls = random(0, 2);
						slave.ovaries = 0;
						slave.clit = 0;
						slave.skill.vaginal = 0;
						slave.skill.penetrative = 15;
					}
					slave.skill.oral = 0;
					slave.skill.anal = 0;
					slave.skill.whoring = 0;
					slave.sexualFlaw = "hates penetration";
					slave.behavioralFlaw = "odd";
					break;
				case "anchorBaby":
					slave = GenerateNewSlave("XX", {disableDisability: 1, minAge: V.fertilityAge, maxAge: 42});
					slave.origin = "You sentenced $him to enslavement as a punishment for smuggling slaves within $his body.";
					slave.career = App.Data.Careers.General.uneducated.random();
					slave.devotion = random(-75, -50);
					slave.trust = random(-75, -60);
					slave.oldDevotion = slave.devotion;
					setHealth(slave, jsRandom(20, 40), undefined, undefined, undefined, 60);
					slave.weight = random(40, 80);
					slave.accent = 3;
					slave.boobs += 200;
					slave.lactation = 1;
					slave.lactationDuration = 2;
					slave.ovaries = 1;
					if (slave.vagina < 2) {
						slave.vagina += 3;
					}
					slave.bellySag = 3;
					slave.bellySagPreg = 3;
					slave.preg = 0;
					slave.pregWeek = -4;
					slave.counter.birthsTotal = 2;
					slave.counter.births = 2;
					slave.skill.vaginal = 30;
					slave.skill.oral = 15;
					slave.skill.anal = 15;
					slave.skill.penetrative = 0;
					slave.sexualFlaw = "crude";
					slave.behavioralFlaw = "bitchy";
					break;
				case "orphanloli":
					slave = GenerateNewSlave(null, {minAge: V.minimumSlaveAge, maxAge: 12, disableDisability: 1});
					slave.origin = "You sentenced $him to enslavement as a punishment for suspected escapism.";
					slave.career = "an orphan";
					slave.devotion = random(-15, 0);
					slave.trust = random(-75, -60);
					slave.oldDevotion = slave.devotion;
					setHealth(slave, jsRandom(-80, -70), undefined, undefined, undefined, 70);
					slave.weight = -100;
					slave.accent = 3;
					slave.boobs = 50;
					slave.butt = 0;
					slave.anus = 0;
					if (slave.dick === 0) {
						slave.balls = 0;
						slave.vagina = 0;
					} else {
						slave.dick = random(1, 2);
						slave.balls = random(1, 2);
						slave.ovaries = 0;
						slave.clit = 0;
					}
					slave.skill.vaginal = 0;
					slave.skill.penetrative = 0;
					slave.skill.oral = 0;
					slave.skill.anal = 0;
					slave.skill.whoring = 0;
					slave.sexualFlaw = "apathetic";
					slave.behavioralFlaw = "gluttonous";
					break;
				case "businesswoman":
					slave = GenerateNewSlave("XX", {
						disableDisability: 1, minAge: 35, maxAge: 45, race: "nonslave"
					});
					slave.origin = "You sentenced $him to enslavement as a punishment for fraud and theft.";
					slave.career = "a criminal businesswoman";
					slave.devotion = random(-75, -60);
					slave.trust = random(-15, 0);
					slave.oldDevotion = slave.devotion;
					slave.vagina = 2;
					slave.preg = -1;
					slave.skill.vaginal = 15;
					slave.anus = 0;
					slave.boobs += 400;
					slave.boobsImplant = 400;
					slave.boobsImplantType = "normal";
					slave.butt += 2;
					slave.buttImplant = 2;
					slave.buttImplantType = "normal";
					setHealth(slave, jsRandom(20, 40), undefined, undefined, undefined, 10);
					slave.sexualFlaw = "hates oral";
					slave.behavioralFlaw = "arrogant";
					// slave.hStyle = "fashionable for a Free Cities businesswoman, up in a tight bun";
					slave.hStyle = "bun";
					slave.hLength = 40;
					slave.custom.tattoo = "$He has a pretty floral tattoo along $his collarbone.";
					break;
				case "whore":
					slave = GenerateNewSlave(null, {disableDisability: 1, race: "nonslave"});
					slave.origin = "You sentenced $him to enslavement as a punishment for theft and battery.";
					slave.career = "a prostitute";
					slave.devotion = random(-75, -60);
					slave.trust = random(-15, 0);
					slave.oldDevotion = slave.devotion;
					setHealth(slave, jsRandom(-40, -20));
					slave.anus = 2;
					if (slave.dick === 0) {
						slave.balls = 0;
						slave.vagina = 2;
						slave.skill.vaginal = 35;
					}
					slave.skill.penetrative = 15;
					slave.skill.oral = 35;
					slave.skill.anal = 35;
					slave.skill.whoring = 35;
					slave.boobs += 400;
					slave.boobsImplant = 400;
					slave.boobsImplantType = "normal";
					slave.butt++;
					slave.buttImplant = 1;
					slave.buttImplantType = "normal";
					slave.lips += 10;
					slave.lipsImplant = 10;
					slave.piercing.lips.weight = 1;
					slave.piercing.tongue.weight = 1;
					slave.piercing.ear.weight = 1;
					slave.piercing.nose.weight = 1;
					slave.piercing.eyebrow.weight = 1;
					slave.piercing.nipple.weight = 1;
					slave.piercing.genitals.weight = 1;
					slave.sexualFlaw = "hates penetration";
					slave.hStyle = "strip";
					slave.custom.tattoo = "$He has a teardrop tattooed under each eye.";
					break;
				case "rapist":
					slave = GenerateNewSlave("XY", {disableDisability: 1, minAge: 16, race: "nonslave"});
					slave.origin = "You sentenced $him to enslavement as a punishment for the rape of a free woman.";
					slave.devotion = random(-75, -60);
					slave.trust = random(-15, 0);
					slave.oldDevotion = slave.devotion;
					setHealth(slave, jsRandom(0, 20), undefined, undefined, 0, 5);
					slave.anus = 0;
					slave.balls = random(2, 4);
					slave.skill.penetrative = 35;
					slave.skill.oral = 0;
					slave.skill.anal = 0;
					slave.behavioralFlaw = "arrogant";
					slave.sexualFlaw = "hates penetration";
					break;
				case "mule":
					pram = new GenerateNewSlavePram();
					Object.assign(pram, {disableDisability: 1, minAge: 13, race: "nonslave"});
					if (V.pedo_mode === 0) {
						pram.maxAge = 26;
					}
					slave = GenerateNewSlave("XX", pram);
					slave.origin = "You sentenced $him to enslavement for smuggling drugs into the arcology.";
					slave.career = "a drug mule";
					slave.devotion = random(-50, -20);
					slave.trust = random(-100, -75);
					slave.vagina = 2;
					slave.preg = -2;
					slave.bellyImplant = 0;
					slave.cervixImplant = 1;
					slave.pubicHStyle = "shaved";
					slave.bellySag = 2;
					slave.skill.vaginal = 50;
					slave.skill.penetrative = 0;
					slave.anus = 0;
					slave.hips = 0;
					slave.weight = -60;
					slave.waist = random(-30, -10);
					slave.boobs = random(4, 5) * 100;
					slave.natural.boobs = slave.boobs;
					slave.boobShape = "perky";
					setHealth(slave, jsRandom(-20, 10), undefined, undefined, undefined, 40);
					slave.sexualFlaw = "hates penetration";
					slave.behavioralFlaw = "hates men";
					slave.accent = 0;
					break;
				case "liberator":
					slave = GenerateNewSlave("XX", {disableDisability: 1, minAge: random(12, 28), maxAge: 43});
					slave.origin = "You sentenced $him to enslavement as a punishment for attempted theft of a slave.";
					slave.career = "an antislavery activist";
					slave.devotion = random(-75, -60);
					slave.trust = random(-15, 0);
					slave.oldDevotion = slave.devotion;
					slave.muscles = 50;
					slave.weight = random(-20, 30);
					slave.waist = random(-10, 10);
					slave.skill.vaginal = 0;
					slave.skill.penetrative = 0;
					slave.skill.oral = 0;
					slave.skill.anal = 0;
					slave.skill.whoring = 0;
					slave.skill.combat = 40;
					slave.anus = 0;
					setHealth(slave, jsRandom(60, 80), undefined, undefined, 0, 10);
					slave.behavioralFlaw = "arrogant";
					slave.sexualFlaw = "hates penetration";
					slave.hStyle = "strip";
					slave.hLength = 5;
					slave.custom.tattoo = "$He seems to have had slave tattoos at one time, but has had them cheaply removed.";
					break;
				case "passfail":
					pram = new GenerateNewSlavePram();
					pram.disableDisability = 1;
					if (V.arcologies[0].FSSubjugationistLawME === 1) {
						pram.race = V.arcologies[0].FSSubjugationistRace;
					} else if (V.arcologies[0].FSSupremacistLawME === 1) {
						const races = App.Utils.getRaceArrayWithoutParamRace(V.arcologies[0].FSSupremacistRace);
						pram.race = races.random();
					}
					slave = GenerateNewSlave(null, pram);
					slave.origin = "You sentenced $him to enslavement as a punishment for defying local racial segregation laws.";
					slave.career = App.Data.Careers.General.educated.random();
					slave.devotion = random(-75, -50);
					slave.trust = random(-75, -50);
					slave.oldDevotion = slave.devotion;
					setHealth(slave, jsRandom(-40, -20), undefined, undefined, 0, 10);
					slave.intelligence = random(51, 95);
					slave.intelligenceImplant = 15;
					if (V.arcologies[0].FSSupremacistLawME === 1 && V.arcologies[0].FSSupremacistRace) {
						fakeRace = V.arcologies[0].FSSupremacistRace;
					} else if (V.arcologies[0].FSSubjugationistLawME === 1) {
						const races = App.Utils.getRaceArrayWithoutParamRace(V.arcologies[0].FSSubjugationistRace);
						fakeRace = races.random();
					}
					realRace = slave.race;
					slave.race = fakeRace;
					slave.skin = randomRaceSkin(fakeRace);
					setEyeColor(slave, randomRaceEye(fakeRace));
					slave.hColor = randomRaceHair(fakeRace);
					slave.override_Race = 1;
					slave.override_Skin = 1;
					slave.override_H_Color = 1;
					slave.override_Eye_Color = 1;
					break;
			}
			return slave;
		}
	}
};
