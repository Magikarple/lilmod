App.Desc.Player.officeButt = function(PC = V.PC) {
	const r = [];

	if (V.PC.butt >= 5) {
		if (V.PC.balls >= 14 && V.ballsAccessibility !== 1) {
			if (V.PC.markings === "freckles") {
				r.push(`Your enormous, freckled`);
			} else if (V.PC.markings === "heavily freckled") {
				r.push(`Your enormous, densely freckled`);
			} else {
				r.push(`Your enormous`);
			}
			r.push(`butt would make your chair extremely comfortable if it wasn't for your enormous balls. You have to be extremely careful to prevent your enormous cheeks from pinching your nuts.`);
		} else {
			if (V.PC.markings === "freckles") {
				r.push(`Your enormous, freckled`);
			} else if (V.PC.markings === "heavily freckled") {
				r.push(`Your enormous, densely freckled`);
			} else {
				r.push(`Your enormous`);
			}
			r.push(`butt makes for an extremely comfortable seat. You hope the chair doesn't follow you when you stand up this time.`);
		}
	} else if (V.PC.butt >= 4) {
		if (V.PC.balls >= 14 && V.ballsAccessibility !== 1) {
			if (V.PC.markings === "freckles") {
				r.push(`Your huge, freckled`);
			} else if (V.PC.markings === "heavily freckled") {
				r.push(`Your huge, densely freckled`);
			} else {
				r.push(`Your huge`);
			}
			r.push(`butt would make for a very comfortable seat if it wasn't for your enormous balls. You have to be careful to prevent your huge cheeks from pinching your nuts.`);
		} else {
			if (V.PC.markings === "freckles") {
				r.push(`Your huge, freckled`);
			} else if (V.PC.markings === "heavily freckled") {
				r.push(`Your huge, densely freckled`);
			} else {
				r.push(`Your huge`);
			}
			r.push(`butt makes for a very comfortable seat.`);
		}
	} else if (V.PC.butt >= 3) {
		if (V.PC.balls >= 14 && V.ballsAccessibility !== 1) {
			if (V.PC.markings === "freckles") {
				r.push(`Your big, freckled`);
			} else if (V.PC.markings === "heavily freckled") {
				r.push(`Your big, densely freckled`);
			} else {
				r.push(`Your big`);
			}
			r.push(`butt would make for a comfortable seat if your enormous balls weren't getting in the way.`);
		} else {
			if (V.PC.markings === "freckles") {
				r.push(`Your big, freckled`);
			} else if (V.PC.markings === "heavily freckled") {
				r.push(`Your big, densely freckled`);
			} else {
				r.push(`Your big`);
			}
			r.push(`butt makes for a comfortable seat.`);
		}
	}

	return r.join(" ");
};
