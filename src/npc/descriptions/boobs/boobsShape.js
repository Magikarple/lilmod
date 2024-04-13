/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.boobsShape = function(slave) {
	const r = [];
	const {
		he, him, his, He, His
	} = getPronouns(slave);
	if (V.showImplantEffects === 1) {
		if (slave.fuckdoll > 0) {
			if (slave.boobs > 250) {
				r.push(`The natural shape of its breasts is completely irrelevant, since the suit forces each of them`);
				if (slave.boobs > 5000) {
					r.push(`into a monstrous orb shape.`);
				} else if (slave.boobs > 1000) {
					r.push(`into an orb shape.`);
				} else {
					r.push(`up and out like a severe push-up bra.`);
				}
			}
		} else {
			let showBoobShape = false;
			// Only used in implant related text.
			let implantType = slave.boobsImplantType === "string" ? "engorged string"
				: slave.boobsImplantType === "normal" ? "breast"
					: "fillable breast";
			if (slave.boobShape === "spherical") {
				if (slave.boobs > 12000) {
					r.push(`They anchor ${him} when ${he}'s face-down, pin ${him} when ${he}'s on ${his} back, and pull what little flesh is left taut when ${he} is upright. ${His} ${slave.boobsImplant} cc ${implantType} implants are extremely obvious; with little natural breast tissue to support them, they are barely recognizable as a part ${his} body.`);
				} else if (slave.boobs > 6000) {
					r.push(`They're huge orbs of stretched flesh, resting heavily against ${his} stomach and each other, and extremely obvious; with little natural breast tissue to support ${his} ${slave.boobsImplant} cc ${implantType} implants, they look like a pair of overinflated balloons attached to ${his} chest.`);
				} else if (slave.boobs > 4000) {
					r.push(`They're firm orbs of stretched flesh, resting heavily against ${his} chest and each other, and extremely obvious; with little natural breast tissue to support ${his} ${slave.boobsImplant} cc ${implantType} implants, they look like a pair of overinflated balloons attached to ${his} chest.`);
				} else if (slave.boobs > 2000) {
					r.push(`They're big, round, hard and extremely obvious; with little natural breast tissue to support ${his} ${slave.boobsImplant} cc ${implantType} implants, they look like a pair of balloons attached to ${his} chest.`);
				} else if (slave.boobs > 1000) {
					r.push(`They're big and round and hang heavily from ${his} chest. ${His} ${slave.boobsImplant} cc ${implantType} implants are extremely obvious; with little natural breast tissue to support them, they look like a pair of softballs stuck to ${him}.`);
				} else if (slave.boobs > 500) {
					r.push(`They're unnaturally round and, with little natural breast tissue to support ${his} ${slave.boobsImplant} cc ${implantType} implants, appear attached to ${his} chest instead of part of it.`);
				} else {
					r.push(`They're nicely rounded and rest naturally.`); // This shouldn't be reachable
				}
			} else if (slave.boobsImplant > 0 && slave.boobsImplant <= 400) {
				if (slave.boobsImplant / slave.boobs < 0.25) {
					r.push(`${He} has ${slave.boobsImplant}cc breast implants. They don't change much, since they are buried in as much boob as they are.`);
					if (slave.boobs > 1000) {
						showBoobShape = true;
					}
				} else if (slave.boobs > 800) {
					r.push(`${He} has ${slave.boobsImplant}cc breast implants. ${His} tits look fairly natural, but defy gravity more than could be expected given their size.`);
				} else if (slave.boobs > 300) {
					r.push(`${He} has ${slave.boobsImplant}cc breast implants. ${His} tits look fairly natural, but are perkier than could be expected given their size.`);
				} else {
					r.push(`${He} has ${slave.boobsImplant}cc breast implants. ${His} tits look fairly natural, mostly because they're so small.`);
				}
			} else if (slave.boobsImplant > 0 && slave.boobsImplant <= 600) {
				if (slave.boobsImplant / slave.boobs < 0.25) {
					r.push(`${He} has ${slave.boobsImplant}cc breast implants. They don't change much, since they are buried in as much boob as they are.`);
					if (slave.boobs > 1000) {
						showBoobShape = true;
					}
				} else if (slave.boobs > 800) {
					r.push(`${He} has ${slave.boobsImplant} cc breast implants. ${His} implants are well done, but ${his} breasts are so perfect and gravity-defying that they are clearly artificial.`);
				} else {
					r.push(`${He} has ${slave.boobsImplant} cc breast implants. ${His} implants are well done, but ${his} breasts are so rounded and high that they are clearly artificial.`);
				}
			} else if (slave.boobsImplant > 600) {
				r.push(`${He} has ${slave.boobsImplant} cc`);
				if (slave.boobsImplant / slave.boobs >= 0.75) {
					r.push(`${implantType} implants. They are extremely obvious; with little natural breast tissue to support them, they look like a pair of balloons attached to ${his} chest.`);
				} else if (slave.boobsImplant / slave.boobs >= 0.50) {
					r.push(`${implantType} implants, which is obvious from the roundness of ${his} fake tits.`);
				} else if (slave.boobsImplant / slave.boobs >= 0.25) {
					r.push(`${implantType} implants, which is obvious from the unnatural size of ${his} boobs.`);
				} else {
					r.push(`${implantType} implants, but they make up so little of ${his} boobs that they aren't noticeable unless touched.`);
				}
			} else {
				showBoobShape = true;
			}
			if (showBoobShape) {
				switch (slave.boobShape) {
					case "perky":
						if (slave.boobs > 12000) {
							r.push(`When ${he}'s on ${his} back, some of their natural perkiness can still be seen in the way they tend to obscure ${his} head and shoulders.`);
						} else if (slave.boobs > 5000) {
							r.push(`Their natural perkiness has helped them resist their enormous size, making them look like a normal pair of merely gigantic tits that have grown to be bigger than ${his} head without changing shape.`);
						} else if (slave.boobs > 2500) {
							r.push(`They're orbs of soft flesh, resting heavily against ${his} chest and each other. They remain naturally perky, defying gravity.`);
						} else if (slave.boobs > 1000) {
							r.push(`They're somewhat perky despite their large size, with ${his} nipples pointing slightly upward.`);
						} else if (slave.boobs > 500) {
							r.push(`They're full and perky, and ${his} nipples point upward.`);
						} else if (slave.boobs > 250) {
							r.push(`They're perky, and ${his} nipples point upward.`);
						} else {
							r.push(`They're very minimal.`);
						}
						break;
					case "downward-facing":
						if (slave.boobs > 12000) {
							r.push(`Their naturally downward-facing shape makes them a convenient cushion when ${he}'s face-down, naturally placing ${him} in a kneeling position.`);
						} else if (slave.boobs > 5000) {
							r.push(`They're huge pillows of soft flesh, distorted by gravity and where they rest against ${his} stomach and each other. Naturally downward-facing, they are so big that ${his} nipples point directly down.`);
						} else if (slave.boobs > 2500) {
							r.push(`They're orbs of soft flesh, resting heavily against ${his} stomach and each other. Since they are naturally downward-facing, most of their mass rests low.`);
						} else if (slave.boobs > 1000) {
							r.push(`They're not attractively shaped, with ${his} nipples pointing downward more strongly than they should for ${his} breast size.`);
						} else if (slave.boobs > 500) {
							r.push(`They're not attractively shaped, with ${his} nipples pointing down.`);
						} else if (slave.boobs > 250) {
							r.push(`They're not attractively shaped, with ${his} nipples pointing down despite ${his} small breasts.`);
						} else {
							r.push(`They're very minimal.`);
						}
						break;
					case "torpedo-shaped":
						if (slave.boobs > 12000) {
							r.push(`They are naturally torpedo-shaped, which can be seen in the way they stick out more than a`);
							if (V.showInches === 2) {
								r.push(`yard`);
							} else {
								r.push(`meter`);
							}
							r.push(`in front of ${him} when ${he} sits up.`);
						} else if (slave.boobs > 5000) {
							r.push(`They're huge promontories of soft flesh. Their natural torpedo shape remains to a certain extent, ${his} swaying breasts reaching an incredibly long way out from ${his} chest.`);
						} else if (slave.boobs > 2500) {
							r.push(`They're orbs of soft flesh, resting heavily against ${his} chest and each other. Their natural torpedo shape is distorted by their weight.`);
						} else if (slave.boobs > 1000) {
							r.push(`They're strongly torpedo-shaped despite their large size, projecting a long way from ${his} chest and swaying lewdly when ${he}'s naked.`);
						} else if (slave.boobs > 500) {
							r.push(`They're strongly torpedo-shaped, projecting a long way from ${his} chest and swaying cutely when ${he}'s naked.`);
						} else if (slave.boobs > 250) {
							r.push(`They're strongly torpedo-shaped despite their small size, projecting some way from ${his} chest.`);
						} else {
							r.push(`They're very minimal.`);
						}
						break;
					case "wide-set":
						if (slave.boobs > 12000) {
							r.push(`They are naturally wide-set, which can be seen in the way they stick out more than a`);
							if (V.showInches === 2) {
								r.push(`yard`);
							} else {
								r.push(`meter`);
							}
							r.push(`to either side of ${him} when ${he}'s face-down.`);
						} else if (slave.boobs > 5000) {
							r.push(`They're huge pillows of soft flesh whose natural wide-set shape somehow keeps them from touching despite their mass.`);
						} else if (slave.boobs > 2500) {
							r.push(`They're orbs of soft flesh whose natural wide-set shape obscures ${his}`);
							if (hasAnyArms(slave)) {
								r.push(`upper`);
								if (hasBothArms(slave)) {
									r.push(`arms.`);
								} else {
									r.push(`arm.`);
								}
							} else {
								r.push(`arm stumps.`);
							}
							r.push(`They rest without natural cleavage despite their size.`);
						} else if (slave.boobs > 1000) {
							r.push(`They're wide-set, with their weight pointing each nipple away from ${his} sternum.`);
						} else if (slave.boobs > 500) {
							r.push(`They're wide-set, with each nipple pointing away from ${his} sternum.`);
						} else if (slave.boobs > 250) {
							r.push(`They're wide-set, with each nipple pointing somewhat sideways.`);
						} else {
							r.push(`They're very minimal.`);
						}
						break;
					case "saggy":
						if (slave.boobs > 12000) {
							r.push(`Their naturally saggy shape makes them a convenient cushion when ${he}'s face-down, naturally placing ${him} in a kneeling position.`);
						} else if (slave.boobs > 5000) {
							r.push(`They're huge pillows of soft flesh that sag past ${his} navel. ${His} nipples are placed on their bottoms, pointed at the ground by the heavy mass of breastflesh above them.`);
						} else if (slave.boobs > 2500) {
							r.push(`They're orbs of soft flesh that sag almost to ${his} navel. ${His} nipples are placed on their bottoms, pointed at the ground by the weight of breast above them.`);
						} else if (slave.boobs > 1000) {
							r.push(`They're heavy and saggy, pointing ${his} nipples at the ground.`);
						} else if (slave.boobs > 500) {
							r.push(`They're not attractively shaped, with ${his} nipples pointing down.`);
						} else if (slave.boobs > 250) {
							r.push(`They're not attractively shaped, with ${his} nipples pointing down despite ${his} small breasts.`);
						} else {
							r.push(`They're very minimal.`);
						}
						break;
					default:
						if (slave.boobs > 12000) {
							r.push(`They anchor ${him} when ${he}'s face-down, and pin ${him} when ${he}'s on ${his} back.`);
						} else if (slave.boobs > 5000) {
							r.push(`They're huge pillows of soft flesh, distorted by gravity and where they rest against ${his} stomach and each other.`);
						} else if (slave.boobs > 2500) {
							r.push(`They're orbs of soft flesh, resting heavily against ${his} chest and each other.`);
						} else if (slave.boobs > 1000) {
							r.push(`They're soft and round, resting heavily against ${his} chest and each other.`);
						} else if (slave.boobs > 500) {
							r.push(`They're nice and soft and rest naturally against ${his} chest.`);
						} else if (slave.boobs > 250) {
							r.push(`They're nicely rounded and rest naturally.`);
						} else {
							r.push(`They're very minimal.`);
						}
				}
			}
			if (slave.boobsImplant > 0) {
				if (FutureSocieties.isActive('FSTransformationFetishist')) {
					r.push(`They are about ${Math.floor((slave.boobsImplant / slave.boobs) * 100)}% implant.`);
				}
			}
		}

		if (V.arcologies[0].FSTransformationFetishist > 20) {
			const boobThreshold = FutureSocieties.isActive('FSSlimnessEnthusiast') ? 400 : 600;
			if (slave.boobs >= boobThreshold) {
				if (slave.boobs >= 10000) {
					if (slave.boobsImplant / slave.boobs < .75) {
						r.push(`${His} breasts are <span class="red">disgustingly natural</span> for their size.`);
					} else {
						r.push(`${His} breasts are <span class="green">obviously implants,</span> as they should be.`);
					}
				} else if (slave.boobs >= 2000) {
					if (slave.boobsImplant / slave.boobs < .50) {
						r.push(`${His} breasts are <span class="red">disgustingly natural</span> for their size.`);
					} else {
						r.push(`${His} breasts are <span class="green">obviously implants,</span> as they should be.`);
					}
				} else if (slave.boobs >= 1000) {
					if (slave.boobsImplant / slave.boobs < .25) {
						r.push(`${His} breasts are <span class="red">disgustingly natural</span> for their size.`);
					} else {
						r.push(`${His} breasts are <span class="green">obviously implants,</span> as they should be.`);
					}
				} else {
					if (slave.boobsImplant / slave.boobs < .10) {
						r.push(`${His} breasts are <span class="red">disgustingly natural</span> for their size.`);
					} else {
						r.push(`${His} breasts are <span class="green">obviously implants,</span> as they should be.`);
					}
				}
			}
		}
	}
	return r.join(" ");
};
