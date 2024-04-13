/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.rulesAssistantReport = function() {
	const frag = $(document.createDocumentFragment());
	const lines = [];
	for (const slave of V.slaves) {
		if (slave.useRulesAssistant === 1) {
			try {
				lines.push(DefaultRules(slave));
			} catch (e) {
				console.log("Exception thrown in rule evaluation:", slave, e);
				lines.push(`<p><span class="error">Exception thrown executing Rules Assistant for ${SlaveFullName(slave)}: "${e.message}". One of your rules is probably broken.</span></p>`);
			}
		}
	}
	if (V.experimental.raSortOutput === 1) {
		// We destroy <br> formatting and treat all lines as sortable, output is a-z sorted.
		lines
		  .flatMap((line) => line.split('<br>')) // Split <br> as well
		  .filter((line) => line.trim() !== '') // Remove empty lines
		  .sort() // Sort
		  .forEach((line) => { frag.append(`${line}<br>`); }); // Re-assemble
	} else {
		// Don't do anything, default as-is output.
		lines.forEach((line)=>{ frag.append(line); });
	}
	return {
		before: frag[0],
		slaves: [],
		after: new DocumentFragment(),
	};
};
