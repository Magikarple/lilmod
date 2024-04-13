App.Events.PRivalryPeacekeepers = (function() {
	return execute;

	function execute() {
		const node = new DocumentFragment();
		App.Events.addParagraph(node, [`This is a busy time, and ${V.assistant.name}'s call prioritization functions are invaluable. You don't have time for everyone. General ${V.peacekeepers.generalName} is fairly high up the list, though. "${PlayerName()}, thank you for taking the time to speak with me," he greets you. "I understand you've got a lot on your plate right now, so I'll be brief. My intel shop has discovered a slaving ring in the area under my control, run by your rival." He gestures to someone out of view, and a limited overview of his intelligence is delivered to ${V.assistant.name}. The general has given you just enough to verify the ownership of the operation. It does indeed belong to the enemy.`]);

		App.Events.addParagraph(node, [`"As I'm sure you know, I'm dealing with a difficult situation here." His gaze is measuring; he's not offering charity, but considering how best to use the resources he has. "If I had an unlimited number of boots on the ground, I'd mop these people up this afternoon. But I don't. As things are, this doesn't even rise into the top hundred items on my priority list. It'd be years. However."`]);

		App.Events.addParagraph(node, [`He leans in. "However, I think it's possible that it may be necessary to reevaluate our situation before too long." He swivels the camera, panning its view across the windows of the office he's in. Outside, the men and women of his expeditionary force can be seen scattered around the base, taking care of the thousand tasks that make up the daily military grind. They're in good condition, but not all of their gear is: it's well-maintained, but worn. They seem sharp, but loose, as though they're silently reevaluating things, too. As he leaves the camera where it is, letting you examine the scene at length, you wonder what kind of calculations the general is making, that he's allowed you to see this.`]);

		App.Events.addParagraph(node, [`"I'm willing to consider myself under an obligation to you," he concludes. "If you'd like, I'd be willing to shift your rival's slaving operation right to the top of my list of priorities. I'm sure that in your Free Cities way of doing things you'll mop them up sooner or later. Or, say the word, and they'll vanish tonight."`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Say the word`, yes),
			new App.Events.Result(`Decline`, no),
		]);
		return node;

		function yes() {
			V.eventResults.peacekeeperHelp = 1;
			V.peacekeepers.attitude = 5;
			V.rival.power += 10;
			return `You thank him for the offer, and agree. He nods and ends the call, noting that he now has a short-fuse operation to lie on. You didn't pay him or give him anything of value, but it would be childish to assume that the progress that will be made tonight in your ongoing struggle to overthrow your rival was free. The general now considers all or almost all of your accumulated influence with him to be discharged. That said, his reluctance to do business with the Free Cities seems to have diminished markedly.`;
		}

		function no() {
			V.eventResults.peacekeeperHelp = -1;
			return `You decline politely. He says he understands, and looks like he understands more than he says; you're in this to win yourself, and he seems like the type to prefer winning his victories at first hand. You'll deal with that slaving operation the same way you've been dealing with the rest of your rival's assets: with money. And the general will continue to think of you as a potential ally.`;
		}
	}
})();
