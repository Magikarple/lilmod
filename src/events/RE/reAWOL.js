// cSpell:ignore REAWOL

App.Events.REAWOL = class REAWOL extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.mercenaries > 0
		];
	}

	get weight() {
		return either(0, 1); // Originally rolled opposed to "RE Poker Night"
	}

	execute(node) {
		const bountyFee = 5000;
		const minAge = (V.pedo_mode === 1) ? 21 : 38;
		const genParam = {
			minAge: minAge, maxAge: 43, ageOverridesPedoMode: 1, race: "nonslave", disableDisability: 1
		};
		const slave = GenerateNewSlave(V.seeDicks !== 100 ? "XX" : "XY", genParam);
		slave.origin = "You sentenced $him to enslavement as a punishment for dereliction of $his duty to you as a mercenary and for theft.";
		slave.career = "a soldier";
		slave.devotion = random(-75, -60);
		slave.trust = random(-15, 0);
		setHealth(slave, jsRandom(60, 80));
		slave.muscles = 50;
		slave.weight = random(-10, 10);
		eyeSurgery(slave, "both", "normal");
		slave.hears = 0;
		slave.anus = 0;
		slave.skill.anal = 0;
		slave.skill.whoring = 0;
		slave.skill.combat = 70;
		slave.behavioralFlaw = "arrogant";
		slave.sexualFlaw = "crude";
		slave.hStyle = "strip";
		slave.hLength = 5;
		slave.custom.tattoo = "$He has a number of tattoos from a variety of mercenary companies.";
		slave.clothes = "a military uniform";

		const {
			He,
			he, him, his, woman
		} = getPronouns(slave);
		const {
			HeA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`Human soldiers are superior to drones in a number of ways — they have the capability for suspicion, the ability to understand human interactions, and are impervious to the ever-present threat of cyber-warfare. That said, a crucial failing of any sentient warrior is their agency.`]);
		let r = [];
		r.push(`On this particular evening, you find your work interrupted by an urgent alert from ${V.assistant.name}${(V.seeImages === 1) ? ", accompanied by a recent picture" : ""}.`);
		if (V.assistant.personality > 0) {
			r.push(`"${properMaster()}, one of the ${V.mercenariesTitle} has gone AWOL." ${HeA} pauses before continuing. "${He}'s taken a number of weapons with ${him}."`);
		} else {
			r.push(`${HeA} informs you that one of the ${V.mercenariesTitle} has disappeared, seemingly taking with ${him} a small stash of weapons.`);
		}

		App.Events.addParagraph(node, r);

		App.Events.addParagraph(node, [`Your window of opportunity to act is closing. If you have plans for punishing this dereliction from your authority, they must be set in motion now.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Let them go`, release));
		choices.push(new App.Events.Result(`Let your mercenaries handle ${him}`, merc));
		if (V.SF.Toggle && V.SF.Active >= 1) {
			choices.push(new App.Events.Result(`Let your ${V.SF.Lower} handle ${him}`, SF));
		}
		if (V.cash < 5000) {
			choices.push(new App.Events.Result(null, null, "You lack the necessary funds to put out a bounty."));
		} else {
			choices.push(new App.Events.Result(`Put out a bounty on ${his} head`, bounty, `It will cost ${cashFormat(bountyFee)} to put out a bounty on ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function release() {
			repX(-1000, "event", slave);
			return `You inform your personal assistant that you aren't planning to take any action. By the next morning, word has spread to the rest of your arcology that crossing you is apparently permissible and your <span class="reputation dec">reputation has suffered</span> as a result.`;
		}

		function merc() {
			if (random(1, 100) > 50) {
				return `Despite the trouble ${he} has caused you, the culmination of this mercenary's wanton flight from the rest of the ${V.mercenariesTitle} is decidedly an anti-climax. The last you hear of the matter is a chorus of grim grunts and nods as your mercenaries file back into the arcology. The matter is done.`;
			} else {
				return `Your mercenaries return to tell you that they could not find the mutineer. It could be that ${he} managed to escape beyond their reach or that one among your 'loyal' retainers allowed ${him} to flee your judgment, but alas there is little that can be done to remedy the issue now. Still, aside from a slight grumbling within the arcology, few fault you for allowing the ${V.mercenariesTitle} to recapture one of their own — even if they failed to do so.`;
			}
		}

		function SF() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You take a tablet and send ${App.Mods.SF.SFC()} a notice about the mutinous mercenary. When you have the majority of the pertinent details committed to text, all that remains is to decide the fate of your quarry.`);
			App.Events.addParagraph(frag, r);

			const choices = [];
			choices.push(new App.Events.Result(`You want ${him} dead`, dead));
			choices.push(new App.Events.Result(`You want ${him} alive`, alive));
			App.Events.addResponses(frag, choices);
			return frag;

			function dead() {
				repX(5000, "event", slave);
				V.arcologies[0].prosperity = Math.min(V.arcologies[0].prosperity+2, V.AProsperityCap);
				return `Despite the trouble ${he} has caused you, the culmination of this mercenary's wanton flight from the rest of the ${V.mercenariesTitle} is decidedly anti-climatic. The last you hear of ${him} is in the footnote of one of your daily reports, with some minute yet suitably gory pictures as an accompaniment. When the stolen weapons are returned to their rightful place in your arcology, the unfortunate matter is concluded once and for all. <span class="prosperity inc">Your reputation and ${V.arcologies[0].name}'s prosperity improves,</span> a result of the fear crossing you will bring, in addition to showing your citizens that you are willing and able to deal with such matters in-house.`;
			}

			function alive() {
				const frag = new DocumentFragment();
				let r = [];
				slave.clothes = "chains";
				App.Events.refreshEventArt(slave);
				r.push(`It doesn't take long for a squad of ${V.SF.Lower} to track ${him} down. Soon you have the troublesome turncoat before you in chains.`);
				App.Events.addParagraph(frag, r);

				const choices = [];
				choices.push(new App.Events.Result(`Enslave ${him}`, enslave));
				choices.push(new App.Events.Result(`Flog ${him} in public then exile ${him} from the arcology`, () => flog(true)));
				App.Events.addResponses(frag, choices);

				return frag;
			}
		}

		function bounty() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You take a tablet and draft a bounty notice for the mutinous mercenary. When you have the majority of the pertinent details committed to text, all that remains is to decide the fate of your quarry.`);
			App.Events.addParagraph(frag, r);

			const choices = [];
			choices.push(new App.Events.Result(`You want ${him} dead`, dead));
			choices.push(new App.Events.Result(`You want ${him} alive`, alive));
			App.Events.addResponses(frag, choices);
			return frag;

			function dead() {
				repX(5000, "event", slave);
				cashX(-bountyFee, "capEx");
				return `Despite the trouble ${he} has caused you, the culmination of this mercenary's wanton flight from the rest of the ${V.mercenariesTitle} is decidedly an anti-climax. The last you hear of ${him} is in the footnote of one of your daily reports, with some minute yet suitably gory pictures as an accompaniment. When the stolen weapons are returned to their rightful place in your arcology, the unfortunate matter is concluded once and for all. <span class="reputation inc">Your reputation improves,</span> a result of the fear of crossing you that your unpleasantness has inspired.`;
			}

			function alive() {
				const frag = new DocumentFragment();
				let r = [];
				slave.clothes = "chains";
				App.Events.refreshEventArt(slave);
				r.push(`It doesn't take long for some hired guns, motivated by the bounty, to track ${him} down. Soon you have the troublesome turncoat before you in chains.`);
				cashX(-bountyFee, "event", slave);
				App.Events.addParagraph(frag, r);
				const choices = [];
				choices.push(new App.Events.Result(`Enslave ${him}`, enslave));
				choices.push(new App.Events.Result(`Flog ${him} in public then exile ${him} from the arcology`, () => flog(false)));
				App.Events.addResponses(frag, choices);
				return frag;
			}
		}

		function flog(inHouse) {
			let r = [];
			r.push(`An example must be made. There is a binding contract between you and your ${V.mercenariesTitle}, and this ${woman} attempted to undermine it for ${his} own selfish profit. The protesting bitch is stripped and flogged on the promenade before being escorted bleeding from the arcology. The public <span class="reputation inc">approves of this harshness.</span>`);
			repX(5000, "event", slave);
			if (inHouse) {
				r.push(`In addition <span class="prosperity inc">Arcology prosperity improves,</span> a result of showing your citizens that you are willing and able to deal with such matters in-house.`);
				V.arcologies[0].prosperity = Math.min(V.arcologies[0].prosperity+2, V.AProsperityCap);
			}
			return r;
		}

		function enslave() {
			let r = [];
			r.push(`Despite the trouble ${he} has caused you, you manage to complete the legalities and biometric scanning quickly and without incident. Of course, this is in large part due to the fact that the would-be mutineer is thoroughly restrained. Based on the accounts of ${his} captors and the numerous injuries evident amongst them, ${he} is likely to be violent when ${he} is finally released.`);
			r.push(App.UI.newSlaveIntro(slave));
			return r;
		}
	}
};
