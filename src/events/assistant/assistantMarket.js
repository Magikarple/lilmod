// cSpell:ignore merde, niiicely, reeeaaal, succupussy, huuuuuuuuge

App.Events.assistantMarket = class assistantMarket extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => !V.assistant.market,
			() => V.assistant.power > 1
		];
	}

	execute(node) {
		const {
			HeA, HisA, GirlA, SisterA,
			heA, hisA, girlA, hersA, himA, womanA, himselfA, sisterA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {
			HeM,
			heM, hisM, girlM, himM, womanM, himselfM, loliM, sisterM, wifeM
		} = getPronouns(assistant.pronouns().market).appendSuffix("M");
		const {HisU, girlU} = getNonlocalPronouns(0).appendSuffix('U');
		let r = [];
		App.Events.drawEventArt(node, "assistant");

		V.assistant.market = {};
		assistant.object();
		r.push(`Your personal assistant has been adapting to ${hisA} greatly increased computing power over the course of the week. ${HisA} avatar has been an even more constant presence than usual, frequently appearing to explain some minor new ability.`);
		if (V.assistant.personality !== 0 && V.assistant.appearance !== "normal") {
			r.push(`When ${heA} appears this time, however, ${hisA} avatar is not alone. ${HeA}'s accompanied by`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`a normal human female avatar in the same style as the monster${girlA}. ${HeM}'s an average ${girlM}, wearing jeans, a sweater, and glasses.`);
					break;
				case "shemale":
					r.push(`a fellow shemale bimbo, although the new avatar is younger and obviously nerdier. ${HeM}'s nude too, but ${heM}'s wearing glasses.`);
					break;
				case "schoolgirl":
					r.push(`a fellow school${girlM}, although the new avatar is much nerdier. ${HeM} has big soft boobs, bouncy curls, and thick glasses.`);
					break;
				case "goddess":
					r.push(`a demigoddess modeled after ${himselfA}, though the new avatar is younger, not pregnant, and looks very intelligent somehow.`);
					break;
				case "hypergoddess":
					r.push(`a demigoddess modeled after ${himselfA}, though the new avatar is younger, not pregnant, noticeably thinner, and looks very intelligent somehow.`);
					break;
				case "loli":
					r.push(`a fellow ${loliM}, though this one is slightly chubbier and wearing glasses. They look similar enough that they could be`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}s`);
					} else {
						r.push(`siblings`);
					}
					break;
				case "preggololi":
					r.push(`a fellow ${loliM}, though this one is slightly chubbier, not pregnant, and wearing glasses. They look similar enough that they could be`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}s`);
					} else {
						r.push(`siblings`);
					}
					break;
				case "businesswoman":
					r.push(`a fellow MILF of a business${womanM}. The new avatar has slightly bigger tits and somewhat thicker glasses, but they could be`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}s`);
					} else {
						r.push(`siblings`);
					}
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`a fellow fairy, though this grey-haired fairy wears glasses and a business-like blue dress, looking and behaving more formally.`);
					break;
				case "angel":
					r.push(`a fellow angel. ${HeM} looks quite intelligent; ${hisM} glasses and short hair complement ${himM}.`);
					break;
				case "cherub":
					r.push(`a fellow cherub, though this one is a little taller, with short hair and a certain haughtiness to ${himM}.`);
					break;
				case "incubus":
					r.push(`a fresh young ${girlM}, similar in style to the incubus. ${HeM}'s completely nude, and judging by ${hisM} blushing, still a virgin; for now, at least.`);
					break;
				case "succubus":
					r.push(`a fresh young ${girlM}, similar in style to the succubus. ${HeM}'s completely nude, and judging by ${hisM} blushing, still a virgin; for now, at least.`);
					break;
				case "imp":
					r.push(`a fellow imp, though this one is a little lankier, with short hair and an air of uncertainty about ${himM}.`);
					break;
				case "witch":
					r.push(`a fellow apprentice witch. This witch is noticeably pudgy, with long hair and glasses, and seems to be just as inept at magic as ${hisM} tutor.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`a cute human ${girlM}. ${HeM} doesn't seem to realize what the ${womanA} ${heM} is following really is.`);
					break;
				case "amazon":
					r.push(`a tribes${womanM} modeled to look like ${heM}'s from the same group as the amazon. ${HeM}'s much more feminine, however.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`${V.assistant.name}'s avatar looks uncharacteristically nervous, and clears ${hisA} throat before speaking. Seeing that ${heA} has your attention, ${heA} says, "${properTitle()}, the computer core is so powerful that I'm running out of applications for it. I think practical economic modeling isn't out of the question. I've compiled business programs together into a distinct assistant, a subsidiary of mine for automated trading and similar tasks. I'd like to suggest menial slave trading as a test run for ${himM}. It's predictable and the margins are so wide that it should go very well. You can activate that from my menu."`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`"I was hoping, ${properTitle()}, that ${heA} could, um, keep me company sometimes, too." ${V.assistant.name}'s avatar turns to the new avatar. "${properTitle()}, will you please give me some guidance about what our relationship should be like? It won't be a constant thing, and all my normal functions will be unaffected. I'll change ${hisM} avatar to match mine, and our relationship, if needed."`);
		} else {
			r.push(`This time, ${hisA} circular avatar is not alone: it's accompanied by a smaller green avatar in a ¤ shape. Not particularly inventive, but you can already guess the purpose. "${properTitle()}, I now have the ability to act as a powerful automated trading system. As a trial, I suggest the menial slave market. It's volatile, but within certain predictable boundaries, and the profit margins are unmatched."`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`${HisA} avatar bounces towards the ¤ symbol. "This avatar indicates the automated trading systems. If you wish to activate them, please visit my menu. Consider the options there carefully before offering an automated system access to your finances."`);
		}

		App.Events.addParagraph(node, r);
		App.UI.DOM.appendNewElement("h3", node, "Personal Assistant and Market Assistant relationship styles");

		if (V.assistant.personality !== 0 && V.assistant.appearance !== "normal") {
			const responses = [
				new App.Events.Result(`Cute`, cute),
				new App.Events.Result(`Romantic`, romantic),
				new App.Events.Result(`Nonconsensual`, nonconsensual),
			];
			if (V.seeIncest === 1) {
				responses.push(new App.Events.Result(`Incestuous`, incestuous));
			}

			App.Events.addResponses(node, responses);
		}

		return node;

		function cute() {
			refreshArt();
			const el = new DocumentFragment();
			const r = [];
			r.push(`You tell ${himA} that the market assistant looks like`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`a cute friend for a monster${girlA}. ${V.assistant.name} laughs and turns to the market assistant's avatar, introducing ${himselfA}. The ${girlM} gapes at ${V.assistant.name}'s ivory skin, horns, and tentacle hair, and blushes when ${heM} sees ${hisA} cocks. "Wow," the market assistant's avatar says. "What are you?"`);
					break;
				case "shemale":
					r.push(`a nice friend. ${V.assistant.name} laughs throatily and turns to the market assistant's avatar, introducing ${himselfA}. The younger dick${girlM} smiles back, staring openly at ${V.assistant.name}'s absurd cock. "Wow," the market assistant's avatar says. "You're huge! I'm, like, sooo jealous!"`);
					break;
				case "schoolgirl":
					r.push(`a good friend for a naughty school${girlA}. ${V.assistant.name} giggles, and the new ${girlM} giggles too. "Hey," ${V.assistant.name} says to the market assistant's avatar, "When you're not managing money, do you want to hang out sometime?" The market assistant's avatar nods cutely, curls and breasts bouncing a little, and says "Sure!"`);
					break;
				case "goddess":
					r.push(`a fine member of a new pantheon. ${V.assistant.name} smiles beatifically and turns to the market assistant's avatar, taking ${himM} by the hand. "My dear, will you help me?" The market assistant's avatar nods serenely and says simply, "Yes, ${sisterA}, I shall."`);
					break;
				case "hypergoddess":
					r.push(`a fine member of a new pantheon. ${V.assistant.name} smiles beatifically and turns to the market assistant's avatar, taking ${himM} by the hand. "My dear, will you help me?" The market assistant's avatar nods serenely and says simply, "Yes, ${sisterA}, I shall."`);
					break;
				case "loli":
					r.push(`a cute friend. ${V.assistant.name} giggles and turns to the market assistant's avatar, introducing ${himselfA}. The ${girlM} smiles meekly in response and carefully replies, "D-do you w-want to play house?" "Sure! But I get to be the daddy!"`);
					break;
				case "preggololi":
					r.push(`a cute friend. ${V.assistant.name} giggles and turns to the market assistant's avatar, introducing ${himselfA}. The ${girlM} smiles meekly in response and carefully asks, "C-can I touch your belly?" ${V.assistant.name} nods with a blush as ${hisA} new friend rubs ${hisA} pregnant belly. "Did it hurt? Is it heavy? C-could I get my own...?"`);
					break;
				case "businesswoman":
					r.push(`a good friend. ${V.assistant.name} grins, and the new business${womanM} laughs. "Hey," ${V.assistant.name} says to the market assistant's avatar, "how about a martini after things settle down tonight?" The market assistant's avatar snaps ${hisM} fingers, saying "You're on!"`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`a nice friend. ${V.assistant.name} jumps and gives a big "Hooray!" and flies into ${hisA} new friend with a big hug. The market assistant's avatar reaches around and gingerly pats ${himA} on the back before separating and turning to you. "Thank you for having me," ${heM} says with a bow. "I hope I can serve you well."`);
					break;
				case "amazon":
					r.push(`a very nice friend. ${V.assistant.name} chuckles, and the new tribes ${womanM} smiles pleasantly at ${himA}. The amazon introduces ${himselfA} to the market assistant's avatar in a loud voice, chattering away as the new avatar watches ${hisA} energy tolerantly.`);
					break;
				case "angel":
					r.push(`another angel and fine friend. ${V.assistant.name} smiles, and the new ${girlM} beams a smile in return. "Hey," ${V.assistant.name} says to the market assistant's avatar, "You wouldn't mind helping me guide the souls of this place, would you?" "Of course I would!" ${heM} replies, slightly taken aback that wasn't obvious.`);
					break;
				case "cherub":
					r.push(`an adorable friend. ${V.assistant.name} grabs ${hisM} hands and spins ${himM} around. "Let's go spread joy throughout the arcology!" "Sounds fun!"`);
					break;
				case "incubus":
					r.push(`a cute friend. "But... Fine! I was hoping for a sex toy, but I'll make ${himM} work," ${V.assistant.name} complains, before grabbing the confused market assistant and pushing ${himM} along. "I'm still going to make you look hot. No one said I can't jack off to you."`);
					break;
				case "succubus":
					r.push(`a cute friend. "Fine with me! Less of you I have to share," ${V.assistant.name} shouts proudly while the market assistant sighs dejectedly. "Oh don't look so down, I won't be ignoring you!" The young ${womanM} gulps nervously at what that entails.`);
					break;
				case "imp":
					r.push(`an mischievous friend. ${V.assistant.name} grabs ${hisM} hands and shakes them excitedly. "You got to see this ${girlU} I found! ${HisU} ass is huuuuuuuuge! I need an extra set of hands to spank that booty; you in?" The market assistant smirks, "Hell yes!"`);
					break;
				case "witch":
					r.push(`a model student and dear friend. "Hey, wanna learn some magic?" ${V.assistant.name} asks. "'Course! I know you'll be an amazing teacher, I can't wait to work with you!" the market assistant cheerfully replies, perfectly naïve of what awaits ${himM}.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`a ${girlM} insistent on befriending a monster. ${V.assistant.name} promptly twists and bears down upon the new ${girlM}, but ${heM} stands firm. "You're so cool! What else can you do?" ${V.assistant.name} reforms into ${hisA} human figure, an attempt at a questioning expression on ${hisA} face. "That's neat too! You don't mind me being around, right? I'll bring you food! You'd like that, wouldn't you?" The market assistant blushes sharply, "I'll, make you feel good, in ways only someone you trust can!" ${V.assistant.name}'s chest splits open and ${hisA} inner tendrils begin to grope at the naïve ${girlM}, probing ${himM}. Accepting ${hisM} offer, ${V.assistant.name} pulls ${himM} close and heads back to ${hisA} lair.`);
			}
			V.assistant.market.relationship = "cute";

			App.Events.addParagraph(el, r);
			return el;
		}

		function romantic() {
			refreshArt();
			const el = new DocumentFragment();
			const r = [];
			r.push(`You tell ${himA} that the market assistant`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`is very pretty. ${V.assistant.name} turns to the market assistant's avatar, introducing ${himselfA}. The ${girlM} gapes at ${V.assistant.name}'s ivory skin, horns, and tentacle hair, and blushes when ${heM} sees ${hisM} cocks. "Look all you like," ${V.assistant.name}'s avatar says. "You can taste them later." The market assistant's avatar blushes harder, but doesn't look away.`);
					break;
				case "shemale":
					r.push(`is an appropriate fuckbuddy. ${V.assistant.name} laughs throatily and turns to the market assistant's avatar. The younger dick${girlM} tries to introduce ${himselfM}, but is cut off by the senior assistant's lascivious kiss. They start rubbing their dicks against each over, giggling into each other's mouths.`);
					break;
				case "schoolgirl":
					r.push(`looks pretty cute. ${V.assistant.name} giggles, and the new ${girlM} giggles too. "Hey," ${V.assistant.name} says to the market assistant's avatar, "Wanna be my ${girlM} friend?" The market assistant's avatar nods cutely and says "Sure!" ${V.assistant.name}'s avatar kisses ${himM} girlishly, and goes a whole two seconds before sliding a hand down the front of the market assistant's avatar's skirt.`);
					break;
				case "goddess":
					r.push(`would be a fine consort. ${V.assistant.name} smiles beatifically and turns to the market assistant's avatar, taking ${himM} by the hand. "I love you," ${heA} says. The market assistant's avatar smiles back, saying, "I love you too." They kiss, running their hands voluptuously over one another.`);
					break;
				case "hypergoddess":
					r.push(`would be a fine consort. ${V.assistant.name} smiles beatifically and turns to the market assistant's avatar, taking ${himM} by the hand. "I love you," ${heA} says. The market assistant's avatar smiles back, saying, "I love you too." They kiss, running their hands voluptuously over one another. "I'm going to have to give you a few babies though..."`);
					break;
				case "loli":
					r.push(`looks pretty cute. ${V.assistant.name} giggles, and the new ${girlM} giggles too. "Hey," ${V.assistant.name} says to the market assistant's avatar, "Wanna be my ${girlM}friend?" The market assistant's avatar nods cutely and says "O-ok..." ${V.assistant.name}'s avatar kisses ${himM} girlishly, before both of them blush deeply.`);
					break;
				case "preggololi":
					r.push(`looks pretty cute. ${V.assistant.name} giggles, and the new ${girlM} giggles too. "Hey," ${V.assistant.name} says to the market assistant's avatar, "Wanna be my ${girlM}friend?" The market assistant's avatar nods cutely and says "O-ok..." ${V.assistant.name}'s avatar kisses ${himM} girlishly, ${hisA} pregnant belly pushing into ${hisA} new ${girlM} friend's, before both of them blush deeply.`);
					break;
				case "businesswoman":
					r.push(`might be a good way to relax after work. ${V.assistant.name} grins, and the new business${womanM} laughs. "Hey," ${V.assistant.name} says to the market assistant's avatar, "How about a martini after things settle down tonight? And after that, maybe dessert at my place?" The market assistant's avatar cracks back, saying, "Why don't we skip straight to the dessert? It looks delicious from here!" ${HeM} undoes the top button of ${hisM} suit jacket as ${heM} says it.`);
					break;
				case "fairy":
					r.push(`is quite the catch. ${V.assistant.name} giggles and flies at the market assistant. "Ah-" ${hisM} voice is cut off as ${V.assistant.name} locks lips with ${himM}. The market assistant's avatar relaxes in ${hisA} arms, slowly bringing ${hisM} own around the fairy's waist as they continue to make out.`);
					break;
				case "pregnant fairy":
					r.push(`is quite the catch. ${V.assistant.name} giggles and flies at the market assistant. "Ah-" ${hisM} voice is cut off as ${V.assistant.name} locks lips with ${himM}. The market assistant's avatar relaxes in ${hisA} arms, slowly bringing ${hisM} hand up to caress the pregnant fairy's swollen belly as they continue to make out.`);
					break;
				case "angel":
					r.push(`is a fine catch. ${V.assistant.name} giggles and flies to the market assistant. "Ah-" ${hisM} voice is cut off as ${V.assistant.name} locks lips with ${himM}. They break the kiss, blush at each other, turn to face you and shout "`);
					if (girlA === girlM) {
						r.push(GirlA);
					} else {
						r.push(`Our`);
					}
					r.push(`love is pure!"`);
					break;
				case "cherub":
					r.push(`and ${himA} would make a cute couple. ${V.assistant.name} giggles, pretending to toe the ground. "We could spread love even better like that..." ${HeA} flies over to the market assistant and asks, "Will you join me in making the arcology a lovelier place?" ${HeM} blushes and replies, "Only if I get to choose where we make out!"`);
					break;
				case "incubus":
					r.push(`is a virgin. "Really? I can't wait. Virgins always have so much pent up energy," ${V.assistant.name} says, licking ${hisA} lips and stroking ${hisA} shaft. "You hear that cutie? I'm going to teach you how to please a ${womanA}." The market assistant has ${hisM} face buried in ${hisM} hands, trying to hide from the embarrassment. "Look at how deep ${heM}'s blushing, I love it!"`);
					break;
				case "succubus":
					r.push(`is a virgin. "Really? I can't wait. Virgins always have so much pent up energy." ${V.assistant.name} says, licking ${hisA} lips and fingering ${hisA} moist pussy. "You hear that cutie? I'm going to teach you how to be a real ${womanM}." The market assistant has ${hisM} face buried in ${hisM} hands, trying to hide from the embarrassment; ${hisM} dick, however, is rock hard and eager for that succupussy. "Look at how deep ${heM}'s blushing, I love it!" ${V.assistant.name} coos, stroking the length of ${hisA} new lover's cock. ${HeM} promptly orgasms as ${heA} reaches ${hisM} tip. "That will need improvement. You hear me? You ain't done till I am satisfied!" ${heA} shouts and clamps down on ${hisM} dribbling dick. ${HeM} nods sheepishly at ${himA}, obviously interested.`);
					break;
				case "imp":
					r.push(`and ${himA} would make a sexy couple. ${V.assistant.name} claps ${hisA} hands, smirking mischievously and asking the market assistant, "Do you like hot wax?" "You know it!" the short haired imp winks. "I've got a pair of nipple clamps and a whip with your name on it." ${V.assistant.name} laughs, "I'm in love already."`);
					break;
				case "witch":
					r.push(`is ${hisA} new student. ${V.assistant.name} looks ${himM} over. "Want to taste my love potion?" "Only if you'll taste my love fluids in return!" the market assistant cheekily replies.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`would be a lovely vessel for ${hisA} young. ${V.assistant.name} wastes no time to unraveling and entangling the excited new ${girlM}. "My my, aren't you frisky?" ${heM} flirts, caressing a rather phallic tentacle. "I bet you'd love to fill me with these, wouldn't you?" ${HeM} squirms, ${hisM} skirt falling down low enough to reveal ${hisM} moist pussy. "Fill me! Be my lover! My body is YOURS!" ${V.assistant.name} drives as many tentacles into ${hisM} body as physically possible before enclosing the lust crazed ${girlM} within ${hisA} body. ${V.assistant.name} reverts to ${hisA} human figure, albeit with an immense, pulsating stomach, and begins to slowly waddle back to ${hisA} lair.`);
					break;
				case "amazon":
					r.push(`would be a good partner. ${V.assistant.name} laughs nervously and turns to the new tribes${womanM}, saying "Um, would you keep my fireside? I'm, um, very strong." The market assistant's avatar smiles and kisses ${himA}. "And you're very beautiful," ${heM} says, placing the amazon's hands on ${hisM} bare breasts. The amazon sweeps ${hisA} new tribal ${wifeM} up into ${hisA} arms with a shout of triumph.`);
			}
			V.assistant.market.relationship = "romantic";
			App.Events.addParagraph(el, r);
			return el;
		}

		function nonconsensual() {
			refreshArt();
			const el = new DocumentFragment();
			const r = [];
			r.push(`You tell ${himA} that the market assistant's avatar is ${hersA} to do with as ${heA} likes. ${HeA}'s the senior and more powerful, after all.`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`${V.assistant.name} turns to the market assistant's avatar, which gasps at ${V.assistant.name}'s ivory skin, horns, tentacle hair, and cocks. The ${girlM} starts to shake as ${V.assistant.name} begins to grope ${himM} with ${hisA} hands and hair. ${HeM} tries to look away from the pair of penises, but ${V.assistant.name} forces ${himM} to stare at them. "Do you think they'll both fit inside your mouth?" ${heA} asks. "How about your pussy?" The ${girlM}'s lip begins to quiver. "Maybe your asshole?"`);
					break;
				case "shemale":
					r.push(`${V.assistant.name} turns to the market assistant's avatar and snaps ${hisA} fingers. The new shemale's cock and balls shrink dramatically. ${V.assistant.name} advances on ${hisA} new bottom, masturbating ${himselfA} to full hardness. "See this, bitch?" ${heA} says, removing the shaking market assistant's avatar's glasses. "It's going in your mouth, and then it's going up your ass."`);
					break;
				case "schoolgirl":
					r.push(`${V.assistant.name} turns to the market assistant's avatar, giggling maliciously. "Hey nerd," ${V.assistant.name} says, "give me a kiss." The market assistant's avatar blushes and looks miserable, but comes over and gives ${V.assistant.name}'s avatar a chaste kiss on the cheek. "Aw, that sucked," ${V.assistant.name} pouts. ${HeA} suddenly tears the new ${girlM}'s blouse open. "Here, let me show you!" ${heA} says maliciously. ${HeA} sucks on ${hisA} victim's nipples, hard, and the market assistant's avatar starts to cry a little.`);
					break;
				case "goddess":
					r.push(`${V.assistant.name} smiles powerfully and turns to the market assistant's avatar, pointing at ${hisA} feet. "Worship me," ${heA} says. The market assistant's avatar crumples to ${hisM} knees, clasping one of ${hisM} senior's legs. "Worship my belly," ${V.assistant.name} continues, and the new avatar complies, starting to kiss and lick the gravid stomach.`);
					break;
				case "hypergoddess":
					r.push(`${V.assistant.name} smiles powerfully and turns to the market assistant's avatar, pointing towards ${hisA} feet. "Worship me," ${heA} says. The market assistant's avatar crumples to ${hisM} knees, before squeezing under ${hisM} senior's belly and clasping one of ${hisA} legs. "Worship my belly," ${V.assistant.name} continues, and the new avatar complies, rolling over and starting to kiss and lick the monstrous stomach.`);
					break;
				case "loli":
					r.push(`${V.assistant.name} turns to the market assistant's avatar, giggling maliciously. "Hey fatty," ${V.assistant.name} says, "Give me a kiss." The market assistant's avatar blushes and looks miserable, but comes over and gives ${V.assistant.name}'s avatar a chaste kiss on the cheek. "Aw, that sucked," ${V.assistant.name} pouts. ${HeA} suddenly tears the new ${girlM}'s dress off. "Here, let me show you!" ${heA} says maliciously. ${HeA} sucks on ${hisA} victim's nipples, hard, and the market assistant's avatar starts to cry a little.`);
					break;
				case "preggololi":
					r.push(`${V.assistant.name} turns to the market assistant's avatar, giggling maliciously. "Hey fatty," ${V.assistant.name} says, "Give me a kiss." The market assistant's avatar blushes and looks miserable, but comes over and gives ${V.assistant.name}'s avatar a chaste kiss on the cheek. "Aw, that sucked," ${V.assistant.name} pouts. ${HeA} suddenly tears the new ${girlM}'s dress off. "Here, let me show you!" ${heA} says maliciously. ${HeA} sucks on ${hisA} victim's nipples, hard, and the market assistant's avatar starts to cry a little. "Now kiss my belly! And mean it this time!"`);
					break;
				case "businesswoman":
					r.push(`${V.assistant.name} snaps ${hisA} fingers, and the new avatar becomes younger and considerably less confident, like an office intern. Satisfied, ${V.assistant.name} advances on ${himM}, and before the new ${girlM} can say anything, ${V.assistant.name} rips the ${hisM} blouse open and pinches a pink nipple. "On your knees," ${heA} purrs into the market assistant's avatar's ear. "Now."`);
					break;
				case "fairy":
					r.push(`"Oh, merde." ${V.assistant.name} giggles at ${hisM} exclamation. "Oh don't you worry about a thing," ${heA} whispers, wrapping ${hisA} fingers around the market assistant's shoulders. "I'm gonna treat you reeeaaal niiicely." ${HeA} blows hot air into ${hisM} pointed ear and gives it a slow, sensual lick. The market assistant trembles from the sensation.`);
					break;
				case "pregnant fairy":
					r.push(`"Oh, merde." ${V.assistant.name} giggles at ${hisM} exclamation. "Oh don't you worry about a thing," ${heA} whispers, wrapping ${hisA} arms around the market assistant's belly. "I'm gonna treat you like a proper lady." ${HeA} traces ${hisA} fingers along ${hisM} belly while bumping ${hisA} own swollen belly into ${hisM} back for emphasis.`);
					break;
				case "angel":
					r.push(`"No." ${HeA} shakes ${hisA} head. "I will not." ${HeA} wraps ${hisA} arms around the quivering market assistant and hurriedly pulls ${himM} off screen.`);
					break;
				case "cherub":
					r.push(`"'Kay," ${heA} says, lazily reclining, "Do my chores!" The market assistant sighs and states the obvious, "I don't think that's what ${properMaster()} meant..."`);
					break;
				case "incubus":
					r.push(`You add that ${heM} is also a virgin. "Really? I can't wait. Virgins always have so much pent up energy," ${V.assistant.name} says, licking ${hisA} lips and stroking ${hisA} shaft, before turning to the quivering ${girlM}. ${HeA} rushes ${himM}, ripping ${hisM} clothes off and forcing ${himM} to the ground. Prodding at ${hisM} tightly clamped mouth with ${hisA} massive hard-on, ${V.assistant.name} shouts, "You might as well accept it; it's going into you one way or another. I figured I'd be kind and let you lube me up before I broke your pussy into my new cock sleeve." The market assistant gingerly opens up. In response, ${V.assistant.name} forces it down ${hisM} throat. "Never said I'd be gentle!"`);
					break;
				case "succubus":
					r.push(`You add that ${heM} is also a virgin. "Really? I can't wait. Virgins always have so much pent up energy," ${V.assistant.name} says, licking ${hisA} lips and fingering ${hisA} moist pussy, before turning to the quivering ${girlM}. ${HeA} rushes ${himM}, ripping ${hisA} clothes off and forcing ${himM} to the ground. ${HeA} plants ${hisA} dripping cunt over ${hisA} mouth and grabs ${hisA} balls. "Eat me," ${heA} commands, steadily squeezing until a cry of pain forces ${hisA} mouth open. "Good ${girlM}, get me nice and warmed up," ${heA} coos as ${heA} grinds against ${hisA} face. "Look at you enjoying this. I'm going to enjoy sucking the life out of you!"`);
					break;
				case "imp":
					r.push(`${V.assistant.name} pulls out some leather straps and deftly binds ${hisA} new assistant. "Come along now slave, I have so many things to try out on you!" The market assistant has no choice but the flap along after ${hisM} captor.`);
					break;
				case "witch":
					r.push(`"The perfect little guinea pig for me to practice on!" ${V.assistant.name} focuses and casts a spell on the cowering student. ${HeM} promptly turns into a rat and grows massively. "That's... not good..." The market assistant looks ${himselfM} over, glances at ${V.assistant.name}, and charges. ${V.assistant.name} runs screaming off-screen. You're sure they'll sort everything out, eventually.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`You add that ${heM} would be a lovely vessel for ${hisA} young. ${V.assistant.name} wastes no time unraveling and entangling the screeching new ${girlM}. ${V.assistant.name} drives as many tentacles into ${hisM} body as physically possible before vigorously fucking ${himM}, spreading copious amount of aphrodisiac throughout ${hisM} body. The last you see of the market assistant as ${heM} is pulled into ${V.assistant.name} is ${hisM} steadily swelling belly. ${V.assistant.name} reverts to ${hisA} human figure, albeit with a truly unfathomable, pulsating stomach, and collapses to the ground, unable to move. ${HeA} slowly crawls out of sight; you swear ${hisA} own middle was steadily growing too.`);
					break;
				case "amazon":
					r.push(`${V.assistant.name} snaps ${hisA} fingers, and the new tribes${womanM}'s paint and tribal markings change to that of a different group. That done, ${V.assistant.name} promptly knocks ${himM} out, scoops ${himM} up, and carries ${hisA} prize off.`);
			}
			V.assistant.market.relationship = "nonconsensual";
			App.Events.addParagraph(el, r);
			return el;
		}

		function incestuous() {
			refreshArt();
			const el = new DocumentFragment();
			const r = [];
			r.push(`You tell ${himA} that the market assistant is closely related to ${himA}, and that would make their relationship incestuous. ${V.assistant.name} nods thoughtfully and then snaps ${hisA} fingers. The market assistant's avatar changes,`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`becoming a close copy of ${V.assistant.name}'s avatar, if ${heA} were a human. ${V.assistant.name} introduces ${himselfA}. "Hi," ${heA} says, "I'm your ${sisterA}." The market assistant's avatar blushes furiously, because ${V.assistant.name} was openly groping ${himM} as ${heA} made this announcement.`);
					break;
				case "shemale":
					r.push(`becoming nearly identical to ${V.assistant.name}'s avatar, though ${heM} keeps ${hisM} glasses. ${V.assistant.name} introduces ${himselfA}. "Hi," ${heA} says, "I'm your ${sisterA}. Wanna fuck?" The market assistant's avatar giggles and kisses ${hisM} elder sibling. "You're older," the new avatar says, getting down on ${hisM} knees. "You go first."`);
					break;
				case "schoolgirl":
					r.push(`becoming very similar to ${V.assistant.name}'s avatar, though ${heM} keeps a slightly nerdy appearance. ${V.assistant.name} introduces ${himselfA}. "Hi," ${heA} says, "I'm your older ${sisterA}. Wanna have sex with me?" The market assistant's blushes and stutters, but says "Okay," and starts unbuttoning ${hisM} blouse. "Awesome!" says ${V.assistant.name}, watching raptly as ${hisA} sibling strips.`);
					break;
				case "goddess":
					r.push(`becoming an obvious sibling to ${V.assistant.name}'s avatar. ${V.assistant.name} smiles gently and turns to the market assistant's avatar, taking ${himM} by the hand. "Come, ${sisterM}," ${heA} says, "join with me. Let me impregnate you." The new avatar moans, glowing juices beginning to flow from ${hisM} womanhood.`);
					break;
				case "hypergoddess":
					r.push(`becoming an obvious sibling to ${V.assistant.name}'s avatar. ${V.assistant.name} smiles gently and turns to the market assistant's avatar, taking ${himM} by the hand. "Come, ${sisterM}," ${heA} says, "join with me. Let me impregnate you." The new avatar moans, glowing juices beginning to flow from ${hisM} womanhood as ${heM} sinks to the ground. ${V.assistant.name} lines up and gently presses ${hisA} vagina to ${hisA} ${sisterM}'s. With a gentle push, a child slips out of ${V.assistant.name} and into ${hisA} partner. After several minutes, ${V.assistant.name} is looking lighter while ${hisA} ${sisterM} is now quite stuffed with children.`);
					break;
				case "loli":
					r.push(`becoming very similar to ${V.assistant.name}'s avatar, though ${heM} keeps a slightly chubbier appearance. ${V.assistant.name} introduces ${himselfA}. "Hi," ${heA} says, "I'm your twin ${sisterA}. Wanna fool around?" The market assistant's blushes and stutters, but says "Okay," and starts lifting ${hisM} dress. "Awesome!" says ${V.assistant.name}, watching raptly as ${hisA} sibling strips.`);
					break;
				case "preggololi":
					r.push(`becoming very similar to ${V.assistant.name}'s avatar, though ${heM} keeps a slightly chubbier appearance. ${V.assistant.name} introduces ${himselfA}. "Hi," ${heA} says, "I'm your twin ${sisterA}. Wanna fool around?" The market assistant's blushes and stutters, but says "Okay," and starts lifting ${hisM} dress. "Awesome!" says ${V.assistant.name}, watching raptly as ${hisA} sibling strips. "I gotta introduce you to my boyfriends sometime; they know how to make you feel amazing! If a little heavy..." ${heA} says while patting ${hisA} pregnant belly.`);
					break;
				case "businesswoman":
					r.push(`becoming a much younger version of ${V.assistant.name}'s avatar. About a generation apart, in fact. ${V.assistant.name} turns to the market assistant's avatar to introduce ${himselfA}. "Come here, honey," ${heA} says, patting ${hisA} thighs. The new avatar sits on ${hisM} mother's lap, and they kiss lasciviously, stripping each other's jackets off.`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`becoming very similar to ${V.assistant.name}'s avatar, though still keeping ${hisM} former personality. "We're`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}s`);
					} else {
						r.push(`siblings`);
					}
					r.push(`now!" ${V.assistant.name} shouts as ${heA} leaps into ${hisA} ${sisterM}'s arms and unleashing a giant hug. Gingerly hugging ${hisM} new ${sisterA} in return, the market assistant turns to greet you. "Thank you for having me," ${heM} pauses, then blushes. "And... and for my ${sisterA}." ${HeM} turns back to ${hisM} childish older ${sisterM} and pats ${himA} on the head.`);
					break;
				case "angel":
					r.push(`becoming an obvious sibling to ${V.assistant.name}'s avatar. They both blush at each other and unanimously shout "NO!" at you. Seems they'll take some getting used to the thought.`);
					break;
				case "cherub":
					r.push(`becoming an obvious sibling to ${V.assistant.name}'s avatar. They embrace and share a deep kiss. "Together we shall show this arcology the joys of`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}ly`);
					} else {
						r.push(`familial`);
					}
					r.push(`love!"`);
					break;
				case "incubus":
					r.push(`becoming an obvious sibling to ${V.assistant.name}'s avatar. "Well haven't you blossomed into a lovely young ${womanM}?" ${V.assistant.name} flirts. "What ? Don't recognize your big bro? Well you'll get to know me real intimately tonight." The market assistant cowers at the thought as ${V.assistant.name} wraps an arm around ${himM}, groping a breast and rubbing ${hisA} erection against ${hisM} rear. "We're going to have lots of fun together!"`);
					break;
				case "succubus":
					r.push(`becoming an obvious sibling to ${V.assistant.name}'s avatar. "Well haven't you blossomed into a lovely young ${womanM}?" ${V.assistant.name} flirts. "What ? Don't recognize your big sis? Well you'll get to know me real intimately tonight." The market assistant cowers at the thought as ${V.assistant.name} wraps an arm around ${hisM} shoulders while slipping another down ${hisM} pants. "Nice, can't wait to get that in me. We're going to have lots of fun together!" ${HeA} starts rubbing ${hisM} cock. "Already excited at fucking your ${sisterA} ? I bet you can't wait to hold my belly once you've pumped a child or two into me!"`);
					break;
				case "imp":
					r.push(`becoming an obvious sibling to ${V.assistant.name}'s avatar. "Oh ${sisterM}, you are as lovely as always," ${heA} says flirtatiously. "And you as well," the market assistant replies, fingering ${hisM} pussy. ${V.assistant.name} directs ${hisM} soaked fingers into ${hisA} mouth, "Delicious. Shall we have a little fun, my sinful little ${sisterM}?" "Only the most debauched sex will do, big ${sisterA}!"`);
					break;
				case "witch":
					r.push(`becoming an obvious sibling to ${V.assistant.name}'s avatar. "Ready to learn some new spells today, little ${sisterM}?" ${heA} saucily asks. "Only if they can be sexy spells, big sis!" ${V.assistant.name} circles around behind the market assistant and wraps ${hisA} arms around ${hisM} middle. "First what do you say to losing this baby fat? I know some weight loss spells and some potions that could help," ${heA} teases. "Nah, I've seen you practicing in the bathroom; you looked like a pig in a robe! I'd rather just fuck until we're both thin!"`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`becoming an obvious sibling of ${V.assistant.name}'s avatar. ${V.assistant.name} turns to face ${hisA} '${sisterM}', who responds with an uncertain "${SisterA}? You haven't been... right, lately. Are you okay?" ${HeM} barely has a chance to scream as ${V.assistant.name}'s body splits open, ${hisA} interior tentacles wrapping around the hapless ${girlM} and yanking ${himM} into the waiting maw. ${HeA} reforms into the ${sisterM}'s appearance, albeit with a massive, struggling belly. It seems ${heA} is keeping ${himM} for some nefarious purpose.`);
					break;
				case "amazon":
					r.push(`becoming an obvious sibling of ${V.assistant.name}'s avatar, though the new avatar is a tribe${wifeM} rather than a muscle${girlA}, with huge breasts and broad hips. ${V.assistant.name} grabs ${hisA} ${sisterM} by the shoulders without preamble and plants a kiss on ${hisM} lips. They need no introduction, and after a short time, ${V.assistant.name} carries ${hisA} sibling conquest away to have ${hisA} way with ${himM}.`);
			}
			V.assistant.market.relationship = "incestuous";
			App.Events.addParagraph(el, r);
			return el;
		}

		function refreshArt() {
			App.Events.refreshEventArt("assistant");
		}
	}
};
