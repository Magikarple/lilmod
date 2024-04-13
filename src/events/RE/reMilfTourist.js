App.Events.REMilfTourist = class REMilfTourist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].prosperity >= 100,
			() => V.rep > random(1, 30000) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	actorPrerequisites() {
		return [[
			(s) => s.devotion > 20,
			(s) => [Job.PUBLIC, Job.CLUB].includes(s.assignment),
			canTalk,
			canWalk,
		]];
	}

	execute(node) {
		const r = [];

		const milfSlave = getSlave(this.actors[0]);

		const tourist = GenerateNewSlave("XX", {
			minAge: 36, maxAge: 42, ageOverridesPedoMode: 1, race: "nonslave", disableDisability: 1
		});
		tourist.origin = "$He came to your arcology as a tourist and found $himself enslaved.";
		tourist.devotion = random(-70, -55);
		tourist.trust = random(-45, -25);
		setHealth(tourist, jsRandom(10, 20), undefined, undefined, undefined, 5);
		tourist.vagina++;
		tourist.hips = 2;
		tourist.butt = random(4, 6);
		tourist.boobs = 100 * random(10, 18);
		tourist.natural.boobs = tourist.boobs - 400;
		tourist.weight = random(60, 140);
		tourist.behavioralQuirk = "none";
		tourist.sexualQuirk = "none";
		tourist.canRecruit = 0;
		tourist.clothes = "conservative clothing";

		App.Events.drawEventArt(node, [milfSlave, tourist]);

		const {
			He,
			he, him, his, himself
		} = getPronouns(milfSlave);
		const {title: Master} = getEnunciation(milfSlave);

		const {
			He2,
			he2, him2, his2, himself2
		} = getPronouns(tourist).appendSuffix("2");

		const {
			HeA,
			heA, hisA, himselfA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		if (V.assistant.personality === 1) {
			r.push(`${capFirstChar(V.assistant.name)}'s`);
			if (V.assistant.appearance === "normal") {
				r.push(`symbol`);
			} else {
				r.push(`${V.assistant.appearance} avatar`);
			}
			r.push(`appears on your desk in the middle of the day. "Something unusual for you, ${properTitle()}," ${heA} says. "${milfSlave.slaveName} is out doing public service. A tourist from the old world accosted ${him}. ${milfSlave.slaveName} thought ${he2} was a rich citizen who wanted to fuck ${him}, but it turns out ${he2} just wanted a tour guide. It was a reasonable mistake; ${he2} seems wealthy. ${He} has been showing ${him2} around for the last half hour. Now ${he2}'s asked ${him} if ${he2} can meet you." ${HeA} displays a video feed showing ${milfSlave.slaveName} standing with the tourist in question out on the main plaza. ${He2}'s just into middle age, and extremely plush, wearing Capri pants over ${his2} motherly hips and a cashmere sweater that understates ${his2} generous bust. ${He2}'s blushing as ${he2} asks your slave a discreet question about public sex in the arcology, brought on by the sight of a couple of citizens spitroasting a slave. Your personal assistant's avatar`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`bares ${hisA} fangs and makes pinching gestures at nipple height.`);
					break;
				case "shemale":
					r.push(`gives a wolf whistle and makes exaggerated gestures over ${hisA} own boobs.`);
					break;
				case "amazon":
					r.push(`brandishes a club suggestively.`);
					break;
				case "businesswoman":
					r.push(`looks the tourist up and down over the tops of ${hisA} glasses.`);
					break;
				case "schoolgirl":
					r.push(`stares openly at the tourist's ass.`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`zips around the tourist, giving ${him2} a good look-over.`);
					break;
				case "hypergoddess":
				case "goddess":
					r.push(`eyes ${his2} fertile hips.`);
					break;
				case "loli":
				case "preggololi":
					r.push(`stares longingly at ${his2} huge tits.`);
					break;
				case "angel":
					r.push(`blushes at the sight of ${his2} obvious curves.`);
					break;
				case "cherub":
					r.push(`makes exaggerated movements over ${hisA} own tits.`);
					break;
				case "incubus":
					r.push(`is sporting an absolutely enormous erection. ${HeA} seems to be enjoying the show.`);
					break;
				case "succubus":
					r.push(`turns to face you; ${hisA} breasts huge armfuls, butt jiggling non-stop and a pair of hips to rival any cow. "My curves are better."`);
					break;
				case "imp":
					r.push(`makes pinching gestures at nipple height then turns and slaps ${hisA} own ass.`);
					break;
				case "witch":
					r.push(`blushes at the sight of those lovely curves.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`swells ${himselfA} to resemble ${his2} figure before twisting ${hisA} arm into a cock and ramming it straight up ${hisA} cunt.`);
					break;
				default:
					r.push(`reforms into an exaggerated female form before going back to ${hisA} normal symbol shape.`);
			}
		} else {
			r.push(`${capFirstChar(V.assistant.name)}`);
			r.push(`gets your attention the middle of the day. "A minor matter for you, ${properTitle()}," ${heA} says. "${milfSlave.slaveName} is currently performing public service. A tourist from the old world accosted ${him}. ${milfSlave.slaveName} thought ${he2} was a rich citizen who wanted to have sex with ${him}, but it seems ${he2} just wanted a tour guide. It was a reasonable mistake; the tourist appears wealthy. ${He} has been acting as ${his2} guide for the last half hour. The tourist has asked ${him} if ${he2} can meet you." ${HeA} displays a video feed showing ${milfSlave.slaveName} standing with the tourist in question out on the main plaza. ${He2}'s just into middle age, and extremely plush, wearing Capri pants over ${his2} motherly hips and a cashmere sweater that understates ${his2} generous bust. ${He2}'s blushing as ${he2} asks your slave a discreet question about public sex in the arcology, brought on by the sight of a couple of citizens spitroasting a slave.`);
		}

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Decline politely`, decline));
		choices.push(new App.Events.Result(`Share some Free Cities life with ${him2}`, share));
		choices.push(new App.Events.Result(`Encourage ${him2} to enjoy the slave with your compliments`, compliments));
		if (V.cash > 20000) {
			choices.push(new App.Events.Result(`Enslave ${him2}`, enslave, `This will require an unprofitable ${cashFormat(20000)}, since ${he2} is wealthy and obfuscating ${his2} fate will require considerable spending`));
		} else {
			choices.push(new App.Events.Result(null, null, `You cannot afford the ${cashFormat(20000)} enslaving ${him2} would require, since ${he2} is wealthy and obfuscating ${his2} fate would necessitate considerable spending`));
		}

		App.Events.addResponses(node, choices);

		function decline() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(
				`You have ${V.assistant.name} instruct ${milfSlave.slaveName} to pass on your regrets, and add a message for ${milfSlave.slaveName} expressing confidence in ${him} to represent you and the arcology perfectly well without you. ${He}'s <span class="trust inc">affirmed</span> by your trust in ${him}.`,
				Spoken(milfSlave, `"${Master},"`),
				`${he} reports the next time you see ${him},`,
				Spoken(milfSlave, `"that tourist was really nice. Also, I got ${him2} to have sex with me, after all. ${He2} was all hesitant and blushy about doing it in public, but ${he2} got better after the first time I ate ${him2} out."`),
				`${He} looks pleased with ${himself}.`,
				Spoken(milfSlave, `"I bet ${he2} <span class="reputation inc">tells all ${his2} friends</span> back home how much fun it is here."`)
			);
			repX(500, "event");
			milfSlave.trust += 4;
			seX(milfSlave, "oral", "public", "penetrative");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function share() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(
				`You have ${milfSlave.slaveName} bring the tourist up to meet you. ${He2}'s full of questions about what it's like to be an arcology owner, and you finally tell ${him2} that you can give ${him2} a pretty good idea. Eagerly, ${he2} asks you how, and you point at ${milfSlave.slaveName}, telling the tourist ${he2} ought to bend the slave over the couch if ${he2} wants to know what it's really like to be an oversexed oligarch.`,
				notLesbian(),
				Spoken(milfSlave, `fuck me. It'll be fun!"`),
				`The tourist turns to stare at ${him2}, and ${he2} offers just the right kind of plaintive expression.`,
				Spoken(tourist, `"O-okay,"`),
				`the tourist says in a tiny voice, and ${milfSlave.slaveName} giggles, hugging ${him2} from behind. ${He} cups one of the tourist's breasts, and snakes ${his} other hand down the front of ${his2} pants.`,
				Spoken(tourist, `"Here!?"`),
				`the tourist gasps, staring straight at you and blushing even harder. You tell ${him2} that that's how you do things in the Free Cities: enjoying a slave is nothing to be ashamed of. ${He2} looks doubtful, but ${he2} doesn't try to escape from ${milfSlave.slaveName}'s roving ${(hasBothArms(milfSlave)) ? "hands" : "hand"}, either. Your presence continues to bother ${him2} until ${milfSlave.slaveName} distracts ${him2} by getting ${him2} to cuddle on the couch and make out, providing enough of a distraction that ${he2} gets over ${his2} inhibitions and orgasms rather immodestly.`
			);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You offer ${him2} some liquid courage as ${he2} recovers, but ${he2}'s rapidly getting over ${his2} hesitation. As the alcohol suffuses ${him2}, ${he2} starts stealing glances at ${milfSlave.slaveName}, who for ${his} part is being as seductive as humanly possible. Finally, the tourist mouths 'fuck it' silently, reaches over, and openly gropes the slave's ass. ${milfSlave.slaveName} giggles and shifts lewdly, ensuring that the tourist's hand makes a thorough tour of everything the slave has. The tourist tentatively sinks a couple of fingers into ${him}, and the slave shamelessly slides ${himself} onto the invading digits, begging to be fucked. You make a party of it, with the various slaves who come and go over the course of the evening treated to the sight of ${him} getting fucked by the tourist. ${He2} drunkenly promises you to <span class="reputation inc">tell all ${his2} friends</span> how awesome your arcology is at one point, though ${he2} has to take ${his2} mouth off one of ${milfSlave.slaveName}'s nipples to do so.`);
			milfSlave.trust += 4;
			seX(milfSlave, "oral", "public", "penetrative", 3);
			seX(milfSlave, "anal", "public", "penetrative", 3);
			repX(500, "event");
			addTrinket("a thank-you note from a MILF tourist whom you made feel welcome in the arcology");

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function compliments() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(
				`You have ${milfSlave.slaveName} bring the tourist up to meet you, and exchange some minor pleasantries. You tell ${him2} that if ${he2} really wants to experience Free Cities life, though, ${he2} really should enjoy ${milfSlave.slaveName}, pointing at the slave hovering behind ${him2}. ${He2} blushes furiously, but before ${he2} can stammer a refusal, the slave whispers something into ${his2} ear.`,
				notLesbian(),
				Spoken(milfSlave, `give me a try."`),
				`The tourist turns to stare at ${him}, and ${he2} offers just the right kind of plaintive expression.`,
				Spoken(tourist, `"O-okay,"`),
				`the tourist says in a tiny voice, and ${milfSlave.slaveName} giggles, hugging ${him2} from behind. ${He} takes the tourist's hand, and they leave your office together.`
			);
			App.Events.addParagraph(frag, r);
			r = [];

			r.push(
				Spoken(milfSlave, `"${Master},"`),
				`${he} reports the next time you see ${him},`,
				Spoken(milfSlave, `"that tourist was really nice. Also, I got ${him2} to have sex with me, after all. ${He2} was going to take me back to ${his2} hotel but I got ${him2} to do me on the way. ${He2} was all hesitant and blushy about doing it in public, but ${he2} got better after the first time I ate ${him2} out."`),
				`${He} looks pleased with ${himself}.`,
				Spoken(milfSlave, `"I bet ${he2} <span class="reputation inc">tells all ${his2} friends</span> back home how much fun it is here."`)
			);
			milfSlave.trust += 4;
			seX(milfSlave, "oral", "public", "penetrative");
			repX(500, "event");
			addTrinket("a thank-you note from a MILF tourist whom you made feel welcome in the arcology");

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function enslave() {
			const frag = new DocumentFragment();
			let r = [];

			tourist.clothes = "no clothing";
			App.Events.refreshEventArt(tourist);
			r.push(
				`When your new slave comes to, ${his2} weight is hanging from ${his2} wrists, bound over ${his2} head. ${He2}'s not exactly thin, making the position uncomfortable for ${his2} arms, so ${he2} groggily stands, finding ${himself2} in a pool of light in the middle of a cell. ${He2}'s nursing a tremendous hangover, and though ${he2} does not realize it, ${he2}'s drugged. You're present, though not visible, witnessing ${his2} first conscious moment of slavery from your desk. Realization is slow. ${He2}'s no innocent, so ${he2} recognizes the sensations of waking up the morning after a night of drinking interspersed with vigorous vaginal, oral, and anal intercourse, but ${he2} does not remember the specifics. After a few minutes, ${he2} understands that no one is coming, and speaks up hesitantly:`,
				Spoken(tourist, `"Is anyone there?"`),
				`Getting no immediate answer, ${he2} slumps against ${his2} wrist restraints again, and begins to cry to ${himself2}.`,
				Spoken(tourist, `"W-why would a-anyone do this."`)
			);
			cashX(-20000, "event", tourist);
			r.push(App.UI.newSlaveIntro(tourist));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function notLesbian() {
			const r = [];
			r.push(
				Spoken(tourist, `"I'm, um, not really a lesbian,"`), // tourist.behavioralFlaw = "fucking LIAR";
				`the tourist responds hesitantly.`
			);
			if (milfSlave.dick > 0) {
				r.push(
					Spoken(milfSlave, `"You don't have to be,"`),
					`${he} purrs.`,
					Spoken(milfSlave, `"I have a cock."`),
					`${He} slides in, just close enough to prove it.`,
					Spoken(milfSlave, `"Please,`)
				);
			} else {
				r.push(
					Spoken(milfSlave, `"Having sex with slaves does not make you a lesbian,"`),
					`${he} purrs.`,
					Spoken(milfSlave, `"It's different here. Please,`)
				);
			}
			return r.join(" ");
		}
	}
};

