/**
 * @file Functions for rendering lists of slave summaries for various purposes. This includes
 * lists for the penthouse/facilities, selecting a slaves, facility leaders.
 *
 * For documentation see devNotes/slaveListing.md
 */

App.UI.SlaveList = {};

/**
 * @callback slaveTextGenerator
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */

/**
 * @callback slaveToElement
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLElement|DocumentFragment}
 */

/**
 * @param {number[]} IDs
 * @param {Array.<{id: number, rejects: string[]}>} rejectedSlaves
 * @param {slaveToElement} interactionLink
 * @param {slaveToElement} [postNote]
 * @returns {DocumentFragment}
 */
App.UI.SlaveList.render = function(IDs, rejectedSlaves, interactionLink, postNote) {
	const facilityPassages = new Set(
		["Main", "Head Girl Suite", "Spa", "Brothel", "Club", "Arcade", "Clinic", "Schoolroom", "Dairy", "Farmyard",
			"Servants' Quarters", "Master Suite", "Cellblock"]);

	// required, if multiple list are displayed on the same passage
	const uuid = generateNewID();
	const passageName = passage();

	const res = document.createDocumentFragment();

	/** @type {App.Art.SlaveArtBatch} */
	let batchRenderer = null;
	if (V.seeImages === 1 && V.seeSummaryImages === 1) {
		batchRenderer = new App.Art.SlaveArtBatch(IDs, 1);
		res.appendChild(batchRenderer.writePreamble());
	}

	res.append(createQuickList(IDs, uuid));

	const fcs = App.Entity.facilities;
	const penthouse = fcs.penthouse;

	let anyFacilityExists = false;

	for (const f of Object.values(fcs)) {
		if (f !== penthouse && f.established) {
			anyFacilityExists = true;
			break;
		}
	}

	let showTransfers = false;
	if (anyFacilityExists) {
		if (facilityPassages.has(passageName)) {
			V.returnTo = passageName;
			showTransfers = true;
		}
	}

	for (const sid of IDs) {
		let slaveSummary = renderSlave(sid, interactionLink, showTransfers, postNote);
		let slaveDiv = document.createElement("div");
		slaveDiv.id = `slave-${sid}-${uuid}`;
		slaveDiv.classList.add("slaveSummary");
		if (V.slavePanelStyle === 2) {
			slaveDiv.classList.add("card");
		}
		slaveDiv.appendChild(slaveSummary);
		res.appendChild(slaveDiv);
	}

	for (const rs of rejectedSlaves) {
		const slave = slaveStateById(rs.id);
		const rejects = rs.rejects;
		const slaveName = SlaveFullName(slave);
		let slaveDiv = document.createElement("div");
		slaveDiv.id = `slave-${slave.ID}`;
		slaveDiv.style.setProperty("clear", "both");
		if (rejects.length === 1) {
			slaveDiv.innerHTML = rejects[0];
		} else {
			slaveDiv.appendChild(document.createTextNode(`${slaveName}: `));
			let ul = document.createElement("ul");
			for (const reject of rejects) {
				const li = document.createElement("li");
				li.innerHTML = reject;
				ul.appendChild(li);
			}
			slaveDiv.appendChild(ul);
		}
		res.appendChild(slaveDiv);
	}

	return res;


	/**
	 * @param {number} id
	 * @param {slaveToElement} interactionLink
	 * @param {boolean} showTransfers
	 * @param {slaveToElement} [postNote]
	 * @returns {DocumentFragment}
	 */
	function renderSlave(id, interactionLink, showTransfers, postNote) {
		let res = document.createDocumentFragment();
		if (V.slavePanelStyle === 0) {
			res.appendChild(document.createElement("br"));
		} else if (V.slavePanelStyle === 1) {
			const hr = document.createElement("hr");
			hr.style.margin = "0";
			res.appendChild(hr);
		}
		const slave = slaveStateById(id);

		if (batchRenderer && (!V.seeCustomImagesOnly || (V.seeCustomImagesOnly && slave.custom.image))) {
			let imgDiv = document.createElement("div");
			imgDiv.classList.add("imageRef", "smlImg", "margin-right");
			imgDiv.appendChild(batchRenderer.render(slave));
			res.appendChild(imgDiv);
		}
		// res.push(dividerAndImage(slave));
		res.appendChild(interactionLink(slave));

		SlaveStatClamp(slave);
		slave.trust = Math.trunc(slave.trust);
		slave.devotion = Math.trunc(slave.devotion);
		slave.health.condition = Math.trunc(slave.health.condition);
		slave.health.shortDamage = Math.trunc(slave.health.shortDamage);
		slave.health.longDamage = Math.trunc(slave.health.longDamage);
		slave.health.illness = Math.trunc(slave.health.illness);
		slave.health.tired = Math.trunc(slave.health.tired);
		slave.health.health = Math.trunc(slave.health.health);
		res.appendChild(document.createTextNode(' will '));
		const assignment = document.createElement("span");
		if ((slave.assignment === Job.REST) && (slave.health.condition >= -20)) {
			assignment.className = "freeAssignment";
			assignment.innerText = slave.assignment;
		} else if (slave.choosesOwnAssignment === 1) {
			assignment.innerText = `choose ${getPronouns(slave).possessive} own job`;
		} else {
			assignment.innerText = slave.assignment;
			if (slave.assignment === Job.CLASSES) {
				const role = tutorForSlave(slave);
				if (role) {
					assignment.innerText += ` on being a ${role}`;
				}
			}
			if (slave.sentence > 0) {
				assignment.innerText += ` for ${years(slave.sentence)}`;
			}
		}
		if (slave.assignment === Job.CLINIC) {
			let list = [];
			if (slave.health.condition <= 40) {
				list.push(`poor health`);
			}
			if (slave.health.shortDamage >= 10) {
				list.push(`injuries`);
			}
			if (slave.health.illness > 0) {
				list.push(`illness`);
			}
			if (S.Nurse) {
				if ((slave.chem > 15) && (V.clinicUpgradeFilters === 1)) {
					list.push(`unhealthy chemicals`);
				}
				if ((V.clinicInflateBelly > 0) && (slave.bellyImplant >= 0) && (slave.bellyImplant <= (V.arcologies[0].FSTransformationFetishistResearch ? 800000 : 130000))) {
					list.push(`implant filling`);
				}
				if ((slave.pregKnown === 1) && (V.clinicSpeedGestation > 0 || slave.pregControl === "speed up") && (slave.pregAdaptation * 1000 < slave.bellyPreg || slave.preg > slave.pregData.normalBirth / 1.33)) {
					list.push(`observation of accelerated pregnancy`);
				} else if ((slave.pregKnown === 1) && (V.clinicSpeedGestation > 0 || slave.pregControl === "speed up")) {
					list.push(`safely hurrying pregnancy along`);
				} else if (slave.pregAdaptation * 1000 < slave.bellyPreg || slave.preg > slave.pregData.normalBirth / 1.33) {
					list.push(`observation during pregnancy`);
				}
			}
			if (list.length > 0) {
				assignment.innerText += ` for ${toSentence(list)}`;
			} else {
				assignment.innerText += ", preparing to check out";
			}
		} else if (slave.assignment === Job.SPA) {
			let list = [];
			if (slave.fetish === Fetish.MINDBROKEN) {
				assignment.innerText += `, mindbroken`;
			} else {
				if (V.spaFix !== 2 && ((slave.sexualFlaw !== "none") || (slave.behavioralFlaw !== "none"))) {
					list.push(`overcoming flaws`);
				}
				if ((slave.trust < 60) || (slave.devotion < 60)) {
					list.push(`learning to accept life as a slave`);
				}
				if (slave.health.condition < 20) {
					list.push(`improving in health`);
				}
				if (list.length > 0) {
					assignment.innerText += `, ${toSentence(list)}`;
				} else {
					assignment.innerText += ", preparing to move out";
				}
			}
		} else if (slave.assignment === Job.SCHOOL) {
			let lessons = [];
			if (V.schoolroomRemodelBimbo === 1 && slave.intelligenceImplant > -15) {
				lessons.push("being a dumb bimbo");
			} else if (V.schoolroomRemodelBimbo === 0 && slave.intelligenceImplant < 30) {
				lessons.push("general education");
			}
			if (!((slave.voice === 0) || (slave.accent <= 1) || ((V.schoolroomUpgradeLanguage === 0) && (slave.accent <= 2)))) {
				lessons.push("speech");
			}
			if (!((slave.skill.oral > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.oral > 10)))) {
				lessons.push("oral");
			}
			if (!((slave.skill.whoring > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.whoring > 10)))) {
				lessons.push("whoring");
			}
			if (!((slave.skill.entertainment > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.entertainment > 10)))) {
				lessons.push("entertainment");
			}
			if (!((slave.skill.anal > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.anal > 10)))) {
				lessons.push("anal");
			}
			if (!((slave.skill.vaginal > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.vaginal > 10)) || (slave.vagina < 0))) {
				lessons.push("vaginal");
			}
			if (!((slave.skill.penetrative > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.penetrative > 10)) || (penetrativeSocialUse() < 40))) {
				lessons.push("penetrative");
			}
			const role = tutorForSlave(slave);
			if (role && needsTutoring(slave)) {
				lessons.push(`being a good ${role}`);
			}
			if (lessons.length > 0) {
				assignment.innerText += `, practicing ${toSentence(lessons)}`;
			} else {
				assignment.innerText += ", studying for finals";
			}
		} else if (slave.assignment === Job.SUBORDINATE) {
			if (slave.subTarget === -1) {
				assignment.innerText += ", serving as your Stud";
			} else if (slave.subTarget !== 0) {
				const domSlave = getSlave(slave.subTarget);
				if (domSlave) {
					assignment.innerText += ", serving " + SlaveFullName(domSlave) + " exclusively";
				} else {
					slave.subTarget = 0;
				}
			}
		} else if (slave.assignment === Job.AGENT) {
			const arc = V.arcologies.find((a) => a.leaderID === slave.ID);
			if (arc) {
				assignment.innerText += `, leading `;
				if (passageName === "Neighbor Interact") {
					assignment.appendChild(App.UI.DOM.makeElement("span", arc.name, "name"));
				} else {
					assignment.appendChild(App.UI.DOM.passageLink(arc.name, "Neighbor Interact"));
				}
			}
		} else if (slave.assignment === Job.AGENTPARTNER) {
			const arc = V.arcologies.find((a) => a.leaderID === slave.relationshipTarget);
			if (arc) {
				assignment.innerText += ` in `;
				if (passageName === "Neighbor Interact") {
					assignment.appendChild(App.UI.DOM.makeElement("span", arc.name, "name"));
				} else {
					assignment.appendChild(App.UI.DOM.passageLink(arc.name, "Neighbor Interact"));
				}
			}
		}
		assignment.appendChild(document.createTextNode('.'));
		res.appendChild(assignment);
		if (V.assignmentRecords[slave.ID]) {
			res.appendChild(document.createTextNode(` Last assigned to ${V.assignmentRecords[slave.ID]}.`));
		}
		res.appendChild(document.createTextNode(' '));

		if ((V.displayAssignments === 1) && (passageName === "Main") && (slave.ID !== V.HeadGirlID) && (slave.ID !== V.RecruiterID) && (slave.ID !== V.BodyguardID)) {
			res.appendChild(App.UI.jobLinks.assignmentsFragment(slave.ID, "Main", (slave, assignment) => {
				App.UI.SlaveList.ScrollPosition.record();
				assignJob(slave, assignment);
			}));
		}
		if (showTransfers) {
			res.appendChild(document.createElement("br"));
			res.appendChild(document.createTextNode('Transfer to: '));
			res.appendChild(App.UI.jobLinks.transfersFragment(slave.ID, (slave, assignment) => {
				App.UI.SlaveList.ScrollPosition.record();
				assignJob(slave, assignment);
			}));
		}

		res.appendChild(App.UI.SlaveSummary.render(slave));

		if (postNote) {
			const pn = postNote(slave);
			if (pn) {
				let r = document.createElement("p");
				r.classList.add("si");
				r.appendChild(pn);
				res.appendChild(r);
			}
		}

		return res;
	}

	/**
	 * @param {number[]} IDs
	 * @param {string} uuid
	 * @returns {DocumentFragment}
	 */
	function createQuickList(IDs, uuid) {
		if (V.useSlaveListInPageJSNavigation < 1 || IDs.length < 2 || passageName !== "Main") {
			return new DocumentFragment();
		}

		const f = new DocumentFragment();
		let currentSort = null;

		let toggleButton;
		if (V.useSlaveListInPageJSNavigation === 1) {
			toggleButton = App.UI.DOM.appendNewElement("button", f, "Quick-List", ["quick-button"]);
		}

		const indexSorting = document.createElement("div");
		f.append(indexSorting);

		const sortSpan = App.UI.DOM.makeElement("span", "None", ["bold"]);

		indexSorting.append("Sorting: ", sortSpan, " ",
			App.UI.DOM.link("Sort by Devotion",
				() => sortButtons("Devotion", (a, b) => b.devotion - a.devotion, "devotion")),
			" | ",
			App.UI.DOM.link("Sort by Trust", () => sortButtons("Trust", (a, b) => b.trust - a.trust, "trust"))
		);

		const indexContainer = document.createElement("div");
		indexContainer.classList.add("quick-list");
		f.append(indexContainer);
		/**
		 * @typedef {object} JumpButton
		 * @property {App.Entity.SlaveState} slave
		 * @property {HTMLButtonElement} button
		 */
		/**
		 * @type {JumpButton[]}
		 */
		const jumpButtons = [];
		for (const id of IDs) {
			const btn = document.createElement("button");
			const slave = getSlave(id);
			btn.append(SlaveFullName(slave));
			btn.classList.add(getSlaveDevotionClass(slave), getSlaveTrustClass(slave));
			btn.onclick = () => $('html, body').animate({scrollTop: $(`#slave-${id}-${uuid}`).offset().top - 50}, 300);
			jumpButtons.push({slave: slave, button: btn});
			indexContainer.append(btn);
		}

		if (V.useSlaveListInPageJSNavigation === 1) {
			App.UI.DOM.elementToggle(toggleButton, [indexSorting, indexContainer]);
		}

		return f;

		/**
		 * @param {string} name
		 * @param {function(FC.SlaveState, FC.SlaveState):number} compareFn
		 * @param {string} colorClass
		 */
		function sortButtons(name, compareFn, colorClass) {
			$(sortSpan).empty().append(name);
			jumpButtons.sort((a, b) => compareFn(a.slave, b.slave));
			$(indexContainer).empty().append(jumpButtons.map(v => v.button));
			if (currentSort) {
				indexContainer.classList.remove(currentSort);
			}
			indexContainer.classList.add(colorClass);
			currentSort = colorClass;
		}
	}
};

