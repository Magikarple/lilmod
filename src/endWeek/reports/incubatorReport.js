/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.incubatorReport = function() {
	const frag = document.createDocumentFragment();

	if (V.incubator.capacity === 0) {
		return {
			before: frag,
			slaves: [],
			after: new DocumentFragment(),
		};
	}
	V.incubator.readySlaves = 0;

	for (const tank of V.incubator.tanks) {
		const entry = App.UI.DOM.appendNewElement('p', frag);
		let r = [];
		const {He, he, His, his, him} = getPronouns(tank);
		tank.birthWeek += 1;
		if (tank.birthWeek >= 52) {
			tank.birthWeek = 0;
			if (V.seeAge === 1) {
				tank.actualAge++;
				tank.ovaryAge++;
			}
		}
		if (tank.incubatorSettings.growTime > 0) {
			tank.incubatorSettings.growTime -= V.incubator.upgrade.speed;
			r.push(`<span class="pink">${tank.slaveName}'s</span> growth is currently being accelerated. ${He}`);
			if (Math.round(tank.incubatorSettings.growTime/V.incubator.upgrade.speed) <= 0) {
				r.push(`is <span class="lime">ready for release.</span> ${He} will be ejected from ${his} tank upon your approach.`);
				V.incubator.readySlaves = 1;
			} else {
				r.push(`will be ready for release in about ${Math.round(tank.incubatorSettings.growTime/V.incubator.upgrade.speed)} weeks.`);
			}
		} else {
			r.push(`<span class="pink">${tank.slaveName}</span> is <span class="lime">ready for release.</span> ${He} will be ejected from ${his} tank upon your approach.`);
			V.incubator.readySlaves = 1;
		}
		App.Events.addNode(entry, r, "div");

		r = [];
		if (V.incubator.upgrade.weight === 1) {
			if (tank.incubatorSettings.weight === 1) {
				if (tank.weight < 200) {
					if (V.incubator.upgrade.speed === 52) {
						tank.weight += 70;
					} else if (V.incubator.upgrade.speed === 18) {
						tank.weight += 40;
					} else if (V.incubator.upgrade.speed === 9) {
						tank.weight += 20;
					} else if (V.incubator.upgrade.speed === 6) {
						tank.weight += 10;
					} else if (V.incubator.upgrade.speed === 5) {
						tank.weight += 5;
					}
				}
				r.push(`The weight monitoring systems are overloading ${his} intake causing <span class="red">rapid weight gain.</span>`);
			} else if (tank.incubatorSettings.weight === 2) {
				if (tank.weight > 10) {
					if (V.incubator.upgrade.speed === 52) {
						tank.weight -= 30;
					} else if (V.incubator.upgrade.speed === 18) {
						tank.weight -= 10;
					} else if (V.incubator.upgrade.speed === 9) {
						tank.weight -= 5;
					} else if (V.incubator.upgrade.speed === 6) {
						tank.weight -= 2;
					} else if (V.incubator.upgrade.speed === 5) {
						tank.weight -= 1;
					}
					r.push(`The weight monitoring systems detect ${he} is overweight and <span class="green">decrease ${his} caloric intake.</span>`);
				} else if (tank.weight < -10) {
					if (V.incubator.upgrade.speed === 52) {
						tank.weight += 30;
					} else if (V.incubator.upgrade.speed === 18) {
						tank.weight += 10;
					} else if (V.incubator.upgrade.speed === 9) {
						tank.weight += 5;
					} else if (V.incubator.upgrade.speed === 6) {
						tank.weight += 2;
					} else if (V.incubator.upgrade.speed === 5) {
						tank.weight += 1;
					}
					r.push(`The weight monitoring systems detect ${he} is underweight and <span class="green">increase ${his} caloric intake.</span>`);
				} else {
					r.push(`${He} is <span class="lime">currently at a healthy weight;</span> efforts will be made to maintain it.`);
				}
			} else if (tank.incubatorSettings.weight === 0) {
				if (tank.weight > -100) {
					r.push(`${His} developing body <span class="red">quickly sheds its gained weight.</span>`);
					tank.weight -= 40;
				}
			}
		} else {
			if (tank.weight > -100) {
				r.push(`${His} developing body <span class="red">quickly sheds its gained weight.</span>`);
				tank.weight -= 40;
			}
		}
		App.Events.addNode(entry, r, "div");

		r = [];
		if (V.incubator.upgrade.muscles === 1) {
			if (tank.incubatorSettings.muscles === 2) {
				if (tank.muscles < 100) {
					if (V.incubator.upgrade.speed === 52) {
						tank.muscles += 70;
					} else if (V.incubator.upgrade.speed === 18) {
						tank.muscles += 40;
					} else if (V.incubator.upgrade.speed === 9) {
						tank.muscles += 20;
					} else if (V.incubator.upgrade.speed === 6) {
						tank.muscles += 10;
					} else if (V.incubator.upgrade.speed === 5) {
						tank.muscles += 5;
					}
				}
				r.push(`The strength monitoring systems are overloading ${him} with steroids causing <span class="green">rapid muscle development.</span>`);
			} else if (tank.incubatorSettings.muscles === 1) {
				if (tank.muscles > 10) {
					if (V.incubator.upgrade.speed === 52) {
						tank.muscles -= 30;
					} else if (V.incubator.upgrade.speed === 18) {
						tank.muscles -= 10;
					} else if (V.incubator.upgrade.speed === 9) {
						tank.muscles -= 5;
					} else if (V.incubator.upgrade.speed === 6) {
						tank.muscles -= 2;
					} else if (V.incubator.upgrade.speed === 5) {
						tank.muscles--;
					}
					r.push(`The strength monitoring systems detect ${he} is overly muscular and <span class="green">decrease ${his} steroid dosage.</span>`);
				} else if (tank.muscles < -10) {
					if (V.incubator.upgrade.speed === 52) {
						tank.muscles += 30;
					} else if (V.incubator.upgrade.speed === 18) {
						tank.muscles += 10;
					} else if (V.incubator.upgrade.speed === 9) {
						tank.muscles += 5;
					} else if (V.incubator.upgrade.speed === 6) {
						tank.muscles += 2;
					} else if (V.incubator.upgrade.speed === 5) {
						tank.muscles++;
					}
					r.push(`The strength monitoring systems detect ${he} is weak and <span class="green">increase ${his} steroid dosage.</span>`);
				} else {
					r.push(`${He} has <span class="lime">a healthy musculature;</span> efforts will be made to maintain it.`);
				}
			} else if (tank.incubatorSettings.muscles === 0) {
				if (tank.muscles > -100) {
					r.push(`${His} developing body <span class="red">quickly loses its gained muscle.</span>`);
					tank.muscles -= 40;
				}
			}
		} else {
			if (tank.muscles > -100) {
				r.push(`${His} developing body <span class="red">quickly loses its gained muscle.</span>`);
				tank.muscles -= 40;
			}
		}
		App.Events.addNode(entry, r, "div");

		r = [];
		if (V.incubator.upgrade.growthStims === 1 && tank.incubatorSettings.growthStims !== 0) {
			let heightLimit = Math.clamp((Height.forAge(tank.natural.height, tank) * 1.25), 0, 274);
			let heightLimitAge = Height.forAge(tank.natural.height, tank);
			if (tank.geneticQuirks.dwarfism === 2 && tank.geneticQuirks.gigantism !== 2) {
				heightLimit = Math.clamp((Height.forAge(tank.natural.height, tank) * 0.95), 0, 160);
			} else if (tank.geneticQuirks.gigantism === 2 && tank.geneticQuirks.dwarfism !== 2) {
				heightLimit = Math.clamp((Height.forAge(tank.natural.height, tank) * 1.75), 0, 274);
			}
			if (tank.geneMods.NCS === 1) {
				/* NCS should block physical growth beyond that of a toddler, but some players might like
				 * a little more or less. So using V.minimumSlaveAge or 8, whichever is lesser.	*/
				const limitAge = Math.min(8, V.minimumSlaveAge);
				/* scale height to age 8 */
				heightLimitAge = Height.forAge(tank.natural.height, limitAge);
				heightLimit = heightLimitAge;
			} else if (tank.geneticQuirks.neoteny === 2 && tank.physicalAge > 12) {
				/* scale height to age 12 */
				heightLimitAge = Height.forAge(tank.natural.height, 12);
				heightLimit = Math.clamp((heightLimitAge * 1.25), 0, 274);
			}
			if (tank.height >= heightLimit) {
				r.push(`The monitoring system detects ${his} body is not able to support further increases in height, so it carefully regulates stimulant injections to <span class="yellow">maintain ${his} current stature.</span>`);
				tank.height = heightLimit;
			} else if (tank.incubatorSettings.growthStims === 2) {
				if (tank.geneMods.NCS === 1) {
					r.push(`The monitoring system floods ${his} body with growth stimulants, but ${his} <span class="orange">NCS prevents an increase in ${his} growth rate.</span>`);
					tank.height = heightLimitAge;
				} else {
					if (tank.incubatorSettings.weight >= 1 && tank.incubatorSettings.muscles <= 1 && tank.incubatorSettings.reproduction <= 1) {
						r.push(`The monitoring system floods ${his} body with growth stimulants. ${His} caloric intake and expenditure rates are ideal for maximum response, causing <span class="green">explosive growth.</span>`);
						if (V.incubator.upgrade.speed === 52) {
							tank.height += random(3, 6);
						} else if (V.incubator.upgrade.speed === 18) {
							tank.height += random(2, 5);
						} else if (V.incubator.upgrade.speed === 9) {
							tank.height += random(1, 4);
						} else if (V.incubator.upgrade.speed === 6) {
							tank.height += random(1, 3);
						} else if (V.incubator.upgrade.speed === 5) {
							tank.height += random(1, 2);
						}
					} else {
						r.push(`The monitoring system floods ${his} body with growth stimulants, causing <span class="green">a sharp increase in growth rate.</span>`);
						if (V.incubator.upgrade.speed === 52) {
							tank.height += random(2, 5);
						} else if (V.incubator.upgrade.speed === 18) {
							tank.height += random(1, 4);
						} else if (V.incubator.upgrade.speed === 9) {
							tank.height += random(1, 3);
						} else if (V.incubator.upgrade.speed === 6) {
							tank.height += random(1, 2);
						} else if (V.incubator.upgrade.speed === 5) {
							tank.height += random(0, 1);
						}
					}
				}
			} else if (tank.incubatorSettings.growthStims === 1) {
				if (tank.geneMods.NCS === 1) {
					r.push(`The monitoring system detects ${he} is near the expected height for ${his} <span class="orange">NCS</span> condition, so it carefully regulates stimulant injections to <span class="yellow">maintain ${his} current stature.</span>`);
					tank.height = heightLimitAge;
				} else if (tank.height > heightLimitAge) {
					r.push(`The monitoring systems detect ${he} is near the expected height, so it carefully regulates stimulant injections to <span class="yellow">maintain ${his} current stature.</span>`);
					if (random(1, 10) === 10) {
						if (V.incubator.upgrade.speed === 52) {
							tank.height += random(1, 4);
						} else if (V.incubator.upgrade.speed === 18) {
							tank.height += random(1, 3);
						} else if (V.incubator.upgrade.speed === 9) {
							tank.height += random(1, 2);
						} else if (V.incubator.upgrade.speed === 6) {
							tank.height += random(0, 1);
						} else if (V.incubator.upgrade.speed === 5) {
							tank.height += random(0, 1);
						}
					}
				} else {
					r.push(`The monitoring systems detect ${his} body is capable of developing more rapidly and <span class="green">increase ${his} growth stimulant dosage.</span>`);
					if (V.incubator.upgrade.speed === 52) {
						tank.height += random(1, 4);
					} else if (V.incubator.upgrade.speed === 18) {
						tank.height += random(1, 3);
					} else if (V.incubator.upgrade.speed === 9) {
						tank.height += random(1, 2);
					} else if (V.incubator.upgrade.speed === 6) {
						tank.height += random(0, 1);
					} else if (V.incubator.upgrade.speed === 5) {
						tank.height += random(0, 1);
					}
				}
			}
			tank.height = Math.clamp(tank.height, 0, heightLimit);
		} else {
			r.push(`With the growth stimulant injections offline, ${his} body is left to develop naturally.`);
		}
		App.Events.addNode(entry, r, "div");

		r = [];
		if (V.incubator.upgrade.reproduction === 1) {
			const rearQuirk = tank.geneticQuirks.rearLipedema === 2 ? 2 : 1;
			const rearLimit = 20; // current maximum ass size, used to avoid reporting failed growth
			if (tank.incubatorSettings.reproduction === 2) {
				r.push(`${His} developing body is being flooded with hormones.`);
				if (tank.incubatorSettings.weight === 1) {
					r.push(`Combined with the abundant food provided to ${him}, ${his} body grows rapidly.`);
					if (tank.ovaries === 1) {
						tank.pubertyXX = 1;
						if (tank.hormoneBalance < 500) {
							tank.hormoneBalance += 100;
						}
						tank.readyOva = V.seeHyperPreg === 1 ? random(25, 45) : random(3, 8);
						if (tank.geneMods.NCS === 1) {
							/* NCS blocks hormonal growth of all secondary sexual characteristics */
							r.push(`${His} <span class="orange">NCS blocks all growth</span> despite the excess estrogen-laced growth hormones flooding ${his} body.`);
						} else if (V.incubator.upgrade.speed === 52) {
							if (tank.boobs < 8000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 2000;
							}
							if (tank.hips < 2 && random(1, 100) > 50) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips = Math.clamp(tank.hips + 2, -2, 2);
							}
							if (tank.butt < rearLimit && tank.butt < 12*rearQuirk && random(1, 100) > 30/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt += 4;
							}
						} else if (V.incubator.upgrade.speed === 18) {
							if (tank.boobs < 8000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 500;
							}
							if (tank.hips < 2 && random(1, 100) > 50) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < rearLimit && tank.butt < 12*rearQuirk && random(1, 100) > 50/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt += 3;
							}
						} else if (V.incubator.upgrade.speed === 9) {
							if (tank.boobs < 8000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 200;
							}
							if (tank.hips < 2 && random(1, 100) > 60) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">causes ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < rearLimit && tank.butt < 12*rearQuirk && random(1, 100) > 50/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear grow fatter.</span>`);
								tank.butt += 2;
							}
						} else if (V.incubator.upgrade.speed === 6) {
							if (tank.boobs < 8000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 100;
							}
							if (tank.hips < 2 && random(1, 100) > 70) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < rearLimit && tank.butt < 12*rearQuirk && random(1, 100) > 60/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						} else if (V.incubator.upgrade.speed === 5) {
							if (tank.boobs < 8000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 100;
							}
							if (tank.hips < 2 && random(1, 100) > 80) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < rearLimit && tank.butt < 12*rearQuirk && random(1, 100) > 70/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						}
					} else if (tank.balls > 0) {
						tank.pubertyXY = 1;
						if (tank.hormoneBalance > -500) {
							tank.hormoneBalance -= 100;
						}
						if (tank.geneMods.NCS === 1) {
							/* NCS blocks hormonal growth of all secondary sexual characteristics */
							r.push(`${His} <span class="orange">NCS blocks all growth</span> despite the excess testosterone-laced growth hormones flooding ${his} body.`);
						} else if (V.incubator.upgrade.speed === 52) {
							if (tank.balls < 40) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls += 16;
							}
							if (tank.dick < 10 && random(1, 100) > 20) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick += 4;
							}
						} else if (V.incubator.upgrade.speed === 18) {
							if (tank.balls < 40 && random(1, 100) > 10) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls += 9;
							}
							if (tank.dick < 10 && random(1, 100) > 30) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick += 3;
							}
						} else if (V.incubator.upgrade.speed === 9) {
							if (tank.balls < 40 && random(1, 100) > 20) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls += 4;
							}
							if (tank.dick < 10 && random(1, 100) > 50) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick += 2;
							}
						} else if (V.incubator.upgrade.speed === 6) {
							if (tank.balls < 40 && random(1, 100) > 30) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls += 2;
							}
							if (tank.dick < 10 && random(1, 100) > 70) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						} else if (V.incubator.upgrade.speed === 5) {
							if (tank.balls < 40 && random(1, 100) > 30) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls++;
							}
							if (tank.dick < 10 && random(1, 100) > 80) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						}
					}
				} else if (tank.incubatorSettings.weight === 2) {
					r.push(`Combined with the healthy food provided to ${him}, ${his} body grows readily.`);
					if (tank.ovaries === 1) {
						tank.pubertyXX = 1;
						if (tank.hormoneBalance < 500) {
							tank.hormoneBalance += 100;
						}
						tank.readyOva = V.seeHyperPreg === 1 ? random(15, 25) : random(2, 6);
						if (tank.geneMods.NCS === 1) {
							/* NCS blocks hormonal growth of all secondary sexual characteristics */
							r.push(`${His} <span class="orange">NCS blocks all growth</span> despite the excess estrogen-laced growth hormones flooding ${his} body.`);
						} else if (V.incubator.upgrade.speed === 52) {
							if (tank.boobs < 4000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 1000;
							}
							if (tank.hips < 2 && random(1, 100) > 70) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 8*rearQuirk && random(1, 100) > 50/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt += 3;
							}
						} else if (V.incubator.upgrade.speed === 18) {
							if (tank.boobs < 4000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 500;
							}
							if (tank.hips < 2 && random(1, 100) > 80) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 8*rearQuirk && random(1, 100) > 50/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						} else if (V.incubator.upgrade.speed === 9) {
							if (tank.boobs < 4000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 200;
							}
							if (tank.hips < 2 && random(1, 100) > 90) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 8*rearQuirk && random(1, 100) > 60/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						} else if (V.incubator.upgrade.speed === 6) {
							if (tank.boobs < 4000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 100;
							}
							if (tank.hips < 2 && random(1, 100) > 95) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 8*rearQuirk && random(1, 100) > 70/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						} else if (V.incubator.upgrade.speed === 5) {
							if (tank.boobs < 4000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 100;
							}
							if (tank.hips < 2 && random(1, 100) > 95) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 8*rearQuirk && random(1, 100) > 80/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						}
					} else if (tank.balls > 0) {
						tank.pubertyXY = 1;
						if (tank.hormoneBalance > -500) {
							tank.hormoneBalance -= 100;
						}
						if (tank.geneMods.NCS === 1) {
							/* NCS blocks hormonal growth of all secondary sexual characteristics */
							r.push(`${His} <span class="orange">NCS blocks all growth</span> despite the excess testosterone-laced growth hormones flooding ${his} body.`);
						} else if (V.incubator.upgrade.speed === 52) {
							if (tank.balls < 10) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls += 3;
							}
							if (tank.dick < 7 && random(1, 100) > 20) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick += 2;
							}
						} else if (V.incubator.upgrade.speed === 18) {
							if (tank.balls < 10 && random(1, 100) > 10) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls += 2;
							}
							if (tank.dick < 7 && random(1, 100) > 30) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						} else if (V.incubator.upgrade.speed === 9) {
							if (tank.balls < 10 && random(1, 100) > 20) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls++;
							}
							if (tank.dick < 7 && random(1, 100) > 50) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						} else if (V.incubator.upgrade.speed === 6) {
							if (tank.balls < 10 && random(1, 100) > 30) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls++;
							}
							if (tank.dick < 7 && random(1, 100) > 70) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						} else if (V.incubator.upgrade.speed === 5) {
							if (tank.balls < 10 && random(1, 100) > 30) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls++;
							}
							if (tank.dick < 7 && random(1, 100) > 80) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						}
					}
				} else {
					r.push(`Since ${his} body has little to work with, ${his} growth is fairly minor.`);
					if (tank.ovaries === 1) {
						tank.pubertyXX = 1;
						if (tank.hormoneBalance < 500) {
							tank.hormoneBalance += 100;
						}
						tank.readyOva = V.seeHyperPreg === 1 ? random(10, 15) : random(2, 4);
						if (tank.geneMods.NCS === 1) {
							/* NCS blocks hormonal growth of all secondary sexual characteristics */
							r.push(`${His} <span class="orange">NCS blocks all growth</span> despite the excess estrogen-laced growth hormones flooding ${his} body.`);
						} else if (V.incubator.upgrade.speed === 52) {
							if (tank.boobs < 2000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 700;
							}
							if (tank.hips < 2 && random(1, 100) > 90) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips = Math.clamp(tank.hips + 2, -2, 2);
							}
							if (tank.butt < 6*rearQuirk && random(1, 100) > 70/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt += 2;
							}
						} else if (V.incubator.upgrade.speed === 18) {
							if (tank.boobs < 2000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 200;
							}
							if (tank.hips < 2 && random(1, 100) > 80) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 6*rearQuirk && random(1, 100) > 70/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						} else if (V.incubator.upgrade.speed === 9) {
							if (tank.boobs < 2000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly balloon ${his} breasts.</span>`);
								tank.boobs += 50;
							}
							if (tank.hips < 2 && random(1, 100) > 80) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 6*rearQuirk && random(1, 100) > 90/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						} else if (V.incubator.upgrade.speed === 6) {
							if (tank.boobs < 2000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly grow ${his} breasts.</span>`);
								tank.boobs += 20;
							}
							if (tank.hips < 2 && random(1, 100) > 90) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 6*rearQuirk && random(1, 100) > 90/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						} else if (V.incubator.upgrade.speed === 5) {
							if (tank.boobs < 2000) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">rapidly grow ${his} breasts.</span>`);
								tank.boobs += 10;
							}
							if (tank.hips < 2 && random(1, 100) > 95) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} hips to widen for childbirth.</span>`);
								tank.hips++;
							}
							if (tank.butt < 6*rearQuirk && random(1, 100) > 90/rearQuirk) {
								r.push(`The excess estrogen-laced growth hormones <span class="green">cause ${his} rear to grow fatter.</span>`);
								tank.butt++;
							}
						}
					} else if (tank.balls > 0) {
						tank.pubertyXY = 1;
						if (tank.hormoneBalance > -500) {
							tank.hormoneBalance -= 100;
						}
						if (tank.geneMods.NCS === 1) {
							/* NCS blocks hormonal growth of all secondary sexual characteristics */
							r.push(`${His} <span class="orange">NCS blocks all growth</span> despite the excess testosterone-laced growth hormones flooding ${his} body.`);
						} else if (V.incubator.upgrade.speed === 52) {
							if (tank.balls < 6) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to grow for extra cum production.</span>`);
								tank.balls += 2;
							}
							if (tank.dick < 4 && random(1, 100) > 60) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						} else if (V.incubator.upgrade.speed === 18) {
							if (tank.balls < 6 && random(1, 100) > 50) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to grow for extra cum production.</span>`);
								tank.balls++;
							}
							if (tank.dick < 4 && random(1, 100) > 60) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						} else if (V.incubator.upgrade.speed === 9) {
							if (tank.balls < 6 && random(1, 100) > 60) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to balloon for extra cum production.</span>`);
								tank.balls++;
							}
							if (tank.dick < 4 && random(1, 100) > 70) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick += 2;
							}
						} else if (V.incubator.upgrade.speed === 6) {
							if (tank.balls < 6 && random(1, 100) > 70) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to grow for extra cum production.</span>`);
								tank.balls++;
							}
							if (tank.dick < 4 && random(1, 100) > 80) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						} else if (V.incubator.upgrade.speed === 5) {
							if (tank.balls < 6 && random(1, 100) > 80) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} balls to grow for extra cum production.</span>`);
								tank.balls++;
							}
							if (tank.dick < 4 && random(1, 100) > 90) {
								r.push(`The excess testosterone-laced growth hormones <span class="green">cause ${his} penis to swell.</span>`);
								tank.dick++;
							}
						}
					}
				}
			} else if (tank.incubatorSettings.reproduction === 1) {
				r.push(`${His} hormone levels are being carefully managed, <span class="green">encouraging early puberty.</span>`);
				if (tank.ovaries === 1) {
					tank.pubertyXX = 1;
					tank.hormoneBalance = 250;
					if (tank.geneMods.NCS === 1) {
						/* NCS blocks hormonal growth of all secondary sexual characteristics */
						r.push(`${His} <span class="orange">NCS blocks growth</span> despite the added estrogen.`);
					} else {
						// Inside the tank we cannot reach ridiculous sizes
						const origBoobs = tank.boobs;
						const boobsTarget = Math.min(tank.natural.boobs, 1200);
						if (tank.boobs < boobsTarget * 0.95) {
							tank.boobs += random(
								Math.floor(boobsTarget * 0.1),
								Math.floor(boobsTarget * 0.2)
							);
							// Once we reach max size, make regenerate the value, so we don't have any bias left over
							// from the random process before.
							if (tank.boobs >= boobsTarget * 0.95) {
								tank.boobs = random(boobsTarget * 0.95, boobsTarget * 1.05);
							}
						}
						if (tank.boobs < 400 && random(1, 100) > 60) {
							tank.boobs += 50;
						}
						if (tank.boobs > origBoobs) {
							r.push(`The added estrogen <span class="green">causes ${his} breasts to swell.</span>`);
						}
						if (tank.hips < 2 && random(1, 100) > 90) {
							r.push(`The added estrogen <span class="green">causes ${his} hips to widen.</span>`);
							tank.hips++;
						}
						if (tank.butt < 5 * rearQuirk && random(1, 100) > 80 / rearQuirk) {
							r.push(`The added estrogen <span class="green">causes ${his} butt to grow.</span>`);
							tank.butt++;
						}
					}
				} else if (tank.balls > 0) {
					tank.pubertyXY = 1;
					tank.hormoneBalance = -250;
					if (tank.geneMods.NCS === 1) {
						/* NCS blocks hormonal growth of all secondary sexual characteristics */
						r.push(`${His} <span class="orange">NCS blocks all growth</span> despite the added testosterone.`);
					} else {
						if (tank.balls < 3 && random(1, 100) > 80) {
							r.push(`The added testosterone <span class="green">causes ${his} balls to swell.</span>`);
							tank.balls++;
						}
						if (tank.dick < 3 && random(1, 100) > 60) {
							r.push(`The added testosterone <span class="green">causes ${his} penis to grow.</span>`);
							tank.dick++;
						}
					}
				}
				tank.readyOva = 0;
			} else {
				if (tank.hormoneBalance > 100) {
					tank.hormoneBalance -= 50;
				} else if (tank.hormoneBalance < -100) {
					tank.hormoneBalance += 50;
				}
				if (tank.balls > 0) {
					if (tank.balls > 1) {
						tank.balls -= 5;
					}
					if (tank.dick > 1) {
						tank.dick -= 5;
					}
					if (tank.balls <= 0) {
						tank.balls = 1;
					}
					if (tank.dick <= 0) {
						tank.dick = 1;
					}
				}
				if (tank.boobs > 0) {
					tank.boobs -= 500;
				}
				if (tank.butt > 0) {
					tank.butt -= 4;
				}
				tank.readyOva = 0;
			}
		} else {
			if (tank.hormoneBalance > 100) {
				tank.hormoneBalance -= 50;
			} else if (tank.hormoneBalance < -100) {
				tank.hormoneBalance += 50;
			}
			if (tank.balls > 0) {
				if (tank.balls > 1) {
					tank.balls -= 5;
				}
				if (tank.dick > 1) {
					tank.dick -= 5;
				}
				if (tank.balls <= 0) {
					tank.balls = 1;
				}
				if (tank.dick <= 0) {
					tank.dick = 1;
				}
			}
			if (tank.boobs > 0) {
				tank.boobs -= 500;
			}
			if (tank.butt > 0) {
				tank.butt -= 4;
			}
		}
		App.Events.addNode(entry, r, "div");

		if (tank.incubatorSettings.reproduction === 2) {
			tank.energy = 80;
			tank.need = 100;
		} else if (tank.incubatorSettings.reproduction === 1) {
			tank.energy = 50;
			tank.need = 20;
		} else {
			tank.energy = 0;
			tank.need = 0;
		}

		r = [];
		if (tank.incubatorSettings.pregAdaptation > 0 && tank.incubatorSettings.growTime > 0) {
			if (tank.incubatorSettings.pregAdaptationInWeek <= 0) {
				r.push(`${His} physique will be mature enough on release that the incubator's reproductive capacity system would have no effect on ${him} at current settings, so it is unused.`);
			} else {
				r.push(`The incubator is working on adapting ${his} abdomen and reproductive organs for future pregnancies.`);

				let weekAdapt = tank.incubatorSettings.pregAdaptationInWeek * V.incubator.upgrade.speed;
				if (isNaN(weekAdapt)) {
					/* NaN check AFTER multiply operation, against it result is critical here. Need to be absolutely sure about this operation, not about just tank property itself. This give me two very unpleasant hours to catch this */
					tank.incubatorSettings.pregAdaptationInWeek = (15000 / 2000 - tank.pregAdaptation) / tank.incubatorSettings.growTime;
				}
				weekAdapt = tank.incubatorSettings.pregAdaptationInWeek * V.incubator.upgrade.speed;
				/* Now it should be fine */
				weekAdapt *= 1 + (tank.incubatorSettings.reproduction / 5);
				weekAdapt *= 1 + (tank.hormoneBalance / 1500);
				tank.pregAdaptation += weekAdapt;
				/* here goes side effect from intense and extreme settings: */
				if (random(1, 100) <= (tank.incubatorSettings.pregAdaptationPower - 1) * (V.incubator.upgrade.speed / 2 + 1)) {
					switch (random(1, 9)) { /* side effect selection*/
						case 1:
							if (tank.preg > -2) {
								tank.preg = -2;
								r.push(`It caused <span class="red">reproductive damage</span> when excessive meddling damaged an organ.`);
							}
							break;
						case 2:
							if (((tank.ovaries === 1 || tank.mpreg === 1) && tank.preg > -3) || (tank.balls > 0 && tank.ballType !== "sterile")) {
								if (tank.ovaries === 1 || tank.mpreg === 1) {
									tank.preg = -3;
								}
								if (tank.balls > 0) {
									tank.ballType = "sterile";
								}
								r.push(`It caused <span class="red">severe reproductive damage</span> when excessive hormones shut down the associated organs.`);
							}
							break;
						case 3:
							if (tank.lactation < 1) {
								tank.lactation = 1;
								r.push(`It has <span class="orange">triggered a hormonal disorder,</span> causing ${his} breast glands to begin producing milk.`);
							}
							break;
						case 4:
							if (tank.bellySag < 100 || tank.bellySagPreg < 100) {
								tank.bellySag = 100;
								tank.bellySagPreg = 100;
								r.push(`It activated <span class="red">emergency protocols</span> when overpressure to ${his} abdominal tissues and skin reached critical levels. ${His} belly has lost muscle tone and has begun to strongly sag.`);
							}
							break;
						case 5:
							tank.health.condition -= 15;
							r.push(`Overzealous prodding caused some <span class="red">internal bleeding.</span>`);
							break;
						case 6:
							if (tank.weight < 200) {
								tank.weight += 50;
								r.push(`An unexpected shift in hormones spurred <span class="red">massive weight gain</span> before it could be corrected.`);
							}
							break;
						case 7:
							if (tank.weight > -100) {
								tank.weight -= 50;
								r.push(`An unexpected shift in hormones spurred <span class="red">massive weight loss</span> before it could be corrected.`);
							}
							break;
						case 8:
							tank.boobs += 5000;
							tank.boobShape = BreastShape.SAGGY;
							r.push(`An unexpected shift in hormones encouraged <span class="green">explosive breast growth</span> before it could be corrected.`);
							break;
						case 9:
							if (tank.hips < 3) {
								tank.hips = 3;
								r.push(`A malfunction in the skeletal reconstruction software caused it to <span class="green">overwiden ${his} hips.</span>`);
							}
							break;
					}
				}
			}
		}
		App.Events.addNode(entry, r, "div");

		if (tank.preg > 0) {
			App.UI.DOM.appendNewElement("span", entry, `The incubator is displaying an alert that ${he} may be pregnant.`, 'red');
		}

		tank.weight = Math.clamp(tank.weight, -100, 200);
		tank.muscles = Math.clamp(tank.muscles, -100, 100);
		tank.dick = Math.clamp(tank.dick, 0, 10);
		tank.hips = Math.clamp(tank.hips, -2, 3);
		tank.balls = Math.clamp(tank.balls, 0, 40);
		tank.boobs = Math.clamp(tank.boobs, 10, 30000);
		tank.butt = Math.clamp(tank.butt, 0, 20);
		tank.height = Math.clamp(tank.height, 0, 274);
		tank.hormoneBalance = Math.clamp(tank.hormoneBalance, -500, 500);
		tank.foreskin = tank.dick;	/* simple, clean way of making sure foreskins and scrotums grow appropriately */
		tank.scrotum = tank.balls;	/* if we want dicks/balls to outgrow foreskins/scrotums, this will have to be removed */
		if (tank.pubertyXX === 1) {	/* workaround due to puberty() being skipped */
			tank.pubertyAgeXX = tank.physicalAge - 1;
			tank.geneticQuirks.gigantomastia = Math.min(tank.geneticQuirks.gigantomastia, 2);
			tank.geneticQuirks.macromastia = Math.min(tank.geneticQuirks.macromastia, 2);
			tank.geneticQuirks.galactorrhea = Math.min(tank.geneticQuirks.galactorrhea, 2);
		}
		if (tank.pubertyXY === 1) {
			tank.pubertyAgeXY = tank.physicalAge - 1;
			tank.geneticQuirks.galactorrhea = Math.min(tank.geneticQuirks.galactorrhea, 2);
		}
	}

	return {
		before: frag,
		slaves: [],
		after: new DocumentFragment(),
	};
};
