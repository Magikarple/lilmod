App.Events.RESSResistantShower = class RESSResistantShower extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.devotion <= 20,
				s => s.devotion >= -50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		App.Events.addParagraph(node, [
			`Though ${V.assistant.name} constantly monitors all your slaves, you keep an eye on the video feeds yourself. There's nothing like the personal, human touch. You notice one night that`,
			contextualIntro(V.PC, eventSlave, true),
			`is crouched in the bottom of the shower. Sensing something amiss, you discreetly investigate, and find that ${he}'s crying quietly under the warm water.`
		]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Enter the shower and quietly comfort ${him}`, comfort),
			new App.Events.Result(`Talk through ${his} problems with ${him}`, talk),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Use ${him} when ${he} gets out`, out, ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
		]);

		function comfort() {
			let r = [];
			r.push(`${He} starts with surprise`);
			if (canSee(eventSlave)) {
				r.push(`as you enter the shower,`);
			} else if (canHear(eventSlave)) {
				r.push(`as ${he} hears you enter the shower,`);
			} else {
				r.push(`as ${he} feels the water being disturbed by your body,`);
			}
			r.push(`and then`);
			if (canSee(eventSlave)) {
				r.push(`looks at`);
			} else {
				r.push(`turns to`);
			}
			r.push(`you in shock as you sit down beside ${him}, ignoring the water soaking your clothes. ${He} does not resist when you draw ${him} gently into your lap. ${He}'s stiff and uncomfortable as you hold ${him} gently, but ${he} eventually relaxes and allows ${his} head to rest`);
			if (V.PC.boobs >= 300) {
				r.push(`between your breasts.`);
			} else {
				r.push(`against your shoulder.`);
			}
			r.push(`${He}'s utterly conflicted; the hateful person who ${he} is expected to fuck is tenderly comforting ${him}. ${He} finally seems to accept the animal comfort, whatever its source, and begins to <span class="trust inc">trust</span> you to do more than just use ${him}.`);
			eventSlave.trust += 4;
			return r;
		}

		function talk() {
			const frag = document.createDocumentFragment();
			let r = [];
			r.push(`You enter the bathroom and quietly wait until ${he}'s done. When the water shuts off, ${he} stands up absently and spins so the shower's air dry function can blow the water off ${him}. You can't help but notice`);
			if (eventSlave.weight > 30) {
				r.push(`a lot of motion across ${his}`);
				if (eventSlave.weight > 190) {
					r.push(`expansive`);
				} else if (eventSlave.weight > 130) {
					r.push(`fat`);
				} else if (eventSlave.weight > 95) {
					r.push(`thick`);
				} else {
					r.push(`chubby`);
				}
				r.push(`body when the air jets play across ${him}.`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`how firm ${his} ${belly} belly is.`);
			} else if (eventSlave.dick > 1) {
				r.push(`${his} soft cock flop around as one of the air jets strikes it.`);
			} else if (eventSlave.boobs > 800) {
				if ((eventSlave.boobsImplant/eventSlave.boobs) >= .60) {
					r.push(`how ${his} fake tits refuse to jiggle under the air jets.`);
				} else {
					r.push(`how the air jets produce a lot of delectable jiggling when they strike ${his} boobs.`);
				}
			} else if (eventSlave.butt > 4) {
				r.push(`how ${he} has to spread ${his} big buttcheeks to let an air jet dry between them.`);
			} else if (eventSlave.labia > 0) {
				r.push(`how one of the air jets creates some motion in ${his} generous labia.`);
			} else if (eventSlave.muscles > 5) {
				r.push(`how the air jets make ${his} taut abs look even more impressive.`);
			} else {
				r.push(`${his} nipples`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`stiffen`);
				} else {
					r.push(`engorge`);
				}
				r.push(`under the air jets.`);
			}
			r.push(`As ${he} rotates,`);
			if (canSee(eventSlave)) {
				r.push(`${he} notices you with a start and looks concerned, but you do your best to look reassuring and beckon`);
			} else {
				r.push(`you gently call ${his} name. ${He} jumps at the sound of your voice and looks concerned, but you do your best to calm ${him} and gingerly coax`);
			}
			r.push(`${him} out of the shower.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`You ask ${him} what's troubling ${him}, and the look of concern returns. Suspecting that ${he}'s afraid of telling the truth, you gently encourage ${him} to be honest, and assure ${him} that you're simply taking an interest in ${his} well-being. ${He} still hesitates, but eventually sniffles a little and`);
			if (!canTalk(eventSlave)) {
				r.push(`reluctantly gestures,`);
			} else if (SlaveStatsChecker.checkForLisp(eventSlave)) {
				r.push(`lisps,`);
			} else {
				r.push(`admits,`);
			}
			if (eventSlave.sexualFlaw === "hates oral" && eventSlave.counter.oral > 0) {
				r.push(Spoken(eventSlave, `"It's nothing special, ${Master}. I just h-hate getting facefucked."`));
			} else if (eventSlave.sexualFlaw === "hates anal" && eventSlave.counter.anal > 0) {
				r.push(Spoken(eventSlave, `"It's nothing special, ${Master}. I just h-hate getting assraped."`));
			} else if (eventSlave.sexualFlaw === "hates penetration" && eventSlave.counter.vaginal > 0) {
				r.push(Spoken(eventSlave, `"It's nothing special, ${Master}. I just h-hate getting fucked."`));
			} else if (eventSlave.behavioralFlaw === "hates women") {
				r.push(Spoken(eventSlave, `"Sorry, ${Master}. I just h-hate girls. They're gross."`));
			} else if (eventSlave.behavioralFlaw === "hates men") {
				r.push(Spoken(eventSlave, `"Sorry, ${Master}. I just h-hate cocks. I don't want to see another one, ever again."`));
			} else if ((eventSlave.sexualFlaw === "idealistic") && (eventSlave.counter.oral + eventSlave.counter.anal + eventSlave.counter.vaginal + eventSlave.counter.mammary > 0)) {
				r.push(Spoken(eventSlave, `"I feel like I'm going crazy, ${Master}. No one here seems to know that rape is wrong. Th-they just r-rape me."`));
			} else if (eventSlave.sexualFlaw === "shamefast") {
				r.push(Spoken(eventSlave, `"I want to cover myself so badly, ${Master}. I'm so embarrassed all the time. I'm so tired of being embarrassed."`));
			} else if ((eventSlave.sexualFlaw === "repressed") && (eventSlave.counter.oral + eventSlave.counter.anal + eventSlave.counter.vaginal + eventSlave.counter.mammary > 0)) {
				r.push(Spoken(eventSlave, `"I'm filthy, ${Master}. I've been used, and I can't ever be clean again. I'm a d-dirty, sinful whore."`));
			} else {
				r.push(Spoken(eventSlave, `"Sorry, ${Master}. I was just r-remembering, b-before — all this."`));
			}
			r.push(`You tell ${him} kindly that you understand, and that ${he}'ll be trained to address this. Then, you turn and go. ${He}'s mystified; though ${he}'s not overjoyed by the promise of correction, ${he} finds ${himself} <span class="devotion inc">less resistant</span> to following your plans.`);
			eventSlave.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function out() {
			let r = [];
			r.push(`Eventually ${he} finishes and switches the shower to dry. The airflow dries ${him} and ${he} steps out, but as ${he} does, ${he}'s seized and flung over the countertop with a slap as ${his} naked, ${eventSlave.skin}`);
			if (eventSlave.belly >= 5000) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly`);
			} else {
				r.push(`skin`);
			}
			r.push(`hits the surface.`);
			const yourself = V.PC.dick === 0 ? `your vibrating strap-on` : `yourself`;
			if (eventSlave.vagina > -1 && !canDoVaginal(eventSlave)) {
				r.push(`With ${his} chastity belt protecting ${his} pussy, you ram ${yourself} up ${his} ass instead, drawing a pained sob.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`You ram ${yourself} up ${his} ass, drawing a pained sob.`);
			} else if (!canDoAnal(eventSlave)) {
				r.push(`You ram mercilessly into ${his} cunt, forcing a few gasps out of ${him} before it sinks in that this is happening.`);
			} else {
				r.push(`You take ${his} silly cunt just long enough to force a few gasps out of ${him} before you pull out and ram ${yourself} up ${his} ass, drawing a pained sob.`);
			}
			r.push(`As ${he} takes the pounding sullenly,`);
			if (canSee(eventSlave)) {
				r.push(`${he} has a direct view of ${his} own eyes in the mirror, and clearly <span class="trust dec">is disturbed by what ${he} sees.</span>`);
			} else if (canHear(eventSlave)) {
				r.push(`${he} can hear nothing but the sound of ${his} brutal rape, and clearly <span class="trust dec">is disturbed by what ${he} hears.</span>`);
			} else {
				r.push(`${his} blindness and deafness mean that one of the few things ${he} can feel is ${his} own rape, which <span class="trust dec">disturbs ${him} to no end.</span>`);
			}
			eventSlave.trust -= 5;
			r.push(VCheck.Both(eventSlave, 1));
			return r;
		}
	}
};
