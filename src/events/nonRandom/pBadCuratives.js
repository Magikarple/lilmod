App.Events.pBadCuratives = class pBadCuratives extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	actorPrerequisites() {
		return [[
			(s) => { return s.curatives > 1 || s.inflationType === "curative"; }
		]];
	}

	eventPrerequisites() {
		return [
			() => V.plot === 1,
			() => V.badC !== 1,
			() => App.Events.effectiveWeek() >= 14
		];
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {He, him} = getPronouns(slave);

		cashX(500 * V.slaves.length, "event");
		V.badC = 1;
		let r = [];
		r.push(`Early one morning, you hear convulsive dry heaving coming from one of the bathrooms. On investigation, it seems that ${slave.slaveName} woke up feeling terribly nauseous. ${He}'s in no danger, but you've hardly checked ${him} over before more slaves stagger in. Every one of your slaves on curatives has been struck by the mysterious malady and has <span class="health dec">sickened.</span>`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It doesn't take much investigation before you find other slaveowners reporting the same thing. Elementary detective work fingers a particular drug supplier as the culprit, and before long the unfortunate pharmaceutical concern is drowning under a rain of harsh public comment and harsher private contract warfare. As the day wears on, the poor slaves feel a bit better, but begin to report discomfort in their breasts. Apparently the problem has to do with contamination of the curative production line with A-HGH production reactants.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The firm promptly pays <span class="cash inc">fair compensation</span> for the minor damage to your slaves' health. However, you're left with the matter of the boobs to deal with. Over the week, all your slaves on curatives experience at least a little <span class="change positive">breast growth,</span> and some gain several cup sizes.${(V.boughtItem.toys.medicalEnema === 1) ? ` Those with bellies full of curative mixture, on the other hand, have not stopped growing yet and won't until they've completely absorb their load. They will likely end up <span class="change positive">sporting enormous tits</span> by the end of this.` : ``}`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Free breast growth is acceptable`, freeGrowth),
			new App.Events.Result(`Demand further compensation`, wantMoney),
			new App.Events.Result(`Force surgical repairs`, repair),
		]);

		return node;

		function freeGrowth() {
			for (const s of V.slaves) {
				if (s.curatives > 1) {
					if (s.geneMods.NCS > 0) {
						s.boobs += Math.floor(Math.random() * 10 + 1) * 50;
					} else {
						s.boobs += Math.floor(Math.random() * 10 + 1) * 100;
					}
				}
				if (s.inflationType === "curative") {
					if (s.geneMods.NCS > 0) {
						s.boobs += Math.floor(Math.random() * 10 + 1) * 150 * s.inflation;
					} else {
						s.boobs += Math.floor(Math.random() * 10 + 1) * 300 * s.inflation;
					}
				}
				if (s.geneticQuirks.macromastia === 3) {
					s.geneticQuirks.macromastia = 2;
				}
				if (s.geneticQuirks.gigantomastia === 3) {
					s.geneticQuirks.gigantomastia = 2;
				}
			}
			return `Since you're not displeased with the breast expansion, you accept the health compensation and even make discreet inquiries to see of the effect can perhaps be replicated. Unfortunately, it seems that the result that occurred was as much due to luck as anything else. The process cannot be safely marketed.`;
		}

		function wantMoney() {
			cashX(500 * V.slaves.length, "event");
			return `You muster all the contractual remedies available to you and join the crowd of slaveowners laying into the hapless manufacturer. Of course, with so many attackers, there is as much infighting between them as conflict with the helpless enemy, since everyone knows the business will go bankrupt before everyone gets paid. Nevertheless you <span class="cash inc">approximately double</span> the money you make out of the situation.`;
		}

		function repair() {
			return `The hapless manufacturer eventually goes bankrupt. However, you do manage to force surgical repair of the breast expansion before they do. At the manager's expense, your slaves move through a top-flight surgeon's care and are reduced to their former sizes.`;
		}
	}
};
