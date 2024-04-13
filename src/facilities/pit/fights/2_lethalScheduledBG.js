/** Lethal 1v1 between the BG and a random slave. */
App.Facilities.Pit.Fights.LSchBg1v1 = class extends App.Facilities.Pit.Fights.LBg1v1 {
	fightDescription() {
		const f = new DocumentFragment();
		f.append("Scheduled: 1-vs-1 fight between your bodyguard ", App.UI.DOM.slaveDescriptionDialog(getSlave(this.actors[0])), ` and `,
			contextualIntro(getSlave(this.actors[0]), getSlave(this.actors[1]), true), ".");
		return f;
	}

	fightPrerequisites() {
		return [() => V.pit.slaveFightingBodyguard !== null, ...super.fightPrerequisites()];
	}

	forcedActors() {
		return [...super.forcedActors(), V.pit.slaveFightingBodyguard];
	}

	actorPrerequisites() {
		return [];
	}

	execute(node) {
		V.pit.slaveFightingBodyguard = null;
		return super.execute(node);
	}

	introCombatants(slave1, slave2) {
		const {his1} = getPronouns(slave1).appendSuffix("1");
		return [`In this scheduled fight your bodyguard`, App.UI.DOM.slaveDescriptionDialog(slave1),
			`will demonstrate ${his1} combat prowess on`,
			App.UI.DOM.combineNodes(contextualIntro(slave1, slave2, true), ".")];
	}
};
