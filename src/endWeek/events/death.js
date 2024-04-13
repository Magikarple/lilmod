/**
 *
 * @param {App.Entity.SlaveState} slave
 * @param {"oldAge"|"overdosed"|"lowHealth"} deathType
 */
globalThis.planDeath = function(slave, deathType) {
	V.slaveDeath.set(slave.ID, deathType);
};

App.Events.SEDeath = class SEDeath extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	/** Custom casting: interpret V.slaveDeath as the actor collection for this event (do not use this.actors). */
	castActors() {
		return V.slaveDeath.size > 0;
	}

	execute(node) {
		const artRenderer = V.seeImages && V.seeReportImages ? new App.Art.SlaveArtBatch(V.slaveDeath.keys(), 0, 0) : null;
		if (artRenderer) {
			node.append(artRenderer.writePreamble());
		}

		for (const [id, deathType] of V.slaveDeath) {
			const deceased = getSlave(id);
			if (deceased) {
				App.UI.DOM.appendNewElement("p", node, death(deceased, deathType));
				node.append(sectionBreak());
				removeSlave(deceased);
			}
		}

		V.slaveDeath = new Map();

		function sectionBreak() {
			const hr = document.createElement("hr");
			hr.style.margin = "0";
			return hr;
		}

		/**
		 *
		 * @param {App.Entity.SlaveState} slave
		 * @param {"oldAge"|"overdosed"|"lowHealth"} deathType
		 */
		function death(slave, deathType) {
			const el = new DocumentFragment();
			const r = [];
			const {
				He, His,
				he, his, him
			} = getPronouns(slave);
			if (artRenderer) {
				App.UI.DOM.appendNewElement("div", el, artRenderer.render(slave), ["imageRef", "tinyImg"]);
			}

			switch (deathType) {
				case "oldAge": {
					if (slave.assignment === Job.ARCADE) {
						r.push(`You are notified by ${V.arcadeName} staff that one of the cabinets has broken down and will need to be replaced. It would seem <span class="pink bold">${slave.slaveName},</span> the fucktoy encased in it, died`);
						if (slave.physicalAge >= 70) {
							r.push(`naturally of old age despite`);
						} else {
							r.push(`suddenly, unrelated to`);
						}
						r.push(`${his} living conditions. ${He} was a good unit; logs show ${he} was taking dick up until the very end.`);
					} else if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1) {
						r.push(`You are notified by ${V.dairyName} staff that one of the occupied milkers has ceased producing. Upon inspection, it would seem <span class="pink bold">${slave.slaveName},</span> the cow restrained in it, died`);
						if (slave.physicalAge >= 70) {
							r.push(`naturally of old age despite`);
						} else {
							r.push(`suddenly, unrelated to`);
						}
						r.push(`${his} living conditions. ${He} was a good cow; ${he} gave milk up until ${his} death.`);
					} else if (slave.fuckdoll > 0) {
						r.push(`One of your Fuckdolls' monitoring systems alerts you that the slave contained within has died. It would seem <span class="pink bold">${slave.slaveName}</span> has died`);
						if (slave.physicalAge >= 70) {
							r.push(`naturally of old age despite`);
						} else {
							r.push(`suddenly, unrelated to`);
						}
						r.push(`${his} living conditions. Thankfully the suit notifies its owner of such things; especially with the rumors of earlier models and necrophilia you hear occasionally.`);
					} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true)) {
						r.push(`After achieving your fourth climax in a row, you slap <span class="pink bold">${slave.slaveName}</span> on the ass for a job well done. To your chagrin, ${he}, almost comically, flops over onto ${his} side without changing position. ${He} passed sometime during coitus and you aren't sure when. ${slave.slaveName} died at the age of ${slave.actualAge};`);
						if (slave.actualAge < 10) {
							r.push(`${he} lived a tragically short life.`);
						} else if (slave.actualAge < 20) {
							r.push(`${he} died far too young.`);
						} else if (slave.actualAge < 30) {
							r.push(`${he} died in what would be a sex slave's prime.`);
						} else if (slave.actualAge < 50) {
							r.push(`${he} died in ${his} prime.`);
						} else if (slave.actualAge < 65) {
							r.push(`${he} lived a fair life, good or bad.`);
						} else if (slave.actualAge < 90) {
							r.push(`${he} lived a long life and experienced much during it.`);
						} else {
							r.push(`${he} lived a very long life that few get to see.`);
						}
					} else if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
						r.push(`After taking a break from beating <span class="pink bold">${slave.slaveName}</span> to freshen up, you return to find ${him} dead. Age claimed ${his} life before you could; you can't help but feel a little cheated.`);
					} else {
						r.push(`<span class="pink bold">${slave.slaveName}</span> failed to report in for a routine inspection, something that rarely occurs under your watch. It doesn't take long to track down the wayward slave.`);
						const deathSeed = random(1, 100);
						if (deathSeed > 75) {
							r.push(`${He} is found dead in ${his} bed, having died sometime during the previous night.`);
						} else if (deathSeed > 50) {
							r.push(`${He} is found dead in a stairwell, having had a heart attack while trying to climb it.`);
						} else if (deathSeed > 25) {
							r.push(`${He} is found dead in the showers, having slipped sometime earlier.`);
						} else {
							if (App.Utils.hasNonassignmentSex(slave)) {
								r.push(`${He} is found dead in the bed of another slave, having died during intercourse. ${His} lover is not taking it well.`);
							} else {
								r.push(`${He} is found dead in the cafeteria, having died during breakfast; ${he} ruined the day for a number of your slaves.`);
							}
						}
						r.push(`${slave.slaveName} died at the age of ${slave.actualAge};`);
						if (slave.actualAge < 10) {
							r.push(`${he} lived a tragically short life.`);
						} else if (slave.actualAge < 20) {
							r.push(`${he} died far too young.`);
						} else if (slave.actualAge < 30) {
							r.push(`${he} died in what would be a sex slave's prime.`);
						} else if (slave.actualAge < 50) {
							r.push(`${he} died in ${his} prime.`);
						} else if (slave.actualAge < 65) {
							r.push(`${he} lived a fair life, good or bad.`);
						} else if (slave.actualAge < 90) {
							r.push(`${he} lived a long life and experienced much during it.`);
						} else {
							r.push(`${he} lived a very long life that few get to see.`);
						}
					}
					break;
				}

				case "overdosed": {
					if (slave.assignment === Job.ARCADE) {
						r.push(`You are notified by ${V.arcadeName} staff that one of the cabinets has broken down and will need to be replaced. It would seem <span class="pink bold">${slave.slaveName},</span> the fucktoy encased in it, died of an aphrodisiac overdose from the constant aphrodisiac injections. ${He} was a good unit; logs show ${he} was taking dick up until the very end.`);
					} else if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1) {
						r.push(`You are notified by ${V.dairyName} staff that one of the occupied milkers has ceased producing. Upon inspection, it would seem <span class="pink bold">${slave.slaveName},</span> the cow restrained in it, died of an aphrodisiac overdose. How ${he} managed to get them is unknown, but ${he} was a good cow; ${he} gave milk up until ${his} death.`);
					} else if (slave.fuckdoll > 0) {
						r.push(`One of your Fuckdolls' monitoring systems alerts you that the slave contained within has died. It would seem <span class="pink bold">${slave.slaveName}</span> has died of an aphrodisiac overdose. Thankfully the suit notifies its owner of such things; especially with the rumors of earlier models and necrophilia you hear occasionally. It does little to deal with the resulting mess of the orgasm ${he} died during, however.`);
					} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true)) {
						r.push(`After three sequential orgasms, you aren't quite satisfied yet, but <span class="pink bold">${slave.slaveName}</span> is nearing ${his} limit. Fortunately, a quick dose of aphrodisiacs corrects that and ${he}'s back in for another round. Once you really get going and begin to near your end, ${he} spasms`);
						if (canPenetrate(V.PC) || V.PC.clit >= 3) {
							r.push(`and clamps down`);
						} else {
							r.push(`and bucks`);
						}
						r.push(`hard against you, sending you careening over the edge into orgasmic bliss. Only once you manage to catch your breath and move to comment on ${his} impressive climax do you discover that it was ${his} last. ${slave.slaveName} died of an overdose at the age of ${slave.actualAge};`);
						if (slave.actualAge < 10) {
							r.push(`${he} lived a tragically short life.`);
						} else if (slave.actualAge < 20) {
							r.push(`${he} died far too young.`);
						} else if (slave.actualAge < 30) {
							r.push(`${he} died in what would be a sex slave's prime.`);
						} else if (slave.actualAge < 50) {
							r.push(`${he} died in ${his} prime.`);
						} else if (slave.actualAge < 65) {
							r.push(`${he} lived a fair life, good or bad.`);
						} else if (slave.actualAge < 90) {
							r.push(`${he} lived a long life and experienced much during it.`);
						} else {
							r.push(`${he} lived a very long life that few get to see.`);
						}
					} else if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
						r.push(`While taking a break from beating <span class="pink bold">${slave.slaveName}</span> to enjoy a little raping, ${he} seizes up in a particularly strong orgasm due to all the aphrodisiacs you've been pumping into ${him}. As you finish up, you can't help but notice that ${he} as gone completely limp. A brief inspection reveals you've fucked the life out of ${him}.`);
						SimpleSexAct.Player(slave);
					} else {
						r.push(`<span class="pink bold">${slave.slaveName}</span> failed to report in for a routine inspection, something that rarely occurs under your watch. It doesn't take long to track down the wayward slave.`);
						r.push(`${He} is found dead in ${his} bed, having died sometime earlier. Judging by the mess and the expression on ${his} face, ${he} died of a heart attack during a particularly intense orgasm bought about by the massive amount of aphrodisiacs in ${his} system. ${slave.slaveName} died at the age of ${slave.actualAge};`);
						if (slave.actualAge < 10) {
							r.push(`${he} lived a tragically short life.`);
						} else if (slave.actualAge < 20) {
							r.push(`${he} died far too young.`);
						} else if (slave.actualAge < 30) {
							r.push(`${he} died in what would be a sex slave's prime.`);
						} else if (slave.actualAge < 50) {
							r.push(`${he} died in ${his} prime.`);
						} else if (slave.actualAge < 65) {
							r.push(`${he} lived a fair life, good or bad.`);
						} else if (slave.actualAge < 90) {
							r.push(`${he} lived a long life and experienced much during it.`);
						} else {
							r.push(`${he} lived a very long life that few get to see.`);
						}
					}
					break;
				}

				case "lowHealth": {
					if (slave.assignment === Job.ARCADE) {
						r.push(`You are notified by ${V.arcadeName} staff that one of the cabinets has broken down and will need to be replaced. It would seem <span class="pink bold">${slave.slaveName},</span> the fucktoy encased in it, died to poor health caused by ${his} living conditions. ${He} was a good unit; logs show ${he} was taking dick up until the very end.`);
					} else if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1) {
						r.push(`You are notified by ${V.dairyName} staff that one of the occupied milkers has ceased producing. Upon inspection, it would seem <span class="pink bold">${slave.slaveName},</span> the cow restrained in it, died to poor health caused by ${his} living conditions. ${He} was a good cow; ${he} gave milk up until ${his} death.`);
					} else if (slave.fuckdoll > 0) {
						r.push(`One of your Fuckdolls' monitoring systems alerts you that the slave contained within has died. It would seem <span class="pink bold">${slave.slaveName}</span> has died of general poor health. Thankfully the suit notifies its owner of such things; especially with the rumors of earlier models and necrophilia you hear occasionally. Clean up is easy enough, however.`);
					} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true)) {
						r.push(`As you are enjoying <span class="pink bold">${slave.slaveName}</span>'s body, you can't help but notice ${he} is participating less and less in your copulation. You carry on to completion, only to discover you have successfully mated with a dead body! ${He} was in poor health lately, and odds are high that ${his} body just couldn't handle the strain of near-constant intercourse. Given the urges to keep going, the intrusive thoughts about how ${his} body is still warm, and that perhaps this is your fault, maybe this should be the wake-up call for you getting your libido back under control. ${slave.slaveName} died at the age of ${slave.actualAge};`);
						if (slave.actualAge < 10) {
							r.push(`${he} lived a tragically short life.`);
						} else if (slave.actualAge < 20) {
							r.push(`${he} died far too young.`);
						} else if (slave.actualAge < 30) {
							r.push(`${he} died in what would be a sex slave's prime.`);
						} else if (slave.actualAge < 50) {
							r.push(`${he} died in ${his} prime.`);
						} else if (slave.actualAge < 65) {
							r.push(`${he} lived a fair life, good or bad.`);
						} else if (slave.actualAge < 90) {
							r.push(`${he} lived a long life and experienced much during it.`);
						} else {
							r.push(`${he} lived a very long life that few get to see.`);
						}
						if (FutureSocieties.isActive('FSPaternalist') && slave.actualAge < 75) {
							r.push(`Allowing a slave to perish under your care <span class="red">severely damages</span> your image as a caring slaveowner and <span class="red">calls into question</span> your paternalistic resolve. It's probably best that they don't find out that you finished in ${him} after the fact.`);
							FutureSocieties.Change("Paternalist", -10);
						}
					} else if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
						r.push(`As you begin to work <span class="pink bold">${slave.slaveName}</span> over, you find ${he} is quickly becomes unresponsive to your strikes, so you do the only logical thing; hit ${him} harder. When ${he} still ignores your efforts, you decide to give ${him} a cursory inspection. Turns out you managed to beat the life out of ${him}.`);
						if (FutureSocieties.isActive('FSPaternalist')) {
							r.push(`Literally bludgeoning a slave to death for your amusement <span class="red">completely ruins</span> your image as a caring slaveowner and <span class="red">calls into question</span> if you even have paternalistic values.`);
							FutureSocieties.Change("Paternalist", -40);
						}
					} else {
						r.push(`<span class="pink bold">${slave.slaveName}</span> failed to report in for a routine inspection, something that rarely occurs under your watch. It doesn't take long to track down the wayward slave.`);
						r.push(`${He} is found dead in ${his} bed, having died sometime during the night. ${He} has been in very poor health lately, so you knew this was a possibility. ${slave.slaveName} died at the age of ${slave.actualAge};`);
						if (slave.actualAge < 10) {
							r.push(`${he} lived a tragically short life.`);
						} else if (slave.actualAge < 20) {
							r.push(`${he} died far too young.`);
						} else if (slave.actualAge < 30) {
							r.push(`${he} died in what would be a sex slave's prime.`);
						} else if (slave.actualAge < 50) {
							r.push(`${he} died in ${his} prime.`);
						} else if (slave.actualAge < 65) {
							r.push(`${he} lived a fair life, good or bad.`);
						} else if (slave.actualAge < 90) {
							r.push(`${he} lived a long life and experienced much during it.`);
						} else {
							r.push(`${he} lived a very long life that few get to see.`);
						}
						if (FutureSocieties.isActive('FSPaternalist') && slave.actualAge < 75) {
							r.push(`Allowing a slave to perish under your care <span class="red">severely damages</span> your image as a caring slaveowner and <span class="red">calls into question</span> your paternalistic resolve.`);
							FutureSocieties.Change("Paternalist", -10);
						}
					}
					break;
				}
			}
			App.Events.addNode(el, r);

			return el;
		}
	}
};
