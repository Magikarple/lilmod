/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} links
 * @returns {Array<string|HTMLElement|DocumentFragment>}
 */
App.Desc.relationRival = function(slave, links) {
	const r = [];
	const {
		his, He
	} = getPronouns(slave);

	r.push(...relative());
	r.push(...rival());

	return r;

	/**
	 * @returns {Array<string|HTMLElement>}
	 */
	function relative() {
		if (slave.relationship >= 3 && totalRelatives(slave) > 0) {
			const lover = getSlave(slave.relationshipTarget);
			if (lover) {
				const term = relativeTerm(slave, lover);
				if (term !== null) {
					const s = [];
					s.push(`${He} is in an`);
					const span = App.UI.DOM.makeElement("span", `incestuous relationship with ${his} ${term}, `, ["si-family"]);
					span.append(slaveReference(lover), ".");
					s.push(span);
					return s;
				}
			}
		} else if (slave.relationship <= -2) {
			const term = relativeTerm(slave, V.PC);
			if (term !== null) {
				return [`${He} is in an <span class="si-family">incestuous relationship with ${his} ${term}, you.</span>`];
			}
		}
		return [];
	}

	/**
	 * @returns {Array<string|HTMLElement|DocumentFragment>}
	 */
	function rival() {
		if (slave.rivalry !== 0) {
			const rival = getSlave(slave.rivalryTarget);
			if (rival) {
				if (slave.rivalry <= 1) {
					return [`${He} <span class="si-rival">dislikes</span>`, App.UI.DOM.combineNodes(slaveReference(rival), `.`)];
				} else if (slave.rivalry <= 2) {
					return [`${He} is`, App.UI.DOM.combineNodes(slaveReference(rival), `'s`), `<span class="si-rival">rival.</span>`];
				} else {
					return [`${He} <span class="si-rival">bitterly hates</span>`, App.UI.DOM.combineNodes(slaveReference(rival), `.`)];
				}
			}
		}
		return [];
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string|HTMLSpanElement}
	 */
	function slaveReference(slave) {
		if (links) {
			return App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave));
		} else {
			return SlaveFullName(slave);
		}
	}
};

