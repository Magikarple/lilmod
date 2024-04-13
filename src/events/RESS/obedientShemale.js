App.Events.RESSObedientShemale = class RESSObedientShemale extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.rules.release.masturbation !== 0,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				canDoAnal,
				s => s.devotion <= 50,
				s => s.devotion > 20 || s.trust < -20,
				s => s.vagina < 0,
				s => s.dick > 0,
				s => s.anus > 0,
				s => s.skill.anal <= 30
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const anusDesc = eventSlave.anus > 2 ? "gaping" : (eventSlave.anus > 1 ? "loose" : "tight");
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`has been doing ${his} best to be a good slave ${girl} recently. Since ${he} doesn't have a pussy, that means ${he}'s been doing ${his} best to take it up the ass like a good slave. ${He} isn't all that used to it yet, but ${he} tries. ${He}'s trying right now, bent over the arm of the couch in your office with your ${PC.dick === 0 ? "vibrating strap-on" : "cock"} pumping in and out of ${him}. ${He} looks like ${he} wants to ask something, so you tell ${him} to spit it out.`);
		if (canTalk(eventSlave)) {
			if (eventSlave.lips > 70) {
				t.push(`${He} begs meekly through ${his} massive dick-sucking lips,`);
			} else if (eventSlave.piercing.lips.weight + eventSlave.piercing.tongue.weight > 2) {
				t.push(`${He} begs meekly through ${his} mouthful of piercings,`);
			} else {
				t.push(`${He} begs meekly,`);
			}
			t.push(`"${Spoken(eventSlave, `${Master}, may I please, please touch myself?`)}"`);
		} else {
			t.push(`${He} uses gestures to ask if ${he} can masturbate while you sodomize ${him}.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him}`, permit),
			new App.Events.Result(`Train ${him} to be a skilled anal bottom`, bottom),
			(eventSlave.fetish !== "buttslut" || eventSlave.fetishKnown !== 1) && eventSlave.prostate > 0
				? new App.Events.Result(`Train ${him} to orgasm anally`, orgasm)
				: new App.Events.Result()
		]);

		function permit() {
			t = [];

			t.push(`${He} moans with gratitude and relief. ${He} masturbates furiously as you continue to use ${his} butt. ${He} was clearly near the edge anyway, and`);
			if (eventSlave.balls > 0) {
				t.push("spatters the couch with cum");
			} else if (eventSlave.prostate > 0) {
				t.push("spatters the couch with ejaculate");
			} else {
				t.push("shakes with release");
			}
			t.push(`after just a few strokes of your ${PC.dick === 0 ? "strap-on" : "cock"} up ${his} butt. ${His} ${anusDesc} ass spasms and tightens with ${his} climax${PC.dick !== 0 ? ", a wonderful sensation" : ""}. You aren't finished with ${him}, but ${he} rubs ${himself} languidly and enjoys the hard anal reaming more than ${he} ever has previously. ${His} devotion to you <span class="hotpink">has increased.</span>`);
			t.push(VCheck.Anal(eventSlave, 1));

			eventSlave.devotion += 4;
			return t;
		}

		function bottom() {
			t = [];

			t.push(`${He} obeys your orders to keep ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} off ${his} dick, but can't hide ${his} disappointment and frustration. You keep a close watch on ${him}, and buttfuck ${him} every chance you get, teaching ${him} the finer points of taking a ${PC.dick === 0 ? "strap-on" : "dick"} up the butt. You focus entirely on your pleasure, teaching ${him} how to use ${his} ${anusDesc} anal ring to extract orgasms from cocks. This experience was hard for ${him} but has increased ${his} anal skill.`);
			t.push(VCheck.Anal(eventSlave, 9));

			slaveSkillIncrease('anal', eventSlave, 10);
			return t;
		}

		function orgasm() {
			t = [];

			t.push(`${He} obeys your orders to keep ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} off ${his} dick, but can't hide ${his} disappointment and frustration. You keep a close watch on ${him}, and fuck ${his} ${anusDesc} anus every chance you get, keeping ${him} desperately aroused and desperately sodomized. After some days of this, ${he} finally reaches a point of desperate arousal that permits ${him} to orgasm to prostate stimulation alone.`);
			if (fetishChangeChance(eventSlave) > jsRandom(1, 100)) {
				t.push(`Before ${he} realizes what's happening, <span class="lightcoral">${he}'s getting aroused at the thought of anal sex.</span>`);

				eventSlave.fetishStrength = 10;
				eventSlave.fetish = "buttslut";
				eventSlave.fetishKnown = 1;
			} else {
				t.push(`Despite being used as an anal slut for a whole week, ${he} was not significantly affected.`);
			}

			t.push(VCheck.Anal(eventSlave, 9));
			return t;
		}
	}
};
