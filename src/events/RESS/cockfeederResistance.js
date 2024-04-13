App.Events.RESSCockFeederResistance = class RESSCockFeederResistance extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.cockFeeder !== 0
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				hasAnyArms,
				s => s.devotion <= 20 && s.devotion >= -50,
				s => s.trust >= -20,
				s => s.fetish !== "cumslut"
			]
		];
	}

	execute(node) {
		let [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const {hisA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
		const {title: Master} = getEnunciation(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(`As you're starting your day, ${V.assistant.name} pauses ${hisA} review of business matters to report that`);
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`is not accepting ${his} breakfast from the phallic feeders in the kitchen. With nothing else urgent, you head down to address the situation. ${eventSlave.slaveName} is in the proper position for feeding, on ${hasBothLegs(eventSlave) ? `${his} knees` : "the ground"} in front of a feeding fuckmachine. ${He} isn't sucking it off for ${his} breakfast, however. ${He} doesn't seem to be fully awake, and is ${canSee(eventSlave) ? "regarding" : "touching"} the big dildo that ${he}'s supposed to suck off for food with vague distaste. ${His} ${eventSlave.faceShape} face is scrunched into a look of tired disgust.`);

		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${He} turns to you as you enter, and ${canSee(eventSlave) ? "seeing" : "realizing"} that it's you, ${he}`);
		if (canTalk(eventSlave)) {
			t.push(`mumbles unhappily, "${Spoken(eventSlave, `Please, ${Master}, please, can I just eat normally for one day? This is, um, kind of gross.`)}"`);
		} else {
			t.push(`uses hesitant gestures to beg you to let ${him} eat normally today. ${His} hand${hasBothArms(eventSlave) ? "s become" : " becomes"} vehement when it comes to the phallus in ${his} face, which ${he} apparently finds disgusting.`);
		}

		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Talk ${him} through it`, talk),
			new App.Events.Result(`Punish ${him} with a bigger feeder`, bigFeeder),
			new App.Events.Result(`Double penetrate ${his} mouth for insolence`, penetrate),
			PC.balls >= 14
				? new App.Events.Result(`Force-feed ${him} with your own cock`, forceFeed)
				: new App.Events.Result()
		]);

		function talk() {
			t = [];

			t.push(`You put as much quiet authority into your ${canHear(eventSlave) ? "voice" : "words"} as you can, and explain to ${him} that ${he} must eat ${his} breakfast this way. You do not explain any of the actual reasons why you require slaves to eat from cocks, but couch your quiet explanation in terms of ${his} life as a slave. You tell ${him} that eating breakfast out of a dick is something you've ordered ${him} to do. ${He} needs to do it. If ${he} does, ${he}'ll be treated well; if ${he} does not, that will oblige you to punish ${him}. You tell ${him} that you would like ${him} to be a good slave, and that it would be disappointing if you had to punish ${him}. You put just a hint of steel into the last sentence, and ${he} stiffens a little at it. Hesitantly, ${he} scoots forward and bends down to take the tip of the big feeder dick in ${his} mouth. Sensing that it's being sucked, it gently presses into ${his} mouth, fucking ${his} ${eventSlave.lips > 95 ? "big-lipped facepussy" : "face"}. Its strokes get longer and faster, until ${he}'s gulping down ${his} breakfast as it's shot down ${his} throat like a huge load.`);

			if (V.suppository !== 0 && eventSlave.drugs !== "no drugs") {
				t.push(`By this time, the kitchen is also dosing ${him} with drugs by fucking ${his} butt with a phallus that ejaculates them for absorption. ${He}'s being spitroasted by the kitchen.`);
			}

			t.push(`Once ${he}'s fully awake, ${he}'s mostly <span class="mediumaquamarine">relieved</span> that you let ${him} get away with hesitation about obedience and took the time to talk ${him} through it.`);

			eventSlave.trust += 4;
			return t;
		}

		function bigFeeder() {
			t = [];

			t.push(`You give the kitchen an order by voice command. ${canHear(eventSlave) ? "It's technical" : `${He} can't hear it`}, so ${he} doesn't understand it, but the meaning becomes clear soon enough. The phallus dangling in ${his} face is withdrawn, and ${he}'s halfway through a shocked "Thank you" when it's replaced by another, noticeably larger one.`);
			if (!canSee(eventSlave)) {
				t.push(`${He} doesn't notice its larger size until it bumps into ${his} cheek, causing ${him} to scoot back.`);
			}
			t.push(`You tell ${him} in deceptively mild ${canHear(eventSlave) ? "tones" : "words"} that you'll keep increasing the size of ${his} feeder until ${he} decides to suck it off like a good little ${desc}, or you run out of size options and are forced to strap ${him} down and push them down ${his} throat. At that point, ${he} might be able to breathe; then again, ${he} might not. ${He} begins to cry, ${his}`);
			if (eventSlave.face > 95) {
				t.push("heartbreakingly beautiful");
			} else if (eventSlave.face > 10) {
				t.push("pretty");
			} else {
				t.push("homely");
			}
			t.push(`face clouding with anguish, but is so <span class="gold">frightened</span> by the threat that ${he} doesn't let ${him} tears distract ${him} from scooting forward to suck off a huge dildo for ${his} breakfast.`);
			if (V.suppository !== 0 && eventSlave.drugs !== "no drugs") {
				t.push(`Once it senses ${he}'s complying, the kitchen starts dosing ${him} with drugs by fucking ${his} butt with a phallus that ejaculates them for absorption. Mercifully, ${he} doesn't try to refuse the anal fuckmachine, and avoids having ${his} asshole filled by a bigger phallus too.`);
			}
			t.push(`${He} keeps the threat in mind, and has a slightly sore throat to <span class="hotpink">help ${him} remember to obey without question.</span>`);

			eventSlave.trust -= 2;
			eventSlave.devotion += 2;
			return t;
		}

		function penetrate() {
			t = [];

			t.push(`You step forward and caress the slave's throat, telling ${him} to suck like a good little ${desc}. You make no threat, but give ${him} the order in a ${canHear(eventSlave) ? "voice of brass" : "commanding manner"}. ${He} knows what you can do to ${him}, and scrabbles forward to obey, <span class="gold">terribly frightened.</span> ${His} fear is justified. You announce that ${he}'s avoided serious punishment, but ${he} still needs correction for ${his} hesitation and insolence. ${He} can't beg or even moan, since ${he}'s being facefucked by the feeder dildo by now, but ${his} ${App.Desc.eyesColor(eventSlave)} widen in terror. ${He} ${canSee(eventSlave) ? `can't watch you, since ${he} can't turn ${his} head,` : "can't see what you are doing,"} so ${he} has almost no time to prepare when you haul ${his} head most of the way off the feeder and shove ${PC.dick !== 0 ? "your own phallus" : "a strap-on"} into ${his} mouth, too. ${He} gags instantly, almost vomiting, but forces ${himself} to relax as you begin to thrust into ${his} throat, alternately with the feeder. The liquid food provides plenty of lubrication, and a lot of liquid for ${him} to gag on, and before long ${he}'s a degraded, humiliating mess. ${He} often clamps ${his} eyes shut as ${he} desperately concentrates on breathing, squeezing the tears out to run down ${his} ${eventSlave.skin} cheeks.`);
			if (V.suppository !== 0 && eventSlave.drugs !== "no drugs") {
				t.push(`You leave the poor slave to take ${his} drugs up the ass, since the kitchen administers those by phallus, too. Fortunately for ${him}, ${he} doesn't object to that.`);
			}

			eventSlave.trust -= 4;
			seX(eventSlave, "oral", PC, "penetrative");
			return t;
		}

		function forceFeed() {
			t = [];

			t.push(`You step forward and pull ${him} away from the feeder, telling ${him} that, since ${he} doesn't like the cockfeeder, ${he} can suck yours like a good little ${desc}. You make no threat, but order ${him} ${canHear(eventSlave) ? "in a steely voice" : "authoritatively"} to suck you off until ${he}'s earned a meal of your cum. ${He} knows what you can do to ${him}, and hurries forward to obey. ${He} rushes to open your clothes and get to work, but pauses when ${canSee(eventSlave) ? `${his} ${App.Desc.eyesColor(eventSlave)} take in your massive testicles.` : `${his} groping hand feels your massive testicles.`} Realizing just how big ${his} meal will be, ${he}'s obviously <span class="gold">frightened.</span> You grab ${his} head, breaking ${him} out of ${his} shocked stillness, and explain that you can't let ${him} starve. If ${he} won't eat out of the feeder, you'll just have to feed ${him} some other way. With that, you ram your cock forward and start fucking ${his}`);
			if (eventSlave.face > 95) {
				t.push("heartbreakingly beautiful");
			} else if (eventSlave.face > 10) {
				t.push("pretty");
			} else {
				t.push("homely");
			}
			t.push(`face. After a few minutes of gagging oral, you start to approach your climax. Your thorough facefucking leaves ${him} unable to beg or even moan, but ${his} eyes widen in terror when ${he} realizes you're about to cum. You don't give ${him} any time to prepare, instead hilting yourself immediately, and letting ${his} throat's desperate attempts to swallow bring you over the edge. You begin your long release of pent-up jizz, spraying deciliter after deciliter of cum down ${his} throat and into ${his} stomach. By the time you've finished, you can tell ${he}'s struggling for air and in pain from the massive quantity of thick fluid in ${his} stomach. You give ${him} a helpful hint before releasing ${him}: "If you take it all the way in your throat, you don't even have to ${canTaste(eventSlave) ? "taste" : "feel"} what it's feeding you." You pull out of ${his} mouth and let ${him} go. ${He} gasps for air and almost immediately vomits some of your cum all over ${himself}, turning ${him} into a degraded, humiliated mess. ${He} lays on the floor and desperately concentrates on breathing, squeezing the tears out of ${his} eyes to run down ${his} ${eventSlave.skin} cheeks.`);
			if (V.suppository !== 0 && eventSlave.drugs !== "no drugs") {
				t.push(`You leave the poor slave to take ${his} drugs up the ass, since the kitchen administers those by phallus, too. Fortunately for ${him}, ${he} doesn't object to that.`);
			}

			eventSlave.trust -= 2;
			seX(eventSlave, "oral", PC, "penetrative");
			return t;
		}
	}
};
