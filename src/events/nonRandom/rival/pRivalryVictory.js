App.Events.pRivalryVictory = function() {
	return execute();

	function execute() {
		const node = new DocumentFragment();
		const {
			HisR, HeR,
			hisR, heR
		} = getPronouns({pronoun: (V.rival.gender === 2) ? 1 : 0}).appendSuffix("R");
		V.nextButton = " "; // hide button until user makes a selection
		V.rival.prosperity = 0;
		V.rival.power = 0;
		const rivalArc = V.arcologies.find(a => a.rival === 1);

		App.Events.addParagraph(node, [`For the first time, you receive a direct call from your rival. You pictured the moment as feeling grander than this, sitting at your desk as usual looking into ${hisR} downcast face. You're the victor in a new form of warfare in which bankruptcy has replaced surrender. If the world survives in its present state, you may one day be remembered as an innovator in the evolution of (nearly) bloodless war. Today, your reputation has <span class="green">greatly improved.</span> But today all you have that's tangible is a view of a still-dignified arcology owner, self-possessed despite the situation.`]);

		App.UI.DOM.appendNewElement("p", node, `"For what it's worth," ${heR} says without preamble, "I had nothing against you. The Daughters wouldn't accept a straight buy-off. Their leadership needed a target to attack, or the rank and file would have killed them themselves and gone ahead attacking me. I had to give them an alternative, or it would have been me." ${HeR} looks nervous for the first time. "So, what do we do now? I've still got enough resources to make the end of this story a messy one for you. Let me go, and I won't. I'll walk away, and I'll sign everything I've got left over to you.${(V.rival.hostageState > 0 && V.hostage) ? ` Including ${V.hostage.slaveName}, of course.` : ``}`);

		const result = App.UI.DOM.appendNewElement("div", node);

		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Accept`,
			() => {
				const el = new DocumentFragment();
				const r = [];
				unlockContinue();
				r.push(`You accept, magnanimous in victory. "I don't think I would have done that," your rival replies. "Thank you. When they write the book, I'll make sure you look good."`);
				if (V.rival.state === 2) {
					r.push(`${HisR} remaining liquid assets will go to satisfy ${hisR} great debts, but ${hisR} <span class="yellowgreen">arcology holdings are yours.</span>`);
					if (rivalArc) {
						updateArc();
						rivalArc.PCminority += rivalArc.ownership;
						rivalArc.PCminority = Math.clamp(rivalArc.PCminority, 0, 49);
					}
					if (V.rival.hostageState === 1) {
						V.rival.hostageState = 2;
					}
					V.rival.state = 4;
				} else {
					r.push(`${HisR} arcology will go to satisfy ${hisR} great debts, but you will still profit <span class="yellowgreen">immensely</span> from your victory${(V.rival.hostageState > 0 && V.hostage) ? `, and acquire ${V.hostage.slaveName} as a slave` : ``}.`);
					cashX(random(100000, 250000), "war");
				}
				if (V.maximumRep < 20000) {
					r.push(`There are now <span class="green">no doubts of your ability to lead the arcology.</span>`);
					V.maximumRep += 10000;
				}
				App.Events.addNode(el, r, "div");
				jQuery(result).empty().append(el);
			}
		));

		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Refuse`,
			() => {
				const el = new DocumentFragment();
				const r = [];
				unlockContinue();
				r.push(`You coldly decline. "That was a mistake," your rival replies, entering a computer command.`);
				if (V.rival.state === 2) {
					r.push(`"All my remaining liquid assets have just been <span class="red">carefully dispersed to deny you control of my arcology.</span> You'll get nothing from me." It's true. The financial self-destruction ensures that the fiscal wreckage goes to the arcology's citizens, not you.`);
					if (rivalArc) {
						updateArc();
					}
					r.push(hostageBounty());
				} else {
					r.push(`"All my remaining liquid assets have just been <span class="red">expended in an attack on the value of your holdings,</span> and my arcology has been heavily sabotaged. You'll get nothing from me." It's not entirely true, but the damage to your holdings does outweigh your gains by a significant margin. Your rival vanishes back into the old world.`);
					cashX(random(-10000, -25000), "war");
				}
				if (V.maximumRep < 20000) {
					r.push(`At least there are <span class="green">no longer any doubts of your ability to lead the arcology.</span>`);
					V.maximumRep += 10000;
				}
				App.Events.addNode(el, r, "div");
				jQuery(result).empty().append(el);
			}
		));
		if (V.rival.duration >= 30 && V.rival.hostageState === 0 && V.rival.state === 2) {
			App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
				`Refuse, and place a bounty of ${cashFormat(50000)} on your rival's death`,
				() => {
					const el = new DocumentFragment();
					let r = [];
					unlockContinue();
					r.push(`You coldly decline. "That was a mistake," your rival replies, entering a computer command. "All my remaining liquid assets have just been <span class="red">expended in an attack on the value of your holdings,</span> and my arcology has been heavily sabotaged. You'll get nothing from me." It's not entirely true, but the damage to your holdings does outweigh your gains by a significant margin. Your rival vanishes back into the old world — but only for a few days.`);
					App.Events.addParagraph(el, r);
					r = [];
					r.push(`Your bounty is quickly claimed, and you are treated to the delicious moment of finding your rival's head delivered to your doorstep. It might not have done much good, but damn did it feel good.`);
					App.Events.addParagraph(el, r);
					cashX(-50000, "war");
					if (V.maximumRep < 20000) {
						r.push(`There is also <span class="green">no doubt in your ability to lead the arcology</span> into the future.`);
						V.maximumRep += 10000;
					}
					V.maximumRep += 10000;
					if (rivalArc) {
						updateArc();
					}
					jQuery(result).empty().append(el);
				}
			));
		}
		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Refuse, and place a bounty of ${cashFormat(50000)} on your rival's enslavement`,
			() => {
				const el = new DocumentFragment();
				const r = [];
				unlockContinue();
				r.push(`You coldly decline. "That was a mistake," your rival replies, entering a computer command.`);
				if (V.rival.state === 2) {
					r.push(`"All my remaining liquid assets have just been <span class="red">carefully dispersed to deny you control of my arcology.</span> You'll get nothing from me." It's true. The financial self-destruction ensures that the fiscal wreckage goes to the arcology's citizens, not you.`);
					if (rivalArc) {
						updateArc();
						if (rivalArc.FSSupremacist > 20) {
							V.rival.race = rivalArc.FSSupremacistRace;
						} else if (rivalArc.FSSubjugationist > 20) {
							V.rival.race = Array.from(App.Data.misc.filterRacesPublic.keys()).filter(race => race !== rivalArc.FSSubjugationistRace).random();
						}
					}
					r.push(hostageBounty());
				} else {
					r.push(`"All my remaining liquid assets have just been <span class="red">expended in an attack on the value of your holdings,</span> and my arcology has been heavily sabotaged. You'll get nothing from me." It's not entirely true, but the damage to your holdings does outweigh your gains by a significant margin.`);
					cashX(random(-10000, -25000), "war");
				}
				if (V.maximumRep < 20000) {
					r.push(`At least there are <span class="green">no longer any doubts of your ability to lead the arcology.</span>`);
					V.maximumRep += 10000;
				}
				cashX(-50000, "war");
				r.push(pRivalryCapture("victory"));
				App.Events.addNode(el, r, "div");
				jQuery(result).empty().append(el);
			}
		));

		return node;

		function hostageBounty() {
			if (V.rival.hostageState === 0 || !V.hostage) {
				return;
			}
			const result2 = App.UI.DOM.makeElement("p");
			App.UI.DOM.appendNewElement("div", result2, App.UI.DOM.link(
				`Place a bounty of ${cashFormat(10000)} on your rival's psychological warfare tool`,
				() => {
					const {He} = getPronouns(V.hostage);
					jQuery(result2).empty().append(`You make sure to post a bounty sufficient to ensure that ${V.hostage.slaveName}, your rival's psychological warfare tool, does not escape or go unrescued, depending on one's point of view. ${He} is quickly picked out of the chaos of your rival's escape and delivered to you.`);
					V.rival.hostageState = 2;
					cashX(-10000, "war");
				}
			));
			return result2;
		}

		function unlockContinue() {
			V.nextButton = "Continue";
			App.Utils.updateUserButton();
		}

		function updateArc() {
			rivalArc.embargo = 0;
			rivalArc.embargoTarget = -1;
			rivalArc.influenceTarget = -1;
			rivalArc.rival = 0;
			rivalArc.government = "direct democracy";
		}
	}
};
