// Articles map
/**
 * @typedef {object} article
 * @property {function():(HTMLElement|DocumentFragment)} render
 * @property {string} [category]
 */
/**
 * @type {Map<string, article>}
 */
App.Encyclopedia.articles = new Map();

/**
 * Adds an article if it does not exist yet.
 * @param {string} key
 * @param {function():(HTMLElement|DocumentFragment)} article
 * @param {string} [category]
 */
App.Encyclopedia.addArticle = function(key, article, category) {
	if (!App.Encyclopedia.articles.has(key)) {
		App.Encyclopedia.articles.set(key, {render: article, category: category});
	} else {
		console.log(`Trying to overwrite encyclopedia article "${article}".`);
	}
};

/**
 * Renders the specified article.
 * @param {string} article
 * @returns {string|HTMLElement|DocumentFragment}
 */
App.Encyclopedia.renderArticle = function(article) {
	if (App.Encyclopedia.articles.has(article)) {
		return App.Encyclopedia.articles.get(article).render();
	}
	return `Encyclopedia article "${article}" not found.`;
};

// Categories map
/**
 * @type {Map<string, (currentArticle:string)=>(Node)>}
 */
App.Encyclopedia.categories = new Map();

/**
 * Adds an article if it does not exist yet.
 * @param {string} key
 * @param {(currentArticle:string)=>(Node)} category
 */
App.Encyclopedia.addCategory = function(key, category) {
	if (!App.Encyclopedia.categories.has(key)) {
		App.Encyclopedia.categories.set(key, category);
	} else {
		console.log(`Trying to overwrite encyclopedia category "${category}".`);
	}
};

/**
 * Renders the specified article.
 * @param {string} article
 * @returns {string|Node}
 */
App.Encyclopedia.renderCategory = function(article) {
	if (!App.Encyclopedia.articles.has(article)) {
		return `Encyclopedia article "${article}" not found.`;
	}

	const category = App.Encyclopedia.articles.get(article).category;
	if (!category) {
		return `Encyclopedia article "${article}" has no category.`;
	}
	if (!App.Encyclopedia.categories.has(category)) {
		return `Encyclopedia category "${category}" not found.`;
	}
	return App.Encyclopedia.categories.get(category)(article);
};

// Utility functions
App.Encyclopedia.topic = function(topic) {
	return App.UI.DOM.makeElement("span", topic, ["encyclopedia", "topic"]);
};

/**
 * @param {Node} parent
 * @param {string} source
 * @param {string} [author]
 */
App.Encyclopedia.addArticleSource = function(parent, source, author) {
	const r = [];
	if (author) {
		r.push(`<span class='author'>${author},</span>`);
	}
	r.push(`<span class='article'>${source}</span>`);
	App.Events.addNode(parent, r, "p", "encyclopedia-source");
};
