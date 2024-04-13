/** build cost modifier array for schools; they're all supposed to behave basically the same way except TFS
 * @param {FC.SlaveSchoolName} school
 */
App.Markets.makeSchoolmodifiers = function(school) {
	const modifiers = [];
	if (V[school].schoolSale !== 0) {
		modifiers.push({factor: -0.5, reason: "slave school sale"});
	} else if (V[school].schoolUpgrade !== 0) {
		modifiers.push({factor: -0.2, reason: "slave school endowment discount"});
	}
	return modifiers;
};

App.Markets.GRI = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`The Growth Research Institute (GRI) is not primarily a slave school at all, but rather the world leader in female growth hormone development. It operates research centers in the Free Cities to avoid traditional medical research laws. GRI runs several slave schools to raise healthy, unmodified subjects for use in trials. After a year of experimental hormone treatment they are sold.`);
	if (V.GRI.schoolUpgrade !== 0) {
		r.push(`You have endowed`);
		if (V.GRI.schoolUpgrade === 1) {
			r.push(`a research focus on advanced curatives; most subjects now leave the GRI at unnatural levels of vitality.`);
		} else {
			r.push(`a research focus on milk production; subjects' breasts are bigger and milkier than ever.`);
		}
		if (V.PC.title === 0) {
			r.push(`As a major benefactrix`);
		} else {
			r.push(`As a major benefactor`);
		}
		r.push(`of the institution, you also receive a discount on them.`);
	}
	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("p", el, `GRI offers a fresh graduate for inspection via video call. The interview takes place in the graduate's bare-metal holding cell. Disturbingly, it is strongly reminiscent of an enclosure for a lab animal, only scaled up to contain a lab animal of human dimensions.`);
	const modifiers = App.Markets.makeSchoolmodifiers("GRI");
	el.append(
		App.Markets.purchaseFramework("GRI", {modifiers})
	);

	return el;
};

App.Markets.LDE = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`L'École des Enculées is one of the oldest networks of slave schools, but because its training must be started early, it is only now beginning to produce and show a return on its investors' stakes. It aims to produce graduates more feminine than the average naturally born female, in spite of their having been born male. The school is a global leader in hormonal feminization, which allows it to produce curvier slaves than many schools that focus on natural females. It also retains its graduates for a year after their majority and their enslavement, so as to be able to legally subject them to intensive sexual conditioning that focuses on their prostates as their main remaining locus of arousal.`);
	if (V.LDE.schoolUpgrade !== 0) {
		r.push(`Since you have endowed`);
		if (V.LDE.schoolUpgrade === 1) {
			r.push(`the regular application of drugs to induce extreme infatuation in its graduates towards the first dominant person they encounter, any graduate purchased here will now promptly fall in love with you.`);
		} else {
			r.push(`research into narrowly targeted hormonal treatments, its graduates are now available with generous members despite their femininity.`);
		}
		r.push(`As a major ${(V.PC.title === 0) ? `benefactrix` : `benefactor`} of the institution, you also receive a discount on them.`);
	}

	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("p", el, `L'École des Enculées offers a fresh graduate for inspection via video call. The interview takes place in the dormitory for the oldest class of girls. Absurdly sexual squeals repeatedly interrupt the call, making it very clear that someone close by the interviewee is experiencing a strong combination of anal pain and anal pleasure.`);
	const modifiers = App.Markets.makeSchoolmodifiers("LDE");
	el.append(
		App.Markets.purchaseFramework("LDE", {modifiers})
	);

	return el;
};

App.Markets.NUL = function() {
	const el = new DocumentFragment();
	let r = [];

	r.push(`Nueva Universidad de Libertad is a unique slave school operating in the Free Cities. Its business model is to offer as close to asexuality as a sex slave can possess. All students have their sex organs surgically removed at a very young age, before the onset of puberty. This is followed by numerous cosmetic surgery alternations, alongside a steady regimen of hormone blockers, throughout their education. The result is an utterly physically androgynous slave.`);
	if (V.NUL.schoolUpgrade !== 0) {
		r.push(`You have endowed the school with advanced training courses in`);
		if (V.NUL.schoolUpgrade === 1) {
			r.push(`entertainment and conversation.`);
		} else {
			r.push(`the various sexual arts.`);
		}
		r.push(`As a major financial supporter of the institution, you also receive a discount on them.`);
	}

	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("p", el, `Nueva Universidad de Libertad offers a fresh graduate for inspection via video call. The interview takes place in said graduate's dormitory. The room is sparse and utilitarian, and immaculately clean. Likely by design, it looks like the set from an old sci-fi movie.`);
	const modifiers = App.Markets.makeSchoolmodifiers("NUL");
	el.append(
		App.Markets.purchaseFramework("NUL", {modifiers})
	);

	return el;
};

