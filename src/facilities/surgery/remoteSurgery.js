/** @param {App.Entity.SlaveState} slave */
App.UI.SlaveInteract.remoteSurgery = function(slave) {
	const el = new DocumentFragment();
	const {His} = getPronouns(slave);
	updateHealth(slave);

	V.surgeryType = 0;
	App.UI.StoryCaption.encyclopedia = "The Remote Surgery";
	/* get all prosthetics that are ready for this slave */
	if (V.adjustProstheticsCompleted > 0) {
		V.adjustProsthetics = V.adjustProsthetics.filter(function(p) {
			if (p.workLeft <= 0 && p.slaveID === slave.ID) {
				addProsthetic(slave, p.id);
				V.adjustProstheticsCompleted--;
				return false;
			}
			return true;
		});
	}

	App.UI.DOM.appendNewElement("h1", el, "The Remote Surgery");

	const introP = document.createElement("p");
	introP.classList.add("scene-intro");
	App.Events.addNode(introP, intro());
	el.append(introP);

	if (slave.indentureRestrictions >= 1) {
		App.UI.DOM.appendNewElement("p", el, `${His} indenture forbids elective surgery`, ["yellow", "note"]);
	}

	const tabsDiv = document.createElement("div");
	tabsDiv.append(renderTabs());
	el.append(tabsDiv);

	return el;

	/**
	 * @returns {Array<string|HTMLElement>}
	 */
	function intro() {
		const r = [];
		r.push(`${slave.slaveName} is lying strapped down on the table in your`);
		if (V.surgeryUpgrade === 1) {
			r.push(`heavily upgraded and customized`);
		}
		r.push(`remote surgery. The surgical equipment reads`);
		if (slave.health.health < -20) {
			r.push(App.UI.DOM.makeElement("span", `SLAVE UNHEALTHY, SURGERY NOT RECOMMENDED.`, "red"));
		} else if (slave.health.health <= 20) {
			r.push(App.UI.DOM.makeElement("span", `SLAVE HEALTHY, SURGERY SAFE.`, "yellow"));
		} else {
			r.push(App.UI.DOM.makeElement("span", `SLAVE HEALTHY, SURGERY ENCOURAGED.`, "green"));
		}
		if (V.PC.skill.medicine >= 100) {
			r.push(`The remote surgery mechanisms that allow a surgeon to be brought in by telepresence are inactive, and the autosurgery is ready for your control inputs. Surgery on your slaves is a challenge and a pleasure you wouldn't dream of sharing.`);
		}
		return r;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function renderTabs() {
		const tabBar = new App.UI.Tabs.TabBar("RemoteSurgery");
		const f = new DocumentFragment();
		App.Events.drawEventArt(f, slave);
		tabBar.customNode = f;

		tabBar.addTab("Hair and Face", "hairAndFace", App.UI.surgeryPassageHairAndFace(slave, refresh));
		tabBar.addTab("Upper", "upper", App.UI.surgeryPassageUpper(slave, refresh));
		tabBar.addTab("Lower", "lower", App.UI.surgeryPassageLower(slave, refresh));
		tabBar.addTab("Structural", "structural", App.UI.surgeryPassageStructural(slave, refresh));
		tabBar.addTab("Exotic", "exotic", App.UI.surgeryPassageExotic(slave, refresh));
		if (V.seeExtreme) {
			tabBar.addTab("Extreme", "extreme", App.UI.surgeryPassageExtreme(slave, refresh));
		}
		return tabBar.render();
	}

	function refresh() {
		$(introP).empty();
		App.Events.addNode(introP, intro());
		App.UI.DOM.replace(tabsDiv, renderTabs());
	}
};
