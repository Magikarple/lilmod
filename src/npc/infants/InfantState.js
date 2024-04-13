/**
 * Contains a list of the properties the infant object has
 * May need another look-over
 */
App.Facilities.Nursery.InfantState = class InfantState {
	constructor() {
		/** Child's current name
		 * @type {FC.Zeroable<string>} */
		this.slaveName = "blank";
		/** Child's current surname
		 * @type {FC.Zeroable<string>} */
		this.slaveSurname = 0;
		/** @type {FC.GenderGenes} */
		this.genes = "XX";
		this.pronoun = App.Data.Pronouns.Kind.female;
		/** slave's natural genetic properties */
		this.natural = new App.Entity.GeneticState();
		/** game week child was acquired.
		 *
		 * _0: Obtained prior to game start / at game start_ */
		this.weekAcquired = 0;
		/** Child's ID */
		this.ID = 0;
		this.father = 0;
		this.mother = 0;
		this.daughters = 0;
		this.sisters = 0;
		/** week she was born (int between 0-51) */
		this.birthWeek = jsRandom(0, 51);
		/** How old she really is. */
		this.actualAge = 18;
		/** How old her body looks. */
		this.visualAge = 18;
		/** How old her body is. */
		this.physicalAge = 18;
		/** child's race
		 * @type {FC.Race} */
		this.race = "white";
		/** child's nationality */
		this.nationality = "slave";
		/**
		 * child markings
		 * * "beauty mark"
		 * * "birthmark"
		 * * "freckles"
		 * * "heavily freckled"
		 * @type {FC.Markings}
		 */
		this.markings = "none";
		/**
		 * The infant's eyes
		 * @type {App.Entity.EyeState}
		 */
		this.eye = new App.Entity.EyeState();
		/** hair color */
		this.hColor = "brown";
		/** pubic hair color */
		this.pubicHColor = "brown";
		/** armpit hair style */
		this.underArmHColor = "brown";
		/** eyebrowHColor*/
		this.eyebrowHColor = "brown";
		/** skin color */
		this.skin = "light";
		/** pubic hair style */
		this.pubicHStyle = "neat";
		/** armpit hair style */
		this.underArmHStyle = "neat";
		/**
		 * face attractiveness
		 *
		 * * -96 - : very ugly
		 * * -95 - -41: ugly
		 * * -40 - -11: unattractive
		 * * -10 - 10: attractive
		 * * 11 - 40: very pretty
		 * * 41 - 95: gorgeous
		 * * 96+: mind blowing
		 */
		this.face = 0;
		/**
		 * accepts string (will be treated as "normal")
		 * * "normal"
		 * * "masculine"
		 * * "androgynous"
		 * * "cute"
		 * * "sensual"
		 * * "exotic"
		 * * "feline" (catmod exclusive content)
		 */
		this.faceShape = "normal";
		/**
		 * how addicted to aphrodisiacs slave is - inherited at birth
		 * * 0: not
		 * * 1-2: new addict
		 * * 3-9: confirmed addict
		 * * 10+: dependent
		 */
		this.addict = 0;
		/**
		 * child intelligence
		 * * -100 - -96: borderline retarded
		 * * -95 - -51: very slow
		 * * -50 - -16: slow
		 * * -15 - 15: average
		 * * 16 - 50: smart
		 * * 51 - 95: very smart
		 * * 96 - 100: brilliant
		 */
		this.intelligence = 0;
		/**
		 * * "none"
		 * * "mindbroken"
		 * * "submissive"
		 * * "cumslut"
		 * * "humiliation"
		 * * "buttslut"
		 * * "boobs"
		 * * "sadist"
		 * * "masochist"
		 * * "dom"
		 * * "pregnancy"
		 * @type {FC.Fetish}
		 */
		this.fetish = "none";
		/**
		 * * "none"
		 * * "arrogant": clings to her dignity, thinks slavery is beneath her
		 * * "bitchy": can 't keep her opinions to herself
		 * * "odd": says and does odd things
		 * * "hates men": hates men
		 * * "hates women": hates women
		 * * "gluttonous": likes eating, gains weight
		 * * "anorexic": dislikes eating and being forced to eat, loses weight
		 * * "devout": resistance through religious faith
		 * * "liberated": believes slavery is wrong
		 * @type {FC.BehavioralFlaw}
		 */
		this.behavioralFlaw = "none";
		/**
		 * * "none"
		 * * "hates oral": hates oral sex
		 * * "hates anal": hates anal sex
		 * * "hates penetration": dislikes penetrative sex
		 * * "shamefast": nervous when naked
		 * * "idealistic": believes sex should be based on love and consent
		 * * "repressed": dislikes sex
		 * * "apathetic": inert during sex
		 * * "crude": sexually crude and has little sense of what partners find disgusting during sex
		 * * "judgemental": sexually judgemental and often judges her sexual partners' performance
		 * * "neglectful": disregards herself in sex
		 * * "cum addict": addicted to cum
		 * * "anal addict": addicted to anal
		 * * "attention whore": addicted to being the center of attention
		 * * "breast growth": addicted to her own breasts
		 * * "abusive": sexually abusive
		 * * "malicious": loves causing pain and suffering
		 * * "self hating": hates herself
		 * * "breeder": addicted to being pregnant
		 * @type {FC.SexualFlaw}
		 */
		this.sexualFlaw = "none";
		/** 0: does not have; 1: carrier; 2: active
		 * * heterochromia is an exception. String = active
		 * @type {FC.GeneticQuirks}
		 */
		this.geneticQuirks = {
			/** Oversized breasts. Increased growth rate, reduced shrink rate. Breasts try to return to oversized state if reduced. */
			macromastia: 0,
			/** Greatly oversized breasts. Increased growth rate, reduced shrink rate. Breasts try to return to oversized state if reduced.
			 *
			 * **macromastia + gigantomastia** - Breasts never stop growing. Increased growth rate, no shrink rate. */
			gigantomastia: 0,
			/** is prone to having twins, shorter pregnancy recovery rate */
			fertility: 0,
			/** is prone to having multiples, even shorter pregnancy recovery rate
			 *
			 * **fertility + hyperFertility** - will have multiples, even shorter pregnancy recovery rate */
			hyperFertility: 0,
			/** pregnancy does not block ovulation, child can become pregnant even while pregnant */
			superfetation: 0,
			/**
			 * abnormal production of amniotic fluid
			 * only affects fetuses */
			polyhydramnios: 0,
			/** Pleasurable pregnancy and orgasmic birth. Wider hips, looser and wetter vagina. High pregadaptation and low birth damage. */
			uterineHypersensitivity: 0,
			/** inappropriate lactation*/
			galactorrhea: 0,
			/** Is abnormally tall. gigantism + dwarfism - is very average*/
			gigantism: 0,
			/** Is abnormally short. gigantism + dwarfism - is very average*/
			dwarfism: 0,
			/** retains childlike characteristics*/
			neoteny: 0,
			/** rapid aging
			 *
			 * **neoteny + progeria** - progeria wins, not that she'll make it to the point that neoteny really kicks in */
			progeria: 0,
			/** has a flawless face. pFace + uFace - Depends on carrier status, may swing between average and above/below depending on it */
			pFace: 0,
			/** has a hideous face. pFace + uFace - Depends on carrier status, may swing between average and above/below depending on it */
			uFace: 0,
			/** has pale skin, white hair and red eyes */
			albinism: 0,
			/** may have mismatched eyes */
			heterochromia: 0,
			/** ass never stops growing. Increased growth rate, reduced shrink rate. */
			rearLipedema: 0,
			/** has (or will have) a huge dong */
			wellHung: 0,
			/** constantly gains weight unless dieting, easier to gain weight. wGain + wLoss - weight gain/loss fluctuates randomly */
			wGain: 0,
			/** constantly loses weight unless gaining, easier to lose weight. wGain + wLoss - weight gain/loss fluctuates randomly */
			wLoss: 0,
			/** body attempts to normalize to an androgynous state */
			androgyny: 0,
			/** Constantly gains muscle mass, easier to gain muscle. mGain + mLoss - muscle gain/loss amplified, passively lose muscle unless building */
			mGain: 0,
			/** Constantly loses muscle mass, easier to gain muscle. mGain + mLoss - muscle gain/loss amplified, passively lose muscle unless building */
			mLoss: 0,
			/** child can only ever birth girls */
			girlsOnly: 0
		};
		/** chance of generating sperm with a Y chromosome (yields male baby). inherited by sons, with mutation */
		this.spermY = 50;
		/** how many weeks until the child is ready for release */
		this.growTime = 156;
		/** Was the slave born prematurely?
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.premature = 0;
		/** Is the slave a clone? If so, what is the original slave's name?
		 * @type {FC.Zeroable<string>}
		 * 0: no; 1: yes */
		this.clone = 0;
		/** ID she was cloned from */
		this.cloneID = 0;
		/** @type {{skin:string, eyeColor:string, hColor:string}} */
		this.albinismOverride = null;
		/** Slave's inbreeding coefficient */
		this.inbreedingCoeff = 0;
	}
};
