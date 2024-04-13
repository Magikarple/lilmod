/** Nonlethal 1v1 between the BG and a random slave. */
App.Facilities.Pit.Fights.NlSch1v1 = class extends App.Facilities.Pit.Fights.NlR1v1 {
	fightDescription() {
		const f = new DocumentFragment();
		f.append("Scheduled: 1-vs-1 fight between ", App.UI.DOM.slaveDescriptionDialog(getSlave(this.actors[0])), ` and `,
			contextualIntro(getSlave(this.actors[0]), getSlave(this.actors[1]), true), ".");
		return f;
	}

	fightPrerequisites() {
		return [...super.fightPrerequisites(), () => V.pit.slavesFighting !== null];
	}

	forcedActors() {
		return [V.pit.slavesFighting[0], V.pit.slavesFighting[1]];
	}

	actorPrerequisites() {
		return [];
	}
	execute(node) {
		V.pit.slavesFighting = null;
		return super.execute(node);
	}
};
