/**
 * Returns the effect (if any) the Special Force provides.
 * @param {string} [report] which report is this function being called from.
 * @param {string} [section=''] which sub section (if any) is this function being called from.
 * @returns {{text:string, bonus:number}}
 */
App.Mods.SecExp.assistanceSF = function(report, section = '') {
	const size = V.SF.Toggle && V.SF.Active >= 1 ? App.Mods.SF.upgrades.total() : 0;
	let r = ``; let bonus = 0;
	if (size > 10) {
		if (report === 'authority' || report === 'trade') {
			r += `Having a powerful Special Force increases ${report === 'authority' ? 'your authority' : 'trade security'}.`;
			bonus += size / 10;
		} else if (report === 'security') {
			r += `Having a powerful Special Force attracts a lot of ${section === 'militia' ? 'citizens' : 'mercenaries'}, hopeful that they may be able to fight along side it.`;
			if (section === 'militia') {
				bonus *= 1 + (random(1, (Math.round(size / 10))) / 20); // not sure how high size goes, so I hope this makes sense
			} else if (section === 'mercs') {
				bonus += random(1, Math.round(size / 10));
			}
		}
	}
	return {text: r, bonus: bonus};
};

/**
 * Returns the effect of a campaign launched from the PR hub.
 * @param {string} [focus] campaign option to check against.
 * @returns {{text:string, effect:number}}}
 */
App.Mods.SecExp.propagandaEffects = function(focus) {
	let t = ``; let increase = 0;
	if (V.secExpEnabled > 0 && V.SecExp.buildings.propHub && V.SecExp.buildings.propHub.upgrades.campaign >= 1 && V.SecExp.buildings.propHub.focus === focus) {
		let campaign; let modifier;
		const forcedViewing = V.SecExp.edicts.propCampaignBoost === 1;
		const noRecruiter = V.SecExp.buildings.propHub.recruiterOffice === 0 || V.RecruiterID === 0;
		const recruiterActive = V.SecExp.buildings.propHub.recruiterOffice && V.RecruiterID > 0;
		switch (focus) {
			case "social engineering":
				campaign = 'societal engineering';
				modifier = forcedViewing ? V.SecExp.buildings.propHub.upgrades.campaign : 1;
				if (noRecruiter) {
					increase += (forcedViewing ? 2 : 1) * modifier;
				} else if (recruiterActive) {
					increase += modifier + Math.floor((S.Recruiter.intelligence + S.Recruiter.intelligenceImplant) / 32);
				}
				break;
			case "recruitment":
				campaign = 'militia recruitment';
				modifier = forcedViewing ? 0.2 : 0.15;
				if (noRecruiter) {
					increase += modifier + (forcedViewing ? 0.1 : 0.05);
				} else if (recruiterActive) {
					increase += modifier + Math.floor((S.Recruiter.intelligence + S.Recruiter.intelligenceImplant) / 650);
				}
				break;
			case "immigration":
				modifier = forcedViewing ? V.SecExp.buildings.propHub.upgrades.campaign : 1;
				if (noRecruiter) {
					increase += (forcedViewing ? random(1, 4) : random(1, 2)) * modifier;
				} else if (recruiterActive) {
					increase += modifier + Math.floor((S.Recruiter.intelligence + S.Recruiter.intelligenceImplant) / 16);
				}
				t = `Your advertisement campaign outside the free city brings more people to the gates of your arcology.`;
				break;
			case "enslavement":
				modifier = forcedViewing ? V.SecExp.buildings.propHub.upgrades.campaign : 1;
				if (noRecruiter) {
					increase += (forcedViewing ? random(0, 4) : random(0, 2)) * modifier;
				} else if (recruiterActive) {
					increase += modifier + Math.floor((S.Recruiter.intelligence + S.Recruiter.intelligenceImplant) / 16);
				}
				t = `Many were attracted by your advertisement campaigns.`;
				break;
		}

		if (focus === "social engineering" || focus === "recruitment") {
			t += `<span class='green'>Your propaganda campaign helps further your ${campaign} efforts.`;
			if (recruiterActive) {
				t += ` <span class='slave-name'>${SlaveFullName(S.Recruiter)}</span> is boosting your ${campaign} campaign.`;
			}
			t += `</span>`;
		}
	}
	return {text: t, effect: Math.round(increase)};
};

App.Mods.SecExp.slavesDamaged = function(adjustValue) {
	V.NPCSlaves -= Math.trunc((V.NPCSlaves / V.ASlaves) * adjustValue);
	V.menials -= Math.trunc((V.menials / V.ASlaves) * adjustValue);
	V.fuckdolls -= Math.trunc((V.fuckdolls / V.ASlaves) * adjustValue);
	V.menialBioreactors -= Math.trunc((V.menialBioreactors / V.ASlaves) * adjustValue);
};

App.Mods.SecExp.updateFacilityDamage = function(facility) {
	let text = ``;
	let securityEffect = 0;
	let crimeEffect = 0;
	let growthEffect = 0;
	if (V.SecExp.rebellions.repairTime[facility] !== undefined) {
		if (facility === 'assistant') {
			text += `With the central CPU core of the assistant down, managing security is a much harder task. Inevitably some little but important details will slip past your agents.`;
			securityEffect = 1;
			crimeEffect = 1;
		} else if (facility === 'reactor') {
			text += `The damage to the reactor caused by the last rebellion is extensive. Businesses and private citizens struggle to operate with the unreliable and limited energy production offered by the auxiliary generators.`;
			growthEffect = random(1, 2);
		} else if (facility === 'waterway') {
			text += `The damage caused to the water supply of the arcology discourages immigration and causes the death of some of the poorest residents.`;
			V.lowerClass -= random(20, 40);
			V.middleClass -= random(10, 20);
			V.upperClass -= random(10, 20);
			V.topClass -= random(10, 20);
		} else if (facility === 'arc') {
			text += `The recent rebellion left the arcology wounded and it falls to its owner to fix it.`;
			cashX(-5000, "personalBusiness");
		}
		text += ` It will still take ${numberWithPluralOne(V.SecExp.rebellions.repairTime[facility], 'week')} to finish repair works.`;

		V.SecExp.rebellions.repairTime[facility]--;
		IncreasePCSkills('engineering', 0.1);
		if (V.SecExp.rebellions.repairTime[facility] <= 0) {
			delete V.SecExp.rebellions.repairTime[facility];
		}
	}
	return {
		text: text, security: securityEffect, crime: crimeEffect, growth: growthEffect
	};
};

/** Returns the how effective the selected commander is.
 * @param {string} passage if "handler" only numbers are returned else a string.
 */
