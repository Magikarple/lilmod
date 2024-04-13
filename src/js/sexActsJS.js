globalThis.VCheck = (function() {
	"use strict";
	let he;
	let him;
	let his;
	let He;
	let His;

	return {
		Anal: AnalVCheck,
		Vaginal: VaginalVCheck,
		Both: BothVCheck,
		Simple: SimpleVCheck,
		Partner: PartnerVCheck
	};

	function setScopedPronouns(slave) {
		({
			he, him, his, He, His
		} = getPronouns(slave));
	}

	/** call as VCheck.Anal()
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [times=1] is how many times to increment the anal counts.
	 * @returns {string}
	 */
	function AnalVCheck(slave, times = 1) {
		let r = '';
		setScopedPronouns(slave);

		if (canDoAnal(slave)) {
			if (slave.anus === 0) {
				r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin ass.</span> `;
				if (slave.devotion > 50 || slave.career === "a slave since birth") {
					r += `Since it's ${his} first time, you gently ease yourself into ${his} butthole and gradually increase the intensity of your thrusts. Before long ${he}'s moaning loudly as you continue working away at ${his} butthole. `;
					if (slave.tankBaby === 2) {
						r += `${He} thinks of losing ${his} anal virginity to ${his} ${getWrittenTitle(slave)} a <span class="hotpink">necessity.</span> ${He} expects ${his} asshole to be seeing a lot more attention now.`;
					} else {
						r += `${He} thinks of losing ${his} anal virginity to you as a <span class="hotpink">connection</span> with ${his} beloved ${getWrittenTitle(slave)}. `;
						if ((slave.fetishKnown && slave.fetish === "buttslut") || (slave.energy > 95) || (slave.attrXX >= 85 && V.PC.dick === 0)) {
							r += `${He} can't wait to be fucked in the ass by you again.`;
						} else {
							r += `${He} looks forward to having ${his} asshole fucked by you again.`;
						}
					}
					slave.devotion += 4;
				} else if (slave.devotion > 20) {
					r += `Since it's ${his} first time, you gently ease yourself into ${his} butthole and gradually increase the intensity of your thrusts. ${His} moans become louder and louder as you continue working away at ${his} butthole. ${He} accepts the pain and humiliation of anal sex as part of ${his} sexual servitude, though ${he} hopes that ${his} next time will be less painful.`;
				} else if (slave.devotion >= -20) {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="gold">fears</span> ${his} next anal sex, remembering the pain of losing ${his} anal virginity. ${He} dreads having ${his} ass violated by you again.`;
					slave.trust -= 5;
				} else {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for violating ${his} virgin butt. ${He} dreads having ${his} ass fucked by you again.`;
					slave.trust -= 5;
					slave.devotion -= 5;
				}
				slave.anus = 1;
			}
			if (canPenetrate(V.PC)) {
				tryKnockMeUp(slave, 10, 1, V.PC);
			}
			seX(slave, "anal", V.PC, "penetrative", times);
		}
		return r;
	}

	/** call as VCheck.Vaginal()
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [times=1] is how many times to increment the vaginal counts.
	 * @returns {string}
	 */
	function VaginalVCheck(slave, times = 1) {
		let r = '';
		setScopedPronouns(slave);

		if (canDoVaginal(slave)) {
			if (slave.vagina === 0) {
				r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin pussy.</span> `;
				if (slave.devotion > 50 || slave.career === "a slave since birth") {
					r += `You ease yourself into ${his} pussy, since it's ${his} first time, then gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} moans loudly. `;
					if (slave.tankBaby === 2) {
						r += `${He} thinks of losing ${his} virginity to ${his} ${getWrittenTitle(slave)} a <span class="hotpink">necessity to be happy.</span> ${He} expects ${his} pussy to be seeing a lot more attention in the future.`;
					} else {
						r += `<span class="hotpink">${He} enjoys losing ${his} cherry to you,</span> and `;
						if ((slave.fetishKnown && slave.fetish === "pregnancy") || (slave.energy > 95) || (canPenetrate(V.PC) && ((slave.attrXY >= 85 && V.PC.dick > 0) || (slave.attrXX >= 85 && V.PC.clit >= 3)))) {
							r += `can't wait to have ${his} pussy fucked by you again.`;
						} else {
							r += `looks forward to having ${his} pussy fucked by you again.`;
						}
					}
					slave.devotion += 4;
				} else if (slave.devotion > 20) {
					r += `You ease yourself into ${his} pussy, since it's ${his} first time, then gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} accepts losing ${his} virginity to ${his} owner and ${he} looks forward to having ${his} pussy fucked by you again.`;
				} else if (slave.devotion >= -20) {
					r += `You force yourself into ${his} pussy. ${He} sobs and cries with disgust while you continue thrusting into ${his} fuck hole. ${He} <span class="mediumorchid">hates</span> losing ${his} virginity this way and <span class="gold">fears</span> the next time you'll conquer ${him}. ${He} dreads getting violated by you again.`;
					slave.trust -= 5;
					slave.devotion -= 5;
				} else {
					r += `You force yourself into ${his} pussy. ${He} sobs and cries with disgust while you continue working ${his} fuck hole. ${He} tries to struggle, but you only pound harder. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for robbing ${his} of ${his} virginity. ${He} dreads getting fucked by you again.`;
					slave.trust -= 10;
					slave.devotion -= 15;
				}
				slave.vagina = 1;
			}
			if (canPenetrate(V.PC)) {
				tryKnockMeUp(slave, 10, 0, V.PC);
			}
			seX(slave, "vaginal", V.PC, "penetrative", times);
		}
		return r;
	}

	/** call as VCheck.Both()
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [analTimes=1] how many times to increment the anal counts, if there is no vagina available.
	 * @param {number} [bothTimes=1] how many times to increment both holes counts (usually it is half of analTimes).
	 * @returns {string}
	 */
	function BothVCheck(slave, analTimes = 1, bothTimes = 1) {
		let r = '';
		setScopedPronouns(slave);

		if (canDoVaginal(slave)) {
			if (slave.vagina === 0) {
				if (canDoAnal(slave) && slave.anus === 0) {
					r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin holes.</span> `;
					if (slave.devotion > 50 || slave.career === "a slave since birth") {
						r += `As it's ${his} first time, you ease yourself into ${his} pussy before gradually working your way into ${his} ass and alternate between the two holes while ${he} moans. `;
						if (slave.tankBaby === 2) {
							r += `${He} believes you taking ${his} virgin holes <span class="hotpink">will keep ${him} from suffering.</span> ${He} expects you to require ${his} holes as tribute again soon.`;
						} else {
							r += `<span class="hotpink">${He}'s so devoted ${he} enjoys being fucked in both holes for the first time.</span> ${He} looks forward to having ${his} holes fucked by you again.`;
						}
						slave.devotion += 4;
					} else if (slave.devotion <= 20) {
						r += `You force yourself into ${his} pussy before working your way into ${his} ass. ${He} sobs and cries with disgust while you alternate between the two holes. ${He} <span class="mediumorchid">hates</span> losing ${his} virginity and anal virginity in one <span class="gold">brutal</span> incident. ${He} dreads having ${his} holes violated by you again.`;
						slave.trust -= 5;
						slave.devotion -= 5;
					} else {
						r += `As it's ${his} first time, you ease yourself into ${his} pussy before gradually working your way into ${his} ass and alternate between the two holes while ${he} moans. ${He} accepts being fucked in both holes for the first time. ${He} looks forward to having ${his} holes fucked by you again.`;
					}
					slave.anus = 1;
				} else {
					r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin pussy.</span> `;
					if (slave.devotion > 50 || slave.career === "a slave since birth") {
						r += `As it's ${his} first time, you ease yourself into ${his} pussy and gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} moans loudly. `;
						if (slave.tankBaby === 2) {
							r += `${He} thinks of losing ${his} virginity to ${his} ${getWrittenTitle(slave)} a <span class="hotpink">necessity to be happy.</span> ${He} expects ${his} pussy to be seeing a lot more attention in the future.`;
						} else {
							r += `<span class="hotpink">${He} enjoys losing ${his} cherry to you.</span> ${He} looks forward to having ${his} pussy fucked by you again.`;
						}
						slave.devotion += 4;
					} else if (slave.devotion <= 20) {
						r += `You force yourself into ${his} pussy. ${He} sobs and cries with disgust while you continue working ${his} fuck hole. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for taking ${his} virginity. ${He} dreads having ${his} pussy violated by you again.`;
						slave.trust -= 5;
						slave.devotion -= 5;
					} else {
						r += `As it's ${his} first time, you ease yourself into ${his} pussy before gradually increasing the intensity of your thrusts while ${he} softly moans. ${He} accepts losing ${his} virginity to ${his} owner and ${he} looks forward to having ${his} pussy fucked by you again.`;
					}
				}
				slave.vagina = 1;
			} else if (canDoAnal(slave) && slave.anus === 0) {
				r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin ass.</span> `;
				if (slave.devotion > 50 || slave.career === "a slave since birth") {
					r += `As it's ${his} first time, you ease yourself into ${his} butthole and gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} moans loudly. `;
					if (slave.tankBaby === 2) {
						r += `${He} thinks of losing ${his} anal virginity to ${his} ${getWrittenTitle(slave)} a <span class="hotpink">necessity.</span> ${He} expects ${his} asshole to be seeing a lot more attention now.`;
					} else {
						r += `${He} thinks of losing ${his} anal virginity to you as a <span class="hotpink">connection</span> with ${his} beloved ${getWrittenTitle(slave)}. ${He} looks forward to having ${his} asshole fucked by you again.`;
					}
					slave.devotion += 4;
				} else if (slave.devotion > 20) {
					r += `As it's ${his} first time, you ease yourself into ${his} butthole and gradually increase the intensity of your thrusts. ${He} accepts the pain and humiliation of anal sex as part of ${his} sexual servitude, though ${he} hopes that ${his} next time will be less painful.`;
				} else if (slave.devotion >= -20) {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="gold">fears</span> ${his} next anal sex, remembering the pain of losing ${his} anal virginity. ${He} dreads having ${his} ass violated by you again.`;
					slave.trust -= 5;
				} else {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for violating ${his} virgin butt. ${He} dreads having ${his} ass fucked by you again.`;
					slave.trust -= 5;
					slave.devotion -= 5;
				}
				slave.anus = 1;
			}
			if (canDoAnal(slave)) {
				seX(slave, "vaginal", V.PC, "penetrative", bothTimes);
				seX(slave, "anal", V.PC, "penetrative", bothTimes);
				if (canPenetrate(V.PC)) {
					tryKnockMeUp(slave, 10, 2, V.PC);
				}
			} else {
				seX(slave, "vaginal", V.PC, "penetrative", bothTimes);
				if (canPenetrate(V.PC)) {
					tryKnockMeUp(slave, 10, 0, V.PC);
				}
			}
		} else if (canDoAnal(slave)) {
			if (slave.anus === 0) {
				r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin ass.</span> `;
				if (slave.devotion > 50 || slave.career === "a slave since birth") {
					r += `As it's ${his} first time, you ease yourself into ${his} butthole and gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} moans loudly. `;
					if (slave.tankBaby === 2) {
						r += `${He} thinks of losing ${his} anal virginity to ${his} ${getWrittenTitle(slave)} a <span class="hotpink">necessity.</span> ${He} expects ${his} asshole to be seeing a lot more attention now.`;
					} else {
						r += `${He} thinks of losing ${his} anal virginity to you as a <span class="hotpink">connection</span> with ${his} beloved ${getWrittenTitle(slave)}. ${He} looks forward to having ${his} asshole fucked by you again.`;
					}
					slave.devotion += 4;
				} else if (slave.devotion > 20) {
					r += `As it's ${his} first time, you ease yourself into ${his} butthole and gradually increase the intensity of your thrusts. ${He} accepts the pain and humiliation of anal sex as part of ${his} sexual servitude, though ${he} hopes that ${his} next time will be less painful.`;
				} else if (slave.devotion >= -20) {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="gold">fears</span> ${his} next anal sex, remembering the pain of losing ${his} anal virginity. ${He} dreads having ${his} ass violated by you again.`;
					slave.trust -= 5;
				} else {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for violating ${his} virgin butt. ${He} dreads having ${his} ass fucked by you again.`;
					slave.trust -= 5;
					slave.devotion -= 5;
				}
				slave.anus = 1;
			}
			seX(slave, "anal", V.PC, "penetrative", analTimes);
			if (canPenetrate(V.PC)) {
				tryKnockMeUp(slave, 10, 1, V.PC);
			}
		}
		return r;
	}

	/** call as VCheck.Simple()
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [times=1] how many times to increment either the Vaginal or the Anal counts, if there is no Vagina available.
	 * @returns {string}
	 */
	function SimpleVCheck(slave, times = 1) {
		if (canDoVaginal(slave)) {
			return VaginalVCheck(slave, times);
		} else if (canDoAnal(slave)) {
			return AnalVCheck(slave, times);
		}
		return "";
	}

	/** call as VCheck.Partner
	 * Checks for a valid Vagina/Accessory, though in most cases the calling code will do so anyway
	 * @param {App.Entity.SlaveState} partner
	 * @param {number} [analTimes = 1] how many times to increment the Anal counts, if there is no Vagina available.
	 * @param {number} [bothTimes = 1] how many times to increment both holes counts (usually it is half of Anal).
	 */
	function PartnerVCheck(partner, analTimes = 1, bothTimes = 1) {
		let r = '';
		setScopedPronouns(partner);

		if (canDoVaginal(partner)) {
			if (partner.vagina === 0) {
				if (canDoAnal(partner) && partner.anus === 0) {
					r += `Since it's ${partner.slaveName}'s first time, you take your time and gently ease yourself into ${his} pussy before gradually working your way into ${his} butthole, alternating between ${his} holes. <span class="lime">This breaks in ${partner.slaveName}'s virgin holes.</span> `;
					partner.vagina = 1;
					partner.anus = 1;
				} else {
					r += `Since it's ${partner.slaveName}'s first time, you take your time and gently ease yourself into ${his} pussy before gradually increasing the intensity of your thrusts. <span class="lime">This breaks in ${partner.slaveName}'s virgin pussy.</span> `;
					partner.vagina = 1;
				}
			} else if (canDoAnal(partner) && partner.anus === 0) {
				r += `Since it's ${partner.slaveName}'s first time, you take your time and gently ease yourself into ${his} butthole before gradually increasing the intensity of your thrusts into ${his} ass. <span class="lime">This breaks in ${partner.slaveName}'s virgin ass.</span> `;
				partner.anus = 1;
			}

			if (canDoAnal(partner)) {
				actX(partner, "vaginal", bothTimes);
				actX(partner, "anal", bothTimes);
				if (canPenetrate(V.PC)) {
					r += tryKnockMeUp(partner, 10, 2, V.PC);
				}
			} else {
				actX(partner, "vaginal", bothTimes);
				if (canPenetrate(V.PC)) {
					r += tryKnockMeUp(partner, 10, 0, V.PC);
				}
			}
		} else if (canDoAnal(partner)) {
			if (partner.anus === 0) {
				r += `Since it's ${partner.slaveName}'s first time, you take your time and gently ease yourself into ${his} butthole before gradually increasing the intensity of your thrusts into ${his} ass. <span class="lime">This breaks in ${partner.slaveName}'s virgin ass.</span> `;
				partner.anus = 1;
			}
			actX(partner, "anal", analTimes);
			if (canPenetrate(V.PC)) {
				r += tryKnockMeUp(partner, 10, 1, V.PC);
			}
		}
		return r;
	}
})();

