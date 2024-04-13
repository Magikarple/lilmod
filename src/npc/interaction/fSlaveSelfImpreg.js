/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fSlaveSelfImpreg = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	const pfh = (slave.fetish === "pregnancy" && slave.fetishStrength > 50);
	const pfk = (pfh && slave.fetishKnown === 1) || slave.sexualFlaw === "breeder";
	let coop = true;
	let enjoy = true;
	const superfetation = (slave.geneticQuirks.superfetation === 2 && slave.pregKnown === 1) ? 1 : 0;

	if (slave.fetish !== Fetish.MINDBROKEN) {
		if (slave.devotion <= 20) {
			if (slave.devotion < -20) {
				r.push(`${slave.slaveName}`);
				r.push(`despises you, and tends to resent everything you do on principle,`);
			} else if (slave.devotion <= 20) {
				r.push(`${slave.slaveName}`);
				r.push(`dislikes you,`);
			}
			if (slave.sexualFlaw === "breeder" || (pfh && slave.fetishStrength > 90)) {
				r.push(`but the idea of simultaneously impregnating and being impregnated is <span class="hotpink">so tempting</span> that ${he}'s <span class="mediumaquamarine">grateful</span> to you despite ${himself}.`);
				slave.devotion += 2;
				slave.trust += 1;
			} else if (pfk) {
				r.push(`but ${his} obvious predilection for being pregnant significantly lessens the <span class="mediumorchid">indignity</span> of the situation.`);
				coop = false;
				slave.devotion -= 2;
			} else if (pfh) {
				r.push(`but, despite the <span class="mediumorchid">indignity</span> of the situation, ${his} resistance seems strangely muted. It's fairly obvious that something about the idea of being impregnated is <span class="hotpink">strangely appealing</span> to ${him}.`);
				coop = false;
				slave.devotion -= 4;
			} else {
				if (isAmputee(slave)) {
					r.push(`and this <span class="gold">uniquely degrading</span> violation of ${his} person only reinforces ${his} <span class="mediumorchid">hatred</span> towards you. The fact that ${he} is <span class="gold">utterly immobile</span> makes a terrifying situation <span class="mediumorchid">even worse.</span>`);
					slave.devotion -= 1;
					slave.trust -= 1;
				} else {
					r.push(`and this <span class="gold">uniquely degrading</span> violation of ${his} person only reinforces ${his} <span class="mediumorchid">hatred</span> towards you. ${He} resists so violently that you must <span class="health dec">physically coerce ${him}</span> into cooperating with the procedure.`);
				}
				coop = false;
				enjoy = false;
				slave.devotion -= 5;
				slave.trust -= 6;
			}
		} else if (pfk) {
			r.push(`${slave.slaveName}`);
			r.push(`<span class="hotpink">genuinely enjoys</span> impregnation and pregnancy, so ${he} is <span class="mediumaquamarine">grateful</span> that you're giving ${him} a chance to become so intimately acquainted with both aspects of ${his} fetish at the same time.`);
			slave.devotion += 4;
			slave.trust += 2;
			if (slave.devotion > 50 && V.arcologies[0].FSRepopulationFocus > 10) {
				r.push(`${He} also feels <span class="hotpink">proud</span> that ${he} can be a <span class="mediumaquamarine">self-sustaining</span> source of offspring to support your vision of the future.`);
				slave.devotion += 1;
				slave.trust += 1;
			}
		} else {
			if (pfh) {
				r.push(`Even though you aren't aware of any special fondness for pregnancy, ${slave.slaveName} seems <span class="hotpink">oddly eager</span> to cooperate with you. It quickly becomes obvious that ${he} is <span class="lightcoral">fascinated with pregnancy</span> and you've <span class="mediumaquamarine">helped ${him} discover this</span> about ${himself}.`);
				slave.devotion += 1;
				slave.trust += 1;
				slave.fetishKnown = 1;
			} else if (slave.sexualQuirk === "perverted") {
				r.push(`Despite having no particular interest in pregnancy, the <span class="hotpink">sheer perversity</span> of impregnating ${himself} is palpably arousing to ${slave.slaveName}.`);
				slave.trust += 1;
			} else if (slave.energy > 90) {
				r.push(`Despite having no particular interest in pregnancy, ${slave.slaveName}'s overwhelming sex drive causes ${him} to be aroused at the prospect of any sex, even if it happens to be with ${himself}.`);
			} else if (slave.devotion > 50) {
				r.push(`Despite having no particular interest in pregnancy, ${slave.slaveName} is eager to <span class="hotpink">submit to your vision</span> of ${him}.`);
				slave.trust += 1;
				if (slave.devotion > 50 && V.arcologies[0].FSRepopulationFocus > 10) {
					r.push(`${He} also feels <span class="hotpink">proud</span> that ${he} can be a <span class="mediumaquamarine">self-sustaining</span> source of offspring to support your vision of the future.`);
					slave.devotion += 1;
					slave.trust += 1;
				}
				enjoy = false;
			} else {
				r.push(`${slave.slaveName}`);
				r.push(`cooperates without any protest. ${He} may not particularly enjoy pregnancy or impregnation, but ${he}'s too well-broken to resist or speak against you.`);
				enjoy = false;
			}
		}
	}

	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${slave.slaveName} is dully cooperative as you ensure ${he} is positioned conveniently on a bench to give you access to both aspects of ${his} genitalia. A quick dose of vasodilators ensures that ${he} is ready to perform, even if ${he} is unable to fully comprehend what is about to happen. Once ${he} is fully erect, your personal assistant uses a mechanical toy to efficiently stimulate ${him} to climax, while you hold a small container in place to collect ${his} emission. Moments later, you've loaded ${slave.slaveName}'s seed into a syringe and dispensed the contents deep within ${his}`);
		if (slave.mpreg === 1) {
			r.push(`ass.`);
		} else {
			r.push(`vagina.`);
		}
	} else if (isAmputee(slave)) {
		if (coop && enjoy) {
			r.push(`Although ${slave.slaveName} is unable to do much to help, ${his} expression is visibly excited as you place ${him} on a bench, and produce a sample container and syringe.`);
		} else if (enjoy) {
			r.push(`A maelstrom of emotions fill ${slave.slaveName}'s face as you carry ${him} to a bench, and produce a sample cup and syringe.`);

			if (slave.dick > 6) {
				r.push(`You can't tell if ${he}'s relieved or disappointed when ${his} excessive size interferes, as usual, with ${his} erection, but an injection of vasodilators quickly makes the question moot.`);
			}
			r.push(`At your instruction, your personal assistant descends with a selection of toys to ensure quick ejaculation. Pleasure, lust, terror, and loathing play across ${slave.slaveName}'s face as ${his} arousal mounts and ${his} hips begin to buck. By the time ${he} begins to ejaculate, pleasure and lust have won out and ${he} throws ${his} head back in abandon as ${his} emission fills the cup in your hands.`);
			if (!canSee(slave)) {
				r.push(`Although ${he} cannot see what you are doing, ${his} expression is rapt, almost dreamlike,`);
			} else {
				r.push(`${He} watches with rapt fascination`);
			}
			r.push(`as you load the syringe with ${his} sperm, slide it into ${his}`);
			if (slave.mpreg === 1) {
				r.push(`ass,`);
			} else {
				r.push(`vagina,`);
			}
			r.push(`and shoot the contents home, deep against ${his} waiting cervix.`);
		} else if (coop) {
			r.push(`${slave.slaveName} is calm and docile as you place ${him} on a bench, and produce a sample container and syringe. With no other option, ${he} throws back ${his} head and enjoys the stimulation as your personal assistant, at your instruction, begins stimulating ${him} to orgasm. When ${he} ejaculates, you carefully catch every drop in the sample cup, load the syringe, and inject the contents directly against ${his} cervix.`);
		} else {
			r.push(`Although ${slave.slaveName} frantically squirms in a futile attempt to resist as you place ${him} on a bench, and produce a sample cup and syringe. Without limbs to aid ${his} escape, ${he} can only`);
			if (!canSee(slave)) {
				r.push(`blindly wait`);
			} else {
				r.push(`watch`);
			}
			r.push(`in helpless horror as the vasodilators you inject bring ${his} manhood to complete erectness and your personal assistant, at your instruction, begins stimulating ${him}. ${He} sobs in helpless despair as ${his} rigid shaft begins to throb, filling the cup with a terribly potent load of ${his} seed; ${he} frantically shakes ${his} head, face streaked with tears, as you dip the syringe into the cup, withdraw the plunger, insert it into ${his} exposed`);
			if (slave.mpreg === 1) {
				r.push(`ass,`);
			} else {
				r.push(`vagina,`);
			}
			r.push(`and shoot the contents directly against the opening to ${his} womb.`);
		}
	} else if (coop) {
		if (enjoy) {
			if (slave.dick > 6 && slave.balls <= 4) { // TODO: canPenetrate() needs to be here
				if (slave.dick > maxErectionSize(slave)) {
					r.push(`Although ${he} is aroused by the idea of impregnating ${himself}, ${slave.slaveName}'s cock is simply too large to easily become erect. A quick injection of vasodilators later, and ${he}'s ready to go. Because ${he}'s so eager, you simply stand back and let the magic happen.`);
				} else {
					r.push(`Merely thinking about what you're about to do has ${slave.slaveName} fully erect, with a small bead of precum running down ${his} shaft and blending with the`);
					if (slave.mpreg === 1) {
						r.push(`lubricant dripping from between ${his} cheeks.`);
					} else {
						r.push(`feminine wetness dripping from`);
						if (hasBothLegs(slave)) {
							r.push(`between ${his} legs.`);
						} else {
							r.push(`${his} crotch.`);
						}
					}
				}
				if (
					(slave.vagina === 0 && slave.mpreg !== 1) ||
					(slave.anus === 0 && slave.mpreg === 1)
				) {
					r.push(`As ways to lose one's virginity go, this is one hell of a way to do it. Without needing any instruction, ${slave.slaveName} grasps ${his} massive shaft`);
					if (hasBothArms(slave)) {
						r.push(`in both hands`);
					} else if (!hasAnyArms(slave)) {
						r.push(`as best ${he} can with the stumps of ${his} arms`);
					} else {
						r.push(`with ${his} hand`);
					}
					r.push(`and feeds it around so the head is`);
					if (slave.mpreg === 1) {
						r.push(`kissing ${his} anus.`);
					} else {
						r.push(`nestled between ${his} own labia.`);
					}
					r.push(`${He} shows only the tiniest hesitation before easing ${his} cock inside ${his} own body, <span class="lime">`);
					if (slave.mpreg === 1) {
						r.push(`through ${his} virgin backdoor,</span>`);
					} else {
						r.push(`past ${his} maidenhead,</span>`);
					}
					r.push(`until you can tell the head is nestled snugly against ${his} own cervix.`);
					if (slave.mpreg === 1) {
						slave.anus = 1;
					} else {
						slave.vagina = 1;
					}
				} else {
					r.push(`Without needing any instruction, ${slave.slaveName} grasps ${his} massive shaft`);
					if (hasBothArms(slave)) {
						r.push(`in both hands`);
					} else if (!hasAnyArms(slave)) {
						r.push(`as best ${he} can with the stumps of ${his} arms`);
					} else {
						r.push(`with ${his} hand`);
					}
					r.push(`and feeds it around so the head is`);
					if (slave.mpreg === 1) {
						r.push(`kissing ${his} anus.`);
					} else {
						r.push(`nestled between ${his} own labia.`);
					}
					r.push(`${He} works it up and down for a second, relishing the sensation, and then plunges ${his} cock into ${his} own body until you can tell the tip is wedged against ${his} own cervix.`);
				}
				r.push(`Without another partner to rut against, ${slave.slaveName} has to rely on`);
				if (hasBothArms(slave)) {
					r.push(`${his} own hands,`);
				} else {
					r.push(`the floor tiles${hasAnyArms(slave) ? ` and ${his} hand` : ``},`);
				}
				r.push(`bucking ${his} hips up against them to drive the impressively curved shaft into ${his} own body with increasing desperation until ${his} whole body shudders; ${his} cock throbs as ${his}`);
				if (slave.mpreg === 1) {
					r.push(`ass`);
				} else {
					r.push(`vagina`);
				}
				r.push(`eagerly drinks up ${his} own seed.`);
			} else {
				if (slave.trust < -20) {
					r.push(`Although ${he} is aroused by the idea of impregnating ${himself}, ${slave.slaveName} is too terrified to achieve an erection without assistance. It takes an injection of vasodilators to overcome ${his} nerves and restore ${his} manhood to proper functioning.`);
				} else if (slave.dick > maxErectionSize(slave)) {
					r.push(`Although ${he} is aroused by the idea of impregnating ${himself}, ${slave.slaveName}'s cock is simply too large to easily become erect. A quick injection of vasodilators later, and ${he}'s ready to go. Because ${he}'s so eager, you simply stand back and let the magic happen.`);
				} else {
					r.push(`Merely thinking about what you're about to do has ${slave.slaveName} fully erect, with a small bead of precum running down ${his} shaft and blending with the`);
					if (slave.mpreg === 1) {
						r.push(`lubricant dripping from between ${his} cheeks.`);
					} else {
						r.push(`feminine wetness dripping from`);
						if (hasBothLegs(slave)) {
							r.push(`between ${his} legs.`);
						} else {
							r.push(`${his} crotch.`);
						}
					}
				}
				// TODO: if slave has lover/wife, let them "do the honors"
				if (slave.balls > 4) {
					r.push(`Since ${his} balls are too large to permit any other options, you produce a special toy for ${slave.slaveName} — an onahole attached by a flexible tube to a dildo, with an embedded micro-pump to ensure any fluid in the onahole makes its way out of the dildo.`);
				} else {
					r.push(`Since ${he}'s not large enough to simply fuck ${himself}, you produce a special toy for ${slave.slaveName} — an onahole attached by a flexible tube to a dildo, with an embedded micro-pump to ensure any fluid in the onahole makes its way out of the dildo.`);
				}
				if ((slave.vagina === 0 && slave.mpreg !== 1) || (slave.anus === 0 && slave.mpreg === 1)) {
					r.push(`As ways to lose one's virginity go, this is one hell of a way to do it. ${slave.slaveName} trembles with excitement as ${he} brings the synthetic shaft`);
					if (hasBothLegs(slave)) {
						r.push(`between ${his} legs`);
					} else {
						r.push(`to ${his} groin`);
					}
					r.push(`and slowly works it <span class="lime">into ${his} virgin`);
					if (slave.mpreg === 1) {
						r.push(`anus.</span>`);
					} else {
						r.push(`pussy.</span>`);
					}
					if (slave.mpreg === 1) {
						slave.anus = 1;
					} else {
						slave.vagina = 1;
					}
				} else {
					r.push(`${slave.slaveName} eagerly rams the synthetic shaft as deeply into ${his}`);
					if (slave.mpreg === 1) {
						r.push(`ass`);
					} else {
						r.push(`pussy`);
					}
					r.push(`as it will go, obviously fantasizing that ${he}'s driving ${his} own dick into ${his}`);
					if (slave.mpreg === 1) {
						r.push(`winking anus.`);
					} else {
						r.push(`dripping pussy.`);
					}
				}
				r.push(`You help ${him} keep the dildo in place while ${he} works the onahole onto ${his} cock and begins stroking up and down. The stimulation of being filled and having ${his} dick stroked doesn't give ${him} much time to enjoy what ${he}'s doing before ${his} hips buck wildly and you see semen traveling from the pump, along the clear plastic tube, and into the base of the dildo embedded deeply in ${slave.slaveName}'s throbbing`);
				if (slave.mpreg === 1) {
					r.push(`asshole.`);
				} else {
					r.push(`vagina.`);
				}
			}
		} else {
			if (slave.devotion > 50) {
				if (slave.dick > maxErectionSize(slave)) {
					r.push(`No matter how hard ${he} tries, ${slave.slaveName}'s dick is simply too large for ${him} to achieve erection on ${his} own. You're about to inject ${him} with a vasodilator to remedy the problem, when ${he} tries to take the syringe from your hand. Normally such impudence would be a grave violation, but it's obvious that ${his} actions are only motivated by loyalty — ${he} wants to fix this problem ${himself} so ${he} can feel like ${he} isn't failing you because of a physical inadequacy that is, admittedly, not ${his} fault. You relinquish the syringe and watch as ${he} injects ${himself} with the drugs necessary to achieve a full erection.`);
				} else {
					r.push(`Despite a complete lack of sexual interest in the procedure, ${slave.slaveName} is able to quickly bring ${himself} to full erectness without any help.`);
				}
			} else {
				if (slave.dick > maxErectionSize(slave)) {
					r.push(`${slave.slaveName}`);
					r.push(`doesn't try all that hard to achieve erection, but it's obvious that the ${slave.dick > 6 ? "sheer" : "proportional"} size of ${his} cock would make it impossible anyway. ${He} silently cooperates as you inject ${him} with vasodilators to forcibly make ${him} erect.`);
				} else {
					r.push(`Despite a complete lack of sexual interest in the procedure, ${slave.slaveName} is able to eventually bring ${himself} to full erectness without any help.`);
				}
			}
			// TODO: if slave has lover/wife, let them "do the honors"
			r.push(`You produce a sample container and syringe; ${slave.slaveName} gets the idea and immediately begins jacking off. When ${he} ejaculates, ${he} carefully holds the cup`);
			if (hasBothArms(slave)) {
				r.push(`with one hand`);
			} else {
				r.push(`in front of ${him}`);
			}
			r.push(`to catch every drop of ${his} virile seed. A moment later ${he} dips the syringe into the container and withdraws the plunger.`);
			if (slave.devotion > 50) {
				r.push(`${He} blushes a bit, hands you the syringe, and lies back on the bench,`);
				if (hasBothLegs(slave)) {
					r.push(`spreading ${his} legs invitingly.`);
				} else {
					r.push(`presenting ${himself}.`);
				}
				r.push(`You insert the syringe carefully into ${his}`);
				if (slave.mpreg === 1) {
					r.push(`ass`);
				} else {
					r.push(`vagina`);
				}
				r.push(`as far as it will go, and spray ${his} sperm directly against ${his} waiting cervix.`);
			} else {
				r.push(`You take the syringe from ${him} and gesture for ${him} to lie back; once ${he}'s in position, you insert the syringe carefully into ${his}`);
				if (slave.mpreg === 1) {
					r.push(`ass`);
				} else {
					r.push(`vagina`);
				}
				r.push(`and spray ${his} sperm directly against ${his} waiting cervix.`);
			}
		}
	} else {
		if (enjoy) {
			r.push(`Although ${slave.slaveName} is anything but eager to cooperate, you don't have to drag ${him}. It's obvious that ${his} resistance is conflicting with the raw desire to fill ${himself} with ${his} own seed.`);
			if (slave.dick > maxErectionSize(slave) && slave.balls <= 4) {
				r.push(`While the size of ${his} cock makes it necessary for you to inject ${him} with vasodilators for ${him} to become properly erect, ${his} resistance is minimal.`);
				if (slave.vagina === 0) {
					r.push(`You instruct ${him} to fuck ${himself}; by this point, ${he}'s too far gone to object, even though obeying will rob ${him} of ${his} virginity. ${His}`);
					if (hasBothArms(slave)) {
						r.push(`hands shake`);
					} else {
						r.push(`lip quivers`);
					}
					r.push(`with roiling emotions as ${he} lines ${his} cock up with ${his} own opening and gingerly works it into ${his} <span class="lime">virgin`);
					if (slave.mpreg === 1) {
						r.push(`anus.</span>`);
					} else {
						r.push(`pussy.</span>`);
					}
					if (slave.mpreg === 1) {
						slave.anus = 1;
					} else {
						slave.vagina = 1;
					}
				} else {
					r.push(`You instruct ${him} to fuck ${himself}; by this point, ${he}'s too far gone to object. ${His}`);
					if (hasBothArms(slave)) {
						r.push(`hands shake`);
					} else {
						r.push(`lip quivers`);
					}
					r.push(`as ${he} lines ${his} cock up with ${his} own opening; ${he} lets out a sound halfway between a sob and a moan as ${he} penetrates ${himself}.`);
				}
				r.push(`Without another partner to thrust against, ${slave.slaveName} has to use ${his} remarkable shaft like a dildo, sliding it in and out of ${his} increasingly dripping sex. The potent mix of shame and arousal drives ${him} to orgasm quickly, and only a couple of minutes pass before you see ${his} shaft throbbing as ${he} fucks a baby into ${his} own belly.`);
			} else {
				if (slave.dick > maxErectionSize(slave)) {
					r.push(`${slave.slaveName}'s balls are too large to make any other options possible, but ${he} is still too large to achieve erection easily. You can't tell if ${he} is disappointed, or relieved, by this fact, but a quick injection of vasodilators makes the question moot either way.`);
				} else {
					r.push(`${His} cock is rigidly erect almost immediately, a fact which brings a confusing mixture of shame and arousal to ${his} face.`);
				}
				r.push(`You produce a sample container and syringe; ${slave.slaveName} gets the idea and reluctantly begins jacking off. When ${he} ejaculates, ${he} carefully holds the cup with one hand to catch every drop of ${his} seed. A moment later ${he} dips the syringe into the container and withdraws the plunger. ${He} hesitates, likely because the release has restored some of ${his} self control to ${him}, but before ${he} can do anything to escape, you press ${him} down with one hand and feed the syringe into ${his}`);
				if (slave.mpreg === 1) {
					r.push(`anus,`);
				} else {
					r.push(`pussy,`);
				}
				r.push(`depressing the plunger as soon as it's deeply inside ${him}.`);
				// possible TODO: allow Head Girl to do this part?
			}
		} else {
			r.push(`The repulsion ${slave.slaveName} feels toward both you and what you're about to force ${him} to do make ${his} cooperation entirely out of the question. You are forced to restrain ${him} with straps, kicking and sobbing; the sobbing only gets louder when ${he} feels the prick of a needle shooting vasodilators into ${his} crotch. Moments later, despite ${his} best efforts, ${he} is painfully erect and ready for you to proceed. Since ${he}'s guaranteed to make this as difficult as possible, you opt for the simplest solution: you take a condom and apply it to ${his} penis; once ${he}'s sheathed, you instruct your personal assistant, using toys, to forcibly stimulate ${him} until ${he} ejaculates and remove the condom. Loading the contents into a syringe and injecting them into ${his}`);
			if (slave.mpreg === 1) {
				r.push(`ass`);
			} else {
				r.push(`vagina`);
			}
			r.push(`is a simple matter, because of the straps, and moments later ${he} sobs in despair as ${his} sperm begins racing into ${his} waiting womb.`);
		}
	}

	const actCount = random(2, 8)+1;
	seX(slave, slave.mpreg ? "anal" : "vaginal", slave, "penetrative", actCount);

	r.push(`You repeat this ritual throughout the week, ensuring that ${slave.slaveName}`);

	if (superfetation === 1) {
		r.push(`has <span class="lime">added another child</span> to ${his} pregnancy.`);
	} else {
		r.push(`is <span class="lime">carrying ${his} own child.</span>`);
	}

	knockMeUp(slave, 100, 2, slave.ID);

	if (FutureSocieties.isActive('FSRestart')) {
		if ((slave.breedingMark !== 1 || V.propOutcome === 0) && V.eugenicsFullControl !== 1) {
			r.push(`Rumors spread about you having your slaves breed; the Societal Elite are <span class="red"> very displeased</span> by these rumors.`);
			V.failedElite += 5;
		}
	}

	if (FutureSocieties.isActive('FSRepopulationFocus') && (!FutureSocieties.isActive('FSGenderFundamentalist') || V.arcologies[0].FSRepopulationFocus >= V.arcologies[0].FSGenderFundamentalist)) {
		// seems logical that repop would trump anything else if it's equal-or-more advanced than fundamentalism.
		const delta = (FutureSocieties.isActive('FSGenderFundamentalist'))
			? V.arcologies[0].FSRepopulationFocus - V.arcologies[0].FSGenderFundamentalist
			: V.arcologies[0].FSRepopulationFocus;

		if (delta > 0) {
			r.push(`Society is <span class="green">pleased</span> by the addition of a new slave, no matter the means by which it was produced.`);
			repX(V.FSSingleSlaveRep*(V.arcologies[0].FSRepopulationFocus/V.FSLockinLevel), "futureSocieties", slave);
		} else {
			r.push(`The traditional elements of your society disapprove of this degenerate form of reproduction, but their complaints are countered by those who believe producing more slaves by any means necessary.`);
		}
	} else if (FutureSocieties.isActive('FSGenderFundamentalist')) {
		r.push(`Society <span class="red">is disgusted</span> by this degenerate form of reproduction.`);
		repX(forceNeg(V.FSSingleSlaveRep*(V.arcologies[0].FSGenderFundamentalist/V.FSLockinLevel)), "futureSocieties", slave);
		V.arcologies[0].FSGenderFundamentalist -= 0.05*V.FSSingleSlaveRep;
	}
	App.Events.addParagraph(node, r);
	return node;
};
