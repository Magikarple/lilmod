globalThis.sortDomObjects = function(objects, attrName, reverse = 0) {
	reverse = (reverse) ? -1 : 1;

	function sortingByAttr(a, b) {
		let aVal = a.getAttribute(attrName);
		let bVal = b.getAttribute(attrName);
		let aInt = parseInt(aVal);
		if (!isNaN(aInt)) {
			return ((parseInt(bVal) - aInt) * reverse);
		} else if (bVal > aVal) {
			return -1 * reverse;
		}
		return ((aVal === bVal) ? 0 : 1) * reverse;
	}

	return objects.toArray().sort(sortingByAttr);
};

globalThis.sortNurseryPossiblesByName = function() {
	let $sortedNurseryPossibles = $('#ql-nursery div.possible').detach();
	$sortedNurseryPossibles = sortDomObjects($sortedNurseryPossibles, 'data-name');
	$($sortedNurseryPossibles).appendTo($('#ql-nursery'));
};

globalThis.sortNurseryPossiblesByPregnancyWeek = function() {
	let $sortedNurseryPossibles = $('#ql-nursery div.possible').detach();
	$sortedNurseryPossibles = sortDomObjects($sortedNurseryPossibles, 'data-preg-week');
	$($sortedNurseryPossibles).appendTo($('#ql-nursery'));
};

globalThis.sortNurseryPossiblesByPregnancyCount = function() {
	let $sortedNurseryPossibles = $('#ql-nursery div.possible').detach();
	$sortedNurseryPossibles = sortDomObjects($sortedNurseryPossibles, 'data-preg-count');
	$($sortedNurseryPossibles).appendTo($('#ql-nursery'));
};

globalThis.sortNurseryPossiblesByReservedSpots = function() {
	let $sortedNurseryPossibles = $('#ql-nursery div.possible').detach();
	$sortedNurseryPossibles = sortDomObjects($sortedNurseryPossibles, 'data-reserved-spots');
	$($sortedNurseryPossibles).appendTo($('#ql-nursery'));
};

globalThis.sortNurseryPossiblesByPreviousSort = function() {
	let sort = V.sortNurseryList;
	if (sort !== 'unsorted') {
		if (sort === 'Name') {
			sortNurseryPossiblesByName();
		} else if (sort === 'Reserved Nursery Spots') {
			sortNurseryPossiblesByReservedSpots();
		} else if (sort === 'Pregnancy Week') {
			sortNurseryPossiblesByPregnancyWeek();
		} else if (sort === 'Number of Children') {
			sortNurseryPossiblesByPregnancyCount();
		}
	}
};
