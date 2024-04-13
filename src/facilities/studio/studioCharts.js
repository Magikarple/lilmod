/** Make a bar chart showing the slave's progress towards the next/previous level of porn fame in her chosen genre.
 * @param {App.Entity.SlaveState} slave
 */
App.Porn.makeFameProgressChart = function(slave) {
	const container = document.createElement("div");
	const genre = App.Porn.getGenreByFameName(slave.porn.fameType);
	const fameVal = slave.porn.prestige > 0 ? slave.porn.fame[genre.fameVar] : slave.porn.viewerCount;

	if (slave.porn.prestige === 3) {
		container.append("Worldwide fame reached.");
	} else {
		if (slave.porn.prestige === 0) {
			container.append(App.UI.DOM.makeElement("div", `Fame progress (total viewership):`));
		} else {
			container.append(App.UI.DOM.makeElement("div", `Fame progress (in ${genre.fameName} porn): `));
		}
		// ranges
		let bottomThreshold = 0;
		let nextThreshold = 100000;
		if (slave.porn.prestige === 2) {
			bottomThreshold = 40000;
			nextThreshold = V.pornStars[genre.fameVar].p3ID === 0 ? 150000 : 0;
		} else if (slave.porn.prestige === 1) {
			bottomThreshold = 5000;
			nextThreshold = 50000;
		}
		const maxVal = (nextThreshold ? nextThreshold : 150000) * 1.1;
		const curVal = Math.min(fameVal, nextThreshold * 1.1);

		// container
		const margin = {
			top: 10, right: 30, bottom: 30, left: 90
		};
		const width = 600 - margin.left - margin.right;
		const height = 60 - margin.top - margin.bottom;
		/* eslint-disable indent */
		const svg = d3.select(container)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

		// X axis
		const x = d3.scaleLinear()
			.domain([0, maxVal])
			.range([0, width]);
		svg.append("g")
				.attr("transform", `translate(0, ${height})`)
				.call(d3.axisBottom(x))
			.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end");

		// Y axis (invisible)
		const y = d3.scaleBand()
			.range([ 0, height ])
			.domain([""]);

		// Bar
		svg.selectAll("myRect")
			.data([curVal])
			.join("rect")
				.attr("x", x(0))
				.attr("y", y(""))
				.attr("width", d => x(d))
				.attr("height", y.bandwidth())
				.attr("fill", "var(--link-color)");

		// downgrade threshold
		if (bottomThreshold > 0) {
			svg.append("line")
				.attr("x1", x(bottomThreshold))
				.attr("x2", x(bottomThreshold))
				.attr("y1", 0)
				.attr("y2", height)
				.attr("stroke-width", 2)
				.attr("stroke", "red");
		}

		// upgrade threshold
		if (nextThreshold > 0) {
			svg.append("line")
				.attr("x1", x(nextThreshold))
				.attr("x2", x(nextThreshold))
				.attr("y1", 0)
				.attr("y2", height)
				.attr("stroke-width", 2)
				.attr("stroke", "green");
		}
		/* eslint-enable */
	}

	if (slave.porn.prestige === 2 && V.pornStars[genre.fameVar].p3ID !== 0) {
		container.append(App.UI.DOM.makeElement("div", "You already have another slave with worldwide fame in this genre.", ["note"]));
	}
	return container;
};

/** Make a treemap chart showing the slave's current viewership distribution among the porn genres.
 * @param {App.Entity.SlaveState} slave
 */
App.Porn.makeViewershipChart = function(slave) {
	const container = document.createElement("div");

	const data = {name: "Total viewership", children: [], value:0};
	for (const type of Object.values(App.Porn.GenreType)) {
		const child = {name: type, children: []};
		for (const genre of App.Porn.getGenresByType(type)) {
			if (slave.porn.fame[genre.fameVar] > 0) {
				child.children.push({name: genre.fameName, value: Math.trunc(slave.porn.fame[genre.fameVar]), type: type.name});
			}
		}
		if (child.children.length > 0) {
			data.children.push(child);
		}
	}
	const root = d3.hierarchy(data)
		.sum(d => +d.value)
		.sort((a, b) => d3.descending(a.value, b.value));

	// container size
	const margin = {
		top: 10, right: 10, bottom: 10, left: 10
	};
	const width = 600 - margin.left - margin.right;
	const height = 200 - margin.top - margin.bottom;

	// treemap construction
	const layout = d3.treemap()
		.size([width - margin.left - margin.right, height - margin.top - margin.bottom])
		.padding(1)(root);

	/* eslint-disable indent */
	const svg = d3.select(container)
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// rectangles
	svg.selectAll("rect")
		.data(layout.leaves())
		.join("rect")
			.attr('x', d => d.x0)
			.attr('y', d => d.y0)
			.attr('width', d => d.x1 - d.x0)
			.attr('height', d => d.y1 - d.y0)
			.style("fill", d => `var(--genre-color-${d.data.type})`)
			.attr("data-tippy-content", d => `${d.data.name} (${d.data.value})`)
	// @ts-ignore - can't specify generic arguments from JS, but the right one will be picked
		.call(x => tippy(x.nodes()));

	// text labels
	svg.selectAll("text")
		.data(layout.leaves())
		.join("text")
			.attr("x", d => d.x0 + 5)
			.attr("y", d => d.y0 + 15)
			.text(d => d.data.name)
			.attr("font-size", "15px")
			.attr("fill", "black");
	/* eslint-enable */

	return container;
};
