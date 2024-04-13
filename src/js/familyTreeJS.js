/* eslint-disable camelcase */
// cSpell:ignore ltype, dkeys, mkeys, ssym, ftree

/**
 * @param {FC.HumanState[]} slaves
 * @param {number} filterID
 * @returns {Element}
 */
globalThis.renderFamilyTree = function(slaves, filterID) {
	'use strict';

	const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const svg = d3.select(svgNode);

	const data = buildFamilyTree(slaves, filterID);

	const ftreeWidth = Math.clamp(data.nodes.length * 45, 600, 1920);
	const ftreeHeight = Math.clamp(data.nodes.length * 35, 480, 1200);

	initFtreeSVG();
	runFtreeSim(data);

	return svgNode;

	function initFtreeSVG() {
		svg.attr('width', ftreeWidth).attr('height', ftreeHeight);

		svg.append('defs').append('marker')
			.attr('id', 'arrowhead')
			.attr('viewBox', '-0 -5 10 10')
			.attr('refX', 13)
			.attr('refY', 0)
			.attr('orient', 'auto')
			.attr('markerWidth', 13)
			.attr('markerHeight', 13)
			.append('svg:path')
			.attr('d', 'M 0,-1 L 5,0 L 0,1')
			.attr('fill', '#a1a1a1')
			.style('stroke', 'none');
	}

	function runFtreeSim(data) {
		let simulation = d3.forceSimulation()
			.force('collide', d3.forceCollide(60).iterations(4))
			.force('charge', d3.forceManyBody().strength(-200).distanceMin(100).distanceMax(1000))
			.force('center', d3.forceCenter(ftreeWidth / 2, ftreeHeight / 2))
			.force('y', d3.forceY(100))
			.force('x', d3.forceX(200));

		let link = svg.append('g')
			.attr('class', 'link')
			.selectAll('link')
			.data(data.links)
			.enter()
			.append('line')
			.attr('marker-end', 'url(#arrowhead)')
			.attr('stroke', function(d) {
				if (d.type === 'homologous') {
					return '#862d59';
				} else if (d.type === 'paternal') {
					return '#24478f';
				} else {
					return '#aa909b';
				}
			})
			.attr('stroke-width', 2)
			.attr('fill', 'none');

		let node = svg.selectAll('.node')
			.data(data.nodes)
			.enter().append('g')
			.attr('class', 'node')
			.call(d3.drag()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended));

		node.append('circle')
			.attr('stroke', function(d) {
				if (d.ID === filterID) {
					return '#ffff20';
				} else {
					return '#5a5a5a';
				}
			})
			.attr('class', 'node-circle')
			.attr('r', 20);

		node.append('text')
			.text(function(d) {
				let ssym;
				if (d.dick > 0 && d.vagina > -1) {
					ssym = '☿';
				} else if (d.dick > 0) {
					ssym = '♂';
				} else if (d.vagina > -1) {
					ssym = '♀';
				} else {
					ssym = '?';
				}
				return `${d.name}(${ssym})`;
			})
			.attr('dy', 4)
			.attr('dx', function(d) {
				return -(8 * d.name.length) / 2;
			})
			.attr('class', 'node-text')
			.style('fill', function(d) {
				if (d.is_mother && d.is_father) {
					return '#b84dff';
				} else if (d.is_father) {
					return '#00ffff';
				} else if (d.is_mother) {
					return '#ff3399';
				} else if (d.unborn) {
					return '#a3a3c2';
				} else {
					return '#66cc66';
				}
			});

		let ticked = function() {
			link
				.attr('x1', function(d) { return d.source.x; })
				.attr('y1', function(d) { return d.source.y; })
				.attr('x2', function(d) { return d.target.x; })
				.attr('y2', function(d) { return d.target.y; });

			node
				.attr("transform", function(d) { return `translate(${d.x}, ${d.y})`; });
		};

		simulation.nodes(data.nodes)
			.on('tick', ticked);

		simulation.force('link', d3.forceLink().links(data.links));

		function dragstarted(event, d) {
			if (!event.active) { simulation.alphaTarget(0.3).restart(); }
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(event, d) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event, d) {
			if (!event.active) { simulation.alphaTarget(0); }
			d.fx = null;
			d.fy = null;
		}
	}
};

