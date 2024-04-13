// Add a new boolean getter for use in the RA condition editor.
// The first argument is a unique name for the getter. To ensure uniqueness with other mods it is recommended to
// prefix the name with the mod name.
// The second argument is an object describing the getter.
// 'name' is the string shown in the RA condition editor when selecting.
// 'description' should be a short description of the value the getter returns, with possible values if applicable.
//      It will be displayed in the encyclopedia.
// 'val' is the actual getter reading out the value and returning it. It operates on a 'context' object with the current
//      slave as an attribute.
// It is important that the getter always returns the data type that it is being added as, in this case 'string'.
// 'addNumber()' and 'addBoolean()' also exist. The usage is the same.
App.RA.Activation.getterManager.addString("example_slavename",
	{name: "Slave Name", description: "The slave's name.", val: context => context.slave.slaveName}
);

console.log("Rule Assistant Getters loaded.");

App.Modding.scriptDone();
