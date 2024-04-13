App.Events.RESSDickWringing = class RESSDickWringing extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.dick > 8,
				s => s.balls > 0,
				s => s.energy > 60,
				s => s.devotion > 50,
				s => s.trust > 50,
				s => canDoAnal(s) || canDoVaginal(s),
				s => s.belly < 100000,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`You run into`,
			contextualIntro(PC, eventSlave, true),
			`in the hallway outside your office. The devoted ${SlaveTitle(eventSlave)} smiles at you as ${he} approaches. You barely notice how awkward ${his} gait is, since ${he} usually walks a little strangely. ${His} third leg tends to have that effect. But on consideration, ${he} does seem especially uncomfortable right now. The poor ${girl}'s`
		);
		if (eventSlave.scrotum === 0) {
			r.push(`internal balls`);
		} else if (eventSlave.balls < 3) {
			r.push(`girly balls`);
		} else if (eventSlave.scrotum < 4) {
			r.push(`balls, held tightly against ${his} body by ${his} taut scrotum,`);
		} else {
			r.push(`swinging balls`);
		}
		r.push(`must be in dire need of emptying.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${He} trusts you, so ${he} approaches you as sensually as ${he} can manage and asks for your help.`);
		if (!canTalk(eventSlave)) {
			r.push(`${He} uses quick but submissive gestures to beg you to help ${him} cum, pleading the special difficulties caused by ${his} outlandish member, which ${he} can manage most comfortably if ${he} has both hands free for it.`);
		} else {
			r.push(
				Spoken(eventSlave, `"${Master}, would you please, please help me cum?"`),
				`${he} begs submissively.`,
				Spoken(eventSlave, `"It's nice if I can use both hands on it to, um, manage things."`)
			);
		}
		r.push(`${He}'s referring to the volume issue with ${his} unnaturally massive dick. The thing is so huge and so soft that`);
		if (eventSlave.balls < 3) {
			r.push(`one of ${his} (by comparison) pathetically weak ejaculations`);
		} else if (eventSlave.balls < 6) {
			r.push(`one of ${his} comparatively normal ejaculations`);
		} else {
			r.push(`a single one of even ${his} copious ejaculations`);
		}
		r.push(`often fails to make it all the way to the tip of ${his} cock, making it only partway down ${his} urethra without help.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Address ${his} problem together`, together, virginityWarning()),
			new App.Events.Result(`Use ${his} trouble to dominate ${him}`, dominate, virginityWarning()),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function together() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You step in and give ${him} a quick kiss on the lips, telling ${him} you'd be happy to. ${He} was confident you would, but the tenderness makes ${his} breath catch a little. You take ${him} by ${his}`);
			if (eventSlave.weight > 130) {
				r.push(`fat`);
			} else if (eventSlave.weight > 95) {
				r.push(`chubby`);
			} else if (eventSlave.muscles > 30) {
				r.push(`strong`);
			} else if (eventSlave.shoulders < 0) {
				r.push(`pretty little`);
			} else if (eventSlave.shoulders > 1) {
				r.push(`broad`);
			} else {
				r.push(`feminine`);
			}
			r.push(`shoulders and keep kissing ${him}, steering ${him} backwards into your office. ${He} gets the idea and cooperates as best ${he} can, giggling`);
			if (eventSlave.voice === 0) {
				r.push(`mutely`);
			} else {
				r.push(`cutely`);
			}
			r.push(`into your mouth as ${his} hot and increasingly horny body bumps against your own.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`When ${his}`);
			if (eventSlave.butt > 12) {
				r.push(`monumental ass`);
			} else if (eventSlave.butt > 7) {
				r.push(`titanic ass`);
			} else if (eventSlave.butt > 4) {
				r.push(`big butt`);
			} else {
				r.push(`cute rear`);
			}
			r.push(`touches the edge of your desk, the`);
			if (eventSlave.height > 180) {
				r.push(`tall ${SlaveTitle(eventSlave)} leans back`);
			} else if (eventSlave.height > 155) {
				r.push(`${SlaveTitle(eventSlave)} reclines`);
			} else {
				r.push(`short ${SlaveTitle(eventSlave)} hops up`);
			}
			r.push(`to lie across it, using a hand to lay ${his} inhumanly big dick`);
			if (eventSlave.belly > 10000) {
				r.push(`onto ${his} ${belly}`);
				if (eventSlave.bellyPreg > 0) {
					r.push(`pregnant`);
				}
				r.push(`belly.`);
			} else if (eventSlave.weight > 160) {
				r.push(`across ${his} gut.`);
			} else if (eventSlave.boobs > 5000) {
				r.push(`in the warm canyon formed by ${his} inhumanly big boobs.`);
			} else if (eventSlave.weight > 95) {
				r.push(`across ${his} soft belly.`);
			} else if (eventSlave.belly > 1500) {
				r.push(`over ${his} ${belly}`);
				if (eventSlave.bellyPreg > 0) {
					r.push(`pregnant`);
				}
				r.push(`belly.`);
			} else if (eventSlave.muscles > 30) {
				r.push(`across ${his} ripped abs.`);
			} else if (eventSlave.weight > 10) {
				r.push(`across ${his} plush stomach.`);
			} else {
				r.push(`up ${his} stomach.`);
			}
			r.push(`${He} spreads ${his} legs as wide as they'll go, and reaches down to spread ${his} buttocks even wider, offering you ${his}`);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`holes.`);
			} else if (canDoVaginal(eventSlave)) {
				r.push(`pussy.`);
			} else {
				r.push(`asshole.`);
			}
			r.push(`${He}`);
			if (eventSlave.voice === 0) {
				r.push(`tries to groan`);
			} else {
				r.push(`groans`);
			}
			r.push(`with anticipation of the coming relief as you slide`);
			if (PC.dick !== 0) {
				r.push(`your cock`);
			} else {
				r.push(`a strap-on`);
			}
			r.push(`past ${his}`);
			if (canDoVaginal(eventSlave)) {
				r.push(`pussylips and inside ${his} womanhood.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(`sphincter and inside ${his} asspussy.`);
				r.push(VCheck.Anal(eventSlave, 1));
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`It doesn't take long. ${His}`);
			if (eventSlave.scrotum === 0) {
				r.push(`invisible but overfull balls`);
			} else {
				r.push(`balls tighten and`);
			}
			r.push(`shoot cum into ${his} soft python of a dick, but not a drop appears at its tip. Gasping at the mixed relief and discomfort, ${he} lets ${his} butt go and wriggles around to grab ${his} dick around its base with both hands. ${He} squeezes it from base to tip to bring out its contents. ${He}'s so huge that ${he}'s able to reach down with ${his} lips and get ${his} cockhead into ${his} mouth, the meat filling it entirely. ${He} sucks industriously, swallowing ${his} own load. ${He} was just trying to relieve the pressure, but the added stimulation brings ${him} to climax again. Silenced by ${his} own dickhead, ${he} shudders deliciously and starts over, wringing more cum into ${his} own mouth. You change angles, bringing the hard head of`);
			if (PC.dick !== 0) {
				r.push(`your own penis`);
			} else {
				r.push(`your phallus`);
			}
			r.push(`against ${his} prostate and forcing an agonizing third climax.`); // FIXME: actually check that slave has a prostate
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${He}'s so discombobulated by this that ${he} goes limp, offering no resistance as you extract yourself,`);
			if (PC.dick !== 0) {
				r.push(`straddle ${his} torso, and press your dick inside ${his} mouth to climax there, adding your own ejaculate`);
			} else {
				r.push(`slip out of the harness with the ease of long practice, and straddle ${his} face so that your climax adds a good quantity of your pussyjuice`);
			}
			r.push(`to everything ${he}'s already gotten down`);
			if (PC.vagina !== -1) {
				if (PC.dick !== 0) {
					r.push(`and leaving quite a lot of your pussyjuice on ${his} chin`);
				}
			}
			r.push(r.pop() + `. When you finally release ${him}, ${he} slithers down to the floor, utterly spent.`);
			if (!canTalk(eventSlave)) {
				r.push(`${He} raises a shaky hand to <span class="trust inc">gesture thanks.</span>`);
			} else if (SlaveStatsChecker.checkForLisp(eventSlave)) {
				r.push(`"<span class="trust inc">Thank you,</span> ${Master}," ${he} lisps weakly.`);
			} else {
				r.push(`"<span class="trust inc">Thank you,</span> ${Master}," ${he} murmurs in a tiny voice.`);
			}
			eventSlave.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function dominate() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You step in and trace a`);
			if (PC.title === 1) {
				r.push(`strong`);
			} else {
				r.push(`feminine`);
			}
			r.push(`hand across ${his} lips before inserting two fingers into ${his} mouth. ${He} looks puzzled, but obediently begins to suck on your fingers. You use your other hand to explore ${his} body, titillating the heavily aroused ${SlaveTitle(eventSlave)} until ${he}'s on the verge of orgasm. Without warning, you place an elastic band around the slave's dickhead. ${He} writhes with discomfort, but knows better than to protest. It's tight, but not agonizingly so. ${He}'ll be able to cum, but not a drop will get out. Grabbing ${him} by a nipple`);
			if (eventSlave.nipples === "fuckable") {
				r.push(`cunt`);
			}
			r.push(r.pop() + `, you pull ${him} down to ${his} knees, enjoying the motion of ${his} body as ${he} wriggles with the discomfort of being tugged this way, the uncomfortable thing squeezing the tip of ${his} cock, and the suspicion that this is going to be tough.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Once ${he}'s in position, you`);
			if (eventSlave.butt > 12) {
				r.push(`struggle to wrap your arms around ${his} bountiful buttcheeks,`);
			} else if (eventSlave.butt > 7) {
				r.push(`heft ${his} ridiculous buttcheeks possessively,`);
			} else if (eventSlave.butt > 4) {
				r.push(`give ${his} huge ass a possessive squeeze,`);
			} else {
				r.push(`run your hands across ${his} bottom,`);
			}
			r.push(`and then shove`);
			if (PC.dick !== 0) {
				r.push(`your cock`);
			} else {
				r.push(`a strap-on`);
			}
			if (canDoVaginal(eventSlave)) {
				r.push(`inside ${his} cunt.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(`up ${his} butt.`);
				r.push(VCheck.Anal(eventSlave, 1));
			}
			r.push(`${His} cock is so long that it drags along the floor as you pound`);
			if (eventSlave.belly >= 300000) {
				r.push(`${him} against ${his} ${belly} dome of a stomach.`);
			} else if (eventSlave.boobs > 12000) {
				r.push(`${him}, ${his} enormous tits serving as a cushion for ${his} torso to rest against.`);
			} else if (eventSlave.boobs > 7000) {
				r.push(`${him}, accompanied by the nipples that cap ${his} absurd boobs.`);
			} else {
				r.push(`${him}.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${He}'s so pent up that ${he} reaches ${his} first climax quickly, filling ${his} capped dick with cum. ${He}`);
			if (eventSlave.voice === 0) {
				r.push(`tries to moan`);
			} else {
				r.push(`moans`);
			}
			r.push(`at the combination of relief and pressure inside ${his} dick, and then slumps a little when ${he} feels the`);
			if (PC.dick !== 0) {
				r.push(`penis`);
			} else {
				r.push(`hard phallus`);
			}
			r.push(`inside ${him} fuck ${him} even harder, forcing ${him} towards a second orgasm. And after that one, a third. And a fourth.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`When you finally climax yourself, you stand, leaving ${him} writhing at your feet with ${his} huge soft cock positively pressurized. Considering the situation, you kneel down at ${his} side, deciding what to do. Stroking ${him} in a mockery of reassurance, you grab ${his} agonized member, producing a`);
			if (eventSlave.voice === 0) {
				r.push(`gaping, silent scream.`);
			} else {
				r.push(`little shriek.`);
			}
			if (eventSlave.toyHole === "dick" && (PC.preg === 0 || PC.vagina === 0)) {
				r.push(`You maneuver the massive thing into your own`);
				if (PC.preg === 0 && PC.vagina !== -1) {
					r.push(`pussy,`);
				} else {
					r.push(`asshole,`);
				}
				r.push(`slide a finger in alongside the monstrous thing as ${he}`);
				if (eventSlave.voice === 0) {
					r.push(`moans with expectation,`);
				} else {
					r.push(`begs abjectly to unleash ${his},`);
				}
				r.push(`and pop the elastic off. You get to watch ${his} face as ${he} floods your`);
				if (PC.preg === 0 && PC.vagina !== -1) {
					r.push(`womanhood`);
				} else {
					r.push(`bowels`);
				}
				r.push(`with cum, your stomach taking on a distinctive swell as ${his} pent-up load empties into you.`);
				if (PC.vagina !== -1) {
					seX(eventSlave, "penetrative", PC, "vaginal");
				} else {
					seX(eventSlave, "penetrative", PC, "anal");
				}
				if (canImpreg(PC, eventSlave)) {
					r.push(knockMeUp(PC, 50, 0, eventSlave.ID));
				}
			} else {
				r.push(`You maneuver the massive thing inside the slave's own well-fucked`);
				if (eventSlave.vagina > -1) {
					r.push(`pussy,`);
				} else {
					r.push(`asshole,`);
				}
				r.push(`and then slide fingers in alongside the monstrous thing as ${he}`);
				if (eventSlave.voice === 0) {
					r.push(`cries desperately.`);
				} else {
					r.push(`begs abjectly for mercy.`);
				}
				r.push(`Popping the elastic off, you get to watch ${his} face as ${he} floods ${his} own`);
				if (eventSlave.vagina > -1) {
					r.push(`womanhood`);
				} else {
					r.push(`bowels`);
				}
				r.push(`with cum.`);
				if (canDoVaginal(eventSlave)) {
					seX(eventSlave, "vaginal", PC, "penetrative");
					if (canGetPregnant(eventSlave) && canBreed(eventSlave, eventSlave) && eventSlave.vasectomy !== 1) { // can't miss the opportunity to knock ${himself} up
						knockMeUp(eventSlave, 20, 0, eventSlave.ID);
					}
				} else {
					seX(eventSlave, "anal", PC, "penetrative");
				}
			}
			r.push(`The cum pressurization brought ${him} almost to half-hardness, and as this effect diminishes, ${his} dick slides out again, releasing a lewd torrent of cum. ${He} cries with overstimulation, relief, pain, and humiliation, <span class="devotion inc">groveling below you</span> in utter subjugation.`);
			eventSlave.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
