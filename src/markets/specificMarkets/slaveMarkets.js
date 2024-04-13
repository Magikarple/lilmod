App.Markets.heap = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`You visit the slave markets off the arcology plaza. It's always preferable to examine merchandise in person.`);
	r.push(`You're in the corner of the slave market occupied by "The Flesh Heap", a dumping ground, of sorts, for broken slaves. Be it brain death, drug overdose, coma, or anything else, this market is willing to buy and sell them. Most of the worthwhile slaves have already been picked clean by pharmaceutical companies for drug testing, and the rest are practically nothing more than vegetables, but a handful remain just conscious enough to be profitable with effort as slaves. One should go in expecting only the worst quality possible, though if anything catches your eye, it will be rather cheap to purchase.`);

	let heap = jsRandom(1, 4);
	if (heap === 1) {
		r.push(`"Looking for a warm body to use as furniture? Perhaps as a decorative, living sculpture? We got what you want!"`);
	} else if (heap === 2) {
		r.push(`"I guarantee they are all alive, maybe not healthy, but alive. Well, except that one; just ignore that one."`);
	} else if (heap === 3) {
		r.push(`"We ask that you don't use this merchandise for organ harvesting; we have plenty of nonfunctional ones for that."`);
	} else {
		r.push(`"If you are looking for a body to do unmentionable things to, you came to the right place! Though these in particular just barely fall under slave laws."`);
	}
	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("heap"));
	return el;
};

App.Markets.wetware = function() {
	const el = new DocumentFragment();
	let r = [];
	const {heU, hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
	r.push(`You're in the corner of the slave market occupied by scientists and programmers, pioneers in perfecting the skills of slaves by removing all external stimuli and subjecting them to an inhumane regimen of simulated sexual and career training. Although their bodies are ruined, these slaves are guaranteed to be intelligent, skilled and trained in a variety of jobs. If you're willing to perform extensive repairs${(V.bodyswapAnnounced) ? `, or have a spare body ready` : ``}, these slaves have high potential in almost any role in your arcology.`);

	let wetware = jsRandom(1, 4);
	if (wetware === 1) {
		r.push(`Just past a scientist, you can see a`);
		if (V.seeExtreme === 1) {
			r.push(`limbless`);
		}
		r.push(`slave being extracted from a tank filled with fluid wearing a bizarre helmet. As the device is removed by a technician, the slave begins to panic as ${heU} is dragged from ${hisU} virtual life and realizes exactly what has happened to ${hisU} body.`);
	} else if (wetware === 2) {
		r.push(`A scientist turns to you and remarks "I almost envy the hardware. They believe they're having a fulfilling career with a loving family and meaningful relationships for a lifetime. Honestly, if the mental imprinting process wasn't so destructive to the human body, I'd probably hop in myself!"`);
	} else if (wetware === 3) {
		r.push(`Racks of ravaged bodies are laid across tables with plaques stating slave IQ, career, and sexual skill exam results.`);
	} else {
		r.push(`Curious, you ask a technician why it's necessary for the merchandise to be so badly treated. He replies "Forcing stimulus on the hardware takes an enormous toll on their nervous and circulatory system. The nonfunctional components are disabled and removed as necessary to ensure optimal response to the imprinting process."`);
	}
	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("wetware"));
	return el;
};

App.Markets.kidnappers = function() {
	const el = new DocumentFragment();
	let r = [];
	const {hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
	r.push(`You're in the area of the slave market populated by slave kidnappers, though of course they prefer more polite titles. The slaves here are cheap, and they look it. They're almost all recent catches from bad parts of the old world, and most of them have seen considerable abuse between the moment of their capture and entering your arcology.`);
	if (V.arcologies[0].FSPaternalistSMR === 1) {
		r.push(`Fortunately for them, such behavior is not permitted here. Though they remain frightened and angry, they are safe from rape, for now.`);
	} else {
		let kidnappers = jsRandom(1, 4);
		r.push(`There's more merchandise out of sight in the holding areas. To go by what you can hear,`);
		if (kidnappers === 1 && jsRandom(1, 100) <= V.seeDicks) {
			r.push(`muffled insistence that the speaker is not a girl followed by struggling and then shrieks as a resistant dickgirl takes anal rape,`);
		} else if ((kidnappers === 2) && (jsRandom(0, 99) >= V.seeDicks)) {
			r.push(`muffled begging followed by struggling and then crying as a new slave learns how it feels to have a slave's cunt,`);
		} else if (kidnappers === 3) {
			r.push(`muffled gagging followed gasping and sobbing as a new slave tries to get ${hisU} breath back after oral rape,`);
		} else {
			r.push(`the unmistakable slap of flesh on flesh,`);
		}
		r.push(`at least one of the slavers is amusing himself`);
		if (!FutureSocieties.isActive('FSGenderFundamentalist')) {
			r.push(`(or herself)`);
		}
		r.push(`back there.`);
	}

	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("kidnappers"));
	return el;
};

