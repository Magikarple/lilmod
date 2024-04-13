declare namespace FC {
	namespace UI {
		namespace DOM {
			namespace Widgets {}
		}
		namespace Hotkeys {}
		namespace View {}
		namespace SlaveSummary {
			type AppendRenderer = (slave: FC.SlaveState, parentNode: Node) => void;

			interface AbbreviationState {
				clothes: number;
				devotion: number;
				diet: number;
				drugs: number;
				genitalia: number;
				health: number;
				hormoneBalance: number;
				mental: number;
				nationality: number;
				origins: number;
				physicals: number;
				race: number;
				rules: number;
				rulesets: number;
				skills: number;
			}

			interface State {
				abbreviation: AbbreviationState;
			}
		}
	}
}

declare type PassageLinkMap = Pick<HTMLElementTagNameMap, 'a' | 'audio' | 'img' | 'source' | 'video'>
