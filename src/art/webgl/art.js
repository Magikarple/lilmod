
App.Art.hexToRgb = function(hex) {
	hex = hex.replace('#', '');
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);
	return [r/255, g/255, b/255];
};

App.Art.seed = 0;

App.Art.setSeed = function(slave, offset) {
	App.Art.seed = slave.natural.artSeed + offset;
	return App.Art.seed;
};

App.Art.random = function() {
	App.Art.seed += 1;
	let x = Math.sin(App.Art.seed) * 10000;
	return x - Math.floor(x);
};

App.Art.getMaterialById = function(scene, id) {
	for (const material of scene.materials) {
		if (material.matId === id) {
			return material;
		}
	}
	return null;
};

App.Art.getMorphById = function(scene, id) {
	for (const morph of scene.models[0].morphs) {
		if (morph.morphId === id) {
			return morph;
		}
	}
	return null;
};

App.Art.getSurfaceById = function(scene, id) {
	for (const figure of scene.models[0].figures) {
		for (const surface of figure.surfaces) {
			if (surface.surfaceId === id) {
				return surface;
			}
		}
	}
	return null;
};

App.Art.getMatIdsBySurface = function(scene, id) {
	for (const figure of scene.models[0].figures) {
		for (const surface of figure.surfaces) {
			if (surface .surfaceId === id) {
				return surface.matIds;
			}
		}
	}
};

App.Art.resetMorphs = function(scene) {
	for (let i =0; i < scene.models[0].morphs.length; i++) {
		scene.models[0].morphs[i].value = App.Art.defaultScene.models[0].morphs[i].value;
	}
};

App.Art.getArtParams = function(slave) {
	let p = {};

	p.hideDick = false;
	p.hideVagina = false;
	p.hideHair = false;
	p.applyNipples = true;
	p.applyPumps = false;
	p.applyExtremeHeels = false;
	p.applyExtremeHeels2 = false;
	p.applyExtremeHeels3 = false;
	p.applyPanty = true;
	p.applyBulge = false;
	p.animVars = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], ["", "", "", "", "", ""], [0, 0, 0, 0, 0, 0], jsEither([true, false])];

	p.underage = slave.age < 18 || slave.visualAge < 18;
	p.height = Math.max(slave.height, 140); // clamp underage
	p.age = Math.max(slave.visualAge, 18);

	return p;
};

App.Art.applyFigures = function(slave, scene, p) {
	App.Art.seed = App.Art.setSeed(slave, 0);
	let figures = [];

	switch (slave.clothes) {
		case "attractive lingerie":
			figures.push("AS2_Body1", "AS2_Socks");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.applyBulge = false;
			break;
		case "attractive lingerie for a pregnant woman":
			figures.push("AS2_Babydoll2", "AS2_Pantie", "AS2_Socks_5506");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.applyBulge = false;
			break;
		case "a comfortable bodysuit":
			figures.push("Dark Princess Bodysuit", "Dark Princess Boots");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.applyPumps = true;
			p.applyBulge = true;
			break;
		case "a slutty klan robe":
			figures.push("Slutty Klan Robe");
			p.applyPanty = false;
			p.hideDick = true;
			p.hideHair = true;
			p.applyNipples = false;
			p.applyBulge = true;
			break;
		case "a klan robe":
			figures.push("Klan Robe");
			p.applyPanty = false;
			p.hideDick = true;
			p.hideHair = true;
			p.applyNipples = false;
			p.applyBulge = true;
			break;
		case "a bunny outfit":
			figures.push("Bunny Suit", "Bunny Gloves", "Bunny Chocker", "Bunny Shoes", "Bunny Stocking", "Bunny Ears");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.applyPumps = true;
			p.applyBulge = true;
			break;
		case "a penitent nuns habit":
			figures.push("Nun_Outfit");
			p.applyPanty = false;
			p.hideDick = true;
			p.hideHair = true;
			p.applyNipples = false;
			p.applyBulge = true;
			break;
		case "a fallen nuns habit":
			figures.push("NUN OUTFIT", "NUN HAT", "NUN PANTIES", "NUN STOCKINGS");
			p.hideDick = true;
			p.hideHair = true;
			p.applyNipples = false;
			p.applyBulge = true;
			break;
		case "an apron":
			figures.push("Apron");
			p.hideDick = true;
			p.applyNipples = false;
			p.applyBulge = true;
			break;
		case "a burkini":
			figures.push("Burkini");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = true;
			p.applyBulge = true;
			break;
		case "a burqa":
			figures.push("Burqa");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = true;
			p.applyBulge = true;
			break;
		case "harem gauze":
			figures.push("Harem Outfit");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			break;
		case "a mounty outfit":
			figures.push("Mounty Hat", "Mounty Jacket", "Mounty Pants");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = true;
			break;
		case "a hijab and abaya":
			// figures.push("Hijab", "Abaya");
			// p.applyPanty = false;
			// p.hideDick = true;
			// p.applyNipples = false;
			// p.hideHair = true;
			break;
		case "a hijab and blouse":
			figures.push("Hijab", "Flower Blouse", "Capris");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = true;
			break;
		case "uncomfortable straps":
			figures.push("Uncomfortable Straps", "Uncomfortable Bracelets", "Uncomfortable LegsBracelets");
			p.hideDick = false;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "chains":
			figures.push("Chains");
			p.hideDick = false;
			p.applyNipples = true;
			p.hideHair = false;
			break;
		case "shibari ropes":
			figures.push("Shibari");
			p.hideDick = false;
			p.applyNipples = true;
			p.hideHair = false;
			break;
		case "a toga":
			figures.push("Toga");
			p.applyPanty = true;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a schutzstaffel uniform":
			figures.push("Schutzstaffel Uniform");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a slutty schutzstaffel uniform":
			figures.push("Slutty Schutzstaffel Uniform");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a slave gown":
			figures.push("Slave Gown");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a dirndl":
			figures.push("Dirndl");
			p.applyPanty = true;
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "lederhosen":
			figures.push("Lederhosen Top", "Lederhosen Pants");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "petite admi outfit":
			figures.push("Petite Admi Dress", "Petite Admi Panties", "Petite Admi Heels", "Petite Admi Deco");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			p.applyPumps = true;
			break;
		case "a slutty pony outfit":
			figures.push("Slutty Pony Outfit Mask", "Slutty Pony Outfit Boots", "Slutty Pony Outfit Rings", "Slutty Pony Outfit Suit", "Slutty Pony Outfit Gag");
			p.applyPanty = false;
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = true;
			p.applyBulge = false;
			p.applyExtremeHeels3 = true;
			break;
		case "a long qipao":
			figures.push("Long Qipao");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a maternity dress":
			figures.push("Maternity Dress 2");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a nice nurse outfit":
			figures.push("Nurse Uniform", "Nurse Hat");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a slutty nurse outfit":
			figures.push("Slutty Nurse Bra", "Slutty Nurse Dress", "Slutty Nurse Necklace", "Slutty Nurse Underwear", "Slutty Nurse Boots", "Slutty Nurse Cap");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyPumps = true;
			p.applyBulge = false;
			break;
		case "a slutty maid outfit":
			figures.push("Slutty Maid Dress", "Slutty Maid Bands", "Slutty Maid Neck Bow", "Slutty Maid Shoes", "Slutty Maid Headband");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyPumps = true;
			p.applyBulge = false;
			break;
		case "a nice maid outfit":
			figures.push("Maid Band", "Maid Corset", "Maid Collar", "Maid Panty", "Maid Skirt", "Maid Sleeve Left", "Maid Sleeve Right", "Maid Stocking Left", "Maid Stocking Right", "Maid Top");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a police uniform":
			figures.push("Police Cap", "Police Uniform", "Police Shoes");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = true;
			p.applyBulge = true;
			break;
		case "a biyelgee costume":
			figures.push("Biyelgee Dress");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a one-piece swimsuit":
			figures.push("Swimsuit");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a sports bra":
			figures.push("Sports Bra");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a striped bra":
			figures.push("Striped Bra");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a sweater":
			figures.push("Sweater");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a sweater and cutoffs":
			figures.push("Sweater", "Cutoffs");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a sweater and panties":
			figures.push("Sweater", "Panties");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a t-shirt":
			figures.push("Shirt");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a t-shirt and jeans":
			figures.push("Shirt", "Jeans");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a t-shirt and panties":
			figures.push("Shirt", "Panties");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a t-shirt and thong":
			figures.push("Shirt", "Thong");
			p.applyPanty = true;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a tank-top":
			figures.push("Tank Top");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a tank-top and panties":
			figures.push("Tank Top", "Panties");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a thong":
			figures.push("Thong");
			p.applyPanty = true;
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a tube top":
			figures.push("Tube Top");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a tube top and thong":
			figures.push("Tube Top", "Thong");
			p.applyPanty = true;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "an oversized t-shirt":
			figures.push("Oversized Shirt");
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a leotard":
			figures.push("Leotard");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "an oversized t-shirt and boyshorts":
			figures.push("Oversized Shirt", "Boy Shorts");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "boyshorts":
			figures.push("Boy Shorts");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "panties":
			figures.push("Panties");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "pasties":
			figures.push("Pasties Left", "Pasties Right");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "panties and pasties":
			figures.push("Pasties Left", "Pasties Right", "Panties");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "spats and a tank top":
			figures.push("Spats", "Tank Top");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "sport shorts":
			figures.push("Sports Shorts");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "sport shorts and a sports bra":
			figures.push("Sports Shorts", "Sports Bra");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "sport shorts and a t-shirt":
			figures.push("Sports Shorts", "Shirt");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "stretch pants and a crop-top":
			figures.push("Stretch Pants", "Crop Top");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "leather pants and a tube top":
			figures.push("Leather Pants", "Tube Top");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "leather pants and pasties":
			figures.push("Leather Pants", "Pasties Left", "Pasties Right");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "leather pants":
			figures.push("Leather Pants");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "striped underwear":
			figures.push("Striped Bra", "Striped Panties");
			p.applyPanty = false;
			p.hideDick = true;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "cutoffs":
			figures.push("Cutoffs");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "cutoffs and a t-shirt":
			figures.push("Cutoffs", "Shirt");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "jeans":
			figures.push("Jeans");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a button-up shirt":
			figures.push("Buttonup Shirt");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a button-up shirt and panties":
			figures.push("Buttonup Shirt", "Panties");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a bra":
			figures.push("Bra");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a skimpy loincloth":
			figures.push("Loincloth Skirt");
			p.applyPanty = true;
			p.hideDick = false;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "battlearmor":
			figures.push("Battle Armor");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a scalemail bikini":
			figures.push("Scalemail Bra", "Scalemail Panties", "Scalemail Sandals");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a mini dress":
			figures.push("Mini Dress");
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a cybersuit":
			figures.push("Cybersuit");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			p.applyPumps = true;
			break;
		case "slutty jewelry":
			figures.push("Bangles");
			p.hideDick = false;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a slutty outfit":
			figures.push("Slutty Outfit Tank", "Slutty Outfit Pants", "Slutty Outfit Boots", "Slutty Outfit Necklace");
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			p.applyPanty = false;
			break;
		case "overalls":
			figures.push("Overalls");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "restrictive latex":
			figures.push("Restrictive Latex");
			p.applyPanty = true;
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = true;
			p.applyBulge = true;

			break;
		case "clubslut netting":
			figures.push("Clubslut Netting");
			p.applyPanty = true;
			p.hideDick = false;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a cheerleader outfit":
			figures.push("Cheerleader");
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyPanty = true;
			p.applyBulge = false;
			break;
		case "kitty lingerie":
			figures.push("Kitty Choker", "Kitty Top", "Kitty Panty");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "striped panties":
			figures.push("Striped Panties");
			p.hideDick = true;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a schoolgirl outfit":
			figures.push("School Girl Belly Piercing", "School Girl Choker", "School Girl Panty", "School Girl Skirt", "School Girl Stockings", "School Girl Shirt");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "slutty business attire":
			figures.push("Secretary Glasses", "Secretary Skirt", "Secretary Vest", "Secretary Stockings");
			p.applyPanty = true;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a monokini":
			figures.push("Monokini");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a string bikini":
			figures.push("String Bikini Bottom", "String Bikini Top");
			p.applyPanty = false;
			p.hideDick = false;
			p.applyNipples = true;
			p.hideHair = false;
			break;
		case "conservative clothing":
			figures.push("Flower Blouse", "Capris");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a courtesan dress":
			figures.push("Courtesan Corset", "Courtesan Skirt", "Courtesan Gloves");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a gothic lolita dress":
			figures.push("Gothic Lolita Dress");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a halter top dress":
			figures.push("Haltertop Dress");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "a bimbo outfit":
			figures.push("Bimbo Skirt", "Bimbo Shirt", "Bra", "Thong v2");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "nice business attire":
			figures.push("Blazer Outfit Top", "Jeans v2");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "a ball gown":
			figures.push("Gala Gown");
			p.applyPanty = true;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "a chattel habit":
			figures.push("Chattel Dress", "Chattel Headdress", "Chattel BodySuit", "Chattel Knot");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = true;
			p.applyBulge = false;
			break;
		case "battledress":
			figures.push("Battledress Top", "Battledress Pants");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a succubus outfit":
			figures.push("Succubus Back", "Succubus Belly", "Succubus Hands", "Succubus Feet", "Succubus Torso", "Succubus Horns", "Succubus Tail", "Succubus Wings", "Succubus Spikes");
			p.hideDick = false;
			p.applyNipples = true;
			p.hideHair = false;
			p.applyBulge = false;
			p.applyPanty = true;
			break;
		case "a kimono":
			figures.push("Kimono");
			p.applyPanty = true;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "Western clothing":
			figures.push("Cowgirl Outfit", "Cowgirl Shirt");
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = false;
			break;
		case "a Santa dress":
			figures.push("Santa Outfit");
			p.applyPanty = false;
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "a slutty qipao":
			figures.push("Sexy Cheongsam");
			p.applyPanty = false;
			p.hideDick = false;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "a huipil":
			figures.push("Native Dress");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "a hanbok":
			// figures.push("Chima", "ChimaLayer", "Jeogori");
			// p.applyPanty = false;
			// p.hideDick = true;
			// p.applyNipples = false;
			// p.hideHair = false;
			break;
		case "a red army uniform":
			figures.push("Red Army Uniform");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "a military uniform":
			figures.push("Military Uniform");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			break;
		case "a latex catsuit":
			figures.push("Latex Catsuit");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = false;
			p.applyBulge = true;
			break;
		case "a tight Imperial bodysuit":
			figures.push("Imperial Bodysuit");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = true;
			p.applyBulge = true;
			break;
		case "Imperial Plate":
			figures.push("Imperial Armor");
			p.applyPanty = false;
			p.hideDick = true;
			p.applyNipples = false;
			p.hideHair = true;
			break;
	}

	if (p.underage) {
		if (p.applyPanty) {
			figures.push("Simple Panty");
		}
		p.hideDick = true;
	}

	switch (slave.vaginalAccessory) {
		case "dildo":
			figures.push("Dildo 1");
			break;
	}

	switch (slave.buttplug) {
		case "plug":
			figures.push("Anal Plug 1");
			break;
		case "large plug":
			figures.push("Anal Plug 2");
			break;
		case "huge plug":
			figures.push("Anal Plug 3");
			break;
		case "long plug":
			figures.push("Anal Plug 1");
			break;
		case "long, large plug":
			figures.push("Anal Plug 2");
			break;
		case "long, huge plug":
			figures.push("Anal Plug 3");
			break;
	}

	if (slave.chastityAnus || slave.chastityVagina || slave.chastityPenis) {
		figures.push("Chastity Belt Base");
		if (slave.chastityAnus) {
			figures.push("Chastity Belt Anal Cap with Hole");
		}
		if (slave.chastityVagina) {
			figures.push("Chastity Belt Vaginal Cap with Holes");
			p.hideDick = true;
		}
		if (slave.chastityPenis) {
			figures.push("Chastity Belt Vaginal Cap with Holes");
			p.hideDick = true;
		}
	}

	if (slave.piercing.ear.weight === 1) { figures.push("Light Piercing Left Ear", "Light Piercing Left Ear"); }
	if (slave.piercing.nose.weight === 1) { figures.push("Light Piercing Left Nose"); }
	if (slave.piercing.nose.weight === 2) { figures.push("Heavy Piercing Nose"); }
	if (slave.piercing.eyebrow.weight === 1) { figures.push("Light Piercing Left Eyebrow"); }
	if (slave.piercing.lips.weight === 1) { figures.push("Light Piercing Right Lips"); }
	if (slave.piercing.navel.weight === 1) { figures.push("Light Piercing Belly"); }
	if (slave.piercing.areola.weight === 1) { figures.push("Light Piercing Left Areola"); }
	if (slave.piercing.nipple.weight === 1) { figures.push("Light Piercing Left Nipple", "Light Piercing Right Nipple"); }
	if (slave.piercing.nipple.weight === 2) { figures.push("Heavy Piercing Left Nipple", "Heavy Piercing Right Nipple"); }
	if (slave.piercing.corset.weight === 2) { figures.push("Heavy Piercing Corset"); }
	if (slave.piercing.dick.weight === 2 && slave.dick > 0 && !p.hideDick) { figures.push("Heavy Piercing Dick"); }

	switch (slave.bellyAccessory) {
		case "a corset": figures.push("Corset Tight"); break;
		case "an extreme corset": figures.push("Corset Extreme"); break;
		default: break;
	}

	switch (slave.legAccessory) {
		case "long stockings":
			figures.push("Long Stockings");
			break;
		case "short stockings":
			figures.push("Short Stockings");
			break;
	}

	switch (slave.faceAccessory) {
		case "porcelain mask":
			figures.push("Porcelain Mask");
			break;
	}

	switch (slave.collar) {
		case "preg biometrics":
			figures.push("Pregnancy Collar");
			break;
	}

	switch (slave.shoes) {
		case "extreme heels":
			figures.push("Extreme Heels"); p.applyExtremeHeels = true;
			break;
		case "extreme platform heels":
			figures.push("Extreme Heels 2"); p.applyExtremeHeels2 = true;
			break;
	}

	switch (slave.eyewear) {
		case "blurring glasses":
		case "corrective glasses":
		case "glasses":
			figures.push("Glasses");
			break;
	}

	if (!slave.arm.left && slave.PLimb > 0) {
		figures.push("Amputee Cap Arm Left");
	}
	if (!slave.arm.right && slave.PLimb > 0) {
		figures.push("Amputee Cap Arm Right");
	}

	figures.push("Genesis 8 Female");
	figures.push("Genesis 8 Female Eyelashes");

	if (!p.hideVagina) {
		figures.push("New Genitalia For Victoria 8 - Color Layer");
	}
	if (!p.hideDick) {
		figures.push("Futalicious Shell");
	}

	if (!p.hideHair) {
		if (slave.hLength < 50) {
			switch (slave.hStyle) {
				case "afro": figures.push("Yara Hair"); break;
				case "cornrows": figures.push("Lush"); break;
				case "bun": figures.push("Adia Hair"); break;
				case "neat": figures.push("Samira Hair"); break;
				case "strip": figures.push("Rebel Hair"); break;
				case "tails": figures.push("Kinley Hair G8"); break;
				case "up": figures.push("Pina Hair G8F"); break;
				case "ponytail": figures.push("Ponytail"); break;
				case "braided": figures.push("LLF-MishkaGeBase1"); break;
				case "dreadlocks": figures.push("Dreads"); break;
				case "permed": figures.push("IchigoHair"); break;
				case "curled": figures.push("Havana Hair"); break;
				case "luxurious": figures.push("Rose59"); break;
				case "messy bun": figures.push("Krayon Hair"); break;
				case "messy": figures.push("MessyHairG3"); break;
				case "eary": figures.push("GeorginaHair"); break;
				case "undercut": figures.push("Edit Female Hair"); break;
				case "bangs": figures.push("Neko Hair Genesis 8 Female"); break;
				case "hime": figures.push("Nyohair"); break;
				case "drills": figures.push("Didar"); break;
				case "bald": break;
				case "shaved": break;
				case "buzzcut": break;
				case "trimmed": break;
				case "double buns": figures.push("Gaze"); break;
				case "chignon": figures.push("BaronessHR"); break;
				case "french twist": figures.push("HR TIGER BRAIDS G2F"); break;
				case "crown braid": figures.push("Sky293"); break;
				case "dutch braid": figures.push("Carrousel"); break;
				case "double dutch braid": figures.push("HR TIGER BRAIDS G2F"); break;
				case "pixie cut": break;
				case "bob cut": break;

				default: break;
			}
		} else {
			switch (slave.hStyle) {
				case "afro": figures.push("Yara Hair"); break;
				case "cornrows": figures.push("Lush"); break;
				case "bun": figures.push("Sky158"); break;
				case "neat": figures.push("Samira Hair"); break;
				case "strip": figures.push("Wanda"); break;
				case "tails": figures.push("Suckerpunch"); break;
				case "up": figures.push("Inkstone"); break;
				case "ponytail": figures.push("Paraguay"); break;
				case "braided": figures.push("Butterfly160"); break;
				case "dreadlocks": figures.push("Sparks"); break;
				case "permed": figures.push("Nightwish"); break;
				case "curled": figures.push("Eyesonme"); break;
				case "luxurious": figures.push("Rose59"); break;
				case "messy bun": figures.push("Alice"); break;
				case "messy": figures.push("MessyHairG3"); break;
				case "eary": figures.push("GeorginaHair"); break;
				case "undercut": figures.push("Roulette"); break;
				case "bangs": figures.push("Neko Hair Genesis 8 Female"); break;
				case "hime": figures.push("Peak"); break;
				case "drills": figures.push("LLF-BunnyCurls-G3"); break;
				case "bald": break;
				case "shaved": break;
				case "buzzcut": break;
				case "trimmed": break;
				case "double buns": figures.push("Gaze"); break;
				case "chignon": figures.push("BaronessHR"); break;
				case "french twist": figures.push("HR TIGER BRAIDS G2F"); break;
				case "crown braid": figures.push("Sky293"); break;
				case "dutch braid": figures.push("Carrousel"); break;
				case "double dutch braid": figures.push("HR TIGER BRAIDS G2F"); break;
				case "pixie cut": break;
				case "bob cut": break;

				default: break;
			}
		}
	}

	for (let i=0; i < scene.models[0].figures.length; i++) {
		scene.models[0].figures[i].visible = false;
		for (let j =0; j < figures.length; j++) {
			if (scene.models[0].figures[i].figId === figures[j]) {
				scene.models[0].figures[i].visible = true;
			}
		}
	}
};

