App.Events.RESSSolitaryDesperation = class RESSSolitaryDesperation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				canHear,
				hasAnyLegs,
				s => s.assignment === Job.CONFINEMENT,
				s => s.devotion <= 50,
				s => s.trust <= 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);

		App.Events.drawEventArt(node, eventSlave);
		eventSlave.devotion += 4;

		let r = [];
		r.push(`Sitting by ${himself} in solitary is`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."));
		r.push(`${He}'s let out whenever required for a slave task, but unless ${he}'s serving, ${he} spends ${his} days in a featureless cell. It's clean and dry, but designed to totally deny any mental stimulation. Careful monitoring is necessary to prevent mental damage.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`As you pass by ${his} cell on other business, there is a faint stirring within.`);
		if (canSee(eventSlave)) {
			r.push(`${He} must have been looking for you through a small opening in ${his} cell door.`);
		} else if (canHear(eventSlave)) {
			r.push(`${He} must have heard the dim sound of your footsteps through the door.`);
		} else {
			r.push(`${He} must have placed ${himself} against the door just in case you stopped by.`);
		}
		r.push(`There's a small port for meals to be inserted into the cell, and ${he} shouts at it, clearly with ${his} mouth right against it,`);
		r.push(Spoken(eventSlave, `"Please don't go! I'll do anything if you just stay a bit, whoever you are! I just need some time with someone! Please!"`));
		App.Events.addParagraph(node, r);

		let choices = [new App.Events.Result("Keep walking", walk), new App.Events.Result(`Impersonate a slave and manipulate ${him}`, impersonate)];
		if (V.PC.belly < 5000){
			if (V.PC.dick !== 0 && (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) && canWalk(eventSlave)) {
				choices.push(new App.Events.Result(`Exploit ${his} need for personal contact`, exploit,
					((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) ? `This option will take ${his} virginity` : null));
			}
			if (V.PC.vagina !== -1){
				choices.push(new App.Events.Result(`Exploit ${his} need for personal contact by giving ${him} a pussy to lick`, lick));
			}
		}
		if (V.PC.preg > 30 && V.PC.pregMood === 1 && V.PC.boobs >= 800 && V.PC.lactation > 0 && V.PC.boobsImplant === 0) {
			choices.push(new App.Events.Result(`${He} just needs a mother's touch`, mother));
		}
		App.Events.addResponses(node, choices);

		function walk() {
			r = [];
			r.push(`As you walk away from the cell door, the pleas become a desperate, hopeless sobbing. In the coming days, it becomes apparent that ${eventSlave.slaveName} was right at the edge of a mental precipice when ${he} pled with you. <span class="mindbreak">${He} has sunk into mental incompetence.</span> ${He}'s just a`);
			if (eventSlave.pregKnown === 1) {
				r.push(`pregnant`);
			}
			r.push(`piece of meat, now.`);
			applyMindbroken(eventSlave);
			return r;
		}

		function impersonate() {
			r = [];
			r.push(`Kneeling next to the port in the cell door, you`);
			if (V.PC.title === 1 || V.PC.voice === 1) {
				r.push(`set up a voice filter through the arcology systems to make your voice sound feminine.`);
			} else {
				r.push(`abandon your usual commanding woman's tone of voice and adopt the inflections of a slave.`);
			}
			r.push(`You sympathize with ${eventSlave.slaveName}, listening to ${him} pour out ${his} heart. ${He} despairs of being able to avoid punishment, and is afraid that you will hurt ${him} or sell ${him} to a cheap`);
			if (eventSlave.pregKnown === 1) {
				r.push(`brothel or harm ${his} baby.`);
			} else {
				r.push(`brothel.`);
			}
			r.push(`In your`);
			if (V.PC.title === 1 || V.PC.voice === 1) {
				r.push(`fake female`);
			} else {
				r.push(`slave's`);
			}
			r.push(`voice, you encourage ${him} to keep trying, and you even give ${him} some useful advice about how to address ${his} faults. ${He} gathers ${himself} together and thanks you. Just then, you pop the door open,`);
			if (canSee(eventSlave)) {
				r.push(`revealing who you actually are and letting`);
			} else {
				r.push(`and let`);
			}
			r.push(`your voice return to`);
			if (V.PC.title === 1 || V.PC.voice === 1) {
				r.push(`its masculine harshness.`);
			} else {
				r.push(`that of a confident and powerful woman.`);
			}
			r.push(`When ${he} realizes the terrible truth, ${he} wordlessly prostrates ${himself}, trembling with terror. <span class="trust dec">${His} fear of you has increased.</span>`);
			eventSlave.trust -= 5;
			return r;
		}

		function exploit(){
			r = [];
			r.push(`Without a word, you push your erect member through the hole and into the cell. After a moment's pause, you feel ${him} begin to orally service you with almost desperate concentration. You climax quickly to ${his} manic efforts, and begin to pull out. As you do, ${he} tearfully begs you not to go. ${He} promises something better, anything better, so you reinsert yourself, only to find that ${he} has ${his}`);
			if (canDoVaginal(eventSlave)) {
				r.push(`pussy`);
			} else {
				r.push(`ass`);
			}
			r.push(`pressed against the slot. You can't fuck ${him} all that hard through the door, so ${he} has to do the work. You begin to withdraw whenever ${he} shows ${himself} any mercy, so ${he} pounds ${himself} against you so hard that ${he} sobs a little even as you talk to ${him}, the lifeline ${he} so needs.`);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`In ${his} desperation ${he} even guides your cock into ${his} butt, too, and without prompting.`);
			}
			r.push(`<span class="devotion inc">${His} submission to you has increased.</span>`);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				if (eventSlave.vagina === 0 && eventSlave.anus === 0) {
					r.push(`It was thoughtful of ${him} to yield <span class="virginity loss">both ${his} virginity and anal cherry,</span> but it won't get ${him} out of there sooner.`);
					eventSlave.vagina++;
					eventSlave.anus++;
				} else if (eventSlave.vagina === 0) {
					r.push(`It was thoughtful of ${him} to yield <span class="virginity loss">${his} virginity,</span> but it won't get ${him} out of there sooner.`);
					eventSlave.vagina++;
				} else if (eventSlave.anus === 0) {
					r.push(`It was thoughtful of ${him} to yield <span class="virginity loss">${his} anal cherry,</span> but it won't get ${him} out of there sooner.`);
					eventSlave.anus++;
				}
				seX(eventSlave, "vaginal", V.PC, "penetrative");
				seX(eventSlave, "anal", V.PC, "penetrative");
				seX(eventSlave, "oral", V.PC, "penetrative");
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 10, 2, -1));
				}
			} else if (canDoAnal(eventSlave)) {
				if (eventSlave.anus === 0) {
					r.push(`It was thoughtful of ${him} to yield <span class="virginity loss">${his} anal cherry,</span> but it won't get ${him} out of there sooner.`);
					eventSlave.anus++;
				}
				seX(eventSlave, "anal", V.PC, "penetrative");
				seX(eventSlave, "oral", V.PC, "penetrative");
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 15, 1, -1));
				}
			} else {
				if (eventSlave.vagina === 0) {
					r.push(`It was thoughtful of ${him} to yield <span class="virginity loss">${his} virginity,</span> but it won't get ${him} out of there sooner.`);
					eventSlave.vagina++;
				}
				seX(eventSlave, "vaginal", V.PC, "penetrative");
				seX(eventSlave, "oral", V.PC, "penetrative");
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 15, 0, -1));
				}
			}
			eventSlave.devotion += 10;
			return r;
		}

		function lick() {
			eventSlave.devotion += 10;
			return `Without a word, you push your eager pussy up against the hole. After a moment's pause, you feel ${him} begin to orally service you with almost desperate concentration. You climax quickly to ${his} manic efforts, and begin to rise. As you do, ${he} tearfully begs you not to go. ${He} promises to do better, to try to get you off harder, so you lower yourself back into position. You have to exert yourself to hold this position, so it better be worth it. You begin to back off whenever ${he} shows ${himself} any mercy, so ${he} eats you out so zealously that ${he} sobs a little when ${he} tries to catch ${his} breath. With ${his} mouth so busy, ${he} doesn't even have the time to talk to you, the lifeline ${he} so needs, but ${he} doesn't seem to notice. <span class="devotion inc">${His} submission to you has increased.</span>`;
		}

		function mother() {
			eventSlave.devotion += 15;
			eventSlave.trust += 5;
			return `You reassure the frightened ${SlaveTitle(eventSlave)} and beckon ${him} to return to the hole before settling your gravid body before the door and pushing a fat, milk-laden breast through the gap. You coax the nervous ${girl} to drink ${his} fill; ${he} must be starving in there, after all. After some hesitation, you finally feel a pair of lips wrap themselves around your erect nipple and begin to drink deep. You talk to the suckling slave, explaining to ${him} just what ${he} needs to do to thrive in ${his} new life, shushing ${him} whenever ${he} tries to object and asking ${him} to just listen. Before long, your teat is drained of all its mother's milk, and as you move to shift to the other closer to the door, the desperate slave begs you not to go. You slip a hand through the slat, caressing ${his} face as you let ${him} know you're just turning around. As ${he} suckles your remaining milk, you feel ${him} <span class="trust inc">relax and lower ${his} guard.</span> ${He} needed to connect to someone and ${he} didn't expect it to be you, especially like not this. <span class="devotion inc">${His} willingness to listen to you has increased.</span>`;
		}
	}
};
