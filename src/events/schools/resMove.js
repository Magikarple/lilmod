// cSpell:ignore ditzily

App.Events.RESMove = class RESMove extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => {
				for (const [school, data] of App.Data.misc.schools) {
					if (V[school].schoolUpgrade !== 0 && V[school].schoolPresent === 0 && V[school].schoolAnnexed === 0 && data.requirements) {
						return true;
					}
				}
			}
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return 2;
	}

	execute(node) {
		let r = [];

		const schoolArray = [];
		for (const [school, data] of App.Data.misc.schools) {
			if (V[school].schoolUpgrade !== 0 && V[school].schoolPresent === 0 && V[school].schoolAnnexed === 0 && data.requirements) {
				schoolArray.push(school);
			}
		}
		const schoolString = schoolArray.random();
		const {
			HeA,
			heA, hisA, girlA, womanA, himselfA, loliA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		App.Events.drawEventArt(node, "assistant");

		let playerName;
		if (V.PC.slaveSurname) {
			if (V.PC.title) {
				playerName = `Mr. ${V.PC.slaveName}`;
			} else {
				playerName = `Ms. ${V.PC.slaveName}`;
			}
		} else {
			playerName = V.PC.slaveName;
		}

		if (schoolString === "TSS") {
			r.push(`You receive a personal call from a senior representative of The Slavegirl School. "${playerName}," he says without preamble, "The Slavegirl School would like to open a branch campus in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, he urges you to consider the offer, wishes you a pleasant day, and ends the call.`);
		} else if (schoolString === "TUO") {
			r.push(`You receive a personal call from a senior representative of The Utopian Orphanage. "${playerName}," she says without preamble, "The Utopian Orphanage would like to open a branch campus in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, he urges you to consider the offer, wishes you a pleasant day, and ends the call.`);
		} else if (schoolString === "GRI") {
			r.push(`You receive a personal call from a senior representative of the Growth Research Institute. "${playerName}," he says without preamble, "GRI would like to open a subsidiary lab in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, he urges you to consider the offer, wishes you a pleasant day, and ends the call.`);
		} else if (schoolString === "SCP") {
			r.push(`You receive a personal call from a senior representative of St. Claver Prep. "${playerName}," he says without preamble, "St. Claver's would like to open a branch campus in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, he urges you to consider the offer, wishes you a pleasant day, and ends the call.`);
		} else if (schoolString === "LDE") {
			r.push(`You receive a personal call from a senior representative of L'École des Enculées. "${playerName}," he says without preamble, "The École would like to open a branch campus in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, he urges you to consider the offer, wishes you a pleasant day, and ends the call.`);
		} else if (schoolString === "TGA") {
			r.push(`You receive a personal call from a senior representative of the Gymnasium-Academy. "${playerName}," he says without preamble, "The Academy would like to open a branch campus in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, he urges you to consider the offer, wishes you a pleasant day, and ends the call.`);
		} else if (schoolString === "HA") {
			r.push(`You receive a personal call from a senior representative of the Hippolyta Academy. "${playerName}," he says without preamble, "The Academy would like to open a branch campus in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, he urges you to consider the offer, wishes you a pleasant day, and ends the call.`);
		} else if (schoolString === "TCR") {
			r.push(`You receive a personal call from a senior representative of the Cattle Ranch. "${playerName}," he says without preamble, "The Ranch would like to open a pasture in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, he urges you to consider the offer, wishes you a pleasant day, and ends the call.`);
		} else if (schoolString === "NUL") {
			r.push(`You receive a personal call from a senior representative of Nueva Universidad de Libertad. "`);
			if (V.PC.slaveSurname) {
				r.push(`Mx. ${V.PC.slaveSurname},"`);
			} else {
				r.push(`${V.PC.slaveName},"`);
			}
			r.push(`they say without preamble, "Nueva Universidad de Libertad would like to open a branch campus in ${V.arcologies[0].name}. We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence." After some further pleasantries, they urge you to consider the offer, wish you a pleasant day, and end the call.`);
		} else {
			r.push(`You receive a personal call from a senior Futanari Sister — not the one you helped win the power struggle over futa balls. "${playerName}," she says with the odd confidence all elder Sisters share, "our numbers are growing,`);
			if (V.PC.dick !== 0 && V.PC.vagina !== -1 && V.PC.boobs >= 300) {
				r.push(`and we are very eager to become closer to you. Normally, we would ask for lowered rent in return for the benefits we bring an arcology, but for you, we are unwilling to ask even that. We shall charge others more for their purchase of Sisters instead. Please, will you have us?" She bats her eyes at you, looking very willing to be had.`);
			} else {
				r.push(`and you have shown yourself to be our friend. Would you accept one of our communities in ${V.arcologies[0].name}? We'd like to ask for a significant reduction in rent from your standard rate, since we could bring significant benefits to you through our presence."`);
			}
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`You inquire about the Sister you helped, and she smiles. "She reached the age at which even the best Sister must serve us by being sold as a slave. Don't worry, though; I hear she is very happy.`);
			if (random(1, 3) === 1) {
				r.push(`A powerful man from the old world bought her, and they're engaged. I believe he means to free her."`);
			} else if (random(1, 2) === 1) {
				r.push(`A powerful woman from the old world bought her, and they're engaged. I believe she means to free her."`);
			} else {
				r.push(`Though she's a slave, she's become something of a celebrity in the old world. I believe her porn is quite popular there."`);
			}
		}
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`${capFirstChar(V.assistant.name)} performed a business analysis of the proposal during the call,`);
		if (V.assistant.personality <= 0) {
			r.push(`its symbol slowly rotating on your desk. It presents its conclusions,`);
		} else {
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`${hisA} monster${girlA} avatar rather cutely using ${hisA} fingers, the tips of ${hisA} tentacle hair, and ${hisA} dickheads to count:`);
					break;
				case "shemale":
					r.push(`${hisA} shemale avatar ditzily using ${hisA} fingers to keep count:`);
					break;
				case "amazon":
					r.push(`${hisA} amazon avatar using a bone abacus to do sums while counting out loud gruffly:`);
					break;
				case "businesswoman":
					r.push(`${hisA} business${womanA} avatar projecting maturely sexy confidence as ${heA} runs the numbers:`);
					break;
				case "fairy":
					r.push(`${hisA} fairy avatar conjures a bunch of colored lights to keep count:`);
					break;
				case "pregnant fairy":
					r.push(`${hisA} pregnant fairy avatar conjures a bunch of colored lights to keep count:`);
					break;
				case "goddess":
					r.push(`${hisA} goddess avatar keeping count by picking the petals off flowers in ${hisA} hair:`);
					break;
				case "hypergoddess":
					r.push(`${hisA} goddess avatar keeping count based off the number of contractions running through ${hisA} huge belly:`);
					break;
				case "loli":
					r.push(`${hisA} ${loliA} avatar carefully counts the numbers off on ${hisA} fingers:`);
					break;
				case "preggololi":
					r.push(`${hisA} pregnant ${loliA} avatar carefully counts the numbers off on ${hisA} fingers before losing count to ${hisA} baby kicking and starting over:`);
					break;
				case "angel":
					r.push(`${hisA} angel avatar carefully using the feathers on ${hisA} wing to keep count:`);
					break;
				case "cherub":
					r.push(`${hisA} cherub avatar lands to better concentrate on counting:`);
					break;
				case "incubus":
					r.push(`${hisA} incubus avatar counts along to each stroke of ${hisA} penis:`);
					break;
				case "succubus":
					r.push(`${hisA} succubus avatar dons a pair of glasses, short skirt and cleavage showing blouse to look the part while counting:`);
					break;
				case "imp":
					r.push(`${hisA} imp avatar lands to better concentrate on counting:`);
					break;
				case "witch":
					r.push(`${hisA} witch avatar uses its chalk to keep a tally:`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`${hisA} avatar sprouts an additional clit to keep count:`);
					break;
				case "schoolgirl":
					r.push(`${hisA} school ${girlA} avatar doing sums on a little blackboard:`);
					break;
				default:
					r.push(`${hisA} symbol slowly rotating on your desk:`);
			}
			r.push(`${HeA} presents ${hisA} conclusions:`);
		}
		r.push(`as you suspected,`);
		if (schoolString === "TFS" && V.PC.dick !== 0 && V.PC.vagina !== -1 && V.PC.boobs >= 300) {
			r.push(`your futanari status means there are no potential downsides. Just having them present would probably be good for the arcology's prosperity.`);
		} else {
			r.push(`you'd run a loss on the rent, even bargaining them up as far as they'd be likely to go. On the other hand, just having them present would probably be good for the arcology's prosperity.`);
		}
		if (V.assistant.personality === 1) {
			if (schoolString === "TSS" || schoolString === "SCP") {
				r.push(`"Just think of`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`all those virgin schoolgirl holes," ${heA} concludes, ${hisA} avatar starting to masturbate.`);
						break;
					case "shemale":
						r.push(`all those fresh schoolgirls, all innocent, and..." ${heA} trails off, ${hisA} avatar starting to masturbate.`);
						break;
					case "amazon":
						r.push(`all those nice girls," ${hisA} avatar blushes.`);
						break;
					case "businesswoman":
						r.push(`all that potential," ${hisA} avatar says, looking aroused at the possibilities.`);
						break;
					case "fairy":
					case "pregnant fairy":
						r.push(`all of the delicious, wonderful virginal love juices!" ${hisA} avatar squeaks, quivering with delight while dripping with love juices of ${hisA} own.`);
						break;
					case "goddess":
						r.push(`all those virgin bodies to share..." ${hisA} avatar murmurs, rubbing a hand over ${hisA} belly.`);
						break;
					case "hypergoddess":
						r.push(`all those virgin bodies to share... I hope we can fill them with children..." ${hisA} avatar murmurs, rubbing a hand over ${hisA} massive belly.`);
						break;
					case "loli":
						r.push(`all those new girls!" ${hisA} avatar exclaims.`);
						break;
					case "preggololi":
						r.push(`all those fresh girls!" ${hisA} avatar exclaims with a grin.`);
						break;
					case "angel":
						r.push(`all those pure, innocent girls! You'll keep them safe won't you?" ${hisA} avatar says pleadingly.`);
						break;
					case "cherub":
						r.push(`all those pure girls!" ${hisA} avatar exclaims with a worried tone.`);
						break;
					case "incubus":
						r.push(`all those holes for the taking," ${hisA} avatar says, licking ${hisA} lips.`);
						break;
					case "succubus":
						r.push(`all those pure, innocent girls. I can't wait to unleash their inner slut!" ${hisA} avatar says excitedly.`);
						break;
					case "imp":
						r.push(`all those pure, innocent girls. I can't wait to see them fall!" ${hisA} avatar says excitedly.`);
						break;
					case "witch":
						r.push(`all those pure, innocent girls. I promise I won't turn them into monsters!" ${hisA} avatar says, bowing its head.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`all those fresh, young schoolgirls," ${hisA} avatar says, grinning unnaturally wide, splitting its middle and unfolding dozens of tentacles. "I can't wait to stuff them full of young."`);
						break;
					case "schoolgirl":
						r.push(`all those cute schoolgirls like me!" ${hisA} avatar trills.`);
						break;
					default:
						r.push(`all those nice girls," ${heA} says.`);
				}
			} else if (schoolString === "GRI" || schoolString === "TCR") {
				r.push(`"Just think of`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`the tits, and the asses, and the lips," ${heA} concludes, ${hisA} avatar starting to masturbate.`);
						break;
					case "shemale":
						r.push(`those big butts.`);
						if (schoolString === "TCR") {
							r.push(`It must feel lovely sinking into such a thing while pounding an asshole..."`);
						} else {
							r.push(`It's so rare for girls to have such big butts and be anal virgins..."`);
						}
						r.push(`${heA} trails off, ${hisA} avatar starting to masturbate.`);
						break;
					case "amazon":
						r.push(`all those meaty girls," ${hisA} avatar blushes.`);
						break;
					case "businesswoman":
						r.push(`all that milking potential," ${hisA} avatar says, looking aroused at the possibilities.`);
						break;
					case "fairy":
						r.push(`all that sweet, tasty milk!" ${hisA} avatar squeaks, licking ${hisA} lips and dripping with arousal.`);
						break;
					case "pregnant fairy":
						r.push(`all that sweet, tasty mama milk!" ${hisA} avatar squeaks, licking ${hisA} lips and dripping with arousal.`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`all those luscious, heavy tits," ${hisA} avatar says, hefting one of ${hisA} own.`);
						break;
					case "loli":
						r.push(`those tits!" ${hisA} avatar says while cupping ${hisA} flat chest.`);
						break;
					case "preggololi":
						r.push(`those tits!" ${hisA} avatar says while cupping ${hisA} barely there chest.`);
						break;
					case "angel":
						r.push(`those lovely breasts," ${hisA} avatar says, blushing red. "I wouldn't be able to fly with them..."`);
						break;
					case "cherub":
						r.push(`those huge tits!" ${hisA} avatar exclaims. "Could you imagine trying to fly with those?"`);
						break;
					case "incubus":
						r.push(`those amazing breasts; I can't wait to wrap them around my dick!" ${heA} exclaims, ${hisA} hard-on twitching with anticipation.`);
						break;
					case "succubus":
						r.push(`those saggy tits and fat asses, then compare them to MINE." ${HeA} states, pushing out ${hisA} perfectly perky M-cup bust before twirling around to show off ${hisA} enormous, toned ass.`);
						break;
					case "imp":
						r.push(`those heavy tits," ${hisA} avatar says, "I just want to tease them all day long!"`);
						break;
					case "witch":
						r.push(`all that flesh," ${hisA} avatar mutters. "Last time I tried to get curves like that I ended up so big I couldn't see over my breasts, let alone move..."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`the breasts, the asses, the milk, the flesh," ${hisA} avatar states while swelling considerably and sprouting several oversized extra boobs.`);
						break;
					case "schoolgirl":
						r.push(`those titties!" ${hisA} avatar trills.`);
						break;
					default:
						r.push(`those ridiculous assets," ${heA} says.`);
				}
			} else if (schoolString === "LDE" || schoolString === "NUL") {
				r.push(`"Just think of`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`their soft anuses. I could fit both of my dicks in one of them," ${heA} concludes, ${hisA} avatar starting to masturbate.`);
						break;
					case "shemale":
						r.push(`those soft young butthole sluts..." ${heA} trails off, ${hisA} avatar starting to masturbate.`);
						break;
					case "amazon":
						r.push(`their soft — I mean their submissive — you know, how they take..." ${hisA} avatar trails off, blushing.`);
						break;
					case "businesswoman":
						r.push(`all that whoring potential," ${hisA} avatar says, looking aroused at the possibilities.`);
						break;
					case "fairy":
						r.push(`all those soft, squeezable butts!" ${hisA} avatar squeaks, shaking to and fro while ${heA} hugs ${himselfA}.`);
						break;
					case "pregnant fairy":
						r.push(`all those soft, squeezable butts and lovely birthing hips!" ${hisA} avatar squeaks, shaking to and fro while ${heA} hugs ${hisA} swollen belly.`);
						break;
					case "goddess":
						r.push(`those servile little cuties!" ${hisA} avatar exclaims, practically giggling.`);
						break;
					case "hypergoddess":
						r.push(`those servile little cuties! They could really use some cute little bellies!" ${hisA} avatar exclaims, practically giggling.`);
						break;
					case "loli":
					case "preggololi":
						r.push(`those fat butts!" ${hisA} avatar exclaims cheerfully.`);
						break;
					case "angel":
						r.push(`your soul! Pussies are for sex, not buttholes!" ${heA} shouts, bright red with embarrassment at what ${heA} is saying.`);
						break;
					case "cherub":
						r.push(`all those big butts!" ${hisA} avatar says while clutching ${hisA} own. "Would I look cute with a bigger rear?"`);
						break;
					case "incubus":
						r.push(`those amazing assholes; I bet they know just how to squeeze as you fuck 'em!" ${heA} exclaims, ${hisA} hard-on twitching with anticipation.`);
						break;
					case "succubus":
						r.push(`my ass instead," ${heA} says, shaking ${hisA} own giant ass and tight butthole at you.`);
						break;
					case "imp":
						r.push(`those bouncing asses," ${hisA} avatar says. "I just want to spank them all day long..."`);
						break;
					case "witch":
						r.push(`all that assflesh," ${hisA} avatar mutters. "So many panties ruined by that spell..."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`ass pussies," ${hisA} avatar states, sprouting a large dick-like appendage from its crotch. "Perfect for filling with young."`);
						break;
					case "schoolgirl":
						r.push(`those soft little bitches!" ${hisA} avatar trills.`);
						break;
					default:
						r.push(`those bottoms," ${heA} says.`);
				}
			} else if (schoolString === "TGA" || schoolString === "HA") {
				r.push(`"Just think of`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`their sweaty bodies," ${heA} concludes, ${hisA} avatar starting to masturbate.`);
						break;
					case "shemale":
						r.push(`those muscly bodies, all sweaty and..." ${heA} trails off, ${hisA} avatar starting to masturbate.`);
						break;
					case "amazon":
						r.push(`how they can fight!" ${heA} concludes, more loudly than is really necessary.`);
						break;
					case "businesswoman":
						r.push(`all that bodyguard potential," ${hisA} avatar says, looking aroused at the possibilities.`);
						break;
					case "fairy":
					case "pregnant fairy":
						r.push(`those big, strong, sweaty, sexy bodies!" ${hisA} avatar squeaks, looking beet red and breathing heavily.`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`all those hard, strong, rippling..." ${heA} trails off, too breathless to be specific.`);
						break;
					case "loli":
					case "preggololi":
						r.push(`those muscles!" ${heA} exclaims.`);
						break;
					case "angel":
						r.push(`those lovely muscles," ${heA} mutters. "I'd feel so safe with them around me..."`);
						break;
					case "cherub":
						r.push(`sweaty muscles!" ${hisA} avatar says. "I wonder if I could fly faster with them?"`);
						break;
					case "incubus":
						r.push(`their strength; think of the sexual positions!" ${heA} exclaims, ${hisA} hard-on twitching with anticipation.`);
						break;
					case "succubus":
						r.push(`their stamina," ${heA} says, licking ${hisA} lips. "You could fuck all night long without a single break!"`);
						break;
					case "imp":
						r.push(`that strength," ${hisA} avatar smirks. "You could spank a girl red, easily."`);
						break;
					case "witch":
						r.push(`how tall they are," ${hisA} avatar mutters. "I tried a muscle growth spell once... Ended up sixteen feet tall without any muscles; couldn't even stand under my weight."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`that grip," ${hisA} avatar states. "It would be effortless to pin a girl with that."`);
						break;
					case "schoolgirl":
						r.push(`those cute bitches!" ${hisA} avatar trills.`);
						break;
					default:
						r.push(`how well trained they always are," ${heA} says.`);
				}
			} else {
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "I have never wanted to have a real body more."`);
						break;
					case "shemale":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "They almost make me want a pussy, too."`);
						break;
					case "amazon":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "I like them."`);
						break;
					case "businesswoman":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "I wonder if I could code an avatar version of one of them. As my own assistant, of course."`);
						break;
					case "fairy":
					case "pregnant fairy":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "If only I could get a taste myself."`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "They truly have the best of both worlds."`);
						break;
					case "loli":
					case "preggololi":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "I wish I'll look like that when I grow up..."`);
						break;
					case "angel":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "They are unnatural, be careful around them."`);
						break;
					case "cherub":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "They are curious; I wonder what it would be like to have a body like that."`);
						break;
					case "incubus":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "I bet they'd squeal with every thrust of a dick against their prostate."`);
						break;
					case "succubus":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "Be careful around them, I might get jealous!"`);
						break;
					case "imp":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "There are so many places you could torment on someone with both sexes."`);
						break;
					case "witch":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "If you aren't careful with magic you can end up like that... Not that I have before!" ${heA} shouts, turning red.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`${capFirstChar(V.assistant.name)} pauses, ${hisA} hips and crotch splitting open to allow a massive phallic object to sag to the ground, "We are similar."`);
						break;
					case "schoolgirl":
						r.push(`${capFirstChar(V.assistant.name)} pauses and then says seriously, "They kind of make me want a cock."`);
						break;
					default:
						r.push(`"Just think of how unique they are," ${heA} says.`);
				}
			}
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Your assistant is a powerful analytic tool, but ${heA} lacks the capacity for true creativity. ${HeA} did not mention the long term. It would be possible to support the`);
		if (schoolString === "TUO") {
			r.push(`orphanage's`);
		} else if (schoolString === "GRI") {
			r.push(`lab's`);
		} else if (schoolString === "TCR") {
			r.push(`farm's`);
		} else if (schoolString === "TFS"){
			r.push(`Sisters'`);
		} else {
			r.push(`school's`);
		}
		r.push(`presence in the arcology, reaping all sorts of benefits. Alternatively, you might be able to undermine them covertly, picking up assets lost in the fallout of a local failure.`);

		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Accept the offer`, accept, (schoolString === "TFS" && V.PC.dick !== 0 && V.PC.vagina !== -1 && V.PC.boobs >= 300) ? "" : "This will add minor upkeep costs"),
			new App.Events.Result(`Politely decline`, decline)
		]);

		function accept() {
			V[schoolString].schoolPresent = 1;
			return `You call them back and accept the offer. They forward their specifications for an appropriate space and the modifications it needs to host them, along with their thanks.`;
		}

		function decline() {
			return `You call them back and politely communicate that your terms for rental of space in the arcology are not subject to special modification, even for trusted partners. This explanation is graciously accepted.`;
		}
	}
};
