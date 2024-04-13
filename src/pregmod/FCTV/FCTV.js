/*
receiver - What is the state of the network box.
	-1: PC has not been given a welcome packet. (default)
	0: PC has been given a welcome packet but has not installed it.
	1+: box is installed.
channel[numberAsString] - how many times it has been viewed.
channel.last - program viewed last week.
pcViewership.count - How many weeks since the PC last watched FCTV.
pcViewership.frequency - How often should the PC watch FCTV.
	-1: Never.
	1: at least once a week.
	2: least every two weeks.
	4: at least once a month. (default)
remote - Does the PC have a FCTV branded remote (also used to trigger a slave acquisition event).
weekEnabled - The week FCTV was installed.
*/
globalThis.FCTV = (function() {
	return {
		channels: channels,
		initChannels: initChannels,
		channelCount: channelCount,
		FinalTouches: FinalTouches,
	};

	/** Produce an array of numbers representing all available channels in App.Data.FCTV.channels
	 * @returns {number[]}
	 */
	function channels() {
		return [...App.Data.FCTV.channels.keys()];
	}

	/**
	 * Initializes the V.FCTV.channel array
	 */
	function initChannels() {
		const channelList = FCTV.channels();
		for (let i = 0; i < channelList.length; i++) {
			V.FCTV.channel[num(channelList[i], true)] = 0;
		}
	}

	/**
	 * checks value of selected channel in relation to an arbitrary number. Have we watched it more/less/same than i.
	 * @param {number} selectedChannel
	 * @param {number} i
	 * @param {string} operation eq/gt/lt: equals/greater than/less than.
	 * @returns {boolean}
	 */
	function channelCount(selectedChannel, i, operation = 'eq') {
		if (operation === 'eq') {
			if (V.FCTV.channel[num(selectedChannel, true)] === i) {
				return true;
			}
		} else if (operation === 'gt') {
			if (V.FCTV.channel[num(selectedChannel, true)] > i) {
				return true;
			}
		} else if (operation === 'lt') {
			if (V.FCTV.channel[num(selectedChannel, true)] < i) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Applies some universal changes to FCTV slaves
	 * @param {App.Entity.SlaveState} slave
	 * @returns {App.Entity.SlaveState}
	 */
	function FinalTouches(slave) {
		slave.pubertyXX = 1;
		slave.career = "a slave";
		slave.origin = "You purchased $him from FCTV's Home Slave Shopping stream channel.";
		setHealth(slave, 80, 0, 0, 0, 0);
		return slave;
	}
})();
