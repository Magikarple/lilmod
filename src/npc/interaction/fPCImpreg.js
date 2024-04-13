/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fPCImpreg = function(slave) {
	const frag = new DocumentFragment();

	const text = [];

	const {He, His, he, his, him, himself} = getPronouns(slave);

	const pregnancyFetish = slave.fetish === 'pregnancy' && slave.fetishStrength > 60 && slave.fetishKnown;
	const submissive = slave.fetish === 'submissive' && slave.fetishStrength > 60 && slave.fetishKnown;
	const superfetation = slave.geneticQuirks.superfetation === 2 && slave.pregKnown;
	const virgin = slave.vagina === 0 || (slave.mpreg && slave.anus === 0);
	const hole = slave.mpreg ? `asshole` : `pussy`;

	const accepting = slave.devotion > 20;
	const hesitant = slave.devotion >= -20 && slave.devotion <= 20;
	const resistant = slave.devotion < -20;

	const loseVirginity = () => {
		if (slave.mpreg) {
			slave.anus = 1;
		} else {
			slave.vagina = 1;
		}
	};

	let fillHim = '';
	let firstTime = '';

	if (V.PC.prostate > 1) {
		fillHim = ` filling ${him} until ${his} belly is distended and wobbling with your cum`;
	} else if (V.PC.prostate > 0) {
		fillHim = ` pouring into ${him} until ${he} is stuffed with your cum`;
	} else if (V.PC.balls > 8) {
		fillHim = ` pouring into ${him}`;
	}

	text.push(`You call ${him} over so you can`);

	if (slave.mpreg) {
		const asshole = slave.geneticQuirks.superfetation === 2 && slave.pregKnown
			? `asshole and put another baby in ${him}`
			: `asshole`;

		if (slave.anus > 2) {
			text.push(`fuck ${his} gaping, fertile ${asshole}.`);
		} else if (slave.anus === 2) {
			text.push(`use ${his} whorish, fertile ${asshole}.`);
		} else if (slave.anus === 1) {
			text.push(`use ${his} tight, fertile ${asshole}.`);
		} else if (slave.anus === 0) {
			text.push(`take ${his} fertile, virgin ${asshole}.`);
		} else {
			throw new Error(`Unexpected anus value '${slave.anus}' in fPCImpreg()`);
		}

		text.push(`The crest on ${his} abdomen eagerly awaits a womb stuffed with cum, and who are you to deny its request?`);
	} else {
		if (slave.vagina > 2) {
			text.push(`fuck ${his} gaping, fertile cunt.`);
		} else if (slave.vagina === 2) {
			text.push(`use ${his} whorish, fertile cunt.`);
		} else if (slave.vagina === 1) {
			text.push(`use ${his} tight, fertile cunt.`);
		} else if (slave.vagina === 0) {
			text.push(`take ${his} fertile, virgin pussy.`);
		} else {
			throw new Error(`Unexpected vagina value '${slave.vagina}' in fPCImpreg()`);
		}

		if (superfetation) {
			text.push(`You plan on putting another baby in ${him}.`);
		}

		if (slave.vaginaTat) {
			if (slave.vaginaTat === "tribal patterns") {
				text.push(`The tattoos on ${his} abdomen certainly draw attention there.`);
			} else if (slave.vaginaTat === "scenes") {
				text.push(`The tattoos on ${his} abdomen nicely illustrate what you mean to do to ${him}.`);
			} else if (slave.vaginaTat === "degradation") {
				text.push(`The tattoos on ${his} abdomen ask you to, after all.`);
			} else if (slave.vaginaTat === "lewd crest") {
				text.push(`The crest on ${his} abdomen eagerly awaits a womb stuffed with cum.`);
			}
		}

		if (slave.clit > 0) {
			if (slave.clit === 1) {
				text.push(`${His} big clit ${slave.foreskin ? `peeks out from under its hood` : `can't be missed`}.`);
			} else if (slave.clit > 1) {
				text.push(`${His} huge clit is impossible to miss.`);
			}
		}

		if (slave.piercing.vagina.weight > 0) {
			if (slave.piercing.vagina.weight > 1) {
				text.push(`${His} pierced lips and clit have ${him} nice and wet.`);
			} else if (slave.piercing.vagina.weight === 1) {
				text.push(`${His} pierced clit has ${him} nice and moist.`);
			}
		}
	}

	if (virgin) {
		if (pregnancyFetish) {
			if (isSexuallyPure(slave)) {
				firstTime = `, knowing that ${his} first time will always be special to ${him}`;
			}

			text.push(`${He} cries with joy and presents ${his} virgin`);

			if (slave.mpreg) {
				text.push(`asshole for fertilization.`);
			} else if (['bushy', 'very bushy', 'bushy in the front and neat in the rear'].includes(slave.pubicHStyle)) {
				text.push(`treasure, barely visible within her tangle of pubic hair, but ready for fertilization.`);
			} else if (slave.pubicHStyle === 'in a strip') {
				text.push(`pussy, accented by ${his} strip of pubic hair, ready for fertilization.`);
			} else if (slave.pubicHStyle === 'neat') {
				text.push(`neatly trimmed pussy, ready for fertilization.`);
			} else if (slave.pubicHStyle === 'waxed') {
				text.push(`pussy, smooth and bare, ready for fertilization.`);
			} else {
				text.push(`pussy, ready for fertilization.`);
			}

			text.push(`You waste no time with foreplay as you mount ${him} and get to work. As you claim ${his} pearl, ${his} breath hitches in ${his} throat, but pleasure quickly overcomes the pain. ${He} groans as your pelvis repeatedly slaps against ${him} over and over, anticipating what's to come. Just before you reach your peak, you hilt yourself within ${him}, signaling that it's time. ${He} sobs with happiness when ${he} finally feels your hot seed${fillHim}${firstTime}. ${He} spends the rest of the day cherishing ${his} ${bellyAdjective(slave)} stomach. This new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} ${hole} has been broken in, and there's a good chance ${he}'s ${superfetation ? `got another bun in the oven` : `pregnant`}.</span>
			`);

			slave.devotion += 15;

			loseVirginity();
		} else if (accepting) {
			text.push(`${He} accepts your orders without comment and presents ${his} virgin ${hole} for fertilization. ${He} gasps in shock when ${he} feels your hot seed${fillHim}. ${He} spends the rest of the day struggling with roiling emotions. Since ${he} is already well broken${superfetation ? ` and pregnant` : ``}, this new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} ${hole} has been broken in, and there's a good chance ${he}'s ${superfetation ? `got another bun in the oven` : `pregnant`}.</span>`);

			slave.devotion += 10;

			loseVirginity();
		} else if (hesitant) {
			text.push(`${He} is clearly unhappy at losing ${his} pearl of great price to you; this probably isn't what ${he} imagined ${his} first real sex would be like. Worse, ${he} knows ${he}'s fertile and realizes ${superfetation ? `${his} existing pregnancy is not going to stop you from adding another baby to ${his} womb.` : `${he}'ll likely get pregnant.`} Nevertheless, this new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span> <span class="virginity loss">${His} ${hole} has been broken in.</span>`);

			slave.devotion += 4;

			loseVirginity();
		} else if (resistant) {
			text.push(`As you anticipated, ${he} refuses to give you ${his} virginity. And as you expected, ${he} is unable to resist you. ${He} cries as you force yourself on ${him}, your cock piercing ${his} fresh, tight hole. Afterwards, ${he} ${hasAnyArms(slave) ? `clutches ${his} ${bellyAdjective(slave)} stomach` : `lies there`} and sobs, horrified by the knowledge that ${superfetation ? `${his} unborn ${slave.pregType === 1 ? `child is` : `children are`} now sharing quarters with ${his} rapist's child.` : `${he}'s probably carrying ${his} rapist's child.`} Being raped pregnant <span class="devotion dec">decreases ${his} devotion to you</span> and <span class="trust dec">fills ${him} with fear.</span> <span class="virginity loss">${His} ${hole} has been broken in.</span>`);

			slave.devotion -= 5;
			slave.trust -= 5;

			loseVirginity();
		}
	} else {
		if (pregnancyFetish) {
			text.push(`${He} cries with joy and presents ${his} fertile`);

			if (slave.mpreg) {
				text.push(`asshole for breeding.`);
			} else if (['bushy', 'very bushy', 'bushy in the front and neat in the rear'].includes(slave.pubicHStyle)) {
				text.push(`pussy, barely visible within her tangle of pubic hair but ripe for breeding.`);
			} else if (slave.pubicHStyle === 'in a strip') {
				text.push(`pussy, accented by ${his} strip of pubic hair and ripe for breeding.`);
			} else if (slave.pubicHStyle === 'neat') {
				text.push(`neatly trimmed pussy, ripe for breeding.`);
			} else if (slave.pubicHStyle === 'waxed') {
				text.push(`pussy, smooth, bare, and ripe for breeding.`);
			} else {
				text.push(`pussy, ripe for breeding.`);
			}

			text.push(`You waste no time with foreplay as you mount ${him} and get to work. ${He} groans as your pelvis repeatedly slaps against ${him} over and over, anticipating what's to come. Just before you reach your peak, you hilt yourself within ${him}, signaling that it's time. ${He} sobs with happiness when ${he} finally feels your hot seed${fillHim}. ${He} spends the rest of the day cherishing ${his} ${bellyAdjective(slave)} stomach. This new connection with ${his} ${getWrittenTitle(slave)} <span class="devotion inc">increases ${his} devotion to you.</span>`);

			slave.devotion += 10;
		} else if (isAmputee(slave)) {
			text.push(`You have ${his} limbless torso set on the end of the couch, face-${superfetation ? `up` : `down`}, with ${his} hips up in the air. This way, you get the greatest degree of penetration into ${his} fertile ${hole} you can manage. ${He} moans ${superfetation ? `openly` : `into the cushions`}, knowing that when ${he} feels the hot flow of semen${fillHim}, ${he} has probably ${superfetation ? `got another bun in the oven` : `gotten pregnant`}.`);
		} else if (tooBigBelly(slave)) {
			if (V.PC.prostate > 1) {
				fillHim = ` filling ${him} until ${his} the pressure forces it to spray around your shaft`;
			} else if (V.PC.prostate > 0) {
				fillHim = ` pouring into ${him} until ${he} is stuffed with your cum`;
			} else if (V.PC.balls > 8) {
				fillHim = ` pouring into ${him}`;
			}

			text.push(`Since ${he} already has trouble moving with ${his} ${bellyAdjective(slave)} belly, you just tip ${him} onto it; this leaves ${his} fertile ${hole} exposed and vulnerable. ${He} moans${hasAnyArms(slave) ? ` as ${he} clutches the sides of ${his} stomach` : ``}, knowing that when ${he} feels the hot flow of semen${fillHim}, ${he} has probably gotten ${superfetation ? `another bun added to the oven` : `pregnant`}.`);
		} else if (tooFatSlave(slave)) {
			text.push(`You set ${him} down on the couch, face-down, with ${his} hips up in the air. This way, ${he}'s pinned in place by the weight of ${his} own body, and you get the greatest degree of penetration into ${his} fertile ${hole}; after you push into ${his} soft folds enough to reach it, of course. ${He} moans into the cushions, knowing that when ${he} feels the hot flow of semen${fillHim}, ${he} has probably ${superfetation ? `got another bun in the oven` : `gotten pregnant`}.`);
		} else if (tooBigBreasts(slave)) {
			text.push(`You set ${him} down on the couch, face-down, with ${his} hips up in the air. This way, ${he}'s pinned in place by the weight of ${his} ridiculous tits, and you get the greatest degree of penetration into ${his} fertile ${hole}. ${He} moans into the cushions, knowing that when ${he} feels the hot flow of semen${fillHim}, ${he} has probably ${superfetation ? `got another bun in the oven` : `gotten pregnant`}.`);
		} else if (tooBigButt(slave)) {
			text.push(`You set ${him} down on the couch, face-down, with ${his} hips up in the air. This way, ${he}'s stuck under ${his} ridiculous ass, you get an amazingly soft rear to pound, and you get the greatest degree of penetration into ${his} fertile ${hole}. ${He} moans into the cushions, knowing that when ${he} feels the hot flow of semen${fillHim}, ${he} has probably ${superfetation ? `got another bun in the oven` : `gotten pregnant`}.`);
		} else if (tooBigDick(slave)) {
			text.push(`You set ${him} down on the couch, face-down, with ${his} hips up in the air. This way, ${he}'s anchored in place by the weight of ${his} ridiculous cock, and you get the greatest degree of penetration into ${his} fertile ${hole}. ${He} moans into the cushions, knowing that when ${he} feels the hot flow of semen${fillHim}, ${he} has probably ${superfetation ? `got another bun in the oven` : `gotten pregnant`}.`);
		} else if (tooBigBalls(slave)) {
			text.push(`You set ${him} down on the couch, face-down, with ${his} hips up in the air. This way, ${he}'s anchored in place by the weight of ${his} ridiculous balls, and you get the greatest degree of penetration into ${his} fertile ${hole}. ${He} moans into the cushions, knowing that when ${he} feels the hot flow of semen${fillHim}, ${he} has probably ${superfetation ? `got another bun in the oven` : `gotten pregnant`}.`);
		} else if (submissive) {
			let fillsHim = '';

			if (V.PC.prostate > 1) {
				fillsHim = `fills ${him} until ${his} belly is distended and wobbling with your cum`;
			} else if (V.PC.prostate > 0) {
				fillsHim = `pours into ${him} until ${he} is stuffed with your cum`;
			} else if (V.PC.balls > 8) {
				fillsHim = `pours into ${him}`;
			} else {
				fillsHim = `jets into ${his} welcoming depths`;
			}

			text.push(`${He} ${slave.belly >= 10000 ? `waddles` : `comes`} submissively over, smiling a little submissive smile, and spreads ${himself} for you. ${slave.belly < 5000
				? `You take ${him} on the couch next to your desk in the missionary position. ${He} hugs ${his} torso to you and ${his} breasts press against your chest; you can feel ${his} heart beating hard.`
				: `You take ${him} from behind against your desk. ${He} steadies ${himself} as ${he} feels your hands roaming across ${his} ${bellyAdjective(slave)} belly. As the sex reaches its climax, ${his} breaths grow short and ${his} moans passionate.`}
			As the sex reaches its climax your semen ${fillsHim} as ${he} begs you to use ${his} unworthy body to make a new slave.`);
		} else if (accepting) {
			let fillingHim = '';

			if (V.PC.prostate > 1) {
				fillingHim = `flowing into ${him} until ${his} stomach is distended and wobbling with your cum`;
			} else if (V.PC.prostate > 0) {
				fillingHim = `pouring into ${him} until ${he} is stuffed with your cum`;
			} else if (V.PC.balls > 8) {
				fillingHim = `pouring into ${him}`;
			} else {
				fillingHim = `jetting into ${him}`;
			}

			text.push(`${slave.belly < 5000
				? `${He} skips over smiling and gives you a quick kiss. You take ${him} on the couch next to your desk in the missionary position. ${He} hugs ${his} torso to you and ${his} breasts press against your ${V.PC.boobs > 300 ? `own;` : `chest; `} you can feel ${his} heart beating hard. As the sex reaches its climax, ${his} kisses grow urgent and passionate. ${He} clings to you,`
				: `${He} waddles over smiling and leans in to give you a quick kiss. You decide to take ${him} from behind against your desk. ${He} steadies ${himself} against the furniture as ${he} feels your hands roaming across ${his} ${bellyAdjective(slave)} belly. You begin to pound into ${him} and as the sex reaches its climax, ${his} breaths grow short and ${his} moans passionate. As you reach your respective peaks, ${he} pushes ${himself} back against you, feeling`}
			your semen ${fillingHim} as ${he} rides the downslope of ${his} orgasm. ${He} kisses you and promises to do ${his} best to use ${his} womb to make ${superfetation ? `another` : `a`} good slave for you.`);
		} else if (hesitant) {
			let full = '';

			if (V.PC.prostate > 1) {
				full = ` far beyond capacity`;
			} else if (V.PC.prostate > 0) {
				full = ` beyond capacity`;
			} else if (V.PC.balls > 8) {
				full = ` to capacity`;
			}

			text.push(`${He} obeys, lying on the couch next to your desk${hasAnyLegs(slave) ? ` with ${his} leg${hasBothLegs(slave) ? `s spread` : ` moved aside`}` : ``}. You kneel on the ground and enter ${him}${hasAnyLegs(slave) ? `, a hand on ${hasBothLegs(slave) ? `each of ${his} legs` : `${his} leg`} to give you purchase` : ``}. The pounding is hard and fast, and ${he} gasps and whines. ${slave.belly > 100000 ? `You reach a hand up to tease ${his} already taut dome of a pregnancy.` : `You reach a hand down to maul ${his} breasts.`} ${He} begs you not to cum inside ${him}, knowing ${he}'s fertile, but soon loses track of ${his} fears as ${he} enjoys ${himself}. ${He} bites ${his} lip and moans as ${he} climaxes. You follow ${him} over the edge as you give one final, deep thrust before filling ${his} squeezing fuckhole${full} with your cum; ${he} realizes what you've done with a gasp and a worried look.`);
		} else if (resistant) {
			if (V.PC.prostate > 1) {
				fillHim = `filling ${him} until ${his} belly is distended and wobbling with your cum`;
			} else if (V.PC.prostate > 0) {
				fillHim = `pouring into ${him} until ${he} is stuffed with your cum`;
			} else if (V.PC.balls > 8) {
				fillHim = `pouring into ${him}`;
			} else {
				fillHim = `blow your load`;
			}

			text.push(`${He} tries to refuse, so you bend the disobedient slave over your desk and take ${him} hard from behind. ${His} breasts slide back and forth across the desk. You give ${his} buttocks some nice hard swats as you pound ${him}. ${He} grunts and moans but knows better than to try to get away. ${He} begs you not to cum inside ${him}, knowing ${he}'s fertile, and sobs when ${he} feels you ${fillHim} despite ${his} pleas.`);
		}
	}

	text.push(`You repeat this ritual throughout the week, ensuring that ${slave.slaveName}`);

	if (superfetation) {
		text.push(`has <span class="pregnant">added your child</span> to ${his} pregnancy.`);
	} else {
		text.push(`is <span class="pregnant">carrying your child.</span>`);
	}

	if (FutureSocieties.isActive('FSRestart') && (!slave.breedingMark || V.propOutcome === 0) && V.eugenicsFullControl !== 1) {
		text.push(`Rumors spread about you fucking your slaves pregnant; the Societal Elite are <span class="reputation dec">very displeased</span> by these rumors.`);

		V.failedElite += 5;
	}

	if (FutureSocieties.isActive('FSGenderRadicalist') && slave.mpreg) {
		text.push(`Society <span class="reputation inc">approves</span> of your fucking your slaves' asses pregnant; this advances the ideal all a slave needs is ${his} rear.`);
		FutureSocieties.Change("FSGenderRadicalist", 1);
	} else if (FutureSocieties.isActive('FSGenderFundamentalist')) {
		if (slave.mpreg) {
			text.push(`Society <span class="reputation dec">is disgusted</span> by this degenerate form of reproduction.`);
			FutureSocieties.Change("FSGenderFundamentalist", -1);
		} else {
			text.push(`Society <span class="reputation inc">approves</span> of your putting a new slave in ${him}; this advances the idea that all slaves should bear their masters' babies.`);
			FutureSocieties.Change("FSGenderFundamentalist", 1);
		}
	}

	seX(slave, slave.mpreg ? `anal` : `vaginal`, V.PC, "penetrative");
	knockMeUp(slave, 100, 2, -1);

	App.Events.addNode(frag, text);

	return frag;
};