globalThis.SimpleSexAct = (function() {
	"use strict";

	return {
		Player: SimpleSexActPlayer,
		Slave: SimpleSlaveFucking,
		Slaves: SimpleSlaveSlaveFucking,
	};

	/**
	 * fuckCount is how many times to increment either the Vaginal, Anal, or Oral counts, depending on availability of slave.
	 * If count is left undefined it will assume it to be 1.
	 * Intended to be a simple "I want to fuck x and not have to code a bunch of logic for it".
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [fuckCount=1]
	 * @returns {string}
	 */
	function SimpleSexActPlayer(slave, fuckCount = 1) {
		let fuckTarget = 0;
		let playerSex;
		let r = "";
		const sPenetrates = canPenetrate(slave);
		const pPenetrates = canPenetrate(V.PC);
		/** @type {Array<FC.SlaveActs>} */
		const sexArray = ["penetrative"];
		if (pPenetrates) {
			sexArray.push("penetrative", "penetrative");
		}
		if (V.PC.vagina > -1) {
			sexArray.push("vaginal");
		} else if (V.PC.dick === 0) {
			sexArray.push("anal");
		}


		for (let i = 0; i < fuckCount; i++) {
			playerSex = sexArray.random();
			fuckTarget = random(1, 100);
			if (V.policies.sexualOpenness === 1 || slave.toyHole === "dick") {
				if (slave.nipples === "fuckable" && pPenetrates && fuckTarget > 90) {
					seX(slave, "mammary", V.PC, "penetrative");
				} else if (sPenetrates && V.PC.vagina > 0 && fuckTarget > 66) {
					seX(V.PC, "vaginal", slave, "penetrative");
					tryKnockMeUp(V.PC, 10, 0, slave);
				} else if (canDoVaginal(slave) && (slave.vagina > 0 || (slave.vagina >= 0 && playerSex === "vaginal")) && fuckTarget > 33) {
					seX(slave, "vaginal", V.PC, playerSex);
					if (playerSex === "penetrative" || playerSex === "vaginal") {
						tryKnockMeUp(slave, 10, 0, V.PC);
					}
					if (playerSex === "vaginal") {
						tryKnockMeUp(V.PC, 10, 0, slave);
					}
				} else if (canDoAnal(slave) && slave.anus > 0 && fuckTarget > 15) {
					seX(slave, "anal", V.PC, "penetrative");
					if (canPenetrate(V.PC)) {
						tryKnockMeUp(slave, 10, 1, V.PC);
					}
				} else if (sPenetrates && V.PC.anus > 0 && fuckTarget > 5) {
					seX(V.PC, "anal", slave, "penetrative");
					tryKnockMeUp(V.PC, 10, 1, slave);
				} else {
					seX(slave, "oral", V.PC, playerSex);
				}
			} else {
				if (slave.nipples === "fuckable" && pPenetrates && fuckTarget > 80) {
					seX(slave, "mammary", V.PC, "penetrative");
				} else if (canDoVaginal(slave) && (slave.vagina > 0 || (slave.vagina >= 0 && playerSex === "vaginal")) && fuckTarget > 33) {
					seX(slave, "vaginal", V.PC, playerSex);
					if (playerSex === "penetrative") {
						tryKnockMeUp(slave, 10, 0, V.PC);
					} else if (playerSex === "vaginal") {
						tryKnockMeUp(slave, 10, 0, V.PC);
						tryKnockMeUp(V.PC, 10, 0, slave);
					}
				} else if (canDoAnal(slave) && slave.anus > 0 && fuckTarget > 10) {
					seX(slave, "anal", V.PC, "penetrative");
					if (canPenetrate(V.PC)) {
						tryKnockMeUp(slave, 10, 1, V.PC);
					}
				} else {
					seX(slave, "oral", V.PC, playerSex);
				}
			}
		}
		return r;
	}

	/**
	 * count is how many times to increment either the Vaginal, Anal, or Oral counts, depending on availability of slave.
	 * If count is left undefined it will assume it to be 1.
	 * Intended to be a simple "x got fucked y times and I don't want to keep coding it".
	 * Pregnancy chance is handled in saLongTermEffects.tw.
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} fuckCount
	 */
	function SimpleSlaveFucking(slave, fuckCount = 1) {
		let fuckTarget = 0;

		for (let i = 0; i < fuckCount; i++) {
			fuckTarget = random(1, 100);
			if (slave.nipples === "fuckable" && fuckTarget > 80) {
				actX(slave, "mammary");
			} else if (canDoVaginal(slave) && slave.vagina > 0 && fuckTarget > 33) {
				actX(slave, "vaginal");
			} else if (canDoAnal(slave) && slave.anus > 0 && fuckTarget > 10) {
				actX(slave, "anal");
			} else {
				actX(slave, "oral");
			}
		}
	}

	/**
	 * count is how many times to increment either the Vaginal, Anal, or Oral counts, depending on availability of slave.
	 * If count is left undefined it will assume it to be 1.
	 * Intended to be a simple "x got fucked y times by z and I don't want to keep coding it".
	 * @param {App.Entity.SlaveState} subSlave
	 * @param {App.Entity.SlaveState} domSlave
	 * @param {number} fuckCount
	 * @returns {string}
	 */
	function SimpleSlaveSlaveFucking(subSlave, domSlave, fuckCount = 1) {
		let fuckTarget = 0;
		let r = "";

		for (let j = 0; j < fuckCount; j++) {
			// there is a reason randomization happens inside cycle - to spread fuck around, otherwise cycle isn't even needed
			/** @type {FC.SlaveActs} */
			let sex;
			/** @type {FC.SlaveActs} */
			let sex2 = "penetrative";
			fuckTarget = random(1, 100);
			if (subSlave.nipples === "fuckable" && canPenetrate(domSlave) && fuckTarget > 80) {
				sex = "mammary";
			} else if (canDoVaginal(subSlave) && canDoVaginal(domSlave) && subSlave.dick === 0 && domSlave.dick === 0 && fuckTarget > 80) {
				sex = "vaginal";
				sex2 = "vaginal";
				tryKnockMeUp(subSlave, 3, 0, domSlave);
				tryKnockMeUp(domSlave, 3, 0, subSlave);
			} else if (canDoVaginal(subSlave) && subSlave.vagina > 0 && canPenetrate(domSlave) && fuckTarget > 33) {
				sex = "vaginal";
				tryKnockMeUp(subSlave, 3, 0, domSlave);
			} else if (canDoAnal(subSlave) && subSlave.anus > 0 && canPenetrate(domSlave) && fuckTarget > 10) {
				sex = "anal";
				tryKnockMeUp(subSlave, 3, 1, domSlave);
			} else {
				sex = "oral";
			}
			seX(subSlave, sex, domSlave, sex2);
		}
		return r;
	}
})();

