'use strict';
/* INFINITE CABLE v2 - infinite procedural TV from every dimension.
   v2: prestige-grade writing, scripted segments, richer scenes, 18 genres.
   All content generated, all original, all canvas + WebAudio. No assets. */

// ---------------- RNG ----------------
function hashStr(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=(h<<13)|(h>>>19);}return h>>>0;}
function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
class R{
  constructor(seed){this.f=mulberry32(seed);}
  n(){return this.f();}
  i(a,b){return a+Math.floor(this.f()*(b-a+1));}
  pick(a){return a[Math.floor(this.f()*a.length)];}
  chance(p){return this.f()<p;}
  shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(this.f()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
}

// deterministic helpers used by template strings (fixed in v2: actually seeded)
let _rng = Math.random;
function setRng(f){ _rng = f; }
function p(a){return a[Math.floor(_rng()*a.length)];}

// ---------------- word banks (all original) ----------------
const ADJ=['Quantum','Turbo','Mega','Ultra','Hyper','Cosmic','Astral','Neon','Pickled','Inverted','Moist','Sentient','Suspicious','Wobbly','Infinite','Discount','Premium','Haunted','Bionic','Liquid','Frozen','Spicy','Invisible','Recursive','Bureaucratic','Emotional','Portable','Edible','Extreme','Mildly','Certified','Unlicensed','Retro','Synthetic','Organic','Illegal','Chromatic','Ominous','Jumbo','Micro','Lukewarm','Bespoke','Tactical','Farm-Fresh','Overnight','Gentle','Feral','Polite','Heavy-Duty'];
const NOUN=['Blorps','Nuggets','Beans','Worms','Toast','Soup','Socks','Batteries','Spoons','Chairs','Lasagna','Pebbles','Balloons','Gravy','Waffles','Lint','Pickles','Tubes','Cubes','Orbs','Sludge','Muffins','Anchors','Kazoos','Doorknobs','Marshmallows','Cacti','Goggles','Pudding','Springs','Helmets','Noodles','Tractors','Umbrellas','Marbles','Croutons','Robots','Hamsters','Crayons','Mops'];
const PLACE=['Blorp City','New Zanthar','Greep Falls','Sector 9G','Cranium Heights','Old Squanchville','Port Mumbis','Lake Vexor','The Moist Zone','Downtown Flarp','Upper Crustonia','Sector 12','Moonbase Delta','Plumbus Heights','Glapton Bay','Fort Wizzle','Lower Hexagon','The Beige District','Quasar Hills','Snorb Township'];
const FIRST=['Glorp','Brenda','Xarthan','Mabel','Zorp','Kevin','Unit-7','Grandma','Blip','Chet','Yolanda','Skronk','Agent','Professor','Dennis','Qwix','Loretta','Bim','Sarge','Wanda','Marlowe','Sandra','Derek','Felix','Agnes','Bort'];
const LAST=['McGlavin','von Schplint','the Third','Jr.','Blastbody','of Dimension 9','Wexley','Grumbles','the Unmovable','Zorak','Fenwick','Prime','the Moist','Kranston','Oofley','Skibbles','the Magnificent','Blobman','Trask','Pebbleton'];
const CURRENCY=['glorps','shmekels','blips','crons','flurbos','wobblers','quatloos','zonks','meep-meeps','bux'];
function fill(t){return t.replace(/\$\{A\}/g,()=>p(ADJ)).replace(/\$\{N\}/g,()=>p(NOUN)).replace(/\$\{P\}/g,()=>p(PLACE)).replace(/\$\{F\}/g,()=>p(FIRST)).replace(/\$\{L\}/g,()=>p(LAST)).replace(/\$\{C\}/g,()=>p(CURRENCY)).replace(/\$\{a\}/g,()=>p(ADJ).toLowerCase()).replace(/\$\{n\}/g,()=>p(NOUN).toLowerCase()).replace(/\$\{p\}/g,()=>p(PLACE).toLowerCase());}

// ---------------- hand-written content (v2) ----------------
const HEADLINES=[
'Local man teaches gravity to juggle; gravity drops everything',
'Mayor declares Tuesday "emotionally optional"',
'Sentient fog unionizes downtown, demands better visibility',
'Scientists discover new color; it is called "grue" and it is furious',
'Time travelers warn that yesterday was rigged',
'Area couch achieves consciousness, immediately refuses to stand',
'The ocean has been returned to factory settings',
'Man wins staring contest with statue; statue files appeal',
'Wizard union on strike: all spells at 30% capacity',
'Birds announce they have been "in charge all along"',
'City installs second moon; residents call it "showing off"',
'Retired volcano comes out of retirement for one last job',
'Woman trains goldfish for marathon; goldfish files complaint',
'Silence no longer golden; trading at bronze by close of markets',
'Study finds 100% of studies are conducted by the extremely tired',
'Man sues own echo for repeating "exactly what he said"',
'Underground city discovered beneath existing underground city',
'Library book returns itself 40 years late, pays own fine in coins',
'The number 7 retires; 8 expected to absorb its duties',
'Cheese futures collapse after moon distance revised upward',
'Knight in shining armor blinds three at noon parade',
'Clouds file restraining order against kites',
'Man claims his dog can talk; dog denies everything',
'Local bridge enters therapy for "commitment issues"',
'Invisible man arrested for loitering; jury cannot confirm attendance',
'Ant colony purchases tiny ant farm "for the irony"',
'Retired superhero refuses to say what he retired from',
'Town renames itself to win bet; details of bet unclear',
'Squirrels announce quarterly nut surplus; markets rally',
'Man builds ladder to heaven, cited for zoning violation',
'Portal in city hall pantry voted employee of the month',
'Local cloud wins small claims case against picnic',
'Breaking: everything fine, officials confirm nervously',
'Mayor unveils plan to move entire city six feet to the left',
'Grandmother outruns train again; train demands rematch',
];
const TICKER_EXTRA=[
'SPORTS: ${P} defeats ${P} on penalties, vibes, and technicalities',
'MARKETS: ${C} up 4%, ${C} down everything',
'TRAFFIC: the bridge is emotionally unavailable, use the tunnel',
'LOTTERY: winning numbers are 4, 8, 15, 16, 23, and "surprise"',
'ALERT: the moon is closer than it appears. Do not approach the moon',
'COMMUNITY: ${P} bake sale raises enough to unban pudding',
'SCIENCE: local lab accidentally discovers a slightly better Tuesday',
'OBITUARY: the weekend, 2 days old, mourned by millions',
];
const MONOLOGUE=[
'Great crowd tonight! Or one crowd in several trench coats. Security is checking.',
'Big news: the city installed a second moon. Yeah! Because the first one was doing SUCH a great job.',
'I had a quantum mechanic look at my car. He fixed it, and it was already broken again before I paid him.',
'My grandmother is 400 years old. Or she is four grandmothers in a stack. We do not ask questions at holidays.',
'They say the multiverse is infinite. Then why can I never find parking? Explain that, scientists.',
'I bought a self-help book from a parallel dimension. Chapter one: "You are doing great in dimension 7." I live HERE. Thanks for nothing, book.',
'The mayor declared Tuesday emotionally optional. I have been doing that for YEARS. Where is my parade?',
'A sentient fog unionized downtown. Their demand? Better visibility. I wish my writers were that good.',
'My doctor says I need more iron. So I ate a bicycle. We are both in custody now.',
'Dating in the multiverse is hard. Every first date: "So, are you my soulmate, or your own evil twin?" Every. Time.',
'I saw a guy walking five dogs today. Beautiful. Turns out they were walking HIM. To court. He owed them money.',
'The number 7 retired this week. Pour one out for 7. Or pour seven out. It would have wanted that.',
'Someone asked if I believe in love at first sight. I said I believe in naps at first sight. The rest is paperwork.',
'A local couch achieved consciousness and immediately refused to stand. Finally, a role model.',
'The birds announced they have been in charge all along. Honestly? Explains the meetings.',
'I asked the universe for a sign. It sent a billboard that said "SIGNS: 3 FOR $5." So I bought three.',
'My horoscope said "beware of ladders." I spent all day on the roof. You have to confront fear at the source.',
'Scientists discovered a new color called grue. It is furious. So is my printer, which cannot print it.',
'I joined a gym in dimension 9. Lost 12 pounds. Turns out pounds weigh less there. Gained it all back at customs.',
'Big storm tomorrow: sideways hail. SIDEWAYS. The weather here has commitment issues.',
'A man built a ladder to heaven and got a zoning violation. Heaven issued a statement: "no comment, but wow."',
'My neighbor trained his goldfish for a marathon. The goldfish filed a complaint. The complaint won. The goldfish is the neighbor now.',
];
const GUESTS=[
{name:'the woman who married a lighthouse',lines:[['So. The lighthouse. How is he?','Tall. Bright. Emotionally distant. We are very happy.'],['Does the Coast Guard approve?','They attended the wedding. The foghorn cried.']]},
{name:'a man who taught algebra to a horse',lines:[['Your horse can do algebra?','She can solve for X. She refuses to solve for Y. Personal reasons.'],['What is next for her?','Calculus. And the Kentucky Derby. In that order.']]},
{name:'a ghost who is afraid of the dark',lines:[['You are a ghost... afraid of the dark?','The dark is full of ghosts. Do the math.'],['What scares you most?','Basements. Other ghosts love basements. I get it, but no.']]},
{name:'a professional line-stander',lines:[['You stand in lines... professionally?','I have waited in lines on four continents and one moon.'],['Longest wait?','Eleven years. The store closed in year two. The line remains. I remain.']]},
{name:'the inventor of the left-handed spoon',lines:[['A spoon. For left-handed people.','The soup was biased for too long.'],['Any regrets?','One. The fork. I see now that the fork did not need it.']]},
{name:'a lawyer for houseplants',lines:[['You represent... plants. In court.','Ferns have rights. Read the Fernstitution.'],['Win rate?','Plants never settle. Plants never lose.']]},
];
const SOAP_EXCHANGES=[
[['You knew about the portal in the pantry this WHOLE time?','I was going to tell you at breakfast.','We HAVE no breakfast. The portal ate it!']],
[['The DNA results are in.','And?','You are 40% pudding.','...Which 40%?']],
[['I saw you at the docks. With my clone.','That was not your clone. That was ME.','Then who did I yell at this morning?!']],
[["I'm leaving you for your alternate self.",'But I AM my alternate self!','Then explain the mustache.']],
[['You promised the egg would never hatch.','Things change.','It is in the kitchen. It is WEARING your apron.']],
[['I only married you for your collection of antique screams.','Then our love was curated after all.']],
[['The lawyer called. The divorce is final.','But we are not married.','Apparently we WERE. In writing. Fancy.']],
[['You cannot keep a baby dragon a secret forever.','He is not a baby. He is a compact adult.','HE SET THE MAIL ON FIRE.']],
[['Remember our wedding vow? "Till debt do us part"?','The debt is paid.','You MONSTER.']],
[['I know your secret. You cry at soup commercials.','The soup was LONELY.']],
[['Your mother is moving in.','Which mother?','THE TALL ONE.','She is not tall. She is just closer than she appears.']],
[['I have been writing you letters for twenty years.','I never got them.','I never sent them. I do not know your address. We live together.']],
[['The fortune teller said I would marry a fool.','That is so sweet.','She was WRONG. You are THREE fools in a coat.']],
[['I sold the house.','We LIVE in the house!','Not anymore. That is the beauty of selling.']],
];
const SOAP_CLIFF=['TO BE CONTINUED: the egg is speaking now.','NEXT WEEK: someone is definitely taller than they were.','TO BE CONTINUED: the portal has a lawyer.','NEXT: the pudding percentage goes up.','TO BE CONTINUED: the third fool removes the coat.'];
const QUESTIONS=[
{q:'What is the capital of the Moist Zone?',a:['Splosh','Dampington','Moist City','Wetburg']},
{q:'How many knees does the average flabbit have?',a:['Two','Eleven','None - it is all elbow','Yes']},
{q:'Complete the proverb: "A glorp in the hand is worth..."',a:['two in the void','nothing, legally','a firm handshake','the entire moon']},
{q:'Which of these is illegal in Dimension 12?',a:['Whistling at soup','Being Tuesday','Tall hats','All of the above, coward']},
{q:'What powers the city of Greep Falls?',a:['Spite','One very long cord','Screaming, ethically','Hamsters, unethically']},
{q:'A train leaves at 3pm traveling backwards in time. When does it arrive?',a:['Yesterday-ish','Never, it is shy','4pm, but smugger','Soup o\'clock']},
{q:'What is the national bird of Planet Janet?',a:['The regret gull','Janet','A chair','No birds. Only gossip']},
{q:'Finish the law: "No person shall, on a Tuesday, ____"',a:['enjoy pudding','become the sea','own two shadows','hum responsibly']},
{q:'What does the M in M-Theory stand for?',a:['Moist','Marbles','Probably marbles','Kevin']},
{q:'Where does the sidewalk end?',a:['At the void','Where it is TOLD','Behind you','In your heart (taxes due)']},
{q:'What is 6 + 7 in Dimension 9?',a:['13','Also 13, but louder','A felony','Purple']},
{q:'The Great Lint Famine ended when...',a:['the pockets surrendered','dryers were invented','nobody is sure','the lint called it even']},
];
const BUZZ=['We will accept that!','Ooh, the judges are conferring... the judges accept it!','WRONG. But confident. Points for confidence.','That is... technically a sentence. Points!','The audience says yes. The law says no. The judges say YES!'];
const DRAMA_LINES=[
'The ledger is wet, Marlowe. Everything we built. Wet.',
'You want the truth? The truth moved out. Left no forwarding address.',
'I did not choose the orb life. The orb life chose the guy next to me. I took over.',
'In this town, soup is currency and currency is soup. Do not mix them up. I did. Once.',
'He said he would be back before the moon divorced us. Well. The papers came Tuesday.',
'I have seen things. Mostly paperwork. But the things were ON the paperwork.',
'The council meets at midnight. Bring your own chair. Last time somebody forgot. We do not talk about Derek anymore.',
'You think the fog works for nobody? The fog works for SOMEONE, Sandra.',
'I came here to forget. The town would not let me. It kept mailing me reminders.',
'That door has been locked for forty years. Not to keep something in. To keep the key from feeling powerful.',
'We buried the secret at dawn. The secret called at noon. It wants to come home.',
'Every family has a legacy. Ours is a drawer full of other people\'s spoons.',
'The prophecy was clear. Unfortunately it was written in pudding, and the pudding has... settled.',
'You can leave this town any time. The town just comes with you. Ask anyone who left. They are here.',
'I trust three things: gravity, soup, and the look on your face right now.',
'Chapter four. It was always going to be chapter four.',
];
const DRAMA_EPS=['Chapter One: The Wet Ledger','Chapter Two: Derek\'s Chair','Chapter Three: Spoon Inheritance','Chapter Four: Fog Contracts','Chapter Five: The Pudding Prophecy','Chapter Six: Noon Phone Calls','Chapter Seven: The Long Goodbye to a Short Pier','Chapter Eight: Legacy of Gravy'];
const CASES=[
{claim:'says the defendant\'s rooster screams in a made-up language',wit:'The rooster has an ACCENT. That is different, and you know it.',verd:'The rooster will attend night school.'},
{claim:'accused of hogging the good timeline',wit:'He saw the timeline first, but he did NOT call dibs.',verd:'Timelines to be shared on alternating Tuesdays.'},
{claim:'says the neighbor\'s shadow keeps entering the yard uninvited',wit:'The shadow does its own thing. It pays no rent.',verd:'The shadow is fined 40 crons and must wave politely.'},
{claim:'bought a haunted toaster; ghost was not disclosed at purchase',wit:'The ghost TOASTS things. It is the best toaster I have ever owned.',verd:'The ghost receives co-ownership. Case dismissed warmly.'},
{claim:'wants a recount on a case where the defendant\'s dog testified',wit:'The dog had notes. Organized notes.',verd:'The dog\'s testimony stands. The dog is also promoted.'},
{claim:'ex-roommate left and took every single left sock',wit:'He needed them for a project. He would not say more.',verd:'Socks returned by the next full moon. The other moon.'},
{claim:'says a mime\'s invisible box is blocking the plaintiff\'s actual door',wit:'I have been knocking on an invisible wall for SIX YEARS.',verd:'The mime must install a doorbell on the box.'},
{claim:'defendant keeps winning arguments by being taller',wit:'It is a real advantage and frankly I resent it.',verd:'Court orders everyone to remain seated at all times.'},
];
const NATURE_LINES=[
'Here, in the amber light of ${planet}, the ${critter} begins its daily routine: standing perfectly still and panicking internally.',
'It can detect a single crumb of ${noun} from four dimensions away. It will share this crumb with no one.',
'Astonishing: it has evolved ${knees} knees, and uses none of them. The scientific community is furious.',
'The mating call of the ${critter} can be heard for miles. It is, frankly, a lot.',
'It mates for life. Its life is 45 minutes. The romance is efficient.',
'A predator approaches. The ${critter} deploys its only defense: aggressive eye contact.',
'Each night it burrows into warm ${noun}, dreaming of a world with fewer documentaries.',
'Winter is coming. The ${critter} has prepared nothing. We relate to this deeply.',
'It travels thirty miles a day. It has nowhere to go. It simply enjoys the drama.',
'And so the ${critter} screams into the void. The void, as always, does not answer. Nature is beautiful.',
];
const CRITTER_ADJ=['six-legged','translucent','extremely round','backwards-flying','upside-down','perpetually startled','invisible-ish','screaming','polyhedral','smug'];
const CRITTER_NOUN=['snurb','flabbit','gromble','weepul','zank','moldwarp','skizzle','borf','quangle','thwomp','nib','ploo'];
const EXERCISES=['THE FLARP (a squat, but emotionally)','VOID JACKS','GRAVITY PUSH-UPS (gravity set to 2x)','THE SCREAMING LUNGE','PORTAL PLANKS','MOIST MOUNTAIN CLIMBERS','THE INVISIBLE JUMPROPE','SIDEWAYS BURPEES'];
const GYM_LINES=['FEEL THE BURN IN ALL ELEVEN DIMENSIONS!','Your past self is watching. Disappoint them LESS!','Hydrate! With water this time!','You are doing great! Probably! We cannot see you!','Pain is just your body applauding! Loudly!','If it does not hurt, the void is winning!','Sweat is just your doubt leaving! Keep the door open!','Almost there! "There" is a state of mind! A painful one!'];
const DOCUS=[
{topic:'The Great Lint Famine of 1887',lines:['For seven years, the pockets of ${P} stood empty.','Families hoarded lint in floorboards. Children forgot what lint was.','Then, one spring morning, a dryer was invented in a barn outside town.','The barn is a museum now. The lint is free. We do not take it for granted.']},
{topic:'The Sensible Shoe Riots',lines:['It began, as it always begins, with arch support.','The cobblers wanted comfort. The people wanted drama. Both marched.','By winter, a compromise: shoes that are sensible, but LOUD.','We wear them still. Listen. You can hear history squeaking.']},
{topic:'The Pudding Standard Crisis',lines:['When the economy came off the pudding standard, nobody noticed for six months.','Then the spoons stopped circulating. That is when we knew.','The vaults were opened. Inside: pudding. Expired. Unclaimed. Magnificent.','Economists call it "the wobble." Grandmothers call it "Tuesday."']},
{topic:'The Great Umbrella Shortage',lines:['Rain fell. Humanity looked up. There was nothing to hold.','One umbrella remained, displayed in a bank, guarded by two tired men.','It rained for nine years. The men became legends. The umbrella became a flag.','Today we build umbrellas first and houses second. We learned.']},
{topic:'The War of the Two Moons',lines:['Neither moon wanted the job. Both were hired.','For a century they fought the only way moons can: passive-aggressive tides.','The oceans filed for neutrality. The fish abstained.','Peace came at last when both moons were given weekends off.']},
{topic:'The Silence of 1922',lines:['For one full day, nobody in ${P} spoke. Not from protest. Everyone was simply busy.','Visitors described it as "restful" and "deeply suspicious."','The next morning, everyone talked at once. The noise bent a church bell.','The bell is still bent. We ring it every year. It says: enough.']},
{topic:'The Cheese Reformation',lines:['One man nailed ninety-five cheeses to a cathedral door.','The cheeses were mild. The message was not.','Wheels rolled in the streets. The mild rose up against the sharp.','From the rind, a new age. We are all a little grated now.']},
{topic:'The Great Balloon Ascent',lines:['They rose slowly, waving, and were never seen again.','Postcards arrive to this day. The handwriting improves with altitude.','Some say they founded a city in the clouds. Some say the clouds founded them.','Every child who lets go of a balloon is, technically, sending mail.']},
];
const ATTACKS=['FINAL FLARP CANNON','THOUSAND SPOON STANCE','MOIST PALM STRIKE','GRAVITY POUT','ULTIMATE GRANDMA BEAM','SEVEN-EON SLAP','BLORP STYLE: HIDDEN GRAVY','FORBIDDEN TECHNIQUE: POLITE NOD'];
const ANIME_LINES=[
'You cannot defeat me! I have trained for SEVEN EONS!',
'His power level... it is... a REASONABLE amount!',
'This is not even my final form. This is my third-to-final form. There are many forms.',
'I promised Grandma I would win this tournament and finish my soup. I intend to do BOTH.',
'You fight well. Almost as well as my rival. Who is also me. From next Thursday.',
'The void chose me! Also I applied! There was an interview!',
'Nobody understands my pain! Except my therapist! She is VERY good!',
'If I fall here... who will water my enormous cactus?!',
];
const ANIME_NEXT=['NEXT TIME: an even bigger spoon.','NEXT EPISODE: the cactus remembers.','NEXT TIME: Grandma watches. Grandma judges.','NEXT EPISODE: the rival is early. It is next Thursday already.'];
const CRITICS=['"A triumph of geometry." - The Blorp City Times','"I watched it twice. On purpose." - Someone\'s uncle','"The soup scene changed me." - Moist Weekly','"Bold. Wet. Unnecessary." - The Daily Orb','"Five stars." - The director\'s mom','"A film." - A critic','"I laughed, I cried, I aged." - Quasar Hills Gazette','"Technically a movie." - The Beige District Herald'];
const TESTIMONIALS=[
'"I bought three. I do not know why. It whispered to me." - Brenda, Sector 9G',
'"Changed my life. I am now legally a different person." - Chet, Downtown Flarp',
'"It arrived broken. Best purchase I ever made." - Mabel, Greep Falls',
'"My landlord no longer recognizes me. Five stars." - Kevin, The Moist Zone',
'"I was skeptical. Then I was not. Then I was hungry. Four stars." - Yolanda, Port Mumbis',
'"It does one thing. It does it constantly. Help." - Dennis, Sector 12',
'"I gave it to my mother. She gave it back. It is in my kitchen again." - Loretta, Old Squanchville',
'"Works exactly as described. That is the problem." - Sarge, Fort Wizzle',
];
const PITCH_HOOKS=['Tired of this? Us too.','But wait - there is more. There is ALWAYS more.','Not available in stores. Or most realities.','Operators are standing by. They have been standing for weeks. Please call.','Order now and get a SECOND one, absolutely suspicious!','Call in the next 10 minutes and nothing extra happens - but you will FEEL faster.','Assembled by hand. The hands are fine. Do not worry about the hands.','Clinically proven to exist!'];
const PRODUCT_TMPL=['${A} ${N} 3000',"${F}'s ${A} ${N}",'The ${N}-O-Matic','${A} ${N} in a Can','i${N} Pro Max','${N} Buddy','${A} ${N}: Home Edition','The Pocket ${N}'];
const SLOGANS=['Now with 40% more ${n}!','As seen on no other dimension!','Side effects may include ${a} ${n}.','Batteries not included. Soul not included.','Warning: may become ${a}.','Ask your doctor if ${n} is right for you.','Not legal in ${P}. Or ${P}.',"If it screams, it's working!",'The ${n} of the future, today, yesterday only.','So simple, a flabbit could use it. Flabbits love it.'];
const LYRICS=['you are my ${a} ${n}, my only ${n}','i put my ${n} in, i put my ${n} out','scream if you love ${n}','${n} in the streets, ${n} in the sheets','we built this city on ${n} and regret','my heart goes ${n}, my heart goes ${n}','every breath you take, every ${n} you make','is this the real life, is this just ${n}','sweet ${n} of mine','all you need is ${n} (and a permit)','i will always love ${n}','never gonna give you ${n}, never gonna give you ${n}'];
const MUSIC_GENRES=['GLORPSTEP','VOID COUNTRY','SCHWIFTY POLKA','ACID JUG BAND','MOISTWAVE','CRON ROCK','BLIP HOP','DOOM LULLABY','DESK POP','SPOONCORE'];
const SONG_STRUCT=['VERSE','CHORUS','VERSE','CHORUS','BRIDGE (emotional)','GUITAR SOLO (a kazoo)','CHORUS x2','OUTRO (fading, like us all)'];
const PLAYS=['${A} breaks three tackles and a small law of physics! TOUCHDOWN!','Oh no - the orb has achieved sentience mid-play! That is a foul!','${A} shoots! The ball refuses! Incredible scenes!','A timeout is called so everyone can emotionally recover.','The referee consults the ancient rulebook. The rulebook says "no."','${B} counters with the forbidden formation! The crowd gasps in unison!','Down to the wire! The wire is wet! Nobody knows why!','${A} scores! The scoreboard apologizes and updates!','Halftime approaching! The marching band is one guy, but he is TRYING!','The crowd does the wave! The wave becomes self-aware and leaves the stadium!'];
const SPORTS=['Blernsball','Gromit Racing','Competitive Screaming','Zero-G Jai Alai','Moist Wrestling','Orb Golf','Extreme Waiting','Bureaucracy Ball','Turbo Chess Boxing','Lava Tag','Professional Queueing','Soggy Volleyball'];
const TEAMS=['${P} ${N}','${A} ${N}s','${P} Screamers','${N} United','${P} ${A}s','Real ${P}','${P} Wanderers','Athletic ${P}','${P} Rovers','Dynamo ${P}'];
const MOVIES=['${A} ${N}: The Movie','${N} Harder','Attack of the ${A} ${N}s','The ${N} Who Loved Me, Legally','${N} Club','Sleepless in ${P}','The Fast and the ${A}','${N}-nado','My Dinner with ${F}','${N} Story 4: The ${A}tening','Guardians of the ${N}','The ${A}shank Redemption','${F}: A ${N} Story','The Silence of the ${N}s','Jurassic ${N}','The ${N}father'];
const TRAILER_BEATS=['IN A DIMENSION...','WHERE ${a} ${n} IS LAW','ONE HERO','ONE DESTINY','ONE VERY CONFUSED ${n}','THIS ${month}','${F} ${L}','IS','${movieCaps}','${critic}','COMING SOMETIME. SOMEWHERE.'];
const MONTHS=['SPRING','SUMMER','FALL','WINTER','TUESDAY','THE MOIST SEASON','WHEN THE MOONS ALIGN','SOONISH'];
const CARTOONS=['${F} and the ${A} ${N}','Captain ${N}','The ${A} Hour','${N} Squad','Baby ${F}: Private Eye','${N} Force Go!','The Misadventures of ${F} ${L}','${N} Patrol','${F} vs. the Void','Lil ${N} University'];
const CARTOON_WORDS=['SKREE!','BLOOP!','WARK!','MEEP!','ZOINK!','FLARP!','HONK!','SPLORCH!','BONK!','YEET!'];
const CARTOON_CARDS=['MEANWHILE, AT THE VOID...','LATER THAT EON...','SUDDENLY: GRAVY.','MEANWHILE, UNDERNEATH EVERYTHING...','THREE SOUPS LATER...','BACK AT THE LAIR (it is a condo)...'];
const CARTOON_EPS=['The Great Pudding Heist','A Fistful of Marbles','The Balloon Incident','Gravy Boat Rising','The Floor Is Legal','One Small Step for ${F}','The Kazoo Ultimatum','Night of the Living Laundry'];
const TALKSHOWS=['Late Night with ${F} ${L}','The ${F} Show','${F} After Dark','The ${A} Report','${N} Talk Live','${F} at Midnight-ish','The Very Late Show with ${F}'];
const GAMESHOWS=['Who Wants to Eat a ${N}?','Wheel of ${N}','The ${A} Is Right','${N} Feud','Are You Smarter Than a ${N}?','Jeopardy: ${A} Edition','The Price Is ${A}','${N} or No ${N}'];
const PLANETS=['Xerblon-7','Meeps','The Beige Planet','Carbuncle Prime','Omicron Flarp','Squanch Minor','Zog','Planet Janet','Gleepus','The Oblong World','Nimbus Rex','Churnia'];
const WEATHER_CONDS=['raining ${N}','${A} fog with pockets of screaming','light ${N} showers turning ${A} by dusk','sideways hail','temporal drizzle (yesterday expected today)','${A} ${N} storms','clear skies, 4000 degrees','an aurora of pure ${N}','gentle snowfall of ${N}','wind gusts of ${A} ${N}','spontaneous levitation events','a 90% chance of ${N}','${A} skies with a chance of applause','mild, with outbreaks of tiny doors'];
const WEATHER_ALERTS=['THE MOON IS CLOSER THAN IT APPEARS. DO NOT APPROACH THE MOON.','Small craft advisory: gravity may vary by neighborhood.','If you hear the fog chanting, that is normal. Do not chant back.','Umbrella shortage protocols remain in effect. Good luck out there.','Levitation events possible after dusk. Secure pets and grandmothers.'];
const INGREDIENTS=['moon butter','screaming carrots','compressed fog','pre-owned thunder','mild lava','whispered garlic','a single regret','pickled moonbeams','gravity (to taste)','fossilized applause','liquid Tuesdays','dehydrated ocean','freshly caught echoes','ethically sourced shadows','lukewarm starlight','grandmother\'s secret static'];
const COOK_STEPS=['Pre-heat the void to ${temp} degrees','Fold in the ${ing} gently, like an apology','Whisk until it stops screaming','Season with ${ing} and one (1) courage','Let it rest. It has been through a lot','Sear on high until it apologizes','Plate with confidence you do not feel','Serve immediately, or flee'];
const TASTE=['Mmm. Complex. It bit me back, but respectfully.','Bold. Illegal in two dimensions. I love it.','It tastes like a memory I never had. Ten out of ten.','The ${noun} really sings. It is still singing. Security has been called.','Perfection. My grandmother would weep. She is weeping now, remotely.'];
const TEST_MSGS=['DIMENSION DRIFT IN PROGRESS','SIGNAL LOST BETWEEN FOLDS OF REALITY','THE INTERN WITH THE ANTENNA IS ON BREAK','BROADCAST INTERRUPTED BY SENTIENT ${N}','PLEASE STAND BY. FOREVER, IF NEEDED.','THE SHOW IS BEHIND THE WALL. WE ARE NEGOTIATING.','TECHNICAL DIFFICULTIES: THE DIFFICULTIES ARE WINNING','REALITY BUFFERING... 47%... 12%... HOW'];

// ---------------- drawing helpers ----------------
function txt(g,s,x,y,size,color,align,font){g.fillStyle=color;g.font=`bold ${size}px ${font||'"Courier New",monospace'}`;g.textAlign=align||'left';g.textBaseline='middle';g.fillText(s,x,y);}
function wrap(g,s,x,y,maxW,lh,size,color,align){g.font=`bold ${size}px "Courier New",monospace`;g.textAlign=align||'left';g.textBaseline='top';g.fillStyle=color;const words=String(s).split(' ');let line='',yy=y;for(const w of words){const t=line?line+' '+w:w;if(g.measureText(t).width>maxW&&line){g.fillText(line,x,yy);yy+=lh;line=w;}else line=t;}g.fillText(line,x,yy);return yy+lh;}
function starfield(g,W,H,stars,t,drift){g.fillStyle='#fff';for(const s of stars){const x=(s.x+(drift||0)*t*s.z)%1;g.globalAlpha=.3+.7*Math.abs(Math.sin(t*2+s.y*40));g.fillRect(x*W,s.y*H,2,2);}g.globalAlpha=1;}
function blob(g,x,y,r,r2,wob,t,color){g.fillStyle=color;g.beginPath();for(let a=0;a<=Math.PI*2+.1;a+=.35){const rr=r+(r2||0)*Math.sin(a*3+t*2+wob)+r*.06*Math.sin(a*7+t*3);const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr*.9;a===0?g.moveTo(px,py):g.lineTo(px,py);}g.closePath();g.fill();}
function vignette(g,W,H,str){const v=g.createRadialGradient(W/2,H/2,H*.25,W/2,H/2,H*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,`rgba(0,0,0,${str||.6})`);g.fillStyle=v;g.fillRect(0,0,W,H);}
function letterbox(g,W,H,frac){g.fillStyle='#000';const b=H*(frac||.11);g.fillRect(0,0,W,b);g.fillRect(0,H-b,W,b);}
function grain(g,W,H,t,n){g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<(n||40);i++){const x=((i*97.13+t*61.7)%W+W)%W,y=((i*57.31+t*83.3)%H+H)%H;g.fillRect(x,y,1.5,1.5);}}
function grad(g,W,H,c1,c2){const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.fillRect(0,0,W,H);}
// upgraded figure: skin, shirt, tie color, eye direction, mouth openness, optional hat
function dude(g,x,y,s,o){
  o=o||{};const t=o.t||0,open=o.talk?Math.abs(Math.sin(t*9)):.15;
  if(o.hat==='chef'){g.fillStyle='#fff';g.fillRect(x-s*.3,y-s*.62,s*.6,s*.3);g.beginPath();g.arc(x,y-s*.55,s*.24,Math.PI,0);g.fill();}
  if(o.hat==='cap'){g.fillStyle=o.hatColor||'#c33';g.beginPath();g.arc(x,y-s*.26,s*.3,Math.PI,0);g.fill();g.fillRect(x,y-s*.3,s*.42,s*.1);}
  if(o.hat==='wig'){g.fillStyle=o.hatColor||'#666';g.beginPath();g.arc(x,y-s*.16,s*.36,Math.PI*.9,Math.PI*.1);g.fill();}
  g.fillStyle=o.skin||'#f2c89b';g.beginPath();g.arc(x,y,s*.32,0,7);g.fill();
  g.fillStyle=o.shirt||'#334';g.beginPath();g.moveTo(x-s*.58,y+s*.95);g.lineTo(x-s*.34,y+s*.12);g.lineTo(x+s*.34,y+s*.12);g.lineTo(x+s*.58,y+s*.95);g.closePath();g.fill();
  if(o.tie){g.fillStyle=o.tie;g.fillRect(x-s*.05,y+s*.16,s*.1,s*.45);}
  const dx=(o.look||0)*s*.05;
  g.fillStyle='#111';g.beginPath();g.arc(x-s*.11+dx,y-s*.05,s*.045,0,7);g.arc(x+s*.11+dx,y-s*.05,s*.045,0,7);g.fill();
  if(o.brow){g.strokeStyle='#111';g.lineWidth=s*.03;g.beginPath();g.moveTo(x-s*.18,y-s*.16+o.brow*s*.04);g.lineTo(x-s*.04,y-s*.13);g.moveTo(x+s*.04,y-s*.13);g.lineTo(x+s*.18,y-s*.16+o.brow*s*.04);g.stroke();}
  g.fillStyle='#311';g.fillRect(x-s*.1,y+s*.08,s*.2,s*.03+open*s*.09);
}
function person(g,x,y,s,shirt,talk,t){dude(g,x,y,s,{shirt:shirt,tie:'#c22',talk:talk,t:t});}
function bars7(g,W,H,y0,h,colset){const cols=colset||['#f00','#f80','#ff0','#0c0','#0af','#33f','#909'];const bw=W/7;for(let i=0;i<7;i++){g.fillStyle=cols[i];g.fillRect(i*bw,y0,bw,h);}}
function cityscape(g,W,H,y,base,t,hue){for(let i=0;i<14;i++){const bw=W/14,bh=base*(0.3+((i*53)%70)/100);g.fillStyle=`hsl(${hue+i*4},30%,${10+(i%4)*4}%)`;g.fillRect(i*bw,y-bh,bw-2,bh);
  g.fillStyle=`hsla(50,90%,70%,${.25+.25*Math.sin(t*.7+i*2.3)})`;for(let wnd=0;wnd<3;wnd++){if((i+wnd)%3===0)g.fillRect(i*bw+4+wnd*8,y-bh+6+(wnd*13)%Math.max(14,bh-10),4,5);}}}
