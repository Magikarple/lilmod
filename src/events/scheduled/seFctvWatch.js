App.Events.SEfctvWatch = class SEfctvWatch extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.FCTV.receiver > 0,
			() => V.FCTV.pcViewership.frequency !== -1,
			() => V.FCTV.pcViewership.count === 0,
			() => !(V.week > 50 && V.FCTV.remote < 2) // Run remote event instead
		];
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "FCTV";
		const tvDiv = App.UI.DOM.appendNewElement("div", node, watch(false, false, 0));
		tvDiv.id = "fctv-watch";

		/**
		 * @param {boolean} usedRemote
		 * @param {boolean} seeAll
		 * @param {number} selectedChannel
		 * @returns {DocumentFragment}
		 */
		function watch(usedRemote, seeAll, selectedChannel) {
			V.FCTV.pcViewership.count = V.FCTV.pcViewership.frequency;

			const frag = new DocumentFragment();
			const remoteContainer = document.createElement("span");

			let p = document.createElement("p");
			/** @type {DocumentFragment} */
			let showSelectionFrag = null;

			p.append(`Tired after a long day, you tell `);
			if (S.Concubine) {
				p.append(`your concubine `);
				App.UI.DOM.appendNewElement("span", p, S.Concubine.slaveName, ["slave", "name", "simple"]);
			} else {
				p.append(V.assistant.name);
			}
			p.append(` to turn on the TV and `);
			if (!usedRemote) {
				p.append(`set FCTV to find a random show. Your larger-than-life screen flashes on, and is soon playing content from the popular streaming service. `);
				if (V.cheatMode > 0 || (V.debugMode > 0 && V.debugModeEventSelection > 0) || V.FCTV.remote) {
					// Create "Use remote" link. Hide once clicked.
					const span = document.createElement("span");
					span.append(
						App.UI.DOM.link(
							"Use your remote",
							() => {
								usedRemote = true;
								remoteContainer.replaceChildren(createRemote(selectedChannel, seeAll));
								span.replaceChildren();
							}
						)
					);
					p.append(span);
				}
				const {frag, channel} = randomShow(seeAll);
				selectedChannel = channel;
				showSelectionFrag = frag;
			} else if (usedRemote && (V.cheatMode > 0 || (V.debugMode > 0 && V.debugModeEventSelection > 0) || V.FCTV.remote)) {
				p.append(`bring you the remote so you can choose whatever show you find interesting. `);
				if (selectedChannel === V.FCTV.channel.last) {
					App.UI.DOM.appendNewElement("div", p, `You tuned into this channel last week, you may want to choose something else.`);
				}
				if (seeAll) {
					const div = document.createElement("div");
					div.append(`There is an audible tone from your screen, which then displays a message: `);
					App.UI.DOM.appendNewElement("span", div, `Showing all content, for testing purposes.`, ["note"]);
					p.append(div);
				}
			}

			frag.append(p);

			if (usedRemote && (V.cheatMode > 0 || (V.debugMode > 0 && V.debugModeEventSelection > 0) || V.FCTV.remote)) {
				remoteContainer.append(createRemote(selectedChannel, seeAll));
			}
			frag.append(remoteContainer);

			if (showSelectionFrag != null) {
				frag.append(showSelectionFrag);
			}

			if (selectedChannel === -1) {
				return frag; // random show found nothing
			}

			p = document.createElement("p");
			if (usedRemote) {
				p.append(`You select `);
			} else {
				p.append(`It looks like the random function chose `);
			}
			App.UI.DOM.appendNewElement("span", p, `channel number: ${selectedChannel}`, ["bold"]);

			// A little glue to get unique data based stuff to stick.
			if (selectedChannel === 16) {
				p.append(`. `);
			} else {
				p.append(`, `);
				if (selectedChannel === 11 && usedRemote) {
					p.append(`for some foolish reason, `);
				}
			}
			p.append(displayShow(selectedChannel));
			frag.append(p);
			return frag;
		}

		/**
		 * @param {boolean} usedRemote
		 * @param {boolean} seeAll
		 * @param {number} selectedChannel
		 */
		function refresh(usedRemote, seeAll, selectedChannel) {
			tvDiv.replaceChildren(watch(usedRemote, seeAll, selectedChannel));
		}

		/**
		 * Creates a remote control for FCTV
		 * @param {number} selectedChannel
		 * @param {boolean} seeAll
		 * @returns {HTMLParagraphElement}
		 */
		function createRemote(selectedChannel, seeAll) {
			const p = document.createElement("p");
			p.classList.add("fctv-remote");
			const buttons = [];

			const possibleChannels = FCTV.channels();
			for (const i of possibleChannels) {
				if (showChannel(i, seeAll, true).canSelect > 0) {
					if (selectedChannel !== i) { // Channel you can choose
						buttons.push(
							App.UI.DOM.link(
								i.toFixed(0),
								() => {
									refresh(true, seeAll, i);
								}
							)
						);
					} else { // Already shown
						const link = App.UI.DOM.disabledLink(i.toFixed(0), [`Current channel`]);
						link.classList.add("fctv-remote-selected");
						buttons.push(link);
					}
				} else { // Channel you cannot choose
					buttons.push(
						App.UI.DOM.disabledLink(i.toFixed(0), [showChannel(i, seeAll, true).text])
					);
				}
			}

			// 4 is no longer a real channel, so put in a dummy button. 404, channel not found.
			buttons.splice(4, 0, App.UI.DOM.makeElement("span", "4"));

			const div = document.createElement("div");
			div.classList.add("fctv-remote-numbers");
			for (const button of buttons) {
				div.append(button);
			}
			p.append(div);
			App.UI.DOM.appendNewElement("div", p,
				App.UI.DOM.link(
					`Random`,
					() => {
						refresh(false, seeAll, selectedChannel);
					}
				),
				["fctv-remote-button"]
			);
			if (V.debugMode > 0 && V.debugModeEventSelection > 0) {
				App.UI.DOM.appendNewElement("div", p,
					App.UI.DOM.link(
						`Toggle inappropriate`,
						() => {
							seeAll = !seeAll;
							refresh(true, seeAll, selectedChannel);
						}
					),
					["fctv-remote-button"]
				);
			}
			return p;
		}

		/**
		 * @param {boolean} seeAll
		 * @returns {{frag:DocumentFragment, channel:number}}
		 */
		function randomShow(seeAll) {
			const frag = new DocumentFragment();

			const channels = FCTV.channels();
			channels.push(3); // Double chance for slave sale. Replaces old channel 4.

			// Three strikes, then move on
			for (let i = 0; i < 3; i++) {
				// Roll for a channel
				const channel = jsEither(channels);
				// See if we can show it
				const x = showChannel(channel, seeAll, false);
				if (x.canSelect === -1) {
					App.UI.DOM.appendNewElement("p", frag, channelFailed(x.text));
				} else {
					return {frag, channel};
				}
			}

			App.UI.DOM.appendNewElement("p", frag, `It looks like there is simply nothing on FCTV tonight worth watching.`);
			return {frag, channel: -1};
		}

		/**
		 * @param {number} selection
		 * @param {boolean} seeAll
		 * @param {boolean} usedRemote
		 * @returns {{canSelect: number, text: string}}
		 */
		function showChannel(selection, seeAll, usedRemote) {
			let x = {canSelect: 1, text: ""};
			if (seeAll) {
				return x;
			}
			if (App.Data.FCTV.channels.has(selection)) {
				const channel = App.Data.FCTV.channels.get(selection);
				if (channel.hasOwnProperty("tags")) {
					x = checkTags(channel.tags);
				}
				if (channel.hasOwnProperty("disableSelection")) {
					if (usedRemote) {
						x.canSelect = -1;
					}
					x.text = `This channel appears at random times`;
				}
			} else {
				throw Error(`Channel "${selection}" does not exist`);
			}
			if (selection === 11) {
				if (V.purchasedSagBGone && V.FCTV.channel[num(selection, true)] > 2) {
					x.canSelect = -1;
					x.text = `Product purchase detected, skipping commercials`;
				}
			}
			return x;
		}

		/**
		 * Text to frame if content won't work due to tags.
		 * @param {string} text Reason this channel/episode can't be shown
		 * @returns {Node}
		 */
		function channelFailed(text) {
			const frag = new DocumentFragment();
			frag.append(`A notification is shown: `);
			App.UI.DOM.appendNewElement("span", frag, text, ["note"]);
			frag.append(`, changing program.`);
			return frag;
		}

		/**
		 * Displays just the channel itself, including art
		 * @param {number} selectedChannel
		 * @returns {Node}
		 */
		function displayShow(selectedChannel) {
			const frag = new DocumentFragment();

			/** @type {FctvChannel} */
			const channel = App.Data.FCTV.channels.get(selectedChannel);
			const epToShow = getEpisode(selectedChannel);

			// Fail code, so we fail
			if (epToShow === -1) {
				frag.append(`no valid episodes`);
				return frag;
			}

			// Increment the viewing record for this channel
			V.FCTV.channel[num(selectedChannel, true)]++;

			// Slave, if needed. Hosts and market slaves.
			let slave;
			if (channel.episode[epToShow].slaves) {
				slave = channel.episode[epToShow].slaves[0];
				if (!channel.disableSelection) { // Art for the slave market will be shown in longSlave
					App.Events.drawEventArt(frag, channel.episode[epToShow].slaves);
				}
			}
			if (channel.intro) {
				$(frag).append(channel.intro);
			}
			const episodeText = channel.episode[epToShow].text;
			if (episodeText) {
				if (typeof episodeText === 'function') {
					$(frag).wiki(episodeText(slave));
				} else {
					$(frag).wiki(episodeText);
				}
			}
			if (channel.outro) {
				if (typeof channel.outro === 'function') {
					frag.append(channel.outro(slave, epToShow));
				} else {
					frag.append(channel.outro);
				}
			}
			V.FCTV.channel.last = selectedChannel;
			return frag;

			/**
			 * @param {number} selected
			 */
			function getEpisode(selected) {
				let epToShow = -1; // -1 is the fail code.
				const epsArray = [];
				/** @type {FctvChannel} */
				const channel = App.Data.FCTV.channels.get(selected);
				const viewedCount = V.FCTV.channel[num(selected, true)] || 0;

				// Produce an array of episodes we can watch.
				for (let i = 0; i < channel.episode.length; i++) {
					const ep = channel.episode[i];
					if (ep.tags) {
						const x = checkTags(ep.tags);
						if (x.canSelect !== -1) {
							epsArray.push(i);
						}
					} else {
						epsArray.push(i);
					}
				}
				const availableEp = epsArray.length;
				if (epsArray.length === 0) {
					return -1; // Nothing to watch, fail.
				}

				if (availableEp > viewedCount) { // If we watched ep 0 last time, our view count will be 1. Now we can use 1 as our new ep, etc.
					epToShow = viewedCount;
				} else if (channel.loop === true) {
					// How many times have we been through this series. Let's say we watched 10 episodes, but there are only 3 uniques [0,1,2].
					const watchedEntireSeason = Math.trunc(viewedCount / availableEp); // we went through 3 times fully
					epToShow = viewedCount - (watchedEntireSeason * availableEp); // 10 - 3 seasons (9) is 1. So our last episode was the first, 0 in the array. And 1 is the next ep!
				} else { // We have seen all the episodes, return a random one
					epToShow = jsRandom(0, availableEp - 1);
				}
				if (epToShow === -1) {
					return epToShow;
				}
				return epsArray[epToShow];
			}
		}

		/**
		 * Checks the tags on a channel or an episode to determine if it can be shown.
		 * @param {FctvTags} tags
		 * @returns {{canSelect: number, text: string}} x
		 */
		function checkTags(tags) {
			let x = {
				canSelect: 1,
				text: ``
			};
			for (const tag in tags) {
				if (tag) {
					switch (tag) {
						case "hyperPreg":
							if (!V.seeHyperPreg) {
								x.canSelect = -1;
								x.text = `Too much happiness detected`;
							}
							break;
						case "preg":
							if (!V.seePreg) {
								x.canSelect = -1;
								x.text = `Too much baking detected`;
							}
							break;
						case "extreme":
							if (!V.seeExtreme) {
								x.canSelect = -1;
								x.text = `Too much hugging detected`;
							}
							break;
						case "dicks":
							if (!V.seeDicks && !V.makeDicks) {
								x.canSelect = -1;
								x.text = `Too many hot dogs detected`;
							}
							break;
						case "incest":
							if (!V.seeIncest && tag === "incest") {
								x.canSelect = -1;
								x.text = `Too much familiarity detected`;
							}
							break;
						case "loli":
							if (V.minimumSlaveAge > 13 && tag === "loli") {
								x.canSelect = -1;
								x.text = `Actor not vintage enough`;
							}
							break;
						default:
							throw Error(`Tag "${tag}" unknown for ${tags}`);
					}
				}
			}
			return x;
		}
	}
};