App.Markets.SCP = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`St. Claver Preparatory is an old world preparatory school that was purchased by an old world medical school adapting to the demand for plastic surgeons from the Free Cities. It functions as a standard slave school until its students near graduation. At that point they are paired with a budding plastic surgeon. Intensive, flawless, and of course successful surgical modification of the student is required to complete certification as a Free Cities plastic surgeon of the top rank. All St. Claver's graduates are modified to a single exacting standard. Meanwhile, the slave school is free to train its students for obedience and sexual conformity.`);
	if (V.SCP.schoolUpgrade !== 0) {
		r.push(`You have endowed`);
		if (V.SCP.schoolUpgrade === 1) {
			r.push(`thorough use of mental suppressants that reliably produce total devotion at the price of total stupidity.`);
		} else {
			r.push(`diversification of the school's approach into general slave training that produces graduates with basic skills.`);
		}
		r.push(`As a major`);
		if (V.PC.title === 0) {
			r.push(`benefactrix`);
		} else {
			r.push(`benefactor`);
		}
		r.push(`of the institution, you also receive a discount on them.`);
	}

	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("p", el, `St. Claver Preparatory offers a fresh graduate for inspection via video call. The interview takes place in a very obviously medical office, with medical supply robots wheeling past its glass walls and nurses hurrying to and fro.
	`);
	const modifiers = App.Markets.makeSchoolmodifiers("SCP");
	el.append(
		App.Markets.purchaseFramework("SCP", {modifiers})
	);

	return el;
};

App.Markets.TCR = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`The Cattle Ranch is a controversial slave school operating primarily out of Pastoralistic Free Cities. Its business model is to offer the ideal free range dairy cow; one whose tits and belly reach the floor when on all fours. All cattle come optimized for milking, with big breasts and gravid middles. Slave orphans have their heels clipped shortly after birth and are conditioned to believe they are actual livestock, resulting in a mindbreak-like state. Between their wide hips and big butts and their heavy, milky breasts, they are often popular breeding slaves. They rarely display their stock over video call, instead favoring a more hands-on approach. Buyers can visit their local shops to view grazing cattle available for sale. Alternatively, they can watch the calves frolic among their mothers or enjoy the sight of a breeding bull impregnating an empty womb. Cows are also specially trained to respond to spectators banging on the fence; oral awaits if you drop trou for them!`);
	if (V.TCR.schoolUpgrade !== 0) {
		r.push(`You have endowed`);
		if (V.TCR.schoolUpgrade === 1) {
			r.push(`a healthy sum of credits to make their breeding bulls available for sale.`);
		} else {
			r.push(`a healthy sum of credits to encourage the sale of heifers.`);
		}
		r.push(`As a major ${(V.PC.title === 0) ? `benefactrix` : `benefactor`} of the ranch, you also receive a discount on them.`);
	}
	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	r = [];
	r.push(`The Cattle Ranch parades a choice selection of cows for your viewing pleasure. You're free to do as you please to the slaves, as long as you don't cause lasting harm to them.`);
	if (isFertile(V.PC) && V.PC.preg !== -1) {
		r.push(`You can't help but notice the number of bulls lining up along the fence sniffing at you.`);
	}
	App.UI.DOM.appendNewElement("p", el, r.join(" "));
	const modifiers = App.Markets.makeSchoolmodifiers("TCR");
	el.append(
		App.Markets.purchaseFramework("TCR", {modifiers, sTitleSingular: "cow", sTitlePlural: "cattle"})
	);

	return el;
};

App.Markets.TGA = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`The Gymnasium-Academy is a very unusual slave school. It sits at a bizarre juncture of the evolving gender roles and slave roles in the Free Cities. Its graduates are exclusively born male, and are not surgically or hormonally changed, but are thoroughly indoctrinated in the gender roles of the Free Cities to be accepting of their place in the new and rapidly changing world. Since the Gymnasium-Academy produces graduates with a greater ability to build muscle, fitness and virility than any of its competitors, it also trains for athletic perfection to further differentiate them. This training relies on traditional methods of corporal punishment.`);
	if (V.TGA.schoolUpgrade !== 0) {
		r.push(`Since you have endowed`);
		if (V.TGA.schoolUpgrade === 1) {
			r.push(`advanced training methods at the Gymnasium-Academy, its graduates are now fanatically loyal.`);
		} else {
			r.push(`a combat training center at the Gymnasium-Academy, its graduates are now deadly fighters.`);
		}
		r.push(`As a major`);
		if (V.PC.title === 0) {
			r.push(`benefactrix`);
		} else {
			r.push(`benefactor`);
		}
		r.push(`of the institution, you also receive a discount on them.`);
	}

	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("p", el, `The Gymnasium-Academy offers a fresh graduate for inspection via video call. The interview takes place in an office overlooking an expansive workout room, in which a large number of naked, fit young bodies are performing punishing workout routines.`);
	const modifiers = App.Markets.makeSchoolmodifiers("TGA");
	el.append(
		App.Markets.purchaseFramework("TGA", {modifiers})
	);

	return el;
};

