# Custom Events

To add a custom event(s) through modding, add `new App.Events.EVENT_NAME()` (following the file structure laid out within `devNotes\jsEventCreationGuide.md` is strongly recommended) to the applicable array.

## Example

`EVENT_NAME` is bigTitsPlease.
To add this as a new `random` `individual` event place `App.Mods.events.random.individual.push(new App.Events.bigTitsPlease())` within the `index.js` outlined as apart of `mods\mods.md`.

## Array list and notes

- `App.Mods.events.nonRandom` - hooks into the end of `App.Events.getNonrandomEvents` (`src\events\nonRandomEvent.js`) which has the following warning `// ORDER MATTERS - if multiple events from this list trigger in a single week, they are executed in this order`.

- `App.Mods.events.random.individual` - hooks into the end of `App.Events.getIndividualEvents` (`src\events\randomEvent.js`), `// instantiate all possible random individual events here`.

- `App.Mods.events.random.nonIndividual` - hooks into the end of `App.Events.getNonindividualEvents` (`src\events\randomEvent.js`), `// instantiate all possible random nonindividual events here` and `Note: recruitment events should NOT be added to this list; they go in getNonindividualRecruitmentEvents instead.`.

- `App.Mods.events.random.recruitment` - hooks into the end of `App.Events.getNonindividualRecruitmentEvents` (`src\events\randomEvent.js`).

- `App.Mods.events.recruit` - hooks into the end of `this.eventList` (`App.Events.RERecruit` - `src\events\reRecruit.js`).