App.Art.applySurfaces = function(slave, scene, p) {
	App.Art.seed = App.Art.setSeed(slave, 1000);

	let glansFutaliciousShellLayers = [];
	let shaftFutaliciousShellLayers = [];
	let testiclesFutaliciousShellLayers = [];
	let torsoFrontFutaliciousShellLayers = [];
	let torsoMiddleFutaliciousShellLayers = [];
	let torsoBackFutaliciousShellLayers = [];
	let rectumFutaliciousShellLayers = [];
	let torsoFrontLayers = [];
	let torsoMiddleLayers = [];
	let torsoBackLayers = [];
	let genitaliaLayers = [];
	let anusLayers = [];
	let torsoLayers = [];
	let faceLayers = [];
	let lipsLayers = [];
	let earsLayers = [];
	let legsLayers = [];
	let armsLayers = [];
	let eyesocketLayers = [];
	let toenailsLayers = [];
	let fingernailsLayers = [];

	/** @type {[string, string, boolean|(string[])][]} */
	let surfaces = [];

	if ((slave.dick !== 0 || (!(slave.scrotum <= 0 || slave.balls <= 0))) && !p.hideDick) {
		surfaces.push(["Futalicious_Genitalia_G8F_Shaft_Futalicious_Shell", "visible", true]);
		surfaces.push(["Futalicious_Genitalia_G8F_Glans_Futalicious_Shell", "visible", true]);
		surfaces.push(["Futalicious_Genitalia_G8F_Testicles_Futalicious_Shell", "visible", true]);
		surfaces.push(["Futalicious_Genitalia_G8F_Torso_Front_Futalicious_Shell", "visible", true]);
		surfaces.push(["Futalicious_Genitalia_G8F_Torso_Middle_Futalicious_Shell", "visible", true]);
		surfaces.push(["Futalicious_Genitalia_G8F_Torso_Back_Futalicious_Shell", "visible", true]);
		surfaces.push(["Futalicious_Genitalia_G8F_Rectum_Futalicious_Shell", "visible", false]);
		surfaces.push(["Torso_Front", "visible", true]);
		surfaces.push(["Torso_Middle", "visible", true]);
		surfaces.push(["Torso_Back", "visible", true]);

		surfaces.push(["Genitalia", "visible", true]);
		surfaces.push(["Anus", "visible", true]);
		surfaces.push(["new_gens_V8_1840_Genitalia", "visible", true]);
		surfaces.push(["new_gens_V8_1840_Anus", "visible", true]);
	} else {
		surfaces.push(["Futalicious_Genitalia_G8F_Shaft_Futalicious_Shell", "visible", false]);
		surfaces.push(["Futalicious_Genitalia_G8F_Glans_Futalicious_Shell", "visible", false]);
		surfaces.push(["Futalicious_Genitalia_G8F_Testicles_Futalicious_Shell", "visible", false]);
		surfaces.push(["Futalicious_Genitalia_G8F_Torso_Front_Futalicious_Shell", "visible", false]);
		surfaces.push(["Futalicious_Genitalia_G8F_Torso_Middle_Futalicious_Shell", "visible", false]);
		surfaces.push(["Futalicious_Genitalia_G8F_Torso_Back_Futalicious_Shell", "visible", false]);
		surfaces.push(["Futalicious_Genitalia_G8F_Rectum_Futalicious_Shell", "visible", false]);
		surfaces.push(["Torso_Front", "visible", false]);
		surfaces.push(["Torso_Middle", "visible", false]);
		surfaces.push(["Torso_Back", "visible", false]);

		surfaces.push(["Genitalia", "visible", true]);
		surfaces.push(["Anus", "visible", true]);
		surfaces.push(["new_gens_V8_1840_Genitalia", "visible", true]);
		surfaces.push(["new_gens_V8_1840_Anus", "visible", true]);
	}

	glansFutaliciousShellLayers.push("ao_surface", "TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell");
	shaftFutaliciousShellLayers.push("ao_surface", "TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell");
	testiclesFutaliciousShellLayers.push("ao_surface", "TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell");
	torsoFrontFutaliciousShellLayers.push("ao_surface", "TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell");
	torsoMiddleFutaliciousShellLayers.push("ao_surface", "TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell");
	torsoBackFutaliciousShellLayers.push("ao_surface", "TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell");
	rectumFutaliciousShellLayers.push("ao_surface", "TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell");
	torsoFrontLayers.push("ao_surface", "TemplateTorso", "skindetail_blotches_torso", "skindetail_pores_torso", "skindetail_fine_torso", "skindetail_veins_torso");
	torsoMiddleLayers.push("ao_surface", "TemplateTorso", "skindetail_blotches_torso", "skindetail_pores_torso", "skindetail_fine_torso", "skindetail_veins_torso");
	torsoBackLayers.push("ao_surface", "TemplateTorso", "skindetail_blotches_torso", "skindetail_pores_torso", "skindetail_fine_torso", "skindetail_veins_torso");
	genitaliaLayers.push("ao_surface", "TemplateGenitalia", "skindetail_blotches_torso", "skindetail_pores_torso", "skindetail_fine_torso", "skindetail_veins_torso");
	anusLayers.push("ao_surface", "TemplateAnus", "skindetail_blotches_torso", "skindetail_pores_torso", "skindetail_fine_torso", "skindetail_veins_torso");
	torsoLayers.push("TemplateTorso", "skindetail_blotches_torso", "skindetail_pores_torso", "skindetail_fine_torso", "skindetail_veins_torso");
	faceLayers.push("TemplateFace", "skindetail_blotches_face", "skindetail_pores_face", "skindetail_fine_face", "skindetail_veins_face");
	lipsLayers.push("TemplateLips", "lips_mask");
	earsLayers.push("TemplateEars", "skindetail_blotches_face", "skindetail_pores_face", "skindetail_fine_face", "skindetail_veins_face");
	legsLayers.push("TemplateLegs", "skindetail_blotches_legs", "skindetail_pores_legs", "skindetail_fine_legs", "skindetail_veins_legs");
	armsLayers.push("TemplateArms", "skindetail_blotches_arms", "skindetail_pores_arms", "skindetail_fine_arms", "skindetail_veins_arms");
	eyesocketLayers.push("TemplateFace");
	toenailsLayers.push("TemplateToenails");
	fingernailsLayers.push("TemplateFingernails");

	switch (slave.hStyle) {
		case "pixie cut":
		case "bob cut":
		case "buzzcut":
		case "trimmed":
			torsoLayers.push("shaved_torso");
			faceLayers.push("shaved_face");
			break;
		case "bald":
		case "shaved":
		default:
			break;
	}

	switch (slave.eyebrowFullness) {
		case "bald":
		case "shaved":
			break;
		case "pencil-thin":
			faceLayers.push("eyebrow_pencil");
			break;
		case "thin":
			faceLayers.push("eyebrow_thin");
			break;
		case "threaded":
			faceLayers.push("eyebrow_threaded");
			break;
		case "natural":
			faceLayers.push("eyebrow_natural");
			break;
		case "tapered":
			faceLayers.push("eyebrow_tapered");
			break;
		case "thick":
			faceLayers.push("eyebrow_thick");
			break;
		case "bushy":
			faceLayers.push("eyebrow_bushy");
			break;
	}

	switch (slave.makeup) {
		case 1:
			// Nice
			faceLayers.push("makeup_nice_eyes");
			break;
		case 2:
			// Gorgeous
			faceLayers.push("makeup_gorgeous_eyes");
			faceLayers.push("makeup_gorgeous_blush");
			break;
		case 3:
			// Hair coordinated
			faceLayers.push("makeup_nice_eyes");
			break;
		case 4:
			// Slutty
			faceLayers.push("makeup_slutty_eyes");
			faceLayers.push("makeup_slutty_blush");
			break;
		case 5:
			// Neon
			faceLayers.push("makeup_neon_eyes");
			break;
		case 6:
			// Neon hair coordinated
			faceLayers.push("makeup_neon_eyes");
			break;
		case 7:
			// Metallic
			faceLayers.push("makeup_metallic_eyes");
			break;
		case 8:
			// Metallic hair coordinated
			faceLayers.push("makeup_metallic_eyes");
			break;
	}

	let pubicStyle = "";
	if (slave.physicalAge >= Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY)) {
		switch (slave.pubicHStyle) {
			case "hairless":
			case "waxed":
			case "bald":
				break;
			case "neat":
				pubicStyle = "PubicNeat";
				break;
			case "in a strip":
				pubicStyle = "PubicStrip";
				break;
			case "bushy":
				pubicStyle = "PubicBushy";
				break;
			case "very bushy":
				pubicStyle = "PubicVeryBushy";
				break;
			case "bushy in the front and neat in the rear":
				pubicStyle = "PubicBushyFront";
				break;
			default:
				break;
		}
	}

	if (pubicStyle !== "") {
		torsoLayers.push(pubicStyle);
		genitaliaLayers.push(pubicStyle);
		torsoFrontLayers.push(pubicStyle);
		torsoMiddleLayers.push(pubicStyle);
		torsoFrontFutaliciousShellLayers.push(pubicStyle);
		torsoMiddleFutaliciousShellLayers.push(pubicStyle);
	}

	switch (slave.markings) {
		case "beauty mark":
			torsoLayers.push("skindetail_beauty_marks_torso");
			genitaliaLayers.push("skindetail_beauty_marks_torso");
			faceLayers.push("skindetail_beauty_marks_face");
			armsLayers.push("skindetail_beauty_marks_arms");
			legsLayers.push("skindetail_beauty_marks_legs");
			break;
		case "freckles":
			torsoLayers.push("skindetail_freckles_torso");
			genitaliaLayers.push("skindetail_freckles_torso");
			faceLayers.push("skindetail_freckles_face");
			armsLayers.push("skindetail_freckles_arms");
			legsLayers.push("skindetail_freckles_legs");
			break;
		case "heavily freckled":
			torsoLayers.push("skindetail_heavy_freckles_torso");
			genitaliaLayers.push("skindetail_heavy_freckles_torso");
			faceLayers.push("skindetail_heavy_freckles_face");
			armsLayers.push("skindetail_heavy_freckles_arms");
			legsLayers.push("skindetail_heavy_freckles_legs");
			break;
		case "birthmark":
			torsoLayers.push("skindetail_birthmarks_torso");
	}

	torsoLayers.push("nipple_mask");

	function getDecalArea(location) {
		switch (location) {
			case "back": return [[[-0.35, -0.15, 0.1, 0.3], [0.35, -0.15, -0.1, 0.3]], [-0.28, 0.0], torsoLayers];
			case "chest": return [[[-0.1, -0.15, 0.2, 0.08]], [0.0, -0.11], torsoLayers];
			case "left breast": return [[[0.02, -0.07, 0.1, 0.09]], [0.07, -0.05], torsoLayers];
			case "right breast": return [[[-0.12, -0.07, 0.1, 0.09]], [-0.07, -0.05], torsoLayers];
			case "left buttock": return [[[0.25, 0.25, 0.2, 0.1]], [0.32, 0.29], torsoLayers];
			case "right buttock": return [[[-0.45, 0.25, 0.2, 0.1]], [-0.32, 0.29], torsoLayers];
			case "neck": return [[[-0.4, -0.27, 0.8, 0.05]], [0.0, -0.22], torsoLayers];
			case "lower back": return [[[-0.35, 0.1, 0.1, 0.1], [0.35, 0.1, -0.1, 0.1]], [-0.27, 0.15], torsoLayers];
			case "left shoulder": return [[[0.13, -0.2, 0.1, 0.1]], [0.14, -0.17], torsoLayers];
			case "right shoulder": return [[[-0.23, -0.2, 0.1, 0.1]], [-0.14, -0.17], torsoLayers];
			case "left abdomen": return [[[0.00, 0.2, 0.1, 0.1]], [0.05, 0.22], torsoLayers];
			case "right abdomen": return [[[-0.1, 0.2, 0.1, 0.1]], [-0.05, 0.22], torsoLayers];

			case "pubic mound": return [[[-0.05, 0.33, 0.1, 0.04]], [0.0, 0.35], genitaliaLayers];

			case "left cheek": return [[[0.1, 0.1, 0.1, 0.1]], [0.15, 0.15], faceLayers];
			case "right cheek": return [[[-0.2, 0.1, 0.1, 0.1]], [-0.15, 0.15], faceLayers];

			case "left ears": return [[[0.3, -0.45, 0.15, 0.15]], [0.375, -0.375], earsLayers];
			case "right ears": return [[[-0.45, -0.45, 0.15, 0.15]], [-0.375, -0.375], earsLayers];

			case "left hand": return [[[0.28, -0.4, 0.1, 0.3]], [0.32, -0.33], armsLayers];
			case "right hand": return [[[-0.38, 0.1, 0.1, 0.3]], [-0.32, 0.16], armsLayers];
			case "left wrist": return [[[0.18, -0.35, 0.1, 0.2]], [0.22, -0.3], armsLayers];
			case "right wrist": return [[[-0.28, 0.15, 0.1, 0.2]], [-0.22, 0.19], armsLayers];
			case "left lower arm": return [[[-0.05, -0.4, 0.2, 0.25]], [0.05, -0.275], armsLayers];
			case "right lower arm": return [[[-0.15, 0.1, 0.2, 0.25]], [-0.05, 0.225], armsLayers];
			case "left upper arm": return [[[-0.4, -0.45, 0.3, 0.3]], [-0.25, -0.3], armsLayers];
			case "right upper arm": return [[[0.1, 0.05, 0.3, 0.3]], [0.25, 0.2], armsLayers];

			case "left ankle": return [[[0.2, 0.2, 0.25, 0.07]], [0.325, 0.235], legsLayers];
			case "right ankle": return [[[-0.45, 0.2, 0.25, 0.07]], [-0.325, 0.235], legsLayers];
			case "left calf": return [[[0.35, -0.12, 0.1, 0.25]], [0.38, -0.04], legsLayers];
			case "right calf": return [[[-0.45, -0.12, 0.1, 0.25]], [-0.38, -0.04], legsLayers];
			case "left thigh": return [[[0.08, -0.42, 0.32, 0.25]], [0.18, -0.4], legsLayers];
			case "right thigh": return [[[-0.4, -0.42, 0.32, 0.25]], [-0.18, -0.4], legsLayers];
			case "left foot": return [[[0.26, 0.25, 0.12, 0.1]], [0.32, 0.33], legsLayers];
			case "right foot": return [[[-0.38, 0.25, 0.12, 0.1]], [-0.32, 0.33], legsLayers];

			default: return [null, null, null];
		}
	}

	function generateDecalScar(location, area, matId, kind) {
		let mat = App.Art.getMaterialById(scene, "scars_" + kind);
		if (mat !== null) {
			let r1 = App.Art.random();
			let r2 = App.Art.random();
			let r3 = App.Art.random();
			let r4 = App.Art.random();
			let a = area[Math.floor(area.length * r4)];

			let scale;
			switch (location) {
				case "left cheek": scale = 1; break;
				case "right cheek": scale = 1; break;
				default: scale = 0.4;
			}

			mat = JSON.parse(JSON.stringify(mat));
			mat.matId = matId;
			mat.transform = [r1 * a[2] + a[0], r2 * a[3] + a[1], r3*6.28, scale];
			scene.materials.push(mat);
		}
	}

	function applyScars(slave, location, area, layers) {
		const scars = App.Medicine.Modification.scarRecord(slave);
		for (let kind in scars[location]) {
			for (let i = 0; i < scars[location][kind]; i++) {
				let matId = location + kind + i;
				if (App.Art.getMaterialById(scene, matId) == null)	{
					generateDecalScar(location, area, matId, kind);
				}
				layers.push(matId);
			}
		}
	}

	function generateDecalText(pos, matId, letter, scale) {
		let mat = App.Art.getMaterialById(scene, "letters_" + letter);
		if (mat !== null) {
			mat = JSON.parse(JSON.stringify(mat));
			mat.matId = matId;
			mat.transform = [pos[0], pos[1], 0, scale];
			scene.materials.push(mat);
		}
	}

	function generateText(text, location, center, layers) {
		for (let i = 0; i < text.length; i++) {
			let letter = text.charAt(i).toLowerCase();
			let matId = "text" + location + text + i;

			if (App.Art.getMaterialById(scene, matId) == null)	{
				let scale = 0.02;
				let width = scale * text.length;
				let height = scale;

				let pos = [center[0] - (width/2) + (scale/2) + scale * i, center[1] - (height/2) + (scale/2)];
				generateDecalText(pos, matId, letter, scale);
			}
			layers.push(matId);
		}
	}

	function applyBrands(slave, location, center, layers) {
		const brands = App.Medicine.Modification.brandRecord(slave);
		let text = brands[location];

		switch (text) {
			case "your initials":
				text = V.PC.birthName.charAt(0).toLowerCase() + (V.PC.birthSurname + " ").charAt(0).toLowerCase(); break;
			case "the number of children $he has birthed":
				text = "" + slave.counter.birthsTotal; break;
			case "$his virginity status":
				text = slave.vagina === 0 ? "virgin": ""; break;
			case "$his current height":
				text = "" + slave.height; break;
			default:
				if (App.Medicine.Modification.Brands.personal.hasOwnProperty(text) ||
					App.Medicine.Modification.Brands.genitalSymbol.hasOwnProperty(text) ||
					App.Medicine.Modification.Brands.silhouettes.hasOwnProperty(text) ||
					App.Medicine.Modification.Brands.FS.hasOwnProperty(text)) {
					return;
				}
		}
		generateText(text, location, center, layers);
	}

	if (slave.breedingMark === 1) {
		genitaliaLayers.push("tattoo_breeding");
		torsoLayers.push("tattoo_breeding");
	}

	if (slave.birthsTat > 0 && slave.birthsTat >= 100) {
		let location = "left abdomen";
		let [, center, layer] = getDecalArea(location);
		if (layer !== null) {
			generateText(String(slave.birthsTat), location, center, layer);
		}
	}

	if (slave.birthsTat > 0 && slave.birthsTat < 100) { // let's make sure we don't generate too many materials
		let location = "left thigh";
		let [, center, layer] = getDecalArea(location);
		if (layer !== null) {
			for (let i = 0; i < slave.birthsTat; i++) {
				let matId = "birthcount" + location + i;

				if (App.Art.getMaterialById(scene, matId) == null)	{
					let scale = 0.015;
					let width = scale * 5;
					let height = scale;
					let row = Math.trunc(i / 5);
					let col = i % 5;

					let mat = App.Art.getMaterialById(scene, "tattoo_birthcount");
					if (mat !== null) {
						mat = JSON.parse(JSON.stringify(mat));
						mat.matId = matId;
						mat.transform = [center[0] + 0.06 - (width/2) + (scale/2) + scale * col, center[1] - scale * 2.5 + height * row + scale * 0.1 * row, 0, scale];
						scene.materials.push(mat);
					}
				}
				layer.push(matId);
			}
		}
	}

	if (slave.abortionTat > 0) {
		let location = "right abdomen";
		let [, center, layer] = getDecalArea("right abdomen");
		if (layer !== null) {
			generateText(String(slave.abortionTat), location, center, layer);
		}
	}


	for (let key in slave) {
		if (key.endsWith("Tat")) {
			let tatLocation = key.split("Tat")[0];
			let tatDesign = slave[key];

			switch (tatDesign) {
				case "bleached":
					if (tatLocation === "anus") {
						surfaces.push(["new_gens_V8_1840_Anus", "visible", false]);
					}
					break;
				case "permanent makeup":
					faceLayers.push("tattoo_makeup");
					lipsLayers.push("tattoo_makeup");
					break;
				case "lewd crest":
					genitaliaLayers.push("tattoo_lewdcrest");
					torsoLayers.push("tattoo_lewdcrest");
					break;

				// navel
				case "a heart": torsoLayers.push("tattoo_heart"); break;
				case "a butterfly": torsoLayers.push("tattoo_butterfly"); break;
				case "a star": torsoLayers.push("tattoo_star"); break;

				case "flowers":
					if (tatLocation === "shoulders") {
						armsLayers.push("tattoo_flowers_arm");
					} else if (tatLocation === "boobs") {
						torsoLayers.push("tattoo_flowers_body");
					} else if (tatLocation === "legs") {
						legsLayers.push("tattoo_flowers_leg");
					} break;

				case "tribal patterns":
				case "counting":
				case "advertisements":
				case "rude words":
				case "degradation":
				case "Asian art":
				case "scenes":
				case "bovine patterns":
				case "sacrilege":
				case "sacrament":
				case "possessive":
				case "paternalist":
				default:
					break;
			}
		}
	}

	for (let location in App.Medicine.Modification.scarRecord(slave)) {
		let [area,, layer] = getDecalArea(location);
		if (layer !== null) {
			applyScars(slave, location, area, layer);
		}
	}

	const brands = App.Medicine.Modification.brandRecord(slave);
	for (let location in brands) {
		let [, center, layer] = getDecalArea(location);
		if (layer !== null) {
			applyBrands(slave, location, center, layer);
		}
	}

	surfaces.push(["Futalicious_Genitalia_G8F_Shaft_Futalicious_Shell", "matIds", shaftFutaliciousShellLayers]);
	surfaces.push(["Futalicious_Genitalia_G8F_Glans_Futalicious_Shell", "matIds", glansFutaliciousShellLayers]);
	surfaces.push(["Futalicious_Genitalia_G8F_Testicles_Futalicious_Shell", "matIds", testiclesFutaliciousShellLayers]);
	surfaces.push(["Futalicious_Genitalia_G8F_Torso_Front_Futalicious_Shell", "matIds", torsoFrontFutaliciousShellLayers]);
	surfaces.push(["Futalicious_Genitalia_G8F_Torso_Middle_Futalicious_Shell", "matIds", torsoMiddleFutaliciousShellLayers]);
	surfaces.push(["Futalicious_Genitalia_G8F_Torso_Back_Futalicious_Shell", "matIds", torsoBackFutaliciousShellLayers]);
	surfaces.push(["Futalicious_Genitalia_G8F_Rectum_Futalicious_Shell", "matIds", rectumFutaliciousShellLayers]);
	surfaces.push(["Torso_Front", "matIds", torsoFrontLayers]);
	surfaces.push(["Torso_Middle", "matIds", torsoMiddleLayers]);
	surfaces.push(["Torso_Back", "matIds", torsoBackLayers]);
	surfaces.push(["Genitalia", "matIds", genitaliaLayers]);
	surfaces.push(["Anus", "matIds", anusLayers]);
	surfaces.push(["Torso", "matIds", torsoLayers]);
	surfaces.push(["Face", "matIds", faceLayers]);
	surfaces.push(["Lips", "matIds", lipsLayers]);
	surfaces.push(["Ears", "matIds", earsLayers]);
	surfaces.push(["Legs", "matIds", legsLayers]);
	surfaces.push(["Arms", "matIds", armsLayers]);
	surfaces.push(["EyeSocket", "matIds", eyesocketLayers]);
	surfaces.push(["Toenails", "matIds", toenailsLayers]);
	surfaces.push(["Fingernails", "matIds", fingernailsLayers]);

	for (let i=0, count=0; i < scene.models[0].figures.length; i++) {
		for (let j=0; j < scene.models[0].figures[i].surfaces.length; j++, count++) {
			for (let h =0; h < surfaces.length; h++) {
				if (scene.models[0].figures[i].surfaces[j].surfaceId === surfaces[h][0]) {
					scene.models[0].figures[i].surfaces[j][surfaces[h][1]] = surfaces[h][2];
				}
			}
		}
	}
};

