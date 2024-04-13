/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fAnus = function(slave) {
	const frag = new DocumentFragment();

	const {
		He, His,
		he, his, him, himself, girl
	} = getPronouns(slave);

	seX(slave, "anal", V.PC, "penetrative");

	const text = new SpacedTextAccumulator(frag);

	text.push(
		setup(),
		consummation(),
		belly(),
		anusTat(),
	);

	if (random(1, 100) > (100 + slave.devotion)) {
		text.push(slaveGainsFlaw());
	} else if (random(1, 100) > (110 - slave.devotion)) {
		text.push(slaveGainsQuirk());
	}

	if (V.postSexCleanUp) {
		text.push(cleanup());
	}

	text.toParagraph();

	return frag;

	function setup() {
		const text = [];

		text.push(`You call ${him} over so you can`);

		if (slave.anus > 3) {
			text.push(`fuck ${his} gaping anus.`);
		} else if (slave.anus === 3) {
			text.push(`fuck ${his} loose butthole.`);
		} else if (slave.anus === 2) {
			text.push(`use ${his} whorish asshole.`);
		} else if (slave.anus === 1) {
			text.push(`use ${his} tight butt.`);
		} else {
			text.push(`take ${his} anal virginity.`);
		}

		if (slave.fetish === "buttslut" && slave.devotion >= -20) {
			text.push(`${He}'s delighted at the prospect of ${his} favorite activity.`);
		} else if (slave.fetish === "buttslut") {
			text.push(`${He} perks up at the prospect of ${his} favorite activity, but the idea of spending it with you instantly sours ${his} mood.`);
		}

		if (slave.anusTat === "tribal patterns") {
			text.push(`${His} bleached asshole is an inviting sight, after all.`);
		} else if (slave.anusTat === "scenes") {
			text.push(`${His} tattooed asshole invites sodomy, after all.`);
		} else if (slave.anusTat === "degradation") {
			text.push(`The tattoos on ${his} asshole make it clear ${he}'s an anal slut, after all.`);
		}

		if (slave.heels === 1) {
			if (shoeHeelCategory(slave) > 0) {
				text.push(`As ${he} went past your desk, ${his} high heels and surgically altered legs enforced a gait that presented ${his} butt enticingly.`);
			} else {
				text.push(`As ${he} crawls along on`);
				if (hasAllLimbs(slave)) {
					text.push(`all fours,`);
				} else {
					text.push(`the ground,`);
				}
				text.push(`${his} anus is readily available.`);
			}
		}

		if (slave.piercing.anus.weight > 1) {
			text.push(`The ring of stud piercings around ${his} anus should massage you delightfully as you sodomize ${him}.`);
		} else if (slave.piercing.anus.weight === 1) {
			text.push(`${His} perineum piercing has a big ring in it, which you should be able to feel when you hilt yourself in ${his} ass.`);
		}

		if (slave.anusTat !== 0 && slave.anusTat === "bleached") {
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


		if (slave.anus === 0) {
			if (slave.devotion > 20) {
				text.push(`${He} accepts your orders without comment and presents ${his} virgin anus for defloration. You`);
				if (V.PC.dick === 0) {
					text.push(`don a strap-on and`);
				}
				text.push(`gently sodomize ${him}. You gently ease into ${his} butthole and slowly accelerate your thrusting into ${his} ass. Since ${he} is already well broken, this new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} tight little ass has been broken in.</span> ${He} looks forward to having ${his} asshole fucked by you again.`);
				slave.devotion += 4;
			} else if (slave.devotion >= -20) {
				text.push(`${He} is clearly unhappy at the idea of taking a dick up ${his} butt. ${He} obeys orders anyway, and lies there wincing and moaning as you`);
				if (V.PC.dick === 0) {
					text.push(`don a strap-on and`);
				}
				text.push(`fuck ${his} ass. You gently ease into ${his} butthole and slowly accelerate your thrusting into ${his} ass. However ${he} still squeals in pain as you continue pounding. <span class="virginity loss">${His} tight little ass has been broken in,</span> and ${he} <span class="trust dec">fears further anal pain.</span>`);
				slave.trust -= 5;
			} else {
				text.push(`${He} is appalled at the idea of taking it up the ass${(V.PC.dick === 0) ? ` and cries with fear as you don a strap-on` : ``}. ${He} does anyway though, sobbing into the cushions`);
				if (hasAnyArms(slave)) {
					text.push(`while you hold ${his} ${hasBothArms(slave) ? `arms` : `arm`} behind ${him}`);
				}
				text.push(text.pop() + `.`);
				text.push(`You force yourself into ${his} butthole and continue thrusting your member into ${his} ass. ${He} sobs and cries with disgust while you pump into ${his} rear. The painful anal rape <span class="devotion dec">decreases ${his} devotion to you.</span> <span class="virginity loss">${His} tight little ass has been broken in,</span> and ${he} is <span class="trust dec">terrified of further anal pain.</span>`);
				slave.devotion -= 10;
				slave.trust -= 10;
			}
			slave.anus++;
		} else if (slave.fetish === Fetish.MINDBROKEN) {
			if (hasAnyArms(slave)) {
				text.push(`You instruct ${him} to present ${his} anus. ${He} dully`);
				if (hasBothLegs(slave)) {
					text.push(`kneels`);
				} else {
					text.push(`bends over`);
				}
				text.push(`and spreads ${his} buttocks${V.PC.dick === 0 ? ` as you don a strap-on` : ``}. You spit on ${his} hole and ram`);
			} else {
				text.push(`Talking to a broken mind is pointless, so you simply set ${him} on the couch, spread ${his} buttocks with one hand, spit on ${his} hole, and ram`);
			}
			if (V.PC.dick === 0) {
				text.push(`it`);
			} else {
				text.push(`your cock`);
			}
			text.push(`up ${his}`);
			if (V.seeRace === 1) {
				text.push(slave.race);
			}
			text.push(`butt. ${His} butthole spasms as you assrape ${him},`);
			if (V.PC.dick === 0) {
				text.push(`an amusing sight.`);
			} else {
				text.push(`squeezing your dick nicely.`);
			}
			if (slave.dick !== 0 && canAchieveErection(slave)) {
				if (slave.chastityPenis === 1) {
					text.push(`Automatic responses give ${him} an erection, which ${his} chastity makes so uncomfortable that ${he} spasms. This cycle continues repeatedly, ${his} rectum squeezing unconsciously each time.`);
				} else if (slave.prostate !== 0) {
					text.push(`Despite ${his} mental deficiency, the prostate stimulation gives ${him} an erection anyway.`);
				} else {
					text.push(`Without a prostate, there's little stimulation to provoke an involuntary response, and ${his} cock stays limp.`);
				}
			} else if (slave.chastityPenis === 1) {
				text.push(`${His} dick chastity keeps ${his} pointless cock hidden away while you use ${his} anus like a pussy.`);
			} else if (slave.dick !== 0) {
				text.push(`${His} cock is totally flaccid throughout.`);
			}
		} else if (slave.devotion < -20) {
			if (!isAmputee(slave)) {
				text.push(`You instruct ${him} to present ${his} anus${V.PC.dick === 0 ? ` as you don a strap-on` : ``}. Horrified, ${he} tries to back away, but you catch ${him} and throw ${him} on the couch next to your desk. ${He} tries to`);
				if (hasAnyArms(slave)) {
					text.push(`shield ${his} asshole,`);
				} else {
					text.push(`back away,`);
				}
				text.push(`but you pin`);
				if (hasAnyArms(slave)) {
					text.push(`${his} ${hasBothArms(slave) ? "hands" : "hand"} behind ${him} with one hand,`);
				} else {
					text.push(`${him} down,`);
				}
				text.push(`spit on ${his} hole, and ram your`);
				if (V.PC.dick === 0) {
					text.push(`fake dick`);
				} else {
					text.push(`cock`);
				}
				text.push(`up ${his} butt with the other hand.`);
			} else {
				text.push(`You tell ${him} it's time for an assfuck. ${He}'s horrified, but as an amputee can do nothing about it. You spit on ${his} hole and ram your`);
				if (V.PC.dick === 0) {
					text.push(`fake dick`);
				} else {
					text.push(`cock`);
				}
				text.push(`up ${his}`);
				if (V.seeRace === 1) {
					text.push(slave.race);
				}
				text.push(`butt.`);
			}
			text.push(`${His} butthole spasms as you assrape ${him},`);
			if (V.PC.dick === 0) {
				text.push(`an amusing sight.`);
			} else {
				text.push(`squeezing your dick nicely.`);
			}
			if (slave.dick !== 0 && canAchieveErection(slave)) {
				if (slave.prostate === 0) {
					text.push(`${He} lacks a prostate, denying ${him} any real pleasure from this. ${His} dick stays flaccid as you rape ${him}.`);
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
		} else if (slave.devotion <= 20 && slave.vagina < 0) {
			if (!isAmputee(slave)) {
				text.push(`You instruct ${him} to present ${his} anus${V.PC.dick === 0 ? ` as you don a strap-on` : ``}. ${He} knows a sissy slave takes it up the butt, and lies on the couch next to your desk with ${his}`);
				if (!hasAnyLegs(slave)) {
					text.push(`hips`);
				} else {
					text.push(hasBothLegs(slave) ? `legs` : `leg`);
				}
				text.push(`in the air, spreading ${his} buttocks`);
				if (!hasAnyArms(slave)) {
					text.push(`as best ${he} can.`);
				} else {
					text.push(`with ${his} ${hasBothArms(slave) ? `hands` : `hand`}.`);
				}
			} else {
				text.push(`You tell ${him} it's time for an assfuck. ${He}'s hesitant, but as an amputee can do nothing about it.`);
			}
			text.push(`You take your time and fuck ${his}`);
			if (V.seeRace === 1) {
				text.push(slave.race);
			}
			text.push(`butthole for a good long while`);
			if (slave.chastityPenis !== 1) {
				if (slave.dick !== 0) {
					text.push(`so ${his} limp dick flops around`);
				} else if (slave.balls !== 0) {
					text.push(`as ${his} erect dick waves in the air`);
				}
			}
			text.push(text.pop() + `.`);
			text.push(`This gives you enough time to stroke ${him} until ${he} gets aroused despite ${his} discomfort with anal. ${He} doesn't orgasm, but ${he}'s getting accustomed to ${his} asshole as a sexual organ.`);
		} else if (slave.devotion < 10) {
			if (!isAmputee(slave)) {
				text.push(`You instruct ${him} to present ${his}`);
				if (V.seeRace === 1) {
					text.push(slave.race);
				}
				text.push(`anus${V.PC.dick === 0 ? ` as you don a strap-on` : ``}. ${He} hesitates but eventually lies on the couch next to your desk with ${his}`);
				if (!hasAnyLegs(slave)) {
					text.push(`hips`);
				} else {
					text.push(hasBothLegs(slave) ? `legs` : `leg`);
				}
				text.push(`in the air, spreading ${his} buttocks`);
				if (!hasAnyArms(slave)) {
					text.push(`as best ${he} can.`);
				} else {
					text.push(`with ${his} ${hasBothArms(slave) ? `hands` : `hand`}.`);
				}
			} else {
				text.push(`You tell ${him} it's time for an assfuck. ${He}'s hesitant, but as an amputee can do nothing about it.`);
			}
			text.push(`You take your time and fuck ${his} butthole for a good long while.`);
			if (slave.anus === 1) {
				text.push(`${His} ass is so tight that ${he} winces with anal pain`);
			} else if (slave.anus === 2) {
				text.push(`${His} experienced ass takes your`);
				if (V.PC.dick === 0) {
					text.push(`fake dick`);
				} else {
					text.push(`cock`);
				}
				text.push(`without trouble`);
			} else {
				text.push(`${His} asspussy is so loose you can pound it as hard as you like`);
			}
			if (slave.dick !== 0 && !canAchieveErection(slave)) {
				text.push(`as ${his} limp dick flops around.`);
			} else if (slave.dick !== 0 && canAchieveErection(slave)) {
				text.push(`as ${his} erect dick waves in the air.`);
			} else if (slave.vagina === -1) {
				text.push(`as it does its duty as ${his} sole fuckhole.`);
			} else {
				text.push(`as it substitutes for ${his} pussy.`);
			}
			text.push(`${He} gets aroused despite ${his} discomfort with anal, though ${he} doesn't orgasm.`);
		} else {
			if (hasAnyLegs(slave)) {
				text.push(`${He} kneels on the couch`);
			} else {
				text.push(`You lay ${him} on the couch`);
			}
			text.push(`with ${his}`);
			if (V.seeRace === 1) {
				text.push(slave.race);
			}
			text.push(`butt facing you, back strongly arched to angle ${his} rectum for more comfortable anal coupling.`);
			if (hasAnyArms(slave) && slave.prostate > 1 && slave.dick > 3) {
				if (V.PC.dick === 0) {
					text.push(`While you don a strap-on, ${he}`);
				} else {
					text.push(`${He}`);
				}
				text.push(`shoves ${his} slavering dick down and around towards ${his} ass and squeezes it, pushing a lot of ${his} precum out to lube ${his} own asshole.`);
			} else {
				if (V.PC.dick === 0) {
					text.push(`You don a strap-on and let some saliva fall onto its head`);
				} else {
					text.push(`You let some saliva fall onto your dickhead`);
				}
				text.push(`before penetrating ${him}.`);
			}
			text.push(`You take your time and fuck ${his} butthole for a good long while.`);
			if (slave.anus === 1) {
				text.push(`${His} ass is so tight that ${he} has to concentrate on relaxing for you.`);
			} else if (slave.anus === 2) {
				text.push(`${His} experienced ass feels great.`);
			} else {
				text.push(`${His} asspussy is so loose you can pound it as hard as you like.`);
			}
			text.push(`${He} rubs ${his}`);
			if (!hasAnyArms(slave)) {
				text.push(`body against you as much as ${he} can manage,`);
			} else if (canAchieveErection(slave) && !slave.chastityPenis) {
				text.push(`hard-on,`);
			} else if (slave.dick !== 0 && !slave.chastityPenis) {
				text.push(`soft dick,`);
			} else if (slave.chastityVagina || slave.clit === 0) {
				text.push(`nipples,`);
			} else if (slave.clit > 2) {
				text.push(`huge, stiff clit,`);
			} else {
				text.push(`clit,`);
			}
			text.push(`and brings ${himself} to orgasm before you.`);
			if (V.PC.dick === 0) {
				text.push(`The sight of ${him} gasping and shaking ${his} way through an anal orgasm brings you to climax yourself, and you shove yourself against the strap-on harness with enough force to give the slave's sensitized hole a final brutal stretching.`);
			} else {
				text.push(`${His} orgasmic rectal spasms squeeze your cock and you blow your load inside ${his} ass.`);
			}
		}


		return text.join(' ');
	}

	function belly() {
		if (slave.bellyPreg >= 1500) {
			return `The poor slave's pregnant belly causes ${him} some discomfort as you sodomize ${him}.`;
		} else if (slave.bellyImplant >= 1500) {
			return `The poor ${girl}'s implant filled belly causes ${him} some discomfort as you sodomize ${him}.`;
		} else if (slave.bellyFluid >= 1500) {
			return `The poor ${girl}'s sloshing belly causes ${him} some discomfort as you sodomize ${him}, though the lewd jiggling the pounding sends through it is quite a sight.`;
		}

		return ``;
	}

	function anusTat() {
		if (slave.anusTat === "scenes" && slave.anus === 1) {
			return `As you fucked ${his} butt, the decorative pattern around ${his} ass stretched open. When you pull out, ${his} momentary gape closes the pattern up quickly.`;
		} else if (slave.anusTat === "scenes") {
			return `As you fucked ${his} butt, the decorative pattern around ${his} ass stretched open. When you pull out, ${his} gape leaves the pattern distorted.`;
		} else if (slave.anusTat === "degradation") {
			return `As you fucked ${his} butt, the offensive language around ${his} ass stretched and distorted.`;
		}

		return ``;
	}

	function slaveGainsFlaw() {
		if (slave.fetish !== "buttslut" && slave.energy <= 95 && slave.sexualFlaw !== "hates anal") {
			slave.sexualFlaw = "hates anal";

			return `Being assraped has given ${him} a <span class="flaw gain">hatred of anal sex.</span>`;
		}

		return ``;
	}

	function slaveGainsQuirk() {
		if (slave.fetish === Fetish.NONE && slave.sexualFlaw !== "hates anal") {
			slave.fetish = "buttslut";
			slave.fetishKnown = 1;

			return `Orgasming to the sensation of your member in ${his} bottom <span class="fetish gain">has ${him} eager for anal.</span>`;
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
				text.push(`Your cum falls out of ${his} gaping hole.`);
			} else if (slave.anus > 2) {
				text.push(`Cum flows out of ${his} gaped butthole.`);
			} else if (slave.anus === 2) {
				text.push(`Cum drips out of ${his} newly gaped anus.`);
			} else if (slave.anus === 1) {
				text.push(`${His} still-tight ass keeps your load inside ${him}.`);
			}

			if (canImpreg(slave, V.PC)) {
				text.push(knockMeUp(slave, 5, 1, -1));
			}

			if (V.postSexCleanUp > 0) {
				if (canMove(slave)) {
					let anus;
					if (slave.anus < 2) {
						anus = "tight butt";
					} else if (slave.anus < 3) {
						anus = "used butthole";
					} else if (slave.anus < 4) {
						anus = "gaping butthole";
					} else {
						anus = "anal gape";
					}
					switch (slave.assignment) {
						case "work in the brothel":
							text.push(`${He} goes to wash ${his} ${anus} so ${his} next customer can have the illusion that he's the first to use it today.`);
							break;
						case "serve in the club":
							text.push(`${He} goes to wash and delicately perfume ${his} ${anus} so it can gratify the finest citizen.`);
							break;
						case "work in the dairy":
							text.push(`${He} goes off to carefully wash ${his} ${anus} to avoid besmirching the nice clean dairy.`);
							break;
						case "work as a farmhand":
							text.push(`${He} goes off to wash ${his} ${anus} to avoid tainting the food in ${V.farmyardName}.`);
							break;
						case "work as a servant":
							text.push(`${He} rushes to wash ${his} ${anus}, impatient to get back to ${his} many chores.`);
							break;
						case "work as a nanny":
							text.push(`${He} goes off to wash ${his} ${anus}, before hurrying to continue taking care of the children in ${V.nurseryName}.`);
							break;
						case "whore":
							text.push(`${He} uses an enema to clean ${his} ${anus} before returning to offering it for sale.`);
							break;
						case "serve the public":
							text.push(`${He} uses an enema to clean ${his} ${anus} before returning to offering it for free.`);
							break;
						case "be a servant":
							text.push(`${He} uses an enema to clean ${his} ${anus}, since ${his} chores didn't perform themselves while you used ${his} backdoor.`);
							break;
						case "rest":
							text.push(`${He} uses an enema to clean ${his} ${anus} before crawling back into bed, face-down.`);
							break;
						case "get milked":
							text.push(`${He} uses an enema to clean ${his} ${anus}`);
							if (slave.lactation > 0) {
								text.push(`before going to get ${his} uncomfortably milk-filled tits drained.`);
							} else {
								text.push(`and then rests until ${his} balls are ready to be drained again.`);
							}
							break;
						case "please you":
							text.push(`${He} uses an enema to clean ${his} ${anus} before returning to await your next use of ${his} backdoor, as though nothing had happened.`);
							break;
						case "be a subordinate slave":
							text.push(`${He} uses an enema to clean ${his} ${anus}, though it's only a matter of time before another slave decides to play with ${his} backdoor.`);
							break;
						case "be your Head Girl":
							text.push(`${He} uses an enema to clean ${his} ${anus}, worried that ${his} charges got up to trouble while ${he} enjoyed the buttsex.`);
							break;
						case "guard you":
							text.push(`${He} hurries off to wash ${his} ${anus} so you'll be unguarded for as little time as possible.`);
							break;
						case "be the Schoolteacher":
							text.push(`${He} uses an enema to clean ${his} ${anus} before ${he} returns to teaching ${his} classes, a little bow-legged.`);
							break;
						default:
							text.push(`${He} hurries off to wash ${his} ${anus} before going back to ${slave.assignment}.`);
					}
				}
			}
		}

		return text.join(' ');
	}
};
