/**
 * @param {App.Entity.SlaveState | App.Entity.PlayerState} slave
 */
globalThis.SetBellySize = function(slave) {
	WombNormalizePreg(slave); /* now with support for legacy code that advances pregnancy by setting .preg++ */

	const implantSize = (slave.bellyImplant > 0) ? slave.bellyImplant : 0;

	if (slave.inflationType !== "undigested food") {
		if (slave.inflation === 3) {
			slave.bellyFluid = 10000;
		} else if (slave.inflation === 2) {
			slave.bellyFluid = 5000;
		} else if (slave.inflation === 1) {
			slave.bellyFluid = 2000;
		} else if (slave.ID !== -1) {
			slave.bellyFluid = 0;
		}
	}

	slave.belly = slave.bellyPreg + slave.bellyFluid + implantSize;
};