/**
 * Increments a slave's personal counter and the global counter for a particular action.
 * @param {App.Entity.SlaveState | App.Entity.PlayerState} slave
 * @param {FC.SlaveActs} act oral, anal, etc
 * @param {number} count
 */
globalThis.actX = function(slave, act, count = 1) {
	switch (act) {
		case "PCChildrenFathered":
			break;
		case "PCKnockedUp":
			break;
		case "anal":
			V.analTotal += count;
			break;
		case "births":
			V.birthsTotal += count;
			break;
		case "birthsTotal":
			break;
		case "cum":
			V.cumTotal += count;
			break;
		case "laborCount":
			break;
		case "mammary":
			V.mammaryTotal += count;
			break;
		case "milk":
			V.milkTotal += count;
			break;
		case "oral":
			V.oralTotal += count;
			break;
		case "penetrative":
			V.penetrativeTotal += count;
			break;
		case "pitKills":
			V.pitKillsTotal += count;
			break;
		case "miscarriages":
			V.miscarriagesTotal += count;
			break;
		case "publicUse":
			break;
		case "slavesFathered":
			break;
		case "slavesKnockedUp":
			break;
		case "vaginal":
			V.vaginalTotal += count;
			break;
		case "abortions":
			V.abortionsTotal += count;
			break;
		case "bestiality":
			V.bestialityTotal += count;
			break;
		default:
			// Act was likely entered incorrectly.
			return;
	}
	if (act === "birth") { // Annoyingly at the moment, V.birthsTotal means all the births in your arc. Within the slave counter though, .births is all births in your arc and .birthsTotal includes births outside your arch.
		slave.counter.birthsTotal += count;
	}
	slave.counter[act] += count;
};

