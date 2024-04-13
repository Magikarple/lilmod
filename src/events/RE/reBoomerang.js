App.Events.REBoomerang = class REBoomerang extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!V.boomerangSlave,
			() => V.boomerangWeeks > 5
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return Math.trunc(V.boomerangWeeks / 5);
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";

		if (V.boomerangSlave === 0 || V.boomerangBuyer === 0) { // purely for typing
			return node;
		}
		const slave = V.boomerangSlave;
		const weeks = V.boomerangWeeks - 1;
		const pregWeeks = V.boomerangWeeks - 1;
		V.boomerangWeeks = 0;
		const buyer = V.boomerangBuyer;
		V.boomerangBuyer = 0;

		SetBellySize(slave);
		let r = [];
		const {
			He, His,
			he, his, him, himself, girl
		} = getPronouns(slave);
		const {say} = getEnunciation(slave);

		const {
			HeA,
			heA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		const {himU, girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

		r.push(`Your work is interrupted by ${V.assistant.name} with an alert from the entrance to the penthouse.`);
		if (V.assistant) {
			r.push(`"${properTitle()}," ${heA} says, "you're going to want to see this."`);
		} else {
			r.push(`${HeA}'s got the incident flagged as not fitting into any of the usual categories of disturbance, and requests your attention.`);
		}
		r.push(`${HeA} brings up the relevant feeds. There's a naked body crumpled pathetically against one wall of the entryway, beneath the communications panel. It's ${SlaveFullName(slave)}, whom you sold ${weeks} weeks ago. ${He}'s looking up into one of the cameras plaintively.`);
		r.push(Spoken(slave, `"Please take me back,"`));
		r.push(`${he} whispers, not wanting to draw the attention of passersby, and knowing that ${his} faint words will be picked up and amplified for you.`);

		slave.collar = "none";
		slave.faceAccessory = "none";
		slave.mouthAccessory = "none";
		slave.choosesOwnClothes = 0;
		slave.clothes = "no clothing";
		slave.buttplug = "none";
		slave.vaginalAccessory = "none";
		slave.dickAccessory = "none";
		slave.chastityAnus = 0;
		slave.chastityPenis = 0;
		slave.chastityVagina = 0;
		setHealth(slave, jsRandom(-40, -25), slave.health.shortDamage + jsRandom(0, 10), slave.health.longDamage + jsRandom(0, 10), undefined, 100);

		/* ------------------ pregnancy setup start here----------------- */

		WombProgress(slave, pregWeeks, pregWeeks);/* In all cases should be done */
		WombUpdatePregVars(slave);
		if (slave.broodmother > 0) { /* Broodmother implant is assumed as removed.*/
			slave.preg = -1;
			slave.counter.birthsTotal += WombBirthReady(slave, 37);
			slave.broodmother = 0;
			slave.broodmotherFetuses = 0;
			WombFlush(slave);
		} else if (WombBirthReady(slave, slave.pregData.normalBirth) > 0) { /* normal birth case, partial birthers not supported*/
			slave.preg = -1;
			slave.counter.birthsTotal += WombBirthReady(slave, slave.pregData.normalBirth);
			WombFlush(slave);
		} else { /* still pregnant slave */
			slave.preg = WombMaxPreg(slave);/* most ready fetus is a base*/
			slave.pregWeek = WombMaxPreg(slave);/* most ready fetus is a base*/
		}
		SetBellySize(slave);/* In any case it's useful to do.*/

		/* ------------------ pregnancy setup end here-----------------
			r.push(`As no broodmother cases in code below, it's no need to setup every case of impregnation through new system. Backup mechanic will do it for normal pregnancies.`);
		*/

		if (slave.hStyle !== "shaved" && slave.bald !== 1) {
			if (slave.hLength < 150) {
				slave.hLength += weeks;
			}
		}
		ageSlaveWeeks(slave, weeks);

		switch (buyer) {
			case "buttbreaker":
				r.push(Spoken(slave, `"All my Master cares about is raping my ass until I scream. I can't get used to it. I'm loose and ruined, but he just uses a dildo big enough to hurt me."`));
				r.push(`${He}'s sitting over on one buttock, and shifts uncomfortably.`);
				slave.anus = 4;
				slave.sexualFlaw = "hates anal";
				break;
			case "cow trainer":
			case "D hucow":
			case "D milky herm":
			case "factory farm":
			case "free range":
			case "pastoralist arcology":
			case "milk aficionado":
				switch (buyer) {
					case "free range":
						r.push(Spoken(slave, `"The nice free range dairy you sold me to failed, and a horrible factory farm bought everyone. It's horrible."`));
						r.push(`The`);
						break;
					case "pastoralist arcology":
						r.push(Spoken(slave, `"After they finished showing me off, they just hooked me up to a milking machine and forgot about me."`));
						r.push(`You sold ${him} to a Pastoralist arcology as a prize heifer; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation. The`);
						break;
					case "D hucow":
						r.push(Spoken(slave, `"My new owner got bored of me as a human cow, and he was in debt, so he resold me to a dairy. A horrible dairy."`));
						r.push(`The`);
						break;
					case "cow trainer":
						r.push(Spoken(slave, `"Once the trainer was satisfied with my tits, he resold me to a dairy. A horrible dairy."`));
						r.push(`The`);
						break;
					case "D milky herm":
						r.push(Spoken(slave, `"I got resold to a dairy. A horrible dairy. They said I'm valuable because I give two kinds of milk."`));
						r.push(`The`);
						break;
					case "milk aficionado":
						r.push(Spoken(slave, `"When my new owner got bored of my flavored milk, he just left me hooked up to the milking machine and forgot about me."`));
						r.push(`The`);
						break;
					default:
						r.push(`You sold ${him} to a factory farm, and the`);
				}
				r.push(`effects of living there have changed ${his} body greatly. It's surprising ${he} managed to make it up here at all.`);
				r.push(Spoken(slave, `"Please,"`));
				r.push(`${he} begs.`);
				r.push(Spoken(slave, `"I d-don't want to spend the r-rest of my life being raped by a machine."`));
				if (hasAnyNaturalLegs(slave)) {
					r.push(`${He} shifts uncomfortably on ${his}`);
					if (!hasBothLegs(slave)) {
						r.push(`foot.`);
					} else {
						r.push(`feet.`);
					}
					r.push(`The soles of the feet are a convenient place to beat a cow, since it's agonizingly painful, doesn't bruise badly, and won't inconvenience a slave that spends all ${his} time kneeling or lying down.`);
				}
				slave.anus = 4;
				slave.lactation = 2;
				slave.lactationDuration = 2;
				slave.lactationAdaptation = 100;
				slave.boobs = Math.clamp(slave.boobs + 2000 + 50 * random(-20, 20), 0, 50000);
				slave.boobShape = "saggy";
				if (V.seePreg !== 0) {
					if (slave.ovaries) {
						slave.preg = random(5, pregWeeks - 1);
						slave.pregType = random(2, 4);
						slave.vagina = 4;
						slave.pregWeek = slave.preg;
						slave.pregKnown = 1;
						SetBellySize(slave);
					}
				}
				if (slave.balls) {
					slave.balls = Math.clamp(slave.balls + random(1, 2), 0, 125);
					if (slave.dick) {
						slave.dick = Math.clamp(slave.dick + random(1, 2), 0, 30);
					}
				}
				slave.intelligence = Math.clamp(slave.intelligence - 50, -100, 100);
				break;
			case "preg fetishist":
			case "volume breeder":
				switch (buyer) {
					case "preg fetishist":
						r.push(Spoken(slave, `"My nice Master had a d-debt. And he had to sell me t-to a volume breeder. I was pregnant when I got there b-but they s-started o-over."`));
						r.push(`${He} swallows.`);
						break;
					default:
						r.push(`${He} tearfully describes life at a volume breeder like the one you sold ${him} to.`);
				}

				r.push(Spoken(slave, `"They ran an IV line into me and then put me in a cage with a male slave who raped me for a week. Then they switched me into a smaller cage and forgot about me. I can feel my belly swelling. It's horrible."`));
				slave.preg = pregWeeks - 1;
				slave.vagina = 4;
				slave.pregWeek = slave.preg;
				slave.pregKnown = 1;
				if (V.seeHyperPreg === 1) {
					slave.pregType = random(10, 40);
				} else {
					slave.pregType = 5;
				}
				SetBellySize(slave);
				break;
			case "porn studio":
				r.push(Spoken(slave, `"They're crazy. At first it was all the same, just make more smut and reap the attention, but soon they started wanting me to do more and more extreme shit."`));
				r.push(`${He} gags at the thought.`);
				r.push(Spoken(slave, `"While they were running a train on me, I`));
				if (canHear(slave)) {
					r.push(Spoken(slave, `overheard them talking`));
				} else if (canSee(slave)) {
					r.push(Spoken(slave, `caught a glimpse of some memo between the bosses`));
				} else {
					r.push(Spoken(slave, `felt the words one of them wrote on my skin`));
				}
				r.push(Spoken(slave, `... saying they wanted to end my career in an 'unforgettable experience', and given what they'd been having me do, I ran."`));
				r.push(`You suspected the porn studio you sold ${him} to would try to spice up ${his} content to attract more views, but you never bothered to think of how far they would take it.`);
				slave.anus = 4;
				if (slave.vagina > -1 && slave.vagina < 4) {
					slave.vagina = 4;
				}
				actX(slave, "publicUse", 500);
				break;
			case "obsessed fan":
				r.push(Spoken(slave, `"It was really nice, at first,"`));
				r.push(`${he} sniffles,`);
				r.push(Spoken(slave, `"and I'm a little sad it had to end the way it d-did."`));
				r.push(`You sold ${him} to a die-hard fan who offered up a rather large sum of money for ownership of ${him}.`);
				r.push(Spoken(slave, `"He took out too big of a loan and when they came to collect, he let me loose and told me to run, run far away. I d-didn't know where else to g-go."`));
				r.push(`${He} breaks down in tears.`);
				if (V.seePreg !== 0 && canGetPregnant(slave)) {
					r.push(Spoken(slave, `"In the short time we spent together, he left me a gift..."`));
					r.push(`${He} runs a hand across ${his} stomach.`);
					r.push(Spoken(slave, `"While I wouldn't say I was in love with him, I feel like I have to keep them safe for what he did. I can't even think of where I'd have ended up if they had taken me."`));
					if (slave.mpreg === 1 && slave.anus === 0) {
						slave.anus = 1;
					} else if (slave.ovaries === 1 && slave.vagina === 0) {
						slave.vagina = 1;
					}
					slave.preg = random(5, pregWeeks - 1);
					slave.pregType = random(2, 4);
					slave.pregWeek = slave.preg;
					slave.pregKnown = 1;
					slave.pregSource = -2;
					SetBellySize(slave);
				}
				break;
			case "pain fetishist":
				r.push(Spoken(slave, `"They whip me. A-actually,"`));
				r.push(`${he} sniffles,`);
				r.push(Spoken(slave, `"I'm glad when they whip me b-because e-everything else they d-do is w-worse. The only break I get i-is when I'm hurt bad and th-they have to f-fix me."`));
				r.push(`After all, you did sell ${him} into a life as a pain slave.`);
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "apathetic";
				setHealth(slave, jsRandom(-50, -30), slave.health.shortDamage + normalRandInt(20, 4), slave.health.longDamage + normalRandInt(15, 3), undefined, 100);
				break;
			case "sadism fetishist":
				r.push(Spoken(slave, `"I-it's t-too much."`));
				r.push(`${He} shudders. You sold ${him} to a sadist who planned to use ${him} to abuse other slaves.`);
				r.push(Spoken(slave, `"I c-can't d-do it anymore. I used to fantasize about d-doing h-horrible things, but, but, the screaming."`));
				r.push(`${He} squeezes ${his} eyes shut.`);
				r.push(Spoken(slave, `"If I don't do it I'll h-have it d-done t-to me."`));
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "apathetic";
				slave.fetish = "none";
				slave.fetishStrength = 0;
				break;
			case "dom fetishist":
				r.push(Spoken(slave, `"I,"`));
				r.push(`${he} mutters, and then loses ${his} way.`);
				r.push(Spoken(slave, `"I lost,"`));
				r.push(`${he} grates out after a while.`);
				r.push(Spoken(slave, `"I was supposed to be the Head Girl after you sold me. But a new girl came, and, and she's the Head Girl now."`));
				r.push(`${He} looks down. "It should have been me."`);
				slave.behavioralFlaw = "hates women";
				break;
			case "sub fetishist":
				r.push(Spoken(slave, `"I thought I'd be happy to be a sub forever."`));
				r.push(`You sold ${him} to a determined dom, extreme even by Free Cities standards.`);
				r.push(Spoken(slave, `"But, but, I haven't, um, had a break since I left. I never talk. I never, well, I never do anything. I just obey."`));
				r.push(`${He} looks down.`);
				r.push(Spoken(slave, `"I'm going insane."`));
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "apathetic";
				slave.fetish = "none";
				slave.fetishStrength = 0;
				break;
			case "supremacist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Supremacist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"The things they made me do to other girls just because of who they were."`));
				r.push(`${He} swallows.`);
				r.push(Spoken(slave, `"I tried not to. And they punished me."`));
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "repressed";
				break;
			case "subjugationist arcology":
				r.push(Spoken(slave, `"They were breeding me with idiots."`));
				r.push(`You sold ${him} to a Subjugationist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"I d-don't want this pregnancy."`));
				slave.preg = pregWeeks - 1;
				slave.pregType = random(2, 4);
				slave.pregWeek = slave.preg;
				slave.pregKnown = 1;
				SetBellySize(slave);
				WombFatherRace(slave, slave.race);
				break;
			case "gender radicalist arcology":
				r.push(Spoken(slave, `"They`));
				if (slave.balls) {
					r.push(Spoken(slave, `cut my balls off and then`));
				}
				r.push(Spoken(slave, `j-just kind of t-turned me loose in the corridors,"`));
				r.push(`${he} moans. You sold ${him} to a Gender Radicalist arcology.`);
				r.push(Spoken(slave, `"Naked, so everyone could use my ass. Please, I don't want to be an entire arcology's bitch."`));
				slave.balls = 0;
				if (slave.dick) {
					slave.dick = Math.clamp(slave.dick - random(1, 2), 0, 30);
				}
				break;
			case "gender fundamentalist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Gender Fundamentalist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"I'm, I'm, not an idiot. At least, not just because I'm a girl."`));
				slave.behavioralFlaw = "hates men";
				break;
			case "paternalist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Paternalist arcology, but ${he} explains the apparent contradiction.`);
				r.push(Spoken(slave, `"The arcology got a new owner."`));
				r.push(`${He} shudders.`);
				r.push(Spoken(slave, `"I guess the nice one was weak, and, and the new one is changing things. There's cages, and spikes, and whips, and rape."`));
				r.push(`It's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				slave.behavioralFlaw = "hates men";
				break;
			case "degradationist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Degradationist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				if (slave.ovaries) {
					slave.ovaries = 0;
					WombFlush(slave);
					slave.vagina = 4;
					SetBellySize(slave);
					r.push(Spoken(slave, `"They f-fixed me, t-to 'save on maintenance of my cunt,'`));
				} else if (slave.balls) {
					slave.balls = 0;
					slave.anus = 4;
					r.push(Spoken(slave, `"They c-cut my b-balls off, to 'keep me docile,'`));
				} else {
					slave.anus = 4;
					r.push(Spoken(slave, `"They whipped me,`));
				}
				r.push(Spoken(slave, `and then used me to satisfy labor menials. Ten an hour."`));
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "hates penetration";
				break;
			case "slimness enthusiast arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a pleasant Slimness Enthusiast arcology, but somehow ${he}'s acquired grotesque implants.`);
				r.push(Spoken(slave, `"The arcology got a new owner."`));
				r.push(`${He} shudders.`);
				r.push(Spoken(slave, `"I guess the nice one was weak, and, and the new one is changing things. Sh-she l-likes t-to ruin the slim ones."`));
				r.push(`It's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				slave.boobsImplant = 200 * random(2, 4);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				}
				slave.buttImplant = random(2, 4);
				slave.butt = Math.clamp(slave.butt + slave.buttImplant, 0, 20);
				slave.buttImplantType = "normal";
				slave.lipsImplant = 10 * random(1, 3);
				slave.lips = Math.clamp(slave.lips + slave.lipsImplant, 0, 100);
				break;
			case "asset expansionist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to an Asset Expansionist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				if (slave.hips > 0) {
					slave.butt = Math.clamp(slave.butt + random(2, 4), 0, 20);
					r.push(Spoken(slave, `"They said, since I've got broad hips, I'd be a 'buttslave'."`));
					r.push(`The meaning is obvious; ${his} ass has grown unbelievably.`);
				} else {
					slave.boobs = Math.clamp(slave.boobs + 50 * random(20, 40), 0, 50000);
					r.push(Spoken(slave, `"They said they'd start with my boobs."`));
					r.push(`It's true; they've grown unbelievably.`);
				}
				r.push(`${He} shivers.`);
				r.push(Spoken(slave, `"The side effects are terrible. I can't sleep. I can barely eat. They had to feed me with a tube."`));
				slave.behavioralFlaw = "anorexic";
				break;
			case "transformation fetishist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Transformation Fetishist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"They were giving me new boob implants every two weeks. I ran away before another set. I c-couldn't take any more s-surgery."`));
				slave.boobsImplant = 200 * random(9, 12);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				}
				break;
			case "physical idealist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Physical Idealist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"It should have been called a Steroid Enthusiast arcology."`));
				r.push(`${He} shivers.`);
				r.push(Spoken(slave, `"The side effects are terrible. I can't sleep. I can barely eat. They had to feed me with a tube."`));
				slave.muscles = 100;
				slave.weight = random(-85, -75);
				slave.behavioralFlaw = "anorexic";
				break;
			case "chattel religionist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Chattel Religionist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"There were, um, cults there, along with the Faith. They were going to devote me to something called She Who Thirsts. Nobody ever hears of girls after that."`));
				slave.behavioralFlaw = "devout";
				slave.sexualFlaw = "crude";
				break;
			case "roman revivalist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Roman Revivalist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"I had to kill a girl,"`));
				r.push(`${he} adds in a small voice.`);
				r.push(Spoken(slave, `"In the arena."`));
				r.push(`Then, even more quietly:`);
				r.push(Spoken(slave, `"I had to kill, um, girls. I, I can't. Couldn't. Not again."`));
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "crude";
				slave.skill.combat = Math.max(slave.skill.combat, 50);
				break;
			case "neoimperialist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a Neo-Imperialist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"My new owner died, and his wicked son inherited us. He's the cruelest master I've ever seen, and he scourges his harem for fun."`));
				r.push(`${He} turns around to show you extensive scars and open wounds on ${his} back and buttocks.`);
				App.Medicine.Modification.addScar(slave, "back", "whip", 2);
				App.Medicine.Modification.addScar(slave, "butt", "whip", 2);
				healthDamage(slave, 20);
				break;
			case "aztec revivalist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to an Aztec Revivalist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"They told me by blood would feed the Sun."`));
				r.push(`${He} shudders.`);
				r.push(Spoken(slave, `"I, they, um, do that to hundreds of girls. I had to help."`));
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "apathetic";
				break;
			case "egyptian revivalist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to an Egyptian Revivalist arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				r.push(Spoken(slave, `"My new owner was old, and he was really into some of the tomb stuff. If he died, I'd have been buried with him."`));
				break;
			case "body purist arcology":
				r.push(Spoken(slave, `"It was horrible."`));
				r.push(`You sold ${him} to a pleasant Body Purist arcology, but somehow ${he}'s acquired grotesque implants.`);
				r.push(Spoken(slave, `"The arcology got a new owner."`));
				r.push(`${He} shudders.`);
				r.push(Spoken(slave, `"I guess the nice one was weak, and, and the new one is changing things. Sh-she l-likes t-to ruin the pure ones."`));
				r.push(`It's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
				slave.boobsImplant = 200 * random(2, 4);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				}
				slave.buttImplant = random(2, 4);
				slave.butt = Math.clamp(slave.butt + slave.buttImplant, 0, 20);
				slave.buttImplantType = "normal";
				slave.lipsImplant = 10 * random(1, 3);
				slave.lips = Math.clamp(slave.lips + slave.lipsImplant, 0, 100);
				break;
			case "D milf staffing":
			case "trainer staffing":
				r.push(Spoken(slave, `"I'm a good slave trainer, just like you sold me to be. Too good."`));
				r.push(`${His} eyes look hollow.`);
				r.push(Spoken(slave, `"I can't get what I'm doing to these ${girlU}s out of my head. Every young ${girlU} I meet, I get to know ${himU} and understand ${himU}. And then I break ${himU} down and turn ${himU} into a brainless little fuckpuppet."`));
				r.push(`${He} swallows.`);
				r.push(Spoken(slave, `"I can't. Not anymore."`));
				slave.fetish = "dom";
				slave.fetishStrength = 100;
				slave.behavioralFlaw = "arrogant";
				slave.sexualFlaw = "crude";
				break;
			case "teaching trainer":
				r.push(Spoken(slave, `"I'm just a mannequin now,"`));
				r.push(`${he} ${say}s hollowly. ${His} buyer planned to use ${him} as a teaching tool.`);
				r.push(Spoken(slave, `"There's nothing. No joy, no fun. Just the same thing, over, and over. Inside me."`));
				slave.fetish = "submissive";
				slave.fetishStrength = 100;
				slave.behavioralFlaw = "bitchy";
				slave.sexualFlaw = "apathetic";
				break;
			case "implanting trainer":
				r.push(Spoken(slave, `"I d-don't want to be c-cut again,"`));
				r.push(`${he} ${say}s hollowly. ${His} buyer planned to use ${him} as a surgical teaching tool.`);
				r.push(Spoken(slave, `"E-every time I'm healed, they implant me again. B-bigger."`));
				slave.boobsImplant = 200 * random(8, 12);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "advanced fillable";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				}
				slave.buttImplant = random(2, 4);
				slave.butt = Math.clamp(slave.butt + slave.buttImplant, 0, 20);
				slave.buttImplantType = "normal";
				slave.lipsImplant = 10 * random(1, 3);
				slave.lips = Math.clamp(slave.lips + slave.lipsImplant, 0, 100);
				break;
			case "purifying trainer":
				r.push(Spoken(slave, `"It w-wasn't like I thought it would be,"`));
				r.push(`${he} ${say}s.`);
				r.push(Spoken(slave, `"The trainer you sold me to took out my implants. B-but then they said my boobs had to be rebuilt, only with drugs this time."`));
				r.push(`${He} shivers.`);
				r.push(Spoken(slave, `"The side effects are terrible. I can't sleep. I can barely eat. They had to feed me with a tube."`));
				if (slave.boobShape === "spherical") {
					slave.boobShape = "saggy";
				}
				if (slave.nipples === "flat") {
					slave.nipples = "cute";
				}
				slave.boobs -= slave.boobsImplant;
				slave.boobsImplant = 0;
				slave.boobsImplantType = "none";
				slave.butt -= slave.buttImplant;
				slave.buttImplant = 0;
				slave.buttImplantType = "none";
				slave.lips -= slave.lipsImplant;
				slave.lipsImplant = 0;
				slave.boobs = Math.clamp(slave.boobs + 50 * random(20, 40), 0, 50000);
				break;
			case "D startled the witch":
				r.push(`You sold ${him} to a buyer interested in ${him} because of ${his} sharp teeth, among other things.`);
				r.push(Spoken(slave, `"It was horrible,"`));
				r.push(`${he} whispers. Then ${he} gags, dry heaves, and vomits slightly. ${He} wipes ${his} mouth with the back of ${his} hand, staring upward vacantly.`);
				r.push(Spoken(slave, `"Horrible."`));
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "crude";
				break;
			case "vampire clan":
				r.push(`You sold ${him} to a buyer interested in ${him} because of ${his} fangs, among other things.`);
				r.push(Spoken(slave, `"It was horrible,"`));
				r.push(`${he} whispers. Then ${he} gags, dry heaves, and vomits slightly. ${He} wipes ${his} mouth with the back of ${his} hand, staring upward vacantly.`);
				r.push(Spoken(slave, `"Horrible."`));
				slave.behavioralFlaw = "odd";
				slave.weight = Math.clamp(slave.weight - 75, -100, 200);
				break;
			case "slimming trainer":
				r.push(Spoken(slave, `"It's horrible."`));
				r.push(`You sold ${him} to a trainer who specializes in slimming slaves down, and if anything, they seem to have gone too far. ${He}'s emaciated.`);
				r.push(Spoken(slave, `"I'm h-hungry all the time, and when I'm not p-perfect, I d-don't get to eat at all."`));
				slave.boobs = Math.clamp(slave.boobs - 50 * random(5, 10), 0, 50000);
				slave.butt = Math.clamp(slave.butt - random(1, 2), 0, 20);
				slave.waist = Math.clamp(slave.waist - random(20, 50), -100, 100);
				slave.weight = -100;
				break;
			case "broadening trainer":
			case "D cannibal":
			case "hedonistic decadence arcology":
				switch (buyer) {
					case "D cannibal":
						r.push(Spoken(slave, `"M-my new owner is going t-to do something horrible to me. H-he keeps me in a tiny cage and f-feeds me, and I have to stay still and eat or I'll spoil the meat."`));
						r.push(`You did sell ${him} to a citizen widely rumored to be a cannibal. ${He} whispers,`);
						r.push(Spoken(slave, `"I'm going to die."`));
						break;
					case "hedonistic decadence arcology":
						r.push(`You sold ${him} to a Hedonistic arcology; it's nothing short of incredible that ${he} managed to get back here. ${He} must have sold and traded ${himself} without hesitation.`);
						r.push(Spoken(slave, `"It's horrible."`));
						r.push(`You sold ${him} to an arcology that loves fattening slaves up, and if anything, they seem to have gone too far too fast. ${He}'s bloated, and ${his} stomach is distended.`);
						r.push(Spoken(slave, `"T-they beat me if I ever stopped eating, and they fed my butt too. I'm gross and ugly. Even when they mounted me, they'd still shove food down my throat."`));
						break;
					default:
						r.push(Spoken(slave, `"It's horrible."`));
						r.push(`You sold ${him} to a trainer who specializes in fattening slaves up, and if anything, they seem to have gone too far. ${He}'s bloated, and ${his} stomach is distended.`);
						r.push(Spoken(slave, `"T-they beat me if I ever stop eating, and they feed my butt too. I'm gross and ugly."`));
				}
				slave.boobs = Math.clamp(slave.boobs + 50 * random(5, 10), 0, 50000);
				slave.butt = Math.clamp(slave.butt + random(1, 2), 0, 20);
				slave.waist = Math.clamp(slave.waist - random(20, 50), -100, 100);
				slave.weight = Math.clamp(slave.weight + random(50, 100), -100, 200);
				break;
			case "clipping trainer":
				r.push(Spoken(slave, `"All I do is suck dicks and get fucked in the butt."`));
				r.push(`You sold ${him} to a trainer who specializes in clipping and improving overly masculine slaves, and ${he}'s definitely more feminine, if bitterly unhappy.`);
				r.push(Spoken(slave, `"They're going to sell me to a bitch brothel soon, I know it. Please, nobody's even said anything to me other than 'suck my cock' or 'bend over bitch' in weeks."`));
				slave.boobsImplant = 200 * random(2, 4);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
				}
				slave.buttImplant = random(1, 2);
				slave.butt = Math.clamp(slave.butt + slave.buttImplant, 0, 20);
				slave.buttImplantType = "normal";
				slave.lipsImplant = 10 * random(1, 2);
				slave.lips = Math.clamp(slave.lips + slave.lipsImplant, 0, 100);
				slave.waist = Math.clamp(slave.waist + random(20, 50), -100, 100);
				slave.balls = 0;
				slave.scrotum = 0;
				slave.dick = Math.clamp(slave.dick - random(1, 2), 0, 30);
				slave.behavioralFlaw = "hates men";
				slave.sexualFlaw = "hates anal";
				if (slave.faceShape === "masculine") {
					slave.faceShape = "androgynous";
				}
				break;
			case "reassignment trainer":
				r.push(Spoken(slave, `"I m-miss my dick."`));
				r.push(`You sold ${him} to a trainer who specializes in gender reassignment, and ${he}'s definitely more feminine, if bitterly unhappy.`);
				r.push(Spoken(slave, `"P-please, even if you won't f-fix me, please take me back. I'll b-be a sex slave, I just don't want to be a woman."`));
				slave.boobsImplant = 200 * random(2, 4);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				slave.buttImplant = random(1, 2);
				slave.butt = Math.clamp(slave.butt + slave.buttImplant, 0, 20);
				slave.buttImplantType = "normal";
				slave.lipsImplant = 10 * random(1, 2);
				slave.lips = Math.clamp(slave.lips + slave.lipsImplant, 0, 100);
				slave.waist = Math.clamp(slave.waist + random(20, 50), -100, 100);
				slave.balls = 0;
				slave.scrotum = 0;
				slave.dick = 0;
				slave.vagina = 3;
				slave.behavioralFlaw = "hates men";
				slave.sexualFlaw = "hates penetration";
				if (slave.faceShape === "masculine") {
					slave.faceShape = "androgynous";
				}
				break;
			case "arcade":
				r.push(Spoken(slave, `"Take me back, or kill me,"`));
				r.push(`${he} ${say}s. You sold ${him} to an arcade, and it's surprising ${he} managed to make it up here at all.`);
				r.push(Spoken(slave, `"Please,"`));
				r.push(`${he} begs.`);
				r.push(Spoken(slave, `"I will do literally anything. I c-can feel myself going c-crazy. I'd rather die."`));
				slave.anus = 4;
				if (slave.vagina !== -1) {
					slave.vagina = 4;
				}
				slave.intelligence = Math.clamp(slave.intelligence - 50, -100, 100);
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = "apathetic";
				break;
			case "harvester":
				r.push(Spoken(slave, `"I'm just kept in a pen unless they're d-doing surgery on me."`));
				r.push(`It's not surprising; you did sell ${him} to an organ farm. What's unexpected is that ${he}'s still alive. They must be removing the less essential parts gradually.`);
				r.push(Spoken(slave, `"I'm going to die,"`));
				r.push(`${he} ${say}s hollowly.`);
				r.push(Spoken(slave, `"Next surgery, I won't wake up."`));
				slave.balls = 0;
				slave.prostate = 0;
				slave.ovaries = 0;
				slave.preg = -2;
				WombFlush(slave);
				SetBellySize(slave);
				if (V.seeExtreme === 1) {
					if (hasBothNaturalEyes(slave)) {
						eyeSurgery(slave, "left", "remove");
					}
					if (hasBothNaturalArms(slave)) {
						removeLimbs(slave, "right arm");
					}
				}
				slave.behavioralFlaw = "hates men";
				slave.sexualFlaw = "crude";
				break;
			case "D butt bury":
				r.push(Spoken(slave, `"My kind butt loving Master had to sell me, and the brothel who bought me uses my behind as an advertisement."`));
				r.push(`${He} shifts uncomfortably. "I can barely feel my anus."`);
				slave.anus = 4;
				slave.behavioralFlaw = "hates men";
				slave.sexualFlaw = "hates anal";
				break;
			case "D shorty breeder":
				r.push(Spoken(slave, `"My kind Master had to sell me, and the brothel who bought me got rid of his, um, they got rid of my pregnancy, and now I'm just a short slut."`));
				slave.behavioralFlaw = "hates men";
				slave.sexualFlaw = "crude";
				break;
			case "fuckdoll":
				r.push(`${His} appearance is surprising; you sold ${him} to a dealer who planned to encase ${him} in a Fuckdoll suit and thereby transform ${him} into a living sex toy. Apparently they decided to extract a bit of fun out of ${him} first.`);
				r.push(Spoken(slave, `"I've b-been chained up in their b-bathroom ever since you sold me," ${he} ${say}s hollowly.`));
				r.push(Spoken(slave, `"They're g-getting bored of me."`));
				slave.behavioralFlaw = "hates men";
				slave.sexualFlaw = "hates penetration";
				break;
			case "stuffer chef":
				r.push(Spoken(slave, `"They finished."`));
				r.push(`${His} appearance is not that surprising; you sold ${him} to a chef who enjoyed stuffing ${his} face till ${he} was bloated. Apparently he sold ${him} off after ${he} got too fat for his stuffings to show.`);
				r.push(Spoken(slave, `"He stretched my belly out so much and when I got so fat he couldn't see a difference with his feasts, he got rid of me." ${He}`));
				if (hasAnyArms(slave)) {
					r.push(`lowers ${his} ${hasBothArms(slave) ? "arms" : "arm"},`);
				} else {
					r.push(`straightens ${his} back,`);
				}
				r.push(`allowing ${his} grotesquely sagging belly to hang free.`);
				r.push(Spoken(slave, `"I'm gross. I'm fat, saggy, and gross."`));
				slave.boobs = Math.clamp(slave.boobs + 50 * random(5, 10), 0, 50000);
				slave.butt = Math.clamp(slave.butt + random(1, 2), 0, 20);
				slave.waist = Math.clamp(slave.waist - random(20, 50), -100, 100);
				slave.weight = Math.clamp(slave.weight + random(50, 100), -100, 200);
				slave.bellySag = 80;
				slave.behavioralFlaw = "anorexic";
				break;
			case "concert hall":
				r.push(`You sold ${him} to a local concert venue to help relieve the stage crew's stress.`);
				r.push(Spoken(slave, `"All of the roadies, from out of town, from other arcologies, treat like some sort of punching bag, or, or like a side of meat. I just can't go b-back there, anymore."`));
				if (slave.vagina > -1) {
					slave.vagina = 3;
				}
				slave.anus = 3;
				if (V.seePreg !== 0) {
					if (slave.ovaries) {
						slave.preg = random(5, pregWeeks - 1);
						slave.pregType = random(1, 2);
						slave.pregSource = either(-2, 0);
						slave.pregWeek = slave.preg;
						slave.pregKnown = 1;
						SetBellySize(slave);
					}
				}
				break;
			case "etiquette coach":
				r.push(Spoken(slave, `"The etiquette t-trainer I was sold to was an excellent teacher indeed,"`));
				r.push(`${he} ${say}s with a grimace,`);
				r.push(Spoken(slave, `"H-however, I find that he had some rather old-f-fashioned views on educational methods, to be quite b-blunt."`));
				r.push(`You look ${him} over; ${he} has numerous caning marks all over ${his} body, and appears to have been starved.`);
				slave.weight = random(-80, -70);
				setHealth(slave, jsRandom(-60, -40), slave.health.shortDamage + normalRandInt(10, 3), slave.health.longDamage + normalRandInt(10, 3), undefined, 100);
				slave.behavioralFlaw = "odd";
				slave.sexualFlaw = either("idealistic", "repressed", "self hating", "shamefast");
				break;
			case "sex double":
				r.push(`You sold ${him} to a film studio to act as a double for a famous actress where ${he} was used for a sex scene.`);
				r.push(Spoken(slave, `"They didn't stop after the shoot. They just kept fucking me and fucking me until they just tossed me aside, since that bitch`));
				if (V.seePreg !== 0 && slave.ovaries === 1 && (slave.preg === 0 || slave.preg === -1) && slave.bellyImplant < 0) {
					r.push(`'isn't a bloated whore like you'. Like I even had a choice in getting pregnant."`);
				} else {
					r.push(`'isn't a blown out whore like you'."`);
				}
				slave.vagina = 3;
				slave.anus = 3;
				if (V.seePreg !== 0) {
					if (slave.ovaries) {
						slave.preg = random(5, pregWeeks - 1);
						slave.pregType = 1;
						slave.pregSource = 0;
						slave.pregWeek = slave.preg;
						slave.pregKnown = 1;
						SetBellySize(slave);
					}
				}
				break;
			case "monster movie":
				r.push(`You sold ${him} to a film studio to act as a double for a famous actress where ${he} was installed with a massive fake pregnancy for the ending.`);
				r.push(Spoken(slave, `"It's too big... Can't breathe right... Was going to be sold... Since I was a disposable prop... I'd rather be your prop."`));
				r.push(`${He} returns to wheezing against the solid mass bulging from ${his} middle.`);
				healthDamage(slave, random(60, 70));
				if (V.seeHyperPreg !== 1) {
					slave.bellyImplant = 120000;
					slave.belly = 120000;
				} else {
					slave.bellyImplant = 300000;
					slave.belly = 300000;
				}
				break;
			case "sniper spotter":
				r.push(`You sold ${him} to a mercenary sniper to act as his spotter.`);
				r.push(Spoken(slave, `"When the job was done, he just left me behind, in the middle of a war zone. He said it was cheaper to hire a new slave spotter than to get both of us to safety."`));
				r.push(`${He} looks emaciated; it's nothing short of a miracle ${he} was able to find ${his} way back to your arcology.`);
				slave.weight = random(-85, -80);
				setHealth(slave, jsRandom(-50, -45), slave.health.shortDamage + normalRandInt(10, 3), slave.health.longDamage + normalRandInt(10, 3), undefined, 100);
				break;
			default:
				switch (buyer) {
					case "housekeeper":
						r.push(Spoken(slave, `"My kind Master passed away, and his heir sold me`));
						break;
					case "nice brothel":
						r.push(Spoken(slave, `"The nice brothel you sold me to failed, and their ${girl}s went`));
						break;
					case "virgin trader":
						r.push(Spoken(slave, `"After I couldn't pass as a virgin any more, they sold me`));
						break;
					case "D virgin asspussy":
						r.push(Spoken(slave, `"My new owner loved my asspussy because my front hole was virgin. B-but i-it got b-broken by accid-dent, I swear, and then he sold me`));
						break;
					default:
						r.push(Spoken(slave, `"Please. I've been resold`));
				}
				r.push(`to a sh-shitty brothel on the lower levels. It's h-horrible there. I live in a tiny little room, and the only people I ever`);
				if (canSee(slave)) {
					r.push(`see`);
				} else {
					r.push(`meet`);
				}
				r.push(`just fuck me and leave. N-nobody ever t-talks to me. And they beat me."`);
				if (hasAnyNaturalLegs(slave)) {
					r.push(`${He} shifts uncomfortably on ${his}`);
					if (!hasBothLegs(slave)) {
						r.push(`foot.`);
					} else {
						r.push(`feet.`);
					}
					r.push(`The soles of the feet are a convenient place to beat a whore, since it's agonizingly painful, doesn't bruise badly, and won't inconvenience a slave that spends all ${his} time kneeling or lying down.`);
				}
				slave.anus = 3;
				if (slave.vagina > -1) {
					slave.vagina = 3;
				}
				slave.sexualFlaw = either("hates anal", "hates oral", "hates penetration");
		}

		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It isn't obvious how ${he} managed to escape, though no doubt you could review the arcology surveillance logs and find out. For right now, though, the question is what to do with ${him}.`);
		if (slave.trust > 95) {
			r.push(Spoken(slave, `"Please,"`));
			r.push(`${he} sobs, breaking down at last.`);
			r.push(Spoken(slave, `"I th-thought I w-was a g-good ${girl}. T-take me b-back and I'll p-pretend I n-never left. I'll d-do anything you ask. I'll worship the ground you walk on. Please."`));
			slave.devotion = 100;
		} else if (slave.intelligence + slave.intelligenceImplant < -15) {
			r.push(Spoken(slave, `"Please,"`));
			r.push(`${he} sobs, breaking down at last.`);
			r.push(Spoken(slave, `"I d-don't know where else to go."`));
			r.push(`That much you believe; ${he}'s an idiot.`);
		} else {
			r.push(Spoken(slave, `"I know I'll be caught,"`));
			r.push(`${he} sobs, breaking down at last.`);
			r.push(Spoken(slave, `"I know you'd f-find me. So I came here. Please."`));
			r.push(`${He}'s right about that much. This is literally the only chance ${he} has of getting away from ${his} current owners.`);
		}

		const contractCost = 5000;
		const cost = slaveCost(slave) - contractCost;

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];
		choices.push(new App.Events.Result(`Return ${him}`, returnSlave));
		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Obfuscate ${his} appearance and re-enslave ${him}`, reSlave, `This will cost ${cashFormat(contractCost)}.`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}.`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}

		App.Events.addResponses(node, choices);

		function returnSlave() {
			const frag = new DocumentFragment();
			let r = [];
			repX(Math.trunc(cost / 2), "event", slave);
			r.push(`${slave.slaveName} keeps waiting, but the doors to the penthouse never open. When ${his} owners arrive a few minutes later to collect ${him}, ${he} cries harder, but does not resist. ${His} weeping has the peculiar ring of utter hopelessness as they restrain ${him} and drag ${him} off. A few minutes after that, you receive a businesslike note <span class="green">expressing gratitude</span> for your assistance in this matter.`);
			V.boomerangStats = 0;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function reSlave() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			if (V.boomerangStats.PCpregSource > 0 && V.PC.preg > 0 && V.PC.pregSource === 0) {
				V.PC.pregSource = slave.ID;
			}
			if (V.boomerangStats.PCmother > 0) {
				V.PC.mother = slave.ID;
			}
			if (V.boomerangStats.PCfather > 0) {
				V.PC.father = slave.ID;
			}
			for (const s of V.slaves) {
				if (V.boomerangStats.boomerangMother.includes(s.ID)) {
					s.mother = slave.ID;
				}
				if (V.boomerangStats.boomerangFather.includes(s.ID)) {
					s.father = slave.ID;
				}
				if (V.boomerangStats.boomerangPregSources.includes(s.ID) && s.preg > 0 && s.pregSource === 0) {
					s.pregSource = slave.ID;
				}
				WombChangeID(s, slave.missingParentTag, slave.ID);
			}
			if (V.incubator.capacity > 0) {
				for (let tank of V.incubator.tanks) {
					if (V.boomerangStats.boomerangMotherTank.includes(tank.ID)) {
						tank.mother = slave.ID;
					}
					if (V.boomerangStats.boomerangFatherTank.includes(tank.ID)) {
						tank.father = slave.ID;
					}
				}
			}
			if (V.nursery > 0) {
				for (let crib of V.cribs) {
					if (V.boomerangStats.boomerangMotherTank.includes(crib.ID)) {
						crib.mother = slave.ID;
					}
					if (V.boomerangStats.boomerangFatherTank.includes(crib.ID)) {
						crib.father = slave.ID;
					}
				}
			}
			if (V.boomerangStats.boomerangRelationship > 0) {
				const boomerangRelationship = getSlave(V.boomerangStats.boomerangRelationship);
				if (boomerangRelationship) {
					boomerangRelationship.relationship = slave.relationship;
					boomerangRelationship.relationshipTarget = slave.ID;
				} else {
					slave.relationship = 0;
					slave.relationshipTarget = 0;
				}
			}
			if (V.boomerangStats.boomerangRivalry > 0) {
				const boomerangRivalry = getSlave(V.boomerangStats.boomerangRivalry);
				if (boomerangRivalry) {
					boomerangRivalry.rivalry = slave.rivalry;
					boomerangRivalry.rivalryTarget = slave.ID;
				} else {
					slave.rivalry = 0;
					slave.rivalryTarget = 0;
				}
			}
			if (V.boomerangStats.boomerangBody > 0) {
				const boomerangBody = getSlave(V.boomerangStats.boomerangBody);
				if (boomerangBody) {
					boomerangBody.origBodyOwnerID = slave.ID;
				}
			}
			V.boomerangStats = 0;
			r.push(`The penthouse opens, and ${slave.slaveName} stumbles inside, sobbing ${his} thanks. ${He}'s immediately conducted to the autosurgery for some quick cosmetic surgery, while you and ${V.assistant.name} do the necessary work to falsify the arcology records and conceal ${his} origins. Even so, it would probably be wise to keep ${him} off public assignments for a while. In no time at all, ${he}'s standing in front of your desk like any other new slave. ${He} waits obediently, knowing that it's in ${his} best interests not to mention anything out of the ordinary.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`The penthouse opens, and ${slave.slaveName} stumbles inside, sobbing ${his} thanks. ${He}'s immediately conducted to the autosurgery for some quick cosmetic surgery, while you and ${V.assistant.name} do the necessary work to falsify the arcology records and conceal ${his} origins. Before ${he}'s even out from under anesthesia, ${he}'s bundled off into one of the hundreds of slave shipments that move between arcologies every day. This time ${he}'ll be sold far enough away that no matter how much of an escape artist ${he} is, you won't be seeing any more of ${him}. ${He} can whine elsewhere.`);
			V.boomerangStats = 0;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
