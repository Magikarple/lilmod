App.UI.Player.personalAttention = function() {
	const frag = new DocumentFragment();

	App.UI.DOM.appendNewElement("h1", frag, `Personal Attention`);

	V.nextButton = "Back to Main";
	V.nextLink = "Main";

	// set up div for refreshing options
	const refreshDiv = App.UI.DOM.appendNewElement("div", frag, content());

	return frag;

	function content() {
		const frag = new DocumentFragment();

		// ensure only the maximum number of slaves are being trained
		if (V.personalAttention.slaves && V.personalAttention.slaves.length > (V.PC.skill.slaving >= 100 ? 2 : 1)) {
			V.personalAttention.slaves.shift();
		}

		frag.append(
			focus(),
			proclamations(),
			skills(),
			attention(),
			slaves(),
		);

		return frag;
	}

	function focus() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
		const text = [];
		const links = [];
		App.UI.DOM.appendNewElement("h2", div, `Focus`);

		if (!onBedRest(V.PC, true)) {
			text.push(`This week you are`);
		} else {
			text.push(`After you finish your mandatory bed rest, you are`);
		}

		if (V.personalAttention.task === PersonalAttention.TRAINING) {
			const r = [];
			for (const slave of V.personalAttention.slaves) {
				slave.objective = slave.objective || getRegimen(getSlave(slave.ID));
				r.push(`<span class="slave-name">${SlaveFullName(getSlave(slave.ID))}</span> to <span class="bold">${App.PersonalAttention.getText(slave.objective, getSlave(slave.ID))}</span>`);
			}
			text.push(`training ${toSentence(r)}.`);
		} else {
			switch (V.personalAttention.task) {
				case PersonalAttention.WHORING:
					if (isPCCareerInCategory("escort")) {
						text.push(`using your body to make some side cash.`);
					} else {
						text.push(`selling your body for much-needed cash.`);
					}
					break;
				case PersonalAttention.MAID:
					text.push(`using your housekeeping skills to help reduce upkeep costs on your home.`);
					break;
				case PersonalAttention.BUSINESS:
					text.push(`using your business acumen to earn some extra money.`);
					break;
				case PersonalAttention.IMAGE:
					text.push(`going to improve your public image.`);
					break;
				case PersonalAttention.SMUGGLING:
					text.push(`going to try to make some easy (but dirty) money.`);
					break;
				case PersonalAttention.SURVEY:
					text.push(`surveying ${V.arcologies[0].name}'s defenses in person.`);
					break;
				case PersonalAttention.DEVELOPMENT:
					text.push(`going to try to help raise ${V.arcologies[0].name}'s prosperity by contributing your talents to a local development project.`);
					break;
				case PersonalAttention.TECH:
					text.push(`contracting out your hacking skills to earn some extra cash.`);
					break;
				case PersonalAttention.FIGHT:
					text.push(`fighting for money.`);
					break;
				case PersonalAttention.SUPPORT_HG:
					text.push(`going to support ${S.HeadGirl.slaveName} in ${getPronouns(S.HeadGirl).his} day-to-day routine.`);
					break;
				case PersonalAttention.SEX:
					text.push(`going to have as much sex as you possibly can.`);
					break;
				case PersonalAttention.RELAX:
					text.push(`doing nothing and enjoying your time off.`);
					break;
				case PersonalAttention.STUDY:
					text.push(`working on your general education.`);
					break;
				case PersonalAttention.GED:
					text.push(`striving to complete your general education.`);
					break;
				case PersonalAttention.EDUCATION:
					text.push(`working on furthering your education.`);
					break;
				case PersonalAttention.TEST:
					text.push(`proving yourself in order to earn an accredited diploma.`);
					break;
				case PersonalAttention.TRADE:
					text.push(`training in trade.`);
					break;
				case PersonalAttention.WAR:
					text.push(`training in warfare.`);
					break;
				case PersonalAttention.SLAVING:
					text.push(`training in slaving.`);
					break;
				case PersonalAttention.ENGINEERING:
					text.push(`training in engineering.`);
					break;
				case PersonalAttention.MEDICINE:
					text.push(`training in medicine.`);
					break;
				case PersonalAttention.HACKING:
					text.push(`training in hacking.`);
					break;
				case PersonalAttention.PROCLAMATION:
					if (V.SecExp.proclamation.type === "security") {
						text.push(`issuing a new proclamation about the security of ${V.arcologies[0].name}.`);
					} else {
						text.push(`issuing a new proclamation about crime in ${V.arcologies[0].name}.`);
					}
					break;
				default:
					throw new Error(`Unknown V.personalAttention.task value of '${V.personalAttention.task}'. Please report this.`);
			}
		}

		App.Events.addNode(div, text);

		addFocusLinks(links,
			{
				link: `Focus on "connecting"`,
				value: PersonalAttention.WHORING,
				prereqs: [
					() => isPCCareerInCategory("escort"),
				],
			},
			{
				link: `Sell your body for some quick ¤`,
				value: PersonalAttention.WHORING,
				prereqs: [
					() => !isPCCareerInCategory("escort"),
					() => V.cash < -5000
				],
			},
			{
				link: `Maintain your home`,
				value: PersonalAttention.MAID,
				prereqs: [
					() => isPCCareerInCategory("servant"),
				],
			},
			/*
			{
				link: `Get an education`,
				value: PersonalAttention.STUDY,
				prereqs: [
					() => V.PC.intelligenceImplant < 10,
				],
			},
			{
				link: `Take a GED exam`,
				value: PersonalAttention.GED,
				prereqs: [
					() => (V.PC.intelligenceImplant === 10 || V.PC.intelligence >= 50),
					() => V.cash >= 5000,
				],
			},
			{
				link: `Further your education`,
				value: PersonalAttention.EDUCATION,
				prereqs: [
					() => V.PC.intelligenceImplant < 20,
					() => V.cash >= 10000,
				],
			},
			{
				link: `Finish your education`,
				value: PersonalAttention.TEST,
				prereqs: [
					() => V.PC.intelligenceImplant === 20,
					() => V.cash >= 50000,
				],
			},
			*/
			{
				link: `Focus on business`,
				value: PersonalAttention.BUSINESS,
				prereqs: [
					() => ((!isPCCareerInCategory("escort") && !isPCCareerInCategory("servant")) || V.PC.skill.trading > 50),
				],
			},
			{
				link: `Help people "pass" things around`,
				value: PersonalAttention.SMUGGLING,
				prereqs: [
					() => isPCCareerInCategory("gang"),
				],
			},
			/*
			{
				link: `Improve your public image`,
				value: PersonalAttention.IMAGE,
				prereqs: [
					() => isMovable(V.PC),
					() => !isTrapped(V.PC),
				],
			},
			*/
			{
				link: `Survey your arcology's defenses in person`,
				value: PersonalAttention.SURVEY,
				prereqs: [
					() => V.PC.skill.warfare > 25,
				],
			},
			{
				link: `Contribute to a local development project`,
				value: PersonalAttention.DEVELOPMENT,
				prereqs: [
					() => V.PC.skill.engineering > 25,
					() => V.arcologies[0].prosperity + 1 * (1 + Math.ceil(V.PC.skill.engineering / 100)) < V.AProsperityCap,
				],
			},
			{
				link: `Sell your intrusion services`,
				value: PersonalAttention.TECH,
				prereqs: [
					() => V.PC.skill.hacking > 25,
				],
			},
			/*
			{
				link: `Bet on your fists`,
				value: PersonalAttention.FIGHT,
				prereqs: [
					() => V.PC.skill.combat > 20,
					() => canWalk(V.PC),
					() => hasAnyArms(V.PC),
				],
			},
			*/
			{
				link: `Support your Head Girl`,
				value: PersonalAttention.SUPPORT_HG,
				prereqs: [
					() => !!S.HeadGirl,
				],
			},
			{
				link: `Focus on sex`,
				value: PersonalAttention.SEX,
			},
			{
				link: `Take a break`,
				value: PersonalAttention.RELAX,
			},
		);

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['margin-left']);

		return div;

		/**
		 * @param {Array<HTMLSpanElement|HTMLAnchorElement>} links
		 * @param {{link: string, value: PersonalAttention, prereqs?: Array<function():boolean>}[]} args
		 */
		function addFocusLinks(links, ...args) {
			args.forEach(link => {
				if (!link.prereqs || link.prereqs.every(prereq => prereq())) {
					if (V.personalAttention.task === link.value) {
						links.push(App.UI.DOM.disabledLink(link.link, [
							`Currently selected.`,
						]));
					} else {
						links.push(App.UI.DOM.link(link.link, () => {
							V.personalAttention = {task: link.value};

							refresh();
						}));
					}
				}
			});
		}
	}

	function proclamations() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		const links = [];

		if (V.secExpEnabled) {
			App.UI.DOM.appendNewElement("h2", div, `Proclamations`);

			if (V.SecExp.proclamation.cooldown === 0) {
				const options = new App.UI.OptionsGroup();
				const option = options.addOption(null, "currency", V.SecExp.proclamation);

				App.UI.DOM.appendNewElement("div", div, `You can dedicate the week to issuing a proclamation, a powerful tool that will have an immediate noticeable effect on the arcology.`, ['note']);

				App.Events.addNode(div, [
					`You are using <span class="bold">${V.SecExp.proclamation.currency || 'cash'}.</span>`,
				]);

				if (V.SecExp.core.authority >= 2000) {
					option.addValue(`Authority`, 'authority');
				}

				if (V.rep >= 4000) {
					option.addValue(`Reputation`, 'reputation');
				}

				option.addValue(`Cash`, 'cash');

				App.UI.DOM.appendNewElement("div", div, options.render(), ['margin-left']);

				if (V.SecExp.core.authority >= 2000 ||
					V.rep >= 4000 ||
					V.cash >= 8000) {
					if (V.personalAttention.task === PersonalAttention.PROCLAMATION) {
						if (V.SecExp.proclamation.type === "security") {
							links.push(
								App.UI.DOM.disabledLink(`Issue a proclamation about security`, [
									`Currently selected.`
								]),

								App.UI.DOM.link(`Issue a proclamation about crime`, () => {
									V.personalAttention.task = PersonalAttention.PROCLAMATION;
									V.SecExp.proclamation.type = "crime";

									refresh();
								},
								null, ``, `You will use your ${V.SecExp.proclamation.currency === "authority"
									? `control over the arcology`
									: V.SecExp.proclamation.currency === "reputation"
										? `great influence`
										: `vast financial means`
								} to force the arrest of suspected citizens without passing through the normal legal procedures.`),
							);
						} else {
							links.push(
								App.UI.DOM.link(`Issue a proclamation about security`, () => {
									V.personalAttention.task = PersonalAttention.PROCLAMATION;
									V.SecExp.proclamation.type = "security";

									refresh();
								},
								null, ``, `You will use your ${V.SecExp.proclamation.currency === "authority"
									? `control over the arcology`
									: V.SecExp.proclamation.currency === "reputation"
										? `great influence`
										: `vast financial means`
								} to force citizens to give up on sensitive information for the good of the arcology.`),

								App.UI.DOM.disabledLink(`Issue a proclamation about crime`, [
									`Currently selected.`
								]),
							);
						}
					} else {
						links.push(
							App.UI.DOM.link(`Issue a proclamation about security`, () => {
								V.personalAttention.task = PersonalAttention.PROCLAMATION;
								V.SecExp.proclamation.type = "security";

								refresh();
							},
							null, ``, `You will use your ${V.SecExp.proclamation.currency === "authority"
								? `control over the arcology`
								: V.SecExp.proclamation.currency === "reputation"
									? `great influence`
									: `vast financial means`
							} to force citizens to give up on sensitive information for the good of the arcology.`),

							App.UI.DOM.link(`Issue a proclamation about crime`, () => {
								V.personalAttention.task = PersonalAttention.PROCLAMATION;
								V.SecExp.proclamation.type = "crime";

								refresh();
							},
							null, ``, `You will use your ${V.SecExp.proclamation.currency === "authority"
								? `control over the arcology`
								: V.SecExp.proclamation.currency === "reputation"
									? `great influence`
									: `vast financial means`
							} to force the arrest of suspected citizens without passing through the normal legal procedures.`),
						);
					}

					App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['margin-left']);
				}
			} else {
				App.UI.DOM.appendNewElement("div", div, `It's too early to issue another proclamation. Another will be available in ${numberWithPluralOne(V.SecExp.proclamation.cooldown, "week")}.`, ['note']);
			}
		}

		return div;
	}

	function skills() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
		const cost = 10000 * V.AgeEffectOnTrainerPricingPC;

		App.UI.DOM.appendNewElement("h2", div, `Skills`);

		div.append(addSkills(
			{
				skill: "trading",
				text: `trader`,
				link: {
					value: PersonalAttention.TRADE,
					text: `Hire a merchant to train you in commerce`,
				},
			},
			{
				skill: "warfare",
				text: `tactician`,
				link: {
					value: PersonalAttention.WAR,
					text: `Hire a mercenary to train you in warfare`,
				},
			},
			{
				skill: "slaving",
				text: `slaver`,
				link: {
					value: PersonalAttention.SLAVING,
					text: `Hire a slaver to train you in slaving`,
				},
			},
			{
				skill: "engineering",
				text: `arcology engineer`,
				link: {
					value: PersonalAttention.ENGINEERING,
					text: `Hire an engineer to train you in arcology engineering`,
				},
			},
			{
				skill: "medicine",
				text: `surgeon`,
				link: {
					value: PersonalAttention.MEDICINE,
					text: `Hire a doctor to train you in medicine`,
				},
			},
			{
				skill: "hacking",
				text: `hacker`,
				link: {
					value: PersonalAttention.HACKING,
					text: `Hire a specialist to train you in hacking`,
				},
			},
		));

		return div;

		/**
		 * @param {Array<{skill: string, text: string, link: {value: PersonalAttention, text: string}}>} args
		 * @returns {HTMLDivElement}
		 */
		function addSkills(...args) {
			const div = document.createElement("div");
			const skillMaster = [];

			args.forEach(skill => {
				div.append(
					addSkill(skill.skill, skill.text, {
						value: skill.link.value,
						text: skill.link.text,
					}),
				);
			});

			if (skillMaster.length > 0) {
				div.append(`You are a master ${toSentence(skillMaster)}.`);
			}
			return div;

			/**
			 * @param {string} skill
			 * @param {string} text
			 * @param {{value: PersonalAttention, text: string}} link
			 */
			function addSkill(skill, text, link) {
				const div = document.createElement("div");

				if (V.PC.skill[skill] >= 100) {
					skillMaster.push(`${text}`);
				} else {
					if (V.PC.skill[skill] > 60) {
						div.append(`You are an expert ${text}.`);
					} else if (V.PC.skill.hacking > 30) {
						div.append(`You have some skill as ${addA(text)}.`);
					} else if (V.PC.skill.hacking > 10) {
						div.append(`You have basic knowledge as ${addA(text)}.`);
					} else {
						div.append(`You have no knowledge as ${addA(text)}.`);
					}

					addLink(div, {
						value: link.value,
						link: link.text,
					});
				}

				return div;

				/**
				 * @param {HTMLDivElement} div
				 * @param {{value: PersonalAttention, link: string}} skill
				 */
				function addLink(div, skill) {
					if (V.personalAttention.task === skill.value) {
						App.UI.DOM.appendNewElement("div", div, App.UI.DOM.disabledLink(skill.link, [
							`Currently selected.`,
						]), ['margin-left']);
					} else {
						App.UI.DOM.appendNewElement("div", div, App.UI.DOM.link(skill.link, () => {
							V.personalAttention = {task: skill.value};

							refresh();
						}, null, '', `Training will cost ${cashFormat(cost)} per week.`), ['margin-left']);
					}
				}
			}
		}
	}

	function attention() {
		/**
		 * @param {number} index
		 * @param {string} text
		 * @param {string} target
		 * @param {string} [tooltip]
		 * @returns {HTMLSpanElement|HTMLAnchorElement}
		 */
		function attentionLink(index, text, target, tooltip) {
			if (V.personalAttention.slaves[index].objective === target) {
				return App.UI.DOM.disabledLink(text, [
					'Currently selected.'
				]);
			} else {
				return App.UI.DOM.link(text, () => {
					V.personalAttention.slaves[index].objective = target;
					refresh();
				}, null, '', tooltip);
			}
		}

		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", frag, `Slaves`);
		if (!V.personalAttention.slaves || V.personalAttention.slaves.length === 0) {
			frag.append(`You have not selected a slave for your personal attention.`);
		} else {
			for (let i = 0; i < V.personalAttention.slaves.length; i++) {
				const div = App.UI.DOM.appendNewElement("div", frag, null, ['margin-bottom', 'card']);
				const slave = getSlave(V.personalAttention.slaves[i].ID);
				const regimen = V.personalAttention.slaves[i].objective;
				div.id = `attention-${slave.ID}`;	// used for scrolling back up after selecting a slave
				if (V.personalAttention.slaves.filter(s => s.ID === slave.ID).length > 1) {
					V.personalAttention.slaves = [];
				}

				const {He, him, his} = getPronouns(slave);
				let text = [];
				let links = [];
				V.personalAttention.slaves[i].objective = V.personalAttention.slaves[i].objective || getRegimen(slave);
				text.push(
					`You will give`,
					App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave)),
					`your personal attention this week to ${App.PersonalAttention.getText(V.personalAttention.slaves[i].objective, slave)}.`,
					App.UI.DOM.link(`Stop`, () => {
						if (V.personalAttention.slaves.length === 1) {
							V.personalAttention = {task: PersonalAttention.SEX};
						} else {
							V.personalAttention.slaves.deleteAt(i);
						}
						refresh();
					}),
				);
				App.Events.addNode(div, text);
				App.UI.DOM.appendNewElement("h3", div, `Change training objective`);

				// HORNY
				if (isHorny(V.PC) && !isPlayerFrigid()) {
					if (canDoAnal(slave) || canDoVaginal(slave)) {
						if (canAchieveErection(V.PC) || V.PC.clit >= 3) {
							links.push(attentionLink(i, `Sate your lust in ${him}`, "ravish"));
						} else if (V.PC.vagina >= 0) {
							links.push(attentionLink(i, `Sate your lust in ${him} using a double-ended dildo`, "ravish"));
						} else if (V.PC.dick > 0) {
							links.push(App.UI.DOM.disabledLink(`Sate your lust in ${him}`, [
								`You want to ravish ${him}, but you can't get it up. What bullshit!`
							]));
						}
					}
					if (V.PC.vagina >= 0) {
						if (canPenetrate(slave)) {
							links.push(attentionLink(i, `Get fucked until you're satisfied`, "ravished"));
						} else if (!canAchieveErection(slave) && slave.dick > 0) {
							links.push(App.UI.DOM.disabledLink(`Get fucked until you're satisfied`, [
								`You need dick, but ${his} is completely worthless!`
							]));
						}
					}
				}

				// Devotion
				App.Events.addNode(div, [
					`Current devotion: `,
					devotionText(slave),
				]);
				if (slave.devotion <= 20 && slave.trust >= -20) {
					links.push(
						attentionLink(i, `Break ${his} will`, "break will"),
						attentionLink(i, `Use enhanced breaking techniques`, "harshly break will"),
					);
				} else {
					links.push(attentionLink(i, `Build ${his} devotion`, "build devotion"));
				}

				// Sexuality
				if (!slave.fetishKnown || !slave.attrKnown) {
					links.push(attentionLink(i, `Explore ${his} sexuality and fetishes`, "explore sexuality"));
				} else {
					links.push(App.UI.DOM.disabledLink(`Explore ${his} sexuality and fetishes`, [
						`You already understand ${his} sexuality.`
					]));
				}

				// Education
				const whoreSkillCap = isPCCareerInCategory("escort") ? 60 : 30;
				if (slave.devotion <= 20 && slave.trust >= -20) {
					links.push(App.UI.DOM.disabledLink(`Teach ${him}`, [
						`${He}'s too disobedient to learn sex skills`
					]));
				} else if (slave.skill.anal >= 100 &&
					slave.skill.oral >= 100 &&
					slave.skill.penetrative >= 30 &&
					slave.skill.whoring >= whoreSkillCap &&
					slave.skill.entertainment >= whoreSkillCap) {
					if (slave.skill.vaginal >= 100) {
						links.push(App.UI.DOM.disabledLink(`Teach ${him}`, [
							`${He} knows all the skills you can teach`
						]));
					} else if (slave.vagina < 0) {
						links.push(App.UI.DOM.disabledLink(`Teach ${him}`, [
							`${He} knows all the skills you can teach a slave without a vagina`
						]));
					} else {
						links.push(attentionLink(i, `Teach ${him}`, "learn skills"));
					}
				} else {
					links.push(attentionLink(i, `Teach ${him}`, "learn skills"));
				}
				if (canWalk(V.PC) && hasBothArms(V.PC) && V.PC.skill.combat > 30) {
					if (slave.assignment === Job.BODYGUARD || (slave.devotion + slave.trust >= 190 && canWalk(slave) && hasBothArms(slave))) {
						if (slave.skill.combat < V.PC.skill.combat - (130 - (V.PC.intelligence + V.PC.intelligenceImplant))) {
							links.push(attentionLink(i, `Train ${him} to fight`, "combat training"));
						} else if (slave.skill.combat > 30) {
							links.push(attentionLink(i, `Spar with ${him}`, "spar"));
						}
					}
				}

				// Health
				App.Events.addNode(div, [
					`Current health: `,
					healthText(slave),
				]);
				links.push(attentionLink(i, `Care for ${him}`, "health"));
				if (!FutureSocieties.isActive('FSPaternalist')) {
					if (getPersonalAttention(null, "torture")) {
						links.push(App.UI.DOM.disabledLink(`Make ${him} suffer`, [
							`You can only torture one slave at a time`
						]));
					} else {
						links.push(attentionLink(i, `Make ${him} suffer`, "torture"));
					}
				}
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['margin-left']);
				links = [];

				// Behavioral Flaws
				if (slave.behavioralFlaw !== "none") {
					const existingQuirk = slave.behavioralQuirk !== 'none' ? slave.behavioralQuirk : '';
					const r = new SpacedTextAccumulator(div);

					div.append(
						App.UI.DOM.makeElement("h3", `Correct a behavioral flaw`)
					);

					if (existingQuirk) {
						r.push("Current behavioral quirk:", App.UI.DOM.makeElement("span", `${capFirstChar(existingQuirk)}.`, ['green']));
					}
					r.push("Current behavioral flaw:", App.UI.DOM.makeElement("span", `${capFirstChar(slave.behavioralFlaw)}.`, ["red"]));
					r.toNode("div");
					links.push(attentionLink(i, `Remove ${his} behavioral flaw`, "fix behavioral flaw"));

					if (slave.devotion < -20) {
						links.push(App.UI.DOM.disabledLink(`Soften ${his} behavioral flaw`, [
							`${He} must be broken before ${his} flaws can be softened`
						]));
					} else {
						links.push(attentionLink(i, `Soften ${his} behavioral flaw`, "soften behavioral flaw", existingQuirk && `Will replace existing quirk.`));
					}

					App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['margin-left']);
					links = [];
				}

				div.append(
					App.UI.DOM.makeElement("h3", `Induce a behavioral flaw`),
				);
				addLinks(
					slave,
					regimen,
					links,
					i,
					{
						quirk: "confident",
						flaw: "arrogant",
						type: "induce arrogance",
						link: `Arrogance`,
					},
					{
						quirk: "cutting",
						flaw: "bitchy",
						type: "induce bitchiness",
						link: `Bitchiness`,
					},
					{
						quirk: "funny",
						flaw: "odd",
						type: "induce odd behavior",
						link: `Odd behavior`,
					},
					{
						quirk: "adores women",
						flaw: "hates men",
						type: "induce hatred of men",
						link: `Hatred of men`,
					},
					{
						quirk: "adores men",
						flaw: "hates women",
						type: "induce hatred of women",
						link: `Hatred of women`,
					},
					{
						quirk: "fitness",
						flaw: "gluttonous",
						type: "induce gluttony",
						link: `Gluttony`,
					},
					{
						quirk: "insecure",
						flaw: "anorexic",
						type: "induce anorexia",
						link: `Anorexia`,
					},
					{
						quirk: "sinful",
						flaw: "devout",
						type: "induce religious devotion",
						link: `Religious devotion`,
					},
					{
						quirk: "advocate",
						flaw: "liberated",
						type: "induce liberation",
						link: `Liberation`,
					},
				);
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['margin-left']);
				links = [];

				// Sexual Flaws
				if (slave.sexualFlaw !== "none") {
					const isParaphilia = App.Data.misc.paraphiliaList.includes(slave.sexualFlaw);
					const existingQuirk = slave.sexualQuirk !== 'none' ? slave.sexualQuirk : '';
					const r = new SpacedTextAccumulator(div);

					div.append(
						App.UI.DOM.makeElement("h3", `Correct a sexual flaw`)
					);

					if (existingQuirk) {
						r.push("Current sexual quirk:", App.UI.DOM.makeElement("span", `${capFirstChar(existingQuirk)}.`, ['green']));
					}
					r.push("Current sexual flaw:", App.UI.DOM.makeElement("span", `${capFirstChar(slave.sexualFlaw)}.`, isParaphilia ? ["yellow"] : ["red"]));
					r.toNode("div");
					links.push(attentionLink(i, `Remove ${his} ${isParaphilia ? "paraphilia" : "sexual flaw"}`, "fix sexual flaw"));

					if (slave.devotion < -20) {
						links.push(App.UI.DOM.disabledLink(`Soften ${his} sexual flaw`, [
							`${He} must be broken before ${his} flaws can be softened`
						]));
					} else if (isParaphilia) {
						links.push(App.UI.DOM.disabledLink(`Soften ${his} sexual flaw`, [
							`Paraphilias cannot be softened`
						]));
					} else {
						links.push(attentionLink(i, `Soften ${his} sexual flaw`, "soften sexual flaw", existingQuirk && `Will replace existing quirk.`));
					}

					App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['margin-left']);
					links = [];
				}


				div.append(
					App.UI.DOM.makeElement("h3", `Induce a sexual flaw`),
				);
				addLinks(
					slave,
					regimen,
					links,
					i,
					{
						quirk: "gagfuck queen",
						flaw: "hates oral",
						type: "induce hatred of oral",
						link: `Hatred of oral`,
					},
					{
						quirk: "painal queen",
						flaw: "hates anal",
						type: "induce hatred of anal",
						link: `Hatred of anal`,
					},
					{
						quirk: "strugglefuck queen",
						flaw: "hates penetration",
						type: "induce hatred of penetration",
						link: `Hatred of penetration`,
					},
					{
						quirk: "tease",
						flaw: "shamefast",
						type: "induce shame",
						link: `Shame`,
					},
					{
						quirk: "romantic",
						flaw: "idealistic",
						type: "induce sexual idealism",
						link: `Sexual idealism`,
					},
					{
						quirk: "perverted",
						flaw: "repressed",
						type: "induce sexual repression",
						link: `Sexual repression`,
					},
					{
						quirk: "caring",
						flaw: "apathetic",
						type: "induce sexual apathy",
						link: `Sexual apathy`,
					},
					{
						quirk: "unflinching",
						flaw: "crude",
						type: "induce crudity",
						link: `Crudity`,
					},
					{
						quirk: "size queen",
						flaw: "judgemental",
						type: "induce judgement",
						link: `Judgment`,
					},
				);
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['margin-left']);
				links = [];

				// Paraphilias
				App.UI.DOM.appendNewElement("h3", div, `Induce a paraphilia`);
				if (slave.fetishStrength >= 95) {
					addLinks(
						slave,
						regimen,
						links,
						i,
						{
							fetish: "cumslut",
							flaw: "cum addict",
							type: "induce cum addiction",
							link: `Cum addiction`,
						},
						{
							fetish: "buttslut",
							flaw: "anal addict",
							type: "induce anal addiction",
							link: `Anal addiction`,
						},
						{
							fetish: "humiliation",
							flaw: "attention whore",
							type: "induce attention whoring",
							link: `Attention whoring`,
						},
						{
							fetish: "boobs",
							flaw: "breast growth",
							type: "induce breast growth obsession",
							link: `Breast growth obsession`,
						},
						{
							fetish: "dom",
							flaw: "abusive",
							type: "induce abusiveness",
							link: `Abusiveness`,
						},
						{
							fetish: "sadist",
							flaw: "malicious",
							type: "induce maliciousness",
							link: `Maliciousness`,
						},
						{
							fetish: "masochist",
							flaw: "self hating",
							type: "induce self hatred",
							link: `Self hatred`,
						},
						{
							fetish: "submissive",
							flaw: "neglectful",
							type: "induce sexual self neglect",
							link: `Sexual self neglect`,
						},
						{
							fetish: "pregnancy",
							flaw: "breeder",
							type: "induce breeding obsession",
							link: `Breeding obsession`,
						},
					);
					App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['margin-left']);
					links = [];
				} else {
					App.UI.DOM.appendNewElement("div", div, `Paraphilias can be induced from a strong fetish.`, ['note', 'margin-left']);
				}
			}
		}

		return frag;

		/**
		 * @typedef Link
		 *
		 * @property {FC.SexualFlaw|FC.BehavioralFlaw} flaw
		 * @property {FC.SexualQuirk|FC.BehavioralQuirk} [quirk]
		 * @property {FC.Fetish} [fetish]
		 * @property {string} type
		 * @property {string} link
		 */

		/**
		 *
		 * @param {App.Entity.SlaveState} slave
		 * @param {string} regimen
		 * @param {Array<HTMLAnchorElement|HTMLSpanElement>} links
		 * @param {number} index
		 * @param {Link[]} args
		 */
		function addLinks(slave, regimen, links, index, ...args) {
			args.forEach(link => {
				if (slave.sexualFlaw !== link.flaw &&
					slave.behavioralFlaw !== link.flaw &&
					(!link.quirk || slave.sexualQuirk !== link.quirk &&
						slave.behavioralQuirk !== link.quirk) &&
					(!link.fetish || slave.fetish === link.fetish)) {
					if (regimen === link.type) {
						links.push(App.UI.DOM.disabledLink(link.link, [
							`Currently selected.`,
						]));
					} else {
						links.push(App.UI.DOM.link(link.link, () => {
							V.personalAttention.slaves[index].objective = link.type;

							refresh();
						}, null, '', `Inducing flaws is difficult and bad for slaves' obedience.`));
					}
				}
			});
		}
	}

	function slaves() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
		App.UI.DOM.appendNewElement("h3", div, `Select a slave to train`);
		if (V.PC.skill.slaving >= 100) {
			App.Events.addNode(div, [
				`Your <span class="skill player">slaving experience</span> allows you to divide your attention between more than one slave each week, with slightly reduced efficiency.`
			], "div", ['note', 'margin-left']);
		}

		div.append(App.UI.SlaveList.slaveSelectionList(
			s => (assignmentVisible(s) || App.Entity.facilities.masterSuite.isHosted(s)) && s.fuckdoll === 0,
			s => App.UI.DOM.link(SlaveFullName(s),
				(id) => { selectSlave(id); }, [s.ID]
			),
		));

		return div;
	}

	function refresh() {
		App.UI.DOM.replace(refreshDiv, content());
	}

	function selectSlave(id) {
		if (!V.personalAttention.slaves) { // first PA target
			V.personalAttention = {
				task: PersonalAttention.TRAINING,
				slaves: [{
					ID: id,
					objective: getRegimen(getSlave(id)),
				}]
			};
		} else {
			const paIndex = V.personalAttention.slaves.findIndex(s => s.ID === id);
			if (paIndex === -1) { // not already a PA target; add
				V.personalAttention.task = PersonalAttention.TRAINING; // make sure
				V.personalAttention.slaves.push({
					ID: id,
					objective: getRegimen(getSlave(id)),
				});
			} else { // already a PA target; remove
				V.personalAttention.slaves.deleteAt(paIndex);
				if (V.personalAttention.slaves.length === 0) {
					V.personalAttention = {task: PersonalAttention.SEX};
				}
			}
		}

		refresh();

		if (V.personalAttention.task === PersonalAttention.TRAINING && V.personalAttention.slaves.includes(id)) {
			document.getElementById(`attention-${id}`).scrollIntoView();
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {DocumentFragment}
	 */
	function devotionText(slave) {
		const frag = new DocumentFragment();

		App.UI.SlaveSummaryImpl.helpers.makeRatedStyledSpan(frag, App.Data.SlaveSummary.long.mental.devotion, slave.devotion, 100, true);

		return frag;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {DocumentFragment}
	 */
	function healthText(slave) {
		const frag = new DocumentFragment();

		App.UI.SlaveSummaryImpl.helpers.makeRatedStyledSpan(frag, App.Data.SlaveSummary.long.health.health, slave.health.condition, 100, true);

		return frag;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function getRegimen(slave) {
		if (slave.health.condition < -20) {
			return `health`;
		} else if (slave.behavioralFlaw !== "none") {
			if (slave.devotion < -20) {
				return `fix behavioral flaw`;
			} else {
				return `soften behavioral flaw`;
			}
		} else if (slave.sexualFlaw !== "none") {
			if (slave.devotion < -20 || App.Data.misc.paraphiliaList.includes(slave.sexualFlaw)) {
				return `fix sexual flaw`;
			} else {
				return `soften sexual flaw`;
			}
		} else if (!slave.fetishKnown) {
			return `explore sexuality`;
		} else if (slave.devotion <= 20 && slave.trust >= -20) {
			return `break will`;
		}
		return `build devotion`;
	}
};
