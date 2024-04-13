App.UI.SlaveInteract.mainPage = function(slave) {
	const el = new DocumentFragment();

	if (!assignmentVisible(slave)) {
		switch (slave.assignment) {
			case "work in the brothel":
			case "be the Madam":
				V.nextLink = "Brothel";
				break;
			case "be confined in the arcade":
				V.nextLink = "Arcade";
				break;
			case "serve in the club":
			case "be the DJ":
				V.nextLink = "Club";
				break;
			case "work in the dairy":
			case "be the Milkmaid":
				V.nextLink = "Dairy";
				break;
			case "work as a farmhand":
			case "be the Farmer":
				V.nextLink = "Farmyard";
				break;
			case "rest in the spa":
			case "be the Attendant":
				V.nextLink = "Spa";
				break;
			case "work as a nanny":
			case "be the Matron":
				V.nextLink = "Nursery";
				break;
			case "learn in the schoolroom":
			case "be the Schoolteacher":
				V.nextLink = "Schoolroom";
				break;
			case "work as a servant":
			case "be the Stewardess":
				V.nextLink = "Servants' Quarters";
				break;
			case "serve in the master suite":
			case "be your Concubine":
				V.nextLink = "Master Suite";
				break;
			case "be confined in the cellblock":
			case "be the Wardeness":
				V.nextLink = "Cellblock";
				break;
			case "get treatment in the clinic":
			case "be the Nurse":
				V.nextLink = "Clinic";
				break;
			case "live with your Head Girl":
				V.nextLink = "Head Girl Suite";
				break;
			case "be your agent":
			case "live with your agent":
				V.nextLink = "Neighbor Interact";
		}
	}

	App.UI.StoryCaption.encyclopedia = either("Costs Summary", "Disease in the Free Cities", "Drugs and Their Effects", "From Rebellious to Devoted", "Gender", "Modern Anal", "Nymphomania", "Slave Couture");
	if (slave.dick > 0) {
		App.UI.StoryCaption.encyclopedia = "Gender";
	}
	App.Utils.scheduleSidebarRefresh();

	el.append(App.UI.SlaveInteract.navigation(slave));

	/**
	 * @typedef {object} siCategory
	 * @property {string} title
	 * @property {string} id
	 * @property {DocumentFragment|HTMLElement} node
	 */

	/** @type {Array<siCategory>} */
	const tabs = [
		{
			title: "Description",
			id: "description",
			get node() { return App.UI.SlaveInteract.description(slave); }
		},
		{
			title: "Modify",
			id: "modify",
			get node() { return App.UI.SlaveInteract.modify(slave); }
		},
		{
			title: "Work",
			id: "work",
			get node() { return App.UI.SlaveInteract.work(slave, refresh); }
		},
		{
			title: "Appearance",
			id: "appearance",
			get node() { return App.UI.SlaveInteract.wardrobe(slave, refresh); }
		},
		{
			title: "Physical Regimen",
			id: "physical-regimen",
			get node() { return App.UI.SlaveInteract.physicalRegimen(slave, refresh); }
		},
		{
			title: "Rules",
			id: "rules",
			get node() { return App.UI.SlaveInteract.rules(slave, refresh); }
		},
		{
			title: "Records",
			id: "records",
			get node() { return App.UI.SlaveInteract.records(slave, refresh); }
		},
		{
			title: "Customize",
			id: "customize",
			get node() { return App.UI.SlaveInteract.custom(slave, refresh); }
		},
		{
			title: "Family",
			id: "family-tab",
			get node() { return App.UI.SlaveInteract.family(slave); }
		}
	];

	const contentHolder = document.createElement("span");
	contentHolder.append(content());
	el.append(contentHolder);

	return el;

	function content() {
		if (V.slaveInteractLongForm) {
			return displayWithoutTabs();
		} else {
			return displayWithTabs();
		}
	}

	function refresh() {
		jQuery(contentHolder).empty().append(content());
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function displayWithTabs() {
		const tabBar = new App.UI.Tabs.TabBar("SlaveInteract");
		const f = new DocumentFragment();
		App.Events.drawEventArt(f, slave);
		tabBar.customNode = f;

		for (const tab of tabs) {
			tabBar.addTab(tab.title, tab.id, tab.node);
		}
		return tabBar.render();
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function displayWithoutTabs() {
		const el = new DocumentFragment();
		App.Events.drawEventArt(el, slave);
		for (const tab of tabs) {
			App.UI.DOM.appendNewElement("h2", el, tab.title);
			el.append(tab.node);
		}
		return el;
	}
};
