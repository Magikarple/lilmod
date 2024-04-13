App.Events.SEProjectNComplete = class SEProjectNComplete extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.status === 5,
			() => App.Events.effectiveWeek() >= V.projectN.phase4 + 4
		];
	}

	execute(node) {
		V.bodyPuristRiot = 1;
		V.projectN.public = 1;

		const slave = growCatgirl("XX", {minAge: 16, maxAge: 16});
		slave.origin = "$He is a vat-grown catgirl, the world's first. You painstakingly grew $him yourself over months in the expensive Project N, a cutting-edge biotechnology experiment led by Doctor Nieskowitz.";
		slave.face = random(75, 100);
		slave.slaveName = V.subjectDeltaName;
		slave.birthName = V.subjectDeltaName;
		slave.hColor = "white";
		slave.override_H_Color = 1; // TODO: Identifier 'override_H_Color' is not in camel case
		slave.origHColor = "white";
		slave.skin = "pure white";
		slave.origSkin = "pure white";
		slave.override_Skin = 1; // TODO: Identifier 'override_Skin' is not in camel case
		slave.boobs = 300;
		slave.natural.boobs = 300;
		slave.earTColor = slave.hColor;
		slave.tailColor = slave.hColor;

		App.Events.addParagraph(node, [`It's finally time. Nieskowitz greets you with a rare smile as you enter the genetics lab, showing you to the tube where ${V.subjectDeltaName} floats unconscious. Far from the blob of pinkish flesh she once was, ${V.subjectDeltaName} is now a fully-formed humanoid, covered in a layer of beautiful, snow-white fur and topped with twitching, pointed cat ears. You can hear the bustle of the media, journalists who somehow found out about ${V.subjectDeltaName}'s near completion and are all but breaking down the lab's door trying to get a good look in.`]);
		App.Events.addParagraph(node, [`"Be aware that she won't have any instinctive knowledge of our language. Frankly, I don't know if she'll be capable of real human speech at all, honestly. This is a first for me, too. Try and keep her away from any cameras in her face, they're likely to frighten her. Anyway, I guess she's ready. Are you?"`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Lead ${V.subjectDeltaName} out from the lab, talking to media for her`, talkMedia),
			new App.Events.Result(`Force the media to disperse before leaving with ${V.subjectDeltaName}`, noMedia),
			new App.Events.Result(`Let the media get a good look at ${V.subjectDeltaName} as you leave`, lookMedia)
		]);

		function talkMedia() {
			repX(2000, "event");
			V.projectN.status = 6;
			slave.prestige = 1;
			slave.prestigeDesc = "$He was the world's very first catgirl, plastered all over the world within days of $his 'birth' as proof of your arcology's scientific superiority.";
			slave.devotion += 5;
			slave.trust += 5;
			newSlave(slave);
			return `The watching scientists hold their breath as the green liquid drains from the tube, and ${V.subjectDeltaName} hits the glass wall with an unglamorous thud. As the tube comes up, you carefully catch the white catgirl, feeling the silk-like softness of her entire body as the young vat-grown girl opens her eyes for the first time. She blinks her big, catlike eyes a few times, and then meows at you loudly, probably the closest thing she can manage to a question. In response, you set her down on wobbly feet, take her by the hand, and lead her out the doors of the genelab to meet an absolute hail of journalists with cameras and bright flashing lights shoving microphones and recorders in both of your faces. As the terrified, nude catgirl recoils from the confusing sound and noise, you promptly divert the recording devices towards your own face, explaining that she's in no state to speak for herself but you'll gladly take questions. Speaking with the media on such a momentous scientific occasion <span class="green">improves your reputation</span> while ${V.subjectDeltaName}, interpreting your diversion as protecting her from the bright lights and scary noises, immediately <span class="hotpink">likes</span> and <span class="mediumaquamarine">trusts</span> you more.`;
		}

		function noMedia() {
			V.projectN.status = 6;
			slave.devotion += 20;
			slave.trust += 20;
			newSlave(slave);
			return `The watching scientists hold their breath as the green liquid drains from the tube, and ${V.subjectDeltaName} hits the glass wall with an unglamorous thud. As the tube comes up, you carefully catch the white catgirl, feeling the silk-like softness of her entire body as the young vat-grown girl opens her eyes for the first time. She blinks her big, catlike eyes a few times, and then meows at you loudly, probably the closest thing she can manage to a question. In response, you set her down on wobbly feet, take her by the hand, and lead her out the doors of the genelab to meet an absolute hail of journalists with cameras and bright flashing lights shoving microphones and recorders in both of your faces. As the terrified, nude catgirl recoils from the confusing sound and noise, you tell the media that Dr. Nieskowitz will be handling their questions and you'll have anyone who tries to interrupt or scare you two on the way back to the penthouse arrested. Although you miss the chance to improve your reputation or use ${V.subjectDeltaName} for propaganda, she stares at you with big, catlike eyes as you lead her away from the crowd, full of obvious, immediate <span class="hotpink">affection</span> and <span class="mediumaquamarine">admiration.</span>`;
		}

		function lookMedia() {
			V.projectN.status = 6;
			repX(5000, "event");
			slave.prestige = 2;
			slave.prestigeDesc = "$He was the world's very first catgirl, plastered all over the world within days of $his 'birth' as proof of your arcology's scientific superiority.";
			slave.devotion -= 30;
			slave.trust -= 30;
			newSlave(slave);
			return `The watching scientists hold their breath as the green liquid drains from the tube, and ${V.subjectDeltaName} hits the glass wall with an unglamorous thud. As the tube comes up, you carefully catch the white catgirl, feeling the silk-like softness of her entire body as the young vat-grown girl opens her eyes for the first time. She blinks her big, catlike eyes a few times, and then meows at you loudly, probably the closest thing she can manage to a question. In response, you set her down on wobbly feet, take her by the hand, and lead her out the doors of the genelab to meet an absolute hail of journalists with cameras and bright flashing lights shoving microphones and recorders in both of your faces. As the terrified, nude catgirl recoils from the confusing sound and noise, you promptly push her forward, allowing the media to explore every last inch of her naked body while you answer questions. She's obviously <span class="red">terrified</span> at the cameras in her face and crotch, not that the journalists seem to care, and although they get a <span class="green">whole array of perfect footage</span> as you ignore ${V.subjectDeltaName}'s loud, desperate meowing, you're forced to break off the impromptu interview session early when ${V.subjectDeltaName} starts <span class="gold">crying</span> as photos flash in her face. She's completely nonresponsive to your attempts to get her to stop bawling as the watching journalists awkwardly shuffle, and only stops sobbing loudly when you bring her away from the assembled crowd. As you lead ${V.subjectDeltaName} back to the penthouse, still sniffling and mrowling intermittently, she stares sullenly at you with big catlike eyes that only understand that you've <span class="red">somehow betrayed her.</span>`;
		}
	}
};
