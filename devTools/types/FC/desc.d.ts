declare namespace FC {
	namespace Desc {
		interface LongSlaveOptions {
			descType?: DescType;
			market?: Zeroable<SlaveMarketName | SpecialMarketName | "starting">;
			marketText?: string; /* extra text to be appended to the first line of the description, dependent on the original market */
			noArt?: boolean;
			/** Allow linking to other passages, for example to other slaves */
			links?:boolean;
		}
	}
}
