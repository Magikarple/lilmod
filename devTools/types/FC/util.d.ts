declare namespace FC {
    namespace Util {
        interface DiffBase<T> {
            /**
             * The original object
             */
            diffOriginal: T
            /**
             * The changes applied to the object
             */
            diffChange: Partial<T>
        }

        type DiffRecorder<T> = T & DiffBase<T>
	}

	interface NumericRange {
		min: number;
		max: number;
	}

	type PromiseWithProgress<T> = Promise<T> & {
		onProgress: (fn: (progress: number) => void) => PromiseWithProgress<T>
	}
}
