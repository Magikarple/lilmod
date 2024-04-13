App.Events.RESSWaistlineWoes = class RESSWaistlineWoes extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canHear,
				canWalk,
				hasAnyArms,
				hasAnyLegs,
				s => s.devotion > 20 && s.devotion <= 50,
				s => s.trust > 20 && s.trust <= 50,
				s => s.weight > 20 && s.weight <= 30,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, hers, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let t = [];
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`has spent the last half-hour pacing up and down the hall before your office, clearly lost in thought. While ${he} has nowhere to be at the moment, it is beginning to become a detriment to your work, so you call ${him} in to get to the bottom of the matter.`);
		App.Events.addParagraph(node, t);

		t = [];
		if (canTalk(eventSlave)) {
			t.push(`"${Master}," ${he} mumbles,`);
			t.push(Spoken(eventSlave, `"am I looking a little heavier?"`));
		} else {
			t.push(`${He} gestures at ${his} middle and`);
		}
		switch (eventSlave.clothes) {
			case "a slutty maid outfit":
			case "a nice maid outfit":
			case "a military uniform":
			case "a schutzstaffel uniform":
			case "a slutty schutzstaffel uniform":
			case "a mounty outfit":
			case "lederhosen":
			case "a red army uniform":
			case "a police uniform":
			case "battlearmor":
			case "Imperial Plate":
			case "a biyelgee costume":
			case "battledress":
			case "a gothic lolita dress":
			case "a hanbok":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"This outfit feels tight around my middle, I feel like it fit last week..."`));
					t.push(He);
				}
				t.push(`adjusts ${his} clothing, clearly uncomfortable.`);
				break;
			case "a cheerleader outfit":
			case "cutoffs and a t-shirt":
			case "a slutty outfit":
			case "conservative clothing":
			case "a nice nurse outfit":
			case "a bimbo outfit":
			case "stretch pants and a crop-top":
			case "a schoolgirl outfit":
			case "leather pants and a tube top":
			case "a t-shirt":
			case "a t-shirt and thong":
			case "a t-shirt and panties":
			case "sport shorts and a t-shirt":
			case "a t-shirt and jeans":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"These clothes feel tighter than I remember, I mean, look how much of me is spilling out of them..."`));
					t.push(He);
				}
				t.push(`pinches ${his} belly, clearly grabbing hold of more of ${himself} than ${he} wants to.`);
				break;
			case "a huipil":
			case "a chattel habit":
			case "harem gauze":
			case "a slutty nurse outfit":
			case "a burkini":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I feel really exposed, like the this used to cover more of me..."`));
					t.push(He);
				}
				t.push(`tugs at ${his} clothing, clearly uncomfortable.`);
				break;
			case "a slutty qipao":
			case "a halter top dress":
			case "an evening dress":
			case "a ball gown":
			case "a long qipao":
			case "a mini dress":
			case "a maternity dress":
			case "a courtesan dress":
			case "a Santa dress":
			case "a slave gown":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I swear this fit me last week, but I feel like a sausage right now..."`));
					t.push(He);
				}
				t.push(`tugs at ${his} dress, clearly uncomfortable.`);
				break;
			case "attractive lingerie":
			case "kitty lingerie":
			case "attractive lingerie for a pregnant woman":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"This lingerie feels tight all over, I feel like they fit better last week..."`));
					t.push(He);
				}
				t.push(`adjusts ${his} panties, clearly uncomfortable.`);
				break;
			case "a succubus outfit":
			case "a fallen nuns habit":
			case "a dirndl":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I swear I was able to lace this just last week..."`));
					t.push(He);
				}
				t.push(`pinches ${his} belly, clearly grabbing hold of more of ${himself} than ${he} wants to.`);
				break;
			case "slutty business attire":
			case "Western clothing":
			case "nice business attire":
			case "a confederate army uniform":
			case "a button-up shirt and panties":
			case "a button-up shirt":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I feel like this fit me fine last week, yet now..."`));
					t.push(He);
				}
				t.push(`attempts to button ${his} top, before exhaling and giving up.`);
				break;
			case "a toga":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"This feels really tight, I mean, look how much of me is spilling out of it..."`));
					t.push(He);
				}
				t.push(`adjusts ${his} toga, clearly uncomfortable.`);
				break;
			case "restrictive latex":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I know it's supposed to be tight, but I feel like a sausage..."`));
					t.push(He);
				}
				t.push(`tugs at the restrictive latex, clearly uncomfortable for reasons outside their intent.`);
				break;
			case "a penitent nuns habit":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I know it's supposed to be tight, but I feel like a sausage..."`));
					t.push(He);
				}
				t.push(`gingerly tugs at ${his} coarse habit, clearly uncomfortable for reasons other than the chafing.`);
				break;
			case "a scalemail bikini":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"This feels really tight, I mean, look how much of me is spilling out of it..."`));
					t.push(He);
				}
				t.push(`picks at ${his} scalemail, clearly uncomfortable.`);
				break;
			case "clubslut netting":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"This feels really tight, I mean, look how much of me is spilling out all over it..."`));
					t.push(He);
				}
				t.push(`pokes at the flesh bulging through the mesh, clearly uncomfortable.`);
				break;
			case "spats and a tank top":
			case "a comfortable bodysuit":
			case "a latex catsuit":
			case "a cybersuit":
			case "a tight Imperial bodysuit":
			case "a kimono":
			case "a burqa":
			case "an oversized t-shirt and boyshorts":
			case "an oversized t-shirt":
			case "a sweater":
			case "a sweater and cutoffs":
			case "a sweater and panties":
			case "a nice pony outfit":
			case "a slutty pony outfit":
			case "a hijab and abaya":
			case "a niqab and abaya":
			case "a klan robe":
			case "a slutty klan robe":
			case "a hijab and blouse":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"This outfit is showing off more of me than I remember, and I swear I wasn't so bulgy last week..."`));
					t.push(He);
				}
				t.push(`pokes at ${his} belly, clearly doubting ${himself}.`);
				break;
			case "an apron":
			case "overalls":
			case "a monokini":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"There's just so much of me hanging out of it, and I'm pretty sure this didn't shrink in the wash..."`));
					t.push(He);
				}
				t.push(`pinches ${his} belly, clearly grabbing hold of more of ${himself} than ${he} wants to.`);
				break;
			case "a bunny outfit":
			case "a leotard":
			case "a one-piece swimsuit":
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"There's just so much of me poking out of it, I swear it fit right last week..."`));
					t.push(He);
				}
				t.push(`pinches at the folds of flesh peeking out around ${his} outfit, clearly bothered by it.`);
				break;
			default:
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I feel like I wasn't this soft last week..."`));
					t.push(He);
				}
				t.push(`pinches ${his} belly, clearly grabbing hold of more of ${himself} than ${he} wants to.`);
		}
		t.push(`The ${SlaveTitle(eventSlave)} is`);
		if (eventSlave.diet === "fattening") {
			t.push(`purposefully being fattened up, so it really shouldn't come as a surprise to ${him}.`);
		} else if (eventSlave.behavioralFlaw === "gluttonous") {
			t.push(`a known stress eater, so perhaps somebody has been sneaking food again.`);
		} else if (eventSlave.behavioralFlaw === "anorexic") {
			t.push(`a known anorexic, so ${he}'s likely overreacting.`);
		} else {
			t.push(`certainly a little chubby, so perhaps this is a good time to get a handle on things.`);
		}
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Yes`, uFatGirl),
			new App.Events.Result(`No`, uThinGirl),
			new App.Events.Result(`Encourage ${him} to get bigger`, encourage),
			new App.Events.Result(`Send ${him} to the gym`, gym),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Help ${him} burn some calories`, sex, virginityWarning())
				: new App.Events.Result(),
			/* ((eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave) && (eventSlave.belly + V.PC.belly < 5000) && ((eventSlave.height >= V.PC.height * 1.5) || eventSlave.muscles > 70))
				? new App.Events.Result(`Take ${him} for a jog`, jogging, "This option will penetrate you")
				: new App.Events.Result(),*/
			new App.Events.Result(`Send ${him} on ${his} way`, shoo),
		]);

		function virginityWarning() {
			if (V.PC.dick > 0) {
				if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
					return `This option will take ${his} virginity`;
				} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
					return `This option will take ${his} anal virginity`;
				}
			}
			return null;
		}

		function uFatGirl() {
			let t = [];
			if ((eventSlave.diet === "fattening" || eventSlave.dietMilk > 0) && eventSlave.intelligence + eventSlave.intelligenceImplant > 15) {
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"So the diet is working well, ${Master}? That's good, I suppose. I'm just a bit shocked at how honest you were; people usually try to dodge that question or outright lie."`));
				} else {
					t.push(`${He} smiles before explaining ${he} knows you want ${him} plumper and that ${he} accepts it, but is surprised by your honesty to such a question.`);
				}
				t.push(`${He} leaves your office <span class="trust inc">slightly more trusting</span> for someone whose life is now entirely out of their hands.`);
				eventSlave.trust++;
			} else if (eventSlave.behavioralFlaw === "gluttonous") {
				if (canTalk(eventSlave)) {
					t.push(`${His} eyes begin to water as ${he} struggles not to sob.`);
					t.push(Spoken(eventSlave, `"But... I can't help it, why would you say that?"`));
					t.push(`${He} breaks done completely and hastily flees your sight, likely to the cafeteria, jiggling in all the wrong places.`);
				} else {
					t.push(`${His} eyes begin to water as ${he} struggles not to sob, but ${he} quickly loses composure and hastily flees your gaze, likely to the cafeteria.`);
				}
				t.push(`${He} may have run out of your office <span class="trust dec">in tears,</span> but ${he}'ll quickly come to terms with all that matters is <span class="devotion inc">your judgment, not ${hers}.</span> Even more so when ${he} realizes the resulting stress eating only <span class="lime">filled ${him} out more.</span>`);
				eventSlave.devotion += 7;
				eventSlave.trust -= 5;
				eventSlave.weight += 5;
			} else if (eventSlave.behavioralFlaw === "anorexic") {
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I'm so disgusting, ${Master}, I'm glad you see it too. I was so certain you'd lie to me... Sorry to have wasted your time."`));
					t.push(He);
				} else {
					t.push(`${His} face lightens at your ${canHear(eventSlave) ? "words" : "affirmation"}. It seems you told ${him} just what ${he} wanted to hear${!canHear(eventSlave) ? ", so to speak" : ""}. ${He} gives ${his} thanks and`);
				}
				t.push(`leaves your office with <span class="devotion inc">slightly more faith</span> in ${his} ${getWrittenTitle(eventSlave)}.`);
				eventSlave.devotion += 5;
			} else {
				if (canTalk(eventSlave)) {
					t.push(`${His} eyes begin to water as ${he} struggles not to sob.`);
					t.push(Spoken(eventSlave, `"But... But... I'm not... Why would you say that?"`));
					t.push(`${He} breaks done completely and hastily flees your sight, jiggling in all the wrong places.`);
				} else {
					t.push(`${His} eyes begin to water as ${he} struggles not to sob, but ${he} quickly loses composure and hastily flees your gaze.`);
				}
				t.push(`${He} may have run out of your office <span class="trust dec">in tears,</span> but ${he}'ll quickly come to terms with all that matters is <span class="devotion inc">your judgment, not ${hers}.</span>`);
				eventSlave.devotion += 5;
				eventSlave.trust -= 5;
			}
			return t;
		}

		function uThinGirl() {
			let t = [];
			if ((eventSlave.diet === "fattening" || eventSlave.dietMilk > 0) && eventSlave.intelligence + eventSlave.intelligenceImplant > 15) {
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I know you want me to gain weight, ${Master}, so you don't need to spare my feelings. It's a nice gesture, though."`));
				} else {
					t.push(`${He} frowns before explaining ${he} knows you want ${him} plumper and that ${he} accepts it, but does appreciate the thought.`);
				}
				t.push(`${He} leaves your office in <span class="devotion inc">a good mood</span> for someone being forced to gain weight.`);
				eventSlave.devotion++;
			} else if (eventSlave.behavioralFlaw === "gluttonous") {
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"It's okay ${Master}, you don't have to lie to me. I know this is my fault, but thank you for trying to cheer me up."`));
				} else {
					t.push(`${He} frowns before explaining ${he} has only ${himself} to blame for ${his} weight, but does appreciate the thought.`);
				}
				t.push(`${He} leaves your office in <span class="devotion inc">good spirits</span> for nearly no effort.`);
				eventSlave.devotion++;
			} else if (eventSlave.behavioralFlaw === "anorexic") {
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"Don't lie to me, ${Master}! You really think I don't know I'm a bloated hog!?"`));
				} else {
					t.push(`${His} face contorts into a vicious glare; it seems you choose the wrong thing to say.`);
				}
				t.push(`${He} runs out of your office <span class="devotion dec">in tears.</span> It's likely that ${he}'ll <span class="trust dec">dwell on your response</span> for some time.`);
				eventSlave.devotion -= 10;
				eventSlave.trust -= 10;
			} else {
				t.push(`Of course ${he} hasn't gained any weight. ${He} ponders your response for a moment before replying`);
				if (canTalk(eventSlave)) {
					t.push(`"Thank you, ${Master}"`);
				} else {
					t.push(`with a smile`);
				}
				t.push(`and leaving your office with a <span class="devotion inc">happy spring in ${his} step.</span> Crisis averted.`);
				eventSlave.devotion++;
			}
			return t;
		}

		function encourage() {
			let t = [];
			t.push(`${He}'s left standing there blankly, uncertain on just how to respond to such a bold statement. ${He}'s even less certain when you invite ${him} to join you for lunch in the cafeteria for the rest of the week. You want chubby and what ${he} is barely comes close.`);
			if (eventSlave.behavioralQuirk === "insecure") {
				t.push(`${He} <span class="devotion inc">enjoys</span> you watching ${him} stuff ${himself} and quivers with delight as you measure the progress of ${his} waistline. By week's end, you're treated to the lovely sight of ${his} <span class="lime">new belly jiggling</span> as ${he} passes by your office.`);
				eventSlave.weight += 10;
			} else if (eventSlave.behavioralFlaw === "gluttonous") {
				t.push(`${He} <span class="devotion inc">thoroughly enjoys</span> being permitted to stuff ${his} face for your amusement, even if your lunch is in jeopardy for the duration of the week. There is no denying the results, however, as you savor the sight of the <span class="lime">chubby ${girl}</span> jiggling past your office when it's over.`);
				eventSlave.weight += 20;
			} else if (eventSlave.behavioralFlaw === "anorexic") {
				t.push(`${He} <span class="devotion inc">appreciates having someone to eat lunch with,</span> but that's not really why you are eating with ${him}. While ${he} doesn't make any real gains, you can't help but notice ${he} kept ${his} food down all week. <span class="lime">You broke ${him} of ${his} eating disorder!</span>`);
				eventSlave.behavioralFlaw = "none";
			} else {
				t.push(`${He} spends the week <span class="devotion inc">obediently</span> eating for you. You are not disappointed when you see the results, however, nor when you get a good grip on ${his} <span class="lime">soft belly.</span> ${He} may still have other hidden problems, but this is not longer one of them, at least for the time being.`);
				eventSlave.weight += 10;
			}
			if (eventSlave.behavioralQuirk === "insecure" || eventSlave.behavioralFlaw === "gluttonous") {
				eventSlave.devotion += 5;
			} else {
				eventSlave.devotion += 3;
			}
			return t;
		}

		function gym() {
			let t = [];
			t.push(`${His} face ${eventSlave.behavioralQuirk === "fitness" ? "brightens" : "sours"} as you instruct ${him} to spend ${his} free time on the treadmill if ${he} is so bothered by it,`);
			if (eventSlave.behavioralQuirk === "fitness") {
				t.push(`and by week's end, ${he}'s <span class="devotion inc">in a fantastic mood.</span>`);
			} else {
				t.push(`but by week's end, ${he}'s singing a different tune.`);
			}
			t.push(`Not only is ${he} <span class="lime">several sizes smaller</span> than ${his} expectations, but ${he} <span class="trust inc">looks and feels great,</span> something ${he} just can't help but <span class="devotion inc">show off</span> as ${he} struts past your office.`);
			if (eventSlave.behavioralQuirk === "fitness") {
				eventSlave.devotion += 10;
				eventSlave.trust += 10;
			} else {
				eventSlave.devotion += 5;
				eventSlave.trust += 5;
			}
			eventSlave.weight -= 10;
			return t;
		}

		function sex() {
			let frag = document.createDocumentFragment();
			let t = [];
			t.push(`${He}'s dismayed when you agree, but that fades quickly into hope when you continue, suggesting there's a way to start fixing the problem. ${He} just needs some exercise; to shed off those pounds with some hard physical work. The couch, you think aloud, will do perfectly, as you move around your desk to stretch out on the inviting surface, hands linked behind your head in a powerful display of your body. It's enough to make ${him} press ${his} thighs together, but you make no move for ${him}${V.PC.dick === 0 ? ", a strap-on," : ""} or even your clothing. You let ${him} puzzle and suffer for a few moments more before you make your intentions clear; if ${he} wants to burn calories, then it should be ${him} that does all the work.`);
			App.Events.addParagraph(frag, t);

			t = [];
			if (eventSlave.behavioralQuirk === "fitness") {
				t.push(`${He} brightens, catching on immediately and nodding ${his} head with understanding`);
				if (V.PC.dick === 0) {
					t.push(`before quickly ${App.Data.clothes.get(eventSlave.clothes).exposure <= 3 ? `shedding ${his} clothes and` : ""} retrieving an appropriate dildo, eager for the workout.`);
				} else {
					t.push(`${App.Data.clothes.get(eventSlave.clothes).exposure <= 3 ? "before" : ""} quickly ${App.Data.clothes.get(eventSlave.clothes).exposure <= 3 ? `shedding ${his} clothes` : ""}, eager for the workout.`);
				}
			} else {
				t.push(`${He} catches on quickly, nodding ${his} head with understanding`);
				if (V.PC.dick === 0) {
					t.push(`before ${App.Data.clothes.get(eventSlave.clothes).exposure <= 3 ? `shedding ${his} clothes and` : ""} retrieving an appropriate dildo, glad for the opportunity.`);
				} else {
					t.push(`${App.Data.clothes.get(eventSlave.clothes).exposure <= 3 ? `before shedding ${his} clothes` : ""}, glad for the opportunity.`);
				}
			}
			t.push(`${His} hips settle close to yours, moving seductively while ${he} makes a show of undressing you. ${His} fingers smooth`);
			if (V.PC.dick === 0) {
				t.push(`around your hips, fastening the straps under and around your raised ass`);
				if (V.PC.butt <= 3) {
					t.push(`ass,`);
				} else if (V.PC.butt <= 4) {
					t.push(`with some effort,`);
				} else {
					t.push(`with a struggle,`);
				}
				t.push(`adjusting the attached toy`);
			} else {
				t.push(`over your half hard cock before drawing it out, pumping it`);
			}
			t.push(`until it's standing tall, ready for ${him} to spread ${his} legs over.`);
			if (eventSlave.behavioralQuirk === "fitness") {
				t.push(`${He} barely hesitates`);
			} else {
				t.push(`${He} spends a moment hovering`);
			}
			t.push(`before ${he} sinks ${his}`);
			if (canDoVaginal(eventSlave)) {
				t.push(`pussy`);
			} else {
				t.push(`asshole`);
			}
			t.push(`down onto the stiff rod with a moan, drawing back up almost immediately and starting an intense`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0) {
					t.push(`pace, despite having been a <span class="lime">virgin</span> moments before.`);
				} else {
					t.push(`pace.`);
				}
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				if (eventSlave.anus === 0) {
					t.push(`pace, despite having been a <span class="lime">virgin</span> moments before.`);
				} else {
					t.push(`pace.`);
				}
				t.push(VCheck.Anal(eventSlave, 1));
			}
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`Riding certainly is exhausting, especially if you don't offer any assistance. With no hands on ${his} hips to keep ${him} steady, ${his} hand${hasBothArms(eventSlave) ? "s" : ""} find themselves on your`);
			if (V.PC.belly < 5000) {
				if (V.PC.boobs < 300) {
					t.push(`chest,`);
				} else if (V.PC.boobs >= 300) {
					t.push(`tits,`);
				} else {
					t.push(`stomach,`);
				}
			} else {
				if (V.PC.bellyPreg > 2000 || V.PC.bellyImplant > 2000) {
					t.push(`gravid swell,`);
				} else {
					t.push(`${V.PC.inflationType}-stuffed belly,`);
				}
			}
			t.push(`fingers curling as ${his} orgasm approaches and a delighted ${canTalk(eventSlave) ? "shout" : "shudder"}`);
			if (eventSlave.balls !== 0) {
				t.push(`and a`);
				if (eventSlave.prostate === 3) {
					t.push(`flood of cum`);
				} else if (eventSlave.prostate === 2) {
					t.push(`splatter of cum`);
				} else if (eventSlave.prostate === 1) {
					t.push(`splurt of cum`);
				} else {
					t.push(`dribble of fluid`);
				}
			}
			t.push(`announcing it. ${He}'s`);
			if (eventSlave.behavioralQuirk === "fitness") {
				t.push(`a little loopy from the rush, but a buck of your hips informs ${him} ${he}'s not finished yet. Delighted,`);
			} else {
				t.push(`panting from the exertion, but a buck of your hips informs ${him} ${he}'s not finished yet. It's not as hard and fast this time, but`);
			}
			t.push(`${he} pounds ${himself} diligently, only breaking momentarily for increasingly worn out gasps and moans, coating your couch ${eventSlave.balls !== 0 && eventSlave.prostate !== 0 ? "and clothing" : ""} with a mix of fluids each time. Only when ${his} legs refuse to support ${him} anymore and ${his} hips can barely shift do you let ${him} stop, admiring the sweat drenched spent slave draped over your`);
			if (V.PC.belly < 5000) {
				t.push(`chest.`);
			} else {
				t.push(`belly.`);
			}
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`You stretch before gathering ${him} up,`);
			if (V.PC.belly < 10000) {
				t.push(`carrying`);
			} else {
				t.push(`coaxing`);
			}
			t.push(`${him} to the shower to clean ${him} off, teasing another orgasm out of ${him} before you're finished as a reward. ${His} smile is tired but <span class="devotion inc">delighted</span> when you lay ${him} down on clean cushions, <span class="trust inc">pleased</span> that ${he}`);
			if (eventSlave.behavioralQuirk === "fitness") {
				t.push(`got such a great workout,`);
			} else {
				t.push(`did such a good job,`);
			}
			t.push(`before drifting off. ${He}'s earned a nap before ${he} returns to`);
			switch (eventSlave.assignment) {
				case Job.REST:
					t.push(`the dorm,`);
					break;
				case Job.HOUSE:
					t.push(`${his} chores,`);
					break;
				case Job.MILKED:
					t.push(`getting milked,`);
					break;
				case Job.PUBLIC:
					t.push(`${his} slutting,`);
					break;
				case Job.FUCKTOY:
					t.push(`servicing you,`);
					break;
				case Job.WHORE:
					t.push(`selling ${himself},`);
					break;
				case Job.CLASSES:
					t.push(`studying,`);
					break;
				case Job.CONFINEMENT:
					t.push(`${his} solitude,`);
					break;
				case Job.GLORYHOLE:
					t.push(`being used,`);
					break;
				case Job.SUBORDINATE:
					t.push(`serving ${his} superior,`);
					break;
				case Job.QUARTER:
					t.push(`${his} work as a servant,`);
					break;
				case Job.CONCUBINE:
					t.push(`your bed to await another set,`);
					break;
				case Job.MASTERSUITE:
					t.push(`the other fucktoys,`);
					break;
				default:
					t.push(`${his} post,`);
			}
			t.push(`especially if ${he} hopes to walk there after <span class="lime">burning so many calories.</span>`);
			if (eventSlave.behavioralQuirk === "fitness") {
				eventSlave.devotion += 7;
				eventSlave.trust += 7;
			} else {
				eventSlave.devotion += 3;
				eventSlave.trust += 3;
			}
			eventSlave.weight -= 5;
			App.Events.addParagraph(frag, t);

			return frag;
		}

		function shoo() {
			let t = [];
			t.push(`All that ${he} should be worried about is serving you, not inconsequential changes to ${his} body.`);
			if (eventSlave.behavioralQuirk === "insecure") {
				t.push(`That's all ${he} needed to ${canHear(eventSlave) ? "hear" : "know"}. <span class="devotion inc">All's well and good</span> if ${getWrittenTitle(eventSlave)} says so.`);
				eventSlave.devotion += 3;
			} else {
				t.push(`${He} nods in acceptance and silently heads on ${his} way; ${his} thoughts on your indifference is <span class="trust dec">written across ${his} face.</span>`);
				eventSlave.trust -= 5;
			}
			return t;
		}
	}
};
