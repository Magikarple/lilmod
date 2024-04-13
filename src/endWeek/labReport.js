/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.labReport = function() {
	const frag = document.createDocumentFragment();
	let r = [];
	if (V.researchLab.hired + V.researchLab.menials > 0) {
		if (V.researchLab.tasks.length === 0) {
			const cash = (V.researchLab.speed * 90);
			r.push(`Since the lab is currently not working on any projects it takes contract work and earns you <span class="yellowgreen">${cashFormat(cash)}.</span>`);
			cashX(cash, "lab");
		} else {
			let work = V.researchLab.speed;
			while (work > 0) {
				const task = V.researchLab.tasks[0];
				if (!task) {
					const cash = Math.round(work * 90);
					work = 0;
					r.push(`<br>Your lab has <span class="positive">finished all projects.</span> The remaining time is used for contract work earning you <span class="yellowgreen">${cashFormat(cash)}.</span>`);
					cashX(cash, "lab");
				} else if (work < task.workLeft) {
					task.workLeft -= work;
					work = 0;
					r.push(`The lab continues ${task.type === "research" ? "research" : "work"} on <span class="yellow">${addA(App.Data.prosthetics[task.id].name)}.</span> It will take approximately ${numberWithPluralNonZero(Math.floor(task.workLeft / V.researchLab.speed) + 1, "week")} to complete.`);
				} else {
					work -= task.workLeft;
					r.push(`Your lab staff have <span class="positive">completed</span> their`);
					switch (task.type) {
						case "research":
							V.prosthetics[task.id].research = 1;
							r.push(`${App.Data.prosthetics[task.id].name} research project.`);
							break;
						case "craft":
							V.prosthetics[task.id].amount += 1;
							r.push(`${App.Data.prosthetics[task.id].name} construction project.`);
							break;
						case "craftFit":
							task.workLeft = 0;
							V.adjustProsthetics.push(task);
							V.adjustProstheticsCompleted++;
							r.push(`project to construct ${addA(App.Data.prosthetics[task.id].name)} for ${SlaveFullName(getSlave(task.slaveID))}.`);
							break;
					}
					V.researchLab.tasks.shift();
				}
				r.push(`<br>`);
			}
		}
	} else if (V.researchLab.tasks.length > 0) {
		r.push(`<span class="note">Without researchers your tasks will never be finished.</span>`);
	}
	return {
		before: $(frag).append(r.join(' '))[0],
		slaves: [],
		after: new DocumentFragment(),
	};
};
