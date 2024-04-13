// cSpell:ignore smokables, Miiistress, loooves, Maaaster

App.Events.RESSTrustingHG = class RESSTrustingHG extends App.Events.BaseEvent {
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
				s => s.trust > 50,
				s => s.assignment === Job.HEADGIRL, // removed condition V.HeadgirlID !== 0 and eventSlave.ID === V.HeadgirlID during conversion
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl, hers
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`is a busy ${girl}. Your Head Girl is heading for bed, but ${he}'s not done with the day's work just yet. ${He} walks into your office with a pensive look on ${his} face, using a tablet to fiddle with slaves' schedules for tomorrow. Since ${he} was about to retire, ${he}'s nude: you can't help but notice, in the dimmed light of nighttime in your penthouse, the way the low glow of the tablet`
		);
		if (eventSlave.boobs > 5000) {
			r.push(`falls across the tops of ${his} absurd boobs, since ${he}'s forced to hold it on top of them to use it.`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`falls across the top of ${his} ${belly}, tautly `);
			if (eventSlave.belly >= 3000) {
				r.push(`pregnant`);
			} else {
				r.push(`swollen`);
			}
			r.push(` belly.`);
		} else if (!(eventSlave.chastityPenis) && canAchieveErection(eventSlave)) {
			if (eventSlave.dick > 4) {
				r.push(`makes ${his} perpetual, formidable erection cast a shadow.`);
			} else if (eventSlave.dick > 2) {
				r.push(`catches the head of ${his} stiffly erect dick.`);
			} else {
				r.push(`highlights ${his} stiff little girldick.`);
			}
		} else if (eventSlave.nipples === "huge") {
			r.push(`throws a shadow off each of ${his} massive nipples and down the lower halves of ${his} boobs.`);
		} else if (eventSlave.belly >= 1500) {
			r.push(`makes ${his} rounded middle cast a shadow.`);
		} else if (eventSlave.muscles > 95) {
			r.push(`gives extra definition to ${his} glorious muscles.`);
		} else if (eventSlave.weight > 95) {
			r.push(`highlights ${his} soft belly.`);
		} else if (eventSlave.dick > 0) {
			r.push(`rests on the base of ${his} soft cock.`);
		} else if (eventSlave.weight > 10) {
			r.push(`flatters ${his} soft body.`);
		} else {
			r.push(`flatters ${him}.`);
		}
		App.Events.addParagraph(node, r);

		r = [];
		r.push(
			`${He} did not expect to find you here, and is so preoccupied that ${he} doesn't notice you right away. When ${he} does, ${he} smiles.`,
			Spoken(eventSlave, `"Good evening,`)
		);
		if (V.HGFormality === 1) {
			r.push(Spoken(eventSlave, `${Master},"`));
			r.push(`${he} murmurs properly, and keeps working. Only a slight blush, barely detectable in the low light, betrays ${his} consternation at not greeting you immediately.`);
		} else if (eventSlave.trust > 95) {
			if (PC.customTitle) {
				if (SlaveStatsChecker.checkForLisp(eventSlave)) {
					r.push(`${PC.customTitleLisp},"`);
				} else {
					r.push(`${PC.customTitle},"`);
				}
			} else if (PC.title !== 0) {
				r.push(Spoken(eventSlave, `Sir,"`));
			} else {
				r.push(Spoken(eventSlave, `Ma'am,"`));
			}
			r.push(`${he} murmurs. Even in the dim light, you perceive a slight blush of pleasure from ${him} as ${he} savors the status of being allowed to call you that. ${He} goes back to working with a little smile still playing across ${his} lips.`);
		} else {
			r.push(`um,`);
			if (PC.customTitle) {
				if (SlaveStatsChecker.checkForLisp(eventSlave)) {
					r.push(`${PC.customTitleLisp},"`);
				} else {
					r.push(`${PC.customTitle},"`);
				}
			} else if (PC.title !== 0) {
				r.push(Spoken(eventSlave, `S-sir,"`));
			} else {
				r.push(`M-ma'am,"`);
			}
			r.push(`${he} stammers hesitantly. ${He} isn't comfortable with your permission to be less formal in private, and blushes furiously at ${his} awkwardness. ${He} takes refuge in ${his} tablet.`);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Commend ${his} service`, commend),
			new App.Events.Result(`Share some refreshments with ${him}`, share),
		]);

		function commend() {
			let frag = document.createDocumentFragment();
			r = [];
			r.push(`You clear your throat and compliment ${him}, commending ${his} work ethic, trustworthiness, and loyalty. ${He} blushes much harder as ${he} understands. "Thank you,`);
			if (V.HGFormality === 1) {
				r.push(`${Master}!"`);
			} else {
				if (PC.customTitle) {
					if (SlaveStatsChecker.checkForLisp(eventSlave)) {
						r.push(`${PC.customTitleLisp}!"`);
					} else {
						r.push(`${PC.customTitle}!"`);
					}
				} else if (PC.title !== 0) {
					r.push(Spoken(eventSlave, `Sir!"`));
				} else {
					r.push(Spoken(eventSlave, `Ma'am!"`));
				}
			}
			r.push(
				`${he} says fervently, and gestures at the tablet.`,
				Spoken(eventSlave, `"I've noticed a couple of the slaves working better together recently, so I'm making some minor adjustments to give them more shifts together."`)
			);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`You're sure ${he}'ll do ${his} best, and you tell ${him} so. ${He} thanks you again, and you both go back to your work. Though your Head Girl continues manipulating ${his} tablet diligently, ${he} can't seem to stop ${himself} from <span class="hotpink">stealing the occasional glance at you.</span> ${His} ${App.Desc.eyesColor(eventSlave)}, dark in the dimness of the office, seem to have an unaccountable sheen.`);
			if (V.assistant.personality !== 0) {
				const {
					heA, hisA, girlA, himselfA, loliA
				} = getPronouns(assistant.pronouns().main).appendSuffix("A");
				r.push(`${capFirstChar(V.assistant.name)}'s ${V.assistant.appearance} avatar appears on your desktop, glowing brightly, and ruins the moment. "${eventSlave.slaveName} loooves ${his} `);
				if (PC.customTitle) {
					r.push(`${PC.customTitle},"`);
				} else if (PC.title !== 0) {
					r.push(`Maaaster,"`);
				} else {
					r.push(`Miiistress,"`);
				}
				r.push(`${heA} taunts,`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`${hisA} hair forming a heart shape.`);
						break;
					case "shemale":
						r.push(`using ${hisA} hands to make a heart shape over ${hisA} balls.`);
						break;
					case "amazon":
						r.push(`grinning far more sweetly than ${hisA} muscular form should be able to manage.`);
						break;
					case "businesswoman":
						r.push(`though ${heA}'s blushing ${himselfA}.`);
						break;
					case "cherub":
					case "fairy":
					case "pregnant fairy":
						r.push(`flitting around and giggling excitedly.`);
						break;
					case "goddess":
						r.push(`massaging ${hisA} pregnant belly meaningfully.`);
						break;
					case "hypergoddess":
						r.push(`massaging ${hisA} squirming pregnant belly meaningfully.`);
						break;
					case "loli":
						r.push(`giggling playfully.`);
						break;
					case "preggololi":
						r.push(`giggling playfully, though ${hisA} hands have wandered to ${hisA} crotch.`);
						break;
					case "angel":
						r.push(`using ${hisA} hands to make a heart shape.`);
						break;
					case "incubus":
						r.push(`using ${hisA} hands to make a heart shape around ${hisA} erection as ${heA} thrusts.`);
						break;
					case "succubus":
						if (PC.dick !== 0) {
							r.push(`forms an "O" with ${hisA} lips and makes exaggerated head bobbing motions.`);
						} else {
							r.push(`forms a "V" with ${hisA} fingers and wiggles ${hisA} tongue in it.`);
						}
						break;
					case "imp":
						r.push(`flapping around and cackling manically.`);
						break;
					case "witch":
						r.push(`while holding out a mostly empty vial of love potion.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`forming half of ${himselfA} into an enormous pussy, the other into a giant dick, and introducing the two to each other.`);
						break;
					case "schoolgirl":
						r.push(`the very picture of a malicious school${girlA}.`);
						break;
					default:
						r.push(`turning ${hisA} avatar a throbbing pink.`);
				}
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(
					`Your Head Girl turns a darker shade of red.`,
					Spoken(eventSlave, `"Oh, shut up, you little`)
				);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(Spoken(eventSlave, `monster,"`));
						break;
					case "shemale":
						r.push(Spoken(eventSlave, `cockmonster,"`));
						break;
					case "amazon":
						r.push(Spoken(eventSlave, `dyke,"`));
						break;
					case "businesswoman":
						r.push(Spoken(eventSlave, `witch,"`));
						break;
					case "fairy":
					case "pregnant fairy":
						r.push(Spoken(eventSlave, `mosquito,"`));
						break;
					case "goddess":
					case "hypergoddess":
						r.push(Spoken(eventSlave, `cow,"`));
						break;
					case "loli":
						r.push(Spoken(eventSlave, `midget,"`));
						break;
					case "preggololi":
						r.push(Spoken(eventSlave, `slut ${loliA},"`));
						break;
					case "angel":
						r.push(Spoken(eventSlave, `turkey,"`));
						break;
					case "cherub":
						r.push(Spoken(eventSlave, `dove,"`));
						break;
					case "incubus":
						r.push(Spoken(eventSlave, `dick,"`));
						break;
					case "succubus":
						r.push(Spoken(eventSlave, `cunt,"`));
						break;
					case "imp":
						r.push(Spoken(eventSlave, `bat,"`));
						break;
					case "witch":
						r.push(Spoken(eventSlave, `blunderer,"`));
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(Spoken(eventSlave, `shapeshifter,"`));
						break;
					case "schoolgirl":
						r.push(Spoken(eventSlave, `slut,"`));
						break;
					default:
						r.push(Spoken(eventSlave, `toaster,"`));
				}
				r.push(`${he} says cattily, but ${he} smiles as well.`);
			}
			eventSlave.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function share() {
			let frag = document.createDocumentFragment();
			r = [];
			r.push(`You reach into the back of your desk, where your private reserves are, and wordlessly offer ${him} a ${generalRefreshment()}.`);
			r.push(`${He} stares at you disbelievingly for a moment before stammering ${his} thanks and accepting it with both hands. ${He} holds it uncertainly, watching you get one yourself.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${He} is first among your slaves, but ${he} is still very much a slave. ${He} neither receives nor expects`);
			if (PC.refreshmentType === 0) {
				r.push(`indulgences like tobacco and other smokables. Carcinogens are sometimes the necessary side effects of slave body modification, not an acceptable downside of luxury.`);
			} else if (PC.refreshmentType === 1) {
				r.push(`drink other than what the slave feeding systems provide ${him}. ${He} might be your Head Girl, but the liquid food keeps ${his} libido charged, ${his} body healthy, and ${his} asshole invitingly clean, just like any other slave.`);
			} else if (PC.refreshmentType === 2) {
				r.push(`food other than what the slave feeding systems provide ${him}. ${He} might be your Head Girl, but the liquid food keeps ${his} libido charged, ${his} body healthy, and ${his} asshole invitingly clean, just like any other slave.`);
			} else {
				r.push(`drugs other than what the drug dispensers provide ${him}. Addictive drugs are rarely provided to slaves, replaced instead with slightly healthier, but no less addictive, aphrodisiacs.`);
			}
			r.push(`But it'll do no harm, just this once, and you tell ${him} so. ${He} nods, not wanting to spoil the moment by speaking.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (PC.refreshmentType === 0) {
				r.push(`After you light ${his} ${PC.refreshment} for ${him}, ${he} holds the `);
				if (canTaste(eventSlave)) {
					r.push(`first taste`);
				} else {
					r.push(`feeling`);
				}
				r.push(` of its smoke in ${his} mouth for a long, sensual moment before letting it trickle back out through ${his} lips.`);
			} else if (PC.refreshmentType === 1 || PC.refreshmentType === 2) {
				r.push(`${He} holds the `);
				if (canTaste(eventSlave)) {
					r.push(`first taste`);
				} else {
					r.push(`feeling`);
				}
				r.push(` of it in ${his} mouth for a long, sensual moment before swallowing reverently.`);
			} else {
				r.push(`${He} savors the thrill of using ${PC.refreshment} for a moment, before turning to you, an almost desperate need on ${his} face.`);
			}
			r.push(`You return to work, and ${he} follows your example, though ${he}'s rather distracted. When ${he} finishes ${hers}, ${he} sets ${his} tablet down for a moment and comes over to you, doing ${his} best to show ${his} naked body to its best advantage as ${he} comes. ${He} gives you a deep kiss,`);
			if (PC.refreshmentType === 0 || PC.refreshmentType === 1 || PC.refreshmentType === 2) {
				r.push(`which tastes of fine ${PC.refreshment}, with a hint of ${eventSlave.slaveName},`);
			} else {
				r.push(`with plenty of tongue,`);
			}
			r.push(`and then goes back to work, <span class="mediumaquamarine">smiling unconsciously</span> as ${he} savors the lingering `);
			if (PC.refreshmentType === 3 || PC.refreshmentType === 4 || PC.refreshmentType === 5 || PC.refreshmentType === 6) {
				r.push(`rush.`);
			} else {
				if (canTaste(eventSlave)) {
					r.push(`flavor.`);
				} else {
					r.push(`sensation.`);
				}
			}
			eventSlave.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
