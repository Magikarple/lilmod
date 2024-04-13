// cSpell:ignore A-TRPH, RDST-D, priapismic

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.drugs = function(slave) {
	const r = [];
	const {
		he, him, his, himself, He, His
	} = getPronouns(slave);
	let ignoredRule;
	if (slave.fuckdoll === 0) {
		r.push(drugs());
		r.push(aphrodisiacs());
	}

	return r.join(" ");

	function drugs() {
		const r = [];
		switch (slave.drugs) {
			case "priapism agents":
				if (slave.dick > 0 && slave.dick <= 10) {
					if (slave.chastityPenis === 1) {
						r.push(`${He} can do nothing but writhe in agony at the pain of ${his} priapismic erection trapped in ${his} chastity cage.`);
					} else {
						if (slave.dick > maxErectionSize(slave) + 2) {
							r.push(`${His} oversized dick is painfully engorged to a state of semi-hardness due to the priapism agents.`);
						} else if (slave.dick > maxErectionSize(slave)) {
							r.push(`${He} sports a painful, oversized erection due to the priapism agents.`);
						} else {
							r.push(`${He} sports a throbbing, painful erection due to the priapism agents.`);
						}
					}
				}
				break;
			case "super fertility drugs":
				if (isFertile(slave) && slave.preg === 0) {
					r.push(`${He} is constantly dripping sexual fluids and ${his} breasts and belly are slightly swollen. The super fertility drugs have ${him} ready to be impregnated.`);
				}
				break;
			case "fertility drugs":
				if (isFertile(slave) && slave.preg === 0) {
					r.push(`${He} smells of sexual fluids and ${his} breasts are slightly swollen. The fertility drugs have ${him} ready to be impregnated.`);
				}
				break;
			case "intensive breast injections":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} tits uncomfortably.`);
				} else {
					r.push(`${He} squirms under the unfamiliar weight on ${his} chest.`);
				}
				r.push(`The A-HGH must be having an effect, painfully stretching ${his} breasts as the mammary and adipose tissue underneath grows explosively.`);
				break;
			case "nipple enhancers":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} nipples uncomfortably.`);
				} else {
					r.push(`${He} squirms in response to the discomfort in ${his} breasts.`);
				}
				r.push(`The A-HGH must be having an effect, painfully causing ${his} body to expand ${his} nipples.`);
				break;
			case "hyper breast injections":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} tits uncomfortably.`);
				} else {
					r.push(`${He} squirms under the unfamiliar weight on ${his} chest.`);
				}
				r.push(`The HA-HGH must be having an effect, painfully stretching ${his} breasts as the mammary and adipose tissue underneath grows explosively.`);
				break;
			case "intensive butt injections":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} butt uncomfortably.`);
				} else {
					r.push(`${He} squirms against the unfamiliar weight on ${his} backside.`);
				}
				r.push(`The A-HGH must be having an effect, painfully stretching ${his} buttocks as the muscular and adipose tissue underneath grows explosively.`);
				break;
			case "hyper butt injections":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} butt uncomfortably.`);
				} else {
					r.push(`${He} squirms against the unfamiliar weight on ${his} backside.`);
				}
				r.push(`The HA-HGH must be having an effect, painfully stretching ${his} buttocks as the muscular and adipose tissue underneath grows explosively.`);
				break;
			case "intensive penis enhancement":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his}`);
					if (slave.dick > 0) {
						r.push(`dick`);
					} else {
						r.push(`clit`);
					}
					r.push(`uncomfortably.`);
				} else {
					r.push(`${He} squirms against the unfamiliar weight in ${his}`);
					if (slave.dick > 0) {
						r.push(`dick.`);
					} else {
						r.push(`clit.`);
					}
				}
				r.push(`The A-HGH must be having an effect, painfully lengthening and thickening ${his}`);
				if (slave.dick > 0) {
					r.push(`dick.`);
				} else {
					r.push(`clit.`);
				}
				break;
			case "intensive testicle enhancement":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} balls uncomfortably`);
				} else {
					r.push(`${He} squirms in response to the pressure in ${his} balls`);
				}
				r.push(`as a bead of cum forms on tip of ${his} dick. The A-HGH must be having an effect, painfully expanding ${his} testicles.`);
				break;
			case "hyper penis enhancement":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his}`);
					if (slave.dick > 0) {
						r.push(`dick`);
					} else {
						r.push(`clit`);
					}
					r.push(`uncomfortably.`);
				} else {
					r.push(`${He} squirms against the unfamiliar weight in ${his}`);
					if (slave.dick > 0) {
						r.push(`dick.`);
					} else {
						r.push(`clit.`);
					}
				}
				r.push(`The HA-HGH must be having an effect, painfully lengthening and thickening ${his}`);
				if (slave.dick > 0) {
					r.push(`dick.`);
				} else {
					r.push(`clit.`);
				}
				break;
			case "hyper testicle enhancement":
				if (slave.balls < 20) {
					if (hasAnyArms(slave)) {
						r.push(`${He} massages ${his} balls uncomfortably`);
					} else {
						r.push(`${He} squirms in response to the pressure in ${his} balls`);
					}
					r.push(`as cum drools from the tip of ${his} dick. The HA-HGH must be having an effect, painfully expanding ${his} testicles.`);
				} else if (slave.balls >= 50) {
					if (hasAnyArms(slave)) {
						r.push(`${He} massages ${his} balls uncomfortably`);
					} else {
						r.push(`${He} squirms in response to the pressure in ${his} balls`);
					}
					r.push(`as a thick cascade of cum pours from the tip of ${his} cock. The HA-HGH must be having an effect, painfully expanding ${his} testicles.`);
				} else if (slave.balls >= 37) {
					if (hasAnyArms(slave)) {
						r.push(`${He} massages ${his} balls uncomfortably`);
					} else {
						r.push(`${He} squirms in response to the pressure in ${his} balls`);
					}
					r.push(`as cum freely flows from the tip of ${his} cock, pooling under ${him}. The HA-HGH must be having an effect, painfully expanding ${his} testicles.`);
				} else if (slave.balls >= 20) {
					if (hasAnyArms(slave)) {
						r.push(`${He} massages ${his} balls uncomfortably`);
					} else {
						r.push(`${He} squirms in response to the pressure in ${his} balls`);
					}
					r.push(`as precum pools under ${him}. The HA-HGH must be having an effect, painfully expanding ${his} testicles.`);
				}
				break;
			case "female hormone injections":
			case "male hormone injections":
				r.push(`${He} looks very ill, likely a side effect of the extreme hormone injections.`);
				break;
			case "appetite suppressors":
				r.push(`Despite how little ${he} has been eating lately, ${his} stomach barely growls at all.`);
				break;
			case "penis atrophiers":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} dick uncomfortably.`);
				} else {
					r.push(`${He} squirms in response to the discomfort in ${his} dick.`);
				}
				r.push(`The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} dick.`);
				break;
			case "testicle atrophiers":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} balls uncomfortably.`);
				} else {
					r.push(`${He} squirms in response to the discomfort in ${his} balls.`);
				}
				r.push(`The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} testicles.`);
				break;
			case "clitoris atrophiers":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} clit uncomfortably.`);
				} else {
					r.push(`${He} squirms in response to the discomfort in ${his} clit.`);
				}
				r.push(`The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} clitoris.`);
				break;
			case "labia atrophiers":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} pussy uncomfortably.`);
				} else {
					r.push(`${He} squirms in response to the discomfort in ${his} cunt.`);
				}
				r.push(`The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} labia.`);
				break;
			case "nipple atrophiers":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} nipples uncomfortably.`);
				} else {
					r.push(`${He} squirms in response to the discomfort in ${his} breasts.`);
				}
				r.push(`The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} nipples.`);
				break;
			case "lip atrophiers":
				if (hasAnyArms(slave)) {
					r.push(`${He} massages ${his} lips uncomfortably.`);
				} else {
					r.push(`${He} licks ${his} lips uncomfortably.`);
				}
				r.push(`The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} lips.`);
				break;
			case "breast redistributors":
				if (hasAnyArms(slave)) {
					r.push(`${He} pinches at the fat building on ${his} belly and lets off a sigh.`);
				} else {
					r.push(`${He} squirms under the added weight building on ${his} belly.`);
				}
				r.push(`The RDST-D must be having an effect, encouraging ${his} body to redistribute ${his} breasts' adipose tissue to ${his} middle.`);
				break;
			case "butt redistributors":
				if (hasAnyArms(slave)) {
					r.push(`${He} pinches at the fat building on ${his} belly and lets off a sigh.`);
				} else {
					r.push(`${He} squirms under the added weight building on ${his} belly.`);
				}
				r.push(`The RDST-D must be having an effect, encouraging ${his} body to redistribute ${his} buttock's adipose tissue to ${his} middle.`);
				break;
			case "sag-B-gone":
				r.push(`${His} breasts are shiny from the layer of anti-sag cream rubbed onto them. They might be a little perkier, or not.`);
				break;
			default:
		}
		return r.join(" ");
	}

	function aphrodisiacs() {
		const r = [];
		if (slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") {
			if (slave.fetish === Fetish.MINDBROKEN) {
				ignoredRule = 1;
			} else if (disobedience(slave) !== 0) {
				ignoredRule = (disobedience(slave) >= jsRandom(1, 100)) ? 1 : 0;
			} else {
				ignoredRule = 0;
			}
			if (slave.inflationType === "aphrodisiac" || slave.aphrodisiacs > 1) {
				if (slave.inflationType === "aphrodisiac") {
					r.push(`${He}'s literally full of`);
				} else {
					r.push(`${He}'s swimming in`);
				}
				if (!hasAnyArms(slave)) {
					r.push(`aphrodisiacs, but is an amputee, so ${he} cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve`);
					if (slave.inflationType === "aphrodisiac") {
						r.push(`${himself}, but only managing to stir up the aphrodisiacs contained in ${his} gut, strengthening their effects even more.`);
					} else {
						r.push(`${himself}.`);
					}
				} else if (slave.rules.release.masturbation === 0 && slave.rules.release.master === 0 && ignoredRule === 0) {
					r.push(`aphrodisiacs, but is not permitted to touch ${himself} nor beg you for release. ${He} writhes with extreme sexual frustration, desperate to not break the rules in front of`);
					if (slave.inflationType === "aphrodisiac") {
						r.push(`you, but only manages to stir up the aphrodisiacs contained in ${his} gut, further strengthening their effects on ${him}.`);
					} else {
						r.push(`you.`);
					}
					if (canAchieveErection(slave)) {
						if (slave.chastityPenis) {
							r.push(`${His} cock agonizingly fills ${his} chastity cage, only adding to ${his} misery.`);
						} else {
							r.push(`${His} cock stands painfully erect, threatening to blow with the slightest contact.`);
						}
					}
				} else if (!canDoVaginal(slave) && !canDoAnal(slave) && (slave.dick === 0 || slave.chastityPenis) && slave.fetish === "boobs" && slave.boobs > 300) {
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						r.push(`aphrodisiacs and`);
						if (ignoredRule === 1) {
							r.push(`has disregarded ${his} masturbation restriction,`);
						} else {
							r.push(`is allowed to masturbate,`);
						}
						r.push(`so as ${he}`);
						if (hasAnyLegs(slave)) {
							r.push(`stands`);
						} else {
							r.push(`sits`);
						}
						r.push(`before you, ${he}`);
						if (slave.nipples === "fuckable") {
							r.push(`uses`);
							if (hasBothArms(slave)) {
								r.push(`both hands`);
							} else {
								r.push(`${his} hand`);
							}
							r.push(`to vigorously fist ${his} nipples.`);
						} else {
							r.push(`viciously gropes, kneads and milks ${his} breasts, only stopping to occasionally focus on ${his} erect nipples.`);
						}
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else {
						r.push(`aphrodisiacs and is not allowed to masturbate so as ${he}`);
						if (hasAnyLegs(slave)) {
							r.push(`stands`);
						} else {
							r.push(`sits`);
						}
						r.push(`before you, ${he} desperately presents ${his} chest in the hopes you'll grab hold of ${his} favorite body parts.`);
					}
				} else if (canDoAnal(slave) && slave.fetish === "buttslut") {
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						r.push(`aphrodisiacs and`);
						if (ignoredRule === 1) {
							r.push(`has disregarded ${his} masturbation restriction,`);
						} else {
							r.push(`is allowed to masturbate,`);
						}
						r.push(`so as ${he}`);
						if (hasAnyLegs(slave)) {
							r.push(`stands`);
						} else {
							r.push(`sits`);
						}
						r.push(`before you ${he}`);
						if (slave.anus === 0) {
							r.push(`furiously rubs ${his} virgin anus and the sensitive perineum beneath it, desperately trying to either get ${himself} off or entice you into giving ${him} what ${he} needs.`);
						} else {
							r.push(`uses`);
							if (slave.anus > 2) {
								if (hasBothArms(slave)) {
									r.push(`both hands,`);
								} else {
									r.push(`${his} entire fist,`);
								}
							} else {
								r.push(`several fingers`);
							}
							r.push(`to vigorously fuck ${his} favorite hole.`);
						}
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else {
						r.push(`aphrodisiacs and is not allowed to masturbate so as ${he}`);
						if (hasAnyLegs(slave)) {
							r.push(`stands`);
						} else {
							r.push(`sits`);
						}
						r.push(`before you, ${he} desperately presents ${his} anus hoping to entice you into giving ${him} relief.`);
					}
				} else if (slave.vagina >= 0 && slave.dick > 0) {
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						if (!canDoVaginal(slave) && slave.chastityPenis) {
							if (canDoAnal(slave)) {
								r.push(`aphrodisiacs and`);
								if (ignoredRule === 1) {
									r.push(`has disregarded ${his} masturbation restriction,`);
								} else {
									r.push(`is allowed to masturbate,`);
								}
								r.push(`so as ${he}`);
								if (hasAnyLegs(slave)) {
									r.push(`stands`);
								} else {
									r.push(`sits`);
								}
								r.push(`before you ${he}`);
								if (slave.anus === 0) {
									if (hasBothArms(slave)) {
										r.push(`plays with a nipple with one hand while furiously rubbing ${his} virgin anus and the sensitive perineum beneath it with the other,`);
									} else {
										r.push(`furiously rubs ${his} virgin anus and the sensitive perineum beneath it,`);
									}
									r.push(`desperately trying to get ${himself} off.`);
								} else {
									r.push(`uses`);
									if (slave.anus > 2) {
										r.push(`${his} entire hand, formed into a beak shape,`);
									} else if (slave.anus > 1) {
										r.push(`two fingers`);
									} else {
										r.push(`a finger`);
									}
									r.push(`to fuck ${his} own ass.`);
								}
								if (slave.inflationType === "aphrodisiac") {
									r.push(`${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
								}
							} else {
								r.push(`aphrodisiacs, but is wearing full chastity and cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve`);
								if (slave.inflationType === "aphrodisiac") {
									r.push(`${himself}, but only managing to stir up the aphrodisiacs contained in ${his} gut, strengthening their effects even more`);
								} else {
									r.push(`${himself}.`);
								}
							}
						} else if (canDoVaginal(slave)) {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he}`);
							if (hasAnyLegs(slave)) {
								r.push(`stands`);
							} else {
								r.push(`sits`);
							}
							r.push(`before you ${he} fingers ${his} vagina with`);
							if (hasBothArms(slave)) {
								if (canDoAnal(slave) && slave.anus > 0) {
									r.push(`one hand while ${he} fingers ${his} anus with the other.`);
								} else {
									r.push(`one hand while ${he} plays with a nipple with the other.`);
								}
							} else {
								r.push(`${his} hand.`);
							}
						} else if (!slave.chastityPenis) {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he}`);
							if (hasAnyLegs(slave)) {
								r.push(`stands`);
							} else {
								r.push(`sits`);
							}
							r.push(`before you ${he} rubs ${his} shaft with`);
							if (hasBothArms(slave)) {
								if (canDoAnal(slave) && slave.anus > 0) {
									r.push(`one hand while ${he} fingers ${his} anus with the other.`);
								} else {
									r.push(`both hands.`);
								}
							} else {
								r.push(`${his} hand.`);
							}
							if (canPenetrate(slave)) {
								r.push(`${His} cock is painfully erect.`);
							}
						} else {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he}`);
							if (hasAnyLegs(slave)) {
								r.push(`stands`);
							} else {
								r.push(`sits`);
							}
							r.push(`before you ${he} rubs ${his} shaft`);
							if (hasBothArms(slave)) {
								if (canDoAnal(slave) && slave.anus > 0) {
									r.push(`and pussy with one hand while ${he} fingers ${his} anus with the other.`);
								} else {
									r.push(`one hand while ${he} fingers ${his} pussy with the other.`);
								}
							} else {
								r.push(`and pussy with ${his} hand.`);
							}
							if (canAchieveErection(slave)) {
								r.push(`${His} cock is painfully erect.`);
							} else {
								r.push(`${His} cock is painfully engorged.`);
							}
							if (slave.inflationType === "aphrodisiac") {
								r.push(`${His} frantic masturbation forces ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
							}
						}
					} else {
						r.push(`aphrodisiacs and is not allowed to masturbate so as ${he}`);
						if (hasAnyLegs(slave)) {
							r.push(`stands`);
						} else {
							r.push(`sits`);
						}
						r.push(`before you ${he} desperately presents ${his} open mouth, ${his}`);
						if (slave.boobs >= 300) {
							r.push(`breasts,`);
						} else {
							r.push(`chest,`);
						}
						if (canDoVaginal(slave) || !slave.chastityPenis) {
							if (!canDoAnal(slave)) {
								r.push(`and`);
							}
							r.push(`${his} crotch,`);
						}
						if (canDoAnal(slave)) {
							if (canDoVaginal(slave) || !slave.chastityPenis) {
								r.push(`and`);
							}
							r.push(`${his} anus`);
						}
						if (!canDoVaginal(slave) && !slave.chastityPenis && !canDoAnal(slave)) {
							r.push(`and ${his} chastity`);
						}
						r.push(`in turn, hoping that something will entice you to give ${him} relief.`);
						if (slave.chastityPenis) {
							r.push(`${His} cock agonizingly fills ${his} chastity cage, only adding to ${his} misery.`);
						} else if (canAchieveErection(slave)) {
							r.push(`${His} cock stands painfully erect, threatening to blow with the slightest contact.`);
						} else {
							r.push(`${His} cock is painfully engorged and ready to burst at the slightest touch.`);
						}
					}
				} else if (slave.vagina >= 0) {
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						if (!canDoVaginal(slave)) {
							if (canDoAnal(slave)) {
								r.push(`aphrodisiacs and`);
								if (ignoredRule === 1) {
									r.push(`has disregarded ${his} masturbation restriction,`);
								} else {
									r.push(`is allowed to masturbate,`);
								}
								r.push(`so as ${he}`);
								if (hasAnyLegs(slave)) {
									r.push(`stands`);
								} else {
									r.push(`sits`);
								}
								r.push(`before you ${he}`);
								if (slave.anus === 0) {
									if (hasBothArms(slave)) {
										r.push(`plays with a nipple with one hand while furiously rubbing ${his} virgin anus and the sensitive perineum beneath it with the other,`);
									} else {
										r.push(`furiously rubs ${his} virgin anus and the sensitive perineum beneath it,`);
									}
									r.push(`desperately trying to get ${himself} off.`);
								} else {
									r.push(`uses`);
									if (slave.anus > 2) {
										r.push(`${his} entire hand, formed into a beak shape,`);
									} else if (slave.anus > 1) {
										r.push(`two fingers`);
									} else {
										r.push(`a finger`);
									}
									r.push(`to fuck ${his} own ass.`);
								}
								if (slave.inflationType === "aphrodisiac") {
									r.push(`${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
								}
							} else {
								r.push(`aphrodisiacs, but is wearing a chastity belt and cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve`);
								if (slave.inflationType === "aphrodisiac") {
									r.push(`${himself}, but only managing to stir up the aphrodisiacs contained in ${his} gut, strengthening their effects even more.`);
								} else {
									r.push(`${himself}.`);
								}
							}
						} else {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he}`);
							if (hasAnyLegs(slave)) {
								r.push(`stands`);
							} else {
								r.push(`sits`);
							}
							r.push(`before you ${he} rubs ${his} clit with`);
							if (hasBothArms(slave)) {
								if (canDoAnal(slave) && slave.anus > 0) {
									r.push(`one hand while ${he} fingers ${his} anus with the other.`);
								} else {
									r.push(`one hand while ${he} plays with a nipple with the other.`);
								}
							} else {
								r.push(`${his} hand.`);
							}
						}
					} else {
						r.push(`aphrodisiacs and is not allowed to masturbate so as ${he}`);
						if (hasAnyLegs(slave)) {
							r.push(`stands`);
						} else {
							r.push(`sits`);
						}
						r.push(`before you ${he} desperately presents ${his} open mouth, ${his}`);
						if (slave.boobs >= 300) {
							r.push(`breasts,`);
						} else {
							r.push(`chest,`);
						}
						if (canDoVaginal(slave)) {
							if (!canDoAnal(slave)) {
								r.push(`and`);
							}
							r.push(`${his} crotch,`);
						}
						if (canDoAnal(slave)) {
							if (canDoVaginal(slave)) {
								r.push(`and`);
							}
							r.push(`${his} anus`);
						}
						if (!canDoVaginal(slave) && !slave.chastityAnus) {
							r.push(`and ${his} chastity belts`);
						}
						r.push(`in turn, hoping that something will entice you to give ${him} relief.`);
					}
				} else if (slave.dick > 0) {
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						if (slave.chastityPenis) {
							if (canDoAnal(slave)) {
								r.push(`aphrodisiacs and`);
								if (ignoredRule === 1) {
									r.push(`has disregarded ${his} masturbation restriction,`);
								} else {
									r.push(`is allowed to masturbate,`);
								}
								r.push(`so as ${he}`);
								if (hasAnyLegs(slave)) {
									r.push(`stands`);
								} else {
									r.push(`sits`);
								}
								r.push(`before you ${he}`);
								if (slave.anus === 0) {
									if (hasBothArms(slave)) {
										r.push(`plays with a nipple with one hand while furiously rubbing ${his} virgin anus and the sensitive perineum beneath it with the other,`);
									} else {
										r.push(`furiously rubs ${his} virgin anus and the sensitive perineum beneath it,`);
									}
									r.push(`desperately trying to get ${himself} off.`);
								} else {
									r.push(`uses`);
									if (slave.anus > 2) {
										r.push(`${his} entire hand, formed into a beak shape,`);
									} else if (slave.anus > 1) {
										r.push(`two fingers`);
									} else {
										r.push(`a finger`);
									}
									r.push(`to fuck ${his} own ass.`);
								}
								if (slave.inflationType === "aphrodisiac") {
									r.push(`${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
								}
							} else {
								r.push(`aphrodisiacs, but is wearing a chastity cage and cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve`);
								if (slave.inflationType === "aphrodisiac") {
									r.push(`${himself}, but only managing to stir up the aphrodisiacs contained in ${his} gut, strengthening their effects even more`);
								} else {
									r.push(`${himself}.`);
								}
							}
						} else {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he}`);
							if (hasAnyLegs(slave)) {
								r.push(`stands`);
							} else {
								r.push(`sits`);
							}
							r.push(`before you ${he} rubs ${his} shaft with`);
							if (hasBothArms(slave)) {
								if (canDoAnal(slave) && slave.anus > 0) {
									r.push(`one hand while ${he} fingers ${his} anus with the other.`);
								} else {
									r.push(`both hands.`);
								}
							} else {
								r.push(`${his} hand.`);
							}
							if (canAchieveErection(slave)) {
								r.push(`${His} cock is painfully erect.`);
							} else {
								r.push(`${His} cock is painfully engorged.`);
							}
						}
					} else {
						r.push(`aphrodisiacs and is not allowed to masturbate so as ${he}`);
						if (hasAnyLegs(slave)) {
							r.push(`stands`);
						} else {
							r.push(`sits`);
						}
						r.push(`before you ${he} desperately presents ${his} open mouth, ${his}`);
						if (slave.boobs >= 300) {
							r.push(`breasts,`);
						} else {
							r.push(`chest,`);
						}
						if (!canDoAnal(slave)) {
							r.push(`and`);
						}
						r.push(`${his} crotch,`);
						if (canDoAnal(slave)) {
							r.push(`and ${his} anus`);
						}
						r.push(`in turn, hoping that something will entice you to give ${him} relief.`);
						if (slave.chastityPenis) {
							r.push(`${His} chastity cage painfully squeezes ${his} cock.`);
						} else if (canAchieveErection(slave)) {
							r.push(`${His} cock is painfully erect.`);
						} else {
							r.push(`${His} cock is painfully engorged.`);
						}
					}
				} else {
					// no tools
					r.push(`aphrodisiacs, has`);
					if (V.seeDicks > 0) {
						r.push(`no penis and`);
					}
					r.push(`no vagina, and`);
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						if (ignoredRule === 1) {
							r.push(`has disregarded ${his} masturbation restriction,`);
						} else {
							r.push(`is allowed to masturbate,`);
						}
						r.push(`so as ${he}`);
						if (hasAnyLegs(slave)) {
							r.push(`stands`);
						} else {
							r.push(`sits`);
						}
						r.push(`before you ${he}`);
						if (canDoAnal(slave)) {
							if (slave.anus === 0) {
								r.push(`plays with a nipple with one hand while furiously rubbing ${his} virgin anus and the sensitive perineum beneath it with the other, desperately trying to get ${himself} off.`);
								if (slave.inflationType === "aphrodisiac") {
									r.push(`${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
								}
							} else {
								r.push(`uses`);
								if (slave.anus > 2) {
									r.push(`${his} entire hand, formed into a beak shape,`);
								} else if (slave.anus > 1) {
									r.push(`two fingers`);
								} else {
									r.push(`a finger`);
								}
								r.push(`to fuck ${his} own ass.`);
								if (slave.inflationType === "aphrodisiac") {
									r.push(`${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
								}
							}
						} else if (slave.fetish === "boobs") {
							r.push(`furiously works ${his} rock-hard nipples.`);
						} else {
							r.push(`writhes with extreme sexual frustration, desperately trying to relieve ${himself} despite ${his} anal chastity.`);
						}
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else {
						if (canDoAnal(slave)) {
							r.push(`and is not allowed to masturbate, so as ${he}`);
							if (hasAnyLegs(slave)) {
								r.push(`stands`);
							} else {
								r.push(`sits`);
							}
							r.push(`before you ${he} desperately presents ${his} asshole, hoping you'll fuck ${his} only real source of relief.`);
						} else {
							r.push(`and is locked in anal chastity, so as ${he}`);
							if (hasAnyLegs(slave)) {
								r.push(`stands`);
							} else {
								r.push(`sits`);
							}
							r.push(`before you ${he} desperately presents ${his} rear, hoping to entice you into removing ${his} belt and taking ${him} right there.`);
						}
					}
				}
			} else {
				r.push(`${He}'s on`);
				if (!hasAnyArms(slave)) {
					r.push(`aphrodisiacs, but is an amputee, so ${he} cannot touch ${himself}. ${He} writhes with sexual frustration.`);
				} else if (slave.rules.release.masturbation === 0 && slave.rules.release.master === 0 && ignoredRule === 0) {
					r.push(`aphrodisiacs, but is not permitted to touch ${himself} nor beg you for release, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably.`);
					if (canAchieveErection(slave) && !slave.chastityPenis) {
						r.push(`${His} erect dick sways as ${he} does.`);
					}
				} else if (slave.vagina >= 0 && slave.dick > 0) {
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						if (!canDoVaginal(slave) && slave.chastityPenis) {
							r.push(`aphrodisiacs, but is wearing chastity and cannot touch ${himself}. ${He} writhes with sexual frustration as ${he} runs ${his}`);
							if (hasBothArms(slave)) {
								r.push(`hands`);
							} else {
								r.push(`hand`);
							}
							r.push(`across ${his} body.`);
						} else if (canDoVaginal(slave)) {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he} obeys your commands ${he} idly rubs ${his} pussy with`);
							if (hasBothArms(slave)) {
								r.push(`one hand while the other pinches a nipple.`);
							} else {
								r.push(`${his} hand.`);
							}
						} else if (!slave.chastityPenis) {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he} obeys your commands ${he} idly rubs ${his} shaft with`);
							if (hasBothArms(slave)) {
								r.push(`one hand while the other pinches a nipple.`);
							} else {
								r.push(`${his} hand.`);
							}
						} else {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he} obeys your commands ${he} idly rubs ${his} shaft`);
							if (hasBothArms(slave)) {
								r.push(`with one hand while ${he} fingers ${his} pussy with the other.`);
							} else {
								r.push(`and pussy with ${his} hand.`);
							}
						}
					} else {
						r.push(`aphrodisiacs, but is not permitted to touch ${himself}, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably.`);
						if (canAchieveErection(slave) && !slave.chastityPenis) {
							r.push(`${His} erect dick sways as ${he} does.`);
						}
					}
				} else if (slave.vagina >= 0) {
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						if (!canDoVaginal(slave)) {
							r.push(`aphrodisiacs, but is wearing a chastity belt and cannot touch ${himself}. ${He} writhes with sexual frustration.`);
						} else {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he} obeys your commands ${he} idly rubs ${his} pussy with`);
							if (hasBothArms(slave)) {
								r.push(`one hand while the other pinches a nipple.`);
							} else {
								r.push(`${his} hand.`);
							}
						}
					} else {
						r.push(`aphrodisiacs, but is not permitted to touch ${himself}, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably.`);
					}
				} else if (slave.dick > 0) {
					if (slave.rules.release.masturbation === 1 || ignoredRule === 1) {
						if (slave.chastityPenis) {
							r.push(`aphrodisiacs, but is wearing a chastity cage and cannot touch ${himself}. ${He} writhes with sexual frustration.`);
						} else {
							r.push(`aphrodisiacs and`);
							if (ignoredRule === 1) {
								r.push(`has disregarded ${his} masturbation restriction,`);
							} else {
								r.push(`is allowed to masturbate,`);
							}
							r.push(`so as ${he} obeys your commands ${he} idly rubs ${his} shaft with`);
							if (hasBothArms(slave)) {
								r.push(`one hand while the other pinches a nipple.`);
							} else {
								r.push(`${his} hand.`);
							}
						}
					} else {
						r.push(`aphrodisiacs, but is not permitted to touch ${himself}, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably.`);
						if (canAchieveErection(slave) && !slave.chastityPenis) {
							r.push(`${His} erect dick sways as ${he} does.`);
						}
					}
				} else {
					r.push(`aphrodisiacs, but has`);
					if (V.seeDicks > 0) {
						r.push(`no penis and`);
					}
					r.push(`no vagina no touch, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably.`);
				}
			}
		}
		if (slave.addict.isBetween(0, 3)) {
			r.push(`${He} is a new <span class="cyan">aphrodisiac addict.</span>`);
		} else if (slave.addict.isBetween(0, 10)) {
			r.push(`${He} is a confirmed <span class="cyan">aphrodisiac addict.</span>`);
		} else if (slave.addict > 0) {
			r.push(`${He} is completely <span class="cyan">dependent on aphrodisiacs,</span> and it is unlikely you will ever be able to wean ${him} off them.`);
		}
		return r.join(" ");
	}
};
