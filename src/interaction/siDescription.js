App.UI.SlaveInteract.description = function(slave) {
	const el = new DocumentFragment();
	const descriptionLink = document.createElement("div");
	descriptionLink.style.fontStyle = "italic";
	descriptionLink.id = "description-link";

	if (V.seeDetails === 1) {
		const descriptionOptions = document.createElement("div");

		descriptionOptions.id = "description-options";
		el.append(descriptionOptions);

		el.append(App.Desc.longSlave(slave, {noArt: true, links: true}));

		descriptionLink.append(showOptions());
		el.append(descriptionLink);
	} else {
		descriptionLink.append(
			App.UI.DOM.link(
				"Show descriptions",
				() => {
					V.seeDetails = 1;
				},
				[],
				"Slave Interact"
			)
		);
		el.append(descriptionLink);
	}

	el.append(App.Reminders.slaveDisplay(slave.ID));

	return el;

	function showOptions() {
		return App.UI.DOM.link(
			"Description Options",
			() => {
				jQuery("#description-link").empty().append(hideOptions());
				jQuery("#description-options").empty().append(App.UI.descriptionOptions());
			}
		);
	}

	function hideOptions() {
		return App.UI.DOM.link(
			"Description Options",
			() => {
				jQuery("#description-link").empty().append(showOptions());
				jQuery("#description-options").empty().append();
			}
		);
	}
};