App.UI.SlaveList.Decoration = {};
/**
 * returns "HG", "BG", "PA", and "RC" prefixes
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLElement}
 */
App.UI.SlaveList.Decoration.penthousePositions = function(slave) {
	const fcs = App.Entity.facilities;
	if (fcs.headGirlSuite.manager.isEmployed(slave)) {
		return App.UI.DOM.makeElement("span", 'HG', ['lightcoral', 'strong']);
	}
	if (fcs.penthouse.manager.isEmployed(slave)) {
		return App.UI.DOM.makeElement("span", 'RC', ['lightcoral', 'strong']);
	}
	if (fcs.armory.manager.isEmployed(slave)) {
		return App.UI.DOM.makeElement("span", 'BG', ['lightcoral', 'strong']);
	}
	return App.UI.SlaveList.Decoration.personalAttention(slave);
};

/**
 * returns just the "PA" prefix
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLElement}
 */
App.UI.SlaveList.Decoration.personalAttention = function(slave) {
	if (V.personalAttention.task === PersonalAttention.TRAINING && V.personalAttention.slaves.some(s => s.ID === slave.ID)) {
		return App.UI.DOM.makeElement("span", 'PA', ['lightcoral', 'strong']);
	}
	return null;
};

App.UI.SlaveList.ScrollPosition = (function() {
	let lastPassage = null;
	let position = 0;

	return {
		reset: function() {
			lastPassage = null;
			position = 0;
		},

		record: function() {
			lastPassage = passage();
			position = window.pageYOffset;
		},

		restore: function() {
			$(document).one(':passageend', () => {
				if (lastPassage === passage()) {
					window.scrollTo(0, position);
				}
				this.reset();
			});
		}
	};
})();

