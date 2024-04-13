App.UI.SlaveInteract.huskSlaveSwap = function() {
	const node = new DocumentFragment();

	const target = getSlave(V.swappingSlave);
	const oldSlave = clone(target);
	const {
		he
	} = getPronouns(target);

	App.UI.DOM.appendNewElement("p", node, `You strap ${target.slaveName}, and the body to which ${he} will be transferred, into the remote surgery and stand back as it goes to work.`);
	bodySwap(target, V.activeSlave, false);
	const gps = V.genePool.find(s => s.ID === target.ID);
	// special exception to swap genePool since the temporary body lacks an entry. Otherwise we could just call bodySwap using the genePool entries
	gps.race = target.race;
	gps.origRace = target.origRace;
	gps.skin = target.skin;
	gps.markings = target.markings;
	gps.eye.origColor = target.eye.origColor;
	gps.origHColor = target.origHColor;
	gps.origSkin = target.origSkin;
	gps.face = target.face;
	gps.pubicHStyle = target.pubicHStyle;
	gps.underArmHStyle = target.underArmHStyle;
	gps.eyebrowHStyle = target.eyebrowHStyle;

	App.Events.addParagraph(node, [
		`After an honestly impressive procedure, ${target.slaveName} is recovering nicely.`,
		bodySwapReaction(target, oldSlave)
	]);

	const cost = slaveCost(oldSlave);
	const payout = Math.trunc(cost/3);
	let r = [];
	r.push(`${target.slaveName}'s old body was bought by the Flesh Heap for ${cashFormat(payout)}.`);
	if (target.bodySwap > 0) {
		const origBodyOwner = V.slaves.find(s => s.origBodyOwnerID === target.ID);
		if (origBodyOwner) {
			origBodyOwner.origBodyOwnerID = 0;
			const {
				he2, him2, his2
			} = getPronouns(origBodyOwner).appendSuffix("2");
			if (origBodyOwner.fetish !== Fetish.MINDBROKEN && origBodyOwner.fuckdoll === 0) {
				if (origBodyOwner.devotion > 20) {
					r.push(`${origBodyOwner.slaveName} is somewhat saddened to see ${his2} body leave forever.`);
				} else if (origBodyOwner.devotion >= -50) {
					r.push(`${origBodyOwner.slaveName} is <span class="mediumorchid">disturbed</span> to find ${his2} body is gone for good, damaging ${his2} <span class="gold">ability to trust you.</span>`);
					origBodyOwner.devotion -= 30;
					origBodyOwner.trust -= 30;
				} else {
					r.push(`${origBodyOwner.slaveName} is <span class="mediumorchid">deeply upset</span> that ${he2}'ll never see ${his2} body again. With so little left, ${he2} finds it easy to take vengeance by <span class="orangered">completely rejecting your ownership of ${him2}.</span>`);
					origBodyOwner.devotion -= 50;
					origBodyOwner.trust = 100;
				}
			}
		}
	}
	App.Events.addParagraph(node, r);
	target.bodySwap++;
	cashX(payout, "slaveTransfer");
	V.activeSlave = 0;
	V.swappingSlave = 0;
	return node;
};
