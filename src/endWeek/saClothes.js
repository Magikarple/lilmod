/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.clothes = function saClothes(slave) {
	/** @type {string[]} */
	const r = [];

	const arcology = V.arcologies[0];

	const {
		He, His, he, him, his, hers
	} = getPronouns(slave);

	updateAccessories(slave);
	if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
		clothingEffects(slave);
	}
	if (slave.collar !== "none") {
		collarEffects(slave);
	}
	if (slave.faceAccessory !== "none") {
		maskEffects(slave);
	}
	if (slave.mouthAccessory !== "none") {
		mouthEffects(slave);
	}
	chastityEffects(slave);
	if (slave.bellyAccessory !== "none") {
		bellyAccessories(slave);
	}
	if (hasAnyLegs(slave)) {
		legAccessories(slave);
	}
	if (slave.vagina >= 0) {
		vaginaAccessories(slave);
	}
	if (slave.buttplug !== "none") {
		analAccessories(slave);
	}

	return r.join(" ");

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function updateAccessories(slave) {
		if (slave.dick === 0) {
			slave.chastityPenis = 0;
			slave.dickAccessory = "none";
		}
		if (!hasAnyLegs(slave)) {
			slave.shoes = "none";
			slave.legAccessory = "none";
		}
		if (slave.vagina === -1) {
			slave.chastityVagina = 0;
			slave.vaginalAccessory = "none";
			slave.vaginalAttachment = "none";
		} else {
			if (dildoWidth(slave) === 0) {
				slave.vaginalAttachment = "none";
			}
		}
		if (slave.buttplug === "none") {
			slave.buttplugAttachment = "none";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function chainMakesMasochist(slave) {
		if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 0) {
			r.push(`${His} chains pinch and constrict ${him} whenever ${he}'s used. ${He} seems to get off on the discomfort; ${he}'s a <span class="lightcoral">natural masochist.</span>`);
			slave.fetishKnown = 1;
		} else if (slave.fetish === Fetish.NONE || slave.fetishKnown === 0) {
			if (fetishChangeChance(slave) > jsRandom(0, 100)) {
				r.push(`${His} chains pinch and constrict ${him} whenever ${he}'s used. ${He} learns to come in spite of, and then <span class="lightcoral">because of the discomfort.</span>`);
				fetishChange(slave, Fetish.MASOCHIST, 10);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function harshMakesMasochist(slave) {
		if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 0) {
			r.push(`${His} outfit pinches and constricts ${him} whenever ${he}'s used. ${He} seems to get off on the discomfort; ${he}'s a <span class="lightcoral">natural masochist.</span>`);
			slave.fetishKnown = 1;
		} else if (slave.fetish === Fetish.NONE || slave.fetishKnown === 0) {
			if (fetishChangeChance(slave) > jsRandom(0, 100)) {
				r.push(`${His} outfit pinches and constricts ${him} whenever ${he}'s used. ${He} learns to come in spite of, and then <span class="lightcoral">because of the discomfort.</span>`);
				fetishChange(slave, Fetish.MASOCHIST, 10);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function humiliationLikesExposed(slave) {
		if (slave.fetishKnown === 0) {
			r.push(`${He} pretends to be embarrassed by ${his} extremely revealing clothing but seems to get off on it. <span class="lightcoral">${He}'s into humiliation.</span>`);
			slave.fetishKnown = 1;
		} else if (slave.fetishStrength > 60) {
			r.push(`${He} pretends to be embarrassed by ${his} extremely revealing clothing but <span class="hotpink">openly gets off on it.</span>`);
			slave.devotion += 2;
		} else {
			r.push(`${He} pretends to be embarrassed by ${his} extremely revealing clothing but <span class="hotpink">secretly gets off on it.</span>`);
			slave.devotion += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function clothingEffects(slave) {
		if (App.Data.clothes.get(slave.clothes) && getExposure(slave) === 4) {
			if (slave.devotion >= -20) {
				if (slave.fetish === Fetish.HUMILIATION && slave.fetishKnown === 0) {
					r.push(`${He} pretends to be embarrassed by ${his} nudity but seems to get off on it. <span class="lightcoral">${He}'s into humiliation.</span>`);
					slave.fetishKnown = 1;
				} else if (slave.fetish === Fetish.HUMILIATION && slave.fetishStrength > 60) {
					r.push(`${He} pretends to be embarrassed by ${his} nudity but <span class="hotpink">openly gets off on it.</span>`);
					slave.devotion += 2;
				} else if (slave.fetish === Fetish.HUMILIATION) {
					r.push(`${He} pretends to be embarrassed by ${his} nudity but <span class="hotpink">secretly gets off on it.</span>`);
					slave.devotion += 1;
				} else if (slave.energy > 95) {
					r.push(`${His} libido is so strong that ${he} <span class="hotpink">enjoys being naked and available.</span>`);
					slave.devotion += 1;
				}
			}
		}
		// humiliating clothing effects
		if (slave.fetishKnown === 0 || slave.fetish === Fetish.NONE) {
			if (getExposure(slave) === 3) {
				if (fetishChangeChance(slave) > jsRandom(0, 100)) {
					r.push(`Surprisingly, ${he} takes to ${his} extremely revealing clothing, and gets an obvious thrill from it. <span class="lightcoral">${He}'s become a humiliation fetishist!</span>`);
					fetishChange(slave, Fetish.HUMILIATION, 10);
				}
			}
		}

		if (App.Data.clothes.get(slave.clothes)) {
			if (App.Data.clothes.get(slave.clothes).harsh) {
				switch (slave.clothes) {
					case "a penitent nuns habit":
						r.push(`The mortification of the flesh ${he} endures from wearing ${his} sackcloth habit slowly and painfully <span class="hotpink">purifies ${his} mind</span> of any but devoted, <span class="gold">fearful</span> thoughts. It's also <span class="health dec">unhealthy.</span>`);
						slave.devotion += 2;
						slave.trust -= 2;
						healthDamage(slave, 3);
						if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 0) {
							r.push(`${His} chafed skin makes sex an agonizing prospect. ${He} seems to get off on the pain; ${he}'s a <span class="lightcoral">natural masochist.</span>`);
							slave.fetishKnown = 1;
						} else if (slave.fetish === Fetish.NONE || slave.fetishKnown === 0) {
							if (fetishChangeChance(slave) > jsRandom(0, 100)) {
								r.push(`${His} chafed skin makes sex an agonizing prospect. ${He} learns to come in spite of, and then <span class="lightcoral">because of the pain.</span>`);
								fetishChange(slave, Fetish.MASOCHIST, 10);
							}
						}
						break;
					case "uncomfortable straps":
						if (slave.devotion >= -20 && slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1) {
							r.push(`The uncomfortable straps ${he}'s wearing constantly give ${him} little twinges of pain, <span class="hotpink">titillating ${him}.</span>`);
							slave.devotion += 2;
						} else if (slave.devotion <= 20 && slave.trust >= -50) {
							r.push(`The uncomfortable straps ${he}'s wearing keep ${him} <span class="hotpink">servile</span> and <span class="gold">afraid.</span>`);
							slave.devotion += 1;
							slave.trust -= 1;
							if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 0) {
								r.push(`The straps pinch and constrict ${him} whenever ${he}'s used. ${He} seems to get off on the discomfort; ${he}'s a <span class="lightcoral">natural masochist.</span>`);
								slave.fetishKnown = 1;
							} else if (slave.fetish === Fetish.NONE || slave.fetishKnown === 0) {
								if (fetishChangeChance(slave) > jsRandom(0, 100)) {
									r.push(`The straps pinch and constrict ${him} whenever ${he}'s used. ${He} learns to come in spite of, and then <span class="lightcoral">because of the discomfort.</span>`);
									fetishChange(slave, Fetish.MASOCHIST, 10);
								}
							}
						} else {
							if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 0) {
								r.push(`${His} straps pinch and constrict ${him} whenever ${he}'s used. ${He} seems to get off on the discomfort; ${he}'s a <span class="lightcoral">natural masochist.</span>`);
								slave.fetishKnown = 1;
							} else if (slave.fetish === Fetish.NONE || slave.fetishKnown === 0) {
								if (fetishChangeChance(slave) > jsRandom(0, 100)) {
									r.push(`${His} straps pinch and constrict ${him} whenever ${he}'s used. ${He} learns to come in spite of, and then <span class="lightcoral">because of the discomfort.</span>`);
									fetishChange(slave, Fetish.MASOCHIST, 10);
								}
							}
						}
						break;
					case "chains":
						if (slave.devotion >= -20 && slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1) {
							r.push(`The chains ${he}'s wearing constantly give ${him} little twinges of pain, <span class="hotpink">titillating ${him}.</span>`);
							slave.devotion += 2;
						} else if (slave.devotion <= 20 && slave.trust >= -50) {
							r.push(`The chains ${he}'s wearing keep ${him} <span class="hotpink">servile</span> and <span class="gold">afraid.</span>`);
							slave.devotion += 1;
							slave.trust -= 1;
							chainMakesMasochist(slave);
						} else {
							chainMakesMasochist(slave);
						}
						break;
					case "restrictive latex":
						if (slave.devotion > 20 && slave.trust >= -50 && slave.fetish === Fetish.SUBMISSIVE) {
							if (slave.fetishKnown === 0) {
								r.push(`The latex ${he}'s wearing limits ${his} world to your input and control. ${He} seems to get off on the lack of control; ${he}'s a <span class="lightcoral">total submissive.</span>`);
								slave.fetishKnown = 1;
							} else if (slave.fetishStrength > 60) {
								r.push(`As a submissive ${he} <span class="hotpink">openly enjoys being immured in latex.</span>`);
								slave.devotion += 2;
							} else {
								r.push(`${His} submissive tendencies help ${him} <span class="hotpink">enjoy being immured in latex.</span>`);
								slave.devotion += 1;
							}
						} else if (slave.devotion < -20) {
							r.push(`The latex ${he}'s wearing limits ${his} world to <span class="hotpink">your input and control</span> and <span class="gold">fear</span> of unexpected pain.`);
							slave.devotion += 1;
							slave.trust -= 1;
						}
						break;
					case "shibari ropes":
						if (slave.devotion > 20 && slave.trust >= -50 && slave.fetish === Fetish.SUBMISSIVE) {
							if (slave.fetishKnown === 0) {
								r.push(`The ropes ${he}'s wearing restrict ${him} and leave ${him} completely helpless. ${He} seems to get off on the lack of control; ${he}'s a <span class="lightcoral">natural submissive.</span>`);
								slave.fetishKnown = 1;
							} else if (slave.fetishStrength > 60) {
								r.push(`As a submissive ${he} <span class="hotpink">openly enjoys wearing binding ropes as clothing.</span>`);
								slave.devotion += 2;
							} else {
								r.push(`${His} submissive tendencies help ${him} <span class="hotpink">enjoy wearing binding ropes as clothing.</span>`);
								slave.devotion += 1;
							}
						} else if (slave.devotion < -20) {
							r.push(`The ropes ${he}'s wearing restrict ${him} without pain, rendering ${him} <span class="hotpink">susceptible to control</span> and <span class="gold">afraid.</span>`);
							slave.devotion += 1;
							slave.trust -= 1;
						}
						break;
					case "no clothing":
						if (slave.devotion > 20 && slave.trust >= -50 && slave.fetish === Fetish.SUBMISSIVE) {
							if (slave.fetishKnown === 0) {
								r.push(`${His} complete lack of clothing is a constant reminder that you are in control of access to ${his} body, and there is nowhere to hide. ${He} seems to get off on the lack of control; ${he}'s a <span class="lightcoral">total submissive.</span>`);
								slave.fetishKnown = 1;
							} else if (slave.fetishStrength > 60) {
								r.push(`As a submissive ${he} <span class="hotpink">openly embraces your control over ${his} body.</span>`);
								slave.devotion += 2;
							} else {
								r.push(`${His} submissive tendencies help ${him} <span class="hotpink">enjoy being exposed.</span>`);
								slave.devotion += 1;
							}
						} else if (slave.devotion < -20) {
							r.push(`${His} nakedness is a constant reminder that there is <span class="gold">nowhere to hide</span> from <span class="hotpink">your gaze,</span> or ${his} assignments.`);
							slave.devotion += 1;
							slave.trust -= 1;
						}
						break;
					default:
						if (slave.devotion >= -20 && slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1) {
							r.push(`The outfit ${he}'s wearing constantly give ${him} little twinges of pain, <span class="hotpink">titillating ${him}.</span>`);
							slave.devotion += 2;
						} else if (slave.devotion <= 20 && slave.trust >= -50) {
							r.push(`The outfit ${he}'s wearing keeps ${him} <span class="hotpink">servile</span> and <span class="gold">afraid.</span>`);
							slave.devotion += 1;
							slave.trust -= 1;
							harshMakesMasochist(slave);
						} else {
							harshMakesMasochist(slave);
						}
				}
			} else { // nice
				switch (slave.clothes) {
					case "an apron":
						if (slave.fetish === Fetish.SUBMISSIVE) {
							if (slave.fetishKnown === 0) {
								r.push(`${He} pretends to be embarrassed by wearing nothing but an apron, but seems to get off on how it invites other to take control and use ${him}. <span class="lightcoral">${He}'s a natural submissive.</span>`);
								slave.fetishKnown = 1;
							} else {
								r.push(`${He} pretends to be embarrassed by wearing nothing but an apron but <span class="hotpink">secretly gets off</span> on how it invites men to bend ${him} over and put ${him} in ${his} place.`);
								slave.devotion += 1;
							}
						} else if (slave.fetish === Fetish.HUMILIATION) {
							humiliationLikesExposed(slave);
						} else if (slave.fetish === Fetish.PREGNANCY && (slave.bellyPreg >= 1500 || slave.bellyImplant >= 1500)) {
							if (slave.fetishKnown === 0) {
								r.push(`${He} pretends to be embarrassed over only having an apron to cover ${his} gravid swell but seems to get off on it. <span class="lightcoral">${He}'s a pregnancy fetishist.</span>`);
								slave.fetishKnown = 1;
							} else if (slave.fetishStrength > 60) {
								r.push(`${He} <span class="hotpink">openly gets off</span> from how motherly ${he} looks wearing nothing but an apron over ${his}`);
								if (slave.bellyPreg > 100) {
									r.push(`increasingly`);
								}
								r.push(`gravid frame.`);
								slave.devotion += 2;
							} else {
								r.push(`${He} <span class="hotpink">secretly gets off</span> from how motherly ${he} feels wearing nothing but an apron over ${his}`);
								if (slave.bellyPreg > 100) {
									r.push(`increasingly`);
								}
								r.push(`gravid frame.`);
								slave.devotion += 1;
							}
						} else if (slave.devotion <= 20) {
							r.push(`${He} is <span class="mediumorchid">inappropriately proud</span> of the nice apron ${he}'s wearing, <span class="mediumaquamarine">building ${his} confidence.</span>`);
							slave.devotion -= 5;
							slave.trust += 3;
						} else {
							r.push(`${He} is <span class="hotpink">proud</span> and <span class="mediumaquamarine">confident</span> of the nice apron ${he}'s wearing.`);
							slave.devotion += 1;
							slave.trust += 1;
						}
						break;
					case "body oil":
						if (slave.sexualFlaw === SexualFlaw.SHAMEFAST) {
							r.push(`${He} is <span class="mediumorchid">mortified</span> that ${he} has nothing but oil to cover up ${his} body, and is incapable of taking pleasure in getting all oiled up.`);
							slave.devotion -= 3;
						} else if (slave.devotion < -20) {
							r.push(`${He} is <span class="mediumorchid">inappropriately pleased</span> by the sensual process of oiling up ${his} body.`);
							slave.devotion -= 3;
						} else {
							r.push(`${His} <span class="mediumaquamarine">confidence</span> and <span class="hotpink">devotion</span> are reinforced by the sensual process of oiling up ${his} body every morning.`);
							slave.devotion += 1;
							slave.trust += 1;
						}
						break;
					default:
						if (slave.devotion <= 20) {
							if (App.Data.clothes.get(slave.clothes).exposure === 0) {
								r.push(`${He} is <span class="mediumorchid">inappropriately proud</span> of the modest clothes ${he}'s wearing; their decency <span class="mediumaquamarine">rapidly building ${his} confidence.</span>`);
								slave.trust += 7;
							} else if (App.Data.clothes.get(slave.clothes).exposure === 1) {
								r.push(`${He} is <span class="mediumorchid">inappropriately proud</span> of the nice clothes ${he}'s wearing; their relative decency <span class="mediumaquamarine">building ${his} confidence.</span>`);
								slave.trust += 5;
							} else if (App.Data.clothes.get(slave.clothes).exposure <= 3) {
								r.push(`${He} is <span class="mediumorchid">inappropriately proud</span> of the nice clothes ${he}'s wearing, <span class="mediumaquamarine">building ${his} confidence.</span>`);
								slave.trust += 3;
							}
							slave.devotion -= 5;
						} else if (slave.fetish === Fetish.BOOBS && slave.clothes === "a monokini") {
							if (slave.fetishKnown === 0) {
								r.push(`${He} pretends to be embarrassed by how ${his} monokini draws attention to ${his} breasts but <span class="hotpink">seems to get off on it.</span>`);
								slave.devotion += 1;
							} else if (slave.fetishStrength > 60) {
								r.push(`${He} pretends to be embarrassed by ${his} clearly exposed breasts but <span class="hotpink">openly gets off on it.</span>`);
								slave.devotion += 2;
							} else {
								r.push(`${He} pretends to be embarrassed by ${his} clearly exposed breasts but <span class="hotpink">secretly gets off on it.</span>`);
								slave.devotion += 1;
							}
						} else if (slave.fetish === Fetish.HUMILIATION && getExposure(slave) === 3) {
							humiliationLikesExposed(slave);
						} else if (slave.dick > 0) {
							/* males have trouble with outfit block */ /* return to with crotch description overhaul */
							switch (slave.clothes) {
								case "attractive lingerie":
								case "attractive lingerie for a pregnant woman":
									r.push(`${He} is <span class="hotpink">proud</span> of the pretty lingerie ${he}'s wearing, but ${he} constantly has to adjust ${his} g-string to cover ${his} penis.`);
									slave.devotion += 1;
									break;
								case "a string bikini":
									r.push(`${He} is <span class="hotpink">proud</span> of the slutty swimsuit ${he}'s wearing, but ${he} constantly has to adjust ${his} string bikini bottom in a vain effort to cover ${his} penis.`);
									slave.devotion += 1;
									break;
								default:
									r.push(`${He} is <span class="hotpink">proud</span> and <span class="mediumaquamarine">confident</span> of the nice clothes ${he}'s wearing.`);
									slave.devotion += 1;
									slave.trust += 1;
							}
						} else {
							r.push(`${He} is <span class="hotpink">proud</span> and <span class="mediumaquamarine">confident</span> of the nice clothes ${he}'s wearing.`);
							slave.devotion += 1;
							slave.trust += 1;
						}
				}
			}
		}

		// Chattel Religionist effects
		if (FutureSocieties.isActive('FSChattelReligionist', arcology)) {
			if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
				if (slave.clothes === "a fallen nuns habit" || slave.clothes === "a chattel habit" || slave.clothes === "a succubus outfit") {
					r.push(`${He}'s <span class="hotpink">gratified</span> by the sacrilegious clothing ${he}'s wearing, glad to be an obvious anathema to old world faiths.`);
					slave.devotion += 1;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function collarEffects(slave) {
		if (slave.collar === "preg biometrics") {
			if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1) {
				if (slave.preg < -1) {
					r.push(`${His} collar's display reveals all sorts of personal information about ${his} womb, which as an infertile pregnancy fetishist, is <span class="mediumorchid">crippling</span> to ${him}.`);
					slave.devotion -= 3;
				} else {
					r.push(`${His} collar's display reveals all sorts of personal information about ${his} womb, which as a pregnancy fetishist, is <span class="hotpink">pleasing</span> to ${him}.`);
					slave.devotion += 1;
				}
			} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 0) {
				if (slave.preg < -1) {
					r.push(`${His} collar's display reveals all sorts of personal information about ${his} womb, which nearly causes ${him} to have a <span class="mediumorchid">mental breakdown,</span> painting ${him} as an infertile <span class="lightcoral">pregnancy fetishist.</span>`);
					slave.devotion -= 3;
				} else {
					r.push(`${His} collar's display reveals all sorts of personal information about ${his} womb, <span class="hotpink">oddly exciting</span> ${him}. It would seem ${he} has a <span class="lightcoral">pregnancy fetish!</span>`);
					slave.devotion += 1;
				}
				slave.fetishKnown = 1;
			} else if (slave.fetish === Fetish.HUMILIATION && slave.fetishKnown === 1) {
				r.push(`${His} collar's display reveals all sorts of personal information about ${his} womb, which is completely humiliating, and <span class="hotpink">pleasing</span> to ${him}.`);
				slave.devotion += 1;
			} else if (slave.fetish === Fetish.HUMILIATION && slave.fetishKnown === 0) {
				r.push(`${His} collar's display reveals all sorts of personal information about ${his} womb, which is completely humiliating, and <span class="hotpink">oddly pleasing</span> to ${him}. ${He} seems to have a <span class="lightcoral">humiliation fetish!</span>`);
				slave.devotion += 1;
				slave.fetishKnown = 1;
			} else if (slave.devotion < -20) {
				r.push(`${His} collar's display reveals all sorts of personal information about ${his} fertility, filling ${him} <span class="mediumorchid">with disgust</span> that you that you consider ${his} womb little more than property, as well as <span class="gold">fear</span> that it will`);
				if (slave.pregKnown === 1) {
					r.push(`be promptly filled with an unwelcome child once ${his} pregnancy ends.`);
				} else {
					r.push(`soon be swelling with an unwelcome child.`);
				}
				slave.devotion -= 2;
				slave.trust -= 2;
			} else if (slave.devotion <= 20) {
				r.push(`${His} collar's display reveals all sorts of personal information about ${his} womb, completely <span class="hotpink">degrading ${him}</span> and making ${him} <span class="gold">fear</span> ${his} new life.`);
				slave.devotion += 1;
				slave.trust -= 2;
			} else if (slave.devotion > 20) {
				r.push(`${His} collar's display reveals all sorts of personal information about ${his} womb, filling ${him} <span class="hotpink">with pride</span> that you think ${his} womb is worth attention.`);
				slave.devotion += 1;
			}
		} else if (slave.devotion <= 20) {
			if (slave.collar === "tight steel" || slave.collar === "cruel retirement counter") {
				r.push(`The tight metal collar ${he}'s wearing <span class="gold">reminds ${him} to be afraid</span> every time ${he} takes a breath.`);
				slave.trust -= 1;
			} else if (slave.collar === "uncomfortable leather" || slave.collar === "neck corset") {
				r.push(`The uncomfortable leather collar ${he}'s wearing <span class="gold">reminds ${him} to be afraid</span> every time ${he} turns ${his} head.`);
				slave.trust -= 1;
			} else if (slave.collar === "shock punishment") {
				r.push(`The shock collar ${he}'s wearing makes ${his} frequent, deserved punishments <span class="gold">immediate, inescapable,</span> and <span class="mediumorchid">awful.</span>`);
				slave.devotion -= 2;
				slave.trust -= 5;
				if (slave.devotion < -20 && slave.behavioralFlaw !== BehavioralFlaw.ODD) {
					r.push(`Since ${he}'s rebellious ${his} life is near-constant electroshock torture. ${His} resistance is <span class="hotpink">worn down by the agony</span> and ${he} is <span class="gold">thoroughly cowed,</span> but ${he} has been <span class="red">emotionally damaged</span> by the experience to the extent that further shock torture is not likely to affect ${him} as greatly.`);
					slave.devotion += 10;
					slave.trust -= 10;
					slave.behavioralFlaw = BehavioralFlaw.ODD;
				}
			} else {
				r.push(`${He} is <span class="mediumorchid">inappropriately proud</span> and <span class="mediumaquamarine">confident</span> of the nice collar ${he}'s wearing.`);
				slave.devotion -= 5;
				slave.trust += 3;
			}
		} else {
			if (slave.collar === "heavy gold" || slave.collar === "ancient Egyptian") {
				r.push(`${He} bears the burden of ${his} heavy gold collar with <span class="mediumaquamarine">confidence.</span>`);
				slave.trust += 1;
			} else if (slave.collar === "bowtie" || slave.collar === "neck tie") {
				r.push(`The ${slave.collar} and shirt collar ${he} wears fill ${him} with <span class="mediumaquamarine">confidence,</span> since although they conceal a more traditional slave collar that can be used to restrain ${him}, they don't look like it.`);
				slave.trust += 1;
			} else if (["nice retirement counter", "pretty jewelry", "satin choker", "silk ribbon", "stylish leather"].includes(slave.collar)) {
				r.push(`The lovely collar ${he} wears fills ${him} with <span class="mediumaquamarine">confidence.</span>`);
				slave.trust += 1;
			} else if (slave.collar === "leather with cowbell") {
				if (slave.fetish === Fetish.BOOBS && slave.fetishStrength > 95) {
					r.push(`${He} <span class="hotpink">loves</span> how ${his} cow collar encourages everyone to fuck ${his} udders.`);
					slave.devotion += 1;
				} else if (slave.fetish === Fetish.BOOBS || slave.energy > 95) {
					r.push(`${He} <span class="hotpink">likes</span> how ${his} cow collar encourages everyone to touch ${his} udders.`);
					slave.devotion += 1;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function maskEffects(slave) {
		if (slave.devotion <= 20) {
			if (slave.faceAccessory === "porcelain mask") {
				r.push(`The beautiful porcelain mask ${he}'s wearing slowly erodes ${his} identity, forcing ${him} <span class="hotpink">to submit</span> to your will. ${He} <span class="gold">questions</span> who ${he} is.`);
				slave.devotion++;
				slave.trust -= 2;
			} else if (slave.faceAccessory === "cat ears") {
				r.push(`The adorable cat ears ${he}'s wearing slowly chip away at ${his} dignity, forcing ${him} <span class="hotpink">to submit</span> to your will. ${He} <span class="gold">feels</span> more and more like a sex object.`);
				slave.devotion++;
				slave.trust -= 2;
			}
		} else {
			if (slave.faceAccessory === "porcelain mask") {
				if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 95) {
					r.push(`${He} <span class="hotpink">loves</span> how ${his} mask makes ${him} beautiful enough for you.`);
					slave.devotion += 1;
				} else if (slave.fetish === Fetish.SUBMISSIVE || slave.energy > 95) {
					r.push(`${He} <span class="hotpink">likes</span> how ${his} mask makes ${him} beautiful enough for you.`);
					slave.devotion += 1;
				}
			} else if (slave.faceAccessory === "cat ears") {
				if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 95) {
					r.push(`${He} <span class="hotpink">loves</span> how ${his} cat ears make ${him} especially adorable for you.`);
					slave.devotion += 1;
				} else if (slave.fetish === Fetish.SUBMISSIVE || slave.energy > 95) {
					r.push(`${He} <span class="hotpink">likes</span> how ${his} cat ears make ${him} especially adorable for you.`);
					slave.devotion += 1;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mouthEffects(slave) {
		if (slave.devotion <= 20) {
			if (slave.mouthAccessory === "dildo gag") {
				r.push(`The dildo gag ${he}'s wearing <span class="gold">reminds ${him} to be afraid</span> with every breath ${he} must carefully take through ${his} nose.`);
				slave.trust -= 1;
			} else if (slave.mouthAccessory === "ball gag") {
				r.push(`The ball gag ${he}'s wearing keeps ${his} mouth filled and, since ${he} can't speak out, forces ${him} <span class="hotpink">to submit</span> to your will. ${He} <span class="gold">fears</span> for ${his} safety with every suppressed word.`);
				slave.devotion++;
				slave.trust -= 2;
			} else if (slave.mouthAccessory === "ring gag") {
				r.push(`The ring gag ${he}'s wearing keeps ${his} mouth stretched wide and drooling. Since ${he} can't speak clearly, it forces ${him} <span class="hotpink">to submit</span> to your will. ${He} <span class="gold">fears</span> for ${his} safety with every suppressed word.`);
				slave.devotion++;
				slave.trust -= 2;
			} else if (slave.mouthAccessory === "bit gag") {
				r.push(`The uncomfortable bit gag ${he}'s wearing keeps ${his} mouth locked and, since ${he} can't speak out, forces ${him} <span class="hotpink">to submit</span> to your will. ${He} <span class="gold">fears</span> for ${his} safety with every suppressed word.`);
				slave.devotion++;
				slave.trust -= 2;
			} else if (slave.mouthAccessory === "massive dildo gag") {
				r.push(`The enormous dildo gag ${he}'s wearing <span class="gold">terrifies ${him}</span> that ${he} will soon be choking down cocks of similar size. ${He} can feel ${his} throat stretching around the giant dildo, and <span class="mediumorchid">resents you</span> for tormenting ${him} this way.`);
				slave.devotion -= 1;
				slave.trust -= 2;
			}
		} else {
			if (slave.mouthAccessory === "ball gag" || slave.mouthAccessory === "bit gag" || slave.mouthAccessory === "ring gag") {
				if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 95) {
					r.push(`${He} <span class="hotpink">loves</span> how ${his} gag forces ${him} to keep silent.`);
					slave.devotion += 1;
				} else if (slave.fetish === Fetish.SUBMISSIVE || slave.energy > 95) {
					r.push(`${He} <span class="hotpink">likes</span> how ${his} gag forces ${him} to keep silent.`);
					slave.devotion += 1;
				}
			}
		}
		if (slave.mouthAccessory === "dildo gag") {
			if (slave.skill.oral <= 10) {
				r.push(`Living gagged by a dildo, ${he} can't help but get better at having things down ${his} throat.`);
				r.push(slaveSkillIncrease('oral', slave, 5));
			}
		}
		if (slave.mouthAccessory === "massive dildo gag") {
			if (slave.skill.oral < 75) {
				r.push(`Living gagged by such an immense dildo, ${he} can't help but get even better at having giant things rammed down ${his} throat.`);
				r.push(slaveSkillIncrease('oral', slave, 5));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function chastityEffects(slave) {
		if (slave.chastityVagina) {
			if (slave.devotion > 20) {
				if (slave.vagina === 0) {
					if (slave.fetish === Fetish.BUTTSLUT && slave.fetishStrength > 60) {
						if (slave.fetishKnown === 1) {
							r.push(`${He}'s such an anal whore that ${he}'s <span class="hotpink">perversely proud</span> of the chastity belt that covers ${his} neglected pussy.`);
							slave.devotion += 1;
						} else {
							r.push(`${He} <span class="hotpink">doesn't seem to mind</span> that ${his} pussy is going unused.`);
							slave.devotion += 1;
						}
					} else {
						r.push(`${He} <span class="mediumaquamarine">trusts</span> that you're using the chastity belt ${he} wears to save ${his} virginity for something special.`);
						slave.trust += 1;
					}
				} else {
					if (slave.energy > 60) {
						if (slave.fetish === Fetish.BUTTSLUT && slave.fetishStrength > 60) {
							if (slave.fetishKnown === 1) {
								r.push(`${He}'s such a butthole slut that ${he} doesn't care about having ${his} pussy kept off limits.`);
							} else {
								r.push(`${He} seems to like that ${his} chastity is directing all the dicks into ${his} ass.`);
								slave.devotion += 1;
							}
						} else if (slave.energy > 95) {
							r.push(`${He}'s such a nympho that having ${his} butthole do double duty for ${his} pussy doesn't bother ${him}.`);
						} else {
							r.push(`${He} has a healthy sexuality, and misses vaginal sex, <span class="libido dec">reducing ${his} sex drive slightly.</span>`);
							slave.energy -= 1;
						}
					}
				}
			}
		}
		if (slave.chastityPenis) {
			if (slave.devotion >= -20) {
				if (slave.energy > 40) {
					if (slave.hormoneBalance < 100) {
						if (slave.fetish === Fetish.BUTTSLUT && slave.fetishStrength > 60) {
							if (slave.fetishKnown === 1) {
								r.push(`${He}'s such a butthole slut that ${he} manages to get off just fine despite ${his} dick being kept untouchable and soft behind a chastity cage.`);
							} else {
								r.push(`${He} seems to be getting off just fine without access to ${his} dick.`);
							}
						} else if (slave.energy > 95) {
							r.push(`${His} sex drive is so overcharged that ${he} manages to orgasm often despite the chastity cage that`);
							if (slave.balls === 0 || slave.ballType === "sterile") {
								r.push(`prevents ${him} or anyone else from touching ${his} soft cock;`);
							} else {
								r.push(`keeps ${his} dick soft and untouched;`);
							}
							r.push(`it's almost always dripping a stream of precum.`);
						} else if (slave.fetish === Fetish.MASOCHIST && slave.fetishStrength > 60 && canAchieveErection(slave)) {
							if (slave.fetishKnown === 1) {
								r.push(`${He}'s such a masochist that the pain of even getting semi-hard in ${his} chastity cage turns ${him} on even more, <span class="libido inc">slightly increasing ${his} sexual appetite.</span>`);
								slave.energy++;
							} else {
								r.push(`${His} chastity cage is always painfully tight around ${his} semi-hard dick; something that seems to be arousing to ${him}, only to make it even more painful.`);
								slave.energy++;
							}
						} else if (slave.sexualFlaw === SexualFlaw.NEGLECT) {
							r.push(`${His} soft, constrained dick is of little concern to ${him}. ${He} doesn't need release during sex.`);
						} else if (slave.balls > 0 && slave.ballType === "sterile") {
							r.push(`Though ${he}'s a soft bitch with worthless balls, having ${his} dick guarded against all stimulation by a chastity cage reduces ${his} enjoyment of intercourse a bit, <span class="libido dec">slightly reducing ${his} sexual appetite.</span>`);
							slave.energy -= 1;
						} else if (slave.balls === 0) {
							r.push(`Though ${he}'s a soft, ballsless bitch, having ${his} dick guarded against all stimulation by a chastity cage reduces ${his} enjoyment of intercourse a bit, <span class="libido dec">slightly reducing ${his} sexual appetite.</span>`);
							slave.energy -= 1;
						} else {
							r.push(`${He} has a healthy sexuality, but ${his} chastity cage punishes it by making it very uncomfortable to achieve erection. ${He} often goes without release rather than pushing through, <span class="libido dec">reducing ${his} sex drive.</span>`);
							slave.energy -= 2;
							if (slave.devotion > 95) {
								r.push(`${He}'s so devoted to you that ${he} doesn't let this affect ${his} opinion of you.`);
							} else {
								r.push(`${He}'s <span class="mediumorchid">a bit resentful</span> and <span class="gold">much less trusting</span> under all this discomfort.`);
								slave.devotion -= 1;
								slave.trust -= 1;
							}
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function bellyAccessories(slave) {
		if (slave.bellyAccessory === "an extreme corset") {
			if (slave.inflation > 0) {
				r.push(`The pressure of ${his} corsetage <span class="change negative">renders ${him} unable to keep filling ${his} guts with ${slave.inflationType}.</span>`);
				deflate(slave);
			}
			if (slave.belly >= 100000) {
				r.push(`${His} straining corset finally gives in to ${his} giant stomach and bursts, freeing ${his} belly.`);
				slave.bellyAccessory = "none";
			} else if (slave.bellyPreg >= 1500) {
				r.push(`The tight corseting has <span class="orange">caused ${him} to miscarry,</span> which <span class="health dec">damages ${his} health.</span>`);
				healthDamage(slave, 20);
				if (rulesDemandContraceptives(slave, V.defaultRules)) {
					slave.preg = -1;
				} else {
					slave.preg = 0;
				}
				TerminatePregnancy(slave);
				actX(slave, "miscarriages");
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.devotion < -50) {
						r.push(`${He} is <span class="mediumorchid">filled with violent, consuming hatred</span> and <span class="gold">fear.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it and views you as its killer.`);
						slave.devotion -= 25;
						slave.trust -= 25;
					} else if (slave.devotion < -20) {
						r.push(`${He} is <span class="mediumorchid">afflicted by desperate, inconsolable grief</span> and <span class="gold">horror.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it.`);
						slave.devotion -= 10;
						slave.trust -= 20;
					} else if (slave.devotion <= 20) {
						r.push(`${He} is <span class="mediumorchid">consumed by enduring sorrow</span> and <span class="gold">horror.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it.`);
						slave.devotion -= 5;
						slave.trust -= 5;
					} else if (slave.devotion <= 50) {
						r.push(`${He} is dully obedient. ${He} has been broken to slave life so thoroughly that even this is neither surprising nor affecting.`);
					} else {
						r.push(`${He} is <span class="hotpink">pleased by this stark development,</span> since ${he} is so attentive to your will. ${He} also expects ${he}'ll be able to fuck better now.`);
						slave.devotion += 4;
					}
				}
				if (slave.abortionTat > -1) {
					slave.abortionTat++;
					r.push(`The temporary tattoo of a child has been replaced with ${his} ${ordinalSuffix(slave.abortionTat)} crossed out infant.`);
					cashX(forceNeg(V.modCost), "slaveMod", slave);
				}
			} else {
				if (slave.waist <= -95) {
					r.push(`${His} waist is so absurd that ${his} extreme corsetage does not affect ${him} further.`);
				} else {
					r.push(`<span class="lime">The extreme corseting narrows ${his} waist.</span>`);
					slave.waist = Math.clamp(slave.waist - 5, -95, 100);
					if (slave.waist >= -40) {
						r.push(`It's so tight that it's <span class="health dec">unhealthy.</span>`);
						healthDamage(slave, 5);
						if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
							if (slave.devotion < -20) {
								r.push(`${He} <span class="hotpink">barely has breath to think,</span> though ${he} has enough to <span class="gold">fear.</span>`);
								slave.devotion += 2;
								slave.trust -= 2;
							}
							if (slave.fetish === Fetish.MASOCHIST) {
								r.push(`During sex, every breath in and out is agonizing.`);
								if (slave.fetishKnown === 0) {
									r.push(`Despite this, ${he} seems to get off on the pain; ${he}'s a <span class="lightcoral">natural masochist.</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`It only adds to ${his} pleasure, much to ${his} <span class="hotpink">enjoyment.</span>`);
									slave.devotion += 1;
									if (slave.fetishStrength <= 95) {
										r.push(`Such constant suffering <span class="lightcoral">deepens ${his} masochism.</span>`);
										slave.fetishStrength += 2;
									}
								}
							} else if (slave.fetish === Fetish.NONE || slave.fetishKnown === 0) {
								if (fetishChangeChance(slave) > jsRandom(0, 100)) {
									r.push(`During sex, every breath in and out is agonizing. ${He} learns to come in spite of, and then <span class="lightcoral">because of the pain.</span>`);
									fetishChange(slave, Fetish.MASOCHIST, 10);
								}
							}
						}
					}
				}
			}
		} else if (slave.bellyAccessory === "a corset") {
			if (slave.inflation > 0) {
				r.push(`The pressure of ${his} corsetage <span class="change negative">renders ${him} unable to keep filling ${his} guts with ${slave.inflationType}.</span>`);
				deflate(slave);
			}
			if (slave.bellyPreg >= 1500) {
				r.push(`${His} corset lets ${his} growing belly protrude comfortably, preventing any danger to ${his} pregnancy but preventing any effect on ${his} waist.`);
			} else if (slave.belly >= 1500) {
				r.push(`${His} corset lets ${his} rounded belly protrude comfortably but prevents any effect on ${his} waist.`);
			} else {
				if (slave.waist <= -45) {
					r.push(`${His} waist is so narrow that ${his} corsetage does not affect it.`);
				} else {
					r.push(`<span class="lime">The corseting narrows ${his} waist.</span>`);
					slave.waist = Math.clamp(slave.waist - 3, -45, 100);
				}
			}
		} else if (slave.bellyAccessory === "a support band") {
			if (slave.belly > 10000) {
				r.push(`${His} pregnancy support band takes some weight off ${his} back, but it does little beyond that.`);
			}
		} else if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
			if (slave.weight > 130) {
				r.push(`${He} has trouble keeping ${his} fake belly strapped around ${his} huge gut, forcing it to be removed to prevent damage.`);
				slave.bellyAccessory = "none";
			} else {
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.sexualFlaw === SexualFlaw.BREEDER) {
						r.push(`${He} <span class="mediumorchid">resents</span> being forced to carry a fake pregnancy instead of a real one.`);
						slave.devotion -= 5;
					} else if (slave.devotion <= 20 && slave.trust >= -50 && slave.fetish === Fetish.PREGNANCY) {
						if (slave.fetishStrength > 60) {
							r.push(`As a pregnancy fetishist, ${he} <span class="hotpink">openly enjoys</span> wearing ${his} fake belly around.`);
							slave.devotion += 2;
						} else {
							r.push(`${His} interest in pregnancy helps ${him} <span class="hotpink">enjoy</span> wearing a fake belly.`);
							slave.devotion += 1;
						}
					} else if (slave.fetish === Fetish.PREGNANCY && slave.devotion > 50) {
						r.push(`${He} carries ${his} fake belly <span class="hotpink">with pride,</span> eager for the day you give ${him} one of ${his} own.`);
						slave.devotion += 1;
					} else if (slave.fetish === Fetish.PREGNANCY && slave.pregKnown === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
						r.push(`The fake belly ${he} wears <span class="mediumorchid">reminds ${him}</span> that ${he} isn't pregnant with a child.`);
						slave.devotion -= 1;
					} else if (slave.vagina === 0 && isFertile(slave) && !FutureSocieties.isActive('FSRepopulationFocus', arcology) && slave.devotion <= 20) {
						r.push(`The fake belly ${he} wears <span class="gold">worries</span> ${him} that you will soon put a real baby in ${him}.`);
						slave.trust -= 1;
					}
					if (slave.bellyAccessory === "a huge empathy belly" && slave.fetish !== Fetish.PREGNANCY) {
						if (slave.devotion > 50) {
							r.push(`${His} full-sized twins belly is heavy and unwieldy, but ${he} carries it <span class="hotpink">proudly</span> for you.`);
							slave.devotion += 1;
						} else {
							r.push(`${His} full-sized twins belly is heavy and unwieldy, and ${he} <span class="mediumorchid">despises</span> being forced to bear it.`);
							slave.devotion -= 1;
						}
					}
					if (slave.fetish === Fetish.PREGNANCY && slave.fetishStrength <= 95) {
						if (jsRandom(1, 100) >= 20) {
							r.push(`Pretending to be pregnant has <span class="lightcoral">furthered ${his} interest in pregnancy.</span>`);
							slave.fetishStrength += 4;
						} else if (slave.fetishStrength <= 40) {
							r.push(`Lugging around a fake pregnancy for the week has shown ${him} ${he} <span class="coral">isn't as into pregnancy as ${he} thought.</span>`);
							fetishChange(slave, Fetish.NONE, 10);
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function legAccessories(slave) {
		if (slave.shoes === "heels") {
			if (hasAnyNaturalLegs(slave)) {
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.devotion < -20) {
						r.push(`${He} <span class="mediumorchid">resents being forced</span> to wear high heels.`);
						slave.devotion -= 2;
					}
				}
			} else {
				r.push(`${His} P-Limb`);
				if (hasBothLegs(slave)) {
					r.push(`legs work`);
				} else {
					r.push(`leg works`);
				}
				r.push(`just as well in heels as`);
				if (hasBothLegs(slave)) {
					r.push(`they do`);
				} else {
					r.push(`it does`);
				}
				r.push(`out of them.`);
			}
		} else if (slave.shoes === "boots") {
			if (hasAnyNaturalLegs(slave)) {
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.devotion < -20) {
						r.push(`${He} <span class="mediumorchid">resents being forced</span> to wear high heeled boots.`);
						slave.devotion -= 2;
					}
				}
			} else {
				r.push(`${His} P-Limb`);
				if (hasBothLegs(slave)) {
					r.push(`legs work`);
				} else {
					r.push(`leg works`);
				}
				r.push(`just as well in boots as`);
				if (hasBothLegs(slave)) {
					r.push(`they do`);
				} else {
					r.push(`it does`);
				}
				r.push(`out of them.`);
			}
		} else if (slave.shoes === "extreme heels") {
			if (hasAnyNaturalLegs(slave)) {
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.devotion < -20) {
						r.push(`${He} <span class="mediumorchid">resents being forced</span> to wear <span class="gold">painfully</span> high heels.`);
						slave.devotion -= 2;
						slave.trust -= 2;
					} else if (slave.fetish === Fetish.MASOCHIST) {
						r.push(`It is difficult to walk in ${his} extreme heels, but ${he}`);
						if (slave.fetishKnown === 0) {
							r.push(`seems to enjoy every painful step; ${he}'s a <span class="lightcoral">natural masochist.</span>`);
							slave.fetishKnown = 1;
						} else {
							r.push(`<span class="hotpink">appreciates</span> every painful step ${he} gets to take.`);
							slave.devotion += 1;
						}
					} else {
						r.push(`${He} is kept <span class="hotpink">mindful</span> and <span class="gold">fearful</span> by the difficulty of walking in ${his} extreme heels.`);
						slave.devotion += 1;
						slave.trust -= 1;
					}
					r.push(`They're so high they're a bit <span class="health dec">unhealthy</span> for`);
					if (hasBothLegs(slave)) {
						r.push(`${his} legs.`);
					} else {
						r.push(`${him}.`);
					}
					healthDamage(slave, 2);
				}
			} else {
				r.push(`${His} P-Limb`);
				if (hasBothLegs(slave)) {
					r.push(`legs work`);
				} else {
					r.push(`leg works`);
				}
				r.push(`just as well in extreme heels as`);
				if (hasBothLegs(slave)) {
					r.push(`they do`);
				} else {
					r.push(`it does`);
				}
				r.push(`out of them.`);
			}
		} else {
			if (slave.heels === 1 && !canWalk(slave) && slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.shoes === "pumps") {
					r.push(`While ${he} can just barely stand with ${his} heeled pumps, ${he} is incapable of taking a step in them.`);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function vaginaAccessories(slave) {
		const dildo = App.Data.vaginalAccessory.get(slave.vaginalAccessory) || V.customItem.vaginalAccessory.get(slave.vaginalAccessory);
		if (slave.vaginalAccessory !== "none") {
			if (dildo.width === 0) {
				r.push(`Constantly wearing a ${slave.vaginalAccessory}`);
				if (slave.devotion < 20) {
					r.push(`habituates ${him} to sexual slavery and <span class="hotpink">increases ${his} submissiveness.</span>`);
					slave.devotion += 2;
				} else {
					r.push(`reminds ${him} of ${his} place and <span class="hotpink">increases ${his} devotion to you.</span>`);
					slave.devotion++;
				}
			} else if (dildo.width === 1) {
				if (slave.vagina < 1 && jsRandom(1, 100) > 50) {
					r.push(`Constantly wearing a dildo in ${his} virgin pussy <span class="lime">gets it used to penetration.</span>`);
					slave.vagina += 1;
				} else {
					r.push(`${His} pussy easily accommodates the dildo ${he}'s required to wear.`);
				}
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.sexualFlaw === SexualFlaw.HATESPEN && jsRandom(1, 100) > 50) {
						r.push(`The habit <span class="green">reduces ${his} dislike of having ${his} pussy filled.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				}
				if (dildo.length > 1) {
					if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
						r.push(`Being able to hold such a long dildo is a <span class="hotpink">point of pride</span> for the ostentatious size queen.`);
						slave.devotion += 2;
					} else {
						r.push(`It penetrates ${his} cervix causing ${him} tremendous discomfort, making ${him} a little <span class="gold">less trusting</span> of you.`);
						slave.trust -= 1;
					}
				}
			} else if (dildo.width === 2) {
				if (slave.vagina < 3) {
					if (V.seeStretching === 1 && jsRandom(1, 4) === 1) {
						r.push(`Constantly wearing a large dildo in ${his} pussy <span class="lime">stretches it out.</span>`);
						slave.vagina += 1;
					} else {
						r.push(`The large dildo ${he}'s required to wear is a stretch for ${his} cunt, but pussies are resilient and ${hers} isn't seriously affected.`);
					}
				} else {
					r.push(`${His} pussy accommodates the large dildo ${he}'s required to wear.`);
				}
				if (slave.fuckdoll === 0) {
					if (slave.fetish !== Fetish.MINDBROKEN) {
						if (slave.vagina < 2) {
							if (dildo.length === 1) {
								r.push(`The big dildo in ${his} tight cunt`);
								if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
									r.push(`is a <span class="hotpink">point of pride</span> for the ostentatious size queen.`);
									slave.devotion += 2;
								} else {
									r.push(`<span class="hotpink">breaks ${him} to sexual slavery</span> slightly.`);
									slave.devotion += 1;
								}
								if (slave.vagina === 1) {
									r.push(`It stretches ${his} tight cunt to soreness by the end of every day, so it also makes ${him} a little <span class="gold">less trusting</span> of you.`);
									slave.trust -= 1;
								}
							} else {
								r.push(`The big, long dildo in ${his} tight cunt`);
								if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
									r.push(`is a <span class="hotpink">point of pride</span> for the ostentatious size queen.`);
									slave.devotion += 2;
								} else {
									r.push(`<span class="hotpink">breaks ${him} to sexual slavery</span> slightly. It also penetrates ${his} cervix, causing ${him} tremendous discomfort, and making ${him} a little <span class="gold">less trusting</span> of you.`);
									slave.devotion += 1;
									slave.trust -= 1;
								}
								if (slave.vagina === 1) {
									r.push(`It stretches ${his} tight cunt to soreness by the end of every day, so it also makes ${him} a little <span class="gold">less trusting</span> of you.`);
									slave.trust -= 1;
								}
							}
						}
					}
				}
			} else if (dildo.width === 3) {
				if (dildo.length === 1) {
					if (slave.vagina < 4) {
						if (slave.fuckdoll === 0) {
							if (slave.fetish !== Fetish.MINDBROKEN) {
								if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
									r.push(`${He} thinks of the massive dildo stretching out ${his} womanhood as <span class="lime">preparation for the biggest cocks,</span> and <span class="hotpink">looks forward</span> to take anything — dicks, hands, truly anything — inside ${his} newly capacious cunt.`);
									slave.devotion += 4;
								} else if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
									r.push(`${He} gets off on the agony of having ${his} cunt`);
									if (V.seeStretching === 1) {
										r.push(`<span class="lime">permanently stretched</span>`);
									} else {
										r.push(`stretched`);
									}
									r.push(`by a huge dildo. The terrible combination of pain and pleasure <span class="hotpink">breaks ${his} will</span> but fills ${him} with <span class="gold">fear.</span>`);
									slave.devotion += 5;
									slave.trust -= 5;
								} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
									r.push(`${He} submits to the agony of having ${his} cunt`);
									if (V.seeStretching === 1) {
										r.push(`<span class="lime">permanently stretched</span>`);
									} else {
										r.push(`stretched`);
									}
									r.push(`by a huge dildo. Having ${his} hole ruined at your whim <span class="hotpink">breaks ${his} will</span> but fills ${him} with <span class="gold">fear.</span>`);
									slave.devotion += 5;
									slave.trust -= 5;
								} else {
									r.push(`The agony of having ${his} cunt`);
									if (V.seeStretching === 1) {
										r.push(`<span class="lime">permanently stretched</span>`);
									} else {
										r.push(`stretched`);
									}
									r.push(`by a huge dildo fills ${him} with <span class="mediumorchid">resentment</span> and <span class="gold">fear.</span>`);
									slave.devotion -= 5;
									slave.trust -= 5;
								}
							}
						}
						if (V.seeStretching === 1) {
							slave.vagina += 1;
						} else {
							r.push(`The large dildo ${he}'s required to wear is a stretch for ${his} cunt, but pussies are resilient and ${hers} isn't seriously affected.`);
						}
					} else {
						r.push(`${His} cavernous pussy accommodates the huge dildo ${he}'s required to wear.`);
					}
				} else {
					if (slave.vagina < 4) {
						if (slave.fuckdoll === 0) {
							if (slave.fetish !== Fetish.MINDBROKEN) {
								if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
									r.push(`${He} thinks of the massive dildo stretching out ${his} womanhood and stomach as <span class="lime">preparation for the biggest cocks,</span> and <span class="hotpink">looks forward</span> to take anything — dicks, hands, arms, truly anything — inside ${his} newly capacious cunt.`);
									slave.devotion += 4;
								} else if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
									r.push(`${He} gets off on the agony of having ${his} cunt`);
									if (V.seeStretching === 1) {
										r.push(`<span class="lime">permanently stretched</span>`);
									} else {
										r.push(`stretched`);
									}
									r.push(`and ${his} cervix penetrated by a huge dildo. The terrible combination of pain and pleasure <span class="hotpink">breaks ${his} will</span> but fills ${him} with <span class="gold">fear.</span>`);
									slave.devotion += 5;
									slave.trust -= 5;
								} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
									r.push(`${He} submits to the agony of having ${his} cunt`);
									if (V.seeStretching === 1) {
										r.push(`<span class="lime">permanently stretched</span>`);
									} else {
										r.push(`stretched`);
									}
									r.push(`and ${his} cervix penetrated by a huge dildo. Having ${his} hole and cervix ruined at your whim <span class="hotpink">breaks ${his} will</span> but fills ${him} with <span class="gold">fear.</span>`);
									slave.devotion += 5;
									slave.trust -= 5;
								} else {
									r.push(`The agony of having ${his} cunt`);
									if (V.seeStretching === 1) {
										r.push(`<span class="lime">permanently stretched</span>`);
									} else {
										r.push(`stretched`);
									}
									r.push(`and ${his} cervix penetrated by a huge dildo fills ${him} with <span class="mediumorchid">resentment</span> and <span class="gold">fear.</span>`);
									slave.devotion -= 5;
									slave.trust -= 5;
								}
							}
						}
						if (V.seeStretching === 1) {
							slave.vagina += 1;
						} else {
							r.push(`The large dildo ${he}'s required to wear is a stretch for ${his} cunt, but pussies are resilient and ${hers} isn't seriously affected.`);
						}
					} else {
						r.push(`${His} cavernous pussy accommodates the huge dildo ${he}'s required to wear.`);
					}
				}
			}
			if (dildo.length > 1) {
				if ((slave.preg > slave.pregData.normalBirth / 10) && slave.pregKnown === 1) {
					if (jsRandom(1, 100) > 50) {
						r.push(`The dildo penetrating ${his} womb <span class="orange">caused ${him} to miscarry,</span> which <span class="health dec">damages ${his} health.</span>`);
						healthDamage(slave, 20);
						if (rulesDemandContraceptives(slave, V.defaultRules)) {
							slave.preg = -1;
						} else {
							slave.preg = 0;
						}
						TerminatePregnancy(slave);
						actX(slave, "miscarriages");
						r.push(`${He} is`);
						if (slave.devotion < -50) {
							r.push(`<span class="mediumorchid">filled with violent, consuming hatred</span> and <span class="gold">fear.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it and views you as its killer.`);
							slave.devotion -= 25;
							slave.trust -= 25;
						} else if (slave.devotion < -20) {
							r.push(`<span class="mediumorchid">afflicted by desperate, inconsolable grief</span> and <span class="gold">horror.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it.`);
							slave.devotion -= 10;
							slave.trust -= 20;
						} else if (slave.devotion <= 20) {
							r.push(`<span class="mediumorchid">consumed by enduring sorrow</span> and <span class="gold">horror.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it.`);
							slave.devotion -= 5;
							slave.trust -= 5;
						} else if (slave.devotion <= 50) {
							r.push(`dully obedient. ${He} has been broken to slave life so thoroughly that even this is neither surprising nor affecting.`);
						} else {
							r.push(`<span class="hotpink">pleased by this stark development,</span> since ${he} is so attentive to your will. ${He} also expects ${he}'ll be able to fuck better now.`);
							slave.devotion += 4;
						}
						if (slave.abortionTat > -1) {
							slave.abortionTat++;
							r.push(`The temporary tattoo of a child has been replaced with ${his} ${ordinalSuffix(slave.abortionTat)} crossed out infant.`);
							cashX(forceNeg(V.modCost), "slaveMod", slave);
						}
					}
				}
			}
		}
		if (slave.vaginalAttachment === "vibrator") {
			/* TODO: write effects here */
		}
	}


	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function smallButtPlugEffects(slave) {
		if (slave.sexualFlaw === SexualFlaw.HATESANAL && jsRandom(1, 100) > 50) {
			r.push(`It <span class="green">gets ${him} habituated to having ${his} asshole filled.</span>`);
			slave.sexualFlaw = SexualFlaw.NONE;
		}
		if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN && plugLength(slave) > 1) {
			r.push(`The overly long plug delving the depths of ${his} rear <span class="hotpink">gets ${him} off,</span> since ${he}'s a size queen.`);
			slave.devotion += 2;
		}
	}
	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function largeButtPlugEffect(slave) {
		r.push(`${His} anus accommodates the large plug ${he}'s required to wear.`);
		if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			r.push(`In fact, ${he} <span class="hotpink">regularly orgasms</span> even in non-sexual situations as the plug is <span class="libido inc">constantly stimulating</span> ${his} rear-end.`);
			slave.devotion += 1;
			slave.energy += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function analAccessories(slave) {
		const plugDiameter = plugWidth(slave);
		if (plugDiameter === 1) {
			if (["cat tail", "cow tail", "fox tail", "tail"].includes(slave.buttplugAttachment)) {
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.anus < 1) {
						r.push(`Constantly wearing a tail plug in ${his} virgin butthole <span class="lime">stretches it out</span> and <span class="gold">is a constant degrading reminder of ${his} submission.</span>`);
						slave.anus += 1;
						slave.trust -= 2;
					} else {
						r.push(`${His} asshole is used to being penetrated and wearing ${his} tailed buttplug doesn't affect it, though it still serves as <span class="gold">a constant degrading reminder of ${his} submission.</span>`);
						slave.trust -= 2;
					}
					smallButtPlugEffects(slave);
				}
			} else {
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.anus < 1) {
						r.push(`Constantly wearing a plug in ${his} virgin butthole <span class="lime">stretches it out.</span>`);
						slave.anus += 1;
					} else {
						r.push(`${His} asshole is used to being penetrated and wearing ${his} buttplug doesn't affect it.`);
					}
					smallButtPlugEffects(slave);
				}
			}
		} else if (plugDiameter === 2) {
			if (["cat tail", "cow tail", "fox tail", "tail"].includes(slave.buttplugAttachment)) {
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.anus < 2) {
						r.push(`The uncomfortable tailed plug in ${his} asshole`);
						if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
							r.push(`<span class="hotpink">gets ${him} off,</span> since ${he}'s a size queen, while serving as <span class="gold">a constant degrading reminder of ${his} submission.</span>`);
							slave.devotion += 2;
							slave.trust -= 2;
						} else {
							r.push(`<span class="hotpink">breaks ${him} to anal slavery</span> slightly, while serving as a <span class="gold">a constant degrading reminder of ${his} submission.</span>`);
							slave.devotion += 1;
							slave.trust -= 2;
						}
						if (slave.anus < 1) {
							r.push(`It stretches ${his} tight rosebud painfully, making ${him} somewhat <span class="gold">less trusting</span> of you.`);
							slave.trust -= 1;
						}
					}
				}
				if (slave.anus < 3) {
					if (V.seeStretching === 1 && (slave.anus < 1 || jsRandom(1, 2) === 1)) {
						r.push(`Constantly wearing a large tailed plug up ${his} ass <span class="lime">loosens ${his} sphincter.</span>`);
						slave.anus += 1;
					} else {
						r.push(`The large tailed plug ${he}'s required to wear up ${his} ass stretches it to the limit, but on the rare occasions when the plug is removed, ${his} rear hole still tightens up.`);
					}
				} else {
					largeButtPlugEffect(slave);
				}
			} else {
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.anus < 2) {
						r.push(`The uncomfortable plug in ${his} asshole`);
						if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
							r.push(`<span class="hotpink">gets ${him} off,</span> since ${he}'s a size queen.`);
							slave.devotion += 2;
						} else {
							r.push(`<span class="hotpink">breaks ${him} to anal slavery</span> slightly.`);
							slave.devotion += 1;
						}
						if (slave.anus < 1) {
							r.push(`It stretches ${his} tight rosebud painfully, making ${him} somewhat <span class="gold">less trusting</span> of you.`);
							slave.trust -= 1;
						}
					}
				}
				if (slave.anus < 3) {
					if (V.seeStretching === 1 && (slave.anus < 1 || jsRandom(1, 2) === 1)) {
						r.push(`Constantly wearing a large plug up ${his} ass <span class="lime">loosens ${his} sphincter.</span>`);
						slave.anus += 1;
					} else {
						r.push(`The large plug ${he}'s required to wear up ${his} ass stretches it to the limit, but on the rare occasions when the plug is removed, ${his} rear hole still tightens up.`);
					}
				} else {
					largeButtPlugEffect(slave);
				}
			}
		} else if (plugDiameter === 3) {
			if (["cat tail", "cow tail", "fox tail", "tail"].includes(slave.buttplugAttachment)) {
				if (slave.anus < 4) {
					if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
						if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
							r.push(`${He} thinks of the horribly huge tailed plug ${he} has to wear in ${his} butt as <span class="lime">preparation for the biggest cocks,</span> and <span class="hotpink">looks forward</span> to being able to safely take unlubricated anal from them. Even so, the tail hanging from ${his} rear is <span class="gold">a constant degrading reminder of ${his} submission.</span>`);
							slave.devotion += 4;
							slave.trust -= 5;
						} else if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
							r.push(`${He} gets off on the agony of having ${his} anal sphincter`);
							if (V.seeStretching === 1) {
								r.push(`<span class="lime">permanently gaped</span>`);
							} else {
								r.push(`stretched`);
							}
							r.push(`by a huge tailed buttplug, but can't ignore the tail hanging from the back of the plug. The terrible combination of anal pleasure and degradation <span class="hotpink">breaks ${his} will</span> and fills ${him} with <span class="gold">humiliation.</span>`);
							slave.devotion += 5;
							slave.trust -= 7;
						} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
							r.push(`${He} submits to the agony of having ${his} anal sphincter`);
							if (V.seeStretching === 1) {
								r.push(`<span class="lime">permanently gaped</span>`);
							} else {
								r.push(`stretched`);
							}
							r.push(`by a huge tailed buttplug and the shame of having a tail dangle from the back of the plug. Having ${his} hole ruined at your whim and in such a degrading fashion <span class="hotpink">breaks ${his} will</span> and fills ${him} with <span class="gold">humiliation.</span>`);
							slave.devotion += 5;
							slave.trust -= 7;
						} else {
							r.push(`The agony of having ${his} anal sphincter`);
							if (V.seeStretching === 1) {
								r.push(`<span class="lime">permanently gaped</span>`);
							} else {
								r.push(`stretched`);
							}
							r.push(`by a huge tailed buttplug fills ${him} with <span class="mediumorchid">resentment</span> and <span class="gold">humiliation.</span>`);
							slave.devotion -= 5;
							slave.trust -= 5;
						}
					}
					if (V.seeStretching === 1) {
						slave.anus += 1;
					} else {
						r.push(`On the rare occasions when the plug is removed, ${his} rear hole still tightens up.`);
					}
				} else {
					r.push(`${His} gaping anus accommodates the huge tailed plug ${he}'s required to wear, serving little purpose other than to remind ${him} of ${his} <span class="gold">humiliation.</span>`);
					if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
						r.push(`In fact, ${he} <span class="hotpink">regularly orgasms</span> even in non-sexual situations as the plug is <span class="libido inc">constantly stimulating</span> ${his} rear-end.`);
						slave.devotion += 1;
						slave.energy += 1;
					}
				}
			} else {
				if (slave.anus < 4) {
					if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
						if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
							r.push(`${He} thinks of the horribly huge plug ${he} has to wear in ${his} butt as <span class="lime">preparation for the biggest cocks,</span> and <span class="hotpink">looks forward</span> to being able to safely take unlubricated anal from them.`);
							slave.devotion += 4;
						} else if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
							r.push(`${He} gets off on the agony of having ${his} anal sphincter`);
							if (V.seeStretching === 1) {
								r.push(`<span class="lime">permanently gaped</span>`);
							} else {
								r.push(`stretched`);
							}
							r.push(`by a huge buttplug. The terrible combination of pain and pleasure <span class="hotpink">breaks ${his} will</span> but fills ${him} with <span class="gold">fear.</span>`);
							slave.devotion += 5;
							slave.trust -= 5;
						} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
							r.push(`${He} submits to the agony of having ${his} anal sphincter`);
							if (V.seeStretching === 1) {
								r.push(`<span class="lime">permanently gaped</span>`);
							} else {
								r.push(`stretched`);
							}
							r.push(`by a huge buttplug. Having ${his} hole ruined at your whim <span class="hotpink">breaks ${his} will</span> but fills ${him} with <span class="gold">fear.</span>`);
							slave.devotion += 5;
							slave.trust -= 5;
						} else {
							r.push(`The agony of having ${his} anal sphincter`);
							if (V.seeStretching === 1) {
								r.push(`<span class="lime">permanently gaped</span>`);
							} else {
								r.push(`stretched`);
							}
							r.push(`by a huge buttplug fills ${him} with <span class="mediumorchid">resentment</span> and <span class="gold">fear.</span>`);
							slave.devotion -= 5;
							slave.trust -= 5;
						}
					}
					if (V.seeStretching === 1) {
						slave.anus += 1;
					} else {
						r.push(`On the rare occasions when the plug is removed, ${his} rear hole still tightens up.`);
					}
				} else {
					r.push(`${His} gaping anus accommodates the huge plug ${he}'s required to wear.`);
					if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
						r.push(`In fact, ${he} <span class="hotpink">regularly orgasms</span> even in non-sexual situations as the plug is <span class="libido inc">constantly stimulating</span> ${his} rear-end.`);
						slave.devotion += 1;
						slave.energy += 1;
					}
				}
			}
		}
		if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
			if (["cat tail", "cow tail", "fox tail", "tail"].includes(slave.buttplugAttachment)) {
				if (slave.fetish === Fetish.HUMILIATION && slave.fetishKnown === 0) {
					r.push(`${He} shows a surprising lack of resistance to the routine of having a tail inserted in ${his} ass each morning; ${he} seems to <span class="lightcoral">naturally enjoy the humiliation.</span>`);
					slave.fetishKnown = 1;
				} else if (slave.fetish === Fetish.NONE || slave.fetishKnown === 0) {
					if (fetishChangeChance(slave) > jsRandom(0, 100)) {
						r.push(`Slowly, ${his} shame at having a tail inserted in ${his} ass each morning turns to secret enjoyment and finally to <span class="lightcoral">open arousal at the humiliating accessory.</span>`);
						fetishChange(slave, Fetish.HUMILIATION, 10);
					}
				}
			} else if (plugWidth(slave) > 0) {
				if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 0) {
					r.push(`${He} shows a surprising lack of resistance to the routine of getting the plug up ${his} butt in the morning; ${he} seems to <span class="lightcoral">naturally enjoy anal stimulation.</span>`);
					slave.fetishKnown = 1;
				} else if (slave.fetish === Fetish.NONE || slave.fetishKnown === 0) {
					if (fetishChangeChance(slave) > jsRandom(0, 100)) {
						r.push(`Slowly, ${his} anguish at getting the plug up ${his} butt in the morning turns to secret enjoyment and finally to <span class="lightcoral">open arousal at having ${his} anus filled.</span>`);
						fetishChange(slave, Fetish.BUTTSLUT, 10);
					}
				}
			}
		}
	}
};
