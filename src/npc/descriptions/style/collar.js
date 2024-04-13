/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.collar = function(slave) {
	const r = [];
	let daddy;
	const pregCollar = either(1, 2, 3);
	const {
		he, him, his, He
	} = getPronouns(slave);
	switch (slave.collar) {
		case "uncomfortable leather":
			r.push(`${He} is wearing an uncomfortable leather collar with a useful steel ring in front.`);
			break;
		case "preg biometrics":
			if (slave.pregSource > 0) {
				daddy = findFather(slave.pregSource).slaveName;
			}
			r.push(`${He} is wearing a heavy metal collar with a digital display; it currently reads:`);
			if (slave.preg > 0 && slave.pregKnown === 0) {
				r.push(`"I might be preggers! Rub my belly for luck!"`);
			} else {
				if (pregCollar === 1) {
					if (slave.pregWeek < 0) {
						r.push(`"I'm a mommy now!"`);
					} else if (slave.pregKnown === 1) {
						if (slave.pregType === 1) {
							r.push(`"${num(1)} baby`);
						} else {
							r.push(`"${num(slave.pregType)} babies`);
						}
						r.push(`on board!"`);
					} else if (isFertile(slave)) {
						r.push(`"Knock me up!"`);
					} else if (slave.vagina < 0 && slave.mpreg < 1) {
						r.push(`"Womb not detected!"`);
					} else if ((slave.ovaries > 0 || slave.mpreg > 0) && slave.pubertyXX === 0 && slave.physicalAge < V.fertilityAge) {
						r.push(`"I'm not old enough to get pregnant yet!"`);
					} else {
						r.push(`"I'm infertile!"`);
					}
				} else if (pregCollar === 2) {
					if (slave.vagina < 0 && slave.mpreg < 1) {
						r.push(`"I have no womb!"`);
					} else if (slave.pregWeek < 0) {
						r.push(`"${num(slave.pregWeek * -1)}`);
						if (slave.pregWeek === -1) {
							r.push(`week`);
						} else {
							r.push(`weeks`);
						}
						r.push(`until I can get preggers again!"`);
					} else if (slave.pregKnown === 1) {
						if (slave.broodmother === 2) {
							if (slave.preg >= 36) {
								r.push(`"I'm crowning as you read this!"`);
							} else {
								r.push(`"${37 - Math.ceil(slave.preg)} ${37 - Math.ceil(slave.preg) > 1 ? `weeks` : `week`} till the floodgates open!"`);
							}
						} else if (slave.broodmother === 1) {
							if (slave.preg >= 36) {
								r.push(`"I'll be giving birth this week!"`);
							} else {
								r.push(`"${37 - Math.ceil(slave.preg)} ${37 - Math.ceil(slave.preg) > 1 ? `weeks` : `week`} till the birthing begins!"`);
							}
						} else if (slave.preg > 40) {
							r.push(`"I'm ${Math.ceil(slave.preg) - 40} ${Math.ceil(slave.preg) - 40 > 1 ? `weeks` : `week`} overdue!"`);
						} else if (slave.preg > 39) {
							r.push(`"I'm due this week!"`);
						} else {
							r.push(`"${40 - Math.ceil(slave.preg)} ${40 - Math.ceil(slave.preg) > 1 ? `weeks` : `week`} till I pop!"`);
						}
					} else if (isFertile(slave)) {
						r.push(`"My womb needs filling!"`);
					} else if ((slave.ovaries > 0 || slave.mpreg > 0) && slave.pubertyXX === 0) {
						r.push(`"I should be fertile`);
						if (slave.pubertyAgeXX - slave.physicalAge > 2) {
							r.push(`in about ${Math.round(slave.pubertyAgeXX - slave.physicalAge)} years!"`);
						} else if (slave.pubertyAgeXX - slave.physicalAge > 1) {
							r.push(`next year!"`);
						} else {
							r.push(`in about ${Math.ceil((slave.pubertyAgeXX * 52 - (slave.physicalAge * 52 + slave.birthWeek)))} weeks!"`);
						}
					} else {
						r.push(`"I can't get pregnant right now!"`);
					}
				} else {
					if (slave.vagina < 0 && slave.mpreg < 1) {
						r.push(`"I need a womb!"`);
					} else if (slave.pregWeek < 0) {
						r.push(`"I can't wait for my belly to swell with life again!"`);
					} else if (slave.pregKnown === 1) {
						if (slave.pregSource === -1) {
							r.push(`"Womb claimed by my ${getWrittenTitle(slave)}!"`);
						} else if (slave.pregSource === 0 || slave.pregSource === -2 || slave.pregSource === -5) {
							r.push(`"Baby made by slutting around!"`);
						} else if (slave.pregSource === -7) {
							r.push(`"My baby was made with science!"`);
						} else if (slave.pregSource === -9) {
							r.push(`"Futanari Sisters, now two for the price of one!"`);
						} else {
							r.push(`"Womb claimed by ${daddy}!"`);
						}
					} else if (isFertile(slave)) {
						r.push(`"Put a baby in me today!"`);
					} else if ((slave.ovaries > 0 || slave.mpreg > 0) && slave.pubertyXX === 0 && slave.physicalAge < V.fertilityAge) {
						r.push(`"I'm too young to get pregnant!"`);
					} else {
						r.push(`"Try to knock me up some other time!"`);
					}
				}
			}
			break;
		case "silk ribbon":
			r.push(`${He} is wearing a tight silk ribbon fitted to ${his} neck; it is oddly elegant.`);
			break;
		case "tight steel":
			r.push(`${He} is wearing a tight steel collar whose restricting metal touch ${he} cannot escape.`);
			break;
		case "shock punishment":
			r.push(`${He} is wearing a utilitarian collar with a punishment device at ${his} throat to administer agonizing shocks.`);
			break;
		case "neck corset":
			r.push(`${He} is wearing a fitted leather neck corset that constricts ${his} breathing and holds ${his} head rigidly upright.`);
			break;
		case "stylish leather":
			r.push(`${He} is wearing a stylish leather collar buckled in the front, a classic accessory for the well behaved slave.`);
			break;
		case "satin choker":
			r.push(`${He} is wearing a steel reinforced black satin choker that is at once elegant and functional.`);
			break;
		case "heavy gold":
			r.push(`${He} is wearing a heavy gold collar, an outstanding bit of ostentation.`);
			break;
		case "pretty jewelry":
			r.push(`${He} is wearing a pretty slave collar that can almost be mistaken for jewelry.`);
			break;
		case "bell collar":
			r.push(`${He} is wearing a comfortable leather collar with a small brass bell at ${his} throat.`);
			break;
		case "leather with cowbell":
			r.push(`${He} is wearing a comfortable leather collar with a small steel cowbell at ${his} throat.`);
			break;
		case "bowtie":
			r.push(`${He} is wearing the collar from a white formal shirt, and a black bowtie, though these conceal an actual collar that works perfectly well for restraint.`);
			break;
		case "neck tie":
			r.push(`${He} is wearing a neck tie, though it conceals an actual collar that works perfectly well for restraint.`);
			break;
		case "ancient Egyptian":
			r.push(`${He} is wearing a beautiful golden wesekh, a collar that spreads from ${his} neck out onto both shoulders and down ${his} front.`);
			break;
		case "cruel retirement counter":
		case "nice retirement counter":
			r.push(`${He} is wearing a`);
			if (slave.collar === "cruel retirement counter") {
				r.push(`heavy metal collar`);
			} else {
				r.push(`nice collar, almost a necklace,`);
			}
			r.push(`with a small numerical display reading`);
			if (slave.indenture > -1) {
				r.push(`${slave.indenture}, the number of weeks left in ${his} indenture.`);
			} else if (V.policies.retirement.sex > 0) {
				r.push(`${V.policies.retirement.sex - (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.penetrative + slave.counter.mammary)}, for the number of cocks between ${him} and ${his} freedom.`);
			} else if (V.policies.retirement.milk > 0) {
				r.push(`${V.policies.retirement.milk - slave.counter.milk}, for the amount of milk ${he} has yet to give.`);
			} else if (V.policies.retirement.cum > 0) {
				r.push(`${V.policies.retirement.cum - slave.counter.cum}, for the amount of cum ${he} has yet to give.`);
			} else if (V.policies.retirement.births > 0) {
				r.push(`${V.policies.retirement.births - slave.counter.births}, for the number of pregnancies still between ${him} and freedom.`);
			} else if (V.policies.retirement.kills > 0) {
				r.push(`${V.policies.retirement.kills - slave.counter.pitKills}, for the number of lives still between ${him} and freedom.`);
			} else if (V.policies.retirement.physicalAgePolicy === 0) {
				r.push(`${(52 * (V.retirementAge - (slave.actualAge + 1))) + (52 - slave.birthWeek)}, the number of weeks of sexual slavery ahead of ${him}.`);
			} else {
				r.push(`${(52 * (V.retirementAge - (slave.physicalAge + 1))) + (52 - slave.birthWeek)}, the number of weeks of sexual slavery ahead of ${him}.`);
			}
	}

	return r.join(" ");
};
