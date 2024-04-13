// cSpell:ignore Chakri, Dlamini, Tupou, Thani, Khalifah, Nahyan, Bolkiah, Hāshim, Alawi, Glücksburg, Saxe-Coburg

App.Events.RERoyalBlood = class RERoyalBlood extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => ((V.rep - 10000 > random(1, 12500)) || (V.debugMode > 0 && V.debugModeEventSelection > 0))
		];
	}

	execute(el) {
		const activeSF = V.SF.Toggle && V.SF.Active >= 1;

		const queen = generateQueen(); // Queen first to get an ID for her children to relate to.
		const {
			He3,
			his3, he3, him3, himself3, wife3
		} = getPronouns(queen).appendSuffix('3');

		const princess = generatePrincess();
		const {
			His,
			his, he, him, girl
		} = getPronouns(princess);

		const prince = (V.seeDicks > 0) ? generatePrince() : undefined;
		const {
			His2,
			his2, he2, himself2
		} = getPronouns(prince || {pronoun: 1}).appendSuffix('2');

		const {HeA, heA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		let r = [];
		r.push(`One unfortunate consequence of existing in a global world is that business opportunities continue to crop up unabated by the onset of night in one corner of the world or another, an inconsiderate phenomenon for arcology owners who happen to be asleep when an event of importance takes place outside the walls of their arcology. This particular evening you are awoken by an alert from ${V.assistant.name}, unusually intense for this late hour.`);
		if (V.assistant.personality > 0) {
			r.push(`"${properMaster()}, there is a time sensitive enslavement opportunity available if you're interested." ${HeA} pauses before continuing. "You're going to want to see this one ${properMaster()}."`);
		} else {
			r.push(`${HeA} informs you that there is a time sensitive enslavement opportunity for you to peruse, and that ${heA} has calculated the potential rewards are worthy of your consideration even in the middle of the night.`);
		}
		App.Events.addParagraph(el, r);

		App.Events.addParagraph(el, [`A convenient video feed is brought up, displaying a quick visual summary of the opportunity at hand.`]);

		App.Events.addParagraph(el, [`It seems a bastion of the old world has fallen; a royal family of ancient blood and reputation has been overthrown by a local populist leader and his fellow revolutionaries. Furthermore, the leader of the revolution has designs to transform the outmoded monarchy into an arcology of his own, and has transmitted a request for aid to his new peers in the Free Cities.`]);

		App.Events.addParagraph(el, [`Of course, nothing in the Free Cities is free and international aid is no exception. This new arcology owner is no fool, however, and has outlined a number of rewards to be delivered to his most generous benefactors.`]);

		App.Events.addParagraph(el, [`Though the King himself is dead, murdered in his bed by bloodthirsty revolutionaries, the rest of his family and the majority of his court have been captured and enslaved by their former subjects. The new arcology owner, having decided that a large injection of credits or a shipment of goods is superior to deflowering a royal pussy or asshole, has directed his followers to slake their lust and vengeance on the King's ${wife3} and court rather than his children, though they too are past the age of majority.`]);

		App.Events.addParagraph(el, [`Time is short, but you are well placed to acquire some choice slaves. With an adequate donation${(activeSF) ? `, or the use of ${V.SF.Lower}` : ``}, of course.`]);

		const choices = [];
		choices.push(new App.Events.Result(
			"Go back to sleep",
			() => {
				return `You inform your personal assistant that you aren't planning to take any action. It's not every day that a monarchy collapses in the old world, but it's also not particularly uncommon either.`;
			}
		));


		// PRINCESS
		const princessCashCost = 50000;
		const princessRepCost = 2000;
		const princessSF = 18000;
		if (V.cash >= princessCashCost && V.rep >= princessRepCost) {
			choices.push(new App.Events.Result(
				"Leverage your reputation and credits to aid the new arcology in exchange for a pretty princess",
				getPrincess,
				`You will need to utilize a portion of your reputation and ${cashFormat(princessCashCost)} to enslave ${him}.`
			));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds and reputation to enslave a princess.`));
		}

		if (activeSF) {
			if (V.rep > princessSF) {
				choices.push(new App.Events.Result(
					`Dispatch a ${V.SF.Lower} on a night time raid to acquire a pretty princess`,
					() => getPrincess(false),
					`You will be despised for this action, and trade will be greatly damaged.`));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the reputation to enslave a princess.`));
			}
		}

		const princeCost = 35000;
		const princeSF = 18000;
		const princeAndPrincessCash = 100000;
		const princeAndPrincessRep = 10000;
		const princeAndPrincessSF = 18000;
		if (V.seeDicks > 0) {
			// PRINCE
			if (V.cash >= princeCost) {
				choices.push(new App.Events.Result(
					`Dispatch a sizable amount of aid in exchange for the crown prince`,
					getPrince,
					`Purchasing the goods and hiring the VTOLs will cost about ${cashFormat(princeCost)}.`
				));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave the crown prince.`));
			}

			if (activeSF) {
				if (V.rep > princeSF) {
					choices.push(new App.Events.Result(
						`Dispatch ${V.SF.Lower} on a night time raid to acquire the crown prince`,
						() => getPrince(false),
						`You will be despised for this action, and trade will be greatly damaged.`
					));
				} else {
					choices.push(new App.Events.Result(null, null, `You lack the necessary reputation to enslave the crown prince.`));
				}
			}


			// PRINCE AND PRINCESS
			if (V.cash >= princeAndPrincessCash && V.rep >= princeAndPrincessRep) {
				choices.push(new App.Events.Result(
					`Leverage your substantial reputation and a huge sum of credits to aid the new arcology in exchange for both the prince and princess`,
					getPrinceAndPrincess,
					`You will need to utilize a sizable portion of your reputation and ${cashFormat(princeAndPrincessCash)} to enslave them.`
				));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary funds and reputation to enslave both the crown prince and princess.`));
			}

			if (activeSF) {
				if (V.rep > princeAndPrincessSF) {
					choices.push(new App.Events.Result(
						`Dispatch ${V.SF.Lower} on a night time raid to acquire both the prince and princess`,
						() => getPrinceAndPrincess(false),
						`You will be despised for this action, and trade will be greatly damaged.`
					));
				} else {
					choices.push(new App.Events.Result(null, null, `You lack the necessary reputation to enslave both the crown prince and princess.`));
				}
			}
		}


		// COURT LADIES
		const courtLadiesCost = 25000;
		const courtLadiesCostSF = 10000;
		if (V.cash >= courtLadiesCost) {
			choices.push(new App.Events.Result(
				`Transfer a respectable quantity of credits for a handful of court ladies`,
				getCourtLadies,
				`It will cost about ${cashFormat(courtLadiesCost)} to enslave them.`
			));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave a handful of court ladies.`));
		}

		if (activeSF) {
			if (V.rep > courtLadiesCostSF) {
				choices.push(new App.Events.Result(
					`Dispatch ${V.SF.Lower} on a night time raid to acquire a handful of court ladies`,
					() => getCourtLadies(false),
					`You will be disliked for this action and trade will be damaged.`
				));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary reputation to enslave a handful of court ladies.`));
			}
		}


		// HOLD THE QUEEN ALONE
		const queenCash = 15000;
		const queenSF = 12000;
		if (V.cash >= queenCash) {
			choices.push(new App.Events.Result(
				`Transfer a modest quantity of credits for the Queen ${himself3}`,
				getQueen,
				`It will cost about ${cashFormat(queenCash)} to enslave ${him3}.`
			));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave the Queen.`));
		}

		if (activeSF) {
			if (V.rep >= queenSF) {
				choices.push(new App.Events.Result(
					`Dispatch ${V.SF.Lower} on a night time raid to acquire the Queen ${himself3}`,
					() => getQueen(false),
					`You will be despised for this action, and trade will be greatly damaged.`
				));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary reputation to enslave the Queen.`));
			}
		}


		// PRINCESS AND QUEEN
		// repX is called within the get* function
		const princessAndQueenCash = 500000;
		const princessAndQueenSF = 13000;
		if (V.cash >= princessAndQueenCash) {
			choices.push(new App.Events.Result(
				`Send a large amount of credits and goods to retrieve both the princess and Queen`,
				getPrincessAndQueen,
				`It will cost about ${cashFormat(princessAndQueenCash)} to enslave both the princess and Queen.`
			));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds and reputation to enslave both the Queen and princess.`));
		}

		if (activeSF) {
			if (V.rep >= princessAndQueenSF) {
				choices.push(new App.Events.Result(
					`Dispatch ${V.SF.Lower} on a night time raid to acquire both the princess and Queen`,
					() => getPrincessAndQueen(false),
					`You will be despised for this action, and trade will be greatly damaged.`
				));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary reputation to enslave both the Queen and princess.`));
			}
		}


		// QUEEN AND COURT
		const queenAndCourtCost = 500000;
		const queenAndCourtSF = 13000;
		if (V.cash >= queenAndCourtCost) {
			choices.push(new App.Events.Result(
				`Offer a generous amount of cash in exchange for both the Queen and ${his3} court ladies`,
				getQueenAndCourt,
				`It will cost about ${cashFormat(queenAndCourtCost)} to enslave the Queen and ${his3} court ladies.`
			));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave the Queen and ${his3} ladies.`));
		}

		if (activeSF) {
			if (V.rep >= queenAndCourtSF) {
				choices.push(new App.Events.Result(
					`Dispatch ${V.SF.Lower} on a night time raid to acquire the Queen and ${his3} court ladies`,
					() => getQueenAndCourt(false),
					`You will be despised for this action, and trade will be greatly damaged.`
				));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary reputation to enslave the Queen and ${his3} ladies.`));
			}
		}


		// ENTIRE COURT
		const entireCourtCost = 2500000;
		if (V.limitFamilies !== 1) {
			if (V.cash >= entireCourtCost) {
				choices.push(new App.Events.Result(
					`Send an unheard amount of credits and goods to retrieve the entire court`,
					getEntireCourt,
					`It will cost about ${cashFormat(entireCourtCost)} to enslave the entire court.`
				));
			}

			if (activeSF) {
				choices.push(new App.Events.Result(
					`Dispatch ${V.SF.Lower} on a night time raid to take everything of value`,
					() => getEntireCourt(false),
					`You will be loathed for this action and trade will be crippled.`
				));
			}
		}

		App.Events.addResponses(el, choices);
		return el;

		function getPrincess(buy = true) {
			const text = new DocumentFragment();
			if (buy) {
				App.UI.DOM.appendNewElement("p", text, `You seize a tablet and practically roll out of your bed, working furiously and using every feature of ${V.assistant.name} to the utmost. It's not easy, but you call in a number of favors and grease a handful of palms, and soon a flight of VTOLs are landing in the new arcology laden with goods. When they take off again they have the princess aboard clad in chains, and make a direct course towards your waiting penthouse.`);

				// Princess
				cashX(-princessCashCost, "slaveTransfer", princess);
				repX(-princessRepCost, "event", princess);
			} else {
				App.UI.DOM.appendNewElement("p", text, `Seizing a tablet, you quickly send a message to ${App.Mods.SF.SFC()}. After dark, a flight of VTOLs land in the new arcology laden with troops. When they take off again they have the princess aboard clad in chains and make a direct course towards your waiting penthouse.`);
				V.arcologies[0].prosperity -= 15;

				// Princess
				repX(-princessSF, "event", princess);
			}
			App.UI.DOM.appendNewElement("p", text, `Eventually ${he} arrives in your penthouse, the perfect image of a demure yet composed princess. ${His} clearly practiced façade of poise and grace fades under scrutiny, however. ${princessArrives()}`);

			orphan(princess);
			text.append(App.UI.newSlaveIntro(princess));

			return text;
		}

		function getPrince(buy = true) {
			const text = new DocumentFragment();
			if (buy) {
				App.UI.DOM.appendNewElement("p", text, `You seize a tablet and practically roll out of your bed, working vigorously and using every feature of ${V.assistant.name} to the utmost. It's not easy, but your credits pave your way to sending a flight of VTOLs laden with goods to the new arcology. They take off again with the crown prince aboard and in chains, where ${he2} rails against the uncaring metal walls of the VTOL for the breadth of ${his2} journey to your penthouse.`);

				// Prince
				cashX(-princeCost, "slaveTransfer", prince);
			} else {
				App.UI.DOM.appendNewElement("p", text, `Seizing a tablet, you quickly send a message to The Colonel. After dark, a flight of VTOLs land in the new arcology laden with troops. They take off again with the crown prince aboard and in chains, where ${he2} rails against the uncaring metal walls of the VTOL for the breadth of ${his2} journey to your penthouse.`);
				App.UI.DOM.appendNewElement("p", text, princeArrives());
				prince.origin = `$He was the crown prince of a royal kingdom, till $his family was overthrown and $he was acquired by ${V.SF.Lower}.`;
				V.arcologies[0].prosperity -= 15;
				// Prince
				repX(-princeSF, "event", prince);
			}

			App.UI.DOM.appendNewElement("p", text, princeArrives());

			orphan(prince);
			text.append(App.UI.newSlaveIntro(prince));

			return text;
		}

		function getPrinceAndPrincess(buy = true) {
			const text = new DocumentFragment();
			if (buy) {
				App.UI.DOM.appendNewElement("p", text, `You seize a tablet and practically roll out of your bed, working furiously and using every feature of ${V.assistant.name} to the utmost. It's not easy, but you call in a number of favors and grease a handful of palms, and soon a flight of VTOLs are landing in the new arcology laden with goods. When they take off again they have the prince and princess aboard, clad in chains and bound face to face in a forced embrace, and make a direct course towards your waiting penthouse.`);
				App.UI.DOM.appendNewElement("p", text, `Eventually they arrive in your penthouse, faces flushed with embarrassment of their compromising position. The former prince is beside ${himself2} with rage, but seems to be holding ${himself2} back for ${his2} little ${relativeTerm(prince, princess)}'s sake, while ${he} struggles to maintain a façade of poise and grace. ${princessArrives()} However, the prince's submission to life as a slave is another question entirely.`);
				const cashShares = princeAndPrincessCash / 5;
				const repShares = princeAndPrincessRep / 5;

				// Princess
				cashX(-cashShares * 3, "slaveTransfer", princess);
				repX(-repShares * 3, "event", princess);
				newSlave(princess); // skip New Slave Intro

				// Prince
				cashX(-cashShares * 2, "slaveTransfer", prince);
				repX(-repShares * 2, "event", prince);
				newSlave(prince); // skip New Slave Intro
			} else {
				App.UI.DOM.appendNewElement("p", text, `Seizing a tablet, you quickly send a message to The Colonel. After dark, a flight of VTOLs land in the new arcology laden with troops. When they take off again they have the prince and princess aboard, clad in chains and bound face to face in a forced embrace, and make a direct course towards your waiting penthouse.`);
				App.UI.DOM.appendNewElement("p", text, `Eventually they arrive in your penthouse, faces flushed with embarrassment of their compromising position. The former prince is beside ${himself2} with rage, but seems to be holding ${himself2} back for ${his2} little ${relativeTerm(prince, princess)}'s sake, while ${he} struggles to maintain a façade of poise and grace. ${princessArrives()} However, the prince's submission to life as a slave is another question entirely.`);
				prince.origin = `$He was the crown prince of a royal kingdom, till $his family was overthrown and $he was acquired by ${V.SF.Lower}.`;
				V.arcologies[0].prosperity -= 15;
				const shares = princeAndPrincessSF / 9;

				// Princess
				repX(-shares * 5, "event", princess);
				newSlave(princess); // skip New Slave Intro

				// Prince
				repX(-shares * 4, "event", prince);
				newSlave(prince); // skip New Slave Intro
			}

			// the queen is missing
			princess.mother = 0;
			setMissingParents(princess);
			prince.mother = princess.mother;

			return text;
		}

		function getCourtLadies(buy = true) {
			const text = new DocumentFragment();
			if (buy) {
				App.UI.DOM.appendNewElement("p", text, `You take a tablet and peruse the various court ladies on offer by the fledgling arcology. You single out a few interesting individuals for purchase that might suit your tastes, but the slapdash descriptions provided for each slave by the revolutionaries make it likely that any similarities to your aesthetic leanings will be coincidental. Once you are satisfied with your selection, you electronically transfer the credits to the new arcology and soon receive a receipt for your donation and an estimated delivery schedule.`);
				App.UI.DOM.appendNewElement("p", text, `When the ladies arrive at your penthouse, they seem almost relieved at the opulence of their new surroundings. ${ladiesArrive()}`);
				const share = Math.trunc(courtLadiesCost / 3);

				// Ladies
				for (let i = 0; i < 3; i++) {
					const slave = generateOneCourtLady();
					cashX(-share, "slaveTransfer", slave);
					newSlave(slave); // skip New Slave Intro
				}
			} else {
				App.UI.DOM.appendNewElement("p", text, `You take a tablet and peruse the various court ladies on offer by the fledgling arcology. You single out a few interesting individuals for acquisition that might suit your tastes, but the slapdash descriptions provided for each by ${V.SF.Lower} Intelligence make it likely that any similarities to your aesthetic leanings will be coincidental. Once you are satisfied with your selection, you electronically transfer the order to The Colonel and soon receive a mission success notice along with an estimated delivery schedule.`);
				App.UI.DOM.appendNewElement("p", text, `When the ladies arrive at your penthouse, they seem almost relieved at the opulence of their new surroundings. ${ladiesArrive()}`);
				const share = Math.trunc(courtLadiesCostSF / 3);

				// Ladies
				for (let i = 0; i < 3; i++) {
					const slave = generateOneCourtLady();
					repX(-share, "event", slave);
					newSlave(slave); // skip New Slave Intro
				}
				V.arcologies[0].prosperity -= 10;
			}

			return text;
		}

		function getQueen(buy = true) {
			const text = new DocumentFragment();
			if (buy) {
				App.UI.DOM.appendNewElement("p", text, `You take a tablet and transmit a communication request to the new arcology owner. It doesn't take long for him to accept but when his video feed connects on your screen, you find yourself staring at the pained expression of the Queen ${himself3}. It becomes abundantly clear that someone is mounting ${him3} from behind as ${his3} body shakes and spasms from the intensity of their thrusts. You note that the Queen appears to be getting fucked on an extravagant, yet bloodstained, four-poster bed, likely the site of ${his3} former husband's demise. The mysterious individual unsurprisingly turns out to be the new arcology owner, revealing himself by shoving the Queen's face down against the stained bed sheets as he lowers his own face into frame. "How can I help you?"`);
				App.UI.DOM.appendNewElement("p", text, `The man seems somewhat surprised that you want to purchase the Queen, given the breadth and quality of his other merchandise available, but not unduly so. Soon enough negotiations begin and a short time later an equitable price is agreed upon. Your new peer even throws in a slight discount, in exchange for allowing him to use the Queen himself for the remainder of the night.`);
				App.UI.DOM.appendNewElement("p", text, `When the Queen arrives at your penthouse, ${he3} seems almost relieved and almost basks in the opulence of ${his3} new surroundings. `);

				// Queen
				cashX(-queenCash, "slaveTransfer", queen);
			} else {
				App.UI.DOM.appendNewElement("p", text, `Seizing a tablet, you quickly send a message to The Colonel. After dark, a flight of VTOLs land in the new arcology laden with troops. When they take off again they have the Queen aboard and make a direct course towards your waiting penthouse.`);
				App.UI.DOM.appendNewElement("p", text, `When the Queen arrives at your penthouse, ${he3} seems almost relieved and almost basks in the opulence of ${his3} new surroundings. ${queenArrives()}`);
				V.arcologies[0].prosperity -= 12;

				// Queen
				repX(-queenSF, "event", queen);
			}

			text.append(App.UI.newSlaveIntro(queen));

			return text;
		}

		function getPrincessAndQueen(buy = true) {
			const text = new DocumentFragment();
			if (buy) {
				App.UI.DOM.appendNewElement("p", text, `You take a tablet and transmit a communication request to the new arcology owner with your intent. Once his shock wears off, he readily accepts with little need for negotiation. Soon, a flight of VTOLs land in the new arcology laden with goods. When they take off again they have the princess and the Queen, who is resigned to ${his3} fate, clad in chains then bound face to face in a forced embrace.`);
				App.UI.DOM.appendNewElement("p", text, `Eventually they both arrive in your penthouse. The princess is flushed with embarrassment in ${his} compromising position, struggling to maintain a façade of poise and grace. ${princessArrives()} The Queen, on the other hand, seems almost relieved and basks in the opulence of ${his3} new surroundings. ${queenArrives()}`);
				const shares = princessAndQueenCash / 5;

				// Princess
				cashX(-shares * 4, "slaveTransfer", princess);
				newSlave(princess); // skip New Slave Intro

				// Queen
				cashX(-shares, "slaveTransfer", queen);
				newSlave(queen); // skip New Slave Intro
			} else {
				App.UI.DOM.appendNewElement("p", text, `Seizing a tablet, you quickly send a message to The Colonel. After dark, a flight of VTOLs land in the new arcology laden with troops. When they take off again they have the princess and Queen aboard, making a direct course towards your waiting penthouse.`);
				App.UI.DOM.appendNewElement("p", text, `Eventually they both arrive in your penthouse. The princess is flushed with embarrassment in ${his} compromising position, struggling to maintain a façade of poise and grace. ${princessArrives()} The Queen, on the other hand, seems almost relieved and basks in the opulence of ${his3} new surroundings. ${queenArrives()}`);
				V.arcologies[0].prosperity -= 13;
				const shares = princessAndQueenSF / 13;

				// Princess
				repX(-shares * 10, "event", princess);
				newSlave(princess);

				// Queen
				repX(-shares * 3, "event", queen);
				newSlave(queen);
			}

			return text;
		}

		function getQueenAndCourt(buy = true) {
			const text = new DocumentFragment();
			if (buy) {
				App.UI.DOM.appendNewElement("p", text, `You take a tablet and transmit a communication request to the new arcology owner with your intent. Once his shock wears off, he readily accepts with little need for negotiation. Soon, a flight of VTOLs land in the new arcology laden with goods. When they take off again they have the Queen, who is resigned to ${his3} fate, and a gaggle of terrified court ladies chained together.`);
				App.UI.DOM.appendNewElement("p", text, `Eventually they all arrive in your penthouse. The Queen seems almost relieved and basks in the opulence of ${his3} new surroundings. ${queenArrives()} Meanwhile, the ladies seem comforted by the opulence of their new surroundings. ${ladiesArrive()}`);
				const costShare = queenAndCourtCost / 5;

				// Ladies
				for (let i = 0; i < 3; i++) {
					const slave = generateOneCourtLady();
					cashX(-costShare, "slaveTransfer", slave);
					newSlave(slave); // skip New Slave Intro
				}

				// Queen
				cashX(-costShare * 2, "slaveTransfer", queen);
				newSlave(queen); // skip New Slave Intro
			} else {
				App.UI.DOM.appendNewElement("p", text, `Seizing a tablet, you quickly send a message to The Colonel. After dark, a flight of VTOLs land in the new arcology laden with troops. When they take off again they have the Queen, who is resigned to ${his3} fate, and a gaggle of terrified court ladies chained together.`);
				App.UI.DOM.appendNewElement("p", text, `Eventually they all arrive in your penthouse. The Queen seems almost relieved and basks in the opulence of ${his3} new surroundings. ${queenArrives()} Meanwhile, the ladies seem comforted by the opulence of their new surroundings. `);
				V.arcologies[0].prosperity -= 13;
				const share = queenAndCourtSF / 13;

				// Ladies
				for (let i = 0; i < 3; i++) {
					const slave = generateOneCourtLady();
					repX(-share*3, "event", slave);
					newSlave(slave); // skip New Slave Intro
				}

				// Queen
				repX(-share*4, "event", queen);
				newSlave(queen); /* skip New Slave Intro */
			}

			return text;
		}

		function getEntireCourt(buy = true) {
			function everyoneArrives() {
				let r = [];
				r.push(`Eventually they all arrive in your penthouse. The`);
				if (V.seeDicks > 0) {
					r.push(`prince and princess`);
				} else {
					r.push(`princess and queen`);
				}
				r.push(`are flushed with embarrassment in their compromising position.`);
				if (V.seeDicks > 0) {
					r.push(`The former prince is beside ${himself2} with rage, but seems to be holding ${himself2} back for ${his2} little ${relativeTerm(prince, princess)}'s sake, while ${he} struggles to maintain a façade of poise and grace.`);
				} else {
					r.push(`The princess struggles to maintain a façade of poise and grace.`);
				}
				r.push(princessArrives());
				if (V.seeDicks > 0) {
					r.push(`However, the prince's submission to life as a slave is another question entirely. The Queen, on the other hand,`);
				} else {
					r.push(`The Queen`);
				}
				r.push(`seems almost relieved and basks in the opulence of ${his3} new surroundings. ${queenArrives()} Lastly, the ladies seem comforted by the opulence of their new surroundings. ${ladiesArrive()}`);
				return r;
			}

			const text = new DocumentFragment();
			let r = [];
			if (buy) {
				r.push(`You take a tablet and transmit a communication request to the new arcology owner with your intent. Once his shock wears off, he readily accepts with little need for negotiation. Soon, a flight of VTOLs land in the new arcology laden with goods. When they take off again they have the`);
				if (V.seeDicks > 0) {
					r.push(`prince and princess, clad in chains and bound face to face in a forced embrace, the Queen, who is resigned to ${his3} fate,`);
				} else {
					r.push(`princess and ${his} mother, clad in chains and bound face to face in a forced embrace,`);
				}
				r.push(`and a gaggle of terrified court ladies.`);
				App.Events.addParagraph(text, r);
				App.Events.addParagraph(text, everyoneArrives());
				const costShare = entireCourtCost/250;

				// Princess
				cashX(-costShare*110, "slaveTransfer", princess);
				newSlave(princess); // skip New Slave Intro

				// Prince
				if (V.seeDicks > 0) {
					cashX(-costShare*75, "slaveTransfer", prince);
					newSlave(prince); // skip New Slave Intro
				}

				// Queen
				cashX(-costShare*25, "slaveTransfer", queen);
				newSlave(queen); /* skip New Slave Intro */

				// Ladies
				const ladiesCost = Math.trunc(costShare*40/3);
				for (let i = 0; i < 3; i++) {
					const slave = generateOneCourtLady();
					cashX(-ladiesCost, "slaveTransfer", slave);
					newSlave(slave); // skip New Slave Intro
				}
			} else {
				const loot = random(10, 300) * 100;
				r.push(`Seizing a tablet, you quickly send a message to The Colonel. After dark, a flight of VTOLs land in the new arcology laden with troops. When they take off again they have the`);
				if (V.seeDicks > 0) {
					r.push(`prince and princess, clad in chains and bound face to face in a forced embrace, the Queen, who is resigned to ${his3} fate,`);
				} else {
					r.push(`princess and ${his} mother, clad in chains and bound face to face in a forced embrace,`);
				}
				r.push(`a gaggle of terrified court ladies, and as much loot as they could carry.`);
				App.Events.addParagraph(text, r);
				App.Events.addParagraph(text, [...everyoneArrives(), `You also scored <span class="cash inc">${cashFormat(loot)}</span> in valuables from the raid.`]);

				V.arcologies[0].prosperity = 2;
				cashX(loot, "event");
				const repShares = Math.trunc(V.rep / -15);
				/* this event is supposed to end in reputation at 0. In order to slice up that pie, we find shares of "everything" here and give them out later, before finally setting leftovers to 0. 3 ladies at one share each, +3 for prince, +4 for queen, +5 for princess is 15 shares.*/

				// Ladies
				for (let i = 0; i < 3; i++) {
					const slave = generateOneCourtLady();
					repX(repShares, "event", slave);
					newSlave(slave); // skip New Slave Intro
				}
				// Princess
				repX((5 * repShares), "event", princess);
				newSlave(princess); // skip New Slave Intro

				// Prince
				if (V.seeDicks > 0) {
					repX((3 * repShares), "event", prince);
					newSlave(prince); /* skip New Slave Intro */
				}

				// Queen
				repX((4 * repShares), "event", queen);
				newSlave(queen); /* skip New Slave Intro */

				repX(0 - V.rep, "event"); /* Round off any remaining rep due to the trunc on shares*/
			}

			return text;
		}

		function generateTemplate() {
			let slave;

			if (V.realRoyalties === 1) {
				/** @type {FC.Race} */
				let race;
				const nationality = App.Data.misc.royalNationalities.random();
				switch (nationality) {
					case "Japanese":
					case "Cambodian":
					case "Bhutanese":
					case "Thai":
						race = "asian";
						break;
					case "Luxembourgian":
					case "Belgian":
					case "Danish":
					case "Dutch":
					case "Swedish":
					case "Norwegian":
					case "British":
					case "Monégasque":
						race = "white";
						break;
					case "Spanish":
						race = "southern european";
						break;
					case "Moroccan":
					case "Omani":
					case "Jordanian":
					case "Bahraini":
					case "Kuwaiti":
					case "Qatari":
					case "Saudi":
						race = "middle eastern";
						break;
					case "Bruneian":
					case "Malaysian":
						race = "malay";
						break;
					case "Emirati":
						race = "indo-aryan";
						break;
					case "Tongan":
						race = "pacific islander";
						break;
					case "Swazi":
					case "Mosotho":
						race = "black";
						break;
				}
				slave = GenerateNewSlave("XX", {
					minAge: V.fertilityAge + V.minimumSlaveAge + 1, maxAge: (V.pedo_mode === 1 ? 24 : 43), disableDisability: 1, nationality: nationality, race: race
				});
				if (slave.nationality === "Japanese") {
					slave.birthSurname = "Yamato";
				} else if (slave.nationality === "Luxembourgian") {
					slave.birthSurname = "Luxembourg-Nassau";
				} else if (slave.nationality === "Belgian") {
					slave.birthSurname = "Saxe-Coburg and Gotha";
				} else if (slave.nationality === "Danish") {
					slave.birthSurname = "Glücksburg";
				} else if (slave.nationality === "Dutch") {
					slave.birthSurname = "Orange-Nassau";
				} else if (slave.nationality === "Swedish") {
					slave.birthSurname = "Bernadotte";
				} else if (slave.nationality === "Spanish") {
					slave.birthSurname = "Bourbon";
				} else if (slave.nationality === "Norwegian") {
					slave.birthSurname = "Glücksburg";
				} else if (slave.nationality === "Cambodian") {
					slave.birthSurname = "Norodom";
				} else if (slave.nationality === "Moroccan") {
					slave.birthSurname = "Alawi";
				} else if (slave.nationality === "Omani") {
					slave.birthSurname = "Al Said";
				} else if (slave.nationality === "Jordanian") {
					slave.birthSurname = "Hāshim";
				} else if (slave.nationality === "Bruneian") {
					slave.birthSurname = "Bolkiah";
				} else if (slave.nationality === "Emirati") {
					slave.birthSurname = "Al Nahyan";
				} else if (slave.nationality === "Bahraini") {
					slave.birthSurname = "Al Khalifah";
				} else if (slave.nationality === "Kuwaiti") {
					slave.birthSurname = "Al Sabah";
				} else if (slave.nationality === "Malaysian") {
					slave.birthSurname = "Pahang";
				} else if (slave.nationality === "Qatari") {
					slave.birthSurname = "Al Thani";
				} else if (slave.nationality === "Saudi") {
					slave.birthSurname = "Al Saud";
				} else if (slave.nationality === "Tongan") {
					slave.birthSurname = "Tupou";
				} else if (slave.nationality === "Swazi") {
					slave.birthSurname = "Dlamini";
				} else if (slave.nationality === "Mosotho") {
					slave.birthSurname = "Moshesh";
				} else if (slave.nationality === "British") {
					slave.birthSurname = "Windsor";
				} else if (slave.nationality === "Monégasque") {
					slave.birthSurname = "Grimaldi";
				} else if (slave.nationality === "Bhutanese") {
					slave.birthSurname = "Wangchuck";
				} else if (slave.nationality === "Thai") {
					slave.birthSurname = "Chakri";
				}
				slave.slaveSurname = slave.birthSurname;
			} else {
				slave = GenerateNewSlave("XX", {minAge: V.fertilityAge + V.minimumSlaveAge + 1, maxAge: (V.pedo_mode === 1 ? 24 : 43), disableDisability: 1});
			}
			slave.anus = 0;
			slave.weight = 0;
			slave.prestige = 2;
			slave.skill.whoring = 0;
			slave.canRecruit = 0;

			return slave;
		}

		/** @returns {App.Entity.SlaveState} */
		function generatePrincess() {
			const slave = generateRelatedSlave(queen, "daughter");
			slave.career = "a princess";
			slave.origin = "$He was a princess of a royal kingdom, till $his family was overthrown and $he was sold to you in exchange for aid.";
			slave.prestigeDesc = "$He was the princess of an ancient kingdom.";
			slave.devotion = random(-80, -60);
			slave.trust = random(-50, -60);
			slave.face = random(25, 100);
			slave.boobs = Math.min(slave.boobs, 400);
			slave.vagina = 0;
			slave.preg = -1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.hips = 0;
			slave.butt = random(1, 2);
			slave.intelligence = random(15, 100);
			slave.intelligenceImplant = 15;
			slave.skill.entertainment = 45;
			slave.skill.anal = 0;
			slave.skill.oral = 0;
			setHealth(slave, jsRandom(30, 60), 0, 0, 0, 0);
			slave.behavioralFlaw = either("arrogant", "bitchy");
			setMissingParents(slave); // set .father so the prince will be a full sibling

			return slave;
		}

		/** @returns {App.Entity.SlaveState} */
		function generatePrince() {
			const slave = generateRelatedSlave(princess, "older brother");
			slave.career = "a prince";
			slave.origin = "$He was the crown prince of a royal kingdom, till $his family was overthrown and $he was sold to you in exchange for aid.";
			slave.prestigeDesc = "$He was the crown prince of an ancient kingdom.";
			slave.devotion = random(-80, -60);
			slave.trust = random(-50, -60);
			slave.butt = random(0, 1);
			slave.muscles = 50;
			slave.intelligence = random(15, 100);
			slave.intelligenceImplant = 15;
			slave.skill.anal = 0;
			slave.skill.oral = 0;
			slave.skill.combat = 40;
			setHealth(slave, jsRandom(30, 60), 0, 0, 0, 0);
			slave.behavioralFlaw = either("arrogant", "bitchy");

			return slave;
		}

		/** @returns {App.Entity.SlaveState} */
		function generateQueen() {
			const slave = generateTemplate();
			slave.career = "a Queen";
			slave.origin = "$He was the Queen of a royal kingdom, till $his husband was overthrown and $he was sold to you in exchange for credits.";
			slave.prestigeDesc = "$He was the Queen of an ancient kingdom.";
			slave.face = random(25, 100);
			slave.faceImplant = 0;
			slave.devotion = random(10, 20);
			slave.trust = random(-20, -30);
			slave.boobs = random(3, 10) * 100;
			slave.natural.boobs = Math.max(300, slave.boobs - 200);
			slave.vagina = 2;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.shoulders = random(-1, 1);
			slave.hips = 1;
			slave.butt = random(2, 4);
			slave.intelligence = random(15, 100);
			slave.intelligenceImplant = 30;
			slave.skill.entertainment = 45;
			slave.counter.birthsTotal = 2;
			setHealth(slave, jsRandom(30, 60), 0, 0, 0, 0);
			slave.behavioralFlaw = either("arrogant", "bitchy");
			if (V.seePreg !== 0) {
				slave.preg = 7;
				slave.pregType = 1;
				slave.pregWeek = 7;
				slave.pregKnown = 1;
				SetBellySize(slave);
			}

			return slave;
		}

		/** @returns {App.Entity.SlaveState} */
		function generateOneCourtLady() {
			const slave = GenerateNewSlave("XX", {
				minAge: 21, maxAge: V.retirementAge - 2, disableDisability: 1, nationality: princess.nationality
			});
			slave.origin = "$He was a member of the court in an ancient kingdom, till it was overthrown and $he was sold to you in exchange for credits.";
			slave.career = "a lady courtier";
			slave.prestige = 1;
			slave.prestigeDesc = "$He was once a lady of the court of an ancient kingdom.";
			slave.face = random(25, 76);
			slave.devotion = random(10, 20);
			slave.trust = random(-20, -30);
			slave.boobs = random(3, 10) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = Math.min(slave.vagina, 1);
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.shoulders = random(-1, 1);
			slave.hips = 1;
			slave.butt = 1;
			slave.anus = 0;
			slave.weight = 0;
			slave.intelligence = random(-50, 70);
			slave.intelligenceImplant = 15;
			slave.skill.entertainment = 25;
			slave.skill.whoring = 0;
			setHealth(slave, jsRandom(30, 60), 0, 0, 0, 0);
			slave.canRecruit = 0;
			slave.behavioralFlaw = either("arrogant", "bitchy");
			return slave;
		}

		/** @param {App.Entity.SlaveState} slave */
		function orphan(slave) {
			// Remove family links from 'child' slaves acquired without their parents
			slave.mother = 0;
			slave.father = 0;
		}

		function queenArrives() {
			return `Yet, it seems likely that ${his3} relief has more to do with saving ${him3} from a lifetime of gang rape at the mercy of ${his3} former subjects, than it does the familiar luxury. ${He3} submits to biometric scanning obediently and without ${(V.seePreg !== 0) ? `fuss, during which you discover to ${his3} surprise that ${he3} is pregnant. Since ${he3} hasn't begun to show yet, it's unclear whether the child is the former King's or the new arcology owner's. You don't have the means to discern the father of the child, but you notice ${he3} cradles ${his3} ever so slightly rounded stomach protectively nonetheless.` : `fuss.`}`;
		}

		function princessArrives() {
			return `The slightest trembling of ${his} balled up fists, the minute tremors that mar ${his} immaculate posture, ${his} inability to meet your eyes with ${his} own — all signs that ${he} is still a scared ${girl} despite all ${his} royal trappings. Nonetheless, though the princess's court training is unlikely to be very beneficial to ${him} in ${his} new life in the penthouse, it does stand in stark contrast to ${his} more common slave peers.`;
		}

		function princeArrives() {
			return `When ${he2} arrives in your penthouse, the former prince is beside ${himself2} with rage. When ${he2} is brought to be modified in the remote surgery, ${he2} breaks free and attempts to fight ${his2} way out of your penthouse. ${His2} attempt at freedom is futile, however, and ${he2} is soon overwhelmed by your guards and dragged back to the remote surgery. It doesn't take long for the valiant prince to become a new dickgirl, though ${his2} submission to life as a slave is another question entirely.`;
		}

		function ladiesArrive() {
			return `Though they still retain much of their aristocratic arrogance, they each submit to biometric scanning with relative obedience. It seems likely that their obedience is borne out of a delusional rationalization that enslavement by one wealthy master is better than enslavement by the unwashed masses they once lorded over.`;
		}
	}
};
