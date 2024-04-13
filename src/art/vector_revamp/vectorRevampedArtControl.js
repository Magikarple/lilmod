/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable one-var */
/* eslint-disable no-unused-vars */
// cSpell:ignore Tshirt, oversizedtshirt, pierc, Comf, Exterme, Ancle, coor
/**
 * @param {App.Entity.SlaveState} slave
 * @returns {{styleClass: string, styleCSS: string}} style parameters to pass on to the renderer, and CSS string
 */
App.Art.revampedVectorArtStyles = function(slave) {
	const displayClass = App.Art.generateDisplayClass();

	const styleControl = new ArtStyleControl(displayClass, slave);
	const clothingControl = new ClothingControl();
	const clothing = clothingControl.clothingForSlave(slave);

	if (clothing && clothing.styleSettings) {
		for (const attr in clothing.styleSettings) {
			if (clothing.styleSettings.hasOwnProperty(attr)) {
				Object.assign(styleControl[attr], clothing.styleSettings[attr]);
			}
		}
	}

	// Create highlight and shade (must be done after base colors are set)
	styleControl.applyLightAndShade();
	styleControl.applyBellyMask(clothingControl.bellyLevel, clothingControl.torsoSize, clothingControl.bellyMaskOpa);
	return {styleClass: displayClass, styleCSS: styleControl.StylesCss};
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} [displayClass]
 * @returns {DocumentFragment}
 */
App.Art.revampedVectorArtElement = function(slave, displayClass) {
	const res = document.createDocumentFragment();
	if (!displayClass) {
		const {styleClass, styleCSS} = App.Art.revampedVectorArtStyles(slave);
		displayClass = styleClass;
		const style = document.createElement("style");
		style.innerHTML = styleCSS;
		res.appendChild(style);
	}
	const revampedVectorArtControl = new RevampedArtControl(displayClass, slave, V.seeVectorArtHighlights, V.showBodyMods);
	const layers = revampedVectorArtControl.Layers; // side effects are important, must fetch layers before getting transformRules (FIXME?)
	const svgQueue = new App.Art.SvgQueue(revampedVectorArtControl.transformRules, App.Data.Art.VectorRevamp, displayClass);
	layers.forEach((l) => svgQueue.add(l));

	res.appendChild(svgQueue.output());
	return res;
};

class ArtStyleEntry {
	constructor(name) {
		this.name = name;
	}

	toString() {
		let keys = Object.keys(this);
		let styleArray = [];
		if (keys !== null && keys !== undefined) {
			let styleObj = this;
			keys.forEach(function(key) {
				if (key !== "name") {
					let value = styleObj[key];
					styleArray.push(`${key}:${value}`);
				}
			});

			let styleValue = `${styleArray.join(";")};`;

			let cssDef = `{ ${styleValue} }`; // not sure if there should be padding here

			if (this.name.length > 0) { cssDef = `.${this.name}${cssDef}`; }

			return cssDef;
		}

		return "";
	}
}

class ArtStyleControl {
	constructor(artDisplayClass, artSlave) {
		this.artDisplayClass = artDisplayClass;
		this.artSlave = artSlave;
		this.styles = [];

		this.initDefaultValues();
		this.applyMakeup();
		this.applyCalcMuscleTone();
		this.applyEyeLensStyle();
		this.applySmartPiercingColor();
	}

	applyMakeup() {
		let lipsColor = this.lips.fill;
		let lipsOpacity = this.lips["fill-opacity"];

		switch (this.artSlave.makeup) {
			case 1:
				// Nice
				lipsColor = "#ff69b4";
				lipsOpacity = 0.5;
				break;
			case 2:
				// Gorgeous
				lipsColor = "#8b008b";
				lipsOpacity = 0.7;
				break;
			case 3:
				// Hair coordinated
				lipsColor = this.hair.fill;
				lipsOpacity = 0.3;
				break;
			case 4:
				// Slutty
				lipsColor = "#ff0000";
				lipsOpacity = 1;
				break;
			case 5:
				// Neon
				lipsColor = "#DC143C";
				lipsOpacity = 1;
				break;
			case 6:
				// Neon hair coordinated
				lipsColor = this.hair.fill;
				lipsOpacity = 1;
				break;
			case 7:
				// Metallic
				lipsColor = "#b22222";
				lipsOpacity = 0.7;
				break;
			case 8:
				// Metallic hair coordinated
				lipsColor = this.hair.fill;
				lipsOpacity = 0.7;
				break;
			default:
		}

		this.lips.fill = lipsColor;
		this.lips["fill-opacity"] = lipsOpacity;
	}

	applyCalcMuscleTone() {
		let musclesValue = this.artSlave.muscles + 101;
		let musclesVisibility = 0.910239 * Math.log(0.02 * musclesValue);

		this.muscleTone["fill-opacity"] = musclesVisibility;
	}

	applyEyeLensStyle() {
		if (!hasAnyEyes(this.artSlave)) {
			return;
		}

		let eyeLens = hasLeftEye(this.artSlave) ? getLeftEyePupil(this.artSlave) : getRightEyePupil(this.artSlave);

		switch (eyeLens) {
			case "demonic":
				this.eyeball.fill = this.iris.fill;
				break;
			case "devilish":
				this.eyeball.fill = "#010101";
		}
	}

	applySmartPiercingColor() {
		if (this.artSlave.piercing.genitals.smart === true) {
			let setting = this.artSlave.clitSetting.replace(/\s+/g, '');
			let colors = {
				off: "#1A3F19",
				none: "#1A3F19",
				all: "#F3F3F3",
				nodefaultsetting: "#1A3F19",
				women: "#FF66B2",
				men: "#2039DE",
				vanilla: "#4DB748",
				oral: "#FFFF33",
				anal: "#CCFF99",
				boobs: "#33FF33",
				submissive: "#9999FF",
				humiliation: "#CC99FF",
				pregnancy: "#CC6600",
				dom: "#FF0000",
				masochist: "#CCFFFF",
				sadist: "#B7B8BD"
			};
			if (setting in colors) {
				this.smartPiercing.fill = colors[setting];
			}
		}
	}

	/* currently unused, keeping for color reference
		let skinPalette = [
			["light", "#feebe5"],
			["white", "#feebe5"],
			["fair", "#feebe5"],
			["lightened", "#feebe5"],
			["extremely pale", "#fff8f8"],
			["pale", "#f9ebf0"],
			["tanned", "#e8b693"],
			["natural", "#e8b693"],
			["olive", "#a46237"],
			["light olive", "#d4c6bb"],
			["dark", "#a46237"],
			["brown", "#845c44"],
			["dark brown", "#845c44"],
			["black", "#463a3a"],
			["camouflage patterned", "#78875a"],
			["dyed red", "#bc4949"],
			["dyed green", "#A6C373"],
			["dyed blue", "#5b8eb7"],
			["dyed pink", "#fe62b0"],
			["dyed gray", "#bdbdbd"],
			["tiger striped", "#e2d75d"]
		];
	*/

	initDefaultValues() {
		let colorSlave = skinColorCatcher(this.artSlave);

		this.white = new ArtStyleEntry("white");
		this.white.fill = "#FFFFFF";

		this.skin = new ArtStyleEntry("skin");
		this.skin.fill = colorSlave.skinColor;

		this.armSkin = new ArtStyleEntry("arm.skin");
		this.armSkin.fill = this.skin.fill;

		this.head = new ArtStyleEntry("head");
		this.head.fill = this.skin.fill;

		this.torso = new ArtStyleEntry("torso");
		this.torso.fill = this.skin.fill;

		this.boob = new ArtStyleEntry("boob");
		this.boob.fill = this.skin.fill;

		this.penis = new ArtStyleEntry("penis");
		this.penis.fill = this.skin.fill;

		this.scrotum = new ArtStyleEntry("scrotum");
		this.scrotum.fill = this.skin.fill;

		this.areola = new ArtStyleEntry("areola");
		this.areola.fill = colorSlave.areolaColor;

		this.labia = new ArtStyleEntry("labia");
		this.labia.fill = colorSlave.labiaColor;

		this.hair = new ArtStyleEntry("hair");
		this.hair.fill = extractColor(this.artSlave.hColor);

		this.shoe = new ArtStyleEntry("shoe");
		this.shoe.fill = "#3E65B0";

		this.smartPiercing = new ArtStyleEntry("smart_piercing");
		this.smartPiercing.fill = "#4DB748";

		this.steelPiercing = new ArtStyleEntry("steel_piercing");
		this.steelPiercing.fill = "#c0c6c7";

		this.steelChastity = new ArtStyleEntry("steel_chastity");
		this.steelChastity.fill = "#c0c6c7";

		this.labiaSkin = new ArtStyleEntry("labia.skin");
		this.labiaSkin.fill = this.skin.fill;

		this.outfitBase = new ArtStyleEntry("outfit_base");
		this.outfitBase.fill = "#515351";

		this.shadow = new ArtStyleEntry("shadow");
		this.shadow.fill = "#010101";

		this.muscleTone = new ArtStyleEntry("muscle_tone");
		this.muscleTone.fill = "#010101";
		this.muscleTone["fill-opacity"] = 1;

		this.glasses = new ArtStyleEntry("glasses");
		this.glasses.fill = "#010101";

		this.lips = new ArtStyleEntry("lips");
		this.lips.fill = colorSlave.lipsColor;
		this.lips["fill-opacity"] = 0.6;

		this.eyeball = new ArtStyleEntry("eyeball");
		this.eyeball.fill = "#dfdfdf";

		this.iris = new ArtStyleEntry("iris");
		if (hasAnyEyes(this.artSlave)) {
			this.iris.fill = extractColor(hasLeftEye(this.artSlave) ? getLeftEyeColor(this.artSlave) : getRightEyeColor(this.artSlave), 1);
		} else {
			this.iris.fill = extractColor("brown", 1);
		}

		this.highlight1 = new ArtStyleEntry("highlight1");
		this.highlight1.fill = "#ffffff";
		this.highlight1["fill-opacity"] = 0.9;
		this.highlight1["mix-blend-mode"] = "soft-light";

		this.highlight2 = new ArtStyleEntry("highlight2");
		this.highlight2.fill = "#ffffff";
		this.highlight2["fill-opacity"] = 0.9;
		this.highlight2["mix-blend-mode"] = "soft-light";

		this.highlightStrong = new ArtStyleEntry("highlightStrong");
		this.highlightStrong.fill = "#ffffff";

		this.armpitHair = new ArtStyleEntry("armpit_hair");
		this.armpitHair.fill = extractColor(this.artSlave.underArmHColor);

		this.pubicHair = new ArtStyleEntry("pubic_hair");
		this.pubicHair.fill = extractColor(this.artSlave.pubicHColor);

		this.bellyDetails = new ArtStyleEntry("belly_details");
		this.bellyDetails["fill-opacity"] = 1;

		this.bellySkin = new ArtStyleEntry("belly.skin");
		this.bellySkin.fill = this.skin.fill;

		this.neckSkin = new ArtStyleEntry("neck.skin");
		this.neckSkin.fill = this.skin.fill;

		this.legsSkin = new ArtStyleEntry("legs.skin");
		this.legsSkin.fill = this.skin.fill;

		this.buttSkin = new ArtStyleEntry("butt.skin");
		this.buttSkin.fill = this.skin.fill;

		this.feetSkin = new ArtStyleEntry("feet.skin");
		this.feetSkin.fill = this.skin.fill;

		this.feet_nails = new ArtStyleEntry("feet_nails");
		this.feet_nails.fill = "#9A0001";
		this.feet_nails["fill-opacity"] = 1;

		this.gag = new ArtStyleEntry("gag");
		this.gag.fill = "#bf2126";

		this.shoe_primary = new ArtStyleEntry("shoe_primary");
		this.shoe_primary.fill = "#3E65B0";
		this.shoe_primary["fill-opacity"] = 1;

		this.shoe_accent = new ArtStyleEntry("shoe_accent");
		this.shoe_accent.fill = "#222222";
		this.shoe_accent["fill-opacity"] = 1;

		this.top_primary = new ArtStyleEntry("top_primary");
		this.top_primary.fill = "#808080";
		this.top_primary["fill-opacity"] = 1;

		this.top_accent = new ArtStyleEntry("top_accent");
		this.top_accent.fill = "#808080";
		this.top_accent["fill-opacity"] = 1;

		this.bottoms_primary = new ArtStyleEntry("bottoms_primary");
		this.bottoms_primary.fill = "#808080";
		this.bottoms_primary["fill-opacity"] = 1;

		this.bottoms_accent = new ArtStyleEntry("bottoms_accent");
		this.bottoms_accent.fill = "#808080";
		this.bottoms_accent["fill-opacity"] = 1;

		this.bra_primary = new ArtStyleEntry("bra_primary");
		this.bra_primary.fill = "#808080";
		this.bra_primary["fill-opacity"] = 1;

		this.bra_accent = new ArtStyleEntry("bra_accent");
		this.bra_accent.fill = "#808080";
		this.bra_accent["fill-opacity"] = 1;

		this.bra_strap1 = new ArtStyleEntry("bra_strap1");
		this.bra_strap1["fill-opacity"] = 1;

		this.bra_strap2 = new ArtStyleEntry("bra_strap2");
		this.bra_strap2["fill-opacity"] = 1;

		this.bra_strap3 = new ArtStyleEntry("bra_strap3");
		this.bra_strap3["fill-opacity"] = 1;

		this.shirt_center1 = new ArtStyleEntry("shirt_center1");
		this.shirt_center1.opacity = 1;

		this.shirt_center2 = new ArtStyleEntry("shirt_center2");
		this.shirt_center2.opacity = 1;

		this.shirt_center3 = new ArtStyleEntry("shirt_center3");
		this.shirt_center3.opacity = 1;

		this.panties_primary = new ArtStyleEntry("panties_primary");
		this.panties_primary.fill = "#808080";
		this.panties_primary["fill-opacity"] = 1;

		this.panties_accent = new ArtStyleEntry("panties_accent");
		this.panties_accent.fill = "#808080";
		this.panties_accent["fill-opacity"] = 1;

		this.stockings_primary = new ArtStyleEntry("stockings_primary");
		this.stockings_primary.fill = "#000000";
		this.stockings_primary["fill-opacity"] = 0.0;

		this.stockings_accent = new ArtStyleEntry("stockings_accent");
		this.stockings_accent.fill = "#000000";
		this.stockings_accent["fill-opacity"] = 0.0;

		this.bellymask_1 = new ArtStyleEntry("bellymask_1");
		this.bellymask_1["fill-opacity"] = 0;

		this.bellymask_2 = new ArtStyleEntry("bellymask_2");
		this.bellymask_2["fill-opacity"] = 0;

		this.bellymask_3 = new ArtStyleEntry("bellymask_3");
		this.bellymask_3["fill-opacity"] = 0;

		this.bellymask_4 = new ArtStyleEntry("bellymask_4");
		this.bellymask_4["fill-opacity"] = 0;

		this.bellymask_5 = new ArtStyleEntry("bellymask_5");
		this.bellymask_5["fill-opacity"] = 0;

		this.bellymask_6 = new ArtStyleEntry("bellymask_6");
		this.bellymask_6["fill-opacity"] = 0;

		this.bellymask_7 = new ArtStyleEntry("bellymask_7");
		this.bellymask_7["fill-opacity"] = 0;

		this.bellymask_8 = new ArtStyleEntry("bellymask_8");
		this.bellymask_8["fill-opacity"] = 0;

		this.bellymask_9 = new ArtStyleEntry("bellymask_9");
		this.bellymask_9["fill-opacity"] = 0;

		this.bellymask_normal = new ArtStyleEntry("bellymask_normal");
		this.bellymask_normal["fill-opacity"] = 0;

		this.bellymask_hourglass = new ArtStyleEntry("bellymask_hourglass");
		this.bellymask_hourglass["fill-opacity"] = 0;

		this.bellymask_unnatural = new ArtStyleEntry("bellymask_unnatural");
		this.bellymask_unnatural["fill-opacity"] = 0;

		this.colorsWithHighlightAndShade = ['skin', 'arm.skin', 'head', 'torso', 'boob', 'penis', 'scrotum', 'belly.skin', 'neck.skin', 'legs.skin', 'butt.skin', 'feet.skin', 'shoe_primary', 'shoe_accent', 'top_primary', 'top_accent', 'bottoms_primary', 'bottoms_accent', 'bra_primary', 'bra_accent', 'panties_primary', 'panties_accent'];
		this.colorsStrongHighlightAndShade = ['top_primary', 'top_accent', 'bottoms_primary', 'bottoms_accent', 'skin'];
		this.currentlyApplyingStrongShade = false;
	}

