declare namespace FC {
	type WithNone<T> = T | "none";

	const enum Bool {
		False = 0,
		True = 1
	}

	const enum NoObject {
		Value = 0
	}

	type Zeroable<T> = T | NoObject;
}

type WidenLiterals<T> =
  T extends boolean ? boolean :
  T extends string ? string :
  T extends number ? number :
  T;