App.Mods.SecExp.commanderEffectiveness = function(passage) {
	const r = [];
	const oldRep = V.rep;
	const oldAuth = V.SecExp.core.authority;
	const commander = V.SecExp.war.commander;
	const inHandler = passage === "handler";
	const {
		HisA,
		himA,
	} = getPronouns(V.assistant.personality > 0 ? assistant.pronouns().main : {pronoun: App.Data.Pronouns.Kind.ai}).appendSuffix("A");
	const {hisP} = getPronouns(V.PC).appendSuffix("P");

	let woundChance = 5; // leader has a base chance of 5% to get wounded
	let slaveMod = 0;
	let mercMod = 0;
	let militiaMod = 0;
	let SFMod = 0;
	let enemyMod = 0;
	let atkMod = 0;
	let defMod = 0;
	let tacChance = 0;
	let slave;
	const isBodyguard = commander === "Bodyguard";

	switch (commander) {
		case "PC":
			if (inHandler) {
				if (V.SecExp.core.authority <= 2500 && V.SecExp.core.authority > 1000) {
					slaveMod -= 0.10;
				} else if (V.SecExp.core.authority <= 1000) {
					slaveMod -= 0.25;
				} else if (V.SecExp.core.authority >= 5000 && V.SecExp.core.authority < 15000) {
					slaveMod += 0.10;
				} else if (V.SecExp.core.authority >= 15000) {
					slaveMod += 0.25;
				}
				if (["escort", "prostitute", "servant"].includes(V.PC.career)) {
					slaveMod += 0.10;
				} else if (V.PC.career === "child prostitute" && V.PC.visualAge >= V.minimumSlaveAge) {
					slaveMod += 0.05;
				} else if (["slaver", "slave overseer", "slave tender"].includes(V.PC.career)) {
					slaveMod -= 0.10;
				}
				if (V.rep <= 2500 && V.rep > 1000) {
					militiaMod -= 0.10;
				} else if (V.rep <= 1000) {
					militiaMod -= 0.25;
				} else if (V.rep >= 5000 && V.rep < 15000) {
					militiaMod += 0.10;
				} else if (V.rep >= 15000) {
					militiaMod += 0.25;
				}
				if (V.PC.career === "celebrity" || V.PC.career === "capitalist") {
					militiaMod += 0.10;
				} else if (V.PC.career === "gang" || V.PC.career === "escort") {
					militiaMod -= 0.10;
				}
				if (V.PC.career === "mercenary" || V.PC.skill.warfare > 75) {
					mercMod += 0.10;
					SFMod += 0.10;
				} else if (V.PC.career === "wealth" || V.PC.career === "servant") {
					mercMod -= 0.10;
					SFMod -= 0.10;
				}
				if (V.rep >= 15000) {
					enemyMod -= 0.10;
				}
				if (V.PC.skill.warfare <= 25 && V.PC.skill.warfare > 10) {
					atkMod -= 0.15;
					tacChance -= 0.15;
				} else if (V.PC.skill.warfare <= 10) {
					atkMod -= 0.20;
					defMod -= 0.10;
					tacChance -= 0.30;
				} else if (V.PC.skill.warfare >= 50 && V.PC.skill.warfare < 75) {
					atkMod += 0.15;
					tacChance += 0.15;
				} else if (V.PC.skill.warfare >= 75) {
					atkMod += 0.20;
					defMod += 0.10;
					tacChance += 0.30;
				}
				// 80% chance of increasing warfare
				if (V.PC.skill.warfare < 100 && random(1, 100) <= 80) {
					V.SecExp.war.gainedWarfare = 1;
					IncreasePCSkills('warfare', 10);
					V.PC.skill.warfare = Math.clamp(V.PC.skill.warfare, -100, 100);
				}
				// does the PC get wounded?
				if (V.PC.career === "mercenary" || V.PC.career === "gang") {
					woundChance -= 3;
				} else if (V.PC.skill.warfare >= 75) {
					woundChance -= 2;
				}
				if (V.PC.physicalAge >= 60) {
					woundChance += 1;
				}
				if (V.PC.belly > 5000) {
					woundChance += 1;
				}
				if (V.PC.boobs >= 1000) {
					woundChance += 1;
				}
				if (V.PC.butt >= 4) {
					woundChance += 1;
				}
				if (V.PC.preg >= 30) {
					woundChance += 1;
				}
				if (V.PC.balls >= 20) {
					woundChance += 1;
				}
				if (V.PC.balls >= 9) {
					woundChance += 1;
				}
				if (random(1, 100) <= woundChance) {
					V.SecExp.war.leaderWounded = 1;
					militiaMod -= 0.2;
					slaveMod -= 0.2;
					mercMod -= 0.2;
					SFMod -= 0.2;
					enemyMod += 0.2;
					healthDamage(V.PC, 60);
				}
			} else {
				r.push(`You decided to personally lead the defense of your arcology.`);
				if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
					if (oldRep <= 2500) {
						if (oldRep > 1000) {
							r.push(`You're not particularly popular between the inhabitants of your arcology, so your presence does little to reassure the volunteers.`);
						} else {
							r.push(`As your low reputation proves, your volunteers do not particularly enjoy your company. As far as they are concerned your presence is more of a hindrance than an advantage.`);
						}
						if (V.PC.career === "celebrity") {
							r.push(`Still, your past celebrity does carry some weight, and many look forward to fight alongside a famous name.`);
						} else if (V.PC.career === "capitalist") {
							r.push(`Still, your past life as a famous venture capitalist does carry some weight, and many trust in your cunning to save them in the incoming battle.`);
						} else if (V.PC.career === "gang") {
							r.push(`The situation is not made easier by your past. Many still remember you as the gang leader who used to be on the other side of their guns.`);
						} else if (V.PC.career === "escort") {
							r.push(`The situation is not made easier by your past. Many still remember your past career as an escort and doubt you'll be of any use during the fighting.`);
						} else if (V.PC.career === "mercenary") {
							r.push(`Still, your past mercenary work does carry some weight, and many look forward to fight alongside a battle hardened name.`);
						}
					} else if (oldRep >= 5000) {
						if (oldRep < 15000) {
							r.push(`Your citizens are honored that their arcology owner is willing to put ${hisP} life in danger.`);
						} else {
							r.push(`Many among the volunteers are awed by your presence; never would they have thought they would fight shoulder to shoulder with their famous arcology owner.`);
						}
						if (V.PC.career === "celebrity") {
							r.push(`They consider it a priceless opportunity to fight together with someone with such a renowned past as yours. Your celebrity past still carries weight.`);
						} else if (V.PC.career === "capitalist") {
							r.push(`They consider it a priceless opportunity to fight together with one of the great capitalist sharks of their time. Such a fine mind on their side can only bring victory!`);
						} else if (V.PC.career === "gang") {
							r.push(`Your past, however, does not help you. Many still remember you as the gang leader who used to be on the other side of their guns.`);
						} else if (V.PC.career === "escort") {
							r.push(`Your past, however, does not help you. Many still remember your past career as an escort and doubt you'll be of any use during the fighting.`);
						} else if (V.PC.career === "mercenary") {
							r.push(`Your past mercenary work does carry some weight, and many look forward to fight alongside a battle hardened name.`);
						}
					}
				}
				if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
					if (oldAuth <= 2500) {
						if (oldAuth > 1000) {
							r.push(`Your slave soldiers do not feel bound to you as much as they should, as your authority is far from absolute.`);
						} else {
							r.push(`Your slave soldiers are often openly rebellious. Only the threat of execution holds them in line.`);
						}
						if (V.PC.career === "escort") {
							r.push(`Fortunately many feel some level of kinship with you, thanks to your past as an escort.`);
						} else if (V.PC.career === "servant") {
							r.push(`Fortunately many feel some level of kinship with you, thanks to your past as a servant.`);
						} else if (V.PC.career === "slaver") {
							r.push(`Things are made worse by your past as a notorious slaver.`);
						} else if (V.PC.career === "mercenary") {
							r.push(`Your past mercenary work carries some weight, and many look forward to fighting alongside a battle hardened name.`);
						}
					} else if (oldAuth >= 5000) {
						if (oldAuth < 15000) {
							r.push(`Your slave soldiers show a surprising amount of discipline, thanks to your high authority.`);
						} else {
							r.push(`Your slave soldiers show almost a fanatical level of martial discipline. Your absolute authority has a great effect on them.`);
						}
						if (V.PC.career === "escort") {
							r.push(`Many have an instinctual feeling of kinship towards you because of your past as an escort.`);
						} else if (V.PC.career === "servant") {
							r.push(`Many have an instinctual feeling of kinship towards you because of your past as a servant.`);
						} else if (V.PC.career === "slaver") {
							r.push(`Still, some rebellious looks can be spotted once in a while. In their eyes your slaver past will always paint you in a dark light.`);
						} else if (V.PC.career === "mercenary") {
							r.push(`Your past mercenary work carries some weight, and many look forward to fighting alongside a battle hardened name.`);
						}
					}
				}
				if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					const mercLoyalty = App.Mods.SecExp.mercenaryAvgLoyalty();
					if (mercLoyalty <= 25) {
						if (mercLoyalty <= 10) {
							r.push(`Your mercenaries barely bother to pretend being loyal; their battle performance is obviously barely passable.`);
						} else {
							r.push(`Your presence does little to spur your mercenaries into action; their loyalty is straining and their performance suffers.`);
						}
						if (V.PC.career === "mercenary") {
							r.push(`Thankfully they hold in high regard someone who made their fortune as a mercenary themselves.`);
						} else if (V.PC.career === "wealth") {
							r.push(`They do little to hide the contempt they have for someone who was born into wealth, rather than gaining it through blood, sweat, and tears.`);
						} else if (V.PC.career === "servant") {
							r.push(`They do little to hide their disgust at being ordered around by an ex-servant.`);
						} else if (V.PC.career === "BlackHat") {
							r.push(`They do little to hide their disgust at being ordered around by some unscrupulous code monkey.`);
						}
					} else if (mercLoyalty >= 50) {
						if (mercLoyalty < 75) {
							r.push(`Your mercenaries are ready to fight their hardest for you, their loyalty a testament to your capability as a leader.`);
						} else {
							r.push(`Your mercenaries fight with a martial fury worthy of religious fanatics. Their loyalty to you is absolute.`);
						}
						if (V.PC.career === "mercenary") {
							r.push(`They're more than willing to follow someone who walked their same steps once as a gun for hire.`);
						} else if (V.PC.career === "wealth") {
							r.push(`Unfortunately many still resent you being born into your wealth and power, rather than having earned it through blood, sweat, and tears.`);
						} else if (V.PC.career === "servant") {
							r.push(`Unfortunately some still resent the fact they are ordered around by an ex-servant.`);
						} else if (V.PC.career === "BlackHat") {
							r.push(`Unfortunately some still resent the fact they are ordered around by an unscrupulous hacker.`);
						}
					}
					if (oldRep >= 15000) {
						r.push(`Your reputation is so high your name carries power by itself. Having you on the battlefield puts fear even in the hardiest of warriors.`);
					}
				}
				if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
					if (V.PC.career === "mercenary" || V.PC.career === "slaver" || V.PC.career === "capitalist" || V.PC.career === "gang" || V.PC.skill.warfare > 75) {
						r.push(`The soldiers of ${V.SF.Lower} are ready and willing to follow you into battle, confident in your past experience.`);
					} else if (V.PC.career === "wealth" || V.PC.career === "medicine" || V.PC.career === "engineer") {
						r.push(`The soldiers of ${V.SF.Lower}, as loyal as they are, are not enthusiastic to follow the orders of someone who has no experience leading men.`);
					} else if (V.PC.career === "servant") {
						r.push(`The soldiers of ${V.SF.Lower}, as loyal as they are, are not enthusiastic to follow the orders of an ex-servant.`);
					} else if (V.PC.career === "escort") {
						r.push(`The soldiers of ${V.SF.Lower}, as loyal as they are, are not enthusiastic to follow the orders of an ex-escort.`);
					} else if (V.PC.career === "BlackHat") {
						r.push(`The soldiers of ${V.SF.Lower}, as loyal as they are, are not enthusiastic to follow the orders of a dubious incursion specialist.`);
					}
				}
				if (V.PC.skill.warfare <= 25 && V.PC.skill.warfare > 10) {
					r.push(`Your inexperience in military matters has a negative impact on your troops performance and the effectiveness of your battle plan.`);
				} else if (V.PC.skill.warfare <= 10) {
					r.push(`Your ignorance in military matters has a severe negative impact on your troops performance and the effectiveness of your battle plan.`);
				} else if (V.PC.skill.warfare >= 50) {
					r.push(`Your experience in military matters has a positive impact on your troops performance and the effectiveness of your battle plan.`);
				} else if (V.PC.skill.warfare >= 75) {
					r.push(`Your great experience in military matters has a major positive impact on your troops performance and the effectiveness of your battle plan.`);
				}
				if (V.SecExp.war.gainedWarfare) {
					r.push(`Battlefield experience increased your understanding of warfare, making you a better commander.`);
				}
				if (V.PC.health.shortDamage >= 60) {
					r.push(`During the fighting <span class="red">you were wounded.</span> Your medics assure you it's nothing life threatening, but you'll be weakened for a few weeks.`);
				}
			}
			break;
		case "assistant":
			if (inHandler) {
				if (V.rep < 10000 && V.SecExp.core.authority < 10000) {
					militiaMod -= 0.15;
					slaveMod -= 0.15;
					mercMod -= 0.15;
					SFMod -= 0.15;
				}
				if (V.assistant.power === 0) {
					atkMod -= 0.10;
					defMod -= 0.10;
					tacChance -= 0.20;
				} else if (V.assistant.power === 2) {
					atkMod += 0.10;
					defMod += 0.10;
					tacChance += 0.20;
				} else if (V.assistant.power >= 3) {
					atkMod += 0.15;
					defMod += 0.15;
					tacChance += 0.30;
				}
			} else {
				r.push(`${V.assistant.name} lead the troops.`);
				if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1 || App.Mods.SecExp.battle.deployedUnits('militia') >= 1 || App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
					r.push(`No soldier trusts a computer to be their commander,`);
					if (oldRep < 10000 && oldAuth < 10000) {
						r.push(`no algorithm can substitute experience,`);
						if (V.assistant.power === 0) {
							r.push(`and as expected,`);
						} else {
							r.push(`however,`);
						}
					} else {
						r.push(`but they trust you enough to not question your decision,`);
						if (V.assistant.power === 0) {
							r.push(`however`);
						} else {
							r.push(`and`);
						}
					}
				} else {
					r.push(`You find`);
				}
				if (V.assistant.power === 0) {
					r.push(`your assistant gave a rather poor field performance, due to the limited computing power available to ${himA}.`);
				} else if (V.assistant.power === 1) {
					r.push(`your assistant performed decently. While nothing to write home about your men are pleasantly surprised.`);
				} else if (V.assistant.power === 2) {
					r.push(`your assistant performed admirably. ${HisA} upgraded computing power allows ${himA} to monitor the battlefield closely, enhancing the efficiency of your troops and the effectiveness of your battle plan.`);
				} else if (V.assistant.power >= 3) {
					r.push(`your assistant performed admirably. ${HisA} vast computing power allows ${himA} to be everywhere on the battlefield, greatly enhancing the efficiency of your troops and the effectiveness of your battle plan.`);
				}
			}
			break;
		case "Bodyguard":
		case "HeadGirl":
			slave = S[commander];
			/* eslint-disable no-case-declarations */
			const CareerGivesBonus = App.Data.Careers.Leader[isBodyguard ? "bodyguard" : "HG"].includes(slave.career) || App.Data.misc.secExCombatPrestige.includes(slave.prestigeDesc);
			const TotalIntelligence = slave.intelligence + slave.intelligenceImplant;

			if (inHandler) {
				if (slave.devotion < -20) {
					slaveMod -= 0.15;
				} else if (slave.devotion > 50) {
					slaveMod += 0.15;
				}
				if ((V.rep < 10000 && V.SecExp.core.authority < 10000) || slave.prestige < 1) {
					militiaMod -= 0.15;
					mercMod -= 0.15;
					SFMod -= 0.15;
				} else if (slave.prestige >= 2) {
					militiaMod += 0.10;
					mercMod += 0.10;
					SFMod += 0.10;
				}
				if (CareerGivesBonus && TotalIntelligence > 95) {
					atkMod += 0.25;
					defMod += 0.25;
					tacChance += 0.50;
				} else if (TotalIntelligence > 95) {
					atkMod += 0.20;
					defMod += 0.15;
					tacChance += 0.35;
				} else if (CareerGivesBonus && TotalIntelligence > 50) {
					atkMod += 0.15;
					defMod += 0.10;
					tacChance += 0.25;
				} else if (TotalIntelligence > 50) {
					atkMod += 0.10;
					defMod += 0.10;
					tacChance += 0.20;
				} else if (CareerGivesBonus && TotalIntelligence > 15) {
					atkMod += 0.10;
					defMod += 0.05;
					tacChance += 0.15;
				} else if (TotalIntelligence > 15) {
					atkMod += 0.05;
					defMod += 0.05;
					tacChance += 0.10;
				} else if (!CareerGivesBonus && TotalIntelligence < -15) {
					atkMod -= 0.10;
					defMod -= 0.10;
					tacChance -= 0.15;
				} else if (TotalIntelligence < -15) {
					atkMod -= 0.05;
					defMod -= 0.05;
					tacChance -= 0.10;
				} else if (!CareerGivesBonus && TotalIntelligence < -50) {
					atkMod -= 0.35;
					defMod -= 0.35;
					tacChance -= 0.50;
				} else if (TotalIntelligence < -50) {
					atkMod -= 0.25;
					defMod -= 0.25;
					tacChance -= 0.35;
				}
				// does she get wounded?
				if (slave.skill.combat > 30) {
					woundChance -= 3;
				}
				woundChance -= 0.25 * (getLimbCount(slave, 105));
				if (slave.health.condition >= 50) {
					woundChance -= 1;
				}
				if (slave.weight > 130) {
					woundChance += 1;
				}
				if (slave.muscles < -30) {
					woundChance += 1;
				}
				if (getBestVision(slave) === 0) {
					woundChance += 1;
				}
				if (slave.heels === 1) {
					woundChance += 1;
				}
				if (slave.boobs >= 1400) {
					woundChance += 1;
				}
				if (slave.butt >= 6) {
					woundChance += 1;
				}
				if (slave.belly >= 10000) {
					woundChance += 1;
				}
				if (slave.dick >= 8) {
					woundChance += 1;
				}
				if (slave.balls >= 8) {
					woundChance += 1;
				}
				if (TotalIntelligence < -95) {
					woundChance += 1;
				}
				if (random(1, 100) <= woundChance) {
					V.SecExp.war.leaderWounded = 1;
					militiaMod -= 0.2;
					slaveMod -= 0.2;
					mercMod -= 0.2;
					SFMod -= 0.2;
					enemyMod += 0.2;
				}
				// 60% chance of getting combat skill if not already have it
				if (slave.skill.combat < 70 && random(1, 100) <= 60) {
					V.SecExp.war.gainedCombat = 1;
					slave.skill.combat += 5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 64);
				}
			} else {
				const {
					His, He,
					his, he, him
				} = getPronouns(slave);
				r.push(`Your ${isBodyguard ? 'bodyguard' : 'Head Girl'} lead the troops.`);
				if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
					if (slave.devotion < -20) {
						r.push(`${His} low devotion has a negative impact on the morale of your slave soldiers.`);
					} else if (slave.devotion > 51) {
						r.push(`${His} devotion to you has a positive impact on the morale of your slave soldiers, proud to be led by one of their own.`);
					}
				}
				if (oldRep < 10000 && oldAuth < 10000 || slave.prestige < 1) {
					if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
						r.push(`Your volunteers`);
						if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
							r.push(`however`);
						}
						r.push(`are not enthusiastic to have a slave as a`);
						if (V.SF.Toggle && V.SF.Active >= 1 && App.Mods.SecExp.battle.deployedUnits('mercs') === 1 && V.SecExp.war.deploySF) {
							r.push(`commander, and neither are your mercenaries or your soldiers.`);
						} else if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
							r.push(`commander, and neither are your mercenaries.`);
						} else if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
							r.push(`commander, and neither are your soldiers.`);
						} else {
							r.push(`commander.`);
						}
					} else if (V.SF.Toggle && V.SF.Active >= 1 && App.Mods.SecExp.battle.deployedUnits('mercs') === 1 && V.SecExp.war.deploySF) {
						r.push(`Your mercenaries and soldiers`);
						if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
							r.push(`however`);
						}
						r.push(`are not enthusiastic to have a slave as a commander.`);
					} else if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
						r.push(`Your mercenaries`);
						if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
							r.push(`however`);
						}
						r.push(`are not enthusiastic to have a slave as a commander.`);
					} else if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
						r.push(`Your soldiers`);
						if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
							r.push(`however`);
						}
						r.push(`are not enthusiastic to have a slave as a commander.`);
					}
				} else if (slave.prestige >= 2) {
					if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
						r.push(`Your`);
						if (App.Mods.SecExp.battle.deployedUnits('mercs') === 1 && V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
							r.push(`volunteers, your mercenaries and your soldiers are delighted to have such a prestigious individual as their commander, almost forgetting ${he} is a slave.`);
						} else if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
							r.push(`volunteers and your mercenaries are delighted to have such a prestigious individual as their commander, almost forgetting ${he} is a slave.`);
						} else if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
							r.push(`volunteers and your soldiers are delighted to have such a prestigious individual as their commander, almost forgetting ${he} is a slave.`);
						} else {
							r.push(`volunteers are delighted to have such a prestigious individual as their commander, almost forgetting ${he} is a slave.`);
						}
					} else if (App.Mods.SecExp.battle.deployedUnits('mercs') === 1 && V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
						r.push(`Your mercenaries and soldiers are delighted to have such a prestigious individual as their commander, almost forgetting ${he} is a slave.`);
					} else if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
						r.push(`Your mercenaries are delighted to have such a prestigious individual as their commander, almost forgetting ${he} is a slave.`);
					} else if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
						r.push(`Your soldiers are delighted to have such a prestigious individual as their commander, almost forgetting ${he} is a slave.`);
					}
				} else {
					if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
						r.push(`Your volunteers`);
						if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
							r.push(`however`);
						}
						r.push(`are not enthusiastic to have a slave as a`);
						if (App.Mods.SecExp.battle.deployedUnits('mercs') === 1 && V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
							r.push(`commander, and neither are your mercenaries and soldiers, but they trust you enough not to question your decision.`);
						} else if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
							r.push(`commander, and neither are your mercenaries, but they trust you enough not to question your decision.`);
						} else if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
							r.push(`commander, and neither are your soldiers, but they trust you enough not to question your decision.`);
						} else {
							r.push(`commander, but they trust you enough not to question your decision.`);
						}
					} else if (App.Mods.SecExp.battle.deployedUnits('mercs') === 1 && V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
						r.push(`Your mercenaries and soldiers`);
						if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
							r.push(`however,`);
						}
						r.push(`are not enthusiastic to have a slave as a commander, but they trust you enough not to question your decision.`);
					} else if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
						r.push(`Your mercenaries`);
						if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
							r.push(`however,`);
						}
						r.push(`are not enthusiastic to have a slave as a commander, but they trust you enough not to question your decision.`);
					} else if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
						r.push(`Your soldiers`);
						if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
							r.push(`however,`);
						}
						r.push(`are not enthusiastic to have a slave as a commander, but they trust you enough not to question your decision.`);
					}
				}

				if (CareerGivesBonus && TotalIntelligence > 95) {
					r.push(`With ${his} experience and ${his} great intellect, ${he} is able to exploit the smallest of tactical advantages, making your troops very effective.`);
				} else if (TotalIntelligence > 95) {
					r.push(`While ${he} lacks experience, ${his} great intellect allows ${him} to seize and exploit any tactical advantage the battlefield offers ${him}.`);
				} else if (CareerGivesBonus && TotalIntelligence > 50) {
					r.push(`Having both the experience and the intelligence, ${he} performs admirably as your commander. ${His} competence greatly increases the efficiency of your troops.`);
				} else if (TotalIntelligence > 50) {
					r.push(`Despite not having a lot of experience as a leader, ${his} intelligence makes ${him} a good commander, increasing the efficiency of your troops.`);
				} else if (CareerGivesBonus && TotalIntelligence > 15) {
					r.push(`Thanks to ${his} experience, ${he} is a decent commander, competently guiding your troops through the battle.`);
				} else if (TotalIntelligence > 15) {
					r.push(`Lacking experience, ${his} performance as a commander is rather forgettable.`);
				} else if (CareerGivesBonus && TotalIntelligence < -50) {
					r.push(`Despite the experience ${he} accumulated during ${his} past career, ${his} very low intelligence is a great disadvantage for your troops.`);
				} else if (TotalIntelligence < -50) {
					r.push(`Without experience and low intelligence, ${he} performs horribly as a commander, greatly affecting your troops.`);
				} else if (CareerGivesBonus && TotalIntelligence < -15) {
					r.push(`Despite the experience ${he} accumulated during ${his} past career, ${he} lacks the intelligence to apply it quickly and effectively, making for a rather poor performance in the field.`);
				} else if (TotalIntelligence < -15) {
					r.push(`${He} lacks the experience and the intelligence to be an effective commander, the performance of your troops suffers because of ${his} poor leadership.`);
				}
				if (V.SecExp.war.gainedCombat) {
					r.push(`During the battle, ${he} had to fight for ${his} life, giving ${him} experience in modern combat. ${He} is now proficient with modern firearms and hand to hand combat.`);
				}
				if (V.SecExp.war.leaderWounded) {
					r.push(`Unfortunately, <span class="red">${he} sustained major injuries.</span>`);
					const woundType = App.Mods.SecExp.inflictBattleWound(slave);
					if (woundType === "voice") {
						r.push(`A stray bullet hit ${his} neck. While ${he} fortunately avoided fatal hemorrhaging, ${his} vocal cords were irreparably damaged.`);
					} else if (woundType === "eyes") {
						r.push(`Some shrapnel found ${his} eyes as their final target, blinding ${him} permanently.`);
					} else if (woundType === "legs") {
						r.push(`A grenade landed close to ${him}, and ${his} badly mangled legs had to be amputated.`);
					} else if (woundType === "arm") {
						r.push(`A shrapnel blast mangled one of ${his} arms, which had to be amputated.`);
					} else if (woundType === "flesh") {
						r.push(`While gravely wounded, it seems ${he} will be able to fully recover, given enough time.`);
					}
					r.push(`Your troops were greatly affected by the loss of their leader.`);
				}
				if (V.SecExp.war.result === 3 && V.SecExp.settings.battle.allowSlavePrestige === 1) {
					let found;
					for (const victory of V.SecExp.battles.slaveVictories) {
						if (victory.ID === (isBodyguard ? V.BodyguardID : V.HeadGirlID)) {
							victory.victories++;
							found = 1;
							if (victory.victories >= 10) {
								if (slave.prestige < 3) {
									slave.prestige++;
									if (slave.prestige === 1) {
										slave.prestigeDesc = "$He is well known for being a great commander.";
									} else if (slave.prestige === 2) {
										slave.prestigeDesc = "$He is famous for being an incredible commander.";
									} else if (slave.prestige === 3) {
										slave.prestigeDesc = "$He is known as a legendary commander all over the world.";
									}
									victory.victories = 0;
									r.push(`${He} brought your army to victory so many times that ${his} <span class="green">prestige has increased.</span>`);
								}
							}
							break;
						}
					}
					if (!found) {
						const newSlave = {ID: (isBodyguard ? V.BodyguardID : V.HeadGirlID), victories: 0};
						V.SecExp.battles.slaveVictories.push(newSlave);
					}
				}
			}
			break;
		case "citizen":
			if (inHandler) {
				if (!FutureSocieties.isActive('FSDegradationist') && !FutureSocieties.isActive('FSPaternalist')) {
					militiaMod += 0.15;
					slaveMod -= 0.15;
				} else if (FutureSocieties.isActive('FSPaternalist')) {
					militiaMod += 0.15;
					slaveMod += 0.10;
				} else if (FutureSocieties.isActive('FSDegradationist')) {
					militiaMod += 0.15;
					slaveMod -= 0.35;
				}
				if (FutureSocieties.isActive('FSRomanRevivalist') || FutureSocieties.isActive('FSNeoImperialist')) {
					mercMod += 0.10;
					SFMod += 0.10;
				} else if (FutureSocieties.isActive('FSAntebellumRevivalist')) {
					militiaMod += 0.15;
				} else {
					mercMod -= 0.10;
					SFMod -= 0.10;
				}
				atkMod += either(-1, 1) * random(10) * 0.1;
				defMod += either(-1, 1) * random(10) * 0.1;
				tacChance += either(-1, 1) * random(20) * 0.1;
			} else {
				r.push(`One of your volunteers was the commander.`);

				if (FutureSocieties.policyActive('FSAntebellumRevivalist', 'Law2')) {
					if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
						r.push(`Your citizens' militia units are extremely proud that one of their own is leading the defense force of the city.`);
					}
					if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
						if (FutureSocieties.isActive('FSDegradationist')) {
							r.push(`Because of your degradationist society,`);
							if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
								r.push(`however,`);
							}
							r.push(`your slave soldiers are deeply distrustful of the new leader.`);
						} else if (FutureSocieties.isActive('FSPaternalist')) {
							r.push(`Thanks to your paternalistic society, your slave soldiers trust your chosen citizen to treat them as more than cannon fodder.`);
						}
					}
				} else if (FutureSocieties.isActive('FSDegradationist') && FutureSocieties.isActive('FSPaternalist')) {
					if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
						r.push(`Your volunteers are honored and pleased that one of their own is leading the defense force of the city.`);
					}
					if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
						r.push(`Your slaves${(App.Mods.SecExp.battle.deployedUnits('militia') >= 1) ? `, however,` : ``}are not thrilled by the news.`);
					}
				} else if (FutureSocieties.isActive('FSPaternalist')) {
					if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
						r.push(`Your volunteers are honored and pleased that one of their own is leading the defense force of the city.`);
					}
					if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
						r.push(`Thanks to your paternalistic society, your slave soldiers trust your chosen citizen to treat them as more than cannon fodder.`);
					}
				} else if (FutureSocieties.isActive('FSDegradationist')) {
					if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
						r.push(`Your volunteers are honored and pleased that one of their own is leading the defense force of the city.`);
					}
					if (App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
						r.push(`Because of your degradationist society,`);
						if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
							r.push(`however,`);
						}
						r.push(`your slave soldiers are deeply distrustful of the new leader.`);
					}
				}
				if (FutureSocieties.isActive('FSRomanRevivalist') && App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					r.push(`Since you decided to revive old Rome, many of your citizens took on themselves to educate themselves in martial matters, because of this your mercenaries feel safe enough in the hands of one of your volunteers.`);
				} else if (FutureSocieties.isActive('FSNeoImperialist') && App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					r.push(`Since having instituted an Imperial society, your citizens have become adept at modern warfare and your hardened mercenaries feel far more comfortable with one of your Imperial Knights in command.`);
				} else if (FutureSocieties.policyActive('FSAntebellumRevivalist', 'Law2') && App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					r.push(`Since you have revived the Antebellum South and legally sanctioned citizens' militias, your hardened mercenaries feel safe enough in the hands of one of your experienced volunteers.`);
				} else if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					r.push(`Your mercenaries are not thrilled to be lead by a civilian without any formal martial training or education.`);
				}
				if (FutureSocieties.isActive('FSRomanRevivalist') && V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
					r.push(`Since you decided to revive old Rome, many of your citizens took on themselves to educate themselves in martial matters, because of this your soldiers feel safe enough in the hands of one of your volunteers.`);
				} else if (FutureSocieties.isActive('FSNeoImperialist') && App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					r.push(`Since having instituted an Imperial society, your citizens have become adept at modern warfare and the line soldiers feel much more comfortable being commanded by one of your Imperial Knights.`);
				} else if (FutureSocieties.policyActive('FSAntebellumRevivalist', 'Law2') && V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
					r.push(`Since you have revived the Antebellum South and legally sanctioned citizens' militias, your professional soldiers feel safe enough in the hands of one of your experienced volunteers.`);
				} else if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
					r.push(`You soldiers are not thrilled to be lead by a civilian without any formal martial training or education.`);
				}
			}
			break;
		case "mercenary":
			if (inHandler) {
				mercMod += 0.10;
				SFMod += 0.10;
				if (FutureSocieties.isActive('FSRomanRevivalist') || FutureSocieties.isActive('FSNeoImperialist')) {
					militiaMod += 0.10;
				} else {
					militiaMod -= 0.10;
				}
				if (FutureSocieties.isActive('FSDegradationist')) {
					slaveMod -= 0.35;
				}
				atkMod += random(15) * 0.1;
				defMod += random(15) * 0.1;
				tacChance += random(30) * 0.1;
			} else {
				r.push(`One of your mercenary officers took command.`);
				if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					r.push(`Your mercenaries of course approve of your decision.`);
				}
				if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
					r.push(`Your soldiers feel more confident going into battle with an experienced commander.`);
				}
				if (FutureSocieties.isActive('FSRomanRevivalist') && App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
					r.push(`Since you decided to revive old Rome, your volunteers are more willing to trust one of your mercenaries as their leader.`);
				} else if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
					r.push(`Your volunteers are not enthusiastic at the prospect of being commanded around by a gun for hire.`);
				}
				if (FutureSocieties.isActive('FSDegradationist') && App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
					r.push(`Because of your degradationist society, your slave soldiers are highly distrustful of the gun for hire you forced them to accept as leader.`);
				}
			}
			break;
		case "colonel":
			if (inHandler) {
				mercMod += 0.10;
				SFMod += 0.15;
				if (FutureSocieties.isActive('FSRomanRevivalist') || FutureSocieties.isActive('FSNeoImperialist')) {
					militiaMod += 0.10;
				} else {
					militiaMod -= 0.10;
				}
				if (FutureSocieties.isActive('FSDegradationist')) {
					slaveMod -= 0.35;
				}
				atkMod += random(30) * 0.1;
				defMod += random(30) * 0.1;
				tacChance += random(40) * 0.1;
			} else {
				r.push(`The Colonel was the commander.`);
				if (App.Mods.SecExp.battle.deployedUnits('mercs') >= 1) {
					r.push(`Your mercenaries approve of such decisions, as they feel more confident by having a good, experienced commander.`);
				}
				if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.deploySF) {
					r.push(`The soldiers of ${V.SF.Lower} obviously approved of your decision.`);
				}
				if (FutureSocieties.isActive('FSRomanRevivalist') && App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
					r.push(`Since you decided to revive old Rome, your volunteers are more willing to trust one of your soldiers as their leader.`);
				} else if (FutureSocieties.isActive('FSNeoImperialist') && App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
					r.push(`Under the strict hierarchy of your Imperial society, the militia is more willing to follow the Colonel's commands.`);
				} else if (FutureSocieties.policyActive('FSAntebellumRevivalist', 'Law2') && App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
					r.push(`Your citizens' militias are reluctant to listen to the Colonel's commands, but begrudgingly accept.`);
				} else if (App.Mods.SecExp.battle.deployedUnits('militia') >= 1) {
					r.push(`Your volunteers are not enthusiastic at the prospect of being commanded around by an old style military officer.`);
				}
				if (FutureSocieties.isActive('FSDegradationist') && App.Mods.SecExp.battle.deployedUnits('slaves') >= 1) {
					r.push(`Because of your degradationist society, your slave soldiers are highly distrustful of the soldier you forced them to accept as leader.`);
				}
			}
	}

	if (!inHandler && ["citizen", "mercenary", "colonel"].includes(commander) && V.SecExp.war.leaderWounded) {
		r.push(`During the battle a stray bullet managed to reach them. Your troops were greatly affected by the loss.`);
	}

	if (inHandler) {
		return {
			slaveMod,
			militiaMod,
			mercMod,
			SFMod,
			enemyMod,
			atkMod,
			defMod,
			tacChance,
		};
	} else {
		return r;
	}
};

