// cSpell:ignore omnisexually

App.Events.RESSFrighteningDick = class RESSFrighteningDick extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.dick > 0,
			() => V.PC.belly < 5000
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canMove,
				canTalk,
				s => s.assignment === Job.HOUSE,
				s => s.attrXY <= 35 || s.behavioralFlaw === "hates men" || s.sexualFlaw === "repressed",
				s => s.trust > 20,
				s => s.devotion >= -20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const {say, title: Master} = getEnunciation(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push("In a fortuitous confluence of circumstances,");
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`happens to be polishing your office one evening. Keeping every surface in the penthouse at a state of perfect shine is one of your servants' endless tasks, and your office is ${his} area of responsibility today. At the key moment, ${he}'s working on an area at waist height, directly next to the door that leads to your suite; and ${he}'s crouching to polish this area most comfortably. ${He} is working diligently, and is paying close attention to what ${he}'s doing. Meanwhile, and for completely unrelated reasons, you have just finished having fun inside said suite. You are naked, and your penis remains fully erect despite your having climaxed only moments before; you are in excellent physical and sexual condition and this happens frequently. You have decided to address a likewise unrelated matter in your office, and walk into it from your suite, naked and erect.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`This is how ${eventSlave.slaveName} comes face to face with your cock, unexpectedly, at a distance of only a few ${V.showInches === 2 ? "inches" : "centimeters"}.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${He} shrieks, backpedaling, and then falls backward, ${his}`);
		if (eventSlave.butt > 6) {
			t.push("monstrous bottom");
		} else if (eventSlave.butt > 3) {
			t.push("healthy rear end");
		} else {
			t.push("cute butt");
		}
		t.push(
			`hitting the floor with an audible whack. The light cloth ${he} was using to polish with went flying, and flutters to the ground accusingly. After scrabbling back a short distance, looking up at you hesitantly, and visibly recollecting ${himself}, ${he} swallows twice and then ${say}s,`,
			Spoken(eventSlave, `"I'm sorry, ${Master},"`),
			`in a tone of voice with a great deal of effort applied to keep it even. A frantic, embarrassed search for ${his} cloth ensues. Finding it at last, ${he} returns to ${his} original, low position, and crouch-walks back to the place ${he} was polishing, doing ${his} absolute best to look diligent and industrious and not at all aware that your cock is pointing at ${him} like a gun barrel.`
		);
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result("Polish this", polish),
			new App.Events.Result(`Talk to ${him} about ${his} issues with dick`, coach),
			canDoAnal(eventSlave) || canDoVaginal(eventSlave)
				? new App.Events.Result(`Rape ${him}`, rape, virginityWarning())
				: new App.Events.Result()
		]);

		function polish() {
			t = [];

			t.push(`You tell ${him} to polish this instead, advancing even closer. ${He} turns, finding your cockhead so close to ${his} face that ${his} eyes cross ludicrously as they attempt to focus on it. ${He} does not like dicks, and obviously does not find the prospect of sucking this one appealing right now, but ${he} knows it's in ${his} best interests to ${eventSlave.skill.oral > 10 ? `put ${his} oral knowledge to work` : `do ${his} best`} right now. ${He} closes ${his} eyes and takes you into ${his} mouth, forming a seal around your cock with ${his}`);
			if (eventSlave.lips > 40) {
				t.push(`ridiculous`);
			} else if (eventSlave.lips > 20) {
				t.push(`pillowy`);
			} else if (eventSlave.lips > 10) {
				t.push(`pretty`);
			} else {
				t.push(`disappointingly thin`);
			}
			t.push(`lips before starting to suck dick. Dissatisfied with ${his} reluctance, you order ${him} to open ${his} eyes and look up at you; ${he} obeys, the ${App.Desc.eyesColor(eventSlave, "", "orb", "orbs")} glittering with a little moisture as ${he} concentrates on breathing past your penis. You ask if your cock ${canTaste(eventSlave) ? "tastes" : "feels"} any different than usual. "Mmm hmm, M'," ${he} mumbles, producing a nice humming sensation against your cock. You tell ${him} that ${he}'s ${canTaste(eventSlave) ? "tasting" : "feeling"} another slave's ${eventSlave.vagina > -1 ? "pussy" : "ass"}. ${He} gags, but only slightly, and controls ${himself} immediately. Your dick is desensitized from vigorous use, and ${he} has to suck it a long time before you cup the back of ${his} head, ram yourself all the way in, and blow your load straight down ${his} gullet. You tell ${him} ${he}'s a good ${desc}. "Thank you, ${Master}," ${he} ${say}s <span class="hotpink">submissively,</span> going back to ${his} polishing.`);

			seX(eventSlave, "oral", PC, "penetrative");
			eventSlave.devotion += 5;
			return t;
		}

		function coach() {
			t = [];

			t.push(`You sit yourself down in the doorway, right next to ${him}, and pat your thighs. ${He} sits on your lap, obeying despite some evident reluctance to sit atop your moist cock. It nestles easily between ${his} lower buttocks and upper thighs, and ${he} gets ${himself} situated, doing ${his} best to ignore the feeling of your hot hard meat, hard against ${his} fundament. You encircle ${him} with your arms, possessively and dominantly but not sexually, and tell ${him} that you're concerned about ${his} relationship with cock. ${He} shifts uncomfortably. "${Spoken(eventSlave, `Sorry, ${Master}, sorry I'm not better at hiding that. I should be a good ${desc} and not react like that. I mean, in a bad way. You startled me, but I don't always react well to dick even when I'm not startled. I'll try harder.`)}" This is more contrition and submission than you were expecting, and you probe further, asking ${him} pointedly whether ${he}'s attracted to dicks now. "N-no," ${he} admits, after only a moment's hesitation to remember that honesty is the most important rule for ${him} to follow. "${Spoken(eventSlave, `No, I don't like them. But I'll do my best to be a good sex slave anyway, ${Master}.`)}" Pleased, you tell ${him} that things will get easier for ${him}.`);
			if (eventSlave.hormoneBalance >= 50) {
				t.push(`The hormone treatments ${he}'s currently taking will slowly reorient ${his} sexuality, and eventually ${he}'ll lust after every cock ${he} sees.`);
			} else if (eventSlave.aphrodisiacs > 0 || eventSlave.inflationType === "aphrodisiac") {
				t.push(`The aphrodisiacs ${he}'s on will make ${him} so omnisexually horny that soon ${he} won't care how anyone's equipped, as long as they'll fuck ${him}.`);
			} else if (eventSlave.energy > 60) {
				t.push(`${His} excellent and improving libido will eventually soften ${him} to all kinds of sex, with all kinds of people.`);
			} else {
				t.push(`Habit and training will get ${him} used to dick, and eventually ${he}'ll barely remember that ${he} ever had a problem with sucking a quick cock.`);
			}
			t.push(`${He}'s a little unsure whether or not to be reassured by this, but ${he}'s <span class="mediumaquamarine">relieved ${he}'s not in trouble.</span>`);

			eventSlave.trust += 5;
			return t;
		}

		function rape() {
			t = [];

			t.push(`Sometimes there's really no need to overthink things. You reach down, grab ${him} under the armpits, and haul ${him} up, throwing ${him} across your desk. ${He} lands on ${his} back, and the impact drives the wind out of ${him}, so ${he} lies there, <span class="gold">all possibility of resistance driven out of ${him}.</span> ${App.Data.clothes.get(eventSlave.clothes).exposure >= 4 ? `${He}'s already naked, so there's no need to` : "You"} tear the clothes off ${him}. You force yourself in between ${his} legs as ${he} struggles to get ${his} breath back, and ${he} gets another good look at the formidable dick that's about to be slammed inside ${him}`);
			if (eventSlave.belly >= 5000) {
				t.push(`before it disappears beneath ${his} ${eventSlave.bellyPreg >= 3000 ? "pregnant" : belly} belly`);
			}
			t.push(t.pop() + `. ${His} eyes go wide with fear, and you enhance the effect by smacking yourself against`);
			if (canDoVaginal(eventSlave)) {
				t.push(`${his} ${eventSlave.vagina === 0 ? "virgin" : ""} vulva.`);
			} else if (eventSlave.dick > 0) {
				t.push(`limp bitchclit.`);
			} else {
				t.push(`${his} buttocks.`);
			}
			t.push(`You tell ${him} not to worry, because you're still pretty wet from the last slave you fucked, so this shouldn't hurt too much. Then you ram your cock`);
			if (eventSlave.vagina > 0) {
				t.push(`inside ${him}.`);
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				t.push(`up ${his} spasming ass.`);
				t.push(VCheck.Anal(eventSlave, 1));
			}
			t.push(`${He} whines and bucks, but ${he}'s entirely at your mercy. ${He} doesn't like dicks, and to go by ${his} facial expression as you piston in and out of ${him}, this experience isn't going to make ${him} reconsider. When you fill ${him} with cum, pull out, and let ${him} retreat to clean ${himself} up, ${he}'s relieved to go.`);

			eventSlave.trust -= 5;
			return t;
		}

		function virginityWarning() {
			if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0 && !canDoVaginal(eventSlave)) {
				return `This option will take ${his} anal virginity`;
			}
		}
	}
};
