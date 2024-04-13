App.Events.RESSImplantInspection = class RESSImplantInspection extends App.Events.BaseEvent {
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
				s => s.boobs > 800,
				s => s.boobsImplant / s.boobs >= 0.60,
				s => s.devotion > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		r.push(`comes before you naked for a routine inspection. You take particular care to examine ${his} implants; even a careful hand at the remote surgery has been known to produce unsightly scars, stretch marks, and the like. ${His} breasts are`);
		if (eventSlave.boobs < 1200) {
			r.push(`large,`);
		} else {
			r.push(`massive,`);
		}
		r.push(`but ${his} implants render them perky and rounded despite their size. An impossibility, had they been fully natural. Standing before you, ${his} breasts protrude outward from ${his} chest proudly and without sagging. As you inspect ${him} with your hands, ${he}`);
		if (eventSlave.voice === 0) {
			r.push(`breathes a little harder and looks like ${he} would speak, were ${he} not mute.`);
		} else if (eventSlave.accent > 3) {
			r.push(`breathes a little harder and looks like ${he} would speak, if ${he} knew how.`);
		} else if (eventSlave.accent > 2) {
			r.push(`breathes a little harder and ${say}s something in a language you don't understand.`);
		} else if (!canTalk(eventSlave)) {
			r.push(`breathes a little harder and gestures that it feels nice.`);
		} else {
			if (eventSlave.lips > 70) {
				r.push(`murmurs through ${his} huge lips,`);
			} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
				r.push(`murmurs through ${his} piercings,`);
			} else {
				r.push(`murmurs,`);
			}
			r.push(Spoken(eventSlave, `"That feels really nice, ${Master}."`));
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} a nice massage`, massage),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`See if they've got any bounce`, bounce, ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Show ${him} off in public`, show, virginityWarning())
				: new App.Events.Result(),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function massage() {
			const r = new SpacedTextAccumulator();
			r.push(`You sit on the couch next to your desk and pat your thighs. ${He} smiles and comes over, lowering ${himself}`);
			if (V.PC.dick === 0) {
				r.push(`into your lap`);
			} else {
				r.push(`onto your member`);
				if (V.PC.vagina !== -1) {
					r.push(`and sliding a hand down to see to your pussy`);
				}
			}
			r.push(`without hesitation. You help ${him} get comfortable and instead of`);
			if (V.PC.dick === 0) {
				r.push(`grinding`);
			} else {
				r.push(`thrusting`);
			}
			r.push(`or telling ${him} to ride, you just sit there with ${him} in your lap, gently massaging ${his}`);
			if (eventSlave.boobs < 900) {
				r.push(`big`);
			} else {
				r.push(`huge`);
			}
			r.push(`tits. Despite their fine craftsmanship, implants are prone to rendering breasts sore, so ${he}'s soon groaning with relief at the attention you lavish upon them. You finally manage to bring ${him} to orgasm with almost nothing but delicate stimulation of ${his} nipples, despite ${his} implants making them less sensitive than usual. <span class="trust inc">${He} has become more trusting of you.</span>`);
			eventSlave.trust += 4;
			r.toParagraph();
			return r.container();
		}

		function bounce() {
			const r = new SpacedTextAccumulator();
			r.push(`You tell ${him} to kneel on the smooth floor. ${He} knows this means doggy style, so ${he} compliantly`);
			if (eventSlave.belly >= 300000) {
				r.push(`shifts onto ${his} ${belly} belly,`);
			}
			r.push(`arches ${his} back and cocks ${his} hips to offer ${himself} to you. You`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`enter`);
			if (canDoVaginal(eventSlave)) {
				r.push(`${his} pussy`);
			} else {
				r.push(`${his} ass`);
			}
			r.push(`without preamble and seize ${his} hips. ${He} braces ${himself}, knowing what's coming, but soon ${he} discovers a new disadvantage to ${his} augmented breasts: even as you pound ${him} hard and grope ${his} chest, ${his} tits barely move despite their rough treatment. ${His} unyielding breasts only encourage you to fuck ${him} harder, in an effort to garner any iota of movement from ${his} ample chest.`);
			if (eventSlave.dick > 0 && !(eventSlave.chastityPenis)) {
				if (canAchieveErection(eventSlave)) {
					r.push(`${His} cock doesn't help, either, flopping around half-erect as ${he} vacillates between pain and arousal.`);
				} else if (eventSlave.dick > 20) {
					r.push(`${His} cock doesn't help, either, flopping around on the floor as ${he} vacillates between pain and arousal.`);
				} else {
					r.push(`${His} cock doesn't help, either, flopping around feebly as ${he} vacillates between pain and arousal.`);
				}
			} else if (eventSlave.clit > 2) {
				r.push(`${His} huge clit doesn't help, either, flopping around half-erect as ${he} vacillates between pain and arousal.`);
			}
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`Even a switch to ${his} ass does little to slow your thrusts, and so ${his} breasts continue to rest impassively on ${his} chest as their owner is buttfucked senseless.`);
			}
			r.push(`You finish with a particularly hard thrust`);
			if (V.PC.dick === 0) {
				r.push(`and shake with climax,`);
			} else {
				r.push(`to spill your seed deep inside ${him},`);
			}
			r.push(`ramming forward hard enough to knock ${him} down to the floor. As you rise, ${his} discomfited form is a pretty sight, with ${his} perfectly rounded breasts`);
			if (eventSlave.belly >= 300000) {
				r.push(`neatly stack on top each other`);
			} else {
				r.push(`keeping ${his} body suspended off the ground`);
			}
			r.push(`and ${his} well fucked butt lewdly relaxed. <span class="devotion inc">${He} has become more submissive.</span>`);
			eventSlave.devotion += 4;
			r.push(VCheck.Both(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}

		function show() {
			const r = new SpacedTextAccumulator();
			r.push(`You bring ${him} out onto the promenade, still nude, ${his} impressively augmented breasts attracting open stares with their perfect roundness and perkiness.`);
			if (eventSlave.sexualFlaw === "attention whore") {
				r.push(`The slut loves being the center of attention and wishes ${his} tits where even more eye catching.`);
			} else if (eventSlave.fetishKnown === 1 && eventSlave.fetishStrength > 60 && eventSlave.fetish === "humiliation") {
				r.push(`The slut loves being embarrassed, and ${he} blushes furiously as ${his} nipples`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`stiffen`);
				} else {
					r.push(`swell shut`);
				}
				r.push(`with arousal despite ${his} implants having sapped them off some of their sensitivity.`);
			} else if (eventSlave.energy > 95) {
				r.push(`The nympho slut loves being shown off, and ${he} flaunts ${his} implanted boobs shamelessly.`);
			} else if (eventSlave.counter.anal > 100 && eventSlave.counter.oral > 100) {
				r.push(`${He}'s such a veteran sex slave that ${he} takes the stares in stride.`);
			} else {
				r.push(`${He} blushes a little, but tips ${his} chin up and follows you obediently.`);
			}
			r.push(`When you reach a good spot, you grab ${his}`);
			if (eventSlave.weight > 30) {
				r.push(`fat ass`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush hips`);
			} else if (eventSlave.weight >= -10) {
				r.push(`trim hips`);
			} else if (eventSlave.butt > 2) {
				r.push(`big butt`);
			} else {
				r.push(`skinny ass`);
			}
			r.push(`and`);
			if (eventSlave.height >= 185) {
				r.push(`pull ${his} tall body in`);
			} else if (eventSlave.height >= 160) {
				r.push(`pull ${him} up on tiptoe`);
			} else {
				r.push(`push ${his} petite form up onto a railing`);
			}
			r.push(`for standing sex. ${He} cocks ${his} hips and takes your`);
			if (V.PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`cock`);
			}
			r.push(`compliantly, and after a few thrusts you reach down, seize ${him} behind each knee, and`);
			if (V.PC.belly >= 5000 && eventSlave.belly >= 100000) {
				r.push(`collapse against a nearby bunch under the excessive weight between your pregnancy and ${his} ${belly} stomach. Appreciating the bench's sacrifice, you return to fucking ${him}.`);
				if (eventSlave.bellyPreg >= 600000) {
					r.push(`Penetrating ${him} while feeling so much movement between you is unbelievably lewd. ${His} children squirm at their mother's excitement, causing ${his} bloated body to rub against you in ways you couldn't imagine.`);
				}
			} else if (eventSlave.belly >= 100000) {
				r.push(`pull ${him} as close as you can with ${his} ${belly} belly between you. Struggling to support the immense weight, you back ${him} against a rail so that you can continue to fuck ${him} while holding ${him}.`);
				if (eventSlave.bellyPreg >= 600000) {
					r.push(`Penetrating ${him} while feeling so much movement between you is unbelievably lewd. ${His} children squirm at their mother's excitement, causing ${his} bloated body to rub against you in ways you couldn't imagine.`);
				}
			} else {
				r.push(`hoist ${his} legs up so ${he}'s pinned against your`);
				if (V.PC.belly >= 1500) {
					r.push(`pregnancy,`);
				} else if (V.PC.boobs < 300) {
					r.push(`chest,`);
				} else {
					r.push(`boobs,`);
				}
				r.push(`helpless to do anything but let you hold ${him} in midair and fuck ${him}.`);
			}
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina > 1) {
					r.push(`${His} pussy can take a hard pounding, so you give it to ${him}.`);
				} else {
					r.push(`${His} poor tight pussy can barely take the pounding you're administering.`);
				}
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				if (eventSlave.anus > 1) {
					r.push(`${His} loose butthole can take a hard pounding, so you give it to ${him}.`);
				} else {
					r.push(`${His} poor tight butthole can barely take the pounding you're administering.`);
				}
				r.push(VCheck.Anal(eventSlave, 1));
			}
			r.push(`${He} loses all composure, gasping and panting as the massive weight of ${his} augmented chest weighs ${him} down, causing ${him} to all but collapse against you. Despite this, or perhaps partly because of it, ${he} begins to orgasm,`);
			if (eventSlave.chastityPenis === 1) {
				r.push(`the discomfort of being half-hard under ${his} chastity cage making ${him} squirm as cum rushes out of the hole at its tip.`);
			} else if (canAchieveErection(eventSlave)) {
				if (eventSlave.dick > 4) {
					r.push(`${his} monster of a cock releasing a jet of cum with each thrust into ${him}.`);
				} else if (eventSlave.dick > 3) {
					r.push(`${his} huge cock releasing a jet of cum with each thrust into ${him}.`);
				} else if (eventSlave.dick > 1) {
					r.push(`${his} cock releasing a spurt of cum with each thrust into ${him}.`);
				} else {
					r.push(`${his} tiny dick spurting cum with each thrust into ${him}.`);
				}
			} else if (eventSlave.dick > 9) {
				r.push(`${his} huge, soft cock spurting cum as it wiggles to your motions.`);
			} else if (eventSlave.dick > 0) {
				r.push(`${his} soft cock scattering cum all over the place as it flops around.`);
			} else if (eventSlave.belly >= 1500) {
				r.push(`${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly adding to ${his} near-total discomfiture.`);
			} else if (eventSlave.weight > 95) {
				r.push(`${his} soft body jiggling as ${he} climaxes.`);
			} else if (eventSlave.muscles > 5) {
				r.push(`${his} abs convulsing deliciously as ${he} climaxes.`);
			} else if (canDoVaginal(eventSlave)) {
				r.push(`${his} pussy tightening.`);
			} else {
				r.push(`${his} poor anal ring tightening.`);
			}
			r.push(`The crowd that surrounds you during this noisy spectacle <span class="reputation inc">is suitably impressed.</span>`);
			repX(1250, "event", eventSlave);
			r.push(VCheck.Both(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}
	}
};
