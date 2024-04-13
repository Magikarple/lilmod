// cSpell:ignore debaucherous, waifu

/** @param {App.Entity.SlaveState} slave */
App.Interact.sellSlave = function(slave) {
	const scene = document.createElement("span");
	const {
		He, His,
		he, his, hers, him, himself, girl
	} = getPronouns(slave);
	const {womenU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
	let t = [];

	t.push(`You prepare ${him} for sale. ${His} response to being put up for purchase is`);
	if (slave.devotion < -50) {
		if (slave.trust > 20) {
			t.push(`annoyance; ${he} must have thought ${he} had a good thing going here despite ${his} defiance.`);
		} else {
			t.push(`muted; perhaps ${he} hopes a new master will be less hateful than you.`);
		}
	} else if (slave.devotion < -20) {
		if (slave.trust > 20) {
			t.push(`mild panic; ${he} seems to be concerned about ${his} future.`);
		} else {
			t.push(`muted weeping; for some reason, ${he} doesn't like being treated like meat on a slab.`);
		}
	} else if (slave.devotion <= 20) {
		t.push(`hesitant; ${he} can't seem to make up ${his} mind whether this is going to mean an improvement or not.`);
	} else if (slave.devotion <= 50) {
		t.push(`obedient, if mechanical; ${he} may want to stay with you.`);
	} else if (slave.devotion <= 95) {
		t.push(`ill-concealed sorrow; ${he} clearly wants to stay with you very much.`);
	} else {
		t.push(`open, abject, and heart-wrenching begging. Staying with you truly seems to be ${his} only wish.`);
	}
	if (slave.trust < -50) {
		t.push(`${He}'s certainly very willing to get away from your horrible punishments.`);
	} else if (slave.trust < -20) {
		t.push(`${He}'s probably hoping ${he}'ll be a little less frightened all the time, wherever ${he} goes.`);
	} else if (slave.trust < 20) {
		t.push(`${He} does seem concerned that, hard as you are, ${his} buyer may be less fair.`);
	} else if (slave.trust < 50) {
		t.push(`${He}'s worried, probably because ${he}'s learned how to avoid punishment here and will have to learn new rules.`);
	} else if (slave.trust < 95) {
		if (slave.devotion < -20) {
			t.push(`${He}'s worried, probably because ${he} thinks you won't harm ${him} while another owner might.`);
		} else {
			t.push(`${He} promises ${he} will do ${his} best to make you proud by being a good slave to ${his} new owners.`);
		}
	} else {
		if (slave.devotion < -20) {
			t.push(`${He}'s rather upset at the notion that ${he} may be going from a weak willed master to someone with the balls to actually try and break ${him}.`);
		} else {
			t.push(`${He} tries to conceal ${his} terror at going from a trustworthy slave master to the cruel and uncertain world outside your penthouse, but ${he} fails.`);
		}
	}
	const costObj = slaveCost(slave, false, false, false, true);
	let cost = random(70, 80) / 100 * costObj.cost;

	if (V.secExpEnabled > 0 && V.SecExp.edicts.defense.militia === 5 && slave.skill.combat > 60) {
		t.push(`${His} combat training is likely to increase ${his} sale value within your militarized society.`);
		cost *= 1.5;
	}

	if (slave.breedingMark === 1 && V.propOutcome === 1 && FutureSocieties.isActive('FSRestart')) {
		t.push(`Since you are selling a breeding slave, ${he} will be sent to auction before other members of the Societal Elite.`);
	} else if (slave.geneticQuirks.progeria === 2 && slave.physicalAge >= 45) {
		t.push(`With ${his} advanced progeria, it would be a waste of time to have ${him} appraised. You have to cast a wide net to find a buyer, and the meager offering presented may be the most you'll get for ${him}.`);
	} else {
		if (V.showAppraisal === 1) {
			App.Events.addParagraph(scene, t);
			t = [];
			const reviewers = ["businesswoman", "accountant", "slaver"];
			if (V.seeDicks > 0) {
				reviewers.push("futa");
			}

			if (V.arcologies[0].FSRomanRevivalist > 20) {
				reviewers.push("roman");
			} else if (V.arcologies[0].FSNeoImperialist > 20) {
				reviewers.push("imperial");
			} else if (V.arcologies[0].FSAztecRevivalist > 20) {
				reviewers.push("aztec");
			} else if (V.arcologies[0].FSEgyptianRevivalist > 20) {
				reviewers.push("egyptian");
			} else if (V.arcologies[0].FSEdoRevivalist > 20) {
				reviewers.push("edo");
			} else if (V.arcologies[0].FSArabianRevivalist > 20) {
				reviewers.push("arabian");
			} else if (V.arcologies[0].FSChineseRevivalist > 20) {
				reviewers.push("chinese");
			}
			if (V.arcologies[0].FSChattelReligionist > 20) {
				reviewers.push("priestess");
			}
			if (V.arcologies[0].FSRestartDecoration === 100) {
				reviewers.push("Elite");
			}
			const appraiser = reviewers.random();

			t.push(`A reputable slave appraiser arrives promptly to inspect ${him} and certify ${his} qualities for sale. The appraiser,`);
			switch (appraiser) {
				case "roman":
					t.push(`one of the arcology's appointed censors, sweeps in grandly in his toga with its blue stripe of office, greets you confidently, and turns to the slave. He unrolls a scroll-shaped soft tablet, reviewing video of the ${girl}'s skills and referring back to ${his} body as he works his way through the prescribed method of valuation. Finished, he turns to you.`);
					if (V.PC.customTitle) {
						t.push(`"${V.PC.customTitle},`);
					} else {
						if (V.arcologies[0].FSRomanRevivalist >= V.FSLockinLevel * 0.9) {
							t.push(`"First Consul,`);
						} else if (V.arcologies[0].FSRomanRevivalist >= V.FSLockinLevel * 0.6) {
							t.push(`"Quaestor,`);
						} else {
							t.push(`"Aedile,`);
						}
					}
					t.push(`I have appraised your slave. As directed by law, my appraisal is based on ${his} potential income in a brothel, with modification for any significant qualities. I have found the following.`);
					break;
				case "imperial":
					t.push(`one of the arcology's noble Barons, dressed in a pristine cybernetic suit that highlights his musculature underneath lines that pulsate when he moves and a golden band around his forehead that keeps his unruly hair in place, greets you with a smile full of white teeth and projects a holographic screen from the wrist of his suit. For around a minute, he hems and murmurs as he reviews slave vitals and statistics on his holographic screen, then turns his attention back to you.`);
					if (V.PC.customTitle) {
						t.push(`"${V.PC.customTitle},`);
					} else {
						if (V.arcologies[0].FSNeoImperialist >= V.FSLockinLevel * 0.9) {
							t.push(`"Your Highness and Immortal Emperor,`);
						} else if (V.arcologies[0].FSNeoImperialist >= V.FSLockinLevel * 0.6) {
							t.push(`"Your Highness,`);
						} else {
							t.push(`"Noble Lord,`);
						}
					}
					t.push(`My appraisal is complete. As the statutes of Imperial law direct, I have taken into account ${his} qualities, skills, and potential income should ${he} be placed in a brothel or other useful venue. My assessment finds the following.`);
					break;
				case "aztec":
					t.push(`one of the arcology's slave examiners, walks elegantly in, wearing a very richly ornamented cape and a simple headdress to accentuate her face.`);
					if (V.arcologies[0].FSRepopulationFocusLaw === 1) {
						t.push(`Her bronzed middle is noticeably swollen with pregnancy.`);
					}
					t.push(`She acquaints herself with the slave and carries on a short inspection and a shorter conversation. She returns to you, goes on one knee, and follows by saying.`);
					if (V.PC.customTitle) {
						t.push(`"${V.PC.customTitle},`);
					} else {
						if (V.arcologies[0].FSAztecRevivalist >= V.FSLockinLevel * 0.9) {
							t.push(`"Piety,`);
						} else if (V.arcologies[0].FSAztecRevivalist >= V.FSLockinLevel * 0.6) {
							t.push(`"Sanctity,`);
						} else {
							t.push(`"Your Greatness,`);
						}
					}
					t.push(`I have appraised your slave. My appraisal is based on ${his} potential income in a brothel, with modification for ${his} special qualities. I have found the following.`);
					break;
				case "egyptian":
					t.push(`one of the arcology's traditional slave examiners, comes elegantly in wearing a simple gown shift that sweeps low, baring her bronzed back.`);
					if (V.arcologies[0].FSRepopulationFocusLaw === 1) {
						t.push(`Her gown is noticeably swollen with pregnancy.`);
					}
					t.push(`She greets you warmly, and then turns to the slave. She inspects ${him} and carries on a polite conversation with ${him}, learning about ${him} by talking with ${him}. When she finishes, she turns to you and bows deeply.`);
					if (V.PC.customTitle) {
						t.push(`"My ${V.PC.customTitle},`);
					} else {
						if (V.arcologies[0].FSEgyptianRevivalist >= V.FSLockinLevel * 0.9) {
							t.push(`"Your worship,`);
						} else if (V.arcologies[0].FSEgyptianRevivalist >= V.FSLockinLevel * 0.6) {
							t.push(`"Pharaoh,`);
						} else {
							if (V.PC.title === 1) {
								t.push(`"My prince,`);
							} else {
								t.push(`"My princess,`);
							}
						}
					}
					t.push(`I have appraised your slave. My appraisal is based on ${his} potential income in a brothel, with modification for ${his} special qualities. I have found the following.`);
					break;
				case "edo":
					t.push(`one of the arcology's recognized slave examiners, arrives alone, but is no less regal for it. She is dressed as a proper Edo lady, and is a natural at it, slim${(V.arcologies[0].FSRepopulationFocusLaw === 1) ? `, despite her large pregnancy` : ``}, pretty, and proper. She greets you correctly, the only sign of her middle age being a little creasing at the corners of her eyes, and then turns to the slave. She seems to have researched her skills already, and so performs a skilled inspection without even needing to touch the ${girl}.`);
					if (V.PC.customTitle) {
						t.push(`"${V.PC.customTitle},`);
					} else {
						if (V.arcologies[0].FSEdoRevivalist >= V.FSLockinLevel * 0.9) {
							if (V.PC.title === 1) {
								t.push(`"Honored Emperor,`);
							} else {
								t.push(`"Honored Deity,`);
							}
						} else if (V.arcologies[0].FSEdoRevivalist >= V.FSLockinLevel * 0.6) {
							t.push(`"Honored Shogun,`);
						} else {
							t.push(`"Honored Daimyo,`);
						}
					}
					t.push(`I have appraised your slave. My appraisal is based on ${his} potential income in a brothel, with modification for special matters. I have found the following.`);
					break;
				case "arabian":
					t.push(`a huge, jovial man, sweeps in and fills the room with bonhomie. He wears loose silk pantaloons, a silk sash with a short leather whip thrust into it, and a little jacket that leaves most of his dark-skinned, massive chest bare. After booming a respectful greeting, he turns to the slave. He seems to have asked around about ${his} skills, and so limits himself to a quick physical inspection before rumbling,`);
					if (V.PC.customTitle) {
						t.push(`"${V.PC.customTitle},`);
					} else {
						if (V.arcologies[0].FSArabianRevivalist >= V.FSLockinLevel * 0.9) {
							if (V.PC.title === 1) {
								t.push(`"Honored Caliph,`);
							} else {
								t.push(`"Handmaiden of Allah, your servant's heart is desolate with the honor of looking upon you.`);
							}
						} else if (V.arcologies[0].FSArabianRevivalist >= V.FSLockinLevel * 0.6) {
							if (V.PC.title === 1) {
								t.push(`"Honored Sultan,`);
							} else {
								t.push(`"Sultana, your servant's heart is desolate with the honor of looking upon you.`);
							}
						} else {
							t.push(`"Peace be upon you, honored slaveowner.`);
						}
					}
					t.push(`I have appraised your slave. My appraisal is based on ${his} potential income in the whorehouse, with modification for special matters. As to them, I have found the following.`);
					break;
				case "chinese":
					t.push(`an older and rather stout woman${(V.arcologies[0].FSRepopulationFocusLaw === 1) ? `, with a noticeably heavy pregnancy,` : ``} in traditional Chinese dress, gives you a precise and proper greeting. She extracts a tablet from one of her wide sleeves and reviews video of the slave in action before performing a physical inspection. Then she seats herself, stows her tablet again, and recites in a didactic tone, "Honored`);
					if (V.PC.customTitle) {
						t.push(`"${V.PC.customTitle},`);
					} else {
						if (V.arcologies[0].FSChineseRevivalist >= V.FSLockinLevel * 0.9) {
							if (V.PC.title === 1) {
								t.push(`Emperor and Holder of the Mandate of Heaven,`);
							} else {
								t.push(`Empress and Holder of the Mandate of Heaven,`);
							}
						} else if (V.arcologies[0].FSChineseRevivalist >= V.FSLockinLevel * 0.6) {
							if (V.PC.title === 1) {
								t.push(`Emperor,`);
							} else {
								t.push(`Empress,`);
							}
						} else {
							if (V.PC.title === 1) {
								t.push(`Governor of the Province,`);
							} else {
								t.push(`Governess of the Province,`);
							}
						}
					}
					t.push(`my appraisals are based on a slave's potential income as a prostitute, with modifiers for special characteristics. I have appraised your slave, and I have found the following.`);
					break;
				case "priestess":
					t.push(`a holy woman ordained to provide this service, wears a white surplice that covers her hair and a long white dress — but since she is a priestess of the new religion, not one of the old faiths, the ensemble also includes a white leather corset, chased with gold${(V.arcologies[0].FSRepopulationFocusLaw === 1) ? ` and loosened to accommodate her rounded middle` : ``}, that displays her breasts magnificently. It's easy to tell she's no slave, though, since her nipples are covered. She accepts your gaze with a smile, and assumes a straight-backed recitation posture. "Book of the Slaver, Chapter Seven: the Appraisal, Verse Six. The appraiser shall value a slave based on ${his} income as a whore, with allowances for special qualities, which ${he} shall disclose to the Owner. Amen." She turns to her work, and then adopts her recitation posture again.`);
					if (V.PC.customTitle) {
						t.push(`"${V.PC.customTitle},`);
					} else {
						if (V.arcologies[0].FSChattelReligionistLaw === 1) {
							t.push(`"Prophet, this is an honor.`);
						} else if (V.arcologies[0].FSChattelReligionist >= V.FSLockinLevel * 0.9) {
							t.push(`"Honored Keeper,`);
						} else if (V.arcologies[0].FSChattelReligionist >= V.FSLockinLevel * 0.6) {
							t.push(`"Honored Champion of the Faith,`);
						} else {
							t.push(`"Your Holiness,`);
						}
					}
					t.push(`I have examined your slave in accordance with the Book.`);
					break;
				case "Elite":
					t.push(`a member of the Societal Elite you are familiar with greets you respectfully and `);
					if (V.PC.dick !== 0) {
						t.push(`tosses you a wink as she pats her rounded belly. "He's doing well.`);
					} else {
						t.push(`calms her kicking child so she can continue. "Think he'll look as good as his father?`);
					}
					t.push(`Anyway, as I'm sure you know, ${properTitle()}," she says as she uses curt instructions to direct ${slave.slaveName}, "appraisals are based on a slave's potential worth as a toy, with modifiers for special characteristics." She scrolls down the list. "I'll just mention the interesting ones.`);
					break;
				case "futa":
					t.push(`a curvy, middle aged, and quite attractive woman wearing a tank top and yoga pants greets you cheerfully and turns to the slave. As she does, you can't help but notice that the yoga pants make it obvious she has a penis almost as long as one of her forearms. She makes notes on a tablet, flipping through videos that display the slave in action as she works. "${properTitle()}, I'm, like, sorry to have to say this to you since I know you know it better than I do, but it's the script, you know? Anyway appraisals are based on a slave's potential performance as a public slut, with modifiers for special characteristics." She makes notes. "I'll just mention the significant ones.`);
					break;
				case "businesswoman":
					t.push(`an older${(V.arcologies[0].FSRepopulationFocusLaw === 1) ? `, slightly pregnant` : ``} businesswoman with a reputation for correctness gives you a prim nod before turning to the nude slave without wasting further time. She deftly makes notes on a haptic wrist interface, flipping through videos of the slave in action as she works. "As I'm sure you know, ${properTitle()}," she says as she uses curt instructions to direct ${slave.slaveName}, "appraisals are based on a slave's potential income as a prostitute, with modifiers for special characteristics." Her fingers fly across the interface. "I'll just mention the significant ones.`);
					break;
				case "slaver":
					t.push(`a scarred old slaver with calloused hands and a knowing face, greets you in his companionable way before clapping his hands together and turning to the slave. He switches back and forth between the ${girl} and a battered old tablet with video proving ${his} skills. "Well, as you know `);
					if (V.PC.customTitle) {
						t.push(`${V.PC.customTitle}`);
					} else if (V.PC.title === 1) {
						t.push(`suh,`);
					} else {
						t.push(`madame,`);
					}
					t.push(`" he says as he firmly repositions ${slave.slaveName}, "appraisals are based on a slave's potential income as a whore, with modifiers for special things." He pauses, prodding the tablet. "I'll just mention the main items.`);
					break;
				default:
					t.push(`a fashionably but formally dressed young man with slicked-back hair, greets you correctly before activating an examination visor and reviewing video evidence of the slave's skills. That done, he deactivates the visor and performs a quick physical examination. "As I'm sure you know, ${properTitle()}," he says as he gently repositions ${slave.slaveName} to get a good look at ${him}, "appraisals are based on a slave's potential income as a whore, with modifiers for special characteristics." He pauses, using subvocalizations to make data entries. "I'll just mention the significant ones.`);
			}

			if (V.arcologies[0].FSPetiteAdmirationSMR === 1 || V.arcologies[0].FSStatuesqueGlorificationSMR === 1) {
				if (heightPass(slave)) {
					t.push(`${He} is an attractive height, which is a good start.`);
				}
			}

			if (getBestVision(slave) === 0) {
				t.push(`${His} blindness is an obvious issue.`);
			}

			if (slave.geneticQuirks.albinism === 2) {
				t.push(`${His} albinism makes ${him} rather desirable.`);
			}

			if (slave.milkFlavor !== "none") {
				t.push(`${His} flavored milk makes ${him} rather desired by Pastoralist and other milk lovers`);
			}

			if (slave.geneticQuirks.progeria !== 2 && slave.geneticQuirks.neoteny === 2 && slave.actualAge > slave.visualAge + 5) {
				t.push(`${He} appears to be neotenic, which will turn off some but attract others. Overall should prove positive though.`);
			}

			if (App.Data.Careers.Leader.bodyguard.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Bodyguard; that's valuable.`);
			} else if (App.Data.Careers.Leader.wardeness.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Wardeness; that's valuable.`);
			} else if (App.Data.Careers.Leader.attendant.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Attendant; that's valuable.`);
			} else if (App.Data.Careers.Leader.nurse.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Nurse; that's valuable.`);
			} else if (App.Data.Careers.Leader.matron.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Matron; that's valuable.`);
			} else if (App.Data.Careers.Leader.schoolteacher.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Schoolteacher; that's valuable.`);
			} else if (App.Data.Careers.Leader.stewardess.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Stewardess; that's valuable.`);
			} else if (App.Data.Careers.Leader.milkmaid.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Milkmaid; that's valuable.`);
			} else if (App.Data.Careers.Leader.farmer.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Farmer; that's valuable.`);
			} else if (App.Data.Careers.Leader.madam.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Madam; that's valuable.`);
			} else if (App.Data.Careers.Leader.DJ.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good DJ; that's valuable.`);
			} else if (App.Data.Careers.Leader.HG.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Head Girl; that's valuable.`);
			} else if (App.Data.Careers.Leader.recruiter.includes(slave.career)) {
				t.push(`${His} background would help make ${him} a good Recruiter; that's valuable.`);
			} else if (App.Data.Careers.General.entertainment.includes(slave.career)) {
				t.push(`${His} background should help ${his} flirting a little.`);
			} else if (App.Data.Careers.General.whore.includes(slave.career)) {
				t.push(`${His} background should help ${his} fucking a little.`);
			} else if (App.Data.Careers.General.grateful.includes(slave.career)) {
				t.push(`${His} background should make ${him} a bit more trusting.`);
			} else if (App.Data.Careers.General.menial.includes(slave.career)) {
				t.push(`${His} background should make ${him} a bit more tractable.`);
			} else if (App.Data.Careers.General.servant.includes(slave.career)) {
				t.push(`${His} background should make ${him} a good servant.`);
			}
			if ((V.week - slave.weekAcquired >= 20) && (slave.skill.entertainment >= 100)) {
				if (!App.Data.Careers.General.entertainment.includes(slave.career)) {
					t.push(`${He}'s gotten enough experience as a slave entertainer that ${he} has the added value of a ${girl} with a history in entertainment from before ${he} was a slave.`);
				}
			}
			if (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.mammary + slave.counter.penetrative > 1000) {
				if (!App.Data.Careers.General.whore.includes(slave.career)) {
					t.push(`I see ${he}'s sexually very experienced; that counts as a stand-in for the usual bonus value from having been a sex worker before enslavement.`);
				}
			}

			const careers = [];
			if (slave.skill.headGirl >= Constant.MASTERED_XP && !App.Data.Careers.Leader.HG.includes(slave.career)) {
				careers.push("Head Girl");
			}
			if (slave.skill.recruiter >= Constant.MASTERED_XP && !App.Data.Careers.Leader.recruiter.includes(slave.career)) {
				careers.push("Recruiter");
			}
			if (slave.skill.bodyguard >= Constant.MASTERED_XP && !App.Data.Careers.Leader.bodyguard.includes(slave.career)) {
				careers.push("Bodyguard");
			}
			if (slave.skill.madam >= Constant.MASTERED_XP && !App.Data.Careers.Leader.madam.includes(slave.career)) {
				careers.push("Madam");
			}
			if (slave.skill.DJ >= Constant.MASTERED_XP && !App.Data.Careers.Leader.DJ.includes(slave.career)) {
				careers.push("DJ");
			}
			if (slave.skill.nurse >= Constant.MASTERED_XP && !App.Data.Careers.Leader.nurse.includes(slave.career)) {
				careers.push("Nurse");
			}
			if (slave.skill.teacher >= Constant.MASTERED_XP && !App.Data.Careers.Leader.schoolteacher.includes(slave.career)) {
				careers.push("Schoolteacher");
			}
			if (slave.skill.attendant >= Constant.MASTERED_XP && !App.Data.Careers.Leader.attendant.includes(slave.career)) {
				careers.push("Attendant");
			}
			if (slave.skill.matron >= Constant.MASTERED_XP && !App.Data.Careers.Leader.matron.includes(slave.career)) {
				careers.push("Matron");
			}
			if (slave.skill.stewardess >= Constant.MASTERED_XP && !App.Data.Careers.Leader.stewardess.includes(slave.career)) {
				careers.push("Stewardess");
			}
			if (slave.skill.milkmaid >= Constant.MASTERED_XP && !App.Data.Careers.Leader.milkmaid.includes(slave.career)) {
				careers.push("Milkmaid");
			}
			if (slave.skill.farmer >= Constant.MASTERED_XP && !App.Data.Careers.Leader.farmer.includes(slave.career)) {
				careers.push("Farmer");
			}
			if (slave.skill.wardeness >= Constant.MASTERED_XP && !App.Data.Careers.Leader.wardeness.includes(slave.career)) {
				careers.push("Wardeness");
			}
			if (slave.skill.servant >= Constant.MASTERED_XP && !App.Data.Careers.General.servant.includes(slave.career)) {
				careers.push("Servant");
			}
			if (slave.skill.entertainer >= Constant.MASTERED_XP && !App.Data.Careers.General.entertainment.includes(slave.career)) {
				careers.push("Entertainer");
			}
			if (slave.skill.whore >= Constant.MASTERED_XP && !App.Data.Careers.General.whore.includes(slave.career)) {
				careers.push("Whore");
			}
			if (careers.length > 0) {
				t.push(`${He} has working experience as a`);
				if (careers.length > 1) {
					t.push(`${toSentence(careers)}.`);
				} else {
					t.push(`${careers[0]}, providing ${him} the same additional value if ${he} had a relevant career.`);
				}
			}

			if (slave.behavioralFlaw !== "none") {
				if (slave.sexualFlaw !== "none") {
					t.push(`${He} has both a behavioral flaw and a sexual flaw; those are both minor negatives.`);
				} else {
					t.push(`${He} has a behavioral flaw, which is a minor negative.`);
				}
			}
			if (slave.sexualFlaw === "breeder" && FutureSocieties.isActive('FSRepopulationFocus')) {
				t.push(`${He} is obsessed with breeding, which will make ${him} very popular in your arcology.`);
			} else if (slave.sexualFlaw !== "none") {
				if (slave.behavioralFlaw === "none") {
					t.push(`${He} has a sexual flaw, which is a minor negative.`);
				}
			}
			if (slave.behavioralFlaw !== "none" || slave.sexualFlaw !== "none") {
				if (slave.behavioralQuirk !== "none") {
					if (slave.sexualQuirk !== "none") {
						t.push(`On the other hand, ${he} has both a behavioral quirk and a sexual quirk; those are both minor positives.`);
					} else {
						t.push(`On the other hand, ${he} has a behavioral quirk, which is a minor positive.`);
					}
				} else if (slave.sexualQuirk !== "none") {
					t.push(`On the other hand, ${he} has a sexual quirk, which is a minor positive.`);
				}
			} else {
				if (slave.behavioralQuirk !== "none") {
					if (slave.sexualQuirk !== "none") {
						t.push(`${He} has both a behavioral quirk and a sexual quirk; those are both minor positives.`);
					} else {
						t.push(`${He} has a behavioral quirk, which is a minor positive.`);
					}
				} else if (slave.sexualQuirk !== "none") {
					t.push(`${He} has a sexual quirk, which is a minor positive.`);
				}
			}

			if (slave.fetish === Fetish.MINDBROKEN) {
				t.push(`It's a shame ${he}'s mindbroken. From a price perspective.`);
			} else if (slave.fetish !== Fetish.NONE && slave.fetishKnown === 1) {
				t.push(`${His} fetish is good for performance, of course, but it adds a little bonus to value, too.`);
			} else if (slave.fetishKnown === 1) {
				t.push(`${His} tastes are a tad plain, but at least it won't hurt ${his} value.`);
			} else {
				t.push(`It's a pity there's no information on ${his} fetishes. Without it, buyers tend to assume the worst.`);
			}

			if (slave.attrKnown === 1) {
				if (slave.energy > 95) {
					t.push(`Nymphomania adds a major price bonus.`);
				}
			} else {
				t.push(`With ${his} sex drive not well tested, I cannot award ${him} any value in that area.`);
			}

			if (slave.vagina === 0) {
				t.push(`Virgin pussies are less common than you might think; that's a minor positive.`);
			}
			if (V.arcologies[0].FSRepopulationFocusSMR !== 0) {
				if (slave.preg < -1) {
					t.push(`The lack of an ability to become pregnant greatly decreases value, the global market being what it is.`);
				} else if (slave.bellyPreg >= 300000) {
					t.push(`That belly is all child? Incredible. Such fertility will price ${him} very high, the global market being what it is.`);
				} else if (slave.bellyPreg >= 120000) {
					t.push(`Such a massive pregnancy demands a high value, the global market being what it is.`);
				} else if (slave.preg > slave.pregData.normalBirth / 4) {
					t.push(`The advanced pregnancy adds a little value, the global market being what it is.`);
				}
			} else if (V.arcologies[0].FSRestartSMR !== 0) {
				if (slave.preg < -1) {
					t.push(`${His} infertility improves ${his} value, since ${his} kind should not be allowed to reproduce.`);
				} else if (slave.bellyPreg >= 300000) {
					t.push(`That belly is all child? How horrible. ${He}'d make a better example of the horrors of pregnancy than a sex slave.`);
				} else if (slave.bellyPreg >= 30000) {
					t.push(`What a disgusting creature, that filth inside ${him} will destroy ${his} value.`);
				} else if (slave.preg > slave.pregData.normalBirth / 4) {
					t.push(`What a waste, if ${he} weren't pregnant, ${he} might be worth something.`);
				}
			} else {
				if (slave.ovaries === 0 && slave.vagina > -1 && slave.genes === "XY") {
					t.push(`The lack of a natural vagina still removes a little value, the global market being what it is.`);
				} else if (slave.bellyPreg >= 300000) {
					t.push(`Such an obscene and life threatening display of fertility will turn off most buyers and considerably damage ${his} value, the global market being what it is.`);
				} else if (slave.bellyPreg >= 120000) {
					t.push(`Such a massive and dangerous pregnancy removes some value, the global market being what it is.`);
				} else if (slave.preg > slave.pregData.normalBirth / 4) {
					t.push(`The advanced pregnancy removes a little value, the global market being what it is.`);
				}
			}
			if (slave.mpreg === 1) {
				t.push(`What's this strange organ listed here? ${He} can become anally pregnant? That will certainly interest some buyers.`);
			}
			if (slave.pregWeek < 0) {
				t.push(`${He} seems a little uncomfortable with ${his} holes being touched. By the feel of it, ${he} is a new mother, no? A lack of receptivity will not go over well with buyers; it may more profitable to let ${him} recover first.`);
			}
			const intelligenceScore = (slave.intelligenceImplant < 0 ? slave.intelligence + slave.intelligenceImplant : slave.intelligence); // negative education makes a slave seem slower than they are
			if (V.arcologies[0].FSIntellectualDependencySMR === 1) {
				if (intelligenceScore >= -15) {
					t.push(`${He}'s too smart to be of interest to local bidders, but there is still a demand for smart slaves elsewhere.`);
					if (slave.intelligenceImplant >= 15) {
						t.push(`${His} education is an added positive too, in that regard.`);
					}
				} else {
					t.push(`${His} idiotic mind will draw in local bids.`);
				}
			} else if (V.arcologies[0].FSSlaveProfessionalismSMR === 1) {
				if (intelligenceScore <= 50) {
					t.push(`${He}'s nowhere near smart enough to compete with the local markets, so outside bids are going to be the only option.`);
				} else {
					t.push(`${His} brain is probably going to bring in very generous bids on its own.`);
					if (slave.intelligenceImplant >= 15) {
						t.push(`${His} education is an added positive, beyond that.`);
					} else {
						t.push(`${He}'s uneducated, though, which will turn off some buyers.`);
					}
				}
			} else {
				if (intelligenceScore > 95) {
					t.push(`${His} genius is probably going to bring in very generous bids.`);
					if (slave.intelligenceImplant >= 15) {
						t.push(`${His} education is an added positive, beyond that.`);
					}
				} else if (intelligenceScore > 15) {
					t.push(`Of course, ${his} intelligence is an asset outside of its sexual applications.`);
					if (slave.intelligenceImplant >= 15) {
						t.push(`${His} education is an added positive, beyond that.`);
					}
				} else if (intelligenceScore < -15) {
					t.push(`Of course, ${his} stupidity will be a minor negative.`);
					if (slave.intelligenceImplant >= 15) {
						t.push(`${His} education will help ameliorate that in price terms.`);
					} else {
						t.push(`${He}'s uneducated, too.`);
					}
				} else if (intelligenceScore < -95) {
					t.push(`${His} sheer idiocy will likely hamper bids.`);
					if (slave.intelligenceImplant >= 15) {
						t.push(`${His} education will help a little, though I can't imagine the hassle it must have been to get ${him} to remember anything.`);
					} else {
						t.push(`${He}'s uneducated, too, not that there's a surprise in that.`);
					}
				}
			}

			if (slave.anus === 0) {
				t.push(`${His} virgin anus is a minor positive, since anal defloration is in such high demand.`);
			}

			if (slave.vagina > -1) {
				if (slave.dick > 0) {
					t.push(`${He} has both sets of equipment, I see; that's very valuable.`);
					if (slave.ovaries > 0 && slave.balls > 0 && slave.ballType !== "sterile") {
						if (V.arcologies[0].FSRestartSMR === 1) {
							t.push(`And both are fertile? Horrible. Such fertility is wasted on trash.`);
						} else {
							t.push(`And both are fertile? Incredible. ${He}'ll appraise extremely well for that.`);
						}
					}
				}
			}

			if (slave.pubertyXY === 0 && slave.physicalAge >= V.potencyAge && !FutureSocieties.isActive('FSGenderRadicalist') && slave.balls > 0) {
				t.push(`${He} never went through male puberty, that's a plus.`);
			}

			if (slave.prestige > 0) {
				t.push(`I see notes on ${his} notoriety in ${his} file. That will drive up ${his} price.`);
			}

			if (slave.porn.prestige === 3) {
				t.push(`${He}'s pretty popular in ${slave.porn.fameType} smut, isn't ${he}? Buyers will be lining up for ${him}.`);
			} else if (slave.porn.prestige === 2) {
				t.push(`${He}'s gained quite the following in ${slave.porn.fameType} smut. In fact, I've even seen some of ${his} smut; buyers will flock to ${him}.`);
			} else if (slave.porn.prestige === 1) {
				t.push(`${He}'s got a small fanbase in ${slave.porn.fameType} smut. Who knows? Maybe one of them will want ${him} all to themselves?`);
			}
			let trustPositive;
			if (slave.devotion > 95) {
				t.push(`${His} worshipfulness is a major positive`);
				trustPositive = 1;
			} else if (slave.devotion > 50) {
				t.push(`${His} devotion is a significant positive`);
				trustPositive = 1;
			} else if (slave.devotion > 20) {
				t.push(`${His} acceptance of slavery is a minor positive`);
				trustPositive = 1;
			} else if (slave.devotion >= -20) {
				t.push(`${His} acceptance of slavery is equivocal`);
				trustPositive = 0;
			} else if (slave.devotion >= -50) {
				t.push(`${His} resistance to slavery is a minor negative`);
				trustPositive = 0;
			} else if (slave.devotion >= -75) {
				t.push(`${His} hatred of slavery is a significant negative`);
				trustPositive = -1;
			} else {
				t.push(`${His} rebelliousness is a major negative`);
				trustPositive = -1;
			}
			if (trustPositive === 1) {
				if (slave.trust > 95) {
					t.push(`and ${his} powerful trust is a major positive.`);
				} else if (slave.trust > 50) {
					t.push(`and ${his} trust is a significant positive.`);
				} else if (slave.trust > 20) {
					t.push(`and ${his} carefulness is a minor positive.`);
				} else if (slave.trust >= -20) {
					t.push(`and ${his} fearfulness is equivocal.`);
				} else if (slave.trust >= -50) {
					t.push(`but ${his} fear is a minor negative.`);
				} else if (slave.devotion >= -90) {
					t.push(`but ${his} terrified state is a significant negative.`);
				} else {
					t.push(`but ${his} abjectly terrified state is a major negative.`);
				}
			} else if (trustPositive === 0) {
				if (slave.trust > 95) {
					t.push(`but ${his} powerful trust is worrisome.`);
				} else if (slave.trust > 50) {
					t.push(`but ${his} trust is a little out of place.`);
				} else if (slave.trust > 20) {
					t.push(`and ${his} carefulness is a minor positive.`);
				} else if (slave.trust >= -20) {
					t.push(`and ${his} fearfulness is useful.`);
				} else if (slave.trust >= -50) {
					t.push(`and ${his} fear is useful.`);
				} else if (slave.devotion >= -90) {
					t.push(`but ${his} terrified state will aid in fully breaking ${him}.`);
				} else {
					t.push(`but ${his} abjectly terrified state will make it easy to break ${him}.`);
				}
			} else {
				if (slave.trust > 95) {
					t.push(`and ${his} powerful trust is a problem.`);
				} else if (slave.trust > 50) {
					t.push(`and ${his} trust is troublesome.`);
				} else if (slave.trust > 20) {
					t.push(`and ${his} carefulness is bad sign.`);
				} else if (slave.trust >= -20) {
					t.push(`but ${his} fearfulness is useful.`);
				} else if (slave.trust >= -50) {
					t.push(`but ${his} fear is useful.`);
				} else if (slave.devotion >= -90) {
					t.push(`but ${his} terrified state will aid in fully breaking ${him}.`);
				} else {
					t.push(`but ${his} abjectly terrified state will make it easy to break ${him}.`);
				}
			}

			const brands = App.Medicine.Modification.brandRecord(slave);
			if (!jQuery.isEmptyObject(brands)) {
				if (V.rep > 10000) {
					t.push(`I see ${he}'s branded with your mark; with your stellar reputation, that will make ${him} appraise better.`);
				} else if (V.rep < 5000) {
					t.push(`I see ${he}'s branded with your mark; unfortunately, that will make ${him} appraise slightly less well.`);
				} else {
					t.push(`I see ${he}'s branded with your mark; that won't have a significant impact.`);
				}
			}
			let timeBeforeAgeRetirement = 52 - slave.birthWeek;
			if (V.policies.retirement.physicalAgePolicy === 1) {
				timeBeforeAgeRetirement += 52 * (V.retirementAge - (slave.physicalAge + 1));
			} else {
				timeBeforeAgeRetirement += 52 * (V.retirementAge - (slave.actualAge + 1));
			}

			if (slave.indenture > -1) {
				t.push(`Though I dislike mentioning something so obvious, being an indentured servant will have a huge impact on ${his} valuation, especially since ${he} has just ${slave.indenture} weeks remaining on ${his} contract.`);
			} else if (timeBeforeAgeRetirement < 260) {
				t.push(`Since ${he} has a mere ${timeBeforeAgeRetirement} weeks left until the local retirement age for sex slaves, buyers will be willing to offer much less for ${him}.`);
			}

			if (V.arcologies[0].FSSupremacistLawME !== 0 && slave.race !== V.arcologies[0].FSSupremacistRace) {
				t.push(`Your supremacism has pushed a lot of subhumans like ${him} into the market, so offers will be low.`);
			} else if (V.arcologies[0].FSSubjugationistLawME !== 0 && slave.race === V.arcologies[0].FSSubjugationistRace) {
				t.push(`Your subjugationism has pushed a lot of animals like ${him} into the market, so ${his} race marks ${him} as low quality.`);
			}
			if (V.arcologies[0].FSRepopulationFocusSMR !== 0) {
				if (slave.pregKnown === 1) {
					t.push(`Pregnant slaves appraise quite well, thanks to your leadership on repopulation.`);
				}
			}
			if (V.arcologies[0].FSRestartSMR !== 0) {
				if (slave.dick > 0) {
					t.push(`Subhumans with dicks appraise less well, since they don't need them.`);
				}
				if (slave.balls > 0) {
					t.push(`${He} has balls too. A slave that can impregnate is worth little under your vision of the future.`);
				}
				if (slave.vagina > 0) {
					t.push(`Subhumans with vaginas appraise less well, since they don't need them.`);
				}
				if (slave.ovaries > 0) {
					t.push(`${He} can get pregnant too. A slave that can bear children is worth little under your vision of the future.`);
				}
			}
			if (V.arcologies[0].FSHedonisticDecadenceSMR !== 0) {
				if (slave.weight > 60 && slave.muscles < 5) {
					t.push(`Plush, soft slaves like ${him} appraise well, thanks to the shifting views on beauty.`);
				}
			}
			if (V.arcologies[0].FSGenderFundamentalistSMR !== 0) {
				if (slave.dick > 0) {
					t.push(`Slaves with dicks appraise less well, thanks to your leadership on gender.`);
					if (slave.balls > 0) {
						t.push(`That's especially true for ${him}, since ${he} still has ${his} balls.`);
					}
				}
			}
			if (V.arcologies[0].FSGenderRadicalistLawFuta !== 0) {
				if (V.arcologies[0].FSGenderRadicalistLawFuta === 1) {
					if (slave.dick > 0) {
						if (slave.vagina > -1) {
							t.push(`Futas appraise better than ever, thanks to your leadership on gender.`);
						}
					}
				} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 2) {
					if (slave.dick > 0) {
						if (slave.balls > 0) {
							t.push(`Slaves with cocks and balls appraise quite well, thanks to your leadership on gender.`);
						}
					}
				} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 4) {
					if (slave.boobs <= 400) {
						if (slave.dick.isBetween(0, 3)) {
							if (slave.balls.isBetween(0, 3)) {
								t.push(`Slaves with such cute little parts appraise quite well, thanks to your leadership on gender.`);
							}
						}
					}
				} else {
					if (slave.butt >= 5) {
						if (slave.anus >= 2) {
							if (slave.hips >= 1) {
								if (slave.skill.anal > 60) {
									t.push(`Slaves with big butts and skilled anuses appraise quite well, thanks to your leadership on gender.`);
								}
							}
						}
					}
				}
			}
			if (V.arcologies[0].FSArabianRevivalist > 50) {
				t.push(`And of course, we can't forget the premium you get on selling slaves.`);
			}

			if (V.arcologies[0].FSNeoImperialist > 40) {
				t.push(`And of course, you'll receive a premium for the nobility of such Imperial slaves.`);
			}

			switch (appraiser) {
				case "roman":
					t.push(`That is all." He rolls his screen-scroll up and tucks it into his toga, and nods. "A pleasure."`);
					break;
				case "imperial":
					t.push(`That will be all, your Highness." He dismisses the holographic screen with a flick of his cybernetically-suited wrist, smiles once more, and leaves with a flourish of the short white cape behind him.`);
					break;
				case "aztec":
					t.push(`That's all. Thank you." She turns to go, her long cape swiveling in the air, showing a glimpse of her `);
					if (V.arcologies[0].FSRepopulationFocusLaw === 1) {
						t.push(`fecund`);
					} else {
						t.push(`pleasant`);
					}
					t.push(`figure.`);
					break;
				case "egyptian":
					t.push(`That's all. Thank you for this delightful opportunity." She turns to go, but turns again in the doorway to offer another deep bow, this one so low that her linen dress discloses just a hint of her dimpled rear.`);
					break;
				case "edo":
					t.push(`That is all. Thank you." She performs a perfect bow and retreats.`);
					break;
				case "arabian":
					t.push(`That is all. ${He} may fetch a fine price, if the Almighty will it." He bows deeply and backs out the door.`);
					break;
				case "chinese":
					t.push(`That is all." She bows and backs out the door.`);
					break;
				case "priestess":
					t.push(`Amen." She forms a holy symbol with her hands, kneels before you to bow so low that her cleavage presses against the floor, and retreats.`);
					break;
				case "futa":
					t.push(`That's all. Thanks! Cute ${girl}." She goes, but pauses in the doorway to give you a little wave.`);
					break;
				case "Elite":
					t.push(`That's all. `);
					if (V.PC.dick !== 0) {
						t.push(`See you around! Have to have a few other guy's kids before we can have some more fun, but I'll keep you in mind!"`);
					} else {
						t.push(`See you around, we'll have to go drinking after I'm done sometime!"`);
					}
					t.push(`She waves as she leaves.`);
					break;
				case "businesswoman":
					t.push(`That will be all. Thank you, and good day." She bows curtly and goes.`);
					break;
				case "slaver":
					t.push(`That's all I've got for you, `);
					if (V.PC.customTitle) {
						t.push(`${V.PC.customTitle},`);
					} else if (V.PC.title === 1) {
						t.push(`suh,`);
					} else {
						t.push(`ma'am,`);
					}
					t.push(`thank you kindly." He offers a genteel bow and leaves.`);
					break;
				default:
					t.push(`And that is all. Thank you." He nods in a businesslike fashion and departs.`);
			}

			t.push(App.UI.DOM.makeElement("h2", `Financial Records`));
			t.push(slaveExpenses(slave));
		}/* CLOSES APPRAISAL */
	}/* closes breeding mark */
	App.Events.addParagraph(scene, t);

	if (isShelterSlave(slave)) {
		App.Events.addParagraph(scene, [`${He} was placed in your care by the Slave Shelter. Selling ${him} will `, App.UI.DOM.makeElement("span", "violate your contract with them.", ["reputation", "dec"])]);
	}

	/**
	 * @typedef {object} slaveBuyerData
	 * @property {number} cost
	 * @property {string} offerDesc
	 * @property {boolean} requirements
	 * @property {number} percentOdds
	 * @property {Array<string|HTMLElement|DocumentFragment>} [completeSale]
	 * @property {boolean} [allowsBoomerang=true]
	 */

	/** @type {Map<string, slaveBuyerData>}*/
	let buyers;
	if (slave.breedingMark === 1 && V.propOutcome === 1 && FutureSocieties.isActive('FSRestart')) {
		buyers = new Map([[
			"elite auction",
			{
				cost: 1.1,
				offerDesc: `is what the current bid for ${him} stands at.`,
				get requirements() { return true; },
				percentOdds: 100,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is quickly escorted out by ${his} new master. ${He} is rarely seen in public anymore, but ${his} records show ${he} is settling well into being ${his} new owner's breeder.`);
					for (const s of V.slaves) {
						if (s.breedingMark !== 1 && V.propOutcome === 1) {
							s.devotion -= 5;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your non-chosen slaves <span class="devotion dec">resent</span> you for denying them the special treatment ${slave.slaveName} is receiving.`);
					}
					return r;
				},
				allowsBoomerang: false
			}
		]]);
	} else if (slave.geneticQuirks.progeria === 2 && slave.physicalAge >= 45) {
		buyers = new Map([[
			"progeria",
			{
				cost: random(2, 20) / 100,
				offerDesc: `The current offer for ${him} stands at`,
				get requirements() { return true; },
				percentOdds: 100,
			}
		]]);
	} else {
		(App.UI.DOM.appendNewElement("h2", scene, `Bids Received`));
		buyers = getBuyers();
		const relist = App.UI.DOM.appendNewElement("div", scene, App.UI.DOM.link(
			`Re-list ${him}`,
			() => {
				cashX(-500, "personalBusiness");
				App.UI.reload();
			}
		));
		App.UI.DOM.appendNewElement("span", relist, ` This will cost ${cashFormat(500)}`);
	}
	if (V.debugMode) {
		App.UI.DOM.appendNewElement("div", scene, `Estimated value: `).append(costObj.report);
	}
	const buyerKeys = [];
	for (const [key, obj] of buyers) {
		if (!obj.requirements || (V.cheatMode === 0 && random(1, 100) > obj.percentOdds)) {
			continue;
		}
		buyerKeys.push(key);
	}

	const sortedBuyerKeys = buyerKeys.sort((a, b) => buyers.get(b).cost - buyers.get(a).cost);
	sortedBuyerKeys.forEach(b => scene.append(buyerLink(b)));
	return scene;

	function buyerLink(key) {
		const saleNode = new DocumentFragment();
		const buyer = buyers.get(key);
		const r = [];
		const cashColor = buyer.cost >= 1.0 ? ["cash"] : undefined; // Green text if the buyer is offering at or above slaveCost(), white if below.
		const actualCost = 500 * Math.trunc(cost * buyer.cost / 500);
		r.push(App.UI.DOM.makeElement("span", cashFormat(actualCost), cashColor));
		r.push(buyer.offerDesc);
		if (V.debugMode) {
			r.push(App.UI.DOM.makeElement("span", `(${key})`));
		}
		r.push(App.UI.DOM.link(
			"Accept bid",
			() => {
				V.nextButton = "Back to Main";
				V.nextLink = "Main";
				App.UI.StoryCaption.encyclopedia = "Personal Assistant";
				App.Utils.scheduleSidebarRefresh();
				const resultNode = new DocumentFragment();
				const allowsBoomerang = !buyer.hasOwnProperty("allowsBoomerang") || buyer.allowsBoomerang;
				const slaveCanBoomerang = () => (
					(
						((slave.actualAge < V.retirementAge - 1) && V.policies.retirement.physicalAgePolicy === 0) ||
						((slave.physicalAge < V.retirementAge - 1) && V.policies.retirement.physicalAgePolicy === 1)
					) && slave.fuckdoll === 0 && canWalk(slave) && canTalk(slave) && slave.fetish !== Fetish.MINDBROKEN && slave.devotion > 50 &&
					(slave.trust > 95 || slave.trust < -20 || (slave.intelligence + slave.intelligenceImplant < -15))
				);

				if (allowsBoomerang && slaveCanBoomerang() && (!V.boomerangSlave || V.boomerangWeeks > 15)) {
					V.boomerangSlave = clone(slave);
					V.boomerangWeeks = 1;
					V.boomerangBuyer = key;
					V.boomerangSlave.assignment = Job.REST;
					V.boomerangStats = {
						PCpregSource: 0, PCmother: 0, PCfather: 0, boomerangMother: [], boomerangFather: [], boomerangPregSources: [], boomerangMotherTank: [], boomerangFatherTank: [], boomerangRelationship: 0, boomerangRivalry: 0, boomerangRelation: 0, boomerangBody: 0
					};
					if (V.AS === V.PC.pregSource) {
						V.boomerangStats.PCpregSource = V.AS;
					}
					if (V.PC.mother === V.AS) {
						V.boomerangStats.PCmother = V.AS;
					}
					if (V.PC.father === V.AS) {
						V.boomerangStats.PCfather = V.AS;
					}
					for (const s of V.slaves) { // TODO: review for hyper fertility compatibility
						if (s.ID !== V.AS) {
							if (s.mother === V.AS) {
								V.boomerangStats.boomerangMother.push(s.ID);
							}
							if (s.father === V.AS) {
								V.boomerangStats.boomerangFather.push(s.ID);
							}
							if (V.AS === s.pregSource) {
								V.boomerangStats.boomerangPregSources.push(s.ID);
							}
						}
					}
					if (V.incubator.capacity > 0) {
						for (const child of V.incubator.tanks) {
							if (V.AS === child.mother) {
								V.boomerangStats.boomerangMotherTank.push(child.ID);
							}
							if (V.AS === child.father) {
								V.boomerangStats.boomerangFatherTank.push(child.ID);
							}
						}
					}
					if (V.nursery > 0) {
						for (const child of V.cribs) {
							if (V.AS === child.mother) {
								V.boomerangStats.boomerangMotherTank.push(child.ID);
							}
							if (V.AS === child.father) {
								V.boomerangStats.boomerangFatherTank.push(child.ID);
							}
						}
					}
					V.boomerangSlave.sisters = 0;
					V.boomerangSlave.daughters = 0;
					if (slave.relationship > 0) {
						V.boomerangStats.boomerangRelationship = slave.relationshipTarget;
					}
					if (slave.rivalry > 0) {
						V.boomerangStats.boomerangRivalry = slave.rivalryTarget;
					}
					if (slave.bodySwap > 0) {
						const myBody = V.slaves.find(s => s.origBodyOwnerID === V.AS);
						if (myBody) {
							V.boomerangStats.boomerangBody = myBody.ID;
						}
					}
				}
				resultNode.append(App.Interact.Sale.separationReactions(slave));
				cashX(actualCost, "slaveTransfer");
				App.Events.addParagraph(resultNode,
					buyer.hasOwnProperty("completeSale")
						? buyer.completeSale
						: [`The buyer forwards payment and sends a purchasing agent to collect ${him}. There is nothing more to be done.`]
				);
				jQuery(scene).empty().append(resultNode);
				removeSlave(slave);
			}
		));
		App.Events.addNode(saleNode, r, "div");
		return saleNode;
	}

	function getBuyers() {
		/** @type {Map<string, slaveBuyerData>} */
		const buyers = new Map([
			["housekeeper", {
				cost: 0.9,
				offerDesc: `from a polite older citizen looking for a housekeeper and bedwarmer.`,
				get requirements() { return ((slave.physicalAge > 30) && (slave.devotion > 20)); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} settles into ${his} new life in a humbler part of ${V.arcologies[0].name}, and can occasionally be seen accompanying ${his} master in public.`);
					for (const s of V.slaves) {
						if (s.trust >= -20) {
							if (s.physicalAge > 30) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other older, obedient slaves are <span class="trust inc">reassured</span> that if they're sold, they can hope for better than life in a cheap brothel.`);
					}
					return r;
				}
			}],
			["preg fetishist", {
				cost: 1.05,
				offerDesc: `from a male citizen who wants to ensure his posterity by using ${him} to carry his children.`,
				get requirements() { return ((isFertile(slave) && V.seePreg !== 0) && cost > 10000); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} settles in to ${his} new role easily enough; ${he}'s one of the most pampered slaves in the arcology. All ${he}'s expected to do is light housework and self-maintenance, along with gentle unprotected vaginal sex with ${his} new master.`);
					for (const s of V.slaves) {
						if (s.fetish === "pregnancy") {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves with pregnancy fetishes envy ${him}, and <span class="trust inc">trust that even if you decide to sell them,</span> they'll find themselves in a sexually satisfying life.`);
					}
					return r;
				}
			}],
			["organ crafter", {
				cost: 1.05,
				offerDesc: `from an organ modifier interested in ${his} anal womb.`,
				get requirements() { return ((isFertile(slave) && V.seePreg !== 0) && slave.mpreg === 1); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is seen in a research report nine months later; ${he} has undergone some interesting changes. As expected by someone interested in ${his} odd womb, ${he} is quite pregnant, but what really stands out is the massive size of ${his} testicles and ${his} huge round implants. A quick glance at the article reveals that they aren't implants; in fact, ${his} breasts and testicles are rounded with children.`);
					for (const s of V.slaves) {
						if (s.mpreg === 1) {
							s.trust -= 5;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other anally fertile slaves <span class="trust dec">are concerned</span> that they may end up carrying children in more than just their bellies.`);
					}
					return r;
				},
				allowsBoomerang: false
			}],
			["womb filler", {
				cost: 0.85,
				offerDesc: `from a pharmaceuticals corporation looking for fertile virgins for testing extreme fertility drugs.`,
				get requirements() { return ((isFertile(slave) && V.seePreg !== 0) && V.seeHyperPreg === 1 && V.seeExtreme === 1 && slave.vagina === 0); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}`);
					r.push(`is seen in a drug report nine months later; ${he} is unrecognizable. ${His} gaunt body is completely bloated by ${his} enormous womb, leaving`);
					if (!isAmputee(slave)) {
						r.push(`what's left of ${his}`);
						if (hasAnyArms(slave)) {
							r.push((hasBothArms(slave)) ? `arms` : `arm`);
							if (hasAnyLegs(slave)) {
								r.push(`and`);
							}
						}
						if (hasAnyLegs(slave)) {
							r.push(hasBothLegs(slave) ? `legs` : `leg`);
						}
						r.push(`dangling`);
					} else {
						r.push(`${his} torso teetering`);
					}
					r.push(`pathetically atop its quivering mass. The headline reads "New drug allows for upwards of seven hundred children carried at once". Live on stream, ${his} body loses stability and ruptures, flooding the room with fluid and children.`);
					for (const s of V.slaves) {
						if (s.vagina === 0) {
							if (isFertile(s)) {
								s.trust -= 20;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other virgins <span class="trust dec">are terrified they'll meet a similar fate</span> if they cannot convince you to fill their wombs with your children.`);
					}
					return r;
				},
				allowsBoomerang: false
			}],
			["eugenics arcology", {
				cost: 1.1,
				offerDesc: `from a fellow arcology owner seeking a smart, pretty slave to use as a breeder to produce superior children.`,
				get requirements() { return ((isFertile(slave) && V.seePreg !== 0) && slave.intelligence > 50) && slave.face >= 55 && slave.faceShape !== "masculine"; },
				percentOdds: 90,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is seen nearly a year later, happy and healthy, along with ${his} owner and newborn son. They are quite a good looking family.`);
					for (const s of V.slaves) {
						if (s.intelligence + s.intelligenceImplant < -15) {
							if (isFertile(s)) {
								s.devotion -= 2;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your more idiotic slaves are <span class="devotion dec">deeply jealous</span> of ${slave.slaveName}'s new pampered lifestyle, oblivious to the demanding nature of eugenics.`);
					}
					return r;
				},
				allowsBoomerang: false
			}],
			["repopulationist arcology", {
				cost: 1.05,
				offerDesc: `from a fellow arcology owner focusing on building a future society based on his genes: he seeks fertile virgins with wide hips, feeling they will be the best mothers.`,
				get requirements() { return ((isFertile(slave) && V.seePreg !== 0) && slave.hips > 1 && slave.vagina === 0); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is seen nine months later with an enormous pregnancy and the most content look on ${his} face. ${He}`);
					if (hasAnyArms(slave)) {
						r.push(`gently pats ${his} quadruplet-filled belly and lets off a moan as ${his} children kick in response.`);
					} else {
						r.push(`moans lewdly as ${his} children kick away in ${his} womb.`);
					}
					for (const s of V.slaves) {
						if (s.vagina === 0) {
							if (isFertile(s)) {
								if (s.fetish === "pregnancy") {
									s.devotion -= 2;
									slaveImpact = 1;
								}
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other pregnancy fetishists <span class="devotion dec">are jealous</span> of ${slave.slaveName}'s good fortune.`);
					}
					return r;
				},
				allowsBoomerang: false
			}],
			["virgin trader", {
				cost: 1.3,
				offerDesc: `from a slave trader with a notorious virgin impregnation fetish: he uses his work to provide himself with an endless supply of virgins to knock up and resell.`,
				get requirements() { return ((isFertile(slave) && V.seePreg !== 0) && slave.vagina === 0); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is seen in a shipment of slaves leaving the arcology a month later, with just the slightest hint of a gravid belly and a worn-down expression on ${his} face.`);
					for (const s of V.slaves) {
						if (s.vagina === 0) {
							if (s.ovaries === 1) {
								s.trust -= 2;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other virgins <span class="trust dec">fear they'll be subjected to similar abuse</span> if they cannot make their virginities otherwise valuable or appealing to you.`);
					}
					return r;
				}
			}],
			["abortion TV", {
				cost: 1.05,
				offerDesc: `from a group that takes pleasure in performing abortions on live TV.`,
				get requirements() { return (V.seePreg !== 0 && V.seeHyperPreg === 1 && V.seeExtreme === 1 && (slave.preg > slave.pregData.normalBirth / 2) && (slave.bellyPreg >= 300000)); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is soon seen on live TV, restrained and still grotesquely pregnant. ${He} screams into ${his} restraints as the host approaches with a comically large syringe of abortifacients and drives it deep into ${his} womb. Within minutes, a flood of liquid and fetuses are pouring from ${his} gaping cunt, all the while he times how long it takes ${his} overburdened womb to drain of all its contents.`);
					for (const s of V.slaves) {
						if (s.bellyPreg >= 300000) {
							s.trust -= 15;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other hyper pregnant slaves <span class="trust dec">are terrified that their children will be ripped from them</span> if they don't please you.`);
					}
					return r;
				},
				allowsBoomerang: false
			}],
			["nipple fetishist", {
				cost: 1.05,
				offerDesc: `from a female citizen with a very specific fetish: she loves breasts to the point of enjoying slaves with nipples large enough to meaningfully penetrate her.`,
				get requirements() { return (slave.nipples === "huge"); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s new mistress is an exhibitionist as well as a nipple fetishist, and before long, she's seen in the club, riding ${slave.slaveName}'s chest with her wet pussy. The slave is expected to keep ${his} nipples erect for her at all times.`);
					for (const s of V.slaves) {
						if (s.fetish === "boobs") {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves with breast fetishes envy ${him}, and <span class="trust inc">trust that even if you decide to sell them,</span> they'll find themselves in a sexually satisfying life.`);
					}
					return r;
				}
			}],
			["nipple fucker", {
				cost: 1.1,
				offerDesc: `from a male citizen with a kink that's hard to satisfy: he loves nipple fucking, but hates how breasts just don't work that way.`,
				get requirements() { return (slave.nipples === "fuckable"); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s new master is an exhibitionist as well as a nipple fetishist, and before long, he's seen in the club, plowing ${slave.slaveName}'s engorged breasts. Since nipple cunts aren't naturally lubricated, some owners find stimulating milk production a suitable replacement; judging from the pooling fluids and sympathetic gushes from ${his} ignored tit, he is one of them.`);
					for (const s of V.slaves) {
						if (s.fetish === "boobs") {
							if (s.fetishKnown === 1) {
								if (s.nipples === "fuckable") {
									s.trust += 1;
									slaveImpact = 1;
								}
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves in love with their own fuckable breasts envy ${him}, and <span class="trust inc">trust that even if you decide to sell them,</span> they'll find themselves in a sexually satisfying life, even if your average guy can only satisfy one breast at a time.`);
					}
					return r;
				}
			}],
			["anal fetishist", {
				cost: 1.05,
				offerDesc: `from a citizen who enjoys buttfucking slaves with the necessary equipment, willingness, and anal skill to reward his efforts with messy, hands-free orgasms of their own.`,
				get requirements() { return (slave.balls > 0 && slave.skill.anal > 10 && slave.devotion > 20); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`The next time ${slave.slaveName} is seen in public, on an errand for ${his} master, ${he}'s`);
					if (canWalk(slave)) {
						r.push(`walking`);
					} else {
						r.push(`moving`);
					}
					r.push(`a little oddly. ${His} naked dick has the flaccidity of sexual satiation, and ${he} has a tired but dreamy expression on ${his} face.`);
					for (const s of V.slaves) {
						if (s.fetish === "buttslut") {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your buttsluts envy ${him}, and <span class="trust inc">trust that even if you decide to sell them,</span> they'll find themselves orgasming with dicks up their asses anyway.`);
					}
					return r;
				}
			}],
			["oral fetishist", {
				cost: 1.05,
				offerDesc: `from an unusually well-endowed citizen who strongly prefers oral sex with willing partners who can deepthroat him successfully.`,
				get requirements() { return (slave.skill.oral > 30 && slave.devotion > 20); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`The next time ${slave.slaveName} is seen in public, ${he}'s obediently accompanying ${his} new master. After doing some business on the promenade, he pulls ${him} into an alcove and lets ${him} masturbate as he uses ${his} throat.`);
					for (const s of V.slaves) {
						if (s.fetish === "cumslut") {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your cumsluts envy ${him}, and <span class="trust inc">trust that even if you decide to sell them,</span> they'll find themselves filled with cum every day.`);
					}
					return r;
				}
			}],
			["pain fetishist", {
				cost: 1.05,
				offerDesc: `from a sadistic citizen who likes hurting her slaves, dislikes masochists for their enjoyment of her treatment, yet prefers slaves who will not hate her.`,
				get requirements() { return (slave.fetish !== "masochist" && slave.devotion > 50); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is not seen again in public for a long time, but the crack of leather on flesh and the resultant hoarse female howling that issues from ${his} new mistress's apartment is well-known.`);
					for (const s of V.slaves) {
						if (s.fetish === "masochist") {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your masochists envy ${him}, and <span class="trust inc">trust that even if you decide to sell them,</span> they'll never lack for the abuse they need.`);
					}
					return r;
				}
			}],
			["sadism fetishist", {
				cost: 1.05,
				offerDesc: `from a sadistic citizen who is looking for an imposing, stupid slave she can train to rape her victims on command.`,
				get requirements() { return (slave.muscles > 30 && slave.height >= 170 && (slave.intelligence + slave.intelligenceImplant < -15)); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} rarely leaves ${his} new mistress's apartments, but the slave rumor mill bears stories about ${him} to your penthouse anyway. ${His} mistress uses ${him} as a rapist on demand, and ${his} dumbly obedient brutality is renowned.`);
					for (const s of V.slaves) {
						if (s.fetish === "sadist") {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your sadists consider such a life scarcely capable of improvement, and <span class="trust inc">trust that if you decide to sell them,</span> they'll get a chance to abuse other slaves.`);
					}
					return r;
				}
			}],
			["dom fetishist", {
				cost: 1.05,
				offerDesc: `from a newly wealthy citizen who is expanding his household and is interested in smart, educated, and obedient slaves for leadership roles.`,
				get requirements() { return (slave.devotion > 20 && (slave.intelligence + slave.intelligenceImplant > 50) && slave.intelligenceImplant >= 15); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} wins ${himself} a leadership position with ${his} new master, who repays ${his} hard work by allowing ${him} to use his slaves at will.`);
					for (const s of V.slaves) {
						if (s.fetish === "dom") {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your sexually dominant slaves do their best to follow ${his} success, and <span class="trust inc">trust that if you decide to sell them,</span> they'll stand a chance of winning a place in which they can fuck as well as get fucked.`);
					}
					return r;
				}
			}],
			["sub fetishist", {
				cost: 1.05,
				offerDesc: `from a citizen whose job keeps her deskbound; bored, she's looking for a devoted oral slave to occupy the space under the desk and be her constant pussylicking appliance.`,
				get requirements() { return (slave.devotion > 50 && slave.skill.oral >= 100); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`The back of ${slave.slaveName}'s head becomes a well-known sight in business circles, since ${his} mistress rarely lets it out from between her legs.`);
					for (const s of V.slaves) {
						if (s.fetish === Fetish.SUBMISSIVE) {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your sexually submissive slaves secretly envy ${his} simple life, and <span class="trust inc">trust that if you decide to sell them,</span> there are places where a sub can be valuable and safe.`);
					}
					return r;
				}
			}],
			["buttbreaker", {
				cost: 1.3,
				offerDesc: `from a wealthy citizen infamous for cruelly raping anal virgins in public; he buys and abuses a new one every few weeks.`,
				get requirements() { return (slave.anus === 0); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`In short order, ${slave.slaveName} is heard out on the promenade, sobbing and screaming as ${his} new owner breaks in ${his} virgin butt in public.`);
					for (const s of V.slaves) {
						if (s.anus === 0) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other anal virgins <span class="trust dec">fear for their asses</span> should you decide to sell them.`);
					}
					return r;
				}
			}],
			["trainer staffing", {
				cost: 1.1,
				offerDesc: `from a small, local slave trainer interested in using ${him} to help train new slaves in the sexual arts.`,
				get requirements() { return (slave.skill.oral >= 100 && slave.skill.anal >= 100 && (slave.intelligence + slave.intelligenceImplant > 15)); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is soon well-known among the slaves of the arcology, as many of them are sold after passing under ${his} hands in training. ${He} performs effectively, imparting good sex slave ethics in a generation of sluts.`);
					for (const s of V.slaves) {
						if (s.intelligence + s.intelligenceImplant > 15) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other intelligent slaves <span class="trust inc">trust that their skills will be valued</span> even should you decide to sell them.`);
					}
					return r;
				}
			}],
			["D milf staffing", {
				cost: 1.4,
				offerDesc: `from a skilled slave trainer who feels that MILFs make the best slave trainers.`,
				get requirements() { return (slave.skill.oral >= 100 && slave.skill.anal >= 100 && (slave.intelligence + slave.intelligenceImplant > 15) && slave.intelligenceImplant >= 15 && slave.physicalAge > 35); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} becomes a common sight around the arcology, training slaves for ${his} new master. They're usually seen hanging close by ${him} as ${he} manages them with an air at once protective and frankly sexual.`);
					for (const s of V.slaves) {
						if (s.actualAge > 35) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your older slaves are <span class="trust inc">happy for ${him},</span> since it isn't always easy for older ladies.`);
					}
					return r;
				}
			}],
			["D hucow", {
				cost: 1.25,
				offerDesc: `from a prominent citizen with a notorious fetish for fertile, natural cows.`,
				get requirements() { return (slave.boobsImplant === 0 && slave.lactation > 0 && slave.ovaries > 0 && slave.boobs > 1000); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} becomes quite a fixture at social events hosted by ${his} new master; he enjoys showing off how healthy, happy and productive his cow is.`);
					for (const s of V.slaves) {
						if (s.lactation > 0) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other milkers are sometimes concerned about being sold to a cruel stockyard, and ${his} pleasant life encourages them to <span class="trust inc">stop being so worried.</span>`);
					}
					return r;
				}
			}],
			["D startled the witch", {
				cost: 1.35,
				offerDesc: `from a prominent citizen who's pursuing some sort of mercenary project that requires worryingly large numbers of thin ${girl}s with sharp teeth.`,
				get requirements() { return (slave.muscles > 5 && slave.weight < -10 && slave.teeth === "pointy" && slave.skill.combat > 30); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} heads off to form part of whatever great design ${his} new master is pursuing; all you know is that it apparently requires lots of lithe, sharp toothed slave ${girl}s.`);
					for (const s of V.slaves) {
						if (s.devotion <= 20) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your properly broken slaves are so inured to strange tastes that they pay no attention, but the others are just <span class="trust inc">glad ${he} won't frighten them</span> any more. They thought ${he} was scary.`);
					}
					return r;
				}
			}],
			["vampire clan", {
				cost: 1.35,
				offerDesc: `from a becloaked individual with an unusual interest in pale ${girl}s with fangs.`,
				get requirements() { return (slave.teeth === "fangs" && (skinToneLevel(slave.skin) < 7)); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is quickly embraced by ${his} new owner and spirited away like all the other ${girl}s that catch his fancy.`);
					for (const s of V.slaves) {
						if (s.devotion <= 20) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your properly broken slaves are so inured to strange tastes that they pay no attention, but the others are just <span class="trust inc">glad ${he} won't frighten them</span> any more. There was a rumor circulating that ${he} was a creature of the night.`);
					}
					return r;
				}
			}],
			["D virgin asspussy", {
				cost: 1.35,
				offerDesc: `from a prominent citizen who appreciates ${girl}s who are both vaginal virgins and anal veterans.`,
				get requirements() { return (slave.vagina === 0 && slave.anus > 1 && slave.skill.anal >= 100 && slave.physicalAge < 25); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s buyer takes charge of ${him}, and cannot resist immediately running a hand between ${his} buttocks to sink a couple of groping fingers into ${his} soft asspussy.`);
					for (const s of V.slaves) {
						if (s.fetish === "buttslut") {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves who enjoy having things shoved up their assholes <span class="trust inc">hope that if they're sold,</span> their new masters will be like that too.`);
					}
					return r;
				}
			}],
			["D waifu", {
				cost: 1.35,
				offerDesc: `from a prominent citizen with moist palms who insistently refers to ${him} as "his waifu," whatever that means.`,
				get requirements() { return (slave.vagina === 0 && (slave.fetish === Fetish.SUBMISSIVE || slave.fetish === "pregnancy") && slave.skill.entertainment > 30 && slave.physicalAge < 30); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					r.push(`${slave.slaveName} is rarely seen after ${his} buyer takes charge of ${him}, since he prefers to keep his beloved at home. Though ${he} seems to be well treated, arcology society finds him repellent enough that your other slaves do not envy ${him}.`);
					return r;
				}
			}],
			["monster movie", { // or "sex double"
				cost: 1.35,
				offerDesc: `from a production studio interested in using ${him} as a double`,
				get requirements() {
					return (
						(slave.vagina > 0 && slave.dick === 0 && slave.balls === 0) &&
						(slave.physicalAge >= 20 && slave.physicalAge < 25) &&
						(slave.visualAge >= 20 && slave.visualAge < 25) &&
						(slave.preg <= 0 && slave.bellyImplant <= 0) &&
						(slave.weight < 10 && slave.weight > -10) &&
						(slave.waist < 10 && slave.waist > -50) &&
						(slave.boobs >= 550 && slave.boobs < 1000) &&
						(slave.butt.isBetween(2, 5)) &&
						(slave.hips.isBetween(0, 3)) &&
						(slave.face >= 20)
					);
				},
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					if (random(1, 3) === 1 && V.seePreg !== 0) {
						// Monster movie
						r.push(`${slave.slaveName} soon makes ${his} debut on the big screen in a thrilling horror movie. At its end, the male lead finds his partner, played by ${him} in this scene, glued to a wall with a massively distended middle filled to capacity with the monster's spawn. The camera slowly zooms in on ${him} as ${he} gives birth to a future sequel.`);
						for (const s of V.slaves) {
							if (s.sexualFlaw === "breeder") {
								s.devotion -= 2;
								slaveImpact = 1;
							}
						}
						if (slaveImpact === 1) {
							r.push(`The pregnancy obsessed sluts among your slaves are <span class="devotion dec">envious</span> of ${slave.slaveName}'s new experience, even if it is fake.`);
						}
					} else {
						// Sex Double
						r.push(`${slave.slaveName} soon makes ${his} debut on the big screen in a debaucherous gangbang in place of the popular lead. ${He} is a spitting image of the actress, even when coated in layers of semen.`);
						for (const s of V.slaves) {
							if (s.sexualFlaw === "attention whore") {
								s.devotion -= 2;
								slaveImpact = 1;
							}
						}
						if (slaveImpact === 1) {
							r.push(`The attention whores among your slaves are <span class="devotion dec">envious</span> of ${slave.slaveName}'s good fortune.`);
						}
					}
					return r;
				}
			}],
			["D oral servants", {
				cost: 1.35,
				offerDesc: `from a prominent citizen who likes to provide his favored, well-endowed slaves with subordinate, orally skilled dickgirls with nice butts.`,
				get requirements() { return (slave.dick > 0 && slave.skill.oral >= 100 && slave.height < 160 && slave.butt > 3); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is an occasional sight around the arcology; ${he}'s never seen outside the company of ${his} new slave superior. This is one of ${his} new master's more favored slaves. ${He} has a huge cock, and ${slave.slaveName} is usually seen crouching down, hugging one of ${his} superior's legs and keeping ${his} mouth obediently near that dick.`);
					for (const s of V.slaves) {
						if (s.fetishKnown === 1) {
							if (s.fetish === "cumslut") {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your cumsluts are <span class="trust inc">rather envious.</span>`);
					}
					return r;
				}
			}],
			["D trap lover", {
				cost: 1.35,
				offerDesc: `from a prominent citizen who prefers slaves that look like demure ${girl}s with their clothes on, and are willing to take cock up their pretty asspussies.`,
				get requirements() { return (slave.dick > 0 && slave.devotion > 20 && slave.fetish === "buttslut" && slave.visualAge < 25 && slave.boobs < 400 && slave.weight <= 10); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} becomes a frequent sight around the arcology, accompanying ${his} new master. ${He}'s clearly happy, and is frequently seen to offer ${his} butt to him with a smile.`);
					for (const s of V.slaves) {
						if (s.dick > 0) {
							if (s.devotion > 20) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves with dicks who've accepted their lot in life find this <span class="trust inc">encouraging.</span>`);
					}
					return r;
				}
			}],
			["D butt bury", {
				cost: 1.35,
				offerDesc: `from an eccentric citizen notorious for keeping tall slaves with huge soft butts, just so he can bury himself between their cheeks when they're standing.`,
				get requirements() { return (slave.height > 185 && slave.butt > 8 && slave.buttImplant < 2 && slave.weight > 10); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s buyer arrives promptly; he seems pleased with his new slave's bountiful bottom, so far off the ground.`);
					for (const s of V.slaves) {
						if (s.fetish === "buttslut") {
							if (s.fetishKnown === 1) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your buttsluts giggle over what he's got in store for ${him}, and <span class="trust inc">envy</span> ${his} new owner a little.`);
					}
					return r;
				}
			}],
			["D milky herm", {
				cost: 1.35,
				offerDesc: `from a prominent citizen with strong opinions on futas: he likes a feminine ${girl} with a nice cock, a lovely pussy, no visible balls and yet the ability to get hard, and plentifully milky nipples.`,
				get requirements() { return (slave.dick > 1 && slave.balls === 1 && slave.vagina > -1 && canAchieveErection(slave) && slave.lactation > 0 && slave.face > 10 && slave.faceShape !== "masculine"); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s buyer arrives and seems pleased with ${his} lovely feminine appearance; he verifies ${his} lactation and ${his} ability to achieve erection despite ${his} lack of visible balls.`);
					for (const s of V.slaves) {
						if (s.dick > 0) {
							if (s.boobs > 400) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other feminine slaves with dicks <span class="trust inc">trust</span> they'll go to owners that will value them, should they be sold.`);
					}
					return r;
				}
			}],
			["D amazon hunter", {
				cost: 1.35,
				offerDesc: `from a prominent citizen whose friends never let him hear the end of his incorrigibly romantic treatment of his apartment full of amazons.`,
				get requirements() { return (slave.dick === 0 && slave.muscles > 30 && slave.devotion > 20 && slave.height > 180); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					r.push(`When ${slave.slaveName}'s buyer appears, the big ${girl} is almost bashful. He tries to resist the impulse, but quickly breaks down and sweeps ${him} into a tight hug. ${He} accepts the embrace meekly. Your other slaves find this <span class="trust inc">very romantic.</span>`);
					for (const s of V.slaves) {
						s.trust += 1;
					}
					return r;
				}
			}],
			["D shorty breeder", {
				cost: 1.35,
				offerDesc: `from a prominent citizen who keeps a large harem of lithe, muscular ${girl}s to bear him children.`,
				get requirements() { return (V.seePreg !== 0 && slave.ovaries === 1 && slave.pubertyXX > 0 && slave.preg > -2 && slave.muscles > 30 && slave.weight <= 10 && slave.height < 165); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s lithe, muscular form is rarely seen after ${his} buyer takes charge of ${him}, since ${he} seems to spend most of ${his} time at home making babies.`);
					for (const s of V.slaves) {
						if (s.fetish === "pregnancy") {
							if (s.fetishKnown === 1) {
								s.trust += 4;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves with pregnancy fetishes <span class="trust inc">almost want to be sold</span> since there's a chance they'll be purchased by him, too.`);
					}
					return r;
				}
			}],
			["D oral servants", {
				cost: 1.35,
				offerDesc: `from a prominent citizen who's looking for a fresh, skilled pair of lips eager to wrap around a thick cock.`,
				get requirements() { return (slave.devotion > 20 && slave.fetish === "cumslut" && slave.lips > 30 && hasAnyArms(slave) && hasAnyLegs(slave) && slave.skill.oral > 50); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is an occasional sight around the arcology; ${he}'s never seen outside the company of ${his} new slave superior. This is one of ${his} new master's more favored slaves. ${He} has a huge cock, and ${slave.slaveName} is usually seen crouching down, hugging one of ${his} superior's legs and keeping ${his} mouth obediently near that dick.`);
					for (const s of V.slaves) {
						if (s.fetishKnown === 1) {
							if (s.fetish === "cumslut") {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your cumsluts are <span class="trust inc">rather envious.</span>`);
					}
					return r;
				}
			}],
			["D r9k", {
				cost: 1.15,
				offerDesc: `from a prominent citizen who's a notoriously inexperienced lover; it's painfully obvious that he prefers inexperienced slaves as they make him feel less insecure.`,
				get requirements() { return (slave.skill.vaginal <= 10 && slave.skill.penetrative <= 10 && slave.skill.anal <= 10 && slave.skill.oral <= 10 && slave.skill.whoring <= 10 && slave.skill.entertainment <= 10); },
				percentOdds: 80,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s nervous buyer comes to collect ${him}, stammering and sweating and doing his best to pretend he does this all the time.`);
					for (const s of V.slaves) {
						if (s.counter.vaginal + s.counter.anal < 20) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other less experienced slaves persistently find this romantic, and <span class="trust inc">hope something like that will happen to them,</span> too.`);
					}
					return r;
				}
			}],
			["D cannibal", {
				cost: 1.25,
				offerDesc: `from a prominent citizen who takes unusually close interest in ${his} health and muscle tone, and cannot quite hide his salivation as he does so.`,
				get requirements() { return (slave.weight > 10 && slave.muscles > 5 && slave.health.condition > 60 && cost < 10000); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					r.push(`${slave.slaveName} is never seen again. ${His} buyer prefers to keep whatever happened to ${him} private. However, rumors of steaks, rump roasts, sweetbreads, and blood pudding eaten at three in the morning filter out from time to time. Naturally, these murmurs never fail to <span class="trust dec">terrify</span> your other slaves.`);
					for (const s of V.slaves) {
						s.trust -= 2;
					}
					return r;
				}
			}],
			["obsessed fan", {
				cost: 2,
				offerDesc: `from an obsessive fan who absolutely must have ${him} for himself.`,
				get requirements() { return (slave.porn.prestige === 1); },
				percentOdds: 69, // Who did this? Seriously, who did this...
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is rarely seen after ${his} buyer takes charge of ${him}, since he prefers to keep his prize safe and sound at home.`);
					for (const s of V.slaves) {
						if (s.porn.prestige === 1) {
							if (s.devotion > 20) {
								s.trust += 1;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other borderline unheard of sluts <span class="trust inc">hope that someone like him would consider whisking them away,</span> but most of your slaves are skeptical at what his intent may be.`);
					}
					return r;
				}
			}],
			["porn studio", {
				cost: 1.3,
				offerDesc: `from a studio interested in continued production of ${his} porn.`,
				get requirements() { return (slave.porn.prestige === 3); },
				percentOdds: 90,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} becomes a frequent sight in ${slave.porn.fameType} smut and attracts huge crowds with each public appearance.`);
					for (const s of V.slaves) {
						if (s.porn.prestige.isBetween(0, 3)) {
							if (s.devotion > 20) {
								s.trust += 2;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other aspiring porn stars <span class="trust inc">try harder than ever</span> in the hopes of following in ${his} prestigious footsteps.`);
					}
					return r;
				}
			}],
			["teaching trainer", {
				cost: 1.1,
				offerDesc: `from a slave trainer that specializes in educating slaves and reselling them at a profit.`,
				get requirements() { return (!FutureSocieties.isActive('FSDegradationist') && slave.intelligenceImplant < 15); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is not pleased by ${his} change in circumstances, since ${he} is soon subjected to training rigor that ${he} did not experience while your property.`);
					for (const s of V.slaves) {
						if (s.intelligenceImplant < 15) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other uneducated slaves <span class="trust dec">fear the abusive indoctrination</span> they will apparently suffer under should you decide to sell them.`);
					}
					return r;
				}
			}],
			["implanting trainer", {
				cost: 1.1,
				offerDesc: `from a slave trainer that specializes in filling slaves with implants before resale.`,
				get requirements() { return (!FutureSocieties.isActive('FSBodyPurist') && slave.boobsImplant === 0); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`A few weeks later, ${slave.slaveName} is seen in a shipment of slaves heading out of the arcology. ${He} has new fake tits, a bigger butt, lip implants, and even some facial bone structure alterations, but ${his} balloon breasts are the most shocking change.`);
					for (const s of V.slaves) {
						if (s.boobsImplant === 0) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your unimplanted slaves <span class="trust dec">fear they'll go under the knife</span> for invasive surgery like ${slave.slaveName} suffered, should you ever decide to sell them.`);
					}
					return r;
				}
			}],
			["purifying trainer", {
				cost: 1.1,
				offerDesc: `from a slave trainer that specializes in fixing slaves who have been surgically ruined with overimplantation.`,
				get requirements() { return (!FutureSocieties.isActive('FSTransformationFetishist') && slave.boobsImplant > 0); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`A few weeks later, ${slave.slaveName} is seen in a shipment of slaves heading out of the arcology. ${He} is almost unrecognizable, having been quickly returned to as natural an appearance as skillful removal of ${his} implants could manage.`);
					for (const s of V.slaves) {
						if (s.boobsImplant > 800) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves who are carrying around huge implants <span class="trust inc">hope they'll be allowed to lay down their burdens</span> should you decide to sell them.`);
					}
					return r;
				}
			}],
			["slimming trainer", {
				cost: 1.1,
				offerDesc: `from a slave trainer that specializes in slimming down fat slaves to appeal to buyers who prefer slim ${girl}s.`,
				get requirements() { return (!FutureSocieties.isActive('FSAssetExpansionist') && slave.boobs > 600 && slave.butt > 3 && slave.weight > 10); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is occasionally visible around the arcology, looking rather tired and gaunt under the stresses of a severe crash diet coupled with a punishing cardio regime.`);
					for (const s of V.slaves) {
						if (s.weight > 10) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your chubby slaves take note, and <span class="trust dec">fear they'll have to suffer too</span> should you ever decide to sell them.`);
					}
					return r;
				}
			}],
			["broadening trainer", {
				cost: 1.1,
				offerDesc: `from a slave trainer that specializes in improving slaves with disappointing assets; they prefer pharmaceutical means but are not averse to surgical intervention if necessary.`,
				get requirements() { return (!FutureSocieties.isActive('FSSlimnessEnthusiast') && slave.boobs < 600 && slave.butt < 3 && slave.weight < -10); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is only rarely seen around the arcology, since ${his} new owners force ${him} to spend most of ${his} time sleeping, eating and looking after ${himself}. But ${his} belly, painfully distended with food, makes ${his} situation obvious.`);
					for (const s of V.slaves) {
						if (s.weight > 10) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`When they hear about ${him}, your slim slaves are <span class="trust dec">disgusted and afraid,</span> fearing they'll be forced to eat themselves plush if sold.`);
					}
					return r;
				}
			}],
			["cow trainer", {
				cost: 1.1,
				offerDesc: `from a slave trainer that specializes in getting ${womenU} ready to be dairy cows by using aggressive hormonal and pharmaceutical treatment to balloon their tits.`,
				get requirements() { return (slave.boobs > 1000 && slave.boobsImplant === 0 && slave.lactation === 0); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is last seen somewhat later, packed into a shipment of cows heading out of the arcology. ${He} looks rather ill from the drugs ${he}'s been filled with, and ${his} now-distended breasts are marred by unsightly stretch marks.`);
					for (const s of V.slaves) {
						if (s.lactation === 0) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Even your slaves who normally enjoy breast expansion are <span class="trust dec">disgusted and afraid</span> they'll be treated as pharmaceutical mixing machines if you sell them to the same company. Only your cows are inured to lactation to the point they're unaffected.`);
					}
					return r;
				}
			}],
			["clipping trainer", {
				cost: 1.1,
				offerDesc: `from a slave trainer that specializes in feminizing imperfect shemales; an orchiectomy is invariably their first step.`,
				get requirements() { return (!FutureSocieties.isActive('FSGenderFundamentalist') && slave.balls > 0 && slave.boobs < 500); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is frequently seen in public over the next few weeks, since ${he}'s being trained to improve ${his} feminine deportment. ${He} grows visibly more feminine as time passes, as the hormonal effects of having ${his} balls cut off become apparent.`);
					for (const s of V.slaves) {
						if (s.balls > 0) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves who retain their testicles are <span class="trust dec">afraid</span> of displeasing you, knowing that castration is a distinct possibility on the open market.`);
					}
					return r;
				}
			}],
			["reassignment trainer", {
				cost: 1.1,
				offerDesc: `from a slave trainer that specializes in creating proper slave women from raw material that falls short of that ideal but has potential anyway.`,
				get requirements() { return (!FutureSocieties.isActive('FSGenderRadicalist') && slave.dick > 0 && cost > 10000); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is next seen after some weeks of surgery. ${He}'s barely recognizable, and now possesses a serviceable vagina which ${he} clearly is unsure of. ${His} original status is scarcely discernible.`);
					for (const s of V.slaves) {
						if (s.dick > 0) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your less feminized slaves <span class="trust dec">fear similar treatment;</span> even those who aspire to be better slave girls are shocked by the rapidity and totality of the surgical transformation.`);
					}
					return r;
				}
			}],
			["pastoralist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner working towards autarkic slave pastoralism. He's awed by ${his} milk productivity.`,
				get requirements() { return (slave.boobs - slave.boobsImplant > 2000 && slave.lactation > 1); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is subjected to a stock assay and then packed off to take ${his} place as a prize heifer.`);
					for (const s of V.slaves) {
						if (s.lactation === 0) {
							if (s.devotion <= 20) {
								s.trust -= 2;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves who are already lactating know that ${his} role is to be a relatively easy and decent one, and your obedient slaves accept it regardless. Others, however, <span class="trust dec">fear being transformed into livestock</span> a little.`);
					}
					return r;
				}
			}],
			["egyptian revivalist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner building a facsimile of ancient Egypt. He's in the market for wise and educated slaves willing to pass on their skills.`,
				get requirements() { return (slave.devotion > 50 && (slave.intelligence + slave.intelligenceImplant > 50) && slave.intelligenceImplant >= 30); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s journey to ${his} new home is respectful, even celebratory, as far as you can see. ${He} is gravely informed by the purchasing agent that many slaves await ${his} learned instruction.`);
					for (const s of V.slaves) {
						if (s.intelligence + s.intelligenceImplant < -50) {
							s.devotion -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Most of your slaves quietly envy ${his} good fortune. The stupidest however tend to resent their intellectual superiors and <span class="devotion dec">actively resent</span> how obvious ${his} advantage over them proved to be.`);
					}
					return r;
				}
			}],
			["aztec revivalist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner building a recreation of the Great Aztec Empire. He's in the market for willing, strong and combat ready slaves, to bolster his empire.`,
				get requirements() { return (slave.skill.combat > 60 && slave.health.condition > 40 && slave.muscles > 25); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is transported after losing a military engagement. Though ${his} will remains strong, ${he}'s <span class="trust dec">filled with fear</span> when ${he} sees the rivers of blood that flow through the city.`);
					for (const s of V.slaves) {
						if (s.skill.combat > 30) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`${His} willingness to obey will be tested. ${His} life will be forfeit, a fate many others <span class="trust dec">fear might befall them,</span> if ${he} does not perform.`);
					}
					return r;
				}
			}],
			["roman revivalist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner building a facsimile of classical Rome. He's in the market for slaves with basic combat skills to fight in modern gladiatorial combats.`,
				get requirements() { return (slave.skill.combat > 60 && slave.health.condition > 40 && slave.muscles > 5); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is shipped to a new arcology, and culturally, across the centuries. ${His} skill at arms is well enough known that ${his} impending role as a gladiatrix is easily deduced.`);
					for (const s of V.slaves) {
						if (s.skill.combat > 30) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`A gladiatrix's life expectancy in an arcology that enjoys lethal combats is punishingly low. Your other slaves with combat skill <span class="trust dec">worry they'll follow ${him}</span> out onto the sand.`);
					}
					return r;
				}
			}],
			["neoimperialist arcology", {
				cost: 1.25,
				offerDesc: `from an arcology owner who's crowned himself a neo-noble, looking for healthy, intelligent, and fit slaves to build up a prestigious harem worthy of a genuine King.`,
				get requirements() { return (slave.health.condition > 40 && (slave.intelligence + slave.intelligenceImplant > 20) && slave.muscles > 5); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is taken away by an expensive, flashy shuttle shortly after you finalize the trade. ${He} is swept into a life of luxury; the next time you see ${him}, ${he}'s dressed in a manner more befitting of a consort than a simple slave.`);
					for (const s of V.slaves) {
						if (s.intelligence + s.intelligenceImplant > 50) {
							s.devotion -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`The majority of your slaves are simply jealous of the wealth and luxury of ${his} new home, but the brighter servants <span class="devotion dec">shudder</span> with the understanding that such decadence is bought at the price of fawning obedience to a trussed-up megalomaniac.`);
					}
					return r;
				}
			}],
			["chattel religionist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner with interesting religious beliefs, which require beautiful slaves to be available to the public. Since ${slave.slaveName} is pretty and not heavily used, he considers it a duty to buy ${him} and make ${him} a holy prostitute.`,
				get requirements() { return (slave.face > 10 && slave.counter.anal < 100); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is terrified of ${his} impending religious life; perhaps ${he}'s heard the new text that reads 'no woman come of age is holy unless she performs the act as many times per day as she has years less than forty.'`);
					for (const s of V.slaves) {
						if (s.counter.anal < 200) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your sexually experienced slaves are too inured to industrial lovemaking to be affected by ${his} fate, but your more innocent slaves <span class="trust dec">fear being required to fuck</span> at that pace.`);
					}
					return r;
				}
			}],
			["physical idealist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner devoted to muscular ladies. He seems to feel that ${slave.slaveName} is not at ${his} true potential, and wants a try at improving ${his} physique himself.`,
				get requirements() { return (slave.muscles > 5 && slave.muscles <= 95 && slave.health.condition > 60); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`Stories about the arcology ${slave.slaveName} is headed to have circulated among slaves. Most intelligent slaves see a life of workouts as relatively harmless.`);
					for (const s of V.slaves) {
						if (s.weight > 10) {
							if (s.intelligence + s.intelligenceImplant < -15) {
								s.trust -= 2;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`However, your stupider slaves consider a life of rigorous dieting and punishing exercise daunting, and are filled with <span class="trust dec">minor fears</span> that they will be made to starve and sweat, too.`);
					}
					return r;
				}
			}],
			["hedonistic decadence arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner devoted to chubby ladies. He seems to feel that ${slave.slaveName} can handle a fair bit more weight, and wants a try at fattening ${him} up himself.`,
				get requirements() { return (slave.weight > 30 && slave.weight <= 95 && slave.health.condition > 60); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is taken away to join a quivering mass of plump, pampered ladies that crowd the bedroom of ${his} new owner.`);
					for (const s of V.slaves) {
						if (s.behavioralFlaw === "gluttonous") {
							s.devotion -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your more gluttonous slaves are <span class="devotion dec">deeply jealous</span> of ${slave.slaveName}'s constant feedings and excessive weight gain.`);
					}
					return r;
				}
			}],
			["stuffer chef", {
				cost: 1.1,
				offerDesc: `from a chef that likes stuffing more than just turkeys.`,
				get requirements() { return (FutureSocieties.isActive('FSSlimnessEnthusiast') && slave.weight < 10 && slave.muscles < 10 && slave.belly === 0 && slave.preg < 1); },
				percentOdds: 80,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s new owner is quite fond of his work and typically sends out photos of his progress. This is no exception; you are treated to a series of images featuring ${slave.slaveName} being force-fed until ${his} stomach bulges. Day after day, you watch ${him} handle more and more food until ${his} belly is big enough to fill ${his} lap even when empty.`);
					for (const s of V.slaves) {
						if (s.weight < 10) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other thin slaves are <span class="trust dec">terrified</span> that they'll soon find themselves tied to a chair and fed until they are ready to pop.`);
					}
					return r;
				}
			}],
			["transformation fetishist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner who loves breast implants. Since large natural breasts can support larger implants, he seems to feel ${slave.slaveName} has good potential to be implanted up to a truly gigantic size without too much stretching.`,
				get requirements() { return (slave.boobs > 1000 && slave.boobsImplant === 0); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`A purchasing agent arrives for ${slave.slaveName}; he uses a lull in the proceedings to use a permanent marker to begin mapping out surgical sites across ${his} body. There are a lot of them.`);
					for (const s of V.slaves) {
						if (s.devotion <= 20) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your unbroken slaves who hear about how severely ${he}'s about to be cut up are <span class="trust dec">somewhat afraid</span> that they will suffer similar surgical invasion.`);
					}
					return r;
				}
			}],
			["asset expansionist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner who never fails to dream big. He's interested in ${him} mostly for growth potential, since ${his} assets have grown so big, so young.`,
				get requirements() { return (slave.boobs > 800 && slave.boobsImplant === 0 && slave.physicalAge < 25); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`A shipping container arrives for ${slave.slaveName}; as ${he}'s loaded into it, it sedates ${him} and begins to pump hormones, curatives and growth enhancers into no less than seven places scattered over ${his} body.`);

					for (const s of V.slaves) {
						if (s.devotion <= 20) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your unbroken slaves who hear about the grotesque display of pharmacological art are <span class="trust dec">somewhat afraid</span> that they will suffer similar chemical invasion.`);
					}
					return r;
				}
			}],
			["slimness enthusiast arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner with simple tastes. He likes his slaves young, slim, and reasonably innocent.`,
				get requirements() { return (slave.boobs < 500 && slave.butt < 3 && slave.physicalAge < 25 && slave.anus < 2); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is taken away to join the tribe of squealing, slim forms that populate the arcology of ${his} new owner.`);
					for (const s of V.slaves) {
						if (s.intelligence + s.intelligenceImplant > 50) {
							s.devotion -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Most of your chattel could scarcely care less, but your most intelligent slaves are <span class="devotion dec">privately dubious of your tacit support</span> for an arcology owner whose tastes they wonder about.`);
					}
					return r;
				}
			}],
			["body purist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner with a hatred of implants that reaches missionary zeal. He buys slaves full of silicone, removes their implants, reconditions them, and resells them whenever his finances will permit.`,
				get requirements() { return (slave.boobsImplant > 0 && slave.buttImplant > 0 && slave.lipsImplant > 0); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is shipped to ${his} new owner's arcology to have ${his} implants extracted and the resultant damage addressed.`);
					for (const s of V.slaves) {
						if (s.devotion <= 50) {
							if (s.boobsImplant > 1000) {
								s.devotion -= 2;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves burdened with gigantic implants who aren't devoted enough to bear them cheerfully <span class="devotion dec">resent you somewhat</span> for keeping them here with aching backs.`);
					}
					return r;
				}
			}],
			["degradationist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner who runs a terrifyingly degrading society. He prefers slaves who have been well-treated previously; it lends their screams a certain special authenticity.`,
				get requirements() { return (slave.trust > 20); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`Stories about the place ${he}'s going have reached ${V.arcologies[0].name}, and ${slave.slaveName} suspects the fate ${he}'s been condemned to when ${he}'s loaded into a shipping container expressly designed to keep the inmate awake and uncomfortable.`);
					for (const s of V.slaves) {
						if (s.devotion > 20) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other devoted or just obedient slaves are <span class="trust dec">suddenly afraid</span> that their obedience and their devotion is as nothing next to the fact that they are sex slaves relying on your whim.`);
					}
					return r;
				}
			}],
			["paternalist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner with an almost messianic calling to educate and improve slaves, though somewhat hypocritically, he prefers to start with reasonably obedient ${girl}s, which usually means slaves broken by someone else.`,
				get requirements() { return (slave.intelligenceImplant < 5 && slave.devotion > 20 && slave.fetish !== Fetish.MINDBROKEN); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is shipped off to be improved into a happy, educated slave at the best pace ${his} new owner can manage.`);
					for (const s of V.slaves) {
						if (s.devotion < -20) {
							if (s.intelligence + s.intelligenceImplant < -15) {
								s.devotion -= 2;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your unbroken, uneducated slaves who hear about this are <span class="devotion dec">quietly resentful,</span> not understanding that ${he} was only sold to a paternalist arcology because ${he} was obedient.`);
					}
					return r;
				}
			}],
			["gender fundamentalist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner who likes willing, uncomplicated young ladies with bouncing boobs and big butts. He's an uncomplicated sort.`,
				get requirements() { return (slave.dick === 0 && slave.boobs > 800 && slave.butt > 3 && slave.devotion > 20 && (slave.intelligence + slave.intelligenceImplant < -15)); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is taken away to join the legion of airheaded, big-titted sex slaves that throng the arcology owned by ${his} purchaser.`);
					for (const s of V.slaves) {
						if (s.intelligence + s.intelligenceImplant > 50) {
							s.devotion -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Most of your chattel could scarcely care less, but your most intelligent slaves are <span class="devotion dec">privately skeptical of ${his} fate;</span> ${he}'s become one more cookie cutter bimbo in a place that uses and discards such sluts.`);
					}
					return r;
				}
			}],
			["gender radicalist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner with a notorious fetish for the process of feminization. He prefers diamonds in the rough, because the process of polishing is so much fun.`,
				get requirements() { return (slave.dick > 0 && slave.face < -10 && slave.boobs < 400); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is shipped off, but ${his} buyer is so unwilling to waste any time that the shipment container includes hormonal injectors to get ${him} started on an intensive feminization regime as quickly as possible.`);
					for (const s of V.slaves) {
						if (s.dick > 0) {
							if (s.devotion <= 20) {
								s.trust -= 2;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves who retain dicks, and are not yet broken to your will, <span class="trust dec">fear the implication</span> that feminization is inescapable: either you'll turn them into girly sluts, or someone else will.`);
					}
					return r;
				}
			}],
			["supremacist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner with a strongly held belief that ${slave.race} people should not be slaves. He devotes as much of his resources as he can to manumission of such ${girl}s, concentrating on the downtrodden.`,
				get requirements() { return (slave.race !== "mixed race" && slave.devotion <= 20 && slave.trust < 20); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} leaves your control forthwith, to be freed and installed in a favored life in an arcology that gives ${slave.race} people every possible advantage.`);
					for (const s of V.slaves) {
						if (s.devotion < 10) {
							s.devotion -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`All your slaves who are not devoted to you <span class="devotion dec">like you a little less</span> in the light of this thin beam of freedom you've allowed to shine into ${V.arcologies[0].name}.`);
					}
					return r;
				}
			}],
			["subjugationist arcology", {
				cost: 1.25,
				offerDesc: `from a fellow arcology owner working on a project to breed a race of ${slave.race} people with natural, unquestioning obedience. He clearly considers ${him} good stock for the project.`,
				get requirements() { return (V.seePreg !== 0 && slave.race !== "mixed race" && (slave.intelligence + slave.intelligenceImplant < -50) && slave.ovaries === 1); },
				percentOdds: 70,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is shipped off to help produce a race of ${slave.race} idiots to perform eternal servitude. ${He} is not perceptive enough to fear ${his} upcoming life as a downtrodden breeder.`);
					for (const s of V.slaves) {
						if (s.intelligence + s.intelligenceImplant > 15) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Those of your slaves who are intelligent enough to understand the implications of the scheme <span class="trust dec">fear all slaveholders more, and especially you,</span> since you've shown yourself willing to subject them to eugenics.`);
					}
					return r;
				}
			}],
			["cheap brothel", {
				cost: 1.1,
				offerDesc: `from a cheap brothel chain that operates a franchise on a lower level of the arcology.`,
				get requirements() { return (!FutureSocieties.isActive('FSPaternalist') && cost < 10000); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is soon seen on shift outside a seedy establishment in the lower arcology, mechanically offering ${his} holes to passersby and flinching whenever ${his} superiors come out to check on ${him}.`);
					for (const s of V.slaves) {
						if (s.assignment === Job.WHORE || s.assignment === Job.BROTHEL) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other slave prostitutes <span class="trust dec">fear they'll be condemned</span> to similar exploitation in their turn.`);
					}
					return r;
				}
			}],
			["factory farm", {
				cost: 1.1,
				offerDesc: `from a factory farm notorious for extracting every drop of value from its slaves' bodies.`,
				get requirements() { return (!FutureSocieties.isActive('FSPaternalist') && cost < 20000 && slave.boobsImplant === 0); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is never again seen in public, but ${his} fate is obvious: ${he}'s chained to a milking rack somewhere in a cavernous factory farm, with milk draining from ${his}`);
					if (slave.balls > 0) {
						r.push(`tits and an electroshock stimulator up ${his} butt to force ${him} to cum`);
					} else if (slave.ovaries > 0) {
						r.push(`tits and a new baby in ${his} belly every ten months`);
					} else {
						r.push(`tits.`);
					}
					for (const s of V.slaves) {
						if (s.devotion <= 50) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other slaves are <span class="trust dec">afraid they'll end up like that too,</span> since the factory farms will buy almost anyone. Only your devoted slaves trust you to spare them such a fate.`);
					}
					return r;
				}
			}],
			["arcade", {
				cost: 1.1,
				offerDesc: `from a sex arcade that maintains good service quality by rapidly cycling new slaves through their facilities.`,
				get requirements() { return (!FutureSocieties.isActive('FSPaternalist') && cost < 5000); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`The upper half of ${slave.slaveName}'s body is never seen again. ${His} butt, on the other hand, is periodically visible in a lower-level arcade, ${his} orifices gradually showing the wear and ${his} price gradually decreasing, until finally ${he} is seen no more.`);
					for (const s of V.slaves) {
						if (s.devotion < 10) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your devoted slaves are fairly confident they will escape such a fate, but everyone else <span class="trust dec">is terrified of ending that way.</span>`);
					}
					return r;
				}
			}],
			["volume breeder", {
				cost: 1.1,
				offerDesc: `from a high-volume breeding operation interested in ${him} mostly for ${his} healthy, functional womb.`,
				get requirements() { return (V.seePreg !== 0 && FutureSocieties.isActive('FSPaternalist') && cost < 10000 && slave.health.condition > 40 && slave.ovaries === 1 && isFertile(slave)); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`The breeder already has stud stock, and ${slave.slaveName} is rapidly impregnated. ${He}'s kept in a stockyard on the lower service levels of the arcology, one of a dense crowd of beaten-down women with gravid bellies.`);
					for (const s of V.slaves) {
						if (s.ovaries === 1) {
							s.trust -= 2;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other fertile slaves <span class="trust dec">fear they'll be sold as breeding stock</span> if they fail to make themselves useful to you otherwise.`);
					}
					return r;
				}
			}],
			["nice brothel", {
				cost: 1.1,
				offerDesc: `from a group of partners that run a handsome brothel off the promenade.`,
				get requirements() { return (!FutureSocieties.isActive('FSDegradationist') && cost > 20000); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} disappears for a time as ${his} training is perfected, but ${he} reappears in the refined brothel, wearing classy clothes and flirting gracefully with patrons of ${his} body.`);
					for (const s of V.slaves) {
						if ((s.assignment === Job.WHORE) || (s.assignment === Job.BROTHEL)) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other slave prostitutes <span class="trust inc">hope they'll be lucky enough</span> to find themselves in relatively decent circumstances too, should you decide to sell them.`);
					}
					return r;
				}
			}],
			["free range", {
				cost: 0.8,
				offerDesc: `from a free-range farm that pays for the high costs of high quality livestock care by aggressively marketing its cruelty-free products.`,
				get requirements() { return (!FutureSocieties.isActive('FSDegradationist') && cost < 50000 && slave.boobsImplant === 0 && slave.health.condition > 40); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is a common sight around the arcology, since free range cows are allowed to range between milkings. ${He} seems reasonably content.`);
					for (const s of V.slaves) {
						if ((s.assignment === Job.MILKED) || (s.assignment === Job.DAIRY)) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other cows <span class="trust inc">hope they'll be lucky enough</span> to find themselves in relatively decent circumstances too, should you decide to sell them.`);
					}
					return r;
				}
			}],
			["milk aficionado", {
				cost: 1.4,
				offerDesc: `from a wealthy milk aficionado that would like to add ${him} to his dairy.`,
				get requirements() { return (slave.milkFlavor !== "none" && slave.boobsImplant === 0 && slave.health.condition > 40); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName} is a common sight around the arcology, since free range cows are allowed to range between milkings. ${He} seems reasonably content.`);
					for (const s of V.slaves) {
						if (s.milkFlavor !== "none") {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other flavored milk producing slaves hope that they'll also be <span class="trust inc">lucky enough</span> to find themselves being taken care of in a wealthy man's dairy too, should you decide to sell them.`);
					}
					return r;
				}
			}],
			["harvester", {
				cost: 1.2,
				offerDesc: `from an organ harvesting firm that acquires healthy raw materials cheaply.`,
				get requirements() { return (slave.chem < 50 && slave.health.condition > 40 && cost < 5000); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					r.push(`Though ${slave.slaveName}'s fate as a source of organs for transplantation is not announced, rumors of what happens to those who <span class="trust dec">fail to be valuable to you</span> pass among your slaves.`);
					for (const s of V.slaves) {
						s.trust -= 2;
					}
					return r;
				}
			}],
			["fuckdoll", {
				cost: 1,
				offerDesc: `from a manufacturer of large sexual appliances that include a living inmate, drugged into helplessness.`,
				get requirements() { return (cost < 5000); },
				percentOdds: 50,
				get completeSale() {
					const r = [];
					r.push(`Though ${slave.slaveName}'s fate as a living fucktoy is not obvious, since most of ${his} body will forever after be encased in thick latex, rumors of what happens to those who <span class="trust dec">fail to be valuable to you</span> pass among your slaves.`);
					for (const s of V.slaves) {
						s.trust -= 2;
					}
					return r;
				}
			}],
			["tentacle bred", {
				cost: 1.35, // but cheap slaves only
				offerDesc: `from a porn director interested in a cheap slave with a belly implant for use in a snuff film.`,
				get requirements() { return (V.seeExtreme === 1 && cost < 5000 && slave.vagina > -1 && slave.bellyImplant > -1); },
				percentOdds: 90,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`Sometime later, a snuff film starring ${slave.slaveName} as a heroine captured, raped, and fatally bred by tentacles is released. It receives rave reviews for the scene involving ${slave.slaveName}, depicting ${his} aphrodisiac-filled body being penetrated in all ${his} holes by tentacles. Their thrusting into ${him} increases until large bulges of cum pass through the ones filling ${his} stretched cunt, visibly bloating ${his} belly. ${He} then collapses to the ground, ${his} swollen belly rapidly growing with the tentacle spawn gestating within ${him}. As they bulge against the straining walls of ${his} implant-filled middle; ${he} lets out a final moan as ${his} belly ruptures, releasing ${his} "spawn" to hunt down the other heroines.`);
					for (const s of V.slaves) {
						if (canSee(s)) {
							if (s.intelligence + s.intelligenceImplant < -15) {
								s.devotion -= 4;
								slaveImpact = 1;
							}
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your less than intelligent slaves are <span class="devotion dec">deeply envious</span> of ${slave.slaveName}, completely failing to comprehend what they saw were not special effects.`);
					}
					return r;
				},
				allowsBoomerang: false
			}],
			["reputable trader", {
				cost: 0.9,
				offerDesc: `from a reputable slave trader who will likely ship ${him} out of the arcology.`,
				get requirements() { return true; }, // yep, no gate for this one!
				percentOdds: 30,
			}],
			["mindbreak trader", {
				cost: 0.9,
				offerDesc: `from a slave trader who buys vast numbers of mindbroken ${girl}s. His purpose is unknown, and none of them are ever seen again.`,
				get requirements() { return (slave.fetish === Fetish.MINDBROKEN); },
				percentOdds: 20,
			}],
			["concert hall", {
				cost: 1.3,
				offerDesc: `from a concert venue that wants a sex slave to keep the stage crew satisfied, but doesn't want to worry about any possible hearing loss.`,
				get requirements() { return (slave.hears === -2); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`As ${slave.slaveName} now spends all ${his} time backstage, ${he}'s rarely seen again. Occasionally, however, a roadie will bring ${him} outside as he hauls the equipment, and ${he} jacks him off.`);
					for (const s of V.slaves) {
						if (s.hears < 0) {
							s.trust += 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves with hearing problems <span class="trust inc">take some solace</span> in the idea of being bought because of their disability, not in spite of it.`);
					}
					return r;
				}
			}],
			["etiquette coach", {
				cost: 1.4,
				offerDesc: `from a slave trainer that specializes in teaching proper manners and etiquette to low-class slaves.`,
				get requirements() { return (slave.sexualFlaw === "crude"); },
				percentOdds: 60,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`${slave.slaveName}'s new etiquette trainer sends you courtesy updates on ${his} progress, as ${he} learns proper poise and enunciation, the correct locations of silverware, and how to avoid making vulgar comments while performing lascivious acts.`);
					for (const s of V.slaves) {
						if (s.sexualFlaw === "crude") {
							s.trust -= 1;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your other slaves lacking in manners consider being turned into a proper member of polite society <span class="trust dec">a fate wore than death.</span>`);
					}
					return r;
				}
			}],
			["sniper spotter", {
				cost: 1.45,
				offerDesc: `from a mercenary sniper looking for a small slave to act as his spotter.`,
				get requirements() { return (hasBothEyes(slave) && canSeePerfectly(slave) && isSlim(slave)); },
				percentOdds: 65,
				get completeSale() {
					const r = [];
					let slaveImpact;
					r.push(`The mercenary sniper greets ${slave.slaveName} before the two of them head off for a battlefield halfway around the world. "Let's hope you've got a good eye for political assassinations," he says humorlessly.`);
					for (const s of V.slaves) {
						if (s.skill.combat <= 15) {
							s.trust -= 3;
							slaveImpact = 1;
						}
					}
					if (slaveImpact === 1) {
						r.push(`Your slaves lacking in combat skills don't envy ${him}, and <span class="trust dec">in fact seem very worried</span> that they may share ${his} fate.`);
					}
					return r;
				}
			}],
		]);
		if (V.peacekeepers.state === 3) {
			buyers.set("peacekeepers", {
				cost: V.peacekeepers.attitude < 100 ? 0.5 : 1.2,
				get offerDesc() {
					if (V.peacekeepers.attitude < 100) {
						return `from the officer in charge of 'recreational activities' for General ${V.peacekeepers.generalName}'s forces. This is far less than the slave is worth, but the bid comes with the implicit offer of more influence over the peacekeepers.`;
					} else {
						return `from the sex slave buyer for General ${V.peacekeepers.generalName}'s client state${V.peacekeepers.tastes ? `, which prefers ${V.peacekeepers.tastes}` : ``}.`;
					}
				},
				get requirements() { return (V.plot && V.peacekeepers.strength >= 50); },
				percentOdds: 100,
				get completeSale() {
					const r = [];
					r.push(`${slave.slaveName} is delivered to General ${V.peacekeepers.generalName}'s forces, to serve as a barracks whore. Several days later, the purchasing officer forwards a short shot of ${slave.slaveName}`);

					cost = slaveCost(slave);
					if (V.peacekeepers.tastes === "") {
						const influential = (cost > random(10000, 50000) || V.peacekeepers.attitude > 90);
						if (influential && slave.belly >= 300000) {
							r.push(`smiling as ${his} ${bellyAdjective(slave)} belly is used as the center of a large bukkake party. You can just barely make out the figure of someone taking ${him} from behind beyond ${his} immensity. There's a note attached, stating superfluously that ${his} exotic feature makes ${him} very popular. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more massive bellied ${girl}s in the future.`);
							V.peacekeepers.tastes = "bellies with girls attached";
						} else if (influential && slave.balls > 0 && slave.scrotum > 0 && slave.dick > 0 && slave.vagina > -1 && slave.energy > 50) {
							r.push(`with dicks in ${his} mouth, pussy, and ass. ${He}'s totally covered in cum, and a lot of it is ${hers}. There's a note attached, stating superfluously that ${he}'s very popular. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more lusty futas in the future.`);
							V.peacekeepers.tastes = "lusty futanari";
						} else if (influential && slave.fetish === "cumslut" && slave.fetishStrength > 95 && slave.sexualFlaw === "cum addict") {
							r.push(`on`);
							if (hasBothLegs(slave)) {
								r.push(`${his} knees,`);
							} else {
								r.push(`the ground,`);
							}
							r.push(`sucking dick. That's where ${he}'s at home, of course, and as soon as the man ${he}'s blowing cums down ${his} throat and steps away, another immediately replaces him. ${slave.slaveName} keeps guzzling penis without hesitation. There's a note attached, stating superfluously that ${his} apparently bottomless appetite for cum has made ${him} very popular. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more cum addicts in the future.`);
							V.peacekeepers.tastes = "cum addicts";
						} else if (influential && slave.boobs > 2000 && slave.lactation > 1) {
							r.push(`standing obediently in a comfort station in one of their rear area facilities, while a huge group of muscular men and women take turns drinking straight from ${his} nipples as a break from using the other whores. Someone's fucking ${him} from behind. There's a note attached, stating superfluously that ${he}'s very popular. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more big-breasted cows in the future.`);
							V.peacekeepers.tastes = "big-breasted cows";
						} else if (influential && slave.boobs > 20000 && slave.butt > 10) {
							r.push(`standing obediently in a comfort station in one of their rear area facilities, while a huge group of muscular men titfuck ${his} near endless cleavage and another, smaller group use ${his} gigantic asscheeks. There's a note attached, stating superfluously that ${his} mind-blowing assets make ${him} very popular. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more slaves with bountiful T&A in the future.`);
							V.peacekeepers.tastes = "flesh balloons";
						} else if (influential && slave.physicalAge > 34 && slave.visualAge > 34 && slave.energy > 80) {
							r.push(`energetically bouncing atop one young man while a muscular young woman standing over ${him} rides ${his} face.`);
							if (hasAnyArms(slave)) {
								r.push(`${He}'s got dicks in`);
								if (!hasBothArms(slave)) {
									r.push(`${his} hand,`);
								} else {
									r.push(`both of ${his} hands,`);
								}
								r.push(`and is stroking them eagerly.`);
							}
							r.push(`There's a note attached, stating superfluously that ${he}'s very popular. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more horny MILFs in the future.`);
							V.peacekeepers.tastes = "horny MILFs";
						} else if (influential && slave.physicalAge < 13 && slave.visualAge < 13 && slave.boobs > 2000) {
							r.push(`kneeling over a soldier, putting ${his} proportionally massive breasts to work. There's a note attached, stating superfluously that ${he}'s very popular. It's not surprising; ${he}'s young, full of energy, and practically overflowing with tit flesh. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more busty little ${girl}s in the future.`);
							V.peacekeepers.tastes = "oppai loli";
						} else if (influential && slave.physicalAge < 25 && slave.visualAge < 25 && slave.face > 95) {
							r.push(`striking a come-hither pose for an enormous crowd of cheering soldiers. There's a note attached, stating superfluously that ${he}'s very popular. It's not surprising; ${he}'s young, very beautiful, and able to handle a lot of devoted attention. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more beautiful young sex slaves in the future.`);
							V.peacekeepers.tastes = "beautiful young sex slaves";
						} else if (influential && slave.vagina === 0 && isFertile(slave)) {
							r.push(`happily taking it vaginally while teasing the growing crowd eager to cum in ${his} needy pussy. There's a note attached, stating superfluously that ${he}'s very popular. It's not surprising; ${he} has a burning need that they are dutifully fulfilling. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more eager virgins in the future.`);
							V.peacekeepers.tastes = "fertile virgins";
						} else if (influential && slave.preg > slave.pregData.normalBirth / 4 && slave.fetish === "pregnancy" && slave.sexualFlaw === "breeder") {
							r.push(`on ${his} back, getting fucked while teasing ${his} growing baby bump. That's where ${he}'s at home, of course, and as soon as the man ${he}'s taking cums in ${his}`);
							if (slave.mpreg > 0) {
								r.push(`asspussy`);
							} else {
								r.push(`pussy`);
							}
							r.push(`and steps away, another immediately replaces him. ${slave.slaveName} keeps`);
							if (hasBothLegs(slave)) {
								r.push(`spreading ${his} legs`);
							} else {
								r.push(`presenting ${himself}`);
							}
							r.push(`without hesitation. There's a note attached, stating superfluously that ${his} apparently bottomless appetite for bareback sex has made ${him} very popular. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more baby-obsessed breeders in the future.`);
							V.peacekeepers.tastes = "baby obsessed breeders";
						} else if (influential && slave.preg > slave.pregData.normalBirth / 4 && slave.energy > 50) {
							r.push(`eagerly bouncing atop one young man while a muscular young woman standing over ${him} rides ${his} face.`);
							if (hasAnyArms(slave)) {
								r.push(`${He}'s got dicks in`);
								if (!hasBothArms(slave)) {
									r.push(`${his} hand,`);
								} else {
									r.push(`both of ${his} hands,`);
								}
								r.push(`and is stroking them eagerly, encouraging their owners to cum on ${his} rounded middle.`);
							}
							r.push(`There's a note attached, stating superfluously that ${he}'s very popular. General ${V.peacekeepers.generalName}'s buyer is going to be looking for more horny preggos in the future.`);
							V.peacekeepers.tastes = "lusty preggos";
						} else {
							if (slave.devotion > 20) {
								if (slave.energy > 80) {
									r.push(`eagerly`);
								} else {
									r.push(`willingly`);
								}
								r.push(`offering ${himself} outside`);
							} else {
								r.push(`restrained for use inside`);
							}
							r.push(`a comfort station at one of their rear area facilities, together with a note stating that ${he}'s satisfactory. ${He}'s sufficient but not remarkable enough to have a major impact.`);
						}
					} else {
						switch (V.peacekeepers.tastes) {
							case "lusty futanari":
								r.push(`getting gangbanged at a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to the erstwhile peacekeepers' preference for chicks with dicks.`);
								break;
							case "cum addicts":
								r.push(`providing incessant oral service at a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to ${his} ability to eagerly suck dick for as long as there's cum available.`);
								break;
							case "horny MILFs":
								r.push(`getting gangbanged at a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to the erstwhile peacekeepers' preference for older ${womenU} who really know how to take cocks.`);
								break;
							case "big-breasted cows":
								r.push(`being hand-milked at a comfort station at one of their rear area facilities, where ${he}'s become the most valued piece of human livestock due to the peacekeepers' growing taste for human milk.`);
								break;
							case "beautiful young sex slaves":
								r.push(`getting gangbanged at a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to the erstwhile peacekeepers' preference for beautiful young ${girl}s with those special Free Cities skills.`);
								break;
							case "fertile virgins":
								r.push(`getting gangbanged at a comfort station at one of their rear area facilities, where ${he}'s become the main attraction due to ${his} eagerness to get pregnant. Since that won't take long, they'll likely be back looking for more shortly.`);
								break;
							case "lusty preggos":
								r.push(`getting gangbanged at a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to the erstwhile peacekeepers' preference for pregnant ${womenU} with a bottomless lust for cocks.`);
								break;
							case "baby obsessed breeders":
								r.push(`getting gangbanged at a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to the erstwhile peacekeepers' preference for knocking ${womenU} up.`);
								break;
							case "bellies with girls attached":
								r.push(`suspended in a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to the erstwhile peacekeepers' preference for gigantically gravid ${girl}s.`);
								break;
							case "flesh balloons":
								r.push(`getting gangbanged at a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to the erstwhile peacekeepers' preference for absolutely enormous assets.`);
								break;
							case "oppai loli":
								r.push(`giving paizuri at a comfort station at one of their rear area facilities, where ${he}'s become the star attraction due to the erstwhile peacekeepers' preference for top-heavy little ${girl}s.`);
								break;
						}
						if (V.peacekeepers.attitude < 100) {
							V.peacekeepers.attitude++;
						}
					}
					if (V.peacekeepers.attitude < 95) {
						r.push(`${His} presence will influence General ${V.peacekeepers.generalName}'s troops in favor of a closer relationship with the Free City; old world mores are difficult to maintain while inside an arcology-trained sex slave.`);
						V.peacekeepers.attitude += Math.ceil(cost / 10000);
						V.peacekeepers.attitude = Math.min(V.peacekeepers.attitude, 95);
					} else if (V.peacekeepers.attitude < 100) {
						r.push(`With ${slave.slaveName} added to their stable of sex slaves, General ${V.peacekeepers.generalName}'s troops will be fully converted to the idea of aligning with the slaveowning Free Cities, and the general will no longer have to maintain even plausible deniability. <span class="yellow">General ${V.peacekeepers.generalName}'s little empire is now effectively a client state of ${V.arcologies[0].name}.</span>`);
						V.peacekeepers.attitude = 100;
					} else {
						r.push(`General ${V.peacekeepers.generalName}'s little empire continues to be a reliable client state of ${V.arcologies[0].name}${V.peacekeepers.tastes !== "" ? `, and a good market for ${V.peacekeepers.tastes}` : ``}.`);
					}
					return r;
				},
				allowsBoomerang: false
			});
		}
		let desc;
		if ((slave.visualAge < 20) && (slave.weight < -10) && (random(1, 100) > 80)) {
			desc = ` from a citizen who likes his slaves young and slender.`;
		} else if ((slave.visualAge > 40) && (slave.weight > 10) && (random(1, 100) > 80)) {
			desc = ` from a citizen who likes her slaves mature and motherly.`;
		} else if ((slave.dick > 3) && canAchieveErection(slave) && (random(1, 100) > 80)) {
			desc = ` from a citizen who likes fat cocks.`;
		} else if ((slave.dick > 3) && (slave.balls === 0) && (random(1, 100) > 80)) {
			desc = ` from a citizen who likes a big limp dick flopping around when he fucks a slave's asspussy.`;
		} else if ((slave.dick === 1) && (slave.balls === 0 || slave.ballType === "sterile") && (slave.anus === 3) && (random(1, 100) > 80)) {
			desc = ` from a citizen who likes sissies with anal slits longer than their little limp dicks.`;
		} else if ((slave.dick > 0) && (slave.boobs < 300) && (random(1, 100) > 80)) {
			desc = ` from a citizen who likes traps.`;
		} else if ((slave.dick > 0) && (slave.balls > 0) && (slave.boobs > 600) && (random(1, 100) > 80)) {
			desc = ` from a citizen who likes lusty shemales.`;
		} else if ((slave.piercing.anus.weight > 1) && (slave.piercing.nipple.weight > 1) && (random(1, 100) > 80)) {
			desc = ` from a citizen who is clearly fascinated by ${his} lewd piercings.`;
		} else if ((slave.anusTat > 1) && (slave.buttTat > 1) && (random(1, 100) > 80)) {
			desc = ` from a citizen who is clearly aroused by ${his} slutty tattoos.`;
		} else if ((slave.boobs > 800) && (slave.areolaeShape !== "circle") && (random(1, 100) > 80)) {
			desc = ` from a citizen who can't take his eyes off ${his} unique areolae.`;
		} else if ((slave.clit > 2) && (random(1, 100) > 80)) {
			desc = ` from a citizen who keeps running her tongue over her lips while staring at the slave's giant clit.`;
		} else if ((slave.labia > 1) && (random(1, 100) > 80)) {
			desc = ` from a citizen who has an obvious fascination with ${his} dangling labia.`;
		} else if ((slave.boobs > 2000) && (random(1, 100) > 80)) {
			desc = ` from a citizen with an obvious breast expansion fetish.`;
		} else if ((slave.preg > slave.pregData.normalBirth / 2) && (slave.lactation === 1) && (random(1, 100) > 80)) {
			desc = ` from a citizen who pays obsessive attention to ${his} gravid belly and naturally lactating breasts.`;
		} else if ((slave.ovaries === 1) && (slave.physicalAge < 25) && (random(1, 100) > 80)) {
			desc = ` from a citizen who pays unusually close attention to the section of the medical report on ${his} fertility.`;
		} else if ((slave.butt > 6) && (random(1, 100) > 80)) {
			desc = ` from a citizen with an obvious butt expansion fetish.`;
		} else if ((slave.face > 10) && (random(1, 100) > 80)) {
			desc = ` from a citizen who can't keep his eyes off ${his} pretty face.`;
		} else if ((slave.skill.anal >= 100) && (random(1, 100) > 80)) {
			desc = ` from a citizen interested in acquiring a skilled butthole bitch.`;
		} else if ((slave.skill.vaginal >= 100) && (random(1, 100) > 80)) {
			desc = ` from a citizen interested in acquiring a slut with real vaginal skill.`;
		} else if ((slave.skill.penetrative >= 100) && (random(1, 100) > 90)) {
			desc = ` from a citizen interested in be filled with a skilled stud's dick.`;
		} else if ((slave.skill.oral >= 100) && (random(1, 100) > 80)) {
			desc = ` from a citizen interested in acquiring a skilled cocksucker.`;
		} else if ((slave.health.condition > 80) && (random(1, 100) > 80)) {
			desc = ` from a citizen who pays creepily close attention to the state of ${his} health, and ignores everything else.`;
		} else if (slave.nationality && (random(1, 100) > 80)) {
			desc = ` from a citizen with a special appetite for ${moreNational(slave.nationality)} ${girl}s.`;
		}
		if (desc) {
			buyers.set("generic", {
				cost: 1.15,
				offerDesc: desc,
				get requirements() { return true; },
				percentOdds: 100,
			});
		}
		return buyers;
	}
};
