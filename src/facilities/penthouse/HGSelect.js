App.Facilities.HGSelect = function() {
	let div = document.createElement("div");
	const f = document.createDocumentFragment();
	let r = [];
	let links = [];

	App.UI.DOM.appendNewElement("h1", f, "Head Girl Management");

	if (S.HeadGirl) {
		const HGName = SlaveFullName(S.HeadGirl);
		const {
			His, He, he,
			his, him, himself
		} = getPronouns(S.HeadGirl);

		f.append(`${SlaveFullName(S.HeadGirl)} is working as your HeadGirl`);
		if (V.arcologies[0].FSEgyptianRevivalistLaw === 1) {
			f.append(`/Consort; serving and providing comfort, in addition to performing normal Head Girl duties`);
		}
		f.append(`. `);
		if (V.HGSuite) {
			f.append(`Currently living in ${capFirstChar(V.HGSuiteName)}. `);
		}
		f.append(App.UI.DOM.link("Remove HeadGirl", () => {
			removeJob(S.HeadGirl, Job.HEADGIRL);
		},
		[], "Main"
		));

		App.UI.DOM.appendNewElement("h2", f, `Slave training`);
		App.UI.DOM.appendNewElement("div", f, `${HGName} will prioritize enabled items in the following order`, "note");

		div.append(App.UI.DOM.makeCheckbox("headGirlTrainsHealth"), " Health");
		App.UI.DOM.appendNewElement("div", f, div, "indent");

		div = document.createElement("div");
		div.append(App.UI.DOM.makeCheckbox("headGirlTrainsParaphilias"), " Paraphilias");
		App.UI.DOM.appendNewElement("div", f, div, "indent");

		if (V.headGirlTrainsFlaws) {
			r.push(`${HGName} will remove flaws.`,);
		} else if (V.headGirlSoftensFlaws) {
			r.push(`${HGName} will soften flaws into quirks.`);
		} else if (V.headGirlOverridesQuirks) {
			r.push(`${HGName} will override quirks.`);
		} else {
			r.push(`${HGName} will ignore flaws.`);
		}

		links.push(App.UI.DOM.link("Override quirks", () => {
			V.headGirlTrainsFlaws = 0;
			V.headGirlSoftensFlaws = 0;
			V.headGirlOverridesQuirks = 1;
			App.UI.reload();
		}));
		links.push(App.UI.DOM.link("Soften flaws", () => {
			V.headGirlTrainsFlaws = 0;
			V.headGirlSoftensFlaws = 1;
			V.headGirlOverridesQuirks = 0;
			App.UI.reload();
		}));
		links.push(App.UI.DOM.link("Remove flaws", () => {
			V.headGirlTrainsFlaws = 1;
			V.headGirlSoftensFlaws = 0;
			V.headGirlOverridesQuirks = 0;
			App.UI.reload();
		}));

		links.push(App.UI.DOM.link("Ignore flaws", () => {
			V.headGirlTrainsFlaws = 0;
			V.headGirlSoftensFlaws = 0;
			V.headGirlOverridesQuirks = 0;
			App.UI.reload();
		}));

		r.push(App.UI.DOM.generateLinksStrip(links));
		App.Events.addNode(f, r, "div", "indent");

		div = document.createElement("div");
		div.append(App.UI.DOM.makeCheckbox("headGirlTrainsObedience"), " Obedience");
		App.UI.DOM.appendNewElement("div", f, div, "indent");

		div = document.createElement("div");
		div.append(App.UI.DOM.makeCheckbox("headGirlTrainsSkills"), " Skills");
		App.UI.DOM.appendNewElement("div", f, div, "indent");

		App.UI.DOM.appendNewElement("h2", f, "Training methods");

		r = [];
		if (V.HGSeverity === 1) {
			r.push(`${HGName} will be <span class="bold">aggressive</span> when punishing, with rape strongly encouraged.`);
			r.push(App.UI.DOM.link("Moderate", () => {
				V.HGSeverity = 0;
				App.UI.reload();
			}));
		} else if (V.HGSeverity === 0) {
			links = [];
			r.push(`${HGName} will be <span class="bold">moderate</span> when punishing, carefully selecting appropriate consequences.`);
			links.push(App.UI.DOM.link("Be aggressive", () => {
				V.HGSeverity = 1;
				App.UI.reload();
			}));
			links.push(App.UI.DOM.link(`Apply restrictions`, () => {
				V.HGSeverity = -1;
				App.UI.reload();
			}));
			r.push(App.UI.DOM.generateLinksStrip(links));
		} else if (V.HGSeverity === -1) {
			r.push(`${HGName} will be <span class="bold">respectful</span> when punishing, treating slaves decently.`);
			r.push(App.UI.DOM.link("Be stricter", () => {
				V.HGSeverity = 0;
				App.UI.reload();
			}));
		}
		App.Events.addNode(f, r, "div", "indent");

		r = [];
		if (V.HGPiercings === 1) {
			r.push(`${HGName} is <span class="bold">allowed</span> to use piercings as a tool to improve slaves' attitudes.`);
			r.push(App.UI.DOM.link("Disallow", () => {
				V.HGPiercings = 0;
				App.UI.reload();
			}));
		} else {
			r.push(`${HGName} is <span class="bold">not allowed</span> to use piercings as a tool to improve slaves' attitudes.`);
			r.push(App.UI.DOM.link("Allow", () => {
				V.HGPiercings = 1;
				App.UI.reload();
			}));
		}
		App.Events.addNode(f, r, "div", "indent");

		r = [];
		App.UI.DOM.appendNewElement("h2", f, "Behavior");
		if (V.HGFormality === 1) {
			r.push(`${HGName} will be <span class="bold">formal:</span> you will always be called ${getWrittenTitle(S.HeadGirl)}, just like any other slave.`);
			r.push(App.UI.DOM.link("Allow private informality", () => {
				V.HGFormality = 0;
				App.UI.reload();
			}));
		} else {
			r.push(`${HGName} is allowed to be <span class="bold">informal:</span> in private, you can be called ${properTitle()}.`);
			r.push(App.UI.DOM.link("Maintain complete formality", () => {
				V.HGFormality = 1;
				App.UI.reload();
			}));
		}
		App.Events.addNode(f, r, "div", "indent");

		r = [];
		if (V.seePreg !== 0) {
			if (V.universalRulesImpregnation === "HG") {
				App.UI.DOM.appendNewElement("div", f, `${HGName} is responsible for impregnating fertile slaves.`);
				if (canPenetrate(S.HeadGirl) && S.HeadGirl.pubertyXY === 1) {
					App.UI.DOM.appendNewElement("div", f, `To maximize the chances of impregnation, ${he} will fuck fertile pussies frequently during the week. ${S.HeadGirl.slaveName} can service ${resetHGCum(S.HeadGirl)} slaves this way.`);
					if (S.HeadGirl.devotion > 95) {
						App.UI.DOM.appendNewElement("div", f, `${He} loves you so much ${he}'ll fuck them until ${he}'s sore.`);
					} else {
						App.UI.DOM.appendNewElement("div", f, `If ${he} were more devoted to you, ${he} might be able to drive ${himself} to get hard and service one more.`);
					}
					if (S.HeadGirl.balls >= 120) {
						App.UI.DOM.appendNewElement("div", f, `${His} unreal balls produce nearly an endless supply of semen; ${his} ability to impregnate is almost limitless.`);
					} else if (S.HeadGirl.balls >= 80) {
						App.UI.DOM.appendNewElement("div", f, `${His} inhuman balls produce so much semen ${he} can easily impregnate twenty girls in one sitting.`);
					} else if (S.HeadGirl.balls >= 50) {
						App.UI.DOM.appendNewElement("div", f, `${His} giant balls produce so much semen ${he} can easily impregnate twelve girls in one sitting.`);
					} else if (S.HeadGirl.balls >= 25) {
						App.UI.DOM.appendNewElement("div", f, `${His} oversized balls produce so much semen ${he} can cum repeatedly in a single session.`);
					} else if (S.HeadGirl.balls >= 5) {
						App.UI.DOM.appendNewElement("div", f, `${His} big balls produce so much semen ${he} can cum more before ${he}'s drained.`);
					} else {
						App.UI.DOM.appendNewElement("div", f, `Bigger balls would let ${him} cum more before ${he}'s drained.`);
					}
					if (S.HeadGirl.health.condition > 95) {
						App.UI.DOM.appendNewElement("div", f, `${His} wonderful health lets ${him} get hard and stay hard all the time.`);
					} else {
						App.UI.DOM.appendNewElement("div", f, `If ${his} health were perfect, ${he} might be able to get hard more often.`);
					}
					if (S.HeadGirl.energy > 95) {
						App.UI.DOM.appendNewElement("div", f, `${His} nymphomania drives ${him} to go above and beyond in this.`);
					} else {
						App.UI.DOM.appendNewElement("div", f, `A more powerful sex drive could reduce ${his} refractory period.`);
					}
				} else {
					App.UI.DOM.appendNewElement("div", f, `However, ${S.HeadGirl.slaveName} cannot perform this duty.`);
				}
				r.push(App.UI.DOM.link(`Rescind ${his} impregnation responsibility`, () => {
					V.universalRulesImpregnation = "none";
					App.UI.reload();
				}));
				r.push(App.UI.DOM.link(`See to it yourself`, () => {
					V.universalRulesImpregnation = "PC";
					App.UI.reload();
				}));
				f.append(' ', App.UI.DOM.generateLinksStrip(r));
			} else {
				if (canPenetrate(S.HeadGirl) && S.HeadGirl.pubertyXY === 1) {
					App.UI.DOM.appendNewElement("div", f, `${HGName} is capable of impregnating slaves, but it's not part of ${his} responsibilities. `).append(
						App.UI.DOM.link(`Assign ${him} to impregnate`, () => {
							V.universalRulesImpregnation = "HG";
							App.UI.reload();
						}));
				}
			}
		}
	} else {
		f.append(`No HeadGirl assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.headGirlSuite, "Head Girl Select"));
	return f;
};
