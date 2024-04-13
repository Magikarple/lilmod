declare namespace FC {
	namespace UseSlave {
		interface Option {
			/** The link text. */
			link: string;
			/** The text that appears when the option is selected. */
			desc: string;
			/** The link tooltip. */
			tooltip: string;
			/** Any prerequisites required for the option to appear. */
			prereq: () => boolean;
			/** Any effects the option has. */
			effect: () => void;
			/** The partner's reaction to the action. */
			reaction: string;
		}
	}
}
