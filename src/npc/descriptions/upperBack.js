/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.upperBack = function(slave) {
	const r = [];
	const {
		him, he, He, his, His, himself
	} = getPronouns(slave);


	r.push(`On ${his} back,`);

	if (slave.wingsShape === "angel") {
		r.push(`${he} has a pair of ${slave.appendagesColor} angelic wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}. They give ${him} a noble appearance.`);
	} else if (slave.wingsShape === "seraph") {
		r.push(`${he} has three pairs of majestic-looking, ${slave.appendagesColor} angel wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`} and can move simultaneously.`);
	} else if (slave.wingsShape === "demon") {
		r.push(`${he} has a pair of sleek and sexy, ${slave.appendagesColor} demonic wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}. ${He} tends to wrap them around ${himself} when ${he}'s being flirty.`);
	} else if (slave.wingsShape === "dragon") {
		r.push(`${he} has a pair of imposing, ${slave.appendagesColor} draconic wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}; they tend to create a small breeze when ${he} flaps them.`);
	} else if (slave.wingsShape === "phoenix") {
		r.push(`${he} has a pair of magnificent, ${slave.appendagesColor} phoenix wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}; they give off a luminescent glow when shrouded in darkness.`);
	} else if (slave.wingsShape === "bird") {
		r.push(`${he} has a pair of soft ${slave.appendagesColor} feathered wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}.`);
	} else if (slave.wingsShape === "fairy") {
		r.push(`${he} has a pair of dainty and translucent, ${slave.appendagesColor} fairy wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}. They are shaped like leaves and tend to flutter when ${he}'s excited.`);
	} else if (slave.wingsShape === "butterfly") {
		r.push(`${he} has a pair of big and broad, ${slave.appendagesColor} butterfly wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect}`} and have iridescent patterns on them. ${His} wings tend to flutter when excited.`);
	} else if (slave.wingsShape === "moth") {
		r.push(`${he} has a pair of big and soft, ${slave.appendagesColor} moth wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect}`} and have distinct ${slave.patternColor} patterns on them. ${His} wings tend to flutter when excited.`);
	} else if (slave.wingsShape === "insect") {
		r.push(`${he} has a pair of delicate, transparent insect wings that tend to flutter when ${he}'s excited.`);
	} else if (slave.wingsShape === "evil") {
		r.push(`${he} has a pair of ${slave.appendagesColor} fiendish-looking wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}. They have a sinister and unsettling look to them.`);
	} else if (slave.appendages === "falcon") {
		r.push(`${he} has a pair of large, ${slave.appendagesColor} wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}. They're made of advanced synthetic alloys. The wings enable fast aerial movement, swiping at targets with its razor sharp edges and can be used to block projectiles.`);
	} else if (slave.appendages === "arachnid") {
		r.push(`${he} has a set of eight ${slave.appendagesColor} deadly spider legs. The legs are made of an advanced synthetic alloy. Being extremely durable in addition to very light, allows extension to thrice their original length. An built-in AI helps with combat, 3-dimensional maneuvering and appendage coordination.`);
	} else if (slave.appendages === "kraken") {
		r.push(`${he} has a set of eight, ${slave.appendagesColor} tentacles${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}. The tentacles are made of an advanced synthetic alloy. Being extremely durable in addition to very light, allows the tentacles to extend to thrice their original length. An built-in AI helps with combat, 3-dimensional maneuvering and appendage coordination.`);
	} else if (slave.appendages === "sex") {
		r.push(`${he} has a set of eight, ${slave.appendagesColor} pleasure appendages${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}. The lithe appendages all have different-shaped tips with vibration and lube dispensation built-in.`);
	} else if (slave.appendages === "flight") {
		r.push(`${he} has a pair of large, ${slave.appendagesColor} metallic wings${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect} on them`}. Its durable frame, made of advanced materials, is sufficiently lightweight to allow its small thrusters to support flight while being strong enough to sustain structural integrity.`);
	}

	if (slave.PBack === 0 && slave.wingsShape !== "none"){
		r.push(` ${He} was born with them and they are completely natural.`);
	}

	if (slave.fuckdoll > 0){
		r.push(` Since ${he}'s a fuckdoll, the ability to move ${his} wings on ${his} own has been disabled.`);
	}

	return r.join(" ");
};
