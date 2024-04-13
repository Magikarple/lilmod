App.EndWeek.Rules = {};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.attractionDiscovery = function(slave) {
	const el = new DocumentFragment();
	let color;
	let text;
	if (slave.attrXY <= 5) {
		color = "red";
		text = "disgusted by men";
	} else if (slave.attrXY <= 15) {
		color = "red";
		text = "turned off by men";
	} else if (slave.attrXY <= 35) {
		color = "red";
		text = `not attracted to men`;
	} else if (slave.attrXY <= 65) {
		text = `indifferent to men`;
	} else if (slave.attrXY <= 85) {
		color = "green";
		text = `attracted to men`;
	} else if (slave.attrXY <= 95) {
		color = "green";
		text = "aroused by men";
	} else {
		color = "green";
		text = "passionate about men";
	}
	App.UI.DOM.appendNewElement("span", el, text, color);
	el.append(` and `);
	if (slave.attrXX <= 5) {
		color = "red";
		text = `disgusted by women.`;
	} else if (slave.attrXX <= 15) {
		color = "red";
		text = `turned off by women.`;
	} else if (slave.attrXX <= 35) {
		color = "red";
		text = `not attracted to women.`;
	} else if (slave.attrXX <= 65) {
		text = `indifferent to women.`;
	} else if (slave.attrXX <= 85) {
		color = "green";
		text = `attracted to women.`;
	} else if (slave.attrXX <= 95) {
		color = "green";
		text = `aroused by women.`;
	} else {
		color = "green";
		text = `passionate about women.`;
	}
	App.UI.DOM.appendNewElement("span", el, text, color);
	return el;
};
/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.EndWeek.Rules.playerFetishPlay = function(slave) {
	const {him, his} = getPronouns(slave);
	const r = [];
	if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		switch (slave.fetish) {
			case Fetish.SUBMISSIVE:
				r.push(`hold ${him} down and`);
				if (slave.vagina <= 0 && slave.anus <= 0) {
					r.push(`use ${his} body`);
				} else {
					r.push(`fuck ${him}`);
				}
				break;
			case Fetish.CUMSLUT:
				if (V.PC.dick !== 0) {
					r.push(`cum in ${his} mouth`);
				} else {
					r.push(`use your strap-on on ${his} mouth`);
				}
				break;
			case Fetish.HUMILIATION:
				r.push(`use ${him} in public`);
				break;
			case Fetish.BUTTSLUT:
				r.push(`fuck ${his} butt`);
				break;
			case Fetish.BOOBS:
				r.push(`fondle ${his} breasts`);
				if (slave.lactation > 0) {
					slave.lactationDuration = 2;
					slave.boobs -= slave.boobsMilk;
					slave.boobsMilk = 0;
				}
				break;
			case Fetish.SADIST:
				r.push(`let ${him} help you abuse other slaves`);
				break;
			case Fetish.MASOCHIST:
				r.push(`hurt ${him}`);
				break;
			case Fetish.DOM:
				r.push(`let ${him} help you use other slaves`);
				break;
			case Fetish.PREGNANCY:
				if (isFertile(slave) && V.PC.dick !== 0) {
					r.push(`put a baby in ${him}`);
				} else if (slave.bellyPreg >= 1500 || slave.bellyImplant >= 1500) {
					r.push(`enjoy ${his} fecund curves`);
				} else {
					r.push(`breed ${him}`);
				}
				break;
			default:
				r.push(`fuck ${him}`);
		}
	} else {
		r.push(`fuck ${him}`);
	}
	return r.join(" ");
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.playerEnergy = function(slave) {
	const el = new DocumentFragment();
	const {he, him, his, himself, wife} = getPronouns(slave);
	const currentDeferredNeed = V.PC.deferredNeed;
	if (isPlayerFrigid()) {
		el.append(`You have no desire for sex, but `);
		if (slave.relationship === -3) {
			el.append(`do your best to keep your ${wife} `);
			if (slave.devotion < -20) {
				el.append(`satisfied, even if ${he} doesn't want it. `);
			} else {
				el.append(`satisfied. `);
			}
			slave.need -= 20;
			el.append(SimpleSexAct.Player(slave, 2));
			V.PC.deferredNeed -= 5;
		} else {
			el.append(`are obligated to help get ${him} off. You mechanically relieve ${him}, bringing ${him} to orgasm by hand, to take some of the edge off. `);
			slave.need -= 10;
			if (slave.need > slave.energy / 2) {
				el.append(`It's not enough, and ${he} leaves horny, `);
				App.UI.DOM.appendNewElement("span", el, `reducing ${his} trust `, "gold");
				el.append(`in you. `);
				slave.trust -= 1;
			}
		}
	} else if (App.EndWeek.saVars.freeSexualEnergy > 0) {
		if (App.EndWeek.saVars.freeSexualEnergy === 3) {
			el.append(`You have surplus sexual energy to burn, even when ${he} doesn't ask, and ${he} `);
			if (slave.devotion < -20) {
				App.UI.DOM.appendNewElement("span", el, `hates ${himself} `, "hotpink");
				el.append(`for how often ${he} gets off on you relieving your needs with ${his} body. `);
			} else if (slave.devotion <= 50 || slave.trust <= 20) {
				App.UI.DOM.appendNewElement("span", el, `gets used to being a sex slave `, "hotpink");
				el.append(`every time ${he} climaxes as you use ${him}. `);
			} else {
				App.UI.DOM.appendNewElement("span", el, `eagerly looks forward `, "hotpink");
				el.append(`to each climax ${he} shares with you. `);
			}
			slave.devotion += 2;
			slave.need = 0;
			el.append(SimpleSexAct.Player(slave, 10));
			V.PC.deferredNeed -= 20;
		} else if (App.EndWeek.saVars.freeSexualEnergy === 2) {
			el.append(`You have surplus sexual energy to fuck ${him} whenever `);
			if (slave.relationship === -3) {
				el.append(`you notice ${his} need, `);
			} else if (slave.devotion < 20) {
				el.append(`${he} forces ${himself} to ask, `);
			} else {
				el.append(`${he} asks, `);
			}
			el.append(`and ${he} is `);
			App.UI.DOM.appendNewElement("span", el, `sexually dependent `, "hotpink");
			el.append(`on you. `);
			slave.devotion += 1;
			slave.need -= 40;
			el.append(SimpleSexAct.Player(slave, 5));
			V.PC.deferredNeed -= 10;
		} else if (slave.relationship === -3) {
			el.append(`You have little surplus sexual energy, but you make sure to keep your ${wife}'s needs in `);
			if (slave.devotion < -20) {
				el.append(`mind, even if ${he} doesn't want it. `);
			} else {
				el.append(`mind. `);
			}
			slave.need -= 40;
			el.append(SimpleSexAct.Player(slave, 5));
			V.PC.deferredNeed -= 10;
		} else {
			el.append(`You have little surplus sexual energy, and occasionally, ${he} asks in vain. `);
			slave.need -= 20;
			el.append(SimpleSexAct.Player(slave, 2));
			V.PC.deferredNeed -= 5;
		}
	} else {
		el.append(`You have no surplus sexual energy, and ${he} asks in vain, `);
		App.UI.DOM.appendNewElement("span", el, `reducing ${his} trust `, "gold");
		el.append(`in you. `);
		slave.trust -= 1;
	}
	if (V.debugMode) {
		el.append(`OD: ${currentDeferredNeed}, ND: ${V.PC.deferredNeed}. `);
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.playerDiscoversFetish = function(slave) {
	const el = new DocumentFragment();
	const {he, him, his} = getPronouns(slave);
	if (slave.fetishKnown === 0) {
		if (App.EndWeek.saVars.freeSexualEnergy > random(0, 5)) {
			slave.fetishKnown = 1;
			el.append(`You discover that ${he} really likes it when you `);
			switch (slave.fetish) {
				case Fetish.SUBMISSIVE:
					el.append(`hold ${him} down and fuck ${him}; `);
					App.UI.DOM.appendNewElement("span", el, `${he}'s a submissive!`, ["lightcoral"]);
					break;
				case Fetish.CUMSLUT:
					if (V.PC.dick !== 0) {
						el.append(`cum in ${his} mouth; `);
						App.UI.DOM.appendNewElement("span", el, `${he}'s a cumslut!`, ["lightcoral"]);
					} else {
						el.append(`use your strap-on in ${his} mouth; `);
						App.UI.DOM.appendNewElement("span", el, `${he}'s a cumslut!`, ["lightcoral"]);
					}
					break;
				case Fetish.HUMILIATION:
					el.append(`use ${him} in public; `);
					App.UI.DOM.appendNewElement("span", el, `${he}'s a humiliation fetishist!`, ["lightcoral"]);
					break;
				case Fetish.BUTTSLUT:
					if (canDoAnal(slave)) {
						el.append(`fuck ${his} butt; `);
					} else {
						el.append(`tease ${his} anus; `);
					}
					App.UI.DOM.appendNewElement("span", el, `${he}'s an anal slut!`, ["lightcoral"]);
					break;
				case Fetish.BOOBS:
					el.append(`fondle ${his} breasts; `);
					App.UI.DOM.appendNewElement("span", el, `${he}'s a boob fetishist!`, ["lightcoral"]);
					break;
				case Fetish.SADIST:
					el.append(`let ${him} help you abuse other slaves; `);
					App.UI.DOM.appendNewElement("span", el, `${he}'s a sadist!`, ["lightcoral"]);
					break;
				case Fetish.MASOCHIST:
					el.append(`hurt ${him}; `);
					App.UI.DOM.appendNewElement("span", el, `${he}'s a masochist!`, ["lightcoral"]);
					break;
				case Fetish.DOM:
					el.append(`let ${him} help you use other slaves; `);
					App.UI.DOM.appendNewElement("span", el, `${he}'s dominant!`, ["lightcoral"]);
					break;
				case Fetish.PREGNANCY:
					if (V.PC.dick !== 0) {
						if (slave.mpreg === 0) {
							el.append(`come `);
							if (canDoVaginal(slave)) {
								el.append(`inside `);
							} else {
								el.append(`on `);
							}
							el.append(`${him}; `);
							App.UI.DOM.appendNewElement("span", el, `${he}'s a pregnancy fetishist!`, ["lightcoral"]);
						} else {
							el.append(`come `);
							if (canDoAnal(slave)) {
								el.append(`inside `);
							} else {
								el.append(`on `);
							}
							el.append(`${him}; `);
							App.UI.DOM.appendNewElement("span", el, `${he}'s a pregnancy fetishist!`, ["lightcoral"]);
						}
					} else {
						el.append(`talk dirty and call ${him} a mother; `);
						App.UI.DOM.appendNewElement("span", el, `${he}'s a pregnancy fetishist!`, ["lightcoral"]);
					}
					break;
				default:
					if (canDoVaginal(slave) && slave.vagina === 0) {
						el.append(`touch ${him}; `);
					} else {
						el.append(`fuck ${him}; `);
					}
					App.UI.DOM.appendNewElement("span", el, `${he}'s got a normal sexuality.`, ["lightcoral"]);
			}
		}
	}
	/* closes fetish discovery */
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.playerDrugEffects = function(slave) {
	const el = new DocumentFragment();
	const {He, His,
		he, him, his} = getPronouns(slave);
	if (slave.balls > 0) {
		if (slave.drugs === Drug.GROWTESTICLE || slave.drugs === Drug.INTENSIVETESTICLE) {
			if (slave.devotion > 20 || slave.trust < -20) {
				if (slave.hormoneBalance >= 100) {
					el.append(`${He} can't seem to get enough cum out of ${his} terribly swollen balls in one orgasm to relieve the pressure: `);
					if (slave.dick) {
						el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
					} else {
						el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
					}
					el.append(`This forces ${him} to come to you for release many times a day, and ${he} `);
					App.UI.DOM.appendNewElement("span", el, `is desperately reliant `, "mediumaquamarine");
					if (slave.anus > 0 && canDoAnal(slave) && App.EndWeek.saVars.freeSexualEnergy > 0) {
						el.append(`on your `);
						if (V.PC.dick === 0) {
							el.append(`strap-on `);
						} else {
							el.append(`penis `);
						}
						el.append(`inside ${his} ass as a source of relief. `);
					} else {
						el.append(`on you for relief. `);
					}
					slave.trust += 2;
				} else {
					el.append(`${His} terribly swollen balls force ${him} to come to you for release several times a day, and ${he} `);
					App.UI.DOM.appendNewElement("span", el, `learns to rely `, "mediumaquamarine");
					if (slave.anus > 0 && canDoAnal(slave) && App.EndWeek.saVars.freeSexualEnergy > 0) {
						el.append(`on your `);
						if (V.PC.dick === 0) {
							el.append(`strap-on `);
						} else {
							el.append(`penis `);
						}
						el.append(`inside ${his} ass as a source of relief. `);
					} else {
						el.append(`on you for relief. `);
					}
					slave.trust += 1;
				}
			} else {
				el.append(`${He} refuses to come to you for help with ${his} terribly swollen balls, no matter how backed up ${he} becomes. The intense blue-balling only `);
				App.UI.DOM.appendNewElement("span", el, `makes ${him} dislike you more.`, "mediumorchid");
				slave.devotion -= 1;
			}
		} else if (slave.drugs === Drug.HYPERTESTICLE) {
			if (slave.devotion > 20 || slave.trust < -20) {
				if (slave.hormoneBalance >= 100) {
					el.append(`${He} can't seem to get enough cum out of ${his} grotesquely swollen balls in one orgasm to get relieve the pressure: `);
					if (slave.dick) {
						el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
					} else {
						el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
					}
					el.append(`This forces ${him} to come to you for release many times a day, and ${he} `);
					App.UI.DOM.appendNewElement("span", el, `is desperately reliant `, "mediumaquamarine");
					if (slave.anus > 0 && canDoAnal(slave) && App.EndWeek.saVars.freeSexualEnergy > 0) {
						el.append(`on your `);
						if (V.PC.dick === 0) {
							el.append(`strap-on `);
						} else {
							el.append(`penis `);
						}
						el.append(`inside ${his} ass as a source of relief. `);
					} else {
						el.append(`on you for relief. `);
					}
					slave.trust += 2;
				} else {
					el.append(`${His} grotesquely swollen balls force ${him} to come to you for release dozens of times a day, and ${he} `);
					App.UI.DOM.appendNewElement("span", el, `is desperately reliant `, "mediumaquamarine");
					if (slave.anus > 0 && canDoAnal(slave) && App.EndWeek.saVars.freeSexualEnergy > 0) {
						el.append(`on your `);
						if (V.PC.dick === 0) {
							el.append(`strap-on `);
						} else {
							el.append(`penis `);
						}
						el.append(`inside ${his} ass as a source of relief. `);
					} else {
						el.append(`on you for relief. `);
					}
					slave.trust += 1;
				}
			} else {
				el.append(`${He} refuses to come to you for help with ${his} grotesquely swollen balls, no matter how backed up and sore ${he} becomes. The intense blue-balling only `);
				App.UI.DOM.appendNewElement("span", el, `makes ${him} hate you more.`, "mediumorchid");
				slave.devotion -= 3;
			}
		}
	}
	if (slave.drugs === Drug.SUPERFERTILITY && canImpreg(slave, V.PC)) {
		if (slave.devotion > 20 || slave.trust < -20) {
			el.append(`${His} reproductive system is in overdrive leading ${him} to come to you for insemination several times a day; ${he} `);
			App.UI.DOM.appendNewElement("span", el, `desperately hopes `, "mediumaquamarine");
			el.append(`for the day your seed takes root in ${his} womb. `);
			slave.trust += 1;
		}
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.masturbationFetishPlay = function(slave) {
	const el = new DocumentFragment();
	const {he, his, himself} = getPronouns(slave);
	if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		if (slave.fetish === Fetish.SUBMISSIVE) {
			el.append(`frequently pretends to be getting held down and dominated. `);
		} else if (slave.fetish === Fetish.CUMSLUT) {
			if (slave.dick > 5) {
				el.append(`enjoys giving ${himself} head. `);
			} else if (slave.dick > 0) {
				el.append(`enjoys licking up ${his} own cum. `);
			} else {
				el.append(`always has a dildo in ${his} mouth. `);
			}
		} else if (slave.fetish === Fetish.HUMILIATION) {
			el.append(`usually does it out in the open for all to see. `);
		} else if (slave.fetish === Fetish.BUTTSLUT) {
			if (slave.anus > 0) {
				el.append(`usually pounds ${his} ass with the largest dildo ${he} can find. `);
			} else {
				el.append(`enjoys fiddling with ${his} virgin asshole. `);
			}
		} else if (slave.fetish === Fetish.BOOBS) {
			el.append(`pays extra attention to ${his} breasts and nipples. `);
			if (slave.lactation > 0) {
				slave.lactationDuration = 2;
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			} else {
				el.append(induceLactation(slave));
			}
		} else if (slave.fetish === Fetish.SADIST) {
			el.append(`frequently poses threats at ${himself}. `);
		} else if (slave.fetish === Fetish.MASOCHIST) {
			el.append(`frequently pretends to be getting held down and forcibly raped. `);
		} else if (slave.fetish === Fetish.DOM) {
			el.append(`usually pretends to dominate ${himself}. `);
		} else if (slave.fetish === Fetish.PREGNANCY) {
			if (slave.belly > 1500) {
				el.append(`always rubs and teases ${his} ${bellyAdjective(slave)} belly while doing so. `);
			} else if (isItemAccessible.entry("a small empathy belly", "bellyAccessory")) {
				el.append(`frequently straps on a fake belly to enhance ${his} fun. `);
			} else {
				el.append(`frequently pretends to be `);
				if (slave.balls > 0) {
					el.append(`getting a girl pregnant. `);
				} else {
					el.append(`getting knocked up. `);
				}
			}
		} else if (slave.energy > 95) {
			el.append(`strives to achieve as many orgasms as ${he} can in one session. `);
		} else {
			el.append(`quickly gets off and moves on. `);
		}
	} else if (slave.energy > 95) {
		el.append(`strives to achieve as many orgasms as ${he} can in one session. `);
	} else {
		el.append(`quickly gets off and moves on. `);
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.masturbationDiscoversFetish = function(slave) {
	const el = new DocumentFragment();
	const {he, him, his, himself} = getPronouns(slave);
	if (slave.fetishKnown === 0 && random(1, 20) === 1) {
		slave.fetishKnown = 1;
		el.append(`However, you start to notice a trend in ${his} fantasies: `);
		if (slave.fetish === Fetish.SUBMISSIVE) {
			el.append(`${he} likes to tie ${himself} up and boss ${himself} around; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s a submissive!`, ["lightcoral"]);
		} else if (slave.fetish === Fetish.CUMSLUT) {
			if (slave.dick > 0) {
				el.append(`${he} often eats ${his} own cum when ${he}'s finished; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a cumslut!`, ["lightcoral"]);
			} else {
				el.append(`${he} likes to have something, anything, in ${his} mouth while ${he} masturbates; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a cumslut!`, ["lightcoral"]);
			}
		} else if (slave.fetish === Fetish.HUMILIATION) {
			el.append(`${he} tends to masturbate in places where others can walk in on ${him}; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s a humiliation fetishist!`, ["lightcoral"]);
		} else if (slave.fetish === Fetish.BUTTSLUT) {
			el.append(`${he} always pays special attention to ${his} butthole; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s an anal slut!`, ["lightcoral"]);
		} else if (slave.fetish === Fetish.BOOBS) {
			el.append(`${he} always has a hand to ${his} nipples; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s a boob fetishist!`, ["lightcoral"]);
			if (slave.lactation > 0) {
				slave.lactationDuration = 2;
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			} else {
				el.append(induceLactation(slave));
			}
		} else if (slave.fetish === Fetish.SADIST) {
			el.append(`${he} tends to threaten ${his} toys; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s a sadist!`, ["lightcoral"]);
		} else if (slave.fetish === Fetish.MASOCHIST) {
			el.append(`${he} often to abuses ${himself}; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s a masochist!`, ["lightcoral"]);
		} else if (slave.fetish === Fetish.DOM) {
			el.append(`${he} sometimes bosses ${his} toys around; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s dominant!`, ["lightcoral"]);
		} else if (slave.fetish === Fetish.PREGNANCY) {
			el.append(`${he} frequently pretends to either get pregnant, be pregnant, or get someone else pregnant; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s a pregnancy fetishist!`, ["lightcoral"]);
		} else if (slave.energy > 95) {
			el.append(`${he}'s always horny; `);
			App.UI.DOM.appendNewElement("span", el, `${he}'s a nympho!`, ["lightcoral"]);
		} else {
			App.UI.DOM.appendNewElement("span", el, `they are incredibly mundane.`, ["lightcoral"]);
		}
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.masturbationDrugEffects = function(slave) {
	const el = new DocumentFragment();
	const {
		He, His,
		he, him, his, himself
	} = getPronouns(slave);

	if (slave.balls > 0) {
		if (slave.drugs === Drug.GROWTESTICLE || slave.drugs === Drug.INTENSIVETESTICLE) {
			if (slave.hormoneBalance >= 100) {
				el.append(`${He} can't seem to get enough cum out of ${his} terribly swollen balls in one orgasm to get relieve the pressure: `);
				if (slave.dick) {
					el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				} else {
					el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				}
				el.append(`${He} masturbates as often as ${he} can, but `);
				App.UI.DOM.appendNewElement("span", el, `can't find relief.`, "mediumorchid");
				slave.devotion--;
			} else {
				el.append(`${His} terribly swollen balls force ${him} to masturbate several times a day, cultivating a need for sex that `);
				App.UI.DOM.appendNewElement("span", el, `${he} can't fulfill.`, "mediumorchid");
				slave.devotion -= 1;
			}
		} else if (slave.drugs === Drug.HYPERTESTICLE) {
			if (slave.hormoneBalance >= 100) {
				el.append(`${He} can't seem to get enough cum out of ${his} grotesquely swollen balls in one orgasm to get relieve the pressure: `);
				if (slave.dick) {
					el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				} else {
					el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				}
				el.append(`${He} masturbates non-stop, but `);
				App.UI.DOM.appendNewElement("span", el, `can't find relief. `, "mediumorchid");
				slave.devotion -= 3;
			} else {
				el.append(`${His} grotesquely swollen balls force ${him} to masturbate constantly, cultivating a need for sex that `);
				App.UI.DOM.appendNewElement("span", el, `${he} can't fulfill.`, "mediumorchid");
				slave.devotion -= 1;
			}
			if (slave.energy > 40) {
				el.append(`The constant orgasms steadily lose their impact, `);
				App.UI.DOM.appendNewElement("span", el, `weakening ${his} sex drive.`, ["libido", "dec"]);
				slave.energy -= 2;
			}
		}
	}
	if (slave.drugs === Drug.SUPERFERTILITY && canGetPregnant(slave)) {
		el.append(`${His} reproductive system is in overdrive,`);
		if (slave.dick > 9) {
			el.append(`leaving ${him} `);
			App.UI.DOM.appendNewElement("span", el, `desperately fucking ${himself}`, "mediumorchid");
			el.append(` in an effort to get pregnant since `);
			App.UI.DOM.appendNewElement("span", el, `you won't ${(V.PC.dick !== 0) ? `give ${him}` : `let ${him} find`} the dick ${he} needs. `, "gold");
			if (canImpreg(slave, slave)) {
				knockMeUp(slave, 5, 2, slave.ID);
			}
			if (slave.mpreg === 1 && slave.anus === 0) {
				App.UI.DOM.appendNewElement("span", el, `${He} is so baby crazed ${he} takes ${his} own anal virginity.`, "lime");
				slave.anus++;
			} else if (slave.vagina === 0) {
				App.UI.DOM.appendNewElement("span", el, `${He} is so baby crazed ${he} takes ${his} own virginity.`, "lime");
				slave.vagina++;
			}
			slave.devotion -= 3;
			slave.trust -= 2;
		} else if (slave.devotion >= -20) {
			el.append(`leaving ${him} `);
			App.UI.DOM.appendNewElement("span", el, `completely unfulfilled`, "mediumorchid");
			el.append(` since `);
			App.UI.DOM.appendNewElement("span", el, `you won't ${(V.PC.dick !== 0) ? `give ${him}` : `let ${him} find`} the dick ${he} needs. `, "gold");

			slave.devotion -= 3;
			slave.trust -= 2;
		} else {
			el.append(`leaving ${him} desperate for a thorough seeding `);
			App.UI.DOM.appendNewElement("span", el, `that you've forbidden ${him} from having.`, "mediumorchid");
			slave.devotion -= 3;
		}
	}
	if (slave.energy > 60) {
		el.append(`${His} chronic masturbation `);
		App.UI.DOM.appendNewElement("span", el, `steadily dulls`, ["libido", "dec"]);
		el.append(` ${his} sexual pleasure. `);
		slave.energy--;
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.rapeFetish = function(slave) {
	const el = new DocumentFragment();
	const {
		His, He,
		he, him, his
	} = getPronouns(slave);
	const who = (slave.rules.release.slaves === 1) ? "other slaves" : `${his} family`;
	/* should be the only two choices if we get here */
	if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		if (slave.fetish === Fetish.SUBMISSIVE) {
			el.append(`plead that ${who} fuck ${him}. `);
			if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 4) {
				if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
					if ((slave.anus * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
						App.UI.DOM.appendNewElement("span", el, `${His} asshole is loosened `, "lime");
						el.append(`during sex with other slaves, since most of the cocks ${he} enticed a dominating buttfuck from are very large. `);
						slave.anus++;
						seX(slave, "anal", "slaves", "penetrative", 3);
					}
				}
				if (App.EndWeek.saVars.averageDick > 5) {
					if (slave.vagina.isBetween(0, 3) && canDoVaginal(slave)) {
						if ((slave.vagina * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`Since most of the slaves ${he} enticed a pounding from are extremely hung, `);
							App.UI.DOM.appendNewElement("span", el, `${his} cunt gets stretched out.`, "lime");
							slave.vagina++;
							seX(slave, "vaginal", "slaves", "penetrative", 3);
						}
					}
				}
			}
			SimpleSexAct.Slave(slave, 7);
		} else if (slave.fetish === Fetish.CUMSLUT) {
			el.append(`suck or be sucked by any `);
			if (slave.rules.release.slaves === 1) {
				el.append(`slave `);
			} else {
				el.append(`relative `);
			}
			el.append(`${he} fancies. `);
			seX(slave, "oral", "slaves", "penetrative", random(5, 15));
		} else if (slave.fetish === Fetish.HUMILIATION) {
			el.append(`demand that ${who} let ${him} fuck them in public. `);
			if (!slave.rivalry) {
				const rival = randomRapeRivalryTarget(slave, (s) => (s.devotion <= 20 && s.trust < -20));
				if (rival) {
					el.append(`Craving a rush, ${he} repeatedly forces a reluctant ${SlaveFullName(rival)} to have sex with ${him} in public. ${rival.slaveName} resents this, and ${slave.slaveName}'s ongoing sexual abuse `);
					App.UI.DOM.appendNewElement("span", el, `starts a rivalry`, "lightsalmon");
					el.append(` between them. `);
					slave.rivalry = 1;
					rival.rivalry = 1;
					slave.rivalryTarget = rival.ID;
					rival.rivalryTarget = slave.ID;
					SimpleSexAct.Slave(rival, 4);
					if (canPenetrate(rival)) {
						seX(slave, "penetrative", "slaves", "penetrative", random(1, 3));
					}
					if (!App.Utils.sexAllowed(slave, rival)) {
						el.append(`As the rules do not permit ${slave.slaveName} and ${rival.slaveName} to have sex, ${he} is `);
						App.UI.DOM.appendNewElement("span", el, `severely punished.`, "yellow");
						slave.trust -= 4;
					}
				}
			}
			SimpleSexAct.Slave(slave, 4);
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "penetrative", random(1, 3));
			}
		} else if (slave.fetish === Fetish.BUTTSLUT && canDoAnal(slave)) {
			el.append(`demand that ${who} penetrate ${his} anus. `);
			if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 4) {
				if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
					if ((slave.anus * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
						el.append(`Since most of the slaves ${he} demands anal sex from are extremely hung, `);
						App.UI.DOM.appendNewElement("span", el, `${his} asshole gets stretched out.`, "lime");
						slave.anus += 1;
					}
				}
			}
			seX(slave, "anal", "slaves", "penetrative", random(5, 12));
		} else if (slave.fetish === Fetish.BOOBS) {
			el.append(`demand that ${who} massage ${his} breasts. `);
			if (slave.lactation > 0) {
				slave.lactationDuration = 2;
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			} else {
				el.append(induceLactation(slave));
			}
			seX(slave, "mammary", "slaves", "penetrative", random(10, 25));
		} else if (slave.fetish === Fetish.SADIST) {
			el.append(`force the most reluctant `);
			if (slave.rules.release.slaves === 1) {
				el.append(`slaves `);
			} else {
				el.append(`members of ${his} family `);
			}
			el.append(`to let ${him} fuck them. `);
			if (!slave.rivalry) {
				const rival = randomRapeRivalryTarget(slave, (s) => { return (s.devotion <= 50 && s.sexualFlaw !== SexualFlaw.NONE); });
				if (rival) {
					el.append(`${He} focuses on ${SlaveFullName(rival)} who has a sexual flaw ${slave.slaveName} can exploit. ${He} sadistically `);
					if (rival.sexualFlaw === SexualFlaw.HATESORAL) {
						el.append(`rapes the poor slave's face`);
						if (!canAchieveErection(slave)) {
							el.append(` with `);
							if (hasAnyArms(slave)) {
								el.append(`${his} fingers`);
							} else {
								el.append(`a strap-on`);
							}
						}
						el.append(`. ${rival.slaveName} hates oral`);
					} else if (rival.sexualFlaw === SexualFlaw.HATESPEN && canDoVaginal(rival)) {
						el.append(`rapes the poor slave's pussy`);
						if (!canAchieveErection(slave)) {
							el.append(` with `);
							if (hasAnyArms(slave)) {
								el.append(`${his} fingers`);
							} else {
								el.append(`a strap-on`);
							}
						}
						el.append(`. ${rival.slaveName} hates penetration`);
					} else if ((rival.sexualFlaw === SexualFlaw.HATESANAL || rival.sexualFlaw === SexualFlaw.HATESPEN) && canDoAnal(rival)) {
						el.append(`rapes the poor slave's ass`);
						if (!canAchieveErection(slave)) {
							el.append(` with `);
							if (hasAnyArms(slave)) {
								el.append(`${his} fingers`);
							} else {
								el.append(`a strap-on`);
							}
						}
						el.append(`. ${rival.slaveName} hates anal`);
					} else if (rival.sexualFlaw === SexualFlaw.SHAMEFAST) {
						el.append(`rapes the poor slave in public. ${rival.slaveName} is terribly shamefast`);
					} else if (rival.sexualFlaw === SexualFlaw.IDEAL) {
						const {him2} = getPronouns(rival).appendSuffix("2");
						el.append(`rapes the poor slave every time ${he} catches ${him2} being romantic. ${rival.slaveName} is still idealistic`);
					} else {
						el.append(`rapes the poor slave every chance ${he} gets,`);
					}
					el.append(` and the sexual abuse `);
					App.UI.DOM.appendNewElement("span", el, `starts a rivalry`, "lightsalmon");
					el.append(` between them. `);
					slave.rivalry = 1;
					rival.rivalry = 1;
					slave.rivalryTarget = rival.ID;
					rival.rivalryTarget = slave.ID;
					SimpleSexAct.Slave(rival, 4);
					if (canPenetrate(rival)) {
						seX(slave, "penetrative", "slaves", "penetrative", random(1, 3));
					}
					if (!App.Utils.sexAllowed(slave, rival)) {
						el.append(`As the rules do not permit ${slave.slaveName} and ${rival.slaveName} to have sex, ${he} is `);
						App.UI.DOM.appendNewElement("span", el, `severely punished.`, "yellow");
						slave.trust -= 4;
					}
				}
			}
			SimpleSexAct.Slave(slave, 4);
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "penetrative", random(1, 3));
			}
		} else if (slave.fetish === Fetish.MASOCHIST) {
			el.append(`demand that ${who} hurt ${him}. `);
			if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 4) {
				if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
					if ((slave.anus * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
						App.UI.DOM.appendNewElement("span", el, `${His} asshole is loosened `, "lime");
						el.append(`during sex with hung slaves, since ${he} often relies on painal to address ${his} needs. `);
						seX(slave, "anal", "slaves", "penetrative", 3);
						slave.anus += 1;
					}
				}
				if (App.EndWeek.saVars.averageDick > 5) {
					if (slave.vagina.isBetween(0, 3) && canDoVaginal(slave)) {
						if ((slave.vagina * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`Since ${he} usually demands that hung slaves fuck ${him} hard enough to make ${his} pussy hurt, `);
							App.UI.DOM.appendNewElement("span", el, `${his} cunt gets stretched out.`, "lime");
							slave.vagina += 1;
							seX(slave, "vaginal", "slaves", "penetrative", 3);
						}
					}
				}
			}
			SimpleSexAct.Slave(slave, 12);
		} else if (slave.fetish === Fetish.DOM) {
			el.append(`force ${who} to submit to ${him}. `);
			if (!slave.rivalry) {
				const rival = randomRapeRivalryTarget(slave, (s) => { return (s.devotion <= 20 && s.trust < -20); });
				if (rival) {
					el.append(`${He} repeatedly rapes a reluctant ${SlaveFullName(rival)} ${he} can't seem to keep ${his} hand`);
					if (hasBothArms(slave) || !hasAnyArms(slave)) {
						el.append(`s`);
					}
					if (!hasAnyArms(slave)) {
						el.append(` (so to speak)`);
					}
					el.append(` off the poor slave, who can't avoid ${him}. Not surprisingly, ${rival.slaveName} resents this, and ${slave.slaveName}'s ongoing sexual abuse `);
					App.UI.DOM.appendNewElement("span", el, `starts a rivalry`, "lightsalmon");
					el.append(` between them. `);
					slave.rivalry = 1;
					rival.rivalry = 1;
					slave.rivalryTarget = rival.ID;
					rival.rivalryTarget = slave.ID;
					SimpleSexAct.Slave(rival, 4);
					if (!App.Utils.sexAllowed(slave, rival)) {
						el.append(`As the rules do not permit ${slave.slaveName} and ${rival.slaveName} to have sex, ${he} is `);
						App.UI.DOM.appendNewElement("span", el, `severely punished.`, "yellow");
						slave.trust -= 4;
					}
				}
			}
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				actX(slave, "penetrative", random(6, 9));
			}
		} else if (slave.fetish === Fetish.PREGNANCY) {
			el.append(`demand that ${who} indulge ${his} pregnancy fetish. `);
			if (App.EndWeek.saVars.averageDick > 5) {
				if (slave.mpreg === 0) {
					if (V.seeStretching === 1 && slave.vagina.isBetween(0, 3) && canDoVaginal(slave)) {
						if ((slave.vagina * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`Since ${he} constantly demands to be fucked deeply to get ${his} womb filled with cum, `);
							App.UI.DOM.appendNewElement("span", el, `${his} cunt gets stretched out.`, "lime");
							slave.vagina += 1;
							seX(slave, "vaginal", "slaves", "penetrative", random(7, 14));
						}
					}
				} else {
					if (V.seeStretching === 1 && slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
						if ((slave.anus * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`Since ${he} constantly demands to be fucked deeply to get ${his} womb filled with cum, `);
							App.UI.DOM.appendNewElement("span", el, `${his} ass gets stretched out.`, "lime");
							slave.anus += 1;
							seX(slave, "anal", "slaves", "penetrative", random(7, 14));
						}
					}
				}
			}
			if (canPenetrate(slave)) {
				actX(slave, "penetrative", random(6, 9));
			}
		} else if (slave.energy > 95) {
			el.append(`demand that ${who} satisfy ${his} formidable appetites. `);
			if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 4) {
				if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
					if ((slave.anus * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
						App.UI.DOM.appendNewElement("span", el, `${His} asshole is loosened `, "lime");
						el.append(` during sex with well endowed slaves, since ${he}'s so addicted to sex all ${his} holes see heavy traffic. `);
						slave.anus += 1;
						seX(slave, "anal", "slaves", "penetrative", 3);
					}
				}
				if (App.EndWeek.saVars.averageDick > 5) {
					if (slave.vagina.isBetween(0, 3) && canDoVaginal(slave)) {
						if ((slave.vagina * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`${He} indulges in non-stop sex with your well endowed slaves, so much so that `);
							App.UI.DOM.appendNewElement("span", el, `${his} cunt gets stretched out.`, "lime");
							slave.vagina += 1;
							seX(slave, "vaginal", "slaves", "penetrative", 3);
						}
					}
				}
			}
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				actX(slave, "penetrative", random(3, 6));
			}
		} else {
			el.append(`demand that ${who} have sex with ${him}. `);
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				seX(slave, "anal", "slaves", "penetrative", random(3, 6));
			}
		}
	} else {
		el.append(`demand that ${who} have sex with ${him}. `);
		SimpleSexAct.Slave(slave, 7);
		if (canPenetrate(slave)) {
			actX(slave, "penetrative", random(3, 6));
		}
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.consentFetish = function(slave) {
	const el = new DocumentFragment();
	const {
		His, He,
		he, him, his, himself
	} = getPronouns(slave);

	if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		if (slave.fetish === Fetish.SUBMISSIVE) {
			el.append(`usually pairing off with a more dominant slave. `);
			if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 4) {
				if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
					if ((slave.anus * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
						App.UI.DOM.appendNewElement("span", el, `${His} asshole is loosened `, "lime");
						el.append(` during sex with other slaves, since most of the cocks ${he} lets dominate ${his} backdoor are very large. `);
						slave.anus += 1;
						seX(slave, "anal", "slaves", "penetrative", 3);
					}
				}
				if (App.EndWeek.saVars.averageDick > 5) {
					if (slave.vagina.isBetween(0, 3) && canDoVaginal(slave)) {
						if ((slave.vagina * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`Since most of the slaves ${he} takes a pounding from are extremely hung, `);
							App.UI.DOM.appendNewElement("span", el, `${his} cunt gets stretched out.`, "lime");
							slave.vagina += 1;
							seX(slave, "vaginal", "slaves", "penetrative", 3);
						}
					}
				}
			}
			SimpleSexAct.Slave(slave, 7);
		} else if (slave.fetish === Fetish.CUMSLUT) {
			el.append(`and is popular for ${his} willingness to give oral. `);
			seX(slave, "oral", "slaves", "penetrative", random(5, 15));
		} else if (slave.fetish === Fetish.HUMILIATION) {
			el.append(`usually asking them to fuck out in the open. `);
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "penetrative", random(1, 3));
			}
		} else if (slave.fetish === Fetish.BUTTSLUT) {
			el.append(`looking after anyone who will `);
			if (slave.anus > 0) {
				if (canDoAnal(slave)) {
					el.append(`penetrate `);
					seX(slave, "anal", "slaves", "penetrative", random(5, 12));
				} else {
					el.append(`tease `);
				}
				el.append(`${his} ass `);
			} else {
				el.append(`tease ${his} virgin anus `);
			}
			el.append(`in return. `);
			if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 4) {
				if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
					if ((slave.anus * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
						el.append(`Since most of the slaves ${he} enjoys anal sex with are extremely hung, `);
						App.UI.DOM.appendNewElement("span", el, `${his} asshole gets stretched out.`, "lime");
						slave.anus += 1;
					}
				}
			}
		} else if (slave.fetish === Fetish.BOOBS) {
			el.append(`seeing to anyone who will show ${his} breasts some love. `);
			if (slave.lactation > 0) {
				slave.lactationDuration = 2;
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			} else {
				el.append(induceLactation(slave));
			}
			seX(slave, "mammary", "slaves", "penetrative", random(10, 25));
		} else if (slave.fetish === Fetish.SADIST) {
			el.append(`usually pairing off with a masochistic slave willing to accept ${his} abuse. `);
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "penetrative", random(1, 3));
			}
		} else if (slave.fetish === Fetish.MASOCHIST) {
			el.append(`usually pairing off with an abusive slave. `);
			if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 4) {
				if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
					if ((slave.anus * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
						App.UI.DOM.appendNewElement("span", el, `${His} asshole is loosened, `, "lime");
						el.append(`since ${he} begs hung slaves to fuck ${his} butt until ${he} cries. `);
						slave.anus += 1;
						seX(slave, "anal", "slaves", "penetrative", 3);
					}
				}
				if (App.EndWeek.saVars.averageDick > 5) {
					if (slave.vagina.isBetween(0, 3) && canDoVaginal(slave)) {
						if ((slave.vagina * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`Since ${he} eagerly begs hung slaves to fuck ${him} until ${he} cries, `);
							App.UI.DOM.appendNewElement("span", el, `${his} cunt gets stretched out.`, "lime");
							slave.vagina += 1;
							seX(slave, "vaginal", "slaves", "penetrative", 3);
						}
					}
				}
			}
			SimpleSexAct.Slave(slave, 6);
		} else if (slave.fetish === Fetish.DOM) {
			el.append(`usually pairing off with a submissive bitch. `);
			SimpleSexAct.Slave(slave, 6);
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "penetrative", random(1, 3));
			}
		} else if (slave.fetish === Fetish.PREGNANCY) {
			el.append(`doing ${his} best to pair off with any pregnant slaves. `);
			if (slave.mpreg === 0) {
				if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 5) {
					if (slave.vagina.isBetween(0, 3) && canDoVaginal(slave)) {
						if ((slave.vagina * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`${He} also takes cock whenever ${he} can, begging to be fucked deeply to get ${his} womb filled with cum, so `);
							App.UI.DOM.appendNewElement("span", el, `${his} cunt gets stretched out.`, "lime");
							slave.vagina += 1;
							seX(slave, "vaginal", "slaves", "penetrative", 3);
						}
					}
				}
			} else {
				if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 5) {
					if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
						if ((slave.anus * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`${He} also takes cock whenever ${he} can, begging to be fucked deeply to get ${his} womb filled with cum, so `);
							App.UI.DOM.appendNewElement("span", el, `${his} ass gets stretched out.`, "lime");
							slave.anus += 1;
							seX(slave, "anal", "slaves", "penetrative", 3);
						}
					}
				}
			}
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "penetrative", random(6, 9));
			}
		} else if (slave.energy > 95) {
			el.append(`and has to give out a lot of favors to get enough attention for ${himself}. `);
			if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 4) {
				if (slave.anus.isBetween(0, 3) && canDoAnal(slave)) {
					if ((slave.anus * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
						App.UI.DOM.appendNewElement("span", el, `${His} asshole is loosened `, "lime");
						el.append(`during sex with well endowed slaves, since ${he}'s so addicted to sex all ${his} holes see heavy traffic. `);
						slave.anus += 1;
						seX(slave, "anal", "slaves", "penetrative", 3);
					}
				}
				if (App.EndWeek.saVars.averageDick > 5) {
					if (slave.vagina.isBetween(0, 3) && canDoVaginal(slave)) {
						if ((slave.vagina * 30) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							el.append(`${He} indulges in non-stop sex with your well endowed slaves, so much so that `);
							App.UI.DOM.appendNewElement("span", el, `${his} cunt gets stretched out.`, "lime");
							slave.vagina += 1;
							seX(slave, "vaginal", "slaves", "penetrative", 3);
						}
					}
				}
			}
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "penetrative", random(3, 6));
			}
		} else {
			el.append(`doing ${his} best to get off and move on. `);
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "penetrative", random(3, 6));
			}
		}
	} else {
		el.append(`doing ${his} best to get off and move on. `);
		SimpleSexAct.Slave(slave, 7);
		if (canPenetrate(slave)) {
			seX(slave, "penetrative", "slaves", "penetrative", random(3, 6));
		}
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.consentDiscoversFetish = function(slave) {
	const el = new DocumentFragment();
	const {he, him, his} = getPronouns(slave);

	if (slave.fetishKnown === 0) {
		if (random(1, 2) === 1) {
			slave.fetishKnown = 1;
			el.append(`However, one of ${his} partners `);
			if (slave.fetish === Fetish.SUBMISSIVE) {
				el.append(`holds ${him} down, and ${he} loves it; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a submissive!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.CUMSLUT) {
				el.append(`finally has to push ${him} away to get ${him} to stop sucking; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a cumslut!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.HUMILIATION) {
				el.append(`fucks ${him} in public, and ${he} loves it; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a humiliation fetishist!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.BUTTSLUT) {
				if (slave.anus > 0) {
					if (canDoAnal(slave)) {
						el.append(`fucks ${his} butt, `);
					} else {
						el.append(`teases ${his} anus, `);
					}
					el.append(`and ${he} loves it; `);
				} else {
					el.append(`teases ${his} virgin anus, and ${he} loves it; `);
				}
				App.UI.DOM.appendNewElement("span", el, `${he}'s an anal slut!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.BOOBS) {
				el.append(`fondles ${his} breasts, and ${he} loves it; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a boob fetishist!`, ["lightcoral"]);
				if (slave.lactation > 0) {
					slave.lactationDuration = 2;
					slave.boobs -= slave.boobsMilk;
					slave.boobsMilk = 0;
				} else {
					el.append(induceLactation(slave));
				}
			} else if (slave.fetish === Fetish.SADIST) {
				el.append(`asks ${slave.slaveName} to hit ${him}, which ${slave.slaveName} enjoys doing; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a sadist!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.MASOCHIST) {
				el.append(`hits ${slave.slaveName} while fucking ${him}, which only makes ${him} hornier; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a masochist!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.DOM) {
				el.append(`asks ${slave.slaveName} to make them ${slave.slaveName}'s bitch, which ${slave.slaveName} manages like a natural; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s dominant!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.PREGNANCY) {
				el.append(`pretends to get ${him} pregnant, which ${he} really enjoys; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a pregnancy fetishist!`, ["lightcoral"]);
			} else if (slave.energy > 95) {
				el.append(`discovers that ${he} cannot be satisfied; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a nympho!`, ["lightcoral"]);
			} else {
				el.append(`discovers that ${he} isn't terribly exciting; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s got a normal sexuality.`, ["lightcoral"]);
			}
		}
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.rapeDiscoversFetish = function(slave) {
	const el = new DocumentFragment();
	const {he, him, his} = getPronouns(slave);

	if (slave.fetishKnown === 0) {
		if (random(1, 2) === 1) {
			slave.fetishKnown = 1;
			el.append(`You discover that ${he} really likes it when the other slaves `);
			if (slave.fetish === Fetish.SUBMISSIVE) {
				el.append(`hold ${him} down and fuck ${him}; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a submissive!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.CUMSLUT) {
				el.append(`cum in ${his} mouth; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a cumslut!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.HUMILIATION) {
				el.append(`use ${him} in public; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a humiliation fetishist!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.BUTTSLUT) {
				if (slave.anus > 0) {
					if (canDoAnal(slave)) {
						el.append(`fuck ${his} butt `);
					} else {
						el.append(`tease ${his} anus `);
					}
				} else {
					el.append(`tease ${his} virgin anus;`);
				}
				App.UI.DOM.appendNewElement("span", el, `${he}'s an anal slut!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.BOOBS) {
				el.append(`fondle ${his} breasts; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a boob fetishist!`, ["lightcoral"]);
				if (slave.lactation > 0) {
					slave.lactationDuration = 2;
					slave.boobs -= slave.boobsMilk;
					slave.boobsMilk = 0;
				} else {
					el.append(induceLactation(slave));
				}
			} else if (slave.fetish === Fetish.SADIST) {
				el.append(`let ${him} abuse them; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a sadist!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.MASOCHIST) {
				el.append(`hurt ${him}; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s a masochist!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.DOM) {
				el.append(`let ${him} dominate them; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s dominant!`, ["lightcoral"]);
			} else if (slave.fetish === Fetish.PREGNANCY) {
				if (slave.mpreg === 0) {
					el.append(`come `);
					if (canDoVaginal(slave)) {
						el.append(`inside `);
					} else {
						el.append(`on `);
					}
					el.append(`${him}; `);
					App.UI.DOM.appendNewElement("span", el, `${he}'s a pregnancy fetishist!`, ["lightcoral"]);
				} else {
					el.append(`come `);
					if (canDoAnal(slave)) {
						el.append(`inside `);
					} else {
						el.append(`on `);
					}
					el.append(`${him}; `);
					App.UI.DOM.appendNewElement("span", el, `${he}'s a pregnancy fetishist!`, ["lightcoral"]);
				}
			} else {
				el.append(`fuck ${him}; `);
				App.UI.DOM.appendNewElement("span", el, `${he}'s got a normal sexuality.`, ["lightcoral"]);
			}
		}
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.permissiveDrugEffects = function(slave) {
	const el = new DocumentFragment();
	const {
		He, His,
		he, him, his
	} = getPronouns(slave);

	const who = (slave.rules.release.slaves === 1) ? `other slaves` : `${his} family`;
	/* should be the only two choices if we get here */
	if (slave.balls > 0) {
		if (slave.drugs === Drug.GROWTESTICLE || slave.drugs === Drug.INTENSIVETESTICLE) {
			if ((slave.devotion > 20) || (slave.trust < -20)) {
				if (slave.hormoneBalance >= 100) {
					el.append(`${He} can't seem to get enough cum out of ${his} terribly swollen balls in one orgasm to relieve the pressure: `);
					if (slave.dick) {
						el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
					} else {
						el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
					}
					el.append(`${He} is very reliant on ${who} to help ${him}, which `);
					App.UI.DOM.appendNewElement("span", el, `habituates ${him}`, "mediumaquamarine");
					el.append(` to slave sex. `);
				} else {
					el.append(`${His} terribly swollen balls force ${him} to rely on ${who} for release several times a day, and jetting cum into and onto them `);
					App.UI.DOM.appendNewElement("span", el, `habituates ${him}`, "mediumaquamarine");
					el.append(` to slave sex. `);
				}
				slave.trust += 1;
			} else {
				el.append(`${He} can't seem to get enough cum out of ${his} terribly swollen balls to relieve the pressure and is either unwilling or unable to get help with it, something ${he} `);
				App.UI.DOM.appendNewElement("span", el, `blames you for.`, "mediumorchid");
				slave.devotion -= 1;
			}
		} else if (slave.drugs === Drug.HYPERTESTICLE) {
			if ((slave.devotion > 20) || (slave.trust < -20) || !canPenetrate(slave)) {
				if (slave.hormoneBalance >= 100) {
					el.append(`${He} can't seem to get enough cum out of ${his} grotesquely swollen balls in one orgasm to get relieve the pressure: `);
					if (slave.dick) {
						el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
					} else {
						el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
					}
					el.append(`${He} is completely dependent on your ${who} to help ${him}, which `);
					App.UI.DOM.appendNewElement("span", el, `habituates ${him}`, "mediumaquamarine");
					el.append(` to slave sex. `);
				} else {
					el.append(`${His} grotesquely swollen balls force ${him} to rely on ${who} for release many times a day, and swelling them with cum `);
					App.UI.DOM.appendNewElement("span", el, `habituates ${him}`, "mediumaquamarine");
					el.append(` to slave sex, though you have to take precautions so ${he} doesn't knock up your entire stock. `);
				}
				slave.trust += 1;
			} else {
				el.append(`${He} can't seem to get enough cum out of ${his} grotesquely swollen balls to relieve the pressure and is either unwilling or unable to get help with it, something ${he} `);
				App.UI.DOM.appendNewElement("span", el, `blames you for.`, "mediumorchid");
				slave.devotion -= 1;
			}
		}
	}
	if (slave.drugs === Drug.SUPERFERTILITY && canGetPregnant(slave)) {
		el.append(`${His} reproductive system is in overdrive leading ${him} to seek out any dicked `);
		if (slave.rules.release.slaves === 1) {
			el.append(`slaves `);
		} else {
			el.append(`relatives `);
		}
		el.append(` ${he} can find several times a day. ${He} `);
		App.UI.DOM.appendNewElement("span", el, `desperately longs`, "mediumaquamarine");
		el.append(` for the day ${his} efforts fill ${his} womb with child. `);
		slave.trust += 1;
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.noRelease = function(slave) {
	const el = new DocumentFragment();
	const {he, him, his} = getPronouns(slave);

	el.append("is forbidden to masturbate or seek sexual release");
	if (slave.rules.reward === "orgasm") {
		el.append(" outside of rewards");
	}
	if (disobedience(slave) > random(0, 100)) {
		el.append(`. In ${his} `);
		App.UI.DOM.appendNewElement("span", el, `intense frustration`, "mediumorchid");
		el.append(` ${he} disobeys and is `);
		App.UI.DOM.appendNewElement("span", el, `severely punished`, "gold");
		el.append(` for illicit masturbation. `);
		slave.devotion -= 2;
		slave.trust -= 2;
	} else {
		el.append(`, which `);
		App.UI.DOM.appendNewElement("span", el, `highly frustrates`, "mediumorchid");
		el.append(` ${him}. `);
		slave.devotion -= 2;
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.noReleaseDrugEffects = function(slave) {
	const el = new DocumentFragment();
	const {
		He, His,
		he, him, his
	} = getPronouns(slave);

	if (slave.rules.reward === "orgasm" && slave.devotion > 20) {
		// The orgasms from rewards are enough to keep them healthy and not too annoyed.
		if (slave.energy > 50) {
			el.append(`${His} enforced chastity `);
			App.UI.DOM.appendNewElement("span", el, `dampens ${his} libido.`, ["libido", "dec"]);
			slave.energy -= 1;
			if (slave.energy > 70) {
				el.append(` ${He} becomes more `);
				App.UI.DOM.appendNewElement("span", el, `willing`, ["devotion", "inc"]);
				el.append(" in an effort to get more rewards and thus sexual relief.");
				slave.devotion += 1;
			}
		}
		return el;
	}

	if (slave.balls > 0) {
		if (slave.drugs === Drug.GROWTESTICLE || slave.drugs === Drug.INTENSIVETESTICLE) {
			if (slave.hormoneBalance >= 100) {
				el.append(`${He} can't seem to get enough cum out of ${his} terribly swollen balls in one orgasm to get relieve the pressure: `);
				if (slave.dick) {
					el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				} else {
					el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				}
				el.append(`Forbidden to masturbate or seek relief through sex, he `);
				App.UI.DOM.appendNewElement("span", el, `can't find relief`, "mediumorchid");
				el.append(` and `);
				App.UI.DOM.appendNewElement("span", el, `the situation harms ${his} health.`, ["health", "dec"]);
				slave.devotion -= 2;
			} else {
				el.append(`${His} terribly swollen balls ache, cultivating a need for sex that `);
				App.UI.DOM.appendNewElement("span", el, `${he} can't fulfill`, "mediumorchid");
				el.append(` and `);
				App.UI.DOM.appendNewElement("span", el, `harming ${his} health.`, ["health", "dec"]);
				slave.devotion -= 2;
			}
			healthDamage(slave, 3);
		} else if (slave.drugs === Drug.HYPERTESTICLE) {
			if (slave.hormoneBalance >= 100) {
				el.append(`${He} can't seem to get enough cum out of ${his} grotesquely swollen balls in one orgasm to get relieve the pressure: `);
				if (slave.dick) {
					el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				} else {
					el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				}
				el.append(`Forbidden to masturbate or seek relief through sex, he `);
				App.UI.DOM.appendNewElement("span", el, `can't find relief`, "mediumorchid");
				el.append(` and `);
				App.UI.DOM.appendNewElement("span", el, `the situation harms ${his} health.`, ["health", "dec"]);
				slave.devotion -= 4;
			} else {
				el.append(`${His} grotesquely swollen balls ache, cultivating a need for sex that `);
				App.UI.DOM.appendNewElement("span", el, `${he} can't fulfill`, "mediumorchid");
				el.append(` and `);
				App.UI.DOM.appendNewElement("span", el, `harming ${his} health.`, ["health", "dec"]);
				slave.devotion -= 4;
			}
			healthDamage(slave, 6);
		}
	}
	if (slave.drugs === Drug.SUPERFERTILITY && canGetPregnant(slave)) {
		el.append(`${His} reproductive system is in overdrive,`);
		if (slave.devotion >= -20) {
			el.append(`leaving ${him} `);
			App.UI.DOM.appendNewElement("span", el, `completely unfulfilled`, "mediumorchid");
			el.append(` since `);
			App.UI.DOM.appendNewElement("span", el, `you won't ${(V.PC.dick !== 0) ? `give ${him}` : `let ${him} find`} the dick ${he} needs. `, "gold");
			slave.devotion -= 3;
			slave.trust -= 2;
		} else {
			el.append(`leaving ${him} desperate for a thorough seeding `);
			App.UI.DOM.appendNewElement("span", el, `that you've forbidden ${him} from having.`, "mediumorchid");
			slave.devotion -= 3;
		}
	}
	if (slave.energy > 50) {
		el.append(`${His} enforced chastity `);
		App.UI.DOM.appendNewElement("span", el, `habituates ${him} to a lack of release.`, ["libido", "dec"]);
		slave.energy -= 2;
	}
	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.EndWeek.Rules.partnerDrugEffects = function(slave) {
	const el = new DocumentFragment();
	const {He, His,
		he, him, his} = getPronouns(slave);

	const sr = getSlave(slave.relationshipTarget);
	let his2;
	let him2;
	if (sr) {
		({
			his2, him2
		} = getPronouns(sr).appendSuffix("2"));
	}
	if (slave.balls > 0) {
		if (slave.drugs === Drug.GROWTESTICLE || slave.drugs === Drug.INTENSIVETESTICLE) {
			if (slave.hormoneBalance >= 100) {
				el.append(`${He} can't seem to get enough cum out of ${his} terribly swollen balls in one orgasm to relieve the pressure: `);
				if (slave.dick) {
					el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				} else {
					el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				}
				el.append(`This forces ${him} to find ${his} ${relationshipTerm(slave)} for release many times a day, and ${he} `);
				App.UI.DOM.appendNewElement("span", el, `is desperately reliant `, "mediumaquamarine");
				el.append(`on ${him2} for relief. `);
				slave.trust += 2;
			} else {
				el.append(`${His} terribly swollen balls force ${him} to find ${his} ${relationshipTerm(slave)} for release several times a day, and ${he} `);
				App.UI.DOM.appendNewElement("span", el, `relies`, "mediumaquamarine");
				el.append(` on ${him2} for relief. `);
				slave.trust += 1;
			}
		} else if (slave.drugs === Drug.HYPERTESTICLE) {
			if (slave.hormoneBalance >= 100) {
				el.append(`${He} can't seem to get enough cum out of ${his} grotesquely swollen balls in one orgasm to get relieve the pressure: `);
				if (slave.dick) {
					el.append(`${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				} else {
					el.append(`${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `);
				}
				el.append(`This forces ${him} to find ${his} ${relationshipTerm(slave)} for release many times a day, and ${he} `);
				App.UI.DOM.appendNewElement("span", el, `is desperately reliant `, "mediumaquamarine");
				el.append(`on ${him2} for relief. `);
				slave.trust += 2;
			} else {
				el.append(`${His} grotesquely swollen balls force ${him} to come to find ${his} ${relationshipTerm(slave)} for release dozens of times a day, and ${he} `);
				App.UI.DOM.appendNewElement("span", el, `is desperately reliant `, "mediumaquamarine");
				el.append(`on ${him2} for relief. `);
				slave.trust += 1;
			}
		}
	}
	if (slave.drugs === Drug.SUPERFERTILITY && canImpreg(slave, sr)) {
		if ((slave.devotion > 20) || (slave.trust < -20)) {
			el.append(`${His} reproductive system is in overdrive leading ${him} to come to find ${his} ${relationshipTerm(slave)} for insemination several times a day; ${he} `);
			App.UI.DOM.appendNewElement("span", el, `desperately hopes`, "mediumaquamarine");
			el.append(` for the day ${his2} seed takes root in ${his} womb. `);
			slave.trust += 1;
		}
	}
	return el;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.EndWeek.Rules.speechRules = function(slave) {
	let r = '';
	const {him, his} = getPronouns(slave);
	const yourWill = slave.assignment !== Job.HEADGIRLSUITE ? `your will` : `your Head Girl's will`;
	if (slave.devotion <= 20) {
		if (slave.voice === 0) {
			r = `Living as a mute <span class="devotion inc">molds ${him}</span> to ${yourWill}.`;
			slave.devotion += 1;
		} else if (slave.lips > 95) {
			r = `Being unable to speak through ${his} facepussy <span class="devotion inc">molds ${him}</span> to ${yourWill}.`;
			slave.devotion += 1;
		} else if (slave.rules.speech === "restrictive") {
			r = `Living under enforced silence <span class="devotion inc">molds ${him}</span> to ${yourWill}.`;
			slave.devotion += 1;
		}
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.EndWeek.Rules.consentRules = function(slave) {
	/**
	 * @param {FC.Assignment} assignment
	 * @returns {{comingDay: string, providedDom: string, providedSadist: string, emptyPlace: string, peers: App.Entity.SlaveState[], manager: App.Entity.SlaveState}}
	 */
	function getJobText(assignment) {
		const job = App.Utils.jobForAssignment(assignment);
		const facility = job ? job.facility : null;

		// defaults
		const obj = {
			comingDay: `you bring home more slaves`,
			providedDom: `a whole penthouse of whores for ${him} to dominate`,
			providedSadist: `a whole penthouse of sluts for ${him} to rape`,
			emptyPlace: facility ? facility.name : `${his} workplace`,
			peers: facility ? facility.employees() : [],
			manager: (facility && facility.manager) ? facility.manager.currentEmployee : null,
		};

		switch (assignment) {
			case Job.BROTHEL:
			case Job.MADAM:
				return Object.assign(obj, {
					comingDay: `you assign more whores to ${V.brothelName}`,
					providedDom: `a whole brothel of whores for ${him} to dominate`,
					providedSadist: `a whole brothel of whores for ${him} to rape`
				});
			case Job.TEACHER:
				return Object.assign(obj, {
					comingDay: `more of your slaves enroll in ${V.schoolroomName}`,
					providedDom: `a whole class of students to demonstrate proper submission with`,
					providedSadist: `a whole class of students for ${him} to rape lessons into`
				});
			case Job.SCHOOL:
				return Object.assign(obj, {
					comingDay: `more of your slaves enroll in ${V.schoolroomName}`,
					providedDom: `a whole class of students for ${him} to dominate`,
					providedSadist: `a whole class of students for ${him} to rape`
				});
			case Job.CLUB:
			case Job.DJ:
				return Object.assign(obj, {
					comingDay: `you assign more sluts to ${V.clubName}`,
					providedDom: `a whole club of sluts for ${him} to dominate`,
					providedSadist: `a whole club of sluts for ${him} to rape`
				});
			case Job.NURSE:
				return Object.assign(obj, {
					comingDay: `the day traffic in ${V.clinicName} picks up`
					// providedDom and providedSadist are unused; nurse gets visitors, not employees
				});
			case Job.ATTENDANT:
				return Object.assign(obj, {
					comingDay: `more vulnerable slaves enter ${V.spaName}`,
					providedDom: `all the warm, moist bodies lounging around ${V.spaName}`,
					providedSadist: `all the warm, moist bodies lounging around ${V.spaName}`
				});
			case Job.SPA:
				return Object.assign(obj, {
					comingDay: S.Attendant ? `more of your slaves join ${him} in the pool` : `you assign more slaves to ${V.spaName}`,
					providedDom: `a whole pool of slaves for ${him} to dominate`,
					providedSadist: `a whole pool of slaves for ${him} to rape`
				});
			case Job.MATRON:
				return Object.assign(obj, {
					comingDay: `more nannies are assigned to help in ${V.nurseryName}`,
					providedDom: `all the nannies busily scurrying around ${V.nurseryName}`,
					providedSadist: `all the nannies busily scurrying around ${V.nurseryName}`,
				});
			case Job.NURSERY:
				return Object.assign(obj, {
					comingDay: `more nannies are assigned to help in ${V.nurseryName}`,
					providedDom: `a whole nursery of nannies for ${him} to dominate`,
					providedSadist: `a whole nursery of nannies for ${him} to rape`,
				});
			case Job.STEWARD:
				return Object.assign(obj, {
					comingDay: `you assign more maids to ${V.servantsQuartersName}`,
					providedDom: `so many maids for ${him} to dominate`,
					providedSadist: `so many maids for ${him} to rape`,
				});
			case Job.QUARTER:
			case Job.HOUSE:
				return Object.assign(obj, {
					peers: V.slaves, // ALL THE SLAVES!
					emptyPlace: "your penthouse" // always, even for servants' quarter slaves
				});
			case Job.MILKMAID:
			case Job.DAIRY:
				return Object.assign(obj, {
					comingDay: `you assign more cows to ${V.dairyName}`,
					providedDom: `so many cows for ${him} to dominate`,
					providedSadist: `so many cows for ${him} to rape`,
				});
			case Job.FARMER:
			case Job.FARMYARD:
				return Object.assign(obj, {
					comingDay: `you assign more farmhands to ${V.farmyardName}`,
					providedDom: `so many farmhands for ${him} to dominate`,
					providedSadist: `so many farmhands for ${him} to rape`,
				});
			default:
				return obj;
		}
	}

	let r = [];
	const {He, he, him, his, himself} = getPronouns(slave);
	const jt = getJobText(slave.assignment);

	if (V.universalRulesConsent === 0) {
		if (slave.devotion <= 20) {
			const jobMolestation = (slave.assignment === Job.QUARTER || slave.assignment === Job.HOUSE) ? ` and given ${his} job` : ``;
			if (slave.trust > -10) {
				if (jt.peers.length > 2 || jt.manager) {
					r.push(`Under the rules${jobMolestation}, ${he} finds ${himself} constantly molested by other slaves, and lives ${his} life constantly <span class="trust dec">afraid.</span>`);
				} else {
					r.push(`Under the rules${jobMolestation}, ${he} is free game for other slaves to molest, and lives ${his} life constantly <span class="trust dec">afraid</span> of the day ${jt.comingDay}.`);
				}
				slave.trust -= 2;
			} else {
				if (jt.peers.length > 2 || jt.manager) {
					r.push(`Under the rules${jobMolestation}, ${he} finds ${himself} constantly molested by other slaves, but ${he}'s already in such constant terror it doesn't seriously affect ${him}.`);
				} else {
					r.push(`Under the rules${jobMolestation}, ${he} will someday find ${himself} constantly molested by other slaves, but ${he}'s already in such constant terror that it doesn't cross ${his} mind.`);
				}
			}
		} else if (slave.rules.release.slaves === 1 || slave.rules.release.family === 1) {
			const whom = (slave.rules.release.slaves === 1) ? "other slaves" : `${his} relatives`;
			const peerCount = (slave.rules.release.slaves === 1) ? jt.peers.length : jt.peers.filter(s => areRelated(s, slave)).length;
			if (peerCount > 2 && (slave.assignment === Job.HOUSE || slave.assignment === Job.QUARTER)) {
				// no special requirements for servants...they ALL get the devotion bonus, even if they are frigid and fetishless
				r.push(`Under the rules, ${he}'s allowed to demand that ${whom} get ${him} off, but only when ${he}'s finished ${his} shift. ${He} still <span class="devotion inc">adores</span> having the option.`);
				slave.devotion += 1;
			} else if (slave.energy > 95) {
				r.push(`Under the rules, ${he}'s allowed to demand that ${whom} get ${him} off, and ${he}`);
				if (peerCount > 2) {
					if (slave.assignment === Job.NURSE) { // nurse gets visitors, not employees
						r.push(`<span class="devotion inc">happily avails</span> ${himself} to any slaves visiting the patients under ${his} care.`);
					} else {
						r.push(`<span class="devotion inc">adores</span> you for giving ${him} plentiful outlets for ${his} nymphomania.`);
					}
				} else {
					r.push(`<span class="devotion inc">eagerly awaits</span> the day ${jt.comingDay}.`);
				}
				slave.devotion += 1;
			} else if ((slave.fetishKnown === 1) && (slave.fetishStrength > 60)) {
				if (slave.fetish === Fetish.SADIST) {
					r.push(`Under the rules, ${he}'s allowed to sexually abuse ${whom}, and ${he}`);
					if (peerCount > 2) {
						if (slave.assignment === Job.NURSE) { // nurse gets visitors, not employees
							r.push(`<span class="devotion inc">happily rapes</span> any slaves visiting the patients under ${his} care.`);
						} else {
							r.push(`<span class="devotion inc">adores</span> you for providing ${jt.providedSadist}.`);
						}
					} else {
						r.push(`<span class="devotion inc">eagerly awaits</span> the day ${jt.comingDay}.`);
					}
					slave.devotion += 1;
				} else if (slave.fetish === Fetish.DOM) {
					r.push(`Under the rules, ${he}'s allowed to force ${whom} to have sex with ${him}, and ${he}`);
					if (peerCount > 2) {
						if (slave.assignment === Job.NURSE) { // nurse gets visitors, not employees
							r.push(`<span class="devotion inc">happily dominates</span> any slaves visiting the patients under ${his} care.`);
						} else {
							r.push(`<span class="devotion inc">adores</span> you for providing ${jt.providedDom}.`);
						}
					} else {
						r.push(`<span class="devotion inc">eagerly awaits</span> the day ${jt.comingDay}.`);
					}
					slave.devotion += 1;
				}
			}
		}
	} else if ((slave.devotion <= 20) && (slave.devotion >= -20)) {
		// all slave managers have a devotion requirement which will skip this branch entirely
		r.push(`Since ${he}'s low in the slave hierarchy, <span class="trust inc">${he} knows</span> that the rule that slaves must get consent before having sex with ${him} is all that protects ${him} from abuse.`);
		if (jt.peers.length < 2) {
			if (slave.assignment === Job.SPA) {
				if (jt.manager) {
					r.push(`Well, that and the fact ${jt.emptyPlace} is mostly frequented by other slaveowners' stock.`);
				} else {
					r.push(`Well, that and the fact ${jt.emptyPlace} is ${his} little private sanctuary`);
				}
			} else if (!jt.manager) {
				r.push(`Well, that and the fact ${jt.emptyPlace} is rather empty.`);
			}
		}
		slave.trust += 1;
	}

	return r.join(' ');
};
