App.Desc.Player.crotch = function(PC = V.PC) {
	const r = [];
	const {girlP} = getPronouns(PC).appendSuffix('P');
	const legs = hasBothLegs(PC) ? "legs" : "leg";
	const hands = hasBothArms(PC) ? "hands" : "hand";
	const isAroused = isHorny(PC);
	const virile = isVirile(PC);
	const cumTotal = cumLoad(PC);
	const foreskinRatio = (PC.foreskin - PC.dick);
	const bigBelly = (PC.belly >= 100000 || PC.weight > 130);
	let useConjunction = false;

	function pubicMound() {
		const r = [];
		const pubertyAge = Math.min(PC.pubertyAgeXX, PC.pubertyAgeXY);

		if ((PC.physicalAge < pubertyAge - 2 || ["bald", "hairless", "waxed"].includes(PC.pubicHStyle)) && (PC.prostate <= 1 || PC.belly >= 5000)) {
			r.push(`You have`);
		} else {
			r.push(`Beneath`);
			if (PC.prostate > 2 && PC.belly < 5000) {
				r.push(`the swell of your massive prostate`);
			} else if (PC.prostate > 1 && PC.belly < 5000) {
				r.push(`your bulging prostate`);
			}
			if (PC.physicalAge >= pubertyAge - 2 && !["bald", "hairless", "waxed"].includes(PC.pubicHStyle)) {
				if (PC.prostate > 1 && PC.belly < 5000) {
					r.push(`and`);
				}
				if (PC.physicalAge < pubertyAge - 1) {
					r.push(`your wispy pubic hair`);
				} else if (PC.physicalAge < pubertyAge) {
					r.push(`your small patch of ${PC.pubicHColor} pubic hair`);
				} else if (PC.pubicHStyle === "shaved") {
					r.push(`your ${PC.pubicHColor} stubble`);
				} else if (PC.pubicHStyle === "in a strip") {
					r.push(`your strip of ${PC.pubicHColor} pubic hair`);
				} else if (PC.pubicHStyle === "neat") {
					r.push(`your trimmed patch of ${PC.pubicHColor} pubic hair`);
				} else if (PC.pubicHStyle === "bushy" || PC.pubicHStyle === "bushy in the front and neat in the rear") {
					r.push(`your ${PC.pubicHColor} bush`);
				} else if (PC.pubicHStyle === "very bushy") {
					r.push(`your snail trail and adjacent forest of ${PC.pubicHColor} pubic hair`);
				}
			}
			r.push(r.pop() + `, you have`);
		}

		return r.join(" ");
	}

	function penis() {
		const r = [];

		r.push(`<span class="orange">`);
		if (PC.dick > 10) {
			r.push(`a mind-shattering penis,</span> fat, heavy, and enormous`);
			if (V.showDickCMs === 1) {
				r.push(r.pop() + `, that extends ${dickToEitherUnit(PC.dick)} from your body`);
			}
			if (V.seeCircumcision === 1 && PC.foreskin > 0) {
				r.push(r.pop() + `.`);
				r.push(foreskinDesc());
			}
		} else if (PC.dick === 10) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`a completely overwhelming erection`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span> a staggering ${dickToEitherUnit(PC.dick)} long,`);
				} else {
					r.push(`</span>`);
				}
				r.push(`that would likely spell the death of anyone you forced it into`);
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinErectDesc());
				} else if (bigBelly) {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				r.push(`an awe-inspiring penis,</span> dwarfing any normal cock on earth`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `, that hangs a good ${dickToEitherUnit(PC.dick)} from your body`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinDesc());
				}
			}
		} else if (PC.dick === 9) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`a truly monstrous erection`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span> ${dickToEitherUnit(PC.dick)} long,`);
				} else {
					r.push(`</span>`);
				}
				r.push(`that would split any hole you attempted to force it into`);
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinErectDesc());
				} else if (bigBelly) {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				r.push(`a monster of a penis,</span> more a work of art than a tool`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,`);
					if (canAchieveErection(PC)) {
						r.push(`that stands ${dickToEitherUnit(PC.dick)} long when fully erect`);
					} else {
						r.push(`that dangles around ${dickToEitherUnit(PC.dick)} from your body`);
					}
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinDesc());
				}
			}
		} else if (PC.dick === 8) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`a truly horrifying erection`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span> ${dickToEitherUnit(PC.dick)} long,`);
				} else {
					r.push(`</span>`);
				}
				r.push(`that has grown so large it can no longer fit in a slave without force`);
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinErectDesc());
				} else if (bigBelly) {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				r.push(`a truly imposing penis,</span> the obvious product of modern growth hormones`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,`);
					if (canAchieveErection(PC)) {
						r.push(`around ${dickToEitherUnit(PC.dick)} long when erect`);
					} else if (PC.dick > maxErectionSize(PC)) {
						r.push(`that swells to about ${dickToEitherUnit(PC.dick)} long when as hard as it can get`);
					} else {
						r.push(`that would stand around ${dickToEitherUnit(PC.dick)} long if you could get an erection`);
					}
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinDesc());
				}
			}
		} else if (PC.dick === 7) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`a frighteningly massive erection,</span> larger than any natural dick`);
				if (V.showDickCMs === 1) {
					r.push(`at ${dickToEitherUnit(PC.dick)} long`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinErectDesc());
				} else if (bigBelly) {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				r.push(`a massive penis,</span> larger than any natural dick`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,`);
					if (canAchieveErection(PC)) {
						r.push(`around ${dickToEitherUnit(PC.dick)} long when erect`);
					} else if (PC.dick > maxErectionSize(PC)) {
						r.push(`that stands around ${dickToEitherUnit(PC.dick)} long when as hard as it can get`);
					} else {
						r.push(`that would stand around ${dickToEitherUnit(PC.dick)} long if you could get an erection`);
					}
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinDesc());
				}
			}
		} else if (PC.dick === 6) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`an enormous, intimidating erection,</span> one among the world's largest dicks`);
				if (V.showDickCMs === 1) {
					r.push(`at ${dickToEitherUnit(PC.dick)} long`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinErectDesc());
				} else if (bigBelly) {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				r.push(`an enormous penis,</span> one among the world's largest dicks`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,`);
					if (canAchieveErection(PC)) {
						r.push(`around ${dickToEitherUnit(PC.dick)} long when erect`);
					} else if (PC.dick > maxErectionSize(PC)) {
						r.push(`that stands around ${dickToEitherUnit(PC.dick)} long when as hard as it can get`);
					} else {
						r.push(`that would stand around ${dickToEitherUnit(PC.dick)} long if you could get an erection`);
					}
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.`);
					r.push(foreskinDesc());
				}
			}
		} else if (PC.dick === 5) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`a huge, throbbing erection`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span> over ${dickToEitherUnit(PC.dick)} long`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.</span>`);
					r.push(foreskinErectDesc());
				} else if (bigBelly) {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				r.push(`a huge, dangling penis`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span>`);
					if (canAchieveErection(PC)) {
						r.push(`more than ${dickToEitherUnit(PC.dick)} long when erect`);
					} else if (PC.dick > maxErectionSize(PC)) {
						r.push(`that stands around ${dickToEitherUnit(PC.dick)} long when as hard as it can get`);
					} else {
						r.push(`that would stand around ${dickToEitherUnit(PC.dick)} long if you could get an erection`);
					}
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.</span>`);
					r.push(foreskinDesc());
				}
			}
		} else if (PC.dick === 4) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`an above average erection`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span> about ${dickToEitherUnit(PC.dick)} long`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.</span>`);
					r.push(foreskinErectDesc());
				} else if (bigBelly) {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				r.push(`an above average penis`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span>`);
					if (canAchieveErection(PC)) {
						r.push(`about ${dickToEitherUnit(PC.dick)} long when erect`);
					} else {
						r.push(`which would be around ${dickToEitherUnit(PC.dick)} long if you could get an erection`);
					}
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.</span>`);
					r.push(foreskinDesc());
				}
			}
		} else if (PC.dick === 3) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`an average-sized erection`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span> about ${dickToEitherUnit(PC.dick)} long`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.</span>`);
					r.push(foreskinErectDesc());
				} else if (bigBelly) {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				r.push(`an average-sized penis`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span>`);
					if (canAchieveErection(PC)) {
						r.push(`about ${dickToEitherUnit(PC.dick)} long when erect`);
					} else {
						r.push(`which would be around ${dickToEitherUnit(PC.dick)} long if you could get an erection`);
					}
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					r.push(r.pop() + `.</span>`);
					r.push(foreskinDesc());
				}
			}
		} else if (PC.dick === 2) {
			if (isAroused && canAchieveErection(PC)) {
				if ((PC.height <= Height.mean(PC) + 15) && PC.visualAge <= 13) {
					r.push(`a cute little erection`);
				} else {
					r.push(`an embarrassingly small erection`);
				}
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span> only ${dickToEitherUnit(PC.dick)} long`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					if (V.showDickCMs === 0) {
						r.push(`</span>`);
					}
					if (foreskinRatio > 1) {
						r.push(`buried deep in your foreskin.`);
					} else if (foreskinRatio === 1) {
						r.push(`hidden away by your foreskin.`);
					} else if (foreskinRatio === -1) {
						r.push(`that looks a little bigger than it really is due to how tight your foreskin is around it.`);
					} else {
						r.push(`just barely able to leave your foreskin.`);
					}
				} else {
					r.push(r.pop() + `.</span>`);
				}
			} else {
				if ((PC.height <= Height.mean(PC) + 15) && PC.visualAge <= 13) {
					r.push(`a cute little penis,</span>`);
				} else {
					r.push(`a small penis,</span>`);
				}
				if (V.showDickCMs === 1) {
					if (canAchieveErection(PC)) {
						r.push(`only ${dickToEitherUnit(PC.dick)} long when erect, and`);
					} else {
						r.push(`which would only be about ${dickToEitherUnit(PC.dick)} long if you could get hard, and`);
					}
				}
				if ((PC.height <= Height.mean(PC) + 15) && PC.visualAge <= 13) {
					r.push(`fitting for a non-threatening young ${girlP} like you.`);
				} else {
					r.push(`little enough to be a source of embarrassment to you.`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					if (foreskinRatio > 1) {
						r.push(`Your foreskin is far too large for it, and droops lamely off your cockhead.`);
					} else if (foreskinRatio === 1) {
						r.push(`Your foreskin is a bit too large for it, making it look smaller than it really is.`);
					} else if (foreskinRatio === -1) {
						r.push(`It completely fills your foreskin, so getting hard is slightly uncomfortable.`);
					} else {
						r.push(`It rests comfortably wrapped up in your foreskin.`);
					}
				}
			}
		} else if (PC.dick === 1) {
			if (isAroused && canAchieveErection(PC)) {
				r.push(`a completely humiliating little erection`);
				if (V.showDickCMs === 1) {
					r.push(r.pop() + `,</span> only ${dickToEitherUnit(PC.dick)} long,`);
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					if (V.showDickCMs === 0) {
						r.push(`</span>`);
					}
					if (foreskinRatio > 1) {
						r.push(`thoroughly hidden by your excessive foreskin.`);
					} else if (foreskinRatio === 1) {
						r.push(`that's too small to even leave your foreskin.`);
					} else {
						r.push(`that shyly peeks out from your foreskin.`);
					}
				}
			} else {
				r.push(`a humiliating little micropenis`);
				if (V.showDickCMs === 1) {
					if (canAchieveErection(PC)) {
						r.push(r.pop() + `,</span> only ${dickToEitherUnit(PC.dick)} long when hard,`);
					} else {
						r.push(r.pop() + `,</span> which would only be about ${dickToEitherUnit(PC.dick)} long when if it could get hard,`);
					}
				}
				if (V.seeCircumcision === 1 && PC.foreskin > 0) {
					if (V.showDickCMs === 0) {
						r.push(`</span>`);
					}
					if (foreskinRatio > 1) {
						r.push(`completely swallowed up by your excessive foreskin.`);
					} else if (foreskinRatio === 1) {
						r.push(`swallowed up by your foreskin.`);
					} else {
						r.push(`situated snugly in your foreskin.`);
					}
				}
			}
		}
		if (isAroused && canAchieveErection(PC) && PC.dick > 2 && bigBelly) {
			r.push(pushingBelly());
			r.push(dickWeight());
		} else if (PC.dick >= 10) {
			r.push(dickWeight());
		} else if (V.seeCircumcision === 0 || PC.foreskin === 0) { // skipping foreskin stuff, go straight into balls.
			if (V.showDickCMs === 1 && PC.dick > 2) {
				r.push(r.pop() + `,`);
			}
			r.push(`</span> and`);
			useConjunction = true;
		} else if (PC.scrotum === 0 && PC.vagina === -1) {
			r.push(r.pop() + `.`);
		}
		return r.join(" ");
	}

	function foreskinErectDesc() {
		const r = [];

		if (V.seeCircumcision === 1 && PC.foreskin > 0) {
			if (foreskinRatio > 1) {
				r.push(`Your foreskin is much too large for your dick and your erection can't retract it at all; it needs to be pulled back to properly have sex.`);
			} else if (foreskinRatio === 1) {
				r.push(`Your foreskin is too large for your dick, so your erection can't fully retract it.`);
			} else if (foreskinRatio === -1) {
				r.push(`Your foreskin is uncomfortably stretched by your erection.`);
			} else if (foreskinRatio < -1) {
				r.push(`Your foreskin is stretched thin by your erection, making arousal rather unpleasant.`);
			} else {
				r.push(`You're uncut, so your foreskin is completely retracted at the moment.`);
			}
		}
		return r.join(" ");
	}

	function foreskinDesc() {
		const r = [];

		if (V.seeCircumcision === 1 && PC.foreskin > 0) {
			if (foreskinRatio > 1) {
				r.push(`Your foreskin is far too large for it, with the excess skin drooping lamely off your cockhead.`);
			} else if (foreskinRatio === 1) {
				r.push(`Your foreskin is too large for it, with the excess skin making the tip of your dick look shriveled.`);
			} else if (foreskinRatio === -1) {
				r.push(`It is too large for your foreskin, leaving it uncomfortably tight around your cock.`);
			} else if (foreskinRatio < -1) {
				r.push(`It is much too large for your foreskin, with the part of your dickhead peeking out of the uncomfortably stretched skin an angry color from being squeezed so hard.`);
			} else {
				r.push(`It rests comfortably wrapped up in your foreskin.`);
			}
		}
		return r.join(" ");
	}

	function pushingBelly() {
		const r = [];

		if (PC.belly >= 100000) {
			r.push(`Your belly is so large it pushes against your erection, forcing it down and making it difficult to properly mount a girl.`);
		} else if (PC.belly >= 15000 && isPlayerFrigid()) {
			r.push(`Your belly is large enough that you can't properly reach your erection to masturbate, forcing you to have sex or find some other way to deal with it.`);
		} else {
			r.push(`Your gut is so huge and soft, your erection is forced to push a fold into it, inadvertently making you give yourself a bellyjob.`);
		}

		return r.join(" ");
	}

	function dickWeight() {
		const r = [];
		const dickLength = PC.dick * 6;

		if (
			(PC.dick >= 45 + (PC.muscles * 0.3) && PC.physicalAge <= 12) ||
			(PC.dick >= 68 + (PC.muscles * 0.4))
		) {
			r.push(`Your cock is a monolith of soft flesh and weighty enough that you can no longer realistically carry it without assistance.`);
			if (isMovable(PC)) {
				r.push(`You could drag it along behind you, but that would be painful, at the very least, so you have to resort to using a specialized cart pushed by a motorized wheelchair instead.`);
				r.push(dickAccessibility());
			}
		} else if (PC.dick >= 30) {
			r.push(`Your cock is so massive that it is difficult to live with. That's not really surprising, seeing as you have to`);
			if (canWalk(PC)) {
				if (dickLength > PC.height + 10) {
					r.push(`carry it over your shoulder, with most of its weight on your back.`);
				} else if (dickLength >= PC.height - 10) {
					r.push(`carry it slung over your shoulder.`);
				} else if (dickLength >= PC.height / 2) {
					r.push(`hug it in order to walk anywhere with it.`);
				} else {
					r.push(`awkwardly hold it to keep its head from dragging along the ground.`);
				}
			} else {
				r.push(`given that it's`);
				if (dickLength > PC.height + 10) {
					r.push(`longer than you are tall.`);
				} else if (dickLength >= PC.height - 10) {
					r.push(`about as long as you are tall.`);
				} else if (dickLength >= PC.height / 2) {
					r.push(`about about half your height.`);
				} else {
					r.push(`easily larger than your leg.`);
				}
			}
		} else if (PC.dick >= 20) { // 120cm ~4ft
			r.push(`Your cock is so massive that it is always in your way. Anything that involves it quickly turns into a logistical mess as you try to figure out just how to wrangle the unruly thing.`);
		} else if (PC.dick >= 10) { // 60cm ~2ft
			r.push(`Your cock is large enough to be a bit of a nuisance in your day-to-day affairs, and that's not counting the troubles with usability.`);
		}
		r.push(dickAccessibility());

		return r.join(" ");
	}

	function dickAccessibility() {
		const r = [];

		if (PC.dick >= 10) {
			if (V.dickAccessibility === 1) {
				r.push(`It's a good thing you've had the penthouse remodeled for ${girlP}s with enormous dongs, now at least you can relieve yourself without worry.`);
				if (PC.dick >= 100) {
					if (V.pregAccessibility === 1 || V.ballsAccessibility === 1 || V.boobAccessibility === 1 || V.buttAccessibility === 1) {
						r.push(`You didn't think it was possible, but odds are that, without the penthouse remodeling, you wouldn't be able to drag your dick out of your bedroom.`);
					} else {
						r.push(`Or it would be, if the remodel had included doorway and hall expansions at all. You are <span class="red">currently trapped in your bedroom</span> due to the inability to feed the entire mass of your dick out of it.`);
					}
				}
			} else {
				r.push(`Even worse, the penthouse was not designed to handle ${girlP}s with dongs as extensive as yours; it's best not to think about the troubles you have when nature calls.`);
				if (PC.dick >= 100) {
					if (V.pregAccessibility === 1 || V.ballsAccessibility === 1 || V.boobAccessibility === 1 || V.buttAccessibility === 1) {
						r.push(`At the very least, you don't have to worry about getting stuck in your room with it due to the penthouse remodels.`);
					} else {
						r.push(`You didn't think it possible, but your dick is so massive you can no longer push it through the doorway and out into the hall, <span class="red">leaving you trapped in your room.</span>`);
					}
				}
			}
		}

		return r.join(" ");
	}

	function balls() {
		const r = [];
		const ballSize = (V.showDickCMs === 1 ? ` about ${ballsToEitherUnit(PC.balls)} long,` : "");

		if (!useConjunction) {
			if (PC.dick > 0) {
				r.push(`Complementing it, you have`);
			} else {
				r.push(`You have`);
			}
		}
		r.push(`a pair of<span class="orange">`);
		if (PC.balls >= 30) {
			r.push(`inhumanly monstrous, hypertrophied balls`);
		} else if (PC.balls >= 14) {
			r.push(`inhumanly enormous, heavy balls`);
		} else if (PC.balls >= 10) {
			r.push(`inhumanly large balls`);
		} else if (PC.balls === 9) {
			r.push(`titanic balls`);
		} else if (PC.balls === 8) {
			r.push(`gigantic balls`);
		} else if (PC.balls === 7) {
			r.push(`monstrous balls`);
		} else if (PC.balls === 6) {
			r.push(`enormous balls`);
		} else if (PC.balls === 5) {
			r.push(`huge balls`);
		} else if (PC.balls === 4) {
			r.push(`big, uneventful balls`);
		} else if (PC.balls === 3) {
			r.push(`normal, uneventful balls`);
		} else if (PC.balls === 2) {
			r.push(`rather small balls`);
		} else if (PC.balls === 1) {
			r.push(`tiny balls</span> so small they have retracted up into your abdomen.`);
		}
		if (PC.balls > 1) {
			if (PC.dick === 0) {
				r.push(r.pop() + `,</span>${ballSize} but lack a dick to go with them, leaving only a little hole at their base.`);
			} else if (V.showDickCMs === 1 && PC.balls > 1) {
				r.push(r.pop() + `,</span> about ${ballsToEitherUnit(PC.balls)} long.`);
			} else {
				r.push(r.pop() + `.</span>`);
			}
		}
		r.push(
			ballThoughts(),
			scrotumDesc()
		);
		if (virile) {
			if (PC.geneMods.livestock === 1) {
				r.push(`Your loads are thick and enormous thanks to your gene therapy.`);
				if (PC.geneMods.aggressiveSperm === 1) {
					r.push(`It's also really difficult to shoot it all out.`);
					if (canGetPregnant(PC) && canImpreg(PC, PC) && (PC.mpreg === 1 || PC.vagina >= 0) && V.seePreg) {
						r.push(`You have to be mindful of where your loads land too; one bad angle is all it would take for your belly to start rounding out with your own child.`);
					}
				}
			} else if (PC.geneMods.aggressiveSperm === 1) {
				r.push(`Your gene therapy has reduced the density of your loads, but the volume of it slowly working through your urethra feels magical.`);
				if (canGetPregnant(PC) && canImpreg(PC, PC) && (PC.mpreg === 1 || PC.vagina >= 0) && V.seePreg) {
					r.push(`You have to be mindful of where your loads go, however, as one bad shot is all it would take for your belly to start rounding out with your own child.`);
				}
			}
		}
		if (!virile) {
			if (PC.vasectomy === 1) {
				r.push(`You're had a vasectomy`);
				if (PC.pubertyXY !== 1) {
					r.push(`to avoid the risk of your first virile load leading to fatherhood.`);
				} else {
					r.push(`to avoid fathering any unwanted children.`);
				}
			} else if (PC.ballType === "sterile") {
				r.push(`Your balls are sterile and useless, so your ejaculate lacks any potency.`);
			} else if (PC.pubertyXY !== 1) {
				r.push(`While you do produce ejaculate, your immature testicles do not add any sperm to it.`);
			}
		} else if (V.geneticMappingUpgrade >= 1 && PC.genes === "XY" && V.seeDicksAffectsPregnancy === 0) {
			r.push(`Analysis of your sperm shows that you have a ${PC.spermY}% chance of fathering a son.`);
		}
		return r.join(" ");
	}

	function ballThoughts() {
		const r = [];

		if (PC.balls >= 150) {
			r.push(`That you can't think of anything to liken them to is testament to just how far`);
			if (V.PC.ballsImplant > 0) {
				r.push(`the combination of growth hormones and gel injections have`);
			} else {
				r.push(`your relentless use of growth hormones has`);
			}
			r.push(`forced them to grow;`);
			if (PC.balls >= 160) {
				r.push(`they're so heavy you've lost the ability to move them without an industrial crane. But it gives you plenty of time to focus on the joys of having oversized nuts, like`);
			} else if (V.ballsAccessibility === 1) {
				r.push(`they'd complicate your life if your penthouse hadn't already been redesigned with oversized balls in mind, allowing you to focus on the joys of having oversized nuts, like`);
			} else {
				r.push(`even one is enough to make life complicated in a world designed around normal body proportions, and you're packing two of them in your sack. At least there's a certain pleasure to be derived from`);
			}
			if (cumTotal >= 1) {
				r.push(`feeling a slave's belly steadily swell from all the cum you're pumping into them.`);
			} else {
				r.push(`watching a new slave panic when you ${canMove(PC) ? "lumber over and " : ""}mount them for the first time, terrified of just how much cum is about to be pumped into their body.`);
			}
		} else if (PC.balls >= 50) {
			r.push(`They're about the size of ${PC.balls >= 100 ? "large" : ""} beachballs thanks to`);
			if (V.PC.ballsImplant > 0) {
				r.push(`a combination of growth hormones and gel injections;`);
			} else {
				r.push(`your relentless use of growth hormones;`);
			}
			if (canWalk(PC)) {
				r.push(`it's impossible to find a position where they aren't in the way of your ${legs},`);
			} else {
				r.push(`pulling them along in a cart attached to a wheelchair is a nuisance,`);
			}
			r.push(`your clothing has to be custom tailored around them, and it's hard to not just be the "${girlP} with the balls", but there's a certain pleasure in`);
			if (cumTotal >= 1) {
				r.push(`feeling a slave's belly steadily swell from all the cum you're pumping into them.`);
			} else {
				r.push(`watching a new slave panic when you're about to cum.`);
			}
			r.push(`They make life far more interesting despite the`);
			if (PC.balls > 90 && isMovable(PC)) {
				if (V.ballsAccessibility === 1) {
					r.push(`inconveniences outside the penthouse, which you've had redesigned to accommodate such proportions.`);
				} else {
					r.push(`inconveniences, even as they begin to really add up.`);
					if (PC.balls > 95) {
						if (V.buttAccessibility === 1 || V.pregAccessibility === 1 || V.boobAccessibility === 1) {
							r.push(`Fortunately, you've had the penthouse redesigned to accommodate other enormous assets, so you can at least move around without much issue.`);
						} else if (PC.balls >= 100) {
							r.push(`Like not being able to force your balls through your bedroom doors without agonizing pain, for instance. Until you come up with a solution, <span class="red">you're stuck.</span>`);
						} else {
							r.push(`It's starting to become rather painful to get in and out of your bedroom; you might not be able to if you get any bigger.`);
						}
					}
				}
			} else {
				r.push(`inconveniences.`);
			}
		} else if (PC.balls >= 30) {
			r.push(`They're about the size of watermelons thanks to`);
			if (V.PC.ballsImplant > 0) {
				r.push(`a combination of growth hormones and gel injections;`);
			} else {
				r.push(`your relentless use of growth hormones;`);
			}
			r.push(`it's impossible to sit normally, it's difficult to find clothing to accommodate them, and they are completely obvious to anyone that even glances at you, but`);
			if (cumTotal >= 1) {
				r.push(`every slave you fuck gets a distended belly from all the cum you pump into them.`);
			} else {
				r.push(`there's a certain pleasure in watching a new slave panic when you're about to cum.`);
			}
			r.push(`It's undeniable that they make life more interesting.`);
		} else if (PC.balls >= 14) {
			r.push(`It feels like you have two melons hanging from your crotch; it's difficult to sit, clothing no longer fits properly and they are completely obvious to anyone that looks at you, but every slave you fuck gets a distinct slap with each thrust. It's undeniable that they make life more interesting.`);
		} else if (PC.balls >= 9) {
			r.push(`They're roughly the size of softballs and pretty heavy, but they make sex and your day-to-day affairs interesting.`);
		} else if (PC.balls >= 5) {
			r.push(`You can certainly feel them as you move about.`);
		}
		if (
			(PC.balls >= 60 + (PC.muscles * 0.5) && PC.physicalAge <= 12) ||
			(PC.balls >= 90 + (PC.muscles * 0.7))
		) {
			r.push(`Unfortunately, they've become so ponderous that you have to cart them along when you want to move anywhere; they effectively act as a pair of anchors otherwise.`);
		}
		return r.join(" ");
	}

	function scrotumDesc() {
		const r = [];
		const scrotalFullness = (PC.scrotum - PC.balls);

		if (PC.balls > 90) {
			if (scrotalFullness < -1) {
				r.push(`Your poor scrotum is agonizingly overfilled and stretched thin. It constantly aches and you really don't wish to tear your sack by accident.`);
			} else if (scrotalFullness === -1) {
				r.push(`Your scrotum is agonizingly overfilled and stretched taut. Even the slightest brush against them is unpleasant.`);
			} else if (scrotalFullness === 0) {
				r.push(`Your comfortable scrotum allows them to hang massively from your crotch.`);
			} else {
				r.push(`Your scrotum is so loose and your testicles so fat and heavy that they`);
				if (hasBothLegs(PC)) {
					r.push(`drag along the floor if not supported.`);
				} else {
					r.push(`hang far from your torso.`);
				}
			}
		} else if (PC.balls >= 20) {
			if (scrotalFullness < -1) {
				r.push(`Your scrotum is agonizingly overfilled and stretched taut. Even the slightest brush against them is unpleasant.`);
			} else if (scrotalFullness === -1) {
				r.push(`Your scrotum is painfully overfilled by them, rendering every little vein in it visible. Touching them is unpleasant, to say the least.`);
			} else if (scrotalFullness === 0) {
				r.push(`Your comfortable scrotum allows them to hang massively from your crotch.`);
			} else {
				r.push(`Your scrotum is quite loose and your testicles fat and heavy; they hang`);
				if (hasBothLegs(PC)) {
					r.push(`past your knees.`);
				} else {
					r.push(`some distance from your torso.`);
				}
			}
		} else if (PC.balls > 5) {
			if (scrotalFullness < -1) {
				r.push(`Your scrotum is painfully overfilled by them, rendering every little vein in it visible. Touching them is unpleasant, to say the least.`);
			} else if (scrotalFullness === -1) {
				r.push(`They're held close to your body by a tight scrotum that permits them little movement.`);
			} else if (scrotalFullness === 0) {
				r.push(`Your comfortable scrotum allows them to hang massively from your crotch.`);
			} else {
				r.push(`Your scrotum is quite loose, so your testicles dangle`);
				if (hasBothLegs(PC)) {
					r.push(`between your knees if allowed.`);
				} else {
					r.push(`some distance from your torso.`);
				}
			}
		} else if (PC.balls > 2) {
			if (scrotalFullness < -1) {
				r.push(`They're too big for your undersized scrotum, which is stretched uncomfortably tight over each testicle.`);
			} else if (scrotalFullness === -1) {
				r.push(`They're held close to your body by a tight scrotum that permits them little movement.`);
			} else if (scrotalFullness === 0) {
				r.push(`They rest comfortably`);
				if (hasBothLegs(PC)) {
					r.push(`between your ${legs}, right where they should be.`);
				} else {
					r.push(`beneath your torso, right where they should be.`);
				}
			} else {
				r.push(`Your scrotum is quite loose, so your testicles hang low`);
				if (hasBothLegs(PC)) {
					r.push(`between your ${legs}.`);
				} else {
					r.push(`from your torso.`);
				}
			}
		} else if (PC.balls > 1) {
			if (scrotalFullness < 0) {
				r.push(`They're held tightly by a very minimal scrotum that reduces them to a soft little bump.`);
			} else if (scrotalFullness === 0) {
				r.push(`They rest comfortably in a soft little pouch-like scrotum.`);
			} else {
				r.push(`They look normal due to your loose scrotum, but trying to find them in it can at times be difficult.`);
			}
		} else {
			if (scrotalFullness === 0) {
				r.push(`Even your scrotum is barely there, having shriveled to nothing more than a soft little patch of skin.`);
			} else {
				r.push(`All that's left is a soft, shriveled little scrotum.`);
			}
		}
		return r.join(" ");
	}

	function internalBalls() {
		const r = [];

		if (!useConjunction) {
			r.push(`While it may appear you lack balls, you actually have`);
		}
		r.push(`<span class="orange">a pair of`);
		if (PC.balls === 1) {
			r.push(`tiny`);
		} else if (PC.balls > 2) {
			r.push(`large`);
		}
		if (!useConjunction) {
			r.push(`testicles</span> hidden up in your body.`);
		} else {
			r.push(`internal testicles.</span>`);
		}
		if (virile && PC.geneMods.livestock === 1) {
			if (PC.geneMods.livestock === 1) {
				r.push(`Your loads are thick and enormous thanks to your gene therapy.`);
				if (PC.geneMods.aggressiveSperm === 1) {
					r.push(`It's also really difficult to shoot it all out.`);
					if (canGetPregnant(PC) && canImpreg(PC, PC) && (PC.mpreg === 1 || PC.vagina >= 0) && V.seePreg) {
						r.push(`You have to be mindful of where your loads land too; one bad angle is all it would take for your belly to start rounding out with your own child.`);
					}
				}
			} else if (PC.geneMods.aggressiveSperm === 1) {
				r.push(`Your gene therapy has reduced the density of your loads, but the volume of it slowly working through your urethra feels magical.`);
				if (canGetPregnant(PC) && canImpreg(PC, PC) && (PC.mpreg === 1 || PC.vagina >= 0) && V.seePreg) {
					r.push(`You have to be mindful of where your loads go, however, as one bad shot is all it would take for your belly to start rounding out with your own child.`);
				}
			}
		}
		if (!virile) {
			if (PC.vasectomy === 1) {
				r.push(`They're not connected to anything at the moment, but you can always get your vasectomy reversed if you wanted.`);
			} else if (PC.ballType === "sterile") {
				r.push(`They're sterile and useless, but still exist at least.`);
			} else if (PC.pubertyXY !== 1) {
				r.push(`They're immature, so you don't actually produce any sperm yet.`);
			}
		} else if (V.geneticMappingUpgrade >= 1 && PC.genes === "XY" && V.seeDicksAffectsPregnancy === 0) {
			r.push(`Analysis of your sperm shows that you have a ${PC.spermY}% chance of fathering a son.`);
		}

		return r.join(" ");
	}

	function vagina() {
		const r = [];
		// Make sure that .trueVirgin is cleared if ANYTHING ever restores virginity!

		if (PC.vagina === 0) {
			r.push(`<span class="lime">a virgin pussy</span>`);
		} else if (PC.vagina === 1) {
			r.push(`<span class="orange">a tight vagina</span>`);
		} else if (PC.vagina === 2) {
			r.push(`<span class="orange">a reasonably tight vagina</span>`);
		} else if (PC.vagina === 3) {
			r.push(`<span class="orange">a rather loose vagina</span>`);
		} else if (PC.vagina === 4) {
			r.push(`<span class="red">a very loose vagina</span>`);
		} else if (PC.vagina >= 10) {
			r.push(`<span class="red">an utterly ruined hole that was once a vagina,</span>`);
		} else if (PC.vagina >= 5) {
			r.push(`<span class="red">an embarrassingly loose, permanently gaped, vagina</span>`);
		}
		if (PC.labia === 0) {
			r.push(`with cute`);
		} else if (PC.labia === 1) {
			r.push(`with big puffy`);
		} else if (PC.labia === 2) {
			r.push(`with huge`);
		} else {
			r.push(`with huge dangling`);
		}
		if (V.seeRace === 1) {
			if (PC.geneticQuirks.albinism === 2) {
				r.push(`${PC.albinismOverride.skin} pussylips.`);
			} else if (PC.race === "white") {
				r.push(`pink pussylips.`);
			} else if (PC.race === "asian") {
				r.push(`dark ${PC.race} pussylips.`);
			} else if (PC.race === "middle eastern") {
				r.push(`dark ${PC.race} pussylips.`);
			} else if (PC.race === "latina") {
				r.push(`dark ${PC.race} pussylips.`);
			} else if (PC.race === "black") {
				r.push(`dark ${PC.race} pussylips.`);
			} else {
				r.push(`${PC.skin} pussylips.`);
			}
		} else {
			r.push(`${PC.skin} pussylips.`);
		}

		r.push(vaginaThoughts());

		if (PC.cervixImplant === 3) {
			r.push(`The pump system also replaces your cervix, allowing vaginal sex to steadily swell your belly by a less conventional method.`);
		} else if (PC.cervixImplant === 1) {
			r.push(`You have a special pump replacing your cervix that converts fluids to inert filler for your abdominal implant, allowing vaginal sex to steadily swell your belly in a less conventional method.`);
		}
		if (PC.vaginaLube === 0) {
			if (isAroused) {
				r.push(`Even though you're in the mood right now, you're dry as a bone;`);
				if (PC.vagina > 0) {
					r.push(`you'd need to lube up if you wanted to be penetrated without pain.`);
				} else if (PC.trueVirgin) {
					r.push(`you can't imagine sex like this being pleasant.`);
				} else {
					r.push(`extra measures would need to be taken before giving up your virginity if it is to be worthwhile.`);
				}
			} else {
				r.push(`You don't get wet at all, even when aroused,`);
				if (PC.vagina > 0) {
					r.push(`so penetration is unpleasant without the use of artificial lubricants.`);
				} else if (PC.trueVirgin) {
					r.push(`so sex doesn't seem like it would be that fun for you.`);
				} else {
					r.push(`so you really don't see yourself giving up your virginity any time soon.`);
				}
			}
		} else if (PC.vaginaLube === 1) { // only handles arousal, everything else is considered normal and not worth mentioning
			if (isAroused) {
				r.push(`It's dripping wet and begging to be touched.`);
			}
		} else {
			if (isAroused) {
				if (!isMovable(PC)) {
					r.push(`You and your bedding`);
					if (canSmell(PC)) {
						r.push(`reek of pussy juices`);
					} else {
						r.push(`are soaked with pussy juice`);
					}
					r.push(`and with good reason; you naturally produce excess femcum and your arousal has turned that production into a biblical flood.`);
				} else {
					if (canSmell(PC)) {
						r.push(`You reek of female arousal from the flood of femcum flowing down your ${legs};`);
					} else {
						r.push(`A puddle of femcum has pooled on the ground beneath you;`);
					}
					r.push(`you naturally produce excess lubricant and getting hot and bothered has only exacerbated the situation.`);
				}
			} else {
				r.push(`Despite not being aroused, you're already quite wet. You naturally produce excessive female lubricant, so much so that it gets out of hand when you're turned on. When you're horny, everybody in the room will know whether you want them to or not.`);
			}
		}
		if (PC.belly >= 15000 && isPlayerFrigid()) {
			r.push(`Your stomach bulges out enough that it is difficult to reach your pussy around it, forcing you to have sex or find some other way to deal with your needs.`);
		}
		if (PC.dick === 0) {
			r.push(urethralFluids());
		}

		return r.join(" ");
	}

	function vaginaThoughts() {
		const r = [];

		if (PC.newVag === 1) {
			r.push(`Your pussy has been surgically reconstructed; you shouldn't be able to stretch it out again.`);
		} else if (PC.vagina === 0) {
			if (PC.counter.birthsTotal > 0 || PC.bellyPreg >= 1500) {
				if (PC.trueVirgin) {
					r.push(`Pretty impressive considering you're also a mother${PC.bellyPreg >= 1500 ? "-to-be" : ""}.`);
				} else {
					r.push(`Some may doubt its validity given that you're a mother${PC.bellyPreg >= 1500 ? "-to-be" : ""}.`);
				}
			}
		} else if (PC.bodySwap > 0) {
			if (PC.vagina < 2) {
				r.push(`${PC.origBodyOwner} took good care of your new body, at least.`);
			}
		} else if (PC.counter.birthsTotal >= 100) {
			if (PC.vagina >= 5) {
				r.push(`What can you say? You've had a <em>few</em> kids.`);
			} else {
				r.push(`It's really quite impressive that you've retained any tightness at all after having as many kids as you have.`);
			}
		} else if (PC.counter.birthsTotal >= 10) {
			if (PC.vagina >= 4) {
				r.push(`It's to be expected when you've had as many children as you have.`);
			} else {
				r.push(`It's quite the miracle that it has managed to weather as many births as it has.`);
			}
		} else if (isPCCareerInCategory("escort") && PC.vagina >= 3 && PC.trueVirgin === 0) {
			r.push(`Years of whoring will do that to a ${girlP}.`);
		} else if (isPCCareerInCategory("servant") && PC.vagina >= 3 && PC.trueVirgin === 0) {
			r.push(`Your Master fucked you several times a day; he`);
			if (PC.counter.birthMaster > 0) {
				r.push(`and his child${V.PC.counter.birthMaster > 1 ? "ren" : ""} have`);
			}
			r.push(`wreaked havoc upon your pussy.`);
		} else if (PC.counter.birthsTotal > 2 && PC.vagina >= 3) {
			r.push(`It's a bit stretched from your several children.`);
		} else if (PC.counter.birthsTotal > 0 && PC.vagina.isBetween(1, 5)) {
			r.push(`It's gone through childbirth well enough.`);
		} else if (PC.vagina >= 2) {
			r.push(`You may have had ${PC.vagina >= 4 ? "a little too much" : "some"} fun in bed.`);
		} else if (PC.vagina >= 1) {
			r.push(`You've made sure to take care of yourself.`);
		}

		return r.join(" ");
	}

	function clit() {
		const r = [];

		if (PC.scrotum > 0 && PC.balls > 1) {
			r.push(`Your vagina merges seamlessly into the base of your`);
			if (PC.dick > 0) {
				r.push(`scrotum, with your cock extending from where your clitoris would be.`);
			} else {
				r.push(`scrotum.`);
			}
		} else if (PC.dick > 0) {
			r.push(`Since you have a penis, you lack a clit; your vagina merges seamlessly into its base, with it extending from where your clitoris would be.`);
		} else if (PC.scrotum > 0 && PC.balls > 0) {
			r.push(`Your vagina merges seamlessly into your minuscule scrotum, creating a bit of confusion over what all parts you have.`);
		} else { // This can certainly be improved.
			if (PC.foreskin === 0) {
				if (PC.clit === 0) {
					r.push(`You have an average clit, ${isAroused ? "stiff with lust and" : "left"} exposed by your lack of hood.`);
				} else if (PC.clit === 1) {
					r.push(`You have a large${isAroused ? ", visibly hard" : ""} clit, made even more prominent by your lack of hood.`);
				} else if (PC.clit === 2) {
					if (isAroused) {
						r.push(`You have a huge, visibly erect clit left exposed by your lack of hood. It throbs just being in the open air; wearing clothing in this state is torturous.`);
					} else {
						r.push(`You have a huge clit, left exposed by your lack of hood. It's difficult to not find yourself overstimulated by simple things like clothing brushing against it.`);
					}
				} else if (PC.clit === 3) {
					if (isAroused) {
						r.push(`You have an enormous, proudly erect clit.`);
					} else {
						r.push(`You have an enormous clit, almost a pseudophallus.`);
					}
					r.push(`It's lost a little sensitivity from its size, so it's a bit more manageable to live with.`);
				} else if (PC.clit === 4) {
					r.push(`Your clit is large enough to rival the average penis`);
					if (isAroused) {
						r.push(`and, right now, is erect like one too. It's not as hard as a real erection, but you can still use it like one.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. A feat quite stimulating.`);
					}
				} else {
					r.push(`Your clit is massive, larger than the average penis`);
					if (isAroused) {
						r.push(`and, right now, semi-erect. The lack of erectile tissue means it can never become fully erect, but that won't stop you from putting it to good use.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. It can't get as hard as a dick, since it lacks erectile tissue, but the feeling is unimaginable.`);
					}
				}
			} else if (PC.foreskin === 1) {
				if (PC.clit === 0) {
					r.push(`You have an average clit, ${isAroused ? "stiff with lust and" : ""} hidden by its hood.`);
				} else if (PC.clit === 1) {
					r.push(`You have a large${isAroused ? ", visibly hard" : ""} clit. Your clitoral hood is stretched thin trying to cover it.`);
				} else if (PC.clit === 2) {
					if (isAroused) {
						r.push(`You have a huge, visibly erect clit.`);
					} else {
						r.push(`You have a huge clit.`);
					}
					r.push(`Your hood is too small to cover it completely, and a large portion of your clitoris is always exposed.`);
				} else if (PC.clit === 3) {
					if (isAroused) {
						r.push(`You have an enormous, proudly erect clit.`);
					} else {
						r.push(`You have an enormous clit, almost a pseudophallus.`);
					}
					r.push(`Your hood can no longer contain it and has slid back, leaving your clitoris always exposed.`);
				} else if (PC.clit === 4) {
					r.push(`Your clit is large enough to rival the average penis`);
					if (isAroused) {
						r.push(`and, right now, is erect like one too. It's not as hard as a real erection, but you can still use it like one.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. A feat quite stimulating.`);
					}
					r.push(`Your hood can no longer contain it and has slid back, leaving your clitoris always exposed.`);
				} else {
					r.push(`Your clit is massive, larger than the average penis`);
					if (isAroused) {
						r.push(`and, right now, semi-erect. The lack of erectile tissue means it can never become fully erect, but that won't stop you from putting it to good use.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. It can't get as hard as a dick, since it lacks erectile tissue, but the feeling is unimaginable.`);
					}
					r.push(`Your hood can no longer contain it and has slid back, leaving your clitoris always exposed.`);
				}
			} else if (PC.foreskin === 2) {
				if (PC.clit === 0) {
					r.push(`You have an average clit, ${isAroused ? "stiff with lust but" : ""} covered by a large hood that makes stimulating it difficult.`);
				} else if (PC.clit === 1) {
					r.push(`You have a large${isAroused ? ", visibly hard" : ""} clit covered by a hood.`);
				} else if (PC.clit === 2) {
					if (isAroused) {
						r.push(`You have a huge, visibly erect clit.`);
					} else {
						r.push(`You have a huge clit.`);
					}
					r.push(`Your clitoral hood is stretched thin trying to cover it.`);
				} else if (PC.clit === 3) {
					if (isAroused) {
						r.push(`You have an enormous, proudly erect clit.`);
					} else {
						r.push(`You have an enormous clit, almost a pseudophallus.`);
					}
					r.push(`Your hood is too small to cover it completely, and a large portion of your clitoris is always exposed.`);
				} else if (PC.clit === 4) {
					r.push(`Your clit is large enough to rival the average penis`);
					if (isAroused) {
						r.push(`and, right now, is erect like one too. It's not as hard as a real erection, but you can still use it like one.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. A feat quite stimulating.`);
					}
					r.push(`Your hood can no longer contain it and has slid back, leaving your clitoris always exposed.`);
				} else {
					r.push(`Your clit is massive, larger than the average penis`);
					if (isAroused) {
						r.push(`and, right now, semi-erect. The lack of erectile tissue means it can never become fully erect, but that won't stop you from putting it to good use.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. It can't get as hard as a dick, since it lacks erectile tissue, but the feeling is unimaginable.`);
					}
					r.push(`Your hood can no longer contain it and has slid back, leaving your clitoris always exposed.`);
				}
			} else if (PC.foreskin === 3) {
				if (PC.clit === 0) {
					r.push(`You have an average clit, ${isAroused ? "stiff with lust but" : ""} covered by a large, thick hood that makes stimulating it difficult.`);
				} else if (PC.clit === 1) {
					r.push(`You have a large${isAroused ? ", visibly hard" : ""} clit covered by a thick hood that makes stimulating it difficult.`);
				} else if (PC.clit === 2) {
					if (isAroused) {
						r.push(`You have a huge, visibly erect`);
					} else {
						r.push(`You have a huge`);
					}
					r.push(`clit completely covered by a large hood.`);
				} else if (PC.clit === 3) {
					if (isAroused) {
						r.push(`You have an enormous, proudly erect clit.`);
					} else {
						r.push(`You have an enormous clit, almost a pseudophallus.`);
					}
					r.push(`A large hood covers all but the tip of your it${isAroused ? ", even in its current state" : ""}.`);
				} else if (PC.clit === 4) {
					r.push(`Your clit is large enough to rival the average penis`);
					if (isAroused) {
						r.push(`and, right now, is erect like one too. It's not as hard as a real erection, but you can still use it like one.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. A feat quite stimulating.`);
					}
					r.push(`Even your large hood can't cover it completely, leaving over half of it exposed.`);
				} else {
					r.push(`Your clit is massive, larger than the average penis`);
					if (isAroused) {
						r.push(`and, right now, semi-erect. The lack of erectile tissue means it can never become fully erect, but that won't stop you from putting it to good use.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. It can't get as hard as a dick, since it lacks erectile tissue, but the feeling is unimaginable.`);
					}
					r.push(`Your large hood can't contain it and has slid back, leaving your clitoris always exposed.`);
				}
			} else {
				if (PC.clit === 0) {
					r.push(`You have an average clit, ${isAroused ? "stiff with lust but" : ""} covered by a large, thick hood that makes stimulating it difficult.`);
				} else if (PC.clit === 1) {
					r.push(`You have a large${isAroused ? ", visibly hard" : ""} clit covered by a thick hood that makes stimulating it difficult.`);
				} else if (PC.clit === 2) {
					if (isAroused) {
						r.push(`You have a huge, visibly erect clit.`);
					} else {
						r.push(`You have a huge clit.`);
					}
					r.push(`However, the large, thick hood covering it makes any stimulation difficult.`);
				} else if (PC.clit === 3) {
					if (isAroused) {
						r.push(`You have an enormous, proudly erect clit.`);
					} else {
						r.push(`You have an enormous clit, almost a pseudophallus.`);
					}
					r.push(`Matching its size is the thick hood covering it.`);
				} else if (PC.clit === 4) {
					r.push(`Your clit is large enough to rival the average penis`);
					if (isAroused) {
						r.push(`and, right now, is erect like one too. It's not as hard as a real erection, but you can still use it like one.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. A feat quite stimulating.`);
					}
					r.push(`The large hood covering over half of it only adds to its penis-like appearance.`);
				} else {
					r.push(`Your clit is massive, larger than the average penis`);
					if (isAroused) {
						r.push(`and, right now, semi-erect. The lack of erectile tissue means it can never become fully erect, but that won't stop you from putting it to good use.`);
					} else {
						r.push(`and capable of becoming erect enough to allow penetration. It can't get as hard as a dick, since it lacks erectile tissue, but the feeling is unimaginable.`);
					}
					r.push(`Even your large hood can't cover it completely, leaving over half of it exposed.`);
				}
			}
		}

		return r.join(" ");
	}

	function surgicalNull() {
		const r = [];

		r.push(`absolutely nothing; <span class="orange">you're a surgical null.</span>`);
		r.push(urethralFluids());

		return r.join(" ");
	}

	function urethralFluids() {
		const r = [];
		const ballSize = (
			PC.balls > 2 ? "cramped"
				: PC.balls === 1 ? "tiny"
					: ""
		);

		// arousal
		if (isAroused && PC.prostate > 0) {
			if (PC.dick > 0) {
				if (foreskinRatio <= 0) {
					if (canAchieveErection(PC)) {
						r.push(`A string of precum is dangling from the tip of your erection.`);
					} else if (PC.dick >= 30) {
						r.push(`A trail of precum follows the tip of your dick as you pull it around.`);
					} else {
						r.push(`A string of precum is dangling from the tip of your flaccid penis.`);
					}
				} else {
					r.push(`You can feel your precum smearing around the inside of your excessive foreskin.`);
				}
			} else if (PC.vagina >= 0 && PC.scrotum === 0) {
				r.push(`A stream of precum is flowing out your urethra and`);
				if (PC.vaginaLube > 0) {
					r.push(`mixing into your pussy juices.`);
				} else {
					r.push(`providing a little moisture to your pussy, however.`);
				}
			} else {
				r.push(`A bead of precum is pooling at the entrance to your urethra.`);
			}
		}
		// squirting
		if (PC.dick === 0 && (PC.prostate > 0 || PC.balls > 0)) {
			if (PC.vagina === -1 || PC.scrotum > 0) {
				r.push(`This hole is normally almost invisible, so it's`);
				if (PC.prostate > 2 || cumTotal >= 1) {
					r.push(`absolutely shocking to new partners when you climax and fire a massive cumshot out of it.`);
				} else if (PC.balls > 0 && virile) {
					r.push(`quite surprising to new partners when you climax and shoot cum out of it.`);
				} else if (PC.prostate > 0) {
					r.push(`quite surprising to new partners when you climax and squirt from it.`);
				}
			} else {
				r.push(`Since you have`);
				if (PC.prostate > 0 && PC.balls > 0) {
					r.push(`a functional prostate gland attached to your urethra and <span class="orange">a pair of ${ballSize} internal testicles</span> to go with it, you`);
					if (PC.prostate > 2 || cumTotal >= 1) {
						r.push(`soak yourself and your surroundings with ${virile ? "semen and " : ""}sexual fluids every time you cum.`);
					} else {
						r.push(`squirt copious amounts of fluid ${virile ? "and semen " : ""}with each orgasm.`);
					}
				} else if (PC.balls > 0) {
					if (cumTotal >= 1) {
						r.push(`<span class="orange">an overproductive pair of ${ballSize} internal testicles</span> hooked up to your urethra, you release a flood of ${virile ? "semen" : "ejaculate"} every time you cum.`);
					} else {
						r.push(`<span class="orange">a pair of ${ballSize} internal testicles</span> hooked up to your urethra, you squirt a little ${virile ? "semen" : "ejaculate"} with each orgasm.`);
					}
				} else if (PC.prostate > 0) {
					r.push(`a functional prostate gland attached to your urethra, you`);
					if (PC.prostate > 2) {
						r.push(`soak yourself and your surroundings with sexual fluids any time you cum.`);
					} else {
						r.push(`squirt copiously when you orgasm.`);
					}
				}
			}
			if ((PC.dick === 0 || PC.genes !== "XY") && PC.prostate > 0 && PC.preg > 0 && PC.preg > PC.pregData.normalBirth * .75) {
				r.push(`Your prostate is under constant pressure from your advanced pregnancy, forcing frequent bouts of extreme arousal on you.`);
			}
			if (PC.balls > 0) {
				if (!virile) {
					r.push(`This fluid isn't virile`);
					if (PC.vasectomy === 1) {
						r.push(`since you've had a vasectomy.`);
					} else if (PC.ballType === "sterile") {
						r.push(`since you are sterile.`);
					} else if (PC.pubertyXY !== 1) {
						r.push(`yet, but will be someday.`);
					}
				} else if (V.geneticMappingUpgrade >= 1 && PC.genes === "XY" && V.seeDicksAffectsPregnancy === 0) {
					r.push(`Analysis of the sperm mixed into this fluid reveals that you have a ${PC.spermY}% chance of fathering a son.`);
				}
				if (virile && PC.geneMods.aggressiveSperm === 1 && canGetPregnant(PC) && canFemImpreg(PC, PC) && (PC.mpreg === 1 || PC.vagina >= 0)) {
					r.push(`Your gene therapy has greatly increased the survivability of your sperm and since you don't project it far from your body on ejaculation,`);
					if (PC.mpreg === 1) {
						r.push(`it's quite likely that some of it will find its way to your anus.`);
					} else {
						r.push(`some of it always trickles into your pussy.`);
					}
					if (V.seePreg) {
						r.push(`You need to use birth control or your constant self-seeding will see you pregnant.`);
					}
				}
			}
		}

		return r.join(" ");
	}

	r.push(pubicMound());
	if (PC.dick === 0 && PC.vagina === -1 && PC.scrotum === 0) {
		r.push(surgicalNull());
	}
	if (PC.dick > 0) {
		r.push(penis());
	}
	if (PC.scrotum > 0) {
		r.push(balls());
	} else if (PC.dick > 0 && PC.balls > 0) { //  && PC.vagina === -1 internal balls + dick
		r.push(internalBalls());
	} else if (PC.dick > 0 && PC.vagina === -1) {
		if (!useConjunction) {
			r.push(`You completely lack testicles.`);
		} else {
			r.push(`no testicles.`);
		}
	}
	if (PC.dick > 0 || PC.scrotum > 0) {
		r.push(urethralFluids());
		if (PC.vagina >= 0) {
			r.push(`Tucked away beneath`);
			if (PC.dick > 0 && PC.scrotum > 0) {
				r.push(`them, you have`);
			} else if (PC.dick > 0 && PC.balls > 0) {
				r.push(`your shaft, you have`);
			} else {
				r.push(`it, you have`);
			}
		}
	}
	if (PC.vagina >= 0) {
		r.push(vagina());
		r.push(clit());
	}

	if (hasAnyArms(PC) && PC.ovaries === 1) {
		if (PC.belly >= 5000) {
			if (PC.bellyPreg >= 2000) {
				r.push(`You run your ${hands} across your obvious womb;`);
			} else {
				r.push(`You run your ${hands} across your belly, coming to a stop over your womb;`);
			}
		} else if (PC.weight > 30) {
			r.push(`You sink a hand into your soft middle, bringing it to rest over your womb;`);
		} else {
			r.push(`You rest your hand over your womb;`);
		}
		if (PC.wombImplant === "restraint") {
			r.push(`it's a relatively normal <span class="pink">female reproductive tract</span> that has been reinforced to better support large`);
			if (PC.belly >= 400000) {
				r.push(`pregnancies, like yours, but lately it has begun to feel restrictive, almost as if it is strangling your uterus.`);
			} else if (PC.bellyPreg >= 150000) {
				r.push(`pregnancies like yours.`);
			} else {
				r.push(`pregnancies.`);
			}
		} else {
			r.push(`you have a ${PC.ovaImplant !== 0 && PC.vagina >= 0 ? "relatively" : ""} normal <span class="pink">female reproductive tract.</span>`);
		}
		if (PC.vagina === -1) {
			r.push(`You lack a vagina, which means you can only bear children surgically.`);
		}
		if (PC.geneMods.progenitor === 1) {
			r.push(`You've undergone gene therapy to better carry children.`);
			if (canGetPregnant(PC)) {
				r.push(`Your body is just wasting eggs at this point; menopause will be upon you before you realize it unless you put your womb to work.`);
			} else if (PC.preg > 0 && PC.pregKnown && V.dangerousPregnancy === 1) {
				r.push(`According to the data, it shouldn't be possible for you to prematurely give birth.`);
			}
		}
		if ((V.PC.ovaries > 0 || V.PC.mpreg > 0) && V.PC.ovaryAge < 0) { // impossible for now
			r.push(`You've had your ovaries replaced with genetically modified clones that will continue to produce new ova for as long as you live.`);
		}
		if (PC.ovaImplant !== 0) {
			if (PC.wombImplant === "restraint") {
				r.push(`You ovaries are modified as well;`);
			} else {
				r.push(`Your ovaries are modified;`);
			}
			switch (PC.ovaImplant) {
				case "fertility":
					r.push(`a pair of implants are attached that increase the number of eggs released during ovulation.`);
					break;
				case "sympathy":
					r.push(`a pair of linked implants are attached to them so that when one releases an egg the other does as well.`);
					break;
				case "asexual":
					r.push(`one of them has been replaced with a fabricated sperm sack designed to automatically fertilize any eggs you release.`);
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
};
