App.Events.REResistantMotherDaughter = class REResistantMotherDaughter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeIncest === 1
		];
	}

	actorPrerequisites() {
		return [
			[
				(s) => s.daughters > 0,
				(s) => s.devotion > 50,
				(s) => s.anus !== 0,
				canWalk,
			],
			[
				s => s.mother === this.actors[0],
				(s) => s.devotion < 10,
				(s) => s.anus !== 0,
				canWalk
			]
		];
	}

	execute(node) {
		let r = [];
		const mommy = getSlave(this.actors[0]);
		const daughter = getSlave(this.actors[1]);
		const {
			he, him, his, mother
		} = getPronouns(mommy);

		const {
			his2, daughter2
		} = getPronouns(daughter).appendSuffix("2");

		App.Events.drawEventArt(node, [mommy, daughter], "no clothing");

		r.push(`${mommy.slaveName} and ${his} ${daughter2} are both having trouble getting acclimated to your ownership, with their obedience suffering as a result. Though neither of them have done anything particular egregious lately, their combined list of minor transgressions is reaching a point where rendering punishment on the two would not be seen as unfair. By happenstance they come before you for inspection one after the other. Though they certainly`);
		if (canSee(mommy) && canSee(daughter)) {
			r.push(`see each other naked frequently around`);
		} else {
			r.push(`are frequently naked around each other in`);
		}
		r.push(`the penthouse, neither seems particularly comfortable around the other when nudity is involved. While you finish ${mommy.slaveName}'s inspection, ${his} ${daughter2} fidgets uneasily even while trying to mimic the posture and appearance of an obedient slave. It occurs to you that the current situation presents an opportunity to do <i>something</i> about this resistant ${mother}-${daughter2} pair.`);
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Spend the evening gently acclimating them to your ownership`, gently));
		choices.push(new App.Events.Result(`Make an example of the ${mother}`, exampleMommy));
		App.Events.addResponses(node, choices);

		function gently() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Though neither of the two vehemently protests your decision to have them both join you in bed, furtive uneasy glances are exchanged between the two. Since they're already naked, they clamber onto your bed before you and reluctantly kneel facing each other, leaving enough space between them for you${(canSee(mommy) && canSee(daughter)) ? "and for them to avert their eyes to avoid the other's nakedness" : ""}. They clearly assume you would start by using one of them, so they're quite taken aback when you remain standing at the edge of the bed and suggest that ${mommy.slaveName} play with ${his} ${daughter2}. ${daughter.slaveName} awkwardly flounders a little as ${his2} ${mother}'s`);
			if (hasBothArms(mommy)) {
				r.push(`hands roam`);
			} else if (hasAnyArms(mommy)) {
				r.push(`hand roams`);
			}
			r.push(`about ${his2} body, but does not reel back from the intimate touching. In time you instruct ${daughter.slaveName} to pleasure ${his2} ${mother}, but still decline to join the incestuous union unfolding on your sheets. You extend the foreplay for hours, bringing both ${mother} and ${daughter2} to such a state of naked arousal that they begin grinding against each other uninhibitedly. They are both so desperate for release that they do not object when you finally decide to join them, instead eagerly moving to include you in their coupling. What started with ${daughter.slaveName} awkwardly kneeling unmoving while ${his2} ${mother} sucked ${his2} nipples ends with ${daughter.slaveName}`);
			if (hasAllLimbs(daughter)) {
				r.push(`on all fours`);
			} else {
				r.push(`bent over`);
			}
			r.push(`getting fucked by you while orally pleasuring ${mommy.slaveName}. You gaze over at ${mommy.slaveName} and ${he} moans and licks ${his} lips enticingly back at you as ${daughter.slaveName} moans into ${his} fuckhole.`);
			r.push(`<span class="trust inc">They have both become more trusting of you.</span>`);

			mommy.trust += 4;
			daughter.trust += 4;
			seX(mommy, "oral", daughter, "oral");

			if (canDoAnal(mommy)) {
				actX(mommy, "anal");
			} else if (canDoVaginal(mommy)) {
				actX(mommy, "vaginal");
			}

			if (canDoAnal(daughter)) {
				actX(daughter, "anal");
			} else if (canDoVaginal(daughter)) {
				actX(daughter, "vaginal");
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function exampleMommy() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You give them orders of devastating simplicity: You are going to assrape ${mommy.slaveName} and if ${his} ${daughter2} offers even the most token of resistance, you'll punish ${mommy.slaveName}. They're stunned, but you shake them out of their shock by grabbing ${mommy.slaveName} by the arm${(V.PC.dick === 0) ? ", donning a strap-on" : ""} and shoving ${him} over your desk. ${daughter.slaveName} flinches visibly as you enter ${his2} ${mother}'s ass in one brutal stroke, for which you stain ${his2} ${mother}'s asscheeks a rosy red with a torrent of harsh spanks. ${mommy.slaveName} takes the rough anal pounding with only quiet sobbing and the occasional whimper of pain, but ${his} ${daughter2} can't bear to`);
			if (canSee(daughter)) {
				r.push(`see`);
			} else if (canHear(daughter)) {
				r.push(`hear`);
			} else {
				r.push(`have`);
			}
			r.push(`${mommy.slaveName} in such duress and breaks ${his2} short-lived silence to beg for mercy. When you step away from ${mommy.slaveName}, ${daughter.slaveName} lets out a sigh of relief, but ${his2} expression soon turns to horror and revulsion when you return to mount ${his2} ${mother} with a lash in hand.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`When you eventually finish your merciless assrape of ${mommy.slaveName}, ${his} body is covered in bruises, marks, and handprints. A testament to ${daughter.slaveName}'s inability to keep ${his2} silence as you brutalized ${his2} ${mother}. You leave your office wordlessly to attend to other matters, while behind you ${daughter.slaveName} gazes`);
			if (canSee(daughter)) {
				r.push(`forlornly`);
			} else {
				r.push(`blindly`);
			}
			r.push(`at the gibbering mess you have reduced ${his2} ${mother} to. Your severe punishment of ${his2} ${mother} has encouraged ${daughter.slaveName} to <span class="trust dec">fear you.</span> ${mommy.slaveName} has been fucked into <span class="devotion inc">submission</span> but your savage treatment has caused ${him} to <span class="flaw gain">hate buttsex.</span>`);

			daughter.trust -= 10;
			mommy.devotion += 4;

			seX(mommy, "anal", V.PC, "penetrative");
			mommy.sexualFlaw = "hates anal";

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
