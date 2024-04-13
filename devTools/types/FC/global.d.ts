declare global {
	// extensions
	interface Array<T> {
		includes(needle: any): boolean; // because we use silly unions with 0
	}

	interface Window {
		storyProxy?: object;
	}

	const V: FC.GameVariables;
	function createReadonlyProxy<T>(target: T): Readonly<T>;
	function createCheatProxy<T>(target: T): T;
}

export {}
