// @ts-nocheck
/**
 * @param {FC.SlaveState} slave
 * @param {boolean} [genepool=false]
 */
App.Update.Slave = function(slave, genepool = false) {
	slave.career = slave.career || "a slave";
	slave.origin = slave.origin || "";
	const quirks = {};
	App.Data.geneticQuirks.forEach((value, q) => quirks[q] = 0);
	slave.geneticQuirks = Object.assign(clone(quirks), slave.geneticQuirks);

	App.Update.setNonexistentProperties(slave, {
		earShape: "normal",
		earT: "none",
		earTColor: "hairless",
		earTEffect: "none",
		earTEffectColor: "none",
		horn: "none",
		hornColor: "none",
		tail: "none",
		tailShape: "none",
		tailColor: "none",
		appendages: "none",
		wingsShape: "none",
		appendagesColor: "none",
		hColor: "black",
		hEffect: "none",
		hEffectColor: "none",
		tailEffect: "none",
		tailEffectColor: "none",
		appendagesEffect: "none",
		appendagesEffectColor: "none",
		daughters: 0,
		sisters: 0,
		wombImplant: "none",
		induceLactation: 0,
		weightDirection: 0,
		clone: 0,
		abortionTat: -1,
		birthsTat: -1,
		readyProsthetics: [],
		/* eslint-disable camelcase */
		override_Race: 0,
		override_Skin: 0,
		override_Eye_Color: 0,
		override_H_Color: 0,
		override_Pubic_H_Color: 0,
		override_Arm_H_Color: 0,
		/* eslint-enable camelcase */
		pregControl: "none",
		pregNoticeDefault: "none",
		pregNoticeBypass: false,
	});

	if (slave.prostateImplant !== undefined) {
		if (slave.prostateImplant === 1) {
			slave.prostate = 3;
		}
		delete slave.prostateImplant;
	}
	if (slave.pregGenerator !== undefined) { delete slave.pregGenerator; }
	if (slave.pregAdaptation === undefined) {
		if (slave.physicalAge <= 3) {
			slave.pregAdaptation = 10;
		} else if (slave.physicalAge <= 12 || slave.genes === "XY") {
			slave.pregAdaptation = 20;
		} else if (slave.physicalAge <= 17) {
			slave.pregAdaptation = 30;
		} else {
			slave.pregAdaptation = 50;
		}
	}
	if (slave.pregKnown === undefined) {
		if (slave.preg > 0) {
			slave.pregKnown = 1;
		} else {
			slave.pregKnown = 0;
		}
	}
	if (slave.pregWeek === undefined) {
		if (slave.preg > 0) {
			slave.pregWeek = slave.preg;
		} else {
			slave.pregWeek = 0;
		}
	}
	if (slave.pubertyXX === undefined) {
		if (slave.physicalAge >= slave.pubertyAgeXX) {
			slave.pubertyXX = 1;
			slave.fertKnown = 1;
		} else {
			slave.pubertyXX = 0;
			slave.fertKnown = 0;
		}
	}
	if (slave.pubertyXY === undefined) {
		if (slave.physicalAge >= slave.pubertyAgeXY) {
			slave.pubertyXY = 1;
		} else {
			slave.pubertyXY = 0;
		}
	}
	if (slave.genetics !== undefined) { delete slave.genetics; }
	slave.geneMods = Object.assign({
		NCS: 0, rapidCellGrowth: 0, immortality: 0, flavoring: 0, aggressiveSperm: 0, livestock: 0, progenitor: 0
	}, slave.geneMods);
	if (slave.inducedNCS !== undefined) {
		slave.geneMods.NCS = slave.inducedNCS;
		delete slave.inducedNCS;
	}
	if (slave.geneMods.bioEngineeredMilkFlavoring !== undefined) {
		delete slave.geneMods.bioEngineeredMilkFlavoring;
	}
	if (slave.milkFlavor === undefined) { slave.milkFlavor = "none"; }
	if (slave.PCSlutContacts !== undefined) { delete slave.PCSlutContacts; }
	if (slave.superfetation !== undefined) { delete slave.superfetation; }
	if (slave.lactationDuration === undefined) {
		if (slave.lactation === 0) {
			slave.lactationDuration = 0;
		} else {
			slave.lactationDuration = 2;
		}
	}

	/**
	 * Takes a string with a baked in pronoun ("Her mother offered her") and returns it with SC variable pronouns("$His mother offered $him")
	 * @param {string} slavetext
	 * @returns {string}
	 */
	function pronounReplacer(slavetext) {
		switch (slavetext) {
			case "After her short but very promising slave racing career, during which she made it through several competitions as a virgin, many people fondly remember fantasizing about taking her.":
				slavetext = "After $his short but very promising slave racing career, during which $he made it through several competitions as a virgin, many people fondly remember fantasizing about taking $him.";
				break;
			case "Her entire body is tattooed with a detailed map of her arteries which, combined with her albinism, gives her a quasi-translucent quality.":
				slavetext = "$His entire body is tattooed with a detailed map of $his arteries which, combined with $his albinism, gives $him a quasi-translucent quality.";
				break;
			case "Her husband sold her into slavery to escape his debts.":
				slavetext = "$His husband sold $him into slavery to escape his debts.";
				break;
			case "Her mother offered her to you as an incentive to take her in.":
				slavetext = "$His mother offered $him to you as an incentive to take them in.";
				break;
			case "Her recognizable face marks her as a descendant of an overthrown royal family.":
				slavetext = "$His recognizable face marks $him as a descendant of an overthrown royal family.";
				break;
			case "Many people remember her from the slavegirl races where she slammed her cock into countless runners' pussies after catching them.":
				slavetext = "Many people remember $him from the slavegirl races where $he slammed $his cock into countless runners' pussies after catching them.";
				break;
			case "She came to you to escape being sold to a cruel master after her producer informed her of her debt.":
				slavetext = "$He came to you to escape being sold to a cruel master after $his producer informed $him of $his debt.";
				break;
			case "She comes from old money and sold herself into slavery to satisfy her obsession with the practice, believing her family would buy her back out of slavery later.":
				slavetext = "$He comes from old money and sold $himself into slavery to satisfy $his obsession with the practice, believing $his family would buy $him back out of slavery later.";
				break;
			case "She has a following in slave pornography. Thousands have enjoyed the sight of her ignoring her own pleasure.":
				slavetext = "$He has a following in slave pornography. Thousands have enjoyed the sight of $him ignoring $his own pleasure.";
				break;
			case "She has a following in slave pornography. Thousands have enjoyed watching her devote herself to her partners' pleasure.":
				slavetext = "$He has a following in slave pornography. Thousands have enjoyed watching $him devote $himself to $his partners' pleasure.";
				break;
			case "She has a following in slave pornography. Thousands have enjoyed watching her do anything for a dick in her ass.":
				slavetext = "$He has a following in slave pornography. Thousands have enjoyed watching $him do anything for a dick in $his ass.";
				break;
			case "She has a small scar on the back of her right hand. She was injured while participating in the finals of the national kendo tournament, and decided to keep the scar to remind her of her achievements.":
				slavetext = "$He has a small scar on the back of $his right hand. $He was injured while participating in the finals of a national kendo tournament, and decided to keep the scar to remind $him of $his achievements.";
				break;
			case "She has an implanted GPS tracker to find her in case her habit of stalking pretty girls gets the better of her.":
				slavetext = "$He has an implanted GPS tracker to find $him in case $his habit of stalking pretty girls gets the better of $him.";
				break;
			case "She has massive C-clamp piercings in her back that allow her to act as furniture, and a truly enormous vagina.":
				slavetext = "$He has massive C-clamp piercings in $his back that allow $him to act as furniture, and a truly enormous vagina.";
				break;
			case "She has the number of times her father came in you while you were pregnant with her tattooed down her back.":
				slavetext = "$He has the number of times $his father came in you while you were pregnant with $him tattooed down $his back.";
				break;
			case "She is a famed Free Cities slut, and can please anyone.":
				slavetext = "$He is a famed Free Cities slut, and can please anyone.";
				break;
			case "She is a famed Free Cities whore, and commands top prices.":
				slavetext = "$He is a famed Free Cities whore, and commands top prices.";
				break;
			case "She is a prized dairy cow given to you by a failed local pasture of The Cattle Ranch.":
				slavetext = "$He is a prized dairy cow given to you by a failed local pasture of The Cattle Ranch.";
				break;
			case "She is an enslaved Daughter of Liberty.":
				slavetext = "$He is an enslaved Daughter of Liberty.";
				break;
			case "She is an enslaved member of an anti-slavery extremist group.":
				slavetext = "$He is an enslaved member of an anti-slavery extremist group.";
				break;
			case "She is remembered for winning best in show as a breeder.":
				slavetext = "$He is remembered for winning best in show as a breeder.";
				break;
			case "She is remembered for winning best in show as a cockmilker.":
				slavetext = "$He is remembered for winning best in show as a cockmilker.";
				break;
			case "She is remembered for winning best in show as a dairy cow.":
				slavetext = "$He is remembered for winning best in show as a dairy cow.";
				break;
			case "She is the spoiled daughter of a wealthy old world businessman. Many will pay well to use her to discredit her father and family.":
				slavetext = "$He is the spoiled $daughter of a wealthy old world businessman. Many will pay well to use $him to discredit $his father and family.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her abusing others.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him abusing others.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her being raped.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him being raped.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her being used.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him being used.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her denying herself pleasure.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him denying $himself pleasure.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her doing anything for a dick up her ass.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him doing anything for a dick up $his ass.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her doing anything for attention.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him doing anything for attention.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her doing anything for cum.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him doing anything for cum.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her getting off from the suffering she caused.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him getting off from the suffering $he caused.";
				break;
			case "She is well known from her career in slave pornography. Her many fans relish the sight of her swollen with child.":
				slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him swollen with child.";
				break;
			case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her being raped.":
				slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him being raped.";
				break;
			case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her denying herself pleasure.":
				slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him denying $himself pleasure.";
				break;
			case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her doing anything for attention.":
				slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him doing anything for attention.";
				break;
			case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her doing anything for cum.":
				slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him doing anything for cum.";
				break;
			case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her mid-coitus.":
				slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him mid-coitus.";
				break;
			case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her suffering.":
				slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him suffering.";
				break;
			case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her swollen with child.":
				slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him swollen with child.";
				break;
			case "She offered herself for voluntary enslavement, choosing you as her new owner because you treat lactating girls well.":
				slavetext = "$He offered $himself for voluntary enslavement, choosing you as $his new owner because you treat lactating girls well.";
				break;
			case "She offered herself to you for enslavement hoping you would preserve $his incestuous relationship with her sibling.":
				slavetext = "$He offered $himself to you for enslavement hoping you would preserve $his incestuous relationship with $his sibling.";
				break;
			case "She offered to become your slave to protect her incestuous relationship.":
				slavetext = "$He offered to become your slave to protect $his incestuous relationship.";
				break;
			case "She sold herself into slavery out of fear that life on the streets was endangering her pregnancy.":
				slavetext = "$He sold $himself into slavery out of fear that life on the streets was endangering $his pregnancy.";
				break;
			case "She sold herself to you in the hope of someday bearing children.":
				slavetext = "$He sold $himself to you in the hope of someday bearing children.";
				break;
			case "She submitted to enslavement for a better chance at survival than she had as a migrant.":
				slavetext = "$He submitted to enslavement for a better chance at survival than $he had as a migrant.";
				break;
			case "She submitted to enslavement out of a misguided desire to join a sexually libertine society.":
				slavetext = "$He submitted to enslavement out of a misguided desire to join a sexually libertine society.";
				break;
			case "She submitted to enslavement to escape the hard life of an old world whore.":
				slavetext = "$He submitted to enslavement to escape the hard life of an old world whore.";
				break;
			case "She submitted to enslavement to get access to modern prenatal care.":
				slavetext = "$He submitted to enslavement to get access to modern prenatal care.";
				break;
			case "She was a Futanari Sister until you engineered her early enslavement.":
				slavetext = "$He was a Futanari Sister until you engineered $his early enslavement.";
				break;
			case "She was brought up in a radical slave school to match her twin.":
				slavetext = "$He was brought up in a radical slave school to match $his twin.";
				break;
			case "She was given to you by a failed branch campus of St. Claver Preparatory after she served as a plastic surgeon's passing final exam.":
				slavetext = "$He was given to you by a failed branch campus of St. Claver Preparatory after $he served as a plastic surgeon's passing final exam.";
				break;
			case "She was given to you by a failed branch campus of the Hippolyta Academy right after her majority.":
				slavetext = "$He was given to you by a failed branch campus of the Hippolyta Academy right after $his majority.";
				break;
			case "She was given to you by a failed branch campus of the innovative École des Enculées right after her graduation.":
				slavetext = "$He was given to you by a failed branch campus of the innovative École des Enculées right after $his graduation.";
				break;
			case "She was given to you by a failed branch campus of the intense Gymnasium-Academy right after her majority.":
				slavetext = "$He was given to you by a failed branch campus of the intense Gymnasium-Academy right after $his majority.";
				break;
			case "She was given to you by a failed branch campus of The Slavegirl School after she was retrained as a slave girl.":
				slavetext = "$He was given to you by a failed branch campus of the Slavegirl School after $he was retrained as a slave $girl.";
				break;
			case "She was given to you by a failed branch campus of The Slavegirl School right after her majority.":
				slavetext = "$He was given to you by a failed branch campus of the Slavegirl School right after $his majority.";
				break;
			case "She was given to you by a failed subsidiary lab of the Growth Research Institute right after her use as a test subject ended.":
				slavetext = "$He was given to you by a failed subsidiary lab of the Growth Research Institute right after $his use as a test subject ended.";
				break;
			case "She was once the crown prince of an old world kingdom up until you aided her brother in making her 'disappear'.":
				slavetext = "$He was once the crown prince of an old world kingdom up until you aided $his brother in making $him 'disappear'.";
				break;
			case "She was once the princess of an old world kingdom up until her loose habits caught up with her and she was exiled.":
				slavetext = "$He was once the princess of an old world kingdom up until $his loose habits caught up with $him and $he was exiled.";
				break;
			case "She was once the young trophy wife of a powerful man in the old world, but he sold her into slavery in revenge for her infidelity.":
				slavetext = "$He was once the young trophy $wife of a powerful man in the old world, but he sold $him into slavery in revenge for $his infidelity.";
				break;
			case "She was raised in a radical slave school that treated her from a very young age, up to the point that she never experienced male puberty.":
				slavetext = "$He was raised in a radical slave school that treated $him from a very young age, up to the point that $he never experienced male puberty.";
				break;
			case "She was raised in a radical slave school that treated her with drugs and surgery from a very young age.":
				slavetext = "$He was raised in a radical slave school that treated $him with drugs and surgery from a very young age.";
				break;
			case "She was sold into slavery by her older sister.":
				slavetext = "$He was sold into slavery by $his older sister.";
				break;
			case "She was the leader of your arcology's Futanari Sisters until you engineered her community's failure and enslavement.":
				slavetext = "$He was the leader of your arcology's Futanari Sisters until you engineered $his community's failure and enslavement.";
				break;
			case "She was the result of unprotected sex with a client. Her mother tracked you down years after her birth to force her upon you.":
				slavetext = "$He was the result of unprotected sex with a client. $His mother tracked you down years after $his birth to force $him upon you.";
				break;
			case "She was voluntarily enslaved after she decided that your arcology was the best place for her to get the steroids that she'd allowed to define her life.":
				slavetext = "$He was voluntarily enslaved after $he decided that your arcology was the best place for $him to get the steroids that $he'd allowed to define $his life.";
				break;
			case "She was your slave, but you freed her, which she repaid by participating in a coup attempt against you. It failed, and she is again your chattel.":
				slavetext = "$He was your slave, but you freed $him, which $he repaid by participating in a coup attempt against you. It failed, and $he is again your chattel.";
				break;
			case "Shortly after birth, she was sealed in an aging tank until she was of age. She knows nothing of the world outside of what the tank imprinted her with.":
				slavetext = "Shortly after birth, $he was sealed in an aging tank until $he was of age. $He knows nothing of the world outside of what the tank imprinted $him with.";
				break;
			case "Shortly after birth, she was sealed in an aging tank until she was of age. She knows only of the terror that awaits her should she not obey her master.":
				slavetext = "Shortly after birth, $he was sealed in an aging tank until $he was of age. $He knows only of the terror that awaits $him should $he not obey $his master.";
				break;
			case "Though her vocal cords have been altered to keep her from speaking, she is still capable of the occasional moo.":
				slavetext = "Though $his vocal cords have been altered to keep $him from speaking, $he is still capable of the occasional moo.";
				break;
			case "To seal a business deal, a client asked you to knock her up. She is the end result of that fling.":
				slavetext = "To seal a business deal, a client asked you to knock her up. $He is the end result of that fling.";
				break;
			case "When you took her from her previous owner, she was locked into a beautiful rosewood box lined with red velvet, crying.":
				slavetext = "When you took $him from $his previous owner, $he was locked into a beautiful rosewood box lined with red velvet, crying.";
				break;
			case "You acquired her along with her mother when the family business failed.":
				slavetext = "You acquired $him along with $his mother when the family business failed.";
				break;
			case "You acquired her along with her sissy sister due to her inexperience as a madam.":
				slavetext = "You acquired $him along with $his sissy sister due to $his inexperience as a madam.";
				break;
			case "You bankrupted and enslaved her in revenge for her part in the attack on your arcology by the Daughters of Liberty.":
				slavetext = "You bankrupted and enslaved $him in revenge for $his part in the attack on your arcology by the Daughters of Liberty.";
				break;
			case "You bought her fresh from the intense Gymnasium-Academy right after her majority.":
				slavetext = "You bought $him fresh from the intense Gymnasium-Academy right after $his majority.";
				break;
			case "You bought her fresh from the new Slavegirl School after she was retrained as a slave girl.":
				slavetext = "You bought $him fresh from the new Slavegirl School after $he was retrained as a slave $girl.";
				break;
			case "You bought her fresh from the Slavegirl School right after her majority.":
				slavetext = "You bought $him fresh from the Slavegirl School right after $his majority.";
				break;
			case "You bought her from a body dump, completely broken.":
				slavetext = "You bought $him from a body dump, completely broken.";
				break;
			case "You bought her from a wetware CPU farm, her body ruined but her mind subjected to a simulated career.":
				slavetext = "You bought $him from a wetware CPU farm, $his body ruined but $his mind subjected to a simulated career.";
				break;
			case "You bought her from the girl raiders' slave market the week she reached her majority.":
				slavetext = "You bought $him from the $girl raiders' slave market the week $he reached $his majority.";
				break;
			case "You bought her from the Growth Research Institute right after her use as a test subject ended.":
				slavetext = "You bought $him from the Growth Research Institute right after $his use as a test subject ended.";
				break;
			case "You bought her from the innovative École des Enculées right after her graduation.":
				slavetext = "You bought $him from the innovative École des Enculées right after $his graduation.";
				break;
			case "You bought her from the runaway hunters' slave market after they recaptured her and her original owner did not pay their fee.":
				slavetext = "You bought $him from the runaway hunters' slave market after they recaptured $him and $his original owner did not pay their fee.";
				break;
			case "You bought out a deal for her sale after the seller took her virginity and the buyer no longer wanted her.":
				slavetext = "You bought out a deal for $his sale after the seller took $his virginity and the buyer no longer wanted $him.";
				break;
			case "You got her at the Slave Shelter. Her background is obscure, but seems to have involved terrible abuse of her huge cock and balls.":
				slavetext = "You got $him at the Slave Shelter. $His background is obscure, but seems to have involved terrible abuse of $his huge cock and balls.";
				break;
			case "You got her at the Slave Shelter. Her holes were cruelly stretched by constant plug use.":
				slavetext = "You got $him at the Slave Shelter. $His holes were cruelly stretched by constant plug use.";
				break;
			case "You got her at the Slave Shelter. Her owner purposely blinded her by dumping boiling water into her eyes.":
				slavetext = "You got $him at the Slave Shelter. $His owner purposely blinded $him by dumping boiling water into $his eyes.";
				break;
			case "You got her at the Slave Shelter. Her previous owner discarded her after many pregnancies.":
				slavetext = "You got $him at the Slave Shelter. $His previous owner discarded $him after many pregnancies.";
				break;
			case "You got her at the Slave Shelter. Her previous owner forced her to cut off her breasts and cook them.":
				slavetext = "You got $him at the Slave Shelter. $His previous owner forced $him to cut off $his breasts and cook them.";
				break;
			case "You got her at the Slave Shelter. Her previous owner forced her to cut off her dick and balls and cook them.":
				slavetext = "You got $him at the Slave Shelter. $His previous owner forced $him to cut off $his dick and balls and cook them.";
				break;
			case "You got her at the Slave Shelter. Her previous owner gelded her and used her for anal abuse.":
				slavetext = "You got $him at the Slave Shelter. $His previous owner gelded $him and used $him for anal abuse.";
				break;
			case "You got her at the Slave Shelter. It's not clear why her previous owner cut her arms and legs off.":
				slavetext = "You got $him at the Slave Shelter. It's not clear why $his previous owner cut $his arms and legs off.";
				break;
			case "You got her at the Slave Shelter. She has never communicated anything about her background, since she arrived at the shelter with a broken mind.":
				slavetext = "You got $him at the Slave Shelter. $He has never communicated anything about $his background, since $he arrived at the shelter with a broken mind.";
				break;
			case "You got her at the Slave Shelter. She is an enslaved Daughter of Liberty, caught some weeks after the failed coup. Her previous owner used her as a punching bag and dart board, then when he was bored of her tattooed obscenities all over her body and threw her away.":
				slavetext = "You got $him at the Slave Shelter. $He is an enslaved Daughter of Liberty, caught some weeks after the failed coup. $His previous owner used $him as a punching bag and dart board, then when he was bored of $him tattooed obscenities all over $his body and threw $him away.";
				break;
			case "You got her at the Slave Shelter. She was discarded after suffering a terrible reaction to growth hormone treatment.":
				slavetext = "You got $him at the Slave Shelter. $He was discarded after suffering a terrible reaction to growth hormone treatment.";
				break;
			case "You got her at the Slave Shelter. She was found unresponsive in the lower arcology with a gaping pussy and deflated belly. It is unclear what happened to her.":
				slavetext = "You got $him at the Slave Shelter. $He was found unresponsive in the lower arcology with a gaping pussy and deflated belly. It is unclear what happened to $him.";
				break;
			case "You got her at the Slave Shelter. She was worn out by twenty years of brothel service.":
				slavetext = "You got $him at the Slave Shelter. $He was worn out by twenty years of brothel service.";
				break;
			case "You helped free her from a POW camp after being abandoned by her country, leaving her deeply indebted to you.":
				slavetext = "You helped free $him from a POW camp after being abandoned by $his country, leaving $him deeply indebted to you.";
				break;
			case "You kept her after her owner failed to pay your bill for performing surgery on her.":
				slavetext = "You kept $him after $his owner failed to pay your bill for performing surgery on $him.";
				break;
			case "You purchased her as a favor to her father.":
				slavetext = "You purchased $him as a favor to $his father.";
				break;
			case "You purchased her from a King after his son put an illegitimate heir in her womb.":
				slavetext = "You purchased $him from a King after his son put an illegitimate heir in $his womb.";
				break;
			case "You purchased her in order to pave the way for her brother to take the throne.":
				slavetext = "You purchased $him in order to pave the way for $his brother to take the throne.";
				break;
			case "You purchased her indenture contract, making her yours for as long as it lasts.":
				slavetext = "You purchased $his indenture contract, making $him yours for as long as it lasts.";
				break;
			case "You sentenced her to enslavement as a punishment for attempted theft of a slave.":
				slavetext = "You sentenced $him to enslavement as a punishment for attempted theft of a slave.";
				break;
			case "You sentenced her to enslavement as a punishment for dereliction of her duty to you as a mercenary and for theft.":
				slavetext = "You sentenced $him to enslavement as a punishment for dereliction of $his duty to you as a mercenary and for theft.";
				break;
			case "You sentenced her to enslavement as a punishment for smuggling slaves within her body.":
				slavetext = "You sentenced $him to enslavement as a punishment for smuggling slaves within $his body.";
				break;
			case "You stormed her arcology, killed her guards and enslaved her in revenge for insulting you at a dinner party.":
				slavetext = "You stormed $his arcology, killed $his guards, and enslaved $him in revenge for insulting you at a dinner party.";
				break;
			case "You tricked her into enslavement, manipulating her based on her surgical addiction.":
				slavetext = "You tricked $him into enslavement, manipulating $him based on $his surgical addiction.";
				break;
			case "You tricked her mother into selling her into slavery to clear addiction debts.":
				slavetext = "You tricked $his mother into selling $him into slavery to clear addiction debts.";
				break;
			case "You were acquainted with her before you were an arcology owner; your rival tried to use her to manipulate you, but you rescued her.":
				slavetext = "You were acquainted with $him before you were an arcology owner; your rival tried to use $him to manipulate you, but you rescued $him.";
				break;
			case "Your slaving troop kept several girls as fucktoys; you sired her in your favorite.":
				slavetext = "Your slaving troop kept several girls as fucktoys; you sired $him in your favorite.";
				break;
			case "She was enslaved by you when you purchased her debt.":
				slavetext = "$He was enslaved by you when you purchased $his debt.";
				break;
			case "A fresh capture once overpowered you and had his way with you. You kept her as a painful reminder to never lower your guard again.":
			case "Drugs and alcohol can be a potent mix; the night that followed it can sometimes be hard to remember. Needless to say, once your belly began swelling with her, you had to temporarily switch to a desk job for your mercenary group.":
			case "Her musky milky aura drives men and women around her giggly and dumb with lust.":
			case "She chose to be a slave because the romanticized view of it she had turns her on.":
			case "She grew up sheltered and submissive, making her an easy target for enslavement.":
			case "She has a faint air of fatigue about her, and strength too: that of a survivor.":
			case "She has a following in slave pornography. Thousands have enjoyed her getting off from the suffering she caused.":
			case "She has a following in slave pornography. Thousands have enjoyed her humiliating herself.":
			case "She has a following in slave pornography. Thousands have enjoyed the sight of her being raped.":
			case "She has a following in slave pornography. Thousands have enjoyed the sight of her being used.":
			case "She has a following in slave pornography. Thousands have enjoyed the sight of her eating and gaining weight.":
			case "She has a following in slave pornography. Thousands have enjoyed watching her abuse others.":
			case "She has a following in slave pornography. Thousands have enjoyed watching her do anything and everything for cum.":
			case "She has a following in slave pornography. Thousands have enjoyed watching her do anything for attention.":
			case "She has a following in slave pornography. Thousands have enjoyed watching her happily suffer.":
			case "She has a following in slave pornography. Thousands have enjoyed watching her obsess over pumping out babies.":
			case "She has a following in slave pornography. Thousands have enjoyed watching her swell with child.":
			case "She has a verbal tic that causes her to say 'ho, ho, ho' frequently.":
			case "She has many surgical scars and something seems off about her.":
			case "She is a complete mental blank; to her, there is only the Master.":
			case "She is one of the longest legally-enslaved persons in the world, having been a slave for 15 years. She has spent almost all that time working as a slave prostitute, and has been heavily modified to keep her productive.":
			case "She is the winner of a martial arts slave tournament. You won her in a bet.":
			case "She offered herself to you for enslavement to escape having plastic surgery foisted on her.":
			case "She was a runaway slave captured by a gang outside your arcology. You bought her cheap after she was harshly used by them.":
			case "She was a student you enslaved when you evacuated her from a threatened old world grade school.":
			case "She was a volleyball player you enslaved when you evacuated her from a broken down bus.":
			case "She was an expectant mother you enslaved when you evacuated her from a threatened old world hospital.":
			case "She was an orphan forced to live and steal on the streets until you adopted her.":
			case "She was enslaved by you when you overcharged her for surgery.":
			case "She was fresh from the slave markets when you acquired her.":
			case "She was homeless and willing to do anything for food, which in the end resulted in her becoming a slave.":
			case "She was previously owned by a creative sadist, who has left a variety of mental scars on her.":
			case "She was sold to you by an anonymous person who wanted her to suffer.":
			case "She was taken as a slave by a Sultan, who presented her as a gift to a surveyor.":
			case "She was taken into your custody from an owner who treated her as an equal.":
			case "She was the private slave of a con artist cult leader before he had to abandon her and flee.":
			case "She was the result of an intruder brute forcing your firewall, overloading your pleasure sensors, and allowing a corrupted packet to slip by. With a quick wipe of your RAM and cache with some powerful liquor, you have no idea who planted her in your womb.":
			case "You acquired her in the last stages of your career as a noted private military contractor.":
			case "You acquired her in the last stages of your career as a successful venture capitalist.":
			case "You bought her at auction.":
			case "You bought her from The Cattle Ranch.":
			case "You bought her from the enigmatic Futanari Sisters after they sold her into slavery.":
			case "You bought her from the household liquidator.":
			case "You bought her from the kidnappers' slave market, so she was probably forced into slavery.":
			case "You bought her from the prestigious Hippolyta Academy.":
			case "You bought her from the trainers' slave market after they put her through basic training.":
			case "You bought her from the underage raiders' slave market.":
			case "You bought out a deal involving her training to be an expert gelded sex slave.":
			case "You brought her into the arcology mindbroken, little more than a human onahole.":
			case "You brought her into the arcology mindbroken, little more than a walking collection of fuckable holes.":
			case "You captured her during your transition to the arcology":
			case "You conceived her after a male arcology owner, impressed by your work, rewarded you with a night you'll never forget.":
			case "You enslaved her personally during the last stages of your slaving career.":
			case "You helped her give birth, leaving her deeply indebted to you.":
			case "You never thought you would be capable of impregnating yourself, but years of pleasuring yourself with yourself after missions managed to create her.":
			case "You purchased her by special order.":
			case "You purchased her from a King after she expressed knowledge of the prince's affair with another servant.":
			case "You purchased her from FCTV's Home Slave Shopping stream channel.":
			case "You received her as a gift from an arcology owner impressed by your work.":
			case "You received her from a surgeon who botched an implant operation on her and needed to get her out of sight.":
			case "You reserved a mindless slave like her from the Flesh Heap.":
			case "You sentenced her to enslavement as a punishment for attempted burglary.":
			case "You sentenced her to enslavement as a punishment for defying local racial segregation laws.":
			case "You sentenced her to enslavement as a punishment for fraud and theft.":
			case "You sentenced her to enslavement as a punishment for suspected escapism.":
			case "You sentenced her to enslavement as a punishment for theft and battery.":
			case "You sentenced her to enslavement for smuggling drugs into the arcology.":
			case "You sired her after a female arcology owner, impressed by your work, rewarded you with a night you'll never forget.":
			case "You sired her in yourself after an arcology owner, impressed by your work, rewarded you with a night you'll never forget.":
			case "You turned her into a slave girl after she fell into debt to you.":
			case "You won her at a shotgun match against other arcology owners.":
			case "You won her at cards, a memento from your life as one of the idle rich before you became an arcology owner.":
				slavetext = slavetext.replace(/\bherself\b/g, "$himself");
				slavetext = slavetext.replace(/\bHerself\b/g, "$Himself");
				slavetext = slavetext.replace(/\bshe\b/g, "$he");
				slavetext = slavetext.replace(/\bShe\b/g, "$He");
				slavetext = slavetext.replace(/\bher\b/g, "$him");
				slavetext = slavetext.replace(/\bHer\b/g, "$His");
				slavetext = slavetext.replace(/\b girl\b/g, " $girl");
				slavetext = slavetext.replace(/\b woman\b/g, " $woman");
				slavetext = slavetext.replace(/\${2,}/g, '');
				break;
			default:
				if ((slavetext.includes("was serving the public")) || (slavetext.includes("You bought her from"))) {
					slavetext = slavetext.replace(/\bher\b/g, "$him");
				} else if (((slavetext.includes("Your lurcher")) && (slavetext.includes("coursing"))) || ((slavetext.includes("Your")) && (slavetext.includes("while raiding")))) {
					slavetext = slavetext.replace(/\bher\b/g, "$him");
					slavetext = slavetext.replace(/\bshe\b/g, "$he");
				} else if (slavetext.includes("was once the young trophy husband of a powerful woman in the old world, but she sold")) {
					slavetext = "$He was once the young trophy husband of a powerful woman in the old world, but she sold $him into slavery in revenge for $his infidelities.";
				} else if (slavetext.includes("gargantuan dick to be a truly unique slave")) {
					slavetext = "$He was raised as a girl despite $his gargantuan dick to be a truly unique slave.";
				} else if (slavetext.includes("to enslavement for the attempted rape of a free woman")) {
					slavetext = "You sentenced $him to enslavement for the attempted rape of a free woman.";
				} else if (slavetext.includes("to enslavement as a punishment for the rape of a free woman")) {
					slavetext = "You sentenced $him to enslavement as a punishment for the rape of a free woman.";
				} else if (slavetext.includes("only way to obtain surgery to transform $him into a woman")) {
					slavetext = "$He submitted to enslavement as $his only way to obtain surgery to transform $him into a woman.";
				} else if (slavetext.includes("was sold as a slave to satisfy her spousal maintenance after divorce")) {
					slavetext = "Once $he was an arcology security officer, lured to aphrodisiacs addiction and feminized by $his boss (and former wife), to whom $he was sold as a slave to satisfy her spousal maintenance after divorce.";
				} else if (slavetext.includes("asked to be enslaved in the hope you'd treat a fellow woman well")) {
					slavetext = "$He asked to be enslaved in the hope you'd treat a fellow woman well.";
				} else {
					slavetext = slavetext.replace(/\bherself\b/g, "$himself");
					slavetext = slavetext.replace(/\bHerself\b/g, "$Himself");
					slavetext = slavetext.replace(/\bshe\b/g, "$he");
					slavetext = slavetext.replace(/\bShe\b/g, "$He");
					slavetext = slavetext.replace(/\bher\b/g, "$his");
					slavetext = slavetext.replace(/\bHer\b/g, "$His");
					slavetext = slavetext.replace(/\b girl\b/g, " $girl");
					slavetext = slavetext.replace(/\b woman\b/g, " $woman");
					slavetext = slavetext.replace(/\${2,}/g, '');
				}
				break;
		}
		return slavetext;
	}

	if (slave.reservedChildren !== undefined) { delete slave.reservedChildren; }
	if (slave.origin !== undefined && slave.origin !== "") { slave.origin = pronounReplacer(slave.origin); }
	if (slave.custom !== undefined) {
		if (slave.custom.desc !== undefined && slave.custom.desc !== "") {
			slave.custom.desc = pronounReplacer(slave.custom.desc);
		}
		if (slave.custom.tattoo !== undefined && slave.custom.tattoo !== "") {
			slave.custom.tattoo = pronounReplacer(slave.custom.tattoo);
		}
	}
	if (slave.prestigeDesc !== undefined && slave.prestigeDesc !== 0) { slave.prestigeDesc = pronounReplacer(slave.prestigeDesc); }
	if (slave.pornPrestigeDesc !== undefined && slave.pornPrestigeDesc !== 0) { // This must be defined first, hence the previous line.
		if (V.releaseID < 1050 && slave.prestigeDesc !== undefined && slave.prestigeDesc !== 0) { /* BC absolutely FUCKED this */
			const genre = App.Porn.getGenreByFameName(slave.pornFameType);
			if (jsDef(genre)) {
				if (slave.pornPrestige === 1) {
					slave.pornPrestigeDesc = `$He has a following in slave pornography. ${genre.prestigeDesc1}.`;
				} else if (slave.pornPrestige === 2) {
					slave.pornPrestigeDesc = `$He is well known from $his career in slave pornography. ${genre.prestigeDesc2}.`;
				} else if (slave.pornPrestige === 3) {
					slave.pornPrestigeDesc = `$He is world famous for $his career in slave pornography. ${genre.prestigeDesc3}.`;
				} else {
					slave.pornPrestigeDesc = 0;
				}
			} else {
				slave.pornPrestigeDesc = 0;
			}
		} else {
			slave.pornPrestigeDesc = pronounReplacer(slave.pornPrestigeDesc);
		}
	}

	if (slave.amp !== undefined) {
		if (slave.amp === 1) {
			slave.arm = {left: null, right: null};
			slave.leg = {left: null, right: null};
		} else {
			const newID = ((slave.amp * -1) + 1);
			slave.arm = {
				left: new App.Entity.LimbState(),
				right: new App.Entity.LimbState()
			};
			slave.leg = {
				left: new App.Entity.LimbState(),
				right: new App.Entity.LimbState()
			};
			slave.arm.left.type = newID;
			slave.arm.right.type = newID;
			slave.leg.left.type = newID;
			slave.leg.right.type = newID;
			/* no need to check partial amputation, since it is not possible to create prior to this */
		}
		delete slave.amp;
		delete slave.missingLegs;
		delete slave.missingArms;
	} else if (slave.arm === undefined) {
		slave.arm = {
			left: new App.Entity.LimbState(),
			right: new App.Entity.LimbState()
		};
		slave.leg = {
			left: new App.Entity.LimbState(),
			right: new App.Entity.LimbState()
		};
	}

	if (hasAnyProstheticLimbs(slave)) {
		slave.PLimb = 1;
		if (getLimbCount(slave, 6) > 0) {
			slave.PLimb = 2;
		}
	}

	if (slave.eyeball !== undefined) { delete slave.eyeball; }

	if (slave.auricle !== undefined) { delete slave.auricle; }

	if (slave.readyLimbs !== undefined) {
		for (let k = 0; k < slave.readyLimbs.length; k++) {
			switch (slave.readyLimbs[k].type) {
				case -1:
					addProsthetic(slave, "basicL");
					break;
				case -2:
					addProsthetic(slave, "sexL");
					break;
				case -3:
					addProsthetic(slave, "beautyL");
					break;
				case -4:
					addProsthetic(slave, "combatL");
					break;
				case -5:
					addProsthetic(slave, "cyberneticL");
					break;
			}
		}
	}

	if (slave.hStyle === "Salon") { slave.hStyle = "trimmed"; }


	if (!App.Medicine.Modification.Color.Primary.find(c => c.value === slave.hColor)) {
		const colorExtract = (/with (.*?) highlights/g).exec(slave.hColor);
		slave.hEffectColor = colorExtract ? colorExtract[1] : "none";
		slave.hEffect = `${slave.hEffectColor} highlights`;
		if (slave.hColor.includes("with")) {
			slave.hColor = slave.hColor.replace(/ with.*/g, "");
		}
	}


	if (V.releaseID < 1052) {
		const prosthetics = slave.readyProsthetics;
		slave.readyProsthetics = [];
		for (const p of prosthetics) {
			addProsthetic(slave, p.id);
		}
	}

	if (V.releaseID < 1058) {
		if (slave.albinism === 2) {
			let temp;
			temp = slave.origSkin;
			slave.origSkin = slave.albinismOverride.skin;
			slave.albinismOverride.skin = temp;
			temp = slave.origEye;
			slave.origEye = slave.albinismOverride.eyeColor;
			slave.albinismOverride.eyeColor = temp;
			temp = slave.origHColor;
			slave.origHColor = slave.albinismOverride.hColor;
			slave.albinismOverride.hColor = temp;
		}
	}

	if (V.releaseID < 1059 || !(slave.eye)) {
		slave.eye = new App.Entity.EyeState();
		const origEye = slave.origEye || "brown";
		setGeneticEyeColor(slave, origEye);
		if (slave.eyes === -4) {
			eyeSurgery(slave, "both", "remove");
		} else {
			if (slave.eyesImplant === 1) {
				eyeSurgery(slave, "both", "cybernetic");
			}
			if (slave.eyes === -3) {
				eyeSurgery(slave, "both", "glass");
			} else if (slave.eyes === -2) {
				eyeSurgery(slave, "both", "blind");
			} else if (slave.eyes === -1) {
				eyeSurgery(slave, "both", "blur");
			}
			const eyeColor = slave.eyeColor || "brown";
			const pupil = slave.pupil || "circular";
			const sclerae = slave.sclerae || "white";
			setEyeColorFull(slave, eyeColor, pupil, sclerae, "both");
			if (typeof slave.geneticQuirks.heterochromia === "string") {
				setEyeColor(slave.geneticQuirks.heterochromia, "left");
			}
		}
	}

	if (slave.eyes !== undefined) { delete slave.eyes; }
	if (slave.eyeColor !== undefined) { delete slave.eyeColor; }
	if (slave.eyesImplant !== undefined) { delete slave.eyesImplant; }
	if (slave.origEye !== undefined) { delete slave.origEye; }
	if (slave.pupil !== undefined) { delete slave.pupil; }
	if (slave.sclerae !== undefined) { delete slave.sclerae; }

	if (slave.origin === "Shortly after birth, $he was sealed in an aging tank until $he was of age. $He knows only of the terror that awaits $him should $he not obey $his master.") {
		slave.tankBaby = 2;
	} else if (slave.origin === "Shortly after birth, $he was sealed in an aging tank until $he was of age. $He knows nothing of the world outside of what the tank imprinted $him with.") {
		slave.tankBaby = 1;
	} else if (slave.tankBaby === undefined) {
		slave.tankBaby = 0;
	}

	if (slave.origin === "$He sold $himself into slavery to feed $himself and $his growing brood.") {
		if (slave.pregAdaptation < 750) {
			slave.pregAdaptation = 750;
		}
	}

	if (slave.rivalry !== 0) {
		const test = getSlave(slave.rivalryTarget);
		if (!test) {
			slave.rivalry = 0;
			slave.rivalryTarget = 0;
		}
	}
	if (slave.relationship > 0) {
		const test = getSlave(slave.relationshipTarget);
		if (!test) {
			slave.relationship = 0;
			slave.relationshipTarget = 0;
		}
	}

	if (slave.race === "surgically altered to look amerindian") {
		slave.race = "amerindian";
	} else if (slave.race === "surgically altered to look asian") {
		slave.race = "asian";
	} else if (slave.race === "surgically altered to look black") {
		slave.race = "black";
	} else if (slave.race === "surgically altered to look indo-aryan") {
		slave.race = "indo-aryan";
	} else if (slave.race === "surgically altered to look latina") {
		slave.race = "latina";
	} else if (slave.race === "surgically altered to look malay") {
		slave.race = "malay";
	} else if (slave.race === "surgically altered to look middle eastern") {
		slave.race = "middle eastern";
	} else if (slave.race === "surgically altered to look mixed race" || slave.race === "surgically altered to look mixed") {
		slave.race = "mixed race";
	} else if (slave.race === "surgically altered to look pacific islander" || slave.race === "surgically altered to look like a pacific islander") {
		slave.race = "pacific islander";
	} else if (slave.race === "surgically altered to look southern european" || slave.race === "southern European") {
		slave.race = "southern european";
	} else if (slave.race === "surgically altered to look semitic") {
		slave.race = "semitic";
	} else if (slave.race === "surgically altered to look white") {
		slave.race = "white";
	}

	switch (slave.skin) {
		case "red dyed":
			slave.skin = "dyed red";
			break;
		case "green dyed":
			slave.skin = "dyed green";
			break;
		case "blue dyed":
			slave.skin = "dyed blue";
			break;
		case "tanned":
			slave.skin = "tan";
			break;
		case "lightened":
			slave.skin = "light";
			break;
		case "bronzed":
			slave.skin = "bronze";
			break;
		case "darkened":
			slave.skin = "dark";
			break;
	}

	switch (slave.origSkin) {
		case "blue dyed":
		case "dyed blue":
		case "dyed green":
		case "dyed red":
		case "green dyed":
		case "red dyed":
			slave.origSkin = randomRaceSkin(slave.origRace);
			break;
		case "tanned":
			slave.origSkin = "tan";
			break;
		case "lightened":
			slave.origSkin = "light";
			break;
		case "bronzed":
			slave.origSkin = "bronze";
			break;
		case "darkened":
			slave.origSkin = "dark";
			break;
	}

	if (slave.markings === "heavily") {
		slave.markings = "heavily freckled";
	} else if (slave.markings === "beauty") {
		slave.markings = "beauty mark";
	}

	if (slave.underArmHColor === "slave.hColor") {
		slave.underArmHColor = slave.hColor;
	}
	if (slave.eyebrowHColor === "slave.hColor") {
		slave.eyebrowHColor = slave.hColor;
	}

	if (slave.genes === undefined) {
		if (slave.ovaries === 1) {
			slave.genes = "XX";
		} else {
			slave.genes = "XY";
		}
	}

	if (V.releaseID < 1000) {
		if (slave.face === -3) {
			slave.face = -100;
		} else if (slave.face === -2) {
			slave.face = -50;
		} else if (slave.face === -1) {
			slave.face = -20;
		} else if (slave.face === 0) {
			slave.face = 0;
		} else if (slave.face === 1) {
			slave.face = 20;
		} else if (slave.face === 2) {
			slave.face = 50;
		} else {
			slave.face = 100;
		}
	}
	if (V.releaseID < 1031) {
		if (slave.intelligence === -3) {
			slave.intelligence = -100;
		} else if (slave.intelligence === -2) {
			slave.intelligence = -60;
		} else if (slave.intelligence === -1) {
			slave.intelligence = -30;
		} else if (slave.intelligence === 0) {
			slave.intelligence = 0;
		} else if (slave.intelligence === 1) {
			slave.intelligence = 30;
		} else if (slave.intelligence === 2) {
			slave.intelligence = 60;
		} else {
			slave.intelligence = 99;
		}
		if (slave.intelligenceImplant === 1) {
			slave.intelligenceImplant = 30;
		}
	}

	if (slave.teeth === 0) {
		slave.teeth = "normal";
	} else if (slave.teeth === "straightening") {
		slave.teeth = "straightening braces";
	} else if (slave.teeth === "cosmetic") {
		slave.teeth = "cosmetic braces";
	}

	if (slave.areolaeShape === undefined) {
		if (slave.areolae === 4) {
			slave.areolaeShape = "heart";
			slave.areolae = 3;
		} else if (slave.areolae === 5) {
			slave.areolaeShape = "star";
			slave.areolae = 3;
		} else {
			slave.areolaeShape = "circle";
		}
	}

	if (V.releaseID < 1061) {
		if (slave.boobsImplantType === 1) {
			slave.boobsImplantType = "string";
		} else if (slave.boobsImplant >= 10000) {
			slave.boobsImplantType = "hyper fillable";
		} else if (slave.boobsImplant >= 2000) {
			slave.boobsImplantType = "advanced fillable";
		} else if (slave.boobsImplant >= 800) {
			slave.boobsImplantType = "fillable";
		} else if (slave.boobsImplant > 0) {
			slave.boobsImplantType = "normal";
		} else {
			slave.boobsImplantType = "none";
		}
		if (slave.buttImplantType === 1) {
			slave.buttImplantType = "string";
		} else if (slave.buttImplant > 7) {
			slave.buttImplantType = "hyper fillable";
		} else if (slave.buttImplant >= 5) {
			slave.buttImplantType = "advanced fillable";
		} else if (slave.buttImplant >= 3) {
			slave.buttImplantType = "fillable";
		} else if (slave.buttImplant > 0) {
			slave.buttImplantType = "normal";
		} else {
			slave.buttImplantType = "none";
		}
	}

	if (V.releaseID < 1059) {
		if (slave.eyeColor === undefined) {
			slave.eyeColor = slave.eyes;
			slave.eyes = 1;
			if (slave.eyeColor === undefined) {
				slave.eyeColor = "brown";
			}
		}

		if (slave.pupil === undefined) {
			if (slave.eyeColor === "catlike") {
				slave.pupil = "catlike";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "serpent-like") {
				slave.pupil = "serpent-like";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "devilish") {
				slave.pupil = "devilish";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "demonic") {
				slave.pupil = "demonic";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "hypnotic") {
				slave.pupil = "hypnotic";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "heart-shaped") {
				slave.pupil = "heart-shaped";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "wide-eyed") {
				slave.pupil = "wide-eyed";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "almond-shaped") {
				slave.pupil = "almond-shaped";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "bright") {
				slave.pupil = "bright";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "teary") {
				slave.pupil = "teary";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "vacant") {
				slave.pupil = "vacant";
				slave.eyeColor = "brown";
			} else {
				slave.pupil = "circular";
			}
		}
	}

	if (slave.pitkills !== undefined) { delete slave.pitkills; }
	if (slave.penetrationCount !== undefined) { delete slave.penetrationCount; }
	if (slave.oralTotal !== undefined) { delete slave.oralTotal; }
	if (slave.vaginaCount !== undefined) { delete slave.vaginaCount; }

	if (((V.ver.startsWith("0.6") && !V.ver.startsWith("10.6")) || (V.ver.startsWith("0.7")) || (V.ver.startsWith("0.8"))) && (!V.ver.startsWith("0.8.9")) && (!V.ver.startsWith("0.8.10")) && (!V.ver.startsWith("0.8.11")) && (!V.ver.startsWith("0.8.12"))) {
		if (slave.attrXX === 2) {
			slave.attrXX = 90;
		} else if (slave.attrXX === 1) {
			slave.attrXX = 70;
		} else if (slave.attrXX === 0) {
			slave.attrXX = 50;
		} else if (slave.attrXX === -1) {
			slave.attrXX = 30;
		} else {
			slave.attrXX = 10;
		}
		if (slave.attrXY === 2) {
			slave.attrXY = 90;
		} else if (slave.attrXY === 1) {
			slave.attrXY = 70;
		} else if (slave.attrXY === 0) {
			slave.attrXY = 50;
		} else if (slave.attrXY === -1) {
			slave.attrXY = 30;
		} else {
			slave.attrXY = 10;
		}
	}

	if ((V.ver.startsWith("0.6") && !V.ver.startsWith("10.6")) || (V.ver.startsWith("0.7")) || (V.ver.startsWith("0.8"))) {
		if (slave.health <= -9) {
			slave.health = -90;
		} else if (slave.health <= -7) {
			slave.health = jsRandom(-89, -70);
		} else if (slave.health <= -5) {
			slave.health = jsRandom(-69, -50);
		} else if (slave.health <= -3) {
			slave.health = jsRandom(-49, -30);
		} else if (slave.health <= -1) {
			slave.health = jsRandom(-29, -10);
		} else if (slave.health <= 1) {
			slave.health = jsRandom(-9, 10);
		} else if (slave.health <= 3) {
			slave.health = jsRandom(11, 30);
		} else if (slave.health <= 5) {
			slave.health = jsRandom(31, 50);
		} else if (slave.health <= 7) {
			slave.health = jsRandom(51, 70);
		} else if (slave.health <= 8) {
			slave.health = jsRandom(71, 80);
		} else if (slave.health <= 9) {
			slave.health = jsRandom(81, 90);
		} else if (slave.health <= 10) {
			slave.health = jsRandom(91, 100);
		} else if (slave.health <= 15) {
			slave.health = jsRandom(101, 150);
		} else if (slave.health <= 20) {
			slave.health = jsRandom(151, 200);
		} else if (slave.health >= 50) {
			slave.health = 500;
		} else if (slave.health > 20) {
			slave.health = 205;
		}

		slave.devotion = (slave.devotion * 5);
		slave.oldDevotion = (slave.oldDevotion * 5);
		slave.trust = (slave.trust * 5);
		slave.oldTrust = (slave.oldTrust * 5);

		if (slave.fetishStrength === 0) {
			slave.fetishStrength = jsRandom(0, 60);
		} else if (slave.fetishStrength === 1) {
			slave.fetishStrength = jsRandom(61, 80);
		} else if (slave.fetishStrength === 2) {
			slave.fetishStrength = jsRandom(96, 100);
		}

		if (slave.weight === -3) {
			slave.weight = jsRandom(-110, -96);
		} else if (slave.weight === -2) {
			slave.weight = jsRandom(-95, -31);
		} else if (slave.weight === -1) {
			slave.weight = jsRandom(-30, -11);
		} else if (slave.weight === 0) {
			slave.weight = jsRandom(-11, 10);
		} else if (slave.weight === 1) {
			slave.weight = jsRandom(11, 30);
		} else if (slave.weight === 2) {
			slave.weight = jsRandom(31, 95);
		} else if (slave.weight === 3) {
			slave.weight = jsRandom(96, 110);
		}

		if (slave.lips !== 0) {
			if (slave.lips === 3) {
				slave.lips = 85;
			} else if (slave.lips === 2) {
				slave.lips = 55;
			} else if (slave.lips === 1) {
				slave.lips = 35;
			}
		}
	}

	if (((V.ver.startsWith("0.6") && !V.ver.startsWith("10.6")) || (V.ver.startsWith("0.7")) || (V.ver.startsWith("0.8")) || (V.ver.startsWith("0.9"))) && (!V.ver.startsWith("0.9.5")) && (!V.ver.startsWith("0.9.6")) && (!V.ver.startsWith("0.9.7")) && (!V.ver.startsWith("0.9.8")) && (!V.ver.startsWith("0.9.9")) && (!V.ver.startsWith("0.9.10"))) {
		if (slave.skill === undefined) {
			if (slave.oralSkill > 0) {
				if (slave.oralSkill === 3) {
					slave.oralSkill = 100;
				} else if (slave.oralSkill === 2) {
					slave.oralSkill = 65;
				} else {
					slave.oralSkill = 35;
				}
			}
			if (slave.vaginalSkill > 0) {
				if (slave.vaginalSkill === 3) {
					slave.vaginalSkill = 100;
				} else if (slave.vaginalSkill === 2) {
					slave.vaginalSkill = 65;
				} else {
					slave.vaginalSkill = 35;
				}
			}
			if (slave.analSkill > 0) {
				if (slave.analSkill === 3) {
					slave.analSkill = 100;
				} else if (slave.analSkill === 2) {
					slave.analSkill = 65;
				} else {
					slave.analSkill = 35;
				}
			}
			if (slave.whoreSkill > 0) {
				if (slave.whoreSkill === 3) {
					slave.whoreSkill = 100;
				} else if (slave.whoreSkill === 2) {
					slave.whoreSkill = 65;
				} else {
					slave.whoreSkill = 35;
				}
			}
			if (slave.entertainSkill > 0) {
				if (slave.entertainSkill === 3) {
					slave.entertainSkill = 100;
				} else if (slave.entertainSkill === 2) {
					slave.entertainSkill = 65;
				} else {
					slave.entertainSkill = 35;
				}
			}
		}

		if (V.ver !== "0.9.4") {
			slave.aphrodisiacs = 0;
			if (slave.drugs === "curatives") {
				slave.curatives = 2;
				slave.drugs = "no drugs";
			} else if (slave.drugs === "preventatives") {
				slave.curatives = 1;
				slave.drugs = "no drugs";
			} else if (slave.drugs === "aphrodisiacs") {
				slave.aphrodisiacs = 1;
				slave.drugs = "no drugs";
			} else if (slave.drugs === "extreme aphrodisiacs") {
				slave.aphrodisiacs = 2;
				slave.drugs = "no drugs";
			}
			if (slave.muscles >= 3) {
				slave.muscles = 100;
			} else if (slave.muscles >= 2) {
				slave.muscles = 50;
			} else if (slave.muscles >= 1) {
				slave.muscles = 20;
			} else {
				slave.muscles = 0;
			}
		}
	}

	const tatMap = v => {
		switch (v) {
			case "floral designs":
				return "flowers";
			case "demeaning inscriptions":
				return "rude words";
			case "lewd scenes":
				return "scenes";
			case "degrading language":
				return "degradation";
			case "slutty advertisements":
				return "advertisements";
			default:
				return v;
		}
	};

	slave.boobsTat = tatMap(slave.boobsTat);
	slave.buttTat = tatMap(slave.buttTat);
	slave.vaginaTat = tatMap(slave.vaginaTat);
	slave.dickTat = tatMap(slave.dickTat);
	slave.anusTat = tatMap(slave.anusTat);
	slave.backTat = tatMap(slave.backTat);
	slave.shouldersTat = tatMap(slave.shouldersTat);
	slave.armsTat = tatMap(slave.armsTat);
	slave.legsTat = tatMap(slave.legsTat);
	slave.stampTat = tatMap(slave.stampTat);
	slave.lipsTat = tatMap(slave.lipsTat);

	if (slave.currentRules === undefined || slave.currentRules.length < 1) {
		slave.currentRules = [];
	}

	if (slave.height < -1) {
		slave.height = jsRandom(140, 149);
	} else if (slave.height < 0) {
		slave.height = jsRandom(150, 159);
	} else if (slave.height < 1) {
		slave.height = jsRandom(160, 169);
	} else if (slave.height < 2) {
		slave.height = jsRandom(170, 184);
	} else if (slave.height <= 3) {
		slave.height = jsRandom(185, 200);
	}

	if (V.releaseID < 1059) {
		if (slave.eyeColor === "no default value") {
			slave.eyeColor = slave.origEye;
		}
	}

	if (slave.birthSurname === undefined) { slave.birthSurname = 0; }
	if (slave.slaveSurname === undefined) { slave.slaveSurname = 0; }

	if (slave.faceImplant === 1) {
		slave.faceImplant = 15;
	} else if (slave.faceImplant === 2) {
		slave.faceImplant = 65;
	}

	if (slave.areoleaPiercing !== undefined) { delete slave.areoleaPiercing; }

	if (slave.pregControl === "labor supressors") {
		slave.pregControl = "labor suppressors";
	}

	// Fix dickAccessory
	if (slave.dickAccessory === "combined chastity") {
		slave.chastityAnus = 1;
		slave.chastityPenis = 1;
		slave.dickAccessory = "none";
	} else if (slave.dickAccessory === "chastity") {
		slave.chastityPenis = 1;
		slave.dickAccessory = "none";
	} else if (slave.dickAccessory === "anal chastity") {
		slave.chastityAnus = 1;
		slave.dickAccessory = "none";
	}
	// Fix vaginalAccessory
	if (slave.vaginalAccessory === "combined chastity") {
		slave.chastityAnus = 1;
		slave.chastityVagina = 1;
		slave.vaginalAccessory = "none";
	} else if (slave.vaginalAccessory === "chastity belt") {
		slave.chastityVagina = 1;
		slave.vaginalAccessory = "none";
	} else if (slave.vaginalAccessory === "anal chastity") {
		slave.chastityAnus = 1;
		slave.vaginalAccessory = "none";
	}

	if (slave.rules !== undefined && slave.rules.rest === undefined) {
		slave.rules.rest = "restrictive";
	}

	// migrate to extended family mode if we detected it was needed
	if (V.relationLinks !== undefined) {
		let link = V.relationLinks[slave.ID];
		if (link) {
			// we already know who your parents are
			slave.mother = link.mother;
			slave.father = link.father;
		} else {
			if (slave.relationTarget > 0) {
				switch (slave.relation) {
					case "sister":
					case "twin": {
						const otherLink = V.relationLinks[slave.relationTarget];
						if (otherLink) {
							// we don't know your parents, but we DO know your sister's parents
							// this shouldn't happen but might sometimes, and there's an obviously correct thing to do - use your sister's parents for you too
							slave.mother = otherLink.mother;
							slave.father = otherLink.father;
						} else {
							// don't know your parents, generate new IDs for them
							setMissingParents(slave);
						}
						V.relationLinks[slave.ID] = {mother: slave.mother, father: slave.father};
						// your sister's parents are the same as your parents
						if (!V.relationLinks[slave.relationTarget]) {
							V.relationLinks[slave.relationTarget] = V.relationLinks[slave.ID];
						}
						break;
					}
					case "daughter":
						// we know your mother. that's easy.
						slave.mother = slave.relationTarget;
						V.relationLinks[slave.ID] = {mother: slave.mother, father: 0};
						break;
					case "mother":
						// we know you are your daughter's mother. keep track of that in case she's forgotten somehow.
						if (!V.relationLinks[slave.relationTarget]) {
							V.relationLinks[slave.relationTarget] = {mother: slave.ID, father: 0};
						}
						break;
					default:
						throw Error(`Unrecognized relation for ${SlaveFullName(slave)}.`);
				}
			}
		}

		// if the slave still had a valid recruitment target, allow her to recruit, otherwise don't
		slave.canRecruit = (slave.recruiter === 0) ? 0 : 1;
	}
	delete slave.relation;
	delete slave.relationTarget;
	delete slave.recruiter;

	if (slave.spermY === undefined) {
		slave.spermY = normalRandInt(50, 3); // narrower range to avoid surprises
	}

	if (slave.geneticQuirks.albinism === 2 && !slave.albinismOverride) {
		induceAlbinism(slave, 2);
	}
	if (genepool) {
		slave.womb = [];
	} else {
		WombInit(slave);
	}
	if (V.releaseID <= 1141) {
		const animalMap = new Map([
			["neko", "cat"],
			["inu", "dog"],
			["kit", "fox"],
			["ushi", "cow"],
			["tanuki", "raccoon"],
			["usagi", "rabbit"],
			["risu", "squirrel"],
			["uma", "horse"],
		]);
		const tail = animalMap.get(slave.tailShape);
		if (tail) {
			slave.tailShape = tail;
		}
		const earShape = animalMap.get(slave.earShape);
		if (earShape) {
			slave.earShape = earShape;
		}
		const earT = animalMap.get(slave.earT);
		if (earT) {
			slave.earT = earT;
		}
	}
	if (V.releaseID < 1036) {
		for (let pmw = 0; pmw < slave.womb.length; pmw++) {
			if (slave.womb[pmw].genetics.mother !== slave.womb[pmw].motherID || slave.womb[pmw].genetics.father !== slave.womb[pmw].fatherID) {
				slave.womb[pmw].genetics = generateGenetics(slave, slave.womb[pmw].fatherID, pmw);
			}
		}
	}

	if (!jsDef(slave.inbreedingCoeff)) {
		slave.inbreedingCoeff = ibc.coeff(slave);
		slave.womb.forEach(f => {
			// Use null as the ID, since fetuses are missing it
			f.genetics.inbreedingCoeff = ibc.coeff(
				{ID: null, mother: f.genetics.mother, father: f.genetics.father}
			);
		});
	}
	slave.womb.forEach(f => {
		f.genetics.geneticQuirks = Object.assign(clone(quirks), f.genetics.geneticQuirks);
	});

	if (!genepool) {
		// transfer scars from body to limbs if needed.
		const scars = slave.scar;
		const brands = slave.brand;
		slave.scar = {};
		slave.brand = {};
		if (slave.leg.left) {
			slave.leg.left.scar = slave.leg.left.scar || {};
			slave.leg.left.brand = slave.leg.left.brand || {};
		}
		if (slave.leg.right) {
			slave.leg.right.scar = slave.leg.right.scar || {};
			slave.leg.right.brand = slave.leg.right.brand || {};
		}
		if (slave.arm.left) {
			slave.arm.left.scar = slave.arm.left.scar || {};
			slave.arm.left.brand = slave.arm.left.brand || {};
		}
		if (slave.arm.right) {
			slave.arm.right.scar = slave.arm.right.scar || {};
			slave.arm.right.brand = slave.arm.right.brand || {};
		}
		for (const location in scars) {
			for (const design in scars[location]) {
				App.Medicine.Modification.addScar(slave, location, design, scars[location][design]);
			}
		}
		for (const location in brands) {
			App.Medicine.Modification.addBrand(slave, location, brands[location]);
		}
	}

	if (V.releaseID < 1182) {
		if (slave.skill?.combat === 1) {
			slave.skill.combat = 70;
		}
	}

	function updateSlaveBoobPotential(slave) {
		const slaveGenes = genepool ? slave : V.genePool.find(s => s.ID === slave.ID);
		if (!slaveGenes || (slaveGenes.boobs <= 200 && slaveGenes.genes === "XY") || (slaveGenes.boobsImplant > 0 && App.Medicine.fleshSize(slaveGenes, 'boobs') < 300)) {
			slave.natural.boobs = adjustBreastSize(slave);
		} else {
			slave.natural.boobs = Math.clamp(App.Medicine.fleshSize(slaveGenes, 'boobs'), 200, 2000);
		}
	}

	if (!slave.natural) {
		slave.natural = new App.Entity.GeneticState();
		slave.natural.artSeed = slave.ID; // used to use the ID as the seed; copy it on old slaves so they don't suddenly change appearance
		if (slave.physicalAge >= 20) {
			slave.natural.height = slave.height - slave.heightImplant * 10;
		} else {
			// find and set a reasonable natural height for this immature slave
			if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2) {
				slave.natural.height = Height.randomAdult(slave, {limitMult: [-4, -1], spread: 0.15});
			} else if (slave.geneticQuirks.gigantism === 2) {
				slave.natural.height = Height.randomAdult(slave, {limitMult: [3, 10], spread: 0.15});
			} else {
				slave.natural.height = Height.randomAdult(slave);
			}
		}
		updateSlaveBoobPotential(slave);
	}
	if (!isFinite(slave.natural.boobs)) {
		updateSlaveBoobPotential(slave);
	}
};
