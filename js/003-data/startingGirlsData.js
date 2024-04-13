/**
 * @typedef startingGirlsOptionsPreset
 * @property {string} name
 * @property {number} value
 * @property {number} max
 * @property {0|1} [extreme] undefined: ignore settings, 0: only when V.seeExtreme === 0, 1: only when V.seeExtreme === 1
 * @property {"on"|"off"} [style]
 */

/**
 * @typedef startingGirlsOptionsNonNumericPreset
 * @property {string} name
 * @property {string} value
 * @property {0|1} [extreme] undefined: ignore settings, 0: only when V.seeExtreme === 0, 1: only when V.seeExtreme === 1
 * @property {"on"|"off"} [style]
 */

/**
 * @type {{[key: string]: Array<startingGirlsOptionsPreset>}}
 */
App.Data.StartingGirls = {
	prestige: [
		{name: "None", value: 0, max: 0.5},
		{name: "Locally known", value: 1, max: 1.5},
		{name: "Regionally famous", value: 2, max: 2.5},
		{name: "World renowned", value: 3, max: 8}
	],
	weight: [
		{name: "Emaciated", value: -100, max: -95},
		{name: "Skinny", value: -50, max: -30},
		{name: "Thin", value: -20, max: -10},
		{name: "Average", value: 0, max: 10},
		{name: "Plush", value: 20, max: 30},
		{name: "Chubby", value: 50, max: 95},
		{name: "Fat", value: 100, max: 130},
		{name: "Obese", value: 140, max: 160},
		{name: "Super obese", value: 180, max: 190},
		{name: "Dangerously obese", value: 200, max: 999}
	],
	muscles: [
		{name: "Frail", value: -100, max: -95},
		{name: "Very weak", value: -66, max: -50},
		{name: "Weak", value: -41, max: -5},
		{name: "Normal", value: 0, max: 5},
		{name: "Toned", value: 20, max: 30},
		{name: "Well built", value: 40, max: 50},
		{name: "Quite muscular", value: 65, max: 95},
		{name: "Ripped", value: 100, max: 999}
	],
	waist: [
		{name: "Absurd", value: -100, max: -95},
		{name: "Hourglass", value: -55, max: -40},
		{name: "Feminine", value: -25, max: -15},
		{name: "Average", value: 0, max: 10},
		{name: "Unattractive", value: 15, max: 40},
		{name: "Ugly", value: 55, max: 95},
		{name: "Masculine", value: 100, max: 999}
	],
	face: [
		{name: "Very Ugly", value: -100, max: -95},
		{name: "Ugly", value: -55, max: -40},
		{name: "Unattractive", value: -15, max: -10},
		{name: "Average", value: 0, max: 10},
		{name: "Attractive", value: 15, max: 40},
		{name: "Beautiful", value: 55, max: 95},
		{name: "Very beautiful", value: 100, max: 999}
	],
	lips: [
		{name: "Thin", value: 5, max: 10},
		{name: "Normal", value: 15, max: 20},
		{name: "Pretty", value: 25, max: 40},
		{name: "Plush", value: 55, max: 70},
		{
			name: "Huge", value: 85, max: 95, extreme: 1
		},
		{
			name: "Facepussy", value: 100, max: 999, extreme: 1
		},
		{
			name: "Huge", value: 85, max: 999, extreme: 0
		}
	],
	intelligence: [
		{name: "Moronic", value: -100, max: -95},
		{name: "Very stupid", value: -60, max: -50},
		{name: "Stupid", value: -30, max: -15},
		{name: "Average", value: 0, max: 15},
		{name: "Smart", value: 30, max: 50},
		{name: "Very smart", value: 60, max: 95},
		{name: "Brilliant", value: 100, max: 999}
	],
	fetishStrength: [
		{name: "Very Low", value: 15, max: 30},
		{name: "Low", value: 45, max: 60},
		{name: "Normal", value: 75, max: 85},
		{name: "High", value: 90, max: 95},
		{name: "Extremely High", value: 100, max: 999}
	],
	attr: [
		{
			name: "Disgusted", value: 0, max: 5, style: "off"
		},
		{
			name: "Turned off", value: 10, max: 15, style: "off"
		},
		{
			name: "Not attracted", value: 25, max: 35, style: "off"
		},
		{name: "Indifferent", value: 50, max: 65},
		{
			name: "Attracted", value: 75, max: 85, style: "on"
		},
		{
			name: "Aroused", value: 90, max: 95, style: "on"
		},
		{
			name: "Passionate", value: 100, max: 999, style: "on"
		}
	],
	energy: [
		{
			name: "Frigid", value: 5, max: 10, style: "off"
		},
		{
			name: "Poor", value: 25, max: 40, style: "off"
		},
		{name: "Average", value: 45, max: 60},
		{
			name: "Powerful", value: 65, max: 80, style: "on"
		},
		{
			name: "Sex addict", value: 85, max: 99, style: "on"
		},
		{
			name: "Nympho", value: 100, max: 999, style: "on"
		}
	],
	skill: [
		{name: "Unskilled", value: 0, max: 10},
		{name: "Basic", value: 15, max: 30},
		{name: "Skilled", value: 35, max: 60},
		{name: "Expert", value: 65, max: 99},
		{name: "Masterful", value: 100, max: 999},
	],
	devotion: [
		{name: "Utterly hateful", value: -100, max: -95},
		{name: "Hateful", value: -70, max: -50},
		{name: "Resistant", value: -35, max: -20},
		{name: "Ambivalent", value: 0, max: 20},
		{name: "Accepting", value: 35, max: 50},
		{name: "Devoted", value: 70, max: 95},
		{name: "Worshipful", value: 100, max: 999}
	],
	trust: [
		{name: "Abjectly terrified", value: -100, max: -95},
		{name: "Terrified", value: -70, max: -50},
		{name: "Frightened", value: -35, max: -20},
		{name: "Fearful", value: 0, max: 20},
		{name: "Careful", value: 35, max: 50},
		{name: "Trusting", value: 70, max: 95},
		{name: "Absolute trust", value: 100, max: 999}
	]
};
/**
 * @type {{[key: string]: Array<startingGirlsOptionsNonNumericPreset>}}
 */
App.Data.StartingGirlsNonNumericPresets = {
	genes: [
		{name: "XX (Female)", value: "XX"},
		{name: "XY (Male)", value: "XY"}
	]
};
