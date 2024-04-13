/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} descType
 * @returns {string}
 */
App.Desc.mind = function(slave, descType) {
	const r = [];
	const {
		he, him, his, He, His, hers, himself
	} = getPronouns(slave);
	if (slave.fuckdoll === 0) {
		r.push(App.Desc.eyes(slave, descType));

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`<span class="coral">${His} mind is fundamentally broken;</span> everything ${he} experiences will quickly be forgotten.`);
		} else {
			r.push(behavioralFlaws());
			r.push(behavioralQuirks());
			r.push(sexualFlaws());
			r.push(sexualQuirk());
			r.push(fetish());
		}
		r.push(attraction());
	} else {
		r.push(`It's impossible to tell what intelligence or inclinations a Fuckdoll might have by looking at it, but the most recent records indicate that this one is`);
		if (slave.intelligence + slave.intelligenceImplant > 95) {
			r.push(`<span class="deepskyblue">brilliant</span>`);
		} else if (slave.intelligence + slave.intelligenceImplant > 50) {
			r.push(`<span class="deepskyblue">highly intelligent</span>`);
		} else if (slave.intelligence + slave.intelligenceImplant > 15) {
			r.push(`of <span class="deepskyblue">above average intelligence</span>`);
		} else if (slave.intelligence + slave.intelligenceImplant >= -15) {
			r.push(`of average intelligence`);
		} else if (slave.intelligence + slave.intelligenceImplant >= -50) {
			r.push(`of <span class="orangered">below average intelligence</span>`);
		} else if (slave.intelligence + slave.intelligenceImplant >= -95) {
			r.push(`<span class="orangered">very stupid</span>`);
		} else if (slave.intelligence + slave.intelligenceImplant >= -100) {
			r.push(`<span class="orangered">a moron</span>`);
		}
		if (slave.intelligence >= -15) {
			if (slave.intelligenceImplant < 15) {
				r.push(`but is uneducated.`);
			} else if (slave.intelligenceImplant >= 30) {
				r.push(`and is well educated.`);
			} else {
				r.push(`and is educated.`);
			}
		} else {
			if (slave.intelligenceImplant < 15) {
				r.push(`and is uneducated.`);
			} else if (slave.intelligenceImplant >= 30) {
				r.push(`but is well educated.`);
			} else {
				r.push(`but is educated.`);
			}
		}

		if (slave.behavioralFlaw !== "none" || slave.sexualFlaw !== "none" || slave.behavioralQuirk !== "none" || slave.sexualQuirk !== "none") {
			if (slave.behavioralFlaw !== "none" || slave.sexualFlaw !== "none") {
				r.push(`${His} remaining mental flaws are likewise impossible to discern, but if ${he} was allowed out of ${his} suit, this Fuckdoll would probably still`);
				if (slave.behavioralFlaw !== "none") {
					switch (slave.behavioralFlaw) {
						case "hates men":
							r.push(`<span class="red">hate men</span>`);
							break;
						case "hates women":
							r.push(`<span class="red">hate women</span>`);
							break;
						case "gluttonous":
							r.push(`be a <span class="red">stress eater</span>`);
							break;
						default:
							r.push(`be <span class="red">${slave.behavioralFlaw}</span>`);
					}
				}
				if (slave.sexualFlaw !== "none") {
					if (slave.behavioralFlaw !== "none") {
						r.push(`and would still`);
					}
					switch (slave.sexualFlaw) {
						case "hates oral":
							r.push(`<span class="red">hate oral.</span>`);
							break;
						case "hates anal":
							r.push(`<span class="red">hate anal.</span>`);
							break;
						case "hates penetration":
							r.push(`<span class="red">hate penetration.</span>`);
							break;
						case "cum addict":
							r.push(`a <span class="yellow">cum addict.</span>`);
							break;
						case "anal addict":
							r.push(`an <span class="yellow">anal addict.</span>`);
							break;
						case "attention whore":
							r.push(`an <span class="yellow">attention whore.</span>`);
							break;
						case "breast growth":
							r.push(`have a <span class="yellow">breast obsession.</span>`);
							break;
						case "breeder":
							r.push(`have a <span class="yellow">breeding obsession.</span>`);
							break;
						default:
							r.push(`be <span class="red">${slave.sexualFlaw}.</span>`);
					}
				} else {
					r.push(`to an unacceptable degree.`);
				}
			}
			if (slave.behavioralQuirk !== "none" || slave.sexualQuirk !== "none") {
				r.push(`${His} character seems to retain some distinctiveness; ${he} may still`);
				if (slave.behavioralQuirk !== "none") {
					r.push(`be`);
					switch (slave.behavioralQuirk) {
						case "fitness":
							r.push(`<span class="green">a fitness fanatic</span>`);
							break;
						case "adores women":
							r.push(`<span class="green">adore women</span>`);
							break;
						case "adores men":
							r.push(`<span class="green">adore men</span>`);
							break;
						case "advocate":
							r.push(`<span class="green">an advocate</span>`);
							break;
						default:
							r.push(`<span class="green">${slave.behavioralQuirk}</span>`);
					}
				}
				if (slave.sexualQuirk !== "none") {
					if (slave.behavioralQuirk !== "none") {
						r.push(`and still`);
					}
					r.push(`be`);
					switch (slave.sexualQuirk) {
						case "romantic":
						case "perverted":
						case "caring":
						case "unflinching":
							r.push(`<span class="green"> ${slave.sexualQuirk}.</span>`);
							break;
						default:
							r.push(`a <span class="green"> ${slave.sexualQuirk}.</span>`);
					}
				} else {
					r.push(`in there.`);
				}
			}
		}

		if (slave.fetishKnown === 1) {
			r.push(`${His} recent biomedical readings indicate that ${he} still prefers`);
			switch (slave.fetish) {
				case "submissive":
					r.push(`<span class="lightcoral">being forced to submit</span>`);
					break;
				case "cumslut":
					r.push(`<span class="lightcoral">being facefucked</span>`);
					break;
				case "humiliation":
					r.push(`<span class="lightcoral">being fucked in public</span>`);
					break;
				case "buttslut":
					r.push(`<span class="lightcoral">being sodomized</span>`);
					break;
				case "boobs":
					r.push(`<span class="lightcoral">having ${his} breasts handled</span>`);
					break;
				case "pregnancy":
					r.push(`<span class="lightcoral">being inseminated</span>`);
					break;
				case "dom":
				case "sadist":
					r.push(`<span class="lightcoral">being on top</span>`);
					break;
				case "masochist":
					r.push(`<span class="lightcoral">being hurt</span>`);
					break;
				default:
					r.push(`<span class="lightcoral">having vanilla sex</span>`);
			}
			r.push(`to any other kind of use.`);
		}

		if (slave.attrKnown === 1) {
			r.push(`${His} suit usually forces ${him} to become aroused for use, but when ${he}'s allowed to react naturally, ${he} has`);
			if (slave.energy > 95) {
				r.push(`a <span class="green">nymphomaniac</span> need`);
			} else if (slave.energy > 80) {
				r.push(`a <span class="green">pathological need</span>`);
			} else if (slave.energy > 60) {
				r.push(`a <span class="green">powerful need</span>`);
			} else if (slave.energy > 40) {
				r.push(`a <span class="yellow">healthy need</span>`);
			} else if (slave.energy > 20) {
				r.push(`a <span class="red">weak need</span>`);
			} else {
				r.push(`<span class="red">no need</span>`);
			}
			r.push(`for external sexual stimulation, acts`);
			if (slave.attrXX <= 15) {
				r.push(`<span class="red">revolted</span>`);
			} else if (slave.attrXX <= 35) {
				r.push(`<span class="red">unhappy</span>`);
			} else if (slave.attrXX <= 65) {
				r.push(`indifferent`);
			} else if (slave.attrXX <= 85) {
				r.push(`<span class="green">eager</span>`);
			} else {
				r.push(`<span class="green">very enthusiastic</span>`);
			}
			r.push(`when a pussy is pressed against ${his} face hole, and`);
			if (slave.attrXY <= 15) {
				r.push(`<span class="red">struggles</span>`);
			} else if (slave.attrXY <= 35) {
				r.push(`<span class="red">does not react positively</span>`);
			} else if (slave.attrXY <= 65) {
				r.push(`does not react significantly`);
			} else if (slave.attrXY <= 85) {
				r.push(`<span class="green">seems pleased</span>`);
			} else {
				r.push(`is <span class="green">very happy</span>`);
			}
			r.push(`when a dick is pushed inside`);
			if (canDoVaginal(slave) && slave.vagina > 0 && canDoAnal(slave) && slave.anus > 0) {
				r.push(`either of ${his} lower holes.`);
			} else if (canDoVaginal(slave) && slave.vagina > 0) {
				r.push(`${his} front hole.`);
			} else if (canDoAnal(slave) && slave.anus > 0) {
				r.push(`${his} rear hole.`);
			} else {
				r.push(`it.`);
			}
		}
	}

	function behavioralFlaws() {
		const r = [];
		if (slave.behavioralFlaw === "arrogant") {
			if (slave.devotion < -20 && slave.trust >= -20) {
				r.push(`${He} is <span class="red">arrogant</span> and clings to ${his} dignity.`);
			} else if (slave.devotion < -20) {
				r.push(`${He} is still <span class="red">arrogant</span> at heart, but does ${his} best to hide it out of fear.`);
			} else if (slave.devotion <= 20) {
				r.push(`${He} is <span class="red">arrogant</span> and seems to think slavery beneath ${him}.`);
			} else {
				r.push(`Despite being well broken, ${he} seems to retain hints of <span class="red">arrogance.</span>`);
			}
		} else if (slave.behavioralFlaw === "bitchy") {
			if (slave.devotion < -20 && slave.trust >= -20) {
				r.push(`${He} is <span class="red">bitchy</span> and insults you every chance ${he} gets.`);
			} else if (slave.devotion < -20) {
				r.push(`${He} is still <span class="red">bitchy</span> at times, but does ${his} best to keep quiet out of fear.`);
			} else if (slave.devotion <= 20) {
				r.push(`${He} is <span class="red">bitchy</span> and constantly tries to get a word in edgewise.`);
			} else {
				r.push(`Since ${he} is well broken, ${he} tries to confine ${his} <span class="red">bitchy</span> remarks to your other slaves.`);
			}
		} else if (slave.behavioralFlaw === "liberated") {
			if (slave.devotion < -20 && slave.trust >= -20) {
				r.push(`${He} strongly believes that <span class="red">slavery is wrong,</span> and resists it as best ${he} can.`);
			} else if (slave.devotion < -20) {
				r.push(`${He} strongly believes that <span class="red">slavery is wrong,</span> but usually keeps quiet out of fear.`);
			} else if (slave.devotion <= 20) {
				r.push(`${He} strongly believes that <span class="red">slavery is wrong,</span> and rarely misses a chance to complain about it.`);
			} else {
				r.push(`${He} strongly believes that <span class="red">slavery is wrong,</span> but has learned to keep it to ${himself}.`);
			}
		} else if (slave.behavioralFlaw === "devout") {
			r.push(`${He} is <span class="red">devoutly religious,</span>`);
			if (slave.devotion < -20 && slave.trust >= -20) {
				r.push(`and uses ${his} faith as a wellspring of resistance.`);
			} else if (slave.devotion < -20) {
				r.push(`and uses ${his} faith as a place of refuge.`);
			} else if (slave.devotion <= 20) {
				r.push(`and uses ${his} faith as a private place within ${himself}.`);
			} else {
				r.push(`but has learned to keep ${his} faith private.`);
			}
		} else if (slave.behavioralFlaw === "odd") {
			r.push(`${He} behaves <span class="red">oddly,</span> saying and doing random things.`);
		} else if (slave.behavioralFlaw === "hates men") {
			r.push(`${He} <span class="red">strongly dislikes</span> being around`);
			if (slave.attrXY >= 85 && slave.energy >= 40) {
				r.push(`men; since ${he} loves the dick, ${he}'s forced to put up with them.`);
			} else if (slave.attrXY >= 65 && slave.energy >= 40) {
				r.push(`men; since ${he} likes the dick, ${he} reluctantly puts up with them.`);
			} else {
				r.push(`men.`);
			}
		} else if (slave.behavioralFlaw === "hates women") {
			r.push(`${He} <span class="red">strongly dislikes</span> being around`);
			if (slave.attrXX >= 85 && slave.energy >= 40) {
				r.push(`women; since ${he} loves pussy, ${he}'s forced to put up with them.`);
			} else if ((slave.attrXX >= 65) && (slave.energy >= 40)) {
				r.push(`women; since ${he} likes pussy, ${he} reluctantly puts up with them.`);
			} else {
				r.push(`women.`);
			}
		} else if (slave.behavioralFlaw === "anorexic") {
			r.push(`${He} suffers from <span class="red">anorexia.</span>`);
		} else if (slave.behavioralFlaw === "gluttonous") {
			r.push(`${He} <span class="red">tends to overeat</span> whenever ${he} can, reacting to the rigors of sexual slavery with overeating.`);
		}
		return r.join(" ");
	}

	function behavioralQuirks() {
		const r = [];
		switch (slave.behavioralQuirk) {
			case "confident":
				r.push(`${He}'s <span class="green">confident,</span> and believes that ${he} has something of value to offer, even as a slave.`);
				break;
			case "cutting":
				r.push(`${He} often has a witty or <span class="green">cutting</span> remark ready, but knows when to keep them to ${himself}.`);
				break;
			case "funny":
				r.push(`${He}'s <span class="green">funny,</span> often providing a little comic relief.`);
				break;
			case "adores women":
				r.push(`${He} <span class="green">adores women,</span> and loves spending time with them.`);
				break;
			case "adores men":
				r.push(`${He} <span class="green">adores men,</span> and loves spending time with them.`);
				break;
			case "fitness":
				r.push(`${He}'s a <span class="green">fitness fanatic,</span> and almost gets off to a hard workout.`);
				break;
			case "insecure":
				r.push(`${He}'s <span class="green">insecure,</span> defining ${his} self worth by how much others want to fuck ${him}.`);
				break;
			case "sinful":
				if (!FutureSocieties.isActive('FSChattelReligionist')) {
					r.push(`${He}'s delightfully <span class="green">sinful,</span> taking real pleasure in breaking cultural mores.`);
				} else {
					r.push(`${He}'s a devout Chattel Religionist, and is aggressively <span class="green">sinful</span> against old world faiths. ${He} is enthusiastic about slutty religious clothing, and excited by intentional sacrilege like openly using old world religious icons as sex toys or having orgies on altars.`);
				}
				break;
			case "advocate":
				r.push(`${He}'s an <span class="green">advocate</span> for slavery, and can articulate what it's done for ${him}.`);
		}
		return r.join(" ");
	}

	function sexualFlaws() {
		const r = [];
		switch (slave.sexualFlaw) {
			case "hates oral":
				r.push(`${He} <span class="red">hates</span> oral sex and tries to avoid it.`);
				break;
			case "hates anal":
				r.push(`${He} <span class="red">hates</span> anal sex and tries to avoid it.`);
				break;
			case "hates penetration":
				r.push(`${He} <span class="red">hates</span> penetration and tries to avoid it.`);
				break;
			case "repressed":
				r.push(`${He} is <span class="red">sexually repressed,</span> retaining a fundamental distaste for sex from ${his} upbringing.`);
				break;
			case "idealistic":
				r.push(`${He} is <span class="red">sexually idealistic,</span> retaining a belief that sex should be based on love and consent.`);
				break;
			case "shamefast":
				r.push(`${He} is <span class="red">shamefast,</span> suffering crippling anxiety when naked.`);
				break;
			case "apathetic":
				r.push(`${He} is <span class="red">sexually apathetic,</span> often slipping into inertness during sex.`);
				break;
			case "crude":
				r.push(`${He} is <span class="red">sexually crude,</span> and has little sense of what partners find disgusting during sex.`);
				break;
			case "judgemental":
				r.push(`${He} is <span class="red">sexually judgemental,</span> and often denigrates ${his} sexual partners' performance.`);
				break;
			case "cum addict":
				r.push(`${He}'s a <span class="yellow">cum addict:</span> ${he} has a deep psychological addiction to`);
				if (V.PC.balls > 0) {
					r.push(`semen`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`pussyjuice`);
				}
				r.push(`and becomes anxious if ${he} goes for a few hours without drinking any.`);
				break;
			case "anal addict":
				r.push(`${He}'s an <span class="yellow">anal addict:</span> ${he} has a deep psychological need to be fucked in the ass and becomes anxious if ${he} goes for a few hours without anal.`);
				break;
			case "attention whore":
				r.push(`${He}'s an <span class="yellow">attention whore:</span> shocking and titillating spectators is more important to ${him} than the actual pleasure of sex.`);
				break;
			case "breast growth":
				r.push(`${He} has a <span class="yellow">breast growth obsession:</span> ${he}'s nearly incapable of believing that ${his} breasts are big enough.`);
				break;
			case "abusive":
				r.push(`${He}'s sexually <span class="yellow">abusive:</span> ${he} prefers taking sexual pleasure by force to having it offered to ${him}.`);
				break;
			case "malicious":
				r.push(`${He}'s sexually <span class="yellow">malicious:</span> ${he} gets off on others' anguish.`);
				break;
			case "self hating":
				r.push(`${He}'s filled with <span class="yellow">self hatred,</span> and is disturbingly willing to comply with things that might hurt ${him}.`);
				break;
			case "neglectful":
				r.push(`${He}'s sexually <span class="yellow">self neglectful,</span> and often shows no interest in getting off ${himself}.`);
				break;
			case "breeder":
				r.push(`${He}'s <span class="yellow">obsessed with being bred</span> to the point of fetishizing pregnancy itself as much as any act that leads to it.`);
				break;
			case "animal lover":
				r.push(`${He}'s an exclusive <span class="yellow">zoophile:</span> ${he} prefers sex with animals to sex with other humans.`);
				break;
		}
		return r.join(" ");
	}

	function sexualQuirk() {
		const r = [];
		switch (slave.sexualQuirk) {
			case "gagfuck queen":
				r.push(`${He}'s a <span class="green">gagfuck queen:</span> ${he}'s able to safely take a rough facefuck.`);
				break;
			case "painal queen":
				r.push(`${He}'s a <span class="green">painal queen:</span> ${he} knows exactly how much ${he} can take without getting hurt.`);
				break;
			case "strugglefuck queen":
				r.push(`${He}'s a <span class="green">strugglefuck queen:</span> ${he} can gauge exactly how much resistance ${his} partners want.`);
				break;
			case "tease":
				r.push(`${He}'s a <span class="green">tease,</span> and often displays a little flash of ${himself} followed by a blush.`);
				break;
			case "romantic":
				r.push(`${He}'s a <span class="green">romantic,</span> and persists in innocent pleasure in the closeness of sex.`);
				break;
			case "perverted":
				r.push(`${He}'s <span class="green">perverted,</span> and enjoys breaking sexual boundaries.`);
				break;
			case "caring":
				r.push(`${He}'s <span class="green">caring,</span> and enjoys bringing partners pleasure more than getting off ${himself}.`);
				break;
			case "unflinching":
				r.push(`${He}'s <span class="green">unflinching,</span> willing to do anything, even by the standards of sex slaves.`);
				break;
			case "size queen":
				r.push(`${He}'s <span class="green">a size queen;</span> preferring big cock is almost ${his} trademark.`);
		}
		return r.join(" ");
	}

	function fetish() {
		const r = [];
		if (slave.fetishKnown === 1) {
			switch (slave.fetish) {
				case "submissive":
					if (slave.sexualFlaw === "apathetic") {
						r.push(`This sexual apathy plays into ${his} preference for <span class="lightcoral">submission.</span>`);
					} else if (slave.behavioralFlaw === "arrogant") {
						r.push(`${His} arrogance is really just a thin shell to protect ${his} true need to <span class="lightcoral">submit.</span>`);
					} else if (slave.fetishStrength > 95) {
						r.push(`${He}'s an extreme <span class="lightcoral">submissive,</span> and relishes the strictures of slavery.`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He}'s a confirmed <span class="lightcoral">submissive,</span> and enjoys the strictures of slavery.`);
					} else {
						r.push(`${He} has <span class="lightcoral">submissive</span> tendencies, and likes the strictures of slavery.`);
					}
					break;
				case "cumslut":
					if (slave.sexualFlaw === "hates oral") {
						r.push(`${He}'s torn between ${his} <span class="lightcoral">love of semen</span> and ${his} dislike of having cocks in ${his} mouth.`);
					} else if (slave.fetishStrength > 95) {
						r.push(`${He}'s a <span class="lightcoral">cumslut,</span> and loves giving blowjobs and receiving facials.`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He} <span class="lightcoral">prefers giving oral,</span> and enjoys sucking dick and receiving facials.`);
					} else {
						r.push(`${He} has an <span class="lightcoral">oral fixation,</span> and likes giving blowjobs and receiving facials.`);
					}
					break;
				case "humiliation":
					if (slave.behavioralFlaw === "bitchy") {
						r.push(`${His} bitchiness is really just an expression of ${his} deep need to be <span class="lightcoral">humiliated</span> ${himself}.`);
					} else if (slave.sexualFlaw === "shamefast") {
						r.push(`${His} shame is genuine, and it is with real self-loathing that ${he} <span class="lightcoral">gets off on humiliation.</span>`);
					} else if (slave.fetishStrength > 95) {
						r.push(`${He}'s a slut for <span class="lightcoral">humiliation,</span> and gets off on having others see ${his} enslavement.`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He} enjoys <span class="lightcoral">humiliating</span> sex.`);
					} else {
						r.push(`${He} likes <span class="lightcoral">embarrassing</span> sex.`);
					}
					break;
				case "buttslut":
					if (slave.sexualFlaw === "hates anal") {
						r.push(`${His} hatred is just pretense to cover ${his} shame about how much ${he} really loves getting <span class="lightcoral">fucked in the butt.</span>`);
					} else if (slave.fetishStrength > 95) {
						r.push(`${He}'s a <span class="lightcoral">buttslut,</span> happy to have anyone put anything up ${his} ass.`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He} <span class="lightcoral">prefers anal.</span>`);
					} else {
						r.push(`${He} has an <span class="lightcoral">anal fixation.</span>`);
					}
					break;
				case "boobs":
					if (slave.fetishStrength > 95) {
						r.push(`${He} <span class="lightcoral">prefers mammary intercourse</span> to any other kind of sex, and readily climaxes to nipple stimulation.`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He} enjoys <span class="lightcoral">breast play,</span> and is rapidly aroused by nipple stimulation.`);
					} else {
						r.push(`${He} <span class="lightcoral">really likes boobs,</span> ${hers} and others.`);
					}
					break;
				case "pregnancy":
					if (slave.fetishStrength > 95) {
						r.push(`${He} has a <span class="lightcoral">pregnancy fetish,</span> and finds anything related to reproduction sexy.`);
					} else if (slave.fetishStrength > 60) {
						if ((canDoVaginal(slave) && slave.vagina > 0) || (slave.mpreg && canGetPregnant(slave))) {
							r.push(`${He} has an <span class="lightcoral">impregnation fantasy,</span> and enjoys bareback sex.`);
						} else {
							r.push(`${He} has an <span class="lightcoral">impregnation fantasy,</span> and is titillated by the idea of growing heavy with child.`);
						}
					} else {
						r.push(`${He} has a recurring <span class="lightcoral">impregnation fantasy.</span>`);
					}
					break;
				case "dom":
					if (slave.sexualFlaw === "apathetic") {
						r.push(`${He} is at war with ${himself}, since ${his} habitual apathy during sex barely masks a desire to <span class="lightcoral">dominate.</span>`);
					} else if (slave.fetishStrength > 95) {
						r.push(`${He} is a <span class="lightcoral">complete dom;</span> with other slaves this is expressed as a strong preference to top, and with ${his} betters ${he}'s an almost competitive lover.`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He} likes to take an active, powerful role in sex; with other slaves this is expressed as <span class="lightcoral">dominance,</span> and with ${his} betters ${he}'s a very energetic lover.`);
					} else {
						r.push(`${He} prefers to take a <span class="lightcoral">dominant</span> sexual role.`);
					}
					break;
				case "sadist":
					if (slave.fetishStrength > 95) {
						r.push(`${He} is an <span class="lightcoral">aggressive sadist;</span> ${he}'s constantly plotting to control, abuse, and hurt other slaves.`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He} has <span class="lightcoral">sadistic tendencies;</span> ${he} enjoys watching other slaves in pain, but truly loves causing pain ${himself}.`);
					} else {
						r.push(`${He} gets off on <span class="lightcoral">the suffering of others;</span> ${he} enjoys watching other slaves in pain.`);
					}
					break;
				case "masochist":
					if (slave.fetishStrength > 95) {
						r.push(`${He} is a <span class="lightcoral">pain slut.</span>`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He} <span class="lightcoral">gets off on pain,</span> showing strong masochistic tendencies.`);
					} else {
						r.push(`${He} <span class="lightcoral">doesn't mind pain,</span> and shows some masochistic tendencies.`);
					}
					break;
				case Fetish.BESTIALITY:
					if (slave.fetishStrength > 95) {
						r.push(`${He} has a <span class="lightcoral">bestiality fetish,</span> and prefers animal cocks to human ones.`);
					} else if (slave.fetishStrength > 60) {
						r.push(`${He} <span class="lightcoral">is aroused by the mere thought of fucking an animal.</span>`);
					} else {
						r.push(`${He} has a <span class="lightcoral">bestiality fetish,</span> and enjoys fucking animals.`);
					}
					break;
				default:
					r.push(`${His} sexual tastes are <span class="pink">quite normal.</span>`);
					break;
			}
		} else {
			r.push(`${His} fetishes, if any, are not known to you.`);
		}
		return r.join(" ");
	}

	function attraction() {
		const r = [];
		if (slave.attrKnown === 1) {
			if (slave.energy > 95) {
				r.push(`${He}'s a <span class="green">nymphomaniac.</span>`);
			} else if (slave.energy > 80) {
				r.push(`${He}'s a <span class="green">sex addict.</span>`);
			} else if (slave.energy > 60) {
				r.push(`${He} has a <span class="green">powerful appetite for sex.</span>`);
			} else if (slave.energy > 40) {
				r.push(`${He} has a <span class="yellow">healthy sex drive.</span>`);
			} else if (slave.energy > 20) {
				r.push(`${He} has a <span class="red">weak sex drive.</span>`);
			} else {
				r.push(`${He}'s <span class="red">frigid,</span> with little interest in sex.`);
			}
			if (slave.attrXY <= 5) {
				if (slave.attrXX <= 5) {
					r.push(`${He} <span class="red">finds both men's and women's intimate areas quite repulsive,</span> an unfortunate state of affairs!`);
				} else {
					r.push(`${He} <span class="red">finds men sexually disgusting,</span>`);
					if (slave.attrXX <= 15) {
						r.push(`and <span class="red">has almost as much trouble with women.</span>`);
					} else if (slave.attrXX <= 35) {
						r.push(`and is <span class="red">unenthusiastic about women.</span>`);
					} else if (slave.attrXX <= 65) {
						r.push(`and ${he} is indifferent to women.`);
					} else if (slave.attrXX <= 85) {
						r.push(`but <span class="green">is attracted to women.</span>`);
					} else if (slave.attrXX <= 95) {
						r.push(`<span class="green">strongly preferring women.</span>`);
					} else {
						r.push(`but is <span class="green">passionate about women.</span>`);
					}
				}
			} else if (slave.attrXY <= 15) {
				r.push(`${He} <span class="red">considers men's bodies a turnoff,</span>`);
				if (slave.attrXX <= 5) {
					r.push(`and is <span class="red">actually disgusted by women's.</span>`);
				} else if (slave.attrXX <= 15) {
					r.push(`and <span class="red">feels the same about women's.</span>`);
				} else if (slave.attrXX <= 35) {
					r.push(`and is <span class="red">unenthusiastic about women.</span>`);
				} else if (slave.attrXX <= 65) {
					r.push(`and ${he} is indifferent to women.`);
				} else if (slave.attrXX <= 85) {
					r.push(`but <span class="green">is attracted to women.</span>`);
				} else if (slave.attrXX <= 95) {
					r.push(`<span class="green">strongly preferring women.</span>`);
				} else {
					r.push(`but is <span class="green">passionate about women.</span>`);
				}
			} else if (slave.attrXY <= 35) {
				r.push(`${He} <span class="red">finds most men unattractive,</span>`);
				if (slave.attrXX <= 5) {
					r.push(`and is <span class="red">disgusted by the idea of intimacy with a woman.</span>`);
				} else if (slave.attrXX <= 15) {
					r.push(`and is <span class="red">turned off by women.</span>`);
				} else if (slave.attrXX <= 35) {
					r.push(`and is <span class="red">unenthusiastic about women.</span>`);
				} else if (slave.attrXX <= 65) {
					r.push(`and ${he} is indifferent to women.`);
				} else if (slave.attrXX <= 85) {
					r.push(`but <span class="green">is attracted to women.</span>`);
				} else if (slave.attrXX <= 95) {
					r.push(`<span class="green">strongly preferring women.</span>`);
				} else {
					r.push(`but is <span class="green">passionate about women.</span>`);
				}
			} else if (slave.attrXY <= 65) {
				r.push(`${He}'s indifferent to sex with men,`);
				if (slave.attrXX <= 5) {
					r.push(`but is <span class="red">disgusted by the idea of intimacy with a woman.</span>`);
				} else if (slave.attrXX <= 15) {
					r.push(`but is <span class="red">turned off by women.</span>`);
				} else if (slave.attrXX <= 35) {
					r.push(`but is <span class="red">actually unenthusiastic about women.</span>`);
				} else if (slave.attrXX <= 65) {
					r.push(`and feels the same about women, too.`);
				} else if (slave.attrXX <= 85) {
					r.push(`but <span class="green">is attracted to women.</span>`);
				} else if (slave.attrXX <= 95) {
					r.push(`<span class="green">strongly preferring women.</span>`);
				} else {
					r.push(`but is <span class="green">passionate about women.</span>`);
				}
			} else if (slave.attrXY <= 85) {
				r.push(`${He} <span class="green">finds men attractive,</span>`);
				if (slave.attrXX <= 5) {
					r.push(`but is <span class="red">disgusted by the idea of intimacy with a woman.</span>`);
				} else if (slave.attrXX <= 15) {
					r.push(`but is <span class="red">turned off by women.</span>`);
				} else if (slave.attrXX <= 35) {
					r.push(`but is <span class="red">unenthusiastic about women.</span>`);
				} else if (slave.attrXX <= 65) {
					r.push(`but is indifferent to women.`);
				} else if (slave.attrXX <= 85) {
					r.push(`and <span class="green">likes women too.</span>`);
				} else if (slave.attrXX <= 95) {
					r.push(`but <span class="green">likes women even more.</span>`);
				} else {
					r.push(`but is really <span class="green">passionate about women.</span>`);
				}
			} else if (slave.attrXY <= 95) {
				r.push(`${He} <span class="green">is aroused by most men,</span>`);
				if (slave.attrXX <= 5) {
					r.push(`but is <span class="red">disgusted by the idea of intimacy with a woman.</span>`);
				} else if (slave.attrXX <= 15) {
					r.push(`but is <span class="red">turned off by women.</span>`);
				} else if (slave.attrXX <= 35) {
					r.push(`but is <span class="red">unenthusiastic about women.</span>`);
				} else if (slave.attrXX <= 65) {
					r.push(`but is indifferent to women.`);
				} else if (slave.attrXX <= 85) {
					r.push(`and <span class="green">likes women too.</span>`);
				} else if (slave.attrXX <= 95) {
					r.push(`and <span class="green">thinks most women are hot,</span> too.`);
				} else {
					r.push(`but is most <span class="green">passionate about women.</span>`);
				}
			} else {
				if (slave.attrXX > 95) {
					r.push(`${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone.`);
				} else {
					r.push(`${He}'s <span class="green">passionate about men,</span>`);
					if (slave.attrXX <= 5) {
						r.push(`but is <span class="red">disgusted by the idea of intimacy with a woman.</span>`);
					} else if (slave.attrXX <= 15) {
						r.push(`but is <span class="red">turned off by women.</span>`);
					} else if (slave.attrXX <= 35) {
						r.push(`but is <span class="red">unenthusiastic about women.</span>`);
					} else if (slave.attrXX <= 65) {
						r.push(`but is indifferent to women.`);
					} else if (slave.attrXX <= 85) {
						r.push(`but also <span class="green">likes women,</span> too.`);
					} else {
						r.push(`but also <span class="green">thinks most women are hot,</span> too.`);
					}
				}
			}
		} else {
			r.push(`You do not understand ${his} sexuality very well.`);
		}
		return r.join(" ");
	}

	return r.join(" ");
};
