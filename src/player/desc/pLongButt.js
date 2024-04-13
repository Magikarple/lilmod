App.Desc.Player.butt = function(PC = V.PC) {
	const r = [];
	const implantRatio = PC.buttImplant / PC.butt;
	const implantType = PC.buttImplantType !== "normal" ? PC.buttImplantType : "";
	const {girlP} = getPronouns(PC).appendSuffix("P");

	function hips() {
		const r = [];

		r.push(`<span class="orange">`);
		if (PC.hips === -2) {
			r.push(`narrow`);
		} else if (PC.hips === -1) {
			r.push(`trim`);
		} else if (PC.hips === 0) {
			r.push(`ample`);
		} else if (PC.hips === 1) {
			r.push(`broad`);
		} else if (PC.hips === 2) {
			r.push(`child-bearing`);
		} else if (PC.hips === 3) {
			r.push(`brood-supporting`);
		}
		r.push(`hips</span>`);
		return r.join(" ");
	}

	function butt() {
		const r = [];
		const tinyImplants = implantRatio > 0 ? `A fraction of its size is from your ${implantType} implants, but they make up such a proportionally small percentage of its mass that they are unnoticeable outside of a thorough groping.` : "";

		if (PC.butt === 0) {
			r.push(`a <span class="orange">flat ass.</span>`);
		} else if (PC.butt <= 1) {
			r.push(`a <span class="orange">slim rear`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite clearly a pair of ${implantType} implants.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> it juts out farther than an ass of its size rightfully should, the consequence of having a pair of big ${implantType} implants crammed into it.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> anyone that feels it can tell it's filled out with ${implantType} implants, but at a glance you can't tell otherwise.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's already quite pert, so your small ${implantType} implants make it look a little fake when in motion.`);
			} else {
				r.push(r.pop() + `.</span>`);
			}
		} else if (PC.butt <= 2) {
			r.push(`a <span class="orange">small rear`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite clearly a pair of big ${implantType} implants.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> it juts out farther than an ass of its size rightfully should, the consequence of having a pair of big ${implantType} implants crammed into it.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> anyone that feels it can tell it's filled out with ${implantType} implants, but at a glance you can't tell otherwise.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's already quite pert, so your ${implantType} implants make it look a little fake when in motion.`);
			} else {
				r.push(r.pop() + `.</span>`);
				r.push(tinyImplants);
			}
		} else if (PC.butt <= 3) {
			r.push(`a <span class="orange">sexy, but normal, butt`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite clearly a pair of big ${implantType} implants.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> it juts out farther than an ass of its size should, the consequence of having a pair of big ${implantType} implants crammed into it.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> anyone that feels it can tell it's filled out with ${implantType} implants, but at a glance you can't tell otherwise.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's firmer than it should be, so your ${implantType} implants make it look fake when in motion.`);
			} else {
				r.push(r.pop() + `.</span>`);
				r.push(tinyImplants);
			}
		} else if (PC.butt <= 4) {
			r.push(`a <span class="orange">large butt`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite clearly a pair of ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants. No matter your position, it always looks artificially enticing.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> with your big ${implantType} implants, it juts out curvaceously no matter what pose you take.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> anyone that feels it can tell it's filled out with ${implantType} implants, but its not obvious otherwise.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's firmer than it should be, but it's hard to notice at a glance.`);
			} else {
				r.push(r.pop() + `.</span> It jiggles a little when you walk.`);
				r.push(tinyImplants);
			}
		} else if (PC.butt <= 5) {
			r.push(`a <span class="orange">huge butt`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite clearly a pair of ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants. No matter your position, it always looks artificially enticing.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> with your ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants, it juts out, firm and curvaceous, no matter what pose you take.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> with how firm and round it is, your ${implantType} implants are pretty obvious.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's firmer and more shapely than it should be, but your ${implantType} implants are pretty hard to notice under all the soft flesh.`);
			} else {
				r.push(r.pop() + `.</span> It jiggles a lot as you move.`);
				r.push(tinyImplants);
			}
		} else if (PC.butt <= 6) {
			r.push(`an <span class="orange">enormous butt`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite clearly a pair of ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants. No matter your position, it always looks artificially enticing, and there is no denying how alluring it looks filling out your clothing.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> with your ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants, it juts out, firm and curvaceous, no matter what pose you take, and fills your clothing out nicely.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> with how round and curvaceous it is, it's pretty obvious there's a pair of ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants buried beneath that soft flesh. Your clothing is filled out nicely by its size.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's far more shapely than an ass of its mass should be thanks to your ${implantType} implants. It jiggles attractively as you move and fills your clothing out nicely.`);
			} else {
				r.push(r.pop() + `.</span> It is always wobbling for some reason or another and really fills out your clothing.`);
				r.push(tinyImplants);
			}
		} else if (PC.butt <= 7) {
			r.push(`a <span class="orange">gigantic ass`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite clearly a pair of ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants. No matter your position, it always looks artificially enticing, and there is no denying how alluring it looks so tightly wrapped up in your clothing. If only you could still squeeze into spaces slightly narrower than yourself, however.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> with your ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants, it juts out, firm and curvaceous, no matter what pose you take. It's near impossible to properly fit into your clothing and a challenge to squeeze into anything narrower than yourself.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> with how firm and curvaceous it is, it's pretty obvious there's a pair of ${PC.buttImplantType === "string" ? "engorged" : "big"} ${implantType} implants buried beneath that softly jiggling flesh. It's near impossible to properly fit into your clothing and attempting to force it into a tight chair more often than not results in the chair following you when you stand up.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's a little more shapely than an ass of its mass should be thanks to your ${implantType} implants. It wobbles hypnotically as you move, is near impossible to properly fit into your clothing, and carries a risk of getting stuck in chairs.`);
			} else {
				r.push(r.pop() + `;</span> every motion sends ripples through its ample mass, it's near impossible to properly fit into your clothing, and you risk enveloping whatever you sit on.`);
				r.push(tinyImplants);
			}
		} else if (PC.butt <= 10) {
			r.push(`an <span class="orange">immense rear end`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite obviously a pair of ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants. No matter your position, it looks like someone shoved a pair of beachballs in your buttcheeks. Getting dressed, and having your clothing survive, has become a challenge; fitting into spaces narrower than yourself, a dream.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> with your ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants, it juts out, artificially enticing, no matter your position. Your clothing is in constant risk of tearing from its sheer size, and the notion of squeezing between anything narrower than yourself has been reduced to a dream.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> with how firm and curvaceous it is, it's pretty obvious there's a pair of ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants buried beneath that abundant flesh. It's impossible to properly fit into your clothing without spilling out or overflowing it, and a challenge to squeeze through anything narrower than yourself.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's a little more shapely than an ass of its sheer size should be thanks to your ${implantType} implants. It wobbles hypnotically when in motion, overflows or spills out of all your clothing, and practically consumes anything you sit on.`);
			} else {
				r.push(r.pop() + `.</span> It wobbles hypnotically when in motion, overflows or spills out of all your clothing, and practically consumes anything you sit on.`);
				r.push(tinyImplants);
			}
		} else if (PC.butt <= 14) {
			r.push(`an <span class="orange">inhumanly large rear`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite obviously a pair of ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants. No matter your position, it looks like someone shoved a pair of overinflated beachballs in your buttcheeks. You require custom clothing and can't fit anywhere narrower than yourself, but there is no denying its enticing sway when you move.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> with your ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants, it explodes outwards, artificially enticing, no matter your position. It sways hypnotically with your movements, requires custom clothing, and prevents you from squeezing into places narrower than yourself.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> it's surprisingly curvaceous for its size, so it's pretty obvious that there's a pair of ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants buried somewhere within. It jiggles hypnotically when in motion, requires custom clothing, and prevents you from squeezing into places narrower than yourself.`);
			} else if (implantRatio >= 0.25) {
				r.push(r.pop() + `;</span> it's a little more shapely than an ass of its sheer size should be thanks to your ${implantType} implants, but nobody can really tell. It wobbles hypnotically when in motion, requires custom clothing, and threatens to consume anything you sit on.`);
			} else {
				r.push(r.pop() + `.</span> It wobbles hypnotically when in motion, requires custom clothing, and threatens to consume anything you sit on.`);
				r.push(tinyImplants);
			}
		} else {
			r.push(`an <span class="orange">obscenely massive butt`);
			if (implantRatio >= 0.90) {
				r.push(`</span> that's quite obviously a pair of ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants. No matter your position, it looks like someone shoved a pair of ready-to-pop weather balloons in your buttcheeks. Since there is so little flesh surrounding them, they tightly follow your every move, making every motion an erotic one to any onlookers. Getting places, using furniture, and even wearing clothes are a struggle with it, but you wouldn't put up with it if you didn't like it.`);
			} else if (implantRatio >= 0.75) {
				r.push(r.pop() + `;</span> with your ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants, it explodes outwards, artificially enticing, no matter your position. Despite its size and weight, it still moves with you instead of staying at rest, giving your every motion an erotic sway. Getting places, using furniture, and even wearing clothes are a struggle with it, but you wouldn't put up with it if you didn't like it.`);
			} else if (implantRatio >= 0.50) {
				r.push(r.pop() + `;</span> it's surprisingly pert for its size, so the logical conclusion is that there's a pair of ${PC.buttImplantType === "string" ? "engorged" : "oversized"} ${implantType} implants supporting it from somewhere within. It's so expansive and heavy, motion doesn't translate well into it, leaving it rather inert no matter how you shift around it.`);
				if (canWalk(PC)) {
					r.push(`When walking, however, it jiggles and sways hypnotically with your every step.`);
				}
				r.push(`Getting places, using furniture, and even wearing clothes are a struggle with it, but you wouldn't put up with it if you didn't like it.`);
			} else {
				r.push(r.pop() + `.</span> It's so expansive and heavy, motion doesn't translate well into it, leaving it rather inert no matter how you shift around it.`);
				if (canWalk(PC)) {
					r.push(`When walking, however, it wobbles and sways hypnotically with your every step.`);
				}
				r.push(`Getting places, using furniture, and even wearing clothes are a struggle with it, but you wouldn't put up with it if you didn't like it.`);
				r.push(tinyImplants);
			}
		}
		return r.join(" ");
	}

	function proportion() {
		if (
			(PC.hips === -2 && PC.butt > 2) ||
			(PC.hips === -1 && PC.butt > 4) ||
			(PC.hips === 0 && PC.butt > 6) ||
			(PC.hips === 1 && PC.butt > 8) ||
			(PC.hips === 2 && PC.butt > 15)
		) {
			return `Your butt is disproportionately large for your hips and extends past them, allowing it to be seen on you from any angle.`;
		} else if (
			(PC.hips === 0 && PC.butt < 2) ||
			(PC.hips === 1 && PC.butt < 3) ||
			(PC.hips === 2 && PC.butt < 4) ||
			(PC.hips === 3 && PC.butt < 9)
		) {
			return `Your butt is disproportionately small for your hips, giving you an unbalanced, flattish figure when viewed from behind.`;
		}
	}

	function buttAccessibility() {
		const r = [];
		if (PC.butt > 15) {
			if (V.buttAccessibility === 1) {
				r.push(`It's a good thing you've had the penthouse remodeled for ${girlP}s with such ponderous bottoms already, so you can at least live comfortably at home.`);
			} else if (V.pregAccessibility === 1 || V.ballsAccessibility === 1 || V.boobAccessibility === 1) {
				r.push(`The halls and doors of the penthouse have already been remodeled to accommodate other enormous assets, so a ${girlP} with a ponderous bottom like yours can still get around.`);
			} else {
				r.push(`Even worse, the penthouse was not designed to handle ${girlP}s with bottoms as ponderous as yours; the narrow halls and doors give unbroken slaves an easy means to elude you.`);
				if (PC.buttImplant >= 30) {
					r.push(`Not that it matters when your ass implants are so huge they no longer fit through your bedroom door, <span class="red">leaving you trapped inside.</span>`);
				} else if (PC.buttImplant >= 28) {
					r.push(`And your bedroom door... Was it always this narrow?`);
				}
			}
		}
		return r.join(" ");
	}

	function weight() {
		const r = [];

		if ((PC.physicalAge <= 12 && PC.butt > 14) || PC.butt > 22) {
			r.push(`Your ass weighs so much you can no longer stand up on your own, and dragging it off your bed just ends with you on the floor. It makes a comfy cushion, at least.`);
			if (isMovable(PC)) {
				r.push(`When you do decide to go somewhere, you're reliant on an extra-wide wheelchair to get you there.`);
				r.push(buttAccessibility());
			}
		} else if ((PC.physicalAge <= 12 && PC.butt >= 12) || (PC.physicalAge > 12 && PC.butt > 17)) {
			r.push(`Your ass is so unwieldy and heavy that it makes moving around difficult.`);
			if (canWalk(PC)) {
				if (PC.muscles > 95) {
					if (hasBothProstheticLegs(PC)) {
						r.push(`Your prosthetic legs are sturdy enough to allow you to stand and walk normally, though it is definitely taking a toll on their anchor points.`);
					} else {
						r.push(`Your legs are so powerfully built that you can stand and walk normally, though it is definitely taking a toll on your knees.`);
					}
				} else if (PC.muscles > 30) {
					r.push(`Your legs are strong enough to support its weight, but it's still much more comfortable to remain seated; it's either time to work your quads harder or consider a reduction.`);
				} else {
					r.push(`It takes a lot of effort to not be forced into a sitting position with it, so you're most comfortable just letting it rest on something when you have the chance.`);
				}
				r.push(buttAccessibility());
			} else if (isMovable(PC)) {
				r.push(`But that's to be expected since you require an extra-wide wheelchair to get anywhere.`);
				r.push(buttAccessibility());
			} else {
				r.push(`But you couldn't do that anyway, so it's not a concern.`);
			}
		} else if (PC.butt > 6 && canWalk(PC)) {
			r.push(`Your ass is heavy enough to`);
			if (hasBothProstheticLegs(PC)) {
				r.push(`strain your limbs' anchor points,`);
			} else {
				r.push(`give your legs a serious workout,`);
			}
			r.push(`but the biggest nuisance is just how bulbous and awkwardly shaped it is.`);
			r.push(buttAccessibility());
		}
		return r.join(" ");
	}

	function anus() {
		const r = [];
		let skinDesc;
		if (skinToneLevel(PC.skin) < 13) {
			skinDesc = "pink";
		} else if (PC.anusTat === "bleached") {
			skinDesc = PC.skin;
		} else if (skinToneLevel(PC.skin) > 19) {
			skinDesc = "dark";
		} else {
			skinDesc = "darker";
		}
		let hands = hasBothArms(PC) ? "hands" : "hand";
		let analSkinDesc = either("crinkled", "puckered", "puffy");
		let hasHair = ((PC.pubicHStyle === "bushy" || PC.pubicHStyle === "very bushy") && (PC.pubertyXX > 0 || PC.pubertyXY > 0));
		let analArea = PC.analArea - PC.anus;

		if (PC.anus === 0) {
			r.push(`a <span class="lime">pristine, ${hasHair ? "but slightly hairy" : "untouched"} anus.</span>`);
		} else if (PC.anus === 1) {
			r.push(`a <span class="orange">tight`);
			if (analArea > 3) {
				r.push(`anus</span> surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from your tailbone all the way down to the`);
				if (PC.vagina > -1) {
					r.push(`bottom of your pussy.`);
				} else {
					r.push(`base of your cock.`);
				}
			} else if (analArea > 2) {
				r.push(`anus</span> surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that fills your entire buttcrack.`);
			} else if (analArea > 1) {
				r.push(`anus</span> surrounded by a big ring of ${analSkinDesc} ${skinDesc} skin.`);
			} else if (analArea > 0) {
				r.push(`anus</span> surrounded by a ring of ${skinDesc} skin.`);
			} else {
				r.push(`anus.</span>`);
			}
		} else if (PC.anus === 2) {
			r.push(`a <span class="orange">relaxed, experienced`);
			if (analArea > 2) {
				r.push(`anus</span> surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from your tailbone all the way down to the`);
				if (PC.vagina > -1) {
					r.push(`bottom of your pussy.`);
				} else {
					r.push(`base of your cock.`);
				}
			} else if (analArea > 1) {
				r.push(`anus</span> surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that fills your entire buttcrack.`);
			} else if (analArea > 0) {
				r.push(`anus</span> surrounded by a big ring of ${analSkinDesc} ${skinDesc} skin.`);
			} else {
				r.push(`anus.</span>`);
			}
		} else if (PC.anus === 3) {
			r.push(`a <span class="orange">loose, broken-in`);
			if (analArea > 1) {
				r.push(`anus</span> surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from your tailbone all the way down to the`);
				if (PC.vagina > -1) {
					r.push(`bottom of your pussy.`);
				} else {
					r.push(`base of your cock.`);
				}
			} else if (analArea > 0) {
				r.push(`anus</span> surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that fills your entire buttcrack.`);
			} else {
				r.push(`anus.</span>`);
			}
		} else {
			r.push(`a <span class="orange">gaping`);
			if (analArea > 0) {
				r.push(`anus</span> surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from your tailbone all the way down to the`);
				if (PC.vagina > -1) {
					r.push(`bottom of your pussy.`);
				} else {
					r.push(`base of your cock.`);
				}
			} else {
				r.push(`anus.</span>`);
			}
		}
		if (hasHair && PC.anus !== 0) {
			r.push(`It's surrounded by a fair amount of ${PC.pubicHColor} pubic hair.`);
		}
		if (PC.cervixImplant >= 2) {
			r.push(`You have a special pump in your anal cavity that converts fluids to inert filler for your abdominal implant. While it is intended to make anal sex more interesting, it has the unfortunate side-effect of requiring you to be on a special diet to prevent complications.`);
		}
		if (hasAnyArms(PC) && PC.mpreg === 1) {
			if (PC.belly >= 5000) {
				if (PC.bellyPreg >= 2000) {
					r.push(`You run your ${hands} across your pregnancy; it's pretty obvious that you have a womb, but what`);
				} else {
					r.push(`You run your ${hands} across your belly, coming to a stop over your womb. What`);
				}
			} else if (PC.weight > 30) {
				r.push(`You sink a hand into your soft middle, bringing it to rest over your womb. What`);
			} else {
				r.push(`You rest your hand over your womb. What`);
			}
			r.push(`makes this organ so special is that it is connected to your anus.`);
			if (PC.cervixImplant < 2) {
				r.push(`This does require you to be on a special diet , however, to avoid complications.`);
			}
			if (PC.wombImplant === "restraint") {
				r.push(`It's also reinforced to better support large`);
				if (PC.belly >= 400000) {
					r.push(`pregnancies, like yours, but lately it has begun to feel restrictive, almost as if it is strangling your womb.`);
				} else if (PC.bellyPreg >= 150000) {
					r.push(`pregnancies like yours.`);
				} else {
					r.push(`pregnancies.`);
				}
			}
			if (PC.geneMods.progenitor === 1) {
				r.push(`You've undergone gene therapy to better carry children.`);
				if (canGetPregnant(PC)) {
					r.push(`Your body is just wasting eggs at this point; menopause will be upon you before you realize it unless you get yourself pregnant.`);
				} else if (PC.preg > 0 && PC.pregKnown && V.dangerousPregnancy === 1) {
					r.push(`According to the data, it shouldn't be possible for you to prematurely give birth.`);
				}
			}
			if (PC.ovaImplant !== 0) {
				if (PC.wombImplant === "restraint") {
					r.push(`You ovaries are modified as well;`);
				} else {
					r.push(`In addition, your ovaries have been modified;`);
				}
				switch (PC.ovaImplant) {
					case "fertility":
						r.push(`a pair of implants have been attached to them in order increase the number of eggs released during ovulation.`);
						break;
					case "sympathy":
						r.push(`a pair of linked implants have been attached to them so that when one releases an egg the other does so as well.`);
						break;
					case "asexual":
						r.push(`one has been replaced with a fabricated sperm sack designed to automatically fertilize any eggs you release.`);
						if (PC.geneticQuirks.superfetation === 2 && (PC.preg > 10 || PC.counter.birthsTotal > 0)) {
							r.push(`This can be a bit of a nuisance, given your penchant for superfetation, as it keeps you in a state of perpetual pregnancy.`);
						}
						if (isFertile(PC)) {
							r.push(`You've been experiencing frequent spontaneous orgasms lately, which means it won't be long until you impregnate yourself${PC.counter.birthSelf > 0 ? " again" : ""}.`);
						}
						break;
				}
			}
		}

		return r.join(" ");
	}

	function freckles() {
		if (V.PC.markings === "freckles") {
			return `Your lower back is covered in a light speckling of freckles alongside your upper butt.`;
		} else if (V.PC.markings === "heavily freckled") {
			return `Your freckles are particularly dense across your lower back and upper butt.`;
		}
	}

	r.push(
		hips(),
		`and around back into`,
		butt(),
		proportion(),
		weight(),
		freckles(),
		`Nestled between your cheeks, you have`,
		anus()
	);

	return r.join(" ");
};
