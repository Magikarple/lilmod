App.Art.GenAI.StylePromptPart = class StylePromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		switch (V.aiStyle) {
			case 0: // custom
				return V.aiCustomStylePos;
			case 1: // photorealistic
				return "<lora:LowRA:0.5> full body portrait, photorealistic, dark theme, black background";
			case 2: // anime/hentai
				return "full body portrait, 2d, anime, hentai, dark theme, black background";
		}
	}

	/**
	 * @override
	 */
	negative() {
		switch (V.aiStyle) {
			case 0: // custom
				return V.aiCustomStyleNeg;
			case 1: // photorealistic
				return "greyscale, monochrome, cg, render, unreal engine, closeup, medium shot";
			case 2: // anime/hentai
				return "greyscale, monochrome, photography, 3d render, text, speech bubble, closeup, medium shot";
		}
	}
};
