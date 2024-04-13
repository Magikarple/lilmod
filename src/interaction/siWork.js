/**
 * @param {App.Entity.SlaveState} slave
 * @param {function():void} refresh
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.work = function(slave, refresh) {
	let el = new DocumentFragment();
	let p;
	const miniSceneId = "mini-scene";
	const fucktoyDiv = document.createElement('div');
	let span;
	const {
		He,
		his, him
	} = getPronouns(slave);

	p = document.createElement('p');
	if (slave.assignment === Job.AGENT) {
		const arc = V.arcologies.find((a) => a.leaderID === slave.ID);
		p.className = "scene-intro";
		p.textContent = `${He} is serving as your Agent${arc ? ` leading ${arc.name}` : ` but is not currently assigned to an arcology`}. `;
		p.appendChild(App.UI.DOM.link(`Recall and reenslave ${him}`, () => {
			removeJob(slave, slave.assignment, false);
			refresh();
		}));
	} else if (slave.assignment === Job.AGENTPARTNER) {
		const agent = getSlave(slave.relationshipTarget);
		const arc = agent ? V.arcologies.find((a) => a.leaderID === agent.ID) : null;
		p.className = "scene-intro";
		p.textContent = `${He} is living with your Agent ${SlaveFullName(agent)}${arc ? ` in ${arc.name}` : ``}. `;
		p.appendChild(App.UI.DOM.link(`Recall ${him}`, () => {
			removeJob(slave, slave.assignment, false);
			refresh();
		}));
	} else {
		const miniSceneDiv = document.createElement('div');
		miniSceneDiv.id = miniSceneId;
		p.appendChild(miniSceneDiv);
		p.appendChild(useSlaveDisplay());
	}
	el.append(p);

	span = document.createElement('span');
	span.className = "note";
	switch (slave.assignment) {
		case Job.BODYGUARD:
			span.textContent = `${He} is your Bodyguard and is not available for other work`;
			break;
		case Job.MADAM:
			span.textContent = `${He} is the Madam and is not available for other work`;
			break;
		case Job.DJ:
			span.textContent = `${He} is the DJ and is not available for other work`;
			break;
		case Job.MILKMAID:
			span.textContent = `${He} is the Milkmaid and is not available for other work`;
			break;
		case Job.FARMER:
			span.textContent = `${He} is the Farmer and is not available for other work`;
			break;
		case Job.STEWARD:
			span.textContent = `${He} is the Stewardess and is not available for other work`;
			break;
		case Job.HEADGIRL:
			span.textContent = `${He} is your Head Girl and is not available for other work`;
			break;
		case Job.RECRUITER:
			span.textContent = `${He} is recruiting slaves and is not available for other work`;
			break;
		case Job.NURSE:
			span.textContent = `${He} is the Nurse and is not available for other work`;
			break;
		case Job.ATTENDANT:
			span.textContent = `${He} is the Attendant of the spa and is not available for other work`;
			break;
		case Job.MATRON:
			span.textContent = `${He} is the Matron of the nursery and is not available for other work`;
			break;
		case Job.TEACHER:
			span.textContent = `${He} is the Schoolteacher and is not available for other work`;
			break;
		case Job.CONCUBINE:
			span.textContent = `${He} is your Concubine and is not available for other work`;
			break;
		case Job.WARDEN:
			span.textContent = `${He} is the Wardeness and is not available for other work`;
			break;
		default:
			// CAN BE REASSIGNED
			span.classList.remove("note");
			// span.id = "assignmentLinks";
			span.appendChild(assignmentBlock());

			if ((V.brothel + V.club + V.dairy + V.farmyard + V.servantsQuarters + V.masterSuite + V.spa + V.nursery + V.clinic + V.schoolroom + V.cellblock + V.arcade + V.HGSuite) > 0) {
				span.append(`Transfer to: `);
				span.appendChild(App.UI.jobLinks.transfersFragment(slave.ID));
			}
	}
	el.append(span);

	if (slave.assignment === Job.FUCKTOY || slave.assignment === Job.MASTERSUITE || slave.assignment === Job.CONCUBINE) {
		fucktoyDiv.append(fucktoyPref());
		el.append(fucktoyDiv);
	}

	if (slave.assignment === Job.WHORE || slave.assignment === Job.BROTHEL) {
		const div = document.createElement('div');
		div.textContent = `Whoring Target: `;
		span = document.createElement('span');
		span.style.fontWeight = "bold";

		span.id = "whoreClass";
		if (!slave.whoreClass) {
			span.textContent = `auto`;
		} else if (slave.whoreClass === 1) {
			span.textContent = `the lower class`;
		} else if (slave.whoreClass === 2) {
			span.textContent = `the middle class`;
		} else if (slave.whoreClass === 3) {
			span.textContent = `the upper class`;
		} else if (slave.whoreClass === 4) {
			span.textContent = `millionaires`;
		} else {
			span.textContent = `THERE HAS BEEN AN ERROR`;
		}
		div.append(span);
		div.append(`. `);

		div.append(App.UI.DOM.makeElement('span', `This is the highest class they are allowed to service, when eligible `, ['note']));

		el.append(div);

		const links = [];
		links.push({text: "Auto", whoreClass: 0});
		links.push({text: "Lower Class", whoreClass: 1});
		links.push({text: "Middle Class", whoreClass: 2});
		links.push({text: "Upper Class", whoreClass: 3});
		links.push({text: "Millionaires Class", whoreClass: 4});
		App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(links.map(generateLink)), ["choices"]);
	}

	el.append(tutorBlock());
	return el;

	/**
	 * @param {object} linkDesc
	 * @param {string} linkDesc.text
	 * @param {number} linkDesc.whoreClass
	 * @returns {Node}
	 */
	function generateLink(linkDesc) {
		// Are they already on this whoreClass?
		if (linkDesc.whoreClass === slave.whoreClass) {
			return App.UI.DOM.disabledLink(linkDesc.text, [`${slave.slaveName} is already targeting this class.`]);
		}
		// Set up the link
		return App.UI.DOM.link(
			linkDesc.text,
			() => {
				slave.whoreClass = linkDesc.whoreClass;
				refresh();
			},
		);
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function assignmentBlock() {
		let el = document.createElement('div');
		let title = document.createElement('div');
		const linkArray = [];
		title.append(`Assignment: `);

		let assign = document.createElement('span');
		assign.style.fontWeight = "bold";
		if (slave.sentence) {
			assign.textContent = `${slave.assignment} for ${years(slave.sentence)}. `;
		} else {
			assign.textContent = `${slave.assignment}. `;
		}
		title.appendChild(assign);
		if (V.assignmentRecords[slave.ID] && V.assignmentRecords[slave.ID] !== slave.assignment) {
			title.append(`Previously: `);
			assign = document.createElement('span');
			assign.style.fontWeight = "bold";
			assign.textContent = `${V.assignmentRecords[slave.ID]}. `;
			title.appendChild(assign);
		}
		if (slave.assignment === Job.SUBORDINATE) {
			const target = getSlave(slave.subTarget);
			let linkText;
			if (target) {
				title.appendChild(document.createTextNode(`Serving ${target.slaveName} exclusively. `));
				linkText = `Change`;
			} else if (slave.subTarget === -1) {
				title.appendChild(document.createTextNode(`Serving as a Stud. `));
				linkText = `Change role`;
			} else {
				title.appendChild(document.createTextNode(`Serving all your other slaves. `));
				linkText = `Choose a specific slave to submit to`;
			}
			linkArray.push(App.UI.DOM.passageLink(linkText, "Subordinate Targeting", () => { V.returnTo = "Slave Interact"; }));
		}
		if (slave.assignment !== Job.CHOICE) {
			linkArray.push(
				App.UI.DOM.link(
					`Stay on this assignment for another month`,
					() => {
						slave.sentence += 4;
						refresh();
					},
				)
			);
		}
		title.append(App.UI.DOM.generateLinksStrip(linkArray));
		el.appendChild(title);

		let links = document.createElement('div');
		links.className = "choices";
		links.appendChild(
			App.UI.jobLinks.assignmentsFragment(
				slave.ID, passage(),
				(slave, assignment) => {
					assignJob(slave, assignment);
				}
			)
		);
		el.appendChild(links);
		return el;
	}

	/**
	 * @returns {Node}
	 */
	function tutorBlock() {
		let el = App.UI.DOM.makeElement("div");
		let title = App.UI.DOM.appendNewElement("div", el, `Private tutoring: `);
		let tutor = tutorForSlave(slave);

		if (tutor === null) {
			App.UI.DOM.appendNewElement("span", title, `none.`, ["bold"]);
		} else {
			App.UI.DOM.appendNewElement("span", title, tutor + `.`, ["bold"]);
		}

		if (tutor != null) {
			App.UI.DOM.appendNewElement("span", title, ` To progress slave needs to be assigned to: "` + Job.CLASSES + `" or "` + Job.SCHOOL + `".`, ["note"]);
		}

		let list = ["None"];
		for (const keys of Object.keys(V.slaveTutor)) {
			list.push(keys);
		}
		const array = list.map((s) => {
			const reason = disableReasons(s);
			if (reason?.length > 0) {
				return App.UI.DOM.disabledLink(s, reason);
			} else {
				return App.UI.DOM.link(s, () => setTutor(s));
			}
		});
		App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(array), ["choices"]);

		/**
		 * @param {string} key
		 * @returns {string[]}
		 */
		function disableReasons(key) {
			if (slave.skill[tutorKeyToSkillKey(key)] >= 200) {
				return [`Already fully trainied in this skill.`];
			}
			let tutor = tutorForSlave(slave);
			if (tutor === key) {
				return [`Already being taught this skill.`];
			}
			return null;
		}

		/**
		 * @param {string} tutor
		 */
		function setTutor(tutor) {
			const cur = tutorForSlave(slave);

			if (tutor !== cur && cur != null) {
				V.slaveTutor[cur].delete(slave.ID);
			}

			if (cur !== tutor && tutor !== "None") {
				V.slaveTutor[tutor].push(slave.ID);
			}
			refresh();
		}

		return el;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function useSlaveDisplay() {
		let el = document.createElement('div');

		/**
		 * @typedef {object} SexOption
		 * @property {string} text "Link text"
		 * @property {App.Interact.BaseChoosePartnerRenderer|function():Node} [scene]
		 * @property {string} [goto] if another passage is needed
		 * @property {object} [updateSlave] update slave itself if needed, like {trust: 2}
		 * @property {object} [update] updates V
		 * @property {string} [note] if a note must appear after the link
		 * @property {string} [disabled]
		 */
		/** @type {Array<SexOption>} */
		const sexOptions = [];
		/** @type {Array<SexOption>} */
		const fillFaceOptions = [];
		/** @type {Array<SexOption>} */
		const fillAssOptions = [];
		const dairyNameCaps = capFirstChar(V.dairyName);

		if (slave.fuckdoll === 0) {
			if (slave.vagina > -1) {
				if (canDoVaginal(slave)) {
					sexOptions.push({text: `Fuck ${him}`, scene: () => App.Interact.fVagina(slave)});
					if (canDoAnal(slave)) {
						sexOptions.push({text: `Use ${his} holes`, scene: () => App.Interact.fButt(slave)});
					}
				} else {
					sexOptions.push({
						text: `Fuck ${him}`,
						disabled: `Remove ${his} chastity belt if you wish to fuck ${him}`
					});
				}
			}
			if (slave.bellyPreg >= 300000) {
				if (canDoVaginal(slave) || canDoAnal(slave)) {
					sexOptions.push({text: `Fuck ${him} on ${his} belly`, scene: () => App.Interact.fBellyFuck(slave)});
					if (V.pregInventions >= 1) {
						sexOptions.push({text: `Fuck ${him} in ${his} maternity swing`, scene: () => App.Interact.fMaternitySwing(slave)});
						sexOptions.push({
							text: `Fuck ${him} with the help of ${his} assistants`,
							scene: () => App.Interact.fAssistedSex(slave)
						});
						sexOptions.push({text: `Fuck ${him} in your goo pool`, scene: () => App.Interact.fPoolSex(slave)});
					}
				}
			}

			if (canDoAnal(slave)) {
				sexOptions.push({text: `Fuck ${his} ass`, scene: () => App.Interact.fAnus(slave)});
			} else {
				sexOptions.push({
					text: `Fuck ${his} ass`,
					disabled: `Remove ${his} chastity belt if you wish to fuck ${his} ass`
				});
			}
			sexOptions.push({text: `Use ${his} mouth`, scene: () => App.Interact.fLips(slave)});
			sexOptions.push({text: `Kiss ${him}`, scene: () => App.Interact.fKiss(slave)});
			if (hasAnyLegs(slave)) {
				sexOptions.push({text: `Have ${him} dance for you`, scene: () => App.Interact.fDance(slave)});
			}

			sexOptions.push({text: `Play with ${his} tits`, scene: () => App.Interact.fBoobs(slave)});

			sexOptions.push({text: `Caress ${him}`, scene: () => App.Interact.fCaress(slave)});

			sexOptions.push({text: `Give ${him} a hug`, scene: () => App.Interact.fEmbrace(slave)});
			if (V.experimental.interactions) {
				sexOptions.push({text: `Pat ${his} head`, scene: () => App.Interact.fPat(slave)});
			}
			if (slave.race === "catgirl") {
				sexOptions.push({text: `Pet ${him}`, scene: () => App.Interact.fPet(slave)});
			}

			sexOptions.push({text: `Grope ${his} boobs`, scene: () => App.Interact.fondleBoobs(slave)});
			if (slave.nipples === "fuckable" && V.PC.dick > 0) {
				sexOptions.push({text: `Fuck ${his} nipples`, scene: () => App.Interact.fNippleFuck(slave)});
			}
			if (slave.lactation > 0 && slave.boobs >= 2000 && slave.belly < 60000 && hasAnyArms(slave)) {
				sexOptions.push({text: `Drink ${his} milk`, scene: () => App.Interact.fSuckle(slave)});
			}

			if (canDoAnal(slave)) {
				sexOptions.push({text: `Grope ${his} butt`, scene: () => App.Interact.fondleButt(slave)});
			}

			if (slave.vagina > -1) {
				if (canDoVaginal(slave)) {
					sexOptions.push({text: `Grope ${his} pussy`, scene: () => App.Interact.fondleVagina(slave)});
					sexOptions.push({text: `Eat ${him} out`, scene: () => App.Interact.fLickPussy(slave)});
				}
			}

			if (slave.dick > 0) {
				if (!(slave.chastityPenis)) {
					sexOptions.push({text: `Grope ${his} dick`, scene: () => App.Interact.fondleDick(slave)});
					if (isPlayerReceptive(slave) || isLeaderP(slave)) {
						if (V.experimental.interactions) {
							sexOptions.push({text: `Suck ${his} dick`, scene: () => App.Interact.fSuckDick(slave)});
						}
						if (canPenetrate(slave)) {
							sexOptions.push({text: `Ride ${his} dick`, scene: () => App.Interact.fDick(slave)});
						}
					}
				} else {
					sexOptions.push({
						text: `Use ${his} dick`,
						disabled: `Remove ${his} dick chastity belt if you wish to play with ${his} cock`
					});
				}
			}

			if (hasAnyLegs(slave) && V.PC.dick > 0) {
				sexOptions.push({text: `Get a footjob`, scene: () => App.Interact.fFeet(slave)});
			}

			if (canGetPregnant(slave) && (slave.geneticQuirks.superfetation !== 2 || V.geneticMappingUpgrade !== 0) && (slave.fuckdoll === 0) && V.seePreg !== 0) {
				if (canImpreg(slave, V.PC)) {
					sexOptions.push({
						text: `Impregnate ${him} yourself`,
						scene: () => App.Interact.fPCImpreg(slave),
					});
				}
				if (canImpreg(slave, slave)) {
					sexOptions.push({text: `Use ${his} own seed to impregnate ${him}`, scene: () => App.Interact.fSlaveSelfImpreg(slave)});
				}
				sexOptions.push({text: `Use another slave to impregnate ${him}`, scene: new App.Interact.fSlaveImpregChoosePartner(slave)});
			}
			if (slave.assignment !== Job.DAIRY && slave.assignment !== Job.ARCADE && slave.assignment !== Job.CELLBLOCK) {
				if (V.dairyPiping === 1) {
					if ((V.milkPipeline > 88 && V.milkPipeline !== 0) || V.arcologies[0].FSPastoralistLaw === 1) {
						if ((slave.inflation < 3 && slave.pregKnown === 0 && slave.bellyImplant < 1500) || slave.inflation < 1) {
							if (slave.inflationType === "milk" || slave.inflationType === "none") {
								fillAssOptions.push({
									text: `Milk`,
									scene: () => App.Interact.fillUpButt(slave),
									updateSlave: {inflationType: "milk", inflationMethod: 2}
								});
								fillFaceOptions.push({
									text: `Milk`,
									scene: () => App.Interact.fillUpFace(slave),
									updateSlave: {inflationType: "milk", inflationMethod: 1}
								});
							}
						}
					} else {
						fillAssOptions.push({
							text: `Milk`,
							disabled: `${dairyNameCaps} is not producing enough milk to pump through the pipes`
						});
						fillFaceOptions.push({
							text: `Milk`,
							disabled: `${dairyNameCaps} is not producing enough milk to pump through the pipes`
						});
					}
					if ((V.cumPipeline > 88 && V.cumPipeline !== 0) || V.arcologies[0].FSPastoralistLaw === 1) {
						if ((slave.inflation < 3 && slave.pregKnown === 0 && slave.bellyImplant < 1500) || slave.inflation < 1) {
							if (slave.inflationType === "cum" || slave.inflationType === "none") {
								fillAssOptions.push({
									text: `Cum`,
									scene: () => App.Interact.fillUpButt(slave),
									updateSlave: {inflationType: "cum", inflationMethod: 2}
								});
								fillFaceOptions.push({
									text: `Cum`,
									scene: () => App.Interact.fillUpFace(slave),
									updateSlave: {inflationType: "cum", inflationMethod: 1}
								});
							}
						}
					} else {
						fillAssOptions.push({
							text: `Cum`,
							disabled: `${dairyNameCaps} is not producing enough cum to pump through the pipes`
						});
						fillFaceOptions.push({
							text: `Cum`,
							disabled: `${dairyNameCaps} is not producing enough cum to pump through the pipes`
						});
					}
				} /* dairyPiping === 1 */
				if (V.boughtItem.toys.enema === 1) {
					if ((slave.inflation < 3 && slave.pregKnown === 0 && slave.bellyImplant < 1500) || slave.inflation < 1) {
						if (slave.inflationType === "water" || slave.inflationType === "none") {
							fillAssOptions.push({
								text: `Water`,
								scene: () => App.Interact.fillUpButt(slave),
								updateSlave: {inflationType: "water", inflationMethod: 2}
							});
						}
						if (V.boughtItem.toys.medicalEnema === 1) {
							if (slave.inflationType === "aphrodisiac" || slave.inflationType === "none") {
								fillAssOptions.push({
									text: `Aphrodisiacs`,
									scene: () => App.Interact.fillUpButt(slave),
									updateSlave: {inflationType: "aphrodisiac", inflationMethod: 2}
								});
							}
							if (slave.inflationType === "curative" || slave.inflationType === "none") {
								fillAssOptions.push({
									text: `Curatives`,
									scene: () => App.Interact.fillUpButt(slave),
									updateSlave: {inflationType: "curative", inflationMethod: 2}
								});
							}
							if (slave.inflationType === "tightener" || slave.inflationType === "none") {
								fillAssOptions.push({
									text: `Rectal tighteners`,
									scene: () => App.Interact.fillUpButt(slave),
									updateSlave: {inflationType: "tightener", inflationMethod: 2}
								});
							}
						}
					} /* inflation < 3 */
				} /* enema === 1 */
				if (V.wcPiping === 1) {
					if ((slave.inflation < 3 && slave.pregKnown === 0 && slave.bellyImplant < 1500) || slave.inflation < 1) {
						if (slave.inflationType === "urine" || slave.inflationType === "none") {
							fillAssOptions.push({
								text: `Urine`,
								scene: () => App.Interact.fillUpButt(slave),
								updateSlave: {inflationType: "urine", inflationMethod: 2}
							});
						}
					}
				} /* wcPiping === 1 */
			} /* assigned to dairy or arcade */
			if (slave.inflation === 0 && slave.bellyImplant < 1500) {
				if (slave.assignment !== Job.DAIRY && slave.assignment !== Job.ARCADE && slave.assignment !== Job.CELLBLOCK) {
					if (V.boughtItem.toys.buckets === 1) {
						fillFaceOptions.push({
							text: `Two liters of slave food`,
							scene: () => App.Interact.forceFeeding(slave),
							updateSlave: {inflation: 1, inflationType: "food", inflationMethod: 1}
						});
						if (slave.pregKnown === 0) {
							fillFaceOptions.push({
								text: `A gallon of slave food`,
								scene: () => App.Interact.forceFeeding(slave),
								updateSlave: {inflation: 2, inflationType: "food", inflationMethod: 1}
							});
							fillFaceOptions.push({
								text: `Two gallons of slave food`,
								scene: () => App.Interact.forceFeeding(slave),
								updateSlave: {inflation: 3, inflationType: "food", inflationMethod: 1}
							});
						}
					}
					fillFaceOptions.push({text: `Get another slave to do it`, goto: `SlaveOnSlaveFeeding`});
				}
			}
			if (canDoVaginal(slave)) {
				sexOptions.push({text: `Have another slave fuck ${his} pussy`, scene: new App.Interact.fSlaveSlaveVagChoosePartner(slave)});
			}
			if (canDoAnal(slave)) {
				sexOptions.push({text: `Have another slave fuck ${his} ass`, scene: new App.Interact.fSlaveSlaveAssChoosePartner(slave)});
			}
			if (canPenetrate(slave)) {
				sexOptions.push({text: `Have another slave ride ${his} cock`, scene: new App.Interact.fSlaveSlaveDickChoosePartner(slave)});
			} else if (slave.clit >= 4) {
				sexOptions.push({text: `Have another slave ride ${his} clit-dick`, scene: new App.Interact.fSlaveSlaveDickChoosePartner(slave)});
			}
			if (V.seeBestiality) {
				/** @type {FC.SlaveActs} */
				let act;

				if ([Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					if (slave.toyHole === "pussy") {
						act = "vaginal";
					} else if (slave.toyHole === "ass") {
						act = "anal";
					} else if (slave.toyHole === "mouth") {
						act = "oral";
					} else {
						if (canDoVaginal(slave)) {
							act = "vaginal";
						} else if (canDoAnal(slave)) {
							act = "anal";
						} else {
							act = "oral";
						}
					}
				} else if (canDoVaginal(slave)) {
					act = "vaginal";
				} else if (canDoAnal(slave)) {
					act = "anal";
				} else {
					act = "oral";
				}

				if (V.farmyardKennels > 0 && V.active.canine && getAnimal(V.active.canine)) {
					sexOptions.push({
						text: `Have ${getAnimal(V.active.canine).articleAn} ${V.active.canine} mount ${him}`,
						scene: () => App.Interact.fAnimal(slave, "canine", act),
					});
				}
				if (V.farmyardStables > 0 && V.active.hooved && getAnimal(V.active.hooved)) {
					sexOptions.push({
						text: `Let ${getAnimal(V.active.hooved).articleAn} ${V.active.hooved} mount ${him}`,
						scene: () => App.Interact.fAnimal(slave, "hooved", act),
					});
				}
				if (V.farmyardCages > 0 && V.active.feline && getAnimal(V.active.feline)) {
					sexOptions.push({
						text: `Have ${getAnimal(V.active.feline).articleAn} ${V.active.feline} mount ${him}`,
						scene: () => App.Interact.fAnimal(slave, "feline", act),
					});
				}
			}
			sexOptions.push({text: `Abuse ${him}`, scene: () => App.Interact.fAbuse(slave)});
			if (V.seeIncest === 1 && totalRelatives(slave) > 0) {
				const availableRelatives = V.slaves.filter(s => areRelated(s, slave) && isSlaveAvailable(s));
				if (availableRelatives.length > 1) {
					sexOptions.push({
						text: `Fuck ${him} with one of ${his} close relatives`,
						scene: new App.Interact.fRelationChoosePartner(slave),
					});
				} else if (availableRelatives.length === 1) {
					sexOptions.push({
						text: `Fuck ${him} with ${his} ${relativeTerm(slave, availableRelatives[0])} ${SlaveFullName(availableRelatives[0])}`,
						scene: () => App.Interact.fRelation(slave, availableRelatives[0]),
					});
				} else {
					sexOptions.push({text: `None of ${his} close relatives are available`});
				}
			}
			if (slave.relationship > 0) {
				const lover = getSlave(slave.relationshipTarget);
				if (lover) {
					if (isSlaveAvailable(lover)) {
						sexOptions.push({
							text: `Fuck ${him} with ${his} ${relationshipTermShort(slave)} ${SlaveFullName(lover)}`,
							scene: () => App.Interact.fRelation(slave, lover)
						});
					} else if (lover.assignment === Job.AGENT) {
						if (slave.broodmother < 2) {
							sexOptions.push({
								text: `Send ${him} to live with your agent ${SlaveFullName(lover)}`,
								goto: `Agent Company`
							});
						} else {
							sexOptions.push({text: `A hyper-broodmother cannot be sent to live with your agent`});
						}
					} else {
						sexOptions.push({text: `${SlaveFullName(lover)} is unavailable`});
					}
				}
			}
			if (slave.rivalryTarget !== 0 && hasAllLimbs(slave)) {
				const rival = getSlave(slave.rivalryTarget);
				if (isSlaveAvailable(rival) && hasAnyLegs(rival)) {
					sexOptions.push({text: `Abuse ${his} rival with ${him}`, scene: () => App.Interact.fRival(slave)});
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN && slave.accent < 4 && ((canTalk(slave)) || hasAnyArms(slave))) {
				sexOptions.push({text: `Ask ${him} about ${his} feelings`, scene: () => App.Interact.fFeelings(slave)});
				sexOptions.push({text: `Make ${him} beg`, scene: () => App.Interact.fBeg(slave)});
			}
			if (slave.devotion >= 100 && slave.relationship < 0 && slave.relationship > -3) {
				sexOptions.push({
					text: `Talk to ${him} about relationships`,
					goto: `Matchmaking`
				});
			}
			if ((V.policies.mixedMarriage === 1 || V.cheatMode === 1) && slave.relationship !== 5 && slave.relationship !== -3) {
				if (V.marrying.includes(slave.ID)) {
					sexOptions.push({text: `Marry ${him}`, disabled: `You are already marrying ${him} this weekend`});
				} else {
					sexOptions.push({text: `Marry ${him}`, goto: "FMarry"});
				}
			}
		} else {
			/* IS A FUCKDOLL */
			sexOptions.push({text: `Fuck ${his} face hole`, scene: () => App.Interact.fFuckdollOral(slave)});
			if (canDoVaginal(slave)) {
				sexOptions.push({text: `Fuck ${his} front hole`, scene: () => App.Interact.fFuckdollVaginal(slave)});
			}
			if (canGetPregnant(slave) && (slave.geneticQuirks.superfetation !== 2 || V.geneticMappingUpgrade !== 0) && V.seePreg !== 0) {
				if (canImpreg(slave, V.PC)) {
					sexOptions.push({text: `Put a baby in ${him}`, scene: () => App.Interact.fFuckdollImpreg(slave)});
				}
			}
			if (canDoAnal(slave)) {
				sexOptions.push({text: `Fuck ${his} rear hole`, scene: () => App.Interact.fFuckdollAnal(slave)});
			}
		}
		const activeSlaveRepSacrifice = repGainSacrifice(slave, V.arcologies[0]);
		if (activeSlaveRepSacrifice > 0) {
			/*
			TODO: fix this interaction. Consider that it "takes a week" but is not tied to endweek. Consider how easy it is to cheese for rep gains.
			 should probably be an assignment more than an interaction. - Pregmodder
			sexOptions.push({
				text: `Require ${him} to offer penance to Xochiquetzal`,
				goto: `Aztec Slave Sacrifice Penance`,
				note: `This will gain you ${activeSlaveRepSacrifice} reputation`,
			});*/
			if (!FutureSocieties.isActive('FSPaternalist') && (slave.breedingMark === 0 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
				sexOptions.push({
					text: `Sacrifice ${him} on the altar`,
					goto: `Aztec Slave Sacrifice Life`,
					note: `This will kill ${him} and gain you ${activeSlaveRepSacrifice} reputation`,
				});
			}
		}
		el.append(`Use ${him}: `);
		el.appendChild(generateRows(sexOptions));

		if (V.experimental.sexOverhaul) {
			el.appendChild(App.UI.SlaveInteract.useSlave(slave));
		}

		if (fillFaceOptions.length > 0) {
			let fill = document.createElement('div');
			fill.appendChild(document.createTextNode(` Fill ${his} mouth with: `));
			fill.appendChild(generateRows(fillFaceOptions));
			el.appendChild(fill);
		}
		if (fillAssOptions.length > 0) {
			let fill = document.createElement('div');
			fill.appendChild(document.createTextNode(` Fill ${his} ass with: `));
			fill.appendChild(generateRows(fillAssOptions));
			el.appendChild(fill);
		}

		/**
		 * @param {Array<SexOption>} sexArray
		 * @returns {HTMLUListElement}
		 */
		function generateRows(sexArray) {
			const linkArray = [];
			for (let i = 0; i < sexArray.length; i++) {
				let link;

				// is it just text?
				if (sexArray[i].disabled) {
					link = App.UI.DOM.disabledLink(sexArray[i].text, [sexArray[i].disabled]);
				} else {
					// Set up the link
					link = App.UI.DOM.link(
						sexArray[i].text,
						() => { click(sexArray[i]); }
					);

					// add a note node if required
					if (sexArray[i].note) {
						link = App.UI.DOM.combineNodes(
							link,
							" ",
							(App.UI.DOM.makeElement('span', sexArray[i].note, ['note']))
						);
					}
				}
				linkArray.push(link);
			}

			return App.UI.DOM.generateLinksStrip(linkArray);

			/**
			 * @param {SexOption} sexOption
			 */
			function click(sexOption) {
				if (sexOption.updateSlave) {
					Object.assign(slave, sexOption.updateSlave);
				}
				if (sexOption.update) {
					Object.assign(V, sexOption.update);
				}

				if (sexOption.goto) {
					// just play the passage, no need to refresh anything here
					Engine.play(sexOption.goto);
				} else if (sexOption.scene) {
					if (sexOption.scene instanceof App.Interact.BaseChoosePartnerRenderer) {
						App.Interact.choosePartner(sexOption.scene, miniSceneId, refresh);
					} else {
						// refresh the host passage, to pick up changes to slave
						refresh();
						document.getElementById(miniSceneId).replaceChildren(sexOption.scene());
					}
				} else {
					// just refresh
					refresh();
				}
			}
		}

		return el;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function fucktoyPref() {
		const el = new DocumentFragment();
		/**
		 * @typedef {object} FucktoyLinkDesc
		 * @property {string} text
		 * @property {FC.ToyHole} [toyHole]
		 * @property {string} [disabled]
		 */

		/** @type {Array<FucktoyLinkDesc>} */
		let links = [];

		/**
		 * @param {string} text
		 * @param {FC.ToyHole} toyHole
		 * @param {boolean} enabled
		 * @param {string} [disabledText] Must be provided if 'enabled' is False
		 */
		function appendLink(text, toyHole, enabled, disabledText) {
			const link = {text: text};
			if (enabled) {
				link.toyHole = toyHole;
			} else {
				link.disabled = disabledText;
			}
			links.push(link);
		}

		el.append(`Fucktoy use preference: `);
		const hole = App.UI.DOM.appendNewElement('span', el, `${slave.toyHole}. `);
		hole.style.fontWeight = "bold";

		appendLink('Mouth', 'mouth', true);
		appendLink('Tits', 'boobs', true);
		if (slave.vagina >= 0) {
			appendLink('Pussy', 'pussy', slave.vagina > 0 && canDoVaginal(slave), `Take ${his} virginity before giving ${his} pussy special attention`);
		}
		appendLink('Ass', 'ass', (slave.anus > 0) && canDoAnal(slave), `Take ${his} anal virginity before giving ${his} ass special attention`);
		if (slave.dick > 0 && canPenetrate(slave)) {
			appendLink('Dick', 'dick', true);
		}
		appendLink('No Preference', "all her holes", true);

		/**
		 * @param {FucktoyLinkDesc} linkDesc
		 * @returns {Node}
		 */
		function generateLink(linkDesc) {
			const span = document.createElement("span");
			// is it just text?
			if (linkDesc.disabled) {
				return App.UI.DOM.disabledLink(linkDesc.text, [linkDesc.disabled]);
			}
			// Are they already on this toyHole?
			if (linkDesc.toyHole === slave.toyHole) {
				return App.UI.DOM.disabledLink(linkDesc.text, [slave.slaveName + " is already preferring this."]);
			}
			// Set up the link
			span.append(App.UI.DOM.link(
				linkDesc.text,
				() => {
					slave.toyHole = linkDesc.toyHole;
					fucktoyDiv.replaceChildren(fucktoyPref());
				},
			));
			return span;
		}

		el.appendChild(App.UI.DOM.generateLinksStrip(links.map(generateLink)));

		return el;
	}
};
