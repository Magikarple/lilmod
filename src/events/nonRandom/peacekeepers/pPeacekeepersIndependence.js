App.Events.PPeacekeepersIndependence = class PPeacekeepersIndependence extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() > 75,
			() => V.peacekeepers.state === 2 && V.peacekeepers.strength < 50,
			() => V.rival.state <= 1 || V.rival.state > 2,
		];
	}

	execute(node) {
		let r = [];

		V.nextButton = "Continue";
		V.peacekeepers.state = 3;
		V.peacekeepers.strength = -10;


		r.push(`General ${V.peacekeepers.generalName} contacts you again, looking more tired and battered than ever. There's a strange light in his eyes, though, as though he's resolved to make a big bet. And once he starts speaking, it turns out that he is. "${PlayerName()}," he says,`);
		if (V.peacekeepers.attitude > 10) {
			r.push(`"you've been supportive of my peacekeeping mission here in the past.`);
		} else {
			r.push(`"I understand your attitude towards my peacekeeping mission here must be mixed.`);
		}
		r.push(`But all that's about to change." He straightens up, falling back on a military bearing. "The support — funding, supply, everything — for my men and women here is ending, effective now. Right now, in fact. I'm not sure how I'm going to get everyone home." He looks through the video feed at you.`);

		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`"If we're going home."`]);
		App.Events.addParagraph(node, [`"The world's changed," he continues. "Or maybe it's gone back to the way it used to be. There's nothing for my people back home but discharge and unemployment. If they're lucky. It's too much to ask good men and women, good, armed, men and women, to do that. Not when we already control what used to be a nation, right here." He gestures around him, probably indicating maps you can't see. "We're already the government here. It's a battered, war-torn country, but it's a country. If I start levying taxes here, it'll keep my men and women fed. And clothed. And in something like the status they deserve." And, he does not need to add, General ${V.peacekeepers.generalName} will be a powerful warlord.`]);
		App.Events.addParagraph(node, [`"But," he says. "But. This is going to be difficult. I can't be sure I'll succeed. As for me, I'd take the chance and be damned, just for the chance to tell the politicians back home what they can do with their orders. But there's my men and women. They'll do what I ask, but I won't ask it of them without a good, solid chance." His eyes narrow. "I need funding, and I need it now. I can't offer anything in return, not right away. But I pay my debts. And we'll be a buffer between external threats and the Free City. And finally, any resentment about old world power in the area among your people will be wiped away overnight."`]);

		const smallAid = 100000;
		const generousAid = 250000;
		const choices = [];
		if (V.cash >= smallAid) {
			choices.push(new App.Events.Result(`Provide immediate assistance`, assistance, `This will cost ${cashFormat(smallAid)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the ¤ to make any meaningful contribution.`));
		}
		if (V.cash >= generousAid) {
			choices.push(new App.Events.Result(`Deliver generous aid`, generous, `This will cost ${cashFormat(generousAid)}`));
		}
		choices.push(new App.Events.Result(`Decline to support him`, decline));

		App.Events.addResponses(node, choices);

		function assistance() {
			const frag = new DocumentFragment();
			cashX(-smallAid, "peacekeepers");
			V.peacekeepers.strength = 50;
			V.peacekeepers.attitude += 5;
			V.peacekeepers.undermining = 0;
			V.fcnn.push("...asking: how many will follow the precedent set by the peacekeeping force in...");
			App.Events.addParagraph(frag, [`You immediately wire General ${V.peacekeepers.generalName} ${cashFormat(smallAid)}, not an impressive sum by Free Cities standards, but probably enough to turn the scales in his plans to keep his force together as it transitions from old world peacekeeping to autocratic nation building. Soon enough, he'll be able to support his men and women through armed extortion, the original form of taxation and, arguably, the only form of taxation.`]);
			App.Events.addParagraph(frag, [`"You have my thanks," he says formally. "We'll be in control here soon enough. The one thing we'll have an almost limitless supply of is people. I don't think anyone's likely to notice a few menial slaves transferred into the Free City. I'm sure a regular trade already exists; we'll just be adding a few undesirables to it." He ends the call, looking determined. Despite his confidence, he has his work cut out for him.`]);
			return frag;
		}

		function generous() {
			const frag = new DocumentFragment();
			cashX(-generousAid, "peacekeepers");
			V.peacekeepers.strength = 50;
			V.peacekeepers.attitude += 25;
			V.peacekeepers.undermining = 0;
			V.fcnn.push("...asking: how many will follow the precedent set by the peacekeeping force in...");
			App.Events.addParagraph(frag, [`You immediately wire General ${V.peacekeepers.generalName} ${cashFormat(generousAid)}, enough to keep his force together through the critical period as it transitions from old world peacekeeping to autocratic nation building. Soon enough, he'll be able to support his men and women through armed extortion, the original form of taxation and, arguably, the only form of taxation.`]);
			App.Events.addParagraph(frag, [`"That's extremely generous of you," he says, with an undertone of relief. "This is going to go much more smoothly than I'd originally thought. And I see that we're going to have friends and allies out here, as we establish ourselves. We're going to have quite a few undesirables to rid ourselves of, here, and the menial slave trade between this area and the Free City seems like an opportune way to do that." He ends the call, looking confident.`]);
			return frag;
		}

		function decline() {
			return `You inform General ${V.peacekeepers.generalName} that you will not be providing assistance. He does not falter, but he looks suddenly older, as though the prospect of a decisive strike was giving him the strength to carry on. He expresses his regrets dully, and then ends the call.`;
		}
	}
};
