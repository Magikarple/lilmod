App.Events.RESSPlugDisobedience = class RESSPlugDisobedience extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canMove,
				s => plugWidth(s) > 1 || plugLength(s) > 0,
				s => s.devotion <= 20,
				s => s.trust >= -50,
				s => s.anus < 3,
				s => s.assignment !== Job.CONFINEMENT,
				isSlaveAvailable,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(`One morning, you see`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		if (!canWalk(eventSlave)) {
			r.push(`crawl`);
		} else if (canMove(eventSlave) && eventSlave.rules.mobility === "permissive") {
			r.push(`hobble`);
		} else if (shoeHeelCategory(eventSlave) > 1) {
			r.push(`totter`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`waddle`);
		} else {
			r.push(`walk`);
		}
		r.push(`hurriedly past your door, as though ${he} doesn't want you to notice ${him}. Of course, this only makes you notice ${him}, and you order ${him} in. As ${he} reluctantly obeys, you notice something off about ${his} ${canWalk(eventSlave) ? "gait" : "movements"}. ${He} should be quite uncomfortable from the`);
		if (plugWidth(eventSlave) > 1 && plugLength(eventSlave) > 0) {
			r.push(`massive`);
		} else if (plugLength(eventSlave) > 0) {
			r.push(`long`);
		} else {
			r.push(`big`);
		}
		r.push(`buttplug ${he} is required to wear, but ${he} doesn't seem to be.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`Your order ${him} to turn around and present ${his} anus for inspection. ${He} doesn't refuse, exactly, but neither does ${he} obey. ${He} keeps ${his} butt pointed resolutely away from you, and backs away a little. You cover the distance between you in three steps and run a clinical hand`);
		if (plugLength(eventSlave) > 0) {
			r.push(`across the terrified slave's lower belly.`);
		} else {
			r.push(`between the terrified slave's buttocks.`);
		}
		r.push(`As you suspected, ${he} isn't wearing ${his} buttplug.`);
		if (!canTalk(eventSlave)) {
			r.push(`${He} gestures pitifully, complaining that the plug hurts.`);
		} else {
			r.push(`${He} whines pitifully,`);
			r.push(Spoken(eventSlave, `"That thing hurts, ${Master}. It's too big for my asshole. Please don't make me wear it."`));
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`It's ${his} role to hurt`, hurt),
			new App.Events.Result(`Punish ${him} for disobedience, but address ${his} anal pain`, punish),
			new App.Events.Result(`Address ${his} worrisome anal pain`, address),
		]);

		function hurt() {
			r = [];
			r.push(`Without a word, you`);
			if (V.PC.dick === 0) {
				r.push(`don a cruelly knobby strap-on,`);
			}
			r.push(`throw ${him} onto the couch, take both ${his} ankles in one hand, and force them back over ${his} head so ${his} poor, doomed asshole is completely defenseless. You then spit on ${his} hole, seize your`);
			if (V.PC.dick === 0) {
				r.push(`instrument,`);
			} else {
				r.push(`rock-hard dick,`);
				if (V.PC.vagina !== -1) {
					r.push(`gather a little of your own pussyjuice and rub it on your cockhead,`);
				}
			}
			r.push(`and shove it up the wriggling slave ${girl}'s spasming rectum. You've got the necessary skill to judge exactly where the line between anal pain and anal injury is, and you take ${his} right up to it. Halfway through the long anal rape ${he} gives up struggling and just goes limp, sobbing. ${He} <span class="trust dec">fears you,</span> and has also begun to <span class="flaw gain">hate buttsex.</span>`);
			eventSlave.trust -= 5;
			eventSlave.sexualFlaw = "hates anal";
			seX(eventSlave, "anal", V.PC, "penetrative");
			return r;
		}

		function punish() {
			r = [];
			r.push(`You patiently and calmly explain to ${him} that disobeying orders isn't acceptable, but that too much pain from ${his} buttplug is a sign that something isn't right. First, you inform ${him}, ${he} will have to be punished for the disobedience, since ${he} should have brought ${his} trouble to you instead of disobeying. ${He}'s almost willing as you bend ${him} over`);
			if (eventSlave.belly >= 300000) {
				r.push(`${his} ${belly} middle`);
			} else {
				r.push(`the desk`);
			}
			r.push(`and spank ${his} buttocks severely, unsure whether to resent the corporal punishment or appreciate your measured response. When you're done tanning ${his} ass, ${he}'s surprised to feel a cool, lubricated digit working its way into ${his} anus. ${He} stiffens a little but eventually relaxes enough to take the finger, then two, and finally three, before you gently and slowly emplace ${his} plug. You instruct ${him} kindly on how to relax in the future when ${he} inserts it on ${his} own. ${He} <span class="devotion inc">appreciates</span> your approach.`);
			eventSlave.devotion += 4;
			return r;
		}

		function address() {
			eventSlave.trust += 4;
			return `You kindly explain how to relax and prepare one's asshole for such insertions. ${He}'s been told already, but you make ${him} fetch ${his} plug and go through the steps in front of you so you can check ${his} approach. ${He} leaves reminded how to wear ${his} plug, but <span class="trust inc">secretly relieved</span> ${he} got away with disobedience with nothing more than a lecture.`;
		}
	}
};
