<!-- cSpell:ignore cond -->

# Writing scenes

Most writing is basically just plain text with branches for different cases.
Important cases to remember:

- Does the slave have a dick/vagina/tits?
- Does the PC have a dick/tits/vagina?
- If the slave has a dick and you plan to use it, can they get erect on their own?
- Is the PC pregnant?
- Is the slave mindbroken?
- Is the slave blind?
- Is the slave pregnant?
- If you penetrate an orifice, is the slave a virgin in that orifice?
- Can the slave move (i.e. is the slave amputated and/or have massive tits and/or a massive dick)?
- Does the slave like/hate trust/fear you?
- Does the slave have fetishes or personality/sexual quirks/flaws that would impact how they react?

It's important to handle every RELEVANT variation of the above cases. Depending on what you're writing, other cases may also warrant consideration; e.g. a breast-play scene will probably need to account for breast size and lactation a lot more than a generic fuck scene. If a scene only applies to a specific type of slave, you can restrict the cases you account for to the ones that are only possible for that type of slave.

There are, broadly speaking, two main ways to do this:

1. Write the same big block of text and then copy/paste it into each relevant case, and tweak the wording slightly.
 ++Less thinking required
 --LOTS of duplicate text; if you need to change something later, you have to change it in many places
2. Decompose the scene into smaller segments or sections that can each be swapped out for the slave type in question.
 ++MUCH easier maintenance
 --Have to figure out how to phrase the scene in a way that can be broken down into discrete chunks

You can also combine the two cases. For example, you may want a complex, interleaved set of <<if>> conditions for the common cases, and then have big blobs for the corner cases that are hard to handle.

It can also be easier if you split the scene into a "prep", "main", and "finish" section (these would all be the same writing block, just 2-3 <<if>> chains in sequence); that way, you could, for example, take all the various possible cases that aren't really unique, and narrate them so that, in the main section, you don't have to do so much explanatory writing for the scene to make sense overall. Then, if necessary, wrap up with the finish section. (See src/pregmod/fSlaveSelfImpreg.tw for an example of this approach)

All the variables for you and the slave are, generally, held in the variables $PC and $activeSlave, respectively. When the PC and the slave have the same attributes, they usually have the same name, but exactly what they do and mean can vary a little bit. RTFM for details. To access a specific variable, you do $var.attribName, so e.g. pregnancy is checked by $activeSlave.preg or $PC.preg. In rarer cases, you'll be dealing with an indexed entry in the $slaves array; if that's the case, you'd use $slaves[_u] or $slaves[$i] (or whatever) instead of $activeSlave. If a second (or third?) slave is present, it will be stored in another variable, the name of which will depend on the scene; for example, when impregnating a slave with another slave, the sperm donor is in $impregnatrix

Conditions are usually checked by

```sugarcube
<<if CONDITION>>
    SHOW THIS TEXT
<<elseif CONDITION2>>
    SHOW THIS TEXT INSTEAD
<<else>>
    IF NEITHER CONDITION IS MET, SHOW THIS
<</if>>
```

Conditions are usually comparative (i.e. `$a < $b or $b == 5 or $c != $d.e`) and can be chained together with `&&` (AND) or `||` (OR) and grouped with `()` - for example:
`<<if($a > 1 || ($b == 2 && $c != $a))>>`
lets you check that either variable A is greater than one, or both B equals two and C is not equal to A.
There are also a few miscellaneous functions that let you check things like whether a slave can get pregnant or whether two slaves are mutually fertile

Variable names are interpolated straight into the text, so if you have a slave named "Beth" then the text
"You fuck $activeSlave.slaveName" becomes "You fuck Beth"
You can also explicitly print a variable by doing <<print _varName>> (for temp variables) or <<print $varName>> (for global variables) which can be useful in various situations; it also lets you print the output of code expressions, like <<print $someNumericVar * 10>>.
If you want to change a variable, you do something like
`<<set $activeSlave.devotion += 5>>`
Which would, in this case, give a devotion increase of 5.

Color is changed with YOUR @@.colorname;COLORED TEXT@@ HERE

So a random (really stupid) example might be:

