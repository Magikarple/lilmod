App.UI.findSlave = function() {
	// When we open this for the first time - forget the previous search data
	App.UI.findSlave.searchData = null;
	App.UI.findSlave.searchName = null;

	const wrapper = document.createElement("div");
	wrapper.append(structure());
	return wrapper;

	function structure() {
		const node = new DocumentFragment();

		// App.UI.DOM.appendNewElement("h1", node, `Find slave`);

		App.UI.DOM.appendNewElement("p", node, `After spending a minute trying to remember some details about one of your slaves, you sit down behind your desk and tell ${V.assistant.name} that you need to locate a particular slave's records.`);

		App.UI.DOM.appendNewElement("p", node, `"Certainly, ${properMaster()}. What can you tell me about them?"`);

		// convert it into the array, if it's not (this will make this not backwards compatible though I think?
		if (!Array.isArray(V.findName)) { V.findName = [V.findName]; }
		if (!Array.isArray(V.findBackground)) { V.findBackground = [V.findBackground]; }
		if (!Array.isArray(V.findData)) { V.findData = [V.findData]; }

		// clean up empty values
		V.findName = V.findName.filter(function(element) { return !!element; });
		V.findBackground = V.findBackground.filter(function(element) { return !!element; });
		V.findData = V.findData.filter(function(element) { return !!element; });
		// by searching for empty variable - you clean up history, otherwise its kept

		// always have last element empty - so we can input something new and well... also limit it to 20 elements
		V.findName.push(""); if (V.findName.length > 20) { V.findName.length = 20; }
		V.findBackground.push(""); if (V.findBackground.length > 20) { V.findBackground.length = 20; }
		V.findData.push(""); if (V.findData.length > 20) { V.findData.length = 20; }

		function _findData(vArray, search) {
			let array = [];
			for (let i = 0; i < vArray.length; i++) {
				let textBox = App.UI.DOM.makeTextBox(vArray[i], v => vArray[i] = v);
				if (search === "searchByExpression") {
					textBox.style.width="60%";
				} // probably not the best, but personally for searchByExpression - we can do long expressions...
				array.push(`<br>`);
				array.push(textBox);
				array.push(
					App.UI.DOM.link(
						"Locate",
						// () => $(slaveList).empty().append(vFunc(vArray[i]))
						() => {
							App.UI.findSlave.searchName = search;
							App.UI.findSlave.searchData = vArray[i];
							refresh(); // tell us what search to perform
						}
					)
				);
			}
			return array;
		}
		App.Events.addParagraph(node, [
			`"They're called something like:`,
			..._findData(V.findName, "searchByName"),
			App.UI.DOM.makeElement("div", `(Enter a fragment of their nickname, name, surname, birth name, or birth surname)`, "note")
		]);

		App.Events.addParagraph(node, [
			`"In the past, they were:`,
			..._findData(V.findBackground, "searchByBackground"),
			App.UI.DOM.makeElement("div", `(Enter a fragment of their origin or past job, for example, "shelter" or "lawyer")`, "note")
		]);

		App.Events.addParagraph(node, [
			`"Their data should meet this condition:`,
			..._findData(V.findData, "searchByExpression"),
			App.UI.DOM.makeElement("div", `(Enter a conditional expression which evaluates to true for the slave you want to find, such as "slave.physicalAge >= 18 && slave.physicalAge < 21")`, "note")
		]);

		let slaveList;
		if (App.UI.findSlave.searchName !== undefined && App.UI.findSlave.searchName !== null && App.UI.findSlave.searchData !== undefined && App.UI.findSlave.searchData !== null) {
			switch (App.UI.findSlave.searchName) {
				case "searchByExpression":
					slaveList = App.UI.DOM.appendNewElement("span", node, searchByExpression(App.UI.findSlave.searchData));
					break;
				case "searchByBackground":
					slaveList = App.UI.DOM.appendNewElement("span", node, searchByBackground(App.UI.findSlave.searchData));
					break;
				case "searchByName":
					slaveList = App.UI.DOM.appendNewElement("span", node, searchByName(App.UI.findSlave.searchData));
					break;
			}
		} else {
			slaveList = App.UI.DOM.appendNewElement("span", node);
		}

		return node;
	}

	function refresh() {
		App.UI.DOM.replace(wrapper, structure());
	}

	/**
	 * Fragment searching: See if every needle can found somewhere in the field of haystacks
	 * @param {FC.Zeroable<string>[]} haystacks
	 * @param {RegExp[]} needles
	 * @returns {boolean}
	 */
	function _fragmentSearch(haystacks, needles) {
		const hs = haystacks.filter(h => !!h).join(" ");
		return needles.every((needle) => needle.test(hs));
	}

	/**
	 * Get slave ids which match a predicate
	 * @param {function(App.Entity.SlaveState): boolean} predicate
	 * @returns {number[]}
	 */
	 function _slaveIDs(predicate) {
		return V.slaves.reduce((acc, slave) => {
			if (predicate(createReadonlyProxy(slave))) {
				acc.push(slave.ID);
			}
			return acc;
		}, []);
	}

	/**
	 * Display a list of results, or text indicating that there were none
	 * @param {number[]} ids
	 * @param {DocumentFragment} frag
	 */
	function _appendResultList(ids, frag) {
		App.UI.DOM.appendNewElement("p", frag, `${ids.length} matching slave${ids.length === 1 ? `` : `s`}.`);
		if (ids.length !== 0) {
			frag.appendChild(App.UI.SlaveList.render(ids, [], App.UI.SlaveList.SlaveInteract.stdInteract));
		}
	}

	/**
	 * Generate a slave list as the result of fragment searching all the name-type fields
	 * @param {string} query
	 * @returns {DocumentFragment}
	 */
	function searchByName(query) {
		const frag = document.createDocumentFragment();
		if (query) {
			const resultTitle = App.UI.DOM.appendNewElement("p", frag, "Query results for name: ");
			App.UI.DOM.appendNewElement("code", resultTitle, query);
			const needles = query.split(" ").map((needle) => { return new RegExp(needle, "i"); });
			const ids = _slaveIDs((slave) => { return _fragmentSearch([slave.slaveName, slave.slaveSurname, slave.birthName, slave.birthSurname], needles); });
			_appendResultList(ids, frag);
		}
		return frag;
	}

	/**
	 * Generate a slave list as the result of fragment searching profession and origin
	 * @param {string} query
	 * @returns {DocumentFragment}
	 */
	function searchByBackground(query) {
		const frag = document.createDocumentFragment();
		if (query) {
			const resultTitle = App.UI.DOM.appendNewElement("p", frag, "Query results for background: ");
			App.UI.DOM.appendNewElement("code", resultTitle, query);
			const needles = query.split(" ").map((needle) => { return new RegExp(needle, "i"); });
			const ids = _slaveIDs((slave) => { return _fragmentSearch([slave.career, slave.origin], needles); });
			_appendResultList(ids, frag);
		}
		return frag;
	}

	/**
	 * Generate a slave list as the result of evaluating an expression
	 * @param {string} query
	 * @returns {DocumentFragment}
	 */
	function searchByExpression(query) {
		const frag = document.createDocumentFragment();
		if (query) {
			const resultTitle = App.UI.DOM.appendNewElement("p", frag, "Query results from expression: ");
			App.UI.DOM.appendNewElement("code", resultTitle, query);
			/** @type {function(App.Entity.SlaveState):boolean} */
			// @ts-ignore
			const pred = new Function("slave", "return (" + query + ");");
			const ids = runWithReadonlyProxy(() => { return _slaveIDs(pred); });
			_appendResultList(ids, frag);
		}
		return frag;
	}
};
