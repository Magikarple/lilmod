App.Events.RESSHeels = class RESSHeels extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => (canDoAnal(s) || canDoVaginal(s)),
				s => s.heels === 1, // tendons are shortened
				s => shoeHeelCategory(s) > 0 // changed during conversion; previously accepted only "heels" and "extreme heels"
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave);
		node.appendChild(artDiv);

		let r = [];
		r.push(
			`Since`,
			App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "'s"),
			`tendons were shortened, forcing ${him} to wear heels in order to walk, ${he}'s permanently subject to your whims in shoe selection. ${He} walks carefully into your office, the sway of ${his} hips greatly`
		);
		if (eventSlave.bellyPreg >= 10000) {
			r.push(`exaggerated, even more so with ${his} advanced pregnancy.`);
		} else if (eventSlave.bellyImplant >= 10000) {
			r.push(`exaggerated, even more so with the weight of ${his} ${belly} middle.`);
		} else if (eventSlave.bellyFluid > 5000) {
			r.push(`exaggerated, even more so under the weight of ${his} ${eventSlave.inflationType}-swollen middle.`);
		} else {
			r.push(`exaggerated.`);
		}
		if (eventSlave.dick !== 0) {
			r.push(`The modification certainly forces ${him} to walk more like someone without a cock.`);
		}
		if (eventSlave.belly >= 300000) {
			r.push(`${He} struggles to lower ${his} tired, heavy body onto the couch next to your desk, shakes off ${his} heels since ${he} has long since become incapable of reaching ${his} feet,`);
		} else if (eventSlave.belly >= 100000) {
			r.push(`${He} lowers ${his} tired, heavy body onto the couch next to your desk, shakes off ${his} heels as bending over has become troublesome lately,`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`${He} rests ${his} tired,`);
			if (eventSlave.bellyPreg >= 8000) {
				r.push(`gravid`);
			} else {
				r.push(`rounded`);
			}
			r.push(`body on the couch next to your desk, shakes off ${his} heels,`);
		} else if (eventSlave.belly >= 5000) {
			r.push(`${He} seats ${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`gravid`);
			} else {
				r.push(`rounded`);
			}
			r.push(`body on the couch next to your desk, takes off ${his} heels,`);
		} else {
			r.push(`${He} sits on the couch next to your desk, takes off ${his} heels,`);
		}
		r.push(`and opens the shoebox you've placed next to ${him}, to find:`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Nothing, ${he}'ll crawl for the rest of the week`, crawl, virginityWarning()),
			new App.Events.Result(`Pretty heels, we're going out`, out),
			canDoAnal(eventSlave)
				? new App.Events.Result(`Heels for an anal slut`, slut, virginityWarning(true))
				: new App.Events.Result(),

		]);

		function virginityWarning(analOnly = false) {
			if (!analOnly) {
				if ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))){
					return `This option will take ${his} virginity`;
				}
			} else if (eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				return `This option will take ${his} virginity`;
			}
		}

		function crawl() {
			r = [];
			r.push(`${He} is surprised`);
			if (canSee(eventSlave)) {
				r.push(`to see the box is empty.`);
			} else {
				r.push(`when ${he} reaches into the box and finds nothing.`);
			}
			r.push(`By the time ${he} realizes what this means, you've already confiscated ${his} old heels and seated yourself at your desk. Ordered to suck, ${he} comes gingerly over`);
			if (hasAllLimbs(eventSlave)) {
				r.push(`on all fours,`);
			} else {
				r.push(`while crawling on the ground,`);
			}
			if (eventSlave.belly >= 100000) {
				r.push(`${his} belly dragging along the floor,`);
			} else if (eventSlave.belly >= 10000) {
				r.push(`${his} swollen belly getting in ${his} way,`);
			}
			r.push(`and gets you off with ${his} whore's mouth. The rest of the week is a trying experience for ${him}. The most comfortable posture for ${him} to walk along in`);
			if (hasAllLimbs(eventSlave)) {
				r.push(`on all fours`);
			}
			r.push(`displays ${his}`);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`holes nicely and you frequently avail yourself to which ever is more tempting at the time.`);
				r.push(VCheck.Both(eventSlave, 5, 5));
			} else if (canDoVaginal(eventSlave)) {
				r.push(`pussy nicely, so ${he} gets it in ${his} feminine fold a lot.`);
				r.push(VCheck.Vaginal(eventSlave, 10));
			} else {
				r.push(`anus nicely, so ${he} gets it up ${his}`);
				if (V.seeRace === 1) {
					r.push(`${eventSlave.race}`);
				}
				r.push(`ass a lot.`);
				r.push(VCheck.Anal(eventSlave, 10));
			}
			if (eventSlave.dick !== 0) {
				r.push(`The effort it takes to move usually keeps ${his} dick soft as ${he} does, so it flops around beneath ${him} all week.`);
			}
			r.push(`<span class="devotion inc">${He} has become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			eventSlave.shoes = "none";
			return r;
		}

		function out() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "no clothing");
			r = [];
			r.push(`You have an appointment, and ${eventSlave.slaveName} gets to be your arm candy. ${He}'s almost beside ${himself} with pride when you leave the penthouse and head out into the warm sun. You have to walk slowly so ${he} can keep ${his} feet steady and still keep up, since you've taken the unusual step of rewarding ${him} by letting ${him} walk under your arm. To avoid giving the impression that the ${girl} on your arm isn't a slave, ${he}'s naked except for ${his} lovely heels. As ${he} minces along ${his} breasts`);
			if (eventSlave.bellyFluid >= 5000) {
				r.push(`jiggle delightfully alongside ${his} ${eventSlave.inflationType}-filled belly`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`jiggle delightfully atop ${his} gravid belly`);
			} else {
				r.push(`sway freely`);
			}
			r.push(`and draw the respectful admiration of onlookers.`);
			if (eventSlave.dick !== 0) {
				r.push(`Most of the female onlookers and some of the men also spare an eye for ${his} swinging dick.`);
			}
			r.push(`<span class="trust inc">${His} trust in you has increased.</span>`);
			eventSlave.trust += 4;
			return r;
		}

		function slut(){
			r = [];
			r.push(`${eventSlave.slaveName} is a little perplexed to find that the heels look quite normal, though they're very tall. When ${he} tries them on, however, standing requires ${him} to splay ${his} hips slightly so that ${his}`);
			if (V.seeRace === 1) {
				r.push(eventSlave.race);
			}
			r.push(`butt is a little spread even when ${he} stands upright. What's more, the heels are tall to raise ${his} butt to the exact level`);
			if (V.PC.dick === 0) {
				r.push(`a strap-on is at when you wear one and`);
			} else {
				r.push(`your cock is at`);
			}
			r.push(`when you stand behind ${him}. When you start demonstrating the advantages of this to ${him}, the heels detect that the wearer is being fucked, begin to play a light show, and start playing a heavy beat in time with your thrusts. ${He} would laugh if ${he} weren't concentrating on the buttsex. <span class="devotion inc">${His} submission to you has increased.</span>`);
			eventSlave.devotion += 4;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}
	}
};
