App.Events.RETSShowerForce = class RETSShowerForce extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.universalRulesConsent === 0
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave /domslave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canTalk,
				canSee,
				s => s.devotion > 50,
				s => s.trust <= 75,
				s => (["sadist", "dom"].includes(s.fetish) || s.energy > 95),
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				canTalk,
				canHear,
				isSlaveAvailable,
				s => s.devotion <= 20,
				s => (s.fetish !== "buttslut"),
				s => (canDoAnal(s) && s.anus !== 0),
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {
			he2, His2, his2, him2
		} = getPronouns(subSlave).appendSuffix("2");

		let facialAttractiveness = "homely";
		if (subSlave.face > 95) {
			facialAttractiveness = "gorgeous";
		} else if (subSlave.face > 40) {
			facialAttractiveness = "beautiful";
		} else if (subSlave.face > 10) {
			facialAttractiveness = "pretty";
		} else if (subSlave.face >= -10) {
			facialAttractiveness = "attractive";
		}
		let numLegs = "two";
		if (hasBothLegs(eventSlave) && hasBothLegs(subSlave)) {
			numLegs = "four";
		} else if (hasBothLegs(eventSlave) || hasBothLegs(subSlave)) {
			numLegs = "three";
		}

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");

		seX(subSlave, "anal", eventSlave, "penetrative");
		let bellyDesc = bellyAdjective(subSlave);

		let t = [];
		t.push(`As you pass the showers, you hear what sounds like a muffled altercation over the noise of the showers running. You look in to see ${subSlave.slaveName}'s ${subSlave.skin} body facing you, pressed hard up against the glass wall of one of the showers. ${His2} ${facialAttractiveness} face`);
		if (subSlave.belly >= 5000) {
			t.push(`and ${subSlave.bellyPreg >= 5000 ? `pregnant` : bellyDesc} belly are`);
		} else {
			t.push("is");
		}
		t.push(`smashed against the glass,`);
		if (subSlave.belly >= 5000) {
			t.push(`${his2} face`);
		}
		t.push(`contorted in pain and fear. The apparent mystery is solved when you notice that there are ${numLegs} legs visible: there's a ${hasBothLegs(eventSlave) ? `pair of` : ""}`);
		if (eventSlave.muscles > 95) {
			t.push(`ripped`);
		} else if (eventSlave.muscles > 30) {
			t.push(`muscular`);
		} else if (eventSlave.muscles > 5) {
			t.push(`toned`);
		} else {
			t.push(`soft`);
		}
		t.push(`${eventSlave.skin} ${hasBothLegs(eventSlave) ? "calves" : "calf"} behind ${subSlave.slaveName}'s.`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "'s' face appears at"));
		t.push(App.UI.DOM.combineNodes(contextualIntro(eventSlave, subSlave, true), `'s ear, and though you can't hear exactly what ${he} says, it's something along the lines of "Take it, you whiny little bitch." ${He}'s clearly got ${canPenetrate(eventSlave) ? `${his} cock` : `a couple of fingers`} up ${subSlave.slaveName}'s asshole.`));
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`Both slaves notice you at the same time. ${subSlave.slaveName}'s ${canSee(subSlave)? `${App.Desc.eyesColor(subSlave)} widen` : "face lights up"}, but ${his2} momentary look of hope is snuffed out when ${he2} remembers who you are. ${eventSlave.slaveName}, on the other hand, looks a little doubtful. The rules allow ${him} to fuck your other slaves, but ${he} isn't quite sure what the right thing to do is, since ${he} isn't the most dominant force in the showers any more.`);
		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Instruct ${him} to be a little nicer`, nicer),
			new App.Events.Result("Double anal", double),
		]);

		function nicer() {
			t = [];
			t.push(`Even though you already have everyone's rapt attention, you rap on the glass for`);
			if (canSee(eventSlave) && canSee(subSlave)) {
				t.push(`emphasis, watched closely by four huge eyes.`);
			} else {
				t.push("emphasis.");
			}
			t.push(`You politely admonish ${eventSlave.slaveName}, and tell ${him} to do a better job of looking after ${his} anal bottom's pleasure. ${He} nods vigorously and snakes a hand around ${subSlave.slaveName}, to where`);
			if (subSlave.chastityPenis) {
				t.push(`${his2} caged dick is scraping against the glass.`);
			} else if (canAchieveErection(subSlave)) {
				t.push(`${his2} dick, shamefully half-hard despite ${his2} unwillingness, is smashed against the glass.`);
			} else if (subSlave.dick > 0) {
				t.push(`${his2} limp dick is smashed against the glass.`);
			} else if (subSlave.vagina > -1) {
				t.push(`${his2} neglected pussy is hidden between ${his2} forced-together legs.`);
			} else {
				t.push(`${his2} featureless groin is hidden between ${his2} forced-together legs.`);
			}
			t.push(`${eventSlave.slaveName} goes back to the anal, but gives ${subSlave.slaveName} a serviceable reach around as ${he} does. ${subSlave.slaveName} does not orgasm, but ${he2} looks a little less unhappy and <span class="trust inc">thanks you</span> for your intervention after ${eventSlave.slaveName}`);
			if (canPenetrate(eventSlave)) {
				t.push(`grunts, fills ${his2} asshole with cum, and pulls ${himself} out.`);
			} else {
				t.push(`shakes with orgasm and removes ${his} fingers.`);
			}
			seX(subSlave, "anal", eventSlave, "penetrative");
			subSlave.trust += 4;
			if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
				knockMeUp(subSlave, 5, 1, eventSlave.ID);
			}
			return t;
		}

		function double(){
			t = [];
			t.push(`You tell ${eventSlave.slaveName} to get out of the shower. ${He} looks crushed, and ${subSlave.slaveName} looks hopeful, until you tell ${him} to bring the bitch. ${eventSlave.slaveName} grabs ${subSlave.slaveName} by the wrist and drags ${his} protesting victim along. You sit on the counter and tell ${eventSlave.slaveName} to pass you the anal slave. ${He} does, giggling maliciously, openly masturbating as you pull the recalcitrant ${subSlave.slaveName} up onto your lap, seat`);
			if (V.PC.dick === 0) {
				t.push(`a strap-on`);
			} else {
				t.push(`your cock`);
			}
			t.push(`firmly up ${his2} already-fucked`);
			if (subSlave.anus > 2) {
				t.push(`anal slit,`);
			} else if (subSlave.anus > 1) {
				t.push(`asshole,`);
			} else {
				t.push(`anus,`);
			}
			t.push(`seize the backs of ${his2} knees, and pull ${him2} up into a crouching position atop you. You lift ${him2} up and down on`);
			if (V.PC.dick === 0) {
				t.push(`the strap-on`);
			} else {
				t.push(`your dick`);
			}
			t.push(`for a while, letting ${eventSlave.slaveName} continue ${his}`);
			if (canPenetrate(eventSlave)) {
				t.push(`jerking,`);
			} else {
				t.push(`rubbing,`);
			}
			t.push(`before telling ${him} to join you. ${He} hesitates for a moment before you explain that ${he} should join you up ${subSlave.slaveName}'s butthole. Your victim begins to cry openly but knows better than to beg. ${eventSlave.slaveName}`);
			if (canPenetrate(eventSlave)) {
				t.push(`pushes ${his} iron-hard prick up alongside yours,`);
			} else {
				t.push(`shoves first one and then two fingers up alongside your prick,`);
			}
			t.push(`eliciting a long wail from`);
			if (subSlave.belly >= 10000) {
				t.push(`the overfilled`);
			}
			t.push(`${subSlave.slaveName}. The position isn't the best for pounding's sake, but the sadistic thrill of ${subSlave.slaveName}'s anguish is plenty to bring both you and ${eventSlave.slaveName} to prompt orgasm. ${subSlave.slaveName} stumbles painfully back to the shower with <span class="trust dec">ill-concealed terror,</span> while ${eventSlave.slaveName} impulsively gives you a <span class="devotion inc">quick hug.</span>`);
			eventSlave.devotion += 4;
			subSlave.trust -= 5;
			seX(subSlave, "anal", eventSlave, "penetrative");
			seX(subSlave, "anal", V.PC, "penetrative");
			if (canImpreg(subSlave, V.PC)) {
				knockMeUp(subSlave, 5, 1, -1);
			}
			if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
				knockMeUp(subSlave, 5, 1, eventSlave.ID);
			}
			return t;
		}
	}
};
