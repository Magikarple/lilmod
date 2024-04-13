App.Medicine.Surgery.Reactions.GeneTreatment = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The procedure spans the week, with ${him} spending every other day in the surgery room for a series of 4 sets of injections. A few hours after each session, ${he} feels terribly ill. ${He} doesn't quite understand what it's about, just that ${he} feels pretty bad. The process involves`);
		if (V.PC.skill.medicine >= 100) {
			r.push(`you`);
		} else {
			r.push(`the remote surgeon`);
		}
		r.push(`injecting the serum across ${his} entire body, every few`);
		if (V.showInches === 2) {
			r.push(`inches,`);
		} else {
			r.push(`centimeters,`);
		}
		r.push(`leaving small needle marks that fade out within minutes. Despite not leaving a lasting evidence, the process is very invasive work, and leaves ${him} <span class="health dec">feeling weak and tired.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.ElasticityTreatment = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Increased elasticity treatment";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `this will alter ${his} genetic code to encourage ${his} body to stretch`;
	}

	get _workCost() {
		return super._workCost * 4;
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.geneMods.rapidCellGrowth = 1;
		this._slave.chem += 100;
		return this._assemble(new App.Medicine.Surgery.Reactions.GeneTreatment());
	}
};

App.Medicine.Surgery.Procedures.ImmortalityTreatment = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Immortality";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `this will alter ${his} genetic code to reverse and prevent aging, effectively thwarting the rigors of old age`;
	}

	get _workCost() {
		return super._workCost * 4;
	}

	get healthCost() {
		return 40;
	}

	get note() {
		return App.UI.DOM.makeElement("span", `Post operation, high levels of DNA toxicity may be identified within the patient. Placement within a modern and staffed Clinic is highly recommended.`, ["warning"]);
	}

	apply(cheat) {
		this._slave.geneMods.immortality = 1;
		this._slave.chem += 1000;
		if (V.clinic) {
			assignJob(this.originalSlave, Job.CLINIC);
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.GeneTreatment());
	}
};

App.Medicine.Surgery.Procedures.milkFlavoring = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Bio-engineered milk flavoring";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `this will alter ${his} genetics to allow flavored milk`;
	}

	get cost() {
		return super.cost * 1.5;
	}

	get healthCost() {
		return 15;
	}

	apply(cheat) {
		this._slave.geneMods.flavoring = 1;
		this._slave.milkFlavor = "natural";
		this._slave.chem += 100;
		return this._assemble(new App.Medicine.Surgery.Reactions.GeneTreatment());
	}
};

App.Medicine.Surgery.Procedures.OptimizedSpermTreatment = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Optimized sperm treatment";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `this will alter ${his} genetic code to encourage ${his} body to produce far more aggressive sperm cells`;
	}

	get cost() {
		return super.cost * 4;
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.geneMods.aggressiveSperm = 1;
		this._slave.chem += 100;
		return this._assemble(new App.Medicine.Surgery.Reactions.GeneTreatment());
	}
};

App.Medicine.Surgery.Procedures.EnhancedProductionTreatment = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Enhanced production treatment";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `this will alter ${his} genetic code to encourage ${his} body to produce larger volumes of sellable resources`;
	}

	get cost() {
		return super.cost * 4;
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.geneMods.livestock = 1;
		this._slave.chem += 100;
		return this._assemble(new App.Medicine.Surgery.Reactions.GeneTreatment());
	}
};

App.Medicine.Surgery.Procedures.OptimizedBreedingTreatment = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Optimized breeding treatment";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `this will alter ${his} genetic code to encourage ${his} body to be far more efficient at bearing children`;
	}

	get cost() {
		return super.cost * 4;
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.geneMods.progenitor = 1;
		this._slave.chem += 100;
		return this._assemble(new App.Medicine.Surgery.Reactions.GeneTreatment());
	}
};


App.Medicine.Surgery.Procedures.RemoveGene = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} gene
	 * @param {string} title
	 */
	constructor(slave, gene, title) {
		super(slave);
		this.gene = gene;
		this.title = title;
	}

	get name() {
		return this.title;
	}

	get description() {
		return `Applying a retro-virus treatment radically increases carcinogen buildup`;
	}

	get _workCost() {
		return super._workCost * 4;
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		if (this.gene === "albinism") {
			induceAlbinism(this._slave, 0);
		} else {
			this._slave.geneticQuirks[this.gene] = 0;
		}
		this._slave.chem += 100;
		return this._assemble(new App.Medicine.Surgery.Reactions.GeneTreatment());
	}
};

App.Medicine.Surgery.Procedures.AddGene = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {keyof FC.GeneticQuirks} gene
	 * @param {boolean} [activation=false] Activation or inducement
	 */
	constructor(slave, gene, activation = false) {
		super(slave);
		this.gene = gene;
		this.activation = activation;
		this.geneData = App.Data.geneticQuirks.get(gene);
	}

	get name() {
		if (this.activation) {
			return `${capFirstChar(this.geneData.title)} activation treatment`;
		} else {
			return `Induced ${this.geneData.title} treatment`;
		}
	}

	get description() {
		const r = [];
		if (!this.activation) {
			const {his} = getPronouns(this.originalSlave);
			r.push(`This will induce ${this.geneData.title} in ${his} genetic code.`);
		}
		r.push(`Applying a retro-virus treatment radically increases carcinogen buildup`);
		return r.join(" ");
	}

	get _workCost() {
		return super._workCost * (this.activation ? 4 : 10);
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		if (this.gene === "albinism") {
			induceAlbinism(this._slave, 2);
		} else {
			this._slave.geneticQuirks[this.gene] = 2;
		}
		this._slave.chem += 100;
		return this._assemble(new App.Medicine.Surgery.Reactions.GeneTreatment());
	}
};
