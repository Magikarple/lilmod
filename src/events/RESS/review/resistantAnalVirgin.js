App.Events.RESSResistantAnalVirgin = class RESSResistantAnalVirgin extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion < -20,
				s => s.trust >= -20,
				s => s.anus === 0,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`has never had anything significant up ${his} ass. Living in ${V.arcologies[0].name}, ${he} can't have missed that anal sex is a part of most slaves' lives. ${He}`
		);
		if (canSee(eventSlave)) {
			r.push(`witnesses`);
		} else if (canHear(eventSlave)) {
			r.push(`hears`);
		} else {
			r.push(`thinks about`);
		}
		r.push(`sodomy several times a day, at least.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`Lately, you've noticed that ${he} reacts to these`);
		if (canSee(eventSlave)) {
			r.push(`sights`);
		} else if (canHear(eventSlave)) {
			r.push(`sounds`);
		} else {
			r.push(`thoughts`);
		}
		r.push(`with a well-concealed flash of apprehension. It seems ${he}'s figured out that ${he} will probably be required to take it up ${his} little`);
		if (V.seeRace === 1) {
			r.push(eventSlave.race);
		}
		r.push(`butt someday, and isn't enthusiastic about the prospect. You could probably exploit this.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} earn continued anal virginity`, earn),
			hasAnyLegs(eventSlave)
				? new App.Events.Result(`Force ${him} to degrade ${himself}`, force, `This option will take ${his} anal virginity`)
				: new App.Events.Result(),
			eventSlave.vagina === 0
				? new App.Events.Result(`Make ${him} choose between ${his} virginities`, choose, `This option will take one of ${his} virginities`)
				: new App.Events.Result()
		]);

		function earn() {
			r = [];
			r.push(`You tell ${him} ${he}'s a sex slave, and that ${he} needs to learn how to take a dick up the ass.`);
			if (!canTalk(eventSlave) && hasAnyArms(eventSlave)) {
				r.push(`${He} frantically begs with gestures, pleading`);
				if (hasBothLegs(eventSlave)) {
					r.push(`on ${his} knees.`);
				} else {
					r.push(`desperately.`);
				}
			} else if (!canTalk(eventSlave)) {
				r.push(`${He} frantically mouths pleas that you leave ${his} butt alone.`);
			} else {
				r.push(
					`${He} begs,`,
					Spoken(eventSlave, `"Please no, ${Master}, please don't rape me in my ass, ${Master}!"`)
				);
			}
			r.push(`You make a show of considering, and then tell ${him} that if ${he}'s extra obedient, you might let ${him} keep ${his} butt — for now. You tell ${him} to`);
			if (PC.dick !== 0) {
				r.push(`blow you`);
				if (PC.vagina !== -1) {
					r.push(`and`);
				}
			}
			if (PC.vagina !== -1) {
				r.push(`lick your pussy`);
			}
			r.push(r.pop() + `, and ${he} does with unusual obedience. When ${he}'s done, you bend down and whisper in ${his} ear that if ${he} shows any sign of rebelliousness, you'll ruin ${his} little asshole. <span class="trust dec">${He}'s terrified.</span>`);
			eventSlave.trust -= 5;
			seX(eventSlave, "oral", PC, "penetrative");
			return r;
		}

		function force() {
			r = [];
			r.push(`Suction cup dildos are terribly useful. You place a moderate-sized one on a low table in your office,`);
			if (eventSlave.chastityAnus) {
				r.push(`unlock ${his} chastity belt,`);
			}
			r.push(`and order ${him} to squat down on it and fuck ${his} own asshole. ${He} hesitates, incredulous, and finds ${himself} bound to the couch and thoroughly whipped. It isn't a sexual whipping, either, but a methodical and scientific administration of pain right up to the border of damage. When ${he}'s been reduced to a state of abject, sobbing surrender, you free ${him} and repeat your orders as though nothing had happened. Still crying, ${he} hobbles over and up onto the table,`);
			if (eventSlave.belly >= 300000 || eventSlave.weight > 190) {
				r.push(`struggles to line ${himself} up, and finds it slammed into ${his} asshole when the table gives out under ${his}`);
				if (eventSlave.belly >= 300000) {
					r.push(`gravid`);
				}
				r.push(`weight. You leave ${him} there to struggle with the dildo wedged in ${his} rear until ${he} finally manages to pop it free from the table fragment stuck under mass and roll over. You haul ${him} onto`);
			} else {
				if (eventSlave.belly > 20) {
					r.push(`gingerly lowers ${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnant`);
					}
					r.push(`bulk onto it,`);
				}
				r.push(`and fucks ${his} little ass open on the dildo. You keep ${him} up there until ${his} legs give out`);
				if (eventSlave.belly >= 10000 || eventSlave.weight > 190) {
					r.push(`and ${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`gravid`);
					}
					r.push(`weight pins ${him} on the toy;`);
				} else {
					r.push(r.pop() + `, and`);
				}
				r.push(`then let ${him} lie down on`);
			}
			r.push(`the couch, telling ${him} to keep working the dildo with ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} or suffer another whipping. After ${he}'s had ${his} ass filled for a good while, ${he} has no trouble taking a`);
			if (PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`real dick`);
			}
			r.push(`for the first time, and is by this point too exhausted to do anything but lie there and be a good little anal slave. <span class="gold">${He} fears you,</span> and <span class="lime">${his} butthole has been broken in.</span>`);
			eventSlave.trust -= 5;
			eventSlave.anus = 1;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function choose() {
			r = [];
			r.push(`You tell ${him} ${he}'s a sex slave, and that ${he} needs to learn how to take a dick up the ass.`);
			if (!canTalk(eventSlave) && hasAnyArms(eventSlave)) {
				r.push(`${He} frantically begs with gestures, pleading`);
				if (hasBothLegs(eventSlave)) {
					r.push(`on ${his} knees.`);
				} else {
					r.push(`desperately.`);
				}
			} else if (!canTalk(eventSlave)) {
				r.push(`${He} frantically mouths pleas that you leave ${his} butt alone.`);
			} else {
				r.push(
					`${He} begs,`,
					Spoken(eventSlave, `"Please no, ${Master}, please don't rape me in my ass, ${Master}!"`)
				);
			}
			r.push(`You make a show of considering, and then tell ${him} you know a way ${he} can continue being an anal virgin — for now. You want a new hole to play with, and ${he} has two untouched holes. ${He} gasps when ${he} realizes what you want. ${He} hesitates to answer, uncertain of which ${he} values more, and finds ${himself} bound to the couch`);
			if (eventSlave.chastityAnus) {
				r.push(r.pop() + `, stripped of ${his} chastity,`);
			}
			r.push(`and thoroughly whipped. It isn't a sexual whipping, either, but a methodical and scientific administration of pain right up to the border of damage. When ${he}'s been reduced to a state of abject, sobbing surrender, you free ${him} and repeat your orders as though nothing had happened. Still crying, ${he} prostrates ${himself} and`);
			if (eventSlave.trust < 20) {
				r.push(`spreads ${his} butt for you.`);
			} else {
				r.push(`${his} pussylips for you.`);
			}
			r.push(`You callously ram a dildo into ${his} fresh hole and tell ${him} to keep working ${himself} with it or suffer another whipping. After ${he}'s fucked ${himself} for a good while, ${he} has no trouble taking a`);
			if (PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`real dick`);
			}
			r.push(`for the first time, and is by this point too exhausted to do anything but lie there and take it a good little slave. <span class="trust dec">${He} fears you</span> but <span class="devotion inc">loses ${himself} to your rule.</span>`);
			if (eventSlave.trust < 20) {
				r.push(`<span class="virginity loss">${His} butthole has been broken in.</span>`);
				eventSlave.anus = 1;
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`<span class="virginity loss">${His} pussy has been broken in.</span>`);
				eventSlave.vagina = 1;
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			eventSlave.trust -= 5;
			eventSlave.devotion += 3;
			return r;
		}
	}
};
