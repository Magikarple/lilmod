/**
 * @returns {string}
 */

globalThis.getProstheticsStockpile = function() {
	return `<div>Prosthetics interfaces: ${num(V.prosthetics.interfaceP1.amount + V.prosthetics.interfaceP2.amount + V.prosthetics.interfaceP3.amount)}</div>` +
		`<div class="choices">Basic: ${V.prosthetics.interfaceP1.amount}</div>` +
		`<div class="choices">Advanced: ${V.prosthetics.interfaceP2.amount}</div>` +
		`<div class="choices">Quadruped: ${V.prosthetics.interfaceP3.amount}</div>` +
		`<div>Limbs: ${num(V.prosthetics.basicL.amount + V.prosthetics.sexL.amount + V.prosthetics.beautyL.amount +
			V.prosthetics.combatL.amount + V.prosthetics.cyberneticL.amount + V.prosthetics.felidaeL.amount + V.prosthetics.canidaeL.amount + V.prosthetics.felidaeCL.amount + V.prosthetics.canidaeCL.amount)}</div>` +
		`<div class="choices">Basic: ${V.prosthetics.basicL.amount}</div>` +
		`<div class="choices">Sex: ${V.prosthetics.sexL.amount}</div>` +
		`<div class="choices">Beauty: ${V.prosthetics.beautyL.amount}</div>` +
		`<div class="choices">Combat: ${V.prosthetics.combatL.amount}</div>` +
		`<div class="choices">Cybernetic: ${V.prosthetics.cyberneticL.amount}</div>` +
		`<div class="choices">Feline: ${V.prosthetics.felidaeL.amount}</div>` +
		`<div class="choices">Canine: ${V.prosthetics.canidaeL.amount}</div>` +
		`<div class="choices">Feline Combat: ${V.prosthetics.felidaeCL.amount}</div>` +
		`<div class="choices">Canine Combat: ${V.prosthetics.canidaeCL.amount}</div>` +
		`<div>Implants: ${num(V.prosthetics.ocular.amount + V.prosthetics.cochlear.amount + V.prosthetics.electrolarynx.amount)}</div>` +
		`<div class="choices">Ocular: ${V.prosthetics.ocular.amount}</div>` +
		`<div class="choices">Cochlear: ${V.prosthetics.cochlear.amount}</div>` +
		/* `<div class="choices">Erectile: ${V.prosthetics.erectile.amount}</div>` + */
		`<div class="choices">Electrolarynx: ${V.prosthetics.electrolarynx.amount}</div>` +
		`<div>Tail interface: ${V.prosthetics.interfaceTail.amount}</div>` +
		`<div>Tails: ${num(V.prosthetics.modT.amount + V.prosthetics.sexT.amount + V.prosthetics.combatT.amount + V.prosthetics.combatT2.amount)}</div>` +
		`<div class="choices">Modular: ${V.prosthetics.modT.amount}</div>` +
		`<div class="choices">Pleasure: ${V.prosthetics.sexT.amount}</div>` +
		`<div class="choices">Combat: ${V.prosthetics.combatT.amount}</div>` +
		`<div class="choices">Combat Tail, "Stinger": ${V.prosthetics.combatT2.amount}</div>` +
		`<div>Back interface: ${V.prosthetics.interfaceBack.amount}</div>` +
		`<div>Appendages: ${num(V.prosthetics.modW.amount + V.prosthetics.flightW.amount + V.prosthetics.sexA.amount + V.prosthetics.combatW.amount + V.prosthetics.combatA1.amount + V.prosthetics.combatA2.amount)}</div>` +
		`<div class="choices">Modular Wings: ${V.prosthetics.modW.amount}</div>` +
		`<div class="choices">Aerial Wings: ${V.prosthetics.flightW.amount}</div>` +
		`<div class="choices">Pleasure Appendages: ${V.prosthetics.sexA.amount}</div>` +
		`<div class="choices">Combat Wings, "Falcon": ${V.prosthetics.combatW.amount}</div>` +
		`<div class="choices">Combat Appendages, "Arachnid": ${V.prosthetics.combatA1.amount}</div>` +
		`<div class="choices">Combat Appendages, "Kraken": ${V.prosthetics.combatA2.amount}</div>`;
};
