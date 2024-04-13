App.Events.RESSBackStretch = class RESSBackStretch extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.assignment !== Job.QUARTER,
				s => s.devotion > 20,
				s => s.boobs > 2000,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, hers
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const arms = hasBothArms(eventSlave) ? "arms" : "arm";
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`You pass through your slaves' living area as some of them are starting their days.`,
			contextualIntro(PC, eventSlave, true, false, true),
			`is one of them, and ${he}'s just`,
		);
		if (eventSlave.rules.living === "spare") {
			r.push(`crawled out of ${his} spartan bedroll.`);
		} else if (eventSlave.rules.living === "normal") {
			r.push(`gotten out of ${his} neat little cot.`);
		} else if (eventSlave.relationship >= 4) {
			const relation = getSlave(eventSlave.relationshipTarget);
			const {his2, girl2, wife2} = getPronouns(relation).appendSuffix("2");
			r.push(`climbed out of bed. (${eventSlave.slaveName}'s`);
			if (eventSlave.relationship === 5) {
				r.push(wife2);
			} else {
				r.push(`${girl2}friend`);
			}
			r.push(`${relation.slaveName} is still asleep in it, and the shape of ${his2}`);
			if (relation.belly >= 120000) {
				r.push(`${belly} belly is`);
			} else if (relation.boobs > 25000) {
				r.push(`immense`);
				if (relation.boobsImplant/relation.boobs >= .60) {
					r.push(`fake`);
				}
				r.push(`breasts are`);
			} else if (relation.dick > 10) {
				r.push(`monster dick is`);
			} else if (relation.balls > 50) {
				r.push(`immense testicles are`);
			} else if (relation.weight > 130) {
				r.push(`gigantic body is`);
			} else if (relation.butt > 12) {
				r.push(`inhuman ass is`);
			} else if (relation.weight > 96) {
				r.push(`fat form is`);
			} else if (relation.hips > 2) {
				r.push(`inhuman hips are`);
			} else if (relation.dick > 6) {
				r.push(`huge soft cock is`);
			} else if (canAchieveErection(relation)) {
				r.push(`half-erect dick is`);
			} else if (relation.belly >= 5000) {
				r.push(`big`);
				if (relation.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly is`);
			} else if (relation.nipples === "huge") {
				r.push(`huge nipples are`);
			} else if (relation.boobs > 5000) {
				r.push(`monstrous`);
				if (relation.boobsImplant/relation.boobs >= .60) {
					r.push(`fake`);
				}
				r.push(`breasts are`);
			} else if (relation.boobs > 2000) {
				r.push(`huge`);
				if (relation.boobsImplant/relation.boobs >= .60) {
					r.push(`fake`);
				}
				r.push(`tits are`);
			} else if (relation.butt > 5) {
				r.push(`monstrous ass is`);
			} else if (relation.balls > 8) {
				r.push(`giant balls are`);
			} else if (relation.weight > 95) {
				r.push(`chubby body is`);
			} else if (relation.muscles > 30) {
				r.push(`muscular body is`);
			} else if (relation.weight > 10) {
				r.push(`chubby belly is`);
			} else if (relation.weight >= -10) {
				r.push(`feminine form is`);
			} else {
				r.push(`thin body is`);
			}
			r.push(`clearly visible under the sheet. They sleep naked, of course.)`);
		} else {
			r.push(`climbed out of ${his} comfortable bed.`);
		}
		r.push(`It's time for ${him} to start another strenuous day of carrying the weight of ${his}`);
		if (eventSlave.boobs > 45000) {
			r.push(`arm-filling`);
		} else if (eventSlave.boobs > 25000) {
			r.push(`back-breaking`);
		} else if (eventSlave.boobs > 10000) {
			r.push(`disproportionate`);
		} else if (eventSlave.boobs > 5000) {
			r.push(`massive`);
		} else {
			r.push(`heavy`);
		}
		if (eventSlave.boobsImplant/eventSlave.boobs >= .60) {
			r.push(`implants.`);
		} else if (eventSlave.lactation) {
			r.push(`milk-bearing udders.`);
		} else if (eventSlave.boobsImplant > 0) {
			r.push(`breasts.`);
		} else {
			r.push(`natural breasts.`);
		}
		r.push(`${He} can manage it`);
		if (eventSlave.muscles <= 10) {
			r.push(`only with difficulty, since ${he}'s not in good shape.`);
		} else if (eventSlave.physicalAge >= 18 && eventSlave.boobs <= 30000+(eventSlave.muscles*100)) {
			r.push(`with ease, since ${he}'s in good shape.`);
		} else if (eventSlave.physicalAge >= 13 && eventSlave.boobs <= 20000+(eventSlave.muscles*50)) {
			r.push(`with ease, since ${he}'s in good shape.`);
		} else if (eventSlave.physicalAge >= 4 && eventSlave.boobs <= 10000+(eventSlave.muscles*20)) {
			r.push(`with ease, since ${he}'s in good shape.`);
		} else if (eventSlave.physicalAge === 3 && eventSlave.boobs <= 5000+(eventSlave.muscles*10)) {
			r.push(`with ease, since ${he}'s in good shape.`);
		} else {
			r.push(`with some difficulty, since they're so big.`);
		}
		r.push(`Slaves with endowments like ${hers} are trained to stretch, and since ${he}'s a good ${SlaveTitle(eventSlave)}, ${he} does it as soon as ${he} gets up. ${He}'s doing it now.`);
		r.toParagraph();
		r.push(`${He} kneels with ${his} legs together, and then sits back, ${his}`);
		if (eventSlave.buttImplant/eventSlave.butt >= .5) {
			r.push(`fake ass not changing shape at all as it rests on ${his} heels.`);
		} else if (eventSlave.butt > 12) {
			r.push(`endless assflesh devouring ${his} legs completely.`);
		} else if (eventSlave.butt > 6) {
			r.push(`mass of assflesh extinguishing ${his} feet completely.`);
		} else if (eventSlave.butt > 2) {
			r.push(`big butt resting heavily on ${his} heels.`);
		} else {
			r.push(`cute butt resting lightly on ${his} heels.`);
		}
		r.push(`Then ${he} reaches ${his} ${arms} back, and leans back, as far as ${he} can go. ${He} arches ${his} spine, closing ${his} eyes voluptuously as ${he} enjoys the stretch in ${his} lower back. The pose thrusts ${his} chest up and out,`);
		if (eventSlave.boobShape === "spherical") {
			r.push(`but ${his} implants stretch ${his} skin so tight that they stay tacked to ${his} chest, right where they are. ${He} looks like a stereotypical silicone queen, arching ${his} back and sticking ${his} fake cans out.`);
		} else if ((eventSlave.boobsImplant/eventSlave.boobs) >= .50) {
			r.push(`making ${his} implant-filled tits stick out even farther than they usually do. ${He} looks like a stereotypical silicone queen, arching ${his} back and sticking ${his} fake cans out.`);
		} else if (eventSlave.boobShape === "perky") {
			r.push(`making ${his} spectacularly perky breasts point their ${eventSlave.nipples} nipples straight up at the ceiling. It's incredible that they've managed to maintain their youthful shape despite their great weight.`);
		} else if (eventSlave.boobShape === "downward-facing") {
			r.push(`showing off the huge area of soft skin above ${his} ${eventSlave.nipples} nipples. Since these face somewhat downward, ${his} swell of bosom above them is a pair of uninterrupted mounds of ${eventSlave.skin} breast.`);
		} else if (eventSlave.boobShape === "torpedo-shaped") {
			r.push(`making ${his} absurd torpedo-shaped tits stick out even farther than they usually do. ${His} ${eventSlave.nipples} nipples point out so far that it's difficult to see how such delectably soft flesh can support its shape.`);
		} else if (eventSlave.boobShape === "wide-set") {
			r.push(`making ${his} wide-set breasts spread even farther, to hang almost to ${his} armpits on either side. It's not conventionally attractive, but ${he}'s certainly very well endowed.`);
		} else if (eventSlave.boobShape === "saggy") {
			r.push(`emphasizing how saggy ${his} tits are. They`);
			if (eventSlave.belly >= 10000) {
				r.push(`rest heavily atop ${his} tautly`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				} else {
					r.push(`distended`);
				}
				if (eventSlave.belly >= 1500) {
					r.push(belly);
				}
				r.push(`belly.`);
			} else {
				r.push(`hang down far enough to obscure the top of ${his} ${belly} belly.`);
			}
			r.push(`It's not conventionally attractive, but ${he}'s certainly very well endowed.`);
		} else {
			r.push(`making ${his} beautiful breasts stick out nicely. They maintain their perfect shape surprisingly well for being so enormous, and ${his} ${eventSlave.nipples} nipples`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`stick out at you prominently.`);
			} else {
				r.push(`just beg to be penetrated.`);
			}
		}
		r.push(`${He} sits back up and rubs ${his} hands down`);
		if (eventSlave.belly >= 300000) {
			r.push(`the rear of ${his} swollen sides,`);
		} else {
			r.push(`${his} lower back on either side,`);
		}
		r.push(`sighing contentedly at the feeling.`);
		if (canSee(eventSlave)) {
			r.push(`${He} opens ${his} eyes, and sees you looking at ${him}.`);
		} else {
			r.push(`${His} ears perk up as ${he} notices your presence.`);
		}
		if (eventSlave.energy > 80) {
			if (canTalk(eventSlave)) {
				r.push(Spoken(eventSlave, `"Hi ${Master},"`), `${he} ${say}s flirtatiously,`);
			} else {
				r.push(`${He} waves at you flirtatiously`);
			}
			r.push(`and hugs ${himself} under ${his} boobs, presenting them even more obviously. ${His} strong sex drive is awake, too. ${He}`);
			if (canSee(eventSlave)) {
				r.push(`looks at you speculatively,`);
			} else if (canHear(eventSlave)) {
				r.push(`listens closely,`);
			} else {
				r.push(`waits patiently,`);
			}
			r.push(`obviously hoping to get fucked.`);
		} else if (eventSlave.trust > 20) {
			if (canTalk(eventSlave)) {
				r.push(Spoken(eventSlave, `"Hi ${Master},"`), `${he} ${say}s cutely,`);
			} else {
				r.push(`${He} waves at you cutely`);
			}
			r.push(`and gives ${his} torso a flirty little shake from side to side, making ${his} boobs move interestingly. ${He}`);
			if (canSee(eventSlave)) {
				r.push(`watches you trustingly,`);
			} else {
				r.push(`calmly faces you,`);
			}
			r.push(`obviously wondering if you'd like to enjoy ${his} body.`);
		} else {
			if (canTalk(eventSlave)) {
				r.push(Spoken(eventSlave, `"Good morning, ${Master},"`), `${he} ${say}s properly,`);
			} else {
				r.push(`${He} mutely bows ${his} head towards you, acknowledging your presence and`);
			}
			r.push(`doing ${his} best to be good. ${He}`);
			if (canSee(eventSlave)) {
				r.push(`watches you closely,`);
			} else if (canHear(eventSlave)) {
				r.push(`listens closely,`);
			} else {
				r.push(`waits patiently,`);
			}
			r.push(`ready to obey any command you might give ${him}.`);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Fuck ${his} boobs`, boobs),
			new App.Events.Result(`Hurt ${him}`, hurt),
			(eventSlave.lactation > 0)
				? new App.Events.Result(`Drink from ${him}`, drink)
				: new App.Events.Result()
		]);

		function boobs() {
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator(frag);
			r.push(`When ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees you`);
				if (V.PC.dick !== 0) {
					r.push(`get your dick out,`);
				} else {
					r.push(`approaching ${him} with sapphic lust in your eyes,`);
				}
			} else if (canHear(eventSlave)) {
				r.push(`hears you`);
				if (V.PC.dick !== 0) {
					r.push(`get your dick out,`);
				} else {
					r.push(`hungrily approach,`);
				}
			} else {
				r.push(`feels your fingertips brush against ${his} nipples,`);
			}
			r.push(`${he}`);
			if (eventSlave.energy > 80) {
				r.push(`grins with anticipation,`);
			} else if (eventSlave.trust > 20) {
				r.push(`smiles appealingly,`);
			} else {
				r.push(`does ${his} best to look submissive,`);
			}
			r.push(`and offers you ${his} chest.`);
			if (V.PC.dick !== 0) {
				if (eventSlave.belly >= 300000) {
					r.push(`You have to straddle ${his} ${belly} stomach to get close enough, but ${his} tantalizing breasts are worth the strain.`);
				}
				r.push(`You collect some lubrication for it by sticking your dick in ${his} mouth.`);
				if (eventSlave.skill.oral >= 100) {
					r.push(`${He} swallows you to your base, and is such a skilled cocksucker that ${he} salivates at will, doing ${his} best to get you`);
				} else {
					r.push(`${He} does ${his} best to swallow you as deeply as ${he} can manage, and get your cock`);
				}
				r.push(`nice and slick. You pull your member out of ${his} industriously sucking mouth with a pop, and slide it between ${his} warm breasts. ${He} promptly grabs them and squeezes them together, forming a nice channel for you to fuck. As you start pounding away, ${he} does ${his} best to crane ${his} head down and suckle your dickhead whenever it appears between ${his} boobs, adding more lubrication from ${his} lewdly wet mouth. ${He} knows when you're about to climax, and makes no attempt to avoid it, opening ${his} mouth wide to accept your load. ${He} catches most of it, but your generous ejaculation spatters ${his} face with pearly decoration.`);
			} else {
				r.push(`Deciding to do something a little more intimate than fucking ${his} cleavage with a strap-on, you walk forward and into ${his} face, pressing ${him} inexorably backwards as ${he} nuzzles your pussy until ${he}'s forced to collapse onto the ground. Then you scoot backwards a little, until you're`);
				if (eventSlave.belly >= 10000) {
					r.push(`crammed between ${his} ${belly} middle and breasts.`);
				} else {
					r.push(`straddling ${his} ribcage just below ${his} breasts.`);
				}
				r.push(`${His} huge breasts rest atop your inner thighs,`);
				if (eventSlave.boobsImplant/eventSlave.boobs >= .60) {
					r.push(`${his} skin taut against yours, from the implants.`);
				} else {
					r.push(`heavy and soft and female.`);
				}
				r.push(`You ride ${him} gently like this for a little while, enjoying the feminine weight of ${him} and the effects of this intimacy on ${his} face. Once you're ready for some more stimulation, you pull one of ${his} hands down between ${his} breasts; ${he} gets ${his} thumb down into ${his} cleavage, all the way down until it can stimulate your button and bring you to a soft orgasm. Pleased, you slide down until you're face to face with ${him}, and give ${him} a kiss.`);
			}
			r.push(He);
			if (eventSlave.energy > 80) {
				r.push(`was looking after ${himself} with a hand the whole time, and ${he} <span class="trust inc">smiles gratefully at you</span> with satisfaction.`);
			} else if (eventSlave.trust > 20) {
				r.push(`giggles a little, <span class="trust inc">pleased with ${himself}.</span>`);
			} else {
				r.push(`smiles hesitantly, clearly thinking that <span class="trust inc">${he} did well.</span>`);
			}
			eventSlave.trust += 5;
			r.toParagraph();
			frag.append(App.Events.eventFetish(eventSlave, "boobs"));
			return r.container();
		}

		function hurt() {
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator(frag);
			r.push(`You decide to exercise a little maliciousness. You take a step forward, producing a look of`);
			if (eventSlave.energy > 80) {
				r.push(`lustful anticipation,`);
			} else if (eventSlave.trust > 20) {
				r.push(`expectation,`);
			} else {
				r.push(`trepidation,`);
			}
			r.push(`but then you stop,`);
			if (canSee(eventSlave)) {
				r.push(`wordlessly gesturing at ${him}`);
			} else if (canHear(eventSlave)) {
				r.push(`telling ${him}`);
			} else {
				r.push(`nudging and gesturing at ${him}`);
			}
			r.push(`to continue. ${He} does, bending ${him} back forward and backward, concave and convex, rolling ${himself} around on ${his} hips a little, and making ${his}`);
			if (eventSlave.belly >= 5000) {
				r.push(`${belly} belly and`);
			}
			r.push(`breasts move mesmerizingly. Eventually, ${he} stretches deeply enough that`);
			if (eventSlave.trust <= 50) {
				r.push(`${he} lets ${his} guard down and`);
			}
			r.push(`${his} eyes close again.`);
			switch (eventSlave.nipples) {
				case "tiny":
					r.push(`${His} tiny little nipples are too small to grab and pull effectively, so you simply flick them, aiming a vicious high-velocity fingernail at each of them, using both hands.`);
					break;
				case "puffy":
					r.push(`${His} puffy nipples provide shamefully easy targets. You grab them in a mercilessly tight grip and haul, jerking ${his} whole body forward until ${he}'s about to topple over.`);
					break;
				case "partially inverted":
					r.push(`You grab each of ${his} nipples around the margins of ${his} areolae, and squeeze them with such force that, partially inverted as they are, they protrude instantly.`);
					break;
				case "inverted":
					r.push(`You seize each of ${his} inverted nipples, your thumbs uppermost, squeezing ${his} sensitive, hidden nipples inside their fleshy prisons with cruel force.`);
					break;
				case "huge":
					r.push(`${His} huge nipples provide you an excellent grip as you grab them and haul on them, jerking ${his} whole body forward until ${he}'s about to topple over.`);
					break;
				case "fuckable":
					r.push(`You cram a fist into each of ${his} nipples and spread your fingers wide, making sure that you don't come loose as you jerk ${his} body forward.`);
					break;
				default:
					r.push(`You grab each of ${his} nipples in a merciless grip and pinch them with abandon, adding a cruel twist as soon as you've got them held tightly enough.`);
			}
			r.push(`${His} ${App.Desc.eyesColor(eventSlave)} fly open and ${he}`);
			if (canTalk(eventSlave, false)) {
				if (eventSlave.voice === 1) {
					r.push(`bellows with pain, ${his} deep voice very loud.`);
				} else if (eventSlave.voice === 2) {
					r.push(`screams at the tops of ${his} lungs.`);
				} else if (eventSlave.voice === 3) {
					r.push(`shrieks, ${his} high, girlish voice very shrill.`);
				}
			} else {
				r.push(`goes rigid in pain. If ${he} was able to cry out, you know ${he} would have.`);
			}
			r.push(`The sudden agony discombobulates ${him} so badly that for a few moments, ${he} has no idea what's going on, and ${his} hands fly forward reflexively. ${He} manages to stop ${himself} at the last minute, realizing that trying to knock your hands away from ${his} poor nipples would be a very bad idea indeed. ${He} looks up at you with`);
			if (canSee(eventSlave)) {
				r.push(`huge eyes,`);
			} else {
				r.push(`terror splashed across ${his} face,`);
			}
			if (canTalk(eventSlave, false)) {
				r.push(`mewling helplessly,`);
			}
			r.push(`<span class="trust dec">tears beginning to collect at the corners of ${his} eyes.</span> Pleased, you turn and go.`);
			eventSlave.trust -= 5;
			r.toParagraph();
			frag.append(App.Events.eventFetish(eventSlave, "masochist"));
			return r.container();
		}

		function drink() {
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator(frag);
			r.push(`${His}`);
			if (canSee(eventSlave)) {
				r.push(`eyes widen`);
			} else {
				r.push(`face light up`);
			}
			r.push(`with surprise when you`);
			if (eventSlave.belly >= 300000) {
				r.push(`lean against ${his} ${belly} stomach.`);
			} else {
				r.push(`kneel down in front of ${him}.`);
			}
			r.push(`${He} begins to straighten, to face you, but you place a`);
			if (V.PC.title === 1) {
				r.push(`strong`);
			} else {
				r.push(`feminine`);
			}
			r.push(`hand on ${his} chest, right between ${his} breasts, and keep ${him} leaning backward. Then, without any preamble, you take ${his} right breast in both of your hands, bend forward, and take ${his} nipple into your mouth. ${He} gasps`);
			if (canTalk(eventSlave)) {
				r.addToLast(`, ${say}s "Oh, ${Master}"`);
			}
			r.push(`quietly, and then begins to moan as you begin to suck powerfully,`);
			switch (eventSlave.nipples) {
				case "tiny":
					r.push(`drawing ${his} tiny nipple entirely into your mouth.`);
					break;
				case "puffy":
					r.push(`engorging ${his} soft, puffy nipple until it fills your mouth.`);
					break;
				case "partially inverted":
					r.push(`pulling ${his} partially inverted nipple straight out and into your mouth.`);
					break;
				case "inverted":
					r.push(`gradually pulling at ${his} inverted nipple until it's finally forced to pop out and into your mouth.`);
					break;
				case "huge":
					r.push(`${his} huge nipple filling your mouth comfortably.`);
					break;
				case "fuckable":
					r.push(`drawing an unreasonable amount of breast into your mouth just to keep a seal.`);
					break;
				case "flat":
					r.push(`pulling ${his} nipple and the areolae around it into your mouth.`);
					break;
				default:
					r.push(`pulling ${his} soft nipple and some of the areolae around it into your mouth.`);
			}
			r.push(`${His} rich ${milkFlavor(eventSlave)}milk begins to flow across your tongue. ${He} breathes faster and faster as ${he} becomes aroused, but then the stimulation peaks. You keep drinking from ${him}, making no move to stop nursing and start fucking ${him}. ${He} sighs with sudden contentment, realizing that you're going to drink every drop ${he} has, and ${his} sudden relaxation sends a little extra gush of ${milkFlavor(eventSlave)}milk into your mouth. ${He} <span class="hotpink">definitely enjoys the experience,</span> leaning back compliantly as you drain that breast and then ${his} left one, too.`);
			if (eventSlave.boobs > 25000 || (eventSlave.boobs > 10000 && eventSlave.lactation > 1)) {
				r.push(`Your clothes feel tight around your middle for the rest of the day; you may have indulged a little too much.`);
			}
			eventSlave.devotion += 5;
			eventSlave.lactationDuration = 2;
			eventSlave.boobs -= eventSlave.boobsMilk;
			eventSlave.boobsMilk = 0;
			r.toParagraph();
			frag.append(App.Events.eventFetish(eventSlave, "boobs"));
			return r.container();
		}
	}
};
