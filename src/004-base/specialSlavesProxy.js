App.SpecialSlavesProxy = class SpecialSlavesProxy {
	constructor() {
	}

	get Attendant() {
		return slaveStateById(V.AttendantID);
	}
	get Bodyguard() {
		return slaveStateById(V.BodyguardID);
	}
	get Concubine() {
		return slaveStateById(V.ConcubineID);
	}
	get DJ() {
		return slaveStateById(V.djID);
	}
	get Farmer() {
		return slaveStateById(V.FarmerID);
	}
	get HeadGirl() {
		return slaveStateById(V.HeadGirlID);
	}
	get Lurcher() {
		return slaveStateById(V.LurcherID);
	}
	get Madam() {
		return slaveStateById(V.MadamID);
	}
	get Matron() {
		return slaveStateById(V.MatronID);
	}
	get Milkmaid() {
		return slaveStateById(V.MilkmaidID);
	}
	get Nurse() {
		return slaveStateById(V.NurseID);
	}
	get Recruiter() {
		return slaveStateById(V.RecruiterID);
	}
	get Schoolteacher() {
		return slaveStateById(V.SchoolteacherID);
	}
	get Stewardess() {
		return slaveStateById(V.StewardessID);
	}
	get Stud() {
		return slaveStateById(V.StudID);
	}
	get Wardeness() {
		return slaveStateById(V.WardenessID);
	}
	get activeSlave() {
		return V.activeSlave;
	}
};

globalThis.S = new App.SpecialSlavesProxy();
