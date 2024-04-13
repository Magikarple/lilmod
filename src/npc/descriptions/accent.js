/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.accent = function(slave) {
	const r = [];
	const {
		him, He
	} = getPronouns(slave);
	let accent;
	if (slave.accent !== 0) {
		if (slave.accent === 1) {
			accent = either("a beautiful", "a distinctive", "an intriguing", "a light", "a lovely", "a mild", "a pleasant", "a rich", "a slight", "a smooth");
			r.push(`${He} speaks ${V.language} in ${accent}`);
			if (slave.nationality !== "Stateless" && slave.nationality !== V.language) {
				r.push(aNational(slave.nationality));
			}
			if (slave.rules.speech === "accent elimination") {
				r.push(`accent, which the rules encourage ${him} to suppress.`);
			} else if (V.language === "Japanese" && FutureSocieties.isActive('FSEdoRevivalist')) {
				r.push(`accent, which society finds unpleasant.`);
			} else {
				r.push(`accent.`);
			}
		} else if (slave.accent === 2) {
			accent = either("a broad", "a harsh", "a heavy", "an intense", "a marked", "a noticeable", "a rough", "a significant", "a stressed", "a strong", "a thick");
			r.push(`${He} speaks ${V.language} in ${accent} ${aNational(slave.nationality)} accent that can be hard to`);
			if (slave.rules.speech === "accent elimination") {
				r.push(`understand, and the rules encourage ${him} to make an effort to suppress it.`);
			} else {
				r.push(`understand.`);
			}
		} else {
			r.push(`${He} speaks little ${V.language}, but understands enough to be given orders.`);
		}
	}
	return r.join(" ");
};
