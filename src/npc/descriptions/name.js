/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.name = function(slave) {
	const r = [];
	const {
		he, him, his, He
	} = getPronouns(slave);
	if (slave.slaveName !== slave.birthName || slave.slaveSurname !== slave.birthSurname) {
		let nameLoss = 0;
		if (slave.fuckdoll === 0) {
			if (slave.slaveName !== slave.birthName && slave.slaveSurname !== slave.birthSurname && slave.slaveSurname !== 0) {
				r.push(`${SlaveFullName(slave)} is not ${his} original full name;`);
				if (slave.birthName === "" || slave.birthSurname === "") {
					r.push(`whatever it was, however, has been lost forever.`);
					nameLoss = 1;
				}
			} else if (slave.slaveName !== slave.birthName) {
				r.push(`${slave.slaveName} is not ${his} original given name;`);
				if (slave.birthName === "") {
					r.push(`whatever it was, however, has been lost forever.`);
					nameLoss = 1;
				}
			} else if (slave.slaveSurname !== slave.birthSurname) {
				if (slave.slaveSurname === 0 && slave.birthSurname === "") {
					r.push(`${He} once had a surname; whatever it was, however, has been lost forever.`);
					nameLoss = 1;
				} else if (slave.slaveSurname !== 0) {
					r.push(`${slave.slaveSurname} is not ${his} original surname;`);
					if (slave.birthSurname === "") {
						r.push(`whatever it was, however, has been lost forever.`);
						nameLoss = 1;
					}
				} else {
					nameLoss = 1;
				}
			}
			if (slave.birthName === "" && slave.birthSurname === "") {
				r.push(`${He} has little alternative but to use whatever name you give ${him}.`);
			} else {
				if (slave.slaveName === slave.birthName && slave.birthSurname === "") {
					// deadend
				} else if (slave.slaveSurname === slave.birthSurname && slave.birthName === "") {
					if (slave.career === "a Futanari Sister") {
						r.push(`${He} discarded ${his} birth name upon initiation into the Futanari Sisters, and neither ${he} nor they have ever revealed what it might have been.`);
					} else {
						r.push(`${He} uses ${his} slave name automatically, having no alternative.`);
					}
				} else {
					if (nameLoss === 1) {
						r.push(`${He}`);
					} else {
						r.push(`${he}`);
					}
					if (slave.devotion > 95) {
						r.push(`adores ${his} slave name and affects to have forgotten that ${he} was ever called`);
					} else if (slave.devotion > 50) {
						r.push(`uses ${his} slave name automatically and gives no sign that ${he} was ever called`);
					} else if (slave.devotion > 20) {
						r.push(`uses ${his} slave name despite once being known as`);
					} else if (slave.devotion >= -20) {
						r.push(`uses ${his} slave name hesitantly since ${he} was once called`);
					} else if (slave.devotion >= -50) {
						r.push(`uses ${his} slave name with resentment since ${he} prefers ${his} original name,`);
					} else {
						r.push(`uses ${his} slave name only when constantly punished, since ${he} feels ${his} real name is`);
					}
					if (slave.slaveName !== slave.birthName && slave.slaveSurname !== slave.birthSurname) {
						r.push(`${SlaveFullBirthName(slave)}.`);
					} else if (slave.slaveName !== slave.birthName && slave.birthName !== "") {
						if (slave.slaveName.endsWith(slave.birthName)) {
							r.push(`just plain`);
						}
						r.push(`${slave.birthName}.`);
					} else if (slave.slaveSurname !== slave.birthSurname) {
						r.push(`${slave.birthSurname}.`);
					}
				}
			}
			if (slave.slaveSurname === 0) {
				r.push(`${He} has no surname as a slave, which ${he}`);
				if (slave.devotion > 95) {
					r.push(`loves.`);
				} else if (slave.devotion > 50) {
					r.push(`likes.`);
				} else if (slave.birthSurname === "") {
					r.push(`is indifferent to.`);
				} else if (slave.devotion > 20) {
					r.push(`accepts.`);
				} else if (slave.devotion >= -20) {
					r.push(`tolerates.`);
				} else if (slave.devotion >= -50) {
					r.push(`resents.`);
				} else {
					r.push(`hates.`);
				}
			}
		} else {
			r.push(`${SlaveFullName(slave)} is not ${his} original name: ${he} was once called ${SlaveFullBirthName(slave)}.`);
		}
	}

	return r.join(" ");
};