function ticker(g,W,H,y,text,t,size,color,bg){g.fillStyle=bg||'#02101e';g.fillRect(0,y,W,H-y);const s=String(text);g.font=`bold ${size||13}px "Courier New",monospace`;const tw=g.measureText(s).width||2000;const off=(t*70)%(tw+W);txt(g,s,W-off,y+(H-y)/2,size||13,color||'#8fd');}

// ---------------- genres ----------------
const GENRES=[
// ===== 1. INFOMERCIAL =====
{id:'infomercial',weight:3,
 title:()=>`${fill('${N}')} Shopping Network`,
 make(r){const product=fill(p(PRODUCT_TMPL));
  return {product,tag:fill(p(SLOGANS)),price:`${r.i(3,999)}.${r.i(0,99)}0 ${p(CURRENCY).toUpperCase()}`,lowPrice:`${r.i(1,39)}.99 ${p(CURRENCY).toUpperCase()}`,
   phone:'1-800-'+r.i(100,999)+'-'+fill('${N}').toUpperCase(),hue:r.i(0,359),
   hooks:r.shuffle(PITCH_HOOKS).slice(0,4),tests:r.shuffle(TESTIMONIALS).slice(0,3),
   host:p(FIRST)+' '+p(LAST),
   stars:Array.from({length:60},()=>({x:r.n(),y:r.n(),z:r.n()}))};},
 draw(g,ctx,W,H,t){const seg=Math.floor(t/6)%4,ph=(t%6)/6;
  grad(ctx,W,H,`hsl(${g.hue},60%,13%)`,`hsl(${(g.hue+60)%360},70%,30%)`);
  starfield(ctx,W,H,g.stars,t,.02);
  ctx.save();ctx.translate(W/2,H*.42);ctx.rotate(t*.3);for(let i=0;i<16;i++){ctx.fillStyle=i%2?'rgba(255,255,255,.05)':'rgba(255,220,80,.07)';ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,H*.55,i*Math.PI/8,(i+1)*Math.PI/8);ctx.fill();}ctx.restore();
  // product on pedestal
  const br=42+5*Math.sin(t*4);ctx.fillStyle='rgba(0,0,0,.4)';ctx.fillRect(W*.34,H*.56,W*.32,10);
  blob(ctx,W/2,H*.42,br,6,g.hue,t,'#eee');
  ctx.fillStyle=`hsl(${g.hue},70%,45%)`;ctx.beginPath();ctx.arc(W/2,H*.42,br*.55,0,7);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.arc(W/2-br*.2,H*.42-br*.2,br*.15,0,7);ctx.fill();
  for(let i=0;i<5;i++){const a=t*2+i*1.3;ctx.fillStyle='rgba(255,255,180,.8)';ctx.fillRect(W/2+Math.cos(a)*br*1.2,H*.42+Math.sin(a)*br*1.1,3,3);}
  // host
  dude(ctx,W*.8,H*.47,H*.3,{shirt:'#722',tie:'#fd4',talk:seg!==3,t:t,hat:seg===2?'wig':'',hatColor:'#444'});
  txt(ctx,g.product.toUpperCase(),W/2,26,26,'#ffe14d','center');
  txt(ctx,g.tag,W/2,54,12,'#fff','center');
  // price block with drop
  const dropped=seg>=2;
  ctx.fillStyle='#c00';ctx.fillRect(W*.2,H*.7,W*.6,44);
  txt(ctx,(dropped?'WAS '+g.price+'  -  NOW ':'ONLY ')+(dropped?g.lowPrice:g.price),W/2,H*.7+22,20,'#fff','center');
  if(dropped)txt(ctx,'PRICE SLASHED LIVE ON AIR',W/2,H*.7-14,11,'#ff9','center');
  txt(ctx,'CALL NOW: '+g.phone,W/2,H*.85,14,'#7ff','center');
  // order counter
  txt(ctx,'ORDERS: '+(1200+Math.floor(t*37)),W*.04,H*.78,12,'#8f8');
  if(seg===1||seg===3){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(W*.04,H*.6,W*.4,44);wrap(ctx,g.tests[Math.floor(t/6)%g.tests.length],W*.06,H*.62,W*.36,13,11,'#cfe');}
  ticker(ctx,W,H,H*.95,g.hooks.join('   +++   '),t,11,'#9ab','rgba(0,0,0,.55)');},
 audio:'jingle'},