App.Markets.indentures = function() {
	const el = new DocumentFragment();
	let r = [];
	const {girlU, hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
	r.push(`You're in the area of the slave market that deals in indentured servants. The people sold here are slaves, but they are temporary slaves, and many of them have clauses in their indentures that prohibit some of the most severe practices. They exhibit a strange variety, with some looking more frightened than the most downtrodden slave and some looking almost cheerful.`);
	if (V.arcologies[0].FSPaternalistSMR === 1) {
		r.push(`The generous protections for slaves in your arcology lend this last group extra confidence.`);
	} else {
		let indentures = jsRandom(1, 4);
		r.push(`The area is crowded, and more indentured servants are packed together in the holding areas. To go by what you can hear,`);
		if (indentures === 1 && jsRandom(1, 100) <= V.seeDicks) {
			r.push(`the unmistakable mixed shrieks, sobs, and slaps of anal rape,`);
		} else if ((indentures === 2) && (jsRandom(0, 99) >= V.seeDicks)) {
			r.push(`the characteristic crying and gasping of an unwilling ${girlU} giving up ${hisU} cunt,`);
		} else if (indentures === 3) {
			r.push(`the gagging and expectoration of someone who has just gotten a mouthful of unwelcome cum,`);
		} else {
			r.push(`disconsolate sobbing interrupted by a gasp as something is stuffed inside someone's mouth, and followed by muffled screams,`);
		}
		r.push(`one of them is learning exactly what ${hisU} indenture allows.`);
	}

	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("indentures"));
	return el;
};

App.Markets.hunters = function() {
	const el = new DocumentFragment();
	let r = [];
	const {hisU, himU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
	r.push(`You're in the area of the slave market populated by runaway slave catchers, a proud group. The slaves here know their way around Free Cities slavery already, and their eyes are watchful. Most of them probably harbor thoughts of another attempt at escape, though the slavers to their best to disabuse them of these notions.`);
	if (V.arcologies[0].FSPaternalistSMR === 1) {
		r.push(`Their methods are somewhat limited, as the rules in your arcology preclude the more effective methods of punishment.`);
	} else {
		let hunters = jsRandom(1, 4);
		r.push(`The slave catchers consider their catches fair game, though they usually confine their amusements to the holding areas out of sight. Not out of earshot, though; to go by what you can hear,`);
		if (hunters === 1 && jsRandom(1, 100) <= V.seeDicks) {
			r.push(`vehement insistence that the speaker is not a girl followed by a beating and then shrieks as a rebellious dickgirl takes anal rape,`);
		} else if (hunters === 2 && jsRandom(0, 99) >= V.seeDicks) {
			r.push(`vehement protestations followed by a beating and then crying as a slave's cunt takes ${hisU} punishment for ${himU},`);
		} else if (hunters === 3) {
			r.push(`struggling and gagging followed gasping and angry swearing as a rebellious slave tries to get ${hisU} breath back after oral rape,`);
		} else {
			r.push(`struggling followed by the slap of flesh on flesh,`);
		}
		r.push(`at least one of the runaway hunters is amusing himself`);
		if (!FutureSocieties.isActive('FSGenderFundamentalist')) {
			r.push(`(or herself)`);
		}
		r.push(`back there.`);
	}

	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("hunters"));
	return el;
};

