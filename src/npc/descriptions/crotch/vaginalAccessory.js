/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.vaginalAccessory = function(slave) {
	if (slave.vaginalAccessory === "none") {
		return "";
	}
	const r = [];
	const {
		he, his, He, His
	} = getPronouns(slave);
	let held;
	if (slave.chastityVagina) {
		held = "held in place by a chastity belt";
	} else if (dildoWidth(slave) === 0) {
		held = "held in place by a strap";
	} else {
		held = `held in place by a strap, which ${he} can remove for vaginal intercourse`;
	}
	const dildo = App.Data.vaginalAccessory.get(slave.vaginalAccessory) || V.customItem.vaginalAccessory.get(slave.vaginalAccessory);
	switch (dildo.width) {
		case 0:
			r.push(`A ${slave.vaginalAccessory} is attached on ${his} clit, ${held}.`);	// FIXME: not super happy with this
			break;
		case 1:
			r.push(`${His} pussy is filled by a ${slave.vaginalAccessory} ${held}.`);/* TODO: these may need to be updated for slaves with gaping+ vaginas */
			if (dildo.length > 1) {
				r.push(`It noticeably bulges ${his} stomach.`);
			}
			break;
		case 2:
			r.push(`${His} pussy is`);
			if (slave.vagina < 2) {
				r.push(`painfully stretched`);
			} else if (slave.vagina < 3) {
				r.push(`uncomfortably filled`);
			} else {
				r.push(`comfortably filled`);
			}
			r.push(`by a large ${slave.vaginalAccessory} ${held}.`);
			if (dildo.length > 1) {
				r.push(`It noticeably bulges ${his} stomach.`);
			}
			break;
		case 3:
			if (slave.vagina < 4) {
				r.push(`${His} pussy is filled to the breaking point by an enormous ${slave.vaginalAccessory}.`);
				if (dildo.length > 1) {
					r.push(`It noticeably bulges ${his} stomach.`);
				}
				if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
					r.push(`${He} can barely move with the discomfort, but ${he} frequently climaxes with agony.`);
				} else {
					r.push(`${He} can barely move with the discomfort, and ${he} sometimes breaks down in tears at having ${his} cunt permanently stretched.`);
				}
			} else {
				r.push(`${His} cavernous pussy is comfortably filled by a huge ${slave.vaginalAccessory}.`);
				if (dildo.length > 1) {
					r.push(`It noticeably bulges ${his} stomach.`);
				}
			}
			if (slave.chastityVagina) {
				r.push(`A chastity belt locks it securely in place.`);
			}
			break;
		default:
			if (slave.chastityVagina) {
				r.push(`${His} pussy is protected by a chastity`);
				if (App.Data.clothes.get(slave.clothes).exposure <= 3) {
					r.push(`belt worn under ${his} clothing.`);
				} else {
					r.push(`belt.`);
				}
			}
			break;
	}
	r.push(App.Desc.vaginalAttachment(slave));
	if (slave.chastityVagina && FutureSocieties.isActive('FSRestart')) {
		r.push(`This pleases the Societal Elite.`);
	}

	return r.join(" ");
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.vaginalAttachment = function(slave) {
	const r = [];
	const {
		his, He, His
	} = getPronouns(slave);
	switch (dildoVibeLevel(slave)) {
		case 2:
			// TODO: not sure about this description
			r.push(`${His} ${slave.vaginalAccessory} buzzes every so often, when prompted by the arcology's systems to train ${his} sexuality.`);
			if (slave.chastityVagina) {
				r.push(`The chastity belt locking it in place means there is no escape.`);
			}
			// TODO: add descriptions for slaves with gaping+ vaginas
			break;
		case 1:
			// TODO: not sure about this description
			r.push(`${He} looks distinctly uncomfortable as ${his} ${slave.vaginalAccessory} buzzes every so often.`);
			if (slave.chastityVagina) {
				r.push(`The chastity belt locking it in place means there is no escape.`);
			}
			// TODO: add descriptions for slaves with gaping+ vaginas
			break;
		case 0:
			r.push(`${His} current accessory is silent.`);
	}
	return r.join(" ");
};
