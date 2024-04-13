# Custom Drugs

To add custom drugs through modding, pass object(s) with the following properties to the `App.Mods.Drug.add` function. More than one drug can be added at a time by using multiple arguments.

## Custom Drug Object Properties

- `name` (String): The name of the drug, should be unique(however a PC and a slave drug under the same name will be fine) and not conflict with existing drugs. This is displayed in menus.
- `text` (String): The text used in the link to select the drug. Typically the first letter is in upper case.
- `type` (String): The category of the drug, used in the slave interaction menu. Can be an existing vanilla category(`Lips`, `Breasts`, `Nipples`, `Butt`, `Dick`/`Clit`(Will change automatically depending on slave genital type), `Fertility`, `Hormones`, `Psych`, `Misc`), or entirely new. Not required for PC drugs.
- `isPCDrug` (Boolean, optional): If the drug is for PC instead of slaves, default to `false`.
- `isConsumerGrade` (Boolean, optional): Lists the drug as consumer grade in manage personal affairs if true, other wise listed as slave grade, default to `false`. Only used is the drug is for PC.
- `available` (Function → *boolean*): If the drug should be displayed at all. The slave object will be passed as the first parameter.
- `enable` (Function → true or *string*): If the drug link should be enabled. The slave object will be passed as the first parameter. If the drug is allowed, return `true`. If not, return a string, which will be displayed to the player as a tool tip.
- `effect` (Function → *string* or *object*): The effect of the drug. The slave object will be passed as the first parameter. The returned string will be displayed in end week report.

## Example:
```js
App.Mods.Drugs.add(
	{
		name: "hip enhancer",
		text: "Hip enhancer",
		type: "Structural",
		available: function (slave) {
			return slave.indentureRestrictions < 2;
		},
		enable: function (slave) {
			//Disable if the slave's hip is already very wide or wider.
			if (slave.hips < 2) return true;
			else return "Hips are already too wide";
		},
		effect: function (slave) {
			//Get the pronouns of the slaves to be used in end week report.
			const { he, him, his, himself, He, His } = getPronouns(slave);
			if (slave.hips >= 2) {
				//If the slave's hips is already very wide, stop the drug regimen, notify in end week report.
				slave.drugs = "no drugs";
				return ` ${His} hips is already as wide is possible, <span class="yellow">${his} drug regimen has been ended.</span>`;
			} else {
				//If not, widen hips and notify in end week report.
				slave.hips++;
				return ` The hip enhancer <span class="lime">widens ${his} hip</span>.`;
			}
		}
	},
	/* More than one drug can be added at a time */
	{
		//Drug name should be unique, but two drug with identical name is okay if one is for PC and one is for slaves.
		name: "hip enhancer",
		text: "Hip enhancer",
		//PC Drugs do not require type
		isPCDrug: true,
		isConsumerGrade: true,
		available: () => true,
		enable: function (slave) {
			if (slave.hips < 2) return true;
			else return "Your hips are already too wide";
		},
		effect: function (slave) {
			if (slave.hips >= 2) {
				slave.drugs = "no drugs";
				return "Your hips is already as wide is possible, <span class=\"yellow\">your drug regimen has ended.</span>";
			} else {
				slave.hips++;
				return "The hip enhancer <span class=\"lime\">widens your hip</span>.";
			}
		}
	}
);
```