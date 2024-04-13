/** @file This is injected into FC to allow the watchers live reload functionality */

const liveReloadUrl = "http://localhost:16969";

function checkForLiveReload() {
	try {
		$.getJSON(liveReloadUrl, function(data) {
			if (data !== undefined && "needsReloaded" in data && data["needsReloaded"] === true) {
				// reload
				location.reload();
			}
		});
	} catch (e) {
		// fail silently
		// this can happen for many reasons. The main one being that the server has been closed while FC has been left open
	}
}

// query server every 2 seconds and see if we need to reload
window.setInterval(checkForLiveReload, 2000);
