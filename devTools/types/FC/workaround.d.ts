declare namespace App.UI.DOM {
	function makeElementTS<K extends keyof HTMLElementTagNameMap>(
		tag: K, content?: string | Node, classNames?: string[]): HTMLElementTagNameMap[K];
	/** @deprecated */
	function makeElementTS<K extends keyof HTMLElementTagNameMap>(
		tag: K, content?: string | Node, classNames?: string): HTMLElementTagNameMap[K];

	function appendNewElementTS<K extends keyof HTMLElementTagNameMap>(
		tag: K, parent: ParentNode, content?: string | Node, classNames?: string[]): HTMLElementTagNameMap[K];
	/** @deprecated */
	function appendNewElementTS<K extends keyof HTMLElementTagNameMap>(
		tag: K, parent: ParentNode, content?: string | Node, className?: string): HTMLElementTagNameMap[K];
}
