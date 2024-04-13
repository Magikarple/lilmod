App.Desc.Player.body = function(PC = V.PC) {
	const r = [];

	const averageHeight = Height.mean(PC);

	r.push(
		age(),
		height(),
		`and`,
		weight(),
		muscles(),
		overweight(),
		raceChange(),
		shoulders(),
		limbs(),
		heightImplant()
	);

	return r.join(" ");

	function age() {
		const r = [];
		let ageDifference = '';

		if (PC.actualAge >= 65) {
			if (PC.visualAge > PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look an older ${PC.visualAge},</span> though perhaps it might be time to undo it.`;
			} else if (PC.visualAge < PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look a younger ${PC.visualAge}.</span> If only your body agreed with your looks.`;
			}
			r.push(`You're <span class="orange">${PC.actualAge}</span> and definitely feeling it.`, ageDifference);
		} else if (PC.actualAge >= 50) {
			if (PC.visualAge > PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look an older ${PC.visualAge}.</span>`;
			} else if (PC.visualAge < PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look a younger ${PC.visualAge}.</span>`;
			}
			r.push(`You're <span class="orange">${PC.actualAge}</span> and starting to feel it.`, ageDifference);
		} else if (PC.actualAge >= 35) {
			if (PC.visualAge > PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look an older ${PC.visualAge}</span> and reap the respect that comes with it.`;
			} else if (PC.visualAge < PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look a younger ${PC.visualAge},</span> recapturing your youth.`;
			}
			r.push(`You're <span class="orange">${PC.actualAge}</span> and strong.`, ageDifference);
		} else if (PC.actualAge >= 18) {
			if (PC.visualAge > PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look an older ${PC.visualAge}</span> and reap the respect that comes with it.`;
			} else if (PC.visualAge < PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look a younger ${PC.visualAge},</span> ${PC.visualAge < V.minimumSlaveAge ? "even though society may find your looks uncomfortable" : "since it's never too early to preserve your youth"}.`;
			}
			r.push(`You're <span class="orange">${PC.actualAge}</span> and full of vigor.`, ageDifference);
		} else if (PC.actualAge >= V.minimumSlaveAge) {
			if (PC.visualAge > PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look an older ${PC.visualAge},</span> though it can only do so much given your physique.`;
			} else if (PC.visualAge < PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look a younger ${PC.visualAge},</span> ${PC.visualAge < V.minimumSlaveAge ? "even though society may find your looks uncomfortable" : "since it's never too early to preserve your youth"}.`;
			}
			r.push(`You're <span class="orange">${PC.actualAge}</span> and full of vigor.`, ageDifference);
		} else {
			if (PC.visualAge > PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look an older ${PC.visualAge},</span> ${PC.visualAge >= V.minimumSlaveAge ? "which may be upsetting to potential partners when they discover how old you are" : "though it can only do so much given your physique"}.`;
			} else if (PC.visualAge < PC.actualAge) {
				ageDifference = `You've taken measures to <span class="lime">look a younger ${PC.visualAge},</span> which will likely be disturbing to any partners you might take.`;
			}
			r.push(`You're <span class="orange">${PC.actualAge}</span> and full of vigor, if still underage by society's standards.`, ageDifference);
		}
		if (V.playerAging) {
			r.push(`Your birthday is ${PC.birthWeek === 51 ? `next week` : `in ${num(52 - PC.birthWeek)} weeks`}.`);
		}
		return r.join(" ");
	}

	function height() {
		const r = [];
		const age = PC.physicalAge < 16 ? ` for your age` : ``;

		r.push(`You're`);
		if (PC.height <= (averageHeight + 5) && PC.height >= (averageHeight - 5)) {
			r.push(`an average height${age}`);
		} else if (PC.height < (averageHeight - 15)) {
			r.push(`petite${age}`);
		} else if (PC.height < (averageHeight - 5)) {
			r.push(`short${age}`);
		} else if (PC.height > (averageHeight + 15)) {
			r.push(`very tall${age}`);
		} else if (PC.height > (averageHeight + 5)) {
			r.push(`tall${age}`);
		}
		if (V.showHeightCMs === 1) {
			r.push(`at ${heightToEitherUnit(PC.height)},`);
		}
		return r.join(" ");
	}

	function weight() {
		const r = [];

		if (PC.weight > 190) {
			r.push(`<span class="red">extremely obese.</span>`);
		} else if (PC.weight > 160) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`attractively heavyset, though it may be getting to be a bit much.`);
			} else {
				r.push(`<span class="red">have let yourself go; you are much too overweight.</span>`);
			}
		} else if (PC.weight > 130) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`coated in thick layers of pleasantly soft flesh.`);
			} else {
				r.push(`very fat.`);
			}
		} else if (PC.weight > 95) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`coated in a layer of pleasantly soft flesh.`);
			} else if (PC.hips > 1) {
				r.push(`extremely curvy, if a bit on the heavy side, given the way your excess fat rests on your hips.`);
			} else {
				r.push(`carrying a lot of extra weight.`);
			}
		} else if (PC.weight > 30) {
			if (PC.hips > 1) {
				r.push(`quite curvy, given the way your fat rests on your hips.`);
			} else {
				r.push(`rather chubby.`);
			}
		} else if (PC.weight > 10) {
			r.push(`a little soft around the middle.`);
		} else if (PC.weight >= -10) {
			r.push(`a healthy weight.`);
		} else if (PC.weight >= -30) {
			r.push(`pleasingly thin.`);
		} else if (PC.weight >= -95) {
			if (PC.hips > 1) {
				r.push(`very thin, though your wide hips give you a very alluring thigh gap.`);
			} else if (PC.hips < -1) {
				r.push(`very thin, but your trim hips give you a model's build.`);
			} else {
				r.push(`rail thin.`);
			}
		} else {
			r.push(`<span class="red">dangerously underweight.</span>`);
		}

		return r.join(" ");
	}

	function muscles() {
		const r = [];

		if (PC.muscles > 95) {
			if (PC.weight > 95) {
				r.push(`Beneath that layer of fat, you are <span class="pink">extremely muscular,</span> though it's hard to tell at a glance.`);
			} else {
				r.push(`You are <span class="pink">extremely muscular,</span> with defined pecs, powerful glutes, and massive traps.`);
			}
		} else if (PC.muscles > 50) {
			if (PC.weight > 95) {
				r.push(`Beneath that layer of fat, you are <span class="pink">quite muscular,</span> though it's hard to tell.`);
			} else {
				r.push(`You are <span class="pink">quite muscular,</span> with ripped abs, strong shoulders, and defined lats.`);
			}
		} else if (PC.muscles > 30) {
			if (PC.weight > 95) {
				r.push(`Beneath that layer of fat, you are <span class="pink">well built,</span> with strong muscles.`);
			} else {
				r.push(`You are <span class="pink">well built,</span> with defined abs and strong, shapely muscles.`);
			}
		} else if (PC.muscles > 5) {
			if (PC.weight > 30) {
				r.push(`Beneath that layer of fat, you are <span class="pink">well built,</span> with toned muscles.`);
			} else {
				r.push(`You are <span class="pink">toned,</span> with just-visible musculature.`);
			}
		} else if (PC.muscles > -6) {
			r.push(`You lack any clear musculature, so bulking up a little would probably be a good move.`);
		} else if (PC.muscles > -31) {
			r.push(`You are <span class="red">rather weak,</span> with barely any muscles; a risk given your profession`);
		} else if (PC.muscles > -96) {
			r.push(`You are <span class="red">very weak</span> and struggle with day-to-day tasks; a serious risk given your profession.`);
		} else {
			r.push(`You are <span class="red">physically frail</span> and have difficulty lifting things, yourself included.`);
		}
		if (PC.muscles > 95 && PC.height <= (averageHeight + 10)) {
			r.push(`Your body is a bit too small to handle such impressive gains, limiting your flexibility.`);
		}

		return r.join(" ");
	}

	function overweight() {
		const r = [];

		if (tooFatSlave(PC)) {
			r.push(`You've become so large you can no longer support your own weight and are bedbound by it.`);
		} else if ((PC.weight > (170 + (PC.muscles / 5)) && PC.physicalAge >= 18) ||
			(PC.weight > (110 + (PC.muscles / 20)) && PC.physicalAge <= 3) ||
			(PC.weight > (140 + (PC.muscles / 15)) && PC.physicalAge <= 12) ||
			(PC.weight > (165 + (PC.muscles / 10)) && PC.physicalAge < 18)) {
			r.push(`You are so fat that it makes it moving around difficult.`);
			if (canWalk(PC)) {
				if (PC.muscles > 95) {
					r.push(`However, you're so powerfully built that you can do it with effort, though you're out of breath just standing here.`);
				} else if (PC.muscles > 30) {
					r.push(`You're strong enough to get to your feet, but given you're currently leaning against a chair to take some of the load off, that may not be for much longer.`);
				} else {
					r.push(`It takes a lot to get on your feet, so you try to avoid that if possible.`);
				}
			}
		} else if (PC.weight >= 130 || (PC.weight >= 95 + ((PC.physicalAge - 9) * 5))) {
			r.push(`You sufficiently fat enough to find that you can't do everything you used to be able to and that even little actions take more effort than they should.`);
		}
		return r.join(" ");
	}

	function shoulders() {
		const r = [];
		const pubertyAge = Math.min(PC.pubertyAgeXX, PC.pubertyAgeXY);

		if (PC.shoulders < -1) {
			r.push(`Your shoulders and chest are very narrow and feminine.`);
		} else if (PC.shoulders < 0) {
			r.push(`You have a narrow chest and shoulders, giving you a feminine appearance.`);
		} else if (PC.shoulders > 1) {
			r.push(`You have broad, manly shoulders.`);
		} else if (PC.shoulders > 0) {
			r.push(`You have fairly broad shoulders, giving you a masculine appearance.`);
		}
		if (PC.underArmHStyle === "hairless" || PC.physicalAge < pubertyAge - 2) {
			r.push(`Your armpits are perfectly smooth and naturally hairless.`);
		} else if (PC.underArmHStyle === "bald") {
			r.push(`Oddly, your armpits have gone bald and stopped growing hair.`);
		} else if (PC.physicalAge < pubertyAge - 1) {
			r.push(`A few ${PC.underArmHColor} wisps of hair adorn your armpits.`);
		} else if (PC.physicalAge < pubertyAge) {
			r.push(`With puberty approaching, you've sprouted a small patch of ${PC.underArmHColor} hair in your armpits.`);
		} else if (PC.underArmHStyle === "shaved") {
			r.push(`You keep your armpits shaved, but there is a light ${PC.underArmHColor} stubble starting to grow.`);
		} else if (PC.underArmHStyle === "neat") {
			r.push(`You keep your armpit hair neatly trimmed`);
			if (!hasBothArms(PC)) {
				r.push(`since`);
				if (hasAnyArms(PC)) {
					r.push(`at least half`);
				} else {
					r.push(`it`);
				}
				r.push(`is always in full view.`);
			} else {
				r.push(`to not be visible unless you want it to be.`);
			}
		} else if (PC.underArmHStyle === "bushy") {
			r.push(`You've let your ${PC.underArmHColor} armpit hair grow freely,`);
			if (!hasAnyArms(PC)) {
				r.push(`creating two bushy patches under where your arms used to be.`);
			} else {
				r.push(`where it can be seen poking out from under your`);
				if (hasBothArms(PC)) {
					r.push(`arms`);
				} else {
					r.push(`arm`);
				}
				r.push(`if you look closely.`);
			}
		}

		return r.join(" ");
	}

	function raceChange() {
		const r = [];

		if (PC.race !== PC.origRace) {
			r.push(`To the trained eye, it is possible to pick out your ${PC.origRace} features, but, for the most part, plastic surgery has completely hidden your original race.`);
		}

		return r.join(" ");
	}

	// move this stuff?
	function limbs() {
		const r = [];

		if (hasAnyProstheticLimbs(PC) || !hasBothArms(PC) || !hasBothLegs(PC)) {
			if (!hasBothArms(PC)) {
				if (!hasAnyArms(PC)) {
					r.push(`You have no arms. <span class="red">This is a problem that needs to be addressed at once.</span> You can't run an arcology like this.`);
				} else if (hasAnyProstheticArms(PC)) {
					r.push(`You only have a ${!PC.arm.right ? "left" : "right"} arm, and a prosthetic one at that. It beats not having any.`);
					// expand this
				} else {
					r.push(`You only have your ${!PC.arm.right ? "left" : "right"} arm. It's not enough to stop you, but it is inconvenient.`);
				}
			} else if (hasAnyProstheticArms(PC)) {
				if (hasBothProstheticArms(PC)) {
					r.push(`Both of your arms are artificial.`);
					// expand this
				} else {
					r.push(`Your ${getLeftArmID(PC) > 1 ? "left" : "right"} arm is artificial.`);
					// expand this
				}
			}
			if (!hasBothLegs(PC)) {
				if (!hasAnyLegs(PC)) {
					r.push(`You have no legs. It's not the end of the world, but it does limit what you can do.`);
				} else if (hasAnyProstheticLegs(PC)) {
					r.push(`You only have a ${!PC.leg.right ? "left" : "right"} leg, and a prosthetic one at that. The reason you've chosen to only have one is yours and yours alone.`);
					// expand this
				} else {
					r.push(`You only have your ${!PC.leg.right ? "left" : "right"} leg. It doesn't help much on its own, but you have make do with what you've got.`);
				}
			} else if (hasAnyProstheticLegs(PC)) {
				if (hasBothProstheticLegs(PC)) {
					r.push(`Both your legs are artificial.`);
					// expand this
				} else {
					r.push(`Your ${getLeftLegID(PC) > 1 ? "left" : "right"} leg is artificial.`);
					// expand this
				}
			}
		}
		return r.join(" ");
	}

	function heightImplant() {
		const r = [];

		if (hasAnyLimbs(PC)) {
			if (PC.heightImplant > 1) {
				r.push(`The proportion of your limbs are wrong; a given with the artificial lengthening you've undergone.`);
			} else if (PC.heightImplant > 0) {
				r.push(`The proportion of your limbs seem off, since you've had them artificially lengthened.`);
			} else if (PC.heightImplant < -1) {
				r.push(`The proportion of your limbs are wrong; a given with the artificial shortening you've undergone.`);
			} else if (PC.heightImplant < 0) {
				r.push(`The proportion of your limbs seem off, since you've had them artificially shortened.`);
			}
		}

		return r.join(" ");
	}
};
