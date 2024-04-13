App.Events.PRaidResult = class PRaidResult extends App.Events.BaseEvent {
	execute(node) {
		let r = [];

		V.nextButton = "Continue";

		App.Events.addParagraph(node, [`As your VTOL craft carries you and your mercenaries out towards an area ideal for a quick raid on the refugee bands, the sensors begin to reveal that there are actually many more bands than you originally suspected. The single aircraft does not carry enough mercenaries to target more than one group, or have the cargo capacity to haul more than one back to the arcology before they disperse. Your mercenary commander makes a selection based on your instructions.`]);

		App.Events.addParagraph(node, [`Out ahead of the main body of refugees there is a small knot moving quickly and in good order, carrying weapons. Farther back, there is a larger group separated from the main body who could be easily isolated. And finally, it seems a group of sick and injured refugees have clustered around a tent where there must be medical assistance of some kind.`]);

		const newSlaves = [];
		if (this.params.raidTarget === 1) {
			r.push(`Under orders to target resistance, your mercenaries target the leading group. They even manage to direct a little small arms fire at the VTOL craft as it circles them, dropping mercenaries and plying its nonlethal weapons, but they are of course rapidly defeated. Your share is two slaves in good physical condition, who prove to have been survivors of the defeated attack on the arcology. The mercenaries find after a data search that one of the prisoners whose part of their share was a minor leader in the anti-Free Cities movement. After a quick consultation over their radios, the mercenaries decide that a summary execution out here would be too quick for the wretch, and bring their prize back to the arcology for more thorough punishment. Between the successful raid and the capture of this public enemy, <span class="green">the citizens are quite impressed by you.</span>`);
			repX(2500, "event");
			for (let prr = 0; prr < 3; prr++) {
				if (V.seeDicks > 0) {
					const slave = GenerateNewSlave("XY");
					slave.origin = "$He is an enslaved refugee who participated in the defeated attack on your arcology.";
					newSlaves.push(slave);
				} else {
					const slave = GenerateNewSlave("XX");
					slave.origin = "$He is an enslaved refugee who participated in the defeated attack on your arcology.";
					newSlaves.push(slave);
				}
			}
		} else if (this.params.raidTarget === 2) {
			r.push(`Under orders to target civilians, your mercenaries head for the isolated group. When the VTOL descends to circle around the large group of refugees, it becomes obvious that it won't even be necessary to expend nonlethal ammunition. A few of the refugees throw themselves down in bitterness, but most just subside into the catatonia of helplessness. They stand quiescent as they are searched, tagged, and loaded onto the VTOL like the wretched human refuse they are. The successful raid <span class="green">is the talk of the Free City.</span>`);
			repX(1000, "event");
			for (let prr = 0; prr < 4; prr++) {
				const slave = GenerateNewSlave();
				slave.origin = "$He is an enslaved refugee.";
				newSlaves.push(slave);
			}
		} else {
			const {
				heU, hisU, himU
			} = getNonlocalPronouns(V.seeDicks === 100 ? 100 : 0).appendSuffix("U"); /* nurse gender is female unless seeDicks is 100 */
			r.push(`Under orders to target the largest possible group of people, your mercenaries head for the sick and injured. As the VTOL settles, it becomes apparent that most of the injuries are from combat, almost certainly in the defeat at ${V.arcologies[0].name}. The tent proves to contain a harassed nurse, almost without medical supplies and at the end of ${hisU} rope. When ${heU} sees the mercenaries push through the tent flap, ${heU} heaves a sigh of mixed defeat and relief and wordlessly offers ${hisU} wrists. The mercenaries give you a larger share of the other slaves in return for ${himU}: they tell you in confidence that ${heU}'ll be a medical asset to them as well as the usual amusement. The successful raid <span class="green">is the talk of the Free City.</span>`);
			App.Events.queueEvent(1, new App.Events.PSlaveMedic());
			repX(1000, "event");
			for (let prr = 0; prr < 5; prr++) {
				const slave = GenerateNewSlave();
				slave.origin = "$He is an enslaved refugee who was wounded in the defeated attack on your arcology.";
				setHealth(slave, jsRandom(-50, 40), normalRandInt(20, 3), normalRandInt(15, 3), Math.max(normalRandInt(0, 1), 0), jsRandom(40, 80));
				newSlaves.push(slave);
			}
		}
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Sell your prisoners immediately`, sell));
		choices.push(new App.Events.Result(`Give your prisoners to citizens injured in the recent invasion`, give));
		choices.push(new App.Events.Result(`Enslave all of the refugees`, enslave));
		App.Events.addResponses(node, choices);

		function sell() {
			for (const slave of newSlaves) {
				cashX(slaveCost(slave), "slaveTransfer");
			}
			return `Prisoners sold.`;
		}

		function give() {
			for (const slave of newSlaves) {
				const cost = slaveCost(slave);
				repX(Math.trunc(cost / 10), "event");
			}
			return `Prisoners <span class="reputation inc">given away.</span>`;
		}

		function enslave() {
			for (const slave of newSlaves) {
				newSlave(slave);
			}
			return `You simply enslave all of the refugees yourself. They would have been worse off had you not intervened.`;
		}
	}
};
