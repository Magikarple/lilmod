import {StoryMoment, Passage} from "twine-sugarcube";

declare module "twine-sugarcube" {
	interface SugarCubeStoryVariables extends FC.GameVariables {
	}

	interface SugarCubeSetupObject {
		// Any usages of the global setup object should be replaced by App.Data.misc
	}

	// These are SugarCube private APIs used in the project
	interface StateAPI {
		expired: StoryMoment[];
		clearTemporary(): void;
	}

	interface UIBarAPI {
		update(): void;
	}
}

export {};
