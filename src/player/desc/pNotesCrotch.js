App.Desc.Player.pNotesCrotch = function(PC = V.PC) {
	const r = [];

	if (V.PC.career === "servant") {
		if (V.PC.balls >= 30) {
			r.push(`Your dress and apron bulge with your enormous balls; you had to have your dresses tailored so that the swinging mass of your sack would stop bursting seams inadvertently.`);
		} else if (V.PC.balls >= 14) {
			r.push(`Your dress and apron bulge with your enormous balls.`);
		} else if (V.PC.balls >= 9) {
			r.push(`Your dress hides your huge balls, but it does nothing to hide your altered gait.`);
		} else if (V.PC.balls >= 5) {
			r.push(`Your dress hides your big balls.`);
		}
	} else if (V.PC.career === "escort") {
		if (V.PC.balls >= 30) {
			r.push(`You've pretty much given up on pants because of your monstrous balls, but you've replaced them with a slutty skirt that stretches around their veiny contours. People can't help staring to see if they'll get a glimpse of your massive sack peeking out from under the skirt.`);
		} else if (V.PC.balls >= 14) {
			r.push(`You've swapped up to a larger pair of slutty pants, specially designed with extra sack room. They draw the eye right to your`);
			if (V.PC.preg >= 28) {
				r.push(`bulge; you can do without people thinking you are giving birth into your pants, though.`);
			} else {
				r.push(`bulge.`);
			}
		} else if (V.PC.balls >= 9) {
			r.push(`Your slutty pants are really tight around the groin, but they hold your huge balls in place quite nicely.`);
		} else if (V.PC.balls >= 5) {
			r.push(`Your slutty pants bulge more than ever with your big balls.`);
		}
	} else {
		if (V.PC.balls >= 30) {
			r.push(`You've pretty much given up on suit pants because of your monstrous balls, but you've replaced them with a custom kilt tailored to match the rest of your business attire. People would wonder why you're wearing such old fashioned clothes if your ridiculous bulge didn't make it obvious.`);
		} else if (V.PC.balls >= 14) {
			r.push(`You've had to get your suit pants retailored again to fit your enormous balls. It is obvious that the bulge in your pants is not your`);
			if (V.PC.preg >= 28) {
				r.push(`penis; you've had several people rush to your aid under the mistaken belief that`);
				if (V.PC.pregType > 1) {
					r.push(`one of your children`);
				} else {
					r.push(`your child`);
				}
				r.push(`was crowning into your pants.`);
			} else {
				r.push(`penis.`);
			}
		} else if (V.PC.balls >= 9) {
			r.push(`You've had to get your suit pants retailored to fit your huge balls. It gives you a striking figure, though.`);
		} else if (V.PC.balls >= 5) {
			r.push(`Your suit pants bulge more than ever with your big balls.`);
		}
	}

	return r.join(" ");
};
