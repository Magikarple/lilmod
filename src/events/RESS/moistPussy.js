App.Events.RESSMoistPussy = class RESSMoistPussy extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.assignment !== Job.QUARTER,
				s => s.devotion > 20,
				s => s.vaginaLube > 1,
				hasAnyArms,
				canDoVaginal,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, hers
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];
		t.push("Just as you're about to give");
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`${his} weekly inspection, a minor business matter comes up and diverts your attention.`);
		t.push(`So, for about ten minutes, ${he} has nothing at all to do other than ${canStand(eventSlave) ? "stand" : hasAnyLegs(eventSlave) ? "kneel" : "sit"} in front of your desk in your office, ${canSee(eventSlave) ? "watching" : canHear(eventSlave) ? "listening to" : "feeling the subtle vibrations from"} you, ${(V.assistant.personality > 0) ? `${V.assistant.name}'s avatar,` : ""} the other slaves who come and go, and the general lewdness of the arcology, much of which is ${(canSee(eventSlave)) ? "visible" : canHear(eventSlave) ? "audible" : "apparent"} from right here.`);
		if ((eventSlave.attrXY > 50) && (V.PC.boobs < 300)) {
			t.push(`${He} finds your strong body attractive, and ${his} gaze rests most frequently ${canSee(eventSlave) ? "on" : "towards"} you.`);
		} else if ((eventSlave.attrXX > 50) && (V.PC.boobs >= 650)) {
			t.push(`${He} finds your prominent breasts attractive, and ${his} gaze rests most frequently ${canSee(eventSlave) ? "on" : "towards"} them.`);
		} else if (eventSlave.fetish === "pregnancy") {
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 1.33) {
				t.push(`The combination of being hugely pregnant and a pregnancy fetishist keeps ${his} libido raging.`);
			} else if (V.PC.belly >= 10000) {
				t.push(`${He} finds your protruding pregnancy attractive, and ${his} gaze rests most frequently ${canSee(eventSlave) ? "on" : "towards"} it.`);
			}
		} else if (eventSlave.aphrodisiacs > 0 || eventSlave.inflationType === "aphrodisiac") {
			t.push(`The aphrodisiacs ${he}'s on never let ${his} libido rest for long.`);
		} else if (eventSlave.energy > 95) {
			t.push(`${His} nymphomania keeps ${him} perpetually ${canSee(eventSlave) ? "watchful for any sexual sights" : canHear(eventSlave) ? "listening for sexual acts" : "eager for sexual acts"}, especially any which promise ${his} participation.`);
		} else if (eventSlave.energy > 40) {
			t.push(`${His} healthy sex drive does its work, and with the constant coming and going ${he}'s not starved for things ${he} finds attractive.`);
		} else {
			t.push(`Despite ${his} weak libido, ${he}'s been a sex slave long enough that ${his} body knows that it may be called upon to render sexual service soon.`);
		}
		t.push(`The consequences of the special qualities of ${his} womanhood soon become apparent.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Your slaves are all in the very best of vaginal health, so the scent of ${his} female arousal is not strong. But ${his} cunt produces such copious natural lubricant that with nothing to do but ${canStand(eventSlave) ? "stand" : "rest"} there, ${his} ${eventSlave.counter.births > 0 ? "motherly" : eventSlave.weight > 30 ? "thick" : eventSlave.muscles > 30 ? "strong" : "feminine"} inner thighs are soon slick with a sheen of healthy pussyjuice. You notice a droplet of the stuff running down ${his} warm ${eventSlave.skin} skin.`);
		if (canAchieveErection(eventSlave) && eventSlave.chastityPenis !== 1) {
			t.push(`${His} ${eventSlave.dick > 3 ? "stiff prick" : "hard little dick"} is sticking up from atop ${his} pussy, leaving it nice and visible.`);
		} else if (eventSlave.dick > 0) {
			t.push(`${His} pussy is ${eventSlave.dick > 3 ? "entirely" : "partially"} concealed by ${his} limp dick, which is getting a good coating, since it's resting against the source.`);
		}
		if (eventSlave.labia > 0) {
			t.push(`${His} prominent labia is flushed and moist, and frame ${his} womanhood invitingly.`);
		}
		if (eventSlave.clit > 0) {
			t.push(`${His} clit is rapidly becoming visible as the blood rushes there from every other part of ${his} body.`);
		}
		if (eventSlave.bellyPreg >= 10000) {
			t.push(`${His} huge pregnancy heaves a little as ${he} starts to breathe a bit harder, and the visual connection between ${his} gravid belly and ${his} needy womanhood is inescapable.`);
		}
		t.push(`${He}'s a good ${SlaveTitle(eventSlave)}, and remains obediently before your desk, filling your office with ${his} subtle perfume as ${he} waits for you.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Make love to ${his} ready cunt`, love, virginityWarningLove()),
			new App.Events.Result(`Pound ${his} wet pussy`, pound, virginityWarningPound()),
			new App.Events.Result(`Feed ${him} ${his} own pussyjuice`, feed),
		]);

		function love() {
			let container = document.createDocumentFragment();
			t = [];

			t.push(`${His} body is so perfectly made to be fucked that it's getting itself ready for you, without your even having to give the order.`);
			t.push(`Deciding not to bother with verbal commands, you approach ${him} and reach for one of ${his} hands; ${he} obediently extends it towards your grasp, and follows`);
			if ((eventSlave.energy > 40) || (eventSlave.aphrodisiacs > 0) || eventSlave.inflationType === "aphrodisiac") {
				t.push("eagerly");
			} else {
				t.push("willingly");
			}
			t.push(`as you pull ${him} in for a`);
			if (eventSlave.boobs > 5000) {
				t.push(`hug (cushioned by ${his} enormous udders),`);
			} else if (eventSlave.belly >= 10000) {
				t.push(`hug (quite a stretch thanks to ${his} ${belly} belly),`);
			} else if (eventSlave.dick > 5) {
				t.push(`hug (made rather lewd by ${his} enormous penis),`);
			} else {
				t.push(`hug,`);
			}
			t.push(`kiss ${him} deeply, and slide your arms down ${his}`);
			if (eventSlave.weight > 160) {
				t.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				t.push(`soft`);
			} else if (eventSlave.muscles > 95) {
				t.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				t.push(`muscular`);
			} else if (eventSlave.muscles > 5) {
				t.push(`toned`);
			} else {
				t.push(`soft`);
			}
			t.push(`back to`);
			if (eventSlave.butt > 12) {
				t.push(`sink your arms into ${his} expansive`);
			} else if (eventSlave.butt > 6) {
				t.push(`heft ${his} monstrous`);
			} else if (eventSlave.butt > 3) {
				t.push(`squeeze ${his} healthy`);
			} else {
				t.push(`cup ${his} cute little`);
			}
			t.push(`buttocks. ${He} ${eventSlave.voice > 0 ? "coos" : "hums mutely"} at the feeling of your ${V.PC.title === 1 ? "strong" : "feminine"} hands on ${his} bottom, and presses ${himself} against you as you rotate the two of you until you can set ${his} butt on the edge of your desk and ${V.PC.dick !== 0 ? `slide your big dick into ${his} well-lubricated cunt.` : `assertively press your own pussy against ${his} wet cunt.`}`);
			App.Events.addParagraph(container, t);

			t = [];
			t.push(`${He} makes as if to lie back and take it, but you keep an arm around ${his} back and hug ${his}`);
			if (eventSlave.boobs > 2000 || eventSlave.belly >= 5000) {
				if (eventSlave.boobs > eventSlave.belly) {
					t.push(`as closely as ${his} big breasts will permit.`);
				} else {
					t.push(`as closely as ${his} ${belly} ${eventSlave.bellyPreg >= 3000 ? "pregnant belly" : "belly"} will permit.`);
				}
			} else if (V.PC.belly >= 5000) {
				t.push(`as closely as your pregnant belly will permit.`);
			} else {
				t.push(`closer than ever.`);
			}
			t.push(`You take your other hand and place a firm but loving grip under ${his} chin, lifting ${his} ${App.Desc.eyeColor(eventSlave)}-eyed gaze to meet yours before kissing ${him} again. All the while, you`);
			if (V.PC.dick !== 0) {
				t.push(`fuck ${him} powerfully, withdrawing your dick almost all the way and then hilting yourself in ${his} soaked slit.`);
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				t.push(`trib ${him} with assurance, grinding your hips against ${hers} and making ${him} feel your heat.`);
				seX(eventSlave, "vaginal", V.PC, "penetrative");
			}
			t.push(`${He} clings to you, accepting the closeness to ${his} ${getWrittenTitle(eventSlave)} and enjoying the loving attention, even as the extreme wetness of ${his} cunt and your ${V.PC.dick !== 0 ? "powerful thrusting" : "hungry grinding"} begin to produce lewd noises from between you.`);
			t.push(`${His} generous natural lubrication lessens the friction and sensation a little, and you go for a long time before you both climax.`);
			t.push(`You lead ${him} into your office shower, since you're both coated in ${his} pussyjuice${V.PC.dick !== 0 ? ` and ${he}'s carrying a big load of your cum` : ", and your own"}.`);
			t.push(`Under the hot water, you don't even have to pull ${him} close; <span class="hotpink">${he} presses ${himself} into your arms on ${his} own.</span>`);
			if (eventSlave.sexualQuirk === "romantic") {
				t.push(`For an incorrigible romantic like ${him}, this encounter was perfect, and ${he} <span class="hotpink">loves you all the more for it.</span>`);
				eventSlave.devotion += 3;
			}
			eventSlave.devotion += 5;
			App.Events.addParagraph(container, t);

			return container;
		}

		function pound() {
			t = [];

			t.push(`${He}'s so generously lubricated that ${he}'s ready to take a good hard fuck, so you decide to give ${him} one.`);
			t.push(`You point at the ground, and you don't even have to tell ${him} to get down on all fours and get ready to take it.`);
			if (canSee(eventSlave)) {
				t.push(`Your gesture says it for you, and ${he} obediently gets down and gets in position to be bred like a bitch.`);
			} else {
				t.push(`The atmosphere of the room says it for you, and ${he} obediently gets down and gets in position to be bred like a bitch.`);
			}
			t.push(`${He} angles ${his} hips just right to offer ${his} cunt to you,`);
			if (eventSlave.belly >= 300000) {
				t.push(`an endeavor given the size of ${his} middle,`);
			} else if (eventSlave.belly >= 5000) {
				t.push(`while giving ${his} rounded middle room to hang,`);
			}
			t.push(`and even reaches down to spread ${his} ${eventSlave.labia > 1 ? "dangling labia" : "labia"} to invite you into ${his} pink channel.`);
			if (V.PC.dick !== 0) {
				if (eventSlave.vagina > 1) {
					t.push(`${He} can take your big dick without a twinge,`);
				} else {
					t.push(`Your big dick will fill ${his} tight cunt to its limits,`);
				}
				t.push(`but you grab ${his} hips and`);
			} else {
				t.push(`You select a strap-on that's right at the limits of ${his}`);
				if (eventSlave.vagina > 3) {
					t.push(`cavernous`);
				} else if (eventSlave.vagina > 2) {
					t.push(`big`);
				} else if (eventSlave.vagina > 1) {
					t.push(`open`);
				} else {
					t.push(`tight little`);
				}
				t.push(`cunt's capacity, don it, and`);
			}
			t.push(`mount ${him} with such force that your first stroke brings ${his} butt against your hips with an audible smack. There's also a deliciously lewd noise as ${V.PC.dick !== 0 ? "your invading penis" : "the invading phallus"} forces a little gush of pussyjuice out of ${him}.`);
			t.push(`${He} ${eventSlave.voice > 0 ? "shrieks, but it's a shriek" : "gasps, but it's a gasp"} of pleasure, and your rutting is so well-lubricated that ${he} has no trouble getting off on it. Wanting ${his} climax, you reach around ${him} and grab hold of ${his} pussy, feeling the slippery fluid between your fingers and the lewd thrusting motion as ${V.PC.dick !== 0 ? "your cock" : "the phallus"} pistons in and out of ${him}.`);
			t.push(`That bit of stimulation is enough to tip ${him} over, and you feel a gush of femcum against your hand as ${V.PC.dick !== 0 ? "your dickhead" : "the head of the strap-on"} forces an orgasm out of ${his} g-spot. ${He}'s so discombobulated that ${he} collapses into the puddle of pussyjuice ${he} left on the floor when you stand up and head off for a shower, but ${he} <span class="hotpink">crawls after you</span> as best ${he} can${hasBothLegs(eventSlave) ? " on rubbery legs." : "."}`);
			if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				if (eventSlave.fetishKnown === 1) {
					t.push(`The ${SlaveTitle(eventSlave)} sub loves getting fucked like that, and`);
					if (eventSlave.fetishStrength > 95) {
						t.push(`<span class="lightsalmon">seems even more submissive</span>`);
						eventSlave.fetishStrength += 10;
					} else {
						t.push(`since ${he}'s fully confirmed in ${his} status as a sub, ${he} <span class="hotpink">glows with devotion</span>`);
						eventSlave.devotion += 3;
					}
					t.push(`as ${he} washes ${himself} in the shower with you.`);
				} else {
					t.push(`${He} seems utterly dissipated by the fucking ${he} just got, and may have just had the best sex of ${his} life. <span class="lightsalmon">${He}'s a submissive!</span>`);
					eventSlave.fetishKnown = 1;
				}
			}
			t.push(VCheck.Vaginal(eventSlave, 1));
			eventSlave.devotion += 5;
			return t;
		}

		function feed() {
			t = [];

			t.push(`You approach ${him} and`);
			if (eventSlave.dick > 0) {
				t.push(`reach under ${his} girldick for ${his}`);
			} else if (eventSlave.balls > 3) {
				t.push(`reach under ${his} dangling balls`);
			} else {
				t.push(`cup ${his}`);
			}
			t.push(`sopping pussy. ${He} gasps as ${he} feels your cool grasp.`);
			t.push(`Your possessive hand encompasses ${his} vulva, with your index and ring fingers sliding around either side of ${his} pubic mound to grip ${his} entire womanhood.`);
			if (eventSlave.vagina > 0) {
				if (eventSlave.vagina > 1) {
					t.push(`${His} relaxed pussy almost draws your middle finger inward and upward,`);
				} else {
					t.push(`${His} pussy welcomes your middle finger,`);
				}
				t.push(`and you hook it inside ${his} body, gathering a healthy amount of pussyjuice and brushing ${his} g-spot.`);
			} else {
				t.push(`You're careful not to penetrate ${his} virgin slit with your middle finger, but you draw it up the exterior of ${his} channel, gathering a healthy amount of pussyjuice.`);
			}
			t.push(`Then you remove your hand, though the horny ${SlaveTitle(eventSlave)} unconsciously tries to follow the withdrawing digits.`);
			if (canSee(eventSlave)) {
				t.push(`${He} stares at you, waiting to see what you're going to do, and a blush begins to rise on ${his} ${eventSlave.skin} cheeks as ${he} sees you reaching for ${his} mouth. ${His}`);
			} else if (canHear(eventSlave)) {
				t.push(`${He} listens carefully to your movements, waiting to see what you're going to do, and a blush begins to rise on ${his} ${eventSlave.skin} cheeks as ${he} feels you reaching for ${his} mouth. ${His}`);
			} else {
				t.push(`${He} stays as still as ${he} can, until ${his} ${eventSlave.skin} cheeks blush as ${he} feels you reaching for ${his} mouth. ${His}`);
			}
			if (eventSlave.lips > 95) {
				t.push(`facepussy`);
			} else if (eventSlave.lips > 40) {
				t.push(`pillow-like`);
			} else if (eventSlave.lips > 10) {
				t.push(`soft`);
			} else {
				t.push(`thin`);
			}
			t.push(`lips part and you insert all three of your fingers into ${his} hot mouth. ${He} quivers at the intimacy of the gesture, and the ${canTaste(eventSlave) ? "taste" : "feel"} of ${his} own juices. The tremor sends a delicious motion through ${his}`);
			if ((eventSlave.boobsImplant === 0) && (eventSlave.boobs > 300)) {
				t.push(`natural ${eventSlave.boobs > 2000 ? "udders." : "breasts."}`);
			} else if ((eventSlave.boobsImplant / eventSlave.boobs) >= 0.60) {
				t.push(`fake tits.`);
			} else if (eventSlave.weight > 160) {
				t.push(`fat folds.`);
			} else if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					t.push(`gravidness.`);
				} else if (eventSlave.bellyImplant >= 3000) {
					t.push(`distended belly.`);
				} else {
					t.push(`${eventSlave.inflationType}-filled belly.`);
				}
			} else if (eventSlave.weight > 95) {
				t.push(`soft body.`);
			} else if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
				t.push(`stiff prick.`);
			} else if (eventSlave.scrotum > 4) {
				t.push(`dangling balls.`);
			} else if (eventSlave.dick > 0) {
				t.push(`limp bitchclit.`);
			} else if (eventSlave.weight > 30) {
				t.push(`chubbiness.`);
			} else {
				t.push(`body.`);
			}
			t.push(`You keep your fingers where they are until ${he}'s licked them really clean. ${His} hot tongue runs repeatedly between each of your fingers`);
			if (eventSlave.piercing.tongue.weight > 0) {
				t.push(`and the smooth hardness of ${his} tongue piercing brushes against them`);
			}
			t.push(t.pop() + ".");
			t.push(`${He} ${eventSlave.voice > 0 ? "moans whorishly" : "begins to pant"} when you go back for more, and the third time you harvest ${his} own pussyjuice to feed it to ${him}, ${he} orgasms, adding some femcum to ${his} next little meal licked off your fingers.`);
			t.push(`${His} ${canSee(eventSlave) ? "eyes shine" : "face is alight"} with <span class="mediumaquamarine">gratitude and trust.</span>`);
			eventSlave.trust += 5;
			return t;
		}

		function virginityWarningLove() {
			return (eventSlave.vagina === 0 && V.PC.dick !== 0) ? `This option will take ${his} virginity` : null;
		}

		function virginityWarningPound() {
			return eventSlave.vagina === 0 ? `This option will take ${his} virginity` : null;
		}
	}
};