/**
 * Sex is between two. This is a handy wrapper for actX that emphasizes that.
 * @param {FC.HumanState} slave1 slave or PC
 * @param {FC.SlaveActs} act1 oral, anal, etc
 * @param {FC.HumanState | "animal" | "public" | "slaves" | "assistant"} slave2 slave, PC, "public", or "animal"
 * @param {FC.SlaveActs} [act2="penetrative"] oral, anal, etc
 * @param {number} [count=1]
 */
globalThis.seX = function(slave1, act1, slave2, act2 = "penetrative", count = 1) {
	// Slave 1 does their normal thing
	actX(slave1, act1, count);

	// Slave 2 does their normal thing. If "Slave 2" is the public and "Slave 1" is not the PC, then increment the public counter for slave 1 instead.
	if (slave2 === "public" && slave1.ID !== -1) {
		actX(slave1, "publicUse", count);
		addPartner(slave1, -2);
	} else if (slave2 === "animal") {
		actX(slave1, "bestiality", count);
		addPartner(slave1, -8);
	} else if (typeof slave2 === 'string') {
		// someday we may track "slaves" and "assistant"
	} else {
		actX(slave2, act2, count);
		addPartner(slave1, slave2);
	}

	/**
	 * @param {FC.HumanState} slave
	 * @param {FC.HumanState|FC.AnimalState|number} partner The slave's partner, or the ID of the slave's partner.
	 *
	 * | ***ID*** | **Type**              |
	 * |---------:|:----------------------|
	 * | *-1*     | PC                    |
	 * | *-2*     | Citizen               |
	 * | *-3*     | PC's former master    |
	 * | *-4*     | Fellow arcology owner |
	 * | *-6*     | Societal Elite        |
	 * | *-8*     | Animal                |
	 * | *-9*     | Futanari Sister       |
	 * | *-10*    | Rapist                |
	 */
	function addPartner(slave, partner) {
	/** @returns {FC.HumanState} */
		function getPartnerState() {
			if (typeof partner === "number") {
				if (partner === -1) {
					return V.PC;
				} else if (partner > 0) {
					return getSlave(partner);
				}
			} else if ("partners" in partner) {
				return partner;
			}
			return null;
		}

		if (typeof partner === "number") {
			slave.partners.add(partner);
		} else if ("ID" in partner) {
			slave.partners.add(partner.ID);
		} else {
			throw new TypeError(`Partner must be an object or ID, not "${partner}"`);
		}

		const partnerState = getPartnerState();
		if (partnerState) {
			partnerState.partners.add(slave.ID);
		}
	}
};
