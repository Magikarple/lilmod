App.Events.RESSMillenary = class RESSMillenary extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				s => (canDoAnal(s) || canDoVaginal(s)),
				s => s.anus > 0,
				s => s.vagina !== 0,
				s => s.rules.speech !== "restrictive",
				s => (s.counter.oral + s.counter.vaginal + s.counter.anal).isBetween(900, 1100)
			]
		];
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {
			He, His, he, his, him, himself
		} = getPronouns(slave);
		const {title: Master, say} = getEnunciation(slave);
		const belly = bellyAdjective(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [
			`Late one night,`,
			contextualIntro(V.PC, slave, true),
			`comes to see you. Strangely, several of your other slaves are stealing glances at ${him} as ${he} does. ${He} seems oddly proud of ${himself}. Asked why, ${he} ${say}s,`,
			Spoken(slave, `"It's my millenary, ${Master}. The arcology has logged me getting fucked ${num(999)} times."`),
			`The other slaves obviously view it as significant, too.`
		]);
		App.Events.addParagraph(node, [`As the Free Cities grow and evolve, slave culture does too. It seems this is a new tradition among obedient sex slaves. ${He} obviously expects you to do the honors, and it seems the rest of your slaves are looking forward to it.`]);

		let choices = [new App.Events.Result(`Give ${him} ${his} thousandth fuck`, fuck)];
		if (V.slaves.length > 2) {
			choices.push(new App.Events.Result(`Include everyone in ${his} millenary`, everyone));
		}
		if (canDoAnal(slave) && slave.counter.anal !== 0) {
			choices.push(new App.Events.Result(`Drive up ${his} anal count`, drive));
		}
		choices.push(new App.Events.Result(`Send ${him} off`, send));

		App.Events.addResponses(node, choices);

		function fuck(){
			let r = [];
			r.push(`You decide that a slave's thousandth fuck ought to be representative of sexual slavery. So, you`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on,`);
			}
			r.push(`push ${him} over`);
			if (slave.belly >= 300000) {
				r.push(`${belly}`);
				if (slave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`belly`);
				}
			} else {
				r.push(`the arm of the couch next to your desk`);
				if (slave.belly >= 5000) {
					r.push(`so that ${his}`);
					if (slave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`${belly} belly`);
					}
					r.push(`hangs off its edge`);
				}
			}
			r.push(`and take ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			if (!canDoVaginal(slave)) {
				r.push(`ass`);
			} else {
				r.push(`pussy`);
			}
			r.push(`hard and fast, doggy style. ${He}'s clearly got a lot of experience, so ${he} takes the pounding well. Before long ${he}'s happily moaning and begging, pushing ${himself} back into`);
			if (V.PC.vagina !== -1) {
				r.push(`you and using a hand thrust back between ${his} own legs to stimulate your pussy.`);
			} else {
				r.push(`you.`);
			}
			r.push(`You thrust deep inside ${him}. ${He} thanks you and wishes you a happy millenary. <span class="trust inc">${He} has become much more trusting</span> of ${his} place with you.`);
			slave.trust += 10;
			if (canDoVaginal(slave)) {
				r.push(VCheck.Vaginal(slave, 1));
			} else {
				r.push(VCheck.Anal(slave, 1));
			}
			return r;
		}

		function everyone() {
			let r = [];
			r.push(`You decide to celebrate this happy event with everyone. You beckon to the watching`);
			if (V.PC.dick === 0) {
				r.push(`slaves, while you don a strap-on,`);
			} else {
				r.push(`slaves`);
			}
			r.push(`and they come eagerly or sullenly according to their natures. They troop in. After some thought, you position a slave on the couch next to your desk, ${slave.slaveName}`);
			if (hasAllLimbs(slave)) {
				r.push(`on all fours`);
			} else if (hasAnyLegs(slave)) {
				r.push(`knelt over`);
			} else {
				r.push(`propped up`);
			}
			r.push(`in front of ${his} giving cunnilingus, a third slave`);
			if (slave.belly >= 5000) {
				r.push(`squeezed`);
			}
			r.push(`under ${slave.slaveName} to orally service ${him} in turn, and yourself behind ${slave.slaveName} to`);
			if (canDoVaginal(slave)) {
				r.push(`take ${his}`);
				if (V.seeRace === 1) {
					r.push(`${slave.race}`);
				}
				r.push(`pussy.`);
			} else if (canDoAnal(slave)) {
				r.push(`take ${his}`);
				if (V.seeRace === 1) {
					r.push(`${slave.race}`);
				}
				r.push(`ass.`);
			} else {
				r.push(`enjoy ${his}`);
				if (V.seeRace === 1) {
					r.push(`${slave.race}`);
				}
				r.push(`asscheeks.`);
			}
			r.push(`Each slave besides ${slave.slaveName} gets a suck from ${slave.slaveName} on the couch and then slides under ${him} to reciprocate. ${He} works ${his} way through all your slaves one by one, with feminine lips and tongues delighting ${his}`);
			if (slave.dick !== 0 && !(slave.chastityPenis)) {
				r.push(`dickhead`);
			} else if (!canDoVaginal(slave)) {
				r.push(`soft perineum`);
			} else {
				r.push(`clit`);
			}
			r.push(`and your`);
			if (V.PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`cock`);
			}
			r.push(`gently pumping ${his} butt the whole time. When ${he}'s done, ${he} thanks you exhaustedly and begs you to do this for ${his} next millenary. <span class="devotion inc">${His} love for you has greatly increased.</span>`);
			slave.devotion += 10;
			seX(slave, "oral", "slaves", "penetrative", (V.slaves.length * 2));
			V.slaves.forEach(function(s) { if (s.ID !== slave.ID) { s.counter.oral++; } });
			if (canDoVaginal(slave)) {
				r.push(VCheck.Vaginal(slave, 1));
			} else {
				r.push(VCheck.Anal(slave, 1));
			}
			return r;
		}

		function drive() {
			let r = [];
			const {girlU, himU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
			r.push(`You make a ceremony of querying ${V.assistant.name}, aloud for everyone to hear, into ${slave.slaveName}'s sexual history. ${He} soon realizes`);
			if (canHear(slave)) {
				r.push(`this is a sort of recitation of ${his} service`);
			} else {
				r.push(`what ${V.assistant.name} is detailing`);
			}
			r.push(`for the benefit of the other slaves, and ${he} stands a little straighter. ${His}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)} glitter`);
			} else {
				r.push(`face beams`);
			}
			r.push(`with <span class="trust inc">pride</span> as ${V.assistant.name} finishes, "...and ${his} anus has been penetrated ${slave.counter.anal} times." You announce that ${slave.counter.anal} isn't nearly enough, detail a slave to fetch you a comfortable chair, seat yourself, and draw the compliant ${slave.slaveName}'s head down towards your`);
			if (V.PC.dick === 0) {
				r.push(`pussy.`);
			} else {
				r.push(`cock.`);
			}
			r.push(`${He} gets eagerly to work, surrounded by a circle of slaves staring at the show. You select a favored ${girlU} and tell ${himU} to get to work driving that anal count up. ${slave.slaveName} keeps`);
			if (V.PC.dick === 0) {
				r.push(`eating you out`);
			} else {
				r.push(`sucking your dick`);
			}
			r.push(`as the chosen ${girlU} pulls ${slave.slaveName}'s hips up a little and`);
			if (slave.butt > 18) {
				r.push(`struggles into ${his} immense butt.`);
			} else if (slave.butt > 10) {
				r.push(`pushes between ${his} massive cheeks.`);
			} else if (slave.butt > 5) {
				r.push(`spreads ${his} big buttocks.`);
			} else if (slave.weight > 95) {
				r.push(`spreads ${his} fat rear.`);
			} else if (slave.muscles > 30) {
				r.push(`pushes between ${his} muscular buttocks.`);
			} else {
				r.push(`massages ${his} butt a little.`);
			}
			r.push(`${slave.slaveName} snakes a ${slave.skin} hand down between ${his} legs to`);
			if (slave.chastityPenis === 1) {
				r.push(`tease ${his} chastity bound dick`);
			} else if (canAchieveErection(slave)) {
				r.push(`jack off`);
			} else {
				r.push(`play with ${himself} as much as ${he} can manage`);
			}
			r.push(`as ${his} asshole takes its first fuck of the night. You let ${him} change positions between each slave, and by the end ${he}'s draped limply across the arm of your chair so ${he} can tiredly`);
			if (V.PC.vagina !== -1) {
				r.push(`nibble your pussylips`);
			} else {
				r.push(`suck on your balls one at a time`);
			}
			r.push(`as the last few slaves, taking advantage of ${his} enormously gaped butt, slide lubricated hands in and out of ${his} rectum while giggling at the perversion and playing with each other. As the final slave withdraws their hand, ${slave.slaveName} crawls into your lap and burrows ${his} face`);
			if (V.PC.boobs >= 1400) {
				r.push(`between your enormous`);
				if (V.PC.boobsImplant !== 0) {
					r.push(`fake`);
				}
				r.push(`breasts`);
			} else if (V.PC.boobs >= 1200) {
				r.push(`between your huge`);
				if (V.PC.boobsImplant !== 0) {
					r.push(`fake`);
				}
				r.push(`breasts`);
			} else if (V.PC.boobs >= 1000) {
				r.push(`between your big`);
				if (V.PC.boobsImplant !== 0) {
					r.push(`firm`);
				}
				r.push(`breasts`);
			} else if (V.PC.boobs >= 300) {
				r.push(`between your breasts`);
			} else if (V.PC.title === 0) {
				r.push(`into your flat chest`);
			} else {
				r.push(`into your muscular chest`);
			}
			r.push(`with an exhausted but <span class="devotion inc">relaxed</span> sigh.`);
			slave.devotion += 4;
			slave.trust += 4;
			seX(slave, "oral", V.PC, "penetrative");
			seX(slave, "anal", "slaves", "penetrative", V.slaves.length+1);
			V.slaves.forEach(function(s) { if (s.ID !== slave.ID) { s.counter.penetrative++; } });
			return r;
		}

		function send() {
			let r = [];
			r.push(`${He} leaves sadly, and you can see a few of the other slaves comforting ${him} as they prepare for bed.`);
			if (canPenetrate(slave)) {
				r.push(`To cheer ${him} up, a couple of your slaves let ${him} fuck them before bed.`);
			} else {
				r.push(`To cheer ${him} up, a couple of your slaves get ${him} off before bed.`);
			}
			r.push(`This disappointment <span class="devotion dec">reduces ${his} devotion.</span>`);
			slave.devotion -= 5;
			if (canPenetrate(slave)) {
				seX(slave, "penetrative", "slaves", "anal");
			} else {
				seX(slave, "oral", "slaves", "penetrative", 2);
			}
			return r;
		}
	}
};

