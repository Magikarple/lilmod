/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} [describeMakeup=true] if true then we will describe the slaves makeup, otherwise we will omit it
 * @returns {string}
 */
App.Desc.face = function(slave, describeMakeup = true) {
	const r = [];
	const {
		he, him, his, He, His, girl,
	} = getPronouns(slave);

	r.push(`${His} <span class="pink">face is`);

	switch (slave.faceShape) {
		case "masculine":
			if (slave.face < -95) {
				r.push(`so ugly and masculine that ${his} designation as a slave girl is a mockery.`);
			} else if (slave.face < -40) {
				r.push(`ugly and masculine, making ${him} a poor slave girl by appearance.`);
			} else if (slave.face < -10) {
				r.push(`unattractively masculine.`);
			} else if (slave.face <= 10) {
				r.push(`masculine, but not entirely unappealing.`);
			} else if (slave.face <= 40) {
				r.push(`attractively masculine.`);
			} else if (slave.face <= 95) {
				r.push(`quite handsome in a masculine way.`);
			} else {
				r.push(`the height of masculine handsomeness.`);
			}
			break;
		case "androgynous":
			if (slave.face < -95) {
				r.push(`disturbingly androgynous and terribly ugly.`);
			} else if (slave.face < -40) {
				r.push(`ugly and androgynous; ${he} has neither masculine nor feminine appeal.`);
			} else if (slave.face < -10) {
				r.push(`strangely androgynous, and rather unattractive.`);
			} else if (slave.face <= 10) {
				r.push(`strangely androgynous.`);
			} else if (slave.face <= 40) {
				r.push(`androgynous, and attractive enough that this ambiguity is interesting.`);
			} else if (slave.face <= 95) {
				r.push(`gorgeously androgynous in a complex way that captures the eye.`);
			} else {
				r.push(`so gorgeously androgynous that ${he} tends to induce sexual confusion.`);
			}
			break;
		case "cute":
			if (slave.face < -95) {
				r.push(`very ugly, yet somehow cute; ${he}'s so unattractive that ${he} inspires pity.`);
			} else if (slave.face < -40) {
				r.push(`ugly, but cute, with a pitiable appeal.`);
			} else if (slave.face < -10) {
				r.push(`not attractive, but is appealingly cute.`);
			} else if (slave.face <= 10) {
				r.push(`merely average, but is appealingly cute.`);
			} else if (slave.face <= 40) {
				r.push(`both attractive and appealingly cute.`);
			} else if (slave.face <= 95) {
				r.push(`beautiful, yet somehow also approachably cute.`);
			} else {
				r.push(`an impossibly perfect combination of beauty and ${girl}-next-door cuteness.`);
			}
			break;
		case "sensual":
			if (slave.face < -95) {
				r.push(`very ugly, yet naturally slutty, promising a decent fuck despite its appearance.`);
			} else if (slave.face < -40) {
				r.push(`ugly, but also slutty, promising a good fuck despite its appearance.`);
			} else if (slave.face < -10) {
				r.push(`not attractive, but it has a certain sensual appeal.`);
			} else if (slave.face <= 10) {
				r.push(`merely average, but undeniably sensual.`);
			} else if (slave.face <= 40) {
				r.push(`both attractive and naturally sultry.`);
			} else if (slave.face <= 95) {
				r.push(`both beautiful and sultry, bringing sex to mind naturally.`);
			} else {
				r.push(`very beautiful in a consummately sexual way.`);
			}
			break;
		case "exotic":
			if (slave.face < -95) {
				r.push(`very ugly and unusual, a real tragedy in flesh.`);
			} else if (slave.face < -40) {
				r.push(`ugly and unusual, a real misfortune.`);
			} else if (slave.face < -10) {
				r.push(`unattractive, and distinctive in its unattractiveness.`);
			} else if (slave.face <= 10) {
				r.push(`quite average, but not uninteresting.`);
			} else if (slave.face <= 40) {
				r.push(`attractive in an exotic and interesting way.`);
			} else if (slave.face <= 95) {
				r.push(`exotic and beautiful, capable of catching the eye and keeping its gaze.`);
			} else {
				r.push(`very beautiful and exotic, almost to the point of alien fascination.`);
			}
			break;
		case "feline":
			if (slave.face < -95) {
				r.push(`a hideous, furred feline face with pronounced fangs and whiskers that's nothing short of terrifying.`);
			} else if (slave.face < -40) {
				r.push(`an ugly, furred feline face, featuring idly-twitching whiskers and a misshapen button nose.`);
			} else if (slave.face < -10) {
				r.push(`an comely, furred feline face, somewhat unappealing in its strange catlike whiskers and nose.`);
			} else if (slave.face <= 10) {
				r.push(`a plain, feline face, remarkable only for the whiskers and button nose that decorate it.`);
			} else if (slave.face <= 40) {
				r.push(`an attractive feline face, silky fur framing well-manicured whiskers in an eye-catching fashion.`);
			} else if (slave.face <= 95) {
				r.push(`a beautiful feline face, combining catlike grace and human structure into a gorgeous whiskered visage.`);
			} else {
				r.push(`an absolutely stunningly beautiful feline face, perfectly inviting silky fur framing a whiskered, catlike appearance that's as alien as it is perfect.`);
			}
			break;
		default:
			if (slave.face < -95) {
				r.push(`very ugly.`);
			} else if (slave.face < -40) {
				r.push(`quite ugly.`);
			} else if (slave.face < -10) {
				r.push(`unattractive.`);
			} else if (slave.face <= 10) {
				r.push(`average and conventionally feminine.`);
			} else if (slave.face <= 40) {
				r.push(`conventionally attractive.`);
			} else if (slave.face <= 95) {
				r.push(`conventionally beautiful.`);
			} else {
				r.push(`the height of conventional feminine beauty.`);
			}
	}
	r.push(`</span>`);
	if (slave.weight > 190) {
		r.push(`${His} face is quite fat with ample excess chins.`);
	} else if (slave.weight > 160) {
		r.push(`${His} face is round and plump with a trio of extra chins.`);
	} else if (slave.weight > 130) {
		r.push(`${His} face is chubby with an obvious second chin.`);
	} else if (slave.weight > 97) {
		r.push(`${His} face is soft with barely a second chin.`);
	}
	if (slave.fuckdoll > 0) {
		r.push(`However,`);
		if (slave.face < -1) {
			r.push(`it's hard to see this past the suit, since its face is padded to make ${him} seem less ugly.`);
		} else if (slave.face < 1) {
			r.push(`it's hard to see this past the suit, since its face is shaped to make ${him} seem prettier.`);
		} else {
			r.push(`the suit obscures all but the shape of ${his} pretty face.`);
		}
	} else {
		if (slave.markings === "beauty mark") {
			if (slave.face < -95) {
				r.push(`It bears a severely disfiguring, discolored mark.`);
			} else if (slave.face < -40) {
				r.push(`It bears a couple of unsightly moles.`);
			} else if (slave.face < -10) {
				r.push(`It bears an ugly mole.`);
			} else if (slave.face <= 10) {
				r.push(`${He} has a distinctive beauty mark.`);
			} else if (slave.face <= 40) {
				r.push(`${He} has a nice beauty mark.`);
			} else if (slave.face <= 95) {
				r.push(`${He} has a beauty mark that adds to ${his} distinctiveness.`);
			} else {
				r.push(`${He} has a beauty mark that makes ${him} really memorable.`);
			}
		}
	}
	if (slave.faceImplant > 5) {
		r.push(`${He}'s`);
		if (slave.faceImplant > 95) {
			r.push(`had so much cosmetic surgery that ${his} face is located at the bottom of the uncanny`);
			if (slave.face < -10) {
				r.push(`valley in addition to its ugliness.`);
			} else if (slave.face <= 10) {
				r.push(`valley; the only thing really distinctive about it.`);
			} else {
				r.push(`valley, its attractiveness notwithstanding.`);
			}
		} else if (slave.faceImplant > 60) {
			r.push(`obviously gotten a lot of facial cosmetic surgery.`);
		} else if (slave.faceImplant > 30) {
			r.push(`noticeably received facial cosmetic surgery.`);
		} else {
			r.push(`had some facial cosmetic surgery, though it's subtle.`);
			if (V.PC.skill.medicine >= 100) {
				r.push(`Someone without your knowledge might miss it entirely.`);
			}
		}
		if (FutureSocieties.isActive('FSBodyPurist')) {
			if (slave.faceImplant > 30) {
				r.push(`This is considered extremely tragic by a society that values bodily purity.`);
			} else {
				r.push(`Since society values bodily purity, even this subtlety affects ${his} attractiveness when it's noticed.`);
			}
		} else if (FutureSocieties.isActive('FSTransformationFetishist')) {
			if (slave.faceImplant > 30) {
				r.push(`Your transformationist society doesn't think this`);
				if (slave.face >= -10) {
					r.push(`reduces ${his} attractiveness.`);
				} else {
					r.push(`makes ${him} uglier.`);
				}
			}
		} else {
			if (slave.faceImplant > 30) {
				r.push(`The effect is enough to reduce ${his} attractiveness.`);
			}
		}
	}
	if (slave.smells === -1) {
		r.push(`${He} has no sense of smell, but this isn't immediately obvious just by looking at ${his} nose.`);
	}

	if (V.showBodyMods === 1 && describeMakeup) {
		if (slave.fuckdoll === 0) {
			r.push(App.Desc.makeup(slave));
		}
	}
	return r.join(" ");
};
