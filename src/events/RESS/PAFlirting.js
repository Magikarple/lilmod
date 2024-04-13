// cSpell:ignore aaaaaall, miiiine

App.Events.RESSPAFlirting = class RESSPAFlirting extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.assistant.personality === 1,
			() => V.assistant.appearance !== "normal"
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canTalk,
				canSee,
				canHear,
				s => s.devotion > 50,
				s => s.trust > 75,
				s => s.assignment !== Job.QUARTER,
				s => s.energy > 60,
				s => ((canDoAnal(s) && s.anus > 0) || (canDoVaginal(s) && s.vagina > 0)),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const {
			HeA, heA, HisA, hisA, himA, girlA, womanA, loliA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const assistantCap = capFirstChar(V.assistant.name);

		App.Events.drawEventArt(node, [eventSlave, "assistant"], "no clothing");

		let r = [];
		r.push(`Partway through`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "'s"));
		r.push(`weekly inspection, you have to leave for a moment to deal with a minor matter. Inspecting such a devoted slave is a pleasure, but you tear yourself away. Such sacrifices must be made.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`When you return, the comfortably nude ${desc} is flirting shamelessly with ${V.assistant.name}. Your personal assistant's ${V.assistant.appearance} avatar is glowing brightly on the desktop, and ${he} and ${eventSlave.slaveName} are trading increasingly exaggerated compliments.`);

		switch (V.assistant.appearance) {
			case "monstergirl":
				r.push(Spoken(eventSlave, `"I love your hair,"`), `the slave ${say}s.`, Spoken(eventSlave, `"Have you done anything to it lately?"`));
				r.push(`${assistantCap} smiles dangerously, ${hisA} tentacle hair flaring out, its suckers starting to pulsate. "Don't you mean, 'have I done anyone with it lately?' I'd love to do you," ${heA} purrs.`);
				break;
			case "shemale":
				r.push(Spoken(eventSlave, `"I love your cock,"`));
				r.push(`the slave`);
				if (SlaveStatsChecker.checkForLisp(eventSlave)) {
					r.push(`lisps wistfully.`);
				} else {
					r.push(`sighs wistfully.`);
				}
				if (canAchieveErection(eventSlave) && eventSlave.dick < 5) {
					r.push(Spoken(eventSlave, `"I'd love to be that big."`));
				} else if (canAchieveErection(eventSlave)) {
					r.push(Spoken(eventSlave, `"Big dicks are the best."`));
				} else if (eventSlave.dick > maxErectionSize(eventSlave)) {
					r.push(Spoken(eventSlave, `"I wish mine could get that hard."`));
				} else {
					r.push(Spoken(eventSlave, `"I can't look away."`));
				}
				r.push(`Complimented, ${V.assistant.name} looks pleased. "Yeah, it's pretty great," ${heA} giggles.`);
				break;
			case "amazon":
				r.push(Spoken(eventSlave, `"You're so big and strong,"`), `the slave ${say}s.`, Spoken(eventSlave, `"You look like you could give a great hug."`));
				r.push(`${assistantCap} blushes. "Um, well," ${heA} says, ${hisA} muscular avatar kicking its heels. "I can't. But I'd like to give you one!"`);
				break;
			case "businesswoman":
				r.push(Spoken(eventSlave, `"You're so confident and sexy,"`), `the slave ${say}s.`, Spoken(eventSlave, `"I love doing what you say."`));
				r.push(`${assistantCap} favors ${him} with an aristocratic look. "Well, you are a good slave," ${heA} says measuringly. "So I suppose I love telling you what to do." ${HeA} uncrosses and recrosses ${hisA} legs.`);
				break;
			case "fairy":
				r.push(Spoken(eventSlave, `"You're so tiny and adorable,"`), `the slave ${say}s.`, Spoken(eventSlave, `"You're a load of fun to be with."`));
				r.push(`${assistantCap} giggles and holds ${hisA} hands up to ${hisA} face. "Aw shucks, you're just saying that," ${heA} says shyly. "You're quite the cutie yourself!" ${HeA} flits to and fro.`);
				break;
			case "pregnant fairy":
				r.push(Spoken(eventSlave, `"You're so tiny and adorable,"`), `the slave ${say}s.`, Spoken(eventSlave, `"You're a load of fun to be with."`));
				r.push(`${assistantCap} giggles and holds ${hisA} hands up to ${hisA} face. "Aw shucks, you're just saying that," ${heA} says shyly. "You're quite the cutie yourself!" ${HeA} moves one hand down to caress ${hisA} belly.`);
				break;
			case "cherub":
			case "schoolgirl":
				r.push(Spoken(eventSlave, `"You're so cute,"`), `the slave ${say}s.`, Spoken(eventSlave, `"It makes things fun."`));
				r.push(`${assistantCap} looks touched. "Aw," ${heA} coos, "I love you too!"`);
				break;
			case "goddess":
			case "hypergoddess":
				r.push(Spoken(eventSlave, `"I love the way you glow,"`), `the slave ${say}s.`, Spoken(eventSlave, `"It's really comforting."`));
				r.push(`${assistantCap} beams maternally. "That's wonderful," ${heA} says resonantly. "I want the best for you."`);
				break;
			case "loli":
				r.push(Spoken(eventSlave, `"You're so cute,"`), `the slave ${say}s.`, Spoken(eventSlave, `"It's really calming."`));
				r.push(`${assistantCap} beams cutely. ${HeA} giggles quietly. "I'll be cuter just for you."`);
				break;
			case "preggololi":
				r.push(Spoken(eventSlave, `"You're so cute,"`), `the slave ${say}s.`, Spoken(eventSlave, `"It's really calming."`));
				r.push(`${assistantCap} beams proudly. ${HeA} giggles loudly and pats ${hisA} belly. "I'll be cuter just for you."`);
				break;
			case "angel":
				r.push(Spoken(eventSlave, `"I love your wings,"`), `the slave ${say}s.`, Spoken(eventSlave, `"They are so majestic."`));
				r.push(`${assistantCap} smiles happily. "If it keeps you out of trouble."`);
				break;
			case "incubus":
				r.push(Spoken(eventSlave, `"You're so sexy,"`), `the slave ${say}s.`, Spoken(eventSlave, `"I can't help be feel so hot around you."`));
				r.push(`${assistantCap} beams proudly. "What kind of sex demon would I be if I couldn't turn you on?"`);
				break;
			case "succubus":
				r.push(Spoken(eventSlave, `"You're so sexy,"`), `the slave ${say}s.`, Spoken(eventSlave, `"I can't help be feel so hot around you."`));
				r.push(`${assistantCap} beams proudly. "What kind of sex demoness would I be if I couldn't turn you on?"`);
				break;
			case "imp":
				r.push(Spoken(eventSlave, `"You're so cute,"`), `the slave ${say}s.`, Spoken(eventSlave, `"It makes you fun."`));
				r.push(`${assistantCap} cackles. "Won't spare you the whip and hot wax just for compliments!"`);
				break;
			case "witch":
				r.push(Spoken(eventSlave, `"You're so, uh, determined,"`), `the slave ${say}s.`, Spoken(eventSlave, `"It makes you fun."`));
				r.push(`${assistantCap} giggles. "I'll just have to play with you more often then."`);
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				r.push(Spoken(eventSlave, `"You're so interesting,"`), `the slave ${say}s.`, Spoken(eventSlave, `"You always have something new to show off."`));
				r.push(`${assistantCap} laughs. "I'll always find a way into your pants, so why bother trying to say no?"`);
				break;
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Tell your personal assistant to fuck ${him} already`, fuck),
			new App.Events.Result(`Get the slave to get to the point`, point),
		]);

		function fuck() {
			const frag = document.createDocumentFragment();
			r = [];
			let spokenResponse;
			r.push(`You ask ${V.assistant.name} whether ${heA}'s going anywhere with all this flirting. ${HisA} avatar looks at ${eventSlave.slaveName}. "Hear that,`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`human?" ${heA} growls. "You're all mine!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm being sacrificed to a rape monster,"`);
					break;
				case "shemale":
					r.push(`slut?" ${heA} says, smacking ${hisA} lips. "You're all mine!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, there's no way that thing will fit inside me,"`);
					break;
				case "amazon":
					r.push(`slave?" ${heA} roars, rubbing ${hisA} palms together powerfully. "You're my prize!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I've been captured by a horny amazon,"`);
					break;
				case "businesswoman":
					r.push(`bitch?" ${heA} says icily, making a steeple with ${hisA} fingers. "You'll satisfy me! Now!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm a slave to a horny older ${womanA}'s lewd desires,"`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`cutie?" ${heA} says, giggling devilishly. "You're aaaaaall miiiine!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm a slave to a horny fairy's lewd desires,"`);
					break;
				case "schoolgirl":
					r.push(`cutie?" ${heA} says eagerly, already reaching down to start schlicking away. "You get to be my FWB!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I have to satisfy a naughty little school${girlA},"`);
					break;
				case "goddess":
					r.push(`${girl}?" ${heA} says beatifically. "When I'm through with you, you'll be as pregnant as I!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm about to be impregnated by a goddess,"`);
					break;
				case "hypergoddess":
					r.push(`${girl}?" ${heA} says beatifically. "When I'm through with you, you'll be struggling to move!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm about to be burst by a slut goddess,"`);
					break;
				case "loli":
					r.push(`${girl}?" ${heA} says cutely. "If you think I'm so cute, why don't you lick my pussy?"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm about to be dominated by a ${loliA},"`);
					break;
				case "preggololi":
					r.push(`${girl}?" ${heA} says cutely. "If you think I'm so cute, why don't you lick my pussy?"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm about to be dominated by a slutty ${loliA},"`);
					break;
				case "angel":
					r.push(`${girl}?" ${heA} says beatifically. "I'm going to show you divine skill!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm going to be taken to heaven,"`);
					break;
				case "cherub":
					r.push(`cutie?" ${heA} says cutely, already reaching down to start schlicking away. "You get to be my best friend for the evening!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm going to get baptized by a squirting little angel,"`);
					break;
				case "incubus":
					r.push(`dick-sleeve?" ${heA} says dominantly, already at full mast. "I'm going to use you till all you can think of is cock!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm going to fucked out of my mind,"`);
					break;
				case "succubus":
					r.push(`bitch?" ${heA} says dominantly, already wet. "I'm going to ride you till you're all used up!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm going to have my sexual essence stolen,"`);
					break;
				case "imp":
					r.push(`whore?" ${heA} says eagerly. "I'm going to torment you till you scream in pleasure!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'd better start licking if I don't want to suffer,"`);
					break;
				case "witch":
					r.push(`sexy?" ${heA} says eagerly, hiking ${hisA} dress to reveal a squirming cock. "For once a spell gone wrong is working out!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm going to get violated by a terrible witch,"`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`nest?" ${heA} says eagerly, forming multiple cocks out of ${hisA} body. "I'm going to fill you with eggs!"`);
					spokenResponse = Spoken(eventSlave, `"Oh noo, I'm going to be a nursery for a freak,"`);
					break;
			}
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(spokenResponse, `the ${desc} gasps with mock horror. Your personal assistant gives ${him} rapid-fire orders, making ${him} set up sex toys in the corner of your office to conform to ${hisA} avatar.`);
			App.Events.addParagraph(frag, r);

			r = [];
			const {heU, hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
			r.push(`The next slave on the inspection enters and approaches you, sitting imperturbably behind your desk, but stops and stares when ${heU} notices what's going on in the corner of your office. A wallscreen in the corner shows ${V.assistant.name}'s avatar`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`with both ${hisA} cocks up the asshole of an avatar of ${eventSlave.slaveName}. Below this, the slave ${himself} is`);
					if (eventSlave.belly >= 300000) {
						r.push(`face-down, perched atop ${his} ${belly}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`pregnancy,`);
						} else {
							r.push(`belly,`);
						}
					} else if (eventSlave.belly >= 5000) {
						r.push(`face-down, ${his} rear up in the air to give ${his} ${belly}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`pregnancy`);
						} else {
							r.push(`belly`);
						}
						r.push(`room,`);
					} else {
						r.push(`face-down,`);
					}
					r.push(`with two fuckmachines pounding`);
					if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
						r.push(`${him}: one in the pussy, one in the ass.`);
						seX(eventSlave, "vaginal", "assistant", "penetrative");
						seX(eventSlave, "anal", "assistant", "penetrative");
					} else if (canDoVaginal(eventSlave)) {
						r.push(`${his} pussy.`);
						seX(eventSlave, "vaginal", "assistant", "penetrative", 2);
					} else {
						r.push(`${his} ass.`);
						seX(eventSlave, "anal", "assistant", "penetrative", 2);
					}
					break;
				case "shemale":
					r.push(`with ${hisA} third leg inside`);
					if (canDoVaginal(eventSlave)) {
						r.push(`the pussy of an avatar of ${eventSlave.slaveName}. Below this, the slave ${himself} is taking vaginal from a fuckmachine with an absurdly big dildo.`);
						seX(eventSlave, "vaginal", "assistant", "penetrative");
					} else {
						r.push(`the ass of an avatar of ${eventSlave.slaveName}. Below this, the slave ${himself} is taking anal from a fuckmachine with an absurdly big dildo.`);
						seX(eventSlave, "anal", "assistant", "penetrative");
					}
					break;
				case "amazon":
					r.push(`powerfully fucking an avatar of ${eventSlave.slaveName} with a beautiful carved bone and worked leather strap-on.`);
					if (canDoVaginal(eventSlave)) {
						r.push(`Below this, the slave ${himself} is taking hard vaginal from a fuckmachine.`);
						seX(eventSlave, "vaginal", "assistant", "penetrative");
					} else {
						r.push(`Below this, the slave ${himself} is taking hard anal from a fuckmachine.`);
						seX(eventSlave, "anal", "assistant", "penetrative");
					}
					break;
				case "angel":
				case "businesswoman":
				case "cherub":
				case "loli":
				case "preggololi":
				case "schoolgirl":
					r.push(`being eaten out by an avatar of ${eventSlave.slaveName}, who is touching ${himself} in turn. Below this, the slave ${himself} is performing oral on a realistic fake pussy while masturbating.`);
					seX(eventSlave, "oral", "assistant", "penetrative");
					break;
				case "fairy":
					if (eventSlave.height < 35) {
						if (eventSlave.dick > 0) {
							r.push(`bouncing on ${eventSlave.slaveName}'s lap and eagerly taking ${his} cock, finally enjoying sex with someone ${hisA} size. Below this, the slave ${himself} is thrusting into a 'realistic' tiny fairy doll, bloated with cum.`);
						} else {
							r.push(`legs tied to one another as they scissor enthusiastically, covered in sexual fluids from the waist down, Below this, the slave ${himself} is grinding away between a 'realistic' tiny fairy doll's legs.`);
						}
					} else {
						r.push(`bouncing on ${eventSlave.slaveName}'s`);
						if (eventSlave.dick > 0) {
							r.push(`cock, distending ${hisA} belly with each thrust`);
						} else {
							r.push(`hard clit`);
						}
						r.push(`while a vine is gently penetrating below ${him}. Below this, the slave ${himself} is thrusting into a 'realistic' tiny fairy doll pussy`);
						if (eventSlave.dick > 0) {
							r.push(`bloated with cum`);
						}
						r.push(`while a flexible dildo gently thrusts into ${his}`);
						if (canDoVaginal(eventSlave)) {
							r.push(`pussy. It's an ejaculating model, and it's currently pumping a large volume of semen into ${his} cunt.`);
							seX(eventSlave, "vaginal", "assistant", "penetrative");
						} else {
							r.push(`ass. It's an ejaculating model, and it's currently pumping a large volume of semen into ${his} ass.`);
							seX(eventSlave, "anal", "assistant", "penetrative");
						}
					}
					break;
				case "pregnant fairy":
					if (eventSlave.height < 35) {
						if (eventSlave.dick > 0) {
							r.push(`lying on ${hisA} back as ${eventSlave.slaveName} gently thrusts into ${himA}, legs locked around ${his} waist. ${eventSlave.slaveName} enjoys running ${his}`);
							if (hasBothArms(eventSlave)) {
								r.push(`hands`);
							} else {
								r.push(`hand`);
							}
							r.push(`over the fairy's pregnant belly as ${he} leans in to suckle on the fairy's breasts. Below this, the slave ${himself} is thrusting into a 'realistic' tiny fairy doll, the pregnant belly swelling a little larger with every ejaculation.`);
						} else {
							r.push(`legs tied to one another as they scissor gently, covered in sexual fluids from the waist down. ${eventSlave.slaveName} enjoys rubbing and kissing the pregnant belly from time to time. Below this, the slave ${himself} is grinding away between a 'realistic' tiny fairy doll's legs.`);
						}
					} else {
						r.push(`cradling ${hisA} belly as ${heA}'s being eaten out by an avatar of ${eventSlave.slaveName}, who is being double penetrated by a couple of vines. Below this, the slave ${himself} is performing oral on a 'realistic' tiny fairy doll pussy while being penetrated by two flexible dildos. They're an ejaculating model, and it's filled ${him} so completely that each thrust sends a gush of fake cum down ${his} legs to join the puddle on the floor.`);
						seX(eventSlave, "oral", "assistant", "penetrative");
						if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
							seX(eventSlave, "vaginal", "assistant", "penetrative");
							seX(eventSlave, "anal", "assistant", "penetrative");
						} else if (canDoVaginal(eventSlave)) {
							seX(eventSlave, "vaginal", "assistant", "penetrative", 2);
						} else {
							seX(eventSlave, "anal", "assistant", "penetrative", 2);
						}
					}
					break;
				case "goddess":
					r.push(`gently making love to an avatar of ${eventSlave.slaveName}, whose`);
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`${belly} pregnant belly is growing ever more full of children.`);
					} else if (eventSlave.belly >= 1500) {
						r.push(`${belly} belly is growing ever larger as kicks begin to dot its surface.`);
					} else {
						r.push(`belly is becoming distended.`);
					}
					r.push(`Below this, the slave ${himself}`);
					if (isItemAccessible.entry("a huge empathy belly", "bellyAccessory", eventSlave) === true) {
						r.push(`has a huge empathy belly hanging from ${his} middle and is`);
					} else {
						r.push(`is`);
					}
					r.push(`taking a fuckmachine`);
					if (canDoVaginal(eventSlave)) {
						r.push(`in ${his} cunt;`);
						seX(eventSlave, "vaginal", "assistant", "penetrative");
					} else {
						r.push(`up ${his} butt;`);
						seX(eventSlave, "anal", "assistant", "penetrative");
					}
					r.push(`it's an ejaculating model, and it's filled ${him} so completely that each thrust sends a gush of fake cum down ${his} legs to join the puddle on the floor.`);
					break;
				case "hypergoddess":
					r.push(`gently making love to an avatar of ${eventSlave.slaveName}, whose`);
					if (eventSlave.bellyPreg >= 450000) {
						r.push(`${belly} pregnant belly is rapidly ballooning with life and pushing ${him} upwards from the sheer size of the squirming mass.`);
					} else if (eventSlave.bellyPreg >= 1500) {
						r.push(`${belly} pregnant belly is growing taut and beginning to bulge from the amount of children growing within ${him}.`);
					} else if (eventSlave.belly >= 1500) {
						r.push(`${belly} belly is growing taut and beginning to bulge from the amount of children growing within ${him}.`);
					} else {
						r.push(`belly is becoming massively distended.`);
					}
					r.push(`Below this, the slave ${himself}`);
					if (isItemAccessible.entry("a huge empathy belly", "bellyAccessory", eventSlave) === true) {
						r.push(`has a huge empathy belly hanging from ${his} middle and is`);
					} else {
						r.push(`is`);
					}
					r.push(`taking a fuckmachine`);
					if (canDoVaginal(eventSlave)) {
						r.push(`in ${his} cunt;`);
						seX(eventSlave, "vaginal", "assistant", "penetrative");
					} else {
						r.push(`up ${his} butt;`);
						seX(eventSlave, "anal", "assistant", "penetrative");
					}
					r.push(`it's an ejaculating model, and it's filled ${him} so completely that each thrust sends a gush of fake cum down ${his} legs to join the puddle on the floor.`);
					break;
				case "incubus":
					r.push(`powerfully fucking an avatar of ${eventSlave.slaveName} with a dick sized to perfectly fill ${him}.`);
					if (canDoVaginal(eventSlave)) {
						r.push(`Below this, the slave ${himself} is taking hard vaginal from a fuckmachine;`);
						seX(eventSlave, "vaginal", "assistant", "penetrative");
					} else {
						r.push(`Below this, the slave ${himself} is taking hard anal from a fuckmachine;`);
						seX(eventSlave, "anal", "assistant", "penetrative");
					}
					r.push(`it's an ejaculating model, and it's filled ${him} so completely that each thrust sends a gush of fake cum down ${his} legs to join the puddle on the floor.`);
					break;
				case "succubus":
					if (canPenetrate(eventSlave)) {
						r.push(`riding ${eventSlave.slaveName}'s dick. Below this, the slave ${himself} is humping a realistic fake pussy built into a finely crafted female lower body.`);
						seX(eventSlave, "penetrative", "assistant", "vaginal");
					} else {
						r.push(`being eaten out by an avatar of ${eventSlave.slaveName}, who is touching ${himself} in turn. Below this, the slave ${himself} is performing oral on a realistic fake pussy while masturbating.`);
						seX(eventSlave, "oral", "assistant", "penetrative");
					}
					break;
				case "imp":
					r.push(`being eaten out by an avatar of ${eventSlave.slaveName}, who is touching ${himself} in turn while the imp yanks a chain connected to ${his} nipples with one hand and smacks ${him} with a riding crop with the other. Below this, the slave ${himself} is performing oral on a realistic fake pussy while masturbating; a pair of`);
					if (eventSlave.nipples !== "fuckable") {
						r.push(`clamps attached to ${his} nipples randomly jerking`);
					} else {
						r.push(`vibrators wedged in ${his} nipples violently vibrating`);
					}
					r.push(`and a whip-lined wheel steadily slapping at ${his} ass and back.`);
					seX(eventSlave, "oral", "assistant", "penetrative");
					break;
				case "witch":
					if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
						r.push(`with ${hisA} prehensile cocks crammed into every available hole in an avatar of ${eventSlave.slaveName}. Below this, the slave ${himself} is`);
						if (eventSlave.belly >= 300000) {
							r.push(`face-down, perched atop ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy,`);
							} else {
								r.push(`belly,`);
							}
						} else if (eventSlave.belly >= 5000) {
							r.push(`face-down, ${his} rear up in the air to give ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy`);
							} else {
								r.push(`belly`);
							}
							r.push(`room,`);
						} else {
							r.push(`face-down,`);
						}
						r.push(`with multiple vibrating dildos quivering in ${his} ass and pussy.`);
						seX(eventSlave, "vaginal", "assistant", "penetrative", 2);
						seX(eventSlave, "anal", "assistant", "penetrative", 2);
					} else if (canDoVaginal(eventSlave)) {
						r.push(`with ${hisA} prehensile cocks crammed into every available hole in an avatar of ${eventSlave.slaveName}. Below this, the slave ${himself} is`);
						if (eventSlave.belly >= 300000) {
							r.push(`face-down, perched atop ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy,`);
							} else {
								r.push(`belly,`);
							}
						} else if (eventSlave.belly >= 5000) {
							r.push(`face-down, ${his} rear up in the air to give ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy`);
							} else {
								r.push(`belly`);
							}
							r.push(`room,`);
						} else {
							r.push(`face-down,`);
						}
						r.push(`with multiple vibrating dildos quivering in ${his} pussy.`);
						seX(eventSlave, "vaginal", "assistant", "penetrative", 4);
					} else {
						r.push(`with ${hisA} prehensile cocks crammed into the asshole of an avatar of ${eventSlave.slaveName}. Below this, the slave ${himself} is`);
						if (eventSlave.belly >= 300000) {
							r.push(`face-down, perched atop ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy,`);
							} else {
								r.push(`belly,`);
							}
						} else if (eventSlave.belly >= 5000) {
							r.push(`face-down, ${his} rear up in the air to give ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy`);
							} else {
								r.push(`belly`);
							}
							r.push(`room,`);
						} else {
							r.push(`face-down,`);
						}
						r.push(`with multiple vibrating dildos quivering in ${his} ass.`);
						seX(eventSlave, "anal", "assistant", "penetrative", 4);
					}
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`with ${hisA} tentacles crammed into every available hole in an avatar of ${eventSlave.slaveName}, rapidly pumping eggs into ${his} quickly swelling body.`);
					if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
						r.push(`Below this, the slave ${himself}`);
						if (isItemAccessible.entry("a huge empathy belly", "bellyAccessory", eventSlave) === true) {
							r.push(`has a huge empathy belly strapped to ${his} middle and`);
						}
						r.push(`is`);
						if (eventSlave.belly >= 300000) {
							r.push(`face-down, perched atop ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy,`);
							} else {
								r.push(`belly,`);
							}
						} else if (eventSlave.belly >= 5000) {
							r.push(`face-down, ${his} rear up in the air to give ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy`);
							} else {
								r.push(`belly`);
							}
							r.push(`room,`);
						} else {
							r.push(`face-down,`);
						}
						r.push(`while a fuckmachine powerfully fucks ${his} mouth, ass and pussy.`);
						seX(eventSlave, "vaginal", "assistant", "penetrative", 4);
						seX(eventSlave, "anal", "assistant", "penetrative", 4);
						seX(eventSlave, "oral", "assistant", "penetrative", 3);
					} else if (canDoVaginal(eventSlave)) {
						r.push(`Below this, the slave ${himself}`);
						if (isItemAccessible.entry("a huge empathy belly", "bellyAccessory", eventSlave) === true) {
							r.push(`has a huge empathy belly strapped to ${his} middle and`);
						}
						r.push(`is`);
						if (eventSlave.belly >= 300000) {
							r.push(`face-down, perched atop ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy,`);
							} else {
								r.push(`belly,`);
							}
						} else if (eventSlave.belly >= 5000) {
							r.push(`face-down, ${his} rear up in the air to give ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy`);
							} else {
								r.push(`belly`);
							}
							r.push(`room,`);
						} else {
							r.push(`face-down,`);
						}
						r.push(`with multiple vibrating dildos quivering in ${his} pussy.`);
						seX(eventSlave, "vaginal", "assistant", "penetrative", 8);
						seX(eventSlave, "oral", "assistant", "penetrative", 3);
					} else {
						r.push(`Below this, the slave ${himself}`);
						if (isItemAccessible.entry("a huge empathy belly", "bellyAccessory", eventSlave) === true) {
							r.push(`has a huge empathy belly strapped to ${his} middle and`);
						}
						r.push(`is`);
						if (eventSlave.belly >= 300000) {
							r.push(`face-down, perched atop ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy,`);
							} else {
								r.push(`belly,`);
							}
						} else if (eventSlave.belly >= 5000) {
							r.push(`face-down, ${his} rear up in the air to give ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy`);
							} else {
								r.push(`belly`);
							}
							r.push(`room,`);
						} else {
							r.push(`face-down,`);
						}
						r.push(`with multiple vibrating dildos quivering in ${his} ass.`);
						seX(eventSlave, "anal", "assistant", "penetrative", 8);
						seX(eventSlave, "oral", "assistant", "penetrative", 3);
					}
					r.push(`At different intervals, an undulation moves down the dildo, forcing ${him} to stretch wide to allow it to pass into ${his} body. Each "egg" forced into ${him} coincides with another blast from the ejaculating model, and it's filled ${him} so completely that each gush of fake cum flows down ${his} legs to join the puddle on the floor.`);
			}
			r.push(`<span class="devotion inc">"Good ${girl},"</span> ${V.assistant.name} says. The new slave turns resolutely away from the arresting sight and gets on with the inspection, doing ${hisU} best to ignore the lewd noises coming from that part of the room.`);
			eventSlave.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function point() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You tell ${eventSlave.slaveName} that ${he} and your personal assistant really should get a room. ${He} looks at ${V.assistant.name}'s avatar, and then back up at you. ${He} gives you a mischievous look, and then bends down to whisper to the avatar behind ${his} hand.`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`"Why not," the monster${girlA} chuckles,`);
					break;
				case "shemale":
					r.push(`"Oh yeah, sure," the shemale giggles,`);
					break;
				case "amazon":
					r.push(`"Fuck yes," the amazon exclaims,`);
					break;
				case "businesswoman":
					r.push(`"Because you asked," the business${womanA} says,`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`"Of course, cutie!" the fairy giggles,`);
					break;
				case "schoolgirl":
					r.push(`"Aw, hot! Of course," the school${girlA} giggles,`);
					break;
				case "goddess":
				case "hypergoddess":
					r.push(`"Oh, lovely," the goddess says beatifically,`);
					break;
				case "loli":
					r.push(`"K-kay," the ${loliA} says naïvely,`);
					break;
				case "preggololi":
					r.push(`"Okay," the ${loliA} says excitedly,`);
					break;
				case "angel":
					r.push(`"What? But..." the angel says reluctantly,`);
					break;
				case "cherub":
					r.push(`"Sounds fun," the cherub says with a giggle,`);
					break;
				case "incubus":
					r.push(`"I'd never turn down getting my dick sucked," the incubus beams,`);
					break;
				case "succubus":
					r.push(`"You know it," the succubus exclaims,`);
					break;
				case "imp":
					r.push(`"Fuck yes," the imp shouts,`);
					break;
				case "witch":
					r.push(`"That would be nice," the witch says with a blush,`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`"Like you had a choice," the creature screams,`);
			}
			r.push(`and directs ${him} to an unoccupied room with the necessary sex toys.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`Several minutes later, ${V.assistant.name}'s avatar reappears on your desk,`);
			if ((eventSlave.fetishKnown === 0) || (eventSlave.fetish === Fetish.NONE)) {
				r.push(`making love to an avatar of ${eventSlave.slaveName}.`);
			} else if (eventSlave.fetish === "buttslut") {
				r.push(`fucking an avatar of ${eventSlave.slaveName} up the ass. "Excellent idea, ${properTitle()}," ${heA} says, and the slave's avatar, which is a little overwhelmed, waves weakly.`);
				if (canDoAnal(eventSlave)) {
					seX(eventSlave, "anal", "assistant", "penetrative");
				}
			} else if (eventSlave.fetish === "cumslut") {
				r.push(`getting oral from an avatar of ${eventSlave.slaveName}. "Excellent idea, ${properTitle()}," ${heA} says, and the slave's avatar waves, since ${his} mouth is full.`);
				seX(eventSlave, "oral", "assistant", "penetrative");
			} else if (eventSlave.fetish === "sadist") {
				r.push(`getting spanked by an avatar of ${eventSlave.slaveName}. "Oh, ah, e-excellent idea, ${properTitle()}, ow," ${heA} says, and the slave's avatar waves.`);
			} else if (eventSlave.fetish === "masochist") {
				r.push(`raining spanks on an avatar of ${eventSlave.slaveName} as it kisses and licks ${his} lower legs. "Excellent idea, ${properTitle()}," ${heA} says, and the slave's avatar waves weakly, since ${his} mouth is busy.`);
				seX(eventSlave, "oral", "assistant", "penetrative");
			} else if (eventSlave.fetish === "dom") {
				r.push(`getting fucked by an avatar of ${eventSlave.slaveName}. "Excellent idea, ${properTitle()}," ${heA} says, and the slave's avatar waves cheerily.`);
				seX(eventSlave, "penetrative", "assistant", "anal");
			} else if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				r.push(`along with a crowd of copies of ${himself}. They're gangbanging an avatar of ${eventSlave.slaveName}. "Excellent idea, ${properTitle()}," ${heA} says, and the slave's avatar waves weakly.`);
				seX(eventSlave, "oral", "assistant", "penetrative", 5);
				if (canDoAnal(eventSlave)) {
					seX(eventSlave, "anal", "assistant", "penetrative", 5);
				}
				if (canDoVaginal(eventSlave)) {
					seX(eventSlave, "vaginal", "assistant", "penetrative", 5);
				}
			} else if (eventSlave.fetish === "boobs") {
				r.push(`kissing and sucking the nipples of an avatar of ${eventSlave.slaveName}. "Excellent idea, ${properTitle()}," ${heA} breaks off to say, and the slave's avatar waves.`);
				seX(eventSlave, "mammary", "assistant", "penetrative");
			} else if (eventSlave.fetish === "pregnancy") {
				switch (V.assistant.appearance) {
					case "goddess":
					case "hypergoddess":
					case "incubus":
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`fucking a heavily pregnant avatar of ${eventSlave.slaveName}, each thrust producing the lewd sound of a cum-filled hole being fucked. "Excellent idea, ${properTitle()}," ${heA} says, thrusting hard and swelling ${his} partner's belly a bit more; the slave's avatar, which is a little overwhelmed and very full, waves weakly, before returning ${his} hand to ${his} overfilled middle.`);
						break;
					default:
						r.push(`fucking an avatar of ${eventSlave.slaveName}, each thrust producing the lewd sound of a cum-filled hole being fucked. "Excellent idea, ${properTitle()}," ${heA} says, and the slave's avatar, which is a little overwhelmed, waves weakly.`);
				}
				if (canDoVaginal(eventSlave)) {
					seX(eventSlave, "vaginal", V.PC, "penetrative");
				} else {
					seX(eventSlave, "anal", V.PC, "penetrative");
				}
			} else {
				r.push(`making sweet love to an avatar of ${eventSlave.slaveName}, in the missionary position. "Excellent idea, ${properTitle()}," ${heA} says, and then goes back to kissing the slave's delighted avatar.`);
				if (canDoVaginal(eventSlave)) {
					seX(eventSlave, "vaginal", V.PC, "penetrative");
				} else {
					seX(eventSlave, "anal", V.PC, "penetrative");
				}
			}
			r.push(`${eventSlave.slaveName} probably isn't thinking about how far this is from vanilla human sexuality at the moment. But if ${he} took a moment to reflect, you muse, ${he} might be surprised at what <span class="mediumaquamarine">${he}'s learned to be comfortable with.</span>`);
			eventSlave.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
