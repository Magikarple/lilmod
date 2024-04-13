App.UI.managePersonalAffairs = function() {
	const frag = new DocumentFragment();

	const appearanceDiv = document.createElement("div");
	const skillsDiv = document.createElement("div");
	const reputationDiv = document.createElement("div");
	const drugsDiv = document.createElement("div");
	const dietDiv = document.createElement("div");
	const lactationDiv = document.createElement("div");
	const pervertDiv = document.createElement("div");
	const socialDiv = document.createElement("div");
	const breederExamDiv = document.createElement("div");

	const PC = V.PC;
	const arcology = V.arcologies[0];

	if (V.cheatMode) {
		if (V.cheatMode === 1) {
			App.UI.DOM.appendNewElement("div", frag,
				App.UI.DOM.passageLink("Cheat Edit Player", "PCCheatMenu", () => {
					V.cheater = 1;
					// @ts-ignore
					V.backupSlave = clone(PC);
				}),
				["cheat-menu"]);
		}
	}

	App.UI.DOM.appendNewElement("h1", frag, `Personal Affairs`);

	frag.append(
		appearance(),
		reputation(),
		diet(),
		drugs(),
	);

	if (PC.lactation > 0 || PC.boobs >= 300) {
		frag.append(lactation());
	}

	if (V.propOutcome === 1 && FutureSocieties.isActive('FSRestart', arcology)) {
		frag.append(breederExam());
	}

	frag.append(perversions());

	frag.append(socials());

	frag.append(skills());

	return frag;

	/**
	 * @returns {HTMLDivElement} a constructed a div with the players appearance described
	 */
	function appearance() {
		const doctorDiv = document.createElement("div");
		const surgeonDiv = document.createElement("div");
		const salonDiv = document.createElement("div");

		let text = [];

		App.UI.DOM.appendNewElement("h2", appearanceDiv, `Appearance`);

		text.push(`You pause for a moment from your busy day to day life`);
		if (onBedRest(PC)) {
			if (canMove(PC)) {
				text.push(`to get up and stretch your legs a little while considering`);
			} else {
				text.push(`to push yourself upright and consider`);
			}
		} else {
			text.push(`to return to ${V.masterSuite ? V.masterSuiteName : `your room`} to consider`);
		}
		text.push(`some things about yourself.`);
		App.Events.addParagraph(appearanceDiv, text);
		text = [];

		text.push(App.Desc.Player.longDescription(PC));
		App.Events.addParagraph(appearanceDiv, text);
		text = [];

		if (isMovable(PC)) {
			text.push(doctor());
			text.push(surgeon());
		}
		if (hasAnyArms(PC)) {
			text.push(salon());
		}

		App.Events.addNode(appearanceDiv, text);

		return appearanceDiv;

		/**
		 * @returns {HTMLDivElement} a constructed div with links to consult a doctor
		 */
		function doctor() {
			const text = [];

			if (V.doctor.state > 0) {
				text.push(App.UI.DOM.passageLink(`Consult your doctor`, "Doctor Consultation", () => {
				}));
			} else {
				text.push(App.UI.DOM.passageLink(`Seek out a local doctor`, "Doctor Consultation", () => {
				}));
			}
			App.Events.addNode(doctorDiv, text);
			return doctorDiv;
		}

		/**
		 * @returns {HTMLDivElement} a constructed div with links to visit a plastic surgeon
		 */
		function surgeon() {
			const text = [];

			if (V.pSurgery.cooldown === 0) {
				if (V.pSurgery.state > 0) {
					text.push(App.UI.DOM.passageLink(`Visit your plastic surgeon`, "Elective Surgery", () => {
						V.pSurgery.cooldown = 4;
					}));
				} else {
					text.push(App.UI.DOM.passageLink(`Seek out a local plastic surgeon`, "Elective Surgery", () => {
						V.pSurgery.cooldown = 4;
					}));
				}
			} else if (V.pSurgery.cooldown === 1) {
				text.push(`Your favorite plastic surgeon is booked solid for the next week.`);
			} else {
				text.push(`Your favorite plastic surgeon is booked solid for the next ${V.pSurgery.cooldown} weeks.`);
			}
			App.Events.addNode(surgeonDiv, text);
			return surgeonDiv;
		}

		/**
		 * @returns {HTMLDivElement} a constructed div with links to change the player's appearance
		 */
		function salon() {
			salonDiv.append(App.UI.DOM.passageLink(`Change your appearance`, "Personal Appearance",));
			return salonDiv;
		}
	}

	/**
	 * @returns {HTMLDivElement} a constructed div that contains items related to the players reputation (title, rumors, etc)
	 */
	function reputation() {
		const customTitleDiv = document.createElement("div");
		const textBoxDiv = document.createElement("div");
		const renamePlayerDiv = document.createElement("div");
		const newNameDiv = document.createElement("div");
		const pronounsDiv = document.createElement("div");
		const rumorsDiv = document.createElement("div");
		const familyDiv = document.createElement("div");
		const pregnancyDiv = document.createElement("div");
		const birthsDiv = document.createElement("div");
		const partnersDiv = document.createElement("div");
		const knockedUpDiv = document.createElement("div");
		const fatheredDiv = document.createElement("div");
		const breedingDiv = document.createElement("div");

		App.UI.DOM.appendNewElement("h2", reputationDiv, `Reputation`);
		App.UI.DOM.appendNewElement("h3", reputationDiv, `Name`);

		reputationDiv.append(
			`On formal occasions, you are announced as ${PCTitle()}. By slaves, however, you prefer to be called ${properMaster()}.`,
			customTitle(),
			renamePlayer(),
			// pronouns(), // TODO: waiting for 5.0 per pregmodder
			rumors(),
			family(),
		);

		if (PC.ovaries === 1 || PC.mpreg === 1) {
			reputationDiv.append(pregnancy());
		}

		const links = [];

		if (PC.preg > 0 && V.pregnancyMonitoringUpgrade) {
			links.push(App.UI.DOM.passageLink(`Inspect pregnancy`, 'Analyze PC Pregnancy'));
		}

		if (PC.preg >= 0 && PC.ovaries && PC.ovaryAge < 47) {
			links.push(App.UI.DOM.passageLink(`Harvest and implant an egg`, 'Surrogacy Workaround', () => {
				V.donatrix = V.PC.ID;
				V.impregnatrix = 0;
				V.receptrix = 0;

				V.nextLink = 'Manage Personal Affairs';
			}));
		}

		reputationDiv.append(App.UI.DOM.generateLinksStrip(links));

		if (PC.counter.birthsTotal > 0) {
			reputationDiv.append(births());
		}

		if (PC.partners.size > 0) {
			reputationDiv.append(partners());
		}

		if (PC.counter.slavesKnockedUp > 0) {
			reputationDiv.append(knockedUp());
		} else if (PC.counter.slavesFathered > 0) {
			reputationDiv.append(fathered());
		}

		if (PC.vagina !== -1 && arcology.FSRestartDecoration >= 100) {
			reputationDiv.append(breeding());
		}

		return reputationDiv;

		/**
		 * Shows the player's custom title if they have one. Lets them set one if they don't
		 * @returns {HTMLDivElement}
		 */
		function customTitle() {
			if (!PC.customTitle) {
				textBoxDiv.append(
					`Custom title: `,
					App.UI.DOM.makeTextBox(PC.customTitle || '', (title) => {
						if (!title) {
							title = '';
						}

						V.PC.customTitle = title;
						V.PC.customTitleLisp = lispReplace(PC.customTitle);

						App.UI.DOM.replace(reputationDiv, reputation);
					}),
				);

				customTitleDiv.append(App.UI.DOM.makeElement("div", App.UI.DOM.linkReplace(`Set a custom title for slaves to address you as`, textBoxDiv)));
			} else {
				customTitleDiv.append(
					`Your custom title is `,
					App.UI.DOM.makeTextBox(PC.customTitle || '', (title) => {
						V.PC.customTitle = title;
						V.PC.customTitleLisp = lispReplace(PC.customTitle);

						App.UI.DOM.replace(reputationDiv, reputation);
					}),
					App.UI.DOM.link(`Stop using a custom title`, () => {
						V.PC.customTitle = undefined;
						V.PC.customTitleLisp = undefined;

						App.UI.DOM.replace(reputationDiv, reputation);
					}),
				);
			}

			return customTitleDiv;
		}

		/**
		 * Lets the player set their preferred pronouns
		 * TODO: waiting for 5.0 per pregmodder
		 * @returns {HTMLDivElement}
		 */
		function pronouns() {
			const options = new App.UI.OptionsGroup();
			const {he, him} = getPronouns(V.PC);
			options.addOption("", "pronoun", V.PC)
				.addValue("She/Her", App.Data.Pronouns.Kind.female)
				.addValue("He/Him", App.Data.Pronouns.Kind.male)
				.addValue("It", App.Data.Pronouns.Kind.neutral);
			//	.addValue("They/Them", App.Data.Pronouns.Kind.epicene) - TODO: epicene pronouns have verb tense problems ("they is...")
			//	.addValue("Custom", App.Data.Pronouns.Kind.custom) - TODO: custom pronoun mechanism is incomplete/broken right now
			pronounsDiv.append("Your preferred pronouns are ", App.UI.DOM.linkReplace(`${he}/${him}.`, options.render()));
			return pronounsDiv;
		}

		/**
		 * Allows the player to rename themselves
		 * @returns {HTMLDivElement}
		 */
		function renamePlayer() {
			newNameDiv.append(
				`New name: `,
				App.UI.DOM.makeTextBox(PC.slaveName, (name) => {
					V.PC.slaveName = name;
					repX(-500, "event");

					App.UI.DOM.replace(reputationDiv, reputation);
				}),
			);

			renamePlayerDiv.append(App.UI.DOM.linkReplace(`Rename yourself`, newNameDiv));
			App.UI.DOM.appendNewElement("span", renamePlayerDiv, ` Will cost you some reputation`, ['note']);

			return renamePlayerDiv;
		}

		/**
		 * Let the player know if there are rumors going around about them
		 * @returns {HTMLDivElement}
		 */
		function rumors() {
			App.UI.DOM.appendNewElement("h3", rumorsDiv, `Rumors`);

			App.Events.addNode(rumorsDiv, [getPlayerRumors()]);

			return rumorsDiv;

			/**
			 * @returns {string} the correct rumor flavor text for the players degeneracy level
			 */
			function getPlayerRumors() {
				if (PC.degeneracy > 100) {
					return `There are severe and devastating rumors about you spreading across the arcology.`;
				} else if (PC.degeneracy > 75) {
					return `There are severe rumors about you spreading across the arcology.`;
				} else if (PC.degeneracy > 50) {
					return `There are bad rumors about you spreading across the arcology.`;
				} else if (PC.degeneracy > 25) {
					return `There are rumors about you spreading across the arcology.`;
				} else if (PC.degeneracy > 10) {
					return `There are minor rumors about you spreading across the arcology.`;
				} else {
					return `The occasional rumor about you can be heard throughout the arcology.`;
				}
			}
		}

		/**
		 * @returns {HTMLDivElement} a div with a link that shows the player's family tree
		 */
		function family() {
			App.UI.DOM.appendNewElement("h3", familyDiv, `Family`);

			familyDiv.append(App.UI.DOM.linkReplace(`Pull up the file on your family tree`, renderFamilyTree(V.slaves, -1)));

			if (totalPlayerRelatives(PC) > 0 || (V.showMissingSlaves && (PC.mother in V.missingTable || PC.father in V.missingTable))) {
				familyDiv.append(App.Desc.family(PC, true));
			}

			return familyDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div with options related to the player's pregnancy
		 */
		function pregnancy() {
			const text = [];
			const links = [];

			const miniSceneSpan = App.UI.DOM.appendNewElement("span", pregnancyDiv);
			const abortLink = App.UI.DOM.link(`Abort the child`, () => {
				TerminatePregnancy(V.PC);

				// App.UI.DOM.linkReplace does not support handlers afaik
				App.UI.DOM.replace(miniSceneSpan, `You take a syringe filled with abortifacients and make yourself comfortable. Injecting the vial through your belly into your womb, your close your eyes and wait for what is coming. Once you feel it is over, you clean yourself up and go on your way, child free.`);
				App.UI.DOM.replace(appearanceDiv, appearance);
				App.UI.DOM.replace(drugsDiv, drugs);
			});

			App.UI.DOM.appendNewElement("h2", pregnancyDiv, `Contraceptives and Fertility`);

			if (PC.labor === 1) {
				text.push(`You are beginning to feel contractions; you'll be giving birth soon.`);
			} else if (PC.preg >= 39) {
				text.push(`Your due date is looming, but your ${PC.pregType > 1 ? `children don't` : `child doesn't`} seem to be interested in coming out just yet.`);

				text.push(miniSceneSpan, App.UI.DOM.link(`Induce childbirth`, () => {
					V.PC.labor = 1;
					App.UI.DOM.replace(pregnancyDiv, pregnancy);
				}));
			} else if (PC.preg >= 8) {
				text.push(`You're currently ${num(PC.preg)} ${PC.preg > 1 ? `weeks` : `week`} pregnant${V.PC.pregSource !== -1 && V.PC.pregSource !== -6 ? ", something rather unbecoming for an arcology owner" : ""}.`);

				if (!FutureSocieties.isActive('FSRestart', arcology) || V.eugenicsFullControl === 1 || (V.PC.pregSource !== -1 && V.PC.pregSource !== -6)) {
					miniSceneSpan.append(abortLink);
					text.push(miniSceneSpan);
				}
			} else if (PC.preg >= 4 && PC.pregKnown) {
				text.push(`You're having morning sickness${V.PC.pregSource !== -1 && V.PC.pregSource !== -6 ? "; it isn't too late to hide your pregnancy if desired.." : ""}.`);

				if (!FutureSocieties.isActive('FSRestart', arcology) || V.eugenicsFullControl === 1 || (V.PC.pregSource !== -1 && V.PC.pregSource !== -6)) {
					miniSceneSpan.append(abortLink);
					text.push(miniSceneSpan);
				}
			} else if (PC.preg >= 4) {
				miniSceneSpan.append(`Your period is late, so the first thing you do is test yourself for a potential pregnancy. A pregnancy test confirms that `, App.UI.DOM.makeElement("span", `you are pregnant. `, ['pregnant']));

				PC.pregKnown = 1;
				if (!FutureSocieties.isActive('FSRestart', arcology) || V.eugenicsFullControl === 1 || (V.PC.pregSource !== -1 && V.PC.pregSource !== -6)) {
					miniSceneSpan.append(abortLink);

					text.push(miniSceneSpan);
				}
			} else if (PC.preg > 0 && PC.pregKnown) {
				text.push(`You have a bun baking in the oven.`);
				let div = App.UI.DOM.makeElement("div");
				transplantAndTerminateButtons(V.PC, div, {
					terminateAllText: "Pop some morning after pills",
					terminateText: `Terminate #terminatable of your fetuses`,
					transplantAllText: "Make it someone else's problem",
					transplantText: `Offload #transplantable of your fetuses`,
				});
				text.push(div);
			} else if (PC.preg > 0) {
				text.push(`Your fertile ${PC.mpreg === 1 ? "ass" : ""}pussy has been thoroughly seeded; there is a chance you are pregnant.`);
				let div = App.UI.DOM.makeElement("div");
				transplantAndTerminateButtons(V.PC, div, {
					terminateText: "Pop some morning after pills",
					mode: "terminate",
				});
				text.push(div);
			} else if (PC.pregWeek < 0) {
				text.push(`You're still recovering from your recent pregnancy.`);
			} else if (PC.bellyImplant > -1) {
				text.push(`Your abdominal implant rests in your womb, blocking any chance of conception.`);
			} else if (PC.preg === -3) {
				text.push(`You've been sterilized and will never have children.`);
			} else if (PC.preg === -2) {
				text.push(`You're barren and can't get pregnant.`);
			} else if (PC.pubertyXX === 0) {
				text.push(`Your eggs aren't quite ready yet.`);
			} else if (PC.ovaryAge >= 47) {
				text.push(`You're menopausal. Your time to bear children has passed.`);
			} else if (PC.preg === -1) {
				text.push(`You're currently on birth control.`);
				links.push(
					App.UI.DOM.disabledLink(`Start taking birth control`, [
						`You are already taking birth control.`
					]),
					App.UI.DOM.link(`Stop taking birth control`, () => {
						V.PC.preg = 0;

						App.UI.DOM.replace(pregnancyDiv, pregnancy);
					}),
				);
				text.push(App.UI.DOM.generateLinksStrip(links));
			} else if (PC.preg === 0) {
				// check if the player is already taking fertility drugs as refreshment
				const fertilityRefreshment = PC.refreshment.toLowerCase().indexOf("fertility") !== -1 ? 1 : 0;
				if (fertilityRefreshment) {
					text.push(`You're currently fertile and enjoying ${PC.refreshment}; a risky combination.`);
				} else {
					text.push(`You're currently fertile.`);
				}
				if (PC.forcedFertDrugs > 0) {
					text.push(`You feel a strange eagerness whenever you think of bareback sex.`);
				}
				links.push(
					App.UI.DOM.link(`Start taking birth control`, () => {
						V.PC.preg = -1;
						App.UI.DOM.replace(pregnancyDiv, pregnancy);
					}),
					App.UI.DOM.disabledLink(`Stop taking birth control`, [
						`You are not currently taking birth control.`
					]),
				);
				text.push(App.UI.DOM.generateLinksStrip(links));
			}

			App.Events.addNode(pregnancyDiv, text);

			return pregnancyDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div with a detailed count of births the player has had
		 */
		function births() {
			const babies = count => count === 1 ? `${count} baby` : `${count} babies`;

			if (PC.vagina !== -1) {
				App.UI.DOM.appendNewElement("div", birthsDiv, `In total, you have given birth to:`);
			} else {
				App.UI.DOM.appendNewElement("div", birthsDiv, `Before your sex change, you had given birth to:`);
			}

			const list = App.UI.DOM.appendNewElement("ul", birthsDiv);
			if (PC.counter.birthElite > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthElite)} for the Societal Elite.`);
			}
			if (PC.counter.birthMaster > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthMaster)} for your former Master.`);
			}
			if (PC.counter.birthClient > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthClient)} from clients you've slept with.`);
			}
			if (PC.counter.birthFutaSis > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthFutaSis)} from sex with the Futanari Sisters.`);
			}
			if (PC.counter.birthClient > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthRape)} after being raped by an unknown person.`);
			}
			if (PC.counter.birthArcOwner > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthArcOwner)} from your time with male arcology owners.`);
			}
			if (PC.counter.birthCitizen > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthCitizen)} from sex with arcology citizens.`);
			}
			if (PC.counter.birthDegenerate > 0) {
				App.UI.DOM.appendNewElement("li", list, `${PC.counter.birthDegenerate} bastard ${PC.counter.birthDegenerate > 1 ? `babies` : `baby`} from getting fucked by slaves.`);
			}
			if (PC.counter.birthSelf > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthSelf)} that ${PC.counter.birthSelf > 1 ? `are` : `is`} literally all you.`);
			}
			if (PC.counter.birthLab > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthLab)} specially designed in the lab.`);
			}
			if (PC.counter.birthOther > 0) {
				App.UI.DOM.appendNewElement("li", list, `${babies(PC.counter.birthOther)} from sources you can't quite recall.`);
			}

			return birthsDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div listing the player's sexual partners
		 */
		function partners() {
			const text = [];

			const slaves = [...PC.partners].filter(i => i > 0);
			const ownedSlaves = slaves.filter(s => getSlave(s));
			const unownedSlaves = slaves.length - ownedSlaves.length;
			const other = [];

			const ownedSlavesSpan = document.createElement("span");

			for (let i = 0; i < ownedSlaves.length; i++) {
				const innerSpan = document.createElement("span");
				const slave = getSlave(ownedSlaves[i]);

				innerSpan.style.display = 'inline-block';	// hack to prevent span breaking line and giving unusable tooltip
				innerSpan.style.marginRight = '4px';

				if (ownedSlaves.length > 1) {
					if (i === ownedSlaves.length - 1) {
						innerSpan.append(
							` and `,
							contextualIntro(PC, slave, true),
						);

						if (unownedSlaves > 0) {
							innerSpan.append(`, as well as ${numberWithPlural(unownedSlaves, 'slave')} you don't currently own`);
						}

						innerSpan.append(`.`);
					} else {
						innerSpan.append(contextualIntro(PC, slave, true),);

						if (ownedSlaves.length > 2) {
							innerSpan.append(`, `);
						}
					}
				} else {
					innerSpan.append(
						contextualIntro(PC, slave, true, true),
						`.`,
					);
				}

				ownedSlavesSpan.append(innerSpan);
			}

			const partners = new Map([
				[-1, "you"],
				[-2, `citizens of ${arcology.name}`],
				[-3, `your former master`],
				[-4, `another arcology owner`],
				[-6, `members of the Societal Elite`],
				[-8, `your animals`],
				[-9, `members of the Futanari Sisters`],
				[-10, `rapists`],
			]);

			for (const [ID, name] of partners) {
				if (V.PC.partners.has(ID)) {
					other.push(name);
				}
			}

			const link = App.UI.DOM.link(`${num(slaves.length)} of your slaves`, () => {
				const innerDiv = document.createElement("div");

				innerDiv.append(
					`You have slept with ${other.length > 0 ? `${toSentence(other)}, as well as `: ``}`,
					ownedSlavesSpan
				);

				App.UI.DOM.replace(partnersDiv, innerDiv);
			});

			if (slaves.length > 0) {
				text.push(
					`You've had sex with`,
					link,
					`so far.`,
				);
			} else if (other.length > 0) {
				text.push(`You haven't had sex with any of your slaves yet.`);
			} else {
				text.push(`You haven't had sex with anyone yet.`);
			}

			if (other.length > 0) {
				text.push(`You have ${slaves.length > 0 ? `also` : ``} had sex with ${toSentence(other)}${slaves.length > 0 ? `` : `, though`}.`);
			}

			App.Events.addNode(partnersDiv, text);

			return partnersDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div with the count of slaves the player has fathered and the amount of slaves they have knocked up
		 */
		function knockedUp() {
			const text = [];

			let fathered = '';

			if (PC.counter.slavesFathered > 0) {
				fathered = ` and fathered ${num(PC.counter.slavesFathered)} new ${PC.counter.slavesFathered > 1 ? `slaves` : `slave`}`;
			}

			if (PC.dick > 0) {
				text.push(`You've knocked up ${num(PC.counter.slavesKnockedUp)} fertile slave ${PC.counter.slavesKnockedUp > 1 ? `girls` : `girl`}${fathered} as an arcology owner so far.`);
			} else {
				text.push(`Before your sex change, you knocked up ${num(PC.counter.slavesKnockedUp)} fertile slave ${PC.counter.slavesKnockedUp > 1 ? `girls` : `girl`}${fathered}.`);
			}

			App.Events.addNode(knockedUpDiv, text);

			return knockedUpDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div with the amount of slaves the player has fathered
		 */
		function fathered() {
			const text = [];

			if (PC.dick > 0) {
				text.push(`You've fathered ${num(PC.counter.slavesFathered)} new ${PC.counter.slavesFathered > 1 ? `slaves` : `slave`} as an arcology owner so far.`);
			} else {
				text.push(`Before your sex change, you fathered ${num(PC.counter.slavesFathered)} new ${PC.counter.slavesFathered > 1 ? `slaves` : `slave`}.`);
			}

			App.Events.addNode(fatheredDiv, text);

			return fatheredDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div that allows the player to provide their womb for breeding by the Societal Elite
		 */
		function breeding() {
			const text = [];

			if (!V.playerBred) {
				text.push(
					`You are currently not bearing children for the Societal Elite.`,
					App.UI.DOM.generateLinksStrip([
						App.UI.DOM.link(`List your womb as available`, () => {
							V.playerBred = 1;
							App.UI.DOM.replace(breedingDiv, breeding);
						}),
						App.UI.DOM.link(`Sign up for artificial insemination`, () => {
							V.playerBred = 2;
							App.UI.DOM.replace(breedingDiv, breeding);
						})
					]),
				);
			} else {
				text.push(`Your womb is dedicated to carrying the Societal Elites' children.`);

				if (PC.counter.birthElite > 0) {
					text.push(App.UI.DOM.link(`List your womb as unavailable`, () => {
						V.playerBred = 0;

						App.UI.DOM.replace(breedingDiv, breeding);
					}));
				} else {
					text.push(App.UI.DOM.disabledLink(`List your womb as unavailable`, [
						'You must bear at least one child for the Societal Elite before removing yourself from the breeding program.'
					]));
				}
			}

			App.Events.addNode(breedingDiv, text);

			return breedingDiv;
		}
	}

	/**
	 * @returns {HTMLDivElement} a div allowing the player to change their diet
	 */
	function diet() {
		App.UI.DOM.appendNewElement("h2", dietDiv, `Diet`);

		const text = [];
		const links = [];

		if (!canEatFood(PC)) {
			text.push(`Your body is dependent on slave food for nutrition as your digestive tract has atrophied.`);
		}

		if (PC.diet === "healthy") {
			text.push(`You are eating healthy.`);
		} else if (PC.diet === "restricted") {
			text.push(`You are eating less in order to lose weight.`);
		} else if (PC.diet === "fattening") {
			text.push(`You are eating more in order to gain weight.`);
		} else if (PC.diet === "muscle building" || PC.diet === "slimming") {
			text.push(`You are eating energy rich food and spending ${PC.muscles > 0 ? "extra " : ""}time in the gym.`);
		} else if (PC.diet === "exotic") {
			text.push(`You are eating exotic foods to boost your energy in bed.`);
		} else if (PC.diet === "medicinal") {
			text.push(`You are eating medicinal foods to ${PC.health.condition < 90 ? "better" : "solidify"} your health.`);
		} else if (PC.diet === "corrective") {
			text.push(`The automated feeder is controlling your portions in order to correct your weight.`);
		} else if (PC.diet === "cum production") {
			text.push(`You are eating a blend formulated to increase cum production.`);
		} else if (PC.diet === "XX") {
			text.push(`You are eating a blend laced with female hormones.`);
		} else if (PC.diet === "XY") {
			text.push(`You are eating a blend laced with male hormones.`);
		} else if (PC.diet === "XXY") {
			text.push(`You are eating a blend loaded with sex hormones.`);
		} else if (PC.diet === "cleansing") {
			text.push(`You are eating a blend formulated to flush carcinogens from your system.`);
		} else if (PC.diet === "fertility") {
			text.push(`You are eating a blend formulated to increase fertility.`);
		} else if (PC.diet === "weaning") {
			text.push(`You are on a special diet to wean you of your slave food dependency. You must stick with it until completion for it to have any lasting effect; quitting means you'll have to start it over again.`);
		}

		// I hate everything about what comes after this line.
		const onDiet = "You are on this diet";
		if (PC.diet === "healthy") {
			links.push(App.UI.DOM.disabledLink(`Healthy`, [
				`${onDiet}`,
			]));
		} else {
			links.push(App.UI.DOM.link(`Healthy`, () => {
				PC.diet = "healthy";
				App.UI.DOM.replace(dietDiv, diet);
			}));
		}
		if (!canEatFood(PC) && V.dietCleanse === 1) {
			if (PC.diet === "cleansing") {
				links.push(App.UI.DOM.disabledLink(`Cleanse`, [
					`${onDiet}`,
				]));
			} else if (PC.health.condition < 90 || PC.chem >= 10) {
				links.push(App.UI.DOM.link(`Cleanse`, () => {
					PC.diet = "cleansing";
					App.UI.DOM.replace(dietDiv, diet);
				}));
			} else {
				links.push(App.UI.DOM.disabledLink(`Cleanse`, [
					`You are already healthy`,
				]));
			}
		}
		if (PC.diet === "restricted") {
			links.push(App.UI.DOM.disabledLink(`Lose weight`, [
				`${onDiet}`,
			]));
		} else if (PC.weight >= -95) {
			links.push(App.UI.DOM.link(`Lose weight`, () => {
				PC.diet = "restricted";
				App.UI.DOM.replace(dietDiv, diet);
			}));
		} else {
			links.push(App.UI.DOM.disabledLink(`Lose weight`, [
				`You have nothing left to lose`,
			]));
		}
		if (!canEatFood(PC) && V.feeder === 1) {
			if (PC.diet === "corrective") {
				links.push(App.UI.DOM.disabledLink(`Correct weight`, [
					`${onDiet}`,
				]));
			} else if (PC.weight > 10 || PC.weight < -10) {
				links.push(App.UI.DOM.link(`Correct weight`, () => {
					PC.diet = "corrective";
					App.UI.DOM.replace(dietDiv, diet);
				}));
			} else {
				links.push(App.UI.DOM.disabledLink(`Correct weight`, [
					`You are already a healthy weight`,
				]));
			}
		}
		if (PC.diet === "fattening") {
			links.push(App.UI.DOM.disabledLink(`Gain weight`, [
				`${onDiet}`,
			]));
		} else if (PC.weight <= 195) {
			links.push(App.UI.DOM.link(`Gain weight`, () => {
				PC.diet = "fattening";
				App.UI.DOM.replace(dietDiv, diet);
			}));
		} else {
			links.push(App.UI.DOM.disabledLink(`Gain weight`, [
				`You can't risk getting any fatter`,
			]));
		}
		if (PC.diet === "muscle building") {
			links.push(App.UI.DOM.disabledLink(`Build muscle`, [
				`${onDiet}`,
			]));
		} else if (PC.muscles < 100 && !isAmputee(PC) && !onBedRest(PC)) {
			links.push(App.UI.DOM.link(`Build muscle`, () => {
				PC.diet = "muscle building";
				App.UI.DOM.replace(dietDiv, diet);
			}));
		} else if (isAmputee(PC)) {
			links.push(App.UI.DOM.disabledLink(`Build muscle`, [
				`You can't work out with no limbs`,
			]));
		} else if (onBedRest(PC)) {
			links.push(App.UI.DOM.disabledLink(`Build muscle`, [
				`You are in no condition to work out`,
			]));
		} else {
			links.push(App.UI.DOM.disabledLink(`Build muscle`, [
				`You can't get any stronger`,
			]));
		}
		if (PC.diet === "slimming") {
			links.push(App.UI.DOM.disabledLink(`Slim down`, [
				`${onDiet}`,
			]));
		} else if (PC.muscles > 0 && canWalk(PC) && !onBedRest(PC)) {
			links.push(App.UI.DOM.link(`Slim down`, () => {
				PC.diet = "slimming";
				App.UI.DOM.replace(dietDiv, diet);
			}));
		} else if (onBedRest(PC)) {
			links.push(App.UI.DOM.disabledLink(`Build muscle`, [
				`You are in no condition to be doing cardio`,
			]));
		} else if (!canWalk(PC)) {
			links.push(App.UI.DOM.disabledLink(`Slim down`, [
				`You can't focus on cardio if you can't walk`,
			]));
		} else {
			links.push(App.UI.DOM.disabledLink(`Slim down`, [
				`You have no more muscle left to lose`,
			]));
		}
		if (!canEatFood(PC)) {
			if (PC.balls > 0 && V.cumProDiet === 1) {
				if (PC.diet === "cum production") {
					links.push(App.UI.DOM.disabledLink(`Cum production`, [
						`${onDiet}`,
					]));
				} else {
					links.push(App.UI.DOM.link(`Cum production`, () => {
						PC.diet = "cum production";
						App.UI.DOM.replace(dietDiv, diet);
					}));
				}
			}
			if (V.dietFertility === 1 && (PC.ovaries === 1 || PC.mpreg === 1)) {
				const superFetKnown = (PC.geneticQuirks.superfetation === 2 && (V.geneticMappingUpgrade > 0 || PC.counter.birthsTotal > 0 || PC.pregWeek > 3));
				if (PC.diet === "fertility") {
					links.push(App.UI.DOM.disabledLink(`Fertility`, [
						`${onDiet}`,
					]));
				} else if (!isFertile(PC) || (PC.preg !== 0 && !superFetKnown)) {
					links.push(App.UI.DOM.disabledLink(`Fertility`, [
						`You can't get pregnant`,
					]));
				} else {
					links.push(App.UI.DOM.link(`Fertility`, () => {
						PC.diet = "fertility";
						App.UI.DOM.replace(dietDiv, diet);
					}));
				}
			}
			if (V.feeder === 1) {
				if (PC.diet === "XX") {
					links.push(App.UI.DOM.disabledLink(`Estrogen enriched`, [
						`${onDiet}`,
					]));
				} else {
					links.push(App.UI.DOM.link(`Estrogen enriched`, () => {
						PC.diet = "XX";
						App.UI.DOM.replace(dietDiv, diet);
					}));
				}
				if (PC.diet === "XY") {
					links.push(App.UI.DOM.disabledLink(`Testosterone enriched`, [
						`${onDiet}`,
					]));
				} else {
					links.push(App.UI.DOM.link(`Testosterone enriched`, () => {
						PC.diet = "XY";
						App.UI.DOM.replace(dietDiv, diet);
					}));
				}
				if (V.dietXXY === 1 && PC.balls > 0 && (PC.ovaries === 1 || PC.mpreg === 1)) {
					if (PC.diet === "XXY") {
						links.push(App.UI.DOM.disabledLink(`Herm hormone blend`, [
							`${onDiet}`,
						]));
					} else {
						links.push(App.UI.DOM.link(`Herm hormone blend`, () => {
							PC.diet = "XXY";
							App.UI.DOM.replace(dietDiv, diet);
						}));
					}
				}
			}
		} else {
			if (PC.diet === "exotic") {
				links.push(App.UI.DOM.disabledLink(`Exotic`, [
					`${onDiet}`,
				]));
			} else {
				links.push(App.UI.DOM.link(`Exotic`, () => {
					PC.diet = "exotic";
					App.UI.DOM.replace(dietDiv, diet);
				}));
			}
			if (PC.diet === "medicinal") {
				links.push(App.UI.DOM.disabledLink(`Medicinal`, [
					`${onDiet}`,
				]));
			} else {
				links.push(App.UI.DOM.link(`Medicinal`, () => {
					PC.diet = "medicinal";
					App.UI.DOM.replace(dietDiv, diet);
				}));
			}
		}

		text.push(App.UI.DOM.generateLinksStrip(links));

		App.Events.addNode(dietDiv, text);

		return dietDiv;
	}

	/**
	 * @returns {HTMLDivElement} a div allowing the player to use drugs
	 */
	function drugs() {
		const hormonesDiv = document.createElement("div");
		const playerDrugsDiv = document.createElement("div");
		const pregDrugsDiv = document.createElement("div");
		const aphrodisiacDiv = document.createElement("div");

		App.UI.DOM.appendNewElement("h2", drugsDiv, `Drugs`);

		drugsDiv.append(playerDrugs());
		if (PC.hormones !== 0 || V.consumerDrugs !== 0) {
			drugsDiv.append(hormones());
		}
		if (PC.pregControl !== "none") {
			drugsDiv.append(pregDrugs());
		}
		drugsDiv.append(aphrodisiacs());

		return drugsDiv;

		/**
		 * @returns {HTMLDivElement} a div listing hormonal drugs
		 */
		function hormones() {
			App.UI.DOM.appendNewElement("h3", hormonesDiv, `Hormones`);
			if (PC.hormones !== 0) {
				const linkDiv = App.UI.DOM.makeElement("div", null, ['indent']);
				hormonesDiv.append(`You are currently taking ${PC.hormones === 1 ? "female" : "male"} hormones.`);
				if (V.consumerDrugs !== 1) {
					linkDiv.append(App.UI.DOM.link(`Stop filling your prescription`, () => {
						V.PC.hormones = 0;
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
					App.UI.DOM.appendNewElement("div", linkDiv, `You will need to visit your doctor to start a new prescription.`, ["indent", "note"]);
				} else {
					linkDiv.append(App.UI.DOM.link(`Stop taking them`, () => {
						V.PC.hormones = 0;
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
				hormonesDiv.append(linkDiv);
			} else {
				const links = [];
				hormonesDiv.append(`You are not taking any hormones. `);
				links.push(App.UI.DOM.link(`Male hormones`, () => {
					V.PC.hormones = -1;
					App.UI.DOM.replace(drugsDiv, drugs);
				}));
				links.push(App.UI.DOM.link(`Female hormones`, () => {
					V.PC.hormones = 1;
					App.UI.DOM.replace(drugsDiv, drugs);
				}));
				hormonesDiv.append(App.UI.DOM.generateLinksStrip(links));
			}

			return hormonesDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div listing drugs the player can use
		 */
		function playerDrugs() {
			const consumerDrugsDiv = document.createElement("div");
			const buyDrugsDiv = document.createElement("div");
			const slaveDrugsDiv = document.createElement("div");

			if (PC.drugs !== "no drugs") {
				playerDrugsDiv.append(`You are currently using ${PC.drugs}.`);
				playerDrugsDiv.append(App.UI.DOM.link(` Stop taking them`, () => {
					V.PC.drugs = "no drugs";
					App.UI.DOM.replace(drugsDiv, drugs);
				}));
				if ((["breast enhancers", "breast reducers", "butt enhancers", "butt reducers", "lip enhancers", "lip reducers", "penis enlargers", "penis reducers", "testicle enlargers", "testicle reducers", "fertility supplements"].includes(PC.drugs) && V.consumerDrugs === 0) || (["hip wideners", "detox pills"].includes(PC.drugs))) {
					App.UI.DOM.appendNewElement("div", playerDrugsDiv, `You will need to visit your doctor to start a new prescription.`, ["indent", "note"]);
				}
			} else {
				playerDrugsDiv.append(`You are not using any pharmaceutical drugs.`);
			}

			App.UI.DOM.appendNewElement("h3", playerDrugsDiv, `Consumer-grade`);
			playerDrugsDiv.append(consumerDrugs());
			if (V.consumerDrugs === 0 && V.dispensary === 1 && PC.skill.medicine >= 100) {
				playerDrugsDiv.append(buyConsumerDrugs());
			}
			App.UI.DOM.appendNewElement("h3", playerDrugsDiv, `Slave-grade`);
			playerDrugsDiv.append(slaveDrugs());

			return playerDrugsDiv;

			/**
			 * @returns {HTMLDivElement} a div listing consumer grade drugs the player can use
			 */
			function consumerDrugs() {
				const text = [];
				const links = [];

				if (V.consumerDrugs === 1) {
					if (PC.drugs !== "breast enhancers") {
						if (PC.boobs < 50000) {
							links.push(App.UI.DOM.link(`Breast enhancers`, () => {
								PC.drugs = "breast enhancers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Breast enhancers`, [
								`Breasts are too big for the patches to work`,
							]));
						}
					}
					if (PC.drugs !== "breast reducers") {
						if (App.Medicine.fleshSize(PC, 'boobs') > 100) {
							links.push(App.UI.DOM.link(`Breast reducers`, () => {
								PC.drugs = "breast reducers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Breast reducers`, [
								`Already flat enough`,
							]));
						}
					}
					if (PC.drugs !== "butt enhancers") {
						if (PC.butt < 20) {
							links.push(App.UI.DOM.link(`Butt enhancers`, () => {
								PC.drugs = "butt enhancers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Butt enhancers`, [
								`Butt is too large for the patches to work`,
							]));
						}
					}
					if (PC.drugs !== "butt reducers") {
						if (PC.butt - PC.buttImplant > 0) {
							links.push(App.UI.DOM.link(`Butt reducers`, () => {
								PC.drugs = "butt reducers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Butt reducers`, [
								`No ass left to lose`,
							]));
						}
					}
					if (PC.drugs !== "lip enhancers") {
						if (PC.lips < 100 || (PC.lips <= 85 && V.seeExtreme !== 1)) {
							links.push(App.UI.DOM.link(`Lip enhancers`, () => {
								PC.drugs = "lip enhancers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Lip enhancers`, [
								`Lips cannot grow larger`,
							]));
						}
					}
					if (PC.drugs !== "lip reducers") {
						if (PC.lips - PC.lipsImplant > 0) {
							links.push(App.UI.DOM.link(`Lip reducers`, () => {
								PC.drugs = "lip reducers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Lip reducers`, [
								`No lip left to give`,
							]));
						}
					}
					if (PC.drugs !== "penis enlargers") {
						if (PC.dick > 0 || PC.vagina >= 0) {
							if (PC.dick > 0) {
								if (PC.dick < 30) {
									links.push(App.UI.DOM.link(`Penis enlargers`, () => {
										PC.drugs = "penis enlargers";
										App.UI.DOM.replace(drugsDiv, drugs);
									}));
								} else {
									links.push(App.UI.DOM.disabledLink(`Penis enlargers`, [
										`Penis is too large for the patches to work`,
									]));
								}
							} else {
								if (PC.clit < 5) {
									links.push(App.UI.DOM.link(`Clit enlargers`, () => {
										PC.drugs = "penis enlargers";
										App.UI.DOM.replace(drugsDiv, drugs);
									}));
								} else {
									links.push(App.UI.DOM.disabledLink(`Clit enlargers`, [
										`Clit can't get any bigger`,
									]));
								}
							}
						}
					}
					if (PC.drugs !== "penis reducers") {
						if (PC.dick > 0) {
							if (PC.dick > 1) {
								links.push(App.UI.DOM.link(`Penis reducers`, () => {
									PC.drugs = "penis reducers";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							} else {
								links.push(App.UI.DOM.disabledLink(`Penis reducers`, [
									`Dick cannot possibly get smaller`,
								]));
							}
						} else if (PC.vagina >= 0) {
							if (PC.clit > 0) {
								links.push(App.UI.DOM.link(`Clit reducers`, () => {
									PC.drugs = "penis reducers";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							} else {
								links.push(App.UI.DOM.disabledLink(`Clit reducers`, [
									`Clit cannot possibly get smaller`,
								]));
							}
						}
					}
					if (PC.drugs !== "testicle enlargers") {
						if (PC.balls > 0 && PC.scrotum > 0) {
							if (PC.balls < 125) {
								links.push(App.UI.DOM.link(`Testicle enlargers`, () => {
									PC.drugs = "testicle enlargers";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							} else {
								links.push(App.UI.DOM.disabledLink(`Testicle enlargers`, [
									`Balls are too large for the patches to work`,
								]));
							}
						}
					}
					if (PC.drugs !== "testicle reducers") {
						if (PC.balls > 0 && PC.scrotum > 0) {
							if (PC.balls > 1) {
								links.push(App.UI.DOM.link(`Testicle reducers`, () => {
									PC.drugs = "testicle reducers";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							} else {
								links.push(App.UI.DOM.disabledLink(`Testicle reducers`, [
									`Balls cannot possibly get smaller`,
								]));
							}
						}
					}
					if (PC.drugs !== "fertility supplements") {
						links.push(App.UI.DOM.link(`Fertility supplements`, () => {
							PC.drugs = "fertility supplements";
							App.UI.DOM.replace(drugsDiv, drugs);
						}));
					}
				}

				if (PC.drugs !== "stamina enhancers") {
					links.push(App.UI.DOM.link(`Stamina enhancers`, () => {
						PC.drugs = "stamina enhancers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
				if (PC.drugs !== "appetite suppressors") {
					links.push(App.UI.DOM.link(`Appetite suppressors`, () => {
						PC.drugs = "appetite suppressors";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}

				// Modded consumer grade PC drugs
				App.Mods.Drugs.list.filter(drug => drug.isPCDrug && drug.isConsumerGrade && drug.available(PC)).forEach(drug => {
					if (PC.drugs !== drug.name) {
						if (drug.enable(PC) === true) {
							links.push(App.UI.DOM.link(drug.text, () => {
								PC.drugs = drug.name;
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(drug.text, [drug.enable(PC)]));
						}
					}
				});

				text.push(App.UI.DOM.generateLinksStrip(links));

				App.Events.addNode(consumerDrugsDiv, text);

				return consumerDrugsDiv;
			}

			/**
			 * @returns {HTMLDivElement} a div allowing the player to purchase a prescription drug license
			 */
			function buyConsumerDrugs() {
				const drugsCash = 20000;
				buyDrugsDiv.append(
					App.UI.DOM.link(`Purchase a prescription drug license`, () => {
						V.consumerDrugs = 1;
						cashX(forceNeg(drugsCash), "capEx");

						App.UI.DOM.replace(drugsDiv, drugs);
					}),
				);
				App.UI.DOM.appendNewElement("span", buyDrugsDiv, ` Will cost you ${(cashFormat(drugsCash))}`, ['note']);

				return buyDrugsDiv;
			}

			/**
			 * @returns {HTMLDivElement} a div listing slave grade drugs the player can use
			 */
			function slaveDrugs() {
				const text = [];
				const links = [];
				if (arcology.FSSlaveProfessionalismResearch === 1) {
					if (PC.drugs !== "psychostimulants") {
						if (canImproveIntelligence(PC)) {
							links.push(App.UI.DOM.link(`Psychostimulants`, () => {
								PC.drugs = "psychostimulants";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Psychostimulants`, [
								`Cannot improve intelligence further this way`,
							]));
						}
					}
				}

				if (arcology.FSAssetExpansionistResearch === 1) {
					if (PC.drugs !== "hyper breast injections") {
						if (PC.boobs < 50000) {
							links.push(App.UI.DOM.link(`Hyper breast injections`, () => {
								PC.drugs = "hyper breast injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Hyper breast injections`, [
								`Breasts are too big for the drugs to work`,
							]));
						}
					}
				}
				if (PC.drugs !== "breast injections" && PC.drugs !== "intensive breast injections") {
					if (PC.boobs < 50000) {
						if (PC.drugs !== "breast injections") {
							links.push(App.UI.DOM.link(`Breast injections`, () => {
								PC.drugs = "breast injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						}
						if (PC.drugs !== "intensive breast injections") {
							links.push(App.UI.DOM.link(`Intensive breast injections`, () => {
								PC.drugs = "intensive breast injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						}
					} else {
						links.push(App.UI.DOM.disabledLink(`Breast injections`, [
							`Breasts are too big for the drugs to work`,
						]));
					}
				}
				if (arcology.FSSlimnessEnthusiastResearch === 1) {
					if (PC.drugs !== "breast redistributors") {
						if (App.Medicine.fleshSize(PC, 'boobs') > 100) {
							links.push(App.UI.DOM.link(`Breast redistributors`, () => {
								PC.drugs = "breast redistributors";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Breast redistributors`, [
								`Already flat enough`,
							]));
						}
					}
				}

				if (V.dispensary) {
					if (PC.drugs !== "nipple enhancers") {
						if (["inverted", "partially inverted", "cute", "tiny", "puffy", "flat"].includes(PC.nipples)) {
							links.push(App.UI.DOM.link(`Nipple enhancers`, () => {
								PC.drugs = "nipple enhancers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else if (PC.nipples === "huge") {
							links.push(App.UI.DOM.disabledLink(`Nipple enhancers`, [
								`Nipples cannot get any larger`,
							]));
						} else {
							links.push(App.UI.DOM.disabledLink(`Nipple enhancers`, [
								`Will not affect your nipples`,
							]));
						}
					}
				}
				if (arcology.FSSlimnessEnthusiastResearch === 1) {
					if (PC.drugs !== "nipple atrophiers") {
						if (PC.nipples === "huge" || PC.nipples === "puffy" || PC.nipples === "cute") {
							links.push(App.UI.DOM.link(`Nipple atrophiers`, () => {
								PC.drugs = "nipple atrophiers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Nipple atrophiers`, [
								`Will not affect your nipples`,
							]));
						}
					}
				}

				if (arcology.FSAssetExpansionistResearch === 1) {
					if (PC.drugs !== "hyper butt injections") {
						if (PC.butt < 20) {
							links.push(App.UI.DOM.link(`Hyper butt injections`, () => {
								PC.drugs = "hyper butt injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Hyper butt injections`, [
								`Ass cannot grow larger`,
							]));
						}
					}
				}
				if (PC.drugs !== "butt injections" && PC.drugs !== "intensive butt injections") {
					if (PC.butt < 9) {
						if (PC.drugs !== "butt injections") {
							links.push(App.UI.DOM.link(`Butt injections`, () => {
								PC.drugs = "butt injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						}
						if (PC.drugs !== "intensive butt injections") {
							links.push(App.UI.DOM.link(`Intensive butt injections`, () => {
								PC.drugs = "intensive butt injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						}
					} else {
						links.push(App.UI.DOM.disabledLink(`Butt injections`, [
							`Ass is too big for the drugs to work`,
						]));
					}
				}
				if (arcology.FSSlimnessEnthusiastResearch === 1) {
					if (PC.drugs !== "butt redistributors") {
						if (PC.butt - PC.buttImplant > 0) {
							links.push(App.UI.DOM.link(`Butt redistributors`, () => {
								PC.drugs = "butt redistributors";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Butt redistributors`, [
								`No ass left to lose`,
							]));
						}
					}
				}

				if (V.dispensary) {
					if (PC.drugs !== "lip injections") {
						if (PC.lips <= 95 || (PC.lips <= 85 && V.seeExtreme !== 1)) {
							links.push(App.UI.DOM.link(`lip injections`, () => {
								PC.drugs = "lip injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`lip injections`, [
								`Lips cannot grow larger`,
							]));
						}
					}
				}
				if (arcology.FSSlimnessEnthusiastResearch === 1) {
					if (PC.drugs !== "lip atrophiers") {
						if (PC.lips - PC.lipsImplant > 0) {
							links.push(App.UI.DOM.link(`Lip atrophiers`, () => {
								PC.drugs = "lip atrophiers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Lip atrophiers`, [
								`No lip left to give`,
							]));
						}
					}
				}

				if (arcology.FSAssetExpansionistResearch === 1) {
					if (PC.drugs !== "hyper penis enhancement") {
						if (PC.dick > 0) {
							if (PC.dick < 30) {
								links.push(App.UI.DOM.link(`Hyper penis enhancement`, () => {
									PC.drugs = "hyper penis enhancement";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							} else {
								links.push(App.UI.DOM.disabledLink(`Hyper penis enhancement`, [
									`Dick cannot grow larger`,
								]));
							}
						} else {
							if (PC.clit < 5) {
								links.push(App.UI.DOM.link(`Hyper clitoris enhancement`, () => {
									PC.drugs = "hyper penis enhancement";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							} else {
								links.push(App.UI.DOM.disabledLink(`Hyper clitoris enhancement`, [
									`Clit cannot grow larger`,
								]));
							}
						}
					}
				}
				if (PC.drugs !== "penis enhancement" && PC.drugs !== "intensive penis enhancement") {
					if (PC.dick > 0) {
						if (PC.dick < 10) {
							if (PC.drugs !== "penis enhancement") {
								links.push(App.UI.DOM.link(`Penis enhancement`, () => {
									PC.drugs = "penis enhancement";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							}
							if (PC.drugs !== "intensive penis enhancement") {
								links.push(App.UI.DOM.link(`Intensive penis enhancement`, () => {
									PC.drugs = "intensive penis enhancement";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							}
						} else {
							links.push(App.UI.DOM.disabledLink(`Penis enhancement`, [
								`Dick is too big for the drugs to work`,
							]));
						}
					} else {
						if (PC.clit < 5) {
							if (PC.drugs !== "penis enhancement") {
								links.push(App.UI.DOM.link(`Clitoris enhancement`, () => {
									PC.drugs = "penis enhancement";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							}
							if (PC.drugs !== "intensive penis enhancement") {
								links.push(App.UI.DOM.link(`Intensive clitoris enhancement`, () => {
									PC.drugs = "intensive penis enhancement";
									App.UI.DOM.replace(drugsDiv, drugs);
								}));
							}
						} else {
							links.push(App.UI.DOM.disabledLink(`Penis enhancement`, [
								`Clit cannot grow larger`,
							]));
						}
					}
				}
				if (arcology.FSSlimnessEnthusiastResearch === 1) {
					if (PC.drugs !== "penis atrophiers") {
						if (PC.dick > 1) {
							links.push(App.UI.DOM.link(`Penile atrophiers`, () => {
								PC.drugs = "penis atrophiers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Penile atrophiers`, [
								`Dick cannot possibly get smaller`,
							]));
						}
					}
					if (PC.drugs !== "clitoris atrophiers") {
						if (PC.clit > 0) {
							links.push(App.UI.DOM.link(`Clitoral atrophiers`, () => {
								PC.drugs = "clitoris atrophiers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Clitoral atrophiers`, [
								`Clit cannot possibly get smaller`,
							]));
						}
					}
				}
				if (PC.drugs !== "priapism agents") {
					if (PC.dick.isBetween(0, 11) && !canAchieveErection(PC)) {
						links.push(App.UI.DOM.link(`Priapism agents`, () => {
							PC.drugs = "priapism agents";
							App.UI.DOM.replace(drugsDiv, drugs);
						}));
					}
				}

				if (PC.balls > 0) {
					if (arcology.FSAssetExpansionistResearch === 1) {
						if (PC.drugs !== "hyper testicle enhancement") {
							links.push(App.UI.DOM.link(`Hyper testicle enhancement`, () => {
								PC.drugs = "hyper testicle enhancement";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						}
					}
					if (PC.drugs !== "testicle enhancement" && PC.drugs !== "intensive testicle enhancement") {
						links.push(App.UI.DOM.link(`Testicle enhancement`, () => {
							PC.drugs = "testicle enhancement";
							App.UI.DOM.replace(drugsDiv, drugs);
						}));
						links.push(App.UI.DOM.link(`Intensive testicle enhancement`, () => {
							PC.drugs = "intensive testicle enhancement";
							App.UI.DOM.replace(drugsDiv, drugs);
						}));
					}
				}

				if (PC.drugs !== "fertility drugs") {
					links.push(App.UI.DOM.link(`Fertility drugs`, () => {
						PC.drugs = "fertility drugs";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
				if (PC.drugs !== "super fertility drugs") {
					if (V.seeHyperPreg === 1 && V.superFertilityDrugs === 1) {
						links.push(App.UI.DOM.link(`Super fertility drugs`, () => {
							PC.drugs = "super fertility drugs";
							App.UI.DOM.replace(drugsDiv, drugs);
						}));
					}
				}

				if (V.precociousPuberty === 1 && V.pubertyHormones === 1) {
					if (PC.balls > 0 && PC.pubertyXY === 0) {
						if (PC.drugs !== "male hormone injections") {
							links.push(App.UI.DOM.link(`XY injections`, () => {
								PC.drugs = "male hormone injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						}
					}
					if ((PC.ovaries === 1 || PC.mpreg === 1) && PC.pubertyXX === 0) {
						if (PC.drugs !== "female hormone injections") {
							links.push(App.UI.DOM.link(`XX injections`, () => {
								PC.drugs = "female hormone injections";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						}
					}
				}
				if (PC.drugs !== "hormone blockers") {
					links.push(App.UI.DOM.link(`Hormone blockers`, () => {
						PC.drugs = "hormone blockers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}
				if (PC.drugs !== "hormone enhancers") {
					links.push(App.UI.DOM.link(`Hormone enhancers`, () => {
						PC.drugs = "hormone enhancers";
						App.UI.DOM.replace(drugsDiv, drugs);
					}));
				}

				if (arcology.FSSlimnessEnthusiastResearch === 1) {
					if (PC.drugs !== "labia atrophiers") {
						if (PC.labia > 0) {
							links.push(App.UI.DOM.link(`Labia atrophiers`, () => {
								PC.drugs = "labia atrophiers";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						}
					}
				}
				if (V.growthStim === 1) {
					if (PC.drugs !== "growth stimulants") {
						if (canImproveHeight(PC)) {
							links.push(App.UI.DOM.link(`Growth stimulants`, () => {
								PC.drugs = "growth stimulants";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Growth stimulants`, [
								`Your body just cannot grow any more`,
							]));
						}
					}
				}
				links.push(App.UI.DOM.link(`Steroids`, () => {
					PC.drugs = "steroids";
					App.UI.DOM.replace(drugsDiv, drugs);
				}));
				if (PC.boobs > 250 && PC.boobShape !== "saggy" && V.purchasedSagBGone === 1) {
					if (PC.drugs !== "sag-B-gone") {
						links.push(App.UI.DOM.link(`Sag-B-Gone breast lifting cream`, () => {
							PC.drugs = "sag-B-gone";
							App.UI.DOM.replace(drugsDiv, drugs);
						}));
					}
				}
				if (arcology.FSYouthPreferentialistResearch === 1) {
					if (PC.drugs !== "anti-aging cream") {
						if (PC.visualAge > 18) {
							links.push(App.UI.DOM.link(`Anti-aging cream`, () => {
								PC.drugs = "anti-aging cream";
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(`Anti-aging cream`, [
								`Cream alone can only get you so far`,
							]));
						}
					}
				}

				// Modded slave grade PC drugs
				App.Mods.Drugs.list.filter(drug => drug.isPCDrug && !drug.isConsumerGrade && drug.available(PC)).forEach(drug => {
					if (PC.drugs !== drug.name) {
						if (drug.enable(PC) === true) {
							links.push(App.UI.DOM.link(drug.text, () => {
								PC.drugs = drug.name;
								App.UI.DOM.replace(drugsDiv, drugs);
							}));
						} else {
							links.push(App.UI.DOM.disabledLink(drug.text, [drug.enable(PC)]));
						}
					}
				});

				text.push(App.UI.DOM.generateLinksStrip(links));

				App.Events.addNode(slaveDrugsDiv, text);

				if (canEatFood(PC)) {
					if ((arcology.FSBodyPuristLaw === 0 && V.healthyDrugsUpgrade === 0) || (["hyper breast injections", "hyper butt injections", "growth stimulants", "hyper penis enhancement", "hyper testicle enhancement", "super fertility drugs"].includes(PC.drugs))) {
						App.UI.DOM.appendNewElement("div", slaveDrugsDiv, `Most slave-grade drugs are unhealthy and should be used sparingly.`, ["indent", "note"]);
					}
				}

				return slaveDrugsDiv;
			}
		}

		/**
		 * @returns {HTMLDivElement} a div that allows the player to stop taking labor suppressors
		 */
		function pregDrugs() {
			const text = [];

			App.UI.DOM.appendNewElement("h3", pregDrugsDiv, `Pregnancy Drugs`);
			pregDrugsDiv.append(`You are currently using labor suppressors to delay birth.`);
			text.push(
				App.UI.DOM.link(`Stop taking them`, () => {
					PC.pregControl = "none";
					App.UI.DOM.replace(appearanceDiv, appearance);
					App.UI.DOM.replace(drugsDiv, drugs);
				})
			);
			App.Events.addNode(pregDrugsDiv, text);

			return pregDrugsDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div letting the player take aphrodisiacs
		 */
		function aphrodisiacs() {
			const text = [];

			App.UI.DOM.appendNewElement("h3", aphrodisiacDiv, `Aphrodisiacs`);
			if (PC.aphrodisiacs > 0) {
				if (PC.addict > 10) {
					text.push(`You are enjoying aphrodisiacs and how fun they are to use.`);
				} else if (PC.addict > 3) {
					text.push(`You are currently enjoying aphrodisiacs and how fun they make sex.`);
				} else {
					text.push(`You are currently using aphrodisiacs to supercharge your sex drive.`);
				}
				if (random(1, 100) > PC.addict * 4) {
					text.push(
						App.UI.DOM.link(`Stop taking them`, () => {
							PC.aphrodisiacs = 0;
							App.UI.DOM.replace(appearanceDiv, appearance);
							App.UI.DOM.replace(drugsDiv, drugs);
						})
					);
				} else {
					const addicted = ["Yeah right", "How about not?", "Maybe later...", "Tomorrow seems better...", "Yeah, no", "Not happening", "Would rather not", "Feels too good", "No stopping it"];
					text.push(
						App.UI.DOM.disabledLink(`Stop taking them`, [
							`${jsEither(addicted)}`,
						])
					);
				}
			} else if (PC.aphrodisiacs < 0) {
				text.push(`You are currently using anaphrodisiacs to rein in your sex drive.`);
				text.push(
					App.UI.DOM.link(`Stop taking them`, () => {
						PC.aphrodisiacs = 0;
						App.UI.DOM.replace(appearanceDiv, appearance);
						App.UI.DOM.replace(drugsDiv, drugs);
					})
				);
			} else if (PC.addict > 10) {
				text.push(`You are currently cut off from your aphrodisiacs by that fucking bitch of a PA.`);
				text.push(
					App.UI.DOM.link(`Override your decision`, () => {
						PC.aphrodisiacs = 1;
						App.UI.DOM.replace(appearanceDiv, appearance);
						App.UI.DOM.replace(drugsDiv, drugs);
					})
				);
			} else {
				text.push(`You are not taking any aphrodisiacs.`);
				if (PC.addict > 0) {
					text.push(
						App.UI.DOM.link(`But you could be...`, () => {
							PC.aphrodisiacs = 1;
							App.UI.DOM.replace(appearanceDiv, appearance);
							App.UI.DOM.replace(drugsDiv, drugs);
						})
					);
				} else {
					text.push(
						App.UI.DOM.link(`Start taking them`, () => {
							PC.aphrodisiacs = 1;
							App.UI.DOM.replace(appearanceDiv, appearance);
							App.UI.DOM.replace(drugsDiv, drugs);
						})
					);
				}
			}
			App.Events.addNode(aphrodisiacDiv, text);
			if (PC.aphrodisiacs === 0 && PC.addict === 0) {
				App.UI.DOM.appendNewElement("div", aphrodisiacDiv, `Aphrodisiacs will increase the amount of sex you can have in a week, but are dangerously addictive.`, ["indent", "note"]);
			}

			return aphrodisiacDiv;
		}
	}

	/**
	 * @returns {HTMLDivElement} a div with options related to the players lactation or lack thereof
	 */
	function lactation() {
		App.UI.DOM.appendNewElement("h2", lactationDiv, `Lactation`);

		const text = [];

		if (PC.lactation > 1) {
			text.push(`Your breasts are swollen with milk.`);

			if (PC.rules.lactation === "sell") {
				text.push(
					`You are spending time with the penthouse milkers and making a quick ¤ from your efforts.`,
					App.UI.DOM.generateLinksStrip([
						App.UI.DOM.disabledLink(`Stop milking yourself`, [
							`Your breasts would leak uncontrollably.`
						]),
						App.UI.DOM.link(`Stop using the milkers`, () => {
							V.PC.rules.lactation = "maintain";
							App.UI.DOM.replace(lactationDiv, lactation);
						}),
						App.UI.DOM.disabledLink(`Use the penthouse milkers`, [
							`You are already selling your breast milk.`
						])
					])
				);
			} else if (PC.rules.lactation === "maintain") {
				text.push(
					`You have no choice but to regularly drain yourself.`,
					App.UI.DOM.generateLinksStrip([
						App.UI.DOM.disabledLink(`Stop milking yourself`, [
							`Your breasts would leak uncontrollably.`
						]),
						App.UI.DOM.disabledLink(`Keep yourself milked`, [
							`You need to do this to remain comfortable.`
						]),
						App.UI.DOM.link(`Use the penthouse milkers`, () => {
							V.PC.rules.lactation = "sell";
							App.UI.DOM.replace(lactationDiv, lactation);
						}),
					])
				);
			}
		} else if (PC.lactation > 0) {
			text.push(`Your breasts are laden with milk.`);

			if (PC.rules.lactation === "sell") {
				text.push(
					`You are spending time with the penthouse milkers and making a quick ¤ from your efforts.`,
					App.UI.DOM.generateLinksStrip([
						App.UI.DOM.link(`Stop milking yourself`, () => {
							V.PC.rules.lactation = "none";
							App.UI.DOM.replace(lactationDiv, lactation);
						}),
						App.UI.DOM.link(`Stop using the milkers`, () => {
							V.PC.rules.lactation = "maintain";
							App.UI.DOM.replace(lactationDiv, lactation);
						}),
						App.UI.DOM.disabledLink(`Use the penthouse milkers`, [
							`You are already selling your breast milk.`
						])
					])
				);
			} else if (PC.rules.lactation === "maintain") {
				text.push(
					`You are taking the time to keep yourself lactating.`,
					App.UI.DOM.generateLinksStrip([
						App.UI.DOM.link(`Stop milking yourself`, () => {
							V.PC.rules.lactation = "none";
							App.UI.DOM.replace(lactationDiv, lactation);
						}),
						App.UI.DOM.disabledLink(`Keep yourself milked`, [
							`You are already maintaining lactation.`
						]),
						App.UI.DOM.link(`Use the penthouse milkers`, () => {
							V.PC.rules.lactation = "sell";
							App.UI.DOM.replace(lactationDiv, lactation);
						}),
					])
				);
			} else {
				text.push(
					`You are currently letting nature run its course.`,
					App.UI.DOM.generateLinksStrip([
						App.UI.DOM.disabledLink(`Stop milking yourself`, [
							`You aren't currently milking yourself.`
						]),
						App.UI.DOM.link(`Keep yourself milked`, () => {
							V.PC.rules.lactation = "maintain";
							App.UI.DOM.replace(lactationDiv, lactation);
						}),
						App.UI.DOM.link(`Use the penthouse milkers`, () => {
							V.PC.rules.lactation = "sell";
							App.UI.DOM.replace(lactationDiv, lactation);
						}),
					])
				);
			}
		} else {
			text.push(`You could induce yourself to begin lactating.`);

			if (PC.rules.lactation === "induce") {
				text.push(
					`You are spending time stimulating your breasts and nipples to bring in your milk.`,
					App.UI.DOM.link(`Lose interest.`, () => {
						V.PC.rules.lactation = "none";
						App.UI.DOM.replace(lactationDiv, lactation);
					})
				);
			} else {
				text.push(
					App.UI.DOM.link(`Sounds fun!`, () => {
						V.PC.rules.lactation = "induce";
						App.UI.DOM.replace(lactationDiv, lactation);
					})
				);
			}
		}

		App.Events.addNode(lactationDiv, text);

		return lactationDiv;
	}

	/**
	 * @returns {HTMLDivElement} a div with text related to `Elite Breeder Qualifications`
	 */
	function breederExam() {
		App.UI.DOM.appendNewElement("h2", breederExamDiv, `Elite Breeder Qualifications`);

		breederExamDiv.append(App.Interact.eliteBreedingExam());

		return breederExamDiv;
	}

	/**
	 * @returns {HTMLDivElement} a div listing perverted things the player can do to themselves
	 */
	function perversions() {
		const bloatingDiv = document.createElement("div");
		const cumTapDiv = document.createElement("div");
		const impregnateSelfDiv = document.createElement("div");
		const dildoSelfDiv = document.createElement("div");
		const betterToyDiv = document.createElement("div");

		App.UI.DOM.appendNewElement("h2", pervertDiv, `Perversions`);

		/*
		if (V.toys.smartStrapon === 0 && V.PC.dick === 0 && V.PC.lusty > 0 && V.assistant.personality > 0 && V.cash >= 8000) {
			pervertDiv.append(checkOutThisStrapon());
		}
		*/

		pervertDiv.append(dildoSelf());

		// set these to use standard preg/inflation bars
		if (PC.preg === 0 && PC.pregWeek === 0 && PC.vagina > -1) {
			pervertDiv.append(
				cumTap(),
				impregnateSelf(),
			);
		}

		/*
		function checkOutThisStrapon() {
			const text = [];

			text.push(
				`"${properTitle()}," ${V.assistant.announcedName} chimes in, "I may have a solution to your sexual frustrations. I've located a toy shop that custom produces strap-ons, among other things, that I can connect with and control. Using its multiple settings, I'll be able to maximize both you and your partners' pleasure, far better than any simple egg vibrator could." The price is a bit ludicris at <span class="cash dec">${(cashFormat(8000))},</span> but at least the delivery will be fast.`,
				App.UI.DOM.link(`Order the customized smart strap-on`, () => {
					V.toys.smartStrapon = 1;
					V.cash -= 8000;
					App.UI.DOM.replace(betterToyDiv, checkOutThisStrapon);
				})
			);

			return betterToyDiv;
		}
		*/

		/**
		 * @returns {HTMLDivElement} a div that allows the player to take their own virginity using a dildo
		 */
		function dildoSelf() {
			const text = [];

			if (V.PC.vagina === 0) {
				App.Events.addNode(dildoSelfDiv, [
					`Your virgin vagina is guarded by an intact hymen.`,
					App.UI.DOM.passageLink(`Use a dildo to take your own cherry`, 'pDildoVagina')
				], 'div');
			}
			if (V.PC.anus === 0) {
				App.Events.addNode(dildoSelfDiv, [
					`Your virgin ass is tight and untouched.`,
					App.UI.DOM.passageLink(`Use a dildo to stretch your anus`, 'pDildoAss')
				], 'div');
			}

			App.Events.addNode(dildoSelfDiv, text);

			return dildoSelfDiv;
		}

		function bloating() {
			const text = [];

			let bloating = document.createElement('div');
			if (PC.inflation > 0) {
				let intro = document.createElement('span');
				intro.textContent = "Required Bloating";
				intro.style.textDecoration = "underline";
				bloating.append(intro);

				bloating.append(": ");

				let requirement = document.createElement('span');
				requirement.style.fontWeight = "bold";
				requirement.id = "inflate";
				if (PC.inflation === 3) {
					requirement.textContent = `he is required to keep 2 gallons of ${PC.inflationType} in him at all times`;
				} else if (PC.inflation === 2) {
					requirement.textContent = `he is required to keep 4 liters of ${PC.inflationType} in him at all times`;
				} else if (PC.inflation === 1) {
					requirement.textContent = `he is required to keep 2 liters of ${PC.inflationType} in him at all times`;
				}
				bloating.append(requirement);
				bloating.append(". ");

				let link = App.UI.DOM.link(
					`Let $him deflate`,
					() => {
						deflate(PC);
					},
				);
				bloating.append(link);
			}

			return bloatingDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div that lets the player impregnate themselves using the fluids from the dairy farm
		 */
		function cumTap() {
			const text = [];

			if (V.dairyPiping && (cumSlaves().length > 0 || arcology.FSPastoralistLaw === 1)) {
				if (PC.skill.cumTap === 0) {
					text.push(
						`The tap connected to ${V.dairyName} has a variety of attachments, one of which being a very tantalizing dick-shaped nozzle. It looks like it would be a perfect fit for you, if you were curious, that is.`,
						App.UI.DOM.passageLink(`No one is looking...`, 'FSelf'),
					);
				} else {
					text.push(
						`The tap connected to ${V.dairyName} is calling to you. Begging to let it fill you with cum again. If you wanted to try and go bigger, that is.`,
						App.UI.DOM.generateLinksStrip([
							App.UI.DOM.passageLink(`Sounds fun!`, 'FSelf'),
							App.UI.DOM.link(`You only want to get pregnant`, () => {
								V.PC.preg = 1;
								V.PC.pregSource = 0;
								V.PC.pregKnown = 1;
								V.PC.pregType = setPregType(V.PC);

								WombImpregnate(V.PC, V.PC.pregType, 0, 1);

								App.UI.DOM.replace(cumTapDiv, cumTap);
							})
						])
					);
				}
			}
			/*
			if (V.dairyPiping && (cumSlaves().length > 0 || arcology.FSPastoralistLaw === 1)) {
				if (PC.vagina > 0 || PC.anus > 0)
				if (PC.skill.cumTap === 0) {
					text.push(
						`The tap connected to ${V.dairyName} has a variety of attachments, one of which being a very tantalizing dick-shaped nozzle. It looks like it would be a perfect fit for you, if you were curious, that is.`,
						App.UI.DOM.passageLink(`No one is looking...`, 'FSelf'),
					);
				} else {
					text.push(
						`The tap connected to ${V.dairyName} is calling to you. Begging to let it fill you with cum again. If you wanted to try and go bigger, that is.`,
						App.UI.DOM.passageLink(`Sounds fun!`, 'FSelf');
						if (canGetPregnant(PC)) {
							App.UI.DOM.link(`You only want to get pregnant`, () => {
								PC.preg = 1;
								PC.pregSource = 0;
								PC.pregKnown = 1;
								PC.pregType = setPregType(V.PC);

								WombImpregnate(PC, PC.pregType, 0, 1);

								App.UI.DOM.replace(cumTapDiv, cumTap);
							});
						}
					);
				}
			}
			*/

			App.Events.addNode(cumTapDiv, text);

			return cumTapDiv;
		}

		/**
		 * @returns {HTMLDivElement} a div that lets the player impregnate themselves if they have both a vagina and a dick
		 */
		function impregnateSelf() {
			const text = [];

			if (V.PC.vagina > 0 && V.PC.dick) {
				if (V.PC.counter.birthSelf > 0) {
					text.push(
						`Who better to impregnate you than you?`,
						App.UI.DOM.passageLink(`Impregnate yourself`, 'MpregSelf'),
					);
				} else {
					text.push(
						`You have an empty vagina, a working set of balls, and a strong craving for a hot creampie. Who better to give it to you than you?`,
						App.UI.DOM.passageLink(`Grab an extra syringe`, 'MpregSelf'),
					);
				}
			}
			/*
			if ((canImpreg(PC, PC) || canFemPreg(PC, PC)) && PC.counter.birthSelf > 0) {
				text.push(
					`Who better to impregnate you than you?`,
					App.UI.DOM.passageLink(`Impregnate yourself`, 'MpregSelf'),
				);
			} else if (PC.balls > 0 && PC.energy > 20) {
				if (PC.vagina >= 0) {
					text.push(
						`You have a${PC.vagina > 0 ? "n empty" : " tingling feeling in your"} vagina, a working set of balls, and a strong craving for a hot creampie. Who better to give it to you than you?`,
						App.UI.DOM.passageLink(`Grab an extra syringe`, 'MpregSelf'),
					);
				} else if (PC.anus > 0) {
					text.push(
						`You have an empty anus, a working set of balls, and a strong craving for a hot creampie. Who better to give it to you than you?`,
						App.UI.DOM.passageLink(`Grab an extra syringe`, 'MpregSelf'),
					);
				}
			}
			*/

			App.Events.addNode(impregnateSelfDiv, text);

			return impregnateSelfDiv;
		}

		return pervertDiv;
	}

	/**
	 * @returns {HTMLDivElement} a div letting the player cancel their wedding and change how often they watch FCTV
	 */
	function socials() {
		const weddingDiv = document.createElement("div");
		const FCTVDiv = document.createElement("div");
		let text = [];

		if (V.weddingPlanned) {
			text.push(wedding());
		}

		if (V.FCTV.receiver) {
			text.push(FCTV());
		}

		App.Events.addNode(socialDiv, text);

		/**
		 * @returns {HTMLDivElement} a div letting the player cancel their wedding
		 */
		function wedding() {
			const text = [];

			App.UI.DOM.appendNewElement("h2", weddingDiv, `Wedding`);

			text.push(`You have a wedding planned for this weekend; you are`);

			if (V.weddingPlanned === 1) {
				text.push(`marrying`);
			} else if (V.weddingPlanned === 2) {
				text.push(`sharing`);
			} else if (V.weddingPlanned === 3) {
				text.push(`knocking up`);
			} else {
				throw new Error(`Invalid V.weddingPlanned value of '${V.weddingPlanned}' in managePersonalAffairs()`);
			}

			text.push(
				marryingList(),
				App.UI.DOM.link(`Cancel it`, () => {
					V.weddingPlanned = 0;
					V.marrying = [];

					App.UI.DOM.replace(appearanceDiv, appearance);
				})
			);

			App.Events.addNode(weddingDiv, text);

			return weddingDiv;

			/**
			 * @returns {HTMLSpanElement} a span listing all the slaves the player is marrying this week
			 */
			function marryingList() {
				const listSpan = document.createElement("span");

				listSpan.append(
					App.UI.DOM.toSentence(V.marrying.map(id => App.UI.DOM.passageLink(SlaveFullName(getSlave(id)), 'Slave Interact'))),
					`.`,
				);

				return listSpan;
			}
		}

		/**
		 * @returns {HTMLDivElement} a div letting the player select how often they want to see FCTV
		 */
		function FCTV() {
			const text = [];
			const links = [];

			App.UI.DOM.appendNewElement("h2", FCTVDiv, `FCTV`);

			if (V.FCTV.pcViewership.frequency === 1) {
				text.push(`You make sure to tune in to FCTV at least once a week.`);
			} else if (V.FCTV.pcViewership.frequency === 2) {
				text.push(`You make sure to tune in to FCTV at least once biweekly.`);
			} else if (V.FCTV.pcViewership.frequency === 4) {
				text.push(`You make sure to tune in to FCTV at least once a month.`);
			} else {
				text.push(`You don't watch FCTV.`);
			}

			if (V.FCTV.pcViewership.frequency === 1) {
				links.push(App.UI.DOM.disabledLink(`Watch every week`, [
					`You are already watching every week.`,
				]));
			} else {
				links.push(App.UI.DOM.link(`Watch every week`, () => {
					V.FCTV.pcViewership.frequency = 1;
					App.UI.DOM.replace(FCTVDiv, FCTV);
				}));
			}
			if (V.FCTV.pcViewership.frequency === 2) {
				links.push(App.UI.DOM.disabledLink(`Watch every other week`, [
					`You are already watching every other week.`,
				]));
			} else {
				links.push(App.UI.DOM.link(`Watch every other week`, () => {
					V.FCTV.pcViewership.frequency = 2;
					App.UI.DOM.replace(FCTVDiv, FCTV);
				}));
			}
			if (V.FCTV.pcViewership.frequency === 4) {
				links.push(App.UI.DOM.disabledLink(`Watch once a month`, [
					`You are already watching once a month.`,
				]));
			} else {
				links.push(App.UI.DOM.link(`Watch once a month`, () => {
					V.FCTV.pcViewership.frequency = 4;
					App.UI.DOM.replace(FCTVDiv, FCTV);
				}));
			}
			if (V.FCTV.pcViewership.frequency === -1) {
				links.push(App.UI.DOM.disabledLink(`Ignore it`, [
					`You are already not watching.`,
				]));
			} else {
				links.push(App.UI.DOM.link(`Ignore it`, () => {
					V.FCTV.pcViewership.frequency = -1;
					App.UI.DOM.replace(FCTVDiv, FCTV);
				}));
			}

			if (V.saveImported > 0 && !V.FCTV.remote) {
				text.push(
					`You know TVs should have a remote.`,
					App.UI.DOM.link(`Buy one yourself`, () => {
						V.FCTV.remote = 1;

						cashX(forceNeg(100 * V.upgradeMultiplierTrade), "capEx");
						App.UI.DOM.replace(FCTVDiv, FCTV);
					})
				);
			}

			text.push(App.UI.DOM.generateLinksStrip(links));

			App.Events.addNode(FCTVDiv, text);

			return FCTVDiv;
		}

		return socialDiv;
	}

	/**
	 * @returns {HTMLDivElement} a div listing the current skill levels of the player
	 */
	function skills() {
		App.UI.DOM.appendNewElement("h2", skillsDiv, `Personal Skills`);

		skillsDiv.append(`You ponder what skills may be useful in running your arcology.`);

		App.UI.DOM.appendNewElement("div", skillsDiv, `Trading: ${getPlayerTradingSkill()}`);
		App.UI.DOM.appendNewElement("div", skillsDiv, `Warfare: ${getPlayerWarfareSkill()}`);
		App.UI.DOM.appendNewElement("div", skillsDiv, `Slaving: ${getPlayerSlavingSkill()}`);
		App.UI.DOM.appendNewElement("div", skillsDiv, `Engineering: ${getPlayerEngineeringSkill()}`);
		App.UI.DOM.appendNewElement("div", skillsDiv, `Medicine: ${getPlayerMedicineSkill()}`);
		App.UI.DOM.appendNewElement("div", skillsDiv, `Hacking: ${getPlayerHackingSkill()}`);

		return skillsDiv;

		/**
		 * @returns {string}
		 */
		function getPlayerTradingSkill() {
			if (PC.skill.trading >= 100) {
				return `You are a master at economics and trading.`;
			} else if (PC.skill.trading >= 80) {
				return `You are an expert at economics and trading.`;
			} else if (PC.skill.trading >= 60) {
				return `You are skilled in economics and trading.`;
			} else if (PC.skill.trading >= 40) {
				return `You know some things about economics and trading.`;
			} else if (PC.skill.trading >= 20) {
				return `You are a beginner in economics.`;
			} else if (PC.skill.trading >= 0) {
				return `You know only the basics of trading.`;
			} else if (PC.skill.trading >= -20) {
				return `You know how to haggle a little.`;
			} else if (PC.skill.trading >= -40) {
				return `You know how to shop around.`;
			} else if (PC.skill.trading >= -60) {
				return `You know not to pay sticker price.`;
			} else if (PC.skill.trading >= -80) {
				return `People always give you discounts, but you never save any money.`;
			} else {
				return `They said it was a bear market, so where are the bears?`;
			}
		}

		/**
		 * @returns {string}
		 */
		function getPlayerWarfareSkill() {
			if (PC.skill.warfare >= 100) {
				return `You are a master of warfare.`;
			} else if (PC.skill.warfare >= 80) {
				return `You are an expert at tactics and strategy.`;
			} else if (PC.skill.warfare >= 60) {
				return `You are skilled in combat.`;
			} else if (PC.skill.warfare >= 40) {
				return `You know some things about combat.`;
			} else if (PC.skill.warfare >= 20) {
				return `You are a beginner in tactics and strategy.`;
			} else if (PC.skill.warfare >= 0) {
				return `You know only the basics of fighting.`;
			} else if (PC.skill.warfare >= -20) {
				return `You know how to hold a gun.`;
			} else if (PC.skill.warfare >= -40) {
				return `You know how to stab with a knife.`;
			} else if (PC.skill.warfare >= -60) {
				return `Go for the throat?`;
			} else if (PC.skill.warfare >= -80) {
				return `Just kick them in the balls, right?`;
			} else {
				return `People like you are usually the first raped in a war.`;
			}
		}

		/**
		 * @returns {string}
		 */
		function getPlayerSlavingSkill() {
			if (PC.skill.slaving >= 100) {
				return `You are a master slaver.`;
			} else if (PC.skill.slaving >= 80) {
				return `You are an expert at enslaving.`;
			} else if (PC.skill.slaving >= 60) {
				return `You are skilled in slaving.`;
			} else if (PC.skill.slaving >= 40) {
				return `You know some things about getting slaves.`;
			} else if (PC.skill.slaving >= 20) {
				return `You are a beginner in slaving.`;
			} else if (PC.skill.slaving >= 0) {
				return `You know only the basics of slaving.`;
			} else if (PC.skill.slaving >= -20) {
				return `You know how to avoid becoming a slave.`;
			} else if (PC.skill.slaving >= -40) {
				return `You know to read contracts before you sign them.`;
			} else if (PC.skill.slaving >= -60) {
				return `You know to be careful.`;
			} else if (PC.skill.slaving >= -80) {
				return `You know better than to trust anyone.`;
			} else {
				return `It would be easy to enslave you.`;
			}
		}

		/**
		 * @returns {string}
		 */
		function getPlayerEngineeringSkill() {
			if (PC.skill.engineering >= 100) {
				return `You are a master engineer.`;
			} else if (PC.skill.engineering >= 80) {
				return `You are an expert at engineering.`;
			} else if (PC.skill.engineering >= 60) {
				return `You are skilled in engineering.`;
			} else if (PC.skill.engineering >= 40) {
				return `You know some things about engineering.`;
			} else if (PC.skill.engineering >= 20) {
				return `You are a beginner in engineering.`;
			} else if (PC.skill.engineering >= 0) {
				return `You know only the basics of engineering.`;
			} else if (PC.skill.engineering >= -20) {
				return `You can build a gingerbread house that doesn't collapse.`;
			} else if (PC.skill.engineering >= -40) {
				return `You can tie a tight knot, does that count?`;
			} else if (PC.skill.engineering >= -60) {
				return `Glue is your friend; lots of it.`;
			} else if (PC.skill.engineering >= -80) {
				return `You know better than to even try to build something.`;
			} else {
				return `You can cook; that's sort of like building something, right?`;
			}
		}

		/**
		 * @returns {string}
		 */
		function getPlayerMedicineSkill() {
			if (PC.skill.medicine >= 100) {
				return `You are a master surgeon.`;
			} else if (PC.skill.medicine >= 80) {
				return `You are an expert at medicine and surgery.`;
			} else if (PC.skill.medicine >= 60) {
				return `You are skilled in surgery.`;
			} else if (PC.skill.medicine >= 40) {
				return `You know some things about medicine.`;
			} else if (PC.skill.medicine >= 20) {
				return `You are a beginner in medicine.`;
			} else if (PC.skill.medicine >= 0) {
				return `You know the basics of treating injuries.`;
			} else if (PC.skill.medicine >= -20) {
				return `You can stop a wound from getting infected.`;
			} else if (PC.skill.medicine >= -40) {
				return `Gauze is your friend. Just keep wrapping.`;
			} else if (PC.skill.medicine >= -60) {
				return `You know how to apply a band-aid.`;
			} else if (PC.skill.medicine >= -80) {
				return `Cure-alls are wonderful. Why aren't they sold in stores, though?`;
			} else {
				return `Alcohol makes pain go away, right?`;
			}
		}

		/**
		 * @returns {string}
		 */
		function getPlayerHackingSkill() {
			if (PC.skill.hacking >= 100) {
				return `You are a master of hacking.`;
			} else if (PC.skill.hacking >= 80) {
				return `You are an expert at hacking.`;
			} else if (PC.skill.hacking >= 60) {
				return `You are skilled in hacking.`;
			} else if (PC.skill.hacking >= 40) {
				return `You know some things about hacking.`;
			} else if (PC.skill.hacking >= 20) {
				return `You are a beginner in hacking.`;
			} else if (PC.skill.hacking >= 0) {
				return `You know only the basics of hacking.`;
			} else if (PC.skill.hacking >= -20) {
				return `You know how to click a mouse.`;
			} else if (PC.skill.hacking >= -40) {
				return `Enter does something?`;
			} else if (PC.skill.hacking >= -60) {
				return `Where is the "any" key?`;
			} else if (PC.skill.hacking >= -80) {
				return `You can push the power button, good job.`;
			} else {
				return `This black box thingy is magical.`;
			}
		}
	}
};
