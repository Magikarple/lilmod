App.Interact.fSlaveSlaveAssChoosePartner = class extends App.Interact.BaseChoosePartnerRenderer {
	constructor(slave) {
		super(slave);
		this.intro = `Select the slave that will fuck ${this.slave.slaveName}'s ass.`;
		this.execute = App.Interact.fSlaveSlaveAss;
	}

	eligible(candidate) {
		return isSlaveAvailable(candidate) && (canPenetrate(candidate) || candidate.clit >= 4);
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.Entity.SlaveState} rapist
 * @returns {DocumentFragment}
 */
App.Interact.fSlaveSlaveAss = function(slave, rapist) {
	const el = new DocumentFragment();
	let r = [];
	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	const {
		He2, His2,
		he2, his2, him2, himself2, hers2, wife2
	} = getPronouns(rapist).appendSuffix("2");
	let incestMood;

	seX(slave, "anal", rapist, "penetrative");

	let dickSize;
	if (rapist.dick === 1) {
		dickSize = "pathetic";
	} else if (rapist.dick === 2) {
		dickSize = "tiny";
	} else if (rapist.dick === 3) {
		dickSize = "average";
	} else if (rapist.dick === 4) {
		dickSize = "big";
	} else if (rapist.dick === 5) {
		dickSize = "huge";
	} else if (rapist.dick === 6) {
		dickSize = "gigantic";
	} else if (rapist.dick === 7) {
		dickSize = "titanic";
	} else if (rapist.dick === 8) {
		dickSize = "absurd";
	} else if (rapist.dick === 9) {
		dickSize = "inhuman";
	} else {
		dickSize = "obscene";
	}

	const isIncest = areRelated(slave, rapist);

	r.push(`You take a look at the slave you selected.`);

	if (rapist.fetish === "dom" && rapist.fetishStrength > 20 && rapist.devotion >= -20) {
		r.push(`Since ${rapist.slaveName} loves to dominate others it's not hard to get ${his2}`);
		if (rapist.dick > 0) {
			r.push(`${dickSize} dick`);
		} else {
			r.push(`massive clit`);
		}
		r.push(`ready. ${His2}`);
		if (rapist.dick > 0) {
			r.push(`${dickSize} cock`);
		} else {
			r.push(`massive clit`);
		}
		r.push(`quickly swells to a throbbing erection at the prospect of forcing ${himself2} on another slave.`);
	} else if (rapist.fetish === "sadist" && rapist.fetishStrength > 20 && rapist.devotion >= -20) {
		r.push(`With the prospect of torturing another slave`);
		if (rapist.dick > 0) {
			r.push(`${his2} ${dickSize} cock swells to a throbbing erection in seconds.`);
		} else {
			r.push(`${his2} huge clit becomes fully engorged in seconds.`);
		}
	} else if ((rapist.fetish === "pregnancy" && rapist.fetishStrength > 20 && rapist.devotion >= -20) && rapist.dick > 0) {
		r.push(`With the prospect of raping another slave bareback, ${his2} ${dickSize} cock swells to a throbbing erection in seconds.`);
	} else if (rapist.attrXX > 65 && rapist.devotion >= -20) {
		r.push(`Since ${rapist.slaveName} likes sticking ${his2}`);
		if (rapist.dick > 0) {
			r.push(`${dickSize} penis`);
		} else {
			r.push(`massive clit`);
		}
		r.push(`in girls, ${he2} doesn't take much convincing.`);
	} else if (rapist.devotion > 50) {
		r.push(`Since ${rapist.slaveName} is devoted to you, ${he2}'ll eagerly fuck anything you tell ${him2} to fuck.`);
	} else if (rapist.devotion > 20) {
		r.push(`Since ${rapist.slaveName} is obedient, ${he2}'ll fuck anything you tell ${him2} to fuck.`);
	} else if (rapist.devotion >= -20) {
		r.push(`Since ${rapist.slaveName} does not resist your will, ${he2} should comply reasonably well. ${He2} has to work to get ${his2}`);
		if (rapist.dick > 0) {
			r.push(`${dickSize} penis`);
		} else {
			r.push(`massive clit`);
		}
		r.push(`hard despite ${his2} doubts, visibly disturbed that you are ordering ${him2} to fuck someone for your entertainment.`);
	} else {
		r.push(`Since ${rapist.slaveName} is unlikely to comply willingly, you simply restrain ${him2} and administer a massive dose of vasodilators, directly where they will do the most good. ${rapist.slaveName} writhes with the pain of the injection, which is compounded as ${his2}`);
		if (rapist.dick > 0) {
			r.push(`${dickSize} penis`);
		} else {
			r.push(`massive clit`);
		}
		r.push(`quickly reaches an agonizingly full erection.`);
	}

	if (isIncest) {
		r.push(`${rapist.slaveName} is well aware that ${he2} is about to rape`);
		if (rapist.father === slave.ID && rapist.mother === slave.ID) {
			r.push(`the slave that is both ${his2} mother and ${his2} father,`);
		} else if (slave.mother === rapist.ID || slave.father === rapist.ID) {
			r.push(`${his2} own ${relativeTerm(rapist, slave)},`);
		} else if (rapist.mother === slave.ID) {
			r.push(`${his2} own mother,`);
		} else if (rapist.father === slave.ID) {
			r.push(`the slave that fathered ${him2},`);
		} else {
			r.push(`${his2} ${relativeTerm(rapist, slave)},`);
		}
		if (rapist.sexualQuirk === "perverted" || rapist.behavioralQuirk === "sinful") {
			if (rapist.energy > 60) {
				r.push(`and seems quite aroused at just how`);
				if (rapist.sexualQuirk === "perverted") {
					r.push(`perverted`);
				} else {
					r.push(`sinful`);
				}
				r.push(`that is.`);
				if (canSee(rapist)) {
					r.push(`${rapist.slaveName}'s eyes seemed locked on ${slave.slaveName}'s inviting asshole, thoroughly aroused and waiting for your order.`);
				}
			} else {
				r.push(`but despite ${his2} conflicted feelings ${his2} arousal is clear.`);
			}
			incestMood = "Top";
		} else if (rapist.relationshipTarget === slave.ID && rapist.relationship > 2) {
			r.push(`but since ${he2}'s already in a sexual relationship with ${him}, it's only special because ${his2} ${getWrittenTitle(rapist)} is watching.`);
			incestMood = "Top";
		} else {
			if (rapist.devotion > 95) {
				r.push(`but ${his2} deep acceptance of slavery means ${he2} can't help but be eager to please everyone involved with ${his2} performance.`);
				incestMood = "Top";
			} else if (rapist.devotion > 60) {
				r.push(`but ${his2} experience as a slave means ${he2} can mostly ignore it and focus on sex.`);
			} else {
				r.push(`and is understandably disturbed.`);
			}
		}
	}

	App.Events.addParagraph(el, r);
	r = [];

	r.push(`Next, you see to ${slave.slaveName}.`);

	if (isIncest) {
		r.push(`${slave.slaveName} is fully naked and`);
		if (canSee(slave)) {
			r.push(`looking up at`);
		} else {
			r.push(`waiting in front of`);
		}
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
			if (slave.energy > 60) {
				r.push(`whose`);
				if (rapist.dick > 0) {
					r.push(`${dickSize} penis`);
				} else {
					r.push(`massive clit`);
				}
				r.push(`is standing firm above ${him}. ${He} seems indecently aroused, flushed and shivering in anticipation.`);
			} else {
				r.push(`but despite ${his} conflicted feelings ${his} growing arousal is clear as ${he}`);
				if (canSee(slave)) {
					r.push(`stares at`);
				} else {
					r.push(`imagines`);
				}
				r.push(`the`);
				if (rapist.dick > 0) {
					r.push(`${dickSize} penis`);
				} else {
					r.push(`massive clit`);
				}
				r.push(`that's soon going inside ${him}.`);
			}
			if (incestMood === "Top") {
				incestMood = "Both";
			} else {
				incestMood = "Bottom";
			}
		} else if (slave.relationshipTarget === rapist.ID && slave.relationship > 2) {
			r.push(`and seems calm and inviting to ${his}`);
			if (slave.relationship === 3) {
				r.push(`sex friend's`);
			} else if (slave.relationship === 4) {
				r.push(`lover's`);
			} else {
				r.push(`slave ${wife2}'s`);
			}
			if (rapist.dick > 0) {
				r.push(`${dickSize} penis`);
			} else {
				r.push(`massive clit`);
			}
			r.push(`that will be penetrating ${him}.`);
			if (incestMood === "Top") {
				incestMood = "Both";
			} else {
				incestMood = "Bottom";
			}
		} else {
			if (slave.devotion > 95) {
				r.push(`and ${his} deep acceptance of ${his} status as a slave has ${him} staring`);
				if (canSee(slave)) {
					r.push(`at`);
				} else {
					r.push(`blindly towards`);
				}
				r.push(`the`);
				if (rapist.dick > 0) {
					r.push(`${dickSize} penis`);
				} else {
					r.push(`massive clit`);
				}
				r.push(`above ${him} with a lusty smile.`);
				if (incestMood === "Top") {
					incestMood = "Both";
				} else {
					incestMood = "Bottom";
				}
			} else if (slave.devotion > 60) {
				r.push(`and if ${he} focuses, ${he} can forget the`);
				if (rapist.dick > 0) {
					r.push(`${dickSize} penis`);
				} else {
					r.push(`massive clit`);
				}
				r.push(`standing erect in front of ${him} belongs to someone related to ${him}.`);
			} else {
				r.push(`and is understandably disturbed,`);
				if (canSee(slave)) {
					r.push(`eyes glued to the`);
					if (rapist.dick > 0) {
						r.push(`${dickSize} penis`);
					} else {
						r.push(`massive clit`);
					}
					r.push(`throbbing before ${him}.`);
				} else if (canHear(slave)) {
					r.push(`listening to the heavy breathing of ${his} relative whose`);
					if (rapist.dick > 0) {
						r.push(`${dickSize} penis`);
					} else {
						r.push(`massive clit`);
					}
					r.push(`will be entering ${him} soon.`);
				} else {
					r.push(`imagining how the`);
					if (rapist.dick > 0) {
						r.push(`${dickSize} penis`);
					} else {
						r.push(`massive clit`);
					}
					r.push(`of ${his} relative will feel inside ${him}`);
				}
			}
		}
	}

	if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60 && slave.fetishKnown === 1 && slave.anus === 0) {
		r.push(`${He} presents ${his} virgin asshole to ${rapist.slaveName} without protest. This act <span class="virginity loss"> breaks in ${his} asshole,</span> and <span class="hotpink">reminds ${him}</span> of ${his} status as a submissive slave.`);
		slave.anus = 1;
		slave.devotion += 4;
		slave.fetishStrength += 1;
	} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} smiles as ${he} lays back and presents ${his} asshole to ${rapist.slaveName}. ${He} openly enjoys submitting ${himself} for others to make use of.`);
	} else if ((slave.devotion > 20 && slave.anus === 0) ) {
		r.push(`${He} accepts your orders without comment and presents ${his} virgin asshole to ${rapist.slaveName}. ${He} gasps in shock when ${he} feels the`);
		if (rapist.dick > 0) {
			r.push(`${dickSize} dick`);
		} else {
			r.push(`massive clit`);
		}
		r.push(`enter ${him}. <span class="hotpink">${He} is broken to slavery</span> by this application of ${his} body, which naturally <span class="virginity loss">will break in ${his} asshole.</span>`);
		slave.anus = 1;
		slave.devotion += 10;
	} else if (slave.devotion >= -20 && slave.anus === 0) {
		r.push(`${He} is clearly unhappy at the idea of losing ${his} pearl of great price to ${rapist.slaveName}; this probably isn't what ${he} imagined ${his} first real sexual encounter would be like. Nevertheless, ${he} is <span class="hotpink">broken to slavery</span> by this application of ${his} body, which naturally <span class="virginity loss">will break in ${his} asshole.</span>`);
		slave.anus = 1;
		slave.devotion += 4;
	} else if (slave.anus === 0) {
		r.push(`As you anticipated, ${he} refuses to give ${rapist.slaveName} ${his} virginity. Since ${he} is restrained, ${his} <span class="devotion dec">horrified tears</span> and <span class="trust dec">frightened begging</span> are ${his} only signs of rebellion. Naturally, this cruel act <span class="virginity loss">will break in ${his} asshole.</span>`);
		slave.devotion -= 5;
		slave.trust -= 5;
		slave.anus = 1;
	}

	if (isAmputee(slave)) {
		r.push(`You set ${his} limbless torso up for ${rapist.slaveName}.`);
	} else if (tooBigBreasts(slave)) {
		r.push(`You set ${him} up for ${rapist.slaveName}, face-down so the weight of ${his} tits pins ${him} helplessly in place.`);
	} else if (tooBigButt(slave)) {
		r.push(`You set ${him} up for ${rapist.slaveName}, face-down so the weight of ${his} giant ass pins ${him} helplessly in place and gives ${rapist.slaveName} a lovely cushion to thrust against.`);
	} else if (tooBigDick(slave)) {
		r.push(`You set ${him} up for ${rapist.slaveName}, face-up so ${he} is pinned under the weight of ${his} giant cock.`);
	} else if (tooBigBalls(slave)) {
		r.push(`You set ${him} up for ${rapist.slaveName}, face-down so the weight of ${his} giant balls anchor ${him} helplessly in place.`);
	} else if (slave.devotion < -20) {
		r.push(`${He} tries to refuse, so you restrain ${him} despite ${his} resistance to the idea of being raped by another slave.`);
	} else if (slave.devotion <= 20) {
		r.push(`${He} obeys your orders reluctantly, arranging ${himself} for anal sex despite ${his} obvious hesitation to be raped by another slave.`);
	} else if (slave.devotion < 10) {
		r.push(`${He} obeys your orders, arranging ${himself} for anal sex despite ${his} slight hesitation at the idea of being another's slave sex toy.`);
	} else {
		r.push(`${He} happily obeys your orders, getting ready to serve another slave.`);
	}

	App.Events.addParagraph(el, r);
	r = [];

	if (slave.devotion < -20 && rapist.devotion < -20) {
		r.push(`Since you have two restrained slaves, it's up to you to do all the work. ${slave.slaveName} is tied up on the bed with ${his} asshole available, so you maneuver ${rapist.slaveName}'s`);
		if (rapist.dick > 0) {
			r.push(`${dickSize} dick`);
		} else {
			r.push(`strap-on`);
		}
		r.push(`into place. The two slaves make no further moves until you deal ${rapist.slaveName} a terrific swat across the ass and promise to give ${him2} more of the same until ${he2} gets going. ${rapist.slaveName} starts moving very slowly, barely prodding. After watching them mechanically go at it for a while, you use your leg to suddenly push ${him2} deep into ${slave.slaveName}, fully hilting ${him2} in one motion. You occasionally prod them with an electrical jolt to keep them going at a faster pace. Both slaves resent what you made them do for you and fear you'll make them do it again.`);
	} else if (rapist.devotion < -20) {
		r.push(`Since your dick slave is restrained, you order ${slave.slaveName} to present ${himself} on the bed, and then maneuver ${rapist.slaveName}'s`);
		if (rapist.dick > 0) {
			r.push(`${dickSize} dick`);
		} else {
			r.push(`strap-on`);
		}
		r.push(`into place. ${slave.slaveName} does ${his} best to hump ${himself} against the unwilling cock until you deal ${rapist.slaveName} a terrific swat across the ass and promise to give ${him2} more of the same until ${he2} gets going. ${He2} is still unenthusiastic, so you have ${him2} lie down and have ${slave.slaveName} ride ${himself} to orgasm. ${He2} resents what you made ${him2} do and fears you'll force ${him2} to do it again. Though ${slave.slaveName} accepts the situation, ${he} looks into ${rapist.slaveName}'s eyes with obvious apology.`);
	} else if (rapist.fetish === "dom" && rapist.fetishStrength > 20 && rapist.devotion > 20) {
		r.push(`${slave.slaveName} is tied and placed on the bed with ${his} asshole defenseless and available, and then you tell the randy ${rapist.slaveName} that it's all ${hers2}. The slave life has so affected ${rapist.slaveName} that ${he2} is quite eager to rape another slave for ${his2} pleasure. ${He2} penetrates ${him} immediately, fondling, pinching, and licking while pistoning away, fully enjoying ${his2} dominant role, edging ${his2} poor toy again and again and making ${him} beg for release.`);
		if (slave.fetish === "dom") {
			if (slave.devotion < -20) {
				r.push(`By the end of the day ${slave.slaveName}'s abused backdoor is`);

				if (rapist.dick > 0) {
					r.push(`dripping with cum,`);
				} else {
					r.push(`overflowing with juices,`);
				}
				r.push(`leaving ${him} horrified and disgusted at ${his} lack of control.`);
			} else {
				r.push(`By the end of the day ${slave.slaveName}'s abused backdoor is`);

				if (rapist.dick > 0) {
					r.push(`dripping with cum,`);
				} else {
					r.push(`overflowing with juices,`);
				}
				r.push(`leaving ${him} annoyed at ${his} lack of control, though ${he} still somewhat enjoyed ${himself}.`);
			}
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			if (slave.devotion < -20) {
				r.push(`By the end of the day ${slave.slaveName}'s abused backdoor is`);

				if (rapist.dick > 0) {
					r.push(`dripping with cum,`);
				} else {
					r.push(`overflowing with juices,`);
				}
				r.push(`leaving the submissive slave horrified that ${he} found the experience sexually satisfying.`);
			} else {
				r.push(`By the end of the day ${slave.slaveName}'s abused backdoor is`);

				if (rapist.dick > 0) {
					r.push(`dripping with cum.`);
				} else {
					r.push(`overflowing with juices.`);
				}
				r.push(`This sexual encounter is everything ${he} dreamed of, leaving ${him} utterly satisfied.`);
			}
		}
		r.push(`${rapist.slaveName} is lying next to ${him} on the bed in a state of obvious satiation and bliss.`);
	} else if (rapist.energy > 95 && rapist.devotion > 20 && slave.devotion < -20) {
		r.push(`${slave.slaveName} is tied and placed on the bed with ${his} asshole defenseless and available, and then you tell the randy ${rapist.slaveName} that it's all ${hers2}. The slave life has so affected ${rapist.slaveName} that ${he2} is quite eager to rape another slave, just for the perverted novelty of the act. ${His} high libido keeps ${him} going for a long time, bringing the helpless toy to one forced orgasm after another. By the end of the day ${slave.slaveName} is lying on the bed, all worn out, ${his} backdoor`);
		if (rapist.dick > 0) {
			r.push(`dripping with cum`);
		} else {
			r.push(`overflowing with juices`);
		}
		r.push(`to ${his} horror and resentment, while ${rapist.slaveName} is sleeping next to ${him} in a state of obvious satiation and bliss.`);
	} else if (slave.devotion <= 20 || rapist.devotion <= 20) {
		r.push(`You order ${slave.slaveName} onto the couch and tell ${rapist.slaveName} to get on with it. They fuck mechanically, gazing with roiling emotions into each other's eyes. They do seem to come to some sort of a non-verbal understanding on the necessity of getting it done, and there is no real unhappiness in either of them when they finish and disentangle themselves. As they clean themselves and exit, you notice ${rapist.slaveName} is looking a little more longingly at ${slave.slaveName}.`);
	} else if (slave.devotion <= 50 || rapist.devotion <= 50) {
		r.push(`You order ${slave.slaveName} and ${rapist.slaveName} to get on with it. They fuck mechanically at first, gazing with roiling emotions into each other's eyes. Eventually, they begin to enjoy the intimacy of the act, finding the shared pleasure between them comforting. They finish and resume life as slaves, the light of this intimacy diminishing, softening with ${rapist.slaveName}'s dick and dripping away with the contents of ${slave.slaveName}'s cum-filled asshole.`);
	} else {
		r.push(`The two slaves happily and eagerly get down to business. They take their time with foreplay, humping slowly and gazing into each other's eyes, exchanging kisses almost constantly. After a little while, ${slave.slaveName} looks over ${rapist.slaveName}'s shoulder to where you're sitting, the invitation clear in ${his} eyes. As soon as you stand to come over, they roll over without being ordered to`);
		if (canDoAnal(slave) && slave.anus > 0) {
			r.push(`present ${slave.slaveName}'s butthole.`);
		} else {
			r.push(`invite you into ${slave.slaveName}'s crowded asshole.`);
		}
		r.push(`You take up the offer and penetrate ${slave.slaveName} with your`);
		if (V.PC.dick > 0) {
			r.push(`dick.`);
		} else {
			r.push(`strap-on.`);
		}
		r.push(`With the added stimulus of penetrating a tight hole alongside ${his2} dear ${getWrittenTitle(rapist)}, ${rapist.slaveName} comes indecently hard, but nowhere near as hard as the completely overloaded ${slave.slaveName}. All of you collapse into an exhausted, happy pile of flesh.`);
	}

	seX(slave, "anal", rapist);

	if (canImpreg(slave, rapist)) {
		knockMeUp(slave, 25, 0, rapist.ID);
	}

	App.Events.addParagraph(el, r);
	return el;
};
