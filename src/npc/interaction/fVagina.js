/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fVagina = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself, girl
	} = getPronouns(slave);

	const hands = hasBothArms(slave) ? 'hands' : 'hand';

	r.push(`You call ${him} over so you can`);
	if (slave.vagina >= 10) {
		r.push(`tickle ${his} cavernous hole.`);
	} else if (slave.vagina > 3) {
		r.push(`use ${his} gaping vagina.`);
	} else if (slave.vagina === 3) {
		r.push(`fuck ${his} loose cunt.`);
	} else if (slave.vagina === 2) {
		r.push(`fuck ${his} whorish cunt.`);
	} else if (slave.vagina === 1) {
		r.push(`fuck ${his} tight cunt.`);
	} else if (slave.vagina === 0) {
		r.push(`take ${his} virginity.`);
	}

	if (slave.vaginaTat === "tribal patterns") {
		r.push(`The tattoos on ${his} abdomen certainly drawn attention there.`);
	} else if (slave.vaginaTat === "scenes") {
		r.push(`The tattoos on ${his} abdomen nicely illustrate what you mean to do to ${him}.`);
	} else if (slave.vaginaTat === "degradation") {
		r.push(`The tattoos on ${his} abdomen ask you to, after all.`);
	} else if (slave.vaginaTat === "lewd crest") {
		r.push(`The crest on ${his} abdomen screams debauchery and implores you to use ${him}.`);
	}

	if (slave.devotion <= 20) {
		if (slave.clit === 1 && slave.foreskin) {
			r.push(`${His} big clit peeks out from under its hood.`);
		} else if (slave.clit === 2) {
			r.push(`${His} huge clit is impossible to miss.`);
		} else if (slave.clit > 2) {
			r.push(`${His} pseudophallus-sized clit is soft.`);
		}
		if (slave.labia === 1) {
			r.push(`${His} lovely petals are quite inviting.`);
		} else if (slave.labia === 2) {
			r.push(`${His} prominent petals are inviting.`);
		} else if (slave.labia > 2) {
			r.push(`${His} labia are so large they present a slight obstacle to entry.`);
		}
		if (slave.vaginaLube > 1) {
			r.push(`${He} may not want it, but that doesn't stop ${his} pussy from getting nice and wet for you.`);
		}
	} else {
		if (slave.clit === 1 && slave.foreskin) {
			r.push(`${His} big, hard clit peeks out from under its hood.`);
		} else if (slave.clit === 2) {
			r.push(`${His} huge, stiff clit is impossible to miss.`);
		} else if (slave.clit > 2) {
			r.push(`${His} pseudophallus-sized clit is engorged with arousal.`);
		}
		if (slave.labia === 1) {
			r.push(`${His} lovely petals are moist with arousal.`);
		} else if (slave.labia === 2) {
			r.push(`${His} prominent petals bear a sheen of arousal.`);
		} else if (slave.labia > 2) {
			r.push(`${His} huge labia are almost dripping with arousal.`);
		}
		if (slave.vaginaLube > 1) {
			r.push(`A steady stream of lube leaks from ${his} pussy in preparation to receive you.`);
		}
	}

	if (slave.piercing.vagina.weight > 1) {
		if (slave.vagina !== -1) {
			r.push(`${His} pierced lips and clit have ${him} nice and wet.`);
		}
		if (slave.dick !== 0) {
			r.push(`Metal glints all up and down ${his} cock.`);
		}
	} else if (slave.piercing.vagina.weight === 1) {
		if (slave.vagina !== -1) {
			r.push(`${His} pierced clit has ${him} nice and moist.`);
		}
		if (slave.dick !== 0) {
			r.push(`Metal glints at the head of ${his} cock.`);
		}
	}
	let fPosition;
	let fSpeed;
	if (V.PC.pregMood === 2 && V.PC.preg >= 28) {
		fPosition = either(50, 50, 50, 90);
		fSpeed = 90;
	} else if (V.PC.pregMood === 1 && V.PC.preg >= 28) {
		fPosition = random(1, 40);
		fSpeed = 10;
	} else if (V.PC.belly >= 3000) {
		fPosition = random(1, 80);
		fSpeed = random(1, 75);
	} else {
		fPosition = random(1, 100);
		fSpeed = random(1, 100);
	}

	if (canMove(slave) && slave.fetish !== Fetish.MINDBROKEN) {
		r.push(`You decide to fuck ${him}`);
		if (fPosition <= 20) {
			r.push(`in the missionary position`);
			if (slave.bellyPreg >= 600000) {
				r.push(r.pop() + `, a position that will be a challenge due to ${his} immense pregnancy.`);
			} else if (slave.belly >= 600000) {
				r.push(r.pop() + `, a position that will be a challenge due to ${his} immense stomach.`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(r.pop() + `, a position that will be difficult due to ${his} massive pregnancy.`);
			} else if (slave.belly >= 300000) {
				r.push(r.pop() + `, a position that will be difficult due to ${his} massive stomach.`);
			} else if (slave.belly+V.PC.belly >= 20000 && slave.belly >= 1500 && V.PC.belly >= 1500) {
				r.push(r.pop() + `, a position that will be difficult with the combined size of your rounded middles.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(`You tell ${him} to lie down on the couch next to your desk.`);
		} else if (fPosition <= 40) {
			r.push(`in the cowgirl position`);
			if (slave.bellyPreg >= 600000) {
				r.push(r.pop() + `, a position that will smother you with ${his} immense pregnancy.`);
			} else if (slave.belly >= 600000) {
				r.push(r.pop() + `, a position that will smother you with ${his} immense stomach.`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(r.pop() + `, a position that will allow you to tease ${his} massive pregnancy as you fuck ${him}.`);
			} else if (slave.belly >= 300000) {
				r.push(r.pop() + `, a position that will allow you to tease ${his} massive belly as you fuck ${him}.`);
			} else if (slave.belly+V.PC.belly >= 20000 && slave.belly >= 1500 && V.PC.belly >= 1500) {
				r.push(r.pop() + `, a position that will be awkward with the combined size of your rounded middles.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(`You lie on the couch beside your desk and tell ${him} to straddle you, facing towards you.`);
		} else if (fPosition <= 60) {
			r.push(`doggy-style. You tell ${him} to get on the couch beside your desk on ${his}`);
			if (hasAnyArms(slave)) {
				r.push(hasBothArms(slave) ? `hands` : `hand`);
				if (hasAnyLegs(slave)) {
					r.push(`and`);
				}
			}
			if (hasAnyLegs(slave)) {
				r.push(hasBothLegs(slave) ? `knees` : `knee`);
			}
			r.push(r.pop() + `.`);
			if (slave.bellyPreg >= 600000) {
				r.push(`As ${he} struggles to fit on the couch, you tell ${him} to just lean over ${his} immense pregnancy instead.`);
			} else if (slave.belly >= 600000) {
				r.push(`As ${he} struggles to fit on the couch, you tell ${him} to just lean over ${his} immense belly instead.`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(`A position that leaves ${his} rear high in the air thanks to ${his} massive pregnancy.`);
			} else if (slave.belly >= 300000) {
				r.push(`A position that leaves ${his} rear high in the air thanks to ${his} massive stomach.`);
			}
			if (V.PC.belly >= 5000) {
				r.push(`${His} back will make a good rest for your gravid middle.`);
			}
		} else if (fPosition <= 80) {
			r.push(`in the reverse cowgirl position`);
			if (slave.bellyPreg >= 600000) {
				r.push(r.pop() + `, a position that will be much more comfortable for ${his} immense pregnancy and won't crush you under its mass.`);
			} else if (slave.belly >= 600000) {
				r.push(r.pop() + `, a position that will be much more comfortable for ${his} immense belly and won't crush you under its mass.`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(r.pop() + `, a position that will be much more comfortable for ${his} massive pregnancy.`);
			} else if (slave.belly >= 300000) {
				r.push(r.pop() + `, a position that will be much more comfortable for ${his} massive belly.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(`You lie on the couch beside your desk and tell ${him} to straddle you facing away from you.`);
		} else {
			r.push(`in the wheelbarrow position. You tell ${him} to get on the couch beside your desk, stand next to ${him} and lift ${his} legs up into the air.`);
			if (slave.bellyPreg >= 600000) {
				r.push(`${His} pregnancy is so immense it reaches the floor even as you hold ${him}, saving you the trouble of bearing its weight.`);
			} else if (slave.belly >= 600000) {
				r.push(`${His} belly is so immense it reaches the floor even as you hold ${him}, saving you the trouble of bearing its weight.`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(`You hope you don't strain something supporting ${his} massive pregnancy.`);
			} else if (slave.belly >= 300000) {
				r.push(`You hope you don't strain something supporting ${his} massive belly.`);
			}
		}
	}

	if (slave.vagina === 0 && canDoVaginal(slave)) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} accepts your orders dumbly and presents ${his} virgin pussy for defloration${(V.PC.dick === 0) ? `, watching without real interest as you don a strap-on` : ``}. Since ${he} is mindbroken, <span class="virginity loss">losing ${his} virginity</span> has no impact on any part of ${him} other than ${his} vagina.`);
		} else if (slave.devotion > 20) {
			r.push(`${He} accepts your orders without comment and presents ${his} virgin pussy for defloration${(V.PC.dick === 0) ? `, watching with some small trepidation as you don a strap-on` : ``}. You gently ease into ${his} pussy before gradually increasing the intensity of your thrusts into ${him}. Before long, ${he}'s moaning loudly as you pound away. Since ${he} is already well broken, this new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} pussy has been broken in.</span> ${He} looks forward to having ${his} pussy fucked by you again.`);
			slave.devotion += 10;
		} else if (slave.devotion >= -20) {
			r.push(`${He} is clearly unhappy at losing ${his} pearl of great price to you; this probably isn't what ${he} imagined ${his} first real sex would be like.`);
			if (V.PC.dick === 0) {
				r.push(`${His} lower lip quivers with trepidation as ${he} watches you don a strap-on and maneuver to fuck ${his} virgin hole.`);
			}
			r.push(`You gently ease into ${his} pussy before gradually increasing the intensity of your thrusts into ${him}. Before long, ${he}'s moaning as you pound away. Nevertheless, this new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} pussy has been broken in,</span> and ${he} is <span class="trust dec">fearful</span> that sex will continue to be painful.`);
			slave.devotion += 4;
			slave.trust -= 4;
		} else {
			r.push(`As you anticipated, ${he} refuses to give you ${his} virginity. And as you expected, ${he} is unable to resist you. ${He} cries as`);
			if (V.PC.dick === 0) {
				r.push(`your strap-on`);
			} else {
				r.push(`your cock`);
			}
			r.push(`opens ${his} fresh, tight hole. You force your way into ${his} pussy and continue thrusting into ${him}. ${He} sobs and cries with horror as you pound away. The rape <span class="devotion dec">decreases ${his} devotion to you.</span> <span class="virginity loss">${His} pussy has been broken in,</span> and ${he} <span class="trust dec">fears further abuse.</span>`);
			slave.devotion -= 4;
			slave.trust -= 4;
		}
		slave.vagina++;
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`Since ${his} mind is gone, ${he}'s yours to use as a human sex doll. You throw ${him} over the couch and amuse yourself with ${him} for a while; ${his} body retains its instinctual responses, at least. You finish inside ${him} and leave your toy for one of your other slaves to clean and maintain.`);
	} else if (isAmputee(slave)) {
		r.push(`Since ${he}'s a quadruple amputee, ${he}'s yours to use as a human sex toy. You set ${him}`);
		if (V.PC.dick !== 0) {
			if (slave.belly >= 300000) {
				r.push(`atop ${his} massive stomach and`);
				if (fSpeed > 75) {
					r.push(`fuck ${him} hard and fast,`);
				} else if (fSpeed > 50) {
					r.push(`fuck ${him} firmly and vigorously,`);
				} else if (fSpeed > 25) {
					r.push(`fuck ${him} steadily and controlled,`);
				} else {
					r.push(`fuck ${him} slowly and tenderly,`);
				}
				r.push(`managing ${him} with your arms as you go.`);
			} else {
				r.push(`atop your cock and slide ${him} up and down,`);
				if (fSpeed > 75) {
					r.push(`hard and fast,`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously,`);
				} else if (fSpeed > 25) {
					r.push(`steadily and controlled,`);
				} else {
					r.push(`slowly and tenderly,`);
				}
				r.push(`managing ${him} with your arms.`);
			}
			if (slave.dick > 0) {
				if (slave.chastityPenis === 1) {
					r.push(`${His} dick chastity keeps ${his} useless bitchclit out of the way.`);
				} else if (!canAchieveErection(slave)) {
					r.push(`As you use ${him} as a helpless cock jacket, ${his}`);
					if (slave.dick < 7) {
						r.push(`flaccid dick flops around, ignored.`);
					} else {
						r.push(`massive dick flops against you, no longer able to get hard.`);
					}
				} else {
					r.push(`As you use ${him} as a helpless cock jacket, your pounding keeps ${his} prick stiff.`);
				}
			}
			r.push(`You finish inside ${him} and leave your toy for one of your other slaves to clean and maintain.`);
		} else {
			r.push(`on the couch and straddle ${his} hips, bringing your already-wet pussy`);
			if (fSpeed > 75) {
				r.push(`hard against ${him}. You grind powerfully`);
			} else if (fSpeed > 50) {
				r.push(`firmly against ${him}. You grind vigorously`);
			} else if (fSpeed > 25) {
				r.push(`against ${him}. You grind steadily`);
			} else {
				r.push(`softly against ${him}. You grind gently`);
			}
			r.push(`against ${his} helpless body, using ${him} as a living sybian until ${his} warmth and movement brings you to orgasm.`);
		}
	} else if (tooBigBelly(slave)) {
		r.push(`You tell ${him} to get situated on the couch, face-down. This position pins ${him} down by the massive weight of ${his} belly, pushing ${his} face in amongst the cushions and keeping ${his} crotch in the ideal position to penetrate. ${His} belly serves as an anchor, allowing you to take ${him} doggy style without any real contribution from ${him}. The position muffles ${his} reaction entirely, other than the rhythmic jiggling of ${his} bulging belly as it sticks out from either side of ${his} torso as you`);
		if (fSpeed > 75) {
			r.push(`pound ${him} hard and fast.`);
		} else if (fSpeed > 50) {
			r.push(`pound ${him} firmly and vigorously.`);
		} else if (fSpeed > 25) {
			r.push(`fuck ${him} steadily.`);
		} else {
			r.push(`fuck ${him} slowly and tenderly.`);
		}
	} else if (tooBigBreasts(slave)) {
		r.push(`You tell ${him} to get situated on the couch, face-down. This position pins ${him} down by the massive weight of ${his} tits, pushing ${his} face in amongst the cushions. ${His} tits serve as an anchor, allowing you to take ${him} doggy style without any real contribution from ${him}. The position muffles ${his} reaction entirely, other than the rhythmic jiggling of the breastflesh that sticks out to either side of ${his} torso as you`);
		if (fSpeed > 75) {
			r.push(`pound ${him} hard and fast.`);
		} else if (fSpeed > 50) {
			r.push(`pound ${him} firmly and vigorously.`);
		} else if (fSpeed > 25) {
			r.push(`fuck ${him} steadily.`);
		} else {
			r.push(`fuck ${him} slowly and tenderly.`);
		}
	} else if (tooBigButt(slave)) {
		r.push(`You tell ${him} to get situated on the couch, face-up. This position pins ${him} down by the massive weight of ${his} rear, causing ${him} to sink into the cushions. ${His} ass serves as an anchor, allowing you to take ${him} in the missionary position without any real contribution from ${him}. This lets you clearly see ${his} reaction, as well as the rhythmic jiggling of the buttflesh that sticks out to either side of ${his} hips as you`);
		if (fSpeed > 75) {
			r.push(`pound ${him} hard and fast.`);
		} else if (fSpeed > 50) {
			r.push(`pound ${him} firmly and vigorously.`);
		} else if (fSpeed > 25) {
			r.push(`fuck ${him} steadily.`);
		} else {
			r.push(`fuck ${him} slowly and tenderly.`);
		}
	} else if (tooBigBalls(slave)) {
		r.push(`You tell ${him} to get situated on the couch, doggy style. This position pins ${him} down by the massive weight of ${his} balls. ${His} testicles serve as an anchor, allowing you to take ${him} doggy style without any real concern of getting struck by ${his} massive nuts. The position keeps ${his} balls completely still where they rest on the couch, so you don't have to worry about them getting in the way as you`);
		if (fSpeed > 75) {
			r.push(`pound ${him} hard and fast.`);
		} else if (fSpeed > 50) {
			r.push(`pound ${him} firmly and vigorously.`);
		} else if (fSpeed > 25) {
			r.push(`fuck ${him} steadily.`);
		} else {
			r.push(`fuck ${him} slowly and tenderly.`);
		}
	} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60 && slave.fetishKnown === 1 && V.PC.dick !== 0) {
		r.push(`${He} comes over, smiling a little submissive smile, and spreads ${himself} for you. You take ${him} on the couch next to your desk after ${he} gets into position.`);
		if (fPosition <= 20) { // missionary
			if (slave.bellyPreg >= 600000) {
				if (V.PC.belly >= 5000) {
					r.push(`You have to heft ${his} gravid body up and slip under ${his} expansive middle to position yourself for penetration. With your own baby bump in the way, it's a complicated maneuver, but once you manage to get in, you rest your head against ${his} bulging belly and feel the movements within as you thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`into ${him};`);
				} else {
					r.push(`You have to heft ${his} gravid body up and slip under ${his} expansive middle to position yourself for penetration. But once you are seated, you rest your head against ${his} bulging belly and feel the movements within as you thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`into ${him};`);
				}
			} else if (slave.belly >= 600000) {
				if (V.PC.belly >= 5000) {
					r.push(`You have to heft ${his} weighty body up and slip under ${his} expansive middle to position yourself for penetration. With your own gravid swell in the way, it's a complicated maneuver, but once you manage to get in, you rest your head against ${his} immense belly and feel the force of your`);
					if (fSpeed > 75) {
						r.push(`fast, hard`);
					} else if (fSpeed > 50) {
						r.push(`vigorous, firm`);
					} else if (fSpeed > 25) {
						r.push(`steady`);
					} else {
						r.push(`slow, tender`);
					}
					r.push(`thrusts running through ${him};`);
				} else {
					r.push(`You have to heft ${his} weighty body up and slip under ${his} expansive middle to position yourself for penetration. But once you are seated, you rest your head against ${his} immense belly and feel the force of your`);
					if (fSpeed > 75) {
						r.push(`fast, hard`);
					} else if (fSpeed > 50) {
						r.push(`vigorous, firm`);
					} else if (fSpeed > 25) {
						r.push(`steady`);
					} else {
						r.push(`slow, tender`);
					}
					r.push(`thrusts running through ${him};`);
				}
			} else if (slave.bellyPreg >= 300000) {
				r.push(`You have to heft ${his} gravid body up to position yourself for penetration. But once you are mounted, you rest your head against ${his} bulging belly and feel the movements within as you thrust`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`into ${him};`);
			} else if (slave.belly >= 300000) {
				r.push(`You have to heft ${his} weighty body up to position yourself for penetration. But once you are mounted, you rest your head against ${his} massive stomach and feel the force of your`);
				if (fSpeed > 75) {
					r.push(`fast, hard`);
				} else if (fSpeed > 50) {
					r.push(`vigorous, firm`);
				} else if (fSpeed > 25) {
					r.push(`steady`);
				} else {
					r.push(`slow, tender`);
				}
				r.push(`thrusts running through ${him};`);
			} else {
				r.push(`${He} hugs ${his} torso to you and`);
				if (slave.belly+V.PC.belly >= 20000 && slave.belly >= 1500 && V.PC.belly >= 1500) {
					r.push(`your bellies bulge lewdly against each other;`);
				} else if (slave.belly >= 5000) {
					r.push(`pushes ${his} belly against your stomach;`);
				} else if (V.PC.belly >= 5000) {
					r.push(`pushes your belly into ${his} stomach;`);
				} else if (V.PC.boobs >= 1400) {
					r.push(`${his} breasts press against your own enormous,`);
					if (V.PC.boobsImplant/V.PC.boobs >= .60) {
						r.push(`hard`);
					} else {
						r.push(`soft`);
					}
					r.push(`breasts;`);
				} else if (V.PC.boobs >= 1200) {
					r.push(`${his} breasts press against your own huge,`);
					if (V.PC.boobsImplant/V.PC.boobs >= .60) {
						r.push(`firm`);
					} else {
						r.push(`soft`);
					}
					r.push(`breasts;`);
				} else if (V.PC.boobs >= 1000) {
					r.push(`${his} breasts press against your own big${(V.PC.boobsImplant/V.PC.boobs >= .60) ? `, perky` : ``} breasts;`);
				} else if (V.PC.boobs >= 800) {
					r.push(`${his} breasts press against your own generous breasts;`);
				} else if (V.PC.boobs >= 650) {
					r.push(`${his} breasts press against your own breasts;`);
				} else if (V.PC.boobs >= 500) {
					r.push(`${his} breasts press against your own average breasts;`);
				} else if (V.PC.boobs >= 300) {
					r.push(`${his} breasts press against your own small breasts;`);
				} else if (V.PC.title === 0) {
					r.push(`${his} breasts press against your flat breasts;`);
				} else {
					r.push(`${his} breasts press against your chest;`);
				}
			}
		} else if (fPosition <= 40) { // cowgirl
			if (slave.bellyPreg >= 600000) {
				r.push(`You wrap your arms around ${his} boundless pregnancy as you thrust`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`into ${him} and enjoy the feeling of so much movement squirming against your face;`);
			} else if (slave.belly >= 600000) {
				r.push(`You wrap your arms around ${his} boundless stomach as you thrust`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`into ${him} and enjoy the feeling of your every move running through ${his} belly;`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(`${He} does ${his} best to not suffocate you with ${his} massive belly or knock you out with it as you thrust`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`into ${him}. You get a face full of pregnancy with each downward motion;`);
			} else if (slave.belly >= 300000) {
				r.push(`${He} does ${his} best to not suffocate you with ${his} massive belly or knock you out with it as you thrust`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`into ${him}. You get a face full of implant with each downward motion;`);
			} else {
				r.push(`${He}`);
				if (hasAnyArms(slave)) {
					r.push(`puts ${his} ${hands} on your chest and`);
				}
				r.push(`leans forward as you continue to thrust`);
				if (fSpeed > 75) {
					r.push(`hard`);
				} else if (fSpeed > 50) {
					r.push(`vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`tenderly`);
				}
				r.push(`upwards;`);
			}
		} else if (fPosition <= 60) { // doggy-style
			if (slave.bellyPreg >= 300000) {
				r.push(`${He} arches ${his} back as you continue to pound ${him}`);
				if (fSpeed > 75) {
					r.push(`hard and fast,`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously,`);
				} else if (fSpeed > 25) {
					r.push(`steadily,`);
				} else {
					r.push(`slowly and tenderly,`);
				}
				r.push(`${his} occupants enjoying the attention. As you rest your weight on ${him}, you run your hands along ${his} distended sides;`);
			} else if (slave.belly >= 300000) {
				r.push(`${He} arches ${his} back as you continue to pound ${him}`);
				if (fSpeed > 75) {
					r.push(`hard and fast,`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously,`);
				} else if (fSpeed > 25) {
					r.push(`steadily,`);
				} else {
					r.push(`slowly and tenderly,`);
				}
				r.push(`${his} belly jiggling just slightly with each thrust. As you rest your weight on ${him}, you run your hands along ${his} distended sides;`);
			} else {
				r.push(`${He} arches ${his} back as you continue to pound ${him}`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
			}
		} else if (fPosition <= 80) { // reverse cowgirl
			if (slave.bellyPreg >= 300000) {
				r.push(`You may have to spread your legs extra wide to accommodate ${his} impressive baby bump, but the angle and pressure it puts on you feels amazing. ${He}`);
				if (hasAnyArms(slave)) {
					r.push(`puts ${his} ${hands} on your chest and`);
				}
				r.push(`starts to lean back as you continue to thrust`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`upwards, in return you caress ${his} distended sides;`);
			} else if (slave.belly >= 300000) {
				r.push(`You may have to spread your legs extra wide to accommodate ${his} impressive belly, but the angle and pressure it puts on you feels amazing. ${He}`);
				if (hasAnyArms(slave)) {
					r.push(`puts ${his} ${(hasBothArms(slave)) ? "hands" : "hand"} on your chest and`);
				}
				r.push(`starts to lean back as you continue to thrust`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`upwards, in return you caress ${his} distended sides;`);
			} else {
				r.push(`${He}`);
				if (hasAnyArms(slave)) {
					r.push(`puts ${his} ${hands} on your chest and`);
				}
				r.push(`starts to lean back as you continue to thrust`);
				if (fSpeed > 75) {
					r.push(`hard and fast`);
				} else if (fSpeed > 50) {
					r.push(`firmly and vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`upwards;`);
			}
		} else { // wheelbarrow
			if (slave.belly >= 600000) {
				r.push(`With all ${his} weight handled, you can keep`);
				if (fSpeed > 75) {
					r.push(`furiously`);
				} else if (fSpeed > 50) {
					r.push(`vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`pounding without your arms getting tired;`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(`Before long both of your strength begins to wane, causing ${his} belly to touch the floor. With some of the weight off of the both of you, you keep on`);
				if (fSpeed > 75) {
					r.push(`furiously`);
				} else if (fSpeed > 50) {
					r.push(`vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`pounding;`);
			} else if (slave.belly >= 300000) {
				r.push(`Before long both of your strength begins to wane, causing ${his} belly to touch the floor. With some of the weight off of the both of you, you keep on`);
				if (fSpeed > 75) {
					r.push(`furiously`);
				} else if (fSpeed > 50) {
					r.push(`vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`pounding;`);
			} else {
				r.push(`${He} begins to tire as you keep`);
				if (fSpeed > 75) {
					r.push(`furiously`);
				} else if (fSpeed > 50) {
					r.push(`vigorously`);
				} else if (fSpeed > 25) {
					r.push(`steadily`);
				} else {
					r.push(`slowly and tenderly`);
				}
				r.push(`pounding;`);
			}
		}
		r.push(`you can feel`);
		if (slave.bellyPreg >= 300000) {
			r.push(`${his} ${onlyPlural(slave.pregType, 'child', 'children')} begin to squirm in reaction to their mother's lust.`);
		} else {
			r.push(`${his} heart beating hard.`);
		}
		r.push(`As the sex reaches its climax, ${he} begs you to cum inside ${his} unworthy body.`);
		if (slave.dick !== 0 && canAchieveErection(slave)) {
			if (slave.chastityPenis === 1) {
				r.push(`${He} does ${his} submissive best to stay completely soft within ${his} dick chastity.`);
			} else {
				r.push(`As a submissive ${he} spares no attention for ${his} own orgasm, so ${his} rock hard erection swings untended.`);
			}
		} else if (slave.chastityPenis === 1) {
			r.push(`${His} cock is forgotten inside its chastity cage as you take what you want from ${him}.`);
		} else if (slave.dick !== 0) {
			r.push(`As a submissive ${he} spares no attention for ${his} own orgasm, so ${his} flaccid cock swings untended.`);
		}
		if (V.PC.vagina !== -1) {
			r.push(`When you finally climax, you pull out and press your wet cunt against ${his} mouth, letting ${his} lavish attention on you that brings you to another quick orgasm.`);
			seX(slave, "oral", V.PC, "penetrative");
		}
	} else if (slave.devotion < -20) {
		r.push(`${He} tries to refuse, so you`);
		if (V.PC.dick !== 0) {
			r.push(`bend the disobedient slave over your desk and take ${him} hard from behind. ${His} breasts`);
			if (slave.dick !== 0) {
				r.push(`and cock`);
			}
			r.push(`slide back and forth across the desk. You give ${his} buttocks some nice hard swats as you pound ${him}. ${He} grunts and moans but knows better than to try to get away.`);
			if (slave.dick !== 0 && canAchieveErection(slave)) {
				r.push(`Despite ${his} unwillingness to be raped, the stimulation`);
				if (slave.chastityPenis) {
					r.push(`starts to give ${him} an erection, which ${his} dick chastity makes horribly uncomfortable. ${He} bucks with the pain, ${his} hole spasming delightfully.`);
				} else {
					r.push(`gives ${him} an erection. ${He}'s mortified that ${he} would get hard while being raped.`);
				}
			} else if (slave.chastityPenis === 1) {
				r.push(`${His} dick chastity keeps ${his} bitch cock hidden away while you use ${his} whore hole.`);
			} else if (slave.dick !== 0) {
				r.push(`${His} flaccid dick is ground into the back of the couch as you rape ${him}.`);
			}
			if (V.PC.vagina !== -1) {
				r.push(`After your first orgasm, you pull out and grind your pussy against ${his} face for another, enjoying the stimulation of ${his} muffled crying.`);
				seX(slave, "oral", V.PC, "penetrative");
			}
		} else {
			r.push(`stand and seize ${him}, shoving ${him} down to sit in your chair. You jump atop ${his} hips, pinning ${him} down into the chair with your legs and pressing your pussy hard against ${his} groin. ${He} struggles and whimpers, but you give ${him} a hard warning slap to the cheek and kiss ${his} unwilling mouth, forcing your tongue past ${his} lips as you grind against ${him}.`);
		}
	} else if (slave.devotion <= 20) {
		if (V.PC.dick !== 0) {
			r.push(`${He} obeys, lying on the couch next to your desk`);
			if (hasAnyLegs(slave)) {
				r.push(`with ${his} ${hasBothLegs(slave) ? `legs spread` : `leg moved aside`}`);
			}
			r.push(r.pop() + `.`);
			r.push(`You kneel on the ground and enter ${him}${hasAnyLegs(slave) ? `, a hand on` : ``}`);
			if (hasAnyLegs(slave)) {
				if (hasBothLegs(slave)) {
					r.push(`each of ${his} legs`);
				} else {
					r.push(`${his} leg`);
				}
				r.push(`to give you a good grip`);
			}
			r.push(r.pop() + `.`);
			if (fSpeed > 75) {
				r.push(`The pounding is hard and fast,`);
			} else if (fSpeed > 50) {
				r.push(`You pound ${him} firmly and vigorously,`);
			} else if (fSpeed > 25) {
				r.push(`You fuck ${him} steadily and controlled,`);
			} else {
				r.push(`You fuck ${him} slowly and tenderly,`);
			}
			r.push(`and ${he} gasps and`);
			if (fSpeed > 50) {
				r.push(`whines.`);
			} else {
				r.push(`moans.`);
			}
			r.push(`You reach a hand down to maul ${his} breasts.`);
			if (slave.dick !== 0 && canAchieveErection(slave)) {
				if (slave.chastityPenis === 1) {
					r.push(`${He} enjoys ${himself}, even though ${his} dick chastity keeps ${him} soft by making the beginnings of erection very uncomfortable.`);
				} else {
					r.push(`${He} bites ${his} lip and moans as ${he} climaxes. You fill ${his} squeezing fuckhole with your cum. ${He} already dribbled ${his} own weak load all over ${his} stomach.`);
				}
			} else if (slave.chastityPenis === 1) {
				r.push(`${He} bites ${his} lip and moans as ${he} climaxes. You fill ${his} squeezing fuckhole with your cum. Precum has been dribbling out of ${his} dick chastity for some time, apparently the best ${his} soft bitchclit can manage.`);
			} else if (slave.dick !== 0) {
				r.push(`${He} bites ${his} lip and moans as ${he} climaxes. You fill ${his} squeezing fuckhole with your cum. ${He} already blew ${his} own load all over ${his} stomach despite ${his} inability to get hard.`);
			}
			if (V.PC.vagina !== -1) {
				r.push(`You got so wet fucking ${him} that when you climax, you stand up and let ${him} clean your pussy with ${his} mouth. The oral attention brings you to a quick aftershock orgasm.`);
				seX(slave, "oral", V.PC, "penetrative");
			}
		} else {
			r.push(`You pat the tops of your thighs, and ${he} obediently comes over to sit atop them, wrapping ${his} legs around you. Your hands reach around ${him} and seize ${his} buttocks, drawing ${him} in even closer so that the warmth between ${his} legs is pressed hard against your pussy. ${He} grinds dutifully against you, only pausing for a moment when ${he} finds your insistent tongue probing past ${his} lips.`);
		}
	} else {
		if (V.PC.dick !== 0) {
			r.push(`${He} skips over smiling and gives you a quick kiss. You take ${him} on the couch next to your desk after ${he} gets into position.`);
			if (fPosition <= 20) { // missionary
				if (slave.bellyPreg >= 600000) {
					if (V.PC.belly >= 5000) {
						r.push(`You have to heft ${his} gravid body up and slip under ${his} expansive middle to position yourself for penetration. With your own baby bump in the way, it's a complicated maneuver, but once you manage to get in, you rest your head against ${his} bulging belly and feel the movements within as you thrust`);
						if (fSpeed > 75) {
							r.push(`hard and fast`);
						} else if (fSpeed > 50) {
							r.push(`firmly and vigorously`);
						} else if (fSpeed > 25) {
							r.push(`steadily`);
						} else {
							r.push(`slowly and tenderly`);
						}
						r.push(`into ${him};`);
					} else {
						r.push(`You have to heft ${his} gravid body up and slip under ${his} expansive middle to position yourself for penetration. But once you are seated, you rest your head against ${his} bulging belly and feel the movements within as you thrust`);
						if (fSpeed > 75) {
							r.push(`hard and fast`);
						} else if (fSpeed > 50) {
							r.push(`firmly and vigorously`);
						} else if (fSpeed > 25) {
							r.push(`steadily`);
						} else {
							r.push(`slowly and tenderly`);
						}
						r.push(`into ${him};`);
					}
				} else if (slave.belly >= 600000) {
					if (V.PC.belly >= 5000) {
						r.push(`You have to heft ${his} weighty body up and slip under ${his} expansive middle to position yourself for penetration. With your own gravid swell in the way, it's a complicated maneuver, but once you manage to get in, you rest your head against ${his} immense belly and feel the force of your`);
						if (fSpeed > 75) {
							r.push(`fast, hard`);
						} else if (fSpeed > 50) {
							r.push(`vigorous, firm`);
						} else if (fSpeed > 25) {
							r.push(`steady`);
						} else {
							r.push(`slow, tender`);
						}
						r.push(`thrusts running through ${him};`);
					} else {
						r.push(`You have to heft ${his} weighty body up and slip under ${his} expansive middle to position yourself for penetration. But once you are seated, you rest your head against ${his} immense belly and feel the force of your`);
						if (fSpeed > 75) {
							r.push(`fast, hard`);
						} else if (fSpeed > 50) {
							r.push(`vigorous, firm`);
						} else if (fSpeed > 25) {
							r.push(`steady`);
						} else {
							r.push(`slow, tender`);
						}
						r.push(`thrusts running through ${him};`);
					}
				} else if (slave.bellyPreg >= 300000) {
					r.push(`You have to heft ${his} gravid body up to position yourself for penetration. But once you are mounted, you rest your head against ${his} bulging belly and feel the movements within as you thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`into ${him};`);
				} else if (slave.belly >= 300000) {
					r.push(`You have to heft ${his} weighty body up to position yourself for penetration. But once you are mounted, you rest your head against ${his} massive stomach and feel the force of your`);
					if (fSpeed > 75) {
						r.push(`fast, hard`);
					} else if (fSpeed > 50) {
						r.push(`vigorous, firm`);
					} else if (fSpeed > 25) {
						r.push(`steady`);
					} else {
						r.push(`slow, tender`);
					}
					r.push(`thrusts running through ${him};`);
				} else {
					r.push(`${He} hugs ${his} torso to you and`);
					if (slave.belly+V.PC.belly >= 20000 && slave.belly >= 1500 && V.PC.belly >= 1500) {
						r.push(`your bellies bulge lewdly against each other;`);
					} else if (slave.belly >= 5000) {
						r.push(`pushes ${his} belly against your stomach;`);
					} else if (V.PC.belly >= 5000) {
						r.push(`pushes your belly into ${his} stomach;`);
					} else if (V.PC.boobs >= 1400) {
						r.push(`${his} breasts press against your own enormous,`);
						if (V.PC.boobsImplant/V.PC.boobs >= .60) {
							r.push(`hard`);
						} else {
							r.push(`soft`);
						}
						r.push(`breasts;`);
					} else if (V.PC.boobs >= 1200) {
						r.push(`${his} breasts press against your own huge,`);
						if (V.PC.boobsImplant/V.PC.boobs >= .60) {
							r.push(`firm`);
						} else {
							r.push(`soft`);
						}
						r.push(`breasts;`);
					} else if (V.PC.boobs >= 1000) {
						r.push(`${his} breasts press against your own big${(V.PC.boobsImplant/V.PC.boobs >= .60) ? `, perky` : ``} breasts;`);
					} else if (V.PC.boobs >= 800) {
						r.push(`${his} breasts press against your own generous breasts;`);
					} else if (V.PC.boobs >= 650) {
						r.push(`${his} breasts press against your own breasts;`);
					} else if (V.PC.boobs >= 500) {
						r.push(`${his} breasts press against your own average breasts;`);
					} else if (V.PC.boobs >= 300) {
						r.push(`${his} breasts press against your own small breasts;`);
					} else if (V.PC.title === 0) {
						r.push(`${his} breasts press against your flat breasts;`);
					} else {
						r.push(`${his} breasts press against your chest;`);
					}
				}
			} else if (fPosition <= 40) { // cowgirl
				if (slave.bellyPreg >= 600000) {
					r.push(`You wrap your arms around ${his} boundless pregnancy as you thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`into ${him} and enjoy the feeling of so much movement squirming against your face;`);
				} else if (slave.belly >= 600000) {
					r.push(`You wrap your arms around ${his} boundless stomach as you thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`into ${him} and enjoy the feeling of your every move running through ${his} belly;`);
				} else if (slave.bellyPreg >= 300000) {
					r.push(`${He} does ${his} best to not suffocate you with ${his} massive belly or knock you out with it as you thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`into ${him}. You get a face full of pregnancy with each downward motion;`);
				} else if (slave.belly >= 300000) {
					r.push(`${He} does ${his} best to not suffocate you with ${his} massive belly or knock you out with it as you thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`into ${him}. You get a face full of implant with each downward motion;`);
				} else {
					r.push(`${He}`);
					if (hasAnyArms(slave)) {
						r.push(`puts ${his} ${hands} on your chest and`);
					}
					r.push(`leans forward as you continue to thrust`);
					if (fSpeed > 75) {
						r.push(`hard`);
					} else if (fSpeed > 50) {
						r.push(`vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`tenderly`);
					}
					r.push(`upwards;`);
				}
			} else if (fPosition <= 60) { // doggy-style
				if (slave.bellyPreg >= 300000) {
					r.push(`${He} arches ${his} back as you continue to pound ${him}`);
					if (fSpeed > 75) {
						r.push(`hard and fast,`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously,`);
					} else if (fSpeed > 25) {
						r.push(`steadily,`);
					} else {
						r.push(`slowly and tenderly,`);
					}
					r.push(`${his} occupants enjoying the attention. As you rest your weight on ${him}, you run your hands along ${his} distended sides;`);
				} else if (slave.belly >= 300000) {
					r.push(`${He} arches ${his} back as you continue to pound ${him}`);
					if (fSpeed > 75) {
						r.push(`hard and fast,`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously,`);
					} else if (fSpeed > 25) {
						r.push(`steadily,`);
					} else {
						r.push(`slowly and tenderly,`);
					}
					r.push(`${his} belly jiggling just slightly with each thrust. As you rest your weight on ${him}, you run your hands along ${his} distended sides;`);
				} else {
					r.push(`${He} arches ${his} back as you continue to pound ${him}`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
				}
			} else if (fPosition <= 80) { // reverse cowgirl
				if (slave.bellyPreg >= 300000) {
					r.push(`You may have to spread your legs extra wide to accommodate ${his} impressive baby bump, but the angle and pressure it puts on you feels amazing. ${He}`);
					if (hasAnyArms(slave)) {
						r.push(`puts ${his} hand ${hands} on your chest and`);
					}
					r.push(`starts to lean back as you continue to thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`upwards, in return you caress ${his} distended sides;`);
				} else if (slave.belly >= 300000) {
					r.push(`You may have to spread your legs extra wide to accommodate ${his} impressive belly, but the angle and pressure it puts on you feels amazing. ${He}`);
					if (hasAnyArms(slave)) {
						r.push(`puts ${his} ${hands} on your chest and`);
					}
					r.push(`starts to lean back as you continue to thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`upwards, in return you caress ${his} distended sides;`);
				} else {
					r.push(`${He}`);
					if (hasAnyArms(slave)) {
						r.push(`puts ${his} ${hands} on your chest and`);
					}
					r.push(`starts to lean back as you continue to thrust`);
					if (fSpeed > 75) {
						r.push(`hard and fast`);
					} else if (fSpeed > 50) {
						r.push(`firmly and vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`upwards;`);
				}
			} else { // wheelbarrow
				if (slave.belly >= 600000) {
					r.push(`With all ${his} weight handled, you can keep`);
					if (fSpeed > 75) {
						r.push(`furiously`);
					} else if (fSpeed > 50) {
						r.push(`vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`pounding without your arms getting tired;`);
				} else if (slave.bellyPreg >= 300000) {
					r.push(`Before long both of your strength begins to wane, causing ${his} belly to touch the floor. With some of the weight off of the both of you, you keep on`);
					if (fSpeed > 75) {
						r.push(`furiously`);
					} else if (fSpeed > 50) {
						r.push(`vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`pounding;`);
				} else if (slave.belly >= 300000) {
					r.push(`Before long both of your strength begins to wane, causing ${his} belly to touch the floor. With some of the weight off of the both of you, you keep on`);
					if (fSpeed > 75) {
						r.push(`furiously`);
					} else if (fSpeed > 50) {
						r.push(`vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`pounding;`);
				} else {
					r.push(`${He} begins to tire as you keep`);
					if (fSpeed > 75) {
						r.push(`furiously`);
					} else if (fSpeed > 50) {
						r.push(`vigorously`);
					} else if (fSpeed > 25) {
						r.push(`steadily`);
					} else {
						r.push(`slowly and tenderly`);
					}
					r.push(`pounding;`);
				}
			}
			r.push(`you can feel`);
			if (slave.bellyPreg >= 300000) {
				r.push(`${his} ${onlyPlural(slave.pregType, 'child', 'children')} begin to squirm in reaction to their mother's lust.`);
			} else {
				r.push(`${his} heart beating hard.`);
			}
			if (fPosition <= 40 && slave.belly+V.PC.belly < 20000) {
				r.push(`As the sex reaches its climax, ${his} kisses grow urgent and passionate.`);
			}
			if (slave.dick !== 0 && canAchieveErection(slave)) {
				if (slave.chastityPenis === 1) {
					r.push(`${He} enjoys ${himself}, even though ${his} dick chastity keeps ${him} soft by making the beginnings of erection very uncomfortable.`);
				} else {
					r.push(`When you orgasm together, ${his} erect cock squirts cum up towards ${his} tits while your cock fills ${him} with cum.`);
				}
			} else if (slave.chastityPenis === 1) {
				r.push(`${He} bites ${his} lip and moans as ${he} climaxes. You fill ${his} squeezing fuckhole with your cum. Precum has been dribbling out of ${his} dick chastity for some time, apparently the best ${his} soft bitchclit can manage.`);
			} else if (slave.dick !== 0) {
				r.push(`When you orgasm together, ${his} limp, neglected cock dribbles weakly while your cock fills ${him} with cum.`);
			} else if (slave.clit > 2) {
				r.push(`As you fuck ${him}, ${he} plays with ${his} huge clit. It's so large it almost looks like ${he}'s jacking off a cock.`);
			}
			if (V.PC.vagina !== -1) {
				r.push(`You got so wet fucking ${him} that when you climax, you stand up; ${he} knows what that means, and hurries to eat you out. The oral attention brings you to a quick aftershock orgasm.`);
				seX(slave, "oral", V.PC, "penetrative");
			}
		} else {
			r.push(`You pat the tops of your thighs, and ${he} skips over smiling and gives you a quick kiss. Without breaking the lip lock, ${he} sits down, wrapping ${his} legs around you. Your hands reach around ${him} and seize ${his} buttocks, drawing ${him} in even closer so that the warmth between ${his} legs is pressed hard against your pussy, and you can play with ${his} asshole. ${He} grinds enthusiastically against you, moaning into your mouth with pleasure.`);
		}
	}

	r.push(VCheck.Vaginal(slave, 1));

	if (slave.bellyPreg >= 1500) {
		r.push(`The poor slave's belly gets in the way, but the added perversion of fucking a pregnant hole makes the inconvenience worthwhile.`);
	} else if (slave.bellyImplant >= 1500) {
		r.push(`The poor slave's implant-filled belly gets in the way, but the added perversion of fucking a ${girl} with such a round stomach makes the inconvenience worthwhile.`);
	} else if (slave.bellyFluid >= 1500) {
		r.push(`The poor slave's sloshing belly gets in the way, but the added perversion of seeing it jiggle makes the inconvenience worthwhile.`);
	}

	if (random(1, 100) > (100 + slave.devotion)) {
		if (slave.fetish !== "pregnancy" && slave.energy <= 95 && slave.sexualFlaw !== "hates penetration") {
			r.push(`Being taken by force has given ${him} a <span class="flaw gain">hatred of penetration.</span>`);
			slave.sexualFlaw = "hates penetration";
		}
	} else if (random(1, 100) > (110 - slave.devotion)) {
		if (slave.fetish === Fetish.NONE && slave.energy <= 95 && slave.sexualFlaw !== "hates penetration" && slave.ovaries === 1 || slave.mpreg === 1) {
			r.push(`Enjoying sex with you seems to have <span class="fetish gain">encouraged ${his} biological clock.</span>`);
			slave.fetish = "pregnancy";
			slave.fetishKnown = 1;
			slave.fetishStrength = 10;
		}
	}

	if (V.PC.dick !== 0) {
		if (slave.cervixImplant === 1 || slave.cervixImplant === 3) {
			slave.bellyImplant += random(10, 20);
		}

		if (slave.vagina === 3) {
			r.push(`Cum drips out of ${his} fucked-out hole.`);
		} else if (slave.vagina === 2) {
			r.push(`Cum drips out of ${his} stretched vagina.`);
		} else if (slave.vagina === 1) {
			r.push(`${His} still-tight vagina keeps your load inside ${him}.`);
		} else if (slave.vagina < 0) {
			r.push(`Cum drips out of ${his} girly ass.`);
		} else {
			r.push(`Your cum slides right out of ${his} gaping hole.`);
		}

		if (canMove(slave) && V.postSexCleanUp > 0) {
			r.push(`${He} uses`);
			if (slave.vagina > 0) {
				r.push(`a quick douche to clean ${his}`);
				if (slave.vagina < 2) {
					r.push(`tight`);
				} else if (slave.vagina > 3) {
					r.push(`loose`);
				}
				r.push(`pussy,`);
			} else {
				r.push(`an enema to clean ${his}`);
				if (slave.anus < 2) {
					r.push(`tight`);
				} else if (slave.anus < 3) {
					r.push(`used`);
				} else {
					r.push(`gaping`);
				}
				r.push(`butthole,`);
			}
			switch (slave.assignment) {
				case "work in the brothel":
					r.push(`just like ${he} does between each customer.`);
					break;
				case "serve in the club":
					r.push(`just like ${he} does in the club.`);
					break;
				case "work in the dairy":
					r.push(`to avoid besmirching the nice clean dairy.`);
					break;
				case "work as a farmhand":
					r.push(`to avoid tainting the food in ${V.farmyardName}.`);
					break;
				case "work as a servant":
					r.push(`mostly to keep everything ${he} has to clean from getting any dirtier.`);
					break;
				case "work as a nanny":
					r.push(`before hurrying to continue taking care of the children in ${V.nurseryName}.`);
					break;
				case "whore":
					r.push(`before returning to offering it for sale.`);
					break;
				case "serve the public":
					r.push(`before returning to offering it for free.`);
					break;
				case "rest":
					r.push(`before crawling back into bed.`);
					break;
				case "get milked":
					if (slave.lactation > 0) {
						r.push(`before going to get ${his} uncomfortably milk-filled tits drained.`);
					} else {
						r.push(`and then rests until ${his} balls are ready to be drained again.`);
					}
					break;
				case "be a servant":
					r.push(`since ${his} chores didn't perform themselves while you used ${his} fuckhole.`);
					break;
				case "please you":
					r.push(`before returning to await your next use of ${his} fuckhole, as though nothing had happened.`);
					break;
				case "be a subordinate slave":
					r.push(`though it's only a matter of time before another slave decides to play with ${his} fuckhole.`);
					break;
				case "be your Head Girl":
					r.push(`worried that ${his} charges got up to trouble while ${he} enjoyed ${his} ${getWrittenTitle(slave)}'s use.`);
					break;
				case "guard you":
					r.push(`so ${he} can be fresh and ready for more sexual use even as ${he} guards your person.`);
					break;
				case "be the Schoolteacher":
					r.push(`before ${he} returns to teaching ${his} classes.`);
					break;
				default:
					r.push(`before ${he} returns to ${slave.assignment}.`);
			}
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};

