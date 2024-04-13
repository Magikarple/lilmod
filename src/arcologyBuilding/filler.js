App.Arcology.Cell.Filler = class extends App.Arcology.Cell.BaseCell {
	constructor(width) {
		super(1);
		this._width = width;
	}

	get width() {
		return this._width;
	}

	renderCell(path, width) {
		const outerCell = document.createElement("div");
		outerCell.style.width = `${width * this.width}%`;
		return outerCell;
	}

	get className() { return "App.Arcology.Cell.Filler"; }

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Cell.Filler())._init(this);
	}
};
