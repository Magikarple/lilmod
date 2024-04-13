App.Events.PSlaveFood = class PSlaveFood extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	get eventName() {
		return "Slave Food";
	}

	execute(node) {
		let r = [];
		const {
			HeA, HisA,
			heA, hisA, himA, girlA, himselfA, womanA
		} = getPronouns(assistant.pronouns().main || {pronoun: 1}).appendSuffix("A");

		r.push(`A screen opposite your desk springs to life,`);
		if (V.assistant.personality <= 0) {
			r.push(`showing your personal assistant's symbol, indicating that it has a complex subject to report. When you instruct it to continue, it displays`);
		} else {
			r.push(`and ${V.assistant.name}'s avatar appears on it seated, indicating that ${heA} has something complex to bring up. When you tell ${himA} to continue, ${heA} reviews`);
		}
		r.push(`medical research that's just been published, on the long term effects of the liquid diet your slaves eat. The current generation of slaves is the first, and new discoveries about the effects of years of modern slavery are made all the time. Apparently, consuming state of the art slave food causes slow atrophy of slaves' digestive tracts. The slaves' ability to digest the slave food does not seem to be affected; the atrophy is the body's natural reaction to never facing digestive challenge, and once it reaches the point where the remaining digestive capacity is necessary for liquid slave food, it stops. The only negative effect known is difficulty readjusting to normal food, becoming more extreme the longer the slave food diet was followed.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`"In conclusion,"`);
		if (V.assistant.personality <= 0) {
			r.push(`your assistant recites, "no impact on slaves who fully adapt to slave food is likely, as long as they remain slaves. If they were to be freed, they would have to either continue obtaining liquid slave food, or go through a difficult or even impossible dietary transition." ${HeA} pauses. "This information is likely to remain at the level of a rumor among the slave population, unless it is openly admitted."`);
		} else {
			r.push(`${heA} says, "your slaves who stay on slave food long enough to need it will be totally fine, as long as they stay slaves. If they're ever freed, though, they have to keep eating slave food, or somehow switch. And that's never been tried."`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`The monster${girlA} bares ${hisA} fangs and becomes very erect. "They're stuck," ${heA} says. "They're fuckslaves forever." ${HeA} pauses.`);
					break;
				case "shemale":
					r.push(`The shemale starts to stroke ${himselfA}. "Their assholes are going to be nice and clean and fuckable forever," ${heA} says, starting to cum.`);
					break;
				case "amazon":
					r.push(`The amazon looks pleased. "They're changing to fit their place," ${heA} says.`);
					break;
				case "businesswoman":
					r.push(`The business${womanA} fans ${himselfA}, looking rather hot under the collar. "Another way they're bound to you," ${heA} says breathily.`);
					break;
				case "fairy":
					r.push(`The small fairy giggles and spins around on one foot. "Looks like they'll be under our care for life!" ${HeA} comes to a stop.`);
					break;
				case "pregnant fairy":
					r.push(`The small fairy giggles and rapidly beats ${hisA} wings. "Looks like they'll be under our care for life!" ${HisA} wings settle down.`);
					break;
				case "goddess":
					r.push(`The goddess beams. "It's wonderful," ${heA} says radiantly. "Their place is here, with us." ${HeA} pauses.`);
					break;
				case "hypergoddess":
					r.push(`The child-filled goddess beams. "It's wonderful," ${heA} says radiantly. "They are like our children, and this arcology our womb; even after they are born they are forever bound to us." ${HeA} pauses.`);
					break;
				case "loli":
					r.push(`The little ${girlA} smiles happily while jumping up and down. "So we can be friends forever? That's great!" ${HeA} pauses.`);
					break;
				case "preggololi":
					r.push(`The little ${girlA} smiles happily. "So we can be friends forever? That's great!" ${HeA} pauses.`);
					break;
				case "angel":
					r.push(`The angel frowns. "How unfair. But you'll tend to your flock, right?"`);
					break;
				case "cherub":
					r.push(`The cherub pauses. "That means they can't stray from your flock, they have to stay near you, right?"`);
					break;
				case "incubus":
					r.push(`The incubus smirks. "I don't care either way. A hole is a hole."`);
					break;
				case "succubus":
					r.push(`The succubus frowns. "That means they are reshaping themselves to fit you better. THAT, is MY job."`);
					break;
				case "imp":
					r.push(`The imp laughs. "They are nothing but toys now, never allowed to be free again!"`);
					break;
				case "witch":
					r.push(`The witch ponders. "It's probably more convenient than casting a spell, less side effects too. Sorry again about that last spell."`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`It begins to twitch excitedly. "That means its digestive track is empty. Think how many young can be shoved in there now!" Its avatar is visible erect, maybe? It's sometimes hard to tell.`);
					break;
				case "schoolgirl":
					r.push(`The school${girlA} snickers cruelly. "Suck dick or starve," ${heA} sniggers.`);
					break;
				default:
					r.push(`${HisA} symbol rotates slowly.`);
			}
			r.push(`"The truth will get out, but it'll be nothing more than a rumor among the slaves unless you let it be known yourself."`);
		}
		V.revealFoodEffects = 0;

		App.Events.addResponses(node, [
			new App.Events.Result(`Conceal the effects from your slaves!`, conceal),
			new App.Events.Result(`Admit the truth to your slaves`, admit)
		]);

		function conceal() {
			return `Your slaves don't need to know that every drop of food they drink is making the light of any eventual freedom they may someday enjoy dimmer and dimmer. Slaves talk to each other all the time, and rumors fly around in such profusion that the truth often gets lost among them. The cruel irony of the symptoms the research discovered is that they're impossible for the slaves to notice so long as they continue to eat the slave food.`;
		}

		function admit() {
			V.revealFoodEffects = 1;
			return `Your new slaves already receive a simple explanation of the way the slave food works as part of their training. You simply append a statement to the effect that the slaves' bodies will adapt to the slave food, slowly making it difficult and eventually impossible for them to eat anything else. There is no immediate reaction, but the news begins to filter out among the slaves. They'll react to the newly revealed nature of their food in accordance with their individual attitudes.`;
		}
	}
};
