// cSpell:ignore RESSPLimbHelp
App.Events.RESSPLimbHelp = class RESSPLimbHelp extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion > 50,
				s => s.trust > 20,
				s => s.assignment !== Job.CONCUBINE,
				s => s.assignment !== Job.MASTERSUITE,
				s => (getLimbCount(s, 102) === 4) // all limbs are prosthetics, and all limbs are present
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const {heA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		let artDiv = document.createElement("div");
		if (V.seeImages === 1) {
			const tempClone = clone(eventSlave); // Figured it would be safest not to mess with the actual slave, and instead amputate a temporary clone
			removeLimbs(tempClone, "all");
			App.Events.drawEventArt(artDiv, tempClone, "no clothing");
			node.appendChild(artDiv);
		}

		let r = [];
		r.push(`First thing in the morning,`);
		if (eventSlave.ID === V.BodyguardID) {
			r.push(`before you've even gotten out of bed, you hear`);
			r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "'s"));
			r.push(`voice coming up from where ${he} sleeps,`);
			if (V.dojo >= 1) {
				r.push(`in the armory watching over your suite.`);
			} else {
				r.push(`on ${his} own bedroll in your suite.`);
			}
			r.push(`There's a distinctly plaintive note in ${his} voice, and as soon as you sit up and look in ${his} direction, it's obvious why. ${He} sleeps out of ${his} P-Limbs, since it's good to rest the anchor points implanted into ${his} torso. They're held in actuators over ${his} bedroll, which can swing down and attach them to ${him} the instant ${he}'s awake. Except today, they're staying obstinately up near the ceiling.`);
			if (V.assistant.personality !== 0) {
				r.push(`${V.assistant.name} tells you ${heA}'s`);
			} else {
				r.push(`Your personal assistant informs you ${heA}'s`);
			}
			r.push(`troubleshooting the problem, but in the meantime, poor`);
		} else {
			r.push(`${V.assistant.name} informs you that there's a minor problem with`);
			r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), ","));
			r.push(`and asks whether you'd like it to be handled without you. ${He} sleeps out of ${his} P-Limbs, since it's good to rest the anchor points implanted into ${his} torso. When ${he} wakes up, ${he} usually asks whichever slave is nearest to attach ${his} dominant arm, at which point ${he} can do the rest ${himself}. Due to an unexpected change in the slaves' schedules, though, ${he}'s all alone today. Poor`);
		}
		r.push(`${eventSlave.slaveName} is left as a helpless,`);
		if (eventSlave.bellyImplant >= 100000) {
			r.push(`limbless, ${belly} womb.`);
		} else if (eventSlave.bellyFluid >= 100000) {
			r.push(`limbless, ${belly} balloon.`);
		} else if (eventSlave.bellyPreg >= 10000) {
			r.push(`limbless, heavily pregnant torso.`);
		} else if (eventSlave.bellyImplant >= 10000) {
			r.push(`limbless, nearly spherical torso.`);
		} else if (eventSlave.bellyFluid >= 10000) {
			r.push(`limbless, ${eventSlave.inflationType}-balloon.`);
		} else if (eventSlave.weight >= 130) {
			r.push(`limbless pile of flab.`);
		} else {
			r.push(`limbless torso.`);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Help ${him} into ${his} P-Limbs`, help),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Fuck ${him} before you help ${him}`, fuck, ((eventSlave.vagina === 0 && canDoVaginal(eventSlave)) || (eventSlave.anus === 0 && canDoAnal(eventSlave))) && V.PC.dick !== 0 ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
			(canPenetrate(eventSlave) && (V.PC.vagina > 0 || V.PC.anus > 0) && isPlayerReceptive(eventSlave))
				? new App.Events.Result(`Ride ${him} before you help ${him}`, ride, (V.PC.vagina > 0 ? PCPenetrationWarning("vaginal") : PCPenetrationWarning("anal")))
				: new App.Events.Result(),
		]);

		function help() {
			// replace slave art with limbs attached
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave);
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You decide to help ${him} yourself rather than having a slave do it.`);
			if (eventSlave.ID === V.BodyguardID) {
				r.push(`Swinging your legs out of bed and heading towards ${him},`);
			} else {
				r.push(`Heading towards ${his} part of the sleeping area,`);
			}
			r.push(`you're struck by how`);
			if (eventSlave.belly >= 5000) {
				r.push(`round`);
			} else {
				r.push(`small`);
			}
			r.push(`${he} looks without ${his} prosthetics. Just a little ${eventSlave.skin} thing, without the`);
			if (getLimbCount(eventSlave, 3) > 2) {
				r.push(`sexy artificial limbs that let ${him} delight anyone who fucks ${him} with vibrating fingertips.`);
			} else if (getLimbCount(eventSlave, 4) > 2) {
				r.push(`incredible artificial limbs so perfect that many mistake them for the real thing.`);
			} else if (getLimbCount(eventSlave, 5) > 2) {
				r.push(`armored artificial limbs that make ${him} a deadly war machine.`);
			} else if (getLimbCount(eventSlave, 6) > 2) {
				r.push(`advanced artificial limbs that let ${him} delight sexual partners, fight enemies, and even live a normal life.`);
			} else {
				r.push(`artificial limbs that allow ${him} a semblance of a normal life.`);
			}
			r.push(`${He}'s not frightened, trusting`);
			if (eventSlave.ID === V.BodyguardID) {
				r.push(`you to help ${him}, or detail a slave to do so.`);
			} else {
				r.push(`${V.assistant.name} to bring help.`);
			}
			r.push(`When ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else {
				r.push(`notices`);
			}
			r.push(`that you mean to assist ${him} yourself, ${he} breaks out in a huge grateful smile and thanks you profusely.`);
			App.Events.addParagraph(frag, r);

			r = [];
			if (eventSlave.ID === V.BodyguardID) {
				r.push(`First, you extricate ${his} limbs from the malfunctioning machine.`);
			}
			r.push(`As you take up ${his} first arm and kneel down to attach it to ${him}, ${he} rolls and hoists that shoulder up towards it, ${his}`);
			if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(`bloated`);
				}
				r.push(`body straining to twist`);
			} else if (eventSlave.muscles > 30) {
				r.push(`strong body easily twisting`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned body readily twisting`);
			} else {
				r.push(`soft body straining to twist`);
			}
			r.push(`on the sheet despite ${his} limblessness. When the gleaming halves of the attachment are`);
			if (V.showInches === 2) {
				r.push(`half an inch`);
			} else {
				r.push(`a few millimeters`);
			}
			r.push(`apart, the magnetic seals take over and pull them into perfect alignment. Acting out of pure habit, ${he} actuates all the muscle group equivalents on the arm, one by one, testing function.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`With one arm and the remaining three limbs within reach, ${he} can take care of ${himself}, but ${he} reaches out to touch your leg lightly from ${his} place on the ground.`);
			if (getRightArmID(eventSlave) === 4 || getRightArmID(eventSlave) === 6) {
				r.push(`The hand is just as soft and warm as ${his} original would have been.`);
			} else {
				r.push(`${His} hand is smooth and cool.`);
			}
			if (!canTalk(eventSlave)) {
				r.push(`${He} uses ${his} one hand to rapidly spell out a polite request. ${He} asks you to attach the rest of ${his} limbs, too.`);
			} else {
				r.push(Spoken(eventSlave, `"${Master}, would you please attach the rest of them for me?"`));
				r.push(`${he} asks politely.`);
			}
			r.push(`A transitory nervousness crosses ${his} ${eventSlave.faceShape} face as ${he} asks, but clears into <span class="trust inc">trusting happiness</span> when you nod and pick up ${his} other arm. ${He} tests each limb as it's attached, and then tests them all by getting up into a kneel and giving you a hug.`);
			eventSlave.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function fuck() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You decide to have some fun with the temporarily helpless slave. You`);
			if (eventSlave.ID === V.BodyguardID) {
				r.push(`get out of bed`);
			} else {
				r.push(`head to where ${he}'s waiting for help`);
			}
			r.push(`and scoop ${him} up, ${his} limblessness making it comically easy. With ${his} torso cradled in your grasp and ${his} head nestled into the crook of your arm, you carry ${him}`);
			if (eventSlave.ID === V.BodyguardID) {
				r.push(`back towards your bed.`);
			} else {
				r.push(`back towards your suite.`);
			}
			r.push(`When ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else {
				r.push(`figures out`);
			}
			r.push(`what you're doing, ${he} turns ${his} head and gives your`);
			if (V.PC.boobs >= 300) {
				r.push(`breast on that side`);
			} else {
				r.push(`chest`);
			}
			r.push(`an anticipatory kiss. When you set ${him} down on the bed, ${he}`);
			if (canSee(eventSlave)) {
				r.push(`stares`);
			} else {
				r.push(`smiles`);
			}
			r.push(`up at you invitingly and gives ${his} four P-Limb anchor points a glinting wiggle, a gesture that might mean anything. ${His}`);
			if (canDoVaginal(eventSlave)) {
				r.push(`pussy,`);
			} else {
				r.push(`asshole,`);
			}
			r.push(`in any case, is presented openly for your use.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`After fingering your helpless toy experimentally, you`);
			if (V.PC.dick !== 0) {
				if (canDoVaginal(eventSlave)) {
					r.push(`slide yourself inside ${him} and start fucking ${him}.`);
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					r.push(`push yourself up ${his} butt and start fucking ${him}.`);
					r.push(VCheck.Anal(eventSlave, 1));
				}
			} else {
				r.push(`straddle ${his} face, riding ${his} eager mouth while you use your hands on ${his}`);
				if (canDoVaginal(eventSlave)) {
					r.push(`cunt.`);
				} else {
					r.push(`hole.`);
				}
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			r.push(`${He} has no control at all, but ${he} trusts you not to hurt ${him} and is soon enjoying ${himself}. ${He} can't seem to stop ${himself} from trying to move P-Limbs that aren't there, forgetting that ${he}'s not wearing them whenever the arousal builds high enough to make ${him} forgetful. Eventually ${he} stops trying to restrain ${himself}, realizing that you're enjoying ${his} delicious wriggling beneath you. ${He} orgasms hard,`);
			if (V.PC.dick !== 0) {
				if (canDoVaginal(eventSlave)) {
					r.push(`the walls of ${his} pussy squeezing your shaft.`);
				} else {
					r.push(`${his} anus tightening around the base of your dick.`);
				}
			} else {
				r.push(`moaning ${his} climax into your pussy with abandon.`);
			}
			App.Events.addParagraph(frag, r);
			App.Events.addParagraph(frag, [`When you've climaxed yourself, ${he} looks back towards where ${his} P-Limbs are waiting, but you're not done with ${his} yet. You pick ${him} up again and bring ${him} into the shower. ${He} tries to help you, but again, ${he} gives up after a while, letting you wash ${him}. As you're rinsing the soap off ${him}, ${he} <span class="devotion inc">thanks you devotedly.</span> With the water streaming down ${his} face, you barely notice ${his} gentle tears.`]);
			eventSlave.devotion += 4;
			return frag;
		}

		function ride() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You decide to have some fun with the temporarily helpless slave. You`);
			if (eventSlave.ID === V.BodyguardID) {
				r.push(`get out of bed`);
			} else {
				r.push(`head to where ${he}'s waiting for help`);
			}
			r.push(`and kneel over ${him}, bringing yourself low enough that ${his} flaccid dick is nestled between your ${V.PC.vagina >= 0 ? "lips" : "cheeks"}. When ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else {
				r.push(`figures out`);
			}
			r.push(`what you're doing, ${he}`);
			if (canSee(eventSlave)) {
				r.push(`stares`);
			} else {
				r.push(`smiles`);
			}
			r.push(`up at you longingly and gives ${his} four P-Limb anchor points a glinting wiggle, a gesture that might mean anything. In any case, ${he}'s openly hard and ready for your use.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`After tormenting your helpless toy with some more grinding, you pick yourself up before slamming back down, spearing your`);
			if (V.PC.vagina > 0) {
				r.push(`pussy`);
				seX(eventSlave, "penetrative", V.PC, "vaginal");
				if (canImpreg(V.PC, eventSlave)) {
					knockMeUp(V.PC, 20, 0, eventSlave.ID);
				}
			} else {
				if (V.PC.anus === 0){
					r.push(`<span class="virginity loss>tight virgin</span>`);
					V.PC.anus++;
				}
				r.push(`asshole`);
				seX(eventSlave, "penetrative", V.PC, "anal");
				if (canImpreg(V.PC, eventSlave)) {
					knockMeUp(V.PC, 20, 1, eventSlave.ID);
				}
			}
			r.push(`on ${his} stiff rod and taking ${him} for a ride. ${He} has no control at all, but ${he} trusts you not to hurt ${him} and is soon enjoying ${himself}. ${He} can't seem to stop ${himself} from trying to move P-Limbs that aren't there, forgetting that ${he}'s not wearing them whenever the arousal builds high enough to make ${him} forgetful. Eventually ${he} stops trying to restrain ${himself}, realizing that you're enjoying ${his} delicious wriggling beneath you. ${He} orgasms hard,`);
			if (V.PC.vagina >= 0) {
				r.push(`painting the walls of your vagina white.`);
			} else {
				r.push(`flooding your rectum with cum.`);
			}
			App.Events.addParagraph(frag, r);
			App.Events.addParagraph(frag, [`When you've climaxed yourself, ${he} looks towards ${his} waiting P-Limbs, but you're not done with ${him} yet. You pick ${him} up again and bring ${him} into the shower. ${He} tries to help you, but again, ${he} gives up after a while, letting you wash ${him}. As you're rinsing the soap off ${him}, ${he} <span class="devotion inc">thanks you devotedly.</span> With the water streaming down ${his} face, you barely notice ${his} gentle tears.`]);
			eventSlave.devotion += 4;
			return frag;
		}
	}
};

