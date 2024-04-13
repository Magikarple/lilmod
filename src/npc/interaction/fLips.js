/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fLips = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself, girl
	} = getPronouns(slave);

	seX(slave, "oral", V.PC, "penetrative");

	r.push(`You tell ${slave.slaveName} to`);
	if (V.PC.dick !== 0) {
		r.push(`blow you with ${his}`);
	} else {
		r.push(`please your pussy with ${his}`);
	}
	if (slave.lips > 95) {
		r.push(`facepussy.`);
	} else if (slave.lips > 70) {
		r.push(`cartoonish lips.`);
	} else if (slave.lips > 20) {
		r.push(`dick-sucking lips.`);
	} else if (slave.lips > 10) {
		r.push(`pretty mouth.`);
	} else {
		r.push(`whore mouth.`);
	}

	if (slave.fetish === "cumslut" && slave.devotion >= -20) {
		r.push(`${He}'s delighted at the prospect of ${his} favorite activity.`);
	}

	switch (slave.mouthAccessory) {
		case "dildo gag":
			if (hasAnyArms(slave)) {
				r.push(`${He} removes the dildo from ${his} throat, leaving the ring gag in place.`);
			} else {
				r.push(`As an amputee, ${he} requires your assistance to get the dildo out of ${his} throat.`);
			}
			r.push(`Able to breathe through ${his} mouth for the first time in a while, ${he} gasps gratefully, knowing the respite will be brief.`);
			break;
		case "massive dildo gag":
			if (hasAnyArms(slave)) {
				r.push(`${He} struggles to remove the dildo from ${his} throat, leaving ${his} mouth agape.`);
			} else {
				r.push(`As an amputee, ${he} requires your assistance to get the dildo out of ${his} throat.`);
			}
			r.push(`Able to breathe through ${his} mouth for the first time in a while, ${he} gasps gratefully, knowing the respite will be brief.`);
			break;
		case "ball gag":
		case "bit gag":
			if (hasAnyArms(slave)) {
				r.push(`${He} unfastens ${his} gag and pulls it from ${his} mouth.`);
			} else {
				r.push(`As an amputee, ${he} requires your assistance to get the gag unfastened.`);
			}
			r.push(`Able to breathe through ${his} mouth for the first time in a while, ${he} gasps gratefully, knowing the respite will be brief.`);
			break;
		case "ring gag":
			if (hasAnyArms(slave)) {
				r.push(`${He} unfastens ${his} gag.`);
			} else {
				r.push(`As an amputee, ${he} requires your assistance to get the gag unfastened.`);
			}
			r.push(`Able to flew ${his} jaw for the first time in a while, ${he} swallows gratefully, knowing the respite will be brief.`);
	}

	if (slave.lipsTat === "tribal patterns") {
		r.push(`The tribal patterns on ${his} face enhance ${his} beauty.`);
	} else if (slave.lipsTat === "permanent makeup") {
		r.push(`${His} tattooed-on makeup encourages it.`);
	} else if (slave.lipsTat === "degradation") {
		r.push(`The tattoos on ${his} face are asking for it, after all.`);
	}

	if (slave.piercing.lips.weight + slave.piercing.tongue.weight > 2) {
		r.push(`The stimulation from ${his} many oral piercings should be great.`);
	} else if (slave.piercing.lips.weight + slave.piercing.tongue.weight > 0) {
		r.push(`The sensation of ${his} oral piercings should be quite nice.`);
	}

	if (slave.teeth === "removable") {
		if (slave.devotion <= 20) {
			r.push(`You pull ${his} prosthetic teeth out of ${his} mouth so you can enjoy an extra-soft throatfuck.`);
		} else {
			r.push(`${He} slides ${his} prosthetic teeth out of ${his} mouth so ${he} can give you an extra-soft suck.`);
		}
	}

	if (isAmputee(slave)) {
		r.push(`You set ${his} limbless torso on the`);
		if (V.PC.dick !== 0) {
			r.push(`edge of your desk with ${him} on ${his} back. ${His} head dangles off the edge of the desk, leaving ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`mouth at the perfect angle for use. As an amputee ${he} has absolutely no control over the depth or quickness of oral sex, so you are careful not to hurt ${him}. Even so, you take ${him} to the edge of gagging, enjoying the sight of ${his} ${slave.skin} throat bulging. Eventually you shoot your load directly down ${his} gullet.`);
			if (V.PC.vagina !== -1) {
				r.push(`If ${he} thought that was it, ${he}'s soon corrected: you hike yourself up further, and grind your pussy against ${his} face.`);
			}
		} else {
			r.push(`floor next to your desk and kneel on ${him} with your legs on either side of ${him}, so your pussylips are hard against ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`mouth. ${He} desperately eats you out, trying to get you off as fast as possible so ${he} can get a bit more air, but you grind down without mercy, taking your pleasure.`);
		}
	} else if (tooBigBelly(slave)) {
		r.push(`You get ${him} situated on the edge of your desk, on ${his} back. This pins ${him} down, the massive weight of ${his} belly stopping ${him} from going anywhere at all. ${His} head dangles off the edge of the desk, leaving ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`mouth at the perfect angle for use.`);
		if (V.PC.dick !== 0) {
			if (slave.bellyImplant >= 1500) {
				r.push(`${He} has absolutely no control over the depth or quickness of oral sex, so you are careful not to hurt ${him}. Even so, you take ${him} to the edge of gagging, enjoying the sight of the spasms running through ${his} stomach as ${he} struggles to breathe. Eventually you shoot your load directly down ${his} gullet.`);
			} else {
				r.push(`${He} has absolutely no control over the depth or quickness of oral sex, so you are careful not to hurt ${him}. Even so, you take ${him} to the edge of gagging, enjoying the sight of ${his} ${slave.skin} throat bulging and every movement within ${his} overstuffed womb as ${he} struggles to breathe. Eventually you shoot your load directly down ${his} gullet.`);
			}
			if (V.PC.vagina !== -1) {
				r.push(`If ${he} thought that was it, ${he}'s soon corrected: you hike yourself up further, and grind your pussy against ${his} face.`);
			}
		} else {
			if (slave.bellyImplant >= 1500) {
				r.push(`${He} has absolutely no control over how hard you grind your cunt against ${his} face, so you are careful not to suffocate ${him}. Even so, you take ${him} to the edge, enjoying the sight of the spasms running through ${his} stomach as ${he} struggles to breathe. Eventually you climax, giving ${him} a good`);
				if (canTaste(slave)) {
					r.push(`taste`);
				} else {
					r.push(`dose`);
				}
				r.push(`of your femcum.`);
			} else {
				r.push(`${He} has absolutely no control over how hard you grind your cunt against ${his} face, so you are careful not to suffocate ${him}. Even so, you take ${him} to the edge, enjoying the sight of the movement within ${his} overstuffed womb as ${he} struggles to breathe. Eventually you climax, giving ${him} a good`);
				if (canTaste(slave)) {
					r.push(`taste`);
				} else {
					r.push(`dose`);
				}
				r.push(`of your femcum.`);
			}
		}
	} else if (tooBigBreasts(slave)) {
		r.push(`You get ${him} situated on the edge of your desk, on ${his} back. This pins ${him} down, the massive weight of ${his} tits stopping ${him} from going anywhere at all. ${His} head dangles off the edge of the desk, leaving ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`mouth at the perfect angle for use.`);
		r.push(`${He} has absolutely no control over`);
		if (V.PC.dick !== 0) {
			r.push(`the depth or quickness of oral sex, so you are careful not to hurt ${him}. Even so, you take ${him} to the edge of gagging, enjoying the sight of ${his} ${slave.skin} throat bulging and ${his} absurd boobs jiggling as ${he} struggles to breathe. Eventually you shoot your load directly down ${his} gullet.`);
			if (V.PC.vagina !== -1) {
				r.push(`If ${he} thought that was it, ${he}'s soon corrected: you hike yourself up further, and grind your pussy against ${his} face.`);
			}
		} else {
			r.push(`how hard you grind your cunt against ${his} face, so you are careful not to suffocate ${him}. Even so, you take ${him} to the edge, enjoying the sight of ${his} absurd boobs jiggling as ${he} struggles to breathe. Eventually you climax, giving ${him} a good`);
			if (canTaste(slave)) {
				r.push(`taste`);
			} else {
				r.push(`dose`);
			}
			r.push(`of your femcum.`);
		}
	} else if (tooBigButt(slave)) {
		r.push(`You get ${him} situated on the edge of your desk, on ${his} back. This anchors ${him}, the massive weight of ${his} ass stopping ${him} from going anywhere at all. ${His} head dangles off the edge of the desk, leaving ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`mouth at the perfect angle for use.`);
		if (V.PC.dick !== 0) {
			r.push(`${He} has absolutely no control over the depth or quickness of oral sex, so you are careful not to hurt ${him}. Even so, you take ${him} to the edge of gagging, enjoying the sight of ${his} ${slave.skin} throat bulging and ${his} absurd rear jiggling as ${he} struggles to breathe. Eventually you shoot your load directly down ${his} gullet.`);
			if (V.PC.vagina !== -1) {
				r.push(`If ${he} thought that was it, ${he}'s soon corrected: you hike yourself up further, and grind your pussy against ${his} face.`);
			}
		} else {
			r.push(`${He} has absolutely no control over how hard you grind your cunt against ${his} face, so you are careful not to suffocate ${him}. Even so, you take ${him} to the edge, enjoying the sight of ${his} absurd rear jiggling as ${he} struggles to breathe. Eventually you climax, giving ${him} a good`);
			if (canTaste(slave)) {
				r.push(`taste`);
			} else {
				r.push(`dose`);
			}
			r.push(`of your femcum.`);
		}
	} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && slave.dick !== 0 && V.PC.dick !== 0) {
		r.push(`${He} comes over eagerly, with hunger`);
		if (canSee(slave)) {
			r.push(`in ${his} eyes.`);
		} else {
			r.push(`on ${his} face.`);
		}
		r.push(`${He} gets to`);
		if (hasBothLegs(slave)) {
			r.push(`${his} knees,`);
		} else {
			r.push(`the floor,`);
		}
		r.push(`hurriedly takes you into ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`mouth, and gives the blowjob ${his} all. As a cumslut ${he}'s almost desperate to get your cum into ${his} mouth and`);
		if (slave.chastityPenis === 1) {
			r.push(`(since ${his} cock is off limits) frantically rubs ${his} nipples and asspussy`);
		} else if (canAchieveErection(slave)) {
			r.push(`jacks ${himself} off`);
		} else {
			r.push(`rubs ${his} sadly limp member`);
		}
		r.push(`in anticipation.`);
		if (V.PC.vagina !== -1) {
			r.push(`You have more than one variety of deliciousness for ${him}, and ${he}'s careful not to neglect your wet cunt.`);
		}
		r.push(`When you finish, ${he} sits back with an ecstatic look on ${his} face and lets your cum rest in ${his} mouth as ${he} climaxes into ${his} ${slave.skin} hand. ${He} pours ${his} own cum from ${his} hand into ${his} mouth so it can mingle with yours.`);
	} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && V.PC.dick !== 0) {
		r.push(`${He} comes over eagerly, with hunger`);
		if (canSee(slave)) {
			r.push(`in ${his} eyes.`);
		} else {
			r.push(`on ${his} face.`);
		}
		r.push(`${He} gets to`);
		if (hasAnyLegs(slave)) {
			r.push(`${his} ${hasBothLegs(slave) ? `knees` : `knee`},`);
		} else {
			r.push(`the ground,`);
		}
		r.push(`hurriedly takes you into ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`mouth, and gives the blowjob ${his} all. As a cumslut ${he}'s almost desperate to get your cum into ${his} mouth and rubs ${himself} in anticipation.`);
		if (V.PC.vagina !== -1) {
			r.push(`You have more than one variety of deliciousness for ${him}, and ${he}'s careful not to neglect your wet cunt.`);
		}
		r.push(`When you finish, ${he} sits back with an ecstatic look on ${his} face and lets your cum rest in ${his} mouth as ${he} climaxes.`);
	} else if (slave.devotion < -20) {
		r.push(`${He} tries to back away, so you`);
		if (V.PC.dick !== 0) {
			if (slave.mouthAccessory === "dildo gag") {
				r.push(`grab ${him}; ${his}`);
				if (V.seeRace === 1) {
					r.push(slave.race);
				}
				r.push(`mouth is already held invitingly open by ${his} gag, and ${he}'s prevented from biting. You push ${him} down to`);
				if (hasAnyLegs(slave)) {
					r.push(`${his} ${hasBothLegs(slave) ? `knees` : `knee`}`);
				} else {
					r.push(`the ground`);
				}
				r.push(`with ${his} head against the couch next to your desk so you can give ${him} a good hard throat fuck. When you cum down ${his} ${slave.skin} throat ${he} retches through ${his} tears.`);
				if (V.PC.vagina !== -1) {
					r.push(`${He} has a mere moment to get ${his} breath back before you press your pussy against ${his} unwilling mouth.`);
				}
			} else if (slave.mouthAccessory === "massive dildo gag") {
				r.push(`grab ${him}; ${his}`);
				if (V.seeRace === 1) {
					r.push(slave.race);
				}
				r.push(`mouth is left agape, unable to close after being forced so widely open for so long, so ${he} is unlikely to bite. You push ${him} down to`);
				if (hasAnyLegs(slave)) {
					r.push(`${his} ${hasBothLegs(slave) ? `knees` : `knee`}`);
				} else {
					r.push(`the ground`);
				}
				r.push(`with ${his} head against the couch next to your desk so you can give ${him} a good hard throat fuck. When you cum down ${his} ${slave.skin} throat ${he} retches through ${his} tears.`);
				if (V.PC.vagina !== -1) {
					r.push(`${He} has a mere moment to get ${his} breath back before you press your pussy against ${his} unwilling mouth.`);
				}
			} else {
				r.push(`grab ${him} and force a ring gag into ${his}`);
				if (V.seeRace === 1) {
					r.push(slave.race);
				}
				r.push(`mouth. Once you have the straps secured behind ${his} head, ${he}'s prevented from biting. You push ${him} down to`);
				if (hasAnyLegs(slave)) {
					r.push(`${his} ${hasBothLegs(slave) ? `knees` : `knee`}`);
				} else {
					r.push(`the ground`);
				}
				r.push(`with ${his} head against the couch next to your desk so you can give ${him} a good hard throat fuck. When you cum down ${his} ${slave.skin} throat ${he} retches through ${his} tears.`);
				if (V.PC.vagina !== -1) {
					r.push(`${He} has a mere moment to get ${his} breath back before you press your pussy against ${his} unwilling mouth.`);
				}
			}
		} else {
			r.push(`seize ${him} and throw ${him} onto the couch face-up, and then kneel on ${him} with your legs on either side of ${his} crying body, so your pussylips are hard against ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`mouth. ${He} desperately eats you out, trying to get you off as fast as possible so ${he} can get a bit more air, but you grind down without mercy, taking your pleasure.`);
		}
	} else if (slave.devotion <= 20) {
		r.push(`${He} comes over reluctantly and begins to`);
		if (V.PC.dick !== 0) {
			r.push(`give you a blowjob. Deciding that ${he} isn't showing the necessary enthusiasm, you hold ${his} head and fuck ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`face instead${(V.PC.vagina !== -1) ? `, occasionally jerking your dick free to shove your pussy against ${his} face instead` : ``}. ${He} does ${his} best to follow your motions but still splutters and gags.`);
			if (random(100) > 50) {
				r.push(`You pull free to cum across ${his} ${slave.skin} face and hair.`);
			} else {
				r.push(`When you feel your climax approaching, you push ${his} head down to come as far down ${his} throat as you can.`);
			}
		} else {
			r.push(`eat you out. Deciding that ${he} isn't showing the necessary enthusiasm, you hold ${his} head and grind your pussy against ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`face instead. ${He} does ${his} best to follow your motions but still splutters and gasps for air. You climax quickly and haul ${him}`);
			if (hasBothLegs(slave)) {
				r.push(`to ${his} feet,`);
			} else {
				r.push(`upright,`);
			}
			r.push(`kissing the bewildered ${girl} full on the mouth. You can taste yourself on ${his} lips.`);
		}
	} else {
		r.push(`${He} licks ${his} lips`);
		if (canSee(slave)) {
			r.push(`and looks you in the eyes`);
		}
		r.push(`as ${he} gets to`);
		if (hasBothLegs(slave)) {
			r.push(`${his} knees.`);
		} else {
			r.push(`the floor.`);
		}
		r.push(He);
		if (V.PC.dick !== 0) {
			r.push(`gives you a long, deep blowjob. ${He} massages your balls`);
			if (V.PC.vagina !== -1) {
				r.push(`and pussy`);
			}
			r.push(`with one hand and ${his} breasts with the other, giving you a show. ${He} sucks your head until you climax, letting your cock pop free of ${his} mouth to shoot pearly cum all across ${his} ${slave.skin} face.`);
		} else {
			r.push(`eats you out like ${he}'s starving, moaning into your pussy to show off ${his} arousal and add to your pleasure. ${He} massages your perineum with one hand and ${his} breasts with the other, giving you a show. ${He} slowly concentrates more and more attention on your clit until you climax convulsively. You pull ${him}`);
			if (hasBothLegs(slave)) {
				r.push(`to ${his} feet,`);
			} else {
				r.push(`upright,`);
			}
			r.push(`kissing the compliant ${girl} full on the mouth. You can taste yourself on ${his} lips.`);
		}
	}

	if (["cosmetic braces", "fang", "fangs", "pointy", "straightening braces"].includes(slave.teeth)) {
		if (slave.skill.oral >= 100) {
			r.push(`${He}'s so orally skilled that ${he} had the confidence to lightly graze you with`);
			if (slave.teeth === "pointy") {
				r.push(`${his} sharp teeth`);
			} else if (slave.teeth === "fangs") {
				r.push(`a fang`);
			} else if (slave.teeth === "fang") {
				r.push(`${his} fang`);
			} else {
				r.push(`${his} braces`);
			}
			r.push(`on occasion, a delightfully scary sensation.`);
		} else if (slave.skill.oral > 30) {
			r.push(`${He}'s sufficiently orally skilled that ${he} managed to accomplish all that without`);
			if (slave.teeth === "pointy") {
				r.push(`${his} sharp teeth`);
			} else if (slave.teeth === "fangs") {
				r.push(`any fangs`);
			} else if (slave.teeth === "fang") {
				r.push(`${his} fang`);
			} else {
				r.push(`${his} braces`);
			}
			r.push(`contacting your`);
			if (V.PC.dick !== 0) {
				r.push(`dick`);
			} else {
				r.push(`pussy`);
			}
			r.push(`once.`);
		} else if (slave.skill.oral > 10) {
			r.push(`With ${his} basic oral skills, ${he} accidentally grazed you with ${his}`);
			if (slave.teeth === "pointy") {
				r.push(`sharp teeth`);
			} else if (slave.teeth === "fangs") {
				r.push(`fangs`);
			} else if (slave.teeth === "fang") {
				r.push(`fang`);
			} else {
				r.push(`braces`);
			}
			r.push(`a few times, leaving your`);
			if (V.PC.dick !== 0) {
				r.push(`dick`);
			} else {
				r.push(`pussy`);
			}
			r.push(`slightly the worse for wear.`);
		} else {
			r.push(`Since ${he} is orally unskilled, you were sporting with your`);
			if (V.PC.dick !== 0) {
				r.push(`dick`);
			} else {
				r.push(`pussy`);
			}
			r.push(`by using ${his} mouth. ${He} did ${his} best to keep ${his}`);
			if (slave.teeth === "pointy") {
				r.push(`sharp teeth off`);
			} else if (slave.teeth === "fangs") {
				r.push(`fangs out of`);
			} else if (slave.teeth === "fang") {
				r.push(`fang out of`);
			} else {
				r.push(`braces off`);
			}
			r.push(`you, but you're bleeding a bit down there.`);
		}
	}

	if (random(1, 100) > (100 + slave.devotion)) {
		if (slave.fetish !== "cumslut" && slave.energy <= 95 && slave.sexualFlaw !== "hates oral") {
			r.push(`Being facefucked by force has given ${him} a <span class="flaw gain">hatred of oral sex.</span>`);
			slave.sexualFlaw = "hates oral";
		}
	} else if (random(1, 100) > (110 - slave.devotion)) {
		if (V.PC.dick !== 0 && slave.fetish === Fetish.NONE && slave.sexualFlaw !== "hates oral") {
			r.push(`Consummating an enjoyable sexual encounter by drinking your cum has <span class="fetish gain">encouraged ${him} to focus on oral sex.</span>`);
			slave.fetish = "cumslut";
			slave.fetishKnown = 1;
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
