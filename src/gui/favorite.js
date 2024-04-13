/** Render a link that toggles the slave's favorite status
 * @param {App.Entity.SlaveState} slave
 * @param {function():void} [handler]
 * @returns {HTMLAnchorElement}
 */
App.UI.favoriteToggle = function(slave, handler) {
	/**
	 * @returns {HTMLAnchorElement}
	 */
	function favLink() {
		const linkID = `fav-link-${slave.ID}`;
		if (V.favorites.includes(slave.ID)) {
			const link = App.UI.DOM.link(String.fromCharCode(0xe800), () => {
				V.favorites.delete(slave.ID);
				$(`#${linkID}`).replaceWith(favLink());

				if (handler) {
					handler();
				}
			});
			link.classList.add("icons", "favorite");
			link.id = linkID;
			return link;
		} else {
			const link = App.UI.DOM.link(String.fromCharCode(0xe801), () => {
				V.favorites.push(slave.ID);
				$(`#${linkID}`).replaceWith(favLink());

				if (handler) {
					handler();
				}
			});
			link.classList.add("icons", "not-favorite");
			link.id = linkID;
			return link;
		}
	}

	return favLink();
};
