App.Events.SENewBaron = class SENewBaron extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() >= 40,
			() => V.arcologies[0].prosperity > 80,
			() => V.arcologies[0].FSNeoImperialistLaw2 === 1,
			() => V.newBaron !== 1,
			() => App.Events.effectiveWeek() >= V.imperialEventWeek + 3
		];
	}

	execute(node) {
		V.newBaron = 1;
		V.imperialEventWeek = App.Events.effectiveWeek();

		App.Events.addParagraph(node, [`${V.arcologies[0].name} is prospering. New citizens flood to your gates, filling out the marketplaces and houses with new goods, slaves, and desires. Although every new citizen and visitor on the bustling trams lines more money into your pocket, it also comes with the challenge of new bureaucracy. The original group of Barons you appointed to micromanage each district has been valiantly struggling to manage increasingly larger clusters of people, but it has become quite clear, even if the Barons refuse to admit it, that a new addition to their hallowed ranks is needed to manage your ever-expanding arcology.`]);

		App.Events.addParagraph(node, [`The appointment of a new Baron is not something to be taken lightly; it is undoubtedly the most desired title in your arcology, and a veritable horde of citizens and millionaires hound your inbox and parties with hints and implications, subtly attempting to display their qualifications, because the Barons possess something even the wealthiest trillionaire in the Free Cities does not – security. The golden band of office of an Imperial Baron brings with it a penthouse, a sense of nobility, and a guaranteed sector of people to rule; so long as the arcology continues to exist, the Barons will rule in your name, free from worries about petty market fluctuations and slave prices. Short of your personal intervention or the total collapse of the arcology, nothing can unseat a Baron once they're appointed.`]);

		App.Events.addParagraph(node, [`The hunger for such security among your upper class leaves you in an interesting position. You have dozens of citizens that you could give the title to, with various skills and proficiencies from your diverse arcology, and anyone who's handed a noble title will be certain to show their gratitude. The only real question on your mind – and on the minds of the waiting elites – is who you plan to promote.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Appoint a wealthy executive`, executive));
		choices.push(new App.Events.Result(`Appoint a competent bureaucrat`, bureaucrat));
		choices.push(new App.Events.Result(`Appoint a veteran Knight`, veteran));
		App.Events.addResponses(node, choices);

		function executive() {
			cashX(5000, "event");
			V.arcologies[0].prosperity -= 1;
			return `You select one of your loyal executives, an ultra-wealthy trader within the arcology who made a fortune in the sale of human bodies, for the new Barony. The man, a portly and unintimidating man that hides a razor-sharp mind behind his fat and an expensive suit, smiles full of teeth as you announce your decision to a waiting crowd of elites. After you go through the formalities and hand him the golden band that'll represent his symbol of office, he shakes your hand vigorously, still smiling devilishly. The next day, the newly-appointed Baron sends you a platter of expensive gifts and foreign candies, complimented with a <span class="green">massive direct deposit to your bank account.</span> You can't help but feel that such a crafty fox might use his new power to <span class="red">corner the market</span> in his barony, though.`;
		}

		function bureaucrat() {
			V.arcologies[0].prosperity += 3;
			return `You select an unimportant but accomplished bureaucrat within the lower ranks of your administration, one of the cornerstone accountants that keeps the trains running on time. The rail-thin woman is clearly surprised that you'd choose her over a wealthier, more influential elite, but nevertheless accepts the golden band with overflowing joy. Although she may not turn any eyebrows, you can tell without a fact that she'll <span class="green">keep your arcology efficient and prosperous</span> – after all, if it collapses, then her 'guaranteed' barony vanishes too.`;
		}

		function veteran() {
			repX(+2500, "event");
			V.arcologies[0].prosperity += 1;
			return `You select one of your Imperial Knights, a heavily scarred and muscular man who bears his rose-and-hawk coat of arms like a purple heart on his broad chest. The grizzled soldier is somewhat taken aback at your decision, but regains his composure almost immediately and accepts the golden band of a Baron with a scarred-over smirk. The ex-Knight takes to his new duty with surprising gusto, and quickly proves himself an <span class="green">extraordinarily popular figure</span> among the commoners, who see the scarred and athletic figure both as proof that duty is rewarded in your arcology and as an example of what a proper Imperial noble should be – martial, confident, and nearly unbeatable in a duel.`;
		}
	}
};
