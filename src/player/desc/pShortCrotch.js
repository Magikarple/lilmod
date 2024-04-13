App.Desc.Player.officeCrotch = function(PC = V.PC) {
	const r = [];

	if (V.PC.balls >= 30) {
		if (V.ballsAccessibility === 1) {
			r.push(`Thankfully your accessibility remodeling included a custom chair.`);
			if (V.PC.ballsImplant > 0) {
				r.push(`When combined with the protective gel surrounding`);
			} else {
				r.push(`Despite the cumbrous bulk of`);
			}
			r.push(`your massive sperm factories, it's rather comfortable. It even has an attachment to catch your never-ending stream of precum, keeping the mess to a minimum.`);
		} else {
			r.push(`Your monstrous balls make it impossible for you to sit normally in a standard chair, forcing you sit on the edge and let them dangle. You have to sit while naked below the waist unless you want your clothes soaked with spermy precum.`);
		}
	} else if (V.PC.ballsImplant > 1 && V.PC.balls >= 14) {
		if (V.ballsAccessibility === 1) {
			r.push(`Thanks to your accessibility remodeling, your enormous gel-filled scrotum is able to rest comfortably in your custom chair.`);
		} else {
			r.push(`No matter how you sit, your enormous gel-filled scrotum is never quite comfortable. Fortunately the cosmetic gel protects you from any major discomfort.`);
		}
	} else if (V.PC.balls >= 14) {
		if (V.ballsAccessibility === 1) {
			r.push(`Thanks to your accessibility remodeling, your enormous sperm factories are able to rest comfortably in your custom chair. Your chair also catches your never-ending precum, helping to prevent a mess.`);
		} else {
			r.push(`You have to sit very carefully in your desk chair, giving your enormous sperm factories plenty of room. As they rest on the chair they deform uncomfortably under their own weight, causing even more of a mess from your ever-drooling cock.`);
		}
	} else if (V.PC.balls >= 9) {
		r.push(`You shift in your seat and spread your legs to give your huge balls room.`);
	} else if (V.PC.balls >= 5) {
		r.push(`You shift in your seat to make room for your big balls.`);
	}

	return r.join(" ");
};