App.Art.applyMaterials = function(slave, scene, p) {
	App.Art.seed = App.Art.setSeed(slave, 2000);

	let materials = [];

	let hairColor = App.Art.hexToRgb(extractColor(slave.hColor));
	let lipsColor = App.Art.hexToRgb(skinColorCatcher(slave).areolaColor); // Nox
	let areolaColor = App.Art.hexToRgb(skinColorCatcher(slave).areolaColor);

	hairColor = [hairColor[0], hairColor[1], hairColor[2]];

	let makeupColor;
	let makeupOpacity;
	let lipsGloss = 2.0;
	let lipsRough = 0.5;
	let lipsMetal = 0;

	switch (slave.makeup) {
		case 1:
			// Nice
			makeupColor = "#ff69b4";
			makeupOpacity = 0.5;
			lipsRough = 0.35;
			break;
		case 2:
			// Gorgeous
			makeupColor = "#8b008b";
			makeupOpacity = 0.7;
			lipsRough = 0.3;
			break;
		case 3:
			// Hair coordinated
			makeupColor = extractColor(slave.hColor);
			makeupOpacity = 0.3;
			break;
		case 4:
			// Slutty
			makeupColor = "#B70000";
			makeupOpacity = 0.8;
			lipsRough = 0.2;
			break;
		case 5:
			// Neon
			makeupColor = "#DC143C";
			makeupOpacity = 1;
			lipsMetal = 0.5;
			break;
		case 6:
			// Neon hair coordinated
			makeupColor = extractColor(slave.hColor);
			makeupOpacity = 1;
			lipsMetal = 0.5;
			break;
		case 7:
			// Metallic
			makeupColor = "#b22222";
			makeupOpacity = 0.7;
			lipsMetal = 1;
			break;
		case 8:
			// Metallic hair coordinated
			makeupColor = extractColor(slave.hColor);
			makeupOpacity = 0.7;
			lipsMetal = 1;
			break;
		default:
			makeupColor = "#ffffff";
			makeupOpacity = 0;
			break;
	}

	makeupColor = App.Art.hexToRgb(makeupColor);

	let nailColor;
	switch (slave.nails) {
		case 2:
			// color-coordinated with hair
			nailColor = extractColor(slave.hColor);
			break;
		case 4:
			// bright and glittery
			nailColor = "#ff0000";
			break;
		case 5:
			// very long and garish
			nailColor = "#ff0000";
			break;
		case 6:
			// neon
			nailColor = "#DC143C";
			break;
		case 7:
			// color-coordinated neon
			nailColor = extractColor(slave.hColor);
			break;
		case 8:
			// metallic
			nailColor = "#b22222";
			break;
		case 9:
			// color-coordinated metallic
			nailColor = extractColor(slave.hColor);
			break;
		default:
			nailColor = "#ffffff";
			break;
	}

	nailColor = App.Art.hexToRgb(nailColor);

	if (slave.hLength < 50) {
		switch (slave.hStyle) {
			case "afro":
				materials.push(["yara_scalp", "Ka", hairColor]);
				materials.push(["yara_hair", "Ka", hairColor]);
				break;
			case "cornrows":
				materials.push(["lush_s4studio_mesh_4", "Ka", hairColor]);
				break;
			case "bun":
				materials.push(["adia_scalp", "Ka", hairColor]);
				materials.push(["adia_hair", "Ka", hairColor]);
				break;
			case "neat":
				materials.push(["samira_scalp", "Ka", hairColor]);
				materials.push(["samira_hair", "Ka", hairColor]);
				break;
			case "strip":
				materials.push(["rebel_scalp", "Ka", hairColor]);
				materials.push(["rebel_hair", "Ka", hairColor]);
				break;
			case "tails":
				materials.push(["kinley_scalp", "Ka", hairColor]);
				materials.push(["kinley_hair_thin_strands", "Ka", hairColor]);
				materials.push(["kinley_hair_long", "Ka", hairColor]);
				materials.push(["kinley_hair_strands", "Ka", hairColor]);
				materials.push(["kinley_hair_base", "Ka", hairColor]);
				materials.push(["kinley_hair_tie", "Ka", hairColor]);
				break;
			case "up":
				materials.push(["pina_scalp", "Ka", hairColor]);
				materials.push(["pina_hair1", "Ka", hairColor]);
				materials.push(["pina_hair2", "Ka", hairColor]);
				break;
			case "ponytail":
				materials.push(["ponytail_scalp", "Ka", hairColor]);
				materials.push(["ponytail_hair1", "Ka", hairColor]);
				materials.push(["ponytail_hair2", "Ka", hairColor]);
				materials.push(["ponytail_hair3", "Ka", hairColor]);
				materials.push(["ponytail_holder", "Ka", hairColor]);
				break;
			case "braided":
				materials.push(["mishka_scalp", "Ka", hairColor]);
				materials.push(["mishka_hair1", "Ka", hairColor]);
				materials.push(["mishka_hair2", "Ka", hairColor]);
				materials.push(["mishka_hair3", "Ka", hairColor]);
				break;
			case "dreadlocks":
				materials.push(["dreads_scalp", "Ka", hairColor]);
				materials.push(["dreads_hair", "Ka", hairColor]);
				break;
			case "permed":
				materials.push(["ichigo_scalp", "Ka", hairColor]);
				materials.push(["ichigo_hair1", "Ka", hairColor]);
				materials.push(["ichigo_hair2", "Ka", hairColor]);
				break;
			case "curled":
				materials.push(["havana_hair", "Ka", hairColor]);
				break;
			case "luxurious":
				materials.push(["rose59_geom_00", "Ka", hairColor]);
				break;
			case "messy bun":
				materials.push(["krayon_scalp", "Ka", hairColor]);
				materials.push(["krayon_hair1", "Ka", hairColor]);
				materials.push(["krayon_hair2", "Ka", hairColor]);
				materials.push(["krayon_hair3", "Ka", hairColor]);
				materials.push(["krayon_hair4", "Ka", hairColor]);
				break;
			case "messy":
				materials.push(["messy_scalp", "Ka", hairColor]);
				materials.push(["messy_hair", "Ka", hairColor]);
				break;
			case "eary":
				materials.push(["georgina_scalp", "Ka", hairColor]);
				materials.push(["georgina_hair1", "Ka", hairColor]);
				materials.push(["georgina_hair2", "Ka", hairColor]);
				break;
			case "undercut":
				materials.push(["edit_scalp", "Ka", hairColor]);
				materials.push(["edit_hair", "Ka", hairColor]);
				break;
			case "bangs":
				materials.push(["neko_scalp", "Ka", hairColor]);
				materials.push(["neko_hair", "Ka", hairColor]);
				break;
			case "hime":
				materials.push(["nyo_scalp", "Ka", hairColor]);
				materials.push(["nyo_hair", "Ka", hairColor]);
				break;
			case "drills":
				materials.push(["didar_didar", "Ka", hairColor]);
				break;
			case "french twist":
				materials.push(["tiger_scalp", "Ka", hairColor]);
				materials.push(["tiger_hair", "Ka", hairColor]);
				break;
			case "chignon":
				materials.push(["baroness_scalp", "Ka", hairColor]);
				materials.push(["baroness_hair", "Ka", hairColor]);
				break;
			case "crown braid":
				materials.push(["sky293_s4studio_mesh_2", "Ka", hairColor]);
				break;
			case "double dutch braid":
				materials.push(["tiger_scalp", "Ka", hairColor]);
				materials.push(["tiger_hair", "Ka", hairColor]);
				break;
			case "double buns":
				materials.push(["gaze_s4studio_mesh_3", "Ka", hairColor]);
				break;
			case "dutch braid":
				materials.push(["carrousel_dicksquad", "Ka", hairColor]);
				break;
			case "buzzcut":
			case "trimmed":
				materials.push(["shaved_face", "Ka", hairColor]);
				materials.push(["shaved_torso", "Ka", hairColor]);
				break;
			case "bald":
			case "shaved":
			default: break;
		}
	} else {
		switch (slave.hStyle) {
			case "afro":
				materials.push(["yara_scalp", "Ka", hairColor]);
				materials.push(["yara_hair", "Ka", hairColor]);
				break;
			case "cornrows":
				materials.push(["lush_s4studio_mesh_4", "Ka", hairColor]);
				break;
			case "bun":
				materials.push(["sky158_groupname", "Ka", hairColor]);
				break;
			case "neat":
				materials.push(["samira_scalp", "Ka", hairColor]);
				materials.push(["samira_hair", "Ka", hairColor]);
				break;
			case "strip":
				materials.push(["wanda_groupname", "Ka", hairColor]);
				break;
			case "tails":
				materials.push(["suckerpunch_hair", "Ka", hairColor]);
				break;
			case "up":
				materials.push(["inkstone_groupname", "Ka", hairColor]);
				break;
			case "ponytail":
				materials.push(["paraguay_group_1", "Ka", hairColor]);
				break;
			case "braided":
				materials.push(["butterfly160_s4studio_mesh_1", "Ka", hairColor]);
				break;
			case "dreadlocks":
				materials.push(["sparks_s4studio_mesh_2", "Ka", hairColor]);
				break;
			case "permed":
				materials.push(["nightwish_group_1", "Ka", hairColor]);
				break;
			case "curled":
				materials.push(["eyesonme_hair", "Ka", hairColor]);
				break;
			case "luxurious":
				materials.push(["rose59_geom_00", "Ka", hairColor]);
				break;
			case "messy bun":
				materials.push(["alice_group_1", "Ka", hairColor]);
				break;
			case "messy":
				materials.push(["messy_scalp", "Ka", hairColor]);
				materials.push(["messy_hair", "Ka", hairColor]);
				break;
			case "eary":
				materials.push(["georgina_scalp", "Ka", hairColor]);
				materials.push(["georgina_hair1", "Ka", hairColor]);
				materials.push(["georgina_hair2", "Ka", hairColor]);
				break;
			case "undercut":
				materials.push(["roulette_roulette", "Ka", hairColor]);
				break;
			case "bangs":
				materials.push(["neko_scalp", "Ka", hairColor]);
				materials.push(["neko_hair", "Ka", hairColor]);
				break;
			case "hime":
				materials.push(["peak_group_1", "Ka", hairColor]);
				break;
			case "drills":
				materials.push(["bunny_scalp", "Ka", hairColor]);
				materials.push(["bunny_hair1", "Ka", hairColor]);
				materials.push(["bunny_hair2", "Ka", hairColor]);
				materials.push(["bunny_hair3", "Ka", hairColor]);
				materials.push(["bunny_hair4", "Ka", hairColor]);
				break;
			case "french twist":
				materials.push(["tiger_scalp", "Ka", hairColor]);
				materials.push(["tiger_hair", "Ka", hairColor]);
				break;
			case "chignon":
				materials.push(["baroness_scalp", "Ka", hairColor]);
				materials.push(["baroness_hair", "Ka", hairColor]);
				break;
			case "crown braid":
				materials.push(["sky293_s4studio_mesh_2", "Ka", hairColor]);
				break;
			case "double dutch braid":
				materials.push(["tiger_scalp", "Ka", hairColor]);
				materials.push(["tiger_hair", "Ka", hairColor]);
				break;
			case "double buns":
				materials.push(["gaze_s4studio_mesh_3", "Ka", hairColor]);
				break;
			case "dutch braid":
				materials.push(["carrousel_dicksquad", "Ka", hairColor]);
				break;
			case "buzzcut":
			case "trimmed":
				materials.push(["shaved_face", "Ka", hairColor]);
				materials.push(["shaved_torso", "Ka", hairColor]);
				break;
			case "bald":
			case "shaved":
			default: break;
		}
	}

	let eyebrowColor = App.Art.hexToRgb(extractColor(slave.eyebrowHColor));

	switch (slave.eyebrowFullness) {
		case "bald":
		case "shaved":
			break;
		case "pencil-thin":
			materials.push(["eyebrow_pencil", "Ka", eyebrowColor]);
			break;
		case "thin":
			materials.push(["eyebrow_thin", "Ka", eyebrowColor]);
			break;
		case "threaded":
			materials.push(["eyebrow_threaded", "Ka", eyebrowColor]);
			break;
		case "natural":
			materials.push(["eyebrow_natural", "Ka", eyebrowColor]);
			break;
		case "tapered":
			materials.push(["eyebrow_tapered", "Ka", eyebrowColor]);
			break;
		case "thick":
			materials.push(["eyebrow_thick", "Ka", eyebrowColor]);
			break;
		case "bushy":
			materials.push(["eyebrow_bushy", "Ka", eyebrowColor]);
			break;
	}

	let eyelashes = ["base2/eyelash/EyeLash_5.jpg", "base/G8FBaseEyelashes_1006.jpg"];
	if (slave.makeup > 0) {
		eyelashes = ["base2/eyelash/Genesis8Eyelashes 1.jpg", "base2/eyelash/Genesis8Eyelashes 2.jpg", "base2/eyelash/Genesis8Eyelashes 4.jpg",
			"base2/eyelash/Genesis8Eyelashes 5.jpg", "base2/eyelash/Genesis8Eyelashes 6.jpg", "base2/eyelash/Genesis8Eyelashes 7.jpg",
			"base2/eyelash/Genesis8Eyelashes 8.jpg", "base2/eyelash/Genesis8Eyelashes 9.jpg", "base2/eyelash/Genesis8Eyelashes 11.jpg",
			"base2/eyelash/Genesis8Eyelashes 12.jpg", "base2/eyelash/Genesis8Eyelashes 13.jpg", "base2/eyelash/Genesis8Eyelashes 14.jpg"];
	}
	let eyelash = Math.floor(App.Art.random() * eyelashes.length);
	materials.push(["Eyelashes", "map_D", eyelashes[eyelash]]);

	let irisColorLeft = App.Art.hexToRgb(extractColor(slave.eye.left ? extractColor(slave.eye.left.iris) : extractColor("black")));
	let irisColorRight = App.Art.hexToRgb(extractColor(slave.eye.right ? extractColor(slave.eye.right.iris) : extractColor("black")));
	let scleraColorLeft = App.Art.hexToRgb(extractColor(slave.eye.left ? extractColor(slave.eye.left.sclera) : extractColor("black")));
	let scleraColorRight = App.Art.hexToRgb(extractColor(slave.eye.right ? extractColor(slave.eye.right.sclera) : extractColor("black")));

	materials.push(["Iris_Left", "Ka", [irisColorLeft[0]*2.5, irisColorLeft[1]*2.5, irisColorLeft[2]*2.5]]);
	materials.push(["Iris_Right", "Ka", [irisColorRight[0]*2.5, irisColorRight[1]*2.5, irisColorRight[2]*2.5]]);
	materials.push(["Sclera_Left", "Ka", [scleraColorLeft[0]*1.4, scleraColorLeft[1]*1.4, scleraColorLeft[2]*1.4]]);
	materials.push(["Sclera_Right", "Ka", [scleraColorRight[0]*1.4, scleraColorRight[1]*1.4, scleraColorRight[2]*1.4]]);

	// expected skin color
	let O = App.Art.hexToRgb(skinColorCatcher(slave).skinColor);
	if (O[0]+O[1]+O[2] > 2.75) { // small hack to tune down the brightest colors
		O = [O[0]*0.94, O[1] * 0.94, O[2] * 0.94];
	}

	// calculate lips and areola color based on skin color and brightness
	let lbrf = Math.min((O[0] + O[1] + O[2])/3+0.4, 1);
	lipsColor = [O[0]*0.76*lbrf, O[1]*0.55*lbrf, O[2]*0.6*lbrf];
	areolaColor = clone(lipsColor);

	lipsColor[0] = makeupColor[0] * makeupOpacity + lipsColor[0] * (1 - makeupOpacity);
	lipsColor[1] = makeupColor[1] * makeupOpacity + lipsColor[1] * (1 - makeupOpacity);
	lipsColor[2] = makeupColor[2] * makeupOpacity + lipsColor[2] * (1 - makeupOpacity);

	// average skin texture color
	let oSkinColors = {
		"Ayumi":		[253/255, 217/255, 208/255],
		"Tara": 		[194/255, 148/255, 124/255],
		"Saffron": 		[246/255, 209/255, 193/255],
		"Reagan": 		[224/255, 180/255, 151/255],
		"Mylou": 		[212/255, 166/255, 140/255],
		"Minami": 		[191/255, 164/255, 143/255],
		"Kimmy": 		[216/255, 185/255, 167/255],
		"Kathy": 		[219/255, 154/255, 132/255],
		// "DarkSkin": 	[92/255, 68/255, 58/255],
		"Daphne": 		[199/255, 157/255, 133/255],
		"Ceridwen": 	[238/255, 216/255, 203/255],
		"Celinette": 	[223/255, 210/255, 204/255],
		"Base": 		[215/255, 181/255, 156/255],
		// "Angelica": 	[117/255, 70/255, 54/255],
		"Adaline": 		[208/255, 154/255, 126/255],
		// "Topmodel": 	[198/255, 153/255, 122/255]
		"Kelly":		[207/255, 149/255, 103/255],
		"Zalena":		[136/255, 103/255, 86/255],
		"Mowad":		[207/255, 169/255, 148/255],
	};

	let oCockColors = {
		"White": 	[180/255, 170/255, 164/255],
		"Light": 	[185/255, 160/255, 143/255],
		"Mid": 		[200/255, 155/255, 124/255],
		"Dark": 	[85/255, 56/255, 42/255],
	};

	// find nearest skin texture
	let distance = [];
	for (const [, value] of Object.entries(oSkinColors)) {
		let noise = App.Art.random()*(60/255); // add random error term to sample similar skins
		distance.push((value[0] - O[0])**2 + (value[1] - O[1])**2 + (value[2] - O[2])**2 + noise**2);
	}
	let skin = Object.keys(oSkinColors)[distance.indexOf(Math.min(...distance))];
	// find multiplication factor skin texture color -> skin color
	let Oc = oSkinColors[skin];
	let mO = [O[0]/Oc[0], O[1]/Oc[1], O[2]/Oc[2]];

	// find nearest cock texture
	distance = [];
	for (const [, value] of Object.entries(oCockColors)) {
		distance.push((value[0] - O[0])**2 + (value[1] - O[1])**2 + (value[2] - O[2])**2);
	}
	let cockSkin = Object.keys(oCockColors)[distance.indexOf(Math.min(...distance))];

	// find multiplication factor cock texture color -> skin color
	let Occ = oCockColors[cockSkin];
	let cbrf = Math.min((O[0] + O[1] + O[2])/3+0.5, 1);
	let mOc = [O[0]/Occ[0]*0.85*cbrf, O[1]/Occ[1]*0.85*cbrf, O[2]/Occ[2]*0.85*cbrf];

	// skin specularity related values
	let Ks;
	let r;
	let rN;
	let Ni;

	if (slave.clothes === "body oil") {
		r = 0.4;
		rN = 0.4;
		Ni = 1.5;
	} else {
		r = 0.65;
		rN = 0.55;
		Ni = 1.35;
	}

	let Obr = (O[0] + O[1] + O[2])/3;
	Ks = [Obr*2+0.5, Obr*2+0.5, Obr*2+0.5];

	// apply
	materials.push(["TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell", "map_Ka", "dick/" + cockSkin + "Cock.jpg"]);
	materials.push(["TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell", "Ka", mOc]);
	materials.push(["TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell", "Ks", Ks]);
	materials.push(["TemplateFutalicious_Genitalia_G8F_Glans_Futalicious_Shell", "Ni", Ni]);

	materials.push(["nipple_mask", "Ka", areolaColor]);
	materials.push(["nipple_mask", "Ks", Ks]);
	materials.push(["nipple_mask", "r", rN]);
	materials.push(["nipple_mask", "Ni", Ni]);
	materials.push(["nipple_mask", "d", 0.6]);

	materials.push(["lips_mask", "Ka", lipsColor]);
	materials.push(["lips_mask", "Ni", lipsGloss]);
	materials.push(["lips_mask", "m", lipsMetal]);
	materials.push(["lips_mask", "r", lipsRough]);
	materials.push(["lips_mask", "d", 1.0]);

	materials.push(["TemplateTorso", "Ka", mO]);
	materials.push(["TemplateTorso", "Ks", Ks]);
	materials.push(["TemplateTorso", "r", r]);
	materials.push(["TemplateTorso", "Ni", Ni]);
	materials.push(["TemplateTorso", "map_Ka", "base/skin/" + skin + "Torso.jpg"]);
	materials.push(["TemplateArms", "Ka", mO]);
	materials.push(["TemplateArms", "Ks", Ks]);
	materials.push(["TemplateArms", "r", r]);
	materials.push(["TemplateArms", "Ni", Ni]);
	materials.push(["TemplateArms", "map_Ka", "base/skin/" + skin + "Arms.jpg"]);
	materials.push(["TemplateLegs", "Ka", mO]);
	materials.push(["TemplateLegs", "Ks", Ks]);
	materials.push(["TemplateLegs", "r", r]);
	materials.push(["TemplateLegs", "Ni", Ni]);
	materials.push(["TemplateLegs", "map_Ka", "base/skin/" + skin + "Legs.jpg"]);
	materials.push(["TemplateFace", "Ka", mO]);
	materials.push(["TemplateFace", "Ks", Ks]);
	materials.push(["TemplateFace", "r", r]);
	materials.push(["TemplateFace", "Ni", Ni]);
	materials.push(["TemplateFace", "map_Ka", "base/skin/" + skin + "Face.jpg"]);
	materials.push(["TemplateEars", "Ka", mO]);
	materials.push(["TemplateEars", "Ks", Ks]);
	materials.push(["TemplateEars", "r", r]);
	materials.push(["TemplateEars", "Ni", Ni]);
	materials.push(["TemplateEars", "map_Ka", "base/skin/" + skin + "Face.jpg"]);
	materials.push(["TemplateLips", "Ka", mO]);
	materials.push(["TemplateLips", "Ni", lipsGloss]);
	materials.push(["TemplateLips", "m", lipsMetal]);
	materials.push(["TemplateLips", "r", lipsRough]);
	materials.push(["TemplateLips", "map_Ka", "base/skin/" + skin + "Face.jpg"]);
	materials.push(["TemplateFingernails", "Ka", nailColor]);
	materials.push(["TemplateFingernails", "map_Ka", "base/skin/" + skin + "Arms.jpg"]);
	materials.push(["TemplateToenails", "Ka", nailColor]);
	materials.push(["TemplateToenails", "map_Ka", "base/skin/" + skin + "Legs.jpg"]);
	materials.push(["TemplateAnus", "Ka", mO]);
	materials.push(["TemplateAnus", "Ks", Ks]);
	materials.push(["TemplateAnus", "r", r]);
	materials.push(["TemplateAnus", "Ni", Ni]);
	materials.push(["TemplateAnus", "map_Ka", "base/skin/" + skin + "Torso.jpg"]);
	materials.push(["TemplateGenitalia", "Ka", mO]);
	materials.push(["TemplateGenitalia", "Ks", Ks]);
	materials.push(["TemplateGenitalia", "r", r]);
	materials.push(["TemplateGenitalia", "Ni", Ni]);
	materials.push(["TemplateGenitalia", "map_Ka", "base/skin/" + skin + "Torso.jpg"]);

	if (slave.physicalAge >= Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY)) {
		const pubicColor = App.Art.hexToRgb(extractColor(slave.pubicHColor));
		switch (slave.pubicHStyle) {
			case "hairless":
			case "waxed":
			case "bald":
				break;
			case "neat":
				materials.push(["PubicNeat", "Ka", pubicColor]);
				break;
			case "in a strip":
				materials.push(["PubicStrip", "Ka", pubicColor]);
				break;
			case "bushy":
				materials.push(["PubicBushy", "Ka", pubicColor]);
				break;
			case "very bushy":
				materials.push(["PubicVeryBushy", "Ka", pubicColor]);
				break;
			case "bushy in the front and neat in the rear":
				materials.push(["PubicBushyFront", "Ka", pubicColor]);
				break;
			default:
				break;
		}
	}

	switch (slave.vaginaLube) {
		case 0:
			materials.push(["new_gens_V8_1840_Genitalia", "r", 0.5]);
			materials.push(["new_gens_V8_1840_Anus", "r", 0.5]);
			break;
		case 1:
			materials.push(["new_gens_V8_1840_Genitalia", "r", 0.4]);
			materials.push(["new_gens_V8_1840_Anus", "r", 0.4]);
			break;
		case 2:
			materials.push(["new_gens_V8_1840_Genitalia", "r", 0.3]);
			materials.push(["new_gens_V8_1840_Anus", "r", 0.3]);
			break;
	}

	let blotchesDetail = 0;
	materials.push(["skindetail_blotches_torso", "d", blotchesDetail]);
	materials.push(["skindetail_blotches_face", "d", blotchesDetail]);
	materials.push(["skindetail_blotches_arms", "d", blotchesDetail]);
	materials.push(["skindetail_blotches_legs", "d", blotchesDetail]);

	let poresDetail = 0;
	materials.push(["skindetail_pores_torso", "d", poresDetail]);
	materials.push(["skindetail_pores_face", "d", poresDetail]);
	materials.push(["skindetail_pores_arms", "d", poresDetail]);
	materials.push(["skindetail_pores_legs", "d", poresDetail]);

	let fineDetail = 0;
	materials.push(["skindetail_fine_torso", "d", fineDetail]);
	materials.push(["skindetail_fine_face", "d", fineDetail]);
	materials.push(["skindetail_fine_arms", "d", fineDetail]);
	materials.push(["skindetail_fine_legs", "d", fineDetail]);

	let veins = 0;
	materials.push(["skindetail_veins_torso", "d", veins]);
	materials.push(["skindetail_veins_face", "d", veins]);
	materials.push(["skindetail_veins_arms", "d", veins]);
	materials.push(["skindetail_veins_legs", "d", veins]);

	switch (slave.markings) {
		case "beauty mark":
			materials.push(["skindetail_beauty_marks_torso", "d", 1]);
			materials.push(["skindetail_beauty_marks_face", "d", 1]);
			materials.push(["skindetail_beauty_marks_arms", "d", 1]);
			materials.push(["skindetail_beauty_marks_legs", "d", 1]);
			break;
		case "freckles":
			materials.push(["skindetail_freckles_torso", "d", 0.7]);
			materials.push(["skindetail_freckles_face", "d", 0.8]);
			materials.push(["skindetail_freckles_arms", "d", 0.7]);
			materials.push(["skindetail_freckles_legs", "d", 0.7]);
			break;
		case "heavily freckled":
			materials.push(["skindetail_heavy_freckles_torso", "d", 0.7]);
			materials.push(["skindetail_heavy_freckles_face", "d", 0.8]);
			materials.push(["skindetail_heavy_freckles_arms", "d", 0.7]);
			materials.push(["skindetail_heavy_freckles_legs", "d", 0.7]);
			break;
		case "birthmark":
			materials.push(["skindetail_birthmarks_torso", "d", 1]);
			materials.push(["skindetail_birthmarks_torso", "Ka", [O[0]+0.2, O[1]+0.2, O[2]+0.2]]);
	}

	let torso = App.Art.getMatIdsBySurface(scene, "Torso")[0];

	const scars = App.Medicine.Modification.scarRecord(slave);
	if (scars.hasOwnProperty("belly") && scars.belly["c-section"] > 0) {
		materials.push([torso, "map_Kn", "base/Victoria8_Torso_CNM_1002_3.jpg"]);
	} else {
		materials.push([torso, "map_Kn", "base/Victoria8_Torso_NM_1002_3.jpg"]);
	}

	if (slave.collar === "preg biometrics") {
		if (slave.preg > 0) {
			materials.push(["pregnancy_collar_screen", "map_Ke", "dummy1"]);
		} else {
			materials.push(["pregnancy_collar_screen", "map_Ke", "dummy0"]);
		}
	}

	if ("glassesColor" in slave) {
		materials.push(["glasses_frame", "Ka", App.Art.hexToRgb(slave.glassesColor)]);
		materials.push(["porcelain_mask_mask", "Ka", App.Art.hexToRgb(slave.glassesColor)]);
	}
	if (slave.dick !== 0 || (!(slave.scrotum <= 0 || slave.balls <= 0))) {
		materials.push(["slutty_pony_outfit_suit_leather2", "d", 0]);
	}

	for (let i =0; i < scene.materials.length; i++) {
		for (let j =0; j < materials.length; j++) {
			if (scene.materials[i].matId === materials[j][0]) {
				scene.materials[i][materials[j][1]] = materials[j][2];
			}
		}
	}
};

