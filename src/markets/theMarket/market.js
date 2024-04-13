App.UI.market = function(menialWorkersOnly = null) {
	const span = document.createElement("span");
	span.id = "slave-markets";
	if (!menialWorkersOnly) {
		span.append(App.UI.buySlaves());
		span.append(App.UI.sellSlaves());
	}

	const menialSpan = document.createElement("span");
	menialSpan.id = "menial-span";
	menialSpan.append(App.UI.tradeMenials(menialWorkersOnly));
	span.append(menialSpan);

	if (!menialWorkersOnly) {
		const menialTransactionResult = document.createElement("div");
		menialTransactionResult.id = "menial-transaction-result";
		span.append(menialTransactionResult);
	}

	return span;
};
