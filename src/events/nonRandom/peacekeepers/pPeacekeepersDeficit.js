App.Events.PPeacekeepersDeficit = class PPeacekeepersDeficit extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.peacekeepers.state === 2,
			() => V.peacekeepers.attitude >= 0
		];
	}

	execute(node) {
		V.nextButton = "Continue";

		App.Events.addParagraph(node, [`General ${V.peacekeepers.generalName}'s peacekeeping force has stabilized the neighboring region somewhat. True to his word, the general has indeed concentrated on his peacekeeping mandate, and hasn't done anything that might be construed as a move against the Free City or its interests. There are somewhat fewer refugees available from that area, and it's a less complete refuge for bad actors, but other than that, there hasn't been much reason for you to take notice. Until today, when General ${V.peacekeepers.generalName} gives you a call.`]);
		App.Events.addParagraph(node, [`It's a video link, and the general is in the field somewhere, wearing scuffed armor with his insignia of rank on the neck protector. He looks tired, and stress worse than simple fatigue is etched on his face, but he looks at you directly and gets on with it. "${PlayerName()}," he says, "to start, I'd like to assure you this is a secure line from my end. We rely on structural security more than you in the Free Cities, with your cutting-edge computing power, but it's effective." He's in what looks like a field command post, in what's almost certainly an improvised secure communications booth. "The situation is this," he explains. "I have two problems, and I hope you may be able to solve them both at once in a way that will be beneficial to you."`]);
		App.Events.addParagraph(node, [`"First," he says sharply, "I'm not getting the support I need out here." It obviously pains him to admit this, and the muscles along his jaw tense as he does, as though he's chewing on the words. "And I'm not giving anything away by telling you that. It's obvious enough, if you compare what I'm being asked to do here with the resources the politicians back home are willing to provide." At this, ${V.assistant.name} displays a quick summary of the political developments in the general's home country. General ${V.peacekeepers.generalName} is right; the expensive peacekeeping force is unpopular, and its support is being reduced by opportunistic politicians. "It isn't bad yet," he says, "but if this keeps up, I'm going to be rationing the most modern medical supplies for my wounded men and women. That's hard."`]);
		App.Events.addParagraph(node, [`"And second," he continues, "I'm having difficulty housing the prisoners we're taking. We're the only functioning law and order in this area, and in order to keep control I'm having to lock up everyone from armed bandits to petty looters. I don't have the resources to imprison them decently. I'm already getting flak about conditions in our main prison camp here." He arches an eyebrow. "Some people back home seem to care more about keeping prisoners comfortable than they care about getting my wounded men and women the best possible care. And I can't just reduce the prisoner population, either. There are too many of them. Word would get out, and there'd be hell to pay back home."`]);
		App.Events.addParagraph(node, [`The singular solution to the two problems is obvious. It's equally obvious that General ${V.peacekeepers.generalName} isn't going to be the one to propose it. He's not stupid.`]);

		const assistCash = 200 * (menialSlaveCost() / 2);
		const choices = [];
		if (V.cash >= assistCash) {
			choices.push(new App.Events.Result(`Offer to assist`, assist, `This will cost ${cashFormat(assistCash)} and provide a number of menial slaves`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the funds to buy the prisoners.`));
		}
		choices.push(new App.Events.Result(`Connect the general with Free Cities pharmaceutical sources`, pharmaceutical));
		choices.push(new App.Events.Result(`Tell him his situation is untenable`, decline));

		App.Events.addResponses(node, choices);

		function assist() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`Understanding that the general needs to couch the situation in a way he can justify in public, and perhaps in a way he can justify to himself, you offer to house the prisoners on a contract basis, with immediate payment to the general so he can meet his forces' immediate needs. Naturally, the prisoners will be kept busy while you keep them; menial labor seems appropriate. It's unlikely that the situation will ever stabilize to the point where they can be released, so for safety, they should all be detained indefinitely. And of course, each prisoner's individual detention will be available for resale. Just like any other slave's.`]);
			V.peacekeepers.attitude += 5;
			V.menials += 200;
			cashX(-assistCash, "peacekeepers");
			App.Events.addParagraph(frag, [`The general is unable to keep from smiling slightly when he hears that you understand perfectly and are willing and able to assist. There's some bitterness there, but not much. The two of you adjust the terms. The new menial slaves will be delivered immediately, several hundred of them; the general prefers to have this be a one-time transfer. After all, having an ongoing prisoner pipeline between his prisoner pens and the Free City might draw unwanted political attention. For now, he has the funds he needs, not to mention an empty prison camp.`]);
			return frag;
		}

		function pharmaceutical() {
			let r = [];
			if (V.cash < 100000) {
				r.push(`Unfortunately, you lack the funds to buy the prisoners.`);
			}
			r.push(`It would be very expensive to provide the general with the kind of money necessary to make a difference in the medical supply situation of a military force sufficient to keep what used to be a small country pacified. You express your regrets at your inability to help directly. You offer to connect the general with Free Cities pharmaceutical resources that will probably be able to get him what his infirmaries need at a lower price. "Interesting," he says, considering the offer. "The usual providers at home will scream bloody murder when it gets out. But it's a good idea," he admits. "Though that does nothing for the prison camps." Part of his reluctance is probably due to an unspoken hesitation to do business with the Free Cities directly. But he's coming around.`);
			V.peacekeepers.attitude += 5;
			return r;
		}
		function decline() {
			V.peacekeepers.attitude -= 10;
			repX(5000, "event");
			return `You decide to use this as an object lesson in the limits of old world power projection, and tell his situation is untenable and that he should withdraw. If he doesn't have the political firepower necessary to get proper support and supply, he's better off cutting his losses. "That's not for you to say," he responds bitterly. "And that's not for me to say, either. I still go where I'm told and do what I'm told. Thank you for your time." He ends the call brusquely. Word of your verbal defense of the Free City's sphere of influence gets around, <span class="reputation inc">greatly improving your reputation.</span>`;
		}
	}
};
