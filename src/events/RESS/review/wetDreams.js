App.Events.RESSWetDreams = class RESSWetDreams extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeAge === 1,
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				(s) => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				(s) => s.actualAge < 18,
				(s) => s.devotion > 20,
				canPenetrate,
				(s) => s.balls > 0,
				(s) => s.pubertyXY === 0,
				(s) => (s.physicalAge + s.birthWeek / 52 >= s.pubertyAgeXY - 0.5),

			]
		];
	}

	get weight() {
		return 10;
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {
			He, His,
			he, his, him, hers, himself, woman, girl
		} = getPronouns(slave);
		let r = [];
		const {title: Master} = getEnunciation(slave);
		const belly = bellyAdjective(slave);
		const {say} = getEnunciation(slave);

		App.Events.drawEventArt(node, slave);
		App.Events.addParagraph(node, [
			App.UI.DOM.slaveDescriptionDialog(slave),
			`appears in the door of your office early in the morning, hesitating before stepping in. You question why ${he} has come to see you and ${he} gingerly approaches your desk.`
		]);

		if (canTalk(slave)) {
			r.push(
				Spoken(slave, `"I'm sorry, ${Master},"`),
				`${he} ${say}s apologetically.`,
				Spoken(slave, `"I keep wetting my bed at night, and it feels so good too."`)
			);
		} else {
			r.push(`${He} uses gestures to point to ${his} crotch, and explains that ${he} has accidentally started wetting ${his} bed.`);
		}
		r.push(`You check ${his} records for any potential health issues that could be causing this annoyance when it dawns on you. ${slave.slaveName} is likely becoming potent, and now is the perfect time to cement ${his} sexuality.`);
		slave.pubertyXY = 1;
		App.Events.addParagraph(node, r);


		const choices = [];
		choices.push(new App.Events.Result(`Explain ${he}'s just growing up`, justGrowing));
		choices.push(new App.Events.Result(`Teach ${him} ${his} place`, teachHisPlace, (slave.vagina === 0) ? `This option will take ${his} virginity` : null));
		if (V.PC.vagina > 0) {
			choices.push(new App.Events.Result(`Let me teach you how to use it`, howToUse, `This option will penetrate you`));
		}
		choices.push(new App.Events.Result(`Tell ${him} it doesn't matter, ${he} won't be using it`, noMatter, (slave.anus === 0) ? `This option will take ${his} anal virginity` : null));
		if (V.seeExtreme === 1 && slave.indentureRestrictions <= 0) {
			choices.push(new App.Events.Result(`Geld ${him} to render ${him} impotent again`, geld));
		}

		App.Events.addResponses(node, choices);

		function justGrowing() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You tell ${him} that ${his} body is preparing to be able to impregnate girls, and that what happens at night happens to all boys. Though as a slave, ${he} should consider ${himself} lucky to be allowed to keep ${his} male genitalia.`);
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"I-I can get girls pregnant now? ${Master}, that m-means I'll have to be more careful."`),
					`${He} trails off.`
				);
			} else {
				r.push(`${He} brings ${his} hands to ${his} growing erection, a bubble of precum forming on its tip. ${He} fondles ${himself} as ${he} ponders ${his} new potency.`);
			}
			r.push(`You tell ${him} to keep ${his} dick in check or risk losing it, before continuing to read off the other various changes that will occur in ${him}. ${slave.slaveName} <span class="trust inc">appreciates</span> you taking the time to explain ${his} developing body.`);
			slave.trust += 5;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function teachHisPlace() {
			const frag = new DocumentFragment();
			let r = [];
			if (V.PC.dick === 0) {
				r.push(`You tell ${him} that ${he} is just becoming a potent ${woman}, and as such, ${he} will need to learn that you are the dominant force in ${his} life.`);
				if (canTalk(slave)) {
					r.push(Spoken(slave, `"What does that mean, ${Master}?"`));
				} else {
					r.push(`${His} expression shifts to confusion.`);
				}
				r.push(`You quickly approach and catch ${him}, forcing ${his}`);
				if (slave.belly >= 1500) {
					if (slave.bellyPreg >= 1500) {
						r.push(`gravid`);
					} else {
						r.push(`distended`);
					}
				}
				r.push(`body face-up onto the couch. ${He}`);
				if (canSee(slave)) {
					r.push(`watches you carefully`);
				} else if (canHear(slave)) {
					r.push(`listens to your movements`);
				} else {
					r.push(`waits with trepidation`);
				}
				r.push(`as you size up ${his} fully erect`);
				if (slave.dick === 1) {
					r.push(`tiny dick.`);
				} else if (slave.dick === 2) {
					r.push(`cute dick.`);
				} else if (slave.dick === 3) {
					r.push(`dick.`);
				} else if (slave.dick === 4) {
					r.push(`big dick.`);
				} else if (slave.dick === 5) {
					r.push(`impressive dick.`);
				} else if (slave.dick === 6) {
					r.push(`huge dick.`);
				} else if (slave.dick === 7) {
					r.push(`gigantic dick`);
				} else if (slave.dick === 8) {
					r.push(`titanic dick`);
				} else if (slave.dick === 9) {
					r.push(`absurd dick`);
				} else if (slave.dick === 10) {
					r.push(`inhuman dick`);
				} else {
					r.push(`hypertrophied dick`);
				}
				r.push(`You push ${him} back down as you straddle ${his}`);
				if (slave.belly >= 1500) {
					r.push(belly);
					if (slave.bellyPreg >= 1500) {
						r.push(`pregnant`);
					}
					r.push(`belly`);
				} else if (slave.boobs > 2000) {
					r.push(`huge tits`);
				} else {
					r.push(`chest`);
				}
				r.push(`planting your moistening pussy over the ${girl}'s face. You lean forward, teasing ${his} twitching cock, as you grind against ${his} face. As ${he} begins to moan with lust, you quickly bind the base of ${his} penis, denying ${his} release. You grind your cunt into ${his} face, telling ${him} that YOU are the one who'll be orgasming here, not ${him}. Only once you have taught ${him} ${his} place by soaking ${his} face in your cum do you release ${his} dick and lean back to avoid the coming blast. Just undoing the binding is enough to set ${him} over the edge, coating ${his}`);
				if (slave.bellyPreg >= 1500) {
					r.push(`pregnancy`);
				} else {
					r.push(`belly`);
				}
				r.push(`in ${his} virile sperm. You turn around and order the exhausted ${girl} to clean ${himself} up and go back to ${his} assignment; ${he} <span class="devotion inc">complies meekly,</span> understanding that having a potent penis is meaningless in ${his} position.`);
				if (slave.fetish === Fetish.NONE) { // TODO: was coral, should probably be fetish gain.
					r.push(`The next time ${he} walks past your office, you can't help notice the growing erection ${he} carries. <span class="fetish dec"> Your dominating display has left ${him} craving domination.</span>`);
					slave.fetish = "submissive";
					slave.fetishStrength = 10;
				}
				slave.devotion += 5;
			} else {
				r.push(`You tell ${him} that ${he} is just becoming a potent ${woman}, and as such, ${he} will need to learn that you are the dominant force in ${his} life.`);
				if (canTalk(slave)) {
					r.push(Spoken(slave, `"What does that mean, ${Master}?"`));
				} else {
					r.push(`${His} expression shifts to confusion.`);
				}
				r.push(`You quickly approach and catch ${him}, forcing ${his}`);
				if (slave.belly >= 1500) {
					if (slave.bellyPreg >= 1500) {
						r.push(`gravid`);
					} else {
						r.push(`distended`);
					}
				}
				r.push(`body face-down onto the couch${(slave.belly >= 100000) ? ` as best you can` : ``}. ${He}`);
				if (canSee(slave)) {
					r.push(`watches you carefully`);
				} else {
					r.push(`listens to your movements`);
				}
				r.push(`as you size up ${his} fully erect`);
				if (slave.dick === 1) {
					r.push(`tiny dick.`);
				} else if (slave.dick === 2) {
					r.push(`cute dick.`);
				} else if (slave.dick === 3) {
					r.push(`dick.`);
				} else if (slave.dick === 4) {
					r.push(`big dick.`);
				} else if (slave.dick === 5) {
					r.push(`impressive dick.`);
				} else if (slave.dick === 6) {
					r.push(`huge dick.`);
				} else if (slave.dick === 7) {
					r.push(`gigantic dick`);
				} else if (slave.dick === 8) {
					r.push(`titanic dick`);
				} else if (slave.dick === 9) {
					r.push(`absurd dick`);
				} else if (slave.dick === 10) {
					r.push(`inhuman dick`);
				} else {
					r.push(`hypertrophied dick`);
				}
				r.push(`You push ${his} face into the cushions as you mount ${his}`);
				if (slave.butt > 6) {
					r.push(`ridiculous`);
				} else if (slave.butt > 5) {
					r.push(`gigantic`);
				} else if (slave.butt > 4) {
					r.push(`enormous`);
				} else if (slave.butt > 3) {
					r.push(`huge`);
				} else if (slave.butt > 2) {
					r.push(`big`);
				} else if (slave.butt > 1) {
					r.push(`plump`);
				} else if (slave.butt > 0) {
					r.push(`small`);
				} else {
					r.push(`flat`);
				}
				r.push(`butt, sinking your cock deep into ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`asspussy. You lean forward, running your hands across ${his} nipples`);
				if (slave.belly >= 5000) {
					r.push(`and ${belly}`);
					if (slave.belly >= 3000) {
						r.push(`pregnant`);
					}
					r.push(`belly`);
				}
				r.push(`as you move to tease ${his} stiff prick. Between your dick in ${his} ass and your hand on ${his} cock, ${he} rapidly approaches ${his} peak. Quickly, you bind the base of ${his} penis, denying ${his} release and eliciting a long moan from the pent-up ${girl}. You begin thrusting hard, telling ${him} that YOU are the one who'll be orgasming here, not ${him}. Only once you have taught ${him} ${his} place by filling ${his} asspussy with your cum do you allow ${his} release. Just undoing the binding is enough to set ${him} over the edge, coating the cushions`);
				if (slave.belly >= 5000) {
					r.push(`and the bottom of ${his} ${belly}`);
					if (slave.belly >= 3000) {
						r.push(`pregnant`);
					}
					r.push(`belly`);
				}
				r.push(`in ${his} virile sperm. You dismount and order the exhausted ${girl} to clean ${himself} and the couch up before going back to ${his} assignment; ${he} <span class="devotion inc">complies meekly,</span> understanding that having a potent penis is meaningless in ${his} position.`);
				if (slave.fetish === Fetish.NONE) {
					r.push(`The next time ${he} walks past your office, you can't help notice the growing erection ${he} carries. <span class="fetish gain">Your dominating display has left ${him} craving domination.</span>`);
					slave.fetish = "submissive";
					slave.fetishStrength = 10;
				}
				slave.devotion += 5;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function howToUse() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You tell ${him} that ${he} is just becoming a potent ${woman}, and as such, ${he} will need to learn how to please ${his} partners.`);
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"What's that mean, ${Master}?"`));
			} else {
				r.push(`${His} expression shifts to confusion.`);
			}
			r.push(`You quickly approach and catch ${him}, forcing ${his}`);
			if (slave.belly >= 1500) {
				if (slave.bellyPreg >= 1500) {
					r.push(`gravid`);
				} else {
					r.push(`distended`);
				}
			}
			r.push(`body face-up onto the couch. ${He}`);
			if (canSee(slave)) {
				r.push(`watches you carefully`);
			} else if (canHear(slave)) {
				r.push(`listens to your movements`);
			} else {
				r.push(`waits with trepidation`);
			}
			r.push(`as you size up ${his} fully erect`);
			if (slave.dick === 1) {
				r.push(`tiny dick.`);
			} else if (slave.dick === 2) {
				r.push(`cute dick.`);
			} else if (slave.dick === 3) {
				r.push(`dick.`);
			} else if (slave.dick === 4) {
				r.push(`big dick.`);
			} else if (slave.dick === 5) {
				r.push(`impressive dick.`);
			} else if (slave.dick === 6) {
				r.push(`huge dick.`);
			} else if (slave.dick === 7) {
				r.push(`gigantic dick.`);
			} else if (slave.dick === 8) {
				r.push(`titanic dick.`);
			} else if (slave.dick === 9) {
				r.push(`absurd dick.`);
			} else if (slave.dick === 10) {
				r.push(`inhuman dick.`);
			} else {
				r.push(`hypertrophied dick.`);
			}
			r.push(`You push ${him} back down as you straddle ${his} cock, lining it up before lowering`);
			if (V.PC.belly >= 1500) {
				r.push(`your pregnant body until ${he} delightfully penetrates you.`);
			} else {
				r.push(`yourself onto ${his} needy prick.`);
			}
			r.push(`You slowly ride ${his} dick, instructing ${him} the proper way to thrust into you and how to adequately support your weight. Once ${he} gets the hand of things, you dismount and lie down on the couch, legs spread, beckoning ${him} into you. ${He} gingerly inserts ${his} cock`);
			if (slave.belly >= 100000) {
				r.push(`while you do your best to manage ${his} ${belly} stomach`);
			}
			r.push(`and begins thrusting, slowly at first, before getting the hang of things and speeding up${(V.PC.dick !== 0)? `, your own neglected dick bobbing along to ${his} thrusts` : ``}. As soon as you feel ${his} beginning to tense you`);
			if (V.PC.pregKnown === 1) {
				r.push(`tell ${him} it's safe to cum in you, you're already pregnant.`);
			} else {
				r.push(`order ${him} to pull out.`);
			}
			r.push(`The poor ${girl} is so caught up in ${his} lust, ${he} can't stop thrusting. Before you can rectify this, ${he} pushes you over the edge and gushes deep into you as you climax`);
			if (V.PC.dick !== 0) {
				r.push(`and spray your own cum`);
				if (V.PC.belly >= 5000 && slave.belly >= 5000) {
					r.push(`into the cramped space between your swollen bodies.`);
				} else if (slave.belly >= 100000) {
					r.push(`across your belly and the underside of ${hers}.`);
				} else {
					r.push(`across ${his} chest.`);
				}
			}
			r.push(`${He} gingerly pulls ${himself} from you, apologizes <span class="devotion inc">meekly</span> for losing control, and snuggles up next to you. Cumming in ${his} ${getWrittenTitle(slave)}'s pussy as ${his} first time builds <span class="trust inc">a special bond</span> with you.`);

			if (V.PC.preg === 0 && V.PC.pregWeek === 0) {
				r.push(`You aren't on contraceptives right now; ${his} first time may be more fruitful than ${he} realizes.`);
			}
			slave.devotion += 10;
			slave.trust += 20;
			seX(slave, "penetrative", V.PC, "vaginal");
			if (canImpreg(V.PC, slave)) {
				r.push(knockMeUp(V.PC, 60, 0, slave.ID));
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function noMatter() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`In one swift motion, one pull out a chastity cage and lock it onto ${him}. ${He} gasps as ${he} feels it hug close to ${his} struggling erection. You explain that ${he} has just become potent, and thus, will be restricted until you feel differently.`);
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"You don't want me to use my penis, ${Master}?"`));
			} else {
				r.push(`${He} rubs a hand across ${his} caged dick.`);
			}
			r.push(`You bring ${him} over to the couch, set ${him} on your lap, and teasingly call ${him} a buttslut. Every so often you graze a finger around ${his} chastity cage, torturing ${his} dick and balls, but you only make it the center of attention once the poor over-aroused slave`);
			if (canTalk(slave)) {
				r.push(
					`begs,`,
					Spoken(slave, `"I can't take it any more, ${Master}! Please fuck me!"`)
				);
			} else {
				r.push(`begins to use piteous gestures to beg you abjectly to penetrate ${him}.`);
			}
			r.push(`You snicker, but remind ${him} that ${he} has no say in ${his} release. You line up and insert your`);
			if (V.PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`cock`);
			}
			r.push(`up ${his} ass and begin slowly fucking ${him}, making sure to stimulate ${his} prostate. When ${he} finally orgasms`);
			if (V.PC.dick === 0) {
				r.push(`${his} unabashed enjoyment`);
			} else {
				r.push(`the strength of ${his} spasming sphincter`);
			}
			r.push(`sends you over as well. ${He}'s left in a confused haze; ${his} body tells ${him} to fuck, but you tell ${him} to get fucked. ${He} <span class="hotpink">sides with your decision</span> and vows to be the one taking dick for you.`);
			if (slave.fetish === Fetish.NONE) {
				r.push(`<span class="fetish dec">Overcoming ${his} urges to become a father via anal cause ${him} to become a buttslut.</span>`);
				slave.fetish = "buttslut";
				slave.fetishStrength = 10;
			}
			slave.devotion += 5;
			slave.chastityPenis = 1;
			r.push(VCheck.Anal(slave, 1));

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function geld() {
			slave.balls = 0;
			slave.trust -= 20;
			surgeryDamage(slave, 10);
			return `You bluntly tell ${him} ${he} is becoming potent, and that is something you can't allow to roam unchecked amongst your fertile slaves. You drag ${him} to the remote surgery and strap ${him} face-down with ${his} legs spread${(slave.belly >= 5000) ? `${his} ${belly} rounded belly forcing ${his} rear into the air` : ``}. ${He} doesn't understand what's happening, since the anesthetics totally deprive ${him} of any sensation. ${He}'s so drugged and drowsy with <span class="health dec">surgical recovery</span> that it takes a while for ${him} to figure out what's happened. When ${he} does, ${his} poor mind scarcely processes the <span class="trust dec">horror</span> of what's happened. ${He} numbly carries on, terrified.`;
		}
	}
};
