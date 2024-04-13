App.Events.RESSBreastExpansionBlues = class RESSBreastExpansionBlues extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.drugs === "intensive breast injections" || s.drugs === "hyper breast injections",
				s => s.boobs <= 8000,
				s => s.boobs > 2000,
				s => s.devotion <= 50,
				s => s.devotion >= -50,
				s => s.trust >= -50,
				s => s.fetish !== "boobs",
				s => s.intelligence + s.intelligenceImplant >= -50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const arms = hasBothArms(eventSlave) ? `arms` : `arm`;
		const hands = (hasBothArms(eventSlave)) ? `hands` : `hand`;
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`During ${his} routine weekly inspection,`,
			contextualIntro(PC, eventSlave, true),
			`cradles ${his} huge breasts with ${his} ${arms} whenever the maneuvers of being inspected allow ${him} to do so. It's not an unusual gesture for a ${SlaveTitle(eventSlave)} on breast growth drugs, since slaves whose tits are expanding are, by definition, not used to their weight yet. But ${eventSlave.slaveName} is more than just uncomfortable. ${He} seems to regard ${his} weighty mammaries with distaste.`,
		);
		if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -15) {
			r.push(`${He}'s not stupid, and quickly realizes`);
		} else {
			r.push(`${He}'s an idiot, but ${he}'s not dumb enough to completely miss`);
		}
		r.push(`that you've noticed ${his} feelings about ${his} boobs. ${He} bites ${his} lower lip, not sure if ${he} should say anything, so you follow your usual policy during slave inspections and ask ${him} about it.`);
		if (PC.skill.slaving >= 100) {
			r.push(`If you learned one thing from your long career of slave training, it's that it's`);
		} else {
			r.push(`It's`);
		}
		r.push(`typically best to suss these things out.`);
		r.toParagraph();
		r.push(`"${Master}," ${he} mumbles,`,
			Spoken(eventSlave, `"can I please be taken off the breast expansion drugs?"`),
			`${He} swallows, nervous that ${he}'s crossed a line, but ${he} presses on, hefting ${his} tits a little higher to show ${he}'s talking about them.`,
			Spoken(eventSlave, `"They're so heavy and awkward. I'm sore every night, and my back hurts. I feel like a cow with boobs this big, and I can't imagine what it'll be like if they get any bigger."`)
		);
		r.push(`In one sense, it's amusing that ${he} feels that way, because`);
		if (FutureSocieties.isActive('FSAssetExpansionist') || (FutureSocieties.isActive('FSTransformationFetishist') && !FutureSocieties.isActive('FSSlimnessEnthusiast')) || FutureSocieties.isActive('FSPastoralist')) {
			r.push(`as many slaves in this very arcology know quite well,`);
		}
		r.push(`it's possible for the miracles of modern medicine to grow a ${SlaveTitle(eventSlave)}'s tits until they're so heavy they immobilize ${him} completely.`);
		if (eventSlave.muscles > 5) {
			r.push(`${He} has the muscles to carry ${his} boobs around, so some of this may be simple whining.`);
		} else {
			r.push(`It's not surprising that ${his} breasts would be uncomfortable, since ${he} lacks anything in the way of muscle tone to help support them.`);
		}
		if (eventSlave.lactation > 0) {
			r.push(`${He} complained of feeling like a cow without detectable irony, despite the fact that ${his} left nipple has a`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`droplet of cream clinging to`);
			} else {
				r.push(`rivulet of cream running from`);
			}
			r.push(`it right now.`);
		} else if (eventSlave.preg > eventSlave.pregData.normalBirth/2.66) {
			r.push(`${He} complained of feeling like a cow without detectable irony, despite the fact that ${he} is pregnant and likely to begin lactating soon.`);
		}
		r.push(`${He} waits anxiously for your response, wondering if ${he}'ll be punished for expressing reservations about your expansion of ${his} breasts and, comically, still cradling ${his} heavy udders as ${he} does so.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} know ${he}'ll be growing as fast as possible`, growing),
			(eventSlave.lactation < 2)
				? new App.Events.Result(`Augment ${his} breast growth with lactation implants`, augment, `This option will cost ${cashFormat(V.surgeryCost)}`)
				: new App.Events.Result(),
			(canGetPregnant(eventSlave) && PC.dick !== 0)
				? new App.Events.Result(`Give ${his} bust a boost by knocking ${him} up`, boost, virginityWarning())
				: new App.Events.Result(),
			new App.Events.Result(`Praise ${his} breasts and reassure ${him}`, praise),
			(eventSlave.nipples !== "fuckable")
				? new App.Events.Result(`Weight ${his} breasts as punishment`, punishment)
				: new App.Events.Result(),
		]);

		function growing() {
			const {
				heA, hisA, himA, himselfA
			} = getPronouns(assistant.pronouns().main).appendSuffix('A');
			const r = new SpacedTextAccumulator();
			r.push(`Rather than punishing ${him} directly, you address yourself to your personal assistant. You order ${himA} to make a note in ${eventSlave.slaveName}'s drug schedule that ${he}'s to remain on a breast expansion regime until further notice. The ${SlaveTitle(eventSlave)}'s face falls as ${he}`);
			if (canHear(eventSlave)) {
				r.push(`hears this, and ${V.assistant.name}`);
			} else if (canSee(eventSlave)) {
				r.push(`reads this order on a small screen provided by ${V.assistant.name}, who`);
			} else {
				r.push(`slowly realizes this, and ${V.assistant.name}`);
			}
			r.push(`doesn't help matters by`);
			if (V.assistant.personality <= 0) {
				r.push(`confirming the order in disturbingly clinical tones.`);
			} else if (V.assistant.appearance === "monstergirl") {
				r.push(`using ${hisA} avatar's tentacle hair to caress ${hisA} own tits as ${heA} concurs in disturbingly kind tones.`);
			} else if (V.assistant.appearance === "shemale") {
				r.push(`shaking ${hisA} avatar's enormous endowments, making a lewd comment, and then giving ${himselfA} a titjob.`);
			} else if (V.assistant.appearance === "amazon") {
				r.push(`observing that a good slave ${girl} should have big tits, since strong warriors like fertile, big-boobed ${girl}s back home to breed with.`);
			} else if (V.assistant.appearance === "businesswoman") {
				r.push(`having ${hisA} avatar give ${eventSlave.slaveName} a disturbingly appraising glance, as though ${he} and ${his} breasts are an interesting entry on a balance sheet.`);
			} else if (V.assistant.appearance === "schoolgirl") {
				r.push(`bending ${hisA} avatar over to show off ${hisA} cleavage, and then giving ${hisA} tits a jiggle, as though the point wasn't clear enough already.`);
			} else if (V.assistant.appearance === "goddess") {
				r.push(`hefting ${hisA} own motherly breasts and telling ${eventSlave.slaveName} that ${he} should be happy, since bigger breasts are a sign of health and fertility.`);
			} else if (V.assistant.appearance === "hypergoddess") {
				r.push(`massaging ${hisA} own heaving breasts and telling ${eventSlave.slaveName} that ${he} should be happy, since bigger breasts are a sign of health and fertility.`);
			} else if (V.assistant.appearance === "loli") {
				if (V.assistant.fsAppearance === "asset expansionist") {
					r.push(`playing with ${hisA} oversized breasts under ${hisA} swimsuit and telling ${eventSlave.slaveName} that being busty is amazing.`);
				} else if (V.assistant.fsAppearance === "pastoralist") {
					r.push(`cupping ${hisA} pitiful milk nubs and telling ${eventSlave.slaveName} that if ${heA} was in ${his} shoes ${heA} would be soo happy to be busty.`);
				} else if (V.assistant.fsAppearance === "transformation fetishist") {
					r.push(`playing with ${hisA} absurd implants and telling ${eventSlave.slaveName} that being busty is great, though ${he}'d look better with big fake balloons for breasts.`);
				} else {
					r.push(`cupping ${hisA} nonexistent breasts and telling ${eventSlave.slaveName} that if ${heA} was in ${his} shoes ${heA} would be soo happy to be busty.`);
				}
			} else if (V.assistant.appearance === "preggololi") {
				if (V.assistant.fsAppearance === "asset expansionist") {
					r.push(`playing with ${hisA} oversized breasts under ${hisA} swimsuit and telling ${eventSlave.slaveName} that being busty is amazing.`);
				} else if (V.assistant.fsAppearance === "pastoralist") {
					r.push(`cupping ${hisA} milky handfuls and telling ${eventSlave.slaveName} that if ${heA} was in ${his} shoes ${heA} would be soo happy to be that busty.`);
				} else if (V.assistant.fsAppearance === "transformation fetishist") {
					r.push(`playing with ${hisA} absurd implants and telling ${eventSlave.slaveName} that being busty is great, though ${he}'d look better with big fake balloons for breasts.`);
				} else {
					r.push(`cupping ${hisA} tiny breasts and telling ${eventSlave.slaveName} that if ${heA} was in ${his} shoes ${heA} would be soo happy to be busty.`);
				}
			} else if (V.assistant.appearance === "fairy") {
				r.push(`groping the air as if there were an imaginary pair of tits in front of ${himA} and telling ${eventSlave.slaveName} that ${his} oversized funbags would be wonderful for ${himA} to bounce and play on.`);
			} else if (V.assistant.appearance === "pregnant fairy") {
				r.push(`bouncing on the balls of ${hisA} feet to emphasize ${hisA} own small but bouncy breasts and giving ${eventSlave.slaveName} a knowing wink.`);
			} else if (V.assistant.appearance === "angel") {
				r.push(`loudly musing how many hungry children ${eventSlave.slaveName} could feed and how many more could be added to that number.`);
			} else if (V.assistant.appearance === "cherub") {
				r.push(`making groping gestures at ${eventSlave.slaveName}'s tits.`);
			} else if (V.assistant.appearance === "incubus") {
				r.push(`shouting lewd comments about ${eventSlave.slaveName}'s tits while masturbating furiously.`);
			} else if (V.assistant.appearance === "succubus") {
				if (V.assistant.fsAppearance === "asset expansionist") {
					r.push(`openly groping ${hisA} own immense breasts while dropping comments about how big you like 'em.`);
				} else if (V.assistant.fsAppearance === "pastoralist") {
					r.push(`openly groping ${hisA} milk-filled quad-breasts while dropping comments about how you love 'em big and milky.`);
				} else if (V.assistant.fsAppearance === "transformation fetishist") {
					r.push(`openly groping ${hisA} own immense chest balloons while dropping comments about filling ${eventSlave.slaveName} with the biggest implants possible.`);
				} else {
					r.push(`pushing ${hisA} breasts together and shaking them back and forth as they steadily swell.`);
				}
			} else if (V.assistant.appearance === "imp") {
				r.push(`making pinching gestures at ${eventSlave.slaveName}'s nipples and pretending to slap all that tit flesh.`);
			} else if (V.assistant.appearance === "witch") {
				if (V.assistant.fsAppearance === "asset expansionist") {
					r.push(`casting a spell and bloating ${hisA} breasts to insane proportions.`);
				} else if (V.assistant.fsAppearance === "pastoralist") {
					r.push(`running ${hisA} hands across ${hisA} many breasts, tweaking a nipple here and rubbing a tit there.`);
				} else if (V.assistant.fsAppearance === "transformation fetishist") {
					r.push(`bouncing ${hisA} oversized and overly round breasts back and forth.`);
				} else {
					r.push(`pulling down the top of ${hisA} dress to reveal ${hisA} ample cleavage.`);
				}
			} else if (V.assistant.appearance === "ERROR_1606_APPEARANCE_FILE_CORRUPT") {
				r.push(`reshapes ${hisA} arms into a pair of suckers and multiple needles designed to inject prey with growth accelerants as ${heA} slowly moves towards ${eventSlave.slaveName}.`);
			} else {
				r.push(`purring that ${heA}'d love to.`);
			}
			r.push(`You talk through ${eventSlave.slaveName}'s medical condition with ${him}, and give ${him} a`);
			if (PC.skill.medicine >= 100) {
				r.push(`personal examination with the speed and accuracy of years of general practice.`);
			} else {
				r.push(`thorough exam.`);
			}
			r.push(`Once this is done, you give ${V.assistant.name} technical directions to make minor changes to ${eventSlave.slaveName}'s drug regime, designed to make ${his} <span class="lime">breasts grow just slightly faster.</span> The effect is minimal, but the point is made. ${He}'s still not happy to be transformed into a big-breasted sex slave, but ${he}'s relieved that was ${his} only punishment for expressing ${his} unhappiness about it.`);
			if (eventSlave.geneMods.NCS === 0) {
				eventSlave.boobs += 100;
			} else {
				eventSlave.boobs += 50;
			}
			r.toParagraph();
			return r.container();
		}

		function augment() {
			eventSlave.trust -= 5;
			eventSlave.lactation = 2;
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", eventSlave);
			surgeryDamage(eventSlave, 10);
			return `You announce that you're resolved to continue growing ${his} breasts, and since ${he} feels like a cow, plan to help ${him} fulfill ${his} image of ${himself}. ${He}'s experienced enough to know not to question what that means, just to <span class="trust dec">fear the intent behind it.</span> ${He}'s right to worry, as you drag ${him} to the remote surgery for an impromptu lactation implant installation. When ${he} comes to, ${he} immediately realizes ${his} breasts are larger than ever. As ${he} brings a hand to each of the full mounds, a moan laced with relief and disdain escapes ${his} lips; along with a strong gush of milk from ${his} engorged breasts. ${He} has been taught a harsh lesson about questioning your will, a lesson ${he} will be reminded of every time ${he} has to empty ${his} ever-swelling breasts of their excessive milk. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`;
		}

		function boost() {
			const r = new SpacedTextAccumulator();
			r.push(`You announce that you're resolved to continue growing ${his} breasts, and plan to increase their rate of growth in the coming months. ${He}'s experienced enough to know not to question what that means, just to <span class="trust dec">fear the intent behind it.</span> ${He}'s right to worry, as you easily tip ${him} off balance and to the ground; mounting ${his}`);
			if (eventSlave.mpreg === 1) {
				if (eventSlave.anus === 0) {
					r.push(`virgin`);
				} else {
					r.push(`exposed`);
				}
				r.push(`ass`);
			} else {
				if (eventSlave.vagina === 0) {
					r.push(`virgin`);
				} else {
					r.push(`exposed`);
				}
				r.push(`pussy`);
			}
			r.push(`as ${he} struggles to lift ${his} swollen breasts from the floor.`);
			if (eventSlave.mpreg === 1) {
				r.push(VCheck.Anal(eventSlave, 10));
			} else {
				r.push(VCheck.Vaginal(eventSlave, 10));
			}
			r.push(`${He}`);
			if (eventSlave.voice > 0) {
				r.push(`squeals`);
			} else {
				r.push(`rasps`);
			}
			r.push(`with displeasure as you roughly plow ${him} into ${his} distended breasts until you cum deep inside ${his} fertile hole. You return to your desk, leaving ${him} to sob into ${his} unwelcome bust as cum pools from ${his} abused`);
			if (eventSlave.mpreg === 1) {
				r.push(`ass.`);
			} else {
				r.push(`pussy.`);
			}
			r.push(`${He} knows full well what you meant now, and <span class="devotion inc">lets you have your way</span> with ${his} body every time you catch ${him} in a vulnerable moment or complaining about ${his} tits. By the week's end, scans reveal that your seed has taken root; <span class="lime">${he}'s pregnant.</span> As ${his} breasts grow to feed ${his} coming child, ${he} will likely be too distracted by ${his} swelling middle to complain about their added weight.`);
			eventSlave.trust -= 5;
			eventSlave.devotion += 5;
			knockMeUp(eventSlave, 100, 2, -1);
			r.toParagraph();
			return r.container();
		}

		function virginityWarning() {
			if (eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0 && eventSlave.mpreg === 1) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function praise() {
			const r = new SpacedTextAccumulator();
			r.push(`You decide to reassure ${him}, and sit ${him} on your lap`);
			if (PC.belly >= 100000) {
				r.push(`as best ${he} can`);
			}
			r.addToLast(`.`);
			if (eventSlave.height > 185) {
				r.push(`${He}'s a big ${girl}, and has trouble fitting there, but you put ${him} there anyway, enjoying the absurdity.`);
			} else if (eventSlave.bellyPreg >= 1500) {
				r.push(`${His} pregnancy is very apparent to you in this posture, and ${he}'s quite aware of it too.`);
			} else if (eventSlave.butt > 3) {
				r.push(`${His} big soft butt is nice and comfortable on your thighs.`);
			} else {
				r.push(`${He}'s hesitant, but obeys anyway.`);
			}
			r.push(`Pulling ${him} back against your`);
			if (PC.belly > 1500) {
				r.push(`pregnant belly,`);
			} else if (PC.boobs >= 300) {
				r.push(`own bosom,`);
			} else if (PC.title === 0) {
				r.push(`flat chest,`);
			} else {
				r.push(`muscular chest,`);
			}
			r.push(`you reach around ${him} and take over the breast-cradling responsibilities. You say nothing for a while, just hefting ${his} weighty udders, rolling them from side to side slightly. After letting ${him} get used to the gentle treatment, you tell ${him} that you're ${his} owner, and you find big breasts very attractive. You tell ${him} that you understand that they can be uncomfortable at times, but you expect ${him} to tolerate that without complaint. It isn't easy to be pretty, but it's easier to be a pretty slave than to be a homely one. This last point affects ${him}, and ${he} seems to <span class="trust inc">take heart in the idea that you're improving ${him},</span> at least from your perspective. After all, ${he}'s sitting atop`);
			if (PC.dick !== 0) {
				r.push(`your hard dick, which ${he} can definitely feel`);
			} else {
				r.push(`your hot cunt, which ${he} can probably detect`);
			}
			r.push(`through your clothes. ${He} does understand that having ${his} ${getWrittenTitle(eventSlave)} enjoy touching ${his} boobs will be advantageous to ${him}.`);
			eventSlave.trust += 5;
			if (eventSlave.lactation > 0) {
				eventSlave.lactationDuration = 2;
				eventSlave.boobs -= eventSlave.boobsMilk;
				eventSlave.boobsMilk = 0;
			} else {
				r.push(induceLactation(eventSlave, 3));
			}
			r.toParagraph();
			return r.container();
		}

		function punishment() {
			const r = new SpacedTextAccumulator();
			r.push(`You announce that you're resolved to continue growing ${his} breasts, and they need to be stretched out to accommodate the growth. The statement is absurd, but ${he}'s experienced enough to know not to question it, and to <span class="trust dec">be afraid.</span> ${He}'s right to fear. You secure ${him} with ${his} ${hands} over ${his} head, using the wrist shackles placed high on the office walls for this purpose. Then you`);
			if (eventSlave.nipples === "inverted") {
				r.push(`cruelly pop ${his} inverted nipples out and`);
			}
			if (eventSlave.piercing.nipple.weight === 0) {
				r.push(`attach a clip to each of`);
				if (eventSlave.nipples === "inverted") {
					r.push(`them.`);
				} else {
					r.push(`${his} nipples.`);
				}
				r.push(`The clips aren't painful, not yet, but they're very robust, and the reason is immediately apparent to ${him}.`);
			} else if (eventSlave.piercing.nipple.weight === 1) {
				r.push(`remove ${his} nipple piercings, one by one, and replace them with big rings. Then you give each of them a tug to ensure it's ready to bear some serious pulling.`);
			} else {
				r.push(`give each of ${his} nipple rings a tug to ensure it's ready to bear some serious pulling.`);
			}
			r.push(`You hang a weight from each, eliciting a moan of pain. ${eventSlave.slaveName} struggles against the restraints that hold ${his} ${hands} up high, desperately trying to find a comfortable way to stand, but it's impossible and the motion sets ${his} udders swaying, making the weights pulling at ${his} nipples even more uncomfortable.`);
			switch (eventSlave.boobShape) {
				case "perky":
					r.push(`${His} perky tits do their best to retain their pointy shape despite the tugging.`);
					break;
				case "spherical":
					r.push(`${His} implant-stuffed tits retain their rounded shape despite the tugging.`);
					break;
				case "downward-facing":
					r.push(`The nipples that cap ${his} downward-facing udders are tugged even farther towards the ground.`);
					break;
				case "torpedo-shaped":
					r.push(`${His} torpedoes are long enough that the weights are a long way from ${his} chest, allowing them to tug ${his} nipples a long way down.`);
					break;
				case "wide-set":
					r.push(`${His} wide-set tits are dragged together for once as their nipples are tugged downward.`);
					break;
				case "saggy":
					r.push(`${His} poor, saggy boobs cause ${his} real trouble, letting the weights tug ${his} nipples quite a ways down.`);
					break;
				default:
					r.push(`${His} heavy breasts let the weights tug ${his} nipples down to face at the ground.`);
			}
			r.push(`The first time ${he} tries begging, you add another weight to each breast, which drives ${him} over the edge into open crying. You leave ${him} there for a while, letting anyone who comes into the office experience the sight of ${eventSlave.slaveName} alternately sobbing, trying not to sob because doing so jiggles ${his} boobs, and then sobbing again because ${his} boobs hurt.`);
			eventSlave.trust -= 5;
			r.toParagraph();
			return r.container();
		}
	}
};