	get StylesCss() {
		let mainStyle = new ArtStyleEntry("");
		mainStyle.position = "absolute";
		mainStyle.height = "100%";
		mainStyle["margin-left"] = "auto";
		mainStyle["margin-right"] = "auto";
		mainStyle.left = "0";
		mainStyle.right = "0";

		this.styles.push(this.white);
		this.styles.push(this.armSkin);
		this.styles.push(this.skin);
		this.styles.push(this.head);
		this.styles.push(this.torso);
		this.styles.push(this.boob);
		this.styles.push(this.penis);
		this.styles.push(this.scrotum);
		this.styles.push(this.areola);
		this.styles.push(this.labia);
		this.styles.push(this.hair);
		this.styles.push(this.smartPiercing);
		this.styles.push(this.steelPiercing);
		this.styles.push(this.steelChastity);
		this.styles.push(this.labiaSkin);
		this.styles.push(this.outfitBase);
		this.styles.push(this.shadow);
		this.styles.push(this.muscleTone);
		this.styles.push(this.glasses);
		this.styles.push(this.lips);
		this.styles.push(this.eyeball);
		this.styles.push(this.iris);
		this.styles.push(this.highlight1);
		this.styles.push(this.highlight2);
		this.styles.push(this.highlightStrong);
		this.styles.push(this.armpitHair);
		this.styles.push(this.pubicHair);
		this.styles.push(this.bellyDetails);
		this.styles.push(this.bellySkin);
		this.styles.push(this.neckSkin);
		this.styles.push(this.legsSkin);
		this.styles.push(this.buttSkin);
		this.styles.push(this.feetSkin);
		this.styles.push(this.feet_nails);
		this.styles.push(this.gag);
		this.styles.push(this.shoe_primary);
		this.styles.push(this.shoe_accent);
		this.styles.push(this.top_primary);
		this.styles.push(this.top_accent);
		this.styles.push(this.bottoms_primary);
		this.styles.push(this.bottoms_accent);
		this.styles.push(this.bra_primary);
		this.styles.push(this.bra_accent);
		this.styles.push(this.bra_strap1);
		this.styles.push(this.bra_strap2);
		this.styles.push(this.bra_strap3);
		this.styles.push(this.shirt_center1);
		this.styles.push(this.shirt_center2);
		this.styles.push(this.shirt_center3);
		this.styles.push(this.panties_primary);
		this.styles.push(this.panties_accent);
		this.styles.push(this.stockings_primary);
		this.styles.push(this.stockings_accent);
		this.styles.push(this.bellymask_normal);
		this.styles.push(this.bellymask_hourglass);
		this.styles.push(this.bellymask_unnatural);

		this.colorsWithHighlightAndShade.forEach(function(item, index) {
			item = item.split(".")[0];
			this.styles.push(this[`${item}_shade`]);
			this.styles.push(this[`${item}_highlight`]);
			if ( this.colorsStrongHighlightAndShade.includes(item) ) {
				this.styles.push(this[`${item}_strong_shade`]);
				this.styles.push(this[`${item}_strong_highlight`]);
			}
		}, this);

		this.styles.push(this.bellymask_1);
		this.styles.push(this.bellymask_2);
		this.styles.push(this.bellymask_3);
		this.styles.push(this.bellymask_4);
		this.styles.push(this.bellymask_5);
		this.styles.push(this.bellymask_6);
		this.styles.push(this.bellymask_7);
		this.styles.push(this.bellymask_8);
		this.styles.push(this.bellymask_9);

		let stylesValues = [];

		let artDisplayClass = this.artDisplayClass;

		stylesValues.push(`.${artDisplayClass} ${mainStyle.toString()}`);
		this.styles.forEach(function(style) {
			stylesValues.push(`.${artDisplayClass} ${style.toString()}`);
		});

		return stylesValues.join(" ");
	}

	/**
	 * @param {number} belly
	 * @param {string} torso
	 * @param {number} opa
	 */
	applyBellyMask(belly, torso, opa) {
		// Find the belly level and torso size and set the toggles to
		// use the correct clip-path
		if (belly === 1) {
			this.bellymask_1["fill-opacity"] = opa;
		} else if (belly === 2) {
			this.bellymask_2["fill-opacity"] = opa;
		} else if (belly === 3) {
			this.bellymask_3["fill-opacity"] = opa;
		} else if (belly === 4) {
			this.bellymask_4["fill-opacity"] = opa;
		} else if (belly === 5) {
			this.bellymask_5["fill-opacity"] = opa;
		} else if (belly === 6) {
			this.bellymask_6["fill-opacity"] = opa;
		} else if (belly === 7) {
			this.bellymask_7["fill-opacity"] = opa;
		} else if (belly === 8) {
			this.bellymask_8["fill-opacity"] = opa;
		} else if (belly === 9) {
			this.bellymask_9["fill-opacity"] = opa;
		}
		if (torso === "Normal") {
			this.bellymask_normal["fill-opacity"] = opa;
		} else if (torso === "Hourglass") {
			this.bellymask_hourglass["fill-opacity"] = opa;
		} else if (torso === "Unnatural") {
			this.bellymask_unnatural["fill-opacity"] = opa;
		}
	}

	applyLightAndShade() {
		// The color of highlights and shading on objects are calculated from the base color
		// This is done to have even highlights and shading over all colors
		// The highlight and shading colors are calculated by:
		// - Translating the base color string to numbers
		// - Transforming from RGB to CMYK
		// - Adjusting the K parameter to fit highlight or shading
		// - Transform back to RGB and back to a string
		// - Update the highlight and shading parameters
		this.currentlyApplyingStrongShade = false;
		let proplist = this.colorsWithHighlightAndShade;
		proplist.forEach( function(item){ this.applyLightAndShadeFunction(item); }, this);
		this.currentlyApplyingStrongShade = true;
		proplist = this.colorsStrongHighlightAndShade;
		proplist.forEach( function(item){ this.applyLightAndShadeFunction(item); }, this);
	}

	applyLightAndShadeFunction(item) {
		// Used by the applyLightAndShade function to calculate and set the highlight and
		// shade colors
		let opacity = 0.2;
		let h_name = 'highlight';
		let s_name = 'shade';
		let ka = 0.1;
		let kb = 0.16;
		if (this.currentlyApplyingStrongShade) {
			opacity = 0.5;
			h_name = 'strong_highlight';
			s_name = 'strong_shade';
			ka = 0.2;
			kb = 0.32;
		}
		let it = item;
		if (item.includes(".")) {
			let it_split = item.split(".");
			it = it_split[0];
			item = it + it_split[1].charAt(0).toUpperCase() + it_split[1].slice(1);
		}
		this[`${it}_${s_name}`] = new ArtStyleEntry(`${it}_${s_name}`);
		this[`${it}_${h_name}`] = new ArtStyleEntry(`${it}_${h_name}`);
		// console.log(item);
		let rgb = this.hexToRgb(this[item].fill);
		let K = 1 - Math.max(...[rgb.r, rgb.g, rgb.b])/255;
		let C = ((K !== 1) ? (1-rgb.r/255-K)/(1-K) : 0);
		let M = ((K !== 1) ? (1-rgb.g/255-K)/(1-K) : 0);
		let Y = ((K !== 1) ? (1-rgb.b/255-K)/(1-K) : 0);
		let Ks = Math.max(Math.min(K*(1-ka)+kb, 1), 0);
		let Kh = Math.max(Math.min(K*(1+ka)-kb, 1), 0);
		let r = 255*(1-C);
		let g = 255*(1-M);
		let b = 255*(1-Y);
		this[`${it}_${s_name}`].fill = this.rgbToHex(
			Math.ceil(r*(1-Ks)),
			Math.ceil(g*(1-Ks)),
			Math.ceil(b*(1-Ks)));
		this[`${it}_${s_name}`]["fill-opacity"] = opacity;
		if (Kh < 0) {
			// Needs a little extra - adjust lightness
			r = Math.min(255*(1-C*(1+Kh*3)), 255);
			g = Math.min(255*(1-M*(1+Kh*3)), 255);
			b = Math.min(255*(1-Y*(1+Kh*3)), 255);
			Kh = 0;
		}
		this[`${it}_${h_name}`].fill = this.rgbToHex(
			Math.ceil(r*(1-Kh)),
			Math.ceil(g*(1-Kh)),
			Math.ceil(b*(1-Kh)));
		this[`${it}_${h_name}`]["fill-opacity"] = opacity;
	}

