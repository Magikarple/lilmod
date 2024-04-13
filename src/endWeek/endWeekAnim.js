App.UI.EndWeekAnim = (function() {
	let loadLockID = -1;
	let infoDiv = null;

	function makeInfoDiv() {
		infoDiv = $(`
			<div class="endweek-titleblock">
				<div class="endweek-maintitle">Processing week ${V.week}...</div>
				<div class="endweek-subtitle">${V.arcologies[0].name} | ${V.slaves.length} slaves</div>
			</div>
		`);
	}

	function start() {
		if (loadLockID === -1) {
			makeInfoDiv();
			$("#init-screen").append(infoDiv);
			loadLockID = LoadScreen.lock();
		}
	}

	function end() {
		if (loadLockID !== -1) {
			setTimeout(() => {
				LoadScreen.unlock(loadLockID);
				infoDiv.remove();
				infoDiv = null;
				loadLockID = -1;
			}, 0);
		}
	}

	return {
		start,
		end
	};
})();