// ===== 2. NEWS =====
{id:'news',weight:3,
 title:()=>`${fill('${P}')} Action News`,
 make(r){const heads=r.shuffle(HEADLINES).slice(0,4);
  return {anchor:p(FIRST)+' '+p(LAST),reporter:p(FIRST)+' '+p(LAST),net:'CH '+r.i(2,99)+' NEWS',heads,hue:r.i(180,260),
   tick:r.shuffle(HEADLINES.concat(TICKER_EXTRA.map(fill))).slice(0,10),
   field:p(PLACE)};},
 draw(g,ctx,W,H,t){const seg=Math.floor(t/7)%3;
  grad(ctx,W,H,`hsl(${g.hue},55%,10%)`,`hsl(${g.hue},55%,22%)`);
  ctx.globalAlpha=.1;for(let i=0;i<5;i++){blob(ctx,W*(.15+i*.18),H*.3,50+i*10,10,i,t,`hsl(${(g.hue+40)%360},60%,40%)`);}ctx.globalAlpha=1;
  const head=g.heads[Math.floor(t/7)%g.heads.length];
  if(seg===1){
    // field reporter cutaway
    ctx.fillStyle='#0a1420';ctx.fillRect(0,0,W,H*.66);
    cityscape(ctx,W,H,H*.66,H*.4,t,g.hue);
    dude(ctx,W*.3,H*.36,H*.36,{shirt:'#432',talk:true,t:t,look:.6});
    // mic flag
    ctx.fillStyle='#c22';ctx.fillRect(W*.38,H*.5,18,14);txt(ctx,g.net.split(' ')[1],W*.38+9,H*.5+7,8,'#fff','center');
    txt(ctx,'LIVE FROM '+g.field.toUpperCase(),W*.04,H*.08,15,'#7df');
    txt(ctx,g.reporter.toUpperCase()+' - ON THE SCENE',W*.04,H*.62,13,'#ffd');
    ctx.fillStyle='#b00';ctx.fillRect(W*.8,H*.06,70,18);txt(ctx,'LIVE',W*.8+35,H*.06+9,11,Math.floor(t*2)%2?'#fff':'#f99','center');
  }else{
    ctx.fillStyle='#0a1a2a';ctx.fillRect(0,H*.66,W,H*.34);
    dude(ctx,W/2,H*.34,H*.36,{shirt:'#223',tie:'#c22',talk:true,t:t});
    ctx.fillStyle='#0d2b4d';ctx.fillRect(0,H*.6,W,H*.1);ctx.strokeStyle='#3af';ctx.strokeRect(0,H*.6,W,H*.1);
    txt(ctx,g.net,W*.04,H*.08,18,'#7df');
    txt(ctx,'LIVE',W*.9,H*.08,16,Math.floor(t*2)%2?'#f44':'#a22','center');
    txt(ctx,g.anchor.toUpperCase(),W*.04,H*.63,14,'#ffd');
  }
  ctx.fillStyle='#b00';ctx.fillRect(W*.04,H*.7,86,20);txt(ctx,seg===1?'DEVELOPING':'BREAKING',W*.04+43,H*.7+10,11,'#fff','center');
  wrap(ctx,head,W*.04+100,H*.7+2,W*.9-100,15,13,'#fff');
  ticker(ctx,W,H,H*.88,g.tick.join('   +++   '),t,13,'#8fd');},
 audio:'drone'},

