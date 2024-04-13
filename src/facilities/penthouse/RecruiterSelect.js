App.Facilities.RecruiterSelect = function() {
	const f = document.createDocumentFragment();
	const recruiterCap = document.createDocumentFragment();
	let newLine = document.createElement("div");
	let r = [];

	App.UI.DOM.appendNewElement("h1", f, "Recruiter Management");
	if (S.Recruiter) {
		App.UI.DOM.appendNewElement("span", f, `${SlaveFullName(S.Recruiter)} is working as your Recruiter, currently ${V.recruiterTarget !== "other arcologies" ? 'recruiting girls. ' : 'acting as a sexual Ambassador'}`);
		if (V.recruiterTarget === "other arcologies") {
			const externalArcology = V.arcologies.find(s => s.direction === V.arcologies[0].influenceTarget);
			if (!externalArcology) {
				App.UI.DOM.appendNewElement("span", f, `. `);
				App.UI.DOM.appendNewElement("span", f, `Since you have not selected another arcology to influence, your recruiter's talents are going to waste. Select an influence target to apply them. `, "red");
			} else {
				App.UI.DOM.appendNewElement("span", f, ` to ${externalArcology.name}. `);
			}
		}
		f.append(App.UI.DOM.link("Remove Recruiter", () => {
			removeJob(S.Recruiter, Job.RECRUITER);
		},
		[], "Main"
		));

		App.UI.DOM.appendNewElement("p", f);
		f.append(`Your recruiter will target ${V.recruiterTarget}, `);
		if (V.recruiterTarget === "desperate whores") {
			f.append("they will be skilled but unhealthy. ");
		} else if (V.recruiterTarget === "young migrants") {
			f.append("they will be young and inexperienced but unhealthy. ");
		} else if (V.recruiterTarget === "recent divorcees") {
			f.append("they will be mature. ");
		} else if (V.recruiterTarget === "expectant mothers") {
			f.append("they will be pregnant and likely unhealthy. ");
		} else if (V.recruiterTarget === "dissolute sissies") {
			f.append("they will be born male and have some experience. ");
		} else if (V.recruiterTarget === "reassignment candidates") {
			f.append("they will be born male. ");
		} else if (V.recruiterTarget === "other arcologies") {
			f.append("they will appoint the Recruiter to be a sexual Ambassador. ");
		}

		r.push(App.UI.DOM.link(`Desperate whores`, () => {
			V.recruiterTarget = "desperate whores";
			App.UI.reload();
		}));
		r.push(App.UI.DOM.link("Young migrants", () => {
			V.recruiterTarget = "young migrants";
			App.UI.reload();
		}));
		r.push(App.UI.DOM.link("Recent divorcees", () => {
			V.recruiterTarget = "recent divorcees";
			App.UI.reload();
		}));

		if (V.seeDicks !== 100 && V.seePreg !== 0) {
			r.push(App.UI.DOM.link("Expectant mothers", () => {
				V.recruiterTarget = "expectant mothers";
				App.UI.reload();
			}));
		}
		if (V.seeDicks !== 0) {
			r.push(App.UI.DOM.link("Dissolute sissies", () => {
				V.recruiterTarget = "dissolute sissies";
				App.UI.reload();
			}));
			r.push(App.UI.DOM.link("Reassignment candidates", () => {
				V.recruiterTarget = "reassignment candidates";
				App.UI.reload();
			}));
		}
		if (V.arcologies.length > 1) {
			r.push(App.UI.DOM.link("Other arcologies' cultures", () => {
				V.oldRecruiterTarget = V.recruiterTarget;
				V.recruiterTarget = "other arcologies";
				App.UI.reload();
			}));
		}
		App.UI.DOM.appendNewElement("div", f, App.UI.DOM.generateLinksStrip(r));
		App.UI.DOM.appendNewElement("p", f);

		newLine.append(App.UI.DOM.makeCheckbox("recruiterEugenics"), App.UI.DOM.makeElement("span", " Target only individuals that can pass eugenics SMRs. This option will increase time it takes to recruit depending on how many eugenics SMR are active.", "note"));
		App.UI.DOM.appendNewElement("div", f, newLine);

		f.append("Suspend active recruiting and focus on publicity when: ");
		if (V.recruiterIdleRule === "number") {
			f.append(`${V.recruiterIdleNumber} sex slaves owned`);
		} else if (V.recruiterIdleRule === "facility") {
			const idleTarget = App.Utils.recruiterFacilitySpace();
			f.append(`match facility expansion, `);
			if (idleTarget > 20) {
				f.append(`${idleTarget} positions.`);
			} else {
				f.append("20 positions (rule minimum).");
			}
		} else {
			f.append("always recruit");
		}

		r = [];
		r.push(App.UI.DOM.link("Always recruit", () => {
			V.recruiterIdleRule = "always";
			App.UI.reload();
		}));
		r.push(App.UI.DOM.link("Facilities & leadership", () => {
			V.recruiterIdleRule = "facility";
			App.UI.reload();
		}));
		recruiterCap.append(App.UI.DOM.link("Set to this many slaves ", () => {
			V.recruiterIdleRule = "number";
			App.UI.reload();
		}));
		if (V.recruiterIdleRule === "number") {
			recruiterCap.append(App.UI.DOM.makeTextBox(V.recruiterIdleNumber, (v) => {
				V.recruiterIdleNumber = v;
				Engine.play(passage());
			}, true));
		}
		r.push(recruiterCap);
		App.UI.DOM.appendNewElement("div", f, App.UI.DOM.generateLinksStrip(r));
		App.UI.DOM.appendNewElement("div", f, "'Facilities' doesn't include training slots in cellblock, schoolroom, spa, clinic (but does include those leaders)");

		V.recruiterIdleNumber = Math.max(Math.trunc(Number(V.recruiterIdleNumber) || 20), 20);
	} else {
		f.append(`No Recruiter assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.penthouse, "Recruiter Select"));
	return f;
};
