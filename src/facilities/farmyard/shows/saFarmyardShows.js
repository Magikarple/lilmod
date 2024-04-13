/**
 * Returns a string describing the effects of the slave putting on shows.
 * To see full effects, see farmyardShows.js
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Facilities.Farmyard.putOnShows = function(slave) {
	const {he, him, his, hers, He, His} = getPronouns(slave);
	const incomeStats = getSlaveStatisticData(slave, V.facility.farmyard);
	const arcology = V.arcologies[0];
	const beautyString = beautiful(slave);
	const prettyString = pretty(slave);

	const heavyMods = SlaveStatsChecker.modScore(slave).total > 20;

	const text = [];

	if (V.seeBestiality) {
		seX(slave, "bestiality", "animal", "bestiality", random(35, 65));
	}

	text.push(
		`${He} ${V.farmyardShows < 2 ? `also ` : ``}puts on shows with animals this week.`,
		FSEffects(),
		virginity(),
		careers(),
		prestige(),
		health(),
		face(),
		devotion(),
		weight(),
		muscles(),
		eyesight(),
		hearing(),
		pregnancy(),
		tiredness(),
		intelligence(),
		energy(),
		fetish(),
		behavioralFlaw(),
		behavioralQuirk(),
		sexualFlaw(),
		sexualQuirk(),
		openness(),
		rival(),
	);

	incomeStats.income += Math.trunc(App.Facilities.Farmyard.farmShowsIncome(slave));

	return text.join(' ');

	function FSEffects() {
		const text = [];

		if (FutureSocieties.isActive('FSSupremacist', arcology)) {
			if (isSuperiorRace(slave)) {
				if (V.seeBestiality) {
					text.push(`Society <span class="reputation dec">disapproves</span> of your allowing a member of the elite race to be degraded in such a fashion, and thus ${he} didn't earn as much.`);
				} else {
					text.push(`Since ${arcology.FSSupremacistRace} slaves are in fashion, ${he} attracts a little more attention than if ${he} wasn't ${arcology.FSSupremacistRace}.`);
				}
			} else {
				text.push(`Society doesn't disapprove of ${him} not being ${arcology.FSSupremacistRace}, but ${he} doesn't earn as much as ${he} would if ${he} was.`);
			}
		}

		if (FutureSocieties.isActive('FSSubjugationist', arcology)) {
			if (isInferiorRace(slave)) {
				if (V.seeBestiality) {
					text.push(`Society <span class="reputation inc">approves</span> of the degradation you submit your ${arcology.FSSubjugationistRace} slaves to, and so ${he} earns you a bit more.`);
				} else {
					// FIXME: Type 'FC.NoObject' is not assignable to type 'string'.
					text.push(`Fewer people want to go see ${addA(arcology.FSSubjugationistRace)} slave put on a show, and so ${he} doesn't earn as much as ${he} otherwise could.`);
				}
			} else {
				if (V.seeBestiality) {
					text.push(`Society doesn't disapprove of ${him} not being ${arcology.FSSubjugationistRace}, but ${he} doesn't earn as much as ${he} would if ${he} was.`);
				}
			}
		}

		if (FutureSocieties.isActive('FSRepopulationFocus', arcology)) {
			if (isPreg(slave)) {
				if (slave.eggType === "human") {
					text.push(`Society <span class="reputation inc">greatly approves</span> of your having pregnant slaves ${V.seeBestiality ? `have sex` : `put on shows`} with animals.`);
				} else {
					text.push(`Society is <span class="reputation dec">disgusted</span> by ${his} pregnancy when they realize that what it is in ${his} womb is not human.`);
				}
			}
		}

		if (FutureSocieties.isActive('FSRestart', arcology)) {
			if (isPreg(slave)) {
				if (isEliteBreeder(slave)) {
					if (slave.eggType === "human") {
						text.push(`Society is <span class="reputation dec">horrified</span> by the fact that you would dare defile a slave deemed fit for humanity's revival in such a manner, especially one that is carrying the future of the planet.`);
					} else {
						text.push(`Society is <span class="reputation dec">absolutely repulsed</span> by the fact that you would dare defile a slave deemed fit for humanity's revival in such a manner, especially when they learn that what is in ${his} womb is not even human.`);
					}
				} else {
					if (slave.eggType === "human") {
						text.push(`Society is <span class="reputation dec">extremely disgusted</span> by ${his} pregnancy and the fact that you would have ${him} ${V.seeBestiality ? `have sex` : `put on shows`} with animals while sporting a baby bump.`);
					} else {
						text.push(`Society is disgusted by ${his} pregnancy until they learn that what is in ${his} womb is not human.`);
					}
				}
			} else {
				if (V.seeBestiality && isEliteBreeder(slave)) {
					text.push(`Society is <span class="reputation dec">heavily disapproving</span> of the fact that you would dare defile a slave deemed fit for humanity's revival in such a manner.`);
				}
			}
		}

		if (FutureSocieties.isActive('FSGenderRadicalist', arcology)) {
			if (slave.dick > 0) {
				text.push(`${His} patrons <span class="reputation inc">approve</span> of the fact that ${he} has a dick.`);
			} else {
				text.push(`${His} patrons <span class="reputation dec">are disappointed</span> that ${he} doesn't have a dick.`);
			}
		}

		if (FutureSocieties.isActive('FSGenderFundamentalist', arcology)) {
			if (isPreg(slave) || App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
				text.push(`${His} viewers <span class="reputation inc">approve</span> of the fact that ${he} is sporting a baby bump${App.Data.misc.fakeBellies.includes(slave.bellyAccessory) ? `, even though ${hers} isn't real` : ``}.`);
			} else {
				text.push(`${His} viewers <span class="reputation dec">are disappointed</span> that ${he} isn't pregnant.`);
			}
		}

		if (FutureSocieties.isActive('FSPaternalist', arcology)) {
			if (V.seeBestiality) {
				if (V.policies.bestialityOpenness) {
					text.push(`Your citizens would normally disapprove of your using slaves as toys for your animals, but the policy you enacted encouraging bestiality, combined with some clever, subtle advertising, leads them to see nothing wrong with it.`);
					if (slave.devotion > 50) {
						text.push(`That ${slave.slaveName} seems to be enjoying ${him}self so thoroughly also <span class="reputation inc">helps put their minds at ease.</span>`);
					}
				} else {
					if (V.farmyardBreeding) {
						if (V.farmyardRestraints) {
							text.push(`Your citizens are <span class="reputation dec">extremely disapproving</span> of the fact that you would allow your slaves to be treated as nothing more than a bound breeding toy for your animals.`);
						} else {
							text.push(`Your citizens are <span class="reputation dec">highly disapproving</span> of the fact that you would allow your slaves to be treated as nothing more than a breeding toy for your animals.`);
						}
					} else {
						if (V.farmyardRestraints) {
							text.push(`Your citizens are <span class="reputation dec">very disapproving</span> of the fact that you would allow your slaves to be treated as nothing more than a bound toy for your animals.`);
						} else {
							text.push(`Your citizens are <span class="reputation dec">disapproving</span> of the fact that you would allow your slaves to be treated as nothing more than a toy for your animals.`);
						}
					}
				}
			}
		}

		if (FutureSocieties.isActive('FSDegradationist', arcology)) {
			if (V.seeBestiality) {
				if (V.farmyardBreeding) {
					if (V.farmyardRestraints) {
						text.push(`Your citizens are <span class="reputation dec">extremely approving</span> of the fact that you would allow your slaves to be treated as nothing more than a bound breeding toy for your animals.`);
					} else {
						text.push(`Your citizens are <span class="reputation dec">highly approving</span> of the fact that you would allow your slaves to be treated as nothing more than a breeding toy for your animals.`);
					}
				} else {
					if (V.farmyardRestraints) {
						text.push(`Your citizens are <span class="reputation dec">very approving</span> of the fact that you would allow your slaves to be treated as nothing more than a bound toy for your animals.`);
					} else {
						text.push(`Your citizens are <span class="reputation dec">approving</span> of the fact that you would allow your slaves to be treated as nothing more than a toy for your animals.`);
					}
				}
			}
		}

		if (FutureSocieties.isActive('FSBodyPurist', arcology)) {
			if (SlaveStatsChecker.isModded(slave)) {
				text.push(`The members of the audience <span class="reputation dec">disapprove</span> that you would use a slave with ${heavyMods ? `such heavy` : ``} modifications to put on shows.`);
			}
		}

		if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
			if (SlaveStatsChecker.isModded(slave)) {
				text.push(`The members of the audience <span class="reputation inc">approve</span> that you would use a slave with ${heavyMods ? `such heavy` : ``} modifications to put on shows.`);
			}
		}

		if (FutureSocieties.isActive('FSYouthPreferentialist', arcology)) {
			if (isYoung(slave)) {
				text.push(`${arcology.name}'s citizens <span class="reputation inc">approve</span> of your using young slaves to put on shows.`);
			} else {
				text.push(`${arcology.name}'s citizens <span class="reputation dec">disapprove</span> of your using such old slaves to put on shows.`);
			}
		}

		if (FutureSocieties.isActive('FSMaturityPreferentialist', arcology)) {
			if (isYoung(slave)) {
				text.push(`${arcology.name}'s citizens <span class="reputation inc">approve</span> of your using mature slaves to put on shows.`);
			} else {
				text.push(`${arcology.name}'s citizens <span class="reputation dec">disapprove</span> of your using such young slaves to put on shows.`);
			}
		}

		if (FutureSocieties.isActive('FSSlimnessEnthusiast', arcology)) {
			if (isSlim(slave)) {
				text.push(`${His} slim body <span class="reputation inc">attracts a wider audience.</span>`);
			} else {
				text.push(`Society finds your using a slave with such a flabby body <span class="reputation dec">disgusting.</span>`);
			}
		}

		if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
			if (isStacked(slave)) {
				text.push(`Society <span class="reputation inc">approves</span> of the fact that you respect their ideals in using a slave with larger assets.`);
			}
		}

		if (FutureSocieties.isActive('FSPastoralist', arcology)) {
			if (slave.boobs >= 1000) {
				text.push(`The fact that ${slave.slaveName} has such large udders <span class="reputation inc">pleases your citizens.</span>`);
			}

			if (slave.lactation > 0) {
				text.push(`Your citizens ${slave.boobs >= 1000 ? `also ` : ``}<span class="reputation inc">approve</span> of the fact that ${he} is visibly lactating.`);
			}
		}

		if (FutureSocieties.isActive('FSPhysicalIdealist', arcology)) {
			if (genderLawPass(slave)) {
				text.push(`The fact that ${slave.slaveName} has what is considered the ideal form also <span class="reputation inc">helps ${him} attract attention,</span> and so ${he} earns a bit more.`);
			} else {
				text.push(`${His} form isn't exactly what ${arcology.name}'s citizens consider ideal, and so ${he} doesn't <span class="reputation dec">earn as much</span> as ${he} could have otherwise.`);
			}
		}

		if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
			if (slave.weight > 10) {
				text.push(`Since ${slave.slaveName} is large enough to please ${arcology.name}'s citizens, ${he} earns slightly more.`);
			} else {
				text.push(`${He} doesn't earn quite as much ${he} would have if ${he} was a bit larger in size.`);
			}
		}

		if (FutureSocieties.isActive('FSPetiteAdmiration', arcology)) {
			if (heightPass(slave)) {
				text.push(`The fact that you are using such small slaves <span class="reputation inc">pleases your citizens.</span>`);
			} else {
				text.push(`The fact that you are using such small slaves <span class="reputation dec">displeases your citizens.</span>`);
			}
		}

		if (FutureSocieties.isActive('FSStatuesqueGlorification', arcology)) {
			if (heightPass(slave)) {
				text.push(`Your citizens <span class="reputation inc">approve</span> of your using such statuesque slaves for putting on shows.`);
			} else {
				text.push(`Your citizens <span class="reputation dec">disapprove</span> of your not using taller slaves for putting on shows.`);
			}
		}

		return text.join(' ');
	}

	function virginity() {
		if (V.seeBestiality) {
			if (slave.devotion > 50 && canBeDeflowered(slave)) {
				return `${slave.slaveName} promised the crowd ${he} would allow one of your animals to deflower ${him} onstage <span class="cash inc">if they all donated enough ¤,</span> and ${he} stayed true to ${his} word – <span class="virginity loss">${his} tight little ${slave.vagina === 0 ? `pussy` : `ass`} has been broken in.</span>`;
			}
		}
	}

	function careers() {
		const text = [];

		if (App.Data.Careers.General.entertainment.includes(slave.career)) {
			text.push(`${He} has experience with putting on shows from ${his} life before ${he} was a slave, making ${him} more effective at putting on shows.`);
		}

		if (App.Data.Careers.Leader.farmer.includes(slave.career)) {
			text.push(`${He} ${App.Data.Careers.General.entertainment.includes(slave.career) ? `also` : ``} has experience in working with animals from ${his} life before ${he} was a slave, making ${him} more effective at putting on shows.`);
		}

		return text.join(' ');
	}

	function prestige() {
		const text = [];

		if (slave.prestige === 1) {
			text.push(`Your citizens are so eager to see someone they recognize ${V.seeBestiality ? `be ${V.farmyardBreeding ? `bred` : `rutted`} by an animal` : `put on shows with an animal`} that they are willing to pay a bit more.`);
		} else if (slave.prestige === 2) {
			text.push(`Your citizens are so eager to see someone well-known ${V.seeBestiality ? `be ${V.farmyardBreeding ? `bred` : `rutted`} by an animal` : `put on shows with an animal`} that they are willing to pay a fair bit more.`);
		} else if (slave.prestige === 3) {
			text.push(`Your citizens are so eager to see someone so famous ${V.seeBestiality ? `be ${V.farmyardBreeding ? `bred` : `rutted`} by an animal` : `put on shows with an animal`} that they are willing to pay much more.`);
		}

		if (slave.porn.prestige === 1) {
			text.push(`${He} earns a bit more because some of your citizens already know ${him} from porn.`);
		} else if (slave.porn.prestige === 2) {
			text.push(`${He} earns quite a bit more because a lot of your citizens already know ${him} from porn.`);
		} else if (slave.porn.prestige === 3) {
			text.push(`${He} earns a lot more because ${he} is so famous from porn.`);
		}

		return text.join(' ');
	}

	function health() {
		if (slave.health.condition > 50) {
			return `${He} is in such excellent health that ${he} is able to put on longer and more energetic shows, earning you more.`;
		} else if (slave.health.condition < -20) {
			return `${His} poor health negatively affects ${his} ability to put on good shows, cutting into your profits.`;
		}
	}

	// TODO: add checks for family and relationships
	function face() {
		if (slave.face > 40) {
			return `${He} is so ${beautyString} that ${his} audience is willing to pay more to watch ${him} put on shows.`;
		} else if (slave.face > 10) {
			return `${He} is so ${prettyString} that ${his} audience is willing to pay more to watch ${him} put on shows.`;
		} else if (slave.face < -10) {
			return `${His} audience isn't willing to pay as much because of how unattractive ${his} face is.`;
		} else if (slave.face < -40) {
			return `${His} audience isn't willing to pay as much because of how hard ${his} face is to look at.`;
		}
	}

	// TODO: incorporate seeBestiality, breeding, and restraints
	function devotion() {
		if (slave.devotion > 50) {
			if (slave.trust > 50) {
				return `${He} is so devoted that ${he} works ${his} hardest to make ${his} show a good one.`;
			} else if (slave.trust < -50) {
				return `${He} is both devoted to you and terrified of you, so ${he} tries ${his} best to make ${his} show a good one.`;
			}
		} else if (slave.devotion < -50) {
			if (slave.trust > 50) {
				return `${slave.slaveName} purposefully does the bare minimum ${he} can get away with to spite you.`;
			} else if (slave.trust < -50) {
				return `${slave.slaveName} refuses to do anything without punishment, which is evident from ${his} meager earnings.`;
			}
		}
	}

	function weight() {
		if (slave.weight > 30) {
			if (!FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
				return `Your citizens are not willing to pay as much to see such a fat slave put on shows, so ${he} loses some income.`;
			}
		} else if (slave.weight < -30) {
			return `Your citizens don't like watching such a sickly-looking slaves put on shows, so ${he} loses some income.`;
		}
	}

	function muscles() {
		if (slave.muscles < -30) {
			return `${slave.slaveName} is so weak that ${he} cannot even properly handle the animals ${he}'s assigned to ${V.seeBestiality ? `fuck` : `work with`}, and isn't able to put on any sort of meaningful show.`;
		}
	}

	function eyesight() {
		if (!canSeePerfectly(slave)) {
			return `${His} ${!canSee(slave) ? `blindness makes it impossible` : `nearsightedness makes it harder`} for ${him} to see what ${he}'s doing, affecting ${his} ability to put on a good show.`;
		}
	}

	function hearing() {
		if (slave.hears < 0) {
			return `${His} ${slave.hears < -1 ? `lack of` : `poor`} hearing makes it difficult for ${him} to hear what ${his} audience wants from ${him}, which really affects ${his} earnings.`;
		}
	}

	function pregnancy() {
		if (isPreg(slave)) {
			return `${His}${slave.bellyPreg > 100000 ? ` advanced` : ``} pregnancy makes it more difficult for ${him} to effectively put on a good show.`;
		}
	}

	function tiredness() {
		if (slave.health.tired > 60) {
			return `${He} is so tired that the energy in ${his} shows is basically nonexistent, affecting ${his} profits.`;
		}
	}

	function intelligence() {
		if (slave.intelligence > 50) {
			return `Because ${he} is so intelligent, ${he} is able to tailor ${his} shows to ${his} audience, helping ${him} bring in more in profits.`;
		} else if (slave.intelligence < -50) {
			return `${He} is so slow that all ${he} can really do is just ${V.seeBestiality ? `lie there and take it` : `put on the most basic of moves`}, which your audience finds dull and uninteresting.`;
		}
	}

	function energy() {
		if (V.seeBestiality) {
			if (slave.energy > 95) {
				return `The fact that ${he} is a nymphomaniac helps ${him} to go for longer, allowing ${him} to really put on an amazing show.`;
			} else if (slave.energy > 80) {
				return `The fact that ${his} sex drive is so powerful helps ${him} to really put on good shows.`;
			} else if (slave.energy > 60) {
				return `The fact that ${his} sex drive is so good helps ${him} to put on good shows.`;
			} else if (slave.energy > 40) {
				return `${His} average sex drive allows ${him} to put on a decent show.`;
			} else if (slave.energy > 20) {
				return `The fact that ${his} sex drive is so poor affects ${his} performance.`;
			} else {
				return `The fact that ${his} sex drive is nonexistent really hinders ${his} ability to put on a decent show.`;
			}
		}
	}

	function fetish() {
		switch (slave.fetish) {
			case "submissive":
				if (V.seeBestiality) {
					if (slave.fetishKnown) {
						return `${He} is so submissive that ${he} willingly accepts ${his} position as an animal's fucktoy and <span class="reputation inc">is able to put on a decent show.</span>`;
					} else {
						return `${S.HeadGirl ? `${S.HeadGirl.slaveName} notices` : `You notice`} that ${slave.slaveName} seems to really have taken to ${his} position as a fucktoy for animals. <span class="lightcoral">${He}'s a submissive!</span>`;
					}
				} else {
					if (slave.fetishKnown) {
						return `Being a submissive, ${he} <span class="reputation dec">doesn't have the confidence required</span> to really put on a good show.`;
					} else {
						return `${slave.slaveName} doesn't seem to have the type of fortitude needed to put on a show, and after some probing, you discover why - it turns out <span class="lightcoral">${he}'s a submissive!</span>`;
					}
				}
			case "humiliation":
				if (V.seeBestiality) {
					if (slave.fetishKnown) {
						return `${slave.slaveName} uses the most of this humiliating experience to really put on a show, to <span class="reputation inc">the approval of ${his} audience.</span>`;
					}
				}
		}
	}

	function behavioralFlaw() {
		switch (slave.behavioralFlaw) {
			case "arrogant":
				return `${He} tries ${his} hardest to avoid ${V.seeBestiality ? `fucking animals` : `putting on shows`} because of ${his} arrogance, <span class="cash dec">which affects ${his} profits</span> and <span class="reputation dec">your reputation.</span>`;

			case "devout":
				return `${He} often prays ${V.seeBestiality ? ` while getting fucked by animals` : ` during ${his} shows`}, which your citizens <span class="reputation dec">find off-putting.</span>`;
		}
	}

	function behavioralQuirk() {
		switch (slave.behavioralQuirk) {
			case "sinful":
				return `${He} relishes in ${his} ability to do something so sinful and depraved, and <span class="reputation inc">really puts on a show.</span>`;
		}
	}

	function sexualFlaw() {
		switch (slave.sexualFlaw) {
			case "shamefast":
				return `${His} crippling shamefastness <span class="reputation dec">limits ${his} ability</span> to put on a decent show.`;
		}
	}

	function sexualQuirk() {
		switch (slave.sexualQuirk) {
			case "perverted":
				return `${His} shows are a <span class="reputation inc">real spectacle,</span> since ${he} is so perverted that ${he} is willing to go far beyond the bare minimum.`;
		}
	}

	function openness() {
		if (V.policies.bestialityOpenness > 0) {
			return `Society's acceptance of and enthusiasm towards bestiality earns ${him} quite a bit more than ${he} would have made otherwise.`;
		}
	}

	function rival() {
		if (slave.rivalry > 0 && V.seeBestiality && V.farmyardShows !== 0) {
			return `${getSlave(slave.rivalryTarget).slaveName} hates ${him} and is glad to see that ${he}'s been assigned to fuck animals all day.`;
		}
	}
};
