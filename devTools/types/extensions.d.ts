// cSpell:ignore inclusivity
// Extension from mousetrap-record
interface MousetrapStatic {
	record(callback: (this: MousetrapStatic, sequence: string[]) => void): void;
}

interface Number {
	/**
	 * Returns whether the value is between the given bounds, with optional inclusivity. Exclusive by default.
	 * @param min The minimum value to check against.
	 * @param max The maximum value to check against.
	 * @param inclusive Whether to include the bounds values.
	 */
	 isBetween(min: number, max: number, inclusive?: boolean): boolean;
}

type EnumerablePropertyKey<T extends PropertyKey> = T extends symbol ? never : (T extends number ? string : T);

interface ObjectConstructor {
	keys<K extends PropertyKey, V>(o: Partial<Record<K, V>>): EnumerablePropertyKey<K>[];
	entries<K extends PropertyKey, V>(o: Partial<Record<K, V>>): [EnumerablePropertyKey<K>, V][];
}


type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