	rgbToHex(r, g, b) {
		// Convert RGB integers to hex string
		r = Math.max(Math.min(r, 255), 0);
		b = Math.max(Math.min(b, 255), 0);
		g = Math.max(Math.min(g, 255), 0);
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	hexToRgb(hex) {
		// Convert color hex string to RGB values
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
}

class ClothingControl {
	constructor() {
		// slave info used in clothing selection
		// Bellylevel and torsoSize are calculated after clothingForSlave is called with slave info
		this.bellyLevel = 0;
		this.bellyMaskOpa = 1;
		this.torsoSize = "Normal";
		// color arrays used for clothing with multiple color variants
		this.colorsUnderwear = ['#262938', '#FE92ED', '#88D792', '#887956', '#7C1D26', '#F7F7F7', '#B9ADAD', '#B7A5A3', '#028AD8', '#E84795', '#CA115F'];
		this.colorsJeans = ['#808080', '#40383F', '#557092', '#476182', '#719DDA'];
		this.colorsShirt = ['#5570A7', '#F9DEE5', '#D9EBFF', '#F7F7F7', '#73232E', '#D20030'];
		this.colorsTshirt = ['#87A5B9', '#D7DEB6', '#F9FE94', '#D62EDA', '#500E24', '#AC3067', '#27B13D', '#53A683', '#4E7592', '#EFCCD9', '#7C7A87', '#F7F7F7'];
		this.colorsPastel = ['#FFD1DC', '#D1FFF4', '#FFD1F3', '#D1F3FF', '#D1FFDD', '#F4D1FF', '#D1DCFF', '#DCFFD1', '#F4D1FF'];
		this.colorsStripes = ['#E74C3C', '#F1948A', '#8E44AD', '#3498DB', '#138D75', '#27AE60', '#EECC71', '#F4D03F', '#F5B041', '#D35400', '#424949', '#273746'];
		this.colorsBikini = ['#FFFF00', '#FF3300', '#33CC00', '#0033FF', '#222222', '#F7F7F7'];
		this.colorsSport = ['#FFFF33', '#FF9933', '#FF0033', '#33FF66', '#33FFFF', '#3366FF', '#3300CC'];
		this.colorsShoes = ['#456FCA', '#E52323', '#111111', '#E7789F', '#800000', '#808000', '#000080'];
		// object of toggles used to enable clothing pieces used in multiple outfits
		this.piecewiseClothing = {
			apron: false,
			ballgown: false,
			boyshorts: false,
			bra: false,
			croptop: false,
			cutoffs: false,
			jeans: false,
			leatherpants: false,
			loincloth: false,
			miniskirt: false,
			monokini: false,
			fallennun: false,
			niceMaid: false,
			overalls: false,
			oversizedtshirt: false,
			panties: false,
			pasties: false,
			scalemailBot: false,
			scalemailTop: false,
			schoolgirlNormal: false,
			schoolgirlShort: false,
			shibari: false,
			shirt: false,
			skirt: false,
			sluttyMaid: false,
			spats: false,
			sportsbra: false,
			sportshorts: false,
			straps: false,
			stringbikiniBot: false,
			stringbikiniTop: false,
			stripedbra: false,
			stripedpanties: false,
			suitpants: false,
			sweater: false,
			tanktop: false,
			thong: false,
			tshirt: false,
			tubetop: false
		};
		this.accessories = {
			corset: false,
			corsetExtreme: false,
			longStockings: false,
			shortStockings: false
		};
	}

	/** @param {App.Entity.SlaveState} slave */
	clothingForSlave(slave) {
		// Calculation of belly level moved here so it can be used to disable unsupported clothing
		this.slave = slave;
		this.bellyLevel = this.calcBellyLevel();
		// torsoSize moved here to set clip paths for torso clothes
		this.torsoSize = this.calcTorsoSize();

		if (slave.fuckdoll > 0) {
			return this.fuckdoll;
		}
		// Master list of outfits with art. References the clothes property in the slave object.
		// See "slave variables documentation - Pregmod.txt" for the entire list of outfits
		let clothing = null;

		switch (this.slave.bellyAccessory) {
			case "a corset":
				clothing = this.joinSettings(clothing, this.corset);
				break;
			case "an extreme corset":
				clothing = this.joinSettings(clothing, this.corsetExtreme);
				break;
		}

		switch (this.slave.legAccessory) {
			// Can be disabled later if clothing incompatible
			case "short stockings":
				clothing = this.joinSettings(clothing, this.shortStockings);
				break;
			case "long stockings":
				clothing = this.joinSettings(clothing, this.longStockings);
				break;
		}

		switch (this.slave.clothes) {
			case "restrictive latex":
				clothing = this.joinSettings(clothing, this.restrictiveLatex);
				break;
			case "a latex catsuit":
				clothing = this.joinSettings(clothing, this.latexCatsuit);
				break;
			case "body oil":
				clothing = this.joinSettings(clothing, this.bodyOil);
				break;
			case "a comfortable bodysuit":
				clothing = this.joinSettings(clothing, this.bodysuit);
				break;
			case "a leotard":
				clothing = this.joinSettings(clothing, this.leotard);
				break;
			case "a ball gown":
				clothing = this.joinSettings(clothing, this.ballgown);
				break;
			case "a bra":
				clothing = this.joinSettings(clothing, this.bra);
				break;
			case "a button-up shirt":
				clothing = this.joinSettings(clothing, this.shirt);
				break;
			case "a button-up shirt and panties":
				clothing = this.joinSettings(clothing, this.shirt);
				clothing = this.joinSettings(clothing, this.panties);
				break;
			case "a cheerleader outfit":
				clothing = this.joinSettings(clothing, this.miniskirt);
				if (this.piecewiseClothing.miniskirt) {
					clothing = this.joinSettings(clothing, this.tanktop);
					clothing.styleSettings.top_primary.fill = clothing.styleSettings.bottoms_primary.fill;
					clothing.styleSettings.top_accent.fill = clothing.styleSettings.bottoms_accent.fill;
					clothing.styleSettings.shoe_primary.fill = clothing.styleSettings.bottoms_primary.fill;
					clothing.styleSettings.shoe_accent.fill = "#F7F7F7";
				}

				break;
			case "a fallen nuns habit":
				clothing = this.joinSettings(clothing, this.fallennun);
				if (this.piecewiseClothing.fallennun) {
					if (this.slave.devotion <= 20 && this.slave.trust <= 20) {
						clothing = this.joinSettings(clothing, this.panties);
						clothing.styleSettings.panties_primary = {fill: clothing.styleSettings.top_primary.fill, "fill-opacity": 0.5};
						clothing.styleSettings.panties_accent = {fill: clothing.styleSettings.top_accent.fill, "fill-opacity": 1};
					} else if (this.slave.devotion <= 50 && this.slave.trust <= 50) {
						clothing = this.joinSettings(clothing, this.thong);
						clothing.styleSettings.panties_primary = {fill: clothing.styleSettings.top_primary.fill, "fill-opacity": 0.5};
						clothing.styleSettings.panties_accent = {fill: clothing.styleSettings.top_accent.fill, "fill-opacity": 1};
					}
				}
				break;
			case "a nice maid outfit":
				clothing = this.joinSettings(clothing, this.miniskirt);
				if (this.piecewiseClothing.miniskirt) {
					clothing = this.joinSettings(clothing, this.niceMaid);
				}
				break;
			case "a monokini":
				clothing = this.joinSettings(clothing, this.monokini);
				break;
			case "a scalemail bikini":
				clothing = this.joinSettings(clothing, this.scalemailBot);
				clothing = this.joinSettings(clothing, this.scalemailTop);
				break;
			case "a schoolgirl outfit":
				clothing = this.joinSettings(clothing, this.shirt);
				if (this.slave.devotion <= 20) {
					clothing = this.joinSettings(clothing, this.schoolgirlSkirtNormal);
				} else {
					if (this.slave.devotion <= 50) {
						clothing = this.joinSettings(clothing, this.panties);
					} else if (this.slave.devotion <= 95) {
						clothing = this.joinSettings(clothing, this.thong);
					}
					clothing = this.joinSettings(clothing, this.schoolgirlSkirtShort);
				}
				break;
			case "a skimpy loincloth":
				clothing = this.joinSettings(clothing, this.loincloth);
				break;
			case "a slutty maid outfit":
				clothing = this.joinSettings(clothing, this.sluttyMaid);
				if (this.piecewiseClothing.sluttyMaid) {
					if (this.slave.devotion <= 20 && this.slave.trust <= 20) {
						clothing = this.joinSettings(clothing, this.bra);
						clothing.styleSettings.bra_primary = {fill: clothing.styleSettings.top_primary.fill, "fill-opacity": 1};
						clothing.styleSettings.bra_accent = {fill: clothing.styleSettings.top_accent.fill, "fill-opacity": 1};
					}
					if (this.slave.devotion <= 50 && this.slave.trust <= 50) {
						clothing = this.joinSettings(clothing, this.thong);
						clothing.styleSettings.panties_primary = {fill: clothing.styleSettings.top_primary.fill, "fill-opacity": 1};
						clothing.styleSettings.panties_accent = {fill: clothing.styleSettings.top_accent.fill, "fill-opacity": 1};
					}
				}
				break;
			case "a sports bra":
				clothing = this.joinSettings(clothing, this.sportsbra);
				break;
			case "a string bikini":
				clothing = this.joinSettings(clothing, this.stringbikiniBot);
				clothing = this.joinSettings(clothing, this.stringbikiniTop);
				break;
			case "a striped bra":
				clothing = this.joinSettings(clothing, this.stripedbra);
				break;
			case "a sweater":
				clothing = this.joinSettings(clothing, this.sweater);
				break;
			case "a sweater and cutoffs":
				clothing = this.joinSettings(clothing, this.sweater);
				clothing = this.joinSettings(clothing, this.cutoffs);
				break;
			case "a sweater and panties":
				clothing = this.joinSettings(clothing, this.sweater);
				clothing = this.joinSettings(clothing, this.panties);
				break;
			case "a tank-top":
				clothing = this.joinSettings(clothing, this.tanktop);
				break;
			case "a tank-top and panties":
				clothing = this.joinSettings(clothing, this.tanktop);
				clothing = this.joinSettings(clothing, this.panties);
				break;
			case "a thong":
				clothing = this.joinSettings(clothing, this.thong);
				break;
			case "a t-shirt":
				clothing = this.joinSettings(clothing, this.tshirt);
				break;
			case "a t-shirt and jeans":
				clothing = this.joinSettings(clothing, this.tshirt);
				clothing = this.joinSettings(clothing, this.jeans);
				break;
			case "a t-shirt and panties":
				clothing = this.joinSettings(clothing, this.tshirt);
				clothing = this.joinSettings(clothing, this.panties);
				break;
			case "a t-shirt and thong":
				clothing = this.joinSettings(clothing, this.tshirt);
				clothing = this.joinSettings(clothing, this.thong);
				break;
			case "a tube top":
				clothing = this.joinSettings(clothing, this.tubetop);
				break;
			case "a tube top and thong":
				clothing = this.joinSettings(clothing, this.tubetop);
				clothing = this.joinSettings(clothing, this.thong);
				break;
			case "an apron":
				clothing = this.joinSettings(clothing, this.apron);
				break;
			case "an oversized t-shirt":
				clothing = this.joinSettings(clothing, this.oversizedtshirt);
				break;
			case "an oversized t-shirt and boyshorts":
				clothing = this.joinSettings(clothing, this.oversizedtshirt);
				clothing = this.joinSettings(clothing, this.boyshorts);
				break;
			case "attractive lingerie":
				clothing = this.joinSettings(clothing, this.bra);
				clothing = this.joinSettings(clothing, this.thong);
				if (this.piecewiseClothing.thong) {
					clothing.styleSettings.shoe_primary.fill = clothing.styleSettings.panties_primary.fill;
					clothing.styleSettings.shoe_accent.fill = clothing.styleSettings.panties_accent.fill;
				}
				break;
			case "boyshorts":
				clothing = this.joinSettings(clothing, this.boyshorts);
				break;
			case "conservative clothing":
				clothing = this.joinSettings(clothing, this.suitpants);
				clothing = this.joinSettings(clothing, this.tanktop);
				clothing.styleSettings.top_primary.fill = "#F7F7F7";
				clothing = this.joinSettings(clothing, this.sweater);
				break;
			case "cutoffs":
				clothing = this.joinSettings(clothing, this.cutoffs);
				break;
			case "cutoffs and a t-shirt":
				clothing = this.joinSettings(clothing, this.tshirt);
				clothing = this.joinSettings(clothing, this.cutoffs);
				break;
			case "jeans":
				clothing = this.joinSettings(clothing, this.jeans);
				break;
			case "leather pants":
				clothing = this.joinSettings(clothing, this.leatherpants);
				break;
			case "leather pants and a tube top":
				clothing = this.joinSettings(clothing, this.leatherpants);
				clothing = this.joinSettings(clothing, this.tubetop);
				break;
			case "leather pants and pasties":
				clothing = this.joinSettings(clothing, this.leatherpants);
				clothing = this.joinSettings(clothing, this.pasties);
				break;
			case "nice business attire":
				clothing = this.joinSettings(clothing, this.shirt);
				clothing = this.joinSettings(clothing, this.skirt);
				break;
			case "overalls":
				clothing = this.joinSettings(clothing, this.jeans);
				clothing = this.joinSettings(clothing, this.overalls);
				break;
			case "panties":
				clothing = this.joinSettings(clothing, this.panties);
				break;
			case "pasties":
				clothing = this.joinSettings(clothing, this.pasties);
				break;
			case "panties and pasties":
				clothing = this.joinSettings(clothing, this.pasties);
				clothing = this.joinSettings(clothing, this.panties);
				break;
			case "shibari ropes":
				clothing = this.joinSettings(clothing, this.shibari);
				break;
			case "spats and a tank top":
				clothing = this.joinSettings(clothing, this.spats);
				clothing = this.joinSettings(clothing, this.tanktop);
				break;
			case "sport shorts":
				clothing = this.joinSettings(clothing, this.sportshorts);
				break;
			case "sport shorts and a sports bra":
				clothing = this.joinSettings(clothing, this.sportsbra);
				clothing = this.joinSettings(clothing, this.sportshorts);
				break;
			case "sport shorts and a t-shirt":
				clothing = this.joinSettings(clothing, this.tshirt);
				clothing = this.joinSettings(clothing, this.sportshorts);
				break;
			case "stretch pants and a crop-top":
				clothing = this.joinSettings(clothing, this.spats);
				clothing = this.joinSettings(clothing, this.croptop);
				break;
			case "striped panties":
				clothing = this.joinSettings(clothing, this.stripedpanties);
				break;
			case "striped underwear":
				clothing = this.joinSettings(clothing, this.stripedbra);
				clothing = this.joinSettings(clothing, this.stripedpanties);
				break;
			case "uncomfortable straps":
				clothing = this.joinSettings(clothing, this.straps);
				break;
		}

		// Disable stockings if the clothes are not compatible with them
		// (clothes made by coloring the skin)
		clothing = this.stockingCompatibility(clothing);

		return clothing;
	}

	joinSettings(a, b) {
		// Copies the bodySettings and styleSettings values from b into a, overwriting them
		if (a == null) {
			a = b;
		} else {
			for (const k in b.bodySettings) {
				a.bodySettings[k]=b.bodySettings[k];
			}
			for (const k in b.styleSettings) {
				a.styleSettings[k]=b.styleSettings[k];
			}
		}
		return a;
	}

	calcBellyLevel() {
		let bellyLevel = 0;
		if (this.slave.belly >= 120000) {
			bellyLevel = 9;
		} else if (this.slave.belly >= 90000) {
			bellyLevel = 8;
		} else if (this.slave.belly >= 50000) {
			bellyLevel = 7;
		} else if (this.slave.belly >= 30000) {
			bellyLevel = 6;
		} else if (this.slave.belly >= 15000) {
			bellyLevel = 5;
		} else if (this.slave.belly >= 10000) {
			bellyLevel = 4;
		} else if (this.slave.belly >= 5000) {
			bellyLevel = 3;
		} else if (this.slave.belly >= 1500) {
			bellyLevel = 2;
		} else if (this.slave.belly >= 500) {
			bellyLevel = 1;
		} else {
			bellyLevel = 0;
		}

		// bellyLevel = this.randomItem([0,1,2,3,4,5,6,7,8,9],0); // OVERWRITE TO SEE BELLY!!!

		// Overwrite belly size if wearing a corset
		if (this.slave.bellyAccessory === "a corset" ||
			this.slave.bellyAccessory === "an extreme corset") {
			let corsetBellySize = [0, 0, 0, 3, 3, 5, 5, 7, 8, 9];
			bellyLevel = corsetBellySize[bellyLevel];
		}

		return bellyLevel;
	}

	calcTorsoSize() {
		let torsoSize = "Normal";

		if (this.slave.waist < -40) {
			torsoSize = this.slave.weight > 30 ? "Hourglass" : "Unnatural";
		} else if (this.slave.waist <= 10) {
			torsoSize = this.slave.weight > 30 ? "Normal" : "Hourglass";
		} else {
			torsoSize = "Normal";
		}

		if (this.slave.bellyAccessory === "a corset") {
			torsoSize = "Hourglass";
		}
		if (this.slave.bellyAccessory === "an extreme corset") {
			torsoSize = "Unnatural";
		}

		return torsoSize;
	}

	/**
	 * This function must return a random item from the array in the input,
	 * but the index chosen must be constant for the same slave for the same week.
	 * Intended for an array of colors, but has other uses
	 * The idea is to make sure that the color for the same clothing remains
	 * the same for the same slave within a given week, so the color does not
	 * change upon image redraw.
	 * @template T
	 * @param {Array<T>} [possibleColors] array of strings representing colorSlave
	 * @param {number} [seedOffset] optional offset to the seed. Can be used to generate different results for different pieces of clothing
	 * @returns {T}
	 */
	randomItem(possibleColors = ['#FFFFFF'], seedOffset = 0) {
		const a = this.randomNumber(seedOffset);
		return possibleColors[Math.floor(a * possibleColors.length)];
	}

	/** This function must return a pseudo random number that is consistent for the
	 * same slave in the same week.
	 * To do this a pseudo random generator is used and called multiple times.
	 * First with the ID as seed, so the results are different for different slaves
	 * Second with lifetimeCashExpenses as seed, to get a number that changes from week to week
	 * And last with a seed calculated from the first two results and seedOffset
	 * @param {number} [seedOffset] optional offset to the seed. Can be used to generate different
	 * 							 results for different pieces of clothing
	 * @returns {number}
	 */
	randomNumber(seedOffset = 0) {
		let a = this.mulberry32(this.slave.ID); // Seed based on slave
		a += this.mulberry32(V.week); // Seed based on week
		return this.mulberry32(Math.floor(a * 4000000000) + seedOffset);
	}

	mulberry32(a) {
		// Pseudo-randomizer with seed
		let t = a += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}

	braStrapOpacity() {
		let opa = [0, 0, 0];
		let boobs = this.slave.boobs;
		if ((boobs >= 300 && boobs < 400) || // Small
			(boobs >= 600 && boobs <= 700) || // Medium_800
			(boobs > 1000 && boobs <= 1500) || // Medium_1500
			(boobs > 2500 && boobs <= 6500) || // Medium_7000
			(boobs >= 15000 && boobs < 25000)) { // Huge
			opa = [1, 0, 0]; // Use strap 1
		} else if ((boobs >= 500 && boobs < 600) ||
					(boobs >= 850 && boobs <= 1000) ||
					(boobs > 2000 && boobs <= 2500) ||
					(boobs >= 11000 && boobs < 15000) ||
					(boobs >= 35000 )) {
			opa = [0, 0, 1]; // Use strap 3
		} else {
			opa = [0, 1, 0]; // Use strap 2
		}
		return opa;
	}

	stockingCompatibility(clothing) {
		// These outfits are made by coloring the leg skin instead of adding a layer on top
		// They are not compatible with stockings, as there is nothing to go on top of the stockings
		if (this.slave.fuckdoll > 0 ||
			["restrictive latex", "a latex catsuit", "a comfortable bodysuit"].includes(this.slave.clothes) ||
			this.piecewiseClothing.spats) {
			this.accessories.longStockings = false;
			this.accessories.shortStockings = false;
			clothing.styleSettings.stockings_primary = {fill: "#000000", "fill-opacity": 0};
			clothing.styleSettings.stockings_accent = {fill: "#000000", "fill-opacity": 0};
		}
		return clothing;
	}

	get fuckdoll() {
		let defaultOutfitColor = "#515351";
		let areolaColor = "#383838";
		return {
			bodySettings: {
				showEyes: false,
				showPubic: false,
				showArmHair: false,
				showHair: false,
				showLegHighlight: true,
				showTorsoHighlight: true,
				showBoobsHighlight: true,
				showHeadHighlight: true
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				armSkin: {fill: defaultOutfitColor},
				penis: {fill: defaultOutfitColor},
				legsSkin: {fill: defaultOutfitColor},
				feetSkin: {fill: defaultOutfitColor},
				feet_nails: {"fill-opacity": 0},
				torso: {fill: defaultOutfitColor},
				buttSkin: {fill: defaultOutfitColor},
				head: {fill: defaultOutfitColor},
				neckSkin: {fill: defaultOutfitColor},
				boob: {fill: defaultOutfitColor},
				areola: {fill: areolaColor},
				labia: {fill: areolaColor},
				bellySkin: {fill: defaultOutfitColor},
				shoe_primary: {fill: defaultOutfitColor},
				shoe_accent: {fill: defaultOutfitColor},
				labiaSkin: {fill: defaultOutfitColor},
				lips: {fill: areolaColor}
			}
		};
	}

	get restrictiveLatex() {
		let defaultOutfitColor = "#515351";
		let areolaColor = "#383838";	// FIXME: unused variable
		return {
			bodySettings: {
				showEyes: false,
				showPubic: false,
				showArmHair: false,
				showHair: false,
				showLegHighlight: true,
				showTorsoHighlight: true,
				showBoobsHighlight: true,
				showHeadHighlight: true,
				showHeadPiercings: false,
				showBellyPiercings: false
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				armSkin: {fill: defaultOutfitColor},
				legsSkin: {fill: defaultOutfitColor},
				feetSkin: {fill: defaultOutfitColor},
				feet_nails: {"fill-opacity": 0},
				torso: {fill: defaultOutfitColor},
				buttSkin: {fill: defaultOutfitColor},
				head: {fill: defaultOutfitColor},
				neckSkin: {fill: defaultOutfitColor},
				bellySkin: {fill: defaultOutfitColor},
				shoe_primary: {fill: defaultOutfitColor},
				shoe_accent: {fill: defaultOutfitColor}
			}
		};
	}

	get latexCatsuit() {
		let defaultOutfitColor = "#515351";
		let areolaColor = "#383838";
		return {
			bodySettings: {
				showPubic: false,
				showArmHair: false,
				showLegHighlight: true,
				showTorsoHighlight: true,
				showBoobsHighlight: true,
				showHeadHighlight: true,
				showPussyPiercings: false,
				showPenisPiercings: false,
				showBellyPiercings: false,
				showNipplesPiercings: false
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				scrotum: {fill: defaultOutfitColor},
				armSkin: {fill: defaultOutfitColor},
				penis: {fill: defaultOutfitColor},
				legsSkin: {fill: defaultOutfitColor},
				feetSkin: {fill: defaultOutfitColor},
				feet_nails: {"fill-opacity": 0},
				torso: {fill: defaultOutfitColor},
				buttSkin: {fill: defaultOutfitColor},

				neckSkin: {fill: defaultOutfitColor},
				boob: {fill: defaultOutfitColor},
				areola: {fill: areolaColor},
				labia: {fill: areolaColor},
				bellySkin: {fill: defaultOutfitColor},
				shoe_primary: {fill: defaultOutfitColor},
				shoe_accent: {fill: defaultOutfitColor},
				labiaSkin: {fill: defaultOutfitColor}
			}
		};
	}

	get bodyOil() {
		return {
			bodySettings: {
				showLegHighlight: true,
				showTorsoHighlight: true,
				showBoobsHighlight: true,
				showHeadHighlight: true,
			},
			styleSettings: {

			}
		};
	}

	get bodysuit() {
		let defaultOutfitColor = "#162d50";
		return {
			bodySettings: {
				showPubic: false,
				showArmHair: false,
				showPussy: false,
				showPussyPiercings: false,
				showPenisPiercings: false,
				showBellyPiercings: false,
				showNipplesPiercings: false
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				scrotum: {fill: defaultOutfitColor},
				armSkin: {fill: defaultOutfitColor},
				penis: {fill: defaultOutfitColor},
				legsSkin: {fill: defaultOutfitColor},
				feetSkin: {fill: defaultOutfitColor},
				feet_nails: {"fill-opacity": 0},
				torso: {fill: defaultOutfitColor},
				buttSkin: {fill: defaultOutfitColor},
				boob: {fill: defaultOutfitColor},
				areola: {fill: defaultOutfitColor},
				bellySkin: {fill: defaultOutfitColor},
				shoe_primary: {fill: defaultOutfitColor},
				shoe_accent: {fill: defaultOutfitColor},
				muscleTone: {"fill-opacity": 0},
				bellyDetails: {"fill-opacity": 0}
			}
		};
	}

	get leotard() {
		let defaultOutfitColor = "#d35f8d";
		return {
			bodySettings: {
				showPubic: false,
				showArmHair: false,
				showPussy: false,
				showPussyPiercings: false,
				showPenisPiercings: false,
				showBellyPiercings: false,
				showNipplesPiercings: false,
				showNipples: false,
				showAreolae: false
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				scrotum: {fill: defaultOutfitColor},
				penis: {fill: defaultOutfitColor},
				torso: {fill: defaultOutfitColor},
				boob: {fill: defaultOutfitColor},
				areola: {fill: defaultOutfitColor},
				bellySkin: {fill: defaultOutfitColor},
				shoe_primary: {fill: "#111111"},
				muscleTone: {"fill-opacity": 0},
				bellyDetails: {"fill-opacity": 0}
			}
		};
	}

	get apron() {
		if (this.bellyLevel <= 2) {
			this.piecewiseClothing.apron = true;
			let strap = this.braStrapOpacity();
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					top_primary: {fill: "#F7F7F7", "fill-opacity": 1},
					top_accent: {fill: "#333333", "fill-opacity": 1},
					bra_strap1: {fill: "#F7F7F7", "fill-opacity": strap[0]},
					bra_strap2: {fill: "#F7F7F7", "fill-opacity": strap[1]},
					bra_strap3: {fill: "#F7F7F7", "fill-opacity": strap[2]},
					shoe_primary: {fill: "#784730", "fill-opacity": 1},
					shoe_accent: {fill: "#784730", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get ballgown() {
		this.piecewiseClothing.ballgown = true;
		return {
			bodySettings: {
				showPubic: false,
				showPussy: false,
				showButt: false,
				showPenis: false,
				showBalls: false,
				showPussyPiercings: false,
				showPenisPiercings: false,
				showNipplesPiercings: false
			},
			styleSettings: {
				top_primary: {fill: "#A60F1A", "fill-opacity": 1},
				top_accent: {fill: this.randomItem(this.colorsTshirt, 1199611), "fill-opacity": 1},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 119961), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get boyshorts() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.boyshorts = true;
			let col_pri = this.randomItem(this.colorsTshirt, 268746787);
			let col_acc = this.randomItem(this.colorsTshirt, 268746787222);
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showButt: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					panties_primary: {fill: col_pri, "fill-opacity": 1},
					panties_accent: {fill: col_acc, "fill-opacity": 1},
					shoe_primary: {fill: col_pri, "fill-opacity": 1},
					shoe_accent: {fill: col_acc, "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get bra() {
		this.piecewiseClothing.bra = true;
		let lace = this.randomItem([0, 1], 5889);
		let col = this.randomItem(this.colorsUnderwear);
		let pri_opa = 0.7+this.randomNumber(6751981)*0.3;
		let strap = this.braStrapOpacity();
		let pierc = this.slave.piercing.nipple.weight !== 2 && this.slave.piercing.areola.weight !== 2;
		if (lace === 1) {
			pri_opa = 0.5;
		}
		return {
			bodySettings: {
				showNipplesPiercings: pierc
			},
			styleSettings: {
				bra_primary: {fill: col, "fill-opacity": pri_opa},
				bra_accent: {fill: col, "fill-opacity": lace},
				bra_strap1: {"fill-opacity": strap[0]},
				bra_strap2: {"fill-opacity": strap[1]},
				bra_strap3: {"fill-opacity": strap[2]},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 5889), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}
	get croptop() {
		this.piecewiseClothing.croptop = true;
		let pierc = this.slave.piercing.nipple.weight !== 2 && this.slave.piercing.areola.weight !== 2;
		return {
			bodySettings: {
				showNipplesPiercings: pierc
			},
			styleSettings: {
				top_primary: {fill: this.randomItem(this.colorsTshirt, 119961), "fill-opacity": 1},
				top_accent: {fill: this.randomItem(this.colorsTshirt, 1199611), "fill-opacity": 1},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 119961), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get cutoffs() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.cutoffs = true;
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					bottoms_primary: {fill: this.randomItem(this.colorsJeans), "fill-opacity": 1},
					shoe_primary: {fill: this.randomItem(this.colorsShoes, 53168), "fill-opacity": 1},
					shoe_accent: {fill: "#111111", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get fallennun() {
		if (this.bellyLevel <= 0) {
			this.piecewiseClothing.fallennun = true;
			return {
				bodySettings: {
					showArmHair: false,
					showHair: false
				},
				styleSettings: {
					top_primary: {fill: "#414141", "fill-opacity": 1},
					top_accent: {fill: "#F7F7F7", "fill-opacity": 0.5},
					shoe_primary: {fill: "#414141", "fill-opacity": 1},
					shoe_accent: {fill: "#F7F7F7", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get jeans() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.jeans = true;
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showButt: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					bottoms_primary: {fill: this.randomItem(this.colorsJeans), "fill-opacity": 1},
					shoe_primary: {fill: this.randomItem(this.colorsShoes, 52168), "fill-opacity": 1},
					shoe_accent: {fill: "#111111", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get leatherpants() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.leatherpants = true;
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showButt: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					shoe_primary: {fill: this.randomItem(this.colorsShoes, 6218327), "fill-opacity": 1},
					shoe_accent: {fill: "#111111", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get loincloth() {
		this.piecewiseClothing.loincloth = true;
		return {
			bodySettings: {
				showPubic: false,
				showPussy: false,
				showPenis: false,
				showBalls: false,
				showPussyPiercings: false,
				showPenisPiercings: false
			},
			styleSettings: {
				shoe_primary: {fill: "#784730", "fill-opacity": 1},
				shoe_accent: {fill: "#784730", "fill-opacity": 1}
			}
		};
	}

	get miniskirt() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.miniskirt = true;
			let col = this.randomItem(this.colorsPastel, 646475478);
			return {
				bodySettings: {
					showPubic: false,
					showButt: false,
					showPussy: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					bottoms_primary: {fill: col, "fill-opacity": 1},
					bottoms_accent: {fill: col, "fill-opacity": 1},
					shoe_primary: {fill: this.randomItem(this.colorsShoes, 6464), "fill-opacity": 1},
					shoe_accent: {fill: "#111111", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get monokini() {
		this.piecewiseClothing.monokini = true;
		let col = this.randomItem(this.colorsBikini, 245464);
		let acc_col = this.randomItem(this.colorsBikini.filter(a => a !== col), 245464222);
		let strap = this.braStrapOpacity();
		if (this.bellyLevel <= 4) {
			return {
				bodySettings: {
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false,
					showNipplesPiercings: false
				},
				styleSettings: {
					panties_primary: {fill: col, "fill-opacity": 1},
					panties_accent: {fill: acc_col, "fill-opacity": 1},
					bra_primary: {fill: col, "fill-opacity": 1},
					bra_accent: {fill: acc_col, "fill-opacity": 1},
					bra_strap1: {"fill-opacity": strap[0]},
					bra_strap2: {"fill-opacity": strap[1]},
					bra_strap3: {"fill-opacity": strap[2]},
					shoe_primary: {fill: col, "fill-opacity": 1},
					shoe_accent: {fill: acc_col, "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get niceMaid() {
		this.piecewiseClothing.niceMaid = true;
		return {
			bodySettings: {
			},
			styleSettings: {
				bottoms_primary: {fill: "#F7F7F7", "fill-opacity": 1},
				bottoms_accent: {fill: "#333333", "fill-opacity": 1},
				top_primary: {fill: "#333333", "fill-opacity": 1},
				top_accent: {fill: "#F7F7F7", "fill-opacity": 1},
				shoe_primary: {fill: "#333333", "fill-opacity": 1},
				shoe_accent: {fill: "#F7F7F7", "fill-opacity": 1}
			}
		};
	}

	get overalls() {
		let strap = this.braStrapOpacity();
		let pri_col = this.randomItem(this.colorsJeans);
		if (this.bellyLevel <= 2) {
			this.piecewiseClothing.overalls = true;
			return {
				bodySettings: {
				},
				styleSettings: {
					top_primary: {fill: pri_col, "fill-opacity": 1},
					bra_strap1: {fill: pri_col, "fill-opacity": strap[0]},
					bra_strap2: {fill: pri_col, "fill-opacity": strap[1]},
					bra_strap3: {fill: pri_col, "fill-opacity": strap[2]}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get oversizedtshirt() {
		if (this.bellyLevel <= 4) {
			this.piecewiseClothing.oversizedtshirt = true;
			return {
				bodySettings: {
					showArmHair: false,
					showNipplesPiercings: false
				},
				styleSettings: {
					top_primary: {fill: this.randomItem(this.colorsTshirt, 6827119961), "fill-opacity": 1},
					top_accent: {fill: this.randomItem(this.colorsTshirt, 6827119961), "fill-opacity": 1},
					shoe_primary: {fill: this.randomItem(this.colorsShoes, 6827119961), "fill-opacity": 1},
					shoe_accent: {fill: "#111111", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get panties() {
		this.piecewiseClothing.panties = true;
		let lace = this.randomItem([0, 1], 5889);
		let col = this.randomItem(this.colorsUnderwear);
		let pri_opa = 0.7+this.randomNumber(6751981)*0.3;
		if (lace === 1) {
			pri_opa = 0.5;
		}
		return {
			bodySettings: {
				showPenis: false,
				showBalls: false,
				showPussyPiercings: false,
				showPenisPiercings: false
			},
			styleSettings: {
				panties_primary: {fill: col, "fill-opacity": pri_opa},
				panties_accent: {fill: col, "fill-opacity": lace},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 6168428), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get pasties() {
		this.piecewiseClothing.pasties = true;
		let opa = this.randomItem([0, 1], 4711841);
		return {
			bodySettings: {
				showNipples: false,
				showNipplesPiercings: false
			},
			styleSettings: {
				bra_primary: {fill: this.randomItem(this.colorsUnderwear), "fill-opacity": 1},
				bra_accent: {fill: this.randomItem(this.colorsUnderwear, 6711981), "fill-opacity": opa},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 6168428), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get scalemailBot() {
		this.piecewiseClothing.scalemailBot = true;
		return {
			bodySettings: {
				showPenis: false,
				showBalls: false,
				showPussyPiercings: false,
				showPenisPiercings: false
			},
			styleSettings: {
				shoe_primary: {fill: "#C0C6C7", "fill-opacity": 1},
				shoe_accent: {fill: "#784730", "fill-opacity": 1}
			}
		};
	}

	get scalemailTop() {
		this.piecewiseClothing.scalemailTop = true;
		let strap = this.braStrapOpacity();
		return {
			bodySettings: {
				showNipplesPiercings: false
			},
			styleSettings: {
				bra_accent: {fill: '#624A2E', "fill-opacity": 1},
				bra_strap1: {"fill-opacity": strap[0]},
				bra_strap2: {"fill-opacity": strap[1]},
				bra_strap3: {"fill-opacity": strap[2]}
			}
		};
	}

	get schoolgirlSkirtNormal() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.schoolgirlNormal = true;
			let st_pri = {fill: "#000000", "fill-opacity": 0};
			let st_acc = {fill: "#000000", "fill-opacity": 0};
			if (this.accessories.longStockings || this.accessories.shortStockings) {
				st_pri = {fill: "#F7F7F7", "fill-opacity": 0.3};
				st_acc = {fill: "#D20030", "fill-opacity": 1};
			}
			let sa = "#D20030";
			let sp = "#F7F7F7";
			switch (this.slave.shoes) {
				case "flats":
				case "platform shoes":
					break;
				case "boots":
					sp = "#784730";
					sa = "#222222";
					break;
				case "heels":
				case "pumps":
				case "platform heels":
				case "extreme heels":
				case "extreme platform heels":
					sp = "#222222";
					break;
			}
			return {
				bodySettings: {
					showPubic: false,
					showButt: false,
					showPussy: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					top_primary: {fill: "#F7F7F7"}, // always white
					top_accent: {fill: "#D20030"}, // always red
					stockings_primary: st_pri,
					stockings_accent: st_acc,
					shoe_primary: {fill: sp, "fill-opacity": 1},
					shoe_accent: {fill: sa, "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get schoolgirlSkirtShort() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.schoolgirlShort = true;
			let st_pri = {fill: "#000000", "fill-opacity": 0};
			let st_acc = {fill: "#000000", "fill-opacity": 0};
			if (this.accessories.longStockings || this.accessories.shortStockings) {
				st_pri = {fill: "#F7F7F7", "fill-opacity": 0.3};
				st_acc = {fill: "#D20030", "fill-opacity": 1};
			}
			let sa = "#F7F7F7";
			let sp = "#D20030";
			switch (this.slave.shoes) {
				case "flats":
				case "platform shoes":
					sp = "#D20030";
					break;
				case "boots":
					sp = "#784730";
					sa = "#222222";
					break;
				case "heels":
				case "pumps":
				case "platform heels":
				case "extreme heels":
				case "extreme platform heels":
					sp = "#222222";
					break;
			}
			return {
				bodySettings: {
				},
				styleSettings: {
					top_primary: {fill: "#F7F7F7"}, // always white
					top_accent: {fill: "#D20030"}, // always red
					stockings_primary: st_pri,
					stockings_accent: st_acc,
					shoe_primary: {fill: sp, "fill-opacity": 1},
					shoe_accent: {fill: sa, "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get shibari() {
		if (this.bellyLevel <= 5) {
			this.piecewiseClothing.shibari = true;
		}
		return {
			bodySettings: {
			},
			styleSettings: {
			}
		};
	}

	get shirt() {
		this.piecewiseClothing.shirt = true;
		let center = this.braStrapOpacity();
		return {
			bodySettings: {
				showArmHair: false,
				showBoobs: false,
			},
			styleSettings: {
				shirt_center1: {opacity: center[0]},
				shirt_center2: {opacity: center[1]},
				shirt_center3: {opacity: center[2]},
				bra_primary: {fill: "#343434", "fill-opacity": 1},
				bra_accent: {fill: "#808080", "fill-opacity": 1},
				top_primary: {fill: this.randomItem(this.colorsShirt, 19961), "fill-opacity": 1},
				shoe_primary: {fill: this.randomItem(this.colorsShirt, 85589), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get skirt() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.skirt = true;
			// let col = this.randomItem(this.colorsPastel,646475478);
			let col = this.randomItem(this.colorsTshirt, 646475478);
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					bottoms_primary: {fill: col, "fill-opacity": 1},
					buttSkin: {fill: col},
					shoe_primary: {fill: this.randomItem(this.colorsShirt, 84589), "fill-opacity": 1},
					shoe_accent: {fill: "#111111", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get sluttyMaid() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.sluttyMaid = true;
			return {
				bodySettings: {
				},
				styleSettings: {
					bottoms_primary: {fill: "#F7F7F7", "fill-opacity": 1},
					bottoms_accent: {fill: "#333333", "fill-opacity": 1},
					top_primary: {fill: "#333333", "fill-opacity": 1},
					top_accent: {fill: "#F7F7F7", "fill-opacity": 1},
					shoe_primary: {fill: "#333333", "fill-opacity": 1},
					shoe_accent: {fill: "#F7F7F7", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get spats() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.spats = true;
			let col_pri = this.randomItem(this.colorsTshirt, 76177);
			let col_acc = this.randomItem(this.colorsTshirt, 76177222);
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					bottoms_primary: {fill: col_pri, "fill-opacity": 1},
					bottoms_accent: {fill: col_acc, "fill-opacity": 1},
					legsSkin: {fill: col_pri},
					buttSkin: {fill: col_pri},
					shoe_primary: {fill: col_acc, "fill-opacity": 1},
					shoe_accent: {fill: col_pri, "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get sportsbra() {
		this.piecewiseClothing.sportsbra = true;
		let col = this.randomItem(this.colorsSport, 77678);
		let acc_col = this.randomItem(['#222222', '#DDDDDD'], 77678222);
		let strap = this.braStrapOpacity();
		let pierc = this.slave.piercing.nipple.weight !== 2 && this.slave.piercing.areola.weight !== 2;
		return {
			bodySettings: {
				showNipplesPiercings: pierc
			},
			styleSettings: {
				bra_primary: {fill: col, "fill-opacity": 1},
				bra_accent: {fill: acc_col, "fill-opacity": 1},
				bra_strap1: {"fill-opacity": strap[0]},
				bra_strap2: {"fill-opacity": strap[1]},
				bra_strap3: {"fill-opacity": strap[2]},
				shoe_primary: {fill: col, "fill-opacity": 1},
				shoe_accent: {fill: acc_col, "fill-opacity": 1}
			}
		};
	}

	get sportshorts() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.sportshorts = true;
			let col = this.randomItem(this.colorsSport, 77678);
			let acc_col = this.randomItem(['#222222', '#DDDDDD'], 77678222);
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showButt: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					bottoms_primary: {fill: col, "fill-opacity": 1},
					bottoms_accent: {fill: acc_col, "fill-opacity": 1},
					shoe_primary: {fill: col, "fill-opacity": 1},
					shoe_accent: {fill: acc_col, "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get straps() {
		if (this.bellyLevel <= 9) {
			this.piecewiseClothing.straps = true;
		}
		return {
			bodySettings: {
			},
			styleSettings: {
				shoe_primary: {fill: '#222222', "fill-opacity": 1},
				shoe_accent: {fill: '#C0C6C7', "fill-opacity": 1}
			}
		};
	}

	get stringbikiniBot() {
		this.piecewiseClothing.stringbikiniBot = true;
		let col = this.randomItem(this.colorsBikini, 245464);
		let acc_col = this.randomItem(this.colorsBikini.filter(a => a !== col), 245464222);
		return {
			bodySettings: {
				showPenis: false,
				showBalls: false,
				showPussyPiercings: false,
				showPenisPiercings: false
			},
			styleSettings: {
				panties_primary: {fill: col, "fill-opacity": 1},
				panties_accent: {fill: acc_col, "fill-opacity": 1},
				shoe_primary: {fill: col, "fill-opacity": 1},
				shoe_accent: {fill: acc_col, "fill-opacity": 1}
			}
		};
	}

	get stringbikiniTop() {
		this.piecewiseClothing.stringbikiniTop = true;
		let col = this.randomItem(this.colorsBikini, 245464);
		let acc_col = this.randomItem(this.colorsBikini.filter(a => a !== col), 245464222);
		let strap = this.braStrapOpacity();
		return {
			bodySettings: {
				showNipplesPiercings: false
			},
			styleSettings: {
				bra_primary: {fill: col, "fill-opacity": 1},
				bra_accent: {fill: acc_col, "fill-opacity": 1},
				bra_strap1: {"fill-opacity": strap[0]},
				bra_strap2: {"fill-opacity": strap[1]},
				bra_strap3: {"fill-opacity": strap[2]},
				shoe_primary: {fill: col, "fill-opacity": 1},
				shoe_accent: {fill: acc_col, "fill-opacity": 1}
			}
		};
	}

	get stripedbra() {
		this.piecewiseClothing.stripedbra = true;
		let bow = this.randomItem([0, 1], 263);
		let col = this.randomItem(this.colorsStripes, 7774737);
		let bow_col = this.randomItem(this.colorsStripes.filter(a => a !== col), 7774737269);
		let pierc = this.slave.piercing.nipple.weight !== 2 && this.slave.piercing.areola.weight !== 2;
		let strap = this.braStrapOpacity();
		return {
			bodySettings: {
				showNipplesPiercings: pierc
			},
			styleSettings: {
				bra_primary: {fill: col, "fill-opacity": 1},
				bra_accent: {fill: bow_col, "fill-opacity": bow},
				bra_strap1: {"fill-opacity": strap[0]},
				bra_strap2: {"fill-opacity": strap[1]},
				bra_strap3: {"fill-opacity": strap[2]},
				shoe_primary: {fill: "#F7F7F7", "fill-opacity": 1},
				shoe_accent: {fill: col, "fill-opacity": 1}
			}
		};
	}

	get stripedpanties() {
		this.piecewiseClothing.stripedpanties = true;
		let bow = this.randomItem([0, 1], 263);
		let col = this.randomItem(this.colorsStripes, 7774737);
		let bow_col = this.randomItem(this.colorsStripes.filter(a => a !== col), 7774737269);
		return {
			bodySettings: {
				showPenis: false,
				showBalls: false,
				showPussyPiercings: false,
				showPenisPiercings: false
			},
			styleSettings: {
				panties_primary: {fill: col, "fill-opacity": 1},
				panties_accent: {fill: bow_col, "fill-opacity": bow},
				shoe_primary: {fill: "#F7F7F7", "fill-opacity": 1},
				shoe_accent: {fill: col, "fill-opacity": 1}
			}
		};
	}

	get suitpants() {
		if (this.bellyLevel <= 7) {
			this.piecewiseClothing.suitpants = true;
			return {
				bodySettings: {
					showPubic: false,
					showPussy: false,
					showButt: false,
					showPenis: false,
					showBalls: false,
					showPussyPiercings: false,
					showPenisPiercings: false
				},
				styleSettings: {
					bottoms_primary: {fill: "#A0A0A0", "fill-opacity": 1},
					shoe_primary: {fill: "#784730", "fill-opacity": 1},
					shoe_accent: {fill: "#111111", "fill-opacity": 1}
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get sweater() {
		this.piecewiseClothing.sweater = true;
		return {
			bodySettings: {
				showArmHair: false,
				showNipplesPiercings: false
			},
			styleSettings: {
				top_primary: {fill: this.randomItem(this.colorsPastel, 119961), "fill-opacity": 1},
				top_accent: {fill: "#757d83", "fill-opacity": 1},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 8921828), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get tanktop() {
		this.piecewiseClothing.tanktop = true;
		this.bellyMaskOpa = 0.5;
		return {
			bodySettings: {
				showNipplesPiercings: false
			},
			styleSettings: {
				top_primary: {fill: this.randomItem(this.colorsTshirt, 119961), "fill-opacity": 1},
				top_accent: {fill: this.randomItem(this.colorsTshirt, 1199611), "fill-opacity": 1},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 8164867), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get thong() {
		this.piecewiseClothing.thong = true;
		let lace = this.randomItem([0, 1], 5889);
		let col = this.randomItem(this.colorsUnderwear);
		let pri_opa = 0.7+this.randomNumber(6751981)*0.3;
		if (lace === 1) {
			pri_opa = 0.5;
		}
		return {
			bodySettings: {
				showPenis: false,
				showBalls: false,
				showPussyPiercings: false,
				showPenisPiercings: false
			},
			styleSettings: {
				panties_primary: {fill: col, "fill-opacity": pri_opa},
				panties_accent: {fill: col, "fill-opacity": lace},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 865664), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get tshirt() {
		this.piecewiseClothing.tshirt = true;
		this.bellyMaskOpa = 0.5;
		return {
			bodySettings: {
				showArmHair: false,
				showNipplesPiercings: false

			},
			styleSettings: {
				top_primary: {fill: this.randomItem(this.colorsTshirt, 119961), "fill-opacity": 1},
				top_accent: {fill: this.randomItem(this.colorsTshirt, 1199611), "fill-opacity": 1},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 119961), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get tubetop() {
		this.piecewiseClothing.tubetop = true;
		this.bellyMaskOpa = 0.5;
		return {
			bodySettings: {
				showNipplesPiercings: false
			},
			styleSettings: {
				top_primary: {fill: this.randomItem(this.colorsTshirt, 119961), "fill-opacity": 1},
				top_accent: {fill: this.randomItem(this.colorsTshirt, 1199611), "fill-opacity": 1},
				shoe_primary: {fill: this.randomItem(this.colorsShoes, 119961), "fill-opacity": 1},
				shoe_accent: {fill: "#111111", "fill-opacity": 1}
			}
		};
	}

	get corset() {
		if (this.bellyLevel <= 5) {
			this.accessories.corset = true;
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get corsetExtreme() {
		if (this.bellyLevel <= 5) {
			this.accessories.corsetExtreme = true;
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		} else {
			return {
				bodySettings: {
				},
				styleSettings: {
				}
			};
		}
	}

	get longStockings() {
		this.accessories.longStockings = true;
		return {
			bodySettings: {
			},
			styleSettings: {
				stockings_primary: {fill: "#000000", "fill-opacity": 0.2},
				stockings_accent: {fill: "#000000", "fill-opacity": 0}
			}
		};
	}

	get shortStockings() {
		this.accessories.shortStockings = true;
		return {
			bodySettings: {
			},
			styleSettings: {
				stockings_primary: {fill: "#000000", "fill-opacity": 0.2},
				stockings_accent: {fill: "#000000", "fill-opacity": 0}
			}
		};
	}
}

class RevampedArtControl {
	constructor(artDisplayClass, artSlave, globalShowHighlights, globalShowBodyMods) {
		this.artDisplayClass = artDisplayClass;
		this.artSlave = artSlave;
		this.boobRightArtTransform = "";
		this.boobLeftArtTransform = "";
		this.boobOutfitArtTransform = "";
		this.braA_ArtTransform = "";
		this.braB_ArtTransform = "";

		this.boobOutfitMatrix = [0, 0, 0, 0, 0, 0];

		this.clothingControl = new ClothingControl();
		const clothing = this.clothingControl.clothingForSlave(this.artSlave);

		this.showArmHair = true;
		this.showHair = true;
		this.showButt = true;
		this.showPussy = true;
		this.showPubic = true;
		this.showChastityVaginal = true;
		this.showChastityAnal = true;
		this.showBalls = true;
		this.showPenis = true;
		this.showNipples = true;
		this.showAreolae = true;
		this.showBoobs = true;
		this.showEyes = true;
		this.showMouth = true;
		this.showBelly = true;

		this.leftArmType = this.getLeftArmPosition;
		this.rightArmType = this.getRightArmPosition;

		this.hairLength = this.getHairLength;
		this.torsoSize = this.clothingControl.torsoSize;
		this.bellyLevel = this.clothingControl.bellyLevel;
		this.legSize = this.getLegSize;

		if (this.bellyLevel >= 8) {
			// Belly hides penis
			this.showBalls = false;
			this.showPenis = false;
		}

		this.showLegHighlight = false;
		this.showTorsoHighlight = false;
		this.showBoobsHighlight = false;
		this.showHeadHighlight = false;

		this.showPussyPiercings = true;
		this.showBellyPiercings = true;
		this.showPenisPiercings = true;
		this.showNipplesPiercings = true;
		this.showHeadPiercings = true;

		this.pubicTattooText = "";

		if (clothing && clothing.bodySettings) {
			Object.assign(this, clothing.bodySettings);
		}

		if (!globalShowHighlights) {
			this.showLegHighlight = false;
			this.showTorsoHighlight = false;
			this.showBoobsHighlight = false;
			this.showHeadHighlight = false;
		}
		if (!globalShowBodyMods) {
			this.showPussyPiercings = false;
			this.showBellyPiercings = false;
			this.showPenisPiercings = false;
			this.showNipplesPiercings = false;
			this.showHeadPiercings = false;
		}
	}

	get getHairLength() {
		let result = "Short";
		if (this.artSlave.hLength >= 80) {
			result = "Long";
		} else if (this.artSlave.hLength >= 40) {
			result = "Medium";
		} else {
			result = "Short";
		}

		return result;
	}

	get getLeftArmPosition() {
		let leftArmType = "Low";

		if (this.artSlave.devotion > 50) {
			leftArmType = "High";
		} else if (this.artSlave.trust >= -20) {
			if (this.artSlave.devotion <= 20) {
				leftArmType = "Low";
			} else {
				leftArmType = "Mid";
			}
		} else {
			leftArmType = "Mid";
		}
		if (!hasLeftArm(this.artSlave)) {
			leftArmType= "";
		}

		return leftArmType;
	}

	get getRightArmPosition() {
		let rightArmType = "Low";

		if (this.artSlave.devotion > 50) {
			rightArmType = "High";
		} else if (this.artSlave.trust >= -20) {
			if (this.artSlave.devotion <= 20) {
				rightArmType = "Low";
			} else {
				rightArmType = "High";
			}
		} else {
			rightArmType = "Mid";
		}
		if (!hasRightArm(this.artSlave)) {
			rightArmType= "";
		}

		return rightArmType;
	}

	get getLegSize() {
		let legSize = "Normal";
		if (this.artSlave.hips < 0) {
			legSize = this.artSlave.weight > 95 ? "Normal" : "Narrow";
		} else if (this.artSlave.hips === 0) {
			legSize = this.artSlave.weight > 95 ? "Wide" : "Normal";
		} else if (this.artSlave.hips > 0) {
			legSize = "Wide";
		}

		return legSize;
	}

	get hairBackLayer() {
		let result = [];

		if (!this.showHair) {
			return result;
		}

		if (this.artSlave.hLength === 0) {
			return result;
		}

		switch (this.artSlave.hStyle) {
			case "neat":
				result.push(`Art_Vector_Revamp_Hair_Back_Neat_${this.hairLength}`);
				break;
			case "bun":
			case "up":
				result.push(`Art_Vector_Revamp_Hair_Back_Bun_${this.hairLength}`);
				break;
			case "tails":
				result.push(`Art_Vector_Revamp_Hair_Back_Tails_${this.hairLength}`);
				break;
			case "ponytail":
				result.push(`Art_Vector_Revamp_Hair_Back_Ponytail_${this.hairLength}`);
				break;
			case "braided":
				result.push(`Art_Vector_Revamp_Hair_Back_Braids_${this.hairLength}`);
				break;
			case "curled":
				result.push(`Art_Vector_Revamp_Hair_Back_Curled_${this.hairLength}`);
				break;
			case "cornrows":
				result.push(`Art_Vector_Revamp_Hair_Back_Cornrows_${this.hairLength}`);
				break;
			case "strip":
				result.push(`Art_Vector_Revamp_Hair_Back_Shaved_Sides_${this.hairLength}`);
				break;
			case "luxurious":
				result.push(`Art_Vector_Revamp_Hair_Back_Luxurious_${this.hairLength}`);
				break;
			case "afro":
				result.push(`Art_Vector_Revamp_Hair_Back_Afro_${this.hairLength}`);
				break;
			case "permed":
				result.push(`Art_Vector_Revamp_Hair_Back_Permed_${this.hairLength}`);
				break;
			case "dreadlocks":
				result.push(`Art_Vector_Revamp_Hair_Back_Dreadlocks_${this.hairLength}`);
				break;
			default:
				result.push(`Art_Vector_Revamp_Hair_Back_Messy_${this.hairLength}`);
		}

		return result;
	}

	get headdressBackLayer() {
		let result = [];

		if (this.clothingControl.piecewiseClothing.fallennun) {
			result.push(`Art_Vector_Revamp_Headdress_Back_Nun`);
		}

		return result;
	}

	get armLayer() {
		let result = [];

		if (!hasAnyArms(this.artSlave)) {
			result.push("Art_Vector_Revamp_Arm_Stump");
		} else {
			if (hasLeftArm(this.artSlave)) {
				result.push(`Art_Vector_Revamp_Arm_Left_${this.leftArmType}`);
			}
			if (hasRightArm(this.artSlave)) {
				result.push(`Art_Vector_Revamp_Arm_Right_${this.rightArmType}`);
			}
		}

		if (this.showArmHair && (!hasAnyArms(this.artSlave) || (this.leftArmType === "High"))) {
			switch (this.artSlave.underArmHStyle) {
				case "bushy":
					result.push("Art_Vector_Revamp_Arm_Up_Hair_Bushy");
					break;
				case "neat":
					result.push("Art_Vector_Revamp_Arm_Up_Hair_Neat");
					break;
				default:
			}
		}

		return result;
	}

	get buttLayer() {
		let result = [];
		let buttSize = 0;
		if (!hasAnyLegs(this.artSlave) || !this.showButt) {
			return result;
		}

		if (this.artSlave.butt > 6) {
			buttSize = 3;
		} else if (this.artSlave.butt > 4) {
			buttSize = 2;
		} else if (this.artSlave.butt > 2) {
			buttSize = 1;
		} else {
			buttSize = 0;
		}

		result.push(`Art_Vector_Revamp_Butt_${buttSize}`);

		return result;
	}

	get legLayer() {
		let result = [];

		if (!hasAnyLegs(this.artSlave)) {
			result.push("Art_Vector_Revamp_Stump");
		} else {
			result.push(`Art_Vector_Revamp_Leg_${this.legSize}`);

			if (this.showLegHighlight) {
				result.push("Art_Vector_Revamp_Leg_Highlights2");
				result.push("Art_Vector_Revamp_Leg_Highlights1");
			}
		}

		if (this.clothingControl.accessories.shortStockings) {
			result.push(`Art_Vector_Revamp_Leg_Accessory_ShortStocking`);
		}
		if (this.clothingControl.accessories.longStockings) {
			result.push(`Art_Vector_Revamp_Leg_Accessory_LongStocking`);
		}

		return result;
	}

	get feetLayer() {
		let result = [];
		let OutfitSandal = [];
		let OutfitTrainer = [];
		let OutfitSlim = [];
		let variant = 'Comf';

		if (!hasAnyLegs(this.artSlave)) {
			return result;
		}

		switch (this.artSlave.shoes) {
			case "heels":
			case "pumps":
			case "platform heels": {
				// Heels, Pumps, and Platform Heels
				const ShoeType = (this.artSlave.shoes === "pumps") ? ("Pumps") : ("Heel");

				OutfitSandal = ["a toga", "shibari ropes", "no clothing"];
				OutfitSlim = ["attractive lingerie", "kitty lingerie", "attractive lingerie for a pregnant woman",
					"a succubus outfit", "a fallen nuns habit", "a chattel habit", "a string bikini", "clubslut netting",
					"a slave gown", "slutty business attire", "nice business attire", "a ball gown", "a halter top dress",
					"a nice pony outfit", "a slutty pony outfit", "leather pants and pasties", "leather pants",
					"leather pants and a tube top", "a bunny outfit", "a courtesan dress"];
				OutfitTrainer = ["body oil", "striped panties", "a cheerleader outfit", "cutoffs and a t-shirt",
					"spats and a tank top", "a sports bra", "sport shorts and a t-shirt", "sport shorts", "sport shorts and a sports bra", "a leotard"];

				// Select shoe type based on description in footwear.js
				if (OutfitSandal.includes(this.artSlave.clothes)) {
					variant = 'Sandal';
				} else if (OutfitSlim.includes(this.artSlave.clothes)) {
					variant = 'Slim';
				} else if (OutfitTrainer.includes(this.artSlave.clothes)) {
					variant = 'Trainer';
				}
				result.push(`Art_Vector_Revamp_Shoes_${ShoeType}_${variant}`);
				if (this.artSlave.shoes === "platform heels") {
					result.push(`Art_Vector_Revamp_Shoes_Platform_Heel_${variant}`);
				}
				break;
			}
			case "extreme heels":
			case "extreme platform heels":
			// Extreme Heels and Extreme Platform Heels
				OutfitTrainer = ["striped panties", "a cheerleader outfit", "spats and a tank top", "a sports bra", "sport shorts and a t-shirt",
					"sport shorts", "sport shorts and a sports bra", "a leotard", "a schoolgirl outfit"];
				OutfitSandal = ["a toga", "a huipil", "a skimpy loincloth", "uncomfortable straps",
					"uncomfortable straps", "shibari ropes", "a maternity dress", "stretch pants and a crop-top", "a succubus outfit",
					"a chattel habit", "a penitent nuns habit", "a string bikini", "a scalemail bikini", "a slave gown",
					"a one-piece swimsuit", "a monokini", "a bunny outfit", "harem gauze", "slutty jewelry"];
				// Select shoe type based on description in footwear.js
				if (OutfitSandal.includes(this.artSlave.clothes)) {
					variant = 'Sandal';
				} else if (OutfitTrainer.includes(this.artSlave.clothes)) {
					variant = 'Trainer';
				}
				result.push(`Art_Vector_Revamp_Shoes_Exterme_Heel_${variant}`);
				if (this.artSlave.shoes === "extreme platform heels") {
					result.push(`Art_Vector_Revamp_Shoes_Platform_Exterme_Heel_${variant}`);
				}
				break;
			case "boots": {
				let pants = "Bare";
				if (this.clothingControl.piecewiseClothing.jeans || this.clothingControl.piecewiseClothing.leatherpants) {
					pants = "Pants";
				}
				variant = `Leather_${this.legSize}_${pants}`;

				let OutfitThigh = ["body oil", "a huipil", "a latex catsuit", "a succubus outfit", "a fallen nuns habit",
					"a chattel habit", "a string bikini", "clubslut netting", "slutty business attire", "nice business attire",
					"a mini dress", "a burkini", "a one-piece swimsuit", "an apron", "a Santa dress", "a slutty nurse outfit", "a long qipao",
					"a slutty nurse outfit", "no clothing"];
				OutfitTrainer = ["striped panties", "a cheerleader outfit", "spats and a tank top", "a sports bra", "sport shorts and a t-shirt",
					"sport shorts", "sport shorts and a sports bra", "a leotard"];
				let OutfitUtility = ["chains", "overalls", "a military uniform", "a police uniform", "a schutzstaffel uniform", "a penitent nuns habit",
					"a slutty schutzstaffel uniform", "a red army uniform", "a mounty outfit", "battlearmor", "Imperial Plate", "battledress"];
				let OutfitAncle = ["attractive lingerie", "kitty lingerie", "attractive lingerie for a pregnant woman",
					"stretch pants and a crop-top", "cutoffs and a t-shirt", "a ball gown", "a nice maid outfit", "slutty jewelry"];

				if (this.clothingControl.piecewiseClothing.suitpants) {
					variant = 'Suit';
				} else if (this.artSlave.clothes === "Western clothing") {
					variant = 'Cowboy';
				} else if (OutfitThigh.includes(this.artSlave.clothes)) {
					variant = `Thigh_${this.legSize}`;
				} else if (OutfitTrainer.includes(this.artSlave.clothes)) {
					variant = 'Trainer';
				} else if (OutfitUtility.includes(this.artSlave.clothes)) {
					variant = 'Utility';
				} else if (OutfitAncle.includes(this.artSlave.clothes)) {
					variant = 'Ancle';
				}
				result.push(`Art_Vector_Revamp_Shoes_Boot_${variant}`);
				break;
			}
			case "flats":
			case "platform shoes":
				// Flats and Platform Shoes
				OutfitSandal = ["conservative clothing", "a toga", "a huipil", "a skimpy loincloth", "uncomfortable straps",
					"uncomfortable straps", "shibari ropes", "a maternity dress", "stretch pants and a crop-top", "a succubus outfit",
					"a chattel habit", "a penitent nuns habit", "a string bikini", "a scalemail bikini", "a slave gown",
					"a one-piece swimsuit", "a monokini", "a bunny outfit", "harem gauze", "slutty jewelry"];
				OutfitTrainer = ["overalls", "body oil", "striped panties", "a cheerleader outfit", "cutoffs and a t-shirt",
					"spats and a tank top", "a sports bra", "sport shorts and a t-shirt", "sport shorts",
					"sport shorts and a sports bra", "a leotard", "a schoolgirl outfit"];
				// Select shoe type based on description in footwear.js
				if (OutfitSandal.includes(this.artSlave.clothes)) {
					variant = 'Sandal';
				} else if (OutfitTrainer.includes(this.artSlave.clothes)) {
					variant = 'Trainer';
				}
				result.push(`Art_Vector_Revamp_Shoes_Flat_${variant}`);
				if (this.artSlave.shoes === "platform shoes") {
					result.push(`Art_Vector_Revamp_Shoes_Platform_${variant}`);
				}
				break;
			default:
				result.push("Art_Vector_Revamp_Feet");
		}

		return result;
	}

	get torsoLayer() {
		let result = [];

		result.push(`Art_Vector_Revamp_Torso_${this.torsoSize}`);
		result.push("Art_Vector_Revamp_Clavicle");
		if (this.showTorsoHighlight) {
			result.push("Art_Vector_Revamp_Torso_Highlights2");
			result.push("Art_Vector_Revamp_Torso_Highlights1");
		}

		if (this.showArmHair && this.leftArmType !== "High" && hasAnyArms(this.artSlave)) {
			switch (this.artSlave.underArmHStyle) {
				case "bushy":
					result.push("Art_Vector_Revamp_Arm_Down_Hair_Bushy");
					break;
				case "neat":
					result.push("Art_Vector_Revamp_Arm_Down_Hair_Neat");
					break;
				default:
			}
		}

		return result;
	}

	get pussyLayer() {
		let result = [];

		if (this.showPussy && this.artSlave.vagina >= 0) {
			result.push("Art_Vector_Revamp_Pussy");
		}

		return result;
	}

	get pubicLayer() {
		let result = [];

		if (!this.showPubic) {
			return result;
		}

		const pubertyAge = Math.min(this.artSlave.pubertyAgeXX, this.artSlave.pubertyAgeXY);
		// TODO: Wispy pubic hair for the year before puberty
		if (this.artSlave.physicalAge < pubertyAge) {
			return result;
		}

		if (this.artSlave.vaginaTat === "rude words") {
			this.pubicTattooText = this.artSlave.dick !== 0 ? "Useless" : "Fucktoy";
			result.push("Art_Vector_Revamp_Pussy_Tattoo");
		}
		switch (this.artSlave.pubicHStyle) {
			case "strip":
			case "in a strip":
				result.push("Art_Vector_Revamp_Pubic_Hair_Strip");
				break;
			case "bushy":
			case "bushy in the front and neat in the rear":
			case "very bushy":
				result.push("Art_Vector_Revamp_Pubic_Hair_Bush");
				break;
			case "neat":
				result.push("Art_Vector_Revamp_Pubic_Hair_Neat");
				break;
			case "waxed":
				break;
			default:
		}

		return result;
	}

	get pussyPiercingsLayer() {
		let result = [];

		if (!this.showPussyPiercings) {
			return result;
		}

		if (this.artSlave.piercing.vagina.weight === 1) {
			result.push("Art_Vector_Revamp_Pussy_Piercing");
		} else if (this.artSlave.piercing.vagina.weight === 2) {
			result.push("Art_Vector_Revamp_Pussy_Piercing_Heavy");
		}

		if (this.artSlave.piercing.genitals.smart === true) {
			result.push("Art_Vector_Revamp_Clit_Piercing_Smart");
		} else if (this.artSlave.piercing.genitals.weight === 1) {
			result.push("Art_Vector_Revamp_Clit_Piercing");
		} else if (this.artSlave.piercing.genitals.weight === 2) {
			result.push("Art_Vector_Revamp_Clit_Piercing_Heavy");
		}

		return result;
	}

	get chastityBeltLayer() {
		let result = [];

		let isChastityAnalWorn = this.artSlave.chastityAnus === 1;

		isChastityAnalWorn = isChastityAnalWorn && this.showChastityAnal;

		let isChastityVaginalWorn = this.artSlave.chastityVagina === 1;

		isChastityVaginalWorn = isChastityVaginalWorn && this.showChastityVaginal;

		if (isChastityAnalWorn) {
			result.push("Art_Vector_Revamp_Chastity_Anus");
		}

		if (isChastityVaginalWorn) {
			result.push("Art_Vector_Revamp_Chastity_Vagina");
		}

		if (isChastityAnalWorn || isChastityVaginalWorn) {
			result.push("Art_Vector_Revamp_Chastity_Base");
		}

		return result;
	}

	get armOutfitLayerRight() {
		return this.armOutfitLayer('Right');
	}

	get armOutfitLayerLeft() {
		return this.armOutfitLayer('Left');
	}

	/** @param {'Left'|'Right'} arm */
	armOutfitLayer(arm) {
		let result = [];
		let outfit = '';
		let useMid = true;

		if (this.clothingControl.piecewiseClothing.croptop ||
			this.clothingControl.piecewiseClothing.tshirt ||
			this.clothingControl.piecewiseClothing.oversizedtshirt) {
			outfit = 'Shirt_Short';
			useMid = false;
		}

		if (this.clothingControl.piecewiseClothing.niceMaid ||
			this.clothingControl.piecewiseClothing.sluttyMaid) {
			outfit = 'Maid';
			useMid = false;
		}

		if (this.clothingControl.piecewiseClothing.shirt) {
			let sleeve = "Long";
			if (this.clothingControl.piecewiseClothing.schoolgirlNormal ||
				this.clothingControl.piecewiseClothing.schoolgirlShort ||
				this.leftArmType === "" || this.rightArmType === "") {
				sleeve = "Short";
			}
			outfit = `Shirt_${sleeve}`;
			useMid = false;
		}

		if (this.clothingControl.piecewiseClothing.sweater) {
			outfit = 'Sweater';
		}

		if (this.clothingControl.piecewiseClothing.fallennun) {
			outfit = 'Nun';
		}

		// Create the art string
		if (outfit !== '') {
			let pos = (arm === 'Left') ? (this.leftArmType) : (this.rightArmType); // arm position
			if (!useMid && pos === 'Mid') { pos = 'Low'; } // test to use low instead of mid
			if (pos !== '') {
				// valid position
				result.push(`Art_Vector_Revamp_Arm_Outfit_${outfit}_${arm}_${pos}`);
			}
		}

		return result;
	}

	get torsoOutfitLayer() {
		let result = [];
		// Clothing selector for different pieces of outfits to be layered between body and boob art
		// They will be drawn in the order they are pushed. From under to outer wear.
		// Bottom underwear
		if (this.clothingControl.piecewiseClothing.boyshorts) {
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_BoyShorts_Belly_0`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_BoyShorts_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.panties) {
			if (this.bellyLevel < 4) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Panties`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Panties_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.monokini) {
			if (this.bellyLevel <= 4) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Monokini`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Monokini_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.scalemailBot) {
			if (this.bellyLevel < 4) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Scalemail`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Scalemail_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.stringbikiniBot) {
			if (this.bellyLevel < 4) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_StringBikini`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_StringBikini_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.stripedpanties) {
			if (this.bellyLevel < 4) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_StripedPanties`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_StripedPanties_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.thong) {
			if (this.bellyLevel < 4) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Thong`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Thong_Belly_${this.bellyLevel}`);
			}
		}
		// Chastity belts
		result.push.apply(result, this.chastityBeltLayer);
		// Top underwear
		if (this.clothingControl.accessories.corset) {
			if (this.bellyLevel === 0) {
				result.push(`Art_Vector_Revamp_Torso_Accessory_Corset_Tight`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Accessory_Corset_Tight_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.accessories.corsetExtreme) {
			if (this.bellyLevel === 0) {
				result.push(`Art_Vector_Revamp_Torso_Accessory_Corset_Extreme`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Accessory_Corset_Extreme_Belly_${this.bellyLevel}`);
			}
		}
		// Top outerwear
		if (this.clothingControl.piecewiseClothing.oversizedtshirt) {
			result.push(`Art_Vector_Revamp_Torso_Outfit_OversizedTshirt`);
			if (this.bellyLevel > 0) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_OversizedTshirt_Belly`);
			}
		}
		if (this.clothingControl.piecewiseClothing.shibari) {
			const bellySize = [0, 2, 2, 3, 4, 5, 6, 7, 8, 9];
			const bl = bellySize[this.bellyLevel];
			if (this.bellyLevel === 0) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Shibari_${this.torsoSize}`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Shibari_Belly_${bl}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.shirt) {
			result.push(`Art_Vector_Revamp_Torso_Outfit_Shirt_${this.torsoSize}`);
			if (this.bellyLevel >= 1) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Shirt_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.straps) {
			const bellySize = [0, 0, 0, 3, 4, 5, 5, 5, 5, 5];
			const bl = bellySize[this.bellyLevel];
			if (this.bellyLevel <= 2) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Straps_Base`);
				result.push(`Art_Vector_Revamp_Torso_Outfit_Straps_${this.torsoSize}`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Straps_Belly_${bl}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.tanktop) {
			if (this.bellyLevel === 0) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Tanktop_${this.torsoSize}`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Tanktop_Belly`);
			}
		}
		if (this.clothingControl.piecewiseClothing.tshirt ||
			this.clothingControl.piecewiseClothing.niceMaid) {
			if (this.bellyLevel === 0) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Tshirt_${this.torsoSize}`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Tshirt_Belly`);
			}
		}
		if (this.clothingControl.piecewiseClothing.tubetop) {
			if (this.bellyLevel === 0) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Tanktop_${this.torsoSize}`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Tanktop_Belly`);
			}
		}
		// Bottom outerwear
		if (this.clothingControl.piecewiseClothing.cutoffs) {
			const buttSize = Math.min(3, Math.floor(this.artSlave.butt / 2));
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Cutoffs_${buttSize}`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Cutoffs_${buttSize}_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.jeans) {
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Jeans_Belly_0`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Jeans_Belly_${this.bellyLevel}`);
			}
			result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Jeans_${this.legSize}`);
		}
		if (this.clothingControl.piecewiseClothing.leatherpants) {
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Leather_Belly_0`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Leather_Belly_${this.bellyLevel}`);
			}
			result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Leather_${this.legSize}`);
		}
		if (this.clothingControl.piecewiseClothing.loincloth) {
			if (this.bellyLevel < 6) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Loincloth`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Loincloth_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.miniskirt) {
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Miniskirt_Belly_0`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Miniskirt_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.schoolgirlNormal) {
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_SchoolgirlUniform_Normal`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_SchoolgirlUniform_Normal_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.schoolgirlShort) {
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_SchoolgirlUniform_Short`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_SchoolgirlUniform_Short_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.skirt) {
			if (this.bellyLevel < 2) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Skirt_Belly_0`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Skirt_Belly_${this.bellyLevel}`);
			}
			if (hasAnyLegs(this.artSlave)) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Skirt_Reference_${this.legSize}`);
			}
			result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Skirt_Bottom`);
		}
		if (this.clothingControl.piecewiseClothing.spats) {
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Spats_Belly_0`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Spats_Belly_${this.bellyLevel}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.sportshorts) {
			if (this.bellyLevel < 3) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_SportShorts_Belly_0`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_SportShorts_Belly_${this.bellyLevel}`);
			}
			result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_SportShorts_Bottom`);
		}
		if (this.clothingControl.piecewiseClothing.suitpants) {
			if (this.bellyLevel < 2) {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Suit_Belly_0`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Suit_Belly_${this.bellyLevel}`);
			}
			result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Suit_${this.legSize}`);
		}
		// Top outerwear - overbottom
		if (this.clothingControl.piecewiseClothing.apron) {
			const bellySize = [0, 0, 0, 3, 4, 5, 6, 7, 8, 9];
			result.push(`Art_Vector_Revamp_Torso_Outfit_Apron_Belly_${bellySize[this.bellyLevel]}`);
		}
		if (this.clothingControl.piecewiseClothing.fallennun) {
			const bellySize = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			if (this.bellyLevel < 1) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Nun_${this.torsoSize}`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Nun_Belly_${bellySize}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.niceMaid) {
			const bellySize = [0, 0, 0, 3, 4, 5, 6, 7, 8, 9];
			result.push(`Art_Vector_Revamp_Torso_Outfit_Maid_Skirt_Belly_${bellySize[this.bellyLevel]}`);
		}
		if (this.clothingControl.piecewiseClothing.overalls) {
			const bellySize = [0, 0, 0, 3, 4, 5, 6, 7, 8, 9];
			result.push(`Art_Vector_Revamp_Torso_Outfit_Overalls_Belly_${bellySize[this.bellyLevel]}`);
			result.push(`Art_Vector_Revamp_Torso_Bottom_Outfit_Jeans_${this.legSize}`);
		}
		if (this.clothingControl.piecewiseClothing.sluttyMaid) {
			const bellySize = [0, 0, 2, 3, 4, 5, 6, 7, 8, 9];
			result.push(`Art_Vector_Revamp_Torso_Outfit_Maid_Lewd_${this.torsoSize}`);
			result.push(`Art_Vector_Revamp_Torso_Outfit_Maid_Lewd_Belly_${bellySize[this.bellyLevel]}`);
		}
		if (this.clothingControl.piecewiseClothing.sweater) {
			if (this.bellyLevel === 0) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Sweater_${this.torsoSize}`);
			} else {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Sweater_Belly`);
			}
		}
		return result;
	}


	get torsoOutfitBackLayer() {
		let result = [];
		if (this.clothingControl.piecewiseClothing.ballgown) {
			result.push(`Art_Vector_Revamp_Torso_Outfit_Ballgown_Back`);
		}
		if (this.clothingControl.piecewiseClothing.fallennun) {
			const bellySize = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			result.push(`Art_Vector_Revamp_Torso_Outfit_Nun_Back_Belly_${bellySize[this.bellyLevel]}`);
		}
		return result;
	}

	get torsoOutfitFrontLayer() {
		let result = [];
		if (this.clothingControl.piecewiseClothing.ballgown) {
			result.push(`Art_Vector_Revamp_Torso_Outfit_Ballgown_Unnatural`);
			if (this.torsoSize !== "Unnatural") {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Ballgown_${this.torsoSize}`);
			}
			if (this.bellyLevel > 0) {
				result.push(`Art_Vector_Revamp_Torso_Outfit_Ballgown_Belly`);
			}
		}
		return result;
	}

	get ballsLayer() {
		let result = [];

		if (!this.showBalls || this.artSlave.scrotum <= 0 || this.artSlave.balls <= 0) {
			return result;
		}

		let ballsSize = 0;

		if (this.artSlave.scrotum >= 6) {
			ballsSize = 4;
		} else if (this.artSlave.scrotum >= 4) {
			ballsSize = 3;
		} else if (this.artSlave.scrotum >= 3) {
			ballsSize = 2;
		} else if (this.artSlave.scrotum >= 2) {
			ballsSize = 1;
		} else {
			ballsSize = 0;
		}

		result.push(`Art_Vector_Revamp_Balls_${ballsSize}`);

		return result;
	}

	get bellyLayer() {
		let result = [];

		if (this.bellyLevel > 0 && this.showBelly) {
			result.push(`Art_Vector_Revamp_Belly_${this.bellyLevel}`);

			if (this.showBellyPiercings) {
				if (this.artSlave.piercing.navel.weight >= 1) {
					result.push(`Art_Vector_Revamp_Belly_${this.bellyLevel}_Piercing`);
				}

				if (this.artSlave.piercing.navel.weight === 2) {
					result.push(`Art_Vector_Revamp_Belly_${this.bellyLevel}_Piercing_Heavy`);
				}
			}
		} else {
			if (this.showBellyPiercings) {
				if (this.artSlave.piercing.navel.weight >= 1) {
					result.push("Art_Vector_Revamp_Navel_Piercing");
				}

				if (this.artSlave.piercing.navel.weight === 2) {
					result.push("Art_Vector_Revamp_Navel_Piercing_Heavy");
				}
			}
		}

		return result;
	}

	get penisLayer() {
		let result = [];

		if (this.bellyLevel >= 8) {
			return result;
		}

		let penisSize = -1;

		if (this.artSlave.dick >= 8) {
			penisSize = 6;
		} else if (this.artSlave.dick >= 7) {
			penisSize = 5;
		} else if (this.artSlave.dick >= 6) {
			penisSize = 4;
		} else if (this.artSlave.dick >= 5) {
			penisSize = 3;
		} else if (this.artSlave.dick >= 4) {
			penisSize = 2;
		} else if (this.artSlave.dick >= 2) {
			penisSize = 1;
		} else if (this.artSlave.dick >= 1) {
			penisSize = 0;
		} else {
			penisSize = -1;
		}

		if (!this.showPenis || penisSize < 0) {
			return result;
		}

		if (canAchieveErection(this.artSlave) && (this.artSlave.chastityPenis !== 1)) {
			result.push(`Art_Vector_Revamp_Penis_${penisSize}`);

			if (!this.showPenisPiercings) {
				return result;
			}

			if (this.artSlave.piercing.dick.weight === 1) {
				result.push(`Art_Vector_Revamp_Penis_${penisSize}_Piercing`);
			} else if (this.artSlave.piercing.dick.weight === 2) {
				result.push(`Art_Vector_Revamp_Penis_${penisSize}_Piercing_Heavy`);
			}
		} else {
			result.push(`Art_Vector_Revamp_Flaccid_${penisSize}`);

			if (this.artSlave.chastityPenis === 1) {
				result.push(`Art_Vector_Revamp_Chastity_Cage_${penisSize}`);
			}
		}

		return result;
	}

	get boobLayer() {
		let result = [];
		if (this.showBoobs) {
			let areolaeShape = "Normal";
			switch (this.artSlave.areolae) {
				case 0:
					areolaeShape = "Normal";
					break;
				case 1:
					areolaeShape = "Large";
					break;
				case 2:
					areolaeShape = "Wide";
					break;
				case 3:
					areolaeShape = "Huge";
					break;
				default:
			}

			switch (this.artSlave.areolaeShape) {
				case "heart":
					areolaeShape = "Heart";
					break;
				case "star":
					areolaeShape = "Star";
					break;
				default:
			}

			let size = "None";
			if (this.artSlave.boobs < 300) {
				size = "None";
			} else if (this.artSlave.boobs < 600) {
				size = "Small";
			} else if (this.artSlave.boobs <= 1000) {
				size = "Medium_800";
			} else if (this.artSlave.boobs <= 2500) {
				size = "Medium_1500";
			} else if (this.artSlave.boobs < 15000) {
				size = "Medium_7000";
			} else {
				size = "Huge";
			}

			if (this.artSlave.boobs < 300) {
				if (this.showAreolae) {
					result.push(`Art_Vector_Revamp_Boob_None_Areola_${areolaeShape}`);
				}
			} else {
				this.setBoobArtTransform();
				result.push(`Art_Vector_Revamp_Boob_${size}`);

				if (this.showAreolae) {
					result.push(`Art_Vector_Revamp_Boob_${size}_Areolae_${areolaeShape}`);
					if (this.showNipples) {
						result.push(`Art_Vector_Revamp_Boob_${size}_Nipples`);
					}
				}
				if (this.showBoobsHighlight) {
					result.push(`Art_Vector_Revamp_Boob_${size}_Highlights2`);
					result.push(`Art_Vector_Revamp_Boob_${size}_Highlights1`);
				}
			}
		}

		return result;
	}

	get boobAddonLayer() {
		let result = [];
		let hasSizeNoneArt = true;

		if (this.showNipplesPiercings && this.showBoobs) {
			let size = "Small";

			if (this.artSlave.boobs < 600) {
				size = "Small";
			} else if (this.artSlave.boobs <= 1000) {
				size = "Medium_800";
			} else if (this.artSlave.boobs <= 2500) {
				size = "Medium_1500";
			} else if (this.artSlave.boobs < 15000) {
				size = "Medium_7000";
			} else {
				size = "Huge";
			}

			if (this.artSlave.piercing.nipple.weight === 1) {
				if (this.artSlave.boobs < 300) {
					result.push("Art_Vector_Revamp_Boob_None_Piercing");
				} else {
					result.push(`Art_Vector_Revamp_Boob_${size}_Piercing`);
				}
			} else if (this.artSlave.piercing.nipple.weight === 2) {
				if (this.artSlave.boobs < 300) {
					result.push("Art_Vector_Revamp_Boob_None_Piercing_Heavy");
				} else {
					result.push(`Art_Vector_Revamp_Boob_${size}_Piercing_Heavy`);
				}
			}

			if (this.artSlave.piercing.areola.weight === 1) {
				if (this.artSlave.boobs < 300) {
					result.push("Art_Vector_Revamp_Boob_None_Areola_Piercing");
				} else {
					result.push(`Art_Vector_Revamp_Boob_${size}_Areola_Piercing`);
				}
			} else if (this.artSlave.piercing.areola.weight === 2) {
				if (this.artSlave.boobs < 300) {
					result.push("Art_Vector_Revamp_Boob_None_Areola_Piercing_Heavy");
				} else {
					result.push(`Art_Vector_Revamp_Boob_${size}_Areola_Piercing_Heavy`);
				}
			}
		}
		// empty scaling data - used to modify standard values
		let d = {
			a: undefined, // boob graphics are scaled by a*log(b*x)
			b: undefined,
			size_norm: undefined, // scaling is normalized to this size
			x_rel: undefined, // scaling in x direction is divided by this factor
			atX: undefined, // offset after scaling - compensate for how SCG scales
			atY: undefined // offset after scaling - compensate for how SCG scales
		};
		let std_clothing = "";
		// Clothes used for multiple outfits
		if (this.clothingControl.piecewiseClothing.pasties) {
			let size_norm = this.setBoobOutfitArtTransform();
			let type = this.clothingControl.randomItem([1, 2], 6111368);
			if (this.artSlave.boobs < 300) {
				result.push(`Art_Vector_Revamp_Boob_Outfit_Pasties_None_${type}`);
			} else if (this.artSlave.boobs < 600) {
				result.push(`Art_Vector_Revamp_Boob_Outfit_Pasties_Small_${type}`);
			} else if (this.artSlave.boobs < 15000) {
				result.push(`Art_Vector_Revamp_Boob_Outfit_Pasties_Medium_${size_norm}_${type}`);
			} else {
				result.push(`Art_Vector_Revamp_Boob_Outfit_Pasties_Huge_${type}`);
			}
		}
		if (this.clothingControl.piecewiseClothing.apron) {
			std_clothing = "Apron";
			this.setApronMatrixTransform();
		}
		if (this.clothingControl.piecewiseClothing.ballgown) {
			std_clothing = "Tanktop";
		}
		if (this.clothingControl.piecewiseClothing.bra) {
			std_clothing = "Bra";
			hasSizeNoneArt = false;
		}
		if (this.clothingControl.piecewiseClothing.croptop) {
			std_clothing = "CropTop";
		}
		if (this.clothingControl.piecewiseClothing.fallennun) {
			std_clothing = "Nun";
		}
		if (this.clothingControl.piecewiseClothing.monokini) {
			std_clothing = "Monokini";
			this.setMonokiniMatrixTransform();
		}
		if (this.clothingControl.piecewiseClothing.niceMaid) {
			std_clothing = "Maid";
		}
		if (this.clothingControl.piecewiseClothing.overalls) {
			std_clothing = "Overalls";
			this.setApronMatrixTransform();
		}
		if (this.clothingControl.piecewiseClothing.oversizedtshirt) {
			std_clothing = "Tshirt";
		}
		if (this.clothingControl.piecewiseClothing.scalemailTop) {
			std_clothing = "Scalemail";
			hasSizeNoneArt = false;
		}
		if (this.clothingControl.piecewiseClothing.shibari) {
			std_clothing = "Shibari";
		}
		if (this.clothingControl.piecewiseClothing.shirt) {
			std_clothing = "Shirt";
			hasSizeNoneArt = false;
		}
		if (this.clothingControl.piecewiseClothing.sportsbra) {
			std_clothing = "SportsBra";
			hasSizeNoneArt = false;
		}
		if (this.clothingControl.piecewiseClothing.straps) {
			std_clothing = "Straps";
		}
		if (this.clothingControl.piecewiseClothing.stringbikiniTop) {
			std_clothing = "StringBikini";
			hasSizeNoneArt = false;
		}
		if (this.clothingControl.piecewiseClothing.stripedbra) {
			std_clothing = "StripedBra";
			hasSizeNoneArt = false;
		}
		if (this.clothingControl.piecewiseClothing.sweater) {
			std_clothing = "Sweater";
		}
		if (this.clothingControl.piecewiseClothing.tanktop) {
			std_clothing = "Tanktop";
		}
		if (this.clothingControl.piecewiseClothing.tshirt) {
			std_clothing = "Tshirt";
		}
		if (this.clothingControl.piecewiseClothing.tubetop) {
			std_clothing = "Tubetop";
		}
		if (std_clothing !== "") {
			if (this.artSlave.boobs < 300) {
				if (hasSizeNoneArt) {
					result.push(`Art_Vector_Revamp_Boob_Outfit_${std_clothing}_None`);
				}
			} else {
				let size_norm = this.setBoobOutfitArtTransform();
				if (this.artSlave.boobs < 600) {
					result.push(`Art_Vector_Revamp_Boob_Outfit_${std_clothing}_Small`);
				} else if (this.artSlave.boobs < 15000) {
					result.push(`Art_Vector_Revamp_Boob_Outfit_${std_clothing}_Medium_${size_norm}`);
				} else {
					result.push(`Art_Vector_Revamp_Boob_Outfit_${std_clothing}_Huge`);
				}
			}
		}

		return result;
	}

	getBoobScaleStandardValues() {
		let d = {
			a: 0.804354, // boob graphics are scaled by a*log(b*x)
			b: 0.00577801,
			size_norm: 800, // scaling is normalized to this size
			x_rel: 1.25, // scaling in x direction is divided by this factor
			atX: 198, // offset after scaling - compensate for how SCG scales
			atY: 295 // offset after scaling - compensate for how SCG scales
		}; // standard most used values
		if (this.artSlave.boobs < 300) {
			// no scaling needed
		} else if (this.artSlave.boobs < 600) {
			d.a = 0.360674;
			d.b = 0.0266667;
			d.size_norm = 400;
			d.x_rel = 1.5;
			d.atX = 250;
			d.atY = 270;
		} else if (this.artSlave.boobs <= 1000) {
			// standard values
		} else if (this.artSlave.boobs <= 2500) {
			d.size_norm = 1500;
		} else if (this.artSlave.boobs < 15000) {
			d.size_norm = 7000;
		} else {
			d.size_norm = 20000;
			d.x_rel = 1.4;
			d.atY = 287.5;
		}
		return d;
	}

	setBoobArtTransform() {
		/* Set the scaling factor of the boobs.
		The boobs are drawn in 5 different sizes, corresponding to sizes 400, 800, 1500, 7000, and 20000
		to simplify scaling and minimize distortion */
		let d = this.getBoobScaleStandardValues();
		// calculate and apply
		let aSF = d.a * Math.log(d.b * d.size_norm);
		let artScaleFactorY = d.a * Math.log(d.b * this.artSlave.boobs) / aSF;
		let artScaleFactorX = (artScaleFactorY-1)/d.x_rel + 1; // lower scaling in X direction to compensate for width
		let artTranslationY = d.atX * ((-1 * artScaleFactorY) + 1);
		let artTranslationX = d.atY * ((-1 * artScaleFactorX) + 1);
		let artBoobTransform = `matrix(${artScaleFactorX},0,0,${artScaleFactorY},${artTranslationX},${artTranslationY})`;
		this.boobRightArtTransform = artBoobTransform;
		this.boobLeftArtTransform = artBoobTransform;
	}

	setBoobOutfitArtTransform(d_in) {
		/* Set the BoobOutfitArtTransform parameter.
		The boob clothing scales with the boob size to follow the boobs.
		The clothing is drawn in 5 different sizes, corresponding to sizes 400, 800, 1500, 7000, and 20000
		The numbers are chosen to minimize distorsion and to make variation as the sizes get bigger.
		*/
		let d = this.getBoobScaleStandardValues();
		// overwrite with input
		if (typeof d_in !== 'undefined') {
			if (typeof d_in.a !== 'undefined') { d.a = d_in.a; }
			// d.a = (typeof d_in.a === 'undefined') ? d.a : d_in.a;
			d.b = (typeof d_in.b === 'undefined') ? d.b : d_in.b;
			d.size_norm = (typeof d_in.size_norm === 'undefined') ? d.size_norm : d_in.size_norm;
			d.x_rel = (typeof d_in.x_rel === 'undefined') ? d.x_rel : d_in.x_rel;
			d.atX = (typeof d_in.atX === 'undefined') ? d.atX : d_in.atX;
			d.atY = (typeof d_in.atY === 'undefined') ? d.atY : d_in.atY;
		}
		// calculate and apply
		let aSF = d.a * Math.log(d.b * d.size_norm);
		let artScaleFactorY = d.a * Math.log(d.b * this.artSlave.boobs) / aSF;
		let artScaleFactorX = (artScaleFactorY-1)/d.x_rel + 1; // lower scaling in X direction to compensate for width
		let artTranslationY = d.atX * ((-1 * artScaleFactorY) + 1);
		let artTranslationX = d.atY * ((-1 * artScaleFactorX) + 1);
		let artBoobTransform = `matrix(${artScaleFactorX},0,0,${artScaleFactorY},${artTranslationX},${artTranslationY})`;
		this.boobOutfitMatrix = [artScaleFactorX, 0, 0, artScaleFactorY, artTranslationX, artTranslationY];
		this.boobOutfitArtTransform = artBoobTransform;
		return d.size_norm;
	}

	setApronMatrixTransform() {
		this.setBoobOutfitArtTransform();
		let coorA = [[0, 0], [0, 0], [1, 1], [1, 1], [0, 1], [0, 1]]; // a_start,a_end,b_start,b_end,c_start,c_end
		let coorB = [[0, 0], [0, 0], [1, 1], [1, 1], [0, 1], [0, 1]]; // a_start,a_end,b_start,b_end,c_start,c_end
		let strap = this.clothingControl.braStrapOpacity().findIndex(opa => opa > 0);
		if (this.artSlave.boobs < 300) {
			// None
		} else if (this.artSlave.boobs < 600) {
			// Small
			coorA = [[236.560, 745.063], [236.560, 745.063], [150.000, 720.000], [150.000, 720.000], [0, 0], [0, 0]];
		} else if (this.artSlave.boobs <= 1000) {
			// Medium 800
			coorA = [[232.141, 722.456], [232.141, 722.456], [254.074, 686.660], [254.074, 686.660], [0, 0], [0, 0]];
			if (strap === 0) { coorA[0] = [238.961, 733.245]; }
			if (strap === 2) { coorA[0] = [228.272, 716.336]; }
			coorB = [[355.529, 842.501], [355.529, 842.501], [334.522, 761.607], [334.522, 761.607], [0, 0], [0, 0]];
			if (strap === 0) { coorB[2] = [330.234, 767.086]; }
			if (strap === 2) { coorB[2] = [336.955, 758.499]; }
		} else if (this.artSlave.boobs <= 2500) {
			// Medium 1500
		} else if (this.artSlave.boobs < 15000) {
			// Medium 7000
		} else {
			// Huge
		}

		let belly_xA = [251.743, 251.743, 251.743, 0, 0, 0, 0, 0, 0, 0];
		let belly_yA = [663.841, 663.841, 663.841, 0, 0, 0, 0, 0, 0, 0];
		coorA[4] = [belly_xA[this.bellyLevel], belly_yA[this.bellyLevel]];
		coorA[5] = coorA[4].slice(0);

		let belly_xB = [335.946, 335.946, 335.946, 0, 0, 0, 0, 0, 0, 0];
		let belly_yB = [672.826, 672.826, 672.826, 0, 0, 0, 0, 0, 0, 0];
		coorB[4] = [belly_xB[this.bellyLevel], belly_yB[this.bellyLevel]];
		coorB[5] = coorB[4].slice(0);

		coorA = this.convertCoordinateSystem(coorA);
		coorB = this.convertCoordinateSystem(coorB);

		coorA[1] = this.performBoobOutfitTransform(coorA[1]);
		coorB[3] = this.performBoobOutfitTransform(coorB[3]);

		this.setMatrixTransformation("braA_ArtTransform", [coorA[0], coorA[2], coorA[4]], [coorA[1], coorA[3], coorA[5]]);
		this.setMatrixTransformation("braB_ArtTransform", [coorB[0], coorB[2], coorB[4]], [coorB[1], coorB[3], coorB[5]]);
	}

	setMonokiniMatrixTransform() {
		this.setBoobOutfitArtTransform();
		let coorA = [[0, 0], [0, 0], [1, 1], [1, 1], [0, 1], [0, 1]]; // a_start,a_end,b_start,b_end,c_start,c_end
		let coorB = [[0, 0], [0, 0], [1, 1], [1, 1], [0, 1], [0, 1]]; // a_start,a_end,b_start,b_end,c_start,c_end
		// Determine the three points start and end that defines the matrix transform
		// Point A: Strap upper point, follow boob scaling, remain at same point on bra
		// Point B: Not used - selected to keep distortion at a minimum
		// Point C: Strap lower point, keep constant
		if (this.artSlave.boobs < 300) {
			// None
		} else if (this.artSlave.boobs < 600) {
			// Small
			coorA = [[243.562, 740.563], [243.562, 740.563], [150.000, 720.000], [150.000, 720.000], [279.346, 566.836], [279.346, 566.836]];
			coorB = [[305.421, 742.949], [305.421, 742.949], [150.000, 720.000], [150.000, 720.000], [292.685, 567.819], [292.685, 567.819]];
		} else if (this.artSlave.boobs <= 1000) {
			// Medium 800
			coorA = [[234.093, 731.250], [234.093, 731.250], [150.000, 720.000], [150.000, 720.000], [279.346, 566.836], [279.346, 566.836]];
			coorB = [[298.041, 731.459], [298.041, 731.459], [150.000, 720.000], [150.000, 720.000], [292.685, 567.819], [292.685, 567.819]];
		} else if (this.artSlave.boobs <= 2500) {
			// Medium 1500
			coorA = [[215.885, 708.270], [215.885, 708.270], [100.000, 500.000], [100.000, 500.000], [279.346, 566.836], [279.346, 566.836]];
			coorB = [[291.588, 715.195], [291.588, 715.195], [100.000, 500.000], [100.000, 500.000], [292.685, 567.819], [292.685, 567.819]];
		} else if (this.artSlave.boobs < 15000) {
			// Medium 7000
			coorA = [[165.946, 657.977], [165.946, 657.977], [100.000, 500.000], [100.000, 500.000], [279.655, 566.129], [279.655, 566.129]];
			coorB = [[283.839, 666.691], [283.839, 666.691], [100.000, 500.000], [100.000, 500.000], [292.508, 567.244], [292.508, 567.244]];
		} else {
			// Huge
			coorA = [[161.571, 627.102], [161.571, 627.102], [100.000, 500.000], [100.000, 500.000], [279.655, 566.129], [279.655, 566.129]];
			coorB = [[291.339, 639.691], [291.339, 639.691], [100.000, 500.000], [100.000, 500.000], [292.508, 567.244], [292.508, 567.244]];
		}

		coorA = this.convertCoordinateSystem(coorA);
		coorB = this.convertCoordinateSystem(coorB);

		coorA[1] = this.performBoobOutfitTransform(coorA[1]);
		coorB[1] = this.performBoobOutfitTransform(coorB[1]);

		this.setMatrixTransformation("braA_ArtTransform", [coorA[0], coorA[2], coorA[4]], [coorA[1], coorA[3], coorA[5]]);
		this.setMatrixTransformation("braB_ArtTransform", [coorB[0], coorB[2], coorB[4]], [coorB[1], coorB[3], coorB[5]]);
	}

	/** Convert from coordinate system in the svg file to the graphic coordinate on page
	 * The y-axis in svg counts from the bottom up and in browser it is top down with a canvas height of 1000.
	 * @param {number[][]} M
	 */
	convertCoordinateSystem(M){
		const dim = M.length;
		for (let i=0; i<dim; i+=1){
			M[i][1] = 1000 - M[i][1];
		}
		return M;
	}

	performBoobOutfitTransform(n){
		let c = this.boobOutfitMatrix;
		return [c[0]*n[0] + c[2]*n[1] + c[4], c[1]*n[0] + c[3]*n[1] + c[5]];
	}

	setMatrixTransformation(name, start, end) {
		// Calculate the matrix transformation that transforms the start coordinates to the end coordinates
		// Used to calculate a matrix transform of an object with the purpose of making sure that certain coordinates
		// ends up at precise locations. See monokini for an example. It is used to modify the strap so one end is fixed
		// and the other moves with the boob transform
		//
		// IMPORTANT: The start x,y points must be inversible (three distinct points not all on a line)

		let M = [[start[0][0], start[0][1], 1],
				 [start[1][0], start[1][1], 1],
				 [start[2][0], start[2][1], 1]];
		let Mi = this.matrix_invert(M);

		let a = Mi[0][0] * end[0][0] + Mi[0][1] * end[1][0] + Mi[0][2] * end[2][0];
		let c = Mi[1][0] * end[0][0] + Mi[1][1] * end[1][0] + Mi[1][2] * end[2][0];
		let e = Mi[2][0] * end[0][0] + Mi[2][1] * end[1][0] + Mi[2][2] * end[2][0];

		let b = Mi[0][0] * end[0][1] + Mi[0][1] * end[1][1] + Mi[0][2] * end[2][1];
		let d = Mi[1][0] * end[0][1] + Mi[1][1] * end[1][1] + Mi[1][2] * end[2][1];
		let f = Mi[2][0] * end[0][1] + Mi[2][1] * end[1][1] + Mi[2][2] * end[2][1];

		let end_check = [[a*start[0][0] + c*start[0][1] + e, b*start[0][0] + d*start[0][1] + f], [a*start[1][0] + c*start[1][1] + e, b*start[1][0] + d*start[1][1] + f], [a*start[2][0] + c*start[2][1] + e, b*start[2][0] + d*start[2][1] + f]];

		this[name] = `matrix(${a},${b},${c},${d},${e},${f})`;
	}

	matrix_invert(M){
		// Returns the inverse of matrix `M` by Gaussian Elimination:
		// Copied from http://blog.acipo.com/matrix-inversion-in-javascript/
		// (1) 'augment' the matrix (left) by the identity (on the right)
		// (2) Turn the matrix on the left into the identity by elementary row ops
		// (3) The matrix on the right is the inverse (was the identity matrix)
		// There are 3 elementary row ops: (I combine b and c in my code)
		// (a) Swap 2 rows
		// (b) Multiply a row by a scalar
		// (c) Add 2 rows

		// if the matrix isn't square: exit (error)
		if (M.length !== M[0].length){ return; }

		let i=0, ii=0, j=0, dim=M.length, e=0;
		let I = [], C = [];
		for (i=0; i<dim; i+=1){
			I[I.length]=[];
			C[C.length]=[];
			for (j=0; j<dim; j+=1){
				if (i==j){ I[i][j] = 1; } else { I[i][j] = 0; }
				C[i][j] = M[i][j];
			}
		}
		for (i=0; i<dim; i+=1){
			e = C[i][i];
			if (e==0){
				for (ii=i+1; ii<dim; ii+=1){
					if (C[ii][i] != 0){
						for (j=0; j<dim; j++){
							e = C[i][j];
							C[i][j] = C[ii][j];
							C[ii][j] = e;
							e = I[i][j];
							I[i][j] = I[ii][j];
							I[ii][j] = e;
						}
						break;
					}
				}
				e = C[i][i];
				if (e==0){ return; }
			}
			for (j=0; j<dim; j++){
				C[i][j] = C[i][j]/e;
				I[i][j] = I[i][j]/e;
			}
			for (ii=0; ii<dim; ii++){
				if (ii==i){ continue; }
				e = C[ii][i];
				for (j=0; j<dim; j++){
					C[ii][j] -= e*C[i][j];
					I[ii][j] -= e*I[i][j];
				}
			}
		}
		return I;
	}

	get clavicleLayer() {
		let result = [];

		result.push("Art_Vector_Revamp_Clavicle");

		return result;
	}

	get collarLayer() {
		let result = [];

		switch (this.artSlave.collar) {
			case "leather with cowbell":
				result.push("Art_Vector_Revamp_Collar_Cowbell");
				break;
			case "heavy gold":
				result.push("Art_Vector_Revamp_Collar_Gold_Heavy");
				break;
			case "neck corset":
				result.push("Art_Vector_Revamp_Collar_Neck_Corset");
				break;
			case "pretty jewelry":
				result.push("Art_Vector_Revamp_Collar_Pretty_Jewelry");
				break;
			case "cruel retirement counter":
				result.push("Art_Vector_Revamp_Collar_Retirement_Cruel");
				break;
			case "nice retirement counter":
				result.push("Art_Vector_Revamp_Collar_Retirement_Nice");
				break;
			case "satin choker":
				result.push("Art_Vector_Revamp_Collar_Satin_Choker");
				break;
			case "shock punishment":
				result.push("Art_Vector_Revamp_Collar_Shock_Punishment");
				break;
			case "stylish leather":
				result.push("Art_Vector_Revamp_Collar_Stylish_Leather");
				break;
			case "tight steel":
				result.push("Art_Vector_Revamp_Collar_Tight_Steel");
				break;
			default:
		}

		return result;
	}

	get headLayer() {
		let result = [];

		result.push("Art_Vector_Revamp_Head");

		if (this.showHeadHighlight) {
			result.push("Art_Vector_Revamp_Face_Highlights");
		}

		if (!this.showHeadPiercings) {
			return result;
		}

		if (this.artSlave.piercing.ear.weight === 1) {
			result.push("Art_Vector_Revamp_Head_Ear_Piercing");
		} else if (this.artSlave.piercing.ear.weight === 2) {
			result.push("Art_Vector_Revamp_Head_Ear_Piercing_Heavy");
		}

		if (this.artSlave.piercing.nose.weight === 1) {
			result.push("Art_Vector_Revamp_Head_Nose_Piercing");
		} else if (this.artSlave.piercing.nose.weight === 2) {
			result.push("Art_Vector_Revamp_Head_Nose_Piercing_Heavy");
		}

		return result;
	}

	get eyesLayer() {
		let result = [];

		if (!this.showEyes) {
			return result;
		}

		if (this.artSlave.devotion > 50) {
			result.push("Art_Vector_Revamp_Eyes_Happy");
			result.push("Art_Vector_Revamp_Eyes_Happy_Highlights");

			if (this.showHeadPiercings) {
				if (this.artSlave.piercing.eyebrow.weight === 1) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Happy_Piercing");
				} else if (this.artSlave.piercing.eyebrow.weight === 2) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Happy_Piercing_Heavy");
				}
			}
		} else if (this.artSlave.devotion >= 0) {
			result.push("Art_Vector_Revamp_Eyes_Shy");
			result.push("Art_Vector_Revamp_Eyes_Shy_Highlights");

			if (this.showHeadPiercings) {
				if (this.artSlave.piercing.eyebrow.weight === 1) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Shy_Piercing");
				} else if (this.artSlave.piercing.eyebrow.weight === 2) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Shy_Piercing_Heavy");
				}
			}
		} else if (this.artSlave.devotion >= -50) {
			result.push("Art_Vector_Revamp_Eyes_Closed");

			if (this.showHeadPiercings) {
				if (this.artSlave.piercing.eyebrow.weight === 1) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Closed_Piercing");
				} else if (this.artSlave.piercing.eyebrow.weight === 2) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Closed_Piercing_Heavy");
				}
			}
		} else {
			result.push("Art_Vector_Revamp_Eyes_Angry");
			result.push("Art_Vector_Revamp_Eyes_Angry_Highlights");
			if (this.showHeadPiercings) {
				if (this.artSlave.piercing.eyebrow.weight === 1) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Angry_Piercing");
				} else if (this.artSlave.piercing.eyebrow.weight === 2) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Angry_Piercing_Heavy");
				}
			}
		}

		return result;
	}

	get mouthLayer() {
		let result = [];
		let lipsSize = "Normal";

		if (!this.showMouth) {
			return result;
		}

		if (this.artSlave.lips > 95) {
			lipsSize = "Enormous";
		} else if (this.artSlave.lips > 70) {
			lipsSize = "Huge";
		} else if (this.artSlave.lips > 50) {
			lipsSize = "Big";
		} else if (this.artSlave.lips > 30) {
			lipsSize = "Plush";
		} else if (this.artSlave.lips > 10) {
			lipsSize = "Normal";
		} else {
			lipsSize = "Thin";
		}

		if (this.artSlave.trust > 20) {
			result.push(`Art_Vector_Revamp_Makeup_Mouth_Happy_${lipsSize}`);
			result.push(`Art_Vector_Revamp_Mouth_Happy_${lipsSize}`);

			if (this.showHeadPiercings) {
				if (this.artSlave.piercing.lips.weight === 1) {
					result.push("Art_Vector_Revamp_Head_Mouth_Happy_Piercing");
				} else if (this.artSlave.piercing.lips.weight === 2) {
					result.push("Art_Vector_Revamp_Head_Mouth_Happy_Piercing_Heavy");
				}
			}
		} else {
			result.push(`Art_Vector_Revamp_Makeup_Mouth_Angry_${lipsSize}`);
			result.push(`Art_Vector_Revamp_Mouth_Angry_${lipsSize}`);

			if (this.showHeadPiercings) {
				if (this.artSlave.piercing.lips.weight === 1) {
					result.push("Art_Vector_Revamp_Head_Mouth_Angry_Piercing");
				} else if (this.artSlave.piercing.lips.weight === 2) {
					result.push("Art_Vector_Revamp_Head_Mouth_Angry_Piercing_Heavy");
				}
			}
		}

		return result;
	}

	get headAddonLayer() {
		let result = [];

		if (this.showEyes) {
			switch (this.artSlave.eyewear) {
				case "corrective glasses":
				case "glasses":
				case "blurring glasses":
					result.push("Art_Vector_Revamp_Glasses");
					break;
				default:
			}
		}

		if (this.showMouth) {
			switch (this.artSlave.mouthAccessory) {
				case "dildo gag":
					result.push("Art_Vector_Revamp_Dildo_Gag");
					break;
				case "bit gag":
					result.push("Art_Vector_Revamp_Bit_Gag");
					break;
				case "ball gag":
					result.push("Art_Vector_Revamp_Ball_Gag");
					break;
				default:
			}
		}
		return result;
	}

	get hairForeLayer() {
		let result = [];

		if (!this.showHair) {
			return result;
		}

		if (this.artSlave.hLength === 0) {
			return result;
		}

		switch (this.artSlave.hStyle) {
			case "neat":
				result.push("Art_Vector_Revamp_Hair_Fore_Neat");
				break;
			case "bun":
			case "up":
			case "tails":
			case "ponytail":
				result.push("Art_Vector_Revamp_Hair_Fore_Bun");
				break;
			case "braided":
				result.push("Art_Vector_Revamp_Hair_Fore_Braids");
				break;
			case "curled":
				result.push("Art_Vector_Revamp_Hair_Fore_Curled");
				break;
			case "cornrows":
				result.push("Art_Vector_Revamp_Hair_Fore_Cornrows");
				break;
			case "strip":
				result.push("Art_Vector_Revamp_Hair_Fore_Shaved_Sides");
				break;
			case "luxurious":
				result.push("Art_Vector_Revamp_Hair_Fore_Luxurious");
				break;
			case "afro":
				result.push("Art_Vector_Revamp_Hair_Fore_Afro");
				break;
			case "permed":
				result.push("Art_Vector_Revamp_Hair_Fore_Permed");
				break;
			case "dreadlocks":
				result.push("Art_Vector_Revamp_Hair_Fore_Dreadlocks");
				break;
			default:
				result.push("Art_Vector_Revamp_Hair_Fore_Messy");
		}

		return result;
	}

	get headdressForeLayer() {
		let result = [];

		if (this.clothingControl.piecewiseClothing.fallennun) {
			result.push(`Art_Vector_Revamp_Headdress_Fore_Nun`);
		}

		return result;
	}

	get Layers() {
		let layers = [];

		Array.prototype.push.apply(layers, this.hairBackLayer);
		Array.prototype.push.apply(layers, this.headdressBackLayer);
		Array.prototype.push.apply(layers, this.armLayer);
		Array.prototype.push.apply(layers, this.armOutfitLayerRight);
		Array.prototype.push.apply(layers, this.torsoOutfitBackLayer);
		Array.prototype.push.apply(layers, this.buttLayer);
		Array.prototype.push.apply(layers, this.legLayer);
		Array.prototype.push.apply(layers, this.torsoLayer);
		Array.prototype.push.apply(layers, this.armOutfitLayerLeft);
		Array.prototype.push.apply(layers, this.clavicleLayer);
		Array.prototype.push.apply(layers, this.pussyLayer);
		Array.prototype.push.apply(layers, this.pubicLayer);
		Array.prototype.push.apply(layers, this.pussyPiercingsLayer);
		// Array.prototype.push.apply(layers, this.chastityBeltLayer); Moved to be called inside torsoOutfitLayer so it is displayed on top of panties but beneath outerwear
		Array.prototype.push.apply(layers, this.bellyLayer);
		Array.prototype.push.apply(layers, this.torsoOutfitLayer);
		Array.prototype.push.apply(layers, this.feetLayer);
		Array.prototype.push.apply(layers, this.torsoOutfitFrontLayer);
		Array.prototype.push.apply(layers, this.ballsLayer);
		Array.prototype.push.apply(layers, this.penisLayer);
		Array.prototype.push.apply(layers, this.boobLayer);
		Array.prototype.push.apply(layers, this.boobAddonLayer);
		Array.prototype.push.apply(layers, this.collarLayer);
		Array.prototype.push.apply(layers, this.headLayer);
		Array.prototype.push.apply(layers, this.eyesLayer);
		Array.prototype.push.apply(layers, this.mouthLayer);
		Array.prototype.push.apply(layers, this.headAddonLayer);
		Array.prototype.push.apply(layers, this.hairForeLayer);
		Array.prototype.push.apply(layers, this.headdressForeLayer);

		return layers;
	}

	get transformRules() {
		let cpBelly = ``;
		if (this.bellyLevel === 0) {
			cpBelly = `url(#clipPathTorso${this.torsoSize})`;
		} else {
			cpBelly = `url(#clipPathBelly_${this.bellyLevel}_${this.torsoSize})`;
		}
		return [
			{trigger: "boob_left", action: "transform", value: this.boobLeftArtTransform},
			{trigger: "boob_right", action: "transform", value: this.boobRightArtTransform},
			{trigger: "boob_outfit", action: "transform", value: this.boobOutfitArtTransform},
			{trigger: "bra_trans_a", action: "transform", value: this.braA_ArtTransform},
			{trigger: "bra_trans_b", action: "transform", value: this.braB_ArtTransform},
			{trigger: "pussy_tattoo_text", action: "text-content", value: this.pubicTattooText},
			{trigger: "torso", action: "clip-path", value: `url(#clipPathTorso${this.torsoSize})`},
			{trigger: "torso_outfit_belly", action: "clip-path", value: cpBelly},
			{trigger: "leg_size", action: "clip-path", value: `url(#clipPathLeg_${this.legSize})`}
		];
	}
}
