App.Mods.SecExp.authorityReport = function() {
	let authGrowth = 0;
	let r = V.useTabs === 0 ? [`<h2>Authority</h2>`] : [];
	r.push(`<br>Your authority is`);

	if (V.SecExp.core.authority > 19500) {
		r.push(`nearly absolute. The arcology is yours to command as it pleases you.`);
	} else if (V.SecExp.core.authority > 15000) {
		r.push(`extremely high. There's little you cannot do within the walls of your arcology.`);
	} else if (V.SecExp.core.authority > 10000) {
		r.push(`high. You command respect and fear in equal measure.`);
	} else if (V.SecExp.core.authority > 5000) {
		r.push(`moderate. You command some respect from your citizens.`);
	} else {
		r.push(`low. You command no respect or fear from your citizens.`);
	}

	if (V.PC.career === "wealth") {
		r.push(`As part of the idle rich, you were used to having obedience coming naturally to you. Now you find it harder to maintain authority over the arcology.`);
	} else if (V.PC.career === "slaver") {
		r.push(`Your past as a slaver helps you assert your authority over the arcology.`);
	} else if (V.PC.career === "escort") {
		r.push(`Given your past career as an escort, you find it hard to assert your authority over the arcology and its inhabitants.`);
	} else if (V.PC.career === "servant") {
		r.push(`Given your past career as a servant, you find it hard to assert your authority over the arcology and its inhabitants.`);
	} else if (V.PC.career === "BlackHat") {
		r.push(`Given your past career as a (rather questionable) incursion specialist, you find it hard to assert your authority over the arcology and its inhabitants, despite what you may know about them.`);
	} else if (V.PC.career === "gang") {
		r.push(`Given your past life as a gang leader, you find it easier to assert your authority over the arcology and its inhabitants.`);
	}

	if (["BlackHat", "escort", "servant", "wealth"].includes(V.PC.career)) {
		authGrowth -= (10 * random(5, 15));
	} else if (["slaver", "gang"].includes(V.PC.career)){
		authGrowth += (10 * random(5, 15));
	}

	if (V.rep >= 19500) {
		r.push(`Your legend is so well known that your mere presence commands respect and obedience, increasing your authority.`);
		authGrowth += (10 * random(10, 20));
	} else if (V.rep >= 15000) {
		r.push(`Your reputation is so high that your mere presence commands respect, increasing your authority.`);
		authGrowth += (10 * random(5, 15));
	} else if (V.rep >= 10000) {
		r.push(`Your reputation is high enough that your presence commands some respect, increasing your authority.`);
		authGrowth += (10 * random(2, 8));
	}

	if (V.SecExp.core.security >= 90) {
		r.push(`Your arcology is incredibly secure and your citizens know quite well who to thank, greatly increasing your authority.`);
		authGrowth += (10 * random(10, 20));
	} else if (V.SecExp.core.security >= 70) {
		r.push(`Your arcology is really secure and your citizens know quite well who to thank, increasing your authority.`);
		authGrowth += (10 * random(5, 15));
	} else if (V.SecExp.core.security >= 50) {
		r.push(`Your arcology is quite secure and your citizens know who to thank, increasing your authority.`);
		authGrowth += (10 * random(2, 8));
	}

	if (V.SecExp.core.crimeLow >= 90) {
		r.push(`The all powerful criminal organizations controlling the arcology have a very easy time undermining your authority.`);
		authGrowth -= (10 * random(10, 20));
	} else if (V.SecExp.core.crimeLow >= 70) {
		r.push(`Crime is king in the arcology, powerful criminals have a very easy time undermining your authority.`);
		authGrowth -= (10 * random(5, 15));
	} else if (V.SecExp.core.crimeLow >= 50) {
		r.push(`Criminal organizations have a strong foothold in the arcology, their activities undermine your authority.`);
		authGrowth -= (10 * random(2, 8));
	}

	if (V.averageDevotion >= 50 && V.averageTrust >= 50) {
		r.push(`The high devotion and trust of your slaves speak eloquently of your leadership capabilities, helping your authority grow.`);
		authGrowth += (5 * ((V.averageDevotion + V.averageTrust) / 10));
	} else if (V.averageDevotion >= 50) {
		r.push(`The high devotion of your slaves speaks eloquently of your leadership capabilities, helping your authority grow.`);
		authGrowth += (5 * (V.averageDevotion / 10));
	} else if (V.averageTrust >= 50) {
		r.push(`The high trust of your slaves speaks eloquently of your leadership capabilities, helping your authority grow.`);
		authGrowth += (5 * (V.averageTrust / 10));
	}

	if (V.arcologies[0].ownership >= 90) {
		r.push(`You own so much of the arcology that your authority quickly increases.`);
	} else if (V.arcologies[0].ownership >= 70) {
		r.push(`You own a big part of the arcology, causing your authority to increase.`);
	} else if (V.arcologies[0].ownership >= 50) {
		r.push(`You own the majority of the arcology, causing your authority to slowly increase.`);
	} else {
		r.push(`Your low ownership of the arcology causes your authority to decrease.`);
	}

	if (V.arcologies[0].ownership >= 50) {
		authGrowth += (5 * Math.trunc(V.arcologies[0].ownership / 10));
	} else {
		authGrowth -= (5 * Math.trunc(V.arcologies[0].ownership / 10));
	}

	const activeUnits = App.Mods.SecExp.battle.activeUnits();
	if (activeUnits >= 4) {
		r.push(`Your military is`);
		if (activeUnits >= 9) {
			r.push(`massive; commanding so many troops greatly`);
		} else if (activeUnits >= 7) {
			r.push(`huge; commanding such a number of soldiers`);
		} else if (activeUnits >= 4) {
			r.push(`at a decent size; commanding a small army`);
		}
		r.push(`increases your authority.`);
		authGrowth += (12 * activeUnits);
	}

	const SF = App.Mods.SecExp.assistanceSF('authority');
	r.push(SF.text); authGrowth += SF.bonus;

	const FSChattel = V.arcologies[0].FSChattelReligionist;
	if (FSChattel >= 50) {
		r.push(`Religious organizations have a tight grip on the minds of your residents and their dogma ${FSChattel >= 90 ? 'greatly' : ''} helps your authority grow.`);
		authGrowth += FSChattel;
	}

	const FSRestart = V.arcologies[0].FSRestart;
	if (FSRestart >= 50) {
		r.push(`The arcology's society is ${FSRestart >= 90 ? 'extremely' : 'very'} stratified. The reliance on the ${V.arcologies[0].FSNeoImperialistLaw2 === 1 ? 'Barons' : 'Societal Elite'} by the lower classes increases ${FSRestart >= 90 ? 'greatly' : ''} your authority.`);
		authGrowth += FSRestart;
	}

	const FSPaternalist = V.arcologies[0].FSPaternalist;
	if (FSPaternalist >= 50) {
		r.push(`Your ${FSPaternalist >= 90 ? 'extremely' : ''} paternalistic society has the unfortunate side effects of spreading dangerous ideals in the arcology, ${FSPaternalist >= 90 ? 'greatly' : ''} damaging your authority.`);
		authGrowth -= Math.clamp(FSPaternalist, 0, 100);
	}

	const FSNull = V.arcologies[0].FSNull;
	if (FSNull >= 50) {
		r.push(`${FSNull >= 90 ? 'Extreme' : 'Mild'} cultural openness allows dangerous ideas to spread in your arcology, ${FSNull >= 90 ? 'greatly' : ''} damaging your authority.`);
		authGrowth -= FSNull;
	}

	if (V.SecExp.buildings.propHub) {
		if (V.SecExp.buildings.propHub.upgrades.miniTruth >= 1) {
			r.push(`Your authenticity department works tirelessly to impose your authority in all of the arcology.`);
			authGrowth += (15 * V.SecExp.buildings.propHub.upgrades.miniTruth);
		}
		if (V.SecExp.buildings.propHub.upgrades.secretService >= 1) {
			r.push(`Your secret services constantly keep under surveillance any potential threat, intervening when necessary. Rumors of the secretive security service and mysterious disappearances make your authority increase.`);
			authGrowth += (15 * V.SecExp.buildings.propHub.upgrades.secretService);
		}
	}

	if (App.Mods.SecExp.upkeep.edictsAuth() > 0) {
		r.push(`Some of your authority is spent maintaining your edicts.`);
		authGrowth -= App.Mods.SecExp.upkeep.edictsAuth();
	}

	if (authGrowth > 0) {
		r.push(`This week <span class="green">authority has increased.</span>`);
	} else if (authGrowth === 0) {
		r.push(`This week <span class="yellow">authority did not change.</span>`);
	} else {
		r.push(`This week <span class="red">authority has decreased.</span>`);
	}
	App.Mods.SecExp.authorityX(authGrowth);

	if (V.SecExp.settings.rebellion.enabled === 1) {
		const authorityEffects = function(group) {
			let text;
			let bonus;
			if (V.SecExp.core.authority <= 3000) {
				text = `Your very low authority allows ${group} to think too freely.`;
				bonus = 30;
			} else if (V.SecExp.core.authority <= 6000) {
				text = `Your low authority allows ${group} to think too freely.`;
				bonus = 25;
			} else if (V.SecExp.core.authority <= 9000) {
				text = `Your moderate authority allows ${group} to think a bit too freely.`;
				bonus = 20;
			} else if (V.SecExp.core.authority <= 12000) {
				text = `Your good authority does not allow ${group} to think too freely.`;
				bonus = 15;
			} else if (V.SecExp.core.authority <= 15000) {
				text = `Your high authority does not allow ${group} to think too freely.`;
				bonus = 10;
			} else if (V.SecExp.core.authority <= 18000) {
				text = `Your very high authority does not allow ${group} to think too freely.`;
				bonus = 5;
			} else {
				text = `Your absolute authority does not allow ${group} to have a single free thought.`;
				bonus = 1;
			}
			return {text, bonus};
		};

		let slave;
		let citizen;
		const CSratio = V.ACitizens / V.ASlaves;
		r.push(`<br><br><strong>Slaves security analysis:</strong>`);
		r.push(authorityEffects('slaves').text); slave = authorityEffects('slaves').bonus;
		if (CSratio <= 0.4) {
			r.push(`There are a lot more slaves than citizens, making some doubt their masters are strong enough to stop them.`);
			slave += 30;
		} else if (CSratio <= 0.6) {
			r.push(`There are a lot more slaves than citizens, making some doubt their masters are strong enough to stop them.`);
			slave += 25;
		} else if (CSratio <= 0.8) {
			r.push(`There are more slaves than citizens, making some doubt their masters are strong enough to stop them.`);
			slave += 20;
		} else if (CSratio <= 1) {
			r.push(`There are more slaves than citizens, making some doubt their masters are strong enough to stop them.`);
			slave += 15;
		} else if (CSratio <= 1.5) {
			r.push(`There are fewer slaves than citizens, making some doubt they would be strong enough to defeat their masters.`);
			slave += 10;
		} else if (CSratio >= 3) {
			r.push(`There are fewer slaves than citizens, making some doubt they would be strong enough to defeat their masters.`);
			slave -= 5;
		} else {
			r.push(`Citizen and slave populations are sufficiently balanced not to cause problems either way.`);
			slave -= 1;
		}
		if (V.SecExp.core.security <= 10) {
			r.push(`The very low security of the arcology leaves free space for slaves to organize and agitate.`);
			slave += 30;
		} else if (V.SecExp.core.security <= 30) {
			r.push(`The low security of the arcology leaves free space for slaves to organize and agitate.`);
			slave += 20;
		} else if (V.SecExp.core.security <= 60) {
			r.push(`The moderate security of the arcology does not allow free space for slaves to organize and agitate.`);
			slave += 10;
		} else if (V.SecExp.core.security >= 90) {
			r.push(`The high security of the arcology does not allow free space for slaves to organize and agitate.`);
			slave -= 5;
		} else {
			r.push(`The high security of the arcology does not allow free space for slaves to organize and agitate.`);
			slave -= 1;
		}
		if (FutureSocieties.isActive('FSDegradationist')) {
			r.push(`Many slaves are so disgusted by your degradationist society, that they are willing to rise up against their masters to escape.`);
			slave += 30;
		} else if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`Many slaves are content to live in your paternalist society.`);
			slave -= 5;
		} else {
			slave += 5;
		}
		if (FutureSocieties.isActive('FSRestart')) {
			r.push(`Many slaves are worried by your eugenics projects and some are pushed towards radicalization.`);
			slave += 30;
		} else if (FutureSocieties.isActive('FSRepopulationFocus')) {
			r.push(`Many slaves are pleasantly happy of your repopulation effort, affording them the freedom to reproduce.`);
			slave -= 5;
		} else {
			slave += 5;
		}

		r.push(`<br><br><strong>Citizens security analysis:</strong>`);
		r.push(authorityEffects('your citizens').text); citizen = authorityEffects('your citizens').bonus;
		if (V.SecExp.core.crimeLow >= 90) {
			r.push(`The very high crime level of the arcology breeds extreme discontent between your citizens.`);
			citizen += 30;
		} else if (V.SecExp.core.crimeLow >= 60) {
			r.push(`The high crime level of the arcology breeds high discontent between your citizens.`);
			citizen += 15;
		} else if (V.SecExp.core.crimeLow >= 30) {
			r.push(`The low crime level of the arcology leaves your citizens happy and satisfied.`);
			citizen += 5;
		} else {
			r.push(`The very low crime level of the arcology leaves your citizens happy and satisfied.`);
			citizen -= 5;
		}

		const militia = V.SecExp.edicts.defense.militia;
		// WARNING the variable meaning is the opposite to its name
		const militarizedSociety = !(new App.Utils.Arcology()).fsActiveSome(
			'FSRomanRevivalist', 'FSAztecRevivalist', 'FSEgyptianRevivalist',
			'FSEdoRevivalist', 'FSArabianRevivalist', 'FSChineseRevivalist',
			'FSNeoImperialist', 'FSAntebellumRevivalist');
		if (militia >= 1) {
			if (militia >= 4) {
				r.push(`${!militarizedSociety ? 'Many' : 'Some'} of your citizens are offended by your ${militia === 5 ? 'extreme' : ''} militarization of the arcology's society.`);
				if (!militarizedSociety) {
					citizen += militia === 5 ? 20 : 15;
				} else {
					citizen += militia === 5 ? 10 : 5;
				}
			} else {
				citizen += !militarizedSociety ? 10 : -5;
			}
		}
		if (FutureSocieties.isActive('FSNull')) {
			r.push(`Many of your more conservative citizens do not enjoy the cultural freedom you afford the residents of the arcology.`);
			citizen += either(20, 30);
		}
		if (FutureSocieties.isActive('FSRestart')) {
			if (CSratio > 2 || CSratio > 1) {
				r.push(`Your citizens are not happy with the ${CSratio > 2 ? 'noticeable' : ''} lack of slaves compared to their numbers.`);
				citizen += CSratio > 2 ? 20 : 15;
			} else if (CSratio < 0.5) {
				citizen -= 5;
			}
		} else if (FutureSocieties.isActive('FSRepopulationFocus')) {
			if (CSratio < 0.5 || CSratio < 1) {
				r.push(`Your citizens are not happy about being outbred by the slaves of the arcology.`);
				citizen += CSratio < 0.5 ? 20 : 15;
			} else if (CSratio > 1.4) {
				citizen += 5;
			}
		}

		slave = Math.clamp(slave, 0, 95);
		citizen = Math.clamp(citizen, 0, 95); // rolls to see if event happens - there's always a min 5% chance nothing happens
		const roll = random(1, slave + citizen);
		slave = Math.trunc(slave * V.SecExp.settings.rebellion.speed); citizen = Math.trunc(citizen * V.SecExp.settings.rebellion.speed);
		if (V.SecExp.buildings.riotCenter && V.SecExp.buildings.riotCenter.brainImplant === 106) {
			slave /= 2; citizen /= 2;
		}

		let rebellionEventFires;
		if (roll <= slave && random(1, 100) < slave) {
			rebellionEventFires = 'slave';
		} else if (roll > slave && random(1, 100) < citizen) {
			rebellionEventFires = 'citizen';
		}

		const oldTension = V.SecExp.rebellions.tension;
		if (rebellionEventFires) { // if there is an advancement selects a random mini event
			let miniEvent;
			let rand;
			V.SecExp.rebellions[rebellionEventFires + 'Progress'] += random(1, 5);
			if (V.SecExp.rebellions.tension !== 0) {
				V.SecExp.rebellions[rebellionEventFires + 'Progress'] *= Math.trunc(random(1, 5) * (V.SecExp.rebellions.tension / 100) * 10); // progress scales with tension
			}
			if (V.SecExp.rebellions.tension <= 33) {
				miniEvent = rebellionEventFires === 'slave' ? 1 : 4;
				V.SecExp.rebellions.tension += random(1, 5);
				rand = random(0, 6);
			} else if (V.SecExp.rebellions.tension <= 66) {
				miniEvent = rebellionEventFires === 'slave' ? 2 : 5;
				V.SecExp.rebellions.tension += random(5, 10);
				rand = random(0, 5);
			} else {
				miniEvent = rebellionEventFires === 'slave' ? 3 : 6;
				V.SecExp.rebellions.tension += random(10, 15);
				rand = random(0, 4);
			}

			r.push(`<br><br>`);
			const {HeU, heU, hisU, himU, himselfU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
			switch (miniEvent) {
				case 1:
					if (rand === 0) {
						r.push(`This week several slaves were found plotting the death of their master. They were quickly dealt with, but their owner's choice of punishment did little to calm tensions in the arcology.`);
					} else if (rand === 1) {
						r.push(`This week a large group of slaves attempted to escape. Several were recaptured, but others were deemed too dangerous and were shot on sight. The unfortunate circumstances raised the disapproval of many citizens, either because of the waste of good slaves or the brutality with which the operation was carried. With a bit of luck, however, the incident will be soon forgotten.`);
					} else if (rand === 2) {
						r.push(`This week books of unknown origin and dangerous content were found in the possession of several slaves. They were mostly sociopolitical treaties, making it clear that the intent of the ones responsible was to fan the fire of rebellion. The books were quickly collected and archived, hopefully this affair will not have lasting consequences.`);
					} else if (rand === 3) {
						r.push(`This week a citizen was caught giving refuge to an escaped slave. He was not able to pay for the value of the stolen goods, so he was processed as the case required and the slave returned to their rightful master. Many questions however remain without answers.`);
					} else if (rand === 4) {
						r.push(`This week a member of a well known anti-slavery group was caught trying to infiltrate the arcology. During the capture attempt shots were fired and several guards were injured, and in the end the fugitive unfortunately managed to escape. Reports indicate several slaves helped the criminal, some going as far as using themselves as shields against the bullets of the security drones.`);
					} else if (rand === 5) {
						r.push(`This week a slave was caught attempting to sabotage a machine in one of the factories. ${HeU} explained ${hisU} action as "trying to defend ${himselfU} from a dangerous machine". Reports confirmed that the apparatus is indeed quite deadly, having killed several slaves since it was installed, but the expert way ${heU} handled the sabotage leaves open the possibility of a deliberate plan or even external help.`);
					} else {
						r.push(`This week a slave was found dead in one of the sewer tunnels. It seems ${heU} was stabbed repeatedly with a sharp object. ${HeU} was fairly famous for ${hisU} capabilities as a slave trainer; ${hisU} old master spent not an insignificant amount of money trying to find ${himU} once he realized ${heU} was missing. The episode might have been a simple mugging gone wrong, but ${hisU} activities as a slave breaker might have played a role in ${hisU} homicide.`);
					}
					break;
				case 2:
					if (rand === 0) {
						r.push(`This week some strange reports came in: it seems some assemblies of slaves were observed several nights in a row. The slaves were traced and their masters notified, but many suspect there may be something deeper than a few slaves congregating in the night.`);
					} else if (rand === 1) {
						r.push(`This week an underground railroad was discovered. The rebels did not go down without a fight, but in the end your ${V.mercenaries >= 1 ? 'mercenaries' : 'security drones'} managed to destroy the old tunnels they were using to ship out slaves out of the arcology.`);
					} else if (rand === 2) {
						r.push(`This week a famous citizen was assaulted and brutally murdered by his slaves. The ones responsible were apprehended and dealt with easily enough, but the mere fact something like this could have happened is concerning. Those slaves had to be aware of their certain doom.`);
					} else if (rand === 3) {
						r.push(`This week a group of slavers entering the arcology was assaulted. Many reported heavy injuries, but fortunately there were no casualties. The attackers were disguised, but the security systems already identified several slaves who were likely part of the group, based on camera feeds.`);
					} else if (rand === 4) {
						r.push(`This week the waterways were found infected by a virulent pathogen. The cause was later found to be a diseased slave that died while in the maintenance tunnels. It's not clear if the slave was there because of orders given to ${himU} or if ${heU} was trying to escape.`);
					} else {
						r.push(`This week a sleeper cell of a famous anti slavery organization was discovered in the low levels of the arcology. The group, however, was aware of the coming security forces and retreated before they could be dealt with.`);
					}
					break;
				case 3:
					if (rand === 0) {
						r.push(`This week a group of slaves took control of one of the manufacturing plants and barricaded themselves inside. It took several days of negotiations and skirmishes to finally end this little insurrection. Many of the slaves involved will be executed in the next few days.`);
					} else if (rand === 1) {
						r.push(`This week a number of shops were burned to the ground by rioting slaves and sympathetic citizens. It took considerable effort for the security forces to take control of the situation. Harsh punishment is required and scheduled for the instigators.`);
					} else if (rand === 2) {
						r.push(`This week a mass escape attempt was barely stopped before becoming a catastrophe. Many citizens were trampled by the desperate horde of slaves. It will take some time to restore the streets involved to working order.`);
					} else if (rand === 3) {
						r.push(`This week a number of riots inflamed the arcology. Many slaves took violent actions against citizens and security personnel. The number of victims keeps getting higher as still now the last sparks of revolt are still active.`);
					}
					break;
				case 4:
					if (rand === 0) {
						r.push(`This week a citizen refused to pay rent, claiming ideological opposition to the arcology's ownership policies. He was quickly dealt with, but his words might not have fallen silent yet.`);
					} else if (rand === 1) {
						r.push(`This week books of unknown origin and dangerous content were found in the possession of several citizens. They were mostly sociopolitical treaties, making it clear that the intent of the ones responsible was to fan the fire of rebellion. Most of them were bought and archived, but a few are still circling amongst the citizens of the arcology.`);
					} else if (rand === 2) {
						r.push(`This week a citizen was caught giving refuge to other citizens, who would be liable to be enslaved because of their debts. The situation was quickly resolved, but the misplaced generosity of that citizen might have inflamed a few souls.`);
					} else if (rand === 3) {
						r.push(`This week a citizen died in one of the factories. His death sparked some outrage, even some talk of protests against the owners of the factory, but things seem to have calmed down for now.`);
					} else if (rand === 4) {
						r.push(`This week a citizen refused to be evicted from his house. After some negotiations the man was forcibly removed from the property by your security forces. Unfortunately the forced entry caused some damage to the building.`);
					} else if (rand === 5) {
						r.push(`This week a citizen refused to be enslaved as his contract established. With an impressive display of his rhetoric capabilities he managed to gather a small crowd agreeing with his position. The impromptu assembly was promptly disrupted by the drones.`);
					} else {
						r.push(`This week a security drone was found disabled and stripped of important electronic components. It seems the act was not dictated by greed, as the most precious parts of the drone were left on the machine, but rather to cover up something that the drone saw.`);
					}
					break;
				case 5:
					if (rand === 0) {
						r.push(`This week a factory was subject to a strike by a group of citizens protesting against the owner. They were promptly arrested and the factory returned to its rightful proprietor by your security department.`);
					} else if (rand === 1) {
						r.push(`This week a group of citizens organized a protest against the systemic enslavement of the citizens of the arcology. Their little parade gathered a surprisingly large crowd, but it was nonetheless quickly suppressed by your forces.`);
					} else if (rand === 2) {
						r.push(`This week the security department registered the formation of several assemblies of citizens, whose purpose seems to be political in nature. For now no further steps were taken, but it's a worrying sign of further political opposition within the arcology.`);
					} else if (rand === 3) {
						r.push(`This week there was a protest against one of the wealthiest citizen of the arcology. Many criticize his near monopoly. Supporters of the citizen met the protesters on the streets and it was just thanks to the intervention of the security drones that violence was avoided.`);
					} else if (rand === 4) {
						r.push(`This week several cameras were sabotaged and in many cases damaged beyond repair. A group of anonymous citizens claims to be responsible; their motivation is apparently the excessive surveillance in the arcology and their attack a response to the breach of their privacy.`);
					} else {
						r.push(`This week several citizens barricaded themselves in a private brothel. It seems their intention is to protest against the use of ex-citizens in the sex trade, claiming that such a position is unfitting for them. The problem was quickly resolved with the intervention of the security department.`);
					}
					break;
				case 6:
					if (rand === 0) {
						r.push(`This week the arcology was shaken by a number of strikes throughout the manufacturing levels. Many lament the predatory nature of Free Cities society, many other just want to cause damage to their perceived oppressors. It was a significant effort for the security department to stop all protests.`);
					} else if (rand === 1) {
						r.push(`This week several factories were set aflame by their workers. The security department worked day and night to control the fire and apprehend the criminals behind the act. Many are known dissidents, but there are a fair few new faces within them. This is a worrying sign.`);
					} else if (rand === 2) {
						r.push(`This week numerous riots exploded all over the arcology. Many citizens took to the streets to protest against the arcology owner and its supporters. The security forces slowly managed to stop the rioters, with no small amount of trouble and only through generous use of violence.`);
					} else if (rand === 3) {
						r.push(`This week a massive protest of citizens and slaves gathered just outside the penthouse. The crowd was dispersed only after several hours. There were several victims from both sides and no shortage of injured.`);
					}
					break;
			}
			V.SecExp.rebellions.tension = Math.clamp(V.SecExp.rebellions.tension, 0, 100);
		} else if (V.SecExp.rebellions.tension > 0) { // otherwise SecExp.rebellions.tension decays
			r.push(`<br><br><strong>Tension</strong>:`);
			if (V.SecExp.buildings.riotCenter && V.SecExp.buildings.riotCenter.upgrades.freeMedia >= 1) {
				r.push(`The guaranteed free media access you offer does wonders to lower tensions in the arcology.`);
				V.SecExp.rebellions.tension = Math.trunc(Math.clamp(V.SecExp.rebellions.tension - V.SecExp.buildings.riotCenter.upgrades.freeMedia / 2, 0, 100));
			}
			r.push(`In the absence of noteworthy events, tensions in the arcology are able to relax.`);
			V.SecExp.rebellions.tension = Math.trunc(Math.clamp(V.SecExp.rebellions.tension * 0.97, 0, 100));
		}

		if (V.SecExp.rebellions.tension < oldTension) {
			r.push(`<br><br>This week <span class="green">tensions relaxed.</span><br>`);
		} else if (V.SecExp.rebellions.tension === oldTension && V.SecExp.rebellions.tension !== 0) {
			r.push(`<br><br>This week <span class="yellow">tensions did not change.</span><br>`);
		} else if (V.SecExp.rebellions.tension > oldTension) {
			r.push(`<br><br>This week <span class="red">tension rose</span> and <span class="red">${rebellionEventFires} malcontent increased.</span><br>`);
		} else if (!Number.isInteger(V.SecExp.rebellions.tension)) {
			r.push(`<br><br><span class="red">Error: tension is outside accepted range.</span><br>`);
		}

		App.Mods.SecExp.generator.rebellion(); // rolls for rebellions
	}
	return App.Events.makeNode(r);
};
