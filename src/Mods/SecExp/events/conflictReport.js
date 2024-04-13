App.Events.conflictReport = function() {
	let r = [];
	const commanderIsPC = V.SecExp.war.commander === "PC";
	const allKilled = V.SecExp.war.attacker.losses === V.SecExp.war.attacker.troops;
	const result = V.SecExp.war.result;
	const hasLosses = V.SecExp.war.losses > 0;

	const inBattle = V.SecExp.war.type.includes("Attack");
	const isMajorBattle = inBattle && V.SecExp.war.type.includes("Major");
	const majorBattleMod = !isMajorBattle ? 1 : 2;

	const inRebellion = V.SecExp.war.type.includes("Rebellion");
	const slaveRebellion = V.SecExp.war.type.includes("Slave");
	const type = inBattle ? "battles" : "rebellions";

	// Battles
	let loot = 0;
	let captives;
	const end = (V.SecExp.battles.victoryStreak >= 2 || V.SecExp.battles.lossStreak >= 2) ? `,` : `.`;
	let lostSlaves; // Rebellions

	V.SecExp.war.attacker.losses = Math.trunc(V.SecExp.war.attacker.losses);
	if (V.SecExp.war.attacker.losses > V.SecExp.war.attacker.troops) {
		V.SecExp.war.attacker.losses = V.SecExp.war.attacker.troops;
	}
	V.SecExp.core.totalKills += V.SecExp.war.attacker.losses;
	V.SecExp.war.losses = Math.trunc(V.SecExp.war.losses);
	if (isMajorBattle) {
		V.SecExp.battles.major++;
	}

	const node = new DocumentFragment();
	V.SecExp[type][result > 0 ? 'victories' : 'losses']++;
	if ([3, -3, 2, -2].includes(result)) {
		if (inBattle && result === 3) {
			V.SecExp.battles.lossStreak = 0;
			V.SecExp.battles.victoryStreak++;
		} else if (inBattle && result === -3) {
			V.SecExp.battles.lossStreak++;
			V.SecExp.battles.victoryStreak = 0;
		}
		App.UI.DOM.appendNewElement("h1", node, `${result === 2 || result === -2 ? 'Partial ' : ''}${result > 0 ? 'Victory' : 'Defeat'}!`, ["strong"]);
	} else if (result === -1) {
		App.UI.DOM.appendNewElement("h1", node, `We surrendered`, ["strong"]);
	} else if (result === 0 || result === 1) { // Battles only
		App.UI.DOM.makeElement("h1", `${result > 0 ? 'Successful' : 'Failed'} bribery!`, ["strong"]);
	}
	App.UI.DOM.appendNewElement("hr", node);

	r.push(`Today, ${asDateString(V.week, random(0, 7))}, our arcology was`);
	if (inBattle) {
		r.push(`attacked by`);
		if (V.SecExp.war.attacker.type === "raiders") {
			r.push(`a band of wild raiders,`);
		} else if (V.SecExp.war.attacker.type === "free city") {
			r.push(`a contingent of mercenaries hired by a competing free city,`);
		} else if (V.SecExp.war.attacker.type === "freedom fighters") {
			r.push(`a group of freedom fighters bent on the destruction of the institution of slavery,`);
		} else if (V.SecExp.war.attacker.type === "old world") {
			r.push(`an old world nation boasting a misplaced sense of superiority,`);
		}
		r.push(`${num(Math.trunc(V.SecExp.war.attacker.troops))} men strong.`);
	} else {
		r.push(`inflamed by the fires of rebellion. ${num(Math.trunc(V.SecExp.war.attacker.troops))} rebels from all over the structure dared rise up`);
		if (slaveRebellion) {
			r.push(`against their owners and conquer their freedom through blood.`);
		} else {
			r.push(`to dethrone their arcology owner.`);
		}
	}

	if (![-1, 0, 1].includes(result)) {
		r.push(`Our defense forces, ${num(App.Mods.SecExp.battle.troopCount())} strong,`);
		if (inBattle) {
			r.push(`clashed with them`);
			if (V.SecExp.war.terrain === "urban") {
				r.push(`in the streets of the old world city surrounding the arcology,`);
			} else if (V.SecExp.war.terrain === "rural") {
				r.push(`in the rural land surrounding the free city,`);
			} else if (V.SecExp.war.terrain === "hills") {
				r.push(`on the hills around the free city,`);
			} else if (V.SecExp.war.terrain === "coast") {
				r.push(`along the coast just outside the free city,`);
			} else if (V.SecExp.war.terrain === "outskirts") {
				r.push(`just against the walls of the arcology,`);
			} else if (V.SecExp.war.terrain === "mountains") {
				r.push(`in the mountains overlooking the arcology,`);
			} else if (V.SecExp.war.terrain === "wasteland") {
				r.push(`in the wastelands outside the free city territory,`);
			} else if (V.SecExp.war.terrain === "international waters") {
				r.push(`in the water surrounding the free city,`);
			} else if (["a sunken ship", "an underwater cave"].includes(V.SecExp.war.terrain)) {
				r.push(`in <strong>${V.SecExp.war.terrain}</strong> near the free city`);
			}
		} else {
			r.push(`fought with them street by street`);
		}

		if (allKilled) {
			r.push(`completely annihilating their troops, while sustaining`);
		} else {
			r.push(`inflicting ${V.SecExp.war.attacker.losses} casualties, while sustaining`);
		}
		if (V.SecExp.war.losses > 1) {
			r.push(`${num(Math.trunc(V.SecExp.war.losses))} casualties`);
		} else if (V.SecExp.war.losses > 0) {
			r.push(`a casualty`);
		} else {
			r.push(`zero casualties`);
		}
		r.push(`${allKilled ? '' : 'themselves'}.`);
		if (inRebellion) {
			App.Mods.SecExp.slavesDamaged(V.SecExp.war.attacker.losses);
		}

		if (result === 3) {
			if (V.SecExp.war.turns <= 5) {
				r.push(`The fight was quick and one sided, our men easily stopped the`);
				if (inBattle) {
					if (V.SecExp.war.attacker.type === "raiders") {
						r.push(`disorganized horde's futile attempt at raiding your arcology${end}`);
					} else if (V.SecExp.war.attacker.type === "free city") {
						r.push(`mercenaries dead in their tracks${end}`);
					} else if (V.SecExp.war.attacker.type === "freedom fighters") {
						r.push(`freedom fighters dead in their tracks${end}`);
					} else if (V.SecExp.war.attacker.type === "old world") {
						r.push(`old world soldiers dead in their tracks${end}`);
					}
				} else {
					r.push(`disorganized revolt in a few well aimed assaults.`);
				}
			} else if (V.SecExp.war.turns <= 7) {
				r.push(`The fight was hard, but in the end our men stopped the`);
				if (inBattle) {
					if (V.SecExp.war.attacker.type === "raiders") {
						r.push(`disorganized horde attempt at raiding your arcology${end}`);
					} else if (V.SecExp.war.attacker.type === "free city") {
						r.push(`slavers attempt at weakening your arcology${end}`);
					} else if (V.SecExp.war.attacker.type === "freedom fighters") {
						r.push(`fighters attack${end}`);
					} else if (V.SecExp.war.attacker.type === "old world") {
						r.push(`soldiers of the old world${end}`);
					}
				} else {
					r.push(`disorganized revolt with several well aimed assaults.`);
				}
			} else {
				r.push(`The fight was long and hard, but our men managed to stop the`);
				if (inBattle) {
					if (V.SecExp.war.attacker.type === "raiders") {
						r.push(`horde raiding party${end}`);
					} else if (V.SecExp.war.attacker.type === "free city") {
						r.push(`free city mercenaries${end}`);
					} else if (V.SecExp.war.attacker.type === "freedom fighters") {
						r.push(`freedom fighters${end}`);
					} else if (V.SecExp.war.attacker.type === "old world") {
						r.push(`old world soldiers${end}`);
					}
				} else {
					r.push(`revolt before it could accumulate momentum.`);
				}
			}
			if (inBattle && V.SecExp.battles.victoryStreak >= 2) {
				r.push(`adding another victory to the growing list of our military's successes.`);
			} else if (inBattle && V.SecExp.battles.lossStreak >= 2) {
				r.push(`finally putting an end to a series of unfortunate defeats.`);
			}
		} else if (result === -3) {
			if (V.SecExp.war.turns <= 5) {
				r.push(`The fight was quick and one sided, our men were easily crushed by the`);
				if (inBattle) {
					if (V.SecExp.war.attacker.type === "raiders") {
						r.push(`barbaric horde of raiders${end}`);
					} else if (V.SecExp.war.attacker.type === "free city") {
						r.push(`consumed mercenary veterans sent against us${end}`);
					} else if (V.SecExp.war.attacker.type === "freedom fighters") {
						r.push(`fanatical fury of the freedom fighters${end}`);
					} else if (V.SecExp.war.attacker.type === "old world") {
						r.push(`discipline of the old world armies${end}`);
					}
				} else {
					r.push(`furious charge of the rebels.`);
				}
			} else if (V.SecExp.war.turns <= 7) {
				r.push(`The fight was hard and in the end the`);
				if (inBattle) {
					if (V.SecExp.war.attacker.type === "raiders") {
						r.push(`bandits proved too much to handle for our men${end}`);
					} else if (V.SecExp.war.attacker.type === "free city") {
						r.push(`slavers proved too much to handle for our men${end}`);
					} else if (V.SecExp.war.attacker.type === "freedom fighters") {
						r.push(`freedom fighters proved too much to handle for our men${end}`);
					} else if (V.SecExp.war.attacker.type === "old world") {
						r.push(`old world proved too much to handle for our men${end}`);
					}
				} else {
					r.push(`rebels proved too much to handle for our men.`);
				}
			} else {
				r.push(`The fight was long and hard, but despite their bravery the`);
				if (inBattle) {
					if (V.SecExp.war.attacker.type === "raiders") {
						r.push(`horde proved too much for our men${end}`);
					} else if (V.SecExp.war.attacker.type === "free city") {
						r.push(`mercenary slavers proved too much for our men${end}`);
					} else if (V.SecExp.war.attacker.type === "freedom fighters") {
						r.push(`freedom fighters fury proved too much for our men${end}`);
					} else if (V.SecExp.war.attacker.type === "old world") {
						r.push(`old world troops proved too much for our men${end}`);
					}
				} else {
					r.push(`rebels proved too much for our men.`);
				}
			}
			if (inBattle && V.SecExp.battles.victoryStreak >= 2) {
				r.push(`so interrupting a long series of military successes.`);
			} else if (inBattle && V.SecExp.battles.lossStreak >= 2) {
				r.push(`confirming the long list of recent failures our armed forces collected.`);
			}
		} else if (result === 2) {
			r.push(`The fight was long and hard, but in the end our men managed to`);
			if (inBattle) {
				r.push(`repel the`);
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`raiders, though not without difficulty.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`mercenaries, though not without difficulty.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`freedom fighters, though not without difficulty.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`old world soldiers, though not without difficulty.`);
				}
			} else {
				r.push(`stop the revolt, though not without difficulty.`);
			}
		} else if (result === -2) {
			r.push(`The fight was long and hard. Our men in the end had to yield to the`);
			if (inBattle) {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`horde of raiders, which was fortunately unable to capitalize on their victory.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`slavers, which were fortunately unable to capitalize on their victory.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`freedom fighters, which were fortunately unable to capitalize on their victory.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`old world soldiers, which were fortunately unable to capitalize on their victory.`);
				}
			} else {
				r.push(`rebels, which were fortunately unable to capitalize on their victory.`);
			}
		}

		if (inRebellion && V.SecExp.rebellions.sfArmor) {
			r.push(`More units were able to survive thanks to wearing ${V.SF.Lower}'s combat armor suits.`);
		}
		App.Events.addParagraph(node, r);
		r = [];

		// Effects
		if (result === 3 || result === 2) {
			r.push(` Thanks to your victory, your `, App.UI.DOM.makeElement("span", `reputation`, ["green"]), ` and `, App.UI.DOM.makeElement("span", `authority`, ["darkviolet"]), `${result === 2 ? 'slightly' : ''} increased.`);
			if (inRebellion) {
				if (slaveRebellion) {
					App.UI.DOM.appendNewElement("div", node, `Many of the rebelling slaves were recaptured and punished.`);
				} else {
					App.UI.DOM.appendNewElement("div", node, `Many of the rebelling citizens were captured and punished, many others enslaved.`);
				}
				App.UI.DOM.appendNewElement("div", node, `The instigators were executed one after another in a public trial that lasted for almost three days.`);
				if (slaveRebellion) {
					V.NPCSlaves -= random(10, 30);
				} else {
					V.lowerClass -= random(10, 30);
				}
				repX((result === 3 ? random(800, 1000) : random(600, 180)), "war");
				App.Mods.SecExp.authorityX(result === 3 ? random(800, 1000) : random(600, 800));
			} else {
				if (result === 3) {
					r.push("You were also able to capture");
					if (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses <= 50) {
						r.push(`a small amount of attackers,`);
						captives = (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses) * 0.1 * random(1, 3);
					} else if (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses <= 100) {
						r.push(`an healthy group of attackers,`);
						captives = (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses) * 0.1 * random(1, 3);
					} else if (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses <= 150) {
						r.push(`a big group of attackers,`);
						captives = (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses) * 0.1 * random(1, 3);
					} else if (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses <= 200) {
						r.push(`a huge group of attackers,`);
						captives = (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses) * 0.1 * random(1, 3);
					} else if (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses > 200) {
						r.push(`a great amount of attackers,`);
						captives = (V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses) * 0.1 * random(1, 3);
					}
					r.push(`and some of their equipment,`);
				} else {
					App.UI.DOM.appendNewElement("div", node, " Our men were not able to capture any combatants, however some equipment was seized during the enemy's hasty retreat,");
				}
				if (V.SecExp.war.attacker.type === "raiders") {
					repX((result === 3 ? 4000 : 1000) * majorBattleMod, "war");
					App.Mods.SecExp.authorityX((result === 3 ? 800 : 200) * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "free city") {
					repX((result === 3 ? 6000 : 1500) * majorBattleMod, "war");
					App.Mods.SecExp.authorityX((result === 3 ? 1200 : 300) * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					repX((result === 3 ? 7500 : 2000) * majorBattleMod, "war");
					App.Mods.SecExp.authorityX((result === 3 ? 1500 : 450) * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "old world") {
					repX((result === 3 ? 8000 : 2100) * majorBattleMod, "war");
					App.Mods.SecExp.authorityX((result === 3 ? 1600 : 500) * majorBattleMod);
				}
				r.push(`which once sold produced`);
				if (V.SecExp.war.attacker.equip === 0) {
					r.push(`<span class="yellowgreen">a ${result === 3 ? 'small amount' : 'bit'} of cash.</span>`);
					loot += (result === 3 ? 1000 : 500) * majorBattleMod;
				} else if (V.SecExp.war.attacker.equip === 1) {
					r.push(`<span class="yellowgreen">a ${result === 3 ? 'moderate' : 'small'} amount of cash.</span>`);
					loot += (result === 3 ? 5000 : 2500) * majorBattleMod;
				} else if (V.SecExp.war.attacker.equip === 2) {
					r.push(`<span class="yellowgreen">a ${result === 3 ? 'good' : 'moderate'} amount of cash.</span>`);
					loot += (result === 3 ? 10000 : 5000) * majorBattleMod;
				} else if (V.SecExp.war.attacker.equip === 3) {
					r.push(`<span class="yellowgreen">a ${result === 3 ? 'great' : 'good'} amount of cash.</span>`);
					loot += (result === 3 ? 15000 : 7500) * majorBattleMod;
				} else if (V.SecExp.war.attacker.equip === 4) {
					r.push(`<span class="yellowgreen">${result === 3 ? 'wealth worthy of the mightiest warlord' : 'a great amount of cash'}.</span>`);
					loot += (result === 3 ? 20000 : 10000) * majorBattleMod;
				}
				if (V.SecExp.edicts.defense.privilege.mercSoldier === 1 && App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					r.push(`Part of the loot is distributed to your mercenaries.`);
					if (result === 3) {
						captives = Math.trunc(captives * 0.6);
					}
					loot = Math.trunc(loot * 0.6);
				}
				cashX(loot, "war");
				App.Events.addParagraph(node, r);
				r = [];
				if (result === 3) {
					r.push(`Damage to the city was <span class="red">limited,</span> it won't take much to rebuild. Very few citizens or slaves were involved in the fight and even fewer met their end, safeguarding the prosperity of the arcology.`);
				} else {
					r.push(`Damage to the infrastructure was <span class="yellow">virtually non-existent,</span> costing only pocket cash to bring the structure back to normal. The inhabitants as well reported little to no injuries, because of this the prosperity of the arcology did not suffer.`);
				}
				r.push(`${IncreasePCSkills('engineering', 0.1)}`);
				cashX(forceNeg((result === 3 ? 1000 : 2000) * majorBattleMod), "war");
				if (result === 3) {
					if (V.SecExp.battles.victoryStreak >= 3) {
						r.push(`It seems your victories over the constant threats directed your way is having <span class="green">a positive effect on the prosperity of the arcology,</span> due to the security your leadership affords.`);
						V.arcologies[0].prosperity += 5 * majorBattleMod;
					}
				} else {
					V.lowerClass -= random(10) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(20) * majorBattleMod);
				}
				App.Events.addParagraph(node, r);
				r = [];
			}
			if (V.maximumRep < 30000) {
				V.maximumRep += (result === 3 ? 1000 : 500);
			}
		} else if (result === -3 || result === -2) {
			r.push(` Thanks to your defeat, your `, App.UI.DOM.makeElement("span", `reputation`, ["red"]), ` and `, App.UI.DOM.makeElement("span", `authority`, ["red"]), ` decreased.`);
			if (inRebellion) {
				if (slaveRebellion) {
					App.UI.DOM.appendNewElement("div", node, `After the battle most of the rebelling slaves managed to escape, while others remained in the arcology for days looting and hunting their former masters. The arcology will bear the scars of this day for a long time.`);
					V.lowerClass -= (result === -3 ? random(50, 100) : random(40, 80));
					lostSlaves = Math.trunc((V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses) * 0.8);
					App.Mods.SecExp.slavesDamaged(lostSlaves);
				} else {
					App.UI.DOM.appendNewElement("div", node, `After the battle most of the rebelling citizens remained in the arcology for days looting and hunting their former arcology. We will bear the scars of this day for a long time.`);
					V.lowerClass -= Math.trunc((V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses) * 0.6);
				}
				repX((result === -3 ? random(-800, -1000) : random(-600, -800)), "war");
				App.Mods.SecExp.authorityX(result === -3 ? random(-800, -1000) : random(-600, -800));
			} else {
				if (result === -3) {
					App.UI.DOM.appendNewElement("div", node, " Obviously your troops were not able to capture anyone or anything.");

					r = [];
					r.push(`In the raiding following the battle <span class="red">the arcology sustained heavy damage,</span> which will cost quite the amount of cash to fix. Reports of <span class="red">citizens or slaves killed or missing</span> flood your office for a few days following the defeat.`);
					if (V.SecExp.battles.lossStreak >= 3) {
						r.push(`This only confirms the fears of many, <span class="red">your arcology is not safe</span> and it is clear their business will be better somewhere else.`);
						V.arcologies[0].prosperity -= 5 * majorBattleMod;
					}
				} else {
					r.push(`It was a close defeat, but nonetheless your <span class="red">reputation</span> and <span class="red">authority</span> slightly decreased.`);
					r.push("Your troops were not able to capture anyone or anything.");
					r = [];
					r.push(`The enemy did not have the strength to raid the arcology for long, still <span class="red">the arcology sustained some damage,</span> which will cost a moderate amount of cash to fix. Some citizens and slaves found themselves on the wrong end of a gun and met their demise.`);
					r.push(`Some business sustained heavy damage, slightly impacting the arcology's prosperity.`);
				}
				r.push(`${IncreasePCSkills('engineering', 0.1)}`);
				App.Events.addParagraph(node, r);
				r = [];
				if (V.SecExp.war.attacker.type === "raiders") {
					repX(forceNeg((result === -3 ? 400 : 40) * majorBattleMod), "war");
					App.Mods.SecExp.authorityX((result === -3 ? -400 : -40) * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "free city") {
					repX(forceNeg((result === -3 ? 600 : 60) * majorBattleMod), "war");
					App.Mods.SecExp.authorityX((result === -3 ? -600 : -60) * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					repX(forceNeg((result === -3 ? 750 : 75) * majorBattleMod), "war");
					App.Mods.SecExp.authorityX((result === -3 ? -750 : -75) * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "old world") {
					repX(forceNeg((result === -3 ? 800 : 80) * majorBattleMod), "war");
					App.Mods.SecExp.authorityX((result === -3 ? -800 : -80) * majorBattleMod);
				}

				cashX(forceNeg((result === -3 ? 5000 : 3000) * majorBattleMod), "war");
				if (V.week <= 30) {
					V.lowerClass -= random(result === -3 ? 100 : 50) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(result === -3 ? 150 : 75) * majorBattleMod);
					V.arcologies[0].prosperity -= random(result === -3 ? 5 : 2) * majorBattleMod;
				} else if (V.week <= 60) {
					V.lowerClass -= random(result === -3 ? 120 : 60) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(result === -3 ? 170 : 85) * majorBattleMod);
					V.arcologies[0].prosperity -= random(result === -3 ? 10 : 5) * majorBattleMod;
				} else if (V.week <= 90) {
					V.lowerClass -= random(result === -3 ? 140 : 70) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(result === -3 ? 190 : 95) * majorBattleMod);
					V.arcologies[0].prosperity -= random(result === -3 ? 15 : 7) * majorBattleMod;
				} else if (V.week <= 120) {
					V.lowerClass -= random(result === -3 ? 160 : 80) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(result === -3 ? 210 : 105) * majorBattleMod);
					V.arcologies[0].prosperity -= random(result === -3 ? 20 : 10) * majorBattleMod;
				} else {
					V.lowerClass -= random(result === -3 ? 180 : 90) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(result === -3 ? 230 : 115) * majorBattleMod);
					V.arcologies[0].prosperity -= random(result === -3 ? 25 : 12) * majorBattleMod;
				}
			}
		}

		if (inRebellion) {
			if (V.SecExp.war.engageRule === 0) {
				r.push(`Since you ordered your troops to limit their weaponry to low caliber or nonlethal, the arcology reported only`);
				r.push(`<span class="red">minor damage.</span>`);
				r.push(`Most citizens and non involved slaves remained unharmed, though some casualties between the civilians were inevitable.`);
				r.push(`A few businesses were looted and burned, but the damage was pretty limited.`);
				r.push(setRepairTime("arc", 3, 1500));
				if (V.week <= 30) {
					arcologyEffects(40, 65, 2);
				} else if (V.week <= 60) {
					arcologyEffects(50, 75, 5);
				} else if (V.week <= 90) {
					arcologyEffects(60, 85, 7);
				} else if (V.week <= 120) {
					arcologyEffects(70, 95, 10);
				} else {
					arcologyEffects(80, 105, 12);
				}
			} else if (V.SecExp.war.engageRule === 1) {
				r.push(`You ordered your troops to limit their weaponry to non-heavy, non-explosive, because of this the arcology reported`);
				r.push(`<span class="red">moderate damage.</span>`);
				r.push(`Most citizens and non involved slaves remained unharmed or only lightly wounded, but many others did not make it. Unfortunately casualties between the civilians were inevitable.`);
				r.push(`A few businesses were looted and burned, but the damage was pretty limited.`);
				r.push(setRepairTime("arc", 5, 2000));
				if (V.week <= 30) {
					arcologyEffects(60, 85, 4);
				} else if (V.week <= 60) {
					arcologyEffects(70, 95, 7);
				} else if (V.week <= 90) {
					arcologyEffects(80, 105, 9);
				} else if (V.week <= 120) {
					arcologyEffects(90, 115, 12);
				} else {
					arcologyEffects(100, 125, 14);
				}
			} else if (V.SecExp.war.engageRule === 2) {
				r.push(`Since you did not apply any restriction on the weapons your forces should use, the arcology reported`);
				r.push(`<span class="red">heavy damage.</span>`);
				r.push(`Many citizens and uninvolved slaves are reported killed or missing. Casualties between the civilians were inevitable.`);
				r.push(`Many businesses were damaged during the battle either by the fight itself, by fires which spread unchecked for hours or by looters.`);
				r.push(setRepairTime("arc", 7, 3000));
				if (V.week <= 30) {
					arcologyEffects(100, 150, 5);
				} else if (V.week <= 60) {
					arcologyEffects(120, 170, 10);
				} else if (V.week <= 90) {
					arcologyEffects(140, 190, 15);
				} else if (V.week <= 120) {
					arcologyEffects(160, 210, 20);
				} else {
					arcologyEffects(180, 230, 25);
				}
			} else {
				r.push(`Thanks to the advance riot control weaponry developed by your experts, the rebels were mostly subdued or killed with`);
				r.push(`<span class="yellow">little to no collateral damage to the arcology</span> and its inhabitants.`);
				r.push(`A few businesses were looted, but the damage was very limited.`);
				r.push(setRepairTime("arc", 2, 1000));
				if (V.week <= 30) {
					arcologyEffects(20, 45, 2);
				} else if (V.week <= 60) {
					arcologyEffects(30, 55, 4);
				} else if (V.week <= 90) {
					arcologyEffects(40, 65, 6);
				} else if (V.week <= 120) {
					arcologyEffects(50, 75, 8);
				} else {
					arcologyEffects(60, 85, 10);
				}
			}
			App.Events.addParagraph(node, r);
			r = [];

			if (!V.SecExp.war.reactorDefense) {
				if (random(1, 100) <= (75 - ((V.SecExp.buildings.riotCenter ? V.SecExp.buildings.riotCenter.fort.reactor : 0) * 25))) {
					r.push(`Unfortunately during the fighting a group of slaves infiltrated the reactor complex and sabotaged it, causing massive power fluctuations and blackouts.`);
					r.push(`<span class="red">time and money to repair the damage.</span>`);
					r.push(setRepairTime("reactor", (V.SecExp.buildings.riotCenter ? V.SecExp.buildings.riotCenter.fort.reactor : 0)));
				} else {
					r.push(`While the reactor was left defenseless without a garrison, there was no attempt at sabotage. Let's hope we'll always be this lucky.`);
				}
			} else {
				r.push(`The garrison assigned to the reactor protected it from the multiple sabotage attempts carried out by the rebels.`);
			}
			App.Events.addParagraph(node, r);
			r = [];

			if (!V.SecExp.war.waterwayDefense) {
				if (random(1, 100) <= (75 - ((V.SecExp.buildings.riotCenter ? V.SecExp.buildings.riotCenter.fort.waterway : 0) * 25))) {
					r.push(`Unfortunately during the fighting a group of slaves infiltrated the water management complex and sabotaged it, causing huge water leaks throughout the arcology and severely limiting the water supply.`);
					r.push(`<span class="red">time and money to repair the damage.</span>`);
					r.push(setRepairTime("waterway", (V.SecExp.buildings.riotCenter ? V.SecExp.buildings.riotCenter.fort.waterway : 0)));
				} else {
					r.push(`While the water management complex was left defenseless without a garrison, there was no attempt at sabotage. Let's hope we'll always be this lucky.`);
				}
			} else {
				r.push(`The garrison assigned to the water management complex protected it from the sabotage attempt of the rebels.`);
			}
			App.Events.addParagraph(node, r);
			r = [];

			if (!V.SecExp.war.assistantDefense) {
				if (random(1, 100) <= (75 - ((V.SecExp.buildings.riotCenter ? V.SecExp.buildings.riotCenter.fort.assistant : 0) * 25))) {
					r.push(`Unfortunately during the fighting a group of slaves infiltrated the facility housing ${V.assistant.name}'s mainframe and sabotaged it. Without its AI, the arcology will be next to impossible to manage.`);
					r.push(`<span class="red">time and money to repair the damage.</span>`);
					r.push(setRepairTime("assistant", (V.SecExp.buildings.riotCenter ? V.SecExp.buildings.riotCenter.fort.assistant : 0)));
				} else {
					r.push(`While the ${V.assistant.name}'s mainframe was left defenseless without a garrison, there was no attempt at sabotage. Let's hope we'll always be this lucky.`);
				}
			} else {
				r.push(`The garrison assigned to the facility housing ${V.assistant.name}'s mainframe prevented any sabotage attempt.`);
			}
			App.Events.addParagraph(node, r);
			r = [];

			if (V.SecExp.war.penthouseDefense && V.BodyguardID !== 0) {
				r.push(`The garrison assigned to the penthouse together with your loyal Bodyguard stopped all assaults against your penthouse with ease.`);
			} else {
				if (random(1, 100) <= 75) {
					r.push(`During the fighting a group of slaves assaulted the penthouse.`);
					if (S.Bodyguard) {
						r.push(`Your Bodyguard, ${S.Bodyguard.slaveName}, stood strong against the furious attack.`);
					} else if (V.SecExp.war.penthouseDefense) {
						r.push(`The garrison stood strong against the furious attack.`);
					} else {
						r.push(`Isolated and alone, you stood strong against the furious attack.`);
					}
					["PC", "Concubine", "Bodyguard"].forEach(c => r.push(checkWoundStatus(c)));
					r.push(`<span class="red">The damage to the structure will be</span> costly to repair.`);
					r.push(IncreasePCSkills('engineering', 0.1));
					cashX(-2000, "war");
				} else {
					if (!V.SecExp.war.penthouseDefense) {
						r.push(`While the penthouse was left without a sizable garrison, there was no dangerous assault against it. Let's hope we'll always be this lucky.`);
					} else {
						r.push(`There was no sizable assault against the penthouse. Let's hope we'll always be this lucky.`);
					}
				}
			}
			App.Events.addParagraph(node, r);
			r = [];
		}
		V.lowerClass = Math.max(V.lowerClass, 0);
		V.NPCSlaves = Math.max(V.NPCSlaves, 0);

		if (inBattle) { // tactics
			App.Events.addParagraph(node, App.Mods.SecExp.commanderEffectiveness("report"));
			r = [];

			r.push(`${commanderIsPC ? 'You' : 'Your commander'} chose to employ`);
			if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
				r.push(`"bait and bleed" tactics or relying on quick attacks and harassment to tire and wound the enemy until their surrender.`);
			} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
				r.push(`"guerrilla" tactics or relying on stealth, terrain knowledge and subterfuge to undermine and ultimately destroy the enemy.`);
			} else if (V.SecExp.war.chosenTactic === "Choke Points") {
				r.push(`"choke points" tactics or the extensive use of fortified or highly defensive positions to slow down and eventually stop the enemy.`);
			} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
				r.push(`"interior lines" tactics or exploiting the defender's shorter front to quickly disengage and concentrate troops when and where needed.`);
			} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
				r.push(`"pincer maneuver" tactics or attempting to encircle the enemy by faking a collapsing center front.`);
			} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
				r.push(`"defense in depth" tactics or relying on mobility to disengage and exploit overextended enemy troops by attacking their freshly exposed flanks.`);
			} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
				r.push(`"blitzkrieg" tactics or shattering the enemy's front-line with a violent, concentrated armored assault.`);
			} else if (V.SecExp.war.chosenTactic === "Human Wave") {
				r.push(`"human wave" tactics or overwhelming the enemy's army with a massive infantry assault.`);
			}
			if (V.SecExp.war.terrain === "urban") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`The urban terrain synergized well with bait and bleed tactics, slowly chipping away at the enemy's forces from the safety of the narrow streets and empty buildings.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`The urban terrain synergized well with guerrilla tactics, eroding your enemy's determination from the safety of the narrow streets and empty buildings.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`The urban environment offers many opportunities to hunker down and stop the momentum of the enemy's assault while keeping your soldiers in relative safety.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`While the urban environment offers many highly defensive position, it does restrict movement and with it the advantages of exploiting interior lines.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`The urban terrain does not allow for wide maneuvers, the attempts of your forces to encircle the attackers are mostly unsuccessful.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`While the urban environment offers many defensive positions, it limits mobility, limiting the advantages of using a defense in depth tactic.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The urban terrain is difficult to traverse, making your troops attempt at a lightning strike unsuccessful.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The urban terrain offers great advantages to the defender, your men find themselves in great disadvantage while mass assaulting the enemy's position.`);
				}
			} else if (V.SecExp.war.terrain === "rural") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`The open terrain of rural lands does not lend itself well to bait and bleed tactics, making it harder for your men to achieve tactical superiority.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`The open terrain of rural lands does not offer many hiding spots, making it harder for your men to perform guerrilla actions effectively.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`The open terrain of rural lands does not offer many natural choke points, making it hard for your troops to funnel the enemy towards highly defended positions.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`The open terrain allows your men to easily exploit the superior mobility of the defender, making excellent use of interior lines to strike where it hurts.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`The open terrain affords your men great mobility, allowing them to easily position themselves for envelopment.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`The open terrain affords your men great mobility, allowing them to exploit overextended assaults and concentrate where and when it matters.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The open terrain affords your men great mobility, making it easier to accomplish concentrated lightning strikes.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The open terrain affords your men great mobility, making it easier to overwhelm the enemy with mass assaults.`);
				}
			} else if (V.SecExp.war.terrain === "hills") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`While the hills offer some protection, they also make it harder to maneuver; bait and bleed tactics will not be 100% effective here.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`The hills offer protection to both your troops and your enemy's, making it harder for your men to accomplish guerrilla attacks effectively.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`While not as defensible as mountains, hills offer numerous opportunities to funnel the enemy towards highly defensible choke points.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`The limited mobility on hills hampers the capability of your troops to exploit the defender's greater mobility afforded by interior lines.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`Limited mobility due to the hills is a double edged sword, affording your men a decent shot at encirclement.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`The limited mobility on hills hampers the capability of your troops to use elastic defense tactics.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The limited mobility on hills hampers the capability of your troops to organize lightning strikes.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The defensibility of hills makes it harder to accomplish victory through mass assaults.`);
				}
			} else if (V.SecExp.war.terrain === "coast") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`On the coast there's little space and protection to effectively employ bait and bleed tactics.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`On the coast there's little space and protection to effectively employ guerrilla tactics.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`Amphibious attacks are difficult in the best of situations; the defender has a very easy time funneling the enemy towards their key defensive positions.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`While in an amphibious landing mobility is not the defender's best weapon, exploiting interior lines still affords your troops some advantages.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`Attempting to encircle a landing party is not the best course of action, but not the worst either.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`In an amphibious assault it's very easy for the enemy to overextend, making defense in depth tactics quite effective.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The rough, restricted terrain does not lend itself well to lightning strikes, but the precarious position of the enemy still gives your mobile troops tactical superiority.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The rough, restricted terrain does not lend itself well to mass assaults, but the precarious position of the enemy still gives your troops tactical superiority.`);
				}
			} else if (V.SecExp.war.terrain === "outskirts") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`Fighting just beneath the walls of the arcology does not allow for the dynamic redeployment of troops bait and bleed tactics would require.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`Fighting just beneath the walls of the arcology does not allow for the dynamic redeployment of troops guerrilla tactics would require.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`The imposing structure of the arcology itself provides plenty of opportunities to create fortified choke points from which to shatter the enemy assault.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`While the presence of the arcology near the battlefield is an advantage, it does limit maneuverability, lowering overall effectiveness of interior lines tactics.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`While the presence of the arcology near the battlefield is an advantage, it does limit maneuverability, lowering the chances of making an effective encirclement.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`Having the arcology near the battlefield means there are limited available maneuvers to your troops, who still needs to defend the structure, making defense in depth tactics not as effective.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`While an assault may save the arcology from getting involved at all, having the imposing structure so near does limit maneuverability and so the impetus of the lightning strike.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`While an attack may save the arcology from getting involved at all, having the imposing structure so near does limit maneuverability and so the impetus of the mass assault.`);
				}
			} else if (V.SecExp.war.terrain === "mountains") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`While the mountains offer great protection, they also limit maneuverability; bait and bleed tactics will not be quite as effective here.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`The mountains offer many excellent hiding spots and defensive positions, making guerrilla tactics very effective.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`The mountains offer plenty of opportunity to build strong defensive positions from which to shatter the enemy's assault.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`While the rough terrain complicates maneuvers, the defensive advantages offered by the mountains offsets its negative impact.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`The rough terrain complicates maneuvers; your men have a really hard time pulling off an effective encirclement in this environment.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`While mobility is limited, defensive positions are plentiful; your men are not able to fully exploit overextended assaults, but are able to better resist them.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The rough terrain complicates maneuvers; your men have a really hard time pulling off an effective lightning strike in this environment.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The rough terrain complicates maneuvers; your men have a really hard time pulling off an effective mass assault in this environment.`);
				}
			} else if (V.SecExp.war.terrain === "wasteland") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`While the wastelands are mostly open terrain, there are enough hiding spots to make bait and bleed tactics work well enough.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`While the wastelands are mostly open terrain, there are enough hiding spots to make guerrilla tactics work well enough.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`The wastelands are mostly open terrain; your men have a difficult time setting up effective fortified positions.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`The wastelands, while rough, are mostly open terrain, where your men can exploit to the maximum the superior mobility of the defender.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`The wastelands, while rough, are mostly open terrain; your men can set up an effective encirclement here.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`The wastelands, while rough, are mostly open terrain, allowing your men to liberally maneuver to exploit overextended enemies.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The wastelands, while rough, are mostly open terrain, where your men are able to mount effective lightning strikes.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The wastelands, while rough, are mostly open terrain, where your men are able to mount effective mass assaults.`);
				}
			} else if (V.SecExp.war.terrain === "international waters") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`The open terrain of international waters does not lend itself well to bait and bleed tactics, making it harder for your men to achieve tactical superiority.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`The open terrain of international waters does not offer many hiding spots, making it harder for your men to perform guerrilla actions effectively.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`The open terrain of international waters does not offer many natural choke points, making it hard for your troops to funnel the enemy towards highly defended positions.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`The open terrain allows your men to easily exploit the superior mobility of the defender, making excellent use of interior lines to strike where it hurts.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`The open terrain affords your men great mobility, allowing them to easily position themselves for envelopment.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`The open terrain affords your men great mobility, allowing them to exploit overextended assaults and concentrate where and when it matters.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The open terrain affords your men great mobility, making it easier to accomplish concentrated lightning strikes.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The open terrain affords your men great mobility, making it easier to overwhelm the enemy with mass assaults.`);
				}
			} else if (V.SecExp.war.terrain === "an underwater cave") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`The tight terrain of an underwater cave does not lend itself well to bait and bleed tactics, making it harder for your men to achieve tactical superiority.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`The tight terrain of an underwater cave does offers many hiding spots, making it easier for your men to perform guerrilla actions effectively.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`The tight terrain of an underwater cave offers many natural choke points, making it easy for your troops to funnel the enemy towards highly defended positions.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`The tight terrain makes it hard for your men to easily exploit the superior mobility of the defender.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`The tight terrain hinders the mobility of your army, allowing them to easily position themselves for envelopment.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`The tight terrain hinders the mobility of your army, allowing them to exploit overextended assaults and concentrate where and when it matters.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The tight terrain hinders the mobility of your army, making it easier to accomplish concentrated lightning strikes.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The tight terrain hinders the mobility of your army, making it easier to overwhelm the enemy with mass assaults.`);
				}
			} else if (V.SecExp.war.terrain === "a sunken ship") {
				if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
					r.push(`The tight terrain of a sunken ship lends itself well to bait and bleed tactics, making it easier for your men to achieve tactical superiority.`);
				} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
					r.push(`The tight terrain of a sunken ship offers many hiding spots, making it easy for your men to perform guerrilla actions effectively.`);
				} else if (V.SecExp.war.chosenTactic === "Choke Points") {
					r.push(`The tight terrain of a sunken ship offers many natural choke points, making it easy for your troops to funnel the enemy towards highly defended positions.`);
				} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
					r.push(`The tight terrain does not allow your men to easily exploit the superior mobility of the defender.`);
				} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
					r.push(`The open terrain hinders the mobility of your army, allowing them to easily position themselves for envelopment.`);
				} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
					r.push(`The open terrain affords your men great mobility, allowing them to exploit overextended assaults and concentrate where and when it matters.`);
				} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
					r.push(`The open terrain affords your men great mobility, making it easier to accomplish concentrated lightning strikes.`);
				} else if (V.SecExp.war.chosenTactic === "Human Wave") {
					r.push(`The open terrain affords your men great mobility, making it easier to overwhelm the enemy with mass assaults.`);
				}
			}

			if (V.SecExp.war.chosenTactic === "Bait and Bleed") {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`Since the bands of raiders are used to be on high alert and on the move constantly, bait and bleed tactics are not effective against them.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`The modern armies hired by Free Cities are decently mobile, which means quick hit and run attacks will be less successful, but their discipline and confidence still make them quite susceptible to this type of attack.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`While old world armies are tough nuts to crack, their predictability makes them the perfect target for hit and run and harassment tactics.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`Freedom fighters live every day as chasing and being chased by far superior forces, they are far more experienced than your troops in this type of warfare and much less susceptible to it.`);
				}
			} else if (V.SecExp.war.chosenTactic === "Guerrilla") {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`Since the bands of raiders are used to be on high alert and on the move constantly, guerrilla tactics are not effective against them.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`The modern armies hired by Free Cities are highly mobile, which means quick hit and run attacks will be less successful, but their discipline and confidence still make them quite susceptible to this type of attack.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`While old world armies are tough nuts to crack, their predictability makes them the perfect target for hit and run and harassment tactics.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`Freedom fighters live every day as chasing and being chased by far superior forces, they are far more experienced than your troops in this type of warfare and much less susceptible to it.`);
				}
			} else if (V.SecExp.war.chosenTactic === "Choke Points") {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`Raiders lack heavy weaponry or armor, so making use of fortified positions is an excellent way to dissipate the otherwise powerful momentum of their assault.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`The high tech equipment Free Cities can afford to give their guns for hire means there's no defensive position strong enough to stop them, still the relatively low numbers means they will have to take a careful approach, slowing them down.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`Old world armies have both the manpower and the equipment to conquer any defensive position, making use of strong fortifications will only bring you this far against them.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`The lack of specialized weaponry means freedom fighters have a rather hard time overcoming tough defensive positions, unfortunately they have also a lot of experience in avoiding them.`);
				}
			} else if (V.SecExp.war.chosenTactic === "Interior Lines") {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`The highly mobile horde of raiders will not give much room for your troops to maneuver, lowering their tactical superiority.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`While decently mobile, Free Cities forces are not in high enough numbers to risk maintaining prolonged contact, allowing your troops to quickly disengage and redeploy where it hurts.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`Old world armies are not famous for the mobility, which makes them highly susceptible to any tactic that exploits maneuverability and speed.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`While not the best equipped army, the experience and mobility typical of freedom fighters groups make them tough targets for an army that relies itself on mobility.`);
				}
			} else if (V.SecExp.war.chosenTactic === "Pincer Maneuver") {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`While numerous, the undisciplined masses of raiders are easy prey for encirclements.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`While decently mobile, the low number of Free Cities expedition forces make them good candidates for encirclements.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`The discipline and numbers of old world armies make them quite difficult to encircle.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`While not particularly mobile, freedom fighters are used to fight against overwhelming odds, diminishing the effectiveness of the encirclement.`);
				}
			} else if (V.SecExp.war.chosenTactic === "Defense In Depth") {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`While their low discipline makes them prime candidates for an elastic defense type of strategy, their high numbers limit your troops maneuverability.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`With their low numbers Free Cities mercenaries are quite susceptible to this type of tactic, despite their mobility.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`With their low mobility old world armies are very susceptible to this type of strategy.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`Low mobility and not particularly high numbers mean freedom fighters can be defeated by employing elastic defense tactics.`);
				}
			} else if (V.SecExp.war.chosenTactic === "Blitzkrieg") {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`With their low discipline and lack of heavy equipment, lightning strikes are very effective against raider hordes.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`Having good equipment and discipline on their side, Free Cities expeditions are capable of responding to even strong lightning strikes.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`While disciplined, old world armies low mobility makes them highly susceptible to lightning strikes.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`While not well equipped, freedom fighters have plenty of experience fighting small, mobile attacks, making them difficult to defeat with lightning strikes.`);
				}
			} else if (V.SecExp.war.chosenTactic === "Human Wave") {
				if (V.SecExp.war.attacker.type === "raiders") {
					r.push(`The hordes of raiders are much more experienced than your soldiers in executing mass assaults and they also have a lot more bodies to throw in the grinder.`);
				} else if (V.SecExp.war.attacker.type === "free city") {
					r.push(`The good equipment and mobility of Free Cities mercenaries cannot save them from an organized mass assault.`);
				} else if (V.SecExp.war.attacker.type === "old world") {
					r.push(`Unfortunately the discipline and good equipment of old world armies allow them to respond well against a mass assault.`);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					r.push(`The relative low numbers and not great equipment typical of freedom fighters make them susceptible to being overwhelmed by an organized mass assault.`);
				}
			}
			r.push(`In the end ${commanderIsPC ? "you were" : "your commander was"}`);
			if (V.SecExp.war.tacticsSuccessful) {
				r.push(`<span class="green">able to successfully employ ${V.SecExp.war.chosenTactic} tactics,</span> greatly enhancing`);
			} else {
				r.push(`<span class="red">not able to effectively employ ${V.SecExp.war.chosenTactic} tactics,</span> greatly affecting`);
			}
			r.push(`the efficiency of your army.`);
			App.Events.addParagraph(node, r);
			r = [];
		}

		let rand;
		let count = 0;
		let averageLosses = 0;
		let loss = 0;
		const lossesList = [];
		if (hasLosses || V.SecExp.war.losses === 0) {
			if (hasLosses) { // Generates a list of randomized losses, from which each unit picks one at random
				averageLosses = Math.trunc(V.SecExp.war.losses / App.Mods.SecExp.battle.deployedUnits());
				for (let i = 0; i < App.Mods.SecExp.battle.deployedUnits(); i++) {
					let assignedLosses = Math.trunc(Math.clamp(averageLosses + random(-5, 5), 0, 100));
					if (assignedLosses > V.SecExp.war.losses) {
						assignedLosses = V.SecExp.war.losses;
						V.SecExp.war.losses = 0;
					} else {
						V.SecExp.war.losses -= assignedLosses;
					}
					lossesList.push(assignedLosses);
				}
				if (V.SecExp.war.losses > 0) {
					lossesList[random(lossesList.length - 1)] += V.SecExp.war.losses;
				}
				lossesList.shuffle();

				// Sanity check for losses
				for (let l of lossesList) {
					if (!Number.isInteger(l)) {
						l = 0;
					}
					count += l;
				}
				if (count < V.SecExp.war.losses) {
					rand = random(lossesList.length - 1);
					lossesList[rand] += V.SecExp.war.losses - count;
				} else if (count > V.SecExp.war.losses) {
					const diff = count - V.SecExp.war.losses;
					rand = random(lossesList.length - 1);
					lossesList[rand] = Math.clamp(lossesList[rand]-diff, 0, 100);
				}
			}
		} else {
			throw Error(`Losses are ${V.SecExp.war.losses}.`);
		}

		if (inRebellion && V.SecExp.war.irregulars > 0) {
			if (hasLosses) {
				loss = lossesList.pluck();
				if (loss > V.ACitizens * 0.95) { // This is unlikely to happen, but might as well be safe
					loss = Math.trunc(V.ACitizens * 0.95);
				}
			}
			r = ["The volunteering citizens were quickly organized into an irregular militia unit and deployed in the arcology:", casualtiesReport('irregulars', loss)];
			App.Events.addNode(node, r, "div");
			r = [];
			if (hasLosses) {
				if (loss > V.lowerClass * 0.95) { // I suspect only lower class ever get to fight/die, but being safe
					V.lowerClass = Math.trunc(V.lowerClass * 0.05);
					loss -= Math.trunc(V.lowerClass * 0.95);
					if (loss > V.middleClass * 0.95) {
						V.middleClass = Math.trunc(V.middleClass * 0.05);
						loss -= Math.trunc(V.middleClass *0.95);
						if (loss > V.upperClass * 0.95) {
							V.upperClass = Math.trunc(V.upperClass * 0.05);
							loss -= Math.trunc(V.upperClass * 0.95);
							if (loss > V.topClass * 0.95) {
								V.topClass = Math.trunc(V.topClass * 0.05);
							} else {
								V.topClass -= loss;
							}
						} else {
							V.upperClass -= loss;
						}
					} else {
						V.middleClass -= loss;
					}
				} else {
					V.lowerClass -= loss;
				}
			}
		}
		if (V.SF.Toggle && V.SF.Active >= 1 && (inRebellion || inBattle && V.SecExp.war.deploySF)) {
			if (hasLosses) {
				loss = lossesList.pluck();
				loss = Math.clamp(loss, 0, V.SF.ArmySize);
				V.SF.ArmySize -= loss;
			}
			r = [`${capFirstChar(V.SF.Lower)}, ${num(V.SF.ArmySize)} strong, is called to arms:`, casualtiesReport('SF', loss)];
			App.Events.addNode(node, r, "div");
			r = [];
		}
		for (const type of App.Mods.SecExp.unit.list().keys()) {
			if (App.Mods.SecExp.battle.deployedUnits(type) >= 1) {
				for (const unit of V.SecExp.units[type].squads) {
					if (App.Mods.SecExp.unit.isDeployed(unit)) {
						let r = [];
						if (hasLosses) {
							loss = lossesList.pluck();
							loss = Math.clamp(loss, 0, unit.troops);
						}

						if (inRebellion && type !== "bots" && !V.SecExp.war.rebellingID.includes(unit.ID)) {
							r.push(`${unit.platoonName} participated in the battle. They remained loyal to you.`);
						} else {
							r.push(`${unit.platoonName}:`);
						}
						r.push(casualtiesReport(type, loss, unit));
						if (type !== "bots") {
							unit.battlesFought++;
							if (loss > 0) {
								const med = Math.round(Math.clamp(loss * unit.medics * 0.25, 1, loss));
								if (unit.medics === 1) {
									r.push(`Some men were saved by their medics.`);
								}
								unit.troops -= Math.trunc(Math.clamp(loss - med, 0, unit.maxTroops));
								V.SecExp.units[type].dead += Math.trunc(loss - med);
							}
							if (unit.training < 100 && random(1, 100) > 60) {
								r.push(`Experience has increased.`);
								unit.training += random(5, 15) + (isMajorBattle ? 1 : 0) * random(5, 15);
							}
						} else if (type === "bots" && loss > 0) {
							unit.troops -= loss;
						}
						App.Events.addNode(node, r, "div");
					}
				}
			}
		}

		if (inRebellion) {
			for (const unit of Array.from(App.Mods.SecExp.unit.list().keys()).slice(1)) {
				App.UI.DOM.appendNewElement("p", node, rebellingUnitsFate(unit, averageLosses));
			}
		} else {
			if (
				V.SF.Toggle && V.SF.Active >= 1 &&
				(V.SF.Squad.Firebase >= 7 || V.SF.Squad.GunS >= 1 || V.SF.Squad.Satellite >= 5 || V.SF.Squad.GiantRobot >= 6 || V.SF.Squad.MissileSilo >= 1)
			) {
				// SF upgrades effects
				r = [];
				if (V.SF.Squad.Firebase >= 7) {
					r.push(`The artillery pieces installed around ${V.SF.Lower}'s firebase provided vital fire support to the troops in the field.`);
				}
				if (V.SF.Squad.GunS >= 1) {
					r.push(`The gunship gave our troops an undeniable advantage in recon capabilities, air superiority and fire support.`);
				}
				if (V.SF.Squad.Satellite >= 5 && V.SF.SatLaunched > 0) {
					r.push(`The devastating power of ${V.SF.Lower}'s satellite was employed with great efficiency against the enemy.`);
				}
				if (V.SF.Squad.GiantRobot >= 6) {
					r.push(`The giant robot of ${V.SF.Lower} proved to be a great boon to our troops, shielding many from the worst the enemy had to offer.`);
				}
				if (V.SF.Squad.MissileSilo >= 1) {
					r.push(`The missile silo exterminated many enemy soldiers even before the battle would begin.`);
				}
			}
			App.Events.addParagraph(node, r);
			r = [];

			captives = Math.trunc(captives);
			if (captives > 0) {
				let candidates = [];
				r.push(`During the battle ${captives} attackers were captured.`);
				let totalPrice = 0;
				if (random(1, 100) <= 25) {
					const numCandidates = Math.min(captives, random(1, 3));
					for (let i = 0; i < numCandidates; i++) {
						const generateFemale = random(0, 99) < V.seeDicks;
						let slave = GenerateNewSlave((generateFemale ? "XY" : "XX"), {minAge: 16, maxAge: 32, disableDisability: 1});
						slave.weight = (generateFemale ? random(-20, 30) : random(0, 30));
						slave.muscles = (generateFemale ? random(15, 80) : random(25, 80));
						slave.waist = (generateFemale ? random(10, 80) : random(-20, 20));
						slave.skill.combat = 70;
						slave.origin = `$He is an enslaved ${V.SecExp.war.attacker.type} soldier captured during a battle.`;
						candidates.push(slave);
						totalPrice += slaveCost(slave) - sexSlaveContractCost();
					}
					r.push(`${capFirstChar(num(numCandidates, true))} of them have the potential to be sex slaves.`);
				}
				const menialValue = (captives - candidates.length) * menialSlaveCost(-(captives - candidates.length));
				totalPrice += menialValue;
				App.Events.addParagraph(node, r);
				r = [];

				const sell = function() {
					for (const slave of candidates) {
						cashX(slaveCost(slave) - sexSlaveContractCost(), "slaveTransfer", slave);
					}
					cashX(menialValue, "menialTransfer");
					V.menialSupplyFactor += (captives - candidates.length);
					return `You have the all of the captives sold, gaining ${cashFormatColor(totalPrice)}.`;
				};
				const keep = function() {
					let t = [];
					V.menials += (captives - candidates.length);
					for (const slave of candidates) {
						newSlave(slave); // skip New Slave Intro
					}
					if (candidates.length > 0) {
						t.push(`${toSentence(candidates.map(s => SlaveFullName(s)))} ${candidates.length > 1 ? "have" : "has"} been added to your roster of sex slaves.`);
					}
					if (captives > candidates.length) {
						t.push(`${capFirstChar(numberWithPluralOne(captives - candidates.length, "menial slave"))} acquired.`);
					}
					return t;
				};
				const execute = function() {
					App.Mods.SecExp.authorityX(100 * captives);
					return `You publicly execute the captives, earning the <span class="darkviolet">respect</span> of those who watched.`;
				};

				App.Events.addResponses(node, [
					new App.Events.Result(`Sell them all immediately`, sell, `They are worth ${cashFormat(totalPrice)}`),
					new App.Events.Result(`Keep them as slaves`, keep, `${capFirstChar(numberWithPluralOne(captives - candidates.length, "menial"))} and ${numberWithPluralOne(candidates.length, "sex slave")}`),
					new App.Events.Result(`Execute them on the spot`, execute, `Improves your authority`),
				]);
			}
		}
	} else {
		if (result === -1) {
			if (inRebellion) {
				r.push(`Rather than waste the lives of your men you decide to surrender, hoping the rebels will cause less damage if you indulge them. This is, however, a big hit to your status.`);
				r.push(`Your <span class="red">reputation</span> and <span class="red">authority</span> are significantly impacted.`);
				r.push(`The surrender allows the arcology to survive <span class="yellow">mostly intact.</span>`);
				r.push(`However, reports of <span class="red">mass looting and killing of citizens</span> flood your office for a few days.`);
				App.Events.addParagraph(node, r);
				r = [];

				if (slaveRebellion) {
					App.UI.DOM.appendNewElement("div", node, `After the battle most of the rebelling slaves managed to escape, while others remained in the arcology for days looting and hunting their former masters. The arcology will bear the scars of this day for a long time.`);
				} else {
					App.UI.DOM.appendNewElement("div", node, `After the battle most of the rebelling citizens remained in the arcology for days looting and hunting their former arcology. We will bear the scars of this day for a long time.`);
				}
				cashX(-1000, "war");
				repX(random(-1000, -1200), "war");
				App.Mods.SecExp.authorityX(random(-1000, -1200));
				if (V.week <= 30) {
					arcologyEffects(100, 150, 5);
				} else if (V.week <= 60) {
					arcologyEffects(120, 170, 10);
				} else if (V.week <= 90) {
					arcologyEffects(140, 190, 15);
				} else if (V.week <= 120) {
					arcologyEffects(160, 210, 20);
				} else {
					arcologyEffects(180, 230, 25);
				}
				V.lowerClass -= random(50, 100);
				lostSlaves = Math.trunc((V.SecExp.war.attacker.troops - V.SecExp.war.attacker.losses) * 0.8);
				App.Mods.SecExp.slavesDamaged(lostSlaves);
			} else {
				r.push(`Rather than waste the lives of your men you decided to surrender, hoping your enemy will cause less damage if you indulge them. This is, however, a big hit to your status. Your <span class="red">reputation</span> and <span class="red">authority</span> are significantly impacted.`);
				if (V.SecExp.war.attacker.type === "raiders") {
					repX(forceNeg(600 * majorBattleMod), "war");
					App.Mods.SecExp.authorityX(-600 * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "free city") {
					repX(forceNeg(800 * majorBattleMod), "war");
					App.Mods.SecExp.authorityX(-800 * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					repX(forceNeg(1000 * majorBattleMod), "war");
					App.Mods.SecExp.authorityX(-1000 * majorBattleMod);
				} else if (V.SecExp.war.attacker.type === "old world") {
					repX(forceNeg(1200 * majorBattleMod), "war");
					App.Mods.SecExp.authorityX(-1200 * majorBattleMod);
				}
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`The surrender allows the arcology to survive <span class="red">mostly intact</span> However, reports of <span class="red">mass looting and killing of citizens</span> flood your office for a few days.`);
				r.push(`${IncreasePCSkills('engineering', 0.1)}`);
				cashX(forceNeg(1000 * majorBattleMod), "war");
				if (V.week <= 30) {
					V.lowerClass -= random(80) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(120) * majorBattleMod);
					V.arcologies[0].prosperity -= random(5) * majorBattleMod;
				} else if (V.week <= 60) {
					V.lowerClass -= random(100) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(140) * majorBattleMod);
					V.arcologies[0].prosperity -= random(10) * majorBattleMod;
				} else if (V.week <= 90) {
					V.lowerClass -= random(120) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(160) * majorBattleMod);
					V.arcologies[0].prosperity -= random(15) * majorBattleMod;
				} else if (V.week <= 120) {
					V.lowerClass -= random(140) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(180) * majorBattleMod);
					V.arcologies[0].prosperity -= random(20) * majorBattleMod;
				} else {
					V.lowerClass -= random(160) * majorBattleMod;
					App.Mods.SecExp.slavesDamaged(random(200) * majorBattleMod);
					V.arcologies[0].prosperity -= random(25) * majorBattleMod;
				}
			}
		} else if (result === 0) { // Battles only
			r.push(`Unfortunately your adversary did not accept your money.`);
			if (V.SecExp.war.attacker.type === "freedom fighters") {
				r.push(`Their ideological crusade would not allow such thing.`);
			} else {
				r.push(`They see your attempt as nothing more than an admission of weakness.`);
			}
			r.push(`There is no time to organize a defense and so the enemy walks into the arcology as if it was theirs. Your reputation and authority suffer a hit.`);
			if (V.SecExp.war.attacker.type === "raiders") {
				repX(forceNeg(400 * majorBattleMod), "war");
				App.Mods.SecExp.authorityX(-400 * majorBattleMod);
			} else if (V.SecExp.war.attacker.type === "free city") {
				repX(forceNeg(600 * majorBattleMod), "war");
				App.Mods.SecExp.authorityX(-600 * majorBattleMod);
			} else if (V.SecExp.war.attacker.type === "freedom fighters") {
				repX(forceNeg(750 * majorBattleMod), "war");
				App.Mods.SecExp.authorityX(-750 * majorBattleMod);
			} else if (V.SecExp.war.attacker.type === "old world") {
				repX(forceNeg(800 * majorBattleMod), "war");
				App.Mods.SecExp.authorityX(-800 * majorBattleMod);
			}
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`Fortunately the arcology survives <span class="yellow">mostly intact.</span> However, reports of <span class="red">mass looting and killing of citizens</span> flood your office for a few days.`);
			r.push(`${IncreasePCSkills('engineering', 0.1)}`);
			cashX(-1000, "war");
			if (V.week <= 30) {
				V.lowerClass -= random(80) * majorBattleMod;
				App.Mods.SecExp.slavesDamaged(random(120) * majorBattleMod);
				V.arcologies[0].prosperity -= random(5) * majorBattleMod;
			} else if (V.week <= 60) {
				V.lowerClass -= random(100) * majorBattleMod;
				App.Mods.SecExp.slavesDamaged(random(140) * majorBattleMod);
				V.arcologies[0].prosperity -= random(10) * majorBattleMod;
			} else if (V.week <= 90) {
				V.lowerClass -= random(120) * majorBattleMod;
				App.Mods.SecExp.slavesDamaged(random(160) * majorBattleMod);
				V.arcologies[0].prosperity -= random(15) * majorBattleMod;
			} else if (V.week <= 120) {
				V.lowerClass -= random(140) * majorBattleMod;
				App.Mods.SecExp.slavesDamaged(random(180) * majorBattleMod);
				V.arcologies[0].prosperity -= random(20) * majorBattleMod;
			} else {
				V.lowerClass -= random(160) * majorBattleMod;
				App.Mods.SecExp.slavesDamaged(random(200) * majorBattleMod);
				V.arcologies[0].prosperity -= random(25) * majorBattleMod;
			}
		} else if (result === 1) { // Battles only
			r.push(`The attackers wisely take the money offered them and leave your territory without further incident. The strength of the Free Cities was never in their guns but in their dollars, and today's events are the perfect demonstration of such strength.`);
			r.push(`Your <span class="green">reputation slightly increases.</span>`);
			if (V.SecExp.war.attacker.type === "raiders") {
				repX(500 * majorBattleMod, "war");
			} else if (V.SecExp.war.attacker.type === "free city") {
				repX(750 * majorBattleMod, "war");
			} else if (V.SecExp.war.attacker.type === "freedom fighters") {
				repX(1000 * majorBattleMod, "war");
			} else if (V.SecExp.war.attacker.type === "old world") {
				repX(1250 * majorBattleMod, "war");
			}
			cashX(forceNeg(App.Mods.SecExp.battle.bribeCost()), "war");
		}
	}

	App.Events.addParagraph(node, r);
	if (inRebellion) {
		const inverse = slaveRebellion ? 'citizen' : 'slave';
		V.SecExp.rebellions[V.SecExp.war.type.toLowerCase().replace(' rebellion', '') + 'Progress'] = 0;
		V.SecExp.rebellions.tension = Math.clamp(V.SecExp.rebellions.tension - random(50, 100), 0, 100);
		V.SecExp.rebellions[inverse + 'Progress'] = Math.clamp(V.SecExp.rebellions[inverse + 'Progress'] - random(50, 100), 0, 100);
	}
	delete V.SecExp.war.type;
	return node;
};
/**
 * @param {string} [type]
 * @param {number} [loss]
 * @param {object} [squad=null]
 * @returns {DocumentFragment}
 */
