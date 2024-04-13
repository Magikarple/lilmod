// cSpell:ignore ACUP

App.Desc.boobBits = function() {
	'use strict';

	const data = {
		299: {
			cup: "flat", anCup: false, adjective: ["androgynous", "flat"], noun: ["chest"]
		},
		399: {
			cup: "A-cup", anCup: true, adjective: ["pointy", "tiny"], noun: ["chest"]
		},
		499: {
			cup: "B-cup", anCup: false, adjective: ["perky", "small"], noun: ["boobs", "bosom", "breasts", "tits"]
		},
		649: {
			cup: "C-cup", anCup: false, adjective: ["curved", "healthy"], noun: ["boobs", "bosom", "breasts", "bust", "tits"]
		},
		799: {
			cup: "D-cup", anCup: false, adjective: ["big", "sizable"], noun: ["boobs", "bosom", "breasts", "bust", "tits"]
		},
		999: {
			cup: "DD-cup", anCup: false, adjective: ["big", "large"], noun: ["boobs", "bosom", "breasts", "bust", "tits"]
		},
		1199: {
			cup: "F-cup", anCup: true, adjective: ["hefty", "proud"], noun: ["boobs", "breasts", "mammaries", "tits", "udders"]
		},
		1399: {
			cup: "G-cup", anCup: false, adjective: ["hefty", "huge"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		1599: {
			cup: "H-cup", anCup: true, adjective: ["huge", "massive"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		1799: {
			cup: "I-cup", anCup: true, adjective: ["enormous", "massive"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		2049: {
			cup: "J-cup", anCup: false, adjective: ["enormous", "titanic"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		2299: {
			cup: "K-cup", anCup: false, adjective: ["stupendous", "titanic"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		2599: {
			cup: "L-cup", anCup: true, adjective: ["magnificent", "stupendous"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		2899: {
			cup: "M-cup", anCup: true, adjective: ["magnificent", "tremendous"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		3249: {
			cup: "N-cup", anCup: true, adjective: ["awe-inspiring", "tremendous"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		3599: {
			cup: "O-cup", anCup: true, adjective: ["absurd", "awe-inspiring"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		3949: {
			cup: "P-cup", anCup: false, adjective: ["attention-grabbing", "disproportionate"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		4299: {
			cup: "Q-cup", anCup: false, adjective: ["massive", "shocking"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		4699: {
			cup: "R-cup", anCup: true, adjective: ["jaw-dropping", "unreal"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		5099: {
			cup: "S-cup", anCup: true, adjective: ["astounding", "tremendous"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		5499: {
			cup: "T-cup", anCup: false, adjective: ["unmissable", "frightening"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		6499: {
			cup: "U-cup", anCup: false, adjective: ["unmissable", "attention-grabbing"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		6999: {
			cup: "V-cup", anCup: false, adjective: ["attention-grabbing", "spectacular"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		7499: {
			cup: "X-cup", anCup: true, adjective: ["spectacular", "unnatural"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		7999: {
			cup: "Y-cup", anCup: true, adjective: ["unnatural", "unreal"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		8499: {
			cup: "Z-cup", anCup: false, adjective: ["mind-blowing", "unreal"], noun: ["boobs", "breasts", "mammaries", "udders"]
		},
		8999: {
			cup: "ZZ-cup", anCup: true, adjective: ["mind-blowing", "unbelievable"], noun: ["breasts", "mammaries", "tits", "udders"]
		},
		9999: {
			cup: "ZZZ-cup", anCup: false, adjective: ["mind-blowing", "unbelievable"], noun: ["boobs", "breasts", "mammaries", "udders"]
		},
		14999: {
			cup: "", anCup: false,
			adjective: ["obscenely massive"],
			noun: ["boobs", "breasts", "mammaries", "masses of breastflesh", "udders"]
		},
		24999: {
			cup: "", anCup: false,
			adjective: ["arm-filling"],
			noun: ["boobs", "breasts", "mammaries", "masses of breastflesh", "udders"]
		},
		39999: {
			cup: "", anCup: false,
			adjective: ["figure-dominating"],
			noun: ["boobs", "breasts", "mammaries", "masses of breastflesh", "udders"]
		},
		54999: {
			cup: "", anCup: false,
			adjective: ["beachball-sized"],
			noun: ["boobs", "breasts", "mammaries", "masses of breastflesh", "udders"]
		},
		69999: {
			cup: "", anCup: false,
			adjective: ["lap-filling"],
			noun: ["boobs", "breasts", "mammaries", "masses of breastflesh", "udders"]
		},
		89999: {
			cup: "", anCup: false,
			adjective: ["door-crowding"],
			noun: ["boobs", "breasts", "mammaries", "masses of breastflesh", "udders"]
		},
		100000: {
			cup: "", anCup: false,
			adjective: ["door-jamming"],
			noun: ["boobs", "breasts", "mammaries", "masses of breastflesh", "udders"]
		},
	};

	return {
		cup: getCup,
		adjective: getAdjective,
		noun: getNoun,
		format: format
	};

	/**
	 * @param {number} volume
	 * @returns {{cup: string, anCup: boolean, adjective: string[], noun: string[]}}
	 */
	function _getRec(volume) {
		for (const p in data) {
			// @ts-ignore
			if (p >= volume) {
				return data[p];
			}
		}
		return data[100000];
	}

	/**
	 * @param {number} volume in CCs
	 * @returns {string}
	 */
	function getCup(volume) {
		return _getRec(volume).cup;
	}

	/**
	 * @param {number} volume in CCs
	 * @returns {string}
	 */
	function getAdjective(volume) {
		return _getRec(volume).adjective.random();
	}

	/**
	 * @param {number} volume in CCs
	 * @param {boolean} [cup] prepend cup
	 * @param {boolean} [adjective] prepend adjective
	 * @returns {string}
	 */
	function getNoun(volume, cup = true, adjective = true) {
		let r = "";
		const rec = _getRec(volume);
		if (adjective) {
			r += `${rec.adjective.random()} `;
		}
		if (cup && rec.cup.length > 0) {
			r += `${rec.cup} `;
		}
		r += rec.noun.random();
		return r;
	}

	/**
	 * Formats a textual breast description, according to the format string
	 * @param {string} format
	 * @param {number} volume
	 * @returns {string}
	 *
	 * The following placeholders are supported:
	 * '%CUP' => cup size (e.g. "C-cup")
	 * '%ACUP' => cup size with article (a/an)
	 * '%ADJ' => adjective (e.g. "small", "big")
	 * '%NOUN' => plural noun (e.g. "boobs", "tits")
	 * '%VOLUME' => the passed volume number
	 */
	function format(format, volume) {
		const rec = _getRec(volume);
		return format.replace(/%([A-Z]+)/g, (match, p1) => {
			switch (p1) {
				case 'ACUP':
					return rec.cup.length > 0 ? ((rec.anCup ? 'an ' : 'a ') + rec.cup) : '';
				case 'CUP':
					return rec.cup;
				case 'ADJ':
					return rec.adjective.random();
				case 'NOUN':
					return rec.noun.random();
				case 'VOLUME':
					return num(volume);
			}
		});
	}
}();

App.Desc.boobs = function() {
	'use strict';
	return describe;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {DescType} [descType=DescType.NORMAL]
	 * @returns {string}
	 */
	function describe(slave, descType = DescType.NORMAL) {
		return `${outerInspection(slave, descType)} ${detailedInspection(slave)}`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {DescType} descType
	 * @returns {string}
	 */
	function outerInspection(slave, descType) {
		const {his} = getPronouns(slave);

		if (descType === DescType.SURGERY) {
			if (slave.boobs < 300) {
				return `${slave.slaveName}'s flat chest is bare and begging for surgery.`;
			} else {
				return `${slave.slaveName}'s breasts are bare and ready for surgery.`;
			}
		} else if ((slave.assignment === App.Data.Facilities.dairy.jobs.cow.assignment) && (V.dairyRestraintsSetting > 1)) {
			return `${slave.slaveName}'s breasts are gently moving with the powerful pumping of the milkers attached to ${his} nipples.`;
		} else if (V.showClothing === 1 && descType !== DescType.MARKET) {
			return clothesInspection(slave);
		}

		return ``;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function clothesInspection(slave) {
		const noun = App.Desc.boobBits.noun(slave.boobs, false, false);
		const adjNoun = App.Desc.boobBits.noun(slave.boobs, false, true);
		let r = '';
		const {he, his, him, His, girl} = getPronouns(slave);
		const clothing = App.Data.clothes.get(slave.clothes);
		if (clothing && clothing.desc && "boobs" in clothing.desc) {
			r += clothing.desc.boobs(slave);
		} else {
			switch (slave.clothes) {
				case "a Fuckdoll suit":
					r += `${slave.slaveName}'s Fuckdoll suit `;
					if (slave.boobs > 300) {
						r += `fits each of ${his} ${adjNoun} `;
						if (slave.boobs > 12000) {
							r += 'perfectly.';
						} else if (slave.boobs > 300) {
							r += 'individually.';
						}
					} else {
						r += `is flat across ${his} chest.`;
					}
					break;
				case "conservative clothing":
					if (slave.boobs > 24000) {
						r += `${slave.slaveName} is wearing a tent-like sweater tailored to cover ${his} ${adjNoun}.`;
					} else if (slave.boobs > 12000) {
						r += `${slave.slaveName} is wearing a massively oversized custom sweater since nothing else comes close to modestly covering ${his} ${adjNoun}. Even so, it's stretched taut struggling to contain their immense mass.`;
					} else if (slave.boobs > 8000) {
						r += `${slave.slaveName} is wearing an oversized sweater, since that's the only top that will come close to covering ${his} ${adjNoun}. Even so, it's stretched taut just struggling to cover ${his} nipples.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName} is wearing an oversized sweater, since that's the only top that will cover ${his} ${adjNoun}. Even so, it's stretched taut over them.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s blouse is professional, but can't conceal the gigantic dimensions of ${his} ${adjNoun}.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s blouse is professional, but can't conceal how big ${his} ${noun} are.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName}'s blouse is professional and includes a pleated front over ${his} flat chest.`;
					} else {
						r += `${slave.slaveName}'s blouse is professional and includes a pleated front over ${his} ${adjNoun}.`;
					}
					break;
				case "chains":
					r += `${slave.slaveName} has a length of chain painfully `;
					if (slave.boobs > 800) {
						r += 'tightened around the base of each breast, forcing them out.';
					} else if (slave.boobs < 300) {
						switch (slave.nipples) {
							case "huge":
								r += `wrapped around each of ${his} huge nipples, since they are the only things protruding from ${his} chest.`;
								break;
							case "inverted":
								r += `wrapped tightly across ${his} flat chest, through the cleft of ${his} inverted nipples.`;
								break;
							default:
								r += `wrapped tightly across ${his} flat chest, directly over ${his} ${slave.nipples} nipples.`;
						}
					} else {
						r += `looped under ${his} chest, forcing ${his} breasts up.`;
					}
					break;
				case "Western clothing":
					r += `${slave.slaveName}'s flannel shirt `;
					if (slave.boobs > 2000) {
						r += `can't begin to contain ${his} ${adjNoun}, so ${he}'s just tied it under them for support.`;
					} else if (slave.boobs > 800) {
						r += `can't close over ${his} ${adjNoun}, so ${he}'s just buttoned it up to where they start and let them fill it out above that.`;
					} else if (slave.boobs < 300) {
						r += `tightly hugs ${his} flat chest.`;
					} else {
						r += `rests comfortably over ${his} ${adjNoun}.`;
					}
					break;
				case "body oil":
					if (slave.boobs < 300) {
						r += `${slave.slaveName}'s flat chest is covered in a sexy sheen of body oil.`;
					} else {
						r += `${slave.slaveName}'s ${adjNoun} are covered in a sexy sheen of body oil.`;
					}
					break;
				case "a toga":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s ${adjNoun} are too big to cover with ${his} toga, so ${he} leaves them hanging free.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName} is wearing ${his} toga so as to leave one ${slave.nipples} nipple bare.`;
					} else {
						r += `${slave.slaveName} is wearing ${his} toga so as to leave one breast bare.`;
					}
					break;
				case "a huipil":
					if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s ${noun} are so big that they pull up ${his} huipil uncomfortably high, so ${he} needs to fold it between them.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName}'s huipil rests on ${his} flat chest.`;
					} else {
						r += `${slave.slaveName} is wearing ${his} huipil which accentuates ${his} ${adjNoun}.`;
					}
					break;
				case "a slutty qipao":
					r += `${slave.slaveName}'s qipao `;
					if (slave.boobs > 12000) {
						r += `can't contain the immense size of ${his} ${adjNoun}, so ${he} wears a modified variant that lets ${his} ${noun} hang free.`;
					} else if (slave.boobs > 4000) {
						r += `barely covers ${his} ${adjNoun}, it strains to contain their absurd size. Breast flesh spills from any gap it can find.`;
					} else if (slave.boobs > 2000) {
						r += `demurely covers ${his} ${adjNoun}, though it cannot conceal their absurd size.`;
					} else if (slave.boobs < 300) {
						r += `demurely hugs ${his} flat chest.`;
					} else {
						r += `demurely covers ${his} ${adjNoun}.`;
					}
					break;
				case "uncomfortable straps":
					r += `${slave.slaveName}'s slave `;
					if (slave.boobs > 12000) {
						r += `outfit includes a network of straps to support ${his} ${adjNoun}, radiating outwards from the steel rings around ${his} nipples.`;
					} else if (slave.boobs > 2000) {
						r += `outfit has special straps for ${his} ${adjNoun}: one strap down the front of each with steel rings to let ${his} nipples through, and a strap around the base of each, painfully squeezing ${his} ${noun} out to make them seem even bigger.`;
					} else if (slave.boobs > 800) {
						r += `outfit's straining straps restrain the flesh of ${his} ${adjNoun} like a string bikini, with steel rings to let ${his} nipples through.`;
					} else if (slave.boobs < 300) {
						r += `outfit's straps pass over ${his} flat chest like a string bikini, with steel rings to let ${his} ${slave.nipples} nipples through.`;
					} else {
						r += `outfit's straps pass over ${his} ${adjNoun} like a string bikini, with steel rings to let ${his} nipples through.`;
					}
					break;
				case "shibari ropes":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${adjNoun} are restrained by ${V.showInches === 2 ? 'yards and yards' : 'meters and meters'} of rope.`;
					} else if (slave.boobs > 2000) {
						r += `${adjNoun} are tightly bound with rope, soft flesh pushing out from between them.`;
					} else if (slave.boobs < 300) {
						r += `flat chest is tightly bound with rope, drawing attention to ${his} flat chest.`;
					} else {
						r += `chest is tightly bound with rope.`;
					}
					break;
				case "restrictive latex":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 2000) {
						r += `${adjNoun} protrude through holes in ${his} latex suit, which are too small for them, painfully constricting ${him} and making them seem even bigger.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} protrude through holes in ${his} latex suit.`;
					} else if (slave.boobs < 300) {
						r += `${slave.nipples} nipples poke through holes in ${his} latex suit, since ${he} has nothing else protruding from ${his} chest.`;
					} else {
						r += `latex suit leaves ${his} chest bare.`;
					}
					break;
				case "attractive lingerie":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `lace bra cannot cover the whole breast; its cups are half-moon shaped, and designed to offer what support they can to the bottom of them. They have disappeared completely under the immense quantity of breast flesh.`;
					} else if (slave.boobs > 4000) {
						r += `lace bra cannot cover the whole breast; its cups are half-moon shaped, and designed to offer what support they can to the bottom of them.`;
					} else if (slave.boobs > 800) {
						r += `sturdy lace bra supports ${his} ${adjNoun}.`;
					} else if (slave.boobs < 300) {
						r += `pretty lace bra hugs ${his} flat chest.`;
					} else {
						r += `pretty lace bra accentuates ${his} ${adjNoun}.`;
					}
					break;
				case "kitty lingerie":
					r += `${slave.slaveName}'s lacy bra features a hole shaped liked a cat's head in the center of ${his} chest; `;
					if (slave.boobs > 12000) {
						r += `${his} ${adjNoun} have stretched ${his} bra to the point that the hole is unrecognizable as anything feline.`;
					} else if (slave.boobs > 4000) {
						r += `the size of ${his} ${adjNoun} severely stretches out the hole's shape.`;
					} else if (slave.boobs > 800) {
						r += `the size of ${his} ${adjNoun} stretches out the hole's shape.`;
					} else if (slave.boobs < 300) {
						r += `it lies flat against ${his} body.`;
					} else {
						r += `the hole lies directly over ${his} cleavage.`;
					}
					break;
				case "a succubus outfit":
					r += `${slave.slaveName}'s corset ends just below ${his} ${slave.boobs < 300 ? 'non-existent' : ''} breasts, leaving them bare.`;
					if (slave.boobs > 2000) {
						r += ` It hugs ${his} tightly and comes up to right under where they start, forcing them to spill over and hide its upper half.`;
					} else if (slave.boobs > 400) {
						r += ` It hugs ${his} tightly and comes up to right under where they start, presenting them like a push-up bra.`;
					}
					break;
				case "a slutty maid outfit":
					r += `${slave.slaveName}'s maid dress stops below ${his} ${slave.boobs < 300 ? 'non-existent' : ''} breasts, but the outfit includes a thin white blouse`;
					if (slave.boobs > 4000) {
						r += ` that fails to even come close to covering ${his} ${adjNoun}.`;
					} else if (slave.boobs > 2000) {
						r += ` that covers them to just over ${his} nipples when ${he} pulls it up over them. It's pulled down by ${his} ${adjNoun} whenever ${he} moves.`;
					} else if (slave.boobs > 800) {
						r += ` that covers them to just over ${his} nipples, leaving a large area of deliciously unsupported and jiggling cleavage.`;
					} else if (slave.boobs < 300) {
						r += ` that hugs ${his} flat chest and lets ${his} ${slave.nipples} nipples protrude through the fabric.`;
					} else {
						r += ' to cover them.';
					}
					break;
				case "a nice maid outfit":
					r += `${slave.slaveName}'s maid dress front is almost conservative, covering ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ' with a tent-like billow of white fabric.';
					} else if (slave.boobs > 6000) {
						r += ' as best it can; it barely succeeds at its task, straining at the seams and allowing breast flesh to spill out of every available gap.';
					} else if (slave.boobs > 2000) {
						r += ', though it cannot conceal their enormous mass.';
					} else if (slave.boobs < 300) {
						r += `, though it does nothing to hide how flat ${he} is.`;
					} else {
						r += '.';
					}
					break;
				case "a fallen nuns habit":
					r += `${slave.slaveName}'s latex habit includes a half-corset`;
					if (slave.boobs > 20000) {
						r += `, but it's completely invisible, being hidden under ${his} ${adjNoun}.`;
					} else if (slave.boobs > 4000) {
						r += `, but only the bottom edge is visible: the rest is swallowed up under ${his} ${adjNoun}.`;
					} else if (slave.boobs > 800) {
						r += ` to force ${his} ${adjNoun} up and forward, forming a lot of cleavage even though they're bare.`;
					} else if (slave.boobs < 300) {
						r += ` that tightly hugs ${his} ${adjNoun}.`;
					} else {
						r += ` to force ${his} ${adjNoun} up and forward.`;
					}
					break;
				case "a chattel habit":
					r += `${slave.slaveName}'s chattel habit's scapular covers ${his} shoulders`;
					if (hasAnyArms(slave)) {
						r += ` and arm`;
						if (hasBothArms(slave)) {
							r += `s`;
						}
					}
					r += `, but is open in front, leaving ${his} `;
					if (slave.boobs > 4000) {
						r += `${noun} completely bare. It tucks into a golden belt, though this is buried under ${his} breasts.`;
					} else if (slave.boobs > 300) {
						r += `boobs completely bare. It tucks into a golden belt, which is cinched up right under ${his} ${adjNoun}.`;
					} else {
						r += `${adjNoun} completely bare. It tucks into a golden belt cinched around ${his} middle torso.`;
					}
					break;
				case "a penitent nuns habit":
					r += `If ${he} fails to hold ${his} torso totally still, the coarse cloth of ${his} top agonizingly scrapes across ${his} nipples, bare under ${his} habit.`;
					break;
				case "a string bikini":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s ${adjNoun} are so large that the little scraps of cloth intended for ${his} nipples can't really stay centered over them.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s ${adjNoun} constantly pull ${his} nipples out from under the tiny scrap of cloth that ${his} string bikini affords them.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} threaten to break out of ${his} straining string bikini top.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName}'s string bikini top barely covers anything, affording only a tiny scrap of cloth for each nipple; not that there is much else to cover on ${his} ${adjNoun}.`;
					} else {
						r += `${slave.slaveName}'s string bikini top barely covers anything, affording only a tiny scrap of cloth for each nipple.`;
					}
					break;
				case "a scalemail bikini":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s ${noun} are so large that it's a testament to ${his} scalemail top that it hasn't broken yet.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s ${adjNoun} constantly strain ${his} scalemail top.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s scalemail top contains ${his} ${adjNoun} well.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName}'s scalemail bikini top easily covers everything, as there is not much to cover on ${his} ${adjNoun}.`;
					} else {
						r += `${slave.slaveName}'s scalemail bikini top covers everything, while still flaunting it.`;
					}
					break;
				case "clubslut netting":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${adjNoun} hang out the holes they tore in ${his} clubslut netting.`;
					} else if (slave.boobs > 800) {
						r += `clubslut netting is stretched ${slave.boobs > 4000 ? 'to the breaking point' : ''} by ${his} ${adjNoun}.`;
					} else if (slave.boobs < 300) {
						r += `clubslut netting hugs ${his} ${adjNoun}.`;
					} else {
						r += `clubslut netting hugs ${his} ${adjNoun} tightly.`;
					}
					break;
				case "a cheerleader outfit":
					r += `${slave.slaveName}'s cheerleader top `;
					if (slave.boobs > 12000) {
						r += `can't support ${his} giant bust and is lost beneath ${his} ${adjNoun}.`;
					} else if (slave.boobs > 4000) {
						r += `is strongly engineered, but it can barely support ${his} ${adjNoun}.`;
					} else if (slave.boobs > 800) {
						r += `gives ${him} an acre of cleavage.`;
					} else if (slave.boobs < 300) {
						r += `tightly clings to ${his} flat chest, prominently displaying ${his} ${slave.nipples} nipples.`;
					} else {
						r += `does its best to make ${his} ${adjNoun} look bigger than they are.`;
					}
					break;
				case "cutoffs and a t-shirt":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${noun} are so huge that ${his} t-shirt rests pathetically atop their mass.`;
					} else if (slave.boobs > 4000) {
						r += `${noun} are so big that ${his} t-shirt barely comes down over ${his} nipples, leaving a lot of underboob hanging out.`;
					} else if (slave.boobs > 1200) {
						r += `t-shirt is held out and away from ${his} midriff by ${his} ${adjNoun}.`;
					} else if (slave.boobs < 300) {
						r += `t-shirt is tied across ${his} flat chest to bare ${his} midriff.`;
					} else {
						r += `t-shirt is tied up to bare ${his} midriff.`;
					}
					break;
				case "spats and a tank top":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 20000) {
						r += `tank top lies atop ${his} massive rack.`;
					} else if (slave.boobs > 12000) {
						r += `tank top just barely covers ${his} nipples despite its fairly large size.`;
					} else if (slave.boobs > 4000) {
						r += `tank top can never completely cover ${his} ${adjNoun}, giving varying amounts of underboob as ${he} moves about.`;
					} else if (slave.boobs > 1200) {
						r += `midriff is open to see as ${his} ${adjNoun} makes ${his} tank top ride up.`;
					} else {
						r += `tank top is tight against ${his} ${slave.boobs < 300 ? 'flat' : ''} chest.`;
					}
					break;
				case "a slutty outfit":
					r += `${slave.slaveName} `;
					if (slave.boobs > 12000) {
						r += `has given up trying to contain ${his} immense bust and is now choosing outfits that allow ${his} breasts to hang free.`;
					} else if (slave.boobs > 4000) {
						r += `has to be careful choosing slutty outfits that can restrain ${his} ${adjNoun}.`;
					} else if (slave.boobs > 800) {
						r += `has to be careful choosing slutty outfits that can handle ${his} ${adjNoun}.`;
					} else if (slave.boobs < 300) {
						r += `chooses slutty outfits that go well on a ${girl} with no tits.`;
					} else {
						r += `chooses slutty outfits that accentuate ${his} ${noun}.`;
					}
					break;
				case "a halter top dress":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s ${adjNoun} are far too big for ${his} dress to contain; instead it has been redesigned to allow them to hang freely.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s ${adjNoun} spill out from every available space in ${his} beautiful halter top dress.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s ${adjNoun} are bulging inside a beautiful halter top dress.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} are draped inside a beautiful halter top dress, making them the center of attention.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName} is wearing a beautiful silky halter top dress, almost as if it was sculpted to hug ${his} flat chest.`;
					} else {
						r += `${slave.slaveName} is wearing a beautiful silky halter top dress, almost as if it was sculpted to match ${his} frame.`;
					}
					break;
				case "an evening dress":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s ${adjNoun} could never fit inside ${his} dress; instead it has been redesigned to allow them to hang freely.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s ${adjNoun} are spilling out of ${his} sensual evening dress, threatening to burst free out with every ${hasBothLegs(slave) ? `step` : `movement`}.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s ${adjNoun} are pushed up and bulging out of ${his} sensual evening dress, giving ${him} a jaw-dropping amount of cleavage.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} are separated by a plunging neckline, displaying an ample amount of side boob for ${his} size.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName} sensual evening dress tastefully frames ${his} flat chest.`;
					} else {
						r += `${slave.slaveName} sensual evening dress tastefully frames ${his} chest.`;
					}
					break;
				case "a ball gown":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName} fabulous silken ball gown is designed to allow ${his} oversized breasts to hang free.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName} somehow managed to cram the immense mass of ${his} breasts inside a fabulous silken ball gown. They spill out of every available gap.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName} somehow managed to fit the enormous mass of ${his} breasts inside a fabulous silken ball gown.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s fabulous silken ball gown is carefully tailored, beautifully covering yet enhancing ${his} ${adjNoun}.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName}'s fabulous silken ball gown is carefully tailored, beautifully caressing ${his} flat chest.`;
					} else {
						r += `${slave.slaveName}'s draped inside a fabulous silken ball gown.`;
					}
					break;
				case "slutty business attire":
					r += `${slave.slaveName}'s suit jacket `;
					if (slave.boobs > 12000) {
						r += `and blouse are both open in front, leaving ${his} boobs bare, since there's no way ${he} could button ${his} clothes over ${his} ${adjNoun}.`;
					} else if (slave.boobs > 2000) {
						r += `is open in front, and ${his} straining blouse barely restrains ${his} ${adjNoun}.`;
					} else if (slave.boobs < 300) {
						r += `is open in front, tightly hugging ${his} flat chest and prominently displaying ${his} ${slave.nipples} nipples.`;
					} else {
						r += `is open in front, and ${his} blouse barely covers ${his} ${adjNoun}.`;
					}
					break;
				case "nice business attire":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `tits are so immense that ${his} specially tailored blouse and jacket are incapable of being buttoned up.`;
					} else if (slave.boobs > 4000) {
						r += `tits are so huge that they prevent ${his} jacket from closing. Every motion ${he} makes threatens to turn ${his} blouse buttons into ballistics.`;
					} else if (slave.boobs > 2000) {
						r += `tits are so big that they strain even ${his} specially tailored blouse and jacket.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} strain against ${his} tailored blouse and jacket.`;
					} else if (slave.boobs < 300) {
						r += `suit jacket is fitted tightly to ${his} flat chest.`;
					} else {
						r += `suit jacket conceals a flattering bra that lifts and presents ${his} bosom.`;
					}
					break;
				case "a comfortable bodysuit":
					if (slave.boobs < 300) {
						r += `${slave.slaveName}'s bodysuit is so tightly form-fitting that it clings to ${his} flat chest and prominently displays ${his} ${slave.nipples} nipples.`;
					} else {
						r += `${slave.slaveName}'s bodysuit is so tightly form-fitting that ${his} ${adjNoun} are individually hugged and supported by the material.`;
					}
					break;
				case "a latex catsuit":
					if (slave.boobs < 300) {
						r += `${slave.slaveName}'s latex catsuit fits ${him} like a second skin, showing off every detail of ${his} ${slave.nipples} nipples and distinct lack of breasts.`;
					} else {
						r += `${slave.slaveName}'s latex catsuit fits ${him} like a second skin, showing off every detail of ${his} nipples and ${adjNoun}.`;
					}
					break;
				case "a military uniform":
				case "a schutzstaffel uniform":
				case "a slutty schutzstaffel uniform":
				case "a mounty outfit":
				case "lederhosen":
				case "a red army uniform":
				case "a police uniform":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s tits are so immense that ${his} specially tailored shirt and tunic are incapable of being buttoned up.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s tits are so huge that they prevent ${his} tunic from closing. Every motion threatens to turn ${his} shirt buttons into shrapnel.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s tits are so big that they strain even ${his} specially tailored shirt and tunic.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} strain against ${his} tailored shirt and tunic.`;
					} else {
						r += `${slave.slaveName} cuts a dashing figure in ${his} tunic. ${slave.boobs < 300 ? `${His} ${App.Desc.boobBits.adjective(slave.boobs)} breasts are barely there.` : ''}`;
					}
					break;
				case "a confederate army uniform":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s tits are so immense that ${his} shirt and jacket cannot be buttoned.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s tits are so huge that ${his} military jacket threatens to burst at the seams.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s tits make a distracting bulge in ${his} military jacket, straining the top buttons.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} lend a feminine curve to ${his} military jacket.`;
					} else {
						r += `${slave.slaveName} cuts a dashing figure in ${his} military jacket. ${slave.boobs < 300 ? `${His} ${App.Desc.boobBits.adjective(slave.boobs)} breasts are hardly visible.` : ''}`;
					}
					break;
				case "a long qipao":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s tits are so immense that ${his} dress is on the verge of bursting open.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s tits are so huge that ${his} dress is on the verge of bursting open.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s ${adjNoun} are so big that they strain even ${his} dress greatly.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} strain against ${his} dress.`;
					} else {
						r += `${slave.slaveName} cuts a dashing figure in ${his} dress. ${slave.boobs < 300 ? `${His} ${App.Desc.boobBits.adjective(slave.boobs)} breasts are barely there.` : ''}`;
					}
					break;
				case "battlearmor":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s tits are so immense that ${his} armor is on the verge of bursting open.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s tits are so huge that ${his} armor is on the verge of bursting open.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s tits are so big that they strain even ${his} armor greatly.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} strain against ${his} armor.`;
					} else {
						r += `${slave.slaveName} cuts a dashing figure in ${his} armor. ${slave.boobs < 300 ? `${His} ${App.Desc.boobBits.adjective(slave.boobs)} breasts are barely there.` : ''}`;
					}
					break;
				case "Imperial Plate":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s massive tits create almost comical balloons at the front of ${his} ultra-heavy armor, undeniably gargantuan even underneath the tank-like armor.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s huge breasts each require an individual plate on ${his} ultra-heavy Imperial armor.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s fat boobs clearly swell against the front of ${his} ultra-heavy armor.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} create a noticeable swell at the front of ${his} ultra-heavy armor.`;
					} else {
						r += `${slave.slaveName}'s chest appears perfectly flat beneath ${his} ultra-heavy Imperial armor. ${slave.boobs < 400 ? `You can't even notice ${his} breasts, elegantly concealed by the massive plating.` : ''}`;
					}
					break;
				case "a dirndl":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s tits are so immense that ${his} dress is incapable of being laced up.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s tits are so huge that they prevent ${his} dress from being laced up.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s tits are so big that they strain ${his} dress.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} strain against ${his} dress.`;
					} else {
						r += `${slave.slaveName} cuts a dashing figure in ${his} dress. ${slave.boobs < 300 ? `${His} ${App.Desc.boobBits.adjective(slave.boobs)} breasts are barely there.` : ''}`;
					}
					break;
				case "a biyelgee costume":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s tits are so immense that ${his} dress is incapable of being buttoned up.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName}'s tits are so huge that they prevent ${his} dress from being buttoned up.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s tits are so big that they strain ${his} dress.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s ${adjNoun} strain against ${his} dress.`;
					} else {
						r += `${slave.slaveName} cuts a dashing figure in ${his} dress. ${slave.boobs < 300 ? `${His} ${App.Desc.boobBits.adjective(slave.boobs)} breasts are barely there.` : ''}`;
					}
					break;
				case "a nice nurse outfit":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${adjNoun} are too big for ${his} scrub top, it rests uselessly atop ${his} bust.`;
					} else if (slave.boobs > 4000) {
						r += `${adjNoun} strain against ${his} scrub top, it only manages to cover ${his} nipples.`;
					} else if (slave.boobs > 2000) {
						r += `${adjNoun} strain against ${his} scrub top, filling it out completely despite its utilitarian cut.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} nicely fill out ${his} scrub top, despite its utilitarian cut.`;
					} else if (slave.boobs < 300) {
						r += `scrub top tightly hugs ${his} flat chest.`;
					} else {
						r += `${adjNoun} are hidden beneath ${his} scrub top.`;
					}
					break;
				case "a mini dress":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `mini dress is pulled down to allow ${his} immense breasts to hang free.`;
					} else if (slave.boobs > 4000) {
						r += `${adjNoun} stretch ${his} custom tailored dress to its absolute limit.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} stretch ${his} dress taut, leaving nothing to the imagination.`;
					} else if (slave.boobs < 300) {
						r += `dress tightly hugs ${his} flat chest, prominently displaying ${his} ${slave.nipples} nipples though the fabric.`;
					} else {
						r += `${adjNoun} stretches taut against ${his} dress, leaving little to the imagination.`;
					}
					break;
				case "an apron":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `breasts are so immense that ${his} apron can barely contain them, and ${he} has to be careful not to expose one or both of ${his} ${slave.nipples} nipples as ${he} moves.`;
					} else if (slave.boobs > 4000) {
						r += `${adjNoun} fill out ${his} strained apron, occasionally leaving the sides of ${his} ${slave.nipples} nipples bare.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} fill out ${his} stretched apron, only just managing to fully cover ${his} ${slave.nipples} nipples.`;
					} else if (slave.boobs < 300) {
						r += `apron lies flatly against ${his} small chest and ${slave.nipples} nipples.`;
					} else {
						r += `${adjNoun} fill out ${his} apron, which is strategically worn to cover ${his} ${slave.nipples} nipples.`;
					}
					break;
				case "overalls":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${adjNoun} are so immense that ${his} overalls can barely contain them, and ${he} has to be careful not to expose one or both of ${his} ${slave.nipples} nipples as ${he} moves.`;
					} else if (slave.boobs > 4000) {
						r += `${adjNoun} peek out from the sides of ${his} strained overalls, often exposing the sides of ${his} ${slave.nipples} nipples.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} fill out ${his} stretched overalls, only just managing to fully cover ${his} ${slave.nipples} nipples.`;
					} else if (slave.boobs < 300) {
						r += `overalls lie flatly against ${his} small chest and ${slave.nipples} nipples.`;
					} else {
						r += `overalls are filled out by ${his} ${adjNoun}, offering tantalizing views of their sides.`;
					}
					break;
				case "a leotard":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${adjNoun} are so big that even ${his} specially tailored leotard cannot really support them.`;
					} else if (slave.boobs > 2000) {
						r += `${adjNoun} stretch the spandex of ${his} leotard taut across their width.`;
					} else if (slave.boobs < 300) {
						r += `leotard tightly hugs ${his} ${adjNoun}, prominently displaying ${his} ${slave.nipples} nipples though the spandex.`;
					} else {
						r += `${adjNoun} is flattered by ${his} leotard.`;
					}
					break;
				case "a monokini":
					r += `The shoulder straps of ${slave.slaveName}'s monokini cross over in the center of ${his} chest, leaving the rest of ${his} ${adjNoun} totally bare.`;
					break;
				case "a cybersuit":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${adjNoun} stretch out the bodysuit so tightly that ${his} nipples are clearly visible.`;
					} else if (slave.boobs > 2000) {
						r += `${adjNoun} stretch out the bodysuit so tightly that ${his} nipples are nearly visible.`;
					} else if (slave.boobs < 300) {
						r += `${adjNoun} is hugged tightly by the bodysuit, ${his} nipples pushing against the material.`;
					} else {
						r += `${adjNoun} are hugged tightly by the bodysuit, ${his} nipples pushing against the material.`;
					}
					break;
				case "a tight Imperial bodysuit":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${adjNoun} stretch out the bodysuit massively, comically distending and warping your crest against the front.`;
					} else if (slave.boobs > 2000) {
						r += `${adjNoun} stretch out the bodysuit so tightly that ${his} nipples are nearly visible, poking out against your emblazoned crest.`;
					} else if (slave.boobs < 300) {
						r += `${adjNoun} is hugged tightly by the bodysuit, ${his} sloping against your emblazoned crest on the front.`;
					} else {
						r += `${adjNoun} are hugged tightly by the bodysuit, elegantly accentuating the noble design of your family crest emblazoned on the front.`;
					}
					break;
				case "a bunny outfit":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `${adjNoun} are so immense that ${his} teddy can't contain them; it's pulled down to allow them to hang free.`;
					} else if (slave.boobs > 6000) {
						r += `${adjNoun} are so huge that ${his} teddy conceals special stays to keep them from popping out at the slightest movement. Breast flesh massively overflows ${his} top.`;
					} else if (slave.boobs > 2000) {
						r += `${adjNoun} are so big that ${his} teddy conceals special stays to keep them from popping out at the slightest movement.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} are perpetually on the verge of spilling out of ${his} top.`;
					} else if (slave.boobs < 300) {
						r += `teddy tightly clings to ${his} flat chest somehow making ${him} look even flatter.`;
					} else {
						r += `teddy conceals cunning stays designed to make ${his} bosom look considerably bigger than it actually is.`;
					}
					break;
				case "attractive lingerie for a pregnant woman":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `top has been retailored to fit ${his} enormous bust. The ample breast flesh almost completely consumes ${his} silken lingerie. ${His} silken vest is barely visible behind ${his} massive tits.`;
					} else if (slave.boobs > 4000) {
						r += `${adjNoun} dwarf ${his} tiny top. It barely manages to cover ${his} nipples. ${His} silken vest is parted to either side of ${his} breasts.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} spill out from above and below ${his} tight top.`;
					} else if (slave.boobs < 300) {
						r += `top tightly clings to ${his} flat chest.`;
					} else {
						r += `top tightly clings to ${his} chest.`;
					}
					break;
				case "a maternity dress":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 12000) {
						r += `low cut dress can't contain ${his} ${adjNoun}, so ${he} keeps it pulled up just below ${his} bust.`;
					} else if (slave.boobs > 4000) {
						r += `low cut dress can barely conceal ${his} ${adjNoun}. They bulge over the top and create a deep valley of cleavage.`;
					} else if (slave.boobs > 1000) {
						r += `dress is low cut and reveals a large amount of cleavage.`;
					} else if (slave.boobs < 300) {
						r += `dress is low cut, tightly hugs ${his} flat chest and ends just above ${his} nipples.`;
					} else {
						r += `dress is low cut and ends just above ${his} nipples.`;
					}
					break;
				case "a courtesan dress":
					r += `${slave.slaveName}'s shoulderless dress includes a half-corset`;
					if (slave.boobs > 20000) {
						r += `, but it's completely forgotten under ${his} ${adjNoun} and bottomless cleavage.`;
					} else if (slave.boobs > 4000) {
						r += `, but it's barely noticeable under ${his} ${adjNoun} and impressive cleavage.`;
					} else if (slave.boobs > 800) {
						r += ` to force ${his} ${adjNoun} up and forward, forming a lot of cleavage.`;
					} else if (slave.boobs < 300) {
						r += ` that tightly hugs ${his} ${adjNoun}.`;
					} else {
						r += ` to force ${his} ${adjNoun} up and forward.`;
					}
					break;
				case "a bimbo outfit":
					r += `${slave.slaveName}'s undersized top leaves ${his} lacy bra entirely exposed`;
					if (slave.boobs > 10000) {
						r += ` and lends no support to the overtaxed undergarment in its struggles to contain ${his} bouncy behemoths.`;
					} else if (slave.boobs > 4000) {
						r += ` as it struggles to lend any support to ${his} heaving chest.`;
					} else if (slave.boobs > 1000) {
						r += ` as it tightly caresses ${his} ${adjNoun}.`;
					} else {
						r += `.`;
					}
					break;
				case "stretch pants and a crop-top":
					if (slave.boobs > 20000) {
						r += `${slave.slaveName} is wearing a massively oversized custom crop-top designed to handle ${his} monumental tits. Even so, it's stretched taut just struggling to cover ${his} nipples, causing acres of breast flesh to spill out from under and above it.`;
					} else if (slave.boobs > 10000) {
						r += `${slave.slaveName}'s oversized crop-top struggles to contain even half of ${his} ${adjNoun}, leaving plenty of underboob visible alongside with ${his} cleavage. Every motion risks a nipple popping free.`;
					} else if (slave.boobs > 8000) {
						r += `${slave.slaveName}'s oversized crop-top struggles to contain ${his} ${adjNoun}, leaving plenty of underboob visible alongside with ${his} cleavage.`;
					} else if (slave.boobs > 4000) {
						r += `${slave.slaveName} has swapped up to the largest crop-top available. Even so, it barely covers them and creates plenty of cleavage.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s crop-top struggles to contain ${his} ${adjNoun}, leaving plenty of underboob visible alongside with ${his} cleavage.`;
					} else if (slave.boobs > 800) {
						r += `${slave.slaveName}'s crop-top tightly hugs ${his} ${adjNoun} creating plenty of cleavage.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName}'s crop-top tightly clings to ${his} flat chest.`;
					} else {
						r += `${slave.slaveName}'s crop-top tightly hugs ${his} ${adjNoun}.`;
					}
					switch (slave.sexualFlaw) {
						case "neglectful":
							r += ' "All For You" ';
							break;
						case "cum addict":
							r += ' "Cum \'ere Sexy" ';
							break;
						case "anal addict":
							r += ' "Reach Around Back" ';
							break;
						case "attention whore":
							r += ' "Will Flash For Attention" ';
							break;
						case "breast growth":
							r += ' "Could Be Bigger" ';
							break;
						case "abusive":
							r += ' "Fondlers May Be Slapped" ';
							break;
						case "malicious":
							r += ' "Careful, I Bite" ';
							break;
						case "self hating":
							r += ' "Rough \'em Up" ';
							break;
						case "breeder":
							r += ' "Drink Deep" ';
							break;
						default:
							if (slave.fetishKnown === 1) {
								switch (slave.fetish) {
									case "submissive":
										r += ' "Take Me" ';
										break;
									case "cumslut":
										r += ' "Splash Zone" ';
										break;
									case "humiliation":
										r += ' "Flasher" ';
										break;
									case "buttslut":
										r += ' "Reach Around" ';
										break;
									case "boobs":
										r += ' "Your Hands Here" ';
										break;
									case "sadist":
										r += ' "Taste the Pain" ';
										break;
									case "masochist":
										r += ' "Be Rough" ';
										break;
									case "dom":
										r += ' "Queen Bitch" ';
										break;
									case "pregnancy":
										r += ' "Milk Me" ';
										break;
									case Fetish.MINDBROKEN:
										r += ' "Free Slut" ';
										break;
									default:
										r += ` ${App.Desc.inscrip(slave)} `;
										break;
								}
							} else {
								r += ` ${App.Desc.inscrip(slave)} `;
							}
					}
					r += `is written across ${his} chest in large, vibrant letters.`;
					break;
				case "harem gauze":
					r += `${slave.slaveName}'s harem girl outfit `;
					if (slave.boobs > 12000) {
						r += `lets ${his} ${adjNoun} rest beneath`;
					} else if (slave.boobs > 800) {
						r += `lets ${his} ${adjNoun} swing free beneath`;
					} else if (slave.boobs < 300) {
						r += `gently covers ${his} flat chest with`;
					} else {
						r += `only covers ${his} ${adjNoun} with`;
					}
					r += ` a thin film of gauze.`;
					break;
				case "a slutty nurse outfit":
					r += `${slave.slaveName}'s jacket `;
					if (slave.boobs > 4000) {
						r += `closes beneath ${his} ${adjNoun}, leaving almost everything visible.`;
					} else if (slave.boobs > 800) {
						r += `pushes ${his} ${adjNoun} together to form some great cleavage.`;
					} else if (slave.boobs < 300) {
						r += `tightly hugs ${his} flat chest, since it has no breasts to form cleavage with.`;
					} else {
						r += `pushes ${his} ${adjNoun} together to form as much cleavage as possible.`;
					}
					break;
				case "a schoolgirl outfit":
					r += `${slave.slaveName}'s `;
					if (slave.boobs > 4000) {
						r += `${adjNoun} are too big for ${his} blouse, so ${he}'s tied it under them; they're so huge that it's buried under them.`;
					} else if (slave.boobs > 800) {
						r += `${adjNoun} are too big for ${his} blouse, so ${he}'s tied it under them and left them totally bare.`;
					} else if (slave.boobs < 300) {
						r += `blouse tightly hugs ${his} flat chest.`;
					} else {
						r += `blouse only barely covers ${his} ${adjNoun}.`;
					}
					break;
				case "a kimono":
					r += `${slave.slaveName}'s kimono `;
					if (slave.boobs > 12000) {
						r += `can't cover ${his} ${adjNoun}, so ${he} leaves it hanging loose; allowing them to hang freely.`;
					} else if (slave.boobs > 4000) {
						r += `barely covers ${his} ${adjNoun}. It reveals most of ${his} chest, just covering the outer edges of ${his} breasts and their nipples.`;
					} else if (slave.boobs > 2000) {
						r += `demurely covers ${his} ${adjNoun}, though it cannot conceal their absurd size.`;
					} else if (slave.boobs < 300) {
						r += `demurely rests over ${his} ${adjNoun}.`;
					} else {
						r += `demurely covers ${his} ${adjNoun}.`;
					}
					break;
				case "battledress":
					if (slave.boobs > 12000) {
						r += `${slave.slaveName}'s ${adjNoun} are barely supported by a specially engineered, space-age sports bra.`;
					} else if (slave.boobs > 2000) {
						r += `${slave.slaveName}'s ${adjNoun} are supported by a specially engineered, space-age sports bra under ${his} tank top.`;
					} else if (slave.boobs < 300) {
						r += `${slave.slaveName} is flat as an ironing board; ${he} wears ${his} tank top without a bra underneath.`;
					} else {
						r += `${slave.slaveName}'s ${adjNoun} are supported by a sports bra under ${his} tank top.`;
					}
					break;
				case "slutty jewelry":
					r += `${slave.slaveName}'s bangles include a `;
					if (slave.boobs > 2000) {
						r += `thin chain that runs under ${his} ${adjNoun}, disappearing entirely.`;
					} else if (slave.boobs > 800) {
						r += `thin chain that runs under ${his} ${adjNoun}, appearing and disappearing enticingly when ${he} moves.`;
					} else if (slave.boobs < 300) {
						r += `thin chain that runs across ${his} ${adjNoun}.`;
					} else {
						r += `light chain that loops under ${his} ${adjNoun}.`;
					}
					break;
				case "a burqa":
					r += `${slave.slaveName}'s burqa entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a tube top and thong":
				case "a tube top":
				case "leather pants and a tube top":
					r += `${slave.slaveName}'s tube top entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a button-up shirt and panties":
				case "a button-up shirt":
				case "a t-shirt":
				case "a t-shirt and thong":
				case "a t-shirt and panties":
				case "sport shorts and a t-shirt":
				case "a t-shirt and jeans":
					r += `${slave.slaveName}'s shirt entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "an oversized t-shirt and boyshorts":
				case "an oversized t-shirt":
					r += `${slave.slaveName}'s over-sized shirt entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += `, the fabric easily stretches to cover ${his} expansive mounds of flesh.`;
					} else if (slave.boobs > 8000) {
						r += `, the fabric easily covers ${his} absurdly-sized breasts.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a thong":
				case "a skimpy loincloth":
				case "boyshorts":
				case "cutoffs":
				case "leather pants":
				case "panties":
				case "jeans":
				case "sport shorts":
				case "striped panties":
					if (slave.boobs < 300) {
						r += `${slave.slaveName}'s ${adjNoun} is completely bare.`;
					} else {
						r += `${slave.slaveName}'s ${adjNoun} are completely bare.`;
					}
					break;
				case "a tank-top":
				case "a tank-top and panties":
					r += `${slave.slaveName}'s tank-top entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a sweater":
				case "a sweater and cutoffs":
				case "a sweater and panties":
					r += `${slave.slaveName}'s sweater entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "leather pants and pasties":
				case "panties and pasties":
				case "pasties":
					r += `${slave.slaveName}'s breasts `;
					if (slave.boobs > 25000) {
						r += `are completely bare, save for the proportionally tiny pasties covering ${his} ${slave.nipples} nipples.`;
					} else {
						r += `are completely bare, save for the pasties covering ${his} ${slave.nipples} nipples.`;
					}
					break;
				case "a bra":
				case "a striped bra":
				case "a sports bra":
				case "sport shorts and a sports bra":
				case "striped underwear":
					r += `${slave.slaveName}'s bra entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a nice pony outfit":
				case "a slutty pony outfit":
					r += `${slave.slaveName}'s outfit entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a one-piece swimsuit":
					r += `${slave.slaveName}'s swimsuit entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a gothic lolita dress":
				case "a hanbok":
					r += `${slave.slaveName}'s blouse entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a hijab and abaya":
				case "a niqab and abaya":
					r += `${slave.slaveName}'s abaya entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a klan robe":
				case "a slutty klan robe":
					r += `${slave.slaveName}'s robe entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a hijab and blouse":
					r += `${slave.slaveName}'s two shirts entirely conceal ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. They have been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though they cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a burkini":
					r += `${slave.slaveName}'s bikini entirely conceals ${his} ${adjNoun}`;
					if (slave.boobs > 12000) {
						r += ', although the fabric struggles to ensure they are entirely covered.';
					} else if (slave.boobs > 8000) {
						r += `. It has been let out a great deal in order to cover the entirety of ${his} chest.`;
					} else if (slave.boobs > 4000) {
						r += `, though it cannot conceal their absurd size.`;
					} else {
						r += '.';
					}
					break;
				case "a Santa dress":
					r += `${slave.slaveName}'s red holiday dress is designed with a dangerously low neckline, which `;
					if (slave.boobs > 12000) {
						r += `${his} colossal breasts spill out of completely unheeded.`;
					} else if (slave.boobs > 4000) {
						r += `serves only to prop up ${his} massive, otherwise naked breasts.`;
					} else if (slave.boobs > 2000) {
						r += `lies at nipple-level on ${his} ${adjNoun}, leaving a decent portion of ${his} areolae uncovered.`;
					} else if (slave.boobs < 300) {
						r += `hangs lowly on ${his} ${adjNoun}, occasionally revealing one of ${his} nipples.`;
					} else {
						r += `accentuates ${his} cleavage, especially since it always appears to be slipping down ${his} body.`;
					}
			}
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function detailedInspection(slave) {
		const {he, his, him, He, His, himself} = getPronouns(slave);
		const potentialDesc = ((slave.natural.boobs > slave.boobs + 100) && (V.geneticMappingUpgrade === 2 || V.cheatMode !== 0) && V.showPotentialSizes === 1);

		function musclesTone(slave) {
			return slave.muscles > 95 ? 'shredded' : slave.muscles > 30 ? 'rippling' : 'toned';
		}

		function walkingAbility(slave) {
			if (!hasAnyLegs(slave)) {
				let r = `${he} might not be able to walk, if ${he} still had legs.`;
				if (potentialDesc) {
					if (V.showBoobCCs) {
						r += App.Desc.boobBits.format(` ${His} %NOUN are expected to grow as big as %VOLUME CCs each, filling %CUPs.`, slave.natural.boobs);
					} else {
						r += App.Desc.boobBits.format(` ${His} %NOUN are expected to grow as big as %CUPs.`, slave.natural.boobs);
					}
				}
				return r;
			} else if (slave.muscles >= 5) {
				let r = `${his} ${musclesTone(slave)} back muscles get a workout just from supporting them. If they grow any larger, ${he} may not be able to stand, let alone walk`;
				if (potentialDesc) {
					if (V.showBoobCCs) {
						r += App.Desc.boobBits.format(`; And they are expected to grow larger. Potentially as large as %VOLUME CCs each, filling %CUPs`, slave.natural.boobs);
					} else {
						r += App.Desc.boobBits.format(`; And they are expected to grow larger. Potentially as large as %CUPs`, slave.natural.boobs);
					}
				}
				r += ".";
				return r;
			} else {
				let r =  `${he} can barely stand. If they grow any larger, ${he} may not be able to walk`;
				if (potentialDesc) {
					if (V.showBoobCCs) {
						r += App.Desc.boobBits.format(`; And they are expected to grow larger. Potentially as large as %VOLUME CCs each, filling %CUPs`, slave.natural.boobs);
					} else {
						r += App.Desc.boobBits.format(`; And they are expected to grow larger. Potentially as large as %CUPs`, slave.natural.boobs);
					}
				}
				r += ".";
				return r;
			}
		}

		function movingAbility(slave) {
			if (!hasAnyLegs(slave)) {
				let r = `${he} might not be able to move at all, if ${he} still had legs.`;
				if (potentialDesc) {
					if (V.showBoobCCs) {
						r += App.Desc.boobBits.format(` ${His} %NOUN are expected to grow as big as %VOLUME CCs each, filling %CUPs.`, slave.natural.boobs);
					} else {
						r += App.Desc.boobBits.format(` ${His} %NOUN are expected to grow as big as %CUPs.`, slave.natural.boobs);
					}
				}
				return r;
			} else if (slave.muscles >= 5) {
				let r = `${his} ${musclesTone(slave)} muscles get a workout just from living with them. If they grow any larger, ${he} may not be able to move at all`;
				if (potentialDesc) {
					if (V.showBoobCCs) {
						r += App.Desc.boobBits.format(`; And they are expected to grow larger. Potentially as large as %VOLUME CCs each, filling %CUPs`, slave.natural.boobs);
					} else {
						r += App.Desc.boobBits.format(`; And they are expected to grow larger. Potentially as large as %CUPs`, slave.natural.boobs);
					}
				}
				r += ".";
				return r;
			} else {
				let r = `${he} can barely move ${himself}. If they grow any larger, ${he} may become completely immobilized`;
				if (potentialDesc) {
					if (V.showBoobCCs) {
						r += App.Desc.boobBits.format(`; And they are expected to grow larger. Potentially as large as %VOLUME CCs each, filling %CUPs`, slave.natural.boobs);
					} else {
						r += App.Desc.boobBits.format(`; And they are expected to grow larger. Potentially as large as %CUPs`, slave.natural.boobs);
					}
				}
				r += ".";
				return r;
			}
		}

		let r = `${His} `;
		if (slave.boobs < 300) {
			r += `${App.Desc.boobBits.adjective(slave.boobs)} breasts are practically non-existent`;
			if (potentialDesc) {
				r += ', but they could get as big as ';
				if (V.showBoobCCs) {
					r += App.Desc.boobBits.format("%VOLUME CCs each, filling %CUPs", slave.natural.boobs);
				} else {
					r += App.Desc.boobBits.format("%CUPs", slave.natural.boobs);
				}
			}
			r += '.';
		} else if (slave.boobs < 4700) {
			if (V.showBoobCCs) {
				r += App.Desc.boobBits.format("%ADJ %NOUN, %VOLUME CCs each, would fill %CUPs", slave.boobs);
			} else {
				r += App.Desc.boobBits.format("%ADJ %NOUN, would fill %CUPs", slave.boobs);
			}
			if (potentialDesc) {
				r += ' and they are expected to get as big as ';
				if (V.showBoobCCs) {
					r += App.Desc.boobBits.format("%VOLUME CCs each, filling %CUPs", slave.natural.boobs);
				} else {
					r += App.Desc.boobBits.format("%CUPs", slave.natural.boobs);
				}
			}
			r += '.';
		} else if (slave.boobs < 5000 + (slave.muscles * 20) && slave.physicalAge <= 3) {
			if (V.showBoobCCs) {
				r += App.Desc.boobBits.format("%ADJ %NOUN, %VOLUME CCs each, would fill %CUPs", slave.boobs);
			} else {
				r += App.Desc.boobBits.format("%ADJ %NOUN, would fill %CUPs", slave.boobs);
			}
			r += ` and are so large that ${walkingAbility(slave)}`;
		} else if (slave.boobs < 8500) {
			if (V.showBoobCCs) {
				r += App.Desc.boobBits.format("%ADJ %NOUN, %VOLUME CCs each, would fill %CUPs", slave.boobs);
			} else {
				r += App.Desc.boobBits.format("%ADJ %NOUN, would fill %CUPs", slave.boobs);
			}
			r += '.';
		} else if (slave.boobs < 10000 + (slave.muscles * 50) && slave.physicalAge <= 12) {
			r += `${App.Desc.boobBits.noun(slave.boobs, false)} have ${slave.boobsImplant / slave.boobs >= .50 ? 'been altered' : 'grown'} past pretense of proportion. `;
			if (V.showBoobCCs) {
				r += `At ${num(slave.boobs)} CCs each, they`;
			} else {
				r += 'They';
			}
			r += ` are so large that ${walkingAbility(slave)}`;
		} else if (slave.boobs < 25000 + (slave.muscles * 20) && slave.physicalAge <= 3) {
			r += `${App.Desc.boobBits.noun(slave.boobs, false)} have ${slave.boobsImplant / slave.boobs >= .50 ? 'been altered' : 'grown'} past any pretense of proportion. `;
			if (V.showBoobCCs) {
				r += `At ${num(slave.boobs)} CCs each, they`;
			} else {
				r += 'They';
			}
			r += ` are so large that ${movingAbility(slave)}`;
		} else if (slave.boobs < 25000 + (slave.muscles * 100) && slave.physicalAge < 18 && slave.physicalAge >= 13) {
			r += `${App.Desc.boobBits.noun(slave.boobs, false)} have ${slave.boobsImplant / slave.boobs >= .50 ? 'been altered' : 'grown'} past any pretense of proportion. `;
			if (V.showBoobCCs) {
				r += `At ${num(slave.boobs)} CCs each, they`;
			} else {
				r += 'They';
			}
			r += ` are so large that ${walkingAbility(slave)}`;
		} else if (slave.boobs < 25000) {
			r += `${App.Desc.boobBits.noun(slave.boobs, false)}`;
			if (V.showBoobCCs) {
				r += `, at ${num(slave.boobs)} CCs each,`;
			}
			r += ` have ${slave.boobsImplant / slave.boobs >= .50 ? 'been altered' : 'grown'} past any pretense of proportion. `;
		} else if (slave.boobs < 40000 + (slave.muscles * 200) && slave.physicalAge >= 18) {
			r += App.Desc.boobBits.noun(slave.boobs, false);
			if (V.showBoobCCs) {
				r += `, ${num(slave.boobs)} CCs each,`;
			}
			r += ` are so large that ${walkingAbility(slave)}`;
		} else {
			r += App.Desc.boobBits.noun(slave.boobs, false);
			if (V.showBoobCCs) {
				r += `, ${num(slave.boobs)} CCs each,`;
			}
			if (isAmputee(slave)) {
				r += ` are so immense it is safer to leave ${him} resting atop them. ${His} udders each weigh more than twice the rest of ${his} body, since ${his} body consists of nothing but ${his} head, torso, and breasts.`;
			} else {
				r += ` are so gargantuan that they effectively immobilize ${him}. ${He}'s most comfortable lying down.`;
			}
		}
		return r;
	}
}();

/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} descType
 * @returns {string}
 */
App.Desc.boobsExtra = function(slave, descType) {
	const thisArcology = V.arcologies[0];
	const {he, his, him, He, His, girl, himself} = getPronouns(slave);

	function penthouseAccessibility() {
		let rt = '';
		if (V.boobAccessibility === 1) {
			rt = `Fortunately for ${him}, the penthouse is adapted for daily life with a bosom`;
		} else {
			rt = `${He}`;
			if (descType === DescType.MARKET) {
				rt += `'ll have`;
			} else {
				rt += ` has`;
			}
			rt += ` trouble living in your penthouse, which is not designed for ${girl}s with chests`;
		}
		rt += ' wider than a standard doorway.';
		return rt;
	}

	/**
	 * @param {slaveTestCallback} dairyTest
	 * @returns {string}
	 */
	function walkingRestrictions(dairyTest) {
		let r = '';
		if (slave.muscles > 95) {
			r += `However, ${he} is so powerfully built that ${he} can manage to support them using only ${his} rippling back muscles.`;
		} else if (slave.muscles > 50) {
			r += `However, ${he} is so buff ${he} can manage it with effort, using ${his} `;
			if (hasBothArms(slave)) {
				r += `arms`;
			} else if (hasAnyArms(slave)) {
				r += `arm`;
			} else {
				r += `strong back muscles`;
			}
			r += ` to support them.`;
		} else if (slave.muscles > 30) {
			r += `${He} can barely manage to get to ${his} feet unaided, and usually walks `;
			if (hasAnyArms(slave)) {
				if (hasBothArms(slave)) {
					r += `with ${his} arms crossed under ${his} tits`;
				} else {
					r += `with ${his} arm placed under ${his} tits`;
				}
				r += ` to help take their weight.`;
			} else {
				r += `hunched over due to the weight of ${his} tits.`;
			}
		} else if (slave.muscles > 5) {
			r += `${He} requires assistance to get to ${his} feet, and`;
			if (slave.rules.mobility === "permissive") {
				r += ` uses a stand to support them when ${he} must remain upright for more than a short time.`;
			} else {
				r += ` has to make use of walls and objects to support ${himself} or risk falling under their weight.`;
			}
		} else if ((slave.assignment === App.Data.Facilities.dairy.jobs.cow.assignment) && (V.dairyRestraintsSetting > 1) && (dairyTest(slave))) {
			r += `The straps that secure ${him} to the milking machine have become less necessary since ${his} breasts grew to the point where they pin ${him} to it.`;
		} else {
			r += `${He} cannot get to ${his} feet unaided, and`;
			if (slave.rules.mobility === "permissive") {
				r += ` uses a wheeled stand to support ${his} boobs when ${he} must walk or remain upright.`;
			} else {
				r += ` has to make use of walls and objects to support ${himself} and remain upright.`;
			}
		}
		return r;
	}

	/**
	 * @param {slaveTestCallback} dairyTest
	 * @returns {string}
	 */
	function movingRestrictions(dairyTest) {
		let r = '';
		if (slave.muscles > 95) {
			r += `However, ${he} is so powerfully built that ${he} can crawl with them using ${his} intense musculature.`;
		} else if (slave.muscles > 50) {
			r += `However, ${he} is so buff ${he} can manage to crawl with them, using ${his} strong muscles to carry their weight.`;
		} else if (slave.muscles > 30) {
			r += `${He} can barely manage to lift them off the ground, but ${his} toned body allows ${him} to retain some semblance of mobility.`;
		} else if (slave.muscles > 5) {
			r += `${He} requires assistance to lift them, and has little choice but to drag them along the ground should ${he} want to move someplace.`;
		} else if ((slave.assignment === App.Data.Facilities.dairy.jobs.cow.assignment) && (V.dairyRestraintsSetting > 1) && (dairyTest(slave))) {
			r += `The straps that secure ${him} to the milking machine have become less necessary since ${his} breasts grew to the point where they pin ${him} to it.`;
		} else {
			r += `${He} requires assistance to lift them and can barely manage to drag them along the ground.`;
		}
		return r;
	}

	/**
	 * @param {number} sizeLimit
	 * @param {number} bodySize
	 * @param {number} dwarfSize
	 * @param {slaveTestCallback} dairyTest
	 * @returns {string}
	 */
	function livingRestrictions(sizeLimit, bodySize, dwarfSize, dairyTest) {
		let res = [];
		if (slave.boobs > sizeLimit) {
			if (slave.fuckdoll > 0) {
				res.push(`The difficulties of having gigantic breasts are much reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
			} else {
				if (canWalk(slave)) {
					res.push(`${His} breasts are so heavy that it is difficult for ${him} to walk.`);
					res.push(walkingRestrictions(dairyTest));
				} else if (slave.boobs >= dwarfSize) {
					res.push(`They each dwarf ${him}, making ${him} mostly boob.`);
				} else if (slave.boobs >= bodySize) {
					res.push(`They each are easily as big as ${him}, making ${him} mostly boob.`);
				} else {
					res.push(`Together they are nearly the same size as ${his} torso, making ${him} about half boob.`);
				}
				if (canMove(slave) && !canWalk(slave)) {
					res.push(`${His} breasts are so heavy that it is difficult for ${him} to move at all.`);
					res.push(movingRestrictions(dairyTest));
				}
				if (slave.boobs >= 25000) {
					if ((slave.assignment !== App.Data.Facilities.dairy.jobs.cow.assignment) || (V.dairyRestraintsSetting < 2)) {
						res.push(penthouseAccessibility());
					}
				}
			}
		}
		return res.join(' ');
	}

	let r = [];
	if (thisArcology.FSGenderFundamentalistLawBeauty + thisArcology.FSGenderRadicalistLawBeauty > 0) {
		if (slave.boobs > 12000) {
			r.push("They're so large that the fashionable feminine ideal is a bad joke here.");
		} else if (FutureSocieties.isActive('FSAssetExpansionist', thisArcology)) {
			if (slave.boobs > 4300) {
				r.push("They're too big for the fashionable feminine ideal.");
			} else if (slave.boobs >= 1600) {
				r.push("They're bigger than expected for the fashionable feminine ideal, but given the average bust size in your arcology, it's not a surprise.");
			} else {
				r.push("They're too small for the fashionable feminine ideal.");
			}
		} else if (slave.boobs > 800) {
			r.push("They're too big for the fashionable feminine ideal.");
		} else if (slave.boobs < 500) {
			r.push("They're too small for the fashionable feminine ideal.");
		}
	} else if (thisArcology.FSSlimnessEnthusiastLaw === 1) {
		if (slave.boobs >= 300) {
			r.push("They're way too existent for the fashionable feminine ideal.");
		}
	} else if (thisArcology.FSHedonisticDecadenceLaw2 === 1) {
		if (slave.boobs < 2000) {
			r.push("They're too small for the fashionable feminine ideal.");
		}
	}

	// trouble moving, same size as body, dwarfs body, pins to milker
	if (slave.physicalAge <= 3) {
		r.push(livingRestrictions(4000, 10000, 40000, s => s.boobs > 5100 + (s.muscles * 20)));
	} else if (slave.physicalAge <= 12) {
		r.push(livingRestrictions(8000, 20000, 100000, s => s.boobs > 11000 + (s.muscles * 50)));
	} else if (slave.physicalAge < 18) {
		r.push(livingRestrictions(15000, 30000, 250000, s => s.boobs > 26000 + (s.muscles * 100)));
	} else { // slave.physicalAge >= 18
		r.push(livingRestrictions(25000, 40000, 500000, s => s.boobs > 45000 + (s.muscles * 200)));
	}

	if (slave.fuckdoll === 0) {
		if (slave.markings === "heavily freckled") {
			if (slave.boobs > 2000) {
				r.push(`They're covered in freckles, though ${his} tits are so big that the freckles are spaced widely across the breadth of each boob.`);
			} else if (slave.boobs > 250) {
				r.push(`They're covered in freckles, which are particularly dense in the cleft between them.`);
			} else {
				r.push(`${His} chest is covered in dense freckles.`);
			}
		} else if (slave.markings === "freckles") {
			if (slave.boobs > 250) {
				r.push(`The tops of ${his} breasts and ${his} cleavage are lightly freckled.`);
			} else {
				r.push(`${His} chest is covered in a light spray of freckles.`);
			}
		}
	}
	return r.join(' ');
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} descType
 * @returns {string}
 */
App.Desc.nipples = function(slave, descType) {
	const {he, him, his, He, His} = getPronouns(slave);
	const nipColor = nippleColor(slave);

	let r = '';
	if (slave.fuckdoll > 0) {
		if (slave.lactation > 0) {
			r += `${His} ${slave.nipples}, ${nipColor}, milky nipples protrude through holes in the suit, to allow drinking.`;
		} else {
			r += `${His} nipples are completely obscured.`;
		}
	} else if ((slave.assignment === App.Data.Facilities.dairy.jobs.cow.assignment) && (V.dairyRestraintsSetting > 1)) {
		r += `${His} `;
		switch (slave.nipples) {
			case "tiny":
				r += `tiny ${nipColor} nipples are too small for the milkers, and the suction is drawing a lot of boob in with them.`;
				break;
			case "flat":
				r += `flat ${nipColor} nipples give nothing for the milkers to catch, so it falls to the suction to keep the cups stuck to ${his} ${(slave.boobsImplant / slave.boobs) >= 0.90 ? "firm " : ""}breasts.`;
				break;
			case "puffy":
				r += `puffy ${nipColor} nipples form a good seal against the milkers' suction.`;
				break;
			case "partially inverted":
				r += `${nipColor}, partially inverted nipples are causing ${him} some discomfort as the milkers haul against them.`;
				break;
			case "inverted":
				r += `${nipColor}, inverted nipples are being kept painfully protruded by the milkers' powerful suction.`;
				break;
			case "huge":
				r += `huge ${nipColor} nipples fill the milkers completely.`;
				break;
			case "fuckable":
				r += `fuckable ${nipColor} nipples are filled by special milkers that extend into ${his} breasts.`;
				break;
			default:
				r += `${nipColor} nipples are being tugged at by the milkers' powerful suction.`;
		}
	} else {
		r += `${His} ${nipColor} nipples are `;
		if ((slave.aphrodisiacs > 0) || (slave.energy > 95) || slave.inflationType === "aphrodisiac") {
			switch (slave.nipples) {
				case "tiny":
					r += 'stiff little nubs.';
					break;
				case "flat":
					r += 'stiff bumps and anything but flat at the moment.';
					break;
				case "puffy":
					r += 'puffy and erect, the stiff flesh around each swelling outward to a pointy promontory.';
					break;
				case "partially inverted":
				case "inverted":
					r += `stiffly erect. They'd be inverted if ${he} weren't so aroused, but ${he}'s so horny they stay popped out.`;
					break;
				case "huge":
					if (slave.boobs - slave.boobsImplant > 7500) {
						r += `in proportion with ${his} breasts: they're stiffly erect and `;
						if ((slave.dick > 0) && (slave.dick < 3)) {
							r += `bigger than ${his} girlcock.`;
						} else if ((slave.height < 160) && hasAnyArms(slave)) {
							r += `almost as large as ${his} little `;
							if (hasBothArms(slave)) {
								r += `fists.`;
							} else {
								r += `fist.`;
							}
						} else {
							r += `large enough to be jerked off.`;
						}
					} else {
						r += `enormously erect.`;
					}
					break;
				case "fuckable":
					r += `swollen shut and leaking ${slave.milkFlavor === "none" ? `` : `${slave.milkFlavor}-flavored `}milk.`;
					break;
				default:
					r += 'stiffly erect.';
			}
		} else {
			switch (slave.nipples) {
				case "tiny":
					r += 'tiny little nubs.';
					break;
				case "flat":
					if (slave.piercing.nipple.weight !== 0) {
						r += "pulled flat from the constant tug of oversized implants. They are held back by piercings, preventing them from blending into the areolae.";
					} else {
						r += "pulled flat from the constant tug of oversized implants: when soft, they blend in with the areolae.";
					}
					break;
				case "puffy":
					r += 'puffy, the soft flesh around each swelling outward to a promontory.';
					break;
				case "partially inverted":
					if (slave.piercing.nipple.weight !== 0) {
						r += "partially inverted, or would be if they weren't pierced. The metal is holding them protruded, causing some discomfort.";
					} else {
						r += "partially inverted: when soft, they rest flush with the front of the breast.";
					}
					break;
				case "inverted":
					if (slave.piercing.nipple.weight !== 0) {
						r += "inverted, or would be if they weren't pierced. The metal is holding them protruded, to the slave's considerable discomfort.";
					} else {
						r += "inverted: they are completely swallowed by the surrounding breastflesh.";
					}
					break;
				case "huge":
					if (slave.boobs - slave.boobsImplant > 7500) {
						r += `in proportion with ${his} breasts: they've grown `;
						if ((slave.dick > 0) && (slave.dick < 3)) {
							r += `bigger than ${his} little girlcock.`;
						} else if ((slave.height < 160) && hasAnyArms(slave)) {
							r += `almost as large as ${his} little `;
							if (hasBothArms(slave)) {
								r += `fists.`;
							} else {
								r += `fist.`;
							}
						} else {
							r += `large enough to be jerked off.`;
						}
					} else if (hasAnyArms(slave)) {
						r += `the size of the last joint of ${his} thumb`;
						if (hasBothArms(slave)) {
							r += `s`;
						}
						r += ` when erect.`;
					} else {
						r += `of significant size.`;
					}
					break;
				case "fuckable":
					r += `completely inverted; they extend deep enough into ${his} breasts to be safely penetrated.`;
					break;
				default:
					r += "pretty normal.";
			}
		}
	}

	if (slave.fuckdoll === 0) {
		if (V.showClothing === 1 && descType !== DescType.MARKET) {
			switch (slave.clothes) {
				case "a monokini":
					r += ` Since ${he} is topless, they're plainly visible.`;
					break;
				default:
					if (!["fuckable", "inverted", "partially inverted", "tiny", "flat"].includes(slave.nipples)) {
						switch (slave.clothes) {
							case "cutoffs and a t-shirt":
								r += ` Since ${he} isn't wearing a bra, they tent the front of ${his} t-shirt.`;
								break;
							case "clubslut netting":
								r += ` They tent the front of ${his} netting.`;
								break;
							case "a courtesan dress":
								r += ` They clearly tent the thin material of ${his} dress.`;
								break;
							case "stretch pants and a crop-top":
								r += ` Since ${he} isn't wearing a bra, they tent the front of ${his} crop-top.`;
						}
					}
			}
		}
	}

	if (slave.lactation > 0) {
		if ((slave.assignment === App.Data.Facilities.dairy.jobs.cow.assignment) && (V.dairyRestraintsSetting > 1)) {
			r += ` The transparent lines coming off the cups attached to each of ${his} nipples are white with a constant stream of ${slave.milkFlavor === "none" ? `` : `${slave.milkFlavor}-flavored `}milk.`;
		} else if (slave.lactation === 1) {
			if (slave.boobs > 300) {
				if (slave.boobsMilk > 0) {
					r += ` ${His} breasts are painfully engorged with ${slave.milkFlavor === "none" ? `` : `${slave.milkFlavor}-flavored `}milk.`;
				} else {
					r += ` ${His} motherly breasts are full of ${slave.milkFlavor === "none" ? `` : `${slave.milkFlavor}-flavored `}milk.`;
				}
			} else {
				if (slave.boobsMilk > 0) {
					r += ` ${His} chest is painfully engorged with ${slave.milkFlavor === "none" ? `` : `${slave.milkFlavor} `}milk and leaks with the slightest provocation.`;
				} else {
					r += ` ${His} sensitive chest is swollen with ${slave.milkFlavor === "none" ? `` : `${slave.milkFlavor}-flavored `}milk.`;
				}
			}
		} else if (slave.fuckdoll > 0) {
			r += ` ${His} overworked, overfull breasts press its nipples through the holes mercilessly.`;
		} else {
			if (slave.nipples === "fuckable") {
				r += ` ${His} fuckable nipples prevent ${him} from releasing milk spontaneously. The lactation drugs are so powerful that if ${he} hasn't been milked in the past hour or so, the built-up pressure leaves ${him} ${!canTalk(slave) ? 'weeping' : 'whining'} piteously; makes for an interesting nipple fuck, however.`;
			} else if (slave.nipples === "inverted") {
				r += ` ${His} inverted nipples prevent ${him} from releasing milk spontaneously. The lactation drugs are so powerful that if ${he} hasn't been milked in the past hour or so, the built-up pressure leaves ${him} ${!canTalk(slave) ? 'weeping' : 'whining'} piteously.`;
			} else if (slave.energy > 95) {
				r += ` The powerful lactation drugs keep ${his} breasts so full of ${slave.milkFlavor === "none" ? `` : `${slave.milkFlavor}-flavored `}milk that when ${he} orgasms ${slave.balls > 0 ? `${he} releases three jets of white fluid: a stream of milk from each nipple and a squirt of cum from ${his} dickhead` : `${he} cums milk out of ${his} nipples`}.`;
			} else {
				r += ` The lactation drugs are so powerful that if ${he} hasn't been milked in the past hour or so, ${he} leaves ${slave.milkFlavor === "none" ? `a milky mess` : `a mess of ${slave.milkFlavor}-flavored milk`} wherever ${he} goes.`;
			}
		}
		if (slave.lactationAdaptation > 10) {
			if (slave.lactationAdaptation > 150) {
				r += ` ${He}'s produced such a vast amount of milk that ${his} body is now dedicated to copious production.`;
			} else if (slave.lactationAdaptation > 50) {
				r += ` ${He}'s given so much milk that ${his} body is now well-adapted to copious production.`;
			} else {
				r += ` ${His} body has become used to milk production.`;
			}
		}
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} descType
 * @returns {string}
 */
App.Desc.areola = function(slave, descType) {
	const {his, His, him} = getPronouns(slave);
	const nipColor = nippleColor(slave);

	let r = [];
	if (slave.fuckdoll === 0) {
		if (V.showBodyMods === 1) { // this seems wrong
			if (slave.piercing.areola.weight === 0) {
				switch (slave.areolae) {
					case 1:
						r.push(`${His} areolae form large, lovely circles of ${nipColor} skin around each nipple.`);
						break;
					case 2:
						r.push(`${His} areolae are unusually wide, eye-catching circles of ${nipColor} skin around each nipple.`);
						break;
					case 3:
						r.push(`${His} ${nipColor} areolae are unnaturally broad, covering much of the ${slave.boobShape === "saggy" ? 'bottom' : 'front'} of each breast.`);
						break;
					case 4:
						r.push(`${His} ${nipColor} areolae are unnaturally huge, almost entirely covering the ${slave.boobShape === "saggy" ? 'bottom' : 'front'} of each breast.`);
						break;
					default:
						r.push(`${His} ${slave.nipples} nipples are surrounded by a minimal ${nipColor} areolae.`);
				}
				if (slave.areolaeShape === "heart") {
					r.push(`${His} ${nipColor} areolae are heart-shaped, an obvious surgical alteration.`);
					if (slave.boobShape === "saggy") {
						r.push(`${His} motherly boobs point downward, though, leaving only the curved top of each heart visible.`);
					}
				} else if (slave.areolaeShape === "star") {
					r.push(`${His} ${nipColor} areolae are star-shaped, an obvious surgical alteration.`);
					if (slave.boobShape === "saggy") {
						r.push(`${His} motherly boobs point downward, though, leaving only the pointed top of each star visible.`);
					}
				} else if (slave.areolaeShape !== "circle") {
					r.push(`${His} ${nipColor} areolae are ${slave.areolaeShape}-shaped, an obvious surgical alteration.`);
					if (slave.boobShape === "saggy") {
						r.push(`${His} motherly boobs point downward, though, leaving only the top of each ${slave.areolaeShape} visible.`);
					}
				}
			} /* else {
				r.push(this.piercing.areola.weight(slave, pronouns));
			}*/
		}
		if (V.showClothing === 1 && descType !== DescType.MARKET) {
			if (slave.areolae > 1) {
				switch (slave.clothes) {
					case "a string bikini":
						r.push(`${His} string bikini covers only ${his} nipples, with the rest of ${his} areolae lewdly visible around them.`);
						break;
					case "slutty business attire":
						r.push(`The upper half of each of them is visible above the top of ${his} blouse.`);
						break;
					case "a cheerleader outfit":
					case "a bunny outfit":
						r.push('The upper half of each of them is visible.');
						break;
					case "a leotard":
						r.push(`The material of ${his} leotard is so thin and tight that not only are ${his} nipples obvious, the outline of ${his} areolae can be made out, too.`);
						break;
					case "a monokini":
						r.push(`As ${his} monokini leaves ${him} topless, ${his} areolae are naturally on public display.`);
						break;
				}
			}
		}
	}
	return r.join(' ');
};
