/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.areolaPiercing = function(slave) {
	const {his, He, His} = getPronouns(slave);
	const nipColor = nippleColor(slave);
	let r = [];
	if (slave.fuckdoll === 0) {
		if (slave.piercing.areola.weight > 0) {
			switch (slave.areolae) {
				case 1:
					r.push(`${His} areolae form large, lovely circles of ${nipColor} skin around each nipple.`);
					r.push(`${He} has stud piercings around their borders, enhancing the contrast.`);
					break;
				case 2:
					r.push(`${His} areolae are unusually wide, eye-catching circles of ${nipColor} skin around each nipple.`);
					r.push(`${He} has stud piercings around their borders, enhancing the contrast.`);
					break;
				case 3:
					r.push(`${His} ${nipColor} areolae are unnaturally broad, covering much of the ${slave.boobShape === "saggy" ? 'bottom' : 'front'} of each breast.`);
					r.push(`${He} has many stud piercings around their edges, forming a metal border between ${nipColor} nipple and breast.`);
					break;
				case 4:
					r.push(`${His} ${nipColor} areolae are unnaturally huge, almost entirely covering the ${slave.boobShape === "saggy" ? 'bottom' : 'front'} of each breast.`);
					r.push(`${He} has many stud piercings around their edges, forming a metal border between ${nipColor} nipple and breast.`);
					break;
				default:
					r.push(`${He} has stud piercings in circles around the edges of ${his} minimal ${nipColor} areolae.`);
					r.push(`${His} ${slave.nipples} nipples are surrounded by a minimal ${nipColor} areolae.`);
			}
			if (slave.areolaeShape === "heart") {
				r.push(`${His} ${nipColor} areolae are heart-shaped, an obvious surgical alteration. Their borders are defined by stud piercings with pink stones.`);
				if (slave.boobShape === "saggy") {
					r.push(`${His} motherly boobs point downward, though, leaving only the curved top of each heart visible.`);
				}
			} else if (slave.areolaeShape === "star") {
				r.push(`${His} ${nipColor} areolae are star-shaped, an obvious surgical alteration. Their borders are defined by shiny stud piercings.`);
				if (slave.boobShape === "saggy") {
					r.push(`${His} motherly boobs point downward, though, leaving only the pointed top of each star visible.`);
				}
			} else if (slave.areolaeShape !== "circle") {
				r.push(`${His} ${nipColor} areolae are ${slave.areolaeShape}-shaped, an obvious surgical alteration. Their borders are defined by shiny stud piercings.`);
				if (slave.boobShape === "saggy") {
					r.push(`${His} motherly boobs point downward, though, leaving only the top of each ${slave.areolaeShape} visible.`);
				}
			}
		}
	}
	return r.join(' ');
};
