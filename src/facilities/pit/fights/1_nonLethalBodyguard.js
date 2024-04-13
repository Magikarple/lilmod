/** Nonlethal 1v1 between the BG and a random slave. */
App.Facilities.Pit.Fights.NlBg1v1 = class extends App.Facilities.Pit.Fights.NlR1v1 {
	fightDescription() {
		const f = new DocumentFragment();
		f.append("1-vs-1 fight between your bodyguard ", App.UI.DOM.slaveDescriptionDialog(getSlave(this.actors[0])), ` and `,
			contextualIntro(getSlave(this.actors[0]), getSlave(this.actors[1]), true), ".");
		return f;
	}

	get impact() {
		return super.impact * 1.1;
	}

	fightPrerequisites() {
		return [...super.fightPrerequisites(), () => !!S.Bodyguard];
	}

	forcedActors() {
		return [S.Bodyguard.ID];
	}

	actorPrerequisites() {
		return [
			[]
		];
	}

	introCombatants(slave1, slave2) {
		const {his1} = getPronouns(slave1).appendSuffix("1");
		return [`In this fight your bodyguard`, App.UI.DOM.slaveDescriptionDialog(slave1),
			`will demonstrate ${his1} combat prowess on`,
			App.UI.DOM.combineNodes(contextualIntro(slave1, slave2, true), ".")];
	}
};
