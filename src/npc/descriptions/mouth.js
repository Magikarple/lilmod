/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.mouth = function(slave) {
	const r = [];
	const {
		he, him, his, He, His, woman, girl
	} = getPronouns(slave);

	r.push(`${He} has`);
	if (slave.lips <= 10) {
		r.push(`thin, unattractive lips.`);
	} else if (slave.lips <= 20) {
		r.push(`normal lips.`);
	} else if (slave.lips <= 40) {
		r.push(`full, attractive lips.`);
	} else if (slave.lips <= 70) {
		r.push(`plump, beestung lips.`);
	} else if (slave.lips <= 95) {
		r.push(`huge, obviously augmented lips.`);
	} else {
		r.push(`a facepussy: ${his} lips are so huge that they're always a bit parted in the middle, forming a moist, inviting`);
		if (V.PC.dick !== 0) {
			r.push(`hole for cock.`);
		} else {
			r.push(`hole.`);
		}
	}

	if (V.showImplantEffects === 1) {
		if (FutureSocieties.isActive('FSTransformationFetishist')) {
			if (slave.lipsImplant > 0) {
				r.push(`They are about ${Math.floor((slave.lipsImplant / slave.lips) * 100)}% implant.`);
			}
			if (V.arcologies[0].FSTransformationFetishist > 20) {
				if (slave.lips > 70) {
					if (slave.lipsImplant / slave.lips < .50) {
						r.push(`${His} lips are huge and <span class="red">disgustingly natural</span> for their size.`);
					} else {
						r.push(`${His} lips are huge and <span class="green">obviously implants,</span> as they should be.`);
					}
				}
			}
		}
	}

	if (slave.fuckdoll > 0) {
		r.push(`${His} mouth is held open by the suit's oral insert.`);
	} else if ((slave.assignment === Job.DAIRY) && (V.dairyRestraintsSetting > 1)) {
		if (V.dairyFeedersSetting > 1) {
			r.push(`${His} milking machine has a phallus a long way down ${his} throat to rehydrate ${him}.`);
		} else {
			r.push(`${He}'s got ${his} mouth wrapped around a phallus provided by ${his} milking machine, and is sucking it off for hydration.`);
		}
	} else {
		if (canTalk(slave)) {
			if (slave.lips > 70) {
				const {title} = getEnunciation(slave);
				const writtenTitle = getWrittenTitle(slave);
				r.push(`${He} can barely enunciate past ${his} dick-sucking lips;`);
				if (title === writtenTitle) {
					if (App.Data.misc.badNames.includes(capFirstChar(writtenTitle))) {
						r.push(`unfortunately`);
					} else {
						r.push(`fortunately`);
					}
					r.push(`'${title}' is easy to pronounce.`);
				} else {
					r.push(`'${writtenTitle}' comes out as '${lispReplace(writtenTitle)}.'`);
				}
			}
		}
		if (slave.teeth !== "normal") {
			if (slave.teeth === "crooked") {
				r.push(`${His} teeth are <span class="yellow">crooked,</span> detracting from ${his} beauty whenever ${he} opens ${his} mouth.`);
			} else if (slave.teeth === "straightening braces") {
				r.push(`${He} has braces,`);
				if (slave.visualAge > 35) {
					r.push(`an amusing sight on such a mature ${woman}.`);
				} else if ((slave.visualAge > 14) && (slave.visualAge < 18)) {
					r.push(`a cute look on such a young ${girl}.`);
				} else {
					r.push(`and occasionally looks preoccupied with discomfort as they straighten ${his} teeth.`);
				}
			} else if (slave.teeth === "cosmetic braces") {
				r.push(`${He}'s wearing braces despite ${his} straight teeth,`);
				if (slave.visualAge > 35) {
					r.push(`an amusing sight on such a mature ${woman}.`);
				} else if ((slave.visualAge > 14) && (slave.visualAge < 18)) {
					r.push(`a cute look on such a young ${girl}.`);
				} else {
					r.push(`just for appearances.`);
				}
			} else if (slave.teeth === "gapped") {
				r.push(`${He} has a prominent gap between ${his} front`);
				if (slave.faceShape === "cute") {
					r.push(`teeth that suits ${his} cute face surprisingly well.`);
				} else {
					r.push(`teeth.`);
				}
				if (canTalk(slave)) {
					r.push(`It also leaves ${him} with a slight lisp.`);
				}
			} else if (slave.teeth === "removable") {
				r.push(`${His} teeth have been removed and replaced with high-quality dentures. It's difficult to tell anything's unusual until you take them out for gummy oral sex.`);
			} else if (slave.teeth === "pointy") {
				r.push(`${His} teeth have been replaced with realistic implants that mimic the dentition of a carnivore. ${His} smiles are frightening, and ${he} can bare them to become truly terrifying.`);
			} else if (slave.teeth === "fangs") {
				if (slave.race === "catgirl") {
					r.push(`${His} upper canine teeth are sharp feline fangs that distinctly mark ${him} as a bioengineered cat${girl} every time ${he} opens ${his} mouth. ${His} smiles are frightening, and ${he} can bare them to become truly terrifying.`);
				} else {
					r.push(`${His} upper canine teeth have been replaced with realistic implants that mimic fangs. ${His} smiles are frightening, and ${he} can bare them to become truly terrifying.`);
				}
			} else if (slave.teeth === "fang") {
				r.push(`One of ${his} upper canine teeth has been replaced with realistic implant shaped like a fang.`);
				if (slave.faceShape === "cute") {
					r.push(`It gives ${his} cute face an added`);
					if (slave.lips <= 50) {
						r.push(`charm, especially when it rests over ${his} lower lip.`);
					} else {
						r.push(`charm.`);
					}
				} else {
					if (slave.lips <= 50) {
						r.push(`It stands out when it rests over ${his} lower lip.`);
					} else {
						r.push(`It doesn't fit well in ${his} mouth and frequently prods ${his} fat lower lip.`);
					}
				}
			} else if (slave.teeth === "baby") {
				r.push(`${He} still has ${his} baby teeth.`);
			} else if (slave.teeth === "mixed") {
				r.push(`${He} is in the process of replacing ${his} baby teeth.`);
			}
		}
		if (V.policies.gumjobFetishism === 1 && slave.teeth !== "removable") {
			r.push(`${His} teeth have not yet been removed, <span class="red">disappointing</span> those that find them unwilling to pop out.`);
		}
	}
	if (slave.tastes === -1) {
		r.push(`${He} has no sense of taste, but this isn't immediately obvious just by looking at ${his} tongue.`);
	}

	r.push(App.Desc.mods(slave, "lips"));
	r.push(App.Desc.mods(slave, "tongue"));

	if (slave.fuckdoll > 0) {
		if (V.PC.dick !== 0) {
			r.push(`Sticking a dick`);
		} else {
			r.push(`Sliding a dildo`);
		}
		r.push(`into ${his}`);
		if (slave.lips > 95) {
			r.push(`facepussy`);
		} else {
			r.push(`mouth insert`);
		}
		if (slave.fuckdoll <= 45) {
			r.push(`mostly results in gagging.`);
		} else {
			r.push(`offers its user a selection of delightful face hole massage options.`);
		}
	} else {
		r.push(`${He} is`);
		if (slave.skill.oral >= 100) {
			r.push(`an <span class="skill">oral sex master.</span>`);
		} else if (slave.skill.oral > 60) {
			r.push(`an <span class="skill">expert at oral.</span>`);
		} else if (slave.skill.oral > 30) {
			r.push(`<span class="skill">orally skilled.</span>`);
		} else if (slave.skill.oral > 10) {
			r.push(`<span class="skill">capable of basic oral sex.</span>`);
		} else {
			r.push(`unskilled at oral sex.`);
		}
	}
	return r.join(" ");
};
