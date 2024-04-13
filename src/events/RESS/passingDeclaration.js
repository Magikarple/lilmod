App.Events.RESSPassingDeclaration = class RESSPassingDeclaration extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canTalk,
				s => s.devotion > 50,
				s => s.trust > 50,
				s => s.health.condition > 90,
				s => s.muscles > 5,
				s => s.weight >= -30,
				s => s.weight <= 30,
				s => s.health.tired <= 30
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {say, title: Master} = getEnunciation(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push("As you manage your empire from your office, a constant traffic of slaves passes by its door. The glass walls allow a good view of them, and since you naturally own what you find appealing, the passing chattel often draws your eye. For example, this morning you notice");
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`almost bounce into view. ${He}'s physically fit, at a healthy weight,`);
		if (eventSlave.belly >= 10000) {
			if (eventSlave.bellyPreg >= 3000) {
				t.push(`heavily pregnant,`);
			} else if (eventSlave.bellyImplant >= 3000) {
				t.push(`despite ${his} ${belly} fake belly,`);
			} else {
				t.push(`completely full of ${eventSlave.inflationType},`);
			}
		}
		if (eventSlave.physicalAge > 35) {
			t.push(`and is getting such excellent modern medical care that despite ${his} age, ${he} has the energy of a teenager.`);
		} else if (eventSlave.physicalAge > 19) {
			t.push(`is full of youth and vigor, and is in truly perfect health due to the miracles of modern medicine.`);
		} else if (eventSlave.physicalAge > 12) {
			t.push(`and is a teenager, not to mention the perfect health ${he} owes to the miracles of modern medicine.`);
		} else {
			t.push(`and is a little ${girl}, not to mention the perfect health ${he} owes to the miracles of modern medicine.`);
		}
		if (eventSlave.energy > 95) {
			t.push(`Apart from ${his} absurd sex drive,`);
		} else if (eventSlave.energy > 40) {
			t.push(`In addition to ${his} very healthy libido,`);
		} else {
			t.push(`Despite ${his} mediocre libido,`);
		}
		t.push(`${he}'s overflowing with energy. ${He} half-runs, half-skips down the hallway, slowing in the doorway as ${he} feels your gaze. Without stopping, ${he} turns to meet your eyes, winks trustingly, and bursts out, "${Spoken(eventSlave, `Hi ${Master}! Love you!`)}" Then ${he} continues on ${his} merry way.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`Someone's a happy ${desc} today.`);
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Follow ${him}`, follow),
			new App.Events.Result(`Play with ${him}`, play),
			new App.Events.Result(`Punish ${him}`, punish)
		]);

		function follow() {
			t = [];

			t.push(`${His} sheer 'joie de vivre' is irresistible, and it certainly draws you out of your office. You're not slow, and of course you know where ${he}'s going, so you catch up quickly. ${He} gives you the careful measuring glance of a devoted sex slave who's checking whether ${his} owner wants to fuck ${him} right now, and correctly decides that that isn't your intent, at least right this minute. Instead, you continue the direction ${he} was going, and ${he} follows. "${Master}," ${he} ${say}s hesitantly, "I hope that was an okay thing for me to do." You assure ${him} it was. "Thanks, ${Master}," ${he} beams, grinning like an idiot. Smiling at ${his} infectious enthusiasm for life, you ask ${him} why ${he}'s so happy this morning. ${He} looks momentarily ${eventSlave.intelligence + eventSlave.intelligenceImplant > 50 ? `perplexed, not a common look for a slave as smart as ${him}` : "perplexed"}.`);
			t.push(`"${Spoken(eventSlave, `I don't know! I just woke up this morning feeling really, really good. ${eventSlave.intelligence + eventSlave.intelligenceImplant > 50 ? `I'm sure the fact that I'm benefiting from incredibly advanced medicine has something to do with it; thank you very much for that, ${Master}. Other than that,` : ""} I just feel happy.`)}" This has to be some sort of milestone for ${him}, and for you, and maybe for slavery in general: if ${he} can be this pleased with life, something must be going right. You walk ${him} to where ${he}'s going`);
			switch (eventSlave.assignment) {
				case "whore":
					t.push(`(one of the arcology's nicer streets, where ${he}'ll spend the day selling ${his} body),`);
					break;
				case "serve the public":
					t.push(`(one of the arcology's nicer streets, where ${he}'ll spend the day flirting with citizens and having sex with anyone that's willing),`);
					break;
				case "work a glory hole":
					t.push(`(a wall mounting that will render ${him} a helpless target for dicks all day),`);
					break;
				case "get milked":
					t.push(`(${his} favorite milker in the penthouse),`);
					break;
				case "take classes":
					t.push(`(a quiet area with a touchscreen where ${he} can review material from the slave etiquette class ${he}'s working on),`);
					break;
				case "please you":
					t.push(`(the wardrobe, where ${he}'ll get dressed before attending to you for the rest of the day),`);
					break;
				case "be a subordinate slave":
					t.push(`(the living area of the slave ${he}'s been assigned to serve),`);
					break;
				case "work as a servant":
				case "be a servant":
					t.push(`(the closet that contains the cleaning items ${he}'ll use to dust and polish the penthouse today),`);
					break;
				case "work as a nanny":
					t.push(`(${V.nurseryName}, where ${he} is tending to the children),`);
					break;
				case "stay confined":
					t.push(`(${his} cell),`);
					break;
				case "guard you":
					t.push(`(the armory where ${his} weapons are kept),`);
					break;
				case "be your Head Girl":
					t.push(`(the assignment location of a slave who needs some hands-on guidance from your Head Girl),`);
					break;
				case "recruit girls":
					t.push(`(the camera station ${he} uses to convince people from the old world that becoming your slave is a good idea),`);
					break;
				case "serve in the master suite":
					t.push(`(your bedroom, where ${he}'ll ready ${himself} for later),`);
					break;
				case "be the DJ":
					t.push(`(the back of ${V.clubName} where ${he} decides the playlist for the day),`);
					break;
				case "be the Attendant":
					t.push(`(the back of ${V.spaName}, where ${he}'ll decide the perfect mixture for today's baths),`);
					break;
				case "be the Madam":
					t.push(`(${his} office in ${V.brothelName}, where ${he}'ll decide the slaves on display),`);
					break;
				case "be the Schoolteacher":
					t.push(`(${his} office in ${V.schoolroomName}, where ${he}'ll decide today's lesson),`);
					break;
				case "be the Stewardess":
					t.push(`(${his} office in ${V.servantsQuartersName}, where ${he}'ll divvy out today's tasks),`);
					break;
				case "be the Milkmaid":
					t.push(`(${V.dairyName}, to check on the cattle),`);
					break;
				case "be the Farmer":
					t.push(`(${V.farmyardName}, to tend to the crops),`);
					break;
				case "be the Wardeness":
					t.push(`(${V.cellblockName}, to oversee the inmates),`);
					break;
				case "be your Concubine":
					t.push(`(your bed),`);
					break;
				case "be the Nurse":
					t.push(`(${V.clinicName}, to check on the patients),`);
					break;
				case "be the Matron":
					t.push(`(${V.nurseryName}, where ${he} is managing children and nannies),`);
					break;
				case "live with your Head Girl":
					break;
				default:
					t.push(`(a waiting area for further assignment),`);
			}
			t.push(`and when you get there, ${he} gives you a peck on the cheek. ${eventSlave.height < 170 ? `The short ${desc} has to go up on tiptoe to reach.` : ""} <span class="hotpink">"${Spoken(eventSlave, "I really do love you")},</span> ${Master}," ${he} ${say}s, ${canSee(eventSlave) ? `${App.Desc.eyesColor(eventSlave)} shining` : "face filled with joy"}.`);

			eventSlave.devotion += 5;
			return t;
		}

		function play() {
			t = [];

			t.push(`You're not a slave, so you can't understand ${his} inner workings through direct empathy. But in your experience, a quick orgasm never fails to make a good day better. You're not slow, and of course you know where ${he}'s going, so you catch up to ${him} on quiet feet and`);
			if (eventSlave.butt > 12) {
				t.push(`sink both hands into ${his} immense rear.`);
			} else if (eventSlave.butt > 6) {
				t.push(`set ${his} enormous ass jiggling with a smack.`);
			} else if (eventSlave.butt > 3) {
				t.push(`give ${his} womanly bottom a squeeze.`);
			} else {
				t.push(`pinch ${his} cute rear.`);
			}
			t.push(`${He} squeals and whirls around, ${eventSlave.energy > 60 ? `eagerly flinging ${himself} into your arms, ready for some action` : `trustingly throwing ${himself} into your arms`}. Feeling spontaneous, you decide to get everyone off quickly and cleanly, right here.`);
			switch (eventSlave.fetish) {
				case "submissive":
					t.push(`You place a dominant hand around ${his} throat, firmly but not harshly, almost sending the submissive to ${his} knees. Your other hand`);
					break;
				case "cumslut":
					t.push(`You kiss ${him}, sliding your tongue all the way into ${his} mouth. ${He} melts into you, rhapsodically entranced by the intense oral stimulation, and ${his} tongue presses against yours with frankly sexual significance. Your hand`);
					break;
				case "humiliation":
					t.push(`Slaves are constantly passing the two of you, and you constantly turn ${him} to show ${his} body to each of them, spreading ${him} to display ${his} most intimate parts. ${His} cheeks flush with arousal and delicious shame. Your hand`);
					break;
				case "buttslut":
					t.push(`You slide a hand all the way under ${him}, pulling the flesh of ${his} buttock to one side and then nestling possessive fingers over ${his} anus, teasing and stimulating, but not penetrating. Your other hand`);
					break;
				case "boobs":
					t.push(`${He} gasps as your hot mouth finds one of ${his} ${eventSlave.nipples} nipples, and then moans openly as one of your hands mauls ${his} other breast. Your other hand`);
					break;
				case "pregnancy":
					t.push(`One of your hands begins to caress ${his} ${belly} ${eventSlave.pregKnown === 1 ? "pregnant" : ""} belly, worshipping its curve. Your other hand`);
					break;
				case "dom":
				case "sadist":
					t.push(`You press yourself aggressively against ${him}, and ${he} presses back; you grind harder still, letting ${him} know that ${he} can let ${himself} be a little aggressive, too. Groaning with pleasure and satisfaction, ${he} kisses you furiously. One of your hands`);
					break;
				case "masochist":
					t.push(`You caress one of ${his} nipples, ${eventSlave.nipples !== "fuckable" ? "bringing it completely erect before gripping it firmly. You twist it, pull it, pinch it" : "letting it swell completely shut before driving your entire fist into it"}; ${he} moans with masochistic pleasure. Your other hand`);
					break;
				default:
					t.push(`Your hand`);
			}
			if (canDoVaginal(eventSlave)) {
				t.push(`finds ${his} pussy`);
			} else if (canDoAnal(eventSlave)) {
				t.push(`reaches around behind ${him} to tease ${his} ass and play with ${his} sensitive perineum`);
			} else {
				t.push(`traces ${his} chastity`);
			}
			t.push(`and you press your groin towards ${him}. Getting the idea, ${he} begins to ${PC.dick !== 0 ? "jack you off" : "finger your clit"} energetically, taking the pace from your lusty demeanor and ${his} own feeling of energy and well-being. The two of you orgasm almost together. ${PC.dick !== 0 ? "You angle your hips to shoot your seed onto the floor" : "You climax so violently that some of your femcum makes it onto the floor"}.`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`${His} ejaculate steadily drips from ${his} chastity cage,`);
			} else if (canAchieveErection(eventSlave)) {
				t.push(`${He} blows ${his} own load right after,`);
			} else if (eventSlave.balls > 0) {
				t.push(`${His} limp dick pours cum,`);
			} else if (eventSlave.dick > 0) {
				t.push(`${His} bitchclit produces a little watery fluid,`);
			} else if (eventSlave.vaginaLube > 1) {
				t.push(`${He} squirts copiously,`);
			} else {
				t.push(`Unusually for ${him}, ${he} manages to squirt a little,`);
			}
			t.push(`adding to the mess. You tell ${him} another slave will clean up, and order ${him} to go about ${his} business. ${He} turns to go, <span class="mediumaquamarine">smiling with sexual satisfaction.</span>`);

			eventSlave.trust += 5;
			return t;
		}

		function punish() {
			t = [];

			t.push(`That was not quite the prescribed way of greeting you, there was no need to greet you as ${he} passed, and most importantly, ${he}'s simply too cheery. Resolving to crush ${his} happiness, you call ${him} back to the office in a thunderous voice you know will reach ${him}. ${He} knows ${he}'s made a mistake, but comes promptly, lower lip quivering. ${His} feelings are plain to see on ${his} face: surprise, <span class="mediumorchid">betrayal,</span> <span class="gold">fear.</span> ${He} thought ${he} could be friendly, and now ${he} knows ${he} was wrong. What's more, ${he} thought ${he} could be happy, and now ${he}'s realizing that that was also wrong. As you`);
			switch (eventSlave.rules.punishment) {
				case "confinement":
					t.push(`close ${him} into a confinement cell,`);
					break;
				case "whipping":
					t.push(`tie ${him} up for a brief whipping,`);
					break;
				case "chastity":
					t.push(`lock ${him} into harsh chastity,`);
					break;
				default:
					t.push(`gag ${him} for speaking out of turn,`);
			}
			t.push(`a wail of despair tears its way out of ${his} throat, far out of proportion to the standard punishment you're applying. It's perhaps the saddest sound you've ever heard a slave make. Slaves cry all the time, but usually they already understand that happiness is out of their reach. This one just woke up thinking that ${he} could be happy and was happy, and now ${he}'s realizing it isn't allowed.`);

			eventSlave.devotion -= 10;
			eventSlave.trust -= 10;
			return t;
		}
	}
};
