App.Events.RESSDevotedFearfulSlave = class RESSDevotedFearfulSlave extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				canWalk,
				canSee,
				canHear,
				hasAnyArms,
				s => s.devotion >= 50,
				s => s.trust <= 20
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		let t = [];

		const {
			He, he, him, his, himself, girl
		} = getPronouns(eventSlave);

		App.Events.drawEventArt(node, eventSlave);
		t.push(`You are working late tonight, poring over some particularly troublesome business documents — though, thankfully, the end appears to be in sight. The sun has all but completely slipped below the horizon, drowning your office in moody twilight. Seeing that you are finally approaching the end of a long day, ${V.assistant.name} takes the liberty of having a`);

		if (V.PC.refreshmentType === 1) {
			t.push(`glass of`);
		} else if (V.PC.refreshmentType === 2) {
			t.push(`plate of`);
		} else if (V.PC.refreshmentType === 3) {
			t.push(`line of`);
		} else if (V.PC.refreshmentType === 4) {
			t.push(`syringe of`);
		} else if (V.PC.refreshmentType === 5) {
			t.push(`pill of`);
		} else if (V.PC.refreshmentType === 6) {
			t.push(`tab of`);
		}

		t.push(`${V.PC.refreshment} brought in to you. This time`, contextualIntro(V.PC, eventSlave, true), `has been sent to deliver it. ${He} loves you, but fears you simultaneously. Such relationships were not uncommon before the advent of modern slavery, but they are especially prevalent in its wake, as fear has proven a highly effective control method for those slaveowners with the inclination and relative lack of conscience to utilize it as such. You hurriedly put the finishing touches on your work, eager to be done, and then reach for your ${V.PC.refreshment}. ${eventSlave.slaveName} flinches at your sudden movement, taking a few frightened steps back, nearly dropping the serving tray and leaving you grasping at thin air. It was a simple fear response; ${he} didn't realize you were ready for your treat and instinctively thought you were reaching out to strike ${him}. Tears well up in ${his} eyes as ${he} apologizes profusely.`);

		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Comfort ${him}`, comfort),
			new App.Events.Result(`Gently reassure ${him}`, reassure),
			new App.Events.Result(`Vindicate ${his} fears`, vindicate),
		]);

		function comfort() {
			t = [];

			t.push(`You set the ${V.PC.refreshment} aside on your desk for now, and take ${him} gently by the hand. You lead ${him} out onto the balcony of the penthouse over to the railing. ${He} obediently assumes a position for you, bracing ${his} arm${hasBothArms(eventSlave) ? 's' : ''} on the railing, arching ${his} back and sticking ${his} bottom out to present ${himself} for use. Much to ${his} surprise, your hand guides ${him} back into a comfortable position, and simply pulls ${him} close into you. You explain to ${him} that ${he} is a good ${girl} who tries ${his} best, and that you don't want ${him} to fear you. After a little coddling, you fall silent, and simply hold ${him} tight, watching the street lights of ${V.arcologies[0].name} blink to life one after the other, slowly transforming the arcology into a vibrant, elegant light show. ${eventSlave.slaveName} can hardly believe what's happening, but eventually is able to relax fully, melting into your arms like butter into a hot pan. ${He} rests ${his} head lovingly against your chest and silently appreciates the view with you. When ${he} eventually departs, ${he} does so with <span class="devotion inc">tears of joy,</span> <span class="trust inc">rather than fear,</span> welling behind ${his} eyes.`);

			eventSlave.devotion += 15;
			eventSlave.trust += 15;
			return t;
		}

		function reassure() {
			t = [];

			t.push(`You set the ${V.PC.refreshment} aside on your desk for now, and take ${him} gently by the shoulders. You assure ${him} that ${he} is a good ${girl} who tries ${his} best, and that ${he} won't be hurt so long as ${he} remains well behaved. You affectionately stroke ${his} shoulders with your thumbs as you speak in a further attempt to calm ${him} down. ${He} is highly receptive to your soothing touch and kind words. ${He} dries ${his} eyes, gives you an <span class="devotion inc">affectionate kiss</span> and <span class="trust inc">thanks you prettily</span> before departing.`);

			eventSlave.devotion += 10;
			eventSlave.trust += 10;
			return t;
		}

		function vindicate() {
			t = [];

			t.push(`You set the ${V.PC.refreshment} aside on your desk, then, when the slave least expects, whirl around, delivering a fierce backhand slap to ${his} ${eventSlave.face >= -10 ? 'pretty' : 'homely'} face that nearly sends ${him} to the ground. You instruct ${him} to be more careful in future, and that you won't tolerate slaves that shy away from you for any reason, nor ones that are clumsy enough to nearly drop a serving tray while standing still. ${He} all but begs ${hasAllLimbs(eventSlave) ? `upon ${his} hands and knees` : 'and grovels'} for your forgiveness. You dismiss ${him} without further comment, and sit down to enjoy your evening refreshments. The battered, dejected slave slinks away, <span class="trust dec">choking down tears.</span> ${He} will be <span class="devotion inc">less careless</span> in the future.`);

			eventSlave.devotion += 10;
			eventSlave.trust -= 10;
			return t;
		}
	}
};
