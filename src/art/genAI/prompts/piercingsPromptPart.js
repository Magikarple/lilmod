App.Art.GenAI.PiercingsPromptPart = class PiercingsPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		const isFuckdoll = asSlave(this.slave)?.fuckdoll !== 0;

		let piercingParts = [];
		if (this.slave.piercing.areola.weight > 0) {
			if (!isFuckdoll || this.slave.race === "catgirl") { // TODO: needs exposure check
				let desc = this.slave.piercing.areola.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.areola.desc) + ` `) : ``;
				piercingParts.push(`${desc}areola piercing`);
			}
		}
		if (this.slave.piercing.ear.weight > 0) {
			if (!isFuckdoll || this.slave.race === "catgirl") { // covered by fuckdoll mask or fur
				let desc = this.slave.piercing.ear.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.ear.desc) + ` `) : ``;
				piercingParts.push(`${desc}earrings`);
			}
		}
		if (this.slave.piercing.eyebrow.weight > 0) {
			if (!isFuckdoll || this.slave.race === "catgirl") { // covered by fuckdoll mask or fur
				let desc = this.slave.piercing.eyebrow.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.eyebrow.desc) + ` `) : ``;
				piercingParts.push(`${desc}eyebrow piercing`);
			}
		}
		if (this.slave.piercing.lips.weight > 0) {
			let desc = this.slave.piercing.lips.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.lips.desc) + ` `) : ``;
			piercingParts.push(`${desc}lip piercing`);
		}
		if (this.slave.piercing.navel.weight > 0) {
			if (!isFuckdoll || this.slave.race === "catgirl") { // covered by fuckdoll suit or fur
				let desc = this.slave.piercing.navel.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.navel.desc) + ` `) : ``;
				piercingParts.push(`${desc}navel piercing`);
			}
		}
		if (this.slave.piercing.nipple.weight > 0) {
			if (!isFuckdoll) { // TODO: needs exposure check
				let desc = this.slave.piercing.nipple.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.nipple.desc) + ` `) : ``;
				piercingParts.push(`${desc}nipple piercing`);
			}
		}
		if (this.slave.piercing.nose.weight > 0) {
			if (!isFuckdoll || this.slave.race === "catgirl") { // covered by fuckdoll mask or fur
				let desc = this.slave.piercing.nose.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.nose.desc) + ` `) : ``;
				piercingParts.push(`${desc}nose piercing`);
			}
		}
		if (this.slave.piercing.tongue.weight > 0) {
			let desc = this.slave.piercing.tongue.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.tongue.desc) + ` `) : ``;
			piercingParts.push(`${desc}tongue piercing`);
		}
		if (this.slave.piercing.vagina.weight > 0 && this.slave.dick <= 0) {
			let desc = this.slave.piercing.vagina.desc ? (pronounsForSlaveProp(this.slave, this.slave.piercing.vagina.desc) + ` `) : ``;
			piercingParts.push(`${desc}labia piercing`);
		}

		if (piercingParts.length > 0) {
			return piercingParts.join(`, `);
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.piercing.areola.weight === 0 && this.slave.piercing.ear.weight === 0 && this.slave.piercing.eyebrow.weight === 0 && this.slave.piercing.genitals.weight === 0 && this.slave.piercing.lips.weight === 0 && this.slave.piercing.navel.weight === 0 && this.slave.piercing.nipple.weight === 0 && this.slave.piercing.nose.weight === 0 && this.slave.piercing.tongue.weight === 0 && this.slave.piercing.vagina.weight === 0) {
			return `piercings`;
		}
	}
};
