App.Events.RESSFearfulHumiliation = class RESSFearfulHumiliation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				canHear,
				s => s.fetish === "humiliation" || s.energy > 95,
				s => s.devotion <= 50,
				s => s.devotion >= -20,
				s => canDoAnal(s) || canDoVaginal(s),
				s => s.anus !== 0,
				s => s.vagina !== 0,
				s => s.fetishKnown === 1,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		App.Events.addParagraph(node, [
			`Even if ${he} isn't yet a truly devoted sex slave,`,
			contextualIntro(V.PC, eventSlave, true),
			`generally obeys orders. ${He} blushes furiously when given any sexual command, but ${his} true feelings about humiliation become clear when ${he} is ordered to serve in front of others, even other slaves. It sometimes seems the number of people watching ${him} get fondled, used, or fucked directly reduces the distance between ${him} and ${his} next blushing or even sobbing orgasm.`
		]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Publicly prove the depths of ${his} humiliation to ${him}`, prove),
			new App.Events.Result(`Use a bait and switch tactic on ${him}, before public use`, tactic),
		]);

		function prove() {
			let r = [];
			r.push(`You drag a fearful, embarrassed,`);
			if (eventSlave.belly >= 1500) {
				if (eventSlave.bellyPreg >= 0) {
					r.push(`pregnant`);
				} else {
					r.push(`swollen`);
				}
			}
			r.push(`and totally naked ${eventSlave.slaveName} out into a public hall. A small knot of passersby gather around grinning, enjoying the sight of ${his} nakedness and anticipating a show. To ${his} surprise, you order ${him} to take a few minutes to recount ${his} life story. ${He}'s hesitant at first, but obeys, only realizing as ${he} nears the present day what an abject story of degradation and humiliation ${his} life truly is. ${He} continues shakily, describing in brief ${his} current life, crying a little and trembling with arousal. At a whispered command from you, ${he} concludes`);
			if (!canTalk(eventSlave)) {
				r.push(`in embarrassed gestures, "and now my ${getWrittenTitle(eventSlave)} is going to fuck my worthless body in public."`); // not spoken!
			} else {
				r.push(Spoken(eventSlave, `"and now my ${Master} is going to fuck my worthless body in public."`));
			}
			r.push(`You take ${him} standing there, as ${he} cries with mixed shame and sexual pleasure.`);
			if (!canDoVaginal(eventSlave)) {
				r.push(`${He}`);
				if (eventSlave.dick > 0) {
					r.push(`cums even though ${he}'s soft`);
				} else {
					r.push(`climaxes even though ${he}'s filled`);
				}
				r.push(`with the shame,`);
				if (V.PC.dick === 0) {
					r.push(`${his} anus clenching around the strap-on you're pumping in and out of it.`);
				} else {
					r.push(`adding a sad little dribble to the load dripping out of ${his} asshole.`);
				}
			} else {
				if (V.PC.dick === 0) {
					r.push(`You make ${him} clean ${his} pussyjuice off your strap-on with ${his} bitch mouth before you take it off.`);
				} else {
					r.push(`As you pull out of ${his} clenching pussy, cum runs down ${his} quavering thighs.`);
				}
			}
			r.push(`<span class="devotion inc">${He} has become more submissive to you,</span> and <span class="reputation inc">your reputation has increased.</span>`);
			eventSlave.devotion += 4;
			repX(500, "event", eventSlave);
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			return r;
		}

		function tactic() {
			let r = []; // TODO: redo art with "nicest clothing"
			r.push(`You instruct ${him} to get cleaned up and get dressed in ${his} nicest clothing. ${He} obeys, mystified, and is further puzzled to find that you're taking ${him} out for a nice evening at a small bar. You share a`);
			if (canTaste(eventSlave)) {
				r.push(`tasty`);
			} else {
				r.push(`fancy`);
			}
			r.push(`meal and listen to good music played on the little stage by an older slave. As the set concludes, you lean over and give ${eventSlave.slaveName} ${his} real orders for the evening. ${He} freezes in terror but eventually makes ${his} way up to the stage, strips in front of all the patrons, and says`);
			if (!canTalk(eventSlave)) {
				r.push(
					`in embarrassed gestures,`,
					Spoken(eventSlave, `"Please use me, I'm cheap."`)
				);
			} else {
				r.push(Spoken(eventSlave, `"One credit per fuck, if you'll do my worthless body on stage."`));
			}
			r.push(`By the end of the night, ${he}'s been fucked by almost everyone in the bar, and ${his} itch for humiliation has been well and truly scratched. As you collect ${his} earnings from the thoroughly pleased bartender, ${he} lies quiescent in a puddle of cum and exhaustion. <span class="yellowgreen">You've collected a decent fee,</span> and <span class="green">your reputation has increased.</span>`);
			repX(500, "event", eventSlave);
			cashX(100, "event", eventSlave);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 10);
				seX(eventSlave, "anal", "public", "penetrative", 10);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 25, 2, -2));
				}
			} else if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 20);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 50, 0, -2));
				}
			} else {
				seX(eventSlave, "anal", "public", "penetrative", 20);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 50, 1, -2));
				}
			}
			return r;
		}
	}
};
