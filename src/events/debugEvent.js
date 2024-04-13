/**
 * @param {string} eventName
 * @param {string} hostPassage
 * @returns {DocumentFragment}
 */
App.Events.debugEvent = function(eventName, hostPassage) {
	const frag = document.createDocumentFragment();
	/** @type {App.Events.BaseEvent} */
	const event = eval(`new ${eventName}`);
	let displayOnlyValid = false;

	function makeCastList() {
		const cast = document.createDocumentFragment();
		const actorRequirements = event.actorPrerequisites();
		let missingCast = false;
		for (let i = 0; i < actorRequirements.length; ++i) {
			if (!event.actors[i]) {
				missingCast = true;
			}
		}
		if (!missingCast) {
			App.UI.DOM.appendNewElement("div", cast, App.UI.DOM.link('Run event now', (evt) => { V.event = evt; }, [event], hostPassage));
		} else {
			App.UI.DOM.appendNewElement("div", cast, "All actors must be cast to run event.", "note");
		}
		return cast;
	}

	function makeActorList() {
		const actors = document.createDocumentFragment();
		const actorRequirements = event.actorPrerequisites();
		if (actorRequirements.length > 0) {
			const tabBar = new App.UI.Tabs.TabBar("Options");
			for (let i = 0; i < actorRequirements.length; ++i) {
				tabBar.addTab(`Actor ${i}: ${event.actors[i] ? SlaveFullName(getSlave(event.actors[i])) : 'not yet cast'}`, `actor${i}`, singleActorList(i));
			}
			actors.append(tabBar.render());
		}

		return actors;

		function singleActorList(i) {
			let tab = App.UI.DOM.makeElement("div");
			if (!displayOnlyValid) {
				App.UI.DOM.appendNewElement("div", tab, App.UI.DOM.link(
					"Show only valid slaves",
					() => {
						displayOnlyValid = true;
						$('#actorList').empty().append(makeActorList());
					}
				));
			} else {
				App.UI.DOM.appendNewElement("div", tab, App.UI.DOM.link(
					"Show all slaves",
					() => {
						displayOnlyValid = false;
						$('#actorList').empty().append(makeActorList());
					}
				));
			}
			for (const slave of V.slaves) {
				let slaveDiv = App.UI.DOM.makeElement("div", App.UI.DOM.makeElement("span", SlaveFullName(slave), "slave-name"));
				let slaveFails = false;
				for (const p of actorRequirements[i]) {
					let passed = testPredicate(slaveDiv, p, slave);
					slaveFails = slaveFails || !passed;
					App.UI.DOM.appendNewElement("div", slaveDiv, p.name || p.toString(), [passed ? "green" : "red", "indent"]);
				}
				if (event.actors.includes(slave.ID)) {
					App.UI.DOM.appendNewElement("div", slaveDiv, App.UI.DOM.link("Remove this slave", removeCasted, [slave]), "indent");
				} else if (!slaveFails) {
					App.UI.DOM.appendNewElement("div", slaveDiv, App.UI.DOM.link("Choose this slave", castSlave, [slave, i]), "indent");
				} else if (displayOnlyValid) { // Filter out slaves that are not valid
					continue;
				}
				App.UI.DOM.appendNewElement("hr", tab);
				tab.append(slaveDiv);
			}
			return tab;
		}
	}

	function castSlave(slave, index) {
		event.actors[index] = slave.ID;
		$('#castList').empty().append(makeCastList());
		$('#actorList').empty().append(makeActorList());
	}

	function removeCasted(slave) {
		event.actors.delete(slave.ID);
		$('#castList').empty().append(makeCastList());
		$('#actorList').empty().append(makeActorList());
	}

	function testPredicate(outDiv, p, ...args) {
		let passed = false;
		try {
			passed = p(...args);
		} catch (ex) {
			App.UI.DOM.appendNewElement("div", outDiv, p.name || p.toString() + ": Exception: " + ex.toString(), "major-warning");
		}
		return passed;
	}

	const prereqs = App.UI.DOM.appendNewElement("div", frag);
	App.UI.DOM.appendNewElement("span", prereqs, `${eventName} - Global Prerequisites:`, "note");
	if (event instanceof App.Events.BaseEvent) {
		let anyFailed = false;
		for (const p of event.eventPrerequisites()) {
			let passed = testPredicate(prereqs, p);
			anyFailed = anyFailed || !passed;
			App.UI.DOM.appendNewElement("div", prereqs, p.name || p.toString(), passed ? "green" : "red");
		}
		if (!anyFailed) { // actor casting
			App.UI.DOM.appendNewElement("div", frag, "All global prerequisites passed, proceeding to casting...", "green");
			App.UI.DOM.appendNewElement("hr", frag);
			const castList = App.UI.DOM.appendNewElement("div", frag, makeCastList());
			castList.id = "castList";
			App.UI.DOM.appendNewElement("hr", frag);
			const actorList = App.UI.DOM.appendNewElement("div", frag, makeActorList());
			actorList.id = "actorList";
		}
	} else {
		App.UI.DOM.appendNewElement("div", prereqs, "Specified name does not resolve to an event.", "major-warning");
	}
	return frag;
};

/** @param {string} hostPassage */
App.Events.renderEventDebugger = function(hostPassage) {
	const frag = document.createDocumentFragment();
	const resultDiv = document.createElement("div");

	const div = App.UI.DOM.appendNewElement("div", frag, "Or enter a fully qualified event name to debug a specific unlisted JS event:", "event-section");
	App.UI.DOM.appendNewElement("br", div);
	const text = App.UI.DOM.appendNewElement("input", div);
	text.type = "text";
	div.append(App.UI.DOM.link("Check Prerequisites and Casting", () => $(resultDiv).empty().append(App.Events.debugEvent(text.value, hostPassage))));
	App.UI.DOM.appendNewElement("br", div);
	App.UI.DOM.appendNewElement("span", div, `(for example, "App.Events.RESSMuscles")`, "note");

	frag.append(resultDiv);
	return frag;
};
