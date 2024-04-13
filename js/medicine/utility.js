App.Medicine.pocketVolume = function() {
	/**
	 * @param {FC.HumanState} slave
	 * @returns {number}
	 */
	function boobs(slave) {
		/*
		The breast is approximated by a spherical cap with the volume of slave.boobs.
		The radius `a` of the cap is proportional to slave height and shoulders width
		We assume that the skin has elasticity coefficient that depends on slave physical age.
		Max pocket volume is therefore the volume of the cap with the same base but the
		surface stretched by the skin elasticity coefficient
		V = 1/6*πh(3a²+h²)
		A = π(a²+h²)
		*/
		const a = 0.05 * slave.height + slave.shoulders * 1.1;
		/* now the eq. for V we rewrite as
		h³ + 3a³h -6/π*V = 0
		and replace:
		p = 3*a³, q = -6/π*V:
		h³ + ph + q = 0
		*/
		const p = 3 * a * a;
		const q = -6. / Math.PI * slave.boobs;
		const Q = Math.pow(p / 3, 3) + Math.pow(q / 2, 2);
		console.assert(Q > 0);
		const h = Math.cbrt(-q / 2 + Math.sqrt(Q)) + Math.cbrt(-q / 2 - Math.sqrt(Q));

		// now the current skin area:
		const A = Math.PI * (a * a + h * h);

		const skinStretchFactor = linearInterpolation(Math.clamp(slave.physicalAge, 13, 45), 13, 1.5, 45, 1.15);

		const hMax = Math.sqrt(A * skinStretchFactor / Math.PI - a * a);
		const VMax = Math.PI / 6 * hMax * (3 * a * a + hMax * hMax);

		return VMax;
	}

	/**
	 * @param {FC.HumanState} slave
	 * @returns {number}
	 */
	function butt(slave) {
		return slave.butt + (slave.hips > 0 ? 2 : 1);
	}

	/**
	 * @param {FC.HumanState} slave
	 * @returns {number}
	 */
	function lips(slave) {
		return slave.lips + 10;
	}

	return {
		boobs,
		butt,
		lips
	};
}();

/**
 * @template {FC.SizingImplantTarget} T
 * @param {FC.HumanState} slave
 * @param {T} target
 * @returns {FC.Medicine.ImplantInfo<T>}
 */
App.Medicine.implantInfo = function(slave, target) {
	/**
	 * @template {"boobs"|"butt"} Target
	 * @param {Target} target
	 * @returns {FC.Medicine.ImplantInfo<Target>}
	 */
	function boobsButt(target) {
		return {
			type: slave[`${target}ImplantType`],
			volume: slave[`${target}Implant`]
		};
	}

	switch (target) {
		case "boobs":
		case "butt":
			return /** @type {FC.Medicine.ImplantInfo<T>} */(boobsButt(target));
		case "lips":
			return {
				type: slave.lipsImplant > 0 ? "normal" : "none",
				volume: slave.lipsImplant
			};
	}
};

/**
 * @template {FC.SizingImplantTarget} T
 * @param {T} target
 * @returns {Array<FC.BodyPartImplantTypeMap[T]>}
 */
App.Medicine.implantTypesForTarget = function(target) {
	return Object.keys(App.Data.Medicine.sizingImplants[target]);
};

/**
 * Returns the size of the flesh part of the sizable body part
 *
 * "Flesh" means without implants and without milk in case of boobs
 * @param {FC.HumanState} slave // or genepool objects!
 * @param {FC.SizableBodyPart} part
 * @returns {number}
 */
App.Medicine.fleshSize = function(slave, part) {
	switch (part) {
		case "balls": return slave.balls;
		case "boobs": {
			const milkVolume = isFinite(slave.boobsMilk) ? slave.boobsMilk : 0; // genepool objects don't have boobsMilk
			return slave.boobs - slave.boobsImplant - milkVolume;
		}
		case "butt": return slave.butt - slave.buttImplant;
		case "dick": return slave.dick;
		case "lips": return slave.lips - slave.lipsImplant;
	}
};

/**
 * Returns the size of the flesh part of the sizable body part
 * @param {FC.HumanState} slave
 * @param {FC.SizableBodyPart} part
 * @returns {number}
 */
App.Medicine.assetSize = function(slave, part) {
	return slave[part];
};

/**
 * @param {FC.SizableBodyPart} part
 * @returns {number}
 */
App.Medicine.maxAssetSize = function(part) {
	switch (part) {
		case "balls": return 125;
		case "boobs": return 50000;
		case "butt": return 20;
		case "dick": return 31;
		case "lips": return V.seeExtreme ? 96 : 86;
	}
};
