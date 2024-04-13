// cSpell:ignore Oooooh, chang'ao, abayas, Oooh

App.Events.rePregInventorShowOff = class rePregInventorShowOff extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.pregInventor === 1,
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.ID === V.pregInventorID,
				s => s.bellyPreg >= 600000,
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.fuckdoll === 0,
				s => s.devotion > 50
			],
		];
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {
			He, His,
			he, his, him, himself, woman, hers
		} = getPronouns(slave);
		const legs = hasBothLegs(slave) ? `legs` : `leg`;
		const arms = hasBothArms(slave) ? `arms` : `arm`;
		const {title: Master, say: say} = getEnunciation(slave);
		App.Events.drawEventArt(node, slave);
		const tvCost = 10000;
		let r = [];

		r.push(
			`Your broodmother,`,
			App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(slave), `,`),
			`has been using the resources you gave ${him} to expand the possibilities for sex with hyperpregnant slaves. ${He} has been working hard and is finally ready to show off ${his} results. Your assistant gives you a list of the slave's innovations and you decide to give one a try:`
		);
		App.Events.addParagraph(node, r);

		const responses = [
			new App.Events.Result(`Have ${him} show off ${his} developments in the sport of advanced maternity swing gymnastics.`, swing),
			new App.Events.Result(`Have ${him} give you a trained assisted strip show`, strip),
		];
		if (V.spa !== 0) {
			responses.push(new App.Events.Result(`Enjoy a game of 'jelly' wrestling in your new curative gelatin pool.`, wrestle));
		}

		App.Events.addResponses(node, responses);

		function swing() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`${He} is brought into your office alongside ${his} invention: a customized maternity swing. It is a true marvel of Free Cities engineering, resembling something designed for use with large marine mammals rather than a sex aid for a pregnant ${woman}. It has been specially rigged to support both its user and their sexual partner, and to suspend them in the air, enabling them to explore sex positions that would otherwise be rendered impossible by a hyperpregnant slave's mass and size. Just watching the effort your menials expend squeezing the ${SlaveTitle(slave)} into a device that would dwarf a normal person is enough to get you excited, and you're fully ready to enjoy some personal time with ${him} by the time they've hooked you both into the device. The maternity swing is controlled via a vocal command system and, as your menials retreat to give you time alone, you instruct it to lift both you and ${him} into the air.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`The reinforced silk supports strain slightly under the weight of your slave's belly, but they make no noise, and you soon find yourself suspended in midair with ${his}`);
			if (slave.vagina >= 10) {
				r.push(`huge, weeping pussy lips`);
			} else if (slave.vagina >= 6) {
				r.push(`loose pussy`);
			} else if (slave.vagina >= 3) {
				r.push(`pussy`);
			} else {
				r.push(`tight little pussy`);
			}
			r.push(`at perfect eye level. You go down on ${him} to get ${him} primed and enjoy the feeling of`);
			if (hasAnyLegs(slave)) {
				r.push(`${his} ${legs} wrapping around your head`);
			} else {
				r.push(`${his} stumps squeezing the sides of your head`);
			}
			r.push(`as you bring ${him} to climax.`);
			seX(slave, "vaginal", V.PC, "penetrative");
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`With gentle coaching from your slave, you rotate the two of you in the air so that ${he} can ride you reverse cowgirl style. ${VCheck.Vaginal(slave, 2)} You then switch ${him} around, allowing ${his} belly to eclipse your vision entirely as ${he} rides you in the traditional cowgirl position. The contents of ${his} womb have exploded its weight to the point that this position would have previously been hazardous to both your health and ${hers}, if not completely impossible, and the illusion of having sex while perpetually on the knife's edge of being flattened by literal tons of baby-packed slave flesh sends you over the edge. You`);
			if (V.PC.dick !== 0) {
				r.push(`ejaculate into ${him}, your cum dripping out of ${his} vagina, splattering on the ground below.`);
			} else {
				r.push(`orgasm as you transition into scissoring with your tightly packed broodmare, keeping the fantasy of being crushed by ${his} body foremost in your mind.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You explore many other sexual positions before commanding the maternity swing to take you back to earth. You extricate yourself from the device, but leave ${him} inside of it. ${He} does a little twirl in the device, showing off the shape of ${his} hyper-inflated body${(hasAnyLegs(slave)) ? `, the tips of ${his} toes barely touching the ground` : ``}.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"So what did you think, ${Master}?"`),
					`${he} asks. ${He} purses ${his} lips, waiting for your response.`
				);
			} else {
				r.push(`${He} motions to you, making it clear ${he}'s waiting for your judgment.`);
			}
			slave.devotion += 5;
			r.push(followUp());
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function strip() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`The first thing that you notice when your slave walks through the door is the way ${he} struts in with apparent ease. It's been quite a while since you've seen ${him} walk with any sort of elegance, but ${he} does so now. ${He} spins around, giving you a look at ${his}`);
			if (slave.butt > 11) {
				r.push(`debilitating, insanely enormous ass`);
			} else if (slave.butt > 5) {
				r.push(`huge ass`);
			} else if ((slave.buttImplant / slave.butt) > .60) {
				r.push(`implant-swollen ass cheeks`);
			} else if (slave.butt > 2) {
				r.push(`plump ass`);
			} else {
				r.push(`slender ass`);
			}
			r.push(`and then shakes ${his} booty,`);
			if (canSee(slave)) {
				r.push(`glancing over ${his} shoulder to see`);
			} else if (canHear(slave)) {
				r.push(`turning ${his} head to hear`);
			} else {
				r.push(`waiting patiently to find out`);
			}
			r.push(`how you react. You prompt ${him} to continue and ${he} turns around and approaches you, stopping only when ${his} massive belly is looming in front of you, almost touching you. You look over the apex of ${his} stomach to consider the "invention" ${he}'s developed to enable ${his} miraculous mobility.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`A significant number of menial slaves have been repurposed and specially trained to aid your hyperbroodmother and ${his} incredible belly. These menials,`);
			if (V.arcologies[0].FSPaternalist > 60) {
				r.push(`outfitted with expensive safety gear to protect them during their potentially dangerous endeavors,`);
			} else if (V.arcologies[0].FSRepopulationFocus > 60) {
				r.push(`themselves pregnant, though not nearly as large,`);
			} else if (V.arcologies[0].FSRestart > 60) {
				r.push(`low-quality stock unfit to serve as breeders,`);
			} else if (V.arcologies[0].FSPastoralist > 60) {
				r.push(`their huge, milky tits squashed up against your slave's body, leaking milk,`);
			} else if (V.arcologies[0].FSAssetExpansionist > 60) {
				r.push(`their huge tits and asses serving as exotic cushions for the tender flesh of your massively bloated hyperbroodmother,`);
			} else if (V.arcologies[0].FSTransformationFetishist > 60) {
				r.push(`their huge implanted tits and asses clearly designed to maximize their potential as cushions for your massively bloated hyperbroodmother,`);
			} else if (V.arcologies[0].FSPhysicalIdealist > 60) {
				r.push(`their impressive muscles rippling as they exert themselves,`);
			} else if (V.arcologies[0].FSHedonisticDecadence > 60) {
				r.push(`surprisingly strong, given how plush they are, and well suited for their job,`);
			} else if (V.arcologies[0].FSChattelReligionist > 60) {
				if (V.arcologies[0].FSChattelReligionistLaw2 === 0) {
					r.push(`dressed in skimpy monks habits`);
				} else {
					r.push(`completely nude`);
				}
				r.push(`and eyes flashing with exalted fervor as they go about their duties,`);
			} else if (V.arcologies[0].FSYouthPreferentialist > 60) {
				r.push(`just barely the legal age for consent in your arcology and clearly eager to prove themselves,`);
			} else if (V.arcologies[0].FSMaturityPreferentialist > 60) {
				r.push(`plush MILFs who support your hyperbroodmother's insane pregnancy with a hint of maternal affection,`);
			} else if (V.arcologies[0].FSSlimnessEnthusiast > 60) {
				r.push(`lithe and possessed of wiry strength,`);
			} else if (V.arcologies[0].FSStatuesqueGlorification > 60) {
				r.push(`impressively tall and quite capable of handling your massively bloated hyperbroodmother,`);
			} else if (V.arcologies[0].FSPetiteAdmiration > 60) {
				r.push(`tiny and trying their hardest to move ${him},`);
			} else if (V.arcologies[0].FSSlaveProfessionalism > 60) {
				r.push(`quick witted slaves who flawlessly redirect attention to your hyperpregnant star,`);
			} else if (V.arcologies[0].FSIntellectualDependency > 60) {
				r.push(`very aroused and having trouble staying focused when so intimately close to such an expanse of flesh,`);
			} else if (V.arcologies[0].FSRomanRevivalist > 60) {
				r.push(`dressed in a skimpy reproduction of roman legionary garb,`);
			} else if (V.arcologies[0].FSNeoImperialist > 60) {
				r.push(`dressed in skimpy bodysuits that outline their tight bodies,`);
			} else if (V.arcologies[0].FSAztecRevivalist > 60) {
				r.push(`clad only in exotic feathers,`);
			} else if (V.arcologies[0].FSEgyptianRevivalist > 60) {
				r.push(`dressed in ankle-length tarkhans made of brass and turquoise colored beads,`);
			} else if (V.arcologies[0].FSEdoRevivalist > 60) {
				r.push(`dressed in skimpy noh theater costumes,`);
			} else if (V.arcologies[0].FSArabianRevivalist > 60) {
				r.push(`their sinful figures made modest by roomy abayas,`);
			} else if (V.arcologies[0].FSChineseRevivalist > 60) {
				r.push(`clad in traditional silk chang'ao and lotus shoes,`);
			} else if (V.arcologies[0].FSAntebellumRevivalist > 60) {
				r.push(`dressed in skimpy sheer white gowns,`);
			} else {
				r.push(`their clothing specifically chosen to supplement and flatter your hyperbroodmother's own outfit,`);
			}
			r.push(`act to support ${his} movements as ${he} teases you, seemingly heedless of their own safety. Their ego has been subsumed in pursuit of their duties and, as they fall into place to hold up ${his} gargantuan belly with each of ${his} slightest, most thoughtless movements, they give you the impression of being more extensions of ${his} will than independent beings. Your hyperbroodmother leans forward, just the slightest bit, as you consider ${his} assistants, and presses ${his} unfathomable stomach into your crotch. As ${he} does so, two of ${his} assistants slide under ${his} belly with practiced ease, cushioning it with their bodies to prevent it from touching the cold ground. No sound passes their lips as the gargantuan organ crushes down on them, but you can hear their bones creak.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"Oooh, someone likes what they see,"`));
				r.push(`${he} ${say}s.`);
			} else {
				r.push(`${He} can't speak, but ${he} does grin and roll ${his} belly up and down your lap for a moment, ${his} servants lifting and supporting ${him} from the periphery such that ${he} seems to be in casual control of ${his} immobilizing bulk.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`It is only then that you realize that`);
			if (V.PC.dick !== 0) {
				r.push(`your dick is as hard as a length of steel.`);
			} else {
				r.push(`your kitty is positively drowning in fem-cum.`);
			}
			r.push(`You move to touch ${his} belly, but ${he} steps backward, leaving it just out of reach.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"If you'll permit, ${Master},"`),
					`${he} ${say}s teasingly,`,
					Spoken(slave, `"I'd like to show off my 'invention' just a little longer."`)
				);
			} else {
				r.push(`${He} smirks and`);
				if (hasAnyArms(slave)) {
					r.push(`motions to you that ${he}'d like to tease you just a little longer.`);
				} else {
					r.push(`one of ${his} servants, seeming to read their mistress's mind, motions to you that your slave has something big to show off still.`);
				}
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You motion for ${him} to continue.`);
			if (hasAnyArms(slave)) {
				r.push(`${He} lifts ${his} ${arms} over ${his} head and begins to spin again, giving you a glorious view of ${his}`);
			} else {
				r.push(`${His} servants spin ${him} again, giving you a glorious view of ${his}`);
			}
			if (slave.boobs >= 20000) {
				r.push(`eye-wateringly massive tits`);
			} else if (slave.boobs >= 3000) {
				r.push(`huge tits`);
			} else if ((slave.boobsImplant / slave.boobs) >= .60) {
				r.push(`luscious, augmented tits`);
			} else {
				r.push(`petite breasts`);
			}
			r.push(`and`);
			if (slave.butt > 11) {
				r.push(`couch-smothering ass cheeks.`);
			} else if (slave.butt > 5) {
				r.push(`enormous ass.`);
			} else if ((slave.buttImplant / slave.butt) > .60) {
				r.push(`implant-filled ass.`);
			} else if (slave.butt > 2) {
				r.push(`delicious-looking ass.`);
			} else {
				r.push(`small ass.`);
			}
			r.push(`As ${he} spins, ${his} servants support ${his} motions, using their own bodies to cushion and propel ${him} in the direction ${he} wants. They move in a limp manner that seems to blend into ${his} body, keeping the focus of your attention on your slave's form rather than theirs. One enters your office with a portable stripper stage, complete with pole, and your slave makes ${his} way over to it.`);
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"There were some... sacrifices,"`),
					`${he} ${say}s,`,
					Spoken(slave, `"to get where we are today."`)
				);
				if (hasAnyArms(slave)) {
					r.push(`${He} raises ${his} ${arms} as ${his} myriad servants plaster themselves to ${his} monolithic body, raising ${his} considerable bulk to a sufficient height to allow ${him} to take hold of the pole.`);
				} else {
					r.push(`${He} raises a dainty stub and one of ${his} myriad servants, pressed back to back with ${him} to help support ${his} weight as the others push ${him} into position, snakes a hand upward, creating the illusion that, for just this moment, your amputee broodmother is whole once more and grabbing onto the pole.`);
				}
			} else {
				if (hasAnyArms(slave)) {
					r.push(`${He} motions to you that there were some sacrifices, raising ${his} ${arms} as ${his} myriad servants plaster themselves under ${his} monolithic belly, raising ${his} considerable bulk to sufficient height to allow ${him} to take hold of the pole.`);
				} else {
					r.push(`The servant serving as the "mouth" for your mute, limbless hyperpregnant slave motions to you that there were some sacrifices. Your slave raises a dainty stub and one of ${his} myriad servants, pressed back to back with ${him} to help support ${his} weight as the others push ${him} into position, snakes a hand upward, creating the illusion that, for just this moment, your amputee broodmother is whole once more and grabbing onto the pole.`);
				}
			}
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"I think you'll find, though..."`), `${he} ${say}s.`);
			} else if (hasAnyArms(slave)) {
				r.push(`${He} motions that "${he} believes you'll find," then falls into a coy silence.`);
			} else {
				r.push(`${His} mouthpiece motions that your slave "believes you'll find," then falls into a coy silence.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${He}'s spinning around the pole now, reminding you of ${his} earlier motions. ${He} seems weightless, ${his} massive bulk perfectly supported regardless of the personal cost to those supporting ${him}. Your gaze turns to several motionless servants who have been knocked unconscious by ${his} careening bulk. They're piled up against a side wall, but inconspicuous. You can't recall when they collapsed, or when they were dragged away. The passiveness with which your slave's glorified human clothing moves makes even the collapsed menials seem natural and perfectly reasonable — just something that happens when your hyperbroodmother exercises ${his} body, sometimes. Not an abuse of another person. More like flexing a limb.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${His} servants surge upward, piling on top of each other and rotating ${him}. ${He} flips upside down and, for a moment, you worry that ${he} might fall with disastrous consequences. The mass of human bodies working in tandem to protect and enable ${him} executes its motions in perfect synchrony, however, and you are treated to the sight of an impossibly pregnant slave`);
			if (hasAnyLegs(slave)) {
				r.push(`spinning upside down, hooking one leg around a stripper pole,`);
			} else {
				r.push(`spinning upside down`);
			}
			r.push(`and performing a slow, effortless body inversion, ${his} massive upside down belly rotating just a split second slower than the rest of ${him}. ${He} rotates some more and then flips back into a normal standing position, leaning over ${his} stomach and once again slightly crushing ${his} now visibly exhausted servants as ${he} performs a mock bow.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"That it was worth it!"`),
					`${he} ${say}s, finishing ${his} earlier statement.`,
					Spoken(slave, `"So, what do you think?"`),
					`${he} asks. ${He} seems not even slightly out of breath.`
				);
			} else if (hasAnyArms(slave)) {
				r.push(`${He} motions to you, communicating the last part of ${his} earlier message: "that it was worth it!" ${He} then indicates that ${he} is waiting for your opinion. You note that ${he} hasn't even broken a sweat.`);
			} else {
				r.push(`${His} mouthpiece motions to you, communicating the last part of the message your slave started earlier: "that it was worth it!" The menial then indicates that your slave is waiting for your opinion of ${his} work. You note that your hyperbroodmother hasn't even broken a sweat.`);
			}
			r.push(followUp());
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function wrestle() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Your slave asks you to meet ${him} in your spa. Upon entering, you take a moment to enjoy the`);
			if (V.spaDecoration === "Paternalist") {
				r.push(`sight of the opulently appointed pools and the intellectually stimulating shows streaming from the many screens set on the walls of the room.`);
			} else if (V.spaDecoration === "Repopulationist") {
				r.push(`sight of all of the maternity aid devices scattered throughout the room. Whatever the nature of ${his} invention, your slave's toy is guaranteed to fit in well in these particular baths.`);
			} else if (V.spaDecoration === "Eugenics") {
				r.push(`sight of the dualistic, caste-based facilities.`);
			} else if (V.spaDecoration === "Pastoralist") {
				r.push(`faint smell of milk that wafts through the room with the steam and the sight of the many aid devices that your hypermassive slaves absolutely require to make use of the facilities.`);
			} else if (V.spaDecoration === "Asset Expansionist") {
				r.push(`sight of the aid equipment that your hypermassive slaves absolutely require to make use of the facilities.`);
			} else if (V.spaDecoration === "Transformation Fetishist") {
				r.push(`sight of the various surgical recovery devices scattered throughout the room.`);
			} else if (V.spaDecoration === "Physical Idealist") {
				r.push(`sight of the various light impact workout machines scattered throughout the room.`);
			} else if (V.spaDecoration === "Hedonistic") {
				r.push(`smell of the lavishly appointed cornucopias of food scattered around the facility's many opulent pools.`);
			} else if (V.spaDecoration === "Chattel Religionist") {
				r.push(`sight of the ritual pools and the various icons of the faith scattered throughout the room.`);
			} else if (V.spaDecoration === "Youth Preferentialist") {
				r.push(`carnival atmosphere created by the waterpark theming of the facilities.`);
			} else if (V.spaDecoration === "Gender Radicalist") {
				r.push(`sight of the extreme penetration-based pornography feeds streaming from the many screens set on the walls of the room.`);
			} else if (V.spaDecoration === "Gender Fundamentalist") {
				r.push(`sight of the traditionalist pornographic feeds streaming from the many screens set on the walls of the room.`);
			} else if (V.spaDecoration === "Maturity Preferentialist") {
				r.push(`sight of the many businesslike, beautifying devices and service stations scattered throughout the room.`);
			} else if (V.spaDecoration === "Slimness Enthusiast") {
				r.push(`comfortable atmosphere of the facilities.`);
			} else if (V.spaDecoration === "Degradationist") {
				r.push(`sight of the all-seeing cameras scattered throughout the room. You give a nod to one of the obvious ones, knowing there's an audience watching.`);
			} else if (V.spaDecoration === "Roman Revivalist") {
				r.push(`sight of the sexual mosaics at the bottom of its spacious baths.`);
			} else if (V.spaDecoration === "Aztec Revivalist") {
				r.push(`sight of its golden idols and exotic animal trophies as well as the warm smell of tropical herbs.`);
			} else if (V.spaDecoration === "Egyptian Revivalist") {
				r.push(`heavy perfumed air pervading the room and the sight of its warm, reed-lined pools.`);
			} else if (V.spaDecoration === "Edo Revivalist") {
				r.push(`steam rising up off of the stone-lined onsen pools.`);
			} else if (V.spaDecoration === "Arabian Revivalist") {
				r.push(`vibrant tilework and the smell of the heavy perfume in the steamy air.`);
			} else if (V.spaDecoration === "Chinese Revivalist") {
				r.push(`stultifying, gloomy atmosphere pervading the room.`);
			} else if (V.spaDecoration === "Body Purist") {
				r.push(`comfortable atmosphere of the facilities.`);
			} else if (V.spaDecoration === "Neo-Imperialist") {
				r.push(`sight of the verdant greenery, brilliant high-tech lighting, and steaming central bath.`);
			} else if (V.spaDecoration === "Antebellum Revivalist") {
				r.push(`intense humidity, like a sweet summer day in the South.`);
			} else {
				r.push(`sight of its spacious baths and pleasant atmosphere.`);
			}
			r.push(`Your eyes then fall on what must be ${his} invention: a new pool, set in a corner. It's not Olympic size, but it is quite large compared to most of your other pools — a large oval — and it is completely filled with a clear, gooey substance. Lounging in it, facing you and with ${his} massive belly poking out just far enough for you to enjoy the sight of ${his} bulging "outie" belly button, is your slave, wearing an attractive bikini that seems to be soaked through with whatever goo is filling the pool. ${He}`);
			if (hasAnyArms(slave)) {
				r.push(`waves at you and then gently rolls forward onto ${his} astounding pregnancy,`);
			} else {
				r.push(`waves a stub at you and then pokes it at a holographic remote array hovering nearby. A mobility assistance device in the pool rolls ${him} forward onto ${his} astounding pregnancy,`);
			}
			if (slave.boobs >= 20000) {
				r.push(`causing ${his} insanely enormous tits to flop onto the tile at the pool's edge with a loud "thwack."`);
			} else if (slave.boobs >= 3000) {
				r.push(`resting ${his} enormous breasts on the pool's edge, causing them to push up into ${his} chin as ${he} looks up at you.`);
			} else if ((slave.boobsImplant / slave.boobs) >= .60) {
				r.push(`resting ${his} huge, implant-distended tits on the pool's edge, causing them to push up into ${his} chin as ${he} looks up at you.`);
			} else {
				r.push(`giving you a nice view of ${his} cute tits.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"Hi, ${Master},"`),
					`${he} ${say}s.`,
					App.UI.DOM.makeElement("span", Spoken(slave, `"Oooooh...`), "italic"),
					Spoken(slave, `you have no idea how good this feels. My aching belly is warmed all through — well? Why don't you come in and I'll explain things."`),
				);
			} else if (hasAnyArms(slave)) {
				r.push(`${He} motions to you in more formal greetings and then lets out an involuntary moan of pleasure, rubbing at the sides of ${his} tremendous belly. ${He} beckons you to enter the pool.`);
			} else {
				r.push(`${He} is limbless as well as mute, so ${he} can't greet you more formally, but ${his} pleasurable, incomprehensible moaning and the way ${he} presses ${his} stumps into ${his} monstrously inflated, baby-packed belly makes it clear to you that ${he}'s happy to see you. You decide to get into the pool to try out your slave's invention for yourself.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You strip and put on one of the swimming outfits that are stored in the baths for your personal use, then slide yourself into the pool, squeezing in between its wall and your hyperswollen broodmother. The gel has a medicinal scent masked by lavender and is the perfect warmth to ease your muscles as you slide into it. Your skin tingles at its touch.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"It's curative jelly,"`),
					`your slave explains.`,
					Spoken(slave, `"I'm so big, now, it takes most of the day to moisturize my poor belly, even with help. With this jelly pool, it only takes a few minutes. I'm sure this pool can help all sorts of slaves with big assets so that they can keep themselves looking pretty for their ${Master}."`)
				);
			} else {
				if (hasAnyArms(slave)) {
					r.push(`${He} motions to you, explaining in sign that the pool is filled with curative gel. It's designed to help slaves with enormous assets moisturize their oversized bodies without having to spend all day applying it manually.`);
				} else {
					r.push(`Your personal assistant chimes in to explain that the pool is filled with curative gel. It's designed to help slaves with enormous assets moisturize their oversized bodies without having to spend all day applying it manually.`);
				}
			}
			App.Events.addParagraph(frag, r);
			r = [];
			if (hasAnyArms(slave)) {
				r.push(`${He} presses a few buttons on a holographic remote array`);
			} else {
				r.push(`${He} nods a signal`);
			}
			r.push(`and a series of silk-lined spherical rollers at the base of the pool come to life, humming as they spin ${his} laden body around. ${He} pushes into your chest, rotating forward so that ${his}`);
			if (slave.boobs >= 20000) {
				r.push(`colossal breasts spread out around you, completely surrounding your head. With some effort, you part ${his} heavy cleavage enough to be able to continue listening to ${him} without being smothered.`);
			} else if (slave.boobs >= 3000) {
				r.push(`massive chest fills the space between you, blocking your view of ${his} face. You spread ${his} cleavage enough to be able to continue listening to ${him}.`);
			} else if ((slave.boobsImplant / slave.boobs) >= .60) {
				r.push(`fat, implanted tits fill the space between you, blocking your view of ${his} face. With some effort, you spread ${his} tightly packed, spherical cleavage enough to be able to continue listening to ${him}.`);
			} else {
				r.push(`spherical belly pushes into your crotch.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He} then reaches out and, after you nod that ${he} can continue, ${he} caresses your face.`);
			} else {
				r.push(`${He} then reaches out to caress your face, but blushes and stops the motion as ${he} remembers that ${he} is physically unequipped to do so.`);
			}
			r.push(`${His} weight falls onto you and pushes you into the cushioned wall of the pool. The wall gives beneath your combined bulk, swelling down and outward to accommodate and support you.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"Do you like it, ${Master}?"`),
					`${he} asks.`,
					Spoken(slave, `"It's built to grow and change as your slaves do. It should be the perfect size to support them, no matter what that size might be. And if we ever get too big for even that, well..."`),
					`${he} smiles and you realize that, between the feeling of ${his} heavy, slick mass pressing into you and the rejuvenating effect of the gel,`);
				if (V.PC.dick !== 0) {
					r.push(`you're hard as a rock and`);
				} else {
					r.push(`your pussy is absolutely weeping and you are`);
				}
				r.push(`as refreshed and eager to fuck as you've been in quite some time.`);
				r.push(Spoken(slave, `"We can always just make it... bigger."`));
			} else {
				if (hasAnyArms(slave)) {
					r.push(`${He} motions to you, explaining that the pool is designed to grow to accommodate and support its users, then smiles. You realize that, between the feeling of ${his} heavy, slick mass pressing into you and the rejuvenating effect of the gel,`);
					if (V.PC.dick !== 0) {
						r.push(`you're hard as a rock${(V.PC.vagina > -1) ? `, your pussy is absolutely weeping,` : ``} and`);
					} else {
						r.push(`your pussy is absolutely weeping and you are`);
					}
					r.push(`as refreshed and eager to fuck as you've been in quite a while.`);
				} else {
					r.push(`Your personal assistant explains that the pool has been designed to grow to accommodate and support its users. You're only half-listening to what ${he} is saying, however, as you have suddenly realized that, between the feeling of your slave's heavy, slick mass pressing into you and the rejuvenating effect of the gel,`);
					if (V.PC.dick !== 0) {
						r.push(`you're hard as a rock and`);
					} else {
						r.push(`your pussy is absolutely weeping and you are`);
					}
					r.push(`as refreshed and eager to fuck as you've been in quite a while.`);
				}
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Your arousal gives you an idea, and you push back on your hyperbroodmother's colossal belly. ${He} steps away from you until ${he} is in the center of the pool, a look of confusion on ${his} face. You take control of the remote and then manipulate the reticulating frame supporting the pool such that it lifts the floor, slowly rendering both you and your colossal-bellied breeder knee deep in the warm gel. You hunker down into an aggressive, combative stance and`);
			if (hasAnyCyberneticEyes(slave)) {
				r.push(`${his} ${App.Desc.eyesColor(slave, "synthetic")} flash white for a moment as a look of understanding dawns on ${his} face.`);
			} else if (canSee(slave)) {
				r.push(`a look of understanding lights up in ${his} ${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`a look of understanding spreads on ${his} face as ${he} ${canHear(slave) ? `hears and ` : ``}feels the ripples of your exaggerated motions in the thick gel.`);
			}
			if (!canTalk(slave)) {
				if (hasAnyArms(slave)) {
					r.push(`${He} waves ${his} ${arms} in mock dismay`);
					if (slave.skill.combat > 30) {
						r.push(`and lowers ${his} guard`);
					}
					r.push(`as you prepare to wrestle ${him} in the pool of goop.`);
				} else {
					r.push(`${He} waves ${his} stubs in mock dismay as you prepare to wrestle ${him} in the pool of goop.`);
				}
			} else {
				r.push(Spoken(slave, `"Oh no,"`), `${he} ${say}s in mock dismay${(slave.skill.combat > 30) ? `, lowering ${his} guard` : ``}. "My ${Master} is going to wrestle me into submission in this hot, heavy, goo pool. Whatever will I do?"`);
			}
			r.push(`You circle around ${him}, slowly approaching ${him}, and ${he} uses the pool's mobility assistance tools to rotate ${his} body so that ${he} can just barely keep you in ${his} gaze, drizzling gel over ${his} belly as ${he} keeps it between you and ${him} to use as a protective barrier. When you're close enough to touch the apex of ${his} fecund body, you leap forward through the gel, diving to one side and disappearing under it. Your momentum carries you a reasonable distance despite the resistance of the thick substance and you pop back up directly behind ${him}. You grab ${him} under ${his} armpits, pressing your`);
			if (V.PC.dick !== 0) {
				r.push(`rigid dick against ${his}`);
			} else {
				r.push(`engorged pussy lips against ${his}`);
			}
			if (slave.butt > 7) {
				r.push(`enormous, gel-slicked ass,`);
			} else if (slave.butt > 4) {
				r.push(`plush, gel-slicked ass,`);
			} else if ((slave.buttImplant / slave.butt) > .60) {
				r.push(`implant-filled, gel-slicked ass,`);
			} else if (slave.butt > 2) {
				r.push(`perfect, gel-slicked ass,`);
			} else {
				r.push(`small, gel-slicked ass,`);
			}
			r.push(`and throw your weight backward to bring you both to the ground. ${He}'s far too enormous to make this achievement doable with anything less than superhuman strength, but the mobility assistance devices engage as you move, and the two of you slowly collapse into the warm jelly.`);
			r.push(VCheck.Vaginal(slave, 1));
			r.push(`After you've fucked ${him} near senseless, enjoying ${his} struggles to keep abreast of the smothering gel as you abuse ${his} pussy, you both retire to the side of the pool and ${he} presses into you, nuzzling your neck and`);
			if (canTalk(slave)) {
				r.push(`asking you what you think of ${his} invention.`);
			} else {
				if (hasAnyArms(slave)) {
					r.push(`motioning to you, asking you what you think of ${his} invention.`);
				} else {
					r.push(`waving a stub in the air. As if on cue, your personal servant asks you what you think of your broodmother's invention.`);
				}
			}
			r.push(followUp());
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function followUp() {
			const div = document.createElement("div");
			const responses = [
				new App.Events.Result(`Insult ${him} and halt all further training.`, halt),
				new App.Events.Result(`Compliment ${him} but keep ${his} discoveries to yourself.`, keep),
			];
			if (V.FCTV.receiver > 0) {
				responses.push(new App.Events.Result(`Organize a televised demonstration of ${his} skills.`, tv, `This will cost ${cashFormat(tvCost)}`));
			}

			App.Events.addResponses(div, responses);
			return div;

			function halt() {
				const frag = new DocumentFragment();
				let r = [];
				r.push(`As much as ${his} antics amused you, it's clear that ${slave.slaveName} wasted your money. You calmly explain to ${him} that the next time ${he} has a "brilliant" idea, ${he} should keep it to ${himself}, then arrange to have ${his} "discoveries" disposed of.`);
				if (slave.trust < -95) {
					r.push(`The look of pride and accomplishment on ${his} face transforms into a look of crushing disappointment. You slap ${him} on the ass and then have your menials escort ${him} back to ${his} duties. The next time you see ${him}, the spark of life and vitality that drove ${him} has been fully extinguished. <span class="mindbreak">${slave.slaveName} has broken.</span> Anything ${he} might have learned from this experience is lost in ${his} empty mind. ${He} will never question ${his} place, or anything else, again.`);
					applyMindbroken(slave);
				} else if (slave.trust < -20) {
					r.push(`The look of pride and accomplishment on ${his} face transforms into a look of crushing disappointment. ${He} apologizes for wasting your time and, cognizant of the power you hold over ${him}, promises never to do so again. <span class="trust dec">${slave.slaveName} is now more fearful.</span> Though ${he} never bothers you with ${his} "ideas" again, you can tell <span class="mediumorchid">${he} no longer regards you as highly.</span>`);
					slave.trust -= 4;
					slave.devotion -= 10;
				} else {
					r.push(`The look of pride and accomplishment on ${his} face transforms into a look of disappointment. <span class="trust dec">${slave.slaveName} finds you less trustworthy</span> as a result of your unkindness, but ${he} soon gets over ${his} disappointment and begins thinking of ways to truly impress you.`);
					slave.trust -= 4;
				}
				App.Events.addParagraph(frag, r);
				return frag;
			}

			function keep() {
				const frag = new DocumentFragment();
				let r = [];
				r.push(`You are impressed by ${his} ideas and arrange to have them implemented in a limited way in your arcology. You also arrange to keep ${his} discoveries secret, so as to hoard all the enjoyment of them for yourself. ${slave.slaveName} doesn't mind. ${He} is <span class="devotion inc">simply happy</span> to have pleased you and <span class="trust inc">trusts your intentions will benefit ${him}.</span>`);
				V.pregInventions = 1;
				slave.trust += 2;
				slave.devotion += 5;
				App.Events.addParagraph(frag, r);
				return frag;
			}

			function tv() {
				const frag = new DocumentFragment();
				let r = [];
				r.push(`You are so impressed by ${his} ideas that you arrange to have ${him} demonstrate ${his} discoveries on a prominent FCTV talk show. It will take some time, and you'll have to ensure that ${he}'s at least reasonably well known before the show's executives will agree to allow ${him} on-air, but you're certain that ${slave.slaveName}'s name will soon be on the lips of pregnancy-loving slaveowners and Free Cities citizens around the world. In the meantime, you implement ${his} ideas around the arcology. ${He} is <span class="devotion inc">thrilled</span> to have pleased you so much that you would <span class="trust inc">put such faith in ${his} ideas.</span>`);
				cashX(-tvCost, "event", slave);
				V.pregInventor = 2;
				V.pregInventions = 1;
				slave.trust += 4;
				slave.devotion += 10;
				App.Events.addParagraph(frag, r);
				return frag;
			}
		}
	}
};
