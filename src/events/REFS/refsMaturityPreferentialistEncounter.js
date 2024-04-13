App.Events.refsMaturityPreferentialistEncounter = class refsMaturityPreferentialistEncounter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSMaturityPreferentialist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 500;
		const enslaveCost = 10000;
		const slave = GenerateNewSlave("XX", {
			minAge: 36, maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1, race: "nonslave"
		});
		slave.origin = "$He was enslaved by you when you purchased $his debt.";
		slave.devotion = random(-90, -75);
		slave.trust = random(-45, -25);
		setHealth(slave, jsRandom(10, 20));
		slave.counter.birthsTotal = 2;
		/* Plush */
		slave.boobs = random(7, 11) * 100;
		slave.natural.boobs = slave.boobs - 300;
		slave.hips = random(1, 2);
		slave.butt = slave.hips + 2;
		slave.weight = random(10, 40);
		slave.waist = random(-10, 10);
		slave.muscles = Math.min(slave.muscles, 30);
		slave.clothes = "conservative clothing";

		const {
			He, His,
			he, his, him, woman
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`Your excursions out of your penthouse and into the arcology as a whole often put you in close proximity with citizens from all levels of the social strata. After all, they themselves have their own lives to live within the walls of ${V.arcologies[0].name}.`]);

		App.Events.addParagraph(node, [`On this particular outing you happen to cross paths with a comely citizen and ${his} two adult sons. From ${his} plain clothes and conspicuous lack of makeup, it is readily apparent that ${he} is not one of the arcology's well-to-do inhabitants. ${He} recognizes you quickly and dips ${his} head in deference to your high status, ${(V.PC.visualAge < 35) ? `${his} cheeks flushed in embarrassment and confusion at a young arcology owner's interest in an old citizen like ${him}.` : `${his} expression awestruck by the presence of an arcology owner before ${him}.`}`]);

		const choices = [];
		choices.push(new App.Events.Result(`Let them pass`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Fuck ${him} over dinner`, pay, `This will cost ${cashFormat(cost)}.`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to promote ${him}.`));
		}
		choices.push(new App.Events.Result(`Manipulate ${him} into having sex with you`, fuck));
		App.Events.addResponses(node, choices);

		function ignore() {
			repX(500, "event");
			return `You step aside gracefully and bow your head, while signifying to the older ${woman} that you intend to allow ${him} to pass you. ${He} seems taken aback by your geniality, especially given the gulf in social standing between the two of you, and seems disproportionately flustered by your small show of civility. Nonetheless, ${he} is struck by ${his} chance encounter with you and cannot stop recounting the story to all ${his} friends, and soon <span class="reputation inc">the anecdote has seized the imaginations of ${V.arcologies[0].name}'s mature, female citizens.</span>`;
		}

		function pay() {
			repX(2500, "event");
			cashX(-cost, "event");
			return `It takes a moment for you to convince the older ${woman} and ${his} sons that you aren't playing some cruel joke on them, but once you do ${he} enthusiastically agrees to be your companion for the evening. With a mature lady on your arm for the rest of the night, and ${his} sons trailing behind the two of you at a respectful distance, you take ${V.arcologies[0].name} by storm amidst a flurry of speculative whispers and contemplative rumors. Later that night, you conclude your date with a pleasant meal at one of ${V.arcologies[0].name}'s choicest restaurants with fine dining and even finer conversation. To the credit of ${his} sons, they politely continue eating their dinner without batting an eye when you${(V.PC.dick === 0) ? ` don a strap-on and` : ""} take their mother over the dinner table. When you part ways, the older ${woman} is clearly smitten with you — so it's no wonder that by the next day the story of your encounter has <span class="reputation inc">spread across ${V.arcologies[0].name} like wildfire.</span>`;
		}

		function fuck() {
			slave.clothes = "no clothing";
			App.Events.refreshEventArt(slave);

			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`It only takes a moment for ${V.assistant.name} to uncover the citizen's financial records and the copious debt therein, and only another moment for you to browbeat the terrified older women into sleeping with you under threat of purchasing all ${his} debt and summarily enslaving ${him}. ${His} sons, frightened into obedience by the possibility of losing their dear mother, take their cue to make themselves scarce during the encounter.`]);

			App.Events.addParagraph(frag, [`Once you both retire to your private suite, you peel the mature citizen's clothes off as easily as one might shed a gift of its wrapping. In the nude ${his} body is tastefully plush, with wide hips, firm motherly breasts, and a delicate blush across ${his} shamefaced, plump cheeks. Despite the circumstances of your sexual conquest of ${him}, ${he} seems to enjoy the fuck well enough by the sounds of ${his} frenzied moans — citizens like ${him} often do since sexual submission to a slave would be a crippling scandal to a prominent citizen, let alone one of ${his} diminished social stature.`]);
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
					`After ${he} regains ${his} bearings from your sexual encounter, the older ${woman} slips on ${his} simple clothes and attempts to slink away from your private suite unobtrusively. ${He} makes it out the door before being confronted by a glowing array of wallscreen monitors, each displaying a visual representation of your purchase of ${his} considerable debt and subsequent enslavement of ${him} on the basis of that debt. Tears begin to stream down ${his} weathered cheeks as ${he} sinks to ${hasBothLegs(slave) ? `${his} knees` : "the floor"}, ${his} hopes of making it through the breadth of ${his} long life without enslavement now dashed.`,
					App.UI.newSlaveIntro(slave)
				];
			}
		}
	}
};
