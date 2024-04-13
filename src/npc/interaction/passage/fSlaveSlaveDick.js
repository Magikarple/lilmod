App.Interact.fSlaveSlaveDickChoosePartner = class extends App.Interact.BaseChoosePartnerRenderer {
	constructor(slave) {
		super(slave);
		this.intro = `Select the slave that will ride ${this.slave.slaveName}.`;
		this.execute = App.Interact.fSlaveSlaveDick;
	}

	eligible(candidate) {
		/* amp-amp scene is not written */
		return isSlaveAvailable(candidate) && canDoVaginal(candidate) && canStand(candidate);
	}

	renderDetail(candidate, container) {
		if (canImpreg(candidate, this.slave)) {
			App.UI.DOM.appendNewElement("span", container, ` Fertile`, ["green"]);
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.Entity.SlaveState} rapist
 * @returns {DocumentFragment}
 */
App.Interact.fSlaveSlaveDick = function(slave, rapist) {
	const el = new DocumentFragment();
	let r = [];
	const {
		He, His,
		he, his, him, himself, hers
	} = getPronouns(slave);

	const {
		He2,
		he2, his2, him2, himself2, hers2
	} = getPronouns(rapist).appendSuffix("2");
	let bottomDrugged;
	let incestMood;

	let dickSize;
	if (slave.dick) {
		if (slave.dick === 1) {
			dickSize = "tiny";
		} else if (slave.dick === 2) {
			dickSize = "tiny";
		} else if (slave.dick === 3) {
			dickSize = "average";
		} else if (slave.dick === 4) {
			dickSize = "big";
		} else if (slave.dick === 5) {
			dickSize = "huge";
		} else if (slave.dick === 6) {
			dickSize = "gigantic";
		} else if (slave.dick === 7) {
			dickSize = "titanic";
		} else if (slave.dick === 8) {
			dickSize = "absurd";
		} else if (slave.dick >= 9) {
			dickSize = "inhuman";
		}
	}

	const isIncest = areRelated(slave, rapist);

	r.push(`You take a look at the bound cock toy.`);

	if (slave.fetish === Fetish.MINDBROKEN && slave.career !== "a dairy cow" && slave.career !== "a breeding bull") {
		r.push(`Since ${slave.slaveName} is mentally broken, the restraints don't do anything but set the scene.`);
	} else if (slave.devotion > 50) {
		r.push(`Since ${slave.slaveName} is devoted, ${his} restraints are more for the show than for practical purposes.`);
	} else if (slave.devotion > 20) {
		r.push(`${slave.slaveName} is obedient but not devoted, so ${his} restraints are firm for ${his} own good.`);
	} else {
		r.push(`${slave.slaveName} is unlikely to comply willingly, and is tied down tight, unable to budge more than`);
		if (V.showInches === 2) {
			r.push(`an inch.`);
		} else {
			r.push(`a centimeter.`);
		}
	}

	if (isAmputee(slave)) {
		r.push(`${His} limbless torso lies on the bed, ready for ${rapist.slaveName}.`);
	} else if (tooBigBelly(slave)) {
		r.push(`${His} huge belly will limit the number of possible positions for ${rapist.slaveName} to take ${him} in.`);
	} else if (tooBigBreasts(slave)) {
		r.push(`The weight of ${his} tits pins ${him} helplessly in place.`);
	} else if (tooBigButt(slave)) {
		r.push(`${His} huge ass pushes ${his} pelvis further up, making it look as if ${he}'s trying to fuck the air.`);
	} else if (tooBigDick(slave)) {
		r.push(`${His} huge cock is clearly going to be a challenge.`);
	} else if (tooBigBalls(slave)) {
		r.push(`${His} huge balls might get a bit in the way in this position.`);
	} else if (tooFatSlave(slave)) {
		r.push(`${His} huge gut threatens to envelope ${his}`);
		if (slave.clit >= 4) {
			r.push(`massive clit.`);
		} else {
			r.push(`${dickSize} cock.`);
		}
	}

	if (slave.fetish === Fetish.MINDBROKEN && slave.career !== "a dairy cow" && slave.career !== "a breeding bull") {
		if (slave.energy > 40) {
			r.push(`${slave.slaveName}`);
			r.push(`is broken mentally, but has a serviceable libido. After a bit of stimulation ${he}'s good to go without any further reaction on ${his} own.`);
		} else {
			r.push(`${slave.slaveName}`);
			r.push(`is broken mentally, and ${his} low libido prevents ${his}`);
			if (slave.clit >= 4) {
				r.push(`massive clit`);
			} else {
				r.push(`${dickSize} penis`);
			}
			r.push(`from becoming erect. A massive dose of vasodilators fixes this, and you think you see ${his} face twitch with the pain, but there is no further reaction.`);
		}
	} else if (slave.fetish === Fetish.MINDBROKEN && slave.career === "a dairy cow") {
		if (slave.energy > 40) {
			r.push(`${slave.slaveName}, as a good cow with a good libido, takes only a little fondling before ${his}`);
			if (slave.clit >= 4) {
				r.push(`massive clit`);
			} else {
				r.push(`${dickSize} penis`);
			}
			r.push(`becomes erect. When you let go, ${he} gives a needy moo with a sad expression to ask you to keep going.`);
		} else {
			r.push(`${slave.slaveName} may be a cow, but ${his} low libido keeps ${his} mostly soft despite plenty of fondling. You inject ${him} with vasodilators so ${his}`);
			if (slave.clit >= 4) {
				r.push(`massive clit`);
			} else {
				r.push(`${dickSize} cock`);
			}
			r.push(`becomes erect, and ${he} moos in discomfort and struggles against ${his} restraints.`);
			bottomDrugged = 1;
		}
	} else if (slave.fetish === Fetish.MINDBROKEN && slave.career === "a breeding bull") {
		r.push(`${slave.slaveName}, as a good bull, was already erect while being tied down. It seems ${he} knows what's going to happen to ${him} soon. Maybe someone at the Cattle Ranch has been sampling their bulls?`);
	} else {
		if (slave.devotion >= -20) {
			if (slave.energy > 40) {
				if (slave.fetishKnown === 1) {
					if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`${slave.slaveName}`);
						r.push(`is a known sub, and seconds after ${he} is ordered to lie down to be restrained ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} cock`);
						}
						r.push(`is erect. ${He} knows ${he}'s going to get used, and can't hide ${his} excitement.`);
					} else if (slave.fetish === "dom") {
						r.push(`${slave.slaveName} is a known dom, and needs some stimulation before ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} cock`);
						}
						r.push(`becomes hard. Despite knowing ${he}'s going to be used, ${he} can't hide ${his} curiosity to experience what the other side feels.`);
					} else if (slave.fetish === "masochist") {
						r.push(`${slave.slaveName} almost gets off on being tied down tight, sporting a`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} erection`);
						}
						r.push(`once you have finished. ${His} nipples are firm as well, and ${he} struggles against ${his} restraints to feel them dig into ${him} tighter.`);
					} else if (slave.fetish === "sadist") {
						r.push(`${slave.slaveName} is a sadist, and finds ${himself} in the exact opposite position ${he}'d want to be in to get off. It's obvious ${he}'s not going to get aroused soon, so you inject ${him} with vasodilators so ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} cock`);
						}
						r.push(`becomes erect and hope ${he} at least learns something from being on the receiving end for once.`);
						bottomDrugged = 1;
					} else if (slave.fetish === "humiliation") {
						r.push(`${slave.slaveName} gets off on humiliation, and after being ordered to lay naked on a bed to be tied down, becomes flushed with arousal with ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} cock`);
						}
						r.push(`throbbing in anticipation at being used like a toy.`);
					} else if (slave.fetish === "pregnancy" && FutureSocieties.isActive('FSRepopulationFocus') && canPenetrate(slave)) {
						r.push(`${slave.slaveName} gets off thinking about pregnancy, and in your arcology most women are pregnant or fertile. ${He} knows someone's pussy will be around ${his} ${dickSize} cock soon, and is clearly lost in ${his} fantasies as ${his} cock swells to a throbbing erection.`);
					}
				} else if (slave.attrXX > 65) {
					r.push(`${slave.slaveName} has a good sex drive and likes pussy, even before ${he}'s fully bound ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} cock`);
					}
					r.push(`is throbbing in anticipation.`);
				} else {
					r.push(`Despite ${his} adequate sex drive, since ${slave.slaveName} isn't turned on by the prospect of pussy, ${he} takes some manual stimulation before ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} cock`);
					}
					r.push(`stands erect.`);
				}
			} else {
				if (slave.attrXX > 65) {
					r.push(`${slave.slaveName} isn't known for ${his} high libido, but since ${he} likes pussy all it takes is some teasing to get ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} cock`);
					}
					r.push(`erect and ready.`);
				} else {
					r.push(`${slave.slaveName} doesn't have a high libido, and also isn't attracted to female slaves. A dose of vasodilators injected at the base of ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} cock`);
					}
					r.push(`causes ${him} to quickly reach painful readiness, and the unnatural pain makes ${him} strain at ${his} bonds.`);
					bottomDrugged = 1;
				}
			}
		} else {
			if (slave.energy > 60) {
				if (slave.attrXX > 65) {
					r.push(`Although ${slave.slaveName} does not like being a slave, ${his} high libido and love for pussy have ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} erection`);
					}
					r.push(`ready for sex despite ${his} negative feelings.`);
				} else {
					r.push(`${slave.slaveName} does not like being a slave, and isn't attracted to women, but with ${his} high libido all it takes is simple teasing for ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} cock`);
					}
					r.push(`to be ready for sex.`);
				}
			} else {
				r.push(`${slave.slaveName} does not like being a slave, and without a high sex drive ${he} is able to resist stimulation and stay soft. A quick dose of vasodilators changes that, and ${he} moans in pain and struggles against ${his} bonds in vain as ${his}`);
				if (slave.clit >= 4) {
					r.push(`massive clit`);
				} else {
					r.push(`${dickSize} cock`);
				}
				r.push(`becomes painfully hard.`);
				bottomDrugged = 1;
			}
		}
	}

	App.Events.addParagraph(el, r);
	r = [];

	r.push(`You call ${rapist.slaveName} into the room.`);

	App.Events.addParagraph(el, r);
	r = [];

	if (slave.fetish === Fetish.MINDBROKEN && slave.career !== "a dairy cow" && slave.career !== "a breeding bull") {
		r.push(`${slave.slaveName} doesn't even notice`);
		if (isIncest) {
			if (slave.father === rapist.ID && slave.mother === rapist.ID) {
				r.push(`the slave that is both ${his} mother and ${his} father,`);
			} else if (rapist.mother === slave.ID || rapist.father === slave.ID) {
				r.push(`${his} own ${relativeTerm(slave, rapist)},`);
			} else if (slave.mother === rapist.ID) {
				r.push(`${his} own mother,`);
			} else if (slave.father === rapist.ID) {
				r.push(`the slave that fathered ${him},`);
			} else {
				r.push(`${his} ${relativeTerm(slave, rapist)},`);
			}
		} else {
			r.push(`the other slave,`);
		}
		r.push(`and simply lays still.`);
	} else if (slave.fetish === Fetish.MINDBROKEN && (slave.career === "a dairy cow" || slave.career === "a breeding bull")) {
		if (isIncest) {
			r.push(`${slave.slaveName}'s simple mind does not even acknowledge that ${rapist.slaveName} is`);
			if (slave.father === rapist.ID && slave.mother === rapist.ID) {
				r.push(`the slave that is both ${his} mother and ${his} father,`);
			} else if (rapist.mother === slave.ID || rapist.father === slave.ID) {
				r.push(`${his} own ${relativeTerm(slave, rapist)},`);
			} else if (slave.mother === rapist.ID) {
				r.push(`${his} own mother,`);
			} else if (slave.father === rapist.ID) {
				r.push(`the slave that fathered ${him},`);
			} else {
				r.push(`${his} ${relativeTerm(slave, rapist)},`);
			}
		} else {
			r.push(`${slave.slaveName}`);
			if (canSee(slave)) {
				r.push(`sees`);
			} else if (canHear(slave)) {
				r.push(`hears`);
			} else {
				r.push(`dimly acknowledges`);
			}
			r.push(`the newcomer, and with ${his} simple mind`);
		}
		r.push(`${he} only knows that they have a pussy and ${his}`);
		if (slave.clit >= 4) {
			r.push(`swollen clit`);
		} else {
			r.push(`${dickSize} penis`);
		}
		r.push(`is erect. Naturally, ${he} seems quite eager to put them together.`);
		incestMood = "Bottom";
	} else {
		r.push(`${slave.slaveName} is fully naked and`);
		if (canSee(slave)) {
			r.push(`looking up at`);
		} else {
			r.push(`waiting in front of`);
		}
		if (isIncest) {
			if (slave.father === rapist.ID && slave.mother === rapist.ID) {
				r.push(`the slave that is both ${his} mother and ${his} father,`);
			} else if (rapist.mother === slave.ID || rapist.father === slave.ID) {
				r.push(`${his} own ${relativeTerm(slave, rapist)},`);
			} else if (slave.mother === rapist.ID) {
				r.push(`${his} own mother,`);
			} else if (slave.father === rapist.ID) {
				r.push(`the slave that fathered ${him},`);
			} else {
				r.push(`${his} ${relativeTerm(slave, rapist)},`);
			}
			if (slave.sexualQuirk === "perverted" || slave.behavioralQuirk === "sinful") {
				incestMood = "Bottom";
				r.push(`unable to hide ${his} intense arousal at the impending`);
				if (rapist.sexualQuirk === "perverted") {
					r.push(`perverted`);
				} else {
					r.push(`sinful`);
				}
				r.push(`act.`);
				if (canSee(slave)) {
					r.push(`${His} eyes are locked on ${rapist.slaveName}'s pussy, and`);
				}
				r.push(`${rapist.slaveName} can hear ${him} moan in anticipation${(!canSee(slave)) ? ", which surprises the blind slave" : ""}.`);
			} else if (slave.relationshipTarget === rapist.ID && slave.relationship > 2) {
				incestMood = "Both";
				r.push(`but since they're already in a sexual relationship, ${he} just shows a relaxed smile as ${he} waits for ${rapist.slaveName} to mount ${him}.`);
			} else {
				if (slave.devotion > 95) {
					incestMood = "Bottom";
					r.push(`but ${his} deep acceptance of slavery means ${he} is eager to please you,`);
					if (slave.clit >= 4) {
						r.push(`leaving ${his} massive clit flushed.`);
					} else {
						r.push(`making ${his} ${dickSize} cock drip precum.`);
					}
				} else if (slave.devotion > 60) {
					r.push(`and is clearly struggling between keeping ${himself} hard and acknowledging the incest. A small dose of vasodilators and ${his} impressive desire to please you should keep ${his}`);
					if (slave.clit >= 4) {
						r.push(`clit`);
					} else {
						r.push(`penis`);
					}
					r.push(`up for ${rapist.slaveName}.`);
					incestMood = "BottomFragile";
				} else {
					if (!bottomDrugged) {
						r.push(`and once it becomes clear to ${him} that ${rapist.slaveName} will be the one mounting ${him}, ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} penis`);
						}
						r.push(`shrinks away. A direct injection of vasodilators changes that, bringing ${him} back to readiness to ${his} horror.`);
						bottomDrugged = 1;
					} else {
						r.push(`and to ${his} own horror the drugs ${he} was injected with keep ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} penis`);
						}
						r.push(`ready and waiting.`);
					}
				}
			}
		} else {
			if (slave.relationshipTarget === rapist.ID) {
				r.push(`${his} ${relationshipTerm(rapist)},`);
				if (slave.relationship > 2) {
					r.push(`but since they're already in a sexual relationship, ${he} just shows a relaxed smile as ${he} waits for ${rapist.slaveName} to mount ${him}.`);
				} else if (slave.partners.has(rapist.ID)) {
					r.push(`but since they're already done it before, ${he} just shows a relaxed smile as ${he} waits for ${rapist.slaveName} to mount ${him}.`);
				} else {
					r.push(`whom ${he} hasn't had sex with yet. ${He} smiles nervously as ${he} waits for ${rapist.slaveName} to mount ${him}.`);
				}
			} else if (slave.rivalryTarget === rapist.ID) {
				r.push(`${his} ${rivalryTerm(rapist)}, ${rapist.slaveName}.`);
				if (slave.partners.has(rapist.ID)) {
					r.push(`They've already fucked in the past, and by ${his} reaction, unwillingly. A`);
				} else {
					r.push(`${He} doesn't much like what is to come, but a`);
				}
				r.push(`direct injection of vasodilators fixes that, forcing ${him} to readiness, much to ${his} chagrin.`);
			} else if (slave.origBodyOwnerID === rapist.ID) {
				r.push(`${rapist.slaveName}, who inhabits ${his} prior body.`);
				if (slave.sexualQuirk === "perverted") {
					r.push(`${He}'s enough of a pervert to get off over getting mounted by ${his} own form,`);
					if (slave.clit >= 4) {
						r.push(`leaving ${his} massive clit flushed.`);
					} else {
						r.push(`making ${his} ${dickSize} cock drip precum.`);
					}
				} else if (slave.devotion > 95) {
					r.push(`${His} deep acceptance of slavery means ${he} is eager to please you,`);
					if (slave.clit >= 4) {
						r.push(`leaving ${his} massive clit flushed,`);
					} else {
						r.push(`making ${his} ${dickSize} cock drip precum,`);
					}
					r.push(`despite how odd it is to fuck one's own body.`);
				} else if (slave.devotion > 60) {
					r.push(`${He} is clearly struggling to keep ${himself} hard while acknowledging ${he} is expected to fuck ${his} former body. A small dose of vasodilators and ${his} impressive desire to please you should keep ${his}`);
					if (slave.clit >= 4) {
						r.push(`clit`);
					} else {
						r.push(`penis`);
					}
					r.push(`at attention.`);
				} else {
					if (!bottomDrugged) {
						r.push(`Once it becomes clear to ${him} that "${he}'ll" be the one mounting ${him}, ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} penis`);
						}
						r.push(`shrinks away. A direct injection of vasodilators changes that, bringing ${him} back to readiness to ${his} horror.`);
						bottomDrugged = 1;
					} else {
						r.push(`To ${his} own horror the drugs ${he} was injected with keep ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} penis`);
						}
						r.push(`ready and waiting.`);
					}
				}
			} else {
				r.push(`${his} chosen partner.`);
				if (slave.devotion > 95) {
					r.push(`${His} deep acceptance of slavery means ${he} is eager to please you,`);
					if (slave.clit >= 4) {
						r.push(`leaving ${his} massive clit flushed,`);
					} else {
						r.push(`making ${his} ${dickSize} cock drip precum,`);
					}
					r.push(`eager for ${rapist.slaveName}.`);
				} else if (slave.devotion > 60) {
					r.push(`${He} is eager enough to please you that ${his}`);
					if (slave.clit >= 4) {
						r.push(`clit`);
					} else {
						r.push(`penis`);
					}
					r.push(`is at attention and waiting for ${rapist.slaveName}.`);
				} else {
					if (!bottomDrugged) {
						r.push(`Once it becomes clear to ${him} that ${rapist.slaveName} be the one mounting ${him}, ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} penis`);
						}
						r.push(`shrinks away. A direct injection of vasodilators changes that, bringing ${him} back to a proper hardness.`);
						bottomDrugged = 1;
					} else {
						r.push(`To ${his} own horror the drugs ${he} was injected with keep ${his}`);
						if (slave.clit >= 4) {
							r.push(`massive clit`);
						} else {
							r.push(`${dickSize} penis`);
						}
						r.push(`ready and waiting.`);
					}
				}
			}
		}
	}

	App.Events.addParagraph(el, r);
	r = [];

	if (rapist.fetish === Fetish.MINDBROKEN && rapist.career !== "a dairy cow" && rapist.career !== "a breeding bull") {
		r.push(`${rapist.slaveName} stares blankly, and needs to be deliberately guided to straddle ${slave.slaveName}.`);
		if (isIncest) {
			r.push(`Naturally, ${he2} isn't even aware of the impending incest.`);
		}
		if (slave.fetish === Fetish.MINDBROKEN && slave.career !== "a dairy cow" && slave.career !== "a breeding bull") {
			r.push(`Since both slaves are essentially vegetables, this is shaping up to be a rather contrived sexual demonstration. The parts are all there, but the actors aren't going to contribute much to the show.`);
		}
	} else if (rapist.fetish === Fetish.MINDBROKEN && (rapist.career === "a dairy cow")) {
		r.push(`${rapist.slaveName} sees the`);
		if (slave.clit >= 4) {
			r.push(`massive clit`);
		} else {
			r.push(`${dickSize} penis`);
		}
		r.push(`ready and waiting, and catches on to why ${he2}'s here quickly. ${He2} takes it into ${his2} mouth before you stop ${him2} and tap ${his2} pussy, and after a few seconds of thinking ${he2} straddles ${slave.slaveName}'s hips with a moo.`);
		if (isIncest) {
			r.push(`Naturally, since ${he2} thinks ${he2}'s a cow, incest means nothing to ${him2}.`);
		}
	} else if (rapist.fetish === Fetish.MINDBROKEN && (rapist.career === "a breeding bull")) {
		r.push(`${rapist.slaveName} sees the`);
		if (slave.clit >= 4) {
			r.push(`massive clit`);
		} else {
			r.push(`${dickSize} penis`);
		}
		r.push(`ready and waiting, but isn't quite sure what to do with it. ${He2}'s been brought up to use ${his2} dick when thinking, after all. It takes a few minutes to get ${him2} to straddle ${slave.slaveName}'s hips with the intent to get ${his2} pussy penetrated.`);
		if (isIncest) {
			r.push(`Naturally, since ${he2} thinks ${he2}'s a breeding bull, incest means nothing to ${him2}.`);
		}
	} else {
		r.push(`${rapist.slaveName} sees`);
		if (isIncest) {
			if (rapist.father === slave.ID && rapist.mother === slave.ID) {
				r.push(`the slave that is both ${his2} mother and ${his2} father`);
			} else if (slave.mother === rapist.ID || slave.father === rapist.ID) {
				r.push(`${his2} own ${relativeTerm(rapist, slave)}`);
			} else if (rapist.mother === slave.ID) {
				r.push(`${his2} own mother`);
			} else if (rapist.father === slave.ID) {
				r.push(`the slave that fathered ${him2}`);
			} else {
				r.push(`${his2} ${relativeTerm(rapist, slave)}`);
			}
			r.push(`tied to the bed,`);
			if (rapist.sexualQuirk === "perverted" || rapist.behavioralQuirk === "sinful") {
				if (incestMood === "Bottom") {
					r.push(`and can't hide ${his2}`);
					if (rapist.sexualQuirk === "perverted") {
						r.push(`perverted`);
					} else {
						r.push(`sinful`);
					}
					r.push(`arousal at the excited glances they share.`);
					incestMood = "Both";
				} else {
					incestMood = "Top";
					r.push(`and becomes indecently aroused at their horrified expressions for the`);
					if (rapist.sexualQuirk === "perverted") {
						r.push(`perverted`);
					} else {
						r.push(`sinful`);
					}
					r.push(`incest to come.`);
				}
			} else if (rapist.relationshipTarget === slave.ID && rapist.relationship > 2) {
				r.push(`and licks ${his2} lips involuntarily.`);
			} else {
				if (rapist.devotion > 95) {
					if (incestMood === "Bottom") {
						r.push(`as well as ${his} apparent lust. Since ${he2} is a perfect slave for you, ${his2} vagina becomes flushed with arousal quickly.`);
						incestMood = "Both";
					} else {
						incestMood = "Top";
						r.push(`as well as ${his} worried expression. ${rapist.slaveName} seems aroused and determined to show ${him} how a proper slave should act.`);
					}
				} else if (rapist.devotion > 60) {
					if (incestMood === "BottomFragile") {
						incestMood = "";
					}
					r.push(`and after figuring out they're just as superficially prepared as ${he2} is, resolves ${himself2} to forget they're related to stay aroused.`);
				} else {
					r.push(`and can't hide the look of horror that crosses ${his2} face. You assure ${him2} this is what ${he2} needs to do.`);
					if (incestMood === "Bottom") {
						r.push(`To ${his2} growing disgust, ${he2} can tell ${slave.slaveName}'s`);
						if (slave.clit >= 4) {
							r.push(`erect clit`);
						} else {
							r.push(`${dickSize} erection`);
						}
						r.push(`shows off genuine arousal despite their blood relation.`);
					} else {
						r.push(`${He2} might find solace in the fact that the owner of the`);
						if (slave.clit >= 4) {
							r.push(`erect clit`);
						} else {
							r.push(`${dickSize} erection`);
						}
						r.push(`on display doesn't seem thrilled as well.`);
					}
				}
			}
		} else {
			if (slave.relationshipTarget === rapist.ID) {
				r.push(`${his} ${relationshipTerm(rapist)}`);
			} else if (slave.rivalryTarget === rapist.ID) {
				r.push(`${his} ${rivalryTerm(rapist)}`);
			} else if (slave.origBodyOwnerID === rapist.ID) {
				r.push(`${his} former body`);
			} else {
				r.push(`${slave.slaveName}`);
			}
			r.push(`tied to the bed,`);
			if ((rapist.relationshipTarget === slave.ID && rapist.relationship > 2) || rapist.rivalryTarget === slave.ID) {
				r.push(`and licks ${his2} lips involuntarily.`);
			} else {
				if (rapist.devotion > 95) {
					if (incestMood === "Bottom") {
						r.push(`as well as ${his2} apparent lust. Since ${he2} is a perfect slave for you, ${his2} vagina becomes flushed with arousal quickly.`);
						incestMood = "Both";
					} else {
						incestMood = "Top";
						r.push(`as well as ${his} worried expressions. ${rapist.slaveName} seems aroused and determined to show ${him} how a proper slave should act.`);
					}
				} else if (rapist.devotion > 20) {
					if (incestMood === "BottomFragile") {
						incestMood = "";
					}
					r.push(`and after figuring out they're just as superficially prepared as ${he2} is, resolves ${himself2} to try and make it pleasurable.`);
				} else {
					r.push(`and can't hide the look of horror that crosses ${his2} face. You assure ${him2} this is what ${he2} needs to do.`);
					if (incestMood === "Bottom") {
						r.push(`To ${his2} growing disgust, ${he2} can tell ${slave.slaveName}'s`);
						if (slave.clit >= 4) {
							r.push(`erect clit`);
						} else {
							r.push(`${dickSize} erection`);
						}
						r.push(`shows off genuine arousal despite ${his2} unwillingness.`);
					} else {
						r.push(`${He2} might find solace in the fact that the owner of the`);
						if (slave.clit >= 4) {
							r.push(`erect clit`);
						} else {
							r.push(`${dickSize} erection`);
						}
						r.push(`on display doesn't seem thrilled as well.`);
					}
				}
			}
		}

		if (incestMood === "Top" || incestMood === "Both" || !(isIncest)) {
			if (rapist.fetishKnown === 1) {
				if (rapist.fetish === Fetish.SUBMISSIVE) {
					r.push(`${rapist.slaveName} usually prefers to be underneath someone with a`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} cock`);
					}
					r.push(`like that, which is obvious in ${his2} expressions. Knowing ${he2}'s riding it due to someone's orders is just about the only detail that plays to ${his2} fetish.`);
				} else if (rapist.fetish === "dom") {
					r.push(`${rapist.slaveName} can't hide ${his2} domineering smile at the`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} cock`);
					}
					r.push(`tied up and presented to ${him2}. Being on top and controlling everything is what gets ${him2} off, and you just gave ${him2} a nice human dildo to dominate.`);
				} else if (rapist.fetish === "masochist") {
					r.push(`${rapist.slaveName} usually prefers to be the one being abused, which is clear from ${his2} disappointed reaction as ${he2} considers the`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} erection`);
					}
					r.push(`tied before ${him2}. Maybe ${he2} can delude ${himself2} into thinking this is a denial play for ${himself2} and enjoy the human dildo, or maybe not.`);
				} else if (rapist.fetish === "sadist") {
					r.push(`${rapist.slaveName} is a sadist, and seeing a human dildo tied town for ${him2} to abuse and enjoy has ${him2} almost panting in arousal. The ecstatic look of devotion ${he2} flashes you makes it clear ${he2}'s going to enjoy ${himself2}, regardless of how the`);
					if (slave.clit >= 4) {
						r.push(`massive clit's`);
					} else {
						r.push(`${dickSize} cock's`);
					}
					r.push(`owner feels.`);
				} else if (rapist.fetish === "humiliation") {
					r.push(`${rapist.slaveName} usually gets off on humiliation, and you know ${he2} wishes the roles were reversed here. Despite that, having ${his2} ${getWrittenTitle(rapist)} order ${him2} to get ${himself2} off with the human dildo beneath ${him2} is quite thrilling, sexually.`);
				}
			}
		}
	}

	App.Events.addParagraph(el, r);
	r = [];

	if (slave.devotion < -20 && rapist.devotion < -20) {
		r.push(`Since you have two restrained slaves, it's up to you to do all the work. Since ${slave.slaveName} is already lying on the bed, you maneuver ${rapist.slaveName}'s pussy into place. The two slaves make no further moves until you deal ${rapist.slaveName} a terrific swat across the ass and promise to give ${him2} more of the same until ${he2} gets going. ${rapist.slaveName} starts lowering ${himself2} very slowly, pulling back every time ${slave.slaveName}'s dick prods ${his2} womanhood. After watching the sad display for a while, you grab ${him2} by the hips and slam ${him2} down onto ${slave.slaveName}, hilting ${him2} in one, scream-inducing move.`);
		if (rapist.vagina === 0) { /* losing virginity */
			if (rapist.devotion > 20) {
				r.push(`${rapist.slaveName} accepts your orders without comment and lowers ${his2} virgin pussy on ${slave.slaveName}'s ready`);

				if (slave.clit >= 4) {
					r.push(`massive clit.`);
				} else {
					r.push(`${dickSize} dick.`);
				}
				r.push(`<span class="devotion inc">${rapist.slaveName} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">will break in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 10;
			} else if (rapist.devotion >= -20) {
				r.push(`${rapist.slaveName} is clearly unhappy at the idea of losing ${his2} pearl of great price to ${slave.slaveName}; this probably isn't what ${he2} imagined ${his2} first real sex would be like. ${He2} fears ${he2} might get pregnant. Nevertheless, <span class="devotion inc">${he} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 4;
			} else {
				r.push(`As you anticipated, ${rapist.slaveName} refuses to give ${slave.slaveName} ${his2} virginity. However, since ${rapist.slaveName} is restrained ${his2} resistance amounts to <span class="mediumorchid">horrified tears</span> and <span class="trust dec">frightened begging.</span> Naturally, this cruel act <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion -= 5;
				rapist.trust -= 5;
			}
			if (rapist.mother === slave.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} ${relativeTerm(slave, rapist)}'s — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} ${relativeTerm(slave, rapist)}'s vagina.`);
				}
			} else if (slave.mother === rapist.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} mother's — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} mother's vagina.`);
				}
			}
		}/* closes losing virginity */
		r.push(`${rapist.slaveName} seems more cooperative after that and you only have to occasionally prod them with an electrical jolt to keep them going at a faster pace. Both slaves resent what you made them do and fear you as a result.`);
	} else if (rapist.fetish === "sadist" && rapist.fetishStrength > 20 && slave.devotion < -20) {
		r.push(`You tell the grinning ${rapist.slaveName} that ${slave.slaveName}'s`);
		if (slave.clit >= 4) {
			r.push(`massive clit`);
		} else {
			r.push(`${dickSize} dick`);
		}
		r.push(`is all ${hers2}. The slave life has so affected ${rapist.slaveName} that ${he2} is quite eager to hurt and rape another slave for ${his2} pleasure.`);
		if (rapist.vagina === 0) { /* losing virginity */
			if (rapist.devotion > 20) {
				r.push(`${rapist.slaveName} accepts your orders without comment and lowers ${his2} virgin pussy on ${slave.slaveName}'s ready`);

				if (slave.clit >= 4) {
					r.push(`massive clit.`);
				} else {
					r.push(`${dickSize} dick.`);
				}
				r.push(`<span class="devotion inc">${rapist.slaveName} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">will break in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 10;
			} else if (rapist.devotion >= -20) {
				r.push(`${rapist.slaveName} is clearly unhappy at the idea of losing ${his2} pearl of great price to ${slave.slaveName}; this probably isn't what ${he2} imagined ${his2} first real sex would be like. ${He2} fears ${he2} might get pregnant. Nevertheless, <span class="devotion inc">${he} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">breaks in ${his2} pussy.</span>`);

				rapist.vagina = 1;
				rapist.devotion += 4;
			} else {
				r.push(`As you anticipated, ${rapist.slaveName} refuses to give ${slave.slaveName} ${his2} virginity. However, since ${rapist.slaveName} is restrained ${his2} resistance amounts to <span class="mediumorchid">horrified tears</span> and <span class="trust dec">frightened begging.</span> Naturally, this cruel act <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion -= 5;
				rapist.trust -= 5;
			}
			if (rapist.mother === slave.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} ${relativeTerm(slave, rapist)}'s — embracing ${his}`);

					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} ${relativeTerm(slave, rapist)}'s vagina.`);
				}
			} else if (slave.mother === rapist.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} mother's — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} mother's vagina.`);
				}
			}
		}/* closes losing virginity */

		r.push(`${He2} begins playing with ${him} immediately, slapping, pinching and licking ${his} boobs while bouncing on the meaty shaft. Occasionally ${he2} stops, denying ${slave.slaveName} release by painfully squeezing and smacking the sensitive shaft. By the end of the session ${slave.slaveName}'s abused, pent-up penis has shot several massive and painful loads into the blissfully satisfied ${rapist.slaveName}, leaving ${him} lying on the bed, shaking in horror and <span class="health dec">utter exhaustion,</span> while ${rapist.slaveName} reaps the opportunity to continue painfully tormenting ${him}.`);

		healthDamage(slave, 10);
		seX(slave, "penetrative", rapist, "vaginal", 3);
	} else if (slave.devotion < -20) {
		r.push(`Since your dick slave is restrained, you order ${rapist.slaveName} to kneel on the bed on top of ${slave.slaveName}, and then maneuver ${his2} pussy into place. ${slave.slaveName} is uncooperative, so you prod and slap ${him} until ${he} starts to thrust ${his} cock into ${rapist.slaveName} with urgency.`);
		if (rapist.vagina === 0) { /* losing virginity */
			if (rapist.devotion > 20) {
				r.push(`${rapist.slaveName} accepts your orders without comment and lowers ${his2} virgin pussy on ${slave.slaveName}'s ready`);
				if (slave.clit >= 4) {
					r.push(`massive clit.`);
				} else {
					r.push(`${dickSize} dick.`);
				}
				r.push(`<span class="devotion inc">${rapist.slaveName} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">will break in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 10;
			} else if (rapist.devotion >= -20) {
				r.push(`${rapist.slaveName} is clearly unhappy at the idea of losing ${his2} pearl of great price to ${slave.slaveName}; this probably isn't what ${he2} imagined ${his2} first real sex would be like. ${He2} fears ${he2} might get pregnant. Nevertheless, <span class="devotion inc">${he} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 4;
			} else {
				r.push(`As you anticipated, ${rapist.slaveName} refuses to give ${slave.slaveName} ${his2} virginity. However, since ${rapist.slaveName} is restrained ${his2} resistance amounts to <span class="mediumorchid">horrified tears</span> and <span class="trust dec">frightened begging.</span> Naturally, this cruel act <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion -= 5;
				rapist.trust -= 5;
			}
			if (rapist.mother === slave.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} ${relativeTerm(slave, rapist)}'s — embracing ${his}`);

					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} ${relativeTerm(slave, rapist)}'s vagina.`);
				}
			} else if (slave.mother === rapist.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} mother's — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} mother's vagina.`);
				}
			}
		}/* closes losing virginity */
		r.push(`It doesn't take long for ${slave.slaveName} to orgasm. ${He} resents what you made ${him} do and fears you as a result.`);
	} else if (rapist.fetish === "dom" && rapist.fetishStrength > 20 && rapist.devotion > 20) {
		r.push(`You tell the randy ${rapist.slaveName} that ${slave.slaveName}'s`);

		if (slave.clit >= 4) {
			r.push(`massive clit`);
		} else {
			r.push(`${dickSize} dick`);
		}
		r.push(`is all ${hers2}. The slave life has so affected ${rapist.slaveName} that ${he2} is quite eager to rape another slave for ${his2} pleasure.`);
		if (rapist.vagina === 0) {
			r.push(`Without further instruction, ${rapist.slaveName} lowers ${his2} virgin pussy onto ${slave.slaveName} waiting`);
			if (slave.clit >= 4) {
				r.push(`clit-dick,`);
			} else {
				r.push(`${dickSize} dick,`);
			}
			r.push(`impaling ${himself2} slowly and teasing ${his2} bound victim. This act <span class="lime">breaks in ${his2} pussy.</span>`);
			rapist.vagina = 1;
			rapist.fetishStrength += 1;
		}
		r.push(`${He2} begins playing with ${him} immediately, fondling, pinching, and licking while bouncing on the meaty shaft. Occasionally ${he2} stops, denying ${slave.slaveName} release and teasing ${him}, fully enjoying ${his2} dominant role.`);
		if (slave.dick > 0) {
			if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`By the end of the session ${slave.slaveName}'s abused, pent-up penis has shot a massive load into ${rapist.slaveName}'s welcoming pussy. ${He} is glad to be dominated.`);
			} else {
				r.push(`By the end of the session ${slave.slaveName}'s abused, pent-up penis has shot a massive load, to ${his} horror and resentment, into the blissfully satisfied ${rapist.slaveName}.`);
			}
		}
	} else if (rapist.energy > 95 && rapist.devotion > 20) {
		r.push(`You tell the randy ${rapist.slaveName} that ${slave.slaveName}'s`);

		if (slave.clit >= 4) {
			r.push(`massive clit`);
		} else {
			r.push(`${dickSize} dick`);
		}
		r.push(`is all ${hers}. The slave life has so affected ${rapist.slaveName} that ${he2} is quite eager to rape another slave, just for the perverted novelty of the act.`);
		if (rapist.vagina === 0) { /* losing virginity */
			if (rapist.devotion > 20) {
				r.push(`${rapist.slaveName} accepts your orders without comment and lowers ${his2} virgin pussy on ${slave.slaveName}'s ready`);
				if (slave.clit >= 4) {
					r.push(`massive clit.`);
				} else {
					r.push(`${dickSize} dick.`);
				}
				r.push(`<span class="devotion inc">${rapist.slaveName} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">will break in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 10;
			} else if (rapist.devotion >= -20) {
				r.push(`${rapist.slaveName} is clearly unhappy at the idea of losing ${his2} pearl of great price to ${slave.slaveName}; this probably isn't what ${he2} imagined ${his2} first real sex would be like. ${He2} fears ${he2} might get pregnant. Nevertheless, <span class="devotion inc">${he} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 4;
			} else {
				r.push(`As you anticipated, ${rapist.slaveName} refuses to give ${slave.slaveName} ${his2} virginity. However, since ${rapist.slaveName} is restrained ${his2} resistance amounts to <span class="mediumorchid">horrified tears</span> and <span class="trust dec">frightened begging.</span> Naturally, this cruel act <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion -= 5;
				rapist.trust -= 5;
			}
			if (rapist.mother === slave.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} ${relativeTerm(slave, rapist)}'s — embracing ${his}`);

					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} ${relativeTerm(slave, rapist)}'s vagina.`);
				}
			} else if (slave.mother === rapist.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} mother's — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} mother's vagina.`);
				}
			}
		}/* closes losing virginity */

		r.push(`${He2} rides the helpless ${slave.slaveName} through several ejaculating orgasms. ${slave.vagina > -1 ? `In the short breaks between them, ${he2} teases ${his} pussy. ` : ``}By the end of the session ${rapist.slaveName}'s cunt is dripping cum, to ${his2} obvious satiation and bliss. ${slave.slaveName} is lying next to ${him2} on the bed in a state of fatigue, the entire experience having thoroughly exhausted ${him}.`);
		seX(slave, "penetrative", rapist, "vaginal", 3);
	} else if (slave.devotion <= 20 || rapist.devotion <= 20) {
		r.push(`You toss ${slave.slaveName} onto the bed and tell ${rapist.slaveName} to get on with it.`);
		if (rapist.vagina === 0) { /* losing virginity */
			if (rapist.devotion > 20) {
				r.push(`${rapist.slaveName} accepts your orders without comment and lowers ${his2} virgin pussy on ${slave.slaveName}'s ready`);
				if (slave.clit >= 4) {
					r.push(`massive clit.`);
				} else {
					r.push(`${dickSize} dick.`);
				}
				r.push(`<span class="devotion inc">${rapist.slaveName} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">will break in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 10;
			} else if (rapist.devotion >= -20) {
				r.push(`${rapist.slaveName} is clearly unhappy at the idea of losing ${his2} pearl of great price to ${slave.slaveName}; this probably isn't what ${he2} imagined ${his2} first real sex would be like. ${He2} fears ${he2} might get pregnant. Nevertheless, <span class="devotion inc">${he2} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 4;
			} else {
				r.push(`As you anticipated, ${rapist.slaveName} refuses to give ${slave.slaveName} ${his2} virginity. However, since ${rapist.slaveName} is restrained ${his2} resistance amounts to <span class="mediumorchid">horrified tears</span> and <span class="trust dec">frightened begging.</span> Naturally, this cruel act <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion -= 5;
				rapist.trust -= 5;
			}
			if (rapist.mother === slave.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} ${relativeTerm(slave, rapist)}'s — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} ${relativeTerm(slave, rapist)}'s vagina.`);
				}
			} else if (slave.mother === rapist.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} mother's — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} mother's vagina.`);
				}
			}
		}/* closes losing virginity */
		r.push(`They fuck mechanically, gazing with roiling emotions into each other's eyes. They do seem to come to some sort of a nonverbal understanding on the necessity of getting it done, and there is no real unhappiness in either of them when they finish and disentangle themselves. As they clean themselves and exit, you notice ${rapist.slaveName} is looking a little more longingly at ${slave.slaveName}.`);
	} else if (slave.devotion <= 50 || rapist.devotion <= 50) {
		r.push(`You order ${slave.slaveName} and ${rapist.slaveName} to get on with it.`);
		if (rapist.vagina === 0) { /* losing virginity */
			if (rapist.devotion > 20) {
				r.push(`${rapist.slaveName} accepts your orders without comment and lowers ${his2} virgin pussy on ${slave.slaveName}'s ready`);
				if (slave.clit >= 4) {
					r.push(`massive clit.`);
				} else {
					r.push(`${dickSize} dick.`);
				}
				r.push(`<span class="devotion inc">${rapist.slaveName} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">will break in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 10;
			} else if (rapist.devotion >= -20) {
				r.push(`${rapist.slaveName} is clearly unhappy at the idea of losing ${his2} pearl of great price to ${slave.slaveName}; this probably isn't what ${he2} imagined ${his2} first real sex would be like. ${He2} fears ${he2} might get pregnant. Nevertheless, <span class="devotion inc">${he} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 4;
			} else {
				r.push(`As you anticipated, ${rapist.slaveName} refuses to give ${slave.slaveName} ${his2} virginity. However, since ${rapist.slaveName} is restrained ${his2} resistance amounts to <span class="mediumorchid">horrified tears</span> and <span class="trust dec">frightened begging.</span> Naturally, this cruel act <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion -= 5;
				rapist.trust -= 5;
			}
			if (rapist.mother === slave.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} ${relativeTerm(slave, rapist)}'s — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} ${relativeTerm(slave, rapist)}'s vagina.`);
				}
			} else if (slave.mother === rapist.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} mother's — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} mother's vagina.`);
				}
			}
		}/* closes losing virginity */
		r.push(`They fuck mechanically at first, gazing with roiling emotions into each other's eyes. Eventually, they begin to enjoy the intimacy of the act, finding the shared pleasure between them comforting. They finish and resume life as slaves, the light of this intimacy diminishing, softening with ${slave.slaveName}'s`);
		if (slave.clit >= 4) {
			r.push(`massive clit`);
		} else {
			r.push(`${dickSize} dick`);
		}
		r.push(`and dripping away with the contents of ${rapist.slaveName}'s cum-filled pussy. You notice ${rapist.slaveName}'s looking a little more longingly at ${slave.slaveName}.`);
	} else {
		r.push(`The two slaves turn eagerly to the business of sex.`);
		if (rapist.vagina === 0) { /* losing virginity */
			if (rapist.devotion > 20) {
				r.push(`${rapist.slaveName} accepts your orders without comment and lowers ${his2} virgin pussy on ${slave.slaveName}'s ready`);
				if (slave.clit >= 4) {
					r.push(`massive clit.`);
				} else {
					r.push(`${dickSize} dick.`);
				}
				r.push(`<span class="devotion inc">${rapist.slaveName} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">will break in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 10;
			} else if (rapist.devotion >= -20) {
				r.push(`${rapist.slaveName} is clearly unhappy at the idea of losing ${his2} pearl of great price to ${slave.slaveName}; this probably isn't what ${he2} imagined ${his2} first real sex would be like. ${He2} fears ${he2} might get pregnant. Nevertheless, <span class="devotion inc">${he} is further broken to slavery</span> by this application of ${his2} body, which naturally <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion += 4;
			} else {
				r.push(`As you anticipated, ${rapist.slaveName} refuses to give ${slave.slaveName} ${his2} virginity. However, since ${rapist.slaveName} is restrained ${his2} resistance amounts to <span class="mediumorchid">horrified tears</span> and <span class="trust dec">frightened begging.</span> Naturally, this cruel act <span class="lime">breaks in ${his2} pussy.</span>`);
				rapist.vagina = 1;
				rapist.devotion -= 5;
				rapist.trust -= 5;
			}
			if (rapist.mother === slave.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} ${relativeTerm(slave, rapist)}'s — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} ${relativeTerm(slave, rapist)}'s vagina.`);
				}
			} else if (slave.mother === rapist.ID) {
				if (slave.counter.penetrative === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`gasps and ${his} eyes widen as ${he} feels the tender folds of a pussy — and none other than ${his} mother's — embracing ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`for the first time.`);
				} else {
					r.push(`${slave.slaveName}'s breath quickens as ${his}`);
					if (slave.clit >= 4) {
						r.push(`massive clit`);
					} else {
						r.push(`${dickSize} dick`);
					}
					r.push(`disappears into ${his} mother's vagina.`);
				}
			}
		}/* closes losing virginity */
		r.push(`${rapist.slaveName} happily rides ${slave.slaveName}, who occasionally thrusts ${his} hips up. After a little while, when ${rapist.slaveName} bends down to engage in passionate kissing, you come over and`);
		if (canDoAnal(rapist) && rapist.anus > 0) {
			r.push(`penetrate ${rapist.slaveName}'s free asshole with your`);
			if (V.PC.dick !== 0) {
				r.push(`dick.`);
			} else {
				r.push(`strap-on.`);
			}
			r.push(`With the extra stimulus of double penetration, ${he} comes indecently hard. The two of them collapse into an exhausted, satisfied pile of slave flesh.`);
			seX(rapist, "anal", V.PC, "penetrative", 1);
			if (canImpreg(rapist, V.PC)) {
				knockMeUp(rapist, 5, 1, -1);
			}
		} else if (canDoVaginal(slave)) {
			r.push(`penetrate ${slave.slaveName}'s free pussy with your`);
			if (V.PC.dick !== 0) {
				r.push(`dick.`);
			} else {
				r.push(`strap-on.`);
			}
			r.push(`With the double stimulus of penetrating a tight vagina and being penetrated while restrained, ${he} comes indecently hard. The two of them collapse into an exhausted, satisfied pile of slave flesh.`);
			r.push(VCheck.Vaginal(slave, 1));
		} else if (canDoAnal(slave)) {
			r.push(`penetrate ${slave.slaveName}'s free asshole with your`);
			if (V.PC.dick !== 0) {
				r.push(`dick.`);
			} else {
				r.push(`strap-on.`);
			}
			r.push(`With the double stimulus of penetrating a tight vagina and being penetrated while restrained, ${he} comes indecently hard. The two of them collapse into an exhausted, satisfied pile of slave flesh.`);
			r.push(VCheck.Anal(slave, 1));
		} else {
			r.push(`pull ${his2} face to your crotch. All this penetration has got you horny and there are no free holes to fuck, so a little oral will have to do. It doesn't take long for all three of you to collapse into an exhausted, satisfied pile of flesh.`);
			seX(rapist, "oral", V.PC, "penetrative", 1);
		}
	}

	/* Friendship/lust? */
	if (([2].includes(slave.relationship) && slave.relationshipTarget === rapist.ID) && ([2].includes(rapist.relationship) && rapist.relationshipTarget === slave.ID)) {
		r.push(`You keep ${slave.slaveName}'s dick intimate with ${rapist.slaveName}'s pussy for a while, something the two friends haven't been sharing with each other. In the end, you are certain they got closer, becoming <span class="lightgreen">friends with benefits.</span>`);
		slave.relationship++;
		rapist.relationship++;
	}

	/* pregnancy test */
	if (canImpreg(rapist, slave)) {
		r.push(knockMeUp(rapist, 25, 0, slave.ID));
	}

	/* save changes */
	seX(slave, "penetrative", rapist, "vaginal", 1);

	App.Events.addParagraph(el, r);

	return el;
};
