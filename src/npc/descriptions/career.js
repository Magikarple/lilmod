/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.career = function(slave) {
	const r = [];
	const {
		he, him, his, He, himself
	} = getPronouns(slave);
	const career = convertCareer(slave);

	if (slave.fuckdoll === 0) {
		if (slave.career === "a slave") {
			r.push(`${He} was a slave long before you obtained ${him}.`);
		} else if (slave.career === "a slave since birth") {
			r.push(`${He}'s been your slave ${his} entire life.`);
		} else if (slave.career === "a meat toilet" || slave.career === "a cum dump") {
			r.push(`${He} sees ${himself} as a cum receptacle.`);
		} else if (slave.career === "a dairy cow") {
			r.push(`${He}'s been broken into the belief that ${he} is nothing more than a cow to be milked and bred.`);
		} else if (slave.career === "a breeding bull") {
			r.push(`${He}'s been broken into the belief that ${he} is nothing more than a bull destined to fill fertile wombs with calves.`);
		} else if (slave.career === "a breeder") {
			r.push(`Before you obtained ${him}, ${he} was a breeding slave.`);
		} else if (slave.career === "a bioreactor") {
			r.push(`${He} has spent time as a cow in an industrial dairy, an experience that marked ${him} deeply.`);
		} else {
			r.push(`Before ${he} was a slave, ${he} was`);
			if (App.Data.Careers.Leader.bodyguard.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Bodyguard.`);
			} else if (App.Data.Careers.Leader.wardeness.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Wardeness for`);
				if (V.cellblock === 0) {
					r.push(`a Cellblock.`);
				} else {
					r.push(`${V.cellblockName}.`);
				}
			} else if (App.Data.Careers.Leader.attendant.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as an Attendant for`);
				if (V.spa === 0) {
					r.push(`a Spa.`);
				} else {
					r.push(`${V.spaName}.`);
				}
			} else if (App.Data.Careers.Leader.matron.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Matron for`);
				if (V.nursery === 0 && V.nurseryCribs === 0) {
					r.push(`a Nursery.`);
				} else {
					r.push(`${V.nurseryName}.`);
				}
			} else if (App.Data.Careers.Leader.nurse.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Nurse for`);
				if (V.clinic === 0) {
					r.push(`a Clinic.`);
				} else {
					r.push(`${V.clinicName}.`);
				}
			} else if (App.Data.Careers.Leader.schoolteacher.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Schoolteacher for`);
				if (V.schoolroom === 0) {
					r.push(`a Schoolroom.`);
				} else {
					r.push(`${V.schoolroomName}.`);
				}
			} else if (App.Data.Careers.Leader.stewardess.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Stewardess for`);
				if (V.servantsQuarters === 0) {
					r.push(`a Servant's Quarters.`);
				} else {
					r.push(`${V.servantsQuartersName}.`);
				}
			} else if (App.Data.Careers.Leader.milkmaid.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Milkmaid for`);
				if (V.dairy === 0) {
					r.push(`a Dairy.`);
				} else {
					r.push(`${V.dairyName}.`);
				}
			} else if (App.Data.Careers.Leader.farmer.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Farmer for`);
				if (V.farmyard === 0) {
					r.push(`a Farmyard.`);
				} else {
					r.push(`${V.farmyardName}.`);
				}
			} else if (App.Data.Careers.Leader.madam.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Madam for`);
				if (V.brothel === 0) {
					r.push(`a Brothel.`);
				} else {
					r.push(`${V.brothelName}.`);
				}
			} else if (App.Data.Careers.Leader.DJ.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a DJ for`);
				if (V.club === 0) {
					r.push(`a Club.`);
				} else {
					r.push(`${V.clubName}.`);
				}
			} else if (App.Data.Careers.Leader.HG.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Head Girl.`);
			} else if (App.Data.Careers.Leader.recruiter.includes(slave.career)) {
				r.push(`${career}, giving ${him} potential as a Recruiter.`);
			} else if (App.Data.Careers.General.entertainment.includes(slave.career)) {
				r.push(`${career}, giving ${him} a slight edge at entertainment.`);
			} else if (App.Data.Careers.General.whore.includes(slave.career)) {
				r.push(`${career}, giving ${him} a slight edge at sexual commerce.`);
			} else if (App.Data.Careers.General.grateful.includes(slave.career)) {
				r.push(`${career}, so ${he} can remember what it's like`);
				if (slave.career === "a prisoner") {
					r.push(`with no one looking out for you.`);
				} else {
					r.push(`to have the freedom to starve.`);
				}
			} else if (App.Data.Careers.General.menial.includes(slave.career)) {
				r.push(`${career}, giving ${him} experience following orders.`);
			} else if (App.Data.Careers.General.servant.includes(slave.career)) {
				r.push(`${career}, giving ${him} a slight edge in housekeeping.`);
			} else {
				r.push(`${career}.`);
			}
		}
		if (V.week - slave.weekAcquired >= 20 && slave.skill.entertainment >= 100) {
			if (!App.Data.Careers.General.entertainment.includes(slave.career)) {
				r.push(`${He} has gotten enough experience to be as charismatic as any professional`);
				if (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.mammary + slave.counter.penetrative > 1000) {
					r.push(`entertainer, and has been fucked so many times that a free sex worker could teach ${him} nothing.`);
				} else {
					r.push(`entertainer.`);
				}
			}
		} else if (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.mammary + slave.counter.penetrative > 1000) {
			if (!App.Data.Careers.General.whore.includes(slave.career)) {
				r.push(`${He} has been fucked so many times that a free sex worker could teach ${him} nothing.`);
			}
		}
	}

	const careerMap = [
		{prop: "headGirl", val: "a Head Girl"},
		{prop: "recruiter", val: "a Recruiter"},
		{prop: "bodyguard", val: "a Bodyguard"},
		{prop: "madam", val: "a Madam"},
		{prop: "DJ", val: "a DJ"},
		{prop: "nurse", val: "a Nurse"},
		{prop: "teacher", val: "a Schoolteacher"},
		{prop: "attendant", val: "an Attendant"},
		{prop: "matron", val: "a Matron"},
		{prop: "stewardess", val: "a Stewardess"},
		{prop: "milkmaid", val: "a Milkmaid"},
		{prop: "farmer", val: "a Farmer"},
		{prop: "wardeness", val: "a Wardeness"},
		{prop: "servant", val: "a servant"},
		{prop: "entertainer", val: "an entertainer"},
		{prop: "whore", val: "a whore"}
	];
	const careersArray = careerMap.filter((o) => (slave.skill[o.prop] >= Constant.MASTERED_XP)).map((o) => o.val);
	if (careersArray.length > 0) {
		r.push(`${He} has working experience as ${toSentence(careersArray)}.`);
	}
	return r.join(" ");
};
