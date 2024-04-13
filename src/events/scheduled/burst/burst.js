App.Events.SEBurst = class SEBurst extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	/** Custom casting: all bursting slaves are cast automatically. If no slaves are cast, casting fails and the event does not run. */
	castActors() {
		this.actors = V.slaves.filter(s => burstCheck(s)).map(s => s.ID);
		return this.actors.length > 0;
	}

	execute(node) {
		const artRenderer = V.seeImages && V.seeReportImages ? new App.Art.SlaveArtBatch(this.actors, 2, 0) : null;
		if (artRenderer) {
			node.append(artRenderer.writePreamble());
		}

		for (const slave of this.actors.map(id => getSlave(id))) {
			if (slave.womb.length > 0) {
				node.append(birth(slave, {artRenderer}));
			} else if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
				node.append(torture(slave));
			} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true)) {
				node.append(ravish(slave));
			} else {
				node.append(pop(slave));
			}
			removeSlave(slave);
			node.append(sectionBreak());
		}

		/**
		 *
		 * @param {App.Entity.SlaveState} slave
		 * @returns {DocumentFragment}
		 */
		function pop(slave) {
			const el = new DocumentFragment();
			const r = [];
			const {
				He, His,
				he, his, him
			} = getPronouns(slave);
			if (artRenderer) {
				App.UI.DOM.drawOneSlaveRight(el, slave, artRenderer);
			}
			r.push(`As ${slave.slaveName} is going about ${his} business with ${his} overfilled`);
			if (slave.inflation !== 0) {
				r.push(slave.inflationType);
			}
			r.push(`belly, ${he} can't help but feel exhausted. ${His} health has been poor lately and the pressure in ${his} organs is not helping things. ${He} immediately knows something is wrong when an intense pain runs through ${his} middle and ${his} load shifts threateningly.`);
			if (slave.inflation !== 0) {
				r.push(`Blood and ${slave.inflationType} leak`);
			} else {
				r.push(`Blood leaks`);
			}
			r.push(`from ${his} rear as ${his} body cavity fills with the contents of ${his} digestive tract. The skin of ${his} taut belly reddens as the pressure against it builds. As ${he} takes ${his} last breath, ${he} falls forward, ${his} weight landing upon ${his} straining stomach. With a gush, ${he} ruptures, flooding the area around ${him} with`);
			if (slave.inflation !== 0) {
				r.push(`blood, guts and ${slave.inflationType}.`);
			} else {
				r.push(`blood and guts.`);
			}
			el.append(r.join(" "));
			el.append(horrifiedSlaves(slave));
			return el;
		}

		/**
		 *
		 * @param {App.Entity.SlaveState} slave
		 * @returns {DocumentFragment}
		 */
		function torture(slave) {
			const el = new DocumentFragment();
			const r = [];
			const {
				he, his, him
			} = getPronouns(slave);
			if (artRenderer) {
				App.UI.DOM.drawOneSlaveRight(el, slave, artRenderer);
			}
			r.push(`${slave.slaveName}'s belly is positively bursting`);
			if (slave.inflation !== 0) {
				r.push(`with ${slave.inflationType},`);
			} else {
				r.push(`as is,`);
			}
			r.push(`so it's extra fun to punch and strike at it to see ${his} pained reactions. You land a solid blow to ${his} straining gut and, like the world's worst piñata, ${he} bursts, showering the area around ${him} with`);
			if (slave.inflation !== 0) {
				r.push(`blood, guts and ${slave.inflationType}.`);
			} else {
				r.push(`blood and guts.`);
			}
			r.push(`It seems you'll need a new toy to play with.`);
			el.append(r.join(" "));
			el.append(horrifiedSlaves(slave));
			return el;
		}

		/**
		 *
		 * @param {App.Entity.SlaveState} slave
		 * @returns {DocumentFragment}
		 */
		function ravish(slave) {
			const el = new DocumentFragment();
			const r = [];
			const {
				he, his, him
			} = getPronouns(slave);
			if (artRenderer) {
				App.UI.DOM.drawOneSlaveRight(el, slave, artRenderer);
			}
			r.push(`Fucking ${slave.slaveName} with ${his} overfilled`);
			if (slave.inflation !== 0) {
				r.push(slave.inflationType);
			}
			r.push(`belly bouncing around every which way is a blast, though ${he} begins to wince and groan more than usual as the week nears its end. As you finish up a particularly intense`);
			if (canAchieveErection(V.PC)) {
				r.push(`session by blowing a huge load into ${him}, you notice ${his} belly slowly starting to swell. As you ponder this development with a few extra thrusts to get out that last bit of cum, ${his} middle bursts beneath you, sending you crashing onto ${his} lifeless body from the sudden shift and into a pool of`);
				if (slave.inflation !== 0) {
					r.push(`blood, guts and ${slave.inflationType}.`);
				} else {
					r.push(`blood and guts.`);
				}
				r.push(`That was not what you expected to happen, and you probably shouldn't keep humping what's left of ${him} instead of cleaning up.`);
			} else {
				r.push(`session, you can't help but notice ${his} belly slowly starting to swell; an oddity, given you aren't unloading anything into ${him}. You ponder this development as you shift ${him} into a favorable position for another round, only to have ${his} middle burst on top of you, covering you with a deluge of`);
				if (slave.inflation !== 0) {
					r.push(`blood, guts and ${slave.inflationType}.`);
				} else {
					r.push(`blood and guts.`);
				}
				r.push(`You lay there, stunned and holding ${his} corpse upright over you, dumbfounded by what just happened.`);
			}
			el.append(r.join(" "));
			el.append(horrifiedSlaves(slave));
			return el;
		}

		function sectionBreak() {
			const hr = document.createElement("hr");
			hr.style.margin = "0";
			return hr;
		}
	}
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLElement}
 */
globalThis.horrifiedSlaves = function(slave) {
	const el = document.createElement("p");
	const {his} = getPronouns(slave);
	el.append(`Word of the late slave and ${his} gruesome fate spread fast, `);
	App.UI.DOM.appendNewElement("span", el, "terrifying", "gold");
	el.append(` your untrusting slaves.`);
	for (const bystander of V.slaves) {
		if (bystander.trust <= 50) {
			if (slave.inflation > 0) {
				bystander.trust -= (Math.pow(slave.inflation, 3) * 5);
			} else {
				bystander.trust -= 10;
			}
		}
	}
	return el;
};
