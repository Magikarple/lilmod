// cSpell:ignore frotting

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fButt = function(slave) {
	const frag = new DocumentFragment();

	const {
		He, His,
		he, his, him, girl
	} = getPronouns(slave);

	const text = new SpacedTextAccumulator(frag);

	text.push(
		intro(),
		setup(),
		consummation(),
	);

	if (random(1, 100) > (100 + slave.devotion)) {
		text.push(slaveGainsFlaw());
	} else if (random(1, 100) > (110 - slave.devotion)) {
		text.push(slaveGainsQuirk());
	}

	text.push(cleanup());

	text.toParagraph();

	return frag;

	function intro() {
		const text = [];

		text.push(`You call ${him} over so you can`);
		if (!canDoVaginal(slave)) {
			text.push(`use ${his} sole fuckhole.`);
		} else if (slave.vagina > 3) {
			text.push(`fuck ${his} gaping holes.`);
		} else if (slave.vagina > 2) {
			text.push(`fuck ${his} loose holes.`);
		} else if (slave.vagina === 2) {
			text.push(`use ${his} whorish holes.`);
		} else if (slave.vagina === 1) {
			text.push(`use ${his} tight holes.`);
		} else if (slave.vagina === 0 || slave.anus === 0) {
			text.push(`take ${his} virginity.`);
		}

		return text.join(' ');
	}

	function setup() {
		const text = [];

		if (slave.vagina !== -1) {
			if (slave.vaginaTat === "tribal patterns") {
				text.push(`The tattoos on ${his} abdomen certainly draw attention there.`);
			} else if (slave.vaginaTat === "scenes") {
				text.push(`The tattoos on ${his} abdomen nicely illustrate what you mean to do to ${him}.`);
			} else if (slave.vaginaTat === "degradation") {
				text.push(`The tattoos on ${his} abdomen are asking you to, after all.`);
			} else if (slave.vaginaTat === "lewd crest") {
				text.push(`The crest on ${his} abdomen screams debauchery and implores you to use ${him}.`);
			}
		}

		if (slave.piercing.vagina.weight > 1) {
			text.push(`${His} pierced lips and clit have ${him} nice and wet.`);

			if (slave.dick !== 0) {
				text.push(`Metal glints all up and down ${his} cock.`);
			}
		} else if (slave.piercing.vagina.weight === 1) {
			text.push(`${His} pierced clit has ${his} nice and moist.`);

			if (slave.dick !== 0) {
				text.push(`Metal glints at the head of ${his} cock.`);
			}
		}

		if (slave.piercing.anus.weight > 1) {
			text.push(`The ring of stud piercings around ${his} anus should massage you delightfully as you sodomize ${him}.`);
		} else if (slave.piercing.anus.weight === 1) {
			text.push(`${His} perineum piercing has a big ring in it, which you should be able to feel when you hilt yourself in ${his} ass.`);
		}

		if (slave.anusTat === "bleached") {
			text.push(`${His} anus is invitingly bleached,`);

			if (slave.vagina > -1) {
				text.push(`which is appropriate: rather than looking like ${he} has a hole for fucking and an ass, it looks like ${he} has two fuckholes.`);
			} else {
				text.push(`making ${his} sole fuckable hole look nice and natural.`);
			}
		}

		return text.join(' ');
	}

	function consummation() {
		const text = [];

		if (slave.vagina === 0 && slave.anus === 0 && canDoVaginal(slave)) {
			if (V.PC.dick === 0) {
				text.push(`You step into a strap-on, lubricate it, and break in ${his} holes in quick succession.`);
			} else {
				text.push(`Brooking no resistance, you take ${his} virginity and then break in ${his} virgin butt.`);
			}

			if (slave.devotion > 50) {
				text.push(`You ease yourself into ${his} pussy before gradually working your way into ${his} ass and alternate between the two holes while ${he} begins to moan. In just a few minutes, ${he} has lost ${his} virginity and been assfucked for the first time. ${He} <span class="devotion inc">submits utterly</span> to your spoilage of ${his} innocence and thanks you meekly for introducing ${him} to proper sexual slavery. <span class="virginity loss">${His} holes have been broken in.</span>`);

				slave.devotion += 10;
			} else if (slave.devotion > 20) {
				text.push(`You ease yourself into ${his} pussy before gradually working your way into ${his} ass and alternate between the two holes while ${he} begins to moan. In just a few minutes, ${he} has lost ${his} virginity and been assfucked for the first time. ${He}'s so bewildered by the pain and novelty that all ${he} feels is <span class="trust dec">a little fear</span> of further use. <span class="virginity loss">${His} holes have been broken in.</span>`);

				slave.trust -= 5;
			} else {
				text.push(`You force yourself into ${his} pussy before gradually working your way into ${his} ass. ${He} sobs and cries with disgust while you alternate between the two holes. In just a few minutes, ${he} has lost ${his} virginity to rape and ${his} anal virginity to a rough buttfuck. To say ${he} <span class="devotion dec">resents you</span> and <span class="trust dec">fears further abuse</span> would be an understatement. <span class="virginity loss">${His} holes have been broken in.</span>`);

				slave.devotion -= 10;
				slave.trust -= 10;
			}

			text.push(VCheck.Both(slave, 1));
		} else if (slave.vagina === 0 && canDoVaginal(slave)) {
			if (slave.devotion > 20) {
				text.push(`${He} accepts your orders without comment and presents ${his} virgin pussy for defloration${(V.PC.dick === 0) ? `, watching with some small trepidation as you don a strap-on` : ``}. You gently ease into ${his} pussy before gradually increasing the intensity of your thrusts into ${him}. Before long, ${he}'s moaning loudly as you pound away. Since ${he} is already well broken, this new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} pussy has been broken in.</span>`);

				slave.devotion += 10;
			} else if (slave.devotion >= -20) {
				text.push(`${He} is clearly unhappy at losing ${his} pearl of great price to you; this probably isn't what ${he} imagined ${his} first real sex would be like.`);

				if (V.PC.dick === 0) {
					text.push(`${His} lower lip quivers with trepidation as ${he} watches you don a strap-on and maneuver to fuck ${his} virgin hole.`);
				}

				text.push(`You gently ease into ${his} pussy before gradually increasing the intensity of your thrusts into ${him}. Before long, ${he}'s moaning as you pound away. Nevertheless, this new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} pussy has been broken in,</span> and ${he} is <span class="trust dec">fearful</span> that sex will continue to be painful.`);

				slave.devotion += 5;
				slave.trust -= 5;
			} else {
				text.push(`As you anticipated, ${he} refuses to give you ${his} virginity. And as you expected, ${he} is unable to resist you. ${He} cries as`);
				if (V.PC.dick === 0) {
					text.push(`your strap-on`);
				} else {
					text.push(`your cock`);
				}

				text.push(`opens ${his} fresh, tight hole. You force your way into ${his} pussy and continue thrusting into ${him}. ${He} sobs and cries with horror as you pound away. The rape <span class="devotion dec">decreases ${his} devotion to you.</span> <span class="virginity loss">${His} pussy has been broken in,</span> and ${he} <span class="trust dec">fears further abuse.</span>`);

				slave.devotion -= 10;
				slave.trust -= 15;
			}
			text.push(VCheck.Vaginal(slave, 1));
		} else if (slave.anus === 0) {
			if (slave.devotion > 20) {
				text.push(`${He} accepts your orders without comment and presents ${his} virgin anus for defloration. You`);

				if (V.PC.dick === 0) {
					text.push(`don a strap-on and`);
				}

				text.push(`gently sodomize ${him}. You gently ease yourself into ${his} butthole and gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. Since ${he} is already well broken, this new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} tight little ass has been broken in.</span>`);

				slave.devotion += 4;
			} else if (slave.devotion >= -20) {
				text.push(`${He} is clearly unhappy at the idea of taking a dick up ${his} butt. ${He} obeys orders anyway, and lies there wincing and moaning as you`);

				if (V.PC.dick === 0) {
					text.push(`don a strap-on and`);
				}

				text.push(`fuck ${his} ass. <span class="virginity loss">${His} tight little ass has been broken in,</span> and ${he} <span class="trust dec">fears further anal pain.</span>`);

				slave.trust -= 5;
			} else {
				text.push(`${He} is appalled at the idea of taking it up the ass${(V.PC.dick === 0) ? ` and cries with fear as you don a strap-on` : ``}. ${He} does anyway though, sobbing into the cushions`);

				if (hasAnyArms(slave)) {
					text.push(`while you hold ${his} ${hasBothArms(slave) ? `arms` : `arm`} behind ${him}`);
				}

				text.push(text.pop() + `.`);
				text.push(`You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. The painful anal rape <span class="devotion dec">decreases ${his} devotion to you.</span> <span class="virginity loss">${His} tight little ass has been broken in,</span> and ${he} is <span class="trust dec">terrified of further anal pain.</span>`);

				slave.devotion -= 5;
				slave.trust -= 5;
			}

			text.push(VCheck.Anal(slave, 1));
		} else if (slave.devotion < -20) {
			if (V.PC.dick === 0) {
				text.push(`You don a cruelly large strap-on, and you do it so ${he} can`);

				if (canSee(slave)) {
					text.push(`see`);
				} else if (canHear(slave)) {
					text.push(`hear`);
				} else {
					text.push(`notice`);
				}

				text.push(`it.`);
			}

			text.push(`${He} tries to refuse you, so you throw ${him} across the back of the couch next to your desk with ${his}`);

			if (V.seeRace === 1) {
				text.push(slave.race);
			}

			text.push(`ass in the air. You finger ${his} anus`);

			if (slave.vagina !== -1) {
				text.push(`while fucking ${his} pussy`);
			} else if (hasBothLegs(slave)) {
				text.push(`while frotting ${his} thighs`);
			}

			text.push(`for a bit and then switch to ${his} now-ready anus. ${He} sobs as you penetrate ${his} rectum.`);

			if (slave.dick !== 0 && canAchieveErection(slave)) {
				if (slave.prostate === 0) {
					text.push(`${He} lacks a prostate, denying ${him} any real pleasure. ${His} dick stays flaccid as you rape ${him}.`);
				} else if (slave.chastityPenis === 1) {
					text.push(`Despite ${his} unwillingness to be sodomized, the prostate stimulation starts to give ${him} an erection, which ${his} dick chastity makes horribly uncomfortable. ${He} bucks with the pain, ${his} asshole spasming delightfully.`);
				} else {
					text.push(`Despite ${his} unwillingness to be sodomized, the prostate stimulation gives ${him} an erection. ${He}'s mortified that ${he} would get hard while being anally raped.`);
				}
			} else if (slave.chastityPenis === 1) {
				text.push(`${His} dick chastity keeps ${his} bitch cock hidden away while you use ${his} anus like a pussy.`);
			} else if (slave.dick !== 0) {
				text.push(`${His} flaccid dick is ground into the back of the couch as you rape ${him}.`);
			}

			text.push(VCheck.Both(slave, 1));
		} else if (slave.devotion <= 50) {
			text.push(`You throw ${him} across the back of the couch next to your desk with ${his} ass in the air${(V.PC.dick === 0) ? `, and don a strap-on` : ``}. You finger ${his}`);

			if (V.seeRace === 1) {
				text.push(slave.race);
			}

			text.push(`ass while`);

			if (slave.vagina !== -1) {
				text.push(`fucking ${his} pussy`);
			} else {
				text.push(`frotting ${his} thighs`);
			}

			text.push(`for a bit and then switch to ${his} now-ready anus.`);

			if (slave.anus === 1) {
				text.push(`${His} ass is so tight that you have to work yourself in.`);
			} else if (slave.anus === 2) {
				text.push(`Your`);
				if (V.PC.dick === 0) {
					text.push(`fake dick`);
				} else {
					text.push(`cock`);
				}
				text.push(`slides easily up ${his} ass.`);
			} else {
				text.push(`You slide into ${his} already-gaping asspussy with ease.`);
			}

			text.push(`${He} gasps as you penetrate ${his} rectum, but you timed the switch so that ${he} was on the verge of orgasm, and ${he} comes immediately.`);

			if (slave.dick !== 0 && canAchieveErection(slave)) {
				if (slave.chastityPenis) {
					text.push(`${He} managed to stay soft within ${his} dick chastity, but ${he} dribbled a lot of precum onto the couch. You make ${his} lick it up, and ${he} obeys, shuddering with unsatisfied arousal.`);
				} else {
					text.push(`${His} cock spatters the couch with cum, and you make ${his} lick it up.`);
				}
			} else if (slave.clit > 2) {
				text.push(`${His} clit is so large that it bobs slightly with each thrust.`);
			}

			text.push(VCheck.Both(slave, 1));
		} else {
			if (hasAnyLegs(slave)) {
				text.push(`${He} kneels on the floor`);
			} else {
				text.push(`You lay ${him} on the floor`);
			}

			text.push(`so you can take ${him} at will${(V.PC.dick === 0) ? `, and don a strap-on` : ``}. You finger ${his}`);

			if (V.seeRace === 1) {
				text.push(slave.race);
			}

			text.push(`ass while`);

			if (canDoVaginal(slave)) {
				text.push(`fucking ${his} pussy`);
			} else {
				text.push(`frotting ${his}`);
			}

			text.push(`for a bit and then switch to ${his} now-ready anus.`);

			if (slave.anus === 1) {
				text.push(`${His} ass is so tight that you have to work yourself in.`);
			} else if (slave.anus === 2) {
				text.push(`Your cock slides easily up ${his} ass.`);
			} else {
				text.push(`You slide into ${his} already-gaping asspussy with ease.`);
			}

			text.push(`You fuck ${him} there for a while before repeatedly pulling out and stuffing yourself back in. ${He} moans each time you fill`);

			if (canDoVaginal(slave)) {
				text.push(`a`);
			} else {
				text.push(his);
			}

			text.push(`waiting hole.`);

			if (slave.dick !== 0 && canAchieveErection(slave)) {
				if (slave.chastityPenis === 1) {
					text.push(`Whenever ${he} starts to get hard, ${his} dick chastity gives ${him} an awful twinge of pain. You do your best to be up ${his} butt when this happens so you can experience the resulting spasm.`);
				} else {
					text.push(`Every time you penetrate, ${his} erect dick jerks up and slaps ${his} stomach.`);
				}
			} else if (slave.dick !== 0) {
				if (slave.chastityPenis === 1) {
					text.push(`${His} dick chastity keeps ${his} girly bitchclit hidden, just like it belongs.`);
				} else {
					text.push(`Every time you penetrate, ${his} limp dick flops around lamely.`);
				}
			} else if (slave.clit > 2) {
				text.push(`${His} clit is so large that it bobs slightly with each thrust.`);
			}

			text.push(VCheck.Both(slave, 1));
		}

		if (slave.bellyPreg >= 1500) {
			text.push(`The poor ${girl}'s pregnant belly makes taking a rough fuck in both ${his} holes uncomfortable for ${him}.`);
		} else if (slave.bellyImplant >= 1500) {
			text.push(`The poor ${girl}'s implant-filled belly makes taking a rough fuck in both ${his} holes uncomfortable for ${him}.`);
		} else if (slave.bellyFluid >= 1500) {
			text.push(`The poor ${girl}'s sloshing belly makes taking a rough fuck in both ${his} holes uncomfortable for ${him}, though the lewd jiggling the pounding sends through it is quite a sight.`);
		}

		if (slave.anusTat === "scenes" && slave.anus === 1) {
			text.push(`As you fucked ${his} butt, the decorative pattern around ${his} ass stretched open. When you pull out, ${his} momentary gape closes the pattern up quickly.`);
		} else if (slave.anusTat === "scenes") {
			text.push(`As you fucked ${his} butt, the decorative pattern around ${his} ass stretched open. When you pull out, ${his} gape leaves the pattern distorted.`);
		} else if (slave.anusTat === "degradation") {
			text.push(`As you fucked ${his} butt, the offensive language around ${his} ass stretched and distorted.`);
		}

		return text.join(' ');
	}

	function slaveGainsFlaw() {
		if (slave.fetish !== "buttslut" && slave.energy <= 95 && slave.sexualFlaw !== "hates penetration") {
			slave.sexualFlaw = "hates penetration";

			return `Being brutally used has given ${him} a <span class="flaw gain">hatred of penetration.</span>`;
		}

		return ``;
	}

	function slaveGainsQuirk() {
		if (slave.fetish === Fetish.NONE && slave.sexualFlaw !== "hates penetration") {
			slave.fetish = "buttslut";
			slave.fetishKnown = 1;

			return `Orgasming to your use of ${his} fuckhole <span class="fetish gain">has ${him} eager for more buttsex.</span>`;
		}

		return ``;
	}

	function cleanup() {
		const text = [];

		if (V.PC.dick !== 0) {
			if (slave.cervixImplant === 2 || slave.cervixImplant === 3) {
				slave.bellyImplant += random(10, 20);
			}

			if (slave.anus > 3) {
				text.push(`${His} gaping hole drips your cum right out again.`);
			} else if (slave.anus > 2) {
				text.push(`Cum drips out of ${his} loose hole.`);
			} else if (slave.anus === 2) {
				text.push(`Cum drips out of ${his} loosened anus.`);
			} else if (slave.anus === 1) {
				text.push(`${His} still-tight ass keeps your load inside ${him}.`);
			}

			if (canMove(slave) && V.postSexCleanUp > 0) {
				switch (slave.assignment) {
					case "whore":
						text.push(`${He} heads to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes before returning to selling them publicly.`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole before returning to selling it publicly.`);
						} else {
							text.push(`face before returning to selling ${his} mouth publicly.`);
						}
						break;
					case "serve the public":
						text.push(`${He} heads to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes before returning to offering it for free.`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole before returning to offering it for free.`);
						} else {
							text.push(`face before returning to offering ${his} mouth for free.`);
						}
						break;
					case "rest":
						text.push(`${He} stumbles to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole`);
						} else {
							text.push(`face`);
						}

						text.push(`before crawling back into bed.`);
						break;
					case "be the Schoolteacher":
						text.push(`${He} heads to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole`);
						} else {
							text.push(`face`);
						}

						text.push(`before ${he} returns to teaching ${his} classes.`);
						break;
					case "get milked":
						text.push(`${He} hurries to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole`);
						} else {
							text.push(`face`);
						}

						if (slave.lactation > 0) {
							text.push(`before going to get ${his} uncomfortably milk-filled tits drained.`);
						} else {
							text.push(`and then rests until ${his} balls are ready to be drained again.`);
						}
						break;
					case "please you":
						text.push(`${He} hurries to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole`);
						} else {
							text.push(`face`);
						}

						text.push(`before returning to await your next use of ${his} body, as though nothing had happened.`);
						break;
					case "be a subordinate slave":
						text.push(`${He} moves to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes,`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole,`);
						} else {
							text.push(`face,`);
						}

						text.push(`though it's only a matter of time before another slave decides to play with ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`pussy or asshole.`);
						} else if (canDoVaginal(slave)) {
							text.push(`pussy.`);
						} else if (canDoAnal(slave)) {
							text.push(`asshole.`);
						} else {
							text.push(`face.`);
						}

						break;
					case "be a servant":
						text.push(`${He} hurries to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes,`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole,`);
						} else {
							text.push(`face,`);
						}

						text.push(`since ${his} chores didn't perform themselves while you used ${him}.`);
						break;
					case "be your Head Girl":
						text.push(`${He} hurries to the bathroom to clean ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes,`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole,`);
						} else {
							text.push(`face,`);
						}

						text.push(`worried that ${his} charges got up to trouble while you had your cock in ${him}.`);
						break;
					case "guard you":
						text.push(`${He} hurries off to wash ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole`);
						} else {
							text.push(`face`);
						}

						text.push(`so you'll be unguarded for as little time as possible.`);
						break;
					case "work in the brothel":
						text.push(`${He} goes to wash ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole`);
						} else {
							text.push(`face`);
						}

						text.push(`so ${his} next customer can have the illusion that he's the first to use it today.`);
						break;
					case "serve in the club":
						text.push(`${He} goes to wash and delicately perfume ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes so they`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole so it`);
						} else {
							text.push(`face so it`);
						}

						text.push(`can gratify the finest citizen.`);
						break;
					case "work in the dairy":
						text.push(`${He} goes off to carefully wash ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole`);
						} else {
							text.push(`face`);
						}

						text.push(`to avoid besmirching the nice clean dairy.`);
						break;
					case "work as a farmhand":
						text.push(`${He} goes off to wash ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole`);
						} else {
							text.push(`face`);
						}

						text.push(`to avoid tainting the food in ${V.farmyardName}.`);
						break;
					case "work as a servant":
						text.push(`${He} rushes to wash ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes,`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole,`);
						} else {
							text.push(`face,`);
						}

						text.push(`impatient to get back to ${his} undiminished chores.`);
						break;
					case "work as a nanny":
						text.push(`${He} rushes to wash ${his}`);

						if (canDoVaginal(slave) && canDoAnal(slave)) {
							text.push(`holes,`);
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							text.push(`fuckhole,`);
						} else {
							text.push(`face,`);
						}

						text.push(`before hurrying to continue taking care of the children in ${V.nurseryName}.`);
						break;
				}
			}
		}

		return text.join(' ');
	}
};
