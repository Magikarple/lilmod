/**
 * @param {FC.SlaveState} slave
 * @returns {App.Art.GenAI.Prompt}
 */
// eslint-disable-next-line no-unused-vars
function buildPrompt(slave) {
	let prompts = [
		new App.Art.GenAI.StylePromptPart(slave),
		new App.Art.GenAI.SkinPromptPart(slave),
		new App.Art.GenAI.RacePromptPart(slave),
		new App.Art.GenAI.GenderPromptPart(slave),
		new App.Art.GenAI.AgePromptPart(slave),
		new App.Art.GenAI.PregPromptPart(slave),
		new App.Art.GenAI.BeautyPromptPart(slave),
		new App.Art.GenAI.PosturePromptPart(slave),
		new App.Art.GenAI.ArousalPromptPart(slave),
		new App.Art.GenAI.WeightPromptPart(slave),
		new App.Art.GenAI.HeightPromptPart(slave),
		new App.Art.GenAI.MusclesPromptPart(slave),
		new App.Art.GenAI.ClothesPromptPart(slave),
		new App.Art.GenAI.CollarPromptPart(slave),
		new App.Art.GenAI.BreastsPromptPart(slave),
		new App.Art.GenAI.FakeBoobsPromptPart(slave),
		new App.Art.GenAI.WaistPromptPart(slave),
		new App.Art.GenAI.HipsPromptPart(slave),
		new App.Art.GenAI.HairPromptPart(slave),
		new App.Art.GenAI.EyePromptPart(slave),
		new App.Art.GenAI.EyebrowPromptPart(slave),
		new App.Art.GenAI.NationalityPromptPart(slave),
		new App.Art.GenAI.ExpressionPromptPart(slave),
		new App.Art.GenAI.TattoosPromptPart(slave),
		new App.Art.GenAI.PiercingsPromptPart(slave),
		new App.Art.GenAI.HealthPromptPart(slave),
		new App.Art.GenAI.PubicHairPromptPart(slave),
		new App.Art.GenAI.AmputationPromptPart(slave),
		new App.Art.GenAI.AndroidPromptPart(slave),
		new App.Art.GenAI.CustomPromptPart(slave),
	];
	return new App.Art.GenAI.Prompt(prompts);
}
