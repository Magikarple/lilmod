App.Events.refsYouthPreferentialistEncounter = class refsYouthPreferentialistEncounter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSYouthPreferentialist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 500;
		const enslaveCost = 10000;
		const slave = GenerateNewSlave("XX", {maxAge: 22, disableDisability: 1, race: "nonslave"});
		slave.origin = "$He was enslaved by you when you purchased $his debt.";
		slave.devotion = random(-55, 0);
		slave.trust = random(-45, 0);
		/* Girlish */
		if (slave.boobs > 450) {
			slave.boobs = random(6, 9) * 50;
			slave.natural.boobs = slave.boobs;
		}
		slave.hips = random(-2, -1);
		slave.butt = random(0, 2);
		slave.weight = Math.min(slave.weight, 10);
		slave.waist = Math.min(slave.waist, 0);
		slave.muscles = Math.min(slave.muscles, 30);
		slave.clothes = "conservative clothing";

		const {
			He,
			he, his, him, woman, girl, daughter
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`Your excursions out of your penthouse and into the arcology as a whole often put you in close proximity with citizens from all levels of the social strata. After all, they themselves have their own lives to live within the walls of ${V.arcologies[0].name}.`]);

		let womanTerm = `little ${girl}`;
		if (slave.physicalAge > 19) {
			womanTerm = `young ${woman}`;
		} else if (slave.physicalAge > 12) {
			womanTerm = `teen`;
		} else if (slave.physicalAge > 9) {
			womanTerm = `pre-teen`;
		}
		App.Events.addParagraph(node, [`On this particular outing you happen to cross paths with a nubile ${womanTerm}, accompanied by ${his} father. From ${his} plain clothes and rudimentary makeup, it is readily apparent that ${he} is not one of the arcology's well-to-do inhabitants. ${He} recognizes you quickly and dips ${his} head in deference to your high status, ${(V.PC.visualAge >= 50) ? `${his} cheeks flushed in embarrassment and delight at an aged arcology owner's interest in a young ${girl} like ${him}.` : `${his} expression awestruck by the presence of an arcology owner before ${him}.`}`]);

		const choices = [];
		choices.push(new App.Events.Result(`Let them pass`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Fuck ${him} over dinner`, pay, `This will cost ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to take ${him} on a date.`));
		}
		choices.push(new App.Events.Result(`Manipulate ${him} into having sex with you`, fuck));
		App.Events.addResponses(node, choices);

		function ignore() {
			repX(500, "event");
			return `You step aside gracefully and bow your head, while signifying to the ${girl} that you intend to allow ${him} to pass you. ${He} seems taken aback by your geniality, especially given the gulf in social standing between the two of you, and has to be chaperoned from your presence by ${his} father. Nonetheless, ${he} is struck by ${his} chance encounter with you and cannot stop recounting the story to all ${his} friends, soon <span class="reputation inc">the anecdote has seized the imaginations of ${V.arcologies[0].name}'s youthful, female citizens.</span>`;
		}

		function pay() {
			repX(2500, "event");
			cashX(-cost, "event");
			return `It takes a moment for you to convince the young ${girl} and ${his} father that you aren't playing some cruel joke on them, but once you do ${he} enthusiastically agrees to be your companion for the evening. With a pretty young thing on your arm for the rest of the night, and ${his} father trailing behind the two of you at a respectful distance, you take ${V.arcologies[0].name} by storm amidst a flurry of speculative whispers and contemplative rumors. Later that night, you conclude your date with a pleasant meal at one of ${V.arcologies[0].name}'s choicest restaurants with fine dining and even finer conversation. To the credit of ${his} father, he politely continues eating his dinner without batting an eye when you${(V.PC.dick === 0) ? ` don a strap-on and` : ''} take his ${num(slave.physicalAge)}-year-old ${daughter} over the dinner table. When you part ways, the young ${girl} is clearly smitten with you — so it's no wonder that by the next day the story of your encounter has <span class="reputation inc">spread across ${V.arcologies[0].name} like wildfire.</span>`;
		}

		function fuck() {
			slave.clothes = "no clothing";
			App.Events.refreshEventArt(slave);

			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`It only takes a moment for ${V.assistant.name} to uncover the father's financial records and the copious debt therein, and only another moment for you to browbeat the terrified father into allowing his ${num(slave.physicalAge)}-year-old ${daughter} to sleep with you under threat of purchasing all their debt and summarily enslaving ${him}.`]);

			App.Events.addParagraph(frag, [`Once you both retire to your private suite, you peel the ${girl}'s clothes off as easily as one might shed a gift of its wrapping. In the nude ${his} body is tastefully youthful, with narrow hips, firm breasts, and a delicate blush across ${his} shamefaced, rosy cheeks. Despite the circumstances of your sexual conquest of ${him}, ${he} seems to enjoy the fuck well enough by the sounds of ${his} frenzied moans — citizens like ${him} often do since sexual submission to a slave would be a crippling scandal to a prominent citizen, let alone one of ${his} diminished social stature.`]);
			const choices = [];
			if (V.cash >= (enslaveCost)) {
				choices.push(new App.Events.Result(`Enslave ${him} afterwards`, enslave, `Purchasing ${his} outstanding debts will cost ${cashFormat(enslaveCost)}.`));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
			}
			App.Events.addResponses(frag, choices);

			repX(1500, "event");
			return frag;

			function enslave() {
				cashX(-enslaveCost, "event", slave);
				return [
					`After ${he} regains ${his} bearings from your sexual encounter, the ${girl} slips on ${his} simple clothes and attempts to slink away from your private suite unobtrusively. ${He} makes it out the door before being confronted by a glowing array of wallscreen monitors, each displaying a visual representation of your purchase of ${his} father's considerable debt and subsequent enslavement of ${him} on the basis of that debt. Tears begin to stream down ${his} cheeks as ${he} sinks to ${hasBothLegs(slave) ? `${his} knees` : "the floor"}, ${his} hopes of a long life without enslavement now dashed.`,
					App.UI.newSlaveIntro(slave)
				];
			}
		}
	}
};