/**
 * @param {FC.HumanState[]} slaves
 * @param {number} filterID
 */
globalThis.buildFamilyTree = function(slaves, filterID) {
	let family_graph = {nodes: [], links: []};
	let node_lookup = {};
	let preset_lookup = {
		'-2': 'A citizen',
		'-3': 'Former Master',
		'-4': 'An arcology owner',
		'-5': 'Client',
		'-6': 'Social Elite',
		'-7': 'Gene lab'
	};
	/** @type {Record<string, Array<string>>} */
	let outdads = {};
	/** @type {Record<string, Array<string>>} */
	let outmoms = {};
	let kids = {};

	const realPC = slaves.deleteWith(s => s.ID === -1).first() || V.PC;
	let fake_pc = {
		slaveName: `${realPC.slaveName}(You)`,
		mother: realPC.mother,
		father: realPC.father,
		dick: realPC.dick,
		vagina: realPC.vagina,
		ID: realPC.ID
	};
	let charList = [fake_pc].concat(slaves).concat(V.incubator.tanks);

	let unborn = {};
	for (const child of V.incubator.tanks) {
		unborn[child.ID] = true;
	}
	for (const child of V.cribs) {
		unborn[child.ID] = true;
	}

	for (const character of charList) {
		let mom = character.mother;
		let dad = character.father;

		if (mom) {
			if (!kids[mom]) {
				kids[mom] = {};
			}
			kids[mom].mother = true;
		}
		if (dad) {
			if (!kids[dad]) {
				kids[dad] = {};
			}
			kids[dad].father = true;
		}
	}

	const haveChar = (ID) => charList.includes(c => c.ID === ID);
	for (const character of charList) {
		if (character.mother === 0 && character.father === 0 && !kids[character.ID]) {
			continue;
		}
		let mom = character.mother;
		if (mom < -6) {
			if (mom in V.missingTable && V.showMissingSlaves && !haveChar(mom)) {
				const missing = V.missingTable[mom];
				charList.push({
					ID: mom,
					mother: missing.mother,
					father: missing.father,
					is_mother: true,
					dick: missing.dick,
					vagina: missing.vagina,
					slaveName: missing.slaveName
				});
			} else {
				if (typeof outmoms[mom] === 'undefined') {
					outmoms[mom] = [];
				}
				outmoms[mom].push(character.slaveName);
			}
		} else if (mom < 0 && typeof preset_lookup[mom] !== 'undefined' && !haveChar(mom)) {
			charList.push({
				ID: mom,
				mother: 0,
				father: 0,
				is_father: true,
				dick: 0,
				vagina: 1,
				slaveName: preset_lookup[mom]
			});
		}

		let dad = character.father;
		if (dad < -6) {
			if (dad in V.missingTable && V.showMissingSlaves && !haveChar(dad)) {
				const missing = V.missingTable[dad];
				charList.push({
					ID: dad,
					mother: missing.mother,
					father: missing.father,
					is_father: true,
					dick: missing.dick,
					vagina: missing.vagina,
					slaveName: missing.slaveName
				});
			} else {
				if (typeof outdads[dad] === 'undefined') {
					outdads[dad] = [];
				}
				outdads[dad].push(character.slaveName);
			}
		} else if (dad < 0 && typeof preset_lookup[dad] !== 'undefined' && !haveChar(dad)) {
			charList.push({
				ID: dad,
				mother: 0,
				father: 0,
				is_father: true,
				dick: 1,
				vagina: -1,
				slaveName: preset_lookup[dad]
			});
		}
	}
	let mkeys = Object.keys(outmoms);
	for (const key of mkeys) {
		let name;
		let names = outmoms[key];
		if (names.length === 1) {
			name = names[0];
		} else if (names.length === 2) {
			name = names.join(' and ');
		} else {
			names[-1] = `and ${names[-1]}`;
			name = names.join(', ');
		}
		// Outside extant slaves set
		charList.push({
			ID: key,
			mother: 0,
			father: 0,
			is_mother: true,
			dick: 0,
			vagina: 1,
			slaveName: `${name}'s mother`
		});
	}

	let dkeys = Object.keys(outdads);
	for (const key of dkeys) {
		let name;
		let names = outdads[key];
		if (names.length === 1) {
			name = names[0];
		} else if (names.length === 2) {
			name = names.join(' and ');
		} else {
			names[-1] = `and ${names[-1]}`;
			name = names.join(', ');
		}
		// Outside extant slaves set
		charList.push({
			ID: key,
			mother: 0,
			father: 0,
			is_father: true,
			dick: 1,
			vagina: -1,
			slaveName: `${name}'s father`
		});
	}

	let charHash = {};
	for (const character of charList) {
		charHash[character.ID] = character;
	}

	let related = {};
	let seen = {};
	let saveTree = {};

	function relatedTo(character, targetID, relIDs = {tree: {}, related: false}) {
		relIDs.tree[character.ID] = true;
		if (related[character.ID]) {
			relIDs.related = true;
			return relIDs;
		}
		if (character.ID === targetID) {
			relIDs.related = true;
		}
		if (seen[character.ID]) {
			return relIDs;
		}
		seen[character.ID] = true;
		if (character.mother !== 0) {
			if (charHash[character.mother]) {
				relatedTo(charHash[character.mother], targetID, relIDs);
			}
		}
		if (character.father !== 0) {
			if (charHash[character.father]) {
				relatedTo(charHash[character.father], targetID, relIDs);
			}
		}
		return relIDs;
	}
	if (filterID) {
		if (charHash[filterID]) {
			let relIDs = relatedTo(charHash[filterID], filterID);
			for (let k in relIDs.tree) {
				related[k] = true;
			}
			for (const character of charList) {
				let pRelIDs = relatedTo(character, filterID);
				if (pRelIDs.related) {
					for (let k in pRelIDs.tree) {
						related[k] = true;
						if (saveTree[k]) {
							for (let k2 in saveTree[k].tree) {
								related[k2] = true;
							}
						}
					}
				}
				saveTree[character.ID] = pRelIDs;
			}
		}
	}

	for (const character of charList) {
		let char_id = character.ID;
		if (char_id !== filterID) {
			if (character.mother === 0 && character.father === 0 && !kids[char_id]) {
				continue;
			}
			if (filterID && !related[char_id]) {
				continue;
			}
		}
		node_lookup[char_id] = family_graph.nodes.length;
		let char_obj = {
			ID: char_id,
			name: character.slaveName,
			dick: character.dick,
			unborn: !!unborn[char_id],
			vagina: character.vagina
		};
		if (kids[char_id]) {
			char_obj.is_mother = !!kids[char_id].mother;
			char_obj.is_father = !!kids[char_id].father;
		} else {
			char_obj.is_mother = false;
			char_obj.is_father = false;
		}
		family_graph.nodes.push(char_obj);
	}

	for (const character of charList) {
		let char_id = character.ID;
		if (character.mother === 0 && character.father === 0 && !kids[char_id]) {
			continue;
		}
		if (filterID && !related[char_id]) {
			continue;
		}
		if (typeof node_lookup[character.mother] !== 'undefined') {
			const ltype = (character.mother === character.father) ? 'homologous' : 'maternal';
			family_graph.links.push({
				type: ltype,
				target: node_lookup[char_id] * 1,
				source: node_lookup[character.mother] * 1
			});
		}
		if (character.mother === character.father) {
			continue;
		}
		if (typeof node_lookup[character.father] !== 'undefined') {
			family_graph.links.push({type: 'paternal', target: node_lookup[char_id] * 1, source: node_lookup[character.father] * 1});
		}
	}
	return family_graph;
};
