App.Events.SEFctvInstall = class SEFctvInstall extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() >= 5,
			() => V.FCTV.receiver === -1
		];
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "FCTV";
		V.FCTV.receiver = 0;
		App.Events.addParagraph(node, [`You've been sitting in your office into the early afternoon, going over bothersome lease documents that need your approval. When you take a break to look out the window, ${V.assistant.name} speaks up. "${properTitle()}, you have received an approval welcome packet from 8HGG Inc. in regards to Free Cities TV. It seems that they've determined that ${V.arcologies[0].name} is now sufficiently developed enough to warrant an FCTV-Citizen connection. All the details and contracts necessary are included in the packet. From there, a receiver will need to be built onto ${V.arcologies[0].name} in order to access FCTV."`]);

		App.Events.addParagraph(node, [`You browse the guide: home shopping networks, random dramas, how-to shows and a myriad of other things. Of more interest are some of the programs showing glimpses into foreign arcologies and how they are using the service to help mold society.`]);

		App.UI.DOM.appendNewElement("p", node, `While FCTV attempts to exclude any dick-based, pregnancy, hyperpregnancy, and extreme content based on your settings, it may still hint at that content, especially the more mundane of it. If you wish to be absolutely sure, don't watch FCTV or do not install the receiver.`, "note");
	}
};