App.Art.artSize = 0; // capture the artSize variable from ui.js

App.Art.getAnimState = function(slave, scene, p, morphs, isAnimTick) {
	// variable shortcuts (array variables) - pose || face || breathing || blink || look X || look Y
	let animLength = p.animVars[0]; // how many seconds the anim will play over
	let animPower = p.animVars[1]; // morph strength
	let animDelay = p.animVars[2];  // how long to wait until playing the next anim
	let currentAnim = p.animVars[3];
	let animFrame = p.animVars[4]; // tracking how many frames into the anim
	let eyeMoveReciprocal = p.animVars[5]; // randomly decides whether eye movements follow head movements

	const poseAnimList = ["idle1", "idle2", "idle3", "idle4"];
	const faceAnimList = [];
	if (Math.random() < (slave.trust + 100) / 200) {
		// trusting slave - happy animations
		faceAnimList.push("expressionsHappy", "expressionsHappyCheerful", "expressionsHappyDelighted", "expressionsHappyFriendly", "expressionsHappySweet");
	} else {
		// fearful slave - fear/sad animations
		faceAnimList.push("expressionsFear", "expressionsFearAlarm", "expressionsFearAnticipation", "expressionsFearFrightened", "expressionsSadConfused", "expressionsSadOffended", "expressionsSadDejected", "expressionsSadIll");
	}
	if (Math.random() < (slave.devotion + 100) / 200) {
		// devoted slave - seductive animations
		faceAnimList.push("expressionsSeductiveDesire", "expressionsSeductiveLoving");
	} else {
		// hateful slave - angry animations
		faceAnimList.push("expressionsAngerFierce", "expressionsAngerGrumpy", "expressionsAngerSnarl");
	}
	const animList = [poseAnimList, faceAnimList];

	// run animations from here
	for (let i = 0; i < animFrame.length; i++) {
		if (App.Art.artSize < 3 && !(i === 0 || i === 4 || i === 5)) {
			currentAnim[i] = "";
			continue; // skip face | blink | breath anims if small frames
		}

		// reset anim
		if (currentAnim[i] === "") {
			switch (i) {
				case 0: // pose
					currentAnim[i] = animList[i][Math.floor(Math.random() * animList[i].length)];
					if (App.Art.artSize === 1) {
						animLength[i] = (Math.random() * 0.5) + 0.5;
						animDelay[i] = (Math.floor(Math.random() * 4) + 1) * V.animFPS;
					} else {
						animLength[i] = (Math.random() * 4) + 2;
						animDelay[i] = (Math.floor(Math.random() * 25) + 5) * V.animFPS;
					}
					break;
				case 1: // facial exp
					currentAnim[i] = animList[i][Math.floor(Math.random() * animList[i].length)];
					animLength[i] = (Math.random() * 4) + 1;
					animDelay[i] = (Math.floor(Math.random() * 20) + 10) * V.animFPS;
					animPower[i] = (Math.random() * 0.75) + 0.25;
					break;
				case 2: // breathing
					currentAnim[i] = "breathAnim";
					animLength[i] = (Math.random() * 2) + 2;
					animDelay[i] = (Math.floor(Math.random() * 2) + 1) * V.animFPS;
					animPower[i] = (Math.random() * 0.025) + 0.025;
					break;
				case 3: // blink
					currentAnim[i] = "blinkAnim";
					animLength[i] = (Math.random() * 0.25) + 0.25;
					animDelay[i] = (Math.floor(Math.random() * 8) + 2) * V.animFPS;
					break;
				case 4: // look X
				case 5: // look Y
					if (currentAnim[4] === "" && currentAnim[5] === "") {
						currentAnim[4] = jsEither(["headBendLeft", "headTwistLeft", "headBendRight", "headTwistRight"]);
						animLength[4] = (Math.random() * 2) + 0.5;
						animDelay[4] = (Math.floor(Math.random() * 10) + 5) * V.animFPS;
						animPower[4] = Math.random();

						currentAnim[5] = ((Math.random() < (slave.trust + 100) / 200) ? "down" : "up");
						eyeMoveReciprocal = (Math.random() > (slave.trust + 100) / 200);
						animLength[5] = (Math.random() * 2) + 0.5;
						animDelay[5] = (Math.floor(Math.random() * 10) + 5) * V.animFPS;
						animPower[5] = Math.random();
					}
					break;
			}
			animFrame[i] = 0;
		}

		const animState = Math.sin((Math.PI / (Math.floor(animLength[i] * V.animFPS))) * animFrame[i] - (Math.PI / 2));
		const getAnimState = (morphPower) => (animState * (Math.abs(morphPower) / 2)) + (morphPower / 2);

		// animation picker
		switch (i) {
			case 0: { // pose
				// lots of things change arms down and legs closed states, so these need to be summated and pushed as one morph below
				let slaveArmsDown = 0;
				let slaveLegsClosed = 0;

				if (!scene.inspect) {
					if (slave.scrotum > 20) {
						if (slave.devotion <= 50) {
							slaveArmsDown += Math.max(Math.min(-slave.weight/300/3.5, -slave.scrotum/200), -0.5);
						}

						if (p.applyExtremeHeels || p.applyExtremeHeels2) {
							slaveLegsClosed += Math.max(Math.min(-slave.weight/300/3.5 - 0.5, -slave.scrotum/20), -1.5);
						} else {
							slaveLegsClosed += Math.max(Math.min(-slave.weight/300/3.5, -slave.scrotum/20), -1.5);
						}
					} else {
						if (slave.devotion <= 50) {
							slaveArmsDown += Math.max(-slave.weight/300/3.5, -0.5);
						}

						if (p.applyExtremeHeels || p.applyExtremeHeels2 && !scene.inspect) {
							slaveLegsClosed += Math.max(-slave.weight/300/3.5 - 0.5, -1.5);
						} else {
							slaveLegsClosed += Math.max(-slave.weight/300/3.5, -1.5);
						}
					}
				}

				switch (currentAnim[i]) {
					case "idle1":
						if (slave.devotion > 50) {
							morphs.push(["posesHigh", 1 - getAnimState(0.5)]);
							slaveArmsDown += getAnimState(0.4);
							if (p.applyExtremeHeels || p.applyExtremeHeels2) {
								slaveLegsClosed -= getAnimState(0.5);
							}
						} else if (slave.devotion > -20) {
							morphs.push(["posesMid", 1 - getAnimState(0.5)]);
						} else {
							morphs.push(["posesLow", 1 - getAnimState(0.5)]);
							slaveArmsDown += getAnimState(0.2);
						}
						morphs.push(["posesInspect2", getAnimState(0.5)]);
						break;
					case "idle2":
						if (slave.devotion > 50) {
							morphs.push(["posesHigh", 1 - getAnimState(0.4)]);
							morphs.push(["posesLow", getAnimState(0.6)]);
							slaveArmsDown += getAnimState(0.1);
							if (p.applyExtremeHeels || p.applyExtremeHeels2) {
								slaveLegsClosed -= getAnimState(0.5);
							}
						} else if (slave.devotion > -20) {
							morphs.push(["posesMid", 1 - getAnimState(0.5)]);
							morphs.push(["posesHigh", getAnimState(0.3)]);
							slaveArmsDown += getAnimState(0.1);
						} else {
							morphs.push(["posesLow", 1 - getAnimState(0.6)]);
							morphs.push(["posesHigh", getAnimState(0.4)]);
							slaveArmsDown += getAnimState(0.1);
						}
						break;
					case "idle3":
						if (slave.devotion > 50) {
							morphs.push(["posesHigh", 1]);
							morphs.push(["posesInspect2", getAnimState(-0.25)]);
							slaveArmsDown += getAnimState(0.2);
							if (p.applyExtremeHeels || p.applyExtremeHeels2) {
								slaveLegsClosed -= getAnimState(0.5);
							}
						} else if (slave.devotion > -20) {
							morphs.push(["posesMid", 1]);
							morphs.push(["posesInspect2", getAnimState(-0.2)]);
						} else {
							morphs.push(["posesLow", getAnimState(1.2)]);
							morphs.push(["posesInspect2", getAnimState(-0.2)]);
						}
						break;
					case "idle4":
						if (slave.devotion > 50) {
							morphs.push(["posesHigh", 1 - getAnimState(0.8)]);
							morphs.push(["posesLow", getAnimState(0.2)]);
							morphs.push(["posesMid", getAnimState(0.6)]);
							if (p.applyExtremeHeels || p.applyExtremeHeels2) {
								slaveLegsClosed -= getAnimState(0.5);
							}
						} else if (slave.devotion > -20) {
							morphs.push(["posesMid", 1 - getAnimState(0.4)]);
							morphs.push(["posesLow", getAnimState(0.2)]);
							morphs.push(["posesHigh", getAnimState(0.2)]);
						} else {
							morphs.push(["posesLow", 1 - getAnimState(0.8)]);
							morphs.push(["posesMid", getAnimState(0.6)]);
							morphs.push(["posesHigh", getAnimState(0.2)]);
						}
						break;
				}

				if (slaveArmsDown > 0) {
					morphs.push(["poseArmsDown", Math.min(Math.max(slaveArmsDown, 0), 1)]);
				}
				if (slaveLegsClosed !== 0) {
					morphs.push(["posesLegsClosed", Math.min(Math.max(slaveLegsClosed, -1), 1)]);
				}
				break;
			}
			case 1: // facial exp
				morphs.push([currentAnim[i], getAnimState(animPower[i])]);
				break;
			case 2: // breathing
				morphs.push(["posesInspect", getAnimState(animPower[i]) - (animPower[i] / 2)]);
				morphs.push(["bodyShape2", getAnimState(animPower[i]) - (animPower[i] / 2)]); // note, may need to change this morph if Elohiem decides to use it for something later; see commented code ln 2321
				break;
			case 3: // blink
				morphs.push(["eyesClosed", Math.min(Math.max(getAnimState(1.0), 0), 1)]);
				break;
			case 4: // look X
				if (currentAnim[i] === "") {
					break; // little catch code if it's waiting for look Y to reset
				}
				morphs.push([currentAnim[i], getAnimState(animPower[i] * 0.5)]);
				if (currentAnim[i] === "headBendLeft" || currentAnim[i] === "headTwistLeft") {
					if (eyeMoveReciprocal) {
						morphs.push(["eyesLookRight", getAnimState(animPower[i] * 0.75)]);
					} else {
						morphs.push(["eyesLookLeft", getAnimState(animPower[i] * 0.75)]);
					}
				} else {
					if (eyeMoveReciprocal) {
						morphs.push(["eyesLookLeft", getAnimState(animPower[i] * 0.75)]);
					} else {
						morphs.push(["eyesLookRight", getAnimState(animPower[i] * 0.75)]);
					}
				}
				break;
			case 5: // look Y
				switch (currentAnim[i]) {
					case "up":
						morphs.push(["headBendBackwards", getAnimState(animPower[i] * 0.15)]);
						if (eyeMoveReciprocal) {
							morphs.push(["eyesLookDown", getAnimState(animPower[i] * 0.5)]);
						} else {
							morphs.push(["eyesLookUp", getAnimState(animPower[i] * 0.5)]);
						}
						break;
					case "down":
						morphs.push(["headBendForward", getAnimState(animPower[i] * 0.25)]);
						if (eyeMoveReciprocal) {
							morphs.push(["eyesLookUp", getAnimState(animPower[i] * 0.5)]);
						} else {
							morphs.push(["eyesLookDown", getAnimState(animPower[i] * 0.5)]);
						}
						break;
				}
				break;
		}

		// do animation tick
		if (isAnimTick) { // this is needed so that mouse movement frame updates don't break animation state
			if (animState === 1.0 || animFrame[i] === 0) { // pause during start and apogee of anim track
				animDelay[i]--;
				if (animDelay[i] <= 0) {
					switch (i) {
						case 0: // pose
							if (App.Art.artSize === 1) {
								animDelay[i] = (Math.floor(Math.random() * 4) + 1) * V.animFPS;
							} else {
								animDelay[i] = (Math.floor(Math.random() * 10) + 10) * V.animFPS;
							}
							break;
						case 1: // facial exp
							animDelay[i] = (Math.floor(Math.random() * 20) + 10) * V.animFPS;
							break;
						case 2: // breathing
							animDelay[i] = (Math.floor(Math.random() * 2) + 1) * V.animFPS;
							break;
						case 3: // blink
							animDelay[i] = 0;
							break;
						case 4: // look X
						case 5: // look Y
							animDelay[i] = (Math.floor(Math.random() * 10) + 5) * V.animFPS;
							break;
					}
					animFrame[i]++;
				}
			} else if (animState === -1.0 && animFrame[i] > 0) { // end of anim track
				currentAnim[i] = "";
			} else {
				animFrame[i]++;
			}
		}
	}
};

