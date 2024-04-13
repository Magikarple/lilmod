/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} [descType=DescType.NORMAL]
 * @returns {string}
 */
App.Desc.pregnancy = function(slave, descType = DescType.NORMAL) {
	const r = [];
	const {
		he, him, his, himself, He, His
	} = getPronouns(slave);
	let daddy;
	if (slave.pregSource > 0) {
		const lsd = findFather(slave.pregSource);
		if (lsd) {
			daddy = SlaveFullName(lsd);
		} else {
			daddy = "partner";
		}
	} else if (slave.pregSource in V.missingTable && V.showMissingSlaves) {
		daddy = V.missingTable[slave.pregSource].fullName;
	}

	if (slave.preg === -2 && slave.vagina < 0 && slave.mpreg === 0) {
		// TODO: write me
	} else if ((slave.preg <= -3) && (slave.ovaries === 1 || slave.mpreg === 1)) {
		r.push(`${He} is sterilized.`);
	} else if ((slave.preg <= -2) && (slave.ovaries === 1 || slave.mpreg === 1)) {
		r.push(`${He} is sterile.`);
	} else if ((slave.pregWeek < 0) && (slave.ovaries === 1 || slave.mpreg === 1)) {
		r.push(`${He} is recovering from ${his} recent pregnancy.`);
	} else if (slave.preg === 0 && slave.vagina > -1) {
		if (slave.readyOva > 30) {
			r.push(`${His} lower belly is noticeably bloated, ${his} breasts bigger and more sensitive, and ${his} pussy swollen and leaking fluids. ${He} desperately needs a dick in ${him} and reminds you of a bitch in heat.`);
		} else if (slave.readyOva > 20) {
			r.push(`${His} lower belly is noticeably bloated and ${his} pussy swollen and leaking fluids. ${He} is very ready to be seeded.`);
		} else if (slave.readyOva > 2) {
			r.push(`${His} lower belly is slightly bloated and ${his} pussy swollen and leaking fluids. ${He} is ready to be seeded.`);
		}
	} else if (slave.bellyPreg >= 1000000) {
		r.push(`${He} is <span class="pink">impossibly pregnant</span> with`);
		if (slave.preg >= slave.pregData.normalBirth * 1.375) {
			if (slave.pregType === 1) {
				r.push(`a single full grown child.`);
			} else if (slave.pregType >= 10) {
				r.push(`${slave.pregType} overgrown babies.`);
			} else {
				r.push(`overgrown ${pregNumberName(slave.pregType, 2)}.`);
			}
			r.push(`${He} is horrifically overdue; ${he} should have given birth a staggering ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
		} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
			if (slave.pregType === 1) {
				r.push(`a single full grown child.`);
			} else if (slave.pregType >= 10) {
				r.push(`${slave.pregType} overgrown babies.`);
			} else {
				r.push(`overgrown ${pregNumberName(slave.pregType, 2)}.`);
			}
			r.push(`${He} is extremely overdue; ${he} should have given birth ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
		} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
			if (slave.pregType === 1) {
				r.push(`a single full grown child.`);
			} else if (slave.pregType >= 10) {
				r.push(`${slave.pregType} overgrown babies.`);
			} else {
				r.push(`overgrown ${pregNumberName(slave.pregType, 2)}.`);
			}
			r.push(`${He} is very overdue; ${he} should have given birth ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
		} else {
			r.push(`a staggering ${slave.pregType} babies.`);
		}
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyPreg >= 750000) {
		r.push(`${He} is`);
		if (slave.belly > (slave.pregAdaptation * 1000)) {
			r.push(`<span class="red">on the brink of bursting!</span> ${His} belly is painfully stretched and ${his} womb packed to capacity; the slightest provocation could cause ${him} to rupture.`);
		} else {
			r.push(`<span class="pink">unbelievably pregnant</span> with ${slave.pregType} babies.`);
		}
		if (slave.preg >= slave.pregData.normalBirth * 1.375) {
			r.push(`${He} is horrifically overdue; ${he} should have given birth a staggering ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
		} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
			r.push(`${He} is extremely overdue; ${he} should have given birth ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
		} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
			r.push(`${He} is very overdue; ${he} should have given birth ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
		}
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyImplant >= 750000) {
		r.push(`${He} looks <span class="red">ready to pop!</span> ${His} middle is`);
		if (slave.belly > (slave.pregAdaptation * 1000)) {
			r.push(`painfully`);
		} else {
			r.push(`frighteningly`);
		}
		r.push(`stretched by ${his} straining ${slave.bellyImplant}cc belly implant. It is well past its recommended capacity and at risk of rupturing.`);
	} else if (slave.bellyPreg >= 600000) {
		r.push(`${He} is <span class="pink">dangerously pregnant,</span> ${his} overburdened womb is filled with`);
		fullBelly();
	} else if (slave.bellyImplant >= 600000) {
		r.push(`${He} looks <span class="pink">dangerously pregnant.</span> ${His} middle is massively stretched by ${his} absurdly overfilled ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyPreg >= 450000) {
		r.push(`${He} is <span class="pink">grotesquely pregnant,</span> ${his} womb is packed with`);
		fullBelly();
	} else if (slave.bellyImplant >= 450000) {
		r.push(`${He} looks <span class="pink">absurdly pregnant.</span> ${His} middle is massively stretched by ${his} overfilled ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyPreg >= 300000) {
		r.push(`${He} is <span class="pink">absurdly pregnant</span> with`);
		if (slave.preg >= slave.pregData.normalBirth * 1.375) {
			overgrownBaby1();
		} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
			overGrownBaby2();
		} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
			overgrownBaby3();
		} else {
			r.push(`${slave.pregType} children.`);
		}
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyImplant >= 300000) {
		r.push(`${He} looks <span class="pink">absurdly pregnant.</span> ${His} overburdened middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyPreg >= 120000) {
		r.push(`${He} is`);
		if (slave.preg >= slave.pregData.normalBirth * 1.375) {
			r.push(`<span class="pink">obscenely pregnant</span> with`);
			overgrownBaby1();
		} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
			r.push(`<span class="pink">obscenely pregnant</span> with`);
			overGrownBaby2();
		} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
			r.push(`<span class="pink">obscenely pregnant</span> with`);
			overgrownBaby3();
		} else if (slave.pregType > 9) {
			r.push(`<span class="pink">obscenely pregnant</span> with`);
			manyChildren();
		} else {
			r.push(`<span class="pink">obscenely pregnant:</span> ${he}'s`);
			if (slave.pregType === 9) {
				r.push(`almost ready to give birth to nonuplets.`);
			} else {
				r.push(`ready to give birth to octuplets.`);
			}
		}
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyImplant >= 120000) {
		r.push(`${He} looks <span class="pink">obscenely pregnant with octuplets.</span> ${His} overburdened middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyPreg >= 15000) {
		r.push(`${He} is`);
		if (slave.bellyPreg >= 105000) {
			if (slave.preg >= slave.pregData.normalBirth * 1.375) {
				massivelyPregnantOvergrownBaby1();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
				massivelyPregnantOvergrownBaby2();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
				massivelyPregnantOvergrownBaby3();
			} else if (slave.pregType > 8) {
				massivelyPregnantManyChildren();
			} else {
				r.push(`<span class="pink">massively pregnant:</span> ${he}'s`);
				if (slave.pregType === 8) {
					r.push(`almost ready to give birth to octuplets.`);
				} else {
					r.push(`ready to give birth to septuplets.`);
				}
			}
		} else if (slave.bellyPreg >= 90000) {
			if (slave.preg >= slave.pregData.normalBirth * 1.375) {
				massivelyPregnantOvergrownBaby1();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
				massivelyPregnantOvergrownBaby2();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
				massivelyPregnantOvergrownBaby3();
			} else if (slave.pregType > 7) {
				massivelyPregnantManyChildren();
			} else {
				r.push(`<span class="pink">massively pregnant:</span> ${he}'s`);
				if (slave.pregType === 7) {
					r.push(`almost ready to give birth to septuplets.`);
				} else if (slave.pregType === 3) {
					r.push(`ready to give birth to triplets.`);
				} else if (slave.pregType === 4) {
					r.push(`ready to give birth to quadruplets.`);
				} else if (slave.pregType === 5) {
					r.push(`ready to give birth to quintuplets.`);
				} else {
					r.push(`ready to give birth to sextuplets.`);
				}
			}
		} else if (slave.bellyPreg >= 75000) {
			if (slave.preg >= slave.pregData.normalBirth * 1.375) {
				massivelyPregnantOvergrownBaby1();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
				massivelyPregnantOvergrownBaby2();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
				massivelyPregnantOvergrownBaby3();
			} else if (slave.pregType > 6) {
				massivelyPregnantManyChildren();
			} else {
				r.push(`<span class="pink">massively pregnant:</span> ${he}'s`);
				if (slave.pregType === 6) {
					r.push(`almost ready to give birth to sextuplets.`);
				} else if (slave.pregType === 3) {
					r.push(`ready to give birth to triplets.`);
				} else {
					r.push(`ready to give birth to quintuplets.`);
				}
			}
		} else if (slave.bellyPreg >= 60000) {
			if (slave.preg >= slave.pregData.normalBirth * 1.375) {
				massivelyPregnantOvergrownBaby1();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
				massivelyPregnantOvergrownBaby2();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
				massivelyPregnantOvergrownBaby3();
			} else if (slave.pregType > 5) {
				massivelyPregnantManyChildren();
			} else {
				r.push(`<span class="pink">massively pregnant:</span> ${he}'s`);
				if (slave.pregType === 5) {
					r.push(`almost ready to give birth to quintuplets.`);
				} else if (slave.pregType === 2) {
					r.push(`ready to give birth to twins.`);
				} else if (slave.pregType === 3) {
					r.push(`ready to give birth to triplets.`);
				} else {
					r.push(`ready to give birth to quadruplets.`);
				}
			}
		} else if (slave.bellyPreg >= 45000) {
			if (slave.preg >= slave.pregData.normalBirth * 1.375) {
				massivelyPregnantOvergrownBaby1();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
				massivelyPregnantOvergrownBaby2();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
				massivelyPregnantOvergrownBaby3();
			} else if (slave.pregType > 4) {
				massivelyPregnantManyChildren();
			} else {
				r.push(`<span class="pink">massively pregnant:</span> ${he}'s`);
				if (slave.pregType === 4) {
					r.push(`almost ready to give birth to quadruplets.`);
				} else if (slave.pregType === 2) {
					r.push(`ready to give birth to twins.`);
				} else {
					r.push(`ready to give birth to triplets.`);
				}
			}
		} else if (slave.bellyPreg >= 30000) {
			if (slave.preg >= slave.pregData.normalBirth * 1.375) {
				massivelyPregnantOvergrownBaby1();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
				massivelyPregnantOvergrownBaby2();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
				massivelyPregnantOvergrownBaby3();
			} else if (slave.pregType > 3) {
				massivelyPregnantManyChildren();
			} else {
				r.push(`<span class="pink">massively pregnant:</span> ${he}'s`);
				if (slave.pregType === 3) {
					r.push(`almost ready to give birth to triplets.`);
				} else if (WombGetFetalSizeSum(slave) < 30000) {
					r.push(`ready to give birth.`);
				} else {
					r.push(`ready to give birth to twins.`);
				}
			}
		} else {
			if (slave.preg >= slave.pregData.normalBirth * 1.375) {
				massivelyPregnantOvergrownBaby1();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
				massivelyPregnantOvergrownBaby2();
			} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
				massivelyPregnantOvergrownBaby3();
			} else if (slave.pregType > 2) {
				massivelyPregnantManyChildren();
			} else {
				r.push(`<span class="pink">massively pregnant:</span> ${he}'s`);
				if (slave.pregType === 2) {
					r.push(`almost ready to give birth to twins.`);
				} else {
					r.push(`ready to give birth.`);
				}
			}
		}
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyImplant >= 105000) {
		r.push(`${He} looks <span class="pink">massively pregnant with septuplets.</span> ${His} greatly rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyImplant >= 90000) {
		r.push(`${He} looks <span class="pink">massively pregnant with sextuplets.</span> ${His} greatly rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyImplant >= 75000) {
		r.push(`${He} looks <span class="pink">massively pregnant with quintuplets.</span> ${His} greatly rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyImplant >= 60000) {
		r.push(`${He} looks <span class="pink">massively pregnant with quadruplets.</span> ${His} greatly rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyImplant >= 45000) {
		r.push(`${He} looks <span class="pink">massively pregnant with triplets.</span> ${His} greatly rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyImplant >= 30000) {
		r.push(`${He} looks <span class="pink">massively pregnant with twins.</span> ${His} greatly rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyImplant >= 15000) {
		r.push(`${He} looks <span class="pink">massively pregnant.</span> ${His} greatly rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyPreg >= 10000) {
		r.push(`${He} is`);
		if (slave.pregType > 2) {
			r.push(`<span class="pink">hugely pregnant,</span> despite how early in ${his} pregnancy ${he} is: ${he}'s carrying`);
			manyChildren();
		} else {
			r.push(`<span class="pink">hugely pregnant:</span> ${he}'s`);
			if (slave.pregType === 2) {
				r.push(`carrying twins.`);
			} else {
				r.push(`almost ready to give birth.`);
			}
		}
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyImplant >= 10000) {
		r.push(`${He} looks <span class="pink">hugely pregnant.</span> ${He} greatly rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyPreg >= 5000) {
		r.push(`${He} is`);
		if (slave.pregType > 2) {
			r.push(`<span class="pink">very pregnant,</span> despite how early in ${his} pregnancy ${he} is: ${he}'s carrying`);
			manyChildren();
		} else {
			r.push(`<span class="pink">very pregnant:</span>`);
			if (slave.pregType === 2) {
				r.push(`${he}'s carrying twins.`);
			} else {
				r.push(`the baby inside ${him} is growing rapidly.`);
			}
		}
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyImplant >= 5000) {
		r.push(`${He} looks <span class="pink">very pregnant.</span> ${He} rounded middle is filled by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyPreg >= 1500) {
		r.push(`${He} is`);
		if (slave.pregType > 2) {
			r.push(`<span class="pink">visibly pregnant,</span> despite how early in ${his} pregnancy ${he} is: ${he}'s carrying`);
			manyChildren();
		} else {
			r.push(`<span class="pink">visibly pregnant.</span>`);
		}
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyImplant >= 1500) {
		r.push(`${He} looks <span class="pink">visibly pregnant.</span> ${He} rounded middle is caused by ${his} ${slave.bellyImplant}cc belly implant.`);
	} else if (slave.bellyPreg >= 100) {
		r.push(`${He} is <span class="pink">pregnant</span> and just beginning to show, though it is hard to tell at a glance.`);
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.bellyImplant > 0) {
		r.push(`${He} has an abdominal implant, though it doesn't round out ${his} belly too much yet at a tiny ${slave.bellyImplant}ccs.`);
	} else if (slave.bellyImplant === 0 && descType !== DescType.MARKET) {
		r.push(`${He} has an abdominal implant, but it is completely empty.`);
	} else if (slave.pregKnown === 1) {
		r.push(`${He} is <span class="pink">pregnant,</span> though it isn't visible yet.`);
		r.push(App.Desc.superfetation(slave, descType));
	} else if (slave.preg > 0 && slave.pregKnown === 0 && descType !== DescType.MARKET) {
		r.push(`${His} period is late.`);
	}
	if (slave.preg + 5 <= slave.pregWeek && slave.preg <= slave.pregData.normalBirth + 2 && slave.bellyPreg >= 100) {
		r.push(`Despite having been pregnant for ${slave.pregWeek} weeks,`);
		if (slave.broodmother > 0) {
			if (slave.broodmotherOnHold > 0) {
				r.push(`${he} will be pregnant for another ${slave.broodmotherCountDown} weeks while ${his} remaining implant-induced pregnancies come to term.`);
			} else {
				r.push(`${he} will remain pregnant until ${his} broodmother implant is disabled.`);
			}
		} else if (slave.preg > slave.pregData.minLiveBirth && slave.preg + 10 <= slave.pregWeek) {
			r.push(`${his} pregnancy is finally nearing its end.`);
		} else if (slave.preg + slave.pregData.normalBirth <= slave.pregWeek) {
			if (slave.preg === slave.pregWeek / 2) {
				r.push(`${he} could shockingly pass for a girl half as far along.`);
			} else if (slave.preg === slave.pregWeek / 4) {
				r.push(`${he} could shockingly pass for a girl only a quarter as far along.`);
			} else {
				r.push(`${he} shockingly only looks like a girl on ${his} ${ordinalSuffix(Math.round(slave.preg))} week of pregnancy.`);
			}
		} else if (slave.preg + (slave.pregData.normalBirth / 2) <= slave.pregWeek) {
			if (slave.preg === slave.pregWeek / 2) {
				r.push(`${he} could surprisingly pass for a girl half as far along.`);
			} else if (slave.preg === slave.pregWeek / 4) {
				r.push(`${he} could surprisingly pass for a girl only a quarter as far along.`);
			} else {
				r.push(`${he} surprisingly only looks like a girl on ${his} ${ordinalSuffix(Math.round(slave.preg))} week of pregnancy.`);
			}
		} else if (slave.preg + (slave.pregData.normalBirth / 4) <= slave.pregWeek) {
			if (slave.preg === slave.pregWeek / 2) {
				r.push(`${he} could pass for a girl half as far along.`);
			} else if (slave.preg === slave.pregWeek / 4) {
				r.push(`${he} could pass for a girl only a quarter as far along.`);
			} else {
				r.push(`${he} only looks like a woman on ${his} ${ordinalSuffix(Math.round(slave.preg))} week of pregnancy.`);
			}
		} else {
			r.push(`${his} pregnancy is smaller than anticipated.`);
		}
	} else if (slave.preg > slave.pregWeek && slave.preg <= slave.pregData.normalBirth + 2 && slave.bellyPreg >= 100) {
		if (slave.preg > slave.pregData.minLiveBirth && slave.preg >= slave.pregWeek + 10) {
			r.push(`Even though ${he} is a mere ${slave.pregWeek} weeks along, ${his} pregnancy is at its end.`);
		} else if (slave.preg >= slave.pregWeek + (slave.pregData.normalBirth / 2.66)) {
			r.push(`Despite having been pregnant for only ${slave.pregWeek} weeks,`);
			if (slave.preg === slave.pregWeek * 2) {
				r.push(`${he} could shockingly pass for a girl twice as far along.`);
			} else if (slave.preg === slave.pregWeek * 4) {
				r.push(`${he} could shockingly pass for a girl nearly four times as far along.`);
			} else {
				r.push(`${he} shockingly looks like a girl on ${his} ${ordinalSuffix(Math.round(slave.preg))} week of pregnancy.`);
			}
		} else if (slave.preg >= slave.pregWeek + (slave.pregData.normalBirth / 4)) {
			r.push(`Despite having been pregnant for only ${slave.pregWeek} weeks,`);
			if (slave.preg === slave.pregWeek * 2) {
				r.push(`${he} could surprisingly pass for a girl twice as far along.`);
			} else if (slave.preg === slave.pregWeek * 4) {
				r.push(`${he} could surprisingly pass for a girl nearly four times as far along.`);
			} else {
				r.push(`${he} surprisingly looks like a girl on ${his} ${ordinalSuffix(Math.round(slave.preg))} week of pregnancy.`);
			}
		} else if (slave.preg >= slave.pregWeek + (slave.pregData.normalBirth / 8)) {
			r.push(`Despite having been pregnant for only ${slave.pregWeek} weeks,`);
			if (slave.preg === slave.pregWeek * 2) {
				r.push(`${he} could pass for a girl twice as far along.`);
			} else if (slave.preg === slave.pregWeek * 4) {
				r.push(`${he} could pass for a girl nearly four times as far along.`);
			} else {
				r.push(`${he} looks like a woman on ${his} ${ordinalSuffix(Math.round(slave.preg))} week of pregnancy.`);
			}
		} else {
			r.push(`Despite having been pregnant for only ${slave.pregWeek} weeks, ${his} pregnancy is larger than anticipated.`);
		}
	}
	if (slave.pregKnown === 1 && descType !== DescType.MARKET) {
		const slaveWD = WombGetLittersData(slave);
		if (slave.geneticQuirks.superfetation === 2 && slaveWD.litters.length > 1) {
			if (V.pregnancyMonitoringUpgrade !== 1) {
				const sameFatherID = slaveWD.litterData[0][0].fatherID;
				const sameFather = slaveWD.litterData.every(l => l[0].fatherID === sameFatherID);
				r.push(`${His} superfetation has resulted in multiple simultaneous pregnancies;`);
				if (!sameFather) {
					r.push(`tests report multiple different sources.`);
				} else {
					if (slaveWD.litterData[slaveWD.litters.length - 1][0].age <= slave.pregData.normalBirth / 8) {
						r.push(`all of them too young to tell the father of.`);
					} else if (slave.pregSource === -7) {
						r.push(`all of them modified children from the gene lab.`);
					} else if (slave.pregSource === -1) {
						r.push(`all of them yours.`);
					} else if (slave.pregSource === -2) {
						r.push(`all of them fathered by your citizens.`);
					} else if (slave.pregSource === -3) {
						r.push(`all of them fathered by your former Master. He was quite the busy man.`);
					} else if (slave.pregSource === -4) {
						r.push(`all of them fathered by another arcology owner.`);
					} else if (slave.pregSource === -5) {
						r.push(`all of them fathered by one of your clients.`);
					} else if (slave.pregSource === -6) {
						r.push(`all of them fathered by the Societal Elite.`);
					} else if (slave.pregSource === -9) {
						r.push(`all of them fathered by the Futanari Sisters, given how far along ${he} is and ${his} history.`);
					} else if (slave.pregSource === 0) {
						r.push(`all of them of unidentifiable sources.`);
					} else if (slave.pregSource === slave.ID) {
						r.push(`all of them ${his} own.`);
					} else {
						r.push(`all of them ${daddy}'s.`);
					}
				}
			}
		} else {
			if (slave.pregSource === -7) {
				r.push(`${His} womb contains`);
				if (slave.pregType > 1) {
					if (slave.pregType > 10) {
						r.push(`many`);
					}
					r.push(`modified children`);
				} else {
					r.push(`a modified child`);
				}
				r.push(`from the gene lab.`);
			} else if (slave.preg > slave.pregData.normalBirth / 8) {
				if (slave.pregSource === -1) {
					r.push(`Tests show ${his} womb contains`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many of`);
						}
						r.push(`your growing children.`);
					} else {
						r.push(`your growing child.`);
					}
				} else if (slave.pregSource === -2) {
					r.push(`Tests show ${his} womb contains`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many`);
						}
						r.push(`children`);
					} else {
						r.push(`a child`);
					}
					r.push(`fathered by one of your citizens.`);
				} else if (slave.pregSource === -3) {
					r.push(`Tests show ${his} womb contains`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many`);
						}
						r.push(`children`);
					} else {
						r.push(`a child`);
					}
					r.push(`fathered by your former Master. He was quite the busy man.`);
				} else if (slave.pregSource === -4) {
					r.push(`Tests show ${his} womb contains`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many`);
						}
						r.push(`children`);
					} else {
						r.push(`a child`);
					}
					r.push(`fathered by another arcology owner.`);
				} else if (slave.pregSource === -5) {
					r.push(`Tests show ${his} womb contains`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many`);
						}
						r.push(`children`);
					} else {
						r.push(`a child`);
					}
					r.push(`fathered by one of your clients.`);
				} else if (slave.pregSource === -6) {
					r.push(`Tests show ${his} womb contains`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many`);
						}
						r.push(`children`);
					} else {
						r.push(`a child`);
					}
					r.push(`fathered by the Societal Elite.`);
				} else if (slave.pregSource === -9) {
					r.push(`${His} womb contains`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many`);
						}
						r.push(`children`);
					} else {
						r.push(`a child`);
					}
					r.push(`fathered by the Futanari Sisters, given how far along ${he} is and ${his} history.`);
				} else if (slave.pregSource === 0) {
					r.push(`Tests are inconclusive on who fathered the`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many`);
						}
						r.push(`children`);
					} else {
						r.push(`child`);
					}
					r.push(`growing in ${his} womb.`);
				} else if (slave.pregSource === slave.ID) {
					r.push(`Tests show ${he} did this to ${himself}.`);
				} else {
					r.push(`Tests show ${his} womb contains`);
					if (slave.pregType > 1) {
						if (slave.pregType > 10) {
							r.push(`many of`);
						}
						r.push(`${daddy}'s growing children.`);
					} else {
						r.push(`${daddy}'s growing child.`);
					}
				}
			} else if (slave.partners.size === 1) {
				let daddy = slave.partners.values().next().value;

				if (daddy > 0) {
					if (daddy === slave.ID) {
						daddy = himself;
					} else {
						daddy = SlaveFullName(getSlave(daddy));
					}
				} else {
					let desc = {
						1: `you`,
						2: `one of the citizens of ${V.arcologies[0].name}`,
						3: `your former Master`,
						4: `the owner of another arcology`,
						6: `a member of the Societal Elite`,
						8: `one of your pets`,
						9: `a Futanari Sister`,
						10: `a rapist`,
					};
					daddy = desc[Math.abs(daddy)];
				}

				r.push(`${His} ${slave.pregType > 1 ? `children were` : `child was`} fathered by ${daddy}.`);
			} else {
				r.push(`It is too early to tell who exactly fathered the child growing in ${his} womb.`);
			}
		}
	}
	if (slave.geneMods.rapidCellGrowth !== 1 && slave.bellyPreg >= 100000 && slave.belly > (slave.pregAdaptation * 3200) && (slave.bellyPreg >= 500000 || slave.wombImplant !== "restraint")) {
		r.push(`${He} is undergoing a <span class="red">very high risk pregnancy${V.seeExtreme === 1 && V.dangerousPregnancy === 1 ? " and may burst" : ""}.</span>`);
	} else if ((slave.bellyPreg > (slave.pregAdaptation * 1000) || (slave.preg > slave.pregData.normalBirth / 2 && slave.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2 && ft.age >= 20))) && slave.geneMods.progenitor !== 1) {
		r.push(`${He} is undergoing a <span class="red">high risk pregnancy.</span>`);
	}

	if (slave.belly >= 10000) {
		r.push(`${His} belly is <span class="coral">large enough to be in the way,</span> both in daily affairs and during sex.`);
	}
	return r.join(" ");

	function fullBelly() {
		if (slave.preg >= slave.pregData.normalBirth * 1.375) {
			overgrownBaby1();
		} else if (slave.preg >= slave.pregData.normalBirth * 1.25) {
			overGrownBaby2();
		} else if (slave.preg >= slave.pregData.normalBirth * 1.075) {
			overgrownBaby3();
		} else {
			r.push(`${slave.pregType} babies.`);
		}
		r.push(App.Desc.superfetation(slave, descType));
	}

	function massivelyPregnantOvergrownBaby1() {
		r.push(`<span class="pink">massively pregnant</span> with`);
		overgrownBaby1();
	}

	function overgrownBaby1() {
		if (slave.pregType === 1) {
			r.push(`a single overgrown baby.`);
		} else if (slave.pregType >= 10) {
			r.push(`${slave.pregType} overgrown babies.`);
		} else {
			r.push(`overgrown ${pregNumberName(slave.pregType, 2)}.`);
		}
		r.push(`${He} is horrifically overdue; ${he} should have given birth a staggering ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
	}

	function massivelyPregnantOvergrownBaby2() {
		r.push(`<span class="pink">massively pregnant</span> with`);
		overGrownBaby2();
	}

	function overGrownBaby2() {
		if (slave.pregType === 1) {
			r.push(`a single overgrown baby.`);
		} else if (slave.pregType >= 10) {
			r.push(`${slave.pregType} overgrown babies.`);
		} else {
			r.push(`overgrown ${pregNumberName(slave.pregType, 2)}.`);
		}
		r.push(`${He} is extremely overdue; ${he} should have given birth ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
	}

	function massivelyPregnantOvergrownBaby3() {
		r.push(`<span class="pink">massively pregnant</span> with`);
		overgrownBaby3();
	}

	function overgrownBaby3() {
		if (slave.pregType === 1) {
			r.push(`a single overgrown baby.`);
		} else if (slave.pregType >= 10) {
			r.push(`${slave.pregType} overgrown babies.`);
		} else {
			r.push(`overgrown ${pregNumberName(slave.pregType, 2)}.`);
		}
		r.push(`${He} is very overdue; ${he} should have given birth ${(slave.preg - slave.pregData.normalBirth)} weeks ago.`);
	}

	function massivelyPregnantManyChildren() {
		r.push(`<span class="pink">massively pregnant</span> with`);
		manyChildren();
	}

	function manyChildren() {
		if (slave.pregType >= 50) {
			r.push(`an absurd number of children.`);
		} else if (slave.pregType >= 30) {
			r.push(`far too many children.`);
		} else if (slave.pregType >= 10) {
			r.push(`${slave.pregType} children.`);
		} else {
			r.push(`${pregNumberName(slave.pregType, 2)}.`);
		}
	}
};