// ===== 3. COOKING =====
{id:'cooking',weight:2,
 title:()=>`Cooking with ${p(FIRST)}`,
 make(r){const ings=[...new Set(Array.from({length:6},()=>p(INGREDIENTS)))];
  return {dish:`${p(ADJ)} ${p(NOUN)} a la ${p(FIRST)}`,ings,
   steps:r.shuffle(COOK_STEPS).slice(0,5).map(s=>s.replace('${temp}',r.i(3,999)).replace(/\$\{ing\}/g,()=>p(ings))),
   taste:p(TASTE).replace('${noun}',p(NOUN).toLowerCase()),chef:p(FIRST),hue:r.i(10,50)};},
 draw(g,ctx,W,H,t){const seg=Math.floor(t/5)%(g.steps.length+1);const onTaste=seg===g.steps.length;
  ctx.fillStyle='#2a2118';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#3a2e20';for(let y=0;y<H*.55;y+=34)for(let x=(y/34%2)*20;x<W;x+=40)ctx.fillRect(x,y,38,32);
  ctx.fillStyle='#1a1410';ctx.fillRect(0,H*.55,W,H*.45);
  dude(ctx,W*.76,H*.42,H*.3,{shirt:Math.floor(t*2)%2?'#7a3':'#a33',talk:true,t:t,hat:'chef',brow:onTaste?1:0});
  // stove + pot
  ctx.fillStyle='#111';ctx.fillRect(W*.08,H*.5,W*.4,H*.4);
  ctx.fillStyle='#444';ctx.fillRect(W*.12,H*.44,W*.3,H*.1);
  const glow=.5+.5*Math.sin(t*3);ctx.fillStyle=`rgba(255,${100+80*glow|0},30,${.5+.4*glow})`;ctx.fillRect(W*.14,H*.5,W*.26,8);
  ctx.fillStyle='#666';ctx.beginPath();ctx.ellipse(W*.27,H*.42,70,16,0,0,7);ctx.fill();
  ctx.fillStyle=`hsl(${g.hue},70%,40%)`;ctx.beginPath();ctx.ellipse(W*.27,H*.42,60,11,0,0,7);ctx.fill();
  for(let i=0;i<6;i++){const bx=W*.27-50+((i*37+t*40)%100),by=H*.42-((t*30+i*25)%60);ctx.globalAlpha=Math.max(0,.6-by/H);ctx.fillStyle='#cfc';ctx.beginPath();ctx.arc(bx,by-10,4+3*Math.sin(t*5+i),0,7);ctx.fill();}
  ctx.globalAlpha=1;
  txt(ctx,"TODAY'S DISH:",W*.05,H*.06,14,'#fb4');
  txt(ctx,g.dish,W*.05,H*.12,18,'#ffe');
  if(seg<2){txt(ctx,'INGREDIENTS:',W*.05,H*.2,12,'#9c8');g.ings.forEach((s,i)=>txt(ctx,'- '+s,W*.06,H*.25+i*16,11,'#cdb'));}
  else{txt(ctx,'LOOKING GOOD:',W*.05,H*.2,12,'#9c8');wrap(ctx,'The dish has achieved a color science cannot name. Do not make direct eye contact with it.',W*.05,H*.25,W*.3,14,11,'#cdb');}
  ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,H*.9,W,H*.1);
  txt(ctx,onTaste?'TASTE TEST: '+g.taste:('STEP '+(seg+1)+': '+g.steps[seg]),W/2,H*.95,12,'#ffd','center');},
 audio:'simmer'},

// ===== 4. WEATHER =====
{id:'weather',weight:2,
 title:()=>`${p(ADJ)} Weather Multiverse`,
 make(r){return {planets:Array.from({length:3},()=>({name:p(PLANETS),cond:fill(p(WEATHER_CONDS)),temp:r.i(-900,9000)})),
   main:fill(p(WEATHER_CONDS)),alert:p(WEATHER_ALERTS),week:Array.from({length:5},()=>({d:p(['MON','TUE','WED','THU','FRI','SAT','SUN','???']),c:p(['☀','☂','⚡','☁','☄']),t:r.i(-80,900)}))};},
 draw(g,ctx,W,H,t){const alertOn=Math.floor(t/9)%3===2;
  grad(ctx,W,H,'#061a33','#0a3355');
  txt(ctx,'MULTIVERSE WEATHER',W/2,26,22,'#adf','center');
  const px=W*.3,py=H*.52;
  const pg=ctx.createRadialGradient(px-20,py-20,10,px,py,110);pg.addColorStop(0,'#4af');pg.addColorStop(1,'#124');ctx.fillStyle=pg;ctx.beginPath();ctx.arc(px,py,100,0,7);ctx.fill();
  ctx.globalAlpha=.25;blob(ctx,px+30*Math.sin(t*.4),py-10,40,10,2,t,'#fff');blob(ctx,px-40,py+30+10*Math.sin(t*.6),30,8,4,t,'#fff');ctx.globalAlpha=1;
  ctx.fillStyle='#9df';for(let i=0;i<50;i++){const rx=(i*53+t*90)%W,ry=(i*37+t*140)%H;ctx.globalAlpha=.5;ctx.fillRect(rx,ry,2,6);}ctx.globalAlpha=1;
  g.planets.forEach((pl,i)=>{const y=H*.24+i*64;
    ctx.fillStyle='rgba(0,20,40,.7)';ctx.fillRect(W*.55,y,W*.42,54);
    txt(ctx,pl.name.toUpperCase(),W*.57,y+13,13,'#8fd');
    txt(ctx,pl.cond,W*.57,y+30,10,'#cde');
    txt(ctx,pl.temp+'°',W*.92,y+27,20,pl.temp>1000?'#f84':pl.temp<0?'#8df':'#ff8','center');});
  g.week.forEach((d,i)=>{const x=W*(.1+i*.18);ctx.fillStyle='rgba(0,20,40,.5)';ctx.fillRect(x-28,H*.74,56,44);
    txt(ctx,d.d,x,H*.78,10,'#8fd','center');txt(ctx,d.c,x,H*.85,16,'#fff','center');txt(ctx,d.t+'°',x,H*.91,10,'#ffd','center');});
  if(alertOn){ctx.fillStyle=Math.floor(t*3)%2?'#a00':'#600';ctx.fillRect(0,H*.66,W,20);txt(ctx,'ALERT: '+g.alert,W/2,H*.66+10,10,'#fff','center');}
  ticker(ctx,W,H,H*.95,'TODAY: '+g.main,t,12,'#ffd','rgba(0,0,0,.5)');},
 audio:'wind'},

