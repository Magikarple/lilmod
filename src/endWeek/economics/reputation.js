/**
 * @returns {HTMLElement}
 */
App.EndWeek.reputation = function() {
	const el = document.createElement("p");
	let r = [];
	let repLoss;

	if (V.useTabs === 0) {
		App.UI.DOM.appendNewElement("h2", el, `Reputation`);
	}
	r.push(`On formal occasions, you are announced as ${PCTitle()}.`);
	if (FutureSocieties.isActive('FSChattelReligionist')) {
		if (V.arcologies[0].FSChattelReligionistCreed === 1) {
			r.push(`${V.arcologies[0].name} keeps the creed of the ${V.nicaea.name}. The faithful`);
			if (V.nicaea.achievement === "slaves") {
				if (V.slaves.length > 50) {
					r.push(`<span class="green">strongly approve</span> of the large`);
					FutureSocieties.Change("Chattel Religionist", 5);
				} else if (V.slaves.length > 20) {
					r.push(`<span class="green">approve</span> of the good`);
					FutureSocieties.Change("Chattel Religionist", 2);
				} else {
					r.push(`are not impressed by the`);
				}
				r.push(`number of people you're giving the honor of sexual servitude.`);
			} else if (V.nicaea.achievement === "devotion") {
				if (V.averageDevotion > 80) {
					r.push(`<span class="green">strongly approve</span> of the worshipfulness`);
					FutureSocieties.Change("Chattel Religionist", 5);
				} else if (V.averageDevotion > 50) {
					r.push(`<span class="green">approve</span> of the devotion`);
					FutureSocieties.Change("Chattel Religionist", 2);
				} else {
					r.push(`are not impressed by the devotion`);
				}
				r.push(`of your slaves.`);
			} else {
				if (V.averageTrust > 50) {
					r.push(`<span class="green">strongly approve</span> of the great trust your slaves place in you.`);
					FutureSocieties.Change("Chattel Religionist", 5);
				} else if (V.averageTrust > 20) {
					r.push(`<span class="green">approve</span> of the trust your slaves place in you.`);
					FutureSocieties.Change("Chattel Religionist", 2);
				} else {
					r.push(`are not impressed by the fear many of your slaves feel towards you.`);
				}
			}
		}
	}

	let repDecay = 0.05;
	let enduringRep = V.enduringRep;
	let maximumRep = V.maximumRep;
	if (V.arcologies[0].FSChattelReligionistLaw === 1) {
		enduringRep = Math.min(enduringRep + 2000, 12000);
		if (maximumRep < enduringRep) {
			maximumRep = enduringRep;
		}
	}
	if (V.arcologies[0].FSRestartDecoration === 100) {
		enduringRep = Math.min(enduringRep + 2000, 13000);
		/* that 13000 is not a typo, it allows for some stacking of FSRestart and FSChattel */
		if (maximumRep < enduringRep) {
			maximumRep = enduringRep;
		}
	}
	if (V.rep > enduringRep) {
		if (V.arcologies[0].FSMaturityPreferentialistLaw === 1) {
			if (V.PC.actualAge >= 65) {
				r.push(`Since you're getting on in years and have an impressive list of accomplishments, and ${V.arcologies[0].name}'s society respects age, your reputation degrades quite slowly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay - 0.02));
			} else if (V.PC.actualAge >= 50) {
				r.push(`Since you're well into middle age and have an impressive list of accomplishments, and ${V.arcologies[0].name}'s society respects age, your reputation degrades quite slowly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay - 0.0125));
			} else if (V.PC.actualAge < 13) {
				r.push(`Since you're nothing more than a child, and ${V.arcologies[0].name}'s society respects age, your reputation may as well not even exist.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.035));
			} else if (V.PC.actualAge < 18) {
				r.push(`Since ${V.arcologies[0].name}'s society respects age, and you are so young you haven't even finished growing yet, your reputation rapidly degrades.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.02));
			} else if (V.PC.actualAge < 35) {
				r.push(`Since you're unusually young for an arcology owner, and ${V.arcologies[0].name}'s society respects age, your reputation degrades quite quickly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.0125));
			} else {
				r.push(`Since you're only entering middle age, and ${V.arcologies[0].name}'s society respects age, your reputation degrades fairly quickly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay));
			}
		} else if (V.arcologies[0].FSYouthPreferentialistLaw === 1) {
			if (V.PC.actualAge >= 65) {
				r.push(`Since you're getting on in years and have an impressive list of accomplishments, but ${V.arcologies[0].name}'s society is coming to prefer youth to experience, so your reputation degrades fairly quickly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.0125));
			} else if (V.PC.actualAge >= 50) {
				r.push(`You're well into middle age and have an impressive list of accomplishments, but ${V.arcologies[0].name}'s society is coming to prefer youth to experience, so your reputation degrades fairly quickly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.0125));
			} else if (V.PC.actualAge < 13) {
				r.push(`You're still a child, and while ${V.arcologies[0].name}'s society is coming to prefer youth to experience, you are beyond what they can accept.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.0125));
			} else if (V.PC.actualAge < 18) {
				r.push(`You're extremely young for an arcology owner, and while ${V.arcologies[0].name}'s society is coming to prefer youth to experience, you are pushing their limits.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay));
			} else if (V.PC.actualAge < 35) {
				r.push(`You're unusually young for an arcology owner, but ${V.arcologies[0].name}'s society doesn't mind.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay - 0.0125));
			} else {
				r.push(`Since you're entering middle age, and ${V.arcologies[0].name}'s society respects youth, your reputation degrades fairly quickly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.0125));
			}
		} else {
			if (V.PC.actualAge >= 65) {
				r.push(`Since you're getting on in years and have an impressive list of accomplishments, and ${V.arcologies[0].name}'s society respects age, your reputation degrades quite slowly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay - 0.0125));
			} else if (V.PC.actualAge >= 50) {
				r.push(`Since you're well into middle age and have an impressive list of accomplishments, your reputation degrades fairly slowly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay - 0.0125));
			} else if (V.PC.actualAge < 13) {
				r.push(`Since you're a child and are expected to have accomplished nothing, it is difficult to maintain any reputation at all.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.035));
			} else if (V.PC.actualAge < 18) {
				r.push(`Since you're extremely young and have few accomplishments, your reputation degrades very quickly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.02));
			} else if (V.PC.actualAge < 35) {
				r.push(`Since you're unusually young for an arcology owner, your reputation degrades fairly quickly.`);
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay + 0.0125));
			} else {
				repLoss = Math.trunc((V.rep - enduringRep) * (repDecay));
			}
		}
		if (V.arcologies[0].FSChattelReligionistLaw === 1) {
			if (repLoss > 100) {
				repLoss -= 100;
				V.PC.degeneracy = 0;
			} else {
				repLoss = 0;
				V.PC.degeneracy = 0;
			}
			r.push(`Since you are the Prophet, your reputation degrades less.`);
		}
		if (V.arcologies[0].FSRestartDecoration === 100) {
			if (repLoss > 100) {
				repLoss -= 100;
				V.PC.degeneracy = 0;
			} else {
				repLoss = 100;
				V.PC.degeneracy = 0;
			}
			r.push(`Since you are an established member of the Societal Elite, your public reputation degrades less.`);
		}
		if (enduringRep > 8000) {
			r.push(`However, you have been a figure of renown for so long that much of your reputation has become permanent.`);
		} else if (enduringRep > 5000) {
			r.push(`However, you have been a figure of repute for enough time that part of your reputation has become permanent.`);
		} else if (enduringRep > 2000) {
			r.push(`However, you have been a figure of regard for long enough that some of your reputation has become permanent.`);
		}
		if (repLoss > 500 * (1 - (5 - V.baseDifficulty) / 10)) {
			repLoss = 500 * (1 - (5 - V.baseDifficulty) / 10);
		} else if (repLoss < 0) {
			repLoss = 0;
		}
		const enduringRepToGain = Math.trunc(1 + Math.pow((10000 - V.enduringRep) / 5770, 2) * repLoss * 0.1);
		if (enduringRep + enduringRepToGain > maximumRep) {
			V.enduringRep = maximumRep;
			V.maximumRep += enduringRepToGain; // maybe?
		} else {
			V.enduringRep += enduringRepToGain;
		}
	} else {
		if (V.arcologies[0].FSChattelReligionistLaw === 1 || V.arcologies[0].FSRestartDecoration === 100) {
			V.PC.degeneracy = 0;
		}
		repLoss = 0;
		if (enduringRep > 8000) {
			r.push(`You have been a figure of renown for so long that your reputation does not decay past its present level.`);
		} else if (enduringRep > 5000) {
			r.push(`You have been a figure of repute for enough time that your reputation does not decay past its present level.`);
		} else if (enduringRep > 2000) {
			r.push(`You have been a figure of regard for long enough that your reputation does not decay past its present level.`);
		}
	}

	/* play games with overflow. Gains are calculated (and then sadly rounded) on previous pages but losses are calculated here, after the overflow happened. Let's borrow from the past.*/
	if (V.lastWeeksRepExpenses.overflow < 0) {
		V.rep += Math.abs(V.lastWeeksRepExpenses.overflow);
		V.lastWeeksRepExpenses.overflow = 0;
	}
	repX(forceNeg(repLoss), "multiplier");

	if (V.weatherAwareness === 0 && V.weatherCladding === 2) {
		r.push(`The public <span class="green">is awestruck</span> by the beautiful weather hardening you have applied to the arcology's exterior, though they do not understand why you would waste so much money first ruining your arcology's appearance by doing this.`);
		repX(10, "architecture");
	} else if (V.weatherAwareness === 0 && V.weatherCladding === 1) {
		r.push(`The public <span class="red">disapproves</span> of the ugly weather hardening you have applied to the arcology's exterior, not understanding what you're worried about.`);
		repX(-100, "architecture");
	}

	enduringRep = V.enduringRep;
	if (V.arcologies[0].FSRestartDecoration === 100) {
		r.push(`As a member of the Societal Elite, your appearance has no bearing on your reputation.`);
	} else {
		if (V.PC.dick === 0 && V.PC.boobs >= 300 && V.PC.title === 0) { // 5.0.0
			if (V.rep > 18000 - enduringRep) {
				r.push(`Your reputation is so well-established that society has accepted your notoriously feminine appearance despite how unusual it is for a prominent slaveowner to look like you do.`);
				if (V.arcologies[0].FSGenderRadicalist > 30) {
					r.push(`Indeed, society sees you as entirely male, since you are powerful, and <span class="green">strongly approves</span> of your nonconformity; this advances the redefinition of gender around power.`);
					FutureSocieties.Change("Gender Radicalist", 5);
				} else if (V.arcologies[0].FSGenderFundamentalist > 30) {
					r.push(`Indeed, society has been reconciled to female leadership, preferring to see you as a mother figure.`);
				}
			} else if (V.arcologies[0].FSGenderRadicalist > 40) {
				r.push(`Society accepts you as an arcology owner, since it has become open-minded about power and gender.`);
				if (V.arcologies[0].FSGenderRadicalist > 50) {
					r.push(`Indeed, society sees you as fundamentally male, since you are powerful, and <span class="green">strongly approves</span> of your audacity; this advances the redefinition of gender around power.`);
					FutureSocieties.Change("Gender Radicalist", 5);
				}
			} else {
				r.push(`Most prominent slaveowners are male, and your obviously feminine appearance makes it <span class="red">harder for you to maintain your reputation.</span>`);
				repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCappearance");
				if (V.arcologies[0].FSGenderFundamentalist > 10) {
					r.push(`Society <span class="red">strongly resents</span> your being an arcology owner; this damages the idea that women should not be in positions of responsibility.`);
					FutureSocieties.Change("Gender Fundamentalist", -5);
				}
			}
		} else if ((V.PC.boobs >= 300) || V.PC.title === 0) {
			if (V.rep > 15000 - enduringRep) {
				r.push(`Your reputation is so strong that society has accepted your feminine appearance despite how unusual it is for a prominent slaveowner to look like you do.`);
				if (V.arcologies[0].FSGenderRadicalist > 30) {
					r.push(`Indeed, society sees you as entirely male, since you are powerful, and <span class="green">strongly approves</span> of your nonconformity; this advances the redefinition of gender around power.`);
					FutureSocieties.Change("Gender Radicalist", 5);
				} else if (V.arcologies[0].FSGenderFundamentalist > 30) {
					r.push(`Indeed, society has been reconciled to your feminine appearance, seeing you as a person apart.`);
				}
			} else if (V.arcologies[0].FSGenderRadicalist > 20) {
				r.push(`Society accepts you as an arcology owner, since it has become open-minded anyone who has a cock and fucks.`);
				if (V.arcologies[0].FSGenderRadicalist > 30) {
					r.push(`Indeed, society sees you as dominant, since you fuck bitches, and <span class="green">strongly approves</span> of your nonconformity; this advances the redefinition of gender around power.`);
					FutureSocieties.Change("Gender Radicalist", 5);
				}
			} else {
				r.push(`Most prominent slaveowners are very masculine, and your feminine appearance makes it <span class="red">harder for you to maintain your reputation.</span>`);
				repX(forceNeg(Math.min((V.rep * 0.025), 250)), "PCappearance");
				if (V.arcologies[0].FSGenderFundamentalist > 30) {
					r.push(`Society <span class="red">strongly resents</span> your being an arcology owner; this damages the idea that feminine people should not be in positions of responsibility.`);
					FutureSocieties.Change("Gender Fundamentalist", -5);
				}
			}
		} else if ((V.PC.dick === 0) || (V.PC.vagina !== -1)) {
			if (V.rep > 15000 - enduringRep) {
				r.push(`Your reputation is so strong that society has accepted your unorthodox arrangement downstairs, for an arcology owner.`);
				if (V.arcologies[0].FSGenderRadicalist > 30) {
					r.push(`Indeed, society sees you as entirely male, since you are powerful, and <span class="green">strongly approves</span> of your nonconformity; this advances the redefinition of gender around power.`);
					FutureSocieties.Change("Gender Radicalist", 5);
				} else if (V.arcologies[0].FSGenderFundamentalist > 30) {
					r.push(`Indeed, society has been reconciled to your strangeness, seeing you as a person apart.`);
				}
			} else if (V.arcologies[0].FSGenderRadicalist > 20) {
				r.push(`Society accepts you as an arcology owner, since it has become open-minded about the exact genital layout of powerful people.`);
				if (V.arcologies[0].FSGenderRadicalist > 30) {
					r.push(`Indeed, society sees you as dominant, since you are powerful, and <span class="green">strongly approves</span> of your nonconformity; this advances the redefinition of gender around power.`);
					FutureSocieties.Change("Gender Radicalist", 5);
				}
			} else {
				r.push(`Most prominent slaveowners are very masculine, and though your unorthodox arrangement downstairs isn't obvious when you're clothed, the rumors are unavoidable and it's <span class="red">harder for you to maintain your reputation.</span>`);
				repX(forceNeg(Math.min((V.rep * 0.025), 250)), "PCappearance");
				if (V.arcologies[0].FSGenderFundamentalist > 30) {
					r.push(`Society <span class="red">strongly resents</span> your being an arcology owner; this damages the idea that people who are not men should not be in positions of responsibility.`);
					FutureSocieties.Change("Gender Fundamentalist", -5);
				}
			}
		}
	}

	if (V.arcologies[0].FSChattelReligionistLaw === 1 || V.arcologies[0].FSRestartDecoration === 100) {
		/* already handled above */
	} else if (FutureSocieties.isActive('FSPetiteAdmiration')) {
		if (V.PC.height < Height.mean(V.PC) - 5) {
			if (V.rep > 10000 - enduringRep) {
				r.push(`You are regarded well enough that society has chosen to overlook your lack of height. Having a leader that blends into the slave population sows confusion over whether or not citizens should be short or tall, <span class="red">impeding</span> cultural development.`);
				FutureSocieties.Change("Petite Admiration", -5);
			} else {
				r.push(`Since you are too short to stand out from the slave population, society has chosen to ignore you instead of being bothered by it. While great for not damaging cultural development, <span class="red">being overlooked</span> does your reputation no favors.</span>`);
				repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCappearance");
			}
		}
	} else if (FutureSocieties.isActive('FSStatuesqueGlorification')) {
		if (V.PC.height < Height.mean(V.PC) + 5) {
			if (V.rep > 10000 - enduringRep) {
				r.push(`You are regarded well enough that society has accepted your lack of height, though you doubt that they'll ever stop recommending platform shoes.`); // 5.0.0 heels
			} else {
				r.push(`Since you are too short to be worthy of society's attention, they simply <span class="red">ignore you.</span>`);
				repX(forceNeg(Math.min((V.rep * 0.05), 750)), "PCappearance");
			}
		}
	}

	if (V.arcologies[0].FSChattelReligionistLaw === 1 || V.arcologies[0].FSRestartDecoration === 100) {
		/* already handled above */
	} else if (FutureSocieties.isActive('FSIntellectualDependency')) {
		if (V.PC.intelligence + V.PC.intelligenceImplant < -10) {
			if (V.rep > 18000 - enduringRep) {
				r.push(`You've somehow built such a reputation for yourself that your lack of a brain is no longer a societal concern.`);
			} else {
				repX(forceNeg(Math.min((V.rep * 0.025), 100)), "PCappearance");
				r.push(`Society <span class="red">is uncomfortable</span> with just how slow you are. While they may find your mannerisms cute, it is not befitting of a leader.`);
			}
		}
	} else if (FutureSocieties.isActive('FSSlaveProfessionalism')) {
		if (V.PC.intelligence + V.PC.intelligenceImplant < 100) {
			if (V.rep > 18000 - enduringRep) {
				r.push(`You've built such a reputation for yourself that you not being a genius is no longer a societal concern.`);
			} else {
				repX(forceNeg(Math.min((V.rep * 0.05), 750)), "PCappearance");
				r.push(`Society <span class="red">strongly despises</span> being led by someone so easily outsmarted by even the slave population.`);
				FutureSocieties.Change("Slave Professionalism", -10);
			}
		}
	} else if (V.PC.intelligence + V.PC.intelligenceImplant <= 10) {
		if (V.rep > 18000 - enduringRep) {
			r.push(`You've managed to build such a reputation for yourself that your lack of intelligence is no longer a societal concern.`);
		} else {
			repX(forceNeg(Math.min((V.rep * 0.05), 750)), "PCappearance");
			r.push(`Society <span class="red">is uncomfortable</span> being led by someone not smart. Your lack of intelligence brings your every action under scrutiny.`);
		}
	} else if (V.PC.intelligence + V.PC.intelligenceImplant <= 50) {
		if (V.rep > 12000 - enduringRep) {
			r.push(`You've built such a reputation for yourself that your lack of intelligence is no longer a societal concern.`);
		} else {
			repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCappearance");
			r.push(`Society <span class="red">is uncomfortable</span> being led by someone not very smart. Your lack of intelligence brings your every action under scrutiny.`);
		}
	}

	if (V.policies.sexualOpenness === 1) {
		const acceptance = penetrativeSocialUse() > 50 ? Math.max(Math.floor((penetrativeSocialUse() - 50) ** 2) + 500, 0) : 0; // 0 or from 500 to 3000
		if (V.arcologies[0].FSChattelReligionistLaw === 1 || V.arcologies[0].FSRestartDecoration === 100) {
			/* already handled above */
		} else {
			if (FutureSocieties.isActive('FSGenderRadicalist')) {
				if (V.rep > 18000 - enduringRep - acceptance) {
					r.push(`You are so well regarded that society has acquiesced that getting penetrated is not a sure sign of femininity.`);
				} else {
					r.push(`Society views getting fucked as sign of femininity and is <span class="red">strongly against your sexual preferences.</span>`);
					FutureSocieties.Change("Gender Radicalist", -1);
					repX(-1000, "PCactions");
				}
			} else if (FutureSocieties.isActive('FSGenderFundamentalist') && V.PC.vagina !== -1 && V.PC.title === 0) {
				if (V.rep > 10000 - enduringRep - acceptance) {
					r.push(`Society has grown accustomed to your efforts enough to not care that you enjoy slave dick. In fact, it even <span class="green">strengthens</span> traditional gender roles, even though you insist on breaking them.`);
					FutureSocieties.Change("Gender Fundamentalist", 1);
				} else {
					r.push(`Society wonders if you would be happier in a whore house getting fucked all day instead of trying to lead an arcology. Your efforts <span class="red">strongly support</span> the idea that women should not be in positions of responsibility.`);
					FutureSocieties.Change("Gender Fundamentalist", -3);
					repX(-1000, "PCactions");
				}
			} else {
				if (V.rep > 15000 - enduringRep - acceptance) {
					r.push(`You are so well liked that society has accepted that you enjoy taking everything a slave has to offer.`);
				} else {
					r.push(`Society finds your penchant for taking slave dick <span class="red">very distasteful</span> for a slaveowner.`);
					repX(-500, "PCactions");
				}
			}
		}
	}

	if (V.secExpEnabled > 0) {
		if (V.SecExp.smilingMan.progress === 20) {
			r.push(`The grim statue of the Smiling Man outside your arcology <span class="green">reminds the world of who managed to eliminate such a threat.</span>`);
			repX(100, "architecture");
		}
		if (V.SecExp.edicts.weaponsLaw === 3) {
			r.push(`The absence of any kind of restriction on weaponry within your arcology is <span class="green">welcomed by your citizens</span> as sign of your respect for the ideals the Free Cities stand for.`);
			repX(20, "edicts");
		}
		if (V.SecExp.buildings.propHub && V.SecExp.buildings.propHub.upgrades.fakeNews > 0) {
			r.push(`The authenticity department produces and distributes copious amounts of plausible enough news and reports, <span class="green">increasing your reputation.</span>`);
			repX(10 * V.SecExp.buildings.propHub.upgrades.fakeNews, "policies");
		}
		const activeUnits = App.Mods.SecExp.battle.activeUnits();
		if (activeUnits >= 4) {
			r.push(`Your military is`);
			if (activeUnits >= 9) {
				r.push(`<span class="green">massive; commanding so many troops greatly</span>`);
			} else if (activeUnits >= 7) {
				r.push(`<span class="green">huge; commanding such a number of soldiers</span>`);
			} else if (activeUnits >= 4) {
				r.push(`<span class="green">at a decent size; commanding a small army</span>`);
			}
			r.push(`increases your reputation.`);
			repX(12 * activeUnits, "securityExpansion");
		}
	}

	if (V.SF.Toggle && V.SF.Active >= 1 && V.SF.UC.Assign > 0) {
		const sfArray = [];
		sfArray.push(`Assigning a ${V.SF.UC.Assign === 1 ? 'small' : 'large'}`);
		sfArray.push(`portion of ${V.SF.Lower} to <span class="green">undercover work, slightly boosts your reputation.</span>`);
		App.Events.addNode(el, sfArray, "div");
		repX(V.SF.ArmySize * (V.SF.UC.Assign === 1 ? 0.05 : 0.25), "specialForces");
	} else if (V.SF.Toggle && V.SF.FS.Tension > 100 && App.Mods.SF.fsIntegration.crisis()[1] === "ISOLATION") {
		r.push(App.UI.DOM.makeElement("div", `Your citizens are <span class="red">very displeased</span> that you are hosting a legion of heavily armed squatters in your basement.`));
		repX(forceNeg(V.SF.ArmySize + App.Mods.SF.upgrades.total()), "specialForces");
	}

	if (FutureSocieties.isActive('FSSupremacist')) {
		if (V.PC.race === V.arcologies[0].FSSupremacistRace) {
			r.push(`Since you are a member of the ${V.PC.race} race, society <span class="green">strongly approves</span> of your ownership of the arcology.`);
			FutureSocieties.Change("Supremacist", 5);
		}
	} else if (FutureSocieties.isActive('FSSubjugationist')) {
		if (V.PC.race === V.arcologies[0].FSSubjugationistRace) {
			if (V.rep > 15000 - enduringRep) {
				r.push(`Your reputation is so strong that society has accepted your ${V.PC.race}ness despite you being an inferior race.`);
			} else {
				r.push(`Society <span class="red">loathes;</span> being lead by an inferior ${V.PC.race}, believing that any other race would make a far better leader than you.`);
				repX(forceNeg(200 * (V.arcologies[0].FSSubjugationist / V.FSLockinLevel)), "PCappearance");
			}
		}
	}

	if (FutureSocieties.isActive('FSAssetExpansionist')) {
		if (V.PC.boobs >= 1400) {
			r.push(`Society loves enormous breasts and you are no exception; your`);
			if (V.PC.boobsImplant > 0) {
				r.push(`chest balloons`);
			} else {
				r.push(`cow tits`);
			}
			r.push(`<span class="green">improve</span> your public image.`);
			repX((V.PC.boobs / 100), "PCappearance");
		} // 5.0.0 flat chest player malus
		if (V.PC.butt >= 5) {
			r.push(`Society loves big butts and you are no exception; your`);
			if (V.PC.buttImplant > 0) {
				r.push(`inflated ass`);
			} else {
				r.push(`fat ass`);
			}
			r.push(`<span class="green">improves</span> your public image.`);
			repX((2 * V.PC.butt), "PCappearance");
		} else if (V.PC.butt <= 1) {
			r.push(`Society loves big butts and yours is nothing short of <span class="red">disappointing.</span> Citizens often giggle at the lack of junk in your trunk.`);
			repX(forceNeg(10), "PCappearance");
		}
		if (V.PC.dick >= 7) {
			r.push(`Society adores huge cocks and yours is particularly popular; your meaty sausage <span class="green">improves</span> your public image.`);
			repX((3 * V.PC.dick), "PCappearance");
		} else if (V.PC.dick > 0 && V.PC.dick < 3 && V.PC.physicalAge > 12) {
			r.push(`Society adores huge cocks and yours is anything but; your pathetic wiener <span class="green">ruins</span> your public image.`);
			repX(forceNeg(100), "PCappearance");
		}
		if (V.PC.balls >= 9) {
			r.push(`Society loves big things and the bulge in your crotch is no exception; your swollen balls <span class="green">improve</span> your public image.`);
			repX(V.PC.balls, "PCappearance");
		}
	} else if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
		if (V.PC.boobs >= 1000) {
			r.push(`Society finds big breasts unsightly and you are no exception; your`);
			if (V.PC.boobsImplant > 0) {
				r.push(`chest balloons`);
			} else {
				r.push(`fat tits`);
			}
			r.push(`<span class="red">harm</span> your public image.`);
			repX(forceNeg((V.PC.boobs / 100) * 3), "PCappearance");
		}
		if (V.PC.butt >= 5) {
			r.push(`Society finds big butts unsightly and you are no exception; your`);
			if (V.PC.buttImplant > 0) {
				r.push(`inflated ass`);
			} else {
				r.push(`fat ass`);
			}
			r.push(`<span class="red">harms</span> your public image.`);
			repX(forceNeg(10 * V.PC.butt), "PCappearance");
		}
	}

	if (FutureSocieties.isActive('FSTransformationFetishist')) {
		if (V.PC.faceImplant > 30) {
			r.push(`Society can tell you've had work done on your face; your uncanny appearance <span class="green">improves</span> your public image.`);
			repX((V.PC.faceImplant / 5), "PCappearance");
		}
		if (V.PC.boobsImplant > 0) {
			r.push(`Society loves fake breasts and yours are no exception; your breast implants <span class="green">improve</span> your public image.`);
			repX((V.PC.boobsImplant / 5), "PCappearance");
		}
		if (V.PC.buttImplant > 0) {
			r.push(`Society loves fake butts and yours are no exception; your ass implants <span class="green">improve</span> your public image.`);
			repX((7 * V.PC.buttImplant), "PCappearance");
		}
		if (V.PC.lipsImplant > 0) {
			r.push(`Society loves fake lips and yours are no exception; your inflated kisser <span class="green">improves</span> your public image.`);
			repX((V.PC.lipsImplant / 20), "PCappearance");
		}
		if (V.PC.bellyImplant > 0) {
			r.push(`Society loves everything augmented and the distinct curve to your abdomen is no exception; your belly implant <span class="green">improves</span> your public image.`);
			repX((V.PC.bellyImplant / 5000), "PCappearance");
		}
		if (V.PC.ballsImplant > 0) {
			r.push(`Society loves everything augmented and the bulge in your crotch is no exception; your swollen balls <span class="green">improve</span> your public image.`);
			repX((5 * (V.PC.ballsImplant)), "PCappearance");
		}
		if (V.PC.heightImplant < -1 || V.PC.heightImplant > 1 || (V.PC.hipsImplant > 0 && V.PC.hips > 2)) {
			r.push(`Society finds the alterations you've done to your body aesthetically pleasing; your abnormal proportions <span class="green">improve</span> your public image.`);
			repX(15, "PCappearance");
		}
	} else if (FutureSocieties.isActive('FSBodyPurist')) {
		if (V.PC.faceImplant > 30) {
			r.push(`Society can tell you've had work done on your face; your cosmetic touch-ups <span class="red">harm</span> your public image.`);
			repX(forceNeg(V.PC.faceImplant / 5), "PCappearance");
		}
		if (V.PC.boobsImplant !== 0) {
			r.push(`Society finds fake breasts repulsive and yours are no exception; your balloon-like breasts <span class="red">harm</span> your public image.`);
			repX(forceNeg(V.PC.boobsImplant / 10), "PCappearance");
		}
		if (V.PC.buttImplant > 0) {
			r.push(`Society finds fake butts unsightly and yours is no exception; your inflated ass <span class="red">harms</span> your public image.`);
			repX(forceNeg(10 * V.PC.buttImplant), "PCappearance");
		}
		if (V.PC.lipsImplant > 0) {
			r.push(`Society finds fake lips hideous and yours are no exception; your swollen lips <span class="red">harm</span> your public image.`);
			repX(forceNeg(10 * V.PC.lipsImplant / 10), "PCappearance");
		}
		if (V.PC.bellyImplant > 0) {
			r.push(`Society finds implants to be unsavory and the bloated curve to your abdomen is especially so; your faux pregnancy <span class="red">harms</span> your public image.`);
			repX(forceNeg(V.PC.bellyImplant / 1000), "PCappearance");
		}
		if (V.PC.ballsImplant > 0) {
			r.push(`Society finds everything unnatural disgusting and the grotesque bulge in your crotch is no exception; your gel-filled balls <span class="red">harm</span> your public image.`);
			repX(forceNeg(10 * V.PC.ballsImplant), "PCappearance");
		}
		if (V.PC.heightImplant < -1 || V.PC.heightImplant > 1 || (V.PC.hipsImplant > 0 && V.PC.hips > 2)) {
			r.push(`Society finds your twisted proportions nauseating; the work you've had done to your body <span class="red">harms</span> your public image.`);
			repX(-50, "PCappearance");
		}
		// check tats and mods here - I do not know if I can just the PC through the slave's function yet.
		// cats and horns aren't supported yet, so that'll need to be done here at some point as well.
	}

	if (FutureSocieties.isActive('FSRepopulationFocus')) {
		if (V.PC.boobs >= 1000 && V.PC.lactation > 0) {
			r.push(`Society approves of anything that helps the repopulation efforts. Your bountiful breasts promise plentiful milk and <span class="green">improve</span> your public image.`);
			repX((V.PC.boobs / 50), "PCappearance");
		}
		if (V.PC.balls >= 5 && isVirile(V.PC)) {
			r.push(`Society loves anything that helps the repopulation efforts. Your huge fertile balls indicate that you're a successful breeder and <span class="green">strongly improves</span> your public image.`);
			repX((15 * V.PC.balls), "PCappearance");
		}
	}

	if (FutureSocieties.isActive('FSHedonisticDecadence')) {
		if (V.PC.weight > 95) {
			r.push(`Society enjoys a body wrapped in soft fat; your pillowy figure <span class="green">improves</span> your public image.`);
			repX((Math.floor(V.PC.weight / 5)), "PCappearance");
		} else if (V.PC.weight < -30) {
			r.push(`Society enjoys a body wrapped in soft fat, something your boney figure defies. You would expect them to dislike this, but it just builds anticipation for when you do finally give in.`);
		}
	} else if (FutureSocieties.isActive('FSPhysicalIdealist')) {
		if (V.PC.muscles > 30) {
			r.push(`Society favors the strong; your muscles help to <span class="green">improve</span> your public image.`);
			repX((Math.floor(V.PC.muscles / 5)), "PCappearance");
		} else if (V.PC.muscles < -30) {
			r.push(`Society abhors the weak; your lack of muscles <span class="red">mars</span> your public image.`);
			repX(forceNeg(2 * V.PC.muscles), "PCappearance");
		}
	}

	if (V.PC.bellyPreg >= 1500) { // 5.0.0
		if (FutureSocieties.isActive('FSRestart')) {
			if (V.arcologies[0].FSRestartDecoration === 100) {
				if (V.PC.pregSource !== -1 && V.PC.pregSource !== -6) {
					r.push(`Most prominent female owners avoid being penetrated on`);
					if (V.policies.sexualOpenness === 1) {
						r.push(`principle, though you choose the opposite; your fecund figure suggests a slave knocked you up, a huge`);
					} else {
						r.push(`principle; your fecund figure exposes not only your willingness to be penetrated, but your`);
					}
					r.push(`breach of eugenics. Your citizens are <span class="red">livid</span> over your actions and are calling for your removal.`);
					repX(-500, "PCactions");
					if (V.eugenicsFullControl !== 1) {
						V.failedElite += 100;
					}
				} else {
					r.push(`Since it is public knowledge that you are carrying a child in the name of eugenics, society views you as a bearer of the future and <span class="green">celebrates</span> your contributions to society.`);
					repX(200, "PCappearance");
					V.failedElite -= 10;
				}
			} else {
				if (V.PC.pregSource !== -1 && V.PC.pregSource !== -6) {
					r.push(`Most prominent female owners avoid being penetrated on`);
					if (V.policies.sexualOpenness === 1) {
						r.push(`principle, though you choose the opposite; your fecund figure suggests a slave knocked you up, a huge`);
					} else {
						r.push(`principle; your fecund figure exposes not only your willingness to be penetrated, but your`);
					}
					r.push(`breach of the eugenics you are pushing for. Your citizens are <span class="red">disgusted</span> by both your body and your lack of commitment.`);
					repX(-500, "PCactions");
					if (V.eugenicsFullControl !== 1) {
						V.failedElite += 50;
					}
				} else {
					r.push(`Since it is public knowledge that you are carrying a child in the name of eugenics, society views you as a bearer of modernity and <span class="green">commends</span> your contributions to society.`);
					repX(200, "PCappearance");
					V.failedElite -= 5;
				}
			}
		} else if (V.PC.visualAge < V.minimumSlaveAge && !FutureSocieties.isActive('FSHedonisticDecadence')) {
			if (V.PC.visualAge <= 12) {
				if (V.arcologies[0].FSRepopulationFocus >= 60) {
					r.push(`Most prominent female owners would avoid being penetrated on principle, but you're so young that it's assumed naiveté got you pregnant. Fortunately your arcology values motherhood so much that it is <span class="green">pleased</span> with the prospect of you spending most of your life bearing children and your citizens are more than willing to make sure you're as comfortable as possible with your pregnancy.`);
					repX(30, "PCappearance");
				} else if (V.rep < 28000 - enduringRep) {
					r.push(`You have carved out such a name for yourself that society has no choice but to accept that it has no qualms with being led by a child-laden child.`);
				} else {
					r.push(`Most prominent female owners avoid being penetrated on principle, though your fecund figure suggests otherwise. Some think that a kid your age is too naive to know what sex results in, but most just assume you got`);
					if (V.policies.sexualOpenness === 1) {
						r.push(`dominated and bred by one of your slaves.`);
					} else {
						r.push(`taken advantage of.`);
					}
					r.push(`Either way, the constant spread of rumors and gossip over your bulging middle make it <span class="red">far harder for you to maintain your reputation.</span>`);
					repX(-500, "PCactions");
				}
			} else {
				if (V.arcologies[0].FSRepopulationFocus >= 60) {
					r.push(`Most prominent female owners avoid being penetrated on principle, but your arcology values motherhood so much that it is <span class="green">pleased</span> with your decision to embrace your teenage hormones and get knocked up; they can only hope you'll keep getting pregnant.`);
					repX(20, "PCappearance");
				} else if (V.rep < 22000 - enduringRep) {
					r.push(`You have carved out such a name for yourself that society has come to terms with being led by a knocked-up teenager.`);
				} else {
					r.push(`Most prominent female owners avoid being penetrated on principle, though your fecund figure suggests otherwise. Some say you didn't realize that, given your lack of experience, but most just speculate that you experimented`);
					if (V.policies.sexualOpenness === 1) {
						r.push(`with your slaves`);
					} else {
						r.push(`too much`);
					}
					r.push(`and got knocked up. Either way, the constant spread of rumors and doubts over your self-control make it <span class="red">harder for you to maintain your reputation.</span>`);
					repX(-300, "PCactions");
				}
			}
		} else if (V.arcologies[0].FSRepopulationFocus >= 60) {
			r.push(`Most prominent female owners avoid being penetrated on principle, but your arcology values motherhood so much that it is more <span class="green">pleased</span> with your dedication than it is disappointed in your`);
			if (V.policies.sexualOpenness === 1) {
				r.push(`suspected slave baby.`);
			} else {
				r.push(`penetration.`);
			}
			repX(10, "PCappearance");
		} else if (V.rep < 20000 - enduringRep) {
			r.push(`You have carved out such a name for yourself that society has come to terms with being led by a woman with child.`);
		} else {
			r.push(`Most prominent female owners avoid being penetrated on`);
			if (V.policies.sexualOpenness === 1) {
				r.push(`principle, though you choose the opposite; your fecund figure suggests a slave knocked you up,`);
			} else {
				r.push(`principle; your fecund figure exposes your willingness to be penetrated,`);
			}
			r.push(`making it <span class="red">harder for you to maintain your reputation.</span>`);
			repX(-200, "PCactions");
		}
	}

	if ((V.PC.career === "escort" || V.PC.career === "prostitute") && V.rep < 16000 - enduringRep) {
		r.push(`Society <span class="red">frowns</span> over being run by an ex-whore.`);
		if (V.PC.career === "escort") {
			r.push(`The presence of porn of you on the net doesn't aid your reputation either.`);
		}
		repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCactions");
	} else if (V.PC.career === "escort" || V.PC.career === "prostitute") {
		r.push(`Your reputation is so strong that society has accepted your previous endeavors despite how unusual it is for a prominent slaveowner to have once nearly been a slave.`);
	}
	if (V.PC.career === "child prostitute" && V.rep < 22000 - enduringRep) {
		r.push(`Society <span class="red">is mortified</span> over being run by a sex-addled child whore.`);
		if (V.PC.visualAge < V.minimumSlaveAge) {
			r.push(`The fact that you appear underage only makes the thought worse.`);
		}
		repX(forceNeg(Math.min((V.rep * 0.06), 700)), "PCactions");
	} else if (V.PC.career === "child prostitute") {
		r.push(`Your reputation is so strong that society has finally accepted your previous life as a child whore.`);
	}
	if (isPCCareerInCategory("servant") && V.rep < 12000 - enduringRep) {
		r.push(`Society <span class="red">frowns</span> over being run by an ex-`);
		if (V.PC.title === 1) {
			r.push(`butler,`);
		} else {
			r.push(`maid,`);
		}
		r.push(`despite how prominent their previous owner was.`);
		repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCactions");
	} else if (isPCCareerInCategory("servant")) {
		r.push(`Your reputation is so strong that society has accepted your previous vocation despite how unusual it is for a prominent slaveowner to have once been nothing more than a lowly servant.`);
	}
	if (V.PC.career === "gang" && V.rep < 15000 - enduringRep) {
		r.push(`Society <span class="red">frowns</span> over being run by an ex-gang leader, no matter how strong they might have been.`);
		repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCactions");
	} else if (V.PC.career === "hoodlum" && V.rep < 16000 - enduringRep) {
		r.push(`Society <span class="red">dislikes</span> being run by some low-life thug, no matter how much "street cred" they may have once held.`);
		repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCactions");
	} else if (V.PC.career === "street urchin" && V.rep < 20000 - enduringRep) {
		r.push(`Society <span class="red">hates</span> being run by some homeless street rat; how you even managed to get this far baffles them.`);
		repX(forceNeg(Math.min((V.rep * 0.06), 600)), "PCactions");
	} else if (V.PC.career === "BlackHat" && V.rep < 15000 - enduringRep) {
		r.push(`Society <span class="red">dislikes</span> being run by someone so capable of dredging up secrets, especially when they used to do it for the highest bidder.`);
		repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCactions");
	} else if (V.PC.career === "hacker" && V.rep < 16000 - enduringRep) {
		r.push(`Society <span class="red">dislikes</span> being run by someone so capable of dredging up secrets, especially when they do it for fun.`);
		repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCactions");
	} else if (V.PC.career === "script kiddy" && V.rep < 18000 - enduringRep) {
		r.push(`Society <span class="red">dislikes</span> being run by someone with such a reckless and disruptive idea of fun.`);
		repX(forceNeg(Math.min((V.rep * 0.05), 500)), "PCactions");
	} else if (isPCCareerInCategory("gang") || isPCCareerInCategory("BlackHat")) {
		r.push(`Your reputation is strong enough that society has come to accept your background as part of your image.`);
	}

	if (V.PCSlutContacts === 2) {
		r.push(`You are actively starring in pornographic videos. While they are rather exclusive, <span class="red">some still leak out to the public,</span> harming your image.`);
		repX(-50, "PCactions");
		if (canGetPregnant(V.PC)) {
			r.push(`That's not all that leaks out of you, considering all your shoots are rubber free.`);
			knockMeUp(V.PC, 20, 2, -5);
		}
	}

	if (FutureSocieties.isActive('FSRomanRevivalist')) {
		if (V.mercenaries > 0) {
			r.push(`Society <span class="green">approves</span> of how you are providing for the defense of the state, as should all citizens of the new Rome.`);
			FutureSocieties.Change("Roman Revivalist", V.mercenaries);
		}
		if (V.slaves.length > 20 && V.cash > 50000) {
			r.push(`Society <span class="green">strongly approves</span> of your wealth and prosperity, fit goals for the`);
			if (V.PC.customTitle) {
				r.push(`${V.PC.customTitle}`);
			} else if (V.PC.title === 1) {
				r.push(`new Roman man.`);
			} else {
				r.push(`rising Roman lady.`);
			}
			FutureSocieties.Change("Roman Revivalist", 5);
		}
		if (V.language !== App.Data.FutureSociety.records.FSRomanRevivalist.language) {
			r.push(`Continuing to use ${V.language} as the lingua franca of ${V.arcologies[0].name} rather than the storied Latin <span class="red">disappoints</span> society and causes doubt about your revivalist project.`);
			FutureSocieties.Change("Roman Revivalist", -2);
		}
	} else if (FutureSocieties.isActive('FSAztecRevivalist')) {
		if (V.PC.visualAge >= 35) {
			r.push(`Society <span class="green">approves</span> of your advancing age, which advances the ancient Aztec ideal of an experienced leader of the people.`);
			FutureSocieties.Change("Aztec Revivalist", 1);
		}
		if (V.HeadGirlID === 0) {
			r.push(`Society <span class="red">disapproves</span> of you not having a Head Girl as an advisor and assistant.`);
			FutureSocieties.Change("Aztec Revivalist", -2);
		} else {
			r.push(`Society <span class="green">approves</span> of your reliance on a Head Girl as an advisor and assistant.`);
			FutureSocieties.Change("Aztec Revivalist", 2);
		}
		if (V.PC.skill.warfare < 0) {
			r.push(`Society <span class="red">greatly disapproves</span> of your feebleness in the arts of war.`);
			FutureSocieties.Change("Aztec Revivalist", -4);
		} else if (V.PC.skill.warfare < 50) {
			r.push(`Society <span class="red">disapproves</span> of you not being properly trained in the arts of war.`);
			FutureSocieties.Change("Aztec Revivalist", -2);
		} else {
			r.push(`Society <span class="green">approves</span> of having a leader that is trained in the arts of war.`);
			FutureSocieties.Change("Aztec Revivalist", 2);
		}
		if (V.language !== App.Data.FutureSociety.records.FSAztecRevivalist.language) {
			r.push(`Continuing to use ${V.language} as the lingua franca of ${V.arcologies[0].name} rather than the revived Nahuatl <span class="red">disappoints</span> society and causes doubt about your revivalist project.`);
			FutureSocieties.Change("Aztec Revivalist", -3);
		}
	} else if (FutureSocieties.isActive('FSNeoImperialist')) {
		if (V.mercenaries > 0) {
			r.push(`Society <span class="green">approves</span> of your strong militarism and elite mercenaries, as your tradition of Imperial conquest glorifies military success above all else.`);
			FutureSocieties.Change("Neo-Imperialist", V.mercenaries);
		}
		if (V.slaves.length > 20 && V.cash > 50000) {
			r.push(`Society <span class="green">strongly approves</span> of your great wealth and prosperity, as is only fitting for an`);
			if (V.PC.customTitle) {
				r.push(`${V.PC.customTitle}.`);
			} else if (V.PC.title === 1) {
				r.push(`proper Imperial noble.`);
			} else {
				r.push(`graceful Imperial noble.`);
			}
			FutureSocieties.Change("Neo-Imperialist", 5);
		}
		if (V.cash < 1000) {
			r.push(`Society <span class="red">disapproves</span> of your poverty; it is viewed as completely unbefitting for an Imperial ruler to have so little cash on hand, and indicative of weakness in your rule.`);
			FutureSocieties.Change("Neo-Imperialist", -2);
		}
		if (V.PC.skill.warfare < 0) {
			r.push(`Society <span class="red">greatly disapproves</span> of your weakness in combat. The core duty of any Imperial noble is to fight, and your failure to understand the art of war is an unacceptable weakness.`);
			FutureSocieties.Change("Neo-Imperialist", -4);
		} else if (V.PC.skill.warfare < 50) {
			r.push(`Society <span class="red">disapproves</span> of you lacking training in the art of warfare, as fighting is a core duty of any Imperial noble.`);
			FutureSocieties.Change("Neo-Imperialist", -2);
		} else {
			r.push(`Society <span class="green">approves</span> of having a leader who is a capable warrior. Your strength in battle is proof of your indisputable right to rule.`);
			FutureSocieties.Change("Neo-Imperialist", 2);
		}
	} else if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
		const racialVarieties = new Set(V.slaves.map((s) => s.race));
		if (racialVarieties.size > 4) {
			r.push(`Society <span class="green">strongly approves</span> of how you own a cornucopia of different races, which advances the ancient Egyptian ideal of cosmopolitan sex slavery.`);
			FutureSocieties.Change("Egyptian Revivalist", 5);
		}
		if (V.language !== App.Data.FutureSociety.records.FSEgyptianRevivalist.language) {
			r.push(`Continuing to use ${V.language} as the lingua franca of ${V.arcologies[0].name} rather than revived Ancient Egyptian <span class="red">disappoints</span> society and causes doubt about your revivalist project.`);
			FutureSocieties.Change("Egyptian Revivalist", -2);
		}
	} else if (FutureSocieties.isActive('FSEdoRevivalist')) {
		const threshold = Math.trunc(V.rep / 2000);
		if (V.slaves.filter(s => [Job.CLUB, Job.DJ, Job.PUBLIC].includes(s.assignment) || (s.assignment === Job.RECRUITER && V.recruiterTarget === "other arcologies" && V.arcologies[0].influenceTarget !== -1)).length <= threshold) {
			r.push(`Society <span class="red">disapproves</span> of your failure to provide for cultural development by offering public servants or club slaves in a number that befits your reputation.`);
			FutureSocieties.Change("Edo Revivalist", -2);
		} else {
			r.push(`Society <span class="green">approves</span> of your provision for cultural development by offering public servants and club slaves in a number that befits your reputation.`);
			FutureSocieties.Change("Edo Revivalist", 2);
		}
		if (V.language !== App.Data.FutureSociety.records.FSEdoRevivalist.language) { //
			r.push(`Continuing to use ${V.language} as the lingua franca of ${V.arcologies[0].name} rather than pure Japanese <span class="red">disappoints</span> society and causes doubt about your revivalist project.`);
			FutureSocieties.Change("Edo Revivalist", -2);
		}
	} else if (FutureSocieties.isActive('FSArabianRevivalist')) {
		if (haremLength() < V.rep / 3500) {
			r.push(`Society <span class="red">disapproves</span> of the small size of your harem, feeling that you do not have enough fucktoys or slaves in your master suite for your reputation.`);
			FutureSocieties.Change("Arabian Revivalist", -2);
		} else {
			r.push(`Society <span class="green">approves</span> of the size of your harem, feeling that you have a good number of fucktoys and slaves in your master suite for your reputation.`);
			FutureSocieties.Change("Arabian Revivalist", 2);
		}
		if (V.language !== App.Data.FutureSociety.records.FSArabianRevivalist.language) {
			r.push(`Continuing to use ${V.language} as the lingua franca of ${V.arcologies[0].name} rather than the Arabic in which the word of God was passed to Muhammad <span class="red">disappoints</span> society and causes doubt about your revivalist project.`);
			FutureSocieties.Change("Arabian Revivalist", -2);
		}
	} else if (FutureSocieties.isActive('FSChineseRevivalist')) {
		if (V.HeadGirlID === 0) {
			r.push(`Society <span class="red">disapproves</span> of your failure to rely on a Head Girl, as proper imperial administration requires,`);
			FutureSocieties.Change("Chinese Revivalist", -2);
		} else {
			r.push(`Society <span class="green">approves</span> of your reliance on a Head Girl, as proper imperial administration requires,`);
			FutureSocieties.Change("Chinese Revivalist", 2);
		}
		if (V.RecruiterID === 0) {
			r.push(`<span class="red">disapproves</span> of your failure to maintain a Recruiter to expand the Middle Kingdom,`);
			FutureSocieties.Change("Chinese Revivalist", -2);
		} else {
			r.push(`<span class="green">approves</span> of your maintaining a Recruiter to expand the Middle Kingdom,`);
			FutureSocieties.Change("Chinese Revivalist", 2);
		}
		if (V.BodyguardID === 0) {
			r.push(`and <span class="red">disapproves</span> of your failure to keep a Bodyguard as befits a proper imperial palace.`);
			FutureSocieties.Change("Chinese Revivalist", -2);
		} else {
			r.push(`and <span class="green">approves</span> of your keeping a Bodyguard, as befits a proper imperial palace.`);
			FutureSocieties.Change("Chinese Revivalist", 2);
		}
		if (V.language !== App.Data.FutureSociety.records.FSChineseRevivalist.language) {
			r.push(`Continuing to use ${V.language} as the lingua franca of ${V.arcologies[0].name} rather than the Chinese of the Middle Kingdom <span class="red">disappoints</span> society and causes doubt about your revivalist project.`);
			FutureSocieties.Change("Chinese Revivalist", -2);
		}
	} else if (FutureSocieties.isActive('FSAntebellumRevivalist')) {
		if (App.Entity.facilities.servantsQuarters.totalEmployeesCount < Math.round(V.rep / 2000)) {
			r.push(`Society <span class="red">disapproves</span> of your lack of maids and servants, ill-befitting of a supposed Southron aristocrat.`);
			FutureSocieties.Change("Antebellum Revivalist", -2);
		} else {
			r.push(`Society <span class="green">approves</span> of the number of domestic workers you keep.`);
			FutureSocieties.Change("Antebellum Revivalist", 2);
		}
		if (V.language !== "English") {
			r.push(`Continuing to use ${V.language} as the lingua franca of ${V.arcologies[0].name} rather than pure American English <span class="red">disappoints</span> society and causes doubt about your revivalist project.`);
			FutureSocieties.Change("Antebellum Revivalist", -2);
		}
		if (FutureSocieties.isActive('FSSubjugationist')) {
			r.push(`Society <span class="green">approves</span> of embracing both Antebellum Revivalism and Subjugationism.`);
			FutureSocieties.Change("Antebellum Revivalist", 1);
			FutureSocieties.Change("Subjugationist", 1);
		}
		if (FutureSocieties.isActive('FSSupremacist')) {
			r.push(`Society <span class="green">approves</span> of embracing both Antebellum Revivalism and Supremacism.`);
			FutureSocieties.Change("Antebellum Revivalist", 1);
			FutureSocieties.Change("Supremacist", 1);
		}

		// 200 is probably a bit ridiculous side, but might as well give a fun little reward for it
		if (V.slaves.length >= 200) {
			r.push(`Society is in <span class="green">awe</span> with the sheer size of your stable of slaves.`);
			FutureSocieties.Change("Antebellum Revivalist", 25);
		} else if (V.slaves.length >= 100) {
			r.push(`Society is <span class="green">impressed</span> with the number of slaves you own.`);
			FutureSocieties.Change("Antebellum Revivalist", 10);
		} else if (V.slaves.length >= 50) {
			r.push(`Society holds <span class="green">great respect</span> for the number of slaves you own.`);
			FutureSocieties.Change("Antebellum Revivalist", 5);
		} else if (V.slaves.length >= 25) {
			r.push(`Society <span class="green">approves</span> of the number of slaves you own.`);
			FutureSocieties.Change("Antebellum Revivalist", 3);
		} else if (V.slaves.length >= 10) {
			r.push(`Society <span class="green">slightly approves</span> of the number of slaves you own.`);
			FutureSocieties.Change("Antebellum Revivalist", 1);
		} else if (V.slaves.length >= 5) {
			r.push(`Society neither approves or disapproves of the size of your stable of slaves, but would respectively approve or disapprove if it grew or shrank.`);
		} else {
			r.push(`Society finds it <span class="green">strange</span> for someone of your stature to own so few slaves.`);
			FutureSocieties.Change("Antebellum Revivalist", -1);
		}

		if (V.PC.skill.slaving >= 100) {
			r.push(`Society at large is <span class="green">envious</span> of your immense skill and talent at slaving.`);
			FutureSocieties.Change("Antebellum Revivalist", 4);
		} else if (V.PC.skill.slaving >= 80) {
			r.push(`Society <span class="green">admires</span> expert slavers such as yourself.`);
			FutureSocieties.Change("Antebellum Revivalist", 3);
		} else if (V.PC.skill.slaving >= 60) {
			r.push(`Society <span class="green">appreciates</span> skilled slavers such as yourself.`);
			FutureSocieties.Change("Antebellum Revivalist", 2);
		} else if (V.PC.skill.slaving >= 40) {
			r.push(`Society <span class="green">respects</span> competent slavers such as yourself.`);
			FutureSocieties.Change("Antebellum Revivalist", 1);
		} else if (V.PC.skill.slaving >= 20) {
			r.push(`Society would prefer you were a better slaver, but it isn't perceived as a great dishonor either.`);
		} else if (V.PC.skill.slaving >= 0) {
			r.push(`Society is <span class="red">disappointed</span> about your lack of knowledge on slaving.`);
			FutureSocieties.Change("Antebellum Revivalist", -1);
		} else if (V.PC.skill.slaving >= -40) {
			r.push(`Society <span class="red">dislikes</span> your ignorance of slaving.`);
			FutureSocieties.Change("Antebellum Revivalist", -2);
		} else if (V.PC.skill.slaving >= -80) {
			r.push(`Society experiences <span class="red">secondhand embarrassment</span> when it witnesses your talent as a slaver.`);
			FutureSocieties.Change("Antebellum Revivalist", -3);
		} else {
			r.push(`Society is <span class="red">shocked and amused</span> that you are such a bungling slaver.`);
			FutureSocieties.Change("Antebellum Revivalist", -4);
		}
	}

	let noEugenics;
	let yesEugenics;
	if (FutureSocieties.isActive('FSRepopulationFocus')) {
		if (policies.countEugenicsSMRs() > 0) {
			r.push(`Society <span class="red">disapproves</span> of your policies sterilizing potential mothers. Your insistence on eugenics hinders adoption of your new society.`);
			noEugenics = -1 * policies.countEugenicsSMRs();
			FutureSocieties.Change("Repopulationist", noEugenics);
		}
	} else if (FutureSocieties.isActive('FSPaternalist')) {
		if (policies.countEugenicsSMRs() > 0) {
			r.push(`Society <span class="red">disapproves</span> of your policies forcefully sterilizing slaves, especially when they snuff out the life growing within them.`);
			noEugenics = -1 * policies.countEugenicsSMRs();
			FutureSocieties.Change("Paternalist", noEugenics);
		}
	} else if ((FutureSocieties.isActive('FSRestart')) && !FutureSocieties.isActive('FSPaternalist')) {
		if (policies.countEugenicsSMRs() > 0 && V.arcologies[0].FSRestartSMR !== 1) {
			r.push(`Society <span class="green"> approves</span> of your slave eugenics policies, easing them into more thorough eugenics.`);
			yesEugenics = policies.countEugenicsSMRs();
			FutureSocieties.Change("Eugenics", yesEugenics);
			V.failedElite -= (1 * policies.countEugenicsSMRs());
		} else if (V.arcologies[0].FSRestartSMR === 1) {
			V.failedElite -= (2 * policies.countEugenicsSMRs());
		}
	}

	if (FutureSocieties.isActive('FSRepopulationFocus') && V.birthsTotal > 0) {
		r.push(`The number of children you've brought into the world <span class="green">pleases</span> your citizens.`);
		if (V.birthsTotal < 1000) {
			repX(V.birthsTotal, "PCactions");
		} else {
			repX(1000, "PCactions");
		}
	}

	if (V.shelterAbuse > 5) {
		if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`You are on the Slave Shelter's public list of abusive slaveowners. Society <span class="red">disapproves</span> of your falling foul of such a well regarded charity.`);
			FutureSocieties.Change("Paternalist", -2);
		} else if (FutureSocieties.isActive('FSDegradationist')) {
			r.push(`You are on the Slave Shelter's public list of abusive slaveowners. Your citizens find this hilarious, and <span class="green">approve</span> of your taking advantage of a pack of idiots.`);
			FutureSocieties.Change("Degradationist", 2);
		}
	}

	if (V.TCR.schoolPresent === 1) {
		if (FutureSocieties.isActive('FSRestart')) {
			r.push(`Your Eugenics focused society <span class="red">disagrees</span> with the local branch of The Cattle Ranch's views on slave breeding. Until society sees them as nothing more than mindless cattle and not human, they are in conflict with current reproduction standards.`);
			FutureSocieties.Change("Eugenics", -1);
		} else if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`While they can't stop what happens to slaves outside of your arcology, they can <span class="red">disapprove and protest</span> you allowing a branch of the mentally and physically abusive Cattle Ranch to be established in your arcology.`);
			FutureSocieties.Change("Paternalist", -2);
		}
	}

	if (V.policies.cash4Babies === 1) {
		if (FutureSocieties.isActive('FSDegradationist')) {
			r.push(`Society <span class="green">approves</span> of your poor treatment of slave infants.`);
			repX(5 * V.FSSingleSlaveRep * (V.arcologies[0].FSDegradationist / V.FSLockinLevel), "babyTransfer");
		} else if (FutureSocieties.isActive('FSRestart')) {
			if (V.eugenicsFullControl !== 1) {
				r.push(`The Societal Elite <span class="red">strongly disapproves</span> of your creating an economic incentive for the lower classes to breed and sell infants, holding back acceptance of your new society.`);
				V.failedElite += 5;
			} else {
				r.push(`Society <span class="red">strongly disapproves</span> of your creating an economic incentive for the lower classes to breed and sell infants, holding back acceptance of your new society.`);
			}
			V.arcologies[0].FSRestart -= V.FSSingleSlaveRep;
			repX(forceNeg((5 * V.FSSingleSlaveRep * (V.arcologies[0].FSRestart / V.FSLockinLevel)) + (V.rep / 40)), "babyTransfer");
		} else if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`Society <span class="red">greatly despises</span> your poor treatment of slave infants.`);
			repX(forceNeg((25 * V.FSSingleSlaveRep * (V.arcologies[0].FSPaternalist / V.FSLockinLevel)) + (V.rep / 20)), "babyTransfer");
		} else if (FutureSocieties.isActive('FSRepopulationFocus')) {
			r.push(`Society <span class="red">disapproves</span> of your poor treatment of your future population, holding back acceptance of your new society.`);
			V.arcologies[0].FSRepopulationFocus -= V.FSSingleSlaveRep;
			repX(forceNeg((5 * V.FSSingleSlaveRep * (V.arcologies[0].FSRepopulationFocus / V.FSLockinLevel)) + (V.rep / 20)), "babyTransfer");
		} else {
			r.push(`Your citizens <span class="red">disapprove</span> of your poor treatment of slave children.`);
			repX(forceNeg(V.rep / 20), "babyTransfer");
		}
	}

	if (V.policies.mixedMarriage === 1) {
		r.push(`Your citizens`);
		if (V.arcologies[0].FSPaternalist >= 80) {
			r.push(`are so paternalistic that they <span class="green">approve</span> of`);
			FutureSocieties.Change("Paternalist", 2);
		} else if (V.arcologies[0].FSPaternalist >= 40) {
			r.push(`are paternalistic enough to tolerate`);
		} else {
			r.push(`<span class="red">disapprove</span> of`);
			repX(-50, "PCactions");
		}
		r.push(`your support for marriage between citizens and slaves.`);
	}

	let care;
	if (V.citizenOrphanageTotal > 0) {
		if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`The public <span class="green">approves</span> of the way you're providing for ${num(V.citizenOrphanageTotal)} of your slaves' children to be raised as citizens.`);
			FutureSocieties.Change("Paternalist", V.citizenOrphanageTotal);
			if (V.privateOrphanageTotal > 0) {
				r.push(`Raising ${num(V.privateOrphanageTotal)} of your slaves' children privately is considered even more <span class="green">impressive.</span>`);
				care = V.privateOrphanageTotal * 2;
				FutureSocieties.Change("Paternalist", care);
			}
		} else if (FutureSocieties.isActive('FSDegradationist')) {
			r.push(`The public <span class="red">disapproves</span> of the way you're providing for ${num(V.citizenOrphanageTotal)} of your slaves' children to be raised as citizens.`);
			care = -V.citizenOrphanageTotal;
			FutureSocieties.Change("Degradationist", care);
			if (V.privateOrphanageTotal > 0) {
				r.push(`Fortunately your raising slaves' children privately is not publicly known.`);
			}
		}
	} else if (V.privateOrphanageTotal > 0) {
		if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`Raising ${num(V.privateOrphanageTotal)} of your slaves' children privately is considered extremely <span class="green">impressive.</span>`);
			care = V.privateOrphanageTotal * 2;
			FutureSocieties.Change("Paternalist", care);
		} else if (FutureSocieties.isActive('FSDegradationist')) {
			r.push(`Fortunately your raising slaves' children privately is not publicly known.`);
		}
	}
	if (V.breederOrphanageTotal > 0 && FutureSocieties.isActive('FSRepopulationFocus')) {
		r.push(`The public <span class="green">approves</span> of the way you've dedicated ${num(V.breederOrphanageTotal)} of your slaves' children to be raised into future breeders.`);
		const futureBreeders = Math.round(((V.breederOrphanageTotal / 100) + 1));
		FutureSocieties.Change("Repopulationist", futureBreeders);
	}

	if (FutureSocieties.isActive('FSNull')) {
		r.push(`Your cultural openness <span class="green">helps your reputation,</span> since few citizens have disputes with your permissive approach.`);
		repX(50 * V.FSSingleSlaveRep * (V.arcologies[0].FSNull / V.FSLockinLevel), "policies");
	}

	if (V.arcologies[0].FSRestartLaw === 1) {
		r.push(`Your laws requiring the non-elite to pay additional taxes or be sterilized <span class="red">agitates</span> some of your citizens, but they don't matter. Only your <span class="green">pleased</span> elite do.`);
		repX(-100, "policies");
		V.failedElite -= 1;
	}

	if (V.arcologies[0].FSHedonisticDecadenceLaw === 1) {
		r.push(`The burgeoning prosperity brought on by new business through your policies <span class="green">builds your reputation,</span> since nearly every citizen has something available to satisfy their cravings.`);
		repX(100, "policies");
	}

	if (V.arcologies[0].FSIntellectualDependencyLaw === 1) {
		r.push(`The protections you have in place to protect invalids <span class="green">adds to your reputation,</span> since every citizen will eventually find themselves benefitting from it.`);
		repX(100, "policies");
	}

	if (V.policies.SMR.frigiditySMR === 1) {
		r.push(`Your market regulations regarding slave sex drives <span class="red">outrages</span> your citizens seeking sex slaves, since only slaves disinterested in sex are available.`);
		repX(-250, "policies");
	}

	if (!FutureSocieties.isActive('FSHedonisticDecadence')) {
		if (isHorny(V.PC)) {
			r.push(`Some citizens <span class="red">criticize</span> your recent decisions, assuming they may have been made with your crotch instead of your brain.`);
			repX(-10, "PCactions");
		}
		if (V.PC.addict > 10) {
			r.push(`The twitchy nature of aphrodisiac addicts leads some citizens to <span class="red">distrust</span> you.`);
			repX(forceNeg(V.PC.addict), "PCactions");
		}
	}

	if (V.PC.degeneracy > 0) {
		if (V.PC.degeneracy > 100) {
			r.push(`There are <span class="red">severe and devastating rumors</span> about you spreading across the arcology.`);
			repX(forceNeg(100 * V.PC.degeneracy), "PCactions");
			V.enduringRep = 0;
		} else if (V.PC.degeneracy > 75) {
			r.push(`There are <span class="red">severe rumors</span> about you spreading across the arcology.`);
			repX(forceNeg(20 * V.PC.degeneracy), "PCactions");
		} else if (V.PC.degeneracy > 50) {
			r.push(`There are <span class="red">bad rumors</span> about you spreading across the arcology.`);
			repX(forceNeg(10 * V.PC.degeneracy), "PCactions");
		} else if (V.PC.degeneracy > 25) {
			r.push(`There are <span class="red">rumors</span> about you spreading across the arcology.`);
			repX(forceNeg(5 * V.PC.degeneracy), "PCactions");
		} else if (V.PC.degeneracy > 10) {
			r.push(`There are <span class="red">minor rumors</span> about you spreading across the arcology.`);
			repX(forceNeg(2 * V.PC.degeneracy), "PCactions");
		} else {
			r.push(`The occasional rumor about you can be heard throughout the arcology.`);
			repX(forceNeg(1 * V.PC.degeneracy), "PCactions");
		}
	}
	if (V.rapedThisWeek) {
		let rapeFameDec = 25 + V.rapedThisWeek * 75;
		r.push(`There's ${V.PC.degeneracy ? "also " : ""}a <span class="red">rumor you've been raped${V.PC.counter.raped ? " again" : ""}.</span>`);
		if (V.rep < 3000) {
			r.push(`Since you are almost unknown, the rumor goes nearly unnoticed.`);
			rapeFameDec *= V.rep / 10000;
		} else if (V.rep < 6000) {
			r.push(`Since you are not very well known, the rumor goes quite unnoticed.`);
			rapeFameDec *= V.rep / 10000;
		} else if (V.rep < 9000) {
			r.push(`Since you are not well known, the rumor does not have much impact.`);
			rapeFameDec *= V.rep / 10000;
		}
		if (V.arcologies[0].FSChattelReligionistLaw === 1) {
			r.push(`The Prophet has been sullied, and this is a sacrilege.`);
			rapeFameDec *= 1.2;
		} else if (FutureSocieties.isActive("FSAntebellumRevivalist")) {
			if (V.SecExp.edicts.weaponsLaw > 0) {
				r.push(`Your citizens are relieved that they are allowed to bear arms to defend themselves against possible attacks.`);
				rapeFameDec *= .8;
			} else {
				r.push(`Your citizens would feel safer if they were allowed to bear weapons to defend themselves against possible attacks.`);
				rapeFameDec *= 1.2;
			}
		} else if (FutureSocieties.isActive("FSSubjugationist") && V.PC.race === V.arcologies[0].FSSubjugationistRace) {
			r.push(`Your citizens see your rape as normal since you are ${V.PC.race}.`);
			rapeFameDec *= .5;
		} else if (FutureSocieties.isActive("FSSupremacist") && V.PC.race === V.arcologies[0].FSSupremacistRace) {
			r.push(`Your citizens consider your rape an atrocity, since you are ${V.PC.race}.`);
			rapeFameDec *= 1.2;
		} else if (FutureSocieties.isActive("FSRepopulationFocus") && (isFertile(V.PC) || ((V.PC.vagina >= 0 || V.PC.mpreg) && V.PC.preg < 10))) {
			r.push(`All things considered, your citizens hope that at least you have become pregnant.`);
			rapeFameDec *=.9;
		}
		if (V.arcologyUpgrade.drones !== 1) {
			r.push(`The lack of security is scaring people.`);
			rapeFameDec *= 1.3;
		}
		if (V.policies.sexualOpenness === 1) {
			if (FutureSocieties.isActive("FSNull")) {
				r.push(`Since you have shown interest in being penetrated, many people think that it's not a real rape, that you've been role-playing with some friend.`);
				rapeFameDec *= .4;
			} else {
				r.push(`Since you have shown interest in being penetrated, many people think that you are asking for it and do not give it much importance.`);
				rapeFameDec *= .6;
			}
		}
		rapeFameDec = Math.clamp(Math.floor(rapeFameDec), 0, 250);
		repX(forceNeg(rapeFameDec), "PCactions");
		V.PC.counter.raped = (V.PC.counter.raped || 0) + V.rapedThisWeek;
		V.rapedThisWeek = 0;
	}

	if (V.FCNNstation === 1) {
		r.push(`Playing host to the Free Cities News Network brings <span class="green">approval</span> from those who still consider freedom of the press a virtue.`);
		repX(500, "policies");
	}

	App.Events.addParagraph(el, r);
	r = [];
	const repGain = hashSum(V.lastWeeksRepIncome);
	repLoss = hashSum(V.lastWeeksRepExpenses);
	if (repGain > repLoss) {
		r.push(App.UI.DOM.makeElement("span", `Your reputation increased this week.`, "green"));
	} else if (repGain < repLoss) {
		r.push(App.UI.DOM.makeElement("span", `Your reputation decreased this week.`, "red"));
	}


	if (isNaN(V.rep)) {
		r.push(App.UI.DOM.makeElement("p", `Error: rep is outside accepted range, please report this issue`, "red"));
	}

	if (V.rep > 20000) {
		r.push(`Your reputation is capped.`);
	} else if (V.rep - V.enduringRep > 7500) {
		r.push(`Your base rate of reputation decay is very high.`);
	} else if (V.rep - V.enduringRep > 5000) {
		r.push(`Your base rate of reputation decay is high.`);
	} else if (V.rep - V.enduringRep > 2500) {
		r.push(`Your base rate of reputation decay is moderate.`);
	} else if (V.rep - V.enduringRep > 0) {
		r.push(`Your base rate of reputation decay is low.`);
	}
	if (V.enduringRep >= 10000) {
		r.push(`Your legend is perfected, reducing reputation decay to its lowest possible level.`);
		V.enduringRep = 10000;
	}
	if (V.rep > maximumRep) {
		r.push(`Society still believes your control over ${V.arcologies[0].name} to be ${V.maximumRep < 10000 ? "untenable" : "threatened"}, so any further reputation growth will be moribund until you find ${V.maximumRep < 10000 ? "a way to prove yourself" : "find a way to solidify your standing"}.`);
		repX(maximumRep - V.rep, "overflow");
	}

	if (V.policies.alwaysSubsidizeRep === 1) {
		if (V.rep <= 19900) {
			repX(100, "policies");
			r.push(`Reputation subsidized as planned.`);
			if (V.PC.degeneracy > 1) {
				V.PC.degeneracy -= 1;
			}
		} else if (V.PC.degeneracy > 1) {
			V.PC.degeneracy -= 1;
			r.push(`Rumors quelled as planned.`);
		} else {
			cashX(1000, "policies");
			r.push(`Reputation subsidy reclaimed this week since your reputation is capped.`);
		}
	}

	if (V.failedElite > 1) {
		V.failedElite -= 1;
	}
	if (V.PC.degeneracy > 1) {
		V.PC.degeneracy -= 1;
	}

	if (V.arcologies[0].FSRestartDecoration === 100) {
		if (V.eugenicsFullControl !== 1) {
			if (V.failedElite > 300) {
				r.push(`The Societal Elite <span class="red">are plotting your demise.</span>`);
			} else if (V.failedElite > 250) {
				r.push(`The Societal Elite <span class="red">are openly discussing about your failures.</span> It would be in your best interests to appease them.`);
			} else if (V.failedElite > 200) {
				r.push(`The Societal Elite <span class="red">are avoiding you.</span> Getting back on their good side is a good idea, lest you want to disappear.`);
			} else if (V.failedElite > 150) {
				r.push(`The Societal Elite <span class="red">stop their conversations around you.</span> You may want to consider your actions more.`);
			} else if (V.failedElite > 100) {
				r.push(`The Societal Elite <span class="red">seem to dislike you.</span>`);
			} else if (V.failedElite > 50) {
				r.push(`The Societal Elite <span class="red">mutter about you.</span>`);
			} else if (V.failedElite > 0) {
				r.push(`The Societal Elite <span class="red">question some of your actions.</span>`);
			} else {
				r.push(`The Societal Elite hold you in high regards.`);
			}
		} else {
			r.push(`The Societal Elite can think what they want; they know better than to try and cross you again.`);
		}
	} else if (FutureSocieties.isActive('FSRestart')) {
		if (V.eugenicsFullControl !== 1) {
			if (V.failedElite > 300) {
				r.push(`The Societal Elite <span class="red">have departed from your arcology in disgust.</span>`);
				FutureSocieties.remove("FSRestart");
				repX(forceNeg(10000), "event");
				V.eliteFail = random(30, 100);
				V.eliteFailTimer = 15;
				if (V.eliteFail > V.topClass - 20) {
					V.eliteFail = V.topClass - 20;
				}
				if (V.arcologies[0].prosperity > 50) {
					V.arcologies[0].prosperity -= random(20, 40);
				}
			} else if (V.failedElite > 250) {
				r.push(`The Societal Elite <span class="red">are openly discussing leaving.</span> It would be in your best interests to appease them.`);
			} else if (V.failedElite > 200) {
				r.push(`The Societal Elite <span class="red">are avoiding you.</span> Getting back on their good side is a good idea, lest you want to disappear.`);
			} else if (V.failedElite > 150) {
				r.push(`The Societal Elite <span class="red">stop their conversations around you.</span> You may want to consider your actions more.`);
			} else if (V.failedElite > 100) {
				r.push(`The Societal Elite <span class="red">seem to dislike you.</span>`);
			} else if (V.failedElite > 50) {
				r.push(`The Societal Elite <span class="red">mutter about you.</span>`);
			} else if (V.failedElite > 0) {
				r.push(`The Societal Elite <span class="red">question some of your actions.</span>`);
			} else {
				r.push(`The Societal Elite hold you in warm regards.`);
			}
		} else {
			r.push(`The Societal Elite can think what they want; they know better than to try and cross you again.`);
		}
	}
	App.Events.addParagraph(el, r);
	return el;
};
