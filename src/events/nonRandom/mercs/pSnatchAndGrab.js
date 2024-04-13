App.Events.PSnatchAndGrab = class PSnatchAndGrab extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.mercenaries > 0
		];
	}

	execute(node) {
		let r = [];
		V.nextButton = "Continue";
		V.eventResults.snatch = 0;

		App.Events.addParagraph(node, [`${capFirstChar(V.assistant.name)} forwards a discreet message from the leader of your mercenaries.`]);
		App.Events.addParagraph(node, [`"${properTitle()}, I've just become aware of a... business opportunity through some old friends. There's an unregistered lab doing illegal gene therapy work. At least two agencies are onto them, which is how I heard of it. Word is, they're packing up and moving out. I believe me and my people can appropriate that shipment. Catch is, to make this work I need to pay some serious bribes, and I need to pay them today. We'll cut you in as an equal partner for ${cashFormat(10000)} cash, right now. One share should come to one of the lab rats, more or less. Are you in or out?"`]);
		if (V.assistant.personality === 1) {
			const {
				HeA,
				heA, hisA, himselfA
			} = getPronouns(assistant.pronouns().main).appendSuffix("A");
			r.push(`${capFirstChar(V.assistant.name)}'s ${V.assistant.appearance} avatar appears on your desk next to the message.`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`"I vote yes. Even though whatever that lab is producing can't possibly be as interesting as me," ${heA} says haughtily, and twirls a strand of tentacle hair.`);
					break;
				case "shemale":
					r.push(`"I vote yes," ${heA} says sweetly. "Whatever they're doing, it's probably interesting. I'd love to fuck something interesting."`);
					break;
				case "amazon":
					r.push(`"I vote yes!" ${heA} shouts. "Whatever they're doing, their girls are probably valuable. And everything's more fun if you loot it instead of buying it."`);
					break;
				case "businesswoman":
					r.push(`"I vote yes," ${heA} says. "The likelihood that the lab is producing something valuable is overwhelming. The potential profits are," and ${heA} pauses to fan ${himselfA}, "exciting."`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`"I vote yes," ${heA} says. "They could be up to something really cool!"`);
					break;
				case "goddess":
					r.push(`"I vote yes," ${heA} says. "Whatever is in that lab deserves some loving attention and... more variety is always appreciated."`);
					break;
				case "hypergoddess":
					r.push(`"I vote yes," ${heA} says. "Whatever is in that lab deserves some loving attention and... more variety is always appreciated."`);
					break;
				case "loli":
					r.push(`"I vote yeah," ${heA} says. "I wanna see what's inside!"`);
					break;
				case "preggololi":
					r.push(`"I vote yeah," ${heA} says. "I wanna see what's inside!"`);
					break;
				case "schoolgirl":
					r.push(`"I vote yeah," ${heA} says. "I just wanna see what that lab is doing. Could be cool!"`);
					break;
				case "angel":
					r.push(`"I vote yes," ${heA} says. "Whatever is in that lab deserves a better life under your care."`);
					break;
				case "cherub":
					r.push(`"I vote yeah," ${heA} says. "I'm really curious what could be inside."`);
					break;
				case "incubus":
					r.push(`"I vote yes," ${heA} says. "I can't wait to get my dick in it!"`);
					break;
				case "succubus":
					r.push(`"I vote no," ${heA} says. "You're all mine!"`);
					break;
				case "imp":
					r.push(`"I vote yeah," ${heA} says. "I can't wait to tease and torment whatever's inside!"`);
					break;
				case "witch":
					r.push(`"I vote yes," ${heA} says. "It can't be worse than some of my fuckups."`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`${HeA} doesn't comment, though a large, toothy grin spreads across the entirety of ${hisA} head revealing ${hisA} thoughts on the subject.`);
					break;
				default:
					r.push(`"I would suggest agreement," ${heA} says. "Even if the prize does not appeal to you personally, it's likely to be quite valuable. Selling it could net you quite a profit."`);
			}
			App.Events.addParagraph(node, r);
		}

		const choices = [
			new App.Events.Result(`Bankroll the snatch and grab`, bankroll),
			new App.Events.Result(`Politely decline`, decline)
		];
		App.Events.addResponses(node, choices);

		function bankroll() {
			cashX(-10000, "slaveTransfer");
			V.eventResults.snatch = 1;
			App.Events.queueEvent(1, new App.Events.PSnatchAndGrabResult());
			return `You receive no response whatsoever. Twenty minutes later, however, a liaison VTOL aircraft that the mercenaries sometimes hire arrives, loads a party of armed men and women, and leaves.`;
		}

		function decline() {
			return `You receive no response whatsoever. That's how it is with professionals: the offer was never made, you never declined, and no further discussion is necessary or desired.`;
		}
	}
};
