# Producing slave lists

The namespace `App.UI.SlaveList` provides functions for displaying lists of slaves and interacting with the slaves in those lists. These functions supersede (and extend) the `Slave Summary` passage. They provide a way to display a list, select a slave from a list, generate standard lists for a facility or a leader selection, as well as provide a way to customize output and interaction.

## General concept

The core function is `App.UI.SlaveList.render()`. It renders the list, assembling it from four pieces. The function is declared as follows:

```js
/**
 * @param {number[]} indices
 * @param {Array.<{index: number, rejects: string[]}>} rejectedSlaves
 * @param {slaveTextGenerator} interactionLink
 * @param {slaveTextGenerator} [postNote]
 * @returns {string}
 */
function (indices, rejectedSlaves, interactionLink, postNote)
```

and the type of the `slaveTextGenerator` callback is:

```js
/**
 * @callback slaveTextGenerator
 * @param {App.Entity.SlaveState} slave
 * @param {number} index
 * @return {string}
 */
```

To build the output, the `render()` function iterates over the `indices` array, which must contain indices from the `$slaves` array, and outputs each slave using the two callbacks. The first one (`interactionLink`) is used to generate the hyperlink for the slave name. Output from the second callback (if defined) will be printed after each slave summary. The array of rejected slaves is processed after that and its contents are printed out in a simple fashion. The function *does not sort* both arrays, neither `indices` nor `rejectedSlaves`; their elements are printed in the order, specified by the caller. The function' output has to be passed via the SugarCube wikifier, for example by printing in out using the `<<print>>` macro.

Let's consider a few examples.

## Implementation examples

### Basic printing

The most common behavior for the slave name links is to go to the `Slave Interact` passage after clicking its name. This is implemented by the `App.UI.SlaveList.SlaveInteract.stdInteract` function:

```js
/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} index
 * @return {string}
 */
App.UI.SlaveList.SlaveInteract.stdInteract = (slave, index) =>
   App.UI.passageLink(SlaveFullName(slave), 'Slave Interact', `$activeSlave = $slaves[${index}]`);
```

The function gets both the slave object and its index in the `$slaves` array for convenience, and outputs a hyperlink in the HTML markup. which points to the `Slave Interact` passage and sets active slave to the slave with the given index, because `Slave Interact` operates with the current slave. In the SugarCube markup the function could look as follows:

```js
/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} index
 * @return {string}
 */
App.UI.SlaveList.SlaveInteract.stdInteract = (slave, index) =>
  `<<link "${SlaveFullName(slave)}" "Slave Interact">><<set $activeSlave = $slaves[${index}]`;
```
Now we can print slave lists. Let's print first three from the `$slaves` array:

```
<<print App.UI.SlaveList.render(
   [0, 1, 2], [].
   App.UI.SlaveList.SlaveInteract.stdInteract
)>>
```

Let's print them in the reverse order:

```
<<print App.UI.SlaveList.render(
   [2, 1, 0], [].
   App.UI.SlaveList.SlaveInteract.stdInteract
)>>
```

and one more time omitting the second slave:

```
<<print App.UI.SlaveList.render(
   [0, 2],
   [{index: 1, rejects: ['Omitted for testing purposes']}].
   App.UI.SlaveList.SlaveInteract.stdInteract
)>>
```

### Post-notes

The post notes are little text pieces, printed after each slave. They can contain simple text, for example to inform that particular slave is special in a way, or provide additional action hyperlinks. The most common type of the post notes is a hyperlink for assigning or retrieving s slave from a facility. Here are their implementations:

```js
(slave, index) => App.UI.passageLink(`Send ${slave.object} to ${facility.name}`, "Assign", `$i = ${index}`);

(slave, index) => App.UI.passageLink(`Retrieve ${slave.object} from ${facility.name}`, "Retrieve", `$i = ${index}`);
```

With these blocks we can easily produce a list of slaves, working at a given facility `facility`.

First, let's get the indices of the workers:

```js
let facilitySlaves = facility.job().employeesIndices();
```

The `App.Entity.Facilities.Facility.job()` call returns a named job if it was given an argument, or the default job when argument was omitted. Pretty much every facility except the penthouse provides only a single job and we can safely omit the job name here.

Now just call the `render()` function:

```js
App.UI.SlaveList.render(facilitySlaves, [],
	App.UI.SlaveList.SlaveInteract.stdInteract,
   (slave, index) => App.UI.passageLink(`Retrieve ${slave.object} from ${facility.name}`, "Retrieve", `$i = ${index}`));
```

That's it, works with any facility.

Here we omitted a few details, like setting the `$returnTo` bookmark for the `Assign` and `Retrieve` passages, sorting the slaves lists, and a few more.

### Templates for common use cases

There are functions in the `App.UI.SlaveList` namespace for a few typical use cases.

Function | Purpose
----- | ----
`listSJFacilitySlaves()` | Creates a tabbed list for assigning and retrieving slaves t0/from a facility with a single job
`displayManager()` | Displays a facility manager with a link to change it or a note with a link to assign a manager
`stdFacilityPage()` | Combines the previous two functions to render the manager and employees
`penthousePage()` | Displays tabs with workers for the penthouse
`slaveSelectionList()` | Displays a list with filtering and sorting links for selecting a slave
`facilityManagerSelection()` | Specialization of the `slaveSelectionList()` to select a manager for a facility, which implements position requirements tests and highlights experienced slaves

### Fully custom lists

There are use cases that stand apart from all other, and there is no point in providing a template for them. In that case you can generate a totally custom list. Here is an example:

```
<<print App.UI.SlaveList.slaveSelectionList(
	s => !ruleSlaveExcluded(s, $currentRule),
	(s, i) => `<u><strong>${App.UI.passageLink(SlaveFullName(s), 'Rules Slave Exclude Workaround', `$activeSlave = $slaves[${i}]`)}</strong></u>`
)>>
```
