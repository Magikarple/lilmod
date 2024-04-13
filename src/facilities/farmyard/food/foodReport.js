App.UI.foodReport = function() {
	const text = [];

	text.push(
		production(),
		consumption(),
	);

	return text.join(' ');

	function production() {
		const text = [];
		const production = App.Facilities.Farmyard.foodProduction();
		const farmhands = App.Entity.facilities.farmyard.hostedSlaves();
		const slaveAmount = App.Entity.facilities.farmyard.employees()
			.reduce((acc, cur) => acc + App.Facilities.Farmyard.foodAmount(cur), 0);
		const menialAmount = V.farmMenials * App.Facilities.Farmyard.foodAmount();

		text.push(`${V.arcologies[0].name} produced ${massFormat(production)} of food this week.`);

		if (slaveAmount > 0) {
			text.push(`${V.farmMenials ? capFirstChar(massFormat(slaveAmount)) : `All of it`} was produced by your ${num(farmhands)} farmhands`);
		}
		if (menialAmount > 0) {
			text.push(`${slaveAmount > 0 ? text.pop() + `, and ${massFormat(production - slaveAmount)}` : `All of it`} was produced by ${num(V.farmMenials)} menial slaves`);
		}

		text.push(text.pop() + `.`);

		return text.join(' ');
	}

	function consumption() {
		const text = [];
		const production = App.Facilities.Farmyard.foodProduction();
		const consumption = App.Facilities.Farmyard.foodConsumption();
		const deficit = Math.abs(consumption - production);
		const cost = deficit * V.mods.food.cost;
		const storage = V.mods.food.amount;

		if (production > consumption) {
			text.push(`${capFirstChar(massFormat(consumption))} of it was consumed, with a spare ${massFormat(production - consumption)} moved into long-term storage.`);
		} else {
			if (storage > deficit) {
				text.push(`Unfortunately, this wasn't enough to cover needs of your hungry arcology, and ${massFormat(deficit)} had to be brought up from storage.`);
			} else if (V.cash > cost) {
				text.push(`Unfortunately, this wasn't enough to cover needs of your hungry arcology, and because you didn't have enough food in storage, you has to purchase and additional ${massFormat(deficit - storage)} for ${cashFormat()}.`);
			}
		}

		return text.join(' ');
	}
};
