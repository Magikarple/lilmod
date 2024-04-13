# Creating your event

It would be useful to have the [JS functions Documentation](devNotes/usefulJSFunctionDocumentation.txt) open and in particular the "Core Slave Functions" section.

First decide your events name (e.g. `MyEvent`)

```js
App.Events.MyEvent = class MyEvent extends App.Events.BaseEvent {
	// The event only fires if the optional conditions listed in this array are met. This can be empty/not present.
	eventPrerequisites() {
		// Conditional example
		return [
			() => V.plot === 1
		];
		return []; // empty example
	}

	// Each position in the array correlates to conditions that a slave must meet to be selected. This can be empty/not present.
	actorPrerequisites() {
		// Single slave
		return [
			[
				s => canWalk(s),
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion >= 50,
				s => s.trust <= 20
			]
		];

		// Dual slave
		return [
			[ // first actor
				s => canWalk(s),
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion >= 50,
				s => s.trust <= 20
			],
			[ // second actor
				s => s.ID === getSlave(this.actors[0]).mother
			]
		];

		return [[]]; // One actor, but any slave will do
		return []; // Empty (no actors at all, see plot events and about half or individual events)
	}

	execute(node) {
		/** @type {Array<App.Entity.SlaveState>} */
		let [eventSlave] = this.actors.map(a => getSlave(a));
		const { He, he, His, his, him, himself } = getPronouns(eventSlave); // In this example we assign the left hand local variables to already defined output of the same name from the getPronouns function. Said function is designed to handle the PC object as well.
		const { HeU, heU, hisU, himU, himselfU } = getNonlocalPronouns(V.seeDicks).appendSuffix('U'); // This line handles none actor objects e.g. background characters based on both V.seeDicks (which is the ratio of slaves with dicks vs true females) and if the player has enabled diverse pronouns else the background character will always be considered female. Using 'U' is simply a convention.
		App.Events.drawEventArt(node, eventSlave, "no clothing"); // show slave art, temporarily rendering the chosen slave nude, just for the purposes of this code path within this event.

		// It is a best practice to organize event text into paragraphs.
		// That way you don't have to worry about funky spacing problems.
		// addParagraph (or the equivalent SpacedTextAccumulator.toParagraph) should be by FAR the majority case for text.

		App.Events.addNode(node, [`${He} shoves ${himU} to the ground.`], "span", ["yellow"]); // This would be rendered in yellow as "He/She (slave A) shoves she/him (none slave) to the ground.", depending how the player has configured their game.

		// Event branches
		App.Events.addResponses(node, [
		new App.Events.Result(`Text shown to user`, choiceA),
		...
		]);

		function choiceA() {
			App.Events.addNode(node, [
				`Bla bla.`,
				`Some more words.`,
			], "p"); // The above is rendered as a new paragraph with the content of "Bla bla. Some more words." - please note how spacing it automatically handled for you.
			// additional code if needed
			// effects on the actors
			eventSlave.devotion += 4;
			eventSlave.trust += 4;
			// To insert a few words of coloured text you have two main options, the later being preferred. Regardless, generally full stops and other natural break points should be included in any coloring.
			return App.Events.addNode(node, [
				`Bla bla.`,
				`<span class="yellow">Milk and cheese</span>.`, // Option A
				App.UI.DOM.makeElement("span", `Moon rocks are heavy.`, ["blue"]), // Option B
			], "p"); // Renders the above as a new paragraph with the content as: "Bla bla. Milk and cheese. (yellow) Moon rocks are heavy. (blue)" e.g. https://gitgud.io/pregmodfan/fc-pregmod/uploads/764ef42ac966f2551ac826aebac1f2aa/image.png
		}
	}
};
```

## Dealing with lisping

Use `getEnunciation()` and `Spoken()` when dealing with slave dialog. For example:

```js
const {say, title: Master} = getEnunciation(eventSlave);

return `"${Spoken(eventSlave, `Some text, ${Master},`)}" says ${eventSlave.slaveName}.`;
```

## Adding your event to the pool

Now that your event has been created, it needs to be added to the pool of possible events for its type.
For most events, as well as for our example, this is in Random Individual Event.
This pool can be found at `src/events/randomEvent.js`.
Simply add your event to the array in `App.Events.getIndividualEvents`.

## Testing

In the Options menu, open the "Debug & cheating" tab and enable “Cheat Mode”.
Once you get to "Random Individual Event" select any slave and at the bottom under DEBUG: there should be
 a input box with "Check Prerequisites and Casting" link next to it.
Per the example under it, place your event's full name into it e.g. App.Events.myEvent and then hit said link.
If everything works as intended you should see output

## Examples

### Single slave

- [src/events/RESS/devotedFearfulSlave.js](src/events/RESS/devotedFearfulSlave.js)

### Dual slave

- [src/events/reDevotedTwins.js](src/events/reDevotedTwins.js)