const casualtiesReport = function(type, loss, squad=null) {
	const isSpecial = squad && Array.from(App.Mods.SecExp.unit.list().keys()).slice(1).includes(type);
	const frag = new DocumentFragment();
	const r = new SpacedTextAccumulator(frag);
	if (loss <= 0) {
		r.push(`No`);
	} else if (loss <= (isSpecial ? (squad.troops * 0.2) : 10)) {
		r.push(`Light`);
	} else if (loss <= (isSpecial ? (squad.troops * 0.4) : 30)) {
		r.push(`Moderate`);
	} else if (loss <= (isSpecial ? (squad.troops * 0.6) : 60)) {
		r.push(`Heavy`);
	} else {
		r.push(`Catastrophic`);
	}
	r.push(`casualties suffered.`);
	if (Array.from(App.Mods.SecExp.unit.list().keys()).includes(type)) {
		if (squad.troops <= 0) {
			squad.active = 0;
			r.push(`Unfortunately the losses they took were simply too great, their effective combatants are in so small number you can no longer call them a deployable unit.`);
			if (type === "bots") {
				r.push(`It will take quite the investment to rebuild them.`);
			} else {
				r.push(`The remnants will be sent home honored as veterans or reorganized in a new unit.`);
			}
		} else if (squad.troops <= 10) {
			r.push(`The unit has very few operatives left, it risks complete annihilation if deployed again.`);
		}
	}
	r.toNode("span", [loss <= 0 ? "green" : "red"]);
	return frag;
};

