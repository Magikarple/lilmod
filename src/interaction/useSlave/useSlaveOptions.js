/**
 * @param {FC.PlayerState} player
 * @param {FC.SlaveState} clone
 * @param {FC.SlaveState} slave
 * @param {App.UI.SlaveInteract.CharacterState} playerState
 * @param {App.UI.SlaveInteract.CharacterState} slaveState
 */
App.UI.SlaveInteract.useSlave.options = function(player, clone, slave, playerState, slaveState) {
	const refreshArt = () => App.Events.refreshEventArt(clone);

	const {He, His, he, him, his, hers} = getPronouns(clone);

	/** @enum {string} */
	const none = "none";
	/** @enum {boolean} */
	const Position = App.UI.SlaveInteract.Position;
	/** @enum {string} */
	const Action = App.UI.SlaveInteract.Action;
	/** @enum {string} */
	const SexAct = App.UI.SlaveInteract.SexAct;

	function recordSex(sexAct) {
		switch (sexAct) {
			case SexAct.ORAL:
				if (!slaveState.hasDoneOral) {
					seX(slave, "oral", player);
					slaveState.hasDoneOral = true;
					playerState.hasDoneOral = true;
				}
				break;
			case SexAct.VAGINAL:
				if (!slaveState.hasDoneVaginal) {
					seX(slave, "vaginal", player);
					slaveState.hasDoneVaginal = true;
					playerState.hasDoneVaginal = true;
				}
				break;
			case SexAct.ANAL:
				if (!slaveState.hasDoneAnal) {
					seX(slave, "anal", player);
					slaveState.hasDoneAnal = true;
					playerState.hasDoneAnal = true;
				}
				break;
		}
	}

	const contextualText = App.UI.SlaveInteract.useSlave.contextualText;
	/** @type {FC.UseSlave.Option[]} */
	const contextual = [
		{
			link: `Keep kissing ${him}`,
			desc: contextualText.keepKissing(clone),
			tooltip: `Because why stop?`,
			prereq: () =>
				clone.mouthAccessory === none &&
				playerState.action === Action.KISSING &&
				slaveState.action === Action.KISSING,
			effect: () => {
				playerState.lust++;
				slaveState.lust++;
			},
			reaction: this.reactionText.keepKissing(clone),
		},
		{
			link: `Stop kissing ${him}`,
			desc: contextualText.stopKissing(clone),
			tooltip: `${His} lips can please you in other ways, too.`,
			prereq: () =>
				clone.mouthAccessory === none &&
				playerState.action === Action.KISSING &&
				slaveState.action === Action.KISSING,
			effect: () => {
				playerState.action = null;
				slaveState.action = null;
			},
			reaction: this.reactionText.stopKissing(clone),
		},
		{
			link: `Keep fucking ${him}`,
			desc: contextualText.keepFucking(clone),
			tooltip: `It feels too good to stop now.`,
			prereq: () =>
				playerState.sexAct === SexAct.PENETRATING &&
				(slaveState.sexAct === SexAct.VAGINAL ||
				slaveState.sexAct === SexAct.ANAL),
			effect: () => {
				playerState.lust += 2;
				slaveState.lust++;
			},
			reaction: this.reactionText.keepFucking(clone),
		},
		{
			link: `Hold ${him} down`,
			desc: contextualText.holdDown(clone),
			tooltip: `${He}'s not going anywhere if you can help it.`,
			prereq: () =>
				playerState.sexAct === SexAct.PENETRATING &&
				(slaveState.sexAct === SexAct.VAGINAL ||
				slaveState.sexAct === SexAct.ANAL),
			effect: () => {
				playerState.lust += 2;
				slaveState.lust++;
			},
			reaction: this.reactionText.holdDown(clone),
		},
		{
			link: `Pull out of ${him}`,
			desc: contextualText.stopFucking(clone),
			tooltip: `You can always put it back in. ${He} can't stop you.`,
			prereq: () =>
				playerState.sexAct === SexAct.PENETRATING &&
				(slaveState.sexAct === SexAct.VAGINAL ||
				slaveState.sexAct === SexAct.ANAL),
			effect: () => {
				playerState.sexAct = null;
				slaveState.sexAct = null;
			},
			reaction: this.reactionText.stopFucking(clone),
		},
		{
			link: `Let ${him} keep pleasuring you`,
			desc: contextualText.continueOral(clone),
			tooltip: `Lay back and enjoy ${his} service.`,
			prereq: () => slaveState.sexAct === SexAct.ORAL,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust++;
			},
			reaction: this.reactionText.continueOral(clone),
		},
		{
			link: `Hold ${his} head down`,
			desc: contextualText.holdHeadDown(clone),
			tooltip: `${He} can breathe when you've cum.`,
			prereq: () => slaveState.sexAct === SexAct.ORAL,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust++;
			},
			reaction: this.reactionText.holdHeadDown(clone),
		},
		{
			link: `Order ${him} to stop pleasuring you`,
			desc: contextualText.stopOral(clone),
			tooltip: `Time for ${him} to please you another way.`,
			prereq: () => slaveState.sexAct === SexAct.ORAL,
			effect: () => {
				playerState.sexAct = null;
				slaveState.sexAct = null;
			},
			reaction: this.reactionText.stopOral(clone),
		},
		{
			link: `Cum on ${his} face`,
			desc: contextualText.cumOnFace(clone),
			tooltip: `Let it all out on ${his} face.`,
			prereq: () => playerState.lust - playerState.previousOrgasm >= 25 &&
				slaveState.sexAct === SexAct.ORAL,
			effect: () => {
				playerState.previousOrgasm = playerState.lust;
				slaveState.lust += 2;

				playerState.sexAct = null;
				slaveState.sexAct = null;
			},
			reaction: this.reactionText.cumOnFace(clone),
		},
		{
			link: `${V.PC.dick !== 0 ? `Cum in ${his} mouth` : `Have ${him} finish you with ${his} mouth`}`,
			desc: contextualText.cumInMouth(clone),
			tooltip: `${V.PC.dick !== 0 ? `Shoot your cum down ${his} throat.` : `${He} won't dare stop until you're satisfied.`}`,
			prereq: () => playerState.lust - playerState.previousOrgasm >= 25 &&
				slaveState.sexAct === SexAct.ORAL,
			effect: () => {
				playerState.previousOrgasm = playerState.lust;
				slaveState.lust += 3;

				playerState.sexAct = null;
				slaveState.sexAct = null;
			},
			reaction: this.reactionText.cumInMouth(clone),
		},
		{
			link: `Cum in ${his} pussy`,
			desc: contextualText.cumInPussy(clone),
			tooltip: `Cum deep inside ${him}. Fill ${him} up. You know it'll feel amazing.`,
			prereq: () =>
				playerState.lust - playerState.previousOrgasm >= 25 &&
				V.PC.dick !== 0 &&
				playerState.sexAct === SexAct.PENETRATING &&
				slaveState.sexAct === SexAct.VAGINAL,
			effect: () => {
				playerState.previousOrgasm = playerState.lust;
				slaveState.lust += 4;

				if (slave.preg === 0) {
					knockMeUp(slave, 25, 0, -1);
				}

				playerState.sexAct = null;
				slaveState.sexAct = null;
			},
			reaction: this.reactionText.cumInPussy(clone),
		},
		{
			link: `Cum in ${his} ass`,
			desc: contextualText.cumInAnus(clone),
			tooltip: `Make a mess of ${his} ass. Show ${him} ${his} place.`,
			prereq: () =>
				playerState.lust - playerState.previousOrgasm >= 25 &&
				V.PC.dick !== 0 &&
				playerState.sexAct === SexAct.PENETRATING &&
				slaveState.sexAct === SexAct.ANAL,
			effect: () => {
				playerState.previousOrgasm = playerState.lust;
				slaveState.lust += 3;

				if (slave.mpreg && slave.preg === 0) {
					knockMeUp(slave, 25, 1, -1);
				}

				playerState.sexAct = null;
				slaveState.sexAct = null;
			},
			reaction: this.reactionText.cumInAnus(clone),
		},
		{
			link: `Make ${him} cum`,
			desc: contextualText.makeSlaveCum(clone),
			tooltip: `${He}'s been a good slave, and deserves a reward.`,
			prereq: () =>
				slaveState.lust - slaveState.previousOrgasm >= 25 &&
				((playerState.sexAct === SexAct.ORAL &&
				slaveState.sexAct === SexAct.RECEIVING) ||
				(playerState.action === Action.FINGERING &&
				slaveState.action === Action.RECEIVING)),
			effect: () => {
				playerState.lust++;
				slaveState.previousOrgasm = slaveState.lust;

				if (playerState.sexAct === SexAct.ORAL) {
					playerState.sexAct = null;
					slaveState.sexAct = null;
					playerState.position = Position.STANDING;
				}
			},
			reaction: this.reactionText.makeSlaveCum(clone),
		},
	];

	let clothes = clone.clothes;
	const faceText = App.UI.SlaveInteract.useSlave.faceText;
	/** @type {FC.UseSlave.Option[]} */
	const face = [
		{
			link: `Kiss ${him}`,
			desc: faceText.regularKiss(clone),
			tooltip: `Press your lips to ${hers} and kiss ${him}.`,
			prereq: () => clone.mouthAccessory === none &&
				playerState.sexAct !== SexAct.ORAL &&
				slaveState.sexAct !== SexAct.ORAL,
			effect: () => {
				playerState.lust++;
				slaveState.lust++;

				playerState.action = Action.KISSING;
				slaveState.action = Action.KISSING;
			},
			reaction: this.reactionText.regularKiss(clone),
		},
		{
			link: `Kiss ${him} passionately`,
			desc: faceText.passionateKiss(clone),
			tooltip: `Press ${his} body to yours and kiss ${him}.`,
			prereq: () => clone.mouthAccessory === none &&
				playerState.sexAct !== SexAct.ORAL &&
				slaveState.sexAct !== SexAct.ORAL,
			effect: () => {
				playerState.lust++;
				slaveState.lust++;

				playerState.action = Action.KISSING;
				slaveState.action = Action.KISSING;
			},
			reaction: this.reactionText.passionateKiss(clone),
		},
		{
			link: `Kiss ${him} intimately`,
			desc: faceText.intimateKiss(clone),
			tooltip: `Share a romantic kiss.`,
			prereq: () => clone.mouthAccessory === none &&
				playerState.sexAct !== SexAct.ORAL &&
				slaveState.sexAct !== SexAct.ORAL,
			effect: () => {
				playerState.lust++;
				slaveState.lust++;

				playerState.action = Action.KISSING;
				slaveState.action = Action.KISSING;
			},
			reaction: this.reactionText.intimateKiss(clone),
		},
		{
			link: `Have ${him} go down on you`,
			desc: faceText.slaveGivesOral(clone),
			tooltip: `Have ${him} give you oral.`,
			prereq: () =>
				(clone.mouthAccessory === none || clone.mouthAccessory === "ring gag") &&
				playerState.bottomFree &&
				!playerState.clothing.underwear &&
				!playerState.isKneeling &&
				slaveState.sexAct === null &&
				slaveState.action !== Action.KISSING,
			effect: () => {
				slaveState.position = Position.KNEELING;

				playerState.lust += 3;
				slaveState.lust++;

				playerState.sexAct = SexAct.RECEIVING;
				slaveState.sexAct = SexAct.ORAL;

				recordSex(slaveState.sexAct);
			},
			reaction: this.reactionText.slaveGivesOral(clone),
		},
		{
			link: `Go down on ${him}`,
			desc: faceText.playerGivesOral(clone),
			tooltip: `Give ${him} oral.`,
			prereq: () =>
				slaveState.clothing.bottom.isOff &&
				!slave.chastityVagina &&
				!slave.chastityPenis &&
				!slaveState.clothing.underwear &&
				playerState.sexAct === null &&
				playerState.action !== Action.KISSING &&
				!playerState.isKneeling &&
				!slaveState.isKneeling,
			effect: () => {
				playerState.position = Position.KNEELING;

				playerState.lust++;
				slaveState.lust++;

				playerState.sexAct = SexAct.ORAL;
				slaveState.sexAct = SexAct.RECEIVING;

				recordSex(playerState.sexAct);
			},
			reaction: this.reactionText.playerGivesOral(clone),
		},
	];

	const chestText = App.UI.SlaveInteract.useSlave.chestText;
	/** @type {FC.UseSlave.Option[]} */
	const chest = [
		{
			link: `Grope ${his} chest`,
			desc: chestText.grope(clone),
			tooltip: slave.boobs >= 300 ? `Play with ${his} tits a bit.` : `Stroke ${his} chest a bit.`,
			prereq: () => slaveState.topFree,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust += clone.fetish === Fetish.BOOBS ? 7 : 4;

				playerState.action = Action.TOUCHING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.grope(clone),
		},
		{
			link: `Lick ${his} ${clone.boobs >= 300 ? `tits` : `chest`}`,
			desc: chestText.lick(clone),
			tooltip: clone.boobs >= 300 ? `Give ${his} boobs a taste.` : `Run your tongue along ${his} chest.`,
			prereq: () => slaveState.topFree &&
				!slaveState.clothing.bra &&
				playerState.sexAct !== SexAct.ORAL &&
				slaveState.sexAct !== SexAct.ORAL,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust += clone.fetish === Fetish.BOOBS ? 8 : 5;

				playerState.action = Action.KISSING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.lick(clone),
		},
		{
			link: `Suck on ${his} nipples`,
			desc: chestText.suck(clone),
			tooltip: `See if you can't get any milk.`,
			prereq: () => slaveState.topFree &&
				!slaveState.clothing.bra &&
				playerState.sexAct !== SexAct.ORAL &&
				slaveState.sexAct !== SexAct.ORAL,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust += clone.fetish === Fetish.BOOBS ? 9 : 5;

				playerState.action = Action.KISSING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.suck(clone),
		},
		{
			link: `Bite ${his} nipples`,
			desc: chestText.bite(clone),
			tooltip: `Give them a little nibble.`,
			prereq: () => slaveState.topFree &&
				!slaveState.clothing.bra &&
				playerState.sexAct !== SexAct.ORAL &&
				slaveState.sexAct !== SexAct.ORAL,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust += clone.fetish === Fetish.BOOBS ? 8 : 5;

				playerState.action = Action.KISSING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.bite(clone),
		},
		{
			link: `Make ${him} suck your nipples`,
			desc: chestText.slaveSucksTits(clone),
			tooltip: `Relax while they orally service your breasts.`,
			prereq: () => playerState.clothing.top.isOff && !playerState.clothing.bra &&
				playerState.sexAct !== SexAct.ORAL &&
				slaveState.sexAct !== SexAct.ORAL,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust += 5;

				playerState.action = Action.RECEIVING;
				slaveState.action = Action.KISSING;
			},
			reaction: this.reactionText.slaveSucksTits(clone),
		},
	];

	const crotchText = App.UI.SlaveInteract.useSlave.crotchText;
	/** @type {FC.UseSlave.Option[]} */
	const crotch = [
		{
			link: `Grope ${his} pussy`,
			desc: crotchText.gropePussy(clone),
			tooltip: `Fondle and play with ${his} crotch a bit.`,
			prereq: () =>
				clone.vagina > -1 &&
				!clone.chastityVagina &&
				slaveState.bottomFree &&
				slaveState.sexAct !== SexAct.VAGINAL,
			effect: () => {
				playerState.lust++;
				slaveState.lust++;

				playerState.action = Action.TOUCHING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.gropePussy(clone),
		},
		{
			link: `Grope ${his} dick`,
			desc: crotchText.gropeDick(clone),
			tooltip: `Rub ${his} cock a little.`,
			prereq: () =>
				clone.dick > 0 &&
				!clone.chastityPenis &&
				slaveState.bottomFree &&
				slaveState.sexAct !== SexAct.PENETRATING,
			effect: () => {
				playerState.lust++;
				slaveState.lust += 2;

				playerState.action = Action.TOUCHING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.gropeDick(clone),
		},
		{
			link: `Grope ${his} ass`,
			desc: crotchText.gropeAss(clone),
			tooltip: `Grab ${his} ass and give it a good fondle.`,
			prereq: () => slaveState.bottomFree,
			effect: () => {
				playerState.lust++;
				slaveState.lust++;

				playerState.action = Action.TOUCHING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.gropeAss(clone),
		},
		{
			link: `Finger ${his} pussy`,
			desc: crotchText.fingerPussy(clone),
			tooltip: `Play with ${his} clit a little, maybe slide a finger in there. Go on, you know you want to.`,
			prereq: () =>
				clone.vagina > -1 &&
				(slaveState.bottomFree || clothes.includes("dress")) &&
				!slaveState.clothing.underwear &&
				!clone.chastityVagina &&
				slaveState.sexAct !== SexAct.VAGINAL,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust += 5;

				playerState.action = Action.FINGERING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.fingerPussy(clone),
		},
		{
			link: `Finger ${his} asshole`,
			desc: crotchText.fingerAnus(clone),
			tooltip: `Play with ${his} backdoor a little. Go on, you know you want to.`,
			prereq: () =>
				(slaveState.bottomFree || clothes.includes("dress")) &&
				!slaveState.clothing.underwear &&
				!clone.chastityAnus &&
				slaveState.sexAct !== SexAct.ANAL,
			effect: () => {
				playerState.lust += 2;
				slaveState.lust += clone.fetish === Fetish.BUTTSLUT ? 7 : 4;

				playerState.action = Action.FINGERING;
				slaveState.action = Action.RECEIVING;
			},
			reaction: this.reactionText.fingerAnus(clone),
		},
		{
			link: `Take ${his} virginity`,
			desc: crotchText.takeVirginity(clone),
			tooltip: `Make ${him} remember ${his} first time being used as a proper sex slave.`,
			prereq: () =>
				slave.vagina === 0 &&
				slaveState.bottomFree &&
				!slaveState.clothing.underwear &&
				!clone.chastityVagina &&
				playerState.bottomFree &&
				!playerState.clothing.underwear &&
				playerState.sexAct === null &&
				slaveState.sexAct === null &&
				playerState.lust - playerState.previousOrgasm > 5,
			effect: () => {
				playerState.lust += 10;
				slaveState.lust += 10;

				slave.vagina++;
				if (slave.devotion > 20) {
					slave.devotion += 10;
				} else if (slave.devotion > -20) {
					slave.devotion += 4;
					slave.trust -= 4;
				} else {
					slave.devotion -= 4;
					slave.trust -= 4;
				}

				playerState.sexAct = SexAct.PENETRATING;
				slaveState.sexAct = SexAct.VAGINAL;

				recordSex(slaveState.sexAct);
			},
			reaction: this.reactionText.takeVirginity(clone),
		},
		{
			link: `Fuck ${his} pussy`,
			desc: crotchText.fuckPussy(clone),
			tooltip: `Push your ${player.dick ? `dick` : `strapon`} into ${his} pussy.`,
			prereq: () =>
				slave.vagina > 0 &&
				slaveState.bottomFree &&
				!slaveState.clothing.underwear &&
				!clone.chastityVagina &&
				playerState.bottomFree &&
				!playerState.clothing.underwear &&
				playerState.sexAct === null &&
				slaveState.sexAct === null &&
				playerState.lust - playerState.previousOrgasm > 5,
			effect: () => {
				playerState.lust += 8;
				slaveState.lust += 8;

				playerState.sexAct = SexAct.PENETRATING;
				slaveState.sexAct = SexAct.VAGINAL;

				recordSex(slaveState.sexAct);
			},
			reaction: this.reactionText.fuckPussy(clone),
		},
		{
			link: `Take ${his} anal virginity`,
			desc: crotchText.takeAnalVirginity(clone),
			tooltip: `Use ${his} butt for the first of surely many times.`,
			prereq: () =>
				slave.anus === 0 &&
				slaveState.bottomFree &&
				!slaveState.clothing.underwear &&
				!clone.chastityAnus &&
				playerState.bottomFree &&
				!playerState.clothing.underwear &&
				playerState.sexAct === null &&
				slaveState.sexAct === null &&
				playerState.lust - playerState.previousOrgasm > 5,
			effect: () => {
				playerState.lust += 10;
				slaveState.lust += clone.fetish === Fetish.BUTTSLUT ? 10 : 5;

				slave.anus++;
				if (slave.devotion > 20) {
					slave.devotion += 4;
				} else if (slave.devotion > -20) {
					slave.trust -= 5;
				} else {
					slave.devotion -= 5;
					slave.trust -= 5;
				}

				playerState.sexAct = SexAct.PENETRATING;
				slaveState.sexAct = SexAct.ANAL;

				recordSex(slaveState.sexAct);
			},
			reaction: this.reactionText.takeAnalVirginity(clone),
		},
		{
			link: `Fuck ${his} asshole`,
			desc: crotchText.fuckAnus(clone),
			tooltip: `Push your ${player.dick ? `dick` : `strapon`} into ${his} asshole.`,
			prereq: () =>
				slave.anus > 0 &&
				slaveState.bottomFree &&
				!slaveState.clothing.underwear &&
				!clone.chastityAnus &&
				playerState.bottomFree &&
				!playerState.clothing.underwear &&
				playerState.sexAct === null &&
				slaveState.sexAct === null &&
				playerState.lust - playerState.previousOrgasm > 5,
			effect: () => {
				playerState.lust += 8;
				slaveState.lust += clone.fetish === Fetish.BUTTSLUT ? 8 : 5;

				playerState.sexAct = SexAct.PENETRATING;
				slaveState.sexAct = SexAct.ANAL;

				recordSex(slaveState.sexAct);
			},
			reaction: this.reactionText.fuckAnus(clone),
		},
		{
			link: `Start a sixty-nine`,
			desc: crotchText.sixtyNine(clone),
			tooltip: `Show each other some mutual affection.`,
			prereq: () =>
				slaveState.bottomFree &&
				playerState.bottomFree &&
				!slaveState.clothing.underwear &&
				!playerState.clothing.underwear &&
				!slave.chastityVagina &&
				!slave.chastityPenis &&
				playerState.action !== Action.KISSING &&
				slaveState.action !== Action.KISSING &&
				/**
				 * Allow the act to happen if either:
				 * - Neither character is performing a sex act
				 * - Exactly one character is performing oral sex on the other
				 **/
				((playerState.sexAct === null && slaveState.sexAct === null) ||
				((slaveState.sexAct === SexAct.ORAL || playerState.sexAct === SexAct.ORAL) &&
				(slaveState.sexAct !== SexAct.ORAL || playerState.sexAct !== SexAct.ORAL))),
			effect: () => {
				playerState.lust += 10;
				slaveState.lust += 10;

				playerState.sexAct = SexAct.ORAL;
				slaveState.sexAct = SexAct.ORAL;

				recordSex(slaveState.sexAct);
			},
			reaction: this.reactionText.sixtyNine(clone),
		},
	];

	const generalText = App.UI.SlaveInteract.useSlave.generalText;
	/** @type {FC.UseSlave.Option[]} */
	const general = [
		{
			link: `Have ${him} dance for you`,
			desc: generalText.dance(clone),
			tooltip: `Make ${him} give you a sensual dance.`,
			prereq: () => !slaveState.isKneeling &&
				!slaveState.isLaying &&
				slaveState.sexAct === null &&
				slaveState.action !== Action.KISSING,
			effect: () => {
				playerState.lust += 4;
				slaveState.lust += 3;
			},
			reaction: this.reactionText.dance(clone),
		},
		{
			link: `Have ${him} perform a striptease for you`,
			desc: generalText.striptease(clone),
			tooltip: `Make ${him} strip for you.`,
			prereq: () =>
				!slaveState.isKneeling &&
				!slaveState.isLaying &&
				clothes !== "no clothing" &&
				slaveState.sexAct === null &&
				slaveState.action !== Action.KISSING,
			effect: () => {
				clone.clothes = "no clothing";
				slaveState.clothing.top.isOff = true;
				slaveState.clothing.bottom.isOff = true;
				slaveState.clothing.bra = false;
				slaveState.clothing.underwear = false;
				playerState.lust += 5;
				slaveState.lust += 6;

				refreshArt();
			},
			reaction: this.reactionText.striptease(clone),
		},
		{
			link: `Push ${him} down`,
			desc: generalText.pushDown(clone),
			tooltip: `Put ${him} on ${his} knees.`,
			prereq: () => !slaveState.isKneeling &&
				slaveState.sexAct === null,
			effect: () => {
				slaveState.position = Position.KNEELING;
			},
			reaction: this.reactionText.pushDown(clone),
		},
		{
			link: `Pull ${him} up`,
			desc: generalText.pullUp(clone),
			tooltip: `Have ${him} stand up.`,
			prereq: () => slaveState.isKneeling &&
				slaveState.sexAct === null,
			effect: () => {
				slaveState.position = Position.STANDING;
			},
			reaction: this.reactionText.pullUp(clone),
		},
		{
			link: `Stand up`,
			desc: generalText.standUp(clone),
			tooltip: `Get back on your feet.`,
			prereq: () => playerState.isKneeling &&
				playerState.sexAct === null,
			effect: () => {
				playerState.position = Position.STANDING;
			},
			reaction: this.reactionText.standUp(clone),
		},
		{
			link: `Pull ${him} in close`,
			desc: generalText.pullClose(clone),
			tooltip: `Pull ${his} body in close to yours.`,
			prereq: () => !slaveState.close &&
				slaveState.sexAct === null,
			effect: () => {
				slaveState.close = true;
			},
			reaction: this.reactionText.pullClose(clone),
		},
		{
			link: `Push ${him} away`,
			desc: generalText.pushAway(clone),
			tooltip: `Put some distance between you two.`,
			prereq: () => slaveState.close &&
				slaveState.sexAct === null,
			effect: () => {
				slaveState.close = false;
			},
			reaction: this.reactionText.pushAway(clone),
		},
		{
			link: `Put ${him} on your lap`,
			desc: generalText.putOnLap(clone),
			tooltip: `Ask ${him} if ${he}'s been naughty or nice.`,
			prereq: () => !slaveState.onLap &&
				!playerState.onLap &&
				slaveState.sexAct === null,
			effect: () => {
				slaveState.onLap = true;
			},
			reaction: this.reactionText.putOnLap(clone),
		},
		{
			link: `Get ${him} off your lap`,
			desc: generalText.getOffLap(clone),
			tooltip: `That's enough of that.`,
			prereq: () => slaveState.onLap &&
				slaveState.sexAct === null,
			effect: () => {
				slaveState.onLap = false;
			},
			reaction: this.reactionText.getOffLap(clone),
		},
		{
			link: `Take ${him} to bed`,
			desc: generalText.goToBed(clone),
			tooltip: `Take ${him} somewhere a bit more comfortable.`,
			prereq: () => !playerState.isLaying &&
				!slaveState.isLaying &&
				slaveState.sexAct === null,
			effect: () => {
				playerState.position = Position.LAYING;
				slaveState.position = Position.LAYING;
			},
			reaction: this.reactionText.goToBed(clone),
		},
		{
			link: `Get out of bed`,
			desc: generalText.getOutOfBed(clone),
			tooltip: `In case you need a little more maneuverability.`,
			prereq: () => playerState.isLaying &&
				slaveState.isLaying &&
				slaveState.sexAct === null,
			effect: () => {
				playerState.position = Position.STANDING;
				slaveState.position = Position.STANDING;
			},
			reaction: this.reactionText.getOutOfBed(clone),
		},
		{
			link: `Bring in another slave`,
			desc: generalText.bringInSlave(clone),
			tooltip: `Have another slave join the two of you.`,
			prereq: () => V.slaves.length > 1 &&
				slaveState.sexAct === null,
			effect: () => {
				return;	// temporarily disabled
			},
			reaction: this.reactionText.bringInSlave(clone),
		},
	];

	if (V.seeBestiality) {
		if (V.active.canine) {
			general.push({
				link: `Bring in ${getAnimal(V.active.canine).articleAn} ${V.active.canine}`,
				desc: generalText.bringInCanine(clone),
				tooltip: `Spice things up with ${getAnimal(V.active.canine).species === 'dog' ? `man's best friend` : `a four-legged friend`}.`,
				prereq: () => V.seeBestiality && !!V.active.canine,
				effect: () => {
					return;	// temporarily disabled
				},
				reaction: this.reactionText.bringInCanine(clone),
			});
		}

		if (V.active.hooved) {
			general.push({
				link: `Bring in ${getAnimal(V.active.hooved).articleAn} ${V.active.hooved}`,
				desc: generalText.bringInHooved(clone),
				tooltip: `Make things more interesting with something a bit larger.`,
				prereq: () => V.active.hooved !== null,
				effect: () => {
					return;	// temporarily disabled
				},
				reaction: this.reactionText.bringInHooved(clone),
			});
		}

		if (V.active.feline) {
			general.push({
				link: `Bring in ${getAnimal(V.active.feline).articleAn} ${V.active.feline}`,
				desc: generalText.bringInFeline(clone),
				tooltip: `Have some fun with a furry ${getAnimal(V.active.feline).species === 'cat' ? `little` : ``} friend.`,
				prereq: () => V.active.feline !== null,
				effect: () => {
					return;	// temporarily disabled
				},
				reaction: this.reactionText.bringInFeline(clone),
			});
		}
	}

	const clothingText = App.UI.SlaveInteract.useSlave.clothingText;
	/** @type {FC.UseSlave.Option[]} */
	const clothing = [
		{
			link: `Pull up ${his} dress`,
			desc: clothingText.pullUpDress(clone),
			tooltip: `For easier access.`,
			prereq: () => clothes.includes("dress") && !slaveState.clothing.bottom.pulledDown,
			effect: () => {
				slaveState.clothing.bottom.pulledDown = true;

				playerState.lust++;
				slaveState.lust++;

				refreshArt();
			},
			reaction: this.reactionText.pullUpDress(clone),
		},
		{
			link: `Take off ${his} ${clone.clothes.replace('a ', '')}`,
			desc: clothingText.removeClothing(clone),
			tooltip: `Have ${him} take off ${his} outermost layer.`,
			prereq: () =>
				clothes !== "no clothing" &&
				!slaveState.clothing.top.isOff &&
				!slaveState.clothing.bottom.isOff,
			effect: () => {
				clone.clothes = "no clothing";
				slaveState.clothing.top.isOff = true;
				slaveState.clothing.bottom.isOff = true;

				playerState.lust++;
				slaveState.lust += 2;

				refreshArt();
			},
			reaction: this.reactionText.removeClothing(clone),
		},
		{
			link: `Take off ${his} top`,
			desc: clothingText.removeTop(clone),
			tooltip: `For easier access to ${his} ${clone.boobs >= 300 ? `tits` : `chest`}.`,
			prereq: () => !clothes.includes("dress") && !slaveState.clothing.top.isOff,
			effect: () => {
				slaveState.clothing.top.isOff = true;
				if (slaveState.clothing.bottom.isOff) {
					clone.clothes = "no clothing";
				}

				playerState.lust++;
				slaveState.lust++;

				refreshArt();
			},
			reaction: this.reactionText.removeTop(clone),
		},
		{
			link: `Take off ${his} bottoms`,
			desc: clothingText.removeBottom(clone),
			tooltip: `For easier access to ${his} crotch.`,
			prereq: () => !clothes.includes("dress") && !slaveState.clothing.bottom.isOff,
			effect: () => {
				slaveState.clothing.bottom.isOff = true;
				if (slaveState.clothing.top.isOff) {
					clone.clothes = "no clothing";
				}

				playerState.lust++;
				slaveState.lust++;

				refreshArt();
			},
			reaction: this.reactionText.removeBottom(clone),
		},
		{
			link: `Take off ${his} bra`,
			desc: clothingText.removeBra(clone),
			tooltip: `Get ${his} bra out of the way.`,
			prereq: () => slaveState.topFree && slaveState.clothing.bra,
			effect: () => {
				slaveState.clothing.bra = false;
				if (!slaveState.clothing.underwear) {
					clone.clothes = "no clothing";
				}

				playerState.lust++;
				slaveState.lust++;

				refreshArt();
			},
			reaction: this.reactionText.removeBra(clone),
		},
		{
			link: `Take off ${his} underwear`,
			desc: clothingText.removeUnderwear(clone),
			tooltip: `Get ${his} ${clone.vagina > -1 ? `panties` : `underwear`} out of the way.`,
			prereq: () => slaveState.bottomFree && slaveState.clothing.underwear,
			effect: () => {
				slaveState.clothing.underwear = false;
				if (!slaveState.clothing.bra) {
					clone.clothes = "no clothing";
				}

				playerState.lust++;
				slaveState.lust++;

				refreshArt();
			},
			reaction: this.reactionText.removeUnderwear(clone),
		},
		{
			link: `Pull aside ${his} underwear`,
			desc: clothingText.pullAsideUnderwear(clone),
			tooltip: `Move ${his} ${clone.vagina > -1 ? `panties` : `underwear`} out of the way for easier access to what's underneath.`,
			prereq: () => slaveState.bottomFree && slaveState.clothing.underwear,
			effect: () => {
				playerState.lust++;
				slaveState.lust++;
			},
			reaction: this.reactionText.pullAsideUnderwear(clone),
		},
		{
			link: `Give ${him} a ball gag`,
			desc: clothingText.addMouthAccessory(clone),
			tooltip: `In case ${he}'s being too mouthy – or just for fun.`,
			prereq: () => clone.mouthAccessory === none,
			effect: () => {
				clone.mouthAccessory = "ball gag";

				refreshArt();
			},
			reaction: this.reactionText.addMouthAccessory(clone),
		},
		{
			link: `Give ${him} a ring gag`,
			desc: clothingText.addMouthAccessory(clone),
			tooltip: `In case ${he}'s being too mouthy, but you still want access to ${his} throat.`,
			prereq: () => clone.mouthAccessory === none,
			effect: () => {
				clone.mouthAccessory = "ring gag";

				refreshArt();
			},
			reaction: this.reactionText.addMouthAccessory(clone),
		},
		{
			link: `Take ${clone.mouthAccessory.includes("dildo") ? `out` : `off`} ${his} ${clone.mouthAccessory}`,
			desc: clothingText.removeMouthAccessory(clone),
			tooltip: `Give ${him} some respite.`,
			prereq: () => clone.mouthAccessory !== none,
			effect: () => {
				clone.mouthAccessory = none;

				refreshArt();
			},
			reaction: this.reactionText.removeMouthAccessory(clone),
		},
		{
			link: `Take off ${his} vaginal chastity device`,
			desc: clothingText.removeChastityVaginal(clone),
			tooltip: `${He} won't be needing it.`,
			prereq: () => (clothes === "no clothing" || clothes.includes("dress")) &&
				clone.chastityVagina === 1,
			effect: () => {
				clone.chastityVagina = 0;

				refreshArt();
			},
			reaction: this.reactionText.removeChastityVaginal(clone),
		},
		{
			link: `Take off ${his} anal chastity device`,
			desc: clothingText.removeChastityAnal(clone),
			tooltip: `${He} won't be needing it.`,
			prereq: () => (clothes === "no clothing" || clothes.includes("dress")) &&
				clone.chastityAnus === 1,
			effect: () => {
				clone.chastityAnus = 0;

				refreshArt();
			},
			reaction: this.reactionText.removeChastityAnal(clone),
		},
		{
			link: `Take the chastity device off of ${his} dick`,
			desc: clothingText.removeChastityPenis(clone),
			tooltip: `${He} won't be needing it.`,
			prereq: () => (clothes === "no clothing" || clothes.includes("dress")) &&
				clone.chastityPenis === 1,
			effect: () => {
				clone.chastityPenis = 0;

				refreshArt();
			},
			reaction: this.reactionText.removeChastityPenis(clone),
		},
		{
			link: `Take your shirt off`,
			desc: clothingText.removePlayerTop(clone),
			tooltip: `You won't be needing this.`,
			prereq: () => !player.clothes.includes("dress") && !playerState.clothing.top.isOff,
			effect: () => {
				playerState.clothing.top.isOff = true;

				playerState.lust++;
				slaveState.lust++;
			},
			reaction: this.reactionText.removePlayerTop(clone),
		},
		{
			link: `Take your pants off`,
			desc: clothingText.removePlayerBottom(clone),
			tooltip: `These will just get in the way.`,
			prereq: () => !player.clothes.includes("dress") && !playerState.clothing.bottom.isOff,
			effect: () => {
				playerState.clothing.bottom.isOff = true;

				playerState.lust++;
				slaveState.lust++;
			},
			reaction: this.reactionText.removePlayerBottom(clone),
		},
		{
			link: `Take off your bra`,
			desc: clothingText.removePlayerBra(slave),
			tooltip: `Let them free!`,
			prereq: () => playerState.clothing.bra && playerState.clothing.top.isOff,
			effect: () => {
				playerState.clothing.bra = false;

				playerState.lust++;
				slaveState.lust++;
			},
			reaction: this.reactionText.removePlayerBra(slave),
		},
		{
			link: `Take off your underwear`,
			desc: clothingText.removePlayerUnderwear(clone),
			tooltip: `For easier access.`,
			prereq: () => playerState.clothing.underwear && playerState.clothing.bottom.isOff,
			effect: () => {
				playerState.clothing.underwear = false;

				playerState.lust++;
				slaveState.lust++;
			},
			reaction: this.reactionText.removePlayerUnderwear(clone),
		},
	];

	return {
		contextual,
		face,
		chest,
		crotch,
		general,
		clothing,
	};
};