App.UI.SlaveList.SlaveInteract = {};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} [text] print this text instead of slave name
 * @returns {DocumentFragment|HTMLElement}
 */
App.UI.SlaveList.SlaveInteract.stdInteract = function(slave, text) {
	const link = App.UI.DOM.passageLink(text ? text : SlaveFullName(slave), "Slave Interact", () => {
		App.UI.SlaveList.ScrollPosition.record();
		V.AS = slave.ID;
	});

	if (V.favorites.includes(slave.ID)) {
		return App.UI.DOM.combineNodes(
			App.UI.DOM.makeElement("span", String.fromCharCode(0xe800), ["icons", "favorite"]),
			" ", link);
	}

	return link;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {slaveToElement} decoratorFunction
 * @returns {DocumentFragment|HTMLElement}
 */
App.UI.SlaveList.SlaveInteract.decoratedInteract = function(slave, decoratorFunction) {
	const decoration = decoratorFunction ? decoratorFunction(slave) : null;
	const stdLink = App.UI.SlaveList.SlaveInteract.stdInteract(slave);
	if (decoration) {
		const fr = document.createDocumentFragment();
		fr.appendChild(decoration);
		fr.appendChild(document.createTextNode(' '));
		fr.appendChild(stdLink);
		return fr;
	}
	return stdLink;
};

/**
 * @param {string} passage
 * @returns {HTMLElement}
 */
App.UI.SlaveList.sortingLinks = function(passage) {
	const div = document.createElement("div");

	let span = App.UI.DOM.makeElement("span", "Sort by: ");
	const orderMap = Array.from(App.Data.SlaveSorting.entries())
		.map(([name, key]) => {
			return {key: key, name: name};
		});
	div.append(
		span,
		App.UI.DOM.makeSelect(orderMap, V.sortSlavesBy, val => {
			V.sortSlavesBy = val;
			App.UI.reload();
		}),
	);

	span = App.UI.DOM.makeElement("span", " Sort direction: ");
	const order = ["descending", "ascending"];
	span.append(App.UI.DOM.generateLinksStrip(order.map(so =>
		V.sortSlavesOrder === so ? capFirstChar(so)
			: App.UI.DOM.link(capFirstChar(so), () => {
				V.sortSlavesOrder = so;
				App.UI.reload();
			})
	)));
	div.append(span);

	return div;
};

/**
 * Standard tabs for a facility with a single job (SJ)
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} [facilityPassage]
 * @param {boolean} [showTransfersTab=false]
 * @param {{assign: string, remove: string, transfer: (string| undefined)}} [tabCaptions]
 * @param {slaveToElement} [decoratorFunction]
 * @param {slaveToElement} [postNote]
 * @returns {DocumentFragment}
 */
App.UI.SlaveList.listSJFacilitySlaves = function(facility, facilityPassage, showTransfersTab = false, tabCaptions = undefined, decoratorFunction = undefined, postNote = undefined) {
	return App.UI.SlaveList.listJFacilitySlaves(facility.desc.defaultJob, facility, facilityPassage, showTransfersTab, tabCaptions, decoratorFunction, postNote);
};

/**
 * Standard tabs for a facility with a given job (J)
 * @param {string} jobName
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} [facilityPassage]
 * @param {boolean} [showTransfersTab=false]
 * @param {{assign: string, remove: string, transfer: (string| undefined)}} [tabCaptions]
 * @param {slaveToElement} [decoratorFunction]
 * @param {slaveToElement} [postNote]
 * @returns {DocumentFragment}
 */
App.UI.SlaveList.listJFacilitySlaves = function(jobName, facility, facilityPassage, showTransfersTab = false, tabCaptions = undefined, decoratorFunction = undefined, postNote = undefined) {
	const job = facility.job(jobName);

	facilityPassage = facilityPassage || passage();
	tabCaptions = tabCaptions || {
		assign: 'Assign a slave',
		remove: 'Remove a slave',
		transfer: 'Transfer from Facility',
	};
	const frag = document.createDocumentFragment();
	if (V.sortSlavesMain) {
		frag.append(this.sortingLinks(facilityPassage));
	}

	const tabBar = new App.UI.Tabs.TabBar("SlaveListing");

	if (facility.hasFreeSpace) {
		const assignableSlaveIDs = job.desc.partTime
			? V.slaves.map(slave => slave.ID) // all slaves can work here
			: [...App.Entity.facilities.penthouse.employeesIDs()]; // only slaves from the penthouse can be transferred here
		tabBar.addTab(tabCaptions.assign, "assign", assignableTabContent(assignableSlaveIDs));
	} else {
		tabBar.addTab(tabCaptions.assign, "assign", App.UI.DOM.makeElement("strong", `${capFirstChar(facility.name)} is full and cannot hold any more slaves`));
	}

	const facilitySlaves = [...job.employeesIDs()];
	if (facilitySlaves.length > 0) {
		SlaveSort.IDs(facilitySlaves);
		tabBar.addTab(tabCaptions.remove, "remove", App.UI.SlaveList.render(facilitySlaves, [],
			(slave) => App.UI.SlaveList.SlaveInteract.decoratedInteract(slave, decoratorFunction),
			(slave) => {
				const frag = new DocumentFragment();
				if (postNote) {
					frag.append(postNote(slave));
				}
				frag.append(App.UI.DOM.link(`Retrieve ${getPronouns(slave).object} from ${facility.name}`, () => {
					removeJob(slave, job.desc.assignment);
				}, [], facilityPassage));
				return frag;
			}
		));
	} else {
		tabBar.addTab(tabCaptions.remove, "remove", App.UI.DOM.makeElement("em", `${capFirstChar(facility.name)} is empty for the moment`));
	}

	if (showTransfersTab) {
		if (facility.hasFreeSpace) {
			// slaves from other facilities can be transferred here
			const transferableIDs = V.slaves.reduce((acc, slave) => {
				if (!assignmentVisible(slave) && !facility.isHosted(slave)) {
					acc.push(slave.ID);
				}
				return acc;
			}, []);
			tabBar.addTab(tabCaptions.transfer, "transfer", assignableTabContent(transferableIDs));
		} else {
			tabBar.addTab(tabCaptions.transfer, "transfer", App.UI.DOM.makeElement("strong", `${capFirstChar(facility.name)} is full and cannot hold any more slaves`));
		}
	}

	frag.append(tabBar.render());

	return frag;

	/**
	 * @param {number[]} slaveIDs
	 * @returns {DocumentFragment}
	 */
	function assignableTabContent(slaveIDs) {
		SlaveSort.IDs(slaveIDs);
		let rejectedSlaves = [];
		let passedSlaves = [];
		slaveIDs.forEach((id) => {
			const rejects = facility.canHostSlave(slaveStateById(id), jobName);
			if (rejects.length > 0) {
				rejectedSlaves.push({id: id, rejects: rejects});
			} else {
				passedSlaves.push(id);
			}
		}, []);
		return App.UI.SlaveList.render(passedSlaves, rejectedSlaves,
			(slave) => App.UI.SlaveList.SlaveInteract.decoratedInteract(slave, decoratorFunction),
			(slave) => {
				const frag = new DocumentFragment();
				if (postNote) {
					frag.append(postNote(slave));
				}
				frag.append(App.UI.DOM.link(`Send ${getPronouns(slave).object} to ${facility.name}`, () => {
					assignmentTransition(slave, job.desc.assignment, facilityPassage);
				}));
				return frag;
			});
	}
};

/**
 * @param {string[]} classNames
 */
App.UI.SlaveList.makeNameDecorator = function(classNames) {
	return (slave) => {
		const r = document.createElement("span");
		for (const c of classNames) {
			r.classList.add(c);
		}
		r.textContent = SlaveFullName(slave);
		return r;
	};
};

/**
 * @returns {DocumentFragment}
 */
App.UI.SlaveList.listNGPSlaves = function() {
	const thisPassage = 'New Game Plus';

	const frag = document.createDocumentFragment();
	frag.append(this.sortingLinks(thisPassage));
	const tabBar = new App.UI.Tabs.TabBar("NewGamePlus");

	let imported = [];
	let nonImported = [];
	for (const slave of V.slaves) {
		// @ts-ignore: handle the legacy assignment string
		if (slave.assignment === "be imported") {
			slave.assignment = Job.IMPORTED;
		}
		if (slave.assignment === Job.IMPORTED) {
			imported.push(slave.ID);
		} else {
			nonImported.push(slave.ID);
		}
	}

	if (imported.length < V.slavesToImportMax) {
		SlaveSort.IDs(nonImported);
		tabBar.addTab("Import a slave", "assign", App.UI.SlaveList.render(nonImported, [],
			App.UI.SlaveList.makeNameDecorator(["emphasizedSlave", "pink"]),
			(s) => App.UI.DOM.passageLink('Add to import list', thisPassage, () => assignJob(s, Job.IMPORTED))
		));
	} else {
		tabBar.addTab("Import a slave", "assign", App.UI.DOM.makeElement('strong', `Slave import limit reached`));
	}

	if (imported.length > 0) {
		SlaveSort.IDs(imported);
		tabBar.addTab("Remove from import", "remove", App.UI.SlaveList.render(imported, [],
			App.UI.SlaveList.makeNameDecorator(["emphasizedSlave", "pink"]),
			(s) => App.UI.DOM.passageLink('Remove from import list', thisPassage, () => removeJob(s, Job.IMPORTED))
		));
	} else {
		tabBar.addTab("Remove from import", "remove", App.UI.DOM.makeElement('em', "No slaves will go with you to the new game"));
	}

	frag.append(tabBar.render());

	return frag;
};

/**
 * Renders facility manager summary or a note with a link to select one
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} [selectionPassage] passage name for manager selection. "${Manager} Select" if omitted
 * @returns {DocumentFragment}
 */
App.UI.SlaveList.displayManager = function(facility, selectionPassage) {
	const managerCapName = capFirstChar(facility.desc.manager.position);
	selectionPassage = selectionPassage || `${managerCapName} Select`;
	const manager = facility.manager.currentEmployee;
	if (manager) {
		return this.render([manager.ID], [],
			App.UI.SlaveList.SlaveInteract.stdInteract,
			() => App.UI.DOM.passageLink(`Change or remove ${managerCapName}`, selectionPassage));
	} else {
		const frag = document.createDocumentFragment();
		frag.append(`You do not have a slave serving as a ${managerCapName}. `, App.UI.DOM.passageLink(`Appoint one`, selectionPassage));
		return frag;
	}
};

/**
 * Displays standard facility page with manager and list of workers
 * @param {App.Entity.Facilities.Facility} facility
 * @param {boolean} [showTransfersPage]
 * @returns {DocumentFragment}
 */
App.UI.SlaveList.stdFacilityPage = function(facility, showTransfersPage) {
	let frag = new DocumentFragment();
	if (facility.manager) {
		frag = this.displayManager(facility);
	}
	frag.append(this.listSJFacilitySlaves(facility, passage(), showTransfersPage));
	return frag;
};

App.UI.SlaveList.penthousePage = function() {
	const ph = App.Entity.facilities.penthouse;
	/** @type {slaveToElement} */
	const interactRenderer = (slave) =>
		App.UI.SlaveList.SlaveInteract.decoratedInteract(slave, App.UI.SlaveList.Decoration.penthousePositions);

	function overviewTabContent() {
		const fragment = document.createDocumentFragment();
		const A = V.arcologies[0];

		let slaveWrapper = App.UI.DOM.makeElement("div", null, ['margin-top']);
		if (V.HeadGirlID) {
			const HG = S.HeadGirl;
			slaveWrapper.append(App.UI.DOM.makeElement("span", SlaveFullName(HG), "slave-name"),
				" is serving as your Head Girl");
			if (A.FSEgyptianRevivalistLaw === 1) {
				slaveWrapper.append(" and Consort");
			}
			slaveWrapper.append(". ");
			const link = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Head Girl", "Head Girl Select"), "major-link");
			link.id = "manageHG";
			slaveWrapper.append(link, " ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Head Girl Select"), "hotkey"));
			slaveWrapper.append(App.UI.SlaveList.render([HG.ID], [], interactRenderer));
		} else {
			if (V.slaves.length > 1) {
				slaveWrapper.append("You have ", App.UI.DOM.makeElement("span", "not", "warning"), " selected a Head Girl");
				if (A.FSEgyptianRevivalistLaw === 1) {
					slaveWrapper.append(" and Consort");
				}
				slaveWrapper.append(". ", App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select One", "Head Girl Select"), "major-link"),
					" ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Head Girl Select"), "hotkey"));
				slaveWrapper.id = "manageHG";
				if (V.slavePanelStyle === 2) {
					slaveWrapper.classList.add("slaveSummary", "card");
				}
			} else {
				slaveWrapper.append("You do not have enough slaves to keep a Head Girl");
				slaveWrapper.classList.add("note");
			}
		}
		fragment.append(slaveWrapper);

		slaveWrapper = document.createElement("p");
		if (V.RecruiterID) {
			const RC = S.Recruiter;
			const {he} = getPronouns(RC);
			slaveWrapper.append(App.UI.DOM.makeElement("span", SlaveFullName(RC), "slave-name"),
				" is working");
			if (V.recruiterTarget !== "other arcologies") {
				slaveWrapper.append(" to recruit girls. ");
			} else {
				slaveWrapper.append(" as a Sexual Ambassador");
				if (A.influenceTarget === -1) {
					slaveWrapper.append(", but ", App.UI.DOM.makeElement("span", `${he} has no target to influence. `, "warning"));
				} else {
					const targetName = V.arcologies.find(a => a.direction === A.influenceTarget).name;
					slaveWrapper.append(` to ${targetName}. `);
				}
			}
			const link = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Recruiter", "Recruiter Select"), "major-link");
			link.id = "manageRecruiter";
			slaveWrapper.append(link, " ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Recruiter Select"), "hotkey"));
			slaveWrapper.append(App.UI.SlaveList.render([RC.ID], [], interactRenderer));
		} else {
			slaveWrapper.append("You have ", App.UI.DOM.makeElement("span", "not", "warning"), " selected a Recruiter. ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select one", "Recruiter Select"), "major-link"),
				" ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Recruiter Select"), "hotkey"));
			slaveWrapper.id = "manageRecruiter";
			if (V.slavePanelStyle === 2) {
				slaveWrapper.classList.add("slaveSummary", "card");
			}
		}
		fragment.append(slaveWrapper);

		if (V.dojo) {
			slaveWrapper = document.createElement("p");
			const BG = S.Bodyguard;
			if (BG) {
				slaveWrapper.append(App.UI.DOM.makeElement("span", SlaveFullName(BG), "slave-name"),
					" is serving as your bodyguard. ");
				const link = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Bodyguard", "BG Select"), "major-link");
				link.id = "manageBG";
				slaveWrapper.append(link, " ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("BG Select"), "hotkey"));
				slaveWrapper.append(App.UI.SlaveList.render([BG.ID], [], interactRenderer));
				slaveWrapper.append(App.MainView.useGuard());
			} else {
				slaveWrapper.append("You have ", App.UI.DOM.makeElement("span", "not", "warning"), " selected a Bodyguard. ",
					App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select one", "BG Select"), "major-link"),
					" ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("BG Select"), "hotkey"));
				slaveWrapper.id = "manageBG";
				if (V.slavePanelStyle === 2) {
					slaveWrapper.classList.add("slaveSummary", "card");
				}
			}

			fragment.append(slaveWrapper);
		}
		return fragment;
	}

	/**
	 * @param {string} job
	 * @returns {{n: number, dom: DocumentFragment}}
	 */
	function _slavesForJob(job) {
		const employeesIDs = job === 'all' ? [...ph.employeesIDs()] : [...ph.job(job).employeesIDs()];
		if (employeesIDs.length === 0) {
			return {n: 0, dom: document.createDocumentFragment()};
		}

		SlaveSort.IDs(employeesIDs);
		return {
			n: employeesIDs.length,
			dom: App.UI.SlaveList.render(employeesIDs, [], interactRenderer,
				V.fucktoyInteractionsPosition === 1 && job === "fucktoy" ? App.MainView.useFucktoy : null),
		};
	}

	/**
	 * @typedef tabDesc
	 * @property {string} tabName
	 * @property {string} caption
	 * @property {Node} content
	 */

	/**
	 * @param {string} tabName
	 * @param {string} caption
	 * @param {Node} content
	 * @returns {tabDesc}
	 */
	function makeTabDesc(tabName, caption, content) {
		return {
			tabName: tabName,
			caption: caption,
			content: content,
		};
	}

	/**
	 * Displays encyclopedia entries for occupations at the top of the tab, if enabled
	 * @param {string} jobName
	 * @returns {HTMLSpanElement}
	 */
	function encyclopediaTips(jobName) {
		const span = document.createElement("span");
		span.classList.add("note");
		if (V.showTipsFromEncy) {
			switch (jobName) {
				case "rest":
					span.append(App.Encyclopedia.Assignments.rest());
					break;
				case "chooseOwn":
					break; /* no entry written for choose own */
				case "fucktoy":
					span.append(App.Encyclopedia.Assignments.fucktoy());
					break;
				case "classes":
					span.append(App.Encyclopedia.Assignments.attendingClasses());
					break;
				case "houseServant":
					span.append(App.Encyclopedia.Assignments.servitude());
					break;
				case Job.WHORE:
					span.append(App.Encyclopedia.Assignments.whoring());
					break;
				case "publicServant":
					span.append(App.Encyclopedia.Assignments.publicService());
					break;
				case "subordinateSlave":
					span.append(App.Encyclopedia.Assignments.sexualServitude());
					break;
				case "cow":
					span.append(App.Encyclopedia.Assignments.milking());
					break;
				case "gloryhole":
					span.append(App.Encyclopedia.Assignments.gloryHole());
					break;
				case "confinement":
					span.append(App.Encyclopedia.Assignments.confinement());
					break;
				default:
					span.append(App.UI.DOM.makeElement("span", "missing tip for this tab", "error"));
					break;
			}
		}
		return span;
	}

	function penthouseTab() {
		const penthouseSlavesIDs = [...ph.employeesIDs()];
		if (S.HeadGirl) {
			penthouseSlavesIDs.push(S.HeadGirl.ID);
		}
		if (S.Recruiter) {
			penthouseSlavesIDs.push(S.Recruiter.ID);
		}
		if (S.Bodyguard) {
			penthouseSlavesIDs.push(S.Bodyguard.ID);
		}
		SlaveSort.IDs(penthouseSlavesIDs);
		return makeTabDesc("penthouse", `Penthouse${V.useSlaveSummaryTabs > 0 ? ` (${penthouseSlavesIDs.length})` : ""}`,
			App.UI.SlaveList.render(penthouseSlavesIDs, [], interactRenderer));
	}

	function favorites() {
		SlaveSort.IDs(V.favorites);
		return makeTabDesc("favorites", `Favorites${V.useSlaveSummaryTabs > 0 ? ` (${V.favorites.length})` : ""}`,
			App.UI.SlaveList.render(V.favorites, [], interactRenderer));
	}

	function arcologyTab() {
		const allSlaveIDs = V.slaves.map((slave) => slave.ID);
		SlaveSort.IDs(allSlaveIDs);
		return makeTabDesc("arcology", `Arcology${V.useSlaveSummaryTabs > 0 ? ` (${allSlaveIDs.length})` : ""}`,
			App.UI.SlaveList.render(allSlaveIDs, [], interactRenderer));
	}

	const fragment = new DocumentFragment();

	if (V.positionMainLinks >= 0) {
		fragment.append(App.UI.DOM.makeElement("div", App.UI.View.mainLinks(), "center"));
	}

	if (V.sortSlavesMain) {
		fragment.append(App.UI.SlaveList.sortingLinks("Main"));
	}

	/** @type {tabDesc[]} */
	let tabs = [];

	// Overview tab
	if (V.useSlaveSummaryOverviewTab) {
		tabs.push(makeTabDesc("overview", "Special Roles", overviewTabContent()));
	}

	tabs.push(penthouseTab());

	if (V.favorites.length > 0 || V.useSlaveSummaryTabs === 0) {
		tabs.push(favorites());
	}

	// tabs for each assignment
	for (const jn of ph.jobsNames) {
		const slaves = _slavesForJob(jn);
		if (slaves.n > 0) {
			tabs.push(makeTabDesc(jn, `${ph.desc.jobs[jn].position}${V.useSlaveSummaryTabs > 0 ? ` (${slaves.n})` : ""}`, App.UI.DOM.combineNodes(encyclopediaTips(jn), slaves.dom)));
		} else if (V.useSlaveSummaryTabs === 0) {
			tabs.push(makeTabDesc(jn, ph.desc.jobs[jn].position, encyclopediaTips(jn)));
		}
	}

	tabs.push(arcologyTab());

	const tabBar = new App.UI.Tabs.TabBar("Main");
	let buttonClass = undefined;
	if (V.useSlaveSummaryTabs === 2) {
		buttonClass = "card";
	}
	let contentClass = undefined;
	if (V.useSlaveSummaryTabs === 0) {
		contentClass = "no-fade";
	} else if (V.useSlaveSummaryTabs === 2) {
		contentClass = "card";
	}
	for (const tab of tabs) {
		tabBar.addTab(tab.caption, tab.tabName, tab.content, buttonClass, contentClass);
	}
	fragment.append(tabBar.render(V.useSlaveSummaryTabs === 0));

	if (V.positionMainLinks <= 0) {
		fragment.append(App.UI.DOM.makeElement("div", App.UI.View.mainLinks(), "center"));
	}

	return fragment;
};

