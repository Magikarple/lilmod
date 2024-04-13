# The pronouns system #
All references to scene actors shall be made via the pronouns object, returned by the `getPronouns()` function. The properties of the returned object contains strings to be used for referring to the actor or his actions. The object presents three property groups. The first one refers to pronouns by their grammatical names ('noun', 'object', 'pronoun', etc.). The rest of the groups provide the same values, but referred using gender-dependent names: he/she, his/her, etc. They are meant to be used in passage texts, and you can choose any group you like, the actual strings will be based on the slave object, which was passed as argument in the `getPronouns()` call.

## Usage examples ##

```js
const s = getPronouns(aSlave);
`Use ${s.his} mouth`
`Fuck ${s.him}`
`${s.He} is ready`
```

```
<<set _p = getPronouns(aSlave)>>
<<= _p.Girl>>s' butts are for loving
```

## Extending the pronouns system. ##

Consider a degradationism-based society where a slave is a thing. To extend the pronouns system, we create a successor of the `App.Utils.Pronouns` class:

```js
App.Utils.ThingPronouns = class extends App.Utils.Pronouns {
	get pronoun() { return "it" }
	get possessivePronoun() { return "its"; }
	get possessive() { return "its"; }
	get object() { return "its"; }
	get objectReflexive() { return "itself"; }
	get noun() { return "thing"; }
};
```
Notice, we override only the basic gender-neutral properties, and the rest of them use these values. Then we modify the `getPronouns()` code:

```js
if (/*degradationist society condition*/) {
	return new App.Utils.ThingPronouns(slave);
}
return new App.Utils.Pronouns(slave);
```