// ===== 5. NATURE DOC =====
{id:'nature',weight:2,
 title:()=>`Wild ${p(PLANETS)}`,
 make(r){const adj=p(CRITTER_ADJ),noun=p(CRITTER_NOUN),pl=p(PLANETS);
  const vars={'${planet}':pl,'${critter}':adj+' '+noun,'${knees}':r.i(2,40),'${noun}':p(NOUN).toLowerCase()};
  const rep=s=>s.replace(/\$\{planet\}|\$\{critter\}|\$\{knees\}|\$\{noun\}/g,m=>vars[m]);
  return {planet:pl,critter:adj+' '+noun,legs:r.i(2,10),hue:r.i(0,359),eyes:r.i(1,7),narr:r.shuffle(NATURE_LINES).slice(0,6).map(rep)};},
 draw(g,ctx,W,H,t){const li=Math.floor(t/5)%g.narr.length;
  grad(ctx,W,H,`hsl(${g.hue},40%,10%)`,`hsl(${(g.hue+30)%360},45%,26%)`);
  for(let l=0;l<3;l++){ctx.fillStyle=`hsla(${g.hue},30%,${16+l*8}%,1)`;ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=20)ctx.lineTo(x,H*.5+l*46+18*Math.sin(x*.01+l*9+t*.05*(l+1)));ctx.lineTo(W,H);ctx.fill();}
  // behavior by beat: graze / startle / scream
  const mode=li%3;const cx=W*.2+((t*24)%(W*.6)),cy=H*.6+(mode===1?-14*Math.abs(Math.sin(t*10)):6*Math.abs(Math.sin(t*6)));
  ctx.strokeStyle=`hsl(${g.hue},60%,30%)`;ctx.lineWidth=3;
  for(let i=0;i<g.legs;i++){const a=Math.PI*(.25+.5*i/Math.max(1,g.legs-1));const lx=cx+Math.cos(a)*26,ly=cy+Math.sin(a)*10;ctx.beginPath();ctx.moveTo(lx,cy);ctx.lineTo(lx+6*Math.sin(t*8+i),ly+18);ctx.stroke();}
  blob(ctx,cx,cy,30+(mode===2?4*Math.sin(t*14):0),5,1,t,`hsl(${g.hue},60%,45%)`);
  for(let i=0;i<g.eyes;i++){const ex=cx-14+i*(28/Math.max(1,g.eyes-1));ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ex,cy-10,5+(mode===1?2:0),0,7);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(ex+1,cy-10+2*Math.sin(t*3),2.4,0,7);ctx.fill();}
  if(mode===2){ctx.fillStyle='#311';ctx.beginPath();ctx.arc(cx,cy+10,6+3*Math.sin(t*16),0,7);ctx.fill();}
  txt(ctx,'PLANET '+g.planet.toUpperCase(),W*.04,H*.07,16,'#efe');
  txt(ctx,'the '+g.critter,W*.04,H*.13,13,'#9c8');
  ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(0,H*.86,W,H*.14);
  wrap(ctx,'"'+g.narr[li]+'"',W*.06,H*.88,W*.88,15,12,'#ffd');
  vignette(ctx,W,H,.4);},
 audio:'chirp'},

// ===== 6. SOAP OPERA =====
{id:'soap',weight:3,
 title:()=>`The ${p(ADJ)} and the ${p(NOUN)}`,
 make(r){const ex=r.shuffle(SOAP_EXCHANGES).slice(0,2).flat();
  return {a:p(FIRST),b:p(FIRST),lines:ex,cliff:p(SOAP_CLIFF),h1:r.i(0,359),h2:r.i(0,359)};},
 draw(g,ctx,W,H,t){const li=Math.floor(t/4)%g.lines.length,talking=li%2;
  const cliff=Math.floor(t/4)%g.lines.length===g.lines.length-1&&(t%4)>3.1;
  ctx.fillStyle='#241c26';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#31253a';ctx.fillRect(0,H*.7,W,H*.3);
  ctx.fillStyle='#152030';ctx.fillRect(W*.4,H*.1,W*.2,H*.35);ctx.strokeStyle='#567';ctx.strokeRect(W*.4,H*.1,W*.2,H*.35);
  ctx.fillStyle='#ffe';ctx.globalAlpha=.6;ctx.beginPath();ctx.arc(W*.46+2*Math.sin(t*.3),H*.18,7,0,7);ctx.fill();ctx.globalAlpha=1; // moon
  ctx.fillStyle='#553';ctx.fillRect(W*.3,H*.5,W*.4,H*.22);ctx.fillStyle='#665';ctx.fillRect(W*.3,H*.46,W*.4,H*.06);
  const zoom=1+.05*Math.min(1,(t%4)/4)*2;ctx.save();ctx.translate(W/2,H*.5);ctx.scale(zoom,zoom);ctx.translate(-W/2,-H*.5);
  const bounce=i=>i===talking?4*Math.abs(Math.sin(t*7)):0;
  blob(ctx,W*.25,H*.52-bounce(0),46,6,0,t,`hsl(${g.h1},55%,55%)`);
  blob(ctx,W*.75,H*.52-bounce(1),46,6,2,t,`hsl(${g.h2},55%,55%)`);
  [[W*.25,-1,0],[W*.75,1,1]].forEach(([x,d,i])=>{ctx.fillStyle='#000';ctx.beginPath();ctx.arc(x+d*14,H*.5,4,0,7);ctx.arc(x+d*30,H*.5,4,0,7);ctx.fill();
    ctx.fillStyle='#311';ctx.fillRect(x+d*12,H*.58,22,i===talking?6*Math.abs(Math.sin(t*11))+2:2);});
  ctx.restore();
  txt(ctx,'THE '+g.a.toUpperCase()+' SAGA',W*.04,H*.06,14,'#d9b');
  if(cliff){ctx.fillStyle='rgba(0,0,0,.85)';ctx.fillRect(0,0,W,H);
    txt(ctx,g.cliff,W/2,H/2,18,'#ffd24d','center');txt(ctx,'(organ sting)',W/2,H/2+30,11,'#977','center');return;}
  ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,H*.82,W,H*.18);
  txt(ctx,(talking?g.b:g.a).toUpperCase()+':',W*.06,H*.87,12,'#9bd');
  wrap(ctx,g.lines[li],W*.06,H*.9,W*.88,15,13,'#fff');},
 audio:'pad'},

// ===== 7. MUSIC VIDEO =====
{id:'music',weight:2,
 title:()=>'Multiverse FM '+(88+Math.floor(_rng()*40)+_rng()*0.9).toFixed(1),
 make(r){const lyr=r.shuffle(LYRICS).slice(0,6).map(fill);
  return {song:fill('${A} ${N}')+' (feat. '+p(FIRST)+')',artist:p(FIRST)+' '+p(LAST),genre:p(MUSIC_GENRES),hue:r.i(0,359),lyr,
   struct:SONG_STRUCT};},
 draw(g,ctx,W,H,t){ctx.fillStyle='#050510';ctx.fillRect(0,0,W,H);
  const N=48;for(let i=0;i<N;i++){const h=(H*.3)*Math.abs(Math.sin(t*3+i*.7))*(0.4+.6*Math.abs(Math.sin(t*.9+i)));ctx.fillStyle=`hsl(${(g.hue+i*6)%360},80%,55%)`;ctx.fillRect(20+i*(W-40)/N,H*.65-h,(W-40)/N-3,h);}
  ctx.save();ctx.translate(W/2,H*.3);ctx.rotate(t*.8);for(let i=0;i<6;i++){ctx.rotate(Math.PI/3);ctx.strokeStyle=`hsl(${(g.hue+180)%360},70%,60%)`;ctx.lineWidth=2;ctx.strokeRect(20+8*Math.sin(t*2+i),20,40,40);}ctx.restore();
  txt(ctx,'MULTIVERSE FM',W/2,H*.08,20,'#f8f','center');
  txt(ctx,g.struct[Math.floor(t/6)%g.struct.length],W*.9,H*.08,10,'#678','center');
  txt(ctx,'NOW PLAYING',W/2,H*.76,11,'#9af','center');
  txt(ctx,g.song,W/2,H*.82,16,'#fff','center');
  txt(ctx,g.artist.toUpperCase()+'  -  '+g.genre,W/2,H*.88,12,'#8fd','center');
  const ly=g.lyr[Math.floor(t/3)%g.lyr.length];
  txt(ctx,'♪ '+ly+' ♪',W/2,H*.95,12,'rgba(255,255,255,.8)','center');},
 audio:'synth'},

// ===== 8. SPORTS =====
{id:'sports',weight:2,
 title:()=>`${p(SPORTS)} Tonight`,
 make(r){return {sport:p(SPORTS),tA:fill(p(TEAMS)),tB:fill(p(TEAMS)),sA:r.i(0,30),sB:r.i(0,30),nA:r.i(5,10),
   plays:r.shuffle(PLAYS).slice(0,6).map(s=>s.replace(/\$\{A\}/g,p(FIRST)).replace(/\$\{B\}/g,p(FIRST)))};},
 draw(g,ctx,W,H,t){const replay=Math.floor(t/11)%4===3&&(t%11)<2.4;
  ctx.fillStyle='#143d16';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=2;ctx.strokeRect(20,20,W-40,H-40);ctx.beginPath();ctx.moveTo(W/2,20);ctx.lineTo(W/2,H-20);ctx.stroke();ctx.beginPath();ctx.arc(W/2,H/2,50,0,7);ctx.stroke();
  const sp=replay?.25:1;
  const bx=W/2+W*.4*Math.sin(t*1.7*sp)*Math.cos(t*.9*sp),by=H/2+H*.35*Math.sin(t*2.3*sp);
  for(let i=0;i<g.nA;i++){const px=W/2+Math.sin(t*(0.5+i*.13)*sp+i*2)*W*.42,py=H/2+Math.cos(t*(0.4+i*.17)*sp+i*3)*H*.4;
    ctx.fillStyle=i%2?'#36c':'#c33';ctx.beginPath();ctx.arc(px+(bx-px)*.2*Math.abs(Math.sin(t+i)),py+(by-py)*.2*Math.abs(Math.cos(t*.7+i)),6,0,7);ctx.fill();}
  ctx.fillStyle='#ff0';ctx.beginPath();ctx.arc(bx,by,5+2*Math.abs(Math.sin(t*9)),0,7);ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillRect(W*.04,H*.04,W*.52,40);
  txt(ctx,g.tA.toUpperCase()+' '+(g.sA+Math.floor(t/17)),W*.06,H*.1,15,'#fff');
  txt(ctx,g.tB.toUpperCase()+' '+(g.sB+Math.floor(t/23)),W*.06,H*.16,15,'#fff');
  txt(ctx,replay?'REPLAY':'LIVE',W*.9,H*.08,15,Math.floor(t*2)%2?'#f44':'#822','center');
  txt(ctx,g.sport.toUpperCase()+' - Q'+(1+Math.floor(t/20)%4),W*.9,H*.16,11,'#ffd','center');
  ticker(ctx,W,H,H*.92,g.plays[Math.floor(t/6)%g.plays.length]+'  +++  Final score decided by judges, combat, and vibes',t,11,'#9c9','rgba(0,0,0,.55)');},
 audio:'crowd'},

// ===== 9. TEST PATTERN =====
{id:'test',weight:1,
 title:()=>'Technical Difficulties',
 make(r){return {msg:fill(p(TEST_MSGS))};},
 draw(g,ctx,W,H,t){bars7(ctx,W,H*.7,0,H*.7);
  ctx.fillStyle='#111';ctx.fillRect(0,H*.7,W,H*.3);
  const wob=3*Math.sin(t*30);
  ctx.save();ctx.translate(wob,0);
  ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(W/2,H*.35,80,0,7);ctx.stroke();ctx.beginPath();ctx.arc(W/2,H*.35,55,0,7);ctx.stroke();
  ctx.beginPath();ctx.moveTo(W/2-80,H*.35);ctx.lineTo(W/2+80,H*.35);ctx.moveTo(W/2,H*.35-80);ctx.lineTo(W/2,H*.35+80);ctx.stroke();
  ctx.restore();
  txt(ctx,'PLEASE STAND BY',W/2,H*.78,20,'#fff','center');
  txt(ctx,g.msg,W/2,H*.86,12,'#aaa','center');
  if(Math.floor(t*2)%3===0){ctx.fillStyle='rgba(255,255,255,.06)';for(let i=0;i<8;i++)ctx.fillRect(0,Math.random()*H,W,2);}},
 audio:'tone'},

