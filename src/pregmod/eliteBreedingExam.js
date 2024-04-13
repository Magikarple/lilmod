/**
 * Gives detailed info related to the slaves status in the elite breeding program
 * @param {App.Entity.SlaveState} [slave] The slave to be examined
 * @returns {DocumentFragment}
 */
App.Interact.eliteBreedingExam = function(slave = null) {
	const frag = new DocumentFragment();
	const eliteAngered = V.failedElite > 100;
	const SlaveProfessionalismEstablished = V.arcologies[0].FSSlaveProfessionalism > 20;
	const cost = 5000;

	let r = [];

	if (!slave) {
		r.push(`A fee of <span class='yellowgreen'>${cashFormat(cost)}</span> will be deducted from your account for each slave be to examined.`);
	}
	r.push(
		`Updates will be posted periodically. It is your responsibility to keep up to date.`,
		`Failures will be sterilized. Please make sure your slave fits the following criteria before submitting them for testing. We shall not be held responsible for time wasted.`,
	);
	if (!slave) {
		r.push(`The slave must not be inside a Fuckdoll suit, infertile, or already pregnant.`);
	} else {
		r.push(`${slave.slaveName} is up for review:`);
	}
	App.Events.addNode(frag, r, "div");
	r = [];

	const table = App.UI.DOM.appendNewElement("table", frag, null, ["padded-columns"]);
	/** @type {[(slave: FC.SlaveState) => boolean, string][]} */
	const checks = [];

	checks.push(
		[
			slave => slave.intelligence + slave.intelligenceImplant >= (eliteAngered ? 95 : 50),
			`Must be ${eliteAngered ? 'highly intelligent' : 'very smart'}`
		],
		[
			slave => Beauty(slave) >= (eliteAngered ? 120 : 100),
			`Must be ${eliteAngered ? 'unbelievably' : ''} beautiful`
		],
		[
			slave => slave.face >= (eliteAngered ? 95 : 40),
			`Must have a ${eliteAngered ? 'breathtaking' : 'gorgeous'} face`
		],
		[
			slave => slave.chem <= 20,
			`Must not be overly impacted by drug use`
		],
		[
			slave => slave.addict === 0,
			`Must not be addicted to drugs`
		],
	);

	if (V.arcologies[0].FSMaturityPreferentialist > 20 || V.arcologies[0].FSYouthPreferentialist > 20) {
		const targetAge = 24;

		if (V.arcologies[0].FSMaturityPreferentialist > 20) {
			checks.push([
				slave => slave.physicalAge > targetAge,
				`Must be older than ${targetAge}`
			]);
		} else {
			checks.push([
				slave => slave.physicalAge <= targetAge,
				`Must be ${targetAge} or younger`
			]);
		}
	}

	if (V.arcologies[0].FSIntellectualDependency > 20) {
		checks.push([
			slave => slave.energy >= 96,
			`Must be sexually receptive at all times`
		]);
	} else if (V.arcologies[0].FSSlaveProfessionalism > 20) {
		checks.push(
			[
				slave => slave.skill.vaginal + adjustedPenSkill(slave) + slave.skill.anal + slave.skill.oral + slave.skill.entertainment + slave.skill.whoring >= (eliteAngered ? 500 : 400),
				`Must be capable of mastering skills`
			],
			[
				slave => slave.accent <= 1,
				`Must be capable of eloquent and accurate speech`
			],
		);
	}

	if (V.arcologies[0].FSPetiteAdmiration > 20 || V.arcologies[0].FSStatuesqueGlorification > 20) {
		const targetHeight = V.arcologies[0].FSPetiteAdmiration > 20 ? 150 : 186;
		if (V.arcologies[0].FSPetiteAdmiration > 20) {
			checks.push(
				[
					slave => (slave.height - (slave.heightImplant * 10)) < targetHeight,
					`Must naturally be very short (${targetHeight}cm)`
				],
				[
					slave => (slave.height - (slave.heightImplant * 10)) < Height.mean(slave) - 15,
					`Must naturally be very short for their age`
				],
			);
		} else if (V.arcologies[0].FSStatuesqueGlorification > 20) {
			checks.push([
				slave => (slave.height - (slave.heightImplant * 10)) > targetHeight,
				`Must naturally be very tall (${targetHeight}cm)`
			]);
		}
	}

	if (V.arcologies[0].FSSupremacist > 20 || V.arcologies[0].FSSubjugationist > 20) {
		const targetRace = V.arcologies[0].FSSupremacist > 20 ? V.arcologies[0].FSSupremacistRace : V.arcologies[0].FSSubjugationistRace;
		if (V.arcologies[0].FSSupremacist > 20) {
			checks.push([
				slave => slave.race === targetRace,
				`Must be ${targetRace}`
			]);
		} else {
			checks.push([
				slave => slave.race !== targetRace,
				`Must not be ${targetRace}`
			]);
		}
	}

	if (V.arcologies[0].FSGenderRadicalist > 20) {
		checks.push([
			slave => slave.dick >= 1 && slave.balls >= 1,
			`Must have a functional penis`
		]);
	} else if (V.arcologies[0].FSGenderFundamentalist > 20) {
		checks.push([
			slave => slave.dick === 0 && slave.balls === 0,
			`Must be physically female`
		]);
	}

	if (V.arcologies[0].FSPaternalist > 20) {
		checks.push([
			slave => slave.intelligenceImplant >= (SlaveProfessionalismEstablished ? 30 : 15),
			`Must be ${SlaveProfessionalismEstablished ? 'well' : ''} educated`
		]);
		checks.push([
			slave => slave.health.condition >= 60,
			`Must be in good health`
		]);
	}

	if (SlaveProfessionalismEstablished) {
		checks.push([
			slave => slave.intelligenceImplant >= 15,
			`Must be well educated`
		]);
	}

	if (V.arcologies[0].FSBodyPurist > 20) {
		checks.push([
			slave => slave.chem <= (eliteAngered ? 0 : 15),
			`Must have low carcinogen levels`
		]);
		checks.push([
			slave => slave.boobsImplant + slave.buttImplant + slave.lipsImplant + slave.hipsImplant + slave.shouldersImplant === 0 && slave.faceImplant <= 5 && slave.bellyImplant === -1,
			`Must be implant free`
		]);
	}

	if (V.arcologies[0].FSSlimnessEnthusiast > 20) {
		if (V.arcologies[0].FSHedonisticDecadence > 20) {
			checks.push([
				slave => slave.weight <= 30,
				`May be no larger than "plush"`
			]);
		} else {
			checks.push([
				slave => slave.weight <= 0,
				`Must be thin`
			]);
		}
		checks.push([
			slave => slave.butt <= 2,
			`Must have a trim rear`
		]);
		checks.push([
			slave => slave.boobs <= 400,
			`Must have a sleek chest`
		]);
	} else if (V.arcologies[0].FSAssetExpansionist > 20) {
		if (V.arcologies[0].FSTransformationFetishist > 20) {
			checks.push(
				[
					slave => slave.butt >= 6,
					`Must have a gigantic rear`
				],
				[
					slave => slave.boobs >= 1000,
					`Must be busty`
				],
			);
		} else {
			checks.push(
				[
					slave => slave.butt - slave.buttImplant >= 6,
					`Must have a naturally gigantic rear`
				],
				[
					slave => slave.boobs - slave.boobsImplant >= 1000,
					`Must be naturally busty`
				],
			);
		}
	}

	if (V.arcologies[0].FSPastoralist > 20) {
		checks.push([
			slave => slave.lactation === 1,
			`Must be lactating naturally`
		]);
	}
	if (V.arcologies[0].FSPhysicalIdealist > 20) {
		if (V.arcologies[0].FSPhysicalIdealistLaw === 1) {
			const musclesMin = 20;
			const musclesMax = 50;

			checks.push(
				[
					slave => slave.weight <= 30,
					`Must not be overweight`
				],
				[
					slave => slave.muscles.isBetween(musclesMin, musclesMax),
					`Must be fit, but not too muscular`
				],
			);
		} else {
			checks.push([
				slave => slave.muscles > 95,
				`Must be extremely muscular`
			]);
		}
	} else if (V.arcologies[0].FSHedonisticDecadence > 20) {
		const targetWeight = V.arcologies[0].FSSlimnessEnthusiast > 20 ? 10 : 95;

		if (V.arcologies[0].FSSlimnessEnthusiast > 20) {
			checks.push([
				slave => slave.weight > targetWeight,
				`Must be more than "trim"`
			]);
		} else {
			checks.push([
				slave => slave.weight > targetWeight,
				`Must be big, soft and fat`
			]);
		}
	}

	if (slave) {
		checks.forEach(check => {
			const tr = App.UI.DOM.appendNewElement("tr", table);

			App.UI.DOM.appendNewElement("td", tr, `• ${check[1]}`);

			if (!check[0](slave)) {
				App.UI.DOM.appendNewElement("td", tr, `FAILED`, ["red"]);
			} else {
				App.UI.DOM.appendNewElement("td", tr, `PASSED`, ["lime"]);
			}
		});

		if (checks.some(check => !check[0](slave))) {
			r.push(`The aforementioned slave has been deemed <span class="red">unsuitable</span> for breeding.`);

			slave.preg = -3;
		} else {
			r.push(`The aforementioned slave has been deemed <span class="green">worthy</span> of being used for breeding and has been marked as such. Please note the increased restrictions on breeding slaves.`);
			r.push(`They are not permitted for public use or anything that may harm their growing child. The child within them is considered a member of the Elite class and as such, any harm that comes to them will result in severe penalties to the breeder's owner. Development of the child will be closely monitored; should the fetus be identified as not of the owner's blood (or any other member of the Elite class), said owner shall face severe fines.`);

			slave.breedingMark = 1;
			slave.pregControl = "none";

			const job = App.Utils.jobForAssignment(slave.assignment);
			const consequences = [];
			if (slave.assignment === Job.BODYGUARD || (job && job.desc.publicSexUse)) {
				removeJob(slave, slave.assignment);
				consequences.push(`reassigned to <span class="green">rest</span>`);
			}
			if (V.pit) {
				if (V.pit.trainingIDs.includes(slave.ID)) {
					removeJob(slave, Job.ARENA);
					consequences.push(`<span class="yellow">removed</span> from ${V.pit.name}'s training roster`);
				}
				if (V.pit.fighterIDs.includes(slave.ID)) {
					removeJob(slave, Job.PIT);
					consequences.push(`<span class="yellow">removed</span> from ${V.pit.name}'s fighting roster`);
				}
			}
			if (consequences.length > 0) {
				App.Events.addNode(frag, r, "div");
				r = [];
				const {He} = getPronouns(slave);
				r.push(`${He} has been automatically ${toSentence(consequences)}.`);
			}
		}

		cashX(-cost, "capEx");
	} else {
		checks.forEach(check => {
			const tr = App.UI.DOM.appendNewElement("tr", table);

			App.UI.DOM.appendNewElement("td", tr, check[1]);
		});
	}

	// hack to circumvent default SugarCube styling
	table.style.marginLeft = "1em";

	App.Events.addNode(frag, r, "div");

	return frag;
};
