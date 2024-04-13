/**
 * Details week-to-week changes in children in the Nursery
 * @returns {FC.EndWeek.FacilityReport}
 */
App.Facilities.Nursery.childrenReport = function childrenReport() {
	const frag = new DocumentFragment();

	const Matron = S.Matron;
	const nannies = App.Utils.sortedEmployees(App.Entity.facilities.nursery);
	const NL = App.Entity.facilities.nursery.employeesIDs().size;
	const CL = V.cribs.length;

	const medianNannyIntelligence = NL ? findMedianNannyIntelligence() : null;
	const medianNannyIntelligenceImplant = NL ? findMedianNannyIntelligenceImplant() : null;

	for (const child of V.cribs) {
		const childDiv = App.UI.DOM.appendNewElement("div", frag, '', ["child-section"]);

		childDiv.append(childGrowTime(child));

		if (child.actualAge >= 3) {
			if (Matron) {
				if (Matron.fetish !== Fetish.NONE) {
					childDiv.append(matronFetishEffects(child));
				}

				childDiv.append(matronEducationEffects(child));
			}

			if (NL > 0) {
				const randomNanny = NL > 1 ? jsRandom(0, nannies.length - 1) : 0;
				const nanny = nannies[randomNanny];

				if (nanny.fetish !== Fetish.NONE) {
					childDiv.append(nannyFetishEffects(child, nanny));
				}

				childDiv.append(nannyEducationEffects(child));
			}

			if (multipleChildrenOverTargetAge(V.cribs.findIndex(c => c.ID === child.ID))) {
				childDiv.append(childFriendshipRivalries(child));
			}

			// TODO: rework these entirely
			if (Matron || nannies) {
				childDiv.appendChild(weightRulesEffects(child));
				childDiv.appendChild(musclesRulesEffects(child));
			}
		} else {
			// TODO:
		}
	}

	function matronFetishEffects(child) {
		const chance = jsRandom(1, 100);

		if ((chance > 90 && child.fetish === Fetish.NONE) || chance > 95) {
			child.fetish = Matron.fetish;

			return `${child.slaveName} has taken a few cues from ${Matron.slaveName}, and ${newChildFetish(child.fetish)}. `;
		}
	}

	function matronEducationEffects(child) {
		// TODO: expand this
		const {he, him, his} = getPronouns(Matron);

		const theChildren = CL > 1 ? `the children` : `${child.slaveName}`;

		if (Matron.intelligence + Matron.intelligenceImplant > 65) {
			child.intelligenceImplant += 3;

			return `${Matron.slaveName} is so intelligent and well-educated that ${he} is able to teach ${theChildren} very effectively, and so ${CL > 1 ? `they gradually grow` : `${child.slaveName} gradually grows`} smarter. `;
		} else if (Matron.intelligenceImplant > 20) {
			child.intelligenceImplant += 2;

			return `${Matron.slaveName}'s education makes up for the fact that ${he} isn't the brightest and allows ${him} to teach ${theChildren} quite effectively, and so ${CL > 1 ? `they grow` : `${child.slaveName} grows`} a bit smarter. `;
		} else if (Matron.intelligence > 50) {
			child.intelligenceImplant += 2;

			return `Though ${Matron.slaveName} has had little to no formal education, ${his} natural brilliance allows ${him} to teach ${theChildren} quite effectively, and so ${CL > 1 ? `they grow` : `${child.slaveName} grows`} a bit smarter. `;
		} else {
			const totalSpan = App.UI.DOM.makeElement("span", `${Matron.slaveName} isn't the brightest and not well educated, `);
			const damageSpan = App.UI.DOM.makeElement("span", `damaging the amount of real education ${theChildren} receive. `, ["red"]);

			child.intelligenceImplant--;

			totalSpan.appendChild(damageSpan);

			return totalSpan;
		}
	}

	function nannyFetishEffects(child, slave) {
		const {he} = getPronouns(child);
		const chance = jsRandom(1, 100);

		if (chance > 85) {
			if (child.fetish === Fetish.NONE) {
				child.fetish = slave.fetish;

				return `${slave.slaveName} has left quite an impression on ${child.slaveName}, and ${he} ${newChildFetish(child.fetish)}. `;
			} else {
				if (chance > 90) {
					child.fetish = slave.fetish;

					return `${child.slaveName} seems to have taken to ${slave.slaveName}'s example, and ${newChildFetish(child.fetish)}. `;
				}
			}
		}
	}

	function nannyEducationEffects(child) {
		// TODO: redo this entire section
		// TODO: expand this
		const firstNanny = nannies[0];
		const theNanniesAre = NL > 1 ? `The nannies are mostly` : `${firstNanny.slaveName} is`;
		const theChildren = CL > 1 ? `the children` : child.slaveName;

		if (medianNannyIntelligence + medianNannyIntelligenceImplant > 65) {
			child.intelligenceImplant += 3;

			return `${theNanniesAre} very intelligent and well educated and are able to teach ${theChildren} very effectively. `;
		} else if (medianNannyIntelligence > 50) {
			child.intelligenceImplant += 2;

			return `${theNanniesAre} very intelligent and able to teach ${theChildren} quite effectively. `;
		} else if (medianNannyIntelligenceImplant > 25) {
			child.intelligenceImplant += 2;

			return `${theNanniesAre} very well educated and able to teach ${theChildren} quite effectively. `;
		} else if (medianNannyIntelligenceImplant > 15) {
			child.intelligenceImplant++;

			return `${theNanniesAre} well educated and able to teach ${theChildren} fairly effectively. `;
		}
	}

	function weightRulesEffects(child) {
		// TODO: redo this entire section
		// TODO: double check these classes, make sure they make sense
		const span = document.createElement("span");
		const {he, He, His} = getPronouns(child);

		if (V.nurseryWeight) {
			const firstNanny = NL > 0 ? nannies[0] : null;
			const caretaker = Matron ? Matron.slaveName : NL > 1 ? `A nanny` : firstNanny.slaveName;

			if (V.nurseryWeightSetting === 1) {
				const weightSpan = App.UI.DOM.makeElement("span", 'rapid weight gain.', ["health", "dec"]);

				if (child.weight < 200) {
					child.weight += 5;
				}

				span.append(`${He} is being fed an excessive amount of food, causing`, weightSpan);
			} else if (V.nurseryWeightSetting === 2) {
				const weightSpan = App.UI.DOM.makeElement("span", `decreases the amount of food ${he} eats. `, ["improvement"]);

				if (child.weight > 10) {
					child.weight--;

					span.append(`${caretaker} notices ${he} is overweight and `, weightSpan);
				} else if (child.weight <= -10) {
					const weightSpan = App.UI.DOM.makeElement("span", `increases the amount of food ${he} eats. `, ["improvement"]);

					child.weight++;

					span.append(`${caretaker} notices ${he} is underweight and `, weightSpan);
				} else {
					const weightSpan = App.UI.DOM.makeElement("span", 'currently a healthy weight;', ["change", "positive"]);

					span.append(`${He} is `, weightSpan, ` efforts will be made to maintain it. `);
				}
			} else if (V.nurseryWeightSetting === 0) {
				if (child.weight > -20) {
					const weightSpan = App.UI.DOM.makeElement("span", 'quickly sheds its gained weight.', ["health", "dec"]);

					child.weight -= 40;

					span.append(`${His} developing body `, weightSpan);
				}
			}
		} else {
			if (child.weight > -20) {
				const weightSpan = App.UI.DOM.makeElement("span", 'quickly sheds its gained weight. ', ["health", "dec"]);

				child.weight -= 40;

				span.append(`${His} developing body `, weightSpan);
			}
		}

		return span;
	}

	function musclesRulesEffects(child) {
		const div = document.createElement("div");

		// TODO: rewrite these
		// FIXME: this entire section needs a rewrite - numbers and text don't line up at all
		if (V.nurseryMuscles) {
			const firstNanny = NL > 0 ? nannies[0] : null;
			const caretaker = Matron ? Matron.slaveName : NL > 1 ? `A nanny` : firstNanny.slaveName;
			const {His, He, he} = getPronouns(child);

			const muscleSpan = App.UI.DOM.makeElement("div", 'rapid muscle development.', ["improvement"]);

			div.append(`${He} is being worked out as often as possible, resulting in `, muscleSpan);

			if (V.nurseryMusclesSetting === 2) {
				const muscleSpan = App.UI.DOM.makeElement("span", `decreases the amount of exercise ${he} receives. `, ["improvement"]);

				if (child.muscles > 100) {
					child.muscles -= 5;
				}

				div.append(`${caretaker} notices ${he} is overly muscular and `, muscleSpan);
			} else if (V.nurseryMusclesSetting === 1) {
				if (child.muscles < -10) {
					const muscleSpan = App.UI.DOM.makeElement("span", `increases the amount of exercise ${he} receives. `, ["improvement"]);

					child.muscles--;

					div.append(`${caretaker} notices ${he} is weak and `, muscleSpan);
				} else if (child.muscles > 10) {
					const muscleSpan = App.UI.DOM.makeElement("span", 'a healthy musculature;', ["change", "positive"]);

					child.muscles++;

					div.append(`${He} has `, muscleSpan, ` efforts will be made to maintain it. `);
				} else {
					const muscleSpan = App.UI.DOM.makeElement("span", 'quickly loses its gained muscle.', ["health", "dec"]);

					div.append(`${His} developing body `, muscleSpan);
				}
			} else if (V.nurseryMusclesSetting === 0) {
				const muscleSpan = App.UI.DOM.makeElement("span", 'quickly loses its gained muscle.', ["health", "dec"]);

				if (child.muscles > 100) {
					child.muscles -= 40;
					div.append(`${His} developing body `, muscleSpan);
				}
			}
		}

		return div;
	}

	function childFriendshipRivalries(child) {
		const el = new DocumentFragment();
		const cribsCopy = Array.from(V.cribs);

		cribsCopy.splice(V.cribs.findIndex(c => c.ID === child.ID));

		for (const target of cribsCopy) {
			const becomeFriends = () => `${child.slaveName} and ${target.slaveName} have realized that they have more in common that they originally thought, and have become friends. `;
			const becomeRivals = () => `${child.slaveName} and ${target.slaveName} have more differences between them than they could put aside and have become rivals. `;
			const haveSameFetish = () => child.fetish === target.fetish && child.fetish !== Fetish.NONE;
			const haveSameBehavioralQuirk = () => child.behavioralQuirk && child.behavioralQuirk === target.behavioralQuirk && child.behavioralQuirk !== BehavioralQuirk.NONE;
			const haveSameSexualQuirk = () => child.sexualQuirk && child.sexualQuirk === target.sexualQuirk && child.sexualQuirk !== SexualQuirk.NONE;

			const div = document.createElement("div");

			const {his} = getPronouns(target);
			const chance = jsRandom(1, 100);

			let friend = 0;
			let rival = 0;

			if (target.actualAge >= 3) {
				if (haveSameFetish()) {
					div.append(`${sameFetish(child, target)}, a fact over which they bond. `);

					friend++;
				}

				if (haveSameBehavioralQuirk()) {	// TODO:
					div.append(`Since ${sameBehavioralQuirk(child, target)}, they learn to get along a bit better. `);

					friend++;
				}

				if (haveSameSexualQuirk()) {
					div.append(`Because ${sameSexualQuirk(child, target, haveSameBehavioralQuirk())}, the two grow a bit closer. `);

					friend++;
				}

				if (target.fetish === Fetish.SADIST || target.fetish === Fetish.DOM) {
					div.append(`${target.slaveName} is a ${target.fetish}, and ${child.slaveName} is often ${his} target, which ${child.slaveName} doesn't particularly like. `);

					rival++;
				} else if (child.fetish === Fetish.SADIST || child.fetish === Fetish.DOM) {
					div.append(`${child.slaveName} is a ${child.fetish}, and ${target.slaveName} is often ${his} target, which ${target.slaveName} doesn't particularly like. `);

					rival++;
				}

				if (areRelated(child, target) || areCousins(child, target)) {
					if (areRelated(child, target)) {
						if (rival) {
							div.append(`${child.slaveName} and ${target.slaveName} are siblings, and find it difficult to really stay mad at each other, and they make up their differences somewhat. `);

							friend += 2;
						} else {
							div.append(`${child.slaveName} and ${target.slaveName} are siblings, a fact that draws them closer together. `);

							friend += 2;
						}
					} else {
						if (rival) {
							div.append(`${child.slaveName} and ${target.slaveName} are cousins, and find it difficult to really stay mad at each other, and they make up their differences somewhat. `);

							friend++;
						} else {
							div.append(`${child.slaveName} and ${target.slaveName} are cousins, a fact that draws them closer together. `);

							friend++;
						}
					}
				}

				if (friend) {
					if (rival) {
						if (friend > rival && child.relationshipTarget !== target.ID) {
							if (chance > 75) {
								div.append(becomeFriends());

								child.relationship = 1;
								child.relationshipTarget = target.ID;

								target.relationship = 1;
								target.relationshipTarget = child.ID;
							}
						}
					} else {
						if (chance > 60) {
							div.append(becomeRivals());

							child.relationship = 1;
							child.relationshipTarget = target.ID;

							target.relationship = 1;
							target.relationshipTarget = child.ID;
						}
					}
				}

				if (rival) {
					if (friend) {
						if (rival > friend) {
							if (chance > 75) {
								div.append(becomeRivals());
							}
						}
					} else {
						if (chance > 60) {
							div.append(becomeFriends());
						}
					}
				}
			}

			el.append(div);
		}
		return el;

		function sameFetish(child, target) {
			switch (child.fetish) {
				case Fetish.SUBMISSIVE:
					return `${child.slaveName} and ${target.slaveName} are both sexually submissive`;
				case Fetish.CUMSLUT:
					return `Neither ${child.slaveName} nor ${target.slaveName} can get enough cum`;
				case Fetish.HUMILIATION:
					return `Both ${child.slaveName} and ${target.slaveName} have a fetish for humiliation`;
				case Fetish.BUTTSLUT:
					return `Neither ${child.slaveName} nor ${target.slaveName} can get enough assplay`;
				case Fetish.BOOBS:
					return `${child.slaveName} and ${target.slaveName} both love breastplay`;
				case Fetish.SADIST:
					return `Both ${child.slaveName} are ${target.slaveName} are sadists`;
				case Fetish.MASOCHIST:
					return `${child.slaveName} and ${target.slaveName} are both masochists`;
				case Fetish.DOM:
					return `Both ${child.slaveName} and ${target.slaveName} are sexually dominant`;
				case Fetish.PREGNANCY:
					return `The idea of pregnancy titillates both ${child.slaveName} and ${target.slaveName}`;
				default:
					throw Error(`Unexpected .fetish value of "${child.fetish}" in sameFetish(). Please report this.`);
			}
		}

		function sameBehavioralQuirk(child, target) {
			switch (child.behavioralQuirk) {
				case BehavioralQuirk.CONFIDENT:
					return `${child.slaveName} and ${target.slaveName} are both naturally confident`;
				case BehavioralQuirk.CUTTING:
					return `both ${child.slaveName} and ${target.slaveName} have a cutting wit about them`;
				case BehavioralQuirk.FUNNY:
					return `${child.slaveName} and ${target.slaveName} can both make the other laugh`;
				case BehavioralQuirk.FITNESS:
					return `${child.slaveName} and ${target.slaveName} both love to try to stay in shape`;
				case BehavioralQuirk.ADORESWOMEN:
					return `${child.slaveName} and ${target.slaveName} both adore women`;
				case BehavioralQuirk.ADORESMEN:
					return `both ${child.slaveName} are ${target.slaveName} adore men`;
				case BehavioralQuirk.INSECURE:
					return `${child.slaveName} and ${target.slaveName} are both equally insecure`;
				case BehavioralQuirk.SINFUL:
					return `both ${child.slaveName} and ${target.slaveName} love breaking cultural and religious mores`;
				case BehavioralQuirk.ADVOCATE:
					return `${child.slaveName} and ${target.slaveName} can both make a strong case for slavery`;
				default:
					throw Error(`Unexpected .behavioralQuirk value of "${child.behavioralQuirk}" in sameBehavioralQuirk(). Please report this.`);
			}
		}

		// TODO: incorporate minimumSlaveAge
		function sameSexualQuirk(child, target, sameQuirk = false) {
			switch (child.sexualQuirk) {
				case SexualQuirk.GAGFUCK:
					return `${sameQuirk ? `the two also` : `${child.slaveName} and ${target.slaveName} both`} love having their little throats fucked`;
				case SexualQuirk.PAINAL:
					return `${sameQuirk ? `neither` : `neither ${child.slaveName} nor ${target.slaveName}`} can get enough painal`;
				case SexualQuirk.STRUGGLE:
					return `${sameQuirk ? `the two also` : `${child.slaveName} and ${target.slaveName} both`} love to put up a struggle during sex`;
				case SexualQuirk.TEASE:
					return `${sameQuirk ? `the two are also both teases` : `${child.slaveName} and ${target.slaveName} are both teases`}`;
				case SexualQuirk.ROMANTIC:
					return `${sameQuirk ? `the two also` : `${child.slaveName} and ${target.slaveName} both`} see the world from under a romantic lens`;
				case SexualQuirk.PERVERT:
					return `${sameQuirk ? `the two are also` : `${child.slaveName} and ${target.slaveName} are both`} big-time perverts`;
				case SexualQuirk.CARING:
					return `${sameQuirk ? `the two also` : `${child.slaveName} and ${target.slaveName} both`} care about their partners`;
				case SexualQuirk.UNFLINCHING:
					return `${sameQuirk ? `the two can also` : `${child.slaveName} and ${target.slaveName} can both`} take whatever their partner might throw at them `;
				case SexualQuirk.SIZEQUEEN:
					return `${sameQuirk ? `the two also` : `${child.slaveName} and ${target.slaveName} both`} have a love for huge cock`;
				default:
					throw Error(`Unexpected .sexualQuirk value of "${child.sexualQuirk}" in sameSexualQuirk(). Please report this.`);
			}
		}
	}

	function newChildFetish(fetish = "none") {
		switch (fetish) {
			case Fetish.SUBMISSIVE:
				return `is now sexually submissive`;
			case Fetish.CUMSLUT:
				return `is now a cumslut`;
			case Fetish.HUMILIATION:
				return `now has a fetish for humiliation`;
			case Fetish.BUTTSLUT:
				return `is now a buttslut`;
			case Fetish.BOOBS:
				return `now has a fetish for all things breast-related`;
			case Fetish.SADIST:
				return `now gets off on causing pain`;
			case Fetish.MASOCHIST:
				return `now gets off on pain`;
			case Fetish.DOM:
				return `is now very sexually dominant`;
			case Fetish.PREGNANCY:
				return `has developed a fascination for all things pregnancy-related`;
			default:
				throw Error(`Unexpected .fetish value of "${fetish}" in newChildFetish(). Please report this.`);
		}
	}

	function childGrowTime(child) {
		const nameSpan = App.UI.DOM.makeElement("span", child.slaveName, ["pink"]);
		const limeSpan = App.UI.DOM.makeElement("span", 'ready for release.', ["lime"]);
		const mainSpan = document.createElement("span");

		const {He} = getPronouns(child);

		if (child.growTime > 0) {
			mainSpan.append(nameSpan, ` is growing steadily. ${He} will be ready for release in about ${years(child.growTime)}. `);
		} else {
			mainSpan.append(nameSpan, ' is ', limeSpan, ` ${He} will be removed from ${V.nurseryName} upon your approach. `);
		}

		return mainSpan;
	}

	function findMedianNannyIntelligence() {
		return median(nannies.map(n => n.intelligence));
	}

	function findMedianNannyIntelligenceImplant() {
		return median(nannies.map(n => n.intelligenceImplant));
	}

	/**
	 * Checks if there are more than one children over the target age in the Nursery
	 * @param {number} index
	 * @param {number} [age=3]
	 */
	function multipleChildrenOverTargetAge(index, age = 3) {
		const cribsCopy = Array.from(V.cribs);

		cribsCopy.splice(index, 1);

		return V.cribs.length > 1 && cribsCopy.some(c => c.actualAge >= age);
	}

	return {
		before: frag,
		slaves: [],
		after: new DocumentFragment(),
	};
};
