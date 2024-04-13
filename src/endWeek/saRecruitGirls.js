// cSpell:ignore lewds

/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.recruitGirls = function recruitGirls(slave) {
	/** @type {string[]} */
	let r = [];

	const arcology = V.arcologies[0];
	const targetArcology = V.arcologies.find((s) => s.direction === arcology.influenceTarget);

	const arcologyInfo = new App.Utils.Arcology(arcology);
	const targetArcologyInfo = targetArcology ? new App.Utils.Arcology(targetArcology) : null;

	const totalInt = slave.intelligence + slave.intelligenceImplant;

	const {
		he, him, his, himself, girl, woman, women, He, His,
	} = getPronouns(slave);

	const idleTarget = calcIdleTarget();
	physicalAdjustments(slave);
	if (slave.health.tired > 80) {
		tooTired();
	} else if (V.recruiterTarget === "other arcologies") {
		influenceNeighbor(slave);
	} else if (V.slaves.length < idleTarget) {
		recruiting(slave);
	} else {
		idlePublicity(slave);
	}

	return r.join(" ");

	/** Get club ads bonus for Edo Revivalist recruitment
	 * @returns {number}
	 */
	function getClubAdsBonus() {
		let seed = 0;
		const sluts = App.Entity.facilities.club.employees();
		if (V.clubDecoration !== "standard" && sluts.length > 1) {
			const adMgr = new App.Ads.AdManager("club");
			sluts.forEach((s) => adMgr.tallySlave(s));
			for (const cat of App.Ads.getAllCategories()) {
				// protip: spend money on *accurate* ads, whether or not they match societal preferences
				if (adMgr.varietyBonus(cat) === 1 || adMgr.slavesMatchAds(cat)) {
					seed++;
				}
			}
		}
		return seed;
	}

	/**
	 * @returns {number}
	 */
	function calcIdleTarget() {
		if (V.recruiterIdleRule === "number") {
			return V.recruiterIdleNumber;
		} else if (V.recruiterIdleRule === "facility") {
			return App.Utils.recruiterFacilitySpace();
		} else {
			return Infinity;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function physicalAdjustments(slave) {
		if (slave.lactation && arcologyInfo.fsActive('FSPastoralist')) {
			slave.lactationDuration = 2;
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}
		tired(slave);
	}

	function tooTired() {
		r.push(`uses the week to recover from fatigue and`);
		if (V.recruiterTarget === "other arcologies") {
			if (targetArcology !== undefined) {
				r.push(`better prepare to manipulate ${targetArcology.name}'s culture.`);
			} else {
				r.push(`realize that you have not targeted a neighboring arcology for cultural influence, making ${his} assignment pointless.`);
				if (V.oldRecruiterTarget) {
					V.recruiterTarget = clone(V.oldRecruiterTarget);
					r.push(`<span class="noteworthy">${He} goes back to recruiting ${V.recruiterTarget}.</span>`);
					delete V.oldRecruiterTarget;
				}
			}
		} else if (V.slaves.length < idleTarget) {
			r.push(`better prepare to manipulate ${V.recruiterTarget} into enslavement.`);
		} else {
			r.push(`prepare methods to better support your cultural directions.`);
		}
		V.recruiterIOUs++;
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function influenceNeighbor(slave) {
		if (targetArcology !== undefined) {
			r.push(`acts as a sexual Ambassador to ${targetArcology.name}, which mostly means that ${he} travels there in ${his} official capacity and has culturally influential sex with its leading citizens.`);

			const oldRepIncome = hashSum(V.lastWeeksRepIncome);
			r.push(He, App.SlaveAssignment.serveThePublic(slave));
			const netRecruiterEntertainmentIncome = hashSum(V.lastWeeksRepIncome) - oldRepIncome;
			const influence = Math.clamp(netRecruiterEntertainmentIncome * 0.01, 1, 3 + V.recruiterIOUs);
			V.recruiterIOUs = 0;

			if (arcologyInfo.fsActive('FSSubjugationist')) {
				if (targetArcologyInfo.fsActive('FSSubjugationist')) {
					if (arcology.FSSubjugationistRace === targetArcology.FSSubjugationistRace) {
						r.push(`${He} advances its racially aligned`);
						if (slave.race === targetArcology.FSSubjugationistRace) {
							r.push(`Subjugationism, which ${he}'s very appropriate for, since ${he}'s ${addA(slave.race)} slave ${himself}.`);
							targetArcology.FSSubjugationist++;
						} else {
							r.push(`Subjugationism.`);
						}
						targetArcology.FSSubjugationist += influence;
					} else {
						r.push(`${He} challenges its racially mismatched`);
						if (slave.race !== targetArcology.FSSubjugationistRace) {
							r.push(`Subjugationism, which ${he}'s very appropriate for, since ${he}'s ${addA(slave.race)} slave.`);
							targetArcology.FSSubjugationist--;
						} else {
							r.push(`Subjugationism.`);
						}
						targetArcology.FSSubjugationist -= influence;
					}
				} else if (targetArcologyInfo.fsActive('FSSupremacist') && arcology.FSSubjugationistRace === targetArcology.FSSupremacistRace) {
					r.push(`${He} challenges its opposing`);
					if (slave.race === targetArcology.FSSubjugationistRace) {
						r.push(`Supremacism, which ${he}'s very appropriate for, since ${he}'s ${addA(slave.race)} slave ${himself}.`);
						targetArcology.FSSupremacist--;
					} else {
						r.push(`Supremacism.`);
					}
					targetArcology.FSSupremacist -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSSupremacist')) {
				if (targetArcologyInfo.fsActive('FSSupremacist')) {
					if (arcology.FSSupremacistRace === targetArcology.FSSupremacistRace) {
						r.push(`${He} advances its racially aligned`);
						if (slave.race !== targetArcology.FSSupremacistRace) {
							r.push(`Supremacism, which ${he}'s very appropriate for, since ${he}'s ${addA(slave.race)} slave ${himself}.`);
							targetArcology.FSSupremacist++;
						} else {
							r.push(`Supremacism.`);
						}
						targetArcology.FSSupremacist += influence;
					} else {
						r.push(`${He} challenges its racially mismatched`);
						if (slave.race === targetArcology.FSSupremacistRace) {
							r.push(`Supremacism, which ${he}'s very appropriate for, since ${he}'s ${addA(slave.race)} slave.`);
							targetArcology.FSSupremacist--;
						} else {
							r.push(`Supremacism.`);
						}
						targetArcology.FSSupremacist -= influence;
					}
				} else if (targetArcologyInfo.fsActive('FSSubjugationist') && arcology.FSSupremacistRace === targetArcology.FSSubjugationistRace) {
					r.push(`${He} challenges its opposing`);
					if (slave.race !== targetArcology.FSSupremacistRace) {
						r.push(`Subjugationism, which ${he}'s very appropriate for, since ${he}'s ${addA(slave.race)} slave ${himself}.`);
						targetArcology.FSSubjugationist--;
					} else {
						r.push(`Subjugationism.`);
					}
					targetArcology.FSSubjugationist -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSGenderRadicalist')) {
				if (targetArcologyInfo.fsActive('FSGenderRadicalist')) {
					r.push(`${He} advances Gender Radicalism there by fucking and getting fucked by anyone who's`);
					if (canDoAnal(slave) && canPenetrate(slave)) {
						r.push(`willing, which ${he}'s perfect for, since ${he}'s quite capable of cumming from`);
						if (slave.prostate > 0) {
							r.push(`prostate stimulation`);
						} else {
							r.push(`anal sex`);
						}
						r.push(`while fucking someone in the ass.`);
						targetArcology.FSGenderRadicalist++;
					} else {
						r.push(`willing.`);
					}
					targetArcology.FSGenderRadicalist += influence;
				} else if (targetArcologyInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`${He} challenges Gender Fundamentalism there by fucking and getting fucked by anyone who's`);
					if (canDoAnal(slave) && canPenetrate(slave)) {
						r.push(`willing, which ${he}'s perfect for, since ${he}'s quite capable of cumming from`);
						if (slave.prostate > 0) {
							r.push(`prostate stimulation`);
						} else {
							r.push(`anal sex`);
						}
						r.push(`while fucking someone in the ass.`);
						targetArcology.FSGenderFundamentalist--;
					} else {
						r.push(`willing.`);
					}
					targetArcology.FSGenderFundamentalist -= influence;
				}
			} else if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
				if (targetArcologyInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`${He} advances Gender Fundamentalism there by being a wholesome, romantic`);
					if (slave.genes === GenderGenes.FEMALE && slave.vagina > -1 && !slave.dick && !slave.scrotum) {
						r.push(`${girl}, which ${he}'s perfect for, since ${he}'s a proper ${woman} with a body meant for missionary.`);
						targetArcology.FSGenderFundamentalist++;
					} else {
						r.push(`${girl}.`);
					}
					targetArcology.FSGenderFundamentalist += influence;
				} else if (targetArcologyInfo.fsActive('FSGenderRadicalist')) {
					r.push(`${He} challenges Gender Radicalism there by being a wholesome, romantic`);
					if (slave.genes === GenderGenes.FEMALE && slave.vagina > -1 && !slave.dick && !slave.scrotum) {
						r.push(`${girl}, which ${he}'s perfect for, since ${he}'s a proper ${woman} with a body meant for missionary.`);
						targetArcology.FSGenderRadicalist--;
					} else {
						r.push(`${girl}.`);
					}
					targetArcology.FSGenderRadicalist -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSPaternalist')) {
				if (targetArcologyInfo.fsActive('FSPaternalist')) {
					r.push(`${He} advances Paternalism there by ${his} enthusiasm for sexual`);
					if (slave.energy > 95 && slave.trust > 50) {
						r.push(`slavery, which ${he}'s perfect for, since ${he}'s a trusting nymphomaniac who couldn't possibly find happiness as anything other than a sex slave.`);
						targetArcology.FSPaternalist++;
					} else {
						r.push(`slavery.`);
					}
					targetArcology.FSPaternalist += influence;
				} else if (targetArcologyInfo.fsActive('FSDegradationist')) {
					r.push(`${He} challenges Degradationism there by ${his} enthusiasm for sexual`);
					if (slave.energy > 95 && slave.trust > 50) {
						r.push(`slavery, which ${he}'s perfect for, since ${he}'s a trusting nymphomaniac who couldn't possibly find happiness as anything other than a sex slave.`);
						targetArcology.FSDegradationist--;
					} else {
						r.push(`slavery.`);
					}
					targetArcology.FSDegradationist -= influence;
				}
			} else if (arcologyInfo.fsActive('FSDegradationist')) {
				if (targetArcologyInfo.fsActive('FSDegradationist')) {
					r.push(`${He} advances Degradationism there by submitting to public use in the most degrading`);
					if (slave.energy > 95 && slave.trust < -50) {
						r.push(`ways, which ${he}'s perfect for, since ${he}'s a frightened nymphomaniac for whom fear is an essential ingredient in the sexual release ${he} craves.`);
						targetArcology.FSDegradationist++;
					} else {
						r.push(`ways.`);
					}
					targetArcology.FSDegradationist += influence;
				} else if (targetArcologyInfo.fsActive('FSPaternalist')) {
					r.push(`${He} challenges Paternalism there by submitting to public use in the most degrading`);
					if (slave.energy > 95 && slave.trust < -50) {
						r.push(`ways, which ${he}'s perfect for, since ${he}'s a frightened nymphomaniac for whom fear is an essential ingredient in the sexual release ${he} craves.`);
						targetArcology.FSPaternalist--;
					} else {
						r.push(`ways.`);
					}
					targetArcology.FSPaternalist -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSIntellectualDependency')) {
				if (targetArcologyInfo.fsActive('FSIntellectualDependency')) {
					r.push(`${He} advances Intellectual Dependency there by being an insatiable`);
					if (slave.energy > 95 && slave.attrXX > 95 && slave.attrXY > 95) {
						r.push(`party ${girl}, which ${he}'s perfect for, since there's little ${he} won't make out with.`);
						targetArcology.FSIntellectualDependency++;
					} else {
						r.push(`party ${girl}.`);
					}
					targetArcology.FSIntellectualDependency += influence;
				} else if (targetArcologyInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`${He} challenges Slave Professionalism there by being an insatiable`);
					if (slave.energy > 95 && slave.attrXX > 95 && slave.attrXY > 95) {
						r.push(`party ${girl}, which ${he}'s perfect for, since there's little ${he} won't make out with.`);
						targetArcology.FSSlaveProfessionalism--;
					} else {
						r.push(`party ${girl}.`);
					}
					targetArcology.FSSlaveProfessionalism -= influence;
				}
			} else if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
				if (targetArcologyInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`${He} advances Slave Professionalism there by demonstrating new techniques for the local slaves to`);
					if (totalInt > 95) {
						r.push(`learn, which ${he}'s perfect for, since ${he}'s brilliant enough to pass ${his} knowledge to anyone willing to listen.`);
						targetArcology.FSSlaveProfessionalism++;
					} else {
						r.push(`learn.`);
					}
					targetArcology.FSSlaveProfessionalism += influence;
				} else if (targetArcologyInfo.fsActive('FSIntellectualDependency')) {
					r.push(`${He} challenges Intellectual Dependency there by demonstrating new techniques for the local slaves to`);
					if (totalInt > 95) {
						r.push(`learn, which ${he}'s perfect for, since ${he}'s brilliant enough to pass ${his} knowledge to anyone willing to listen.`);
						targetArcology.FSIntellectualDependency--;
					} else {
						r.push(`learn.`);
					}
					targetArcology.FSIntellectualDependency -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSBodyPurist')) {
				if (targetArcologyInfo.fsActive('FSBodyPurist')) {
					r.push(`${He} advances Body Purism there with a lot of unadorned public`);
					if (isPure(slave)) {
						r.push(`nudity, which ${he}'s perfect for, since ${he}'s an all-natural beauty.`);
						targetArcology.FSBodyPurist++;
					} else {
						r.push(`nudity.`);
					}
					targetArcology.FSBodyPurist += influence;
				} else if (targetArcologyInfo.fsActive('FSTransformationFetishist')) {
					r.push(`${He} challenges Transformation Fetishism there with a lot of unadorned public`);
					if (isPure(slave)) {
						r.push(`nudity, which ${he}'s perfect for, since ${he}'s an all-natural beauty.`);
						targetArcology.FSTransformationFetishist--;
					} else {
						r.push(`nudity.`);
					}
					targetArcology.FSTransformationFetishist -= influence;
				}
			} else if (arcologyInfo.fsActive('FSTransformationFetishist')) {
				if (targetArcologyInfo.fsActive('FSTransformationFetishist')) {
					r.push(`${He} advances Transformation Fetishism there with a lot of slutty public`);
					if (isSurgicallyImproved(slave)) {
						r.push(`nudity, which ${he}'s perfect for, since ${he}'s a whorish sex doll full of plastic.`);
						targetArcology.FSTransformationFetishist++;
					} else {
						r.push(`nudity.`);
					}
					targetArcology.FSTransformationFetishist += influence;
				} else if (targetArcologyInfo.fsActive('FSBodyPurist')) {
					r.push(`${He} challenges Body Purism there with a lot of slutty public`);
					if (isSurgicallyImproved(slave)) {
						r.push(`nudity, which ${he}'s perfect for, since ${he}'s a whorish sex doll full of plastic.`);
						targetArcology.FSBodyPurist--;
					} else {
						r.push(`nudity.`);
					}
					targetArcology.FSBodyPurist -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSYouthPreferentialist')) {
				if (targetArcologyInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`${He} advances Youth Preferentialism there by showing favoritism to younger`);
					if (slave.visualAge < 25) {
						r.push(`suitors, and by being nice and young ${himself}, appropriately enough.`);
						targetArcology.FSYouthPreferentialist++;
					} else {
						r.push(`suitors.`);
					}
					targetArcology.FSYouthPreferentialist += influence;
				} else if (targetArcologyInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`${He} challenges Maturity Preferentialism there by showing favoritism to younger`);
					if (slave.visualAge < 25) {
						r.push(`suitors, and by being nice and young ${himself}, appropriately enough.`);
						targetArcology.FSMaturityPreferentialist--;
					} else {
						r.push(`suitors.`);
					}
					targetArcology.FSMaturityPreferentialist -= influence;
				}
			} else if (arcologyInfo.fsActive('FSMaturityPreferentialist')) {
				if (targetArcologyInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`${He} advances Maturity Preferentialism there by showing favoritism to more mature`);
					if (slave.visualAge > 35) {
						r.push(`suitors, and by being a MILF ${himself}, appropriately enough.`);
						targetArcology.FSMaturityPreferentialist++;
					} else {
						r.push(`suitors.`);
					}
					targetArcology.FSMaturityPreferentialist += influence;
				} else if (targetArcologyInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`${He} challenges Youth Preferentialism there by showing favoritism to more mature`);
					if (slave.visualAge > 35) {
						r.push(`suitors, and by being a MILF ${himself}, appropriately enough.`);
						targetArcology.FSYouthPreferentialist--;
					} else {
						r.push(`suitors.`);
					}
					targetArcology.FSYouthPreferentialist -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSPetiteAdmiration')) {
				if (targetArcologyInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`${He} advances Petite Admiration there by showing favoritism to much taller`);
					if (heightPass(slave)) {
						r.push(`suitors, and by being adorably short ${himself}, appropriately enough.`);
						targetArcology.FSPetiteAdmiration++;
					} else {
						r.push(`suitors.`);
					}
					targetArcology.FSPetiteAdmiration += influence;
				} else if (targetArcologyInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`${He} challenges Statuesque Glorification there by showing favoritism to much taller`);
					if (slave.visualAge < 25) {
						r.push(`suitors, and by being short ${himself}, further pushing the size gap.`);
						targetArcology.FSStatuesqueGlorification--;
					} else {
						r.push(`suitors.`);
					}
					targetArcology.FSStatuesqueGlorification -= influence;
				}
			} else if (arcologyInfo.fsActive('FSStatuesqueGlorification')) {
				if (targetArcologyInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`${He} advances Statuesque Glorification there by showing favoritism to tall`);
					if (heightPass(slave)) {
						r.push(`suitors, and by being tall ${himself}, appropriately enough.`);
						targetArcology.FSStatuesqueGlorification++;
					} else {
						r.push(`suitors.`);
					}
					targetArcology.FSStatuesqueGlorification += influence;
				} else if (targetArcologyInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`${He} challenges Petite Admiration there by showing favoritism to tall`);
					if (heightPass(slave)) {
						r.push(`suitors, and by being tall ${himself}, appropriately enough.`);
						targetArcology.FSPetiteAdmiration--;
					} else {
						r.push(`suitors.`);
					}
					targetArcology.FSPetiteAdmiration -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
				if (targetArcologyInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`${He} advances Slimness Enthusiasm there by showing ${his} appreciation for lithe, graceful`);
					if (slave.boobs < 500 && slave.butt < 3) {
						r.push(`partners, and by being a lissome waif ${himself}.`);
						targetArcology.FSSlimnessEnthusiast++;
					} else {
						r.push(`partners.`);
					}
					targetArcology.FSSlimnessEnthusiast += influence;
				} else if (targetArcologyInfo.fsActive('FSAssetExpansionist')) {
					r.push(`${He} challenges Asset Expansionism there by showing ${his} appreciation for lithe, graceful`);
					if (slave.boobs < 500 && slave.butt < 3) {
						r.push(`partners, and by being a lissome waif ${himself}.`);
						targetArcology.FSAssetExpansionist--;
					} else {
						r.push(`partners.`);
					}
					targetArcology.FSAssetExpansionist -= influence;
				}
			} else if (arcologyInfo.fsActive('FSAssetExpansionist')) {
				if (targetArcologyInfo.fsActive('FSAssetExpansionist')) {
					r.push(`${He} advances Asset Expansionism there by showing ${his} appreciation for partners with healthy helpings of tits and`);
					if (slave.butt > 4 && slave.boobs > 800) {
						r.push(`ass, and by being deliciously stacked ${himself}.`);
						targetArcology.FSAssetExpansionist++;
					} else {
						r.push(`ass.`);
					}
					targetArcology.FSAssetExpansionist += influence;
				} else if (targetArcologyInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`${He} challenges Slimness Enthusiasm there by showing ${his} appreciation for partners with healthy helpings of tits and`);
					if (slave.butt > 4 && slave.boobs > 800) {
						r.push(`ass, and by being deliciously stacked ${himself}.`);
						targetArcology.FSSlimnessEnthusiast--;
					} else {
						r.push(`ass.`);
					}
					targetArcology.FSSlimnessEnthusiast -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSPastoralist')) {
				if (targetArcologyInfo.fsActive('FSPastoralist')) {
					r.push(`${He} advances Pastoralism there by drinking a lot of milk, as lasciviously as`);
					if (slave.lactation) {
						r.push(`possible, and by not milking ${himself} at all, thereby causing ${his} tits to jet cream during intercourse, while ${he} moves, or for no reason at all.`);
						targetArcology.FSPastoralist++;
					} else {
						r.push(`possible.`);
					}
					targetArcology.FSPastoralist += influence;
				} else if (targetArcologyInfo.fsActive('FSCummunism')) {
					r.push(`${He} challenges Cummunism there by drinking a lot of milk, as lasciviously as`);
					if (slave.lactation) {
						r.push(`possible, and by not milking ${himself} at all, thereby causing ${his} tits to jet cream during intercourse, while ${he} moves, or for no reason at all.`);
						targetArcology.FSCummunism--;
					} else {
						r.push(`possible.`);
					}
					targetArcology.FSCummunism -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
				if (targetArcologyInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`${He} advances Physical Idealism there by working out in`);
					if (slave.muscles >= 50 && arcology.FSPhysicalIdealistLaw === 0) {
						r.push(`public, having physically challenging sex in public, and improving ${his} already impressive musculature in a publicly documented journey of self-improvement.`);
						targetArcology.FSPhysicalIdealist++;
					} else if (slave.muscles >= 20 && slave.muscles < 50 && arcology.FSPhysicalIdealistLaw === 1) {
						r.push(`public, having physically exhausting sex marathons in public, and improving ${his} already impressive stamina in a publicly documented journey of self-improvement.`);
						targetArcology.FSPhysicalIdealist++;
					} else {
						r.push(`public and having physically`);
						if (arcology.FSPhysicalIdealistLaw === 1) {
							r.push(`exhausting`);
						} else {
							r.push(`challenging`);
						}
						r.push(`sex in public.`);
					}
					targetArcology.FSPhysicalIdealist += influence;
				} else if (targetArcologyInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`${He} challenges Hedonistic Decadence there by working out in`);
					if (slave.muscles >= 50 && arcology.FSPhysicalIdealistLaw === 0) {
						r.push(`public, having physically challenging sex in public, and improving ${his} already impressive musculature in a publicly documented journey of self-improvement.`);
						targetArcology.FSHedonisticDecadence--;
					} else if (slave.muscles >= 20 && slave.muscles < 50 && arcology.FSPhysicalIdealistLaw === 1) {
						r.push(`public, having physically exhausting sex marathons in public, and improving ${his} already impressive stamina in a publicly documented journey of self-improvement.`);
						targetArcology.FSHedonisticDecadence--;
					} else {
						r.push(`public and having physically`);
						if (arcology.FSPhysicalIdealistLaw === 1) {
							r.push(`exhausting`);
						} else {
							r.push(`challenging`);
						}
						r.push(`sex in public.`);
					}
					targetArcology.FSHedonisticDecadence -= influence;
				}
			} else if (arcologyInfo.fsActive('FSHedonisticDecadence')) {
				if (targetArcologyInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`${He} advances Hedonistic Decadence there by stuffing ${his} face at all times, having one hand down ${his} pants, and inviting anyone near ${him} for a quick fuck whenever the mood strikes ${him}.`);
					if (App.Data.misc.paraphiliaList.includes(slave.sexualFlaw)) {
						r.push(`${He} wears ${his} sexual paraphilia proudly and makes sure everyone knows what ${he} likes and how ${he} likes it.`);
						targetArcology.FSHedonisticDecadence++;
					}
					targetArcology.FSHedonisticDecadence += influence;
				} else if (targetArcologyInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`${He} challenges Physical Idealism there by stuffing ${his} face at all times, having one hand down ${his} pants, and inviting anyone near ${him} for a quick fuck whenever the mood strikes ${him}.`);
					if (App.Data.misc.paraphiliaList.includes(slave.sexualFlaw)) {
						r.push(`${He} wears ${his} sexual paraphilia proudly and make sure everyone knows what ${he} likes and how ${he} likes it.`);
						targetArcology.FSPhysicalIdealist--;
					}
					targetArcology.FSPhysicalIdealist -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSRepopulationFocus')) {
				if (targetArcologyInfo.fsActive('FSRepopulationFocus')) {
					r.push(`${He} advances Repopulationism there by showing ${his} appreciation for partners with fecund`);
					if (slave.belly >= 10000) {
						r.push(`figures, and by`);
						if (slave.bellyPreg >= 8000) {
							r.push(`being heavily pregnant ${himself}.`);
						} else {
							r.push(`proudly cradling ${his} greatly distended middle.`);
						}
						targetArcology.FSRepopulationFocus++;
					} else {
						r.push(`figures.`);
					}
					targetArcology.FSRepopulationFocus += influence;
				} else if (targetArcologyInfo.fsActive('FSRestart')) {
					r.push(`${He} challenges Eugenics there by showing ${his} appreciation for partners with fecund figures, specifically those lacking the approval of`);
					if (slave.belly >= 10000) {
						r.push(`society, and by`);
						if (slave.bellyPreg >= 8000) {
							r.push(`proudly displaying ${his} markless pregnancy.`);
						} else {
							r.push(`proudly cradling ${his} greatly distended, markless, middle.`);
						}
						targetArcology.FSRestart--;
					} else {
						r.push(`society.`);
					}
					targetArcology.FSRestart -= influence;
				}
			} else if (arcologyInfo.fsActive('FSRestart')) {
				if (targetArcologyInfo.fsActive('FSRestart')) {
					r.push(`${He} advances Eugenics there by congratulating high class couples while completely ignoring everyone`);
					if (slave.belly < 1500 && !canGetPregnant(slave)) {
						r.push(`else, and by showing off ${his} baby-free`);
						if (slave.pregKnown === 1) {
							r.push(`body (even though ${he}'s hiding ${his} own pregnancy).`);
						} else {
							r.push(`body.`);
						}
						targetArcology.FSRestart++;
					} else {
						r.push(`else.`);
					}
					targetArcology.FSRestart += influence;
				} else if (targetArcologyInfo.fsActive('FSRepopulationFocus')) {
					r.push(`${He} challenges Repopulationism there by harshly judging every gravid girl ${he} sees while showering praise on the high`);
					if (slave.belly < 1500 && !canGetPregnant(slave)) {
						r.push(`class, and by showing off ${his} baby-free`);
						if (slave.pregKnown === 1) {
							r.push(`body (even though ${he}'s hiding ${his} own pregnancy).`);
						} else {
							r.push(`body.`);
						}
						targetArcology.FSRepopulationFocus--;
					} else {
						r.push(`class.`);
					}
					targetArcology.FSRepopulationFocus -= influence;
				}
			}
			if (arcologyInfo.fsActive('FSChattelReligionist')) {
				if (targetArcologyInfo.fsActive('FSChattelReligionist')) {
					r.push(`${He} advances Chattel Religionism there by constant public worship, both sexual and`);
					if (slave.devotion > 95 && totalInt > 95) {
						r.push(`traditional, and by composing ${his} own series of devotionals to your sexual prowess and attractiveness.`);
						targetArcology.FSChattelReligionist++;
					} else {
						r.push(`traditional.`);
					}
					targetArcology.FSChattelReligionist += influence;
				}
			}
			if (arcologyInfo.fsActive('FSRomanRevivalist')) {
				if (targetArcologyInfo.fsActive('FSRomanRevivalist')) {
					r.push(`${He} advances Roman Revivalism there by taking an active part in the daily round of public Roman`);
					if (canTalk(slave) && totalInt > 95) {
						r.push(`life, which ${he}'s perfect for, since ${he} has the intelligence to hold ${his} own in discourse with citizens.`);
						targetArcology.FSRomanRevivalist++;
					} else {
						r.push(`life.`);
					}
					targetArcology.FSRomanRevivalist += influence;
				}
			} else if (arcologyInfo.fsActive('FSNeoImperialist')) {
				if (targetArcologyInfo.fsActive('FSNeoImperialist')) {
					r.push(`${He} advances Neo-Imperialism there by measuring out grace and allure with the arcology's`);
					if (canTalk(slave) && totalInt > 95) {
						r.push(`elites, elegantly convincing them with ${his} cutting wit on the favorite topic of any wealthy patrician - their own societal importance.`);
						targetArcology.FSNeoImperialist++;
					} else {
						r.push(`elites.`);
					}
					targetArcology.FSNeoImperialist += influence;
				}
			} else if (arcologyInfo.fsActive('FSAztecRevivalist')) {
				if (targetArcologyInfo.fsActive('FSAztecRevivalist')) {
					r.push(`${He} advances Aztec Revivalism there by taking an active part in the bloodier`);
					if (slave.skill.combat > 60) {
						r.push(`spectacles, which ${he}'s perfect for, since ${he} has enough experience with blood to make it look good.`);
						targetArcology.FSAztecRevivalist++;
					} else {
						r.push(`spectacles.`);
					}
					targetArcology.FSAztecRevivalist += influence;
				}
			} else if (arcologyInfo.fsActive('FSEgyptianRevivalist')) {
				if (targetArcologyInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`${He} advances Egyptian Revivalism there by playing ${his} part in the endless round of voluptuous`);
					if (App.Utils.hasFamilySex(slave)) {
						r.push(`entertainments, which ${he}'s perfect for, since everyone knows that at the end of the day ${he}'ll go home and make love to a blood relative.`);
						targetArcology.FSEgyptianRevivalist++;
					} else {
						r.push(`entertainments.`);
					}
					targetArcology.FSEgyptianRevivalist += influence;
				}
			} else if (arcologyInfo.fsActive('FSEdoRevivalist')) {
				if (targetArcologyInfo.fsActive('FSEdoRevivalist')) {
					r.push(`${He} advances Edo Revivalism there by artfully mixing sexual allure and elegant`);
					if (slave.skill.entertainment > 95) {
						r.push(`propriety, which ${he}'s perfect for, since no slave can claim to better entertain a gentleman caller than ${him}.`);
						targetArcology.FSEdoRevivalist++;
					} else {
						r.push(`propriety.`);
					}
					targetArcology.FSEdoRevivalist += influence;
				}
			} else if (arcologyInfo.fsActive('FSArabianRevivalist')) {
				if (targetArcologyInfo.fsActive('FSArabianRevivalist')) {
					r.push(`${He} advances Arabian Revivalism there by helping citizens improve their slaves' sex`);
					if (slave.fetishKnown && (slave.fetish === Fetish.SADIST || slave.fetish === Fetish.DOM)) {
						r.push(`skills, which ${he}'s perfect for, since ${he}'s naturally dominant and likes nothing better than fucking ${his} inferiors.`);
						targetArcology.FSArabianRevivalist++;
					} else {
						r.push(`skills.`);
					}
					targetArcology.FSArabianRevivalist += influence;
				}
			} else if (arcologyInfo.fsActive('FSChineseRevivalist')) {
				if (targetArcologyInfo.fsActive('FSChineseRevivalist')) {
					r.push(`${He} advances Chinese Revivalism there by helping citizens improve the feng shui of their slave`);
					if (totalInt > 110) {
						r.push(`arrangements, which ${he}'s perfect for, since ${he} has the intelligence and education to make real contributions.`);
						targetArcology.FSChineseRevivalist++;
					} else {
						r.push(`arrangements.`);
					}
					targetArcology.FSChineseRevivalist += influence;
				}
			} else if (arcologyInfo.fsActive('FSAntebellumRevivalist')) {
				if (targetArcologyInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`${He} advances Antebellum Revivalism there by helping citizens make their slaves more convivial and entertaining,`);
					if (slave.skill.entertainment > 95) {
						r.push(`which ${he}'s perfect for, since ${he} is quite the entertainer ${himself}.`);
						targetArcology.FSAntebellumRevivalist++;
					} else if (slave.behavioralQuirk === BehavioralQuirk.FUNNY) {
						r.push(`which ${he}'s perfect for, since ${he} has a good sense of humor.`);
						targetArcology.FSAntebellumRevivalist++;
					} else {
						r.push(`but ${his} performance does leave something to be desired.`);
					}
					targetArcology.FSAntebellumRevivalist += influence;
				}
			}
		} else {
			r.push(`assigned to be a sexual Ambassador to other arcologies, but you have not targeted a neighboring arcology for cultural influence, making the assignment pointless.`);
			if (V.oldRecruiterTarget) {
				V.recruiterTarget = clone(V.oldRecruiterTarget);
				r.push(`<span class="yellow">${He} goes back to recruiting ${V.recruiterTarget}.</span>`);
				delete V.oldRecruiterTarget;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function recruiting(slave) {
		let progress = random(0, 1);

		r.push(`uses your online resources and some <span class="cash">modest funds</span> to convince ${V.recruiterTarget} from the old world to immigrate for voluntary enslavement.`);

		if (V.recruiterIOUs > 0) {
			progress += V.recruiterIOUs;
			V.recruiterIOUs = 0;
		}

		if (slave.devotion > 95) {
			r.push(`${His} extreme devotion to you lends ${him} total cogency.`);
			progress += 2;
		} else if (slave.devotion > 50) {
			r.push(`${His} devotion to you lends ${him} conviction.`);
			progress += 1;
		} else {
			r.push(`${His} imperfect feelings toward you give ${him} little conviction.`);
		}

		if (App.Data.Careers.Leader.recruiter.includes(slave.career)) {
			r.push(`${He} has experience in recruitment from before ${he} was a slave.`);
			progress += 2;
		} else if (slave.skill.recruiter >= Constant.MASTERED_XP) {
			r.push(`${He} has experience in recruitment from working for you.`);
			progress += 2;
		} else if (slave.skill.recruiter > 120) {
			r.push(`${He} has enough experience in recruitment to begin applying it.`);
			progress += 1;
		}
		if (slave.skill.recruiter < Constant.MASTERED_XP) {
			const skillIncrease = random(1, Math.ceil((totalInt) / 15) + 8);
			r.push(slaveSkillIncrease('recruiter', slave, skillIncrease));
		}

		if (totalInt > 50) {
			r.push(`${His} intelligence enables ${him} to cleverly entrap potential slaves.`);
			progress += 1;
		}

		if (slave.skill.entertainment >= 100) {
			r.push(`${He} has the entertainment skills necessary to convince any target.`);
			progress += 2;
		} else if (slave.skill.entertainment > 60) {
			r.push(`${He} has the entertainment expertise to lure in most targets.`);
			progress += 1.5;
		} else if (slave.skill.entertainment > 30) {
			r.push(`${He} has the necessary entertainment skills to banter successfully with ${his} targets.`);
			progress += 1;
		} else if (slave.skill.entertainment > 10) {
			r.push(`${His} mediocre entertainment skills do nothing to convince ${his} targets.`);
		} else {
			r.push(`${His} total lack of entertainment skills seriously hinders ${his} efforts.`);
			progress -= 1;
		}

		if (slave.bellyPreg >= 300000) {
			r.push(`${His} massive overfilled womb is detrimental to ${his} efforts to recruit slaves. It instills a fear of being turned into nothing more than a baby-filled sack.`);
			progress -= 3;
		}

		const clubSlaves = App.Utils.sortedEmployees(App.Entity.facilities.club);
		if (V.clubUpgradePDAs === 1 && clubSlaves.length > 0) {
			r.push(`The slaves in ${V.clubName} help ${him} by passing ${him} tips they pick up while working the crowds.`);
			clubSlaves.forEach(() => progress += 0.5);
		}

		if (V.recruiterTarget === "desperate whores") {
			if (S.Recruiter.counter.publicUse > 200) {
				r.push(`As a veteran slut, ${he} speaks from experience when ${he} says that being your slave whore will be safer and healthier than streetwalking.`);
				progress += 1;
			} else {
				r.push(`${He} does ${his} best to convince them that being your slave whore will be safer and healthier than streetwalking.`);
			}
		} else if (V.recruiterTarget === "expectant mothers") { // now you can ginger too
			if ((S.Recruiter.belly >= 1500 || App.Data.misc.fakeBellies.includes(S.Recruiter.bellyAccessory) && S.Recruiter.weight < 130) || S.Recruiter.belly >= 100000) {
				if (S.Recruiter.preg > S.Recruiter.pregData.normalBirth / 8) {
					r.push(`Since ${he}'s visibly pregnant ${himself}, ${he} speaks with authority when ${he} says that Free Cities medicine can keep them and their pregnancies safe and healthy.`);
				} else {
					r.push(`Since ${he} looks visibly pregnant, ${he}'s more convincing when ${he} says that Free Cities medicine can keep them and their pregnancies safe and healthy.`);
				}
				progress += 1;
			} else {
				r.push(`${He} does ${his} best to convince them that Free Cities medicine can keep them and their pregnancies safe and healthy.`);
			}
		} else if (V.recruiterTarget === "young migrants") {
			if (S.Recruiter.health.condition >= 80 && S.Recruiter.face > 10) {
				r.push(`${His} lovely face and shining health go a long way to convince them that being your slave promises a better life.`);
				progress += 1;
			} else {
				r.push(`${He} does ${his} best to convince them that being your slave promises a better life.`);
			}
		} else if (V.recruiterTarget === "dissolute sissies") {
			if (S.Recruiter.dick > 1 && canAchieveErection(S.Recruiter) && !S.Recruiter.chastityPenis) {
				r.push(`${He} giggles and shows off ${his} erection, making it easy to convince them that your slaves with dicks enjoy a sexually satisfying life.`);
				progress += 1;
			} else {
				r.push(`${He} does ${his} best to convince them that your slaves with dicks enjoy a sexually satisfying life.`);
			}
		} else if (V.recruiterTarget === "reassignment candidates") {
			if (((S.Recruiter.balls > 0 && S.Recruiter.ovaries === 0 && S.Recruiter.genes === GenderGenes.FEMALE) || (S.Recruiter.ovaries === 1 && S.Recruiter.scrotum === 0 && S.Recruiter.genes === GenderGenes.MALE)) && S.Recruiter.face > 10) { // turn into appearance checks!
				r.push(`${He} shows off ${his} lovely face and describes ${his} unusual biological situation under your care, convincing them that you'll turn them into happy little slave girls.`);
				progress += 1;
			} else {
				r.push(`${He} does ${his} best to convince them that you'll turn them into happy little slave girls.`);
			}
		} else if (V.recruiterTarget === "recent divorcees") {
			if (S.Recruiter.devotion + S.Recruiter.trust >= 175) {
				r.push(`${His} total dedication to you goes a long way in convincing them that you'll provide far more for them than their prior partners ever did.`);
				progress += 1;
			} else {
				r.push(`${He} does ${his} best to convince them that you'll be supportive.`);
			}
		}

		if (slave.rules.living !== "luxurious") {
			r.push(`${He} would be more effective if ${he} could show off a luxurious standard of living.`);
			progress -= 1;
		}

		const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(slave);
		progress *= pMod;
		if (pMod < 1) {
			const loss = Math.floor((1 - pMod) * 100);
			r.push(`Due to ${his} part-time job, ${he} is ${loss}% less effective.`);
		}
		V.recruiterProgress += progress;

		if (V.recruiterProgress > 7) {
			r.push(`${He} has several excellent prospects and will probably get one of them to agree to enslavement soon.`);
		} else if (V.recruiterProgress > 3) {
			r.push(`${He} has some prospects to work with but needs more time to get them agree to enslavement.`);
		} else {
			r.push(`${He} has no real prospects yet and has more work to do before anyone agrees to enslavement.`);
		}

		if (slave.rules.living === "luxurious") {
			r.push(`Being continually trusted with this position <span class="devotion inc">increases ${his} devotion to you</span> and encourages ${him} to <span class="trust inc">trust you in turn.</span>`);
			slave.devotion += 4;
			slave.trust += 4;
		} else {
			r.push(`Being continually trusted with this position <span class="devotion inc">slightly increases ${his} devotion to you,</span> though ${he} harbors some doubts because ${he} isn't allowed a room of ${his} own to set ${him} apart from the other slaves.`);
			slave.devotion += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function idlePublicity(slave) {
		// submitted by FireDrops

		let FSmatch = 0; // FSmatch means recruiter's appearance displays FS ideas
		let FSdefend = 0; // FSdefend is intelligence-based advocation for your FS
		const FSIntMod = Math.floor(totalInt / 32);
		let seed = 0;
		const modScore = SlaveStatsChecker.modScore(slave);

		r.push(`tries to maintain ${his} network of prospects without promising anyone a space in ${arcology.name}, since you already control`);
		if (V.slaves.length > idleTarget) {
			r.push(`more sex slaves than`);
		} else {
			r.push(`as many sex slaves as`);
		}
		r.push(`${his} assigned goal.`);

		seed -= (6 - (6 * slave.skill.entertainment / 100));
		seed -= (3 - (3 * slave.face / 100));
		if (totalInt < -15) {
			seed = Math.min(seed, totalInt / 10);
		}
		if (seed < 0) {
			// catches overload from very high entertainment
			V.recruiterProgress += seed / 10;
		}
		V.recruiterProgress = Math.max(V.recruiterProgress, 0);

		if (totalInt > 15) {
			if (slave.skill.entertainment >= 100) {
				r.push(`${His} mastery of flirting and conversation continues to seduce them,`);
				if (slave.face > 95) {
					r.push(`and with ${his} nearly perfect face they instinctively trust ${him}.`);
				} else {
					r.push(`although ${he} might have done better still if ${he} were prettier.`);
				}
			} else {
				r.push(`${He} uses what conversation skill ${he} has to keep them interested in enslavement,`);
				if (slave.face > 40) {
					r.push(`and the reminder that they could share a home with such a beauty doesn't hurt.`);
				} else {
					r.push(`but ${his} face isn't attractive enough to hold their attention.`);
				}
			}
		} else {
			r.push(`Unfortunately ${he}'s just not smart enough to manage such a delicate balance and some potential slaves inevitably drift away.`);
		}

		r.push(`${He} uses ${his} extra time and <span class="cash">recruitment allowance</span> this week to tour the arcology and post to your household's social media accounts more actively than usual, <span class="reputation inc">building up your reputation.</span>`);

		/**
		 * Conditional push:
		 * if V.showEWM is set, is a function that pushes the arguments into r
		 * otherwise is a function that just silently consumes the arguments
		 * @type {function(...string): void}
		 */
		const pushEWM = V.showEWM === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID)) ? (...str) => r.push(...str) : () => {};

		seed = 10;
		if (slave.skill.entertainment > 10) {
			if (slave.face > 40) {
				if (slave.skill.entertainment >= 100) {
					pushEWM(`${His} good looks and innate artistry awe the arcology and leave many starstruck.`);
				} else if (slave.skill.entertainment > 60) {
					pushEWM(`${His} good looks draw quite an audience; ${he} entertains them reasonably well.`);
				} else if (slave.skill.entertainment > 30) {
					pushEWM(`${His} face appeals to a certain crowd, mostly looking for sex tapes rather than quality entertainment.`);
				}
				seed += slave.face * slave.skill.entertainment / 30;
			} else {
				if (slave.skill.entertainment >= 100) {
					pushEWM(`All`);
				} else if (slave.skill.entertainment > 60) {
					pushEWM(`Many`);
				} else if (slave.skill.entertainment > 30) {
					pushEWM(`Some`);
				} else {
					pushEWM(`A few`);
				}
				pushEWM(`of ${his} wittier lines are liked and re-shared, but ${his} face just doesn't catch many eyes.`);
				seed += slave.skill.entertainment / 30;
			}
		} else {
			pushEWM(`More than a few sign up to watch ${his} feeds, but unsubscribe due to ${his} amateur presentation.`);
		}
		if (totalInt > 15) {
			pushEWM(`${He} offers thoughtful commentaries on trending topics.`);
			seed += FSIntMod;
		} else {
			pushEWM(`${He} lacks the intelligence to compose thoughtful remarks; a lot the time ${he} merely +1s what others have said.`);
		}
		if (V.studio && slave.porn.viewerCount >= 10000 && slave.porn.prestige > 0) {
			pushEWM(`${His} fan base from arcology porn significantly drives up ${his} followers count.`);
			seed += slave.porn.prestige * 3;
		}

		/** @type {string[]} */
		const FSstrings = [];

		/** Conditional push for FS match strings (which will get concatenated to r AFTER the FS match/defend summary)
		 * @type {function(...string): void}
		 */
		const pushFS = V.showEWM === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID)) ? (...str) => FSstrings.push(...str) : () => {};

		if (V.recruiterIOUs > 0) {
			seed += V.recruiterIOUs;
			FSdefend += V.recruiterIOUs;
			V.recruiterIOUs = 0;
		}

		if (arcologyInfo.fsActive('FSSupremacist')) {
			if (totalInt > 50) {
				seed += 2;
				FSdefend++;
				arcology.FSSupremacist += 0.01 * V.FSSingleSlaveRep * FSIntMod;
				if (slave.race !== arcology.FSSupremacistRace) {
					pushFS(`${He} patiently explains how ${slave.race} ${girl}s like ${himself} benefit from the firm guidance of their proper ${arcology.FSSupremacistRace} masters.`);
					arcology.FSSupremacist += 0.01 * V.FSSingleSlaveRep;
				} else {
					pushFS(`${He} makes the clear case for ${arcology.FSSupremacistRace} superiority, although as an enslaved ${slave.race} ${woman} ${his} words are a bit hollow.`);
				}
			} else if (slave.race !== arcology.FSSupremacistRace) {
				pushFS(`The dumb ${slave.race} bitch can't even repeat ${his} Supremacist indoctrination properly.`);
			} else {
				pushFS(`${He} flubs ${his} lines so badly that no one would ever believe ${arcology.FSSupremacistRace} people make better leaders.`);
			}
		}
		if (arcologyInfo.fsActive('FSSubjugationist')) {
			if (totalInt > 50) {
				seed += 2;
				FSdefend++;
				arcology.FSSubjugationist += 0.01 * V.FSSingleSlaveRep * FSIntMod;
				if (slave.race === arcology.FSSubjugationistRace) {
					pushFS(`It's always a pleasure to hear ${addA(slave.race)} slave admit to all the failings for which ${his} kind need to be taken in hand.`);
					arcology.FSSubjugationist += 0.01 * V.FSSingleSlaveRep;
				}
			} else if (slave.race !== arcology.FSSupremacistRace) {
				pushFS(`The dumb ${slave.race} bitch can't even repeat ${his} Supremacist indoctrination properly.`);
			} else {
				pushFS(`${He} flubs ${his} lines so badly that no one would ever believe ${arcology.FSSupremacistRace} people make better leaders.`);
			}
		}
		if (arcologyInfo.fsActive('FSGenderRadicalist')) {
			if (slave.dick > 0 && (slave.balls < 1 || slave.boobs > 400)) {
				if (slave.anus > 0 && canDoAnal(slave)) {
					pushFS(`${His} public demonstrations of just how hard feminized sissies can orgasm with buttsex — at a different interior balcony each day — draw plenty of attention.`);
					seed += 4;
				} else {
					pushFS(`${He} attracts a little attention by gaily showing off ${his}`);
					if (slave.balls < 1) {
						pushFS(`soft bitch-clit`);
					} else {
						pushFS(`intersex anatomy`);
					}
					pushFS(`on the public thoroughfares of your arcology,`);
					if (!canDoAnal(slave)) {
						pushFS(`since ${he} can't take it any further.`);
					} else {
						pushFS(`being careful not to risk ${his} virgin backdoor.`);
					}
					seed += 1;
				}
				FSmatch++;
				arcology.FSGenderRadicalist += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`${He} just doesn't have the right combination of body parts to personally demonstrate your utopia of eager, girly-dicked buttsluts.`);
			}
		} else if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
			if (slave.balls < 1 && slave.dick < 1 && slave.vagina >= 0) {
				if (arcologyInfo.fsActive('FSRestart')) {
					pushFS(`${He} posts plenty of seductive photos emphasizing ${his} feminine curves, including lewds showing off ${his} natural vagina, bringing more attention to your campaign for natural females.`);
					seed += 1;
				} else if (slave.bellyPreg >= 1500 || App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
					if (slave.bellyPreg >= 1500) {
						pushFS(`${He} unashamedly live streams an obstetric health check in the nude, promising to broadcast similar footage right up until, and during, the birth.`);
						seed += 4;
					} else {
						pushFS(`With some discreet editing, ${he} uploads fake ultrasounds to match ${his} plastic pregnancy, bringing a little more attention to your fertility campaigns.`);
						seed += 1;
					}
				} else if (slave.vagina >= 0) {
					pushFS(`${He} posts plenty of seductive photos emphasizing ${his} feminine curves, including lewds showing off ${his} natural vagina, bringing more attention to your campaign for natural females.`);
				}
				FSmatch++;
				arcology.FSGenderFundamentalist += 0.01 * V.FSSingleSlaveRep;
			} else if (slave.balls < 1 && slave.dick < 1) { // null - no vagina and also no dick or balls
				pushFS(`${He} tries to post photos emphasizing ${his} feminine curves, although ${his} attempts to tastefully conceal ${his} lack of female genitalia are noticed by some viewers.`);
			} else { // masculine - has dick or balls
				pushFS(`On the topic of natural female deference to their owners around the house, your recruiter would be more convincing if ${he} didn't keep readjusting ${his} junk.`);
			}
		}
		if (arcologyInfo.fsActive('FSPaternalist')) {
			if (slave.devotion + slave.trust > 150 || slave.relationship === -3) {
				if (slave.intelligenceImplant >= 15) {
					pushFS(`All week ${he} shares original poetry in which ${his} love for you shines `);
					if (slave.health.condition > 40) {
						pushFS(`through, and ${his} healthy body shines in every live appearance.`);
						seed += 1;
					} else {
						pushFS(`through.`);
					}
					seed += 1;
					arcology.FSPaternalist += 0.02 * V.FSSingleSlaveRep;
				} else {
					pushFS(`Even though ${he} clearly adores ${his} ${getWrittenTitle(slave)},`);
					if (slave.health.condition > 40) {
						pushFS(`with ${his} perfect health visibly manifesting your care,`);
						seed += 1;
					}
					pushFS(`the uneducated slave struggles to fully and cogently express ${his} affection.`);
					arcology.FSPaternalist += 0.01 * V.FSSingleSlaveRep;
				}
				seed += 1;
				FSdefend++;
			} else {
				pushFS(`${His} praise of your good works lacks the special touch of personal affection, so it doesn't impress much.`);
			}
		} else if (arcologyInfo.fsActive('FSDegradationist')) {
			if (totalInt > 50) {
				pushFS(`Ordinarily you would punish a slave who displays independent thinking, but when ${slave.slaveName}`);
				if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
					pushFS(`goes public in all ${his} garish, modded glory to defend the legal right of slaveowners to use their property however they please, ${he}'s earned a brief reprieve.`);
					seed += 1;
					FSmatch++;
					arcology.FSDegradationist += 0.01 * V.FSSingleSlaveRep;
				} else {
					pushFS(`defends the right of owners to use their property however they please, ${he}'s earned some consideration: perhaps you could "reward" ${him} with an extra piercing or a slutty new tat.`);
				}
				seed += 1;
				FSdefend++;
				arcology.FSDegradationist += 0.01 * V.FSSingleSlaveRep * FSIntMod;
			} else {
				if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
					pushFS(`Just the sight of ${slave.slaveName}'s provocatively decorated body entices ${his} online "friends" to share multiple scenarios for raping ${him}, although the honor is wasted on the dumb fucktoy.`);
					seed += 1;
					FSmatch++;
					arcology.FSDegradationist += 0.01 * V.FSSingleSlaveRep;
				} else {
					pushFS(`${He} isn't smart enough to understand the primal attraction of an arcology where slave holes exist only to be raped, nor is ${his} body sufficiently degraded to advertise it.`);
				}
			}
		}
		if (arcologyInfo.fsActive('FSIntellectualDependency')) {
			if (arcology.FSIntellectualDependencyLawBeauty === 1 && bimboScore(slave) >= 6) {
				if (slave.energy > 95) {
					if (totalInt < -50) {
						pushFS(`${His} week was spent competing with other bimbos and generally being a delight to onlookers when the competition inevitably turns sexual.`);
						seed += 3;
					} else {
						pushFS(`This week's softcore photo shoot clearly showcases a bimbo, even if it feels like too much thought was put into it.`);
					}
					seed += 1;
					FSmatch++;
					arcology.FSIntellectualDependency += 0.01 * V.FSSingleSlaveRep;
				} else {
					pushFS(`While ${he} may look the part of a bimbo, ${he} lacks the sex drive to back it up.`);
				}
				seed += 1;
			} else if (slave.energy > 95) {
				if (totalInt < -50) {
					pushFS(`${His} week was spent wandering aimlessly throughout the arcology, delighting anyone able to spend time with ${him} with ${his} simple ways.`);
					seed += 3;
				} else {
					pushFS(`${He} exhibits raw lust, but lacks other traits commonly found in bimbos, hindering ${his} efforts.`);
				}
				seed += 1;
				FSmatch++;
				arcology.FSIntellectualDependency += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`${He} just lacks the energy to party all night long.`);
			}
		} else if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
			if (slave.accent <= 1) {
				if (totalInt > 50) {
					if (totalInt > 95) {
						if (slave.skill.entertainment + slave.skill.whoring + slave.skill.oral + slave.skill.anal + slave.skill.vaginal + slave.skill.penetrative >= 400) {
							pushFS(`Each week ${he} hosts ${his} own seminar demonstrating new and exciting sexual techniques, some even of ${his} own creation.`);
							seed += 1;
						} else {
							pushFS(`${He} uses ${his} brilliant mind to show what a slave is truly capable of, but ${he} can only go so far lacking practical skills.`);
						}
						seed += 2;
						FSdefend++;
						arcology.FSSlaveProfessionalism += 0.01 * V.FSSingleSlaveRep * FSIntMod;
					} else if (slave.skill.entertainment + slave.skill.whoring + slave.skill.oral + slave.skill.anal + slave.skill.vaginal + slave.skill.penetrative >= 400) {
						pushFS(`${He} participates in a weekly article showcasing skills every slave needs. However, only being able to recite learned information limits ${him}.`);
						seed += 1;
					} else {
						pushFS(`${He} attempts to be a sexual trendsetter, but is neither smart nor skilled enough to achieve anything of interest.`);
					}
					seed += 1;
					FSmatch++;
					arcology.FSSlaveProfessionalism += 0.01 * V.FSSingleSlaveRep;
				} else {
					pushFS(`${He} isn't smart enough to explain what a professional slave actually is and how it differs from a trained slave.`);
				}
			} else {
				pushFS(`${His} inability to speak ${V.language} properly makes ${him} a relatively poor spokes${woman} for trained slaves.`);
			}
		}
		if (arcologyInfo.fsActive('FSBodyPurist')) {
			if (slave.piercing.corset.weight === 0 && modScore.piercing < 3 && modScore.tat < 2) {
				if (slave.boobsImplant === 0 && slave.buttImplant === 0 && slave.waist >= -95) {
					pushFS(`${He} exhibits pure sexuality in a lovely, artistic gallery of erotic photos posted this week that displays every natural ${V.showInches === 2 ? `inch` : `centimeter`} of ${his} body.`);
				} else if (slave.boobsImplant === 0 && slave.buttImplant === 0) {
					pushFS(`This week's softcore photo shoot delights the eye: only ${his} unnatural waistline mars ${his} beauty, and that can hardly be blamed on the model.`);
				} else {
					pushFS(`${His} unblemished skin shines artistically in this week's erotic studio gallery, but the shape of ${his} curves is too obviously artificial.`);
				}
				if (slave.boobsImplant === 0) {
					seed += 1;
				}
				if (slave.buttImplant === 0) {
					seed += 1;
				}
				if (slave.waist >= -95) {
					seed += 1;
				}
				seed += 1;
				FSmatch++;
				arcology.FSBodyPurist += 0.01 * V.FSSingleSlaveRep;
			} else if (slave.boobsImplant === 0 && slave.buttImplant === 0 && slave.waist >= -95) {
				pushFS(`${His} most recent photo galleries are barely passable: you can hardly see the ${woman} beneath ${his} blatant body art.`);
			} else {
				pushFS(`${He} is burdened by the knowledge that ${his} heavy alterations don't fit your ideal of purity, and fails to show at a scheduled photo shoot.`);
			}
		} else if (arcologyInfo.fsActive('FSTransformationFetishist')) {
			if (slave.boobsImplant > 0 && slave.buttImplant > 0 && slave.lipsImplant > 0) {
				if (slave.waist < -95 || slave.teeth === "pointy" || slave.teeth === "fangs" || !hasAllNaturalLimbs(slave) || (slave.vagina > -1 && slave.dick > 6)) {
					pushFS(`A series of cleverly staged publicity events at various businesses in the arcology subtly focuses on ${his} better-than-natural physiology in each one.`);
					seed += 4;
				} else {
					if (V.seeExtreme === 1) {
						pushFS(`${His} augmented body certainly has its appeals, yet as you look over this week's publicity recap you begin to wonder if ${he} could be still more extremely <span style="italic">transformed<span>.`);
					} else if (slave.vagina > -1 && slave.dick > 0) {
						pushFS(`${His} special body stands out during this week's publicity tour; and if ${his} futa cock were grown beyond a natural size, now that would really advertise ${his} improved state.`);
					} else if (V.seeDicks > 0) {
						pushFS(`${He} looks great in this week's publicity events at arcology businesses, always posing to show off ${his} enhancements. Now if only there were something to graft on that would take ${him} beyond implants to genuine <span style="italic">transformation<span>.`);
					} else {
						// game settings prohibit greater transformations
						pushFS(`A series of cleverly staged publicity events at various businesses in the arcology subtly focuses on the beauty of ${his} implants.`);
					}
					seed += 2;
				}
				FSmatch++;
				arcology.FSTransformationFetishist += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`"Boobs, butts, and blowjobs": it's the plastic surgeon's mantra, and viewing this week's publicity footage reminds you that you've neglected your recruiter's augmentations.`);
			}
		}
		if (arcologyInfo.fsActive('FSYouthPreferentialist')) {
			if (slave.physicalAge < 30) {
				pushFS(`${His} nightly cam chats sparkle with the energy of youth.`);
				seed += 4;
				FSmatch++;
				arcology.FSYouthPreferentialist += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`As an older slave, ${he} doesn't have enough energy to cam chat late into the night.`);
			}
		} else if (arcologyInfo.fsActive('FSMaturityPreferentialist')) {
			if (slave.actualAge >= 30) {
				pushFS(`${He} video blogs regularly about the financial, medical, and even emotional security of slave life for older ${women}.`);
				seed += 4;
				FSmatch++;
				arcology.FSMaturityPreferentialist += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`${He} uses too much youthful slang and jumps from topic to topic in ${his} video blogs, making them difficult for ${his} audience to follow.`);
			}
		}
		if (arcologyInfo.fsActive('FSPetiteAdmiration')) {
			if (heightPass(slave)) {
				pushFS(`${He} takes advantage of ${his} short stature to shock and amaze ${his} followers by having sex in unusual places.`);
				seed += 4;
				FSmatch++;
				arcology.FSPetiteAdmiration += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`It's hard to play up a difference in height when ${he} stands as tall`);
				if (slave.height >= 185) {
					pushFS(`as, or taller than,`);
				}
				pushFS(`as most citizens.`);
			}
		} else if (arcologyInfo.fsActive('FSStatuesqueGlorification')) {
			if (heightPass(slave)) {
				pushFS(`${His} photoshoots all use a panoramic camera to better capture ${his} height while giving them a unique flare.`);
				seed += 4;
				FSmatch++;
				arcology.FSStatuesqueGlorification += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`${He}'s just too short for the public to pay any mind to.`);
			}
		}
		if (arcologyInfo.fsActive('FSRepopulationFocus')) {
			if (slave.preg > slave.pregData.normalBirth / 1.33) {
				pushFS(`${He} makes a habit of allowing the public to fondle and enjoy the movements within ${his} baby-filled belly.`);
				if (slave.pregType >= 30) {
					seed += 5;
				} else if (slave.pregType >= 10) {
					seed += 4;
				} else {
					seed += 3;
				}
				FSmatch++;
				arcology.FSRepopulationFocus += 0.01 * V.FSSingleSlaveRep;
			} else if (slave.preg > slave.pregData.normalBirth / 2) {
				pushFS(`${He} makes a habit of allowing the public to fondle and enjoy ${his} baby rounded belly.`);
				if (slave.pregType >= 30) {
					seed += 4;
				} else if (slave.pregType >= 10) {
					seed += 3;
				} else {
					seed += 2;
				}
				FSmatch++;
				arcology.FSRepopulationFocus += 0.01 * V.FSSingleSlaveRep;
			} else if (slave.counter.births > 0) {
				pushFS(`Any time ${he} stars in an erotic photo shoot, ${he} always makes sure to follow up with a, hopefully positive, pregnancy test - though ${he} makes sure to hype up ${his} viewers to sign up to be the one to knock ${him} up, should it come up negative.`);
				seed += 1;
				FSmatch++;
				arcology.FSRepopulationFocus += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`${His} efforts would have more impact if ${his} womb wasn't so empty. Disappointing to any who would want to see ${him} pregnant.`);
			}
			if (totalInt > 50) {
				pushFS(`${He} is smart enough to not only repeat your repopulationist goals, but to expand upon them.`);
				FSdefend++;
				arcology.FSRepopulationFocus += 0.01 * V.FSSingleSlaveRep;
			} else if (slave.counter.births > 3) {
				pushFS(`${He} uses ${his} experience as a mother as leverage to convince virgin ladies that motherhood is wonderful.`);
				FSdefend++;
				arcology.FSRepopulationFocus += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`Being both unintelligent and inexperienced, ${his} attempts to emphasize the joys of pregnancy only come off as someone who likes big bellies, no matter their cause.`);
			}
		} else if (arcologyInfo.fsActive('FSRestart')) {
			if (slave.bellyPreg >= 1500 && slave.breedingMark === 1 && V.propOutcome === 1) {
				pushFS(`${He} prominently displays ${his} pregnancy and the mark branded upon it signifying the superior child growing within ${him}. ${His} audience is enamored by ${his} distinct status.`);
				seed += 4;
				FSmatch++;
				arcology.FSRestart += 0.01 * V.FSSingleSlaveRep;
			} else if (slave.breedingMark === 1 && V.propOutcome === 1) {
				pushFS(`${He} prominently displays the mark branded over ${his} womb, but without the curve of pregnancy beneath it, it only goes so far.`);
				seed += 1;
			} else if (slave.bellyPreg < 100) {
				if (slave.dick > 0 && slave.balls === 0) {
					pushFS(`${He} makes sure to wear tight fitting clothes to show off the bulge of ${his} dick and, most notably, the lack of testicles under it, in all ${his} photo shoots.`);
					seed += 4;
					FSmatch++;
					arcology.FSRestart += 0.01 * V.FSSingleSlaveRep;
				} else if ((slave.ovaries === 0 && slave.mpreg === 0) || slave.preg < -1) {
					pushFS(`${He} frequently livestreams massive orgies involving ${himself} at the center, making sure to always follow up with ${his} negative pregnancy tests.`);
					seed += 2;
					FSmatch++;
					arcology.FSRestart += 0.01 * V.FSSingleSlaveRep;
				} else if (slave.chastityVagina || slave.chastityPenis) {
					pushFS(`In all ${his} public appearances, ${his} choice of clothing is always crotchless, leaving ${his} chastity gear as the only thing protecting ${his} modesty.`);
					seed += 1;
					FSmatch++;
					arcology.FSRestart += 0.01 * V.FSSingleSlaveRep;
				} else {
					pushFS(`${His} lack of commitment to sterilization and eugenics drive away potential listeners.`);
				}
			} else {
				pushFS(`No-one cares what bloated trash has to say.`);
			}
		}
		if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
			if (slave.boobs < 500 && slave.butt < 3 && slave.weight <= 10 && slave.muscles <= 30) {
				pushFS(`${His} trim body gives ${him} a cute, ${girl}-next-door sex appeal in every selfie, even the ones taken in your penthouse far above everyone else's doors.`);
				seed += 4;
				FSmatch++;
				arcology.FSSlimnessEnthusiast += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`${He} shares a lot of selfies of ${his} activities in your penthouse, but ${his} bulging figure tends to hide what's going on.`);
			}
		} else if (arcologyInfo.fsActive('FSAssetExpansionist')) {
			if (slave.boobs > 2000 || slave.butt > 7 || slave.balls > 4 || slave.dick > 8) {
				pushFS(`As the saying goes, "shake it if you got it," and no one can doubt ${slave.slaveName} has it after a "citizen" posts an "unauthorized" wristcam video of ${his} humongous anatomy swinging around a stripper pole.`);
				seed += 4;
				FSmatch++;
				arcology.FSAssetExpansionist += 0.01 * V.FSSingleSlaveRep;
			} else {
				pushFS(`Although ${he} tries hard, none of ${his} assets interest the true size fetishist.`);
			}
		}
		if (arcologyInfo.fsActive('FSPastoralist')) {
			if (V.dairy) {
				if (App.Entity.facilities.dairy.employeesIDs().size > 0 && FSIntMod > ((V.dairyRestraintsSetting + 1) * 30) && V.dairyRestraintsSetting < 2) {
					if (slave.lactation > 0) {
						pushFS(`${He} schedules VR tours of ${V.dairyName} in order to popularize your free-range practices and quality products: the highlight each time is when ${he} hooks ${his} own teats into a milker and brings ${himself} to orgasm.`);
						seed += 1;
						FSmatch++;
					} else {
						pushFS(`${He} narrates a virtual reality tour of ${V.dairyName}, explaining how your humane, free-range practices result in a high quality product.`);
					}
					seed += 3;
					FSdefend++;
					arcology.FSPastoralist += 0.01 * V.FSSingleSlaveRep;
				} else if (slave.lactation > 0) {
					pushFS(`${His} VR uploads include a short clip of ${him} milking ${himself} in ${V.dairyName}; ${he} squirts directly into an old-fashioned bucket while ignoring the complicated, industrial machines behind ${him}.`);
					seed += 1;
					FSmatch++;
				} else if (V.dairyRestraintsSetting >= 2) {
					pushFS(`Your dairy is too heavily industrialized to promote socially.`);
				} else {
					pushFS(`${He} ignores ${V.dairyName}, since ${he} can't think of any ideas to promote it.`);
				}
			} else {
				pushFS(`${He} can't really promote Pastoralist ideals when ${his} owner hasn't even committed to building a Dairy.`);
			}
		}
		if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
			let pass = false;
			if (slave.muscles >= 50 && arcology.FSPhysicalIdealistLaw === 0) {
				pushFS(`${He} asks another slave to photo-document ${his} time in the gym this week: naked, of course, to show off ${his} impressive muscle definition, and in certain poses ${he} nearly seems to be making love to the equipment.`);
				pass = true;
			} else if (slave.muscles >= 20 && slave.muscles < 50 && arcology.FSPhysicalIdealistLaw === 1) {
				pushFS(`${He} asks another slave to photo-document ${his} time on the track this week: naked, of course, to show off ${his} perfectly toned body in motion.`);
				pass = true;
			} else if (slave.muscles > 40 && slave.health.condition > 80) {
				pushFS(`${He} asks another slave to photo-document ${his} time in the gym this week: naked, of course, to show off how ${he} keeps in such fine shape, and in certain poses ${he} nearly seems to be making love to the equipment.`);
				pass = true;
			} else {
				pushFS(`${He} tries documenting ${his} exercise routine, but it's a snooze fest because ${he} doesn't have the guns to show for it.`);
			}
			if (pass) {
				seed += 4;
				FSmatch++;
				arcology.FSPhysicalIdealist += 0.01 * V.FSSingleSlaveRep;
			}
		} else if (arcologyInfo.fsActive('FSHedonisticDecadence')) {
			if (arcology.FSHedonisticDecadenceResearch === 1 && !arcologyInfo.fsActive('FSDegradationist')) {
				pushFS(`Whenever ${he} meets a prospect, ${he} makes sure to take some of your specialized slave food with ${him} to show them they won't miss much from their prior lives. It rarely fails to make an impact.`);
				seed += 2;
				FSmatch++;
			}
			if (slave.weight > 95 || (slave.fetishStrength >= 95 && slave.weight > 10)) {
				pushFS(`${He} frequently`);
				if (slave.fetishStrength >= 95) {
					pushFS(`makes public appearances where ${he} demonstrates the strength of ${his} fetishes and invites spectators to aid in satisfying ${his} desires.`);
				} else {
					pushFS(`livestreams ${himself} relaxing and masturbating, making sure to draw attention to ${his} lush curves and how comfortable ${his} life is.`);
				}
				seed += 2;
				FSmatch++;
				arcology.FSHedonisticDecadence += 0.01 * V.FSSingleSlaveRep;
			}
			if (slave.weight > 10 && slave.health.condition > 80) {
				pushFS(`Despite ${his} weight, ${he} practically oozes health and happiness helping to ease potential worries about the excessive lifestyle slaves enjoy under you.`);
				seed += 2;
				FSdefend++;
			}
		}
		const clothes = App.Data.clothes.get(slave.clothes);
		if (arcologyInfo.fsActive('FSChattelReligionist')) {
			if (totalInt > 15 && (slave.devotion > 95 || slave.trust > 95)) {
				if (arcology.FSChattelReligionistLaw2 !== 1) {
					if (ChattelReligionistClothingPass(slave.clothes)) {
						pushFS(`Clad in ${his} holy garb, ${slave.slaveName} preaches to the atrium with a powerful appeal to the new morality, in which ${his} absolute faith in your revelations is unmistakable.`);
						seed += 2;
					} else if (arcologyInfo.fsActive('FSNeoImperialist') && slave.clothes === "a tight Imperial bodysuit") {
						pushFS(`${He} lectures eloquently on the importance of hierarchy and noble lineage in a pseudo-religious fashion, dressed out in ${his} form-fitting bodysuit; most of the listeners' eyes fall on ${his} tightly-outlined chest and how ${his} nipples protrude obviously underneath the cybersuit, your crest emblazoned over the rock-hard nubs doing more of the arguing.`);
						seed += 1;
					} else if (arcologyInfo.fsActive('FSNeoImperialist') && slave.clothes === "Imperial Plate") {
						pushFS(`${He} gives a lengthy speech about the importance of hierarchy and noble lineage in a pseudo-religious fashion, speaking on the divine right of the nobility to rule while dominating the floor in ${his} ultra-heavy Imperial plate.`);
						seed += 1;
					} else if (arcologyInfo.fsActive('FSRomanRevivalist') && slave.clothes === "a toga") {
						pushFS(`${He} preaches in the atrium, delivering a powerful and faith-filled appeal in support of the new state religion and its Prophet-Emperor, descendant of the gods.`);
						seed += 1;
					} else {
						pushFS(`${He} heads to the atrium to deliver a powerful, faith-based appeal for everyone to join the new moral order, though one cynical onlooker heckles ${him} about ${his} style of dress.`);
					}
				} else {
					if (clothes.exposure > 3) {
						pushFS(`${He} preaches to the atrium clad in essentially nothing but what God gave him. ${His} absolute faith in your revelations is unmistakable, and ${he} wins many converts.`);
						seed += 2;
					} else if (ChattelReligionistClothingPass(slave.clothes)) {
						pushFS(`Clad in ${his} holy garb (which leaves ${him} attractively exposed), ${slave.slaveName} preaches to the atrium with a powerful appeal to the new morality, in which ${his} absolute faith in your revelations is unmistakable.`);
						seed += 1;
					} else {
						// no free pass for any other clothing if you're going the Holy Nudist route, sorry
						pushFS(`${He} heads to the atrium to deliver a powerful, faith-based appeal for everyone to join the new moral order, though ${he} draws chuckles from the crowd when ${he} argues for Holy Nudism while fully clothed.`);
					}
				}
				seed += 1;
				FSdefend++;
				arcology.FSChattelReligionist += 0.01 * V.FSSingleSlaveRep * FSIntMod;
			} else if (totalInt > 15) {
				pushFS(`${His} lecture on the new religious morality is thorough, and also devastatingly boring: all bullet point scriptures and little emotion that would sway unenlightened hearts.`);
			} else if (slave.devotion > 95 || slave.trust > 95) {
				pushFS(`Although ${he} wears ${his} faith in you on ${his} metaphorical sleeve, ${he} can't muster the intellectual arguments to counter the shrill voices of backward old world religions.`);
			} else {
				pushFS(`${He} is hapless as a proselytizer for the new religious order because ${his} personal understanding and adherence remains inadequate.`);
			}
		} else if (arcologyInfo.fsActive('FSNull')) {
			pushFS(`${His} contribution is one voice among many in the open freedom of ${arcology.name}'s media,`);
			if (slave.skill.entertainment > 10) {
				pushFS(`but everything that relates to its leadership is usually well-received.`);
			} else {
				pushFS(`so ${his} unskilled performances this week hardly cause a ripple.`);
			}
			seed += ((slave.skill.entertainment / 30) * arcology.FSNull / 10);
		}
		if (arcologyInfo.fsActive('FSRomanRevivalist')) {
			if (clothes.fs && clothes.fs.loves && clothes.fs.loves.has("FSRomanRevivalist")) {
				if (slave.face > 10 && slave.counter.pitKills > 0) {
					pushFS(`${He} thrills audiences by recounting tales of ${his} exploits as a beautiful and deadly gladiatrix-<span style="italic">slash</span>-love-slave for the First Citizen of the Eternal City reborn.`);
					// protip: it doesn't have to be YOUR pit
					seed += 5;
					FSmatch++;
					arcology.FSRomanRevivalist += 0.02 * V.FSSingleSlaveRep;
				} else if (slave.face > 10) {
					pushFS(`${His} statuesque beauty is a fitting tribute to the glory of the Eternal City reborn, but ${he} still lacks the edge of <span style="italic">bloodthirstiness</span> that makes life here so exciting.`);
				} else if (slave.counter.pitKills > 0) {
					pushFS(`Even though ${his} history of gladiatorial combat is noble, when mixed with ${his} homeliness it tends to frighten the squeamish as much as it attracts the sanguinary.`);
				} else {
					pushFS(`${He} comes across like a historical tour guide; more worthy citizens would flock to the New Rome if your recruiter appeared as a statuesque, and possibly deadly, inamorata of its ruler.`);
				}
				seed += 1;
			} else {
				pushFS(`Dressed as ${he} is in the garments of a barbarian, the citizens of the New Rome ignore ${him}.`);
			}
		} else if (arcologyInfo.fsActive('FSNeoImperialist')) {
			if (slave.clothes === "a tight Imperial bodysuit") {
				if (slave.face > 10 && slave.skill.entertainment >= 60) {
					pushFS(`${He} thrills the watching audience with ${his} immense beauty and charm, performing just as a proper Imperial slave ought - obedient, gorgeous, and strikingly attentive.`);
					seed += 5;
					FSmatch++;
					arcology.FSNeoImperialist += 0.02 * V.FSSingleSlaveRep;
				} else if (slave.face > 10) {
					pushFS(`${His} beauty captivates the watching audience, although ${he} is somewhat awkward and ungraceful when actually speaking with them.`);
				} else if (slave.skill.entertainment >= 60) {
					pushFS(`Even though ${he} acts as a perfect Imperial slave, attentive and obedient, ${his} comely features fail to attract much attention, superficial as it may be.`);
				} else {
					pushFS(`${He} comes across as both boring and unattractive; the emblazoned crest on ${his} chest seems more like a mark of mockery upon the stuttering, homely slave.`);
				}
				seed += 1;
			} else if (slave.clothes === "Imperial Plate") {
				if (slave.counter.pitKills > 0) {
					pushFS(`In ${his} ultra-heavy Imperial Plate, ${he} mystifies and captivates the audience with ${his} tales of victory and domination in the arena, coming across as an awe-inspiring and slightly terrifying properly Imperial Knight.`);
					seed += 5;
					FSmatch++;
					arcology.FSNeoImperialist += 0.02 * V.FSSingleSlaveRep;
				} else {
					pushFS(`The high-tech nature of ${his} Imperial Plate and its incredibly thick plating does more to scare off potential recruits than draw them in, particularly without any real tales of valor to tell to those who do stop to listen.`);
				}
				seed += 1;
			} else {
				pushFS(`Without clear markings to identify ${him} as an Imperial slave, ${his} attempts have little effect on the promotion of Imperial society.`);
			}
		} else if (arcologyInfo.fsActive('FSEgyptianRevivalist')) {
			if (totalRelatives(slave) > 0) {
				const recruiterRelation = randomRelatedAvailableSlave(slave);
				if (recruiterRelation) {
					const relationType = relativeTerm(slave, recruiterRelation);
					if (slave.energy > 60 || slave.sexualQuirk === SexualQuirk.TEASE || slave.sexualQuirk === SexualQuirk.PERVERT) {
						if (recruiterRelation.energy > 60 || recruiterRelation.sexualQuirk === SexualQuirk.TEASE || recruiterRelation.sexualQuirk === SexualQuirk.PERVERT) {
							pushFS(`${slave.slaveName} and ${his} ${relationType} ${recruiterRelation.slaveName} collaborate on a series of short commercials showing them `);
							if (canWalk(slave) || canWalk(recruiterRelation)) {
								pushFS(`walking and`);
							}
							pushFS(`playing in your arcology's public spaces. A little `);
							if (hasAnyArms(slave) || hasAnyArms(recruiterRelation)) {
								pushFS(`hand on the ass`);
							} else {
								pushFS(`cuddling`);
							}
							pushFS(`here, a little lips almost touching there, and it's enough to tease your Ancient Egyptian sensibility about incest without running afoul of too many old world censors.`);
							seed += 6;
							FSmatch++;
							arcology.FSEgyptianRevivalist += 0.02 * V.FSSingleSlaveRep;
						} else if (slave.relationshipTarget === recruiterRelation.ID) {
							pushFS(`Even though their incestuous relationship is not condemned here, ${his} ${relationType} ${recruiterRelation.slaveName} is too shy to act it out in front of the world.`);
						} else {
							pushFS(`The Ancient Egyptian sensibility of your arcology features slave incest, but your recruiter can't convince ${his} shy ${relationType} to play along for publicity.`);
						}
					} else if (slave.relationshipTarget === recruiterRelation.ID) {
						pushFS(`Even though ${he} shares a properly incestuous relationship with ${his} ${relationType}, ${he} is too shy to bring it on camera for the whole world.`);
					} else {
						pushFS(`The Ancient Egyptian sensibility of your arcology features slave incest, but ${he}'s too shy even to play-act with ${his} ${relationType} for publicity.`);
					}
				} else {
					pushFS(`One idea that comes up while brainstorming is to act out Ancient Egyptian incest with a family member, but all of them are confined and unavailable.`);
				}
			} else {
				pushFS(`One of the most prominent features of your Egyptian Revival is an open, even expectant, attitude toward slave incest, but ${he} doesn't have any close family living in your household.`);
			}
		} else if (arcologyInfo.fsActive('FSEdoRevivalist')) {
			if (V.clubDecoration !== "standard" && App.Entity.facilities.club.employeesIDs().size > 1) {
				if (getClubAdsBonus() >= 3) {
					pushFS(`The candid, POV-style videos of ${slave.slaveName} dancing, making out, and giving blowjobs alongside your regular sluts in ${V.clubName}'s ${V.clubDecoration} atmosphere earn a lot of thumbs up.`);
					seed += 6;
					FSmatch++;
					arcology.FSEdoRevivalist += 0.02 * V.FSSingleSlaveRep;
				} else {
					pushFS(`${He} enjoys ${himself} when ${he} films in ${V.clubName}, but the sluts there just don't earn enough attention for the visit to raise your public profile; the club may need broader marketing appeal.`);
				}
			} else if (V.club === 0) {
				pushFS(`${He}'d like to integrate ${his} personal profile with your cultural Revival, but there's no clear place in your arcology to focus ${his} attention.`);
			} else if (App.Entity.facilities.club.employeesIDs().size <= 1) {
				pushFS(`${He} travels down to ${V.clubName} for some POV video footage, but ${he} can't get enough reliable dance partners.`);
			} else {
				pushFS(`${He} gets some hot POV-style footage when ${he} films in your nightclub, but there's nothing special about its atmosphere to distinguish it from any other bar in any other arcology.`);
			}
		} else if (arcologyInfo.fsActive('FSArabianRevivalist')) {
			if (V.masterSuiteDecoration === "Arabian Revivalist" && V.masterSuiteUpgradeLuxury > 0 && App.Utils.masterSuiteAverages().energy > 60) {
				if (App.Entity.facilities.masterSuite.employeesIDs().size >= 3) {
					pushFS(`An exposé that "pulls back the curtain" on your elaborate master bedroom goes viral after several harem slaves drag ${him} into`);
					if (V.masterSuiteUpgradeLuxury === 1) {
						pushFS(`four-way action with their ${properMaster()}`);
					} else {
						pushFS(`a fuckpit daisy chain`);
					}
					pushFS(`and another takes over the filming.`);
					seed += 6;
					FSmatch++;
					arcology.FSArabianRevivalist += 0.02 * V.FSSingleSlaveRep;
				} else {
					pushFS(`${He} makes a short video essay about your elaborate master suite, but the empty space unfilled by luscious slave bodies fails to impress.`);
				}
			} else if (V.masterSuiteUpgradeLuxury === 0) {
				// covers if suite is not built as well
				pushFS(`${He} wants to profile the decadence of your grand bedroom, but the reality is shabby compared to the Revivalist dreams of luxurious harems in the old days.`);
			} else if (V.masterSuiteDecoration !== "Arabian Revivalist") {
				pushFS(`${He} thinks that "Pulling Back the Curtain" would make a good title for an exposé of your sumptuous bedroom, but it turns out that the space isn't decorated with Arabian-style curtains.`);
			} else {
				pushFS(`${He} makes a short video essay about your elaborate master suite, but there's no sex going on while ${he} films.`);
			}
		} else if (arcologyInfo.fsActive('FSChineseRevivalist')) {
			if (totalInt > 15 && V.HeadGirlID !== 0 && V.BodyguardID !== 0 && V.HGSuite > 0) {
				if ((S.HeadGirl.skill.entertainment / 30) + (S.HeadGirl.intelligenceImplant / 10) + S.HeadGirl.prestige >= 4) {
					if (S.Bodyguard.prestige >= 1) {
						pushFS(`${He} deferentially chronicles the administration of your Imperial household by Head Girl ${S.HeadGirl.slaveName} and Bodyguard ${S.Bodyguard.slaveName}. The piece explains points of Chinese Revivalist protocol where new slaves or visitors to the Forbidden Penthouse might inadvertently stumble.`);
						FSmatch++;
					} else {
						pushFS(`${He} interviews your Head Girl about points of protocol and household administration for broadcast to the arcology. Your Bodyguard, ${S.Bodyguard.slaveName}, is not accustomed to fame and prefers to remain off-screen.`);
					}
				} else if (S.HeadGirl.intelligenceImplant < 15) {
					pushFS(`${He} edits a documentary broadcast about the Revivalist protocols that drive your household, and in the process uncovers small but annoying lapses due to the Head Girl's lack of formal education.`);
				} else {
					pushFS(`${He} broadcasts a documentary about life inside your Imperial Chinese household, but the Head Girl's segment comes out flat: ${S.HeadGirl.slaveName} needs more experience working in front of a camera.`);
				}
				seed += (Math.min(((S.HeadGirl.skill.entertainment / 30) + (S.HeadGirl.intelligenceImplant / 10) + S.HeadGirl.prestige), 4) + Math.min(S.Bodyguard.prestige, 1));
				FSdefend++;
				arcology.FSChineseRevivalist += 0.03 * V.FSSingleSlaveRep;
			} else if (V.HeadGirlID === 0 || V.BodyguardID === 0) {
				pushFS(`${He} can't document the benefits of your Imperial Chinese administration because of unfilled posts in its leadership.`);
			} else if (totalInt <= 15) {
				pushFS(`Your household is a well-run model for the arcology at large, but your recruiter doesn't completely understand its intricate Revivalist protocols and can't explain it for the masses.`);
			} else {
				pushFS(`${He} never considers promoting your household's Revivalist protocols, since you don't value your Head Girl enough to accord ${him} a separate apartment inside your walls.`);
			}
		} else if (arcologyInfo.fsActive('FSAztecRevivalist')) {
			if (arcologyInfo.fsActive('FSPaternalist')) {
				if (slave.health.condition >= 80 && slave.bellyPreg < 1500 && slave.trust + slave.devotion >= 175) {
					pushFS(`${He} allows willing members of the public to <span class="health dec">spill ${his} blood</span> in tribute to the gods.`);
					healthDamage(slave, 2);
					FSmatch++;
					seed += 5;
					arcology.FSAztecRevivalist += 0.02 * V.FSSingleSlaveRep;
				} else if (slave.trust + slave.devotion < 175) {
					pushFS(`${He} is willing to take part in bloodletting, but the public doesn't find that believable.`);
				} else if (slave.bellyPreg >= 1500) {
					pushFS(`${He} is willing to take part in bloodletting, but the public absolutely refuses to do such a thing to a pregnant ${girl}.`);
				} else {
					pushFS(`${He} is willing to take part in bloodletting, but the public finds it wrong to impose on someone not in the absolute best of health.`);
				}
			} else {
				if (slave.health.condition >= -20 && slave.trust + slave.devotion >= 175) {
					pushFS(`${He} practices public displays of <span class="health dec">bloodletting,</span> both on ${himself} and those willing, impressing onlookers with ${his} devotion to the gods.`);
					healthDamage(slave, 2);
					FSmatch++;
					seed += 5;
					arcology.FSAztecRevivalist += 0.02 * V.FSSingleSlaveRep;
				} else if (slave.trust + slave.devotion < 175) {
					pushFS(`${He} is willing to take part in bloodletting, but you have no reason to trust ${him} with the tools required.`);
				} else {
					pushFS(`${He} is willing to take part in bloodletting, but you can't allow ${him} to do so in ${his} poor health.`);
				}
			}
			if (totalInt > 15) {
				pushFS(`${He} puts ${his} mind to work as ${he} joins citizens in their prayers to each deity.`);
				FSdefend++;
				seed += 1;
			} else {
				pushFS(`${His} poor attempts to espouse the benefits of true faith leave the crowd wondering if ${he} is next in line for sacrifice.`);
			}
		} else if (arcologyInfo.fsActive('FSAntebellumRevivalist')) {
			if (slave.skill.entertainer > 95 && App.Entity.facilities.servantsQuarters.employeesIDs().size > 5 && (slave.behavioralQuirk === BehavioralQuirk.FUNNY || totalInt > 50)) {
				pushFS(`${He} puts together a charming little video touring your spotless estate, showing particular care to the well-staffed ${V.servantsQuartersName}.`);
				if (V.servantsQuartersDecoration === "Antebellum Revivalist") {
					pushFS(`The decor really impresses the viewers.`);
					seed += 1;
				}
				pushFS(`Altogether, it really sells the idea that you are an authentic, Southern aristocrat.`);
				FSmatch++;
				seed += 5;
				arcology.FSAntebellumRevivalist += 0.02 * V.FSSingleSlaveRep;
			} else if (V.slaves.length < 10) {
				pushFS(`${He} wants to show-off your Penthouse to try and garner interest, but can't hide just how empty it is on camera.`);
			} else if (V.servantsQuarters === 0) {
				pushFS(`${He} doesn't feel right selling the idea of Southern hospitality without a stable of servants to cater to any would-be visitors.`);
			} else if (App.Entity.facilities.servantsQuarters.employeesIDs().size <= 1) {
				pushFS(`${He} worries she might embarrass you if ${he} inadvertently let slip how few servants you have.`);
			} else {
				pushFS(`${He} can't seem create anything entertaining enough that really sells the idea of your household.`);
			}
		}

		const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(slave);
		seed *= pMod;
		if (pMod < 1) {
			pushFS(`Some part of ${his} day is taken up by ${his} part-time job, making ${him} <span class="reputation dec">less effective.</span>`);
		}

		repX(Math.trunc(seed * 5), "futureSocieties", slave);

		// the summary lines always show, regardless of showEWM
		if (FSmatch > 0) {
			r.push(`${His} personal appearance fits with your social philosophies, making the future you're building <span class="positive">more popular.</span>`);
		}
		if (FSdefend > 0) {
			r.push(`${He} is able to smartly`);
			if (arcologyInfo.fsActive('FSPaternalist')) {
				r.push(`answer`);
			} else {
				r.push(`deflect`);
			}
			r.push(`abolitionist trolls about your arcology's treatment of`);
			if (arcologyInfo.fsActive('FSPaternalist')) {
				r.push(`contracted sex workers,`);
			} else {
				r.push(`chattel,`);
			}
			r.push(`<span class="positive">confirming your ideals</span> in the minds of some wavering individuals.`);
		}

		// concatenate the FS match/defend strings *after* the summary
		r = r.concat(FSstrings);
	}
};
