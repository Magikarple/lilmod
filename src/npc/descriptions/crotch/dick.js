/**
 * @param {FC.GingeredSlave} slave
 * @param {DescType} [descType=DescType.NORMAL]
 * @param {boolean} [skills=true] If true then we describe how skilled the slave is, otherwise we omit it.
 * @returns {string}
 */
App.Desc.dick = function(slave, descType = DescType.NORMAL, skills = true) {
	const r = [];
	const {
		he, him, his, himself, girl, He, His
	} = getPronouns(slave);
	if (slave.dick > 0) {
		switch (slave.dick) {
			case 10:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`awe-inspiring,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`awe-inspiring`);
					}
					r.push(`penis is around ${dickToEitherUnit(slave.dick)} long,`);
				} else {
					r.push(`${He} has an`);
					if (V.seeCircumcision === 1) {
						r.push(`awe-inspiring,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`awe-inspiring`);
					}
					r.push(`penis,`);
				}
				r.push(`a true masterpiece of modern growth hormone treatment,`);
				break;
			case 9:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`monstrous,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`monstrous`);
					}
					if (canAchieveErection(slave)) {
						r.push(`penis is around ${dickToEitherUnit(slave.dick)} long when fully erect,`);
					} else {
						r.push(`penis is around ${dickToEitherUnit(slave.dick)} long,`);
					}
				} else {
					r.push(`${He} has a`);
					if (V.seeCircumcision === 1) {
						r.push(`monstrous,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`monstrous`);
					}
					r.push(`penis,`);
				}
				r.push(`a work of modern pharmacological art,`);
				break;
			case 8:
				if (V.showDickCMs === 1) {
					r.push(`${His} truly`);
					if (V.seeCircumcision === 1) {
						r.push(`imposing,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`imposing`);
					}
					if (canAchieveErection(slave)) {
						r.push(`penis is around ${dickToEitherUnit(slave.dick)} long when erect,`);
					} else {
						r.push(`penis is around ${dickToEitherUnit(slave.dick)} long when as hard as it can get,`);
					}
				} else {
					r.push(`${He} has a truly`);
					if (V.seeCircumcision === 1) {
						r.push(`imposing,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`imposing`);
					}
					r.push(`penis,`);
				}
				r.push(`an obvious product of modern growth hormones,`);
				break;
			case 7:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`massive,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`massive`);
					}
					if (canAchieveErection(slave)) {
						r.push(`penis is around ${dickToEitherUnit(slave.dick)} long when erect,`);
					} else {
						r.push(`penis is around ${dickToEitherUnit(slave.dick)} long when as hard as it can get,`);
					}
				} else {
					r.push(`${He} has a`);
					if (V.seeCircumcision === 1) {
						r.push(`massive,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`massive`);
					}
					r.push(`penis,`);
				}
				r.push(`larger than a dick can grow naturally,`);
				break;
			case 6:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`enormous,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`enormous`);
					}
					r.push(`penis`);
					if (canAchieveErection(slave)) {
						r.push(`is around ${dickToEitherUnit(slave.dick)} long when`);
					} else {
						r.push(`would be around ${dickToEitherUnit(slave.dick)} long if it could become`);
					}
					r.push(`erect,`);
				} else {
					r.push(`${He} has an`);
					if (V.seeCircumcision === 1) {
						r.push(`enormous,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`enormous`);
					}
					r.push(`penis,`);
				}
				r.push(`a rival to the world's largest natural dicks,`);
				break;
			case 5:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`huge,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`huge`);
					}
					r.push(`penis`);
					if (canAchieveErection(slave)) {
						r.push(`is more than ${dickToEitherUnit(slave.dick)} long when`);
					} else {
						r.push(`would be around ${dickToEitherUnit(slave.dick)} long if it could become`);
					}
					r.push(`erect,`);
				} else {
					r.push(`${He} has a`);
					if (V.seeCircumcision === 1) {
						r.push(`huge,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`huge`);
					}
					r.push(`penis,`);
				}
				r.push(`large enough to be sexually inconvenient,`);
				break;
			case 4:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`large,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`large`);
					}
					r.push(`penis`);
					if (canAchieveErection(slave)) {
						r.push(`is around ${dickToEitherUnit(slave.dick)} long when`);
					} else {
						r.push(`would be around ${dickToEitherUnit(slave.dick)} long if it could become`);
					}
					r.push(`erect,`);
				} else {
					r.push(`${He} has a`);
					if (V.seeCircumcision === 1) {
						r.push(`large,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`large`);
					}
					r.push(`penis,`);
				}
				r.push(`big enough to be a source of pride on a male,`);
				break;
			case 3:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`average-sized,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`average-sized`);
					}
					r.push(`penis`);
					if (canAchieveErection(slave)) {
						r.push(`is around ${dickToEitherUnit(slave.dick)} long when`);
					} else {
						r.push(`would be around ${dickToEitherUnit(slave.dick)} long if it could become`);
					}
					r.push(`erect,`);
				} else {
					r.push(`${He} has an`);
					if (V.seeCircumcision === 1) {
						r.push(`average-sized,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`average-sized`);
					}
					r.push(`penis,`);
				}
				break;
			case 2:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`small,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`small`);
					}
					r.push(`penis`);
					if (canAchieveErection(slave)) {
						r.push(`is around ${dickToEitherUnit(slave.dick)} long when`);
					} else {
						r.push(`would be around ${dickToEitherUnit(slave.dick)} long if it could become`);
					}
					r.push(`erect,`);
				} else {
					r.push(`${He} has a`);
					if (V.seeCircumcision === 1) {
						r.push(`small,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`small`);
					}
					r.push(`penis,`);
				}
				r.push(`little enough to be a source of embarrassment on a male,`);
				break;
			case 1:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					}
					r.push(`micropenis`);
					if (canAchieveErection(slave)) {
						r.push(`is less than ${dickToEitherUnit(slave.dick)} long when`);
					} else {
						r.push(`would be less than ${dickToEitherUnit(slave.dick)} long if it could become`);
					}
					r.push(`erect,`);
				} else {
					r.push(`${He} has`);
					if (V.seeCircumcision === 1) {
						if (slave.foreskin > 0) {
							r.push(`an uncut`);
						} else {
							r.push(`a circumcised`);
						}
					} else {
						r.push(`a`);
					}
					r.push(`micropenis,`);
				}
				break;
			default:
				if (V.showDickCMs === 1) {
					r.push(`${His}`);
					if (V.seeCircumcision === 1) {
						r.push(`mind-shattering,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`mind-shattering`);
					}
					r.push(`penis is around ${dickToEitherUnit(slave.dick)} long,`);
				} else {
					r.push(`${He} has a`);
					if (V.seeCircumcision === 1) {
						r.push(`mind-shattering,`);
						if (slave.foreskin > 0) {
							r.push(`uncut`);
						} else {
							r.push(`circumcised`);
						}
					} else {
						r.push(`mind-shattering`);
					}
					r.push(`penis,`);
				}
				r.push(`a true masterpiece of modern growth hormone treatment,`);
				break;
		}

		if (slave.scrotum === 0) {
			if (slave.vagina > -1) {
				r.push(`and is right above ${his} vagina.`);
			} else {
				r.push(`and rests above nothing but smooth, sensitive skin until`);
				switch (slave.anus) {
					case 0:
						r.push(`the tiny crinkle of ${his} virgin asshole.`);
						break;
					case 1:
						r.push(`${his} tight little rosebud.`);
						break;
					case 2:
						r.push(`the bottom of the vertical slit formed by ${his} rear pussy.`);
						break;
					case 3:
						r.push(`the bottom of the soft slit formed by ${his} lewd rear pussy.`);
						break;
					default:
						r.push(`the edge of ${his} open anal gape.`);
						break;
				}
			}
		} else {
			switch (slave.balls) {
				case 10:
					r.push(`and ${he} has an inhuman pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, nearly ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 9:
					r.push(`and ${he} has a titanic pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 8:
					r.push(`and ${he} has a gigantic pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 7:
					r.push(`and ${he} has a monstrous pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 6:
					r.push(`and ${he} has an enormous pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 5:
					r.push(`and ${he} has a huge pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 4:
					r.push(`and ${he} has a big pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 3:
					r.push(`and ${he} has an average pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 2:
					r.push(`and ${he} has a small pair of`);
					if (V.showDickCMs === 1) {
						r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long.`);
					} else {
						r.push(`testicles.`);
					}
					break;
				case 1:
					r.push(`and ${his} testicles are so small they have retreated up into ${his} abdomen.`);
					break;
				case 0:
					if (slave.dick === 2) {
						r.push(`and ${he} lacks testicles.`);
					} else if (slave.dick === 1) {
						r.push(`and ${he} lacks testicles: ${his} vestigial dick is functionally a large, soft clit.`);
					} else {
						r.push(`but ${he} lacks testicles.`);
					}
					break;
				default:
					r.push(`and ${he} has a hypertrophied, clearly unnatural pair of testicles,`);
					if (V.showDickCMs === 1) {
						r.push(`about ${ballsToEitherUnit(slave.balls)} long,`);
					}
					r.push(`a true masterpiece of modern growth hormone treatment.`);
					break;
			}
			if (slave.fuckdoll === 0 && slave.balls > 0 && slave.scrotum > 0) {
				ballsVariant1();
			}
		}

		if (slave.fuckdoll === 0) {
			if (slave.mpreg === 1 && canAchieveErection(slave) && slave.bellyPreg >= 10000 && slave.prostate > 0) {
				r.push(`${His} huge pregnancy puts pressure on ${his} prostate at all times, leaving ${him} fully erect and trailing cum.`);
			} else if ((slave.assignment === Job.DAIRY) && (V.dairyStimulatorsSetting > 1) && canAchieveErection(slave)) {
				if (slave.dick > maxErectionSize(slave) + 2) {
					r.push(`${He}'s soft despite the drugs ejaculated by the dildo up ${his} asshole, since ${his} cock is too huge`);
					if (V.maxErectionSizeOption === 0) {
						r.push(`to ever become hard. The soft monstrosity`);
					} else {
						r.push(`for ${his} body to bring erect. The soft, disproportionately-sized`);
					}
					r.push(`monstrosity simply exists to gush cum into a catch basin.`);
				} else if (slave.dick > maxErectionSize(slave)) {
					r.push(`${He}'s only half hard despite the drugs ejaculated by the dildo up ${his} asshole, and ${he} must feel very faint, since even that requires much of ${his} blood volume.`);
				} else {
					r.push(`The drugs ejaculated by the dildo up ${his} asshole keep ${his} almost permanently hard, only letting ${him} go soft right after ejaculation.`);
				}
				r.push(`As you watch, the machine detects that ${his} balls are ready for emptying. It reams ${his} ass until semen whitens the transparent tubing coming off the head of the receptacle covering ${his} dick.`);
			} else if (slave.chastityPenis === 1) {
				r.push(App.Desc.dickAccessory(slave));
			} else if (slave.drugs === "priapism agents") {
				if (slave.dick > maxErectionSize(slave) + 2) {
					r.push(`${He}'s painfully hard, despite the size of ${his} cock, and on the brink of losing consciousness, since a dangerous amount of ${his} blood volume is required to even get it to this point.`);
				} else if (slave.dick > maxErectionSize(slave)) {
					r.push(`${He}'s painfully erect, or as erect that a cock of that size could be, and ${he} must feel very faint, since even that requires much of ${his} blood volume.`);
				} else {
					r.push(`${He}'s painfully erect.`);
				}
			} else if (slave.dick > maxErectionSize(slave) + 2) {
				r.push(`${He}'s too huge for ${his} cardiovascular system to create even the beginnings of an erection.`);
				if (slave.dick > 8) {
					r.push(`${His} cock is a soft, sensitive monolith`);
					if (slave.dick * 6 > slave.height) {
						r.push(`bigger than ${his} body,`);
					} else if ((slave.dick * 6) > (slave.height / 2)) {
						r.push(`the size of one of ${his} legs,`);
					} else {
						r.push(`the size of one of ${his} arms,`);
					}
					if (!hasAnyLegs(slave) && ((slave.dick * 6) > (slave.height / 2))) {
						r.push(`or would be if ${he} had any of those.`);
					} else if (!hasAnyArms(slave) && ((slave.dick * 6) <= (slave.height / 2))) {
						r.push(`or would be if ${he} had any of those.`);
					} else {
						r.push(`hanging with its head`);
						if (hasAnyLegs(slave)) {
							if (slave.dick > 9) {
								r.push(`below`);
							} else if (hasBothLegs(slave)) {
								r.push(`between`);
							} else {
								r.push(`next to`);
							}
							r.push(`${his}`);
							if (hasBothLegs(slave)) {
								r.push(`knees.`);
							} else {
								r.push(`knee.`);
							}
						} else {
							r.push(`far below ${his}`);
							if (isAmputee(slave)) {
								r.push(`limb`);
							} else {
								r.push(`leg`);
							}
							r.push(`less torso.`);
						}
					}
				}
				if (slave.prostate > 2) {
					r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
				} else if (slave.prostate > 1) {
					r.push(`${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
				}
			} else if (slave.gingering && slave.gingering.type === "vasodilator") {
				r.push(`${He}'s painfully erect.`);
				if (slave.prostate > 2) {
					r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
				} else if (slave.prostate > 1) {
					r.push(`${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
				}
			} else if ((slave.aphrodisiacs > 1) || (slave.inflationType === "aphrodisiac" && slave.inflation >= 2)) {
				r.push(`The aphrodisiacs have ${his} cock painfully`);
				if (slave.drugs === "hormone blockers" || !(slave.balls > 0 ? slave.hormoneBalance < 100 : slave.hormoneBalance <= -100) || slave.ballType === "sterile") {
					r.push(`hard, despite ${his} usual inability to achieve an erection.`);
				} else {
					r.push(`hard.`);
				}
				if (slave.prostate > 2) {
					r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
				} else if (slave.prostate > 1) {
					r.push(`${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
				}
			} else if ((slave.balls > 0) && slave.ballType === "sterile") {
				r.push(`Since ${he} has been chemically castrated, ${his} cock is soft.`);
				if (slave.energy > 95) {
					r.push(`${He}'s such a nympho that despite this, ${his} limp member is tipped by a drop of precum.`);
				}
			} else if (slave.balls === 0) {
				r.push(`Since ${he}`);
				if (slave.genes === "XY") {
					r.push(`has been gelded,`);
				} else {
					r.push(`lacks testicles,`);
				}
				r.push(`${his} cock is soft.`);
				if (slave.energy > 95) {
					r.push(`${He}'s such a nympho that despite this, ${his} limp member is tipped by a drop of precum.`);
				}
			} else if ((slave.dick > 0) && (slave.hormoneBalance >= 100)) {
				r.push(`Since ${his} body is flooded with female hormones, ${his} cock is soft.`);
				if (slave.devotion > 75) {
					r.push(`Despite this, ${he}'s so devoted to you that being near you makes ${him} horny. ${His} limp member is tipped by a drop of precum.`);
				} else if ((slave.drugs === "testicle enhancement") || (slave.drugs === "hyper testicle enhancement")) {
					r.push(`Unfortunately for the poor slave, ${he}'s also on drugs that cause overproduction of cum. Since ${his} soft dick makes it difficult for ${him} to ejaculate properly, ${he}'s almost frantic with discomfort, and ${his} dickhead is dribbling excessive precum.`);
				}
			} else if (slave.dick > maxErectionSize(slave)) {
				if (slave.dick > 6) {
					r.push(`${His} cock is flirting with the limit of what the human cardiovascular system can bring erect: the best ${he} can manage is a half-hardness that's too soft to meaningfully fuck anything. If ${he} could somehow get fully erect, there are few holes ${he} could safely penetrate, anyway.`);
				} else {
					r.push(`${His} cock is flirting with the limit of what the ${his} cardiovascular system can bring erect: the best ${he} can manage is a half-hardness that's too soft to meaningfully fuck anything. If ${he} could somehow get fully erect, the drop in blood pressure would limit ${his} sexual prowess, anyway.`);
				}
				if (slave.prostate > 2) {
					r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
				} else if (slave.prostate > 1) {
					r.push(`${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
				}
			} else if (slave.dick > 1) {
				if (slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") {
					r.push(`The aphrodisiacs have ${his} cock`);
					if (!canAchieveErection(slave)) {
						r.push(`hard, despite ${his} usual inability to achieve erection`);
					} else {
						r.push(`hard.`);
					}
					if (slave.prostate > 2) {
						r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
					} else if (slave.prostate > 1) {
						r.push(`${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
					}
				} else if (slave.energy > 95) {
					r.push(`As a nympho, ${he}'s almost constantly hard.`);
					if (slave.prostate > 2) {
						r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
					} else if (slave.prostate > 1) {
						r.push(`${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
					}
				} else if ((slave.fetish === "buttslut") && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how hard ${he}`);
					if (slave.prostate > 1) {
						r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
					} else if (slave.prostate > 0) {
						r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
					} else {
						r.push(`is,`);
					}
					r.push(`${he}'s probably fantasizing about being buttfucked.`);
				} else if ((slave.fetish === "cumslut") && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how hard ${he}`);
					if (slave.prostate > 1) {
						r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
					} else if (slave.prostate > 0) {
						r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
					} else {
						r.push(`is,`);
					}
					r.push(`${he}'s probably fantasizing about being facefucked.`);
				} else if ((slave.fetish === "humiliation") && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how hard ${he}`);
					if (slave.prostate > 1) {
						r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
					} else if (slave.prostate > 0) {
						r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
					} else {
						r.push(`is,`);
					}
					r.push(`${he}'s probably fantasizing about being humiliated.`);
				} else if ((slave.fetish === Fetish.SUBMISSIVE) && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how hard ${he}`);
					if (slave.prostate > 1) {
						r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
					} else if (slave.prostate > 0) {
						r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
					} else {
						r.push(`is,`);
					}
					r.push(`${he}'s probably fantasizing about submission.`);
				} else if ((slave.fetish === "dom") && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how hard ${he}`);
					if (slave.prostate > 1) {
						r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
					} else if (slave.prostate > 0) {
						r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
					} else {
						r.push(`is,`);
					}
					r.push(`${he}'s probably fantasizing about dominating someone.`);
				} else if ((slave.fetish === "masochist") && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how hard ${he}`);
					if (slave.prostate > 1) {
						r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
					} else if (slave.prostate > 0) {
						r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
					} else {
						r.push(`is,`);
					}
					r.push(`${he}'s probably fantasizing about pain.`);
				} else if ((slave.fetish === "sadist") && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how hard ${he}`);
					if (slave.prostate > 1) {
						r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
					} else if (slave.prostate > 0) {
						r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
					} else {
						r.push(`is,`);
					}
					r.push(`${he}'s probably fantasizing about hurting someone.`);
				} else if ((slave.fetish === "pregnancy") && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					if (canGetPregnant(slave)) {
						r.push(`Judging by how hard ${he}`);
						if (slave.prostate > 1) {
							r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
						} else if (slave.prostate > 0) {
							r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
						} else {
							r.push(`is,`);
						}
						r.push(`${he}'s probably fantasizing about sporting a huge pregnant belly.`);
					} else {
						r.push(`Judging by how hard ${he}`);
						if (slave.prostate > 1) {
							r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
						} else if (slave.prostate > 0) {
							r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
						} else {
							r.push(`is,`);
						}
						r.push(`${he}'s probably fantasizing about getting someone pregnant.`);
					}
				} else if ((slave.fetish === "boobs") && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how hard ${he}`);
					if (slave.prostate > 1) {
						r.push(`is and the constant flow of precum leaking from the tip of ${his} dick,`);
					} else if (slave.prostate > 0) {
						r.push(`is and the little bead of precum forming at the tip of ${his} dick,`);
					} else {
						r.push(`is,`);
					}
					r.push(`${he}'s probably fantasizing about boobs.`);
				} else if (slave.devotion > 50) {
					r.push(`As a devoted sex slave, ${he} has no trouble keeping ${himself} hard for ${his} ${getWrittenTitle(slave)}.`);
					if (slave.prostate > 2) {
						r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
					} else if (slave.prostate > 1) {
						r.push(`${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
					}
				} else if (slave.devotion > 20) {
					r.push(`As an obedient sex slave, ${he} does ${his} best to keep ${himself} hard for ${his} ${getWrittenTitle(slave)}.`);
					if (slave.prostate > 2) {
						r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
					} else if (slave.prostate > 1) {
						r.push(`${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way.`);
					}
				} else {
					r.push(`Judging by the softness of ${his} dick, ${he} doesn't find ${his} situation arousing.`);
				}
			} else {
				r.push(`You can't tell if ${he} is hard or soft at a glance, not that there is much of a size difference between them.`);
				if (slave.prostate > 2) {
					r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant; a swell that makes ${his} cock look even smaller by comparison.`);
				}
			}

			if (!isVirile(slave)) {
				if (slave.vasectomy === 1) {
					r.push(`${He} shoots blanks thanks to ${his} vasectomy.`);
				} else if (slave.ballType === "sterile") {
					r.push(`${He} no longer produces sperm, so ${his} ejaculate lacks potency.`);
				} else if (slave.pubertyXY !== 1) {
					r.push(`While ${he} does ejaculate, ${his} testicles aren't mature enough to add sperm to it.`);
				}
			}

			if (slave.physicalAge <= 3) {
				if (slave.dick >= 15) {
					if (slave.fuckdoll > 0) {
						r.push(`The difficulties of having a gigantic dick are greatly reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
					} else {
						if (canWalk(slave)) {
							r.push(`${His} penis is so massive that it is difficult for ${him} to move.`);
							if (slave.muscles > 95) {
								r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support it.`);
							} else if (slave.muscles > 30) {
								r.push(`${He} can barely manage to move ${his} penis, and usually walks carrying it in any way ${he} can.`);
							} else if (slave.muscles > 5) {
								r.push(`${He} requires assistance to move ${his} penis, and tries to rest it on the ground whenever ${he} can.`);
							} else {
								r.push(`${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous penis doesn't weigh ${him} down as much.`);
							}
						} else {
							r.push(`${His} penis is nearly the same size as ${his} torso, making ${him} about half cock.`);
						}
						if (slave.dick >= 20) {
							if (V.dickAccessibility === 1) {
								r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with a cock`);
							} else {
								if (descType === DescType.MARKET) {
									r.push(`${He}'ll have`);
								} else {
									r.push(`${He} has`);
								}
								r.push(`trouble living in your penthouse, which is not designed for ${girl} s with dicks`);
							}
							r.push(`bigger than they are.`);
						}
					}
				}
			} else { // Below is planned to be split like this: if (slave.physicalAge <= 12) else if (slave.physicalAge > 12)
				if (slave.dick >= 30) {
					if (slave.fuckdoll > 0) {
						r.push(`The difficulties of having a gigantic dick are greatly reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
					} else {
						if (canWalk(slave)) {
							r.push(`${His} penis is so massive that it is difficult for ${him} to move.`);
							if (slave.muscles > 95) {
								r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support it.`);
							} else if (slave.muscles > 30) {
								r.push(`${He} can barely manage to move ${his} penis, and usually walks carrying it in any way ${he} can.`);
							} else if (slave.muscles > 5) {
								r.push(`${He} requires assistance to move ${his} penis, and tries to rest it on the ground whenever ${he} can.`);
							} else {
								r.push(`${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous penis doesn't weigh ${him} down as much.`);
							}
						} else {
							r.push(`${His} penis is nearly the same size as ${his} torso, making ${him} about half cock.`);
						}
						if (slave.dick >= 30) {
							if (V.dickAccessibility === 1) {
								r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with a cock`);
							} else {
								if (descType === DescType.MARKET) {
									r.push(`${He}'ll have`);
								} else {
									r.push(`${He} has`);
								}
								r.push(`trouble living in your penthouse, which is not designed for ${girl}s with dicks`);
							}
							r.push(`bigger than they are.`);
						}
					}
				}
			}

			if (slave.balls >= 50) {
				r.push(`${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts in every direction.`);
			} else if (slave.balls >= 37) {
				r.push(`${His} perpetual stream of semen-laced precum leaves a mess on the floor wherever ${he}`);
				if (canAchieveErection(slave)) {
					r.push(`goes, along with ${his} shaft`);
					if (hasAnyLegs(slave)) {
						r.push(`and`);
						if (hasBothLegs(slave)) {
							r.push(`legs`);
						} else {
							r.push(`leg`);
						}
					}
					r.push(`whenever ${he} is erect.`);
				} else {
					r.push(`goes.`);
				}
			} else if (slave.balls >= 25) {
				r.push(`Parts of the constant dribble coming out of the tip of ${his} dick are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release.`);
			} else if (slave.balls >= 10) {
				r.push(`${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}.`);
			}

			if (slave.prostate > 2) {
				r.push(`${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate.`);
			}
			if (isVirile(slave)) {
				if (slave.geneMods.livestock === 1) {
					r.push(`${His} loads are ${slave.prostate < 2 ? "incredibly thick" : "noticeably thicker"} thanks to ${his} genetic modifications.`);
					if (slave.geneMods.aggressiveSperm === 1) {
						r.push(`It also takes an effort to shoot it all out, which seems to make it more pleasurable than a typical cumshot. ${He} is required to be extra vigilant in cleaning up after ${himself} lest`);
						if (!V.seePreg) {
							r.push(`you get a nasty surprise should you sit down without looking.`);
						} else if (canGetPregnant(V.PC) && canImpreg(V.PC, slave) && (V.PC.mpreg === 1 || V.PC.vagina >= 0)) {
							r.push(`you take a seat somewhere ${he} came and suddenly find yourself in the family way.`);
						} else {
							r.push(`a wayward glob of ${his} cum somehow meets a fertile pussy and causes you a whole lot of problems.`);
						}
						if (V.seePreg && canGetPregnant(slave) && canImpreg(slave, slave) && (slave.mpreg === 1 || slave.vagina >= 0)) {
							r.push(`Odds are some of ${his} sperm will eventually find its way to ${his} womb, so sooner or later ${he} will grow pregnant with ${his} own child.`);
						}
					}
				} else if (slave.geneMods.aggressiveSperm === 1) {
					r.push(`${His} gene therapy has reduced the density of ${his} loads, but the volume of it slowly working through ${his} urethra seems to make it more pleasurable than a typical cumshot. ${He} is required to be extra vigilant in cleaning up after ${himself} lest`);
					if (!V.seePreg) {
						r.push(`you get a nasty surprise should you sit down without looking.`);
					} else if (canGetPregnant(V.PC) && canImpreg(V.PC, slave) && (V.PC.mpreg === 1 || V.PC.vagina >= 0)) {
						r.push(`you take a seat somewhere ${he} came and suddenly find yourself in the family way.`);
					} else {
						r.push(`a wayward glob of ${his} cum somehow meets a fertile pussy and causes you a whole lot of problems.`);
					}
					if (V.seePreg && canGetPregnant(slave) && canImpreg(slave, slave) && (slave.mpreg === 1 || slave.vagina >= 0)) {
						r.push(`Odds are some of ${his} sperm will eventually find its way to ${his} womb, so sooner or later ${he} will grow pregnant with ${his} own child.`);
					}
				}
			}

			if (slave.physicalAge <= 3) {
				massiveTesticles1();
			} else if (slave.physicalAge <= 12) {
				if (slave.balls >= 50) {
					if (slave.fuckdoll > 0) {
						r.push(`The difficulties of having a gigantic pair of testicles are greatly reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
					} else {
						if (canWalk(slave)) {
							r.push(`${His} balls are so massive that it is difficult for ${him} to move.`);
							if (slave.muscles > 95) {
								r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them.`);
							} else if (slave.muscles > 30) {
								r.push(`${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can.`);
							} else if (slave.muscles > 5) {
								r.push(`${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can.`);
							} else {
								r.push(`${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much.`);
							}
						} else if (canMove(slave)) {
							r.push(`${His} balls are so massive that it is difficult for ${him} to move at all.`);
							if (slave.muscles > 95) {
								r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, dragging ${his} testicles along behind ${him}.`);
							} else if (slave.muscles > 30) {
								r.push(`${He} can barely manage to lift ${his} testicles, and finds it exhausting to drag them everywhere.`);
							} else if (slave.muscles > 5) {
								r.push(`${He} requires assistance to get ${his} testicles off the ground, and tries avoid moving them whenever ${he} can.`);
							} else {
								r.push(`${He} requires assistance to get ${his} testicles off the ground, and can barely manage to drag them along behind ${him}.`);
							}
						} else if (slave.balls >= 100) {
							r.push(`${His} testicles are each nearly the same size as ${him}, making ${him} mostly testicle.`);
						} else {
							r.push(`${His} testicles are each nearly the same size as ${his} torso, making a solid portion of ${his} mass testicle.`);
						}
						if (slave.balls > 90) {
							if (V.ballsAccessibility === 1) {
								r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with balls`);
							} else {
								if (descType === DescType.MARKET) {
									r.push(`${He}'ll have`);
								} else {
									r.push(`${He} has`);
								}
								r.push(`trouble living in your penthouse, which is not designed for ${girl}s with testicles`);
							}
							r.push(`wider than a standard doorway.`);
						}
					}
				}
			} else if (slave.physicalAge > 12) {
				massiveTesticles2();
			}

			if (slave.foreskin > 0) {
				if (slave.foreskin - slave.dick < -1) {
					r.push(`${His} cockhead is much too large for ${his} foreskin, probably as a result of recent penis growth it hasn't had time to stretch to accommodate yet.`);
					if (canAchieveErection(slave) && ((slave.devotion > 20) || (slave.aphrodisiacs > 0) || (slave.gingering && slave.gingering.type === "vasodilator") || (slave.inflationType === "aphrodisiac") || (slave.drugs === "priapism agents"))) {
						r.push(`The bit of erect dickhead visible at the tip of the uncomfortably stretched skin is an angry color from being squeezed so hard.`);
					} else if (canAchieveErection(slave)) {
						r.push(`${He} isn't erect right now, but getting a hard-on will probably be very uncomfortable for ${him}.`);
					} else {
						r.push(`Fortunately for ${him}, ${he} can't get hard, making this merely uncomfortable for ${him}.`);
					}
				} else if (slave.foreskin - slave.dick === -1) {
					r.push(`${His} foreskin is stretched by ${his} dickhead, probably as a result of recent penis growth it hasn't had time to get used to yet.`);
					if (canAchieveErection(slave) && ((slave.devotion > 20) || (slave.aphrodisiacs > 0) || (slave.gingering && slave.gingering.type === "vasodilator") || (slave.inflationType === "aphrodisiac") || (slave.drugs === "priapism agents"))) {
						r.push(`${His} erection has stretched the skin there taut.`);
					} else if (canAchieveErection(slave)) {
						r.push(`${He} isn't erect right now, but getting a hard-on will probably be a bit uncomfortable for ${him}.`);
					} else {
						r.push(`Fortunately for ${him}, ${he} can't get hard, making this state merely odd-looking.`);
					}
				} else if (slave.foreskin - slave.dick === 1) {
					r.push(`${His} foreskin seems too large for ${his} dick, probably as a result of recent penis shrinkage.`);
					if (canAchieveErection(slave) && ((slave.devotion > 20) || (slave.aphrodisiacs > 0) || (slave.gingering && slave.gingering.type === "vasodilator") || (slave.inflationType === "aphrodisiac") || (slave.drugs === "priapism agents"))) {
						r.push(`${His} erection cannot fully retract it, though it's loose enough that this doesn't look uncomfortable.`);
					} else if (canAchieveErection(slave)) {
						r.push(`${He} isn't erect right now, making the tip of ${his} dick look shriveled.`);
					} else {
						r.push(`${He} can't get hard, making the tip of ${his} dick look shriveled.`);
					}
				} else if (slave.foreskin - slave.dick > 1) {
					r.push(`${His} foreskin is far too large for ${his} dick, probably as a result of recent penis shrinkage.`);
					if (canAchieveErection(slave) && ((slave.devotion > 20) || (slave.aphrodisiacs > 0) || (slave.gingering && slave.gingering.type === "vasodilator") || (slave.inflationType === "aphrodisiac") || (slave.drugs === "priapism agents"))) {
						r.push(`${His} erection cannot retract it at all, though it's loose enough that this doesn't look uncomfortable. Orgasming, though, will likely produce a dribbling mess.`);
					} else if (canAchieveErection(slave)) {
						r.push(`${He} isn't erect right now, so the excess skin droops lamely off ${his} cockhead.`);
					} else {
						r.push(`${He} can't get hard, so the excess skin droops lamely off ${his} cockhead.`);
					}
				}
			}
			if (slave.dick <= 3) {
				if (slave.balls > 5) {
					r.push(`${His} cock is small enough that it does not hang past the bottom of ${his} gigantic ballsack when soft.`);
				}
			} else if (slave.dick <= 2) {
				if (slave.balls > 4) {
					r.push(`${His} cock is so small that it does not hang past the bottom of ${his} huge ballsack when soft.`);
				}
			} else if (slave.dick <= 1) {
				if (slave.balls > 3) {
					r.push(`${His} cock is so small that it barely protrudes from ${his} ample ballsack.`);
				}
			}
		}
	} else if (slave.vagina === -1) {
		// NULL

		if (slave.scrotum === 0) {
			r.push(`${He} has`);
			if (V.seeDicks > 0) {
				r.push(`no penis and`);
			}
			r.push(`no vagina, nothing but a tiny hole in the smooth ${slave.skin} skin`);
			if (hasAnyLegs(slave)) {
				r.push(`between ${his} legs.`);
			} else {
				r.push(`at the base of ${his} hips.`);
			}
		} else {
			r.push(`${He} has`);
			if (V.seeDicks > 0) {
				r.push(`no penis and`);
			}
			r.push(`no vagina, just a tiny hole above`);
			ballSize();
			if (slave.fuckdoll === 0 && slave.balls > 0 && slave.scrotum > 0) {
				let scrotalFullness = slave.scrotum - slave.balls;
				if (slave.balls > 90) {
					if (scrotalFullness < -1) {
						r.push(`${His} poor scrotum is agonizingly overfilled and looks ready to burst. ${He} must be in constant pain.`);
					} else if (scrotalFullness === -1) {
						r.push(`${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort.`);
					} else if (scrotalFullness === 0) {
						r.push(`${His} comfortable scrotum allows them to hang massively`);
						if (hasBothLegs(slave)) {
							r.push(`between ${his} legs.`);
						} else {
							r.push(`from ${his}`);
							if (isAmputee(slave)) {
								r.push(`limbless`);
							}
							r.push(`torso`);
						}
					} else {
						r.push(`Their weight and size has stretched ${his} scrotum downward, so that they`);
						if (hasAnyLegs(slave)) {
							r.push(`drag along the floor`);
						} else {
							r.push(`hang far from ${his}`);
							if (isAmputee(slave)) {
								r.push(`limbless`);
							}
							r.push(`torso`);
						}
					}
				} else if (slave.balls >= 20) {
					if (scrotalFullness < -1) {
						r.push(`${His} poor scrotum is agonizingly overfilled and taut. ${He} must be in constant pain.`);
					} else if (scrotalFullness === -1) {
						r.push(`${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort.`);
					} else if (scrotalFullness === 0) {
						r.push(`${His} comfortable scrotum allows them to hang massively`);
						if (hasBothLegs(slave)) {
							r.push(`between ${his} legs.`);
						} else {
							r.push(`from ${his}`);
							if (isAmputee(slave)) {
								r.push(`limbless`);
							}
							r.push(`torso.`);
						}
					} else {
						r.push(`Their weight and size has stretched ${his} scrotum downward, so that they dangle`);
						if (hasAnyLegs(slave)) {
							r.push(`to ${his}`);
							if (hasBothLegs(slave)) {
								r.push(`knees.`);
							} else {
								r.push(`knee.`);
							}
						} else {
							r.push(`quite the distance from ${his}`);
							if (isAmputee(slave)) {
								r.push(`limbless`);
							}
							r.push(`torso.`);
						}
					}
				} else if (slave.balls > 5) {
					if (scrotalFullness < -1) {
						r.push(`${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in agony.`);
					} else if (scrotalFullness === -1) {
						r.push(`They're held against ${his} base by a tight scrotum that permits them little movement.`);
					} else if (scrotalFullness === 0) {
						r.push(`${His} comfortable scrotum allows them to hang massively`);
						if (hasBothLegs(slave)) {
							r.push(`between ${his} legs.`);
						} else {
							r.push(`from ${his}`);
							if (isAmputee(slave)) {
								r.push(`limbless`);
							}
							r.push(`torso.`);
						}
					} else {
						r.push(`Their weight has stretched ${his} scrotum downward, so that they dangle`);
						if (hasAnyLegs(slave)) {
							r.push(`halfway to ${his}`);
							if (hasBothLegs(slave)) {
								r.push(`knees.`);
							} else {
								r.push(`knee.`);
							}
						} else {
							r.push(`some distance from ${his}`);
							if (isAmputee(slave)) {
								r.push(`limbless`);
							}
							r.push(`torso.`);
						}
					}
				} else if (slave.balls > 3) {
					if (scrotalFullness < -1) {
						r.push(`They're too big for ${his} tiny scrotum, which is stretched tight over each ball.`);
					} else if (scrotalFullness === -1) {
						r.push(`They're held against ${his} base by a tight scrotum that permits them little movement.`);
					} else if (scrotalFullness === 0) {
						r.push(`${His} soft scrotum allows them to rest comfortably`);
						if (hasAnyLegs(slave)) {
							r.push(`between ${his}`);
							if (hasBothLegs(slave)) {
								r.push(`legs.`);
							} else {
								r.push(`leg and stump.`);
							}
						} else {
							r.push(`beneath ${his}`);
							if (isAmputee(slave)) {
								r.push(`limbless`);
							}
							r.push(`torso.`);
						}
					} else {
						r.push(`${He} has a loose, dangling scrotum that allows them to swing`);
						if (hasBothLegs(slave)) {
							r.push(`between ${his} legs.`);
						} else {
							r.push(`from ${his}`);
							if (isAmputee(slave)) {
								r.push(`limbless`);
							}
							r.push(`torso.`);
						}
					}
				} else if (slave.balls > 1) {
					if (scrotalFullness < 0) {
						r.push(`They're held tightly by a very minimal scrotum that turns them into a soft little bump.`);
					} else if (scrotalFullness === 0) {
						r.push(`${His} comfortable little scrotum allows them to rest softly.`);
					} else {
						r.push(`They're almost lost in ${his} big soft scrotum, wrinkled for lack of anything to fill it properly.`);
					}
				} else {
					if (scrotalFullness === 0) {
						r.push(`${He} has a soft little trace of scrotum.`);
					} else {
						r.push(`They've left ${his} scrotum soft and empty.`);
					}
				}
			}
			if (slave.physicalAge <= 3) {
				massiveTesticles1();
			} else if (slave.physicalAge <= 12) {
				if (slave.balls >= 50) {
					if (slave.fuckdoll > 0) {
						r.push(`The difficulties of having a gigantic pair of testicles are greatly reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
					} else {
						if (canWalk(slave)) {
							r.push(`${His} balls are so massive that it is difficult for ${him} to move.`);
							if (slave.muscles > 95) {
								r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them.`);
							} else if (slave.muscles > 30) {
								r.push(`${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can.`);
							} else if (slave.muscles > 5) {
								r.push(`${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can.`);
							} else {
								r.push(`${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much.`);
							}
						} else if (canMove(slave)) {
							r.push(`${His} balls are so massive that it is difficult for ${him} to move at all.`);
							if (slave.muscles > 95) {
								r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, dragging ${his} testicles along behind ${him}.`);
							} else if (slave.muscles > 30) {
								r.push(`${He} can barely manage to lift ${his} testicles, and finds it exhausting to drag them everywhere.`);
							} else if (slave.muscles > 5) {
								r.push(`${He} requires assistance to get ${his} testicles off the ground, and tries avoid moving them whenever ${he} can.`);
							} else {
								r.push(`${He} requires assistance to get ${his} testicles off the ground, and can barely manage to drag them along behind ${him}.`);
							}
						} else if (slave.balls >= 100) {
							r.push(`${His} testicles are each nearly the same size as ${him}, making ${him} about mostly testicle.`);
						} else {
							r.push(`${His} testicles are each nearly the same size as ${his} torso, making ${him} about mostly testicle.`);
						}
						if (slave.balls > 90) {
							if (V.ballsAccessibility === 1) {
								r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with balls`);
							} else {
								if (descType === DescType.MARKET) {
									r.push(`${He}'ll have`);
								} else {
									r.push(`${He} has`);
								}
								r.push(`trouble living in your penthouse, which is not designed for ${girl} s with testicles`);
							}
							r.push(`wider than a standard doorway.`);
						}
					}
				}
			} else if (slave.physicalAge > 12) {
				massiveTesticles2();
			}
			if (slave.prostate > 2) {
				r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum streams from the hole; ${his} artificially hyperactive prostate keeps ${him} that way.`);
			} else if (slave.prostate > 1) {
				r.push(`${He}'s got a string of precum dangling from the hole; ${his} artificially hyperactive prostate keeps ${him} that way.`);
			}
			if (slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") {
				r.push(`The aphrodisiacs have ${him} so horny that there's a`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little precum beading at`);
				}
				r.push(`the hole.`);
			} else if (slave.energy > 95) {
				r.push(`As a nympho, ${he}'s almost always got a`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole.`);
			} else if (slave.fetishKnown === 0) {
				// TODO: write me
			} else if (slave.fetishStrength <= 60) {
				// TODO: write me
			} else if (slave.fetish === "buttslut") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about being buttfucked.`);
			} else if (slave.fetish === "cumslut") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about being facefucked.`);
			} else if (slave.fetish === "humiliation") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about being humiliated.`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about submission.`);
			} else if (slave.fetish === "dom") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about dominating someone.`);
			} else if (slave.fetish === "masochist") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about pain.`);
			} else if (slave.fetish === "sadist") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about hurting someone.`);
			} else if (slave.fetish === "pregnancy") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about getting someone pregnant.`);
			} else if (slave.fetish === "boobs") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about boobs.`);
			}
			if (slave.prostate > 2) {
				r.push(`This hole is normally almost invisible, making it absolutely shocking when ${he} orgasms and shoots a massive cumshot out of it.`);
			} else if (slave.balls !== 0) {
				r.push(`This hole is normally almost invisible, making it quite surprising when ${he} orgasms and shoots cum out of it.`);
			} else if (slave.prostate !== 0) {
				r.push(`This hole is normally almost invisible, though it does leak some watery ejaculate when ${he} orgasms.`);
			}
			if (slave.balls >= 50) {
				r.push(`${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts down ${his} balls.`);
			} else if (slave.balls >= 37) {
				r.push(`${His} perpetual stream of semen-laced precum running down ${his} balls leaves a mess on the floor wherever ${he} goes.`);
			} else if (slave.balls >= 25) {
				r.push(`Parts of the constant dribble coming out of the hole are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release.`);
			} else if (slave.balls >= 10) {
				r.push(`${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}.`);
			}
			if (slave.prostate > 2) {
				r.push(`${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate.`);
			}
			if (isVirile(slave)) {
				if (slave.geneMods.livestock === 1) {
					r.push(`${His} loads are ${slave.prostate < 2 ? "incredibly thick" : "noticeably thicker"} thanks to ${his} genetic modifications.`);
					if (slave.geneMods.aggressiveSperm === 1) {
						r.push(`It also takes an effort to shoot it all out, which seems to make it more pleasurable than a typical cumshot. ${He} is required to be extra vigilant in cleaning up after ${himself} lest`);
						if (!V.seePreg) {
							r.push(`you get a nasty surprise should you sit down without looking.`);
						} else if (canGetPregnant(V.PC) && canImpreg(V.PC, slave) && (V.PC.mpreg === 1 || V.PC.vagina >= 0)) {
							r.push(`you take a seat somewhere ${he} came and suddenly find yourself in the family way.`);
						} else {
							r.push(`a wayward glob of ${his} cum somehow meets a fertile pussy and causes you a whole lot of problems.`);
						}
						if (V.seePreg && canGetPregnant(slave) && canImpreg(slave, slave) && (slave.mpreg === 1 || slave.vagina >= 0)) {
							r.push(`Odds are some of ${his} sperm will eventually find its way to ${his} womb, so sooner or later ${he} will grow pregnant with ${his} own child.`);
						}
					}
				} else if (slave.geneMods.aggressiveSperm === 1) {
					r.push(`${His} gene therapy has reduced the density of ${his} loads, but the volume of it slowly working through ${his} urethra seems to make it more pleasurable than a typical cumshot. ${He} is required to be extra vigilant in cleaning up after ${himself} lest`);
					if (!V.seePreg) {
						r.push(`you get a nasty surprise should you sit down without looking.`);
					} else if (canGetPregnant(V.PC) && canImpreg(V.PC, slave) && (V.PC.mpreg === 1 || V.PC.vagina >= 0)) {
						r.push(`you take a seat somewhere ${he} came and suddenly find yourself in the family way.`);
					} else {
						r.push(`a wayward glob of ${his} cum somehow meets a fertile pussy and causes you a whole lot of problems.`);
					}
					if (V.seePreg && canGetPregnant(slave) && canFemImpreg(slave, slave) && (slave.mpreg === 1 || slave.vagina >= 0)) {
						r.push(`Odds are some of ${his} sperm will eventually find its way to ${his} womb, so sooner or later ${he} will grow pregnant with ${his} own child.`);
					}
				}
			}
			if (!isVirile(slave)) {
				if (slave.vasectomy === 1) {
					r.push(`${He} shoots blanks thanks to ${his} vasectomy.`);
				} else if (slave.ballType === "sterile") {
					r.push(`${He} no longer produces sperm, so ${his} ejaculate lacks potency.`);
				} else if (slave.pubertyXY !== 1) {
					r.push(`While ${he} does ejaculate, ${his} testicles aren't mature enough to add sperm to it.`);
				}
			}
		}
	} else if (slave.balls > 0) {
		// vagina + balls

		if (slave.scrotum !== 0) {
			r.push(`${He} has no penis, just a tiny hole above`);
			ballSize();
			if (slave.fuckdoll === 0 && slave.balls > 0 && slave.scrotum > 0) {
				ballsVariant1();
			}
			if (slave.physicalAge <= 3) {
				massiveTesticles1();
			} else if (slave.physicalAge <= 12) {
				if (slave.balls >= 50) {
					if (slave.fuckdoll > 0) {
						r.push(`The difficulties of having a gigantic pair of testicles are greatly reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
					} else {
						if (canWalk(slave)) {
							r.push(`${His} balls are so massive that it is difficult for ${him} to move.`);
							if (slave.muscles > 95) {
								r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them.`);
							} else if (slave.muscles > 30) {
								r.push(`${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can.`);
							} else if (slave.muscles > 5) {
								r.push(`${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can.`);
							} else {
								r.push(`${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much.`);
							}
						} else if (canMove(slave)) {
							r.push(`${His} balls are so massive that it is difficult for ${him} to move at all.`);
							if (slave.muscles > 95) {
								r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, dragging ${his} testicles along behind ${him}.`);
							} else if (slave.muscles > 30) {
								r.push(`${He} can barely manage to lift ${his} testicles, and finds it exhausting to drag them everywhere.`);
							} else if (slave.muscles > 5) {
								r.push(`${He} requires assistance to get ${his} testicles off the ground, and tries avoid moving them whenever ${he} can.`);
							} else {
								r.push(`${He} requires assistance to get ${his} testicles off the ground, and can barely manage to drag them along behind ${him}.`);
							}
						} else if (slave.balls >= 100) {
							r.push(`${His} testicles are each nearly the same size as ${him}, making ${him} mostly testicle.`);
						} else {
							r.push(`${His} testicles are each nearly the same size as ${his} torso, making ${him} mostly testicle.`);
						}
						if (slave.balls > 90) {
							if (V.ballsAccessibility === 1) {
								r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with balls`);
							} else {
								if (descType === DescType.MARKET) {
									r.push(`${He}'ll have`);
								} else {
									r.push(`${He} has`);
								}
								r.push(`trouble living in your penthouse, which is not designed for ${girl}s with testicles`);
							}
							r.push(`wider than a standard doorway.`);
						}
					}
				}
			} else if (slave.physicalAge > 12) {
				massiveTesticles2();
			}
			if (slave.prostate > 2) {
				r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum streams from the hole and down ${his} testicles; ${his} artificially hyperactive prostate keeps ${him} that way.`);
			} else if (slave.prostate > 1) {
				r.push(`${He}'s got a string of precum dangling from the hole and down ${his} testicles; ${his} artificially hyperactive prostate keeps ${him} that way.`);
			}
			if (slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") {
				r.push(`The aphrodisiacs have ${him} so horny that there's a`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little precum beading at`);
				}
				r.push(`the hole.`);
			} else if (slave.energy > 95) {
				r.push(`As a nympho, ${he}'s almost always got a`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole.`);
			} else if (slave.fetishKnown === 0) {
				// TODO: write me
			} else if (slave.fetishStrength <= 60) {
				// TODO: write me
			} else if (slave.fetish === "buttslut") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about being buttfucked.`);
			} else if (slave.fetish === "cumslut") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about being facefucked.`);
			} else if (slave.fetish === "humiliation") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about being humiliated.`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about submission.`);
			} else if (slave.fetish === "dom") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about dominating someone.`);
			} else if (slave.fetish === "masochist") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about pain.`);
			} else if (slave.fetish === "sadist") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about hurting someone.`);
			} else if (slave.fetish === "pregnancy") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about getting someone pregnant.`);
			} else if (slave.fetish === "boobs") {
				r.push(`Judging by the`);
				if (slave.prostate > 1) {
					r.push(`constant flow of precum leaking from`);
				} else {
					r.push(`little bead of precum forming at`);
				}
				r.push(`the hole, ${he}'s probably fantasizing about boobs.`);
			}
			if (slave.prostate > 2) {
				r.push(`This hole is normally almost invisible, making it absolutely shocking when ${he} orgasms and shoots a massive cumshot out of it.`);
			} else if (slave.balls !== 0) {
				r.push(`This hole is normally almost invisible, making it quite surprising when ${he} orgasms and shoots cum out of it.`);
			} else if (slave.prostate !== 0) {
				r.push(`This hole is normally almost invisible, though it does leak some watery ejaculate when ${he} orgasms.`);
			}
			if (slave.balls >= 50) {
				r.push(`${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts down ${his} balls.`);
			} else if (slave.balls >= 37) {
				r.push(`${His} perpetual stream of semen-laced precum running down ${his} balls leaves a mess on the floor wherever ${he} goes.`);
			} else if (slave.balls >= 25) {
				r.push(`Parts of the constant dribble coming out of the hole are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release.`);
			} else if (slave.balls >= 10) {
				r.push(`${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}.`);
			}
			if (slave.prostate > 2) {
				r.push(`${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate.`);
			}
			if (isVirile(slave)) {
				if (slave.geneMods.livestock === 1) {
					r.push(`${His} loads are ${slave.prostate < 2 ? "incredibly thick" : "noticeably thicker"} thanks to ${his} genetic modifications.`);
					if (slave.geneMods.aggressiveSperm === 1) {
						r.push(`It also takes an effort to shoot it all out, which seems to make it more pleasurable than a typical cumshot. ${He} is required to be extra vigilant in cleaning up after ${himself} lest`);
						if (!V.seePreg) {
							r.push(`you get a nasty surprise should you sit down without looking.`);
						} else if (canGetPregnant(V.PC) && canImpreg(V.PC, slave) && (V.PC.mpreg === 1 || V.PC.vagina >= 0)) {
							r.push(`you take a seat somewhere ${he} came and suddenly find yourself in the family way.`);
						} else {
							r.push(`a wayward glob of ${his} cum somehow meets a fertile pussy and causes you a whole lot of problems.`);
						}
						if (V.seePreg && canGetPregnant(slave) && canImpreg(slave, slave) && (slave.mpreg === 1 || slave.vagina >= 0)) {
							r.push(`Odds are some of ${his} sperm will eventually find its way to ${his} womb, so sooner or later ${he} will grow pregnant with ${his} own child.`);
						}
					}
				} else if (slave.geneMods.aggressiveSperm === 1) {
					r.push(`${His} gene therapy has reduced the density of ${his} loads, but the volume of it slowly working through ${his} urethra seems to make it more pleasurable than a typical cumshot. ${He} is required to be extra vigilant in cleaning up after ${himself} lest`);
					if (!V.seePreg) {
						r.push(`you get a nasty surprise should you sit down without looking.`);
					} else if (canGetPregnant(V.PC) && canImpreg(V.PC, slave) && (V.PC.mpreg === 1 || V.PC.vagina >= 0)) {
						r.push(`you take a seat somewhere ${he} came and suddenly find yourself in the family way.`);
					} else {
						r.push(`a wayward glob of ${his} cum somehow meets a fertile pussy and causes you a whole lot of problems.`);
					}
					if (V.seePreg && canGetPregnant(slave) && canFemImpreg(slave, slave) && (slave.mpreg === 1 || slave.vagina >= 0)) {
						r.push(`Since some of ${his} sperm leaks down into ${his} pussy whenever ${he} cums, sooner or later ${he} will grow pregnant with ${his} own child.`);
					}
				}
			}
		} else {
			if (slave.prostate > 2) {
				r.push(`The area above ${his} crotch has a slight swell to it from ${his} prostate implant.`);
			}
		}
	}

	if (slave.prostate === 0) {
		if (slave.dick > 0 || slave.balls > 0) {
			if (slave.genes === "XY") {
				r.push(`Though it's not externally apparent, ${his} prostate has been removed,`);
			} else {
				r.push(`${He} is lacking a prostate,`);
			}
			r.push(`giving ${his} ejaculations less`);
			if (slave.anus !== 0) {
				r.push(`body and reducing the stimulation ${he} feels during anal sex.`);
			} else {
				r.push(`body.`);
			}
		}
	}

	r.push(App.Desc.mods(slave, "dick"));
	if (skills) {
		penetrativeSkillDesc();
	}

	return r.join(" ");

	function ballsVariant1() {
		const scrotalFullness = slave.scrotum - slave.balls;
		if (slave.balls > 90) {
			if (scrotalFullness < -1) {
				r.push(`${His} poor scrotum is agonizingly overfilled and looks ready to burst. ${He} must be in constant pain.`);
			} else if (scrotalFullness === -1) {
				r.push(`${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort.`);
			} else if (scrotalFullness === 0) {
				r.push(`${His} comfortable scrotum allows them to hang massively`);
				if (hasBothLegs(slave)) {
					r.push(`between ${his} legs.`);
				} else {
					r.push(`from ${his}`);
					if (isAmputee(slave)) {
						r.push(`limbless`);
					}
					r.push(`torso.`);
				}
			} else {
				r.push(`Their weight and size has stretched ${his} scrotum downward, so that they`);
				if (hasAnyLegs(slave)) {
					r.push(`drag along the floor.`);
				} else {
					r.push(`hang far from ${his}`);
					if (isAmputee(slave)) {
						r.push(`limbless`);
					}
					r.push(`torso.`);
				}
			}
		} else if (slave.balls >= 20) {
			if (scrotalFullness < -1) {
				r.push(`${His} poor scrotum is agonizingly overfilled and taut. ${He} must be in constant pain.`);
			} else if (scrotalFullness === -1) {
				r.push(`${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort.`);
			} else if (scrotalFullness === 0) {
				r.push(`${His} comfortable scrotum allows them to hang massively`);
				if (hasBothLegs(slave)) {
					r.push(`between ${his} legs.`);
				} else {
					r.push(`from ${his}`);
					if (isAmputee(slave)) {
						r.push(`limbless`);
					}
					r.push(`torso.`);
				}
			} else {
				r.push(`Their weight and size has stretched ${his} scrotum downward, so that they dangle`);
				if (hasAnyLegs(slave)) {
					r.push(`to ${his}`);
					if (hasBothLegs(slave)) {
						r.push(`knees.`);
					} else {
						r.push(`knee.`);
					}
				} else {
					r.push(`quite the distance from ${his}`);
					if (isAmputee(slave)) {
						r.push(`limbless`);
					}
					r.push(`torso.`);
				}
			}
		} else if (slave.balls > 5) {
			if (scrotalFullness < -1) {
				r.push(`${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in agony.`);
			} else if (scrotalFullness === -1) {
				r.push(`They're held against ${his} base by a tight scrotum that permits them little movement.`);
			} else if (scrotalFullness === 0) {
				r.push(`${His} comfortable scrotum allows them to hang massively`);
				if (hasBothLegs(slave)) {
					r.push(`between ${his} legs.`);
				} else {
					r.push(`from ${his}`);
					if (isAmputee(slave)) {
						r.push(`limbless`);
					}
					r.push(`torso.`);
				}
			} else {
				r.push(`Their weight has stretched ${his} scrotum downward, so that they dangle`);
				if (hasAnyLegs(slave)) {
					r.push(`halfway to ${his}`);
					if (hasBothLegs(slave)) {
						r.push(`knees.`);
					} else {
						r.push(`knee.`);
					}
				} else {
					r.push(`some distance from ${his}`);
					if (isAmputee(slave)) {
						r.push(`limbless`);
					}
					r.push(`torso.`);
				}
			}
		} else if (slave.balls > 3) {
			if (scrotalFullness < -1) {
				r.push(`They're too big for ${his} tiny scrotum, which is stretched tight over each ball.`);
			} else if (scrotalFullness === -1) {
				r.push(`They're held against ${his} base by a tight scrotum that permits them little movement.`);
			} else if (scrotalFullness === 0) {
				r.push(`${His} soft scrotum allows them to rest comfortably`);
				if (hasBothLegs(slave)) {
					r.push(`between ${his} legs.`);
				} else {
					r.push(`beneath ${his}`);
					if (isAmputee(slave)) {
						r.push(`limbless`);
					}
					r.push(`torso.`);
				}
			} else {
				r.push(`${He} has a loose, dangling scrotum that allows them to swing`);
				if (hasBothLegs(slave)) {
					r.push(`between ${his} legs.`);
				} else {
					r.push(`from ${his}`);
					if (isAmputee(slave)) {
						r.push(`limbless`);
					}
					r.push(`torso.`);
				}
			}
		} else if (slave.balls > 1) {
			if (scrotalFullness < 0) {
				r.push(`They're held tightly by a very minimal scrotum that turns them into a soft little bump.`);
			} else if (scrotalFullness === 0) {
				r.push(`${His} comfortable little scrotum allows them to rest softly.`);
			} else {
				r.push(`They're almost lost in ${his} big soft scrotum, wrinkled for lack of anything to fill it properly.`);
			}
		} else {
			if (scrotalFullness === 0) {
				r.push(`${He} has a soft little trace of scrotum.`);
			} else {
				r.push(`They've left ${his} scrotum soft and empty.`);
			}
		}
	}

	function massiveTesticles1() {
		if (slave.balls >= 25) {
			if (slave.fuckdoll > 0) {
				r.push(`The difficulties of having a gigantic pair of testicles are greatly reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
			} else {
				if (canWalk(slave)) {
					r.push(`${His} balls are so massive that it is difficult for ${him} to move.`);
					if (slave.muscles > 95) {
						r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them.`);
					} else if (slave.muscles > 30) {
						r.push(`${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can.`);
					} else if (slave.muscles > 5) {
						r.push(`${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can.`);
					} else {
						r.push(`${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much.`);
					}
				} else if (canMove(slave)) {
					r.push(`${His} balls are so massive that it is difficult for ${him} to move at all.`);
					if (slave.muscles > 95) {
						r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, dragging ${his} testicles along behind ${him}.`);
					} else if (slave.muscles > 30) {
						r.push(`${He} can barely manage to lift ${his} testicles, and finds it exhausting to drag them everywhere.`);
					} else if (slave.muscles > 5) {
						r.push(`${He} requires assistance to get ${his} testicles off the ground, and tries avoid moving them whenever ${he} can.`);
					} else {
						r.push(`${He} requires assistance to get ${his} testicles off the ground, and can barely manage to drag them along behind ${him}.`);
					}
				} else if (slave.balls >= 100) {
					r.push(`${His} testicles each dwarf ${him}, making ${him} almost entirely testicle.`);
				} else {
					r.push(`${His} testicles each dwarf ${his} torso, making ${him} almost entirely testicle.`);
				}
				if (slave.balls > 90) {
					if (V.ballsAccessibility === 1) {
						r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with balls`);
					} else {
						if (descType === DescType.MARKET) {
							r.push(`${He}'ll have`);
						} else {
							r.push(`${He} has`);
						}
						r.push(`trouble living in your penthouse, which is not designed for ${girl}s with testicles`);
					}
					r.push(`wider than a standard doorway.`);
				}
			}
		}
	}

	function massiveTesticles2() {
		if (slave.balls > 70) {
			if (slave.fuckdoll > 0) {
				r.push(`The difficulties of having a gigantic pair of testicles are greatly reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
			} else {
				if (canWalk(slave)) {
					r.push(`${His} balls are so massive that it is difficult for ${him} to move.`);
					if (slave.muscles > 95) {
						r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them.`);
					} else if (slave.muscles > 30) {
						r.push(`${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can.`);
					} else if (slave.muscles > 5) {
						r.push(`${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can.`);
					} else {
						r.push(`${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much.`);
					}
				} else if (canMove(slave)) {
					r.push(`${His} balls are so massive that it is difficult for ${him} to move at all.`);
					if (slave.muscles > 95) {
						r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, dragging ${his} testicles along behind ${him}.`);
					} else if (slave.muscles > 30) {
						r.push(`${He} can barely manage to lift ${his} testicles, and finds it exhausting to drag them everywhere.`);
					} else if (slave.muscles > 5) {
						r.push(`${He} requires assistance to get ${his} testicles off the ground, and tries avoid moving them whenever ${he} can.`);
					} else {
						r.push(`${He} requires assistance to get ${his} testicles off the ground, and can barely manage to drag them along behind ${him}.`);
					}
				} else if (slave.balls >= 100) {
					r.push(`Together, ${his} testicles are nearly the same size as ${him}, making ${him} about half testicle.`);
				} else {
					r.push(`Together, ${his} testicles are nearly the same size as ${his} torso, making ${him} about half testicle.`);
				}
				if (slave.balls > 90) {
					if (V.ballsAccessibility === 1) {
						r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with balls`);
					} else {
						if (descType === DescType.MARKET) {
							r.push(`${He}'ll have`);
						} else {
							r.push(`${He} has`);
						}
						r.push(`trouble living in your penthouse, which is not designed for ${girl}s with testicles`);
					}
					r.push(`wider than a standard doorway.`);
				}
			}
		}
	}

	function ballSize() {
		switch (slave.balls) {
			case 0:
				r.push(`smooth ${slave.skin} skin.`);
				break;
			case 1:
				r.push(`a soft little trace of scrotum, since ${his} testicles are so small they have retreated up into ${his} abdomen.`);
				break;
			case 2:
				r.push(`a small pair of`);
				if (V.showDickCMs === 1) {
					r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long`);
				} else {
					r.push(`testicles.`);
				}
				break;
			case 3:
				r.push(`an average pair of`);
				if (V.showDickCMs === 1) {
					r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long`);
				} else {
					r.push(`testicles.`);
				}
				break;
			case 4:
				r.push(`a big pair of`);
				if (V.showDickCMs === 1) {
					r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long`);
				} else {
					r.push(`testicles.`);
				}
				break;
			case 5:
				r.push(`a huge pair of`);
				if (V.showDickCMs === 1) {
					r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long`);
				} else {
					r.push(`testicles.`);
				}
				break;
			case 6:
				r.push(`a gigantic, clearly unnatural pair of`);
				if (V.showDickCMs === 1) {
					r.push(`testicles, about ${ballsToEitherUnit(slave.balls)} long`);
				} else {
					r.push(`testicles.`);
				}
				break;
			default:
				r.push(`a hypertrophied, clearly unnatural pair of testicles,`);
				if (V.showDickCMs === 1) {
					r.push(`about ${ballsToEitherUnit(slave.balls)} long,`);
				}
				r.push(`a true masterpiece of modern growth hormone treatment.`);
				break;
		}
	}

	function penetrativeSkillDesc() {
		if (slave.fuckdoll > 0) {
			if (canPenetrate(slave) && (V.policies.sexualOpenness || slave.toyHole === "dick")) {
				if (V.PC.vagina > 0 || V.PC.anus > 0) {
					r.push(`Riding`);
				} else {
					r.push(`Playing with`);
				}
				r.push(`${his} dick`);
				if (slave.fuckdoll <= 65) { // 55?
					r.push(`mostly results in you doing all the work, assuming ${he} even stays hard.`);
				} else {
					r.push(`offers its user a wide selection of speeds and positions that last and last.`);
				}
			}
		} else if (slave.dick > 0 && canPenetrate(slave)) { // penetrative skill description for clit is in vagina.js
			if (slave.skill.penetrative >= 100) {
				r.push(`${He} is a <span class="skill">penetrative sex master.</span>`);
			} else if (slave.skill.penetrative > 60) {
				r.push(`${He} is an <span class="skill">expert at penetrative sex.</span>`);
			} else if (slave.skill.penetrative > 30) {
				r.push(`${He} is <span class="skill">skilled at penetrating others.</span>`);
			} else if (slave.skill.penetrative > 10) {
				if (canPenetrate(slave) || slave.clit >= 3 || penetrativeSocialUse(slave) >= 40) {
					r.push(`${He} is <span class="skill">capable of basic penetrative sex.</span>`);
				}
			} else {
				if (canPenetrate(slave)) {
					r.push(`${He} is unskilled at using ${his} dick for penetration.`);
				} else if (penetrativeSocialUse(slave) >= 40) {
					r.push(`${He} is clueless at how to have penetrative sex.`);
				}
			}
		} else if ((slave.vagina === -1 && penetrativeSocialUse(slave) >= 40) || slave.dick > 0) {
			if (slave.skill.penetrative >= 100) {
				r.push(`${He} is a <span class="skill">penetrative sex master</span>`);
			} else if (slave.skill.penetrative > 60) {
				r.push(`${He} is an <span class="skill">expert at penetrative sex</span>`);
			} else if (slave.skill.penetrative > 30) {
				r.push(`${He} is <span class="skill">skilled at penetrating others</span>`);
			} else if (slave.skill.penetrative > 10) {
				r.push(`${He} is <span class="skill">capable of basic penetrative sex</span>`);
			} else {
				r.push(`${He} is clueless at how to penetrate others`);
			}
			r.push(`using toys${hasAnyArms(slave) ? ` or ${his} fingers` : ""}.`);
		}
	}
};