App.Art.applyMorphs = function(slave, scene, p, isAnimating) {
	App.Art.seed = App.Art.setSeed(slave, 3000);

	let morphs = [];

	function convertRange(sourceMin, sourceMax, targetMin, targetMax, value) {
		let out = (targetMax-targetMin);
		out /= (sourceMax-sourceMin);
		out *= (value-sourceMin);
		return out +targetMin;
	}

	if (slave.dick !== 0 || (!(slave.scrotum <= 0 || slave.balls <= 0))) {
		morphs.push(["futaGenFix", 1]);
	}

	if (p.applyPumps) {
		morphs.push(["posesHeels", 1]);
	}

	if (p.applyExtremeHeels) {
		morphs.push(["posesExtremeHeels", 1]);
	}

	if (p.applyExtremeHeels2) {
		morphs.push(["posesExtremeHeels2", 1]);
	}

	if (p.applyExtremeHeels3) {
		morphs.push(["posesExtremeHeels3", 1]);
		scene.models[0].transform.y = 10;
	}

	if (!isAnimating) { // animation code now handles these morphs directly
		if (slave.arm.right && slave.arm.left && slave.leg.right && slave.leg.left) {
			if (scene.inspect) {
				morphs.push(["posesInspect2", 1]);
				morphs.push(["posesInspectGen2", 1]);
			} else {
				if (slave.devotion > 50) {
					morphs.push(["posesHigh", 1]);
				} else if (slave.devotion > -20) {
					morphs.push(["posesMid", 1]);
				} else {
					morphs.push(["posesLow", 1]);
				}

				if (slave.scrotum > 20) {
					if (slave.devotion <= 50) {
						morphs.push(["posesArmsDown", Math.max(Math.min(-slave.weight/300/3.5, -slave.scrotum/200), -0.5)]);
					}

					if (p.applyExtremeHeels || p.applyExtremeHeels2) {
						morphs.push(["posesLegsClosed", Math.max(Math.min(-slave.weight/300/3.5 - 0.5, -slave.scrotum/20), -1.5)]);
					} else {
						morphs.push(["posesLegsClosed", Math.max(Math.min(-slave.weight/300/3.5, -slave.scrotum/20), -1.5)]);
					}
				} else {
					if (slave.devotion <= 50) {
						morphs.push(["posesArmsDown", Math.max(-slave.weight/300/3.5, -0.5)]);
					}

					if (p.applyExtremeHeels || p.applyExtremeHeels2) {
						morphs.push(["posesLegsClosed", Math.max(-slave.weight/300/3.5 - 0.5, -1.5)]);
					} else {
						morphs.push(["posesLegsClosed", Math.max(-slave.weight/300/3.5, -1.5)]);
					}
				}
			}
		}

		if (slave.trust < 0) {
			morphs.push(["expressionsFear", Math.abs(slave.trust)/100]);
		} else {
			morphs.push(["expressionsHappy", slave.trust/100]);
		}
	}

	// used for interpolating mixed race based on slave ID
	// let races = ["raceWhite", "raceAsian", "raceLatina", "raceBlack", "racePacific", "raceEuropean", "raceAmerindian", "raceSemitic", "raceEastern", "raceAryan", "raceLatina", "raceMalay"];
	// let index1 = Math.floor(App.Art.random() * races.length);
	// let index2 = Math.floor(App.Art.random() * (races.length-1));
	/*
	switch (slave.race) {
		case "white":
			morphs.push(["raceWhite", 1]); break;
		case "asian":
			morphs.push(["raceAsian", 1]); break;
		case "latina":
			morphs.push(["raceLatina", 1]); break;
		case "black":
			morphs.push(["raceBlack", 1]); break;
		case "pacific islander":
			morphs.push(["racePacific", 1]); break;
		case "southern european":
			morphs.push(["raceEuropean", 1]); break;
		case "amerindian":
			morphs.push(["raceAmerindian", 1]); break;
		case "semitic":
			morphs.push(["raceSemitic", 1]); break;
		case "middle eastern":
			morphs.push(["raceEastern", 1]); break;
		case "indo-aryan":
			morphs.push(["raceAryan", 1]); break;
		case "malay":
			morphs.push(["raceMalay", 1]); break;
		case "mixed race":
			morphs.push([races[index1], 0.5]);
			races.splice(index1, index1);
			morphs.push([races[index2], 0.5]);
			break;
	}


	switch (slave.race) {
		case "white":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceEurope1", 1]); break;
				case "masculine":
					morphs.push(["raceEurope10", 1]); break;
				case "androgynous":
					morphs.push(["raceEurope15", 1]); break;
				case "cute":
					morphs.push(["raceEurope16", 1]); break;
				case "sensual":
					morphs.push(["raceEurope17", 1]); break;
				case "exotic":
					morphs.push(["raceEurope14", 1]); break;
			} break;
		case "asian":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceAsia1", 1]); break;
				case "masculine":
					morphs.push(["raceAsia17", 1]); break;
				case "androgynous":
					morphs.push(["raceAsia10", 1]); break;
				case "cute":
					morphs.push(["raceAsia14", 1]); break;
				case "sensual":
					morphs.push(["raceAsia15", 1]); break;
				case "exotic":
					morphs.push(["raceAsia16", 1]); break;
			} break;
		case "latina":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceAfrica4", 1]); break;
				case "masculine":
					morphs.push(["raceAfrica6", 1]); break;
				case "androgynous":
					morphs.push(["raceAfrica1", 1]); break;
				case "cute":
					morphs.push(["raceAfrica5", 1]); break;
				case "sensual":
					morphs.push(["raceAfrica10", 1]); break;
				case "exotic":
					morphs.push(["raceAfrica2", 1]); break;
			} break;
		case "black":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceAfrica3", 1]); break;
				case "masculine":
					morphs.push(["raceAfrica6", 1]); break;
				case "androgynous":
					morphs.push(["raceAfrica1", 1]); break;
				case "cute":
					morphs.push(["raceAfrica7", 1]); break;
				case "sensual":
					morphs.push(["raceAfrica8", 1]); break;
				case "exotic":
					morphs.push(["raceAfrica9", 1]); break;
			} break;
		case "pacific islander":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceAsia8", 1]); break;
				case "masculine":
					morphs.push(["raceAsia9", 1]); break;
				case "androgynous":
					morphs.push(["raceAsia6", 1]); break;
				case "cute":
					morphs.push(["raceAsia7", 1]); break;
				case "sensual":
					morphs.push(["raceAsia19", 1]); break;
				case "exotic":
					morphs.push(["raceAsia5", 1]); break;
			} break;
		case "southern european":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceEurope11", 1]); break;
				case "masculine":
					morphs.push(["raceEurope12", 1]); break;
				case "androgynous":
					morphs.push(["raceEurope3", 1]); break;
				case "cute":
					morphs.push(["raceEurope2", 1]); break;
				case "sensual":
					morphs.push(["raceEurope18", 1]); break;
				case "exotic":
					morphs.push(["raceEurope13", 1]); break;
			} break;
		case "amerindian":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceAfrica4", 1]); break;
				case "masculine":
					morphs.push(["raceAfrica6", 1]); break;
				case "androgynous":
					morphs.push(["raceAfrica1", 1]); break;
				case "cute":
					morphs.push(["raceAfrica5", 1]); break;
				case "sensual":
					morphs.push(["raceAfrica10", 1]); break;
				case "exotic":
					morphs.push(["raceAfrica2", 1]); break;
			} break;
		case "semitic":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceAfrica3", 1]); break;
				case "masculine":
					morphs.push(["raceAfrica6", 1]); break;
				case "androgynous":
					morphs.push(["raceAfrica1", 1]); break;
				case "cute":
					morphs.push(["raceAfrica7", 1]); break;
				case "sensual":
					morphs.push(["raceAfrica8", 1]); break;
				case "exotic":
					morphs.push(["raceAfrica9", 1]); break;
			} break;
		case "middle eastern":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceEurope6", 1]); break;
				case "masculine":
					morphs.push(["raceEurope4", 1]); break;
				case "androgynous":
					morphs.push(["raceEurope8", 1]); break;
				case "cute":
					morphs.push(["raceEurope5", 1]); break;
				case "sensual":
					morphs.push(["raceEurope9", 1]); break;
				case "exotic":
					morphs.push(["raceEurope7", 1]); break;
			} break;
		case "indo-aryan":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceAsia3", 1]); break;
				case "masculine":
					morphs.push(["raceAsia20", 1]); break;
				case "androgynous":
					morphs.push(["raceAsia18", 1]); break;
				case "cute":
					morphs.push(["raceAsia4", 1]); break;
				case "sensual":
					morphs.push(["raceAsia12", 1]); break;
				case "exotic":
					morphs.push(["raceAsia11", 1]); break;
			} break;
		case "malay":
			switch (slave.faceShape) {
				case "normal":
					morphs.push(["raceAsia2", 1]); break;
				case "masculine":
					morphs.push(["raceAsia13", 1]); break;
				case "androgynous":
					morphs.push(["raceAsia6", 1]); break;
				case "cute":
					morphs.push(["raceAsia7", 1]); break;
				case "sensual":
					morphs.push(["raceAsia19", 1]); break;
				case "exotic":
					morphs.push(["raceAsia5", 1]); break;
			} break;
		case "mixed race":
			//morphs.push([races[index1], 0.5]);
			//races.splice(index1, index1);
			//morphs.push([races[index2], 0.5]);
			break;
	}*/

	let whiteRaces = [	"WhiteNaryssa", "WhiteNastja", "WhiteNiamh", "WhiteOddveig",
		"WhiteOlivia", "WhiteRanvig", "WhiteReagan",
		"WhiteSarah", "WhiteShani", "WhiteSofya", "WhiteSorrell",
		"WhiteSummer", "WhiteSybil", "WhiteTara", "WhiteVera",
		"WhiteVigdis", "WhiteYana", "WhiteAlbina", "WhiteAmber",
		"WhiteAriah", "WhiteBellatrix", "WhiteCamille", "WhiteCap1",
		"WhiteCap2", "WhiteCap3", "WhiteCap4", "WhiteCap5",
		"WhiteCarina", "WhiteCarys", "WhiteCatalea", "WhiteCecillia",
		"WhiteCharlene", "WhiteCharlotte", "WhiteCiel", "WhiteCoco",
		"WhiteDuffy", "WhiteElizabeth", "WhiteErika",
		"WhiteFiona", "WhiteGuillia", "WhiteIrene", "WhiteJane",
		"WhiteJette", "WhiteJulie", "WhiteKelsey", "WhiteKensington",
		"WhiteLida", "WhiteLuciana", "WhiteLudovica", "WhiteManon",
		"WhiteMargit", "WhiteMary", "WhiteMia", "WhiteMira",
		"WhiteMowad", "WhiteMylou", "WhiteNadezhda"];

	let blackRaces = [ "BlackKhalida", "BlackLeila", "BlackMirlande",
		"BlackNaiya", "BlackNasiche", "BlackPatricia", "BlackSaalinge",
		"BlackSadio", "BlackSahana", "BlackSamanya", "BlackShangrilla",
		"BlackSoumaya", "BlackTendai", "BlackTulinagwe", "BlackVande",
		"BlackXiluva", "BlackZalena", "BlackZara", "BlackAngelica",
		"BlackArden", "BlackFarah", "BlackFatimata",
		"BlackHabibah", "BlackJeta", "BlackKanoni"];

	let asianRaces = ["AsianKazue", "AsianKorea", "AsianKumiko", "AsianLamai",
		"AsianLexi", "AsianLi", "AsianMaekhao", "AsianMaris",
		"AsianMinami", "AsianNeha", "AsianSaloni", "AsianAoi",
		"AsianAusanat", "AsianAyumi", "AsianChiyo", "AsianDuan",
		"AsianHannMei", "AsianHarshita", "AsianHaruna", "AsianIchigo",
		"AsianJing", "AsianJiyeong", "AsianKanya", "AsianFemaleFace1", "AsianFemaleFace2",
		"AsianFemaleFace3", "AsianFemaleFace4", "AsianFemaleFace5"];

	let whiteRace = Math.floor(App.Art.random() * whiteRaces.length);
	let blackRace = Math.floor(App.Art.random() * blackRaces.length);
	let asianRace = Math.floor(App.Art.random() * asianRaces.length);

	switch (slave.race) {
		case "white":
		case "southern european":
		case "pacific islander":
		case "latina":
		case "amerindian":
		case "indo-aryan":
			morphs.push([whiteRaces[whiteRace], 1]);
			break;
		case "asian":
		case "malay":
			morphs.push([asianRaces[asianRace], 1]);
			break;
		case "black":
		case "semitic":
		case "middle eastern":
			morphs.push([blackRaces[blackRace], 1]);
			break;
		case "mixed race":
			morphs.push([whiteRaces[whiteRace], 0.33]);
			morphs.push([asianRaces[asianRace], 0.33]);
			morphs.push([blackRaces[blackRace], 0.33]);
			break;
	}

	morphs.push(["obliqueLower", App.Art.random()]);
	morphs.push(["iliacLower", App.Art.random()]);
	morphs.push(["monsPubis", App.Art.random()*2-1]);
	morphs.push(["scapulaFold", App.Art.random()]);
	morphs.push(["lumbarAngle", App.Art.random()]);
	morphs.push(["chestDepression", App.Art.random()]);
	morphs.push(["adductorGap", convertRange(-1, 1, -0.5, 1, App.Art.random()*2-1)]);
	morphs.push(["lowerShape1", App.Art.random()]);

	switch (slave.ears) {
		case "pointy" :
			morphs.push(["earShapePointy", 1]);
			break;
		default:
			break;
	}

	let ribShape = ["ribShape0", "ribShape1", "ribShape2", "ribShape3", "ribShape4", "ribShape5"];
	let rib = Math.floor(App.Art.random() * ribShape.length);
	if (rib > 0) {
		morphs.push([ribShape[rib], 1]);
	}

	/* Elohiem, if you decide to reactivate this bit, note that I'm using "bodyShape2" for breathing animations --BI
	let bodyShape = ["bodyShape0", "bodyShape1", "bodyShape2", "bodyShape3", "bodyShape4", "bodyShape5"];
	let body = Math.floor(App.Art.random() * bodyShape.length);
	if (body > 0) {
		morphs.push([bodyShape[body], 1]);
	}*/

	/*
	if (slave.lips < 10) {
		morphs.push(["lipsShapeThin", 1]);
	} else if (slave.lips < 20) {
		morphs.push(["lipsShapeNormal", 1]);
	} else if (slave.lips < 40) {
		morphs.push(["lipsShapePretty", 1]);
	} else if (slave.lips < 70) {
		morphs.push(["lipsShapePlush", 1]);
	} else if (slave.lips < 95) {
		morphs.push(["lipsShapeHuge", 1]);
	} else {
		morphs.push(["lipsShapeFacepussy", slave.lips/100]);
	}*/


	if (slave.lips < 15) {
		morphs.push(["lips", (slave.lips-15)/30]);
	} else {
		morphs.push(["lips", (slave.lips-15)/75]);
	}

	/*
	let eye = Math.floor(App.Art.random() * 8);
	switch (eye) {
		case 0: break;
		case 1: morphs.push(["eyeShapeWide", 1]); break;
		case 2: morphs.push(["eyeShapeRound", 0.5]); break;
		case 3: morphs.push(["eyeShapeSmall", 1]); break;
		case 4: morphs.push(["eyeShapeSlit", 1]); break;
		case 5: morphs.push(["eyeShapeCute", 1]); break;
		case 6: morphs.push(["eyeShapeAlmond", 0.5]); break;
		case 7: morphs.push(["eyeShapeOpen", 0.5]); break;
	}*/



	// eyeShapeInward2
	// eyeShapeInward1

	// morphs.push(["eyeShapeInner" + Math.ceil(App.Art.random() * 3), App.Art.random()]);
	// morphs.push(["eyeShapeOuter" + Math.ceil(App.Art.random() * 3), App.Art.random()]);

	/*
	let race = slave.race;
	if (race === "mixed race") {
		let raceChoice = ["southern european", "indo-aryan", "semitic"];
		race = raceChoice[Math.floor(App.Art.random() * raceChoice.length)];
	}

	switch (race) {
		case "white":
		case "southern european":
			switch (Math.floor(App.Art.random() * 6)) {
				case 0: break;
				case 1: morphs.push(["noseShapeWide", 1]); break;
				case 2: morphs.push(["noseShapeForward", 0.5]); break;
				case 3: morphs.push(["noseShapeFlat", 1]); break;
				case 4: morphs.push(["noseShapeTriangular", 1]); break;
				case 5: morphs.push(["noseShapeSmall", 1]); break;
			}
			// morphs.push(["noseShapeEurope"+ Math.ceil(App.Art.random() * 8), 1]);
			morphs.push(["lipsShapeEurope"+ Math.ceil(App.Art.random() * 8) + 1, 1]);
			// morphs.push(["eyeShapeUndereye"+ Math.ceil(App.Art.random() * 2), 1]);
			break;

		case "asian":
		case "malay":
		case "pacific islander":
		case "middle eastern":
		case "indo-aryan":
			morphs.push(["noseShapeAsia"+ Math.ceil(App.Art.random() * 9), 1]);
			morphs.push(["lipsShapeAsia"+ Math.ceil(App.Art.random() * 5), 1]);
			// morphs.push(["eyeShapeFold"+ Math.ceil(AApp.Art.random() * 3), 1]);
			morphs.push(["eyeShapeUndereye"+ Math.ceil(App.Art.random() * 3)+2, 1]);
			break;

		case "black":
		case "latina":
		case "amerindian":
		case "semitic":
			morphs.push(["noseShapeAfrica"+ Math.ceil(App.Art.random() * 12), 1]);
			morphs.push(["lipsShapeAfrica"+ Math.ceil(App.Art.random() * 7), 1]);
			// morphs.push(["eyeShapeUndereye"+ Math.ceil(App.Art.random(slave.ID+42) * 2), 1]);
			break;

		case "mixed race":
			// morphs.push([races[index1], 0.5]);
			// races.splice(index1, index1);
			// morphs.push([races[index2], 0.5]);
			break;
	}

	let foreheadShape = ["foreheadShapeNormal", "foreheadShapeRound", "foreheadShapeSmall"];
	let forehead = Math.floor(App.Art.random() * foreheadShape.length);
	if (forehead > 0) {
		morphs.push([foreheadShape[forehead], 1]);
	}*/

	switch (slave.faceShape) {
		case "normal":
			break;
		case "masculine":
			morphs.push(["faceShapeMasculine", 0.5]); break;
		case "androgynous":
			morphs.push(["faceShapeAndrogynous", 0.6]); break;
		case "cute":
			morphs.push(["faceShapeCute", 0.6]); break;
		case "sensual":
			morphs.push(["faceShapeSensual", 0.6]); break;
		case "exotic":
			morphs.push(["faceShapeExotic", 0.5]); break;
	}


	/*
	const morphs_eyes = [
		["", 1],
		["mEyeShape1",1],
		["mEyeShape2",1],
		["mEyeShape3",0.5],
		["mEyeShape4",1],
		["mEyeShape5",1],
		["mEyeShape6",1],
		["mEyeShape7",1],
		["mEyeShape8",1],
	];
	const morphs_nose = [
		["", 1],
		["mNoseShape1",0.5],
		["mNoseShape2",1],
		["mNoseShape3",0.5],
		["mNoseShape4",0.5],
		["mNoseShape5",0.5],
		["mNoseShape6",1],
		["mNoseShape7",1],
		["mNoseShape8",1],
		["mNoseShape9",1],
		["mNoseShape10",1],
	];
	const morphs_jaw = [
		["", 1],
		["mJawShape1", 0.5],
		["mJawShape2", 0.5],
		["mJawShape3", 0.75],
		["mJawShape4", 0.5],
		["mJawShape5", 1],
		["mJawShape6", 0.5],
	];
	const morphs_lips = [
		["", 1],
		["mLipsShape1",1],
		["mLipsShape2",1],
		["mLipsShape3",1],
		["mLipsShape4",1],
		["mLipsShape5",1],
		["mLipsShape6",1],
		["mLipsShape7",1],
		["mLipsShape8", 0.5],
		["mLipsShape9",1],
		["mLipsShape10", 0.75],
		["mLipsShape11",1],
		["mLipsShape12", 0.5],
	];
	const morphs_cheeks = [
		["", 1],
		["mCheeksShape1",0.5],
		["mCheeksShape2",0.5],
		["mCheeksShape3",0.5],
		["mCheeksShape4",1],
		["mCheeksShape5",1],
		["mCheeksShape6",0.5],
		["mCheeksShape7",1],
		["mCheeksShape8",1],
	];

	const morphs_cheeks2 = [
		["", 1],
		["mCheeks2Shape1",0.5],
		["mCheeks2Shape2",0.5],
		["mCheeks2Shape3",1],
		["mCheeks2Shape4",0.5],
	];

	const morphs_chin = [
		["", 1],
		["mChinShape1", 0.5],
		["mChinShape2", 0.5],
		["mChinShape3", 0.5],
		["mChinShape4", 0.5],
	];

	const morphs_unique = [
		["", 1],
		["mUniqueShape1", 1],
		["mUniqueShape2", 0.75],
		["mUniqueShape3", 0.5],
		["mUniqueShape4", 0.5],
		["mUniqueShape5", 0.5],
	];

	const eyeSize = App.Art.random();
	const morphs_other = [
		["mChinTweak1", 0.3*App.Art.random()],
		["mEyeTweak1", 0.4*eyeSize],
		["mEyeTweak2", 0.4*eyeSize],
		["mEyeTweak3", 0.25*eyeSize],
		["mEyeTweak4", 0.3*(App.Art.random()*2-1)],
		["mEyeTweak5", 0.5*(App.Art.random()*2-1)],
	];

	const morphs_forehead = [
		["", 1],
		["foreheadShapeRound", 1],
		["foreheadShapeSmall", 1],
	];

	morphs.push(morphs_other[0]);
	morphs.push(morphs_other[1]);
	morphs.push(morphs_other[2]);
	morphs.push(morphs_other[3]);
	morphs.push(morphs_other[4]);
	morphs.push(morphs_other[5]);

	let forehead = Math.floor(App.Art.random() * morphs_forehead.length);
	if (forehead > 0) {	morphs.push(morphs_forehead[forehead]); }

	let unqiue = Math.floor(App.Art.random() * morphs_unique.length);
	if (unqiue > 0) {	morphs.push(morphs_unique[unqiue]); }

	let chin = Math.floor(App.Art.random() * morphs_chin.length);
	if (chin > 0) {	morphs.push(morphs_chin[chin]); }

	let cheeks2 = Math.floor(App.Art.random() * morphs_cheeks2.length);
	if (cheeks2 > 0) {	morphs.push(morphs_cheeks2[cheeks2]); }

	let cheeks = Math.floor(App.Art.random() * morphs_cheeks.length);
	if (cheeks > 0) {	morphs.push(morphs_cheeks[cheeks]); }

	let lips = Math.floor(App.Art.random() * morphs_lips.length);
	if (lips > 0) {	morphs.push(morphs_lips[lips]); }

	let jaw = Math.floor(App.Art.random() * morphs_jaw.length);
	if (jaw > 0) {	morphs.push(morphs_jaw[jaw]); }

	let nose = Math.floor(App.Art.random() * morphs_nose.length);
	if (nose > 0) {	morphs.push(morphs_nose[nose]); }

	let eyes = Math.floor(App.Art.random() * morphs_eyes.length);
	if (eyes > 0) {	morphs.push(morphs_eyes[eyes]); }
	*/

	if (slave.boobs < 600) {
		morphs.push(["boobShapeSmall", Math.min(-(slave.boobs-700)/600, 1)]);
	} else {
		switch (slave.boobShape) {
			case "normal":
				morphs.push(["boobShapeNormal", ((slave.boobs-600)**(1/3)/17) * (175/p.height)]); break;
			case "perky":
				morphs.push(["boobShapePerky", ((slave.boobs-600)**(1/3)/15) * (175/p.height)]); break;
			case "saggy":
				morphs.push(["boobShapeSaggy", ((slave.boobs-600)**(1/3)/28) * (175/p.height)]); break;
			case "torpedo-shaped":
				morphs.push(["boobShapeTorpedo", ((slave.boobs-600)**(1/3)/8) * (175/p.height)]); break;
			case "downward-facing":
				morphs.push(["boobShapeDownward", ((slave.boobs-600)**(1/3)/16) * (175/p.height)]); break;
			case "wide-set":
				morphs.push(["boobShapeWide", ((slave.boobs-600)**(1/3)/4) * (175/p.height)]); break;
			case "spherical":
				// special case to make nipple work
				if (slave.nipples === "flat" || slave.nipples === "inverted" || !p.applyNipples) {
					morphs.push(["boobShapeSpherical", ((slave.boobs-600)**(1/3)/15) * (175/p.height)]); break;
				} else {
					morphs.push(["boobShapeSphericalNippleFix", ((slave.boobs-600)**(1/3)/15) * (175/p.height)]); break;
				}
		}
	}

	let fNip = Math.min(Math.max((slave.boobs-100)/600, 0), 1); // offset factor boobs < 600
	if (p.applyNipples) {
		switch (slave.nipples) {
			case "flat":
				break;
			case "huge":
				morphs.push(["nipplesHuge", (slave.boobs**(1/3)/10 + fNip*0.4) * (175/p.height)]); break;
			case "tiny":
				morphs.push(["nipplesHuge", (slave.boobs**(1/3)/30 + fNip*0.1) * (175/p.height)]); break;
			case "cute":
				morphs.push(["nipplesHuge", (slave.boobs**(1/3)/20 + fNip*0.25) * (175/p.height)]); break;
			case "puffy":
				morphs.push(["nipplesPuffy", (slave.boobs**(1/3)/10 + fNip*0.4) * (175/p.height)]); break;
			case "inverted":
				break;
			case "partially inverted":
				morphs.push(["nipplesPuffy", (slave.boobs**(1/3)/20 + fNip*0.25) * (175/p.height)]); break;
			case "fuckable":
				morphs.push(["nipplesHuge", (slave.boobs**(1/3)/5 + fNip*0.45) * (175/p.height)]); break;
		}
	}
	morphs.push(["areolae", convertRange(0, 4, -0.5, fNip*5, slave.areolae)]);

	let shaftShape = ["shaftShape0", "shaftShape1", "shaftShape2", "shaftShape3", "shaftShape4", "shaftShape5", "shaftShape6"];
	let shaft = Math.floor(App.Art.random() * shaftShape.length);
	if (shaft > 0) {
		morphs.push([shaftShape[shaft], 1]);
	}

	if (slave.dick === 0 && !(slave.scrotum <= 0 || slave.balls <= 0)) {
		morphs.push(["dickRemove", 1]);
	} else if (slave.dick !== 0) {
		if (slave.dick <= 8) {
			morphs.push(["dick", (slave.dick * (175/p.height) / 5.2) -1.05]);
		} else {
			morphs.push(["dick", ((slave.dick - 8) * (175/p.height) / 2.2) + 0.55]);
		}
	}
	if (slave.vagina === -1) {
		morphs.push(["vaginaRemove", 1]);
	}
	if (slave.scrotum <= 0 || slave.balls <= 1) {
		morphs.push(["ballsRemove", 1]);
	} else {
		if (slave.scrotum > 0) {
			let scr = Math.min(slave.scrotum, 40);
			morphs.push(["balls", convertRange(2, 10, 0, 0.75, scr * 2.5 * 0.6 *(175/p.height))]);
			morphs.push(["scrotum", convertRange(1, 10, 0, 2.0, scr * (175/p.height))]);
		}
	}

	morphs.push(["shoulders", slave.shoulders/1.2]);

	scene.models[0].transform.scale = p.height/175;

	if (slave.muscles > 0) {
		morphs.push(["muscles", slave.muscles/33]);
	}

	morphs.push(["belly2", slave.belly**(1/3)/24.6]);

	morphs.push(["hips", slave.hips/2]);

	if (slave.butt<=1) {
		morphs.push(["butt", convertRange(0, 1, -1.5, -0.75, slave.butt)]);
	} else {
		morphs.push(["butt", convertRange(2, 20, 0, 3.5, slave.butt)]);
	}

	if (slave.waist > 0) {
		morphs.push(["waist", -slave.waist/100]);
	} else {
		morphs.push(["waist", -slave.waist/50]);
	}

	if (slave.weight >= 0) {
		morphs.push(["weight2", slave.weight/300]);
	} else {
		morphs.push(["weightThin", -slave.weight/80]);
	}

	if (slave.visualAge < 20) {
		morphs.push(["physicalAgeYoung", -(p.age-20)/10]);
	} else {
		morphs.push(["physicalAgeOld", (slave.visualAge-20)/52]);
	}

	if (!slave.arm.left) {
		morphs.push(["amputeeLeftArm", 1]);
	}
	if (!slave.arm.right) {
		morphs.push(["amputeeRightArm", 1]);
	}
	if (!slave.leg.left) {
		morphs.push(["amputeeLeftLeg", 1]);
	}
	if (!slave.leg.right) {
		morphs.push(["amputeeRightLeg", 1]);
	}

	if (p.applyBulge) {
		if (slave.dick > 0 || slave.scrotum > 0 || slave.balls > 0) {
			morphs.push(["bulge", Math.max(slave.dick/4, 0)]);
		}
	}

	morphs.push(["eyelashLength", 0.5]);
	morphs.push(["offset", 1.5]); // only applies to clothes

	if (V.seeAnimation) {
		App.Art.getAnimState(slave, scene, p, morphs, isAnimating);
	}

	App.Art.resetMorphs(scene);

	for (let i =0; i < scene.models[0].morphs.length; i++) {
		for (let j =0; j < morphs.length; j++) {
			if (scene.models[0].morphs[i].morphId === morphs[j][0]) {
				scene.models[0].morphs[i].value = morphs[j][1];
			}
		}
	}
};
