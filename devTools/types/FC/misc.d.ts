declare namespace FC {
	type SlaveSchoolName = "GRI" | "HA" | "NUL" | "SCP" | "TCR" | "TFS" | "TGA" | "TSS" | "LDE" | "TUO";
	type LawlessMarkets = "generic" | "gangs and smugglers" | "heap" | "indentures" | "low tier criminals" | "military prison" | "juvenile detention" |
		"neighbor" | "wetware" | "white collar" | SlaveSchoolName;
	type OrdinaryMarkets = "kidnappers" | "trainers" | "hunters" | "raiders" | "underage raiders" | "corporate";
	type SlaveMarketName = LawlessMarkets | OrdinaryMarkets;
	type SpecialMarketName = "Elite Slave" | "Household Liquidator" | "Custom Slave" | "Husk Slave" | "Slave Shelter" | "JobFulfillmentCenterOrder" | "Prestigious Slave" | "Special Slave";
	type Gingering = Zeroable<"antidepressant" | "depressant" | "stimulant" | "vasoconstrictor" | "vasodilator" | "aphrodisiac" | "ginger">;
	type GingeringDetection = Zeroable<"slaver" | "mercenary" | "force">;
	type SlaveActs = "PCChildrenFathered" | "PCKnockedUp" | "anal" | "births" | "birthsTotal" | "cum" | "laborCount" | "mammary" | "milk" | "oral" | "penetrative" | "pitKills" | "miscarriages" | "publicUse" | "slavesFathered" | "slavesKnockedUp" | "vaginal" | "abortions" | "birth" | "bestiality";

	interface SlaveSchool {
		title: string,
		nickname: string,
		branchName: string,
		slaveNoun: string,
		readonly requirements: boolean,
	}

	namespace SlaveSummary {
		interface SmartPiercing {
			setting: {
				off: string,
				submissive: string,
				lesbian: string,
				oral: string,
				humiliation: string,
				anal: string,
				boobs: string,
				sadist: string,
				masochist: string,
				dom: string,
				pregnancy: string,
				vanilla: string,
				all: string,
				none: string,
				monitoring: string,
				men: string,
				women: string,
				"anti-men": string,
				"anti-women": string,
			};
		}
	}
}
