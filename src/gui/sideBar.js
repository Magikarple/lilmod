/**
 * Notify the game that the sidebar needs to be refreshed as soon as possible, but do not do it immediately.
 * This allows us to call this function repeatedly without impacting performance (for example, from repX() and cashX()).
 * The game will redraw the sidebar exactly once, as soon as all the scripts have finished executing.
 */
App.Utils.scheduleSidebarRefresh = (function() {
	let refresh = false;

	function updateSidebar() {
		refresh = false;
		UIBar.update();
	}

	function schedule() {
		if (!refresh) {
			refresh = true;
			setTimeout(updateSidebar, 0);
		}
	}

	return schedule;
})();

App.Utils.userButton = function(nextButton = V.nextButton, nextLink = V.nextLink) {
	const el = document.createElement("span");
	el.id = "next-button-wrapper"; // We must always have a named element so we have something to refresh even if the button is hidden for a scene
	const pass = passage();
	let link;

	if (pass !== "End Week") {
		if (pass === "Main") {
			link = App.UI.DOM.link(
				"END WEEK",
				() => endWeek()
			);
			link.style.fontWeight = "bold";
			link.id = "endWeekButton";
			el.append(link);
			el.append(" ");
			App.UI.DOM.appendNewElement("span", el, App.UI.Hotkeys.hotkeys("endWeek"), ["hotkey"]);
		} else {
			if (nextButton !== " ") {
				link = App.UI.DOM.passageLink(
					nextButton,
					nextLink
				);
				link.style.fontWeight = "bold";
				link.id = "nextButton";
				el.append(link);
				el.append(" ");
				App.UI.DOM.appendNewElement("span", el, App.UI.Hotkeys.hotkeys("nextLink"), ["hotkey"]);
			}
		}
	}
	return el;
};

App.Utils.updateUserButton = function() {
	return jQuery("#next-button-wrapper").empty().append(App.Utils.userButton());
};
