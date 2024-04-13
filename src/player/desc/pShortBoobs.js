App.Desc.Player.officeBoobs = function(PC = V.PC) {
	const r = [];
	let frag;

	if (PC.boobs >= 1400) {
		r.push(`Your breasts are`);
		if (PC.markings === "freckles") {
			r.push(`enormous with light freckling on the tops and in your cleavage.`);
		} else if (PC.markings === "heavily freckled") {
			r.push(`enormous and covered in freckles, which are particularly dense in the cleft between them.`);
		} else {
			r.push(`enormous.`);
		}
		if (PC.boobsImplant > 0) {
			r.push(`They are big, round, and obviously implants. They insist on maintaining their shape no matter how you move.`);
		} else {
			r.push(`They are all natural, heavy, and a bit saggy though they retain some perk. Every single move you make sends ripples through your cleavage. You catch yourself watching them move in the mirror every so often.`);
		}
		if (PC.lactation > 0) {
			r.push(`Your breasts feel even more enormous lately; this is likely a side effect of your lactation, though you could do without the wet spots forming over your nipples.`);
		}
	} else if (PC.boobs >= 1200) {
		r.push(`Your breasts are`);
		if (PC.markings === "freckles") {
			r.push(`huge with light freckling on the tops and in your cleavage.`);
		} else if (PC.markings === "heavily freckled") {
			r.push(`huge and covered in freckles, which are particularly dense in the cleft between them.`);
		} else {
			r.push(`huge.`);
		}
		if (PC.boobsImplant > 0) {
			r.push(`They are unnaturally perky for their size. When you shake them, they barely move.`);
		} else {
			r.push(`They are all natural and a little heavy. They bounce lewdly when you shake them and take a little too long to calm down.`);
		}
		if (PC.lactation > 0) {
			r.push(`Your breasts feel even more huge lately; this is this is likely a side effect of your lactation, though you could do without the wet spots forming over your nipples.`);
		}
	} else if (PC.boobs >= 1000) {
		r.push(`Your breasts are pretty`);
		if (PC.markings === "freckles") {
			r.push(`big with light freckling on the tops and in your cleavage.`);
		} else if (PC.markings === "heavily freckled") {
			r.push(`big and covered in freckles, which are particularly dense in the cleft between them.`);
		} else {
			r.push(`big.`);
		}
		if (PC.boobsImplant > 0) {
			r.push(`They are nice, perky and not obviously implants. They jiggle only slightly when you shake them though.`);
		} else {
			r.push(`They are nice and perky, despite their size. They bounce lewdly when you shake them.`);
		}
		if (PC.lactation > 0) {
			r.push(`Your breasts feel bigger lately; this is likely a side effect of your lactation, though you could do without the wet spots forming over your nipples.`);
		}
	} else if (PC.boobs >= 800) {
		r.push(`Your breasts are on the larger side of`);
		if (PC.lactation > 0) {
			r.push(`things, though you could do without the wet spots forming over your nipples.`);
		} else {
			r.push(`things.`);
		}
		if (PC.markings === "freckles") {
			r.push(`The tops of your breasts and your cleavage are lightly freckled.`);
		} else if (PC.markings === "heavily freckled") {
			r.push(`They are covered in freckles, which are particularly dense in the cleft between them.`);
		}
	} else if (PC.boobs >= 650) {
		r.push(`Your breasts are certainly`);
		if (PC.markings === "freckles") {
			r.push(`eye-catching with light freckling on the tops and in your cleavage.`);
		} else if (PC.markings === "heavily freckled") {
			r.push(`eye-catching and covered in freckles, which are particularly dense in the cleft between them.`);
		} else {
			r.push(`eye-catching.`);
		}
		r.push(`They are nice and perky, with just the right amount of bounce when you shake them.`);
		if (PC.lactation > 0) {
			r.push(`Your breasts feel bigger lately; this is likely a side effect of your lactation, though you could do without the wet spots forming over your nipples.`);
		}
	} else if (PC.boobs >= 500) {
		r.push(`Your breasts are fairly average, at least to old world`);
		if (PC.markings === "freckles") {
			r.push(`standards, with light freckling on the tops and in your cleavage.`);
		} else if (PC.markings === "heavily freckled") {
			r.push(`standards, and covered in freckles, which are particularly dense in the cleft between them.`);
		} else {
			r.push(`standards.`);
		}
		r.push(`They are very perky, but aren't big enough to have a nice bounce when you shake them.`);
		if (PC.lactation > 0) {
			r.push(`Your breasts feel bigger lately; this is likely a side effect of your lactation, though you could do without the wet spots forming over your nipples.`);
		}
	} else if (PC.boobs >= 400) {
		r.push(`Your breasts are considered small by most`);
		if (PC.markings === "freckles") {
			r.push(`standards, with light freckling on the tops and in your cleavage.`);
		} else if (PC.markings === "heavily freckled") {
			r.push(`standards, and covered in freckles, which are particularly dense in the cleft between them.`);
		} else {
			r.push(`standards.`);
		}
		r.push(`Their size makes them extremely perky, at the cost of having little to no bounce.`);
		if (PC.lactation > 0) {
			r.push(`Your breasts feel bigger lately; this is likely a side effect of your lactation, though you could do without the wet spots forming over your nipples.`);
		}
	} else if (PC.boobs >= 300) {
		r.push(`Your breasts, if they can even be called that, are`);
		if (PC.markings === "freckles") {
			r.push(`covered in a light spray of freckles.`);
		} else if (PC.markings === "heavily freckled") {
			r.push(`covered in dense freckles.`);
		} else {
			r.push(`tiny even by old world standards.`);
		}
		r.push(`On the plus side, no chance of sag.`);
		if (PC.lactation > 0) {
			r.push(`Your breasts feel more substantial lately; this is likely a side effect of your lactation, though you could do without the wet spots forming over your nipples.`);
		}
	} else if (PC.title === 1) {
		r.push(`Your chest is quite`);
		if (PC.lactation > 0) {
			frag = ` masculine, though the pair of wet spots forming over your nipples suggest otherwise`;
		} else {
			frag = ` masculine`;
		}
		if (PC.markings === "freckles") {
			if (PC.lactation > 0) {
				frag += `,`;
			}
			frag += ` and covered in a light spray of freckles.`;
		} else if (PC.markings === "heavily freckled") {
			if (PC.lactation > 0) {
				frag += `,`;
			}
			frag += ` and covered in dense freckles.`;
		} else {
			frag += `.`; // all this frag bs is to make sure there is no space before the period. Sigh.
		}
		r.push(frag);
	} else {
		r.push(`Your chest is`);
		if (PC.lactation > 0) {
			frag = ` non-existent, save for the pair of bulging milk glands beneath your nipples`;
		} else {
			frag = ` non-existent`;
		}
		if (PC.markings === "freckles") {
			if (PC.lactation > 0) {
				frag += `,`;
			}
			frag += ` and covered in a light spray of freckles.`;
		} else if (PC.markings === "heavily freckled") {
			if (PC.lactation > 0) {
				frag += `,`;
			}
			frag += ` and covered in dense freckles.`;
		} else {
			frag += `.`;
		}
		r.push(frag);
	}

	return r.join(" ");
};