/**
 * @callback slaveFilterCallbackReasoned
 * @param {App.Entity.SlaveState} slave
 * @returns {string[]}
 */

/**
 * @callback slaveFilterCallbackSimple
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */

App.UI.SlaveList.slaveSelectionList = function() {
	/**
	 * @property {slaveFilterCallbackReasoned|slaveFilterCallbackSimple} filter
	 * @property {slaveToElement} interactionLink
	 * @property {slaveTestCallback} [expCheck]
	 * @property {slaveToElement} [postNote]
	 */
	let options = null;

	/**
	 * @type {HTMLDivElement}
	 */
	let slaveSelectionList = null;

	$(document).on(':passageinit', () => {
		slaveSelectionList = null;
	});

	return selection;

	/**
	 * @param {slaveFilterCallbackReasoned|slaveFilterCallbackSimple} filter
	 * @param {slaveToElement} interactionLink
	 * @param {slaveTestCallback} [experienceChecker]
	 * @param {slaveToElement} [postNote]
	 * @returns {HTMLElement}
	 */
	function selection(filter, interactionLink, experienceChecker, postNote) {
		if (experienceChecker === null) {
			experienceChecker = undefined;
		}
		options = {
			filter: filter,
			interactionLink: interactionLink,
			expCheck: experienceChecker,
			postNote: postNote
		};

		const div = document.createElement("div");
		div.append(_assignmentFilter(experienceChecker !== undefined));
		slaveSelectionList = App.UI.DOM.appendNewElement("div", div, _listSlaves('all'));
		return div;
	}

	function _updateList(assignment) {
		App.UI.DOM.replace(slaveSelectionList, _listSlaves(assignment));
	}

	/**
	 * Displays assignment filter links
	 * @param {boolean} includeExperienced
	 * @returns {HTMLElement}
	 */
	function _assignmentFilter(includeExperienced) {
		let filters = {
			all: "All"
		};
		let fNames = Object.keys(App.Entity.facilities);
		fNames.sort();
		for (const fn of fNames) {
			/** @type {App.Entity.Facilities.Facility} */
			const f = App.Entity.facilities[fn];
			if (f.established && f.hasEmployees) {
				filters[fn] = f.name;
			}
		}
		let links = [];
		for (const f in filters) {
			links.push(App.UI.DOM.link(filters[f], () => _updateList(f)));
		}
		if (includeExperienced) {
			links.push(App.UI.DOM.makeElement("span", App.UI.DOM.link('Experienced', () => _updateList('experienced')), "lime"));
		}

		return App.UI.DOM.generateLinksStrip(links);
	}

	/**
	 * @param {string} assignmentStr
	 * @returns {DocumentFragment}
	 */
	function _listSlaves(assignmentStr) {
		const slaves = V.slaves;
		/** @type {Array<number>} */
		let unfilteredIDs;
		switch (assignmentStr) {
			case 'all':
				unfilteredIDs = slaves.map(s => s.ID);
				break;
			case 'experienced':
				unfilteredIDs = slaves.reduce((acc, s) => {
					if (options.expCheck(s)) {
						acc.push(s.ID);
					}
					return acc;
				}, []);
				break;
			default:
				unfilteredIDs = [...App.Entity.facilities[assignmentStr].employeesIDs()]; // set to array
				break;
		}
		SlaveSort.IDs(unfilteredIDs);
		let passingIDs = [];
		let rejects = [];

		unfilteredIDs.forEach(id => {
			const fr = options.filter(slaveStateById(id));
			if (fr === true || (Array.isArray(fr) && fr.length === 0)) {
				passingIDs.push(id);
			} else {
				if (Array.isArray(fr)) {
					rejects.push({id: id, rejects: fr});
				}
			}
		});

		// clamsi fragment to create a function which combines results of two optional tests
		// done this way to test for tests presence only once
		const listPostNote = options.expCheck
			? (options.postNote
				? s => options.expCheck(s) ? App.UI.DOM.combineNodes(
					App.UI.DOM.makeElement("span", "Has applicable career experience.", "lime"),
					document.createElement("br"),
					options.postNote(s)
				) : options.postNote(s)
				: s => options.expCheck(s) ? App.UI.DOM.makeElement("span", "Has applicable career experience.", "lime") : null)
			: options.postNote
				? s => options.postNote(s)
				: () => null;

		return App.UI.SlaveList.render(passingIDs, rejects, options.interactionLink, listPostNote);
	}
}();

/**
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} passage go here after the new facility manager is selected
 * @param {slaveToElement} [note]
 * @returns {HTMLElement}
 */
App.UI.SlaveList.facilityManagerSelection = function(facility, passage, note) {
	return App.UI.SlaveList.slaveSelectionList(slave => facility.manager.canEmploy(slave),
		(slave) => App.UI.DOM.passageLink(SlaveFullName(slave), passage,
			() => {
				assignJob(slave, facility.manager.desc.assignment);
			}),
		slave => facility.manager.slaveHasExperience(slave),
		note);
};