App.Mods.SecExp.upkeep = (function() {
	return {
		cost,
		edictsAuth
	};

	function cost() {
		let secExpCost = 0;
		if (V.secExpEnabled > 0) {
			const soldierMod = 1 + V.SecExp.edicts.defense.soldierWages * 0.5; // 1.0, 1.5, 2.0
			secExpCost += edictsCash();
			secExpCost += SF();
			secExpCost += buildings();
			for (const [unit, info] of Array.from(App.Mods.SecExp.unit.list()).slice(1)) {
				secExpCost += V.SecExp.units[unit].squads.reduce((acc, s) => acc + s.troops * 10 * info.costMod * soldierMod, 0);
			}
		}
		return secExpCost;
		/** Upkeep cost of edicts, in cash
		 * @returns {number}
		 */
		function edictsCash() {
			let value = 0;
			if (V.SecExp.edicts.slaveWatch) { value++; }
			if (V.SecExp.edicts.subsidyChurch) { value++; }
			if (V.SecExp.edicts.tradeLegalAid) { value++; }
			if (V.SecExp.edicts.propCampaignBoost) { value++; }

			if (V.SecExp.edicts.defense.martialSchool) { value++; }

			if (V.SecExp.edicts.defense.legionTradition) { value++; }
			if (V.SecExp.edicts.defense.pharaonTradition) { value++; }
			if (V.SecExp.edicts.defense.eagleWarriors) { value++; }
			if (V.SecExp.edicts.defense.ronin) { value++; }
			if (V.SecExp.edicts.defense.mamluks) { value++; }
			if (V.SecExp.edicts.defense.sunTzu) { value++; }
			if (V.SecExp.edicts.defense.southronTradition) { value++; }

			return value * 1000;
		}
		/** Upkeep cost of Special Forces support edicts. They allow the two mods an additional layer of in-universe interaction.
		 * @returns {number}
		 */
		function SF() {
			let value = 0;
			if (V.SecExp.edicts.SFSupportLevel >= 1) {
				value += 1000;
			}
			if (V.SecExp.edicts.SFSupportLevel >= 2) {
				value += 2000;
			}
			if (V.SecExp.edicts.SFSupportLevel >= 3) {
				value += 3000;
			}
			if (V.SecExp.edicts.SFSupportLevel >= 4) {
				value += 3000;
			}
			if (V.SecExp.edicts.SFSupportLevel >= 5) {
				value += 4000;
			}
			return value;
		}
		/** Upkeep cost of buildings (in cash)
		 * @returns {number}
		 */
		function buildings() {
			let value = 0;
			const base = V.facilityCost * 5; const upgrade = 50;
			if (V.SecExp.buildings.propHub) {
				value += base + upgrade * Object.values(V.SecExp.buildings.propHub.upgrades).reduce((a, b) => a + b);
			}
			if (V.SecExp.buildings.secHub) {
				value += base + 20 * V.SecExp.buildings.secHub.menials;
				value += upgrade * Object.values(V.SecExp.buildings.secHub.upgrades.security).reduce((a, b) => a + b);
				value += upgrade * Object.values(V.SecExp.buildings.secHub.upgrades.crime).reduce((a, b) => a + b);
				value += upgrade * Object.values(V.SecExp.buildings.secHub.upgrades.readiness).reduce((a, b) => a + b);
				value += upgrade * Object.values(V.SecExp.buildings.secHub.upgrades.intel).reduce((a, b) => a + b);
				value += V.SecExp.edicts.SFSupportLevel >= 5 ? 1000 : 0;
			}
			if (V.SecExp.buildings.barracks) {
				value += base + upgrade * Object.values(V.SecExp.buildings.barracks).reduce((a, b) => a + b);
			}
			if (V.SecExp.buildings.riotCenter) {
				value += base + upgrade * Object.values(V.SecExp.buildings.riotCenter.upgrades).reduce((a, b) => a + b);
				if (V.SecExp.buildings.riotCenter.brainImplant < 106 && V.SecExp.buildings.riotCenter.brainImplantProject > 0) {
					value += 5000 * V.SecExp.buildings.riotCenter.brainImplantProject;
				}
				if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.rebellions.sfArmor) {
					value += 15000;
				}
			}
			return value;
		}
	}
	/** Upkeep cost of edicts, in authority
	 * @returns {number}
	 */
	function edictsAuth() {
		let value = 0;
		if (V.SecExp.edicts.enslavementRights > 0) {
			value += 10;
		}
		if (V.SecExp.edicts.sellData === 1) {
			value += 10;
		}
		if (V.SecExp.edicts.defense.privilege.slaveSoldier === 1) {
			value += 10;
		}
		if (V.SecExp.edicts.weaponsLaw === 0) {
			value += 30;
		} else if (V.SecExp.edicts.weaponsLaw === 1) {
			value += 20;
		} else if (V.SecExp.edicts.weaponsLaw === 2) {
			value += 10;
		}
		if (V.SecExp.edicts.defense.slavesOfficers === 1) {
			value += 10;
		}
		return value;
	}
})();

