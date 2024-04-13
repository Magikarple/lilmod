App.Desc.Player.pNotesBoobs = function(PC = V.PC) {
	const r = [];

	if (PC.career === "servant") {
		if (PC.boobs >= 1400) {
			r.push(`You've gotten your dress let out to accommodate your huge bust.`);
		} else if (PC.boobs >= 1200) {
			r.push(`Your dress bulges with your big breasts.`);
		} else if (PC.boobs >= 1000) {
			r.push(`Your dress feels tight around your breasts.`);
		}
	} else if (PC.career === "escort") {
		if (PC.boobs >= 1400) {
			r.push(`Your top strains as it struggles to cover your nipples, letting your`);
			if (PC.markings === "freckles") {
				r.push(`huge, freckled`);
			} else if (PC.markings === "heavily freckled") {
				r.push(`huge, densely freckled`);
			} else {
				r.push(`huge`);
			}
			r.push(`bust bulge lewdly around it.`);
		} else if (PC.boobs >= 1200) {
			r.push(`Your top can barely contain your `);
			if (PC.markings === "freckles") {
				r.push(`big, freckled`);
			} else if (PC.markings === "heavily freckled") {
				r.push(`big, heavily freckled`);
			} else {
				r.push(`big`);
			}
			r.push(`breasts, leaving you looking sluttier than ever.`);
		} else if (PC.boobs >= 1000) {
			r.push(`Your breasts spill over your slutty`);
			if (PC.markings === "freckles") {
				r.push(`top, showing off your freckled cleavage.`);
			} else if (PC.markings === "heavily freckled") {
				r.push(`top, freckle-packed cleavage.`);
			} else {
				r.push(`top.`);
			}
		}
	} else {
		if (PC.boobs >= 1400) {
			r.push(`You've gotten your top retailored to fit your huge bust.`);
		} else if (PC.boobs >= 1200) {
			r.push(`Your top strains against your big`);
			if (PC.markings === "freckles") {
				r.push(`breasts, revealing a peek of freckled cleavage.`);
			} else if (PC.markings === "heavily freckled") {
				r.push(`breasts, revealing a peek of densely freckled cleavage.`);
			} else {
				r.push(`breasts.`);
			}
		} else if (PC.boobs >= 1000) {
			r.push(`Your top feels tight around your breasts.`);
		}
	}

	return r.join(" ");
};