// ===== 10. MOVIE TRAILER =====
{id:'trailer',weight:2,
 title:()=>fill('Coming Soon: '+p(MOVIES)),
 make(r){const mv=fill(p(MOVIES));
  const cards=TRAILER_BEATS.map(b=>b.replace('${month}',p(MONTHS)).replace(/\$\{movieCaps\}/g,mv.toUpperCase()).replace('${critic}',p(CRITICS)));
  return {movie:mv,cards:cards.map(c=>fill(c)),hue:r.i(190,240)};},
 draw(g,ctx,W,H,t){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  ctx.globalAlpha=.15;for(let i=0;i<3;i++){const l=ctx.createLinearGradient(0,0,W,0);l.addColorStop(0,'transparent');l.addColorStop(.5,`hsl(${g.hue},80%,30%)`);l.addColorStop(1,'transparent');ctx.fillStyle=l;ctx.fillRect(0,(t*40+i*170)%H,W,3);}ctx.globalAlpha=1;
  // quick "scene" flash between cards
  const ci=Math.floor(t/2.5)%g.cards.length;const ph=(t%2.5)/2.5;
  if(ph<.18&&ci>0){ctx.fillStyle=`hsl(${g.hue},60%,${10+ci*3}%)`;ctx.fillRect(0,H*.1,W,H*.8);
    cityscape(ctx,W,H,H*.8,H*.5,t,g.hue);blob(ctx,W*(.2+.6*Math.random()*0+H*((ci%3)/3)/H),H*.5,40,8,ci,t,'rgba(200,220,255,.5)');}
  ctx.save();ctx.translate(W/2,H/2);const sc=.9+.25*ph;ctx.scale(sc,sc);ctx.globalAlpha=Math.min(1,ph*6)*(ph>.85?(1-ph)/.15:1);
  const isTitle=ci===g.cards.length-3;
  wrap(ctx,g.cards[ci],isTitle?-W*.42:-W*.42,-14,W*.84,isTitle?30:26,isTitle?30:22,isTitle?'#ffd24d':'#cfe8ff');
  ctx.restore();ctx.globalAlpha=1;
  letterbox(ctx,W,H,.11);grain(ctx,W,H,t,50);vignette(ctx,W,H,.55);},
 audio:'braam'},

// ===== 11. CARTOON =====
{id:'cartoon',weight:2,
 title:()=>fill(p(CARTOONS)),
 make(r){return {name:fill(p(CARTOONS)),ep:fill(p(CARTOON_EPS)),hue:r.i(0,359),word:p(CARTOON_WORDS),cards:r.shuffle(CARTOON_CARDS).slice(0,2)};},
 draw(g,ctx,W,H,t){const card=Math.floor(t/8)%4===3&&(t%8)<2.2;
  if(card){ctx.fillStyle='#111';ctx.fillRect(0,0,W,H);letterbox(ctx,W,H,.13);
    txt(ctx,g.cards[Math.floor(t/8)%g.cards.length],W/2,H/2,22,'#ffd24d','center');return;}
  grad(ctx,W,H,`hsl(${g.hue},70%,70%)`,`hsl(${(g.hue+40)%360},70%,80%)`);
  ctx.fillStyle='#fff';for(let i=0;i<4;i++){const cx=(i*200+t*20)%(W+100)-50;blob(ctx,cx,60+i*20,34,6,i,0,'rgba(255,255,255,.9)');}
  ctx.fillStyle=`hsl(${(g.hue+120)%360},60%,45%)`;ctx.fillRect(0,H*.78,W,H*.22);
  // chase: hero runs, villain follows
  const speed=55,hx=W*.15+((t*speed)%(W*.75)),hx2=((hx-W*.14-W*0)%(W)+W)%W;
  const hy=H*.68-40*Math.abs(Math.sin(t*5));
  const drawChar=(x,y,main)=>{ctx.fillStyle=main?`hsl(${(g.hue+200)%360},80%,55%)`:`hsl(${(g.hue+320)%360},60%,40%)`;ctx.beginPath();ctx.arc(x,y,main?34:30,0,7);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-12,y-8,10,0,7);ctx.arc(x+12,y-8,10,0,7);ctx.fill();
    ctx.fillStyle='#000';ctx.beginPath();ctx.arc(x-10,y-8,4,0,7);ctx.arc(x+14,y-8,4,0,7);ctx.fill();
    ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.beginPath();if(main)ctx.arc(x,y+10,10,.2,Math.PI-.2);else ctx.arc(x,y+16,10,Math.PI+.2,-.2);ctx.stroke();};
  drawChar(hx2<hx-40?hx2:hx-90,H*.68-30*Math.abs(Math.sin(t*5+1)),false);
  drawChar(hx,hy,true);
  if(Math.floor(t/2)%2===0){ctx.fillStyle='#fff';ctx.strokeStyle='#000';const bw=90,bh=30;ctx.beginPath();ctx.roundRect(hx+30,hy-80,bw,bh,10);ctx.fill();ctx.stroke();txt(ctx,g.word,hx+30+bw/2,hy-80+bh/2,14,'#000','center');}
  txt(ctx,g.name,W*.04,H*.08,18,'#fff');
  ctx.globalAlpha=.9;txt(ctx,'EP: '+g.ep+'  -  TV-Y7 (probably)',W*.04,H*.15,11,'#357');ctx.globalAlpha=1;},
 audio:'toon'},

// ===== 12. TALK SHOW =====
{id:'talkshow',weight:2,
 title:()=>fill(p(TALKSHOWS)),
 make(r){const guest=p(GUESTS);
  return {show:fill(p(TALKSHOWS)),host:p(FIRST)+' '+p(LAST),mono:r.shuffle(MONOLOGUE).slice(0,3),guest};},
 draw(g,ctx,W,H,t){const seg=Math.floor(t/7)%4; // 0-1 monologue, 2-3 guest
  ctx.fillStyle='#0a0a18';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#101030';ctx.fillRect(W*.1,H*.12,W*.5,H*.4);
  for(let i=0;i<12;i++){const bh=20+((i*37)%60);ctx.fillStyle=`hsl(${230+i*5},40%,${15+(i%4)*6}%)`;ctx.fillRect(W*.11+i*(W*.48/12),H*.52-bh,W*.48/12-2,bh);}
  ctx.fillStyle='#3a2c1a';ctx.fillRect(W*.12,H*.62,W*.56,H*.1);ctx.fillRect(W*.12,H*.72,W*.56,H*.2);
  dude(ctx,W*.24,H*.5,H*.22,{shirt:'#333',tie:'#caa',talk:seg<2||Math.floor(t*2)%2===0,t:t});
  if(seg>=2){dude(ctx,W*.56,H*.52,H*.2,{shirt:'#636',talk:seg>=2&&Math.floor(t*2)%2===1,t:t+1,hat:'wig',hatColor:'#777'});
    txt(ctx,'GUEST: '+g.guest.name.toUpperCase(),W*.4,H*.58,10,'#9bd');}
  const laugh=Math.floor(t/7)!==Math.floor((t-0.05)/7)||Math.floor(t/3.5)%2===1;
  if(laugh){ctx.fillStyle='#fa0';ctx.fillRect(W*.72,H*.2,120,34);txt(ctx,seg<2?'LAUGHTER':'APPLAUSE',W*.72+60,H*.2+17,14,'#000','center');}
  txt(ctx,g.show.toUpperCase(),W*.05,H*.07,16,'#fd7');
  ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,H*.88,W,H*.12);
  if(seg<2)wrap(ctx,g.mono[Math.floor(t/7)%g.mono.length],W*.04,H*.9,W*.92,14,12,'#cde');
  else{const gl=g.guest.lines[Math.floor(t/7)%g.guest.lines.length];wrap(ctx,'"'+gl[Math.floor(t/3.5)%2]+'"',W*.04,H*.9,W*.92,14,12,'#cde');}},
 audio:'murmur'},

// ===== 13. GAME SHOW =====
{id:'gameshow',weight:2,
 title:()=>fill(p(GAMESHOWS)),
 make(r){return {name:fill(p(GAMESHOWS)),host:p(FIRST)+' '+p(LAST),players:r.shuffle(FIRST).slice(0,3),
   qs:r.shuffle(QUESTIONS).slice(0,3),buzz:r.shuffle(BUZZ).slice(0,3),correct:r.i(0,3)};},
 draw(g,ctx,W,H,t){const qi=Math.floor(t/9)%g.qs.length,seg=Math.floor(t/3)%3,q=g.qs[qi];
  ctx.fillStyle='#0a1030';ctx.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){ctx.fillStyle=`hsl(${(t*60+i*40)%360},80%,60%)`;ctx.globalAlpha=.4+.4*Math.sin(t*4+i);ctx.beginPath();ctx.arc(W*.5+220*Math.cos(i*.63),H*.3+130*Math.sin(i*.63),4,0,7);ctx.fill();}ctx.globalAlpha=1;
  txt(ctx,g.name.toUpperCase(),W/2,H*.07,20,'#ffd24d','center');
  txt(ctx,'with '+g.host,W/2,H*.12,11,'#9ab','center');
  // question board
  ctx.fillStyle='#123';ctx.fillRect(W*.1,H*.16,W*.8,90);ctx.strokeStyle='#4af';ctx.strokeRect(W*.1,H*.16,W*.8,90);
  wrap(ctx,q.q.toUpperCase(),W*.13,H*.2,W*.74,17,14,'#fff');
  if(seg>=1){q.a.forEach((a,i)=>{const x=W*(.13+(i%2)*.42),y=H*.48+Math.floor(i/2)*26;
    ctx.fillStyle=seg===2&&i===g.correct?'#2a5':'#16224a';ctx.fillRect(x-8,y-11,W*.38,22);
    txt(ctx,'ABCD'[i]+': '+a,x,y,11,seg===2&&i===g.correct?'#dfd':'#9bd');});}
  g.players.forEach((nm,i)=>{const x=W*(0.2+i*.3);ctx.fillStyle='#123';ctx.fillRect(x-70,H*.72,140,60);ctx.strokeStyle='#4af';ctx.strokeRect(x-70,H*.72,140,60);
    dude(ctx,x,H*.66,H*.14,{shirt:'#345',talk:seg===1&&Math.floor(t*3)%3===i,t:t});
    txt(ctx,nm.toUpperCase(),x,H*.77,11,'#8fd','center');
    txt(ctx,String(Math.floor(t*7*(i+1))%997),x,H*.84,16,'#ffd','center');});
  if(seg===2)txt(ctx,g.buzz[qi],W/2,H*.95,12,'#ffd24d','center');},
 audio:'jingle'},

// ===== 14. PRESTIGE DRAMA =====
{id:'drama',weight:2,
 title:()=>`${p(PLACE)} Confidential`,
 make(r){return {ep:p(DRAMA_EPS),lines:r.shuffle(DRAMA_LINES).slice(0,5),hue:r.i(200,230),
   stars:Array.from({length:50},()=>({x:r.n(),y:r.n(),z:r.n()}))};},
 draw(g,ctx,W,H,t){const li=Math.floor(t/6)%g.lines.length,prev=Math.floor(t/36)%5===0&&(t%36)<3.4;
  if(prev){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);letterbox(ctx,W,H,.12);
    txt(ctx,'PREVIOUSLY ON '+g.ep.split(':')[0].toUpperCase()+'...',W/2,H/2,16,'#89a','center');grain(ctx,W,H,t,60);return;}
  grad(ctx,W,H,`hsl(${g.hue},30%,6%)`,`hsl(${g.hue},25%,16%)`);
  starfield(ctx,W,H,g.stars,t,0);
  // rain
  ctx.strokeStyle='rgba(150,180,220,.25)';ctx.lineWidth=1;
  for(let i=0;i<60;i++){const rx=(i*71+t*160)%W,ry=(i*97+t*420)%H;ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx-3,ry+12);ctx.stroke();}
  // two silhouettes, slow push-in
  const z=1+.03*Math.min(1,(t%6)/6)*2;ctx.save();ctx.translate(W/2,H*.6);ctx.scale(z,z);ctx.translate(-W/2,-H*.6);
  ctx.fillStyle='#050508';
  ctx.beginPath();ctx.arc(W*.38,H*.42,26,0,7);ctx.fill();ctx.fillRect(W*.38-24,H*.42,48,H*.5);
  ctx.beginPath();ctx.arc(W*.62,H*.44,24,0,7);ctx.fill();ctx.fillRect(W*.62-22,H*.44,44,H*.5);
  ctx.restore();
  // window light
  ctx.fillStyle='rgba(255,230,160,.06)';ctx.beginPath();ctx.moveTo(W*.8,0);ctx.lineTo(W*.6,H);ctx.lineTo(W,H);ctx.lineTo(W,0);ctx.fill();
  txt(ctx,g.ep,W*.05,H*.16,13,'#c9d6e8');
  letterbox(ctx,W,H,.12);grain(ctx,W,H,t,55);vignette(ctx,W,H,.6);
  ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillRect(W*.1,H*.72,W*.8,H*.13);
  wrap(ctx,'"'+g.lines[li]+'"',W*.13,H*.75,W*.74,16,13,'#e8eef8');},
 audio:'noir'},

