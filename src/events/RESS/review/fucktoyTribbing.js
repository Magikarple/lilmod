App.Events.RESSFucktoyTribbing = class RESSFucktoyTribbing extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => fuckSlavesLength() > 2,
			() => V.PC.vagina > -1,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				s => [Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(s.assignment),
				s => s.devotion > 20,
				s => s.trust >= -20,
				s => canDoAnal(s) || canDoVaginal(s),
				canDoVaginal,
				s => s.dick === 0,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, hers, girl, woman
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const {hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(`With a mind as busy as yours, you sometimes wake up in the middle of the night for no reason that you can remember.`);
		if (V.PC.actualAge >= 50) {
			r.push(`These incidents have become more common as you age; merely one of time's little mutilations.`);
		}
		r.push(`Naturally, waking up in the middle of the night feels much different than it did back before you owned an arcology. Now you have your choice from a virtual buffet of sleeping slaves if you don't feel like going back to sleep right away.`);
		r.toParagraph();

		r.push(`The slave on your left is sleeping on ${hisU} back, and is touching you lightly at the hip and shoulder. The slave on your right, though, is nestled in close, ${his} shoulder under your arm and ${his} head resting gently on your`);
		if (V.PC.boobs >= 1400) {
			r.push(`enormous`);
			if (V.PC.boobsImplant > 0) {
				r.push(`firm`);
			} else {
				r.push(`pillowy`);
			}
			r.push(`breast.`);
		} else if (V.PC.boobs >= 1200) {
			r.push(`huge`);
			if (V.PC.boobsImplant > 0) {
				r.push(`firm`);
			} else {
				r.push(`pillowy`);
			}
			r.push(`breast.`);
		} else if (V.PC.boobs >= 1000) {
			r.push(`big`);
			if (V.PC.boobsImplant > 0) {
				r.push(`firm`);
			} else {
				r.push(`soft`);
			}
			r.push(`breast.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`bare breast.`);
		} else if (V.PC.title === 0) {
			r.push(`flat chest.`);
		} else {
			r.push(`toned chest.`);
		}
		r.push(`${He}'s straddling your leg on that side, and as your waking consciousness coalesces, you become more and more aware`);
		if (eventSlave.belly >= 10000) {
			r.push(`of the weight of ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnancy`);
			} else {
				r.push(`stomach`);
			}
			r.push(`on your`);
			if (V.PC.belly >= 5000) {
				r.push(`own gravid`);
			}
			r.push(`middle and`);
		}
		r.push(`that ${his} mons is pressed against your thigh. ${He} has one leg thrown over yours in ${his} sleeping embrace, placing ${his} own`);
		if (eventSlave.muscles > 30) {
			r.push(`muscular`);
		} else if (eventSlave.weight > 10) {
			r.push(`plush`);
		} else {
			r.push(`feminine`);
		}
		r.push(
			`thigh against your womanhood in turn. It's`,
			contextualIntro(V.PC, eventSlave, true)
		);
		r.addToLast(`, and you feel yourself begin to grow wet as you gaze at ${him} in the dim light and feel ${his} slumbering heat.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Make love to ${him}`, love),
			new App.Events.Result(`Fuck ${him}`, fuck),
		]);

		function love() {
			const r = new SpacedTextAccumulator();
			r.push(`You crane your neck down and kiss ${him} on the lips. ${He} awakens slowly, gently, ${his} ${App.Desc.eyesColor(eventSlave)} fluttering open, looking black in the nighttime gloom. ${He} smiles into your mouth, and you feel ${his} pulse quicken through the extensive contact down your bodies. You interlace your fingers between ${hers} and turn, pressing ${him} back down into the soft sheets. ${He} opens ${himself} for you, spreading ${his} legs wide and embracing you with them, making sure to run ${his} heels up the backs of your calves in a way that sends a shiver up your spine. Feeling this through your kissing mouths, ${he} smiles into you, a pleased expression ${he} maintains as you`);
			if (eventSlave.belly >= 300000 && V.PC.belly >= 5000) {
				r.push(`struggle to find a position to handle both your pregnancy and ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`${belly} gravid middle`);
				} else {
					r.push(`${belly} belly`);
				}
				r.push(`and`);
			} else if (eventSlave.belly >= 300000) {
				r.push(`struggle to find a position to handle ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`${belly} belly`);
				}
				r.push(`and`);
			} else if (eventSlave.belly >= 5000 && V.PC.belly >= 5000) {
				r.push(`shift into a position to better accommodate both your pregnancy and ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`${belly} gravid middle`);
				} else {
					r.push(`${belly} belly`);
				}
				r.push(`and`);
			} else if (V.PC.belly >= 5000) {
				r.push(`shift into a position to better accommodate your pregnancy and`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`shift into a position to better accommodate ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`${belly} belly`);
				}
				r.push(`and`);
			}
			r.push(`begin to gently press your womanhood against ${hers}.`);
			r.toParagraph();

			if (eventSlave.fetishKnown === 0) {
				r.push(`Knowing little about ${his} sexual peccadilloes, but confident that ${he}'ll do ${his} best to enjoy your lovemaking, you continue this shockingly intimate intercourse until ${he} climaxes.`);
			} else if (eventSlave.fetish === Fetish.NONE) {
				r.push(`Knowing ${him} to be quite endearingly vanilla, you continue this shockingly intimate intercourse until ${he} climaxes, kissing ${him} all the way through your soft missionary lovemaking.`);
			} else if (eventSlave.fetish === "buttslut") {
				r.push(`Knowing ${his} tastes and wanting the intimacy of mutual pleasure, you slide a hand around behind and under ${him} so you can tease ${his} ass. ${He} gives ${his} butt a little wiggle of thanks, and orgasms promptly.`);
				seX(eventSlave, "anal", V.PC, "penetrative");
			} else if (eventSlave.fetish === "cumslut") {
				r.push(`Knowing ${his} tastes and wanting the intimacy of mutual pleasure, you slide your tongue into ${his} mouth, making your kisses so frankly sexual and penetrative that you're practically making oral love at the same time as you do it missionary style.`);
			} else if (eventSlave.fetish === "sadist") {
				r.push(`You know ${his} tastes, but by the act of this intimate missionary lovemaking, you wordlessly command ${him} to join you for more conventional pleasures, if only for the moment. ${He} complies with pleasure, climaxing with surprising speed; perhaps ${he} appreciates the change.`);
			} else if (eventSlave.fetish === "masochist") {
				r.push(`Knowing ${his} tastes and wanting the intimacy of mutual pleasure, you nip ${his} lower lip in your teeth with each kiss, and rake your nails across ${his} flanks just hard enough to hurt a little. ${He} climaxes quickly to the mixed pain and missionary intimacy.`);
			} else if (eventSlave.fetish === "dom") {
				r.push(`You know ${his} tastes, but by the act of this intimate missionary lovemaking, you wordlessly command ${him} to join you for more equal pleasures, if only for the moment. ${He} complies with something like relief, climaxing with surprising speed; perhaps ${he} appreciates a turn on the bottom.`);
			} else if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				r.push(`Being on the bottom for some missionary lovemaking is very much to ${his} tastes, and ${he} rises to the point of climax with almost indecent speed. You slow your pace to nothing more than a gentle pressure now and then, and keep ${him} on the edge of orgasm for a long time.`);
			} else if (eventSlave.fetish === "boobs") {
				r.push(`Knowing ${his} tastes and wanting the intimacy of mutual pleasure, you make sure your nipples line up`);
				if (eventSlave.nipples === "fuckable") {
					r.push(`and interlock`);
				}
				r.push(`with ${hers} as best you can. You note the buck of pleasure this produces each time you get it perfectly right as you make love to ${him}.`);
			} else if (eventSlave.fetish === "pregnancy" && eventSlave.pregKnown === 1) {
				r.push(`Being on the bottom for some missionary lovemaking is very much to ${his} tastes, even though ${he} is already pregnant. ${He} builds to orgasm slowly, reveling in the feeling of being your ${woman}.`);
			} else if (eventSlave.fetish === "pregnancy") {
				r.push(`Being on the bottom for some missionary lovemaking is very much to ${his} tastes, even though the encounter isn't particularly likely to get ${him} pregnant. ${He} builds to orgasm slowly, reveling in the feeling of being your ${woman}.`);
			}
			if (canFemImpreg(V.PC, eventSlave)) {
				r.push(knockMeUp(V.PC, 5, 0, eventSlave.ID));
			}
			r.push(`As you made love to ${him}, the gentle motions, feminine sighs, and delicate aroma of pleasure woke the other slaves in bed with you, and they began their own intimacy with each other. As you go back to sleep, you're surrounded with something very like Sapphic paradise. ${eventSlave.slaveName} nestles up to you once more, embracing you with <span class="trust inc">trust born of love.</span>`);
			eventSlave.trust += 4;
			seX(eventSlave, "vaginal", V.PC, "penetrative");
			r.toParagraph();
			return r.container();
		}

		function fuck() {
			const r = new SpacedTextAccumulator();
			r.push(`You feel your libido building, building, building within you, an endless cycle that mounts rapidly to an inevitable explosion. It comes, and you perform a catlike glide around until your head is at ${his} feet. As you did, you infiltrated one of your legs between ${hers} from its convenient starting point. ${He} wakes suddenly to the feeling of being manhandled, and then comes fully awake to the shockingly intimate sensation of your pussies pressed together as closely as physically possible.`);
			r.toParagraph();

			r.push(`Holding ${his} upper thighs with your hands to pull ${him} against you, you grind into ${him}, fucking ${him} about as comprehensively as it's possible for someone without a cock to fuck a ${woman}. ${He}'s most definitely up for it, and you see ${his} eyes fly wide in the gloom as the full weight of the pleasure crashes into ${him}. It's not exactly a position for lovemaking, since your faces are about as far apart as they can possibly be during sex, but kissing be damned, you're here to fuck. Naturally, this evolution wakes everyone else up too, and before long, there's a regular lesbian orgy going on. When it's over, ${eventSlave.slaveName} finds ${himself} returning exhaustedly to sleep, one of your arms curled`);
			if (eventSlave.belly >= 5000) {
				r.push(`under ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`belly`);
				}
			} else {
				r.push(`around ${his} middle`);
			}
			r.push(`to cup ${his} pussy possessively. ${He} finds that <span class="devotion inc">${he} doesn't mind.</span> ${He}'s your ${girl}.`);
			eventSlave.devotion += 4;
			seX(eventSlave, "vaginal", V.PC, "penetrative");
			if (canFemImpreg(V.PC, eventSlave)) {
				r.push(knockMeUp(V.PC, 5, 0, eventSlave.ID));
			}
			r.toParagraph();
			return r.container();
		}
	}
};
