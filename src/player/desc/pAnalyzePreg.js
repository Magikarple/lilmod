App.Desc.Player.analyzePreg = function(PC = V.PC) {
	const r = [];

	if (PC.belly >= 120000) {
		r.push(`You shudder at the cool touch of the sensor running along the curve of your sensitive pregnancy. While you've devised a way to scan the distant peak of your navel and the depths of your underbelly, you failed to take into account just how excited your`);
		if (PC.pregType > 1) {
			r.push(`children`);
		} else {
			r.push(`child`);
		}
		r.push(`would get over the attention. Every pass is a battle against your kicking brood.`);
	} else if (PC.belly >= 90000) {
		r.push(`You shudder at the cool touch of the sensor running along the curve of your pregnancy. It takes some stretching, but you can just barely scan yourself without assistance. If you grow much larger, you'll have to call in help for those places that elude your reach.`);
	} else if (PC.belly >= 45000) {
		r.push(`You shudder at the cool touch of the sensor running along the curve of your pregnancy. It's quite a tiring endeavor to scan the entire thing, given just how far it extends from your body.`);
	} else if (PC.belly >= 14000) {
		r.push(`You shudder at the cool touch of the sensor running along the curve of your pregnancy. It takes some effort to scan the entire thing, given how large it has grown.`);
	} else if (PC.belly >= 5000) {
		r.push(`You shudder at the cool touch of the sensor running along the curve of your pregnancy.`);
	} else if (PC.belly >= 1500) {
		r.push(`You shudder at the cool touch of the sensor running along the curve of your growing pregnancy.`);
	} else if (PC.belly >= 500) {
		r.push(`You shudder at the cool touch of the sensor running along the curve of your early pregnancy.`);
	} else if (PC.belly >= 100) {
		r.push(`You shudder at the cool touch of the sensor against the slight swell of your lower belly.`);
	} else if (PC.belly < 100) {
		r.push(`You shudder slightly at the cool touch of the sensor against your skin.`);
	}

	return r.join(" ");
};