```sugarcube
<<if $activeSlave.fetish == 'mindbroken'>>
    Special big block of mindbroken text here.
<<elseif isAmputee($activeSlave)>>
    Special big block of amputee text here.
<<if $PC.dick > 0>>
    <<set _wasVirgin = ''>>
    <<if $activeSlave.vagina > -1>>
        <<set _orifice = 'vagina'>>
        <<if $activeSlave.vagina == 0>>
            <<set _wasVirgin = 'vaginal'>>
        <</if>>
    <<else>>
        <<set _orifice = 'ass'>>
        <<if $activeSlave.anus == 0>>
            <<set _wasVirgin = "anal">>
        <</if>>
    <</if>>
    You fuck $activeSlave.slaveName's _orifice.
    <<if _wasVirgin != ''>>
        <<if $activeSlave.devotion > 50>>
            $He @@.hotpink;loves@@ losing $his <<print _wasVirgin>> virginity to you.
            <<set $activeSlave.devotion += 5>>
        <<else>>
            $He @@.mediumorchid;@@dislikes losing $his <<print _wasVirgin>> virginity to you.
            <<set $activeSlave.devotion -= 5>>
        <</if>>
    <</if>>
<<elseif $PC.vagina > 0 && $activeSlave.dick > 0>>
    $activeSlave.slaveName
    <<if $activeSlave.devotion > 50>>
        @@.hotpink;lovingly penetrates@@
        <<set $activeSlave.devotion += 5>>
    <<else>>
        indifferently hammers
    <</if>>
    your pussy.
<<elseif $activeSlave.vagina > -1>>
    Lesbian sex here.
<<else>>
    ERROR - PC doesn't have dick or vagina?
<</if>>
```

If you need to set a temp variable, prefix it with _ instead of $. This way, you don't go cluttering up the world with variables that only matter inside your little writing segment.

You can "hot-test" stuff by text editing your HTML copy of FC, but it's a little more tedious because you have to "escape" double quotes, <, >, and & with &quot; &lt; &gt; and &amp; respectively.

Some tips:

- Write your logic first, so you don't forget to close tags. In other words, it's better to do

```sugarcube
<<if $cond>
    TODO
<<else>>
    TODO
<</if>>
```

And then fill it in later than it is to end up with a situation where you have a dozen unclosed tags and you can't remember where they are or what they do.

- For very simple stuff, it's fine to "inline" your stuff. For example, when penetrating a slave, doing `"you fuck $his <<if $activeSlave.vagina > -1>>pussy<<else>>ass<</if>>"` to show "pussy" or "ass" as necessary. However, if you need to do the same comparison a bunch of times, do something like

```sugarcube
<<if $activeSlave.vagina > -1>>
    <<set _targetOrifice = "vagina">>
<<else>>
    <<set _targetOrifice = "asshole">>
<</if>>
```

And then, when you need it, do `"you fuck $his _targetOrifice"` in sixteen different places without having the pain in the ass of copy/pasting the same if/else clause every time.

- INDENT YOUR LOGIC. USE TABS. I'm serious. Don't question me. It will make EVERYONE hate you, when they have to deal with your code, if it's not indented properly.
This is much easier to read:

```sugarcube
<<if $cond1>>
    <<if $cond2>>
        whatever
    <<elseif $cond3>>
        whatever
    <<elseif $cond4>>
        <<if $cond5>>
            whatever
        <<else>>
            <<if $cond6>>
                whatever
            <</if>>
        <</if>>
    <<else>>
        whatever
        <<if $cond7>>
            <<if $cond8>>
                whatever
            <</if>>
        <</if>>
    <</if>>
<</if>>
```

than this:

```sugarcube
<<if $cond1>>
<<if $cond2>>
whatever
<<elseif $cond3>>
whatever
<<elseif $cond4>>
<<if $cond5>>
whatever
<<else>>
<<if $cond6>>
whatever
<</if>>
<</if>>
<<else>>
whatever
<<if $cond7>>
<<if $cond8>>
whatever
<</if>>
<</if>>
<</if>>
<</if>>
```

- Proof-read your shit before posting it. Spell-check wouldn't hurt.
