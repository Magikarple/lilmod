App.Events.RECIUgly = class RECIUgly extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => this.validSlave(s),
				s => s.face >= -10,
				s => (s.assignment === Job.PUBLIC || s.assignment === Job.WHORE),
				s => s.devotion >= 10,
				s => (Beauty(s) >= 50),
				s => s.bodySwap === 0,
				s => s.porn.prestige === 0,
				canSee,
				canStand,
				canTalk,
				canHear,
				hasAnyArms,
			]
		];
	}

	validSlave(slave) {
		return V.RECheckInIDs.some((a) => (a.ID === slave.ID && a.type === "ugly"));
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {He, he, His, his, him, himself, girl} = getPronouns(eventSlave);
		const {title: Master, say: say} = getEnunciation(eventSlave);
		const freeMovement = (canWalk(eventSlave) || (canMove(eventSlave) && eventSlave.rules.mobility === "permissive"));

		V.RECheckInIDs.deleteWith((s) => s.ID === eventSlave.ID && s.type === "ugly");

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave, "no clothing");
		node.appendChild(artDiv);

		let t = [];
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		if (freeMovement) {
			t.push(`comes`);
		} else {
			t.push(`is walked`);
		}
		t.push(`in for an inspection. You have a relaxed day scheduled, so you take the time to do an unusually thorough job. On a whim, you pull up ${his} complete file, flipping the virtual pages out across your desk. The induction pictures are particularly striking. ${He} doesn't look much like that, anymore, and that's a good thing. ${He} was not a pretty ${girl} when you got ${him}, though ${he}'s pretty enough now. With a desk control gesture you flip a full frontal shot of ${him} on the day of ${his} enslavement up onto a wallscreen.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`${His} ${App.Desc.eyesColor(eventSlave)} track your sudden motion, of course, and ${he} follows it to the screen. Suddenly, the ${SlaveTitle(eventSlave)} is eye to eye with a life-size picture of who ${he} used to be, just a few`);
		if (V.showInches === 2) {
			t.push(`feet`);
		} else {
			t.push(`meters`);
		}
		t.push(`away. ${He} gasps with recognition, and then ${his} face clouds inscrutably. ${He}`);
		if (freeMovement) {
			t.push(`takes a couple of hesitant steps`);
		} else {
			t.push(`hesitates for a moment before struggling`);
		}
		t.push(`forward, and then reaches out to touch the cheek of the ${girl} in the picture.`);
		if (hasBothArms(eventSlave)) {
			t.push(`As ${his} fingertips brush the smooth surface of the wallscreen, ${his} other hand ghosts along ${his} own face.`);
		} else {
			t.push(`${His} fingertips brush the smooth surface of the wallscreen, before ghosting along ${his} own face.`);
		}
		t.push(`${His} expression is not sad, so it's surprising when a single tear rolls down ${his} cheek. You order ${him} to tell you how the picture makes ${him} feel.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`${He} looks pensive, and goes through two false starts before ${he} clears ${his} throat, wrenches ${his} gaze away from ${his} picture, and ${say}s introspectively,`);
		t.push(Spoken(eventSlave, `"${Master}, it's strange. We — we don't have pictures of ourselves, from before we were enslaved. I didn't really realize how much I'd changed. Some days being a slave is hard. But seeing that picture, it makes me feel better about it. You — you're really ${V.PC.title === 1 ? "handsome" : "pretty"}, ${Master}. I bet you always were."`));
		t.push(`${He} inclines ${his} head towards the homely ${girl} on the screen.`);
		t.push(Spoken(eventSlave, `"It's hard to be ugly, ${Master}. Really hard. I feel sorry for that ${girl}, and I'm glad I don't look like ${him} anymore."`));
		t.push(`${He} laughs suddenly, a little self-consciously.`);
		t.push(Spoken(eventSlave, `"The crazy thing is if you'd told that ${girl} that`));
		if (eventSlave.assignment === Job.WHORE) {
			t.push(Spoken(eventSlave, `lots and lots of people would pay to fuck ${him}`));
		} else {
			t.push(Spoken(eventSlave, `all kinds of people would happily fuck ${him}`));
		}
		t.push(Spoken(eventSlave, `someday, ${he} wouldn't have believed you. It's kind of reassuring, actually. Is that weird? That came out weird. Sorry."`));
		App.Events.addParagraph(node, t);


		App.Events.addResponses(node, [
			new App.Events.Result(`${He}'s pretty enough to decorate your arm for a night out`, nightOut),
			new App.Events.Result(`Show ${him} off online`, livestreaming)
		]);

		function nightOut() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "a mini dress");

			let frag = document.createDocumentFragment();

			t = [];
			t.push(`You tell ${him} to head down to the wardrobe and put on the outfit that'll be laid out for ${him} there. ${He} obeys promptly, but does not return for some time, having gotten instructions from ${V.assistant.name} along the way to put extra effort into ${his} grooming. When ${he} finally returns, the effect is striking.`);
			if (eventSlave.face > 10) {
				t.push(`${He}'s a gorgeous ${girl} with or without makeup, dressed up or naked, but ${he}'s especially luscious tonight.`);
			} else {
				t.push(`${His} face is not flawless, but ${he}'s conscious of ${his} transformation, and the new confidence in ${his} beauty adds a special glow that cannot be faked.`);
			}
			t.push(`${His} evening dress is elegant; it's quite slutty by old world standards, but according to Free Cities fashion, it's just about the most conservative gown a slave can be expected to wear, and quite daring in that it isn't immediately obvious whether ${he}'s a slave or not.`);
			if (eventSlave.areolae < 3) {
				t.push(`The tops of ${his} areolae are hardly even visible.`);
			}
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`You take ${him} out to a nice lounge, with blue-toned light and soft music. ${He} clings to your arm, pressing ${himself} against you just the right amount: not enough to demand sex right now, but enough to raise the anticipation of it later. ${He}'s a slave, so ${he} does not eat or drink the usual fare on offer, but the establishment is used to slaves and offers flavorful variation on liquid slave food. ${He} drinks the translucent fluid out of a tall glass, carefully maintaining ${his} poise. You circulate, leaving ${him} at the bar when acquaintances appear. ${He} perches on a stool, conscious of and pleased by the discreet admiration of ${his} body, delectably outlined by the tight dress. Once a new arrival who did not see you with ${him} introduces himself to ${him}. He's tall and fit and silver-haired, but he picked ${him} out of the room to approach, and it's with polite disappointment that he reacts to ${his} indication of you, across the room:`);
			t.push(Spoken(eventSlave, `"I'm sorry, Sir, that's my ${Master} there."`));
			t.push(`He offers a nonverbal apology without coming over, which you accept with a wave: it's such a common mistake in Free Cities high society that it's universally brushed off without offense. It happens again later in the night, when a slightly tipsy free woman occupies the barstool next to ${eventSlave.slaveName}'s and keeps trying to relax against ${him} until the flattered slave explains ${himself} again. When you bring ${him} home at the end of the night, ${his}`);
			if (hasBothEyes(eventSlave)) {
				t.push(`eyes are`);
			} else {
				t.push(`eye is`);
			}
			t.push(`shining with <span class="trust inc">private assurance,</span> and ${he} presses ${himself} against you more closely than ever.`);
			App.Events.addParagraph(frag, t);

			eventSlave.trust += 4;

			return frag;
		}

		function livestreaming() {
			t = [];
			t.push(`You tell ${him} that ${he}'s become a very pretty sex slave, and to prove it, you`);
			if (eventSlave.porn.feed > 0) {
				t.push(`let ${him} believe you've`);
			}
			t.push(`set up a live feed for ${him} that's available for free in the old world.`);
			if (eventSlave.porn.feed === 0) {
				t.push(`The Free Cities produce an utter torrent of hardcore video, so much that there's never any profit to be made off it anymore, but viewers begin to join the channel anyway and by the end of the week`);
			} else {
				t.push(`${He} already has a growing fanbase, and with the promise of a week of special content, even more join the channel to observe. Before long,`);
			}
			t.push(`${he} has thousands of eyes watching ${him} as ${he}`);
			if (eventSlave.assignment === Job.WHORE) {
				t.push(`sells ${his} body`);
			} else {
				t.push(`has sex with random citizens`);
			}
			t.push(`in the hallways of ${V.arcologies[0].name}. ${capFirstChar(V.assistant.name)} keeps ${him} constantly informed of how many people are watching ${him} get fucked, how many of them are likely masturbating to ${his} body, and how many inquiries about ${him} ${V.assistant.name} is culling out of your inbox. ${He} slowly gets used to ${his} starring role in an impromptu free hardcore stream, but never quite stops stealing wondering glances at the nearest camera, as though ${he} cannot believe that so many people would sexualize ${him}. This lends ${him} a naughtiness that cannot be faked, garnering ${him} <span class="reputation inc">much attention</span> by the end of the week.`);
			if (eventSlave.fetish === "humiliation" && eventSlave.fetishStrength > 60) {
				if (eventSlave.fetishKnown === 1) {
					t.push(`Of course, since ${he}'s a humiliation fetishist, this experience is like sexual candy for ${him}. ${He} <span class="devotion inc">can't get enough.</span>`);
				} else {
					t.push(`Oddly enough, <span class="devotion inc">${he} seems to enjoy it far more than anticipated.</span>`);
				}
				eventSlave.devotion += 4;
			}
			if (eventSlave.porn.feed === 0) {
				repX(1250, "event", eventSlave);
			} else {
				repX(500, "event", eventSlave);
				eventSlave.porn.viewerCount += 7000;
			}
			return t;
		}
	}
};
