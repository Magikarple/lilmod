declare namespace FC {
	namespace SecExp {

		interface UnitData {
			troops: number,
			maxTroops: number,
			equip: number
		}

		interface PlayerUnitData extends UnitData {
			active: number,
			ID: number,
		}

		interface PlayerHumanUnitData extends PlayerUnitData {
			platoonName: string,
			training: number,
			loyalty: number,
			cyber: number,
			medics: number,
			SF: number,
			commissars: number,
			battlesFought: number,
		}

		type PlayerHumanUnitType = "bots" | "slaves" | "militia" | "mercs" | "SF";
		type PlayerHumanUnitTypeMod = "bots" | "slaves" | "militia" | "mercs";
		type PlayerHumanUnitTypeModHuman = "slaves" | "militia" | "mercs";
		type EnemyUnitType = "raiders" | "free city" | "old world" | "freedom fighters";
	}
}
