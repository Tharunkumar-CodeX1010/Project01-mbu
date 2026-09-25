export type Difficulty = "Easy" | "Medium" | "Advanced";

export interface RecipeIngredient {
  qty: string;
  item: string;
}

export interface Recipe {
  slug: string;
  name: string;
  regionSlug: string;
  blurb: string;
  servings: number;
  timeMin: number;
  difficulty: Difficulty;
  story: { act: string; body: string }[];
  ingredients: RecipeIngredient[];
  steps: string[];
  tips: string[];
  video: null;
}

export const RECIPES: Recipe[] = [
  {
    slug: "pizza-napoletana",
    name: "Pizza Napoletana (Margherita)",
    regionSlug: "naples",
    blurb:
      "The color-of-Italy baseline from Naples: soft cornicione, runny mozzarella, bright tomato.",
    servings: 2,
    timeMin: 180,
    difficulty: "Medium",
    story: [
      {
        act: "Origin",
        body: "In 18th-century Naples, flatbread with tomato became a working-class street staple before it had a national name.",
      },
      {
        act: "Transformation",
        body: "The wood-fired oven and the green-white-red trinity — basil, mozzarella, tomato — fixed the modern Margherita.",
      },
      {
        act: "Recognition",
        body: "The Neapolitan pizzaiuolo craft earned UNESCO Intangible Cultural Heritage status in 2017.",
      },
    ],
    ingredients: [
      { qty: "500 g", item: "00 flour" },
      { qty: "325 g", item: "water" },
      { qty: "3 g", item: "fresh yeast" },
      { qty: "10 g", item: "fine salt" },
      { qty: "180 g", item: "San Marzano tomatoes" },
      { qty: "150 g", item: "bufala mozzarella" },
      { qty: "handful", item: "fresh basil" },
    ],
    steps: [
      "Dissolve the yeast in the water; add flour and salt and knead to a smooth dough (about 10 minutes).",
      "Bulk-rest 90 minutes at room temperature, then divide into two 520 g balls and proof 12–24 hours in the fridge.",
      "Preheat a pizza stone at the oven's maximum (250 °C / 480 °F+) for at least 45 minutes.",
      "Stretch each ball by hand, pressing from the center and leaving a tall cornicione rim.",
      "Spoon over crushed tomato, tear on mozzarella, and bake 60–90 seconds until leopard-spotted.",
      "Finish with fresh basil and a slick of olive oil.",
    ],
    tips: [
      "Use cold water so fermentation stays slow and flavor develops.",
      "A 65% hydration dough is forgiving and bakes soft inside.",
      "Never roll with a pin; hand-stretching keeps the bubbles intact.",
    ],
    video: null,
  },
  {
    slug: "bouillabaisse",
    name: "Bouillabaisse",
    regionSlug: "marseille",
    blurb:
      "Fishing-port soup wrapped in ritual: rouille, toasted croutons, and fish served apart from the broth.",
    servings: 4,
    timeMin: 75,
    difficulty: "Advanced",
    story: [
      {
        act: "Origin",
        body: "Founded by Greek sailors around 600 BC, Marseille fed itself on the harbor's daily catch in thick stoneware pots.",
      },
      {
        act: "Transformation",
        body: "Two-service ritual codified it: saffron broth and rouille toast first, then the fish gathered on a platter.",
      },
      {
        act: "Recognition",
        body: "A way of eating named for the harbor, now shorthand for Provençal coastal cooking worldwide.",
      },
    ],
    ingredients: [
      { qty: "250 g", item: "fish trimmings for stock" },
      { qty: "1.5 kg", item: "assorted firm white fish, in pieces" },
      { qty: "2", item: "onions, sliced" },
      { qty: "300 g", item: "crushed tomatoes" },
      { qty: "1 head", item: "garlic" },
      { qty: "pinch", item: "saffron threads" },
      { qty: "1", item: "dried orange peel" },
      { qty: "100 ml", item: "olive oil" },
    ],
    steps: [
      "Gently simmer the trimmings with onion and peel 30 minutes for a light stock.",
      "Warm the olive oil, soften the sliced onion and garlic, then add tomato and saffron.",
      "Add the stock, bring to a gentle boil, and add the firmer fish first.",
      "Cook remaining fish briefly so nothing over-cooks; season hard.",
      "Serve the broth over rouille-smeared croutons, then the fish on a separate platter.",
    ],
    tips: [
      "Keep the boil gentle; bouillabaisse is stock-fragrant, never muddy.",
      "Rouille — garlic, saffron, oil, chile — is non-negotiable touch of the classic.",
      "Time each fish; delicate fillets go in last and leave almost immediately.",
    ],
    video: null,
  },
  {
    slug: "tacos-al-pastor",
    name: "Tacos al Pastor",
    regionSlug: "mexico-city",
    blurb:
      "The trompo of chile-marinated pork, pineapple and smoke — Mexico City's proudest commuter plate.",
    servings: 4,
    timeMin: 90,
    difficulty: "Medium",
    story: [
      {
        act: "Origin",
        body: "Lebanese shawarma arrived with 20th-century migrants to Puebla and Mexico City's streets.",
      },
      {
        act: "Transformation",
        body: "Mexican cooks re-marinated the spit roast with achiote and chiles, and crowned it with pineapple.",
      },
      {
        act: "Recognition",
        body: "Al pastor is now served from the trompo on nearly every Mexican street corner — and beyond.",
      },
    ],
    ingredients: [
      { qty: "1 kg", item: "pork shoulder, thinly sliced" },
      { qty: "3", item: "dried guajillo chiles" },
      { qty: "2 tbsp", item: "achiote paste" },
      { qty: "4 cloves", item: "garlic" },
      { qty: "1", item: "pineapple, sliced" },
      { qty: "12", item: "corn tortillas" },
      { qty: "1 bunch", item: "cilantro" },
      { qty: "1", item: "lime" },
    ],
    steps: [
      "Toast the guajillos; blend with achiote, garlic, vinegar and salt into a marinade.",
      "Marinate the pork slices 60+ minutes; stack them onto a spit or baking tin",
      "Roast the trompo-style stack, or grill slices in a hot pan until charred at the edges.",
      "Warm the tortillas on the same surface, basting with pineapple juice.",
      "Chop the pork with pineapple, onion and cilantro; serve with lime.",
    ],
    tips: [
      "Char beats heat — look for edges that catch a little flame.",
      "Pineapple acid cuts the smoke on the same forkful.",
      "Warm tortillas stay pliable; cold tortillas crack under a full taco.",
    ],
    video: null,
  },
  {
    slug: "ceviche-clasico",
    name: "Ceviche Clásico",
    regionSlug: "lima",
    blurb:
      "Fish cured in the sharpness of lime, chile and salt — Peru's national dish, served instantly and cold.",
    servings: 2,
    timeMin: 30,
    difficulty: "Easy",
    story: [
      {
        act: "Origin",
        body: "Pre-Hispanic coastal people cured fish with the acids of local fruits — a raw ancestor of ceviche.",
      },
      {
        act: "Transformation",
        body: "Immigration layered Asian and Pacific technique onto the base; lime replaced every earlier sour.",
      },
      {
        act: "Recognition",
        body: "Peru made ceviche the country's oceanic calling card, and Lima its gastronomic stage.",
      },
    ],
    ingredients: [
      { qty: "400 g", item: "firm white fish (corvina or sea bass)" },
      { qty: "6", item: "limes" },
      { qty: "1", item: "ají limo or habanero, minced" },
      { qty: "1", item: "red onion, ultra-thin slices" },
      { qty: "1 bunch", item: "cilantro" },
      { qty: "1", item: "sweet potato, boiled" },
      { qty: "50 g", item: "corn (choclo or cancha)" },
    ],
    steps: [
      "Cut the fish into 2 cm cubes and season with salt — nothing else yet.",
      "Mix lime juice with ají limo; fold in the fish and let rest 5–8 minutes until just opaque.",
      "Stir in cilantro and the sliced onion; adjust acid and salt.",
      "Serve immediately with boiled sweet potato, corn and a crown of onion.",
    ],
    tips: [
      "Resting past 10 minutes over-cures; ceviche waits for no one.",
      "Freeze then partially-thaw the fish for cleaner dice cuts.",
      "Single-coast citrus avoids the bitter pith of mixed limes.",
    ],
    video: null,
  },
  {
    slug: "kombu-dashi",
    name: "Dashi & Morning Soup",
    regionSlug: "tokyo",
    blurb:
      "Kombu and katsuobushi steeped for ten minutes — the quiet pivot point of Japanese cooking.",
    servings: 4,
    timeMin: 20,
    difficulty: "Easy",
    story: [
      {
        act: "Origin",
        body: "Shogunate-era kitchen wisdom prized umami in broth long before the taste had a name.",
      },
      {
        act: "Transformation",
        body: "Katsuobushi — dried, smoked, fermented skipjack — joined kombu to brighten soup stocks everywhere.",
      },
      {
        act: "Recognition",
        body: "Umami was named from this very second stock, dashi, in 1908 by Ikeda.",
      },
    ],
    ingredients: [
      { qty: "10 cm", item: "dried kombu" },
      { qty: "20 g", item: "bonito flakes (katsuobushi)" },
      { qty: "1 l", item: "filtered water" },
      { qty: "2 tsp", item: "miso, white or red" },
      { qty: "1", item: "block tofu, diced" },
      { qty: "2 sprigs", item: "wakegi or scallion" },
    ],
    steps: [
      "Soak kombu in the water 30 minutes; heat gently and remove kombu just before the boil.",
      "Add bonito flakes; turn off the heat and steep 2–3 minutes, then strain.",
      "When the dashi is warm, whisk in the miso off the heat.",
      "Add tofu, scallion and serve in lacquered silence.",
    ],
    tips: [
      "Never boil kombu, or the stock turns slimy and astringent.",
      "Use filtered water — dashi is 90 percent water.",
      "Add miso last and off the heat to keep its enzymes alive.",
    ],
    video: null,
  },
  {
    slug: "kaiseki-tasting",
    name: "A Kansai-Style Kaiseki Course",
    regionSlug: "kyoto",
    blurb:
      "A seasonal tasting sequence, temple-level restraint — small bowls composed like gardens.",
    servings: 2,
    timeMin: 90,
    difficulty: "Advanced",
    story: [
      {
        act: "Origin",
        body: "Kyoto's imperial and Zen kitchens shaped a vegetable-forward, disciplined table called shōjin ryori.",
      },
      {
        act: "Transformation",
        body: "That discipline became kaiseki — a bridge between the tea ceremony and haute cuisine.",
      },
      {
        act: "Recognition",
        body: "Kaiseki is internationally recognized as a pinnacle of precise, seasonal fine dining.",
      },
    ],
    ingredients: [
      { qty: "200 g", item: "seasonal tofu" },
      { qty: "1", item: "piece of local fish (simmered)" },
      { qty: "3", item: "seasonal vegetables, wild or garden" },
      { qty: "15 g", item: "kuzu starch" },
      { qty: "1 tsp", item: "yuzu zest" },
      { qty: "dash", item: "light soy sauce" },
    ],
    steps: [
      "Simmer the fish in a light broth; reserve the stock.",
      "Steam or simmer the vegetables individually so each keeps its season.",
      "Thicken a small portion of the boiling stock with kuzu for a glistening sauce.",
      "Plate in unlidded bowls; finish with yuzu before serving.",
    ],
    tips: [
      "One vegetable at a time — kaiseki honors individual seasons.",
      "Presentation matters as much as flavor; symmetry is not the goal, balance is.",
      "Serve at the exact moment of peak temperature — the plate should arrive quiet.",
    ],
    video: null,
  },
  {
    slug: "mutton-biryani",
    name: "Mutton Biryani",
    regionSlug: "lucknow",
    blurb:
      "Dum-sealed rice and marinated mutton, layered and finished under a sealed lid — Avadh's patience.",
    servings: 6,
    timeMin: 150,
    difficulty: "Advanced",
    story: [
      {
        act: "Origin",
        body: "Avadh's court kitchens built biryani on Mughal technique and the nawabi love of ceremony.",
      },
      {
        act: "Transformation",
        body: "Dum — low flame beneath a sealed lid — let the mutton steam into the rice from within.",
      },
      {
        act: "Recognition",
        body: "Lucknow's biryani and kebabs anchor India's most decorated table of the courts.",
      },
    ],
    ingredients: [
      { qty: "1 kg", item: "mutton, on the bone" },
      { qty: "500 g", item: "basmati rice" },
      { qty: "200 g", item: "yogurt" },
      { qty: "3", item: "brown onions, fried crisp" },
      { qty: "1 tbsp", item: "kewra water" },
      { qty: "1 pinch", item: "saffron in warm milk" },
      { qty: "whole", item: "spices: bay, clove, cardamom, mace" },
    ],
    steps: [
      "Marinate the mutton overnight in yogurt, brown onion and whole spices.",
      "Par-cook the basmati 70 percent; keep the grains al dente.",
      "Layer meat, rice, fried onion and saffron milk in a sealed pot.",
      "Cook over a low flame (or 160 °C / 320 °F) 40–50 minutes under the lid.",
      "Rest 15 minutes, then open the dum pot at the table to release the steam.",
    ],
    tips: [
      "The seal must hold; dough-lid it if your pot permits.",
      "Par-cooked rice finishes in the steam, never fully boiled.",
      "Resting after dum is as important as the cooking itself.",
    ],
    video: null,
  },
  {
    slug: "hyderabadi-biryani",
    name: "Hyderabadi Biryani",
    regionSlug: "hyderabad",
    blurb:
      "Saffron, rose and Deccan lamb steamed in a sealed pot — the Nizam's rice, unforgivingly layered",
    servings: 6,
    timeMin: 160,
    difficulty: "Advanced",
    story: [
      {
        act: "Origin",
        body: "Deccan courts absorbed Persian cooks from the 16th century, blending saffron and rose with local rice.",
      },
      {
        act: "Transformation",
        body: "Layering raw meat, par-cooked rice and saffron, then sealing for the steam, fixed the hallmark method.",
      },
      {
        act: "Recognition",
        body: "Hyderabadi biryani is consistently ranked among the most celebrated rice dishes in the world.",
      },
    ],
    ingredients: [
      { qty: "1 kg", item: "lamb", },
      { qty: "600 g", item: "basmati rice" },
      { qty: "1 cup", item: "yogurt" },
      { qty: "1 tsp", item: "saffron, soaked in milk" },
      { qty: "4 tbsp", item: "rose water" },
      { qty: "12", item: "green cardamom" },
      { qty: "4", item: "black cardamom" },
      { qty: "4", item: "browned onions" },
    ],
    steps: [
      "Marinate lamb in yogurt, browned onion, ginger garlic and ground spices for 6 hours or overnight.",
      "Par-boil the rice with whole cardamom to 70 percent; drain.",
      "Layer lamb first, rice above, then saffron milk, rose water and ghee.",
      "Seal the pot and steam on a low flame 45–55 minutes.",
      "Rest, then fluff the rice from the edges inward at the table.",
    ],
    tips: [
      "Do not stir while layering — the layering is the recipe.",
      "The bottom crust (tahdig-style) is a gift to whoever serves first.",
      "Par-boiled rice must remain distinctly separate grains.",
    ],
    video: null,
  },
  {
    slug: "iskender-kebab",
    name: "İskender Kebab",
    regionSlug: "istanbul",
    blurb:
      "Thin-shaved döner over pide, flooded with tomato butter and yogurt — Bursa's gift to Istanbul's table.",
    servings: 4,
    timeMin: 45,
    difficulty: "Medium",
    story: [
      {
        act: "Origin",
        body: "Ottoman palace kitchens fed the empire from a single disciplined system of meats, grains and yogurt.",
      },
      {
        act: "Transformation",
        body: "Döner — meat on a vertical spit — left the palace for the streets, cut with a long knife in broad daylight.",
      },
      {
        act: "Recognition",
        body: "İskender, named after its Bursa-born creator, is the region's most replicated shaved-kebab standard.",
      },
    ],
    ingredients: [
      { qty: "600 g", item: "lamb, thin-shaved rotisserie style" },
      { qty: "4", item: "pide bread, torn" },
      { qty: "300 g", item: "strained yogurt" },
      { qty: "200 g", item: "tomato passata" },
      { qty: "100 g", item: "melted butter" },
      { qty: "1 tsp", item: "Aleppo pepper" },
    ],
    steps: [
      "Warm the pide at the base of the serving dish.",
      "Shave and sear the lamb until the edges char; keep it loose.",
      "Spoon the yogurt beside the meat on the warmed pide.",
      "Bubble the tomato passata with butter and pepper, then pour over everything.",
      "Serve with grilled pepper and a stack of flatbread.",
    ],
    tips: [
      "Hot butter over the top is the defining flourish; do not skip it.",
      "Lamb sliced thin and seared hot stays tender.",
      "Serve immediately while the pide still steams from below.",
    ],
    video: null,
  },
  {
    slug: "kibbeh",
    name: "Kibbeh",
    regionSlug: "beirut",
    blurb:
      "Cracked wheat, tender lamb and pine — the Levantine shape-shifter you press, fry or bake.",
    servings: 4,
    timeMin: 60,
    difficulty: "Medium",
    story: [
      {
        act: "Origin",
        body: "The Levant's shared pantry — bulgur, lamb, olive — built a single dough that moves between many plates.",
      },
      {
        act: "Transformation",
        body: "Kibbeh adopted every technique the table has: raw (kibbeh nayyeh), fried torpedoes, baked trays.",
      },
      {
        act: "Recognition",
        body: "Beirut's mezze table treats kibbeh as a signature — argued over, never skipped.",
      },
    ],
    ingredients: [
      { qty: "350 g", item: "fine bulgur" },
      { qty: "500 g", item: "lamb, finely ground" },
      { qty: "4 tbsp", item: "pine nuts, toasted" },
      { qty: "1", item: "onion, grated" },
      { qty: "1 tsp", item: "seven-spice mix" },
      { qty: "100 ml", item: "olive oil" },
    ],
    steps: [
      "Wash and soak the bulgur in cold water 20 minutes; squeeze very dry.",
      "Knead bulgur with half the lamb and grated onion into a smooth shell dough.",
      "Fry the pine nuts with the remaining lamb and seven-spice for the filling.",
      "Shape into torpedoes stuffing each with the filling; pinch the ends tight.",
      "Fry golden in olive oil, or bake at 190 °C (375 °F) for 25 minutes.",
    ],
    tips: [
      "Dry bulgur means a stable shell — wet bulgur cracks while frying.",
      "Chill the dough 15 minutes before shaping for cleaner torpedoes.",
      "Serve with yogurt; the tartness balances the lambn.",
    ],
    video: null,
  },
  {
    slug: "jollof-rice",
    name: "Jollof Rice",
    regionSlug: "ibadan",
    blurb:
      "One-pot rice kissed by fire and palm oil — the dish entire West Africa claims for itself.",
    servings: 6,
    timeMin: 70,
    difficulty: "Medium",
    story: [
      {
        act: "Origin",
        body: "Yoruba and neighboring kitchens built one-pot cooking on rice, smoked fish, pepper and grace.",
      },
      {
        act: "Transformation",
        body: "Blended peppers and stock give jollof its layered heat; party-jollof technique won every argument.",
      },
      {
        act: "Recognition",
        body: "The Nigeria–Ghana jollof rivalry proves the dish is the region's most argued-over plate.",
      },
    ],
    ingredients: [
      { qty: "500 g", item: "long-grain rice" },
      { qty: "150 g", item: "tomato purée" },
      { qty: "1", item: "red bell pepper" },
      { qty: "2", item: "scotch bonnet peppers" },
      { qty: "5 tbsp", item: "palm oil" },
      { qty: "300 g", item: "chicken stock" },
      { qty: "smoked", item: "fish or prawns" },
    ],
    steps: [
      "Blend tomato, pepper and scotch bonnet; cook the purée down in palm oil until it darkens.",
      "This reduced base is the color and soul of jollof — do not rush it.",
      "Add stock and rice; simmer covered until the rice absorbs almost everything.",
      "Fold in the smoked fish; finish with a final 10 quiet minutes of steam.",
    ],
    tips: [
      "The fried purée stage decides the flavor; let it reduce to 'savory'.",
      "Do not stir once covered — jollof finishes by absorption.",
      "A burnt bottom layer (the socarrat-like 'party' crust) is prized.",
    ],
    video: null,
  },
  {
    slug: "kenkey",
    name: "Kenkey with Groundnut Soup",
    regionSlug: "accra",
    blurb:
      "Fermented-maize dumplings steamed in leaves, dunked into groundnut soup — Ghana's coastal anchor.",
    servings: 4,
    timeMin: 180,
    difficulty: "Advanced",
    story: [
      {
        act: "Origin",
        body: "Ga cooks fermented corn dough days ahead, giving the table its sour daily starch.",
      },
      {
        act: "Transformation",
        body: "Folded into leaves and steamed, kenkey became the bracket that holds groundnut soup together.",
      },
      {
        act: "Recognition",
        body: "Accra's kenkey pride anchors Ghana in the region's great daily-food canon.",
      },
    ],
    ingredients: [
      { qty: "600 g", item: "maize flour" },
      { qty: "1.2 l", item: "water" },
      { qty: "2 tbsp", item: "groundnut (peanut butter)" },
      { qty: "1", item: "onion" },
      { qty: "1", item: "tomato" },
      { qty: "300 g", item: "leafy vegetable (soko/nkontomire)" },
      { qty: "fish", item: "smoked tilapia" },
    ],
    steps: [
      "Ferment the maize flour in water 2–3 days at room temperature (or 1 with starter).",
      "Cook two-thirds of the fermented dough to a stiff porridge; mix in the raw third.",
      "Wrap scoops in blanched corn leaves or banana leaf and tie into parcels.",
      "Steam the parcels 60–90 minutes until firm.",
      "For the soup, sauté onion and tomato; add groundnut dissolved in water, smoked fish; simmer to thick.",
    ],
    tips: [
      "Freshly fermented kenkey has gentle sourness — taste before cooking.",
      "Steam longer rather than less; dense kenkey needs moist heat.",
      "Groundnut soup should coat a spoon, never split.",
    ],
    video: null,
  },
  {
    slug: "tagliatelle-al-ragu",
    name: "Tagliatelle al Ragù",
    regionSlug: "bologna",
    blurb:
      "The slow coaxi meat sauce of Bologna — long simmer, silk ribbons, and a weeknight emperor.",
    servings: 4,
    timeMin: 240,
    difficulty: "Medium",
    story: [
      {
        act: "Origin",
        body: "Bologna, a medieval university city on the Emilian plain, cooked rich and long even when hurried cities did not.",
      },
      {
        act: "Transformation",
        body: "Its ragù was codified in the early 1980s (Accademia Italiana della Cucina register) as slow meat sauce.",
      },
      {
        act: "Recognition",
        body: "Bolognese became the world's most imitated home recipe, and tagliatelle its true partner.",
      },
    ],
    ingredients: [
      { qty: "400 g", item: "fresh egg tagliatelle" },
      { qty: "200 g", item: "minced beef" },
      { qty: "100 g", item: "minced pork" },
      { qty: "1", item: "onion, finely diced" },
      { qty: "2 stalks", item: "celery, finely diced" },
      { qty: "1", item: "carrot, finely diced" },
      { qty: "150 ml", item: "red wine" },
      { qty: "300 g", item: "passata" },
      { qty: "50 g", item: "Parmesan" },
    ],
    steps: [
      "Soften onion, celery and carrot in a few spoonfuls of olive oil.",
      "Add both meats, brown hard, and deglaze with the wine until mostly gone.",
      "Add passata and a splash of water; simmer uncovered 3 hours, stirring occasionally.",
      "Cook the tagliatelle 2–3 minutes in salted water; finish by tossing in the ragù for 30 seconds.",
      "Serve with a storm of grated Parmesan.",
    ],
    tips: [
      "Ragù wants time and no cover — the reduction builds the silk.",
      "Never serve ragù on spaghetti in Bologna; tagliatelle are the rule.",
      "The sauce should coat noodles, not flood them.",
    ],
    video: null,
  },
  {
    slug: "quenelle-lyonnaise",
    name: "Quenelle Lyonnaise",
    regionSlug: "lyon",
    blurb:
      "The silk-weaver's dumpling made light with cream — pike, poached, sauced, crowned with a shell of gruyère.",
    servings: 4,
    timeMin: 90,
    difficulty: "Advanced",
    story: [
      {
        act: "Origin",
        body: "Lyon's canuts (silk weavers) needed dense, cheap food; their bouchons made thrift taste spendy.",
      },
      {
        act: "Transformation",
        body: "An airy pike mousse was poached and sauced into a dish the city's 'mères' made famous.",
      },
      {
        act: "Recognition",
        body: "Quenelle remains the emblem of the bouchon table, quoted as the soul of Lyonnaise cooking.",
      },
    ],
    ingredients: [
      { qty: "300 g", item: "pike fillet, skinned" },
      { qty: "150 g", item: "butter, softened" },
      { qty: "2", item: "egg whites" },
      { qty: "200 ml", item: "cream" },
      { qty: "300 ml", item: "tomato-nantua sauce (see tips)" },
      { qty: "50 g", item: "gruyère, grated" },
    ],
    steps: [
      "Pulse the fish with softened butter and salt; do not over-work.",
      "Beat in the egg whites, then fold in the cream to a soft, light panade.",
      "Chill, then shape two-egg-sized quenelles with two spoons.",
      "Poach in simmering salted water 12 minutes; remove with a slotted spoon.",
      "Sauce the plate, seat the quenelles, run under a grill with gruyère.",
    ],
    tips: [
      "Cold everything: cold fish, cold cream, cold bowl. Warm quenelle is a brick.",
      "The classic nantua sauce (crayfish) can be scaled to a tomato-cognac cream.",
      "Two spoons make the oval; do not roll them with your hands.",
    ],
    video: null,
  },
  {
    slug: "pad-thai",
    name: "Pad Thai",
    regionSlug: "bangkok",
    blurb:
      "Flat noodles, tamarind, fish sauce and palm sugar dance in a hot wok under crunchy tofu — the street classic.",
    servings: 2,
    timeMin: 25,
    difficulty: "Medium",
    story: [
      {
        act: "Origin",
        body: "Thai court taste met Chinese wok technique and noodle trade on Bangkok's riverfront streets.",
      },
      {
        act: "Transformation",
        body: "A national-noodle push mid-20th century turned the stir-fry into a hyper-polished street canon.",
      },
      {
        act: "Recognition",
        body: "Pad thai is the dish most likely to fly Bangkok's flavor around the world.",
      },
    ],
    ingredients: [
      { qty: "200 g", item: "flat rice noodles" },
      { qty: "2", item: "eggs" },
      { qty: "100 g", item: "tofu, cubed" },
      { qty: "80 g", item: "bean sprouts" },
      { qty: "2 tbsp", item: "tamarind paste" },
      { qty: "2 tbsp", item: "fish sauce" },
      { qty: "1 tbsp", item: "palm sugar" },
      { qty: "1", item: "lime and crushed peanuts" },
    ],
    steps: [
      "Soak the noodles 30 minutes until pliable but firm.",
      "Build the sauce from tamarind, fish sauce and palm sugar; balance it to sour-sweet-salt.",
      "Wok-scramble the eggs, add tofu and noodles; toss fast on high heat.",
      "Pour in the sauce; add bean sprouts and toss once.",
      "Plate with peanuts, chile flakes and a lime wedge.",
    ],
    tips: [
      "Dry noodles first: the sauce ties to dry noodles better than wet.",
      "High heat and speed rank above technique — do not crowd the wok.",
      "Taste and re-balance: tamarind, fish sauce and sugar are a triangle to tune.",
    ],
    video: null,
  },
  {
    slug: "hainanese-chicken-rice",
    name: "Hainanese Chicken Rice",
    regionSlug: "singapore",
    blurb:
      "Poached chicken, rice cooked in its fat and broth, the chili-ginger-garlic triumvirate — a hawker republic.",
    servings: 4,
    timeMin: 90,
    difficulty: "Medium",
    story: [
      {
        act: "Origin",
        body: "Hainan traders brought poached chicken across the Strait; Singapore's hawkers built the rice a ritual.",
      },
      {
        act: "Transformation",
        body: "The broth-reduced, chicken-fat-cooked rice became the dish's quiet genius.",
      },
      {
        act: "Recognition",
        body: "It is the dish UNESCO's hawker-culture citation (2020) is most often served to illustrate.",
      },
    ],
    ingredients: [
      { qty: "1", item: "whole chicken (~1.4 kg)" },
      { qty: "400 g", item: "jasmine rice" },
      { qty: "1.5 l", item: "chicken stock" },
      { qty: "100 g", item: "ginger, sliced" },
      { qty: "6", item: "scallions" },
      { qty: "1 head", item: "garlic" },
      { qty: "chili", item: "sambal and dark soy to serve" },
    ],
    steps: [
      "Poach the whole chicken at 85–90 °C (175–195 °F) for 40 minutes; it must not boil.",
      "Shock in iced water 2 minutes, then rest; keep the poaching broth.",
      "Wash the rice; sauté in chicken fat with garlic and ginger.",
      "Cook the rice in the reserved hot broth until just tender.",
      "Chop the cold-slicked chicken and plate with rice, chili sauce and the soup.",
    ],
    tips: [
      "The 85 °C poach is the difference between silk and sawdust.",
      "Cold-water shock sets the skin and seals the gelatin.",
      "The 'soup' on the side is the poaching stock, lightly seasoned.",
    ],
    video: null,
  },
];

export function getRecipe(slug: string): Recipe | undefined {
  return RECIPES.find((recipe) => recipe.slug === slug);
}

export function recipesForRegion(regionSlug: string): Recipe[] {
  return RECIPES.filter((recipe) => recipe.regionSlug === regionSlug);
}

export function allRecipeSlugs(): string[] {
  return RECIPES.map((recipe) => recipe.slug);
}