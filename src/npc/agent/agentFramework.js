App.Data.Facilities.arcologyAgent = {
	baseName: "arcology",
	genericName: null,
	jobs: {
		agentsSlave: {
			position: "agent's toy",
			assignment: Job.AGENTPARTNER,
			publicSexUse: true,
			fuckdollAccepted: false
		}
	},
	defaultJob: "agentsSlave",
	manager: {
		position: "agent",
		assignment: Job.AGENT,
		careers: ["an arcology owner"],
		skill: "headGirl",
		publicSexUse: true,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 21
	},
	decorated: false
};

App.Entity.Facilities.AgentJob = class extends App.Entity.Facilities.ManagingJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.intelligence + slave.intelligenceImplant <= 15) {
			r.push(`${slave.slaveName} is not intelligent enough to be your agent.`);
		}
		return r;
	}
};

App.Entity.facilities.arcologyAgent = new App.Entity.Facilities.Facility(
	App.Data.Facilities.arcologyAgent,
	{
		// agent's partner, eventually
	},
	new App.Entity.Facilities.AgentJob()
);
