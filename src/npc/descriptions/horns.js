/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.horns = function(slave) {
	const r = [];
	const {
		he, his, He
	} = getPronouns(slave);
	if (slave.horn === "curved succubus horns") {
		r.push(`${He} has`);
		if (slave.face > 40) {
			r.push(`majestic ${slave.hornColor} horns that jut out from the back of ${his} head and curve forward, looking almost like a crown.`);
		} else if (slave.face > 0) {
			r.push(`imposing ${slave.hornColor} horns that jut out from the back of ${his} head and curve forward nicely.`);
		} else {
			r.push(`terrifying ${slave.hornColor} horns that jut out from the back of ${his} head and curve forward menacingly.`);
		}
	} else if (slave.horn === "backswept horns") {
		if (slave.face > 40) {
			r.push(`majestic ${slave.hornColor} horns that jut out the front of ${his} head and curve backwards, like some royal headdress.`);
		} else if (slave.face > 0) {
			r.push(`imposing ${slave.hornColor} horns that jut out the front of ${his} head and curve backwards nicely.`);
		} else {
			r.push(`terrifying ${slave.hornColor} horns that jut out the front of ${his} head and curve backwards, looking like some twisted helmet.`);
		}
	} else if (slave.horn === "cow horns") {
		r.push(`${He} has two ${slave.hornColor} ${App.Utils.translate("cow")} horns on the sides of ${his} head; they curve sharply upward.`);
	} else if (slave.horn === "two long oni horns") {
		r.push(`${He} has two long ${slave.hornColor} horns sticking straight up out of ${his}`);
		if (slave.devotion > 20) {
			r.push(`forehead; ${he} holds them up proudly.`);
		} else {
			r.push(`forehead.`);
		}
	} else if (slave.horn === "one long oni horn") {
		r.push(`${He} has a long ${slave.hornColor} horn sticking straight up out of ${his}`);
		if (slave.devotion > 20) {
			r.push(`forehead; ${he} holds it up proudly`);
		} else {
			r.push(`forehead.`);
		}
	} else if (slave.horn === "small horns") {
		r.push(`${He} has cute, little ${slave.hornColor} horns sticking out of ${his} head.`);
	}
	return r.join(" ");
};