App.Markets.HA = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`The Hippolyta Academy is one of the most famous slave bodyguarding schools in all the Free Cities. Its business model is to offer very high quality, highly trained girls. Their renowned amazonian maids are some of the best combatants in the world and can be often found at the side of the wealthiest citizens.`);
	if (V.HA.schoolUpgrade === 1) {
		r.push(`Recently the school was able to enhance its educational programs thanks to your generous donation. Their slaves are now some of the most well trained and educated on the market.`);
	} else if (V.HA.schoolUpgrade === 2) {
		r.push(`Recently the school was able to improve its drug enhancement program thanks to your generous donation. Their slaves are now some of the most physically impressive specimen on the market.`);
	} else if (V.HA.schoolUpgrade === 3) {
		r.push(`Recently the school redirected its focus to better align with the strongfat ideal, as of your suggestion. Their slaves are physically impressive yet maintain a soft and feminine aspect.`);
	}
	if (V.HA.schoolUpgrade !== 0) {
		r.push(`As a major financial supporter of the institution, you also receive a discount on them.`);
	}

	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("p", el, `The Hippolyta Academy offers a fresh graduate for inspection. The interview takes place in one of the many training areas of the school, where the physical prowess of the candidate can be easily showcased.`);
	const modifiers = App.Markets.makeSchoolmodifiers("HA");
	el.append(
		App.Markets.purchaseFramework("HA", {modifiers})
	);

	return el;
};

App.Markets.TSS = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`The Slavegirl School is the newest slave school operating in the Free Cities. Its business model is to offer simpler, cheaper wares than its competitors. All Slavegirl School graduates are natural-born females without surgical modifications. Their training emphasizes elimination of any serious psychological deformities. They are promptly enslaved and sold as soon as they reach their majorities, and are marketed as complete virgins.`);
	if (V.TSS.schoolUpgrade !== 0) {
		r.push(`You have endowed`);
		if (V.TSS.schoolUpgrade === 1) {
			r.push(`an alternative college at The Slavegirl School, which focuses on retraining good MILF stock into mature slave girls.`);
		} else {
			r.push(`an improvement in the simplistic school's approach that teaches good basic skills without losing too much efficiency.`);
		}
		r.push(`As a major`);
		if (V.PC.title === 0) {
			r.push(`benefactrix`);
		} else {
			r.push(`benefactor`);
		}
		r.push(`of the institution, you also receive a discount on them.`);
	}

	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("p", el, `The Slavegirl School offers a fresh graduate for inspection via video call. The interview takes place in a faculty member's office. Absurdly, it's barely distinguishable from an office at any traditional institution of higher education. The only giveaway is the profusion of sex toys on the desk and the pornography on the walls.`);
	const modifiers = App.Markets.makeSchoolmodifiers("TSS");
	el.append(
		App.Markets.purchaseFramework("TSS", {modifiers})
	);

	return el;
};

App.Markets.TUO = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`The Utopian Orphanage is where all slaves dream of being raised. Its business model is to offer intelligent, well educated girls just past their majority. The girls are treated exceptionally well and have no sexual ${(V.TUO.schoolUpgrade !== 2) ? "education or " : ""}experience.`);
	if (V.TUO.schoolUpgrade !== 0) {
		r.push(`You have endowed`);
		if (V.TUO.schoolUpgrade === 1) {
			r.push(`stricter admissions proceedings at the school, meaning only the finest children will get accepted in.`);
		} else {
			r.push(`the school with sexual education materials; the girls now have a better understanding of what sex is.`);
		}
		r.push(`As a major ${(V.PC.title === 0) ? `benefactrix` : `benefactor`} of the institution, you also receive a discount on them.`);
	}

	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("p", el, `The Utopian Orphanage offers a fresh graduate for inspection. The interview takes place in the girl's private room, where she showcases her education and wits.`);
	const modifiers = App.Markets.makeSchoolmodifiers("TUO");
	el.append(
		App.Markets.purchaseFramework("TUO", {modifiers})
	);

	return el;
};
