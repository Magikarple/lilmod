App.EndWeek.Player.diet = function(PC = V.PC) {
	const r = [];

	let growthGoal;
	let roll;
	let target;
	let weightShift;
	let weightLoss;
	let weightGain;
	const gigantomastiaMod = PC.geneticQuirks.gigantomastia === 2 ? (PC.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearQuirk = PC.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const boobSize = App.Medicine.fleshSize(PC, 'boobs');
	const buttSize = App.Medicine.fleshSize(PC, 'butt');
	const ballSize = PC.balls - PC.ballsImplant;

	if (canEatFood(PC)) {
		playerFoodEffects();
	} else {
		slaveFood();
		slaveFoodEffects();
	}
	outsideEffects();

	return r.join(" ");

	function playerFoodEffects() {
		switch (PC.diet) {
			case PCDiet.HEALTHY:
				r.push(`You keep to a healthy, high-quality diet befitting your station.`);
				break;
			case PCDiet.RESTRICTED:
				weightLoss = 4;
				if (PC.weightDirection === -1) {
					PC.weight -= (weightLoss + 3);
					r.push(`You stick to a strict diet, <span class="change positive">losing a lot of weight.</span>`);
				} else if (PC.weightDirection === 1) {
					PC.weight -= (weightLoss - 3);
					r.push(`Despite sticking to a strict diet, <span class="change positive">you barely lose any weight.</span>`);
				} else {
					PC.weight -= weightLoss;
					r.push(`You stick to a strict diet and <span class="change positive">lose some weight.</span>`);
				}
				PC.weight = Math.max(PC.weight, -100);
				sharedAssetLoss(weightLoss);
				if (PC.weight < -95) {
					r.push(`You cannot physically lose any more weight, so you will <span class="noteworthy">resume a normal diet</span> starting next week.`);
					PC.diet = PCDiet.HEALTHY;
				}
				break;
			case PCDiet.FATTEN: // weight gain
				weightGain = 7;
				if (PC.weightDirection === -1) {
					PC.weight += (weightGain - 3);
					r.push(`Despite gorging yourself constantly during your day, you <span class="change positive">only put on a little weight.</span>`);
				} else if (PC.weightDirection === 1) {
					PC.weight += (weightGain + 3);
					r.push(`You eat near constantly during your waking hours, gorging yourself and <span class="change positive">putting on a lot of weight.</span>`);
				} else {
					PC.weight += weightGain;
					r.push(`You eat near constantly during your waking hours, gorging yourself to <span class="change positive">put on weight.</span>`);
				}
				sharedAssetGain(weightGain);
				if (PC.weight > 200) {
					r.push(`Getting any fatter will just put your health at greater risk, so you will <span class="noteworthy">resume a normal diet</span> starting next week.`);
					PC.diet = PCDiet.HEALTHY;
				}
				PC.weight = Math.min(PC.weight, 200);
				break;
			case PCDiet.MUSCLE: // Muscle Gain
				gainMuscle();
				break;
			case PCDiet.SLIM: // Muscle Loss
				loseMuscle();
				break;
			case PCDiet.EXOTIC:
				r.push(`You stick to an unusual diet full of exotic foods and drinks, both rumored and proven, to boost your sexual energy.`);
				if (PC.dick.isBetween(0, 3) && random(1, 100) > 95) {
					r.push(`You feel like you're a bit bigger down there. A quick measuring confirms <span class="change positive">your dick has gotten fatter.</span>`);
					PC.dick += 1;
				}
				if ((PC.geneMods.NCS === 0 && PC.balls.isBetween(0, 6) && random(1, 100) > 95) || (PC.geneMods.NCS === 1 && PC.balls.isBetween(0, 3) && random(1, 100) > 99)) {
					r.push(`The <span class="change positive">added heft to your balls</span> is a pleasant side-effect.`);
					PC.balls += 1;
				}
				if (PC.vagina >= 0 && PC.vaginaLube < 2) {
					if (PC.vagina >= 0 && PC.vaginaLube === 0 && PC.energy > 20 && random(1, 100) > (100 - (PC.energy / 4))) {
						r.push(`It also gets the juices flowing; <span class="change positive">your pussy is no longer so dry.</span>`);
						PC.vaginaLube = 1;
					} else if (PC.energy > 95 && random(1, 100) > 40 + ((100 - PC.energy) * 10)) {
						r.push(`It also gets the juices really flowing; <span class="change positive">your pussy has become so wet</span> that you're soaked with arousal by the end of your meal.`);
						PC.vaginaLube = 2;
					}
				}
				break;
			case PCDiet.MEDICINAL:
				r.push(`You stick to an unusual diet full of exotic foods and drinks known for <span class="health inc">fortifying health, healing ailments, and cleansing the body.</span>`);
				if (canTaste(PC)) {
					r.push(`It is surprisingly pleasant, if a bit on the expensive side.`);
				} else {
					r.push(`It is rather expensive, so you wish you could actually taste it.`);
				}
				if (PC.health.condition <= 90) {
					improveCondition(PC, 2);
				}
				if (PC.chem > 1) {
					PC.chem--;
				}
				break;
		}
	}

	function slaveFood() {
		r.push(`Since you are only capable of eating slave food, you take extra precautions to make sure you only ever consume a blend free of any manipulative additives.`);
		if (V.feeder === 1 && ![PCDiet.FEMALE, PCDiet.MALE, PCDiet.FUTA, PCDiet.WEANING].includes(PC.diet)) {
			r.push(`The upgraded kitchen closely monitoring your diet helps in this regard.`);
		}
	}

	function slaveFoodEffects() {
		let superFetKnown;

		switch (PC.diet) {
			case PCDiet.RESTRICTED: // weight loss
				weightLoss = 5 + (V.feeder * 2);
				if (PC.weightDirection === -1) {
					PC.weight -= (weightLoss + 3);
					r.push(`You stick to a strict diet, <span class="change positive">losing a lot of weight.</span>`);
				} else if (PC.weightDirection === 1) {
					PC.weight -= (weightLoss - 3) - (V.feeder);
					r.push(`Despite sticking to a strict diet, <span class="change positive">you barely lose any weight.</span>`);
				} else {
					PC.weight -= weightLoss;
					r.push(`You stick to a strict diet and <span class="change positive">lose weight.</span>`);
				}
				PC.weight = Math.max(PC.weight, -100);
				sharedAssetLoss(weightLoss);
				if (PC.weight < -95) {
					r.push(`You cannot physically lose any more weight, so you will <span class="noteworthy">resume a normal diet</span> starting next week.`);
					PC.diet = PCDiet.HEALTHY;
				}
				break;
			case PCDiet.FATTEN: // weight gain
				weightGain = 5 + (V.feeder * 2);
				if (PC.weightDirection === -1) {
					PC.weight += Math.max((weightGain - 3) - (V.feeder), 1);
					r.push(`Despite gorging yourself on extra food throughout the day, you <span class="change positive">only put on a little weight.</span>`);
				} else if (PC.weightDirection === 1) {
					PC.weight += weightGain + 3;
					r.push(`You take extra meals throughout the day, gorging yourself and <span class="change positive">putting on a lot of weight.</span>`);
				} else {
					PC.weight += weightGain;
					r.push(`You take extra meals throughout the day, gorging yourself to <span class="change positive">put on weight.</span>`);
				}
				sharedAssetGain(weightGain);
				if (PC.weight > 200) {
					r.push(`Getting any fatter will just put your health at greater risk, so you will <span class="noteworthy">resume a normal diet</span> starting next week.`);
					PC.diet = PCDiet.HEALTHY;
				}
				PC.weight = Math.min(PC.weight, 200);
				break;
			case PCDiet.CORRECTIVE: // normalizes weight towards 0
				weightShift = 0;
				r.push(`You make an effort to eat better and get yourself back to a healthy weight.`);
				if (PC.weight < -10) {
					weightShift = V.feeder + 1;
				} else if (PC.weight > 10) {
					weightShift = -(V.feeder + 1);
				}
				if (PC.weightDirection === -1) {
					PC.weight += (weightShift - random(0, 1));
				} else if (PC.weightDirection === 1) {
					PC.weight += (weightShift + random(0, 1));
				} else {
					PC.weight += weightShift;
				}
				if (weightShift < 0) {
					if (PC.hormoneBalance > 30 && PC.geneMods.NCS !== 0) { // 'Expected' breast size based on weight for feminine-bodied slaves
						growthGoal = Math.trunc((100 + (PC.weight + 100) * 5 + 2 * PC.lactationAdaptation) * (0.85 + PC.hormoneBalance / 400) * gigantomastiaMod);
						roll = 600;
						target = Math.trunc(Math.clamp(weightShift * 20 + (boobSize - growthGoal) / 5, 0, 270));
					} else { // For masculine- and childish-bodied slaves
						growthGoal = ((PC.weight + 100) * 2 + PC.lactationAdaptation) * gigantomastiaMod;
						roll = 200;
						target = Math.trunc(Math.clamp(weightShift * 2 + (boobSize - growthGoal) / 20, 0, 68));
					}
					if (random(1, roll) <= target && gigantomastiaMod !== 3 && boobSize > 100) {
						r.push(`<span class="change negative">Your chest has gotten a little smaller.</span>`);
						if (random(1, 2) === 1) {
							PC.boobs -= 20;
						} else {
							PC.boobs -= 10 * (1 + PC.geneMods.NCS);
						}
					}
					if (PC.hormoneBalance > 30) { // 'Expected' butt size based on weight for feminine-bodied slaves, scaled up by 1000 */
						growthGoal = Math.trunc((PC.weight + 100) * 25 * (0.9 + PC.hormoneBalance / 600) * (rearQuirk / 2 + 1));
						roll = 60000;
						target = Math.trunc(Math.clamp(weightShift * 1000 + (buttSize * 1000 - growthGoal) * 2, 0, 36000));
					} else { // For masculine- and childish-bodied slaves, likewise scaled up
						growthGoal = Math.trunc((PC.weight + 100) * 12.5) * (rearQuirk / 2 + 1);
						roll = 100000;
						target = Math.trunc(Math.clamp(weightShift * 1000 + (buttSize * 1000 - growthGoal) * 4, 0, 72000));
					}
					if (random(1, roll) <= target && buttSize > 0) {
						r.push(`<span class="change negative">Your butt has shrunk a little.</span>`);
						PC.butt -= 1;
					}
				} else if (weightShift > 0) {
					if (PC.hormoneBalance > 30 && PC.geneMods.NCS !== 1) { // 'Expected' breast size based on weight for feminine-bodied slaves */
						growthGoal = Math.trunc((100 + (PC.weight + 100) * 5 + 2 * PC.lactationAdaptation) * (0.85 + PC.hormoneBalance / 400) * gigantomastiaMod);
						roll = 600;
						target = Math.trunc(Math.clamp(weightShift * 20 - (boobSize - growthGoal) / 5, 0, 270));
					} else { // For masculine- and childish-bodied slaves */
						growthGoal = ((PC.weight + 100) * 2 + PC.lactationAdaptation) * gigantomastiaMod;
						roll = 200;
						target = Math.trunc(Math.clamp(weightShift * 2 - (boobSize - growthGoal) / 20, 0, 68));
					}
					if (PC.geneMods.NCS === 1) {
						roll *= 2;
					}
					if (random(1, roll) <= target) {
						r.push(`Some of the fat <span class="change positive">finds its way to your chest.</span>`);
						if (random(1, 2) === 1) {
							PC.boobs += 40 / (1 + PC.geneMods.NCS);
						} else {
							PC.boobs += 20 / (1 + PC.geneMods.NCS);
						}
					}
					if (PC.hormoneBalance > 30) { // 'Expected' butt size based on weight for feminine-bodied slaves, scaled up by 1000
						growthGoal = Math.trunc((PC.weight + 100) * 25 * (0.9 + PC.hormoneBalance / 600) * (rearQuirk / 2 + 1));
						roll = 60000;
						target = Math.trunc(Math.clamp(weightShift * 1000 - (buttSize * 1000 - growthGoal) * 2, 0, 36000));
					} else { // For masculine- and childish-bodied slaves, likewise scaled up
						growthGoal = Math.trunc((PC.weight + 100) * 12.5) * (rearQuirk / 2 + 1);
						roll = 100000;
						target = Math.trunc(Math.clamp(weightShift * 1000 - (buttSize * 1000 - growthGoal) * 4, 0, 72000));
					}
					if (PC.geneMods.NCS === 1) {
						roll *= 2;
					}
					if (random(1, roll) <= target) {
						r.push(`<span class="change positive">Your butt has gotten softer.</span>`);
						PC.butt += 1;
					}
				}
				if (PC.weight >= -10 && PC.weight <= 10) {
					r.push(`Since you have now accomplished your goal, you're going <span class="noteworthy">back to a normal diet.</span>`);
					PC.diet = PCDiet.HEALTHY;
				}
				break;
			case PCDiet.MUSCLE: // Muscle Gain
				gainMuscle();
				break;
			case PCDiet.SLIM: // Muscle Loss
				loseMuscle();
				break;
			case PCDiet.CUM:
				if (PC.balls === 0) {
					r.push(`Staying on a diet to enhance cum production is a waste of credits when you don't produce any to start with, so you're going <span class="noteworthy">back to a normal diet.</span>`);
				} else {
					r.push(`Your modified diet has had a definite effect on your cum production; your loads are larger and thicker than unusual.`);
					if ((PC.geneMods.NCS === 0 && PC.balls < 6 && random(1, 100) > 90) || (PC.geneMods.NCS === 1 && PC.balls < 3 && random(1, 100) > 95)) {
						r.push(`In addition, your <span class="change positive">balls have grown slightly</span> to better meet the demand.`);
						PC.balls += 1;
					}
				}
				break;
			case PCDiet.FEMALE: // Female Hormones
				r.push(`You make an exception for female hormones to be added to your diet, however${V.feeder === 1 ? ", with support from the upgraded kitchen" : ""}.`);
				if ((PC.ovaries === 1 || PC.mpreg === 1) && PC.balls > 0) { // herm
					if (PC.weight < (30 - (V.feeder * 20)) && PC.weightDirection !== -1) {
						r.push(`You <span class="change positive">gain a little weight</span> in all the right places.`);
						PC.weight += 1;
						if (PC.weightDirection === 1) {
							PC.weight += 2;
						}
					}
					if (PC.geneMods.NCS === 0 && PC.boobs < ((500 * gigantomastiaMod) + (V.feeder * 300))) {
						r.push(`You experience <span class="change positive">slight breast growth</span> from the extra estrogen.`);
						PC.boobs += 10;
					}
					if (PC.geneMods.NCS === 0 && PC.butt < 4 && random(1, 100) > (75 - (rearQuirk * 20))) {
						r.push(`Your developing femininity <span class="change positive">pads out</span> your rear.`);
						PC.butt += 1;
					}
					if (PC.waist > -20) {
						r.push(`Your waist <span class="change positive">slims a little</span> with your hormonal changes.`);
						PC.waist--;
					}
					if (PC.dick > 1 && (((PC.geneMods.NCS === 0) && (random(1, 100) > 95)) || ((PC.geneMods.NCS === 1) && (random(1, 100) > 43)))) {
						r.push(`Your altered body chemistry causes <span class="change negative">penile reduction.</span>`);
						PC.dick -= 1;
					}
					if (ballSize > 1 && (((PC.geneMods.NCS === 0) && (random(1, 100) > 95)) || ((PC.geneMods.NCS === 1) && (random(1, 100) > 43)))) {
						r.push(`Your altered body chemistry causes <span class="change negative">testicular shrinkage.</span>`);
						PC.balls -= 1;
					}
				} else if (PC.ovaries === 1 || PC.mpreg === 1) { // female
					if (PC.weight < (40 - (V.feeder * 15)) && PC.weightDirection !== 1) {
						r.push(`You <span class="change positive">gain a little weight</span> in all the right places.`);
						PC.weight += 1;
						if (PC.weightDirection === 1) {
							PC.weight += 2;
						}
					}
					if (PC.geneMods.NCS === 0 && PC.boobs < (600 * gigantomastiaMod) + (V.feeder * 200)) {
						r.push(`You experience <span class="change positive">slight breast growth</span> from the extra estrogen.`);
						PC.boobs += 10;
					}
					if (PC.waist > -30) {
						r.push(`Your waist <span class="change positive">slims a little</span> with your hormonal changes.`);
						PC.waist--;
					}
					if (PC.geneMods.NCS === 0 && PC.butt < 5 && random(1, 100) > (75 - (rearQuirk * 20))) {
						r.push(`Your developing femininity <span class="change positive">pads out</span> your rear.`);
						PC.butt += 1;
					}
				} else if (PC.balls > 0) { // male
					if (PC.weight < (30 - (V.feeder * 10)) && PC.weightDirection !== 1) {
						r.push(`You <span class="change positive">gain a little weight</span> in all the right places.`);
						PC.weight += 1;
						if (PC.weightDirection === 1) {
							PC.weight += 2;
						}
					}
					if (PC.geneMods.NCS === 0 && PC.boobs < (400 * gigantomastiaMod) + (V.feeder * 150)) {
						r.push(`You experience <span class="change positive">slight breast growth</span> from the extra estrogen.`);
						PC.boobs += 10;
					}
					if (PC.waist > -10) {
						r.push(`Your waist <span class="change positive">slims a little</span> with your hormonal changes.`);
						PC.waist--;
					}
					if (PC.geneMods.NCS === 0 && PC.butt < 3 && random(1, 100) > (75 - (rearQuirk * 20))) {
						r.push(`Your developing femininity <span class="change positive">pads out</span> your rear.`);
						PC.butt += 1;
					}
					if (PC.dick > 1 && (((PC.geneMods.NCS === 0) && (random(1, 100) > 99)) || ((PC.geneMods.NCS === 1) && (random(1, 100) > 48)))) {
						r.push(`Your altered body chemistry causes <span class="change negative">penile reduction.</span>`);
						PC.dick -= 1;
					}
					if (ballSize > 1 && (((PC.geneMods.NCS === 0) && (random(1, 100) > 99)) || ((PC.geneMods.NCS === 1) && (random(1, 100) > 48)))) {
						r.push(`Your altered body chemistry causes <span class="change negative">testicular shrinkage.</span>`);
						PC.balls -= 1;
					}
				}
				if (PC.energy < 70) {
					r.push(`The hormones stir your sex drive up, leaving you <span class="change positive">a little more energetic</span> in bed.`);
					PC.energy += 1;
				}
				if (PC.geneticQuirks.galactorrhea === 2 && random(1, 100) < PC.hormoneBalance && PC.lactation === 0) {
					if (V.geneticMappingUpgrade >= 1) {
						r.push(`The female hormones spur your galactorrhea into <span class="change positive">triggering your milk production.</span>`);
					} else {
						r.push(`The female hormones apparently come with <span class="change positive">a side-effect of lactation</span> that you were not informed about.`);
					}
					PC.lactation = 1;
					PC.lactationDuration = 2;
				}
				break;
			case PCDiet.MALE: // Male Hormones
				r.push(`You make an exception for male hormones to be added to your diet, however${V.feeder === 1 ? ", with support from the upgraded kitchen" : ""}.`);
				if ((PC.ovaries === 1 || PC.mpreg === 1) && PC.balls > 0) { // herm
					if (PC.muscles < 30) {
						r.push(`You feel stronger, an observation supported by your <span class="change positive">growing muscles.</span>`);
						PC.muscles += 1 + V.feeder + PC.geneticQuirks.mGain;
					}
					if (PC.geneMods.NCS === 0 && PC.dick.isBetween(0, 4) && random(1, 100) > 95 - (V.feeder * 5)) {
						if (canAchieveErection(PC)) {
							r.push(`You notice that your <span class="change positive">erection is a little bigger than usual.</span>`);
						} else {
							r.push(`Your dick, while still limp, has gotten <span class="change positive">fatter</span> from your diet.`);
						}
						PC.dick += 1;
					}
					if (PC.geneMods.NCS === 0 && PC.balls < 3 && random(1, 100) > 95 - (V.feeder * 5)) {
						r.push(`Your balls feel heavy and full; further inspection reveals they've <span class="change positive">grown</span> under your diet.`);
						PC.balls += 1;
					}
					if ((PC.geneMods.NCS === 0 && boobSize > 400 - (V.feeder * 100)) || (PC.geneMods.NCS === 1 && boobSize > 200) && gigantomastiaMod !== 3) {
						r.push(`Your chest <span class="change negative">slims down slightly.</span>`);
						PC.boobs -= 10;
						if (PC.geneMods.NCS === 1) {
							PC.boobs -= 10;
						}
					}
					if (PC.waist < 15) {
						r.push(`The added testosterone <span class="change negative">thickens your feminine waist.</span>`);
						PC.waist++;
					}
				} else if (PC.ovaries === 1 || PC.mpreg === 1) { // female
					if (PC.muscles < 15) {
						r.push(`You feel stronger, an observation supported by your <span class="change positive">growing muscles.</span>`);
						PC.muscles += 1 + V.feeder + PC.geneticQuirks.mGain;
					}
					if ((PC.geneMods.NCS === 0 && boobSize > 500) || (PC.geneMods.NCS === 1 && boobSize > 200) && gigantomastiaMod !== 3) {
						r.push(`Your breasts <span class="change negative">lose some mass</span> from the masculinizating effects of your diet.`);
						PC.boobs -= 10;
						if (PC.geneMods.NCS === 1) {
							PC.boobs -= 10;
						}
					}
					if (PC.waist < 0) {
						r.push(`The added testosterone <span class="change negative">thickens your waist.</span>`);
						PC.waist++;
					}
				} else if (PC.balls > 0) { // male
					if (PC.muscles < 60) {
						r.push(`You feel stronger, an observation supported by your <span class="change positive">growing muscles.</span>`);
						PC.muscles += 1 + V.feeder + PC.geneticQuirks.mGain;
					}
					if (PC.geneMods.NCS === 0 && PC.dick.isBetween(0, 4) && random(1, 100) > 95 - (V.feeder * 5)) {
						if (canAchieveErection(PC)) {
							r.push(`You notice that your <span class="change positive">erection is a little bigger than usual.</span>`);
						} else {
							r.push(`Your dick, while still limp, has gotten <span class="change positive">fatter</span> from your diet.`);
						}
						PC.dick += 1;
					}
					if (PC.geneMods.NCS === 0 && PC.balls < 3 && random(1, 100) > 95 - (V.feeder * 5)) {
						r.push(`Your balls feel heavy and full; further inspection reveals they've <span class="change positive">grown</span> under your diet.`);
						PC.balls += 1;
					}
					if (PC.waist < 30) {
						r.push(`The added testosterone <span class="change negative">thickens your waist.</span>`);
						PC.waist++;
					}
					if (boobSize > 300 && gigantomastiaMod !== 3) {
						r.push(`Your chest <span class="change negative">slims down slightly.</span>`);
						PC.boobs -= 10;
						if (PC.geneMods.NCS === 1) {
							PC.boobs -= 10;
						}
					}
				}
				if (PC.energy < 70) {
					r.push(`The hormones stir your sex drive up, leaving you <span class="change positive">a little more energetic</span> in bed.`);
					PC.energy += 1;
				}
				break;
			case PCDiet.FUTA: // Futa Hormones
				r.push(`You make an exception for a blend of sex hormones to be added to your diet, however${V.feeder === 1 ? ", with support from the upgraded kitchen" : ""}.`);
				if (PC.muscles < 90) {
					r.push(`You feel stronger, an observation supported by your <span class="change positive">growing muscles.</span>`);
					PC.muscles += 1 + V.feeder + PC.geneticQuirks.mGain;
				}
				if (PC.weight < 50 && PC.weightDirection !== -1) {
					r.push(`You <span class="change positive">gain a little weight</span> in all the right places.`);
					PC.weight += 1;
					if (PC.weightDirection === 1) {
						PC.weight += 2;
					}
				}
				if (PC.geneMods.NCS === 0 && (PC.boobs < 800 * gigantomastiaMod) + (V.feeder * 400)) {
					r.push(`You experience <span class="change positive">slight breast growth</span> from the extra estrogen.`);
					PC.boobs += 10;
				}
				if (PC.geneMods.NCS === 0 && PC.butt < 5 && random(1, 100) > (75 - (rearQuirk * 20))) {
					r.push(`Your developing femininity <span class="change positive">pads out</span> your rear.`);
					PC.butt += 1;
				}
				if (PC.geneMods.NCS === 0 && PC.dick.isBetween(0, 5) && random(1, 100) > 90 - (V.feeder * 10)) {
					if (canAchieveErection(PC)) {
						r.push(`You notice that your <span class="change positive">erection is a little bigger than usual.</span>`);
					} else {
						r.push(`Your dick, while still limp, has gotten <span class="change positive">fatter</span> from your diet.`);
					}
					PC.dick += 1;
				}
				if (PC.geneMods.NCS === 0 && PC.balls < 5 && random(1, 100) > 90 - (V.feeder * 10)) {
					r.push(`Your balls feel heavy and full; further inspection reveals they've <span class="change positive">grown</span> under your diet.`);
					PC.balls += 1;
				}
				if (PC.waist < 0) {
					r.push(`Hormonal changes <span class="change negative">thicken your waist.</span>`);
					PC.waist++;
				} else if (PC.waist > 0) {
					r.push(`Hormonal changes <span class="change positive">thin your waist.</span>`);
					PC.waist--;
				}
				if (PC.energy < 90) {
					r.push(`All the hormones stir your sex drive up, leaving you <span class="change positive">horny and eager for sex.</span>`);
					PC.energy += 1;
				}
				if (PC.geneticQuirks.galactorrhea === 2 && random(1, 100) < PC.hormoneBalance && PC.lactation === 0) {
					if (V.geneticMappingUpgrade >= 1) {
						r.push(`Unsurprisingly, all the hormones spur your galactorrhea into <span class="change positive">triggering your milk production.</span>`);
					} else {
						r.push(`It doesn't really come as a surprise when you <span class="change positive">start lactating;</span> you are on a lot of hormones after all.`);
					}
					PC.lactation = 1;
					PC.lactationDuration = 2;
				}
				break;
			case PCDiet.CLEANSE: // chem reduce and health plus
				if (!canSmell(PC) && !canTaste(PC)) {
					r.push(`<span class="health inc">You feel spectacular</span> on this health-focused diet, even if you find other people try to avoid you, and that your slaves hold their breath when in your presence.`);
				} else if (!canSmell(PC) || !canTaste(PC)) {
					r.push(`Your specialized diet ${canTaste(PC) ? "tastes" : "smells"} awful, but leaves you <span class="health inc">feeling well</span> once you get over it.`);
				} else {
					r.push(`Your specialized diet tastes and smells awful, but leaves you <span class="health inc">feeling well</span> once you get over it.`);
				}
				if (PC.health.condition <= 90) {
					improveCondition(PC, 2);
				}
				if (PC.chem > 2) {
					PC.chem -= 2;
				}
				if (PC.health.condition > 90 && PC.chem < 10) {
					r.push(`You are in peak health now, bringing <span class="noteworthy">your cleansing diet to a close.</span>`);
					PC.diet = PCDiet.HEALTHY;
				}
				break;
			case PCDiet.FERTILITY: // + ovum and small boosts to energy and attrXY
				superFetKnown = (PC.geneticQuirks.superfetation === 2 && (V.geneticMappingUpgrade >= 1 || PC.counter.birthsTotal > 0 || PC.pregWeek > 3));
				if (!isFertile(PC) || (PC.preg !== 0 && !superFetKnown)) {
					if (PC.pregKnown === 0 && PC.preg > 0) {
						r.push(`You're on a modified diet that promotes multiples during impregnation that has suddenly stopped working for you. A quick test reveals <span class="pregnant">you're going to be a mother!</span> With it no longer having any further benefits, `);
						PC.pregKnown = 1;
					} else {
						r.push(`You're on a modified diet that promotes multiples during impregnation, but not able to actually get pregnant. With it having no benefits, `);
					}
					r.push(`<span class="noteworthy">your fertility diet is over.</span>`);
					PC.diet = PCDiet.HEALTHY;
				} else {
					if (superFetKnown && PC.pregKnown && PC.preg > 0) {
						r.push(`You're on a modified diet that promotes multiples during impregnation; needless to say, it's hard to tell if it is working or not given your state.`);
					} else {
						r.push(`You're on a modified diet that promotes multiples during impregnation, so until you get yourself knocked up you really can't say if it's working or not.`);
					}
					if (PC.energy < 45 && PC.energy > 20) {
						r.push(`That said, <span class="libido inc">you really could use a good fucking</span> right about now.`);
						PC.energy++;
					}
				}
				break;
			case PCDiet.WEANING:
				r.push(`You stick to your prescription diet with the intent to free yourself from slave food dependency.`);
				if (!PC.weaningDuration) {
					PC.weaningDuration = 0; // ugly hack, probably shouldn't initialize this here
				}
				if (PC.weaningDuration < 5) {
					healthDamage(PC, 100);
					r.push(`It gels into a dense paste in your stomach, giving you <span class="health dec">intense cramps</span> as it slowly digests.`);
				} else if (PC.weaningDuration < 14) {
					r.push(`It gels into a dense paste in your stomach, <span class="health dec">causing cramping</span> as it slowly digests.`);
					healthDamage(PC, Math.max(100 - (PC.weaningDuration * 10), 10));
				}
				if (PC.weaningDuration < 10) {
					const wombLength = PC.preg > 0 ? PC.womb.length : 0;
					r.push(`Your body has such a hard time absorbing nutrients from it that it undergoes catabolysis, <span class="change negative">breaking down fat and muscle tissue</span> in order to keep you alive. In such a desperate state, <span class="libido dec">there is just no energy left for sex.</span>`);
					PC.weight -= 10 + (wombLength * 4);
					sharedAssetLoss(20 + (wombLength * 5));
					PC.muscles -= 10 + (wombLength * 2);
					PC.energy -= 10;
					r.push(`On top of all your other problems, the undigested food has nowhere to go as your body relearns how to properly move it all the way through your gastrointestinal tract. <span class="change negative">It is steadily building up inside you,</span> adding to your discomfort as it distends your belly a little more with each passing day.`);
					PC.inflation = 1;
					PC.inflationType = "undigested food";
					PC.inflationMethod = 1;
					PC.belly += 300;
					PC.bellyFluid += 300;
					SetBellySize(PC);
				} else if (PC.weaningDuration < 14) {
					r.push(`Your body is improving at absorbing nutrients from it, but still <span class="change negative">breaks down some fat and muscle tissue</span> to make up for what it can't.`);
					PC.weight -= (-2 * PC.weaningDuration) + 28;
					PC.muscles -= (-2 * PC.weaningDuration) + 28;
					r.push(`More importantly, it is now <span class="change positive">regularly coming out the other end.</span> You're not far off from a healthy gastrointestinal tract.`);
					PC.bellyFluid = 0; // needed because deflate() and SetBellySize() don't handle undigested food
					deflate(PC);
				} else {
					r.push(`Your body is now capable of fully digesting your food and getting rid of its waste.`);
					if (PC.weaningDuration <= 19) {
						r.push(`The remainder of the diet is intended to help strengthen it further so that you may cleanly transition to eating real food once it concludes.`);
					}
				}
				// cripple .tired
				// miscarriage!
				PC.weaningDuration += 1;
				if (PC.weaningDuration === 20) {
					r.push(`You've finished your weaning diet and are <span class="change positive">now able to eat whatever you want.</span> Considering how famished you are, you'll start with everything in the kitchen; after starving for months, you deserve it. You'll worry about healthy portions next week.`);
					PC.digestiveSystem = "normal";
					PC.diet = PCDiet.FATTEN;
					PC.weaningDuration = 0;
				}
				break;
		}
	}

	function gainMuscle() {
		if (onBedRest(PC)) {
			r.push(`You aren't capable of actively working out, so you're <span class="noteworthy">back on a normal diet.</span>`);
			PC.diet = PCDiet.HEALTHY;
		} else if (isAmputee(PC)) {
			r.push(`You can't work out with no limbs, so you're <span class="noteworthy">back on a normal diet.</span>`);
			PC.diet = PCDiet.HEALTHY;
		} else {
			r.push(`You focus hard on lifting,`);
			if (PC.geneticQuirks.mGain === 2) {
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`and since you have myotonic hypertrophy,`);
				} else {
					r.push(`and despite run-of-the-mill routines,`);
				}
				r.push(`<span class="change positive">rapidly bulk up.</span>`);
				PC.muscles += 10;
			} else if (PC.drugs === Drug.STEROID) {
				r.push(`and since you're on so much gear, <span class="change positive">rapidly bulk up.</span>`);
				PC.muscles += 8 + PC.geneticQuirks.mGain;
			} else if (PC.geneticQuirks.mLoss === 2) {
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`but with myotonic dystrophy,`);
				} else {
					r.push(`but despite your effort,`);
				}
				r.push(`barely <span class="change positive">gain any muscle.</span>`);
				PC.muscles += 2;
			} else if (PC.balls > 0 && PC.ballType !== "sterile" && PC.hormoneBalance >= 100) {
				r.push(`but with the natural testosterone and artificial female hormones clashing in your system, <span class="change positive">gain muscle slowly.</span>`);
				PC.muscles += 3 + PC.geneticQuirks.mGain;
			} else if (PC.balls > 0 && PC.ballType !== "sterile" && PC.hormoneBalance <= -100) {
				r.push(`and with the natural testosterone and artificial male hormones in your system, <span class="change positive">rapidly bulk up.</span>`);
				PC.muscles += 8;
			} else if (PC.balls > 0 && PC.ballType !== "sterile") {
				r.push(`and with the natural testosterone in your system, <span class="change positive">efficiently bulk up.</span>`);
				PC.muscles += 5 + PC.geneticQuirks.mGain;
			} else if (PC.balls > 0) {
				r.push(`but with your useless balls making little testosterone for you to use, barely <span class="change positive">gain muscle.</span>`);
				PC.muscles += 2 + PC.geneticQuirks.mGain;
			} else if (PC.hormoneBalance <= -100) {
				r.push(`and with the artificial testosterone in your system, <span class="change positive">gain muscle.</span>`);
				PC.muscles += 5 + PC.geneticQuirks.mGain;
			} else if (PC.hormoneBalance >= 100) {
				r.push(`but with lots of female hormones in your system, barely <span class="change positive">gain muscle.</span>`);
				PC.muscles += 2 + PC.geneticQuirks.mGain;
			} else {
				r.push(`<span class="change positive">slowly bulking up.</span>`);
				PC.muscles += 3 + PC.geneticQuirks.mGain;
			}
			if ((PC.geneMods.NCS === 0 && random(1, 100) > 90) || (PC.geneMods.NCS === 1 && random(1, 100) > 45)) {
				if ((PC.geneMods.NCS === 0 && boobSize >= 200) || (PC.geneMods.NCS === 1 && boobSize > 100)) {
					if (PC.geneMods.NCS === 0) {
						r.push(`All the exercise <span class="change negative">cuts a little fat from your chest.</span>`);
						PC.boobs -= 50;
					} else {
						r.push(`All the exercise <span class="change negative">cuts some fat off your chest.</span>`);
						PC.boobs -= 100;
					}
				} else if (buttSize > 1 && (PC.geneticQuirks.rearLipedema !== 2 || (buttSize > 10 && random(1, 100) > 80))) {
					if (PC.geneMods.NCS === 0 || buttSize === 1) {
						r.push(`<span class="change negative">Your butt shrinks from your efforts.</span>`);
						PC.butt -= 1;
					} else {
						r.push(`<span class="change negative">Your butt shrinks a little from your efforts.</span>`);
						PC.butt -= 2;
					}
				}
			}
			if (random(1, 100) > 80) {
				r.push(`You <span class="health inc">feel better</span> after a successful workout.`);
				improveCondition(PC, 10);
			}
			if (PC.weight > 10 && PC.weightDirection !== 1) {
				r.push(`Unsurprisingly, the heavy workouts also <span class="change positive">burn off some excess fat.</span>`);
				PC.weight -= 2;
				if (PC.weightDirection === -1) {
					PC.weight -= 2;
				}
			}
			PC.muscles = Math.clamp(PC.muscles, -100, 100);
			if (PC.muscles >= 100) {
				r.push(`There is just no more room for muscle on your frame, so you will be <span class="noteworthy">resuming a normal diet</span> next week.`);
				PC.diet = PCDiet.HEALTHY;
			}
		}
	}

	function loseMuscle() {
		if (onBedRest(PC) || !canWalk(PC)) {
			r.push(`You aren't capable of actively working out, so you're <span class="noteworthy">back on a normal diet.</span>`);
			PC.diet = PCDiet.HEALTHY;
		} else if (PC.muscles > 0) {
			r.push(`Your workouts are centered around cardio,`);
			if (PC.geneticQuirks.mLoss === 2) {
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`and since you have myotonic dystrophy,`);
				} else {
					r.push(`and despite run-of-the-mill routines,`);
				}
				r.push(`you <span class="change positive">rapidly lose musculature.</span>`);
				PC.muscles -= 10;
			} else if (PC.geneticQuirks.mGain === 2) {
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`but with myotonic hypertrophy,`);
				} else {
					r.push(`but despite your effort,`);
				}
				r.push(`you <span class="change positive">barely lose any muscle.</span>`);
				PC.muscles -= 2;
			} else if (PC.drugs === Drug.STEROID) {
				r.push(`but since you're still shooting gear, you <span class="change positive">lose mass slowly.</span>`);
				PC.muscles -= 3 + PC.geneticQuirks.mLoss;
			} else if (PC.balls > 0 && PC.ballType !== "sterile" && PC.hormoneBalance <= -100) {
				r.push(`but since there's so much natural and artificial testosterone in your system, you <span class="change positive">lose mass slowly.</span>`);
				PC.muscles -= 3 + PC.geneticQuirks.mLoss;
			} else if (PC.balls > 0 && PC.ballType !== "sterile" && PC.hormoneBalance >= 100) {
				r.push(`and with your natural testosterone production counteracted by hormone treatment, you <span class="change positive">readily lose musculature.</span>`);
				PC.muscles -= 5 + PC.geneticQuirks.mLoss;
			} else if (PC.balls > 0 && PC.ballType !== "sterile") {
				r.push(`but with your natural testosterone production, you <span class="change positive">lose muscle slowly.</span>`);
				PC.muscles -= 3 + PC.geneticQuirks.mLoss;
			} else if (PC.balls > 0) {
				r.push(`and with your useless balls not producing much testosterone, you <span class="change positive">easily lose musculature.</span>`);
				PC.muscles -= 5 + PC.geneticQuirks.mLoss;
			} else if (PC.hormoneBalance >= 100) {
				r.push(`and with the female hormone treatments, your <span class="change positive">rapidly lose musculature.</span>`);
				PC.muscles -= 8 + PC.geneticQuirks.mLoss;
			} else if (PC.hormoneBalance <= -100) {
				r.push(`but under male hormone treatment, you <span class="change positive">lose muscle slowly.</span>`);
				PC.muscles -= 3 + PC.geneticQuirks.mLoss;
			} else {
				r.push(`so you <span class="change positive">steadily lose musculature.</span>`);
				PC.muscles -= 5 + PC.geneticQuirks.mLoss;
			}
			if ((PC.geneMods.NCS === 0 && random(1, 100) > 90) || (PC.geneMods.NCS === 1 && random(1, 100) > 45)) {
				if ((PC.geneMods.NCS === 0 && boobSize >= 200) || (PC.geneMods.NCS === 1 && boobSize > 100) && gigantomastiaMod !== 3) {
					if (PC.geneMods.NCS === 0) {
						r.push(`All the exercise <span class="change negative">cuts a little fat from your chest.</span>`);
						PC.boobs -= 50;
					} else {
						r.push(`All the exercise <span class="change negative">cuts some fat off your chest.</span>`);
						PC.boobs -= 100;
					}
				} else if (buttSize > 1 && (PC.geneticQuirks.rearLipedema !== 2 || (buttSize > 10 && random(1, 100) > 80))) {
					if (PC.geneMods.NCS === 0 || buttSize === 1) {
						r.push(`<span class="change negative">Your butt shrinks from your efforts.</span>`);
						PC.butt -= 1;
					} else {
						r.push(`<span class="change negative">Your butt shrinks a little from your efforts.</span>`);
						PC.butt -= 2;
					}
				}
			}
			if (random(1, 100) > 80) {
				r.push(`You <span class="health inc">feel better</span> after a successful workout.`);
				improveCondition(PC, 10);
			}
			if (PC.weight > 10 && PC.weightDirection !== 1) {
				r.push(`Unsurprisingly, the workouts also <span class="change positive">burn off some excess fat.</span>`);
				PC.weight -= 2;
				if (PC.weightDirection === -1) {
					PC.weight -= 2;
				}
			}
			PC.muscles = Math.clamp(PC.muscles, 0, 100);
			if (PC.muscles <= 0) {
				r.push(`You've finally shed the last of your visible muscles, so you will be <span class="noteworthy">resuming a normal diet</span> next week.`);
				PC.diet = PCDiet.HEALTHY;
			}
		} else {
			r.push(`You're focused on a cardio regimen to keep yourself lithe.`);
			if (PC.muscles < -10) {
				r.push(`Since you are rather weak, this routine helps build you up.`);
				PC.muscles++;
			}
			if (((PC.geneMods.NCS === 0 && boobSize >= 200) || (PC.geneMods.NCS === 1 && (boobSize > 100))) && gigantomastiaMod !== 3) {
				if (PC.geneMods.NCS === 0) {
					r.push(`All the exercise <span class="change negative">cuts a little fat from your chest.</span>`);
					PC.boobs -= 50;
				} else {
					r.push(`All the exercise <span class="change negative">cuts some fat off your chest.</span>`);
					PC.boobs -= 100;
				}
			}
			if (random(1, 100) > 50) {
				if (buttSize > 1 && (PC.geneticQuirks.rearLipedema !== 2 || (buttSize > 10 && random(1, 100) > 80))) {
					r.push(`<span class="change negative">Your butt shrinks from your efforts.</span>`);
					PC.butt -= 1;
				}
			}
			if (random(1, 100) > 50 && PC.health.condition <= 90 && PC.health.condition >= -20) {
				r.push(`You <span class="health inc">feel better</span> after a successful workout.`);
				improveCondition(PC, 5);
			}
			if (PC.weight > 10 && PC.weightDirection !== 1) {
				r.push(`Unsurprisingly, the workouts also <span class="change positive">burn off some excess fat.</span>`);
				PC.weight -= 2;
				if (PC.weightDirection === -1) {
					PC.weight -= 2;
				}
			}
		}
	}

	function sharedAssetLoss(weightMod) {
		if (PC.hormoneBalance > 30 && PC.geneMods.NCS !== 0) { // 'Expected' breast size based on weight for feminine-bodied slaves
			growthGoal = Math.trunc((100 + ((PC.weight + 100) * 5) + (2 * PC.lactationAdaptation)) * (0.85 + (PC.hormoneBalance / 400)) * gigantomastiaMod);
			roll = 300;
			target = Math.trunc(Math.clamp((weightMod * 20) + (boobSize - growthGoal) / 5, 0, 270));
		} else { // For masculine and childish-bodied slaves
			growthGoal = ((PC.weight + 100) * 2 + PC.lactationAdaptation) * gigantomastiaMod;
			roll = 75;
			target = Math.trunc(Math.clamp(weightMod * 2 + (boobSize - growthGoal) / 20, 0, 68));
		}
		if (random(1, roll) <= target && (gigantomastiaMod !== 3 && boobSize > 100)) {
			if (random(1, 2) === 1) {
				r.push(`<span class="change negative">Your chest has gotten smaller.</span>`);
				PC.boobs -= 100;
			} else {
				r.push(`<span class="change negative">Your chest has gotten a little smaller.</span>`);
				PC.boobs -= 50 * (1 + PC.geneMods.NCS);
			}
		}
		if (PC.hormoneBalance > 30) { // 'Expected' butt size based on weight for feminine-bodied slaves, scaled up by 1000
			growthGoal = Math.trunc((PC.weight + 100) * 25 * (0.9 + PC.hormoneBalance / 600) * (rearQuirk / 2 + 1));
			roll = 40000;
			target = Math.trunc(Math.clamp(weightMod * 1000 + (buttSize * 1000 - growthGoal) * 2, 0, 36000));
		} else { // For masculine- and childish-bodied slaves, likewise scaled up
			growthGoal = Math.trunc((PC.weight + 100) * 12.5) * (rearQuirk / 2 + 1);
			roll = 80000;
			target = Math.trunc(Math.clamp(weightMod * 1000 + (buttSize * 1000 - growthGoal) * 4, 0, 72000));
		}
		if (random(1, roll) <= target && buttSize > 0) {
			if (PC.geneMods.NCS === 1 && buttSize > 2) {
				r.push(`<span class="change negative">Your butt has shrunk.</span>`);
				PC.butt -= 2;
			} else {
				r.push(`<span class="change negative">Your butt has shrunk a little.</span>`);
				PC.butt -= 1;
			}
		}
	}

	function sharedAssetGain(weightMod) {
		if (PC.hormoneBalance > 30 && PC.geneMods.NCS !== 1) { // 'Expected' breast size based on weight for feminine-bodied slaves */
			growthGoal = Math.trunc((100 + (PC.weight + 100) * 5 + 2 * PC.lactationAdaptation) * (0.85 + PC.hormoneBalance / 400) * gigantomastiaMod);
			roll = 300;
			target = Math.trunc(Math.clamp(weightMod * 20 - (boobSize - growthGoal) / 5, 0, 270));
		} else { // For masculine and childish-bodied slaves
			growthGoal = ((PC.weight + 100) * 2 + PC.lactationAdaptation) * gigantomastiaMod;
			roll = 75;
			target = Math.trunc(Math.clamp(weightMod * 2 - (boobSize - growthGoal) / 20, 0, 68));
		}
		if (PC.geneMods.NCS === 1 || (V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1 && !canEatFood(PC))) {
			roll *= 2;
		}
		// PC food is not laced with hormones normally, so galactorrhea is not triggered here.
		if (random(1, roll) <= target) {
			r.push(`Some of the fat <span class="change positive">finds its way to your chest.</span>`);
			PC.boobs += (100 / random(1, 2)) / (1 + PC.geneMods.NCS);
		}
		if (PC.hormoneBalance > 30) { // 'Expected' butt size based on weight for feminine-bodied slaves, scaled up by 1000
			growthGoal = Math.trunc((PC.weight + 100) * 25 * (0.9 + PC.hormoneBalance / 600) * (rearQuirk / 2 + 1));
			roll = 40000;
			target = Math.trunc(Math.clamp(weightMod * 1000 - (buttSize * 1000 - growthGoal) * 2, 0, 36000));
		} else { // For masculine and childish-bodied slaves, likewise scaled up
			growthGoal = Math.trunc((PC.weight + 100) * 12.5) * (rearQuirk / 2 + 1);
			roll = 80000;
			target = Math.trunc(Math.clamp(weightMod * 1000 - (buttSize * 1000 - growthGoal) * 4, 0, 72000));
		}
		if (PC.geneMods.NCS === 1 || (V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1 && !canEatFood(PC))) {
			roll *= 2;
		}
		if (random(1, roll) <= target) {
			r.push(`Your butt <span class="change positive">feels bigger and softer.</span>`);
			PC.butt += 1;
		}
	}

	function outsideEffects() {
		if (![PCDiet.MUSCLE, PCDiet.SLIM].includes(PC.diet)) {
			if (PC.geneticQuirks.mLoss === 2 && PC.muscles > -100) {
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`You have myotonic dystrophy, so your body <span class="lime">constantly loses muscle mass</span> unless you spend extra time in the gym.`);
				}
				PC.muscles = Math.clamp(PC.muscles - 3, -100, 100);
			} else if (PC.geneticQuirks.mGain === 2 && PC.muscles < 100 && PC.weight >= -95) {
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`You have myotonic hypertrophy, so your body <span class="lime">constantly builds muscle mass</span> unless you starve yourself.`);
				}
				PC.muscles = Math.clamp(PC.muscles + 3, -100, 100);
			}
		}
		if (![PCDiet.FATTEN, PCDiet.RESTRICTED, PCDiet.SLIM].includes(PC.diet)) {
			if (PC.weightDirection === -1 && PC.weight > -100) {
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`Your body <span class="lime">aggressively burns fat</span> due to your`);
					if (PC.geneticQuirks.wGain === 2 && PC.geneticQuirks.wLoss === 2) {
						r.push(`irregular leptin production.`);
					} else {
						r.push(`hypoleptinemia.`);
					}
				}
				PC.weight = Math.clamp(PC.weight - 3, -100, 200);
			} else if (PC.weightDirection === 1 && PC.geneticQuirks.wGain === 2 && PC.weight < 200) {
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`Your body <span class="lime">aggressively stores fat</span> due to your`);
					if (PC.geneticQuirks.wGain === 2 && PC.geneticQuirks.wLoss === 2) {
						r.push(`irregular leptin production.`);
					} else {
						r.push(`hyperleptinemia.`);
					}
				}
				PC.weight = Math.clamp(PC.weight + 3, -100, 200);
			} else if (V.arcologies[0].FSHedonisticDecadenceDecoration >= 40 && canEatFood(PC) && PC.weight < 120 && !onBedRest(PC)) {
				r.push(`There is too much delicious food, and little of it healthy, available to you as you tour your domain. A little snacking here and there isn't a problem, but to do so to this extent <span class="lime">pads out your waistline</span> and can get out of hand fast if not kept tabs on.`);
				PC.weight++;
			}
		}
		if (PC.geneMods.livestock === 1) {
			if ([PCDiet.FATTEN, PCDiet.RESTRICTED, PCDiet.SLIM, PCDiet.CORRECTIVE, PCDiet.FEMALE, PCDiet.FUTA].includes(PC.diet)) {
				r.push(`The gene therapy to boost your productivity has a side effect of weight gain, but it really feels like it's just trying to <class="lime">fatten you up for wholesale.</span>`);
			} else if ([PCDiet.RESTRICTED, PCDiet.SLIM].includes(PC.diet)) {
				r.push(`The gene therapy to boost your productivity has a side effect of weight gain, but it really feels like it's just trying to <class="orange">keep you fat for wholesale.</span>`);
			}
		}
	}
};
