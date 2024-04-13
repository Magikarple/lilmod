
// @ts-nocheck
App.Update.FCTV = function() {
	function convert(a, b) {
		return V.FCTVreceiver ? a : b;
	}

	/**
	 * Modifying the V.FCTV.channel array for backwards compatibility
	 */
	function initChannels() {
		const channelList = FCTV.channels();
		for (let i = 0; i < channelList.length; i++) {
			const channel = num(channelList[i], true);
			const currentChannel = 'show' + capFirstChar(channel);
			V.FCTV.channel[channel] = convert(V[currentChannel], V.FCTV.channel[channel]) || 0;
		}
	}

	V.FCTV = V.FCTV || {};
	V.FCTV.receiver = V.FCTV.receiver > -1 ? V.FCTV.receiver : -1;
	if (convert && V.receiverAvailable) {
		V.FCTV.receiver = V.FCTVreceiver > 0 ? V.FCTVreceiver : 0;
	}
	V.FCTV.pcViewership = V.FCTV.pcViewership || {};
	V.FCTV.channel = V.FCTV.channel || {};
	initChannels();
	V.FCTV.channel.last = convert(V.lastShow, V.FCTV.channel.last) || -1;

	V.FCTV.pcViewership.count = convert(V.FCTVcount, V.FCTV.pcViewership.count) || 0;
	V.FCTV.pcViewership.frequency = convert(V.FCTVrate, V.FCTV.pcViewership.frequency) || 4;
	V.FCTV.remote = convert(V.FCTVremote, V.FCTV.remote) || 0;

	if (V.FCTVreceiver && !V.FCTV.weekEnabled) {
		V.FCTV.weekEnabled = V.receiverAvailable > 1 ? V.receiverAvailable : 0;
	}

	if (V.FCTV.channel.hasOwnProperty("selected")) {
		delete V.FCTV.channel.selected;
	}
};
