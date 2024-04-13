/**
 * @param {DocumentFragment|string|HTMLElement} [lastElement] will go on the same line as the last line
 * @returns {DocumentFragment}
 */
App.Desc.officeDescription = function(lastElement) {
	const f = document.createDocumentFragment();

	App.UI.DOM.appendNewElement("div", f, paragraph1(), "indent");
	App.UI.DOM.appendNewElement("div", f, paragraph2(), "indent");

	const lastDiv = App.UI.DOM.appendNewElement("div", f, paragraph3(), "indent");
	lastDiv.append(lastElement);

	return f;

	/**
	 * @returns {string}
	 */
	function paragraph1() {
		const r = [];
		r.push(`You are at your desk in your penthouse office. It has a glass top interface from which you can rule over ${V.arcologies[0].name}; ${V.assistant.name}'s avatar is visible in one corner.`);
		r.push(PersonalAssistantAppearance());

		if (V.clubAdsSpending >= 5000) {
			r.push(`A corner of your desk is piled with sample merchandise from the campaign promoting your club.`);
			const clubSlaves = V.slaves.filter(s => s.assignment === Job.CLUB);
			if (clubSlaves.length > 0) {
				const modeledSlave = clubSlaves.random();
				const {He, his} = getPronouns(modeledSlave);

				if (random(1, 2) === 1 || !canStand(modeledSlave)) {
					r.push(`This includes a sex toy based on ${modeledSlave.slaveName}'s`);
					if (random(1, 4) === 1 && modeledSlave.skill.penetrative >= 100 && canAchieveErection(modeledSlave) && penetrativeSocialUse(modeledSlave) > 70) {
						if (modeledSlave.dick >= 10) {
							r.push(`dick; there is no way that thing is fitting in someone.`);
						} else if (modeledSlave.dick > 6) {
							r.push(`massive penis`);
						} else if (modeledSlave.dick > 3) {
							r.push(`huge cock`);
						} else if (modeledSlave.dick > 2) {
							r.push(`dick`);
						} else {
							r.push(`tiny little erection`);
						}
						r.push(r.pop() + ".");
					} else if (random(1, 3) === 1 && modeledSlave.skill.vaginal >= 100) {
						if (modeledSlave.vagina > 3) {
							r.push(`massive vagina`);
						} else if (modeledSlave.vagina > 2) {
							r.push(`gaping cunt`);
						} else if (modeledSlave.vagina > 1) {
							r.push(`hot cunt`);
						} else if (modeledSlave.vagina > 0) {
							r.push(`tight pussy`);
						} else {
							r.push(`virgin pussy`);
						}
						r.push(r.pop() + ".");
					} else if (random(1, 2) === 1 && modeledSlave.skill.oral >= 100) {
						if (modeledSlave.lips > 40) {
							r.push(`huge`);
						} else if (modeledSlave.lips > 20) {
							r.push(`pillowlike`);
						} else if (modeledSlave.lips > 10) {
							r.push(`pretty`);
						} else {
							r.push(`thin`);
						}
						r.push(`lips and throat.`);
					} else {
						if (modeledSlave.anus > 3) {
							r.push(`blown-out butthole`);
						} else if (modeledSlave.anus > 2) {
							r.push(`roomy anus`);
						} else if (modeledSlave.anus > 1) {
							r.push(`big butthole`);
						} else if (modeledSlave.anus > 0) {
							r.push(`tight asshole`);
						} else {
							r.push(`virgin backdoor`);
						}
						r.push(r.pop() + ".");
					}
				} else {
					r.push(`There is a figurine of ${modeledSlave.slaveName}. ${He}'s depicted`);
					if (random(1, 4) === 1 && modeledSlave.skill.penetrative >= 100 && canAchieveErection(modeledSlave) && penetrativeSocialUse(modeledSlave) > 70) {
						r.push(`thrusting ${his} hips and showing off ${his}`);
						if (modeledSlave.dick < 10) {
							r.push(["former", "tiny", "little", "", "big", "huge", "gigantic", "massive", "truly imposing", "monstrous", "inhuman"][modeledSlave.dick]);
						} else {
							r.push(`hypertrophied`);
						}
						r.push(`erection.`);
					} else if (random(1, 3) === 1 && modeledSlave.skill.vaginal >= 100) {
						r.push(`lying nude on ${his} back, spreading ${his} legs to`);
						if (modeledSlave.vagina > 3) {
							r.push(`exhibit ${his} massive vagina`);
						} else if (modeledSlave.vagina > 2) {
							r.push(`show off ${his} gaping cunt`);
						} else if (modeledSlave.vagina > 1) {
							r.push(`offer ${his} hot cunt`);
						} else if (modeledSlave.vagina > 0) {
							r.push(`display ${his} tight pussy`);
						} else {
							r.push(`tantalize with ${his} virgin pussy`);
						}
						r.push(r.pop() + ".");
					} else if (random(1, 2) === 1 && modeledSlave.skill.oral >= 100) {
						r.push(`with ${his}`);
						if (modeledSlave.lips > 40) {
							r.push(`huge`);
						} else if (modeledSlave.lips > 20) {
							r.push(`pillowlike`);
						} else if (modeledSlave.lips > 10) {
							r.push(`pretty`);
						} else {
							r.push(`thin`);
						}
						r.push(`lips parted, ${his} tongue partway out.`);
					} else {
						r.push(`bending at the waist and spreading ${his}`);
						if (modeledSlave.butt > 6) {
							r.push(`gigantic buttocks`);
						} else if (modeledSlave.butt > 4) {
							r.push(`meaty asscheeks`);
						} else if (modeledSlave.butt > 2) {
							r.push(`healthy buttocks`);
						} else {
							r.push(`cute butt`);
						}
						r.push(`to show off ${his}`);
						if (modeledSlave.anus > 3) {
							r.push(`blown-out butthole`);
						} else if (modeledSlave.anus > 2) {
							r.push(`roomy butthole`);
						} else if (modeledSlave.anus > 1) {
							r.push(`big butthole`);
						} else if (modeledSlave.anus > 0) {
							r.push(`tight asshole`);
						} else {
							r.push(`virgin backdoor`);
						}
						r.push(r.pop() + ".");
					}
				}
			}
		}

		if (V.brothelAdsSpending >= 5000) {
			if (V.clubAdsSpending >= 5000) {
				r.push(`There's just as much from the similar campaign advertising ${V.brothelName}.`);
			} else {
				r.push(`A corner of your desk is piled with sample merchandise from the campaign promoting ${V.brothelName}.`);
			}
			const brothelSlaves = V.slaves.filter(s => s.assignment === Job.BROTHEL);
			if (brothelSlaves.length > 0) {
				const modeledSlave = brothelSlaves.random();
				const {he, his} = getPronouns(modeledSlave);

				if (random(1, 2) === 1 || !canStand(modeledSlave)) {
					r.push(`This includes a sex toy based on ${modeledSlave.slaveName}'s`);
					if (random(1, 3) === 1 && modeledSlave.skill.vaginal >= 100) {
						if (modeledSlave.vagina > 3) {
							r.push(`massive vagina`);
						} else if (modeledSlave.vagina > 2) {
							r.push(`gaping cunt`);
						} else if (modeledSlave.vagina > 1) {
							r.push(`hot cunt`);
						} else if (modeledSlave.vagina > 0) {
							r.push(`tight pussy`);
						} else {
							r.push(`virgin pussy`);
						}
						r.push(r.pop() + ".");
					} else if (random(1, 2) === 1 && modeledSlave.skill.oral >= 100) {
						if (modeledSlave.lips > 40) {
							r.push(`huge`);
						} else if (modeledSlave.lips > 20) {
							r.push(`pillowlike`);
						} else if (modeledSlave.lips > 10) {
							r.push(`pretty`);
						} else {
							r.push(`thin`);
						}
						r.push(`lips and throat.`);
					} else {
						if (modeledSlave.anus > 3) {
							r.push(`blown-out butthole`);
						} else if (modeledSlave.anus > 2) {
							r.push(`roomy butthole`);
						} else if (modeledSlave.anus > 1) {
							r.push(`big butthole`);
						} else if (modeledSlave.anus > 0) {
							r.push(`tight asshole`);
						} else {
							r.push(`virgin backdoor`);
						}
						r.push(r.pop() + ".");
					}
				} else {
					r.push(`This includes paired figurines of ${modeledSlave.slaveName} with a faceless male figure;`);
					if (random(1, 3) === 1 && modeledSlave.skill.vaginal >= 100) {
						r.push(`${he}'s shamelessly riding his dick.`);
					} else if (random(1, 2) === 1 && modeledSlave.skill.oral >= 100) {
						r.push(`${he}'s on ${his}`);
						if (hasAnyLegs(modeledSlave)) {
							r.push(`${his} ${hasBothLegs(modeledSlave) ? "knees" : "knee"}`);
						} else {
							r.push(`the ground`);
						}
						r.push(`with ${his}`);
						if (modeledSlave.lips > 40) {
							r.push(`huge`);
						} else if (modeledSlave.lips > 20) {
							r.push(`pillowlike`);
						} else if (modeledSlave.lips > 10) {
							r.push(`pretty`);
						} else {
							r.push(`thin`);
						}
						r.push(`lips wrapped around his dick.`);
					} else {
						r.push(`${he}'s shown`);
						if (modeledSlave.anus > 3) {
							r.push(`looking up teasingly as ${he} takes his dick up ${his} blown-out butthole`);
						} else if (modeledSlave.anus > 2) {
							r.push(`looking up teasingly as ${he} takes his dick up ${his} roomy anus`);
						} else if (modeledSlave.anus > 1) {
							r.push(`looking up teasingly as ${he} takes his dick in ${his} big butthole`);
						} else if (modeledSlave.anus > 0) {
							r.push(`gasping as ${he} takes his dick in ${his} tight asshole`);
						} else {
							r.push(`screaming as he fucks ${his} virgin backdoor`);
						}
						r.push(r.pop() + ".");
					}
				}
			}
		}

		return r.join(" ");
	}

	/**
	 * @returns {string}
	 */
	function paragraph2() {
		const r = [];

		r.push("Next to your desk is a sturdy black leather couch. All the walls on this floor are glass, so you can see your");
		if (V.slaves.length > 50) {
			r.push(`innumerable`);
		} else if (V.slaves.length > 20) {
			r.push(`many`);
		} else if (V.slaves.length > 10) {
			r.push(`numerous`);
		} else if (V.slaves.length > 5) {
			r.push(`handful of`);
		} else {
			r.push(`few`);
		}
		r.push(`slaves going about their business. The room is designed so that everyone must walk past the door to your office to get anywhere.`);

		if (V.personalArms > 0) {
			r.push(`Your custom armor rests in the corner of the room where visitors can admire it, and you can don it quickly if necessary.`);
			if (V.week > (43 - V.nationHate) && V.mercenaries >= 5) {
				r.push(`Its plates bear scarring won in victorious battle, and from its back rises a banner depicting you at the head of your ${V.mercenariesTitle}.`);
			} else if (V.week > (43 - V.nationHate)) {
				r.push(`Its plates bear scarring fairly won.`);
			}
			if (V.assistant.personality > 0) {
				const {
					HeA, heA, hisA, himA, girlA, himselfA, womanA, loliA
				} = getPronouns(assistant.pronouns().main).appendSuffix("A");

				r.push(`The last time ${heA} had it maintained, ${V.assistant.name} added`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted with ${hisA} fangs bared, each strand of ${hisA} tentacle hair holding a lightning bolt, and both of ${hisA} cocks ejaculating fire.`);
						break;
					case "shemale":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted straddling a battle rifle so closely that it looks like ${heA}'s intimately entangled in the action.`);
						break;
					case "amazon":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted in a classic nude bodybuilder's pose, but with a cutely coquettish expression.`);
						break;
					case "businesswoman":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted wearing underwear, for once, and looking very severe as ${heA} straddles a cruise missile in a classic bombshell pose.`);
						break;
					case "fairy":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted naked as usual, standing on top of a large bullet and making finger guns with a grin on ${hisA} face.`);
						break;
					case "pregnant fairy":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted naked as usual, straddling a large bullet and making peace signs with ${hisA} tongue sticking out.`);
						break;
					case "goddess":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted demurely but barely covering ${hisA} radiant body with a flowing ribbon, like a goddess about to burst with triplets.`);
						break;
					case "hypergoddess":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted barely covering ${hisA} hugely pregnant, radiant body with a flowing ribbon, like a goddess about to burst open from ${hisA} hundreds of children.`);
						break;
					case "loli":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s cutely hugging a rifle to ${hisA} flat chest.`);
						break;
					case "preggololi":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s flashing ${hisA} lewd preggo ${loliA} pussy.`);
						break;
					case "angel":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted wielding a flaming sword and golden shield.`);
						break;
					case "cherub":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted hugging a bow to ${hisA} chest.`);
						break;
					case "incubus":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted mid-orgasm, a bullet rocketing from ${hisA} dick amidst a blast of cum.`);
						break;
					case "succubus":
						r.push(`a pinup of ${himselfA} to its plating:`);
						switch (V.assistant.fsAppearance) {
							case "paternalist":
								r.push(`${heA}'s depicted hiking ${hisA} skirt to flash ${hisA} crotch.`);
								break;
							case "degradationist":
								r.push(`${heA}'s depicted striking a pose showing off ${hisA} countless piercings.`);
								break;
							case "roman revivalist":
								r.push(`${heA}'s depicted in a stola, flashing ${hisA} tits.`);
								break;
							case "neoimperialist":
								r.push(`${heA}'s depicted in a tight Imperial bodysuit that shows off every curve.`);
								break;
							case "egyptian revivalist":
								r.push(`${heA}'s depicted groping ${hisA} perfect bronze breasts while blowing a kiss.`);
								break;
							case "edo revivalist":
								r.push(`${heA}'s depicted in a kimono, pulled open to flash ${hisA} lovely breasts.`);
								break;
							case "arabian revivalist":
								r.push(`${heA}'s depicted wearing fine silks and striking a sexy pose, though they fail to cover anything on ${himA}.`);
								break;
							case "chinese revivalist":
								r.push(`${heA}'s depicted wearing colorful silk robes; ${heA}'s pulled them open to flash ${hisA} lovely body.`);
								break;
							case "antebellum revivalist":
								r.push(`${heA}'s depicted in a low-cut lacy dress that draws attention to ${hisA} chest`);
								break;
							case "supremacist":
								r.push(`${heA}'s depicted wearing the dress of an old world ${V.arcologies[0].FSSupremacistRace} noble ${womanA} and blowing a kiss in a sexy manner.`);
								break;
							case "subjugationist":
								r.push(`${heA}'s depicted sitting with ${hisA} legs wide open and using ${hisA} fingers to spread ${hisA} ${V.arcologies[0].FSSubjugationistRace} pussy lips apart in a lewd manner.`);
								break;
							case "chattel religionist":
								r.push(`${heA}'s depicted striking a sexy pose, chosen specifically to draw attention to the symbols of your religion that adorn ${hisA} nipples.`);
								break;
							case "repopulation focus":
								r.push(`${heA}'s depicted striking a sexy pose made to draw the eye to ${hisA} pregnant belly.`);
								break;
							case "eugenics":
								r.push(`${heA}'s depicted striking a sexy pose; ${heA}'s so stunning you can't look away.`);
								break;
							case "physical idealist":
								r.push(`${heA}'s depicted flexing ${hisA} tremendous`);
								if (V.arcologies[0].FSPhysicalIdealistStrongFat === 1) {
									r.push(`${r.pop()}, fat-veiled`);
								}
								r.push(`musculature intimidatingly.`);
								break;
							case "hedonistic decadence":
								r.push(`${heA}'s depicted deep throating a banana while groping ${hisA} large, soft belly.`);
								break;
							case "gender radicalist":
								r.push(`${heA}'s depicted facing away from you, looking over ${hisA} shoulder suggestively and presenting`);
								if (V.arcologies[0].FSGenderRadicalistLawFuta === 1) {
									r.push(`${hisA} rear. A pair of balls hangs beneath ${hisA} tight pussy.`);
								} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 2) {
									r.push(`${hisA} anus. A pair of heavy balls hangs from ${hisA} crotch.`);
								} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 3) {
									r.push(`${hisA} gigantic ass.`);
								} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 4) {
									r.push(`${hisA} anus. A tiny pair of balls hangs from ${hisA} crotch.`);
								} else {
									r.push(`${hisA} rear.`);
								}
								break;
							case "gender fundamentalist":
								r.push(`${heA}'s depicted with one hand on ${hisA} supple breast and the other tracing the curve of ${hisA} child-bearing hips.`);
								break;
							case "asset expansionist":
								r.push(`${heA}'s depicted cradling ${hisA} own pair of ballistics; ${hisA} gigantic breasts are painted like atom bombs.`);
								break;
							case "transformation fetishist":
								r.push(`${heA}'s depicted striking a pose with one arm supporting ${hisA} enormous implants.`);
								break;
							case "pastoralist":
								r.push(`${heA}'s depicted striking a sexy pose, hands trying to relieve the pressure of ${hisA} quartet of milk-filled breasts.`);
								break;
							case "maturity preferentialist":
								r.push(`${heA}'s depicted in a pose not unlike something you'd see on a 60's pinup calendar`);
								break;
							case "youth preferentialist":
								r.push(`${heA}'s depicted in a pose fresh out of a popular idol's newest video.`);
								break;
							case "slimness enthusiast":
								r.push(`${heA}'s depicted striking a sexy pose while running ${hisA} hands across ${hisA}`);
								if (V.arcologies[0].FSSlimnessEnthusiastLaw === 1) {
									r.push(`flat chest.`);
								} else {
									r.push(`slim assets.`);
								}
								break;
							case "body purist":
								r.push(`${heA}'s depicted striking a sexy pose that shows off every flawless`);
								if (V.showInches === 2) {
									r.push(`inch`);
								} else {
									r.push(`centimeter`);
								}
								r.push(`of ${hisA} body.`);
								break;
							case "intellectual dependency":
								r.push(`${heA}'s depicted riding a missile, both literally and sexually.`);
								break;
							case "slave professionalism":
								r.push(`${heA}'s depicted getting hands-on with cruise missile, priming it to go off.`);
								break;
							case "petite admiration":
								r.push(`${heA}'s depicted striking a pose with a rifle as large as ${heA} is.`);
								break;
							case "statuesque glorification":
								r.push(`${heA}'s depicted striking a sexy pose. ${HeA} made sure to utilize the armor's entire height.`);
								break;
							default:
								r.push(`${heA}'s posing like a classic centerfold ${girlA}.`);
						}
						break;
					case "imp":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted straddling a trident; pussy juices running down its shaft.`);
						break;
					case "witch":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted straddling a broom, winking.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`a pinup of ${himselfA} to its plating: you have no idea what to make of it. Whatever it is, it is devouring your enemies on one end and popping out proper slaves from the other.`);
						break;
					case "schoolgirl":
						r.push(`a pinup of ${himselfA} to its plating: ${heA}'s depicted up on tiptoe, back turned, with ${hisA} school${girlA} skirt riding up to bare ${hisA} bottom.`);
						break;
					default:
						r.push(`${hisA} own symbol to its insignia.`);
				}
			}
		}
		return r.join(" ");
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function paragraph3() {
		const frag = new DocumentFragment();
		const r = [];

		r.push(printTrinkets());

		r.push(`A small mirror resides on your desk, facing you.`);
		r.push(`A ${V.PC.visualAge} year old, ${V.PC.faceShape}`);
		if (V.PC.markings === "freckles") {
			r.push(`${r.pop()}, freckled`);
		} else if (V.PC.markings === "heavily freckled") {
			r.push(`${r.pop()}, densely freckled`);
		}
		r.push(`face stares back at you.`);
		if (V.playerAging !== 0 && V.PC.birthWeek === 51) {
			r.push(`You'll be turning ${V.PC.actualAge + 1} next week.`);
		}

		r.push(App.Desc.Player.officeBoobs(), App.Desc.Player.officeBelly(), App.Desc.Player.officeCrotch(), App.Desc.Player.officeButt());

		App.Events.addNode(frag, r);
		return frag;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function printTrinkets() {
		const frag = new DocumentFragment();

		frag.append(
			`There's a display case behind your desk, with `,
			App.UI.DOM.linkReplace(`${num(V.trinkets.size)} items`, trinkets()),
			` in it.`,
		);

		return frag;

		function trinkets() {
			const frag = new DocumentFragment();

			/** @type {Array<string|HTMLElement>} */
			let trinketElements = [];
			let plurals = false;

			for (const [trinketDesc, value] of V.trinkets) {
				if ((typeof value === "number" && value === 1) || (Array.isArray(value) && value.length === 0)) {
					trinketElements.push(capFirstChar(trinketDesc));
				} else {
					trinketElements.push(trinketPluralReplacer(trinketDesc, value));
					plurals = true;
				}
			}
			trinketElements.sort((a, b) => a > b ? 1 : -1);

			if (trinketElements.length === 1) {
				if (V.trinkets.size === 1) {
					frag.append(`a single item:`);
				} else {
					frag.append(`:`);
				}
			} else if (trinketElements.length === 2 && plurals === false) {
				frag.append(`a couple of items:`);
			}
			const list = App.UI.DOM.appendNewElement("ul", frag);

			list.style.textIndent = "0";
			trinketElements.forEach(ts => App.UI.DOM.appendNewElement("li", list, ts));

			return frag;
		}
	}

	/**
	 *
	 * @param {string} desc
	 * @param {number|FC.TrinketData[]} value
	 * @returns {HTMLElement}
	 */
	function trinketPluralReplacer(desc, value) {
		const isArray = Array.isArray(value) && value.length > 0;
		const his = (isArray && value[0].id && getSlave(value[0].id) ? getPronouns(getSlave(value[0].id)).possessive : "their");
		const he = (isArray && value[0].id && getSlave(value[0].id) ? getPronouns(getSlave(value[0].id)).pronoun : "they");
		switch (desc) {
			case "best in show balls":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A best in show ribbon awarded to`, slaveSentence(value), `for ${his} balls`]);
					} else {
						App.Events.addNode(el, [`Best in show ribbons awarded to`, slaveSentence(value), `for their balls`]);
					}
					return el;
				} else {
					return null;
				}
			case "best in show milk cow":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A best in show ribbon awarded to`, slaveSentence(value), `as a milk cow`]);
					} else {
						App.Events.addNode(el, [`Best in show ribbons awarded to`, slaveSentence(value), `as milk cows`]);
					}
					return el;
				} else {
					return null;
				}
			case "best in show breeder":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A best in show ribbon awarded to`, slaveSentence(value), `as a breeder`]);
					} else {
						App.Events.addNode(el, [`Best in show ribbons awarded to`, slaveSentence(value), `as breeders`]);
					}
					return el;
				} else {
					return null;
				}
			case "famous courtesan":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A framed article written about`, slaveSentence(value), `when ${he} debuted as a famous courtesan`]);
					} else {
						App.Events.addNode(el, [`Framed articles written about`, slaveSentence(value), `when they debuted as famous courtesans`]);
					}
					return el;
				} else {
					return null;
				}
			case "famous whore":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A framed pornographic advertisement for`, slaveSentence(value), `from the week ${he} became a famous whore`]);
					} else {
						App.Events.addNode(el, [`Framed pornographic advertisements from`, slaveSentence(value), `from the weeks they became famous whores`]);
					}
					return el;
				} else {
					return null;
				}
			case "catgirl icon":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A gorgeous quasi-religious icon made by`, slaveSentence(value), `showing you creating the catgirl race`]);
					} else {
						App.Events.addNode(el, [`Gorgeous quasi-religious icons made by`, slaveSentence(value), `showing you creating the catgirl race`]);
					}
					return el;
				} else {
					return null;
				}
			case "cat clay sculpture":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A small, elegant clay sculpture made by`, slaveSentence(value), `showing you surrounded by happy catgirl slaves`]);
					} else {
						App.Events.addNode(el, [`Small, elegant clay sculptures made by`, slaveSentence(value), `showing you surrounded by happy catgirl slaves`]);
					}
					return el;
				} else {
					return null;
				}
			case "cat drawing":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A pretty drawing of you and`, slaveSentence(value), `cuddling together peacefully`]);
					} else {
						App.Events.addNode(el, [`Pretty drawings of you and`, slaveSentence(value), `cuddling together peacefully`]);
					}
					return el;
				} else {
					return null;
				}
			case "cat crayon":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A red construction paper heart with crude crayon figures of you and`, slaveSentence(value), `holding hands above text reading "I LUV U ${V.PC.title !== 0 ? `MASTER` : `MISTRESS`}"`]);
					} else {
						App.Events.addNode(el, [`Red construction paper hearts with crude crayon figures of you and`, slaveSentence(value), `holding hands above text reading "I LUV U ${V.PC.title !== 0 ? `MASTER` : `MISTRESS`}"`]);
					}
					return el;
				} else {
					return null;
				}
			case "a cloth napkin":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A cloth napkin skillfully folded into the shape of`, value[0].napkinShape, `given to you by`, slaveSentence(value)]);
					} else {
						const r = [];
						// Napkins are weird; we need to sort by two properties: napkinShape and the slave. First, set up a map of the types of napkins, and attach the appropriate slaves to them by value:
						const napkinMap = new Map([]);
						for (const slave of value) {
							if (!napkinMap.get(slave.napkinShape)) {
								napkinMap.set(slave.napkinShape, []);
							}
							napkinMap.get(slave.napkinShape).push(slave);
						}
						r.push(`Cloth napkins skillfully folded into ${napkinMap.size === 1 ? "a single shape" : "various shapes"} by your slaves.`);
						// Make a fragment for each napkin type that we have, including the slaves that made that type
						for (const [shape, slaves] of napkinMap) {
							r.push(App.UI.DOM.combineNodes(slaveSentence(slaves), ` ${slaves.length === 1 ? "" : "each "}made ${shape}.`,));
						}
						App.Events.addNode(el, r);
					}
					return el;
				} else {
					return null;
				}
			case "a framed shot from porn starring":
				if (isArray) {
					const el = document.createElement("span");
					if (value.length === 1) {
						App.Events.addNode(el, [`A framed shot from porn starring`, slaveSentence(value), `, ${value[0].extra}`]);
					} else {
						const r = [];
						const sl = [];
						r.push(`Framed shots from porn starring`);
						for (const slave of value) {
							sl.push(App.UI.DOM.combineNodes(slaveName(slave), ` (${slave.extra})`));
						}
						r.push(App.UI.DOM.combineNodes(App.UI.DOM.toSentence(sl), `.`));
						App.Events.addNode(el, r);
					}
					return el;
				} else {
					return null;
				}
			case "a poster for the movie that was made about the love between one of your mercenaries and": {
				if (isArray) {
					const el = document.createElement("span");
					el.append("A poster for the movie that was made about the love between one of your mercenaries and ", slaveSentence(value), ".");
					return el;
				} else {
					return null;
				}
			}
			// should never have plurals
			case "a collection of diplomas from expensive schools":
			case "a framed low denomination piece of paper money from your native country":
			case "a battered old assault rifle":
			case "a framed picture of a slave with her sale price scrawled across the bottom":
			case "an artist's impression of an early arcology design":
			case "a framed copy of the first news story featuring yourself":
			case "a miniature model of your first arcology":
			case "a copy of the first porno you starred in":
			case "a framed picture of your late Master":
			case "your favorite handgun, whose sight has instilled fear in many":
			case "a news clipping of your first successful live hack":
			case "a damaged plate carrier bearing Daughters of Liberty insignia":
			case "a Daughters of Liberty flag that once hung in their forward command post within your arcology":
			case "a Daughters of Liberty brassard":
			case "a shot-torn flag of the failed nation whose militants attacked the Free City":
				return App.UI.DOM.makeElement("span", capFirstChar(desc));
			// manual replacement
			case "a thank-you note from a MILF tourist whom you made feel welcome in the arcology":
				return App.UI.DOM.makeElement("span", "Several thank-you notes from MILF tourists whom you made feel welcome in the arcology");
			// replacement by groups
			default:
				if (desc.endsWith("citizen")) { // will not reduce spam from different future societies
					desc = desc.replace("message", "messages");
					desc = desc.replace("from a", "from");
					desc = desc.replace("a ", "several ");
					desc = desc.replace("citizen", "citizens");
					desc = desc.replace("number", "numbers");
					desc = desc.replace("test", "tests");
				} else if (desc.endsWith("acquaintance")) {
					desc = desc.replace("note", "notes");
					desc = desc.replace("from a", "from");
					desc = desc.replace("a ", "several ");
					desc = desc.replace("owner", "owners");
				}
				return App.UI.DOM.makeElement("span", capFirstChar(desc));
		}

		/**
		 * @param {FC.TrinketData} obj
		 * @returns {string|HTMLElement}
		 */
		function slaveName(obj) {
			if (obj.id && getSlave(obj.id)) {
				return App.UI.DOM.link(
					getSlave(obj.id).slaveName,
					() => {
						V.AS = obj.id;
					},
					[],
					"Slave Interact"
				);
			} else {
				return obj.name;
			}
		}

		/**
		 * @param {Array<FC.TrinketData>} slaveArray
		 * @returns {DocumentFragment}
		 */
		function slaveSentence(slaveArray) {
			return App.UI.DOM.toSentence(slaveArray.map(s => slaveName(s)));
		}
	}
};