// ===== 15. COURT SHOW =====
{id:'court',weight:2,
 title:()=>`${p(FIRST)} Court`,
 make(r){const c=p(CASES);return {judge:'Judge '+p(FIRST)+' '+p(LAST),pl:p(FIRST)+' '+p(LAST),df:p(FIRST)+' '+p(LAST),c};},
 draw(g,ctx,W,H,t){const seg=Math.floor(t/6)%4; // 0 claim, 1 testimony, 2 witness, 3 verdict
  ctx.fillStyle='#241c12';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#3a2c1a';ctx.fillRect(0,H*.62,W,H*.38);ctx.fillStyle='#2c2114';ctx.fillRect(0,H*.62,W,10);
  // bench + judge
  ctx.fillStyle='#1c1408';ctx.fillRect(W*.34,H*.34,W*.32,H*.3);
  dude(ctx,W*.5,H*.3,H*.24,{shirt:'#111',talk:seg===3,t:t,brow:1});
  txt(ctx,'THE HONORABLE '+g.judge.toUpperCase(),W/2,H*.55,10,'#d8b46a','center');
  // parties
  dude(ctx,W*.16,H*.55,H*.2,{shirt:'#354',talk:seg===0,t:t,look:.8});
  dude(ctx,W*.84,H*.55,H*.2,{shirt:'#543',talk:seg===1,t:t,look:-.8});
  txt(ctx,g.pl.toUpperCase()+' (plaintiff)',W*.16,H*.7,10,'#8fd','center');
  txt(ctx,g.df.toUpperCase()+' (defendant)',W*.84,H*.7,10,'#f9a','center');
  if(seg===3){ctx.fillStyle='rgba(0,0,0,.3)';const gav=Math.abs(Math.sin(t*6));ctx.fillRect(W*.46,H*.36-gav*10,40,6);}
  ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,H*.82,W,H*.18);
  const lines=['PLAINTIFF: '+g.pl+' '+g.c.claim+'.','DEFENSE: "That is not even slightly what happened."','WITNESS: "'+g.c.wit+'"','VERDICT: '+g.c.verd];
  wrap(ctx,lines[seg],W*.05,H*.85,W*.9,15,12,'#ffe');},
 audio:'drone'},

// ===== 16. FITNESS =====
{id:'fitness',weight:1,
 title:()=>`${p(FIRST)}'s ${p(ADJ)} Bootcamp`,
 make(r){return {host:p(FIRST).toUpperCase(),ex:r.shuffle(EXERCISES).slice(0,4),lines:r.shuffle(GYM_LINES).slice(0,4),hue:r.i(0,40)};},
 draw(g,ctx,W,H,t){const ei=Math.floor(t/5)%g.ex.length;
  grad(ctx,W,H,`hsl(${g.hue},70%,16%)`,`hsl(${(g.hue+20)%40},80%,28%)`);
  txt(ctx,g.host+' SAYS:',W/2,H*.08,16,'#ffe14d','center');
  // three exercising figures
  for(let i=0;i<3;i++){const x=W*(.3+i*.2),b=Math.abs(Math.sin(t*6+i));
    dude(ctx,x,H*.55-24*b,H*.26,{shirt:['#f44','#4f4','#44f'][i],talk:false,t:t,hat:'cap',hatColor:['#a00','#0a0','#00a'][i]});
    ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.beginPath();
    ctx.moveTo(x-20,H*.55-24*b+10);ctx.lineTo(x-30,H*.55-24*b-14-20*b);ctx.moveTo(x+20,H*.55-24*b+10);ctx.lineTo(x+30,H*.55-24*b-14-20*b);ctx.stroke();}
  ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(W*.15,H*.3,W*.7,36);
  txt(ctx,g.ex[ei],W/2,H*.3+18,15,'#7ff','center');
  txt(ctx,String(30-Math.floor(t*6%30)),W*.9,H*.3+18,20,'#ff4','center');
  ticker(ctx,W,H,H*.92,g.lines[Math.floor(t/5)%g.lines.length],t,13,'#ffd','rgba(0,0,0,.5)');},
 audio:'pump'},

// ===== 17. HISTORICAL DOCUMENTARY =====
{id:'docu',weight:1,
 title:()=>p(DOCUS).topic+': A Retrospective',
 make(r){const d=p(DOCUS);return {topic:d.topic,lines:d.lines.map(s=>s.replace('${P}',p(PLACE))),hue:r.i(30,50)};},
 draw(g,ctx,W,H,t){const li=Math.floor(t/7)%g.lines.length,ph=(t%7)/7;
  // sepia "archival photo": slow pan/zoom over a procedural scene
  ctx.fillStyle='#191410';ctx.fillRect(0,0,W,H);
  const z=1.1+.25*ph,offx=W*.2*ph;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(z,z);ctx.translate(-W/2-offx,-H/2);
  ctx.fillStyle=`hsl(${g.hue},25%,22%)`;ctx.fillRect(-W,-H,W*3,H*3);
  cityscape(ctx,W,H,H*.75,H*.55,t*.2,g.hue);
  for(let i=0;i<6;i++){const px=W*(.1+i*.16);ctx.fillStyle='#0d0a08';ctx.beginPath();ctx.arc(px,H*.68,10,0,7);ctx.fill();ctx.fillRect(px-8,H*.68,16,34);}
  ctx.restore();
  // sepia + scratches
  ctx.fillStyle='rgba(120,80,30,.18)';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.08)';for(let i=0;i<3;i++){const x=(i*197+t*40)%W;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+6*Math.sin(t+i),H);ctx.stroke();}
  letterbox(ctx,W,H,.12);grain(ctx,W,H,t,70);vignette(ctx,W,H,.65);
  txt(ctx,'ARCHIVE FOOTAGE - '+g.topic.toUpperCase(),W*.05,H*.16,12,'#e8d8b0');
  ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(W*.08,H*.74,W*.84,H*.14);
  wrap(ctx,g.lines[li],W*.11,H*.77,W*.78,16,13,'#f0e6cc');},
 audio:'noir'},

// ===== 18. ANIME =====
{id:'anime',weight:2,
 title:()=>`${p(ADJ)} Battle ${p(NOUN)} Z`,
 make(r){return {hero:p(FIRST),rival:p(FIRST),atk:r.shuffle(ATTACKS).slice(0,3),lines:r.shuffle(ANIME_LINES).slice(0,4),next:p(ANIME_NEXT),hue:r.i(0,359)};},
 draw(g,ctx,W,H,t){const seg=Math.floor(t/4)%5,ph=(t%4)/4;
  // speed-line background
  grad(ctx,W,H,`hsl(${g.hue},60%,14%)`,`hsl(${(g.hue+40)%360},60%,26%)`);
  ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=2;
  for(let i=0;i<26;i++){const a=i*Math.PI/13+t*.15;const r0=60+((i*53+t*200)%180);ctx.beginPath();ctx.moveTo(W/2+Math.cos(a)*r0,H/2+Math.sin(a)*r0);ctx.lineTo(W/2+Math.cos(a)*(r0+120),H/2+Math.sin(a)*(r0+120));ctx.stroke();}
  const shake=seg===3?4:0;ctx.save();ctx.translate(shake*Math.sin(t*40),shake*Math.cos(t*33));
  // hero and rival
  const heroX=seg===2?W*.25+ph*W*.3:W*.25;
  dude(ctx,heroX,H*.55,H*.34,{shirt:`hsl(${g.hue},80%,45%)`,talk:seg%2===0,t:t,look:.7,brow:1,hat:'wig',hatColor:'#222'});
  dude(ctx,W*.78,H*.55,H*.36,{shirt:`hsl(${(g.hue+160)%360},70%,35%)`,talk:seg%2===1,t:t,look:-.7,brow:1,hat:'wig',hatColor:'#000'});
  // power aura on attack
  if(seg===3){for(let i=0;i<8;i++){ctx.fillStyle=`hsla(50,100%,60%,${.15+.1*Math.sin(t*10+i)})`;ctx.beginPath();ctx.arc(W/2,H*.5,40+i*12+6*Math.sin(t*8+i),0,7);ctx.fill();}}
  ctx.restore();
  if(seg===1||seg===3){ctx.fillStyle='#ff0';ctx.strokeStyle='#000';ctx.lineWidth=4;const s=g.atk[Math.floor(t/8)%g.atk.length];
    ctx.save();ctx.translate(W/2,H*.24);ctx.rotate(-.05);ctx.font='bold 26px "Courier New",monospace';ctx.textAlign='center';ctx.strokeText(s,0,0);ctx.fillText(s,0,0);ctx.restore();}
  if(seg===4){ctx.fillStyle='rgba(0,0,0,.85)';ctx.fillRect(0,0,W,H);letterbox(ctx,W,H,.13);
    txt(ctx,g.next,W/2,H/2,18,'#ffd24d','center');return;}
  txt(ctx,g.hero.toUpperCase()+' vs '+g.rival.toUpperCase(),W*.04,H*.07,14,'#fff');
  ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,H*.85,W,H*.15);
  wrap(ctx,g.lines[Math.floor(t/4)%g.lines.length],W*.05,H*.88,W*.9,15,13,'#fff');},
 audio:'battle'},
];

