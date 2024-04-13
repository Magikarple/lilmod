// cSpell:ignore fugly

App.Events.RESSMeanGirls = class RESSMeanGirls extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !FutureSocieties.isActive('FSDegradationist'),
			() => V.arcologyUpgrade.drones === 1,
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment === Job.PUBLIC,
				hasAnyArms,
				canStand,
				canHear,
				s => s.boobs > 600,
				s => s.fetishKnown === 1,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, girl, himself
		} = getPronouns(eventSlave);
		const {hisA, heA, HeA} = getPronouns(assistant.pronouns().main).appendSuffix('A');

		let artDiv = document.createElement("div"); // named container so we can replace it later
		node.appendChild(artDiv);

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 16,
				maxAge: 19,
				ageOverridesPedoMode: 1,
				nationality: "American",
				race: "nonslave",
				disableDisability: 1,
			});
			slave.origin = `You enslaved $him for abusing ${eventSlave.slaveName} while ${he} was serving the public.`;
			slave.career = "a student";
			slave.markings = "none";
			slave.weight = -20;
			slave.devotion = random(-80, -60);
			slave.trust = random(-20, -10);
			slave.muscles = random(0, 15);
			slave.boobsImplant = 200 * random(0, 3);
			slave.boobs += slave.boobsImplant;
			slave.boobsImplantType = "normal";
			slave.buttImplant = random(0, 2);
			slave.butt += slave.buttImplant;
			slave.buttImplantType = "normal";
			slave.butt += 1;
			slave.vagina = random(1, 2);
			slave.anus = 1;
			slave.face = random(20, 60);
			setHealth(slave, jsRandom(30, 50), 0, 0, 0, 0);
			slave.attrXY = random(60, 90);
			slave.attrXX = random(10, 20);
			slave.behavioralFlaw = either("arrogant", "bitchy");
			slave.clothes = either("a mini dress", "a t-shirt and jeans", "conservative clothing", "sport shorts and a t-shirt");
			return slave;
		}
		const newSlaves = [makeSlave(), makeSlave(), makeSlave()];
		const {He2, his2, him2, he2} = getPronouns(newSlaves[0]).appendSuffix('2');
		const {He3, his3} = getPronouns(newSlaves[1]).appendSuffix('3');
		App.Events.drawEventArt(artDiv, [eventSlave, ...newSlaves]);

		let r = [];
		r.push(`One evening, ${V.assistant.name} breaks in on your`);
		if (V.assistant.personality > 0) {
			r.push(`work, ${hisA} ${V.assistant.appearance} avatar looking uncharacteristically somber.`);
			r.push(`"${properMaster()}," ${heA} says, "a group of tourists are giving`);
			r.push(contextualIntro(V.PC, eventSlave, true));
			r.push(`a bad time." Before you can ask why the security drones haven't addressed the situation, ${heA} continues, "They're not abusing ${him} physically or anything. But, look." ${HeA}`);
		} else {
			r.push(`work, announcing that a group of visitors to the arcology are being verbally abusive to`);
			r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."));
			r.push(`Before you can ask why ${heA}'s bothering you with this, ${heA} continues, "An enslavement opportunity may exist," and`);
		}
		r.push(`brings up a video feed.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`${eventSlave.slaveName} is doing ${his} job, standing in an area of the arcology that's busy at this time of night,`);
		if (eventSlave.energy > 95) {
			r.push(`eagerly`);
		} else if (eventSlave.devotion > 95) {
			r.push(`diligently`);
		} else if (eventSlave.devotion > 20) {
			r.push(`obediently`);
		} else {
			r.push(`reluctantly`);
		}
		r.push(`showing off ${his}`);
		if (eventSlave.bellyPreg >= 1500) {
			r.push(`pregnant`);
		} else if (eventSlave.bellyImplant >= 1500) {
			r.push(`gravid`);
		} else if (eventSlave.bellyFluid >= 1500) {
			r.push(`bloated`);
		}
		if (App.Data.clothes.get(eventSlave.clothes).exposure >= 4) {
			r.push(`nude body`);
		} else {
			r.push(`body in ${his} ${App.Data.clothes.get(eventSlave.clothes).name.toLowerCase()}`);
		}
		r.push(`and flirting with passersby. Or ${he} would be, if ${he} weren't surrounded by a hostile group of girls. They're very obviously inebriated, rich, vapid, and on vacation, and their rapid-fire bitchiness makes the cause clear.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(Spoken(newSlaves[2], `"Why the fuck did you say that shit? We're not lesbians,"`), `says one.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(Spoken(newSlaves[1], `"You're fucking gross,"`), `says another.`, Spoken(newSlaves[1], `"Like, ew. Even if it's free, why the fuck would we let you touch us?"`));
		App.Events.addParagraph(node, r);
		r = [];

		if (eventSlave.bellyPreg >= 750000) {
			r.push(Spoken(newSlaves[0], `"Holy shit, ${he}'s gonna blow! Bitch'll keep fucking till ${his} belly pops open and keep on fucking still,"`));
		} else if (eventSlave.belly >= 750000) {
			r.push(Spoken(newSlaves[0], `"That belly is disgusting, what did ${he} do? Fuck an elephant?"`));
		} else if (eventSlave.boobs > 25000) {
			r.push(Spoken(newSlaves[0], `"Those boobs are disgusting; look at ${him} struggle,"`));
		} else if (eventSlave.bellyPreg >= 450000) {
			r.push(Spoken(newSlaves[0], `"What a slut! I bet everyone in the arcology has a baby in ${him},"`));
		} else if (eventSlave.belly >= 450000) {
			r.push(Spoken(newSlaves[0], `"That belly is disgusting; what is that, a horse?"`));
		} else if (eventSlave.weight > 190) {
			r.push(Spoken(newSlaves[0], `"I've never seen someone <i>that</i> fat before. How can you live with yourself knowing you're such a whale?"`));
		} else if (eventSlave.butt > 10) {
			r.push(Spoken(newSlaves[0], `"That ass is disgusting; look how fat it is,"`));
		} else if (eventSlave.bellyFluid >= 5000) {
			r.push(Spoken(newSlaves[0], `"Look at that belly! Wait, is it just me or is it wobbling? Holy shit! ${He} must have sucked down, like, gallons of cum,"`));
		} else if (eventSlave.clit >= 3) {
			r.push(Spoken(newSlaves[0], `"Holy shit! That's no dick; it's some sort of freak clit,"`));
		} else if (eventSlave.boobs > 5000) {
			r.push(Spoken(newSlaves[0], `"Those boobs are disgusting,"`));
		} else if (eventSlave.belly >= 150000) {
			r.push(Spoken(newSlaves[0], `"Oh my god, I didn't know a ${girl} could get <i>that</i> pregnant,"`));
		} else if (eventSlave.dick > 6) {
			r.push(Spoken(newSlaves[0], `"That dick is so disgusting,"`));
		} else if (eventSlave.weight > 130) {
			r.push(Spoken(newSlaves[0], `"What a cow; how can you be so proud of being such a fat slob?"`));
		} else if (eventSlave.intelligence+eventSlave.intelligenceImplant < -15) {
			r.push(Spoken(newSlaves[0], `"${He}'s retarded,"`));
		} else if (eventSlave.lips > 40) {
			r.push(Spoken(newSlaves[0], `"Those lips make ${him} look like a cartoon,"`));
		} else if (eventSlave.belly >= 1500) {
			r.push(Spoken(newSlaves[0], `"Look at that belly; bet ${he} doesn't even know whose it is,"`));
		} else if (eventSlave.dick > 3) {
			r.push(Spoken(newSlaves[0], `"I bet ${he} never gets to stick that thing in anyone,"`));
		} else if (eventSlave.anus > 2) {
			r.push(Spoken(newSlaves[0], `"Holy shit, I can see ${his} asshole from here,"`));
		} else if (eventSlave.dick > 0) {
			r.push(Spoken(newSlaves[0], `"Oh, look, ${he} has a lame little dick,"`));
		} else if (eventSlave.visualAge > 30) {
			r.push(Spoken(newSlaves[0], `"What an ugly old slut,"`));
		} else if (eventSlave.weight > 30) {
			r.push(Spoken(newSlaves[0], `"What a fat pig, showing off ${his} belly like that,"`));
		} else if (eventSlave.face < 10) {
			r.push(Spoken(newSlaves[0], `"What a fugly slut,"`));
		} else {
			r.push(Spoken(newSlaves[0], `"What a dirty slut,"`));
		}
		r.push(`says a third.`, Spoken(newSlaves[0], `"No wonder people won't pay to have sex with you. I bet your Master put you out here because he hates you."`));

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Tolerating verbal abuse is part of a public servant's job`, verbal),
			new App.Events.Result(`Enslave them all`, enslave, `This option will cost ${cashFormat(25000)}`),
		]);

		function verbal() {
			r = [];

			r.push(`You inform your personal assistant that you aren't planning to take any action. If you took notice every time a citizen offered a slave on public duty any insult, you'd never be doing anything else. The only interesting part of the interaction was the possible value of the pretty girls, but enslaving them would likely have been difficult and expensive, given their families' probable wealth and influence. As for ${eventSlave.slaveName}, ${he}'s not deeply affected.`);
			if (eventSlave.energy > 95) {
				r.push(`${He}'s so horny that petty insults can't compete for ${his} attention with ${his} constant, oppressive need to get off.`);
			} else if (eventSlave.trust > 95 && eventSlave.devotion >= -20) {
				r.push(`${He}'s confident that ${he}'s a good slave, no matter what some visitors from outside the arcology say.`);
			} else if (eventSlave.trust > 95) {
				r.push(`It just gives ${him} more of a reason to work against you.`);
			} else if (eventSlave.devotion > 20) {
				r.push(`${He} tells ${himself} that they were wrong, and carries on.`);
			} else {
				r.push(`It's not like the unhappy slave doesn't tell ${himself} much worse things.`);
			}
			return r;
		}

		function enslave() {
			const frag = document.createDocumentFragment();
			r = [];

			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, [eventSlave, ...newSlaves], [eventSlave.clothes, "no clothing", "no clothing", "no clothing"]);
			for (const slave of newSlaves) {
				newSlave(slave);
				cashX(forceNeg(8333), "slaveTransfer", slave);
			}

			r.push(`You seize a tablet and hurry out of your office, working furiously and using every feature of ${V.assistant.name} to the utmost. These bitches have offended you, and you quickly frame the structure of an appropriate revenge. By the time you get to where ${eventSlave.slaveName} is still being heckled by spoiled, drunken harpies, everyone else present in that arcology hall has mysteriously received urgent messages and gone elsewhere. ${eventSlave.slaveName}`);
			if (canSee(eventSlave)) {
				r.push(`sees you approach, and stares at you,`);
			} else {
				r.push(`recognizes your dominant footsteps approaching, and turns to face you,`);
			}
			r.push(`${his} sudden intense look alerting your vile little guests to your presence. One of them attempts to frame an insult for the interloper, but one of ${his2} friends pokes ${him2} in the side and whispers something in ${his2} ear and ${he2} goes silent, staring at you with wide eyes.`);
			if (V.PC.title !== 1) {
				r.push(`${He2} then winces, visibly realizing that you're likely aware that ${he2} called ${eventSlave.slaveName}'s owner ${his} "Master". Somehow, the mistake seems important to ${him2} now that you're standing here, effortlessly dominating the space for all your femininity.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You hold the tablet out to them wordlessly. It's displaying security footage of the three of them, boarding a public VTOL transport for another arcology nearby. The prominent timestamp is thirty minutes in the future. The scene changes, showing them partying in one of that arcology's nightclubs. You clear your throat, dragging their attention away from the counterfeited footage, and describe in detail the other evidence — tickets, identification checks, biometrics — that will prove they left your arcology and visited two others before regrettably disappearing. One of them tries, with utter predictability, to threaten you with ${his2} father, but you tell ${him2} bluntly that if he does make the effort, he'll be looking in the wrong place.`);
			App.Events.addParagraph(frag, r);
			r = [];

			r.push(Spoken(newSlaves[1], `"We shouldn't have come here,"`), `one of them says dully. ${He3}'s wrong in that they would have had no trouble at all if they hadn't offended you, but right in that here, they put themselves entirely under your power. Tourists would never visit if this were widely known, but fortunately, you've been successful at concealing this. They begin to cry, and then to beg, and then the drones bag them and take them away.`);

			App.Events.addParagraph(frag, r);
			App.Events.addResponses(frag, [
				new App.Events.Result(`Let your public servant take revenge on them`, revenge),
			]);
			return frag;

			function revenge() {
				const frag2 = document.createDocumentFragment();
				r = [];

				r.push(`Although they don't know it, your trio of new captures escape the usual choice of introductions to life among your sex slaves. In order to ensure that their fate has been properly obscured, you keep them in confinement for a while. After that, the usual beautification your slaves undergo will eliminate any possibility of their being recognized, even on public duty. That doesn't mean they have it easy, though. You delegate ${eventSlave.slaveName} to break them in, letting ${him} visit each of them whenever ${he} wants and treat them however ${he} wants.`);
				if ((eventSlave.energy > 95) || (eventSlave.devotion > 50)) {
					r.push(`${He} approaches the task`);
					if (eventSlave.energy > 95) {
						r.push(`eagerly, seeing it as an opportunity to sate ${his} urges`);
					} else {
						r.push(`dutifully, seeing it as ${his} responsibility to break them well for you`);
					}
					r.push(`as well as to get some petty revenge.`);
					switch (eventSlave.fetish) {
						case "submissive":
							r.push(`${He}'s a sub, but this actually means that ${he} can do a reasonable dom impression when ${he} works at it. ${He} certainly has experience with what works, even if it's from the other side. The erstwhile rich girls are required to kiss ${his} feet, literally.`);
							break;
						case "cumslut":
							r.push(`As a cumslut, ${he} derives considerable enjoyment from seeing others drink ejaculate, too. In this case, ${he} enjoys forcing the erstwhile rich girls to choke down liters of the stuff.`);
							break;
						case "humiliation":
							r.push(`${He} can't publicly humiliate them, since that would defeat the whole purpose of sequestering them until the trail goes really cold. Unfortunately for them, that doesn't stop ${him} from humiliating them to each other, and ${he} forces them to perform various sex acts on ${him} while the others watch.`);
							seX(newSlaves[0], "oral", eventSlave, "penetrative", 10);
							seX(newSlaves[1], "oral", eventSlave, "penetrative", 10);
							seX(newSlaves[2], "oral", eventSlave, "penetrative", 10);
							V.oralTotal += 30;
							break;
						case "buttslut":
							r.push(`${He} has a one track mind, and that track is anal sex. So, ${he} assrapes them, enjoying their sobbed apologies while ${he}`);
							if (canPenetrate(eventSlave)) {
								r.push(`fills their backdoors with ${his} cum.`);
							} else {
								r.push(`uses a dildo on them.`);
							}
							seX(newSlaves[0], "anal", eventSlave, "penetrative", 10);
							seX(newSlaves[1], "anal", eventSlave, "penetrative", 10);
							seX(newSlaves[2], "anal", eventSlave, "penetrative", 10);
							break;
						case "boobs":
							r.push(`${He} forces them to`);
							if (eventSlave.nipples === "fuckable") {
								r.push(`eat out ${his} nipples,`);
							} else if (eventSlave.lactation > 0) {
								r.push(`nurse from ${him},`);
							} else {
								r.push(`suck ${his} nipples until ${he} orgasms,`);
							}
							r.push(`mostly for how much ${he} enjoys the sensation, but also for the revulsion it produces.`);
							seX(newSlaves[0], "oral", eventSlave, "mammary", 10);
							seX(newSlaves[1], "oral", eventSlave, "mammary", 10);
							seX(newSlaves[2], "oral", eventSlave, "mammary", 10);
							if (eventSlave.lactation > 0) {
								eventSlave.lactationDuration = 2;
								eventSlave.boobs -= eventSlave.boobsMilk;
								eventSlave.boobsMilk = 0;
							} else {
								r.push(induceLactation(eventSlave, 5));
							}
							break;
						case "pregnancy":
							r.push(`${He} doesn't have permission to impregnate them, but they don't know that, and ${he} lies shamelessly.`);
							if (canPenetrate(eventSlave)) {
								r.push(`They beg ${him} not to cum inside them, but ${he} does anyway,`);
							} else {
								r.push(`${He} uses a strap-on with a reservoir to fill them with cum,`);
							}
							r.push(`and they cry themselves to sleep every night.`);
							seX(newSlaves[0], "vaginal", eventSlave, "penetrative", 10);
							seX(newSlaves[1], "vaginal", eventSlave, "penetrative", 10);
							seX(newSlaves[2], "vaginal", eventSlave, "penetrative", 10);
							break;
						case "dom":
							r.push(`${He} prizes the opportunity to be dominant, and makes the most of it. Rather than doing something pedestrian like force them to fuck ${him}, ${he} forces them to fuck each other, punishing them for hesitation until they're eating each other out even while they cry.`);
							seX(newSlaves[0], "oral", eventSlave, "penetrative", 20);
							seX(newSlaves[1], "oral", eventSlave, "penetrative", 20);
							seX(newSlaves[2], "oral", eventSlave, "penetrative", 20);
							break;
						case "sadist":
							r.push(`Their tears aren't a means for ${him}; they're an end. ${He} extracts them with greed, enjoying the sensation of being`);
							if (eventSlave.dick > 0) {
								r.push(`sucked off`);
							} else if (eventSlave.vagina === -1) {
								r.push(`rimmed`);
							} else {
								r.push(`eaten out`);
							}
							r.push(`by one sobbing rich bitch while ${he} forces another to spank ${his3} friend's pussy.`);
							seX(newSlaves[0], "oral", eventSlave, "penetrative", 20);
							seX(newSlaves[1], "oral", eventSlave, "penetrative", 20);
							seX(newSlaves[2], "oral", eventSlave, "penetrative", 20);
							break;
						case "masochist":
							r.push(`As a masochist, ${he}'s naturally inclined to be on the receiving end, but in this case ${he} makes an exception for the sake of justice. And it's to ${his} victims' anguish that ${he} does, because ${he} knows pain like a lover, and inflicts it in excruciating crescendos without leaving a single mark.`);
							break;
					}
					r.push(`The horrible experience is certainly <span class="trust dec">educational</span> for your new slaves, and ${eventSlave.slaveName} is <span class="devotion inc">well pleased.</span> Tolerating insults is part of being a public slave, but getting this opportunity to take ${his} pent-up frustrations out on some deserving targets is a <span class="trust inc">trust building</span> exercise for ${him}. It seems their insults really did upset ${him}.`);
					newSlaves[0].trust -= 4;
					newSlaves[1].trust -= 4;
					newSlaves[2].trust -= 4;
					eventSlave.devotion += 5;
					eventSlave.trust += 5;
				} else {
					r.push(`${He} obeys, but isn't so far gone into sexual slavery that ${he}'s willing to really throw ${himself} into the task. ${His} visits are terrifying enough, though. Simply seeing their own likely futures reflected in ${him} is usually enough to leave your new slaves crying themselves to sleep.`);
				}
				App.Events.addParagraph(frag2, r);
				return frag2;
			}
		}
	}
};