// Battles
/**
 * Does the target become wounded?
 * @param {string} [target]
 * @returns {string}
 */
const checkWoundStatus = function(target) {
	let conditions;
	let slave;
	let woundChance = 0;
	const r = [];
	if (target === "PC") {
		if (V.PC.career === "mercenary" || V.PC.career === "gang") {
			woundChance -= 5;
		} else if (V.PC.skill.warfare >= 75) {
			woundChance -= 3;
		}
		if (V.personalArms >= 1) {
			woundChance -= 5;
		}
		if (V.PC.balls >= 20) {
			woundChance += random(5, 10);
		} else if (V.PC.balls >= 9) {
			woundChance += random(1, 5);
		}
		conditions = [
			V.PC.physicalAge >= 60,
			V.PC.belly > 5000,
			V.PC.boobs >= 1000,
			V.PC.butt >= 4,
			V.PC.preg >= 30
		];
	} else {
		if (target === "Concubine") {
			slave = S.Concubine;
		} else if (target === "Bodyguard") {
			slave = S.Bodyguard;
		}

		if (!slave) {
			return ``;
		}

		if (slave.skill.combat > 30) {
			woundChance -= 2;
		}
		woundChance -= 0.25 * (getLimbCount(slave, 105));
		if (slave.health.condition >= 50) {
			woundChance -= 1;
		}
		conditions = [
			slave.weight > 130,
			slave.muscles < -30,
			getBestVision(slave) === 0,
			slave.heels === 1,
			slave.boobs >= 1400,
			slave.butt >= 6,
			slave.belly >= 10000,
			slave.dick >= 8,
			slave.balls >= 8,
			slave.intelligence + slave.intelligenceImplant < -95
		];
	}
	for (const cond of conditions) {
		if (cond) {
			woundChance += (target === "PC" ? random(1, 5) : 1);
		}
	}
	woundChance *= (target === "PC" ? random(1, 2) : random(2, 4));

	if (random(1, 100) <= woundChance) {
		if (target === "PC") {
			healthDamage(V.PC, 60);
			r.push(`A lucky shot managed to find its way to you, leaving a painful, but thankfully not lethal, wound.`);
		} else {
			const woundType = App.Mods.SecExp.inflictBattleWound(slave);
			const {his, him} = getPronouns(slave);
			if (target === "Concubine") {
				r.push(`Your Concubine was unfortunately caught in the crossfire.`);
			} else {
				r.push(`During one of the assaults your Bodyguard was hit.`);
			}
			if (woundType === "voice") {
				r.push(`A splinter pierced ${his} throat, severing ${his} vocal cords.`);
			} else if (woundType === "eyes") {
				r.push(`A splinter hit ${his} face, severely damaging ${his} eyes.`);
			} else if (woundType === "legs") {
				r.push(`An explosion near ${him} caused the loss of both of ${his} legs.`);
			} else if (woundType === "arm") {
				r.push(`An explosion near ${him} caused the loss of one of ${his} arms.`);
			} else if (woundType === "flesh") {
				r.push(`A stray shot severely wounded ${him}.`);
			}
		}
	} else if (target === "PC") {
		r.push(`Fortunately you managed to avoid injury.`);
	}
	return r.join(" ");
};

