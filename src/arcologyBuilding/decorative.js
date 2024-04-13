App.Arcology.Cell.Decorative = class extends App.Arcology.Cell.BaseCell {
	/**
	 * @param {object} params
	 * @param {number} [params.width] in cells
	 * @param {number} [params.xOffset=0] in %
	 * @param {number} [params.yOffset=0] in px
	 * @param {number} [params.rotation=0] in deg
	 * @param {number} [params.cellHeight=0] in px, if default height is not enough to stop stuff going offscreen
	 * @param {number} [params.absoluteWidth=0] 0/1, if width and xOffset should be read as absolute pixels
	 */
	constructor({width = 1, xOffset = 0, yOffset = 0, rotation = 0, cellHeight = 0, absoluteWidth = 0} = {}) {
		super(1);
		this._width = width;
		this._xOffset = xOffset;
		this._yOffset = yOffset;
		this._rotation = rotation;
		this._cellHeight = cellHeight;
		this._absoluteWidth = absoluteWidth;
	}

	get width() {
		return this._absoluteWidth ? 0 : this._width;
	}

	renderCell(path, width) {
		const outerCell = document.createElement("div");
		outerCell.style.width = `${width * this.width}%`;

		if (this._cellHeight > 0) {
			outerCell.style.height = `${this._cellHeight}px`;
		}

		const innerCell = document.createElement("div");
		innerCell.classList.add("decorative");
		if (this._absoluteWidth) {
			innerCell.style.width = `${this._width}px`;
		}
		innerCell.style.transform = `translate(${this._xOffset}${this._absoluteWidth ? "px" : "%"}, ${this._yOffset}px) rotate(${this._rotation}deg)`;
		outerCell.append(innerCell);

		return outerCell;
	}

	get className() { return "App.Arcology.Cell.Decorative"; }

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Cell.Decorative())._init(this);
	}
};
