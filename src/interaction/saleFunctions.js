/** @param {App.Entity.SlaveState} slave */
App.Interact.Sale.separationReactions = function(slave) {
	const {sister, daughter, father, mother} = getPronouns(slave);
	const resultNode = document.createDocumentFragment();
	for (const s of V.slaves) {
		const {his2} = getPronouns(s).appendSuffix("2");
		if (slave.mother === s.ID) {
			App.Events.addNode(resultNode, [`${s.slaveName} is <span class="devotion dec">grieved</span> that you are selling ${his2} ${daughter}.`], "div");
			s.devotion -= 20;
		}
		if (slave.father === s.ID) {
			App.Events.addNode(resultNode, [`${s.slaveName} is <span class="devotion dec">disappointed</span> that you are selling ${his2} ${daughter}.`], "div");
			s.devotion -= 10;
		}
		if (slave.ID === s.father) {
			App.Events.addNode(resultNode, [`${s.slaveName} is <span class="devotion dec">saddened</span> that you are selling ${his2} ${father}.`], "div");
			s.devotion -= 10;
		}
		if (slave.ID === s.mother) {
			App.Events.addNode(resultNode, [`${s.slaveName} is <span class="devotion dec">grieved</span> that you are selling ${his2} ${mother}.`], "div");
			s.devotion -= 20;
		}
		switch (areSisters(slave, s)) {
			case 1:
				App.Events.addNode(resultNode, [`${s.slaveName} is <span class="devotion dec">devastated</span> that you are selling ${his2} twin.`], "div");
				s.devotion -= 30;
				break;
			case 2:
				App.Events.addNode(resultNode, [`${s.slaveName} is <span class="devotion dec">grieved</span> that you are selling ${his2} ${sister}.`], "div");
				s.devotion -= 20;
				break;
			case 3:
				App.Events.addNode(resultNode, [`${s.slaveName} is <span class="devotion dec">disheartened</span> that you are selling ${his2} half-${sister}.`], "div");
				s.devotion -= 10;
				break;
		}
	}
	if (slave.relationship > 0) {
		const rel = getSlave(slave.relationshipTarget);
		if (rel && rel.fetish !== Fetish.MINDBROKEN) {
			const {his2} = getPronouns(rel).appendSuffix("2");
			App.Events.addParagraph(resultNode, [`${rel.slaveName} is <span class="devotion dec">grieved</span> that you are selling ${his2} best source of comfort and companionship in a life of bondage.`]);
			rel.devotion -= rel.relationship*10;
		}
	} else if (slave.relationship === -3) {
		App.Events.addParagraph(resultNode, [`Selling one of your slave wives is <span class="reputation dec">socially unacceptable.</span> In addition, your other devoted slaves are <span class="trust dec">worried</span> that you may not respect their status.`]);
		repX(-200, "slaveTransfer");
		for (const s of V.slaves) {
			if (s.devotion > 50) {
				s.trust -= 5;
			}
		}
	}
	if (slave.rivalry !== 0) {
		const riv = getSlave(slave.rivalryTarget);
		if (riv && riv.fetish !== Fetish.MINDBROKEN) {
			const {he2, his2} = getPronouns(riv).appendSuffix("2");
			App.Events.addParagraph(resultNode, [`${riv.slaveName} is <span class="devotion inc">pleased</span> that ${he2} won't have to see ${his2} rival any more.`]);
			riv.devotion += riv.rivalry*3;
		}
	}
	if (isShelterSlave(slave)) {
		V.shelterAbuse += 1;
	}
	return resultNode;
};