// Rebellions
/**
 * @param {string} [target]
 * @param {number} [value]
 * @param {number} [cost=2000]
 */
const setRepairTime = function(target, value, cost=2000) {
	V.SecExp.rebellions.repairTime[target] = 3 + random(1) - value;
	cashX(-cost, "war");
	return IncreasePCSkills('engineering', 0.1);
};
/**
 * @param {number} [lowerClass]
 * @param {number} [slaves]
 * @param {number} [prosperity]
 * @returns {void}
 */
const arcologyEffects = function(lowerClass, slaves, prosperity) {
	V.lowerClass -= random(lowerClass);
	App.Mods.SecExp.slavesDamaged(random(slaves));
	V.arcologies[0].prosperity -= random(prosperity);
};
/**
 * @param {FC.SecExp.PlayerHumanUnitTypeModHuman} [unit]
 * @param {number} [averageLosses]
 */
const rebellingUnitsFate = function(unit, averageLosses) {
	let manpower = 0;
	const node = new DocumentFragment();
	const r = [];
	const rebels = {ID: [], names: []};

	const Dissolve = function() {
		App.Mods.SecExp.unit.unitFree(unit).add(manpower);
		for (const u of V.SecExp.units[unit].squads.filter(s => s.active === 1)) {
			u.loyalty = Math.clamp(u.loyalty - random(10, 40), 0, 100);
		}
		return `Units dissolved.`;
	};
	const Purge = function() {
		App.Mods.SecExp.unit.unitFree(unit).add(manpower * 0.5);
		return `Dissidents purged and units dissolved.`;
	};
	const Execute = function() {
		for (const u of V.SecExp.units[unit].squads.filter(s => s.active === 1)) {
			u.loyalty = Math.clamp(u.loyalty + random(10, 40), 0, 100);
		}
		return `Units executed. Dissent will not be tolerated.`;
	};

	App.UI.DOM.appendNewElement("div", node);
	for (const u of V.SecExp.units[unit].squads.filter(s => s.active === 1)) {
		if (V.SecExp.war.rebellingID.contains(u.ID)) {
			rebels.names.push(u.platoonName);
			rebels.ID.push(u.ID);
			manpower += Math.clamp(u.troops - random(averageLosses), 0, u.troops);
		}
	}

	if (rebels.ID.length > 0) {
		V.SecExp.units[unit].squads.deleteWith((u) => rebels.ID.includes(u.ID));
		V.SecExp.battles.lastSelection.deleteWith((u) => rebels.ID.includes(u.ID));
		if (unit === "slaves") {
			r.push(`${toSentence(rebels.names)} decided in their blind arrogance to betray you.`);
		} else if (unit === "militia") {
			r.push(`${toSentence(rebels.names)} had the gall to betray you and join your enemies.`);
		} else if (unit === "mercs") {
			r.push(`${toSentence(rebels.names)} made the grave mistake of betraying you.`);
		}
		if (V.SecExp.war.result < 2) { // rebellion loss
			r.push(`They participated in the looting following the battle, then vanished in the wastes.`);
			cashX(forceNeg(1000 * rebels.ID.length), "war");
		} else { // rebellion win
			App.Events.addResponses(node, [
				new App.Events.Result(
					`Dissolve the units`,
					Dissolve,
					`Manpower will be refunded, but will negatively influence the loyalty of the other units`
				),
				new App.Events.Result(
					`Purge the dissidents and dissolve the units`,
					Purge,
					`Will not influence the loyalty of the other units, but half the manpower will be refunded.`
				),
				new App.Events.Result(
					`Execute them all`,
					Execute,
					`Will positively influence the loyalty of the other units, but manpower will not be refunded.`
				),
			]);
		}
		App.Events.addNode(node, r, "div");
	}
	return node;
};
