/**
 * @param {App.Entity.SlaveState} slave
 * @param {function():void} refresh
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.records = function(slave, refresh) {
	const el = new DocumentFragment();
	let r;
	let linkArray;
	const {
		He, His,
		his, him
	} = getPronouns(slave);

	if (V.studio === 1) {
		App.UI.DOM.appendNewElement("h3", el, "Media");
		slave.porn.spending = Math.clamp(Math.ceil(slave.porn.spending / 1000) * 1000, 0, 5000);

		if (slave.porn.prestige === 3) {
			App.UI.DOM.appendNewElement("div", el, `${He} is so prestigious in the realm of ${slave.porn.fameType} porn that ${his} fame is self-sustaining.`, ["note"]);
		} else {
			if (slave.porn.feed === 0) {
				r = [];
				r.push(`The media hub is not releasing highlights of ${his} sex life.`);
				r.push(
					App.UI.DOM.link(
						"Release",
						() => {
							slave.porn.feed = 1;
							refresh();
						}
					)
				);
				App.Events.addNode(el, r, "div");
			} else {
				r = [];
				r.push(`The media hub is releasing highlights of ${his} sex life`);
				if (slave.porn.spending < 500) {
					r.push(`to those who can find it.`);
				} else if (slave.porn.spending < 2500) {
					r.push(`on several websites.`);
				} else if (slave.porn.spending > 5000) {
					r.push(`through your old distributor.`);
				} else {
					r.push(`on many websites.`);
				}
				if (slave.porn.spending === 0) {
					linkArray = [];
					linkArray.push(
						App.UI.DOM.link(
							"Halt",
							() => {
								slave.porn.feed = 0;
								slave.porn.focus = "none";
								refresh();
							}
						)
					);
					linkArray.push(
						App.UI.DOM.link(
							"Publicize",
							() => {
								slave.porn.spending += 1000;
								refresh();
							},
							[],
							"",
							`Will cost ${cashFormat(1000)} weekly.`
						)
					);
					r.push(App.UI.DOM.generateLinksStrip(linkArray));
					App.Events.addNode(el, r, "div");
				} else {
					r.push(
						App.UI.DOM.makeTextBox(
							slave.porn.spending,
							v => {
								slave.porn.spending = v;
							},
							true
						)
					);
					r.push(`weekly is spent to publicize them.`);

					linkArray = [];
					linkArray.push(
						App.UI.DOM.link(
							"Halt",
							() => {
								slave.porn.spending = 0;
								slave.porn.feed = 0;
								slave.porn.focus = "none";
								refresh();
							}
						)
					);
					if (slave.porn.spending <= 4000) {
						linkArray.push(
							App.UI.DOM.link(
								"Increase",
								() => {
									slave.porn.spending += 1000;
									refresh();
								},
								[],
								"",
								`Spending more than ${cashFormat(5000)} weekly will have no effect.`
							)
						);
					}
					linkArray.push(
						App.UI.DOM.link(
							"Decrease",
							() => {
								slave.porn.spending -= 1000;
								refresh();
							}
						)
					);
					r.push(App.UI.DOM.generateLinksStrip(linkArray));
					App.Events.addNode(el, r, "div");
				}
				if (V.studioFeed === 1) {
					r = [];
					if (slave.porn.viewerCount < 100) {
						r.push(`${He} lacks the fame in porn needed to discern what ${his} feed is getting tagged as.`);
					} else {
						if (slave.porn.prestige > 0) {
							r.push(`${He} is known for ${slave.porn.fameType === "generic" ? `standard, vanilla` : slave.porn.fameType} porn${(slave.porn.prestige > 1) ? ` and viewers have grown to expect it from ${him}` : ``}.`);
						}
						if (slave.porn.focus === "none") {
							r.push(`You are allowing ${his} viewers to guide the direction of ${his} content.`);
						} else {
							r.push(`You are focusing attention on the ${slave.porn.focus} aspect of ${his} content.`);
						}
						r.push(App.Porn.genreChoiceLinks(slave, () => refresh()));
					}
					App.Events.addNode(el, r, "div");
				}
			}
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.combineNodes(App.Porn.makeFameProgressChart(slave)));
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.combineNodes("Current viewership breakdown:", App.Porn.makeViewershipChart(slave)));
		}
	}
	App.UI.DOM.appendNewElement("h3", el, "Financial");
	App.UI.DOM.appendNewElement("p", el, slaveExpenses(slave));

	App.UI.DOM.appendNewElement("h3", el, `Statistics`);
	App.UI.DOM.appendNewElement("p", el, statistics());

	function statistics() {
		const div = document.createElement("div");
		const text = [];

		const slaves = [...slave.partners].filter(i => i > 0);
		const ownedSlaves = slaves.filter(s => getSlave(s));
		const unownedSlaves = slaves.length - ownedSlaves.length;
		const other = [];

		const ownedSlavesSpan = document.createElement("span");

		for (let i = 0; i < ownedSlaves.length; i++) {
			const innerSpan = document.createElement("span");
			const target = getSlave(ownedSlaves[i]);

			innerSpan.style.display = 'inline-block';	// hack to prevent span breaking line and giving unusable tooltip
			innerSpan.style.marginRight = '4px';

			if (ownedSlaves.length > 1) {
				if (i === ownedSlaves.length - 1) {
					innerSpan.append(
						` and `,
						contextualIntro(slave, target, true),
					);

					if (unownedSlaves > 0) {
						innerSpan.append(`, as well as ${numberWithPlural(unownedSlaves, 'slave')} you don't currently own`);
					}

					innerSpan.append(`.`);
				} else {
					innerSpan.append(contextualIntro(slave, target, true));

					if (ownedSlaves.length > 2) {
						innerSpan.append(`, `);
					}
				}
			} else {
				innerSpan.append(
					contextualIntro(slave, target, true, true),
					`.`,
				);
			}

			ownedSlavesSpan.append(innerSpan);
		}

		const partners = new Map([
			[-1, "you"],
			[-2, `citizens of ${V.arcologies[0].name}`],
			[-3, `your former master`],
			[-4, `another arcology owner`],
			[-6, `members of the Societal Elite`],
			[-8, `your animals`],
			[-9, `members of the Futanari Sisters`],
		]);

		for (const [ID, name] of partners) {
			if (slave.partners.has(ID)) {
				other.push(name);
			}
		}

		const link = App.UI.DOM.link(`${numberWithPluralOne(slaves.length, 'other slave')}`, () => {
			const innerDiv = document.createElement("div");

			innerDiv.append(
				`${slave.slaveName} has ${other.length > 0 ? `been fucked by ${toSentence(other)}, as well as `: `slept with `}`,
				ownedSlavesSpan
			);

			App.UI.DOM.replace(div, innerDiv);
		});

		if (slaves.length > 0) {
			text.push(
				`${He}'s had sex with`,
				link,
				`so far.`,
			);
		}

		if (other.length > 0) {
			text.push(`${He} has ${slaves.length > 0 ? `also` : `only`} had sex with ${toSentence(other)}.`);
		}

		if (V.showSexualHistory === 1 && V.ui !== "start") {
			text.push(App.Desc.sexualHistory(slave));
		}

		App.Events.addNode(div, text);

		return div;
	}

	r = [];
	linkArray = [];
	if (V.slaveCostFactor > 1) {
		r.push(App.UI.DOM.makeElement("span", `The slave market is bullish; the price of slaves is high.`, ["yellow"]));
	} else if (V.slaveCostFactor < 1) {
		r.push(App.UI.DOM.makeElement("span", `The slave market is bearish; the price of slaves is low.`, ["yellow"]));
	}

	if (V.slaves.length < 2) {
		r.push("You cannot sell your last slave");
	} else if (slave.origin === "You bought $him from a body dump, completely broken." && (V.week - slave.weekAcquired <= 8)) {
		r.push(`A discarded slave must be kept for at least two months to ensure health before being sold.`);
	} else {
		if (slave.accent < 4) {
			linkArray.push(
				App.UI.DOM.link(
					`Sell ${him}`,
					() => {
						cashX(-500, "personalBusiness", slave);
					},
					[],
					"Sell Slave",
					`Listing ${him} for sale will cost ${cashFormat(500)}`
				)
			);
		} else {
			r.push(`${His} lack of language and basic life skills is a red sign to most slave appraisers. ${He} must not act like a child to be sold without raising suspicion.`);
		}
		if ((V.seeAge !== 0) && (slave.indenture < 1)) {
			linkArray.push(
				App.UI.DOM.passageLink(
					`Retire ${him}`,
					"retire",
				)
			);
		}
		linkArray.push(
			App.UI.DOM.passageLink(
				`Discard ${him}`,
				"Discard Confirm",
			)
		);
		if (V.seeExtreme) {
			if (V.threatened[0].includes(slave.ID)) {
				linkArray.push(
					App.UI.DOM.disabledLink(
						`Threaten ${his} life`,
						[
							`You've already threatened ${him} this week.`,
						]
					)
				);
			} else {
				linkArray.push(
					App.UI.DOM.passageLink(
						`Threaten ${his} life`,
						"KillSlave",
						() => {
							V.threatened[0].push(slave.ID);
						}
					)
				);
			}
		}
	}
	linkArray.push(
		App.UI.DOM.passageLink(
			`Export this slave`,
			"Export Slave",
		)
	);
	if (V.slaveBotGeneration) {
		linkArray.push(
			App.UI.DOM.passageLink(
				`Create slave bot`,
				"Create Slave Bot",
			)
		);
	}
	if (V.cheatMode) {
		linkArray.push(
			App.UI.DOM.passageLink(
				`Import a slave`,
				"Import Slave",
			)
		);
	}
	r.push(App.UI.DOM.generateLinksStrip(linkArray));
	App.Events.addNode(el, r, "p");
	return el;
};
