// A new array is added to store the name and types of new drugs. Mods would add new objects to this array.
App.Mods.Drugs.list = [];
// See mods/custom drugs.md for documentation

// An optional function to act as the middle man between the user and App.Mods.Drugs.list, to add optional parameters and for potential future compatibility purposes.
App.Mods.Drugs.add = function(...drugs) {
	drugs.forEach(drug => {
		drug.isSlaveDrug ??= true;
		drug.isPCDrug ??= false;
		drug.isConsumerGrade ??= false;
		App.Mods.Drugs.list.push(drug);
	});
};