App.Markets["underage raiders"] = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`You're in the seediest area of the slave market, populated by the cradle robbers, a despised group of slavers known for raiding elementary schools, orphanages and even preschools. ${V.fertilityAge >= V.minimumSlaveAge ? `They specifically target those who have yet to experience their first period. ` : ``}The extreme risk of these raids makes the slavers here aggressive and confident,`);
	if (V.arcologies[0].FSPaternalistSMR === 1) {
		r.push(`though they do obey the rules of your arcology that restrain them from abusing the slaves.`);
	} else {
		let ur = jsRandom(1, 4);
		r.push(`though they restrain themselves from reducing the value of their captures by taking virginities. They do have their fun, though; to go by what you can hear from the holding area where they keep underage slaves who can be sold,`);
		if (ur === 1 && jsRandom(1, 100) <= V.seeDicks) {
			r.push(`a muffled but obviously sadistic description of feminization, and the desperate sobbing in response,`);
		} else if ((ur === 2) && (jsRandom(0, 99) >= V.seeDicks)) {
			r.push(`a muffled but obviously sadistic description of breeding, and the desperate sobbing in response,`);
		} else if (ur === 3) {
			r.push(`faint struggling and crying that suggests that someone is being thoroughly groped and pinched,`);
		} else {
			r.push(`the lewd, lubricated noise of someone giving a reluctant handjob,`);
		}
		r.push(`at least one of the raiders is amusing himself`);
		if (!FutureSocieties.isActive('FSGenderFundamentalist')) {
			r.push(`(or herself)`);
		}
		r.push(`back there.`);
	}

	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("underage raiders"));
	return el;
};
App.Markets.raiders = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`You're in the area of the slave market populated by girl raiders, that daredevil subset of slave kidnappers that specifically target old world schools, preparatory institutions, religious groups, and other sources of slaves that can soon be sold right after they reach their majorities. The extreme risk of these raids makes the slavers here aggressive and confident,`);
	if (V.arcologies[0].FSPaternalistSMR === 1) {
		r.push(`though they do obey the rules of your arcology that restrain them from abusing the slaves.`);
	} else {
		let raiders = jsRandom(1, 4);
		r.push(`though they restrain themselves from reducing the value of their captures by taking virginities. They do have their fun, though; to go by what you can hear from the holding area where they keep slaves of age who can be sold,`);
		if (raiders === 1 && jsRandom(1, 100) <= V.seeDicks) {
			r.push(`a muffled but obviously sadistic description of feminization, and the desperate sobbing in response,`);
		} else if (raiders === 2 && jsRandom(0, 99) >= V.seeDicks) {
			r.push(`a muffled but obviously sadistic description of breeding, and the desperate sobbing in response,`);
		} else if (raiders === 3) {
			r.push(`faint struggling and crying that suggests that someone is being thoroughly groped and pinched,`);
		} else {
			r.push(`the lewd, lubricated noise of someone giving a reluctant handjob,`);
		}
		r.push(`at least one of the raiders is amusing himself`);
		if (!FutureSocieties.isActive('FSGenderFundamentalist')) {
			r.push(`(or herself)`);
		}
		r.push(`back there.`);
	}

	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("raiders"));
	return el;
};

App.Markets.neighbor = function() {
	const arcology = V.arcologies[V.market.numArcology];
	const el = new DocumentFragment();
	el.append(`You're in the area of the slave market that specializes in slaves from within the Free City, viewing slaves from `);
	App.UI.DOM.appendNewElement("span", el, `${arcology.name}.`, "bold");
	el.append(` Some were trained there, specifically for sale, while others are simply being sold.`);
	const opinion = App.Neighbor.opinion(V.arcologies[0], arcology);
	const modifiers = [{factor: -(opinion/100) * 0.05, reason: opinion > 0 ? "cultural ties" : "cultural friction"}];
	if (opinion > 2) {
		el.append(` Your cultural ties with ${arcology.name} helps keep the price reasonable.`);
	} else if (opinion < -2) {
		el.append(` Your social misalignment with ${arcology.name} drives up the price.`);
	}

	el.append(App.Markets.purchaseFramework("neighbor", {modifiers}));
	return el;
};

App.Markets.trainers = function() {
	const el = new DocumentFragment();
	let r = [];
	const {girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
	r.push(`You're in the area of the slave market populated by slave trainers, easily the wealthiest vendors. The slaves here have received obedience training and medical care, and many have had some basic sexual skills forced on them.`);
	if (V.arcologies[0].FSPaternalistSMR === 1) {
		r.push(`Though the rules of your arcology protected them from the worst excesses of the training profession, many of the slaves on sale have the haunted look of people still coming to terms with the idea that they no longer have any bodily autonomy.`);
	} else {
		let trainers = jsRandom(1, 4);
		r.push(`The trainers are a competitive bunch, and to go by what you can hear,`);
		if (trainers === 1 && jsRandom(1, 100) <= V.seeDicks) {
			r.push(`moaning interspersed with lewd, well-lubricated noises coming from both anal sex and vigorous masturbation,`);
		} else if (trainers === 2 && jsRandom(0, 99) >= V.seeDicks) {
			r.push(`moaning and the distinctive slap of feminine buttocks on thighs beneath them as a ${girlU} rides a dick,`);
		} else if (trainers === 3) {
			r.push(`the lush, lewd sounds of diligent oral sex,`);
		} else {
			r.push(`the call-and-response of a trainer and a slave running through a memorized obedience exercise,`);
		}
		r.push(`at least one of them is applying some last-minute training to a slave in the holding pens nearby.`);
	}

	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("trainers"));
	return el;
};
