/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.ears = function(slave) {
	const r = [];
	const {
		he, him, his, He, His
	} = getPronouns(slave);
	// ear shape description here
	if (slave.earShape === "none") {
		if (slave.earImplant === 1) {
			if (slave.earT !== "none" && slave.race === "catgirl") {
				r.push(`${He} has smooth fur where a normal human's ears would be, as ${he} instead hears out of ${his} twitchy, sensitive cat ears.`);
			} else if (slave.earT !== "none" && slave.race !== "catgirl") {
				r.push(`${He} has smooth skin where ${his} ears should be as ${his} hearing has been cybernetically rerouted to ${his} secondary ears.`);
			} else {
				r.push(`${He} has nothing but small, perforated metal disks where ${his} ears should be.`);
			}
		} else if (slave.earwear === "none") {
			r.push(`${He} has small unsightly holes on the sides of ${his} head.`); // That can't be sanitary.
		} else {
			r.push(`The sides of ${his} head are smooth where ${his} ears should be, but upon closer inspection it is revealed that`);
			if (slave.earwear === "hearing aids") {
				r.push(`${his} ear canals are fitted with hearing aids capped with a skin-matching sheet to obscure the hole.`);
			} else {
				r.push(`${his} ear canals are filled with plugs with skin-matching caps.`);
			}
		}
	} else if (slave.earShape === "damaged") {
		r.push(`${His} outer ears have been severely damaged.`);
	} else if (slave.earShape === "normal" && slave.earT !== "none") {
		// Ears are expected, so lets only mention them if we have two sets
		r.push(`${He} has perfectly ordinary ears.`);
	} else if (slave.earShape === "robot") {
		r.push(`${He} has high tech cyber-ears that could be mistaken for headphones.`);// not yet implemented
	} else if (slave.earShape === "pointy") {
		r.push(`${His} small, ${either("elfin", "pointed")} ears are quite cute and give ${him} an exotic appearance.`);
	} else if (slave.earShape === "elven") {
		r.push(`${He} has long, thin elven ears that ${either(`tend to droop when ${he} is relaxed or sad`, `tend to waggle up and down when ${he} is excited`, `twitch at the slightest touch`)}.`);
	} else if (slave.earShape === "orcish") {
		r.push(`${He} has small, pointed orcish ears.`);
	} else if (slave.earShape === "cow") {
		r.push(`${His} long, floppy ${App.Utils.translate("cow")} ears are adorably endearing and give ${him} an innocuous appearance. ${His} ears seem to be very sensitive to touch.`); // that ${either(`tend to droop when ${he} is relaxed or sad`, `tend waggle up and down when ${he} is excited`, `twitch at the slightest touch`)}. These don't make sense for the most part.
	} else if (slave.earShape === "sheep") {
		r.push(`${His} cupped ${slave.hColor} colored wooly sheep ears are incredibly soft and adorable. ${His} ears seem to be very sensitive to touch.`);
	} else if (slave.earShape === "gazelle") {
		r.push(`${He} has slender, cupped gazelle ears that ${either(`tend to droop when ${he} is relaxed or sad`, `tend to waggle up and down when ${he} is excited`, `twitch at the slightest touch`)}.`);
	} else if (slave.earShape === "deer") {
		r.push(`${He} has slender, cupped dear ears that ${either(`tend to droop when ${he} is relaxed or sad`, `tend to waggle up and down when ${he} is excited`, `twitch at the slightest touch`)}.`);
	} else if (slave.earShape === "bird") {
		r.push(`${He} has small tufts of ${slave.hColor} colored feathers sticking out from behind ${his} perfectly ordinary ears. The feathers ${either(`tend to flatten out when ${he} is relaxed or sad`, `tend to get ruffled up when ${he} is excited`)}.`);
	} else if (slave.earShape === "dragon") {
		r.push(`${He} has elongated draconic ears that have small ${slave.hColor} scales.`);
	}

	if (slave.earT === "cat") {
		r.push(`On top of ${his} head ${he} has a pair of cute,`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored ${App.Utils.translate("cat")} ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} ${App.Utils.translate("cat")} ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 20) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "leopard") {
		r.push(`On top of ${his} head ${he} has a pair of cute leopard ears. The ears are`);
		if (slave.earTColor === "hairless") {
			r.push(`hairless.`);
		} else {
			r.push(`covered in soft, ${slave.earTColor} colored fur that has`);
			if (slave.earTEffect !== "none") {
				r.push(`${slave.earTEffect} and`);
			}
			r.push(`${slave.patternColor} leopard spots; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 20) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "tiger") {
		r.push(`On top of ${his} head ${he} has a pair of pretty tiger ears; the ears are`);
		if (slave.earTColor === "hairless") {
			r.push(`hairless but`);
		} else {
			r.push(`covered in dense, ${slave.earTColor} colored fur that has`);
			if (slave.earTEffect !== "none") {
				r.push(`${slave.earTEffect} and`);
			}
			r.push(`distinct ${slave.patternColor} vertical stripes. They`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 20) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "jaguar") {
		r.push(`On top of ${his} head ${he} has a pair of adorable jaguar ears; they are`);
		if (slave.earTColor === "hairless") {
			r.push(`hairless`);
		} else {
			r.push(`covered in ${slave.earTColor} colored fur that`);
			if (slave.earTEffect !== "none") {
				r.push(`has ${slave.earTEffect} and`);
			}
			r.push(`is packed with ${slave.patternColor} rosettes that have dots in their center. They`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 20) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "lion") {
		r.push(`On top of ${his} head ${he} has a pair of charming lion ears; they are`);
		if (slave.earTColor === "hairless") {
			r.push(`hairless.`);
		} else {
			r.push(`covered in ${slave.earTColor} colored fur.`);
			if (slave.earTEffect !== "none") {
				r.push(`that has ${slave.earTEffect}.`);
			}
			r.push(`The ears have tufts of ${slave.hColor} hair sprouting from their base and`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 20) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "dog") {
		r.push(`On top of ${his} head ${he} has a pair of cute,`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored ${App.Utils.translate("dog")} ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} ${App.Utils.translate("dog")} ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 50) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "wolf") {
		r.push(`On top of ${his} head ${he} has a pair of lovable, small and triangular`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored wolf ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} wolf ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 50) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "jackal") {
		r.push(`On top of ${his} head ${he} has a pair of long and pointy,`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored jackal ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} jackal ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 50) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "fox") {
		r.push(`On top of ${his} head ${he} has a pair of elegant,`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored ${App.Utils.translate("fox")} ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} ${App.Utils.translate("fox")} ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 50) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "raccoon") {
		r.push(`On top of ${his} head ${he} has a pair of adorable and round,`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored ${App.Utils.translate("raccoon")} ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} ${App.Utils.translate("raccoon")} ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 50) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "rabbit") {
		r.push(`On top of ${his} head ${he} has a pair of long and fluffy,`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored ${App.Utils.translate("rabbit")} ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} ${App.Utils.translate("rabbit")} ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 50) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "squirrel") {
		r.push(`On top of ${his} head ${he} has a pair of small and pointy,`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored ${App.Utils.translate("squirrel")} ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} ${App.Utils.translate("squirrel")} ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 50) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "horse") {
		r.push(`On top of ${his} head ${he} has a pair of long,`);
		if (slave.earTColor !== "hairless" && slave.earTEffect !== "none") {
			r.push(`${slave.earTColor} colored ${App.Utils.translate("horse")} ears that have ${slave.earTEffect} on them; they`);
		} else {
			r.push(`${slave.earTColor} ${App.Utils.translate("horse")} ears; they`);
		}
		if (slave.earImplant === 1) {
			r.push(`perk up at`);
			if (slave.devotion > 50) {
				r.push(`the sound of your voice and`);
			} else {
				r.push(`sudden noises and`);
			}
		}
		r.push(`${either(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}.`);
	} else if (slave.earT === "normal") {
		r.push(`On top of ${his} head ${he} has`);
		if (slave.earShape !== "none") {
			r.push(`a second set`);
		} else {
			r.push(`a pair`);
		}
		r.push(`of non-functioning ears grafted to the top of ${his} head.`);
	}

	if (slave.hears < 0) {
		if (slave.hears === -1) {
			r.push(`${His} hearing is noticeably impaired,`);
		} else if (slave.hears < -1) {
			r.push(`${He} is completely deaf,`);
		}
		if (slave.hears < -1 && slave.earShape === "none") {
			r.push(`which is fitting due to ${his} lack of ears.`);
		} else {
			r.push(`but this isn't obvious just by looking at ${his} ears.`);
		}
	}
	return r.join(" ");
};
