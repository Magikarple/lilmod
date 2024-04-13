App.Facilities.DJSelect = function() {
	const f = document.createDocumentFragment();
	V.nextButton = "Back";
	V.nextLink = "Club";
	App.UI.StoryCaption.encyclopedia = "DJ";

	if (S.DJ) {
		f.append(`${SlaveFullName(S.DJ)} is working as your DJ, managing entertainment in ${V.clubName}. `);
		f.append(App.UI.DOM.link("Remove DJ", () => {
			removeJob(S.DJ, Job.DJ);
		},
		[], "Club"
		));
	} else {
		f.append(`No DJ assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.club, "Club"));
	return f;
};
