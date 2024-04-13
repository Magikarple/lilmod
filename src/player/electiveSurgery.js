App.UI.electiveSurgery = function() {
	const el = document.createElement("div");
	const {
		HeU, He,
		heU, hisU, himU, himselfU,
		girlU
	} = getNonlocalPronouns(V.seeDicks === 100 ? 100 : 0).appendSuffix("U");

	const arcology = V.arcologies[0];
	let freebie = 0;

	// half for a visual, half to keep track of asset variations
	// important notes are boobs, butt, belly, and dick
	const nurse = BaseSlave();
	nurse.race = arcology.FSSupremacistRace;
	nurse.devotion = 100;
	nurse.trust = 100;
	if (["asian", "semitic", "southern european", "white"].includes(nurse.race)) {
		nurse.skin = "light";
	} else {
		nurse.skin = "brown";
	}
	if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
		nurse.weight = 60;
	} else {
		nurse.weight = -30;
	}
	nurse.waist = -60;
	if (FutureSocieties.isActive('FSPhysicalIdealist', arcology)) {
		nurse.muscles = 20;
	}
	if (FutureSocieties.isActive('FSSlimnessEnthusiast', arcology)) {
		nurse.boobs = 300;
	} else {
		nurse.boobs = 2000;
		if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
			nurse.boobs = 10000;
		}
		if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
			nurse.boobs = 10000;
			nurse.boobsImplant = 9800;
		} else if (!FutureSocieties.isActive('FSBodyPurist', arcology)) {
			nurse.boobsImplant = nurse.boobs - 1000;
		}
	}
	nurse.boobShape = "perky";
	if (FutureSocieties.isActive('FSPastoralist', arcology)) {
		nurse.lactation = 2;
	}
	nurse.hips = 1;
	if (FutureSocieties.isActive('FSSlimnessEnthusiast', arcology)) {
		nurse.butt = 1;
	} else {
		nurse.butt = 4;
		if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
			nurse.butt = 8;
			nurse.buttImplant = 4;
		}
		if (arcology.FSGenderRadicalistLawFuta === 1) {
			nurse.dick = 3;
			nurse.balls = 2;
		} else if (arcology.FSGenderRadicalistLawFuta === 3) {
			nurse.butt = 12;
			nurse.hips = 3;
		}
		if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
			nurse.buttImplant = nurse.butt-2;
		} else if (!FutureSocieties.isActive('FSBodyPurist', arcology)) {
			nurse.buttImplant = 2;
		}
	}
	nurse.lips = 60;
	nurse.lipsImplant = 40;
	nurse.hLength = 20;
	nurse.hStyle = "bun";
	nurse.hColor = "black";
	nurse.eye.left.iris = "brown";
	nurse.eye.right.iris = "brown";
	if (FutureSocieties.isActive('FSIntellectualDependency', arcology)) {
		nurse.clothes = "a slutty nurse outfit";
	} else {
		nurse.clothes = "a nice nurse outfit";
	}
	if (V.pSurgery.nursePreg > 0) {
		nurse.preg = V.pSurgery.nursePreg;
		nurse.pregType = 1;
		SetBellySize(nurse);
	}

	if (V.pSurgery.state > 1) {
		App.Events.addParagraph(el, [
			`You arrive at your favorite plastic surgeon for your appointment to find them as busy as ever, but you find yourself quickly directed into an exam room by their jealous assistant. ${(nurse.butt > 10 || nurse.belly >= 10000) ? `The ponderous ${girlU} squeezes in after you and starts` : `${HeU} gets right to the point in`} stripping you down, measuring you and making sure you are healthy enough for surgery${(nurse.butt > 10 || nurse.belly >= 5000 || nurse.boobs > 2000) ? `; it's actually kind of impressive just how well ${heU}'s managing to avoid brushing ${hisU} lewd body against you` : ""}. "What can we help you with today?"`
		]);
	} else if (V.pSurgery.state > 0) {
		App.Events.addParagraph(el, [
			`You arrive at your favorite plastic surgeon for your appointment to find them as busy as ever, but you find yourself ${(nurse.butt > 10 || nurse.belly >= 10000) ? "directed" : "quickly hurried"} into an exam room by their ${nurse.boobs > 2000 ? "busty" : "cute"} assistant. ${(nurse.butt > 10 || nurse.belly >= 10000) ? `The ponderous ${girlU} squeezes in after you and starts` : `${HeU} wastes no time`} stripping you down, measuring you and making sure you are healthy enough for surgery, all the while not so subtly running ${hisU} hands across ${nurse.belly >= 5000 ? `your body and pushing ${hisU} baby bump into` : "every part of"} you. ${V.pSurgery.disloyal ? "...I can tell you've had surgery done by someone other than us. And that's fine and all. It's just the 'happy ending' is a courtesy, you know? And I'm not sure I'm feeling it anymore. Well then, what surgery you want?" : "So, what can I help you with?"}"`
		]);
		if (V.pSurgery.disloyal) {
			V.pSurgery.state = 2;
		}
	} else {
		App.Events.addParagraph(el, [
			`You ${canWalk(V.PC) ? "wander" : "drive"} up and down ${arcology.name}'s primary medical pavilion, taking in what practices are available and their relative popularity. ${FutureSocieties.isActive('FSBodyPurist', arcology) ? "Most of the plastic surgeons have packed up and left, but of those that chose to stay," : "While there is no shortage of plastic surgeons to choose from,"} there is a clear winner; the small suite at the end of the wing completely swarmed by patrons. It takes some effort to work your way through the crowd, but the moment the ${nurse.boobs > 2000 ? "busty" : "cute"} assistant behind the counter notices you and ${nurse.belly >= 10000 ? "waddles" : "rushes"} over${nurse.butt > 10 ? `, practically bulldozing ${himselfU} a path in the process with ${hisU} absurd hips and rear` : ""}, do you find yourself whisked away to an exam room by ${himU}. "${V.PC.visualAge < V.minimumSlaveAge ? "Oh my god! You're so cute! Does your mother know you're here? If she doesn't, your secret's safe with us!" : "You're the new owner, right? Recognized you from the newsfeeds"}. Anyway, we'll need to do a few measurements, take some biometrics, and sign a couple papers before we can put you under the knife. You know, standard business and all that." With the paperwork taken care of, and after what can only be called an "intimate fondlng" under the guise of a medical examination${nurse.butt > 10 || nurse.belly >= 5000 || nurse.boobs > 2000 ? `, with a little helping of ${hisU} larger assets rubbing against you on the side` : ""}, you're ready to look over the available procedures. ${nurse.butt > 10 || nurse.belly >= 5000 || nurse.boobs > 2000 ? `"Heh, yeah I can get a little handsy, and feeling all of this," ${heU} gestures at ${hisU} enhanced curves, "pushing against someone is just soo thrilling!` : `"Heh, yeah I can get a little handsy.`} I think that's part of why we're so popular, not that any of the doctors' work is shabby or anything! I mean, I came out okay, right? Plus I really do enjoy seeing what they can come up with, it's an art form, really, and boy does it get me excited." ${HeU} coughs and gets back to the heart of the matter. "You have a dream body, and we have the means to make it happen! So, what can I help you with?"`
		]);
		App.Events.addParagraph(el, [
			`"Oh! I almost forgot! Since you're a new client, <span class="green">today's basic surgery is half off!</span>${FutureSocieties.isActive('FSBodyPurist', arcology) ? ` But, <span class="red">the cost of implants is still high</span> due to policy, unfortunately...` : FutureSocieties.isActive('FSTransformationFetishist', arcology) ? ` And with <span class="green">implants being so cheap,</span> we're practically giving them away!` : ""}"`
		]);
		freebie = 1;
		V.pSurgery.state = 1;
	}
	if (V.pSurgery.state > 1) {
		if (FutureSocieties.isActive('FSBodyPurist', arcology)) {
			App.Events.addParagraph(el, [
				`"Oh, and thanks to your leadership, I <span class="red">can't get reasonably priced implants anymore.</span> So thanks for that."`
			]);
		} else if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
			App.Events.addParagraph(el, [
				`"Oh, and you should know that we have an abundance of implants being made, so <span class="green">they're quite cheap</span> these days. So thanks, I guess..."`
			]);
		}
	} else if (V.pSurgery.state > 0) {
		if (FutureSocieties.isActive('FSBodyPurist', arcology)) {
			App.Events.addParagraph(el, [
				`"Ah! And you should be aware that there is an implant shortage <span class="red">driving up their price.</span> I guess that's just how things are these days..."`
			]);
		} else if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
			App.Events.addParagraph(el, [
				`"Oh, and we're overflowing with implants, as if you couldn't tell, so <span class="green">they're really cheap!</span> I know I'm going to get some more put in soon!"`
			]);
		}
	}

	face();
	skin();
	breasts();
	belly();
	butt();
	balls();
	vagina();
	ovaries();
	sexType();

	return el;

	/**
	 * @param {number} price the price to be potential discounted
	 * @param {boolean} [implant] should be true if it is an implant being discounted
	 * @returns {number} discounted price
	 */
	function applyDiscount(price, implant = false) {
		if (freebie === 1) {
			price *= .5;
		}
		if (implant) {
			if (FutureSocieties.isActive('FSBodyPurist', arcology)) {
				price *= 2;
			} else if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
				price *= .5;
			}
		}
		price = Math.trunc(price);
		return price;
	}

	/**
	 * Appends a div to `el` that lets the player change their facial features (younger or older)
	 */
	function face() {
		const p = document.createElement("p");
		const r = [];
		const linkArray = [];
		App.Events.addNode(p, [
			`"You sure you want to mess with that lovely face?" ${heU} teases, caressing your cheek. "<span class="cash">${cashFormat(applyDiscount(5000))}.</span> Also wouldn't recommend changing your eyes, face shape or skin color; some security systems get real uppity over things like that. Though I s'pose race and hair can fall under that as well, but hey, we don't handle racial surgery and this isn't a hair salon, so nothing to worry about, right? Yes, I'm certain your systems will recognize you after we finish working on you — give us some credit."`
		], "div");
		r.push(`You're <span class="intro question">${V.PC.actualAge} years old.</span>`);
		if (V.PC.faceImplant) {
			if (V.PC.visualAge > V.PC.actualAge) {
				r.push(`You've had surgery to make yourself <span class="lime">look ${V.PC.visualAge > V.PC.actualAge ? 'older' : 'younger'}.</span>`);
				linkArray.push(surgeryLink("Undo Facial surgery", "restoreFace", () => {
					V.PC.faceImplant = 0;
					V.PC.visualAge = V.PC.physicalAge;
					cashX(forceNeg(applyDiscount(5000)), "PCmedical");
				}));
			}
		} else {
			if (V.PC.actualAge >= 65 || V.PC.actualAge >= 50) {
				r.push(`You could benefit from a face lift.`);
			} else if (V.PC.actualAge >= 35) {
				r.push(`You could go for a face lift, though making yourself look older could be useful.`);
			} else {
				r.push(`You could undergo facial surgery to make yourself look older${(V.PC.visualAge >= 25) ? ", though you could also make yourself look even younger" : ""}.`);
			}
			if (V.PC.visualAge >= 25) {
				linkArray.push(surgeryLink(`${V.PC.actualAge < 35 ? 'Remodel your face to appear younger' : 'Get a face lift'}`, "ageDown", () => {
					V.PC.faceImplant = 1;
					cashX(forceNeg(applyDiscount(5000)), "PCmedical");
				}));
			}
			linkArray.push(surgeryLink("Remodel your face to appear older", "ageUp", () => {
				V.PC.faceImplant = 1;
				cashX(forceNeg(applyDiscount(5000)), "PCmedical");
			}));
		}
		App.Events.addNode(p, r, "div");
		p.append(App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray)));
		el.append(p);
	}

	/**
	 * Appends a div to `el` that lets the player change their skin tone
	 */
	function skin() {
		const p = document.createElement("p");
		const r = [];
		App.Events.addNode(p, [
			`"Your skin is beautiful as is, but we can change it if you want," ${heU} says, pulling a large tanning bed-like cart out of a closet. "<span class="cash">${cashFormat(applyDiscount(2000))}.</span> This thing just came out of testing. I assure you it doesn't cause cancer anymore! But still, mind your security systems. We won't be held accountable if you get arrested for trying to enter your penthouse." ${HeU} looks a little worrisome, "Now, there are some side effects, and we will have to keep you under special care for a few days. It's similar to a severe sunburn, across your entire body, all of it, even down there. Now don't give me that look, we have special ointments to soothe the pain and have a little fun with." ${HeU} tosses you a wink alongside a hesitant giggle. "Now all your typical skin tones are preprogrammed into it, and with a couple button presses... There! I unlocked the option for custom hues. Now this thing is going to recolor your skin pigment permanently, so you might want to take it seriously. It'll all be on you if I choke with laughter ${(V.PC.dick !== 0) ? `sucking on your big polka-dotted cock` : `going down on your polka-dotted pussy`}!"`
		], "div");

		r.push(`You have <span class="intro question">${V.PC.skin} skin.</span>`);
		if (V.PC.skin !== V.PC.origSkin) {
			r.push(`Your original skin tone was ${V.PC.origSkin}.`);
		}
		App.Events.addNode(p, r, "div");

		const choiceDiv = document.createElement("div");
		/**
		 * @type {selectOption[]}
		 */
		const choices = [];
		if (V.PC.skin !== V.PC.origSkin) {
			choices.push({key: V.PC.origSkin, name: capFirstChar(`Restore natural ${V.PC.origSkin}`)});
		}
		for (const skin of [...App.Medicine.Modification.naturalSkins, ...App.Medicine.Modification.dyedSkins]) {
			choices.push({key: skin, name: capFirstChar(skin)});
		}

		const select = App.UI.DOM.makeSelect(choices, V.PC.skin, value => {
			V.PC.skin = value;
			cashX(forceNeg(applyDiscount(2000)), "PCmedical");
			showDegradation("skinTone");
		});

		choiceDiv.append(select, " or custom ", App.UI.DOM.makeTextBox(
			V.PC.skin, v => {
				V.PC.skin = v;
				cashX(forceNeg(applyDiscount(2000)), "PCmedical");
				showDegradation("skinTone");
			}
		));
		p.append(choiceDiv);
		el.append(p);
	}

	/**
	 * Appends a div to `el` that lets the player change their breast size
	 */
	function breasts() {
		const p = document.createElement("p");
		const r = [];
		const linkArray = [];
		App.Events.addNode(p, [
			`"Maybe some breast work? I assure you they are lovely," ${heU} says as ${heU} brushes the back of your head with ${hisU} own pair. "<span class="cash">${cashFormat(applyDiscount(5000))}</span> for a reduction, <span class="cash">${cashFormat(applyDiscount(10000, true))}</span> for implants, that includes size ups, and <span class="cash">${cashFormat(applyDiscount(15000))}</span> for additional breast tissue. That last one might as well be real!${(V.PC.boobs < 700) ? " With a little work, we can even remove a small amount of fat from your breasts to bring your cup size down without damaging their inner workings. Though we'll have to build them up some before we can stick reasonable implants into you." : ""}"`
		], "div");
		if (V.PC.boobs >= 1400) {
			if (V.PC.boobsImplant > 0) {
				r.push(`You have a <span class="intro question">pair of round H-cup breasts;</span> they are very obviously implants.`);
				linkArray.push(
					App.UI.DOM.disabledLink("Get the next size up", ["You are starting to experience back pain; any bigger and they might seriously impede your ability to run your arcology."]),
					breastReductionImplant()
				);
			} else {
				r.push(`You have a <span class="intro question">heavy H-cup bust.</span> They tend to sag a little when you free them from your top, though they have some perk to them.`);
				linkArray.push(
					App.UI.DOM.disabledLink("Add additional breast tissue", ["You are starting to experience back pain; any bigger and they might seriously impede your ability to run your arcology."]),
					breastShrinkageAbsolute(1300)
				);
			}
		} else if (V.PC.boobs >= 1200) {
			if (V.PC.boobsImplant > 0) {
				r.push(`You have a <span class="intro question">pair of rounded G-cup breasts;</span> they are a little too perky for their size to pass as natural.`);
				linkArray.push(
					breastEnlargementImplant(),
					breastReductionImplant()
				);
			} else {
				r.push(`You have a <span class="intro question">huge G-cup bust.</span>`);
				linkArray.push(
					breastEnlargement(),
					breastShrinkageRelative()
				);
			}
		} else if (V.PC.boobs >= 1000) {
			if (V.PC.boobsImplant > 0) {
				r.push(`You have a <span class="intro question">pair of perky F-cup breasts;</span> you can barely tell they are implanted.`);
				linkArray.push(
					breastEnlargementImplant(),
					breastReductionImplant()
				);
			} else {
				r.push(`You have a <span class="intro question">hefty F-cup bust.</span>`);
				linkArray.push(
					breastEnlargement(),
					breastShrinkageRelative()
				);
			}
		} else if (V.PC.boobs >= 800) {
			r.push(`You have a <span class="intro question">big pair of DD-cup breasts.</span>`);
			linkArray.push(
				getImplants(),
				breastEnlargement(),
				breastShrinkageAbsolute(700),
				flatChest()
			);
		} else if (V.PC.boobs >= 650) {
			r.push(`You have a <span class="intro question">pair of D-cup breasts.</span>`);
			linkArray.push(
				breastEnlargement(),
				breastShrinkageAbsolute(600),
				flatChest()
			);
		} else if (V.PC.boobs >= 500) {
			r.push(`You have a <span class="intro question">average pair of C-cup breasts.</span>`);
			linkArray.push(
				breastEnlargement(),
				breastShrinkageAbsolute(400),
				flatChest()
			);
		} else if (V.PC.boobs >= 400) {
			r.push(`You have a <span class="intro question">small pair of B-cup breasts.</span>`);
			linkArray.push(
				breastEnlargement(),
				App.UI.DOM.disabledLink("Have fatty tissue removed", ["You lack sufficient fatty tissue to permit additional size reduction short of total breast removal"]),
				flatChest()
			);
		} else if (V.PC.boobs >= 300) {
			r.push(`You have a <span class="intro question">small pair of A-cup breasts.</span>`);
			linkArray.push(
				breastEnlargement(100),
				App.UI.DOM.disabledLink("Have fatty tissue removed", ["You lack sufficient fatty tissue to permit additional size reduction short of total breast removal"]),
				flatChest()
			);
		} else if (V.PC.title === 1) {
			r.push(`You have a <span class="intro question">masculine chest.</span> At your request, breast tissue could be added until you have a healthy bust, though society is unlikely to approve.`);
			linkArray.push(breasts());
		} else {
			r.push(`<span class="intro question">You're flat.</span> "We can fix that, if you want."`);
			linkArray.push(breasts());
		}
		App.Events.addNode(p, r, "div");
		p.append(App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray)));
		el.append(p);

		/**
		 * @returns {HTMLAnchorElement} a link for breast implant removal
		 */
		function breastReductionImplant() {
			return surgeryLink("Have your implants removed", "breastReductionImplant", () => {
				V.PC.boobs -= V.PC.boobsImplant;
				V.PC.boobsImplant = 0;
				V.PC.boobsImplantType = "none";
				cashX(forceNeg(applyDiscount(5000)), "PCmedical");
			});
		}

		/**
		 * @returns {HTMLAnchorElement} a link for breast enlargement via implant
		 */
		function breastEnlargementImplant() {
			return surgeryLink("Get the next size up", "breastEnlargementImplant", () => {
				V.PC.boobs += 200;
				V.PC.boobsImplant += 200;
				cashX(forceNeg(applyDiscount(10000, true)), "PCmedical");
			});
		}

		/**
		 * @param {number} [boobGrowth] how much the breasts should be enlarged (200 by default)
		 * @returns {HTMLAnchorElement} a link for breast enlargement via flesh
		 */
		function breastEnlargement(boobGrowth = 200) {
			return surgeryLink("Add additional breast tissue", "breastEnlargement", () => {
				V.PC.boobs += boobGrowth;
				cashX(forceNeg(applyDiscount(15000)), "PCmedical");
			});
		}

		/**
		 * @returns {HTMLAnchorElement} a link for breast shrinkage via flesh removal
		 */
		function breastShrinkageRelative() {
			return surgeryLink("Have tissue removed", "breastShrinkage", () => {
				V.PC.boobs -= 200;
				cashX(forceNeg(applyDiscount(5000)), "PCmedical");
			});
		}

		/**
		 * @returns {HTMLAnchorElement} a link for breast implant installation
		 */
		function getImplants() {
			return surgeryLink("Get a pair of breast implants", "breastEnlargementImplant", () => {
				V.PC.boobs += 200;
				V.PC.boobsImplant += 200;
				V.PC.boobsImplantType = "normal";
				cashX(forceNeg(applyDiscount(10000, true)), "PCmedical");
			});
		}

		/**
		 * @param {number} newSize
		 * @returns {HTMLAnchorElement}
		 */
		function breastShrinkageAbsolute(newSize) {
			return surgeryLink("Have fatty tissue removed", "breastShrinkage", () => {
				V.PC.boobs = newSize;
				cashX(forceNeg(applyDiscount(5000)), "PCmedical");
			});
		}

		/**
		 * @returns {HTMLAnchorElement} a link for the full removal of the breasts (flat as a board as they say)
		 */
		function flatChest() {
			return surgeryLink("Have them removed", "flatChest", () => {
				V.PC.boobs = 100;
				cashX(forceNeg(applyDiscount(5000)), "PCmedical");
			});
		}

		/**
		 * @returns {HTMLAnchorElement} a link for that adds breasts to the player
		 */
		function breasts() {
			return surgeryLink("Get a pair of breasts", "breasts", () => {
				V.PC.boobs = 650;
				cashX(forceNeg(applyDiscount(15000)), "PCmedical");
			});
		}
	}

	/**
	 * Appends a div to `el` that lets the player remove belly fat
	 */
	function belly() {
		const p = document.createElement("p");
		const r = [];
		const linkArray = [];
		if (V.PC.belly >= 100 && V.PC.preg > 3) {
			r.push(`${HeU} darts for your middle.`);
			if (V.PC.belly >= 120000) {
				r.push(`"My god! What happened to you? You might not want to hit the fertility drugs so hard next time. Then again, I don't think you'll see us complaining when you come in for a tummy tuck to get everything back where it used to be," ${heU} says with a wink as ${heU} uses both hands to massage your`);
				if (V.PC.preg > 40) {
					r.push(`overdue ${pregNumberName(V.PC.pregType, 1)}-bursting belly, enjoying the kicks from your ${(V.PC.pregType > 1) ? "children" : "child"} within. "If you go into labor, we have everything you'll need, so don't worry."`);
				} else {
					r.push(`over-crowded belly.`);
				}
			} else if (V.PC.belly >= 110000) {
				r.push(`"My god! What happened to you? You might not want to hit the fertility drugs so hard next time. Then again, I don't think you'll see us complaining when you come in for a tummy tuck to get everything back where it used to be," ${heU} says with a wink as ${heU} uses both hands to massage your`);
				if (V.PC.preg > 40) {
					r.push(`overdue ${pregNumberName(V.PC.pregType, 1)}-stuffed belly, enjoying the kicks from your ${(V.PC.pregType > 1) ? "children" : "child"} within. "If you go into labor, we have everything you'll need, so don't worry."`);
				} else {
					r.push(`over-crowded belly.`);
				}
			} else if (V.PC.belly >= 95000) {
				r.push(`Oh wow! It's like a party in there!" ${heU} says as ${heU} uses both hands to massage your`);
				if (V.PC.preg > 40) {
					r.push(`overdue ${pregNumberName(V.PC.pregType, 1)}-stuffed belly, enjoying the kicks from your ${(V.PC.pregType > 1) ? "children" : "child"} within. "If you go into labor, we have everything you'll need, so don't worry."`);
				} else {
					r.push(`crowded belly.`);
				}
			} else if (V.PC.belly >= 80000) {
				r.push(`You must feel so full, like all the time. What's it feel like? Do they ever calm down?" ${heU} says as ${heU} uses both hands to massage your`);
				if (V.PC.preg > 40) {
					r.push(`overdue ${pregNumberName(V.PC.pregType, 1)}-filled belly, enjoying the kicks from your ${(V.PC.pregType > 1) ? "children" : "child"} within. "If you go into labor, we have everything you'll need, so don't worry."`);
				} else {
					r.push(`crowded belly.`);
				}
			} else if (V.PC.belly >= 64000) {
				r.push(`Oh wow! You're immense! I almost can't wrap my arms around it!" ${heU} says as ${heU} uses both hands to massage your`);
				if (V.PC.preg > 40) {
					r.push(`overdue ${pregNumberName(V.PC.pregType, 1)}-filled belly, enjoying the kicks from your ${(V.PC.pregType > 1) ? "children" : "child"} within. "If you go into labor, we have everything you'll need, so don't worry."`);
				} else {
					r.push(`crowded belly.`);
				}
			} else if (V.PC.belly >= 48000) {
				r.push(`"Oh wow! You're gigantic! Are you sure you want to have surgery in this state? Things start to get complicated when you're this pregnant," ${heU} says as ${heU} uses both hands to massage your`);
				if (V.PC.preg > 40) {
					r.push(`overdue ${pregNumberName(V.PC.pregType, 1)}-filled belly, enjoying the kicks from your ${(V.PC.pregType > 1) ? "children" : "child"} within. "If you go into labor, we have everything you'll need, so don't worry."`);
				} else {
					r.push(`crowded belly.`);
				}
			} else if (V.PC.belly >= 32000) {
				r.push(`"My word, are you sure you want to have surgery in this state? You're gigantic! Plus things start to get complicated when you're this pregnant," ${heU} says as ${heU} uses both hands to massage your`);
				if (V.PC.preg > 40) {
					r.push(`overdue ${pregNumberName(V.PC.pregType, 1)}-filled belly, enjoying the kicks from your ${(V.PC.pregType > 1) ? "children" : "child"} within. "If you go into labor, we have everything you'll need, so don't worry."`);
				} else {
					r.push(`crowded belly.`);
				}
			} else if (V.PC.belly >= 16000) {
				r.push(`"My word, are you sure you want to have surgery in this state? You're giant!" ${heU} says as ${heU} uses both hands to massage your`);
				if (V.PC.preg > 40) {
					r.push(`overdue belly, enjoying the kicks from your ${(V.PC.pregType > 1) ? "children" : "child"} within. "If you go into labor, we have everything you'll need, so don't worry."`);
				} else {
					r.push(`belly, taking note of the extra occupants.`);
				}
			} else if (V.PC.belly >= 14000) {
				r.push(`"Wow, are you going to be ok? That looks really heavy," ${heU} says as ${heU} uses both hands to grope your massive belly, paying extra attention to your navel. "Are you sure you don't want to take a seat?"`);
			} else if (V.PC.belly >= 12000) {
				r.push(`"You're huge! Look at that adorable navel!" ${heU} says as ${heU} uses both hands to grope your huge belly, paying extra attention to your navel.`);
			} else if (V.PC.belly >= 10000) {
				r.push(`"Look how big you are!" ${heU} says as ${heU} uses both hands to grope your huge belly.`);
			} else if (V.PC.belly >= 7000) {
				r.push(`"You're getting so big!" ${heU} says as ${heU} uses both hands to massage your big pregnant belly.`);
			} else if (V.PC.belly >= 5000) {
				r.push(`"You're getting so big!" ${heU} says as ${heU} uses both hands to massage your pregnant belly.`);
			} else if (V.PC.belly >= 3000) {
				r.push(`"Looks like fun!" ${heU} says as ${heU} uses both hands to rub your pregnant belly.`);
			} else if (V.PC.belly >= 1500) {
				r.push(`"Awwww, you're getting soo big!" ${heU} says as ${heU} rubs your pregnant belly.`);
			} else if (V.PC.belly >= 500) {
				r.push(`"Awwww, you have a bun in the oven! That's so adorable; didn't think you the type," ${heU} says as ${heU} pats your rounded middle.`);
			} else if (V.PC.belly >= 300) {
				r.push(`"Awwww, you have a bun in the oven! That's so adorable; didn't think you the type," ${heU} says as ${heU} rubs your slightly rounded middle.`);
			} else if (V.PC.belly >= 100) {
				r.push(`"Awwww, you have a bun in the oven! That's so adorable; didn't think you the type," ${heU} says as ${heU} rubs your slightly swollen belly. No denying it now.`);
			}
		} else if (V.PC.bellySag > 0) {
			r.push(`${HeU} pinches your belly. "How about a tummy tuck? We can smooth this right out, cheaply too, <span class="cash">${cashFormat(applyDiscount(500))}.</span>" ${HeU} lets your saggy middle flop back to its usual drooping state.`);
			linkArray.push(surgeryLink("Firm up your stomach", "tummyTuck", () => {
				V.PC.bellySag = 0;
				V.PC.bellySagPreg = 0;
				cashX(forceNeg(applyDiscount(500)), "PCmedical");
			}));
		}
		App.Events.addNode(p, r, "div");
		p.append(App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray)));
		el.append(p);
	}

	/**
	 * Appends a div to `el` that lets the player change their butt size
	 */
	function butt() {
		const p = document.createElement("p");
		const r = [];
		const linkArray = [];
		App.Events.addNode(p, [`"How about a new butt?" ${heU} says as ${heU} wiggles ${hisU} own at you. "Same prices as the breasts."`], "div");
		if (V.PC.butt >= 5) {
			if (V.PC.buttImplant >= 1) {
				r.push(`You have an <span class="intro question">enormous, round, hard butt;</span> it is very obviously a pair of huge implants.`);
				linkArray.push(
					App.UI.DOM.disabledLink("Get the next size up", ["You can barely squeeze your rear into your clothes and are starting to get stuck in chairs; any bigger and it might seriously impede your ability to run your arcology."]),
					buttReductionImplantRemove()
				);
			} else {
				r.push(`You have an <span class="intro question">enormous, jiggly butt.</span>`);
				linkArray.push(
					App.UI.DOM.disabledLink("Add additional fatty tissue", ["You can barely squeeze your rear into your clothes and are starting to get stuck in chairs; any bigger and it might seriously impede your ability to run your arcology."]),
					buttShrinkage()
				);
			}
		} else if (V.PC.butt >= 4) {
			if (V.PC.buttImplant >= 1) {
				r.push(`You have a <span class="intro question">huge, round, firm butt;</span> it's easily identifiable as fake.`);
				linkArray.push(
					buttEnlargementImplant(),
					buttReductionImplantRemove()
				);
			} else {
				r.push(`You have a <span class="intro question">huge, soft butt.</span>`);
				linkArray.push(
					buttEnlargement(),
					buttShrinkage()
				);
			}
		} else if (V.PC.butt >= 3) {
			if (V.PC.buttImplant >= 1) {
				r.push(`You have a <span class="intro question">big firm butt;</span> anyone that feels it can tell it's fake, but at a glance you can't tell otherwise.`);
				linkArray.push(
					buttEnlargementImplant(),
					buttReductionImplantRemove()
				);
			} else {
				r.push(`You have a <span class="intro question">big butt.</span>`);
				linkArray.push(
					buttEnlargement(),
					buttShrinkage()
				);
			}
		} else {
			r.push(`You have a <span class="intro question">cute, but normal butt.</span> At your request, fat could be added until you have a healthy rear; alternatively, a pair of implants could be inserted instead.`);
			linkArray.push(
				surgeryLink("Get a pair of butt implants", "buttEnlargementImplant", () => {
					V.PC.butt += 1;
					V.PC.buttImplant += 1;
					V.PC.buttImplantType = "normal";
					cashX(forceNeg(applyDiscount(10000, true)), "PCmedical");
				}),
				buttEnlargement(),
			);
		}
		App.Events.addNode(p, r, "div");
		p.append(App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray)));
		el.append(p);

		/**
		 * @returns {HTMLAnchorElement} a link for removal of butt implants
		 */
		function buttReductionImplantRemove() {
			return surgeryLink("Have your implants removed", "buttReductionImplant", () => {
				V.PC.butt -= V.PC.buttImplant;
				V.PC.buttImplant = 0;
				V.PC.buttImplantType = "none";
				cashX(forceNeg(applyDiscount(5000)), "PCmedical");
			});
		}

		/**
		 * @returns {HTMLAnchorElement} a link for shrinkage of the butt via flesh removal
		 */
		function buttShrinkage() {
			return surgeryLink("Have fat removed", "buttShrinkage", () => {
				V.PC.butt -= 1;
				cashX(forceNeg(applyDiscount(5000)), "PCmedical");
			});
		}

		/**
		 * @returns {HTMLAnchorElement} a link for enlargement of the butt via implant
		 */
		function buttEnlargementImplant() {
			return surgeryLink("Get the next size up", "buttEnlargementImplant", () => {
				V.PC.butt += 1;
				V.PC.buttImplant += 1;
				cashX(forceNeg(applyDiscount(10000, true)), "PCmedical");
			});
		}

		/**
		 * @returns {HTMLAnchorElement} a link for enlargement of the butt via flesh
		 */
		function buttEnlargement() {
			return surgeryLink("Add additional fatty tissue", "buttEnlargement", () => {
				V.PC.butt += 1;
				cashX(forceNeg(applyDiscount(15000)), "PCmedical");
			});
		}
	}

	/**
	 * Appends a div to `el` that lets the player change their ball sack size
	 */
	function balls() {
		const p = document.createElement("p");
		const r = [];
		const linkArray = [];
		if (V.PC.balls !== 0 && V.PC.scrotum !== 0) {
			App.Events.addNode(p, [
				`"We could add gel around your testes to make your balls look bigger. Would also dampen any impacts to them as well, if that is anything to consider," ${heU} says, running a finger down the length of your shaft. "<span class="cash">${cashFormat(applyDiscount(7500))}</span> for draining and <span class="cash">${cashFormat(applyDiscount(12000))}</span> for filling, it's not the most simple procedure, you know? Anyway, they'll be very obvious, if that turns you on." ${HeU} takes another look at you before offering another option. "Of course, if you want bigger balls in a <i>functional</i> sense, we can do that too. The doctor's research in advanced targeted growth hormones has shown promising results in test subjects, and he's been able to use them successfully on a few citizen patients so far. A direct injection of hormones, and your testes will grow on their own. Unlike the cosmetic gel, there's no easily reversing this treatment, unless you are willing to subject yourself to slave drugs. It's expensive too, for the high quality drugs you want; <span class="cash">${cashFormat(25000)}</span> for one round of therapy. I should also warn you that repeated doses tend to have an increased effect."`
			], "div");
			if (V.PC.balls >= 30) {
				r.push(`You have a <span class="intro question">monstrous, massive pair of balls</span> roughly the size of small watermelons; it's impossible to sit normally, so you've had to buy special chairs, you've given up on wearing pants, and they're so obvious that people probably assume they're fake, but every slave you fuck gets to really feel the load you pump into them, and you love it.`);
				if (V.PC.ballsImplant) {
					linkArray.push(
						surgeryLink("Have gel extracted", "ballShrinkage", () => {
							V.PC.balls = 14;
							V.PC.ballsImplant = 11;
							cashX(forceNeg(applyDiscount(7500)), "PCmedical");
						}),
						surgeryLink("Have a lot of gel extracted", "ballBigShrinkage", () => {
							V.PC.balls = 5;
							V.PC.ballsImplant = 2;
							cashX(forceNeg(applyDiscount(7500)), "PCmedical");
						}),
					);
				}
			} else if (V.PC.balls >= 14) {
				r.push(`You have an <span class="intro question">enormous, heavy pair of balls</span> roughly the size of cantaloupes; it's difficult to sit normally, your clothes barely fit, and everyone can tell they are fake, but every slave you fuck gets a distinct slap with each thrust and you love it.`);
				linkArray.push(App.UI.DOM.disabledLink("Have even more gel added", ["You're beginning to have trouble moving around and using furniture thanks to your over-sized nuts, even bringing your legs together is a pain; any bigger and they might seriously impede your ability to run your arcology, or walk, for that matter."]));
				if (V.PC.ballsImplant) {
					linkArray.push(
						surgeryLink("Have even more gel added", "ballEnlargement", () => {
							V.PC.balls = 30;
							V.PC.ballsImplant = 27;
							cashX(forceNeg(applyDiscount(15000)), "PCmedical");
						}),
						surgeryLink("Have gel extracted", "ballShrinkage", () => {
							V.PC.balls = 9;
							V.PC.ballsImplant = 6;
							cashX(forceNeg(applyDiscount(7500)), "PCmedical");
						}),
					);
				} else {
					linkArray.push(surgeryLink("Get another round of growth hormones anyway", "ballEnlargementHorm", () => {
						V.PC.balls = 30;
						cashX(forceNeg(applyDiscount(15000)), "PCmedical");
					}));
				}
			} else if (V.PC.balls >= 9) {
				r.push(`You have a <span class="intro question">huge pair of balls</span> roughly the size of softballs; they make quite a bulge in your clothes and dangle heavily any other time.`);
				if (V.PC.ballsImplant) {
					linkArray.push(
						surgeryLink("Have more gel added", "ballEnlargement", () => {
							V.PC.balls = 14;
							V.PC.ballsImplant = 11;
							cashX(forceNeg(applyDiscount(15000)), "PCmedical");
						}),
						surgeryLink("Have gel extracted", "ballShrinkage", () => {
							V.PC.balls = 5;
							V.PC.ballsImplant = 2;
							cashX(forceNeg(applyDiscount(7500)), "PCmedical");
						}),
					);
				} else {
					linkArray.push(surgeryLink("Get another round of growth hormones", "ballEnlargementHorm", () => {
						V.PC.balls = 14;
						cashX(forceNeg(applyDiscount(15000)), "PCmedical");
					}));
				}
			} else if (V.PC.balls >= 5) {
				r.push(`You have a <span class="intro question">large pair of balls;</span> you can certainly feel them as you move.`);
				if (V.PC.ballsImplant) {
					linkArray.push(
						surgeryLink("Have more gel added", "ballEnlargement", () => {
							V.PC.balls = 9;
							V.PC.ballsImplant = 6;
							cashX(forceNeg(applyDiscount(15000)), "PCmedical");
						}),
						surgeryLink("Have gel extracted", "ballShrinkage", () => {
							V.PC.balls = 3;
							V.PC.ballsImplant = 0;
							cashX(forceNeg(applyDiscount(7500)), "PCmedical");
						}),
					);
				} else {
					linkArray.push(surgeryLink("Get another round of growth hormones", "ballEnlargementHorm", () => {
						V.PC.balls = 9;
						cashX(forceNeg(applyDiscount(15000)), "PCmedical");
					}));
				}
			} else {
				r.push(`You have a <span class="intro question">normal, uneventful pair of balls.</span>`);
				linkArray.push(
					surgeryLink("Get hormone treatment", "ballEnlargementHorm", () => {
						V.PC.balls = 5;
						cashX(forceNeg(applyDiscount(15000)), "PCmedical");
					}),
					surgeryLink("Have the gel added", "ballEnlargement", () => {
						V.PC.balls = 5;
						V.PC.ballsImplant = 2;
						cashX(forceNeg(applyDiscount(15000)), "PCmedical");
					}),
				);
			}
		}
		App.Events.addNode(p, r, "div");
		p.append(App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray)));
		el.append(p);
	}

	/**
	 * Appends a div to `el` that lets the player tighten their vagina and/or restore their hymen
	 */
	function vagina() {
		const p = document.createElement("p");
		const r = [];
		const linkArray = [];
		if (V.PC.vagina >= 3 && V.PC.newVag === 0) {
			r.push(`"Looking a little loose down there; I can fix that for you. Get you nice and tight again. Oh, and our pussies are guaranteed to not lose their tightness, or your money back! <span class="cash">${cashFormat(applyDiscount(15000))}</span> for a brand new vagina. ${V.PC.preg < 1 ? "I can even do a hymen reconstruction if you want. Nobody will notice that your vagina has already been used, it will be a perfect work of craftsmanship" : "If you weren't pregnant, I could give you a hymen reconstruction, think about it for when you have your uterus free"}. It costs <span class="cash">${cashFormat(applyDiscount(2000))}</span> more."`);
			if (V.PC.degeneracy > 0) {
				r.push(`${HeU} thinks for a moment and adds: "The advantage of having an intact hymen is that ${V.doctor.state > 0 ? "your" : "a renowned "} doctor can certify your virginity: this will help to reduce the rumors about you. It will cost you another <span class="cash">${cashFormat(applyDiscount(2000))},</span> but it is worth it."`);
			}
			linkArray.push(surgeryLink("Get a tighter vagina", "tightPussy", () => {
				V.PC.vagina = 1;
				V.PC.newVag = 1;
				cashX(forceNeg(applyDiscount(15000)), "PCmedical");
			}));
			if (V.PC.preg <= 0) {
				linkArray.push(surgeryLink("Get a tight virgin vagina", "tightPussy", () => {
					V.PC.vagina = 0;
					V.PC.newVag = 1;
					V.PC.trueVirgin = 0;
					V.PC.counter.reHymen = V.PC.counter.reHymen ? V.PC.counter.reHymen + 1 : 1;
					if (V.PC.degeneracy > 0) {
						cashX(forceNeg(applyDiscount(19000)), "PCmedical");
					} else {
						cashX(forceNeg(applyDiscount(17000)), "PCmedical");
					}
				}));
			}
		} else if (V.PC. vagina > 0) {
			if (V.PC.preg <= 0) {
				r.push(`"It looks like you have lost the warranty seal${V.PC.counter.reHymen ? " again" : ""}. I can give you a hymen reconstruction for only <span class="cash">${cashFormat(applyDiscount(2000))}.</span> No one will notice that your vagina has ${V.PC.counter.vaginal/V.week > 10 ? "largely" : ""} been used${V.PC.counter.raped > 0 ? " and abused" : ""}, it will be a perfect work of craftsmanship. The surgery will also serve to make your duct narrow like"`);
				if (V.PC.physicalAge < 13 || V.PC.actualAge < 13) {
					r.push("a child like you is supposed to have.");
				} else if (V.PC.visualAge < 13) {
					r.push("the child you look like is supposed to have.");
				} else if (!V.PC.pubertyXX) {
					r.push(`a prepubescent ${V.PC.genes === "XX" ? "girl" : "boy with vagina"} like you is supposed to have.`);
				} else if (V.PC.genes === "XX") {
					r.push("as you had it at birth.");
				} else {
					r.push("that of a preteen girl.");
				}
				if (V.PC.degeneracy > 0) {
					r.push(`${HeU} thinks for a moment and adds: "The advantage of having an intact hymen is that ${V.doctor.state > 0 ? "your" : "a renowned "} doctor can certify your virginity: this will help to reduce the rumors about you. It will cost you <span class="cash">${cashFormat(applyDiscount(2000))}</span> more, but it is worth it."`);
				}
				linkArray.push(surgeryLink("Get your hymen restored", "reVirgin", () => {
					V.PC.vagina = 0;
					V.PC.trueVirgin = 0;
					V.PC.counter.reHymen = V.PC.counter.reHymen ? V.PC.counter.reHymen + 1 : 1;
					if (V.PC.degeneracy > 0) {
						cashX(forceNeg(applyDiscount(4000)), "PCmedical");
					} else {
						cashX(forceNeg(applyDiscount(2000)), "PCmedical");
					}
				}));
			} else {
				r.push(`"It looks like you have lost the warranty seal${V.PC.counter.reHymen ? " again" : ""}. If you weren't pregnant, I could give you a hymen reconstruction for only <span class="cash">${cashFormat(applyDiscount(2000))}.</span> No one would notice that your vagina has ${V.PC.counter.vaginal/V.week > 10 ? "largely" : ""} been used${V.PC.counter.raped > 0 ? " and abused" : ""}, it would be a perfect work of craftsmanship. The surgery would also serve to make your duct narrow like"`);
				if (V.PC.physicalAge < 13 || V.PC.actualAge < 13) {
					r.push("a child like you is supposed to have.");
				} else if (V.PC.visualAge < 13) {
					r.push("the child you look like is supposed to have.");
				} else if (!V.PC.pubertyXX) {
					r.push(`a prepubescent ${V.PC.genes === "XX" ? "girl" : "boy with vagina"} like you is supposed to have.`);
				} else if (V.PC.genes === "XX") {
					r.push("as you had it at birth.");
				} else {
					r.push("that of a preteen girl.");
				}
				if (V.PC.degeneracy > 0) {
					r.push(`${HeU} thinks for a moment and adds: "The advantage of having an intact hymen is that ${V.doctor.state > 0 ? "your" : "a renowned "} doctor can certify your virginity: this would help to reduce the rumors about you. It would cost you <span class="cash">${cashFormat(applyDiscount(2000))}</span> more, but it is worth it."`);
				}
				r.push(`${He} makes a resigned face and tells you "Come back when you're not pregnant if you're interested."`);
			}
		}

		App.Events.addNode(p, r, "div");
		p.append(App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray)));
		el.append(p);
	}

	/**
	 * Appends a div to `el` that lets the player regenerate their ovaries
	 */
	function ovaries() {
		const p = document.createElement("p");
		const r = [];
		if (V.PC.preg === -2 && V.PC.physicalAge < 70) {
			r.push(`"Now we can only do this so many times before your body just can't handle it, but if you absolutely must have a child with your, um, vintage, then we can do something for you. For <span class="cash">${cashFormat(50000)},</span> we can clone and replace your depleted ovaries with slightly younger ones. They'll get you a couple more years of ovulation before they dry up too, but if you're desperate for a child, they may be your last option."`);
			App.Events.addNode(p, r, "div");
			p.append(App.UI.DOM.makeElement("div", surgeryLink("Regenerate your ovaries and cheat menopause for a couple more years", "ovulationRestart", () => {
				V.PC.ovaryAge = 45;
				V.PC.preg = 0;
				cashX(forceNeg(50000), "PCmedical");
			})));
		}
		el.append(p);
	}

	/**
	 * Appends a div to `el` that lets the player change their sex
	 */
	function sexType() {
		const p = document.createElement("p");
		const r = [];
		const linkArray = [];
		App.Events.addNode(p, [
			`"Now, if what you are looking for is sex reassignment surgery, that's going to be more complicated. Personally I think you are fine the way you are, but if you insist on paying me, I won't say no to it. We'll need to take a DNA sample to clone the required organs, and that will take some time to complete, so tell me early if this is what you really want. I've had a few patients seeking a working set of both sexes, so if that gets you off, it is an option. As for prices, <span class="cash">${cashFormat(50000)}</span> for a sex swap, <span class="cash">${cashFormat(150000)}</span> to be a fully functional herm, oh and <span class="red">breasts are not included unless you undergo a full body remodeling.</span> You'll have to set up another appointment for that, however. Oh, and I guess <span class="cash">${cashFormat(25000)}</span> is fair for having a sex organ removed, if you have both. It's a very invasive procedure, as we will be near completely remodeling your body. I assure you, we do such fantastic work that no one will know you weren't naturally born that way! Oh, and due to the extent of the surgery, we will not perform the procedure if you are pregnant; please clean yourself out before you arrive."`
		], "div");
		if (V.PC.preg > 0) {
			r.push(`${HeU} pokes your belly. "You're pregnant. What did I tell you?"`);
		} else {
			if (V.PC.dick !== 0 && V.PC.vagina !== -1) {
				r.push(`You have working <span class="intro question">male and female reproductive organs</span> and a <span class="intro question">`);
				if (V.PC.title > 0) {
					r.push(`masculine`);
				} else {
					r.push(`feminine`);
				}
				r.push(`appearance.</span> "We'll store some of your sperm for you, should you decide to lose your maleness, and have it shipped to your arcology. Who you decide to use it on, well... That's up to you!"`);
				linkArray.push(
					surgeryLink("Remove your male half", "herm2female", () => {
						V.PC.ballsImplant = 0;
						V.PC.balls = 0;
						V.PC.scrotum = 0;
						V.PC.dick = 0;
						V.PC.prostate = 0;
						V.PC.counter.storedCum += 10;
						cashX(forceNeg(25000), "PCmedical");
					}),
					surgeryLink("Remove your female half", "herm2male", () => {
						V.PC.vagina = -1;
						V.PC.vaginaLube = 0;
						V.PC.ovaries = 0;
						V.PC.preg = 0;
						WombFlush(V.PC);
						cashX(forceNeg(25000), "PCmedical");
					}),
				);
				if (V.PC.title > 0) {
					linkArray.push(surgeryLink("Remove your male half completely", "herm2truefemale", () => {
						V.PC.ballsImplant = 0;
						V.PC.balls = 0;
						V.PC.scrotum = 0;
						V.PC.dick = 0;
						V.PC.prostate = 0;
						V.PC.counter.storedCum += 10;
						V.PC.title = 0;
						generatePlayerPronouns(V.PC);
						cashX(forceNeg(25000), "PCmedical");
					}));
				} else {
					linkArray.push(surgeryLink("Remove your female half completely", "herm2truemale", () => {
						V.PC.vagina = -1;
						V.PC.vaginaLube = 0;
						V.PC.ovaries = 0;
						V.PC.preg = 0;
						WombFlush(V.PC);
						V.PC.boobs = 100;
						V.PC.boobsImplant = 0;
						V.PC.title = 1;
						generatePlayerPronouns(V.PC);
						cashX(forceNeg(25000), "PCmedical");
					}));
				}
			} else if (V.PC.dick !== 0) {
				r.push(`You have <span class="intro question">male genitalia</span> and a <span class="intro question">`);
				if (V.PC.title > 0) {
					r.push(`masculine`);
				} else {
					r.push(`feminine`);
				}
				r.push(`appearance.</span> "We'll store some of your sperm for you, should you decide to lose your maleness, and have it shipped to your arcology. Who you decide to use it on, well... That's up to you!"`);
				linkArray.push(
					surgeryLink("Have your male organs replaced with female ones", "male2female", () => {
						V.PC.ballsImplant = 0;
						V.PC.balls = 0;
						V.PC.scrotum = 0;
						V.PC.dick = 0;
						V.PC.prostate = 0;
						V.PC.counter.storedCum += 10;
						V.PC.vagina = 1;
						V.PC.newVag = 1;
						V.PC.vaginaLube = 1;
						V.PC.ovaries = 1;
						cashX(forceNeg(50000), "PCmedical");
					}),
					surgeryLink("Add a female reproductive tract", "male2herm", () => {
						V.PC.vagina = 1;
						V.PC.newVag = 1;
						V.PC.vaginaLube = 1;
						V.PC.ovaries = 1;
						V.PC.preg = 0;
						WombFlush(V.PC);
						cashX(forceNeg(150000), "PCmedical");
					}),
				);
				if (V.PC.title > 0) {
					linkArray.push(
						surgeryLink("Become a woman", "male2truefemale", () => {
							V.PC.ballsImplant = 0;
							V.PC.balls = 0;
							V.PC.scrotum = 0;
							V.PC.dick = 0;
							V.PC.prostate = 0;
							V.PC.counter.storedCum += 10;
							V.PC.vagina = 1;
							V.PC.newVag = 1;
							V.PC.vaginaLube = 1;
							V.PC.ovaries = 1;
							V.PC.preg = 0;
							V.PC.title = 0;
							generatePlayerPronouns(V.PC);
							cashX(forceNeg(50000), "PCmedical");
						}),
						surgeryLink("Become a hermaphrodite girl", "male2hermfemale", () => {
							V.PC.vagina = 1;
							V.PC.newVag = 1;
							V.PC.vaginaLube = 1;
							V.PC.ovaries = 1;
							V.PC.preg = 0;
							WombFlush(V.PC);
							V.PC.title = 0;
							generatePlayerPronouns(V.PC);
							cashX(forceNeg(150000), "PCmedical");
						}),
					);
				}
			} else {
				r.push(`You have <span class="intro question">female genitalia</span> and a <span class="intro question">`);
				if (V.PC.title > 0) {
					r.push(`masculine`);
				} else {
					r.push(`feminine`);
				}
				r.push(`appearance.</span>`);
				linkArray.push(
					surgeryLink("Have your female organs replaced with male ones", "female2male", () => {
						V.PC.ballsImplant = 0;
						V.PC.balls = 3;
						V.PC.scrotum = 3;
						V.PC.dick = 4;
						V.PC.prostate = 1;
						V.PC.vagina = -1;
						V.PC.vaginaLube = 0;
						V.PC.ovaries = 0;
						cashX(forceNeg(50000), "PCmedical");
					}),
					surgeryLink("Add a male reproductive tract", "female2herm", () => {
						V.PC.ballsImplant = 0;
						V.PC.balls = 3;
						V.PC.scrotum = 3;
						V.PC.dick = 4;
						V.PC.prostate = 1;
						cashX(forceNeg(150000), "PCmedical");
					}),
				);
				if (V.PC.title === 0) {
					linkArray.push(
						surgeryLink("Become a man", "female2truemale", () => {
							V.PC.ballsImplant = 0;
							V.PC.balls = 3;
							V.PC.scrotum = 3;
							V.PC.dick = 4;
							V.PC.prostate = 1;
							V.PC.vagina = -1;
							V.PC.vaginaLube = 0;
							V.PC.ovaries = 0;
							V.PC.preg = 0;
							WombFlush(V.PC);
							V.PC.title = 1;
							generatePlayerPronouns(V.PC);
							V.PC.boobs = 100;
							V.PC.boobsImplant = 0;
							cashX(forceNeg(50000), "PCmedical");
						}),
						surgeryLink("Become a hermaphrodite boy", "female2hermmale", () => {
							V.PC.ballsImplant = 0;
							V.PC.balls = 3;
							V.PC.scrotum = 3;
							V.PC.dick = 4;
							V.PC.prostate = 1;
							V.PC.title = 1;
							generatePlayerPronouns(V.PC);
							V.PC.boobs = 100;
							V.PC.boobsImplant = 0;
							cashX(forceNeg(150000), "PCmedical");
						}),
					);
				}
			}
		}
		App.Events.addNode(p, r, "div");
		p.append(App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray)));
		el.append(p);
	}

	/**
	 *
	 * @param {string} title
	 * @param {surgeryType} type
	 * @param {function():void} func
	 * @returns {HTMLAnchorElement}
	 */
	function surgeryLink(title, type, func) {
		return App.UI.DOM.link(
			title,
			() => {
				func();
				showDegradation(type);
			}
		);
	}

	/**
	 * Appends a DocumentFragment to `el` that shows the result of the player's surgery
	 * @param {surgeryType} type the type of surgery that was performed
	 */
	function showDegradation(type) {
		V.nextButton = "Continue";
		V.nextLink = "Manage Personal Affairs";
		App.Utils.scheduleSidebarRefresh();
		jQuery(el).empty().append(App.UI.PCSurgeryDegradation(type));
	}
};
