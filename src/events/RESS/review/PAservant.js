// cSpell:ignore bluuuushing, Siiir, Ma'aaam,

App.Events.RESSPAServant = class RESSPAServant extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.assistant.appearance !== "normal",
			() => V.assistant.personality === 1,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.devotion >= -20,
				s => s.devotion <= 50,
				canSee,
				s => [Job.HOUSE, Job.QUARTER].includes(s.assignment),
				s => canDoVaginal(s) || canDoAnal(s),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;
		const {
			HeA, heA, himA, hisA, himselfA, girlA, womanA, loliA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(`As you begin your day one morning, you hear the quiet`);
		switch (V.assistant.appearance) {
			case "monstergirl":
				r.push(`but unmistakably sensual voice of your monster${girlA}`);
				break;
			case "shemale":
				r.push(`but unmistakably lewd voice of your shemale`);
				break;
			case "amazon":
				r.push(`but unmistakably aggressive voice of your amazon`);
				break;
			case "businesswoman":
				r.push(`but unmistakably dominant voice of your business${womanA}`);
				break;
			case "fairy":
			case "pregnant fairy":
				r.push(`but unmistakably adorable voice of your fairy`);
				break;
			case "goddess":
			case "hypergoddess":
				r.push(`and kindly voice of your goddess`);
				break;
			case "loli":
				r.push(`and childish voice of your ${loliA}`);
				break;
			case "preggololi":
				r.push(`and childish, out of breath voice of your pregnant ${loliA}`);
				break;
			case "angel":
				r.push(`but unmistakably caring voice of your angel`);
				break;
			case "cherub":
				r.push(`yet overly cheerful voice of your cherub`);
				break;
			case "incubus":
				r.push(`and commanding, but obviously aroused voice of your incubus`);
				break;
			case "succubus":
				r.push(`and seductive, but obviously aroused voice of your succubus`);
				break;
			case "imp":
				r.push(`and harassing voice of your imp`);
				break;
			case "witch":
				r.push(`and oddly aroused voice of your witch`);
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				r.push(`and very distinct voice of your avatar`);
				break;
			case "schoolgirl":
				r.push(`but unmistakably suggestive voice of your school${girlA}`);
		}
		r.push(
			`personal assistant coming from your office. Looking in, you are treated to the sight of`,
			App.UI.DOM.combineNodes(contextualIntro(PC, eventSlave, true), "'s")
		);
		if (eventSlave.butt > 8) {
			r.push(`ridiculous bottom jiggling`);
		} else if (eventSlave.butt > 4) {
			r.push(`big behind bouncing`);
		} else {
			r.push(`cute rear`);
		}
		if (eventSlave.belly >= 5000) {
			r.push(r.pop() + `, and the ${belly} rounded belly hanging between ${his} legs,`);
		}
		r.push(`as ${he} reaches out over the glass top of your desk with a soft, dust-free cloth and a bottle of screen cleaner. ${capFirstChar(V.assistant.name)} is displaying ${hisA} avatar right under where the slave is cleaning the glass screen, and ${heA}'s displaying it nude. ${HeA}'s positioned ${himselfA} so that the poor slave appears to be wiping`);
		switch (V.assistant.appearance) {
			case "monstergirl":
				r.push(`${hisA} hair-tentacles`);
				break;
			case "shemale":
				r.push(`the shaft of ${hisA} massive prick`);
				break;
			case "amazon":
				r.push(`the insides of ${hisA} muscular thighs`);
				break;
			case "businesswoman":
				r.push(`${hisA} pussy`);
				break;
			case "fairy":
				r.push(`${hisA} tiny body`);
				break;
			case "pregnant fairy":
				r.push(`${hisA} tiny yet swollen body`);
				break;
			case "goddess":
				r.push(`${hisA} motherly tits`);
				break;
			case "hypergoddess":
				r.push(`${hisA} huge pregnant belly`);
				break;
			case "loli":
				r.push(`${hisA} flat chest`);
				break;
			case "preggololi":
				r.push(`${hisA} pregnant belly`);
				break;
			case "angel":
				r.push(`${hisA} wide-spread wings`);
				break;
			case "cherub":
				r.push(`${hisA} cute pussy`);
				break;
			case "incubus":
				r.push(`${hisA} throbbing prick`);
				break;
			case "succubus":
				r.push(`${hisA} lovely pussy`);
				break;
			case "imp":
				r.push(`${hisA} pussy`);
				break;
			case "witch":
				r.push(`${hisA} plump tits`);
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				r.push(`${hisA} phallic tentacles`);
				break;
			case "schoolgirl":
				r.push(`${hisA} perky tits`);
		}
		r.push(`down with screen cleaner, and is talking dirty to the furiously blushing servant. "Ohh, that feels good," ${heA} moans. "Rub me right there, you ${SlaveTitle(eventSlave)} slut! I love it!" The poor slave is doing ${his} best to hurry, embarrassed and unsure of how to react to ${V.assistant.name}'s behavior.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Share the slave with your PA`, share, virginityWarning()),
			canDoAnal(eventSlave)
				? new App.Events.Result(`Double penetrate the slave with your PA`, double, virginityWarning())
				: new App.Events.Result()
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function share() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(
				`You enter, eliciting an embarrassed`,
				Spoken(eventSlave, `"Um, hi ${Master}"`),
				`from ${eventSlave.slaveName} and a cheery wave from ${V.assistant.name}. At this stage of your morning ablutions, you're conveniently naked, so you`
			);
			if (PC.belly >= 5000) {
				r.push(`heft yourself`);
			} else if (PC.belly >= 1500) {
				r.push(`clamber up`);
			} else {
				r.push(`leap up`);
			}
			r.push(`onto the desktop and kneel upright, legs splayed. (Naturally, the desk is reinforced and sealed for exactly this reason.) You point meaningfully at your`);
			if (PC.dick !== 0) {
				r.push(`stiff prick`);
				if (PC.vagina !== -1) {
					r.push(`and flushed pussy`);
				}
				r.push(r.pop() + `, and the obedient slave`);
				if (eventSlave.belly >= 5000) {
					r.push(`hefts ${himself}`);
				} else {
					r.push(`clambers`);
				}
				r.push(`up to suck you off`);
				if (PC.vagina !== -1) {
					r.push(`and eat you out`);
				}
				r.push(r.pop() + `. When you're close, you surprise ${him} by pulling your cock out of ${his} mouth and blowing your load onto the glass.`);
			} else {
				r.push(`hot cunt, and the obedient slave`);
				if (eventSlave.belly >= 5000) {
					r.push(`hefts ${himself}`);
				} else {
					r.push(`clambers`);
				}
				r.push(`up to eat you out. You surprise ${him} by taking your time, drawing out the oral session with the ulterior motive of getting as much saliva and pussyjuice onto the glass as possible.`);
			}
			r.push(`${capFirstChar(V.assistant.name)} shifts ${hisA} avatar so that this lands all over ${hisA}`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`cocks.`);
					break;
				case "shemale":
					r.push(`huge cock.`);
					break;
				case "amazon":
					r.push(`muscular pussy.`);
					break;
				case "businesswoman":
					r.push(`mature pussy.`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`tiny body.`);
					break;
				case "goddess":
					r.push(`fertile pussy.`);
					break;
				case "hypergoddess":
					r.push(`gaping pussy.`);
					break;
				case "loli":
				case "cherub":
					r.push(`tight virgin pussy.`);
					break;
				case "preggololi":
					r.push(`tight young pussy.`);
					break;
				case "angel":
					r.push(`virgin pussy.`);
					break;
				case "incubus":
					r.push(`perfect dick.`);
					break;
				case "succubus":
					r.push(`lovely pussy.`);
					break;
				case "imp":
					r.push(`slutty pussy.`);
					break;
				case "witch":
					r.push(`plump breasts.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`pussy-like body.`);
					break;
				case "schoolgirl":
					r.push(`pretty young pussy.`);
			}
			r.push(`"Clean me off, ${eventSlave.slaveName}," ${heA} demands, winking broadly at you. The slave, knowing that commands from ${himA} are commands from you, repositions ${himself} to lick up the`);
			if (PC.dick !== 0) {
				r.push(`ejaculate`);
				if (PC.vagina !== -1) {
					r.push(`and`);
				}
			}
			if (PC.vagina !== -1) {
				r.push(`girlcum`);
			}
			r.push(r.pop() + `.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`This brings the slave into a crouch with ${his} ass pointed at you,`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina > 2) {
					r.push(`${his} experienced pussy practically begging for a pounding.`);
				} else if (eventSlave.vagina > 1) {
					r.push(`${his} nice pussy practically begging for a good hard fucking.`);
				} else {
					r.push(`${his} tight little pussy completely vulnerable.`);
				}
				r.push(`As you`);
				if (PC.dick !== 0) {
					if (PC.vagina !== -1) {
						r.push(`use manual stimulation of your pussy to get your dick`);
					} else {
						r.push(`stroke yourself`);
					}
					r.push(`rapidly back to full mast,`);
				} else {
					r.push(`don a strap-on,`);
				}
				r.push(`${V.assistant.name} opines helpfully, "Hey ${eventSlave.slaveName}! You're about to get fucked!" The slave reacts by obediently reaching back to spread ${his} buttocks and relaxing, but ${V.assistant.name} ruins ${his} attempt at graceful submission.`);
				if (PC.title === 1) {
					r.push(`"Siiir,`);
				} else {
					r.push(`"Ma'aaam,`);
				}
				r.push(`${he}'s bluuuushing," ${he} says tauntingly, and the slave stiffens with renewed embarrassment, not to mention stimulation, as you penetrate ${him}.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				if (eventSlave.anus > 2) {
					r.push(`${his} big asspussy practically begging for a pounding.`);
				} else if (eventSlave.anus > 1) {
					r.push(`${his} nice asshole practically begging for a good hard fucking.`);
				} else {
					r.push(`${his} tight little rosebud completely vulnerable.`);
				}
				r.push(`As`);
				if (PC.dick !== 0) {
					if (PC.vagina !== -1) {
						r.push(`use manual stimulation of your pussy to get your dick`);
					} else {
						r.push(`stroke yourself`);
					}
					r.push(`rapidly back to full mast,`);
				} else {
					r.push(`don a strap-on,`);
				}
				r.push(`${V.assistant.name} opines helpfully, "Hey ${eventSlave.slaveName}! You're about to get buttfucked!" The slave reacts by obediently reaching back to spread ${his} buttocks, and relaxes ${his} anus, but ${V.assistant.name} ruins ${his} attempt at graceful anal submission."`);
				if (PC.title === 1) {
					r.push(`Siiir,`);
				} else {
					r.push(`Ma'aaam,`);
				}
				r.push(`${he}'s bluuuushing," ${heA} says tauntingly, and the slave stiffens with renewed embarrassment, not to mention discomfort, as you penetrate ${him}.`);
				r.push(VCheck.Anal(eventSlave, 1));
			}
			r.push(`${He} keeps licking away, cleaning up the mess you made as ${V.assistant.name} does everything ${he} can to make it seem like the slave is pleasuring ${him}. Partway through, ${V.assistant.name} sticks out a hand for a high-five from you, producing a gurgle of indignation <span class="mediumaquamarine">or perhaps even laughter</span> as ${his} owner and ${his} owner's personal assistant program high-five over ${his} back.`);
			eventSlave.trust += 4;
			seX(eventSlave, "oral", PC, "penetrative");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function double() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(
				`You enter, eliciting an embarrassed`,
				Spoken(eventSlave, `"Um, hi ${Master}"`),
				`from ${eventSlave.slaveName}, and ask ${V.assistant.name} if ${he}'d like to DP the slave with you.`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`"Oh yes," ${heA} purrs threateningly over the slave's moan of apprehension, and ${hisA} avatar begins to stroke ${hisA} dicks meaningfully.`);
					break;
				case "shemale":
				case "incubus":
					r.push(`"Fuck yes," ${heA} groans over the slave's moan of apprehension, and ${hisA} avatar begins to stroke ${hisA} cock meaningfully.`);
					break;
				case "amazon":
					r.push(`"Yeah!" ${heA} shouts over the slave's moan of apprehension, and ${hisA} avatar quickly dons a big strap-on carved from mammoth tusk.`);
					break;
				case "businesswoman":
					r.push(`"Oh yes," ${heA} purrs sadistically over the slave's moan of apprehension, and ${hisA} avatar quickly dons a big strap-on.`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`"Oh yeah!" ${heA} shouts over the slave's moan of apprehension, and ${hisA} avatar quickly conjures up a magic floating dick.`);
					break;
				case "goddess":
				case "hypergoddess":
					r.push(`"That would be lovely," ${heA} says radiantly over the slave's moan of apprehension, and ${hisA} avatar acquires a phallus of light.`);
					break;
				case "angel":
				case "cherub":
					r.push(`"If you insist," ${heA} says reluctantly over the slave's moan of apprehension, and ${hisA} avatar acquires a phallus of light.`);
					break;
				case "succubus":
					r.push(`"Just this once," ${heA} says stroking ${his} clit as it steadily swells into a fully functional cock.`);
					break;
				case "imp":
					r.push(`"Fuck yes," ${heA} groans over the slave's moan of apprehension, and ${hisA} avatar quickly dons a huge, spiked strap-on.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`"Of course," ${heA} shouts over the slave's moan of apprehension, and ${hisA} avatar quickly forms a huge, fleshy, bulbous cock.`);
					break;
				default:
					r.push(`"Fuck yeah!" ${heA} cheers over the slave's moan of apprehension, and ${hisA} avatar quickly dons a big strap-on.`);
			}
			r.push(`You indicate a fuckmachine in the corner of the room, and the slave obediently hurries over to it. It's vertical, and ${he} hops up on it, positioning ${his} anus over its`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`pair of dildos. They insert themselves`);
					break;
				case "shemale":
				case "incubus":
					r.push(`frighteningly big dildo. It inserts itself`);
					break;
				case "amazon":
					r.push(`animalistically ribbed dildo. It inserts itself`);
					break;
				case "imp":
					r.push(`terrifyingly spiked, huge dildo. It inserts itself`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`frighteningly big, lumpy and uneven dildo. It inserts itself`);
					break;
				default:
					r.push(`large dildo. It inserts itself`);
			}
			r.push(`gently but firmly and then stops, the panting slave's`);
			if (eventSlave.weight > 130) {
				r.push(`thick`);
			} else if (eventSlave.weight > 95) {
				r.push(`chubby`);
			} else if (eventSlave.muscles > 30) {
				r.push(`heavily muscled`);
			} else if (eventSlave.preg >= eventSlave.pregData.normalBirth/8) {
				r.push(`motherly`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`feminine`);
			}
			r.push(`thighs quivering a little from supporting ${his} body in its perch atop the machine, and from the fullness of ${his} anus.`);
			r.push(VCheck.Anal(eventSlave, 3));
			r.push(`${He} knows this is going to be challenging, and is breathing deeply, doing ${his} best to stay relaxed. You cannot resist slapping your`);
			if (PC.dick !== 0) {
				r.push(`big cock lightly`);
			} else {
				r.push(`lubricated strap-on`);
			}
			r.push(`against ${his} cheek, producing a groan of apprehension.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`You push ${him} gently backward, letting ${him} get accustomed to the new angle.`);
			if (eventSlave.boobs > 2000) {
				r.push(`${His} monstrous tits spread to either side of ${his}`);
				if (eventSlave.belly >= 5000) {
					r.push(belly);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnant`);
					}
					r.push(`belly,`);
				} else {
					r.push(`now upright torso,`);
				}
				r.push(`and you take a moment to play with them as ${he} prepares ${himself}.`);
			}
			if (canDoVaginal(eventSlave)) {
				r.push(`${He} gasps as ${he} feels`);
				if (PC.dick !== 0) {
					r.push(`your hot dickhead`);
				} else {
					r.push(`the slick head of your strap-on`);
				}
				r.push(`part ${his} pussylips, no doubt feeling full already.`);
				r.push(VCheck.Vaginal(eventSlave, 3));
				r.push(`When you're all the way in, the`);
				if (V.assistant.appearance === "monstergirl") {
					r.push(`dildos in ${his} butt begin`);
				} else {
					r.push(`dildo in ${his} butt begins`);
				}
				r.push(`to fuck ${him}, harder and harder, as ${V.assistant.name} moans happily. The all-encompassing feeling of fullness as ${his} cunt and ass are fucked to the very limit of their capacities`);
			} else {
				r.push(`${He} gasps as ${he} feels you push a finger up ${his} already-full butt and pull ${his} sphincter a bit wider. You withdraw it and replace it with`);
				if (PC.dick !== 0) {
					r.push(`your turgid cock`);
				} else {
					r.push(`your strap-on`);
				}
				r.push(`the slave writhes involuntarily, ${his} body trying to refuse the invasion of yet another phallus.`);
				r.push(VCheck.Anal(eventSlave, 3));
				r.push(`When you're all the way in, the`);
				if (V.assistant.appearance === "monstergirl") {
					r.push(`dildos alongside your`);
					if (PC.dick !== 0) {
						r.push(`dick`);
					} else {
						r.push(`strap-on`);
					}
					r.push(`in ${his} butt begin`);
				} else {
					r.push(`dildo alongside your`);
					if (PC.dick !== 0) {
						r.push(`dick`);
					} else {
						r.push(`strap-on`);
					}
					r.push(`in ${his} butt begins`);
				}
				r.push(`to fuck ${him}, harder and harder, as ${V.assistant.name} moans happily. The all-encompassing feeling of fullness as ${his} ass is fucked to the very limit of its capacity`);
			}
			r.push(`quickly drives all feminine grace, presence of mind, or really, <span class="devotion inc">conscious thought out of the poor slave.</span> After begging for mercy for a short while, ${he} lapses into animal groans, drooling and leaking tears out the corner of ${his} eyes as you and ${V.assistant.name} fuck ${him} into insensibility. When you climax, ${V.assistant.name} ejaculates, filling the slave's anus with warm fluid.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`By this point ${he}'s so helpless that you`);
			if (eventSlave.belly >= 300000 || eventSlave.weight > 190) {
				r.push(`have to struggle to lift`);
			} else {
				r.push(`gently lift`);
			}
			r.push(`${him} off the fuckmachine and carry ${him} to the shower. You set ${him} down there, and ${V.assistant.name} activates the water, using the powerful jets in pulses to massage life back into your exhausted fuckpuppet. ${His} avatar appears on a screen behind the shower, creating an optical illusion that makes it look like ${he}'s petting the slave in time with the water. ${He} reassures to the slave as ${he} does:`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`"You're a good little cocksock," ${he} says kindly.`);
					break;
				case "shemale":
					r.push(`"I like your butthole," ${he} says politely.`);
					break;
				case "amazon":
					r.push(`"I like fucking your butthole," ${he} says kindly.`);
					break;
				case "businesswoman":
					r.push(`"I'm sure you won't be sold right away," ${he} says.`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`"You're a good ${girl}," ${he} says.`);
					break;
				case "goddess":
				case "hypergoddess":
					r.push(`"There, there," ${he} says kindly. "You are a good sex slave."`);
					break;
				case "angel":
				case "cherub":
					r.push(`"There, there," ${he} says kindly. "You are a good ${girl}."`);
					break;
				case "incubus":
				case "succubus":
				case "imp":
					r.push(`"You're a good little cocksleeve," ${he} says honestly.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`"You're a good little nursery," ${he} says.`);
					break;
				default:
					r.push(`"I like you," ${he} says cheerily.`);
			}
			eventSlave.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
