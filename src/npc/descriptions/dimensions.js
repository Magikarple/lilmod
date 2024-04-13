/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.dimensions = function(slave) {
	const r = [];
	const {
		he, him, his, himself, He, His
	} = getPronouns(slave);

	r.push(height());

	r.push(`and`);

	r.push(weight());

	if ((slave.natural.height > slave.height + 3) && (V.geneticMappingUpgrade === 2 || V.cheatMode !== 0) && V.showPotentialSizes === 1) {
		r.push(potentialHeight());
	}

	if (slave.hips > 2) {
		r.push(`${His} hips are unrealistically wide; it is obvious they have been artificially widened.`);
	}

	r.push(App.Desc.waist(slave));

	r.push(FS());
	r.push(travel());

	r.push(App.Desc.heightImplant(slave));

	r.push(muscles());
	r.push(App.Desc.arms(slave));

	return r.join(" ");

	function height() {
		const averageHeight = Height.mean(slave);
		const age = slave.physicalAge < 16 ? ` for ${his} age` : ``;
		const legs = !hasAnyLegs(slave) ? `, or would be if ${he} had legs,` : ``;
		const r = [];

		r.push("is");

		if (slave.height <= (averageHeight + 5) && slave.height >= (averageHeight - 5)) {
			r.push(`an average height${age}`);
		} else if (slave.height < (averageHeight - 15)) {
			r.push(`petite${age}`);
		} else if (slave.height < (averageHeight - 5)) {
			r.push(`short${age}`);
		} else if (slave.height > (averageHeight + 15)) {
			r.push(`very tall${age}`);
		} else if (slave.height > (averageHeight + 5)) {
			r.push(`tall${age}`);
		}
		if (V.showHeightCMs === 1) {
			r.push(`at ${heightToEitherUnit(slave.height)}${legs}`);
		}
		return r.join(" ");
	}

	function potentialHeight() {
		const legs = !hasAnyLegs(slave) ? `, that is if ${he} had legs.` : `.`;
		const showHeight = (V.showHeightCMs === 1) ? ` up to ${heightToEitherUnit(slave.natural.height - slave.height)}` : "";
		return `${He} is expected to get${showHeight} taller${legs}`;
	}

	function weight() {
		const r = [];
		if (slave.weight > 190) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(either(`perfectly curvy.`, `perfectly plush.`));
			} else {
				r.push(`<span class="red">${either(`dangerously fat`, `dangerously overweight`, `extremely obese`)}.</span>`);
			}
		} else if (slave.weight > 160) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(either(`spectacularly curvy.`, `spectacularly plush.`));
			} else {
				r.push(`<span class="red">${either(`extremely fat`, `extremely overweight`, `very obese`)}.</span>`);
			}
		} else if (slave.weight > 130) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(either(`amazingly curvy.`, `amazingly plush.`));
			} else {
				r.push(`<span class="red">${either(`obese`, `very fat`, `very overweight`)}.</span>`);
			}
		} else if (slave.weight > 95) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				if (slave.hips > 1) {
					r.push(`${either(`extremely curvy`, `extremely plush`)}, ${his} huge hips complementing ${his} plushness perfectly.`);
				} else {
					r.push(`${either(`extremely curvy`, `extremely plush`)}.`);
				}
			} else if (slave.hips > 1) {
				r.push(`${either(`extremely curvy`, `extremely plush`)}, but ${his} huge hips make the extra weight attractive on ${him}.`);
			} else {
				r.push(`<span class="red">${either(`carrying a lot of extra weight`, `fat`, `overweight`)}.</span>`);
			}
		} else if (slave.weight > 30) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				if (slave.hips > 1) {
					r.push(`${either(`quite curvy`, `very plush`)}, ${his} motherly hips adding to ${his} soft appeal.`);
				} else {
					r.push(`${either(`quite curvy`, `very plush`)}.`);
				}
			} else if (slave.hips > 1) {
				r.push(`${either(`quite curvy`, `very plush`)}, but ${his} motherly hips make the extra weight attractive on ${him}.`);
			} else {
				r.push(`<span class="red">${either(`carrying extra weight`, `chubby`)}.</span>`);
			}
		} else if (slave.weight > 10) {
			r.push(either(`nicely plush.`, `pleasingly curvy.`));
		} else if (slave.weight >= -10) {
			r.push(either(`a healthy weight.`, `an attractive weight for ${his} frame.`, `neither too fat nor too skinny.`));
		} else if (slave.weight >= -30) {
			r.push(either(`appealingly skinny.`, `pleasingly thin.`));
		} else if (slave.weight >= -95) {
			if (slave.hips > 1) {
				r.push(`${either(`quite skinny`, `very thin`)}, but ${his} wide hips make the gap between ${his} thighs very noticeable.`);
			} else if (slave.hips < -1) {
				r.push(`${either(`quite skinny`, `very thin`)}, but ${his} trim hips make ${him} look like a model.`);
			} else {
				r.push(`<span class="red">${either(`rail thin`, `too skinny`, `underweight`)}.</span>`);
			}
		} else {
			r.push(`<span class="red">${either(`dangerously skinny`, `emaciated`)}.</span>`);
		}
		return r.join(" ");
	}

	function FS() {
		const r = [];

		if (FutureSocieties.isActive('FSStatuesqueGlorification')) {
			const shoesHeight = shoeHeight(slave);
			if (heightPass(slave)) {
				r.push(`${He} is tall enough`);
				if (shoesHeight > 0) {
					r.push(`in ${his} ${heightToEitherUnit(shoesHeight)} ${slave.shoes}`);
				}
				r.push(`to measure up to society's strict tastes.`);
			} else {
				r.push(`${He} fails to measure up to society's strict`);
				if (shoesHeight > 0) {
					r.push(`tastes even with ${his} ${heightToEitherUnit(shoesHeight)} ${slave.shoes}`);
				} else {
					r.push(`tastes.`);
				}
			}
		} else if (FutureSocieties.isActive('FSPetiteAdmiration')) {
			if (heightPass(slave)) {
				r.push(`Society finds ${him} adorably short.`);
			} else if (slave.height >= 170) {
				r.push(`Society finds ${him} distastefully tall.`);
			}
		}

		if (V.arcologies[0].FSGenderFundamentalistLawBeauty + V.arcologies[0].FSGenderRadicalistLawBeauty > 0) {
			if (!FutureSocieties.isActive('FSHedonisticDecadence') && V.arcologies[0].FSPhysicalIdealistStrongFat === 0) {
				if (slave.weight > 130) {
					r.push(`${He} is much too fat for the fashionable feminine ideal.`);
				} else if (slave.weight > 30) {
					r.push(`${He} is too fat for the fashionable feminine ideal.`);
				} else if (slave.weight < -30) {
					r.push(`${He} is too skinny for the fashionable feminine ideal.`);
				}
			} else {
				if (slave.weight > 130) {
					r.push(`${He} is much too fat for the fashionable feminine ideal.`);
				} else if (slave.weight < -30) {
					r.push(`${He} is too skinny for the fashionable feminine ideal.`);
				}
			}
		} else if (V.arcologies[0].FSSlimnessEnthusiastLaw === 1) {
			if (!FutureSocieties.isActive('FSHedonisticDecadence') && V.arcologies[0].FSPhysicalIdealistStrongFat === 0) {
				if (slave.weight > 30) {
					r.push(`${He} is much too fat for the fashionable feminine ideal.`);
				} else if (slave.weight > 10) {
					r.push(`${He} is too fat for the fashionable feminine ideal.`);
				}
			} else {
				if (slave.weight > 60) {
					r.push(`${He} is much too fat for the fashionable feminine ideal.`);
				} else if (slave.weight > 30) {
					r.push(`${He} is too fat for the fashionable feminine ideal.`);
				}
			}
		} else if (V.arcologies[0].FSHedonisticDecadenceLaw2 === 1) {
			if (slave.weight <= 95) {
				r.push(`${He} is too thin for the fashionable feminine ideal.`);
			} else if (slave.weight <= 10) {
				r.push(`${He} is much too thin for the fashionable feminine ideal.`);
			}
		}
		return r.join(" ");
	}

	function travel() {
		const r = [];
		if (canWalk(slave)) {
			if ((slave.weight > (170 + (slave.muscles / 5)) && slave.physicalAge >= 18) ||
				(slave.weight > (110 + (slave.muscles / 20)) && slave.physicalAge <= 3) ||
				(slave.weight > (140 + (slave.muscles / 15)) && slave.physicalAge <= 12) ||
				(slave.weight > (165 + (slave.muscles / 10)) && slave.physicalAge < 18)) {
				r.push(`${He} is so fat that it is difficult for ${him} to move.`);
				if (slave.muscles > 95) {
					r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks.`);
				} else if (slave.muscles > 30) {
					r.push(`${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight.`);
				} else if (slave.muscles > 5) {
					r.push(`${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit.`);
				} else {
					r.push(`${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can.`);
				}
			}
		}
		return r.join(" ");
	}

	function muscles() {
		const r = [];
		r.push(`${He} is`);
		if (slave.muscles > 95) {
			r.push(`<span class="pink">extremely muscular,</span> with defined pecs, powerful glutes, and massive`);
			if (slave.weight > 95) {
				r.push(`traps hidden beneath a layer of fat.`);
			} else {
				r.push(`traps.`);
			}
		} else if (slave.muscles > 50) {
			r.push(`<span class="pink">quite muscular,</span> with ripped abs, strong shoulders, and defined`);
			if (slave.weight > 95) {
				r.push(`lats hidden beneath a layer of fat.`);
			} else {
				r.push(`lats.`);
			}
		} else if (slave.muscles > 30) {
			r.push(`<span class="pink">well built,</span> yet feminine, with defined abs and strong, shapely`);
			if (slave.weight > 95) {
				r.push(`muscles hidden beneath a layer of fat.`);
			} else {
				r.push(`muscles.`);
			}
		} else if (slave.muscles > 5) {
			r.push(`<span class="pink">well built,</span> yet feminine, with just-visible`);
			if (slave.weight > 30) {
				r.push(`muscles hidden beneath a layer of fat.`);
			} else {
				r.push(`muscles.`);
			}
		} else if (slave.muscles > -6) {
			r.push(`<span class="pink">soft and feminine,</span> with no visible muscles.`);
		} else if (slave.muscles > -31) {
			r.push(`<span class="pink">rather weak,</span> with barely any muscles.`);
		} else if (slave.muscles > -96) {
			r.push(`<span class="pink">very weak;</span> ${he} struggles with day-to-day tasks.`);
		} else {
			r.push(`<span class="red">frail;</span> ${he} can barely hold ${himself} up.`);
		}

		if (V.arcologies[0].FSGenderFundamentalistLawBeauty + V.arcologies[0].FSGenderRadicalistLawBeauty + V.arcologies[0].FSSlimnessEnthusiastLaw > 0 && !FutureSocieties.isActive('FSPhysicalIdealist') && V.arcologies[0].FSHedonisticDecadenceStrongFat === 0) {
			if (V.arcologies[0].FSPhysicalIdealistLaw > 0 && slave.muscles > 50) {
				r.push(`${He} is entirely too muscular for the fashionable feminine ideal.`);
			} else if (slave.muscles > 30) {
				r.push(`${He} is entirely too muscular for the fashionable feminine ideal.`);
			}
		}
		return r.join(" ");
	}
};
