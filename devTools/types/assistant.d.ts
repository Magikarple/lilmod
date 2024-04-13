type assistantAppearance = "normal" | "monstergirl" | "shemale" | "amazon" | "businesswoman" | "goddess" | "hypergoddess" | "schoolgirl" | "loli" | "preggololi" | "fairy" | "pregnant fairy" | "slimegirl" | "cowgirl"| "harpygirl" | "kitsunegirl" | "lamiagirl" | "spidergirl" | "angel" | "cherub" | "imp" | "witch" | "ERROR_1606_APPEARANCE_FILE_CORRUPT" | "incubus" | "succubus";

type fsAssistantAppearance = "default" | "paternalist" | "degradationist" | "supremacist" | "subjugationist" | "roman revivalist" | "aztec revivalist" | "egyptian revivalist" | "edo revivalist" | "arabian revivalist" | "chinese revivalist" | "chattel religionist" | "repopulation focus" | "eugenics" | "physical idealist" | "hedonistic decadence" | "gender radicalist" | "gender fundamentalist" | "asset expansionist" | "transformation fetishist" | "pastoralist" | "maturity preferentialist" | "youth preferentialist" | "slimness enthusiast" | "body purist" | "intellectual dependency" | "slave professionalism" | "petite admiration" | "statuesque glorification" | "neoimperialist" | "antebellum revivalist";
interface assistant {
	appearance: assistantAppearance;
	fsAppearance: fsAssistantAppearance
	personality: -1 | 0 | 1;
	name: string;
	power: number;
	fsOptions: FC.Bool;
	options: FC.Bool;
	market: {
		relationship: "nonconsensual" | "incestuous" | "cute" | "romantic";
		limit: number;
		aggressiveness: number;
	};
	main: number;
	Extra1: FC.Bool;
	Extra2: FC.Bool;
	announcedName: FC.Bool;
	customImage: FC.CustomImage;
}

type appearance = Record<assistantAppearance, fsAppearance>;

type fsAppearance = Record<fsAssistantAppearance, string>;