/** Reports changes to the supplied unit's loyalty.
 * @param {FC.SecExp.PlayerHumanUnitData} input the unit type to be checked.
 * @returns {HTMLDivElement}
 */
App.Mods.SecExp.humanLoyaltyChanges = function(input) {
	let loyaltyChange = 0;
	let el = document.createElement("div");
	const type = App.Mods.SecExp.unit.checkID(input.ID);

	el.append(`${input.platoonName}: `);
	if (V.SecExp.buildings.barracks && V.SecExp.buildings.barracks.loyaltyMod >= 1) {
		el.append("is periodically sent to the indoctrination facility in the barracks for thought correction therapy. ");
		loyaltyChange += 2 * V.SecExp.buildings.barracks.loyaltyMod;
	}
	if (input.commissars >= 1) {
		el.append("The commissars attached to the unit carefully monitor the officers and grunts for signs of insubordination. ");
		loyaltyChange += 2 * input.commissars;
	}
	if (V.SecExp.edicts.defense.soldierWages === 2) {
		if (type === 'slaves') {
			el.append("The slaves greatly appreciate the generous wage given to them for their service as soldiers. Occasions to earn money for a slave are scarce after all. ");
		} else if (type === 'militia') {
			el.append("The soldiers greatly appreciate the generous wage given to them for their service. They are proud to defend their homes while making a small fortune out of it. ");
		} else if (type === 'mercs') {
			el.append("The mercenaries greatly appreciate the generous wage given to them for their service. After all coin is the fastest way to reach their hearts. ");
		}
		loyaltyChange += random(5, 10);
	} else if (V.SecExp.edicts.defense.soldierWages === 1) {
		if (type === 'slaves') {
			el.append("The slaves appreciate the wage given to them for their service as soldiers, despite it being just adequate. Occasions to earn money for a slave are scarce after all. ");
		} else if (type === 'militia') {
			el.append("The soldiers appreciate the wage given to them for their service, despite it being just adequate. They are proud to defend their homes, though at the cost of possible financial gains. ");
		} else if (type === 'mercs') {
			el.append("The mercenaries do not appreciate the barely adequate wage given to them for their service. Still their professionalism keeps them determined to finish their contract. ");
		}
		loyaltyChange += random(-5, 5);
	} else {
		if (type === 'slaves') {
			el.append("The slaves do not appreciate the low wage given to them for their service as soldiers, but occasions to earn money for a slave are scarce, so they're not too affected by it. ");
		} else if (type === 'militia') {
			el.append("The soldiers do not appreciate the low wage given to them for their service. Their sense of duty keeps them proud of their role as defenders of the arcology, but many do feel its financial weight. ");
		} else if (type === 'mercs') {
			el.append("The mercenaries do not appreciate the low wage given to them for their service. Their skill would be better served by a better contract and this world does not lack demand for guns for hire. ");
		}
		loyaltyChange -= random(5, 10);
	}
	if (type === 'slaves' && V.SecExp.edicts.defense.privilege.slaveSoldier) {
		el.append("Allowing them to hold material possessions earns you their devotion and loyalty. ");
		loyaltyChange += random(1, 2);
	}
	if (type === 'militia' && V.SecExp.edicts.defense.privilege.militiaSoldier) {
		el.append("Allowing them to avoid rent payment for their military service earns you their happiness and loyalty. ");
		loyaltyChange += random(1, 2);
	}
	if (type === 'mercs' && V.SecExp.edicts.defense.privilege.mercSoldier) {
		el.append("Allowing them to keep part of the loot gained from your enemies earns you their trust and loyalty. ");
		loyaltyChange += random(1, 2);
	}

	el.append("This week, the loyalty of this unit ");
	if (loyaltyChange > 0) {
		App.UI.DOM.appendNewElement("span", el, "increased.", "green");
	} else if (loyaltyChange === 0) {
		App.UI.DOM.appendNewElement("span", el, "did not change.", "yellow");
	} else {
		App.UI.DOM.appendNewElement("span", el, "decreased.", "red");
	}
	input.loyalty = Math.clamp(input.loyalty + loyaltyChange, 0, 100);
	if (input.training < 100 && V.SecExp.buildings && V.SecExp.buildings.barracks.training >= 1) {
		App.UI.DOM.appendNewElement("div", el, "The unit is able to make use of the training facilities to better prepare its soldiers, slowly increasing their experience level. ");
		input.training += random(2, 4) * 1.5 * V.SecExp.buildings.barracks.training;
	}

	return el;
};
