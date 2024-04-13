App.UI.GlobalTooltips = (function() {
	let instances = [];

	const tooltips = new Map([
		[".exampleTooltip", "I am a helpful tooltip. We are very rare because we are still in development."],

		[".devotion", "Devotion is a measure of a slave's love for you."],
		[".trust", "Trust is a measure of a slave's expectations of you and confidence to perform well."],
		[".defiant", "Defiant slaves will actively work against you."],

		[".flaw", "Flaws impend your slaves performance. Try removing or converting them into quirks."],
		[".intelligent", "More intelligent slaves tend to perform better."],
		[".stupid", "More intelligent slaves tend to perform better."],
		[".health", "The healthier your slaves, the better they perform."],
		[".libido", "Sex drive has various effects, generally higher is better."],
		[".positive", "This is good."],
		[".warning", "This is very bad. Try removing the cause for this."],

		[".error", "Something just broke. Please report this."],

		[".cash", "Money. Always useful."],
		[".reputation", "Your reputation as a slave owner. The higher, the better."],
	]);

	function enable() {
		disable();
		instances = [];
		for (const [identifier, tooltip] of tooltips.entries()) {
			instances.push(tippy.delegate(document.body, {
				target: identifier,
				content: tooltip
			}));
		}
	}

	function disable() {
		for (const instance of instances) {
			instance.destroy();
		}
		instances = [];
	}

	function update() {
		if (V.tooltipsEnabled === 1) {
			enable();
		} else {
			disable();
		}
	}

	return {update: update};
})();
