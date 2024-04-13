App.Events.SEExpiration = class SEExpiration extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	/** Custom casting: all expiring slaves are cast automatically. If no slaves are cast, casting fails and the event does not run. */
	castActors() {
		this.actors = V.slaves.filter(s => s.indenture === 0).map(s => s.ID);
		return this.actors.length > 0;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Indentured Servants";
		const that = this;
		const artRenderer = V.seeImages && V.seeReportImages ? new App.Art.SlaveArtBatch(that.actors, 0, 0) : null;
		if (artRenderer) {
			node.append(artRenderer.writePreamble());
		}

		for (const id of that.actors) {
			const slave = getSlave(id);
			if (slave) {
				App.UI.DOM.appendNewElement("div", node, expire(slave));
				node.append(sectionBreak());
			}
		}
		const oldHandler = App.Utils.PassageSwitchHandler.get();
		App.Utils.PassageSwitchHandler.set(() => {
			for (const slaveID of that.actors) {
				if (getSlave(slaveID)) {
					removeSlave(getSlave(slaveID));
				}
			}
			oldHandler();
		});

		function sectionBreak() {
			const hr = document.createElement("hr");
			hr.style.margin = "0";
			return hr;
		}

		/**
		 *
		 * @param {App.Entity.SlaveState} slave
		 */
		function expire(slave) {
			const el = new DocumentFragment();
			const r = [];
			const {
				He, His,
				he, his, him, himself, woman
			} = getPronouns(slave);
			const {title: Master} = getEnunciation(slave);
			if (artRenderer) {
				App.UI.DOM.appendNewElement("div", el, artRenderer.render(slave), ["imageRef", "tinyImg"]);
			}

			r.push(App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(slave, slave.slaveName), `'s indentured servitude is ending this week, meaning that your arcology is gaining a citizen.`));
			V.lowerClass++;

			let seed = 0;
			for (const seeXp of V.slaves.filter(s => s.devotion <= 20)) {
				seed = 1;
				seeXp.devotion--;
			}
			if (seed === 1) {
				r.push(`Those of your slaves who are unhappy with their lives under you are <span class="mediumorchid">envious or angry</span> to see ${him} become free, according to their individual natures.`);
			}

			const desc = App.UI.DOM.appendNewElement("div", el);
			const result = App.UI.DOM.appendNewElement("div", el);

			slave.indenture = 52;
			let cost = slaveCost(slave);

			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`Since ${he} is mindbroken, there is precisely no chance that ${he} will be able to look after ${himself}.`);
				r.push(`${He} ${hasAnyLegs(slave) ? 'stands' : 'sits'} before you dumbly, betraying no reaction to the prospect of becoming free from sexual slavery. In situations like this, it is perfectly acceptable to subject ${him} to another indenture for ${his} own good.`);

				if (V.cash > 1000) {
					const div = document.createElement("div");
					div.append(App.UI.DOM.link(`Plead necessity and reactivate ${his} indenture`, () => {
						keepSlave(-1000);
						jQuery(result).empty().append(`You plead necessity and place ${him} under another indenture, paying the trivial fees left over once ${he} has been charged for ${his} own forecasted upkeep. Naturally, ${he} offers no response at all to any of this.`);
					}));
					App.UI.DOM.appendNewElement("span", div, ` This costs ${cashFormat(1000)}`, ["note"]);
					result.append(div);
				} else {
					App.UI.DOM.appendNewElement("div", result, `You cannot afford to do this`, ["note"]);
				}
			} else if ((slave.relationship < -1) && (slave.devotion > 95) && (slave.trust > 95)) {
				r.push(`${He} has been trying desperately hard not to think about this trying situation, but when ${he} comes before you on the day of ${his} indenture's expiration, ${he} can ignore it no longer. ${He}`);
				if (!hasAnyArms(slave)) {
					r.push(`wriggles disconsolately, probably wishing ${he} could throw ${himself} at your feet or cling to your knees.`);
				} else {
					r.push(`throws ${himself} at your feet and clings to your knees, bursting into tears.`);
				}
				if (!canTalk(slave)) {
					r.push(`${He} does ${his} best to communicate an earnest desire to stay, and repeats over and over that ${he} loves you. ${He} begins to indicate a willingness to accept true, unlimited slavery, if that's what it takes to stay.`);
				} else {
					r.push(Spoken(slave, `"Please, don't send me away,"`));
					r.push(`${he} sobs.`);
					r.push(Spoken(slave, `"I love you! I'll d-do anything — I'll be your slave! Please, enslave me. I l-love you..."`));
					r.push(`${he} moans, trailing off into convulsive blubbering.`);
				}

				if (V.cash > 1000) {
					const div = document.createElement("div");
					div.append(App.UI.DOM.link(`Enslave ${him}`, () => {
						const el = new DocumentFragment();
						const r = [];
						r.push(`${He}'s beside ${himself} with joy when you accept ${his} plea and enslave ${him}. ${He}'s given you the finest proof of loyalty a slave possibly can, having tasted a moment of freedom under the law, and thrown it away with utter contempt.`);
						if (hasAnyEyes(slave)) {
							r.push(`${His} ${App.Desc.eyesColor(slave)}`);
							if (canSee(slave)) {
								r.push(`${hasBothEyes(slave) ? 'watch' : 'watches'} you with`);
							} else {
								r.push(`${hasBothEyes(slave) ? 'are' : 'is'} wide with`);
							}
						} else {
							r.push(`${His} face shows`);
						}
						r.push(`eager anticipation, radiating gladness that the prospect of separation from you has gone.`);
						App.Events.addNode(el, r);
						slave.indenture = -1;
						slave.indentureRestrictions = 0;
						if (slave.origin === "You purchased $his indenture contract, making $him yours for as long as it lasts.") {
							slave.origin = "$He begged you to enslave $him when $his indenture contract expired, and you obliged.";
						}
						keepSlave(-1000);
						jQuery(result).empty().append(el);
					}));
					App.UI.DOM.appendNewElement("span", div, ` This costs ${cashFormat(1000)}`, ["note"]);
					result.append(div);
				} else {
					App.UI.DOM.appendNewElement("div", result, `You cannot afford to do this`, ["note"]);
				}
			} else if ((slave.devotion > 50) && (slave.trust > 50)) {
				cost = Math.trunc((cost * 0.5) / 500) * 500;
				cost = Math.clamp(cost, minimumSlaveCost(), 100000);

				r.push(`${His} feelings on this are quite mixed, since ${he} has come to feel that ${he} has a place under you.`);
				r.push(`${!hasAnyLegs(slave) ? 'Propped up' : 'Standing before you'} at the moment of ${his} scheduled emancipation, ${he} seems to be struggling to express ${himself}.`);
				if (!canTalk(slave)) {
					r.push(`${He} does ${his} best to communicate a willingness to remain your slave, indicating that ${he} wouldn't press too hard about the price if you offered ${him} another indenture.`);
				} else {
					r.push(Spoken(slave, `"${Master}, um,"`));
					r.push(`${he} says hesitantly.`);
					r.push(Spoken(slave, `"I don't mind being your slave. Could I — would you please give me another indenture? I'm, um, not too worried about the price."`));
				}

				if (V.cash > cost) {
					const div = document.createElement("div");
					div.append(App.UI.DOM.link(`Offer ${him} a one year supplementary indenture`, () => {
						keepSlave(cost);
						jQuery(result).empty().append(`${He} smiles almost shyly when you offer ${him} a one year supplementary indenture. The price is reasonable, but definitely favorable to you. ${He} accepts it anyway, and you transfer the money into an escrow account to be held for ${him} until ${his} new indenture is done. Your sex slave once again, ${he} awaits your pleasure without a hint of fear.`);
					}));
					App.UI.DOM.appendNewElement("span", div, ` This costs ${cashFormat(cost)}`, ["note"]);
					result.append(div);
				} else {
					App.UI.DOM.appendNewElement("div", result, `You cannot afford to do this`, ["note"]);
				}
			} else if ((slave.devotion >= -20) && (slave.trust > 20)) {
				r.push(`${He} approaches the moment with calculation, since ${he} has found more of a place in slavery than ${he} probably expected when ${he} became an indentured servant.`);
				r.push(`${!hasAnyLegs(slave) ? 'Propped up' : 'Standing before you'} at the moment of ${his} scheduled emancipation, ${he} seems willing to consider a short term continuation of service.`);

				if (V.cash > cost) {
					const div = document.createElement("div");
					div.append(App.UI.DOM.link(`Offer ${him} a one year supplementary indenture`, () => {
						keepSlave(cost);
						jQuery(result).empty().append(`${He} looks pensive when you offer ${him} a one year supplementary indenture. The price reflects the market, and is a reasonable compensation for a year of sexual slavery. ${He} accepts it after some consideration, and you transfer the money into an escrow account to be held for ${him} until ${his} new indenture is done. Your sex slave once again, ${he} awaits orders with complacency.`);
					}));
					App.UI.DOM.appendNewElement("span", div, ` This costs ${cashFormat(cost)}`, ["note"]);
					result.append(div);
				} else {
					App.UI.DOM.appendNewElement("div", result, `You cannot afford to do this`, ["note"]);
				}
			} else {
				r.push(`${He} makes no effort at all to conceal ${his} joy at being a free ${woman} again.`);
				if (slave.origin === "$He put $himself up as collateral at a poker game, and lost.") {
					r.push(`A bet is a bet, but that was a lonnng year. There's still room for ${him} in your ${V.mercenariesTitle}, but many of them have come to see ${him} in a new, more... intimate way. As a free ${woman}, ${he}'ll have to decide if it's worth the risk and the sex to stay here and fight for you who ${he} loathes... or else take up arms elsewhere in an ever more uncertain world.`);
					if (slave.addict > 5) {
						r.push(`${He}'ll need to make money fast as ${he} remains addicted to your aphrodisiacs.`);
					}
				} else {
					r.push(`It seems very unlikely that ${he}'ll stay in the arcology; ${he}'ll probably take what remains of ${his} indenture payment, held in escrow for this day, and be off to wherever it is that ${he} came from in the first place.`);
				}
			}
			App.Events.addNode(desc, r);
			App.UI.DOM.appendNewElement("h3", el, `Final notes?`);
			const note = App.UI.DOM.appendNewElement("div", el, null, ["note"]);
			App.UI.DOM.appendNewElement("div", note, `${His} most recent task was to ${(V.assignmentRecords[slave]) ? `${slave.assignment}, and before that to ${V.assignmentRecords[slave]}` : slave.assignment}.`, ["indent"]);
			note.append(slaveImpactLongTerm(slave));

			return el;

			function keepSlave(cost) {
				cashX(forceNeg(cost), "indentureRenewal", slave);
				that.actors.delete(slave.ID);
				V.lowerClass--;
			}
		}
	}
};