// ---------------- audio engine ----------------
const AE={
  ctx:null,master:null,noiseBuf:null,current:null,muted:false,vol:.8,power:true,
  ensure(){
    if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
      this.ctx=new AC();this.master=this.ctx.createGain();this.master.gain.value=0;this.master.connect(this.ctx.destination);
      const len=this.ctx.sampleRate*2;this.noiseBuf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);
      const d=this.noiseBuf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;}
    if(this.ctx.state==='suspended')this.ctx.resume();this.applyGain();
  },
  applyGain(){if(this.master)this.master.gain.linearRampToValueAtTime(this.muted||!this.power?0:this.vol*.5,this.ctx.currentTime+.1);},
  stop(){if(this.current){try{this.current.stop();}catch(e){}this.current=null;}},
  play(kind,seedRng){
    this.ensure();if(!this.ctx)return;this.stop();
    const c=this.ctx,out=this.master,handles={nodes:[],timers:[],stop(){this.nodes.forEach(n=>{try{n.stop&&n.stop();}catch(e){}try{n.disconnect();}catch(e){}});this.timers.forEach(t=>clearInterval(t));}};
    const R2=seedRng||Math.random;
    const g0=v=>{const g=c.createGain();g.gain.value=v;g.connect(out);handles.nodes.push(g);return g;};
    const osc=(type,f,g)=>{const o=c.createOscillator();o.type=type;o.frequency.value=f;o.connect(g);o.start();handles.nodes.push(o);return o;};
    const noise=(ftype,f,g)=>{const s=c.createBufferSource();s.buffer=this.noiseBuf;s.loop=true;const fl=c.createBiquadFilter();fl.type=ftype;fl.frequency.value=f;s.connect(fl);fl.connect(g);s.start();handles.nodes.push(s);return {src:s,filt:fl};};
    const plip=(f,dur,type,vol)=>{const g=c.createGain();g.gain.setValueAtTime(vol,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);g.connect(out);const o=c.createOscillator();o.type=type;o.frequency.setValueAtTime(f,c.currentTime);o.connect(g);o.start();o.stop(c.currentTime+dur+.02);};
    const seq=(notes,type,ms,vol,oct)=>{let i=0;const g=g0(vol);const id=setInterval(()=>{const n=notes[i++%notes.length];if(n>0){const o=c.createOscillator();o.type=type;o.frequency.value=n*(oct||1);const gg=c.createGain();gg.gain.setValueAtTime(.9,c.currentTime);gg.gain.exponentialRampToValueAtTime(.001,c.currentTime+ms/1000*.95);o.connect(gg);gg.connect(g);o.start();o.stop(c.currentTime+ms/1000);}},ms);handles.timers.push(id);};
    const MAJ=[262,294,330,392,440,523,587,659],MIN=[220,262,294,330,349,392,440,523];
    switch(kind){
      case 'jingle':seq([...MAJ].sort(()=>R2()-.5),'square',140,.12);seq([131,131,165,131],'triangle',560,.2);break;
      case 'drone':{const g=g0(.06);osc('sawtooth',55,g);osc('sawtooth',55.7,g);const lfo=c.createOscillator();lfo.frequency.value=.1;const lg=c.createGain();lg.gain.value=.03;lfo.connect(lg);lg.connect(g.gain);lfo.start();handles.nodes.push(lfo);handles.timers.push(setInterval(()=>plip(880+400*R2(),.15,'sine',.05),2600));break;}
      case 'simmer':{const n=noise('lowpass',380,g0(.08));handles.timers.push(setInterval(()=>{n.filt.frequency.value=300+150*R2();if(R2()<.5)plip(300+500*R2(),.08,'sine',.06);},300));break;}
      case 'wind':{const n=noise('bandpass',500,g0(.09));handles.timers.push(setInterval(()=>{n.filt.frequency.linearRampToValueAtTime(200+700*R2(),c.currentTime+1.2);},1200));break;}
      case 'chirp':{noise('highpass',5000,g0(.015));handles.timers.push(setInterval(()=>{if(R2()<.7){const f=1200+1500*R2();plip(f,.12,'sine',.07);setTimeout(()=>plip(f*1.3,.1,'sine',.05),120);}},700));break;}
      case 'pad':{const chords=[[220,262,330],[175,220,262],[196,247,294],[165,208,247]];let i=0;const g=g0(.1);const os=chords[0].map(f=>osc('triangle',f,g));handles.timers.push(setInterval(()=>{i=(i+1)%chords.length;os.forEach((o,j)=>o.frequency.linearRampToValueAtTime(chords[i][j],c.currentTime+1.5));},4000));break;}
      case 'synth':{seq([...MIN].sort(()=>R2()-.5),'sawtooth',115,.09);seq([110,110,131,110,98,110],'square',230,.14,.5);noise('highpass',6000,g0(.02));break;}
      case 'crowd':{noise('bandpass',800,g0(.05));handles.timers.push(setInterval(()=>{if(R2()<.25)plip(2200,.3,'sine',.08);},4000));break;}
      case 'tone':{const g=g0(.06);osc('sine',1000,g);break;}
      case 'braam':{const g=g0(.12);osc('sawtooth',55,g);osc('sawtooth',58.3,g);osc('sine',27.5,g0(.15));handles.timers.push(setInterval(()=>{g.gain.cancelScheduledValues(c.currentTime);g.gain.setValueAtTime(.02,c.currentTime);g.gain.linearRampToValueAtTime(.18,c.currentTime+.4);g.gain.linearRampToValueAtTime(.03,c.currentTime+2.2);},2400));break;}
      case 'toon':seq([523,659,784,659,880,784,1047,880].map((f,i)=>i%3?f:f/2),'square',170,.1);break;
      case 'murmur':{noise('lowpass',300,g0(.05));handles.timers.push(setInterval(()=>{if(R2()<.6)plip(180+220*R2(),.15+.1*R2(),'sine',.05);},450));break;}
      case 'noir':{const chords=[[110,131,165],[98,117,147],[87,110,131],[104,123,156]];let i=0;const g=g0(.09);const os=chords[0].map(f=>osc('sine',f,g));os.push(osc('triangle',chords[0][0]/2,g));
        handles.timers.push(setInterval(()=>{i=(i+1)%chords.length;os.forEach((o,j)=>o.frequency.linearRampToValueAtTime(chords[i][j%3]/(j===3?2:1),c.currentTime+2));},3600));
        noise('lowpass',500,g0(.02));break;}
      case 'pump':{const g=g0(.16);handles.timers.push(setInterval(()=>{plip(60,.18,'sine',.5);setTimeout(()=>plip(60,.18,'sine',.4),250);},500));
        seq([110,110,131,98,110,131,147,131],'square',125,.09,.5);
        handles.timers.push(setInterval(()=>plip(6000,.03,'square',.04),250));break;}
      case 'battle':{seq([...MIN].sort(()=>R2()-.5).map(f=>f*2),'sawtooth',95,.1);
        seq([55,55,65,55,73,65],'square',190,.16);
        handles.timers.push(setInterval(()=>{if(R2()<.4)plip(1800+800*R2(),.05,'sawtooth',.05);},480));break;}
    }
    this.current=handles;this.applyGain();
  },
  staticBurst(){this.ensure();if(!this.ctx)return;this.stop();
    const c=this.ctx,g=c.createGain();g.gain.value=.12;g.connect(this.master);
    const s=c.createBufferSource();s.buffer=this.noiseBuf;s.loop=true;const f=c.createBiquadFilter();f.type='highpass';f.frequency.value=300;s.connect(f);f.connect(g);s.start();
    this.current={stop(){try{s.stop();}catch(e){}try{g.disconnect();}catch(e){}}};this.applyGain();}
};

// ---------------- channel factory ----------------
const CHPOOL=[];GENRES.forEach(g=>{for(let i=0;i<g.weight;i++)CHPOOL.push(g);});
const chCache=new Map();
function makeChannel(num){
  if(chCache.has(num))return chCache.get(num);
  const r=new R(hashStr('channel:'+num));setRng(r.f);
  const genre=r.pick(CHPOOL);
  const title=genre.title();
  const st=genre.make(r);
  st.kind=genre.id;st.titleText=title;st.num=num;st.audio=genre.audio;
  st.dim='DIM-'+r.i(1,999)+String.fromCharCode(65+r.i(0,25));
  st.ep='S'+r.i(1,9)+' E'+r.i(1,24);
  if(chCache.size>80)chCache.delete(chCache.keys().next().value);
  chCache.set(num,st);return st;
}

// ---------------- TV controller ----------------
const canvas=document.getElementById('screen'),ctx=canvas.getContext('2d');
const osdEl=document.getElementById('osd'),bannerEl=document.getElementById('banner'),guideEl=document.getElementById('guide'),ledEl=document.getElementById('led');
const W=canvas.width,H=canvas.height;
const staticFrames=[];
for(let i=0;i<4;i++){const c=document.createElement('canvas');c.width=160;c.height=120;const g2=c.getContext('2d');const im=g2.createImageData(160,120);for(let j=0;j<im.data.length;j+=4){const v=Math.random()*255|0;im.data[j]=im.data[j+1]=im.data[j+2]=v;im.data[j+3]=255;}g2.putImageData(im,0,0);staticFrames.push(c);}

const TV={
  ch:101,last:101,on:true,surf:false,surfTimer:null,cur:null,t0:0,inStatic:false,staticUntil:0,
  osdTimer:null,bannerTimer:null,pending:'',pendingTimer:null,
  boot(){this.staticPhase(1200);setTimeout(()=>this.flip(101),1200);this.loop();},
  staticPhase(ms){this.inStatic=true;this.staticUntil=performance.now()+ms;AE.staticBurst();},
  flip(num){
    if(!this.on)return;
    num=Math.max(1,Math.min(9999,num));
    this.last=this.ch;this.ch=num;
    this.staticPhase(280+Math.random()*380);
    setTimeout(()=>{
      if(!this.on)return;
      this.inStatic=false;
      this.cur=makeChannel(num);
      this.t0=performance.now();
      AE.play(this.cur.audio,mulberry32(hashStr('a'+num)));
      this.showOSD();this.showBanner();this.renderGuide();
    },300+Math.random()*380);
  },
  showOSD(extra){
    const c=this.cur;
    osdEl.querySelector('.ch').textContent='CH '+this.ch+(extra||'');
    osdEl.querySelector('.title').textContent=c?c.titleText:'';
    osdEl.querySelector('.meta').textContent=c?(c.ep+'  -  '+c.dim+'  -  '+c.kind.toUpperCase()):'';
    osdEl.classList.add('show');clearTimeout(this.osdTimer);
    this.osdTimer=setTimeout(()=>osdEl.classList.remove('show'),2800);
  },
  showBanner(){
    const c=this.cur;if(!c)return;
    bannerEl.querySelector('.t').textContent='NOW: '+c.titleText+'  ('+c.ep+')';
    bannerEl.querySelector('.d').textContent=(c.tag?('"'+c.tag+'"  -  '):'')+'Broadcasting live from '+c.dim;
    bannerEl.classList.add('show');clearTimeout(this.bannerTimer);
    this.bannerTimer=setTimeout(()=>bannerEl.classList.remove('show'),4200);
  },
  renderGuide(){
    let rows='';const now=new Date();
    for(let i=-2;i<=6;i++){const n=this.ch+i;const c=makeChannel(n);
      const tm=new Date(now.getTime()+i*30*60000);
      rows+=`<tr class="${i===0?'cur':''}"><td class="c">CH ${n}</td><td class="tm">${tm.getHours().toString().padStart(2,'0')}:${tm.getMinutes().toString().padStart(2,'0')}</td><td>${c.titleText}</td><td>${c.ep}</td><td>${c.dim}</td></tr>`;}
    guideEl.querySelector('table').innerHTML=rows;
  },
  toggleGuide(){guideEl.classList.toggle('show');if(guideEl.classList.contains('show'))this.renderGuide();},
  toggleSurf(){
    this.surf=!this.surf;
    clearInterval(this.surfTimer);
    if(this.surf)this.surfTimer=setInterval(()=>{this.flip(this.ch+1+Math.floor(Math.random()*47));},7000);
    this.flashMsg(this.surf?'SURF MODE: ON':'SURF MODE: OFF');
  },
  flashMsg(m){osdEl.querySelector('.ch').textContent=m;osdEl.querySelector('.title').textContent='';osdEl.querySelector('.meta').textContent='';osdEl.classList.add('show');clearTimeout(this.osdTimer);this.osdTimer=setTimeout(()=>osdEl.classList.remove('show'),1200);},
  power(){
    this.on=!this.on;ledEl.classList.toggle('on',this.on);AE.power=this.on;AE.applyGain();
    if(!this.on){clearInterval(this.surfTimer);this.surf=false;AE.stop();ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);}
    else{this.flip(this.ch);}
  },
  typeDigit(d){
    if(!this.on)return;
    this.pending+=d;if(this.pending.length>4)this.pending=this.pending.slice(1);
    this.showOSD(' '+this.pending+'_');
    clearTimeout(this.pendingTimer);
    this.pendingTimer=setTimeout(()=>{if(this.pending){const n=parseInt(this.pending,10);this.pending='';if(n>0)this.flip(n);}},1100);
  },
  vol(d){AE.ensure();AE.vol=Math.max(0,Math.min(1,AE.vol+d));AE.muted=false;AE.applyGain();this.flashMsg('VOLUME '+Math.round(AE.vol*10));},
  loop(){
    requestAnimationFrame(()=>this.loop());
    if(!this.on)return;
    if(this.inStatic){
      const f=staticFrames[Math.random()*4|0];
      ctx.imageSmoothingEnabled=false;ctx.drawImage(f,0,0,W,H);
      if(Math.random()<.3){ctx.fillStyle='rgba(255,255,255,.15)';ctx.fillRect(0,Math.random()*H,W,2);}
      if(performance.now()>this.staticUntil&&!this._armed){this._armed=true;}
      return;
    }
    if(!this.cur)return;
    const t=(performance.now()-this.t0)/1000;
    try{this.cur.kind&&GENRES.find(g=>g.id===this.cur.kind).draw(this.cur,ctx,W,H,t);}catch(e){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);txt(ctx,'SIGNAL ERROR',W/2,H/2,20,'#f66','center');}
  }
};
function key(k){
  AE.ensure();
  switch(k){
    case 'chup':TV.flip(TV.ch+1);break;
    case 'chdn':TV.flip(TV.ch-1);break;
    case 'random':TV.flip(1+Math.floor(Math.random()*9999));break;
    case 'back':TV.flip(TV.last);break;
    case 'volup':TV.vol(.1);break;
    case 'voldn':TV.vol(-.1);break;
    case 'mute':AE.muted=!AE.muted;AE.applyGain();TV.flashMsg(AE.muted?'MUTED':'SOUND ON');break;
    case 'guide':TV.toggleGuide();break;
    case 'surf':TV.toggleSurf();break;
    case 'power':TV.power();break;
    default:if(/^[0-9]$/.test(k))TV.typeDigit(k);
  }
}
document.getElementById('remote').addEventListener('click',e=>{const b=e.target.closest('button');if(b)key(b.dataset.k);});
document.addEventListener('keydown',e=>{
  if(e.key>='0'&&e.key<='9')key(e.key);
  else if(e.key==='ArrowUp'){key('chup');e.preventDefault();}
  else if(e.key==='ArrowDown'){key('chdn');e.preventDefault();}
  else if(e.key==='ArrowRight')key('volup');
  else if(e.key==='ArrowLeft')key('voldn');
  else if(e.key==='g'||e.key==='G')key('guide');
  else if(e.key==='s'||e.key==='S')key('surf');
  else if(e.key==='m'||e.key==='M')key('mute');
  else if(e.key==='p'||e.key==='P')key('power');
  else if(e.key==='Enter'&&TV.pending){const n=parseInt(TV.pending,10);TV.pending='';if(n>0)TV.flip(n);}
});
document.addEventListener('click',()=>AE.ensure(),{once:true});
TV.boot();
