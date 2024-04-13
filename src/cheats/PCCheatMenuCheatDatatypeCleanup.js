App.UI.Cheat.PCCheatMenuCheatDatatypeCleanup = function() {
	delete V.backupSlave;

	App.Entity.Utils.PCCheatCleanup();

	return App.Events.makeNode([`You perform the dark rituals, pray to the dark gods, and sell your soul for the power to reshape your body and life at will. What a cheater!`]);
};
