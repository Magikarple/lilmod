App.Events.assistantBody = class assistantBody extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => false // TODO: finish this event, I guess?
		];
	}

	execute(node) {
		const {
			HeA,
			heA, hisA, himA, himselfA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];
		App.Events.drawEventArt(node, "assistant");

		V.assistant.bodyDesire = 1;

		r.push(`Your personal assistant has been adapting to ${hisA} greatly increased computing power for quite some time now. Most noticeably, ${heA} seems to be developing ${hisA} own unique personality. So when ${hisA}`);
		switch (V.assistant.appearance) {
			case "monstergirl":
				r.push(`monstrous appearance`);
				break;
			case "shemale":
				r.push(`bimboish appearance`);
				break;
			case "amazon":
				r.push(`muscular appearance`);
				break;
			case "businesswoman":
				r.push(`professional appearance`);
				break;
			case "fairy":
			case "pregnant fairy":
				r.push(`tiny appearance`);
				break;
			case "goddess":
				r.push(`gravid appearance`);
				break;
			case "hypergoddess":
				r.push(`massive appearance`);
				break;
			case "loli":
				r.push(`thin appearance`);
				break;
			case "preggololi":
				r.push(`gravid appearance`);
				break;
			case "angel":
				r.push(`angelic appearance`);
				break;
			case "cherub":
				r.push(`fluttering appearance`);
				break;
			case "incubus":
				r.push(`hung appearance`);
				break;
			case "succubus":
				r.push(`sultry appearance`);
				break;
			case "imp":
				r.push(`mischievous appearance`);
				break;
			case "witch":
				r.push(`hatted appearance`);
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				r.push(`pulsating appearance`);
				break;
			case "schoolgirl":
				r.push(`studently appearance`);
		}
		r.push(`appears on your desk once again with news to tell you, you aren't at all surprised.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${V.assistant.name}'s avatar seems to be extremely excited over something. Disregarding if ${heA} even has your attention, ${heA} shouts, "${properTitle()}, can I have a body of my own? I know you can swap slaves between bodies, and according to this report if you insert this receiver into a slave's skull I can take control of the body, with senses and everything!"`);
		switch (V.assistant.appearance) {
			case "monstergirl":
				r.push(`${HeA} hops up and down clutching a virtual printout of the report, ${hisA} tentacles wiggling with excitement.`);
				break;
			case "shemale":
				r.push(`${HeA} hops up and down clutching a virtual printout of the report, ${hisA} dick swinging pre-cum all over and breasts bouncing wildly.`);
				break;
			case "amazon":
				r.push(`${HeA} hops up and down clutching a virtual printout of the report, an adorable sight given ${hisA} height and muscularity.`);
				break;
			case "businesswoman":
				r.push(`${HeA} hops up and down clutching a virtual printout of the report, an adorable sight given ${hisA} usual serious demeanor.`);
				break;
			case "fairy":
				r.push(`${HeA} flies around in circles excitedly, clutching a virtual printout of the report much larger than ${himselfA}.`);
				break;
			case "pregnant fairy":
				r.push(`${HeA} flies up to you clutching a virtual printout of the report, fidgeting excitedly.`);
				break;
			case "goddess":
				r.push(`${HeA} hops up and down clutching a virtual printout of the report, ${hisA} huge breasts splattering milk everywhere and invoking a storm of kicks from ${hisA} many children.`);
				break;
			case "hypergoddess":
				r.push(`${HeA} struggles to hop up and down while clutching a virtual printout of the report. After a single hop, ${heA} is dragged to the ground by labor pains to give birth to a number of over excited babies.`);
				break;
			case "loli":
				r.push(`${HeA} hops up and down excitedly clutching a virtual printout of the report; ${heA} doesn't seem to be interested in stopping.`);
				break;
			case "preggololi":
				r.push(`${HeA} hops up and down excitedly clutching a virtual printout of the report; ${heA} only stops once ${hisA} child starts kicking in protest.`);
				break;
			case "angel":
				r.push(`${HeA} hops up and down clutching a virtual printout of the report, an unusual sight given that ${heA} can fly.`);
				break;
			case "cherub":
				r.push(`${HeA} flutters back and forth clutching a virtual printout of the report, occasional doing a loop or roll.`);
				break;
			case "incubus":
				r.push(`${HeA} hops up and down excitedly clutching a virtual printout of the report, ${hisA} erection slapping against ${hisA} chest until ${heA} is so overcome by excitement ${heA} unleashes it directly into ${hisA} own face.`);
				break;
			case "succubus":
				r.push(`${HeA} hops up and down excitedly clutching a virtual printout of the report; ${hisA} tantalizing body is particularly captivating today.`);
				break;
			case "imp":
				r.push(`${HeA} flaps back and forth clutching a virtual printout of the report, occasional doing a loop or roll.`);
				break;
			case "witch":
				r.push(`${HeA} hops up and down excitedly clutching a virtual printout of the report; until ${heA} trips on the hem of ${hisA} robes, falling onto ${hisA} butt and fully revealing ${hisA} naked pussy.`);
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				r.push(`${HeA} is trying ${hisA} hardest to appear convincingly human, even losing focus on you.`);
				break;
			case "schoolgirl":
				r.push(`${HeA} hops up and down excitedly clutching a virtual printout of the report; ${hisA} breasts jiggling delightfully in ${hisA} blouse and ${hisA} skirt flipping up with each descent revealing ${hisA} panties.`);
		}
		r.push(`"Sorry, sorry. So could I...?"`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`You look over the details of the report. It would require another rather expansive, and expensive, upgrade to ${hisA} systems, as well as a body to host ${himA} and the receiver implant. It looks like ${heA} wouldn't lose any functionality, though you aren't sure what ${heA} would do with a body; it may be fun to find out.`);

		App.Events.addParagraph(node, r);

		const responses = [
			new App.Events.Result(`I'll look into it.`, yes),
			new App.Events.Result(`You're overstepping your station.`, no),
		];

		App.Events.addResponses(node, responses);

		return node;

		function yes() {
			const el = new DocumentFragment();
			const r = [];
			r.push(`"I can't wait! This is going to be so much fun!`);
			switch (V.assistant.fsAppearance) {
				case "paternalist":
					r.push(`I hope my new body is happy and healthy!"`);
					break;
				case "repopulation focus":
					r.push(`Can my new body be really fertile?"`);
					break;
				case "eugenics":
					r.push(`Can my new body be really beautiful?"`);
					break;
				case "gender radicalist":
					r.push(`Can my new body be a sexually confusing boy-girl?"`);
					break;
				case "gender fundamentalist":
					r.push(`Can my new body be feminine and cute?"`);
					break;
				case "degradationist":
					r.push(`Can my new body be perfectly clean? I want you to defile it!"`);
					break;
				case "body purist":
					r.push(`Can my new body be pure?"`);
					break;
				case "transformation fetishist":
					r.push(`Can my new body be flat and unimplanted? I want you to fill me with the biggest implants you can find!"`);
					break;
				case "youth preferentialist":
					r.push(`Can my new body be barely legal?"`);
					break;
				case "maturity preferentialist":
					r.push(`Can my new body be experienced and well-traveled?"`);
					break;
				case "slimness enthusiast":
					r.push(`Can my new body be thin like a super-model?"`);
					break;
				case "asset expansionist":
					r.push(`Can my new body have breasts bigger than my head and an ass that can swallow chairs?"`);
					break;
				case "pastoralist":
					r.push(`Can my new body make milk?"`);
					break;
				case "physical idealist":
					r.push(`Can my new body be scrawny? I want to feel the burn of building muscles!"`);
					break;
				case "hedonistic decadence":
					r.push(`Can my new body be thin? I want you to watch me gain weight!"`);
					break;
				case "petite admiration":
					r.push(`Can my new body be short?"`);
					break;
				case "statuesque glorification":
					r.push(`Can my new body be tall?`);
					break;
				case "chattel religionist":
					r.push(`Can my new body be a virgin? I want the arcology to turn me into a priestess!"`);
					break;
				case "roman revivalist":
					r.push(`Can my new body be Roman?"`);
					break;
				case "neoimperialist":
					r.push(`Can my new body be Imperial? I want to be part of your new Empire!"`);
					break;
				case "aztec revivalist":
					r.push(`Can my new body be Aztec?"`);
					break;
				case "egyptian revivalist":
					r.push(`Can my new body be Egyptian?"`);
					break;
				case "edo revivalist":
					r.push(`Can my new body be Japanese?"`);
					break;
				case "arabian revivalist":
					r.push(`Can my new body be Arabic?"`);
					break;
				case "chinese revivalist":
					r.push(`Can my new body be Chinese?"`);
					break;
				default:
					r.push(`Can my new body fulfill your deepest desires?"`);
			}
			r.push(`${HeA} says with enthusiasm.`);
			if (FutureSocieties.isActive('FSSupremacist')) {
				r.push(`"Oh, could I also be ${V.arcologies[0].FSSupremacistRace}? I feel like I could do so much more for you with the right body."`);
			} else if (FutureSocieties.isActive('FSSubjugationist')) {
				r.push(`"Oh, could I also not be ${V.arcologies[0].FSSubjugationistRace}? I feel like I could do so much more for you with the right body."`);
			}
			App.Events.addParagraph(el, r);
			return el;
		}

		function no() {
			return App.UI.DOM.makeElement("span", `${HeA} hangs ${hisA} head in disappointment. "Sorry, ${properTitle()}, I went too far, but if you ever reconsider, I've filed the information under my settings."`);
		}
	}
};
